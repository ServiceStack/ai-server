var ho = Object.defineProperty;
var go = (e, t, s) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (go(e, typeof t != "symbol" ? t + "" : t, s), s);
import { defineComponent as ue, computed as v, openBlock as o, createElementBlock as r, normalizeClass as g, createElementVNode as l, createCommentVNode as C, renderSlot as U, ref as O, toDisplayString as j, inject as We, nextTick as Ot, isRef as rn, unref as J, mergeProps as Ae, withModifiers as qe, h as Ft, resolveComponent as Z, createBlock as le, withCtx as _e, useAttrs as yo, createVNode as ge, createTextVNode as ke, watchEffect as Ss, normalizeStyle as cl, Fragment as Me, renderList as Ie, withDirectives as Bt, vModelCheckbox as fl, withKeys as un, createStaticVNode as Is, vModelSelect as bo, useSlots as Ds, getCurrentInstance as Pe, onMounted as ot, createSlots as vl, normalizeProps as Yt, guardReactiveProps as Ms, vModelDynamic as wo, onUnmounted as Et, watch as Lt, vModelText as ko, resolveDynamicComponent as dn, provide as ps, resolveDirective as _o } from "vue";
import { errorResponseExcept as $o, toDate as kt, toTime as Co, omit as yt, enc as el, appendQueryString as es, lastLeftPart as cn, setQueryString as xo, nameOf as Lo, ApiResult as tt, lastRightPart as Pt, leftPart as js, map as Ze, toDateTime as Vo, toCamelCase as So, mapGet as we, chop as Mo, fromXsdDuration as fn, isDate as Os, timeFmt12 as Ao, dateFmt as Fo, apiValue as To, indexOfAny as Io, createBus as Do, toKebabCase as Xl, sanitize as jo, humanize as He, delaySet as vn, rightPart as xs, queryString as tl, combinePaths as Oo, toPascalCase as vt, errorResponse as _t, trimEnd as Bo, $1 as As, ResponseStatus as Js, ResponseError as Yl, HttpMethods as pl, omitEmpty as Po, uniqueKeys as sl, humanify as pn, each as Ho } from "@servicestack/client";
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
    return (i, u) => (o(), r("div", {
      class: g([s.value, n.value, "border-l-4 p-4"])
    }, [
      l("div", Ro, [
        i.hideIcon ? C("", !0) : (o(), r("div", Eo, [
          i.type == "warn" ? (o(), r("svg", zo, Uo)) : i.type == "error" ? (o(), r("svg", qo, Ko)) : i.type == "info" ? (o(), r("svg", Zo, Go)) : i.type == "success" ? (o(), r("svg", Jo, Yo)) : C("", !0)
        ])),
        l("div", null, [
          l("p", {
            class: g([a.value, "text-sm"])
          }, [
            U(i.$slots, "default")
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
    const t = O(!1);
    return (s, n) => t.value ? C("", !0) : (o(), r("div", ta, [
      l("div", sa, [
        la,
        l("div", na, [
          l("h3", oa, [
            s.message ? (o(), r("span", aa, j(s.message), 1)) : U(s.$slots, "default", { key: 1 })
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
    let s = We("ApiState", void 0);
    const n = v(() => t.status || s != null && s.error.value ? $o.call({ responseStatus: t.status ?? (s == null ? void 0 : s.error.value) }, t.except ?? []) : null);
    return (a, i) => n.value ? (o(), r("div", {
      key: 0,
      class: g(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", va, [
        pa,
        l("div", ma, [
          l("p", ha, j(n.value), 1)
        ])
      ])
    ], 2)) : C("", !0);
  }
}), ya = ["id", "aria-describedby"], ba = /* @__PURE__ */ ue({
  __name: "InputDescription",
  props: {
    id: {},
    description: {}
  },
  setup(e) {
    return (t, s) => t.description ? (o(), r("div", {
      key: "description",
      class: "mt-2 text-sm text-gray-500",
      id: `${t.id}-description`,
      "aria-describedby": `${t.id}-description`
    }, [
      l("div", null, j(t.description), 1)
    ], 8, ya)) : C("", !0);
  }
});
function Bs(e) {
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
  if (Y.config.inputValue)
    return Y.config.inputValue(e, t);
  let s = e === "date" ? Bs(t) : e === "datetime-local" ? mn(t) : e === "time" ? hn(t) : t;
  const n = typeof s;
  return s = s == null ? "" : n == "boolean" || n == "number" ? `${s}` : s, s;
}
function yn(e, t) {
  e.value = null, Ot(() => e.value = t);
}
function Zt(e) {
  return Object.keys(e).forEach((t) => {
    const s = e[t];
    e[t] = rn(s) ? J(s) : s;
  }), e;
}
function xt(e, t, s) {
  s ? (t.value = e.entering.cls + " " + e.entering.from, setTimeout(() => t.value = e.entering.cls + " " + e.entering.to, 0)) : (t.value = e.leaving.cls + " " + e.leaving.from, setTimeout(() => t.value = e.leaving.cls + " " + e.leaving.to, 0));
}
function Ls(e) {
  if (typeof document > "u")
    return;
  let t = (e == null ? void 0 : e.after) || document.activeElement, s = t && t.form;
  if (s) {
    let n = ':not([disabled]):not([tabindex="-1"])', a = s.querySelectorAll(`a:not([disabled]), button${n}, input[type=text]${n}, [tabindex]${n}`), i = Array.prototype.filter.call(
      a,
      (d) => d.offsetWidth > 0 || d.offsetHeight > 0 || d === t
    ), u = i.indexOf(t);
    u > -1 && (i[u + 1] || i[0]).focus();
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
  return n && (s = yt(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + ll(s) + "/>" : `<${e}` + ll(s) + `>${t || ""}</${e}>`;
}
function ll(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${el(e[s])}"`, "");
}
function Ps(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Jt(e) {
  return Il(e);
}
let wa = ["string", "number", "boolean", "null", "undefined"];
function Ht(e) {
  return wa.indexOf(typeof e) >= 0 || e instanceof Date;
}
function Xt(e) {
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
function Fs(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function ml(e, t) {
  if (typeof history < "u") {
    const s = t ? es(cn(location.href, "?"), e) : xo(location.href, e);
    history.pushState({}, "", s);
  }
}
function hl(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, i) => (a[i] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function nl(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function gl(e) {
  const t = Y.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Hs(e, t) {
  return es(`swr.${Lo(e)}`, t ? Object.assign({}, e, t) : e);
}
function ka(e) {
  if (e.request) {
    const t = Hs(e.request, e.args);
    Y.config.storage.removeItem(t);
  }
}
async function wn(e, t, s, n, a) {
  const i = Hs(t, n);
  s(new tt({ response: gl(i) }));
  const u = await e.api(t, n, a);
  if (u.succeeded && u.response) {
    u.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const d = JSON.stringify(u.response);
    Y.config.storage.setItem(i, d), s(u);
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
function jt(e, t) {
  const s = Tt(t);
  return e.reduce((n, a) => (n[a] = !s.includes(a), n), {});
}
function _n() {
  return {
    LocalStore: bn,
    dateInputFormat: Bs,
    dateTimeInputFormat: mn,
    timeInputFormat: hn,
    textInputValue: gn,
    setRef: yn,
    unRefs: Zt,
    transition: xt,
    focusNextElement: Ls,
    getTypeName: zt,
    htmlTag: ht,
    htmlAttrs: ll,
    linkAttrs: Ps,
    toAppUrl: Jt,
    isPrimitive: Ht,
    isComplexType: Xt,
    pushState: ml,
    scopedExpr: hl,
    copyText: nl,
    fromCache: gl,
    swrCacheKey: Hs,
    swrClear: ka,
    swrApi: wn,
    asStrings: Tt,
    asOptions: jt,
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
}, en = Object.keys(Cn), wt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, Vs = {
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
  const e = "application/", t = e + "vnd.openxmlformats-officedocument.", s = "image/", n = "text/", a = "audio/", i = "video/", u = {
    jpg: s + "jpeg",
    tif: s + "tiff",
    svg: s + "svg+xml",
    ico: s + "x-icon",
    ts: n + "typescript",
    py: n + "x-python",
    sh: n + "x-sh",
    mp3: a + "mpeg3",
    mpg: i + "mpeg",
    ogv: i + "ogg",
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
  return c("jpeg,gif,png,tiff,bmp,webp", (f) => s + f), c("jsx,csv,css", (f) => n + f), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (f) => a + f), c("3gpp,avi,dv,divx,ogg,mp4,webm", (f) => i + f), c("rtf,pdf", (f) => e + f), d("htm,html,shtm", n + "html"), d("js,mjs,cjs", n + "javascript"), d("yml,yaml", e + "yaml"), d("bat,cmd", e + "bat"), d("xml,csproj,fsproj,vbproj", n + "xml"), d("txt,ps1", n + "plain"), d("qt,mov", i + "quicktime"), d("doc,dot", e + "msword"), d("xls,xlt,xla", e + "excel"), d("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), d("cer,crt,der", e + "x-x509-ca-cert"), d("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), d("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), u;
})();
let ol = [];
function xn(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(_a, encodeURIComponent);
}
function yl(e) {
  return "data:image/svg+xml;utf8," + xn(e);
}
function Ln(e) {
  let t = URL.createObjectURL(e);
  return ol.push(t), t;
}
function Vn() {
  ol.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), ol = [];
}
function bl(e) {
  if (!e)
    return null;
  let t = js(e, "?");
  return Pt(t, "/");
}
function ms(e) {
  let t = bl(e);
  return t == null || t.indexOf(".") === -1 ? null : Pt(t, ".").toLowerCase();
}
function wl(e) {
  let t = ms(e.name);
  return t && $n.indexOf(t) >= 0 ? Ln(e) : It(e.name);
}
function kl(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = ms(e);
  return t && $n.indexOf(t) >= 0 || !1;
}
function It(e) {
  if (!e)
    return null;
  let t = ms(e);
  return t == null || kl(e) ? e : is(t) || yl(Vs.doc);
}
function is(e) {
  let t = Sn(e);
  return t && yl(t) || null;
}
function Sn(e) {
  if (Vs[e])
    return Vs[e];
  for (let t = 0; t < en.length; t++) {
    let s = en[t];
    if (Cn[s].indexOf(e) >= 0)
      return Vs[s];
  }
  return null;
}
function _l(e, t = 2) {
  if (e === 0)
    return "0 Bytes";
  const s = t < 0 ? 0 : t, n = Math.floor(Math.log(e) / Math.log(tn));
  return parseFloat((e / Math.pow(tn, n)).toFixed(s)) + " " + $a[n];
}
function xa(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: wl(t) }));
}
function Rs(e, t) {
  e.onerror = null, e.src = $l(e.src, t) || "";
}
function $l(e, t) {
  return is(Pt(e, ".").toLowerCase()) || (t ? is(t) || t : null) || is("doc");
}
function al(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Pt(e, ".").toLowerCase();
  return Ca[t] || "application/" + t;
}
function La() {
  return {
    extSvg: Sn,
    extSrc: is,
    getExt: ms,
    encodeSvg: xn,
    canPreview: kl,
    getFileName: bl,
    getMimeType: al,
    formatBytes: _l,
    filePathUri: It,
    svgToDataUri: yl,
    fileImageUri: wl,
    objectUrl: Ln,
    flush: Vn,
    inputFiles: xa,
    iconOnError: Rs,
    iconFallbackSrc: $l
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
const ts = "/metadata/app.json", Sa = {
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
}, rl = {
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
[...Object.keys(rl), ...Object.values(rl)];
const Aa = {
  String: "string",
  Boolean: "bool",
  ...rl
};
function _s(e) {
  return Aa[e] || e;
}
function Mn(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? _s(t[0]) + "?" : e.endsWith("[]") ? `List<${_s(e.substring(0, e.length - 2))}>` : t.length === 0 ? _s(e) : js(_s(e), "`") + "<" + t.join(",") + ">") : "";
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
    if (Y.config.apisResolver && t) {
      const i = Y.config.apisResolver(t, s);
      i && (n.Query = i.Query, n.QueryInto = i.QueryInto, n.Create = i.Create, n.Update = i.Update, n.Patch = i.Patch, n.Delete = i.Delete);
    }
    return t && (s ?? (s = (a = Y.metadata.value) == null ? void 0 : a.api), s == null || s.operations.forEach((i) => {
      var u;
      ((u = i.dataModel) == null ? void 0 : u.name) == t && n.add(i);
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
  isAnyQuery: (e) => Ze(e.request.inherits, (t) => Ke.AnyRead.indexOf(t.name) >= 0),
  isQuery: (e) => Ze(e.request.inherits, (t) => t.name === "QueryDb`1"),
  isQueryInto: (e) => Ze(e.request.inherits, (t) => t.name === "QueryDb`2"),
  isCrud: (e) => {
    var t;
    return (t = e.request.implements) == null ? void 0 : t.some((s) => Ke.AnyWrite.indexOf(s.name) >= 0);
  },
  isCreate: (e) => $s(e, Ke.Create),
  isUpdate: (e) => $s(e, Ke.Update),
  isPatch: (e) => $s(e, Ke.Patch),
  isDelete: (e) => $s(e, Ke.Delete),
  model: (e) => {
    var t, s, n;
    return e ? Ze(e.inherits, (a) => Ke.AnyRead.indexOf(a.name) >= 0) ? (t = e.inherits) == null ? void 0 : t.genericArgs[0] : (n = (s = e.implements) == null ? void 0 : s.find((a) => Ke.AnyWrite.indexOf(a.name) >= 0)) == null ? void 0 : n.genericArgs[0] : null;
  }
};
function Ta(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || Es(Cl(e));
}
function An(e) {
  return e.endsWith("?") ? Mo(e, 1) : e;
}
function Es(e) {
  return Sa[An(e)];
}
function Ia(e) {
  return e && Ma[e] || "String";
}
function Cl(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function il(e) {
  return e && Es(e) == "number" || !1;
}
function Fn(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function Da(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function Tn(e) {
  if (!(e != null && e.type))
    return !1;
  const t = Cl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : Es(e.type) == null;
}
function In(e) {
  var s, n, a, i;
  if (!(e != null && e.type))
    return !1;
  const t = Cl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((i = e.input) == null ? void 0 : i.type) == "combobox" ? !0 : Es(e.type) != null;
}
function cs(e, t) {
  let s = typeof e == "string" ? zs(e) : e;
  s || (console.warn(`Metadata not found for: ${e}`), s = { request: { name: e } });
  let n = (
    /** @class */
    function() {
      return function(i) {
        Object.assign(this, i);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function i(u) {
        Object.assign(this, u);
      }
      return i.prototype.createResponse = function() {
        return s.returnsVoid ? void 0 : new n();
      }, i.prototype.getTypeName = function() {
        return s.request.name;
      }, i.prototype.getMethod = function() {
        return s.method || "POST";
      }, i;
    }()
  );
  return new a(t);
}
function ja(e, t, s = {}) {
  let n = (
    /** @class */
    function() {
      return function(i) {
        Object.assign(this, i);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function i(u) {
        Object.assign(this, u);
      }
      return i.prototype.createResponse = function() {
        return typeof s.createResponse == "function" ? s.createResponse() : new n();
      }, i.prototype.getTypeName = function() {
        return e;
      }, i.prototype.getMethod = function() {
        return s.method || "POST";
      }, i;
    }()
  );
  return new a(t);
}
function us(e, t) {
  return e ? (Object.keys(e).forEach((s) => {
    let n = e[s];
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = Bs(kt(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function Oa(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var m;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const i = a.id.toLowerCase(), u = t && t.find((_) => _.name.toLowerCase() == i);
    let d = u == null ? void 0 : u.type, c = (m = u == null ? void 0 : u.genericArgs) == null ? void 0 : m[0], f = a.type === "checkbox" ? a.checked : a.value;
    il(d) ? f = Number(f) : d === "List`1" && typeof f == "string" && (f = f.split(",").map((_) => il(c) ? Number(_) : _)), s[a.id] = f;
  }), s;
}
function xl(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function Ba(e) {
  if (!Ll() && (e != null && e.assert) && !Y.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return Y.metadata.value;
}
function fs(e) {
  return e && xl(e) ? (e.date = Vo(/* @__PURE__ */ new Date()), Y.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(ts, JSON.stringify(e)), !0) : !1;
}
function Pa() {
  Y.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(ts);
}
function Ll() {
  if (Y.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (xl(e))
    fs(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(ts) : null;
    if (t)
      try {
        fs(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${ts} from localStorage`);
      }
  }
  return Y.metadata.value != null;
}
async function sn(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    fs(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  xl(Y.metadata.value) || console.warn("AppMetadata is not available");
}
async function Ha(e) {
  var i;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = Ll() && t !== 0;
  if (a && t) {
    let u = kt((i = Y.metadata.value) == null ? void 0 : i.date);
    (!u || (/* @__PURE__ */ new Date()).getTime() - u.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await sn(s || ts, n), Y.metadata.value != null))
      return;
    const u = We("client");
    if (u != null) {
      const d = await u.api(new Va());
      d.succeeded && fs(d.response);
    }
    if (Y.metadata.value != null)
      return;
    await sn(ts);
  }
  return Y.metadata.value;
}
function pt(e, t) {
  var u;
  if (Y.config.typeResolver) {
    let d = Y.config.typeResolver(e, t);
    if (d)
      return d;
  }
  let s = (u = Y.metadata.value) == null ? void 0 : u.api;
  if (!s || !e)
    return null;
  let n = s.types.find((d) => d.name.toLowerCase() === e.toLowerCase() && (!t || d.namespace == t));
  if (n)
    return n;
  let a = zs(e);
  if (a)
    return a.request;
  let i = s.operations.find((d) => d.response && d.response.name.toLowerCase() === e.toLowerCase() && (!t || d.response.namespace == t));
  return i ? i.response : null;
}
function zs(e) {
  var n;
  if (Y.config.apiResolver) {
    const a = Y.config.apiResolver(e);
    if (a)
      return a;
  }
  let t = (n = Y.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function Ra({ dataModel: e }) {
  var n;
  const t = (n = Y.metadata.value) == null ? void 0 : n.api;
  if (!t)
    return [];
  let s = t.operations;
  if (e) {
    const a = typeof e == "string" ? pt(e) : e;
    s = s.filter((i) => Dn(i.dataModel, a));
  }
  return s;
}
function Vl(e) {
  return e ? pt(e.name, e.namespace) : null;
}
function Dn(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function Ea(e, t) {
  let s = pt(e);
  return s && s.properties && s.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function jn(e) {
  return On(pt(e));
}
function On(e) {
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
      let i = s[a];
      t[i.key] = i.value;
    }
    return t;
  }
  let n = e.allowableValues || (e.input ? e.input.allowableValues : null);
  if (n) {
    for (let a = 0; a < n.length; a++) {
      let i = n[a];
      t[i] = i;
    }
    return t;
  }
  if (e.isEnum) {
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, i = pt(a);
    if (i)
      return On(i);
  }
  return null;
}
function Sl(e) {
  if (!e)
    return;
  const t = [];
  return Object.keys(e).forEach((s) => t.push({ key: s, value: e[s] })), t;
}
function za(e, t) {
  const n = ((a, i) => Object.assign({
    id: a,
    name: a,
    type: i
  }, t))(e.name, (t == null ? void 0 : t.type) || Ta(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = Sl(Bn(e))), n;
}
function Na(e) {
  let t = [];
  if (e) {
    const s = ut(e), n = zs(e.name), a = Vl(n == null ? void 0 : n.dataModel);
    s.forEach((i) => {
      var d, c, f;
      if (!In(i))
        return;
      const u = za(i, i.input);
      if (u.id = So(u.id), u.type == "file" && i.uploadTo && !u.accept) {
        const m = (c = (d = Y.metadata.value) == null ? void 0 : d.plugins.filesUpload) == null ? void 0 : c.locations.find((_) => _.name == i.uploadTo);
        m && !u.accept && m.allowExtensions && (u.accept = m.allowExtensions.map((_) => _.startsWith(".") ? _ : `.${_}`).join(","));
      }
      if (a) {
        const m = (f = a.properties) == null ? void 0 : f.find((_) => _.name == i.name);
        i.ref || (i.ref = m == null ? void 0 : m.ref);
      }
      if (u.options)
        try {
          const m = {
            input: u,
            $typeFields: s.map((w) => w.name),
            $dataModelFields: a ? ut(a).map((w) => w.name) : [],
            ...Y.config.scopeWhitelist
          }, _ = hl(u.options, m);
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
function Ml(e, t) {
  var a, i;
  if (!t.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const s = pt(t.type);
  if (!(s != null && s.enumValues))
    return console.error(`Could not find metadata for ${t.type}`), [`${e}`];
  const n = [];
  for (let u = 0; u < s.enumValues.length; u++) {
    const d = parseInt(s.enumValues[u]);
    d > 0 && (d & e) === d && n.push(((a = s.enumDescriptions) == null ? void 0 : a[u]) || ((i = s.enumNames) == null ? void 0 : i[u]) || `${e}`);
  }
  return n;
}
function Pn(e) {
  return (t) => typeof t == "number" ? Ml(t, { type: e }) : t;
}
function ut(e) {
  if (!e)
    return [];
  let t = [], s = {};
  function n(a) {
    a.forEach((i) => {
      s[i.name] || (s[i.name] = 1, t.push(i));
    });
  }
  for (; e; )
    e.properties && n(e.properties), e = e.inherits ? Vl(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function $s(e, t) {
  var s;
  return ((s = e.request.implements) == null ? void 0 : s.some((n) => n.name === t)) || !1;
}
function hs(e) {
  return e ? Hn(e, ut(e)) : null;
}
function Hn(e, t) {
  let s = t.find((i) => i.name.toLowerCase() === "id");
  if (s && s.isPrimaryKey)
    return s;
  let a = t.find((i) => i.isPrimaryKey) || s;
  if (!a) {
    let i = Ke.model(e);
    if (i)
      return Ze(pt(i), (u) => hs(u));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function Ua(e, t) {
  return Ze(hs(e), (s) => we(t, s.name));
}
function Rn(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : qa(t, s.value);
}
function qa(e, t) {
  return e ? (e = An(e), il(e) || e === "Boolean" ? t : Da(e) ? `[${t}]` : `'${t}'`) : t;
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
    return ((n = Y.metadata.value) == null ? void 0 : n.app) || null;
  }), t = v(() => {
    var n;
    return ((n = Y.metadata.value) == null ? void 0 : n.api) || null;
  }), s = v(() => {
    var n, a, i;
    return ((i = (a = (n = Y.metadata.value) == null ? void 0 : n.plugins) == null ? void 0 : a.autoQuery) == null ? void 0 : i.viewerConventions) || Qa;
  });
  return Ll(), {
    loadMetadata: Ha,
    getMetadata: Ba,
    setMetadata: fs,
    clearMetadata: Pa,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: pt,
    typeOfRef: Vl,
    typeEquals: Dn,
    apiOf: zs,
    findApis: Ra,
    typeName: Fa,
    typeName2: Mn,
    property: Ea,
    enumOptions: jn,
    propertyOptions: Bn,
    createFormLayout: Na,
    typeProperties: ut,
    supportsProp: In,
    Crud: Ke,
    Apis: Rt,
    getPrimaryKey: hs,
    getPrimaryKeyByProps: Hn,
    getId: Ua,
    createDto: cs,
    makeDto: ja,
    toFormValues: us,
    formValues: Oa,
    isComplexProp: Tn,
    asKvps: Sl,
    expandEnumFlags: Ml,
    enumFlagsConverter: Pn
  };
}
const rt = class rt {
  static async getOrFetchValue(t, s, n, a, i, u, d) {
    const c = rt.getValue(n, d, i);
    return c ?? (await rt.fetchLookupIds(t, s, n, a, i, u, [d]), rt.getValue(n, d, i));
  }
  static getValue(t, s, n) {
    const a = rt.Lookup[t];
    if (a) {
      const i = a[s];
      if (i)
        return n = n.toLowerCase(), i[n];
    }
  }
  static setValue(t, s, n, a) {
    const i = rt.Lookup[t] ?? (rt.Lookup[t] = {}), u = i[s] ?? (i[s] = {});
    n = n.toLowerCase(), u[n] = a;
  }
  static setRefValue(t, s) {
    const n = we(s, t.refId);
    if (n == null || t.refLabel == null)
      return null;
    const a = we(s, t.refLabel);
    return rt.setValue(t.model, n, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, s, n, a, i, u, d) {
    const c = s.operations.find((f) => {
      var m;
      return Ke.isAnyQuery(f) && ((m = f.dataModel) == null ? void 0 : m.name) == n;
    });
    if (c) {
      const f = rt.Lookup[n] ?? (rt.Lookup[n] = {}), m = [];
      Object.keys(f).forEach((T) => {
        const E = f[T];
        we(E, i) && m.push(T);
      });
      const _ = d.filter((T) => !m.includes(T));
      if (_.length == 0)
        return;
      const w = u ? null : `${a},${i}`, p = {
        [a + "In"]: _.join(",")
      };
      w && (p.fields = w);
      const y = cs(c, p), k = await t.api(y, { jsconfig: "edv,eccn" });
      if (k.succeeded)
        (we(k.response, "results") || []).forEach((E) => {
          if (!we(E, a)) {
            console.error(`result[${a}] == null`, E);
            return;
          }
          const re = `${we(E, a)}`, D = we(E, i);
          i = i.toLowerCase();
          const I = f[re] ?? (f[re] = {});
          I[i] = `${D}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(rt, "Lookup", {});
let Wt = rt, ul = () => (/* @__PURE__ */ new Date()).getTime(), Ka = ["/", "T", ":", "-"], gt = {
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
}, Za = new Intl.RelativeTimeFormat(gt.locale, {}), ln = 24 * 60 * 60 * 1e3 * 365, Xs = {
  year: ln,
  month: ln / 12,
  day: 24 * 60 * 60 * 1e3,
  hour: 60 * 60 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, Dt = {
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
  relativeTime: Fl,
  relativeTimeFromMs: Ns,
  enumFlags: Yn,
  formatDate: ls,
  formatNumber: Al
};
"iconOnError" in globalThis || (globalThis.iconOnError = Rs);
class Xe {
}
Le(Xe, "currency", { method: "currency" }), Le(Xe, "bytes", { method: "bytes" }), Le(Xe, "link", { method: "link" }), Le(Xe, "linkTel", { method: "linkTel" }), Le(Xe, "linkMailTo", { method: "linkMailTo" }), Le(Xe, "icon", { method: "icon" }), Le(Xe, "iconRounded", { method: "iconRounded" }), Le(Xe, "attachment", { method: "attachment" }), Le(Xe, "time", { method: "time" }), Le(Xe, "relativeTime", { method: "relativeTime" }), Le(Xe, "relativeTimeFromMs", { method: "relativeTimeFromMs" }), Le(Xe, "date", { method: "formatDate" }), Le(Xe, "number", { method: "formatNumber" }), Le(Xe, "hidden", { method: "hidden" }), Le(Xe, "enumFlags", { method: "enumFlags" });
function Wa(e) {
  gt = Object.assign({}, gt, e);
}
function Ga(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (Dt[t] = e[t]);
  });
}
function En() {
  return Dt;
}
function gs(e, t) {
  return t ? ht("span", e, t) : e;
}
function zn(e, t) {
  const s = yt(t, ["currency"]);
  return gs(new Intl.NumberFormat(void 0, { style: "currency", currency: (t == null ? void 0 : t.currency) || "USD" }).format(e), s);
}
function Nn(e, t) {
  return gs(_l(e), t);
}
function Un(e, t) {
  return ht("a", e, Ps({ ...t, href: e }));
}
function qn(e, t) {
  return ht("a", e, Ps({ ...t, href: `tel:${e}` }));
}
function Qn(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = yt(t, ["subject", "body"]), i = {};
  return s && (i.subject = s), n && (i.body = n), ht("a", e, Ps({ ...a, href: `mailto:${es(e, i)}` }));
}
function Kn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Zn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Wn(e, t) {
  let s = bl(e), a = ms(s) == null || kl(e) ? Jt(e) : $l(e);
  const i = Jt(a);
  let u = t && (t["icon-class"] || t.iconClass), d = ht("img", void 0, Object.assign({ class: "w-6 h-6", src: i, onerror: "iconOnError(this,'att')" }, u ? { class: u } : null)), c = `<span class="pl-1">${s}</span>`;
  return ht("a", d + c, Object.assign({ class: "flex", href: Jt(e), title: e }, t ? yt(t, ["icon-class", "iconClass"]) : null));
}
function Gn(e) {
  return "";
}
function Jn(e, t) {
  let s = typeof e == "string" ? new Date(fn(e) * 1e3) : Os(e) ? kt(e) : null;
  return gs(s ? Ao(s) : e, t);
}
function ls(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? kt(e) : e;
  if (!Os(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = gt.date ? Us(gt.date) : null;
  return gs(typeof n == "function" ? n(s) : Fo(s), t);
}
function Al(e, t) {
  if (typeof e != "number")
    return e;
  let s = gt.number ? Us(gt.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), gs(n, t);
}
function Xn(e, t, s) {
  let n = To(e), a = t ? Us(t) : null;
  if (typeof a == "function") {
    let u = s;
    if (t != null && t.options)
      try {
        u = hl(t.options, s);
      } catch (d) {
        console.error(`Could not evaluate '${t.options}'`, d, ", with scope:", s);
      }
    return a(e, u);
  }
  let i = n != null ? Os(n) ? ls(n, s) : typeof n == "number" ? Al(n, s) : n : null;
  return i ?? "";
}
function vs(e, t, s) {
  return Ht(e) ? Xn(e, t, s) : tr(e, t, s);
}
function Ja(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (Os(e))
    return e.getTime() - ul();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return fn(e) * 1e3 * -1;
    if (Io(e, Ka) >= 0)
      return kt(e).getTime() - ul();
  }
  return NaN;
}
function Ns(e, t) {
  for (let s in Xs)
    if (Math.abs(e) > Xs[s] || s === "second")
      return (t || Za).format(Math.round(e / Xs[s]), s);
}
function Fl(e, t) {
  let s = Ja(e);
  return isNaN(s) ? "" : Ns(s, t);
}
function Xa(e, t) {
  return Ns(e.getTime() - (t ? t.getTime() : ul()));
}
function Yn(e, t) {
  return Ml(e, t).join(", ");
}
function Us(e) {
  if (!e)
    return null;
  let { method: t, options: s } = e, n = `${t}(${s})`, a = Dt[n] || Dt[t];
  if (typeof a == "function")
    return a;
  let i = e.locale || gt.locale;
  if (t.startsWith("Intl.")) {
    let u = i ? `'${i}'` : "undefined", d = `return new ${t}(${u},${s || "undefined"})`;
    try {
      let c = Function(d)();
      return a = t === "Intl.DateTimeFormat" ? (f) => c.format(kt(f)) : t === "Intl.NumberFormat" ? (f) => c.format(Number(f)) : t === "Intl.RelativeTimeFormat" ? (f) => Fl(f, c) : (f) => c.format(f), Dt[n] = a;
    } catch (c) {
      console.error(`Invalid format: ${d}`, c);
    }
  } else {
    let u = globalThis[t];
    if (typeof u == "function") {
      let d = s != null ? Function("return " + s)() : void 0;
      return a = (c) => u(c, d, i), Dt[n] = a;
    }
    console.error(`No '${t}' function exists`, Object.keys(Dt));
  }
  return null;
}
function eo(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function to(e) {
  return e.substring(0, 6) === "/Date(" ? ls(kt(e)) : e;
}
function Ya(e) {
  return Tl(ss(e)).replace(/"/g, "");
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
function Tl(e, t = 4) {
  return e = so(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function er(e) {
  return e = so(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = ss(e), Tl(e));
}
function ss(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return to(e);
  if (Ht(e))
    return e;
  if (e instanceof Date)
    return ls(e);
  if (Array.isArray(e))
    return e.map(ss);
  if (typeof e == "object") {
    let t = {};
    return Object.keys(e).forEach((s) => {
      s != "__type" && (t[s] = ss(e[s]));
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
    return ls(n, s);
  let a = Object.keys(n), i = [];
  for (let u = 0; u < Math.min(gt.maxNestedFields, a.length); u++) {
    let d = a[u], c = `${ss(n[d])}`;
    i.push(`<b class="font-medium">${d}</b>: ${el(eo(to(c), gt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && i.push("..."), ht("span", "{ " + i.join(", ") + " }", Object.assign({ title: el(Ya(e)) }, s));
}
function mh() {
  return {
    Formats: Xe,
    setDefaultFormats: Wa,
    getFormatters: En,
    setFormatters: Ga,
    formatValue: vs,
    formatter: Us,
    dateInputFormat: Bs,
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
    relativeTime: Fl,
    relativeTimeFromDate: Xa,
    relativeTimeFromMs: Ns,
    enumFlags: Yn,
    formatDate: ls,
    formatNumber: Al,
    indentJson: Tl,
    prettyJson: er,
    scrub: ss,
    truncate: eo,
    apiValueFmt: Xn,
    iconOnError: Rs
  };
}
const sr = ["title"], lr = /* @__PURE__ */ ue({
  __name: "RouterLink",
  props: {
    to: {}
  },
  setup(e) {
    const t = e, { config: s } = Nt(), n = () => s.value.navigate(t.to ?? "/");
    return (a, i) => (o(), r("a", Ae({
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
    const n = Xl(t), a = Object.keys(it.components).find((i) => Xl(i) === n);
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
}), Le(it, "events", Do()), Le(it, "user", O(null)), Le(it, "metadata", O(null)), Le(it, "components", {
  RouterLink: lr
}), Le(it, "interceptors", new nr());
let Y = it;
function or(e) {
  Y.config = Object.assign(Y.config, e);
}
function ar(e) {
  Y.autoQueryGridDefaults = Object.assign(Y.autoQueryGridDefaults, e);
}
function Il(e) {
  return e && Y.config.assetsPathResolver ? Y.config.assetsPathResolver(e) : e;
}
function rr(e) {
  return e && Y.config.fallbackPathResolver ? Y.config.fallbackPathResolver(e) : e;
}
function ir(e, t) {
  Y.interceptors.register(e, t);
}
function Nt() {
  const e = v(() => Y.config), t = v(() => Y.autoQueryGridDefaults), s = Y.events;
  return {
    config: e,
    setConfig: or,
    events: s,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: ar,
    assetsPathResolver: Il,
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
        const { typeOf: i } = dt(), u = i(e.type);
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
          src: Il(e.src || (s == null ? void 0 : s.uri)),
          onError: (i) => Rs(i.target)
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
    return (t, s) => (o(), r("div", ur, [
      l("div", dr, [
        (o(), r("svg", {
          class: g(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
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
      const n = Z("router-link");
      return t.href ? (o(), le(n, {
        key: 0,
        to: t.href
      }, {
        default: _e(({ navigate: a }) => [
          l("button", {
            class: g(nn),
            href: t.href,
            onClick: a
          }, [
            U(t.$slots, "default")
          ], 8, mr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
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
    return (a, i) => {
      const u = Z("router-link");
      return a.href ? (o(), le(u, {
        key: 0,
        to: a.href
      }, {
        default: _e(({ navigate: d }) => [
          l("button", {
            class: g(n.value),
            href: a.href,
            onClick: d
          }, [
            U(a.$slots, "default")
          ], 10, yr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
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
      const n = Z("router-link");
      return t.href ? (o(), le(n, {
        key: 0,
        to: t.href
      }, {
        default: _e(({ navigate: a }) => [
          l("button", {
            type: t.type ?? "button",
            class: g(on),
            href: t.href,
            onClick: a
          }, [
            U(t.$slots, "default")
          ], 8, kr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
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
const Ts = {
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
}, rs = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, Gt = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, dl = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Ee = {
  panelClass(e = "slideOver") {
    return e == "card" ? rs.panelClass : Gt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? rs.formClass : Gt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? rs.headingClass : Gt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? rs.subHeadingClass : Gt.subHeadingClass;
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
}, hh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: Ts,
  card: rs,
  dummy: Cr,
  form: Ee,
  grid: me,
  input: ft,
  modal: dl,
  slideOver: Gt
}, Symbol.toStringTag, { value: "Module" })), xr = /* @__PURE__ */ ue({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = yo(), s = e, n = v(() => (Ts[s.color] || Ts.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, i) => (o(), r("a", {
      class: g(n.value)
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
    return (t, s) => (o(), r("nav", Lr, [
      l("ol", Vr, [
        l("li", null, [
          l("div", null, [
            l("a", {
              href: t.homeHref,
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
              title: t.homeLabel
            }, [
              Mr,
              l("span", Ar, j(t.homeLabel), 1)
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
], -1), Dr = ["href", "title"], jr = ["title"], Or = /* @__PURE__ */ ue({
  __name: "Breadcrumb",
  props: {
    href: {},
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("li", null, [
      l("div", Tr, [
        Ir,
        t.href ? (o(), r("a", {
          key: 0,
          href: t.href,
          class: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          title: t.title
        }, [
          U(t.$slots, "default")
        ], 8, Dr)) : (o(), r("span", {
          key: 1,
          class: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300",
          title: t.title
        }, [
          U(t.$slots, "default")
        ], 8, jr))
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
    return (t, s) => (o(), r("div", null, [
      t.title ? (o(), r("h2", Br, j(t.title), 1)) : C("", !0),
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
      const n = Z("Icon");
      return o(), r("li", Rr, [
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
                ke(" " + j(t.title), 1)
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
  return e && e.SessionId ? jo(e) : e;
}
function Jr(e) {
  Y.user.value = no(e), Y.events.publish("signIn", e);
}
function Xr() {
  Y.user.value = null, Y.events.publish("signOut", null);
}
const Dl = (e) => (e == null ? void 0 : e.roles) || [], jl = (e) => (e == null ? void 0 : e.permissions) || [];
function oo(e) {
  return Dl(Y.user.value).indexOf(e) >= 0;
}
function Yr(e) {
  return jl(Y.user.value).indexOf(e) >= 0;
}
function Ol() {
  return oo("Admin");
}
function ds(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = Y.user.value;
  if (!t)
    return !1;
  if (Ol())
    return !0;
  let [s, n] = [Dl(t), jl(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => s.indexOf(c) >= 0) || u.length > 0 && !u.some((c) => s.indexOf(c) >= 0) || !i.every((c) => n.indexOf(c) >= 0) || d.length > 0 && !d.every((c) => n.indexOf(c) >= 0));
}
function ei(e) {
  if (!e || !e.requiresAuth)
    return null;
  const t = Y.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Ol())
    return null;
  let [s, n] = [Dl(t), jl(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((m) => s.indexOf(m) < 0);
  if (c.length > 0)
    return `Requires ${c.map((m) => "<b>" + m + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let f = i.filter((m) => n.indexOf(m) < 0);
  return f.length > 0 ? `Requires ${f.map((m) => "<b>" + m + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : u.length > 0 && !u.some((m) => s.indexOf(m) >= 0) ? `Requires any ${u.filter((m) => s.indexOf(m) < 0).map((m) => "<b>" + m + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : d.length > 0 && !d.every((m) => n.indexOf(m) >= 0) ? `Requires any ${d.filter((m) => n.indexOf(m) < 0).map((m) => "<b>" + m + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : null;
}
function Bl() {
  const e = v(() => Y.user.value || null), t = v(() => Y.user.value != null);
  return { signIn: Jr, signOut: Xr, user: e, toAuth: no, isAuthenticated: t, hasRole: oo, hasPermission: Yr, isAdmin: Ol, canAccess: ds, invalidAccessMessage: ei };
}
const ti = { key: 0 }, si = { class: "md:p-4" }, ao = /* @__PURE__ */ ue({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Bl(), { config: s } = Nt(), n = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = es(s.value.redirectSignIn, { redirect: i });
      s.value.navigate(u);
    }, a = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = es(s.value.redirectSignOut, { ReturnUrl: i });
      s.value.navigate(u);
    };
    return (i, u) => {
      const d = Z("Alert"), c = Z("SecondaryButton");
      return i.invalidAccess ? (o(), r("div", ti, [
        ge(d, {
          class: g(i.alertClass),
          innerHTML: i.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", si, [
          J(t) ? (o(), le(c, {
            key: 1,
            onClick: a
          }, {
            default: _e(() => [
              ke("Sign Out")
            ]),
            _: 1
          })) : (o(), le(c, {
            key: 0,
            onClick: n
          }, {
            default: _e(() => [
              ke("Sign In")
            ]),
            _: 1
          }))
        ])
      ])) : C("", !0);
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
], di = /* @__PURE__ */ Is('<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"></path><path fill-rule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"></path><path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"></path></g></svg><span>DESC</span>', 2), ci = [
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
], xi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Pl = /* @__PURE__ */ ue({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = O(), i = O(""), u = O(""), d = O([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => pt(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), m = v(() => s.column.meta.isEnum == !0 ? Sl(jn(f.value.name)) : []), _ = v(() => {
      var V;
      return ((V = y(s.column.type)) == null ? void 0 : V.map((z) => ({ key: z.value, value: z.name }))) || [];
    }), w = O({ filters: [] }), p = v(() => w.value.filters);
    Ss(() => w.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), Ss(() => {
      var z, q, se, A, Q;
      let V = ((se = (q = (z = s.column.settings.filters) == null ? void 0 : z[0]) == null ? void 0 : q.value) == null ? void 0 : se.split(",")) || [];
      if (V.length > 0 && ((A = f.value) != null && A.isEnumInt)) {
        const W = parseInt(V[0]);
        V = ((Q = f.value.enumValues) == null ? void 0 : Q.filter((K) => (W & parseInt(K)) > 0)) || [];
      }
      d.value = V;
    });
    function y(V) {
      let z = s.definitions;
      return Fn(V) || (z = z.filter((q) => q.types !== "string")), z;
    }
    function k(V, z) {
      return y(V).find((q) => q.value === z);
    }
    function T() {
      var z;
      if (!i.value)
        return;
      let V = (z = k(s.column.type, i.value)) == null ? void 0 : z.name;
      V && (w.value.filters.push({ key: i.value, name: V, value: u.value }), i.value = u.value = "");
    }
    function E(V) {
      w.value.filters.splice(V, 1);
    }
    function re(V) {
      return Rn(k(s.column.type, V.key), s.column.type, V);
    }
    function D() {
      n("done");
    }
    function I() {
      var V;
      i.value = "%", (V = a.value) == null || V.focus();
    }
    function F() {
      var V;
      if (u.value && T(), c.value) {
        let z = Object.values(d.value).filter((q) => q);
        w.value.filters = z.length > 0 ? (V = f.value) != null && V.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: z.map((q) => parseInt(q)).reduce((q, se) => q + se, 0).toString() }] : [{ key: "%In", name: "In", value: z.join(",") }] : [];
      }
      n("save", w.value), n("done");
    }
    function ne(V) {
      w.value.sort = V === w.value.sort ? void 0 : V, Ot(F);
    }
    return (V, z) => {
      var W;
      const q = Z("SelectInput"), se = Z("TextInput"), A = Z("PrimaryButton"), Q = Z("SecondaryButton");
      return o(), r("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: D,
        onVnodeMounted: I
      }, [
        l("div", {
          class: "absolute",
          style: cl(`top:${V.topLeft.y}px;left:${V.topLeft.x}px`),
          onClick: z[5] || (z[5] = qe(() => {
          }, ["stop"]))
        }, [
          l("div", li, [
            l("div", ni, [
              oi,
              l("div", ai, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: z[0] || (z[0] = (K) => ne("ASC")),
                  class: g(`${w.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ui, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: z[1] || (z[1] = (K) => ne("DESC")),
                  class: g(`${w.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ci, 2)
              ]),
              fi,
              c.value ? (o(), r("div", vi, [
                (o(!0), r(Me, null, Ie(m.value, (K) => (o(), r("div", {
                  key: K.key,
                  class: "flex items-center"
                }, [
                  Bt(l("input", {
                    type: "checkbox",
                    id: K.key,
                    value: K.key,
                    "onUpdate:modelValue": z[2] || (z[2] = (x) => d.value = x),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, pi), [
                    [fl, d.value]
                  ]),
                  l("label", {
                    for: K.key,
                    class: "ml-3"
                  }, j(K.value), 9, mi)
                ]))), 128))
              ])) : (o(), r("div", hi, [
                (o(!0), r(Me, null, Ie(p.value, (K, x) => (o(), r("div", gi, [
                  l("span", yi, [
                    ke(j(V.column.name) + " " + j(K.name) + " " + j(re(K)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (te) => E(x),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, ki, 8, bi)
                  ])
                ]))), 256)),
                l("div", _i, [
                  ge(q, {
                    id: "filterRule",
                    class: "w-32 mr-1",
                    modelValue: i.value,
                    "onUpdate:modelValue": z[3] || (z[3] = (K) => i.value = K),
                    entries: _.value,
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue", "entries"]),
                  ((W = k(V.column.type, i.value)) == null ? void 0 : W.valueType) !== "none" ? (o(), le(se, {
                    key: 0,
                    ref_key: "txtFilter",
                    ref: a,
                    id: "filterValue",
                    class: "w-32 mr-1",
                    type: "text",
                    modelValue: u.value,
                    "onUpdate:modelValue": z[4] || (z[4] = (K) => u.value = K),
                    onKeyup: un(T, ["enter"]),
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue"])) : C("", !0),
                  l("div", { class: "pt-1" }, [
                    l("button", {
                      type: "button",
                      onClick: T,
                      class: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, Ci)
                  ])
                ])
              ]))
            ]),
            l("div", xi, [
              ge(A, {
                onClick: F,
                color: "red",
                class: "ml-2"
              }, {
                default: _e(() => [
                  ke(" Save ")
                ]),
                _: 1
              }),
              ge(Q, { onClick: D }, {
                default: _e(() => [
                  ke(" Cancel ")
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
], -1), Di = [
  Ii
], ji = {
  key: 0,
  class: "pt-2"
}, Oi = { class: "ml-2" }, Bi = { key: 1 }, Pi = { class: "pt-2" }, Hi = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, Ri = ["onClick"], Ei = /* @__PURE__ */ l("svg", {
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
], Hl = /* @__PURE__ */ ue({
  __name: "FilterViews",
  props: {
    definitions: {},
    columns: {}
  },
  emits: ["done", "change"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.columns.filter((w) => w.settings.filters.length > 0));
    function i(w) {
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
    return (w, p) => (o(), r("div", Li, [
      l("div", Vi, [
        (o(!0), r(Me, null, Ie(a.value, (y) => (o(), r("fieldset", Si, [
          l("legend", Mi, [
            l("span", null, j(J(He)(y.name)), 1),
            l("span", Ai, [
              l("span", Fi, [
                l("button", {
                  onClick: (k) => f(y),
                  title: `Clear all ${J(He)(y.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, Di, 8, Ti)
              ])
            ])
          ]),
          y.meta.isEnum ? (o(), r("div", ji, [
            (o(!0), r(Me, null, Ie(i(y.settings.filters), (k) => (o(), r("div", {
              key: k,
              class: "flex items-center"
            }, [
              l("label", Oi, j(k), 1)
            ]))), 128))
          ])) : (o(), r("div", Bi, [
            (o(!0), r(Me, null, Ie(y.settings.filters, (k, T) => (o(), r("div", Pi, [
              l("span", Hi, [
                ke(j(y.name) + " " + j(k.name) + " " + j(c(y, k)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (E) => m(y, T),
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
}), qi = { class: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Qi = { class: "" }, Ki = { class: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left" }, Zi = /* @__PURE__ */ l("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" }, "Query Preferences", -1), Wi = { class: "mt-4" }, Gi = ["for"], Ji = ["id"], Xi = ["value", "selected"], Yi = { class: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800" }, eu = ["id", "checked"], tu = ["for"], su = { class: "mt-4" }, lu = { class: "pb-2 px-4" }, nu = { class: "" }, ou = ["id", "value"], au = ["for"], ru = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Rl = /* @__PURE__ */ ue({
  __name: "QueryPrefs",
  props: {
    id: { default: "QueryPrefs" },
    columns: {},
    prefs: {},
    maxLimit: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const { autoQueryGridDefaults: s } = Nt(), n = e, a = t, i = O({});
    Ss(() => i.value = Object.assign({
      take: s.value.take,
      selectedColumns: []
    }, n.prefs));
    const u = [10, 25, 50, 100, 250, 500, 1e3];
    function d() {
      a("done");
    }
    function c() {
      a("save", i.value);
    }
    return (f, m) => {
      const _ = Z("PrimaryButton"), w = Z("SecondaryButton"), p = Z("ModalDialog");
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
                    "onUpdate:modelValue": m[0] || (m[0] = (y) => i.value.take = y),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), r(Me, null, Ie(u.filter((y) => n.maxLimit == null || y <= n.maxLimit), (y) => (o(), r("option", {
                      value: y,
                      selected: y === i.value.take
                    }, j(y), 9, Xi))), 256))
                  ], 8, Ji), [
                    [bo, i.value.take]
                  ])
                ]),
                l("div", Yi, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: m[1] || (m[1] = (y) => i.value.selectedColumns = []),
                    checked: i.value.selectedColumns.length === 0,
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
                      (o(!0), r(Me, null, Ie(f.columns, (y) => (o(), r("div", {
                        key: y.name,
                        class: "flex items-center"
                      }, [
                        Bt(l("input", {
                          type: "checkbox",
                          id: y.name,
                          value: y.name,
                          "onUpdate:modelValue": m[2] || (m[2] = (k) => i.value.selectedColumns = k),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, ou), [
                          [fl, i.value.selectedColumns]
                        ]),
                        l("label", {
                          for: y.name,
                          class: "ml-3"
                        }, j(y.name), 9, au)
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
                ke(" Save ")
              ]),
              _: 1
            }),
            ge(w, { onClick: d }, {
              default: _e(() => [
                ke(" Cancel ")
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
}, Iu = { class: "px-4 text-lg text-black dark:text-white" }, Du = { key: 0 }, ju = { key: 1 }, Ou = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Bu = { key: 2 }, Pu = { class: "flex flex-wrap" }, Hu = {
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
}, Nu = /* @__PURE__ */ Is('<svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fill-rule="evenodd"></path><path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z"></path><path fill="#fff" fill-rule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z"></path></svg><span class="text-green-900 dark:text-green-100">Excel</span>', 2), Uu = [
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
}, bd = { class: "mr-1 select-none" }, Cs = 25, wd = /* @__PURE__ */ ue({
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
    const { config: n, autoQueryGridDefaults: a } = Nt(), i = a, u = n.value.storage, d = e, c = s, f = We("client"), m = "filtering,queryString,queryFilters".split(","), _ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), w = v(() => d.deny ? jt(m, d.deny) : jt(m, i.value.deny)), p = v(() => d.hide ? jt(_, d.hide) : jt(_, i.value.hide));
    function y($) {
      return w.value[$];
    }
    function k($) {
      return p.value[$];
    }
    const T = v(() => d.tableStyle ?? i.value.tableStyle), E = v(() => d.gridClass ?? me.getGridClass(T.value)), re = v(() => d.grid2Class ?? me.getGrid2Class(T.value)), D = v(() => d.grid3Class ?? me.getGrid3Class(T.value)), I = v(() => d.grid4Class ?? me.getGrid4Class(T.value)), F = v(() => d.tableClass ?? me.getTableClass(T.value)), ne = v(() => d.theadClass ?? me.getTheadClass(T.value)), V = v(() => d.theadRowClass ?? me.getTheadRowClass(T.value)), z = v(() => d.theadCellClass ?? me.getTheadCellClass(T.value)), q = v(() => d.toolbarButtonClass ?? me.toolbarButtonClass);
    function se($, P) {
      var Te;
      if (d.rowClass)
        return d.rowClass($, P);
      const fe = !!ye.value.AnyUpdate, $e = ((Te = Ce.value) != null && Te.name ? we($, Ce.value.name) : null) == ee.value;
      return me.getTableRowClass(d.tableStyle, P, $e, fe);
    }
    const A = Ds(), Q = v(() => {
      var $;
      return Ks((($ = ye.value.AnyQuery.viewModel) == null ? void 0 : $.name) || ye.value.AnyQuery.dataModel.name);
    }), W = v(() => {
      const $ = Object.keys(A).map((P) => P.toLowerCase());
      return ut(Q.value).filter((P) => $.includes(P.name.toLowerCase()) || $.includes(P.name.toLowerCase() + "-header")).map((P) => P.name);
    });
    function K() {
      let $ = Tt(d.selectedColumns);
      return $.length > 0 ? $ : W.value.length > 0 ? W.value : [];
    }
    const x = v(() => {
      let P = K().map((ae) => ae.toLowerCase());
      const fe = ut(Q.value);
      return P.length > 0 ? P.map((ae) => fe.find(($e) => $e.name.toLowerCase() === ae)).filter((ae) => ae != null) : fe;
    }), te = v(() => {
      let $ = x.value.map((fe) => fe.name), P = Tt(de.value.selectedColumns).map((fe) => fe.toLowerCase());
      return P.length > 0 ? $.filter((fe) => P.includes(fe.toLowerCase())) : $;
    }), b = O([]), N = O(new tt()), R = O(new tt()), h = O(), L = O(!1), ee = O(), X = O(), oe = O(!1), B = O(), S = O(d.skip), ce = O(!1), de = O({ take: Cs }), ie = O(!1), pe = v(() => b.value.some(($) => $.settings.filters.length > 0 || !!$.settings.sort) || de.value.selectedColumns), M = v(() => b.value.map(($) => $.settings.filters.length).reduce(($, P) => $ + P, 0)), ve = v(() => {
      var $;
      return ut(Ks(Qt.value || (($ = ye.value.AnyQuery) == null ? void 0 : $.dataModel.name)));
    }), Ce = v(() => {
      var $;
      return hs(Ks(Qt.value || (($ = ye.value.AnyQuery) == null ? void 0 : $.dataModel.name)));
    }), Ve = v(() => de.value.take ?? Cs), he = v(() => N.value.response ? we(N.value.response, "results") : []), je = v(() => {
      var $;
      return ((($ = N.value.response) == null ? void 0 : $.total) || he.value.length) ?? 0;
    }), Oe = v(() => S.value > 0), xe = v(() => S.value > 0), Qe = v(() => he.value.length >= Ve.value), Re = v(() => he.value.length >= Ve.value), Be = O(), Ge = O(), st = {
      NoQuery: "No Query API was found"
    };
    t({
      update: Se,
      search: qt,
      createRequestArgs: qs,
      reset: Wl,
      createDone: as,
      createSave: Gs,
      editDone: St,
      editSave: Kt,
      forceUpdate: $t,
      setEdit: bt,
      edit: X,
      createForm: Be,
      editForm: Ge,
      apiPrefs: de,
      results: he,
      skip: S,
      take: Ve,
      total: je
    }), Y.interceptors.has("AutoQueryGrid.new") && Y.interceptors.invoke("AutoQueryGrid.new", { props: d });
    function Je($) {
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
      c("nav", $), y("queryString") && ml($);
    }
    async function lt($) {
      S.value += $, S.value < 0 && (S.value = 0);
      const P = Math.floor(je.value / Ve.value) * Ve.value;
      S.value > P && (S.value = P), Fe({ skip: S.value || void 0 }), await Se();
    }
    async function ze($, P) {
      var $e, Te;
      if (X.value = null, ee.value = P, !$ || !P)
        return;
      let fe = cs(ye.value.AnyQuery, { [$]: P });
      const ae = await f.api(fe);
      if (ae.succeeded) {
        let Ne = ($e = we(ae.response, "results")) == null ? void 0 : $e[0];
        Ne || console.warn(`API ${(Te = ye.value.AnyQuery) == null ? void 0 : Te.request.name}(${$}:${P}) returned no results`), X.value = Ne;
      }
    }
    async function at($, P) {
      var $e;
      c("rowSelected", $, P);
      const fe = ($e = Ce.value) == null ? void 0 : $e.name, ae = fe ? we($, fe) : null;
      !fe || !ae || (Fe({ edit: ae }), ze(fe, ae));
    }
    function H($, P) {
      var ae;
      if (!y("filtering"))
        return;
      let fe = P.target;
      if (Je($) && (fe == null ? void 0 : fe.tagName) !== "TD") {
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
    function G() {
      B.value = null;
    }
    async function be($) {
      var fe;
      let P = (fe = B.value) == null ? void 0 : fe.column;
      P && (P.settings = $, u.setItem(bs(P.name), JSON.stringify(P.settings)), await Se()), B.value = null;
    }
    async function De($) {
      u.setItem(bs($.name), JSON.stringify($.settings)), await Se();
    }
    async function Ye($) {
      oe.value = !1, de.value = $, u.setItem(Qs(), JSON.stringify($)), await Se();
    }
    function ct($) {
      var P;
      Be.value && (Object.assign((P = Be.value) == null ? void 0 : P.model, $), $t());
    }
    function bt($) {
      Object.assign(X.value, $), $t();
    }
    function $t() {
      var P, fe, ae;
      (P = Be.value) == null || P.forceUpdate(), (fe = Ge.value) == null || fe.forceUpdate();
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
      const P = ye.value.AnyQuery;
      if (!P) {
        console.error(st.NoQuery);
        return;
      }
      let fe = cs(P, $), ae = await f.api(fe);
      vn((Ne) => {
        N.value.response = N.value.error = void 0, ie.value = Ne, Ut ? Ot(() => N.value = ae) : N.value = ae;
      })();
      let Te = we(ae.response, "results") || [];
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
          var ks;
          const mt = $e.find((Mt) => Mt.name.toLowerCase() == Ne.toLowerCase());
          (ks = mt == null ? void 0 : mt.ref) != null && ks.selfId && Te.push(mt.ref.selfId), we(A, Ne) && Te.push(...$e.filter((Mt) => {
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
        const ae = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let $e = tl(ae);
        if (Object.keys($e).forEach((Te) => {
          x.value.find((mt) => mt.name.toLowerCase() === Te.toLowerCase()) && ($[Te] = $e[Te]);
        }), typeof $e.skip < "u") {
          const Te = parseInt($e.skip);
          isNaN(Te) || (S.value = $.skip = Te);
        }
      }
      return typeof $.skip > "u" && S.value > 0 && ($.skip = S.value), fe.length > 0 && ($.orderBy = fe.join(",")), $;
    }
    function ro() {
      const $ = El("csv");
      nl($), typeof window < "u" && window.open($);
    }
    function io() {
      const $ = El("json");
      nl($), ce.value = !0, setTimeout(() => ce.value = !1, 3e3);
    }
    function El($ = "json") {
      var Te;
      const P = qs(), fe = `/api/${(Te = ye.value.AnyQuery) == null ? void 0 : Te.request.name}`, ae = Oo(f.baseUrl, es(fe, { ...P, jsconfig: "edv" }));
      return ae.indexOf("?") >= 0 ? js(ae, "?") + "." + $ + "?" + xs(ae, "?") : ae + ".json";
    }
    async function uo() {
      b.value.forEach(($) => {
        $.settings = { filters: [] }, u.removeItem(bs($.name));
      }), de.value = { take: Cs }, u.removeItem(Qs()), await Se();
    }
    function co() {
      L.value = !0, Fe({ create: null });
    }
    const Qt = v(() => zt(d.type)), ns = v(() => {
      var $;
      return Qt.value || (($ = ye.value.AnyQuery) == null ? void 0 : $.dataModel.name);
    }), os = v(() => d.modelTitle || ns.value), fo = v(() => d.newButtonLabel || `New ${os.value}`), Qs = () => {
      var $;
      return `${d.id}/ApiPrefs/${Qt.value || (($ = ye.value.AnyQuery) == null ? void 0 : $.dataModel.name)}`;
    }, bs = ($) => {
      var P;
      return `Column/${d.id}:${Qt.value || ((P = ye.value.AnyQuery) == null ? void 0 : P.dataModel.name)}.${$}`;
    }, { metadataApi: zl, typeOf: Ks, apiOf: Nl, filterDefinitions: vo } = dt(), { invalidAccessMessage: Zs } = Bl(), Ul = v(() => d.filterDefinitions || vo.value), ye = v(() => {
      let $ = Tt(d.apis);
      return $.length > 0 ? Rt.from($.map((P) => Nl(P)).filter((P) => P != null).map((P) => P)) : Rt.forType(Qt.value, zl.value);
    }), ws = ($) => `<span class="text-yellow-700">${$}</span>`, ql = v(() => {
      if (!zl.value)
        return ws(`AppMetadata not loaded, see <a class="${Ts.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let P = Tt(d.apis).map((ae) => Nl(ae) == null ? ae : null).filter((ae) => ae != null);
      if (P.length > 0)
        return ws(`Unknown API${P.length > 1 ? "s" : ""}: ${P.join(", ")}`);
      let fe = ye.value;
      return fe.empty ? ws("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : fe.AnyQuery ? null : ws(st.NoQuery);
    }), Ql = v(() => ye.value.AnyQuery && Zs(ye.value.AnyQuery)), Kl = v(() => ye.value.Create && Zs(ye.value.Create)), Zl = v(() => ye.value.AnyUpdate && Zs(ye.value.AnyUpdate)), po = v(() => ds(ye.value.Create));
    v(() => ds(ye.value.AnyUpdate));
    const Ws = v(() => ds(ye.value.Delete));
    function St() {
      X.value = null, ee.value = null, Fe({ edit: void 0 });
    }
    function as() {
      L.value = !1, Fe({ create: void 0 });
    }
    async function Kt() {
      await Se(), St();
    }
    async function Gs() {
      await Se(), as();
    }
    function Wl() {
      var fe;
      N.value = new tt(), R.value = new tt(), L.value = !1, ee.value = null, X.value = null, oe.value = !1, B.value = null, S.value = d.skip, ce.value = !1, de.value = { take: Cs }, ie.value = !1;
      const $ = d.prefs || Fs(u.getItem(Qs()));
      $ && (de.value = $), b.value = x.value.map((ae) => ({
        name: ae.name,
        type: ae.type,
        meta: ae,
        settings: Object.assign(
          {
            filters: []
          },
          Fs(u.getItem(bs(ae.name)))
        )
      })), isNaN(d.skip) || (S.value = d.skip);
      let P = (fe = Ce.value) == null ? void 0 : fe.name;
      if (y("queryString")) {
        const ae = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let $e = tl(ae);
        typeof $e.create < "u" ? L.value = typeof $e.create < "u" : P && (typeof $e.edit == "string" || typeof $e.edit == "number") && ze(P, $e.edit);
      }
      d.create === !0 && (L.value = !0), P && d.edit != null && ze(P, d.edit);
    }
    return ot(async () => {
      Wl(), await Se();
    }), ($, P) => {
      const fe = Z("Alert"), ae = Z("EnsureAccessDialog"), $e = Z("AutoCreateForm"), Te = Z("AutoEditForm"), Ne = Z("AutoViewForm"), mt = Z("ErrorSummary"), Gl = Z("Loading"), ks = Z("SettingsIcons"), Mt = Z("DataGrid");
      return ql.value ? (o(), r("div", iu, [
        ge(fe, { innerHTML: ql.value }, null, 8, ["innerHTML"])
      ])) : Ql.value ? (o(), r("div", uu, [
        ge(ao, { "invalid-access": Ql.value }, null, 8, ["invalid-access"])
      ])) : (o(), r("div", du, [
        k("forms") && L.value && ye.value.Create ? (o(), r("div", cu, [
          Kl.value ? (o(), le(ae, {
            key: 0,
            title: `Create ${os.value}`,
            "invalid-access": Kl.value,
            "alert-class": "text-yellow-700",
            onDone: as
          }, null, 8, ["title", "invalid-access"])) : J(A).createform ? U($.$slots, "createform", {
            key: 1,
            type: ye.value.Create.request.name,
            configure: $.configureField,
            done: as,
            save: Gs
          }) : (o(), le($e, {
            key: 2,
            ref_key: "createForm",
            ref: Be,
            type: ye.value.Create.request.name,
            configure: $.configureField,
            onDone: as,
            onSave: Gs
          }, {
            header: _e(() => [
              U($.$slots, "formheader", {
                form: "create",
                formInstance: Be.value,
                apis: ye.value,
                type: ns.value,
                updateModel: ct
              })
            ]),
            footer: _e(() => [
              U($.$slots, "formfooter", {
                form: "create",
                formInstance: Be.value,
                apis: ye.value,
                type: ns.value,
                updateModel: ct
              })
            ]),
            _: 3
          }, 8, ["type", "configure"]))
        ])) : k("forms") && X.value && ye.value.AnyUpdate ? (o(), r("div", fu, [
          Zl.value ? (o(), le(ae, {
            key: 0,
            title: `Update ${os.value}`,
            "invalid-access": Zl.value,
            "alert-class": "text-yellow-700",
            onDone: St
          }, null, 8, ["title", "invalid-access"])) : J(A).editform ? U($.$slots, "editform", {
            key: 1,
            model: X.value,
            type: ye.value.AnyUpdate.request.name,
            deleteType: Ws.value ? ye.value.Delete.request.name : null,
            configure: $.configureField,
            done: St,
            save: Kt
          }) : (o(), le(Te, {
            key: 2,
            ref_key: "editForm",
            ref: Ge,
            modelValue: X.value,
            "onUpdate:modelValue": P[0] || (P[0] = (Ue) => X.value = Ue),
            type: ye.value.AnyUpdate.request.name,
            deleteType: Ws.value ? ye.value.Delete.request.name : null,
            configure: $.configureField,
            onDone: St,
            onSave: Kt,
            onDelete: Kt
          }, {
            header: _e(() => [
              U($.$slots, "formheader", {
                form: "edit",
                formInstance: Ge.value,
                apis: ye.value,
                type: ns.value,
                model: X.value,
                id: ee.value,
                updateModel: bt
              })
            ]),
            footer: _e(() => [
              U($.$slots, "formfooter", {
                form: "edit",
                formInstance: Ge.value,
                apis: ye.value,
                type: ns.value,
                model: X.value,
                id: ee.value,
                updateModel: bt
              })
            ]),
            _: 3
          }, 8, ["modelValue", "type", "deleteType", "configure"]))
        ])) : k("forms") && X.value ? (o(), r("div", vu, [
          J(A).viewform ? U($.$slots, "viewform", {
            key: 0,
            model: X.value,
            apis: ye.value,
            done: St
          }) : (o(), le(Ne, {
            key: 1,
            model: X.value,
            apis: ye.value,
            deleteType: Ws.value ? ye.value.Delete.request.name : null,
            done: St,
            onSave: Kt,
            onDelete: Kt
          }, null, 8, ["model", "apis", "deleteType"]))
        ])) : C("", !0),
        J(A).toolbar ? U($.$slots, "toolbar", { key: 3 }) : k("toolbar") ? (o(), r("div", pu, [
          oe.value ? (o(), le(Rl, {
            key: 0,
            columns: x.value,
            prefs: de.value,
            onDone: P[1] || (P[1] = (Ue) => oe.value = !1),
            onSave: Ye
          }, null, 8, ["columns", "prefs"])) : C("", !0),
          l("div", mu, [
            l("div", hu, [
              k("preferences") ? (o(), r("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${os.value} Preferences`,
                onClick: P[2] || (P[2] = (Ue) => oe.value = !oe.value)
              }, bu, 8, gu)) : C("", !0),
              k("pagingNav") ? (o(), r("button", {
                key: 1,
                type: "button",
                class: g(["pl-2", Oe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !Oe.value,
                onClick: P[3] || (P[3] = (Ue) => lt(-je.value))
              }, _u, 10, wu)) : C("", !0),
              k("pagingNav") ? (o(), r("button", {
                key: 2,
                type: "button",
                class: g(["pl-2", xe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !xe.value,
                onClick: P[4] || (P[4] = (Ue) => lt(-Ve.value))
              }, xu, 10, $u)) : C("", !0),
              k("pagingNav") ? (o(), r("button", {
                key: 3,
                type: "button",
                class: g(["pl-2", Qe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !Qe.value,
                onClick: P[5] || (P[5] = (Ue) => lt(Ve.value))
              }, Su, 10, Lu)) : C("", !0),
              k("pagingNav") ? (o(), r("button", {
                key: 4,
                type: "button",
                class: g(["pl-2", Re.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !Re.value,
                onClick: P[6] || (P[6] = (Ue) => lt(je.value))
              }, Fu, 10, Mu)) : C("", !0)
            ]),
            k("pagingInfo") ? (o(), r("div", Tu, [
              l("div", Iu, [
                ie.value ? (o(), r("span", Du, "Querying...")) : C("", !0),
                he.value.length ? (o(), r("span", ju, [
                  Ou,
                  ke(" " + j(S.value + 1) + " - " + j(Math.min(S.value + he.value.length, je.value)) + " ", 1),
                  l("span", null, " of " + j(je.value), 1)
                ])) : N.value.completed ? (o(), r("span", Bu, "No Results")) : C("", !0)
              ])
            ])) : C("", !0),
            l("div", Pu, [
              k("refresh") ? (o(), r("div", Hu, [
                l("button", {
                  type: "button",
                  onClick: Vt,
                  title: "Refresh",
                  class: g(q.value)
                }, Eu, 2)
              ])) : C("", !0),
              k("downloadCsv") ? (o(), r("div", zu, [
                l("button", {
                  type: "button",
                  onClick: ro,
                  title: "Download CSV",
                  class: g(q.value)
                }, Uu, 2)
              ])) : C("", !0),
              k("copyApiUrl") ? (o(), r("div", qu, [
                l("button", {
                  type: "button",
                  onClick: io,
                  title: "Copy API URL",
                  class: g(q.value)
                }, [
                  ce.value ? (o(), r("svg", Qu, Zu)) : (o(), r("svg", Wu, Ju)),
                  Xu
                ], 2)
              ])) : C("", !0),
              pe.value && k("resetPreferences") ? (o(), r("div", Yu, [
                l("button", {
                  type: "button",
                  onClick: uo,
                  title: "Reset Preferences & Filters",
                  class: g(q.value)
                }, td, 2)
              ])) : C("", !0),
              k("filtersView") && M.value > 0 ? (o(), r("div", sd, [
                l("button", {
                  type: "button",
                  onClick: P[7] || (P[7] = (Ue) => h.value = h.value == "filters" ? null : "filters"),
                  class: g(q.value),
                  "aria-expanded": "false"
                }, [
                  ld,
                  l("span", nd, j(M.value) + " " + j(M.value == 1 ? "Filter" : "Filters"), 1),
                  h.value != "filters" ? (o(), r("svg", od, rd)) : (o(), r("svg", id, dd))
                ], 2)
              ])) : C("", !0),
              k("newItem") && ye.value.Create && po.value ? (o(), r("div", cd, [
                l("button", {
                  type: "button",
                  onClick: co,
                  title: os.value,
                  class: g(q.value)
                }, [
                  vd,
                  l("span", pd, j(fo.value), 1)
                ], 10, fd)
              ])) : C("", !0),
              J(A).toolbarbuttons ? U($.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: q.value
              }) : C("", !0)
            ])
          ])
        ])) : C("", !0),
        h.value == "filters" ? (o(), le(Hl, {
          key: 5,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: Ul.value,
          columns: b.value,
          onDone: P[8] || (P[8] = (Ue) => h.value = null),
          onChange: De
        }, null, 8, ["definitions", "columns"])) : C("", !0),
        R.value.error ?? N.value.error ? (o(), le(mt, {
          key: 6,
          status: R.value.error ?? N.value.error
        }, null, 8, ["status"])) : ie.value ? (o(), le(Gl, {
          key: 7,
          class: "p-2"
        })) : C("", !0),
        B.value ? (o(), r("div", md, [
          ge(Pl, {
            definitions: Ul.value,
            column: B.value.column,
            "top-left": B.value.topLeft,
            onDone: G,
            onSave: be
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : C("", !0),
        he.value.length ? (o(), le(Mt, {
          key: 9,
          id: $.id,
          items: he.value,
          type: $.type,
          "selected-columns": te.value,
          class: "mt-1",
          onFiltersChanged: Se,
          tableStyle: T.value,
          gridClass: E.value,
          grid2Class: re.value,
          grid3Class: D.value,
          grid4Class: I.value,
          tableClass: F.value,
          theadClass: ne.value,
          theadRowClass: V.value,
          theadCellClass: z.value,
          tbodyClass: $.tbodyClass,
          rowClass: se,
          onRowSelected: at,
          rowStyle: $.rowStyle,
          headerTitle: $.headerTitle,
          headerTitles: $.headerTitles,
          visibleFrom: $.visibleFrom,
          onHeaderSelected: H
        }, vl({
          header: _e(({ column: Ue, label: At }) => {
            var Jl;
            return [
              y("filtering") && Je(Ue) ? (o(), r("div", hd, [
                l("span", gd, j(At), 1),
                ge(ks, {
                  column: b.value.find((mo) => mo.name.toLowerCase() === Ue.toLowerCase()),
                  "is-open": ((Jl = B.value) == null ? void 0 : Jl.column.name) === Ue
                }, null, 8, ["column", "is-open"])
              ])) : (o(), r("div", yd, [
                l("span", bd, j(At), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          Ie(Object.keys(J(A)), (Ue) => ({
            name: Ue,
            fn: _e((At) => [
              U($.$slots, Ue, Yt(Ms(At)))
            ])
          }))
        ]), 1032, ["id", "items", "type", "selected-columns", "tableStyle", "gridClass", "grid2Class", "grid3Class", "grid4Class", "tableClass", "theadClass", "theadRowClass", "theadCellClass", "tbodyClass", "rowStyle", "headerTitle", "headerTitles", "visibleFrom"])) : C("", !0)
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
], Dd = /* @__PURE__ */ ue({
  __name: "SettingsIcons",
  props: {
    column: {},
    isOpen: { type: Boolean }
  },
  setup(e) {
    return (t, s) => {
      var n, a, i, u, d, c, f;
      return o(), r("div", kd, [
        (i = (a = (n = t.column) == null ? void 0 : n.settings) == null ? void 0 : a.filters) != null && i.length ? (o(), r("svg", _d, Cd)) : (o(), r("svg", {
          key: 1,
          class: g(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, Vd, 2)),
        ((d = (u = t.column) == null ? void 0 : u.settings) == null ? void 0 : d.sort) === "ASC" ? (o(), r("svg", Sd, Ad)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), r("svg", Fd, Id)) : C("", !0)
      ]);
    };
  }
}), jd = /* @__PURE__ */ ue({
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
      const n = Z("EnsureAccess"), a = Z("SlideOver");
      return t.invalidAccess ? (o(), le(a, {
        key: 0,
        title: t.title,
        onDone: s[0] || (s[0] = (i) => t.$emit("done")),
        "content-class": "relative flex-1"
      }, vl({
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
            ke(j(t.subtitle), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["title"])) : C("", !0);
    };
  }
}), Od = ["for"], Bd = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Pd = {
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
      focus: i
    });
    const a = O();
    function i() {
      var p;
      (p = a.value) == null || p.focus();
    }
    const u = v(() => n.type || "text"), d = v(() => n.label ?? He(vt(n.id))), c = v(() => n.placeholder ?? d.value);
    function f(p) {
      return n.type === "range" ? p.replace("shadow-sm ", "") : p;
    }
    let m = We("ApiState", void 0);
    const _ = v(() => _t.call({ responseStatus: n.status ?? (m == null ? void 0 : m.error.value) }, n.id)), w = v(() => [ft.base, _.value ? ft.invalid : f(ft.valid), n.inputClass]);
    return (p, y) => (o(), r("div", {
      class: g([p.$attrs.class])
    }, [
      U(p.$slots, "header", Ae({
        inputElement: a.value,
        id: p.id,
        modelValue: p.modelValue,
        status: p.status
      }, p.$attrs)),
      d.value ? (o(), r("label", {
        key: 0,
        for: p.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${p.labelClass ?? ""}`)
      }, j(d.value), 11, Od)) : C("", !0),
      l("div", {
        class: g(f("mt-1 relative shadow-sm rounded-md"))
      }, [
        l("input", Ae({
          ref_key: "inputElement",
          ref: a,
          type: u.value,
          name: p.id,
          id: p.id,
          class: w.value,
          placeholder: c.value,
          value: J(gn)(u.value, p.modelValue),
          onInput: y[0] || (y[0] = (k) => p.$emit("update:modelValue", s(k.target))),
          "aria-invalid": _.value != null,
          "aria-describedby": `${p.id}-error`,
          step: "any"
        }, J(yt)(p.$attrs, ["class", "value"])), null, 16, Bd),
        _.value ? (o(), r("div", Pd, Rd)) : C("", !0)
      ], 2),
      _.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${p.id}-error`
      }, j(_.value), 9, Ed)) : p.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${p.id}-description`
      }, j(p.help), 9, zd)) : C("", !0),
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
    let i = We("ApiState", void 0);
    const u = v(() => _t.call({ responseStatus: s.status ?? (i == null ? void 0 : i.error.value) }, s.id)), d = v(() => ["shadow-sm " + ft.base, u.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid, s.inputClass]);
    return (c, f) => (o(), r("div", {
      class: g([c.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: c.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${c.labelClass ?? ""}`)
      }, j(n.value), 11, qd)) : C("", !0),
      l("div", Qd, [
        l("textarea", Ae({
          name: c.id,
          id: c.id,
          class: d.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (m) => c.$emit("update:modelValue", t(m.target))),
          "aria-invalid": u.value != null,
          "aria-describedby": `${c.id}-error`
        }, J(yt)(c.$attrs, ["class"])), j(c.modelValue), 17, Kd)
      ]),
      u.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, j(u.value), 9, Zd)) : c.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, j(c.help), 9, Wd)) : C("", !0)
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
    let a = We("ApiState", void 0);
    const i = v(() => _t.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id)), u = v(() => s.entries || (s.values ? s.values.map((d) => ({ key: d, value: d })) : s.options ? Object.keys(s.options).map((d) => ({ key: d, value: s.options[d] })) : []));
    return (d, c) => (o(), r("div", {
      class: g([d.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: d.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${d.labelClass ?? ""}`)
      }, j(n.value), 11, Xd)) : C("", !0),
      l("select", Ae({
        id: d.id,
        name: d.id,
        class: [
          "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600",
          i.value ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
          d.inputClass
        ],
        value: d.modelValue,
        onInput: c[0] || (c[0] = (f) => d.$emit("update:modelValue", t(f.target))),
        "aria-invalid": i.value != null,
        "aria-describedby": `${d.id}-error`
      }, J(yt)(d.$attrs, ["class"])), [
        (o(!0), r(Me, null, Ie(u.value, (f) => (o(), r("option", {
          value: f.key
        }, j(f.value), 9, ec))), 256))
      ], 16, Yd),
      i.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${d.id}-error`
      }, j(i.value), 9, tc)) : C("", !0)
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
    let a = We("ApiState", void 0);
    const i = v(() => _t.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id));
    return (u, d) => (o(), r("div", {
      class: g(["relative flex items-start", u.$attrs.class])
    }, [
      l("div", nc, [
        l("input", Ae({
          id: u.id,
          name: u.id,
          type: "checkbox",
          checked: u.modelValue,
          onInput: d[0] || (d[0] = (c) => u.$emit("update:modelValue", c.target.checked)),
          class: ["focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800", u.inputClass]
        }, J(yt)(u.$attrs, ["class"])), null, 16, oc)
      ]),
      l("div", ac, [
        l("label", {
          for: u.id,
          class: g(`font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
        }, j(n.value), 11, rc),
        i.value ? (o(), r("p", ic, j(i.value), 1)) : u.help ? (o(), r("p", uc, j(u.help), 1)) : C("", !0)
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
    const i = v(() => Ze(a(s.modelValue), (b) => typeof b == "string" ? b.trim().length == 0 ? [] : b.split(",") : b) || []), u = O(), d = O(!1), c = v(() => {
      const b = _.value.toLowerCase();
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((N) => !i.value.includes(N) && N.toLowerCase().includes(b)) : s.allowableValues.filter((N) => !i.value.includes(N) && N.startsWith(b));
    });
    function f(b) {
      u.value = b;
    }
    const m = O(null), _ = O(""), w = v(() => s.type || "text"), p = v(() => s.label ?? He(vt(s.id)));
    let y = We("ApiState", void 0);
    const k = v(() => _t.call({ responseStatus: s.status ?? (y == null ? void 0 : y.error.value) }, s.id)), T = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      k.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), E = (b) => V(i.value.filter((N) => N != b));
    function re(b) {
      var N;
      document.activeElement === b.target && ((N = m.value) == null || N.focus());
    }
    const D = O();
    function I() {
      d.value = !0, D.value = !0;
    }
    function F() {
      I();
    }
    function ne() {
      K(q()), D.value = !1, setTimeout(() => {
        D.value || (d.value = !1);
      }, 200);
    }
    function V(b) {
      const N = s.string ? b.join(",") : b;
      n("update:modelValue", N);
    }
    function z(b) {
      if (b.key == "Backspace" && _.value.length == 0 && i.value.length > 0 && E(i.value[i.value.length - 1]), !(!s.allowableValues || s.allowableValues.length == 0))
        if (b.code == "Escape" || b.code == "Tab")
          d.value = !1;
        else if (b.code == "Home")
          u.value = c.value[0], Q();
        else if (b.code == "End")
          u.value = c.value[c.value.length - 1], Q();
        else if (b.code == "ArrowDown") {
          if (d.value = !0, !u.value)
            u.value = c.value[0];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N + 1 < c.value.length ? c.value[N + 1] : c.value[0];
          }
          W();
        } else if (b.code == "ArrowUp") {
          if (!u.value)
            u.value = c.value[c.value.length - 1];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N - 1 >= 0 ? c.value[N - 1] : c.value[c.value.length - 1];
          }
          W();
        } else
          b.code == "Enter" ? u.value && d.value ? (K(u.value), b.preventDefault()) : d.value = !1 : d.value = c.value.length > 0;
    }
    function q() {
      if (_.value.length == 0)
        return "";
      let b = Bo(_.value.trim(), ",");
      return b[0] == "," && (b = b.substring(1)), b = b.trim(), b.length == 0 && d.value && c.value.length > 0 ? u.value : b;
    }
    function se(b) {
      const N = q();
      if (N.length > 0) {
        const R = s.delimiters.some((L) => L == b.key);
        if (R && b.preventDefault(), b.key == "Enter" || b.key == "NumpadEnter" || b.key.length == 1 && R) {
          K(N);
          return;
        }
      }
    }
    const A = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Q() {
      setTimeout(() => {
        let b = As(`#${s.id}-tag li.active`);
        b && b.scrollIntoView(A);
      }, 0);
    }
    function W() {
      setTimeout(() => {
        let b = As(`#${s.id}-tag li.active`);
        b && ("scrollIntoViewIfNeeded" in b ? b.scrollIntoViewIfNeeded(A) : b.scrollIntoView(A));
      }, 0);
    }
    function K(b) {
      if (b.length === 0)
        return;
      const N = Array.from(i.value);
      N.indexOf(b) == -1 && N.push(b), V(N), _.value = "", d.value = !1;
    }
    function x(b) {
      var R;
      const N = (R = b.clipboardData) == null ? void 0 : R.getData("Text");
      te(N);
    }
    function te(b) {
      if (!b)
        return;
      const N = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), R = Array.from(i.value);
      b.split(N).map((L) => L.trim()).forEach((L) => {
        R.indexOf(L) == -1 && R.push(L);
      }), V(R), _.value = "";
    }
    return (b, N) => (o(), r("div", {
      class: g([b.$attrs.class]),
      id: `${b.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      p.value ? (o(), r("label", {
        key: 0,
        for: b.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${b.labelClass ?? ""}`)
      }, j(p.value), 11, vc)) : C("", !0),
      l("div", pc, [
        l("input", {
          type: "hidden",
          id: b.id,
          name: b.id,
          value: i.value.join(",")
        }, null, 8, mc),
        l("button", {
          class: g(T.value),
          onClick: qe(re, ["prevent"]),
          onFocus: N[2] || (N[2] = (R) => d.value = !0),
          tabindex: "-1"
        }, [
          l("div", hc, [
            (o(!0), r(Me, null, Ie(i.value, (R) => (o(), r("div", gc, [
              l("span", yc, [
                ke(j(R) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (h) => E(R),
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
                "onUpdate:modelValue": N[0] || (N[0] = (R) => _.value = R),
                "aria-invalid": k.value != null,
                "aria-describedby": `${b.id}-error`,
                onKeydown: z,
                onKeypress: se,
                onPaste: qe(x, ["prevent", "stop"]),
                onFocus: F,
                onBlur: ne,
                onClick: N[1] || (N[1] = (R) => d.value = !0)
              }, J(yt)(b.$attrs, ["class", "required"])), null, 16, $c), [
                [wo, _.value]
              ])
            ])
          ])
        ], 34),
        d.value && c.value.length ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: z,
          id: `${b.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Me, null, Ie(c.value.slice(0, b.maxVisibleItems), (R) => (o(), r("li", {
            class: g([R === u.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (h) => f(R),
            onClick: (h) => K(R),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", Lc, j(R), 1)
          ], 42, xc))), 256))
        ], 40, Cc)) : C("", !0),
        k.value ? (o(), r("div", Vc, Mc)) : C("", !0)
      ]),
      k.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${b.id}-error`
      }, j(k.value), 9, Ac)) : b.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${b.id}-description`
      }, j(b.help), 9, Fc)) : C("", !0)
    ], 10, fc));
  }
}), Dc = { class: "relative flex-grow mr-2 sm:mr-4" }, jc = ["for"], Oc = { class: "block mt-2" }, Bc = { class: "sr-only" }, Pc = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Hc = {
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
    const t = e, s = O(null), { assetsPathResolver: n, fallbackPathResolver: a } = Nt(), i = {}, u = O(), d = O(((I = t.files) == null ? void 0 : I.map(c)) || []);
    function c(F) {
      return F.filePath = n(F.filePath), F;
    }
    t.values && t.values.length > 0 && (d.value = t.values.map((F) => {
      let ne = F.replace(/\\/g, "/");
      return { fileName: cn(Pt(ne, "/"), "."), filePath: ne, contentType: al(ne) };
    }).map(c));
    const f = v(() => t.label ?? He(vt(t.id))), m = v(() => t.placeholder ?? f.value);
    let _ = We("ApiState", void 0);
    const w = v(() => _t.call({ responseStatus: t.status ?? (_ == null ? void 0 : _.error.value) }, t.id)), p = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      w.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), y = (F) => {
      let ne = F.target;
      u.value = "", d.value = Array.from(ne.files || []).map((V) => ({
        fileName: V.name,
        filePath: wl(V),
        contentLength: V.size,
        contentType: V.type || al(V.name)
      }));
    }, k = () => {
      var F;
      return (F = s.value) == null ? void 0 : F.click();
    }, T = (F) => F == null ? !1 : F.startsWith("data:") || F.startsWith("blob:"), E = v(() => {
      if (d.value.length > 0)
        return d.value[0].filePath;
      let F = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return F && It(n(F)) || null;
    }), re = (F) => !F || F.startsWith("data:") || F.endsWith(".svg") ? "" : "rounded-full object-cover";
    function D(F) {
      u.value = a(E.value);
    }
    return Et(Vn), (F, ne) => (o(), r("div", {
      class: g(["flex", F.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", Dc, [
        f.value ? (o(), r("label", {
          key: 0,
          for: F.id,
          class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${F.labelClass ?? ""}`)
        }, j(f.value), 11, jc)) : C("", !0),
        l("div", Oc, [
          l("span", Bc, j(F.help ?? f.value), 1),
          l("input", Ae({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: F.multiple,
            name: F.id,
            id: F.id,
            class: p.value,
            placeholder: m.value,
            "aria-invalid": w.value != null,
            "aria-describedby": `${F.id}-error`
          }, F.$attrs, { onChange: y }), null, 16, Pc),
          w.value ? (o(), r("div", Hc, Ec)) : C("", !0)
        ]),
        w.value ? (o(), r("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${F.id}-error`
        }, j(w.value), 9, zc)) : F.help ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${F.id}-description`
        }, j(F.help), 9, Nc)) : C("", !0)
      ]),
      F.multiple ? (o(), r("div", Kc, [
        l("table", Zc, [
          (o(!0), r(Me, null, Ie(d.value, (V) => (o(), r("tr", null, [
            l("td", Wc, [
              l("div", {
                class: "flex w-full",
                title: T(V.filePath) ? "" : V.filePath
              }, [
                l("img", {
                  src: i[J(It)(V.filePath)] || J(n)(J(It)(V.filePath)),
                  class: g(["mr-2 h-8 w-8", re(V.filePath)]),
                  onError: (z) => i[J(It)(V.filePath)] = J(a)(J(It)(V.filePath))
                }, null, 42, Jc),
                T(V.filePath) ? (o(), r("span", Yc, j(V.fileName), 1)) : (o(), r("a", {
                  key: 0,
                  href: J(n)(V.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, j(V.fileName), 9, Xc))
              ], 8, Gc)
            ]),
            l("td", e0, [
              V.contentLength && V.contentLength > 0 ? (o(), r("span", t0, j(J(_l)(V.contentLength)), 1)) : C("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), r("div", Uc, [
        E.value ? (o(), r("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: T(E.value) ? "" : E.value
        }, [
          l("img", {
            onClick: k,
            class: g(["h-16 w-16", re(E.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: u.value || J(n)(E.value),
            onError: D
          }, null, 42, Qc)
        ], 8, qc)) : C("", !0)
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
    const n = O(!1), a = e, i = s;
    t({ toggle: A });
    function u(x) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(x) >= 0;
    }
    const d = v(() => a.label ?? He(vt(a.id)));
    let c = We("ApiState", void 0);
    const f = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), m = v(() => [ft.base, f.value ? ft.invalid : ft.valid]), _ = O(null), w = O(""), p = O(null), y = O(a.viewCount), k = O([]), T = v(() => w.value ? a.options.filter((te) => a.match(te, w.value)).slice(0, y.value) : a.options), E = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function re(x) {
      p.value = x, k.value.indexOf(x) > Math.floor(y.value * 0.9) && (y.value += a.viewCount, K());
    }
    const D = [",", `
`, "	"];
    function I(x) {
      var b;
      const te = (b = x.clipboardData) == null ? void 0 : b.getData("Text");
      F(te);
    }
    function F(x) {
      if (!x)
        return;
      const te = D.some((b) => x.includes(b));
      if (!a.multiple || !te) {
        const b = a.options.filter((N) => a.match(N, x));
        b.length == 1 && (W(b[0]), n.value = !1, Ls());
      } else if (te) {
        const b = new RegExp("\\r|\\n|\\t|,"), R = x.split(b).filter((h) => h.trim()).map((h) => a.options.find((L) => a.match(L, h))).filter((h) => !!h);
        if (R.length > 0) {
          w.value = "", n.value = !1, p.value = null;
          let h = Array.from(a.modelValue || []);
          R.forEach((L) => {
            u(L) ? h = h.filter((ee) => ee != L) : h.push(L);
          }), i("update:modelValue", h), Ls();
        }
      }
    }
    function ne(x) {
      E.indexOf(x.code) || Q();
    }
    function V(x) {
      if (!(x.shiftKey || x.ctrlKey || x.altKey)) {
        if (!n.value) {
          x.code == "ArrowDown" && (n.value = !0, p.value = k.value[0]);
          return;
        }
        if (x.code == "Escape")
          n.value && (x.stopPropagation(), n.value = !1);
        else if (x.code == "Tab")
          n.value = !1;
        else if (x.code == "Home")
          p.value = k.value[0], q();
        else if (x.code == "End")
          p.value = k.value[k.value.length - 1], q();
        else if (x.code == "ArrowDown") {
          if (!p.value)
            p.value = k.value[0];
          else {
            const te = k.value.indexOf(p.value);
            p.value = te + 1 < k.value.length ? k.value[te + 1] : k.value[0];
          }
          se();
        } else if (x.code == "ArrowUp") {
          if (!p.value)
            p.value = k.value[k.value.length - 1];
          else {
            const te = k.value.indexOf(p.value);
            p.value = te - 1 >= 0 ? k.value[te - 1] : k.value[k.value.length - 1];
          }
          se();
        } else
          x.code == "Enter" && (p.value ? (W(p.value), a.multiple || (x.preventDefault(), Ls())) : n.value = !1);
      }
    }
    const z = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function q() {
      setTimeout(() => {
        let x = As(`#${a.id}-autocomplete li.active`);
        x && x.scrollIntoView(z);
      }, 0);
    }
    function se() {
      setTimeout(() => {
        let x = As(`#${a.id}-autocomplete li.active`);
        x && ("scrollIntoViewIfNeeded" in x ? x.scrollIntoViewIfNeeded(z) : x.scrollIntoView(z));
      }, 0);
    }
    function A(x) {
      var te;
      n.value = x, x && (Q(), (te = _.value) == null || te.focus());
    }
    function Q() {
      n.value = !0, K();
    }
    function W(x) {
      if (w.value = "", n.value = !1, a.multiple) {
        let te = Array.from(a.modelValue || []);
        u(x) ? te = te.filter((b) => b != x) : te.push(x), p.value = null, i("update:modelValue", te);
      } else {
        let te = x;
        a.modelValue == x && (te = null), i("update:modelValue", te);
      }
    }
    function K() {
      k.value = T.value;
    }
    return Lt(w, K), (x, te) => (o(), r("div", {
      id: `${x.id}-autocomplete`
    }, [
      d.value ? (o(), r("label", {
        key: 0,
        for: `${x.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, j(d.value), 9, n0)) : C("", !0),
      l("div", o0, [
        Bt(l("input", Ae({
          ref_key: "txtInput",
          ref: _,
          id: `${x.id}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autocomplete: "off",
          spellcheck: "false",
          "onUpdate:modelValue": te[0] || (te[0] = (b) => w.value = b),
          class: m.value,
          placeholder: x.multiple || !x.modelValue ? x.placeholder : "",
          onFocus: Q,
          onKeydown: V,
          onKeyup: ne,
          onClick: Q,
          onPaste: I,
          required: !1
        }, x.$attrs), null, 16, a0), [
          [ko, w.value]
        ]),
        l("button", {
          type: "button",
          onClick: te[1] || (te[1] = (b) => A(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, i0),
        n.value ? (o(), r("ul", {
          key: 0,
          class: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: V,
          id: `${x.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Me, null, Ie(k.value, (b) => (o(), r("li", {
            class: g([b === p.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (N) => re(b),
            onClick: (N) => W(b),
            role: "option",
            tabindex: "-1"
          }, [
            U(x.$slots, "item", Yt(Ms(b))),
            u(b) ? (o(), r("span", {
              key: 0,
              class: g(["absolute inset-y-0 right-0 flex items-center pr-4", b === p.value ? "text-white" : "text-indigo-600"])
            }, f0, 2)) : C("", !0)
          ], 42, d0))), 256))
        ], 40, u0)) : !x.multiple && x.modelValue ? (o(), r("div", {
          key: 1,
          onKeydown: V,
          onClick: te[2] || (te[2] = (b) => A(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          U(x.$slots, "item", Yt(Ms(x.modelValue)))
        ], 32)) : C("", !0),
        f.value ? (o(), r("div", v0, m0)) : C("", !0)
      ]),
      f.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${x.id}-error`
      }, j(f.value), 9, h0)) : x.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${x.id}-description`
      }, j(x.help), 9, g0)) : C("", !0)
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
    function i(p) {
      a("update:modelValue", p);
    }
    const u = v(() => n.multiple != null ? n.multiple : Array.isArray(n.modelValue)), d = O();
    function c(p, y) {
      return !y || p.value.toLowerCase().includes(y.toLowerCase());
    }
    const f = v(() => n.entries || (n.values ? n.values.map((p) => ({ key: p, value: p })) : n.options ? Object.keys(n.options).map((p) => ({ key: p, value: n.options[p] })) : [])), m = O(u.value ? [] : null);
    function _() {
      let p = n.modelValue && typeof n.modelValue == "object" ? n.modelValue.key : n.modelValue;
      p == null || p === "" ? m.value = u.value ? [] : null : typeof p == "string" ? m.value = f.value.find((y) => y.key === p) || null : Array.isArray(p) && (m.value = f.value.filter((y) => p.includes(y.key)));
    }
    ot(_);
    const w = v(() => m.value == null ? "" : Array.isArray(m.value) ? m.value.map((p) => encodeURIComponent(p.key)).join(",") : m.value.key);
    return (p, y) => {
      const k = Z("Autocomplete");
      return o(), r(Me, null, [
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
            y[0] || (y[0] = (T) => m.value = T),
            i
          ]
        }), {
          item: _e(({ key: T, value: E }) => [
            l("span", w0, j(E), 1)
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
    const s = e, n = t, a = v(() => s.input.type || "text"), i = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), u = v(() => yt(s.input, i)), d = O(a.value === "file" ? null : s.modelValue[s.input.id]);
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
      var D, I, F, ne, V, z, q, se, A, Q, W, K, x, te, b, N, R, h, L, ee, X, oe, B, S, ce, de, ie, pe;
      const _ = Z("SelectInput"), w = Z("CheckboxInput"), p = Z("TagInput"), y = Z("Combobox"), k = Z("FileInput"), T = Z("TextareaInput"), E = Z("MarkdownInput"), re = Z("TextInput");
      return J(Y).component(a.value) ? (o(), le(dn(J(Y).component(a.value)), Ae({
        key: 0,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[0] || (m[0] = (M) => d.value = M),
        status: (D = f.api) == null ? void 0 : D.error,
        "input-class": (I = f.input.css) == null ? void 0 : I.input,
        "label-class": (F = f.input.css) == null ? void 0 : F.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), le(_, Ae({
        key: 1,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[1] || (m[1] = (M) => d.value = M),
        status: (ne = f.api) == null ? void 0 : ne.error,
        "input-class": (V = f.input.css) == null ? void 0 : V.input,
        "label-class": (z = f.input.css) == null ? void 0 : z.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), le(w, Ae({
        key: 2,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[2] || (m[2] = (M) => d.value = M),
        status: (q = f.api) == null ? void 0 : q.error,
        "input-class": (se = f.input.css) == null ? void 0 : se.input,
        "label-class": (A = f.input.css) == null ? void 0 : A.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), le(p, Ae({
        key: 3,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[3] || (m[3] = (M) => d.value = M),
        status: (Q = f.api) == null ? void 0 : Q.error,
        "input-class": (W = f.input.css) == null ? void 0 : W.input,
        "label-class": (K = f.input.css) == null ? void 0 : K.label,
        allowableValues: f.input.allowableValues,
        string: ((x = f.input.prop) == null ? void 0 : x.type) == "String"
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
        status: (R = f.api) == null ? void 0 : R.error,
        modelValue: d.value,
        "onUpdate:modelValue": m[5] || (m[5] = (M) => d.value = M),
        "input-class": (h = f.input.css) == null ? void 0 : h.input,
        "label-class": (L = f.input.css) == null ? void 0 : L.label,
        files: c.value
      }, u.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), le(T, Ae({
        key: 6,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[6] || (m[6] = (M) => d.value = M),
        status: (ee = f.api) == null ? void 0 : ee.error,
        "input-class": (X = f.input.css) == null ? void 0 : X.input,
        "label-class": (oe = f.input.css) == null ? void 0 : oe.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), le(E, Ae({
        key: 7,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[7] || (m[7] = (M) => d.value = M),
        status: (B = f.api) == null ? void 0 : B.error,
        "input-class": (S = f.input.css) == null ? void 0 : S.input,
        "label-class": (ce = f.input.css) == null ? void 0 : ce.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), le(re, Ae({
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
}, I0 = { class: "w-full inline-flex truncate" }, D0 = { class: "text-blue-700 dark:text-blue-300 flex cursor-pointer" }, j0 = /* @__PURE__ */ l("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
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
], -1), O0 = ["id"], B0 = ["id"], P0 = /* @__PURE__ */ ue({
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
    const { config: s } = Nt(), { metadataApi: n } = dt(), a = e, i = t, u = v(() => a.id || a.input.id), d = v(() => a.label ?? He(vt(u.value)));
    let c = We("ApiState", void 0);
    const f = We("client"), m = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, u.value)), _ = O(""), w = O(""), p = v(() => we(a.modelValue, u.value)), y = v(() => ut(a.metadataType).find((D) => D.name.toLowerCase() == u.value.toLowerCase())), k = v(() => {
      var D, I, F;
      return ((F = pt((I = (D = y.value) == null ? void 0 : D.ref) == null ? void 0 : I.model)) == null ? void 0 : F.icon) || s.value.tableIcon;
    });
    let T;
    function E(D) {
      if (D) {
        if (T == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        T.openModal({ name: "ModalLookup", ref: D }, (I) => {
          if (console.debug("openModal", _.value, " -> ", I, Wt.setRefValue(D, I), D), I) {
            const F = we(I, D.refId);
            _.value = Wt.setRefValue(D, I) || F;
            const ne = J(a.modelValue);
            ne[u.value] = F, i("update:modelValue", ne);
          }
        });
      }
    }
    function re() {
      a.modelValue[u.value] = null, _.value = "";
    }
    return ot(async () => {
      var q, se;
      T = We("ModalProvider", void 0);
      const D = a.modelValue;
      a.modelValue[u.value] || (a.modelValue[u.value] = null);
      const I = y.value, F = I == null ? void 0 : I.ref;
      if (!F) {
        console.warn(`No RefInfo for property '${u.value}'`);
        return;
      }
      _.value = "";
      let ne = F.selfId == null ? we(D, I.name) : we(D, F.selfId);
      const V = Xt(ne);
      if (console.log("refIdValue", ne, Xt(ne), D, F), V && (ne = we(D, F.refId)), ne == null)
        return;
      const z = (q = n.value) == null ? void 0 : q.operations.find((A) => {
        var Q;
        return ((Q = A.dataModel) == null ? void 0 : Q.name) == F.model;
      });
      if (console.debug("LookupInput queryOp", z), z != null) {
        const A = we(D, I.name);
        if (Xt(A))
          return;
        if (_.value = `${A}`, w.value = I.name, F.refLabel != null) {
          const Q = ut(a.metadataType).filter((x) => x.type == F.model);
          Q.length || console.warn(`Could not find ${F.model} Property on ${a.metadataType.name}`);
          const W = Q.map((x) => we(D, x.name)).filter((x) => !!x), K = W.length <= 1 ? W[0] : W.find((x) => x[F.refId ?? "id"] == ne);
          if (K != null) {
            let x = we(K, F.refLabel);
            x && (_.value = `${x}`, Wt.setValue(F.model, ne, F.refLabel, x));
          } else {
            const x = ((se = I.attributes) == null ? void 0 : se.some((b) => b.name == "Computed")) == !0;
            let te = await Wt.getOrFetchValue(f, n.value, F.model, F.refId, F.refLabel, x, ne);
            _.value = te || `${F.model}: ${_.value}`;
          }
        }
      }
    }), (D, I) => {
      var ne;
      const F = Z("Icon");
      return o(), r("div", $0, [
        l("input", {
          type: "hidden",
          name: u.value,
          value: p.value
        }, null, 8, C0),
        d.value ? (o(), r("div", x0, [
          l("label", {
            for: u.value,
            class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${D.labelClass ?? ""}`)
          }, j(d.value), 11, L0),
          p.value ? (o(), r("div", V0, [
            l("span", S0, j(p.value), 1),
            l("button", {
              onClick: re,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, F0)
          ])) : C("", !0)
        ])) : C("", !0),
        (ne = y.value) != null && ne.ref ? (o(), r("div", T0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: I[0] || (I[0] = (V) => E(y.value.ref)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", I0, [
              l("span", D0, [
                ge(F, {
                  class: "mr-1 w-5 h-5",
                  image: k.value
                }, null, 8, ["image"]),
                l("span", null, j(_.value), 1)
              ])
            ]),
            j0
          ])
        ])) : C("", !0),
        m.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${u.value}-error`
        }, j(m.value), 9, O0)) : D.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${u.value}-description`
        }, j(D.help), 9, B0)) : C("", !0)
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
    t({ forceUpdate: i, props: n, updateValue: d });
    function i() {
      var I;
      const D = Pe();
      (I = D == null ? void 0 : D.proxy) == null || I.$forceUpdate();
    }
    function u(D, I) {
      d(D.id, we(I, D.id));
    }
    function d(D, I) {
      n.modelValue[D] = I, a("update:modelValue", n.modelValue), i();
    }
    const { metadataApi: c, apiOf: f, typeOf: m, typeOfRef: _, createFormLayout: w, Crud: p } = dt(), y = v(() => n.type || zt(n.modelValue)), k = v(() => n.metaType ?? m(y.value)), T = v(() => {
      var D, I;
      return _((I = (D = c.value) == null ? void 0 : D.operations.find((F) => F.request.name == y.value)) == null ? void 0 : I.dataModel) || k.value;
    });
    function E() {
      const D = k.value;
      if (!D) {
        if (n.formLayout) {
          const q = n.formLayout.map((se) => {
            const A = { name: se.id, type: Ia(se.type) }, Q = Object.assign({ prop: A }, se);
            return n.configureField && n.configureField(Q), Q;
          });
          return n.configureFormLayout && n.configureFormLayout(q), q;
        }
        throw new Error(`MetadataType for ${y.value} not found`);
      }
      const I = ut(D), F = T.value, ne = n.formLayout ? Array.from(n.formLayout) : w(D), V = [], z = f(D.name);
      return ne.forEach((q) => {
        var W;
        const se = I.find((K) => K.name == q.name);
        if (q.ignore)
          return;
        const A = ((W = F == null ? void 0 : F.properties) == null ? void 0 : W.find((K) => {
          var x;
          return K.name.toLowerCase() == ((x = q.name) == null ? void 0 : x.toLowerCase());
        })) ?? se, Q = Object.assign({ prop: A, op: z }, q);
        n.configureField && n.configureField(Q), V.push(Q);
      }), n.configureFormLayout && n.configureFormLayout(V), V;
    }
    const re = () => E().filter((D) => D.type != "hidden").map((D) => D.id);
    return (D, I) => {
      var z;
      const F = Z("ErrorSummary"), ne = Z("LookupInput"), V = Z("DynamicInput");
      return o(), r(Me, null, [
        D.hideSummary ? C("", !0) : (o(), le(F, {
          key: 0,
          status: (z = D.api) == null ? void 0 : z.error,
          except: re()
        }, null, 8, ["status", "except"])),
        l("div", {
          class: g(D.flexClass)
        }, [
          l("div", {
            class: g(D.divideClass)
          }, [
            l("div", {
              class: g(D.spaceClass)
            }, [
              l("fieldset", {
                class: g(D.fieldsetClass)
              }, [
                (o(!0), r(Me, null, Ie(E(), (q) => {
                  var se, A, Q;
                  return o(), r("div", {
                    key: q.id,
                    class: g([
                      "w-full",
                      ((se = q.css) == null ? void 0 : se.field) ?? (q.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (q.type == "checkbox" ? " flex items-center" : "")),
                      q.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    ((A = q.prop) == null ? void 0 : A.ref) != null && q.type != "file" && !q.prop.isPrimaryKey ? (o(), le(ne, {
                      key: 0,
                      metadataType: T.value,
                      input: q,
                      modelValue: D.modelValue,
                      "onUpdate:modelValue": (W) => u(q, W),
                      status: (Q = D.api) == null ? void 0 : Q.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), le(V, {
                      key: 1,
                      input: q,
                      modelValue: D.modelValue,
                      "onUpdate:modelValue": I[0] || (I[0] = (W) => D.$emit("update:modelValue", W)),
                      api: D.api
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
function ys(e) {
  const t = O(!1), s = O(), n = O(), a = e ?? We("client");
  function i({ message: y, errorCode: k, fieldName: T, errors: E }) {
    return k || (k = "Exception"), E || (E = []), s.value = T ? new Js({
      errorCode: k,
      message: y,
      errors: [new Yl({ fieldName: T, errorCode: k, message: y })]
    }) : new Js({ errorCode: k, message: y, errors: E });
  }
  function u({ fieldName: y, message: k, errorCode: T }) {
    if (T || (T = "Exception"), !s.value)
      i({ fieldName: y, message: k, errorCode: T });
    else {
      let E = new Js(s.value);
      E.errors = [
        ...(E.errors || []).filter((re) => {
          var D;
          return ((D = re.fieldName) == null ? void 0 : D.toLowerCase()) !== (y == null ? void 0 : y.toLowerCase());
        }),
        new Yl({ fieldName: y, message: k, errorCode: T })
      ], s.value = E;
    }
  }
  async function d(y, k, T) {
    t.value = !0;
    let E = await a.api(Zt(y), k, T);
    return t.value = !1, n.value = E.response, s.value = E.error, E;
  }
  async function c(y, k, T) {
    t.value = !0;
    let E = await a.apiVoid(Zt(y), k, T);
    return t.value = !1, n.value = E.response, s.value = E.error, E;
  }
  async function f(y, k, T, E) {
    t.value = !0;
    let re = await a.apiForm(Zt(y), k, T, E);
    return t.value = !1, n.value = re.response, s.value = re.error, re;
  }
  async function m(y, k, T, E) {
    t.value = !0;
    let re = await a.apiFormVoid(Zt(y), k, T, E);
    return t.value = !1, n.value = re.response, s.value = re.error, re;
  }
  async function _(y, k, T, E) {
    return wn(a, y, k, T, E);
  }
  function w(y, k) {
    const T = O(new tt()), E = kn(async (re) => {
      T.value = await a.api(re);
    }, k == null ? void 0 : k.delayMs);
    return Ss(async () => {
      const re = y(), D = gl(Hs(re));
      D && (T.value = new tt({ response: D })), (k == null ? void 0 : k.delayMs) === 0 ? T.value = await a.api(re) : E(re);
    }), (async () => T.value = await a.api(y(), k == null ? void 0 : k.args, k == null ? void 0 : k.method))(), T;
  }
  let p = { setError: i, addFieldError: u, loading: t, error: s, api: d, apiVoid: c, apiForm: f, apiFormVoid: m, swr: _, swrEffect: w, unRefs: Zt, setRef: yn };
  return ps("ApiState", p), p;
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
    const n = e, a = s, i = O(), u = O(1), d = O();
    function c() {
      var ce;
      u.value++, W.value = Q();
      const S = Pe();
      (ce = S == null ? void 0 : S.proxy) == null || ce.$forceUpdate();
    }
    async function f(S) {
      Object.assign(W.value, S), c(), await Ot(() => null);
    }
    ps("ModalProvider", {
      openModal: p
    });
    const _ = O(), w = O();
    function p(S, ce) {
      _.value = S, w.value = ce;
    }
    async function y(S) {
      w.value && w.value(S), _.value = void 0, w.value = void 0;
    }
    const k = ys(), { getTypeName: T } = _n(), { typeOf: E, Crud: re, createDto: D } = dt(), I = O(new tt()), F = v(() => n.panelClass || Ee.panelClass(n.formStyle)), ne = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : Gt.formClass), V = v(() => n.headingClass || Ee.headingClass(n.formStyle)), z = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), q = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : Ee.buttonsClass), se = v(() => {
      var S;
      return n.type ? T(n.type) : (S = n.modelValue) != null && S.getTypeName ? n.modelValue.getTypeName() : null;
    }), A = v(() => n.metaType ?? E(se.value)), Q = () => n.modelValue || te(), W = O(Q()), K = v(() => k.loading.value), x = v(() => {
      var S;
      return n.heading != null ? n.heading : ((S = A.value) == null ? void 0 : S.description) || He(se.value);
    });
    t({ forceUpdate: c, props: n, setModel: f, formFields: i, submit: N, close: oe, model: W });
    function te() {
      return typeof n.type == "string" ? D(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function b(S) {
      if (!S || S.tagName != "FORM") {
        console.error("Not a valid form", S);
        return;
      }
      const ce = te();
      let de = Ze(ce == null ? void 0 : ce.getMethod, (M) => typeof M == "function" ? M() : null) || "POST", ie = Ze(ce == null ? void 0 : ce.createResponse, (M) => typeof M == "function" ? M() : null) == null;
      const pe = n.jsconfig;
      if (pl.hasRequestBody(de)) {
        let M = new ce.constructor(), ve = new FormData(S);
        ie ? I.value = await k.apiFormVoid(M, ve, { jsconfig: pe }) : I.value = await k.apiForm(M, ve, { jsconfig: pe });
      } else {
        let M = new ce.constructor(Po(W.value));
        console.debug("AutoForm.submit", M), ie ? I.value = await k.apiVoid(M, { jsconfig: pe }) : I.value = await k.api(M, { jsconfig: pe });
      }
      I.value.succeeded ? (a("success", I.value.response), oe()) : a("error", I.value.error);
    }
    async function N() {
      b(d.value);
    }
    function R(S) {
      a("update:modelValue", S);
    }
    function h() {
      a("done");
    }
    const L = O(!1), ee = O(""), X = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(L, () => {
      xt(X, ee, L.value), L.value || setTimeout(h, 700);
    }), L.value = !0;
    function oe() {
      n.formStyle == "slideOver" ? L.value = !1 : h();
    }
    const B = (S) => {
      S.key === "Escape" && oe();
    };
    return ot(() => window.addEventListener("keydown", B)), Et(() => window.removeEventListener("keydown", B)), (S, ce) => {
      var Ve, he, je, Oe, xe, Qe, Re, Be, Ge, st, Je;
      const de = Z("AutoFormFields"), ie = Z("FormLoading"), pe = Z("PrimaryButton"), M = Z("CloseButton"), ve = Z("SecondaryButton"), Ce = Z("ModalLookup");
      return o(), r("div", null, [
        A.value ? S.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(F.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: d,
            onSubmit: ce[0] || (ce[0] = qe((Fe) => b(Fe.target), ["prevent"])),
            autocomplete: "off",
            class: g(S.innerFormClass)
          }, [
            l("div", {
              class: g(S.bodyClass)
            }, [
              l("div", {
                class: g(S.headerClass)
              }, [
                S.$slots.heading ? (o(), r("div", N0, [
                  U(S.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: g(V.value)
                }, j(x.value), 3)),
                S.$slots.subheading ? (o(), r("div", U0, [
                  U(S.$slots, "subheading")
                ])) : S.subHeading ? (o(), r("p", {
                  key: 3,
                  class: g(z.value)
                }, j(S.subHeading), 3)) : (Ve = A.value) != null && Ve.notes ? (o(), r("p", {
                  key: 4,
                  class: g(["notes", z.value]),
                  innerHTML: (he = A.value) == null ? void 0 : he.notes
                }, null, 10, q0)) : C("", !0)
              ], 2),
              U(S.$slots, "header", {
                instance: (je = Pe()) == null ? void 0 : je.exposed,
                model: W.value
              }),
              Q0,
              (o(), le(de, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                type: S.type,
                modelValue: W.value,
                "onUpdate:modelValue": R,
                api: I.value,
                configureField: S.configureField,
                configureFormLayout: S.configureFormLayout
              }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
              U(S.$slots, "footer", {
                instance: (Oe = Pe()) == null ? void 0 : Oe.exposed,
                model: W.value
              })
            ], 2),
            U(S.$slots, "buttons", {}, () => {
              var Fe, lt;
              return [
                l("div", {
                  class: g(q.value)
                }, [
                  l("div", null, [
                    U(S.$slots, "leftbuttons", {
                      instance: (Fe = Pe()) == null ? void 0 : Fe.exposed,
                      model: W.value
                    })
                  ]),
                  l("div", null, [
                    S.showLoading && K.value ? (o(), le(ie, { key: 0 })) : C("", !0)
                  ]),
                  l("div", K0, [
                    Z0,
                    ge(pe, {
                      disabled: S.allowSubmit ? !S.allowSubmit(W.value) : !1
                    }, {
                      default: _e(() => [
                        ke(j(S.submitLabel), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    U(S.$slots, "rightbuttons", {
                      instance: (lt = Pe()) == null ? void 0 : lt.exposed,
                      model: W.value
                    })
                  ])
                ], 2)
              ];
            })
          ], 34)
        ], 2)) : (o(), r("div", W0, [
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
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ee.value])
                }, [
                  l("form", {
                    ref_key: "elForm",
                    ref: d,
                    class: g(ne.value),
                    onSubmit: ce[1] || (ce[1] = qe((Fe) => b(Fe.target), ["prevent"]))
                  }, [
                    l("div", X0, [
                      l("div", Y0, [
                        l("div", ef, [
                          l("div", tf, [
                            l("div", sf, [
                              S.$slots.heading ? (o(), r("div", lf, [
                                U(S.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(V.value)
                              }, j(x.value), 3)),
                              S.$slots.subheading ? (o(), r("div", nf, [
                                U(S.$slots, "subheading")
                              ])) : S.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(z.value)
                              }, j(S.subHeading), 3)) : (xe = A.value) != null && xe.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", z.value]),
                                innerHTML: (Qe = A.value) == null ? void 0 : Qe.notes
                              }, null, 10, of)) : C("", !0)
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
                          model: W.value
                        }),
                        (o(), le(de, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          type: S.type,
                          modelValue: W.value,
                          "onUpdate:modelValue": R,
                          api: I.value,
                          configureField: S.configureField,
                          configureFormLayout: S.configureFormLayout
                        }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
                        U(S.$slots, "footer", {
                          instance: (Be = Pe()) == null ? void 0 : Be.exposed,
                          model: W.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: g(q.value)
                    }, [
                      l("div", null, [
                        U(S.$slots, "leftbuttons", {
                          instance: (Ge = Pe()) == null ? void 0 : Ge.exposed,
                          model: W.value
                        })
                      ]),
                      l("div", null, [
                        S.showLoading && K.value ? (o(), le(ie, { key: 0 })) : C("", !0)
                      ]),
                      l("div", rf, [
                        ge(ve, {
                          onClick: oe,
                          disabled: K.value
                        }, {
                          default: _e(() => [
                            ke("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        ge(pe, {
                          class: "ml-4",
                          disabled: S.allowSubmit ? !S.allowSubmit(W.value) : !1
                        }, {
                          default: _e(() => [
                            ke(j(S.submitLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        U(S.$slots, "rightbuttons", {
                          instance: (st = Pe()) == null ? void 0 : st.exposed,
                          model: W.value
                        })
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", R0, [
          l("p", E0, [
            ke("Could not create form for unknown "),
            z0,
            ke(" " + j(se.value), 1)
          ])
        ])),
        ((Je = _.value) == null ? void 0 : Je.name) == "ModalLookup" && _.value.ref ? (o(), le(Ce, {
          key: 3,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: S.configureField
        }, null, 8, ["ref-info", "configureField"])) : C("", !0)
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
    const n = e, a = s, i = O(), u = O(1);
    function d() {
      var S, ce;
      u.value++, (S = i.value) == null || S.forceUpdate();
      const B = Pe();
      (ce = B == null ? void 0 : B.proxy) == null || ce.$forceUpdate();
    }
    function c(B) {
      Object.assign(V.value, B), d();
    }
    function f(B) {
    }
    ps("ModalProvider", {
      openModal: p
    });
    const _ = O(), w = O();
    function p(B, S) {
      _.value = B, w.value = S;
    }
    async function y(B) {
      w.value && w.value(B), _.value = void 0, w.value = void 0;
    }
    const { typeOf: k, typeProperties: T, Crud: E, createDto: re, formValues: D } = dt(), I = v(() => zt(n.type)), F = v(() => k(I.value)), V = O((() => typeof n.type == "string" ? re(n.type) : n.type ? new n.type() : null)());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: V });
    const z = v(() => n.panelClass || Ee.panelClass(n.formStyle)), q = v(() => n.formClass || Ee.formClass(n.formStyle)), se = v(() => n.headingClass || Ee.headingClass(n.formStyle)), A = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), Q = v(() => n.buttonsClass || Ee.buttonsClass), W = v(() => E.model(F.value)), K = v(() => {
      var B;
      return n.heading || ((B = k(I.value)) == null ? void 0 : B.description) || (W.value ? `New ${He(W.value)}` : He(I.value));
    }), x = O(new tt());
    let te = ys(), b = v(() => te.loading.value);
    Y.interceptors.has("AutoCreateForm.new") && Y.interceptors.invoke("AutoCreateForm.new", { props: n, model: V });
    async function N(B) {
      var ie, pe;
      let S = B.target;
      if (!n.autosave) {
        a("save", new V.value.constructor(D(S, T(F.value))));
        return;
      }
      let ce = Ze((ie = V.value) == null ? void 0 : ie.getMethod, (M) => typeof M == "function" ? M() : null) || "POST", de = Ze((pe = V.value) == null ? void 0 : pe.createResponse, (M) => typeof M == "function" ? M() : null) == null;
      if (pl.hasRequestBody(ce)) {
        let M = new V.value.constructor(), ve = new FormData(S);
        de ? x.value = await te.apiFormVoid(M, ve, { jsconfig: "eccn" }) : x.value = await te.apiForm(M, ve, { jsconfig: "eccn" });
      } else {
        let M = D(S, T(F.value)), ve = new V.value.constructor(M);
        de ? x.value = await te.apiVoid(ve, { jsconfig: "eccn" }) : x.value = await te.api(ve, { jsconfig: "eccn" });
      }
      x.value.succeeded ? (S.reset(), a("save", x.value.response)) : a("error", x.value.error);
    }
    function R() {
      a("done");
    }
    const h = O(!1), L = O(""), ee = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(h, () => {
      xt(ee, L, h.value), h.value || setTimeout(R, 700);
    }), h.value = !0;
    function X() {
      n.formStyle == "slideOver" ? h.value = !1 : R();
    }
    const oe = (B) => {
      B.key === "Escape" && X();
    };
    return ot(() => window.addEventListener("keydown", oe)), Et(() => window.removeEventListener("keydown", oe)), (B, S) => {
      var Ce, Ve, he, je, Oe, xe, Qe, Re, Be;
      const ce = Z("AutoFormFields"), de = Z("FormLoading"), ie = Z("SecondaryButton"), pe = Z("PrimaryButton"), M = Z("CloseButton"), ve = Z("ModalLookup");
      return o(), r("div", null, [
        F.value ? B.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(z.value)
        }, [
          l("form", {
            onSubmit: qe(N, ["prevent"])
          }, [
            l("div", {
              class: g(q.value)
            }, [
              l("div", null, [
                B.$slots.heading ? (o(), r("div", vf, [
                  U(B.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: g(se.value)
                }, j(K.value), 3)),
                B.$slots.subheading ? (o(), r("div", pf, [
                  U(B.$slots, "subheading")
                ])) : B.subHeading ? (o(), r("p", {
                  key: 3,
                  class: g(A.value)
                }, j(B.subHeading), 3)) : (Ce = F.value) != null && Ce.notes ? (o(), r("p", {
                  key: 4,
                  class: g(["notes", A.value]),
                  innerHTML: (Ve = F.value) == null ? void 0 : Ve.notes
                }, null, 10, mf)) : C("", !0)
              ]),
              U(B.$slots, "header", {
                formInstance: (he = Pe()) == null ? void 0 : he.exposed,
                model: V.value
              }),
              (o(), le(ce, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: V.value,
                "onUpdate:modelValue": f,
                api: x.value,
                configureField: B.configureField,
                configureFormLayout: B.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(B.$slots, "footer", {
                formInstance: (je = Pe()) == null ? void 0 : je.exposed,
                model: V.value
              })
            ], 2),
            l("div", {
              class: g(Q.value)
            }, [
              l("div", null, [
                B.showLoading && J(b) ? (o(), le(de, { key: 0 })) : C("", !0)
              ]),
              l("div", hf, [
                B.showCancel ? (o(), le(ie, {
                  key: 0,
                  onClick: X,
                  disabled: J(b)
                }, {
                  default: _e(() => [
                    ke("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : C("", !0),
                ge(pe, {
                  type: "submit",
                  class: "ml-4",
                  disabled: J(b)
                }, {
                  default: _e(() => [
                    ke("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", gf, [
          yf,
          l("div", bf, [
            l("div", {
              onMousedown: X,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: S[0] || (S[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", L.value])
                }, [
                  l("form", {
                    class: g(q.value),
                    onSubmit: qe(N, ["prevent"])
                  }, [
                    l("div", wf, [
                      l("div", kf, [
                        l("div", _f, [
                          l("div", $f, [
                            l("div", Cf, [
                              B.$slots.heading ? (o(), r("div", xf, [
                                U(B.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(se.value)
                              }, j(K.value), 3)),
                              B.$slots.subheading ? (o(), r("div", Lf, [
                                U(B.$slots, "subheading")
                              ])) : B.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(A.value)
                              }, j(B.subHeading), 3)) : (Oe = F.value) != null && Oe.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", A.value]),
                                innerHTML: (xe = F.value) == null ? void 0 : xe.notes
                              }, null, 10, Vf)) : C("", !0)
                            ]),
                            l("div", Sf, [
                              ge(M, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: X
                              })
                            ])
                          ])
                        ]),
                        U(B.$slots, "header", {
                          formInstance: (Qe = Pe()) == null ? void 0 : Qe.exposed,
                          model: V.value
                        }),
                        (o(), le(ce, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: V.value,
                          "onUpdate:modelValue": f,
                          api: x.value,
                          configureField: B.configureField,
                          configureFormLayout: B.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
                        U(B.$slots, "footer", {
                          formInstance: (Re = Pe()) == null ? void 0 : Re.exposed,
                          model: V.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: g(Q.value)
                    }, [
                      l("div", null, [
                        B.showLoading && J(b) ? (o(), le(de, { key: 0 })) : C("", !0)
                      ]),
                      l("div", Mf, [
                        B.showCancel ? (o(), le(ie, {
                          key: 0,
                          onClick: X,
                          disabled: J(b)
                        }, {
                          default: _e(() => [
                            ke("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : C("", !0),
                        ge(pe, {
                          type: "submit",
                          class: "ml-4",
                          disabled: J(b)
                        }, {
                          default: _e(() => [
                            ke("Save")
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
        ])) : (o(), r("div", df, [
          l("p", cf, [
            ke("Could not create form for unknown "),
            ff,
            ke(" " + j(I.value), 1)
          ])
        ])),
        ((Be = _.value) == null ? void 0 : Be.name) == "ModalLookup" && _.value.ref ? (o(), le(ve, {
          key: 3,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: B.configureField
        }, null, 8, ["ref-info", "configureField"])) : C("", !0)
      ]);
    };
  }
}), Ff = { key: 0 }, Tf = { class: "text-red-700" }, If = /* @__PURE__ */ l("b", null, "type", -1), Df = { key: 0 }, jf = { key: 2 }, Of = ["innerHTML"], Bf = { class: "flex justify-end" }, Pf = {
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
    const n = e, a = s, i = O(), u = O(1);
    function d() {
      var ve;
      u.value++, se.value = q();
      const M = Pe();
      (ve = M == null ? void 0 : M.proxy) == null || ve.$forceUpdate();
    }
    function c(M) {
      Object.assign(se.value, M);
    }
    function f(M) {
    }
    ps("ModalProvider", {
      openModal: p
    });
    const _ = O(), w = O();
    function p(M, ve) {
      _.value = M, w.value = ve;
    }
    async function y(M) {
      w.value && w.value(M), _.value = void 0, w.value = void 0;
    }
    const { typeOf: k, apiOf: T, typeProperties: E, createFormLayout: re, getPrimaryKey: D, Crud: I, createDto: F, formValues: ne } = dt(), V = v(() => zt(n.type)), z = v(() => k(V.value)), q = () => typeof n.type == "string" ? F(n.type, us(n.modelValue)) : n.type ? new n.type(us(n.modelValue)) : null, se = O(q());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: se });
    const A = v(() => n.panelClass || Ee.panelClass(n.formStyle)), Q = v(() => n.formClass || Ee.formClass(n.formStyle)), W = v(() => n.headingClass || Ee.headingClass(n.formStyle)), K = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), x = v(() => I.model(z.value)), te = v(() => {
      var M;
      return n.heading || ((M = k(V.value)) == null ? void 0 : M.description) || (x.value ? `Update ${He(x.value)}` : He(V.value));
    }), b = O(new tt());
    let N = Object.assign({}, us(n.modelValue));
    Y.interceptors.has("AutoEditForm.new") && Y.interceptors.invoke("AutoEditForm.new", { props: n, model: se, origModel: N });
    let R = ys(), h = v(() => R.loading.value);
    const L = () => Ze(k(I.model(z.value)), (M) => D(M));
    function ee(M) {
      const { op: ve, prop: Ce } = M;
      ve && (I.isPatch(ve) || I.isUpdate(ve)) && (M.disabled = Ce == null ? void 0 : Ce.isPrimaryKey), n.configureField && n.configureField(M);
    }
    async function X(M) {
      var je, Oe;
      let ve = M.target;
      if (!n.autosave) {
        a("save", new se.value.constructor(ne(ve, E(z.value))));
        return;
      }
      let Ce = Ze((je = se.value) == null ? void 0 : je.getMethod, (xe) => typeof xe == "function" ? xe() : null) || "POST", Ve = Ze((Oe = se.value) == null ? void 0 : Oe.createResponse, (xe) => typeof xe == "function" ? xe() : null) == null, he = L();
      if (pl.hasRequestBody(Ce)) {
        let xe = new se.value.constructor(), Qe = we(n.modelValue, he.name), Re = new FormData(ve);
        he && !Array.from(Re.keys()).some((Je) => Je.toLowerCase() == he.name.toLowerCase()) && Re.append(he.name, Qe);
        let Be = [];
        const Ge = V.value && T(V.value);
        if (Ge && I.isPatch(Ge)) {
          let Je = re(z.value), Fe = {};
          if (he && (Fe[he.name] = Qe), Je.forEach((ze) => {
            let at = ze.id, H = we(N, at);
            if (he && he.name.toLowerCase() === at.toLowerCase())
              return;
            let G = Re.get(at);
            Y.interceptors.has("AutoEditForm.save.formLayout") && Y.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: H, formLayout: Je, input: ze, newValue: G });
            let be = G != null, De = ze.type === "checkbox" ? be !== !!H : ze.type === "file" ? be : G != H;
            !G && !H && (De = !1), De && (G ? Fe[at] = G : ze.type !== "file" && Be.push(at));
          }), Y.interceptors.has("AutoEditForm.save") && Y.interceptors.invoke("AutoEditForm.save", { origModel: N, formLayout: Je, dirtyValues: Fe }), Array.from(Re.keys()).filter((ze) => !Fe[ze]).forEach((ze) => Re.delete(ze)), Array.from(Re.keys()).filter((ze) => ze.toLowerCase() != he.name.toLowerCase()).length == 0 && Be.length == 0) {
            ie();
            return;
          }
        }
        const st = Be.length > 0 ? { jsconfig: "eccn", reset: Be } : { jsconfig: "eccn" };
        Ve ? b.value = await R.apiFormVoid(xe, Re, st) : b.value = await R.apiForm(xe, Re, st);
      } else {
        let xe = ne(ve, E(z.value));
        he && !we(xe, he.name) && (xe[he.name] = we(n.modelValue, he.name));
        let Qe = new se.value.constructor(xe);
        Ve ? b.value = await R.apiVoid(Qe, { jsconfig: "eccn" }) : b.value = await R.api(Qe, { jsconfig: "eccn" });
      }
      b.value.succeeded ? (ve.reset(), a("save", b.value.response)) : a("error", b.value.error);
    }
    async function oe(M) {
      let ve = L();
      const Ce = ve ? we(n.modelValue, ve.name) : null;
      if (!Ce) {
        console.error(`Could not find Primary Key for Type ${V.value} (${x.value})`);
        return;
      }
      const Ve = { [ve.name]: Ce }, he = typeof n.deleteType == "string" ? F(n.deleteType, Ve) : n.deleteType ? new n.deleteType(Ve) : null;
      Ze(he.createResponse, (Oe) => typeof Oe == "function" ? Oe() : null) == null ? b.value = await R.apiVoid(he) : b.value = await R.api(he), b.value.succeeded ? a("delete", b.value.response) : a("error", b.value.error);
    }
    function B() {
      a("done");
    }
    const S = O(!1), ce = O(""), de = {
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
      var Re, Be, Ge, st, Je, Fe, lt, ze, at;
      const Ce = Z("AutoFormFields"), Ve = Z("ConfirmDelete"), he = Z("FormLoading"), je = Z("SecondaryButton"), Oe = Z("PrimaryButton"), xe = Z("CloseButton"), Qe = Z("ModalLookup");
      return o(), r("div", null, [
        z.value ? M.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(A.value)
        }, [
          l("form", {
            onSubmit: qe(X, ["prevent"])
          }, [
            l("div", {
              class: g(Q.value)
            }, [
              l("div", null, [
                M.$slots.heading ? (o(), r("div", Df, [
                  U(M.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: g(W.value)
                }, j(te.value), 3)),
                M.$slots.subheading ? (o(), r("div", jf, [
                  U(M.$slots, "subheading")
                ])) : M.subHeading ? (o(), r("p", {
                  key: 3,
                  class: g(K.value)
                }, j(M.subHeading), 3)) : (Re = z.value) != null && Re.notes ? (o(), r("p", {
                  key: 4,
                  class: g(["notes", K.value]),
                  innerHTML: (Be = z.value) == null ? void 0 : Be.notes
                }, null, 10, Of)) : C("", !0)
              ]),
              U(M.$slots, "header", {
                formInstance: (Ge = Pe()) == null ? void 0 : Ge.exposed,
                model: se.value
              }),
              (o(), le(Ce, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: se.value,
                "onUpdate:modelValue": f,
                api: b.value,
                configureField: M.configureField,
                configureFormLayout: M.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(M.$slots, "footer", {
                formInstance: (st = Pe()) == null ? void 0 : st.exposed,
                model: se.value
              })
            ], 2),
            l("div", {
              class: g(J(Ee).buttonsClass)
            }, [
              l("div", null, [
                M.deleteType ? (o(), le(Ve, {
                  key: 0,
                  onDelete: oe
                })) : C("", !0)
              ]),
              l("div", null, [
                M.showLoading && J(h) ? (o(), le(he, { key: 0 })) : C("", !0)
              ]),
              l("div", Bf, [
                ge(je, {
                  onClick: ie,
                  disabled: J(h)
                }, {
                  default: _e(() => [
                    ke("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                ge(Oe, {
                  type: "submit",
                  class: "ml-4",
                  disabled: J(h)
                }, {
                  default: _e(() => [
                    ke("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", Pf, [
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
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ce.value])
                }, [
                  l("form", {
                    class: g(Q.value),
                    onSubmit: qe(X, ["prevent"])
                  }, [
                    l("div", Ef, [
                      l("div", zf, [
                        l("div", Nf, [
                          l("div", Uf, [
                            l("div", qf, [
                              M.$slots.heading ? (o(), r("div", Qf, [
                                U(M.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(W.value)
                              }, j(te.value), 3)),
                              M.$slots.subheading ? (o(), r("div", Kf, [
                                U(M.$slots, "subheading")
                              ])) : M.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(K.value)
                              }, j(M.subHeading), 3)) : (Je = z.value) != null && Je.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", K.value]),
                                innerHTML: (Fe = z.value) == null ? void 0 : Fe.notes
                              }, null, 10, Zf)) : C("", !0)
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
                          formInstance: (lt = Pe()) == null ? void 0 : lt.exposed,
                          model: se.value
                        }),
                        (o(), le(Ce, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: se.value,
                          "onUpdate:modelValue": f,
                          api: b.value,
                          configureField: ee,
                          configureFormLayout: M.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        U(M.$slots, "footer", {
                          formInstance: (ze = Pe()) == null ? void 0 : ze.exposed,
                          model: se.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: g(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        M.deleteType ? (o(), le(Ve, {
                          key: 0,
                          onDelete: oe
                        })) : C("", !0)
                      ]),
                      l("div", null, [
                        M.showLoading && J(h) ? (o(), le(he, { key: 0 })) : C("", !0)
                      ]),
                      l("div", Gf, [
                        ge(je, {
                          onClick: ie,
                          disabled: J(h)
                        }, {
                          default: _e(() => [
                            ke("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        ge(Oe, {
                          type: "submit",
                          class: "ml-4",
                          disabled: J(h)
                        }, {
                          default: _e(() => [
                            ke("Save")
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
        ])) : (o(), r("div", Ff, [
          l("p", Tf, [
            ke("Could not create form for unknown "),
            If,
            ke(" " + j(V.value), 1)
          ])
        ])),
        ((at = _.value) == null ? void 0 : at.name) == "ModalLookup" && _.value.ref ? (o(), le(Qe, {
          key: 3,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: M.configureField
        }, null, 8, ["ref-info", "configureField"])) : C("", !0)
      ]);
    };
  }
}), Xf = { key: 0 }, Yf = { class: "text-red-700" }, ev = /* @__PURE__ */ l("b", null, "type", -1), tv = { key: 0 }, sv = { key: 2 }, lv = ["innerHTML"], nv = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, ov = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), av = { class: "fixed inset-0 overflow-hidden" }, rv = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, iv = { class: "flex-1" }, uv = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, dv = { class: "flex items-start justify-between space-x-3" }, cv = { class: "space-y-1" }, fv = { key: 0 }, vv = { key: 2 }, pv = ["innerHTML"], mv = { class: "flex h-7 items-center" }, hv = /* @__PURE__ */ l("div", { class: "flex justify-end" }, null, -1), gv = /* @__PURE__ */ ue({
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
    subHeading: {},
    showLoading: { type: Boolean },
    deleteType: {}
  },
  emits: ["done", "save", "delete", "error"],
  setup(e, { emit: t }) {
    const s = e, n = t, { typeOf: a, getPrimaryKey: i, Crud: u, createDto: d } = dt(), c = v(() => s.typeName ?? s.apis.dataModel.name), f = v(() => a(c.value)), m = v(() => s.panelClass || Ee.panelClass(s.formStyle)), _ = v(() => s.formClass || Ee.formClass(s.formStyle)), w = v(() => s.headingClass || Ee.headingClass(s.formStyle)), p = v(() => s.subHeadingClass || Ee.subHeadingClass(s.formStyle)), y = v(() => {
      var A, Q;
      return s.heading || ((A = a(c.value)) == null ? void 0 : A.description) || ((Q = s.model) != null && Q.id ? `${He(c.value)} ${s.model.id}` : "View " + He(c.value));
    }), k = O(new tt());
    Object.assign({}, us(s.model)), Y.interceptors.has("AutoViewForm.new") && Y.interceptors.invoke("AutoViewForm.new", { props: s });
    let T = ys(), E = v(() => T.loading.value);
    const re = () => Ze(f.value, (A) => i(A)), D = v(() => f.value);
    async function I(A) {
      let Q = re();
      const W = Q ? we(s.model, Q.name) : null;
      if (!W) {
        console.error(`Could not find Primary Key for Type ${c.value} (${D.value})`);
        return;
      }
      const K = { [Q.name]: W }, x = typeof s.deleteType == "string" ? d(s.deleteType, K) : s.deleteType ? new s.deleteType(K) : null;
      Ze(x.createResponse, (b) => typeof b == "function" ? b() : null) == null ? k.value = await T.apiVoid(x) : k.value = await T.api(x), k.value.succeeded ? n("delete", k.value.response) : n("error", k.value.error);
    }
    function F() {
      s.done && s.done();
    }
    const ne = O(!1), V = O(""), z = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(ne, () => {
      xt(z, V, ne.value), ne.value || setTimeout(F, 700);
    }), ne.value = !0;
    function q() {
      s.formStyle == "slideOver" ? ne.value = !1 : F();
    }
    const se = (A) => {
      A.key === "Escape" && q();
    };
    return ot(() => window.addEventListener("keydown", se)), Et(() => window.removeEventListener("keydown", se)), (A, Q) => {
      var b, N, R, h;
      const W = Z("MarkupModel"), K = Z("CloseButton"), x = Z("ConfirmDelete"), te = Z("FormLoading");
      return o(), r("div", null, [
        c.value ? A.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(m.value)
        }, [
          l("div", {
            class: g(_.value)
          }, [
            l("div", null, [
              A.$slots.heading ? (o(), r("div", tv, [
                U(A.$slots, "heading")
              ])) : (o(), r("h3", {
                key: 1,
                class: g(w.value)
              }, j(y.value), 3)),
              A.$slots.subheading ? (o(), r("div", sv, [
                U(A.$slots, "subheading")
              ])) : A.subHeading ? (o(), r("p", {
                key: 3,
                class: g(p.value)
              }, j(A.subHeading), 3)) : (b = f.value) != null && b.notes ? (o(), r("p", {
                key: 4,
                class: g(["notes", p.value]),
                innerHTML: (N = f.value) == null ? void 0 : N.notes
              }, null, 10, lv)) : C("", !0)
            ]),
            ge(W, { value: A.model }, null, 8, ["value"])
          ], 2)
        ], 2)) : (o(), r("div", nv, [
          ov,
          l("div", av, [
            l("div", {
              onMousedown: q,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: Q[0] || (Q[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", V.value])
                }, [
                  l("div", {
                    class: g(_.value)
                  }, [
                    l("div", rv, [
                      l("div", iv, [
                        l("div", uv, [
                          l("div", dv, [
                            l("div", cv, [
                              A.$slots.heading ? (o(), r("div", fv, [
                                U(A.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(w.value)
                              }, j(y.value), 3)),
                              A.$slots.subheading ? (o(), r("div", vv, [
                                U(A.$slots, "subheading")
                              ])) : A.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(p.value)
                              }, j(A.subHeading), 3)) : (R = f.value) != null && R.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", p.value]),
                                innerHTML: (h = f.value) == null ? void 0 : h.notes
                              }, null, 10, pv)) : C("", !0)
                            ]),
                            l("div", mv, [
                              ge(K, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: q
                              })
                            ])
                          ])
                        ]),
                        ge(W, { value: A.model }, null, 8, ["value"])
                      ])
                    ]),
                    l("div", {
                      class: g(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        A.deleteType ? (o(), le(x, {
                          key: 0,
                          onDelete: I
                        })) : C("", !0)
                      ]),
                      l("div", null, [
                        A.showLoading && J(E) ? (o(), le(te, { key: 0 })) : C("", !0)
                      ]),
                      hv
                    ], 2)
                  ], 2)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", Xf, [
          l("p", Yf, [
            ke("Could not create view for unknown "),
            ev,
            ke(" " + j(c.value), 1)
          ])
        ]))
      ]);
    };
  }
}), yv = /* @__PURE__ */ l("label", {
  for: "confirmDelete",
  class: "ml-2 mr-2 select-none"
}, "confirm", -1), bv = /* @__PURE__ */ ue({
  __name: "ConfirmDelete",
  emits: ["delete"],
  setup(e, { emit: t }) {
    let s = O(!1);
    const n = t, a = () => {
      s.value && n("delete");
    }, i = v(() => [
      "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
      s.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"
    ]);
    return (u, d) => (o(), r(Me, null, [
      Bt(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": d[0] || (d[0] = (c) => rn(s) ? s.value = c : s = c)
      }, null, 512), [
        [fl, J(s)]
      ]),
      yv,
      l("span", Ae({
        onClick: qe(a, ["prevent"]),
        class: i.value
      }, u.$attrs), [
        U(u.$slots, "default", {}, () => [
          ke("Delete")
        ])
      ], 16)
    ], 64));
  }
}), wv = {
  class: "flex",
  title: "loading..."
}, kv = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "24px",
  height: "30px",
  viewBox: "0 0 24 30"
}, _v = /* @__PURE__ */ Is('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3), $v = [
  _v
], Cv = { class: "ml-2 mt-1 text-gray-400" }, xv = /* @__PURE__ */ ue({
  __name: "FormLoading",
  props: {
    icon: { type: Boolean, default: !0 },
    text: { default: "loading..." }
  },
  setup(e) {
    return We("ApiState", void 0), (t, s) => (o(), r("div", wv, [
      t.icon ? (o(), r("svg", kv, $v)) : C("", !0),
      l("span", Cv, j(t.text), 1)
    ]));
  }
}), Lv = ["onClick"], Vv = {
  key: 3,
  class: "flex justify-between items-center"
}, Sv = { class: "mr-1 select-none" }, Mv = ["onClick"], Av = /* @__PURE__ */ ue({
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
    const s = e, n = t, a = O(), i = O(null), u = (R) => i.value === R, d = Ds(), c = (R) => Object.keys(d).find((h) => h.toLowerCase() == R.toLowerCase() + "-header"), f = (R) => Object.keys(d).find((h) => h.toLowerCase() == R.toLowerCase()), m = v(() => sl(s.items).filter((R) => !!(d[R] || d[R + "-header"]))), { typeOf: _, typeProperties: w } = dt(), p = v(() => zt(s.type)), y = v(() => _(p.value)), k = v(() => w(y.value));
    function T(R) {
      const h = s.headerTitles && we(s.headerTitles, R) || R;
      return s.headerTitle ? s.headerTitle(h) : pn(h);
    }
    function E(R) {
      const h = R.toLowerCase();
      return k.value.find((L) => L.name.toLowerCase() == h);
    }
    function re(R) {
      const h = E(R);
      return h != null && h.format ? h.format : (h == null ? void 0 : h.type) == "TimeSpan" || (h == null ? void 0 : h.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const D = {
      xs: "xs:table-cell",
      sm: "sm:table-cell",
      md: "md:table-cell",
      lg: "lg:table-cell",
      xl: "xl:table-cell",
      "2xl": "2xl:table-cell",
      never: ""
    };
    function I(R) {
      const h = s.visibleFrom && we(s.visibleFrom, R);
      return h && Ze(D[h], (L) => `hidden ${L}`);
    }
    const F = v(() => s.gridClass ?? me.getGridClass(s.tableStyle)), ne = v(() => s.grid2Class ?? me.getGrid2Class(s.tableStyle)), V = v(() => s.grid3Class ?? me.getGrid3Class(s.tableStyle)), z = v(() => s.grid4Class ?? me.getGrid4Class(s.tableStyle)), q = v(() => s.tableClass ?? me.getTableClass(s.tableStyle)), se = v(() => s.tbodyClass ?? me.getTbodyClass(s.tbodyClass)), A = v(() => s.theadClass ?? me.getTheadClass(s.tableStyle)), Q = v(() => s.theadRowClass ?? me.getTheadRowClass(s.tableStyle)), W = v(() => s.theadCellClass ?? me.getTheadCellClass(s.tableStyle));
    function K(R, h) {
      return s.rowClass ? s.rowClass(R, h) : me.getTableRowClass(s.tableStyle, h, !!(s.isSelected && s.isSelected(R)), s.isSelected != null);
    }
    function x(R, h) {
      return s.rowStyle ? s.rowStyle(R, h) : void 0;
    }
    const te = v(() => {
      const R = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (m.value.length > 0 ? m.value : sl(s.items)), h = k.value.reduce((L, ee) => (L[ee.name.toLowerCase()] = ee.format, L), {});
      return R.filter((L) => {
        var ee;
        return ((ee = h[L.toLowerCase()]) == null ? void 0 : ee.method) != "hidden";
      });
    });
    function b(R, h) {
      n("headerSelected", h, R);
    }
    function N(R, h, L) {
      n("rowSelected", L, R);
    }
    return (R, h) => {
      const L = Z("CellFormat"), ee = Z("PreviewFormat");
      return R.items.length ? (o(), r("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: g(F.value)
      }, [
        l("div", {
          class: g(ne.value)
        }, [
          l("div", {
            class: g(V.value)
          }, [
            l("div", {
              class: g(z.value)
            }, [
              l("table", {
                class: g(q.value)
              }, [
                l("thead", {
                  class: g(A.value)
                }, [
                  l("tr", {
                    class: g(Q.value)
                  }, [
                    (o(!0), r(Me, null, Ie(te.value, (X) => (o(), r("td", {
                      class: g([I(X), W.value, u(X) ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"])
                    }, [
                      l("div", {
                        onClick: (oe) => b(oe, X)
                      }, [
                        J(d)[X + "-header"] ? U(R.$slots, X + "-header", {
                          key: 0,
                          column: X
                        }) : c(X) ? U(R.$slots, c(X), {
                          key: 1,
                          column: X
                        }) : J(d).header ? U(R.$slots, "header", {
                          key: 2,
                          column: X,
                          label: T(X)
                        }) : (o(), r("div", Vv, [
                          l("span", Sv, j(T(X)), 1)
                        ]))
                      ], 8, Lv)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: g(se.value)
                }, [
                  (o(!0), r(Me, null, Ie(R.items, (X, oe) => (o(), r("tr", {
                    class: g(K(X, oe)),
                    style: cl(x(X, oe)),
                    onClick: (B) => N(B, oe, X)
                  }, [
                    (o(!0), r(Me, null, Ie(te.value, (B) => (o(), r("td", {
                      class: g([I(B), J(me).tableCellClass])
                    }, [
                      J(d)[B] ? U(R.$slots, B, Yt(Ae({ key: 0 }, X))) : f(B) ? U(R.$slots, f(B), Yt(Ae({ key: 1 }, X))) : E(B) ? (o(), le(L, {
                        key: 2,
                        type: y.value,
                        propType: E(B),
                        modelValue: X
                      }, null, 8, ["type", "propType", "modelValue"])) : (o(), le(ee, {
                        key: 3,
                        value: J(we)(X, B),
                        format: re(B)
                      }, null, 8, ["value", "format"]))
                    ], 2))), 256))
                  ], 14, Mv))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : C("", !0);
    };
  }
}), Fv = ue({
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
      var E;
      const a = n(e.propType), i = we(e.modelValue, e.propType.name), u = Object.assign({}, e, t), d = Ft("span", { innerHTML: vs(i, a, u) }), c = Xt(i) && Array.isArray(i) ? Ft("span", {}, [
        Ft("span", { class: "mr-2" }, `${i.length}`),
        d
      ]) : d, f = (E = e.propType) == null ? void 0 : E.ref;
      if (!f)
        return c;
      const _ = ut(e.type).find((re) => re.type === f.model);
      if (!_)
        return c;
      const w = we(e.modelValue, _.name), p = w && f.refLabel && we(w, f.refLabel);
      if (!p)
        return c;
      const y = s(f.model), k = y == null ? void 0 : y.icon, T = k ? Ft(lo, { image: k, class: "w-5 h-5 mr-1" }) : null;
      return Ft("span", { class: "flex", title: `${f.model} ${i}` }, [
        T,
        p
      ]);
    };
  }
}), Tv = { key: 0 }, Iv = {
  key: 0,
  class: "mr-2"
}, Dv = ["innerHTML"], jv = ["innerHTML"], Ov = {
  inheritAttrs: !1
}, Bv = /* @__PURE__ */ ue({
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
    return (n, a) => J(Xt)(n.value) ? (o(), r("span", Tv, [
      n.includeCount && s.value ? (o(), r("span", Iv, j(n.value.length), 1)) : C("", !0),
      l("span", {
        innerHTML: J(vs)(n.value, n.format, n.$attrs)
      }, null, 8, Dv)
    ])) : (o(), r("span", {
      key: 1,
      innerHTML: J(vs)(n.value, n.format, n.$attrs)
    }, null, 8, jv));
  }
}), Pv = ["innerHTML"], Hv = { key: 0 }, Rv = /* @__PURE__ */ l("b", null, null, -1), Ev = { key: 2 }, zv = /* @__PURE__ */ ue({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Ht(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => pn(c), i = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, u = v(() => sl(t.value)), d = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const m = Z("HtmlFormat", !0);
      return o(), r("div", {
        class: g(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), r("div", {
          key: 0,
          innerHTML: J(vs)(c.value)
        }, null, 8, Pv)) : n.value ? (o(), r("div", {
          key: 1,
          class: g(c.classes("array", "div", c.depth, J(me).gridClass))
        }, [
          J(Ht)(c.value[0]) ? (o(), r("div", Hv, "[ " + j(c.value.join(", ")) + " ]", 1)) : (o(), r("div", {
            key: 1,
            class: g(c.classes("array", "div", c.depth, J(me).grid2Class))
          }, [
            l("div", {
              class: g(c.classes("array", "div", c.depth, J(me).grid3Class))
            }, [
              l("div", {
                class: g(c.classes("array", "div", c.depth, J(me).grid4Class))
              }, [
                l("table", {
                  class: g(c.classes("object", "table", c.depth, J(me).tableClass))
                }, [
                  l("thead", {
                    class: g(c.classes("array", "thead", c.depth, J(me).theadClass))
                  }, [
                    l("tr", null, [
                      (o(!0), r(Me, null, Ie(u.value, (_) => (o(), r("th", {
                        class: g(c.classes("array", "th", c.depth, J(me).theadCellClass + " whitespace-nowrap"))
                      }, [
                        Rv,
                        ke(j(a(_)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), r(Me, null, Ie(c.value, (_, w) => (o(), r("tr", {
                      class: g(c.classes("array", "tr", c.depth, w % 2 == 0 ? "bg-white" : "bg-gray-50", w))
                    }, [
                      (o(!0), r(Me, null, Ie(u.value, (p) => (o(), r("td", {
                        class: g(c.classes("array", "td", c.depth, J(me).tableCellClass))
                      }, [
                        ge(m, Ae({
                          value: _[p],
                          "field-attrs": c.fieldAttrs,
                          depth: c.depth + 1,
                          classes: c.classes
                        }, i(p)), null, 16, ["value", "field-attrs", "depth", "classes"])
                      ], 2))), 256))
                    ], 2))), 256))
                  ])
                ], 2)
              ], 2)
            ], 2)
          ], 2))
        ], 2)) : (o(), r("div", Ev, [
          l("table", {
            class: g(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), r(Me, null, Ie(d(c.value), (_) => (o(), r("tr", {
              class: g(c.classes("object", "tr", c.depth, ""))
            }, [
              l("th", {
                class: g(c.classes("object", "th", c.depth, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"))
              }, j(_.key), 3),
              l("td", {
                class: g(c.classes("object", "td", c.depth, "align-top py-2 px-4 text-sm"))
              }, [
                ge(m, Ae({
                  value: _.val,
                  "field-attrs": c.fieldAttrs,
                  depth: c.depth + 1,
                  classes: c.classes
                }, i(_.key)), null, 16, ["value", "field-attrs", "depth", "classes"])
              ], 2)
            ], 2))), 256))
          ], 2)
        ]))
      ], 2);
    };
  }
}), Nv = ["href"], Uv = ["href", "title"], qv = /* @__PURE__ */ ue({
  __name: "MarkupFormat",
  props: {
    value: {},
    imageClass: { default: "w-8 h-8" }
  },
  setup(e) {
    const t = e, { getMimeType: s } = La(), n = t.value;
    let a = typeof t.value;
    const i = a === "string" && n.length ? s(n) : null;
    if (a === "string" && n.length) {
      const u = n.startsWith("https://") || n.startsWith("http://");
      (u || n[0] === "/") && (i != null && i.startsWith("image/")) ? a = "image" : u && (a = "link");
    }
    return (u, d) => {
      const c = Z("Icon"), f = Z("HtmlFormat");
      return J(a) == "link" ? (o(), r("a", {
        key: 0,
        href: u.value,
        class: "text-indigo-600"
      }, j(u.value), 9, Nv)) : J(a) == "image" ? (o(), r("a", {
        key: 1,
        href: u.value,
        title: u.value,
        class: "inline-block"
      }, [
        ge(c, {
          src: u.value,
          class: g(u.imageClass)
        }, null, 8, ["src", "class"])
      ], 8, Uv)) : (o(), le(f, {
        key: 2,
        value: u.value
      }, null, 8, ["value"]));
    };
  }
}), Qv = { class: "my-2 w-full" }, Kv = { class: "leading-7" }, Zv = { class: "px-2 text-left align-top" }, Wv = { colspan: "align-top" }, Gv = { class: "my-2 leading-7" }, Jv = {
  colspan: "2",
  class: "px-2 bg-indigo-700 text-white"
}, Xv = { class: "leading-7" }, Yv = {
  colspan: "2",
  class: "px-2 align-top"
}, ep = /* @__PURE__ */ ue({
  __name: "MarkupModel",
  props: {
    value: {},
    imageClass: {}
  },
  setup(e) {
    const t = e, s = Object.keys(t.value), n = {}, a = {};
    return s.forEach((i) => {
      const u = t.value[i], d = typeof u;
      u == null || d === "function" || d === "symbol" ? n[i] = `(${u == null ? "null" : "t"})` : d === "object" ? a[i] = u : n[i] = u;
    }), (i, u) => {
      const d = Z("MarkupFormat");
      return o(), r("table", Qv, [
        (o(), r(Me, null, Ie(n, (c, f) => l("tr", Kv, [
          l("th", Zv, j(J(He)(f)), 1),
          l("td", Wv, [
            ge(d, { value: c }, null, 8, ["value"])
          ])
        ])), 64)),
        (o(), r(Me, null, Ie(a, (c, f) => (o(), r(Me, null, [
          l("tr", Gv, [
            l("td", Jv, j(J(He)(f)), 1)
          ]),
          l("tr", Xv, [
            l("td", Yv, [
              ge(d, { value: c }, null, 8, ["value"])
            ])
          ])
        ], 64))), 64))
      ]);
    };
  }
}), tp = { class: "absolute top-0 right-0 pt-4 pr-4" }, sp = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), lp = /* @__PURE__ */ l("svg", {
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
], -1), np = [
  sp,
  lp
], op = /* @__PURE__ */ ue({
  __name: "CloseButton",
  props: {
    buttonClass: { default: "bg-white dark:bg-black" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    return (s, n) => (o(), r("div", tp, [
      l("button", {
        type: "button",
        onClick: n[0] || (n[0] = (a) => s.$emit("close")),
        class: g([s.buttonClass, "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
      }, np, 2)
    ]));
  }
}), ap = ["id", "aria-labelledby"], rp = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), ip = { class: "fixed inset-0 overflow-hidden" }, up = { class: "flex h-full flex-col bg-white dark:bg-black shadow-xl" }, dp = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, cp = { class: "flex-1" }, fp = { class: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, vp = { class: "flex items-start justify-between space-x-3" }, pp = { class: "space-y-1" }, mp = { key: 0 }, hp = ["id"], gp = {
  key: 2,
  class: "text-sm text-gray-500"
}, yp = { class: "flex h-7 items-center" }, bp = {
  key: 0,
  class: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6"
}, wp = /* @__PURE__ */ ue({
  __name: "SlideOver",
  props: {
    id: { default: "SlideOver" },
    title: {},
    contentClass: { default: "relative mt-6 flex-1 px-4 sm:px-6" }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = O(!1), a = O(""), i = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(n, () => {
      xt(i, a, n.value), n.value || setTimeout(() => s("done"), 700);
    }), n.value = !0;
    const u = () => n.value = !1, d = (c) => {
      c.key === "Escape" && u();
    };
    return ot(() => window.addEventListener("keydown", d)), Et(() => window.removeEventListener("keydown", d)), (c, f) => {
      const m = Z("CloseButton");
      return o(), r("div", {
        id: c.id,
        class: "relative z-10",
        "aria-labelledby": c.id + "-title",
        role: "dialog",
        "aria-modal": "true"
      }, [
        rp,
        l("div", ip, [
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
                class: g(["panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", a.value])
              }, [
                l("div", up, [
                  l("div", dp, [
                    l("div", cp, [
                      l("div", fp, [
                        l("div", vp, [
                          l("div", pp, [
                            c.$slots.title ? (o(), r("div", mp, [
                              U(c.$slots, "title")
                            ])) : C("", !0),
                            c.title ? (o(), r("h2", {
                              key: 1,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, j(c.title), 9, hp)) : C("", !0),
                            c.$slots.subtitle ? (o(), r("p", gp, [
                              U(c.$slots, "subtitle")
                            ])) : C("", !0)
                          ]),
                          l("div", yp, [
                            ge(m, {
                              "button-class": "bg-gray-50 dark:bg-gray-900",
                              onClose: u
                            })
                          ])
                        ])
                      ]),
                      l("div", {
                        class: g(c.contentClass)
                      }, [
                        U(c.$slots, "default")
                      ], 2)
                    ])
                  ]),
                  c.$slots.footer ? (o(), r("div", bp, [
                    U(c.$slots, "footer")
                  ])) : C("", !0)
                ])
              ], 2)
            ], 32)
          ], 32)
        ])
      ], 8, ap);
    };
  }
}), kp = ["id", "data-transition-for", "aria-labelledby"], _p = { class: "fixed inset-0 z-10 overflow-y-auto" }, $p = { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, Cp = {
  key: 1,
  class: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10"
}, xp = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), Lp = /* @__PURE__ */ l("svg", {
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
], -1), Vp = [
  xp,
  Lp
], Sp = /* @__PURE__ */ ue({
  __name: "ModalDialog",
  props: {
    id: { default: "ModalDialog" },
    modalClass: { default: dl.modalClass },
    sizeClass: { default: dl.sizeClass },
    closeButtonClass: { default: "bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black" },
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = Ds(), n = t, a = O(!1), i = O(""), u = {
      entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
    }, d = O(""), c = {
      entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
    };
    Lt(a, () => {
      xt(u, i, a.value), xt(c, d, a.value), a.value || setTimeout(() => n("done"), 200);
    }), a.value = !0;
    const f = () => a.value = !1;
    ps("ModalProvider", {
      openModal: p
    });
    const _ = O(), w = O();
    function p(T, E) {
      _.value = T, w.value = E;
    }
    async function y(T) {
      w.value && w.value(T), _.value = void 0, w.value = void 0;
    }
    const k = (T) => {
      T.key === "Escape" && f();
    };
    return ot(() => window.addEventListener("keydown", k)), Et(() => window.removeEventListener("keydown", k)), (T, E) => {
      var D;
      const re = Z("ModalLookup");
      return o(), r("div", {
        id: T.id,
        "data-transition-for": T.id,
        onMousedown: f,
        class: "relative z-10",
        "aria-labelledby": `${T.id}-title`,
        role: "dialog",
        "aria-modal": "true"
      }, [
        l("div", {
          class: g(["fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", i.value])
        }, null, 2),
        l("div", _p, [
          l("div", $p, [
            l("div", {
              class: g([T.modalClass, T.sizeClass, d.value]),
              onMousedown: E[0] || (E[0] = qe(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                J(s).closebutton ? U(T.$slots, "createform", { key: 0 }) : (o(), r("div", Cp, [
                  l("button", {
                    type: "button",
                    onClick: f,
                    class: g(T.closeButtonClass)
                  }, Vp, 2)
                ])),
                U(T.$slots, "default")
              ])
            ], 34),
            U(T.$slots, "bottom")
          ])
        ]),
        ((D = _.value) == null ? void 0 : D.name) == "ModalLookup" && _.value.ref ? (o(), le(re, {
          key: 0,
          "ref-info": _.value.ref,
          onDone: y,
          configureField: T.configureField
        }, null, 8, ["ref-info", "configureField"])) : C("", !0)
      ], 40, kp);
    };
  }
}), Mp = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Ap = { class: "mt-3 pl-5 flex flex-wrap items-center" }, Fp = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, Tp = { class: "hidden md:inline" }, Ip = { class: "flex pb-1 sm:pb-0" }, Dp = ["title"], jp = /* @__PURE__ */ l("svg", {
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
], Bp = ["disabled"], Pp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), Hp = [
  Pp
], Rp = ["disabled"], Ep = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), zp = [
  Ep
], Np = ["disabled"], Up = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), qp = [
  Up
], Qp = ["disabled"], Kp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Zp = [
  Kp
], Wp = {
  key: 0,
  class: "flex pb-1 sm:pb-0"
}, Gp = { class: "px-4 text-lg text-black dark:text-white" }, Jp = { key: 0 }, Xp = { key: 1 }, Yp = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), em = { key: 2 }, tm = {
  key: 1,
  class: "pl-2 mt-1"
}, sm = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), lm = { class: "whitespace-nowrap" }, nm = {
  key: 2,
  class: "pl-2"
}, om = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), am = [
  om
], rm = { class: "flex pb-1 sm:pb-0" }, im = {
  key: 0,
  class: "pl-2"
}, um = /* @__PURE__ */ l("svg", {
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
], -1), dm = { class: "mr-1" }, cm = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, fm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), vm = [
  fm
], pm = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, mm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), hm = [
  mm
], gm = { key: 1 }, ym = { key: 4 }, bm = { key: 0 }, wm = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, km = { class: "mr-1 select-none" }, _m = {
  key: 1,
  class: "flex justify-between items-center"
}, $m = { class: "mr-1 select-none" }, an = 25, Cm = /* @__PURE__ */ ue({
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
    const s = e, n = t, a = Ds(), { config: i } = Nt(), { metadataApi: u, filterDefinitions: d } = dt(), c = We("client"), f = i.value.storage, m = v(() => s.toolbarButtonClass ?? me.toolbarButtonClass), _ = v(() => d.value), w = O({ take: an }), p = O(new tt()), y = O(s.skip), k = O(!1), T = O(), E = (H) => typeof H == "string" ? H.split(",") : H || [];
    function re(H, G) {
      return me.getTableRowClass("fullWidth", G, !1, !0);
    }
    function D() {
      let H = E(s.selectedColumns);
      return H.length > 0 ? H : [];
    }
    const I = v(() => pt(s.refInfo.model)), F = v(() => {
      let G = D().map((De) => De.toLowerCase());
      const be = ut(I.value);
      return G.length > 0 ? G.map((De) => be.find((Ye) => Ye.name.toLowerCase() === De)).filter((De) => De != null) : be;
    }), ne = v(() => {
      let H = F.value.map((be) => be.name), G = E(w.value.selectedColumns).map((be) => be.toLowerCase());
      return G.length > 0 ? H.filter((be) => G.includes(be.toLowerCase())) : H;
    }), V = v(() => w.value.take ?? an), z = v(() => p.value.response ? we(p.value.response, "results") : []), q = v(() => {
      var H;
      return ((H = p.value.response) == null ? void 0 : H.total) ?? z.value.length ?? 0;
    }), se = v(() => y.value > 0), A = v(() => y.value > 0), Q = v(() => z.value.length >= V.value), W = v(() => z.value.length >= V.value), K = O([]), x = v(() => K.value.some((H) => H.settings.filters.length > 0 || !!H.settings.sort)), te = v(() => K.value.map((H) => H.settings.filters.length).reduce((H, G) => H + G, 0)), b = v(() => hs(I.value)), N = v(() => {
      var H;
      return (H = u.value) == null ? void 0 : H.operations.find((G) => {
        var be;
        return ((be = G.dataModel) == null ? void 0 : be.name) == s.refInfo.model && Ke.isAnyQuery(G);
      });
    }), R = O(), h = O(!1), L = O(), ee = v(() => zt(s.refInfo.model)), X = v(() => Rt.forType(ee.value, u.value)), oe = v(() => {
      var H;
      return ee.value || ((H = N.value) == null ? void 0 : H.dataModel.name);
    }), B = v(() => s.modelTitle || oe.value), S = v(() => s.newButtonLabel || `New ${B.value}`), ce = v(() => ds(X.value.Create)), de = O(), ie = O(!1);
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
      var G;
      de.value && (Object.assign((G = de.value) == null ? void 0 : G.model, H), console.log("setCreate", JSON.stringify(H, null, 2)), Ve());
    }
    function Ve() {
      var G, be;
      (G = de.value) == null || G.forceUpdate();
      const H = Pe();
      (be = H == null ? void 0 : H.proxy) == null || be.$forceUpdate();
    }
    const he = () => `${s.id}/ApiPrefs/${s.refInfo.model}`, je = (H) => `Column/${s.id}:${s.refInfo.model}.${H}`;
    async function Oe(H) {
      y.value += H, y.value < 0 && (y.value = 0);
      var G = Math.floor(q.value / V.value) * V.value;
      y.value > G && (y.value = G), await Fe();
    }
    async function xe(H, G) {
      n("done", H);
    }
    function Qe() {
      n("done", null);
    }
    function Re(H, G) {
      var De, Ye, ct;
      let be = G.target;
      if ((be == null ? void 0 : be.tagName) !== "TD") {
        let bt = (De = be == null ? void 0 : be.closest("TABLE")) == null ? void 0 : De.getBoundingClientRect(), $t = K.value.find((Se) => Se.name.toLowerCase() == H.toLowerCase());
        if ($t && bt) {
          let Se = 318, Ut = (((Ye = G.target) == null ? void 0 : Ye.tagName) === "DIV" ? G.target : (ct = G.target) == null ? void 0 : ct.closest("DIV")).getBoundingClientRect(), qt = Se + 25;
          L.value = {
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
      L.value = null;
    }
    async function Ge(H) {
      var be;
      let G = (be = L.value) == null ? void 0 : be.column;
      G && (G.settings = H, f.setItem(je(G.name), JSON.stringify(G.settings)), await Fe()), L.value = null;
    }
    async function st(H) {
      f.setItem(je(H.name), JSON.stringify(H.settings)), await Fe();
    }
    async function Je(H) {
      h.value = !1, w.value = H, f.setItem(he(), JSON.stringify(H)), await Fe();
    }
    async function Fe() {
      await lt(ze());
    }
    async function lt(H) {
      const G = N.value;
      if (!G) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let be = cs(G, H), De = vn((bt) => {
        p.value.response = p.value.error = void 0, k.value = bt;
      }), Ye = await c.api(be);
      De(), Ot(() => p.value = Ye);
      let ct = we(Ye.response, "results") || [];
      !Ye.succeeded || ct.label == 0;
    }
    function ze() {
      let H = {
        include: "total",
        take: V.value
      }, G = E(w.value.selectedColumns || s.selectedColumns);
      if (G.length > 0) {
        let De = b.value;
        De && G.includes(De.name) && (G = [De.name, ...G]), H.fields = G.join(",");
      }
      let be = [];
      return K.value.forEach((De) => {
        De.settings.sort && be.push((De.settings.sort === "DESC" ? "-" : "") + De.name), De.settings.filters.forEach((Ye) => {
          let ct = Ye.key.replace("%", De.name);
          H[ct] = Ye.value;
        });
      }), typeof H.skip > "u" && y.value > 0 && (H.skip = y.value), be.length > 0 && (H.orderBy = be.join(",")), H;
    }
    async function at() {
      K.value.forEach((H) => {
        H.settings = { filters: [] }, f.removeItem(je(H.name));
      }), await Fe();
    }
    return ot(async () => {
      const H = s.prefs || Fs(f.getItem(he()));
      H && (w.value = H), K.value = F.value.map((G) => ({
        name: G.name,
        type: G.type,
        meta: G,
        settings: Object.assign(
          {
            filters: []
          },
          Fs(f.getItem(je(G.name)))
        )
      })), isNaN(s.skip) || (y.value = s.skip), await Fe();
    }), (H, G) => {
      const be = Z("AutoCreateForm"), De = Z("ErrorSummary"), Ye = Z("Loading"), ct = Z("SettingsIcons"), bt = Z("DataGrid"), $t = Z("ModalDialog");
      return o(), r(Me, null, [
        H.refInfo ? (o(), le($t, {
          key: 0,
          ref_key: "modalDialog",
          ref: R,
          id: H.id,
          onDone: Qe
        }, {
          default: _e(() => [
            l("div", Mp, [
              l("div", Ap, [
                l("h3", Fp, [
                  ke(" Select "),
                  l("span", Tp, j(J(He)(H.refInfo.model)), 1)
                ]),
                l("div", Ip, [
                  H.showPreferences ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${H.refInfo.model} Preferences`,
                    onClick: G[0] || (G[0] = (Se) => h.value = !h.value)
                  }, Op, 8, Dp)) : C("", !0),
                  H.showPagingNav ? (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: g(["pl-2", se.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !se.value,
                    onClick: G[1] || (G[1] = (Se) => Oe(-q.value))
                  }, Hp, 10, Bp)) : C("", !0),
                  H.showPagingNav ? (o(), r("button", {
                    key: 2,
                    type: "button",
                    class: g(["pl-2", A.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !A.value,
                    onClick: G[2] || (G[2] = (Se) => Oe(-V.value))
                  }, zp, 10, Rp)) : C("", !0),
                  H.showPagingNav ? (o(), r("button", {
                    key: 3,
                    type: "button",
                    class: g(["pl-2", Q.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !Q.value,
                    onClick: G[3] || (G[3] = (Se) => Oe(V.value))
                  }, qp, 10, Np)) : C("", !0),
                  H.showPagingNav ? (o(), r("button", {
                    key: 4,
                    type: "button",
                    class: g(["pl-2", W.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !W.value,
                    onClick: G[4] || (G[4] = (Se) => Oe(q.value))
                  }, Zp, 10, Qp)) : C("", !0)
                ]),
                H.showPagingInfo ? (o(), r("div", Wp, [
                  l("div", Gp, [
                    k.value ? (o(), r("span", Jp, "Querying...")) : C("", !0),
                    z.value.length ? (o(), r("span", Xp, [
                      Yp,
                      ke(" " + j(y.value + 1) + " - " + j(Math.min(y.value + z.value.length, q.value)) + " ", 1),
                      l("span", null, " of " + j(q.value), 1)
                    ])) : p.value.completed ? (o(), r("span", em, "No Results")) : C("", !0)
                  ])
                ])) : C("", !0),
                X.value.Create && ce.value ? (o(), r("div", tm, [
                  l("button", {
                    type: "button",
                    onClick: G[5] || (G[5] = (Se) => pe()),
                    title: "modelTitle",
                    class: g(J(me).toolbarButtonClass)
                  }, [
                    sm,
                    l("span", lm, j(S.value), 1)
                  ], 2),
                  ie.value ? (o(), le(be, {
                    key: 0,
                    ref_key: "createForm",
                    ref: de,
                    type: X.value.Create.request.name,
                    configure: H.configureField,
                    onDone: M,
                    onSave: ve
                  }, {
                    header: _e(() => [
                      U(H.$slots, "formheader", {
                        form: "create",
                        formInstance: de.value,
                        apis: X.value,
                        type: oe.value,
                        updateModel: Ce
                      })
                    ]),
                    footer: _e(() => [
                      U(H.$slots, "formfooter", {
                        form: "create",
                        formInstance: de.value,
                        apis: X.value,
                        type: oe.value,
                        updateModel: Ce
                      })
                    ]),
                    _: 3
                  }, 8, ["type", "configure"])) : C("", !0)
                ])) : C("", !0),
                x.value && H.showResetPreferences ? (o(), r("div", nm, [
                  l("button", {
                    type: "button",
                    onClick: at,
                    title: "Reset Preferences & Filters",
                    class: g(m.value)
                  }, am, 2)
                ])) : C("", !0),
                l("div", rm, [
                  H.showFiltersView && te.value > 0 ? (o(), r("div", im, [
                    l("button", {
                      type: "button",
                      onClick: G[6] || (G[6] = (Se) => T.value = T.value == "filters" ? null : "filters"),
                      class: g(m.value),
                      "aria-expanded": "false"
                    }, [
                      um,
                      l("span", dm, j(te.value) + " " + j(te.value == 1 ? "Filter" : "Filters"), 1),
                      T.value != "filters" ? (o(), r("svg", cm, vm)) : (o(), r("svg", pm, hm))
                    ], 2)
                  ])) : C("", !0)
                ])
              ]),
              T.value == "filters" ? (o(), le(Hl, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: _.value,
                columns: K.value,
                onDone: G[7] || (G[7] = (Se) => T.value = null),
                onChange: st
              }, null, 8, ["definitions", "columns"])) : C("", !0),
              L.value ? (o(), r("div", gm, [
                ge(Pl, {
                  definitions: _.value,
                  column: L.value.column,
                  "top-left": L.value.topLeft,
                  onDone: Be,
                  onSave: Ge
                }, null, 8, ["definitions", "column", "top-left"])
              ])) : C("", !0),
              p.value.error ? (o(), le(De, {
                key: 2,
                status: p.value.error
              }, null, 8, ["status"])) : k.value ? (o(), le(Ye, { key: 3 })) : (o(), r("div", ym, [
                z.value.length ? (o(), r("div", bm, [
                  ge(bt, {
                    id: H.id,
                    items: z.value,
                    type: H.refInfo.model,
                    "selected-columns": ne.value,
                    onFiltersChanged: Fe,
                    tableStyle: "fullWidth",
                    rowClass: re,
                    onRowSelected: xe,
                    onHeaderSelected: Re
                  }, vl({
                    header: _e(({ column: Se, label: Vt }) => {
                      var Ut;
                      return [
                        H.allowFiltering && (!s.canFilter || s.canFilter(Se)) ? (o(), r("div", wm, [
                          l("span", km, j(Vt), 1),
                          ge(ct, {
                            column: K.value.find((qt) => qt.name.toLowerCase() === Se.toLowerCase()),
                            "is-open": ((Ut = L.value) == null ? void 0 : Ut.column.name) === Se
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), r("div", _m, [
                          l("span", $m, j(Vt), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    Ie(Object.keys(J(a)), (Se) => ({
                      name: Se,
                      fn: _e((Vt) => [
                        U(H.$slots, Se, Yt(Ms(Vt)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : C("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : C("", !0),
        h.value ? (o(), le(Rl, {
          key: 1,
          columns: F.value,
          prefs: w.value,
          onDone: G[8] || (G[8] = (Se) => h.value = !1),
          onSave: Je
        }, null, 8, ["columns", "prefs"])) : C("", !0)
      ], 64);
    };
  }
}), xm = { class: "sm:hidden" }, Lm = ["for"], Vm = ["id", "name"], Sm = ["value"], Mm = { class: "hidden sm:block" }, Am = { class: "border-b border-gray-200" }, Fm = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, Tm = ["onClick"], Im = /* @__PURE__ */ ue({
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
    const t = e, s = v(() => Object.keys(t.tabs)), n = (m) => t.label ? t.label(m) : He(m), a = v(() => t.id || "tabs"), i = v(() => t.param || "tab"), u = O();
    function d(m) {
      if (u.value = m, t.url) {
        const _ = s.value[0];
        ml({ tab: m === _ ? void 0 : m }, t.clearQuery);
      }
    }
    function c(m) {
      return u.value === m;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return ot(() => {
      if (u.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const m = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "", w = tl(m)[i.value];
        w && (u.value = w);
      }
    }), (m, _) => (o(), r("div", null, [
      l("div", xm, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, Lm),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: _[0] || (_[0] = (w) => {
            var p;
            return d((p = w.target) == null ? void 0 : p.value);
          })
        }, [
          (o(!0), r(Me, null, Ie(s.value, (w) => (o(), r("option", {
            key: w,
            value: w
          }, j(n(w)), 9, Sm))), 128))
        ], 40, Vm)
      ]),
      l("div", Mm, [
        l("div", Am, [
          l("nav", Fm, [
            (o(!0), r(Me, null, Ie(s.value, (w) => (o(), r("a", {
              href: "#",
              onClick: qe((p) => d(w), ["prevent"]),
              style: cl({ width: f.value }),
              class: g([c(w) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", m.tabClass])
            }, j(n(w)), 15, Tm))), 256))
          ])
        ])
      ]),
      l("div", {
        class: g(m.bodyClass)
      }, [
        (o(), le(dn(m.tabs[u.value])))
      ], 2)
    ]));
  }
}), Dm = /* @__PURE__ */ l("svg", {
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
  Dm
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
], -1), Bm = [
  Om
], Pm = /* @__PURE__ */ ue({
  __name: "DarkModeToggle",
  setup(e) {
    const t = typeof document < "u" ? document.documentElement : null, s = () => !!(t != null && t.classList.contains("dark")), n = O(localStorage.getItem("color-scheme") == "dark");
    function a() {
      s() ? t == null || t.classList.remove("dark") : t == null || t.classList.add("dark"), n.value = s(), localStorage.setItem("color-scheme", n.value ? "dark" : "light");
    }
    return (i, u) => (o(), r("button", {
      type: "button",
      class: "bg-gray-200 dark:bg-gray-700 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
      role: "switch",
      "aria-checked": "false",
      onClick: u[0] || (u[0] = (d) => a())
    }, [
      l("span", {
        class: g(`${n.value ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`)
      }, [
        l("span", {
          class: g(`${n.value ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, jm, 2),
        l("span", {
          class: g(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Bm, 2)
      ], 2)
    ]));
  }
}), Hm = { key: 0 }, Rm = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, Em = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, zm = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900" }, Nm = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600"
}, Um = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, qm = ["onClick"], Qm = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, Km = { class: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" }, Zm = { class: "mt-8" }, Wm = {
  key: 1,
  class: "mt-6"
}, Gm = /* @__PURE__ */ Is('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500"> Or continue with </span></div></div>', 1), Jm = { class: "mt-6 grid grid-cols-3 gap-3" }, Xm = ["href", "title"], Ym = {
  key: 1,
  class: "h-5 w-5 text-gray-700",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, e1 = /* @__PURE__ */ l("path", {
  d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z",
  fill: "currentColor"
}, null, -1), t1 = /* @__PURE__ */ l("path", {
  d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z",
  fill: "currentColor"
}, null, -1), s1 = [
  e1,
  t1
], l1 = /* @__PURE__ */ ue({
  __name: "SignIn",
  props: {
    provider: {},
    title: { default: "Sign In" },
    tabs: { type: [Boolean, String], default: !0 },
    oauth: { type: [Boolean, String], default: !0 }
  },
  emits: ["login"],
  setup(e, { emit: t }) {
    const s = e, n = t, { getMetadata: a, createDto: i } = dt(), u = ys(), d = We("client"), { signIn: c } = Bl(), f = a({ assert: !0 }), m = f.plugins.auth, _ = document.baseURI, w = f.app.baseUrl, p = O(i("Authenticate")), y = O(new tt()), k = O(s.provider);
    ot(() => {
      m == null || m.authProviders.map((A) => A.formLayout).filter((A) => A).forEach((A) => A.forEach(
        (Q) => p.value[Q.id] = Q.type === "checkbox" ? !1 : ""
      ));
    });
    const T = v(() => (m == null ? void 0 : m.authProviders.filter((A) => A.formLayout)) || []), E = v(() => T.value[0] || {}), re = v(() => T.value[Math.max(T.value.length - 1, 0)] || {}), D = v(() => (k.value ? m == null ? void 0 : m.authProviders.find((A) => A.name === k.value) : null) ?? E.value), I = (A) => A === !1 || A === "false";
    function F(A) {
      return A.label || A.navItem && A.navItem.label;
    }
    const ne = v(() => {
      var A;
      return (((A = D.value) == null ? void 0 : A.formLayout) || []).map((Q) => {
        var W, K;
        return Object.assign({}, Q, {
          type: (W = Q.type) == null ? void 0 : W.toLowerCase(),
          autocomplete: Q.autocomplete || (((K = Q.type) == null ? void 0 : K.toLowerCase()) === "password" ? "current-password" : void 0) || (Q.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, Q.css)
        });
      });
    }), V = v(() => I(s.oauth) ? [] : (m == null ? void 0 : m.authProviders.filter((A) => A.type === "oauth")) || []), z = v(() => {
      let A = Ho(
        m == null ? void 0 : m.authProviders.filter((W) => W.formLayout && W.formLayout.length > 0),
        (W, K) => {
          let x = F(K) || vt(K.name);
          W[x] = K.name === E.value.name ? "" : K.name;
        }
      );
      const Q = D.value;
      return Q && I(s.tabs) && (A = { [F(Q) || vt(Q.name)]: Q }), A;
    }), q = v(() => {
      let A = ne.value.map((Q) => Q.id).filter((Q) => Q);
      return y.value.summaryMessage(A);
    });
    async function se() {
      if (p.value.provider = D.value.name, D.value.name === "authsecret" ? (d.headers.set("authsecret", p.value.authsecret), p.value = i("Authenticate")) : D.value.name === "basic" ? (d.setCredentials(p.value.UserName, p.value.Password), p.value = i("Authenticate"), p.value.UserName = null, p.value.Password = null) : (D.value.type === "Bearer" || D.value.name === "jwt") && (d.bearerToken = p.value.BearerToken, p.value = i("Authenticate")), y.value = await u.api(p.value), y.value.succeeded) {
        const A = y.value.response;
        c(A), n("login", A), y.value = new tt(), p.value = i("Authenticate");
      }
    }
    return (A, Q) => {
      const W = Z("ErrorSummary"), K = Z("AutoFormFields"), x = Z("PrimaryButton"), te = Z("Icon"), b = _o("href");
      return J(m) ? (o(), r("div", Rm, [
        l("div", Em, [
          l("h2", zm, j(A.title), 1),
          Object.keys(z.value).length > 1 ? (o(), r("p", Nm, [
            l("span", Um, [
              (o(!0), r(Me, null, Ie(z.value, (N, R) => Bt((o(), r("a", {
                onClick: (h) => k.value = N,
                class: g([
                  N === "" || N === E.value.name ? "rounded-l-md" : N === re.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  k.value === N ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                ])
              }, [
                ke(j(R), 1)
              ], 10, qm)), [
                [b, { provider: N }]
              ])), 256))
            ])
          ])) : C("", !0)
        ]),
        l("div", Qm, [
          q.value ? (o(), le(W, {
            key: 0,
            class: "mb-3",
            errorSummary: q.value
          }, null, 8, ["errorSummary"])) : C("", !0),
          l("div", Km, [
            ne.value.length ? (o(), r("form", {
              key: 0,
              onSubmit: qe(se, ["prevent"])
            }, [
              ge(K, {
                modelValue: p.value,
                formLayout: ne.value,
                api: y.value,
                hideSummary: !0,
                "divide-class": "",
                "space-class": "space-y-6"
              }, null, 8, ["modelValue", "formLayout", "api"]),
              l("div", Zm, [
                ge(x, { class: "w-full" }, {
                  default: _e(() => [
                    ke("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : C("", !0),
            V.value.length ? (o(), r("div", Wm, [
              Gm,
              l("div", Jm, [
                (o(!0), r(Me, null, Ie(V.value, (N) => (o(), r("div", null, [
                  l("a", {
                    href: J(w) + N.navItem.href + "?continue=" + J(_),
                    title: F(N),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  }, [
                    N.icon ? (o(), le(te, {
                      key: 0,
                      image: N.icon,
                      class: "h-5 w-5 text-gray-700"
                    }, null, 8, ["image"])) : (o(), r("svg", Ym, s1))
                  ], 8, Xm)
                ]))), 256))
              ])
            ])) : C("", !0)
          ])
        ])
      ])) : (o(), r("div", Hm, "No Auth Plugin"));
    };
  }
}), n1 = ["for"], o1 = {
  key: 1,
  class: "border border-gray-200 flex justify-between"
}, a1 = { class: "p-2 flex flex-wrap gap-x-4" }, r1 = /* @__PURE__ */ l("title", null, "Bold text (CTRL+B)", -1), i1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}, null, -1), u1 = [
  r1,
  i1
], d1 = /* @__PURE__ */ l("title", null, "Italics (CTRL+I)", -1), c1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}, null, -1), f1 = [
  d1,
  c1
], v1 = /* @__PURE__ */ l("title", null, "Insert Link (CTRL+K)", -1), p1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"
}, null, -1), m1 = [
  v1,
  p1
], h1 = /* @__PURE__ */ l("title", null, "Blockquote (CTRL+Q)", -1), g1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z"
}, null, -1), y1 = [
  h1,
  g1
], b1 = /* @__PURE__ */ l("title", null, "Insert Image (CTRL+SHIFT+L)", -1), w1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
}, null, -1), k1 = [
  b1,
  w1
], _1 = /* @__PURE__ */ l("title", null, "Insert Code (CTRL+<)", -1), $1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
}, null, -1), C1 = [
  _1,
  $1
], x1 = /* @__PURE__ */ l("title", null, "H2 Heading (CTRL+H)", -1), L1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z"
}, null, -1), V1 = [
  x1,
  L1
], S1 = /* @__PURE__ */ l("title", null, "Numbered List (ALT+1)", -1), M1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z"
}, null, -1), A1 = [
  S1,
  M1
], F1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), T1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), I1 = [
  F1,
  T1
], D1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), j1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), O1 = [
  D1,
  j1
], B1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), P1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), H1 = [
  B1,
  P1
], R1 = /* @__PURE__ */ l("title", null, "Redo (CTRL+SHIFT+Z)", -1), E1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
}, null, -1), z1 = [
  R1,
  E1
], N1 = {
  key: 0,
  class: "p-2 flex flex-wrap gap-x-4"
}, U1 = ["href"], q1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z"
}, null, -1), Q1 = [
  q1
], K1 = { class: "" }, Z1 = ["name", "id", "label", "value", "rows", "disabled"], W1 = ["id"], G1 = ["id"], nt = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", J1 = /* @__PURE__ */ ue({
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
    let i = [], u = [], d = We("ApiState", void 0);
    const c = v(() => _t.call({ responseStatus: n.status ?? (d == null ? void 0 : d.error.value) }, n.id)), f = v(() => n.label ?? He(vt(n.id))), m = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), _ = v(() => n.hide ? jt(m, n.hide) : jt(m, []));
    function w(h) {
      return _.value[h];
    }
    const p = v(() => ["shadow-sm font-mono" + ft.base.replace("rounded-md", ""), c.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid, n.inputClass]), y = O();
    t({ props: n, textarea: y, updateModelValue: k, selection: E, hasSelection: T, selectionInfo: re, insert: I, replace: D });
    function k(h) {
      a("update:modelValue", h);
    }
    function T() {
      return y.value.selectionStart !== y.value.selectionEnd;
    }
    function E() {
      const h = y.value;
      return h.value.substring(h.selectionStart, h.selectionEnd) || "";
    }
    function re() {
      const h = y.value, L = h.value, ee = h.selectionStart, X = L.substring(ee, h.selectionEnd) || "", oe = L.substring(0, ee), B = oe.lastIndexOf(`
`);
      return {
        value: L,
        sel: X,
        selPos: ee,
        beforeSel: oe,
        afterSel: L.substring(ee),
        prevCRPos: B,
        beforeCR: B >= 0 ? oe.substring(0, B + 1) : "",
        afterCR: B >= 0 ? oe.substring(B + 1) : ""
      };
    }
    function D({ value: h, selectionStart: L, selectionEnd: ee }) {
      ee == null && (ee = L), k(h), Ot(() => {
        y.value.focus(), y.value.setSelectionRange(L, ee);
      });
    }
    function I(h, L, ee = "", { selectionAtEnd: X, offsetStart: oe, offsetEnd: B, filterValue: S, filterSelection: ce } = {}) {
      const de = y.value;
      let ie = de.value, pe = de.selectionEnd;
      i.push({ value: ie, selectionStart: de.selectionStart, selectionEnd: de.selectionEnd }), u = [];
      const M = de.selectionStart, ve = de.selectionEnd;
      let Ce = ie.substring(0, M), Ve = ie.substring(ve);
      const he = h && Ce.endsWith(h) && Ve.startsWith(L);
      if (M == ve) {
        if (he ? (ie = Ce.substring(0, Ce.length - h.length) + Ve.substring(L.length), pe += -L.length) : (ie = Ce + h + ee + L + Ve, pe += h.length, oe = 0, B = (ee == null ? void 0 : ee.length) || 0, X && (pe += B, B = 0)), S) {
          var Oe = { pos: pe };
          ie = S(ie, Oe), pe = Oe.pos;
        }
      } else {
        var xe = ie.substring(M, ve);
        ce && (xe = ce(xe)), he ? (ie = Ce.substring(0, Ce.length - h.length) + xe + Ve.substring(L.length), oe = -xe.length - h.length, B = xe.length) : (ie = Ce + h + xe + L + Ve, oe ? pe += (h + L).length : (pe = M, oe = h.length, B = xe.length));
      }
      k(ie), Ot(() => {
        de.focus(), oe = pe + (oe || 0), B = (oe || 0) + (B || 0), de.setSelectionRange(oe, B);
      });
    }
    const F = () => I("**", "**", "bold"), ne = () => I("_", "_", "italics"), V = () => I("~~", "~~", "strikethrough"), z = () => I("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), q = () => I(`
> `, `
`, "Blockquote", {}), se = () => I("![](", ")");
    function A(h) {
      const L = E();
      if (L && !h.shiftKey)
        I("`", "`", "code");
      else {
        const ee = n.lang || "js";
        L.indexOf(`
`) === -1 ? I("\n```" + ee + `
`, "\n```\n", "// code") : I("```" + ee + `
`, "```\n", "");
      }
    }
    function Q() {
      if (T()) {
        let { sel: h, selPos: L, beforeSel: ee, afterSel: X, prevCRPos: oe, beforeCR: B, afterCR: S } = re();
        if (h.indexOf(`
`) === -1)
          I(`
 1. `, `
`);
        else if (!h.startsWith(" 1. ")) {
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
              return ee + X;
            },
            filterSelection: (ie) => ie.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
          });
      } else
        I(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function W() {
      if (T()) {
        let { sel: h, selPos: L, beforeSel: ee, afterSel: X, prevCRPos: oe, beforeCR: B, afterCR: S } = re();
        h.indexOf(`
`) === -1 ? I(`
 - `, `
`) : !h.startsWith(" - ") ? I("", "", " - ", {
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
            return ee + X;
          },
          filterSelection: (ie) => ie.replace(/^ - /g, "").replace(/\n - /g, `
`)
        });
      } else
        I(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function K() {
      const h = E(), L = h.indexOf(`
`) === -1;
      h ? L ? I(`
## `, `
`, "") : I("## ", "", "") : I(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
    }
    function x() {
      let { sel: h, selPos: L, beforeSel: ee, afterSel: X, prevCRPos: oe, beforeCR: B, afterCR: S } = re();
      !h.startsWith("//") && !S.startsWith("//") ? h ? I("", "", "//", {
        selectionAtEnd: !0,
        filterSelection: (de) => "//" + de.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
      }) : D({
        value: B + "//" + S + X,
        selectionStart: L + 2
      }) : I("", "", "", {
        filterValue: (de, ie) => {
          if (oe >= 0) {
            let pe = S.replace(/^\/\//, "");
            ee = B + pe, ie.pos -= S.length - pe.length;
          }
          return ee + X;
        },
        filterSelection: (de) => de.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
      });
    }
    const te = () => I(`/*
`, `*/
`, "");
    function b() {
      if (i.length === 0)
        return !1;
      const h = y.value, L = i.pop();
      return u.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), D(L), !0;
    }
    function N() {
      if (u.length === 0)
        return !1;
      const h = y.value, L = u.pop();
      return i.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), D(L), !0;
    }
    const R = () => null;
    return ot(() => {
      i = [], u = [];
      const h = y.value;
      h.onkeydown = (L) => {
        if (L.key === "Escape" || L.keyCode === 27) {
          a("close");
          return;
        }
        const ee = String.fromCharCode(L.keyCode).toLowerCase();
        ee === "	" ? (!L.shiftKey ? I("", "", "    ", {
          selectionAtEnd: !0,
          filterSelection: (oe) => "    " + oe.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
        }) : I("", "", "", {
          filterValue: (oe, B) => {
            let { selPos: S, beforeSel: ce, afterSel: de, prevCRPos: ie, beforeCR: pe, afterCR: M } = re();
            if (ie >= 0) {
              let ve = M.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              ce = pe + ve, B.pos -= M.length - ve.length;
            }
            return ce + de;
          },
          filterSelection: (oe) => oe.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), L.preventDefault()) : L.ctrlKey ? ee === "z" ? L.shiftKey ? N() && L.preventDefault() : b() && L.preventDefault() : ee === "b" && !L.shiftKey ? (F(), L.preventDefault()) : ee === "h" && !L.shiftKey ? (K(), L.preventDefault()) : ee === "i" && !L.shiftKey ? (ne(), L.preventDefault()) : ee === "q" && !L.shiftKey ? (q(), L.preventDefault()) : ee === "k" ? L.shiftKey ? (se(), L.preventDefault()) : (z(), L.preventDefault()) : ee === "," || L.key === "<" || L.key === ">" || L.keyCode === 188 ? (A(L), L.preventDefault()) : ee === "/" || L.key === "/" ? (x(), L.preventDefault()) : (ee === "?" || L.key === "?") && L.shiftKey && (te(), L.preventDefault()) : L.altKey && (L.key === "1" || L.key === "0" ? (Q(), L.preventDefault()) : L.key === "-" ? (W(), L.preventDefault()) : L.key === "s" && (V(), L.preventDefault()));
      };
    }), (h, L) => {
      var ee;
      return o(), r("div", null, [
        U(h.$slots, "header", Ae({
          inputElement: y.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs)),
        f.value ? (o(), r("label", {
          key: 0,
          for: h.id,
          class: g(`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${h.labelClass ?? ""}`)
        }, j(f.value), 11, n1)) : C("", !0),
        h.disabled ? C("", !0) : (o(), r("div", o1, [
          l("div", a1, [
            w("bold") ? (o(), r("svg", {
              key: 0,
              class: g(nt),
              onClick: F,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, u1)) : C("", !0),
            w("italics") ? (o(), r("svg", {
              key: 1,
              class: g(nt),
              onClick: ne,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, f1)) : C("", !0),
            w("link") ? (o(), r("svg", {
              key: 2,
              class: g(nt),
              onClick: z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, m1)) : C("", !0),
            w("blockquote") ? (o(), r("svg", {
              key: 3,
              class: g(nt),
              onClick: q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, y1)) : C("", !0),
            w("image") ? (o(), r("svg", {
              key: 4,
              class: g(nt),
              onClick: se,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, k1)) : C("", !0),
            w("code") ? (o(), r("svg", {
              key: 5,
              class: g(nt),
              onClick: A,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, C1)) : C("", !0),
            w("heading") ? (o(), r("svg", {
              key: 6,
              class: g(nt),
              onClick: K,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, V1)) : C("", !0),
            w("orderedList") ? (o(), r("svg", {
              key: 7,
              class: g(nt),
              icon: "",
              onClick: Q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, A1)) : C("", !0),
            w("unorderedList") ? (o(), r("svg", {
              key: 8,
              class: g(nt),
              onClick: W,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, I1)) : C("", !0),
            w("strikethrough") ? (o(), r("svg", {
              key: 9,
              class: g(nt),
              onClick: V,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, O1)) : C("", !0),
            w("undo") ? (o(), r("svg", {
              key: 10,
              class: g(nt),
              onClick: b,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, H1)) : C("", !0),
            w("redo") ? (o(), r("svg", {
              key: 11,
              class: g(nt),
              onClick: N,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, z1)) : C("", !0),
            U(h.$slots, "toolbarbuttons", {
              instance: (ee = Pe()) == null ? void 0 : ee.exposed
            })
          ]),
          w("help") && h.helpUrl ? (o(), r("div", N1, [
            l("a", {
              title: "formatting help",
              target: "_blank",
              href: h.helpUrl,
              tabindex: "-1"
            }, [
              (o(), r("svg", {
                class: g(nt),
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, Q1))
            ], 8, U1)
          ])) : C("", !0)
        ])),
        l("div", K1, [
          l("textarea", {
            ref_key: "txt",
            ref: y,
            name: h.id,
            id: h.id,
            class: g(p.value),
            label: h.label,
            value: h.modelValue,
            rows: h.rows || 6,
            disabled: h.disabled,
            onInput: L[0] || (L[0] = (X) => {
              var oe;
              return k(((oe = X.target) == null ? void 0 : oe.value) || "");
            }),
            onKeydown: un(R, ["tab"])
          }, null, 42, Z1)
        ]),
        c.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${h.id}-error`
        }, j(c.value), 9, W1)) : h.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${h.id}-description`
        }, j(h.help), 9, G1)) : C("", !0),
        U(h.$slots, "footer", Ae({
          inputElement: y.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs))
      ]);
    };
  }
}), X1 = {
  key: 0,
  class: "relative z-10 lg:hidden",
  role: "dialog",
  "aria-modal": "true"
}, Y1 = { class: "fixed inset-0 flex" }, eh = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close sidebar", -1), th = /* @__PURE__ */ l("svg", {
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
], -1), sh = [
  eh,
  th
], lh = { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2" }, nh = { class: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col" }, oh = { class: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6" }, ah = {
  class: /* @__PURE__ */ g(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
}, rh = /* @__PURE__ */ l("span", { class: "sr-only" }, "Open sidebar", -1), ih = /* @__PURE__ */ l("svg", {
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
], -1), uh = [
  rh,
  ih
], dh = /* @__PURE__ */ ue({
  __name: "SidebarLayout",
  setup(e, { expose: t }) {
    const { transition: s } = _n(), n = O(!0), a = O(""), i = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, u = O(""), d = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, c = O(""), f = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    };
    function m(p) {
      s(i, a, p), s(d, u, p), s(f, c, p), setTimeout(() => n.value = p, 300);
    }
    function _() {
      m(!0);
    }
    function w() {
      m(!1);
    }
    return t({ show: _, hide: w, toggle: m }), (p, y) => (o(), r("div", null, [
      n.value ? (o(), r("div", X1, [
        l("div", {
          class: g(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", Y1, [
          l("div", {
            class: g(["relative mr-16 flex w-full max-w-xs flex-1", u.value])
          }, [
            l("div", {
              class: g(["absolute left-full top-0 flex w-16 justify-center pt-5", c.value])
            }, [
              l("button", {
                type: "button",
                onClick: w,
                class: "-m-2.5 p-2.5"
              }, sh)
            ], 2),
            l("div", lh, [
              U(p.$slots, "default")
            ])
          ], 2)
        ])
      ])) : C("", !0),
      l("div", nh, [
        l("div", oh, [
          U(p.$slots, "default")
        ])
      ]),
      l("div", ah, [
        l("button", {
          type: "button",
          onClick: _,
          class: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        }, uh),
        U(p.$slots, "mobiletitlebar")
      ])
    ]));
  }
}), ch = {
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
  Breadcrumb: Or,
  NavList: Hr,
  NavListItem: Gr,
  AutoQueryGrid: wd,
  SettingsIcons: Dd,
  FilterViews: Hl,
  FilterColumn: Pl,
  QueryPrefs: Rl,
  EnsureAccess: ao,
  EnsureAccessDialog: jd,
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
  AutoViewForm: gv,
  ConfirmDelete: bv,
  FormLoading: xv,
  DataGrid: Av,
  CellFormat: Fv,
  PreviewFormat: Bv,
  HtmlFormat: zv,
  MarkupFormat: qv,
  MarkupModel: ep,
  CloseButton: op,
  SlideOver: wp,
  ModalDialog: Sp,
  ModalLookup: Cm,
  Tabs: Im,
  DarkModeToggle: Pm,
  SignIn: l1,
  MarkdownInput: J1,
  SidebarLayout: dh
}, Ys = ch, gh = {
  install(e) {
    Object.keys(Ys).forEach((s) => {
      e.component(s, Ys[s]);
    });
    function t(s) {
      const a = Object.keys(s).filter((i) => s[i]).map((i) => `${encodeURIComponent(i)}=${encodeURIComponent(s[i])}`).join("&");
      return a ? "?" + a : "./";
    }
    e.directive("href", function(s, n) {
      s.href = t(n.value), s.onclick = (a) => {
        a.preventDefault(), history.pushState(n.value, "", t(n.value));
      };
    });
  },
  component(e, t) {
    return e ? t ? Y.components[e] = t : Y.components[e] || Ys[e] || null : null;
  }
};
export {
  hh as css,
  gh as default,
  Bl as useAuth,
  ys as useClient,
  Nt as useConfig,
  La as useFiles,
  mh as useFormatters,
  dt as useMetadata,
  _n as useUtils
};
