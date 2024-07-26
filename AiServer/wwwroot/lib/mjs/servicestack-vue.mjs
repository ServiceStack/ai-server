var ro = Object.defineProperty;
var io = (e, t, s) => t in e ? ro(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (io(e, typeof t != "symbol" ? t + "" : t, s), s);
import { defineComponent as ce, computed as v, openBlock as o, createElementBlock as r, normalizeClass as b, createElementVNode as l, createCommentVNode as x, renderSlot as K, ref as I, toDisplayString as j, inject as Ue, nextTick as $t, isRef as en, unref as ee, mergeProps as Me, withModifiers as qe, h as yt, resolveComponent as W, createBlock as oe, withCtx as Ce, useAttrs as uo, createVNode as xe, createTextVNode as _e, watchEffect as ys, normalizeStyle as tl, Fragment as Fe, renderList as De, withDirectives as Ct, vModelCheckbox as sl, withKeys as tn, createStaticVNode as $s, vModelSelect as co, useSlots as ll, getCurrentInstance as Be, onMounted as st, createSlots as nl, normalizeProps as Pt, guardReactiveProps as bs, vModelDynamic as fo, onUnmounted as Ht, watch as St, vModelText as vo, resolveDynamicComponent as sn, provide as es, resolveDirective as po } from "vue";
import { errorResponseExcept as mo, dateFmt as ln, toTime as ho, omit as ft, enc as Us, setQueryString as go, appendQueryString as Gt, nameOf as yo, ApiResult as Xe, lastRightPart as xt, leftPart as Cs, map as Qe, toDate as Mt, toDateTime as bo, toCamelCase as wo, mapGet as we, chop as ko, fromXsdDuration as nn, isDate as xs, timeFmt12 as _o, apiValue as $o, indexOfAny as Co, createBus as xo, toKebabCase as ql, sanitize as Lo, humanize as ze, delaySet as on, rightPart as vs, queryString as qs, combinePaths as Vo, toPascalCase as ot, errorResponse as mt, trimEnd as So, $1 as ws, lastLeftPart as Mo, ResponseStatus as Hs, ResponseError as Ql, HttpMethods as ol, omitEmpty as Ao, uniqueKeys as Qs, humanify as an, each as To } from "@servicestack/client";
const Fo = { class: "flex items-center" }, Io = {
  key: 0,
  class: "flex-shrink-0 mr-3"
}, Do = {
  key: 0,
  class: "h-5 w-5 text-yellow-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, jo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
  "clip-rule": "evenodd"
}, null, -1), Oo = [
  jo
], Po = {
  key: 1,
  class: "h-5 w-5 text-red-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Bo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
  "clip-rule": "evenodd"
}, null, -1), Ro = [
  Bo
], Eo = {
  key: 2,
  class: "h-5 w-5 text-blue-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ho = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
  "clip-rule": "evenodd"
}, null, -1), zo = [
  Ho
], No = {
  key: 3,
  class: "h-5 w-5 text-green-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Uo = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  "clip-rule": "evenodd"
}, null, -1), qo = [
  Uo
], Qo = /* @__PURE__ */ ce({
  __name: "Alert",
  props: {
    type: { default: "warn" },
    hideIcon: { type: Boolean }
  },
  setup(e) {
    const t = e, s = v(() => t.type == "info" ? "bg-blue-50 dark:bg-blue-200" : t.type == "error" ? "bg-red-50 dark:bg-red-200" : t.type == "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200"), n = v(() => t.type == "info" ? "border-blue-400" : t.type == "error" ? "border-red-400" : t.type == "success" ? "border-green-400" : "border-yellow-400"), a = v(() => t.type == "info" ? "text-blue-700" : t.type == "error" ? "text-red-700" : t.type == "success" ? "text-green-700" : "text-yellow-700");
    return (i, u) => (o(), r("div", {
      class: b([s.value, n.value, "border-l-4 p-4"])
    }, [
      l("div", Fo, [
        i.hideIcon ? x("", !0) : (o(), r("div", Io, [
          i.type == "warn" ? (o(), r("svg", Do, Oo)) : i.type == "error" ? (o(), r("svg", Po, Ro)) : i.type == "info" ? (o(), r("svg", Eo, zo)) : i.type == "success" ? (o(), r("svg", No, qo)) : x("", !0)
        ])),
        l("div", null, [
          l("p", {
            class: b([a.value, "text-sm"])
          }, [
            K(i.$slots, "default")
          ], 2)
        ])
      ])
    ], 2));
  }
}), Ko = {
  key: 0,
  class: "rounded-md bg-green-50 dark:bg-green-200 p-4",
  role: "alert"
}, Zo = { class: "flex" }, Go = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
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
], -1), Wo = { class: "ml-3" }, Jo = { class: "text-sm font-medium text-green-800" }, Xo = { key: 0 }, Yo = { class: "ml-auto pl-3" }, ea = { class: "-mx-1.5 -my-1.5" }, ta = /* @__PURE__ */ l("span", { class: "sr-only" }, "Dismiss", -1), sa = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
], -1), la = [
  ta,
  sa
], na = /* @__PURE__ */ ce({
  __name: "AlertSuccess",
  props: {
    message: {}
  },
  setup(e) {
    const t = I(!1);
    return (s, n) => t.value ? x("", !0) : (o(), r("div", Ko, [
      l("div", Zo, [
        Go,
        l("div", Wo, [
          l("h3", Jo, [
            s.message ? (o(), r("span", Xo, j(s.message), 1)) : K(s.$slots, "default", { key: 1 })
          ])
        ]),
        l("div", Yo, [
          l("div", ea, [
            l("button", {
              type: "button",
              class: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-200",
              onClick: n[0] || (n[0] = (a) => t.value = !0)
            }, la)
          ])
        ])
      ])
    ]));
  }
}), oa = { class: "flex" }, aa = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
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
], -1), ra = { class: "ml-3" }, ia = { class: "text-sm text-red-700 dark:text-red-200" }, ua = /* @__PURE__ */ ce({
  __name: "ErrorSummary",
  props: {
    status: {},
    except: {},
    class: {}
  },
  setup(e) {
    const t = e;
    let s = Ue("ApiState", void 0);
    const n = v(() => t.status || s != null && s.error.value ? mo.call({ responseStatus: t.status ?? (s == null ? void 0 : s.error.value) }, t.except ?? []) : null);
    return (a, i) => n.value ? (o(), r("div", {
      key: 0,
      class: b(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", oa, [
        aa,
        l("div", ra, [
          l("p", ia, j(n.value), 1)
        ])
      ])
    ], 2)) : x("", !0);
  }
}), da = ["id", "aria-describedby"], ca = /* @__PURE__ */ ce({
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
    ], 8, da)) : x("", !0);
  }
});
function Ls(e) {
  return ln(e).replace(/\//g, "-");
}
function rn(e) {
  return e == null ? "" : ho(e);
}
function un(e, t) {
  e.value = null, $t(() => e.value = t);
}
function It(e) {
  return Object.keys(e).forEach((t) => {
    const s = e[t];
    e[t] = en(s) ? ee(s) : s;
  }), e;
}
function Lt(e, t, s) {
  s ? (t.value = e.entering.cls + " " + e.entering.from, setTimeout(() => t.value = e.entering.cls + " " + e.entering.to, 0)) : (t.value = e.leaving.cls + " " + e.leaving.from, setTimeout(() => t.value = e.leaving.cls + " " + e.leaving.to, 0));
}
function ps(e) {
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
function dt(e, t, s) {
  s || (s = {});
  let n = s.cls || s.className || s.class;
  return n && (s = ft(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + Ks(s) + "/>" : `<${e}` + Ks(s) + `>${t || ""}</${e}>`;
}
function Ks(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${Us(e[s])}"`, "");
}
function Vs(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Ot(e) {
  return Cl(e);
}
let fa = ["string", "number", "boolean", "null", "undefined"];
function Vt(e) {
  return fa.indexOf(typeof e) >= 0 || e instanceof Date;
}
function Wt(e) {
  return !Vt(e);
}
class dn {
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
function ks(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function al(e) {
  if (typeof history < "u") {
    const t = go(location.href, e);
    history.pushState({}, "", t);
  }
}
function rl(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, i) => (a[i] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function Zs(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function il(e) {
  const t = le.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Ss(e, t) {
  return Gt(`swr.${yo(e)}`, t ? Object.assign({}, e, t) : e);
}
function va(e) {
  if (e.request) {
    const t = Ss(e.request, e.args);
    le.config.storage.removeItem(t);
  }
}
async function cn(e, t, s, n, a) {
  const i = Ss(t, n);
  s(new Xe({ response: il(i) }));
  const u = await e.api(t, n, a);
  if (u.succeeded && u.response) {
    u.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const d = JSON.stringify(u.response);
    le.config.storage.setItem(i, d), s(u);
  }
  return u;
}
function fn(e, t) {
  let s = null;
  return (...n) => {
    s && clearTimeout(s), s = setTimeout(() => {
      e(...n);
    }, t || 100);
  };
}
function bt(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function _t(e, t) {
  const s = bt(t);
  return e.reduce((n, a) => (n[a] = !s.includes(a), n), {});
}
function vn() {
  return {
    LocalStore: dn,
    dateInputFormat: Ls,
    timeInputFormat: rn,
    setRef: un,
    unRefs: It,
    transition: Lt,
    focusNextElement: ps,
    getTypeName: zt,
    htmlTag: dt,
    htmlAttrs: Ks,
    linkAttrs: Vs,
    toAppUrl: Ot,
    isPrimitive: Vt,
    isComplexType: Wt,
    pushState: al,
    scopedExpr: rl,
    copyText: Zs,
    fromCache: il,
    swrCacheKey: Ss,
    swrClear: va,
    swrApi: cn,
    asStrings: bt,
    asOptions: _t,
    createDebounce: fn
  };
}
const pn = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), mn = {
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
}, Kl = Object.keys(mn), pt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, ms = {
  img: pt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: pt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: pt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: pt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: pt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: pt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: pt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: pt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: pt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, pa = /[\r\n%#()<>?[\\\]^`{|}]/g, Zl = 1024, ma = ["Bytes", "KB", "MB", "GB", "TB"], ha = (() => {
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
  function d(f, p) {
    f.split(",").forEach(($) => u[$] = p);
  }
  function c(f, p) {
    f.split(",").forEach(($) => u[$] = p($));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (f) => s + f), c("jsx,csv,css", (f) => n + f), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (f) => a + f), c("3gpp,avi,dv,divx,ogg,mp4,webm", (f) => i + f), c("rtf,pdf", (f) => e + f), d("htm,html,shtm", n + "html"), d("js,mjs,cjs", n + "javascript"), d("yml,yaml", e + "yaml"), d("bat,cmd", e + "bat"), d("xml,csproj,fsproj,vbproj", n + "xml"), d("txt,ps1", n + "plain"), d("qt,mov", i + "quicktime"), d("doc,dot", e + "msword"), d("xls,xlt,xla", e + "excel"), d("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), d("cer,crt,der", e + "x-x509-ca-cert"), d("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), d("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), u;
})();
let Gs = [];
function hn(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(pa, encodeURIComponent);
}
function ul(e) {
  return "data:image/svg+xml;utf8," + hn(e);
}
function gn(e) {
  let t = URL.createObjectURL(e);
  return Gs.push(t), t;
}
function yn() {
  Gs.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), Gs = [];
}
function dl(e) {
  if (!e)
    return null;
  let t = Cs(e, "?");
  return xt(t, "/");
}
function ts(e) {
  let t = dl(e);
  return t == null || t.indexOf(".") === -1 ? null : xt(t, ".").toLowerCase();
}
function cl(e) {
  let t = ts(e.name);
  return t && pn.indexOf(t) >= 0 ? gn(e) : wt(e.name);
}
function fl(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = ts(e);
  return t && pn.indexOf(t) >= 0 || !1;
}
function wt(e) {
  if (!e)
    return null;
  let t = ts(e);
  return t == null || fl(e) ? e : Zt(t) || ul(ms.doc);
}
function Zt(e) {
  let t = bn(e);
  return t && ul(t) || null;
}
function bn(e) {
  if (ms[e])
    return ms[e];
  for (let t = 0; t < Kl.length; t++) {
    let s = Kl[t];
    if (mn[s].indexOf(e) >= 0)
      return ms[s];
  }
  return null;
}
function vl(e, t = 2) {
  if (e === 0)
    return "0 Bytes";
  const s = t < 0 ? 0 : t, n = Math.floor(Math.log(e) / Math.log(Zl));
  return parseFloat((e / Math.pow(Zl, n)).toFixed(s)) + " " + ma[n];
}
function ga(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: cl(t) }));
}
function Ms(e, t) {
  e.onerror = null, e.src = pl(e.src, t) || "";
}
function pl(e, t) {
  return Zt(xt(e, ".").toLowerCase()) || (t ? Zt(t) || t : null) || Zt("doc");
}
function Ws(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = xt(e, ".").toLowerCase();
  return ha[t] || "application/" + t;
}
function _m() {
  return {
    extSvg: bn,
    extSrc: Zt,
    getExt: ts,
    encodeSvg: hn,
    canPreview: fl,
    getFileName: dl,
    getMimeType: Ws,
    formatBytes: vl,
    filePathUri: wt,
    svgToDataUri: ul,
    fileImageUri: cl,
    objectUrl: gn,
    flush: yn,
    inputFiles: ga,
    iconOnError: Ms,
    iconFallbackSrc: pl
  };
}
class ya {
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
const Bt = "/metadata/app.json", ba = {
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
}, wa = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, Js = {
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
[...Object.keys(Js), ...Object.values(Js)];
const ka = {
  String: "string",
  Boolean: "bool",
  ...Js
};
function ds(e) {
  return ka[e] || e;
}
function wn(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? ds(t[0]) + "?" : e.endsWith("[]") ? `List<${ds(e.substring(0, e.length - 2))}>` : t.length === 0 ? ds(e) : Cs(ds(e), "`") + "<" + t.join(",") + ">") : "";
}
function _a(e) {
  return e && wn(e.name, e.genericArgs);
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
  toArray() {
    return [this.Query, this.QueryInto, this.Create, this.Update, this.Patch, this.Delete].filter((s) => !!s).map((s) => s);
  }
  get empty() {
    return !this.Query && !this.QueryInto && !this.Create && !this.Update && !this.Patch && !this.Delete;
  }
  add(t) {
    Ne.isQueryInto(t) && !this.QueryInto ? this.QueryInto = t : Ne.isQuery(t) && !this.Query ? this.Query = t : Ne.isCreate(t) && !this.Create ? this.Create = t : Ne.isUpdate(t) && !this.Update ? this.Update = t : Ne.isPatch(t) && !this.Patch ? this.Patch = t : Ne.isDelete(t) && !this.Delete && (this.Delete = t);
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
    return t && (s ?? (s = (a = le.metadata.value) == null ? void 0 : a.api), s == null || s.operations.forEach((i) => {
      var u;
      ((u = i.dataModel) == null ? void 0 : u.name) == t && n.add(i);
    })), n;
  }
}
const Ne = {
  Create: "ICreateDb`1",
  Update: "IUpdateDb`1",
  Patch: "IPatchDb`1",
  Delete: "IDeleteDb`1",
  AnyRead: ["QueryDb`1", "QueryDb`2"],
  AnyWrite: ["ICreateDb`1", "IUpdateDb`1", "IPatchDb`1", "IDeleteDb`1"],
  isAnyQuery: (e) => Qe(e.request.inherits, (t) => Ne.AnyRead.indexOf(t.name) >= 0),
  isQuery: (e) => Qe(e.request.inherits, (t) => t.name === "QueryDb`1"),
  isQueryInto: (e) => Qe(e.request.inherits, (t) => t.name === "QueryDb`2"),
  isCrud: (e) => {
    var t;
    return (t = e.request.implements) == null ? void 0 : t.some((s) => Ne.AnyWrite.indexOf(s.name) >= 0);
  },
  isCreate: (e) => cs(e, Ne.Create),
  isUpdate: (e) => cs(e, Ne.Update),
  isPatch: (e) => cs(e, Ne.Patch),
  isDelete: (e) => cs(e, Ne.Delete),
  model: (e) => {
    var t, s, n;
    return e ? Qe(e.inherits, (a) => Ne.AnyRead.indexOf(a.name) >= 0) ? (t = e.inherits) == null ? void 0 : t.genericArgs[0] : (n = (s = e.implements) == null ? void 0 : s.find((a) => Ne.AnyWrite.indexOf(a.name) >= 0)) == null ? void 0 : n.genericArgs[0] : null;
  }
};
function $a(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || As(ml(e));
}
function kn(e) {
  return e.endsWith("?") ? ko(e, 1) : e;
}
function As(e) {
  return ba[kn(e)];
}
function Ca(e) {
  return e && wa[e] || "String";
}
function ml(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function Xs(e) {
  return e && As(e) == "number" || !1;
}
function _n(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function xa(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function $n(e) {
  if (!(e != null && e.type))
    return !1;
  const t = ml(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : As(e.type) == null;
}
function Cn(e) {
  var s, n, a, i;
  if (!(e != null && e.type))
    return !1;
  const t = ml(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((i = e.input) == null ? void 0 : i.type) == "combobox" ? !0 : As(e.type) != null;
}
function Jt(e, t) {
  let s = typeof e == "string" ? Ts(e) : e;
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
function La(e, t, s = {}) {
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
function hs(e, t) {
  return e ? (Object.keys(e).forEach((s) => {
    let n = e[s];
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = Ls(Mt(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function Va(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var p;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const i = a.id.toLowerCase(), u = t && t.find(($) => $.name.toLowerCase() == i);
    let d = u == null ? void 0 : u.type, c = (p = u == null ? void 0 : u.genericArgs) == null ? void 0 : p[0], f = a.type === "checkbox" ? a.checked : a.value;
    Xs(d) ? f = Number(f) : d === "List`1" && typeof f == "string" && (f = f.split(",").map(($) => Xs(c) ? Number($) : $)), s[a.id] = f;
  }), s;
}
function hl(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function Sa(e) {
  if (!gl() && (e != null && e.assert) && !le.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return le.metadata.value;
}
function Xt(e) {
  return e && hl(e) ? (e.date = bo(/* @__PURE__ */ new Date()), le.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(Bt, JSON.stringify(e)), !0) : !1;
}
function Ma() {
  le.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(Bt);
}
function gl() {
  if (le.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (hl(e))
    Xt(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(Bt) : null;
    if (t)
      try {
        Xt(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${Bt} from localStorage`);
      }
  }
  return le.metadata.value != null;
}
async function Gl(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    Xt(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  hl(le.metadata.value) || console.warn("AppMetadata is not available");
}
async function Aa(e) {
  var i;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = gl() && t !== 0;
  if (a && t) {
    let u = Mt((i = le.metadata.value) == null ? void 0 : i.date);
    (!u || (/* @__PURE__ */ new Date()).getTime() - u.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await Gl(s || Bt, n), le.metadata.value != null))
      return;
    const u = Ue("client");
    if (u != null) {
      const d = await u.api(new ya());
      d.succeeded && Xt(d.response);
    }
    if (le.metadata.value != null)
      return;
    await Gl(Bt);
  }
  return le.metadata.value;
}
function at(e, t) {
  var u;
  let s = (u = le.metadata.value) == null ? void 0 : u.api;
  if (!s || !e)
    return null;
  let n = s.types.find((d) => d.name.toLowerCase() === e.toLowerCase() && (!t || d.namespace == t));
  if (n)
    return n;
  let a = Ts(e);
  if (a)
    return a.request;
  let i = s.operations.find((d) => d.response && d.response.name.toLowerCase() === e.toLowerCase() && (!t || d.response.namespace == t));
  return i ? i.response : null;
}
function Ts(e) {
  var n;
  let t = (n = le.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function Ta({ dataModel: e }) {
  var n;
  const t = (n = le.metadata.value) == null ? void 0 : n.api;
  if (!t)
    return [];
  let s = t.operations;
  if (e) {
    const a = typeof e == "string" ? at(e) : e;
    s = s.filter((i) => xn(i.dataModel, a));
  }
  return s;
}
function yl(e) {
  return e ? at(e.name, e.namespace) : null;
}
function xn(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function Fa(e, t) {
  let s = at(e);
  return s && s.properties && s.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function Ln(e) {
  return Vn(at(e));
}
function Vn(e) {
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
function Sn(e) {
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
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, i = at(a);
    if (i)
      return Vn(i);
  }
  return null;
}
function bl(e) {
  if (!e)
    return;
  const t = [];
  return Object.keys(e).forEach((s) => t.push({ key: s, value: e[s] })), t;
}
function Ia(e, t) {
  const n = ((a, i) => Object.assign({
    id: a,
    name: a,
    type: i
  }, t))(e.name, (t == null ? void 0 : t.type) || $a(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = bl(Sn(e))), n;
}
function Da(e) {
  let t = [];
  if (e) {
    const s = tt(e), n = Ts(e.name), a = yl(n == null ? void 0 : n.dataModel);
    s.forEach((i) => {
      var d, c, f;
      if (!Cn(i))
        return;
      const u = Ia(i, i.input);
      if (u.id = wo(u.id), u.type == "file" && i.uploadTo && !u.accept) {
        const p = (c = (d = le.metadata.value) == null ? void 0 : d.plugins.filesUpload) == null ? void 0 : c.locations.find(($) => $.name == i.uploadTo);
        p && !u.accept && p.allowExtensions && (u.accept = p.allowExtensions.map(($) => $.startsWith(".") ? $ : `.${$}`).join(","));
      }
      if (a) {
        const p = (f = a.properties) == null ? void 0 : f.find(($) => $.name == i.name);
        i.ref || (i.ref = p == null ? void 0 : p.ref);
      }
      if (u.options)
        try {
          const p = {
            input: u,
            $typeFields: s.map((m) => m.name),
            $dataModelFields: a ? tt(a).map((m) => m.name) : [],
            ...le.config.scopeWhitelist
          }, $ = rl(u.options, p);
          Object.keys($).forEach((m) => {
            u[m] = $[m];
          });
        } catch {
          console.error(`failed to evaluate '${u.options}'`);
        }
      t.push(u);
    });
  }
  return t;
}
function wl(e, t) {
  var a, i;
  if (!t.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const s = at(t.type);
  if (!(s != null && s.enumValues))
    return console.error(`Could not find metadata for ${t.type}`), [`${e}`];
  const n = [];
  for (let u = 0; u < s.enumValues.length; u++) {
    const d = parseInt(s.enumValues[u]);
    d > 0 && (d & e) === d && n.push(((a = s.enumDescriptions) == null ? void 0 : a[u]) || ((i = s.enumNames) == null ? void 0 : i[u]) || `${e}`);
  }
  return n;
}
function Mn(e) {
  return (t) => typeof t == "number" ? wl(t, { type: e }) : t;
}
function tt(e) {
  if (!e)
    return [];
  let t = [], s = {};
  function n(a) {
    a.forEach((i) => {
      s[i.name] || (s[i.name] = 1, t.push(i));
    });
  }
  for (; e; )
    e.properties && n(e.properties), e = e.inherits ? yl(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function cs(e, t) {
  var s;
  return ((s = e.request.implements) == null ? void 0 : s.some((n) => n.name === t)) || !1;
}
function ss(e) {
  return e ? An(e, tt(e)) : null;
}
function An(e, t) {
  let s = t.find((i) => i.name.toLowerCase() === "id");
  if (s && s.isPrimaryKey)
    return s;
  let a = t.find((i) => i.isPrimaryKey) || s;
  if (!a) {
    let i = Ne.model(e);
    if (i)
      return Qe(at(i), (u) => ss(u));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function ja(e, t) {
  return Qe(ss(e), (s) => we(t, s.name));
}
function Tn(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : Oa(t, s.value);
}
function Oa(e, t) {
  return e ? (e = kn(e), Xs(e) || e === "Boolean" ? t : xa(e) ? `[${t}]` : `'${t}'`) : t;
}
function rt() {
  const e = v(() => {
    var n;
    return ((n = le.metadata.value) == null ? void 0 : n.app) || null;
  }), t = v(() => {
    var n;
    return ((n = le.metadata.value) == null ? void 0 : n.api) || null;
  }), s = v(() => {
    var n;
    return ((n = le.metadata.value) == null ? void 0 : n.plugins.autoQuery.viewerConventions) || [];
  });
  return gl(), {
    loadMetadata: Aa,
    getMetadata: Sa,
    setMetadata: Xt,
    clearMetadata: Ma,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: at,
    typeOfRef: yl,
    typeEquals: xn,
    apiOf: Ts,
    findApis: Ta,
    typeName: _a,
    typeName2: wn,
    property: Fa,
    enumOptions: Ln,
    propertyOptions: Sn,
    createFormLayout: Da,
    typeProperties: tt,
    supportsProp: Cn,
    Crud: Ne,
    Apis: Rt,
    getPrimaryKey: ss,
    getPrimaryKeyByProps: An,
    getId: ja,
    createDto: Jt,
    makeDto: La,
    toFormValues: hs,
    formValues: Va,
    isComplexProp: $n,
    asKvps: bl,
    expandEnumFlags: wl,
    enumFlagsConverter: Mn
  };
}
const Ye = class Ye {
  static async getOrFetchValue(t, s, n, a, i, u, d) {
    const c = Ye.getValue(n, d, i);
    return c ?? (await Ye.fetchLookupIds(t, s, n, a, i, u, [d]), Ye.getValue(n, d, i));
  }
  static getValue(t, s, n) {
    const a = Ye.Lookup[t];
    if (a) {
      const i = a[s];
      if (i)
        return n = n.toLowerCase(), i[n];
    }
  }
  static setValue(t, s, n, a) {
    const i = Ye.Lookup[t] ?? (Ye.Lookup[t] = {}), u = i[s] ?? (i[s] = {});
    n = n.toLowerCase(), u[n] = a;
  }
  static setRefValue(t, s) {
    const n = we(s, t.refId);
    if (n == null || t.refLabel == null)
      return null;
    const a = we(s, t.refLabel);
    return Ye.setValue(t.model, n, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, s, n, a, i, u, d) {
    const c = s.operations.find((f) => {
      var p;
      return Ne.isAnyQuery(f) && ((p = f.dataModel) == null ? void 0 : p.name) == n;
    });
    if (c) {
      const f = Ye.Lookup[n] ?? (Ye.Lookup[n] = {}), p = [];
      Object.keys(f).forEach((O) => {
        const H = f[O];
        we(H, i) && p.push(O);
      });
      const $ = d.filter((O) => !p.includes(O));
      if ($.length == 0)
        return;
      const m = u ? null : `${a},${i}`, k = {
        [a + "In"]: $.join(",")
      };
      m && (k.fields = m);
      const g = Jt(c, k), w = await t.api(g, { jsconfig: "edv,eccn" });
      if (w.succeeded)
        (we(w.response, "results") || []).forEach((H) => {
          if (!we(H, a)) {
            console.error(`result[${a}] == null`, H);
            return;
          }
          const ae = `${we(H, a)}`, F = we(H, i);
          i = i.toLowerCase();
          const T = f[ae] ?? (f[ae] = {});
          T[i] = `${F}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(Ye, "Lookup", {});
let Dt = Ye, Ys = () => (/* @__PURE__ */ new Date()).getTime(), Pa = ["/", "T", ":", "-"], ct = {
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
}, Ba = new Intl.RelativeTimeFormat(ct.locale, {}), Wl = 24 * 60 * 60 * 1e3 * 365, zs = {
  year: Wl,
  month: Wl / 12,
  day: 24 * 60 * 60 * 1e3,
  hour: 60 * 60 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, kt = {
  currency: In,
  bytes: Dn,
  link: jn,
  linkTel: On,
  linkMailTo: Pn,
  icon: Bn,
  iconRounded: Rn,
  attachment: En,
  hidden: Hn,
  time: zn,
  relativeTime: _l,
  relativeTimeFromMs: Fs,
  enumFlags: Un,
  formatDate: Nt,
  formatNumber: kl
};
"iconOnError" in globalThis || (globalThis.iconOnError = Ms);
class Ke {
}
Le(Ke, "currency", { method: "currency" }), Le(Ke, "bytes", { method: "bytes" }), Le(Ke, "link", { method: "link" }), Le(Ke, "linkTel", { method: "linkTel" }), Le(Ke, "linkMailTo", { method: "linkMailTo" }), Le(Ke, "icon", { method: "icon" }), Le(Ke, "iconRounded", { method: "iconRounded" }), Le(Ke, "attachment", { method: "attachment" }), Le(Ke, "time", { method: "time" }), Le(Ke, "relativeTime", { method: "relativeTime" }), Le(Ke, "relativeTimeFromMs", { method: "relativeTimeFromMs" }), Le(Ke, "date", { method: "formatDate" }), Le(Ke, "number", { method: "formatNumber" }), Le(Ke, "hidden", { method: "hidden" }), Le(Ke, "enumFlags", { method: "enumFlags" });
function Ra(e) {
  ct = Object.assign({}, ct, e);
}
function Ea(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (kt[t] = e[t]);
  });
}
function Fn() {
  return kt;
}
function ls(e, t) {
  return t ? dt("span", e, t) : e;
}
function In(e, t) {
  const s = ft(t, ["currency"]);
  return ls(new Intl.NumberFormat(void 0, { style: "currency", currency: (t == null ? void 0 : t.currency) || "USD" }).format(e), s);
}
function Dn(e, t) {
  return ls(vl(e), t);
}
function jn(e, t) {
  return dt("a", e, Vs({ ...t, href: e }));
}
function On(e, t) {
  return dt("a", e, Vs({ ...t, href: `tel:${e}` }));
}
function Pn(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = ft(t, ["subject", "body"]), i = {};
  return s && (i.subject = s), n && (i.body = n), dt("a", e, Vs({ ...a, href: `mailto:${Gt(e, i)}` }));
}
function Bn(e, t) {
  return dt("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Ot(e), onerror: "iconOnError(this)" }, t));
}
function Rn(e, t) {
  return dt("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Ot(e), onerror: "iconOnError(this)" }, t));
}
function En(e, t) {
  let s = dl(e), a = ts(s) == null || fl(e) ? Ot(e) : pl(e);
  const i = Ot(a);
  let u = t && (t["icon-class"] || t.iconClass), d = dt("img", void 0, Object.assign({ class: "w-6 h-6", src: i, onerror: "iconOnError(this,'att')" }, u ? { class: u } : null)), c = `<span class="pl-1">${s}</span>`;
  return dt("a", d + c, Object.assign({ class: "flex", href: Ot(e), title: e }, t ? ft(t, ["icon-class", "iconClass"]) : null));
}
function Hn(e) {
  return "";
}
function zn(e, t) {
  let s = typeof e == "string" ? new Date(nn(e) * 1e3) : xs(e) ? Mt(e) : null;
  return ls(s ? _o(s) : e, t);
}
function Nt(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? Mt(e) : e;
  if (!xs(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = ct.date ? Is(ct.date) : null;
  return ls(typeof n == "function" ? n(s) : ln(s), t);
}
function kl(e, t) {
  if (typeof e != "number")
    return e;
  let s = ct.number ? Is(ct.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), ls(n, t);
}
function Nn(e, t, s) {
  let n = $o(e), a = t ? Is(t) : null;
  if (typeof a == "function") {
    let u = s;
    if (t != null && t.options)
      try {
        u = rl(t.options, s);
      } catch (d) {
        console.error(`Could not evaluate '${t.options}'`, d, ", with scope:", s);
      }
    return a(e, u);
  }
  let i = n != null ? xs(n) ? Nt(n, s) : typeof n == "number" ? kl(n, s) : n : null;
  return i ?? "";
}
function Yt(e, t, s) {
  return Vt(e) ? Nn(e, t, s) : qa(e, t, s);
}
function Ha(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (xs(e))
    return e.getTime() - Ys();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return nn(e) * 1e3 * -1;
    if (Co(e, Pa) >= 0)
      return Mt(e).getTime() - Ys();
  }
  return NaN;
}
function Fs(e, t) {
  for (let s in zs)
    if (Math.abs(e) > zs[s] || s === "second")
      return (t || Ba).format(Math.round(e / zs[s]), s);
}
function _l(e, t) {
  let s = Ha(e);
  return isNaN(s) ? "" : Fs(s, t);
}
function za(e, t) {
  return Fs(e.getTime() - (t ? t.getTime() : Ys()));
}
function Un(e, t) {
  return wl(e, t).join(", ");
}
function Is(e) {
  if (!e)
    return null;
  let { method: t, options: s } = e, n = `${t}(${s})`, a = kt[n] || kt[t];
  if (typeof a == "function")
    return a;
  let i = e.locale || ct.locale;
  if (t.startsWith("Intl.")) {
    let u = i ? `'${i}'` : "undefined", d = `return new ${t}(${u},${s || "undefined"})`;
    try {
      let c = Function(d)();
      return a = t === "Intl.DateTimeFormat" ? (f) => c.format(Mt(f)) : t === "Intl.NumberFormat" ? (f) => c.format(Number(f)) : t === "Intl.RelativeTimeFormat" ? (f) => _l(f, c) : (f) => c.format(f), kt[n] = a;
    } catch (c) {
      console.error(`Invalid format: ${d}`, c);
    }
  } else {
    let u = globalThis[t];
    if (typeof u == "function") {
      let d = s != null ? Function("return " + s)() : void 0;
      return a = (c) => u(c, d, i), kt[n] = a;
    }
    console.error(`No '${t}' function exists`, Object.keys(kt));
  }
  return null;
}
function qn(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function Qn(e) {
  return e.substring(0, 6) === "/Date(" ? Nt(Mt(e)) : e;
}
function Na(e) {
  return $l(Et(e)).replace(/"/g, "");
}
function Kn(e) {
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
function $l(e, t = 4) {
  return e = Kn(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function Ua(e) {
  return e = Kn(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = Et(e), $l(e));
}
function Et(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return Qn(e);
  if (Vt(e))
    return e;
  if (e instanceof Date)
    return Nt(e);
  if (Array.isArray(e))
    return e.map(Et);
  if (typeof e == "object") {
    let t = {};
    return Object.keys(e).forEach((s) => {
      s != "__type" && (t[s] = Et(e[s]));
    }), t;
  }
  return e;
}
function qa(e, t, s) {
  let n = e;
  if (Array.isArray(e)) {
    if (Vt(e[0]))
      return n.join(",");
    e[0] != null && (n = e[0]);
  }
  if (n == null)
    return "";
  if (n instanceof Date)
    return Nt(n, s);
  let a = Object.keys(n), i = [];
  for (let u = 0; u < Math.min(ct.maxNestedFields, a.length); u++) {
    let d = a[u], c = `${Et(n[d])}`;
    i.push(`<b class="font-medium">${d}</b>: ${Us(qn(Qn(c), ct.maxNestedFieldLength))}`);
  }
  return a.length > 2 && i.push("..."), dt("span", "{ " + i.join(", ") + " }", Object.assign({ title: Us(Na(e)) }, s));
}
function $m() {
  return {
    Formats: Ke,
    setDefaultFormats: Ra,
    getFormatters: Fn,
    setFormatters: Ea,
    formatValue: Yt,
    formatter: Is,
    dateInputFormat: Ls,
    currency: In,
    bytes: Dn,
    link: jn,
    linkTel: On,
    linkMailTo: Pn,
    icon: Bn,
    iconRounded: Rn,
    attachment: En,
    hidden: Hn,
    time: zn,
    relativeTime: _l,
    relativeTimeFromDate: za,
    relativeTimeFromMs: Fs,
    enumFlags: Un,
    formatDate: Nt,
    formatNumber: kl,
    indentJson: $l,
    prettyJson: Ua,
    scrub: Et,
    truncate: qn,
    apiValueFmt: Nn,
    iconOnError: Ms
  };
}
const Qa = ["title"], Ka = /* @__PURE__ */ ce({
  __name: "RouterLink",
  props: {
    to: {}
  },
  setup(e) {
    const t = e, { config: s } = At(), n = () => s.value.navigate(t.to ?? "/");
    return (a, i) => (o(), r("a", Me({
      onClick: qe(n, ["prevent"]),
      title: a.to,
      href: "javascript:void(0)"
    }, a.$attrs), [
      K(a.$slots, "default")
    ], 16, Qa));
  }
});
class Za {
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
const et = class et {
  static component(t) {
    const s = et.components[t];
    if (s)
      return s;
    const n = ql(t), a = Object.keys(et.components).find((i) => ql(i) === n);
    return a && et.components[a] || null;
  }
};
Le(et, "config", {
  redirectSignIn: "/signin",
  redirectSignOut: "/auth/logout",
  navigate: (t) => location.href = t,
  assetsPathResolver: (t) => t,
  fallbackPathResolver: (t) => t,
  storage: new dn(),
  tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
  scopeWhitelist: {
    enumFlagsConverter: Mn,
    ...Fn()
  }
}), Le(et, "autoQueryGridDefaults", {
  deny: [],
  hide: [],
  toolbarButtonClass: void 0,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150
}), Le(et, "events", xo()), Le(et, "user", I(null)), Le(et, "metadata", I(null)), Le(et, "components", {
  RouterLink: Ka
}), Le(et, "interceptors", new Za());
let le = et;
function Ga(e) {
  le.config = Object.assign(le.config, e);
}
function Wa(e) {
  le.autoQueryGridDefaults = Object.assign(le.autoQueryGridDefaults, e);
}
function Cl(e) {
  return e && le.config.assetsPathResolver ? le.config.assetsPathResolver(e) : e;
}
function Ja(e) {
  return e && le.config.fallbackPathResolver ? le.config.fallbackPathResolver(e) : e;
}
function Xa(e, t) {
  le.interceptors.register(e, t);
}
function At() {
  const e = v(() => le.config), t = v(() => le.autoQueryGridDefaults), s = le.events;
  return {
    config: e,
    setConfig: Ga,
    events: s,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: Wa,
    assetsPathResolver: Cl,
    fallbackPathResolver: Ja,
    registerInterceptor: Xa
  };
}
const Zn = ce({
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
        const { typeOf: i } = rt(), u = i(e.type);
        u || console.warn(`Type ${e.type} does not exist`), u != null && u.icon ? s = u == null ? void 0 : u.icon : console.warn(`Type ${e.type} does not have a [Svg] icon`);
      }
      let n = e.svg || (s == null ? void 0 : s.svg) || "";
      if (n.startsWith("<svg ")) {
        let u = Cs(n, ">").indexOf("class="), d = `${(s == null ? void 0 : s.cls) || ""} ${t.class || ""}`;
        if (u == -1)
          n = `<svg class="${d}" ${n.substring(4)}`;
        else {
          const c = u + 6 + 1;
          n = `${n.substring(0, c) + d} ${n.substring(c)}`;
        }
        return yt("span", { innerHTML: n });
      } else
        return yt("img", {
          class: [s == null ? void 0 : s.cls, t.class],
          src: Cl(e.src || (s == null ? void 0 : s.uri)),
          onError: (i) => Ms(i.target)
        });
    };
  }
}), Ya = { class: "text-2xl font-semibold text-gray-900 dark:text-gray-300" }, er = { class: "flex" }, tr = /* @__PURE__ */ l("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), sr = /* @__PURE__ */ l("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), lr = [
  tr,
  sr
], nr = /* @__PURE__ */ ce({
  __name: "Loading",
  props: {
    imageClass: { default: "w-6 h-6" }
  },
  setup(e) {
    return (t, s) => (o(), r("div", Ya, [
      l("div", er, [
        (o(), r("svg", {
          class: b(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
          role: "status",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, lr, 2)),
        l("span", null, [
          K(t.$slots, "default")
        ])
      ])
    ]));
  }
}), or = ["href", "onClick"], ar = ["type"], Jl = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black", rr = /* @__PURE__ */ ce({
  __name: "OutlineButton",
  props: {
    type: { default: "submit" },
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = W("router-link");
      return t.href ? (o(), oe(n, {
        key: 0,
        to: t.href
      }, {
        default: Ce(({ navigate: a }) => [
          l("button", {
            class: b(Jl),
            href: t.href,
            onClick: a
          }, [
            K(t.$slots, "default")
          ], 8, or)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Me({
        key: 1,
        type: t.type,
        class: Jl
      }, t.$attrs), [
        K(t.$slots, "default")
      ], 16, ar));
    };
  }
}), ir = ["href", "onClick"], ur = ["type"], dr = /* @__PURE__ */ ce({
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
      const u = W("router-link");
      return a.href ? (o(), oe(u, {
        key: 0,
        to: a.href
      }, {
        default: Ce(({ navigate: d }) => [
          l("button", {
            class: b(n.value),
            href: a.href,
            onClick: d
          }, [
            K(a.$slots, "default")
          ], 10, ir)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Me({
        key: 1,
        type: a.type,
        class: n.value
      }, a.$attrs), [
        K(a.$slots, "default")
      ], 16, ur));
    };
  }
}), cr = ["type", "href", "onClick"], fr = ["type"], Xl = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black", vr = /* @__PURE__ */ ce({
  __name: "SecondaryButton",
  props: {
    type: {},
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = W("router-link");
      return t.href ? (o(), oe(n, {
        key: 0,
        to: t.href
      }, {
        default: Ce(({ navigate: a }) => [
          l("button", {
            type: t.type ?? "button",
            class: b(Xl),
            href: t.href,
            onClick: a
          }, [
            K(t.$slots, "default")
          ], 8, cr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Me({
        key: 1,
        type: t.type ?? "button",
        class: Xl
      }, t.$attrs), [
        K(t.$slots, "default")
      ], 16, fr));
    };
  }
});
function We(e, t) {
  return Array.isArray(e) ? e.indexOf(t) >= 0 : e == t || e.includes(t);
}
const _s = {
  blue: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
  purple: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
  red: "text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200",
  green: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
  sky: "text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200",
  cyan: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200",
  indigo: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
}, nt = {
  base: "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
  invalid: "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
  valid: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600"
}, Kt = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, jt = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, el = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Ze = {
  panelClass(e = "slideOver") {
    return e == "card" ? Kt.panelClass : jt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? Kt.formClass : jt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? Kt.headingClass : jt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? Kt.subHeadingClass : jt.subHeadingClass;
  },
  buttonsClass: "mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, he = {
  getGridClass(e = "stripedRows") {
    return he.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return We(e, "fullWidth") ? "overflow-x-auto" : he.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return We(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : he.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return We(e, "whiteBackground") ? "" : We(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5" : he.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return We(e, "fullWidth") || We(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : he.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return We(e, "whiteBackground") ? "" : he.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return he.theadRowClass + (We(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return he.theadCellClass + (We(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (We(e, "whiteBackground") || We(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : he.tableClass) + (We(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", t, s, n) {
    return (n ? "cursor-pointer " : "") + (s ? "bg-indigo-100 dark:bg-blue-800" : (n ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (We(e, "stripedRows") ? t % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (We(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
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
}, pr = {
  colspans: "col-span-3 sm:col-span-3"
}, Cm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: _s,
  card: Kt,
  dummy: pr,
  form: Ze,
  grid: he,
  input: nt,
  modal: el,
  slideOver: jt
}, Symbol.toStringTag, { value: "Module" })), mr = /* @__PURE__ */ ce({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = uo(), s = e, n = v(() => (_s[s.color] || _s.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, i) => (o(), r("a", {
      class: b(n.value)
    }, [
      K(a.$slots, "default")
    ], 2));
  }
}), hr = {
  class: "flex",
  "aria-label": "Breadcrumb"
}, gr = {
  role: "list",
  class: "flex items-center space-x-4"
}, yr = ["href", "title"], br = /* @__PURE__ */ l("svg", {
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
], -1), wr = { class: "sr-only" }, kr = /* @__PURE__ */ ce({
  __name: "Breadcrumbs",
  props: {
    homeHref: { default: "/" },
    homeLabel: { default: "Home" }
  },
  setup(e) {
    return (t, s) => (o(), r("nav", hr, [
      l("ol", gr, [
        l("li", null, [
          l("div", null, [
            l("a", {
              href: t.homeHref,
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
              title: t.homeLabel
            }, [
              br,
              l("span", wr, j(t.homeLabel), 1)
            ], 8, yr)
          ])
        ]),
        K(t.$slots, "default")
      ])
    ]));
  }
}), _r = { class: "flex items-center" }, $r = /* @__PURE__ */ l("svg", {
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
], -1), Cr = ["href", "title"], xr = ["title"], Lr = /* @__PURE__ */ ce({
  __name: "Breadcrumb",
  props: {
    href: {},
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("li", null, [
      l("div", _r, [
        $r,
        t.href ? (o(), r("a", {
          key: 0,
          href: t.href,
          class: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          title: t.title
        }, [
          K(t.$slots, "default")
        ], 8, Cr)) : (o(), r("span", {
          key: 1,
          class: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300",
          title: t.title
        }, [
          K(t.$slots, "default")
        ], 8, xr))
      ])
    ]));
  }
}), Vr = {
  key: 0,
  class: "text-base font-semibold text-gray-500 dark:text-gray-400"
}, Sr = {
  role: "list",
  class: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800"
}, Mr = /* @__PURE__ */ ce({
  __name: "NavList",
  props: {
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("div", null, [
      t.title ? (o(), r("h2", Vr, j(t.title), 1)) : x("", !0),
      l("ul", Sr, [
        K(t.$slots, "default")
      ])
    ]));
  }
}), Ar = { class: "relative flex items-start space-x-4 py-6" }, Tr = { class: "flex-shrink-0" }, Fr = { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900" }, Ir = { class: "min-w-0 flex-1" }, Dr = { class: "text-base font-medium text-gray-900 dark:text-gray-100" }, jr = { class: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2" }, Or = ["href"], Pr = /* @__PURE__ */ l("span", {
  class: "absolute inset-0",
  "aria-hidden": "true"
}, null, -1), Br = { class: "text-base text-gray-500" }, Rr = /* @__PURE__ */ l("div", { class: "flex-shrink-0 self-center" }, [
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
], -1), Er = /* @__PURE__ */ ce({
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
      const n = W("Icon");
      return o(), r("li", Ar, [
        l("div", Tr, [
          l("span", Fr, [
            xe(n, {
              class: "w-6 h-6 text-indigo-700 dark:text-indigo-300",
              image: t.icon,
              src: t.iconSrc,
              svg: t.iconSvg,
              alt: t.iconAlt
            }, null, 8, ["image", "src", "svg", "alt"])
          ])
        ]),
        l("div", Ir, [
          l("h3", Dr, [
            l("span", jr, [
              l("a", {
                href: t.href,
                class: "focus:outline-none"
              }, [
                Pr,
                _e(" " + j(t.title), 1)
              ], 8, Or)
            ])
          ]),
          l("p", Br, [
            K(t.$slots, "default")
          ])
        ]),
        Rr
      ]);
    };
  }
});
function Gn(e) {
  return e && e.SessionId ? Lo(e) : e;
}
function Hr(e) {
  le.user.value = Gn(e), le.events.publish("signIn", e);
}
function zr() {
  le.user.value = null, le.events.publish("signOut", null);
}
const xl = (e) => (e == null ? void 0 : e.roles) || [], Ll = (e) => (e == null ? void 0 : e.permissions) || [];
function Wn(e) {
  return xl(le.user.value).indexOf(e) >= 0;
}
function Nr(e) {
  return Ll(le.user.value).indexOf(e) >= 0;
}
function Vl() {
  return Wn("Admin");
}
function gs(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = le.user.value;
  if (!t)
    return !1;
  if (Vl())
    return !0;
  let [s, n] = [xl(t), Ll(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => s.indexOf(c) >= 0) || u.length > 0 && !u.some((c) => s.indexOf(c) >= 0) || !i.every((c) => n.indexOf(c) >= 0) || d.length > 0 && !d.every((c) => n.indexOf(c) >= 0));
}
function Ur(e) {
  if (!e || !e.requiresAuth)
    return null;
  const t = le.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Vl())
    return null;
  let [s, n] = [xl(t), Ll(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((p) => s.indexOf(p) < 0);
  if (c.length > 0)
    return `Requires ${c.map((p) => "<b>" + p + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let f = i.filter((p) => n.indexOf(p) < 0);
  return f.length > 0 ? `Requires ${f.map((p) => "<b>" + p + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : u.length > 0 && !u.some((p) => s.indexOf(p) >= 0) ? `Requires any ${u.filter((p) => s.indexOf(p) < 0).map((p) => "<b>" + p + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : d.length > 0 && !d.every((p) => n.indexOf(p) >= 0) ? `Requires any ${d.filter((p) => n.indexOf(p) < 0).map((p) => "<b>" + p + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : null;
}
function Sl() {
  const e = v(() => le.user.value || null), t = v(() => le.user.value != null);
  return { signIn: Hr, signOut: zr, user: e, toAuth: Gn, isAuthenticated: t, hasRole: Wn, hasPermission: Nr, isAdmin: Vl, canAccess: gs, invalidAccessMessage: Ur };
}
const qr = { key: 0 }, Qr = { class: "md:p-4" }, Jn = /* @__PURE__ */ ce({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Sl(), { config: s } = At(), n = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = Gt(s.value.redirectSignIn, { redirect: i });
      s.value.navigate(u);
    }, a = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = Gt(s.value.redirectSignOut, { ReturnUrl: i });
      s.value.navigate(u);
    };
    return (i, u) => {
      const d = W("Alert"), c = W("SecondaryButton");
      return i.invalidAccess ? (o(), r("div", qr, [
        xe(d, {
          class: b(i.alertClass),
          innerHTML: i.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", Qr, [
          ee(t) ? (o(), oe(c, {
            key: 1,
            onClick: a
          }, {
            default: Ce(() => [
              _e("Sign Out")
            ]),
            _: 1
          })) : (o(), oe(c, {
            key: 0,
            onClick: n
          }, {
            default: Ce(() => [
              _e("Sign In")
            ]),
            _: 1
          }))
        ])
      ])) : x("", !0);
    };
  }
}), Kr = { class: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80" }, Zr = { class: "p-4" }, Gr = /* @__PURE__ */ l("h3", { class: "text-base font-medium mb-3 dark:text-gray-100" }, "Sort", -1), Wr = { class: "flex w-full justify-center" }, Jr = /* @__PURE__ */ l("svg", {
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
], -1), Xr = /* @__PURE__ */ l("span", null, "ASC", -1), Yr = [
  Jr,
  Xr
], ei = /* @__PURE__ */ $s('<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"></path><path fill-rule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"></path><path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"></path></g></svg><span>DESC</span>', 2), ti = [
  ei
], si = /* @__PURE__ */ l("h3", { class: "text-base font-medium mt-4 mb-2" }, " Filter ", -1), li = { key: 0 }, ni = ["id", "value"], oi = ["for"], ai = { key: 1 }, ri = { class: "mb-2" }, ii = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, ui = ["onClick"], di = /* @__PURE__ */ l("svg", {
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
], -1), ci = [
  di
], fi = { class: "flex" }, vi = /* @__PURE__ */ l("svg", {
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
], -1), pi = [
  vi
], mi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Ml = /* @__PURE__ */ ce({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = I(), i = I(""), u = I(""), d = I([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => at(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), p = v(() => s.column.meta.isEnum == !0 ? bl(Ln(f.value.name)) : []), $ = v(() => {
      var V;
      return ((V = g(s.column.type)) == null ? void 0 : V.map((z) => ({ key: z.value, value: z.name }))) || [];
    }), m = I({ filters: [] }), k = v(() => m.value.filters);
    ys(() => m.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), ys(() => {
      var z, Q, ne, R, Z;
      let V = ((ne = (Q = (z = s.column.settings.filters) == null ? void 0 : z[0]) == null ? void 0 : Q.value) == null ? void 0 : ne.split(",")) || [];
      if (V.length > 0 && ((R = f.value) != null && R.isEnumInt)) {
        const J = parseInt(V[0]);
        V = ((Z = f.value.enumValues) == null ? void 0 : Z.filter((U) => (J & parseInt(U)) > 0)) || [];
      }
      d.value = V;
    });
    function g(V) {
      let z = s.definitions;
      return _n(V) || (z = z.filter((Q) => Q.types !== "string")), z;
    }
    function w(V, z) {
      return g(V).find((Q) => Q.value === z);
    }
    function O() {
      var z;
      if (!i.value)
        return;
      let V = (z = w(s.column.type, i.value)) == null ? void 0 : z.name;
      V && (m.value.filters.push({ key: i.value, name: V, value: u.value }), i.value = u.value = "");
    }
    function H(V) {
      m.value.filters.splice(V, 1);
    }
    function ae(V) {
      return Tn(w(s.column.type, V.key), s.column.type, V);
    }
    function F() {
      n("done");
    }
    function T() {
      var V;
      i.value = "%", (V = a.value) == null || V.focus();
    }
    function A() {
      var V;
      if (u.value && O(), c.value) {
        let z = Object.values(d.value).filter((Q) => Q);
        m.value.filters = z.length > 0 ? (V = f.value) != null && V.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: z.map((Q) => parseInt(Q)).reduce((Q, ne) => Q + ne, 0).toString() }] : [{ key: "%In", name: "In", value: z.join(",") }] : [];
      }
      n("save", m.value), n("done");
    }
    function ue(V) {
      m.value.sort = V === m.value.sort ? void 0 : V, $t(A);
    }
    return (V, z) => {
      var J;
      const Q = W("SelectInput"), ne = W("TextInput"), R = W("PrimaryButton"), Z = W("SecondaryButton");
      return o(), r("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: F,
        onVnodeMounted: T
      }, [
        l("div", {
          class: "absolute",
          style: tl(`top:${V.topLeft.y}px;left:${V.topLeft.x}px`),
          onClick: z[5] || (z[5] = qe(() => {
          }, ["stop"]))
        }, [
          l("div", Kr, [
            l("div", Zr, [
              Gr,
              l("div", Wr, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: z[0] || (z[0] = (U) => ue("ASC")),
                  class: b(`${m.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, Yr, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: z[1] || (z[1] = (U) => ue("DESC")),
                  class: b(`${m.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, ti, 2)
              ]),
              si,
              c.value ? (o(), r("div", li, [
                (o(!0), r(Fe, null, De(p.value, (U) => (o(), r("div", {
                  key: U.key,
                  class: "flex items-center"
                }, [
                  Ct(l("input", {
                    type: "checkbox",
                    id: U.key,
                    value: U.key,
                    "onUpdate:modelValue": z[2] || (z[2] = (M) => d.value = M),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, ni), [
                    [sl, d.value]
                  ]),
                  l("label", {
                    for: U.key,
                    class: "ml-3"
                  }, j(U.value), 9, oi)
                ]))), 128))
              ])) : (o(), r("div", ai, [
                (o(!0), r(Fe, null, De(k.value, (U, M) => (o(), r("div", ri, [
                  l("span", ii, [
                    _e(j(V.column.name) + " " + j(U.name) + " " + j(ae(U)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (Y) => H(M),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, ci, 8, ui)
                  ])
                ]))), 256)),
                l("div", fi, [
                  xe(Q, {
                    id: "filterRule",
                    class: "w-32 mr-1",
                    modelValue: i.value,
                    "onUpdate:modelValue": z[3] || (z[3] = (U) => i.value = U),
                    entries: $.value,
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue", "entries"]),
                  ((J = w(V.column.type, i.value)) == null ? void 0 : J.valueType) !== "none" ? (o(), oe(ne, {
                    key: 0,
                    ref_key: "txtFilter",
                    ref: a,
                    id: "filterValue",
                    class: "w-32 mr-1",
                    type: "text",
                    modelValue: u.value,
                    "onUpdate:modelValue": z[4] || (z[4] = (U) => u.value = U),
                    onKeyup: tn(O, ["enter"]),
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue"])) : x("", !0),
                  l("div", { class: "pt-1" }, [
                    l("button", {
                      type: "button",
                      onClick: O,
                      class: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, pi)
                  ])
                ])
              ]))
            ]),
            l("div", mi, [
              xe(R, {
                onClick: A,
                color: "red",
                class: "ml-2"
              }, {
                default: Ce(() => [
                  _e(" Save ")
                ]),
                _: 1
              }),
              xe(Z, { onClick: F }, {
                default: Ce(() => [
                  _e(" Cancel ")
                ]),
                _: 1
              })
            ])
          ])
        ], 4)
      ], 512);
    };
  }
}), hi = { class: "px-4 sm:px-6 lg:px-8 text-sm" }, gi = { class: "flex flex-wrap" }, yi = { class: "group pr-4 sm:pr-6 lg:pr-8" }, bi = { class: "flex justify-between w-full font-medium" }, wi = { class: "w-6 flex justify-end" }, ki = { class: "hidden group-hover:inline" }, _i = ["onClick", "title"], $i = /* @__PURE__ */ l("svg", {
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
], xi = {
  key: 0,
  class: "pt-2"
}, Li = { class: "ml-2" }, Vi = { key: 1 }, Si = { class: "pt-2" }, Mi = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, Ai = ["onClick"], Ti = /* @__PURE__ */ l("svg", {
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
], -1), Fi = [
  Ti
], Ii = /* @__PURE__ */ l("span", null, "Clear All", -1), Di = [
  Ii
], Al = /* @__PURE__ */ ce({
  __name: "FilterViews",
  props: {
    definitions: {},
    columns: {}
  },
  emits: ["done", "change"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.columns.filter((m) => m.settings.filters.length > 0));
    function i(m) {
      var k, g;
      return (g = (k = m == null ? void 0 : m[0]) == null ? void 0 : k.value) == null ? void 0 : g.split(",");
    }
    function u(m) {
      let k = s.definitions;
      return _n(m) || (k = k.filter((g) => g.types !== "string")), k;
    }
    function d(m, k) {
      return u(m).find((g) => g.value === k);
    }
    function c(m, k) {
      return Tn(d(m.type, k.value), m.type, k);
    }
    function f(m) {
      m.settings.filters = [], n("change", m);
    }
    function p(m, k) {
      m.settings.filters.splice(k, 1), n("change", m);
    }
    function $() {
      s.columns.forEach((m) => {
        m.settings.filters = [], n("change", m);
      }), n("done");
    }
    return (m, k) => (o(), r("div", hi, [
      l("div", gi, [
        (o(!0), r(Fe, null, De(a.value, (g) => (o(), r("fieldset", yi, [
          l("legend", bi, [
            l("span", null, j(ee(ze)(g.name)), 1),
            l("span", wi, [
              l("span", ki, [
                l("button", {
                  onClick: (w) => f(g),
                  title: `Clear all ${ee(ze)(g.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, Ci, 8, _i)
              ])
            ])
          ]),
          g.meta.isEnum ? (o(), r("div", xi, [
            (o(!0), r(Fe, null, De(i(g.settings.filters), (w) => (o(), r("div", {
              key: w,
              class: "flex items-center"
            }, [
              l("label", Li, j(w), 1)
            ]))), 128))
          ])) : (o(), r("div", Vi, [
            (o(!0), r(Fe, null, De(g.settings.filters, (w, O) => (o(), r("div", Si, [
              l("span", Mi, [
                _e(j(g.name) + " " + j(w.name) + " " + j(c(g, w)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (H) => p(g, O),
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                }, Fi, 8, Ai)
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
        }, Di)
      ])
    ]));
  }
}), ji = { class: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Oi = { class: "" }, Pi = { class: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left" }, Bi = /* @__PURE__ */ l("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" }, "Query Preferences", -1), Ri = { class: "mt-4" }, Ei = ["for"], Hi = ["id"], zi = ["value", "selected"], Ni = { class: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800" }, Ui = ["id", "checked"], qi = ["for"], Qi = { class: "mt-4" }, Ki = { class: "pb-2 px-4" }, Zi = { class: "" }, Gi = ["id", "value"], Wi = ["for"], Ji = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Tl = /* @__PURE__ */ ce({
  __name: "QueryPrefs",
  props: {
    id: { default: "QueryPrefs" },
    columns: {},
    prefs: {},
    maxLimit: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const { autoQueryGridDefaults: s } = At(), n = e, a = t, i = I({});
    ys(() => i.value = Object.assign({
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
    return (f, p) => {
      const $ = W("PrimaryButton"), m = W("SecondaryButton"), k = W("ModalDialog");
      return o(), oe(k, {
        id: f.id,
        onDone: d,
        "size-class": "w-full sm:max-w-prose"
      }, {
        default: Ce(() => [
          l("div", ji, [
            l("div", Oi, [
              l("div", Pi, [
                Bi,
                l("div", Ri, [
                  l("label", {
                    for: `${f.id}-take`,
                    class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                  }, "Results per page", 8, Ei),
                  Ct(l("select", {
                    id: `${f.id}-take`,
                    "onUpdate:modelValue": p[0] || (p[0] = (g) => i.value.take = g),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), r(Fe, null, De(u.filter((g) => n.maxLimit == null || g <= n.maxLimit), (g) => (o(), r("option", {
                      value: g,
                      selected: g === i.value.take
                    }, j(g), 9, zi))), 256))
                  ], 8, Hi), [
                    [co, i.value.take]
                  ])
                ]),
                l("div", Ni, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: p[1] || (p[1] = (g) => i.value.selectedColumns = []),
                    checked: i.value.selectedColumns.length === 0,
                    class: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
                  }, null, 8, Ui),
                  l("label", {
                    class: "ml-3 block text-gray-700 dark:text-gray-300",
                    for: `${f.id}-allColumns`
                  }, "View all columns", 8, qi)
                ]),
                l("div", Qi, [
                  l("div", Ki, [
                    l("div", Zi, [
                      (o(!0), r(Fe, null, De(f.columns, (g) => (o(), r("div", {
                        key: g.name,
                        class: "flex items-center"
                      }, [
                        Ct(l("input", {
                          type: "checkbox",
                          id: g.name,
                          value: g.name,
                          "onUpdate:modelValue": p[2] || (p[2] = (w) => i.value.selectedColumns = w),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, Gi), [
                          [sl, i.value.selectedColumns]
                        ]),
                        l("label", {
                          for: g.name,
                          class: "ml-3"
                        }, j(g.name), 9, Wi)
                      ]))), 128))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          l("div", Ji, [
            xe($, {
              onClick: c,
              color: "red",
              class: "ml-2"
            }, {
              default: Ce(() => [
                _e(" Save ")
              ]),
              _: 1
            }),
            xe(m, { onClick: d }, {
              default: Ce(() => [
                _e(" Cancel ")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["id"]);
    };
  }
}), Xi = { key: 0 }, Yi = { key: 1 }, eu = {
  key: 2,
  class: "pt-1"
}, tu = { key: 0 }, su = { key: 1 }, lu = { key: 3 }, nu = { class: "pl-1 pt-1 flex flex-wrap" }, ou = { class: "flex mt-1" }, au = ["title"], ru = /* @__PURE__ */ l("svg", {
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
], -1), iu = [
  ru
], uu = ["disabled"], du = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), cu = [
  du
], fu = ["disabled"], vu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), pu = [
  vu
], mu = ["disabled"], hu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), gu = [
  hu
], yu = ["disabled"], bu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), wu = [
  bu
], ku = {
  key: 0,
  class: "flex mt-1"
}, _u = { class: "px-4 text-lg text-black dark:text-white" }, $u = { key: 0 }, Cu = { key: 1 }, xu = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Lu = { key: 2 }, Vu = { class: "flex flex-wrap" }, Su = {
  key: 0,
  class: "pl-2 mt-1"
}, Mu = /* @__PURE__ */ l("svg", {
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
], -1), Au = [
  Mu
], Tu = {
  key: 1,
  class: "pl-2 mt-1"
}, Fu = /* @__PURE__ */ $s('<svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fill-rule="evenodd"></path><path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z"></path><path fill="#fff" fill-rule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z"></path></svg><span class="text-green-900 dark:text-green-100">Excel</span>', 2), Iu = [
  Fu
], Du = {
  key: 2,
  class: "pl-2 mt-1"
}, ju = {
  key: 0,
  class: "w-5 h-5 mr-1 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Ou = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M5 13l4 4L19 7"
}, null, -1), Pu = [
  Ou
], Bu = {
  key: 1,
  class: "w-5 h-5 mr-1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Ru = /* @__PURE__ */ l("g", { fill: "none" }, [
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
], -1), Eu = [
  Ru
], Hu = /* @__PURE__ */ l("span", { class: "whitespace-nowrap" }, "Copy URL", -1), zu = {
  key: 3,
  class: "pl-2 mt-1"
}, Nu = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), Uu = [
  Nu
], qu = {
  key: 4,
  class: "pl-2 mt-1"
}, Qu = /* @__PURE__ */ l("svg", {
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
], -1), Ku = { class: "mr-1" }, Zu = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Gu = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), Wu = [
  Gu
], Ju = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Xu = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), Yu = [
  Xu
], ed = {
  key: 5,
  class: "pl-2 mt-1"
}, td = ["title"], sd = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), ld = { class: "whitespace-nowrap" }, nd = { key: 7 }, od = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, ad = { class: "mr-1 select-none" }, rd = {
  key: 1,
  class: "flex justify-between items-center"
}, id = { class: "mr-1 select-none" }, fs = 25, ud = /* @__PURE__ */ ce({
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
    apiPrefs: {},
    canFilter: {},
    disableKeyBindings: {},
    configureField: {},
    skip: { default: 0 },
    create: { type: Boolean },
    edit: {},
    filters: {}
  },
  emits: ["headerSelected", "rowSelected"],
  setup(e, { expose: t, emit: s }) {
    const { config: n, autoQueryGridDefaults: a } = At(), i = a, u = n.value.storage, d = e, c = s, f = Ue("client"), p = "filtering,queryString,queryFilters".split(","), $ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar".split(","), m = v(() => d.deny ? _t(p, d.deny) : _t(p, i.value.deny)), k = v(() => d.hide ? _t($, d.hide) : _t($, i.value.hide));
    function g(_) {
      return m.value[_];
    }
    function w(_) {
      return k.value[_];
    }
    const O = v(() => d.tableStyle ?? i.value.tableStyle), H = v(() => d.gridClass ?? he.getGridClass(O.value)), ae = v(() => d.grid2Class ?? he.getGrid2Class(O.value)), F = v(() => d.grid3Class ?? he.getGrid3Class(O.value)), T = v(() => d.grid4Class ?? he.getGrid4Class(O.value)), A = v(() => d.tableClass ?? he.getTableClass(O.value)), ue = v(() => d.theadClass ?? he.getTheadClass(O.value)), V = v(() => d.theadRowClass ?? he.getTheadRowClass(O.value)), z = v(() => d.theadCellClass ?? he.getTheadCellClass(O.value)), Q = v(() => d.toolbarButtonClass ?? he.toolbarButtonClass);
    function ne(_, P) {
      var Te;
      if (d.rowClass)
        return d.rowClass(_, P);
      const ve = !!ke.value.AnyUpdate, be = ((Te = Ve.value) != null && Te.name ? we(_, Ve.value.name) : null) == G.value;
      return he.getTableRowClass(d.tableStyle, P, be, ve);
    }
    const R = ll(), Z = v(() => {
      var _;
      return Bs(((_ = ke.value.AnyQuery.viewModel) == null ? void 0 : _.name) || ke.value.AnyQuery.dataModel.name);
    }), J = v(() => {
      const _ = Object.keys(R).map((P) => P.toLowerCase());
      return tt(Z.value).filter((P) => _.includes(P.name.toLowerCase()) || _.includes(P.name.toLowerCase() + "-header")).map((P) => P.name);
    });
    function U() {
      let _ = bt(d.selectedColumns);
      return _.length > 0 ? _ : J.value.length > 0 ? J.value : [];
    }
    const M = v(() => {
      let P = U().map((re) => re.toLowerCase());
      const ve = tt(Z.value);
      return P.length > 0 ? P.map((re) => ve.find((be) => be.name.toLowerCase() === re)).filter((re) => re != null) : ve;
    }), Y = v(() => {
      let _ = M.value.map((ve) => ve.name), P = bt(pe.value.selectedColumns).map((ve) => ve.toLowerCase());
      return P.length > 0 ? _.filter((ve) => P.includes(ve.toLowerCase())) : _;
    }), y = I([]), N = I(new Xe()), E = I(new Xe()), h = I(), C = I(!1), G = I(), X = I(), te = I(!1), D = I(), L = I(d.skip), fe = I(!1), pe = I({ take: fs }), ie = I(!1), me = v(() => y.value.some((_) => _.settings.filters.length > 0 || !!_.settings.sort) || pe.value.selectedColumns), S = v(() => y.value.map((_) => _.settings.filters.length).reduce((_, P) => _ + P, 0)), de = v(() => {
      var _;
      return tt(Bs(Ft.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name)));
    }), Ve = v(() => {
      var _;
      return ss(Bs(Ft.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name)));
    }), Se = v(() => pe.value.take ?? fs), ge = v(() => N.value.response ? we(N.value.response, "results") : []), B = v(() => {
      var _;
      return ((_ = N.value.response) == null ? void 0 : _.total) ?? ge.value.length ?? 0;
    }), q = v(() => L.value > 0), se = v(() => L.value > 0), ye = v(() => ge.value.length >= Se.value), $e = v(() => ge.value.length >= Se.value), Ie = I(), Ee = I(), Ae = {
      NoQuery: "No Query API was found"
    };
    t({ update: lt, search: Il, createRequestArgs: Os, reset: Nl, createDone: qt, createSave: Es, editDone: Ut, editSave: is, forceUpdate: Fl, setEdit: js, edit: X }), le.interceptors.has("AutoQueryGrid.new") && le.interceptors.invoke("AutoQueryGrid.new", { props: d });
    function Oe(_) {
      if (_) {
        if (d.canFilter)
          return d.canFilter(_);
        const P = de.value.find((ve) => ve.name.toLowerCase() == _.toLowerCase());
        if (P)
          return !$n(P);
      }
      return !1;
    }
    function je(_) {
      g("queryString") && al(_);
    }
    async function Ge(_) {
      L.value += _, L.value < 0 && (L.value = 0);
      const P = Math.floor(B.value / Se.value) * Se.value;
      L.value > P && (L.value = P), je({ skip: L.value || void 0 }), await lt();
    }
    async function Re(_, P) {
      var be, Te;
      if (X.value = null, G.value = P, !_ || !P)
        return;
      let ve = Jt(ke.value.AnyQuery, { [_]: P });
      const re = await f.api(ve);
      if (re.succeeded) {
        let He = (be = we(re.response, "results")) == null ? void 0 : be[0];
        He || console.warn(`API ${(Te = ke.value.AnyQuery) == null ? void 0 : Te.request.name}(${_}:${P}) returned no results`), X.value = He;
      }
    }
    async function it(_, P) {
      var be;
      c("rowSelected", _, P);
      const ve = (be = Ve.value) == null ? void 0 : be.name, re = ve ? we(_, ve) : null;
      !ve || !re || (je({ edit: re }), Re(ve, re));
    }
    function Tt(_, P) {
      var re;
      if (!g("filtering"))
        return;
      let ve = P.target;
      if (Oe(_) && (ve == null ? void 0 : ve.tagName) !== "TD") {
        let be = (re = ve == null ? void 0 : ve.closest("TABLE")) == null ? void 0 : re.getBoundingClientRect(), Te = y.value.find((He) => He.name.toLowerCase() == _.toLowerCase());
        if (Te && be) {
          let He = 318, ut = be.x + He + 10;
          D.value = {
            column: Te,
            topLeft: {
              x: Math.max(Math.floor(P.clientX + He / 2), ut),
              y: be.y + 45
            }
          };
        }
      }
      c("headerSelected", _, P);
    }
    function ht() {
      D.value = null;
    }
    async function ns(_) {
      var ve;
      let P = (ve = D.value) == null ? void 0 : ve.column;
      P && (P.settings = _, u.setItem(as(P.name), JSON.stringify(P.settings)), await lt()), D.value = null;
    }
    async function os(_) {
      u.setItem(as(_.name), JSON.stringify(_.settings)), await lt();
    }
    async function Xn(_) {
      te.value = !1, pe.value = _, u.setItem(Ps(), JSON.stringify(_)), await lt();
    }
    function js(_) {
      Object.assign(X.value, _), Fl();
    }
    function Fl() {
      var P, ve, re;
      (P = Ie.value) == null || P.forceUpdate(), (ve = Ee.value) == null || ve.forceUpdate();
      const _ = Be();
      (re = _ == null ? void 0 : _.proxy) == null || re.$forceUpdate();
    }
    async function lt() {
      await Il(Os());
    }
    async function Yn() {
      await lt();
    }
    async function Il(_) {
      const P = ke.value.AnyQuery;
      if (!P) {
        console.error(Ae.NoQuery);
        return;
      }
      let ve = Jt(P, _), re = on((He) => {
        N.value.response = N.value.error = void 0, ie.value = He;
      }), be = await f.api(ve);
      re(), $t(() => N.value = be);
      let Te = we(be.response, "results") || [];
      !be.succeeded || Te.label == 0;
    }
    function Os() {
      let _ = {
        include: "total",
        take: Se.value
      }, P = bt(pe.value.selectedColumns || d.selectedColumns);
      if (P.length > 0) {
        let re = Ve.value;
        re && !P.includes(re.name) && (P = [re.name, ...P]);
        const be = de.value, Te = [];
        P.forEach((He) => {
          var us;
          const ut = be.find((Pe) => Pe.name.toLowerCase() == He.toLowerCase());
          (us = ut == null ? void 0 : ut.ref) != null && us.selfId && Te.push(ut.ref.selfId), we(R, He) && Te.push(...be.filter((Pe) => {
            var gt, Qt;
            return ((Qt = (gt = Pe.ref) == null ? void 0 : gt.selfId) == null ? void 0 : Qt.toLowerCase()) == He.toLowerCase();
          }).map((Pe) => Pe.name));
        }), Te.forEach((He) => {
          P.includes(He) || P.push(He);
        }), _.fields = P.join(",");
      }
      let ve = [];
      if (y.value.forEach((re) => {
        re.settings.sort && ve.push((re.settings.sort === "DESC" ? "-" : "") + re.name), re.settings.filters.forEach((be) => {
          let Te = be.key.replace("%", re.name);
          _[Te] = be.value;
        });
      }), d.filters && Object.keys(d.filters).forEach((re) => {
        _[re] = d.filters[re];
      }), g("queryString") && g("queryFilters")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + vs(location.hash, "?") : "";
        let be = qs(re);
        if (Object.keys(be).forEach((Te) => {
          M.value.find((ut) => ut.name.toLowerCase() === Te.toLowerCase()) && (_[Te] = be[Te]);
        }), typeof be.skip < "u") {
          const Te = parseInt(be.skip);
          isNaN(Te) || (L.value = _.skip = Te);
        }
      }
      return typeof _.skip > "u" && L.value > 0 && (_.skip = L.value), ve.length > 0 && (_.orderBy = ve.join(",")), _;
    }
    function eo() {
      const _ = Dl("csv");
      Zs(_), typeof window < "u" && window.open(_);
    }
    function to() {
      const _ = Dl("json");
      Zs(_), fe.value = !0, setTimeout(() => fe.value = !1, 3e3);
    }
    function Dl(_ = "json") {
      var Te;
      const P = Os(), ve = `/api/${(Te = ke.value.AnyQuery) == null ? void 0 : Te.request.name}`, re = Vo(f.baseUrl, Gt(ve, { ...P, jsconfig: "edv" }));
      return re.indexOf("?") >= 0 ? Cs(re, "?") + "." + _ + "?" + vs(re, "?") : re + ".json";
    }
    async function so() {
      y.value.forEach((_) => {
        _.settings = { filters: [] }, u.removeItem(as(_.name));
      }), pe.value = { take: fs }, u.removeItem(Ps()), await lt();
    }
    function lo() {
      C.value = !0, je({ create: null });
    }
    const Ft = v(() => zt(d.type)), vt = v(() => {
      var _;
      return Ft.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name);
    }), Ps = () => {
      var _;
      return `${d.id}/ApiPrefs/${Ft.value || ((_ = ke.value.AnyQuery) == null ? void 0 : _.dataModel.name)}`;
    }, as = (_) => {
      var P;
      return `Column/${d.id}:${Ft.value || ((P = ke.value.AnyQuery) == null ? void 0 : P.dataModel.name)}.${_}`;
    }, { metadataApi: jl, typeOf: Bs, apiOf: Ol, filterDefinitions: no } = rt(), { invalidAccessMessage: Rs } = Sl(), Pl = v(() => d.filterDefinitions || no.value), ke = v(() => {
      let _ = bt(d.apis);
      return _.length > 0 ? Rt.from(_.map((P) => Ol(P)).filter((P) => P != null).map((P) => P)) : Rt.forType(Ft.value, jl.value);
    }), rs = (_) => `<span class="text-yellow-700">${_}</span>`, Bl = v(() => {
      if (!jl.value)
        return rs(`AppMetadata not loaded, see <a class="${_s.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let P = bt(d.apis).map((re) => Ol(re) == null ? re : null).filter((re) => re != null);
      if (P.length > 0)
        return rs(`Unknown API${P.length > 1 ? "s" : ""}: ${P.join(", ")}`);
      let ve = ke.value;
      return ve.empty ? rs("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : ve.AnyQuery ? null : rs(Ae.NoQuery);
    }), Rl = v(() => ke.value.AnyQuery && Rs(ke.value.AnyQuery)), El = v(() => ke.value.Create && Rs(ke.value.Create)), Hl = v(() => ke.value.AnyUpdate && Rs(ke.value.AnyUpdate)), oo = v(() => gs(ke.value.Create));
    v(() => gs(ke.value.AnyUpdate));
    const zl = v(() => gs(ke.value.Delete));
    function Ut() {
      X.value = null, G.value = null, je({ edit: void 0 });
    }
    function qt() {
      C.value = !1, je({ create: void 0 });
    }
    async function is() {
      await lt(), Ut();
    }
    async function Es() {
      await lt(), qt();
    }
    function Nl() {
      var ve;
      N.value = new Xe(), E.value = new Xe(), C.value = !1, G.value = null, X.value = null, te.value = !1, D.value = null, L.value = d.skip, fe.value = !1, pe.value = { take: fs }, ie.value = !1;
      const _ = d.prefs || ks(u.getItem(Ps()));
      _ && (pe.value = _), y.value = M.value.map((re) => ({
        name: re.name,
        type: re.type,
        meta: re,
        settings: Object.assign(
          {
            filters: []
          },
          ks(u.getItem(as(re.name)))
        )
      })), isNaN(d.skip) || (L.value = d.skip);
      let P = (ve = Ve.value) == null ? void 0 : ve.name;
      if (g("queryString")) {
        const re = location.search ? location.search : location.hash.includes("?") ? "?" + vs(location.hash, "?") : "";
        let be = qs(re);
        typeof be.create < "u" ? C.value = typeof be.create < "u" : P && (typeof be.edit == "string" || typeof be.edit == "number") && Re(P, be.edit);
      }
      d.create === !0 && (C.value = !0), P && d.edit != null && Re(P, d.edit);
    }
    return st(async () => {
      Nl(), await lt();
    }), (_, P) => {
      const ve = W("Alert"), re = W("EnsureAccessDialog"), be = W("AutoCreateForm"), Te = W("AutoEditForm"), He = W("ErrorSummary"), ut = W("Loading"), Ul = W("SettingsIcons"), us = W("DataGrid");
      return Bl.value ? (o(), r("div", Xi, [
        xe(ve, { innerHTML: Bl.value }, null, 8, ["innerHTML"])
      ])) : Rl.value ? (o(), r("div", Yi, [
        xe(Jn, { "invalid-access": Rl.value }, null, 8, ["invalid-access"])
      ])) : (o(), r("div", eu, [
        C.value && ke.value.Create ? (o(), r("div", tu, [
          El.value ? (o(), oe(re, {
            key: 0,
            title: `Create ${vt.value}`,
            "invalid-access": El.value,
            "alert-class": "text-yellow-700",
            onDone: qt
          }, null, 8, ["title", "invalid-access"])) : ee(R).createform ? K(_.$slots, "createform", {
            key: 1,
            type: ke.value.Create.request.name,
            configure: _.configureField,
            done: qt,
            save: Es
          }) : (o(), oe(be, {
            key: 2,
            ref_key: "createForm",
            ref: Ie,
            type: ke.value.Create.request.name,
            configure: _.configureField,
            onDone: qt,
            onSave: Es
          }, {
            header: Ce(() => [
              K(_.$slots, "formheader", {
                form: "create",
                formInstance: Ie.value,
                apis: ke.value,
                type: vt.value
              })
            ]),
            footer: Ce(() => [
              K(_.$slots, "formfooter", {
                form: "create",
                formInstance: Ie.value,
                apis: ke.value,
                type: vt.value
              })
            ]),
            _: 3
          }, 8, ["type", "configure"]))
        ])) : X.value && ke.value.AnyUpdate ? (o(), r("div", su, [
          Hl.value ? (o(), oe(re, {
            key: 0,
            title: `Update ${vt.value}`,
            "invalid-access": Hl.value,
            "alert-class": "text-yellow-700",
            onDone: Ut
          }, null, 8, ["title", "invalid-access"])) : ee(R).editform ? K(_.$slots, "editform", {
            key: 1,
            model: X.value,
            type: ke.value.AnyUpdate.request.name,
            deleteType: zl.value ? ke.value.Delete.request.name : null,
            configure: _.configureField,
            done: Ut,
            save: is
          }) : (o(), oe(Te, {
            key: 2,
            ref_key: "editForm",
            ref: Ee,
            modelValue: X.value,
            "onUpdate:modelValue": P[0] || (P[0] = (Pe) => X.value = Pe),
            type: ke.value.AnyUpdate.request.name,
            deleteType: zl.value ? ke.value.Delete.request.name : null,
            configure: _.configureField,
            onDone: Ut,
            onSave: is,
            onDelete: is
          }, {
            header: Ce(() => [
              K(_.$slots, "formheader", {
                form: "edit",
                formInstance: Ee.value,
                apis: ke.value,
                type: vt.value,
                model: X.value,
                id: G.value,
                updateModel: js
              })
            ]),
            footer: Ce(() => [
              K(_.$slots, "formfooter", {
                form: "edit",
                formInstance: Ee.value,
                apis: ke.value,
                type: vt.value,
                model: X.value,
                id: G.value,
                updateModel: js
              })
            ]),
            _: 3
          }, 8, ["modelValue", "type", "deleteType", "configure"]))
        ])) : x("", !0),
        ee(R).toolbar ? K(_.$slots, "toolbar", { key: 2 }) : w("toolbar") ? (o(), r("div", lu, [
          te.value ? (o(), oe(Tl, {
            key: 0,
            columns: M.value,
            prefs: pe.value,
            onDone: P[1] || (P[1] = (Pe) => te.value = !1),
            onSave: Xn
          }, null, 8, ["columns", "prefs"])) : x("", !0),
          l("div", nu, [
            l("div", ou, [
              w("preferences") ? (o(), r("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${vt.value} Preferences`,
                onClick: P[2] || (P[2] = (Pe) => te.value = !te.value)
              }, iu, 8, au)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 1,
                type: "button",
                class: b(["pl-2", q.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !q.value,
                onClick: P[3] || (P[3] = (Pe) => Ge(-B.value))
              }, cu, 10, uu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 2,
                type: "button",
                class: b(["pl-2", se.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !se.value,
                onClick: P[4] || (P[4] = (Pe) => Ge(-Se.value))
              }, pu, 10, fu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 3,
                type: "button",
                class: b(["pl-2", ye.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !ye.value,
                onClick: P[5] || (P[5] = (Pe) => Ge(Se.value))
              }, gu, 10, mu)) : x("", !0),
              w("pagingNav") ? (o(), r("button", {
                key: 4,
                type: "button",
                class: b(["pl-2", $e.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !$e.value,
                onClick: P[6] || (P[6] = (Pe) => Ge(B.value))
              }, wu, 10, yu)) : x("", !0)
            ]),
            w("pagingInfo") ? (o(), r("div", ku, [
              l("div", _u, [
                ie.value ? (o(), r("span", $u, "Querying...")) : x("", !0),
                ge.value.length ? (o(), r("span", Cu, [
                  xu,
                  _e(" " + j(L.value + 1) + " - " + j(Math.min(L.value + ge.value.length, B.value)) + " ", 1),
                  l("span", null, " of " + j(B.value), 1)
                ])) : N.value.completed ? (o(), r("span", Lu, "No Results")) : x("", !0)
              ])
            ])) : x("", !0),
            l("div", Vu, [
              w("refresh") ? (o(), r("div", Su, [
                l("button", {
                  type: "button",
                  onClick: Yn,
                  title: "Refresh",
                  class: b(Q.value)
                }, Au, 2)
              ])) : x("", !0),
              w("downloadCsv") ? (o(), r("div", Tu, [
                l("button", {
                  type: "button",
                  onClick: eo,
                  title: "Download CSV",
                  class: b(Q.value)
                }, Iu, 2)
              ])) : x("", !0),
              w("copyApiUrl") ? (o(), r("div", Du, [
                l("button", {
                  type: "button",
                  onClick: to,
                  title: "Copy API URL",
                  class: b(Q.value)
                }, [
                  fe.value ? (o(), r("svg", ju, Pu)) : (o(), r("svg", Bu, Eu)),
                  Hu
                ], 2)
              ])) : x("", !0),
              me.value && w("resetPreferences") ? (o(), r("div", zu, [
                l("button", {
                  type: "button",
                  onClick: so,
                  title: "Reset Preferences & Filters",
                  class: b(Q.value)
                }, Uu, 2)
              ])) : x("", !0),
              w("filtersView") && S.value > 0 ? (o(), r("div", qu, [
                l("button", {
                  type: "button",
                  onClick: P[7] || (P[7] = (Pe) => h.value = h.value == "filters" ? null : "filters"),
                  class: b(Q.value),
                  "aria-expanded": "false"
                }, [
                  Qu,
                  l("span", Ku, j(S.value) + " " + j(S.value == 1 ? "Filter" : "Filters"), 1),
                  h.value != "filters" ? (o(), r("svg", Zu, Wu)) : (o(), r("svg", Ju, Yu))
                ], 2)
              ])) : x("", !0),
              w("newItem") && ke.value.Create && oo.value ? (o(), r("div", ed, [
                l("button", {
                  type: "button",
                  onClick: lo,
                  title: vt.value,
                  class: b(Q.value)
                }, [
                  sd,
                  l("span", ld, "New " + j(vt.value), 1)
                ], 10, td)
              ])) : x("", !0),
              ee(R).toolbarbuttons ? K(_.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: Q.value
              }) : x("", !0)
            ])
          ])
        ])) : x("", !0),
        h.value == "filters" ? (o(), oe(Al, {
          key: 4,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: Pl.value,
          columns: y.value,
          onDone: P[8] || (P[8] = (Pe) => h.value = null),
          onChange: os
        }, null, 8, ["definitions", "columns"])) : x("", !0),
        E.value.error ?? N.value.error ? (o(), oe(He, {
          key: 5,
          status: E.value.error ?? N.value.error
        }, null, 8, ["status"])) : ie.value ? (o(), oe(ut, {
          key: 6,
          class: "p-2"
        })) : x("", !0),
        D.value ? (o(), r("div", nd, [
          xe(Ml, {
            definitions: Pl.value,
            column: D.value.column,
            "top-left": D.value.topLeft,
            onDone: ht,
            onSave: ns
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : x("", !0),
        ge.value.length ? (o(), oe(us, {
          key: 8,
          id: _.id,
          items: ge.value,
          type: _.type,
          "selected-columns": Y.value,
          class: "mt-1",
          onFiltersChanged: lt,
          tableStyle: O.value,
          gridClass: H.value,
          grid2Class: ae.value,
          grid3Class: F.value,
          grid4Class: T.value,
          tableClass: A.value,
          theadClass: ue.value,
          theadRowClass: V.value,
          theadCellClass: z.value,
          tbodyClass: _.tbodyClass,
          rowClass: ne,
          onRowSelected: it,
          rowStyle: _.rowStyle,
          headerTitle: _.headerTitle,
          headerTitles: _.headerTitles,
          visibleFrom: _.visibleFrom,
          onHeaderSelected: Tt
        }, nl({
          header: Ce(({ column: Pe, label: gt }) => {
            var Qt;
            return [
              g("filtering") && Oe(Pe) ? (o(), r("div", od, [
                l("span", ad, j(gt), 1),
                xe(Ul, {
                  column: y.value.find((ao) => ao.name.toLowerCase() === Pe.toLowerCase()),
                  "is-open": ((Qt = D.value) == null ? void 0 : Qt.column.name) === Pe
                }, null, 8, ["column", "is-open"])
              ])) : (o(), r("div", rd, [
                l("span", id, j(gt), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          De(Object.keys(ee(R)), (Pe) => ({
            name: Pe,
            fn: Ce((gt) => [
              K(_.$slots, Pe, Pt(bs(gt)))
            ])
          }))
        ]), 1032, ["id", "items", "type", "selected-columns", "tableStyle", "gridClass", "grid2Class", "grid3Class", "grid4Class", "tableClass", "theadClass", "theadRowClass", "theadCellClass", "tbodyClass", "rowStyle", "headerTitle", "headerTitles", "visibleFrom"])) : x("", !0)
      ]));
    };
  }
}), dd = { class: "flex" }, cd = {
  key: 0,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, fd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), vd = [
  fd
], pd = /* @__PURE__ */ l("path", {
  d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z",
  fill: "currentColor"
}, null, -1), md = /* @__PURE__ */ l("path", {
  d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
  fill: "currentColor"
}, null, -1), hd = [
  pd,
  md
], gd = {
  key: 2,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, yd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z",
    fill: "currentColor"
  })
], -1), bd = [
  yd
], wd = {
  key: 3,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, kd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
    fill: "currentColor"
  })
], -1), _d = [
  kd
], $d = /* @__PURE__ */ ce({
  __name: "SettingsIcons",
  props: {
    column: {},
    isOpen: { type: Boolean }
  },
  setup(e) {
    return (t, s) => {
      var n, a, i, u, d, c, f;
      return o(), r("div", dd, [
        (i = (a = (n = t.column) == null ? void 0 : n.settings) == null ? void 0 : a.filters) != null && i.length ? (o(), r("svg", cd, vd)) : (o(), r("svg", {
          key: 1,
          class: b(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, hd, 2)),
        ((d = (u = t.column) == null ? void 0 : u.settings) == null ? void 0 : d.sort) === "ASC" ? (o(), r("svg", gd, bd)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), r("svg", wd, _d)) : x("", !0)
      ]);
    };
  }
}), Cd = /* @__PURE__ */ ce({
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
      const n = W("EnsureAccess"), a = W("SlideOver");
      return t.invalidAccess ? (o(), oe(a, {
        key: 0,
        title: t.title,
        onDone: s[0] || (s[0] = (i) => t.$emit("done")),
        "content-class": "relative flex-1"
      }, nl({
        default: Ce(() => [
          xe(n, {
            alertClass: t.alertClass,
            invalidAccess: t.invalidAccess
          }, null, 8, ["alertClass", "invalidAccess"])
        ]),
        _: 2
      }, [
        t.subtitle ? {
          name: "subtitle",
          fn: Ce(() => [
            _e(j(t.subtitle), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["title"])) : x("", !0);
    };
  }
}), xd = ["for"], Ld = { class: "mt-1 relative rounded-md shadow-sm" }, Vd = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Sd = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Md = /* @__PURE__ */ l("svg", {
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
], -1), Ad = [
  Md
], Td = ["id"], Fd = ["id"], Id = {
  inheritAttrs: !1
}, Dd = /* @__PURE__ */ ce({
  ...Id,
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
    const s = (m) => m.value, n = e;
    t({
      focus: i
    });
    const a = I();
    function i() {
      var m;
      (m = a.value) == null || m.focus();
    }
    const u = v(() => n.type || "text"), d = v(() => n.label ?? ze(ot(n.id))), c = v(() => n.placeholder ?? d.value);
    let f = Ue("ApiState", void 0);
    const p = v(() => mt.call({ responseStatus: n.status ?? (f == null ? void 0 : f.error.value) }, n.id)), $ = v(() => [nt.base, p.value ? nt.invalid : nt.valid, n.inputClass]);
    return (m, k) => (o(), r("div", {
      class: b([m.$attrs.class])
    }, [
      K(m.$slots, "header", Me({
        inputElement: a.value,
        id: m.id,
        modelValue: m.modelValue,
        status: m.status
      }, m.$attrs)),
      d.value ? (o(), r("label", {
        key: 0,
        for: m.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${m.labelClass ?? ""}`)
      }, j(d.value), 11, xd)) : x("", !0),
      l("div", Ld, [
        l("input", Me({
          ref_key: "inputElement",
          ref: a,
          type: u.value,
          name: m.id,
          id: m.id,
          class: $.value,
          placeholder: c.value,
          value: m.modelValue,
          onInput: k[0] || (k[0] = (g) => m.$emit("update:modelValue", s(g.target))),
          "aria-invalid": p.value != null,
          "aria-describedby": `${m.id}-error`,
          step: "any"
        }, ee(ft)(m.$attrs, ["class"])), null, 16, Vd),
        p.value ? (o(), r("div", Sd, Ad)) : x("", !0)
      ]),
      p.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${m.id}-error`
      }, j(p.value), 9, Td)) : m.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${m.id}-description`
      }, j(m.help), 9, Fd)) : x("", !0),
      K(m.$slots, "footer", Me({
        inputElement: a.value,
        id: m.id,
        modelValue: m.modelValue,
        status: m.status
      }, m.$attrs))
    ], 2));
  }
}), jd = ["for"], Od = { class: "mt-1 relative rounded-md shadow-sm" }, Pd = ["name", "id", "placeholder", "aria-invalid", "aria-describedby"], Bd = ["id"], Rd = ["id"], Ed = {
  inheritAttrs: !1
}, Hd = /* @__PURE__ */ ce({
  ...Ed,
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
    const t = (c) => c.value, s = e, n = v(() => s.label ?? ze(ot(s.id))), a = v(() => s.placeholder ?? n.value);
    let i = Ue("ApiState", void 0);
    const u = v(() => mt.call({ responseStatus: s.status ?? (i == null ? void 0 : i.error.value) }, s.id)), d = v(() => ["shadow-sm " + nt.base, u.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + nt.valid, s.inputClass]);
    return (c, f) => (o(), r("div", {
      class: b([c.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: c.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${c.labelClass ?? ""}`)
      }, j(n.value), 11, jd)) : x("", !0),
      l("div", Od, [
        l("textarea", Me({
          name: c.id,
          id: c.id,
          class: d.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (p) => c.$emit("update:modelValue", t(p.target))),
          "aria-invalid": u.value != null,
          "aria-describedby": `${c.id}-error`
        }, ee(ft)(c.$attrs, ["class"])), j(c.modelValue), 17, Pd)
      ]),
      u.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, j(u.value), 9, Bd)) : c.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, j(c.help), 9, Rd)) : x("", !0)
    ], 2));
  }
}), zd = ["for"], Nd = ["id", "name", "value", "aria-invalid", "aria-describedby"], Ud = ["value"], qd = ["id"], Qd = {
  inheritAttrs: !1
}, Kd = /* @__PURE__ */ ce({
  ...Qd,
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
    const t = (d) => d.value, s = e, n = v(() => s.label ?? ze(ot(s.id)));
    let a = Ue("ApiState", void 0);
    const i = v(() => mt.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id)), u = v(() => s.entries || (s.values ? s.values.map((d) => ({ key: d, value: d })) : s.options ? Object.keys(s.options).map((d) => ({ key: d, value: s.options[d] })) : []));
    return (d, c) => (o(), r("div", {
      class: b([d.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: d.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${d.labelClass ?? ""}`)
      }, j(n.value), 11, zd)) : x("", !0),
      l("select", Me({
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
      }, ee(ft)(d.$attrs, ["class"])), [
        (o(!0), r(Fe, null, De(u.value, (f) => (o(), r("option", {
          value: f.key
        }, j(f.value), 9, Ud))), 256))
      ], 16, Nd),
      i.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${d.id}-error`
      }, j(i.value), 9, qd)) : x("", !0)
    ], 2));
  }
}), Zd = { class: "flex items-center h-5" }, Gd = ["id", "name", "checked"], Wd = { class: "ml-3 text-sm" }, Jd = ["for"], Xd = {
  key: 0,
  class: "mt-2 text-sm text-red-500",
  id: "`${id}-error`"
}, Yd = {
  key: 1,
  class: "mt-2 text-sm text-gray-500",
  id: "`${id}-description`"
}, ec = {
  inheritAttrs: !1
}, tc = /* @__PURE__ */ ce({
  ...ec,
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
    const s = e, n = v(() => s.label ?? ze(ot(s.id)));
    let a = Ue("ApiState", void 0);
    const i = v(() => mt.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id));
    return (u, d) => (o(), r("div", {
      class: b(["relative flex items-start", u.$attrs.class])
    }, [
      l("div", Zd, [
        l("input", Me({
          id: u.id,
          name: u.id,
          type: "checkbox",
          checked: u.modelValue,
          onInput: d[0] || (d[0] = (c) => u.$emit("update:modelValue", c.target.checked)),
          class: ["focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800", u.inputClass]
        }, ee(ft)(u.$attrs, ["class"])), null, 16, Gd)
      ]),
      l("div", Wd, [
        l("label", {
          for: u.id,
          class: b(`font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
        }, j(n.value), 11, Jd),
        i.value ? (o(), r("p", Xd, j(i.value), 1)) : u.help ? (o(), r("p", Yd, j(u.help), 1)) : x("", !0)
      ])
    ], 2));
  }
}), sc = ["id"], lc = ["for"], nc = { class: "mt-1 relative rounded-md shadow-sm" }, oc = ["id", "name", "value"], ac = { class: "flex flex-wrap pb-1.5" }, rc = { class: "pt-1.5 pl-1" }, ic = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300" }, uc = ["onClick"], dc = /* @__PURE__ */ l("svg", {
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
], -1), cc = [
  dc
], fc = { class: "pt-1.5 pl-1 shrink" }, vc = ["type", "name", "id", "aria-invalid", "aria-describedby"], pc = ["id"], mc = ["onMouseover", "onClick"], hc = { class: "block truncate" }, gc = {
  key: 1,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, yc = /* @__PURE__ */ l("svg", {
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
], -1), bc = [
  yc
], wc = ["id"], kc = ["id"], _c = {
  inheritAttrs: !1
}, $c = /* @__PURE__ */ ce({
  ..._c,
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
    function a(y) {
      return s.converter ? s.converter(y) : y;
    }
    const i = v(() => Qe(a(s.modelValue), (y) => typeof y == "string" ? y.trim().length == 0 ? [] : y.split(",") : y) || []), u = I(), d = I(!1), c = v(() => {
      const y = $.value.toLowerCase();
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((N) => !i.value.includes(N) && N.toLowerCase().includes(y)) : s.allowableValues.filter((N) => !i.value.includes(N) && N.startsWith(y));
    });
    function f(y) {
      u.value = y;
    }
    const p = I(null), $ = I(""), m = v(() => s.type || "text"), k = v(() => s.label ?? ze(ot(s.id)));
    let g = Ue("ApiState", void 0);
    const w = v(() => mt.call({ responseStatus: s.status ?? (g == null ? void 0 : g.error.value) }, s.id)), O = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      w.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), H = (y) => V(i.value.filter((N) => N != y));
    function ae(y) {
      var N;
      document.activeElement === y.target && ((N = p.value) == null || N.focus());
    }
    const F = I();
    function T() {
      d.value = !0, F.value = !0;
    }
    function A() {
      T();
    }
    function ue() {
      U(Q()), F.value = !1, setTimeout(() => {
        F.value || (d.value = !1);
      }, 200);
    }
    function V(y) {
      const N = s.string ? y.join(",") : y;
      n("update:modelValue", N);
    }
    function z(y) {
      if (y.key == "Backspace" && $.value.length == 0 && i.value.length > 0 && H(i.value[i.value.length - 1]), !(!s.allowableValues || s.allowableValues.length == 0))
        if (y.code == "Escape" || y.code == "Tab")
          d.value = !1;
        else if (y.code == "Home")
          u.value = c.value[0], Z();
        else if (y.code == "End")
          u.value = c.value[c.value.length - 1], Z();
        else if (y.code == "ArrowDown") {
          if (d.value = !0, !u.value)
            u.value = c.value[0];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N + 1 < c.value.length ? c.value[N + 1] : c.value[0];
          }
          J();
        } else if (y.code == "ArrowUp") {
          if (!u.value)
            u.value = c.value[c.value.length - 1];
          else {
            const N = c.value.indexOf(u.value);
            u.value = N - 1 >= 0 ? c.value[N - 1] : c.value[c.value.length - 1];
          }
          J();
        } else
          y.code == "Enter" ? u.value && d.value ? (U(u.value), y.preventDefault()) : d.value = !1 : d.value = c.value.length > 0;
    }
    function Q() {
      if ($.value.length == 0)
        return "";
      let y = So($.value.trim(), ",");
      return y[0] == "," && (y = y.substring(1)), y = y.trim(), y.length == 0 && d.value && c.value.length > 0 ? u.value : y;
    }
    function ne(y) {
      const N = Q();
      if (N.length > 0) {
        const E = s.delimiters.some((C) => C == y.key);
        if (E && y.preventDefault(), y.key == "Enter" || y.key == "NumpadEnter" || y.key.length == 1 && E) {
          U(N);
          return;
        }
      }
    }
    const R = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Z() {
      setTimeout(() => {
        let y = ws(`#${s.id}-tag li.active`);
        y && y.scrollIntoView(R);
      }, 0);
    }
    function J() {
      setTimeout(() => {
        let y = ws(`#${s.id}-tag li.active`);
        y && ("scrollIntoViewIfNeeded" in y ? y.scrollIntoViewIfNeeded(R) : y.scrollIntoView(R));
      }, 0);
    }
    function U(y) {
      if (y.length === 0)
        return;
      const N = Array.from(i.value);
      N.indexOf(y) == -1 && N.push(y), V(N), $.value = "", d.value = !1;
    }
    function M(y) {
      var E;
      const N = (E = y.clipboardData) == null ? void 0 : E.getData("Text");
      Y(N);
    }
    function Y(y) {
      if (!y)
        return;
      const N = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), E = Array.from(i.value);
      y.split(N).map((C) => C.trim()).forEach((C) => {
        E.indexOf(C) == -1 && E.push(C);
      }), V(E), $.value = "";
    }
    return (y, N) => (o(), r("div", {
      class: b([y.$attrs.class]),
      id: `${y.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      k.value ? (o(), r("label", {
        key: 0,
        for: y.id,
        class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${y.labelClass ?? ""}`)
      }, j(k.value), 11, lc)) : x("", !0),
      l("div", nc, [
        l("input", {
          type: "hidden",
          id: y.id,
          name: y.id,
          value: i.value.join(",")
        }, null, 8, oc),
        l("button", {
          class: b(O.value),
          onClick: qe(ae, ["prevent"]),
          onFocus: N[2] || (N[2] = (E) => d.value = !0),
          tabindex: "-1"
        }, [
          l("div", ac, [
            (o(!0), r(Fe, null, De(i.value, (E) => (o(), r("div", rc, [
              l("span", ic, [
                _e(j(E) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (h) => H(E),
                  class: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                }, cc, 8, uc)
              ])
            ]))), 256)),
            l("div", fc, [
              Ct(l("input", Me({
                ref_key: "txtInput",
                ref: p,
                type: m.value,
                role: "combobox",
                "aria-controls": "options",
                "aria-expanded": "false",
                autocomplete: "off",
                spellcheck: "false",
                name: `${y.id}-txt`,
                id: `${y.id}-txt`,
                class: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
                style: `box-shadow:none !important;width:${$.value.length + 1}ch`,
                "onUpdate:modelValue": N[0] || (N[0] = (E) => $.value = E),
                "aria-invalid": w.value != null,
                "aria-describedby": `${y.id}-error`,
                onKeydown: z,
                onKeypress: ne,
                onPaste: qe(M, ["prevent", "stop"]),
                onFocus: A,
                onBlur: ue,
                onClick: N[1] || (N[1] = (E) => d.value = !0)
              }, ee(ft)(y.$attrs, ["class", "required"])), null, 16, vc), [
                [fo, $.value]
              ])
            ])
          ])
        ], 34),
        d.value && c.value.length ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: z,
          id: `${y.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Fe, null, De(c.value.slice(0, y.maxVisibleItems), (E) => (o(), r("li", {
            class: b([E === u.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (h) => f(E),
            onClick: (h) => U(E),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", hc, j(E), 1)
          ], 42, mc))), 256))
        ], 40, pc)) : x("", !0),
        w.value ? (o(), r("div", gc, bc)) : x("", !0)
      ]),
      w.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${y.id}-error`
      }, j(w.value), 9, wc)) : y.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${y.id}-description`
      }, j(y.help), 9, kc)) : x("", !0)
    ], 10, sc));
  }
}), Cc = { class: "relative flex-grow mr-2 sm:mr-4" }, xc = ["for"], Lc = { class: "block mt-2" }, Vc = { class: "sr-only" }, Sc = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Mc = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Ac = /* @__PURE__ */ l("svg", {
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
  Ac
], Fc = ["id"], Ic = ["id"], Dc = { key: 0 }, jc = ["title"], Oc = ["alt", "src"], Pc = {
  key: 1,
  class: "mt-3"
}, Bc = { class: "w-full" }, Rc = { class: "pr-6 align-bottom pb-2" }, Ec = ["title"], Hc = ["src", "onError"], zc = ["href"], Nc = {
  key: 1,
  class: "overflow-hidden"
}, Uc = { class: "align-top pb-2 whitespace-nowrap" }, qc = {
  key: 0,
  class: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black"
}, Qc = /* @__PURE__ */ ce({
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
    var T;
    const t = e, s = I(null), { assetsPathResolver: n, fallbackPathResolver: a } = At(), i = {}, u = I(), d = I(((T = t.files) == null ? void 0 : T.map(c)) || []);
    function c(A) {
      return A.filePath = n(A.filePath), A;
    }
    t.values && t.values.length > 0 && (d.value = t.values.map((A) => {
      let ue = A.replace(/\\/g, "/");
      return { fileName: Mo(xt(ue, "/"), "."), filePath: ue, contentType: Ws(ue) };
    }).map(c));
    const f = v(() => t.label ?? ze(ot(t.id))), p = v(() => t.placeholder ?? f.value);
    let $ = Ue("ApiState", void 0);
    const m = v(() => mt.call({ responseStatus: t.status ?? ($ == null ? void 0 : $.error.value) }, t.id)), k = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      m.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), g = (A) => {
      let ue = A.target;
      u.value = "", d.value = Array.from(ue.files || []).map((V) => ({
        fileName: V.name,
        filePath: cl(V),
        contentLength: V.size,
        contentType: V.type || Ws(V.name)
      }));
    }, w = () => {
      var A;
      return (A = s.value) == null ? void 0 : A.click();
    }, O = (A) => A == null ? !1 : A.startsWith("data:") || A.startsWith("blob:"), H = v(() => {
      if (d.value.length > 0)
        return d.value[0].filePath;
      let A = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return A && wt(n(A)) || null;
    }), ae = (A) => !A || A.startsWith("data:") || A.endsWith(".svg") ? "" : "rounded-full object-cover";
    function F(A) {
      u.value = a(H.value);
    }
    return Ht(yn), (A, ue) => (o(), r("div", {
      class: b(["flex", A.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", Cc, [
        f.value ? (o(), r("label", {
          key: 0,
          for: A.id,
          class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${A.labelClass ?? ""}`)
        }, j(f.value), 11, xc)) : x("", !0),
        l("div", Lc, [
          l("span", Vc, j(A.help ?? f.value), 1),
          l("input", Me({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: A.multiple,
            name: A.id,
            id: A.id,
            class: k.value,
            placeholder: p.value,
            "aria-invalid": m.value != null,
            "aria-describedby": `${A.id}-error`
          }, A.$attrs, { onChange: g }), null, 16, Sc),
          m.value ? (o(), r("div", Mc, Tc)) : x("", !0)
        ]),
        m.value ? (o(), r("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${A.id}-error`
        }, j(m.value), 9, Fc)) : A.help ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${A.id}-description`
        }, j(A.help), 9, Ic)) : x("", !0)
      ]),
      A.multiple ? (o(), r("div", Pc, [
        l("table", Bc, [
          (o(!0), r(Fe, null, De(d.value, (V) => (o(), r("tr", null, [
            l("td", Rc, [
              l("div", {
                class: "flex w-full",
                title: O(V.filePath) ? "" : V.filePath
              }, [
                l("img", {
                  src: i[ee(wt)(V.filePath)] || ee(n)(ee(wt)(V.filePath)),
                  class: b(["mr-2 h-8 w-8", ae(V.filePath)]),
                  onError: (z) => i[ee(wt)(V.filePath)] = ee(a)(ee(wt)(V.filePath))
                }, null, 42, Hc),
                O(V.filePath) ? (o(), r("span", Nc, j(V.fileName), 1)) : (o(), r("a", {
                  key: 0,
                  href: ee(n)(V.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, j(V.fileName), 9, zc))
              ], 8, Ec)
            ]),
            l("td", Uc, [
              V.contentLength && V.contentLength > 0 ? (o(), r("span", qc, j(ee(vl)(V.contentLength)), 1)) : x("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), r("div", Dc, [
        H.value ? (o(), r("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: O(H.value) ? "" : H.value
        }, [
          l("img", {
            onClick: w,
            class: b(["h-16 w-16", ae(H.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: u.value || ee(n)(H.value),
            onError: F
          }, null, 42, Oc)
        ], 8, jc)) : x("", !0)
      ]))
    ], 2));
  }
}), Kc = ["id"], Zc = ["for"], Gc = { class: "relative mt-1" }, Wc = ["id", "placeholder"], Jc = /* @__PURE__ */ l("svg", {
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
], -1), Xc = [
  Jc
], Yc = ["id"], e0 = ["onMouseover", "onClick"], t0 = /* @__PURE__ */ l("svg", {
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
], -1), s0 = [
  t0
], l0 = {
  key: 2,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  tabindex: "-1"
}, n0 = /* @__PURE__ */ l("svg", {
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
], -1), o0 = [
  n0
], a0 = ["id"], r0 = ["id"], i0 = /* @__PURE__ */ ce({
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
    const n = I(!1), a = e, i = s;
    t({ toggle: R });
    function u(M) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(M) >= 0;
    }
    const d = v(() => a.label ?? ze(ot(a.id)));
    let c = Ue("ApiState", void 0);
    const f = v(() => mt.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), p = v(() => [nt.base, f.value ? nt.invalid : nt.valid]), $ = I(null), m = I(""), k = I(null), g = I(a.viewCount), w = I([]), O = v(() => m.value ? a.options.filter((Y) => a.match(Y, m.value)).slice(0, g.value) : a.options), H = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function ae(M) {
      k.value = M, w.value.indexOf(M) > Math.floor(g.value * 0.9) && (g.value += a.viewCount, U());
    }
    const F = [",", `
`, "	"];
    function T(M) {
      var y;
      const Y = (y = M.clipboardData) == null ? void 0 : y.getData("Text");
      A(Y);
    }
    function A(M) {
      if (!M)
        return;
      const Y = F.some((y) => M.includes(y));
      if (!a.multiple || !Y) {
        const y = a.options.filter((N) => a.match(N, M));
        y.length == 1 && (J(y[0]), n.value = !1, ps());
      } else if (Y) {
        const y = new RegExp("\\r|\\n|\\t|,"), E = M.split(y).filter((h) => h.trim()).map((h) => a.options.find((C) => a.match(C, h))).filter((h) => !!h);
        if (E.length > 0) {
          m.value = "", n.value = !1, k.value = null;
          let h = Array.from(a.modelValue || []);
          E.forEach((C) => {
            u(C) ? h = h.filter((G) => G != C) : h.push(C);
          }), i("update:modelValue", h), ps();
        }
      }
    }
    function ue(M) {
      H.indexOf(M.code) || Z();
    }
    function V(M) {
      if (!(M.shiftKey || M.ctrlKey || M.altKey)) {
        if (!n.value) {
          M.code == "ArrowDown" && (n.value = !0, k.value = w.value[0]);
          return;
        }
        if (M.code == "Escape")
          n.value && (M.stopPropagation(), n.value = !1);
        else if (M.code == "Tab")
          n.value = !1;
        else if (M.code == "Home")
          k.value = w.value[0], Q();
        else if (M.code == "End")
          k.value = w.value[w.value.length - 1], Q();
        else if (M.code == "ArrowDown") {
          if (!k.value)
            k.value = w.value[0];
          else {
            const Y = w.value.indexOf(k.value);
            k.value = Y + 1 < w.value.length ? w.value[Y + 1] : w.value[0];
          }
          ne();
        } else if (M.code == "ArrowUp") {
          if (!k.value)
            k.value = w.value[w.value.length - 1];
          else {
            const Y = w.value.indexOf(k.value);
            k.value = Y - 1 >= 0 ? w.value[Y - 1] : w.value[w.value.length - 1];
          }
          ne();
        } else
          M.code == "Enter" && (k.value ? (J(k.value), a.multiple || (M.preventDefault(), ps())) : n.value = !1);
      }
    }
    const z = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function Q() {
      setTimeout(() => {
        let M = ws(`#${a.id}-autocomplete li.active`);
        M && M.scrollIntoView(z);
      }, 0);
    }
    function ne() {
      setTimeout(() => {
        let M = ws(`#${a.id}-autocomplete li.active`);
        M && ("scrollIntoViewIfNeeded" in M ? M.scrollIntoViewIfNeeded(z) : M.scrollIntoView(z));
      }, 0);
    }
    function R(M) {
      var Y;
      n.value = M, M && (Z(), (Y = $.value) == null || Y.focus());
    }
    function Z() {
      n.value = !0, U();
    }
    function J(M) {
      if (m.value = "", n.value = !1, a.multiple) {
        let Y = Array.from(a.modelValue || []);
        u(M) ? Y = Y.filter((y) => y != M) : Y.push(M), k.value = null, i("update:modelValue", Y);
      } else {
        let Y = M;
        a.modelValue == M && (Y = null), i("update:modelValue", Y);
      }
    }
    function U() {
      w.value = O.value;
    }
    return St(m, U), (M, Y) => (o(), r("div", {
      id: `${M.id}-autocomplete`
    }, [
      d.value ? (o(), r("label", {
        key: 0,
        for: `${M.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, j(d.value), 9, Zc)) : x("", !0),
      l("div", Gc, [
        Ct(l("input", Me({
          ref_key: "txtInput",
          ref: $,
          id: `${M.id}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autocomplete: "off",
          spellcheck: "false",
          "onUpdate:modelValue": Y[0] || (Y[0] = (y) => m.value = y),
          class: p.value,
          placeholder: M.multiple || !M.modelValue ? M.placeholder : "",
          onFocus: Z,
          onKeydown: V,
          onKeyup: ue,
          onClick: Z,
          onPaste: T,
          required: !1
        }, M.$attrs), null, 16, Wc), [
          [vo, m.value]
        ]),
        l("button", {
          type: "button",
          onClick: Y[1] || (Y[1] = (y) => R(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, Xc),
        n.value ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
          onKeydown: V,
          id: `${M.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Fe, null, De(w.value, (y) => (o(), r("li", {
            class: b([y === k.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (N) => ae(y),
            onClick: (N) => J(y),
            role: "option",
            tabindex: "-1"
          }, [
            K(M.$slots, "item", Pt(bs(y))),
            u(y) ? (o(), r("span", {
              key: 0,
              class: b(["absolute inset-y-0 right-0 flex items-center pr-4", y === k.value ? "text-white" : "text-indigo-600"])
            }, s0, 2)) : x("", !0)
          ], 42, e0))), 256))
        ], 40, Yc)) : !M.multiple && M.modelValue ? (o(), r("div", {
          key: 1,
          onKeydown: V,
          onClick: Y[2] || (Y[2] = (y) => R(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          K(M.$slots, "item", Pt(bs(M.modelValue)))
        ], 32)) : x("", !0),
        f.value ? (o(), r("div", l0, o0)) : x("", !0)
      ]),
      f.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${M.id}-error`
      }, j(f.value), 9, a0)) : M.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${M.id}-description`
      }, j(M.help), 9, r0)) : x("", !0)
    ], 8, Kc));
  }
}), u0 = ["id", "name", "value"], d0 = { class: "block truncate" }, c0 = /* @__PURE__ */ ce({
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
      toggle(k) {
        var g;
        (g = d.value) == null || g.toggle(k);
      }
    });
    const a = s;
    function i(k) {
      a("update:modelValue", k);
    }
    const u = v(() => n.multiple != null ? n.multiple : Array.isArray(n.modelValue)), d = I();
    function c(k, g) {
      return !g || k.value.toLowerCase().includes(g.toLowerCase());
    }
    const f = v(() => n.entries || (n.values ? n.values.map((k) => ({ key: k, value: k })) : n.options ? Object.keys(n.options).map((k) => ({ key: k, value: n.options[k] })) : [])), p = I(u.value ? [] : null);
    function $() {
      let k = n.modelValue && typeof n.modelValue == "object" ? n.modelValue.key : n.modelValue;
      k == null || k === "" ? p.value = u.value ? [] : null : typeof k == "string" ? p.value = f.value.find((g) => g.key === k) || null : Array.isArray(k) && (p.value = f.value.filter((g) => k.includes(g.key)));
    }
    st($);
    const m = v(() => p.value == null ? "" : Array.isArray(p.value) ? p.value.map((k) => encodeURIComponent(k.key)).join(",") : p.value.key);
    return (k, g) => {
      const w = W("Autocomplete");
      return o(), r(Fe, null, [
        l("input", {
          type: "hidden",
          id: k.id,
          name: k.id,
          value: m.value
        }, null, 8, u0),
        xe(w, Me({
          ref_key: "input",
          ref: d,
          id: k.id,
          options: f.value,
          match: c,
          multiple: u.value
        }, k.$attrs, {
          modelValue: p.value,
          "onUpdate:modelValue": [
            g[0] || (g[0] = (O) => p.value = O),
            i
          ]
        }), {
          item: Ce(({ key: O, value: H }) => [
            l("span", d0, j(H), 1)
          ]),
          _: 1
        }, 16, ["id", "options", "multiple", "modelValue"])
      ], 64);
    };
  }
}), f0 = /* @__PURE__ */ ce({
  __name: "DynamicInput",
  props: {
    input: {},
    modelValue: {},
    api: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.input.type || "text"), i = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), u = v(() => ft(s.input, i)), d = I(Qe(
      s.modelValue[s.input.id],
      (f) => s.input.type === "file" ? null : s.input.type === "date" && f instanceof Date ? Ls(f) : s.input.type === "time" ? rn(f) : f
    ));
    St(d, () => {
      s.modelValue[s.input.id] = d.value, n("update:modelValue", s.modelValue);
    });
    const c = v(() => {
      const f = s.modelValue[s.input.id];
      if (s.input.type !== "file" || !f)
        return [];
      if (typeof f == "string")
        return [{ filePath: f, fileName: xt(f, "/") }];
      if (!Array.isArray(f) && typeof f == "object")
        return f;
      if (Array.isArray(f)) {
        const p = [];
        return f.forEach(($) => {
          typeof $ == "string" ? p.push({ filePath: $, fileName: xt($, "/") }) : typeof $ == "object" && p.push($);
        }), p;
      }
    });
    return (f, p) => {
      var F, T, A, ue, V, z, Q, ne, R, Z, J, U, M, Y, y, N, E, h, C, G, X, te, D, L, fe, pe, ie, me;
      const $ = W("SelectInput"), m = W("CheckboxInput"), k = W("TagInput"), g = W("Combobox"), w = W("FileInput"), O = W("TextareaInput"), H = W("MarkdownInput"), ae = W("TextInput");
      return ee(le).component(a.value) ? (o(), oe(sn(ee(le).component(a.value)), Me({
        key: 0,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[0] || (p[0] = (S) => d.value = S),
        status: (F = f.api) == null ? void 0 : F.error,
        "input-class": (T = f.input.css) == null ? void 0 : T.input,
        "label-class": (A = f.input.css) == null ? void 0 : A.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), oe($, Me({
        key: 1,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[1] || (p[1] = (S) => d.value = S),
        status: (ue = f.api) == null ? void 0 : ue.error,
        "input-class": (V = f.input.css) == null ? void 0 : V.input,
        "label-class": (z = f.input.css) == null ? void 0 : z.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), oe(m, Me({
        key: 2,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[2] || (p[2] = (S) => d.value = S),
        status: (Q = f.api) == null ? void 0 : Q.error,
        "input-class": (ne = f.input.css) == null ? void 0 : ne.input,
        "label-class": (R = f.input.css) == null ? void 0 : R.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), oe(k, Me({
        key: 3,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[3] || (p[3] = (S) => d.value = S),
        status: (Z = f.api) == null ? void 0 : Z.error,
        "input-class": (J = f.input.css) == null ? void 0 : J.input,
        "label-class": (U = f.input.css) == null ? void 0 : U.label,
        allowableValues: f.input.allowableValues,
        string: ((M = f.input.prop) == null ? void 0 : M.type) == "String"
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "allowableValues", "string"])) : a.value == "combobox" ? (o(), oe(g, Me({
        key: 4,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[4] || (p[4] = (S) => d.value = S),
        status: (Y = f.api) == null ? void 0 : Y.error,
        "input-class": (y = f.input.css) == null ? void 0 : y.input,
        "label-class": (N = f.input.css) == null ? void 0 : N.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "file" ? (o(), oe(w, Me({
        key: 5,
        id: f.input.id,
        status: (E = f.api) == null ? void 0 : E.error,
        modelValue: d.value,
        "onUpdate:modelValue": p[5] || (p[5] = (S) => d.value = S),
        "input-class": (h = f.input.css) == null ? void 0 : h.input,
        "label-class": (C = f.input.css) == null ? void 0 : C.label,
        files: c.value
      }, u.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), oe(O, Me({
        key: 6,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[6] || (p[6] = (S) => d.value = S),
        status: (G = f.api) == null ? void 0 : G.error,
        "input-class": (X = f.input.css) == null ? void 0 : X.input,
        "label-class": (te = f.input.css) == null ? void 0 : te.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), oe(H, Me({
        key: 7,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[7] || (p[7] = (S) => d.value = S),
        status: (D = f.api) == null ? void 0 : D.error,
        "input-class": (L = f.input.css) == null ? void 0 : L.input,
        "label-class": (fe = f.input.css) == null ? void 0 : fe.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), oe(ae, Me({
        key: 8,
        type: a.value,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": p[8] || (p[8] = (S) => d.value = S),
        status: (pe = f.api) == null ? void 0 : pe.error,
        "input-class": (ie = f.input.css) == null ? void 0 : ie.input,
        "label-class": (me = f.input.css) == null ? void 0 : me.label
      }, u.value), null, 16, ["type", "id", "modelValue", "status", "input-class", "label-class"]));
    };
  }
}), v0 = { class: "lookup-field" }, p0 = ["name", "value"], m0 = {
  key: 0,
  class: "flex justify-between"
}, h0 = ["for"], g0 = {
  key: 0,
  class: "flex items-center"
}, y0 = { class: "text-sm text-gray-500 dark:text-gray-400 pr-1" }, b0 = /* @__PURE__ */ l("span", { class: "sr-only" }, "Clear", -1), w0 = /* @__PURE__ */ l("svg", {
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
], -1), k0 = [
  b0,
  w0
], _0 = {
  key: 1,
  class: "mt-1 relative"
}, $0 = { class: "w-full inline-flex truncate" }, C0 = { class: "text-blue-700 dark:text-blue-300 flex cursor-pointer" }, x0 = /* @__PURE__ */ l("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
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
], -1), L0 = ["id"], V0 = ["id"], S0 = /* @__PURE__ */ ce({
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
    const { config: s } = At(), { metadataApi: n } = rt(), a = e, i = t, u = v(() => a.id || a.input.id), d = v(() => a.label ?? ze(ot(u.value)));
    let c = Ue("ApiState", void 0);
    const f = Ue("client"), p = v(() => mt.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, u.value)), $ = I(""), m = I(""), k = v(() => we(a.modelValue, u.value)), g = v(() => tt(a.metadataType).find((F) => F.name.toLowerCase() == u.value.toLowerCase())), w = v(() => {
      var F, T, A;
      return ((A = at((T = (F = g.value) == null ? void 0 : F.ref) == null ? void 0 : T.model)) == null ? void 0 : A.icon) || s.value.tableIcon;
    });
    let O;
    function H(F) {
      if (F) {
        if (O == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        O.openModal({ name: "ModalLookup", ref: F }, (T) => {
          if (console.debug("openModal", $.value, " -> ", T, Dt.setRefValue(F, T), F), T) {
            const A = we(T, F.refId);
            $.value = Dt.setRefValue(F, T) || A;
            const ue = ee(a.modelValue);
            ue[u.value] = A, i("update:modelValue", ue);
          }
        });
      }
    }
    function ae() {
      a.modelValue[u.value] = null, $.value = "";
    }
    return st(async () => {
      var Q, ne;
      O = Ue("ModalProvider", void 0);
      const F = a.modelValue;
      a.modelValue[u.value] || (a.modelValue[u.value] = null);
      const T = g.value, A = T == null ? void 0 : T.ref;
      if (!A) {
        console.warn(`No RefInfo for property '${u.value}'`);
        return;
      }
      $.value = "";
      let ue = A.selfId == null ? we(F, T.name) : we(F, A.selfId);
      if (Wt(ue) && (ue = we(F, A.refId)), ue == null)
        return;
      if (((Q = n.value) == null ? void 0 : Q.operations.find((R) => {
        var Z;
        return ((Z = R.dataModel) == null ? void 0 : Z.name) == A.model;
      })) != null) {
        const R = we(F, T.name);
        if (Wt(R))
          return;
        if ($.value = `${R}`, m.value = T.name, A.refLabel != null) {
          const Z = tt(a.metadataType).find((U) => U.type == A.model);
          Z == null && console.warn(`Could not find ${A.model} Property on ${a.metadataType.name}`);
          const J = Z != null ? we(F, Z.name) : null;
          if (J != null) {
            let U = we(J, A.refLabel);
            U && ($.value = `${U}`, Dt.setValue(A.model, ue, A.refLabel, U));
          } else {
            const U = ((ne = T.attributes) == null ? void 0 : ne.some((Y) => Y.name == "Computed")) == !0;
            let M = await Dt.getOrFetchValue(f, n.value, A.model, A.refId, A.refLabel, U, ue);
            $.value = M || `${A.model}: ${$.value}`;
          }
        }
      }
    }), (F, T) => {
      var ue;
      const A = W("Icon");
      return o(), r("div", v0, [
        l("input", {
          type: "hidden",
          name: u.value,
          value: k.value
        }, null, 8, p0),
        d.value ? (o(), r("div", m0, [
          l("label", {
            for: u.value,
            class: b(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${F.labelClass ?? ""}`)
          }, j(d.value), 11, h0),
          k.value ? (o(), r("div", g0, [
            l("span", y0, j(k.value), 1),
            l("button", {
              onClick: ae,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, k0)
          ])) : x("", !0)
        ])) : x("", !0),
        (ue = g.value) != null && ue.ref ? (o(), r("div", _0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: T[0] || (T[0] = (V) => H(g.value.ref)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", $0, [
              l("span", C0, [
                xe(A, {
                  class: "mr-1 w-5 h-5",
                  image: w.value
                }, null, 8, ["image"]),
                l("span", null, j($.value), 1)
              ])
            ]),
            x0
          ])
        ])) : x("", !0),
        p.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${u.value}-error`
        }, j(p.value), 9, L0)) : F.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${u.value}-description`
        }, j(F.help), 9, V0)) : x("", !0)
      ]);
    };
  }
}), M0 = /* @__PURE__ */ ce({
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
      var T;
      const F = Be();
      (T = F == null ? void 0 : F.proxy) == null || T.$forceUpdate();
    }
    function u(F, T) {
      d(F.id, we(T, F.id));
    }
    function d(F, T) {
      n.modelValue[F] = T, a("update:modelValue", n.modelValue), i();
    }
    const { metadataApi: c, apiOf: f, typeOf: p, typeOfRef: $, createFormLayout: m, Crud: k } = rt(), g = v(() => n.type || zt(n.modelValue)), w = v(() => n.metaType ?? p(g.value)), O = v(() => {
      var F, T;
      return $((T = (F = c.value) == null ? void 0 : F.operations.find((A) => A.request.name == g.value)) == null ? void 0 : T.dataModel) || w.value;
    }), H = v(() => {
      const F = w.value;
      if (!F) {
        if (n.formLayout) {
          const Q = n.formLayout.map((ne) => {
            const R = { name: ne.id, type: Ca(ne.type) }, Z = Object.assign({ prop: R }, ne);
            return n.configureField && n.configureField(Z), Z;
          });
          return n.configureFormLayout && n.configureFormLayout(Q), Q;
        }
        throw new Error(`MetadataType for ${g.value} not found`);
      }
      const T = tt(F), A = O.value, ue = n.formLayout ? n.formLayout : m(F), V = [], z = f(F.name);
      return ue.forEach((Q) => {
        var J;
        const ne = T.find((U) => U.name == Q.name);
        if (Q.ignore)
          return;
        const R = ((J = A == null ? void 0 : A.properties) == null ? void 0 : J.find((U) => {
          var M;
          return U.name.toLowerCase() == ((M = Q.name) == null ? void 0 : M.toLowerCase());
        })) ?? ne, Z = Object.assign({ prop: R, op: z }, Q);
        n.configureField && n.configureField(Z), V.push(Z);
      }), n.configureFormLayout && n.configureFormLayout(V), V;
    }), ae = v(() => H.value.filter((F) => F.type != "hidden").map((F) => F.id));
    return (F, T) => {
      var z;
      const A = W("ErrorSummary"), ue = W("LookupInput"), V = W("DynamicInput");
      return o(), r(Fe, null, [
        F.hideSummary ? x("", !0) : (o(), oe(A, {
          key: 0,
          status: (z = F.api) == null ? void 0 : z.error,
          except: ae.value
        }, null, 8, ["status", "except"])),
        l("div", {
          class: b(F.flexClass)
        }, [
          l("div", {
            class: b(F.divideClass)
          }, [
            l("div", {
              class: b(F.spaceClass)
            }, [
              l("fieldset", {
                class: b(F.fieldsetClass)
              }, [
                (o(!0), r(Fe, null, De(H.value, (Q) => {
                  var ne, R, Z;
                  return o(), r("div", {
                    key: Q.id,
                    class: b([
                      "w-full",
                      ((ne = Q.css) == null ? void 0 : ne.field) ?? (Q.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (Q.type == "checkbox" ? " flex items-center" : "")),
                      Q.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    ((R = Q.prop) == null ? void 0 : R.ref) != null && Q.type != "file" && !Q.prop.isPrimaryKey ? (o(), oe(ue, {
                      key: 0,
                      metadataType: O.value,
                      input: Q,
                      modelValue: F.modelValue,
                      "onUpdate:modelValue": (J) => u(Q, J),
                      status: (Z = F.api) == null ? void 0 : Z.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), oe(V, {
                      key: 1,
                      input: Q,
                      modelValue: F.modelValue,
                      "onUpdate:modelValue": T[0] || (T[0] = (J) => F.$emit("update:modelValue", J)),
                      api: F.api
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
function Ds(e) {
  const t = I(!1), s = I(), n = I(), a = e ?? Ue("client");
  function i({ message: g, errorCode: w, fieldName: O, errors: H }) {
    return w || (w = "Exception"), H || (H = []), s.value = O ? new Hs({
      errorCode: w,
      message: g,
      errors: [new Ql({ fieldName: O, errorCode: w, message: g })]
    }) : new Hs({ errorCode: w, message: g, errors: H });
  }
  function u({ fieldName: g, message: w, errorCode: O }) {
    if (O || (O = "Exception"), !s.value)
      i({ fieldName: g, message: w, errorCode: O });
    else {
      let H = new Hs(s.value);
      H.errors = [
        ...(H.errors || []).filter((ae) => {
          var F;
          return ((F = ae.fieldName) == null ? void 0 : F.toLowerCase()) !== (g == null ? void 0 : g.toLowerCase());
        }),
        new Ql({ fieldName: g, message: w, errorCode: O })
      ], s.value = H;
    }
  }
  async function d(g, w, O) {
    t.value = !0;
    let H = await a.api(It(g), w, O);
    return t.value = !1, n.value = H.response, s.value = H.error, H;
  }
  async function c(g, w, O) {
    t.value = !0;
    let H = await a.apiVoid(It(g), w, O);
    return t.value = !1, n.value = H.response, s.value = H.error, H;
  }
  async function f(g, w, O, H) {
    t.value = !0;
    let ae = await a.apiForm(It(g), w, O, H);
    return t.value = !1, n.value = ae.response, s.value = ae.error, ae;
  }
  async function p(g, w, O, H) {
    t.value = !0;
    let ae = await a.apiFormVoid(It(g), w, O, H);
    return t.value = !1, n.value = ae.response, s.value = ae.error, ae;
  }
  async function $(g, w, O, H) {
    return cn(a, g, w, O, H);
  }
  function m(g, w) {
    const O = I(new Xe()), H = fn(async (ae) => {
      O.value = await a.api(ae);
    }, w == null ? void 0 : w.delayMs);
    return ys(async () => {
      const ae = g(), F = il(Ss(ae));
      F && (O.value = new Xe({ response: F })), (w == null ? void 0 : w.delayMs) === 0 ? O.value = await a.api(ae) : H(ae);
    }), (async () => O.value = await a.api(g(), w == null ? void 0 : w.args, w == null ? void 0 : w.method))(), O;
  }
  let k = { setError: i, addFieldError: u, loading: t, error: s, api: d, apiVoid: c, apiForm: f, apiFormVoid: p, swr: $, swrEffect: m, unRefs: It, setRef: un };
  return es("ApiState", k), k;
}
const A0 = { key: 0 }, T0 = { class: "text-red-700" }, F0 = /* @__PURE__ */ l("b", null, "type", -1), I0 = { key: 0 }, D0 = { key: 2 }, j0 = ["innerHTML"], O0 = /* @__PURE__ */ l("input", {
  type: "submit",
  class: "hidden"
}, null, -1), P0 = { class: "flex justify-end" }, B0 = /* @__PURE__ */ l("div", null, null, -1), R0 = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, E0 = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), H0 = { class: "fixed inset-0 overflow-hidden" }, z0 = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, N0 = { class: "flex-1" }, U0 = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, q0 = { class: "flex items-start justify-between space-x-3" }, Q0 = { class: "space-y-1" }, K0 = { key: 0 }, Z0 = { key: 2 }, G0 = ["innerHTML"], W0 = { class: "flex h-7 items-center" }, J0 = { class: "flex justify-end" }, X0 = /* @__PURE__ */ ce({
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
    const n = e, a = s, i = I(), u = I(1), d = I();
    t({ forceUpdate: c, props: n, setModel: f, formFields: i, submit: N, close: te });
    function c() {
      var fe;
      u.value++, J.value = Z();
      const L = Be();
      (fe = L == null ? void 0 : L.proxy) == null || fe.$forceUpdate();
    }
    async function f(L) {
      Object.assign(J.value, L), c(), await $t(() => null);
    }
    es("ModalProvider", {
      openModal: k
    });
    const $ = I(), m = I();
    function k(L, fe) {
      $.value = L, m.value = fe;
    }
    async function g(L) {
      m.value && m.value(L), $.value = void 0, m.value = void 0;
    }
    const w = Ds(), { getTypeName: O } = vn(), { typeOf: H, Crud: ae, createDto: F } = rt(), T = I(new Xe()), A = v(() => n.panelClass || Ze.panelClass(n.formStyle)), ue = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : jt.formClass), V = v(() => n.headingClass || Ze.headingClass(n.formStyle)), z = v(() => n.subHeadingClass || Ze.subHeadingClass(n.formStyle)), Q = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : Ze.buttonsClass), ne = v(() => {
      var L;
      return n.type ? O(n.type) : (L = n.modelValue) != null && L.getTypeName ? n.modelValue.getTypeName() : null;
    }), R = v(() => n.metaType ?? H(ne.value)), Z = () => n.modelValue || Y(), J = I(Z()), U = v(() => w.loading.value), M = v(() => {
      var L;
      return n.heading != null ? n.heading : ((L = R.value) == null ? void 0 : L.description) || ze(ne.value);
    });
    function Y() {
      return typeof n.type == "string" ? F(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function y(L) {
      if (!L || L.tagName != "FORM") {
        console.error("Not a valid form", L);
        return;
      }
      const fe = Y();
      let pe = Qe(fe == null ? void 0 : fe.getMethod, (S) => typeof S == "function" ? S() : null) || "POST", ie = Qe(fe == null ? void 0 : fe.createResponse, (S) => typeof S == "function" ? S() : null) == null;
      const me = n.jsconfig;
      if (ol.hasRequestBody(pe)) {
        let S = new fe.constructor(), de = new FormData(L);
        ie ? T.value = await w.apiFormVoid(S, de, { jsconfig: me }) : T.value = await w.apiForm(S, de, { jsconfig: me });
      } else {
        let S = new fe.constructor(Ao(J.value));
        console.debug("AutoForm.submit", S), ie ? T.value = await w.apiVoid(S, { jsconfig: me }) : T.value = await w.api(S, { jsconfig: me });
      }
      T.value.succeeded ? (a("success", T.value.response), te()) : a("error", T.value.error);
    }
    async function N() {
      y(d.value);
    }
    function E(L) {
      a("update:modelValue", L);
    }
    function h() {
      a("done");
    }
    const C = I(!1), G = I(""), X = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    St(C, () => {
      Lt(X, G, C.value), C.value || setTimeout(h, 700);
    }), C.value = !0;
    function te() {
      n.formStyle == "slideOver" ? C.value = !1 : h();
    }
    const D = (L) => {
      L.key === "Escape" && te();
    };
    return st(() => window.addEventListener("keydown", D)), Ht(() => window.removeEventListener("keydown", D)), (L, fe) => {
      var Se, ge, B, q, se, ye, $e, Ie, Ee, Ae, Oe;
      const pe = W("AutoFormFields"), ie = W("FormLoading"), me = W("PrimaryButton"), S = W("CloseButton"), de = W("SecondaryButton"), Ve = W("ModalLookup");
      return o(), r("div", null, [
        R.value ? L.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: b(A.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: d,
            onSubmit: fe[0] || (fe[0] = qe((je) => y(je.target), ["prevent"])),
            autocomplete: "off",
            class: b(L.innerFormClass)
          }, [
            l("div", {
              class: b(L.bodyClass)
            }, [
              l("div", {
                class: b(L.headerClass)
              }, [
                L.$slots.heading ? (o(), r("div", I0, [
                  K(L.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: b(V.value)
                }, j(M.value), 3)),
                L.$slots.subheading ? (o(), r("div", D0, [
                  K(L.$slots, "subheading")
                ])) : L.subHeading ? (o(), r("p", {
                  key: 3,
                  class: b(z.value)
                }, j(L.subHeading), 3)) : (Se = R.value) != null && Se.notes ? (o(), r("p", {
                  key: 4,
                  class: b(["notes", z.value]),
                  innerHTML: (ge = R.value) == null ? void 0 : ge.notes
                }, null, 10, j0)) : x("", !0)
              ], 2),
              K(L.$slots, "header", {
                instance: (B = Be()) == null ? void 0 : B.exposed,
                model: J.value
              }),
              O0,
              (o(), oe(pe, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                type: L.type,
                modelValue: J.value,
                "onUpdate:modelValue": E,
                api: T.value,
                configureField: L.configureField,
                configureFormLayout: L.configureFormLayout
              }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
              K(L.$slots, "footer", {
                instance: (q = Be()) == null ? void 0 : q.exposed,
                model: J.value
              })
            ], 2),
            K(L.$slots, "buttons", {}, () => {
              var je, Ge;
              return [
                l("div", {
                  class: b(Q.value)
                }, [
                  l("div", null, [
                    K(L.$slots, "leftbuttons", {
                      instance: (je = Be()) == null ? void 0 : je.exposed,
                      model: J.value
                    })
                  ]),
                  l("div", null, [
                    L.showLoading && U.value ? (o(), oe(ie, { key: 0 })) : x("", !0)
                  ]),
                  l("div", P0, [
                    B0,
                    xe(me, {
                      disabled: L.allowSubmit ? !L.allowSubmit(J.value) : !1
                    }, {
                      default: Ce(() => [
                        _e(j(L.submitLabel), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    K(L.$slots, "rightbuttons", {
                      instance: (Ge = Be()) == null ? void 0 : Ge.exposed,
                      model: J.value
                    })
                  ])
                ], 2)
              ];
            })
          ], 34)
        ], 2)) : (o(), r("div", R0, [
          E0,
          l("div", H0, [
            l("div", {
              onMousedown: te,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: fe[2] || (fe[2] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", G.value])
                }, [
                  l("form", {
                    ref_key: "elForm",
                    ref: d,
                    class: b(ue.value),
                    onSubmit: fe[1] || (fe[1] = qe((je) => y(je.target), ["prevent"]))
                  }, [
                    l("div", z0, [
                      l("div", N0, [
                        l("div", U0, [
                          l("div", q0, [
                            l("div", Q0, [
                              L.$slots.heading ? (o(), r("div", K0, [
                                K(L.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: b(V.value)
                              }, j(M.value), 3)),
                              L.$slots.subheading ? (o(), r("div", Z0, [
                                K(L.$slots, "subheading")
                              ])) : L.subHeading ? (o(), r("p", {
                                key: 3,
                                class: b(z.value)
                              }, j(L.subHeading), 3)) : (se = R.value) != null && se.notes ? (o(), r("p", {
                                key: 4,
                                class: b(["notes", z.value]),
                                innerHTML: (ye = R.value) == null ? void 0 : ye.notes
                              }, null, 10, G0)) : x("", !0)
                            ]),
                            l("div", W0, [
                              xe(S, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: te
                              })
                            ])
                          ])
                        ]),
                        K(L.$slots, "header", {
                          instance: ($e = Be()) == null ? void 0 : $e.exposed,
                          model: J.value
                        }),
                        (o(), oe(pe, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          type: L.type,
                          modelValue: J.value,
                          "onUpdate:modelValue": E,
                          api: T.value,
                          configureField: L.configureField,
                          configureFormLayout: L.configureFormLayout
                        }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
                        K(L.$slots, "footer", {
                          instance: (Ie = Be()) == null ? void 0 : Ie.exposed,
                          model: J.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: b(Q.value)
                    }, [
                      l("div", null, [
                        K(L.$slots, "leftbuttons", {
                          instance: (Ee = Be()) == null ? void 0 : Ee.exposed,
                          model: J.value
                        })
                      ]),
                      l("div", null, [
                        L.showLoading && U.value ? (o(), oe(ie, { key: 0 })) : x("", !0)
                      ]),
                      l("div", J0, [
                        xe(de, {
                          onClick: te,
                          disabled: U.value
                        }, {
                          default: Ce(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        xe(me, {
                          class: "ml-4",
                          disabled: L.allowSubmit ? !L.allowSubmit(J.value) : !1
                        }, {
                          default: Ce(() => [
                            _e(j(L.submitLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        K(L.$slots, "rightbuttons", {
                          instance: (Ae = Be()) == null ? void 0 : Ae.exposed,
                          model: J.value
                        })
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", A0, [
          l("p", T0, [
            _e("Could not create form for unknown "),
            F0,
            _e(" " + j(ne.value), 1)
          ])
        ])),
        ((Oe = $.value) == null ? void 0 : Oe.name) == "ModalLookup" && $.value.ref ? (o(), oe(Ve, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: g
        }, null, 8, ["ref-info"])) : x("", !0)
      ]);
    };
  }
}), Y0 = { key: 0 }, ef = { class: "text-red-700" }, tf = /* @__PURE__ */ l("b", null, "type", -1), sf = { key: 0 }, lf = { key: 2 }, nf = ["innerHTML"], of = { class: "flex justify-end" }, af = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, rf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), uf = { class: "fixed inset-0 overflow-hidden" }, df = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, cf = { class: "flex-1" }, ff = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, vf = { class: "flex items-start justify-between space-x-3" }, pf = { class: "space-y-1" }, mf = { key: 0 }, hf = { key: 2 }, gf = ["innerHTML"], yf = { class: "flex h-7 items-center" }, bf = { class: "flex justify-end" }, wf = /* @__PURE__ */ ce({
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
    const n = e, a = s, i = I(), u = I(1);
    t({ forceUpdate: d, props: n, setModel: c, formFields: i });
    function d() {
      var L, fe;
      u.value++, (L = i.value) == null || L.forceUpdate();
      const D = Be();
      (fe = D == null ? void 0 : D.proxy) == null || fe.$forceUpdate();
    }
    function c(D) {
      Object.assign(V.value, D), d();
    }
    function f(D) {
    }
    es("ModalProvider", {
      openModal: k
    });
    const $ = I(), m = I();
    function k(D, L) {
      $.value = D, m.value = L;
    }
    async function g(D) {
      m.value && m.value(D), $.value = void 0, m.value = void 0;
    }
    const { typeOf: w, typeProperties: O, Crud: H, createDto: ae, formValues: F } = rt(), T = v(() => zt(n.type)), A = v(() => w(T.value)), V = I((() => typeof n.type == "string" ? ae(n.type) : n.type ? new n.type() : null)()), z = v(() => n.panelClass || Ze.panelClass(n.formStyle)), Q = v(() => n.formClass || Ze.formClass(n.formStyle)), ne = v(() => n.headingClass || Ze.headingClass(n.formStyle)), R = v(() => n.subHeadingClass || Ze.subHeadingClass(n.formStyle)), Z = v(() => n.buttonsClass || Ze.buttonsClass), J = v(() => H.model(A.value)), U = v(() => {
      var D;
      return n.heading || ((D = w(T.value)) == null ? void 0 : D.description) || (J.value ? `New ${ze(J.value)}` : ze(T.value));
    }), M = I(new Xe());
    let Y = Ds(), y = v(() => Y.loading.value);
    le.interceptors.has("AutoCreateForm.new") && le.interceptors.invoke("AutoCreateForm.new", { props: n, model: V });
    async function N(D) {
      var ie, me;
      let L = D.target;
      if (!n.autosave) {
        a("save", new V.value.constructor(F(L, O(A.value))));
        return;
      }
      let fe = Qe((ie = V.value) == null ? void 0 : ie.getMethod, (S) => typeof S == "function" ? S() : null) || "POST", pe = Qe((me = V.value) == null ? void 0 : me.createResponse, (S) => typeof S == "function" ? S() : null) == null;
      if (ol.hasRequestBody(fe)) {
        let S = new V.value.constructor(), de = new FormData(L);
        pe ? M.value = await Y.apiFormVoid(S, de, { jsconfig: "eccn" }) : M.value = await Y.apiForm(S, de, { jsconfig: "eccn" });
      } else {
        let S = F(L, O(A.value)), de = new V.value.constructor(S);
        pe ? M.value = await Y.apiVoid(de, { jsconfig: "eccn" }) : M.value = await Y.api(de, { jsconfig: "eccn" });
      }
      M.value.succeeded ? (L.reset(), a("save", M.value.response)) : a("error", M.value.error);
    }
    function E() {
      a("done");
    }
    const h = I(!1), C = I(""), G = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    St(h, () => {
      Lt(G, C, h.value), h.value || setTimeout(E, 700);
    }), h.value = !0;
    function X() {
      n.formStyle == "slideOver" ? h.value = !1 : E();
    }
    const te = (D) => {
      D.key === "Escape" && X();
    };
    return st(() => window.addEventListener("keydown", te)), Ht(() => window.removeEventListener("keydown", te)), (D, L) => {
      var Ve, Se, ge, B, q, se, ye, $e, Ie;
      const fe = W("AutoFormFields"), pe = W("FormLoading"), ie = W("SecondaryButton"), me = W("PrimaryButton"), S = W("CloseButton"), de = W("ModalLookup");
      return o(), r("div", null, [
        A.value ? D.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: b(z.value)
        }, [
          l("form", {
            onSubmit: qe(N, ["prevent"])
          }, [
            l("div", {
              class: b(Q.value)
            }, [
              l("div", null, [
                D.$slots.heading ? (o(), r("div", sf, [
                  K(D.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: b(ne.value)
                }, j(U.value), 3)),
                D.$slots.subheading ? (o(), r("div", lf, [
                  K(D.$slots, "subheading")
                ])) : D.subHeading ? (o(), r("p", {
                  key: 3,
                  class: b(R.value)
                }, j(D.subHeading), 3)) : (Ve = A.value) != null && Ve.notes ? (o(), r("p", {
                  key: 4,
                  class: b(["notes", R.value]),
                  innerHTML: (Se = A.value) == null ? void 0 : Se.notes
                }, null, 10, nf)) : x("", !0)
              ]),
              K(D.$slots, "header", {
                formInstance: (ge = Be()) == null ? void 0 : ge.exposed,
                model: V.value
              }),
              (o(), oe(fe, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: V.value,
                "onUpdate:modelValue": f,
                api: M.value,
                configureField: D.configureField,
                configureFormLayout: D.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              K(D.$slots, "footer", {
                formInstance: (B = Be()) == null ? void 0 : B.exposed,
                model: V.value
              })
            ], 2),
            l("div", {
              class: b(Z.value)
            }, [
              l("div", null, [
                D.showLoading && ee(y) ? (o(), oe(pe, { key: 0 })) : x("", !0)
              ]),
              l("div", of, [
                D.showCancel ? (o(), oe(ie, {
                  key: 0,
                  onClick: X,
                  disabled: ee(y)
                }, {
                  default: Ce(() => [
                    _e("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : x("", !0),
                xe(me, {
                  type: "submit",
                  class: "ml-4",
                  disabled: ee(y)
                }, {
                  default: Ce(() => [
                    _e("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", af, [
          rf,
          l("div", uf, [
            l("div", {
              onMousedown: X,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: L[0] || (L[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", C.value])
                }, [
                  l("form", {
                    class: b(Q.value),
                    onSubmit: qe(N, ["prevent"])
                  }, [
                    l("div", df, [
                      l("div", cf, [
                        l("div", ff, [
                          l("div", vf, [
                            l("div", pf, [
                              D.$slots.heading ? (o(), r("div", mf, [
                                K(D.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: b(ne.value)
                              }, j(U.value), 3)),
                              D.$slots.subheading ? (o(), r("div", hf, [
                                K(D.$slots, "subheading")
                              ])) : D.subHeading ? (o(), r("p", {
                                key: 3,
                                class: b(R.value)
                              }, j(D.subHeading), 3)) : (q = A.value) != null && q.notes ? (o(), r("p", {
                                key: 4,
                                class: b(["notes", R.value]),
                                innerHTML: (se = A.value) == null ? void 0 : se.notes
                              }, null, 10, gf)) : x("", !0)
                            ]),
                            l("div", yf, [
                              xe(S, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: X
                              })
                            ])
                          ])
                        ]),
                        K(D.$slots, "header", {
                          formInstance: (ye = Be()) == null ? void 0 : ye.exposed,
                          model: V.value
                        }),
                        (o(), oe(fe, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: V.value,
                          "onUpdate:modelValue": f,
                          api: M.value,
                          configureField: D.configureField,
                          configureFormLayout: D.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
                        K(D.$slots, "footer", {
                          formInstance: ($e = Be()) == null ? void 0 : $e.exposed,
                          model: V.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: b(Z.value)
                    }, [
                      l("div", null, [
                        D.showLoading && ee(y) ? (o(), oe(pe, { key: 0 })) : x("", !0)
                      ]),
                      l("div", bf, [
                        D.showCancel ? (o(), oe(ie, {
                          key: 0,
                          onClick: X,
                          disabled: ee(y)
                        }, {
                          default: Ce(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : x("", !0),
                        xe(me, {
                          type: "submit",
                          class: "ml-4",
                          disabled: ee(y)
                        }, {
                          default: Ce(() => [
                            _e("Save")
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
        ])) : (o(), r("div", Y0, [
          l("p", ef, [
            _e("Could not create form for unknown "),
            tf,
            _e(" " + j(T.value), 1)
          ])
        ])),
        ((Ie = $.value) == null ? void 0 : Ie.name) == "ModalLookup" && $.value.ref ? (o(), oe(de, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: g
        }, null, 8, ["ref-info"])) : x("", !0)
      ]);
    };
  }
}), kf = { key: 0 }, _f = { class: "text-red-700" }, $f = /* @__PURE__ */ l("b", null, "type", -1), Cf = { key: 0 }, xf = { key: 2 }, Lf = ["innerHTML"], Vf = { class: "flex justify-end" }, Sf = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Mf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), Af = { class: "fixed inset-0 overflow-hidden" }, Tf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, Ff = { class: "flex-1" }, If = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Df = { class: "flex items-start justify-between space-x-3" }, jf = { class: "space-y-1" }, Of = { key: 0 }, Pf = { key: 2 }, Bf = ["innerHTML"], Rf = { class: "flex h-7 items-center" }, Ef = { class: "flex justify-end" }, Hf = /* @__PURE__ */ ce({
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
    const n = e, a = s, i = I(), u = I(1);
    t({ forceUpdate: d, props: n, setModel: c, formFields: i });
    function d() {
      var de;
      u.value++, ne.value = Q();
      const S = Be();
      (de = S == null ? void 0 : S.proxy) == null || de.$forceUpdate();
    }
    function c(S) {
      Object.assign(ne.value, S);
    }
    function f(S) {
    }
    es("ModalProvider", {
      openModal: k
    });
    const $ = I(), m = I();
    function k(S, de) {
      $.value = S, m.value = de;
    }
    async function g(S) {
      m.value && m.value(S), $.value = void 0, m.value = void 0;
    }
    const { typeOf: w, apiOf: O, typeProperties: H, createFormLayout: ae, getPrimaryKey: F, Crud: T, createDto: A, formValues: ue } = rt(), V = v(() => zt(n.type)), z = v(() => w(V.value)), Q = () => typeof n.type == "string" ? A(n.type, hs(n.modelValue)) : n.type ? new n.type(hs(n.modelValue)) : null, ne = I(Q()), R = v(() => n.panelClass || Ze.panelClass(n.formStyle)), Z = v(() => n.formClass || Ze.formClass(n.formStyle)), J = v(() => n.headingClass || Ze.headingClass(n.formStyle)), U = v(() => n.subHeadingClass || Ze.subHeadingClass(n.formStyle)), M = v(() => T.model(z.value)), Y = v(() => {
      var S;
      return n.heading || ((S = w(V.value)) == null ? void 0 : S.description) || (M.value ? `Update ${ze(M.value)}` : ze(V.value));
    }), y = I(new Xe());
    let N = Object.assign({}, hs(n.modelValue));
    le.interceptors.has("AutoEditForm.new") && le.interceptors.invoke("AutoEditForm.new", { props: n, model: ne, origModel: N });
    let E = Ds(), h = v(() => E.loading.value);
    const C = () => Qe(w(T.model(z.value)), (S) => F(S));
    function G(S) {
      const { op: de, prop: Ve } = S;
      de && (T.isPatch(de) || T.isUpdate(de)) && (S.disabled = Ve == null ? void 0 : Ve.isPrimaryKey), n.configureField && n.configureField(S);
    }
    async function X(S) {
      var B, q;
      let de = S.target;
      if (!n.autosave) {
        a("save", new ne.value.constructor(ue(de, H(z.value))));
        return;
      }
      let Ve = Qe((B = ne.value) == null ? void 0 : B.getMethod, (se) => typeof se == "function" ? se() : null) || "POST", Se = Qe((q = ne.value) == null ? void 0 : q.createResponse, (se) => typeof se == "function" ? se() : null) == null, ge = C();
      if (ol.hasRequestBody(Ve)) {
        let se = new ne.value.constructor(), ye = we(n.modelValue, ge.name), $e = new FormData(de);
        ge && !Array.from($e.keys()).some((Oe) => Oe.toLowerCase() == ge.name.toLowerCase()) && $e.append(ge.name, ye);
        let Ie = [];
        const Ee = V.value && O(V.value);
        if (Ee && T.isPatch(Ee)) {
          let Oe = ae(z.value), je = {};
          if (ge && (je[ge.name] = ye), Oe.forEach((Re) => {
            let it = Re.id, Tt = we(N, it);
            if (ge && ge.name.toLowerCase() === it.toLowerCase())
              return;
            let ht = $e.get(it);
            le.interceptors.has("AutoEditForm.save.formLayout") && le.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: Tt, formLayout: Oe, input: Re, newValue: ht });
            let ns = ht != null, os = Re.type === "checkbox" ? ns !== !!Tt : Re.type === "file" ? ns : ht != Tt;
            !ht && !Tt && (os = !1), os && (ht ? je[it] = ht : Re.type !== "file" && Ie.push(it));
          }), le.interceptors.has("AutoEditForm.save") && le.interceptors.invoke("AutoEditForm.save", { origModel: N, formLayout: Oe, dirtyValues: je }), Array.from($e.keys()).filter((Re) => !je[Re]).forEach((Re) => $e.delete(Re)), Array.from($e.keys()).filter((Re) => Re.toLowerCase() != ge.name.toLowerCase()).length == 0 && Ie.length == 0) {
            ie();
            return;
          }
        }
        const Ae = Ie.length > 0 ? { jsconfig: "eccn", reset: Ie } : { jsconfig: "eccn" };
        Se ? y.value = await E.apiFormVoid(se, $e, Ae) : y.value = await E.apiForm(se, $e, Ae);
      } else {
        let se = ue(de, H(z.value));
        ge && !we(se, ge.name) && (se[ge.name] = we(n.modelValue, ge.name));
        let ye = new ne.value.constructor(se);
        Se ? y.value = await E.apiVoid(ye, { jsconfig: "eccn" }) : y.value = await E.api(ye, { jsconfig: "eccn" });
      }
      y.value.succeeded ? (de.reset(), a("save", y.value.response)) : a("error", y.value.error);
    }
    async function te(S) {
      let de = C();
      const Ve = de ? we(n.modelValue, de.name) : null;
      if (!Ve) {
        console.error(`Could not find Primary Key for Type ${V.value} (${M.value})`);
        return;
      }
      const Se = { [de.name]: Ve }, ge = typeof n.deleteType == "string" ? A(n.deleteType, Se) : n.deleteType ? new n.deleteType(Se) : null;
      Qe(ge.createResponse, (q) => typeof q == "function" ? q() : null) == null ? y.value = await E.apiVoid(ge) : y.value = await E.api(ge), y.value.succeeded ? a("delete", y.value.response) : a("error", y.value.error);
    }
    function D() {
      a("done");
    }
    const L = I(!1), fe = I(""), pe = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    St(L, () => {
      Lt(pe, fe, L.value), L.value || setTimeout(D, 700);
    }), L.value = !0;
    function ie() {
      n.formStyle == "slideOver" ? L.value = !1 : D();
    }
    const me = (S) => {
      S.key === "Escape" && ie();
    };
    return st(() => window.addEventListener("keydown", me)), Ht(() => window.removeEventListener("keydown", me)), (S, de) => {
      var $e, Ie, Ee, Ae, Oe, je, Ge, Re, it;
      const Ve = W("AutoFormFields"), Se = W("ConfirmDelete"), ge = W("FormLoading"), B = W("SecondaryButton"), q = W("PrimaryButton"), se = W("CloseButton"), ye = W("ModalLookup");
      return o(), r("div", null, [
        z.value ? S.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: b(R.value)
        }, [
          l("form", {
            onSubmit: qe(X, ["prevent"])
          }, [
            l("div", {
              class: b(Z.value)
            }, [
              l("div", null, [
                S.$slots.heading ? (o(), r("div", Cf, [
                  K(S.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: b(J.value)
                }, j(Y.value), 3)),
                S.$slots.subheading ? (o(), r("div", xf, [
                  K(S.$slots, "subheading")
                ])) : S.subHeading ? (o(), r("p", {
                  key: 3,
                  class: b(U.value)
                }, j(S.subHeading), 3)) : ($e = z.value) != null && $e.notes ? (o(), r("p", {
                  key: 4,
                  class: b(["notes", U.value]),
                  innerHTML: (Ie = z.value) == null ? void 0 : Ie.notes
                }, null, 10, Lf)) : x("", !0)
              ]),
              K(S.$slots, "header", {
                formInstance: (Ee = Be()) == null ? void 0 : Ee.exposed,
                model: ne.value
              }),
              (o(), oe(Ve, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: ne.value,
                "onUpdate:modelValue": f,
                api: y.value,
                configureField: S.configureField,
                configureFormLayout: S.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              K(S.$slots, "footer", {
                formInstance: (Ae = Be()) == null ? void 0 : Ae.exposed,
                model: ne.value
              })
            ], 2),
            l("div", {
              class: b(ee(Ze).buttonsClass)
            }, [
              l("div", null, [
                S.deleteType ? (o(), oe(Se, {
                  key: 0,
                  onDelete: te
                })) : x("", !0)
              ]),
              l("div", null, [
                S.showLoading && ee(h) ? (o(), oe(ge, { key: 0 })) : x("", !0)
              ]),
              l("div", Vf, [
                xe(B, {
                  onClick: ie,
                  disabled: ee(h)
                }, {
                  default: Ce(() => [
                    _e("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"]),
                xe(q, {
                  type: "submit",
                  class: "ml-4",
                  disabled: ee(h)
                }, {
                  default: Ce(() => [
                    _e("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", Sf, [
          Mf,
          l("div", Af, [
            l("div", {
              onMousedown: ie,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: de[0] || (de[0] = qe(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", fe.value])
                }, [
                  l("form", {
                    class: b(Z.value),
                    onSubmit: qe(X, ["prevent"])
                  }, [
                    l("div", Tf, [
                      l("div", Ff, [
                        l("div", If, [
                          l("div", Df, [
                            l("div", jf, [
                              S.$slots.heading ? (o(), r("div", Of, [
                                K(S.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: b(J.value)
                              }, j(Y.value), 3)),
                              S.$slots.subheading ? (o(), r("div", Pf, [
                                K(S.$slots, "subheading")
                              ])) : S.subHeading ? (o(), r("p", {
                                key: 3,
                                class: b(U.value)
                              }, j(S.subHeading), 3)) : (Oe = z.value) != null && Oe.notes ? (o(), r("p", {
                                key: 4,
                                class: b(["notes", U.value]),
                                innerHTML: (je = z.value) == null ? void 0 : je.notes
                              }, null, 10, Bf)) : x("", !0)
                            ]),
                            l("div", Rf, [
                              xe(se, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: ie
                              })
                            ])
                          ])
                        ]),
                        K(S.$slots, "header", {
                          formInstance: (Ge = Be()) == null ? void 0 : Ge.exposed,
                          model: ne.value
                        }),
                        (o(), oe(Ve, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: ne.value,
                          "onUpdate:modelValue": f,
                          api: y.value,
                          configureField: G,
                          configureFormLayout: S.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        K(S.$slots, "footer", {
                          formInstance: (Re = Be()) == null ? void 0 : Re.exposed,
                          model: ne.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: b(ee(Ze).buttonsClass)
                    }, [
                      l("div", null, [
                        S.deleteType ? (o(), oe(Se, {
                          key: 0,
                          onDelete: te
                        })) : x("", !0)
                      ]),
                      l("div", null, [
                        S.showLoading && ee(h) ? (o(), oe(ge, { key: 0 })) : x("", !0)
                      ]),
                      l("div", Ef, [
                        xe(B, {
                          onClick: ie,
                          disabled: ee(h)
                        }, {
                          default: Ce(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        xe(q, {
                          type: "submit",
                          class: "ml-4",
                          disabled: ee(h)
                        }, {
                          default: Ce(() => [
                            _e("Save")
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
        ])) : (o(), r("div", kf, [
          l("p", _f, [
            _e("Could not create form for unknown "),
            $f,
            _e(" " + j(V.value), 1)
          ])
        ])),
        ((it = $.value) == null ? void 0 : it.name) == "ModalLookup" && $.value.ref ? (o(), oe(ye, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: g
        }, null, 8, ["ref-info"])) : x("", !0)
      ]);
    };
  }
}), zf = /* @__PURE__ */ l("label", {
  for: "confirmDelete",
  class: "ml-2 mr-2 select-none"
}, "confirm", -1), Nf = /* @__PURE__ */ ce({
  __name: "ConfirmDelete",
  emits: ["delete"],
  setup(e, { emit: t }) {
    let s = I(!1);
    const n = t, a = () => {
      s.value && n("delete");
    }, i = v(() => [
      "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
      s.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"
    ]);
    return (u, d) => (o(), r(Fe, null, [
      Ct(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": d[0] || (d[0] = (c) => en(s) ? s.value = c : s = c)
      }, null, 512), [
        [sl, ee(s)]
      ]),
      zf,
      l("span", Me({
        onClick: qe(a, ["prevent"]),
        class: i.value
      }, u.$attrs), [
        K(u.$slots, "default", {}, () => [
          _e("Delete")
        ])
      ], 16)
    ], 64));
  }
}), Uf = {
  class: "flex",
  title: "loading..."
}, qf = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "24px",
  height: "30px",
  viewBox: "0 0 24 30"
}, Qf = /* @__PURE__ */ $s('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3), Kf = [
  Qf
], Zf = { class: "ml-2 mt-1 text-gray-400" }, Gf = /* @__PURE__ */ ce({
  __name: "FormLoading",
  props: {
    icon: { type: Boolean, default: !0 },
    text: { default: "loading..." }
  },
  setup(e) {
    return Ue("ApiState", void 0), (t, s) => (o(), r("div", Uf, [
      t.icon ? (o(), r("svg", qf, Kf)) : x("", !0),
      l("span", Zf, j(t.text), 1)
    ]));
  }
}), Wf = ["onClick"], Jf = {
  key: 3,
  class: "flex justify-between items-center"
}, Xf = { class: "mr-1 select-none" }, Yf = ["onClick"], ev = /* @__PURE__ */ ce({
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
    const s = e, n = t, a = I(), i = I(null), u = (E) => i.value === E, d = ll(), c = (E) => Object.keys(d).find((h) => h.toLowerCase() == E.toLowerCase() + "-header"), f = (E) => Object.keys(d).find((h) => h.toLowerCase() == E.toLowerCase()), p = v(() => Qs(s.items).filter((E) => !!(d[E] || d[E + "-header"]))), { typeOf: $, typeProperties: m } = rt(), k = v(() => zt(s.type)), g = v(() => $(k.value)), w = v(() => m(g.value));
    function O(E) {
      const h = s.headerTitles && we(s.headerTitles, E) || E;
      return s.headerTitle ? s.headerTitle(h) : an(h);
    }
    function H(E) {
      const h = E.toLowerCase();
      return w.value.find((C) => C.name.toLowerCase() == h);
    }
    function ae(E) {
      const h = H(E);
      return h != null && h.format ? h.format : (h == null ? void 0 : h.type) == "TimeSpan" || (h == null ? void 0 : h.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const F = {
      xs: "xs:table-cell",
      sm: "sm:table-cell",
      md: "md:table-cell",
      lg: "lg:table-cell",
      xl: "xl:table-cell",
      "2xl": "2xl:table-cell",
      never: ""
    };
    function T(E) {
      const h = s.visibleFrom && we(s.visibleFrom, E);
      return h && Qe(F[h], (C) => `hidden ${C}`);
    }
    const A = v(() => s.gridClass ?? he.getGridClass(s.tableStyle)), ue = v(() => s.grid2Class ?? he.getGrid2Class(s.tableStyle)), V = v(() => s.grid3Class ?? he.getGrid3Class(s.tableStyle)), z = v(() => s.grid4Class ?? he.getGrid4Class(s.tableStyle)), Q = v(() => s.tableClass ?? he.getTableClass(s.tableStyle)), ne = v(() => s.tbodyClass ?? he.getTbodyClass(s.tbodyClass)), R = v(() => s.theadClass ?? he.getTheadClass(s.tableStyle)), Z = v(() => s.theadRowClass ?? he.getTheadRowClass(s.tableStyle)), J = v(() => s.theadCellClass ?? he.getTheadCellClass(s.tableStyle));
    function U(E, h) {
      return s.rowClass ? s.rowClass(E, h) : he.getTableRowClass(s.tableStyle, h, !!(s.isSelected && s.isSelected(E)), s.isSelected != null);
    }
    function M(E, h) {
      return s.rowStyle ? s.rowStyle(E, h) : void 0;
    }
    const Y = v(() => {
      const E = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (p.value.length > 0 ? p.value : Qs(s.items)), h = w.value.reduce((C, G) => (C[G.name.toLowerCase()] = G.format, C), {});
      return E.filter((C) => {
        var G;
        return ((G = h[C.toLowerCase()]) == null ? void 0 : G.method) != "hidden";
      });
    });
    function y(E, h) {
      n("headerSelected", h, E);
    }
    function N(E, h, C) {
      n("rowSelected", C, E);
    }
    return (E, h) => {
      const C = W("CellFormat"), G = W("PreviewFormat");
      return E.items.length ? (o(), r("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: b(A.value)
      }, [
        l("div", {
          class: b(ue.value)
        }, [
          l("div", {
            class: b(V.value)
          }, [
            l("div", {
              class: b(z.value)
            }, [
              l("table", {
                class: b(Q.value)
              }, [
                l("thead", {
                  class: b(R.value)
                }, [
                  l("tr", {
                    class: b(Z.value)
                  }, [
                    (o(!0), r(Fe, null, De(Y.value, (X) => (o(), r("td", {
                      class: b([T(X), J.value, u(X) ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"])
                    }, [
                      l("div", {
                        onClick: (te) => y(te, X)
                      }, [
                        ee(d)[X + "-header"] ? K(E.$slots, X + "-header", {
                          key: 0,
                          column: X
                        }) : c(X) ? K(E.$slots, c(X), {
                          key: 1,
                          column: X
                        }) : ee(d).header ? K(E.$slots, "header", {
                          key: 2,
                          column: X,
                          label: O(X)
                        }) : (o(), r("div", Jf, [
                          l("span", Xf, j(O(X)), 1)
                        ]))
                      ], 8, Wf)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: b(ne.value)
                }, [
                  (o(!0), r(Fe, null, De(E.items, (X, te) => (o(), r("tr", {
                    class: b(U(X, te)),
                    style: tl(M(X, te)),
                    onClick: (D) => N(D, te, X)
                  }, [
                    (o(!0), r(Fe, null, De(Y.value, (D) => (o(), r("td", {
                      class: b([T(D), ee(he).tableCellClass])
                    }, [
                      ee(d)[D] ? K(E.$slots, D, Pt(Me({ key: 0 }, X))) : f(D) ? K(E.$slots, f(D), Pt(Me({ key: 1 }, X))) : H(D) ? (o(), oe(C, {
                        key: 2,
                        type: g.value,
                        propType: H(D),
                        modelValue: X
                      }, null, 8, ["type", "propType", "modelValue"])) : (o(), oe(G, {
                        key: 3,
                        value: ee(we)(X, D),
                        format: ae(D)
                      }, null, 8, ["value", "format"]))
                    ], 2))), 256))
                  ], 14, Yf))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : x("", !0);
    };
  }
}), tv = ce({
  props: {
    type: Object,
    propType: Object,
    modelValue: Object
  },
  setup(e, { attrs: t }) {
    const { typeOf: s } = rt();
    function n(a) {
      return a != null && a.format ? a.format : (a == null ? void 0 : a.type) == "TimeSpan" || (a == null ? void 0 : a.type) == "TimeOnly" ? { method: "time" } : null;
    }
    return () => {
      var H;
      const a = n(e.propType), i = we(e.modelValue, e.propType.name), u = Object.assign({}, e, t), d = yt("span", { innerHTML: Yt(i, a, u) }), c = Wt(i) && Array.isArray(i) ? yt("span", {}, [
        yt("span", { class: "mr-2" }, `${i.length}`),
        d
      ]) : d, f = (H = e.propType) == null ? void 0 : H.ref;
      if (!f)
        return c;
      const $ = tt(e.type).find((ae) => ae.type === f.model);
      if (!$)
        return c;
      const m = we(e.modelValue, $.name), k = m && f.refLabel && we(m, f.refLabel);
      if (!k)
        return c;
      const g = s(f.model), w = g == null ? void 0 : g.icon, O = w ? yt(Zn, { image: w, class: "w-5 h-5 mr-1" }) : null;
      return yt("span", { class: "flex", title: `${f.model} ${i}` }, [
        O,
        k
      ]);
    };
  }
}), sv = { key: 0 }, lv = {
  key: 0,
  class: "mr-2"
}, nv = ["innerHTML"], ov = ["innerHTML"], av = {
  inheritAttrs: !1
}, rv = /* @__PURE__ */ ce({
  ...av,
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
    return (n, a) => ee(Wt)(n.value) ? (o(), r("span", sv, [
      n.includeCount && s.value ? (o(), r("span", lv, j(n.value.length), 1)) : x("", !0),
      l("span", {
        innerHTML: ee(Yt)(n.value, n.format, n.$attrs)
      }, null, 8, nv)
    ])) : (o(), r("span", {
      key: 1,
      innerHTML: ee(Yt)(n.value, n.format, n.$attrs)
    }, null, 8, ov));
  }
}), iv = ["innerHTML"], uv = { key: 0 }, dv = /* @__PURE__ */ l("b", null, null, -1), cv = { key: 2 }, fv = /* @__PURE__ */ ce({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Vt(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => an(c), i = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, u = v(() => Qs(t.value)), d = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const p = W("HtmlFormat", !0);
      return o(), r("div", {
        class: b(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), r("div", {
          key: 0,
          innerHTML: ee(Yt)(c.value)
        }, null, 8, iv)) : n.value ? (o(), r("div", {
          key: 1,
          class: b(c.classes("array", "div", c.depth, ee(he).gridClass))
        }, [
          ee(Vt)(c.value[0]) ? (o(), r("div", uv, "[ " + j(c.value.join(", ")) + " ]", 1)) : (o(), r("div", {
            key: 1,
            class: b(c.classes("array", "div", c.depth, ee(he).grid2Class))
          }, [
            l("div", {
              class: b(c.classes("array", "div", c.depth, ee(he).grid3Class))
            }, [
              l("div", {
                class: b(c.classes("array", "div", c.depth, ee(he).grid4Class))
              }, [
                l("table", {
                  class: b(c.classes("object", "table", c.depth, ee(he).tableClass))
                }, [
                  l("thead", {
                    class: b(c.classes("array", "thead", c.depth, ee(he).theadClass))
                  }, [
                    l("tr", null, [
                      (o(!0), r(Fe, null, De(u.value, ($) => (o(), r("th", {
                        class: b(c.classes("array", "th", c.depth, ee(he).theadCellClass + " whitespace-nowrap"))
                      }, [
                        dv,
                        _e(j(a($)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), r(Fe, null, De(c.value, ($, m) => (o(), r("tr", {
                      class: b(c.classes("array", "tr", c.depth, m % 2 == 0 ? "bg-white" : "bg-gray-50", m))
                    }, [
                      (o(!0), r(Fe, null, De(u.value, (k) => (o(), r("td", {
                        class: b(c.classes("array", "td", c.depth, ee(he).tableCellClass))
                      }, [
                        xe(p, Me({
                          value: $[k],
                          "field-attrs": c.fieldAttrs,
                          depth: c.depth + 1,
                          classes: c.classes
                        }, i(k)), null, 16, ["value", "field-attrs", "depth", "classes"])
                      ], 2))), 256))
                    ], 2))), 256))
                  ])
                ], 2)
              ], 2)
            ], 2)
          ], 2))
        ], 2)) : (o(), r("div", cv, [
          l("table", {
            class: b(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), r(Fe, null, De(d(c.value), ($) => (o(), r("tr", {
              class: b(c.classes("object", "tr", c.depth, ""))
            }, [
              l("th", {
                class: b(c.classes("object", "th", c.depth, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"))
              }, j($.key), 3),
              l("td", {
                class: b(c.classes("object", "td", c.depth, "align-top py-2 px-4 text-sm"))
              }, [
                xe(p, Me({
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
}), vv = { class: "absolute top-0 right-0 pt-4 pr-4" }, pv = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), mv = /* @__PURE__ */ l("svg", {
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
], -1), hv = [
  pv,
  mv
], gv = /* @__PURE__ */ ce({
  __name: "CloseButton",
  props: {
    buttonClass: { default: "bg-white dark:bg-black" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    return (s, n) => (o(), r("div", vv, [
      l("button", {
        type: "button",
        onClick: n[0] || (n[0] = (a) => s.$emit("close")),
        class: b([s.buttonClass, "rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
      }, hv, 2)
    ]));
  }
}), yv = ["id", "aria-labelledby"], bv = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), wv = { class: "fixed inset-0 overflow-hidden" }, kv = { class: "flex h-full flex-col bg-white dark:bg-black shadow-xl" }, _v = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, $v = { class: "flex-1" }, Cv = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, xv = { class: "flex items-start justify-between space-x-3" }, Lv = { class: "space-y-1" }, Vv = ["id"], Sv = {
  key: 1,
  class: "text-sm text-gray-500"
}, Mv = { class: "flex h-7 items-center" }, Av = { class: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6" }, Tv = /* @__PURE__ */ ce({
  __name: "SlideOver",
  props: {
    id: { default: "SlideOver" },
    title: {},
    contentClass: { default: "relative mt-6 flex-1 px-4 sm:px-6" }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = I(!1), a = I(""), i = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    St(n, () => {
      Lt(i, a, n.value), n.value || setTimeout(() => s("done"), 700);
    }), n.value = !0;
    const u = () => n.value = !1, d = (c) => {
      c.key === "Escape" && u();
    };
    return st(() => window.addEventListener("keydown", d)), Ht(() => window.removeEventListener("keydown", d)), (c, f) => {
      const p = W("CloseButton");
      return o(), r("div", {
        id: c.id,
        class: "relative z-10",
        "aria-labelledby": c.id + "-title",
        role: "dialog",
        "aria-modal": "true"
      }, [
        bv,
        l("div", wv, [
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
                class: b(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", a.value])
              }, [
                l("div", kv, [
                  l("div", _v, [
                    l("div", $v, [
                      l("div", Cv, [
                        l("div", xv, [
                          l("div", Lv, [
                            c.title ? (o(), r("h2", {
                              key: 0,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, j(c.title), 9, Vv)) : x("", !0),
                            c.$slots.subtitle ? (o(), r("p", Sv, [
                              K(c.$slots, "subtitle")
                            ])) : x("", !0)
                          ]),
                          l("div", Mv, [
                            xe(p, {
                              "button-class": "bg-gray-50 dark:bg-gray-900",
                              onClose: u
                            })
                          ])
                        ])
                      ]),
                      l("div", {
                        class: b(c.contentClass)
                      }, [
                        K(c.$slots, "default")
                      ], 2)
                    ])
                  ]),
                  l("div", Av, [
                    K(c.$slots, "footer")
                  ])
                ])
              ], 2)
            ], 32)
          ], 32)
        ])
      ], 8, yv);
    };
  }
}), Fv = ["id", "data-transition-for", "aria-labelledby"], Iv = { class: "fixed inset-0 z-10 overflow-y-auto" }, Dv = { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, jv = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), Ov = /* @__PURE__ */ l("svg", {
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
], -1), Pv = [
  jv,
  Ov
], Bv = /* @__PURE__ */ ce({
  __name: "ModalDialog",
  props: {
    id: { default: "ModalDialog" },
    modalClass: { default: el.modalClass },
    sizeClass: { default: el.sizeClass }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = I(!1), a = I(""), i = {
      entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
    }, u = I(""), d = {
      entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
    };
    St(n, () => {
      Lt(i, a, n.value), Lt(d, u, n.value), n.value || setTimeout(() => s("done"), 200);
    }), n.value = !0;
    const c = () => n.value = !1;
    es("ModalProvider", {
      openModal: m
    });
    const p = I(), $ = I();
    function m(w, O) {
      p.value = w, $.value = O;
    }
    async function k(w) {
      $.value && $.value(w), p.value = void 0, $.value = void 0;
    }
    const g = (w) => {
      w.key === "Escape" && c();
    };
    return st(() => window.addEventListener("keydown", g)), Ht(() => window.removeEventListener("keydown", g)), (w, O) => {
      var ae;
      const H = W("ModalLookup");
      return o(), r("div", {
        id: w.id,
        "data-transition-for": w.id,
        onMousedown: c,
        class: "relative z-10",
        "aria-labelledby": `${w.id}-title`,
        role: "dialog",
        "aria-modal": "true"
      }, [
        l("div", {
          class: b(["fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity", a.value])
        }, null, 2),
        l("div", Iv, [
          l("div", Dv, [
            l("div", {
              class: b([w.modalClass, w.sizeClass, u.value]),
              onMousedown: O[0] || (O[0] = qe(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                l("div", { class: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10" }, [
                  l("button", {
                    type: "button",
                    onClick: c,
                    class: "bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
                  }, Pv)
                ]),
                K(w.$slots, "default")
              ])
            ], 34)
          ])
        ]),
        ((ae = p.value) == null ? void 0 : ae.name) == "ModalLookup" && p.value.ref ? (o(), oe(H, {
          key: 0,
          "ref-info": p.value.ref,
          onDone: k
        }, null, 8, ["ref-info"])) : x("", !0)
      ], 40, Fv);
    };
  }
}), Rv = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Ev = { class: "mt-3 pl-5 flex flex-wrap items-center" }, Hv = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, zv = { class: "hidden md:inline" }, Nv = { class: "flex pb-1 sm:pb-0" }, Uv = ["title"], qv = /* @__PURE__ */ l("svg", {
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
], -1), Qv = [
  qv
], Kv = ["disabled"], Zv = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), Gv = [
  Zv
], Wv = ["disabled"], Jv = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), Xv = [
  Jv
], Yv = ["disabled"], ep = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), tp = [
  ep
], sp = ["disabled"], lp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), np = [
  lp
], op = {
  key: 0,
  class: "flex pb-1 sm:pb-0"
}, ap = { class: "px-4 text-lg text-black dark:text-white" }, rp = { key: 0 }, ip = { key: 1 }, up = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), dp = { key: 2 }, cp = {
  key: 1,
  class: "pl-2"
}, fp = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), vp = [
  fp
], pp = { class: "flex pb-1 sm:pb-0" }, mp = {
  key: 0,
  class: "pl-2"
}, hp = /* @__PURE__ */ l("svg", {
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
], -1), gp = { class: "mr-1" }, yp = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, bp = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), wp = [
  bp
], kp = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, _p = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), $p = [
  _p
], Cp = { key: 1 }, xp = { key: 4 }, Lp = { key: 0 }, Vp = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, Sp = { class: "mr-1 select-none" }, Mp = {
  key: 1,
  class: "flex justify-between items-center"
}, Ap = { class: "mr-1 select-none" }, Yl = 25, Tp = /* @__PURE__ */ ce({
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
    canFilter: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = ll(), { config: i } = At(), { metadataApi: u, filterDefinitions: d } = rt(), c = Ue("client"), f = i.value.storage, p = v(() => s.toolbarButtonClass ?? he.toolbarButtonClass), $ = v(() => d.value), m = I({ take: Yl }), k = I(new Xe()), g = I(s.skip), w = I(!1), O = I(), H = (B) => typeof B == "string" ? B.split(",") : B || [];
    function ae(B, q) {
      return he.getTableRowClass("fullWidth", q, !1, !0);
    }
    function F() {
      let B = H(s.selectedColumns);
      return B.length > 0 ? B : [];
    }
    const T = v(() => at(s.refInfo.model)), A = v(() => {
      let q = F().map((ye) => ye.toLowerCase());
      const se = tt(T.value);
      return q.length > 0 ? q.map((ye) => se.find(($e) => $e.name.toLowerCase() === ye)).filter((ye) => ye != null) : se;
    }), ue = v(() => {
      let B = A.value.map((se) => se.name), q = H(m.value.selectedColumns).map((se) => se.toLowerCase());
      return q.length > 0 ? B.filter((se) => q.includes(se.toLowerCase())) : B;
    }), V = v(() => m.value.take ?? Yl), z = v(() => k.value.response ? we(k.value.response, "results") : []), Q = v(() => {
      var B;
      return ((B = k.value.response) == null ? void 0 : B.total) ?? z.value.length ?? 0;
    }), ne = v(() => g.value > 0), R = v(() => g.value > 0), Z = v(() => z.value.length >= V.value), J = v(() => z.value.length >= V.value), U = I([]), M = v(() => U.value.some((B) => B.settings.filters.length > 0 || !!B.settings.sort)), Y = v(() => U.value.map((B) => B.settings.filters.length).reduce((B, q) => B + q, 0)), y = v(() => ss(T.value)), N = v(() => {
      var B;
      return (B = u.value) == null ? void 0 : B.operations.find((q) => {
        var se;
        return ((se = q.dataModel) == null ? void 0 : se.name) == s.refInfo.model && Ne.isAnyQuery(q);
      });
    }), E = I(), h = I(!1), C = I(), G = () => `${s.id}/ApiPrefs/${s.refInfo.model}`, X = (B) => `Column/${s.id}:${s.refInfo.model}.${B}`;
    async function te(B) {
      g.value += B, g.value < 0 && (g.value = 0);
      var q = Math.floor(Q.value / V.value) * V.value;
      g.value > q && (g.value = q), await de();
    }
    async function D(B, q) {
      n("done", B);
    }
    function L() {
      n("done", null);
    }
    function fe(B, q) {
      var ye, $e, Ie;
      let se = q.target;
      if ((se == null ? void 0 : se.tagName) !== "TD") {
        let Ee = (ye = se == null ? void 0 : se.closest("TABLE")) == null ? void 0 : ye.getBoundingClientRect(), Ae = U.value.find((Oe) => Oe.name.toLowerCase() == B.toLowerCase());
        if (Ae && Ee) {
          let Oe = 318, Ge = ((($e = q.target) == null ? void 0 : $e.tagName) === "DIV" ? q.target : (Ie = q.target) == null ? void 0 : Ie.closest("DIV")).getBoundingClientRect(), Re = Oe + 25;
          C.value = {
            column: Ae,
            topLeft: {
              x: Math.max(Math.floor(Ge.x + 25), Re),
              y: Math.floor(115)
            }
          };
        }
      }
    }
    function pe() {
      C.value = null;
    }
    async function ie(B) {
      var se;
      let q = (se = C.value) == null ? void 0 : se.column;
      q && (q.settings = B, f.setItem(X(q.name), JSON.stringify(q.settings)), await de()), C.value = null;
    }
    async function me(B) {
      f.setItem(X(B.name), JSON.stringify(B.settings)), await de();
    }
    async function S(B) {
      h.value = !1, m.value = B, f.setItem(G(), JSON.stringify(B)), await de();
    }
    async function de() {
      await Ve(Se());
    }
    async function Ve(B) {
      const q = N.value;
      if (!q) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let se = Jt(q, B), ye = on((Ee) => {
        k.value.response = k.value.error = void 0, w.value = Ee;
      }), $e = await c.api(se);
      ye(), $t(() => k.value = $e);
      let Ie = we($e.response, "results") || [];
      !$e.succeeded || Ie.label == 0;
    }
    function Se() {
      let B = {
        include: "total",
        take: V.value
      }, q = H(m.value.selectedColumns || s.selectedColumns);
      if (q.length > 0) {
        let ye = y.value;
        ye && q.includes(ye.name) && (q = [ye.name, ...q]), B.fields = q.join(",");
      }
      let se = [];
      return U.value.forEach((ye) => {
        ye.settings.sort && se.push((ye.settings.sort === "DESC" ? "-" : "") + ye.name), ye.settings.filters.forEach(($e) => {
          let Ie = $e.key.replace("%", ye.name);
          B[Ie] = $e.value;
        });
      }), typeof B.skip > "u" && g.value > 0 && (B.skip = g.value), se.length > 0 && (B.orderBy = se.join(",")), B;
    }
    async function ge() {
      U.value.forEach((B) => {
        B.settings = { filters: [] }, f.removeItem(X(B.name));
      }), await de();
    }
    return st(async () => {
      const B = s.prefs || ks(f.getItem(G()));
      B && (m.value = B), U.value = A.value.map((q) => ({
        name: q.name,
        type: q.type,
        meta: q,
        settings: Object.assign(
          {
            filters: []
          },
          ks(f.getItem(X(q.name)))
        )
      })), isNaN(s.skip) || (g.value = s.skip), await de();
    }), (B, q) => {
      const se = W("ErrorSummary"), ye = W("Loading"), $e = W("SettingsIcons"), Ie = W("DataGrid"), Ee = W("ModalDialog");
      return o(), r(Fe, null, [
        B.refInfo ? (o(), oe(Ee, {
          key: 0,
          ref_key: "modalDialog",
          ref: E,
          id: B.id,
          onDone: L
        }, {
          default: Ce(() => [
            l("div", Rv, [
              l("div", Ev, [
                l("h3", Hv, [
                  _e(" Select "),
                  l("span", zv, j(ee(ze)(B.refInfo.model)), 1)
                ]),
                l("div", Nv, [
                  B.showPreferences ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${B.refInfo.model} Preferences`,
                    onClick: q[0] || (q[0] = (Ae) => h.value = !h.value)
                  }, Qv, 8, Uv)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: b(["pl-2", ne.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !ne.value,
                    onClick: q[1] || (q[1] = (Ae) => te(-Q.value))
                  }, Gv, 10, Kv)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 2,
                    type: "button",
                    class: b(["pl-2", R.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !R.value,
                    onClick: q[2] || (q[2] = (Ae) => te(-V.value))
                  }, Xv, 10, Wv)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 3,
                    type: "button",
                    class: b(["pl-2", Z.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !Z.value,
                    onClick: q[3] || (q[3] = (Ae) => te(V.value))
                  }, tp, 10, Yv)) : x("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 4,
                    type: "button",
                    class: b(["pl-2", J.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !J.value,
                    onClick: q[4] || (q[4] = (Ae) => te(Q.value))
                  }, np, 10, sp)) : x("", !0)
                ]),
                B.showPagingInfo ? (o(), r("div", op, [
                  l("div", ap, [
                    w.value ? (o(), r("span", rp, "Querying...")) : x("", !0),
                    z.value.length ? (o(), r("span", ip, [
                      up,
                      _e(" " + j(g.value + 1) + " - " + j(Math.min(g.value + z.value.length, Q.value)) + " ", 1),
                      l("span", null, " of " + j(Q.value), 1)
                    ])) : k.value.completed ? (o(), r("span", dp, "No Results")) : x("", !0)
                  ])
                ])) : x("", !0),
                M.value && B.showResetPreferences ? (o(), r("div", cp, [
                  l("button", {
                    type: "button",
                    onClick: ge,
                    title: "Reset Preferences & Filters",
                    class: b(p.value)
                  }, vp, 2)
                ])) : x("", !0),
                l("div", pp, [
                  B.showFiltersView && Y.value > 0 ? (o(), r("div", mp, [
                    l("button", {
                      type: "button",
                      onClick: q[5] || (q[5] = (Ae) => O.value = O.value == "filters" ? null : "filters"),
                      class: b(p.value),
                      "aria-expanded": "false"
                    }, [
                      hp,
                      l("span", gp, j(Y.value) + " " + j(Y.value == 1 ? "Filter" : "Filters"), 1),
                      O.value != "filters" ? (o(), r("svg", yp, wp)) : (o(), r("svg", kp, $p))
                    ], 2)
                  ])) : x("", !0)
                ])
              ]),
              O.value == "filters" ? (o(), oe(Al, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: $.value,
                columns: U.value,
                onDone: q[6] || (q[6] = (Ae) => O.value = null),
                onChange: me
              }, null, 8, ["definitions", "columns"])) : x("", !0),
              C.value ? (o(), r("div", Cp, [
                xe(Ml, {
                  definitions: $.value,
                  column: C.value.column,
                  "top-left": C.value.topLeft,
                  onDone: pe,
                  onSave: ie
                }, null, 8, ["definitions", "column", "top-left"])
              ])) : x("", !0),
              k.value.error ? (o(), oe(se, {
                key: 2,
                status: k.value.error
              }, null, 8, ["status"])) : w.value ? (o(), oe(ye, { key: 3 })) : (o(), r("div", xp, [
                z.value.length ? (o(), r("div", Lp, [
                  xe(Ie, {
                    id: B.id,
                    items: z.value,
                    type: B.refInfo.model,
                    "selected-columns": ue.value,
                    onFiltersChanged: de,
                    tableStyle: "fullWidth",
                    rowClass: ae,
                    onRowSelected: D,
                    onHeaderSelected: fe
                  }, nl({
                    header: Ce(({ column: Ae, label: Oe }) => {
                      var je;
                      return [
                        B.allowFiltering && (!s.canFilter || s.canFilter(Ae)) ? (o(), r("div", Vp, [
                          l("span", Sp, j(Oe), 1),
                          xe($e, {
                            column: U.value.find((Ge) => Ge.name.toLowerCase() === Ae.toLowerCase()),
                            "is-open": ((je = C.value) == null ? void 0 : je.column.name) === Ae
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), r("div", Mp, [
                          l("span", Ap, j(Oe), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    De(Object.keys(ee(a)), (Ae) => ({
                      name: Ae,
                      fn: Ce((Oe) => [
                        K(B.$slots, Ae, Pt(bs(Oe)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : x("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : x("", !0),
        h.value ? (o(), oe(Tl, {
          key: 1,
          columns: A.value,
          prefs: m.value,
          onDone: q[7] || (q[7] = (Ae) => h.value = !1),
          onSave: S
        }, null, 8, ["columns", "prefs"])) : x("", !0)
      ], 64);
    };
  }
}), Fp = { class: "sm:hidden" }, Ip = ["for"], Dp = ["id", "name"], jp = ["value"], Op = { class: "hidden sm:block" }, Pp = { class: "border-b border-gray-200" }, Bp = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, Rp = ["onClick"], Ep = /* @__PURE__ */ ce({
  __name: "Tabs",
  props: {
    tabs: {},
    id: { default: "tabs" },
    param: { default: "tab" },
    label: { type: Function, default: (e) => ze(e) },
    selected: {},
    tabClass: {},
    bodyClass: { default: "p-4" },
    url: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, s = v(() => Object.keys(t.tabs)), n = (p) => t.label ? t.label(p) : ze(p), a = v(() => t.id || "tabs"), i = v(() => t.param || "tab"), u = I();
    function d(p) {
      if (u.value = p, t.url) {
        const $ = s.value[0];
        al({ tab: p === $ ? void 0 : p });
      }
    }
    function c(p) {
      return u.value === p;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return st(() => {
      if (u.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const p = location.search ? location.search : location.hash.includes("?") ? "?" + vs(location.hash, "?") : "", m = qs(p)[i.value];
        m && (u.value = m);
      }
    }), (p, $) => (o(), r("div", null, [
      l("div", Fp, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, Ip),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: $[0] || ($[0] = (m) => {
            var k;
            return d((k = m.target) == null ? void 0 : k.value);
          })
        }, [
          (o(!0), r(Fe, null, De(s.value, (m) => (o(), r("option", {
            key: m,
            value: m
          }, j(n(m)), 9, jp))), 128))
        ], 40, Dp)
      ]),
      l("div", Op, [
        l("div", Pp, [
          l("nav", Bp, [
            (o(!0), r(Fe, null, De(s.value, (m) => (o(), r("a", {
              href: "#",
              onClick: qe((k) => d(m), ["prevent"]),
              style: tl({ width: f.value }),
              class: b([c(m) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", p.tabClass])
            }, j(n(m)), 15, Rp))), 256))
          ])
        ])
      ]),
      l("div", {
        class: b(p.bodyClass)
      }, [
        (o(), oe(sn(p.tabs[u.value])))
      ], 2)
    ]));
  }
}), Hp = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-gray-400",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
  })
], -1), zp = [
  Hp
], Np = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-indigo-600",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
  })
], -1), Up = [
  Np
], qp = /* @__PURE__ */ ce({
  __name: "DarkModeToggle",
  setup(e) {
    const t = typeof document < "u" ? document.documentElement : null, s = () => !!(t != null && t.classList.contains("dark")), n = I(localStorage.getItem("color-scheme") == "dark");
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
        class: b(`${n.value ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`)
      }, [
        l("span", {
          class: b(`${n.value ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, zp, 2),
        l("span", {
          class: b(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Up, 2)
      ], 2)
    ]));
  }
}), Qp = { key: 0 }, Kp = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, Zp = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, Gp = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900" }, Wp = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600"
}, Jp = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, Xp = ["onClick"], Yp = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, e1 = { class: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10" }, t1 = { class: "mt-8" }, s1 = {
  key: 1,
  class: "mt-6"
}, l1 = /* @__PURE__ */ $s('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500"> Or continue with </span></div></div>', 1), n1 = { class: "mt-6 grid grid-cols-3 gap-3" }, o1 = ["href", "title"], a1 = {
  key: 1,
  class: "h-5 w-5 text-gray-700",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, r1 = /* @__PURE__ */ l("path", {
  d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z",
  fill: "currentColor"
}, null, -1), i1 = /* @__PURE__ */ l("path", {
  d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z",
  fill: "currentColor"
}, null, -1), u1 = [
  r1,
  i1
], d1 = /* @__PURE__ */ ce({
  __name: "SignIn",
  props: {
    provider: {},
    title: { default: "Sign In" },
    tabs: { type: [Boolean, String], default: !0 },
    oauth: { type: [Boolean, String], default: !0 }
  },
  emits: ["login"],
  setup(e, { emit: t }) {
    const s = e, n = t, { getMetadata: a, createDto: i } = rt(), u = Ds(), d = Ue("client"), { signIn: c } = Sl(), f = a({ assert: !0 }), p = f.plugins.auth, $ = document.baseURI, m = f.app.baseUrl, k = I(i("Authenticate")), g = I(new Xe()), w = I(s.provider);
    st(() => {
      p == null || p.authProviders.map((R) => R.formLayout).filter((R) => R).forEach((R) => R.forEach(
        (Z) => k.value[Z.id] = Z.type === "checkbox" ? !1 : ""
      ));
    });
    const O = v(() => (p == null ? void 0 : p.authProviders.filter((R) => R.formLayout)) || []), H = v(() => O.value[0] || {}), ae = v(() => O.value[Math.max(O.value.length - 1, 0)] || {}), F = v(() => (w.value ? p == null ? void 0 : p.authProviders.find((R) => R.name === w.value) : null) ?? H.value), T = (R) => R === !1 || R === "false";
    function A(R) {
      return R.label || R.navItem && R.navItem.label;
    }
    const ue = v(() => {
      var R;
      return (((R = F.value) == null ? void 0 : R.formLayout) || []).map((Z) => {
        var J, U;
        return Object.assign({}, Z, {
          type: (J = Z.type) == null ? void 0 : J.toLowerCase(),
          autocomplete: Z.autocomplete || (((U = Z.type) == null ? void 0 : U.toLowerCase()) === "password" ? "current-password" : void 0) || (Z.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, Z.css)
        });
      });
    }), V = v(() => T(s.oauth) ? [] : (p == null ? void 0 : p.authProviders.filter((R) => R.type === "oauth")) || []), z = v(() => {
      let R = To(
        p == null ? void 0 : p.authProviders.filter((J) => J.formLayout && J.formLayout.length > 0),
        (J, U) => {
          let M = A(U) || ot(U.name);
          J[M] = U.name === H.value.name ? "" : U.name;
        }
      );
      const Z = F.value;
      return Z && T(s.tabs) && (R = { [A(Z) || ot(Z.name)]: Z }), R;
    }), Q = v(() => {
      let R = ue.value.map((Z) => Z.id).filter((Z) => Z);
      return g.value.summaryMessage(R);
    });
    async function ne() {
      if (k.value.provider = F.value.name, F.value.name === "authsecret" ? (d.headers.set("authsecret", k.value.authsecret), k.value = i("Authenticate")) : F.value.name === "basic" ? (d.setCredentials(k.value.UserName, k.value.Password), k.value = i("Authenticate"), k.value.UserName = null, k.value.Password = null) : (F.value.type === "Bearer" || F.value.name === "jwt") && (d.bearerToken = k.value.BearerToken, k.value = i("Authenticate")), g.value = await u.api(k.value), g.value.succeeded) {
        const R = g.value.response;
        c(R), n("login", R), g.value = new Xe(), k.value = i("Authenticate");
      }
    }
    return (R, Z) => {
      const J = W("ErrorSummary"), U = W("AutoFormFields"), M = W("PrimaryButton"), Y = W("Icon"), y = po("href");
      return ee(p) ? (o(), r("div", Kp, [
        l("div", Zp, [
          l("h2", Gp, j(R.title), 1),
          Object.keys(z.value).length > 1 ? (o(), r("p", Wp, [
            l("span", Jp, [
              (o(!0), r(Fe, null, De(z.value, (N, E) => Ct((o(), r("a", {
                onClick: (h) => w.value = N,
                class: b([
                  N === "" || N === H.value.name ? "rounded-l-md" : N === ae.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  w.value === N ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                ])
              }, [
                _e(j(E), 1)
              ], 10, Xp)), [
                [y, { provider: N }]
              ])), 256))
            ])
          ])) : x("", !0)
        ]),
        l("div", Yp, [
          Q.value ? (o(), oe(J, {
            key: 0,
            class: "mb-3",
            errorSummary: Q.value
          }, null, 8, ["errorSummary"])) : x("", !0),
          l("div", e1, [
            ue.value.length ? (o(), r("form", {
              key: 0,
              onSubmit: qe(ne, ["prevent"])
            }, [
              xe(U, {
                modelValue: k.value,
                formLayout: ue.value,
                api: g.value,
                hideSummary: !0,
                "divide-class": "",
                "space-class": "space-y-6"
              }, null, 8, ["modelValue", "formLayout", "api"]),
              l("div", t1, [
                xe(M, { class: "w-full" }, {
                  default: Ce(() => [
                    _e("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : x("", !0),
            V.value.length ? (o(), r("div", s1, [
              l1,
              l("div", n1, [
                (o(!0), r(Fe, null, De(V.value, (N) => (o(), r("div", null, [
                  l("a", {
                    href: ee(m) + N.navItem.href + "?continue=" + ee($),
                    title: A(N),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  }, [
                    N.icon ? (o(), oe(Y, {
                      key: 0,
                      image: N.icon,
                      class: "h-5 w-5 text-gray-700"
                    }, null, 8, ["image"])) : (o(), r("svg", a1, u1))
                  ], 8, o1)
                ]))), 256))
              ])
            ])) : x("", !0)
          ])
        ])
      ])) : (o(), r("div", Qp, "No Auth Plugin"));
    };
  }
}), c1 = ["for"], f1 = {
  key: 1,
  class: "border border-gray-200 flex justify-between"
}, v1 = { class: "p-2 flex flex-wrap gap-x-4" }, p1 = /* @__PURE__ */ l("title", null, "Bold text (CTRL+B)", -1), m1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}, null, -1), h1 = [
  p1,
  m1
], g1 = /* @__PURE__ */ l("title", null, "Italics (CTRL+I)", -1), y1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}, null, -1), b1 = [
  g1,
  y1
], w1 = /* @__PURE__ */ l("title", null, "Insert Link (CTRL+K)", -1), k1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"
}, null, -1), _1 = [
  w1,
  k1
], $1 = /* @__PURE__ */ l("title", null, "Blockquote (CTRL+Q)", -1), C1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z"
}, null, -1), x1 = [
  $1,
  C1
], L1 = /* @__PURE__ */ l("title", null, "Insert Image (CTRL+SHIFT+L)", -1), V1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
}, null, -1), S1 = [
  L1,
  V1
], M1 = /* @__PURE__ */ l("title", null, "Insert Code (CTRL+<)", -1), A1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
}, null, -1), T1 = [
  M1,
  A1
], F1 = /* @__PURE__ */ l("title", null, "H2 Heading (CTRL+H)", -1), I1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z"
}, null, -1), D1 = [
  F1,
  I1
], j1 = /* @__PURE__ */ l("title", null, "Numbered List (ALT+1)", -1), O1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z"
}, null, -1), P1 = [
  j1,
  O1
], B1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), R1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), E1 = [
  B1,
  R1
], H1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), z1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), N1 = [
  H1,
  z1
], U1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), q1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), Q1 = [
  U1,
  q1
], K1 = /* @__PURE__ */ l("title", null, "Redo (CTRL+SHIFT+Z)", -1), Z1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
}, null, -1), G1 = [
  K1,
  Z1
], W1 = {
  key: 0,
  class: "p-2 flex flex-wrap gap-x-4"
}, J1 = ["href"], X1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z"
}, null, -1), Y1 = [
  X1
], em = { class: "" }, tm = ["name", "id", "label", "value", "rows", "disabled"], sm = ["id"], lm = ["id"], Je = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", nm = /* @__PURE__ */ ce({
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
    let i = [], u = [], d = Ue("ApiState", void 0);
    const c = v(() => mt.call({ responseStatus: n.status ?? (d == null ? void 0 : d.error.value) }, n.id)), f = v(() => n.label ?? ze(ot(n.id))), p = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), $ = v(() => n.hide ? _t(p, n.hide) : _t(p, []));
    function m(h) {
      return $.value[h];
    }
    const k = v(() => ["shadow-sm font-mono" + nt.base.replace("rounded-md", ""), c.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + nt.valid, n.inputClass]), g = I();
    t({ props: n, textarea: g, updateModelValue: w, selection: H, hasSelection: O, selectionInfo: ae, insert: T, replace: F });
    function w(h) {
      a("update:modelValue", h);
    }
    function O() {
      return g.value.selectionStart !== g.value.selectionEnd;
    }
    function H() {
      const h = g.value;
      return h.value.substring(h.selectionStart, h.selectionEnd) || "";
    }
    function ae() {
      const h = g.value, C = h.value, G = h.selectionStart, X = C.substring(G, h.selectionEnd) || "", te = C.substring(0, G), D = te.lastIndexOf(`
`);
      return {
        value: C,
        sel: X,
        selPos: G,
        beforeSel: te,
        afterSel: C.substring(G),
        prevCRPos: D,
        beforeCR: D >= 0 ? te.substring(0, D + 1) : "",
        afterCR: D >= 0 ? te.substring(D + 1) : ""
      };
    }
    function F({ value: h, selectionStart: C, selectionEnd: G }) {
      G == null && (G = C), w(h), $t(() => {
        g.value.focus(), g.value.setSelectionRange(C, G);
      });
    }
    function T(h, C, G = "", { selectionAtEnd: X, offsetStart: te, offsetEnd: D, filterValue: L, filterSelection: fe } = {}) {
      const pe = g.value;
      let ie = pe.value, me = pe.selectionEnd;
      i.push({ value: ie, selectionStart: pe.selectionStart, selectionEnd: pe.selectionEnd }), u = [];
      const S = pe.selectionStart, de = pe.selectionEnd;
      let Ve = ie.substring(0, S), Se = ie.substring(de);
      const ge = h && Ve.endsWith(h) && Se.startsWith(C);
      if (S == de) {
        if (ge ? (ie = Ve.substring(0, Ve.length - h.length) + Se.substring(C.length), me += -C.length) : (ie = Ve + h + G + C + Se, me += h.length, te = 0, D = (G == null ? void 0 : G.length) || 0, X && (me += D, D = 0)), L) {
          var q = { pos: me };
          ie = L(ie, q), me = q.pos;
        }
      } else {
        var se = ie.substring(S, de);
        fe && (se = fe(se)), ge ? (ie = Ve.substring(0, Ve.length - h.length) + se + Se.substring(C.length), te = -se.length - h.length, D = se.length) : (ie = Ve + h + se + C + Se, te ? me += (h + C).length : (me = S, te = h.length, D = se.length));
      }
      w(ie), $t(() => {
        pe.focus(), te = me + (te || 0), D = (te || 0) + (D || 0), pe.setSelectionRange(te, D);
      });
    }
    const A = () => T("**", "**", "bold"), ue = () => T("_", "_", "italics"), V = () => T("~~", "~~", "strikethrough"), z = () => T("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), Q = () => T(`
> `, `
`, "Blockquote", {}), ne = () => T("![](", ")");
    function R(h) {
      const C = H();
      if (C && !h.shiftKey)
        T("`", "`", "code");
      else {
        const G = n.lang || "js";
        C.indexOf(`
`) === -1 ? T("\n```" + G + `
`, "\n```\n", "// code") : T("```" + G + `
`, "```\n", "");
      }
    }
    function Z() {
      if (O()) {
        let { sel: h, selPos: C, beforeSel: G, afterSel: X, prevCRPos: te, beforeCR: D, afterCR: L } = ae();
        if (h.indexOf(`
`) === -1)
          T(`
 1. `, `
`);
        else if (!h.startsWith(" 1. ")) {
          let ie = 1;
          T("", "", " - ", {
            selectionAtEnd: !0,
            filterSelection: (me) => " 1. " + me.replace(/\n$/, "").replace(/\n/g, (S) => `
 ${++ie}. `) + `
`
          });
        } else
          T("", "", "", {
            filterValue: (ie, me) => {
              if (te >= 0) {
                let S = L.replace(/^ - /, "");
                G = D + S, me.pos -= L.length - S.length;
              }
              return G + X;
            },
            filterSelection: (ie) => ie.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
          });
      } else
        T(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function J() {
      if (O()) {
        let { sel: h, selPos: C, beforeSel: G, afterSel: X, prevCRPos: te, beforeCR: D, afterCR: L } = ae();
        h.indexOf(`
`) === -1 ? T(`
 - `, `
`) : !h.startsWith(" - ") ? T("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (ie) => " - " + ie.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
        }) : T("", "", "", {
          filterValue: (ie, me) => {
            if (te >= 0) {
              let S = L.replace(/^ - /, "");
              G = D + S, me.pos -= L.length - S.length;
            }
            return G + X;
          },
          filterSelection: (ie) => ie.replace(/^ - /g, "").replace(/\n - /g, `
`)
        });
      } else
        T(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function U() {
      const h = H(), C = h.indexOf(`
`) === -1;
      h ? C ? T(`
## `, `
`, "") : T("## ", "", "") : T(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
    }
    function M() {
      let { sel: h, selPos: C, beforeSel: G, afterSel: X, prevCRPos: te, beforeCR: D, afterCR: L } = ae();
      !h.startsWith("//") && !L.startsWith("//") ? h ? T("", "", "//", {
        selectionAtEnd: !0,
        filterSelection: (pe) => "//" + pe.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
      }) : F({
        value: D + "//" + L + X,
        selectionStart: C + 2
      }) : T("", "", "", {
        filterValue: (pe, ie) => {
          if (te >= 0) {
            let me = L.replace(/^\/\//, "");
            G = D + me, ie.pos -= L.length - me.length;
          }
          return G + X;
        },
        filterSelection: (pe) => pe.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
      });
    }
    const Y = () => T(`/*
`, `*/
`, "");
    function y() {
      if (i.length === 0)
        return !1;
      const h = g.value, C = i.pop();
      return u.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), F(C), !0;
    }
    function N() {
      if (u.length === 0)
        return !1;
      const h = g.value, C = u.pop();
      return i.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), F(C), !0;
    }
    const E = () => null;
    return st(() => {
      i = [], u = [];
      const h = g.value;
      h.onkeydown = (C) => {
        if (C.key === "Escape" || C.keyCode === 27) {
          a("close");
          return;
        }
        const G = String.fromCharCode(C.keyCode).toLowerCase();
        G === "	" ? (!C.shiftKey ? T("", "", "    ", {
          selectionAtEnd: !0,
          filterSelection: (te) => "    " + te.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
        }) : T("", "", "", {
          filterValue: (te, D) => {
            let { selPos: L, beforeSel: fe, afterSel: pe, prevCRPos: ie, beforeCR: me, afterCR: S } = ae();
            if (ie >= 0) {
              let de = S.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              fe = me + de, D.pos -= S.length - de.length;
            }
            return fe + pe;
          },
          filterSelection: (te) => te.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), C.preventDefault()) : C.ctrlKey ? G === "z" ? C.shiftKey ? N() && C.preventDefault() : y() && C.preventDefault() : G === "b" && !C.shiftKey ? (A(), C.preventDefault()) : G === "h" && !C.shiftKey ? (U(), C.preventDefault()) : G === "i" && !C.shiftKey ? (ue(), C.preventDefault()) : G === "q" && !C.shiftKey ? (Q(), C.preventDefault()) : G === "k" ? C.shiftKey ? (ne(), C.preventDefault()) : (z(), C.preventDefault()) : G === "," || C.key === "<" || C.key === ">" || C.keyCode === 188 ? (R(C), C.preventDefault()) : G === "/" || C.key === "/" ? (M(), C.preventDefault()) : (G === "?" || C.key === "?") && C.shiftKey && (Y(), C.preventDefault()) : C.altKey && (C.key === "1" || C.key === "0" ? (Z(), C.preventDefault()) : C.key === "-" ? (J(), C.preventDefault()) : C.key === "s" && (V(), C.preventDefault()));
      };
    }), (h, C) => {
      var G;
      return o(), r("div", null, [
        K(h.$slots, "header", Me({
          inputElement: g.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs)),
        f.value ? (o(), r("label", {
          key: 0,
          for: h.id,
          class: b(`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${h.labelClass ?? ""}`)
        }, j(f.value), 11, c1)) : x("", !0),
        h.disabled ? x("", !0) : (o(), r("div", f1, [
          l("div", v1, [
            m("bold") ? (o(), r("svg", {
              key: 0,
              class: b(Je),
              onClick: A,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, h1)) : x("", !0),
            m("italics") ? (o(), r("svg", {
              key: 1,
              class: b(Je),
              onClick: ue,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, b1)) : x("", !0),
            m("link") ? (o(), r("svg", {
              key: 2,
              class: b(Je),
              onClick: z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, _1)) : x("", !0),
            m("blockquote") ? (o(), r("svg", {
              key: 3,
              class: b(Je),
              onClick: Q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, x1)) : x("", !0),
            m("image") ? (o(), r("svg", {
              key: 4,
              class: b(Je),
              onClick: ne,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, S1)) : x("", !0),
            m("code") ? (o(), r("svg", {
              key: 5,
              class: b(Je),
              onClick: R,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, T1)) : x("", !0),
            m("heading") ? (o(), r("svg", {
              key: 6,
              class: b(Je),
              onClick: U,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, D1)) : x("", !0),
            m("orderedList") ? (o(), r("svg", {
              key: 7,
              class: b(Je),
              icon: "",
              onClick: Z,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, P1)) : x("", !0),
            m("unorderedList") ? (o(), r("svg", {
              key: 8,
              class: b(Je),
              onClick: J,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, E1)) : x("", !0),
            m("strikethrough") ? (o(), r("svg", {
              key: 9,
              class: b(Je),
              onClick: V,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, N1)) : x("", !0),
            m("undo") ? (o(), r("svg", {
              key: 10,
              class: b(Je),
              onClick: y,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, Q1)) : x("", !0),
            m("redo") ? (o(), r("svg", {
              key: 11,
              class: b(Je),
              onClick: N,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, G1)) : x("", !0),
            K(h.$slots, "toolbarbuttons", {
              instance: (G = Be()) == null ? void 0 : G.exposed
            })
          ]),
          m("help") && h.helpUrl ? (o(), r("div", W1, [
            l("a", {
              title: "formatting help",
              target: "_blank",
              href: h.helpUrl,
              tabindex: "-1"
            }, [
              (o(), r("svg", {
                class: b(Je),
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, Y1))
            ], 8, J1)
          ])) : x("", !0)
        ])),
        l("div", em, [
          l("textarea", {
            ref_key: "txt",
            ref: g,
            name: h.id,
            id: h.id,
            class: b(k.value),
            label: h.label,
            value: h.modelValue,
            rows: h.rows || 6,
            disabled: h.disabled,
            onInput: C[0] || (C[0] = (X) => {
              var te;
              return w(((te = X.target) == null ? void 0 : te.value) || "");
            }),
            onKeydown: tn(E, ["tab"])
          }, null, 42, tm)
        ]),
        c.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${h.id}-error`
        }, j(c.value), 9, sm)) : h.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${h.id}-description`
        }, j(h.help), 9, lm)) : x("", !0),
        K(h.$slots, "footer", Me({
          inputElement: g.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs))
      ]);
    };
  }
}), om = {
  key: 0,
  class: "relative z-10 lg:hidden",
  role: "dialog",
  "aria-modal": "true"
}, am = { class: "fixed inset-0 flex" }, rm = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close sidebar", -1), im = /* @__PURE__ */ l("svg", {
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
], -1), um = [
  rm,
  im
], dm = { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2" }, cm = { class: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col" }, fm = { class: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6" }, vm = {
  class: /* @__PURE__ */ b(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
}, pm = /* @__PURE__ */ l("span", { class: "sr-only" }, "Open sidebar", -1), mm = /* @__PURE__ */ l("svg", {
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
], -1), hm = [
  pm,
  mm
], gm = /* @__PURE__ */ ce({
  __name: "SidebarLayout",
  setup(e, { expose: t }) {
    const { transition: s } = vn(), n = I(!0), a = I(""), i = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, u = I(""), d = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, c = I(""), f = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    };
    function p(k) {
      s(i, a, k), s(d, u, k), s(f, c, k), setTimeout(() => n.value = k, 300);
    }
    function $() {
      p(!0);
    }
    function m() {
      p(!1);
    }
    return t({ show: $, hide: m, toggle: p }), (k, g) => (o(), r("div", null, [
      n.value ? (o(), r("div", om, [
        l("div", {
          class: b(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", am, [
          l("div", {
            class: b(["relative mr-16 flex w-full max-w-xs flex-1", u.value])
          }, [
            l("div", {
              class: b(["absolute left-full top-0 flex w-16 justify-center pt-5", c.value])
            }, [
              l("button", {
                type: "button",
                onClick: m,
                class: "-m-2.5 p-2.5"
              }, um)
            ], 2),
            l("div", dm, [
              K(k.$slots, "default")
            ])
          ], 2)
        ])
      ])) : x("", !0),
      l("div", cm, [
        l("div", fm, [
          K(k.$slots, "default")
        ])
      ]),
      l("div", vm, [
        l("button", {
          type: "button",
          onClick: $,
          class: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        }, hm),
        K(k.$slots, "mobiletitlebar")
      ])
    ]));
  }
}), ym = {
  Alert: Qo,
  AlertSuccess: na,
  ErrorSummary: ua,
  InputDescription: ca,
  Icon: Zn,
  Loading: nr,
  OutlineButton: rr,
  PrimaryButton: dr,
  SecondaryButton: vr,
  TextLink: mr,
  Breadcrumbs: kr,
  Breadcrumb: Lr,
  NavList: Mr,
  NavListItem: Er,
  AutoQueryGrid: ud,
  SettingsIcons: $d,
  FilterViews: Al,
  FilterColumn: Ml,
  QueryPrefs: Tl,
  EnsureAccess: Jn,
  EnsureAccessDialog: Cd,
  TextInput: Dd,
  TextareaInput: Hd,
  SelectInput: Kd,
  CheckboxInput: tc,
  TagInput: $c,
  FileInput: Qc,
  Autocomplete: i0,
  Combobox: c0,
  DynamicInput: f0,
  LookupInput: S0,
  AutoFormFields: M0,
  AutoForm: X0,
  AutoCreateForm: wf,
  AutoEditForm: Hf,
  ConfirmDelete: Nf,
  FormLoading: Gf,
  DataGrid: ev,
  CellFormat: tv,
  PreviewFormat: rv,
  HtmlFormat: fv,
  CloseButton: gv,
  SlideOver: Tv,
  ModalDialog: Bv,
  ModalLookup: Tp,
  Tabs: Ep,
  DarkModeToggle: qp,
  SignIn: d1,
  MarkdownInput: nm,
  SidebarLayout: gm
}, Ns = ym, xm = {
  install(e) {
    Object.keys(Ns).forEach((s) => {
      e.component(s, Ns[s]);
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
    return e ? t ? le.components[e] = t : le.components[e] || Ns[e] || null : null;
  }
};
export {
  Cm as css,
  xm as default,
  Sl as useAuth,
  Ds as useClient,
  At as useConfig,
  _m as useFiles,
  $m as useFormatters,
  rt as useMetadata,
  vn as useUtils
};
