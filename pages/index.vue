<template>
  <div class="min-h-screen flex flex-col justify-between">
    <!-- Top System Announcement Banner -->
    <div
      v-if="directoryData?.bannerAnnouncement?.enabled"
      class="bg-cyan-950/70 border-b border-cyan-500/30 px-4 py-2 text-xs md:text-sm font-mono flex items-center justify-between text-cyan-200"
    >
      <div class="container mx-auto flex items-center gap-2 justify-center text-center">
        <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold uppercase tracking-wider text-[10px] border border-cyan-500/40">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          NETWORK BULLETIN
        </span>
        <span>{{ directoryData.bannerAnnouncement.text }}</span>
        <a
          v-if="directoryData.bannerAnnouncement.link"
          :href="directoryData.bannerAnnouncement.link"
          target="_blank"
          class="underline font-bold hover:text-white ml-1 inline-flex items-center gap-0.5"
        >
          View Details &rarr;
        </a>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="border-b border-slate-800/80 bg-facility-900/80 backdrop-blur-md sticky top-0 z-40">
      <div class="container mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <svg class="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="font-display text-xl font-bold tracking-wider text-white">NBTF.CA</h1>
              <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ONLINE
              </span>
            </div>
            <p class="text-xs text-slate-400 font-mono">Domain Directory & Routing Registry</p>
          </div>
        </div>

        <!-- Quick Links & System Clock -->
        <div class="flex items-center gap-4 text-xs font-mono text-slate-400">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-facility-850 border border-slate-800">
            <span class="text-slate-500">SYS_TIME:</span>
            <span class="text-cyan-300">{{ currentTime }} UTC</span>
          </div>
          <a
            href="https://www.nbtf.ca"
            target="_blank"
            class="px-3 py-1.5 rounded bg-facility-800 hover:bg-facility-700 text-slate-200 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1.5"
          >
            <span>Game Portal</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="container mx-auto px-4 py-8 flex-1 max-w-6xl">
      <!-- Hero Header Section -->
      <section class="text-center py-6 md:py-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          NETWORK DIRECTORY // ROUTING HUB
        </div>
        <h2 class="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-3">
          NBTF.CA NETWORK DIRECTORY
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {{ directoryData?.siteTagline || 'Explore official portals, companion applications, faction domains, and communication channels.' }}
        </p>

        <!-- Stats Overview Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 font-mono text-left">
          <div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80">
            <span class="text-slate-500 text-xs">TOTAL ENDPOINTS</span>
            <p class="text-xl font-bold text-cyan-400 font-display mt-0.5">{{ totalLinksCount }}</p>
          </div>
          <div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80">
            <span class="text-slate-500 text-xs">CATEGORIES</span>
            <p class="text-xl font-bold text-emerald-400 font-display mt-0.5">{{ directoryData?.categories?.length || 0 }}</p>
          </div>
          <div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80">
            <span class="text-slate-500 text-xs">PUBLIC EMAILS</span>
            <p class="text-xl font-bold text-amber-400 font-display mt-0.5">{{ totalEmailsCount }}</p>
          </div>
          <div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80">
            <span class="text-slate-500 text-xs">DOMAIN SPONSOR</span>
            <p class="text-xl font-bold text-indigo-400 font-display mt-0.5">cbx.nz</p>
          </div>
        </div>
      </section>

      <!-- Search & Filters Toolbar -->
      <section class="mt-4 mb-8 space-y-4">
        <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
          <!-- Search input -->
          <div class="relative w-full md:max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search endpoints, subdomains, emails (press '/' to focus)..."
              class="w-full pl-10 pr-10 py-2.5 bg-facility-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Category filter pills -->
          <div class="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              @click="selectedCategory = 'all'"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all',
                selectedCategory === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-facility-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              ]"
            >
              All Items ({{ totalLinksCount }})
            </button>
            <button
              v-for="cat in directoryData?.categories || []"
              :key="cat.id || cat.name"
              @click="selectedCategory = cat.name"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all',
                selectedCategory === cat.name
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'bg-facility-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              ]"
            >
              {{ cat.name }} ({{ cat.links?.length || 0 }})
            </button>
          </div>
        </div>
      </section>

      <!-- Directory Sections -->
      <section class="space-y-10">
        <div
          v-for="category in filteredCategories"
          :key="category.id || category.name"
          class="space-y-4"
        >
          <!-- Category Header -->
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 bg-cyan-400 rotate-45"></span>
              <h3 class="text-lg md:text-xl font-display font-bold uppercase tracking-wider text-slate-100">
                {{ category.name }}
              </h3>
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {{ category.links.length }}
              </span>
            </div>
            <p v-if="category.description" class="hidden md:block text-xs font-mono text-slate-500">
              {{ category.description }}
            </p>
          </div>

          <!-- Links Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div
              v-for="link in category.links"
              :key="link.id || link.url"
              class="tactical-glass tactical-glass-hover rounded-xl p-5 flex flex-col justify-between group relative overflow-hidden"
            >
              <!-- Decorative corner accent -->
              <div class="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                <div class="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-8 h-8 bg-cyan-500/20 rotate-45 border border-cyan-500/30"></div>
              </div>

              <div>
                <!-- Top Row: Badge & Status -->
                <div class="flex items-center justify-between gap-2 mb-2">
                  <span
                    v-if="link.badge"
                    class="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                  >
                    {{ link.badge }}
                  </span>
                  <span
                    v-else-if="link.isEmail"
                    class="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  >
                    Email Endpoint
                  </span>
                  <span
                    v-else
                    class="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700"
                  >
                    Subdomain
                  </span>

                  <!-- Status Dot -->
                  <div class="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="{
                        'bg-emerald-400': link.status === 'online' || !link.status,
                        'bg-amber-400': link.status === 'beta',
                        'bg-indigo-400': link.status === 'coming-soon',
                        'bg-slate-400': link.status === 'external'
                      }"
                    ></span>
                    <span class="capitalize">{{ link.status || 'Active' }}</span>
                  </div>
                </div>

                <!-- Link Title -->
                <h4 class="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span>{{ link.title }}</span>
                </h4>

                <!-- Description -->
                <p class="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {{ link.description }}
                </p>
              </div>

              <!-- Bottom Bar: Display URL & Actions -->
              <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5 text-xs font-mono text-cyan-400/90 truncate">
                  <span class="text-slate-500">&gt;</span>
                  <span class="truncate font-medium">{{ link.displayUrl || link.url }}</span>
                </div>

                <div class="flex items-center gap-1.5 shrink-0">
                  <!-- Copy Button -->
                  <button
                    @click="copyToClipboard(link.isEmail ? (link.url.replace('mailto:', '') || link.displayUrl) : (link.url.startsWith('//') ? 'https:' + link.url : link.url), link.id || link.url)"
                    title="Copy to clipboard"
                    class="p-1.5 rounded-lg bg-facility-800 hover:bg-facility-700 text-slate-400 hover:text-cyan-300 border border-slate-700/80 transition-all text-xs flex items-center gap-1"
                  >
                    <span v-if="copiedId === (link.id || link.url)" class="text-emerald-400 text-[10px] font-mono px-1">Copied!</span>
                    <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>

                  <!-- Direct Open Link -->
                  <a
                    :href="link.url.startsWith('//') ? 'https:' + link.url : link.url"
                    :target="link.isEmail ? '_self' : '_blank'"
                    rel="noopener noreferrer"
                    class="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all text-xs font-mono flex items-center gap-1 font-semibold"
                  >
                    <span>{{ link.isEmail ? 'Send' : 'Visit' }}</span>
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state when search yields no matches -->
        <div
          v-if="filteredCategories.length === 0"
          class="tactical-glass rounded-xl p-12 text-center my-8"
        >
          <div class="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-slate-400 mb-3">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h4 class="text-base font-semibold text-white">No endpoints matched your query</h4>
          <p class="text-xs text-slate-400 mt-1 font-mono">Query: "{{ searchQuery }}"</p>
          <button
            @click="searchQuery = ''; selectedCategory = 'all'"
            class="mt-4 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 text-xs font-mono font-medium"
          >
            Reset Filters
          </button>
        </div>
      </section>
    </main>

    <!-- Footer with Mandatory Domain Disclaimers -->
    <footer class="border-t border-slate-800 bg-facility-950/95 mt-16 py-8">
      <div class="container mx-auto px-4 max-w-6xl space-y-6">
        <!-- Prominent Disclaimer Box -->
        <div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs font-mono flex items-start gap-3">
          <div class="p-1.5 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div class="space-y-1">
            <p class="font-bold tracking-wide uppercase text-amber-300">DISCLAIMER & DOMAIN OWNERSHIP NOTICE</p>
            <p>{{ directoryData?.disclaimer || '⚠ NBTF.CA is a second-level domain owned by cbx.nz — it may or may not be directly affiliated with NBTF or its developer.' }}</p>
            <p class="text-amber-400/80">{{ directoryData?.maintainerNotice || 'NBTF.ca is connected via Cloudflare, domain owned by cbx.nz who also owns cbx.kiwi.' }}</p>
          </div>
        </div>

        <!-- Footer Links and Copyright -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {{ new Date().getFullYear() }} NBTF.CA Network Directory. All rights reserved.
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <a href="https://www.nbtf.ca" class="hover:text-cyan-400 transition-colors">Game Portal (www.nbtf.ca)</a>
            <span class="text-slate-700">&bull;</span>
            <a href="https://cbx.kiwi" target="_blank" class="hover:text-cyan-400 transition-colors">Maintainer (cbx.kiwi)</a>
            <span class="text-slate-700">&bull;</span>
            <a href="https://adminpanel.nbtf.ca" class="hover:text-cyan-400 transition-colors">Admin Gateway</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { defaultDirectoryData, type DirectoryData } from '~/data/defaultDirectory'

// Fetch directory data via SSR / API
const { data: response } = await useFetch<{ success: boolean; data: DirectoryData }>('/api/directory')
const directoryData = ref<DirectoryData>(response.value?.data || defaultDirectoryData)

// Filters and search state
const searchQuery = ref('')
const selectedCategory = ref('all')
const copiedId = ref<string | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

// Current real-time clock
const currentTime = ref('00:00:00')
let timeInterval: any = null

onMounted(() => {
  const updateTime = () => {
    const d = new Date()
    currentTime.value = d.toISOString().substring(11, 19)
  }
  updateTime()
  timeInterval = setInterval(updateTime, 1000)

  // Keyboard shortcut '/' to focus search
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement !== searchInputRef.value) {
      e.preventDefault()
      searchInputRef.value?.focus()
    }
  }
  window.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    if (timeInterval) clearInterval(timeInterval)
    window.removeEventListener('keydown', handleKeydown)
  })
})

// Counts
const totalLinksCount = computed(() => {
  if (!directoryData.value?.categories) return 0
  return directoryData.value.categories.reduce((acc, cat) => acc + (cat.links?.length || 0), 0)
})

const totalEmailsCount = computed(() => {
  if (!directoryData.value?.categories) return 0
  return directoryData.value.categories.reduce((acc, cat) => {
    return acc + (cat.links?.filter(l => l.isEmail || l.url?.startsWith('mailto:')).length || 0)
  }, 0)
})

// Filtered categories & links
const filteredCategories = computed(() => {
  if (!directoryData.value?.categories) return []

  const query = searchQuery.value.trim().toLowerCase()
  const catFilter = selectedCategory.value

  return directoryData.value.categories
    .filter(cat => catFilter === 'all' || cat.name === catFilter)
    .map(cat => {
      if (!query) return cat

      const matchingLinks = cat.links.filter(link => {
        return (
          link.title?.toLowerCase().includes(query) ||
          link.description?.toLowerCase().includes(query) ||
          link.displayUrl?.toLowerCase().includes(query) ||
          link.url?.toLowerCase().includes(query) ||
          link.badge?.toLowerCase().includes(query)
        )
      })

      return {
        ...cat,
        links: matchingLinks
      }
    })
    .filter(cat => cat.links.length > 0)
})

// Clipboard helper
const copyToClipboard = async (text: string, id: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedId.value = id
    setTimeout(() => {
      if (copiedId.value === id) {
        copiedId.value = null
      }
    }, 2000)
  } catch (err) {
    console.error('Failed to copy to clipboard', err)
  }
}
</script>
