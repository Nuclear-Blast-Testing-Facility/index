import { fetchDirectoryData } from '../utils/redis'

export default defineEventHandler(async (event) => {
  // Set caching headers for high performance while allowing admin revalidation
  setHeader(event, 'Cache-Control', 's-maxage=10, stale-while-revalidate=59')
  const data = await fetchDirectoryData()
  return {
    success: true,
    data
  }
})
