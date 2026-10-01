import { d as defineEventHandler, s as setHeader } from '../../_/nitro.mjs';
import { f as fetchDirectoryData } from '../../_/redis.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@upstash/redis';
import 'ioredis';

const directory_get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "s-maxage=10, stale-while-revalidate=59");
  const data = await fetchDirectoryData();
  return {
    success: true,
    data
  };
});

export { directory_get as default };
//# sourceMappingURL=directory.get.mjs.map
