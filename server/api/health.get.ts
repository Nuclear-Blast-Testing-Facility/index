import { getRedisClient } from '../utils/redis'

export default defineEventHandler(async () => {
  const redis = getRedisClient()
  return {
    status: 'ok',
    service: 'index-nbtf-ca',
    timestamp: new Date().toISOString(),
    redisMode: redis.type
  }
})
