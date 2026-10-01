import { Redis as UpstashRedis } from '@upstash/redis'
import Redis from 'ioredis'
import { defaultDirectoryData, type DirectoryData } from '../../data/defaultDirectory'

export const REDIS_INDEX_KEY = 'nbtf:index:data'

let ioredisClient: Redis | null = null
let upstashClient: UpstashRedis | null = null
let memoryCache: DirectoryData | null = null

export function getRedisClient() {
  const config = useRuntimeConfig()
  
  // 1. Try Upstash REST if configured
  const upstashUrl = config.upstashRedisRestUrl || process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = config.upstashRedisRestToken || process.env.UPSTASH_REDIS_REST_TOKEN
  if (upstashUrl && upstashToken) {
    if (!upstashClient) {
      upstashClient = new UpstashRedis({
        url: upstashUrl,
        token: upstashToken,
      })
    }
    return { type: 'upstash' as const, client: upstashClient }
  }

  // 2. Try standard Redis URL (ioredis)
  const redisUrl = config.redisUrl || process.env.REDIS_URL
  if (redisUrl) {
    if (!ioredisClient) {
      ioredisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        lazyConnect: true,
      })
    }
    return { type: 'ioredis' as const, client: ioredisClient }
  }

  // 3. Fallback memory mode
  return { type: 'memory' as const, client: null }
}

export async function fetchDirectoryData(): Promise<DirectoryData> {
  try {
    const redis = getRedisClient()
    
    if (redis.type === 'upstash' && redis.client) {
      const data = await redis.client.get<DirectoryData | string>(REDIS_INDEX_KEY)
      if (data) {
        return typeof data === 'string' ? JSON.parse(data) : data
      }
    } else if (redis.type === 'ioredis' && redis.client) {
      const raw = await redis.client.get(REDIS_INDEX_KEY)
      if (raw) {
        return JSON.parse(raw)
      }
    } else if (memoryCache) {
      return memoryCache
    }
  } catch (err) {
    console.warn('[Redis] Unable to fetch live directory data, returning fallback defaults:', err)
  }

  return defaultDirectoryData
}

export async function saveDirectoryData(data: DirectoryData): Promise<boolean> {
  try {
    const redis = getRedisClient()
    data.updatedAt = new Date().toISOString()
    memoryCache = data

    if (redis.type === 'upstash' && redis.client) {
      await redis.client.set(REDIS_INDEX_KEY, JSON.stringify(data))
      return true
    } else if (redis.type === 'ioredis' && redis.client) {
      await redis.client.set(REDIS_INDEX_KEY, JSON.stringify(data))
      return true
    }
    return true
  } catch (err) {
    console.error('[Redis] Failed to save directory data:', err)
    return false
  }
}
