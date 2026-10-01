import { a as useRuntimeConfig } from './nitro.mjs';
import { Redis } from '@upstash/redis';
import Redis$1 from 'ioredis';

const defaultDirectoryData = {
  siteTitle: "NBTF.CA Domain Directory",
  siteTagline: "Official subdomain directory, network routing, and contact endpoints for nbtf.ca",
  disclaimer: "\u26A0 NBTF.CA is a second-level domain owned by cbx.nz \u2014 it may or may not be directly affiliated with NBTF or its developer.",
  maintainerNotice: "NBTF.ca is connected via Cloudflare, domain owned by cbx.nz (maintainer of cbx.kiwi).",
  bannerAnnouncement: {
    enabled: true,
    text: "Operational Network Status: Normal. Official subdomains and routing endpoints active.",
    type: "info",
    link: "https://www.nbtf.ca"
  },
  categories: [
    {
      id: "official-links",
      name: "Official Links",
      description: "Core infrastructure, portals, and primary web access points",
      links: [
        {
          id: "dir-1",
          title: "Domain's Directory",
          description: "Directory of all nbtf.ca subdomains, routing portals, and emails",
          url: "https://index.nbtf.ca",
          displayUrl: "i.nbtf.ca",
          badge: "Primary Directory",
          status: "online",
          icon: "FolderGit2"
        },
        {
          id: "dir-2",
          title: "nbtf.ca Homepage",
          description: "The official master reference and operations dossier for Nuclear Blast Testing Facility",
          url: "https://www.nbtf.ca",
          displayUrl: "www.nbtf.ca",
          badge: "Main Web",
          status: "online",
          icon: "Globe"
        },
        {
          id: "dir-3",
          title: "NBTF.CA (Vite React Alternative)",
          description: "Alternative fast client homepage for nbtf.ca website using Vite React",
          url: "https://nbtf.ca",
          displayUrl: "nbtf.ca",
          badge: "Vite React",
          status: "online",
          icon: "Atom"
        },
        {
          id: "dir-4",
          title: "NBTF Official Discord",
          description: "The official Discord server for NBTF factions, community discussions, and game announcements",
          url: "https://discord.gg/nbtf",
          displayUrl: "discord.gg/nbtf",
          badge: "Official Discord",
          status: "online",
          icon: "MessageSquare"
        },
        {
          id: "dir-5",
          title: "Nuclear Blast App",
          description: "The dedicated web companion app for NBTF (Coming Soon)",
          url: "https://app.nbtf.ca",
          displayUrl: "app.nbtf.ca",
          badge: "In Development",
          status: "coming-soon",
          icon: "Smartphone"
        }
      ]
    },
    {
      id: "other-subdomains",
      name: "Other Subdomains",
      description: "Utility tools, registration systems, and network maintainer platforms",
      links: [
        {
          id: "sub-1",
          title: "Register Portal",
          description: "Registration and provisioning portal for subdomains and official email aliases",
          url: "https://register.nbtf.ca",
          displayUrl: "register.nbtf.ca",
          badge: "Access Gateway",
          status: "online",
          icon: "UserPlus"
        },
        {
          id: "sub-2",
          title: "civblog",
          description: "Civilian Blogging Platform & independent community reporting from NBTF territory",
          url: "https://civblog.nbtf.ca",
          displayUrl: "civblog.nbtf.ca",
          badge: "Community Hub",
          status: "online",
          icon: "BookOpen"
        },
        {
          id: "sub-3",
          title: "Domain Maintainer (cbx.kiwi)",
          description: "Official network domain maintainer and infrastructure sponsor platform",
          url: "https://cbx.kiwi",
          displayUrl: "cbx.kiwi",
          badge: "Maintainer",
          status: "external",
          icon: "ShieldAlert"
        }
      ]
    },
    {
      id: "faction-websites",
      name: "Faction Websites",
      description: "Community faction websites (Official factions are hosted on the NBTF Discord: discord.gg/nbtf)",
      links: [
        {
          id: "fac-1",
          title: "just another faction",
          description: "Website for just another faction (JAF)",
          url: "https://jaf.nbtf.ca",
          displayUrl: "jaf.nbtf.ca",
          badge: "Faction Web",
          status: "online",
          icon: "Flag"
        },
        {
          id: "fac-2",
          title: "Military Training Department",
          description: "The website for Military Training Department (MTD) faction",
          url: "https://mtd.nbtf.ca",
          displayUrl: "mtd.nbtf.ca",
          badge: "Faction Web",
          status: "online",
          icon: "Crosshair"
        }
      ]
    },
    {
      id: "public-emails",
      name: "Public Emails",
      description: "Mailboxes, contact endpoints, and legal communication channels",
      links: [
        {
          id: "mail-1",
          title: "Official: Admin Contact",
          description: "Contact email for the NBTF.CA domain administrator",
          url: "mailto:admin@nbtf.ca",
          displayUrl: "admin@nbtf.ca",
          badge: "Admin Mail",
          isEmail: true,
          status: "online",
          icon: "Mail"
        },
        {
          id: "mail-2",
          title: "Faction: just another faction",
          description: "Contact email for just another faction",
          url: "mailto:jaf@factions.nbtf.ca",
          displayUrl: "jaf@factions.nbtf.ca",
          badge: "Faction Mail",
          isEmail: true,
          status: "online",
          icon: "Send"
        },
        {
          id: "mail-3",
          title: "Faction: Channel 6 News",
          description: "Contact email for Channel 6 News faction",
          url: "mailto:c6n@factions.nbtf.ca",
          displayUrl: "c6n@factions.nbtf.ca",
          badge: "Faction Mail",
          isEmail: true,
          status: "online",
          icon: "Radio"
        },
        {
          id: "mail-4",
          title: "Official: Legal Contact",
          description: "Legal inquiries and domain issues (cbx.kiwi)",
          url: "mailto:legal@cbx.kiwi",
          displayUrl: "legal@cbx.kiwi",
          badge: "Legal Desk",
          isEmail: true,
          status: "external",
          icon: "Scale"
        }
      ]
    }
  ]
};

const REDIS_INDEX_KEY = "nbtf:index:data";
let ioredisClient = null;
let upstashClient = null;
let memoryCache = null;
function getRedisClient() {
  const config = useRuntimeConfig();
  const upstashUrl = config.upstashRedisRestUrl || process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = config.upstashRedisRestToken || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    if (!upstashClient) {
      upstashClient = new Redis({
        url: upstashUrl,
        token: upstashToken
      });
    }
    return { type: "upstash", client: upstashClient };
  }
  const redisUrl = config.redisUrl || process.env.REDIS_URL;
  if (redisUrl) {
    if (!ioredisClient) {
      ioredisClient = new Redis$1(redisUrl, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        lazyConnect: true
      });
    }
    return { type: "ioredis", client: ioredisClient };
  }
  return { type: "memory", client: null };
}
async function fetchDirectoryData() {
  try {
    const redis = getRedisClient();
    if (redis.type === "upstash" && redis.client) {
      const data = await redis.client.get(REDIS_INDEX_KEY);
      if (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
      }
    } else if (redis.type === "ioredis" && redis.client) {
      const raw = await redis.client.get(REDIS_INDEX_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } else if (memoryCache) ;
  } catch (err) {
    console.warn("[Redis] Unable to fetch live directory data, returning fallback defaults:", err);
  }
  return defaultDirectoryData;
}

export { fetchDirectoryData as f, getRedisClient as g };
//# sourceMappingURL=redis.mjs.map
