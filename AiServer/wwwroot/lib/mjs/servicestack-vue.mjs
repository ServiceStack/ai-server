var go = Object.defineProperty;
var yo = (e, t, s) => t in e ? go(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (yo(e, typeof t != "symbol" ? t + "" : t, s), s);
import { defineComponent as ue, computed as v, openBlock as o, createElementBlock as r, normalizeClass as y, createElementVNode as l, createCommentVNode as x, renderSlot as U, ref as D, toDisplayString as I, inject as We, nextTick as Ot, isRef as un, unref as J, mergeProps as Ae, withModifiers as qe, h as Ft, resolveComponent as K, createBlock as ne, withCtx as _e, useAttrs as bo, createVNode as ge, createTextVNode as ke, watchEffect as Ss, normalizeStyle as vl, Fragment as Se, renderList as Ie, withDirectives as Pt, vModelCheckbox as pl, withKeys as dn, createStaticVNode as Ds, vModelSelect as wo, useSlots as js, getCurrentInstance as Be, onMounted as at, createSlots as ml, normalizeProps as Yt, guardReactiveProps as As, vModelDynamic as ko, onUnmounted as Et, watch as Lt, vModelText as _o, resolveDynamicComponent as cn, provide as ms, resolveDirective as $o } from "vue";
import { errorResponseExcept as Co, toDate as kt, toTime as xo, omit as yt, enc as sl, appendQueryString as es, lastLeftPart as fn, setQueryString as Lo, nameOf as Vo, ApiResult as tt, lastRightPart as Bt, leftPart as Os, map as Ze, toDateTime as Mo, toCamelCase as So, mapGet as we, chop as Ao, fromXsdDuration as vn, isDate as Ps, timeFmt12 as Fo, dateFmt as To, apiValue as Io, indexOfAny as Do, createBus as jo, toKebabCase as Yl, sanitize as Oo, humanize as He, delaySet as pn, rightPart as xs, queryString as ll, combinePaths as Po, toPascalCase as vt, errorResponse as _t, trimEnd as Bo, $1 as Fs, ResponseStatus as Ys, ResponseError as en, HttpMethods as hl, omitEmpty as Ho, uniqueKeys as nl, humanify as mn, each as Ro } from "@servicestack/client";
const Eo = { class: "flex items-center" }, No = {
  key: 0,
  class: "flex-shrink-0 mr-3"
}, zo = {
  key: 0,
  class: "h-5 w-5 text-yellow-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Uo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
  "clip-rule": "evenodd"
}, null, -1), qo = [
  Uo
], Qo = {
  key: 1,
  class: "h-5 w-5 text-red-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ko = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
  "clip-rule": "evenodd"
}, null, -1), Zo = [
  Ko
], Wo = {
  key: 2,
  class: "h-5 w-5 text-blue-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Go = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
  "clip-rule": "evenodd"
}, null, -1), Jo = [
  Go
], Xo = {
  key: 3,
  class: "h-5 w-5 text-green-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Yo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  "clip-rule": "evenodd"
}, null, -1), ea = [
  Yo
], ta = /* @__PURE__ */ ue({
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
      l("div", Eo, [
        i.hideIcon ? x("", !0) : (o(), r("div", No, [
          i.type == "warn" ? (o(), r("svg", zo, qo)) : i.type == "error" ? (o(), r("svg", Qo, Zo)) : i.type == "info" ? (o(), r("svg", Wo, Jo)) : i.type == "success" ? (o(), r("svg", Xo, ea)) : x("", !0)
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
}), sa = {
  key: 0,
  class: "rounded-md bg-green-50 dark:bg-green-200 p-4",
  role: "alert"
}, la = { class: "flex" }, na = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
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
], -1), oa = { class: "ml-3" }, aa = { class: "text-sm font-medium text-green-800" }, ra = { key: 0 }, ia = { class: "ml-auto pl-3" }, ua = { class: "-mx-1.5 -my-1.5" }, da = /* @__PURE__ */ l("span", { class: "sr-only" }, "Dismiss", -1), ca = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
], -1), fa = [
  da,
  ca
], va = /* @__PURE__ */ ue({
  __name: "AlertSuccess",
  props: {
    message: {}
  },
  setup(e) {
    const t = D(!1);
    return (s, n) => t.value ? x("", !0) : (o(), r("div", sa, [
      l("div", la, [
        na,
        l("div", oa, [
          l("h3", aa, [
            s.message ? (o(), r("span", ra, I(s.message), 1)) : U(s.$slots, "default", { key: 1 })
          ])
        ]),
        l("div", ia, [
          l("div", ua, [
            l("button", {
              type: "button",
              class: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-200",
              onClick: n[0] || (n[0] = (a) => t.value = !0)
            }, fa)
          ])
        ])
      ])
    ]));
  }
}), pa = { class: "flex" }, ma = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
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
], -1), ha = { class: "ml-3" }, ga = { class: "text-sm text-red-700 dark:text-red-200" }, ya = /* @__PURE__ */ ue({
  __name: "ErrorSummary",
  props: {
    status: {},
    except: {},
    class: {}
  },
  setup(e) {
    const t = e;
    let s = We("ApiState", void 0);
    const n = v(() => t.status || s != null && s.error.value ? Co.call({ responseStatus: t.status ?? (s == null ? void 0 : s.error.value) }, t.except ?? []) : null);
    return (a, i) => n.value ? (o(), r("div", {
      key: 0,
      class: y(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", pa, [
        ma,
        l("div", ha, [
          l("p", ga, I(n.value), 1)
        ])
      ])
    ], 2)) : x("", !0);
  }
}), ba = ["id", "aria-describedby"], wa = /* @__PURE__ */ ue({
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
    ], 8, ba)) : x("", !0);
  }
});
function Bs(e) {
  if (e == null || typeof e == "object")
    return "";
  const t = kt(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 10) ?? "";
}
function hn(e) {
  if (e == null || typeof e == "object")
    return "";
  const t = kt(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 19) ?? "";
}
function gn(e) {
  return e == null ? "" : xo(e);
}
function yn(e, t) {
  if (X.config.inputValue)
    return X.config.inputValue(e, t);
  let s = e === "date" ? Bs(t) : e === "datetime-local" ? hn(t) : e === "time" ? gn(t) : t;
  const n = typeof s;
  return s = s == null ? "" : n == "boolean" || n == "number" ? `${s}` : s, s;
}
function bn(e, t) {
  e.value = null, Ot(() => e.value = t);
}
function Zt(e) {
  return Object.keys(e).forEach((t) => {
    const s = e[t];
    e[t] = un(s) ? J(s) : s;
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
function Nt(e) {
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
  return n && (s = yt(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + ol(s) + "/>" : `<${e}` + ol(s) + `>${t || ""}</${e}>`;
}
function ol(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${sl(e[s])}"`, "");
}
function Hs(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Jt(e) {
  return Dl(e);
}
let ka = ["string", "number", "boolean", "null", "undefined"];
function Ht(e) {
  return ka.indexOf(typeof e) >= 0 || e instanceof Date;
}
function Xt(e) {
  return !Ht(e);
}
class wn {
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
function gl(e, t) {
  if (typeof history < "u") {
    const s = t ? es(fn(location.href, "?"), e) : Lo(location.href, e);
    history.pushState({}, "", s);
  }
}
function Rs(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, i) => (a[i] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function al(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function yl(e) {
  const t = X.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Es(e, t) {
  return es(`swr.${Vo(e)}`, t ? Object.assign({}, e, t) : e);
}
function _a(e) {
  if (e.request) {
    const t = Es(e.request, e.args);
    X.config.storage.removeItem(t);
  }
}
async function kn(e, t, s, n, a) {
  const i = Es(t, n);
  s(new tt({ response: yl(i) }));
  const u = await e.api(t, n, a);
  if (u.succeeded && u.response) {
    u.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const d = JSON.stringify(u.response);
    X.config.storage.setItem(i, d), s(u);
  }
  return u;
}
function _n(e, t) {
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
function $a(e) {
  return new Promise((t) => setTimeout(t, e));
}
function $n() {
  return {
    LocalStore: wn,
    dateInputFormat: Bs,
    dateTimeInputFormat: hn,
    timeInputFormat: gn,
    textInputValue: yn,
    setRef: bn,
    unRefs: Zt,
    transition: xt,
    focusNextElement: Ls,
    getTypeName: Nt,
    htmlTag: ht,
    htmlAttrs: ol,
    linkAttrs: Hs,
    toAppUrl: Jt,
    isPrimitive: Ht,
    isComplexType: Xt,
    pushState: gl,
    scopedExpr: Rs,
    copyText: al,
    fromCache: yl,
    swrCacheKey: Es,
    swrClear: _a,
    swrApi: kn,
    asStrings: Tt,
    asOptions: jt,
    createDebounce: _n,
    delay: $a
  };
}
const Cn = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), xn = {
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
}, tn = Object.keys(xn), wt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, Vs = {
  img: wt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: wt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: wt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: wt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: wt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: wt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: wt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: wt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: wt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, Ca = /[\r\n%#()<>?[\\\]^`{|}]/g, sn = 1024, xa = ["Bytes", "KB", "MB", "GB", "TB"], La = (() => {
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
let rl = [];
function Ln(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(Ca, encodeURIComponent);
}
function bl(e) {
  return "data:image/svg+xml;utf8," + Ln(e);
}
function Vn(e) {
  let t = URL.createObjectURL(e);
  return rl.push(t), t;
}
function Mn() {
  rl.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), rl = [];
}
function wl(e) {
  if (!e)
    return null;
  let t = Os(e, "?");
  return Bt(t, "/");
}
function hs(e) {
  let t = wl(e);
  return t == null || t.indexOf(".") === -1 ? null : Bt(t, ".").toLowerCase();
}
function kl(e) {
  let t = hs(e.name);
  return t && Cn.indexOf(t) >= 0 ? Vn(e) : It(e.name);
}
function _l(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = hs(e);
  return t && Cn.indexOf(t) >= 0 || !1;
}
function It(e) {
  if (!e)
    return null;
  let t = hs(e);
  return t == null || _l(e) ? e : us(t) || bl(Vs.doc);
}
function us(e) {
  let t = Sn(e);
  return t && bl(t) || null;
}
function Sn(e) {
  if (Vs[e])
    return Vs[e];
  for (let t = 0; t < tn.length; t++) {
    let s = tn[t];
    if (xn[s].indexOf(e) >= 0)
      return Vs[s];
  }
  return null;
}
function $l(e, t = 2) {
  if (e === 0)
    return "0 Bytes";
  const s = t < 0 ? 0 : t, n = Math.floor(Math.log(e) / Math.log(sn));
  return parseFloat((e / Math.pow(sn, n)).toFixed(s)) + " " + xa[n];
}
function Va(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: kl(t) }));
}
function Ns(e, t) {
  e.onerror = null, e.src = Cl(e.src, t) || "";
}
function Cl(e, t) {
  return us(Bt(e, ".").toLowerCase()) || (t ? us(t) || t : null) || us("doc");
}
function il(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Bt(e, ".").toLowerCase();
  return La[t] || "application/" + t;
}
function Ma() {
  return {
    extSvg: Sn,
    extSrc: us,
    getExt: hs,
    encodeSvg: Ln,
    canPreview: _l,
    getFileName: wl,
    getMimeType: il,
    formatBytes: $l,
    filePathUri: It,
    svgToDataUri: bl,
    fileImageUri: kl,
    objectUrl: Vn,
    flush: Mn,
    inputFiles: Va,
    iconOnError: Ns,
    iconFallbackSrc: Cl
  };
}
class Sa {
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
const ts = "/metadata/app.json", Aa = {
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
}, Fa = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, ul = {
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
[...Object.keys(ul), ...Object.values(ul)];
const Ta = {
  String: "string",
  Boolean: "bool",
  ...ul
};
function _s(e) {
  return Ta[e] || e;
}
function An(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? _s(t[0]) + "?" : e.endsWith("[]") ? `List<${_s(e.substring(0, e.length - 2))}>` : t.length === 0 ? _s(e) : Os(_s(e), "`") + "<" + t.join(",") + ">") : "";
}
function Ia(e) {
  return e && An(e.name, e.genericArgs);
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
function Da(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || zs(xl(e));
}
function Fn(e) {
  return e.endsWith("?") ? Ao(e, 1) : e;
}
function zs(e) {
  return Aa[Fn(e)];
}
function ja(e) {
  return e && Fa[e] || "String";
}
function xl(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function dl(e) {
  return e && zs(e) == "number" || !1;
}
function Tn(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function Oa(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function In(e) {
  if (!(e != null && e.type))
    return !1;
  const t = xl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : zs(e.type) == null;
}
function Dn(e) {
  var s, n, a, i;
  if (!(e != null && e.type))
    return !1;
  const t = xl(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((i = e.input) == null ? void 0 : i.type) == "combobox" ? !0 : zs(e.type) != null;
}
function fs(e, t) {
  let s = typeof e == "string" ? Us(e) : e;
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
function Pa(e, t, s = {}) {
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
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = Bs(kt(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function Ba(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var m;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const i = a.id.toLowerCase(), u = t && t.find(($) => $.name.toLowerCase() == i);
    let d = u == null ? void 0 : u.type, c = (m = u == null ? void 0 : u.genericArgs) == null ? void 0 : m[0], f = a.type === "checkbox" ? a.checked : a.value;
    dl(d) ? f = Number(f) : d === "List`1" && typeof f == "string" && (f = f.split(",").map(($) => dl(c) ? Number($) : $)), s[a.id] = f;
  }), s;
}
function Ll(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function Ha(e) {
  if (!Vl() && (e != null && e.assert) && !X.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return X.metadata.value;
}
function vs(e) {
  return e && Ll(e) ? (e.date = Mo(/* @__PURE__ */ new Date()), X.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(ts, JSON.stringify(e)), !0) : !1;
}
function Ra() {
  X.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(ts);
}
function Vl() {
  if (X.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (Ll(e))
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
async function ln(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    vs(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  Ll(X.metadata.value) || console.warn("AppMetadata is not available");
}
async function Ea(e) {
  var i;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = Vl() && t !== 0;
  if (a && t) {
    let u = kt((i = X.metadata.value) == null ? void 0 : i.date);
    (!u || (/* @__PURE__ */ new Date()).getTime() - u.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await ln(s || ts, n), X.metadata.value != null))
      return;
    const u = We("client");
    if (u != null) {
      const d = await u.api(new Sa());
      d.succeeded && vs(d.response);
    }
    if (X.metadata.value != null)
      return;
    await ln(ts);
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
  let a = Us(e);
  if (a)
    return a.request;
  let i = s.operations.find((d) => d.response && d.response.name.toLowerCase() === e.toLowerCase() && (!t || d.response.namespace == t));
  return i ? i.response : null;
}
function Us(e) {
  var n;
  if (X.config.apiResolver) {
    const a = X.config.apiResolver(e);
    if (a)
      return a;
  }
  let t = (n = X.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function Na({ dataModel: e }) {
  var n;
  const t = (n = X.metadata.value) == null ? void 0 : n.api;
  if (!t)
    return [];
  let s = t.operations;
  if (e) {
    const a = typeof e == "string" ? pt(e) : e;
    s = s.filter((i) => jn(i.dataModel, a));
  }
  return s;
}
function Ml(e) {
  return e ? pt(e.name, e.namespace) : null;
}
function jn(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function za(e, t) {
  let s = pt(e);
  return s && s.properties && s.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function On(e) {
  return Pn(pt(e));
}
function Pn(e) {
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
      return Pn(i);
  }
  return null;
}
function Sl(e) {
  if (!e)
    return;
  const t = [];
  return Object.keys(e).forEach((s) => t.push({ key: s, value: e[s] })), t;
}
function Ua(e, t) {
  const n = ((a, i) => Object.assign({
    id: a,
    name: a,
    type: i
  }, t))(e.name, (t == null ? void 0 : t.type) || Da(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = Sl(Bn(e))), n;
}
function qa(e) {
  let t = [];
  if (e) {
    const s = ot(e), n = Us(e.name), a = Ml(n == null ? void 0 : n.dataModel);
    s.forEach((i) => {
      var d, c, f;
      if (!Dn(i))
        return;
      const u = Ua(i, i.input);
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
          }, $ = Rs(u.options, m);
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
function Al(e, t) {
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
function Hn(e) {
  return (t) => typeof t == "number" ? Al(t, { type: e }) : t;
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
    e.properties && n(e.properties), e = e.inherits ? Ml(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function $s(e, t) {
  var s;
  return ((s = e.request.implements) == null ? void 0 : s.some((n) => n.name === t)) || !1;
}
function ls(e) {
  return e ? Rn(e, ot(e)) : null;
}
function Rn(e, t) {
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
function Qa(e, t) {
  return Ze(ls(e), (s) => we(t, s.name));
}
function En(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : Ka(t, s.value);
}
function Ka(e, t) {
  return e ? (e = Fn(e), dl(e) || e === "Boolean" ? t : Oa(e) ? `[${t}]` : `'${t}'`) : t;
}
function Ct(e, t) {
  return { name: e, value: t };
}
const Za = [
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
    return ((i = (a = (n = X.metadata.value) == null ? void 0 : n.plugins) == null ? void 0 : a.autoQuery) == null ? void 0 : i.viewerConventions) || Za;
  });
  return Vl(), {
    loadMetadata: Ea,
    getMetadata: Ha,
    setMetadata: vs,
    clearMetadata: Ra,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: pt,
    typeOfRef: Ml,
    typeEquals: jn,
    apiOf: Us,
    findApis: Na,
    typeName: Ia,
    typeName2: An,
    property: za,
    enumOptions: On,
    propertyOptions: Bn,
    createFormLayout: qa,
    typeProperties: ot,
    supportsProp: Dn,
    Crud: Ke,
    Apis: Rt,
    getPrimaryKey: ls,
    getPrimaryKeyByProps: Rn,
    getId: Qa,
    createDto: fs,
    makeDto: Pa,
    toFormValues: ds,
    formValues: Ba,
    isComplexProp: In,
    asKvps: Sl,
    expandEnumFlags: Al,
    enumFlagsConverter: Hn
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
      Object.keys(f).forEach((T) => {
        const R = f[T];
        we(R, i) && m.push(T);
      });
      const $ = d.filter((T) => !m.includes(T));
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
          const oe = `${we(R, a)}`, z = we(R, i);
          i = i.toLowerCase();
          const E = f[oe] ?? (f[oe] = {});
          E[i] = `${z}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(it, "Lookup", {});
let Wt = it, cl = () => (/* @__PURE__ */ new Date()).getTime(), Wa = ["/", "T", ":", "-"], gt = {
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
}, Ga = new Intl.RelativeTimeFormat(gt.locale, {}), nn = 24 * 60 * 60 * 1e3 * 365, el = {
  year: nn,
  month: nn / 12,
  day: 24 * 60 * 60 * 1e3,
  hour: 60 * 60 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, Dt = {
  currency: zn,
  bytes: Un,
  link: qn,
  linkTel: Qn,
  linkMailTo: Kn,
  icon: Zn,
  iconRounded: Wn,
  attachment: Gn,
  hidden: Jn,
  time: Xn,
  relativeTime: Tl,
  relativeTimeFromMs: qs,
  enumFlags: eo,
  formatDate: ns,
  formatNumber: Fl
};
"iconOnError" in globalThis || (globalThis.iconOnError = Ns);
class Xe {
}
Le(Xe, "currency", { method: "currency" }), Le(Xe, "bytes", { method: "bytes" }), Le(Xe, "link", { method: "link" }), Le(Xe, "linkTel", { method: "linkTel" }), Le(Xe, "linkMailTo", { method: "linkMailTo" }), Le(Xe, "icon", { method: "icon" }), Le(Xe, "iconRounded", { method: "iconRounded" }), Le(Xe, "attachment", { method: "attachment" }), Le(Xe, "time", { method: "time" }), Le(Xe, "relativeTime", { method: "relativeTime" }), Le(Xe, "relativeTimeFromMs", { method: "relativeTimeFromMs" }), Le(Xe, "date", { method: "formatDate" }), Le(Xe, "number", { method: "formatNumber" }), Le(Xe, "hidden", { method: "hidden" }), Le(Xe, "enumFlags", { method: "enumFlags" });
function Ja(e) {
  gt = Object.assign({}, gt, e);
}
function Xa(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (Dt[t] = e[t]);
  });
}
function Nn() {
  return Dt;
}
function gs(e, t) {
  return t ? ht("span", e, t) : e;
}
function zn(e, t) {
  const s = yt(t, ["currency"]);
  return gs(new Intl.NumberFormat(void 0, { style: "currency", currency: (t == null ? void 0 : t.currency) || "USD" }).format(e), s);
}
function Un(e, t) {
  return gs($l(e), t);
}
function qn(e, t) {
  return ht("a", e, Hs({ ...t, href: e }));
}
function Qn(e, t) {
  return ht("a", e, Hs({ ...t, href: `tel:${e}` }));
}
function Kn(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = yt(t, ["subject", "body"]), i = {};
  return s && (i.subject = s), n && (i.body = n), ht("a", e, Hs({ ...a, href: `mailto:${es(e, i)}` }));
}
function Zn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Wn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Gn(e, t) {
  let s = wl(e), a = hs(s) == null || _l(e) ? Jt(e) : Cl(e);
  const i = Jt(a);
  let u = t && (t["icon-class"] || t.iconClass), d = ht("img", void 0, Object.assign({ class: "w-6 h-6", src: i, onerror: "iconOnError(this,'att')" }, u ? { class: u } : null)), c = `<span class="pl-1">${s}</span>`;
  return ht("a", d + c, Object.assign({ class: "flex", href: Jt(e), title: e }, t ? yt(t, ["icon-class", "iconClass"]) : null));
}
function Jn(e) {
  return "";
}
function Xn(e, t) {
  let s = typeof e == "string" ? new Date(vn(e) * 1e3) : Ps(e) ? kt(e) : null;
  return gs(s ? Fo(s) : e, t);
}
function ns(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? kt(e) : e;
  if (!Ps(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = gt.date ? Qs(gt.date) : null;
  return gs(typeof n == "function" ? n(s) : To(s), t);
}
function Fl(e, t) {
  if (typeof e != "number")
    return e;
  let s = gt.number ? Qs(gt.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), gs(n, t);
}
function Ms(e) {
  const t = Math.floor(e / 1e3), s = Math.floor(t / 60), n = Math.floor(s / 60), a = Math.floor(n / 24);
  return a > 0 ? `${a}d ${Ms(e - a * 24 * 60 * 6e4)}` : n > 0 ? `${n}h ${Ms(e - n * 60 * 6e4)}` : s > 0 ? `${s}m ${Ms(e - s * 6e4)}` : t > 0 ? `${t}s` : `${e}ms`;
}
function Ya(e) {
  return e >= 1e9 ? (e / 1e9).toFixed(1) + "b" : e >= 1e6 ? (e / 1e6).toFixed(1) + "m" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toLocaleString();
}
function Yn(e, t, s) {
  let n = Io(e), a = t ? Qs(t) : null;
  if (typeof a == "function") {
    let u = s;
    if (t != null && t.options)
      try {
        u = Rs(t.options, s);
      } catch (d) {
        console.error(`Could not evaluate '${t.options}'`, d, ", with scope:", s);
      }
    return a(e, u);
  }
  let i = n != null ? Ps(n) ? ns(n, s) : typeof n == "number" ? Fl(n, s) : n : null;
  return i ?? "";
}
function ps(e, t, s) {
  return Ht(e) ? Yn(e, t, s) : nr(e, t, s);
}
function er(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (Ps(e))
    return e.getTime() - cl();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return vn(e) * 1e3 * -1;
    if (Do(e, Wa) >= 0)
      return kt(e).getTime() - cl();
  }
  return NaN;
}
function qs(e, t) {
  for (let s in el)
    if (Math.abs(e) > el[s] || s === "second")
      return (t || Ga).format(Math.round(e / el[s]), s);
}
function Tl(e, t) {
  let s = er(e);
  return isNaN(s) ? "" : qs(s, t);
}
function tr(e, t) {
  return qs(e.getTime() - (t ? t.getTime() : cl()));
}
function eo(e, t) {
  return Al(e, t).join(", ");
}
function Qs(e) {
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
function to(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function so(e) {
  return e.substring(0, 6) === "/Date(" ? ns(kt(e)) : e;
}
function sr(e) {
  return Il(ss(e)).replace(/"/g, "");
}
function lo(e) {
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
function Il(e, t = 4) {
  return e = lo(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function lr(e) {
  return e = lo(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = ss(e), Il(e));
}
function ss(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return so(e);
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
function nr(e, t, s) {
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
    i.push(`<b class="font-medium">${d}</b>: ${sl(to(so(c), gt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && i.push("..."), ht("span", "{ " + i.join(", ") + " }", Object.assign({ title: sl(sr(e)) }, s));
}
function yh() {
  return {
    Formats: Xe,
    setDefaultFormats: Ja,
    getFormatters: Nn,
    setFormatters: Xa,
    formatValue: ps,
    formatter: Qs,
    dateInputFormat: Bs,
    currency: zn,
    bytes: Un,
    link: qn,
    linkTel: Qn,
    linkMailTo: Kn,
    icon: Zn,
    iconRounded: Wn,
    attachment: Gn,
    hidden: Jn,
    time: Xn,
    relativeTime: Tl,
    relativeTimeFromDate: tr,
    relativeTimeFromMs: qs,
    enumFlags: eo,
    formatDate: ns,
    formatNumber: Fl,
    humanifyMs: Ms,
    humanifyNumber: Ya,
    indentJson: Il,
    prettyJson: lr,
    scrub: ss,
    truncate: to,
    apiValueFmt: Yn,
    iconOnError: Ns
  };
}
const or = ["title"], ar = /* @__PURE__ */ ue({
  __name: "RouterLink",
  props: {
    to: {}
  },
  setup(e) {
    const t = e, { config: s } = zt(), n = () => s.value.navigate(t.to ?? "/");
    return (a, i) => (o(), r("a", Ae({
      onClick: qe(n, ["prevent"]),
      title: a.to,
      href: "javascript:void(0)"
    }, a.$attrs), [
      U(a.$slots, "default")
    ], 16, or));
  }
});
class rr {
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
    const n = Yl(t), a = Object.keys(ut.components).find((i) => Yl(i) === n);
    return a && ut.components[a] || null;
  }
};
Le(ut, "config", {
  redirectSignIn: "/signin",
  redirectSignOut: "/auth/logout",
  navigate: (t) => location.href = t,
  assetsPathResolver: (t) => t,
  fallbackPathResolver: (t) => t,
  storage: new wn(),
  tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
  scopeWhitelist: {
    enumFlagsConverter: Hn,
    ...Nn()
  }
}), Le(ut, "autoQueryGridDefaults", {
  deny: [],
  hide: [],
  toolbarButtonClass: void 0,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150
}), Le(ut, "events", jo()), Le(ut, "user", D(null)), Le(ut, "metadata", D(null)), Le(ut, "components", {
  RouterLink: ar
}), Le(ut, "interceptors", new rr());
let X = ut;
function ir(e) {
  X.config = Object.assign(X.config, e);
}
function ur(e) {
  X.autoQueryGridDefaults = Object.assign(X.autoQueryGridDefaults, e);
}
function Dl(e) {
  return e && X.config.assetsPathResolver ? X.config.assetsPathResolver(e) : e;
}
function dr(e) {
  return e && X.config.fallbackPathResolver ? X.config.fallbackPathResolver(e) : e;
}
function cr(e, t) {
  X.interceptors.register(e, t);
}
function zt() {
  const e = v(() => X.config), t = v(() => X.autoQueryGridDefaults), s = X.events;
  return {
    config: e,
    setConfig: ir,
    events: s,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: ur,
    assetsPathResolver: Dl,
    fallbackPathResolver: dr,
    registerInterceptor: cr
  };
}
const no = ue({
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
        let u = Os(n, ">").indexOf("class="), d = `${(s == null ? void 0 : s.cls) || ""} ${t.class || ""}`;
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
          src: Dl(e.src || (s == null ? void 0 : s.uri)),
          onError: (i) => Ns(i.target)
        });
    };
  }
}), fr = { class: "text-2xl font-semibold text-gray-900 dark:text-gray-300" }, vr = { class: "flex" }, pr = /* @__PURE__ */ l("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), mr = /* @__PURE__ */ l("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), hr = [
  pr,
  mr
], gr = /* @__PURE__ */ ue({
  __name: "Loading",
  props: {
    imageClass: { default: "w-6 h-6" }
  },
  setup(e) {
    return (t, s) => (o(), r("div", fr, [
      l("div", vr, [
        (o(), r("svg", {
          class: y(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
          role: "status",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, hr, 2)),
        l("span", null, [
          U(t.$slots, "default")
        ])
      ])
    ]));
  }
}), yr = ["href", "onClick"], br = ["type"], on = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black", wr = /* @__PURE__ */ ue({
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
            class: y(on),
            href: t.href,
            onClick: a
          }, [
            U(t.$slots, "default")
          ], 8, yr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
        key: 1,
        type: t.type,
        class: on
      }, t.$attrs), [
        U(t.$slots, "default")
      ], 16, br));
    };
  }
}), kr = ["href", "onClick"], _r = ["type"], $r = /* @__PURE__ */ ue({
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
          ], 10, kr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
        key: 1,
        type: a.type,
        class: n.value
      }, a.$attrs), [
        U(a.$slots, "default")
      ], 16, _r));
    };
  }
}), Cr = ["type", "href", "onClick"], xr = ["type"], an = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black", Lr = /* @__PURE__ */ ue({
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
            class: y(an),
            href: t.href,
            onClick: a
          }, [
            U(t.$slots, "default")
          ], 8, Cr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Ae({
        key: 1,
        type: t.type ?? "button",
        class: an
      }, t.$attrs), [
        U(t.$slots, "default")
      ], 16, xr));
    };
  }
});
function et(e, t) {
  return Array.isArray(e) ? e.indexOf(t) >= 0 : e == t || e.includes(t);
}
const Is = {
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
}, fl = {
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
    return et(e, "whiteBackground") ? "" : et(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black/5" : me.grid4Class;
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
  grid4Class: "overflow-hidden shadow ring-1 ring-black/5 md:rounded-lg",
  tableClass: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
  theadClass: "bg-gray-50 dark:bg-gray-900",
  tableCellClass: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
  theadRowClass: "select-none",
  theadCellClass: "px-6 py-4 text-left text-sm font-medium tracking-wider whitespace-nowrap",
  toolbarButtonClass: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
}, Vr = {
  colspans: "col-span-3 sm:col-span-3"
}, bh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: Is,
  card: is,
  dummy: Vr,
  form: Ee,
  grid: me,
  input: ft,
  modal: fl,
  slideOver: Gt
}, Symbol.toStringTag, { value: "Module" })), Mr = /* @__PURE__ */ ue({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = bo(), s = e, n = v(() => (Is[s.color] || Is.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, i) => (o(), r("a", {
      class: y(n.value)
    }, [
      U(a.$slots, "default")
    ], 2));
  }
}), Sr = {
  class: "flex",
  "aria-label": "Breadcrumb"
}, Ar = {
  role: "list",
  class: "flex items-center space-x-4"
}, Fr = ["href", "title"], Tr = /* @__PURE__ */ l("svg", {
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
], -1), Ir = { class: "sr-only" }, Dr = /* @__PURE__ */ ue({
  __name: "Breadcrumbs",
  props: {
    homeHref: { default: "/" },
    homeLabel: { default: "Home" }
  },
  setup(e) {
    return (t, s) => (o(), r("nav", Sr, [
      l("ol", Ar, [
        l("li", null, [
          l("div", null, [
            l("a", {
              href: t.homeHref,
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
              title: t.homeLabel
            }, [
              Tr,
              l("span", Ir, I(t.homeLabel), 1)
            ], 8, Fr)
          ])
        ]),
        U(t.$slots, "default")
      ])
    ]));
  }
}), jr = { class: "flex items-center" }, Or = /* @__PURE__ */ l("svg", {
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
], -1), Pr = ["href", "title"], Br = ["title"], Hr = /* @__PURE__ */ ue({
  __name: "Breadcrumb",
  props: {
    href: {},
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("li", null, [
      l("div", jr, [
        Or,
        t.href ? (o(), r("a", {
          key: 0,
          href: t.href,
          class: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          title: t.title
        }, [
          U(t.$slots, "default")
        ], 8, Pr)) : (o(), r("span", {
          key: 1,
          class: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300",
          title: t.title
        }, [
          U(t.$slots, "default")
        ], 8, Br))
      ])
    ]));
  }
}), Rr = {
  key: 0,
  class: "text-base font-semibold text-gray-500 dark:text-gray-400"
}, Er = {
  role: "list",
  class: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800"
}, Nr = /* @__PURE__ */ ue({
  __name: "NavList",
  props: {
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("div", null, [
      t.title ? (o(), r("h2", Rr, I(t.title), 1)) : x("", !0),
      l("ul", Er, [
        U(t.$slots, "default")
      ])
    ]));
  }
}), zr = { class: "relative flex items-start space-x-4 py-6" }, Ur = { class: "flex-shrink-0" }, qr = { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900" }, Qr = { class: "min-w-0 flex-1" }, Kr = { class: "text-base font-medium text-gray-900 dark:text-gray-100" }, Zr = { class: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2" }, Wr = ["href"], Gr = /* @__PURE__ */ l("span", {
  class: "absolute inset-0",
  "aria-hidden": "true"
}, null, -1), Jr = { class: "text-base text-gray-500" }, Xr = /* @__PURE__ */ l("div", { class: "flex-shrink-0 self-center" }, [
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
], -1), Yr = /* @__PURE__ */ ue({
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
      return o(), r("li", zr, [
        l("div", Ur, [
          l("span", qr, [
            ge(n, {
              class: "w-6 h-6 text-indigo-700 dark:text-indigo-300",
              image: t.icon,
              src: t.iconSrc,
              svg: t.iconSvg,
              alt: t.iconAlt
            }, null, 8, ["image", "src", "svg", "alt"])
          ])
        ]),
        l("div", Qr, [
          l("h3", Kr, [
            l("span", Zr, [
              l("a", {
                href: t.href,
                class: "focus:outline-none"
              }, [
                Gr,
                ke(" " + I(t.title), 1)
              ], 8, Wr)
            ])
          ]),
          l("p", Jr, [
            U(t.$slots, "default")
          ])
        ]),
        Xr
      ]);
    };
  }
});
function oo(e) {
  return e && e.SessionId ? Oo(e) : e;
}
function ei(e) {
  X.user.value = oo(e), X.events.publish("signIn", e);
}
function ti() {
  X.user.value = null, X.events.publish("signOut", null);
}
const jl = (e) => (e == null ? void 0 : e.roles) || [], Ol = (e) => (e == null ? void 0 : e.permissions) || [];
function ao(e) {
  return jl(X.user.value).indexOf(e) >= 0;
}
function si(e) {
  return Ol(X.user.value).indexOf(e) >= 0;
}
function Pl() {
  return ao("Admin");
}
function cs(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = X.user.value;
  if (!t)
    return !1;
  if (Pl())
    return !0;
  let [s, n] = [jl(t), Ol(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => s.indexOf(c) >= 0) || u.length > 0 && !u.some((c) => s.indexOf(c) >= 0) || !i.every((c) => n.indexOf(c) >= 0) || d.length > 0 && !d.every((c) => n.indexOf(c) >= 0));
}
function li(e) {
  if (!e || !e.requiresAuth)
    return null;
  const t = X.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Pl())
    return null;
  let [s, n] = [jl(t), Ol(t)], [a, i, u, d] = [
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
  const e = v(() => X.user.value || null), t = v(() => X.user.value != null);
  return { signIn: ei, signOut: ti, user: e, toAuth: oo, isAuthenticated: t, hasRole: ao, hasPermission: si, isAdmin: Pl, canAccess: cs, invalidAccessMessage: li };
}
const ni = { key: 0 }, oi = { class: "md:p-4" }, ro = /* @__PURE__ */ ue({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Bl(), { config: s } = zt(), n = () => {
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
      return i.invalidAccess ? (o(), r("div", ni, [
        ge(d, {
          class: y(i.alertClass),
          innerHTML: i.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", oi, [
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
}), ai = { class: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80" }, ri = { class: "p-4" }, ii = /* @__PURE__ */ l("h3", { class: "text-base font-medium mb-3 dark:text-gray-100" }, "Sort", -1), ui = { class: "flex w-full justify-center" }, di = /* @__PURE__ */ l("svg", {
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
], -1), ci = /* @__PURE__ */ l("span", null, "ASC", -1), fi = [
  di,
  ci
], vi = /* @__PURE__ */ Ds('<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"></path><path fill-rule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"></path><path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"></path></g></svg><span>DESC</span>', 2), pi = [
  vi
], mi = /* @__PURE__ */ l("h3", { class: "text-base font-medium mt-4 mb-2" }, " Filter ", -1), hi = { key: 0 }, gi = ["id", "value"], yi = ["for"], bi = { key: 1 }, wi = { class: "mb-2" }, ki = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, _i = ["onClick"], $i = /* @__PURE__ */ l("svg", {
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
], -1), Ci = [
  $i
], xi = { class: "flex" }, Li = /* @__PURE__ */ l("svg", {
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
], -1), Vi = [
  Li
], Mi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Hl = /* @__PURE__ */ ue({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = D(), i = D(""), u = D(""), d = D([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => pt(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), m = v(() => s.column.meta.isEnum == !0 ? Sl(On(f.value.name)) : []), $ = v(() => {
      var w;
      return ((w = b(s.column.type)) == null ? void 0 : w.map((j) => ({ key: j.value, value: j.name }))) || [];
    }), k = D({ filters: [] }), p = v(() => k.value.filters);
    Ss(() => k.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), Ss(() => {
      var j, q, le, F, Z;
      let w = ((le = (q = (j = s.column.settings.filters) == null ? void 0 : j[0]) == null ? void 0 : q.value) == null ? void 0 : le.split(",")) || [];
      if (w.length > 0 && ((F = f.value) != null && F.isEnumInt)) {
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
    function T() {
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
      return En(_(s.column.type, w.key), s.column.type, w);
    }
    function z() {
      n("done");
    }
    function E() {
      var w;
      i.value = "%", (w = a.value) == null || w.focus();
    }
    function S() {
      var w;
      if (u.value && T(), c.value) {
        let j = Object.values(d.value).filter((q) => q);
        k.value.filters = j.length > 0 ? (w = f.value) != null && w.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: j.map((q) => parseInt(q)).reduce((q, le) => q + le, 0).toString() }] : [{ key: "%In", name: "In", value: j.join(",") }] : [];
      }
      n("save", k.value), n("done");
    }
    function te(w) {
      k.value.sort = w === k.value.sort ? void 0 : w, Ot(S);
    }
    return (w, j) => {
      var W;
      const q = K("SelectInput"), le = K("TextInput"), F = K("PrimaryButton"), Z = K("SecondaryButton");
      return o(), r("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: z,
        onVnodeMounted: E
      }, [
        l("div", {
          class: "absolute",
          style: vl(`top:${w.topLeft.y}px;left:${w.topLeft.x}px`),
          onClick: j[5] || (j[5] = qe(() => {
          }, ["stop"]))
        }, [
          l("div", ai, [
            l("div", ri, [
              ii,
              l("div", ui, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: j[0] || (j[0] = (Q) => te("ASC")),
                  class: y(`${k.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, fi, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: j[1] || (j[1] = (Q) => te("DESC")),
                  class: y(`${k.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, pi, 2)
              ]),
              mi,
              c.value ? (o(), r("div", hi, [
                (o(!0), r(Se, null, Ie(m.value, (Q) => (o(), r("div", {
                  key: Q.key,
                  class: "flex items-center"
                }, [
                  Pt(l("input", {
                    type: "checkbox",
                    id: Q.key,
                    value: Q.key,
                    "onUpdate:modelValue": j[2] || (j[2] = (A) => d.value = A),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, gi), [
                    [pl, d.value]
                  ]),
                  l("label", {
                    for: Q.key,
                    class: "ml-3"
                  }, I(Q.value), 9, yi)
                ]))), 128))
              ])) : (o(), r("div", bi, [
                (o(!0), r(Se, null, Ie(p.value, (Q, A) => (o(), r("div", wi, [
                  l("span", ki, [
                    ke(I(w.column.name) + " " + I(Q.name) + " " + I(oe(Q)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (se) => R(A),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, Ci, 8, _i)
                  ])
                ]))), 256)),
                l("div", xi, [
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
                    onKeyup: dn(T, ["enter"]),
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue"])) : x("", !0),
                  l("div", { class: "pt-1" }, [
                    l("button", {
                      type: "button",
                      onClick: T,
                      class: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, Vi)
                  ])
                ])
              ]))
            ]),
            l("div", Mi, [
              ge(F, {
                onClick: S,
                color: "red",
                class: "ml-2"
              }, {
                default: _e(() => [
                  ke(" Save ")
                ]),
                _: 1
              }),
              ge(Z, { onClick: z }, {
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
}), Si = { class: "px-4 sm:px-6 lg:px-8 text-sm" }, Ai = { class: "flex flex-wrap" }, Fi = { class: "group pr-4 sm:pr-6 lg:pr-8" }, Ti = { class: "flex justify-between w-full font-medium" }, Ii = { class: "w-6 flex justify-end" }, Di = { class: "hidden group-hover:inline" }, ji = ["onClick", "title"], Oi = /* @__PURE__ */ l("svg", {
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
], -1), Pi = [
  Oi
], Bi = {
  key: 0,
  class: "pt-2"
}, Hi = { class: "ml-2" }, Ri = { key: 1 }, Ei = { class: "pt-2" }, Ni = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, zi = ["onClick"], Ui = /* @__PURE__ */ l("svg", {
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
], -1), qi = [
  Ui
], Qi = /* @__PURE__ */ l("span", null, "Clear All", -1), Ki = [
  Qi
], Rl = /* @__PURE__ */ ue({
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
      return En(d(k.type, p.value), k.type, p);
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
    return (k, p) => (o(), r("div", Si, [
      l("div", Ai, [
        (o(!0), r(Se, null, Ie(a.value, (b) => (o(), r("fieldset", Fi, [
          l("legend", Ti, [
            l("span", null, I(J(He)(b.name)), 1),
            l("span", Ii, [
              l("span", Di, [
                l("button", {
                  onClick: (_) => f(b),
                  title: `Clear all ${J(He)(b.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, Pi, 8, ji)
              ])
            ])
          ]),
          b.meta.isEnum ? (o(), r("div", Bi, [
            (o(!0), r(Se, null, Ie(i(b.settings.filters), (_) => (o(), r("div", {
              key: _,
              class: "flex items-center"
            }, [
              l("label", Hi, I(_), 1)
            ]))), 128))
          ])) : (o(), r("div", Ri, [
            (o(!0), r(Se, null, Ie(b.settings.filters, (_, T) => (o(), r("div", Ei, [
              l("span", Ni, [
                ke(I(b.name) + " " + I(_.name) + " " + I(c(b, _)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (R) => m(b, T),
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                }, qi, 8, zi)
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
        }, Ki)
      ])
    ]));
  }
}), Zi = { class: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Wi = { class: "" }, Gi = { class: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left" }, Ji = /* @__PURE__ */ l("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" }, "Query Preferences", -1), Xi = { class: "mt-4" }, Yi = ["for"], eu = ["id"], tu = ["value", "selected"], su = { class: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800" }, lu = ["id", "checked"], nu = ["for"], ou = { class: "mt-4" }, au = { class: "pb-2 px-4" }, ru = { class: "" }, iu = ["id", "value"], uu = ["for"], du = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, El = /* @__PURE__ */ ue({
  __name: "QueryPrefs",
  props: {
    id: { default: "QueryPrefs" },
    columns: {},
    prefs: {},
    maxLimit: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const { autoQueryGridDefaults: s } = zt(), n = e, a = t, i = D({});
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
          l("div", Zi, [
            l("div", Wi, [
              l("div", Gi, [
                Ji,
                l("div", Xi, [
                  l("label", {
                    for: `${f.id}-take`,
                    class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                  }, "Results per page", 8, Yi),
                  Pt(l("select", {
                    id: `${f.id}-take`,
                    "onUpdate:modelValue": m[0] || (m[0] = (b) => i.value.take = b),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), r(Se, null, Ie(u.filter((b) => n.maxLimit == null || b <= n.maxLimit), (b) => (o(), r("option", {
                      value: b,
                      selected: b === i.value.take
                    }, I(b), 9, tu))), 256))
                  ], 8, eu), [
                    [wo, i.value.take]
                  ])
                ]),
                l("div", su, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: m[1] || (m[1] = (b) => i.value.selectedColumns = []),
                    checked: i.value.selectedColumns.length === 0,
                    class: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
                  }, null, 8, lu),
                  l("label", {
                    class: "ml-3 block text-gray-700 dark:text-gray-300",
                    for: `${f.id}-allColumns`
                  }, "View all columns", 8, nu)
                ]),
                l("div", ou, [
                  l("div", au, [
                    l("div", ru, [
                      (o(!0), r(Se, null, Ie(f.columns, (b) => (o(), r("div", {
                        key: b.name,
                        class: "flex items-center"
                      }, [
                        Pt(l("input", {
                          type: "checkbox",
                          id: b.name,
                          value: b.name,
                          "onUpdate:modelValue": m[2] || (m[2] = (_) => i.value.selectedColumns = _),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, iu), [
                          [pl, i.value.selectedColumns]
                        ]),
                        l("label", {
                          for: b.name,
                          class: "ml-3"
                        }, I(b.name), 9, uu)
                      ]))), 128))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          l("div", du, [
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
}), cu = { key: 0 }, fu = { key: 1 }, vu = {
  key: 2,
  class: "pt-1"
}, pu = { key: 0 }, mu = { key: 1 }, hu = { key: 2 }, gu = { key: 4 }, yu = { class: "pl-1 pt-1 flex flex-wrap" }, bu = { class: "flex mt-1" }, wu = ["title"], ku = /* @__PURE__ */ l("svg", {
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
], -1), _u = [
  ku
], $u = ["disabled"], Cu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
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
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), Mu = [
  Vu
], Su = ["disabled"], Au = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), Fu = [
  Au
], Tu = ["disabled"], Iu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Du = [
  Iu
], ju = {
  key: 0,
  class: "flex mt-1"
}, Ou = { class: "px-4 text-lg text-black dark:text-white" }, Pu = { key: 0 }, Bu = { key: 1 }, Hu = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Ru = { key: 2 }, Eu = { class: "flex flex-wrap" }, Nu = {
  key: 0,
  class: "pl-2 mt-1"
}, zu = /* @__PURE__ */ l("svg", {
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
], -1), Uu = [
  zu
], qu = {
  key: 1,
  class: "pl-2 mt-1"
}, Qu = /* @__PURE__ */ Ds('<svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fill-rule="evenodd"></path><path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z"></path><path fill="#fff" fill-rule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z"></path></svg><span class="text-green-900 dark:text-green-100">Excel</span>', 2), Ku = [
  Qu
], Zu = {
  key: 2,
  class: "pl-2 mt-1"
}, Wu = {
  key: 0,
  class: "w-5 h-5 mr-1 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Gu = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M5 13l4 4L19 7"
}, null, -1), Ju = [
  Gu
], Xu = {
  key: 1,
  class: "w-5 h-5 mr-1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Yu = /* @__PURE__ */ l("g", { fill: "none" }, [
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
], -1), ed = [
  Yu
], td = /* @__PURE__ */ l("span", { class: "whitespace-nowrap" }, "Copy URL", -1), sd = {
  key: 3,
  class: "pl-2 mt-1"
}, ld = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), nd = [
  ld
], od = {
  key: 4,
  class: "pl-2 mt-1"
}, ad = /* @__PURE__ */ l("svg", {
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
], -1), rd = { class: "mr-1" }, id = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, ud = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), dd = [
  ud
], cd = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, fd = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), vd = [
  fd
], pd = {
  key: 5,
  class: "pl-2 mt-1"
}, md = ["title"], hd = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), gd = { class: "whitespace-nowrap" }, yd = { key: 8 }, bd = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, wd = { class: "mr-1 select-none" }, kd = {
  key: 1,
  class: "flex justify-between items-center"
}, _d = { class: "mr-1 select-none" }, Cs = 25, $d = /* @__PURE__ */ ue({
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
    const { config: n, autoQueryGridDefaults: a } = zt(), i = a, u = n.value.storage, d = e, c = s, f = We("client"), m = "filtering,queryString,queryFilters".split(","), $ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), k = v(() => d.deny ? jt(m, d.deny) : jt(m, i.value.deny)), p = v(() => d.hide ? jt($, d.hide) : jt($, i.value.hide));
    function b(C) {
      return k.value[C];
    }
    function _(C) {
      return p.value[C];
    }
    const T = v(() => d.tableStyle ?? i.value.tableStyle), R = v(() => d.gridClass ?? me.getGridClass(T.value)), oe = v(() => d.grid2Class ?? me.getGrid2Class(T.value)), z = v(() => d.grid3Class ?? me.getGrid3Class(T.value)), E = v(() => d.grid4Class ?? me.getGrid4Class(T.value)), S = v(() => d.tableClass ?? me.getTableClass(T.value)), te = v(() => d.theadClass ?? me.getTheadClass(T.value)), w = v(() => d.theadRowClass ?? me.getTheadRowClass(T.value)), j = v(() => d.theadCellClass ?? me.getTheadCellClass(T.value)), q = v(() => d.toolbarButtonClass ?? me.toolbarButtonClass);
    function le(C, P) {
      var Te;
      if (d.rowClass)
        return d.rowClass(C, P);
      const fe = !!ye.value.AnyUpdate, $e = ((Te = Ce.value) != null && Te.name ? we(C, Ce.value.name) : null) == ee.value;
      return me.getTableRowClass(d.tableStyle, P, $e, fe);
    }
    const F = js(), Z = v(() => {
      var C;
      return Ws(((C = ye.value.AnyQuery.viewModel) == null ? void 0 : C.name) || ye.value.AnyQuery.dataModel.name);
    }), W = v(() => {
      const C = Object.keys(F).map((P) => P.toLowerCase());
      return ot(Z.value).filter((P) => C.includes(P.name.toLowerCase()) || C.includes(P.name.toLowerCase() + "-header")).map((P) => P.name);
    });
    function Q() {
      let C = Tt(d.selectedColumns);
      return C.length > 0 ? C : W.value.length > 0 ? W.value : [];
    }
    const A = v(() => {
      let P = Q().map((re) => re.toLowerCase());
      const fe = ot(Z.value);
      return P.length > 0 ? P.map((re) => fe.find(($e) => $e.name.toLowerCase() === re)).filter((re) => re != null) : fe;
    }), se = v(() => {
      let C = A.value.map((fe) => fe.name), P = Tt(de.value.selectedColumns).map((fe) => fe.toLowerCase());
      return P.length > 0 ? C.filter((fe) => P.includes(fe.toLowerCase())) : C;
    }), h = D([]), N = D(new tt()), H = D(new tt()), g = D(), L = D(!1), ee = D(), Y = D(), ae = D(!1), O = D(), V = D(d.skip), ce = D(!1), de = D({ take: Cs }), ie = D(!1), pe = v(() => h.value.some((C) => C.settings.filters.length > 0 || !!C.settings.sort) || de.value.selectedColumns), M = v(() => h.value.map((C) => C.settings.filters.length).reduce((C, P) => C + P, 0)), ve = v(() => {
      var C;
      return ot(Ws(Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name)));
    }), Ce = v(() => {
      var C;
      return ls(Ws(Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name)));
    }), Ve = v(() => de.value.take ?? Cs), he = v(() => N.value.response ? we(N.value.response, "results") : []), je = v(() => {
      var C;
      return (((C = N.value.response) == null ? void 0 : C.total) || he.value.length) ?? 0;
    }), Oe = v(() => V.value > 0), xe = v(() => V.value > 0), Qe = v(() => he.value.length >= Ve.value), Re = v(() => he.value.length >= Ve.value), Pe = D(), Ge = D(), st = {
      NoQuery: "No Query API was found"
    };
    t({
      update: Me,
      search: qt,
      createRequestArgs: Ks,
      reset: Gl,
      createDone: rs,
      createSave: Xs,
      editDone: Mt,
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
          return !In(P);
      }
      return !1;
    }
    function Fe(C) {
      c("nav", C), b("queryString") && gl(C);
    }
    async function lt(C) {
      V.value += C, V.value < 0 && (V.value = 0);
      const P = Math.floor(je.value / Ve.value) * Ve.value;
      V.value > P && (V.value = P), Fe({ skip: V.value || void 0 }), await Me();
    }
    async function Ne(C, P) {
      var $e, Te;
      if (Y.value = null, ee.value = P, !C || !P)
        return;
      let fe = fs(ye.value.AnyQuery, { [C]: P });
      const re = await f.api(fe);
      if (re.succeeded) {
        let ze = ($e = we(re.response, "results")) == null ? void 0 : $e[0];
        ze || console.warn(`API ${(Te = ye.value.AnyQuery) == null ? void 0 : Te.request.name}(${C}:${P}) returned no results`), Y.value = ze;
      }
    }
    async function rt(C, P) {
      var $e;
      c("rowSelected", C, P);
      const fe = ($e = Ce.value) == null ? void 0 : $e.name, re = fe ? we(C, fe) : null;
      !fe || !re || (Fe({ edit: re }), Ne(fe, re));
    }
    function B(C, P) {
      var re;
      if (!b("filtering"))
        return;
      let fe = P.target;
      if (Je(C) && (fe == null ? void 0 : fe.tagName) !== "TD") {
        let $e = (re = fe == null ? void 0 : fe.closest("TABLE")) == null ? void 0 : re.getBoundingClientRect(), Te = h.value.find((ze) => ze.name.toLowerCase() == C.toLowerCase());
        if (Te && $e) {
          let ze = 318, mt = $e.x + ze + 10;
          O.value = {
            column: Te,
            topLeft: {
              x: Math.max(Math.floor(P.clientX + ze / 2), mt),
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
      P && (P.settings = C, u.setItem(bs(P.name), JSON.stringify(P.settings)), await Me()), O.value = null;
    }
    async function De(C) {
      u.setItem(bs(C.name), JSON.stringify(C.settings)), await Me();
    }
    async function Ye(C) {
      ae.value = !1, de.value = C, u.setItem(Zs(), JSON.stringify(C)), await Me();
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
    async function Me() {
      await qt(Ks());
    }
    async function Vt() {
      await Me();
    }
    const Ut = /iPad|iPhone|iPod/.test(navigator.userAgent);
    async function qt(C) {
      const P = ye.value.AnyQuery;
      if (!P) {
        console.error(st.NoQuery);
        return;
      }
      let fe = fs(P, C), re = await f.api(fe);
      pn((ze) => {
        N.value.response = N.value.error = void 0, ie.value = ze, Ut ? Ot(() => N.value = re) : N.value = re;
      })();
      let Te = we(re.response, "results") || [];
      !re.succeeded || Te.label == 0;
    }
    function Ks() {
      let C = {
        include: "total",
        take: Ve.value
      }, P = Tt(de.value.selectedColumns || d.selectedColumns);
      if (P.length > 0) {
        let re = Ce.value;
        re && !P.includes(re.name) && (P = [re.name, ...P]);
        const $e = ve.value, Te = [];
        P.forEach((ze) => {
          var ks;
          const mt = $e.find((St) => St.name.toLowerCase() == ze.toLowerCase());
          (ks = mt == null ? void 0 : mt.ref) != null && ks.selfId && Te.push(mt.ref.selfId), we(F, ze) && Te.push(...$e.filter((St) => {
            var Ue, At;
            return ((At = (Ue = St.ref) == null ? void 0 : Ue.selfId) == null ? void 0 : At.toLowerCase()) == ze.toLowerCase();
          }).map((St) => St.name));
        }), Te.forEach((ze) => {
          P.includes(ze) || P.push(ze);
        }), C.fields = P.join(",");
      }
      let fe = [];
      if (h.value.forEach((re) => {
        re.settings.sort && fe.push((re.settings.sort === "DESC" ? "-" : "") + re.name), re.settings.filters.forEach(($e) => {
          let Te = $e.key.replace("%", re.name);
          C[Te] = $e.value;
        });
      }), d.filters && Object.keys(d.filters).forEach((re) => {
        C[re] = d.filters[re];
      }), b("queryString") && b("queryFilters")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let $e = ll(re);
        if (Object.keys($e).forEach((Te) => {
          A.value.find((mt) => mt.name.toLowerCase() === Te.toLowerCase()) && (C[Te] = $e[Te]);
        }), typeof $e.skip < "u") {
          const Te = parseInt($e.skip);
          isNaN(Te) || (V.value = C.skip = Te);
        }
      }
      return typeof C.skip > "u" && V.value > 0 && (C.skip = V.value), fe.length > 0 && (C.orderBy = fe.join(",")), C;
    }
    function io() {
      const C = Nl("csv");
      al(C), typeof window < "u" && window.open(C);
    }
    function uo() {
      const C = Nl("json");
      al(C), ce.value = !0, setTimeout(() => ce.value = !1, 3e3);
    }
    function Nl(C = "json") {
      var Te;
      const P = Ks(), fe = `/api/${(Te = ye.value.AnyQuery) == null ? void 0 : Te.request.name}`, re = Po(f.baseUrl, es(fe, { ...P, jsconfig: "edv" }));
      return re.indexOf("?") >= 0 ? Os(re, "?") + "." + C + "?" + xs(re, "?") : re + ".json";
    }
    async function co() {
      h.value.forEach((C) => {
        C.settings = { filters: [] }, u.removeItem(bs(C.name));
      }), de.value = { take: Cs }, u.removeItem(Zs()), await Me();
    }
    function fo() {
      L.value = !0, Fe({ create: null });
    }
    const Qt = v(() => Nt(d.type)), os = v(() => {
      var C;
      return Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name);
    }), as = v(() => d.modelTitle || os.value), vo = v(() => d.newButtonLabel || `New ${as.value}`), Zs = () => {
      var C;
      return `${d.id}/ApiPrefs/${Qt.value || ((C = ye.value.AnyQuery) == null ? void 0 : C.dataModel.name)}`;
    }, bs = (C) => {
      var P;
      return `Column/${d.id}:${Qt.value || ((P = ye.value.AnyQuery) == null ? void 0 : P.dataModel.name)}.${C}`;
    }, { metadataApi: zl, typeOf: Ws, apiOf: Ul, filterDefinitions: po } = dt(), { invalidAccessMessage: Gs } = Bl(), ql = v(() => d.filterDefinitions || po.value), ye = v(() => {
      let C = Tt(d.apis);
      return C.length > 0 ? Rt.from(C.map((P) => Ul(P)).filter((P) => P != null).map((P) => P)) : Rt.forType(Qt.value, zl.value);
    }), ws = (C) => `<span class="text-yellow-700">${C}</span>`, Ql = v(() => {
      if (!zl.value)
        return ws(`AppMetadata not loaded, see <a class="${Is.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let P = Tt(d.apis).map((re) => Ul(re) == null ? re : null).filter((re) => re != null);
      if (P.length > 0)
        return ws(`Unknown API${P.length > 1 ? "s" : ""}: ${P.join(", ")}`);
      let fe = ye.value;
      return fe.empty ? ws("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : fe.AnyQuery ? null : ws(st.NoQuery);
    }), Kl = v(() => ye.value.AnyQuery && Gs(ye.value.AnyQuery)), Zl = v(() => ye.value.Create && Gs(ye.value.Create)), Wl = v(() => ye.value.AnyUpdate && Gs(ye.value.AnyUpdate)), mo = v(() => cs(ye.value.Create));
    v(() => cs(ye.value.AnyUpdate));
    const Js = v(() => cs(ye.value.Delete));
    function Mt() {
      Y.value = null, ee.value = null, Fe({ edit: void 0 });
    }
    function rs() {
      L.value = !1, Fe({ create: void 0 });
    }
    async function Kt() {
      await Me(), Mt();
    }
    async function Xs() {
      await Me(), rs();
    }
    function Gl() {
      var fe;
      N.value = new tt(), H.value = new tt(), L.value = !1, ee.value = null, Y.value = null, ae.value = !1, O.value = null, V.value = d.skip, ce.value = !1, de.value = { take: Cs }, ie.value = !1;
      const C = d.prefs || Ts(u.getItem(Zs()));
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
        let $e = ll(re);
        typeof $e.create < "u" ? L.value = typeof $e.create < "u" : P && (typeof $e.edit == "string" || typeof $e.edit == "number") && Ne(P, $e.edit);
      }
      d.create === !0 && (L.value = !0), P && d.edit != null && Ne(P, d.edit);
    }
    return at(async () => {
      Gl(), await Me();
    }), (C, P) => {
      const fe = K("Alert"), re = K("EnsureAccessDialog"), $e = K("AutoCreateForm"), Te = K("AutoEditForm"), ze = K("AutoViewForm"), mt = K("ErrorSummary"), Jl = K("Loading"), ks = K("SettingsIcons"), St = K("DataGrid");
      return Ql.value ? (o(), r("div", cu, [
        ge(fe, { innerHTML: Ql.value }, null, 8, ["innerHTML"])
      ])) : Kl.value ? (o(), r("div", fu, [
        ge(ro, { "invalid-access": Kl.value }, null, 8, ["invalid-access"])
      ])) : (o(), r("div", vu, [
        _("forms") && L.value && ye.value.Create ? (o(), r("div", pu, [
          Zl.value ? (o(), ne(re, {
            key: 0,
            title: `Create ${as.value}`,
            "invalid-access": Zl.value,
            "alert-class": "text-yellow-700",
            onDone: rs
          }, null, 8, ["title", "invalid-access"])) : J(F).createform ? U(C.$slots, "createform", {
            key: 1,
            type: ye.value.Create.request.name,
            configure: C.configureField,
            done: rs,
            save: Xs
          }) : (o(), ne($e, {
            key: 2,
            ref_key: "createForm",
            ref: Pe,
            type: ye.value.Create.request.name,
            configure: C.configureField,
            onDone: rs,
            onSave: Xs
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
        ])) : _("forms") && Y.value && ye.value.AnyUpdate ? (o(), r("div", mu, [
          Wl.value ? (o(), ne(re, {
            key: 0,
            title: `Update ${as.value}`,
            "invalid-access": Wl.value,
            "alert-class": "text-yellow-700",
            onDone: Mt
          }, null, 8, ["title", "invalid-access"])) : J(F).editform ? U(C.$slots, "editform", {
            key: 1,
            model: Y.value,
            type: ye.value.AnyUpdate.request.name,
            deleteType: Js.value ? ye.value.Delete.request.name : null,
            configure: C.configureField,
            done: Mt,
            save: Kt
          }) : (o(), ne(Te, {
            key: 2,
            ref_key: "editForm",
            ref: Ge,
            modelValue: Y.value,
            "onUpdate:modelValue": P[0] || (P[0] = (Ue) => Y.value = Ue),
            type: ye.value.AnyUpdate.request.name,
            deleteType: Js.value ? ye.value.Delete.request.name : null,
            configure: C.configureField,
            onDone: Mt,
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
        ])) : _("forms") && Y.value ? (o(), r("div", hu, [
          J(F).viewform ? U(C.$slots, "viewform", {
            key: 0,
            model: Y.value,
            apis: ye.value,
            done: Mt
          }) : (o(), ne(ze, {
            key: 1,
            model: Y.value,
            apis: ye.value,
            deleteType: Js.value ? ye.value.Delete.request.name : null,
            done: Mt,
            onSave: Kt,
            onDelete: Kt
          }, null, 8, ["model", "apis", "deleteType"]))
        ])) : x("", !0),
        J(F).toolbar ? U(C.$slots, "toolbar", { key: 3 }) : _("toolbar") ? (o(), r("div", gu, [
          ae.value ? (o(), ne(El, {
            key: 0,
            columns: A.value,
            prefs: de.value,
            onDone: P[1] || (P[1] = (Ue) => ae.value = !1),
            onSave: Ye
          }, null, 8, ["columns", "prefs"])) : x("", !0),
          l("div", yu, [
            l("div", bu, [
              _("preferences") ? (o(), r("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${as.value} Preferences`,
                onClick: P[2] || (P[2] = (Ue) => ae.value = !ae.value)
              }, _u, 8, wu)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 1,
                type: "button",
                class: y(["pl-2", Oe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !Oe.value,
                onClick: P[3] || (P[3] = (Ue) => lt(-je.value))
              }, xu, 10, $u)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 2,
                type: "button",
                class: y(["pl-2", xe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !xe.value,
                onClick: P[4] || (P[4] = (Ue) => lt(-Ve.value))
              }, Mu, 10, Lu)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 3,
                type: "button",
                class: y(["pl-2", Qe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !Qe.value,
                onClick: P[5] || (P[5] = (Ue) => lt(Ve.value))
              }, Fu, 10, Su)) : x("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 4,
                type: "button",
                class: y(["pl-2", Re.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !Re.value,
                onClick: P[6] || (P[6] = (Ue) => lt(je.value))
              }, Du, 10, Tu)) : x("", !0)
            ]),
            _("pagingInfo") ? (o(), r("div", ju, [
              l("div", Ou, [
                ie.value ? (o(), r("span", Pu, "Querying...")) : x("", !0),
                he.value.length ? (o(), r("span", Bu, [
                  Hu,
                  ke(" " + I(V.value + 1) + " - " + I(Math.min(V.value + he.value.length, je.value)) + " ", 1),
                  l("span", null, " of " + I(je.value), 1)
                ])) : N.value.completed ? (o(), r("span", Ru, "No Results")) : x("", !0)
              ])
            ])) : x("", !0),
            l("div", Eu, [
              _("refresh") ? (o(), r("div", Nu, [
                l("button", {
                  type: "button",
                  onClick: Vt,
                  title: "Refresh",
                  class: y(q.value)
                }, Uu, 2)
              ])) : x("", !0),
              _("downloadCsv") ? (o(), r("div", qu, [
                l("button", {
                  type: "button",
                  onClick: io,
                  title: "Download CSV",
                  class: y(q.value)
                }, Ku, 2)
              ])) : x("", !0),
              _("copyApiUrl") ? (o(), r("div", Zu, [
                l("button", {
                  type: "button",
                  onClick: uo,
                  title: "Copy API URL",
                  class: y(q.value)
                }, [
                  ce.value ? (o(), r("svg", Wu, Ju)) : (o(), r("svg", Xu, ed)),
                  td
                ], 2)
              ])) : x("", !0),
              pe.value && _("resetPreferences") ? (o(), r("div", sd, [
                l("button", {
                  type: "button",
                  onClick: co,
                  title: "Reset Preferences & Filters",
                  class: y(q.value)
                }, nd, 2)
              ])) : x("", !0),
              _("filtersView") && M.value > 0 ? (o(), r("div", od, [
                l("button", {
                  type: "button",
                  onClick: P[7] || (P[7] = (Ue) => g.value = g.value == "filters" ? null : "filters"),
                  class: y(q.value),
                  "aria-expanded": "false"
                }, [
                  ad,
                  l("span", rd, I(M.value) + " " + I(M.value == 1 ? "Filter" : "Filters"), 1),
                  g.value != "filters" ? (o(), r("svg", id, dd)) : (o(), r("svg", cd, vd))
                ], 2)
              ])) : x("", !0),
              _("newItem") && ye.value.Create && mo.value ? (o(), r("div", pd, [
                l("button", {
                  type: "button",
                  onClick: fo,
                  title: as.value,
                  class: y(q.value)
                }, [
                  hd,
                  l("span", gd, I(vo.value), 1)
                ], 10, md)
              ])) : x("", !0),
              J(F).toolbarbuttons ? U(C.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: q.value
              }) : x("", !0)
            ])
          ])
        ])) : x("", !0),
        g.value == "filters" ? (o(), ne(Rl, {
          key: 5,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: ql.value,
          columns: h.value,
          onDone: P[8] || (P[8] = (Ue) => g.value = null),
          onChange: De
        }, null, 8, ["definitions", "columns"])) : x("", !0),
        H.value.error ?? N.value.error ? (o(), ne(mt, {
          key: 6,
          status: H.value.error ?? N.value.error
        }, null, 8, ["status"])) : ie.value ? (o(), ne(Jl, {
          key: 7,
          class: "p-2"
        })) : x("", !0),
        O.value ? (o(), r("div", yd, [
          ge(Hl, {
            definitions: ql.value,
            column: O.value.column,
            "top-left": O.value.topLeft,
            onDone: G,
            onSave: be
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : x("", !0),
        he.value.length ? (o(), ne(St, {
          key: 9,
          id: C.id,
          items: he.value,
          type: C.type,
          "selected-columns": se.value,
          class: "mt-1",
          onFiltersChanged: Me,
          tableStyle: T.value,
          gridClass: R.value,
          grid2Class: oe.value,
          grid3Class: z.value,
          grid4Class: E.value,
          tableClass: S.value,
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
        }, ml({
          header: _e(({ column: Ue, label: At }) => {
            var Xl;
            return [
              b("filtering") && Je(Ue) ? (o(), r("div", bd, [
                l("span", wd, I(At), 1),
                ge(ks, {
                  column: h.value.find((ho) => ho.name.toLowerCase() === Ue.toLowerCase()),
                  "is-open": ((Xl = O.value) == null ? void 0 : Xl.column.name) === Ue
                }, null, 8, ["column", "is-open"])
              ])) : (o(), r("div", kd, [
                l("span", _d, I(At), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          Ie(Object.keys(J(F)), (Ue) => ({
            name: Ue,
            fn: _e((At) => [
              U(C.$slots, Ue, Yt(As(At)))
            ])
          }))
        ]), 1032, ["id", "items", "type", "selected-columns", "tableStyle", "gridClass", "grid2Class", "grid3Class", "grid4Class", "tableClass", "theadClass", "theadRowClass", "theadCellClass", "tbodyClass", "rowStyle", "headerTitle", "headerTitles", "visibleFrom"])) : x("", !0)
      ]));
    };
  }
}), Cd = { class: "flex" }, xd = {
  key: 0,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Ld = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Vd = [
  Ld
], Md = /* @__PURE__ */ l("path", {
  d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z",
  fill: "currentColor"
}, null, -1), Sd = /* @__PURE__ */ l("path", {
  d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
  fill: "currentColor"
}, null, -1), Ad = [
  Md,
  Sd
], Fd = {
  key: 2,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Td = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z",
    fill: "currentColor"
  })
], -1), Id = [
  Td
], Dd = {
  key: 3,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, jd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
    fill: "currentColor"
  })
], -1), Od = [
  jd
], Pd = /* @__PURE__ */ ue({
  __name: "SettingsIcons",
  props: {
    column: {},
    isOpen: { type: Boolean }
  },
  setup(e) {
    return (t, s) => {
      var n, a, i, u, d, c, f;
      return o(), r("div", Cd, [
        (i = (a = (n = t.column) == null ? void 0 : n.settings) == null ? void 0 : a.filters) != null && i.length ? (o(), r("svg", xd, Vd)) : (o(), r("svg", {
          key: 1,
          class: y(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, Ad, 2)),
        ((d = (u = t.column) == null ? void 0 : u.settings) == null ? void 0 : d.sort) === "ASC" ? (o(), r("svg", Fd, Id)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), r("svg", Dd, Od)) : x("", !0)
      ]);
    };
  }
}), Bd = /* @__PURE__ */ ue({
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
      }, ml({
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
}), Hd = ["for"], Rd = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Ed = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Nd = /* @__PURE__ */ l("svg", {
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
], -1), zd = [
  Nd
], Ud = ["id"], qd = ["id"], Qd = {
  inheritAttrs: !1
}, Kd = /* @__PURE__ */ ue({
  ...Qd,
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
      }, I(d.value), 11, Hd)) : x("", !0),
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
          value: J(yn)(u.value, p.modelValue),
          onInput: b[0] || (b[0] = (_) => p.$emit("update:modelValue", s(_.target))),
          "aria-invalid": $.value != null,
          "aria-describedby": `${p.id}-error`,
          step: "any"
        }, J(yt)(p.$attrs, ["class", "value"])), null, 16, Rd),
        $.value ? (o(), r("div", Ed, zd)) : x("", !0)
      ], 2),
      $.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${p.id}-error`
      }, I($.value), 9, Ud)) : p.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${p.id}-description`
      }, I(p.help), 9, qd)) : x("", !0),
      U(p.$slots, "footer", Ae({
        inputElement: a.value,
        id: p.id,
        modelValue: p.modelValue,
        status: p.status
      }, p.$attrs))
    ], 2));
  }
}), Zd = ["for"], Wd = { class: "mt-1 relative rounded-md shadow-sm" }, Gd = ["name", "id", "placeholder", "aria-invalid", "aria-describedby"], Jd = ["id"], Xd = ["id"], Yd = {
  inheritAttrs: !1
}, ec = /* @__PURE__ */ ue({
  ...Yd,
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
      }, I(n.value), 11, Zd)) : x("", !0),
      l("div", Wd, [
        l("textarea", Ae({
          name: c.id,
          id: c.id,
          class: d.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (m) => c.$emit("update:modelValue", t(m.target))),
          "aria-invalid": u.value != null,
          "aria-describedby": `${c.id}-error`
        }, J(yt)(c.$attrs, ["class"])), I(c.modelValue), 17, Gd)
      ]),
      u.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, I(u.value), 9, Jd)) : c.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, I(c.help), 9, Xd)) : x("", !0)
    ], 2));
  }
}), tc = ["for"], sc = ["id", "name", "value", "aria-invalid", "aria-describedby"], lc = ["value"], nc = ["id"], oc = {
  inheritAttrs: !1
}, ac = /* @__PURE__ */ ue({
  ...oc,
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
      }, I(n.value), 11, tc)) : x("", !0),
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
        (o(!0), r(Se, null, Ie(u.value, (f) => (o(), r("option", {
          value: f.key
        }, I(f.value), 9, lc))), 256))
      ], 16, sc),
      i.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${d.id}-error`
      }, I(i.value), 9, nc)) : x("", !0)
    ], 2));
  }
}), rc = { class: "flex items-center h-5" }, ic = ["id", "name", "checked"], uc = { class: "ml-3 text-sm" }, dc = ["for"], cc = {
  key: 0,
  class: "mt-2 text-sm text-red-500",
  id: "`${id}-error`"
}, fc = {
  key: 1,
  class: "mt-2 text-sm text-gray-500",
  id: "`${id}-description`"
}, vc = {
  inheritAttrs: !1
}, pc = /* @__PURE__ */ ue({
  ...vc,
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
      l("div", rc, [
        l("input", Ae({
          id: u.id,
          name: u.id,
          type: "checkbox",
          checked: u.modelValue,
          onInput: d[0] || (d[0] = (c) => u.$emit("update:modelValue", c.target.checked)),
          class: ["focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800", u.inputClass]
        }, J(yt)(u.$attrs, ["class"])), null, 16, ic)
      ]),
      l("div", uc, [
        l("label", {
          for: u.id,
          class: y(`font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
        }, I(n.value), 11, dc),
        i.value ? (o(), r("p", cc, I(i.value), 1)) : u.help ? (o(), r("p", fc, I(u.help), 1)) : x("", !0)
      ])
    ], 2));
  }
}), mc = ["id"], hc = ["for"], gc = { class: "mt-1 relative rounded-md shadow-sm" }, yc = ["id", "name", "value"], bc = { class: "flex flex-wrap pb-1.5" }, wc = { class: "pt-1.5 pl-1" }, kc = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300" }, _c = ["onClick"], $c = /* @__PURE__ */ l("svg", {
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
], -1), Cc = [
  $c
], xc = { class: "pt-1.5 pl-1 shrink" }, Lc = ["type", "name", "id", "aria-invalid", "aria-describedby"], Vc = ["id"], Mc = ["onMouseover", "onClick"], Sc = { class: "block truncate" }, Ac = {
  key: 1,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Fc = /* @__PURE__ */ l("svg", {
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
], -1), Tc = [
  Fc
], Ic = ["id"], Dc = ["id"], jc = {
  inheritAttrs: !1
}, Oc = /* @__PURE__ */ ue({
  ...jc,
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
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((N) => !i.value.includes(N) && N.toLowerCase().includes(h)) : s.allowableValues.filter((N) => !i.value.includes(N) && N.startsWith(h));
    });
    function f(h) {
      u.value = h;
    }
    const m = D(null), $ = D(""), k = v(() => s.type || "text"), p = v(() => s.label ?? He(vt(s.id)));
    let b = We("ApiState", void 0);
    const _ = v(() => _t.call({ responseStatus: s.status ?? (b == null ? void 0 : b.error.value) }, s.id)), T = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      _.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), R = (h) => w(i.value.filter((N) => N != h));
    function oe(h) {
      var N;
      document.activeElement === h.target && ((N = m.value) == null || N.focus());
    }
    const z = D();
    function E() {
      d.value = !0, z.value = !0;
    }
    function S() {
      E();
    }
    function te() {
      Q(q()), z.value = !1, setTimeout(() => {
        z.value || (d.value = !1);
      }, 200);
    }
    function w(h) {
      const N = s.string ? h.join(",") : h;
      n("update:modelValue", N);
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
            const N = c.value.indexOf(u.value);
            u.value = N + 1 < c.value.length ? c.value[N + 1] : c.value[0];
          }
          W();
        } else if (h.code == "ArrowUp") {
          if (!u.value)
            u.value = c.value[c.value.length - 1];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N - 1 >= 0 ? c.value[N - 1] : c.value[c.value.length - 1];
          }
          W();
        } else
          h.code == "Enter" ? u.value && d.value ? (Q(u.value), h.preventDefault()) : d.value = !1 : d.value = c.value.length > 0;
    }
    function q() {
      if ($.value.length == 0)
        return "";
      let h = Bo($.value.trim(), ",");
      return h[0] == "," && (h = h.substring(1)), h = h.trim(), h.length == 0 && d.value && c.value.length > 0 ? u.value : h;
    }
    function le(h) {
      const N = q();
      if (N.length > 0) {
        const H = s.delimiters.some((L) => L == h.key);
        if (H && h.preventDefault(), h.key == "Enter" || h.key == "NumpadEnter" || h.key.length == 1 && H) {
          Q(N);
          return;
        }
      }
    }
    const F = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Z() {
      setTimeout(() => {
        let h = Fs(`#${s.id}-tag li.active`);
        h && h.scrollIntoView(F);
      }, 0);
    }
    function W() {
      setTimeout(() => {
        let h = Fs(`#${s.id}-tag li.active`);
        h && ("scrollIntoViewIfNeeded" in h ? h.scrollIntoViewIfNeeded(F) : h.scrollIntoView(F));
      }, 0);
    }
    function Q(h) {
      if (h.length === 0)
        return;
      const N = Array.from(i.value);
      N.indexOf(h) == -1 && N.push(h), w(N), $.value = "", d.value = !1;
    }
    function A(h) {
      var H;
      const N = (H = h.clipboardData) == null ? void 0 : H.getData("Text");
      se(N);
    }
    function se(h) {
      if (!h)
        return;
      const N = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), H = Array.from(i.value);
      h.split(N).map((L) => L.trim()).forEach((L) => {
        H.indexOf(L) == -1 && H.push(L);
      }), w(H), $.value = "";
    }
    return (h, N) => (o(), r("div", {
      class: y([h.$attrs.class]),
      id: `${h.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      p.value ? (o(), r("label", {
        key: 0,
        for: h.id,
        class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${h.labelClass ?? ""}`)
      }, I(p.value), 11, hc)) : x("", !0),
      l("div", gc, [
        l("input", {
          type: "hidden",
          id: h.id,
          name: h.id,
          value: i.value.join(",")
        }, null, 8, yc),
        l("button", {
          class: y(T.value),
          onClick: qe(oe, ["prevent"]),
          onFocus: N[2] || (N[2] = (H) => d.value = !0),
          tabindex: "-1"
        }, [
          l("div", bc, [
            (o(!0), r(Se, null, Ie(i.value, (H) => (o(), r("div", wc, [
              l("span", kc, [
                ke(I(H) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (g) => R(H),
                  class: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                }, Cc, 8, _c)
              ])
            ]))), 256)),
            l("div", xc, [
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
                "onUpdate:modelValue": N[0] || (N[0] = (H) => $.value = H),
                "aria-invalid": _.value != null,
                "aria-describedby": `${h.id}-error`,
                onKeydown: j,
                onKeypress: le,
                onPaste: qe(A, ["prevent", "stop"]),
                onFocus: S,
                onBlur: te,
                onClick: N[1] || (N[1] = (H) => d.value = !0)
              }, J(yt)(h.$attrs, ["class", "required"])), null, 16, Lc), [
                [ko, $.value]
              ])
            ])
          ])
        ], 34),
        d.value && c.value.length ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeydown: j,
          id: `${h.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Se, null, Ie(c.value.slice(0, h.maxVisibleItems), (H) => (o(), r("li", {
            class: y([H === u.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (g) => f(H),
            onClick: (g) => Q(H),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", Sc, I(H), 1)
          ], 42, Mc))), 256))
        ], 40, Vc)) : x("", !0),
        _.value ? (o(), r("div", Ac, Tc)) : x("", !0)
      ]),
      _.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${h.id}-error`
      }, I(_.value), 9, Ic)) : h.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${h.id}-description`
      }, I(h.help), 9, Dc)) : x("", !0)
    ], 10, mc));
  }
}), Pc = { class: "relative flex-grow mr-2 sm:mr-4" }, Bc = ["for"], Hc = { class: "block mt-2" }, Rc = { class: "sr-only" }, Ec = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Nc = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, zc = /* @__PURE__ */ l("svg", {
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
], -1), Uc = [
  zc
], qc = ["id"], Qc = ["id"], Kc = { key: 0 }, Zc = ["title"], Wc = ["alt", "src"], Gc = {
  key: 1,
  class: "mt-3"
}, Jc = { class: "w-full" }, Xc = { class: "pr-6 align-bottom pb-2" }, Yc = ["title"], e0 = ["src", "onError"], t0 = ["href"], s0 = {
  key: 1,
  class: "overflow-hidden"
}, l0 = { class: "align-top pb-2 whitespace-nowrap" }, n0 = {
  key: 0,
  class: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black"
}, o0 = /* @__PURE__ */ ue({
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
    const t = e, s = D(null), { assetsPathResolver: n, fallbackPathResolver: a } = zt(), i = {}, u = D(), d = D(((E = t.files) == null ? void 0 : E.map(c)) || []);
    function c(S) {
      return S.filePath = n(S.filePath), S;
    }
    t.values && t.values.length > 0 && (d.value = t.values.map((S) => {
      let te = S.replace(/\\/g, "/");
      return { fileName: fn(Bt(te, "/"), "."), filePath: te, contentType: il(te) };
    }).map(c));
    const f = v(() => t.label ?? He(vt(t.id))), m = v(() => t.placeholder ?? f.value);
    let $ = We("ApiState", void 0);
    const k = v(() => _t.call({ responseStatus: t.status ?? ($ == null ? void 0 : $.error.value) }, t.id)), p = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      k.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), b = (S) => {
      let te = S.target;
      u.value = "", d.value = Array.from(te.files || []).map((w) => ({
        fileName: w.name,
        filePath: kl(w),
        contentLength: w.size,
        contentType: w.type || il(w.name)
      }));
    }, _ = () => {
      var S;
      return (S = s.value) == null ? void 0 : S.click();
    }, T = (S) => S == null ? !1 : S.startsWith("data:") || S.startsWith("blob:"), R = v(() => {
      if (d.value.length > 0)
        return d.value[0].filePath;
      let S = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return S && It(n(S)) || null;
    }), oe = (S) => !S || S.startsWith("data:") || S.endsWith(".svg") ? "" : "rounded-full object-cover";
    function z(S) {
      u.value = a(R.value);
    }
    return Et(Mn), (S, te) => (o(), r("div", {
      class: y(["flex", S.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", Pc, [
        f.value ? (o(), r("label", {
          key: 0,
          for: S.id,
          class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${S.labelClass ?? ""}`)
        }, I(f.value), 11, Bc)) : x("", !0),
        l("div", Hc, [
          l("span", Rc, I(S.help ?? f.value), 1),
          l("input", Ae({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: S.multiple,
            name: S.id,
            id: S.id,
            class: p.value,
            placeholder: m.value,
            "aria-invalid": k.value != null,
            "aria-describedby": `${S.id}-error`
          }, S.$attrs, { onChange: b }), null, 16, Ec),
          k.value ? (o(), r("div", Nc, Uc)) : x("", !0)
        ]),
        k.value ? (o(), r("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${S.id}-error`
        }, I(k.value), 9, qc)) : S.help ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${S.id}-description`
        }, I(S.help), 9, Qc)) : x("", !0)
      ]),
      S.multiple ? (o(), r("div", Gc, [
        l("table", Jc, [
          (o(!0), r(Se, null, Ie(d.value, (w) => (o(), r("tr", null, [
            l("td", Xc, [
              l("div", {
                class: "flex w-full",
                title: T(w.filePath) ? "" : w.filePath
              }, [
                l("img", {
                  src: i[J(It)(w.filePath)] || J(n)(J(It)(w.filePath)),
                  class: y(["mr-2 h-8 w-8", oe(w.filePath)]),
                  onError: (j) => i[J(It)(w.filePath)] = J(a)(J(It)(w.filePath))
                }, null, 42, e0),
                T(w.filePath) ? (o(), r("span", s0, I(w.fileName), 1)) : (o(), r("a", {
                  key: 0,
                  href: J(n)(w.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, I(w.fileName), 9, t0))
              ], 8, Yc)
            ]),
            l("td", l0, [
              w.contentLength && w.contentLength > 0 ? (o(), r("span", n0, I(J($l)(w.contentLength)), 1)) : x("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), r("div", Kc, [
        R.value ? (o(), r("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: T(R.value) ? "" : R.value
        }, [
          l("img", {
            onClick: _,
            class: y(["h-16 w-16", oe(R.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: u.value || J(n)(R.value),
            onError: z
          }, null, 42, Wc)
        ], 8, Zc)) : x("", !0)
      ]))
    ], 2));
  }
}), a0 = ["id"], r0 = ["for"], i0 = { class: "relative mt-1" }, u0 = ["id", "placeholder"], d0 = /* @__PURE__ */ l("svg", {
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
], -1), c0 = [
  d0
], f0 = ["id"], v0 = ["onMouseover", "onClick"], p0 = /* @__PURE__ */ l("svg", {
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
], -1), m0 = [
  p0
], h0 = {
  key: 2,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  tabindex: "-1"
}, g0 = /* @__PURE__ */ l("svg", {
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
], -1), y0 = [
  g0
], b0 = ["id"], w0 = ["id"], k0 = /* @__PURE__ */ ue({
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
    t({ toggle: F });
    function u(A) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(A) >= 0;
    }
    const d = v(() => a.label ?? He(vt(a.id)));
    let c = We("ApiState", void 0);
    const f = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), m = v(() => [ft.base, f.value ? ft.invalid : ft.valid]), $ = D(null), k = D(""), p = D(null), b = D(a.viewCount), _ = D([]), T = v(() => k.value ? a.options.filter((se) => a.match(se, k.value)).slice(0, b.value) : a.options), R = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function oe(A) {
      p.value = A, _.value.indexOf(A) > Math.floor(b.value * 0.9) && (b.value += a.viewCount, Q());
    }
    const z = [",", `
`, "	"];
    function E(A) {
      var h;
      const se = (h = A.clipboardData) == null ? void 0 : h.getData("Text");
      S(se);
    }
    function S(A) {
      if (!A)
        return;
      const se = z.some((h) => A.includes(h));
      if (!a.multiple || !se) {
        const h = a.options.filter((N) => a.match(N, A));
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
        let A = Fs(`#${a.id}-autocomplete li.active`);
        A && A.scrollIntoView(j);
      }, 0);
    }
    function le() {
      setTimeout(() => {
        let A = Fs(`#${a.id}-autocomplete li.active`);
        A && ("scrollIntoViewIfNeeded" in A ? A.scrollIntoViewIfNeeded(j) : A.scrollIntoView(j));
      }, 0);
    }
    function F(A) {
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
      _.value = T.value;
    }
    return Lt(k, Q), (A, se) => (o(), r("div", {
      id: `${A.id}-autocomplete`
    }, [
      d.value ? (o(), r("label", {
        key: 0,
        for: `${A.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, I(d.value), 9, r0)) : x("", !0),
      l("div", i0, [
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
        }, A.$attrs), null, 16, u0), [
          [_o, k.value]
        ]),
        l("button", {
          type: "button",
          onClick: se[1] || (se[1] = (h) => F(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, c0),
        n.value ? (o(), r("ul", {
          key: 0,
          class: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeydown: w,
          id: `${A.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Se, null, Ie(_.value, (h) => (o(), r("li", {
            class: y([h === p.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (N) => oe(h),
            onClick: (N) => W(h),
            role: "option",
            tabindex: "-1"
          }, [
            U(A.$slots, "item", Yt(As(h))),
            u(h) ? (o(), r("span", {
              key: 0,
              class: y(["absolute inset-y-0 right-0 flex items-center pr-4", h === p.value ? "text-white" : "text-indigo-600"])
            }, m0, 2)) : x("", !0)
          ], 42, v0))), 256))
        ], 40, f0)) : !A.multiple && A.modelValue ? (o(), r("div", {
          key: 1,
          onKeydown: w,
          onClick: se[2] || (se[2] = (h) => F(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          U(A.$slots, "item", Yt(As(A.modelValue)))
        ], 32)) : x("", !0),
        f.value ? (o(), r("div", h0, y0)) : x("", !0)
      ]),
      f.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${A.id}-error`
      }, I(f.value), 9, b0)) : A.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${A.id}-description`
      }, I(A.help), 9, w0)) : x("", !0)
    ], 8, a0));
  }
}), _0 = ["id", "name", "value"], $0 = { class: "block truncate" }, C0 = /* @__PURE__ */ ue({
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
      return o(), r(Se, null, [
        l("input", {
          type: "hidden",
          id: p.id,
          name: p.id,
          value: k.value
        }, null, 8, _0),
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
            b[0] || (b[0] = (T) => m.value = T),
            i
          ]
        }), {
          item: _e(({ key: T, value: R }) => [
            l("span", $0, I(R), 1)
          ]),
          _: 1
        }, 16, ["id", "options", "multiple", "modelValue"])
      ], 64);
    };
  }
}), x0 = /* @__PURE__ */ ue({
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
      var z, E, S, te, w, j, q, le, F, Z, W, Q, A, se, h, N, H, g, L, ee, Y, ae, O, V, ce, de, ie, pe;
      const $ = K("SelectInput"), k = K("CheckboxInput"), p = K("TagInput"), b = K("Combobox"), _ = K("FileInput"), T = K("TextareaInput"), R = K("MarkdownInput"), oe = K("TextInput");
      return J(X).component(a.value) ? (o(), ne(cn(J(X).component(a.value)), Ae({
        key: 0,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[0] || (m[0] = (M) => d.value = M),
        status: (z = f.api) == null ? void 0 : z.error,
        "input-class": (E = f.input.css) == null ? void 0 : E.input,
        "label-class": (S = f.input.css) == null ? void 0 : S.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), ne($, Ae({
        key: 1,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[1] || (m[1] = (M) => d.value = M),
        status: (te = f.api) == null ? void 0 : te.error,
        "input-class": (w = f.input.css) == null ? void 0 : w.input,
        "label-class": (j = f.input.css) == null ? void 0 : j.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), ne(k, Ae({
        key: 2,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[2] || (m[2] = (M) => d.value = M),
        status: (q = f.api) == null ? void 0 : q.error,
        "input-class": (le = f.input.css) == null ? void 0 : le.input,
        "label-class": (F = f.input.css) == null ? void 0 : F.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), ne(p, Ae({
        key: 3,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[3] || (m[3] = (M) => d.value = M),
        status: (Z = f.api) == null ? void 0 : Z.error,
        "input-class": (W = f.input.css) == null ? void 0 : W.input,
        "label-class": (Q = f.input.css) == null ? void 0 : Q.label,
        allowableValues: f.input.allowableValues,
        string: ((A = f.input.prop) == null ? void 0 : A.type) == "String"
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "allowableValues", "string"])) : a.value == "combobox" ? (o(), ne(b, Ae({
        key: 4,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[4] || (m[4] = (M) => d.value = M),
        status: (se = f.api) == null ? void 0 : se.error,
        "input-class": (h = f.input.css) == null ? void 0 : h.input,
        "label-class": (N = f.input.css) == null ? void 0 : N.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "file" ? (o(), ne(_, Ae({
        key: 5,
        id: f.input.id,
        status: (H = f.api) == null ? void 0 : H.error,
        modelValue: d.value,
        "onUpdate:modelValue": m[5] || (m[5] = (M) => d.value = M),
        "input-class": (g = f.input.css) == null ? void 0 : g.input,
        "label-class": (L = f.input.css) == null ? void 0 : L.label,
        files: c.value
      }, u.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), ne(T, Ae({
        key: 6,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[6] || (m[6] = (M) => d.value = M),
        status: (ee = f.api) == null ? void 0 : ee.error,
        "input-class": (Y = f.input.css) == null ? void 0 : Y.input,
        "label-class": (ae = f.input.css) == null ? void 0 : ae.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), ne(R, Ae({
        key: 7,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[7] || (m[7] = (M) => d.value = M),
        status: (O = f.api) == null ? void 0 : O.error,
        "input-class": (V = f.input.css) == null ? void 0 : V.input,
        "label-class": (ce = f.input.css) == null ? void 0 : ce.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), ne(oe, Ae({
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
}), L0 = { class: "lookup-field" }, V0 = ["name", "value"], M0 = {
  key: 0,
  class: "flex justify-between"
}, S0 = ["for"], A0 = {
  key: 0,
  class: "flex items-center"
}, F0 = { class: "text-sm text-gray-500 dark:text-gray-400 pr-1" }, T0 = /* @__PURE__ */ l("span", { class: "sr-only" }, "Clear", -1), I0 = /* @__PURE__ */ l("svg", {
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
], -1), D0 = [
  T0,
  I0
], j0 = {
  key: 1,
  class: "mt-1 relative"
}, O0 = { class: "w-full inline-flex truncate" }, P0 = { class: "text-blue-700 dark:text-blue-300 flex cursor-pointer" }, B0 = /* @__PURE__ */ l("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
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
], -1), H0 = ["id"], R0 = ["id"], E0 = /* @__PURE__ */ ue({
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
    const { config: s } = zt(), { metadataApi: n } = dt(), a = e, i = t, u = v(() => a.id || a.input.id), d = v(() => a.label ?? He(vt(u.value)));
    let c = We("ApiState", void 0);
    const f = We("client"), m = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, u.value)), $ = D(""), k = D(""), p = v(() => we(a.modelValue, u.value)), b = v(() => ot(a.metadataType).find((S) => S.name.toLowerCase() == u.value.toLowerCase())), _ = v(() => {
      var S, te, w;
      return ((w = pt((te = (S = b.value) == null ? void 0 : S.ref) == null ? void 0 : te.model)) == null ? void 0 : w.icon) || s.value.tableIcon;
    });
    function T(S) {
      return S ? a.input.options ? Object.assign({}, S, Rs(a.input.options, {
        input: a.input,
        $typeFields: ot(a.metadataType).map((te) => te.name),
        ...X.config.scopeWhitelist
      })) : S : null;
    }
    const R = v(() => {
      var S, te, w, j;
      return T(((S = b.value) == null ? void 0 : S.ref) ?? (a.input.type == "lookup" ? {
        model: a.metadataType.name,
        refId: ((te = ls(a.metadataType)) == null ? void 0 : te.name) ?? "id",
        refLabel: (j = (w = a.metadataType.properties) == null ? void 0 : w.find((q) => q.type == "String" && !q.isPrimaryKey)) == null ? void 0 : j.name
      } : null));
    });
    let oe;
    function z(S) {
      if (S) {
        if (oe == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        oe.openModal({ name: "ModalLookup", ref: S }, (te) => {
          if (console.debug("openModal", $.value, " -> ", te, Wt.setRefValue(S, te), S), te) {
            const w = we(te, S.refId);
            $.value = Wt.setRefValue(S, te) || w;
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
      var F, Z;
      oe = We("ModalProvider", void 0);
      const S = a.modelValue;
      a.modelValue[u.value] || (a.modelValue[u.value] = null);
      const te = b.value, w = R.value;
      if (!te || !w) {
        console.warn(`No RefInfo for property '${u.value}'`);
        return;
      }
      $.value = "";
      let j = w.selfId == null ? we(S, te.name) : we(S, w.selfId);
      const q = Xt(j);
      if (console.log("refIdValue", j, Xt(j), S, w), q && (j = we(S, w.refId)), j == null)
        return;
      const le = (F = n.value) == null ? void 0 : F.operations.find((W) => {
        var Q;
        return ((Q = W.dataModel) == null ? void 0 : Q.name) == w.model;
      });
      if (console.debug("LookupInput queryOp", le), le != null) {
        const W = we(S, te.name);
        if (Xt(W))
          return;
        if ($.value = `${W}`, k.value = te.name, w.refLabel != null) {
          const Q = ot(a.metadataType).filter((h) => h.type == w.model);
          Q.length || console.warn(`Could not find ${w.model} Property on ${a.metadataType.name}`);
          const A = Q.map((h) => we(S, h.name)).filter((h) => !!h), se = A.length <= 1 ? A[0] : A.find((h) => h[w.refId ?? "id"] == j);
          if (se != null) {
            let h = we(se, w.refLabel);
            h && ($.value = `${h}`, Wt.setValue(w.model, j, w.refLabel, h));
          } else {
            const h = ((Z = te.attributes) == null ? void 0 : Z.some((H) => H.name == "Computed")) == !0;
            let N = await Wt.getOrFetchValue(f, n.value, w.model, w.refId, w.refLabel, h, j);
            $.value = N || `${w.model}: ${$.value}`;
          }
        }
      }
    }), (S, te) => {
      const w = K("Icon");
      return o(), r("div", L0, [
        l("input", {
          type: "hidden",
          name: u.value,
          value: p.value
        }, null, 8, V0),
        d.value ? (o(), r("div", M0, [
          l("label", {
            for: u.value,
            class: y(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${S.labelClass ?? ""}`)
          }, I(d.value), 11, S0),
          p.value ? (o(), r("div", A0, [
            l("span", F0, I(p.value), 1),
            l("button", {
              onClick: E,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, D0)
          ])) : x("", !0)
        ])) : x("", !0),
        R.value ? (o(), r("div", j0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: te[0] || (te[0] = (j) => z(R.value)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", O0, [
              l("span", P0, [
                ge(w, {
                  class: "mr-1 w-5 h-5",
                  image: _.value
                }, null, 8, ["image"]),
                l("span", null, I($.value), 1)
              ])
            ]),
            B0
          ])
        ])) : x("", !0),
        m.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${u.value}-error`
        }, I(m.value), 9, H0)) : S.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${u.value}-description`
        }, I(S.help), 9, R0)) : x("", !0)
      ]);
    };
  }
}), N0 = /* @__PURE__ */ ue({
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
      const z = Be();
      (E = z == null ? void 0 : z.proxy) == null || E.$forceUpdate();
    }
    function u(z, E) {
      d(z.id, we(E, z.id));
    }
    function d(z, E) {
      n.modelValue[z] = E, a("update:modelValue", n.modelValue), i();
    }
    const { metadataApi: c, apiOf: f, typeOf: m, typeOfRef: $, createFormLayout: k, Crud: p } = dt(), b = v(() => n.type || Nt(n.modelValue)), _ = v(() => n.metaType ?? m(b.value)), T = v(() => {
      var z, E;
      return $((E = (z = c.value) == null ? void 0 : z.operations.find((S) => S.request.name == b.value)) == null ? void 0 : E.dataModel) || _.value;
    });
    function R() {
      const z = _.value;
      if (!z) {
        if (n.formLayout) {
          const q = n.formLayout.map((le) => {
            const F = { name: le.id, type: ja(le.type) }, Z = Object.assign({ prop: F }, le);
            return n.configureField && n.configureField(Z), Z;
          });
          return n.configureFormLayout && n.configureFormLayout(q), q;
        }
        throw new Error(`MetadataType for ${b.value} not found`);
      }
      const E = ot(z), S = T.value, te = n.formLayout ? Array.from(n.formLayout) : k(z), w = [], j = f(z.name);
      return te.forEach((q) => {
        var W;
        const le = E.find((Q) => Q.name == q.name);
        if (q.ignore)
          return;
        const F = ((W = S == null ? void 0 : S.properties) == null ? void 0 : W.find((Q) => {
          var A;
          return Q.name.toLowerCase() == ((A = q.name) == null ? void 0 : A.toLowerCase());
        })) ?? le, Z = Object.assign({ prop: F, op: j }, q);
        n.configureField && n.configureField(Z), w.push(Z);
      }), n.configureFormLayout && n.configureFormLayout(w), w;
    }
    const oe = () => R().filter((z) => z.type != "hidden").map((z) => z.id);
    return (z, E) => {
      var j;
      const S = K("ErrorSummary"), te = K("LookupInput"), w = K("DynamicInput");
      return o(), r(Se, null, [
        z.hideSummary ? x("", !0) : (o(), ne(S, {
          key: 0,
          status: (j = z.api) == null ? void 0 : j.error,
          except: oe()
        }, null, 8, ["status", "except"])),
        l("div", {
          class: y(z.flexClass)
        }, [
          l("div", {
            class: y(z.divideClass)
          }, [
            l("div", {
              class: y(z.spaceClass)
            }, [
              l("fieldset", {
                class: y(z.fieldsetClass)
              }, [
                (o(!0), r(Se, null, Ie(R(), (q) => {
                  var le, F, Z;
                  return o(), r("div", {
                    key: q.id,
                    class: y([
                      "w-full",
                      ((le = q.css) == null ? void 0 : le.field) ?? (q.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (q.type == "checkbox" ? " flex items-center" : "")),
                      q.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    q.type === "lookup" || ((F = q.prop) == null ? void 0 : F.ref) != null && q.type != "file" && !q.prop.isPrimaryKey ? (o(), ne(te, {
                      key: 0,
                      metadataType: T.value,
                      input: q,
                      modelValue: z.modelValue,
                      "onUpdate:modelValue": (W) => u(q, W),
                      status: (Z = z.api) == null ? void 0 : Z.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), ne(w, {
                      key: 1,
                      input: q,
                      modelValue: z.modelValue,
                      "onUpdate:modelValue": E[0] || (E[0] = (W) => z.$emit("update:modelValue", W)),
                      api: z.api
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
  function i({ message: b, errorCode: _, fieldName: T, errors: R }) {
    return _ || (_ = "Exception"), R || (R = []), s.value = T ? new Ys({
      errorCode: _,
      message: b,
      errors: [new en({ fieldName: T, errorCode: _, message: b })]
    }) : new Ys({ errorCode: _, message: b, errors: R });
  }
  function u({ fieldName: b, message: _, errorCode: T }) {
    if (T || (T = "Exception"), !s.value)
      i({ fieldName: b, message: _, errorCode: T });
    else {
      let R = new Ys(s.value);
      R.errors = [
        ...(R.errors || []).filter((oe) => {
          var z;
          return ((z = oe.fieldName) == null ? void 0 : z.toLowerCase()) !== (b == null ? void 0 : b.toLowerCase());
        }),
        new en({ fieldName: b, message: _, errorCode: T })
      ], s.value = R;
    }
  }
  async function d(b, _, T) {
    t.value = !0;
    let R = await a.api(Zt(b), _, T);
    return t.value = !1, n.value = R.response, s.value = R.error, R;
  }
  async function c(b, _, T) {
    t.value = !0;
    let R = await a.apiVoid(Zt(b), _, T);
    return t.value = !1, n.value = R.response, s.value = R.error, R;
  }
  async function f(b, _, T, R) {
    t.value = !0;
    let oe = await a.apiForm(Zt(b), _, T, R);
    return t.value = !1, n.value = oe.response, s.value = oe.error, oe;
  }
  async function m(b, _, T, R) {
    t.value = !0;
    let oe = await a.apiFormVoid(Zt(b), _, T, R);
    return t.value = !1, n.value = oe.response, s.value = oe.error, oe;
  }
  async function $(b, _, T, R) {
    return kn(a, b, _, T, R);
  }
  function k(b, _) {
    const T = D(new tt()), R = _n(async (oe) => {
      T.value = await a.api(oe);
    }, _ == null ? void 0 : _.delayMs);
    return Ss(async () => {
      const oe = b(), z = yl(Es(oe));
      z && (T.value = new tt({ response: z })), (_ == null ? void 0 : _.delayMs) === 0 ? T.value = await a.api(oe) : R(oe);
    }), (async () => T.value = await a.api(b(), _ == null ? void 0 : _.args, _ == null ? void 0 : _.method))(), T;
  }
  let p = { setError: i, addFieldError: u, loading: t, error: s, api: d, apiVoid: c, apiForm: f, apiFormVoid: m, swr: $, swrEffect: k, unRefs: Zt, setRef: bn };
  return ms("ApiState", p), p;
}
const z0 = { key: 0 }, U0 = { class: "text-red-700" }, q0 = /* @__PURE__ */ l("b", null, "type", -1), Q0 = { key: 0 }, K0 = { key: 2 }, Z0 = ["innerHTML"], W0 = /* @__PURE__ */ l("input", {
  type: "submit",
  class: "hidden"
}, null, -1), G0 = { class: "flex justify-end" }, J0 = /* @__PURE__ */ l("div", null, null, -1), X0 = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Y0 = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), ef = { class: "fixed inset-0 overflow-hidden" }, tf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, sf = { class: "flex-1" }, lf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, nf = { class: "flex items-start justify-between space-x-3" }, of = { class: "space-y-1" }, af = { key: 0 }, rf = { key: 2 }, uf = ["innerHTML"], df = { class: "flex h-7 items-center" }, cf = { class: "flex justify-end" }, ff = /* @__PURE__ */ ue({
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
    const _ = ys(), { getTypeName: T } = $n(), { typeOf: R, Crud: oe, createDto: z } = dt(), E = D(new tt()), S = v(() => n.panelClass || Ee.panelClass(n.formStyle)), te = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : Gt.formClass), w = v(() => n.headingClass || Ee.headingClass(n.formStyle)), j = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), q = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : Ee.buttonsClass), le = v(() => {
      var V;
      return n.type ? T(n.type) : (V = n.modelValue) != null && V.getTypeName ? n.modelValue.getTypeName() : null;
    }), F = v(() => n.metaType ?? R(le.value)), Z = () => n.modelValue || se(), W = D(Z()), Q = v(() => _.loading.value), A = v(() => {
      var V;
      return n.heading != null ? n.heading : ((V = F.value) == null ? void 0 : V.description) || He(le.value);
    });
    t({ forceUpdate: c, props: n, setModel: f, formFields: i, submit: N, close: ae, model: W });
    function se() {
      return typeof n.type == "string" ? z(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function h(V) {
      if (!V || V.tagName != "FORM") {
        console.error("Not a valid form", V);
        return;
      }
      const ce = se();
      let de = Ze(ce == null ? void 0 : ce.getMethod, (M) => typeof M == "function" ? M() : null) || "POST", ie = Ze(ce == null ? void 0 : ce.createResponse, (M) => typeof M == "function" ? M() : null) == null;
      const pe = n.jsconfig;
      if (hl.hasRequestBody(de)) {
        let M = new ce.constructor(), ve = new FormData(V);
        ie ? E.value = await _.apiFormVoid(M, ve, { jsconfig: pe }) : E.value = await _.apiForm(M, ve, { jsconfig: pe });
      } else {
        let M = new ce.constructor(Ho(W.value));
        console.debug("AutoForm.submit", M), ie ? E.value = await _.apiVoid(M, { jsconfig: pe }) : E.value = await _.api(M, { jsconfig: pe });
      }
      E.value.succeeded ? (a("success", E.value.response), ae()) : a("error", E.value.error);
    }
    async function N() {
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
      const de = K("AutoFormFields"), ie = K("FormLoading"), pe = K("PrimaryButton"), M = K("CloseButton"), ve = K("SecondaryButton"), Ce = K("ModalLookup");
      return o(), r("div", null, [
        F.value ? V.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(S.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: d,
            onSubmit: ce[0] || (ce[0] = qe((Fe) => h(Fe.target), ["prevent"])),
            autocomplete: "off",
            class: y(V.innerFormClass)
          }, [
            l("div", {
              class: y(V.bodyClass)
            }, [
              l("div", {
                class: y(V.headerClass)
              }, [
                V.$slots.heading ? (o(), r("div", Q0, [
                  U(V.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: y(w.value)
                }, I(A.value), 3)),
                V.$slots.subheading ? (o(), r("div", K0, [
                  U(V.$slots, "subheading")
                ])) : V.subHeading ? (o(), r("p", {
                  key: 3,
                  class: y(j.value)
                }, I(V.subHeading), 3)) : (Ve = F.value) != null && Ve.notes ? (o(), r("p", {
                  key: 4,
                  class: y(["notes", j.value]),
                  innerHTML: (he = F.value) == null ? void 0 : he.notes
                }, null, 10, Z0)) : x("", !0)
              ], 2),
              U(V.$slots, "header", {
                instance: (je = Be()) == null ? void 0 : je.exposed,
                model: W.value
              }),
              W0,
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
              var Fe, lt;
              return [
                l("div", {
                  class: y(q.value)
                }, [
                  l("div", null, [
                    U(V.$slots, "leftbuttons", {
                      instance: (Fe = Be()) == null ? void 0 : Fe.exposed,
                      model: W.value
                    })
                  ]),
                  l("div", null, [
                    V.showLoading && Q.value ? (o(), ne(ie, { key: 0 })) : x("", !0)
                  ]),
                  l("div", G0, [
                    J0,
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
        ], 2)) : (o(), r("div", X0, [
          Y0,
          l("div", ef, [
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
                    onSubmit: ce[1] || (ce[1] = qe((Fe) => h(Fe.target), ["prevent"]))
                  }, [
                    l("div", tf, [
                      l("div", sf, [
                        l("div", lf, [
                          l("div", nf, [
                            l("div", of, [
                              V.$slots.heading ? (o(), r("div", af, [
                                U(V.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(w.value)
                              }, I(A.value), 3)),
                              V.$slots.subheading ? (o(), r("div", rf, [
                                U(V.$slots, "subheading")
                              ])) : V.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(j.value)
                              }, I(V.subHeading), 3)) : (xe = F.value) != null && xe.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", j.value]),
                                innerHTML: (Qe = F.value) == null ? void 0 : Qe.notes
                              }, null, 10, uf)) : x("", !0)
                            ]),
                            l("div", df, [
                              ge(M, {
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
                      l("div", cf, [
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
        ])) : (o(), r("div", z0, [
          l("p", U0, [
            ke("Could not create form for unknown "),
            q0,
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
}), vf = { key: 0 }, pf = { class: "text-red-700" }, mf = /* @__PURE__ */ l("b", null, "type", -1), hf = { key: 0 }, gf = { key: 2 }, yf = ["innerHTML"], bf = { class: "flex justify-end" }, wf = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, kf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), _f = { class: "fixed inset-0 overflow-hidden" }, $f = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, Cf = { class: "flex-1" }, xf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Lf = { class: "flex items-start justify-between space-x-3" }, Vf = { class: "space-y-1" }, Mf = { key: 0 }, Sf = { key: 2 }, Af = ["innerHTML"], Ff = { class: "flex h-7 items-center" }, Tf = { class: "flex justify-end" }, If = /* @__PURE__ */ ue({
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
    const { typeOf: _, typeProperties: T, Crud: R, createDto: oe, formValues: z } = dt(), E = v(() => Nt(n.type)), S = v(() => _(E.value)), w = D((() => typeof n.type == "string" ? oe(n.type) : n.type ? new n.type() : null)());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: w });
    const j = v(() => n.panelClass || Ee.panelClass(n.formStyle)), q = v(() => n.formClass || Ee.formClass(n.formStyle)), le = v(() => n.headingClass || Ee.headingClass(n.formStyle)), F = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), Z = v(() => n.buttonsClass || Ee.buttonsClass), W = v(() => R.model(S.value)), Q = v(() => {
      var O;
      return n.heading || ((O = _(E.value)) == null ? void 0 : O.description) || (W.value ? `New ${He(W.value)}` : He(E.value));
    }), A = D(new tt());
    let se = ys(), h = v(() => se.loading.value);
    X.interceptors.has("AutoCreateForm.new") && X.interceptors.invoke("AutoCreateForm.new", { props: n, model: w });
    async function N(O) {
      var ie, pe;
      let V = O.target;
      if (!n.autosave) {
        a("save", new w.value.constructor(z(V, T(S.value))));
        return;
      }
      let ce = Ze((ie = w.value) == null ? void 0 : ie.getMethod, (M) => typeof M == "function" ? M() : null) || "POST", de = Ze((pe = w.value) == null ? void 0 : pe.createResponse, (M) => typeof M == "function" ? M() : null) == null;
      if (hl.hasRequestBody(ce)) {
        let M = new w.value.constructor(), ve = new FormData(V);
        de ? A.value = await se.apiFormVoid(M, ve, { jsconfig: "eccn" }) : A.value = await se.apiForm(M, ve, { jsconfig: "eccn" });
      } else {
        let M = z(V, T(S.value)), ve = new w.value.constructor(M);
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
      const ce = K("AutoFormFields"), de = K("FormLoading"), ie = K("SecondaryButton"), pe = K("PrimaryButton"), M = K("CloseButton"), ve = K("ModalLookup");
      return o(), r("div", null, [
        S.value ? O.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(j.value)
        }, [
          l("form", {
            onSubmit: qe(N, ["prevent"])
          }, [
            l("div", {
              class: y(q.value)
            }, [
              l("div", null, [
                O.$slots.heading ? (o(), r("div", hf, [
                  U(O.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: y(le.value)
                }, I(Q.value), 3)),
                O.$slots.subheading ? (o(), r("div", gf, [
                  U(O.$slots, "subheading")
                ])) : O.subHeading ? (o(), r("p", {
                  key: 3,
                  class: y(F.value)
                }, I(O.subHeading), 3)) : (Ce = S.value) != null && Ce.notes ? (o(), r("p", {
                  key: 4,
                  class: y(["notes", F.value]),
                  innerHTML: (Ve = S.value) == null ? void 0 : Ve.notes
                }, null, 10, yf)) : x("", !0)
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
              l("div", bf, [
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
        ], 2)) : (o(), r("div", wf, [
          kf,
          l("div", _f, [
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
                    onSubmit: qe(N, ["prevent"])
                  }, [
                    l("div", $f, [
                      l("div", Cf, [
                        l("div", xf, [
                          l("div", Lf, [
                            l("div", Vf, [
                              O.$slots.heading ? (o(), r("div", Mf, [
                                U(O.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(le.value)
                              }, I(Q.value), 3)),
                              O.$slots.subheading ? (o(), r("div", Sf, [
                                U(O.$slots, "subheading")
                              ])) : O.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(F.value)
                              }, I(O.subHeading), 3)) : (Oe = S.value) != null && Oe.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", F.value]),
                                innerHTML: (xe = S.value) == null ? void 0 : xe.notes
                              }, null, 10, Af)) : x("", !0)
                            ]),
                            l("div", Ff, [
                              ge(M, {
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
                      l("div", Tf, [
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
        ])) : (o(), r("div", vf, [
          l("p", pf, [
            ke("Could not create form for unknown "),
            mf,
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
}), Df = { key: 0 }, jf = { class: "text-red-700" }, Of = /* @__PURE__ */ l("b", null, "type", -1), Pf = { key: 0 }, Bf = { key: 2 }, Hf = ["innerHTML"], Rf = { class: "flex justify-end" }, Ef = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Nf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), zf = { class: "fixed inset-0 overflow-hidden" }, Uf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, qf = { class: "flex-1" }, Qf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Kf = { class: "flex items-start justify-between space-x-3" }, Zf = { class: "space-y-1" }, Wf = { key: 0 }, Gf = { key: 2 }, Jf = ["innerHTML"], Xf = { class: "flex h-7 items-center" }, Yf = { class: "flex justify-end" }, ev = /* @__PURE__ */ ue({
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
      const M = Be();
      (ve = M == null ? void 0 : M.proxy) == null || ve.$forceUpdate();
    }
    function c(M) {
      Object.assign(le.value, M);
    }
    function f(M) {
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = D(), k = D();
    function p(M, ve) {
      $.value = M, k.value = ve;
    }
    async function b(M) {
      k.value && k.value(M), $.value = void 0, k.value = void 0;
    }
    const { typeOf: _, apiOf: T, typeProperties: R, createFormLayout: oe, getPrimaryKey: z, Crud: E, createDto: S, formValues: te } = dt(), w = v(() => Nt(n.type)), j = v(() => _(w.value)), q = () => typeof n.type == "string" ? S(n.type, ds(n.modelValue)) : n.type ? new n.type(ds(n.modelValue)) : null, le = D(q());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: le });
    const F = v(() => n.panelClass || Ee.panelClass(n.formStyle)), Z = v(() => n.formClass || Ee.formClass(n.formStyle)), W = v(() => n.headingClass || Ee.headingClass(n.formStyle)), Q = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), A = v(() => E.model(j.value)), se = v(() => {
      var M;
      return n.heading || ((M = _(w.value)) == null ? void 0 : M.description) || (A.value ? `Update ${He(A.value)}` : He(w.value));
    }), h = D(new tt());
    let N = Object.assign({}, ds(n.modelValue));
    X.interceptors.has("AutoEditForm.new") && X.interceptors.invoke("AutoEditForm.new", { props: n, model: le, origModel: N });
    let H = ys(), g = v(() => H.loading.value);
    const L = () => Ze(_(E.model(j.value)), (M) => z(M));
    function ee(M) {
      const { op: ve, prop: Ce } = M;
      ve && (E.isPatch(ve) || E.isUpdate(ve)) && (M.disabled = Ce == null ? void 0 : Ce.isPrimaryKey), n.configureField && n.configureField(M);
    }
    async function Y(M) {
      var je, Oe;
      let ve = M.target;
      if (!n.autosave) {
        a("save", new le.value.constructor(te(ve, R(j.value))));
        return;
      }
      let Ce = Ze((je = le.value) == null ? void 0 : je.getMethod, (xe) => typeof xe == "function" ? xe() : null) || "POST", Ve = Ze((Oe = le.value) == null ? void 0 : Oe.createResponse, (xe) => typeof xe == "function" ? xe() : null) == null, he = L();
      if (hl.hasRequestBody(Ce)) {
        let xe = new le.value.constructor(), Qe = we(n.modelValue, he.name), Re = new FormData(ve);
        he && !Array.from(Re.keys()).some((Je) => Je.toLowerCase() == he.name.toLowerCase()) && Re.append(he.name, Qe);
        let Pe = [];
        const Ge = w.value && T(w.value);
        if (Ge && E.isPatch(Ge)) {
          let Je = oe(j.value), Fe = {};
          if (he && (Fe[he.name] = Qe), Je.forEach((Ne) => {
            let rt = Ne.id, B = we(N, rt);
            if (he && he.name.toLowerCase() === rt.toLowerCase())
              return;
            let G = Re.get(rt);
            X.interceptors.has("AutoEditForm.save.formLayout") && X.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: B, formLayout: Je, input: Ne, newValue: G });
            let be = G != null, De = Ne.type === "checkbox" ? be !== !!B : Ne.type === "file" ? be : G != B;
            !G && !B && (De = !1), De && (G ? Fe[rt] = G : Ne.type !== "file" && Pe.push(rt));
          }), X.interceptors.has("AutoEditForm.save") && X.interceptors.invoke("AutoEditForm.save", { origModel: N, formLayout: Je, dirtyValues: Fe }), Array.from(Re.keys()).filter((Ne) => !Fe[Ne]).forEach((Ne) => Re.delete(Ne)), Array.from(Re.keys()).filter((Ne) => Ne.toLowerCase() != he.name.toLowerCase()).length == 0 && Pe.length == 0) {
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
    async function ae(M) {
      let ve = L();
      const Ce = ve ? we(n.modelValue, ve.name) : null;
      if (!Ce) {
        console.error(`Could not find Primary Key for Type ${w.value} (${A.value})`);
        return;
      }
      const Ve = { [ve.name]: Ce }, he = typeof n.deleteType == "string" ? S(n.deleteType, Ve) : n.deleteType ? new n.deleteType(Ve) : null;
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
    const pe = (M) => {
      M.key === "Escape" && ie();
    };
    return at(() => window.addEventListener("keydown", pe)), Et(() => window.removeEventListener("keydown", pe)), (M, ve) => {
      var Re, Pe, Ge, st, Je, Fe, lt, Ne, rt;
      const Ce = K("AutoFormFields"), Ve = K("ConfirmDelete"), he = K("FormLoading"), je = K("SecondaryButton"), Oe = K("PrimaryButton"), xe = K("CloseButton"), Qe = K("ModalLookup");
      return o(), r("div", null, [
        j.value ? M.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(F.value)
        }, [
          l("form", {
            onSubmit: qe(Y, ["prevent"])
          }, [
            l("div", {
              class: y(Z.value)
            }, [
              l("div", null, [
                M.$slots.heading ? (o(), r("div", Pf, [
                  U(M.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: y(W.value)
                }, I(se.value), 3)),
                M.$slots.subheading ? (o(), r("div", Bf, [
                  U(M.$slots, "subheading")
                ])) : M.subHeading ? (o(), r("p", {
                  key: 3,
                  class: y(Q.value)
                }, I(M.subHeading), 3)) : (Re = j.value) != null && Re.notes ? (o(), r("p", {
                  key: 4,
                  class: y(["notes", Q.value]),
                  innerHTML: (Pe = j.value) == null ? void 0 : Pe.notes
                }, null, 10, Hf)) : x("", !0)
              ]),
              U(M.$slots, "header", {
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
                configureField: M.configureField,
                configureFormLayout: M.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              U(M.$slots, "footer", {
                formInstance: (st = Be()) == null ? void 0 : st.exposed,
                model: le.value
              })
            ], 2),
            l("div", {
              class: y(J(Ee).buttonsClass)
            }, [
              l("div", null, [
                M.deleteType ? (o(), ne(Ve, {
                  key: 0,
                  onDelete: ae
                })) : x("", !0)
              ]),
              l("div", null, [
                M.showLoading && J(g) ? (o(), ne(he, { key: 0 })) : x("", !0)
              ]),
              l("div", Rf, [
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
        ], 2)) : (o(), r("div", Ef, [
          Nf,
          l("div", zf, [
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
                    l("div", Uf, [
                      l("div", qf, [
                        l("div", Qf, [
                          l("div", Kf, [
                            l("div", Zf, [
                              M.$slots.heading ? (o(), r("div", Wf, [
                                U(M.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(W.value)
                              }, I(se.value), 3)),
                              M.$slots.subheading ? (o(), r("div", Gf, [
                                U(M.$slots, "subheading")
                              ])) : M.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(Q.value)
                              }, I(M.subHeading), 3)) : (Je = j.value) != null && Je.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", Q.value]),
                                innerHTML: (Fe = j.value) == null ? void 0 : Fe.notes
                              }, null, 10, Jf)) : x("", !0)
                            ]),
                            l("div", Xf, [
                              ge(xe, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: ie
                              })
                            ])
                          ])
                        ]),
                        U(M.$slots, "header", {
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
                          configureFormLayout: M.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        U(M.$slots, "footer", {
                          formInstance: (Ne = Be()) == null ? void 0 : Ne.exposed,
                          model: le.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: y(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        M.deleteType ? (o(), ne(Ve, {
                          key: 0,
                          onDelete: ae
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        M.showLoading && J(g) ? (o(), ne(he, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Yf, [
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
        ])) : (o(), r("div", Df, [
          l("p", jf, [
            ke("Could not create form for unknown "),
            Of,
            ke(" " + I(w.value), 1)
          ])
        ])),
        ((rt = $.value) == null ? void 0 : rt.name) == "ModalLookup" && $.value.ref ? (o(), ne(Qe, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: b,
          configureField: M.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ]);
    };
  }
}), tv = { key: 0 }, sv = { class: "text-red-700" }, lv = /* @__PURE__ */ l("b", null, "type", -1), nv = { key: 0 }, ov = { key: 2 }, av = ["innerHTML"], rv = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, iv = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), uv = { class: "fixed inset-0 overflow-hidden" }, dv = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, cv = { class: "flex-1" }, fv = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, vv = { class: "flex items-start justify-between space-x-3" }, pv = { class: "space-y-1" }, mv = { key: 0 }, hv = { key: 2 }, gv = ["innerHTML"], yv = { class: "flex h-7 items-center" }, bv = /* @__PURE__ */ l("div", { class: "flex justify-end" }, null, -1), wv = /* @__PURE__ */ ue({
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
      var F, Z;
      return s.heading || ((F = a(c.value)) == null ? void 0 : F.description) || ((Z = s.model) != null && Z.id ? `${He(c.value)} ${s.model.id}` : "View " + He(c.value));
    }), _ = D(new tt());
    Object.assign({}, ds(s.model)), X.interceptors.has("AutoViewForm.new") && X.interceptors.invoke("AutoViewForm.new", { props: s });
    let T = ys(), R = v(() => T.loading.value);
    const oe = () => Ze(f.value, (F) => i(F)), z = v(() => f.value);
    async function E(F) {
      let Z = oe();
      const W = Z ? we(s.model, Z.name) : null;
      if (!W) {
        console.error(`Could not find Primary Key for Type ${c.value} (${z.value})`);
        return;
      }
      const Q = { [Z.name]: W }, A = typeof s.deleteType == "string" ? d(s.deleteType, Q) : s.deleteType ? new s.deleteType(Q) : null;
      Ze(A.createResponse, (h) => typeof h == "function" ? h() : null) == null ? _.value = await T.apiVoid(A) : _.value = await T.api(A), _.value.succeeded ? n("delete", _.value.response) : n("error", _.value.error);
    }
    function S() {
      s.done && s.done();
    }
    const te = D(!1), w = D(""), j = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(te, () => {
      xt(j, w, te.value), te.value || setTimeout(S, 700);
    }), te.value = !0;
    function q() {
      s.formStyle == "slideOver" ? te.value = !1 : S();
    }
    const le = (F) => {
      F.key === "Escape" && q();
    };
    return at(() => window.addEventListener("keydown", le)), Et(() => window.removeEventListener("keydown", le)), (F, Z) => {
      var h, N, H, g;
      const W = K("MarkupModel"), Q = K("CloseButton"), A = K("ConfirmDelete"), se = K("FormLoading");
      return o(), r("div", null, [
        c.value ? F.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: y(m.value)
        }, [
          l("div", {
            class: y($.value)
          }, [
            l("div", null, [
              F.$slots.heading ? (o(), r("div", nv, [
                U(F.$slots, "heading")
              ])) : (o(), r("h3", {
                key: 1,
                class: y(k.value)
              }, I(b.value), 3)),
              F.$slots.subheading ? (o(), r("div", ov, [
                U(F.$slots, "subheading")
              ])) : F.subHeading ? (o(), r("p", {
                key: 3,
                class: y(p.value)
              }, I(F.subHeading), 3)) : (h = f.value) != null && h.notes ? (o(), r("p", {
                key: 4,
                class: y(["notes", p.value]),
                innerHTML: (N = f.value) == null ? void 0 : N.notes
              }, null, 10, av)) : x("", !0)
            ]),
            ge(W, { value: F.model }, null, 8, ["value"])
          ], 2)
        ], 2)) : (o(), r("div", rv, [
          iv,
          l("div", uv, [
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
                    l("div", dv, [
                      l("div", cv, [
                        l("div", fv, [
                          l("div", vv, [
                            l("div", pv, [
                              F.$slots.heading ? (o(), r("div", mv, [
                                U(F.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: y(k.value)
                              }, I(b.value), 3)),
                              F.$slots.subheading ? (o(), r("div", hv, [
                                U(F.$slots, "subheading")
                              ])) : F.subHeading ? (o(), r("p", {
                                key: 3,
                                class: y(p.value)
                              }, I(F.subHeading), 3)) : (H = f.value) != null && H.notes ? (o(), r("p", {
                                key: 4,
                                class: y(["notes", p.value]),
                                innerHTML: (g = f.value) == null ? void 0 : g.notes
                              }, null, 10, gv)) : x("", !0)
                            ]),
                            l("div", yv, [
                              ge(Q, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: q
                              })
                            ])
                          ])
                        ]),
                        ge(W, { value: F.model }, null, 8, ["value"])
                      ])
                    ]),
                    l("div", {
                      class: y(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        F.deleteType ? (o(), ne(A, {
                          key: 0,
                          onDelete: E
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        F.showLoading && J(R) ? (o(), ne(se, { key: 0 })) : x("", !0)
                      ]),
                      bv
                    ], 2)
                  ], 2)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", tv, [
          l("p", sv, [
            ke("Could not create view for unknown "),
            lv,
            ke(" " + I(c.value), 1)
          ])
        ]))
      ]);
    };
  }
}), kv = /* @__PURE__ */ l("label", {
  for: "confirmDelete",
  class: "ml-2 mr-2 select-none"
}, "confirm", -1), _v = /* @__PURE__ */ ue({
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
    return (u, d) => (o(), r(Se, null, [
      Pt(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": d[0] || (d[0] = (c) => un(s) ? s.value = c : s = c)
      }, null, 512), [
        [pl, J(s)]
      ]),
      kv,
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
}), $v = {
  class: "flex",
  title: "loading..."
}, Cv = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "24px",
  height: "30px",
  viewBox: "0 0 24 30"
}, xv = /* @__PURE__ */ Ds('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3), Lv = [
  xv
], Vv = { class: "ml-2 mt-1 text-gray-400" }, Mv = /* @__PURE__ */ ue({
  __name: "FormLoading",
  props: {
    icon: { type: Boolean, default: !0 },
    text: { default: "loading..." }
  },
  setup(e) {
    return We("ApiState", void 0), (t, s) => (o(), r("div", $v, [
      t.icon ? (o(), r("svg", Cv, Lv)) : x("", !0),
      l("span", Vv, I(t.text), 1)
    ]));
  }
}), Sv = ["onClick"], Av = {
  key: 3,
  class: "flex justify-between items-center"
}, Fv = { class: "mr-1 select-none" }, Tv = ["onClick"], Iv = /* @__PURE__ */ ue({
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
    const s = e, n = t, a = D(), i = D(null), u = (H) => i.value === H, d = js(), c = (H) => Object.keys(d).find((g) => g.toLowerCase() == H.toLowerCase() + "-header"), f = (H) => Object.keys(d).find((g) => g.toLowerCase() == H.toLowerCase()), m = v(() => nl(s.items).filter((H) => !!(d[H] || d[H + "-header"]))), { typeOf: $, typeProperties: k } = dt(), p = v(() => Nt(s.type)), b = v(() => $(p.value)), _ = v(() => k(b.value));
    function T(H) {
      const g = s.headerTitles && we(s.headerTitles, H) || H;
      return s.headerTitle ? s.headerTitle(g) : mn(g);
    }
    function R(H) {
      const g = H.toLowerCase();
      return _.value.find((L) => L.name.toLowerCase() == g);
    }
    function oe(H) {
      const g = R(H);
      return g != null && g.format ? g.format : (g == null ? void 0 : g.type) == "TimeSpan" || (g == null ? void 0 : g.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const z = {
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
      return g && Ze(z[g], (L) => `hidden ${L}`);
    }
    const S = v(() => s.gridClass ?? me.getGridClass(s.tableStyle)), te = v(() => s.grid2Class ?? me.getGrid2Class(s.tableStyle)), w = v(() => s.grid3Class ?? me.getGrid3Class(s.tableStyle)), j = v(() => s.grid4Class ?? me.getGrid4Class(s.tableStyle)), q = v(() => s.tableClass ?? me.getTableClass(s.tableStyle)), le = v(() => s.tbodyClass ?? me.getTbodyClass(s.tbodyClass)), F = v(() => s.theadClass ?? me.getTheadClass(s.tableStyle)), Z = v(() => s.theadRowClass ?? me.getTheadRowClass(s.tableStyle)), W = v(() => s.theadCellClass ?? me.getTheadCellClass(s.tableStyle));
    function Q(H, g) {
      return s.rowClass ? s.rowClass(H, g) : me.getTableRowClass(s.tableStyle, g, !!(s.isSelected && s.isSelected(H)), s.isSelected != null);
    }
    function A(H, g) {
      return s.rowStyle ? s.rowStyle(H, g) : void 0;
    }
    const se = v(() => {
      const H = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (m.value.length > 0 ? m.value : nl(s.items)), g = _.value.reduce((L, ee) => (L[ee.name.toLowerCase()] = ee.format, L), {});
      return H.filter((L) => {
        var ee;
        return ((ee = g[L.toLowerCase()]) == null ? void 0 : ee.method) != "hidden";
      });
    });
    function h(H, g) {
      n("headerSelected", g, H);
    }
    function N(H, g, L) {
      n("rowSelected", L, H);
    }
    return (H, g) => {
      const L = K("CellFormat"), ee = K("PreviewFormat");
      return H.items.length ? (o(), r("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: y(S.value)
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
                  class: y(F.value)
                }, [
                  l("tr", {
                    class: y(Z.value)
                  }, [
                    (o(!0), r(Se, null, Ie(se.value, (Y) => (o(), r("td", {
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
                          label: T(Y)
                        }) : (o(), r("div", Av, [
                          l("span", Fv, I(T(Y)), 1)
                        ]))
                      ], 8, Sv)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: y(le.value)
                }, [
                  (o(!0), r(Se, null, Ie(H.items, (Y, ae) => (o(), r("tr", {
                    class: y(Q(Y, ae)),
                    style: vl(A(Y, ae)),
                    onClick: (O) => N(O, ae, Y)
                  }, [
                    (o(!0), r(Se, null, Ie(se.value, (O) => (o(), r("td", {
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
                  ], 14, Tv))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : x("", !0);
    };
  }
}), Dv = ue({
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
      const a = n(e.propType), i = we(e.modelValue, e.propType.name), u = Object.assign({}, e, t), d = Ft("span", { innerHTML: ps(i, a, u) }), c = Xt(i) && Array.isArray(i) ? Ft("span", {}, [
        Ft("span", { class: "mr-2" }, `${i.length}`),
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
      const b = s(f.model), _ = b == null ? void 0 : b.icon, T = _ ? Ft(no, { image: _, class: "w-5 h-5 mr-1" }) : null;
      return Ft("span", { class: "flex", title: `${f.model} ${i}` }, [
        T,
        p
      ]);
    };
  }
}), jv = { key: 0 }, Ov = {
  key: 0,
  class: "mr-2"
}, Pv = ["innerHTML"], Bv = ["innerHTML"], Hv = {
  inheritAttrs: !1
}, Rv = /* @__PURE__ */ ue({
  ...Hv,
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
    return (n, a) => J(Xt)(n.value) ? (o(), r("span", jv, [
      n.includeCount && s.value ? (o(), r("span", Ov, I(n.value.length), 1)) : x("", !0),
      l("span", {
        innerHTML: J(ps)(n.value, n.format, n.$attrs)
      }, null, 8, Pv)
    ])) : (o(), r("span", {
      key: 1,
      innerHTML: J(ps)(n.value, n.format, n.$attrs)
    }, null, 8, Bv));
  }
}), Ev = ["innerHTML"], Nv = { key: 0 }, zv = /* @__PURE__ */ l("b", null, null, -1), Uv = { key: 2 }, qv = /* @__PURE__ */ ue({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Ht(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => mn(c), i = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, u = v(() => nl(t.value)), d = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const m = K("HtmlFormat", !0);
      return o(), r("div", {
        class: y(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), r("div", {
          key: 0,
          innerHTML: J(ps)(c.value)
        }, null, 8, Ev)) : n.value ? (o(), r("div", {
          key: 1,
          class: y(c.classes("array", "div", c.depth, J(me).gridClass))
        }, [
          J(Ht)(c.value[0]) ? (o(), r("div", Nv, "[ " + I(c.value.join(", ")) + " ]", 1)) : (o(), r("div", {
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
                      (o(!0), r(Se, null, Ie(u.value, ($) => (o(), r("th", {
                        class: y(c.classes("array", "th", c.depth, J(me).theadCellClass + " whitespace-nowrap"))
                      }, [
                        zv,
                        ke(I(a($)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), r(Se, null, Ie(c.value, ($, k) => (o(), r("tr", {
                      class: y(c.classes("array", "tr", c.depth, k % 2 == 0 ? "bg-white" : "bg-gray-50", k))
                    }, [
                      (o(!0), r(Se, null, Ie(u.value, (p) => (o(), r("td", {
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
        ], 2)) : (o(), r("div", Uv, [
          l("table", {
            class: y(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), r(Se, null, Ie(d(c.value), ($) => (o(), r("tr", {
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
}), Qv = ["href"], Kv = ["href", "title"], Zv = /* @__PURE__ */ ue({
  __name: "MarkupFormat",
  props: {
    value: {},
    imageClass: { default: "w-8 h-8" }
  },
  setup(e) {
    const t = e, { getMimeType: s } = Ma(), n = t.value;
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
      }, I(u.value), 9, Qv)) : J(a) == "image" ? (o(), r("a", {
        key: 1,
        href: u.value,
        title: u.value,
        class: "inline-block"
      }, [
        ge(c, {
          src: u.value,
          class: y(u.imageClass)
        }, null, 8, ["src", "class"])
      ], 8, Kv)) : (o(), ne(f, {
        key: 2,
        value: u.value
      }, null, 8, ["value"]));
    };
  }
}), Wv = { class: "my-2 w-full" }, Gv = { class: "leading-7" }, Jv = { class: "px-2 text-left align-top" }, Xv = { colspan: "align-top" }, Yv = { class: "my-2 leading-7" }, ep = {
  colspan: "2",
  class: "px-2 bg-indigo-700 text-white"
}, tp = { class: "leading-7" }, sp = {
  colspan: "2",
  class: "px-2 align-top"
}, lp = /* @__PURE__ */ ue({
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
      return o(), r("table", Wv, [
        (o(), r(Se, null, Ie(n, (c, f) => l("tr", Gv, [
          l("th", Jv, I(J(He)(f)), 1),
          l("td", Xv, [
            ge(d, { value: c }, null, 8, ["value"])
          ])
        ])), 64)),
        (o(), r(Se, null, Ie(a, (c, f) => (o(), r(Se, null, [
          l("tr", Yv, [
            l("td", ep, I(J(He)(f)), 1)
          ]),
          l("tr", tp, [
            l("td", sp, [
              ge(d, { value: c }, null, 8, ["value"])
            ])
          ])
        ], 64))), 64))
      ]);
    };
  }
}), np = { class: "absolute top-0 right-0 pt-4 pr-4" }, op = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), ap = /* @__PURE__ */ l("svg", {
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
], -1), rp = [
  op,
  ap
], ip = /* @__PURE__ */ ue({
  __name: "CloseButton",
  props: {
    buttonClass: { default: "bg-white dark:bg-black" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    return (s, n) => (o(), r("div", np, [
      l("button", {
        type: "button",
        onClick: n[0] || (n[0] = (a) => s.$emit("close")),
        class: y([s.buttonClass, "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
      }, rp, 2)
    ]));
  }
}), up = ["id", "aria-labelledby"], dp = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), cp = { class: "fixed inset-0 overflow-hidden" }, fp = { class: "flex h-full flex-col bg-white dark:bg-black shadow-xl" }, vp = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, pp = { class: "flex-1" }, mp = { class: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, hp = { class: "flex items-start justify-between space-x-3" }, gp = { class: "space-y-1" }, yp = { key: 0 }, bp = ["id"], wp = {
  key: 2,
  class: "text-sm text-gray-500"
}, kp = { class: "flex h-7 items-center" }, _p = {
  key: 0,
  class: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6"
}, $p = /* @__PURE__ */ ue({
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
        dp,
        l("div", cp, [
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
                l("div", fp, [
                  l("div", vp, [
                    l("div", pp, [
                      l("div", mp, [
                        l("div", hp, [
                          l("div", gp, [
                            c.$slots.title ? (o(), r("div", yp, [
                              U(c.$slots, "title")
                            ])) : x("", !0),
                            c.title ? (o(), r("h2", {
                              key: 1,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, I(c.title), 9, bp)) : x("", !0),
                            c.$slots.subtitle ? (o(), r("p", wp, [
                              U(c.$slots, "subtitle")
                            ])) : x("", !0)
                          ]),
                          l("div", kp, [
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
                  c.$slots.footer ? (o(), r("div", _p, [
                    U(c.$slots, "footer")
                  ])) : x("", !0)
                ])
              ], 2)
            ], 32)
          ], 32)
        ])
      ], 8, up);
    };
  }
}), Cp = ["id", "data-transition-for", "aria-labelledby"], xp = { class: "fixed inset-0 z-10 overflow-y-auto" }, Lp = { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, Vp = {
  key: 1,
  class: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10"
}, Mp = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), Sp = /* @__PURE__ */ l("svg", {
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
], -1), Ap = [
  Mp,
  Sp
], Fp = /* @__PURE__ */ ue({
  __name: "ModalDialog",
  props: {
    id: { default: "ModalDialog" },
    modalClass: { default: fl.modalClass },
    sizeClass: { default: fl.sizeClass },
    closeButtonClass: { default: "bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black" },
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = js(), n = t, a = D(!1), i = D(""), u = {
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
    function p(T, R) {
      $.value = T, k.value = R;
    }
    async function b(T) {
      k.value && k.value(T), $.value = void 0, k.value = void 0;
    }
    const _ = (T) => {
      T.key === "Escape" && f();
    };
    return at(() => window.addEventListener("keydown", _)), Et(() => window.removeEventListener("keydown", _)), (T, R) => {
      var z;
      const oe = K("ModalLookup");
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
          class: y(["fixed inset-0 bg-gray-500/75 transition-opacity", i.value])
        }, null, 2),
        l("div", xp, [
          l("div", Lp, [
            l("div", {
              class: y([T.modalClass, T.sizeClass, d.value]),
              onMousedown: R[0] || (R[0] = qe(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                J(s).closebutton ? U(T.$slots, "createform", { key: 0 }) : (o(), r("div", Vp, [
                  l("button", {
                    type: "button",
                    onClick: f,
                    class: y(T.closeButtonClass)
                  }, Ap, 2)
                ])),
                U(T.$slots, "default")
              ])
            ], 34),
            U(T.$slots, "bottom")
          ])
        ]),
        ((z = $.value) == null ? void 0 : z.name) == "ModalLookup" && $.value.ref ? (o(), ne(oe, {
          key: 0,
          "ref-info": $.value.ref,
          onDone: b,
          configureField: T.configureField
        }, null, 8, ["ref-info", "configureField"])) : x("", !0)
      ], 40, Cp);
    };
  }
}), Tp = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Ip = { class: "mt-3 pl-5 flex flex-wrap items-center" }, Dp = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, jp = { class: "hidden md:inline" }, Op = { class: "flex pb-1 sm:pb-0" }, Pp = ["title"], Bp = /* @__PURE__ */ l("svg", {
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
], -1), Hp = [
  Bp
], Rp = ["disabled"], Ep = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), Np = [
  Ep
], zp = ["disabled"], Up = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
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
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), Zp = [
  Kp
], Wp = ["disabled"], Gp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Jp = [
  Gp
], Xp = {
  key: 0,
  class: "flex pb-1 sm:pb-0"
}, Yp = { class: "px-4 text-lg text-black dark:text-white" }, em = { key: 0 }, tm = { key: 1 }, sm = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), lm = { key: 2 }, nm = {
  key: 1,
  class: "pl-2 mt-1"
}, om = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), am = { class: "whitespace-nowrap" }, rm = {
  key: 2,
  class: "pl-2"
}, im = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), um = [
  im
], dm = { class: "flex pb-1 sm:pb-0" }, cm = {
  key: 0,
  class: "pl-2"
}, fm = /* @__PURE__ */ l("svg", {
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
], -1), vm = { class: "mr-1" }, pm = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, mm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), hm = [
  mm
], gm = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, ym = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), bm = [
  ym
], wm = { key: 1 }, km = { key: 4 }, _m = { key: 0 }, $m = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, Cm = { class: "mr-1 select-none" }, xm = {
  key: 1,
  class: "flex justify-between items-center"
}, Lm = { class: "mr-1 select-none" }, rn = 25, Vm = /* @__PURE__ */ ue({
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
    const s = e, n = t, a = js(), { config: i } = zt(), { metadataApi: u, filterDefinitions: d } = dt(), c = We("client"), f = i.value.storage, m = v(() => s.toolbarButtonClass ?? me.toolbarButtonClass), $ = v(() => d.value), k = D({ take: rn }), p = D(new tt()), b = D(s.skip), _ = D(!1), T = D(), R = (B) => typeof B == "string" ? B.split(",") : B || [];
    function oe(B, G) {
      return me.getTableRowClass("fullWidth", G, !1, !0);
    }
    function z() {
      let B = R(s.selectedColumns);
      return B.length > 0 ? B : [];
    }
    const E = v(() => pt(s.refInfo.model)), S = v(() => {
      let G = z().map((De) => De.toLowerCase());
      const be = ot(E.value);
      return G.length > 0 ? G.map((De) => be.find((Ye) => Ye.name.toLowerCase() === De)).filter((De) => De != null) : be;
    }), te = v(() => {
      let B = S.value.map((be) => be.name), G = R(k.value.selectedColumns).map((be) => be.toLowerCase());
      return G.length > 0 ? B.filter((be) => G.includes(be.toLowerCase())) : B;
    }), w = v(() => k.value.take ?? rn), j = v(() => p.value.response ? we(p.value.response, "results") : []), q = v(() => {
      var B;
      return ((B = p.value.response) == null ? void 0 : B.total) ?? j.value.length ?? 0;
    }), le = v(() => b.value > 0), F = v(() => b.value > 0), Z = v(() => j.value.length >= w.value), W = v(() => j.value.length >= w.value), Q = D([]), A = v(() => Q.value.some((B) => B.settings.filters.length > 0 || !!B.settings.sort)), se = v(() => Q.value.map((B) => B.settings.filters.length).reduce((B, G) => B + G, 0)), h = v(() => ls(E.value)), N = v(() => {
      var B;
      return (B = u.value) == null ? void 0 : B.operations.find((G) => {
        var be;
        return ((be = G.dataModel) == null ? void 0 : be.name) == s.refInfo.model && Ke.isAnyQuery(G);
      });
    }), H = D(), g = D(!1), L = D(), ee = v(() => Nt(s.refInfo.model)), Y = v(() => Rt.forType(ee.value, u.value)), ae = v(() => {
      var B;
      return ee.value || ((B = N.value) == null ? void 0 : B.dataModel.name);
    }), O = v(() => s.modelTitle || ae.value), V = v(() => s.newButtonLabel || `New ${O.value}`), ce = v(() => cs(Y.value.Create)), de = D(), ie = D(!1);
    function pe() {
      ie.value = !0;
    }
    function M() {
      ie.value = !1;
    }
    async function ve(B) {
      M(), n("done", B);
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
      b.value > G && (b.value = G), await Fe();
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
        let bt = (De = be == null ? void 0 : be.closest("TABLE")) == null ? void 0 : De.getBoundingClientRect(), $t = Q.value.find((Me) => Me.name.toLowerCase() == B.toLowerCase());
        if ($t && bt) {
          let Me = 318, Ut = (((Ye = G.target) == null ? void 0 : Ye.tagName) === "DIV" ? G.target : (ct = G.target) == null ? void 0 : ct.closest("DIV")).getBoundingClientRect(), qt = Me + 25;
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
      G && (G.settings = B, f.setItem(je(G.name), JSON.stringify(G.settings)), await Fe()), L.value = null;
    }
    async function st(B) {
      f.setItem(je(B.name), JSON.stringify(B.settings)), await Fe();
    }
    async function Je(B) {
      g.value = !1, k.value = B, f.setItem(he(), JSON.stringify(B)), await Fe();
    }
    async function Fe() {
      await lt(Ne());
    }
    async function lt(B) {
      const G = N.value;
      if (!G) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let be = fs(G, B), De = pn((bt) => {
        p.value.response = p.value.error = void 0, _.value = bt;
      }), Ye = await c.api(be);
      De(), Ot(() => p.value = Ye);
      let ct = we(Ye.response, "results") || [];
      !Ye.succeeded || ct.label == 0;
    }
    function Ne() {
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
      }), await Fe();
    }
    return at(async () => {
      const B = s.prefs || Ts(f.getItem(he()));
      B && (k.value = B), Q.value = S.value.map((G) => ({
        name: G.name,
        type: G.type,
        meta: G,
        settings: Object.assign(
          {
            filters: []
          },
          Ts(f.getItem(je(G.name)))
        )
      })), isNaN(s.skip) || (b.value = s.skip), await Fe();
    }), (B, G) => {
      const be = K("AutoCreateForm"), De = K("ErrorSummary"), Ye = K("Loading"), ct = K("SettingsIcons"), bt = K("DataGrid"), $t = K("ModalDialog");
      return o(), r(Se, null, [
        B.refInfo ? (o(), ne($t, {
          key: 0,
          ref_key: "modalDialog",
          ref: H,
          id: B.id,
          onDone: Qe
        }, {
          default: _e(() => [
            l("div", Tp, [
              l("div", Ip, [
                l("h3", Dp, [
                  ke(" Select "),
                  l("span", jp, I(J(He)(B.refInfo.model)), 1)
                ]),
                l("div", Op, [
                  B.showPreferences ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${B.refInfo.model} Preferences`,
                    onClick: G[0] || (G[0] = (Me) => g.value = !g.value)
                  }, Hp, 8, Pp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: y(["pl-2", le.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !le.value,
                    onClick: G[1] || (G[1] = (Me) => Oe(-q.value))
                  }, Np, 10, Rp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 2,
                    type: "button",
                    class: y(["pl-2", F.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !F.value,
                    onClick: G[2] || (G[2] = (Me) => Oe(-w.value))
                  }, qp, 10, zp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 3,
                    type: "button",
                    class: y(["pl-2", Z.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !Z.value,
                    onClick: G[3] || (G[3] = (Me) => Oe(w.value))
                  }, Zp, 10, Qp)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 4,
                    type: "button",
                    class: y(["pl-2", W.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !W.value,
                    onClick: G[4] || (G[4] = (Me) => Oe(q.value))
                  }, Jp, 10, Wp)) : x("", !0)
                ]),
                B.showPagingInfo ? (o(), r("div", Xp, [
                  l("div", Yp, [
                    _.value ? (o(), r("span", em, "Querying...")) : x("", !0),
                    j.value.length ? (o(), r("span", tm, [
                      sm,
                      ke(" " + I(b.value + 1) + " - " + I(Math.min(b.value + j.value.length, q.value)) + " ", 1),
                      l("span", null, " of " + I(q.value), 1)
                    ])) : p.value.completed ? (o(), r("span", lm, "No Results")) : x("", !0)
                  ])
                ])) : x("", !0),
                Y.value.Create && ce.value ? (o(), r("div", nm, [
                  l("button", {
                    type: "button",
                    onClick: G[5] || (G[5] = (Me) => pe()),
                    title: "modelTitle",
                    class: y(J(me).toolbarButtonClass)
                  }, [
                    om,
                    l("span", am, I(V.value), 1)
                  ], 2),
                  ie.value ? (o(), ne(be, {
                    key: 0,
                    ref_key: "createForm",
                    ref: de,
                    type: Y.value.Create.request.name,
                    configure: B.configureField,
                    onDone: M,
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
                A.value && B.showResetPreferences ? (o(), r("div", rm, [
                  l("button", {
                    type: "button",
                    onClick: rt,
                    title: "Reset Preferences & Filters",
                    class: y(m.value)
                  }, um, 2)
                ])) : x("", !0),
                l("div", dm, [
                  B.showFiltersView && se.value > 0 ? (o(), r("div", cm, [
                    l("button", {
                      type: "button",
                      onClick: G[6] || (G[6] = (Me) => T.value = T.value == "filters" ? null : "filters"),
                      class: y(m.value),
                      "aria-expanded": "false"
                    }, [
                      fm,
                      l("span", vm, I(se.value) + " " + I(se.value == 1 ? "Filter" : "Filters"), 1),
                      T.value != "filters" ? (o(), r("svg", pm, hm)) : (o(), r("svg", gm, bm))
                    ], 2)
                  ])) : x("", !0)
                ])
              ]),
              T.value == "filters" ? (o(), ne(Rl, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: $.value,
                columns: Q.value,
                onDone: G[7] || (G[7] = (Me) => T.value = null),
                onChange: st
              }, null, 8, ["definitions", "columns"])) : x("", !0),
              L.value ? (o(), r("div", wm, [
                ge(Hl, {
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
              }, null, 8, ["status"])) : _.value ? (o(), ne(Ye, { key: 3 })) : (o(), r("div", km, [
                j.value.length ? (o(), r("div", _m, [
                  ge(bt, {
                    id: B.id,
                    items: j.value,
                    type: B.refInfo.model,
                    "selected-columns": te.value,
                    onFiltersChanged: Fe,
                    tableStyle: "fullWidth",
                    rowClass: oe,
                    onRowSelected: xe,
                    onHeaderSelected: Re
                  }, ml({
                    header: _e(({ column: Me, label: Vt }) => {
                      var Ut;
                      return [
                        B.allowFiltering && (!s.canFilter || s.canFilter(Me)) ? (o(), r("div", $m, [
                          l("span", Cm, I(Vt), 1),
                          ge(ct, {
                            column: Q.value.find((qt) => qt.name.toLowerCase() === Me.toLowerCase()),
                            "is-open": ((Ut = L.value) == null ? void 0 : Ut.column.name) === Me
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), r("div", xm, [
                          l("span", Lm, I(Vt), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    Ie(Object.keys(J(a)), (Me) => ({
                      name: Me,
                      fn: _e((Vt) => [
                        U(B.$slots, Me, Yt(As(Vt)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : x("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : x("", !0),
        g.value ? (o(), ne(El, {
          key: 1,
          columns: S.value,
          prefs: k.value,
          onDone: G[8] || (G[8] = (Me) => g.value = !1),
          onSave: Je
        }, null, 8, ["columns", "prefs"])) : x("", !0)
      ], 64);
    };
  }
}), Mm = { class: "sm:hidden" }, Sm = ["for"], Am = ["id", "name"], Fm = ["value"], Tm = { class: "hidden sm:block" }, Im = { class: "border-b border-gray-200" }, Dm = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, jm = ["onClick"], Om = /* @__PURE__ */ ue({
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
        gl({ tab: m === $ ? void 0 : m }, t.clearQuery);
      }
    }
    function c(m) {
      return u.value === m;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return at(() => {
      if (u.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const m = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "", k = ll(m)[i.value];
        k && (u.value = k);
      }
    }), (m, $) => (o(), r("div", null, [
      l("div", Mm, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, Sm),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: $[0] || ($[0] = (k) => {
            var p;
            return d((p = k.target) == null ? void 0 : p.value);
          })
        }, [
          (o(!0), r(Se, null, Ie(s.value, (k) => (o(), r("option", {
            key: k,
            value: k
          }, I(n(k)), 9, Fm))), 128))
        ], 40, Am)
      ]),
      l("div", Tm, [
        l("div", Im, [
          l("nav", Dm, [
            (o(!0), r(Se, null, Ie(s.value, (k) => (o(), r("a", {
              href: "#",
              onClick: qe((p) => d(k), ["prevent"]),
              style: vl({ width: f.value }),
              class: y([c(k) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", m.tabClass])
            }, I(n(k)), 15, jm))), 256))
          ])
        ])
      ]),
      l("div", {
        class: y(m.bodyClass)
      }, [
        (o(), ne(cn(m.tabs[u.value])))
      ], 2)
    ]));
  }
}), Pm = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-gray-400",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
  })
], -1), Bm = [
  Pm
], Hm = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-indigo-600",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
  })
], -1), Rm = [
  Hm
], Em = /* @__PURE__ */ ue({
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
        }, Bm, 2),
        l("span", {
          class: y(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Rm, 2)
      ], 2)
    ]));
  }
}), Nm = { key: 0 }, zm = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, Um = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, qm = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50" }, Qm = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600 dark:text-gray-300"
}, Km = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, Zm = ["onClick"], Wm = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, Gm = { class: "bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10" }, Jm = { class: "mt-8" }, Xm = {
  key: 1,
  class: "mt-6"
}, Ym = /* @__PURE__ */ Ds('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300 dark:border-gray-600"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500 dark:text-gray-400"> Or continue with </span></div></div>', 1), e1 = { class: "mt-6 grid grid-cols-3 gap-3" }, t1 = ["href", "title"], s1 = {
  key: 1,
  class: "h-5 w-5 text-gray-700 dark:text-gray-200",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, l1 = /* @__PURE__ */ l("path", {
  d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z",
  fill: "currentColor"
}, null, -1), n1 = /* @__PURE__ */ l("path", {
  d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z",
  fill: "currentColor"
}, null, -1), o1 = [
  l1,
  n1
], a1 = /* @__PURE__ */ ue({
  __name: "SignIn",
  props: {
    provider: {},
    title: { default: "Sign In" },
    tabs: { type: [Boolean, String], default: !0 },
    oauth: { type: [Boolean, String], default: !0 }
  },
  emits: ["login"],
  setup(e, { emit: t }) {
    const s = e, n = t, { getMetadata: a, createDto: i } = dt(), u = ys(), d = We("client"), { signIn: c } = Bl(), f = a({ assert: !0 }), m = f.plugins.auth, $ = document.baseURI, k = f.app.baseUrl, p = D(i("Authenticate")), b = D(new tt()), _ = D(s.provider);
    at(() => {
      m == null || m.authProviders.map((F) => F.formLayout).filter((F) => F).forEach((F) => F.forEach(
        (Z) => p.value[Z.id] = Z.type === "checkbox" ? !1 : ""
      ));
    });
    const T = v(() => (m == null ? void 0 : m.authProviders.filter((F) => F.formLayout)) || []), R = v(() => T.value[0] || {}), oe = v(() => T.value[Math.max(T.value.length - 1, 0)] || {}), z = v(() => (_.value ? m == null ? void 0 : m.authProviders.find((F) => F.name === _.value) : null) ?? R.value), E = (F) => F === !1 || F === "false";
    function S(F) {
      return F.label || F.navItem && F.navItem.label;
    }
    const te = v(() => {
      var F;
      return (((F = z.value) == null ? void 0 : F.formLayout) || []).map((Z) => {
        var W, Q;
        return Object.assign({}, Z, {
          type: (W = Z.type) == null ? void 0 : W.toLowerCase(),
          autocomplete: Z.autocomplete || (((Q = Z.type) == null ? void 0 : Q.toLowerCase()) === "password" ? "current-password" : void 0) || (Z.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, Z.css)
        });
      });
    }), w = v(() => E(s.oauth) ? [] : (m == null ? void 0 : m.authProviders.filter((F) => F.type === "oauth")) || []), j = v(() => {
      let F = Ro(
        m == null ? void 0 : m.authProviders.filter((W) => W.formLayout && W.formLayout.length > 0),
        (W, Q) => {
          let A = S(Q) || vt(Q.name);
          W[A] = Q.name === R.value.name ? "" : Q.name;
        }
      );
      const Z = z.value;
      return Z && E(s.tabs) && (F = { [S(Z) || vt(Z.name)]: Z }), F;
    }), q = v(() => {
      let F = te.value.map((Z) => Z.id).filter((Z) => Z);
      return b.value.summaryMessage(F);
    });
    async function le() {
      if (p.value.provider = z.value.name, z.value.name === "authsecret" ? (d.headers.set("authsecret", p.value.authsecret), p.value = i("Authenticate")) : z.value.name === "basic" ? (d.setCredentials(p.value.UserName, p.value.Password), p.value = i("Authenticate"), p.value.UserName = null, p.value.Password = null) : (z.value.type === "Bearer" || z.value.name === "jwt") && (d.bearerToken = p.value.BearerToken, p.value = i("Authenticate")), b.value = await u.api(p.value), b.value.succeeded) {
        const F = b.value.response;
        c(F), n("login", F), b.value = new tt(), p.value = i("Authenticate");
      }
    }
    return (F, Z) => {
      const W = K("ErrorSummary"), Q = K("AutoFormFields"), A = K("PrimaryButton"), se = K("Icon"), h = $o("href");
      return J(m) ? (o(), r("div", zm, [
        l("div", Um, [
          l("h2", qm, I(F.title), 1),
          Object.keys(j.value).length > 1 ? (o(), r("p", Qm, [
            l("span", Km, [
              (o(!0), r(Se, null, Ie(j.value, (N, H) => Pt((o(), r("a", {
                onClick: (g) => _.value = N,
                class: y([
                  N === "" || N === R.value.name ? "rounded-l-md" : N === oe.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  _.value === N ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                ])
              }, [
                ke(I(H), 1)
              ], 10, Zm)), [
                [h, { provider: N }]
              ])), 256))
            ])
          ])) : x("", !0)
        ]),
        l("div", Wm, [
          q.value ? (o(), ne(W, {
            key: 0,
            class: "mb-3",
            errorSummary: q.value
          }, null, 8, ["errorSummary"])) : x("", !0),
          l("div", Gm, [
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
              l("div", Jm, [
                ge(A, { class: "w-full" }, {
                  default: _e(() => [
                    ke("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : x("", !0),
            w.value.length ? (o(), r("div", Xm, [
              Ym,
              l("div", e1, [
                (o(!0), r(Se, null, Ie(w.value, (N) => (o(), r("div", null, [
                  l("a", {
                    href: J(k) + N.navItem.href + "?continue=" + J($),
                    title: S(N),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }, [
                    N.icon ? (o(), ne(se, {
                      key: 0,
                      image: N.icon,
                      class: "h-5 w-5 text-gray-700 dark:text-gray-200"
                    }, null, 8, ["image"])) : (o(), r("svg", s1, o1))
                  ], 8, t1)
                ]))), 256))
              ])
            ])) : x("", !0)
          ])
        ])
      ])) : (o(), r("div", Nm, "No Auth Plugin"));
    };
  }
}), r1 = ["for"], i1 = {
  key: 1,
  class: "border border-gray-200 flex justify-between"
}, u1 = { class: "p-2 flex flex-wrap gap-x-4" }, d1 = /* @__PURE__ */ l("title", null, "Bold text (CTRL+B)", -1), c1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}, null, -1), f1 = [
  d1,
  c1
], v1 = /* @__PURE__ */ l("title", null, "Italics (CTRL+I)", -1), p1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}, null, -1), m1 = [
  v1,
  p1
], h1 = /* @__PURE__ */ l("title", null, "Insert Link (CTRL+K)", -1), g1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"
}, null, -1), y1 = [
  h1,
  g1
], b1 = /* @__PURE__ */ l("title", null, "Blockquote (CTRL+Q)", -1), w1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z"
}, null, -1), k1 = [
  b1,
  w1
], _1 = /* @__PURE__ */ l("title", null, "Insert Image (CTRL+SHIFT+L)", -1), $1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
}, null, -1), C1 = [
  _1,
  $1
], x1 = /* @__PURE__ */ l("title", null, "Insert Code (CTRL+<)", -1), L1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
}, null, -1), V1 = [
  x1,
  L1
], M1 = /* @__PURE__ */ l("title", null, "H2 Heading (CTRL+H)", -1), S1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z"
}, null, -1), A1 = [
  M1,
  S1
], F1 = /* @__PURE__ */ l("title", null, "Numbered List (ALT+1)", -1), T1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z"
}, null, -1), I1 = [
  F1,
  T1
], D1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), j1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), O1 = [
  D1,
  j1
], P1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), B1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), H1 = [
  P1,
  B1
], R1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), E1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), N1 = [
  R1,
  E1
], z1 = /* @__PURE__ */ l("title", null, "Redo (CTRL+SHIFT+Z)", -1), U1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
}, null, -1), q1 = [
  z1,
  U1
], Q1 = {
  key: 0,
  class: "p-2 flex flex-wrap gap-x-4"
}, K1 = ["href"], Z1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z"
}, null, -1), W1 = [
  Z1
], G1 = { class: "" }, J1 = ["name", "id", "label", "value", "rows", "disabled"], X1 = ["id"], Y1 = ["id"], nt = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", eh = /* @__PURE__ */ ue({
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
    t({ props: n, textarea: b, updateModelValue: _, selection: R, hasSelection: T, selectionInfo: oe, insert: E, replace: z });
    function _(g) {
      a("update:modelValue", g);
    }
    function T() {
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
    function z({ value: g, selectionStart: L, selectionEnd: ee }) {
      ee == null && (ee = L), _(g), Ot(() => {
        b.value.focus(), b.value.setSelectionRange(L, ee);
      });
    }
    function E(g, L, ee = "", { selectionAtEnd: Y, offsetStart: ae, offsetEnd: O, filterValue: V, filterSelection: ce } = {}) {
      const de = b.value;
      let ie = de.value, pe = de.selectionEnd;
      i.push({ value: ie, selectionStart: de.selectionStart, selectionEnd: de.selectionEnd }), u = [];
      const M = de.selectionStart, ve = de.selectionEnd;
      let Ce = ie.substring(0, M), Ve = ie.substring(ve);
      const he = g && Ce.endsWith(g) && Ve.startsWith(L);
      if (M == ve) {
        if (he ? (ie = Ce.substring(0, Ce.length - g.length) + Ve.substring(L.length), pe += -L.length) : (ie = Ce + g + ee + L + Ve, pe += g.length, ae = 0, O = (ee == null ? void 0 : ee.length) || 0, Y && (pe += O, O = 0)), V) {
          var Oe = { pos: pe };
          ie = V(ie, Oe), pe = Oe.pos;
        }
      } else {
        var xe = ie.substring(M, ve);
        ce && (xe = ce(xe)), he ? (ie = Ce.substring(0, Ce.length - g.length) + xe + Ve.substring(L.length), ae = -xe.length - g.length, O = xe.length) : (ie = Ce + g + xe + L + Ve, ae ? pe += (g + L).length : (pe = M, ae = g.length, O = xe.length));
      }
      _(ie), Ot(() => {
        de.focus(), ae = pe + (ae || 0), O = (ae || 0) + (O || 0), de.setSelectionRange(ae, O);
      });
    }
    const S = () => E("**", "**", "bold"), te = () => E("_", "_", "italics"), w = () => E("~~", "~~", "strikethrough"), j = () => E("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), q = () => E(`
> `, `
`, "Blockquote", {}), le = () => E("![](", ")");
    function F(g) {
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
      if (T()) {
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
            filterSelection: (pe) => " 1. " + pe.replace(/\n$/, "").replace(/\n/g, (M) => `
 ${++ie}. `) + `
`
          });
        } else
          E("", "", "", {
            filterValue: (ie, pe) => {
              if (ae >= 0) {
                let M = V.replace(/^ - /, "");
                ee = O + M, pe.pos -= V.length - M.length;
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
      if (T()) {
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
              let M = V.replace(/^ - /, "");
              ee = O + M, pe.pos -= V.length - M.length;
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
      }) : z({
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
      return u.push({ value: g.value, selectionStart: g.selectionStart, selectionEnd: g.selectionEnd }), z(L), !0;
    }
    function N() {
      if (u.length === 0)
        return !1;
      const g = b.value, L = u.pop();
      return i.push({ value: g.value, selectionStart: g.selectionStart, selectionEnd: g.selectionEnd }), z(L), !0;
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
            let { selPos: V, beforeSel: ce, afterSel: de, prevCRPos: ie, beforeCR: pe, afterCR: M } = oe();
            if (ie >= 0) {
              let ve = M.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              ce = pe + ve, O.pos -= M.length - ve.length;
            }
            return ce + de;
          },
          filterSelection: (ae) => ae.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), L.preventDefault()) : L.ctrlKey ? ee === "z" ? L.shiftKey ? N() && L.preventDefault() : h() && L.preventDefault() : ee === "b" && !L.shiftKey ? (S(), L.preventDefault()) : ee === "h" && !L.shiftKey ? (Q(), L.preventDefault()) : ee === "i" && !L.shiftKey ? (te(), L.preventDefault()) : ee === "q" && !L.shiftKey ? (q(), L.preventDefault()) : ee === "k" ? L.shiftKey ? (le(), L.preventDefault()) : (j(), L.preventDefault()) : ee === "," || L.key === "<" || L.key === ">" || L.keyCode === 188 ? (F(L), L.preventDefault()) : ee === "/" || L.key === "/" ? (A(), L.preventDefault()) : (ee === "?" || L.key === "?") && L.shiftKey && (se(), L.preventDefault()) : L.altKey && (L.key === "1" || L.key === "0" ? (Z(), L.preventDefault()) : L.key === "-" ? (W(), L.preventDefault()) : L.key === "s" && (w(), L.preventDefault()));
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
        }, I(f.value), 11, r1)) : x("", !0),
        g.disabled ? x("", !0) : (o(), r("div", i1, [
          l("div", u1, [
            k("bold") ? (o(), r("svg", {
              key: 0,
              class: y(nt),
              onClick: S,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, f1)) : x("", !0),
            k("italics") ? (o(), r("svg", {
              key: 1,
              class: y(nt),
              onClick: te,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, m1)) : x("", !0),
            k("link") ? (o(), r("svg", {
              key: 2,
              class: y(nt),
              onClick: j,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, y1)) : x("", !0),
            k("blockquote") ? (o(), r("svg", {
              key: 3,
              class: y(nt),
              onClick: q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, k1)) : x("", !0),
            k("image") ? (o(), r("svg", {
              key: 4,
              class: y(nt),
              onClick: le,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, C1)) : x("", !0),
            k("code") ? (o(), r("svg", {
              key: 5,
              class: y(nt),
              onClick: F,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, V1)) : x("", !0),
            k("heading") ? (o(), r("svg", {
              key: 6,
              class: y(nt),
              onClick: Q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, A1)) : x("", !0),
            k("orderedList") ? (o(), r("svg", {
              key: 7,
              class: y(nt),
              icon: "",
              onClick: Z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, I1)) : x("", !0),
            k("unorderedList") ? (o(), r("svg", {
              key: 8,
              class: y(nt),
              onClick: W,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, O1)) : x("", !0),
            k("strikethrough") ? (o(), r("svg", {
              key: 9,
              class: y(nt),
              onClick: w,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, H1)) : x("", !0),
            k("undo") ? (o(), r("svg", {
              key: 10,
              class: y(nt),
              onClick: h,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, N1)) : x("", !0),
            k("redo") ? (o(), r("svg", {
              key: 11,
              class: y(nt),
              onClick: N,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, q1)) : x("", !0),
            U(g.$slots, "toolbarbuttons", {
              instance: (ee = Be()) == null ? void 0 : ee.exposed
            })
          ]),
          k("help") && g.helpUrl ? (o(), r("div", Q1, [
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
              }, W1))
            ], 8, K1)
          ])) : x("", !0)
        ])),
        l("div", G1, [
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
            onKeydown: dn(H, ["tab"])
          }, null, 42, J1)
        ]),
        c.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${g.id}-error`
        }, I(c.value), 9, X1)) : g.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${g.id}-description`
        }, I(g.help), 9, Y1)) : x("", !0),
        U(g.$slots, "footer", Ae({
          inputElement: b.value,
          id: g.id,
          modelValue: g.modelValue,
          status: g.status
        }, g.$attrs))
      ]);
    };
  }
}), th = {
  key: 0,
  class: "relative z-10 lg:hidden",
  role: "dialog",
  "aria-modal": "true"
}, sh = { class: "fixed inset-0 flex" }, lh = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close sidebar", -1), nh = /* @__PURE__ */ l("svg", {
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
], -1), oh = [
  lh,
  nh
], ah = { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2" }, rh = { class: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col" }, ih = { class: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6" }, uh = {
  class: /* @__PURE__ */ y(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
}, dh = /* @__PURE__ */ l("span", { class: "sr-only" }, "Open sidebar", -1), ch = /* @__PURE__ */ l("svg", {
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
], -1), fh = [
  dh,
  ch
], vh = /* @__PURE__ */ ue({
  __name: "SidebarLayout",
  setup(e, { expose: t }) {
    const { transition: s } = $n(), n = D(!0), a = D(""), i = {
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
      n.value ? (o(), r("div", th, [
        l("div", {
          class: y(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", sh, [
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
              }, oh)
            ], 2),
            l("div", ah, [
              U(p.$slots, "default")
            ])
          ], 2)
        ])
      ])) : x("", !0),
      l("div", rh, [
        l("div", ih, [
          U(p.$slots, "default")
        ])
      ]),
      l("div", uh, [
        l("button", {
          type: "button",
          onClick: $,
          class: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        }, fh),
        U(p.$slots, "mobiletitlebar")
      ])
    ]));
  }
}), ph = {
  Alert: ta,
  AlertSuccess: va,
  ErrorSummary: ya,
  InputDescription: wa,
  Icon: no,
  Loading: gr,
  OutlineButton: wr,
  PrimaryButton: $r,
  SecondaryButton: Lr,
  TextLink: Mr,
  Breadcrumbs: Dr,
  Breadcrumb: Hr,
  NavList: Nr,
  NavListItem: Yr,
  AutoQueryGrid: $d,
  SettingsIcons: Pd,
  FilterViews: Rl,
  FilterColumn: Hl,
  QueryPrefs: El,
  EnsureAccess: ro,
  EnsureAccessDialog: Bd,
  TextInput: Kd,
  TextareaInput: ec,
  SelectInput: ac,
  CheckboxInput: pc,
  TagInput: Oc,
  FileInput: o0,
  Autocomplete: k0,
  Combobox: C0,
  DynamicInput: x0,
  LookupInput: E0,
  AutoFormFields: N0,
  AutoForm: ff,
  AutoCreateForm: If,
  AutoEditForm: ev,
  AutoViewForm: wv,
  ConfirmDelete: _v,
  FormLoading: Mv,
  DataGrid: Iv,
  CellFormat: Dv,
  PreviewFormat: Rv,
  HtmlFormat: qv,
  MarkupFormat: Zv,
  MarkupModel: lp,
  CloseButton: ip,
  SlideOver: $p,
  ModalDialog: Fp,
  ModalLookup: Vm,
  Tabs: Om,
  DarkModeToggle: Em,
  SignIn: a1,
  MarkdownInput: eh,
  SidebarLayout: vh
}, tl = ph, wh = {
  install(e) {
    Object.keys(tl).forEach((s) => {
      e.component(s, tl[s]);
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
    return e ? t ? X.components[e] = t : X.components[e] || tl[e] || null : null;
  }
};
export {
  bh as css,
  wh as default,
  Bl as useAuth,
  ys as useClient,
  zt as useConfig,
  Ma as useFiles,
  yh as useFormatters,
  dt as useMetadata,
  $n as useUtils
};
