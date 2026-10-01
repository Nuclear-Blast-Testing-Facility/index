export interface DirectoryLink {
  id: string
  title: string
  description: string
  url: string
  displayUrl: string
  badge?: string
  isEmail?: boolean
  status?: 'online' | 'beta' | 'coming-soon' | 'external'
  icon?: string
}

export interface DirectoryCategory {
  id: string
  name: string
  description?: string
  links: DirectoryLink[]
}

export interface DirectoryData {
  siteTitle: string
  siteTagline: string
  disclaimer: string
  maintainerNotice: string
  bannerAnnouncement?: {
    enabled: boolean
    text: string
    type: 'info' | 'warning' | 'alert'
    link?: string
  }
  categories: DirectoryCategory[]
  updatedAt?: string
}

export const defaultDirectoryData: DirectoryData = {
  siteTitle: "NBTF.CA Domain Directory",
  siteTagline: "Official subdomain directory, network routing, and contact endpoints for nbtf.ca",
  disclaimer: "⚠ NBTF.CA is a second-level domain owned by cbx.nz — it may or may not be directly affiliated with NBTF or its developer.",
  maintainerNotice: "NBTF.ca is connected via Cloudflare, domain owned by cbx.nz (maintainer of cbx.kiwi).",
  bannerAnnouncement: {
    enabled: true,
    text: "Operational Network Status: Normal. All official subdomains and routing endpoints are active.",
    type: "info",
    link: "//index.nbtf.ca"
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
          description: "The official web portal and master reference for Nuclear Blast Testing Facility",
          url: "https://web.nbtf.ca",
          displayUrl: "web.nbtf.ca",
          badge: "Main Web",
          status: "online",
          icon: "Globe"
        },
        {
          id: "dir-3",
          title: "NBTF.CA (Vite React Alternative)",
          description: "Alternative fast client homepage for nbtf.ca website built with Vite React",
          url: "https://nbtf.ca",
          displayUrl: "nbtf.ca",
          badge: "Vite React",
          status: "online",
          icon: "Atom"
        },
        {
          id: "dir-4",
          title: "Nuclear Blast App",
          description: "The dedicated web companion app for NBTF telemetry and faction operations (Coming Soon)",
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
      description: "Authorized and recognized faction operational web pages",
      links: [
        {
          id: "fac-1",
          title: "just another faction",
          description: "Official website and communication node for just another faction (JAF)",
          url: "https://jaf.nbtf.ca",
          displayUrl: "jaf.nbtf.ca",
          badge: "Faction Web",
          status: "online",
          icon: "Flag"
        },
        {
          id: "fac-2",
          title: "Military Training Department",
          description: "The tactical website, doctrines, and syllabus for Military Training Department (MTD)",
          url: "https://mtd.nbtf.ca",
          displayUrl: "mtd.nbtf.ca",
          badge: "Military Dept",
          status: "online",
          icon: "Crosshair"
        }
      ]
    },
    {
      id: "public-emails",
      name: "Public Emails",
      description: "Encrypted mailboxes, department contacts, and legal communication channels",
      links: [
        {
          id: "mail-1",
          title: "Official: Admin Contact",
          description: "Direct contact inbox for the NBTF.CA domain administrator and server ops",
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
          description: "Official faction correspondence for just another faction diplomatic inquiries",
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
          description: "Press releases, news dispatches, and emergency broadcaster contact inbox",
          url: "mailto:c6n@factions.nbtf.ca",
          displayUrl: "c6n@factions.nbtf.ca",
          badge: "Press Desk",
          isEmail: true,
          status: "online",
          icon: "Radio"
        },
        {
          id: "mail-4",
          title: "Official: Legal Contact",
          description: "Formal legal inquiries, DMCA notices, and domain policy matters (cbx.kiwi)",
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
}
