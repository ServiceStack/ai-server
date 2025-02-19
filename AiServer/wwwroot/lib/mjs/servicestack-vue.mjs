var ho = Object.defineProperty;
var go = (e, t, s) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (go(e, typeof t != "symbol" ? t + "" : t, s), s);
import { defineComponent as ue, computed as v, openBlock as o, createElementBlock as r, normalizeClass as y, createElementVNode as l, createCommentVNode as x, renderSlot as U, ref as D, toDisplayString as I, inject as We, nextTick as Ot, isRef as rn, unref as J, mergeProps as Ae, withModifiers as qe, h as Tt, resolveComponent as K, createBlock as ne, withCtx as _e, useAttrs as yo, createVNode as ge, createTextVNode as ke, watchEffect as Ss, normalizeStyle as fl, Fragment as Me, renderList as Ie, withDirectives as Pt, vModelCheckbox as vl, withKeys as un, createStaticVNode as Is, vModelSelect as bo, useSlots as Ds, getCurrentInstance as Be, onMounted as at, createSlots as pl, normalizeProps as Yt, guardReactiveProps as Ms, vModelDynamic as wo, onUnmounted as Et, watch as Lt, vModelText as ko, resolveDynamicComponent as dn, provide as ms, resolveDirective as _o } from "vue";
import { errorResponseExcept as $o, toDate as kt, toTime as Co, omit as yt, enc as tl, appendQueryString as es, lastLeftPart as cn, setQueryString as xo, nameOf as Lo, ApiResult as tt, lastRightPart as Bt, leftPart as js, map as Ze, toDateTime as Vo, toCamelCase as So, mapGet as we, chop as Mo, fromXsdDuration as fn, isDate as Os, timeFmt12 as Ao, dateFmt as To, apiValue as Fo, indexOfAny as Io, createBus as Do, toKebabCase as Xl, sanitize as jo, humanize as He, delaySet as vn, rightPart as xs, queryString as sl, combinePaths as Oo, toPascalCase as vt, errorResponse as _t, trimEnd as Po, $1 as As, ResponseStatus as Xs, ResponseError as Yl, HttpMethods as ml, omitEmpty as Bo, uniqueKeys as ll, humanify as pn, each as Ho } from "@servicestack/client";
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
      class: y([s.value, n.value, "border-l-4 p-4"])
    }, [
      l("div", Ro, [
        i.hideIcon ? x("", !0) : (o(), r("div", Eo, [
          i.type == "warn" ? (o(), r("svg", zo, Uo)) : i.type == "error" ? (o(), r("svg", qo, Ko)) : i.type == "info" ? (o(), r("svg", Zo, Go)) : i.type == "success" ? (o(), r("svg", Jo, Yo)) : x("", !0)
        ])),
        l("div", null, [
          l("p", {
            class: y([a.value, "text-sm"])
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
    const t = D(!1);
    return (s, n) => t.value ? x("", !0) : (o(), r("div", ta, [
      l("div", sa, [
        la,
        l("div", na, [
          l("h3", oa, [
            s.message ? (o(), r("span", aa, I(s.message), 1)) : U(s.$slots, "default", { key: 1 })
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
      class: y(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", va, [
        pa,
        l("div", ma, [
          l("p", ha, I(n.value), 1)
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
    return (t, s) => t.description ? (o(), r("div", {
      key: "description",
      class: "mt-2 text-sm text-gray-500",
      id: `${t.id}-description`,
      "aria-describedby": `${t.id}-description`
    }, [
      l("div", null, I(t.description), 1)
    ], 8, ya)) : x("", !0);
  }
});
function Ps(e) {
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
  if (X.config.inputValue)
    return X.config.inputValue(e, t);
  let s = e === "date" ? Ps(t) : e === "datetime-local" ? mn(t) : e === "time" ? hn(t) : t;
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
  return n && (s = yt(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + nl(s) + "/>" : `<${e}` + nl(s) + `>${t || ""}</${e}>`;
}
function nl(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${tl(e[s])}"`, "");
}
function Bs(e) {
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
function Ts(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function hl(e, t) {
  if (typeof history < "u") {
    const s = t ? es(cn(location.href, "?"), e) : xo(location.href, e);
    history.pushState({}, "", s);
  }
}
function Hs(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, i) => (a[i] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function ol(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function gl(e) {
  const t = X.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Rs(e, t) {
  return es(`swr.${Lo(e)}`, t ? Object.assign({}, e, t) : e);
}
function ka(e) {
  if (e.request) {
    const t = Rs(e.request, e.args);
    X.config.storage.removeItem(t);
  }
}
async function wn(e, t, s, n, a) {
  const i = Rs(t, n);
  s(new tt({ response: gl(i) }));
  const u = await e.api(t, n, a);
  if (u.succeeded && u.response) {
    u.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const d = JSON.stringify(u.response);
    X.config.storage.setItem(i, d), s(u);
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
function Ft(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function jt(e, t) {
  const s = Ft(t);
  return e.reduce((n, a) => (n[a] = !s.includes(a), n), {});
}
function _n() {
  return {
    LocalStore: bn,
    dateInputFormat: Ps,
    dateTimeInputFormat: mn,
    timeInputFormat: hn,
    textInputValue: gn,
    setRef: yn,
    unRefs: Zt,
    transition: xt,
    focusNextElement: Ls,
    getTypeName: zt,
    htmlTag: ht,
    htmlAttrs: nl,
    linkAttrs: Bs,
    toAppUrl: Jt,
    isPrimitive: Ht,
    isComplexType: Xt,
    pushState: hl,
    scopedExpr: Hs,
    copyText: ol,
    fromCache: gl,
    swrCacheKey: Rs,
    swrClear: ka,
    swrApi: wn,
    asStrings: Ft,
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
    f.split(",").forEach(($) => u[$] = m);
  }
  function c(f, m) {
    f.split(",").forEach(($) => u[$] = m($));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (f) => s + f), c("jsx,csv,css", (f) => n + f), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (f) => a + f), c("3gpp,avi,dv,divx,ogg,mp4,webm", (f) => i + f), c("rtf,pdf", (f) => e + f), d("htm,html,shtm", n + "html"), d("js,mjs,cjs", n + "javascript"), d("yml,yaml", e + "yaml"), d("bat,cmd", e + "bat"), d("xml,csproj,fsproj,vbproj", n + "xml"), d("txt,ps1", n + "plain"), d("qt,mov", i + "quicktime"), d("doc,dot", e + "msword"), d("xls,xlt,xla", e + "excel"), d("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), d("cer,crt,der", e + "x-x509-ca-cert"), d("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), d("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), u;
})();
let al = [];
function xn(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(_a, encodeURIComponent);
}
function yl(e) {
  return "data:image/svg+xml;utf8," + xn(e);
}
function Ln(e) {
  let t = URL.createObjectURL(e);
  return al.push(t), t;
}
function Vn() {
  al.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), al = [];
}
function bl(e) {
  if (!e)
    return null;
  let t = js(e, "?");
  return Bt(t, "/");
}
function hs(e) {
  let t = bl(e);
  return t == null || t.indexOf(".") === -1 ? null : Bt(t, ".").toLowerCase();
}
function wl(e) {
  let t = hs(e.name);
  return t && $n.indexOf(t) >= 0 ? Ln(e) : It(e.name);
}
function kl(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = hs(e);
  return t && $n.indexOf(t) >= 0 || !1;
}
function It(e) {
  if (!e)
    return null;
  let t = hs(e);
  return t == null || kl(e) ? e : us(t) || yl(Vs.doc);
}
function us(e) {
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
function Es(e, t) {
  e.onerror = null, e.src = $l(e.src, t) || "";
}
function $l(e, t) {
  return us(Bt(e, ".").toLowerCase()) || (t ? us(t) || t : null) || us("doc");
}
function rl(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Bt(e, ".").toLowerCase();
  return Ca[t] || "application/" + t;
}
function La() {
  return {
    extSvg: Sn,
    extSrc: us,
    getExt: hs,
    encodeSvg: xn,
    canPreview: kl,
    getFileName: bl,
    getMimeType: rl,
    formatBytes: _l,
    filePathUri: It,
    svgToDataUri: yl,
    fileImageUri: wl,
    objectUrl: Ln,
    flush: Vn,
    inputFiles: xa,
    iconOnError: Es,
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
}, il = {
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
[...Object.keys(il), ...Object.values(il)];
const Aa = {
  String: "string",
  Boolean: "bool",
  ...il
};
function _s(e) {
  return Aa[e] || e;
}
function Mn(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? _s(t[0]) + "?" : e.endsWith("[]") ? `List<${_s(e.substring(0, e.length - 2))}>` : t.length === 0 ? _s(e) : js(_s(e), "`") + "<" + t.join(",") + ">") : "";
}
function Ta(e) {
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
    if (X.config.apisResolver && t) {
      const i = X.config.apisResolver(t, s);
      i && (n.Query = i.Query, n.QueryInto = i.QueryInto, n.Create = i.Create, n.Update = i.Update, n.Patch = i.Patch, n.Delete = i.Delete);
    }
    return t && (s ?? (s = (a = X.metadata.value) == null ? void 0 : a.api), s == null || s.operations.forEach((i) => {
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
function Fa(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || zs(Cl(e));
}
function An(e) {
  return e.endsWith("?") ? Mo(e, 1) : e;
}
function zs(e) {
  return Sa[An(e)];
}
function Ia(e) {
  return e && Ma[e] || "String";
}
function Cl(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function ul(e) {
  return e && zs(e) == "number" || !1;
}
function Tn(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function Da(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function Fn(e) {
  if (!(e != null && e.type))
    return !1;
  const t = Cl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : zs(e.type) == null;
}
function In(e) {
  var s, n, a, i;
  if (!(e != null && e.type))
    return !1;
  const t = Cl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((i = e.input) == null ? void 0 : i.type) == "combobox" ? !0 : zs(e.type) != null;
}
function fs(e, t) {
  let s = typeof e == "string" ? Ns(e) : e;
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
function ds(e, t) {
  return e ? (Object.keys(e).forEach((s) => {
    let n = e[s];
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = Ps(kt(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function Oa(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var m;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const i = a.id.toLowerCase(), u = t && t.find(($) => $.name.toLowerCase() == i);
    let d = u == null ? void 0 : u.type, c = (m = u == null ? void 0 : u.genericArgs) == null ? void 0 : m[0], f = a.type === "checkbox" ? a.checked : a.value;
    ul(d) ? f = Number(f) : d === "List`1" && typeof f == "string" && (f = f.split(",").map(($) => ul(c) ? Number($) : $)), s[a.id] = f;
  }), s;
}
function xl(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function Pa(e) {
  if (!Ll() && (e != null && e.assert) && !X.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return X.metadata.value;
}
function vs(e) {
  return e && xl(e) ? (e.date = Vo(/* @__PURE__ */ new Date()), X.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(ts, JSON.stringify(e)), !0) : !1;
}
function Ba() {
  X.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(ts);
}
function Ll() {
  if (X.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (xl(e))
    vs(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(ts) : null;
    if (t)
      try {
        vs(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${ts} from localStorage`);
      }
  }
  return X.metadata.value != null;
}
async function sn(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    vs(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  xl(X.metadata.value) || console.warn("AppMetadata is not available");
}
async function Ha(e) {
  var i;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = Ll() && t !== 0;
  if (a && t) {
    let u = kt((i = X.metadata.value) == null ? void 0 : i.date);
    (!u || (/* @__PURE__ */ new Date()).getTime() - u.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await sn(s || ts, n), X.metadata.value != null))
      return;
    const u = We("client");
    if (u != null) {
      const d = await u.api(new Va());
      d.succeeded && vs(d.response);
    }
    if (X.metadata.value != null)
      return;
    await sn(ts);
  }
  return X.metadata.value;
}
function pt(e, t) {
  var u;
  if (X.config.typeResolver) {
    let d = X.config.typeResolver(e, t);
    if (d)
      return d;
  }
  let s = (u = X.metadata.value) == null ? void 0 : u.api;
  if (!s || !e)
    return null;
  let n = s.types.find((d) => d.name.toLowerCase() === e.toLowerCase() && (!t || d.namespace == t));
  if (n)
    return n;
  let a = Ns(e);
  if (a)
    return a.request;
  let i = s.operations.find((d) => d.response && d.response.name.toLowerCase() === e.toLowerCase() && (!t || d.response.namespace == t));
  return i ? i.response : null;
}
function Ns(e) {
  var n;
  if (X.config.apiResolver) {
    const a = X.config.apiResolver(e);
    if (a)
      return a;
  }
  let t = (n = X.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function Ra({ dataModel: e }) {
  var n;
  const t = (n = X.metadata.value) == null ? void 0 : n.api;
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
function Pn(e) {
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
  }, t))(e.name, (t == null ? void 0 : t.type) || Fa(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = Sl(Pn(e))), n;
}
function Na(e) {
  let t = [];
  if (e) {
    const s = ot(e), n = Ns(e.name), a = Vl(n == null ? void 0 : n.dataModel);
    s.forEach((i) => {
      var d, c, f;
      if (!In(i))
        return;
      const u = za(i, i.input);
      if (u.id = So(u.id), u.type == "file" && i.uploadTo && !u.accept) {
        const m = (c = (d = X.metadata.value) == null ? void 0 : d.plugins.filesUpload) == null ? void 0 : c.locations.find(($) => $.name == i.uploadTo);
        m && !u.accept && m.allowExtensions && (u.accept = m.allowExtensions.map(($) => $.startsWith(".") ? $ : `.${$}`).join(","));
      }
      if (a) {
        const m = (f = a.properties) == null ? void 0 : f.find(($) => $.name == i.name);
        i.ref || (i.ref = m == null ? void 0 : m.ref);
      }
      if (u.options)
        try {
          const m = {
            input: u,
            $typeFields: s.map((k) => k.name),
            $dataModelFields: a ? ot(a).map((k) => k.name) : [],
            ...X.config.scopeWhitelist
          }, $ = Hs(u.options, m);
          Object.keys($).forEach((k) => {
            u[k] = $[k];
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
function Bn(e) {
  return (t) => typeof t == "number" ? Ml(t, { type: e }) : t;
}
function ot(e) {
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
function ls(e) {
  return e ? Hn(e, ot(e)) : null;
}
function Hn(e, t) {
  let s = t.find((i) => i.name.toLowerCase() === "id");
  if (s && s.isPrimaryKey)
    return s;
  let a = t.find((i) => i.isPrimaryKey) || s;
  if (!a) {
    let i = Ke.model(e);
    if (i)
      return Ze(pt(i), (u) => ls(u));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function Ua(e, t) {
  return Ze(ls(e), (s) => we(t, s.name));
}
function Rn(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : qa(t, s.value);
}
function qa(e, t) {
  return e ? (e = An(e), ul(e) || e === "Boolean" ? t : Da(e) ? `[${t}]` : `'${t}'`) : t;
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
    return ((n = X.metadata.value) == null ? void 0 : n.app) || null;
  }), t = v(() => {
    var n;
    return ((n = X.metadata.value) == null ? void 0 : n.api) || null;
  }), s = v(() => {
    var n, a, i;
    return ((i = (a = (n = X.metadata.value) == null ? void 0 : n.plugins) == null ? void 0 : a.autoQuery) == null ? void 0 : i.viewerConventions) || Qa;
  });
  return Ll(), {
    loadMetadata: Ha,
    getMetadata: Pa,
    setMetadata: vs,
    clearMetadata: Ba,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: pt,
    typeOfRef: Vl,
    typeEquals: Dn,
    apiOf: Ns,
    findApis: Ra,
    typeName: Ta,
    typeName2: Mn,
    property: Ea,
    enumOptions: jn,
    propertyOptions: Pn,
    createFormLayout: Na,
    typeProperties: ot,
    supportsProp: In,
    Crud: Ke,
    Apis: Rt,
    getPrimaryKey: ls,
    getPrimaryKeyByProps: Hn,
    getId: Ua,
    createDto: fs,
    makeDto: ja,
    toFormValues: ds,
    formValues: Oa,
    isComplexProp: Fn,
    asKvps: Sl,
    expandEnumFlags: Ml,
    enumFlagsConverter: Bn
  };
}
const it = class it {
  static async getOrFetchValue(t, s, n, a, i, u, d) {
    const c = it.getValue(n, d, i);
    return c ?? (await it.fetchLookupIds(t, s, n, a, i, u, [d]), it.getValue(n, d, i));
  }
  static getValue(t, s, n) {
    const a = it.Lookup[t];
    if (a) {
      const i = a[s];
      if (i)
        return n = n.toLowerCase(), i[n];
    }
  }
  static setValue(t, s, n, a) {
    const i = it.Lookup[t] ?? (it.Lookup[t] = {}), u = i[s] ?? (i[s] = {});
    n = n.toLowerCase(), u[n] = a;
  }
  static setRefValue(t, s) {
    const n = we(s, t.refId);
    if (n == null || t.refLabel == null)
      return null;
    const a = we(s, t.refLabel);
    return it.setValue(t.model, n, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, s, n, a, i, u, d) {
    const c = s.operations.find((f) => {
      var m;
      return Ke.isAnyQuery(f) && ((m = f.dataModel) == null ? void 0 : m.name) == n;
    });
    if (c) {
      const f = it.Lookup[n] ?? (it.Lookup[n] = {}), m = [];
      Object.keys(f).forEach((F) => {
        const R = f[F];
        we(R, i) && m.push(F);
      });
      const $ = d.filter((F) => !m.includes(F));
      if ($.length == 0)
        return;
      const k = u ? null : `${a},${i}`, p = {
        [a + "In"]: $.join(",")
      };
      k && (p.fields = k);
      const b = fs(c, p), _ = await t.api(b, { jsconfig: "edv,eccn" });
      if (_.succeeded)
        (we(_.response, "results") || []).forEach((R) => {
          if (!we(R, a)) {
            console.error(`result[${a}] == null`, R);
            return;
          }
          const oe = `${we(R, a)}`, N = we(R, i);
          i = i.toLowerCase();
          const E = f[oe] ?? (f[oe] = {});
          E[i] = `${N}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(it, "Lookup", {});
let Wt = it, dl = () => (/* @__PURE__ */ new Date()).getTime(), Ka = ["/", "T", ":", "-"], gt = {
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
}, Za = new Intl.RelativeTimeFormat(gt.locale, {}), ln = 24 * 60 * 60 * 1e3 * 365, Ys = {
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
  relativeTime: Tl,
  relativeTimeFromMs: Us,
  enumFlags: Yn,
  formatDate: ns,
  formatNumber: Al
};
"iconOnError" in globalThis || (globalThis.iconOnError = Es);
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
  return ht("a", e, Bs({ ...t, href: e }));
}
function qn(e, t) {
  return ht("a", e, Bs({ ...t, href: `tel:${e}` }));
}
function Qn(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = yt(t, ["subject", "body"]), i = {};
  return s && (i.subject = s), n && (i.body = n), ht("a", e, Bs({ ...a, href: `mailto:${es(e, i)}` }));
}
function Kn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Zn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Wn(e, t) {
  let s = bl(e), a = hs(s) == null || kl(e) ? Jt(e) : $l(e);
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
function ns(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? kt(e) : e;
  if (!Os(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = gt.date ? qs(gt.date) : null;
  return gs(typeof n == "function" ? n(s) : To(s), t);
}
function Al(e, t) {
  if (typeof e != "number")
    return e;
  let s = gt.number ? qs(gt.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), gs(n, t);
}
function Xn(e, t, s) {
  let n = Fo(e), a = t ? qs(t) : null;
  if (typeof a == "function") {
    let u = s;
    if (t != null && t.options)
      try {
        u = Hs(t.options, s);
      } catch (d) {
        console.error(`Could not evaluate '${t.options}'`, d, ", with scope:", s);
      }
    return a(e, u);
  }
  let i = n != null ? Os(n) ? ns(n, s) : typeof n == "number" ? Al(n, s) : n : null;
  return i ?? "";
}
function ps(e, t, s) {
  return Ht(e) ? Xn(e, t, s) : tr(e, t, s);
}
function Ja(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (Os(e))
    return e.getTime() - dl();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return fn(e) * 1e3 * -1;
    if (Io(e, Ka) >= 0)
      return kt(e).getTime() - dl();
  }
  return NaN;
}
function Us(e, t) {
  for (let s in Ys)
    if (Math.abs(e) > Ys[s] || s === "second")
      return (t || Za).format(Math.round(e / Ys[s]), s);
}
function Tl(e, t) {
  let s = Ja(e);
  return isNaN(s) ? "" : Us(s, t);
}
function Xa(e, t) {
  return Us(e.getTime() - (t ? t.getTime() : dl()));
}
function Yn(e, t) {
  return Ml(e, t).join(", ");
}
function qs(e) {
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
      return a = t === "Intl.DateTimeFormat" ? (f) => c.format(kt(f)) : t === "Intl.NumberFormat" ? (f) => c.format(Number(f)) : t === "Intl.RelativeTimeFormat" ? (f) => Tl(f, c) : (f) => c.format(f), Dt[n] = a;
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
  return e.substring(0, 6) === "/Date(" ? ns(kt(e)) : e;
}
function Ya(e) {
  return Fl(ss(e)).replace(/"/g, "");
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
  return e = so(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = ss(e), Fl(e));
}
function ss(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return to(e);
  if (Ht(e))
    return e;
  if (e instanceof Date)
    return ns(e);
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
    return ns(n, s);
  let a = Object.keys(n), i = [];
  for (let u = 0; u < Math.min(gt.maxNestedFields, a.length); u++) {
    let d = a[u], c = `${ss(n[d])}`;
    i.push(`<b class="font-medium">${d}</b>: ${tl(eo(to(c), gt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && i.push("..."), ht("span", "{ " + i.join(", ") + " }", Object.assign({ title: tl(Ya(e)) }, s));
}
function mh() {
  return {
    Formats: Xe,
    setDefaultFormats: Wa,
    getFormatters: En,
    setFormatters: Ga,
    formatValue: ps,
    formatter: qs,
    dateInputFormat: Ps,
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
    relativeTime: Tl,
    relativeTimeFromDate: Xa,
    relativeTimeFromMs: Us,
    enumFlags: Yn,
    formatDate: ns,
    formatNumber: Al,
    indentJson: Fl,
    prettyJson: er,
    scrub: ss,
    truncate: eo,
    apiValueFmt: Xn,
    iconOnError: Es
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
const ut = class ut {
  static component(t) {
    const s = ut.components[t];
    if (s)
      return s;
    const n = Xl(t), a = Object.keys(ut.components).find((i) => Xl(i) === n);
    return a && ut.components[a] || null;
  }
};
Le(ut, "config", {
  redirectSignIn: "/signin",
  redirectSignOut: "/auth/logout",
  navigate: (t) => location.href = t,
  assetsPathResolver: (t) => t,
  fallbackPathResolver: (t) => t,
  storage: new bn(),
  tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
  scopeWhitelist: {
    enumFlagsConverter: Bn,
    ...En()
  }
}), Le(ut, "autoQueryGridDefaults", {
  deny: [],
  hide: [],
  toolbarButtonClass: void 0,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150
}), Le(ut, "events", Do()), Le(ut, "user", D(null)), Le(ut, "metadata", D(null)), Le(ut, "components", {
  RouterLink: lr
}), Le(ut, "interceptors", new nr());
let X = ut;
function or(e) {
  X.config = Object.assign(X.config, e);
}
function ar(e) {
  X.autoQueryGridDefaults = Object.assign(X.autoQueryGridDefaults, e);
}
function Il(e) {
  return e && X.config.assetsPathResolver ? X.config.assetsPathResolver(e) : e;
}
function rr(e) {
  return e && X.config.fallbackPathResolver ? X.config.fallbackPathResolver(e) : e;
}
function ir(e, t) {
  X.interceptors.register(e, t);
}
function Nt() {
  const e = v(() => X.config), t = v(() => X.autoQueryGridDefaults), s = X.events;
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
        return Tt("span", { innerHTML: n });
      } else
        return Tt("img", {
          class: [s == null ? void 0 : s.cls, t.class],
          src: Il(e.src || (s == null ? void 0 : s.uri)),
          onError: (i) => Es(i.target)
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
          class: y(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
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
      const n = K("router-link");
      return t.href ? (o(), ne(n, {
        key: 0,
        to: t.href
      }, {
        default: _e(({ navigate: a }) => [
          l("button", {
            class: y(nn),
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
      const u = K("router-link");
      return a.href ? (o(), ne(u, {
        key: 0,
        to: a.href
      }, {
        default: _e(({ navigate: d }) => [
          l("button", {
            class: y(n.value),
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
      const n = K("router-link");
      return t.href ? (o(), ne(n, {
        key: 0,
        to: t.href
      }, {
        default: _e(({ navigate: a }) => [
          l("button", {
            type: t.type ?? "button",
            class: y(on),
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
}, is = {
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
}, cl = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Ee = {
  panelClass(e = "slideOver") {
    return e == "card" ? is.panelClass : Gt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? is.formClass : Gt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? is.headingClass : Gt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? is.subHeadingClass : Gt.subHeadingClass;
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
  a: Fs,
  card: is,
  dummy: Cr,
  form: Ee,
  grid: me,
  input: ft,
  modal: cl,
  slideOver: Gt
}, Symbol.toStringTag, { value: "Module" })), xr = /* @__PURE__ */ ue({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = yo(), s = e, n = v(() => (Fs[s.color] || Fs.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, i) => (o(), r("a", {
      class: y(n.value)
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
], -1), Ar = { class: "sr-only" }, Tr = /* @__PURE__ */ ue({
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
              l("span", Ar, I(t.homeLabel), 1)
            ], 8, Sr)
          ])
        ]),
        U(t.$slots, "default")
      ])
    ]));
  }
}), Fr = { class: "flex items-center" }, Ir = /* @__PURE__ */ l("svg", {
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
      l("div", Fr, [
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
}), Pr = {
  key: 0,
  class: "text-base font-semibold text-gray-500 dark:text-gray-400"
}, Br = {
  role: "list",
  class: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800"
}, Hr = /* @__PURE__ */ ue({
  __name: "NavList",
  props: {
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("div", null, [
      t.title ? (o(), r("h2", Pr, I(t.title), 1)) : x("", !0),
      l("ul", Br, [
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
      const n = K("Icon");
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
                ke(" " + I(t.title), 1)
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
  X.user.value = no(e), X.events.publish("signIn", e);
}
function Xr() {
  X.user.value = null, X.events.publish("signOut", null);
}
const Dl = (e) => (e == null ? void 0 : e.roles) || [], jl = (e) => (e == null ? void 0 : e.permissions) || [];
function oo(e) {
  return Dl(X.user.value).indexOf(e) >= 0;
}
function Yr(e) {
  return jl(X.user.value).indexOf(e) >= 0;
}
function Ol() {
  return oo("Admin");
}
function cs(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = X.user.value;
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
  const t = X.user.value;
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
function Pl() {
  const e = v(() => X.user.value || null), t = v(() => X.user.value != null);
  return { signIn: Jr, signOut: Xr, user: e, toAuth: no, isAuthenticated: t, hasRole: oo, hasPermission: Yr, isAdmin: Ol, canAccess: cs, invalidAccessMessage: ei };
}
const ti = { key: 0 }, si = { class: "md:p-4" }, ao = /* @__PURE__ */ ue({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Pl(), { config: s } = Nt(), n = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = es(s.value.redirectSignIn, { redirect: i });
      s.value.navigate(u);
    }, a = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = es(s.value.redirectSignOut, { ReturnUrl: i });
      s.value.navigate(u);
    };
    return (i, u) => {
      const d = K("Alert"), c = K("SecondaryButton");
      return i.invalidAccess ? (o(), r("div", ti, [
        ge(d, {
          class: y(i.alertClass),
          innerHTML: i.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", si, [
          J(t) ? (o(), ne(c, {
            key: 1,
            onClick: a
          }, {
            default: _e(() => [
              ke("Sign Out")
            ]),
            _: 1
          })) : (o(), ne(c, {
            key: 0,
            onClick: n
          }, {
            default: _e(() => [
              ke("Sign In")
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
], xi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Bl = /* @__PURE__ */ ue({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = D(), i = D(""), u = D(""), d = D([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => pt(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), m = v(() => s.column.meta.isEnum == !0 ? Sl(jn(f.value.name)) : []), $ = v(() => {
      var w;
      return ((w = b(s.column.type)) == null ? void 0 : w.map((j) => ({ key: j.value, value: j.name }))) || [];
    }), k = D({ filters: [] }), p = v(() => k.value.filters);
    Ss(() => k.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), Ss(() => {
      var j, q, le, T, Z;
      let w = ((le = (q = (j = s.column.settings.filters) == null ? void 0 : j[0]) == null ? void 0 : q.value) == null ? void 0 : le.split(",")) || [];
      if (w.length > 0 && ((T = f.value) != null && T.isEnumInt)) {
        const W = parseInt(w[0]);
        w = ((Z = f.value.enumValues) == null ? void 0 : Z.filter((Q) => (W & parseInt(Q)) > 0)) || [];
      }
      d.value = w;
    });
    function b(w) {
      let j = s.definitions;
      return Tn(w) || (j = j.filter((q) => q.types !== "string")), j;
    }
    function _(w, j) {
      return b(w).find((q) => q.value === j);
    }
    function F() {
      var j;
      if (!i.value)
        return;
      let w = (j = _(s.column.type, i.value)) == null ? void 0 : j.name;
      w && (k.value.filters.push({ key: i.value, name: w, value: u.value }), i.value = u.value = "");
    }
    function R(w) {
      k.value.filters.splice(w, 1);
    }
    function oe(w) {
      return Rn(_(s.column.type, w.key), s.column.type, w);
    }
    function N() {
      n("done");
    }
    function E() {
      var w;
      i.value = "%", (w = a.value) == null || w.focus();
    }
    function M() {
      var w;
      if (u.value && F(), c.value) {
        let j = Object.values(d.value).filter((q) => q);
        k.value.filters = j.length > 0 ? (w = f.value) != null && w.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: j.map((q) => parseInt(q)).reduce((q, le) => q + le, 0).toString() }] : [{ key: "%In", name: "In", value: j.join(",") }] : [];
      }
      n("save", k.value), n("done");
    }
    function te(w) {
      k.value.sort = w === k.value.sort ? void 0 : w, Ot(M);
    }
    return (w, j) => {
      var W;
      const q = K("SelectInput"), le = K("TextInput"), T = K("PrimaryButton"), Z = K("SecondaryButton");
      return o(), r("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: N,
        onVnodeMounted: E
      }, [
        l("div", {
          class: "absolute",
          style: fl(`top:${w.topLeft.y}px;left:${w.topLeft.x}px`),
          onClick: j[5] || (j[5] = qe(() => {
          }, ["stop"]))
        }, [
          l("div", li, [
            l("div", ni, [
              oi,
              l("div", ai, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: j[0] || (j[0] = (Q) => te("ASC")),
                  class: y(`${k.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ui, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: j[1] || (j[1] = (Q) => te("DESC")),
                  class: y(`${k.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ci, 2)
              ]),
              fi,
              c.value ? (o(), r("div", vi, [
                (o(!0), r(Me, null, Ie(m.value, (Q) => (o(), r("div", {
                  key: Q.key,
                  class: "flex items-center"
                }, [
                  Pt(l("input", {
                    type: "checkbox",
                    id: Q.key,
                    value: Q.key,
                    "onUpdate:modelValue": j[2] || (j[2] = (A) => d.value = A),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, pi), [
                    [vl, d.value]
                  ]),
                  l("label", {
                    for: Q.key,
                    class: "ml-3"
                  }, I(Q.value), 9, mi)
                ]))), 128))
              ])) : (o(), r("div", hi, [
                (o(!0), r(Me, null, Ie(p.value, (Q, A) => (o(), r("div", gi, [
                  l("span", yi, [
                    ke(I(w.column.name) + " " + I(Q.name) + " " + I(oe(Q)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (se) => R(A),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, ki, 8, bi)
                  ])
                ]))), 256)),
                l("div", _i, [
                  ge(q, {
                    id: "filterRule",
                    class: "w-32 mr-1",
                    modelValue: i.value,
                    "onUpdate:modelValue": j[3] || (j[3] = (Q) => i.value = Q),
                    entries: $.value,
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue", "entries"]),
                  ((W = _(w.column.type, i.value)) == null ? void 0 : W.valueType) !== "none" ? (o(), ne(le, {
                    key: 0,
                    ref_key: "txtFilter",
                    ref: a,
                    id: "filterValue",
                    class: "w-32 mr-1",
                    type: "text",
                    modelValue: u.value,
                    "onUpdate:modelValue": j[4] || (j[4] = (Q) => u.value = Q),
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
              ge(T, {
                onClick: M,
                color: "red",
                class: "ml-2"
              }, {
                default: _e(() => [
                  ke(" Save ")
                ]),
                _: 1
              }),
              ge(Z, { onClick: N }, {
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
}), Li = { class: "px-4 sm:px-6 lg:px-8 text-sm" }, Vi = { class: "flex flex-wrap" }, Si = { class: "group pr-4 sm:pr-6 lg:pr-8" }, Mi = { class: "flex justify-between w-full font-medium" }, Ai = { class: "w-6 flex justify-end" }, Ti = { class: "hidden group-hover:inline" }, Fi = ["onClick", "title"], Ii = /* @__PURE__ */ l("svg", {
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
}, Oi = { class: "ml-2" }, Pi = { key: 1 }, Bi = { class: "pt-2" }, Hi = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, Ri = ["onClick"], Ei = /* @__PURE__ */ l("svg", {
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
    const s = e, n = t, a = v(() => s.columns.filter((k) => k.settings.filters.length > 0));
    function i(k) {
      var p, b;
      return (b = (p = k == null ? void 0 : k[0]) == null ? void 0 : p.value) == null ? void 0 : b.split(",");
    }
    function u(k) {
      let p = s.definitions;
      return Tn(k) || (p = p.filter((b) => b.types !== "string")), p;
    }
    function d(k, p) {
      return u(k).find((b) => b.value === p);
    }
    function c(k, p) {
      return Rn(d(k.type, p.value), k.type, p);
    }
    function f(k) {
      k.settings.filters = [], n("change", k);
    }
    function m(k, p) {
      k.settings.filters.splice(p, 1), n("change", k);
    }
    function $() {
      s.columns.forEach((k) => {
        k.settings.filters = [], n("change", k);
      }), n("done");
    }
    return (k, p) => (o(), r("div", Li, [
      l("div", Vi, [
        (o(!0), r(Me, null, Ie(a.value, (b) => (o(), r("fieldset", Si, [
          l("legend", Mi, [
            l("span", null, I(J(He)(b.name)), 1),
            l("span", Ai, [
              l("span", Ti, [
                l("button", {
                  onClick: (_) => f(b),
                  title: `Clear all ${J(He)(b.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, Di, 8, Fi)
              ])
            ])
          ]),
          b.meta.isEnum ? (o(), r("div", ji, [
            (o(!0), r(Me, null, Ie(i(b.settings.filters), (_) => (o(), r("div", {
              key: _,
              class: "flex items-center"
            }, [
              l("label", Oi, I(_), 1)
            ]))), 128))
          ])) : (o(), r("div", Pi, [
            (o(!0), r(Me, null, Ie(b.settings.filters, (_, F) => (o(), r("div", Bi, [
              l("span", Hi, [
                ke(I(b.name) + " " + I(_.name) + " " + I(c(b, _)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (R) => m(b, F),
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
          onClick: $,
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
    const { autoQueryGridDefaults: s } = Nt(), n = e, a = t, i = D({});
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
      const $ = K("PrimaryButton"), k = K("SecondaryButton"), p = K("ModalDialog");
      return o(), ne(p, {
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
                  Pt(l("select", {
                    id: `${f.id}-take`,
                    "onUpdate:modelValue": m[0] || (m[0] = (b) => i.value.take = b),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), r(Me, null, Ie(u.filter((b) => n.maxLimit == null || b <= n.maxLimit), (b) => (o(), r("option", {
                      value: b,
                      selected: b === i.value.take
                    }, I(b), 9, Xi))), 256))
                  ], 8, Ji), [
                    [bo, i.value.take]
                  ])
                ]),
                l("div", Yi, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: m[1] || (m[1] = (b) => i.value.selectedColumns = []),
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
                      (o(!0), r(Me, null, Ie(f.columns, (b) => (o(), r("div", {
                        key: b.name,
                        class: "flex items-center"
                      }, [
                        Pt(l("input", {
                          type: "checkbox",
                          id: b.name,
                          value: b.name,
                          "onUpdate:modelValue": m[2] || (m[2] = (_) => i.value.selectedColumns = _),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, ou), [
                          [vl, i.value.selectedColumns]
                        ]),
                        l("label", {
                          for: b.name,
                          class: "ml-3"
                        }, I(b.name), 9, au)
                      ]))), 128))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          l("div", ru, [
            ge($, {
              onClick: c,
              color: "red",
              class: "ml-2"
            }, {
              default: _e(() => [
                ke(" Save ")
              ]),
              _: 1
            }),
            ge(k, { onClick: d }, {
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
], -1), Tu = [
  Au
], Fu = {
  key: 0,
  class: "flex mt-1"
}, Iu = { class: "px-4 text-lg text-black dark:text-white" }, Du = { key: 0 }, ju = { key: 1 }, Ou = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Pu = { key: 2 }, Bu = { class: "flex flex-wrap" }, Hu = {
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
    const { config: n, autoQueryGridDefaults: a } = Nt(), i = a, u = n.value.storage, d = e, c = s, f = We("client"), m = "filtering,queryString,queryFilters".split(","), $ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), k = v(() => d.deny ? jt(m, d.deny) : jt(m, i.value.deny)), p = v(() => d.hide ? jt($, d.hide) : jt($, i.value.hide));
    function b(C) {
      return k.value[C];
    }
    function _(C) {
      return p.value[C];
    }
    const F = v(() => d.tableStyle ?? i.value.tableStyle), R = v(() => d.gridClass ?? me.getGridClass(F.value)), oe = v(() => d.grid2Class ?? me.getGrid2Class(F.value)), N = v(() => d.grid3Class ?? me.getGrid3Class(F.value)), E = v(() => d.grid4Class ?? me.getGrid4Class(F.value)), M = v(() => d.tableClass ?? me.getTableClass(F.value)), te = v(() => d.theadClass ?? me.getTheadClass(F.value)), w = v(() => d.theadRowClass ?? me.getTheadRowClass(F.value)), j = v(() => d.theadCellClass ?? me.getTheadCellClass(F.value)), q = v(() => d.toolbarButtonClass ?? me.toolbarButtonClass);
    function le(C, P) {
      var Fe;
      if (d.rowClass)
        return d.rowClass(C, P);
      const fe = !!ye.value.AnyUpdate, $e = ((Fe = Ce.value) != null && Fe.name ? we(C, Ce.value.name) : null) == ee.value;
      return me.getTableRowClass(d.tableStyle, P, $e, fe);
    }
    const T = Ds(), Z = v(() => {
      var C;
      return Zs(((C = ye.value.AnyQuery.viewModel) == null ? void 0 : C.name) || ye.value.AnyQuery.dataModel.name);
    }), W = v(() => {
      const C = Object.keys(T).map((P) => P.toLowerCase());
      return ot(Z.value).filter((P) => C.includes(P.name.toLowerCase()) || C.includes(P.name.toLowerCase() + "-header")).map((P) => P.name);
    });
    function Q() {
      let C = Ft(d.selectedColumns);
      return C.length > 0 ? C : W.value.length > 0 ? W.value : [];
    }
    const A = v(() => {
      let P = Q().map((re) => re.toLowerCase());
      const fe = ot(Z.value);
      return P.length > 0 ? P.map((re) => fe.find(($e) => $e.name.toLowerCase() === re)).filter((re) => re != null) : fe;
    }), se = v(() => {
      let C = A.value.map((fe) => fe.name), P = Ft(de.value.selectedColumns).map((fe) => fe.toLowerCase());
      return P.length > 0 ? C.filter((fe) => P.includes(fe.toLowerCase())) : C;
    }), h = D([]), z = D(new tt()), H = D(new tt()), g = D(), L = D(!1), ee = D(), Y = D(), ae = D(!1), O = D(), V = D(d.skip), ce = D(!1), de = D({ take: Cs }), ie = D(!1), pe = v(() => h.value.some((C) => C.settings.filters.length > 0 || !!C.settings.sort) || de.value.selectedColumns), S = v(() => h.value.map((C) => C.settings.filters.length).reduce((C, P) => C + P, 0)), ve = v(() => {
      var C;
      return ot(Zs(Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name)));
    }), Ce = v(() => {
      var C;
      return ls(Zs(Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name)));
    }), Ve = v(() => de.value.take ?? Cs), he = v(() => z.value.response ? we(z.value.response, "results") : []), je = v(() => {
      var C;
      return (((C = z.value.response) == null ? void 0 : C.total) || he.value.length) ?? 0;
    }), Oe = v(() => V.value > 0), xe = v(() => V.value > 0), Qe = v(() => he.value.length >= Ve.value), Re = v(() => he.value.length >= Ve.value), Pe = D(), Ge = D(), st = {
      NoQuery: "No Query API was found"
    };
    t({
      update: Se,
      search: qt,
      createRequestArgs: Qs,
      reset: Wl,
      createDone: rs,
      createSave: Js,
      editDone: St,
      editSave: Kt,
      forceUpdate: $t,
      setEdit: bt,
      edit: Y,
      createForm: Pe,
      editForm: Ge,
      apiPrefs: de,
      results: he,
      skip: V,
      take: Ve,
      total: je
    }), X.interceptors.has("AutoQueryGrid.new") && X.interceptors.invoke("AutoQueryGrid.new", { props: d });
    function Je(C) {
      if (C) {
        if (d.canFilter)
          return d.canFilter(C);
        const P = ve.value.find((fe) => fe.name.toLowerCase() == C.toLowerCase());
        if (P)
          return !Fn(P);
      }
      return !1;
    }
    function Te(C) {
      c("nav", C), b("queryString") && hl(C);
    }
    async function lt(C) {
      V.value += C, V.value < 0 && (V.value = 0);
      const P = Math.floor(je.value / Ve.value) * Ve.value;
      V.value > P && (V.value = P), Te({ skip: V.value || void 0 }), await Se();
    }
    async function ze(C, P) {
      var $e, Fe;
      if (Y.value = null, ee.value = P, !C || !P)
        return;
      let fe = fs(ye.value.AnyQuery, { [C]: P });
      const re = await f.api(fe);
      if (re.succeeded) {
        let Ne = ($e = we(re.response, "results")) == null ? void 0 : $e[0];
        Ne || console.warn(`API ${(Fe = ye.value.AnyQuery) == null ? void 0 : Fe.request.name}(${C}:${P}) returned no results`), Y.value = Ne;
      }
    }
    async function rt(C, P) {
      var $e;
      c("rowSelected", C, P);
      const fe = ($e = Ce.value) == null ? void 0 : $e.name, re = fe ? we(C, fe) : null;
      !fe || !re || (Te({ edit: re }), ze(fe, re));
    }
    function B(C, P) {
      var re;
      if (!b("filtering"))
        return;
      let fe = P.target;
      if (Je(C) && (fe == null ? void 0 : fe.tagName) !== "TD") {
        let $e = (re = fe == null ? void 0 : fe.closest("TABLE")) == null ? void 0 : re.getBoundingClientRect(), Fe = h.value.find((Ne) => Ne.name.toLowerCase() == C.toLowerCase());
        if (Fe && $e) {
          let Ne = 318, mt = $e.x + Ne + 10;
          O.value = {
            column: Fe,
            topLeft: {
              x: Math.max(Math.floor(P.clientX + Ne / 2), mt),
              y: $e.y + 45
            }
          };
        }
      }
      c("headerSelected", C, P);
    }
    function G() {
      O.value = null;
    }
    async function be(C) {
      var fe;
      let P = (fe = O.value) == null ? void 0 : fe.column;
      P && (P.settings = C, u.setItem(bs(P.name), JSON.stringify(P.settings)), await Se()), O.value = null;
    }
    async function De(C) {
      u.setItem(bs(C.name), JSON.stringify(C.settings)), await Se();
    }
    async function Ye(C) {
      ae.value = !1, de.value = C, u.setItem(Ks(), JSON.stringify(C)), await Se();
    }
    function ct(C) {
      var P;
      Pe.value && (Object.assign((P = Pe.value) == null ? void 0 : P.model, C), $t());
    }
    function bt(C) {
      Object.assign(Y.value, C), $t();
    }
    function $t() {
      var P, fe, re;
      (P = Pe.value) == null || P.forceUpdate(), (fe = Ge.value) == null || fe.forceUpdate();
      const C = Be();
      (re = C == null ? void 0 : C.proxy) == null || re.$forceUpdate();
    }
    async function Se() {
      await qt(Qs());
    }
    async function Vt() {
      await Se();
    }
    const Ut = /iPad|iPhone|iPod/.test(navigator.userAgent);
    async function qt(C) {
      const P = ye.value.AnyQuery;
      if (!P) {
        console.error(st.NoQuery);
        return;
      }
      let fe = fs(P, C), re = await f.api(fe);
      vn((Ne) => {
        z.value.response = z.value.error = void 0, ie.value = Ne, Ut ? Ot(() => z.value = re) : z.value = re;
      })();
      let Fe = we(re.response, "results") || [];
      !re.succeeded || Fe.label == 0;
    }
    function Qs() {
      let C = {
        include: "total",
        take: Ve.value
      }, P = Ft(de.value.selectedColumns || d.selectedColumns);
      if (P.length > 0) {
        let re = Ce.value;
        re && !P.includes(re.name) && (P = [re.name, ...P]);
        const $e = ve.value, Fe = [];
        P.forEach((Ne) => {
          var ks;
          const mt = $e.find((Mt) => Mt.name.toLowerCase() == Ne.toLowerCase());
          (ks = mt == null ? void 0 : mt.ref) != null && ks.selfId && Fe.push(mt.ref.selfId), we(T, Ne) && Fe.push(...$e.filter((Mt) => {
            var Ue, At;
            return ((At = (Ue = Mt.ref) == null ? void 0 : Ue.selfId) == null ? void 0 : At.toLowerCase()) == Ne.toLowerCase();
          }).map((Mt) => Mt.name));
        }), Fe.forEach((Ne) => {
          P.includes(Ne) || P.push(Ne);
        }), C.fields = P.join(",");
      }
      let fe = [];
      if (h.value.forEach((re) => {
        re.settings.sort && fe.push((re.settings.sort === "DESC" ? "-" : "") + re.name), re.settings.filters.forEach(($e) => {
          let Fe = $e.key.replace("%", re.name);
          C[Fe] = $e.value;
        });
      }), d.filters && Object.keys(d.filters).forEach((re) => {
        C[re] = d.filters[re];
      }), b("queryString") && b("queryFilters")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let $e = sl(re);
        if (Object.keys($e).forEach((Fe) => {
          A.value.find((mt) => mt.name.toLowerCase() === Fe.toLowerCase()) && (C[Fe] = $e[Fe]);
        }), typeof $e.skip < "u") {
          const Fe = parseInt($e.skip);
          isNaN(Fe) || (V.value = C.skip = Fe);
        }
      }
      return typeof C.skip > "u" && V.value > 0 && (C.skip = V.value), fe.length > 0 && (C.orderBy = fe.join(",")), C;
    }
    function ro() {
      const C = El("csv");
      ol(C), typeof window < "u" && window.open(C);
    }
    function io() {
      const C = El("json");
      ol(C), ce.value = !0, setTimeout(() => ce.value = !1, 3e3);
    }
    function El(C = "json") {
      var Fe;
      const P = Qs(), fe = `/api/${(Fe = ye.value.AnyQuery) == null ? void 0 : Fe.request.name}`, re = Oo(f.baseUrl, es(fe, { ...P, jsconfig: "edv" }));
      return re.indexOf("?") >= 0 ? js(re, "?") + "." + C + "?" + xs(re, "?") : re + ".json";
    }
    async function uo() {
      h.value.forEach((C) => {
        C.settings = { filters: [] }, u.removeItem(bs(C.name));
      }), de.value = { take: Cs }, u.removeItem(Ks()), await Se();
    }
    function co() {
      L.value = !0, Te({ create: null });
    }
    const Qt = v(() => zt(d.type)), os = v(() => {
      var C;
      return Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name);
    }), as = v(() => d.modelTitle || os.value), fo = v(() => d.newButtonLabel || `New ${as.value}`), Ks = () => {
      var C;
      return `${d.id}/ApiPrefs/${Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name)}`;
    }, bs = (C) => {
      var P;
      return `Column/${d.id}:${Qt.value || ((P = ye.value.AnyQuery) == null ? void 0 : P.dataModel.name)}.${C}`;
    }, { metadataApi: zl, typeOf: Zs, apiOf: Nl, filterDefinitions: vo } = dt(), { invalidAccessMessage: Ws } = Pl(), Ul = v(() => d.filterDefinitions || vo.value), ye = v(() => {
      let C = Ft(d.apis);
      return C.length > 0 ? Rt.from(C.map((P) => Nl(P)).filter((P) => P != null).map((P) => P)) : Rt.forType(Qt.value, zl.value);
    }), ws = (C) => `<span class="text-yellow-700">${C}</span>`, ql = v(() => {
      if (!zl.value)
        return ws(`AppMetadata not loaded, see <a class="${Fs.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let P = Ft(d.apis).map((re) => Nl(re) == null ? re : null).filter((re) => re != null);
      if (P.length > 0)
        return ws(`Unknown API${P.length > 1 ? "s" : ""}: ${P.join(", ")}`);
      let fe = ye.value;
      return fe.empty ? ws("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : fe.AnyQuery ? null : ws(st.NoQuery);
    }), Ql = v(() => ye.value.AnyQuery && Ws(ye.value.AnyQuery)), Kl = v(() => ye.value.Create && Ws(ye.value.Create)), Zl = v(() => ye.value.AnyUpdate && Ws(ye.value.AnyUpdate)), po = v(() => cs(ye.value.Create));
    v(() => cs(ye.value.AnyUpdate));
    const Gs = v(() => cs(ye.value.Delete));
    function St() {
      Y.value = null, ee.value = null, Te({ edit: void 0 });
    }
    function rs() {
      L.value = !1, Te({ create: void 0 });
    }
    async function Kt() {
      await Se(), St();
    }
    async function Js() {
      await Se(), rs();
    }
    function Wl() {
      var fe;
      z.value = new tt(), H.value = new tt(), L.value = !1, ee.value = null, Y.value = null, ae.value = !1, O.value = null, V.value = d.skip, ce.value = !1, de.value = { take: Cs }, ie.value = !1;
      const C = d.prefs || Ts(u.getItem(Ks()));
      C && (de.value = C), h.value = A.value.map((re) => ({
        name: re.name,
        type: re.type,
        meta: re,
        settings: Object.assign(
          {
            filters: []
          },
          Ts(u.getItem(bs(re.name)))
        )
      })), isNaN(d.skip) || (V.value = d.skip);
      let P = (fe = Ce.value) == null ? void 0 : fe.name;
      if (b("queryString")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let $e = sl(re);
        typeof $e.create < "u" ? L.value = typeof $e.create < "u" : P && (typeof $e.edit == "string" || typeof $e.edit == "number") && ze(P, $e.edit);
      }
      d.create === !0 && (L.value = !0), P && d.edit != null && ze(P, d.edit);
    }
    return at(async () => {
      Wl(), await Se();
    }), (C, P) => {
      const fe = K("Alert"), re = K("EnsureAccessDialog"), $e = K("AutoCreateForm"), Fe = K("AutoEditForm"), Ne = K("AutoViewForm"), mt = K("ErrorSummary"), Gl = K("Loading"), ks = K("SettingsIcons"), Mt = K("DataGrid");
      return ql.value ? (o(), r("div", iu, [
        ge(fe, { innerHTML: ql.value }, null, 8, ["innerHTML"])
      ])) : Ql.value ? (o(), r("div", uu, [
        ge(ao, { "invalid-access": Ql.value }, null, 8, ["invalid-access"])
      ])) : (o(), r("div", du, [
        _("forms") && L.value && ye.value.Create ? (o(), r("div", cu, [
          Kl.value ? (o(), ne(re, {
            key: 0,
            title: `Create ${as.value}`,
            "invalid-access": Kl.value,
            "alert-class": "text-yellow-700",
            onDone: rs
          }, null, 8, ["title", "invalid-access"])) : J(T).createform ? U(C.$slots, "createform", {
            key: 1,
            type: ye.value.Create.request.name,
            configure: C.configureField,
            done: rs,
            save: Js
          }) : (o(), ne($e, {
            key: 2,
            ref_key: "createForm",
            ref: Pe,
            type: ye.value.Create.request.name,
            configure: C.configureField,
            onDone: rs,
            onSave: Js
          }, {
            header: _e(() => [
              U(C.$slots, "formheader", {
                form: "create",
                formInstance: Pe.value,
                apis: ye.value,
                type: os.value,
                updateModel: ct
              })
            ]),
            footer: _e(() => [
              U(C.$slots, "formfooter", {
                form: "create",
                formInstance: Pe.value,
                apis: ye.value,
                type: os.value,
                updateModel: ct
              })
            ]),
            _: 3
          }, 8, ["type", "configure"]))
        ])) : _("forms") && Y.value && ye.value.AnyUpdate ? (o(), r("div", fu, [
          Zl.value ? (o(), ne(re, {
            key: 0,
            title: `Update ${as.value}`,
            "invalid-access": Zl.value,
            "alert-class": "text-yellow-700",
            onDone: St
          }, null, 8, ["title", "invalid-access"])) : J(T).editform ? U(C.$slots, "editform", {
            key: 1,
            model: Y.value,
            type: ye.value.AnyUpdate.request.name,
            deleteType: Gs.value ? ye.value.Delete.request.name : null,
            configure: C.configureField,
            done: St,
            save: Kt
          }) : (o(), ne(Fe, {
            key: 2,
            ref_key: "editForm",
            ref: Ge,
            modelValue: Y.value,
            "onUpdate:modelValue": P[0] || (P[0] = (Ue) => Y.value = Ue),
            type: ye.value.AnyUpdate.request.name,
            deleteType: Gs.value ? ye.value.Delete.request.name : null,
            configure: C.configureField,
            onDone: St,
            onSave: Kt,
            onDelete: Kt
          }, {
            header: _e(() => [
              U(C.$slots, "formheader", {
                form: "edit",
                formInstance: Ge.value,
                apis: ye.value,
                type: os.value,
                model: Y.value,
                id: ee.value,
                updateModel: bt
              })
            ]),
            footer: _e(() => [
              U(C.$slots, "formfooter", {
                form: "edit",
                formInstance: Ge.value,
                apis: ye.value,
                type: os.value,
                model: Y.value,
                id: ee.value,
                updateModel: bt
              })
            ]),
            _: 3
          }, 8, ["modelValue", "type", "deleteType", "configure"]))
        ])) : _("forms") && Y.value ? (o(), r("div", vu, [
          J(T).viewform ? U(C.$slots, "viewform", {
            key: 0,
            model: Y.value,
            apis: ye.value,
            done: St
          }) : (o(), ne(Ne, {
            key: 1,
            model: Y.value,
            apis: ye.value,
            deleteType: Gs.value ? ye.value.Delete.request.name : null,
            done: St,
            onSave: Kt,
            onDelete: Kt
          }, null, 8, ["model", "apis", "deleteType"]))
        ])) : x("", !0),
        J(T).toolbar ? U(C.$slots, "toolbar", { key: 3 }) : _("toolbar") ? (o(), r("div", pu, [
          ae.value ? (o(), ne(Rl, {
            key: 0,
            columns: A.value,
            prefs: de.value,
            onDone: P[1] || (P[1] = (Ue) => ae.value = !1),
            onSave: Ye
          }, null, 8, ["columns", "prefs"])) : x("", !0),
          l("div", mu, [
            l("div", hu, [
              _("preferences") ? (o(), r("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${as.value} Preferences`,
                onClick: P[2] || (P[2] = (Ue) => ae.value = !ae.value)
              }, bu, 8, gu)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 1,
                type: "button",
                class: y(["pl-2", Oe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !Oe.value,
                onClick: P[3] || (P[3] = (Ue) => lt(-je.value))
              }, _u, 10, wu)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 2,
                type: "button",
                class: y(["pl-2", xe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !xe.value,
                onClick: P[4] || (P[4] = (Ue) => lt(-Ve.value))
              }, xu, 10, $u)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 3,
                type: "button",
                class: y(["pl-2", Qe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !Qe.value,
                onClick: P[5] || (P[5] = (Ue) => lt(Ve.value))
              }, Su, 10, Lu)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 4,
                type: "button",
                class: y(["pl-2", Re.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !Re.value,
                onClick: P[6] || (P[6] = (Ue) => lt(je.value))
              }, Tu, 10, Mu)) : x("", !0)
            ]),
            _("pagingInfo") ? (o(), r("div", Fu, [
              l("div", Iu, [
                ie.value ? (o(), r("span", Du, "Querying...")) : x("", !0),
                he.value.length ? (o(), r("span", ju, [
                  Ou,
                  ke(" " + I(V.value + 1) + " - " + I(Math.min(V.value + he.value.length, je.value)) + " ", 1),
                  l("span", null, " of " + I(je.value), 1)
                ])) : z.value.completed ? (o(), r("span", Pu, "No Results")) : x("", !0)
              ])
            ])) : x("", !0),
            l("div", Bu, [
              _("refresh") ? (o(), r("div", Hu, [
                l("button", {
                  type: "button",
                  onClick: Vt,
                  title: "Refresh",
                  class: y(q.value)
                }, Eu, 2)
              ])) : x("", !0),
              _("downloadCsv") ? (o(), r("div", zu, [
                l("button", {
                  type: "button",
                  onClick: ro,
                  title: "Download CSV",
                  class: y(q.value)
                }, Uu, 2)
              ])) : x("", !0),
              _("copyApiUrl") ? (o(), r("div", qu, [
                l("button", {
                  type: "button",
                  onClick: io,
                  title: "Copy API URL",
                  class: y(q.value)
                }, [
                  ce.value ? (o(), r("svg", Qu, Zu)) : (o(), r("svg", Wu, Ju)),
                  Xu
                ], 2)
              ])) : x("", !0),
              pe.value && _("resetPreferences") ? (o(), r("div", Yu, [
                l("button", {
                  type: "button",
                  onClick: uo,
                  title: "Reset Preferences & Filters",
                  class: y(q.value)
                }, td, 2)
              ])) : x("", !0),
              _("filtersView") && S.value > 0 ? (o(), r("div", sd, [
                l("button", {
                  type: "button",
                  onClick: P[7] || (P[7] = (Ue) => g.value = g.value == "filters" ? null : "filters"),
                  class: y(q.value),
                  "aria-expanded": "false"
                }, [
                  ld,
                  l("span", nd, I(S.value) + " " + I(S.value == 1 ? "Filter" : "Filters"), 1),
                  g.value != "filters" ? (o(), r("svg", od, rd)) : (o(), r("svg", id, dd))
                ], 2)
              ])) : x("", !0),
              _("newItem") && ye.value.Create && po.value ? (o(), r("div", cd, [
                l("button", {
                  type: "button",
                  onClick: co,
                  title: as.value,
                  class: y(q.value)
                }, [
                  vd,
                  l("span", pd, I(fo.value), 1)
                ], 10, fd)
              ])) : x("", !0),
              J(T).toolbarbuttons ? U(C.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: q.value
              }) : x("", !0)
            ])
          ])
        ])) : x("", !0),
        g.value == "filters" ? (o(), ne(Hl, {
          key: 5,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: Ul.value,
          columns: h.value,
          onDone: P[8] || (P[8] = (Ue) => g.value = null),
          onChange: De
        }, null, 8, ["definitions", "columns"])) : x("", !0),
        H.value.error ?? z.value.error ? (o(), ne(mt, {
          key: 6,
          status: H.value.error ?? z.value.error
        }, null, 8, ["status"])) : ie.value ? (o(), ne(Gl, {
          key: 7,
          class: "p-2"
        })) : x("", !0),
        O.value ? (o(), r("div", md, [
          ge(Bl, {
            definitions: Ul.value,
            column: O.value.column,
            "top-left": O.value.topLeft,
            onDone: G,
            onSave: be
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : x("", !0),
        he.value.length ? (o(), ne(Mt, {
          key: 9,
          id: C.id,
          items: he.value,
          type: C.type,
          "selected-columns": se.value,
          class: "mt-1",
          onFiltersChanged: Se,
          tableStyle: F.value,
          gridClass: R.value,
          grid2Class: oe.value,
          grid3Class: N.value,
          grid4Class: E.value,
          tableClass: M.value,
          theadClass: te.value,
          theadRowClass: w.value,
          theadCellClass: j.value,
          tbodyClass: C.tbodyClass,
          rowClass: le,
          onRowSelected: rt,
          rowStyle: C.rowStyle,
          headerTitle: C.headerTitle,
          headerTitles: C.headerTitles,
          visibleFrom: C.visibleFrom,
          onHeaderSelected: B
        }, pl({
          header: _e(({ column: Ue, label: At }) => {
            var Jl;
            return [
              b("filtering") && Je(Ue) ? (o(), r("div", hd, [
                l("span", gd, I(At), 1),
                ge(ks, {
                  column: h.value.find((mo) => mo.name.toLowerCase() === Ue.toLowerCase()),
                  "is-open": ((Jl = O.value) == null ? void 0 : Jl.column.name) === Ue
                }, null, 8, ["column", "is-open"])
              ])) : (o(), r("div", yd, [
                l("span", bd, I(At), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          Ie(Object.keys(J(T)), (Ue) => ({
            name: Ue,
            fn: _e((At) => [
              U(C.$slots, Ue, Yt(Ms(At)))
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
], Td = {
  key: 3,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Fd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
    fill: "currentColor"
  })
], -1), Id = [
  Fd
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
          class: y(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, Vd, 2)),
        ((d = (u = t.column) == null ? void 0 : u.settings) == null ? void 0 : d.sort) === "ASC" ? (o(), r("svg", Sd, Ad)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), r("svg", Td, Id)) : x("", !0)
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
      const n = K("EnsureAccess"), a = K("SlideOver");
      return t.invalidAccess ? (o(), ne(a, {
        key: 0,
        title: t.title,
        onDone: s[0] || (s[0] = (i) => t.$emit("done")),
        "content-class": "relative flex-1"
      }, pl({
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
            ke(I(t.subtitle), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["title"])) : x("", !0);
    };
  }
}), Od = ["for"], Pd = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Bd = {
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
    const a = D();
    function i() {
      var p;
      (p = a.value) == null || p.focus();
    }
    const u = v(() => n.type || "text"), d = v(() => n.label ?? He(vt(n.id))), c = v(() => n.placeholder ?? d.value);
    function f(p) {
      return n.type === "range" ? p.replace("shadow-sm ", "") : p;
    }
    let m = We("ApiState", void 0);
    const $ = v(() => _t.call({ responseStatus: n.status ?? (m == null ? void 0 : m.error.value) }, n.id)), k = v(() => [ft.base, $.value ? ft.invalid : f(ft.valid), n.inputClass]);
    return (p, b) => (o(), r("div", {
      class: y([p.$attrs.class])
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
        class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${p.labelClass ?? ""}`)
      }, I(d.value), 11, Od)) : x("", !0),
      l("div", {
        class: y(f("mt-1 relative shadow-sm rounded-md"))
      }, [
        l("input", Ae({
          ref_key: "inputElement",
          ref: a,
          type: u.value,
          name: p.id,
          id: p.id,
          class: k.value,
          placeholder: c.value,
          value: J(gn)(u.value, p.modelValue),
          onInput: b[0] || (b[0] = (_) => p.$emit("update:modelValue", s(_.target))),
          "aria-invalid": $.value != null,
          "aria-describedby": `${p.id}-error`,
          step: "any"
        }, J(yt)(p.$attrs, ["class", "value"])), null, 16, Pd),
        $.value ? (o(), r("div", Bd, Rd)) : x("", !0)
      ], 2),
      $.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${p.id}-error`
      }, I($.value), 9, Ed)) : p.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${p.id}-description`
      }, I(p.help), 9, zd)) : x("", !0),
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
      class: y([c.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: c.id,
        class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${c.labelClass ?? ""}`)
      }, I(n.value), 11, qd)) : x("", !0),
      l("div", Qd, [
        l("textarea", Ae({
          name: c.id,
          id: c.id,
          class: d.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (m) => c.$emit("update:modelValue", t(m.target))),
          "aria-invalid": u.value != null,
          "aria-describedby": `${c.id}-error`
        }, J(yt)(c.$attrs, ["class"])), I(c.modelValue), 17, Kd)
      ]),
      u.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, I(u.value), 9, Zd)) : c.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, I(c.help), 9, Wd)) : x("", !0)
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
      class: y([d.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: d.id,
        class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${d.labelClass ?? ""}`)
      }, I(n.value), 11, Xd)) : x("", !0),
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
        }, I(f.value), 9, ec))), 256))
      ], 16, Yd),
      i.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${d.id}-error`
      }, I(i.value), 9, tc)) : x("", !0)
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
      class: y(["relative flex items-start", u.$attrs.class])
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
          class: y(`font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
        }, I(n.value), 11, rc),
        i.value ? (o(), r("p", ic, I(i.value), 1)) : u.help ? (o(), r("p", uc, I(u.help), 1)) : x("", !0)
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
], Ac = ["id"], Tc = ["id"], Fc = {
  inheritAttrs: !1
}, Ic = /* @__PURE__ */ ue({
  ...Fc,
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
    function a(h) {
      return s.converter ? s.converter(h) : h;
    }
    const i = v(() => Ze(a(s.modelValue), (h) => typeof h == "string" ? h.trim().length == 0 ? [] : h.split(",") : h) || []), u = D(), d = D(!1), c = v(() => {
      const h = $.value.toLowerCase();
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((z) => !i.value.includes(z) && z.toLowerCase().includes(h)) : s.allowableValues.filter((z) => !i.value.includes(z) && z.startsWith(h));
    });
    function f(h) {
      u.value = h;
    }
    const m = D(null), $ = D(""), k = v(() => s.type || "text"), p = v(() => s.label ?? He(vt(s.id)));
    let b = We("ApiState", void 0);
    const _ = v(() => _t.call({ responseStatus: s.status ?? (b == null ? void 0 : b.error.value) }, s.id)), F = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      _.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), R = (h) => w(i.value.filter((z) => z != h));
    function oe(h) {
      var z;
      document.activeElement === h.target && ((z = m.value) == null || z.focus());
    }
    const N = D();
    function E() {
      d.value = !0, N.value = !0;
    }
    function M() {
      E();
    }
    function te() {
      Q(q()), N.value = !1, setTimeout(() => {
        N.value || (d.value = !1);
      }, 200);
    }
    function w(h) {
      const z = s.string ? h.join(",") : h;
      n("update:modelValue", z);
    }
    function j(h) {
      if (h.key == "Backspace" && $.value.length == 0 && i.value.length > 0 && R(i.value[i.value.length - 1]), !(!s.allowableValues || s.allowableValues.length == 0))
        if (h.code == "Escape" || h.code == "Tab")
          d.value = !1;
        else if (h.code == "Home")
          u.value = c.value[0], Z();
        else if (h.code == "End")
          u.value = c.value[c.value.length - 1], Z();
        else if (h.code == "ArrowDown") {
          if (d.value = !0, !u.value)
            u.value = c.value[0];
          else {
            const z = c.value.indexOf(u.value);
            u.value = z + 1 < c.value.length ? c.value[z + 1] : c.value[0];
          }
          W();
        } else if (h.code == "ArrowUp") {
          if (!u.value)
            u.value = c.value[c.value.length - 1];
          else {
            const z = c.value.indexOf(u.value);
            u.value = z - 1 >= 0 ? c.value[z - 1] : c.value[c.value.length - 1];
          }
          W();
        } else
          h.code == "Enter" ? u.value && d.value ? (Q(u.value), h.preventDefault()) : d.value = !1 : d.value = c.value.length > 0;
    }
    function q() {
      if ($.value.length == 0)
        return "";
      let h = Po($.value.trim(), ",");
      return h[0] == "," && (h = h.substring(1)), h = h.trim(), h.length == 0 && d.value && c.value.length > 0 ? u.value : h;
    }
    function le(h) {
      const z = q();
      if (z.length > 0) {
        const H = s.delimiters.some((L) => L == h.key);
        if (H && h.preventDefault(), h.key == "Enter" || h.key == "NumpadEnter" || h.key.length == 1 && H) {
          Q(z);
          return;
        }
      }
    }
    const T = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Z() {
      setTimeout(() => {
        let h = As(`#${s.id}-tag li.active`);
        h && h.scrollIntoView(T);
      }, 0);
    }
    function W() {
      setTimeout(() => {
        let h = As(`#${s.id}-tag li.active`);
        h && ("scrollIntoViewIfNeeded" in h ? h.scrollIntoViewIfNeeded(T) : h.scrollIntoView(T));
      }, 0);
    }
    function Q(h) {
      if (h.length === 0)
        return;
      const z = Array.from(i.value);
      z.indexOf(h) == -1 && z.push(h), w(z), $.value = "", d.value = !1;
    }
    function A(h) {
      var H;
      const z = (H = h.clipboardData) == null ? void 0 : H.getData("Text");
      se(z);
    }
    function se(h) {
      if (!h)
        return;
      const z = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), H = Array.from(i.value);
      h.split(z).map((L) => L.trim()).forEach((L) => {
        H.indexOf(L) == -1 && H.push(L);
      }), w(H), $.value = "";
    }
    return (h, z) => (o(), r("div", {
      class: y([h.$attrs.class]),
      id: `${h.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      p.value ? (o(), r("label", {
        key: 0,
        for: h.id,
        class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${h.labelClass ?? ""}`)
      }, I(p.value), 11, vc)) : x("", !0),
      l("div", pc, [
        l("input", {
          type: "hidden",
          id: h.id,
          name: h.id,
          value: i.value.join(",")
        }, null, 8, mc),
        l("button", {
          class: y(F.value),
          onClick: qe(oe, ["prevent"]),
          onFocus: z[2] || (z[2] = (H) => d.value = !0),
          tabindex: "-1"
        }, [
          l("div", hc, [
            (o(!0), r(Me, null, Ie(i.value, (H) => (o(), r("div", gc, [
              l("span", yc, [
                ke(I(H) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (g) => R(H),
                  class: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                }, kc, 8, bc)
              ])
            ]))), 256)),
            l("div", _c, [
              Pt(l("input", Ae({
                ref_key: "txtInput",
                ref: m,
                type: k.value,
                role: "combobox",
                "aria-controls": "options",
                "aria-expanded": "false",
                autocomplete: "off",
                spellcheck: "false",
                name: `${h.id}-txt`,
                id: `${h.id}-txt`,
                class: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
                style: `box-shadow:none !important;width:${$.value.length + 1}ch`,
                "onUpdate:modelValue": z[0] || (z[0] = (H) => $.value = H),
                "aria-invalid": _.value != null,
                "aria-describedby": `${h.id}-error`,
                onKeydown: j,
                onKeypress: le,
                onPaste: qe(A, ["prevent", "stop"]),
                onFocus: M,
                onBlur: te,
                onClick: z[1] || (z[1] = (H) => d.value = !0)
              }, J(yt)(h.$attrs, ["class", "required"])), null, 16, $c), [
                [wo, $.value]
              ])
            ])
          ])
        ], 34),
        d.value && c.value.length ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: j,
          id: `${h.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Me, null, Ie(c.value.slice(0, h.maxVisibleItems), (H) => (o(), r("li", {
            class: y([H === u.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (g) => f(H),
            onClick: (g) => Q(H),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", Lc, I(H), 1)
          ], 42, xc))), 256))
        ], 40, Cc)) : x("", !0),
        _.value ? (o(), r("div", Vc, Mc)) : x("", !0)
      ]),
      _.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${h.id}-error`
      }, I(_.value), 9, Ac)) : h.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${h.id}-description`
      }, I(h.help), 9, Tc)) : x("", !0)
    ], 10, fc));
  }
}), Dc = { class: "relative flex-grow mr-2 sm:mr-4" }, jc = ["for"], Oc = { class: "block mt-2" }, Pc = { class: "sr-only" }, Bc = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Hc = {
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
    var E;
    const t = e, s = D(null), { assetsPathResolver: n, fallbackPathResolver: a } = Nt(), i = {}, u = D(), d = D(((E = t.files) == null ? void 0 : E.map(c)) || []);
    function c(M) {
      return M.filePath = n(M.filePath), M;
    }
    t.values && t.values.length > 0 && (d.value = t.values.map((M) => {
      let te = M.replace(/\\/g, "/");
      return { fileName: cn(Bt(te, "/"), "."), filePath: te, contentType: rl(te) };
    }).map(c));
    const f = v(() => t.label ?? He(vt(t.id))), m = v(() => t.placeholder ?? f.value);
    let $ = We("ApiState", void 0);
    const k = v(() => _t.call({ responseStatus: t.status ?? ($ == null ? void 0 : $.error.value) }, t.id)), p = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      k.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), b = (M) => {
      let te = M.target;
      u.value = "", d.value = Array.from(te.files || []).map((w) => ({
        fileName: w.name,
        filePath: wl(w),
        contentLength: w.size,
        contentType: w.type || rl(w.name)
      }));
    }, _ = () => {
      var M;
      return (M = s.value) == null ? void 0 : M.click();
    }, F = (M) => M == null ? !1 : M.startsWith("data:") || M.startsWith("blob:"), R = v(() => {
      if (d.value.length > 0)
        return d.value[0].filePath;
      let M = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return M && It(n(M)) || null;
    }), oe = (M) => !M || M.startsWith("data:") || M.endsWith(".svg") ? "" : "rounded-full object-cover";
    function N(M) {
      u.value = a(R.value);
    }
    return Et(Vn), (M, te) => (o(), r("div", {
      class: y(["flex", M.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", Dc, [
        f.value ? (o(), r("label", {
          key: 0,
          for: M.id,
          class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${M.labelClass ?? ""}`)
        }, I(f.value), 11, jc)) : x("", !0),
        l("div", Oc, [
          l("span", Pc, I(M.help ?? f.value), 1),
          l("input", Ae({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: M.multiple,
            name: M.id,
            id: M.id,
            class: p.value,
            placeholder: m.value,
            "aria-invalid": k.value != null,
            "aria-describedby": `${M.id}-error`
          }, M.$attrs, { onChange: b }), null, 16, Bc),
          k.value ? (o(), r("div", Hc, Ec)) : x("", !0)
        ]),
        k.value ? (o(), r("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${M.id}-error`
        }, I(k.value), 9, zc)) : M.help ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${M.id}-description`
        }, I(M.help), 9, Nc)) : x("", !0)
      ]),
      M.multiple ? (o(), r("div", Kc, [
        l("table", Zc, [
          (o(!0), r(Me, null, Ie(d.value, (w) => (o(), r("tr", null, [
            l("td", Wc, [
              l("div", {
                class: "flex w-full",
                title: F(w.filePath) ? "" : w.filePath
              }, [
                l("img", {
                  src: i[J(It)(w.filePath)] || J(n)(J(It)(w.filePath)),
                  class: y(["mr-2 h-8 w-8", oe(w.filePath)]),
                  onError: (j) => i[J(It)(w.filePath)] = J(a)(J(It)(w.filePath))
                }, null, 42, Jc),
                F(w.filePath) ? (o(), r("span", Yc, I(w.fileName), 1)) : (o(), r("a", {
                  key: 0,
                  href: J(n)(w.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, I(w.fileName), 9, Xc))
              ], 8, Gc)
            ]),
            l("td", e0, [
              w.contentLength && w.contentLength > 0 ? (o(), r("span", t0, I(J(_l)(w.contentLength)), 1)) : x("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), r("div", Uc, [
        R.value ? (o(), r("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: F(R.value) ? "" : R.value
        }, [
          l("img", {
            onClick: _,
            class: y(["h-16 w-16", oe(R.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: u.value || J(n)(R.value),
            onError: N
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
    const n = D(!1), a = e, i = s;
    t({ toggle: T });
    function u(A) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(A) >= 0;
    }
    const d = v(() => a.label ?? He(vt(a.id)));
    let c = We("ApiState", void 0);
    const f = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), m = v(() => [ft.base, f.value ? ft.invalid : ft.valid]), $ = D(null), k = D(""), p = D(null), b = D(a.viewCount), _ = D([]), F = v(() => k.value ? a.options.filter((se) => a.match(se, k.value)).slice(0, b.value) : a.options), R = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function oe(A) {
      p.value = A, _.value.indexOf(A) > Math.floor(b.value * 0.9) && (b.value += a.viewCount, Q());
    }
    const N = [",", `
`, "	"];
    function E(A) {
      var h;
      const se = (h = A.clipboardData) == null ? void 0 : h.getData("Text");
      M(se);
    }
    function M(A) {
      if (!A)
        return;
      const se = N.some((h) => A.includes(h));
      if (!a.multiple || !se) {
        const h = a.options.filter((z) => a.match(z, A));
        h.length == 1 && (W(h[0]), n.value = !1, Ls());
      } else if (se) {
        const h = new RegExp("\\r|\\n|\\t|,"), H = A.split(h).filter((g) => g.trim()).map((g) => a.options.find((L) => a.match(L, g))).filter((g) => !!g);
        if (H.length > 0) {
          k.value = "", n.value = !1, p.value = null;
          let g = Array.from(a.modelValue || []);
          H.forEach((L) => {
            u(L) ? g = g.filter((ee) => ee != L) : g.push(L);
          }), i("update:modelValue", g), Ls();
        }
      }
    }
    function te(A) {
      R.indexOf(A.code) || Z();
    }
    function w(A) {
      if (!(A.shiftKey || A.ctrlKey || A.altKey)) {
        if (!n.value) {
          A.code == "ArrowDown" && (n.value = !0, p.value = _.value[0]);
          return;
        }
        if (A.code == "Escape")
          n.value && (A.stopPropagation(), n.value = !1);
        else if (A.code == "Tab")
          n.value = !1;
        else if (A.code == "Home")
          p.value = _.value[0], q();
        else if (A.code == "End")
          p.value = _.value[_.value.length - 1], q();
        else if (A.code == "ArrowDown") {
          if (!p.value)
            p.value = _.value[0];
          else {
            const se = _.value.indexOf(p.value);
            p.value = se + 1 < _.value.length ? _.value[se + 1] : _.value[0];
          }
          le();
        } else if (A.code == "ArrowUp") {
          if (!p.value)
            p.value = _.value[_.value.length - 1];
          else {
            const se = _.value.indexOf(p.value);
            p.value = se - 1 >= 0 ? _.value[se - 1] : _.value[_.value.length - 1];
          }
          le();
        } else
          A.code == "Enter" && (p.value ? (W(p.value), a.multiple || (A.preventDefault(), Ls())) : n.value = !1);
      }
    }
    const j = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function q() {
      setTimeout(() => {
        let A = As(`#${a.id}-autocomplete li.active`);
        A && A.scrollIntoView(j);
      }, 0);
    }
    function le() {
      setTimeout(() => {
        let A = As(`#${a.id}-autocomplete li.active`);
        A && ("scrollIntoViewIfNeeded" in A ? A.scrollIntoViewIfNeeded(j) : A.scrollIntoView(j));
      }, 0);
    }
    function T(A) {
      var se;
      n.value = A, A && (Z(), (se = $.value) == null || se.focus());
    }
    function Z() {
      n.value = !0, Q();
    }
    function W(A) {
      if (k.value = "", n.value = !1, a.multiple) {
        let se = Array.from(a.modelValue || []);
        u(A) ? se = se.filter((h) => h != A) : se.push(A), p.value = null, i("update:modelValue", se);
      } else {
        let se = A;
        a.modelValue == A && (se = null), i("update:modelValue", se);
      }
    }
    function Q() {
      _.value = F.value;
    }
    return Lt(k, Q), (A, se) => (o(), r("div", {
      id: `${A.id}-autocomplete`
    }, [
      d.value ? (o(), r("label", {
        key: 0,
        for: `${A.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, I(d.value), 9, n0)) : x("", !0),
      l("div", o0, [
        Pt(l("input", Ae({
          ref_key: "txtInput",
          ref: $,
          id: `${A.id}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autocomplete: "off",
          spellcheck: "false",
          "onUpdate:modelValue": se[0] || (se[0] = (h) => k.value = h),
          class: m.value,
          placeholder: A.multiple || !A.modelValue ? A.placeholder : "",
          onFocus: Z,
          onKeydown: w,
          onKeyup: te,
          onClick: Z,
          onPaste: E,
          required: !1
        }, A.$attrs), null, 16, a0), [
          [ko, k.value]
        ]),
        l("button", {
          type: "button",
          onClick: se[1] || (se[1] = (h) => T(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, i0),
        n.value ? (o(), r("ul", {
          key: 0,
          class: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: w,
          id: `${A.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Me, null, Ie(_.value, (h) => (o(), r("li", {
            class: y([h === p.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (z) => oe(h),
            onClick: (z) => W(h),
            role: "option",
            tabindex: "-1"
          }, [
            U(A.$slots, "item", Yt(Ms(h))),
            u(h) ? (o(), r("span", {
              key: 0,
              class: y(["absolute inset-y-0 right-0 flex items-center pr-4", h === p.value ? "text-white" : "text-indigo-600"])
            }, f0, 2)) : x("", !0)
          ], 42, d0))), 256))
        ], 40, u0)) : !A.multiple && A.modelValue ? (o(), r("div", {
          key: 1,
          onKeydown: w,
          onClick: se[2] || (se[2] = (h) => T(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          U(A.$slots, "item", Yt(Ms(A.modelValue)))
        ], 32)) : x("", !0),
        f.value ? (o(), r("div", v0, m0)) : x("", !0)
      ]),
      f.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${A.id}-error`
      }, I(f.value), 9, h0)) : A.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${A.id}-description`
      }, I(A.help), 9, g0)) : x("", !0)
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
        var b;
        (b = d.value) == null || b.toggle(p);
      }
    });
    const a = s;
    function i(p) {
      a("update:modelValue", p);
    }
    const u = v(() => n.multiple != null ? n.multiple : Array.isArray(n.modelValue)), d = D();
    function c(p, b) {
      return !b || p.value.toLowerCase().includes(b.toLowerCase());
    }
    const f = v(() => n.entries || (n.values ? n.values.map((p) => ({ key: p, value: p })) : n.options ? Object.keys(n.options).map((p) => ({ key: p, value: n.options[p] })) : [])), m = D(u.value ? [] : null);
    function $() {
      let p = n.modelValue && typeof n.modelValue == "object" ? n.modelValue.key : n.modelValue;
      p == null || p === "" ? m.value = u.value ? [] : null : typeof p == "string" ? m.value = f.value.find((b) => b.key === p) || null : Array.isArray(p) && (m.value = f.value.filter((b) => p.includes(b.key)));
    }
    at($);
    const k = v(() => m.value == null ? "" : Array.isArray(m.value) ? m.value.map((p) => encodeURIComponent(p.key)).join(",") : m.value.key);
    return (p, b) => {
      const _ = K("Autocomplete");
      return o(), r(Me, null, [
        l("input", {
          type: "hidden",
          id: p.id,
          name: p.id,
          value: k.value
        }, null, 8, b0),
        ge(_, Ae({
          ref_key: "input",
          ref: d,
          id: p.id,
          options: f.value,
          match: c,
          multiple: u.value
        }, p.$attrs, {
          modelValue: m.value,
          "onUpdate:modelValue": [
            b[0] || (b[0] = (F) => m.value = F),
            i
          ]
        }), {
          item: _e(({ key: F, value: R }) => [
            l("span", w0, I(R), 1)
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
    const s = e, n = t, a = v(() => s.input.type || "text"), i = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), u = v(() => yt(s.input, i)), d = D(a.value === "file" ? null : s.modelValue[s.input.id]);
    Lt(d, () => {
      s.modelValue[s.input.id] = d.value, n("update:modelValue", s.modelValue);
    });
    const c = v(() => {
      const f = s.modelValue[s.input.id];
      if (s.input.type !== "file" || !f)
        return [];
      if (typeof f == "string")
        return [{ filePath: f, fileName: Bt(f, "/") }];
      if (!Array.isArray(f) && typeof f == "object")
        return f;
      if (Array.isArray(f)) {
        const m = [];
        return f.forEach(($) => {
          typeof $ == "string" ? m.push({ filePath: $, fileName: Bt($, "/") }) : typeof $ == "object" && m.push($);
        }), m;
      }
    });
    return (f, m) => {
      var N, E, M, te, w, j, q, le, T, Z, W, Q, A, se, h, z, H, g, L, ee, Y, ae, O, V, ce, de, ie, pe;
      const $ = K("SelectInput"), k = K("CheckboxInput"), p = K("TagInput"), b = K("Combobox"), _ = K("FileInput"), F = K("TextareaInput"), R = K("MarkdownInput"), oe = K("TextInput");
      return J(X).component(a.value) ? (o(), ne(dn(J(X).component(a.value)), Ae({
        key: 0,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[0] || (m[0] = (S) => d.value = S),
        status: (N = f.api) == null ? void 0 : N.error,
        "input-class": (E = f.input.css) == null ? void 0 : E.input,
        "label-class": (M = f.input.css) == null ? void 0 : M.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), ne($, Ae({
        key: 1,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[1] || (m[1] = (S) => d.value = S),
        status: (te = f.api) == null ? void 0 : te.error,
        "input-class": (w = f.input.css) == null ? void 0 : w.input,
        "label-class": (j = f.input.css) == null ? void 0 : j.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), ne(k, Ae({
        key: 2,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[2] || (m[2] = (S) => d.value = S),
        status: (q = f.api) == null ? void 0 : q.error,
        "input-class": (le = f.input.css) == null ? void 0 : le.input,
        "label-class": (T = f.input.css) == null ? void 0 : T.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), ne(p, Ae({
        key: 3,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[3] || (m[3] = (S) => d.value = S),
        status: (Z = f.api) == null ? void 0 : Z.error,
        "input-class": (W = f.input.css) == null ? void 0 : W.input,
        "label-class": (Q = f.input.css) == null ? void 0 : Q.label,
        allowableValues: f.input.allowableValues,
        string: ((A = f.input.prop) == null ? void 0 : A.type) == "String"
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "allowableValues", "string"])) : a.value == "combobox" ? (o(), ne(b, Ae({
        key: 4,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[4] || (m[4] = (S) => d.value = S),
        status: (se = f.api) == null ? void 0 : se.error,
        "input-class": (h = f.input.css) == null ? void 0 : h.input,
        "label-class": (z = f.input.css) == null ? void 0 : z.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "file" ? (o(), ne(_, Ae({
        key: 5,
        id: f.input.id,
        status: (H = f.api) == null ? void 0 : H.error,
        modelValue: d.value,
        "onUpdate:modelValue": m[5] || (m[5] = (S) => d.value = S),
        "input-class": (g = f.input.css) == null ? void 0 : g.input,
        "label-class": (L = f.input.css) == null ? void 0 : L.label,
        files: c.value
      }, u.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), ne(F, Ae({
        key: 6,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[6] || (m[6] = (S) => d.value = S),
        status: (ee = f.api) == null ? void 0 : ee.error,
        "input-class": (Y = f.input.css) == null ? void 0 : Y.input,
        "label-class": (ae = f.input.css) == null ? void 0 : ae.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), ne(R, Ae({
        key: 7,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[7] || (m[7] = (S) => d.value = S),
        status: (O = f.api) == null ? void 0 : O.error,
        "input-class": (V = f.input.css) == null ? void 0 : V.input,
        "label-class": (ce = f.input.css) == null ? void 0 : ce.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), ne(oe, Ae({
        key: 8,
        type: a.value,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[8] || (m[8] = (S) => d.value = S),
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
], -1), T0 = [
  M0,
  A0
], F0 = {
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
], -1), O0 = ["id"], P0 = ["id"], B0 = /* @__PURE__ */ ue({
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
    const f = We("client"), m = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, u.value)), $ = D(""), k = D(""), p = v(() => we(a.modelValue, u.value)), b = v(() => ot(a.metadataType).find((M) => M.name.toLowerCase() == u.value.toLowerCase())), _ = v(() => {
      var M, te, w;
      return ((w = pt((te = (M = b.value) == null ? void 0 : M.ref) == null ? void 0 : te.model)) == null ? void 0 : w.icon) || s.value.tableIcon;
    });
    function F(M) {
      return M ? a.input.options ? Object.assign({}, M, Hs(a.input.options, {
        input: a.input,
        $typeFields: ot(a.metadataType).map((te) => te.name),
        ...X.config.scopeWhitelist
      })) : M : null;
    }
    const R = v(() => {
      var M, te, w, j;
      return F(((M = b.value) == null ? void 0 : M.ref) ?? (a.input.type == "lookup" ? {
        model: a.metadataType.name,
        refId: ((te = ls(a.metadataType)) == null ? void 0 : te.name) ?? "id",
        refLabel: (j = (w = a.metadataType.properties) == null ? void 0 : w.find((q) => q.type == "String" && !q.isPrimaryKey)) == null ? void 0 : j.name
      } : null));
    });
    let oe;
    function N(M) {
      if (M) {
        if (oe == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        oe.openModal({ name: "ModalLookup", ref: M }, (te) => {
          if (console.debug("openModal", $.value, " -> ", te, Wt.setRefValue(M, te), M), te) {
            const w = we(te, M.refId);
            $.value = Wt.setRefValue(M, te) || w;
            const j = J(a.modelValue);
            j[u.value] = w, i("update:modelValue", j);
          }
        });
      }
    }
    function E() {
      a.modelValue[u.value] = null, $.value = "";
    }
    return at(async () => {
      var T, Z;
      oe = We("ModalProvider", void 0);
      const M = a.modelValue;
      a.modelValue[u.value] || (a.modelValue[u.value] = null);
      const te = b.value, w = R.value;
      if (!te || !w) {
        console.warn(`No RefInfo for property '${u.value}'`);
        return;
      }
      $.value = "";
      let j = w.selfId == null ? we(M, te.name) : we(M, w.selfId);
      const q = Xt(j);
      if (console.log("refIdValue", j, Xt(j), M, w), q && (j = we(M, w.refId)), j == null)
        return;
      const le = (T = n.value) == null ? void 0 : T.operations.find((W) => {
        var Q;
        return ((Q = W.dataModel) == null ? void 0 : Q.name) == w.model;
      });
      if (console.debug("LookupInput queryOp", le), le != null) {
        const W = we(M, te.name);
        if (Xt(W))
          return;
        if ($.value = `${W}`, k.value = te.name, w.refLabel != null) {
          const Q = ot(a.metadataType).filter((h) => h.type == w.model);
          Q.length || console.warn(`Could not find ${w.model} Property on ${a.metadataType.name}`);
          const A = Q.map((h) => we(M, h.name)).filter((h) => !!h), se = A.length <= 1 ? A[0] : A.find((h) => h[w.refId ?? "id"] == j);
          if (se != null) {
            let h = we(se, w.refLabel);
            h && ($.value = `${h}`, Wt.setValue(w.model, j, w.refLabel, h));
          } else {
            const h = ((Z = te.attributes) == null ? void 0 : Z.some((H) => H.name == "Computed")) == !0;
            let z = await Wt.getOrFetchValue(f, n.value, w.model, w.refId, w.refLabel, h, j);
            $.value = z || `${w.model}: ${$.value}`;
          }
        }
      }
    }), (M, te) => {
      const w = K("Icon");
      return o(), r("div", $0, [
        l("input", {
          type: "hidden",
          name: u.value,
          value: p.value
        }, null, 8, C0),
        d.value ? (o(), r("div", x0, [
          l("label", {
            for: u.value,
            class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${M.labelClass ?? ""}`)
          }, I(d.value), 11, L0),
          p.value ? (o(), r("div", V0, [
            l("span", S0, I(p.value), 1),
            l("button", {
              onClick: E,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, T0)
          ])) : x("", !0)
        ])) : x("", !0),
        R.value ? (o(), r("div", F0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: te[0] || (te[0] = (j) => N(R.value)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", I0, [
              l("span", D0, [
                ge(w, {
                  class: "mr-1 w-5 h-5",
                  image: _.value
                }, null, 8, ["image"]),
                l("span", null, I($.value), 1)
              ])
            ]),
            j0
          ])
        ])) : x("", !0),
        m.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${u.value}-error`
        }, I(m.value), 9, O0)) : M.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${u.value}-description`
        }, I(M.help), 9, P0)) : x("", !0)
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
      var E;
      const N = Be();
      (E = N == null ? void 0 : N.proxy) == null || E.$forceUpdate();
    }
    function u(N, E) {
      d(N.id, we(E, N.id));
    }
    function d(N, E) {
      n.modelValue[N] = E, a("update:modelValue", n.modelValue), i();
    }
    const { metadataApi: c, apiOf: f, typeOf: m, typeOfRef: $, createFormLayout: k, Crud: p } = dt(), b = v(() => n.type || zt(n.modelValue)), _ = v(() => n.metaType ?? m(b.value)), F = v(() => {
      var N, E;
      return $((E = (N = c.value) == null ? void 0 : N.operations.find((M) => M.request.name == b.value)) == null ? void 0 : E.dataModel) || _.value;
    });
    function R() {
      const N = _.value;
      if (!N) {
        if (n.formLayout) {
          const q = n.formLayout.map((le) => {
            const T = { name: le.id, type: Ia(le.type) }, Z = Object.assign({ prop: T }, le);
            return n.configureField && n.configureField(Z), Z;
          });
          return n.configureFormLayout && n.configureFormLayout(q), q;
        }
        throw new Error(`MetadataType for ${b.value} not found`);
      }
      const E = ot(N), M = F.value, te = n.formLayout ? Array.from(n.formLayout) : k(N), w = [], j = f(N.name);
      return te.forEach((q) => {
        var W;
        const le = E.find((Q) => Q.name == q.name);
        if (q.ignore)
          return;
        const T = ((W = M == null ? void 0 : M.properties) == null ? void 0 : W.find((Q) => {
          var A;
          return Q.name.toLowerCase() == ((A = q.name) == null ? void 0 : A.toLowerCase());
        })) ?? le, Z = Object.assign({ prop: T, op: j }, q);
        n.configureField && n.configureField(Z), w.push(Z);
      }), n.configureFormLayout && n.configureFormLayout(w), w;
    }
    const oe = () => R().filter((N) => N.type != "hidden").map((N) => N.id);
    return (N, E) => {
      var j;
      const M = K("ErrorSummary"), te = K("LookupInput"), w = K("DynamicInput");
      return o(), r(Me, null, [
        N.hideSummary ? x("", !0) : (o(), ne(M, {
          key: 0,
          status: (j = N.api) == null ? void 0 : j.error,
          except: oe()
        }, null, 8, ["status", "except"])),
        l("div", {
          class: y(N.flexClass)
        }, [
          l("div", {
            class: y(N.divideClass)
          }, [
            l("div", {
              class: y(N.spaceClass)
            }, [
              l("fieldset", {
                class: y(N.fieldsetClass)
              }, [
                (o(!0), r(Me, null, Ie(R(), (q) => {
                  var le, T, Z;
                  return o(), r("div", {
                    key: q.id,
                    class: y([
                      "w-full",
                      ((le = q.css) == null ? void 0 : le.field) ?? (q.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (q.type == "checkbox" ? " flex items-center" : "")),
                      q.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    q.type === "lookup" || ((T = q.prop) == null ? void 0 : T.ref) != null && q.type != "file" && !q.prop.isPrimaryKey ? (o(), ne(te, {
                      key: 0,
                      metadataType: F.value,
                      input: q,
                      modelValue: N.modelValue,
                      "onUpdate:modelValue": (W) => u(q, W),
                      status: (Z = N.api) == null ? void 0 : Z.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), ne(w, {
                      key: 1,
                      input: q,
                      modelValue: N.modelValue,
                      "onUpdate:modelValue": E[0] || (E[0] = (W) => N.$emit("update:modelValue", W)),
                      api: N.api
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
  const t = D(!1), s = D(), n = D(), a = e ?? We("client");
  function i({ message: b, errorCode: _, fieldName: F, errors: R }) {
    return _ || (_ = "Exception"), R || (R = []), s.value = F ? new Xs({
      errorCode: _,
      message: b,
      errors: [new Yl({ fieldName: F, errorCode: _, message: b })]
    }) : new Xs({ errorCode: _, message: b, errors: R });
  }
  function u({ fieldName: b, message: _, errorCode: F }) {
    if (F || (F = "Exception"), !s.value)
      i({ fieldName: b, message: _, errorCode: F });
    else {
      let R = new Xs(s.value);
      R.errors = [
        ...(R.errors || []).filter((oe) => {
          var N;
          return ((N = oe.fieldName) == null ? void 0 : N.toLowerCase()) !== (b == null ? void 0 : b.toLowerCase());
        }),
        new Yl({ fieldName: b, message: _, errorCode: F })
      ], s.value = R;
    }
  }
  async function d(b, _, F) {
    t.value = !0;
    let R = await a.api(Zt(b), _, F);
    return t.value = !1, n.value = R.response, s.value = R.error, R;
  }
  async function c(b, _, F) {
    t.value = !0;
    let R = await a.apiVoid(Zt(b), _, F);
    return t.value = !1, n.value = R.response, s.value = R.error, R;
  }
  async function f(b, _, F, R) {
    t.value = !0;
    let oe = await a.apiForm(Zt(b), _, F, R);
    return t.value = !1, n.value = oe.response, s.value = oe.error, oe;
  }
  async function m(b, _, F, R) {
    t.value = !0;
    let oe = await a.apiFormVoid(Zt(b), _, F, R);
    return t.value = !1, n.value = oe.response, s.value = oe.error, oe;
  }
  async function $(b, _, F, R) {
    return wn(a, b, _, F, R);
  }
  function k(b, _) {
    const F = D(new tt()), R = kn(async (oe) => {
      F.value = await a.api(oe);
    }, _ == null ? void 0 : _.delayMs);
    return Ss(async () => {
      const oe = b(), N = gl(Rs(oe));
      N && (F.value = new tt({ response: N })), (_ == null ? void 0 : _.delayMs) === 0 ? F.value = await a.api(oe) : R(oe);
    }), (async () => F.value = await a.api(b(), _ == null ? void 0 : _.args, _ == null ? void 0 : _.method))(), F;
  }
  let p = { setError: i, addFieldError: u, loading: t, error: s, api: d, apiVoid: c, apiForm: f, apiFormVoid: m, swr: $, swrEffect: k, unRefs: Zt, setRef: yn };
  return ms("ApiState", p), p;
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
    const n = e, a = s, i = D(), u = D(1), d = D();
    function c() {
      var ce;
      u.value++, W.value = Z();
      const V = Be();
      (ce = V == null ? void 0 : V.proxy) == null || ce.$forceUpdate();
    }
    async function f(V) {
      Object.assign(W.value, V), c(), await Ot(() => null);
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = D(), k = D();
    function p(V, ce) {
      $.value = V, k.value = ce;
    }
    async function b(V) {
      k.value && k.value(V), $.value = void 0, k.value = void 0;
    }
    const _ = ys(), { getTypeName: F } = _n(), { typeOf: R, Crud: oe, createDto: N } = dt(), E = D(new tt()), M = v(() => n.panelClass || Ee.panelClass(n.formStyle)), te = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : Gt.formClass), w = v(() => n.headingClass || Ee.headingClass(n.formStyle)), j = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), q = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : Ee.buttonsClass), le = v(() => {
      var V;
      return n.type ? F(n.type) : (V = n.modelValue) != null && V.getTypeName ? n.modelValue.getTypeName() : null;
    }), T = v(() => n.metaType ?? R(le.value)), Z = () => n.modelValue || se(), W = D(Z()), Q = v(() => _.loading.value), A = v(() => {
      var V;
      return n.heading != null ? n.heading : ((V = T.value) == null ? void 0 : V.description) || He(le.value);
    });
    t({ forceUpdate: c, props: n, setModel: f, formFields: i, submit: z, close: ae, model: W });
    function se() {
      return typeof n.type == "string" ? N(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function h(V) {
      if (!V || V.tagName != "FORM") {
        console.error("Not a valid form", V);
        return;
      }
      const ce = se();
      let de = Ze(ce == null ? void 0 : ce.getMethod, (S) => typeof S == "function" ? S() : null) || "POST", ie = Ze(ce == null ? void 0 : ce.createResponse, (S) => typeof S == "function" ? S() : null) == null;
      const pe = n.jsconfig;
      if (ml.hasRequestBody(de)) {
        let S = new ce.constructor(), ve = new FormData(V);
        ie ? E.value = await _.apiFormVoid(S, ve, { jsconfig: pe }) : E.value = await _.apiForm(S, ve, { jsconfig: pe });
      } else {
        let S = new ce.constructor(Bo(W.value));
        console.debug("AutoForm.submit", S), ie ? E.value = await _.apiVoid(S, { jsconfig: pe }) : E.value = await _.api(S, { jsconfig: pe });
      }
      E.value.succeeded ? (a("success", E.value.response), ae()) : a("error", E.value.error);
    }
    async function z() {
      h(d.value);
    }
    function H(V) {
      a("update:modelValue", V);
    }
    function g() {
      a("done");
    }
    const L = D(!1), ee = D(""), Y = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(L, () => {
      xt(Y, ee, L.value), L.value || setTimeout(g, 700);
    }), L.value = !0;
    function ae() {
      n.formStyle == "slideOver" ? L.value = !1 : g();
    }
    const O = (V) => {
      V.key === "Escape" && ae();
    };
    return at(() => window.addEventListener("keydown", O)), Et(() => window.removeEventListener("keydown", O)), (V, ce) => {
      var Ve, he, je, Oe, xe, Qe, Re, Pe, Ge, st, Je;
      const de = K("AutoFormFields"), ie = K("FormLoading"), pe = K("PrimaryButton"), S = K("CloseButton"), ve = K("SecondaryButton"), Ce = K("ModalLookup");
      return o(), r("div", null, [
        T.value ? V.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(M.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: d,
            onSubmit: ce[0] || (ce[0] = qe((Te) => h(Te.target), ["prevent"])),
            autocomplete: "off",
            class: y(V.innerFormClass)
          }, [
            l("div", {
              class: y(V.bodyClass)
            }, [
              l("div", {
                class: y(V.headerClass)
              }, [
                V.$slots.heading ? (o(), r("div", N0, [
                  U(V.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: y(w.value)
                }, I(A.value), 3)),
                V.$slots.subheading ? (o(), r("div", U0, [
                  U(V.$slots, "subheading")
                ])) : V.subHeading ? (o(), r("p", {
                  key: 3,
                  class: y(j.value)
                }, I(V.subHeading), 3)) : (Ve = T.value) != null && Ve.notes ? (o(), r("p", {
                  key: 4,
                  class: y(["notes", j.value]),
                  innerHTML: (he = T.value) == null ? void 0 : he.notes
                }, null, 10, q0)) : x("", !0)
              ], 2),
              U(V.$slots, "header", {
                instance: (je = Be()) == null ? void 0 : je.exposed,
                model: W.value
              }),
              Q0,
              (o(), ne(de, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                type: V.type,
                modelValue: W.value,
                "onUpdate:modelValue": H,
                api: E.value,
                configureField: V.configureField,
                configureFormLayout: V.configureFormLayout
              }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
              U(V.$slots, "footer", {
                instance: (Oe = Be()) == null ? void 0 : Oe.exposed,
                model: W.value
              })
            ], 2),
            U(V.$slots, "buttons", {}, () => {
              var Te, lt;
              return [
                l("div", {
                  class: y(q.value)
                }, [
                  l("div", null, [
                    U(V.$slots, "leftbuttons", {
                      instance: (Te = Be()) == null ? void 0 : Te.exposed,
                      model: W.value
                    })
                  ]),
                  l("div", null, [
                    V.showLoading && Q.value ? (o(), ne(ie, { key: 0 })) : x("", !0)
                  ]),
                  l("div", K0, [
                    Z0,
                    ge(pe, {
                      disabled: Q.value || (V.allowSubmit ? !V.allowSubmit(W.value) : !1)
                    }, {
                      default: _e(() => [
                        ke(I(V.submitLabel), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    U(V.$slots, "rightbuttons", {
                      instance: (lt = Be()) == null ? void 0 : lt.exposed,
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
              onMousedown: ae,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: ce[2] || (ce[2] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: y(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ee.value])
                }, [
                  l("form", {
                    ref_key: "elForm",
                    ref: d,
                    class: y(te.value),
                    onSubmit: ce[1] || (ce[1] = qe((Te) => h(Te.target), ["prevent"]))
                  }, [
                    l("div", X0, [
                      l("div", Y0, [
                        l("div", ef, [
                          l("div", tf, [
                            l("div", sf, [
                              V.$slots.heading ? (o(), r("div", lf, [
                                U(V.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(w.value)
                              }, I(A.value), 3)),
                              V.$slots.subheading ? (o(), r("div", nf, [
                                U(V.$slots, "subheading")
                              ])) : V.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(j.value)
                              }, I(V.subHeading), 3)) : (xe = T.value) != null && xe.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", j.value]),
                                innerHTML: (Qe = T.value) == null ? void 0 : Qe.notes
                              }, null, 10, of)) : x("", !0)
                            ]),
                            l("div", af, [
                              ge(S, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: ae
                              })
                            ])
                          ])
                        ]),
                        U(V.$slots, "header", {
                          instance: (Re = Be()) == null ? void 0 : Re.exposed,
                          model: W.value
                        }),
                        (o(), ne(de, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          type: V.type,
                          modelValue: W.value,
                          "onUpdate:modelValue": H,
                          api: E.value,
                          configureField: V.configureField,
                          configureFormLayout: V.configureFormLayout
                        }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
                        U(V.$slots, "footer", {
                          instance: (Pe = Be()) == null ? void 0 : Pe.exposed,
                          model: W.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: y(q.value)
                    }, [
                      l("div", null, [
                        U(V.$slots, "leftbuttons", {
                          instance: (Ge = Be()) == null ? void 0 : Ge.exposed,
                          model: W.value
                        })
                      ]),
                      l("div", null, [
                        V.showLoading && Q.value ? (o(), ne(ie, { key: 0 })) : x("", !0)
                      ]),
                      l("div", rf, [
                        ge(ve, {
                          onClick: ae,
                          disabled: Q.value
                        }, {
                          default: _e(() => [
                            ke("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        ge(pe, {
                          class: "ml-4",
                          disabled: Q.value || (V.allowSubmit ? !V.allowSubmit(W.value) : !1)
                        }, {
                          default: _e(() => [
                            ke(I(V.submitLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        U(V.$slots, "rightbuttons", {
                          instance: (st = Be()) == null ? void 0 : st.exposed,
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
            ke(" " + I(le.value), 1)
          ])
        ])),
        ((Je = $.value) == null ? void 0 : Je.name) == "ModalLookup" && $.value.ref ? (o(), ne(Ce, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: b,
          configureField: V.configureField
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
    const n = e, a = s, i = D(), u = D(1);
    function d() {
      var V, ce;
      u.value++, (V = i.value) == null || V.forceUpdate();
      const O = Be();
      (ce = O == null ? void 0 : O.proxy) == null || ce.$forceUpdate();
    }
    function c(O) {
      Object.assign(w.value, O), d();
    }
    function f(O) {
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = D(), k = D();
    function p(O, V) {
      $.value = O, k.value = V;
    }
    async function b(O) {
      k.value && k.value(O), $.value = void 0, k.value = void 0;
    }
    const { typeOf: _, typeProperties: F, Crud: R, createDto: oe, formValues: N } = dt(), E = v(() => zt(n.type)), M = v(() => _(E.value)), w = D((() => typeof n.type == "string" ? oe(n.type) : n.type ? new n.type() : null)());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: w });
    const j = v(() => n.panelClass || Ee.panelClass(n.formStyle)), q = v(() => n.formClass || Ee.formClass(n.formStyle)), le = v(() => n.headingClass || Ee.headingClass(n.formStyle)), T = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), Z = v(() => n.buttonsClass || Ee.buttonsClass), W = v(() => R.model(M.value)), Q = v(() => {
      var O;
      return n.heading || ((O = _(E.value)) == null ? void 0 : O.description) || (W.value ? `New ${He(W.value)}` : He(E.value));
    }), A = D(new tt());
    let se = ys(), h = v(() => se.loading.value);
    X.interceptors.has("AutoCreateForm.new") && X.interceptors.invoke("AutoCreateForm.new", { props: n, model: w });
    async function z(O) {
      var ie, pe;
      let V = O.target;
      if (!n.autosave) {
        a("save", new w.value.constructor(N(V, F(M.value))));
        return;
      }
      let ce = Ze((ie = w.value) == null ? void 0 : ie.getMethod, (S) => typeof S == "function" ? S() : null) || "POST", de = Ze((pe = w.value) == null ? void 0 : pe.createResponse, (S) => typeof S == "function" ? S() : null) == null;
      if (ml.hasRequestBody(ce)) {
        let S = new w.value.constructor(), ve = new FormData(V);
        de ? A.value = await se.apiFormVoid(S, ve, { jsconfig: "eccn" }) : A.value = await se.apiForm(S, ve, { jsconfig: "eccn" });
      } else {
        let S = N(V, F(M.value)), ve = new w.value.constructor(S);
        de ? A.value = await se.apiVoid(ve, { jsconfig: "eccn" }) : A.value = await se.api(ve, { jsconfig: "eccn" });
      }
      A.value.succeeded ? (V.reset(), a("save", A.value.response)) : a("error", A.value.error);
    }
    function H() {
      a("done");
    }
    const g = D(!1), L = D(""), ee = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(g, () => {
      xt(ee, L, g.value), g.value || setTimeout(H, 700);
    }), g.value = !0;
    function Y() {
      n.formStyle == "slideOver" ? g.value = !1 : H();
    }
    const ae = (O) => {
      O.key === "Escape" && Y();
    };
    return at(() => window.addEventListener("keydown", ae)), Et(() => window.removeEventListener("keydown", ae)), (O, V) => {
      var Ce, Ve, he, je, Oe, xe, Qe, Re, Pe;
      const ce = K("AutoFormFields"), de = K("FormLoading"), ie = K("SecondaryButton"), pe = K("PrimaryButton"), S = K("CloseButton"), ve = K("ModalLookup");
      return o(), r("div", null, [
        M.value ? O.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(j.value)
        }, [
          l("form", {
            onSubmit: qe(z, ["prevent"])
          }, [
            l("div", {
              class: y(q.value)
            }, [
              l("div", null, [
                O.$slots.heading ? (o(), r("div", vf, [
                  U(O.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: y(le.value)
                }, I(Q.value), 3)),
                O.$slots.subheading ? (o(), r("div", pf, [
                  U(O.$slots, "subheading")
                ])) : O.subHeading ? (o(), r("p", {
                  key: 3,
                  class: y(T.value)
                }, I(O.subHeading), 3)) : (Ce = M.value) != null && Ce.notes ? (o(), r("p", {
                  key: 4,
                  class: y(["notes", T.value]),
                  innerHTML: (Ve = M.value) == null ? void 0 : Ve.notes
                }, null, 10, mf)) : x("", !0)
              ]),
              U(O.$slots, "header", {
                formInstance: (he = Be()) == null ? void 0 : he.exposed,
                model: w.value
              }),
              (o(), ne(ce, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: w.value,
                "onUpdate:modelValue": f,
                api: A.value,
                configureField: O.configureField,
                configureFormLayout: O.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(O.$slots, "footer", {
                formInstance: (je = Be()) == null ? void 0 : je.exposed,
                model: w.value
              })
            ], 2),
            l("div", {
              class: y(Z.value)
            }, [
              l("div", null, [
                O.showLoading && J(h) ? (o(), ne(de, { key: 0 })) : x("", !0)
              ]),
              l("div", hf, [
                O.showCancel ? (o(), ne(ie, {
                  key: 0,
                  onClick: Y,
                  disabled: J(h)
                }, {
                  default: _e(() => [
                    ke("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : x("", !0),
                ge(pe, {
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
        ], 2)) : (o(), r("div", gf, [
          yf,
          l("div", bf, [
            l("div", {
              onMousedown: Y,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: V[0] || (V[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: y(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", L.value])
                }, [
                  l("form", {
                    class: y(q.value),
                    onSubmit: qe(z, ["prevent"])
                  }, [
                    l("div", wf, [
                      l("div", kf, [
                        l("div", _f, [
                          l("div", $f, [
                            l("div", Cf, [
                              O.$slots.heading ? (o(), r("div", xf, [
                                U(O.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(le.value)
                              }, I(Q.value), 3)),
                              O.$slots.subheading ? (o(), r("div", Lf, [
                                U(O.$slots, "subheading")
                              ])) : O.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(T.value)
                              }, I(O.subHeading), 3)) : (Oe = M.value) != null && Oe.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", T.value]),
                                innerHTML: (xe = M.value) == null ? void 0 : xe.notes
                              }, null, 10, Vf)) : x("", !0)
                            ]),
                            l("div", Sf, [
                              ge(S, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: Y
                              })
                            ])
                          ])
                        ]),
                        U(O.$slots, "header", {
                          formInstance: (Qe = Be()) == null ? void 0 : Qe.exposed,
                          model: w.value
                        }),
                        (o(), ne(ce, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: w.value,
                          "onUpdate:modelValue": f,
                          api: A.value,
                          configureField: O.configureField,
                          configureFormLayout: O.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
                        U(O.$slots, "footer", {
                          formInstance: (Re = Be()) == null ? void 0 : Re.exposed,
                          model: w.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: y(Z.value)
                    }, [
                      l("div", null, [
                        O.showLoading && J(h) ? (o(), ne(de, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Mf, [
                        O.showCancel ? (o(), ne(ie, {
                          key: 0,
                          onClick: Y,
                          disabled: J(h)
                        }, {
                          default: _e(() => [
                            ke("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : x("", !0),
                        ge(pe, {
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
        ])) : (o(), r("div", df, [
          l("p", cf, [
            ke("Could not create form for unknown "),
            ff,
            ke(" " + I(E.value), 1)
          ])
        ])),
        ((Pe = $.value) == null ? void 0 : Pe.name) == "ModalLookup" && $.value.ref ? (o(), ne(ve, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: b,
          configureField: O.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ]);
    };
  }
}), Tf = { key: 0 }, Ff = { class: "text-red-700" }, If = /* @__PURE__ */ l("b", null, "type", -1), Df = { key: 0 }, jf = { key: 2 }, Of = ["innerHTML"], Pf = { class: "flex justify-end" }, Bf = {
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
    const n = e, a = s, i = D(), u = D(1);
    function d() {
      var ve;
      u.value++, le.value = q();
      const S = Be();
      (ve = S == null ? void 0 : S.proxy) == null || ve.$forceUpdate();
    }
    function c(S) {
      Object.assign(le.value, S);
    }
    function f(S) {
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = D(), k = D();
    function p(S, ve) {
      $.value = S, k.value = ve;
    }
    async function b(S) {
      k.value && k.value(S), $.value = void 0, k.value = void 0;
    }
    const { typeOf: _, apiOf: F, typeProperties: R, createFormLayout: oe, getPrimaryKey: N, Crud: E, createDto: M, formValues: te } = dt(), w = v(() => zt(n.type)), j = v(() => _(w.value)), q = () => typeof n.type == "string" ? M(n.type, ds(n.modelValue)) : n.type ? new n.type(ds(n.modelValue)) : null, le = D(q());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: le });
    const T = v(() => n.panelClass || Ee.panelClass(n.formStyle)), Z = v(() => n.formClass || Ee.formClass(n.formStyle)), W = v(() => n.headingClass || Ee.headingClass(n.formStyle)), Q = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), A = v(() => E.model(j.value)), se = v(() => {
      var S;
      return n.heading || ((S = _(w.value)) == null ? void 0 : S.description) || (A.value ? `Update ${He(A.value)}` : He(w.value));
    }), h = D(new tt());
    let z = Object.assign({}, ds(n.modelValue));
    X.interceptors.has("AutoEditForm.new") && X.interceptors.invoke("AutoEditForm.new", { props: n, model: le, origModel: z });
    let H = ys(), g = v(() => H.loading.value);
    const L = () => Ze(_(E.model(j.value)), (S) => N(S));
    function ee(S) {
      const { op: ve, prop: Ce } = S;
      ve && (E.isPatch(ve) || E.isUpdate(ve)) && (S.disabled = Ce == null ? void 0 : Ce.isPrimaryKey), n.configureField && n.configureField(S);
    }
    async function Y(S) {
      var je, Oe;
      let ve = S.target;
      if (!n.autosave) {
        a("save", new le.value.constructor(te(ve, R(j.value))));
        return;
      }
      let Ce = Ze((je = le.value) == null ? void 0 : je.getMethod, (xe) => typeof xe == "function" ? xe() : null) || "POST", Ve = Ze((Oe = le.value) == null ? void 0 : Oe.createResponse, (xe) => typeof xe == "function" ? xe() : null) == null, he = L();
      if (ml.hasRequestBody(Ce)) {
        let xe = new le.value.constructor(), Qe = we(n.modelValue, he.name), Re = new FormData(ve);
        he && !Array.from(Re.keys()).some((Je) => Je.toLowerCase() == he.name.toLowerCase()) && Re.append(he.name, Qe);
        let Pe = [];
        const Ge = w.value && F(w.value);
        if (Ge && E.isPatch(Ge)) {
          let Je = oe(j.value), Te = {};
          if (he && (Te[he.name] = Qe), Je.forEach((ze) => {
            let rt = ze.id, B = we(z, rt);
            if (he && he.name.toLowerCase() === rt.toLowerCase())
              return;
            let G = Re.get(rt);
            X.interceptors.has("AutoEditForm.save.formLayout") && X.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: B, formLayout: Je, input: ze, newValue: G });
            let be = G != null, De = ze.type === "checkbox" ? be !== !!B : ze.type === "file" ? be : G != B;
            !G && !B && (De = !1), De && (G ? Te[rt] = G : ze.type !== "file" && Pe.push(rt));
          }), X.interceptors.has("AutoEditForm.save") && X.interceptors.invoke("AutoEditForm.save", { origModel: z, formLayout: Je, dirtyValues: Te }), Array.from(Re.keys()).filter((ze) => !Te[ze]).forEach((ze) => Re.delete(ze)), Array.from(Re.keys()).filter((ze) => ze.toLowerCase() != he.name.toLowerCase()).length == 0 && Pe.length == 0) {
            ie();
            return;
          }
        }
        const st = Pe.length > 0 ? { jsconfig: "eccn", reset: Pe } : { jsconfig: "eccn" };
        Ve ? h.value = await H.apiFormVoid(xe, Re, st) : h.value = await H.apiForm(xe, Re, st);
      } else {
        let xe = te(ve, R(j.value));
        he && !we(xe, he.name) && (xe[he.name] = we(n.modelValue, he.name));
        let Qe = new le.value.constructor(xe);
        Ve ? h.value = await H.apiVoid(Qe, { jsconfig: "eccn" }) : h.value = await H.api(Qe, { jsconfig: "eccn" });
      }
      h.value.succeeded ? (ve.reset(), a("save", h.value.response)) : a("error", h.value.error);
    }
    async function ae(S) {
      let ve = L();
      const Ce = ve ? we(n.modelValue, ve.name) : null;
      if (!Ce) {
        console.error(`Could not find Primary Key for Type ${w.value} (${A.value})`);
        return;
      }
      const Ve = { [ve.name]: Ce }, he = typeof n.deleteType == "string" ? M(n.deleteType, Ve) : n.deleteType ? new n.deleteType(Ve) : null;
      Ze(he.createResponse, (Oe) => typeof Oe == "function" ? Oe() : null) == null ? h.value = await H.apiVoid(he) : h.value = await H.api(he), h.value.succeeded ? a("delete", h.value.response) : a("error", h.value.error);
    }
    function O() {
      a("done");
    }
    const V = D(!1), ce = D(""), de = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(V, () => {
      xt(de, ce, V.value), V.value || setTimeout(O, 700);
    }), V.value = !0;
    function ie() {
      n.formStyle == "slideOver" ? V.value = !1 : O();
    }
    const pe = (S) => {
      S.key === "Escape" && ie();
    };
    return at(() => window.addEventListener("keydown", pe)), Et(() => window.removeEventListener("keydown", pe)), (S, ve) => {
      var Re, Pe, Ge, st, Je, Te, lt, ze, rt;
      const Ce = K("AutoFormFields"), Ve = K("ConfirmDelete"), he = K("FormLoading"), je = K("SecondaryButton"), Oe = K("PrimaryButton"), xe = K("CloseButton"), Qe = K("ModalLookup");
      return o(), r("div", null, [
        j.value ? S.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(T.value)
        }, [
          l("form", {
            onSubmit: qe(Y, ["prevent"])
          }, [
            l("div", {
              class: y(Z.value)
            }, [
              l("div", null, [
                S.$slots.heading ? (o(), r("div", Df, [
                  U(S.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: y(W.value)
                }, I(se.value), 3)),
                S.$slots.subheading ? (o(), r("div", jf, [
                  U(S.$slots, "subheading")
                ])) : S.subHeading ? (o(), r("p", {
                  key: 3,
                  class: y(Q.value)
                }, I(S.subHeading), 3)) : (Re = j.value) != null && Re.notes ? (o(), r("p", {
                  key: 4,
                  class: y(["notes", Q.value]),
                  innerHTML: (Pe = j.value) == null ? void 0 : Pe.notes
                }, null, 10, Of)) : x("", !0)
              ]),
              U(S.$slots, "header", {
                formInstance: (Ge = Be()) == null ? void 0 : Ge.exposed,
                model: le.value
              }),
              (o(), ne(Ce, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: le.value,
                "onUpdate:modelValue": f,
                api: h.value,
                configureField: S.configureField,
                configureFormLayout: S.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(S.$slots, "footer", {
                formInstance: (st = Be()) == null ? void 0 : st.exposed,
                model: le.value
              })
            ], 2),
            l("div", {
              class: y(J(Ee).buttonsClass)
            }, [
              l("div", null, [
                S.deleteType ? (o(), ne(Ve, {
                  key: 0,
                  onDelete: ae
                })) : x("", !0)
              ]),
              l("div", null, [
                S.showLoading && J(g) ? (o(), ne(he, { key: 0 })) : x("", !0)
              ]),
              l("div", Pf, [
                ge(je, {
                  onClick: ie,
                  disabled: J(g)
                }, {
                  default: _e(() => [
                    ke("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                ge(Oe, {
                  type: "submit",
                  class: "ml-4",
                  disabled: J(g)
                }, {
                  default: _e(() => [
                    ke("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", Bf, [
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
                  class: y(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ce.value])
                }, [
                  l("form", {
                    class: y(Z.value),
                    onSubmit: qe(Y, ["prevent"])
                  }, [
                    l("div", Ef, [
                      l("div", zf, [
                        l("div", Nf, [
                          l("div", Uf, [
                            l("div", qf, [
                              S.$slots.heading ? (o(), r("div", Qf, [
                                U(S.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(W.value)
                              }, I(se.value), 3)),
                              S.$slots.subheading ? (o(), r("div", Kf, [
                                U(S.$slots, "subheading")
                              ])) : S.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(Q.value)
                              }, I(S.subHeading), 3)) : (Je = j.value) != null && Je.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", Q.value]),
                                innerHTML: (Te = j.value) == null ? void 0 : Te.notes
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
                        U(S.$slots, "header", {
                          formInstance: (lt = Be()) == null ? void 0 : lt.exposed,
                          model: le.value
                        }),
                        (o(), ne(Ce, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: le.value,
                          "onUpdate:modelValue": f,
                          api: h.value,
                          configureField: ee,
                          configureFormLayout: S.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        U(S.$slots, "footer", {
                          formInstance: (ze = Be()) == null ? void 0 : ze.exposed,
                          model: le.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: y(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        S.deleteType ? (o(), ne(Ve, {
                          key: 0,
                          onDelete: ae
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        S.showLoading && J(g) ? (o(), ne(he, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Gf, [
                        ge(je, {
                          onClick: ie,
                          disabled: J(g)
                        }, {
                          default: _e(() => [
                            ke("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        ge(Oe, {
                          type: "submit",
                          class: "ml-4",
                          disabled: J(g)
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
        ])) : (o(), r("div", Tf, [
          l("p", Ff, [
            ke("Could not create form for unknown "),
            If,
            ke(" " + I(w.value), 1)
          ])
        ])),
        ((rt = $.value) == null ? void 0 : rt.name) == "ModalLookup" && $.value.ref ? (o(), ne(Qe, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: b,
          configureField: S.configureField
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
    const s = e, n = t, { typeOf: a, getPrimaryKey: i, Crud: u, createDto: d } = dt(), c = v(() => s.typeName ?? s.apis.dataModel.name), f = v(() => a(c.value)), m = v(() => s.panelClass || Ee.panelClass(s.formStyle)), $ = v(() => s.formClass || Ee.formClass(s.formStyle)), k = v(() => s.headingClass || Ee.headingClass(s.formStyle)), p = v(() => s.subHeadingClass || Ee.subHeadingClass(s.formStyle)), b = v(() => {
      var T, Z;
      return s.heading || ((T = a(c.value)) == null ? void 0 : T.description) || ((Z = s.model) != null && Z.id ? `${He(c.value)} ${s.model.id}` : "View " + He(c.value));
    }), _ = D(new tt());
    Object.assign({}, ds(s.model)), X.interceptors.has("AutoViewForm.new") && X.interceptors.invoke("AutoViewForm.new", { props: s });
    let F = ys(), R = v(() => F.loading.value);
    const oe = () => Ze(f.value, (T) => i(T)), N = v(() => f.value);
    async function E(T) {
      let Z = oe();
      const W = Z ? we(s.model, Z.name) : null;
      if (!W) {
        console.error(`Could not find Primary Key for Type ${c.value} (${N.value})`);
        return;
      }
      const Q = { [Z.name]: W }, A = typeof s.deleteType == "string" ? d(s.deleteType, Q) : s.deleteType ? new s.deleteType(Q) : null;
      Ze(A.createResponse, (h) => typeof h == "function" ? h() : null) == null ? _.value = await F.apiVoid(A) : _.value = await F.api(A), _.value.succeeded ? n("delete", _.value.response) : n("error", _.value.error);
    }
    function M() {
      s.done && s.done();
    }
    const te = D(!1), w = D(""), j = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(te, () => {
      xt(j, w, te.value), te.value || setTimeout(M, 700);
    }), te.value = !0;
    function q() {
      s.formStyle == "slideOver" ? te.value = !1 : M();
    }
    const le = (T) => {
      T.key === "Escape" && q();
    };
    return at(() => window.addEventListener("keydown", le)), Et(() => window.removeEventListener("keydown", le)), (T, Z) => {
      var h, z, H, g;
      const W = K("MarkupModel"), Q = K("CloseButton"), A = K("ConfirmDelete"), se = K("FormLoading");
      return o(), r("div", null, [
        c.value ? T.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(m.value)
        }, [
          l("div", {
            class: y($.value)
          }, [
            l("div", null, [
              T.$slots.heading ? (o(), r("div", tv, [
                U(T.$slots, "heading")
              ])) : (o(), r("h3", {
                key: 1,
                class: y(k.value)
              }, I(b.value), 3)),
              T.$slots.subheading ? (o(), r("div", sv, [
                U(T.$slots, "subheading")
              ])) : T.subHeading ? (o(), r("p", {
                key: 3,
                class: y(p.value)
              }, I(T.subHeading), 3)) : (h = f.value) != null && h.notes ? (o(), r("p", {
                key: 4,
                class: y(["notes", p.value]),
                innerHTML: (z = f.value) == null ? void 0 : z.notes
              }, null, 10, lv)) : x("", !0)
            ]),
            ge(W, { value: T.model }, null, 8, ["value"])
          ], 2)
        ], 2)) : (o(), r("div", nv, [
          ov,
          l("div", av, [
            l("div", {
              onMousedown: q,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: Z[0] || (Z[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: y(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", w.value])
                }, [
                  l("div", {
                    class: y($.value)
                  }, [
                    l("div", rv, [
                      l("div", iv, [
                        l("div", uv, [
                          l("div", dv, [
                            l("div", cv, [
                              T.$slots.heading ? (o(), r("div", fv, [
                                U(T.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(k.value)
                              }, I(b.value), 3)),
                              T.$slots.subheading ? (o(), r("div", vv, [
                                U(T.$slots, "subheading")
                              ])) : T.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(p.value)
                              }, I(T.subHeading), 3)) : (H = f.value) != null && H.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", p.value]),
                                innerHTML: (g = f.value) == null ? void 0 : g.notes
                              }, null, 10, pv)) : x("", !0)
                            ]),
                            l("div", mv, [
                              ge(Q, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: q
                              })
                            ])
                          ])
                        ]),
                        ge(W, { value: T.model }, null, 8, ["value"])
                      ])
                    ]),
                    l("div", {
                      class: y(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        T.deleteType ? (o(), ne(A, {
                          key: 0,
                          onDelete: E
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        T.showLoading && J(R) ? (o(), ne(se, { key: 0 })) : x("", !0)
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
            ke(" " + I(c.value), 1)
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
    let s = D(!1);
    const n = t, a = () => {
      s.value && n("delete");
    }, i = v(() => [
      "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
      s.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"
    ]);
    return (u, d) => (o(), r(Me, null, [
      Pt(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": d[0] || (d[0] = (c) => rn(s) ? s.value = c : s = c)
      }, null, 512), [
        [vl, J(s)]
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
      t.icon ? (o(), r("svg", kv, $v)) : x("", !0),
      l("span", Cv, I(t.text), 1)
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
    const s = e, n = t, a = D(), i = D(null), u = (H) => i.value === H, d = Ds(), c = (H) => Object.keys(d).find((g) => g.toLowerCase() == H.toLowerCase() + "-header"), f = (H) => Object.keys(d).find((g) => g.toLowerCase() == H.toLowerCase()), m = v(() => ll(s.items).filter((H) => !!(d[H] || d[H + "-header"]))), { typeOf: $, typeProperties: k } = dt(), p = v(() => zt(s.type)), b = v(() => $(p.value)), _ = v(() => k(b.value));
    function F(H) {
      const g = s.headerTitles && we(s.headerTitles, H) || H;
      return s.headerTitle ? s.headerTitle(g) : pn(g);
    }
    function R(H) {
      const g = H.toLowerCase();
      return _.value.find((L) => L.name.toLowerCase() == g);
    }
    function oe(H) {
      const g = R(H);
      return g != null && g.format ? g.format : (g == null ? void 0 : g.type) == "TimeSpan" || (g == null ? void 0 : g.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const N = {
      xs: "xs:table-cell",
      sm: "sm:table-cell",
      md: "md:table-cell",
      lg: "lg:table-cell",
      xl: "xl:table-cell",
      "2xl": "2xl:table-cell",
      never: ""
    };
    function E(H) {
      const g = s.visibleFrom && we(s.visibleFrom, H);
      return g && Ze(N[g], (L) => `hidden ${L}`);
    }
    const M = v(() => s.gridClass ?? me.getGridClass(s.tableStyle)), te = v(() => s.grid2Class ?? me.getGrid2Class(s.tableStyle)), w = v(() => s.grid3Class ?? me.getGrid3Class(s.tableStyle)), j = v(() => s.grid4Class ?? me.getGrid4Class(s.tableStyle)), q = v(() => s.tableClass ?? me.getTableClass(s.tableStyle)), le = v(() => s.tbodyClass ?? me.getTbodyClass(s.tbodyClass)), T = v(() => s.theadClass ?? me.getTheadClass(s.tableStyle)), Z = v(() => s.theadRowClass ?? me.getTheadRowClass(s.tableStyle)), W = v(() => s.theadCellClass ?? me.getTheadCellClass(s.tableStyle));
    function Q(H, g) {
      return s.rowClass ? s.rowClass(H, g) : me.getTableRowClass(s.tableStyle, g, !!(s.isSelected && s.isSelected(H)), s.isSelected != null);
    }
    function A(H, g) {
      return s.rowStyle ? s.rowStyle(H, g) : void 0;
    }
    const se = v(() => {
      const H = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (m.value.length > 0 ? m.value : ll(s.items)), g = _.value.reduce((L, ee) => (L[ee.name.toLowerCase()] = ee.format, L), {});
      return H.filter((L) => {
        var ee;
        return ((ee = g[L.toLowerCase()]) == null ? void 0 : ee.method) != "hidden";
      });
    });
    function h(H, g) {
      n("headerSelected", g, H);
    }
    function z(H, g, L) {
      n("rowSelected", L, H);
    }
    return (H, g) => {
      const L = K("CellFormat"), ee = K("PreviewFormat");
      return H.items.length ? (o(), r("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: y(M.value)
      }, [
        l("div", {
          class: y(te.value)
        }, [
          l("div", {
            class: y(w.value)
          }, [
            l("div", {
              class: y(j.value)
            }, [
              l("table", {
                class: y(q.value)
              }, [
                l("thead", {
                  class: y(T.value)
                }, [
                  l("tr", {
                    class: y(Z.value)
                  }, [
                    (o(!0), r(Me, null, Ie(se.value, (Y) => (o(), r("td", {
                      class: y([E(Y), W.value, u(Y) ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"])
                    }, [
                      l("div", {
                        onClick: (ae) => h(ae, Y)
                      }, [
                        J(d)[Y + "-header"] ? U(H.$slots, Y + "-header", {
                          key: 0,
                          column: Y
                        }) : c(Y) ? U(H.$slots, c(Y), {
                          key: 1,
                          column: Y
                        }) : J(d).header ? U(H.$slots, "header", {
                          key: 2,
                          column: Y,
                          label: F(Y)
                        }) : (o(), r("div", Vv, [
                          l("span", Sv, I(F(Y)), 1)
                        ]))
                      ], 8, Lv)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: y(le.value)
                }, [
                  (o(!0), r(Me, null, Ie(H.items, (Y, ae) => (o(), r("tr", {
                    class: y(Q(Y, ae)),
                    style: fl(A(Y, ae)),
                    onClick: (O) => z(O, ae, Y)
                  }, [
                    (o(!0), r(Me, null, Ie(se.value, (O) => (o(), r("td", {
                      class: y([E(O), J(me).tableCellClass])
                    }, [
                      J(d)[O] ? U(H.$slots, O, Yt(Ae({ key: 0 }, Y))) : f(O) ? U(H.$slots, f(O), Yt(Ae({ key: 1 }, Y))) : R(O) ? (o(), ne(L, {
                        key: 2,
                        type: b.value,
                        propType: R(O),
                        modelValue: Y
                      }, null, 8, ["type", "propType", "modelValue"])) : (o(), ne(ee, {
                        key: 3,
                        value: J(we)(Y, O),
                        format: oe(O)
                      }, null, 8, ["value", "format"]))
                    ], 2))), 256))
                  ], 14, Mv))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : x("", !0);
    };
  }
}), Tv = ue({
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
      var R;
      const a = n(e.propType), i = we(e.modelValue, e.propType.name), u = Object.assign({}, e, t), d = Tt("span", { innerHTML: ps(i, a, u) }), c = Xt(i) && Array.isArray(i) ? Tt("span", {}, [
        Tt("span", { class: "mr-2" }, `${i.length}`),
        d
      ]) : d, f = (R = e.propType) == null ? void 0 : R.ref;
      if (!f)
        return c;
      const $ = ot(e.type).find((oe) => oe.type === f.model);
      if (!$)
        return c;
      const k = we(e.modelValue, $.name), p = k && f.refLabel && we(k, f.refLabel);
      if (!p)
        return c;
      const b = s(f.model), _ = b == null ? void 0 : b.icon, F = _ ? Tt(lo, { image: _, class: "w-5 h-5 mr-1" }) : null;
      return Tt("span", { class: "flex", title: `${f.model} ${i}` }, [
        F,
        p
      ]);
    };
  }
}), Fv = { key: 0 }, Iv = {
  key: 0,
  class: "mr-2"
}, Dv = ["innerHTML"], jv = ["innerHTML"], Ov = {
  inheritAttrs: !1
}, Pv = /* @__PURE__ */ ue({
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
    return (n, a) => J(Xt)(n.value) ? (o(), r("span", Fv, [
      n.includeCount && s.value ? (o(), r("span", Iv, I(n.value.length), 1)) : x("", !0),
      l("span", {
        innerHTML: J(ps)(n.value, n.format, n.$attrs)
      }, null, 8, Dv)
    ])) : (o(), r("span", {
      key: 1,
      innerHTML: J(ps)(n.value, n.format, n.$attrs)
    }, null, 8, jv));
  }
}), Bv = ["innerHTML"], Hv = { key: 0 }, Rv = /* @__PURE__ */ l("b", null, null, -1), Ev = { key: 2 }, zv = /* @__PURE__ */ ue({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Ht(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => pn(c), i = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, u = v(() => ll(t.value)), d = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const m = K("HtmlFormat", !0);
      return o(), r("div", {
        class: y(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), r("div", {
          key: 0,
          innerHTML: J(ps)(c.value)
        }, null, 8, Bv)) : n.value ? (o(), r("div", {
          key: 1,
          class: y(c.classes("array", "div", c.depth, J(me).gridClass))
        }, [
          J(Ht)(c.value[0]) ? (o(), r("div", Hv, "[ " + I(c.value.join(", ")) + " ]", 1)) : (o(), r("div", {
            key: 1,
            class: y(c.classes("array", "div", c.depth, J(me).grid2Class))
          }, [
            l("div", {
              class: y(c.classes("array", "div", c.depth, J(me).grid3Class))
            }, [
              l("div", {
                class: y(c.classes("array", "div", c.depth, J(me).grid4Class))
              }, [
                l("table", {
                  class: y(c.classes("object", "table", c.depth, J(me).tableClass))
                }, [
                  l("thead", {
                    class: y(c.classes("array", "thead", c.depth, J(me).theadClass))
                  }, [
                    l("tr", null, [
                      (o(!0), r(Me, null, Ie(u.value, ($) => (o(), r("th", {
                        class: y(c.classes("array", "th", c.depth, J(me).theadCellClass + " whitespace-nowrap"))
                      }, [
                        Rv,
                        ke(I(a($)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), r(Me, null, Ie(c.value, ($, k) => (o(), r("tr", {
                      class: y(c.classes("array", "tr", c.depth, k % 2 == 0 ? "bg-white" : "bg-gray-50", k))
                    }, [
                      (o(!0), r(Me, null, Ie(u.value, (p) => (o(), r("td", {
                        class: y(c.classes("array", "td", c.depth, J(me).tableCellClass))
                      }, [
                        ge(m, Ae({
                          value: $[p],
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
            class: y(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), r(Me, null, Ie(d(c.value), ($) => (o(), r("tr", {
              class: y(c.classes("object", "tr", c.depth, ""))
            }, [
              l("th", {
                class: y(c.classes("object", "th", c.depth, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"))
              }, I($.key), 3),
              l("td", {
                class: y(c.classes("object", "td", c.depth, "align-top py-2 px-4 text-sm"))
              }, [
                ge(m, Ae({
                  value: $.val,
                  "field-attrs": c.fieldAttrs,
                  depth: c.depth + 1,
                  classes: c.classes
                }, i($.key)), null, 16, ["value", "field-attrs", "depth", "classes"])
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
      const c = K("Icon"), f = K("HtmlFormat");
      return J(a) == "link" ? (o(), r("a", {
        key: 0,
        href: u.value,
        class: "text-indigo-600"
      }, I(u.value), 9, Nv)) : J(a) == "image" ? (o(), r("a", {
        key: 1,
        href: u.value,
        title: u.value,
        class: "inline-block"
      }, [
        ge(c, {
          src: u.value,
          class: y(u.imageClass)
        }, null, 8, ["src", "class"])
      ], 8, Uv)) : (o(), ne(f, {
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
      const d = K("MarkupFormat");
      return o(), r("table", Qv, [
        (o(), r(Me, null, Ie(n, (c, f) => l("tr", Kv, [
          l("th", Zv, I(J(He)(f)), 1),
          l("td", Wv, [
            ge(d, { value: c }, null, 8, ["value"])
          ])
        ])), 64)),
        (o(), r(Me, null, Ie(a, (c, f) => (o(), r(Me, null, [
          l("tr", Gv, [
            l("td", Jv, I(J(He)(f)), 1)
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
        class: y([s.buttonClass, "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
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
    const s = t, n = D(!1), a = D(""), i = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(n, () => {
      xt(i, a, n.value), n.value || setTimeout(() => s("done"), 700);
    }), n.value = !0;
    const u = () => n.value = !1, d = (c) => {
      c.key === "Escape" && u();
    };
    return at(() => window.addEventListener("keydown", d)), Et(() => window.removeEventListener("keydown", d)), (c, f) => {
      const m = K("CloseButton");
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
                class: y(["panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", a.value])
              }, [
                l("div", up, [
                  l("div", dp, [
                    l("div", cp, [
                      l("div", fp, [
                        l("div", vp, [
                          l("div", pp, [
                            c.$slots.title ? (o(), r("div", mp, [
                              U(c.$slots, "title")
                            ])) : x("", !0),
                            c.title ? (o(), r("h2", {
                              key: 1,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, I(c.title), 9, hp)) : x("", !0),
                            c.$slots.subtitle ? (o(), r("p", gp, [
                              U(c.$slots, "subtitle")
                            ])) : x("", !0)
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
                        class: y(c.contentClass)
                      }, [
                        U(c.$slots, "default")
                      ], 2)
                    ])
                  ]),
                  c.$slots.footer ? (o(), r("div", bp, [
                    U(c.$slots, "footer")
                  ])) : x("", !0)
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
    modalClass: { default: cl.modalClass },
    sizeClass: { default: cl.sizeClass },
    closeButtonClass: { default: "bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black" },
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = Ds(), n = t, a = D(!1), i = D(""), u = {
      entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
    }, d = D(""), c = {
      entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
    };
    Lt(a, () => {
      xt(u, i, a.value), xt(c, d, a.value), a.value || setTimeout(() => n("done"), 200);
    }), a.value = !0;
    const f = () => a.value = !1;
    ms("ModalProvider", {
      openModal: p
    });
    const $ = D(), k = D();
    function p(F, R) {
      $.value = F, k.value = R;
    }
    async function b(F) {
      k.value && k.value(F), $.value = void 0, k.value = void 0;
    }
    const _ = (F) => {
      F.key === "Escape" && f();
    };
    return at(() => window.addEventListener("keydown", _)), Et(() => window.removeEventListener("keydown", _)), (F, R) => {
      var N;
      const oe = K("ModalLookup");
      return o(), r("div", {
        id: F.id,
        "data-transition-for": F.id,
        onMousedown: f,
        class: "relative z-10",
        "aria-labelledby": `${F.id}-title`,
        role: "dialog",
        "aria-modal": "true"
      }, [
        l("div", {
          class: y(["fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", i.value])
        }, null, 2),
        l("div", _p, [
          l("div", $p, [
            l("div", {
              class: y([F.modalClass, F.sizeClass, d.value]),
              onMousedown: R[0] || (R[0] = qe(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                J(s).closebutton ? U(F.$slots, "createform", { key: 0 }) : (o(), r("div", Cp, [
                  l("button", {
                    type: "button",
                    onClick: f,
                    class: y(F.closeButtonClass)
                  }, Vp, 2)
                ])),
                U(F.$slots, "default")
              ])
            ], 34),
            U(F.$slots, "bottom")
          ])
        ]),
        ((N = $.value) == null ? void 0 : N.name) == "ModalLookup" && $.value.ref ? (o(), ne(oe, {
          key: 0,
          "ref-info": $.value.ref,
          onDone: b,
          configureField: F.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ], 40, kp);
    };
  }
}), Mp = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Ap = { class: "mt-3 pl-5 flex flex-wrap items-center" }, Tp = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, Fp = { class: "hidden md:inline" }, Ip = { class: "flex pb-1 sm:pb-0" }, Dp = ["title"], jp = /* @__PURE__ */ l("svg", {
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
], Pp = ["disabled"], Bp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), Hp = [
  Bp
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
    const s = e, n = t, a = Ds(), { config: i } = Nt(), { metadataApi: u, filterDefinitions: d } = dt(), c = We("client"), f = i.value.storage, m = v(() => s.toolbarButtonClass ?? me.toolbarButtonClass), $ = v(() => d.value), k = D({ take: an }), p = D(new tt()), b = D(s.skip), _ = D(!1), F = D(), R = (B) => typeof B == "string" ? B.split(",") : B || [];
    function oe(B, G) {
      return me.getTableRowClass("fullWidth", G, !1, !0);
    }
    function N() {
      let B = R(s.selectedColumns);
      return B.length > 0 ? B : [];
    }
    const E = v(() => pt(s.refInfo.model)), M = v(() => {
      let G = N().map((De) => De.toLowerCase());
      const be = ot(E.value);
      return G.length > 0 ? G.map((De) => be.find((Ye) => Ye.name.toLowerCase() === De)).filter((De) => De != null) : be;
    }), te = v(() => {
      let B = M.value.map((be) => be.name), G = R(k.value.selectedColumns).map((be) => be.toLowerCase());
      return G.length > 0 ? B.filter((be) => G.includes(be.toLowerCase())) : B;
    }), w = v(() => k.value.take ?? an), j = v(() => p.value.response ? we(p.value.response, "results") : []), q = v(() => {
      var B;
      return ((B = p.value.response) == null ? void 0 : B.total) ?? j.value.length ?? 0;
    }), le = v(() => b.value > 0), T = v(() => b.value > 0), Z = v(() => j.value.length >= w.value), W = v(() => j.value.length >= w.value), Q = D([]), A = v(() => Q.value.some((B) => B.settings.filters.length > 0 || !!B.settings.sort)), se = v(() => Q.value.map((B) => B.settings.filters.length).reduce((B, G) => B + G, 0)), h = v(() => ls(E.value)), z = v(() => {
      var B;
      return (B = u.value) == null ? void 0 : B.operations.find((G) => {
        var be;
        return ((be = G.dataModel) == null ? void 0 : be.name) == s.refInfo.model && Ke.isAnyQuery(G);
      });
    }), H = D(), g = D(!1), L = D(), ee = v(() => zt(s.refInfo.model)), Y = v(() => Rt.forType(ee.value, u.value)), ae = v(() => {
      var B;
      return ee.value || ((B = z.value) == null ? void 0 : B.dataModel.name);
    }), O = v(() => s.modelTitle || ae.value), V = v(() => s.newButtonLabel || `New ${O.value}`), ce = v(() => cs(Y.value.Create)), de = D(), ie = D(!1);
    function pe() {
      ie.value = !0;
    }
    function S() {
      ie.value = !1;
    }
    async function ve(B) {
      S(), n("done", B);
    }
    function Ce(B) {
      var G;
      de.value && (Object.assign((G = de.value) == null ? void 0 : G.model, B), console.log("setCreate", JSON.stringify(B, null, 2)), Ve());
    }
    function Ve() {
      var G, be;
      (G = de.value) == null || G.forceUpdate();
      const B = Be();
      (be = B == null ? void 0 : B.proxy) == null || be.$forceUpdate();
    }
    const he = () => `${s.id}/ApiPrefs/${s.refInfo.model}`, je = (B) => `Column/${s.id}:${s.refInfo.model}.${B}`;
    async function Oe(B) {
      b.value += B, b.value < 0 && (b.value = 0);
      var G = Math.floor(q.value / w.value) * w.value;
      b.value > G && (b.value = G), await Te();
    }
    async function xe(B, G) {
      n("done", B);
    }
    function Qe() {
      n("done", null);
    }
    function Re(B, G) {
      var De, Ye, ct;
      let be = G.target;
      if ((be == null ? void 0 : be.tagName) !== "TD") {
        let bt = (De = be == null ? void 0 : be.closest("TABLE")) == null ? void 0 : De.getBoundingClientRect(), $t = Q.value.find((Se) => Se.name.toLowerCase() == B.toLowerCase());
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
    function Pe() {
      L.value = null;
    }
    async function Ge(B) {
      var be;
      let G = (be = L.value) == null ? void 0 : be.column;
      G && (G.settings = B, f.setItem(je(G.name), JSON.stringify(G.settings)), await Te()), L.value = null;
    }
    async function st(B) {
      f.setItem(je(B.name), JSON.stringify(B.settings)), await Te();
    }
    async function Je(B) {
      g.value = !1, k.value = B, f.setItem(he(), JSON.stringify(B)), await Te();
    }
    async function Te() {
      await lt(ze());
    }
    async function lt(B) {
      const G = z.value;
      if (!G) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let be = fs(G, B), De = vn((bt) => {
        p.value.response = p.value.error = void 0, _.value = bt;
      }), Ye = await c.api(be);
      De(), Ot(() => p.value = Ye);
      let ct = we(Ye.response, "results") || [];
      !Ye.succeeded || ct.label == 0;
    }
    function ze() {
      let B = {
        include: "total",
        take: w.value
      }, G = R(k.value.selectedColumns || s.selectedColumns);
      if (G.length > 0) {
        let De = h.value;
        De && G.includes(De.name) && (G = [De.name, ...G]), B.fields = G.join(",");
      }
      let be = [];
      return Q.value.forEach((De) => {
        De.settings.sort && be.push((De.settings.sort === "DESC" ? "-" : "") + De.name), De.settings.filters.forEach((Ye) => {
          let ct = Ye.key.replace("%", De.name);
          B[ct] = Ye.value;
        });
      }), typeof B.skip > "u" && b.value > 0 && (B.skip = b.value), be.length > 0 && (B.orderBy = be.join(",")), B;
    }
    async function rt() {
      Q.value.forEach((B) => {
        B.settings = { filters: [] }, f.removeItem(je(B.name));
      }), await Te();
    }
    return at(async () => {
      const B = s.prefs || Ts(f.getItem(he()));
      B && (k.value = B), Q.value = M.value.map((G) => ({
        name: G.name,
        type: G.type,
        meta: G,
        settings: Object.assign(
          {
            filters: []
          },
          Ts(f.getItem(je(G.name)))
        )
      })), isNaN(s.skip) || (b.value = s.skip), await Te();
    }), (B, G) => {
      const be = K("AutoCreateForm"), De = K("ErrorSummary"), Ye = K("Loading"), ct = K("SettingsIcons"), bt = K("DataGrid"), $t = K("ModalDialog");
      return o(), r(Me, null, [
        B.refInfo ? (o(), ne($t, {
          key: 0,
          ref_key: "modalDialog",
          ref: H,
          id: B.id,
          onDone: Qe
        }, {
          default: _e(() => [
            l("div", Mp, [
              l("div", Ap, [
                l("h3", Tp, [
                  ke(" Select "),
                  l("span", Fp, I(J(He)(B.refInfo.model)), 1)
                ]),
                l("div", Ip, [
                  B.showPreferences ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${B.refInfo.model} Preferences`,
                    onClick: G[0] || (G[0] = (Se) => g.value = !g.value)
                  }, Op, 8, Dp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: y(["pl-2", le.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !le.value,
                    onClick: G[1] || (G[1] = (Se) => Oe(-q.value))
                  }, Hp, 10, Pp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 2,
                    type: "button",
                    class: y(["pl-2", T.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !T.value,
                    onClick: G[2] || (G[2] = (Se) => Oe(-w.value))
                  }, zp, 10, Rp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 3,
                    type: "button",
                    class: y(["pl-2", Z.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !Z.value,
                    onClick: G[3] || (G[3] = (Se) => Oe(w.value))
                  }, qp, 10, Np)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 4,
                    type: "button",
                    class: y(["pl-2", W.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !W.value,
                    onClick: G[4] || (G[4] = (Se) => Oe(q.value))
                  }, Zp, 10, Qp)) : x("", !0)
                ]),
                B.showPagingInfo ? (o(), r("div", Wp, [
                  l("div", Gp, [
                    _.value ? (o(), r("span", Jp, "Querying...")) : x("", !0),
                    j.value.length ? (o(), r("span", Xp, [
                      Yp,
                      ke(" " + I(b.value + 1) + " - " + I(Math.min(b.value + j.value.length, q.value)) + " ", 1),
                      l("span", null, " of " + I(q.value), 1)
                    ])) : p.value.completed ? (o(), r("span", em, "No Results")) : x("", !0)
                  ])
                ])) : x("", !0),
                Y.value.Create && ce.value ? (o(), r("div", tm, [
                  l("button", {
                    type: "button",
                    onClick: G[5] || (G[5] = (Se) => pe()),
                    title: "modelTitle",
                    class: y(J(me).toolbarButtonClass)
                  }, [
                    sm,
                    l("span", lm, I(V.value), 1)
                  ], 2),
                  ie.value ? (o(), ne(be, {
                    key: 0,
                    ref_key: "createForm",
                    ref: de,
                    type: Y.value.Create.request.name,
                    configure: B.configureField,
                    onDone: S,
                    onSave: ve
                  }, {
                    header: _e(() => [
                      U(B.$slots, "formheader", {
                        form: "create",
                        formInstance: de.value,
                        apis: Y.value,
                        type: ae.value,
                        updateModel: Ce
                      })
                    ]),
                    footer: _e(() => [
                      U(B.$slots, "formfooter", {
                        form: "create",
                        formInstance: de.value,
                        apis: Y.value,
                        type: ae.value,
                        updateModel: Ce
                      })
                    ]),
                    _: 3
                  }, 8, ["type", "configure"])) : x("", !0)
                ])) : x("", !0),
                A.value && B.showResetPreferences ? (o(), r("div", nm, [
                  l("button", {
                    type: "button",
                    onClick: rt,
                    title: "Reset Preferences & Filters",
                    class: y(m.value)
                  }, am, 2)
                ])) : x("", !0),
                l("div", rm, [
                  B.showFiltersView && se.value > 0 ? (o(), r("div", im, [
                    l("button", {
                      type: "button",
                      onClick: G[6] || (G[6] = (Se) => F.value = F.value == "filters" ? null : "filters"),
                      class: y(m.value),
                      "aria-expanded": "false"
                    }, [
                      um,
                      l("span", dm, I(se.value) + " " + I(se.value == 1 ? "Filter" : "Filters"), 1),
                      F.value != "filters" ? (o(), r("svg", cm, vm)) : (o(), r("svg", pm, hm))
                    ], 2)
                  ])) : x("", !0)
                ])
              ]),
              F.value == "filters" ? (o(), ne(Hl, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: $.value,
                columns: Q.value,
                onDone: G[7] || (G[7] = (Se) => F.value = null),
                onChange: st
              }, null, 8, ["definitions", "columns"])) : x("", !0),
              L.value ? (o(), r("div", gm, [
                ge(Bl, {
                  definitions: $.value,
                  column: L.value.column,
                  "top-left": L.value.topLeft,
                  onDone: Pe,
                  onSave: Ge
                }, null, 8, ["definitions", "column", "top-left"])
              ])) : x("", !0),
              p.value.error ? (o(), ne(De, {
                key: 2,
                status: p.value.error
              }, null, 8, ["status"])) : _.value ? (o(), ne(Ye, { key: 3 })) : (o(), r("div", ym, [
                j.value.length ? (o(), r("div", bm, [
                  ge(bt, {
                    id: B.id,
                    items: j.value,
                    type: B.refInfo.model,
                    "selected-columns": te.value,
                    onFiltersChanged: Te,
                    tableStyle: "fullWidth",
                    rowClass: oe,
                    onRowSelected: xe,
                    onHeaderSelected: Re
                  }, pl({
                    header: _e(({ column: Se, label: Vt }) => {
                      var Ut;
                      return [
                        B.allowFiltering && (!s.canFilter || s.canFilter(Se)) ? (o(), r("div", wm, [
                          l("span", km, I(Vt), 1),
                          ge(ct, {
                            column: Q.value.find((qt) => qt.name.toLowerCase() === Se.toLowerCase()),
                            "is-open": ((Ut = L.value) == null ? void 0 : Ut.column.name) === Se
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), r("div", _m, [
                          l("span", $m, I(Vt), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    Ie(Object.keys(J(a)), (Se) => ({
                      name: Se,
                      fn: _e((Vt) => [
                        U(B.$slots, Se, Yt(Ms(Vt)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : x("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : x("", !0),
        g.value ? (o(), ne(Rl, {
          key: 1,
          columns: M.value,
          prefs: k.value,
          onDone: G[8] || (G[8] = (Se) => g.value = !1),
          onSave: Je
        }, null, 8, ["columns", "prefs"])) : x("", !0)
      ], 64);
    };
  }
}), xm = { class: "sm:hidden" }, Lm = ["for"], Vm = ["id", "name"], Sm = ["value"], Mm = { class: "hidden sm:block" }, Am = { class: "border-b border-gray-200" }, Tm = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, Fm = ["onClick"], Im = /* @__PURE__ */ ue({
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
    const t = e, s = v(() => Object.keys(t.tabs)), n = (m) => t.label ? t.label(m) : He(m), a = v(() => t.id || "tabs"), i = v(() => t.param || "tab"), u = D();
    function d(m) {
      if (u.value = m, t.url) {
        const $ = s.value[0];
        hl({ tab: m === $ ? void 0 : m }, t.clearQuery);
      }
    }
    function c(m) {
      return u.value === m;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return at(() => {
      if (u.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const m = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "", k = sl(m)[i.value];
        k && (u.value = k);
      }
    }), (m, $) => (o(), r("div", null, [
      l("div", xm, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, Lm),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: $[0] || ($[0] = (k) => {
            var p;
            return d((p = k.target) == null ? void 0 : p.value);
          })
        }, [
          (o(!0), r(Me, null, Ie(s.value, (k) => (o(), r("option", {
            key: k,
            value: k
          }, I(n(k)), 9, Sm))), 128))
        ], 40, Vm)
      ]),
      l("div", Mm, [
        l("div", Am, [
          l("nav", Tm, [
            (o(!0), r(Me, null, Ie(s.value, (k) => (o(), r("a", {
              href: "#",
              onClick: qe((p) => d(k), ["prevent"]),
              style: fl({ width: f.value }),
              class: y([c(k) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", m.tabClass])
            }, I(n(k)), 15, Fm))), 256))
          ])
        ])
      ]),
      l("div", {
        class: y(m.bodyClass)
      }, [
        (o(), ne(dn(m.tabs[u.value])))
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
], -1), Pm = [
  Om
], Bm = /* @__PURE__ */ ue({
  __name: "DarkModeToggle",
  setup(e) {
    const t = typeof document < "u" ? document.documentElement : null, s = () => !!(t != null && t.classList.contains("dark")), n = D(localStorage.getItem("color-scheme") == "dark");
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
        class: y(`${n.value ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`)
      }, [
        l("span", {
          class: y(`${n.value ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, jm, 2),
        l("span", {
          class: y(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Pm, 2)
      ], 2)
    ]));
  }
}), Hm = { key: 0 }, Rm = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, Em = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, zm = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50" }, Nm = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600 dark:text-gray-300"
}, Um = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, qm = ["onClick"], Qm = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, Km = { class: "bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10" }, Zm = { class: "mt-8" }, Wm = {
  key: 1,
  class: "mt-6"
}, Gm = /* @__PURE__ */ Is('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300 dark:border-gray-600"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500 dark:text-gray-400"> Or continue with </span></div></div>', 1), Jm = { class: "mt-6 grid grid-cols-3 gap-3" }, Xm = ["href", "title"], Ym = {
  key: 1,
  class: "h-5 w-5 text-gray-700 dark:text-gray-200",
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
    const s = e, n = t, { getMetadata: a, createDto: i } = dt(), u = ys(), d = We("client"), { signIn: c } = Pl(), f = a({ assert: !0 }), m = f.plugins.auth, $ = document.baseURI, k = f.app.baseUrl, p = D(i("Authenticate")), b = D(new tt()), _ = D(s.provider);
    at(() => {
      m == null || m.authProviders.map((T) => T.formLayout).filter((T) => T).forEach((T) => T.forEach(
        (Z) => p.value[Z.id] = Z.type === "checkbox" ? !1 : ""
      ));
    });
    const F = v(() => (m == null ? void 0 : m.authProviders.filter((T) => T.formLayout)) || []), R = v(() => F.value[0] || {}), oe = v(() => F.value[Math.max(F.value.length - 1, 0)] || {}), N = v(() => (_.value ? m == null ? void 0 : m.authProviders.find((T) => T.name === _.value) : null) ?? R.value), E = (T) => T === !1 || T === "false";
    function M(T) {
      return T.label || T.navItem && T.navItem.label;
    }
    const te = v(() => {
      var T;
      return (((T = N.value) == null ? void 0 : T.formLayout) || []).map((Z) => {
        var W, Q;
        return Object.assign({}, Z, {
          type: (W = Z.type) == null ? void 0 : W.toLowerCase(),
          autocomplete: Z.autocomplete || (((Q = Z.type) == null ? void 0 : Q.toLowerCase()) === "password" ? "current-password" : void 0) || (Z.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, Z.css)
        });
      });
    }), w = v(() => E(s.oauth) ? [] : (m == null ? void 0 : m.authProviders.filter((T) => T.type === "oauth")) || []), j = v(() => {
      let T = Ho(
        m == null ? void 0 : m.authProviders.filter((W) => W.formLayout && W.formLayout.length > 0),
        (W, Q) => {
          let A = M(Q) || vt(Q.name);
          W[A] = Q.name === R.value.name ? "" : Q.name;
        }
      );
      const Z = N.value;
      return Z && E(s.tabs) && (T = { [M(Z) || vt(Z.name)]: Z }), T;
    }), q = v(() => {
      let T = te.value.map((Z) => Z.id).filter((Z) => Z);
      return b.value.summaryMessage(T);
    });
    async function le() {
      if (p.value.provider = N.value.name, N.value.name === "authsecret" ? (d.headers.set("authsecret", p.value.authsecret), p.value = i("Authenticate")) : N.value.name === "basic" ? (d.setCredentials(p.value.UserName, p.value.Password), p.value = i("Authenticate"), p.value.UserName = null, p.value.Password = null) : (N.value.type === "Bearer" || N.value.name === "jwt") && (d.bearerToken = p.value.BearerToken, p.value = i("Authenticate")), b.value = await u.api(p.value), b.value.succeeded) {
        const T = b.value.response;
        c(T), n("login", T), b.value = new tt(), p.value = i("Authenticate");
      }
    }
    return (T, Z) => {
      const W = K("ErrorSummary"), Q = K("AutoFormFields"), A = K("PrimaryButton"), se = K("Icon"), h = _o("href");
      return J(m) ? (o(), r("div", Rm, [
        l("div", Em, [
          l("h2", zm, I(T.title), 1),
          Object.keys(j.value).length > 1 ? (o(), r("p", Nm, [
            l("span", Um, [
              (o(!0), r(Me, null, Ie(j.value, (z, H) => Pt((o(), r("a", {
                onClick: (g) => _.value = z,
                class: y([
                  z === "" || z === R.value.name ? "rounded-l-md" : z === oe.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  _.value === z ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                ])
              }, [
                ke(I(H), 1)
              ], 10, qm)), [
                [h, { provider: z }]
              ])), 256))
            ])
          ])) : x("", !0)
        ]),
        l("div", Qm, [
          q.value ? (o(), ne(W, {
            key: 0,
            class: "mb-3",
            errorSummary: q.value
          }, null, 8, ["errorSummary"])) : x("", !0),
          l("div", Km, [
            te.value.length ? (o(), r("form", {
              key: 0,
              onSubmit: qe(le, ["prevent"])
            }, [
              ge(Q, {
                modelValue: p.value,
                formLayout: te.value,
                api: b.value,
                hideSummary: !0,
                "divide-class": "",
                "space-class": "space-y-6"
              }, null, 8, ["modelValue", "formLayout", "api"]),
              l("div", Zm, [
                ge(A, { class: "w-full" }, {
                  default: _e(() => [
                    ke("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : x("", !0),
            w.value.length ? (o(), r("div", Wm, [
              Gm,
              l("div", Jm, [
                (o(!0), r(Me, null, Ie(w.value, (z) => (o(), r("div", null, [
                  l("a", {
                    href: J(k) + z.navItem.href + "?continue=" + J($),
                    title: M(z),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }, [
                    z.icon ? (o(), ne(se, {
                      key: 0,
                      image: z.icon,
                      class: "h-5 w-5 text-gray-700 dark:text-gray-200"
                    }, null, 8, ["image"])) : (o(), r("svg", Ym, s1))
                  ], 8, Xm)
                ]))), 256))
              ])
            ])) : x("", !0)
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
], T1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), F1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), I1 = [
  T1,
  F1
], D1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), j1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), O1 = [
  D1,
  j1
], P1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), B1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), H1 = [
  P1,
  B1
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
    const c = v(() => _t.call({ responseStatus: n.status ?? (d == null ? void 0 : d.error.value) }, n.id)), f = v(() => n.label ?? He(vt(n.id))), m = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), $ = v(() => n.hide ? jt(m, n.hide) : jt(m, []));
    function k(g) {
      return $.value[g];
    }
    const p = v(() => ["shadow-sm font-mono" + ft.base.replace("rounded-md", ""), c.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ft.valid, n.inputClass]), b = D();
    t({ props: n, textarea: b, updateModelValue: _, selection: R, hasSelection: F, selectionInfo: oe, insert: E, replace: N });
    function _(g) {
      a("update:modelValue", g);
    }
    function F() {
      return b.value.selectionStart !== b.value.selectionEnd;
    }
    function R() {
      const g = b.value;
      return g.value.substring(g.selectionStart, g.selectionEnd) || "";
    }
    function oe() {
      const g = b.value, L = g.value, ee = g.selectionStart, Y = L.substring(ee, g.selectionEnd) || "", ae = L.substring(0, ee), O = ae.lastIndexOf(`
`);
      return {
        value: L,
        sel: Y,
        selPos: ee,
        beforeSel: ae,
        afterSel: L.substring(ee),
        prevCRPos: O,
        beforeCR: O >= 0 ? ae.substring(0, O + 1) : "",
        afterCR: O >= 0 ? ae.substring(O + 1) : ""
      };
    }
    function N({ value: g, selectionStart: L, selectionEnd: ee }) {
      ee == null && (ee = L), _(g), Ot(() => {
        b.value.focus(), b.value.setSelectionRange(L, ee);
      });
    }
    function E(g, L, ee = "", { selectionAtEnd: Y, offsetStart: ae, offsetEnd: O, filterValue: V, filterSelection: ce } = {}) {
      const de = b.value;
      let ie = de.value, pe = de.selectionEnd;
      i.push({ value: ie, selectionStart: de.selectionStart, selectionEnd: de.selectionEnd }), u = [];
      const S = de.selectionStart, ve = de.selectionEnd;
      let Ce = ie.substring(0, S), Ve = ie.substring(ve);
      const he = g && Ce.endsWith(g) && Ve.startsWith(L);
      if (S == ve) {
        if (he ? (ie = Ce.substring(0, Ce.length - g.length) + Ve.substring(L.length), pe += -L.length) : (ie = Ce + g + ee + L + Ve, pe += g.length, ae = 0, O = (ee == null ? void 0 : ee.length) || 0, Y && (pe += O, O = 0)), V) {
          var Oe = { pos: pe };
          ie = V(ie, Oe), pe = Oe.pos;
        }
      } else {
        var xe = ie.substring(S, ve);
        ce && (xe = ce(xe)), he ? (ie = Ce.substring(0, Ce.length - g.length) + xe + Ve.substring(L.length), ae = -xe.length - g.length, O = xe.length) : (ie = Ce + g + xe + L + Ve, ae ? pe += (g + L).length : (pe = S, ae = g.length, O = xe.length));
      }
      _(ie), Ot(() => {
        de.focus(), ae = pe + (ae || 0), O = (ae || 0) + (O || 0), de.setSelectionRange(ae, O);
      });
    }
    const M = () => E("**", "**", "bold"), te = () => E("_", "_", "italics"), w = () => E("~~", "~~", "strikethrough"), j = () => E("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), q = () => E(`
> `, `
`, "Blockquote", {}), le = () => E("![](", ")");
    function T(g) {
      const L = R();
      if (L && !g.shiftKey)
        E("`", "`", "code");
      else {
        const ee = n.lang || "js";
        L.indexOf(`
`) === -1 ? E("\n```" + ee + `
`, "\n```\n", "// code") : E("```" + ee + `
`, "```\n", "");
      }
    }
    function Z() {
      if (F()) {
        let { sel: g, selPos: L, beforeSel: ee, afterSel: Y, prevCRPos: ae, beforeCR: O, afterCR: V } = oe();
        if (g.indexOf(`
`) === -1)
          E(`
 1. `, `
`);
        else if (!g.startsWith(" 1. ")) {
          let ie = 1;
          E("", "", " - ", {
            selectionAtEnd: !0,
            filterSelection: (pe) => " 1. " + pe.replace(/\n$/, "").replace(/\n/g, (S) => `
 ${++ie}. `) + `
`
          });
        } else
          E("", "", "", {
            filterValue: (ie, pe) => {
              if (ae >= 0) {
                let S = V.replace(/^ - /, "");
                ee = O + S, pe.pos -= V.length - S.length;
              }
              return ee + Y;
            },
            filterSelection: (ie) => ie.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
          });
      } else
        E(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function W() {
      if (F()) {
        let { sel: g, selPos: L, beforeSel: ee, afterSel: Y, prevCRPos: ae, beforeCR: O, afterCR: V } = oe();
        g.indexOf(`
`) === -1 ? E(`
 - `, `
`) : !g.startsWith(" - ") ? E("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ie) => " - " + ie.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
        }) : E("", "", "", {
          filterValue: (ie, pe) => {
            if (ae >= 0) {
              let S = V.replace(/^ - /, "");
              ee = O + S, pe.pos -= V.length - S.length;
            }
            return ee + Y;
          },
          filterSelection: (ie) => ie.replace(/^ - /g, "").replace(/\n - /g, `
`)
        });
      } else
        E(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function Q() {
      const g = R(), L = g.indexOf(`
`) === -1;
      g ? L ? E(`
## `, `
`, "") : E("## ", "", "") : E(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
    }
    function A() {
      let { sel: g, selPos: L, beforeSel: ee, afterSel: Y, prevCRPos: ae, beforeCR: O, afterCR: V } = oe();
      !g.startsWith("//") && !V.startsWith("//") ? g ? E("", "", "//", {
        selectionAtEnd: !0,
        filterSelection: (de) => "//" + de.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
      }) : N({
        value: O + "//" + V + Y,
        selectionStart: L + 2
      }) : E("", "", "", {
        filterValue: (de, ie) => {
          if (ae >= 0) {
            let pe = V.replace(/^\/\//, "");
            ee = O + pe, ie.pos -= V.length - pe.length;
          }
          return ee + Y;
        },
        filterSelection: (de) => de.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
      });
    }
    const se = () => E(`/*
`, `*/
`, "");
    function h() {
      if (i.length === 0)
        return !1;
      const g = b.value, L = i.pop();
      return u.push({ value: g.value, selectionStart: g.selectionStart, selectionEnd: g.selectionEnd }), N(L), !0;
    }
    function z() {
      if (u.length === 0)
        return !1;
      const g = b.value, L = u.pop();
      return i.push({ value: g.value, selectionStart: g.selectionStart, selectionEnd: g.selectionEnd }), N(L), !0;
    }
    const H = () => null;
    return at(() => {
      i = [], u = [];
      const g = b.value;
      g.onkeydown = (L) => {
        if (L.key === "Escape" || L.keyCode === 27) {
          a("close");
          return;
        }
        const ee = String.fromCharCode(L.keyCode).toLowerCase();
        ee === "	" ? (!L.shiftKey ? E("", "", "    ", {
          selectionAtEnd: !0,
          filterSelection: (ae) => "    " + ae.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
        }) : E("", "", "", {
          filterValue: (ae, O) => {
            let { selPos: V, beforeSel: ce, afterSel: de, prevCRPos: ie, beforeCR: pe, afterCR: S } = oe();
            if (ie >= 0) {
              let ve = S.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              ce = pe + ve, O.pos -= S.length - ve.length;
            }
            return ce + de;
          },
          filterSelection: (ae) => ae.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), L.preventDefault()) : L.ctrlKey ? ee === "z" ? L.shiftKey ? z() && L.preventDefault() : h() && L.preventDefault() : ee === "b" && !L.shiftKey ? (M(), L.preventDefault()) : ee === "h" && !L.shiftKey ? (Q(), L.preventDefault()) : ee === "i" && !L.shiftKey ? (te(), L.preventDefault()) : ee === "q" && !L.shiftKey ? (q(), L.preventDefault()) : ee === "k" ? L.shiftKey ? (le(), L.preventDefault()) : (j(), L.preventDefault()) : ee === "," || L.key === "<" || L.key === ">" || L.keyCode === 188 ? (T(L), L.preventDefault()) : ee === "/" || L.key === "/" ? (A(), L.preventDefault()) : (ee === "?" || L.key === "?") && L.shiftKey && (se(), L.preventDefault()) : L.altKey && (L.key === "1" || L.key === "0" ? (Z(), L.preventDefault()) : L.key === "-" ? (W(), L.preventDefault()) : L.key === "s" && (w(), L.preventDefault()));
      };
    }), (g, L) => {
      var ee;
      return o(), r("div", null, [
        U(g.$slots, "header", Ae({
          inputElement: b.value,
          id: g.id,
          modelValue: g.modelValue,
          status: g.status
        }, g.$attrs)),
        f.value ? (o(), r("label", {
          key: 0,
          for: g.id,
          class: y(`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${g.labelClass ?? ""}`)
        }, I(f.value), 11, n1)) : x("", !0),
        g.disabled ? x("", !0) : (o(), r("div", o1, [
          l("div", a1, [
            k("bold") ? (o(), r("svg", {
              key: 0,
              class: y(nt),
              onClick: M,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, u1)) : x("", !0),
            k("italics") ? (o(), r("svg", {
              key: 1,
              class: y(nt),
              onClick: te,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, f1)) : x("", !0),
            k("link") ? (o(), r("svg", {
              key: 2,
              class: y(nt),
              onClick: j,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, m1)) : x("", !0),
            k("blockquote") ? (o(), r("svg", {
              key: 3,
              class: y(nt),
              onClick: q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, y1)) : x("", !0),
            k("image") ? (o(), r("svg", {
              key: 4,
              class: y(nt),
              onClick: le,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, k1)) : x("", !0),
            k("code") ? (o(), r("svg", {
              key: 5,
              class: y(nt),
              onClick: T,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, C1)) : x("", !0),
            k("heading") ? (o(), r("svg", {
              key: 6,
              class: y(nt),
              onClick: Q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, V1)) : x("", !0),
            k("orderedList") ? (o(), r("svg", {
              key: 7,
              class: y(nt),
              icon: "",
              onClick: Z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, A1)) : x("", !0),
            k("unorderedList") ? (o(), r("svg", {
              key: 8,
              class: y(nt),
              onClick: W,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, I1)) : x("", !0),
            k("strikethrough") ? (o(), r("svg", {
              key: 9,
              class: y(nt),
              onClick: w,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, O1)) : x("", !0),
            k("undo") ? (o(), r("svg", {
              key: 10,
              class: y(nt),
              onClick: h,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, H1)) : x("", !0),
            k("redo") ? (o(), r("svg", {
              key: 11,
              class: y(nt),
              onClick: z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, z1)) : x("", !0),
            U(g.$slots, "toolbarbuttons", {
              instance: (ee = Be()) == null ? void 0 : ee.exposed
            })
          ]),
          k("help") && g.helpUrl ? (o(), r("div", N1, [
            l("a", {
              title: "formatting help",
              target: "_blank",
              href: g.helpUrl,
              tabindex: "-1"
            }, [
              (o(), r("svg", {
                class: y(nt),
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, Q1))
            ], 8, U1)
          ])) : x("", !0)
        ])),
        l("div", K1, [
          l("textarea", {
            ref_key: "txt",
            ref: b,
            name: g.id,
            id: g.id,
            class: y(p.value),
            label: g.label,
            value: g.modelValue,
            rows: g.rows || 6,
            disabled: g.disabled,
            onInput: L[0] || (L[0] = (Y) => {
              var ae;
              return _(((ae = Y.target) == null ? void 0 : ae.value) || "");
            }),
            onKeydown: un(H, ["tab"])
          }, null, 42, Z1)
        ]),
        c.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${g.id}-error`
        }, I(c.value), 9, W1)) : g.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${g.id}-description`
        }, I(g.help), 9, G1)) : x("", !0),
        U(g.$slots, "footer", Ae({
          inputElement: b.value,
          id: g.id,
          modelValue: g.modelValue,
          status: g.status
        }, g.$attrs))
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
  class: /* @__PURE__ */ y(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
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
    const { transition: s } = _n(), n = D(!0), a = D(""), i = {
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
      s(i, a, p), s(d, u, p), s(f, c, p), setTimeout(() => n.value = p, 300);
    }
    function $() {
      m(!0);
    }
    function k() {
      m(!1);
    }
    return t({ show: $, hide: k, toggle: m }), (p, b) => (o(), r("div", null, [
      n.value ? (o(), r("div", X1, [
        l("div", {
          class: y(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", Y1, [
          l("div", {
            class: y(["relative mr-16 flex w-full max-w-xs flex-1", u.value])
          }, [
            l("div", {
              class: y(["absolute left-full top-0 flex w-16 justify-center pt-5", c.value])
            }, [
              l("button", {
                type: "button",
                onClick: k,
                class: "-m-2.5 p-2.5"
              }, sh)
            ], 2),
            l("div", lh, [
              U(p.$slots, "default")
            ])
          ], 2)
        ])
      ])) : x("", !0),
      l("div", nh, [
        l("div", oh, [
          U(p.$slots, "default")
        ])
      ]),
      l("div", ah, [
        l("button", {
          type: "button",
          onClick: $,
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
  Breadcrumbs: Tr,
  Breadcrumb: Or,
  NavList: Hr,
  NavListItem: Gr,
  AutoQueryGrid: wd,
  SettingsIcons: Dd,
  FilterViews: Hl,
  FilterColumn: Bl,
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
  LookupInput: B0,
  AutoFormFields: H0,
  AutoForm: uf,
  AutoCreateForm: Af,
  AutoEditForm: Jf,
  AutoViewForm: gv,
  ConfirmDelete: bv,
  FormLoading: xv,
  DataGrid: Av,
  CellFormat: Tv,
  PreviewFormat: Pv,
  HtmlFormat: zv,
  MarkupFormat: qv,
  MarkupModel: ep,
  CloseButton: op,
  SlideOver: wp,
  ModalDialog: Sp,
  ModalLookup: Cm,
  Tabs: Im,
  DarkModeToggle: Bm,
  SignIn: l1,
  MarkdownInput: J1,
  SidebarLayout: dh
}, el = ch, gh = {
  install(e) {
    Object.keys(el).forEach((s) => {
      e.component(s, el[s]);
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
    return e ? t ? X.components[e] = t : X.components[e] || el[e] || null : null;
  }
};
export {
  hh as css,
  gh as default,
  Pl as useAuth,
  ys as useClient,
  Nt as useConfig,
  La as useFiles,
  mh as useFormatters,
  dt as useMetadata,
  _n as useUtils
};
