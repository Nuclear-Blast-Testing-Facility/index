import { defineComponent, withAsyncContext, ref, computed, mergeProps, toValue, reactive, watch, getCurrentInstance, onServerPrefetch, shallowRef, nextTick, unref, toRef, createElementBlock, provide, cloneVNode, h, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { A as hash } from '../_/nitro.mjs';
import { isPlainObject } from '@vue/shared';
import { g as fetchDefaults, a as useNuxtApp, d as asyncDataDefaults, f as createError, s as sanitizeTag } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

//#region src/index.ts
const DEBOUNCE_DEFAULTS = { trailing: true };
/**
Debounce functions
@param fn - Promise-returning/async function to debounce.
@param wait - Milliseconds to wait before calling `fn`. Default value is 25ms
@returns A function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.
@example
```
import { debounce } from 'perfect-debounce';
const expensiveCall = async input => input;
const debouncedFn = debounce(expensiveCall, 200);
for (const number of [1, 2, 3]) {
console.log(await debouncedFn(number));
}
//=> 1
//=> 2
//=> 3
```
*/
function debounce(fn, wait = 25, options = {}) {
	options = {
		...DEBOUNCE_DEFAULTS,
		...options
	};
	if (!Number.isFinite(wait)) throw new TypeError("Expected `wait` to be a finite number");
	let leadingValue;
	let timeout;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		currentPromise = _applyPromised(fn, _this, args);
		currentPromise.finally(() => {
			currentPromise = null;
			if (options.trailing && trailingArgs && !timeout) {
				const promise = applyFn(_this, trailingArgs);
				trailingArgs = null;
				return promise;
			}
		});
		return currentPromise;
	};
	const debounced = function(...args) {
		if (options.trailing) trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = !timeout && options.leading;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				const promise = options.leading ? leadingValue : applyFn(this, args);
				trailingArgs = null;
				for (const _resolve of resolveList) _resolve(promise);
				resolveList = [];
			}, wait);
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
	const _clearTimeout = (timer) => {
		if (timer) {
			clearTimeout(timer);
			timeout = null;
		}
	};
	debounced.isPending = () => !!timeout;
	debounced.cancel = () => {
		_clearTimeout(timeout);
		resolveList = [];
		trailingArgs = null;
	};
	debounced.flush = () => {
		_clearTimeout(timeout);
		if (!trailingArgs || currentPromise) return;
		const args = trailingArgs;
		trailingArgs = null;
		return applyFn(this, args);
	};
	return debounced;
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}

const defaultDirectoryData = {
  siteTitle: "NBTF.CA Domain Directory",
  siteTagline: "Official subdomain directory, network routing, and contact endpoints for nbtf.ca",
  disclaimer: "\u26A0 NBTF.CA is a second-level domain owned by cbx.nz \u2014 it may or may not be directly affiliated with NBTF or its developer.",
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
};
function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      var _a;
      if (mounted.value) {
        const vnodes = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  (_a = options.server) != null ? _a : options.server = true;
  (_b = options.default) != null ? _b : options.default = getDefault;
  (_c = options.getCachedData) != null ? _c : options.getCachedData = getDefaultCachedData;
  (_d = options.lazy) != null ? _d : options.lazy = false;
  (_e = options.immediate) != null ? _e : options.immediate = true;
  (_f = options.deep) != null ? _f : options.deep = asyncDataDefaults.deep;
  (_g = options.dedupe) != null ? _g : options.dedupe = "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    var _a2;
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.data;
    }),
    pending: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.pending;
    }),
    status: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.status;
    }),
    error: writableComputedRef(() => {
      var _a2;
      return (_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2.error;
    }),
    refresh: (...args2) => {
      var _a2;
      if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry = nuxtApp._asyncData[key.value];
      if (entry == null ? void 0 : entry._abortController) {
        try {
          entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  Object.defineProperties(asyncDataPromise, {
    then: { enumerable: true, value: asyncDataPromise.then.bind(asyncDataPromise) },
    catch: { enumerable: true, value: asyncDataPromise.catch.bind(asyncDataPromise) },
    finally: { enumerable: true, value: asyncDataPromise.finally.bind(asyncDataPromise) }
  });
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      var _a;
      return (_a = getter()) == null ? void 0 : _a.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  var _a, _b;
  (_b = (_a = nuxtApp.payload._errors)[key]) != null ? _b : _a[key] = asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      var _a2, _b2;
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer((_a2 = opts.dedupe) != null ? _a2 : options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: (_b2 = opts.cause) != null ? _b2 : "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          var _a3, _b3;
          try {
            const timeout = (_a3 = opts.timeout) != null ? _a3 : options.timeout;
            const mergedSignal = mergeAbortSignals([(_b3 = asyncData._abortController) == null ? void 0 : _b3.signal, opts == null ? void 0 : opts.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason != null ? reason : "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        var _a3;
        if (nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if ((_a3 = asyncData._abortController) == null ? void 0 : _a3.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        if (nuxtApp._asyncDataPromises[key] === promise) {
          {
            asyncData.pending.value = false;
          }
          delete nuxtApp._asyncDataPromises[key];
        }
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      var _a2, _b2;
      unsubRefreshAsyncData();
      if ((_a2 = nuxtApp._asyncData[key]) == null ? void 0 : _a2._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (nuxtApp._asyncDataPromises[key]) {
        (_b2 = asyncData._abortController) == null ? void 0 : _b2.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
        delete nuxtApp._asyncDataPromises[key];
        if (asyncData.status.value === "pending") {
          asyncData.status.value = "idle";
        }
        {
          asyncData.pending.value = false;
        }
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          var _a3;
          if (!((_a3 = nuxtApp._asyncData[key]) == null ? void 0 : _a3._init)) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  var _a, _b, _c;
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = (_a = AbortSignal.timeout) == null ? void 0 : _a.call(AbortSignal, timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = (_b = sig.reason) != null ? _b : new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    var _a2;
    const abortedSignal = list.find((s) => s.aborted);
    const reason = (_a2 = abortedSignal == null ? void 0 : abortedSignal.reason) != null ? _a2 : new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    (_c = sig.addEventListener) == null ? void 0 : _c.call(sig, "abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = [{}, arg1];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    const resolvedOptions = { signal, ..._fetchOptions };
    for (const key2 of MAYBE_REF_OR_GETTER_OPTION_KEYS) {
      if (typeof resolvedOptions[key2] === "function") {
        resolvedOptions[key2] = toValue(resolvedOptions[key2]);
      }
    }
    return _$fetch(_request.value, resolvedOptions);
  }, _asyncDataOptions);
  return asyncData;
}
const MAYBE_REF_OR_GETTER_OPTION_KEYS = ["method", "baseURL", "query", "params", "body", "headers"];
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const entries = [];
      for (const entry of value.entries()) {
        const [key, val] = entry;
        entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
      }
      segments.push(hash(entries));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { data: response } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/directory",
      "$-0dwDV4GBu"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const directoryData = ref(((_a = response.value) == null ? void 0 : _a.data) || defaultDirectoryData);
    const searchQuery = ref("");
    const selectedCategory = ref("all");
    const copiedId = ref(null);
    ref(null);
    const currentTime = ref("00:00:00");
    const totalLinksCount = computed(() => {
      var _a2;
      if (!((_a2 = directoryData.value) == null ? void 0 : _a2.categories)) return 0;
      return directoryData.value.categories.reduce((acc, cat) => {
        var _a3;
        return acc + (((_a3 = cat.links) == null ? void 0 : _a3.length) || 0);
      }, 0);
    });
    const totalEmailsCount = computed(() => {
      var _a2;
      if (!((_a2 = directoryData.value) == null ? void 0 : _a2.categories)) return 0;
      return directoryData.value.categories.reduce((acc, cat) => {
        var _a3;
        return acc + (((_a3 = cat.links) == null ? void 0 : _a3.filter((l) => {
          var _a4;
          return l.isEmail || ((_a4 = l.url) == null ? void 0 : _a4.startsWith("mailto:"));
        }).length) || 0);
      }, 0);
    });
    const filteredCategories = computed(() => {
      var _a2;
      if (!((_a2 = directoryData.value) == null ? void 0 : _a2.categories)) return [];
      const query = searchQuery.value.trim().toLowerCase();
      const catFilter = selectedCategory.value;
      return directoryData.value.categories.filter((cat) => catFilter === "all" || cat.name === catFilter).map((cat) => {
        if (!query) return cat;
        const matchingLinks = cat.links.filter((link) => {
          var _a3, _b, _c, _d, _e;
          return ((_a3 = link.title) == null ? void 0 : _a3.toLowerCase().includes(query)) || ((_b = link.description) == null ? void 0 : _b.toLowerCase().includes(query)) || ((_c = link.displayUrl) == null ? void 0 : _c.toLowerCase().includes(query)) || ((_d = link.url) == null ? void 0 : _d.toLowerCase().includes(query)) || ((_e = link.badge) == null ? void 0 : _e.toLowerCase().includes(query));
        });
        return {
          ...cat,
          links: matchingLinks
        };
      }).filter((cat) => cat.links.length > 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col justify-between" }, _attrs))}>`);
      if ((_b = (_a2 = directoryData.value) == null ? void 0 : _a2.bannerAnnouncement) == null ? void 0 : _b.enabled) {
        _push(`<div class="bg-cyan-950/70 border-b border-cyan-500/30 px-4 py-2 text-xs md:text-sm font-mono flex items-center justify-between text-cyan-200"><div class="container mx-auto flex items-center gap-2 justify-center text-center"><span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold uppercase tracking-wider text-[10px] border border-cyan-500/40"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span> NETWORK BULLETIN </span><span>${ssrInterpolate(directoryData.value.bannerAnnouncement.text)}</span>`);
        if (directoryData.value.bannerAnnouncement.link) {
          _push(`<a${ssrRenderAttr("href", directoryData.value.bannerAnnouncement.link)} target="_blank" class="underline font-bold hover:text-white ml-1 inline-flex items-center gap-0.5"> View Details \u2192 </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="border-b border-slate-800/80 bg-facility-900/80 backdrop-blur-md sticky top-0 z-40"><div class="container mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-3.5"><div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]"><svg class="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg></div><div><div class="flex items-center gap-2"><h1 class="font-display text-xl font-bold tracking-wider text-white">NBTF.CA</h1><span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ONLINE </span></div><p class="text-xs text-slate-400 font-mono">Domain Directory &amp; Routing Registry</p></div></div><div class="flex items-center gap-4 text-xs font-mono text-slate-400"><div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-facility-850 border border-slate-800"><span class="text-slate-500">SYS_TIME:</span><span class="text-cyan-300">${ssrInterpolate(currentTime.value)} UTC</span></div><a href="https://web.nbtf.ca" target="_blank" class="px-3 py-1.5 rounded bg-facility-800 hover:bg-facility-700 text-slate-200 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1.5"><span>Game Portal</span><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div></div></header><main class="container mx-auto px-4 py-8 flex-1 max-w-6xl"><section class="text-center py-6 md:py-10"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4"><span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> NETWORK DIRECTORY // ROUTING HUB </div><h2 class="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-3"> NBTF.CA NETWORK DIRECTORY </h2><p class="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">${ssrInterpolate(((_c = directoryData.value) == null ? void 0 : _c.siteTagline) || "Explore official portals, companion applications, faction domains, and communication channels.")}</p><div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 font-mono text-left"><div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80"><span class="text-slate-500 text-xs">TOTAL ENDPOINTS</span><p class="text-xl font-bold text-cyan-400 font-display mt-0.5">${ssrInterpolate(totalLinksCount.value)}</p></div><div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80"><span class="text-slate-500 text-xs">CATEGORIES</span><p class="text-xl font-bold text-emerald-400 font-display mt-0.5">${ssrInterpolate(((_e = (_d = directoryData.value) == null ? void 0 : _d.categories) == null ? void 0 : _e.length) || 0)}</p></div><div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80"><span class="text-slate-500 text-xs">PUBLIC EMAILS</span><p class="text-xl font-bold text-amber-400 font-display mt-0.5">${ssrInterpolate(totalEmailsCount.value)}</p></div><div class="p-3.5 rounded-lg bg-facility-900/90 border border-slate-800/80"><span class="text-slate-500 text-xs">DOMAIN SPONSOR</span><p class="text-xl font-bold text-indigo-400 font-display mt-0.5">cbx.nz</p></div></div></section><section class="mt-4 mb-8 space-y-4"><div class="flex flex-col md:flex-row gap-3 items-center justify-between"><div class="relative w-full md:max-w-md"><div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search endpoints, subdomains, emails (press &#39;/&#39; to focus)..." class="w-full pl-10 pr-10 py-2.5 bg-facility-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500 font-mono transition-all">`);
      if (searchQuery.value) {
        _push(`<button class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-wrap gap-2 w-full md:w-auto"><button class="${ssrRenderClass([
        "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all",
        selectedCategory.value === "all" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]" : "bg-facility-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
      ])}"> All Items (${ssrInterpolate(totalLinksCount.value)}) </button><!--[-->`);
      ssrRenderList(((_f = directoryData.value) == null ? void 0 : _f.categories) || [], (cat) => {
        var _a3;
        _push(`<button class="${ssrRenderClass([
          "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all",
          selectedCategory.value === cat.name ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]" : "bg-facility-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
        ])}">${ssrInterpolate(cat.name)} (${ssrInterpolate(((_a3 = cat.links) == null ? void 0 : _a3.length) || 0)}) </button>`);
      });
      _push(`<!--]--></div></div></section><section class="space-y-10"><!--[-->`);
      ssrRenderList(filteredCategories.value, (category) => {
        _push(`<div class="space-y-4"><div class="flex items-center justify-between border-b border-slate-800/80 pb-2.5"><div class="flex items-center gap-2.5"><span class="w-2.5 h-2.5 bg-cyan-400 rotate-45"></span><h3 class="text-lg md:text-xl font-display font-bold uppercase tracking-wider text-slate-100">${ssrInterpolate(category.name)}</h3><span class="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">${ssrInterpolate(category.links.length)}</span></div>`);
        if (category.description) {
          _push(`<p class="hidden md:block text-xs font-mono text-slate-500">${ssrInterpolate(category.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"><!--[-->`);
        ssrRenderList(category.links, (link) => {
          _push(`<div class="tactical-glass tactical-glass-hover rounded-xl p-5 flex flex-col justify-between group relative overflow-hidden"><div class="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden"><div class="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-8 h-8 bg-cyan-500/20 rotate-45 border border-cyan-500/30"></div></div><div><div class="flex items-center justify-between gap-2 mb-2">`);
          if (link.badge) {
            _push(`<span class="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">${ssrInterpolate(link.badge)}</span>`);
          } else if (link.isEmail) {
            _push(`<span class="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30"> Email Endpoint </span>`);
          } else {
            _push(`<span class="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700"> Subdomain </span>`);
          }
          _push(`<div class="flex items-center gap-1.5 text-[11px] font-mono text-slate-400"><span class="${ssrRenderClass([{
            "bg-emerald-400": link.status === "online" || !link.status,
            "bg-amber-400": link.status === "beta",
            "bg-indigo-400": link.status === "coming-soon",
            "bg-slate-400": link.status === "external"
          }, "w-2 h-2 rounded-full"])}"></span><span class="capitalize">${ssrInterpolate(link.status || "Active")}</span></div></div><h4 class="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2"><span>${ssrInterpolate(link.title)}</span></h4><p class="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">${ssrInterpolate(link.description)}</p></div><div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2"><div class="flex items-center gap-1.5 text-xs font-mono text-cyan-400/90 truncate"><span class="text-slate-500">&gt;</span><span class="truncate font-medium">${ssrInterpolate(link.displayUrl || link.url)}</span></div><div class="flex items-center gap-1.5 shrink-0"><button title="Copy to clipboard" class="p-1.5 rounded-lg bg-facility-800 hover:bg-facility-700 text-slate-400 hover:text-cyan-300 border border-slate-700/80 transition-all text-xs flex items-center gap-1">`);
          if (copiedId.value === (link.id || link.url)) {
            _push(`<span class="text-emerald-400 text-[10px] font-mono px-1">Copied!</span>`);
          } else {
            _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`);
          }
          _push(`</button><a${ssrRenderAttr("href", link.url.startsWith("//") ? "https:" + link.url : link.url)}${ssrRenderAttr("target", link.isEmail ? "_self" : "_blank")} rel="noopener noreferrer" class="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-all text-xs font-mono flex items-center gap-1 font-semibold"><span>${ssrInterpolate(link.isEmail ? "Send" : "Visit")}</span><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
      if (filteredCategories.value.length === 0) {
        _push(`<div class="tactical-glass rounded-xl p-12 text-center my-8"><div class="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-slate-400 mb-3"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><h4 class="text-base font-semibold text-white">No endpoints matched your query</h4><p class="text-xs text-slate-400 mt-1 font-mono">Query: &quot;${ssrInterpolate(searchQuery.value)}&quot;</p><button class="mt-4 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 text-xs font-mono font-medium"> Reset Filters </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></main><footer class="border-t border-slate-800 bg-facility-950/95 mt-16 py-8"><div class="container mx-auto px-4 max-w-6xl space-y-6"><div class="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs font-mono flex items-start gap-3"><div class="p-1.5 rounded bg-amber-500/20 text-amber-400 shrink-0 mt-0.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div><div class="space-y-1"><p class="font-bold tracking-wide uppercase text-amber-300">DISCLAIMER &amp; DOMAIN OWNERSHIP NOTICE</p><p>${ssrInterpolate(((_g = directoryData.value) == null ? void 0 : _g.disclaimer) || "\u26A0 NBTF.CA is a second-level domain owned by cbx.nz \u2014 it may or may not be directly affiliated with NBTF or its developer.")}</p><p class="text-amber-400/80">${ssrInterpolate(((_h = directoryData.value) == null ? void 0 : _h.maintainerNotice) || "NBTF.ca is connected via Cloudflare, domain owned by cbx.nz who also owns cbx.kiwi.")}</p></div></div><div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500"><div> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} NBTF.CA Network Directory. All rights reserved. </div><div class="flex flex-wrap items-center gap-4"><a href="https://web.nbtf.ca" class="hover:text-cyan-400 transition-colors">Game Portal (web.nbtf.ca)</a><span class="text-slate-700">\u2022</span><a href="https://cbx.kiwi" target="_blank" class="hover:text-cyan-400 transition-colors">Maintainer (cbx.kiwi)</a><span class="text-slate-700">\u2022</span><a href="https://adminpanel.nbtf.ca" class="hover:text-cyan-400 transition-colors">Admin Gateway</a></div></div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B4s-5XjK.mjs.map
