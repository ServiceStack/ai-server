var ho = Object.defineProperty;
var go = (e, t, s) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (go(e, typeof t != "symbol" ? t + "" : t, s), s);
import { defineComponent as ue, computed as v, openBlock as o, createElementBlock as i, normalizeClass as h, createElementVNode as l, createCommentVNode as x, renderSlot as U, ref as D, toDisplayString as O, inject as Ze, nextTick as Dt, isRef as rn, unref as W, mergeProps as Ae, withModifiers as qe, h as Ft, resolveComponent as Q, createBlock as le, withCtx as _e, useAttrs as yo, createVNode as ge, createTextVNode as we, watchEffect as Vs, normalizeStyle as dl, Fragment as Me, renderList as Ie, withDirectives as Bt, vModelCheckbox as cl, withKeys as un, createStaticVNode as Ts, vModelSelect as bo, useSlots as Is, getCurrentInstance as Pe, onMounted as ot, createSlots as fl, normalizeProps as Xt, guardReactiveProps as Ss, vModelDynamic as wo, onUnmounted as Et, watch as Lt, vModelText as ko, resolveDynamicComponent as dn, provide as fs, resolveDirective as _o } from "vue";
import { errorResponseExcept as $o, toDate as kt, toTime as Co, omit as yt, enc as Ys, appendQueryString as Yt, lastLeftPart as cn, setQueryString as xo, nameOf as Lo, ApiResult as nt, lastRightPart as Pt, leftPart as js, map as Xe, toDateTime as Vo, toCamelCase as So, mapGet as ke, chop as Mo, fromXsdDuration as fn, isDate as Os, timeFmt12 as Ao, dateFmt as Fo, apiValue as To, indexOfAny as Io, createBus as jo, toKebabCase as Xl, sanitize as Oo, humanize as He, delaySet as vn, rightPart as $s, queryString as el, combinePaths as Do, toPascalCase as vt, errorResponse as _t, trimEnd as Bo, $1 as Ms, ResponseStatus as Gs, ResponseError as Yl, HttpMethods as vl, omitEmpty as Po, uniqueKeys as tl, humanify as pn, each as Ho } from "@servicestack/client";
const Ro = { class: "flex items-center" }, Eo = {
  key: 0,
  class: "flex-shrink-0 mr-3"
}, zo = {
  key: 0,
  class: "h-5 w-5 text-yellow-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, No = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
  "clip-rule": "evenodd"
}, null, -1), Uo = [
  No
], qo = {
  key: 1,
  class: "h-5 w-5 text-red-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Qo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
  "clip-rule": "evenodd"
}, null, -1), Ko = [
  Qo
], Zo = {
  key: 2,
  class: "h-5 w-5 text-blue-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Wo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
  "clip-rule": "evenodd"
}, null, -1), Go = [
  Wo
], Jo = {
  key: 3,
  class: "h-5 w-5 text-green-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Xo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  "clip-rule": "evenodd"
}, null, -1), Yo = [
  Xo
], ea = /* @__PURE__ */ ue({
  __name: "Alert",
  props: {
    type: { default: "warn" },
    hideIcon: { type: Boolean }
  },
  setup(e) {
    const t = e, s = v(() => t.type == "info" ? "bg-blue-50 dark:bg-blue-200" : t.type == "error" ? "bg-red-50 dark:bg-red-200" : t.type == "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200"), n = v(() => t.type == "info" ? "border-blue-400" : t.type == "error" ? "border-red-400" : t.type == "success" ? "border-green-400" : "border-yellow-400"), a = v(() => t.type == "info" ? "text-blue-700" : t.type == "error" ? "text-red-700" : t.type == "success" ? "text-green-700" : "text-yellow-700");
    return (r, u) => (o(), i("div", {
      class: h([s.value, n.value, "border-l-4 p-4"])
    }, [
      l("div", Ro, [
        r.hideIcon ? x("", !0) : (o(), i("div", Eo, [
          r.type == "warn" ? (o(), i("svg", zo, Uo)) : r.type == "error" ? (o(), i("svg", qo, Ko)) : r.type == "info" ? (o(), i("svg", Zo, Go)) : r.type == "success" ? (o(), i("svg", Jo, Yo)) : x("", !0)
        ])),
        l("div", null, [
          l("p", {
            class: h([a.value, "text-sm"])
          }, [
            U(r.$slots, "default")
          ], 2)
        ])
      ])
    ], 2));
  }
}), ta = {
  key: 0,
  class: "rounded-md bg-green-50 dark:bg-green-200 p-4",
  role: "alert"
}, sa = { class: "flex" }, la = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-green-400 dark:text-green-500",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 13l4 4L19 7"
    })
  ])
], -1), na = { class: "ml-3" }, oa = { class: "text-sm font-medium text-green-800" }, aa = { key: 0 }, ra = { class: "ml-auto pl-3" }, ia = { class: "-mx-1.5 -my-1.5" }, ua = /* @__PURE__ */ l("span", { class: "sr-only" }, "Dismiss", -1), da = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
], -1), ca = [
  ua,
  da
], fa = /* @__PURE__ */ ue({
  __name: "AlertSuccess",
  props: {
    message: {}
  },
  setup(e) {
    const t = D(!1);
    return (s, n) => t.value ? x("", !0) : (o(), i("div", ta, [
      l("div", sa, [
        la,
        l("div", na, [
          l("h3", oa, [
            s.message ? (o(), i("span", aa, O(s.message), 1)) : U(s.$slots, "default", { key: 1 })
          ])
        ]),
        l("div", ra, [
          l("div", ia, [
            l("button", {
              type: "button",
              class: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-200",
              onClick: n[0] || (n[0] = (a) => t.value = !0)
            }, ca)
          ])
        ])
      ])
    ]));
  }
}), va = { class: "flex" }, pa = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-red-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ l("path", {
      fill: "currentColor",
      d: "M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
    })
  ])
], -1), ma = { class: "ml-3" }, ha = { class: "text-sm text-red-700 dark:text-red-200" }, ga = /* @__PURE__ */ ue({
  __name: "ErrorSummary",
  props: {
    status: {},
    except: {},
    class: {}
  },
  setup(e) {
    const t = e;
    let s = Ze("ApiState", void 0);
    const n = v(() => t.status || s != null && s.error.value ? $o.call({ responseStatus: t.status ?? (s == null ? void 0 : s.error.value) }, t.except ?? []) : null);
    return (a, r) => n.value ? (o(), i("div", {
      key: 0,
      class: h(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", va, [
        pa,
        l("div", ma, [
          l("p", ha, O(n.value), 1)
        ])
      ])
    ], 2)) : x("", !0);
  }
}), ya = ["id", "aria-describedby"], ba = /* @__PURE__ */ ue({
  __name: "InputDescription",
  props: {
    id: {},
    description: {}
  },
  setup(e) {
    return (t, s) => t.description ? (o(), i("div", {
      key: "description",
      class: "mt-2 text-sm text-gray-500",
      id: `${t.id}-description`,
      "aria-describedby": `${t.id}-description`
    }, [
      l("div", null, O(t.description), 1)
    ], 8, ya)) : x("", !0);
  }
});
function Ds(e) {
  if (e == null || typeof e == "object")
    return "";
  const t = kt(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 10) ?? "";
}
function mn(e) {
  if (e == null || typeof e == "object")
    return "";
  const t = kt(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 19) ?? "";
}
function hn(e) {
  return e == null ? "" : Co(e);
}
function gn(e, t) {
  if (J.config.inputValue)
    return J.config.inputValue(e, t);
  let s = e === "date" ? Ds(t) : e === "datetime-local" ? mn(t) : e === "time" ? hn(t) : t;
  const n = typeof s;
  return s = s == null ? "" : n == "boolean" || n == "number" ? `${s}` : s, s;
}
function yn(e, t) {
  e.value = null, Dt(() => e.value = t);
}
function Kt(e) {
  return Object.keys(e).forEach((t) => {
    const s = e[t];
    e[t] = rn(s) ? W(s) : s;
  }), e;
}
function xt(e, t, s) {
  s ? (t.value = e.entering.cls + " " + e.entering.from, setTimeout(() => t.value = e.entering.cls + " " + e.entering.to, 0)) : (t.value = e.leaving.cls + " " + e.leaving.from, setTimeout(() => t.value = e.leaving.cls + " " + e.leaving.to, 0));
}
function Cs(e) {
  if (typeof document > "u")
    return;
  let t = (e == null ? void 0 : e.after) || document.activeElement, s = t && t.form;
  if (s) {
    let n = ':not([disabled]):not([tabindex="-1"])', a = s.querySelectorAll(`a:not([disabled]), button${n}, input[type=text]${n}, [tabindex]${n}`), r = Array.prototype.filter.call(
      a,
      (d) => d.offsetWidth > 0 || d.offsetHeight > 0 || d === t
    ), u = r.indexOf(t);
    u > -1 && (r[u + 1] || r[0]).focus();
  }
}
function zt(e) {
  if (!e)
    return null;
  if (typeof e == "string")
    return e;
  const t = typeof e == "function" ? new e() : typeof e == "object" ? e : null;
  if (!t)
    throw new Error(`Invalid DTO Type '${typeof e}'`);
  if (typeof t.getTypeName != "function")
    throw new Error(`${JSON.stringify(t)} is not a Request DTO`);
  const s = t.getTypeName();
  if (!s)
    throw new Error("DTO Required");
  return s;
}
function ht(e, t, s) {
  s || (s = {});
  let n = s.cls || s.className || s.class;
  return n && (s = yt(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + sl(s) + "/>" : `<${e}` + sl(s) + `>${t || ""}</${e}>`;
}
function sl(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${Ys(e[s])}"`, "");
}
function Bs(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Gt(e) {
  return Tl(e);
}
let wa = ["string", "number", "boolean", "null", "undefined"];
function Ht(e) {
  return wa.indexOf(typeof e) >= 0 || e instanceof Date;
}
function Jt(e) {
  return !Ht(e);
}
class bn {
  get length() {
    return typeof localStorage > "u" ? 0 : localStorage.length;
  }
  getItem(t) {
    return typeof localStorage > "u" ? null : localStorage.getItem(t);
  }
  setItem(t, s) {
    typeof localStorage > "u" || localStorage.setItem(t, s);
  }
  removeItem(t) {
    typeof localStorage > "u" || localStorage.removeItem(t);
  }
  clear() {
    typeof localStorage > "u" || localStorage.clear();
  }
  key(t) {
    return typeof localStorage > "u" ? null : localStorage.key(t);
  }
}
function As(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function pl(e, t) {
  if (typeof history < "u") {
    const s = t ? Yt(cn(location.href, "?"), e) : xo(location.href, e);
    history.pushState({}, "", s);
  }
}
function ml(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, r) => (a[r] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function ll(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function hl(e) {
  const t = J.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Ps(e, t) {
  return Yt(`swr.${Lo(e)}`, t ? Object.assign({}, e, t) : e);
}
function ka(e) {
  if (e.request) {
    const t = Ps(e.request, e.args);
    J.config.storage.removeItem(t);
  }
}
async function wn(e, t, s, n, a) {
  const r = Ps(t, n);
  s(new nt({ response: hl(r) }));
  const u = await e.api(t, n, a);
  if (u.succeeded && u.response) {
    u.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const d = JSON.stringify(u.response);
    J.config.storage.setItem(r, d), s(u);
  }
  return u;
}
function kn(e, t) {
  let s = null;
  return (...n) => {
    s && clearTimeout(s), s = setTimeout(() => {
      e(...n);
    }, t || 100);
  };
}
function Tt(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function Ot(e, t) {
  const s = Tt(t);
  return e.reduce((n, a) => (n[a] = !s.includes(a), n), {});
}
function _n() {
  return {
    LocalStore: bn,
    dateInputFormat: Ds,
    dateTimeInputFormat: mn,
    timeInputFormat: hn,
    textInputValue: gn,
    setRef: yn,
    unRefs: Kt,
    transition: xt,
    focusNextElement: Cs,
    getTypeName: zt,
    htmlTag: ht,
    htmlAttrs: sl,
    linkAttrs: Bs,
    toAppUrl: Gt,
    isPrimitive: Ht,
    isComplexType: Jt,
    pushState: pl,
    scopedExpr: ml,
    copyText: ll,
    fromCache: hl,
    swrCacheKey: Ps,
    swrClear: ka,
    swrApi: wn,
    asStrings: Tt,
    asOptions: Ot,
    createDebounce: kn
  };
}
const $n = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), Cn = {
  img: "png,jpg,jpeg,gif,svg,webp,png,jpg,jpeg,gif,bmp,tif,tiff,webp,ai,psd,ps".split(","),
  vid: "avi,m4v,mov,mp4,mpg,mpeg,wmv,webm".split(","),
  aud: "mp3,mpa,ogg,wav,wma,mid,webm".split(","),
  ppt: "key,odp,pps,ppt,pptx".split(","),
  xls: "xls,xlsm,xlsx,ods,csv,tsv".split(","),
  doc: "doc,docx,pdf,rtf,tex,txt,md,rst,xls,xlsm,xlsx,ods,key,odp,pps,ppt,pptx".split(","),
  zip: "zip,tar,gz,7z,rar,gzip,deflate,br,iso,dmg,z,lz,lz4,lzh,s7z,apl,arg,jar,war".split(","),
  exe: "exe,bat,sh,cmd,com,app,msi,run,vb,vbs,js,ws,wsh".split(","),
  att: "bin,oct,dat".split(",")
  //attachment
}, en = Object.keys(Cn), wt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, xs = {
  img: wt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: wt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: wt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: wt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: wt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: wt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: wt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: wt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: wt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, _a = /[\r\n%#()<>?[\\\]^`{|}]/g, tn = 1024, $a = ["Bytes", "KB", "MB", "GB", "TB"], Ca = (() => {
  const e = "application/", t = e + "vnd.openxmlformats-officedocument.", s = "image/", n = "text/", a = "audio/", r = "video/", u = {
    jpg: s + "jpeg",
    tif: s + "tiff",
    svg: s + "svg+xml",
    ico: s + "x-icon",
    ts: n + "typescript",
    py: n + "x-python",
    sh: n + "x-sh",
    mp3: a + "mpeg3",
    mpg: r + "mpeg",
    ogv: r + "ogg",
    xlsx: t + "spreadsheetml.sheet",
    xltx: t + "spreadsheetml.template",
    docx: t + "wordprocessingml.document",
    dotx: t + "wordprocessingml.template",
    pptx: t + "presentationml.presentation",
    potx: t + "presentationml.template",
    ppsx: t + "presentationml.slideshow",
    mdb: e + "vnd.ms-access"
  };
  function d(f, m) {
    f.split(",").forEach((_) => u[_] = m);
  }
  function c(f, m) {
    f.split(",").forEach((_) => u[_] = m(_));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (f) => s + f), c("jsx,csv,css", (f) => n + f), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (f) => a + f), c("3gpp,avi,dv,divx,ogg,mp4,webm", (f) => r + f), c("rtf,pdf", (f) => e + f), d("htm,html,shtm", n + "html"), d("js,mjs,cjs", n + "javascript"), d("yml,yaml", e + "yaml"), d("bat,cmd", e + "bat"), d("xml,csproj,fsproj,vbproj", n + "xml"), d("txt,ps1", n + "plain"), d("qt,mov", r + "quicktime"), d("doc,dot", e + "msword"), d("xls,xlt,xla", e + "excel"), d("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), d("cer,crt,der", e + "x-x509-ca-cert"), d("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), d("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), u;
})();
let nl = [];
function xn(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(_a, encodeURIComponent);
}
function gl(e) {
  return "data:image/svg+xml;utf8," + xn(e);
}
function Ln(e) {
  let t = URL.createObjectURL(e);
  return nl.push(t), t;
}
function Vn() {
  nl.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), nl = [];
}
function yl(e) {
  if (!e)
    return null;
  let t = js(e, "?");
  return Pt(t, "/");
}
function vs(e) {
  let t = yl(e);
  return t == null || t.indexOf(".") === -1 ? null : Pt(t, ".").toLowerCase();
}
function bl(e) {
  let t = vs(e.name);
  return t && $n.indexOf(t) >= 0 ? Ln(e) : It(e.name);
}
function wl(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = vs(e);
  return t && $n.indexOf(t) >= 0 || !1;
}
function It(e) {
  if (!e)
    return null;
  let t = vs(e);
  return t == null || wl(e) ? e : rs(t) || gl(xs.doc);
}
function rs(e) {
  let t = Sn(e);
  return t && gl(t) || null;
}
function Sn(e) {
  if (xs[e])
    return xs[e];
  for (let t = 0; t < en.length; t++) {
    let s = en[t];
    if (Cn[s].indexOf(e) >= 0)
      return xs[s];
  }
  return null;
}
function kl(e, t = 2) {
  if (e === 0)
    return "0 Bytes";
  const s = t < 0 ? 0 : t, n = Math.floor(Math.log(e) / Math.log(tn));
  return parseFloat((e / Math.pow(tn, n)).toFixed(s)) + " " + $a[n];
}
function xa(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: bl(t) }));
}
function Hs(e, t) {
  e.onerror = null, e.src = _l(e.src, t) || "";
}
function _l(e, t) {
  return rs(Pt(e, ".").toLowerCase()) || (t ? rs(t) || t : null) || rs("doc");
}
function ol(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Pt(e, ".").toLowerCase();
  return Ca[t] || "application/" + t;
}
function La() {
  return {
    extSvg: Sn,
    extSrc: rs,
    getExt: vs,
    encodeSvg: xn,
    canPreview: wl,
    getFileName: yl,
    getMimeType: ol,
    formatBytes: kl,
    filePathUri: It,
    svgToDataUri: gl,
    fileImageUri: bl,
    objectUrl: Ln,
    flush: Vn,
    inputFiles: xa,
    iconOnError: Hs,
    iconFallbackSrc: _l
  };
}
class Va {
  constructor(t) {
    Le(this, "view");
    Le(this, "includeTypes");
    Object.assign(this, t);
  }
  getTypeName() {
    return "MetadataApp";
  }
  getMethod() {
    return "GET";
  }
  createResponse() {
    return {};
  }
}
const es = "/metadata/app.json", Sa = {
  Boolean: "checkbox",
  DateTime: "date",
  DateOnly: "date",
  DateTimeOffset: "date",
  TimeSpan: "time",
  TimeOnly: "time",
  Byte: "number",
  Short: "number",
  Int64: "number",
  Int32: "number",
  UInt16: "number",
  UInt32: "number",
  UInt64: "number",
  Single: "number",
  Double: "number",
  Decimal: "number",
  String: "text",
  Guid: "text",
  Uri: "text"
}, Ma = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, al = {
  Byte: "byte",
  Int16: "short",
  Int32: "int",
  Int64: "long",
  UInt16: "ushort",
  Unt32: "uint",
  UInt64: "ulong",
  Single: "float",
  Double: "double",
  Decimal: "decimal"
};
[...Object.keys(al), ...Object.values(al)];
const Aa = {
  String: "string",
  Boolean: "bool",
  ...al
};
function ws(e) {
  return Aa[e] || e;
}
function Mn(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? ws(t[0]) + "?" : e.endsWith("[]") ? `List<${ws(e.substring(0, e.length - 2))}>` : t.length === 0 ? ws(e) : js(ws(e), "`") + "<" + t.join(",") + ">") : "";
}
function Fa(e) {
  return e && Mn(e.name, e.genericArgs);
}
class Rt {
  constructor() {
    Le(this, "Query");
    Le(this, "QueryInto");
    Le(this, "Create");
    Le(this, "Update");
    Le(this, "Patch");
    Le(this, "Delete");
  }
  get AnyQuery() {
    return this.Query || this.QueryInto;
  }
  get AnyUpdate() {
    return this.Patch || this.Update;
  }
  get dataModel() {
    var t;
    return (t = this.AnyQuery) == null ? void 0 : t.dataModel;
  }
  toArray() {
    return [this.Query, this.QueryInto, this.Create, this.Update, this.Patch, this.Delete].filter((s) => !!s).map((s) => s);
  }
  get empty() {
    return !this.Query && !this.QueryInto && !this.Create && !this.Update && !this.Patch && !this.Delete;
  }
  add(t) {
    Ke.isQueryInto(t) && !this.QueryInto ? this.QueryInto = t : Ke.isQuery(t) && !this.Query ? this.Query = t : Ke.isCreate(t) && !this.Create ? this.Create = t : Ke.isUpdate(t) && !this.Update ? this.Update = t : Ke.isPatch(t) && !this.Patch ? this.Patch = t : Ke.isDelete(t) && !this.Delete && (this.Delete = t);
  }
  static from(t) {
    const s = new Rt();
    return t.forEach((n) => {
      s.add(n);
    }), s;
  }
  static forType(t, s) {
    var a;
    let n = new Rt();
    if (J.config.apisResolver && t) {
      const r = J.config.apisResolver(t, s);
      r && (n.Query = r.Query, n.QueryInto = r.QueryInto, n.Create = r.Create, n.Update = r.Update, n.Patch = r.Patch, n.Delete = r.Delete);
    }
    return t && (s ?? (s = (a = J.metadata.value) == null ? void 0 : a.api), s == null || s.operations.forEach((r) => {
      var u;
      ((u = r.dataModel) == null ? void 0 : u.name) == t && n.add(r);
    })), n;
  }
}
const Ke = {
  Create: "ICreateDb`1",
  Update: "IUpdateDb`1",
  Patch: "IPatchDb`1",
  Delete: "IDeleteDb`1",
  AnyRead: ["QueryDb`1", "QueryDb`2"],
  AnyWrite: ["ICreateDb`1", "IUpdateDb`1", "IPatchDb`1", "IDeleteDb`1"],
  isAnyQuery: (e) => Xe(e.request.inherits, (t) => Ke.AnyRead.indexOf(t.name) >= 0),
  isQuery: (e) => Xe(e.request.inherits, (t) => t.name === "QueryDb`1"),
  isQueryInto: (e) => Xe(e.request.inherits, (t) => t.name === "QueryDb`2"),
  isCrud: (e) => {
    var t;
    return (t = e.request.implements) == null ? void 0 : t.some((s) => Ke.AnyWrite.indexOf(s.name) >= 0);
  },
  isCreate: (e) => ks(e, Ke.Create),
  isUpdate: (e) => ks(e, Ke.Update),
  isPatch: (e) => ks(e, Ke.Patch),
  isDelete: (e) => ks(e, Ke.Delete),
  model: (e) => {
    var t, s, n;
    return e ? Xe(e.inherits, (a) => Ke.AnyRead.indexOf(a.name) >= 0) ? (t = e.inherits) == null ? void 0 : t.genericArgs[0] : (n = (s = e.implements) == null ? void 0 : s.find((a) => Ke.AnyWrite.indexOf(a.name) >= 0)) == null ? void 0 : n.genericArgs[0] : null;
  }
};
function Ta(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || Rs($l(e));
}
function An(e) {
  return e.endsWith("?") ? Mo(e, 1) : e;
}
function Rs(e) {
  return Sa[An(e)];
}
function Ia(e) {
  return e && Ma[e] || "String";
}
function $l(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function rl(e) {
  return e && Rs(e) == "number" || !1;
}
function Fn(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function ja(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function Tn(e) {
  if (!(e != null && e.type))
    return !1;
  const t = $l(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : Rs(e.type) == null;
}
function In(e) {
  var s, n, a, r;
  if (!(e != null && e.type))
    return !1;
  const t = $l(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((r = e.input) == null ? void 0 : r.type) == "combobox" ? !0 : Rs(e.type) != null;
}
function us(e, t) {
  let s = typeof e == "string" ? Es(e) : e;
  s || (console.warn(`Metadata not found for: ${e}`), s = { request: { name: e } });
  let n = (
    /** @class */
    function() {
      return function(r) {
        Object.assign(this, r);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function r(u) {
        Object.assign(this, u);
      }
      return r.prototype.createResponse = function() {
        return s.returnsVoid ? void 0 : new n();
      }, r.prototype.getTypeName = function() {
        return s.request.name;
      }, r.prototype.getMethod = function() {
        return s.method || "POST";
      }, r;
    }()
  );
  return new a(t);
}
function Oa(e, t, s = {}) {
  let n = (
    /** @class */
    function() {
      return function(r) {
        Object.assign(this, r);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function r(u) {
        Object.assign(this, u);
      }
      return r.prototype.createResponse = function() {
        return typeof s.createResponse == "function" ? s.createResponse() : new n();
      }, r.prototype.getTypeName = function() {
        return e;
      }, r.prototype.getMethod = function() {
        return s.method || "POST";
      }, r;
    }()
  );
  return new a(t);
}
function Ls(e, t) {
  return e ? (Object.keys(e).forEach((s) => {
    let n = e[s];
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = Ds(kt(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function Da(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var m;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const r = a.id.toLowerCase(), u = t && t.find((_) => _.name.toLowerCase() == r);
    let d = u == null ? void 0 : u.type, c = (m = u == null ? void 0 : u.genericArgs) == null ? void 0 : m[0], f = a.type === "checkbox" ? a.checked : a.value;
    rl(d) ? f = Number(f) : d === "List`1" && typeof f == "string" && (f = f.split(",").map((_) => rl(c) ? Number(_) : _)), s[a.id] = f;
  }), s;
}
function Cl(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function Ba(e) {
  if (!xl() && (e != null && e.assert) && !J.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return J.metadata.value;
}
function ds(e) {
  return e && Cl(e) ? (e.date = Vo(/* @__PURE__ */ new Date()), J.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(es, JSON.stringify(e)), !0) : !1;
}
function Pa() {
  J.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(es);
}
function xl() {
  if (J.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (Cl(e))
    ds(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(es) : null;
    if (t)
      try {
        ds(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${es} from localStorage`);
      }
  }
  return J.metadata.value != null;
}
async function sn(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    ds(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  Cl(J.metadata.value) || console.warn("AppMetadata is not available");
}
async function Ha(e) {
  var r;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = xl() && t !== 0;
  if (a && t) {
    let u = kt((r = J.metadata.value) == null ? void 0 : r.date);
    (!u || (/* @__PURE__ */ new Date()).getTime() - u.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await sn(s || es, n), J.metadata.value != null))
      return;
    const u = Ze("client");
    if (u != null) {
      const d = await u.api(new Va());
      d.succeeded && ds(d.response);
    }
    if (J.metadata.value != null)
      return;
    await sn(es);
  }
  return J.metadata.value;
}
function pt(e, t) {
  var u;
  if (J.config.typeResolver) {
    let d = J.config.typeResolver(e, t);
    if (d)
      return d;
  }
  let s = (u = J.metadata.value) == null ? void 0 : u.api;
  if (!s || !e)
    return null;
  let n = s.types.find((d) => d.name.toLowerCase() === e.toLowerCase() && (!t || d.namespace == t));
  if (n)
    return n;
  let a = Es(e);
  if (a)
    return a.request;
  let r = s.operations.find((d) => d.response && d.response.name.toLowerCase() === e.toLowerCase() && (!t || d.response.namespace == t));
  return r ? r.response : null;
}
function Es(e) {
  var n;
  if (J.config.apiResolver) {
    const a = J.config.apiResolver(e);
    if (a)
      return a;
  }
  let t = (n = J.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function Ra({ dataModel: e }) {
  var n;
  const t = (n = J.metadata.value) == null ? void 0 : n.api;
  if (!t)
    return [];
  let s = t.operations;
  if (e) {
    const a = typeof e == "string" ? pt(e) : e;
    s = s.filter((r) => jn(r.dataModel, a));
  }
  return s;
}
function Ll(e) {
  return e ? pt(e.name, e.namespace) : null;
}
function jn(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function Ea(e, t) {
  let s = pt(e);
  return s && s.properties && s.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function On(e) {
  return Dn(pt(e));
}
function Dn(e) {
  if (e && e.isEnum && e.enumNames != null) {
    let t = {};
    for (let s = 0; s < e.enumNames.length; s++) {
      const n = (e.enumDescriptions ? e.enumDescriptions[s] : null) || e.enumNames[s], a = (e.enumValues != null ? e.enumValues[s] : null) || e.enumNames[s];
      t[a] = n;
    }
    return t;
  }
  return null;
}
function Bn(e) {
  if (!e)
    return null;
  let t = {}, s = e.input && e.input.allowableEntries;
  if (s) {
    for (let a = 0; a < s.length; a++) {
      let r = s[a];
      t[r.key] = r.value;
    }
    return t;
  }
  let n = e.allowableValues || (e.input ? e.input.allowableValues : null);
  if (n) {
    for (let a = 0; a < n.length; a++) {
      let r = n[a];
      t[r] = r;
    }
    return t;
  }
  if (e.isEnum) {
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, r = pt(a);
    if (r)
      return Dn(r);
  }
  return null;
}
function Vl(e) {
  if (!e)
    return;
  const t = [];
  return Object.keys(e).forEach((s) => t.push({ key: s, value: e[s] })), t;
}
function za(e, t) {
  const n = ((a, r) => Object.assign({
    id: a,
    name: a,
    type: r
  }, t))(e.name, (t == null ? void 0 : t.type) || Ta(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = Vl(Bn(e))), n;
}
function Na(e) {
  let t = [];
  if (e) {
    const s = ut(e), n = Es(e.name), a = Ll(n == null ? void 0 : n.dataModel);
    s.forEach((r) => {
      var d, c, f;
      if (!In(r))
        return;
      const u = za(r, r.input);
      if (u.id = So(u.id), u.type == "file" && r.uploadTo && !u.accept) {
        const m = (c = (d = J.metadata.value) == null ? void 0 : d.plugins.filesUpload) == null ? void 0 : c.locations.find((_) => _.name == r.uploadTo);
        m && !u.accept && m.allowExtensions && (u.accept = m.allowExtensions.map((_) => _.startsWith(".") ? _ : `.${_}`).join(","));
      }
      if (a) {
        const m = (f = a.properties) == null ? void 0 : f.find((_) => _.name == r.name);
        r.ref || (r.ref = m == null ? void 0 : m.ref);
      }
      if (u.options)
        try {
          const m = {
            input: u,
            $typeFields: s.map((w) => w.name),
            $dataModelFields: a ? ut(a).map((w) => w.name) : [],
            ...J.config.scopeWhitelist
          }, _ = ml(u.options, m);
          Object.keys(_).forEach((w) => {
            u[w] = _[w];
          });
        } catch {
          console.error(`failed to evaluate '${u.options}'`);
        }
      t.push(u);
    });
  }
  return t;
}
function Sl(e, t) {
  var a, r;
  if (!t.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const s = pt(t.type);
  if (!(s != null && s.enumValues))
    return console.error(`Could not find metadata for ${t.type}`), [`${e}`];
  const n = [];
  for (let u = 0; u < s.enumValues.length; u++) {
    const d = parseInt(s.enumValues[u]);
    d > 0 && (d & e) === d && n.push(((a = s.enumDescriptions) == null ? void 0 : a[u]) || ((r = s.enumNames) == null ? void 0 : r[u]) || `${e}`);
  }
  return n;
}
function Pn(e) {
  return (t) => typeof t == "number" ? Sl(t, { type: e }) : t;
}
function ut(e) {
  if (!e)
    return [];
  let t = [], s = {};
  function n(a) {
    a.forEach((r) => {
      s[r.name] || (s[r.name] = 1, t.push(r));
    });
  }
  for (; e; )
    e.properties && n(e.properties), e = e.inherits ? Ll(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function ks(e, t) {
  var s;
  return ((s = e.request.implements) == null ? void 0 : s.some((n) => n.name === t)) || !1;
}
function ps(e) {
  return e ? Hn(e, ut(e)) : null;
}
function Hn(e, t) {
  let s = t.find((r) => r.name.toLowerCase() === "id");
  if (s && s.isPrimaryKey)
    return s;
  let a = t.find((r) => r.isPrimaryKey) || s;
  if (!a) {
    let r = Ke.model(e);
    if (r)
      return Xe(pt(r), (u) => ps(u));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function Ua(e, t) {
  return Xe(ps(e), (s) => ke(t, s.name));
}
function Rn(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : qa(t, s.value);
}
function qa(e, t) {
  return e ? (e = An(e), rl(e) || e === "Boolean" ? t : ja(e) ? `[${t}]` : `'${t}'`) : t;
}
function Ct(e, t) {
  return { name: e, value: t };
}
const Qa = [
  Ct("=", "%"),
  Ct("!=", "%!"),
  Ct(">=", ">%"),
  Ct(">", "%>"),
  Ct("<=", "%<"),
  Ct("<", "<%"),
  Ct("In", "%In"),
  Ct("Between", "%Between"),
  { name: "Starts With", value: "%StartsWith", types: "string" },
  { name: "Contains", value: "%Contains", types: "string" },
  { name: "Ends With", value: "%EndsWith", types: "string" },
  { name: "Exists", value: "%IsNotNull", valueType: "none" },
  { name: "Not Exists", value: "%IsNull", valueType: "none" }
];
function dt() {
  const e = v(() => {
    var n;
    return ((n = J.metadata.value) == null ? void 0 : n.app) || null;
  }), t = v(() => {
    var n;
    return ((n = J.metadata.value) == null ? void 0 : n.api) || null;
  }), s = v(() => {
    var n, a, r;
    return ((r = (a = (n = J.metadata.value) == null ? void 0 : n.plugins) == null ? void 0 : a.autoQuery) == null ? void 0 : r.viewerConventions) || Qa;
  });
  return xl(), {
    loadMetadata: Ha,
    getMetadata: Ba,
    setMetadata: ds,
    clearMetadata: Pa,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: pt,
    typeOfRef: Ll,
    typeEquals: jn,
    apiOf: Es,
    findApis: Ra,
    typeName: Fa,
    typeName2: Mn,
    property: Ea,
    enumOptions: On,
    propertyOptions: Bn,
    createFormLayout: Na,
    typeProperties: ut,
    supportsProp: In,
    Crud: Ke,
    Apis: Rt,
    getPrimaryKey: ps,
    getPrimaryKeyByProps: Hn,
    getId: Ua,
    createDto: us,
    makeDto: Oa,
    toFormValues: Ls,
    formValues: Da,
    isComplexProp: Tn,
    asKvps: Vl,
    expandEnumFlags: Sl,
    enumFlagsConverter: Pn
  };
}
const rt = class rt {
  static async getOrFetchValue(t, s, n, a, r, u, d) {
    const c = rt.getValue(n, d, r);
    return c ?? (await rt.fetchLookupIds(t, s, n, a, r, u, [d]), rt.getValue(n, d, r));
  }
  static getValue(t, s, n) {
    const a = rt.Lookup[t];
    if (a) {
      const r = a[s];
      if (r)
        return n = n.toLowerCase(), r[n];
    }
  }
  static setValue(t, s, n, a) {
    const r = rt.Lookup[t] ?? (rt.Lookup[t] = {}), u = r[s] ?? (r[s] = {});
    n = n.toLowerCase(), u[n] = a;
  }
  static setRefValue(t, s) {
    const n = ke(s, t.refId);
    if (n == null || t.refLabel == null)
      return null;
    const a = ke(s, t.refLabel);
    return rt.setValue(t.model, n, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, s, n, a, r, u, d) {
    const c = s.operations.find((f) => {
      var m;
      return Ke.isAnyQuery(f) && ((m = f.dataModel) == null ? void 0 : m.name) == n;
    });
    if (c) {
      const f = rt.Lookup[n] ?? (rt.Lookup[n] = {}), m = [];
      Object.keys(f).forEach((F) => {
        const j = f[F];
        ke(j, r) && m.push(F);
      });
      const _ = d.filter((F) => !m.includes(F));
      if (_.length == 0)
        return;
      const w = u ? null : `${a},${r}`, p = {
        [a + "In"]: _.join(",")
      };
      w && (p.fields = w);
      const y = us(c, p), k = await t.api(y, { jsconfig: "edv,eccn" });
      if (k.succeeded)
        (ke(k.response, "results") || []).forEach((j) => {
          if (!ke(j, a)) {
            console.error(`result[${a}] == null`, j);
            return;
          }
          const se = `${ke(j, a)}`, T = ke(j, r);
          r = r.toLowerCase();
          const I = f[se] ?? (f[se] = {});
          I[r] = `${T}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(rt, "Lookup", {});
let Zt = rt, il = () => (/* @__PURE__ */ new Date()).getTime(), Ka = ["/", "T", ":", "-"], gt = {
  //locale: null,
  assumeUtc: !0,
  //number: null,
  date: {
    method: "Intl.DateTimeFormat",
    options: "{dateStyle:'medium'}"
  },
  maxFieldLength: 150,
  maxNestedFields: 2,
  maxNestedFieldLength: 30
}, Za = new Intl.RelativeTimeFormat(gt.locale, {}), ln = 24 * 60 * 60 * 1e3 * 365, Js = {
  year: ln,
  month: ln / 12,
  day: 24 * 60 * 60 * 1e3,
  hour: 60 * 60 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, jt = {
  currency: zn,
  bytes: Nn,
  link: Un,
  linkTel: qn,
  linkMailTo: Qn,
  icon: Kn,
  iconRounded: Zn,
  attachment: Wn,
  hidden: Gn,
  time: Jn,
  relativeTime: Al,
  relativeTimeFromMs: zs,
  enumFlags: Yn,
  formatDate: ss,
  formatNumber: Ml
};
"iconOnError" in globalThis || (globalThis.iconOnError = Hs);
class Je {
}
Le(Je, "currency", { method: "currency" }), Le(Je, "bytes", { method: "bytes" }), Le(Je, "link", { method: "link" }), Le(Je, "linkTel", { method: "linkTel" }), Le(Je, "linkMailTo", { method: "linkMailTo" }), Le(Je, "icon", { method: "icon" }), Le(Je, "iconRounded", { method: "iconRounded" }), Le(Je, "attachment", { method: "attachment" }), Le(Je, "time", { method: "time" }), Le(Je, "relativeTime", { method: "relativeTime" }), Le(Je, "relativeTimeFromMs", { method: "relativeTimeFromMs" }), Le(Je, "date", { method: "formatDate" }), Le(Je, "number", { method: "formatNumber" }), Le(Je, "hidden", { method: "hidden" }), Le(Je, "enumFlags", { method: "enumFlags" });
function Wa(e) {
  gt = Object.assign({}, gt, e);
}
function Ga(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (jt[t] = e[t]);
  });
}
function En() {
  return jt;
}
function ms(e, t) {
  return t ? ht("span", e, t) : e;
}
function zn(e, t) {
  const s = yt(t, ["currency"]);
  return ms(new Intl.NumberFormat(void 0, { style: "currency", currency: (t == null ? void 0 : t.currency) || "USD" }).format(e), s);
}
function Nn(e, t) {
  return ms(kl(e), t);
}
function Un(e, t) {
  return ht("a", e, Bs({ ...t, href: e }));
}
function qn(e, t) {
  return ht("a", e, Bs({ ...t, href: `tel:${e}` }));
}
function Qn(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = yt(t, ["subject", "body"]), r = {};
  return s && (r.subject = s), n && (r.body = n), ht("a", e, Bs({ ...a, href: `mailto:${Yt(e, r)}` }));
}
function Kn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Gt(e), onerror: "iconOnError(this)" }, t));
}
function Zn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Gt(e), onerror: "iconOnError(this)" }, t));
}
function Wn(e, t) {
  let s = yl(e), a = vs(s) == null || wl(e) ? Gt(e) : _l(e);
  const r = Gt(a);
  let u = t && (t["icon-class"] || t.iconClass), d = ht("img", void 0, Object.assign({ class: "w-6 h-6", src: r, onerror: "iconOnError(this,'att')" }, u ? { class: u } : null)), c = `<span class="pl-1">${s}</span>`;
  return ht("a", d + c, Object.assign({ class: "flex", href: Gt(e), title: e }, t ? yt(t, ["icon-class", "iconClass"]) : null));
}
function Gn(e) {
  return "";
}
function Jn(e, t) {
  let s = typeof e == "string" ? new Date(fn(e) * 1e3) : Os(e) ? kt(e) : null;
  return ms(s ? Ao(s) : e, t);
}
function ss(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? kt(e) : e;
  if (!Os(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = gt.date ? Ns(gt.date) : null;
  return ms(typeof n == "function" ? n(s) : Fo(s), t);
}
function Ml(e, t) {
  if (typeof e != "number")
    return e;
  let s = gt.number ? Ns(gt.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), ms(n, t);
}
function Xn(e, t, s) {
  let n = To(e), a = t ? Ns(t) : null;
  if (typeof a == "function") {
    let u = s;
    if (t != null && t.options)
      try {
        u = ml(t.options, s);
      } catch (d) {
        console.error(`Could not evaluate '${t.options}'`, d, ", with scope:", s);
      }
    return a(e, u);
  }
  let r = n != null ? Os(n) ? ss(n, s) : typeof n == "number" ? Ml(n, s) : n : null;
  return r ?? "";
}
function cs(e, t, s) {
  return Ht(e) ? Xn(e, t, s) : tr(e, t, s);
}
function Ja(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (Os(e))
    return e.getTime() - il();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return fn(e) * 1e3 * -1;
    if (Io(e, Ka) >= 0)
      return kt(e).getTime() - il();
  }
  return NaN;
}
function zs(e, t) {
  for (let s in Js)
    if (Math.abs(e) > Js[s] || s === "second")
      return (t || Za).format(Math.round(e / Js[s]), s);
}
function Al(e, t) {
  let s = Ja(e);
  return isNaN(s) ? "" : zs(s, t);
}
function Xa(e, t) {
  return zs(e.getTime() - (t ? t.getTime() : il()));
}
function Yn(e, t) {
  return Sl(e, t).join(", ");
}
function Ns(e) {
  if (!e)
    return null;
  let { method: t, options: s } = e, n = `${t}(${s})`, a = jt[n] || jt[t];
  if (typeof a == "function")
    return a;
  let r = e.locale || gt.locale;
  if (t.startsWith("Intl.")) {
    let u = r ? `'${r}'` : "undefined", d = `return new ${t}(${u},${s || "undefined"})`;
    try {
      let c = Function(d)();
      return a = t === "Intl.DateTimeFormat" ? (f) => c.format(kt(f)) : t === "Intl.NumberFormat" ? (f) => c.format(Number(f)) : t === "Intl.RelativeTimeFormat" ? (f) => Al(f, c) : (f) => c.format(f), jt[n] = a;
    } catch (c) {
      console.error(`Invalid format: ${d}`, c);
    }
  } else {
    let u = globalThis[t];
    if (typeof u == "function") {
      let d = s != null ? Function("return " + s)() : void 0;
      return a = (c) => u(c, d, r), jt[n] = a;
    }
    console.error(`No '${t}' function exists`, Object.keys(jt));
  }
  return null;
}
function eo(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function to(e) {
  return e.substring(0, 6) === "/Date(" ? ss(kt(e)) : e;
}
function Ya(e) {
  return Fl(ts(e)).replace(/"/g, "");
}
function so(e) {
  if (e == null || e === "")
    return "";
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      console.warn("couldn't parse as JSON", e);
    }
  return e;
}
function Fl(e, t = 4) {
  return e = so(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function er(e) {
  return e = so(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = ts(e), Fl(e));
}
function ts(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return to(e);
  if (Ht(e))
    return e;
  if (e instanceof Date)
    return ss(e);
  if (Array.isArray(e))
    return e.map(ts);
  if (typeof e == "object") {
    let t = {};
    return Object.keys(e).forEach((s) => {
      s != "__type" && (t[s] = ts(e[s]));
    }), t;
  }
  return e;
}
function tr(e, t, s) {
  let n = e;
  if (Array.isArray(e)) {
    if (Ht(e[0]))
      return n.join(",");
    e[0] != null && (n = e[0]);
  }
  if (n == null)
    return "";
  if (n instanceof Date)
    return ss(n, s);
  let a = Object.keys(n), r = [];
  for (let u = 0; u < Math.min(gt.maxNestedFields, a.length); u++) {
    let d = a[u], c = `${ts(n[d])}`;
    r.push(`<b class="font-medium">${d}</b>: ${Ys(eo(to(c), gt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && r.push("..."), ht("span", "{ " + r.join(", ") + " }", Object.assign({ title: Ys(Ya(e)) }, s));
}
function ph() {
  return {
    Formats: Je,
    setDefaultFormats: Wa,
    getFormatters: En,
    setFormatters: Ga,
    formatValue: cs,
    formatter: Ns,
    dateInputFormat: Ds,
    currency: zn,
    bytes: Nn,
    link: Un,
    linkTel: qn,
    linkMailTo: Qn,
    icon: Kn,
    iconRounded: Zn,
    attachment: Wn,
    hidden: Gn,
    time: Jn,
    relativeTime: Al,
    relativeTimeFromDate: Xa,
    relativeTimeFromMs: zs,
    enumFlags: Yn,
    formatDate: ss,
    formatNumber: Ml,
    indentJson: Fl,
    prettyJson: er,
    scrub: ts,
    truncate: eo,
    apiValueFmt: Xn,
    iconOnError: Hs
  };
}
const sr = ["title"], lr = /* @__PURE__ */ ue({
  __name: "RouterLink",
  props: {
    to: {}
  },
  setup(e) {
    const t = e, { config: s } = Nt(), n = () => s.value.navigate(t.to ?? "/");
    return (a, r) => (o(), i("a", Ae({
      onClick: qe(n, ["prevent"]),
      title: a.to,
      href: "javascript:void(0)"
    }, a.$attrs), [
      U(a.$slots, "default")
    ], 16, sr));
  }
});
class nr {
  constructor() {
    Le(this, "callbacks", {});
  }
  register(t, s) {
    this.callbacks[t] = s;
  }
  has(t) {
    return !!this.callbacks[t];
  }
  invoke(t, s) {
    const n = this.callbacks[t];
    typeof n == "function" && n(t, s);
  }
}
const it = class it {
  static component(t) {
    const s = it.components[t];
    if (s)
      return s;
    const n = Xl(t), a = Object.keys(it.components).find((r) => Xl(r) === n);
    return a && it.components[a] || null;
  }
};
Le(it, "config", {
  redirectSignIn: "/signin",
  redirectSignOut: "/auth/logout",
  navigate: (t) => location.href = t,
  assetsPathResolver: (t) => t,
  fallbackPathResolver: (t) => t,
  storage: new bn(),
  tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
  scopeWhitelist: {
    enumFlagsConverter: Pn,
    ...En()
  }
}), Le(it, "autoQueryGridDefaults", {
  deny: [],
  hide: [],
  toolbarButtonClass: void 0,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150
}), Le(it, "events", jo()), Le(it, "user", D(null)), Le(it, "metadata", D(null)), Le(it, "components", {
  RouterLink: lr
}), Le(it, "interceptors", new nr());
let J = it;
function or(e) {
  J.config = Object.assign(J.config, e);
}
function ar(e) {
  J.autoQueryGridDefaults = Object.assign(J.autoQueryGridDefaults, e);
}
function Tl(e) {
  return e && J.config.assetsPathResolver ? J.config.assetsPathResolver(e) : e;
}
function rr(e) {
  return e && J.config.fallbackPathResolver ? J.config.fallbackPathResolver(e) : e;
}
function ir(e, t) {
  J.interceptors.register(e, t);
}
function Nt() {
  const e = v(() => J.config), t = v(() => J.autoQueryGridDefaults), s = J.events;
  return {
    config: e,
    setConfig: or,
    events: s,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: ar,
    assetsPathResolver: Tl,
    fallbackPathResolver: rr,
    registerInterceptor: ir
  };
}
const lo = ue({
  inheritAttrs: !1,
  props: {
    image: Object,
    svg: String,
    src: String,
    alt: String,
    type: String
  },
  setup(e, { attrs: t }) {
    return () => {
      let s = e.image;
      if (e.type) {
        const { typeOf: r } = dt(), u = r(e.type);
        u || console.warn(`Type ${e.type} does not exist`), u != null && u.icon ? s = u == null ? void 0 : u.icon : console.warn(`Type ${e.type} does not have a [Svg] icon`);
      }
      let n = e.svg || (s == null ? void 0 : s.svg) || "";
      if (n.startsWith("<svg ")) {
        let u = js(n, ">").indexOf("class="), d = `${(s == null ? void 0 : s.cls) || ""} ${t.class || ""}`;
        if (u == -1)
          n = `<svg class="${d}" ${n.substring(4)}`;
        else {
          const c = u + 6 + 1;
          n = `${n.substring(0, c) + d} ${n.substring(c)}`;
        }
        return Ft("span", { innerHTML: n });
      } else
        return Ft("img", {
          class: [s == null ? void 0 : s.cls, t.class],
          src: Tl(e.src || (s == null ? void 0 : s.uri)),
          onError: (r) => Hs(r.target)
        });
    };
  }
}), ur = { class: "text-2xl font-semibold text-gray-900 dark:text-gray-300" }, dr = { class: "flex" }, cr = /* @__PURE__ */ l("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), fr = /* @__PURE__ */ l("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), vr = [
  cr,
  fr
], pr = /* @__PURE__ */ ue({
  __name: "Loading",
  props: {
    imageClass: { default: "w-6 h-6" }
  },
  setup(e) {
    return (t, s) => (o(), i("div", ur, [
      l("div", dr, [
        (o(), i("svg", {
          class: h(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
          role: "status",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, vr, 2)),
        l("span", null, [
          U(t.$slots, "default")
        ])
      ])
    ]));
  }
}), mr = ["href", "onClick"], hr = ["type"], nn = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black", gr = /* @__PURE__ */ ue({
  __name: "OutlineButton",
  props: {
    type: { default: "submit" },
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = Q("router-link");
      return t.href ? (o(), le(n, {
        key: 0,
        to: t.href
      }, {
        default: _e(({ navigate: a }) => [
          l("button", {
            class: h(nn),
            href: t.href,
            onClick: a
          }, [
            U(t.$slots, "default")
          ], 8, mr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), i("button", Ae({
        key: 1,
        type: t.type,
        class: nn
      }, t.$attrs), [
        U(t.$slots, "default")
      ], 16, hr));
    };
  }
}), yr = ["href", "onClick"], br = ["type"], wr = /* @__PURE__ */ ue({
  __name: "PrimaryButton",
  props: {
    type: { default: "submit" },
    href: {},
    color: { default: "indigo" }
  },
  setup(e) {
    const t = e, s = {
      blue: "focus:ring-indigo-500 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      purple: "focus:ring-indigo-500 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      red: "focus:ring-red-500 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500",
      green: "focus:ring-green-500 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:hover:bg-green-400 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500",
      sky: "focus:ring-sky-500 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-500",
      cyan: "focus:ring-cyan-500 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500",
      indigo: "focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    }, n = v(() => "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black text-white " + (s[t.color] || s.indigo));
    return (a, r) => {
      const u = Q("router-link");
      return a.href ? (o(), le(u, {
        key: 0,
        to: a.href
      }, {
        default: _e(({ navigate: d }) => [
          l("button", {
            class: h(n.value),
            href: a.href,
            onClick: d
          }, [
            U(a.$slots, "default")
          ], 10, yr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), i("button", Ae({
        key: 1,
        type: a.type,
        class: n.value
      }, a.$attrs), [
        U(a.$slots, "default")
      ], 16, br));
    };
  }
}), kr = ["type", "href", "onClick"], _r = ["type"], on = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black", $r = /* @__PURE__ */ ue({
  __name: "SecondaryButton",
  props: {
    type: {},
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = Q("router-link");
      return t.href ? (o(), le(n, {
        key: 0,
        to: t.href
      }, {
        default: _e(({ navigate: a }) => [
          l("button", {
            type: t.type ?? "button",
            class: h(on),
            href: t.href,
            onClick: a
          }, [
            U(t.$slots, "default")
          ], 8, kr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), i("button", Ae({
        key: 1,
        type: t.type ?? "button",
        class: on
      }, t.$attrs), [
        U(t.$slots, "default")
      ], 16, _r));
    };
  }
});
function et(e, t) {
  return Array.isArray(e) ? e.indexOf(t) >= 0 : e == t || e.includes(t);
}
const Fs = {
  blue: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
  purple: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
  red: "text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200",
  green: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
  sky: "text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200",
  cyan: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200",
  indigo: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
}, ft = {
  base: "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
  invalid: "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
  valid: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600"
}, as = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, Wt = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, ul = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, ze = {
  panelClass(e = "slideOver") {
    return e == "card" ? as.panelClass : Wt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? as.formClass : Wt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? as.headingClass : Wt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? as.subHeadingClass : Wt.subHeadingClass;
  },
  buttonsClass: "mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, me = {
  getGridClass(e = "stripedRows") {
    return me.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return et(e, "fullWidth") ? "overflow-x-auto" : me.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return et(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : me.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return et(e, "whiteBackground") ? "" : et(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5" : me.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return et(e, "fullWidth") || et(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : me.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return et(e, "whiteBackground") ? "" : me.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return me.theadRowClass + (et(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return me.theadCellClass + (et(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (et(e, "whiteBackground") || et(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : me.tableClass) + (et(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", t, s, n) {
    return (n ? "cursor-pointer " : "") + (s ? "bg-indigo-100 dark:bg-blue-800" : (n ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (et(e, "stripedRows") ? t % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (et(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  gridClass: "flex flex-col",
  //original -margins + padding forces scroll bars when parent is w-full for no clear benefits?
  //original: -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8
  grid2Class: "",
  //original: inline-block min-w-full py-2 align-middle md:px-6 lg:px-8
  grid3Class: "inline-block min-w-full py-2 align-middle",
  grid4Class: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
  tableClass: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
  theadClass: "bg-gray-50 dark:bg-gray-900",
  tableCellClass: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
  theadRowClass: "select-none",
  theadCellClass: "px-6 py-4 text-left text-sm font-medium tracking-wider whitespace-nowrap",
  toolbarButtonClass: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
}, Cr = {
  colspans: "col-span-3 sm:col-span-3"
}, mh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: Fs,
  card: as,
  dummy: Cr,
  form: ze,
  grid: me,
  input: ft,
  modal: ul,
  slideOver: Wt
}, Symbol.toStringTag, { value: "Module" })), xr = /* @__PURE__ */ ue({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = yo(), s = e, n = v(() => (Fs[s.color] || Fs.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, r) => (o(), i("a", {
      class: h(n.value)
    }, [
      U(a.$slots, "default")
    ], 2));
  }
}), Lr = {
  class: "flex",
  "aria-label": "Breadcrumb"
}, Vr = {
  role: "list",
  class: "flex items-center space-x-4"
}, Sr = ["href", "title"], Mr = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 flex-shrink-0",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z",
    "clip-rule": "evenodd"
  })
], -1), Ar = { class: "sr-only" }, Fr = /* @__PURE__ */ ue({
  __name: "Breadcrumbs",
  props: {
    homeHref: { default: "/" },
    homeLabel: { default: "Home" }
  },
  setup(e) {
    return (t, s) => (o(), i("nav", Lr, [
      l("ol", Vr, [
        l("li", null, [
          l("div", null, [
            l("a", {
              href: t.homeHref,
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
              title: t.homeLabel
            }, [
              Mr,
              l("span", Ar, O(t.homeLabel), 1)
            ], 8, Sr)
          ])
        ]),
        U(t.$slots, "default")
      ])
    ]));
  }
}), Tr = { class: "flex items-center" }, Ir = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
    "clip-rule": "evenodd"
  })
], -1), jr = ["href", "title"], Or = ["title"], Dr = /* @__PURE__ */ ue({
  __name: "Breadcrumb",
  props: {
    href: {},
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), i("li", null, [
      l("div", Tr, [
        Ir,
        t.href ? (o(), i("a", {
          key: 0,
          href: t.href,
          class: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          title: t.title
        }, [
          U(t.$slots, "default")
        ], 8, jr)) : (o(), i("span", {
          key: 1,
          class: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300",
          title: t.title
        }, [
          U(t.$slots, "default")
        ], 8, Or))
      ])
    ]));
  }
}), Br = {
  key: 0,
  class: "text-base font-semibold text-gray-500 dark:text-gray-400"
}, Pr = {
  role: "list",
  class: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800"
}, Hr = /* @__PURE__ */ ue({
  __name: "NavList",
  props: {
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), i("div", null, [
      t.title ? (o(), i("h2", Br, O(t.title), 1)) : x("", !0),
      l("ul", Pr, [
        U(t.$slots, "default")
      ])
    ]));
  }
}), Rr = { class: "relative flex items-start space-x-4 py-6" }, Er = { class: "flex-shrink-0" }, zr = { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900" }, Nr = { class: "min-w-0 flex-1" }, Ur = { class: "text-base font-medium text-gray-900 dark:text-gray-100" }, qr = { class: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2" }, Qr = ["href"], Kr = /* @__PURE__ */ l("span", {
  class: "absolute inset-0",
  "aria-hidden": "true"
}, null, -1), Zr = { class: "text-base text-gray-500" }, Wr = /* @__PURE__ */ l("div", { class: "flex-shrink-0 self-center" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
      "clip-rule": "evenodd"
    })
  ])
], -1), Gr = /* @__PURE__ */ ue({
  __name: "NavListItem",
  props: {
    title: {},
    href: {},
    icon: {},
    iconSvg: {},
    iconSrc: {},
    iconAlt: {}
  },
  setup(e) {
    return (t, s) => {
      const n = Q("Icon");
      return o(), i("li", Rr, [
        l("div", Er, [
          l("span", zr, [
            ge(n, {
              class: "w-6 h-6 text-indigo-700 dark:text-indigo-300",
              image: t.icon,
              src: t.iconSrc,
              svg: t.iconSvg,
              alt: t.iconAlt
            }, null, 8, ["image", "src", "svg", "alt"])
          ])
        ]),
        l("div", Nr, [
          l("h3", Ur, [
            l("span", qr, [
              l("a", {
                href: t.href,
                class: "focus:outline-none"
              }, [
                Kr,
                we(" " + O(t.title), 1)
              ], 8, Qr)
            ])
          ]),
          l("p", Zr, [
            U(t.$slots, "default")
          ])
        ]),
        Wr
      ]);
    };
  }
});
function no(e) {
  return e && e.SessionId ? Oo(e) : e;
}
function Jr(e) {
  J.user.value = no(e), J.events.publish("signIn", e);
}
function Xr() {
  J.user.value = null, J.events.publish("signOut", null);
}
const Il = (e) => (e == null ? void 0 : e.roles) || [], jl = (e) => (e == null ? void 0 : e.permissions) || [];
function oo(e) {
  return Il(J.user.value).indexOf(e) >= 0;
}
function Yr(e) {
  return jl(J.user.value).indexOf(e) >= 0;
}
function Ol() {
  return oo("Admin");
}
function is(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = J.user.value;
  if (!t)
    return !1;
  if (Ol())
    return !0;
  let [s, n] = [Il(t), jl(t)], [a, r, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => s.indexOf(c) >= 0) || u.length > 0 && !u.some((c) => s.indexOf(c) >= 0) || !r.every((c) => n.indexOf(c) >= 0) || d.length > 0 && !d.every((c) => n.indexOf(c) >= 0));
}
function ei(e) {
  if (!e || !e.requiresAuth)
    return null;
  const t = J.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Ol())
    return null;
  let [s, n] = [Il(t), jl(t)], [a, r, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((m) => s.indexOf(m) < 0);
  if (c.length > 0)
    return `Requires ${c.map((m) => "<b>" + m + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let f = r.filter((m) => n.indexOf(m) < 0);
  return f.length > 0 ? `Requires ${f.map((m) => "<b>" + m + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : u.length > 0 && !u.some((m) => s.indexOf(m) >= 0) ? `Requires any ${u.filter((m) => s.indexOf(m) < 0).map((m) => "<b>" + m + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : d.length > 0 && !d.every((m) => n.indexOf(m) >= 0) ? `Requires any ${d.filter((m) => n.indexOf(m) < 0).map((m) => "<b>" + m + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : null;
}
function Dl() {
  const e = v(() => J.user.value || null), t = v(() => J.user.value != null);
  return { signIn: Jr, signOut: Xr, user: e, toAuth: no, isAuthenticated: t, hasRole: oo, hasPermission: Yr, isAdmin: Ol, canAccess: is, invalidAccessMessage: ei };
}
const ti = { key: 0 }, si = { class: "md:p-4" }, ao = /* @__PURE__ */ ue({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Dl(), { config: s } = Nt(), n = () => {
      let r = location.href.substring(location.origin.length) || "/";
      const u = Yt(s.value.redirectSignIn, { redirect: r });
      s.value.navigate(u);
    }, a = () => {
      let r = location.href.substring(location.origin.length) || "/";
      const u = Yt(s.value.redirectSignOut, { ReturnUrl: r });
      s.value.navigate(u);
    };
    return (r, u) => {
      const d = Q("Alert"), c = Q("SecondaryButton");
      return r.invalidAccess ? (o(), i("div", ti, [
        ge(d, {
          class: h(r.alertClass),
          innerHTML: r.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", si, [
          W(t) ? (o(), le(c, {
            key: 1,
            onClick: a
          }, {
            default: _e(() => [
              we("Sign Out")
            ]),
            _: 1
          })) : (o(), le(c, {
            key: 0,
            onClick: n
          }, {
            default: _e(() => [
              we("Sign In")
            ]),
            _: 1
          }))
        ])
      ])) : x("", !0);
    };
  }
}), li = { class: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80" }, ni = { class: "p-4" }, oi = /* @__PURE__ */ l("h3", { class: "text-base font-medium mb-3 dark:text-gray-100" }, "Sort", -1), ai = { class: "flex w-full justify-center" }, ri = /* @__PURE__ */ l("svg", {
  class: "w-6 h-6",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
}, [
  /* @__PURE__ */ l("g", { fill: "currentColor" }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
    }),
    /* @__PURE__ */ l("path", { d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" })
  ])
], -1), ii = /* @__PURE__ */ l("span", null, "ASC", -1), ui = [
  ri,
  ii
], di = /* @__PURE__ */ Ts('<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"></path><path fill-rule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"></path><path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"></path></g></svg><span>DESC</span>', 2), ci = [
  di
], fi = /* @__PURE__ */ l("h3", { class: "text-base font-medium mt-4 mb-2" }, " Filter ", -1), vi = { key: 0 }, pi = ["id", "value"], mi = ["for"], hi = { key: 1 }, gi = { class: "mb-2" }, yi = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, bi = ["onClick"], wi = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), ki = [
  wi
], _i = { class: "flex" }, $i = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
    "clip-rule": "evenodd"
  })
], -1), Ci = [
  $i
], xi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Bl = /* @__PURE__ */ ue({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = D(), r = D(""), u = D(""), d = D([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => pt(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), m = v(() => s.column.meta.isEnum == !0 ? Vl(On(f.value.name)) : []), _ = v(() => {
      var L;
      return ((L = y(s.column.type)) == null ? void 0 : L.map((E) => ({ key: E.value, value: E.name }))) || [];
    }), w = D({ filters: [] }), p = v(() => w.value.filters);
    Vs(() => w.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), Vs(() => {
      var E, q, ne, R, X;
      let L = ((ne = (q = (E = s.column.settings.filters) == null ? void 0 : E[0]) == null ? void 0 : q.value) == null ? void 0 : ne.split(",")) || [];
      if (L.length > 0 && ((R = f.value) != null && R.isEnumInt)) {
        const Y = parseInt(L[0]);
        L = ((X = f.value.enumValues) == null ? void 0 : X.filter((Z) => (Y & parseInt(Z)) > 0)) || [];
      }
      d.value = L;
    });
    function y(L) {
      let E = s.definitions;
      return Fn(L) || (E = E.filter((q) => q.types !== "string")), E;
    }
    function k(L, E) {
      return y(L).find((q) => q.value === E);
    }
    function F() {
      var E;
      if (!r.value)
        return;
      let L = (E = k(s.column.type, r.value)) == null ? void 0 : E.name;
      L && (w.value.filters.push({ key: r.value, name: L, value: u.value }), r.value = u.value = "");
    }
    function j(L) {
      w.value.filters.splice(L, 1);
    }
    function se(L) {
      return Rn(k(s.column.type, L.key), s.column.type, L);
    }
    function T() {
      n("done");
    }
    function I() {
      var L;
      r.value = "%", (L = a.value) == null || L.focus();
    }
    function A() {
      var L;
      if (u.value && F(), c.value) {
        let E = Object.values(d.value).filter((q) => q);
        w.value.filters = E.length > 0 ? (L = f.value) != null && L.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: E.map((q) => parseInt(q)).reduce((q, ne) => q + ne, 0).toString() }] : [{ key: "%In", name: "In", value: E.join(",") }] : [];
      }
      n("save", w.value), n("done");
    }
    function re(L) {
      w.value.sort = L === w.value.sort ? void 0 : L, Dt(A);
    }
    return (L, E) => {
      var Y;
      const q = Q("SelectInput"), ne = Q("TextInput"), R = Q("PrimaryButton"), X = Q("SecondaryButton");
      return o(), i("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: T,
        onVnodeMounted: I
      }, [
        l("div", {
          class: "absolute",
          style: dl(`top:${L.topLeft.y}px;left:${L.topLeft.x}px`),
          onClick: E[5] || (E[5] = qe(() => {
          }, ["stop"]))
        }, [
          l("div", li, [
            l("div", ni, [
              oi,
              l("div", ai, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: E[0] || (E[0] = (Z) => re("ASC")),
                  class: h(`${w.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ui, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: E[1] || (E[1] = (Z) => re("DESC")),
                  class: h(`${w.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ci, 2)
              ]),
              fi,
              c.value ? (o(), i("div", vi, [
                (o(!0), i(Me, null, Ie(m.value, (Z) => (o(), i("div", {
                  key: Z.key,
                  class: "flex items-center"
                }, [
                  Bt(l("input", {
                    type: "checkbox",
                    id: Z.key,
                    value: Z.key,
                    "onUpdate:modelValue": E[2] || (E[2] = (V) => d.value = V),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, pi), [
                    [cl, d.value]
                  ]),
                  l("label", {
                    for: Z.key,
                    class: "ml-3"
                  }, O(Z.value), 9, mi)
                ]))), 128))
              ])) : (o(), i("div", hi, [
                (o(!0), i(Me, null, Ie(p.value, (Z, V) => (o(), i("div", gi, [
                  l("span", yi, [
                    we(O(L.column.name) + " " + O(Z.name) + " " + O(se(Z)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (te) => j(V),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, ki, 8, bi)
                  ])
                ]))), 256)),
                l("div", _i, [
                  ge(q, {
                    id: "filterRule",
                    class: "w-32 mr-1",
                    modelValue: r.value,
                    "onUpdate:modelValue": E[3] || (E[3] = (Z) => r.value = Z),
                    entries: _.value,
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue", "entries"]),
                  ((Y = k(L.column.type, r.value)) == null ? void 0 : Y.valueType) !== "none" ? (o(), le(ne, {
                    key: 0,
                    ref_key: "txtFilter",
                    ref: a,
                    id: "filterValue",
                    class: "w-32 mr-1",
                    type: "text",
                    modelValue: u.value,
                    "onUpdate:modelValue": E[4] || (E[4] = (Z) => u.value = Z),
                    onKeyup: un(F, ["enter"]),
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue"])) : x("", !0),
                  l("div", { class: "pt-1" }, [
                    l("button", {
                      type: "button",
                      onClick: F,
                      class: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, Ci)
                  ])
                ])
              ]))
            ]),
            l("div", xi, [
              ge(R, {
                onClick: A,
                color: "red",
                class: "ml-2"
              }, {
                default: _e(() => [
                  we(" Save ")
                ]),
                _: 1
              }),
              ge(X, { onClick: T }, {
                default: _e(() => [
                  we(" Cancel ")
                ]),
                _: 1
              })
            ])
          ])
        ], 4)
      ], 512);
    };
  }
}), Li = { class: "px-4 sm:px-6 lg:px-8 text-sm" }, Vi = { class: "flex flex-wrap" }, Si = { class: "group pr-4 sm:pr-6 lg:pr-8" }, Mi = { class: "flex justify-between w-full font-medium" }, Ai = { class: "w-6 flex justify-end" }, Fi = { class: "hidden group-hover:inline" }, Ti = ["onClick", "title"], Ii = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), ji = [
  Ii
], Oi = {
  key: 0,
  class: "pt-2"
}, Di = { class: "ml-2" }, Bi = { key: 1 }, Pi = { class: "pt-2" }, Hi = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, Ri = ["onClick"], Ei = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), zi = [
  Ei
], Ni = /* @__PURE__ */ l("span", null, "Clear All", -1), Ui = [
  Ni
], Pl = /* @__PURE__ */ ue({
  __name: "FilterViews",
  props: {
    definitions: {},
    columns: {}
  },
  emits: ["done", "change"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.columns.filter((w) => w.settings.filters.length > 0));
    function r(w) {
      var p, y;
      return (y = (p = w == null ? void 0 : w[0]) == null ? void 0 : p.value) == null ? void 0 : y.split(",");
    }
    function u(w) {
      let p = s.definitions;
      return Fn(w) || (p = p.filter((y) => y.types !== "string")), p;
    }
    function d(w, p) {
      return u(w).find((y) => y.value === p);
    }
    function c(w, p) {
      return Rn(d(w.type, p.value), w.type, p);
    }
    function f(w) {
      w.settings.filters = [], n("change", w);
    }
    function m(w, p) {
      w.settings.filters.splice(p, 1), n("change", w);
    }
    function _() {
      s.columns.forEach((w) => {
        w.settings.filters = [], n("change", w);
      }), n("done");
    }
    return (w, p) => (o(), i("div", Li, [
      l("div", Vi, [
        (o(!0), i(Me, null, Ie(a.value, (y) => (o(), i("fieldset", Si, [
          l("legend", Mi, [
            l("span", null, O(W(He)(y.name)), 1),
            l("span", Ai, [
              l("span", Fi, [
                l("button", {
                  onClick: (k) => f(y),
                  title: `Clear all ${W(He)(y.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, ji, 8, Ti)
              ])
            ])
          ]),
          y.meta.isEnum ? (o(), i("div", Oi, [
            (o(!0), i(Me, null, Ie(r(y.settings.filters), (k) => (o(), i("div", {
              key: k,
              class: "flex items-center"
            }, [
              l("label", Di, O(k), 1)
            ]))), 128))
          ])) : (o(), i("div", Bi, [
            (o(!0), i(Me, null, Ie(y.settings.filters, (k, F) => (o(), i("div", Pi, [
              l("span", Hi, [
                we(O(y.name) + " " + O(k.name) + " " + O(c(y, k)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (j) => m(y, F),
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                }, zi, 8, Ri)
              ])
            ]))), 256))
          ]))
        ]))), 256))
      ]),
      l("div", { class: "flex justify-center pt-4" }, [
        l("button", {
          type: "button",
          onClick: _,
          class: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }, Ui)
      ])
    ]));
  }
}), qi = { class: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Qi = { class: "" }, Ki = { class: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left" }, Zi = /* @__PURE__ */ l("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" }, "Query Preferences", -1), Wi = { class: "mt-4" }, Gi = ["for"], Ji = ["id"], Xi = ["value", "selected"], Yi = { class: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800" }, eu = ["id", "checked"], tu = ["for"], su = { class: "mt-4" }, lu = { class: "pb-2 px-4" }, nu = { class: "" }, ou = ["id", "value"], au = ["for"], ru = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Hl = /* @__PURE__ */ ue({
  __name: "QueryPrefs",
  props: {
    id: { default: "QueryPrefs" },
    columns: {},
    prefs: {},
    maxLimit: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const { autoQueryGridDefaults: s } = Nt(), n = e, a = t, r = D({});
    Vs(() => r.value = Object.assign({
      take: s.value.take,
      selectedColumns: []
    }, n.prefs));
    const u = [10, 25, 50, 100, 250, 500, 1e3];
    function d() {
      a("done");
    }
    function c() {
      a("save", r.value);
    }
    return (f, m) => {
      const _ = Q("PrimaryButton"), w = Q("SecondaryButton"), p = Q("ModalDialog");
      return o(), le(p, {
        id: f.id,
        onDone: d,
        "size-class": "w-full sm:max-w-prose"
      }, {
        default: _e(() => [
          l("div", qi, [
            l("div", Qi, [
              l("div", Ki, [
                Zi,
                l("div", Wi, [
                  l("label", {
                    for: `${f.id}-take`,
                    class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                  }, "Results per page", 8, Gi),
                  Bt(l("select", {
                    id: `${f.id}-take`,
                    "onUpdate:modelValue": m[0] || (m[0] = (y) => r.value.take = y),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), i(Me, null, Ie(u.filter((y) => n.maxLimit == null || y <= n.maxLimit), (y) => (o(), i("option", {
                      value: y,
                      selected: y === r.value.take
                    }, O(y), 9, Xi))), 256))
                  ], 8, Ji), [
                    [bo, r.value.take]
                  ])
                ]),
                l("div", Yi, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: m[1] || (m[1] = (y) => r.value.selectedColumns = []),
                    checked: r.value.selectedColumns.length === 0,
                    class: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
                  }, null, 8, eu),
                  l("label", {
                    class: "ml-3 block text-gray-700 dark:text-gray-300",
                    for: `${f.id}-allColumns`
                  }, "View all columns", 8, tu)
                ]),
                l("div", su, [
                  l("div", lu, [
                    l("div", nu, [
                      (o(!0), i(Me, null, Ie(f.columns, (y) => (o(), i("div", {
                        key: y.name,
                        class: "flex items-center"
                      }, [
                        Bt(l("input", {
                          type: "checkbox",
                          id: y.name,
                          value: y.name,
                          "onUpdate:modelValue": m[2] || (m[2] = (k) => r.value.selectedColumns = k),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, ou), [
                          [cl, r.value.selectedColumns]
                        ]),
                        l("label", {
                          for: y.name,
                          class: "ml-3"
                        }, O(y.name), 9, au)
                      ]))), 128))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          l("div", ru, [
            ge(_, {
              onClick: c,
              color: "red",
              class: "ml-2"
            }, {
              default: _e(() => [
                we(" Save ")
              ]),
              _: 1
            }),
            ge(w, { onClick: d }, {
              default: _e(() => [
                we(" Cancel ")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["id"]);
    };
  }
}), iu = { key: 0 }, uu = { key: 1 }, du = {
  key: 2,
  class: "pt-1"
}, cu = { key: 0 }, fu = { key: 1 }, vu = { key: 2 }, pu = { key: 4 }, mu = { class: "pl-1 pt-1 flex flex-wrap" }, hu = { class: "flex mt-1" }, gu = ["title"], yu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("g", {
    "stroke-width": "1.5",
    fill: "none"
  }, [
    /* @__PURE__ */ l("path", {
      d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18",
      stroke: "currentColor"
    })
  ])
], -1), bu = [
  yu
], wu = ["disabled"], ku = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), _u = [
  ku
], $u = ["disabled"], Cu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), xu = [
  Cu
], Lu = ["disabled"], Vu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), Su = [
  Vu
], Mu = ["disabled"], Au = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Fu = [
  Au
], Tu = {
  key: 0,
  class: "flex mt-1"
}, Iu = { class: "px-4 text-lg text-black dark:text-white" }, ju = { key: 0 }, Ou = { key: 1 }, Du = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Bu = { key: 2 }, Pu = { class: "flex flex-wrap" }, Hu = {
  key: 0,
  class: "pl-2 mt-1"
}, Ru = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001  0 0 0 14.868 3"
  })
], -1), Eu = [
  Ru
], zu = {
  key: 1,
  class: "pl-2 mt-1"
}, Nu = /* @__PURE__ */ Ts('<svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fill-rule="evenodd"></path><path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z"></path><path fill="#fff" fill-rule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z"></path></svg><span class="text-green-900 dark:text-green-100">Excel</span>', 2), Uu = [
  Nu
], qu = {
  key: 2,
  class: "pl-2 mt-1"
}, Qu = {
  key: 0,
  class: "w-5 h-5 mr-1 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Ku = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M5 13l4 4L19 7"
}, null, -1), Zu = [
  Ku
], Wu = {
  key: 1,
  class: "w-5 h-5 mr-1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Gu = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }),
  /* @__PURE__ */ l("path", {
    d: "M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Ju = [
  Gu
], Xu = /* @__PURE__ */ l("span", { class: "whitespace-nowrap" }, "Copy URL", -1), Yu = {
  key: 3,
  class: "pl-2 mt-1"
}, ed = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), td = [
  ed
], sd = {
  key: 4,
  class: "pl-2 mt-1"
}, ld = /* @__PURE__ */ l("svg", {
  class: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), nd = { class: "mr-1" }, od = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, ad = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), rd = [
  ad
], id = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, ud = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), dd = [
  ud
], cd = {
  key: 5,
  class: "pl-2 mt-1"
}, fd = ["title"], vd = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), pd = { class: "whitespace-nowrap" }, md = { key: 8 }, hd = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, gd = { class: "mr-1 select-none" }, yd = {
  key: 1,
  class: "flex justify-between items-center"
}, bd = { class: "mr-1 select-none" }, _s = 25, wd = /* @__PURE__ */ ue({
  __name: "AutoQueryGrid",
  props: {
    filterDefinitions: {},
    id: { default: "AutoQueryGrid" },
    apis: {},
    type: {},
    prefs: {},
    deny: {},
    hide: {},
    selectedColumns: {},
    toolbarButtonClass: {},
    tableStyle: {},
    gridClass: {},
    grid2Class: {},
    grid3Class: {},
    grid4Class: {},
    tableClass: {},
    theadClass: {},
    tbodyClass: {},
    theadRowClass: {},
    theadCellClass: {},
    headerTitle: {},
    headerTitles: {},
    visibleFrom: {},
    rowClass: {},
    rowStyle: {},
    modelTitle: {},
    newButtonLabel: {},
    apiPrefs: {},
    canFilter: {},
    disableKeyBindings: {},
    configureField: {},
    skip: { default: 0 },
    create: { type: Boolean },
    edit: {},
    filters: {}
  },
  emits: ["headerSelected", "rowSelected", "nav"],
  setup(e, { expose: t, emit: s }) {
    const { config: n, autoQueryGridDefaults: a } = Nt(), r = a, u = n.value.storage, d = e, c = s, f = Ze("client"), m = "filtering,queryString,queryFilters".split(","), _ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), w = v(() => d.deny ? Ot(m, d.deny) : Ot(m, r.value.deny)), p = v(() => d.hide ? Ot(_, d.hide) : Ot(_, r.value.hide));
    function y($) {
      return w.value[$];
    }
    function k($) {
      return p.value[$];
    }
    const F = v(() => d.tableStyle ?? r.value.tableStyle), j = v(() => d.gridClass ?? me.getGridClass(F.value)), se = v(() => d.grid2Class ?? me.getGrid2Class(F.value)), T = v(() => d.grid3Class ?? me.getGrid3Class(F.value)), I = v(() => d.grid4Class ?? me.getGrid4Class(F.value)), A = v(() => d.tableClass ?? me.getTableClass(F.value)), re = v(() => d.theadClass ?? me.getTheadClass(F.value)), L = v(() => d.theadRowClass ?? me.getTheadRowClass(F.value)), E = v(() => d.theadCellClass ?? me.getTheadCellClass(F.value)), q = v(() => d.toolbarButtonClass ?? me.toolbarButtonClass);
    function ne($, P) {
      var Te;
      if (d.rowClass)
        return d.rowClass($, P);
      const fe = !!be.value.AnyUpdate, $e = ((Te = Ce.value) != null && Te.name ? ke($, Ce.value.name) : null) == ee.value;
      return me.getTableRowClass(d.tableStyle, P, $e, fe);
    }
    const R = Is(), X = v(() => {
      var $;
      return Ks((($ = be.value.AnyQuery.viewModel) == null ? void 0 : $.name) || be.value.AnyQuery.dataModel.name);
    }), Y = v(() => {
      const $ = Object.keys(R).map((P) => P.toLowerCase());
      return ut(X.value).filter((P) => $.includes(P.name.toLowerCase()) || $.includes(P.name.toLowerCase() + "-header")).map((P) => P.name);
    });
    function Z() {
      let $ = Tt(d.selectedColumns);
      return $.length > 0 ? $ : Y.value.length > 0 ? Y.value : [];
    }
    const V = v(() => {
      let P = Z().map((ae) => ae.toLowerCase());
      const fe = ut(X.value);
      return P.length > 0 ? P.map((ae) => fe.find(($e) => $e.name.toLowerCase() === ae)).filter((ae) => ae != null) : fe;
    }), te = v(() => {
      let $ = V.value.map((fe) => fe.name), P = Tt(de.value.selectedColumns).map((fe) => fe.toLowerCase());
      return P.length > 0 ? $.filter((fe) => P.includes(fe.toLowerCase())) : $;
    }), b = D([]), N = D(new nt()), z = D(new nt()), g = D(), C = D(!1), ee = D(), G = D(), oe = D(!1), B = D(), S = D(d.skip), ce = D(!1), de = D({ take: _s }), ie = D(!1), pe = v(() => b.value.some(($) => $.settings.filters.length > 0 || !!$.settings.sort) || de.value.selectedColumns), M = v(() => b.value.map(($) => $.settings.filters.length).reduce(($, P) => $ + P, 0)), ve = v(() => {
      var $;
      return ut(Ks(Qt.value || (($ = be.value.AnyQuery) == null ? void 0 : $.dataModel.name)));
    }), Ce = v(() => {
      var $;
      return ps(Ks(Qt.value || (($ = be.value.AnyQuery) == null ? void 0 : $.dataModel.name)));
    }), Ve = v(() => de.value.take ?? _s), he = v(() => N.value.response ? ke(N.value.response, "results") : []), Oe = v(() => {
      var $;
      return ((($ = N.value.response) == null ? void 0 : $.total) || he.value.length) ?? 0;
    }), De = v(() => S.value > 0), xe = v(() => S.value > 0), Qe = v(() => he.value.length >= Ve.value), Re = v(() => he.value.length >= Ve.value), Be = D(), We = D(), tt = {
      NoQuery: "No Query API was found"
    };
    t({
      update: Se,
      search: qt,
      createRequestArgs: qs,
      reset: Wl,
      createDone: os,
      createSave: Ws,
      editDone: St,
      editSave: ys,
      forceUpdate: $t,
      setEdit: bt,
      edit: G,
      createForm: Be,
      editForm: We,
      apiPrefs: de,
      results: he,
      skip: S,
      take: Ve,
      total: Oe
    }), J.interceptors.has("AutoQueryGrid.new") && J.interceptors.invoke("AutoQueryGrid.new", { props: d });
    function Ge($) {
      if ($) {
        if (d.canFilter)
          return d.canFilter($);
        const P = ve.value.find((fe) => fe.name.toLowerCase() == $.toLowerCase());
        if (P)
          return !Tn(P);
      }
      return !1;
    }
    function Fe($) {
      c("nav", $), y("queryString") && pl($);
    }
    async function st($) {
      S.value += $, S.value < 0 && (S.value = 0);
      const P = Math.floor(Oe.value / Ve.value) * Ve.value;
      S.value > P && (S.value = P), Fe({ skip: S.value || void 0 }), await Se();
    }
    async function Ee($, P) {
      var $e, Te;
      if (G.value = null, ee.value = P, !$ || !P)
        return;
      let fe = us(be.value.AnyQuery, { [$]: P });
      const ae = await f.api(fe);
      if (ae.succeeded) {
        let Ne = ($e = ke(ae.response, "results")) == null ? void 0 : $e[0];
        Ne || console.warn(`API ${(Te = be.value.AnyQuery) == null ? void 0 : Te.request.name}(${$}:${P}) returned no results`), G.value = Ne;
      }
    }
    async function at($, P) {
      var $e;
      c("rowSelected", $, P);
      const fe = ($e = Ce.value) == null ? void 0 : $e.name, ae = fe ? ke($, fe) : null;
      !fe || !ae || (Fe({ edit: ae }), Ee(fe, ae));
    }
    function H($, P) {
      var ae;
      if (!y("filtering"))
        return;
      let fe = P.target;
      if (Ge($) && (fe == null ? void 0 : fe.tagName) !== "TD") {
        let $e = (ae = fe == null ? void 0 : fe.closest("TABLE")) == null ? void 0 : ae.getBoundingClientRect(), Te = b.value.find((Ne) => Ne.name.toLowerCase() == $.toLowerCase());
        if (Te && $e) {
          let Ne = 318, mt = $e.x + Ne + 10;
          B.value = {
            column: Te,
            topLeft: {
              x: Math.max(Math.floor(P.clientX + Ne / 2), mt),
              y: $e.y + 45
            }
          };
        }
      }
      c("headerSelected", $, P);
    }
    function K() {
      B.value = null;
    }
    async function ye($) {
      var fe;
      let P = (fe = B.value) == null ? void 0 : fe.column;
      P && (P.settings = $, u.setItem(hs(P.name), JSON.stringify(P.settings)), await Se()), B.value = null;
    }
    async function je($) {
      u.setItem(hs($.name), JSON.stringify($.settings)), await Se();
    }
    async function Ye($) {
      oe.value = !1, de.value = $, u.setItem(Qs(), JSON.stringify($)), await Se();
    }
    function ct($) {
      var P;
      Be.value && (Object.assign((P = Be.value) == null ? void 0 : P.model, $), $t());
    }
    function bt($) {
      Object.assign(G.value, $), $t();
    }
    function $t() {
      var P, fe, ae;
      (P = Be.value) == null || P.forceUpdate(), (fe = We.value) == null || fe.forceUpdate();
      const $ = Pe();
      (ae = $ == null ? void 0 : $.proxy) == null || ae.$forceUpdate();
    }
    async function Se() {
      await qt(qs());
    }
    async function Vt() {
      await Se();
    }
    const Ut = /iPad|iPhone|iPod/.test(navigator.userAgent);
    async function qt($) {
      const P = be.value.AnyQuery;
      if (!P) {
        console.error(tt.NoQuery);
        return;
      }
      let fe = us(P, $), ae = await f.api(fe);
      vn((Ne) => {
        N.value.response = N.value.error = void 0, ie.value = Ne, Ut ? Dt(() => N.value = ae) : N.value = ae;
      })();
      let Te = ke(ae.response, "results") || [];
      !ae.succeeded || Te.label == 0;
    }
    function qs() {
      let $ = {
        include: "total",
        take: Ve.value
      }, P = Tt(de.value.selectedColumns || d.selectedColumns);
      if (P.length > 0) {
        let ae = Ce.value;
        ae && !P.includes(ae.name) && (P = [ae.name, ...P]);
        const $e = ve.value, Te = [];
        P.forEach((Ne) => {
          var bs;
          const mt = $e.find((Mt) => Mt.name.toLowerCase() == Ne.toLowerCase());
          (bs = mt == null ? void 0 : mt.ref) != null && bs.selfId && Te.push(mt.ref.selfId), ke(R, Ne) && Te.push(...$e.filter((Mt) => {
            var Ue, At;
            return ((At = (Ue = Mt.ref) == null ? void 0 : Ue.selfId) == null ? void 0 : At.toLowerCase()) == Ne.toLowerCase();
          }).map((Mt) => Mt.name));
        }), Te.forEach((Ne) => {
          P.includes(Ne) || P.push(Ne);
        }), $.fields = P.join(",");
      }
      let fe = [];
      if (b.value.forEach((ae) => {
        ae.settings.sort && fe.push((ae.settings.sort === "DESC" ? "-" : "") + ae.name), ae.settings.filters.forEach(($e) => {
          let Te = $e.key.replace("%", ae.name);
          $[Te] = $e.value;
        });
      }), d.filters && Object.keys(d.filters).forEach((ae) => {
        $[ae] = d.filters[ae];
      }), y("queryString") && y("queryFilters")) {
        const ae = location.search ? location.search : location.hash.includes("?") ? "?" + $s(location.hash, "?") : "";
        let $e = el(ae);
        if (Object.keys($e).forEach((Te) => {
          V.value.find((mt) => mt.name.toLowerCase() === Te.toLowerCase()) && ($[Te] = $e[Te]);
        }), typeof $e.skip < "u") {
          const Te = parseInt($e.skip);
          isNaN(Te) || (S.value = $.skip = Te);
        }
      }
      return typeof $.skip > "u" && S.value > 0 && ($.skip = S.value), fe.length > 0 && ($.orderBy = fe.join(",")), $;
    }
    function ro() {
      const $ = Rl("csv");
      ll($), typeof window < "u" && window.open($);
    }
    function io() {
      const $ = Rl("json");
      ll($), ce.value = !0, setTimeout(() => ce.value = !1, 3e3);
    }
    function Rl($ = "json") {
      var Te;
      const P = qs(), fe = `/api/${(Te = be.value.AnyQuery) == null ? void 0 : Te.request.name}`, ae = Do(f.baseUrl, Yt(fe, { ...P, jsconfig: "edv" }));
      return ae.indexOf("?") >= 0 ? js(ae, "?") + "." + $ + "?" + $s(ae, "?") : ae + ".json";
    }
    async function uo() {
      b.value.forEach(($) => {
        $.settings = { filters: [] }, u.removeItem(hs($.name));
      }), de.value = { take: _s }, u.removeItem(Qs()), await Se();
    }
    function co() {
      C.value = !0, Fe({ create: null });
    }
    const Qt = v(() => zt(d.type)), ls = v(() => {
      var $;
      return Qt.value || (($ = be.value.AnyQuery) == null ? void 0 : $.dataModel.name);
    }), ns = v(() => d.modelTitle || ls.value), fo = v(() => d.newButtonLabel || `New ${ns.value}`), Qs = () => {
      var $;
      return `${d.id}/ApiPrefs/${Qt.value || (($ = be.value.AnyQuery) == null ? void 0 : $.dataModel.name)}`;
    }, hs = ($) => {
      var P;
      return `Column/${d.id}:${Qt.value || ((P = be.value.AnyQuery) == null ? void 0 : P.dataModel.name)}.${$}`;
    }, { metadataApi: El, typeOf: Ks, apiOf: zl, filterDefinitions: vo } = dt(), { invalidAccessMessage: Zs } = Dl(), Nl = v(() => d.filterDefinitions || vo.value), be = v(() => {
      let $ = Tt(d.apis);
      return $.length > 0 ? Rt.from($.map((P) => zl(P)).filter((P) => P != null).map((P) => P)) : Rt.forType(Qt.value, El.value);
    }), gs = ($) => `<span class="text-yellow-700">${$}</span>`, Ul = v(() => {
      if (!El.value)
        return gs(`AppMetadata not loaded, see <a class="${Fs.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let P = Tt(d.apis).map((ae) => zl(ae) == null ? ae : null).filter((ae) => ae != null);
      if (P.length > 0)
        return gs(`Unknown API${P.length > 1 ? "s" : ""}: ${P.join(", ")}`);
      let fe = be.value;
      return fe.empty ? gs("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : fe.AnyQuery ? null : gs(tt.NoQuery);
    }), ql = v(() => be.value.AnyQuery && Zs(be.value.AnyQuery)), Ql = v(() => be.value.Create && Zs(be.value.Create)), Kl = v(() => be.value.AnyUpdate && Zs(be.value.AnyUpdate)), po = v(() => is(be.value.Create));
    v(() => is(be.value.AnyUpdate));
    const Zl = v(() => is(be.value.Delete));
    function St() {
      G.value = null, ee.value = null, Fe({ edit: void 0 });
    }
    function os() {
      C.value = !1, Fe({ create: void 0 });
    }
    async function ys() {
      await Se(), St();
    }
    async function Ws() {
      await Se(), os();
    }
    function Wl() {
      var fe;
      N.value = new nt(), z.value = new nt(), C.value = !1, ee.value = null, G.value = null, oe.value = !1, B.value = null, S.value = d.skip, ce.value = !1, de.value = { take: _s }, ie.value = !1;
      const $ = d.prefs || As(u.getItem(Qs()));
      $ && (de.value = $), b.value = V.value.map((ae) => ({
        name: ae.name,
        type: ae.type,
        meta: ae,
        settings: Object.assign(
          {
            filters: []
          },
          As(u.getItem(hs(ae.name)))
        )
      })), isNaN(d.skip) || (S.value = d.skip);
      let P = (fe = Ce.value) == null ? void 0 : fe.name;
      if (y("queryString")) {
        const ae = location.search ? location.search : location.hash.includes("?") ? "?" + $s(location.hash, "?") : "";
        let $e = el(ae);
        typeof $e.create < "u" ? C.value = typeof $e.create < "u" : P && (typeof $e.edit == "string" || typeof $e.edit == "number") && Ee(P, $e.edit);
      }
      d.create === !0 && (C.value = !0), P && d.edit != null && Ee(P, d.edit);
    }
    return ot(async () => {
      Wl(), await Se();
    }), ($, P) => {
      const fe = Q("Alert"), ae = Q("EnsureAccessDialog"), $e = Q("AutoCreateForm"), Te = Q("AutoEditForm"), Ne = Q("AutoViewForm"), mt = Q("ErrorSummary"), Gl = Q("Loading"), bs = Q("SettingsIcons"), Mt = Q("DataGrid");
      return Ul.value ? (o(), i("div", iu, [
        ge(fe, { innerHTML: Ul.value }, null, 8, ["innerHTML"])
      ])) : ql.value ? (o(), i("div", uu, [
        ge(ao, { "invalid-access": ql.value }, null, 8, ["invalid-access"])
      ])) : (o(), i("div", du, [
        k("forms") && C.value && be.value.Create ? (o(), i("div", cu, [
          Ql.value ? (o(), le(ae, {
            key: 0,
            title: `Create ${ns.value}`,
            "invalid-access": Ql.value,
            "alert-class": "text-yellow-700",
            onDone: os
          }, null, 8, ["title", "invalid-access"])) : W(R).createform ? U($.$slots, "createform", {
            key: 1,
            type: be.value.Create.request.name,
            configure: $.configureField,
            done: os,
            save: Ws
          }) : (o(), le($e, {
            key: 2,
            ref_key: "createForm",
            ref: Be,
            type: be.value.Create.request.name,
            configure: $.configureField,
            onDone: os,
            onSave: Ws
          }, {
            header: _e(() => [
              U($.$slots, "formheader", {
                form: "create",
                formInstance: Be.value,
                apis: be.value,
                type: ls.value,
                updateModel: ct
              })
            ]),
            footer: _e(() => [
              U($.$slots, "formfooter", {
                form: "create",
                formInstance: Be.value,
                apis: be.value,
                type: ls.value,
                updateModel: ct
              })
            ]),
            _: 3
          }, 8, ["type", "configure"]))
        ])) : k("forms") && G.value && be.value.AnyUpdate ? (o(), i("div", fu, [
          Kl.value ? (o(), le(ae, {
            key: 0,
            title: `Update ${ns.value}`,
            "invalid-access": Kl.value,
            "alert-class": "text-yellow-700",
            onDone: St
          }, null, 8, ["title", "invalid-access"])) : W(R).editform ? U($.$slots, "editform", {
            key: 1,
            model: G.value,
            type: be.value.AnyUpdate.request.name,
            deleteType: Zl.value ? be.value.Delete.request.name : null,
            configure: $.configureField,
            done: St,
            save: ys
          }) : (o(), le(Te, {
            key: 2,
            ref_key: "editForm",
            ref: We,
            modelValue: G.value,
            "onUpdate:modelValue": P[0] || (P[0] = (Ue) => G.value = Ue),
            type: be.value.AnyUpdate.request.name,
            deleteType: Zl.value ? be.value.Delete.request.name : null,
            configure: $.configureField,
            onDone: St,
            onSave: ys,
            onDelete: ys
          }, {
            header: _e(() => [
              U($.$slots, "formheader", {
                form: "edit",
                formInstance: We.value,
                apis: be.value,
                type: ls.value,
                model: G.value,
                id: ee.value,
                updateModel: bt
              })
            ]),
            footer: _e(() => [
              U($.$slots, "formfooter", {
                form: "edit",
                formInstance: We.value,
                apis: be.value,
                type: ls.value,
                model: G.value,
                id: ee.value,
                updateModel: bt
              })
            ]),
            _: 3
          }, 8, ["modelValue", "type", "deleteType", "configure"]))
        ])) : k("forms") && G.value ? (o(), i("div", vu, [
          W(R).viewform ? U($.$slots, "viewform", {
            key: 0,
            model: G.value,
            apis: be.value,
            done: St
          }) : (o(), le(Ne, {
            key: 1,
            model: G.value,
            apis: be.value,
            done: St
          }, null, 8, ["model", "apis"]))
        ])) : x("", !0),
        W(R).toolbar ? U($.$slots, "toolbar", { key: 3 }) : k("toolbar") ? (o(), i("div", pu, [
          oe.value ? (o(), le(Hl, {
            key: 0,
            columns: V.value,
            prefs: de.value,
            onDone: P[1] || (P[1] = (Ue) => oe.value = !1),
            onSave: Ye
          }, null, 8, ["columns", "prefs"])) : x("", !0),
          l("div", mu, [
            l("div", hu, [
              k("preferences") ? (o(), i("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${ns.value} Preferences`,
                onClick: P[2] || (P[2] = (Ue) => oe.value = !oe.value)
              }, bu, 8, gu)) : x("", !0),
              k("pagingNav") ? (o(), i("button", {
                key: 1,
                type: "button",
                class: h(["pl-2", De.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !De.value,
                onClick: P[3] || (P[3] = (Ue) => st(-Oe.value))
              }, _u, 10, wu)) : x("", !0),
              k("pagingNav") ? (o(), i("button", {
                key: 2,
                type: "button",
                class: h(["pl-2", xe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !xe.value,
                onClick: P[4] || (P[4] = (Ue) => st(-Ve.value))
              }, xu, 10, $u)) : x("", !0),
              k("pagingNav") ? (o(), i("button", {
                key: 3,
                type: "button",
                class: h(["pl-2", Qe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !Qe.value,
                onClick: P[5] || (P[5] = (Ue) => st(Ve.value))
              }, Su, 10, Lu)) : x("", !0),
              k("pagingNav") ? (o(), i("button", {
                key: 4,
                type: "button",
                class: h(["pl-2", Re.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !Re.value,
                onClick: P[6] || (P[6] = (Ue) => st(Oe.value))
              }, Fu, 10, Mu)) : x("", !0)
            ]),
            k("pagingInfo") ? (o(), i("div", Tu, [
              l("div", Iu, [
                ie.value ? (o(), i("span", ju, "Querying...")) : x("", !0),
                he.value.length ? (o(), i("span", Ou, [
                  Du,
                  we(" " + O(S.value + 1) + " - " + O(Math.min(S.value + he.value.length, Oe.value)) + " ", 1),
                  l("span", null, " of " + O(Oe.value), 1)
                ])) : N.value.completed ? (o(), i("span", Bu, "No Results")) : x("", !0)
              ])
            ])) : x("", !0),
            l("div", Pu, [
              k("refresh") ? (o(), i("div", Hu, [
                l("button", {
                  type: "button",
                  onClick: Vt,
                  title: "Refresh",
                  class: h(q.value)
                }, Eu, 2)
              ])) : x("", !0),
              k("downloadCsv") ? (o(), i("div", zu, [
                l("button", {
                  type: "button",
                  onClick: ro,
                  title: "Download CSV",
                  class: h(q.value)
                }, Uu, 2)
              ])) : x("", !0),
              k("copyApiUrl") ? (o(), i("div", qu, [
                l("button", {
                  type: "button",
                  onClick: io,
                  title: "Copy API URL",
                  class: h(q.value)
                }, [
                  ce.value ? (o(), i("svg", Qu, Zu)) : (o(), i("svg", Wu, Ju)),
                  Xu
                ], 2)
              ])) : x("", !0),
              pe.value && k("resetPreferences") ? (o(), i("div", Yu, [
                l("button", {
                  type: "button",
                  onClick: uo,
                  title: "Reset Preferences & Filters",
                  class: h(q.value)
                }, td, 2)
              ])) : x("", !0),
              k("filtersView") && M.value > 0 ? (o(), i("div", sd, [
                l("button", {
                  type: "button",
                  onClick: P[7] || (P[7] = (Ue) => g.value = g.value == "filters" ? null : "filters"),
                  class: h(q.value),
                  "aria-expanded": "false"
                }, [
                  ld,
                  l("span", nd, O(M.value) + " " + O(M.value == 1 ? "Filter" : "Filters"), 1),
                  g.value != "filters" ? (o(), i("svg", od, rd)) : (o(), i("svg", id, dd))
                ], 2)
              ])) : x("", !0),
              k("newItem") && be.value.Create && po.value ? (o(), i("div", cd, [
                l("button", {
                  type: "button",
                  onClick: co,
                  title: ns.value,
                  class: h(q.value)
                }, [
                  vd,
                  l("span", pd, O(fo.value), 1)
                ], 10, fd)
              ])) : x("", !0),
              W(R).toolbarbuttons ? U($.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: q.value
              }) : x("", !0)
            ])
          ])
        ])) : x("", !0),
        g.value == "filters" ? (o(), le(Pl, {
          key: 5,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: Nl.value,
          columns: b.value,
          onDone: P[8] || (P[8] = (Ue) => g.value = null),
          onChange: je
        }, null, 8, ["definitions", "columns"])) : x("", !0),
        z.value.error ?? N.value.error ? (o(), le(mt, {
          key: 6,
          status: z.value.error ?? N.value.error
        }, null, 8, ["status"])) : ie.value ? (o(), le(Gl, {
          key: 7,
          class: "p-2"
        })) : x("", !0),
        B.value ? (o(), i("div", md, [
          ge(Bl, {
            definitions: Nl.value,
            column: B.value.column,
            "top-left": B.value.topLeft,
            onDone: K,
            onSave: ye
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : x("", !0),
        he.value.length ? (o(), le(Mt, {
          key: 9,
          id: $.id,
          items: he.value,
          type: $.type,
          "selected-columns": te.value,
          class: "mt-1",
          onFiltersChanged: Se,
          tableStyle: F.value,
          gridClass: j.value,
          grid2Class: se.value,
          grid3Class: T.value,
          grid4Class: I.value,
          tableClass: A.value,
          theadClass: re.value,
          theadRowClass: L.value,
          theadCellClass: E.value,
          tbodyClass: $.tbodyClass,
          rowClass: ne,
          onRowSelected: at,
          rowStyle: $.rowStyle,
          headerTitle: $.headerTitle,
          headerTitles: $.headerTitles,
          visibleFrom: $.visibleFrom,
          onHeaderSelected: H
        }, fl({
          header: _e(({ column: Ue, label: At }) => {
            var Jl;
            return [
              y("filtering") && Ge(Ue) ? (o(), i("div", hd, [
                l("span", gd, O(At), 1),
                ge(bs, {
                  column: b.value.find((mo) => mo.name.toLowerCase() === Ue.toLowerCase()),
                  "is-open": ((Jl = B.value) == null ? void 0 : Jl.column.name) === Ue
                }, null, 8, ["column", "is-open"])
              ])) : (o(), i("div", yd, [
                l("span", bd, O(At), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          Ie(Object.keys(W(R)), (Ue) => ({
            name: Ue,
            fn: _e((At) => [
              U($.$slots, Ue, Xt(Ss(At)))
            ])
          }))
        ]), 1032, ["id", "items", "type", "selected-columns", "tableStyle", "gridClass", "grid2Class", "grid3Class", "grid4Class", "tableClass", "theadClass", "theadRowClass", "theadCellClass", "tbodyClass", "rowStyle", "headerTitle", "headerTitles", "visibleFrom"])) : x("", !0)
      ]));
    };
  }
}), kd = { class: "flex" }, _d = {
  key: 0,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, $d = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Cd = [
  $d
], xd = /* @__PURE__ */ l("path", {
  d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z",
  fill: "currentColor"
}, null, -1), Ld = /* @__PURE__ */ l("path", {
  d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
  fill: "currentColor"
}, null, -1), Vd = [
  xd,
  Ld
], Sd = {
  key: 2,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Md = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z",
    fill: "currentColor"
  })
], -1), Ad = [
  Md
], Fd = {
  key: 3,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Td = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
    fill: "currentColor"
  })
], -1), Id = [
  Td
], jd = /* @__PURE__ */ ue({
  __name: "SettingsIcons",
  props: {
    column: {},
    isOpen: { type: Boolean }
  },
  setup(e) {
    return (t, s) => {
      var n, a, r, u, d, c, f;
      return o(), i("div", kd, [
        (r = (a = (n = t.column) == null ? void 0 : n.settings) == null ? void 0 : a.filters) != null && r.length ? (o(), i("svg", _d, Cd)) : (o(), i("svg", {
          key: 1,
          class: h(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, Vd, 2)),
        ((d = (u = t.column) == null ? void 0 : u.settings) == null ? void 0 : d.sort) === "ASC" ? (o(), i("svg", Sd, Ad)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), i("svg", Fd, Id)) : x("", !0)
      ]);
    };
  }
}), Od = /* @__PURE__ */ ue({
  __name: "EnsureAccessDialog",
  props: {
    title: {},
    subtitle: {},
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    return (t, s) => {
      const n = Q("EnsureAccess"), a = Q("SlideOver");
      return t.invalidAccess ? (o(), le(a, {
        key: 0,
        title: t.title,
        onDone: s[0] || (s[0] = (r) => t.$emit("done")),
        "content-class": "relative flex-1"
      }, fl({
        default: _e(() => [
          ge(n, {
            alertClass: t.alertClass,
            invalidAccess: t.invalidAccess
          }, null, 8, ["alertClass", "invalidAccess"])
        ]),
        _: 2
      }, [
        t.subtitle ? {
          name: "subtitle",
          fn: _e(() => [
            we(O(t.subtitle), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["title"])) : x("", !0);
    };
  }
}), Dd = ["for"], Bd = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Pd = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Hd = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Rd = [
  Hd
], Ed = ["id"], zd = ["id"], Nd = {
  inheritAttrs: !1
}, Ud = /* @__PURE__ */ ue({
  ...Nd,
  __name: "TextInput",
  props: {
    status: {},
    id: {},
    type: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {}
  },
  setup(e, { expose: t }) {
    const s = (p) => p.value, n = e;
    t({
      focus: r
    });
    const a = D();
    function r() {
      var p;
      (p = a.value) == null || p.focus();
    }
    const u = v(() => n.type || "text"), d = v(() => n.label ?? He(vt(n.id))), c = v(() => n.placeholder ?? d.value);
    function f(p) {
      return n.type === "range" ? p.replace("shadow-sm ", "") : p;
    }
    let m = Ze("ApiState", void 0);
    const _ = v(() => _t.call({ responseStatus: n.status ?? (m == null ? void 0 : m.error.value) }, n.id)), w = v(() => [ft.base, _.value ? ft.invalid : f(ft.valid), n.inputClass]);
    return (p, y) => (o(), i("div", {
      class: h([p.$attrs.class])
    }, [
      U(p.$slots, "header", Ae({
        inputElement: a.value,
        id: p.id,
        modelValue: p.modelValue,
        status: p.status
      }, p.$attrs)),
      d.value ? (o(), i("label", {
        key: 0,
        for: p.id,
        class: h(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${p.labelClass ?? ""}`)
      }, O(d.value), 11, Dd)) : x("", !0),
      l("div", {
        class: h(f("mt-1 relative shadow-sm rounded-md"))
      }, [
        l("input", Ae({
          ref_key: "inputElement",
          ref: a,
          type: u.value,
          name: p.id,
          id: p.id,
          class: w.value,
          placeholder: c.value,
          value: W(gn)(u.value, p.modelValue),
          onInput: y[0] || (y[0] = (k) => p.$emit("update:modelValue", s(k.target))),
          "aria-invalid": _.value != null,
          "aria-describedby": `${p.id}-error`,
          step: "any"
        }, W(yt)(p.$attrs, ["class", "value"])), null, 16, Bd),
        _.value ? (o(), i("div", Pd, Rd)) : x("", !0)
      ], 2),
      _.value ? (o(), i("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${p.id}-error`
      }, O(_.value), 9, Ed)) : p.help ? (o(), i("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${p.id}-description`
      }, O(p.help), 9, zd)) : x("", !0),
      U(p.$slots, "footer", Ae({
        inputElement: a.value,
        id: p.id,
        modelValue: p.modelValue,
        status: p.status
      }, p.$attrs))
    ], 2));
  }
}), qd = ["for"], Qd = { class: "mt-1 relative rounded-md shadow-sm" }, Kd = ["name", "id", "placeholder", "aria-invalid", "aria-describedby"], Zd = ["id"], Wd = ["id"], Gd = {
  inheritAttrs: !1
}, Jd = /* @__PURE__ */ ue({
  ...Gd,
  __name: "TextareaInput",
  props: {
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {}
  },
  setup(e) {
    const t = (c) => c.value, s = e, n = v(() => s.label ?? He(vt(s.id))), a = v(() => s.placeholder ?? n.value);
    let r = Ze("ApiState", void 0);
    const u = v(() => _t.call({ responseStatus: s.status ?? (r == null ? void 0 : r.error.value) }, s.id)), d = v(() => ["shadow-sm " + ft.base, u.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid, s.inputClass]);
    return (c, f) => (o(), i("div", {
      class: h([c.$attrs.class])
    }, [
      n.value ? (o(), i("label", {
        key: 0,
        for: c.id,
        class: h(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${c.labelClass ?? ""}`)
      }, O(n.value), 11, qd)) : x("", !0),
      l("div", Qd, [
        l("textarea", Ae({
          name: c.id,
          id: c.id,
          class: d.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (m) => c.$emit("update:modelValue", t(m.target))),
          "aria-invalid": u.value != null,
          "aria-describedby": `${c.id}-error`
        }, W(yt)(c.$attrs, ["class"])), O(c.modelValue), 17, Kd)
      ]),
      u.value ? (o(), i("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, O(u.value), 9, Zd)) : c.help ? (o(), i("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, O(c.help), 9, Wd)) : x("", !0)
    ], 2));
  }
}), Xd = ["for"], Yd = ["id", "name", "value", "aria-invalid", "aria-describedby"], ec = ["value"], tc = ["id"], sc = {
  inheritAttrs: !1
}, lc = /* @__PURE__ */ ue({
  ...sc,
  __name: "SelectInput",
  props: {
    status: {},
    id: {},
    modelValue: {},
    inputClass: {},
    label: {},
    labelClass: {},
    options: {},
    values: {},
    entries: {}
  },
  setup(e) {
    const t = (d) => d.value, s = e, n = v(() => s.label ?? He(vt(s.id)));
    let a = Ze("ApiState", void 0);
    const r = v(() => _t.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id)), u = v(() => s.entries || (s.values ? s.values.map((d) => ({ key: d, value: d })) : s.options ? Object.keys(s.options).map((d) => ({ key: d, value: s.options[d] })) : []));
    return (d, c) => (o(), i("div", {
      class: h([d.$attrs.class])
    }, [
      n.value ? (o(), i("label", {
        key: 0,
        for: d.id,
        class: h(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${d.labelClass ?? ""}`)
      }, O(n.value), 11, Xd)) : x("", !0),
      l("select", Ae({
        id: d.id,
        name: d.id,
        class: [
          "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600",
          r.value ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
          d.inputClass
        ],
        value: d.modelValue,
        onInput: c[0] || (c[0] = (f) => d.$emit("update:modelValue", t(f.target))),
        "aria-invalid": r.value != null,
        "aria-describedby": `${d.id}-error`
      }, W(yt)(d.$attrs, ["class"])), [
        (o(!0), i(Me, null, Ie(u.value, (f) => (o(), i("option", {
          value: f.key
        }, O(f.value), 9, ec))), 256))
      ], 16, Yd),
      r.value ? (o(), i("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${d.id}-error`
      }, O(r.value), 9, tc)) : x("", !0)
    ], 2));
  }
}), nc = { class: "flex items-center h-5" }, oc = ["id", "name", "checked"], ac = { class: "ml-3 text-sm" }, rc = ["for"], ic = {
  key: 0,
  class: "mt-2 text-sm text-red-500",
  id: "`${id}-error`"
}, uc = {
  key: 1,
  class: "mt-2 text-sm text-gray-500",
  id: "`${id}-description`"
}, dc = {
  inheritAttrs: !1
}, cc = /* @__PURE__ */ ue({
  ...dc,
  __name: "CheckboxInput",
  props: {
    modelValue: { type: Boolean },
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = v(() => s.label ?? He(vt(s.id)));
    let a = Ze("ApiState", void 0);
    const r = v(() => _t.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id));
    return (u, d) => (o(), i("div", {
      class: h(["relative flex items-start", u.$attrs.class])
    }, [
      l("div", nc, [
        l("input", Ae({
          id: u.id,
          name: u.id,
          type: "checkbox",
          checked: u.modelValue,
          onInput: d[0] || (d[0] = (c) => u.$emit("update:modelValue", c.target.checked)),
          class: ["focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800", u.inputClass]
        }, W(yt)(u.$attrs, ["class"])), null, 16, oc)
      ]),
      l("div", ac, [
        l("label", {
          for: u.id,
          class: h(`font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
        }, O(n.value), 11, rc),
        r.value ? (o(), i("p", ic, O(r.value), 1)) : u.help ? (o(), i("p", uc, O(u.help), 1)) : x("", !0)
      ])
    ], 2));
  }
}), fc = ["id"], vc = ["for"], pc = { class: "mt-1 relative rounded-md shadow-sm" }, mc = ["id", "name", "value"], hc = { class: "flex flex-wrap pb-1.5" }, gc = { class: "pt-1.5 pl-1" }, yc = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300" }, bc = ["onClick"], wc = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), kc = [
  wc
], _c = { class: "pt-1.5 pl-1 shrink" }, $c = ["type", "name", "id", "aria-invalid", "aria-describedby"], Cc = ["id"], xc = ["onMouseover", "onClick"], Lc = { class: "block truncate" }, Vc = {
  key: 1,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Sc = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Mc = [
  Sc
], Ac = ["id"], Fc = ["id"], Tc = {
  inheritAttrs: !1
}, Ic = /* @__PURE__ */ ue({
  ...Tc,
  __name: "TagInput",
  props: {
    status: {},
    id: {},
    type: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    modelValue: { default: () => [] },
    delimiters: { default: () => [","] },
    allowableValues: {},
    string: { type: Boolean },
    maxVisibleItems: { default: 300 },
    converter: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t;
    function a(b) {
      return s.converter ? s.converter(b) : b;
    }
    const r = v(() => Xe(a(s.modelValue), (b) => typeof b == "string" ? b.trim().length == 0 ? [] : b.split(",") : b) || []), u = D(), d = D(!1), c = v(() => {
      const b = _.value.toLowerCase();
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((N) => !r.value.includes(N) && N.toLowerCase().includes(b)) : s.allowableValues.filter((N) => !r.value.includes(N) && N.startsWith(b));
    });
    function f(b) {
      u.value = b;
    }
    const m = D(null), _ = D(""), w = v(() => s.type || "text"), p = v(() => s.label ?? He(vt(s.id)));
    let y = Ze("ApiState", void 0);
    const k = v(() => _t.call({ responseStatus: s.status ?? (y == null ? void 0 : y.error.value) }, s.id)), F = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      k.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), j = (b) => L(r.value.filter((N) => N != b));
    function se(b) {
      var N;
      document.activeElement === b.target && ((N = m.value) == null || N.focus());
    }
    const T = D();
    function I() {
      d.value = !0, T.value = !0;
    }
    function A() {
      I();
    }
    function re() {
      Z(q()), T.value = !1, setTimeout(() => {
        T.value || (d.value = !1);
      }, 200);
    }
    function L(b) {
      const N = s.string ? b.join(",") : b;
      n("update:modelValue", N);
    }
    function E(b) {
      if (b.key == "Backspace" && _.value.length == 0 && r.value.length > 0 && j(r.value[r.value.length - 1]), !(!s.allowableValues || s.allowableValues.length == 0))
        if (b.code == "Escape" || b.code == "Tab")
          d.value = !1;
        else if (b.code == "Home")
          u.value = c.value[0], X();
        else if (b.code == "End")
          u.value = c.value[c.value.length - 1], X();
        else if (b.code == "ArrowDown") {
          if (d.value = !0, !u.value)
            u.value = c.value[0];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N + 1 < c.value.length ? c.value[N + 1] : c.value[0];
          }
          Y();
        } else if (b.code == "ArrowUp") {
          if (!u.value)
            u.value = c.value[c.value.length - 1];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N - 1 >= 0 ? c.value[N - 1] : c.value[c.value.length - 1];
          }
          Y();
        } else
          b.code == "Enter" ? u.value && d.value ? (Z(u.value), b.preventDefault()) : d.value = !1 : d.value = c.value.length > 0;
    }
    function q() {
      if (_.value.length == 0)
        return "";
      let b = Bo(_.value.trim(), ",");
      return b[0] == "," && (b = b.substring(1)), b = b.trim(), b.length == 0 && d.value && c.value.length > 0 ? u.value : b;
    }
    function ne(b) {
      const N = q();
      if (N.length > 0) {
        const z = s.delimiters.some((C) => C == b.key);
        if (z && b.preventDefault(), b.key == "Enter" || b.key == "NumpadEnter" || b.key.length == 1 && z) {
          Z(N);
          return;
        }
      }
    }
    const R = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function X() {
      setTimeout(() => {
        let b = Ms(`#${s.id}-tag li.active`);
        b && b.scrollIntoView(R);
      }, 0);
    }
    function Y() {
      setTimeout(() => {
        let b = Ms(`#${s.id}-tag li.active`);
        b && ("scrollIntoViewIfNeeded" in b ? b.scrollIntoViewIfNeeded(R) : b.scrollIntoView(R));
      }, 0);
    }
    function Z(b) {
      if (b.length === 0)
        return;
      const N = Array.from(r.value);
      N.indexOf(b) == -1 && N.push(b), L(N), _.value = "", d.value = !1;
    }
    function V(b) {
      var z;
      const N = (z = b.clipboardData) == null ? void 0 : z.getData("Text");
      te(N);
    }
    function te(b) {
      if (!b)
        return;
      const N = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), z = Array.from(r.value);
      b.split(N).map((C) => C.trim()).forEach((C) => {
        z.indexOf(C) == -1 && z.push(C);
      }), L(z), _.value = "";
    }
    return (b, N) => (o(), i("div", {
      class: h([b.$attrs.class]),
      id: `${b.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      p.value ? (o(), i("label", {
        key: 0,
        for: b.id,
        class: h(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${b.labelClass ?? ""}`)
      }, O(p.value), 11, vc)) : x("", !0),
      l("div", pc, [
        l("input", {
          type: "hidden",
          id: b.id,
          name: b.id,
          value: r.value.join(",")
        }, null, 8, mc),
        l("button", {
          class: h(F.value),
          onClick: qe(se, ["prevent"]),
          onFocus: N[2] || (N[2] = (z) => d.value = !0),
          tabindex: "-1"
        }, [
          l("div", hc, [
            (o(!0), i(Me, null, Ie(r.value, (z) => (o(), i("div", gc, [
              l("span", yc, [
                we(O(z) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (g) => j(z),
                  class: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                }, kc, 8, bc)
              ])
            ]))), 256)),
            l("div", _c, [
              Bt(l("input", Ae({
                ref_key: "txtInput",
                ref: m,
                type: w.value,
                role: "combobox",
                "aria-controls": "options",
                "aria-expanded": "false",
                autocomplete: "off",
                spellcheck: "false",
                name: `${b.id}-txt`,
                id: `${b.id}-txt`,
                class: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
                style: `box-shadow:none !important;width:${_.value.length + 1}ch`,
                "onUpdate:modelValue": N[0] || (N[0] = (z) => _.value = z),
                "aria-invalid": k.value != null,
                "aria-describedby": `${b.id}-error`,
                onKeydown: E,
                onKeypress: ne,
                onPaste: qe(V, ["prevent", "stop"]),
                onFocus: A,
                onBlur: re,
                onClick: N[1] || (N[1] = (z) => d.value = !0)
              }, W(yt)(b.$attrs, ["class", "required"])), null, 16, $c), [
                [wo, _.value]
              ])
            ])
          ])
        ], 34),
        d.value && c.value.length ? (o(), i("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: E,
          id: `${b.id}-options`,
          role: "listbox"
        }, [
          (o(!0), i(Me, null, Ie(c.value.slice(0, b.maxVisibleItems), (z) => (o(), i("li", {
            class: h([z === u.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (g) => f(z),
            onClick: (g) => Z(z),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", Lc, O(z), 1)
          ], 42, xc))), 256))
        ], 40, Cc)) : x("", !0),
        k.value ? (o(), i("div", Vc, Mc)) : x("", !0)
      ]),
      k.value ? (o(), i("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${b.id}-error`
      }, O(k.value), 9, Ac)) : b.help ? (o(), i("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${b.id}-description`
      }, O(b.help), 9, Fc)) : x("", !0)
    ], 10, fc));
  }
}), jc = { class: "relative flex-grow mr-2 sm:mr-4" }, Oc = ["for"], Dc = { class: "block mt-2" }, Bc = { class: "sr-only" }, Pc = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Hc = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Rc = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Ec = [
  Rc
], zc = ["id"], Nc = ["id"], Uc = { key: 0 }, qc = ["title"], Qc = ["alt", "src"], Kc = {
  key: 1,
  class: "mt-3"
}, Zc = { class: "w-full" }, Wc = { class: "pr-6 align-bottom pb-2" }, Gc = ["title"], Jc = ["src", "onError"], Xc = ["href"], Yc = {
  key: 1,
  class: "overflow-hidden"
}, e0 = { class: "align-top pb-2 whitespace-nowrap" }, t0 = {
  key: 0,
  class: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black"
}, s0 = /* @__PURE__ */ ue({
  __name: "FileInput",
  props: {
    multiple: { type: Boolean },
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {},
    values: {},
    files: {}
  },
  setup(e) {
    var I;
    const t = e, s = D(null), { assetsPathResolver: n, fallbackPathResolver: a } = Nt(), r = {}, u = D(), d = D(((I = t.files) == null ? void 0 : I.map(c)) || []);
    function c(A) {
      return A.filePath = n(A.filePath), A;
    }
    t.values && t.values.length > 0 && (d.value = t.values.map((A) => {
      let re = A.replace(/\\/g, "/");
      return { fileName: cn(Pt(re, "/"), "."), filePath: re, contentType: ol(re) };
    }).map(c));
    const f = v(() => t.label ?? He(vt(t.id))), m = v(() => t.placeholder ?? f.value);
    let _ = Ze("ApiState", void 0);
    const w = v(() => _t.call({ responseStatus: t.status ?? (_ == null ? void 0 : _.error.value) }, t.id)), p = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      w.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), y = (A) => {
      let re = A.target;
      u.value = "", d.value = Array.from(re.files || []).map((L) => ({
        fileName: L.name,
        filePath: bl(L),
        contentLength: L.size,
        contentType: L.type || ol(L.name)
      }));
    }, k = () => {
      var A;
      return (A = s.value) == null ? void 0 : A.click();
    }, F = (A) => A == null ? !1 : A.startsWith("data:") || A.startsWith("blob:"), j = v(() => {
      if (d.value.length > 0)
        return d.value[0].filePath;
      let A = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return A && It(n(A)) || null;
    }), se = (A) => !A || A.startsWith("data:") || A.endsWith(".svg") ? "" : "rounded-full object-cover";
    function T(A) {
      u.value = a(j.value);
    }
    return Et(Vn), (A, re) => (o(), i("div", {
      class: h(["flex", A.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", jc, [
        f.value ? (o(), i("label", {
          key: 0,
          for: A.id,
          class: h(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${A.labelClass ?? ""}`)
        }, O(f.value), 11, Oc)) : x("", !0),
        l("div", Dc, [
          l("span", Bc, O(A.help ?? f.value), 1),
          l("input", Ae({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: A.multiple,
            name: A.id,
            id: A.id,
            class: p.value,
            placeholder: m.value,
            "aria-invalid": w.value != null,
            "aria-describedby": `${A.id}-error`
          }, A.$attrs, { onChange: y }), null, 16, Pc),
          w.value ? (o(), i("div", Hc, Ec)) : x("", !0)
        ]),
        w.value ? (o(), i("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${A.id}-error`
        }, O(w.value), 9, zc)) : A.help ? (o(), i("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${A.id}-description`
        }, O(A.help), 9, Nc)) : x("", !0)
      ]),
      A.multiple ? (o(), i("div", Kc, [
        l("table", Zc, [
          (o(!0), i(Me, null, Ie(d.value, (L) => (o(), i("tr", null, [
            l("td", Wc, [
              l("div", {
                class: "flex w-full",
                title: F(L.filePath) ? "" : L.filePath
              }, [
                l("img", {
                  src: r[W(It)(L.filePath)] || W(n)(W(It)(L.filePath)),
                  class: h(["mr-2 h-8 w-8", se(L.filePath)]),
                  onError: (E) => r[W(It)(L.filePath)] = W(a)(W(It)(L.filePath))
                }, null, 42, Jc),
                F(L.filePath) ? (o(), i("span", Yc, O(L.fileName), 1)) : (o(), i("a", {
                  key: 0,
                  href: W(n)(L.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, O(L.fileName), 9, Xc))
              ], 8, Gc)
            ]),
            l("td", e0, [
              L.contentLength && L.contentLength > 0 ? (o(), i("span", t0, O(W(kl)(L.contentLength)), 1)) : x("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), i("div", Uc, [
        j.value ? (o(), i("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: F(j.value) ? "" : j.value
        }, [
          l("img", {
            onClick: k,
            class: h(["h-16 w-16", se(j.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: u.value || W(n)(j.value),
            onError: T
          }, null, 42, Qc)
        ], 8, qc)) : x("", !0)
      ]))
    ], 2));
  }
}), l0 = ["id"], n0 = ["for"], o0 = { class: "relative mt-1" }, a0 = ["id", "placeholder"], r0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-gray-400 dark:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
    "clip-rule": "evenodd"
  })
], -1), i0 = [
  r0
], u0 = ["id"], d0 = ["onMouseover", "onClick"], c0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
    "clip-rule": "evenodd"
  })
], -1), f0 = [
  c0
], v0 = {
  key: 2,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  tabindex: "-1"
}, p0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), m0 = [
  p0
], h0 = ["id"], g0 = ["id"], y0 = /* @__PURE__ */ ue({
  __name: "Autocomplete",
  props: {
    status: {},
    id: {},
    type: {},
    label: {},
    help: {},
    placeholder: {},
    multiple: { type: Boolean, default: !1 },
    required: { type: Boolean },
    options: { default: () => [] },
    modelValue: {},
    match: {},
    viewCount: { default: 100 },
    pageSize: { default: 8 }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = D(!1), a = e, r = s;
    t({ toggle: R });
    function u(V) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(V) >= 0;
    }
    const d = v(() => a.label ?? He(vt(a.id)));
    let c = Ze("ApiState", void 0);
    const f = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), m = v(() => [ft.base, f.value ? ft.invalid : ft.valid]), _ = D(null), w = D(""), p = D(null), y = D(a.viewCount), k = D([]), F = v(() => w.value ? a.options.filter((te) => a.match(te, w.value)).slice(0, y.value) : a.options), j = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function se(V) {
      p.value = V, k.value.indexOf(V) > Math.floor(y.value * 0.9) && (y.value += a.viewCount, Z());
    }
    const T = [",", `
`, "	"];
    function I(V) {
      var b;
      const te = (b = V.clipboardData) == null ? void 0 : b.getData("Text");
      A(te);
    }
    function A(V) {
      if (!V)
        return;
      const te = T.some((b) => V.includes(b));
      if (!a.multiple || !te) {
        const b = a.options.filter((N) => a.match(N, V));
        b.length == 1 && (Y(b[0]), n.value = !1, Cs());
      } else if (te) {
        const b = new RegExp("\\r|\\n|\\t|,"), z = V.split(b).filter((g) => g.trim()).map((g) => a.options.find((C) => a.match(C, g))).filter((g) => !!g);
        if (z.length > 0) {
          w.value = "", n.value = !1, p.value = null;
          let g = Array.from(a.modelValue || []);
          z.forEach((C) => {
            u(C) ? g = g.filter((ee) => ee != C) : g.push(C);
          }), r("update:modelValue", g), Cs();
        }
      }
    }
    function re(V) {
      j.indexOf(V.code) || X();
    }
    function L(V) {
      if (!(V.shiftKey || V.ctrlKey || V.altKey)) {
        if (!n.value) {
          V.code == "ArrowDown" && (n.value = !0, p.value = k.value[0]);
          return;
        }
        if (V.code == "Escape")
          n.value && (V.stopPropagation(), n.value = !1);
        else if (V.code == "Tab")
          n.value = !1;
        else if (V.code == "Home")
          p.value = k.value[0], q();
        else if (V.code == "End")
          p.value = k.value[k.value.length - 1], q();
        else if (V.code == "ArrowDown") {
          if (!p.value)
            p.value = k.value[0];
          else {
            const te = k.value.indexOf(p.value);
            p.value = te + 1 < k.value.length ? k.value[te + 1] : k.value[0];
          }
          ne();
        } else if (V.code == "ArrowUp") {
          if (!p.value)
            p.value = k.value[k.value.length - 1];
          else {
            const te = k.value.indexOf(p.value);
            p.value = te - 1 >= 0 ? k.value[te - 1] : k.value[k.value.length - 1];
          }
          ne();
        } else
          V.code == "Enter" && (p.value ? (Y(p.value), a.multiple || (V.preventDefault(), Cs())) : n.value = !1);
      }
    }
    const E = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function q() {
      setTimeout(() => {
        let V = Ms(`#${a.id}-autocomplete li.active`);
        V && V.scrollIntoView(E);
      }, 0);
    }
    function ne() {
      setTimeout(() => {
        let V = Ms(`#${a.id}-autocomplete li.active`);
        V && ("scrollIntoViewIfNeeded" in V ? V.scrollIntoViewIfNeeded(E) : V.scrollIntoView(E));
      }, 0);
    }
    function R(V) {
      var te;
      n.value = V, V && (X(), (te = _.value) == null || te.focus());
    }
    function X() {
      n.value = !0, Z();
    }
    function Y(V) {
      if (w.value = "", n.value = !1, a.multiple) {
        let te = Array.from(a.modelValue || []);
        u(V) ? te = te.filter((b) => b != V) : te.push(V), p.value = null, r("update:modelValue", te);
      } else {
        let te = V;
        a.modelValue == V && (te = null), r("update:modelValue", te);
      }
    }
    function Z() {
      k.value = F.value;
    }
    return Lt(w, Z), (V, te) => (o(), i("div", {
      id: `${V.id}-autocomplete`
    }, [
      d.value ? (o(), i("label", {
        key: 0,
        for: `${V.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, O(d.value), 9, n0)) : x("", !0),
      l("div", o0, [
        Bt(l("input", Ae({
          ref_key: "txtInput",
          ref: _,
          id: `${V.id}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autocomplete: "off",
          spellcheck: "false",
          "onUpdate:modelValue": te[0] || (te[0] = (b) => w.value = b),
          class: m.value,
          placeholder: V.multiple || !V.modelValue ? V.placeholder : "",
          onFocus: X,
          onKeydown: L,
          onKeyup: re,
          onClick: X,
          onPaste: I,
          required: !1
        }, V.$attrs), null, 16, a0), [
          [ko, w.value]
        ]),
        l("button", {
          type: "button",
          onClick: te[1] || (te[1] = (b) => R(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, i0),
        n.value ? (o(), i("ul", {
          key: 0,
          class: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: L,
          id: `${V.id}-options`,
          role: "listbox"
        }, [
          (o(!0), i(Me, null, Ie(k.value, (b) => (o(), i("li", {
            class: h([b === p.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (N) => se(b),
            onClick: (N) => Y(b),
            role: "option",
            tabindex: "-1"
          }, [
            U(V.$slots, "item", Xt(Ss(b))),
            u(b) ? (o(), i("span", {
              key: 0,
              class: h(["absolute inset-y-0 right-0 flex items-center pr-4", b === p.value ? "text-white" : "text-indigo-600"])
            }, f0, 2)) : x("", !0)
          ], 42, d0))), 256))
        ], 40, u0)) : !V.multiple && V.modelValue ? (o(), i("div", {
          key: 1,
          onKeydown: L,
          onClick: te[2] || (te[2] = (b) => R(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          U(V.$slots, "item", Xt(Ss(V.modelValue)))
        ], 32)) : x("", !0),
        f.value ? (o(), i("div", v0, m0)) : x("", !0)
      ]),
      f.value ? (o(), i("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${V.id}-error`
      }, O(f.value), 9, h0)) : V.help ? (o(), i("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${V.id}-description`
      }, O(V.help), 9, g0)) : x("", !0)
    ], 8, l0));
  }
}), b0 = ["id", "name", "value"], w0 = { class: "block truncate" }, k0 = /* @__PURE__ */ ue({
  __name: "Combobox",
  props: {
    id: {},
    modelValue: {},
    multiple: { type: Boolean },
    options: {},
    values: {},
    entries: {}
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e;
    t({
      toggle(p) {
        var y;
        (y = d.value) == null || y.toggle(p);
      }
    });
    const a = s;
    function r(p) {
      a("update:modelValue", p);
    }
    const u = v(() => n.multiple != null ? n.multiple : Array.isArray(n.modelValue)), d = D();
    function c(p, y) {
      return !y || p.value.toLowerCase().includes(y.toLowerCase());
    }
    const f = v(() => n.entries || (n.values ? n.values.map((p) => ({ key: p, value: p })) : n.options ? Object.keys(n.options).map((p) => ({ key: p, value: n.options[p] })) : [])), m = D(u.value ? [] : null);
    function _() {
      let p = n.modelValue && typeof n.modelValue == "object" ? n.modelValue.key : n.modelValue;
      p == null || p === "" ? m.value = u.value ? [] : null : typeof p == "string" ? m.value = f.value.find((y) => y.key === p) || null : Array.isArray(p) && (m.value = f.value.filter((y) => p.includes(y.key)));
    }
    ot(_);
    const w = v(() => m.value == null ? "" : Array.isArray(m.value) ? m.value.map((p) => encodeURIComponent(p.key)).join(",") : m.value.key);
    return (p, y) => {
      const k = Q("Autocomplete");
      return o(), i(Me, null, [
        l("input", {
          type: "hidden",
          id: p.id,
          name: p.id,
          value: w.value
        }, null, 8, b0),
        ge(k, Ae({
          ref_key: "input",
          ref: d,
          id: p.id,
          options: f.value,
          match: c,
          multiple: u.value
        }, p.$attrs, {
          modelValue: m.value,
          "onUpdate:modelValue": [
            y[0] || (y[0] = (F) => m.value = F),
            r
          ]
        }), {
          item: _e(({ key: F, value: j }) => [
            l("span", w0, O(j), 1)
          ]),
          _: 1
        }, 16, ["id", "options", "multiple", "modelValue"])
      ], 64);
    };
  }
}), _0 = /* @__PURE__ */ ue({
  __name: "DynamicInput",
  props: {
    input: {},
    modelValue: {},
    api: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.input.type || "text"), r = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), u = v(() => yt(s.input, r)), d = D(a.value === "file" ? null : s.modelValue[s.input.id]);
    Lt(d, () => {
      s.modelValue[s.input.id] = d.value, n("update:modelValue", s.modelValue);
    });
    const c = v(() => {
      const f = s.modelValue[s.input.id];
      if (s.input.type !== "file" || !f)
        return [];
      if (typeof f == "string")
        return [{ filePath: f, fileName: Pt(f, "/") }];
      if (!Array.isArray(f) && typeof f == "object")
        return f;
      if (Array.isArray(f)) {
        const m = [];
        return f.forEach((_) => {
          typeof _ == "string" ? m.push({ filePath: _, fileName: Pt(_, "/") }) : typeof _ == "object" && m.push(_);
        }), m;
      }
    });
    return (f, m) => {
      var T, I, A, re, L, E, q, ne, R, X, Y, Z, V, te, b, N, z, g, C, ee, G, oe, B, S, ce, de, ie, pe;
      const _ = Q("SelectInput"), w = Q("CheckboxInput"), p = Q("TagInput"), y = Q("Combobox"), k = Q("FileInput"), F = Q("TextareaInput"), j = Q("MarkdownInput"), se = Q("TextInput");
      return W(J).component(a.value) ? (o(), le(dn(W(J).component(a.value)), Ae({
        key: 0,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[0] || (m[0] = (M) => d.value = M),
        status: (T = f.api) == null ? void 0 : T.error,
        "input-class": (I = f.input.css) == null ? void 0 : I.input,
        "label-class": (A = f.input.css) == null ? void 0 : A.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), le(_, Ae({
        key: 1,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[1] || (m[1] = (M) => d.value = M),
        status: (re = f.api) == null ? void 0 : re.error,
        "input-class": (L = f.input.css) == null ? void 0 : L.input,
        "label-class": (E = f.input.css) == null ? void 0 : E.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), le(w, Ae({
        key: 2,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[2] || (m[2] = (M) => d.value = M),
        status: (q = f.api) == null ? void 0 : q.error,
        "input-class": (ne = f.input.css) == null ? void 0 : ne.input,
        "label-class": (R = f.input.css) == null ? void 0 : R.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), le(p, Ae({
        key: 3,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[3] || (m[3] = (M) => d.value = M),
        status: (X = f.api) == null ? void 0 : X.error,
        "input-class": (Y = f.input.css) == null ? void 0 : Y.input,
        "label-class": (Z = f.input.css) == null ? void 0 : Z.label,
        allowableValues: f.input.allowableValues,
        string: ((V = f.input.prop) == null ? void 0 : V.type) == "String"
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "allowableValues", "string"])) : a.value == "combobox" ? (o(), le(y, Ae({
        key: 4,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[4] || (m[4] = (M) => d.value = M),
        status: (te = f.api) == null ? void 0 : te.error,
        "input-class": (b = f.input.css) == null ? void 0 : b.input,
        "label-class": (N = f.input.css) == null ? void 0 : N.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "file" ? (o(), le(k, Ae({
        key: 5,
        id: f.input.id,
        status: (z = f.api) == null ? void 0 : z.error,
        modelValue: d.value,
        "onUpdate:modelValue": m[5] || (m[5] = (M) => d.value = M),
        "input-class": (g = f.input.css) == null ? void 0 : g.input,
        "label-class": (C = f.input.css) == null ? void 0 : C.label,
        files: c.value
      }, u.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), le(F, Ae({
        key: 6,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[6] || (m[6] = (M) => d.value = M),
        status: (ee = f.api) == null ? void 0 : ee.error,
        "input-class": (G = f.input.css) == null ? void 0 : G.input,
        "label-class": (oe = f.input.css) == null ? void 0 : oe.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), le(j, Ae({
        key: 7,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[7] || (m[7] = (M) => d.value = M),
        status: (B = f.api) == null ? void 0 : B.error,
        "input-class": (S = f.input.css) == null ? void 0 : S.input,
        "label-class": (ce = f.input.css) == null ? void 0 : ce.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), le(se, Ae({
        key: 8,
        type: a.value,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[8] || (m[8] = (M) => d.value = M),
        status: (de = f.api) == null ? void 0 : de.error,
        "input-class": (ie = f.input.css) == null ? void 0 : ie.input,
        "label-class": (pe = f.input.css) == null ? void 0 : pe.label
      }, u.value), null, 16, ["type", "id", "modelValue", "status", "input-class", "label-class"]));
    };
  }
}), $0 = { class: "lookup-field" }, C0 = ["name", "value"], x0 = {
  key: 0,
  class: "flex justify-between"
}, L0 = ["for"], V0 = {
  key: 0,
  class: "flex items-center"
}, S0 = { class: "text-sm text-gray-500 dark:text-gray-400 pr-1" }, M0 = /* @__PURE__ */ l("span", { class: "sr-only" }, "Clear", -1), A0 = /* @__PURE__ */ l("svg", {
  class: "h-4 w-4",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), F0 = [
  M0,
  A0
], T0 = {
  key: 1,
  class: "mt-1 relative"
}, I0 = { class: "w-full inline-flex truncate" }, j0 = { class: "text-blue-700 dark:text-blue-300 flex cursor-pointer" }, O0 = /* @__PURE__ */ l("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-gray-400 dark:text-gray-500",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
      "clip-rule": "evenodd"
    })
  ])
], -1), D0 = ["id"], B0 = ["id"], P0 = /* @__PURE__ */ ue({
  __name: "LookupInput",
  props: {
    id: {},
    status: {},
    input: {},
    metadataType: {},
    modelValue: {},
    label: {},
    labelClass: {},
    help: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const { config: s } = Nt(), { metadataApi: n } = dt(), a = e, r = t, u = v(() => a.id || a.input.id), d = v(() => a.label ?? He(vt(u.value)));
    let c = Ze("ApiState", void 0);
    const f = Ze("client"), m = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, u.value)), _ = D(""), w = D(""), p = v(() => ke(a.modelValue, u.value)), y = v(() => ut(a.metadataType).find((T) => T.name.toLowerCase() == u.value.toLowerCase())), k = v(() => {
      var T, I, A;
      return ((A = pt((I = (T = y.value) == null ? void 0 : T.ref) == null ? void 0 : I.model)) == null ? void 0 : A.icon) || s.value.tableIcon;
    });
    let F;
    function j(T) {
      if (T) {
        if (F == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        F.openModal({ name: "ModalLookup", ref: T }, (I) => {
          if (console.debug("openModal", _.value, " -> ", I, Zt.setRefValue(T, I), T), I) {
            const A = ke(I, T.refId);
            _.value = Zt.setRefValue(T, I) || A;
            const re = W(a.modelValue);
            re[u.value] = A, r("update:modelValue", re);
          }
        });
      }
    }
    function se() {
      a.modelValue[u.value] = null, _.value = "";
    }
    return ot(async () => {
      var q, ne;
      F = Ze("ModalProvider", void 0);
      const T = a.modelValue;
      a.modelValue[u.value] || (a.modelValue[u.value] = null);
      const I = y.value, A = I == null ? void 0 : I.ref;
      if (!A) {
        console.warn(`No RefInfo for property '${u.value}'`);
        return;
      }
      _.value = "";
      let re = A.selfId == null ? ke(T, I.name) : ke(T, A.selfId);
      const L = Jt(re);
      if (console.log("refIdValue", re, Jt(re), T, A), L && (re = ke(T, A.refId)), re == null)
        return;
      const E = (q = n.value) == null ? void 0 : q.operations.find((R) => {
        var X;
        return ((X = R.dataModel) == null ? void 0 : X.name) == A.model;
      });
      if (console.debug("LookupInput queryOp", E), E != null) {
        const R = ke(T, I.name);
        if (Jt(R))
          return;
        if (_.value = `${R}`, w.value = I.name, A.refLabel != null) {
          const X = ut(a.metadataType).filter((V) => V.type == A.model);
          X.length || console.warn(`Could not find ${A.model} Property on ${a.metadataType.name}`);
          const Y = X.map((V) => ke(T, V.name)).filter((V) => !!V), Z = Y.length <= 1 ? Y[0] : Y.find((V) => V[A.refId ?? "id"] == re);
          if (Z != null) {
            let V = ke(Z, A.refLabel);
            V && (_.value = `${V}`, Zt.setValue(A.model, re, A.refLabel, V));
          } else {
            const V = ((ne = I.attributes) == null ? void 0 : ne.some((b) => b.name == "Computed")) == !0;
            let te = await Zt.getOrFetchValue(f, n.value, A.model, A.refId, A.refLabel, V, re);
            _.value = te || `${A.model}: ${_.value}`;
          }
        }
      }
    }), (T, I) => {
      var re;
      const A = Q("Icon");
      return o(), i("div", $0, [
        l("input", {
          type: "hidden",
          name: u.value,
          value: p.value
        }, null, 8, C0),
        d.value ? (o(), i("div", x0, [
          l("label", {
            for: u.value,
            class: h(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${T.labelClass ?? ""}`)
          }, O(d.value), 11, L0),
          p.value ? (o(), i("div", V0, [
            l("span", S0, O(p.value), 1),
            l("button", {
              onClick: se,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, F0)
          ])) : x("", !0)
        ])) : x("", !0),
        (re = y.value) != null && re.ref ? (o(), i("div", T0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: I[0] || (I[0] = (L) => j(y.value.ref)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", I0, [
              l("span", j0, [
                ge(A, {
                  class: "mr-1 w-5 h-5",
                  image: k.value
                }, null, 8, ["image"]),
                l("span", null, O(_.value), 1)
              ])
            ]),
            O0
          ])
        ])) : x("", !0),
        m.value ? (o(), i("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${u.value}-error`
        }, O(m.value), 9, D0)) : T.help ? (o(), i("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${u.value}-description`
        }, O(T.help), 9, B0)) : x("", !0)
      ]);
    };
  }
}), H0 = /* @__PURE__ */ ue({
  __name: "AutoFormFields",
  props: {
    modelValue: {},
    type: {},
    metaType: {},
    api: {},
    formLayout: {},
    configureField: {},
    configureFormLayout: {},
    hideSummary: { type: Boolean },
    flexClass: { default: "flex flex-1 flex-col justify-between" },
    divideClass: { default: "divide-y divide-gray-200 px-4 sm:px-6" },
    spaceClass: { default: "space-y-6 pt-6 pb-5" },
    fieldsetClass: { default: "grid grid-cols-12 gap-6" }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s;
    t({ forceUpdate: r, props: n, updateValue: d });
    function r() {
      var I;
      const T = Pe();
      (I = T == null ? void 0 : T.proxy) == null || I.$forceUpdate();
    }
    function u(T, I) {
      d(T.id, ke(I, T.id));
    }
    function d(T, I) {
      n.modelValue[T] = I, a("update:modelValue", n.modelValue), r();
    }
    const { metadataApi: c, apiOf: f, typeOf: m, typeOfRef: _, createFormLayout: w, Crud: p } = dt(), y = v(() => n.type || zt(n.modelValue)), k = v(() => n.metaType ?? m(y.value)), F = v(() => {
      var T, I;
      return _((I = (T = c.value) == null ? void 0 : T.operations.find((A) => A.request.name == y.value)) == null ? void 0 : I.dataModel) || k.value;
    });
    function j() {
      const T = k.value;
      if (!T) {
        if (n.formLayout) {
          const q = n.formLayout.map((ne) => {
            const R = { name: ne.id, type: Ia(ne.type) }, X = Object.assign({ prop: R }, ne);
            return n.configureField && n.configureField(X), X;
          });
          return n.configureFormLayout && n.configureFormLayout(q), q;
        }
        throw new Error(`MetadataType for ${y.value} not found`);
      }
      const I = ut(T), A = F.value, re = n.formLayout ? Array.from(n.formLayout) : w(T), L = [], E = f(T.name);
      return re.forEach((q) => {
        var Y;
        const ne = I.find((Z) => Z.name == q.name);
        if (q.ignore)
          return;
        const R = ((Y = A == null ? void 0 : A.properties) == null ? void 0 : Y.find((Z) => {
          var V;
          return Z.name.toLowerCase() == ((V = q.name) == null ? void 0 : V.toLowerCase());
        })) ?? ne, X = Object.assign({ prop: R, op: E }, q);
        n.configureField && n.configureField(X), L.push(X);
      }), n.configureFormLayout && n.configureFormLayout(L), L;
    }
    const se = () => j().filter((T) => T.type != "hidden").map((T) => T.id);
    return (T, I) => {
      var E;
      const A = Q("ErrorSummary"), re = Q("LookupInput"), L = Q("DynamicInput");
      return o(), i(Me, null, [
        T.hideSummary ? x("", !0) : (o(), le(A, {
          key: 0,
          status: (E = T.api) == null ? void 0 : E.error,
          except: se()
        }, null, 8, ["status", "except"])),
        l("div", {
          class: h(T.flexClass)
        }, [
          l("div", {
            class: h(T.divideClass)
          }, [
            l("div", {
              class: h(T.spaceClass)
            }, [
              l("fieldset", {
                class: h(T.fieldsetClass)
              }, [
                (o(!0), i(Me, null, Ie(j(), (q) => {
                  var ne, R, X;
                  return o(), i("div", {
                    key: q.id,
                    class: h([
                      "w-full",
                      ((ne = q.css) == null ? void 0 : ne.field) ?? (q.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (q.type == "checkbox" ? " flex items-center" : "")),
                      q.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    ((R = q.prop) == null ? void 0 : R.ref) != null && q.type != "file" && !q.prop.isPrimaryKey ? (o(), le(re, {
                      key: 0,
                      metadataType: F.value,
                      input: q,
                      modelValue: T.modelValue,
                      "onUpdate:modelValue": (Y) => u(q, Y),
                      status: (X = T.api) == null ? void 0 : X.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), le(L, {
                      key: 1,
                      input: q,
                      modelValue: T.modelValue,
                      "onUpdate:modelValue": I[0] || (I[0] = (Y) => T.$emit("update:modelValue", Y)),
                      api: T.api
                    }, null, 8, ["input", "modelValue", "api"]))
                  ], 2);
                }), 128))
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 64);
    };
  }
});
function Us(e) {
  const t = D(!1), s = D(), n = D(), a = e ?? Ze("client");
  function r({ message: y, errorCode: k, fieldName: F, errors: j }) {
    return k || (k = "Exception"), j || (j = []), s.value = F ? new Gs({
      errorCode: k,
      message: y,
      errors: [new Yl({ fieldName: F, errorCode: k, message: y })]
    }) : new Gs({ errorCode: k, message: y, errors: j });
  }
  function u({ fieldName: y, message: k, errorCode: F }) {
    if (F || (F = "Exception"), !s.value)
      r({ fieldName: y, message: k, errorCode: F });
    else {
      let j = new Gs(s.value);
      j.errors = [
        ...(j.errors || []).filter((se) => {
          var T;
          return ((T = se.fieldName) == null ? void 0 : T.toLowerCase()) !== (y == null ? void 0 : y.toLowerCase());
        }),
        new Yl({ fieldName: y, message: k, errorCode: F })
      ], s.value = j;
    }
  }
  async function d(y, k, F) {
    t.value = !0;
    let j = await a.api(Kt(y), k, F);
    return t.value = !1, n.value = j.response, s.value = j.error, j;
  }
  async function c(y, k, F) {
    t.value = !0;
    let j = await a.apiVoid(Kt(y), k, F);
    return t.value = !1, n.value = j.response, s.value = j.error, j;
  }
  async function f(y, k, F, j) {
    t.value = !0;
    let se = await a.apiForm(Kt(y), k, F, j);
    return t.value = !1, n.value = se.response, s.value = se.error, se;
  }
  async function m(y, k, F, j) {
    t.value = !0;
    let se = await a.apiFormVoid(Kt(y), k, F, j);
    return t.value = !1, n.value = se.response, s.value = se.error, se;
  }
  async function _(y, k, F, j) {
    return wn(a, y, k, F, j);
  }
  function w(y, k) {
    const F = D(new nt()), j = kn(async (se) => {
      F.value = await a.api(se);
    }, k == null ? void 0 : k.delayMs);
    return Vs(async () => {
      const se = y(), T = hl(Ps(se));
      T && (F.value = new nt({ response: T })), (k == null ? void 0 : k.delayMs) === 0 ? F.value = await a.api(se) : j(se);
    }), (async () => F.value = await a.api(y(), k == null ? void 0 : k.args, k == null ? void 0 : k.method))(), F;
  }
  let p = { setError: r, addFieldError: u, loading: t, error: s, api: d, apiVoid: c, apiForm: f, apiFormVoid: m, swr: _, swrEffect: w, unRefs: Kt, setRef: yn };
  return fs("ApiState", p), p;
}
const R0 = { key: 0 }, E0 = { class: "text-red-700" }, z0 = /* @__PURE__ */ l("b", null, "type", -1), N0 = { key: 0 }, U0 = { key: 2 }, q0 = ["innerHTML"], Q0 = /* @__PURE__ */ l("input", {
  type: "submit",
  class: "hidden"
}, null, -1), K0 = { class: "flex justify-end" }, Z0 = /* @__PURE__ */ l("div", null, null, -1), W0 = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, G0 = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), J0 = { class: "fixed inset-0 overflow-hidden" }, X0 = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, Y0 = { class: "flex-1" }, ef = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, tf = { class: "flex items-start justify-between space-x-3" }, sf = { class: "space-y-1" }, lf = { key: 0 }, nf = { key: 2 }, of = ["innerHTML"], af = { class: "flex h-7 items-center" }, rf = { class: "flex justify-end" }, uf = /* @__PURE__ */ ue({
  __name: "AutoForm",
  props: {
    type: {},
    modelValue: {},
    heading: {},
    subHeading: {},
    showLoading: { type: Boolean, default: !0 },
    jsconfig: { default: "eccn,edv" },
    formStyle: { default: "card" },
    metaType: {},
    configureField: {},
    configureFormLayout: {},
    panelClass: {},
    bodyClass: {},
    formClass: {},
    innerFormClass: {},
    headerClass: { default: "p-6" },
    buttonsClass: {},
    headingClass: {},
    subHeadingClass: {},
    submitLabel: { default: "Submit" },
    allowSubmit: {}
  },
  emits: ["success", "error", "update:modelValue", "done"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, r = D(), u = D(1), d = D();
    function c() {
      var ce;
      u.value++, Y.value = X();
      const S = Pe();
      (ce = S == null ? void 0 : S.proxy) == null || ce.$forceUpdate();
    }
    async function f(S) {
      Object.assign(Y.value, S), c(), await Dt(() => null);
    }
    fs("ModalProvider", {
      openModal: p
    });
    const _ = D(), w = D();
    function p(S, ce) {
      _.value = S, w.value = ce;
    }
    async function y(S) {
      w.value && w.value(S), _.value = void 0, w.value = void 0;
    }
    const k = Us(), { getTypeName: F } = _n(), { typeOf: j, Crud: se, createDto: T } = dt(), I = D(new nt()), A = v(() => n.panelClass || ze.panelClass(n.formStyle)), re = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : Wt.formClass), L = v(() => n.headingClass || ze.headingClass(n.formStyle)), E = v(() => n.subHeadingClass || ze.subHeadingClass(n.formStyle)), q = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : ze.buttonsClass), ne = v(() => {
      var S;
      return n.type ? F(n.type) : (S = n.modelValue) != null && S.getTypeName ? n.modelValue.getTypeName() : null;
    }), R = v(() => n.metaType ?? j(ne.value)), X = () => n.modelValue || te(), Y = D(X()), Z = v(() => k.loading.value), V = v(() => {
      var S;
      return n.heading != null ? n.heading : ((S = R.value) == null ? void 0 : S.description) || He(ne.value);
    });
    t({ forceUpdate: c, props: n, setModel: f, formFields: r, submit: N, close: oe, model: Y });
    function te() {
      return typeof n.type == "string" ? T(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function b(S) {
      if (!S || S.tagName != "FORM") {
        console.error("Not a valid form", S);
        return;
      }
      const ce = te();
      let de = Xe(ce == null ? void 0 : ce.getMethod, (M) => typeof M == "function" ? M() : null) || "POST", ie = Xe(ce == null ? void 0 : ce.createResponse, (M) => typeof M == "function" ? M() : null) == null;
      const pe = n.jsconfig;
      if (vl.hasRequestBody(de)) {
        let M = new ce.constructor(), ve = new FormData(S);
        ie ? I.value = await k.apiFormVoid(M, ve, { jsconfig: pe }) : I.value = await k.apiForm(M, ve, { jsconfig: pe });
      } else {
        let M = new ce.constructor(Po(Y.value));
        console.debug("AutoForm.submit", M), ie ? I.value = await k.apiVoid(M, { jsconfig: pe }) : I.value = await k.api(M, { jsconfig: pe });
      }
      I.value.succeeded ? (a("success", I.value.response), oe()) : a("error", I.value.error);
    }
    async function N() {
      b(d.value);
    }
    function z(S) {
      a("update:modelValue", S);
    }
    function g() {
      a("done");
    }
    const C = D(!1), ee = D(""), G = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(C, () => {
      xt(G, ee, C.value), C.value || setTimeout(g, 700);
    }), C.value = !0;
    function oe() {
      n.formStyle == "slideOver" ? C.value = !1 : g();
    }
    const B = (S) => {
      S.key === "Escape" && oe();
    };
    return ot(() => window.addEventListener("keydown", B)), Et(() => window.removeEventListener("keydown", B)), (S, ce) => {
      var Ve, he, Oe, De, xe, Qe, Re, Be, We, tt, Ge;
      const de = Q("AutoFormFields"), ie = Q("FormLoading"), pe = Q("PrimaryButton"), M = Q("CloseButton"), ve = Q("SecondaryButton"), Ce = Q("ModalLookup");
      return o(), i("div", null, [
        R.value ? S.formStyle == "card" ? (o(), i("div", {
          key: 1,
          class: h(A.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: d,
            onSubmit: ce[0] || (ce[0] = qe((Fe) => b(Fe.target), ["prevent"])),
            autocomplete: "off",
            class: h(S.innerFormClass)
          }, [
            l("div", {
              class: h(S.bodyClass)
            }, [
              l("div", {
                class: h(S.headerClass)
              }, [
                S.$slots.heading ? (o(), i("div", N0, [
                  U(S.$slots, "heading")
                ])) : (o(), i("h3", {
                  key: 1,
                  class: h(L.value)
                }, O(V.value), 3)),
                S.$slots.subheading ? (o(), i("div", U0, [
                  U(S.$slots, "subheading")
                ])) : S.subHeading ? (o(), i("p", {
                  key: 3,
                  class: h(E.value)
                }, O(S.subHeading), 3)) : (Ve = R.value) != null && Ve.notes ? (o(), i("p", {
                  key: 4,
                  class: h(["notes", E.value]),
                  innerHTML: (he = R.value) == null ? void 0 : he.notes
                }, null, 10, q0)) : x("", !0)
              ], 2),
              U(S.$slots, "header", {
                instance: (Oe = Pe()) == null ? void 0 : Oe.exposed,
                model: Y.value
              }),
              Q0,
              (o(), le(de, {
                ref_key: "formFields",
                ref: r,
                key: u.value,
                type: S.type,
                modelValue: Y.value,
                "onUpdate:modelValue": z,
                api: I.value,
                configureField: S.configureField,
                configureFormLayout: S.configureFormLayout
              }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
              U(S.$slots, "footer", {
                instance: (De = Pe()) == null ? void 0 : De.exposed,
                model: Y.value
              })
            ], 2),
            U(S.$slots, "buttons", {}, () => {
              var Fe, st;
              return [
                l("div", {
                  class: h(q.value)
                }, [
                  l("div", null, [
                    U(S.$slots, "leftbuttons", {
                      instance: (Fe = Pe()) == null ? void 0 : Fe.exposed,
                      model: Y.value
                    })
                  ]),
                  l("div", null, [
                    S.showLoading && Z.value ? (o(), le(ie, { key: 0 })) : x("", !0)
                  ]),
                  l("div", K0, [
                    Z0,
                    ge(pe, {
                      disabled: S.allowSubmit ? !S.allowSubmit(Y.value) : !1
                    }, {
                      default: _e(() => [
                        we(O(S.submitLabel), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    U(S.$slots, "rightbuttons", {
                      instance: (st = Pe()) == null ? void 0 : st.exposed,
                      model: Y.value
                    })
                  ])
                ], 2)
              ];
            })
          ], 34)
        ], 2)) : (o(), i("div", W0, [
          G0,
          l("div", J0, [
            l("div", {
              onMousedown: oe,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: ce[2] || (ce[2] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: h(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ee.value])
                }, [
                  l("form", {
                    ref_key: "elForm",
                    ref: d,
                    class: h(re.value),
                    onSubmit: ce[1] || (ce[1] = qe((Fe) => b(Fe.target), ["prevent"]))
                  }, [
                    l("div", X0, [
                      l("div", Y0, [
                        l("div", ef, [
                          l("div", tf, [
                            l("div", sf, [
                              S.$slots.heading ? (o(), i("div", lf, [
                                U(S.$slots, "heading")
                              ])) : (o(), i("h3", {
                                key: 1,
                                class: h(L.value)
                              }, O(V.value), 3)),
                              S.$slots.subheading ? (o(), i("div", nf, [
                                U(S.$slots, "subheading")
                              ])) : S.subHeading ? (o(), i("p", {
                                key: 3,
                                class: h(E.value)
                              }, O(S.subHeading), 3)) : (xe = R.value) != null && xe.notes ? (o(), i("p", {
                                key: 4,
                                class: h(["notes", E.value]),
                                innerHTML: (Qe = R.value) == null ? void 0 : Qe.notes
                              }, null, 10, of)) : x("", !0)
                            ]),
                            l("div", af, [
                              ge(M, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: oe
                              })
                            ])
                          ])
                        ]),
                        U(S.$slots, "header", {
                          instance: (Re = Pe()) == null ? void 0 : Re.exposed,
                          model: Y.value
                        }),
                        (o(), le(de, {
                          ref_key: "formFields",
                          ref: r,
                          key: u.value,
                          type: S.type,
                          modelValue: Y.value,
                          "onUpdate:modelValue": z,
                          api: I.value,
                          configureField: S.configureField,
                          configureFormLayout: S.configureFormLayout
                        }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
                        U(S.$slots, "footer", {
                          instance: (Be = Pe()) == null ? void 0 : Be.exposed,
                          model: Y.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: h(q.value)
                    }, [
                      l("div", null, [
                        U(S.$slots, "leftbuttons", {
                          instance: (We = Pe()) == null ? void 0 : We.exposed,
                          model: Y.value
                        })
                      ]),
                      l("div", null, [
                        S.showLoading && Z.value ? (o(), le(ie, { key: 0 })) : x("", !0)
                      ]),
                      l("div", rf, [
                        ge(ve, {
                          onClick: oe,
                          disabled: Z.value
                        }, {
                          default: _e(() => [
                            we("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        ge(pe, {
                          class: "ml-4",
                          disabled: S.allowSubmit ? !S.allowSubmit(Y.value) : !1
                        }, {
                          default: _e(() => [
                            we(O(S.submitLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        U(S.$slots, "rightbuttons", {
                          instance: (tt = Pe()) == null ? void 0 : tt.exposed,
                          model: Y.value
                        })
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), i("div", R0, [
          l("p", E0, [
            we("Could not create form for unknown "),
            z0,
            we(" " + O(ne.value), 1)
          ])
        ])),
        ((Ge = _.value) == null ? void 0 : Ge.name) == "ModalLookup" && _.value.ref ? (o(), le(Ce, {
          key: 3,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: S.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ]);
    };
  }
}), df = { key: 0 }, cf = { class: "text-red-700" }, ff = /* @__PURE__ */ l("b", null, "type", -1), vf = { key: 0 }, pf = { key: 2 }, mf = ["innerHTML"], hf = { class: "flex justify-end" }, gf = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, yf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), bf = { class: "fixed inset-0 overflow-hidden" }, wf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, kf = { class: "flex-1" }, _f = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, $f = { class: "flex items-start justify-between space-x-3" }, Cf = { class: "space-y-1" }, xf = { key: 0 }, Lf = { key: 2 }, Vf = ["innerHTML"], Sf = { class: "flex h-7 items-center" }, Mf = { class: "flex justify-end" }, Af = /* @__PURE__ */ ue({
  __name: "AutoCreateForm",
  props: {
    type: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    buttonsClass: {},
    heading: {},
    subHeading: {},
    autosave: { type: Boolean, default: !0 },
    showLoading: { type: Boolean, default: !0 },
    showCancel: { type: Boolean, default: !0 },
    configureField: {},
    configureFormLayout: {}
  },
  emits: ["done", "save", "error"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, r = D(), u = D(1);
    function d() {
      var S, ce;
      u.value++, (S = r.value) == null || S.forceUpdate();
      const B = Pe();
      (ce = B == null ? void 0 : B.proxy) == null || ce.$forceUpdate();
    }
    function c(B) {
      Object.assign(L.value, B), d();
    }
    function f(B) {
    }
    fs("ModalProvider", {
      openModal: p
    });
    const _ = D(), w = D();
    function p(B, S) {
      _.value = B, w.value = S;
    }
    async function y(B) {
      w.value && w.value(B), _.value = void 0, w.value = void 0;
    }
    const { typeOf: k, typeProperties: F, Crud: j, createDto: se, formValues: T } = dt(), I = v(() => zt(n.type)), A = v(() => k(I.value)), L = D((() => typeof n.type == "string" ? se(n.type) : n.type ? new n.type() : null)());
    t({ forceUpdate: d, props: n, setModel: c, formFields: r, model: L });
    const E = v(() => n.panelClass || ze.panelClass(n.formStyle)), q = v(() => n.formClass || ze.formClass(n.formStyle)), ne = v(() => n.headingClass || ze.headingClass(n.formStyle)), R = v(() => n.subHeadingClass || ze.subHeadingClass(n.formStyle)), X = v(() => n.buttonsClass || ze.buttonsClass), Y = v(() => j.model(A.value)), Z = v(() => {
      var B;
      return n.heading || ((B = k(I.value)) == null ? void 0 : B.description) || (Y.value ? `New ${He(Y.value)}` : He(I.value));
    }), V = D(new nt());
    let te = Us(), b = v(() => te.loading.value);
    J.interceptors.has("AutoCreateForm.new") && J.interceptors.invoke("AutoCreateForm.new", { props: n, model: L });
    async function N(B) {
      var ie, pe;
      let S = B.target;
      if (!n.autosave) {
        a("save", new L.value.constructor(T(S, F(A.value))));
        return;
      }
      let ce = Xe((ie = L.value) == null ? void 0 : ie.getMethod, (M) => typeof M == "function" ? M() : null) || "POST", de = Xe((pe = L.value) == null ? void 0 : pe.createResponse, (M) => typeof M == "function" ? M() : null) == null;
      if (vl.hasRequestBody(ce)) {
        let M = new L.value.constructor(), ve = new FormData(S);
        de ? V.value = await te.apiFormVoid(M, ve, { jsconfig: "eccn" }) : V.value = await te.apiForm(M, ve, { jsconfig: "eccn" });
      } else {
        let M = T(S, F(A.value)), ve = new L.value.constructor(M);
        de ? V.value = await te.apiVoid(ve, { jsconfig: "eccn" }) : V.value = await te.api(ve, { jsconfig: "eccn" });
      }
      V.value.succeeded ? (S.reset(), a("save", V.value.response)) : a("error", V.value.error);
    }
    function z() {
      a("done");
    }
    const g = D(!1), C = D(""), ee = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(g, () => {
      xt(ee, C, g.value), g.value || setTimeout(z, 700);
    }), g.value = !0;
    function G() {
      n.formStyle == "slideOver" ? g.value = !1 : z();
    }
    const oe = (B) => {
      B.key === "Escape" && G();
    };
    return ot(() => window.addEventListener("keydown", oe)), Et(() => window.removeEventListener("keydown", oe)), (B, S) => {
      var Ce, Ve, he, Oe, De, xe, Qe, Re, Be;
      const ce = Q("AutoFormFields"), de = Q("FormLoading"), ie = Q("SecondaryButton"), pe = Q("PrimaryButton"), M = Q("CloseButton"), ve = Q("ModalLookup");
      return o(), i("div", null, [
        A.value ? B.formStyle == "card" ? (o(), i("div", {
          key: 1,
          class: h(E.value)
        }, [
          l("form", {
            onSubmit: qe(N, ["prevent"])
          }, [
            l("div", {
              class: h(q.value)
            }, [
              l("div", null, [
                B.$slots.heading ? (o(), i("div", vf, [
                  U(B.$slots, "heading")
                ])) : (o(), i("h3", {
                  key: 1,
                  class: h(ne.value)
                }, O(Z.value), 3)),
                B.$slots.subheading ? (o(), i("div", pf, [
                  U(B.$slots, "subheading")
                ])) : B.subHeading ? (o(), i("p", {
                  key: 3,
                  class: h(R.value)
                }, O(B.subHeading), 3)) : (Ce = A.value) != null && Ce.notes ? (o(), i("p", {
                  key: 4,
                  class: h(["notes", R.value]),
                  innerHTML: (Ve = A.value) == null ? void 0 : Ve.notes
                }, null, 10, mf)) : x("", !0)
              ]),
              U(B.$slots, "header", {
                formInstance: (he = Pe()) == null ? void 0 : he.exposed,
                model: L.value
              }),
              (o(), le(ce, {
                ref_key: "formFields",
                ref: r,
                key: u.value,
                modelValue: L.value,
                "onUpdate:modelValue": f,
                api: V.value,
                configureField: B.configureField,
                configureFormLayout: B.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(B.$slots, "footer", {
                formInstance: (Oe = Pe()) == null ? void 0 : Oe.exposed,
                model: L.value
              })
            ], 2),
            l("div", {
              class: h(X.value)
            }, [
              l("div", null, [
                B.showLoading && W(b) ? (o(), le(de, { key: 0 })) : x("", !0)
              ]),
              l("div", hf, [
                B.showCancel ? (o(), le(ie, {
                  key: 0,
                  onClick: G,
                  disabled: W(b)
                }, {
                  default: _e(() => [
                    we("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : x("", !0),
                ge(pe, {
                  type: "submit",
                  class: "ml-4",
                  disabled: W(b)
                }, {
                  default: _e(() => [
                    we("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), i("div", gf, [
          yf,
          l("div", bf, [
            l("div", {
              onMousedown: G,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: S[0] || (S[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: h(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", C.value])
                }, [
                  l("form", {
                    class: h(q.value),
                    onSubmit: qe(N, ["prevent"])
                  }, [
                    l("div", wf, [
                      l("div", kf, [
                        l("div", _f, [
                          l("div", $f, [
                            l("div", Cf, [
                              B.$slots.heading ? (o(), i("div", xf, [
                                U(B.$slots, "heading")
                              ])) : (o(), i("h3", {
                                key: 1,
                                class: h(ne.value)
                              }, O(Z.value), 3)),
                              B.$slots.subheading ? (o(), i("div", Lf, [
                                U(B.$slots, "subheading")
                              ])) : B.subHeading ? (o(), i("p", {
                                key: 3,
                                class: h(R.value)
                              }, O(B.subHeading), 3)) : (De = A.value) != null && De.notes ? (o(), i("p", {
                                key: 4,
                                class: h(["notes", R.value]),
                                innerHTML: (xe = A.value) == null ? void 0 : xe.notes
                              }, null, 10, Vf)) : x("", !0)
                            ]),
                            l("div", Sf, [
                              ge(M, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: G
                              })
                            ])
                          ])
                        ]),
                        U(B.$slots, "header", {
                          formInstance: (Qe = Pe()) == null ? void 0 : Qe.exposed,
                          model: L.value
                        }),
                        (o(), le(ce, {
                          ref_key: "formFields",
                          ref: r,
                          key: u.value,
                          modelValue: L.value,
                          "onUpdate:modelValue": f,
                          api: V.value,
                          configureField: B.configureField,
                          configureFormLayout: B.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
                        U(B.$slots, "footer", {
                          formInstance: (Re = Pe()) == null ? void 0 : Re.exposed,
                          model: L.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: h(X.value)
                    }, [
                      l("div", null, [
                        B.showLoading && W(b) ? (o(), le(de, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Mf, [
                        B.showCancel ? (o(), le(ie, {
                          key: 0,
                          onClick: G,
                          disabled: W(b)
                        }, {
                          default: _e(() => [
                            we("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : x("", !0),
                        ge(pe, {
                          type: "submit",
                          class: "ml-4",
                          disabled: W(b)
                        }, {
                          default: _e(() => [
                            we("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), i("div", df, [
          l("p", cf, [
            we("Could not create form for unknown "),
            ff,
            we(" " + O(I.value), 1)
          ])
        ])),
        ((Be = _.value) == null ? void 0 : Be.name) == "ModalLookup" && _.value.ref ? (o(), le(ve, {
          key: 3,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: B.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ]);
    };
  }
}), Ff = { key: 0 }, Tf = { class: "text-red-700" }, If = /* @__PURE__ */ l("b", null, "type", -1), jf = { key: 0 }, Of = { key: 2 }, Df = ["innerHTML"], Bf = { class: "flex justify-end" }, Pf = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Hf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), Rf = { class: "fixed inset-0 overflow-hidden" }, Ef = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, zf = { class: "flex-1" }, Nf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Uf = { class: "flex items-start justify-between space-x-3" }, qf = { class: "space-y-1" }, Qf = { key: 0 }, Kf = { key: 2 }, Zf = ["innerHTML"], Wf = { class: "flex h-7 items-center" }, Gf = { class: "flex justify-end" }, Jf = /* @__PURE__ */ ue({
  __name: "AutoEditForm",
  props: {
    modelValue: {},
    type: {},
    deleteType: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    heading: {},
    subHeading: {},
    autosave: { type: Boolean, default: !0 },
    showLoading: { type: Boolean, default: !0 },
    configureField: {},
    configureFormLayout: {}
  },
  emits: ["done", "save", "delete", "error"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, r = D(), u = D(1);
    function d() {
      var ve;
      u.value++, ne.value = q();
      const M = Pe();
      (ve = M == null ? void 0 : M.proxy) == null || ve.$forceUpdate();
    }
    function c(M) {
      Object.assign(ne.value, M);
    }
    function f(M) {
    }
    fs("ModalProvider", {
      openModal: p
    });
    const _ = D(), w = D();
    function p(M, ve) {
      _.value = M, w.value = ve;
    }
    async function y(M) {
      w.value && w.value(M), _.value = void 0, w.value = void 0;
    }
    const { typeOf: k, apiOf: F, typeProperties: j, createFormLayout: se, getPrimaryKey: T, Crud: I, createDto: A, formValues: re } = dt(), L = v(() => zt(n.type)), E = v(() => k(L.value)), q = () => typeof n.type == "string" ? A(n.type, Ls(n.modelValue)) : n.type ? new n.type(Ls(n.modelValue)) : null, ne = D(q());
    t({ forceUpdate: d, props: n, setModel: c, formFields: r, model: ne });
    const R = v(() => n.panelClass || ze.panelClass(n.formStyle)), X = v(() => n.formClass || ze.formClass(n.formStyle)), Y = v(() => n.headingClass || ze.headingClass(n.formStyle)), Z = v(() => n.subHeadingClass || ze.subHeadingClass(n.formStyle)), V = v(() => I.model(E.value)), te = v(() => {
      var M;
      return n.heading || ((M = k(L.value)) == null ? void 0 : M.description) || (V.value ? `Update ${He(V.value)}` : He(L.value));
    }), b = D(new nt());
    let N = Object.assign({}, Ls(n.modelValue));
    J.interceptors.has("AutoEditForm.new") && J.interceptors.invoke("AutoEditForm.new", { props: n, model: ne, origModel: N });
    let z = Us(), g = v(() => z.loading.value);
    const C = () => Xe(k(I.model(E.value)), (M) => T(M));
    function ee(M) {
      const { op: ve, prop: Ce } = M;
      ve && (I.isPatch(ve) || I.isUpdate(ve)) && (M.disabled = Ce == null ? void 0 : Ce.isPrimaryKey), n.configureField && n.configureField(M);
    }
    async function G(M) {
      var Oe, De;
      let ve = M.target;
      if (!n.autosave) {
        a("save", new ne.value.constructor(re(ve, j(E.value))));
        return;
      }
      let Ce = Xe((Oe = ne.value) == null ? void 0 : Oe.getMethod, (xe) => typeof xe == "function" ? xe() : null) || "POST", Ve = Xe((De = ne.value) == null ? void 0 : De.createResponse, (xe) => typeof xe == "function" ? xe() : null) == null, he = C();
      if (vl.hasRequestBody(Ce)) {
        let xe = new ne.value.constructor(), Qe = ke(n.modelValue, he.name), Re = new FormData(ve);
        he && !Array.from(Re.keys()).some((Ge) => Ge.toLowerCase() == he.name.toLowerCase()) && Re.append(he.name, Qe);
        let Be = [];
        const We = L.value && F(L.value);
        if (We && I.isPatch(We)) {
          let Ge = se(E.value), Fe = {};
          if (he && (Fe[he.name] = Qe), Ge.forEach((Ee) => {
            let at = Ee.id, H = ke(N, at);
            if (he && he.name.toLowerCase() === at.toLowerCase())
              return;
            let K = Re.get(at);
            J.interceptors.has("AutoEditForm.save.formLayout") && J.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: H, formLayout: Ge, input: Ee, newValue: K });
            let ye = K != null, je = Ee.type === "checkbox" ? ye !== !!H : Ee.type === "file" ? ye : K != H;
            !K && !H && (je = !1), je && (K ? Fe[at] = K : Ee.type !== "file" && Be.push(at));
          }), J.interceptors.has("AutoEditForm.save") && J.interceptors.invoke("AutoEditForm.save", { origModel: N, formLayout: Ge, dirtyValues: Fe }), Array.from(Re.keys()).filter((Ee) => !Fe[Ee]).forEach((Ee) => Re.delete(Ee)), Array.from(Re.keys()).filter((Ee) => Ee.toLowerCase() != he.name.toLowerCase()).length == 0 && Be.length == 0) {
            ie();
            return;
          }
        }
        const tt = Be.length > 0 ? { jsconfig: "eccn", reset: Be } : { jsconfig: "eccn" };
        Ve ? b.value = await z.apiFormVoid(xe, Re, tt) : b.value = await z.apiForm(xe, Re, tt);
      } else {
        let xe = re(ve, j(E.value));
        he && !ke(xe, he.name) && (xe[he.name] = ke(n.modelValue, he.name));
        let Qe = new ne.value.constructor(xe);
        Ve ? b.value = await z.apiVoid(Qe, { jsconfig: "eccn" }) : b.value = await z.api(Qe, { jsconfig: "eccn" });
      }
      b.value.succeeded ? (ve.reset(), a("save", b.value.response)) : a("error", b.value.error);
    }
    async function oe(M) {
      let ve = C();
      const Ce = ve ? ke(n.modelValue, ve.name) : null;
      if (!Ce) {
        console.error(`Could not find Primary Key for Type ${L.value} (${V.value})`);
        return;
      }
      const Ve = { [ve.name]: Ce }, he = typeof n.deleteType == "string" ? A(n.deleteType, Ve) : n.deleteType ? new n.deleteType(Ve) : null;
      Xe(he.createResponse, (De) => typeof De == "function" ? De() : null) == null ? b.value = await z.apiVoid(he) : b.value = await z.api(he), b.value.succeeded ? a("delete", b.value.response) : a("error", b.value.error);
    }
    function B() {
      a("done");
    }
    const S = D(!1), ce = D(""), de = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(S, () => {
      xt(de, ce, S.value), S.value || setTimeout(B, 700);
    }), S.value = !0;
    function ie() {
      n.formStyle == "slideOver" ? S.value = !1 : B();
    }
    const pe = (M) => {
      M.key === "Escape" && ie();
    };
    return ot(() => window.addEventListener("keydown", pe)), Et(() => window.removeEventListener("keydown", pe)), (M, ve) => {
      var Re, Be, We, tt, Ge, Fe, st, Ee, at;
      const Ce = Q("AutoFormFields"), Ve = Q("ConfirmDelete"), he = Q("FormLoading"), Oe = Q("SecondaryButton"), De = Q("PrimaryButton"), xe = Q("CloseButton"), Qe = Q("ModalLookup");
      return o(), i("div", null, [
        E.value ? M.formStyle == "card" ? (o(), i("div", {
          key: 1,
          class: h(R.value)
        }, [
          l("form", {
            onSubmit: qe(G, ["prevent"])
          }, [
            l("div", {
              class: h(X.value)
            }, [
              l("div", null, [
                M.$slots.heading ? (o(), i("div", jf, [
                  U(M.$slots, "heading")
                ])) : (o(), i("h3", {
                  key: 1,
                  class: h(Y.value)
                }, O(te.value), 3)),
                M.$slots.subheading ? (o(), i("div", Of, [
                  U(M.$slots, "subheading")
                ])) : M.subHeading ? (o(), i("p", {
                  key: 3,
                  class: h(Z.value)
                }, O(M.subHeading), 3)) : (Re = E.value) != null && Re.notes ? (o(), i("p", {
                  key: 4,
                  class: h(["notes", Z.value]),
                  innerHTML: (Be = E.value) == null ? void 0 : Be.notes
                }, null, 10, Df)) : x("", !0)
              ]),
              U(M.$slots, "header", {
                formInstance: (We = Pe()) == null ? void 0 : We.exposed,
                model: ne.value
              }),
              (o(), le(Ce, {
                ref_key: "formFields",
                ref: r,
                key: u.value,
                modelValue: ne.value,
                "onUpdate:modelValue": f,
                api: b.value,
                configureField: M.configureField,
                configureFormLayout: M.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(M.$slots, "footer", {
                formInstance: (tt = Pe()) == null ? void 0 : tt.exposed,
                model: ne.value
              })
            ], 2),
            l("div", {
              class: h(W(ze).buttonsClass)
            }, [
              l("div", null, [
                M.deleteType ? (o(), le(Ve, {
                  key: 0,
                  onDelete: oe
                })) : x("", !0)
              ]),
              l("div", null, [
                M.showLoading && W(g) ? (o(), le(he, { key: 0 })) : x("", !0)
              ]),
              l("div", Bf, [
                ge(Oe, {
                  onClick: ie,
                  disabled: W(g)
                }, {
                  default: _e(() => [
                    we("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                ge(De, {
                  type: "submit",
                  class: "ml-4",
                  disabled: W(g)
                }, {
                  default: _e(() => [
                    we("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), i("div", Pf, [
          Hf,
          l("div", Rf, [
            l("div", {
              onMousedown: ie,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: ve[0] || (ve[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: h(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ce.value])
                }, [
                  l("form", {
                    class: h(X.value),
                    onSubmit: qe(G, ["prevent"])
                  }, [
                    l("div", Ef, [
                      l("div", zf, [
                        l("div", Nf, [
                          l("div", Uf, [
                            l("div", qf, [
                              M.$slots.heading ? (o(), i("div", Qf, [
                                U(M.$slots, "heading")
                              ])) : (o(), i("h3", {
                                key: 1,
                                class: h(Y.value)
                              }, O(te.value), 3)),
                              M.$slots.subheading ? (o(), i("div", Kf, [
                                U(M.$slots, "subheading")
                              ])) : M.subHeading ? (o(), i("p", {
                                key: 3,
                                class: h(Z.value)
                              }, O(M.subHeading), 3)) : (Ge = E.value) != null && Ge.notes ? (o(), i("p", {
                                key: 4,
                                class: h(["notes", Z.value]),
                                innerHTML: (Fe = E.value) == null ? void 0 : Fe.notes
                              }, null, 10, Zf)) : x("", !0)
                            ]),
                            l("div", Wf, [
                              ge(xe, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: ie
                              })
                            ])
                          ])
                        ]),
                        U(M.$slots, "header", {
                          formInstance: (st = Pe()) == null ? void 0 : st.exposed,
                          model: ne.value
                        }),
                        (o(), le(Ce, {
                          ref_key: "formFields",
                          ref: r,
                          key: u.value,
                          modelValue: ne.value,
                          "onUpdate:modelValue": f,
                          api: b.value,
                          configureField: ee,
                          configureFormLayout: M.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        U(M.$slots, "footer", {
                          formInstance: (Ee = Pe()) == null ? void 0 : Ee.exposed,
                          model: ne.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: h(W(ze).buttonsClass)
                    }, [
                      l("div", null, [
                        M.deleteType ? (o(), le(Ve, {
                          key: 0,
                          onDelete: oe
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        M.showLoading && W(g) ? (o(), le(he, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Gf, [
                        ge(Oe, {
                          onClick: ie,
                          disabled: W(g)
                        }, {
                          default: _e(() => [
                            we("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        ge(De, {
                          type: "submit",
                          class: "ml-4",
                          disabled: W(g)
                        }, {
                          default: _e(() => [
                            we("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), i("div", Ff, [
          l("p", Tf, [
            we("Could not create form for unknown "),
            If,
            we(" " + O(L.value), 1)
          ])
        ])),
        ((at = _.value) == null ? void 0 : at.name) == "ModalLookup" && _.value.ref ? (o(), le(Qe, {
          key: 3,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: M.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ]);
    };
  }
}), Xf = { key: 0 }, Yf = { class: "text-red-700" }, ev = /* @__PURE__ */ l("b", null, "type", -1), tv = { key: 0 }, sv = { key: 2 }, lv = ["innerHTML"], nv = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, ov = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), av = { class: "fixed inset-0 overflow-hidden" }, rv = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, iv = { class: "flex-1" }, uv = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, dv = { class: "flex items-start justify-between space-x-3" }, cv = { class: "space-y-1" }, fv = { key: 0 }, vv = { key: 2 }, pv = ["innerHTML"], mv = { class: "flex h-7 items-center" }, hv = /* @__PURE__ */ ue({
  __name: "AutoViewForm",
  props: {
    model: {},
    apis: {},
    typeName: {},
    done: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    heading: {},
    subHeading: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = e, { typeOf: n } = dt(), a = v(() => s.typeName ?? s.apis.dataModel.name), r = v(() => n(a.value)), u = v(() => s.panelClass || ze.panelClass(s.formStyle)), d = v(() => s.formClass || ze.formClass(s.formStyle)), c = v(() => s.headingClass || ze.headingClass(s.formStyle)), f = v(() => s.subHeadingClass || ze.subHeadingClass(s.formStyle)), m = v(() => {
      var j, se;
      return s.heading || ((j = n(a.value)) == null ? void 0 : j.description) || ((se = s.model) != null && se.id ? `${He(a.value)} ${s.model.id}` : "View " + He(a.value));
    });
    J.interceptors.has("AutoViewForm.new") && J.interceptors.invoke("AutoViewForm.new", { props: s });
    function _() {
      s.done && s.done();
    }
    const w = D(!1), p = D(""), y = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(w, () => {
      xt(y, p, w.value), w.value || setTimeout(_, 700);
    }), w.value = !0;
    function k() {
      s.formStyle == "slideOver" ? w.value = !1 : _();
    }
    const F = (j) => {
      j.key === "Escape" && k();
    };
    return ot(() => window.addEventListener("keydown", F)), Et(() => window.removeEventListener("keydown", F)), (j, se) => {
      var A, re, L, E;
      const T = Q("MarkupModel"), I = Q("CloseButton");
      return o(), i("div", null, [
        a.value ? j.formStyle == "card" ? (o(), i("div", {
          key: 1,
          class: h(u.value)
        }, [
          l("div", {
            class: h(d.value)
          }, [
            l("div", null, [
              j.$slots.heading ? (o(), i("div", tv, [
                U(j.$slots, "heading")
              ])) : (o(), i("h3", {
                key: 1,
                class: h(c.value)
              }, O(m.value), 3)),
              j.$slots.subheading ? (o(), i("div", sv, [
                U(j.$slots, "subheading")
              ])) : j.subHeading ? (o(), i("p", {
                key: 3,
                class: h(f.value)
              }, O(j.subHeading), 3)) : (A = r.value) != null && A.notes ? (o(), i("p", {
                key: 4,
                class: h(["notes", f.value]),
                innerHTML: (re = r.value) == null ? void 0 : re.notes
              }, null, 10, lv)) : x("", !0)
            ]),
            ge(T, { value: j.model }, null, 8, ["value"])
          ], 2)
        ], 2)) : (o(), i("div", nv, [
          ov,
          l("div", av, [
            l("div", {
              onMousedown: k,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: se[0] || (se[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: h(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", p.value])
                }, [
                  l("div", {
                    class: h(d.value)
                  }, [
                    l("div", rv, [
                      l("div", iv, [
                        l("div", uv, [
                          l("div", dv, [
                            l("div", cv, [
                              j.$slots.heading ? (o(), i("div", fv, [
                                U(j.$slots, "heading")
                              ])) : (o(), i("h3", {
                                key: 1,
                                class: h(c.value)
                              }, O(m.value), 3)),
                              j.$slots.subheading ? (o(), i("div", vv, [
                                U(j.$slots, "subheading")
                              ])) : j.subHeading ? (o(), i("p", {
                                key: 3,
                                class: h(f.value)
                              }, O(j.subHeading), 3)) : (L = r.value) != null && L.notes ? (o(), i("p", {
                                key: 4,
                                class: h(["notes", f.value]),
                                innerHTML: (E = r.value) == null ? void 0 : E.notes
                              }, null, 10, pv)) : x("", !0)
                            ]),
                            l("div", mv, [
                              ge(I, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: k
                              })
                            ])
                          ])
                        ]),
                        ge(T, { value: j.model }, null, 8, ["value"])
                      ])
                    ])
                  ], 2)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), i("div", Xf, [
          l("p", Yf, [
            we("Could not create view for unknown "),
            ev,
            we(" " + O(a.value), 1)
          ])
        ]))
      ]);
    };
  }
}), gv = /* @__PURE__ */ l("label", {
  for: "confirmDelete",
  class: "ml-2 mr-2 select-none"
}, "confirm", -1), yv = /* @__PURE__ */ ue({
  __name: "ConfirmDelete",
  emits: ["delete"],
  setup(e, { emit: t }) {
    let s = D(!1);
    const n = t, a = () => {
      s.value && n("delete");
    }, r = v(() => [
      "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
      s.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"
    ]);
    return (u, d) => (o(), i(Me, null, [
      Bt(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": d[0] || (d[0] = (c) => rn(s) ? s.value = c : s = c)
      }, null, 512), [
        [cl, W(s)]
      ]),
      gv,
      l("span", Ae({
        onClick: qe(a, ["prevent"]),
        class: r.value
      }, u.$attrs), [
        U(u.$slots, "default", {}, () => [
          we("Delete")
        ])
      ], 16)
    ], 64));
  }
}), bv = {
  class: "flex",
  title: "loading..."
}, wv = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "24px",
  height: "30px",
  viewBox: "0 0 24 30"
}, kv = /* @__PURE__ */ Ts('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3), _v = [
  kv
], $v = { class: "ml-2 mt-1 text-gray-400" }, Cv = /* @__PURE__ */ ue({
  __name: "FormLoading",
  props: {
    icon: { type: Boolean, default: !0 },
    text: { default: "loading..." }
  },
  setup(e) {
    return Ze("ApiState", void 0), (t, s) => (o(), i("div", bv, [
      t.icon ? (o(), i("svg", wv, _v)) : x("", !0),
      l("span", $v, O(t.text), 1)
    ]));
  }
}), xv = ["onClick"], Lv = {
  key: 3,
  class: "flex justify-between items-center"
}, Vv = { class: "mr-1 select-none" }, Sv = ["onClick"], Mv = /* @__PURE__ */ ue({
  __name: "DataGrid",
  props: {
    items: { default: () => [] },
    id: { default: "DataGrid" },
    type: {},
    tableStyle: { default: "stripedRows" },
    selectedColumns: {},
    gridClass: {},
    grid2Class: {},
    grid3Class: {},
    grid4Class: {},
    tableClass: {},
    theadClass: {},
    tbodyClass: {},
    theadRowClass: {},
    theadCellClass: {},
    isSelected: {},
    headerTitle: {},
    headerTitles: {},
    visibleFrom: {},
    rowClass: {},
    rowStyle: {}
  },
  emits: ["headerSelected", "rowSelected"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = D(), r = D(null), u = (z) => r.value === z, d = Is(), c = (z) => Object.keys(d).find((g) => g.toLowerCase() == z.toLowerCase() + "-header"), f = (z) => Object.keys(d).find((g) => g.toLowerCase() == z.toLowerCase()), m = v(() => tl(s.items).filter((z) => !!(d[z] || d[z + "-header"]))), { typeOf: _, typeProperties: w } = dt(), p = v(() => zt(s.type)), y = v(() => _(p.value)), k = v(() => w(y.value));
    function F(z) {
      const g = s.headerTitles && ke(s.headerTitles, z) || z;
      return s.headerTitle ? s.headerTitle(g) : pn(g);
    }
    function j(z) {
      const g = z.toLowerCase();
      return k.value.find((C) => C.name.toLowerCase() == g);
    }
    function se(z) {
      const g = j(z);
      return g != null && g.format ? g.format : (g == null ? void 0 : g.type) == "TimeSpan" || (g == null ? void 0 : g.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const T = {
      xs: "xs:table-cell",
      sm: "sm:table-cell",
      md: "md:table-cell",
      lg: "lg:table-cell",
      xl: "xl:table-cell",
      "2xl": "2xl:table-cell",
      never: ""
    };
    function I(z) {
      const g = s.visibleFrom && ke(s.visibleFrom, z);
      return g && Xe(T[g], (C) => `hidden ${C}`);
    }
    const A = v(() => s.gridClass ?? me.getGridClass(s.tableStyle)), re = v(() => s.grid2Class ?? me.getGrid2Class(s.tableStyle)), L = v(() => s.grid3Class ?? me.getGrid3Class(s.tableStyle)), E = v(() => s.grid4Class ?? me.getGrid4Class(s.tableStyle)), q = v(() => s.tableClass ?? me.getTableClass(s.tableStyle)), ne = v(() => s.tbodyClass ?? me.getTbodyClass(s.tbodyClass)), R = v(() => s.theadClass ?? me.getTheadClass(s.tableStyle)), X = v(() => s.theadRowClass ?? me.getTheadRowClass(s.tableStyle)), Y = v(() => s.theadCellClass ?? me.getTheadCellClass(s.tableStyle));
    function Z(z, g) {
      return s.rowClass ? s.rowClass(z, g) : me.getTableRowClass(s.tableStyle, g, !!(s.isSelected && s.isSelected(z)), s.isSelected != null);
    }
    function V(z, g) {
      return s.rowStyle ? s.rowStyle(z, g) : void 0;
    }
    const te = v(() => {
      const z = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (m.value.length > 0 ? m.value : tl(s.items)), g = k.value.reduce((C, ee) => (C[ee.name.toLowerCase()] = ee.format, C), {});
      return z.filter((C) => {
        var ee;
        return ((ee = g[C.toLowerCase()]) == null ? void 0 : ee.method) != "hidden";
      });
    });
    function b(z, g) {
      n("headerSelected", g, z);
    }
    function N(z, g, C) {
      n("rowSelected", C, z);
    }
    return (z, g) => {
      const C = Q("CellFormat"), ee = Q("PreviewFormat");
      return z.items.length ? (o(), i("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: h(A.value)
      }, [
        l("div", {
          class: h(re.value)
        }, [
          l("div", {
            class: h(L.value)
          }, [
            l("div", {
              class: h(E.value)
            }, [
              l("table", {
                class: h(q.value)
              }, [
                l("thead", {
                  class: h(R.value)
                }, [
                  l("tr", {
                    class: h(X.value)
                  }, [
                    (o(!0), i(Me, null, Ie(te.value, (G) => (o(), i("td", {
                      class: h([I(G), Y.value, u(G) ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"])
                    }, [
                      l("div", {
                        onClick: (oe) => b(oe, G)
                      }, [
                        W(d)[G + "-header"] ? U(z.$slots, G + "-header", {
                          key: 0,
                          column: G
                        }) : c(G) ? U(z.$slots, c(G), {
                          key: 1,
                          column: G
                        }) : W(d).header ? U(z.$slots, "header", {
                          key: 2,
                          column: G,
                          label: F(G)
                        }) : (o(), i("div", Lv, [
                          l("span", Vv, O(F(G)), 1)
                        ]))
                      ], 8, xv)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: h(ne.value)
                }, [
                  (o(!0), i(Me, null, Ie(z.items, (G, oe) => (o(), i("tr", {
                    class: h(Z(G, oe)),
                    style: dl(V(G, oe)),
                    onClick: (B) => N(B, oe, G)
                  }, [
                    (o(!0), i(Me, null, Ie(te.value, (B) => (o(), i("td", {
                      class: h([I(B), W(me).tableCellClass])
                    }, [
                      W(d)[B] ? U(z.$slots, B, Xt(Ae({ key: 0 }, G))) : f(B) ? U(z.$slots, f(B), Xt(Ae({ key: 1 }, G))) : j(B) ? (o(), le(C, {
                        key: 2,
                        type: y.value,
                        propType: j(B),
                        modelValue: G
                      }, null, 8, ["type", "propType", "modelValue"])) : (o(), le(ee, {
                        key: 3,
                        value: W(ke)(G, B),
                        format: se(B)
                      }, null, 8, ["value", "format"]))
                    ], 2))), 256))
                  ], 14, Sv))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : x("", !0);
    };
  }
}), Av = ue({
  props: {
    type: Object,
    propType: Object,
    modelValue: Object
  },
  setup(e, { attrs: t }) {
    const { typeOf: s } = dt();
    function n(a) {
      return a != null && a.format ? a.format : (a == null ? void 0 : a.type) == "TimeSpan" || (a == null ? void 0 : a.type) == "TimeOnly" ? { method: "time" } : null;
    }
    return () => {
      var j;
      const a = n(e.propType), r = ke(e.modelValue, e.propType.name), u = Object.assign({}, e, t), d = Ft("span", { innerHTML: cs(r, a, u) }), c = Jt(r) && Array.isArray(r) ? Ft("span", {}, [
        Ft("span", { class: "mr-2" }, `${r.length}`),
        d
      ]) : d, f = (j = e.propType) == null ? void 0 : j.ref;
      if (!f)
        return c;
      const _ = ut(e.type).find((se) => se.type === f.model);
      if (!_)
        return c;
      const w = ke(e.modelValue, _.name), p = w && f.refLabel && ke(w, f.refLabel);
      if (!p)
        return c;
      const y = s(f.model), k = y == null ? void 0 : y.icon, F = k ? Ft(lo, { image: k, class: "w-5 h-5 mr-1" }) : null;
      return Ft("span", { class: "flex", title: `${f.model} ${r}` }, [
        F,
        p
      ]);
    };
  }
}), Fv = { key: 0 }, Tv = {
  key: 0,
  class: "mr-2"
}, Iv = ["innerHTML"], jv = ["innerHTML"], Ov = {
  inheritAttrs: !1
}, Dv = /* @__PURE__ */ ue({
  ...Ov,
  __name: "PreviewFormat",
  props: {
    value: {},
    format: {},
    includeIcon: { type: Boolean, default: !0 },
    includeCount: { type: Boolean, default: !0 },
    maxFieldLength: { default: 150 },
    maxNestedFields: { default: 2 },
    maxNestedFieldLength: { default: 30 }
  },
  setup(e) {
    const t = e, s = v(() => Array.isArray(t.value));
    return (n, a) => W(Jt)(n.value) ? (o(), i("span", Fv, [
      n.includeCount && s.value ? (o(), i("span", Tv, O(n.value.length), 1)) : x("", !0),
      l("span", {
        innerHTML: W(cs)(n.value, n.format, n.$attrs)
      }, null, 8, Iv)
    ])) : (o(), i("span", {
      key: 1,
      innerHTML: W(cs)(n.value, n.format, n.$attrs)
    }, null, 8, jv));
  }
}), Bv = ["innerHTML"], Pv = { key: 0 }, Hv = /* @__PURE__ */ l("b", null, null, -1), Rv = { key: 2 }, Ev = /* @__PURE__ */ ue({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Ht(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => pn(c), r = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, u = v(() => tl(t.value)), d = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const m = Q("HtmlFormat", !0);
      return o(), i("div", {
        class: h(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), i("div", {
          key: 0,
          innerHTML: W(cs)(c.value)
        }, null, 8, Bv)) : n.value ? (o(), i("div", {
          key: 1,
          class: h(c.classes("array", "div", c.depth, W(me).gridClass))
        }, [
          W(Ht)(c.value[0]) ? (o(), i("div", Pv, "[ " + O(c.value.join(", ")) + " ]", 1)) : (o(), i("div", {
            key: 1,
            class: h(c.classes("array", "div", c.depth, W(me).grid2Class))
          }, [
            l("div", {
              class: h(c.classes("array", "div", c.depth, W(me).grid3Class))
            }, [
              l("div", {
                class: h(c.classes("array", "div", c.depth, W(me).grid4Class))
              }, [
                l("table", {
                  class: h(c.classes("object", "table", c.depth, W(me).tableClass))
                }, [
                  l("thead", {
                    class: h(c.classes("array", "thead", c.depth, W(me).theadClass))
                  }, [
                    l("tr", null, [
                      (o(!0), i(Me, null, Ie(u.value, (_) => (o(), i("th", {
                        class: h(c.classes("array", "th", c.depth, W(me).theadCellClass + " whitespace-nowrap"))
                      }, [
                        Hv,
                        we(O(a(_)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), i(Me, null, Ie(c.value, (_, w) => (o(), i("tr", {
                      class: h(c.classes("array", "tr", c.depth, w % 2 == 0 ? "bg-white" : "bg-gray-50", w))
                    }, [
                      (o(!0), i(Me, null, Ie(u.value, (p) => (o(), i("td", {
                        class: h(c.classes("array", "td", c.depth, W(me).tableCellClass))
                      }, [
                        ge(m, Ae({
                          value: _[p],
                          "field-attrs": c.fieldAttrs,
                          depth: c.depth + 1,
                          classes: c.classes
                        }, r(p)), null, 16, ["value", "field-attrs", "depth", "classes"])
                      ], 2))), 256))
                    ], 2))), 256))
                  ])
                ], 2)
              ], 2)
            ], 2)
          ], 2))
        ], 2)) : (o(), i("div", Rv, [
          l("table", {
            class: h(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), i(Me, null, Ie(d(c.value), (_) => (o(), i("tr", {
              class: h(c.classes("object", "tr", c.depth, ""))
            }, [
              l("th", {
                class: h(c.classes("object", "th", c.depth, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"))
              }, O(_.key), 3),
              l("td", {
                class: h(c.classes("object", "td", c.depth, "align-top py-2 px-4 text-sm"))
              }, [
                ge(m, Ae({
                  value: _.val,
                  "field-attrs": c.fieldAttrs,
                  depth: c.depth + 1,
                  classes: c.classes
                }, r(_.key)), null, 16, ["value", "field-attrs", "depth", "classes"])
              ], 2)
            ], 2))), 256))
          ], 2)
        ]))
      ], 2);
    };
  }
}), zv = ["href"], Nv = ["href", "title"], Uv = /* @__PURE__ */ ue({
  __name: "MarkupFormat",
  props: {
    value: {},
    imageClass: { default: "w-8 h-8" }
  },
  setup(e) {
    const t = e, { getMimeType: s } = La(), n = t.value;
    let a = typeof t.value;
    const r = a === "string" && n.length ? s(n) : null;
    if (a === "string" && n.length) {
      const u = n.startsWith("https://") || n.startsWith("http://");
      (u || n[0] === "/") && (r != null && r.startsWith("image/")) ? a = "image" : u && (a = "link");
    }
    return (u, d) => {
      const c = Q("Icon"), f = Q("HtmlFormat");
      return W(a) == "link" ? (o(), i("a", {
        key: 0,
        href: u.value,
        class: "text-indigo-600"
      }, O(u.value), 9, zv)) : W(a) == "image" ? (o(), i("a", {
        key: 1,
        href: u.value,
        title: u.value,
        class: "inline-block"
      }, [
        ge(c, {
          src: u.value,
          class: h(u.imageClass)
        }, null, 8, ["src", "class"])
      ], 8, Nv)) : (o(), le(f, {
        key: 2,
        value: u.value
      }, null, 8, ["value"]));
    };
  }
}), qv = { class: "my-2 w-full" }, Qv = { class: "leading-7" }, Kv = { class: "px-2 text-left align-top" }, Zv = { colspan: "align-top" }, Wv = { class: "my-2 leading-7" }, Gv = {
  colspan: "2",
  class: "px-2 bg-indigo-700 text-white"
}, Jv = { class: "leading-7" }, Xv = {
  colspan: "2",
  class: "px-2 align-top"
}, Yv = /* @__PURE__ */ ue({
  __name: "MarkupModel",
  props: {
    value: {},
    imageClass: {}
  },
  setup(e) {
    const t = e, s = Object.keys(t.value), n = {}, a = {};
    return s.forEach((r) => {
      const u = t.value[r], d = typeof u;
      u == null || d === "function" || d === "symbol" ? n[r] = `(${u == null ? "null" : "t"})` : d === "object" ? a[r] = u : n[r] = u;
    }), (r, u) => {
      const d = Q("MarkupFormat");
      return o(), i("table", qv, [
        (o(), i(Me, null, Ie(n, (c, f) => l("tr", Qv, [
          l("th", Kv, O(W(He)(f)), 1),
          l("td", Zv, [
            ge(d, { value: c }, null, 8, ["value"])
          ])
        ])), 64)),
        (o(), i(Me, null, Ie(a, (c, f) => (o(), i(Me, null, [
          l("tr", Wv, [
            l("td", Gv, O(W(He)(f)), 1)
          ]),
          l("tr", Jv, [
            l("td", Xv, [
              ge(d, { value: c }, null, 8, ["value"])
            ])
          ])
        ], 64))), 64))
      ]);
    };
  }
}), ep = { class: "absolute top-0 right-0 pt-4 pr-4" }, tp = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), sp = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), lp = [
  tp,
  sp
], np = /* @__PURE__ */ ue({
  __name: "CloseButton",
  props: {
    buttonClass: { default: "bg-white dark:bg-black" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    return (s, n) => (o(), i("div", ep, [
      l("button", {
        type: "button",
        onClick: n[0] || (n[0] = (a) => s.$emit("close")),
        class: h([s.buttonClass, "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
      }, lp, 2)
    ]));
  }
}), op = ["id", "aria-labelledby"], ap = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), rp = { class: "fixed inset-0 overflow-hidden" }, ip = { class: "flex h-full flex-col bg-white dark:bg-black shadow-xl" }, up = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, dp = { class: "flex-1" }, cp = { class: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, fp = { class: "flex items-start justify-between space-x-3" }, vp = { class: "space-y-1" }, pp = { key: 0 }, mp = ["id"], hp = {
  key: 2,
  class: "text-sm text-gray-500"
}, gp = { class: "flex h-7 items-center" }, yp = {
  key: 0,
  class: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6"
}, bp = /* @__PURE__ */ ue({
  __name: "SlideOver",
  props: {
    id: { default: "SlideOver" },
    title: {},
    contentClass: { default: "relative mt-6 flex-1 px-4 sm:px-6" }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = D(!1), a = D(""), r = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(n, () => {
      xt(r, a, n.value), n.value || setTimeout(() => s("done"), 700);
    }), n.value = !0;
    const u = () => n.value = !1, d = (c) => {
      c.key === "Escape" && u();
    };
    return ot(() => window.addEventListener("keydown", d)), Et(() => window.removeEventListener("keydown", d)), (c, f) => {
      const m = Q("CloseButton");
      return o(), i("div", {
        id: c.id,
        class: "relative z-10",
        "aria-labelledby": c.id + "-title",
        role: "dialog",
        "aria-modal": "true"
      }, [
        ap,
        l("div", rp, [
          l("div", {
            onMousedown: u,
            class: "absolute inset-0 overflow-hidden"
          }, [
            l("div", {
              onMousedown: f[0] || (f[0] = qe(() => {
              }, ["stop"])),
              class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
            }, [
              l("div", {
                class: h(["panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", a.value])
              }, [
                l("div", ip, [
                  l("div", up, [
                    l("div", dp, [
                      l("div", cp, [
                        l("div", fp, [
                          l("div", vp, [
                            c.$slots.title ? (o(), i("div", pp, [
                              U(c.$slots, "title")
                            ])) : x("", !0),
                            c.title ? (o(), i("h2", {
                              key: 1,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, O(c.title), 9, mp)) : x("", !0),
                            c.$slots.subtitle ? (o(), i("p", hp, [
                              U(c.$slots, "subtitle")
                            ])) : x("", !0)
                          ]),
                          l("div", gp, [
                            ge(m, {
                              "button-class": "bg-gray-50 dark:bg-gray-900",
                              onClose: u
                            })
                          ])
                        ])
                      ]),
                      l("div", {
                        class: h(c.contentClass)
                      }, [
                        U(c.$slots, "default")
                      ], 2)
                    ])
                  ]),
                  c.$slots.footer ? (o(), i("div", yp, [
                    U(c.$slots, "footer")
                  ])) : x("", !0)
                ])
              ], 2)
            ], 32)
          ], 32)
        ])
      ], 8, op);
    };
  }
}), wp = ["id", "data-transition-for", "aria-labelledby"], kp = { class: "fixed inset-0 z-10 overflow-y-auto" }, _p = { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, $p = {
  key: 1,
  class: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10"
}, Cp = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), xp = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Lp = [
  Cp,
  xp
], Vp = /* @__PURE__ */ ue({
  __name: "ModalDialog",
  props: {
    id: { default: "ModalDialog" },
    modalClass: { default: ul.modalClass },
    sizeClass: { default: ul.sizeClass },
    closeButtonClass: { default: "bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black" },
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = Is(), n = t, a = D(!1), r = D(""), u = {
      entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
    }, d = D(""), c = {
      entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
    };
    Lt(a, () => {
      xt(u, r, a.value), xt(c, d, a.value), a.value || setTimeout(() => n("done"), 200);
    }), a.value = !0;
    const f = () => a.value = !1;
    fs("ModalProvider", {
      openModal: p
    });
    const _ = D(), w = D();
    function p(F, j) {
      _.value = F, w.value = j;
    }
    async function y(F) {
      w.value && w.value(F), _.value = void 0, w.value = void 0;
    }
    const k = (F) => {
      F.key === "Escape" && f();
    };
    return ot(() => window.addEventListener("keydown", k)), Et(() => window.removeEventListener("keydown", k)), (F, j) => {
      var T;
      const se = Q("ModalLookup");
      return o(), i("div", {
        id: F.id,
        "data-transition-for": F.id,
        onMousedown: f,
        class: "relative z-10",
        "aria-labelledby": `${F.id}-title`,
        role: "dialog",
        "aria-modal": "true"
      }, [
        l("div", {
          class: h(["fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", r.value])
        }, null, 2),
        l("div", kp, [
          l("div", _p, [
            l("div", {
              class: h([F.modalClass, F.sizeClass, d.value]),
              onMousedown: j[0] || (j[0] = qe(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                W(s).closebutton ? U(F.$slots, "createform", { key: 0 }) : (o(), i("div", $p, [
                  l("button", {
                    type: "button",
                    onClick: f,
                    class: h(F.closeButtonClass)
                  }, Lp, 2)
                ])),
                U(F.$slots, "default")
              ])
            ], 34),
            U(F.$slots, "bottom")
          ])
        ]),
        ((T = _.value) == null ? void 0 : T.name) == "ModalLookup" && _.value.ref ? (o(), le(se, {
          key: 0,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: F.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ], 40, wp);
    };
  }
}), Sp = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Mp = { class: "mt-3 pl-5 flex flex-wrap items-center" }, Ap = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, Fp = { class: "hidden md:inline" }, Tp = { class: "flex pb-1 sm:pb-0" }, Ip = ["title"], jp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("g", {
    "stroke-width": "1.5",
    fill: "none"
  }, [
    /* @__PURE__ */ l("path", {
      d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18",
      stroke: "currentColor"
    })
  ])
], -1), Op = [
  jp
], Dp = ["disabled"], Bp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), Pp = [
  Bp
], Hp = ["disabled"], Rp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), Ep = [
  Rp
], zp = ["disabled"], Np = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), Up = [
  Np
], qp = ["disabled"], Qp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Kp = [
  Qp
], Zp = {
  key: 0,
  class: "flex pb-1 sm:pb-0"
}, Wp = { class: "px-4 text-lg text-black dark:text-white" }, Gp = { key: 0 }, Jp = { key: 1 }, Xp = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Yp = { key: 2 }, em = {
  key: 1,
  class: "pl-2 mt-1"
}, tm = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), sm = { class: "whitespace-nowrap" }, lm = {
  key: 2,
  class: "pl-2"
}, nm = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), om = [
  nm
], am = { class: "flex pb-1 sm:pb-0" }, rm = {
  key: 0,
  class: "pl-2"
}, im = /* @__PURE__ */ l("svg", {
  class: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), um = { class: "mr-1" }, dm = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, cm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), fm = [
  cm
], vm = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, pm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), mm = [
  pm
], hm = { key: 1 }, gm = { key: 4 }, ym = { key: 0 }, bm = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, wm = { class: "mr-1 select-none" }, km = {
  key: 1,
  class: "flex justify-between items-center"
}, _m = { class: "mr-1 select-none" }, an = 25, $m = /* @__PURE__ */ ue({
  __name: "ModalLookup",
  props: {
    id: { default: "ModalLookup" },
    refInfo: {},
    skip: { default: 0 },
    prefs: {},
    selectedColumns: {},
    allowFiltering: { type: [Boolean, null], default: !0 },
    showPreferences: { type: [Boolean, null], default: !0 },
    showPagingNav: { type: [Boolean, null], default: !0 },
    showPagingInfo: { type: [Boolean, null], default: !0 },
    showResetPreferences: { type: [Boolean, null], default: !0 },
    showFiltersView: { type: [Boolean, null], default: !0 },
    toolbarButtonClass: {},
    canFilter: {},
    type: {},
    modelTitle: {},
    newButtonLabel: {},
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = Is(), { config: r } = Nt(), { metadataApi: u, filterDefinitions: d } = dt(), c = Ze("client"), f = r.value.storage, m = v(() => s.toolbarButtonClass ?? me.toolbarButtonClass), _ = v(() => d.value), w = D({ take: an }), p = D(new nt()), y = D(s.skip), k = D(!1), F = D(), j = (H) => typeof H == "string" ? H.split(",") : H || [];
    function se(H, K) {
      return me.getTableRowClass("fullWidth", K, !1, !0);
    }
    function T() {
      let H = j(s.selectedColumns);
      return H.length > 0 ? H : [];
    }
    const I = v(() => pt(s.refInfo.model)), A = v(() => {
      let K = T().map((je) => je.toLowerCase());
      const ye = ut(I.value);
      return K.length > 0 ? K.map((je) => ye.find((Ye) => Ye.name.toLowerCase() === je)).filter((je) => je != null) : ye;
    }), re = v(() => {
      let H = A.value.map((ye) => ye.name), K = j(w.value.selectedColumns).map((ye) => ye.toLowerCase());
      return K.length > 0 ? H.filter((ye) => K.includes(ye.toLowerCase())) : H;
    }), L = v(() => w.value.take ?? an), E = v(() => p.value.response ? ke(p.value.response, "results") : []), q = v(() => {
      var H;
      return ((H = p.value.response) == null ? void 0 : H.total) ?? E.value.length ?? 0;
    }), ne = v(() => y.value > 0), R = v(() => y.value > 0), X = v(() => E.value.length >= L.value), Y = v(() => E.value.length >= L.value), Z = D([]), V = v(() => Z.value.some((H) => H.settings.filters.length > 0 || !!H.settings.sort)), te = v(() => Z.value.map((H) => H.settings.filters.length).reduce((H, K) => H + K, 0)), b = v(() => ps(I.value)), N = v(() => {
      var H;
      return (H = u.value) == null ? void 0 : H.operations.find((K) => {
        var ye;
        return ((ye = K.dataModel) == null ? void 0 : ye.name) == s.refInfo.model && Ke.isAnyQuery(K);
      });
    }), z = D(), g = D(!1), C = D(), ee = v(() => zt(s.refInfo.model)), G = v(() => Rt.forType(ee.value, u.value)), oe = v(() => {
      var H;
      return ee.value || ((H = N.value) == null ? void 0 : H.dataModel.name);
    }), B = v(() => s.modelTitle || oe.value), S = v(() => s.newButtonLabel || `New ${B.value}`), ce = v(() => is(G.value.Create)), de = D(), ie = D(!1);
    function pe() {
      ie.value = !0;
    }
    function M() {
      ie.value = !1;
    }
    async function ve(H) {
      M(), n("done", H);
    }
    function Ce(H) {
      var K;
      de.value && (Object.assign((K = de.value) == null ? void 0 : K.model, H), console.log("setCreate", JSON.stringify(H, null, 2)), Ve());
    }
    function Ve() {
      var K, ye;
      (K = de.value) == null || K.forceUpdate();
      const H = Pe();
      (ye = H == null ? void 0 : H.proxy) == null || ye.$forceUpdate();
    }
    const he = () => `${s.id}/ApiPrefs/${s.refInfo.model}`, Oe = (H) => `Column/${s.id}:${s.refInfo.model}.${H}`;
    async function De(H) {
      y.value += H, y.value < 0 && (y.value = 0);
      var K = Math.floor(q.value / L.value) * L.value;
      y.value > K && (y.value = K), await Fe();
    }
    async function xe(H, K) {
      n("done", H);
    }
    function Qe() {
      n("done", null);
    }
    function Re(H, K) {
      var je, Ye, ct;
      let ye = K.target;
      if ((ye == null ? void 0 : ye.tagName) !== "TD") {
        let bt = (je = ye == null ? void 0 : ye.closest("TABLE")) == null ? void 0 : je.getBoundingClientRect(), $t = Z.value.find((Se) => Se.name.toLowerCase() == H.toLowerCase());
        if ($t && bt) {
          let Se = 318, Ut = (((Ye = K.target) == null ? void 0 : Ye.tagName) === "DIV" ? K.target : (ct = K.target) == null ? void 0 : ct.closest("DIV")).getBoundingClientRect(), qt = Se + 25;
          C.value = {
            column: $t,
            topLeft: {
              x: Math.max(Math.floor(Ut.x + 25), qt),
              y: Math.floor(115)
            }
          };
        }
      }
    }
    function Be() {
      C.value = null;
    }
    async function We(H) {
      var ye;
      let K = (ye = C.value) == null ? void 0 : ye.column;
      K && (K.settings = H, f.setItem(Oe(K.name), JSON.stringify(K.settings)), await Fe()), C.value = null;
    }
    async function tt(H) {
      f.setItem(Oe(H.name), JSON.stringify(H.settings)), await Fe();
    }
    async function Ge(H) {
      g.value = !1, w.value = H, f.setItem(he(), JSON.stringify(H)), await Fe();
    }
    async function Fe() {
      await st(Ee());
    }
    async function st(H) {
      const K = N.value;
      if (!K) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let ye = us(K, H), je = vn((bt) => {
        p.value.response = p.value.error = void 0, k.value = bt;
      }), Ye = await c.api(ye);
      je(), Dt(() => p.value = Ye);
      let ct = ke(Ye.response, "results") || [];
      !Ye.succeeded || ct.label == 0;
    }
    function Ee() {
      let H = {
        include: "total",
        take: L.value
      }, K = j(w.value.selectedColumns || s.selectedColumns);
      if (K.length > 0) {
        let je = b.value;
        je && K.includes(je.name) && (K = [je.name, ...K]), H.fields = K.join(",");
      }
      let ye = [];
      return Z.value.forEach((je) => {
        je.settings.sort && ye.push((je.settings.sort === "DESC" ? "-" : "") + je.name), je.settings.filters.forEach((Ye) => {
          let ct = Ye.key.replace("%", je.name);
          H[ct] = Ye.value;
        });
      }), typeof H.skip > "u" && y.value > 0 && (H.skip = y.value), ye.length > 0 && (H.orderBy = ye.join(",")), H;
    }
    async function at() {
      Z.value.forEach((H) => {
        H.settings = { filters: [] }, f.removeItem(Oe(H.name));
      }), await Fe();
    }
    return ot(async () => {
      const H = s.prefs || As(f.getItem(he()));
      H && (w.value = H), Z.value = A.value.map((K) => ({
        name: K.name,
        type: K.type,
        meta: K,
        settings: Object.assign(
          {
            filters: []
          },
          As(f.getItem(Oe(K.name)))
        )
      })), isNaN(s.skip) || (y.value = s.skip), await Fe();
    }), (H, K) => {
      const ye = Q("AutoCreateForm"), je = Q("ErrorSummary"), Ye = Q("Loading"), ct = Q("SettingsIcons"), bt = Q("DataGrid"), $t = Q("ModalDialog");
      return o(), i(Me, null, [
        H.refInfo ? (o(), le($t, {
          key: 0,
          ref_key: "modalDialog",
          ref: z,
          id: H.id,
          onDone: Qe
        }, {
          default: _e(() => [
            l("div", Sp, [
              l("div", Mp, [
                l("h3", Ap, [
                  we(" Select "),
                  l("span", Fp, O(W(He)(H.refInfo.model)), 1)
                ]),
                l("div", Tp, [
                  H.showPreferences ? (o(), i("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${H.refInfo.model} Preferences`,
                    onClick: K[0] || (K[0] = (Se) => g.value = !g.value)
                  }, Op, 8, Ip)) : x("", !0),
                  H.showPagingNav ? (o(), i("button", {
                    key: 1,
                    type: "button",
                    class: h(["pl-2", ne.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !ne.value,
                    onClick: K[1] || (K[1] = (Se) => De(-q.value))
                  }, Pp, 10, Dp)) : x("", !0),
                  H.showPagingNav ? (o(), i("button", {
                    key: 2,
                    type: "button",
                    class: h(["pl-2", R.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !R.value,
                    onClick: K[2] || (K[2] = (Se) => De(-L.value))
                  }, Ep, 10, Hp)) : x("", !0),
                  H.showPagingNav ? (o(), i("button", {
                    key: 3,
                    type: "button",
                    class: h(["pl-2", X.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !X.value,
                    onClick: K[3] || (K[3] = (Se) => De(L.value))
                  }, Up, 10, zp)) : x("", !0),
                  H.showPagingNav ? (o(), i("button", {
                    key: 4,
                    type: "button",
                    class: h(["pl-2", Y.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !Y.value,
                    onClick: K[4] || (K[4] = (Se) => De(q.value))
                  }, Kp, 10, qp)) : x("", !0)
                ]),
                H.showPagingInfo ? (o(), i("div", Zp, [
                  l("div", Wp, [
                    k.value ? (o(), i("span", Gp, "Querying...")) : x("", !0),
                    E.value.length ? (o(), i("span", Jp, [
                      Xp,
                      we(" " + O(y.value + 1) + " - " + O(Math.min(y.value + E.value.length, q.value)) + " ", 1),
                      l("span", null, " of " + O(q.value), 1)
                    ])) : p.value.completed ? (o(), i("span", Yp, "No Results")) : x("", !0)
                  ])
                ])) : x("", !0),
                G.value.Create && ce.value ? (o(), i("div", em, [
                  l("button", {
                    type: "button",
                    onClick: K[5] || (K[5] = (Se) => pe()),
                    title: "modelTitle",
                    class: h(W(me).toolbarButtonClass)
                  }, [
                    tm,
                    l("span", sm, O(S.value), 1)
                  ], 2),
                  ie.value ? (o(), le(ye, {
                    key: 0,
                    ref_key: "createForm",
                    ref: de,
                    type: G.value.Create.request.name,
                    configure: H.configureField,
                    onDone: M,
                    onSave: ve
                  }, {
                    header: _e(() => [
                      U(H.$slots, "formheader", {
                        form: "create",
                        formInstance: de.value,
                        apis: G.value,
                        type: oe.value,
                        updateModel: Ce
                      })
                    ]),
                    footer: _e(() => [
                      U(H.$slots, "formfooter", {
                        form: "create",
                        formInstance: de.value,
                        apis: G.value,
                        type: oe.value,
                        updateModel: Ce
                      })
                    ]),
                    _: 3
                  }, 8, ["type", "configure"])) : x("", !0)
                ])) : x("", !0),
                V.value && H.showResetPreferences ? (o(), i("div", lm, [
                  l("button", {
                    type: "button",
                    onClick: at,
                    title: "Reset Preferences & Filters",
                    class: h(m.value)
                  }, om, 2)
                ])) : x("", !0),
                l("div", am, [
                  H.showFiltersView && te.value > 0 ? (o(), i("div", rm, [
                    l("button", {
                      type: "button",
                      onClick: K[6] || (K[6] = (Se) => F.value = F.value == "filters" ? null : "filters"),
                      class: h(m.value),
                      "aria-expanded": "false"
                    }, [
                      im,
                      l("span", um, O(te.value) + " " + O(te.value == 1 ? "Filter" : "Filters"), 1),
                      F.value != "filters" ? (o(), i("svg", dm, fm)) : (o(), i("svg", vm, mm))
                    ], 2)
                  ])) : x("", !0)
                ])
              ]),
              F.value == "filters" ? (o(), le(Pl, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: _.value,
                columns: Z.value,
                onDone: K[7] || (K[7] = (Se) => F.value = null),
                onChange: tt
              }, null, 8, ["definitions", "columns"])) : x("", !0),
              C.value ? (o(), i("div", hm, [
                ge(Bl, {
                  definitions: _.value,
                  column: C.value.column,
                  "top-left": C.value.topLeft,
                  onDone: Be,
                  onSave: We
                }, null, 8, ["definitions", "column", "top-left"])
              ])) : x("", !0),
              p.value.error ? (o(), le(je, {
                key: 2,
                status: p.value.error
              }, null, 8, ["status"])) : k.value ? (o(), le(Ye, { key: 3 })) : (o(), i("div", gm, [
                E.value.length ? (o(), i("div", ym, [
                  ge(bt, {
                    id: H.id,
                    items: E.value,
                    type: H.refInfo.model,
                    "selected-columns": re.value,
                    onFiltersChanged: Fe,
                    tableStyle: "fullWidth",
                    rowClass: se,
                    onRowSelected: xe,
                    onHeaderSelected: Re
                  }, fl({
                    header: _e(({ column: Se, label: Vt }) => {
                      var Ut;
                      return [
                        H.allowFiltering && (!s.canFilter || s.canFilter(Se)) ? (o(), i("div", bm, [
                          l("span", wm, O(Vt), 1),
                          ge(ct, {
                            column: Z.value.find((qt) => qt.name.toLowerCase() === Se.toLowerCase()),
                            "is-open": ((Ut = C.value) == null ? void 0 : Ut.column.name) === Se
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), i("div", km, [
                          l("span", _m, O(Vt), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    Ie(Object.keys(W(a)), (Se) => ({
                      name: Se,
                      fn: _e((Vt) => [
                        U(H.$slots, Se, Xt(Ss(Vt)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : x("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : x("", !0),
        g.value ? (o(), le(Hl, {
          key: 1,
          columns: A.value,
          prefs: w.value,
          onDone: K[8] || (K[8] = (Se) => g.value = !1),
          onSave: Ge
        }, null, 8, ["columns", "prefs"])) : x("", !0)
      ], 64);
    };
  }
}), Cm = { class: "sm:hidden" }, xm = ["for"], Lm = ["id", "name"], Vm = ["value"], Sm = { class: "hidden sm:block" }, Mm = { class: "border-b border-gray-200" }, Am = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, Fm = ["onClick"], Tm = /* @__PURE__ */ ue({
  __name: "Tabs",
  props: {
    tabs: {},
    id: { default: "tabs" },
    param: { default: "tab" },
    label: { type: Function, default: (e) => He(e) },
    selected: {},
    tabClass: {},
    bodyClass: { default: "p-4" },
    url: { type: Boolean, default: !0 },
    clearQuery: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, s = v(() => Object.keys(t.tabs)), n = (m) => t.label ? t.label(m) : He(m), a = v(() => t.id || "tabs"), r = v(() => t.param || "tab"), u = D();
    function d(m) {
      if (u.value = m, t.url) {
        const _ = s.value[0];
        pl({ tab: m === _ ? void 0 : m }, t.clearQuery);
      }
    }
    function c(m) {
      return u.value === m;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return ot(() => {
      if (u.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const m = location.search ? location.search : location.hash.includes("?") ? "?" + $s(location.hash, "?") : "", w = el(m)[r.value];
        w && (u.value = w);
      }
    }), (m, _) => (o(), i("div", null, [
      l("div", Cm, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, xm),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: _[0] || (_[0] = (w) => {
            var p;
            return d((p = w.target) == null ? void 0 : p.value);
          })
        }, [
          (o(!0), i(Me, null, Ie(s.value, (w) => (o(), i("option", {
            key: w,
            value: w
          }, O(n(w)), 9, Vm))), 128))
        ], 40, Lm)
      ]),
      l("div", Sm, [
        l("div", Mm, [
          l("nav", Am, [
            (o(!0), i(Me, null, Ie(s.value, (w) => (o(), i("a", {
              href: "#",
              onClick: qe((p) => d(w), ["prevent"]),
              style: dl({ width: f.value }),
              class: h([c(w) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", m.tabClass])
            }, O(n(w)), 15, Fm))), 256))
          ])
        ])
      ]),
      l("div", {
        class: h(m.bodyClass)
      }, [
        (o(), le(dn(m.tabs[u.value])))
      ], 2)
    ]));
  }
}), Im = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-gray-400",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
  })
], -1), jm = [
  Im
], Om = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-indigo-600",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
  })
], -1), Dm = [
  Om
], Bm = /* @__PURE__ */ ue({
  __name: "DarkModeToggle",
  setup(e) {
    const t = typeof document < "u" ? document.documentElement : null, s = () => !!(t != null && t.classList.contains("dark")), n = D(localStorage.getItem("color-scheme") == "dark");
    function a() {
      s() ? t == null || t.classList.remove("dark") : t == null || t.classList.add("dark"), n.value = s(), localStorage.setItem("color-scheme", n.value ? "dark" : "light");
    }
    return (r, u) => (o(), i("button", {
      type: "button",
      class: "bg-gray-200 dark:bg-gray-700 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
      role: "switch",
      "aria-checked": "false",
      onClick: u[0] || (u[0] = (d) => a())
    }, [
      l("span", {
        class: h(`${n.value ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`)
      }, [
        l("span", {
          class: h(`${n.value ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, jm, 2),
        l("span", {
          class: h(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Dm, 2)
      ], 2)
    ]));
  }
}), Pm = { key: 0 }, Hm = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, Rm = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, Em = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900" }, zm = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600"
}, Nm = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, Um = ["onClick"], qm = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, Qm = { class: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" }, Km = { class: "mt-8" }, Zm = {
  key: 1,
  class: "mt-6"
}, Wm = /* @__PURE__ */ Ts('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500"> Or continue with </span></div></div>', 1), Gm = { class: "mt-6 grid grid-cols-3 gap-3" }, Jm = ["href", "title"], Xm = {
  key: 1,
  class: "h-5 w-5 text-gray-700",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, Ym = /* @__PURE__ */ l("path", {
  d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z",
  fill: "currentColor"
}, null, -1), e1 = /* @__PURE__ */ l("path", {
  d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z",
  fill: "currentColor"
}, null, -1), t1 = [
  Ym,
  e1
], s1 = /* @__PURE__ */ ue({
  __name: "SignIn",
  props: {
    provider: {},
    title: { default: "Sign In" },
    tabs: { type: [Boolean, String], default: !0 },
    oauth: { type: [Boolean, String], default: !0 }
  },
  emits: ["login"],
  setup(e, { emit: t }) {
    const s = e, n = t, { getMetadata: a, createDto: r } = dt(), u = Us(), d = Ze("client"), { signIn: c } = Dl(), f = a({ assert: !0 }), m = f.plugins.auth, _ = document.baseURI, w = f.app.baseUrl, p = D(r("Authenticate")), y = D(new nt()), k = D(s.provider);
    ot(() => {
      m == null || m.authProviders.map((R) => R.formLayout).filter((R) => R).forEach((R) => R.forEach(
        (X) => p.value[X.id] = X.type === "checkbox" ? !1 : ""
      ));
    });
    const F = v(() => (m == null ? void 0 : m.authProviders.filter((R) => R.formLayout)) || []), j = v(() => F.value[0] || {}), se = v(() => F.value[Math.max(F.value.length - 1, 0)] || {}), T = v(() => (k.value ? m == null ? void 0 : m.authProviders.find((R) => R.name === k.value) : null) ?? j.value), I = (R) => R === !1 || R === "false";
    function A(R) {
      return R.label || R.navItem && R.navItem.label;
    }
    const re = v(() => {
      var R;
      return (((R = T.value) == null ? void 0 : R.formLayout) || []).map((X) => {
        var Y, Z;
        return Object.assign({}, X, {
          type: (Y = X.type) == null ? void 0 : Y.toLowerCase(),
          autocomplete: X.autocomplete || (((Z = X.type) == null ? void 0 : Z.toLowerCase()) === "password" ? "current-password" : void 0) || (X.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, X.css)
        });
      });
    }), L = v(() => I(s.oauth) ? [] : (m == null ? void 0 : m.authProviders.filter((R) => R.type === "oauth")) || []), E = v(() => {
      let R = Ho(
        m == null ? void 0 : m.authProviders.filter((Y) => Y.formLayout && Y.formLayout.length > 0),
        (Y, Z) => {
          let V = A(Z) || vt(Z.name);
          Y[V] = Z.name === j.value.name ? "" : Z.name;
        }
      );
      const X = T.value;
      return X && I(s.tabs) && (R = { [A(X) || vt(X.name)]: X }), R;
    }), q = v(() => {
      let R = re.value.map((X) => X.id).filter((X) => X);
      return y.value.summaryMessage(R);
    });
    async function ne() {
      if (p.value.provider = T.value.name, T.value.name === "authsecret" ? (d.headers.set("authsecret", p.value.authsecret), p.value = r("Authenticate")) : T.value.name === "basic" ? (d.setCredentials(p.value.UserName, p.value.Password), p.value = r("Authenticate"), p.value.UserName = null, p.value.Password = null) : (T.value.type === "Bearer" || T.value.name === "jwt") && (d.bearerToken = p.value.BearerToken, p.value = r("Authenticate")), y.value = await u.api(p.value), y.value.succeeded) {
        const R = y.value.response;
        c(R), n("login", R), y.value = new nt(), p.value = r("Authenticate");
      }
    }
    return (R, X) => {
      const Y = Q("ErrorSummary"), Z = Q("AutoFormFields"), V = Q("PrimaryButton"), te = Q("Icon"), b = _o("href");
      return W(m) ? (o(), i("div", Hm, [
        l("div", Rm, [
          l("h2", Em, O(R.title), 1),
          Object.keys(E.value).length > 1 ? (o(), i("p", zm, [
            l("span", Nm, [
              (o(!0), i(Me, null, Ie(E.value, (N, z) => Bt((o(), i("a", {
                onClick: (g) => k.value = N,
                class: h([
                  N === "" || N === j.value.name ? "rounded-l-md" : N === se.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  k.value === N ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                ])
              }, [
                we(O(z), 1)
              ], 10, Um)), [
                [b, { provider: N }]
              ])), 256))
            ])
          ])) : x("", !0)
        ]),
        l("div", qm, [
          q.value ? (o(), le(Y, {
            key: 0,
            class: "mb-3",
            errorSummary: q.value
          }, null, 8, ["errorSummary"])) : x("", !0),
          l("div", Qm, [
            re.value.length ? (o(), i("form", {
              key: 0,
              onSubmit: qe(ne, ["prevent"])
            }, [
              ge(Z, {
                modelValue: p.value,
                formLayout: re.value,
                api: y.value,
                hideSummary: !0,
                "divide-class": "",
                "space-class": "space-y-6"
              }, null, 8, ["modelValue", "formLayout", "api"]),
              l("div", Km, [
                ge(V, { class: "w-full" }, {
                  default: _e(() => [
                    we("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : x("", !0),
            L.value.length ? (o(), i("div", Zm, [
              Wm,
              l("div", Gm, [
                (o(!0), i(Me, null, Ie(L.value, (N) => (o(), i("div", null, [
                  l("a", {
                    href: W(w) + N.navItem.href + "?continue=" + W(_),
                    title: A(N),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  }, [
                    N.icon ? (o(), le(te, {
                      key: 0,
                      image: N.icon,
                      class: "h-5 w-5 text-gray-700"
                    }, null, 8, ["image"])) : (o(), i("svg", Xm, t1))
                  ], 8, Jm)
                ]))), 256))
              ])
            ])) : x("", !0)
          ])
        ])
      ])) : (o(), i("div", Pm, "No Auth Plugin"));
    };
  }
}), l1 = ["for"], n1 = {
  key: 1,
  class: "border border-gray-200 flex justify-between"
}, o1 = { class: "p-2 flex flex-wrap gap-x-4" }, a1 = /* @__PURE__ */ l("title", null, "Bold text (CTRL+B)", -1), r1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}, null, -1), i1 = [
  a1,
  r1
], u1 = /* @__PURE__ */ l("title", null, "Italics (CTRL+I)", -1), d1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}, null, -1), c1 = [
  u1,
  d1
], f1 = /* @__PURE__ */ l("title", null, "Insert Link (CTRL+K)", -1), v1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"
}, null, -1), p1 = [
  f1,
  v1
], m1 = /* @__PURE__ */ l("title", null, "Blockquote (CTRL+Q)", -1), h1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z"
}, null, -1), g1 = [
  m1,
  h1
], y1 = /* @__PURE__ */ l("title", null, "Insert Image (CTRL+SHIFT+L)", -1), b1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
}, null, -1), w1 = [
  y1,
  b1
], k1 = /* @__PURE__ */ l("title", null, "Insert Code (CTRL+<)", -1), _1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
}, null, -1), $1 = [
  k1,
  _1
], C1 = /* @__PURE__ */ l("title", null, "H2 Heading (CTRL+H)", -1), x1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z"
}, null, -1), L1 = [
  C1,
  x1
], V1 = /* @__PURE__ */ l("title", null, "Numbered List (ALT+1)", -1), S1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z"
}, null, -1), M1 = [
  V1,
  S1
], A1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), F1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), T1 = [
  A1,
  F1
], I1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), j1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), O1 = [
  I1,
  j1
], D1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), B1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), P1 = [
  D1,
  B1
], H1 = /* @__PURE__ */ l("title", null, "Redo (CTRL+SHIFT+Z)", -1), R1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
}, null, -1), E1 = [
  H1,
  R1
], z1 = {
  key: 0,
  class: "p-2 flex flex-wrap gap-x-4"
}, N1 = ["href"], U1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z"
}, null, -1), q1 = [
  U1
], Q1 = { class: "" }, K1 = ["name", "id", "label", "value", "rows", "disabled"], Z1 = ["id"], W1 = ["id"], lt = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", G1 = /* @__PURE__ */ ue({
  __name: "MarkdownInput",
  props: {
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {},
    counter: { type: Boolean },
    rows: {},
    errorMessages: {},
    lang: {},
    autoFocus: { type: Boolean },
    disabled: { type: Boolean },
    helpUrl: { default: "https://guides.github.com/features/mastering-markdown/" },
    hide: {}
  },
  emits: ["update:modelValue", "close"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s;
    let r = [], u = [], d = Ze("ApiState", void 0);
    const c = v(() => _t.call({ responseStatus: n.status ?? (d == null ? void 0 : d.error.value) }, n.id)), f = v(() => n.label ?? He(vt(n.id))), m = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), _ = v(() => n.hide ? Ot(m, n.hide) : Ot(m, []));
    function w(g) {
      return _.value[g];
    }
    const p = v(() => ["shadow-sm font-mono" + ft.base.replace("rounded-md", ""), c.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid, n.inputClass]), y = D();
    t({ props: n, textarea: y, updateModelValue: k, selection: j, hasSelection: F, selectionInfo: se, insert: I, replace: T });
    function k(g) {
      a("update:modelValue", g);
    }
    function F() {
      return y.value.selectionStart !== y.value.selectionEnd;
    }
    function j() {
      const g = y.value;
      return g.value.substring(g.selectionStart, g.selectionEnd) || "";
    }
    function se() {
      const g = y.value, C = g.value, ee = g.selectionStart, G = C.substring(ee, g.selectionEnd) || "", oe = C.substring(0, ee), B = oe.lastIndexOf(`
`);
      return {
        value: C,
        sel: G,
        selPos: ee,
        beforeSel: oe,
        afterSel: C.substring(ee),
        prevCRPos: B,
        beforeCR: B >= 0 ? oe.substring(0, B + 1) : "",
        afterCR: B >= 0 ? oe.substring(B + 1) : ""
      };
    }
    function T({ value: g, selectionStart: C, selectionEnd: ee }) {
      ee == null && (ee = C), k(g), Dt(() => {
        y.value.focus(), y.value.setSelectionRange(C, ee);
      });
    }
    function I(g, C, ee = "", { selectionAtEnd: G, offsetStart: oe, offsetEnd: B, filterValue: S, filterSelection: ce } = {}) {
      const de = y.value;
      let ie = de.value, pe = de.selectionEnd;
      r.push({ value: ie, selectionStart: de.selectionStart, selectionEnd: de.selectionEnd }), u = [];
      const M = de.selectionStart, ve = de.selectionEnd;
      let Ce = ie.substring(0, M), Ve = ie.substring(ve);
      const he = g && Ce.endsWith(g) && Ve.startsWith(C);
      if (M == ve) {
        if (he ? (ie = Ce.substring(0, Ce.length - g.length) + Ve.substring(C.length), pe += -C.length) : (ie = Ce + g + ee + C + Ve, pe += g.length, oe = 0, B = (ee == null ? void 0 : ee.length) || 0, G && (pe += B, B = 0)), S) {
          var De = { pos: pe };
          ie = S(ie, De), pe = De.pos;
        }
      } else {
        var xe = ie.substring(M, ve);
        ce && (xe = ce(xe)), he ? (ie = Ce.substring(0, Ce.length - g.length) + xe + Ve.substring(C.length), oe = -xe.length - g.length, B = xe.length) : (ie = Ce + g + xe + C + Ve, oe ? pe += (g + C).length : (pe = M, oe = g.length, B = xe.length));
      }
      k(ie), Dt(() => {
        de.focus(), oe = pe + (oe || 0), B = (oe || 0) + (B || 0), de.setSelectionRange(oe, B);
      });
    }
    const A = () => I("**", "**", "bold"), re = () => I("_", "_", "italics"), L = () => I("~~", "~~", "strikethrough"), E = () => I("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), q = () => I(`
> `, `
`, "Blockquote", {}), ne = () => I("![](", ")");
    function R(g) {
      const C = j();
      if (C && !g.shiftKey)
        I("`", "`", "code");
      else {
        const ee = n.lang || "js";
        C.indexOf(`
`) === -1 ? I("\n```" + ee + `
`, "\n```\n", "// code") : I("```" + ee + `
`, "```\n", "");
      }
    }
    function X() {
      if (F()) {
        let { sel: g, selPos: C, beforeSel: ee, afterSel: G, prevCRPos: oe, beforeCR: B, afterCR: S } = se();
        if (g.indexOf(`
`) === -1)
          I(`
 1. `, `
`);
        else if (!g.startsWith(" 1. ")) {
          let ie = 1;
          I("", "", " - ", {
            selectionAtEnd: !0,
            filterSelection: (pe) => " 1. " + pe.replace(/\n$/, "").replace(/\n/g, (M) => `
 ${++ie}. `) + `
`
          });
        } else
          I("", "", "", {
            filterValue: (ie, pe) => {
              if (oe >= 0) {
                let M = S.replace(/^ - /, "");
                ee = B + M, pe.pos -= S.length - M.length;
              }
              return ee + G;
            },
            filterSelection: (ie) => ie.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
          });
      } else
        I(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function Y() {
      if (F()) {
        let { sel: g, selPos: C, beforeSel: ee, afterSel: G, prevCRPos: oe, beforeCR: B, afterCR: S } = se();
        g.indexOf(`
`) === -1 ? I(`
 - `, `
`) : !g.startsWith(" - ") ? I("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ie) => " - " + ie.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
        }) : I("", "", "", {
          filterValue: (ie, pe) => {
            if (oe >= 0) {
              let M = S.replace(/^ - /, "");
              ee = B + M, pe.pos -= S.length - M.length;
            }
            return ee + G;
          },
          filterSelection: (ie) => ie.replace(/^ - /g, "").replace(/\n - /g, `
`)
        });
      } else
        I(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function Z() {
      const g = j(), C = g.indexOf(`
`) === -1;
      g ? C ? I(`
## `, `
`, "") : I("## ", "", "") : I(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
    }
    function V() {
      let { sel: g, selPos: C, beforeSel: ee, afterSel: G, prevCRPos: oe, beforeCR: B, afterCR: S } = se();
      !g.startsWith("//") && !S.startsWith("//") ? g ? I("", "", "//", {
        selectionAtEnd: !0,
        filterSelection: (de) => "//" + de.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
      }) : T({
        value: B + "//" + S + G,
        selectionStart: C + 2
      }) : I("", "", "", {
        filterValue: (de, ie) => {
          if (oe >= 0) {
            let pe = S.replace(/^\/\//, "");
            ee = B + pe, ie.pos -= S.length - pe.length;
          }
          return ee + G;
        },
        filterSelection: (de) => de.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
      });
    }
    const te = () => I(`/*
`, `*/
`, "");
    function b() {
      if (r.length === 0)
        return !1;
      const g = y.value, C = r.pop();
      return u.push({ value: g.value, selectionStart: g.selectionStart, selectionEnd: g.selectionEnd }), T(C), !0;
    }
    function N() {
      if (u.length === 0)
        return !1;
      const g = y.value, C = u.pop();
      return r.push({ value: g.value, selectionStart: g.selectionStart, selectionEnd: g.selectionEnd }), T(C), !0;
    }
    const z = () => null;
    return ot(() => {
      r = [], u = [];
      const g = y.value;
      g.onkeydown = (C) => {
        if (C.key === "Escape" || C.keyCode === 27) {
          a("close");
          return;
        }
        const ee = String.fromCharCode(C.keyCode).toLowerCase();
        ee === "	" ? (!C.shiftKey ? I("", "", "    ", {
          selectionAtEnd: !0,
          filterSelection: (oe) => "    " + oe.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
        }) : I("", "", "", {
          filterValue: (oe, B) => {
            let { selPos: S, beforeSel: ce, afterSel: de, prevCRPos: ie, beforeCR: pe, afterCR: M } = se();
            if (ie >= 0) {
              let ve = M.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              ce = pe + ve, B.pos -= M.length - ve.length;
            }
            return ce + de;
          },
          filterSelection: (oe) => oe.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), C.preventDefault()) : C.ctrlKey ? ee === "z" ? C.shiftKey ? N() && C.preventDefault() : b() && C.preventDefault() : ee === "b" && !C.shiftKey ? (A(), C.preventDefault()) : ee === "h" && !C.shiftKey ? (Z(), C.preventDefault()) : ee === "i" && !C.shiftKey ? (re(), C.preventDefault()) : ee === "q" && !C.shiftKey ? (q(), C.preventDefault()) : ee === "k" ? C.shiftKey ? (ne(), C.preventDefault()) : (E(), C.preventDefault()) : ee === "," || C.key === "<" || C.key === ">" || C.keyCode === 188 ? (R(C), C.preventDefault()) : ee === "/" || C.key === "/" ? (V(), C.preventDefault()) : (ee === "?" || C.key === "?") && C.shiftKey && (te(), C.preventDefault()) : C.altKey && (C.key === "1" || C.key === "0" ? (X(), C.preventDefault()) : C.key === "-" ? (Y(), C.preventDefault()) : C.key === "s" && (L(), C.preventDefault()));
      };
    }), (g, C) => {
      var ee;
      return o(), i("div", null, [
        U(g.$slots, "header", Ae({
          inputElement: y.value,
          id: g.id,
          modelValue: g.modelValue,
          status: g.status
        }, g.$attrs)),
        f.value ? (o(), i("label", {
          key: 0,
          for: g.id,
          class: h(`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${g.labelClass ?? ""}`)
        }, O(f.value), 11, l1)) : x("", !0),
        g.disabled ? x("", !0) : (o(), i("div", n1, [
          l("div", o1, [
            w("bold") ? (o(), i("svg", {
              key: 0,
              class: h(lt),
              onClick: A,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, i1)) : x("", !0),
            w("italics") ? (o(), i("svg", {
              key: 1,
              class: h(lt),
              onClick: re,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, c1)) : x("", !0),
            w("link") ? (o(), i("svg", {
              key: 2,
              class: h(lt),
              onClick: E,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, p1)) : x("", !0),
            w("blockquote") ? (o(), i("svg", {
              key: 3,
              class: h(lt),
              onClick: q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, g1)) : x("", !0),
            w("image") ? (o(), i("svg", {
              key: 4,
              class: h(lt),
              onClick: ne,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, w1)) : x("", !0),
            w("code") ? (o(), i("svg", {
              key: 5,
              class: h(lt),
              onClick: R,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, $1)) : x("", !0),
            w("heading") ? (o(), i("svg", {
              key: 6,
              class: h(lt),
              onClick: Z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, L1)) : x("", !0),
            w("orderedList") ? (o(), i("svg", {
              key: 7,
              class: h(lt),
              icon: "",
              onClick: X,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, M1)) : x("", !0),
            w("unorderedList") ? (o(), i("svg", {
              key: 8,
              class: h(lt),
              onClick: Y,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, T1)) : x("", !0),
            w("strikethrough") ? (o(), i("svg", {
              key: 9,
              class: h(lt),
              onClick: L,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, O1)) : x("", !0),
            w("undo") ? (o(), i("svg", {
              key: 10,
              class: h(lt),
              onClick: b,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, P1)) : x("", !0),
            w("redo") ? (o(), i("svg", {
              key: 11,
              class: h(lt),
              onClick: N,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, E1)) : x("", !0),
            U(g.$slots, "toolbarbuttons", {
              instance: (ee = Pe()) == null ? void 0 : ee.exposed
            })
          ]),
          w("help") && g.helpUrl ? (o(), i("div", z1, [
            l("a", {
              title: "formatting help",
              target: "_blank",
              href: g.helpUrl,
              tabindex: "-1"
            }, [
              (o(), i("svg", {
                class: h(lt),
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, q1))
            ], 8, N1)
          ])) : x("", !0)
        ])),
        l("div", Q1, [
          l("textarea", {
            ref_key: "txt",
            ref: y,
            name: g.id,
            id: g.id,
            class: h(p.value),
            label: g.label,
            value: g.modelValue,
            rows: g.rows || 6,
            disabled: g.disabled,
            onInput: C[0] || (C[0] = (G) => {
              var oe;
              return k(((oe = G.target) == null ? void 0 : oe.value) || "");
            }),
            onKeydown: un(z, ["tab"])
          }, null, 42, K1)
        ]),
        c.value ? (o(), i("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${g.id}-error`
        }, O(c.value), 9, Z1)) : g.help ? (o(), i("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${g.id}-description`
        }, O(g.help), 9, W1)) : x("", !0),
        U(g.$slots, "footer", Ae({
          inputElement: y.value,
          id: g.id,
          modelValue: g.modelValue,
          status: g.status
        }, g.$attrs))
      ]);
    };
  }
}), J1 = {
  key: 0,
  class: "relative z-10 lg:hidden",
  role: "dialog",
  "aria-modal": "true"
}, X1 = { class: "fixed inset-0 flex" }, Y1 = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close sidebar", -1), eh = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 text-white dark:text-black",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), th = [
  Y1,
  eh
], sh = { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2" }, lh = { class: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col" }, nh = { class: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6" }, oh = {
  class: /* @__PURE__ */ h(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
}, ah = /* @__PURE__ */ l("span", { class: "sr-only" }, "Open sidebar", -1), rh = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  })
], -1), ih = [
  ah,
  rh
], uh = /* @__PURE__ */ ue({
  __name: "SidebarLayout",
  setup(e, { expose: t }) {
    const { transition: s } = _n(), n = D(!0), a = D(""), r = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, u = D(""), d = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, c = D(""), f = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    };
    function m(p) {
      s(r, a, p), s(d, u, p), s(f, c, p), setTimeout(() => n.value = p, 300);
    }
    function _() {
      m(!0);
    }
    function w() {
      m(!1);
    }
    return t({ show: _, hide: w, toggle: m }), (p, y) => (o(), i("div", null, [
      n.value ? (o(), i("div", J1, [
        l("div", {
          class: h(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", X1, [
          l("div", {
            class: h(["relative mr-16 flex w-full max-w-xs flex-1", u.value])
          }, [
            l("div", {
              class: h(["absolute left-full top-0 flex w-16 justify-center pt-5", c.value])
            }, [
              l("button", {
                type: "button",
                onClick: w,
                class: "-m-2.5 p-2.5"
              }, th)
            ], 2),
            l("div", sh, [
              U(p.$slots, "default")
            ])
          ], 2)
        ])
      ])) : x("", !0),
      l("div", lh, [
        l("div", nh, [
          U(p.$slots, "default")
        ])
      ]),
      l("div", oh, [
        l("button", {
          type: "button",
          onClick: _,
          class: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        }, ih),
        U(p.$slots, "mobiletitlebar")
      ])
    ]));
  }
}), dh = {
  Alert: ea,
  AlertSuccess: fa,
  ErrorSummary: ga,
  InputDescription: ba,
  Icon: lo,
  Loading: pr,
  OutlineButton: gr,
  PrimaryButton: wr,
  SecondaryButton: $r,
  TextLink: xr,
  Breadcrumbs: Fr,
  Breadcrumb: Dr,
  NavList: Hr,
  NavListItem: Gr,
  AutoQueryGrid: wd,
  SettingsIcons: jd,
  FilterViews: Pl,
  FilterColumn: Bl,
  QueryPrefs: Hl,
  EnsureAccess: ao,
  EnsureAccessDialog: Od,
  TextInput: Ud,
  TextareaInput: Jd,
  SelectInput: lc,
  CheckboxInput: cc,
  TagInput: Ic,
  FileInput: s0,
  Autocomplete: y0,
  Combobox: k0,
  DynamicInput: _0,
  LookupInput: P0,
  AutoFormFields: H0,
  AutoForm: uf,
  AutoCreateForm: Af,
  AutoEditForm: Jf,
  AutoViewForm: hv,
  ConfirmDelete: yv,
  FormLoading: Cv,
  DataGrid: Mv,
  CellFormat: Av,
  PreviewFormat: Dv,
  HtmlFormat: Ev,
  MarkupFormat: Uv,
  MarkupModel: Yv,
  CloseButton: np,
  SlideOver: bp,
  ModalDialog: Vp,
  ModalLookup: $m,
  Tabs: Tm,
  DarkModeToggle: Bm,
  SignIn: s1,
  MarkdownInput: G1,
  SidebarLayout: uh
}, Xs = dh, hh = {
  install(e) {
    Object.keys(Xs).forEach((s) => {
      e.component(s, Xs[s]);
    });
    function t(s) {
      const a = Object.keys(s).filter((r) => s[r]).map((r) => `${encodeURIComponent(r)}=${encodeURIComponent(s[r])}`).join("&");
      return a ? "?" + a : "./";
    }
    e.directive("href", function(s, n) {
      s.href = t(n.value), s.onclick = (a) => {
        a.preventDefault(), history.pushState(n.value, "", t(n.value));
      };
    });
  },
  component(e, t) {
    return e ? t ? J.components[e] = t : J.components[e] || Xs[e] || null : null;
  }
};
export {
  mh as css,
  hh as default,
  Dl as useAuth,
  Us as useClient,
  Nt as useConfig,
  La as useFiles,
  ph as useFormatters,
  dt as useMetadata,
  _n as useUtils
};
