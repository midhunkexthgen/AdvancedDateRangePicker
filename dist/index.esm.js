import { jsxs as T, jsx as h, Fragment as nt } from "react/jsx-runtime";
import E, { forwardRef as Fn, createElement as Gt, useState as ne, useEffect as Ee, useRef as je, createContext as wr, useContext as xr, useCallback as X, useLayoutEffect as vr, useMemo as Fe } from "react";
import { LocalizationProvider as kr } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField as an } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs as Mr } from "@mui/x-date-pickers/AdapterDayjs";
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nr = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Sr = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), on = (e) => {
  const t = Sr(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, En = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Or = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Cr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tr = Fn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: a,
    iconNode: o,
    ...i
  }, c) => Gt(
    "svg",
    {
      ref: c,
      ...Cr,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: En("lucide", s),
      ...!a && !Or(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...o.map(([l, m]) => Gt(l, m)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = (e, t) => {
  const n = Fn(
    ({ className: r, ...s }, a) => Gt(Tr, {
      ref: a,
      iconNode: t,
      className: En(
        `lucide-${Nr(on(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = on(e), n;
};
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wr = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], Yr = He("bookmark", Wr);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _r = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], cn = He("chevron-down", _r);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fr = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], $n = He("chevron-left", Fr);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Er = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], In = He("chevron-right", Er);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $r = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ir = He("circle-question-mark", $r);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pr = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Ur = He("plus", Pr);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Br = He("search", Ar);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hr = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Rr = He("trash-2", Hr);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jr = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], qr = He("triangle-alert", jr), Pn = 6048e5, Lr = 864e5, Un = 6e4, An = 36e5, ln = Symbol.for("constructDateFrom");
function me(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ln in e ? e[ln](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function J(e, t) {
  return me(t || e, e);
}
function he(e, t, n) {
  const r = J(e, n?.in);
  return isNaN(t) ? me(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ue(e, t, n) {
  const r = J(e, n?.in);
  if (isNaN(t)) return me(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), a = me(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const o = a.getDate();
  return s >= o ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    s
  ), r);
}
let zr = {};
function vt() {
  return zr;
}
function ge(e, t) {
  const n = vt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = J(e, t?.in), a = s.getDay(), o = (a < r ? 7 : 0) + a - r;
  return s.setDate(s.getDate() - o), s.setHours(0, 0, 0, 0), s;
}
function Dt(e, t) {
  return ge(e, { ...t, weekStartsOn: 1 });
}
function Bn(e, t) {
  const n = J(e, t?.in), r = n.getFullYear(), s = me(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const a = Dt(s), o = me(n, 0);
  o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
  const i = Dt(o);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function dn(e) {
  const t = J(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function qe(e, ...t) {
  const n = me.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function bt(e, t) {
  const n = J(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Vt(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  ), a = bt(r), o = bt(s), i = +a - dn(a), c = +o - dn(o);
  return Math.round((i - c) / Lr);
}
function Zr(e, t) {
  const n = Bn(e, t), r = me(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Dt(r);
}
function Hn(e, t, n) {
  return Ue(e, t * 3, n);
}
function en(e, t, n) {
  return he(e, t * 7, n);
}
function Qr(e, t, n) {
  return Ue(e, t * 12, n);
}
function Gr(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = me.bind(null, s));
    const a = J(s, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), me(r, n || NaN);
}
function Kr(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = me.bind(null, s));
    const a = J(s, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), me(r, n || NaN);
}
function It(e, t) {
  const n = +J(e) - +J(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Xr(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  );
  return +bt(r) == +bt(s);
}
function Rn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Jr(e) {
  return !(!Rn(e) && typeof e != "number" || isNaN(+J(e)));
}
function jn(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  ), a = r.getFullYear() - s.getFullYear(), o = r.getMonth() - s.getMonth();
  return a * 12 + o;
}
function St(e, t) {
  const n = J(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function qn(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  ), a = un(r, s), o = Math.abs(
    Vt(r, s)
  );
  r.setDate(r.getDate() - a * o);
  const i = +(un(r, s) === -a), c = a * (o - i);
  return c === 0 ? 0 : c;
}
function un(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Ln(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function Vr(e, t) {
  const n = J(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function st(e, t) {
  const n = J(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function es(e, t) {
  const n = J(e, t?.in);
  return +Vr(n, t) == +st(n, t);
}
function zn(e, t, n) {
  const [r, s, a] = qe(
    n?.in,
    e,
    e,
    t
  ), o = It(s, a), i = Math.abs(
    jn(s, a)
  );
  if (i < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - o * i);
  let c = It(s, a) === -o;
  es(r) && i === 1 && It(r, a) === 1 && (c = !1);
  const l = o * (i - +c);
  return l === 0 ? 0 : l;
}
function ts(e, t, n) {
  const r = zn(e, t, n) / 3;
  return Ln()(r);
}
function ns(e, t, n) {
  const r = qn(e, t, n) / 7;
  return Ln()(r);
}
function tn(e, t) {
  const [n, r] = qe(e, t.start, t.end);
  return { start: n, end: r };
}
function Zn(e, t) {
  const { start: n, end: r } = tn(t?.in, e);
  let s = +n > +r;
  const a = s ? +n : +r, o = s ? r : n;
  o.setHours(0, 0, 0, 0);
  let i = 1;
  const c = [];
  for (; +o <= a; )
    c.push(me(n, o)), o.setDate(o.getDate() + i), o.setHours(0, 0, 0, 0);
  return s ? c.reverse() : c;
}
function rs(e, t) {
  const { start: n, end: r } = tn(t?.in, e);
  let s = +n > +r;
  const a = s ? +n : +r, o = s ? r : n;
  o.setHours(0, 0, 0, 0), o.setDate(1);
  let i = 1;
  const c = [];
  for (; +o <= a; )
    c.push(me(n, o)), o.setMonth(o.getMonth() + i);
  return s ? c.reverse() : c;
}
function ss(e, t) {
  const n = J(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function Ne(e, t) {
  const n = J(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function as(e, t) {
  const n = J(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function nn(e, t) {
  const n = J(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function os(e, t) {
  const { start: n, end: r } = tn(t?.in, e);
  let s = +n > +r;
  const a = s ? +n : +r, o = s ? r : n;
  o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +o <= a; )
    c.push(me(n, o)), o.setFullYear(o.getFullYear() + i);
  return s ? c.reverse() : c;
}
function Qn(e, t) {
  const n = vt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = J(e, t?.in), a = s.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
  return s.setDate(s.getDate() + o), s.setHours(23, 59, 59, 999), s;
}
function is(e, t) {
  return Qn(e, { ...t, weekStartsOn: 1 });
}
const cs = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, ls = (e, t, n) => {
  let r;
  const s = cs[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Pt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const ds = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, us = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, fs = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, hs = {
  date: Pt({
    formats: ds,
    defaultWidth: "full"
  }),
  time: Pt({
    formats: us,
    defaultWidth: "full"
  }),
  dateTime: Pt({
    formats: fs,
    defaultWidth: "full"
  })
}, ms = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, gs = (e, t, n, r) => ms[e];
function mt(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let s;
    if (r === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : o;
      s = e.formattingValues[i] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      s = e.values[i] || e.values[o];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return s[a];
  };
}
const ys = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ps = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Ds = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, bs = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, ws = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, xs = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, vs = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, ks = {
  ordinalNumber: vs,
  era: mt({
    values: ys,
    defaultWidth: "wide"
  }),
  quarter: mt({
    values: ps,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: mt({
    values: Ds,
    defaultWidth: "wide"
  }),
  day: mt({
    values: bs,
    defaultWidth: "wide"
  }),
  dayPeriod: mt({
    values: ws,
    defaultWidth: "wide",
    formattingValues: xs,
    defaultFormattingWidth: "wide"
  })
};
function gt(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(s);
    if (!a)
      return null;
    const o = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? Ns(i, (d) => d.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Ms(i, (d) => d.test(o))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const m = t.slice(o.length);
    return { value: l, rest: m };
  };
}
function Ms(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Ns(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Ss(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const s = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    o = n.valueCallback ? n.valueCallback(o) : o;
    const i = t.slice(s.length);
    return { value: o, rest: i };
  };
}
const Os = /^(\d+)(th|st|nd|rd)?/i, Cs = /\d+/i, Ts = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ws = {
  any: [/^b/i, /^(a|c)/i]
}, Ys = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, _s = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Fs = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Es = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, $s = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Is = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ps = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Us = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, As = {
  ordinalNumber: Ss({
    matchPattern: Os,
    parsePattern: Cs,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: gt({
    matchPatterns: Ts,
    defaultMatchWidth: "wide",
    parsePatterns: Ws,
    defaultParseWidth: "any"
  }),
  quarter: gt({
    matchPatterns: Ys,
    defaultMatchWidth: "wide",
    parsePatterns: _s,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: gt({
    matchPatterns: Fs,
    defaultMatchWidth: "wide",
    parsePatterns: Es,
    defaultParseWidth: "any"
  }),
  day: gt({
    matchPatterns: $s,
    defaultMatchWidth: "wide",
    parsePatterns: Is,
    defaultParseWidth: "any"
  }),
  dayPeriod: gt({
    matchPatterns: Ps,
    defaultMatchWidth: "any",
    parsePatterns: Us,
    defaultParseWidth: "any"
  })
}, rn = {
  code: "en-US",
  formatDistance: ls,
  formatLong: hs,
  formatRelative: gs,
  localize: ks,
  match: As,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Bs(e, t) {
  const n = J(e, t?.in);
  return Vt(n, nn(n)) + 1;
}
function Gn(e, t) {
  const n = J(e, t?.in), r = +Dt(n) - +Zr(n);
  return Math.round(r / Pn) + 1;
}
function Kn(e, t) {
  const n = J(e, t?.in), r = n.getFullYear(), s = vt(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, o = me(t?.in || e, 0);
  o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
  const i = ge(o, t), c = me(t?.in || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const l = ge(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function Hs(e, t) {
  const n = vt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = Kn(e, t), a = me(t?.in || e, 0);
  return a.setFullYear(s, 0, r), a.setHours(0, 0, 0, 0), ge(a, t);
}
function Xn(e, t) {
  const n = J(e, t?.in), r = +ge(n, t) - +Hs(n, t);
  return Math.round(r / Pn) + 1;
}
function se(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Re = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return se(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : se(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return se(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return se(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return se(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return se(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return se(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), s = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return se(s, t.length);
  }
}, et = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, fn = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), s = r > 0 ? r : 1 - r;
      return n.ordinalNumber(s, { unit: "year" });
    }
    return Re.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const s = Kn(e, r), a = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const o = a % 100;
      return se(o, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : se(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Bn(e);
    return se(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return se(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(r);
      // 01, 02, 03, 04
      case "QQ":
        return se(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(r);
      // 01, 02, 03, 04
      case "qq":
        return se(r, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Re.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(r + 1);
      // 01, 02, ..., 12
      case "LL":
        return se(r + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const s = Xn(e, r);
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : se(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Gn(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : se(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Re.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Bs(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : se(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const s = e.getDay(), a = (s - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(a);
      // Padded numerical value
      case "ee":
        return se(a, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(a, { unit: "day" });
      case "eee":
        return n.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(s, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(s, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const s = e.getDay(), a = (s - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(a);
      // Padded numerical value
      case "cc":
        return se(a, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return n.day(s, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(s, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(s, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(s, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), s = r === 0 ? 7 : r;
    switch (t) {
      // 2
      case "i":
        return String(s);
      // 02
      case "ii":
        return se(s, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(s, { unit: "day" });
      // Tue
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const s = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let s;
    switch (r === 12 ? s = et.noon : r === 0 ? s = et.midnight : s = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let s;
    switch (r >= 17 ? s = et.evening : r >= 12 ? s = et.afternoon : r >= 4 ? s = et.morning : s = et.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return Re.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Re.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : se(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : se(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Re.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Re.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Re.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return mn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Qe(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Qe(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return mn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Qe(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Qe(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + hn(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Qe(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + hn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Qe(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return se(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return se(+e, t.length);
  }
};
function hn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(s) : n + String(s) + t + se(a, 2);
}
function mn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + se(Math.abs(e) / 60, 2) : Qe(e, t);
}
function Qe(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = se(Math.trunc(r / 60), 2), a = se(r % 60, 2);
  return n + s + t + a;
}
const gn = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, Jn = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Rs = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return gn(e, t);
  let a;
  switch (r) {
    case "P":
      a = t.dateTime({ width: "short" });
      break;
    case "PP":
      a = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      a = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      a = t.dateTime({ width: "full" });
      break;
  }
  return a.replace("{{date}}", gn(r, t)).replace("{{time}}", Jn(s, t));
}, js = {
  p: Jn,
  P: Rs
}, qs = /^D+$/, Ls = /^Y+$/, zs = ["D", "DD", "YY", "YYYY"];
function Zs(e) {
  return qs.test(e);
}
function Qs(e) {
  return Ls.test(e);
}
function Gs(e, t, n) {
  const r = Ks(e, t, n);
  if (console.warn(r), zs.includes(e)) throw new RangeError(r);
}
function Ks(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Xs = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Js = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Vs = /^'([^]*?)'?$/, ea = /''/g, ta = /[a-zA-Z]/;
function na(e, t, n) {
  const r = vt(), s = n?.locale ?? r.locale ?? rn, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = J(e, n?.in);
  if (!Jr(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Js).map((m) => {
    const d = m[0];
    if (d === "p" || d === "P") {
      const b = js[d];
      return b(m, s.formatLong);
    }
    return m;
  }).join("").match(Xs).map((m) => {
    if (m === "''")
      return { isToken: !1, value: "'" };
    const d = m[0];
    if (d === "'")
      return { isToken: !1, value: ra(m) };
    if (fn[d])
      return { isToken: !0, value: m };
    if (d.match(ta))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: m };
  });
  s.localize.preprocessor && (c = s.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: a,
    weekStartsOn: o,
    locale: s
  };
  return c.map((m) => {
    if (!m.isToken) return m.value;
    const d = m.value;
    (!n?.useAdditionalWeekYearTokens && Qs(d) || !n?.useAdditionalDayOfYearTokens && Zs(d)) && Gs(d, t, String(e));
    const b = fn[d[0]];
    return b(i, d, s.localize, l);
  }).join("");
}
function ra(e) {
  const t = e.match(Vs);
  return t ? t[1].replace(ea, "'") : e;
}
function sa(e, t) {
  const n = J(e, t?.in), r = n.getFullYear(), s = n.getMonth(), a = me(n, 0);
  return a.setFullYear(r, s + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Ge(e, t) {
  return J(e, t?.in).getMonth();
}
function ye(e, t) {
  return J(e, t?.in).getFullYear();
}
function aa(e, t) {
  return +J(e) > +J(t);
}
function oa(e, t) {
  return +J(e) < +J(t);
}
function ia(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function ca(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function la(e, t) {
  const n = () => me(t?.in, NaN), s = ha(e);
  let a;
  if (s.date) {
    const l = ma(s.date, 2);
    a = ga(l.restDateString, l.year);
  }
  if (!a || isNaN(+a)) return n();
  const o = +a;
  let i = 0, c;
  if (s.time && (i = ya(s.time), isNaN(i)))
    return n();
  if (s.timezone) {
    if (c = pa(s.timezone), isNaN(c)) return n();
  } else {
    const l = new Date(o + i), m = J(0, t?.in);
    return m.setFullYear(
      l.getUTCFullYear(),
      l.getUTCMonth(),
      l.getUTCDate()
    ), m.setHours(
      l.getUTCHours(),
      l.getUTCMinutes(),
      l.getUTCSeconds(),
      l.getUTCMilliseconds()
    ), m;
  }
  return J(o + i + c, t?.in);
}
const Ot = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, da = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, ua = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, fa = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function ha(e) {
  const t = {}, n = e.split(Ot.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], Ot.timeZoneDelimiter.test(t.date) && (t.date = e.split(Ot.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = Ot.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function ma(e, t) {
  const n = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), r = e.match(n);
  if (!r) return { year: NaN, restDateString: "" };
  const s = r[1] ? parseInt(r[1]) : null, a = r[2] ? parseInt(r[2]) : null;
  return {
    year: a === null ? s : a * 100,
    restDateString: e.slice((r[1] || r[2]).length)
  };
}
function ga(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(da);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = yt(n[1]), a = yt(n[2]) - 1, o = yt(n[3]), i = yt(n[4]), c = yt(n[5]) - 1;
  if (r)
    return va(t, i, c) ? Da(t, i, c) : /* @__PURE__ */ new Date(NaN);
  {
    const l = /* @__PURE__ */ new Date(0);
    return !wa(t, a, o) || !xa(t, s) ? /* @__PURE__ */ new Date(NaN) : (l.setUTCFullYear(t, a, Math.max(s, o)), l);
  }
}
function yt(e) {
  return e ? parseInt(e) : 1;
}
function ya(e) {
  const t = e.match(ua);
  if (!t) return NaN;
  const n = Ut(t[1]), r = Ut(t[2]), s = Ut(t[3]);
  return ka(n, r, s) ? n * An + r * Un + s * 1e3 : NaN;
}
function Ut(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function pa(e) {
  if (e === "Z") return 0;
  const t = e.match(fa);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return Ma(r, s) ? n * (r * An + s * Un) : NaN;
}
function Da(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, a = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const ba = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Vn(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function wa(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (ba[t] || (Vn(e) ? 29 : 28));
}
function xa(e, t) {
  return t >= 1 && t <= (Vn(e) ? 366 : 365);
}
function va(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function ka(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function Ma(e, t) {
  return t >= 0 && t <= 59;
}
function wt(e, t, n) {
  const r = J(e, n?.in), s = r.getFullYear(), a = r.getDate(), o = me(e, 0);
  o.setFullYear(s, t, 15), o.setHours(0, 0, 0, 0);
  const i = sa(o);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Na(e, t, n) {
  const r = J(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, a = t - s;
  return wt(r, r.getMonth() + a * 3);
}
function xt(e, t, n) {
  const r = J(e, n?.in);
  return isNaN(+r) ? me(e, NaN) : (r.setFullYear(t), r);
}
function Sa(e, t) {
  const n = Ya(t);
  return "formatToParts" in n ? Ca(n, e) : Ta(n, e);
}
const Oa = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Ca(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const a = Oa[n[s].type];
      a !== void 0 && (r[a] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function Ta(e, t) {
  const n = e.format(t), r = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(n);
  return [
    parseInt(r[3], 10),
    parseInt(r[1], 10),
    parseInt(r[2], 10),
    parseInt(r[4], 10),
    parseInt(r[5], 10),
    parseInt(r[6], 10)
  ];
}
const At = {}, yn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Wa = yn === "06/25/2014, 00:00:00" || yn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function Ya(e) {
  return At[e] || (At[e] = Wa ? new Intl.DateTimeFormat("en-US", {
    hourCycle: "h23",
    timeZone: e,
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) : new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })), At[e];
}
function er(e, t, n, r, s, a, o) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, s, a, o), i;
}
const pn = 36e5, _a = 6e4, Bt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function tr(e, t, n) {
  if (!e)
    return 0;
  let r = Bt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, a;
  if (r = Bt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), Dn(s) ? -(s * pn) : NaN;
  if (r = Bt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const o = parseInt(r[3], 10);
    return Dn(s, o) ? (a = Math.abs(s) * pn + o * _a, r[1] === "+" ? -a : a) : NaN;
  }
  if ($a(e)) {
    t = new Date(t || Date.now());
    const o = n ? t : Fa(t), i = Kt(o, e);
    return -(n ? i : Ea(t, i, e));
  }
  return NaN;
}
function Fa(e) {
  return er(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function Kt(e, t) {
  const n = Sa(e, t), r = er(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const a = s % 1e3;
  return s -= a >= 0 ? a : 1e3 + a, r - s;
}
function Ea(e, t, n) {
  let s = e.getTime() - t;
  const a = Kt(new Date(s), n);
  if (t === a)
    return t;
  s -= a - t;
  const o = Kt(new Date(s), n);
  return a === o ? a : Math.max(a, o);
}
function Dn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const bn = {};
function $a(e) {
  if (bn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), bn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function wn(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const Ia = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Ht = 36e5, xn = 6e4, Pa = 2, xe = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: Ia
};
function Ua(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? Pa : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = Aa(e), { year: s, restDateString: a } = Ba(r.date, n), o = Ha(a, s);
  if (o === null || isNaN(o.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (o) {
    const i = o.getTime();
    let c = 0, l;
    if (r.time && (c = Ra(r.time), c === null || isNaN(c)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (l = tr(r.timeZone || t.timeZone, new Date(i + c)), isNaN(l))
        return /* @__PURE__ */ new Date(NaN);
    } else
      l = wn(new Date(i + c)), l = wn(new Date(i + c + l));
    return new Date(i + c + l);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Aa(e) {
  const t = {};
  let n = xe.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = xe.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = xe.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function Ba(e, t) {
  if (e) {
    const n = xe.YYY[t], r = xe.YYYYY[t];
    let s = xe.YYYY.exec(e) || r.exec(e);
    if (s) {
      const a = s[1];
      return {
        year: parseInt(a, 10),
        restDateString: e.slice(a.length)
      };
    }
    if (s = xe.YY.exec(e) || n.exec(e), s) {
      const a = s[1];
      return {
        year: parseInt(a, 10) * 100,
        restDateString: e.slice(a.length)
      };
    }
  }
  return {
    year: null
  };
}
function Ha(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let a = xe.MM.exec(e);
  if (a)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1, kn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (a = xe.DDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0);
    const o = parseInt(a[1], 10);
    return La(t, o) ? (n.setUTCFullYear(t, 0, o), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = xe.MMDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1;
    const o = parseInt(a[2], 10);
    return kn(t, r, o) ? (n.setUTCFullYear(t, r, o), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = xe.Www.exec(e), a)
    return s = parseInt(a[1], 10) - 1, Mn(s) ? vn(t, s) : /* @__PURE__ */ new Date(NaN);
  if (a = xe.WwwD.exec(e), a) {
    s = parseInt(a[1], 10) - 1;
    const o = parseInt(a[2], 10) - 1;
    return Mn(s, o) ? vn(t, s, o) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ra(e) {
  let t, n, r = xe.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Rt(t) ? t % 24 * Ht : NaN;
  if (r = xe.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Rt(t, n) ? t % 24 * Ht + n * xn : NaN;
  if (r = xe.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return Rt(t, n, s) ? t % 24 * Ht + n * xn + s * 1e3 : NaN;
  }
  return null;
}
function vn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, a = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const ja = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], qa = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function nr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function kn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = nr(e);
    if (r && n > qa[t] || !r && n > ja[t])
      return !1;
  }
  return !0;
}
function La(e, t) {
  if (t < 1)
    return !1;
  const n = nr(e);
  return !(n && t > 366 || !n && t > 365);
}
function Mn(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Rt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function za(e, t, n) {
  e = Ua(e, n);
  const r = tr(t, e, !0), s = new Date(e.getTime() - r), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), a.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), a;
}
const we = 0, lc = !1, Xt = !0, dc = "firstFullWeek", Za = "UTC";
function R(e) {
  const t = la(`${e}T00:00:00.000Z`);
  return za(t, Za);
}
function re(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Tt() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Qa(e, t, n) {
  const r = R(e);
  let s;
  switch (t) {
    case "day":
      s = he(r, n);
      break;
    case "week":
      s = en(r, n);
      break;
    case "month":
      s = Ue(r, n);
      break;
    case "quarter":
      s = Hn(r, n);
      break;
    default:
      s = r;
  }
  return re(s);
}
function Ga(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = R(e), a = 0;
    for (r.includes(s.getDay()) || (a = 1); a < n; )
      s = he(s, 1), r.includes(s.getDay()) || a++;
    return re(s);
  } else
    return Qa(e, t, n - 1);
}
function Ka(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = R(e), a = 0;
    for (r.includes(s.getDay()) || (a = 1); a < n; )
      s = he(s, -1), r.includes(s.getDay()) || a++;
    return re(s);
  } else {
    const s = R(e);
    let a;
    switch (t) {
      case "day":
        a = he(s, -(n - 1));
        break;
      case "week":
        a = en(s, -(n - 1));
        break;
      case "month":
        a = Ue(s, -(n - 1));
        break;
      case "quarter":
        a = Hn(s, -(n - 1));
        break;
      default:
        a = s;
    }
    return re(a);
  }
}
function rr(e, t, n, r) {
  const s = R(e), a = R(t);
  if (s > a) return 0;
  if (n === "day" && r.length > 0)
    return Zn({ start: s, end: a }).filter(
      (c) => !r.includes(c.getDay())
    ).length;
  switch (n) {
    case "day":
      return qn(a, s) + 1;
    case "week":
      return ns(a, s) + 1;
    case "month":
      return zn(a, s) + 1;
    case "quarter":
      return ts(a, s) + 1;
    default:
      return 1;
  }
}
function Xa(e, t, n) {
  const r = R(e), s = R(t);
  if (r > s) return [];
  const a = Zn({ start: r, end: s });
  return n.length === 0 ? a.map(re) : a.filter((o) => !n.includes(o.getDay())).map(re);
}
function sr(e, t, n = "day", r = [], s, a, o, i, c) {
  const l = rr(
    e,
    t,
    n,
    r
  ), m = Xa(
    e,
    t,
    r
  ), d = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: l,
    excludedWeekdays: r,
    includedDatesUtc: m
  };
  return s !== void 0 && (d.excludeEnabled = s), a && (d.excludeFilterTypes = a), o && (d.excludedSpecificDates = o), i && (d.excludedSavedDates = i), c && (d.excludedDateRanges = c), d;
}
function uc(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function fc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, s] = t, a = parseInt(r, 10), o = parseInt(n, 10), i = parseInt(s, 10);
  if (isNaN(a) || isNaN(o) || isNaN(i) || a < 1 || a > 12 || o < 1 || o > 31 || i < 1900 || i > 2100)
    return null;
  const c = a.toString().padStart(2, "0"), l = o.toString().padStart(2, "0");
  return `${i}-${c}-${l}`;
}
function Ja(e) {
  switch (e) {
    case "day":
      return "d";
    case "week":
      return "w";
    case "month":
      return "m";
    case "quarter":
      return "q";
    default:
      return "";
  }
}
function Va() {
  const e = Tt(), t = R(e);
  return {
    today: {
      label: "Today",
      getValue: () => ({
        startDateUtc: e,
        endDateUtc: e
      })
    },
    yesterday: {
      label: "Yesterday",
      getValue: () => {
        const n = re(he(t, -1));
        return {
          startDateUtc: n,
          endDateUtc: n
        };
      }
    },
    thisWeek: {
      label: "This Week",
      getValue: () => {
        let n = ge(t, {
          weekStartsOn: we
        }), r = he(n, 6);
        return {
          startDateUtc: re(n),
          endDateUtc: re(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = Ne(t);
        return {
          startDateUtc: re(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = nn(t);
        return {
          startDateUtc: re(n),
          endDateUtc: e
        };
      }
    }
  };
}
const eo = "DateRangePickerDB", to = 1, Ye = "savedDateRanges";
class no {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(eo, to);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (s) => {
          const a = s.target.result;
          a.objectStoreNames.contains(Ye) || a.createObjectStore(Ye, {
            keyPath: "id"
          }).createIndex("timestamp", "createdAt", { unique: !1 });
        };
      });
  }
  /**
   * Ensure database is initialized
   */
  async ensureInit() {
    (!this.db || !this.initialized) && await this.init();
  }
  /**
   * Save data to IndexedDB
   */
  async saveData(t, n) {
    return await this.ensureInit(), new Promise((r, s) => {
      const i = this.db.transaction([Ye], "readwrite").objectStore(Ye).put({
        id: t,
        data: n,
        timestamp: Date.now()
      });
      i.onerror = () => s(i.error), i.onsuccess = () => r();
    });
  }
  /**
   * Get data from IndexedDB
   */
  async getData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const o = this.db.transaction([Ye], "readonly").objectStore(Ye).get(t);
      o.onerror = () => r(o.error), o.onsuccess = () => {
        const i = o.result;
        i && i.data ? n(i.data) : n(null);
      };
    });
  }
  /**
   * Delete data from IndexedDB
   */
  async deleteData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const o = this.db.transaction([Ye], "readwrite").objectStore(Ye).delete(t);
      o.onerror = () => r(o.error), o.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const a = this.db.transaction([Ye], "readwrite").objectStore(Ye).clear();
      a.onerror = () => n(a.error), a.onsuccess = () => t();
    });
  }
}
const rt = new no(), jt = "savedDateRanges";
function ro({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r,
  disabled: s = !1
}) {
  const [a, o] = ne([]), [i, c] = ne(!1), [l, m] = ne(""), [d, b] = ne(!1);
  Ee(() => {
    (async () => {
      await rt.init();
      const N = await rt.getData(
        jt
      );
      N && o(N);
    })();
  }, []);
  const M = Va(), x = (u) => {
    if (s) return;
    const { startDateUtc: N, endDateUtc: D } = u();
    e(N, D);
  }, W = async () => {
    if (s) return;
    if (l.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const u = {
      id: `saved-${Date.now()}`,
      label: l.trim(),
      selection: n,
      createdAt: Date.now()
    }, N = [...a, u];
    o(N), await rt.saveData(jt, N), m(""), c(!1);
  }, P = async (u) => {
    if (s) return;
    const N = a.filter((D) => D.id !== u);
    o(N), await rt.saveData(jt, N);
  }, O = (u) => {
    s || (t ? t(u.selection) : e(u.selection.startDateUtc, u.selection.endDateUtc));
  }, g = (u, N) => {
    const D = (C) => (/* @__PURE__ */ new Date(C + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return u === N ? D(u) : `${D(u)} - ${D(N)}`;
  };
  return /* @__PURE__ */ T(
    "div",
    {
      className: `w-72 bg-white border-r border-gray-200 py-4 flex flex-col h-full overflow-hidden ${s ? "opacity-60" : ""}`,
      style: { ...r },
      children: [
        /* @__PURE__ */ T("div", { className: "mb-3 px-4 flex-shrink-0", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ h("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
          /* @__PURE__ */ h("div", { className: "", children: Object.values(M).map((u) => {
            const { startDateUtc: N, endDateUtc: D } = u.getValue();
            return /* @__PURE__ */ T(
              "button",
              {
                onClick: () => x(u.getValue),
                disabled: s,
                "aria-disabled": s,
                className: `w-full text-left px-3 py-2 rounded-md transition-all ${s ? "cursor-not-allowed bg-gray-100 text-gray-400" : "hover:bg-white hover:shadow-sm"}`,
                children: [
                  /* @__PURE__ */ h(
                    "div",
                    {
                      className: `text-sm font-semibold ${s ? "text-gray-400" : "text-gray-900"}`,
                      children: u.label
                    }
                  ),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      className: `text-xs leading-relaxed mt-0.5 ${s ? "text-gray-400" : "text-gray-600"}`,
                      children: g(N, D)
                    }
                  )
                ]
              },
              u.label
            );
          }) })
        ] }),
        /* @__PURE__ */ T("div", { className: "flex flex-col flex-1 min-h-0 border-t border-gray-200 px-4", children: [
          /* @__PURE__ */ h("div", { className: "flex items-center justify-between mb-2 flex-shrink-0 mt-3", children: /* @__PURE__ */ T("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ h("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Saved Dates" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => {
                  s || b(!d);
                },
                disabled: s,
                className: `text-gray-400 ${s ? "cursor-not-allowed opacity-50" : "hover:text-gray-600"}`,
                children: /* @__PURE__ */ h(Ir, { className: "w-3 h-3" })
              }
            )
          ] }) }),
          d && /* @__PURE__ */ h("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
          a.length === 0 ? /* @__PURE__ */ h("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ h("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: a.map((u) => /* @__PURE__ */ h(
            "div",
            {
              className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
              children: /* @__PURE__ */ T("div", { className: "flex items-start justify-between px-3 py-2", children: [
                /* @__PURE__ */ T(
                  "button",
                  {
                    onClick: () => O(u),
                    disabled: s,
                    className: `flex-1 text-left ${s ? "cursor-not-allowed opacity-60" : ""}`,
                    children: [
                      /* @__PURE__ */ h(
                        "div",
                        {
                          className: `text-sm font-semibold mb-1 ${s ? "text-gray-400" : "text-gray-900"}`,
                          children: u.label
                        }
                      ),
                      /* @__PURE__ */ h(
                        "div",
                        {
                          className: `text-xs leading-relaxed ${s ? "text-gray-400" : "text-gray-600"}`,
                          children: g(
                            u.selection.startDateUtc,
                            u.selection.endDateUtc
                          )
                        }
                      ),
                      (u.selection.excludedWeekdays?.length > 0 || u.selection.excludedSpecificDates && u.selection.excludedSpecificDates.length > 0 || u.selection.excludedSavedDates && u.selection.excludedSavedDates.length > 0 || u.selection.excludedDateRanges && u.selection.excludedDateRanges.length > 0) && /* @__PURE__ */ T("div", { className: "text-xs text-gray-500 mt-1 space-y-0.5", children: [
                        u.selection.excludedWeekdays?.length > 0 && /* @__PURE__ */ T("div", { children: [
                          "Days:",
                          " ",
                          u.selection.excludedWeekdays.map(
                            (N) => [
                              "Sun",
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat"
                            ][N]
                          ).join(", ")
                        ] }),
                        u.selection.excludedSpecificDates && u.selection.excludedSpecificDates.length > 0 && /* @__PURE__ */ T("div", { children: [
                          "Specific Dates:",
                          " ",
                          u.selection.excludedSpecificDates.length
                        ] }),
                        u.selection.excludedSavedDates && u.selection.excludedSavedDates.length > 0 && /* @__PURE__ */ T("div", { children: [
                          "Saved: ",
                          u.selection.excludedSavedDates.length
                        ] }),
                        u.selection.excludedDateRanges && u.selection.excludedDateRanges.length > 0 && /* @__PURE__ */ T("div", { children: [
                          "Ranges:",
                          " ",
                          u.selection.excludedDateRanges.length
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: () => P(u.id),
                    disabled: s,
                    className: `${s ? "opacity-40 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"} text-red-500 hover:text-red-700 transition-opacity ml-2`,
                    children: /* @__PURE__ */ h(Rr, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            },
            u.id
          )) }),
          /* @__PURE__ */ T(
            "button",
            {
              onClick: () => {
                s || c(!0);
              },
              disabled: s,
              className: `w-full flex-shrink-0 px-3 py-2 text-[#003DB8] opacity-50 hover:opacity-100 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 mt-auto ${s ? "cursor-not-allowed" : ""}`,
              children: [
                /* @__PURE__ */ h(Ur, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          )
        ] }),
        i && /* @__PURE__ */ T(nt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "fixed inset-0 bg-black/30 z-50",
              onClick: () => c(!1)
            }
          ),
          /* @__PURE__ */ h("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ T("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
            /* @__PURE__ */ h("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
            /* @__PURE__ */ T("div", { className: "mb-2", children: [
              /* @__PURE__ */ h("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: "text",
                  value: l,
                  onChange: (u) => m(u.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (u) => {
                    u.key === "Enter" && W();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ T("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
              /* @__PURE__ */ T("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Range:" }),
                " ",
                g(
                  n.startDateUtc,
                  n.endDateUtc
                )
              ] }),
              /* @__PURE__ */ T("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Duration:" }),
                " ",
                n.duration,
                " ",
                n.unit,
                "(s)"
              ] }),
              n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ T("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Days:" }),
                " ",
                n.excludedWeekdays.map(
                  (u) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][u]
                ).join(", ")
              ] }),
              n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ T("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Specific Dates:" }),
                " ",
                n.excludedSpecificDates.length,
                " date(s)"
              ] }),
              n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ T("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Saved Dates:" }),
                " ",
                n.excludedSavedDates.length,
                " saved date(s)"
              ] }),
              n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ T("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Date Ranges:" }),
                " ",
                n.excludedDateRanges.length,
                " range(s)"
              ] })
            ] }),
            /* @__PURE__ */ T("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => c(!1),
                  className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: W,
                  className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors",
                  children: "Save"
                }
              )
            ] })
          ] }) })
        ] })
      ]
    }
  );
}
function so(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ct = { exports: {} }, ao = Ct.exports, Nn;
function oo() {
  return Nn || (Nn = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(ao, (function() {
      var n = 1e3, r = 6e4, s = 36e5, a = "millisecond", o = "second", i = "minute", c = "hour", l = "day", m = "week", d = "month", b = "quarter", M = "year", x = "date", W = "Invalid Date", P = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, O = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var p = ["th", "st", "nd", "rd"], w = F % 100;
        return "[" + F + (p[(w - 20) % 10] || p[w] || p[0]) + "]";
      } }, u = function(F, p, w) {
        var S = String(F);
        return !S || S.length >= p ? F : "" + Array(p + 1 - S.length).join(w) + F;
      }, N = { s: u, z: function(F) {
        var p = -F.utcOffset(), w = Math.abs(p), S = Math.floor(w / 60), k = w % 60;
        return (p <= 0 ? "+" : "-") + u(S, 2, "0") + ":" + u(k, 2, "0");
      }, m: function F(p, w) {
        if (p.date() < w.date()) return -F(w, p);
        var S = 12 * (w.year() - p.year()) + (w.month() - p.month()), k = p.clone().add(S, d), $ = w - k < 0, I = p.clone().add(S + ($ ? -1 : 1), d);
        return +(-(S + (w - k) / ($ ? k - I : I - k)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: d, y: M, w: m, d: l, D: x, h: c, m: i, s: o, ms: a, Q: b }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, D = "en", C = {};
      C[D] = g;
      var Y = "$isDayjsObject", _ = function(F) {
        return F instanceof H || !(!F || !F[Y]);
      }, j = function F(p, w, S) {
        var k;
        if (!p) return D;
        if (typeof p == "string") {
          var $ = p.toLowerCase();
          C[$] && (k = $), w && (C[$] = w, k = $);
          var I = p.split("-");
          if (!k && I.length > 1) return F(I[0]);
        } else {
          var q = p.name;
          C[q] = p, k = q;
        }
        return !S && k && (D = k), k || !S && D;
      }, B = function(F, p) {
        if (_(F)) return F.clone();
        var w = typeof p == "object" ? p : {};
        return w.date = F, w.args = arguments, new H(w);
      }, U = N;
      U.l = j, U.i = _, U.w = function(F, p) {
        return B(F, { locale: p.$L, utc: p.$u, x: p.$x, $offset: p.$offset });
      };
      var H = (function() {
        function F(w) {
          this.$L = j(w.locale, null, !0), this.parse(w), this.$x = this.$x || w.x || {}, this[Y] = !0;
        }
        var p = F.prototype;
        return p.parse = function(w) {
          this.$d = (function(S) {
            var k = S.date, $ = S.utc;
            if (k === null) return /* @__PURE__ */ new Date(NaN);
            if (U.u(k)) return /* @__PURE__ */ new Date();
            if (k instanceof Date) return new Date(k);
            if (typeof k == "string" && !/Z$/i.test(k)) {
              var I = k.match(P);
              if (I) {
                var q = I[2] - 1 || 0, G = (I[7] || "0").substring(0, 3);
                return $ ? new Date(Date.UTC(I[1], q, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, G)) : new Date(I[1], q, I[3] || 1, I[4] || 0, I[5] || 0, I[6] || 0, G);
              }
            }
            return new Date(k);
          })(w), this.init();
        }, p.init = function() {
          var w = this.$d;
          this.$y = w.getFullYear(), this.$M = w.getMonth(), this.$D = w.getDate(), this.$W = w.getDay(), this.$H = w.getHours(), this.$m = w.getMinutes(), this.$s = w.getSeconds(), this.$ms = w.getMilliseconds();
        }, p.$utils = function() {
          return U;
        }, p.isValid = function() {
          return this.$d.toString() !== W;
        }, p.isSame = function(w, S) {
          var k = B(w);
          return this.startOf(S) <= k && k <= this.endOf(S);
        }, p.isAfter = function(w, S) {
          return B(w) < this.startOf(S);
        }, p.isBefore = function(w, S) {
          return this.endOf(S) < B(w);
        }, p.$g = function(w, S, k) {
          return U.u(w) ? this[S] : this.set(k, w);
        }, p.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, p.valueOf = function() {
          return this.$d.getTime();
        }, p.startOf = function(w, S) {
          var k = this, $ = !!U.u(S) || S, I = U.p(w), q = function(ae, ie) {
            var De = U.w(k.$u ? Date.UTC(k.$y, ie, ae) : new Date(k.$y, ie, ae), k);
            return $ ? De : De.endOf(l);
          }, G = function(ae, ie) {
            return U.w(k.toDate()[ae].apply(k.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ie)), k);
          }, K = this.$W, ee = this.$M, V = this.$D, te = "set" + (this.$u ? "UTC" : "");
          switch (I) {
            case M:
              return $ ? q(1, 0) : q(31, 11);
            case d:
              return $ ? q(1, ee) : q(0, ee + 1);
            case m:
              var oe = this.$locale().weekStart || 0, pe = (K < oe ? K + 7 : K) - oe;
              return q($ ? V - pe : V + (6 - pe), ee);
            case l:
            case x:
              return G(te + "Hours", 0);
            case c:
              return G(te + "Minutes", 1);
            case i:
              return G(te + "Seconds", 2);
            case o:
              return G(te + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, p.endOf = function(w) {
          return this.startOf(w, !1);
        }, p.$set = function(w, S) {
          var k, $ = U.p(w), I = "set" + (this.$u ? "UTC" : ""), q = (k = {}, k[l] = I + "Date", k[x] = I + "Date", k[d] = I + "Month", k[M] = I + "FullYear", k[c] = I + "Hours", k[i] = I + "Minutes", k[o] = I + "Seconds", k[a] = I + "Milliseconds", k)[$], G = $ === l ? this.$D + (S - this.$W) : S;
          if ($ === d || $ === M) {
            var K = this.clone().set(x, 1);
            K.$d[q](G), K.init(), this.$d = K.set(x, Math.min(this.$D, K.daysInMonth())).$d;
          } else q && this.$d[q](G);
          return this.init(), this;
        }, p.set = function(w, S) {
          return this.clone().$set(w, S);
        }, p.get = function(w) {
          return this[U.p(w)]();
        }, p.add = function(w, S) {
          var k, $ = this;
          w = Number(w);
          var I = U.p(S), q = function(ee) {
            var V = B($);
            return U.w(V.date(V.date() + Math.round(ee * w)), $);
          };
          if (I === d) return this.set(d, this.$M + w);
          if (I === M) return this.set(M, this.$y + w);
          if (I === l) return q(1);
          if (I === m) return q(7);
          var G = (k = {}, k[i] = r, k[c] = s, k[o] = n, k)[I] || 1, K = this.$d.getTime() + w * G;
          return U.w(K, this);
        }, p.subtract = function(w, S) {
          return this.add(-1 * w, S);
        }, p.format = function(w) {
          var S = this, k = this.$locale();
          if (!this.isValid()) return k.invalidDate || W;
          var $ = w || "YYYY-MM-DDTHH:mm:ssZ", I = U.z(this), q = this.$H, G = this.$m, K = this.$M, ee = k.weekdays, V = k.months, te = k.meridiem, oe = function(ie, De, ve, Te) {
            return ie && (ie[De] || ie(S, $)) || ve[De].slice(0, Te);
          }, pe = function(ie) {
            return U.s(q % 12 || 12, ie, "0");
          }, ae = te || function(ie, De, ve) {
            var Te = ie < 12 ? "AM" : "PM";
            return ve ? Te.toLowerCase() : Te;
          };
          return $.replace(O, (function(ie, De) {
            return De || (function(ve) {
              switch (ve) {
                case "YY":
                  return String(S.$y).slice(-2);
                case "YYYY":
                  return U.s(S.$y, 4, "0");
                case "M":
                  return K + 1;
                case "MM":
                  return U.s(K + 1, 2, "0");
                case "MMM":
                  return oe(k.monthsShort, K, V, 3);
                case "MMMM":
                  return oe(V, K);
                case "D":
                  return S.$D;
                case "DD":
                  return U.s(S.$D, 2, "0");
                case "d":
                  return String(S.$W);
                case "dd":
                  return oe(k.weekdaysMin, S.$W, ee, 2);
                case "ddd":
                  return oe(k.weekdaysShort, S.$W, ee, 3);
                case "dddd":
                  return ee[S.$W];
                case "H":
                  return String(q);
                case "HH":
                  return U.s(q, 2, "0");
                case "h":
                  return pe(1);
                case "hh":
                  return pe(2);
                case "a":
                  return ae(q, G, !0);
                case "A":
                  return ae(q, G, !1);
                case "m":
                  return String(G);
                case "mm":
                  return U.s(G, 2, "0");
                case "s":
                  return String(S.$s);
                case "ss":
                  return U.s(S.$s, 2, "0");
                case "SSS":
                  return U.s(S.$ms, 3, "0");
                case "Z":
                  return I;
              }
              return null;
            })(ie) || I.replace(":", "");
          }));
        }, p.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, p.diff = function(w, S, k) {
          var $, I = this, q = U.p(S), G = B(w), K = (G.utcOffset() - this.utcOffset()) * r, ee = this - G, V = function() {
            return U.m(I, G);
          };
          switch (q) {
            case M:
              $ = V() / 12;
              break;
            case d:
              $ = V();
              break;
            case b:
              $ = V() / 3;
              break;
            case m:
              $ = (ee - K) / 6048e5;
              break;
            case l:
              $ = (ee - K) / 864e5;
              break;
            case c:
              $ = ee / s;
              break;
            case i:
              $ = ee / r;
              break;
            case o:
              $ = ee / n;
              break;
            default:
              $ = ee;
          }
          return k ? $ : U.a($);
        }, p.daysInMonth = function() {
          return this.endOf(d).$D;
        }, p.$locale = function() {
          return C[this.$L];
        }, p.locale = function(w, S) {
          if (!w) return this.$L;
          var k = this.clone(), $ = j(w, S, !0);
          return $ && (k.$L = $), k;
        }, p.clone = function() {
          return U.w(this.$d, this);
        }, p.toDate = function() {
          return new Date(this.valueOf());
        }, p.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, p.toISOString = function() {
          return this.$d.toISOString();
        }, p.toString = function() {
          return this.$d.toUTCString();
        }, F;
      })(), L = H.prototype;
      return B.prototype = L, [["$ms", a], ["$s", o], ["$m", i], ["$H", c], ["$W", l], ["$M", d], ["$y", M], ["$D", x]].forEach((function(F) {
        L[F[1]] = function(p) {
          return this.$g(p, F[0], F[1]);
        };
      })), B.extend = function(F, p) {
        return F.$i || (F(p, H, B), F.$i = !0), B;
      }, B.locale = j, B.isDayjs = _, B.unix = function(F) {
        return B(1e3 * F);
      }, B.en = C[D], B.Ls = C, B.p = {}, B;
    }));
  })(Ct)), Ct.exports;
}
var io = oo();
const co = /* @__PURE__ */ so(io);
function lo({
  startDateUtc: e,
  endDateUtc: t,
  duration: n,
  unit: r,
  excludeEnabled: s,
  activeDateField: a,
  onStartDateChange: o,
  onEndDateChange: i,
  onDurationChange: c,
  onActiveFieldChange: l
}) {
  const m = je(null), [d, b] = ne(0);
  Ee(() => {
    if (m.current) {
      const g = document.createElement("canvas").getContext("2d");
      if (g) {
        g.font = "14px system-ui, -apple-system, sans-serif";
        const u = g.measureText(n.toString()).width;
        b(12 + u + 4);
      }
    }
  }, [n]);
  const M = (O) => {
    if (!O)
      return null;
    const g = co(O);
    return g.isValid() ? g : null;
  }, x = (O) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: O ? "#3b82f6" : void 0
      },
      "&:hover fieldset": {
        borderColor: O ? "#2563eb" : void 0
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 2px rgba(59,130,246,0.2)"
      },
      "&.Mui-disabled fieldset": {
        borderColor: "#e5e7eb"
      }
    },
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: s ? "#9ca3af" : void 0
    },
    "& .MuiInputLabel-root": {
      color: s ? "#9ca3af" : void 0
    }
  }), W = (O) => {
    if (!O || !O.isValid()) {
      o("");
      return;
    }
    o(O.format("YYYY-MM-DD"));
  }, P = (O) => {
    if (!O || !O.isValid()) {
      i("");
      return;
    }
    i(O.format("YYYY-MM-DD"));
  };
  return /* @__PURE__ */ h(kr, { dateAdapter: Mr, children: /* @__PURE__ */ T("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${s ? "text-gray-400" : "text-gray-600"}`,
          children: "Start Date"
        }
      ),
      /* @__PURE__ */ h(
        an,
        {
          value: M(e),
          onChange: W,
          format: "DD/MM/YYYY",
          disabled: s,
          onFocus: () => l("start"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              sx: {
                ...x(a === "start")
              },
              disabled: s
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${s ? "text-gray-400" : "text-gray-600"}`,
          children: "End Date"
        }
      ),
      /* @__PURE__ */ h(
        an,
        {
          value: M(t),
          onChange: P,
          format: "DD/MM/YYYY",
          disabled: s,
          onFocus: () => l("end"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              sx: {
                ...x(a === "end")
              },
              disabled: s
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ h("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Duration" }),
      /* @__PURE__ */ T("div", { className: "relative", children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: m,
            type: "number",
            min: "1",
            value: n,
            onChange: (O) => c(Number(O.target.value)),
            disabled: s,
            className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          }
        ),
        /* @__PURE__ */ h(
          "span",
          {
            className: `absolute top-1/2 -translate-y-1/2 text-sm pointer-events-none ${s ? "text-gray-300" : "text-gray-500"}`,
            style: { left: `${d}px` },
            children: Ja(r)
          }
        )
      ] })
    ] })
  ] }) });
}
const uo = ["day", "week", "month", "quarter"];
function fo({
  unit: e,
  excludeEnabled: t,
  onUnitChange: n
}) {
  return /* @__PURE__ */ h("div", { className: "flex gap-2 mb-4", children: uo.map((r) => /* @__PURE__ */ h(
    "button",
    {
      onClick: () => n(r),
      disabled: t,
      className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${t ? e === r ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8] opacity-60 cursor-not-allowed" : "bg-[#EBF0F9] text-gray-400 opacity-60 cursor-not-allowed border border-transparent" : e === r ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
      children: r.charAt(0).toUpperCase() + r.slice(1)
    },
    r
  )) });
}
const ho = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], mo = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], qt = "var(--adrp-container-height, min(720px, 85vh))", Lt = "var(--adrp-container-width, min(1200px, 98vw))";
function go({
  excludeEnabled: e,
  excludeApplied: t,
  excludeFilterTypes: n,
  activeFilterView: r,
  excludedWeekdays: s,
  excludedSavedDates: a,
  savedDatesSearchTerm: o,
  filteredSavedDates: i,
  onExcludeToggle: c,
  onFilterButtonClick: l,
  onRemoveFilterType: m,
  onCancel: d,
  onSave: b,
  onToggleWeekday: M,
  setSavedDatesSearchTerm: x,
  setExcludedSavedDates: W,
  setExcludeFilterTypes: P,
  setActiveFilterView: O,
  summary: g
}) {
  return /* @__PURE__ */ h("div", { className: "mb-4", children: /* @__PURE__ */ T("div", { className: "flex flex-wrap items-center gap-3 mb-3", children: [
    /* @__PURE__ */ T("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ h(
        "input",
        {
          type: "checkbox",
          id: "exclude-checkbox",
          checked: e,
          onChange: (u) => c(u.target.checked),
          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        }
      ),
      /* @__PURE__ */ h("label", { htmlFor: "exclude-checkbox", className: "text-sm text-gray-700", children: e ? "exclude" : "exclude dates from selection" })
    ] }),
    e && /* @__PURE__ */ T(nt, { children: [
      /* @__PURE__ */ T("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ T(
          "button",
          {
            type: "button",
            onClick: () => l("days"),
            className: `flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${r === "days" ? "border-blue-500 bg-[#F7F8FA] text-gray-700" : "border-gray-200 bg-[#F7F8FA] text-gray-600 hover:bg-gray-100"}`,
            children: [
              /* @__PURE__ */ h("span", { children: "Week Days" }),
              /* @__PURE__ */ h(cn, { className: "w-4 h-4 text-gray-400" })
            ]
          }
        ),
        r === "days" && n.includes("days") && /* @__PURE__ */ h("div", { className: "relative", children: /* @__PURE__ */ h("div", { className: "absolute right-0 mt-2 z-20", children: /* @__PURE__ */ h("div", { className: "flex flex-col gap-3 px-2 py-2 bg-white border border-gray-200 rounded-xl shadow-xl", children: /* @__PURE__ */ h("div", { className: "flex justify-center", children: /* @__PURE__ */ h("div", { className: "inline-flex flex-col items-center gap-2 ", children: ho.map((u) => {
          const N = s.includes(
            u.value
          );
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => M(u.value),
              className: `w-9 h-9 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${N ? "bg-[#CEDBF5] shadow-inner" : "text-gray-800 hover:bg-gray-100"}`,
              children: u.label.charAt(0)
            },
            u.value
          );
        }) }) }) }) }) }),
        /* @__PURE__ */ T(
          "button",
          {
            type: "button",
            onClick: () => l("saved-dates"),
            className: `flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${r === "saved-dates" ? "border-blue-500 bg-[#F7F8FA] text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
            children: [
              /* @__PURE__ */ h("span", { children: "Saved Dates" }),
              /* @__PURE__ */ h(cn, { className: "w-4 h-4 text-gray-400" })
            ]
          }
        ),
        e && r === "saved-dates" && n.includes("saved-dates") && /* @__PURE__ */ h("div", { className: "relative", children: /* @__PURE__ */ h("div", { className: "absolute right-0 mt-2 z-20 w-80", children: /* @__PURE__ */ T("div", { className: "flex flex-col gap-3 px-3 py-3 bg-white border border-gray-200 rounded-xl shadow-xl", children: [
          /* @__PURE__ */ T("div", { className: "relative", children: [
            /* @__PURE__ */ h(Br, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: o,
                onChange: (u) => x(u.target.value),
                placeholder: "Search saved dates",
                className: "w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          i.length === 0 ? /* @__PURE__ */ h("p", { className: "text-sm text-gray-500 text-center py-6", children: "No saved dates found" }) : /* @__PURE__ */ h("div", { className: "max-h-64 overflow-y-auto space-y-2 pr-1", children: i.map((u) => {
            const N = a.includes(
              u.id
            ), D = (/* @__PURE__ */ new Date(
              u.selection.startDateUtc + "T00:00:00"
            )).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }), C = (/* @__PURE__ */ new Date(
              u.selection.endDateUtc + "T00:00:00"
            )).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            });
            return /* @__PURE__ */ T(
              "button",
              {
                type: "button",
                onClick: () => {
                  W((Y) => {
                    if (Y.includes(u.id)) {
                      const _ = Y.filter(
                        (j) => j !== u.id
                      );
                      return _.length === 0 && P(
                        (j) => j.filter(
                          (B) => B !== "saved-dates"
                        )
                      ), _;
                    }
                    return P((_) => _.includes("saved-dates") ? _ : [..._, "saved-dates"]), [...Y, u.id];
                  });
                },
                className: `w-full flex items-center justify-between px-3 py-2 rounded-md border text-left transition-colors ${N ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200 hover:bg-gray-50"}`,
                children: [
                  /* @__PURE__ */ T("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ h("span", { className: "text-sm font-medium text-gray-900", children: u.label }),
                    /* @__PURE__ */ T("span", { className: "text-xs text-gray-600", children: [
                      D,
                      " - ",
                      C
                    ] })
                  ] }),
                  /* @__PURE__ */ h("div", { className: "ml-2 flex items-center", children: /* @__PURE__ */ h(
                    "input",
                    {
                      type: "checkbox",
                      checked: N,
                      onChange: () => {
                      },
                      className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                    }
                  ) })
                ]
              },
              u.id
            );
          }) }),
          /* @__PURE__ */ T("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ T("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
              /* @__PURE__ */ h(Yr, { className: "w-4 h-4 text-gray-400" }),
              /* @__PURE__ */ T("span", { children: [
                a.length,
                " selected"
              ] })
            ] }),
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: () => m("saved-dates"),
                className: "text-xs font-medium text-blue-600 hover:text-blue-700",
                children: "Clear"
              }
            )
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ T("div", { className: "flex items-center gap-2 ml-auto", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: () => {
              d(), O(null);
            },
            className: "px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: () => {
              b(), O(null);
            },
            className: "px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors",
            children: "Save"
          }
        )
      ] })
    ] }),
    !e && t && /* @__PURE__ */ T("div", { className: "flex items-center gap-2 text-xs text-gray-600", children: [
      g.weekdaysCount > 0 && /* @__PURE__ */ T("span", { children: [
        "Week Days (",
        g.weekdaysCount,
        ")"
      ] }),
      g.savedDatesCount > 0 && /* @__PURE__ */ T("span", { children: [
        "Saved Dates (",
        g.savedDatesCount,
        ")"
      ] })
    ] })
  ] }) });
}
function yo(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const po = {}, pt = {};
function Ke(e, t) {
  try {
    const r = (po[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in pt ? pt[r] : Sn(r, r.split(":"));
  } catch {
    if (e in pt) return pt[e];
    const n = e?.match(Do);
    return n ? Sn(e, n.slice(1)) : NaN;
  }
}
const Do = /([+-]\d\d):?(\d\d)?/;
function Sn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return pt[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class $e extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ke(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), ar(this), Jt(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new $e(...n, t) : new $e(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new $e(+this, t);
  }
  getTimezoneOffset() {
    const t = -Ke(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Jt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new $e(+new Date(t), this.timeZone);
  }
  //#endregion
}
const On = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!On.test(e)) return;
  const t = e.replace(On, "$1UTC");
  $e.prototype[t] && (e.startsWith("get") ? $e.prototype[e] = function() {
    return this.internal[t]();
  } : ($e.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), bo(this), +this;
  }, $e.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Jt(this), +this;
  }));
});
function Jt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ke(e.timeZone, e) * 60));
}
function bo(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), ar(e);
}
function ar(e) {
  const t = Ke(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = s - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  o && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + o);
  const c = s - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const m = s > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(Ke(e.timeZone, e) * 60)) % 60;
  (d || m) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + m));
  const b = Ke(e.timeZone, e), M = b > 0 ? Math.floor(b) : Math.ceil(b), W = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - M, P = M !== n, O = W - c;
  if (P && O) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + O);
    const g = Ke(e.timeZone, e), u = g > 0 ? Math.floor(g) : Math.ceil(g), N = M - u;
    N && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + N), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + N));
  }
}
class be extends $e {
  //#region static
  static tz(t, ...n) {
    return n.length ? new be(...n, t) : new be(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), s = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + s;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, s] = this.internal.toUTCString().split(" ");
    return `${t?.slice(0, -1)} ${r} ${n} ${s}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, s] = this.tzComponents();
    return `${t} GMT${n}${r}${s} (${yo(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: n?.timeZone || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), s = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, s];
  }
  //#endregion
  withTimeZone(t) {
    return new be(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new be(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Cn = 5, wo = 4;
function xo(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), a = t.addDays(s, Cn * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Cn : wo;
}
function or(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function vo(e, t) {
  const n = or(e, t), r = xo(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Se {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? be.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, a) => this.overrides?.newDate ? this.overrides.newDate(r, s, a) : this.options.timeZone ? new be(r, s, a, this.options.timeZone) : new Date(r, s, a), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : he(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Ue(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : en(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : Qr(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : Vt(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : jn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : rs(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : os(r), a = new Set(s.map((i) => this.getYear(i)));
      if (a.size === s.length)
        return s;
      const o = [];
      return a.forEach((i) => {
        o.push(new Date(i, 0, 1));
      }), o;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : vo(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : is(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : st(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : Qn(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : as(r), this.format = (r, s, a) => {
      const o = this.overrides?.format ? this.overrides.format(r, s, this.options) : na(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(o) : o;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Gn(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ge(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ye(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Xn(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : aa(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : oa(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Rn(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : Xr(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : ia(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : ca(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Gr(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Kr(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : wt(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : xt(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : or(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : bt(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Dt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Ne(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : ge(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : nn(r), this.options = { locale: rn, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let s = 0; s < 10; s++)
      r[s.toString()] = n.format(s);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    const t = this.options.locale?.code;
    return t && Se.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: s } = this.options, a = n?.code;
    if (a && Se.yearFirstLocales.has(a))
      try {
        return new Intl.DateTimeFormat(a, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: s
        }).format(t);
      } catch {
      }
    const o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, o);
  }
}
Se.yearFirstLocales = /* @__PURE__ */ new Set([
  "eu",
  "hu",
  "ja",
  "ja-Hira",
  "ja-JP",
  "ko",
  "ko-KR",
  "lt",
  "lt-LT",
  "lv",
  "lv-LV",
  "mn",
  "mn-MN",
  "zh",
  "zh-CN",
  "zh-HK",
  "zh-TW"
]);
const Ie = new Se();
class ir {
  constructor(t, n, r = Ie) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r;
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class ko {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Mo {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function No(e) {
  return E.createElement("button", { ...e });
}
function So(e) {
  return E.createElement("span", { ...e });
}
function Oo(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    E.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && E.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && E.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && E.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && E.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Co(e) {
  const { day: t, modifiers: n, ...r } = e;
  return E.createElement("td", { ...r });
}
function To(e) {
  const { day: t, modifiers: n, ...r } = e, s = E.useRef(null);
  return E.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), E.createElement("button", { ref: s, ...r });
}
var A;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(A || (A = {}));
var ue;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ue || (ue = {}));
var Ce;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ce || (Ce = {}));
var Me;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Me || (Me = {}));
function Wo(e) {
  const { options: t, className: n, components: r, classNames: s, ...a } = e, o = [s[A.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === a.value);
  return E.createElement(
    "span",
    { "data-disabled": a.disabled, className: s[A.DropdownRoot] },
    E.createElement(r.Select, { className: o, ...a }, t?.map(({ value: c, label: l, disabled: m }) => E.createElement(r.Option, { key: c, value: c, disabled: m }, l))),
    E.createElement(
      "span",
      { className: s[A.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      E.createElement(r.Chevron, { orientation: "down", size: 18, className: s[A.Chevron] })
    )
  );
}
function Yo(e) {
  return E.createElement("div", { ...e });
}
function _o(e) {
  return E.createElement("div", { ...e });
}
function Fo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return E.createElement("div", { ...r }, e.children);
}
function Eo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return E.createElement("div", { ...r });
}
function $o(e) {
  return E.createElement("table", { ...e });
}
function Io(e) {
  return E.createElement("div", { ...e });
}
const cr = wr(void 0);
function kt() {
  const e = xr(cr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Po(e) {
  const { components: t } = kt();
  return E.createElement(t.Dropdown, { ...e });
}
function Uo(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...a } = e, { components: o, classNames: i, labels: { labelPrevious: c, labelNext: l } } = kt(), m = X((b) => {
    s && n?.(b);
  }, [s, n]), d = X((b) => {
    r && t?.(b);
  }, [r, t]);
  return E.createElement(
    "nav",
    { ...a },
    E.createElement(
      o.PreviousMonthButton,
      { type: "button", className: i[A.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      E.createElement(o.Chevron, { disabled: r ? void 0 : !0, className: i[A.Chevron], orientation: "left" })
    ),
    E.createElement(
      o.NextMonthButton,
      { type: "button", className: i[A.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": l(s), onClick: m },
      E.createElement(o.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: i[A.Chevron] })
    )
  );
}
function Ao(e) {
  const { components: t } = kt();
  return E.createElement(t.Button, { ...e });
}
function Bo(e) {
  return E.createElement("option", { ...e });
}
function Ho(e) {
  const { components: t } = kt();
  return E.createElement(t.Button, { ...e });
}
function Ro(e) {
  const { rootRef: t, ...n } = e;
  return E.createElement("div", { ...n, ref: t });
}
function jo(e) {
  return E.createElement("select", { ...e });
}
function qo(e) {
  const { week: t, ...n } = e;
  return E.createElement("tr", { ...n });
}
function Lo(e) {
  return E.createElement("th", { ...e });
}
function zo(e) {
  return E.createElement(
    "thead",
    { "aria-hidden": !0 },
    E.createElement("tr", { ...e })
  );
}
function Zo(e) {
  const { week: t, ...n } = e;
  return E.createElement("th", { ...n });
}
function Qo(e) {
  return E.createElement("th", { ...e });
}
function Go(e) {
  return E.createElement("tbody", { ...e });
}
function Ko(e) {
  const { components: t } = kt();
  return E.createElement(t.Dropdown, { ...e });
}
const Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: No,
  CaptionLabel: So,
  Chevron: Oo,
  Day: Co,
  DayButton: To,
  Dropdown: Wo,
  DropdownNav: Yo,
  Footer: _o,
  Month: Fo,
  MonthCaption: Eo,
  MonthGrid: $o,
  Months: Io,
  MonthsDropdown: Po,
  Nav: Uo,
  NextMonthButton: Ao,
  Option: Bo,
  PreviousMonthButton: Ho,
  Root: Ro,
  Select: jo,
  Week: qo,
  WeekNumber: Zo,
  WeekNumberHeader: Qo,
  Weekday: Lo,
  Weekdays: zo,
  Weeks: Go,
  YearsDropdown: Ko
}, Symbol.toStringTag, { value: "Module" }));
function Ae(e, t, n = !1, r = Ie) {
  let { from: s, to: a } = e;
  const { differenceInCalendarDays: o, isSameDay: i } = r;
  return s && a ? (o(a, s) < 0 && ([s, a] = [a, s]), o(t, s) >= (n ? 1 : 0) && o(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && s ? i(s, t) : !1;
}
function lr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function sn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function dr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function ur(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function fr(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function hr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Be(e, t, n = Ie) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: a, isAfter: o } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return s(e, i);
    if (hr(i, n))
      return i.includes(e);
    if (sn(i))
      return Ae(i, e, !1, n);
    if (fr(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (lr(i)) {
      const c = a(i.before, e), l = a(i.after, e), m = c > 0, d = l < 0;
      return o(i.before, i.after) ? d && m : m || d;
    }
    return dr(i) ? a(e, i.after) > 0 : ur(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Jo(e, t, n, r, s) {
  const { disabled: a, hidden: o, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: m } = t, { isSameDay: d, isSameMonth: b, startOfMonth: M, isBefore: x, endOfMonth: W, isAfter: P } = s, O = n && M(n), g = r && W(r), u = {
    [ue.focused]: [],
    [ue.outside]: [],
    [ue.disabled]: [],
    [ue.hidden]: [],
    [ue.today]: []
  }, N = {};
  for (const D of e) {
    const { date: C, displayMonth: Y } = D, _ = !!(Y && !b(C, Y)), j = !!(O && x(C, O)), B = !!(g && P(C, g)), U = !!(a && Be(C, a, s)), H = !!(o && Be(C, o, s)) || j || B || // Broadcast calendar will show outside days as default
    !l && !c && _ || l && c === !1 && _, L = d(C, m ?? s.today());
    _ && u.outside.push(D), U && u.disabled.push(D), H && u.hidden.push(D), L && u.today.push(D), i && Object.keys(i).forEach((F) => {
      const p = i?.[F];
      p && Be(C, p, s) && (N[F] ? N[F].push(D) : N[F] = [D]);
    });
  }
  return (D) => {
    const C = {
      [ue.focused]: !1,
      [ue.disabled]: !1,
      [ue.hidden]: !1,
      [ue.outside]: !1,
      [ue.today]: !1
    }, Y = {};
    for (const _ in u) {
      const j = u[_];
      C[_] = j.some((B) => B === D);
    }
    for (const _ in N)
      Y[_] = N[_].some((j) => j === D);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...Y
    };
  };
}
function Vo(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [a]) => (n[a] ? s.push(n[a]) : t[ue[a]] ? s.push(t[ue[a]]) : t[Ce[a]] && s.push(t[Ce[a]]), s), [t[A.Day]]);
}
function ei(e) {
  return {
    ...Xo,
    ...e
  };
}
function ti(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function ni() {
  const e = {};
  for (const t in A)
    e[A[t]] = `rdp-${A[t]}`;
  for (const t in ue)
    e[ue[t]] = `rdp-${ue[t]}`;
  for (const t in Ce)
    e[Ce[t]] = `rdp-${Ce[t]}`;
  for (const t in Me)
    e[Me[t]] = `rdp-${Me[t]}`;
  return e;
}
function mr(e, t, n) {
  return (n ?? new Se(t)).formatMonthYear(e);
}
const ri = mr;
function si(e, t, n) {
  return (n ?? new Se(t)).format(e, "d");
}
function ai(e, t = Ie) {
  return t.format(e, "LLLL");
}
function oi(e, t, n) {
  return (n ?? new Se(t)).format(e, "cccccc");
}
function ii(e, t = Ie) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function ci() {
  return "";
}
function gr(e, t = Ie) {
  return t.format(e, "yyyy");
}
const li = gr, di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: mr,
  formatDay: si,
  formatMonthCaption: ri,
  formatMonthDropdown: ai,
  formatWeekNumber: ii,
  formatWeekNumberHeader: ci,
  formatWeekdayName: oi,
  formatYearCaption: li,
  formatYearDropdown: gr
}, Symbol.toStringTag, { value: "Module" }));
function ui(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...di,
    ...e
  };
}
function fi(e, t, n, r, s) {
  const { startOfMonth: a, startOfYear: o, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = s;
  return c({
    start: o(e),
    end: i(e)
  }).map((b) => {
    const M = r.formatMonthDropdown(b, s), x = l(b), W = t && b < a(t) || n && b > a(n) || !1;
    return { value: x, label: M, disabled: W };
  });
}
function hi(e, t = {}, n = {}) {
  let r = { ...t?.[A.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function mi(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let o = 0; o < 7; o++) {
    const i = e.addDays(s, o);
    a.push(i);
  }
  return a;
}
function gi(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: o, eachYearOfInterval: i, getYear: c } = r, l = a(e), m = o(t), d = i({ start: l, end: m });
  return s && d.reverse(), d.map((b) => {
    const M = n.formatYearDropdown(b, r);
    return {
      value: c(b),
      label: M,
      disabled: !1
    };
  });
}
function yr(e, t, n, r) {
  let s = (r ?? new Se(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const yi = yr;
function pr(e, t, n) {
  return (n ?? new Se(t)).formatMonthYear(e);
}
const pi = pr;
function Di(e, t, n, r) {
  let s = (r ?? new Se(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function bi(e) {
  return "Choose the Month";
}
function wi() {
  return "";
}
function xi(e) {
  return "Go to the Next Month";
}
function vi(e) {
  return "Go to the Previous Month";
}
function ki(e, t, n) {
  return (n ?? new Se(t)).format(e, "cccc");
}
function Mi(e, t) {
  return `Week ${e}`;
}
function Ni(e) {
  return "Week Number";
}
function Si(e) {
  return "Choose the Year";
}
const Oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: pi,
  labelDay: yi,
  labelDayButton: yr,
  labelGrid: pr,
  labelGridcell: Di,
  labelMonthDropdown: bi,
  labelNav: wi,
  labelNext: xi,
  labelPrevious: vi,
  labelWeekNumber: Mi,
  labelWeekNumberHeader: Ni,
  labelWeekday: ki,
  labelYearDropdown: Si
}, Symbol.toStringTag, { value: "Module" })), Mt = (e) => e instanceof HTMLElement ? e : null, zt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Ci = (e) => Mt(e.querySelector("[data-animated-month]")), Zt = (e) => Mt(e.querySelector("[data-animated-caption]")), Qt = (e) => Mt(e.querySelector("[data-animated-weeks]")), Ti = (e) => Mt(e.querySelector("[data-animated-nav]")), Wi = (e) => Mt(e.querySelector("[data-animated-weekdays]"));
function Yi(e, t, { classNames: n, months: r, focused: s, dateLib: a }) {
  const o = je(null), i = je(r), c = je(!1);
  vr(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const m = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), b = d ? n[Me.caption_after_enter] : n[Me.caption_before_enter], M = d ? n[Me.weeks_after_enter] : n[Me.weeks_before_enter], x = o.current, W = e.current.cloneNode(!0);
    if (W instanceof HTMLElement ? (zt(W).forEach((u) => {
      if (!(u instanceof HTMLElement))
        return;
      const N = Ci(u);
      N && u.contains(N) && u.removeChild(N);
      const D = Zt(u);
      D && D.classList.remove(b);
      const C = Qt(u);
      C && C.classList.remove(M);
    }), o.current = W) : o.current = null, c.current || m || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const P = x instanceof HTMLElement ? zt(x) : [], O = zt(e.current);
    if (O?.every((g) => g instanceof HTMLElement) && P && P.every((g) => g instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const g = Ti(e.current);
      g && (g.style.zIndex = "1"), O.forEach((u, N) => {
        const D = P[N];
        if (!D)
          return;
        u.style.position = "relative", u.style.overflow = "hidden";
        const C = Zt(u);
        C && C.classList.add(b);
        const Y = Qt(u);
        Y && Y.classList.add(M);
        const _ = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), g && (g.style.zIndex = ""), C && C.classList.remove(b), Y && Y.classList.remove(M), u.style.position = "", u.style.overflow = "", u.contains(D) && u.removeChild(D);
        };
        D.style.pointerEvents = "none", D.style.position = "absolute", D.style.overflow = "hidden", D.setAttribute("aria-hidden", "true");
        const j = Wi(D);
        j && (j.style.opacity = "0");
        const B = Zt(D);
        B && (B.classList.add(d ? n[Me.caption_before_exit] : n[Me.caption_after_exit]), B.addEventListener("animationend", _));
        const U = Qt(D);
        U && U.classList.add(d ? n[Me.weeks_before_exit] : n[Me.weeks_after_exit]), u.insertBefore(D, u.firstChild);
      });
    }
  });
}
function _i(e, t, n, r) {
  const s = e[0], a = e[e.length - 1], { ISOWeek: o, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: m, differenceInCalendarMonths: d, endOfBroadcastWeek: b, endOfISOWeek: M, endOfMonth: x, endOfWeek: W, isAfter: P, startOfBroadcastWeek: O, startOfISOWeek: g, startOfWeek: u } = r, N = c ? O(s, r) : o ? g(s) : u(s), D = c ? b(a) : o ? M(x(a)) : W(x(a)), C = m(D, N), Y = d(a, s) + 1, _ = [];
  for (let U = 0; U <= C; U++) {
    const H = l(N, U);
    if (t && P(H, t))
      break;
    _.push(H);
  }
  const B = (c ? 35 : 42) * Y;
  if (i && _.length < B) {
    const U = B - _.length;
    for (let H = 0; H < U; H++) {
      const L = l(_[_.length - 1], 1);
      _.push(L);
    }
  }
  return _;
}
function Fi(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((a, o) => a.concat(o.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function Ei(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, a = [];
  for (let o = 0; o < s; o++) {
    const i = r.addMonths(e, o);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function Tn(e, t, n, r) {
  const { month: s, defaultMonth: a, today: o = r.today(), numberOfMonths: i = 1 } = e;
  let c = s || a || o;
  const { differenceInCalendarMonths: l, addMonths: m, startOfMonth: d } = r;
  if (n && l(n, c) < i - 1) {
    const b = -1 * (i - 1);
    c = m(n, b);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function $i(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: m, startOfBroadcastWeek: d, startOfISOWeek: b, startOfWeek: M } = r, x = e.reduce((W, P) => {
    const O = n.broadcastCalendar ? d(P, r) : n.ISOWeek ? b(P) : M(P), g = n.broadcastCalendar ? a(P) : n.ISOWeek ? o(i(P)) : c(i(P)), u = t.filter((Y) => Y >= O && Y <= g), N = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && u.length < N) {
      const Y = t.filter((_) => {
        const j = N - u.length;
        return _ > g && _ <= s(g, j);
      });
      u.push(...Y);
    }
    const D = u.reduce((Y, _) => {
      const j = n.ISOWeek ? l(_) : m(_), B = Y.find((H) => H.weekNumber === j), U = new ir(_, P, r);
      return B ? B.days.push(U) : Y.push(new Mo(j, [U])), Y;
    }, []), C = new ko(P, D);
    return W.push(C), W;
  }, []);
  return n.reverseMonths ? x.reverse() : x;
}
function Ii(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: a, startOfMonth: o, endOfMonth: i, addYears: c, endOfYear: l, newDate: m, today: d } = t, { fromYear: b, toYear: M, fromMonth: x, toMonth: W } = e;
  !n && x && (n = x), !n && b && (n = t.newDate(b, 0, 1)), !r && W && (r = W), !r && M && (r = m(M, 11, 31));
  const P = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = o(n) : b ? n = m(b, 0, 1) : !n && P && (n = s(c(e.today ?? d(), -100))), r ? r = i(r) : M ? r = m(M, 11, 31) : !r && P && (r = l(e.today ?? d())), [
    n && a(n),
    r && a(r)
  ];
}
function Pi(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: i, differenceInCalendarMonths: c } = r, l = s ? a : 1, m = o(e);
  if (!t)
    return i(m, l);
  if (!(c(t, e) < a))
    return i(m, l);
}
function Ui(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: a } = n, { startOfMonth: o, addMonths: i, differenceInCalendarMonths: c } = r, l = s ? a ?? 1 : 1, m = o(e);
  if (!t)
    return i(m, -l);
  if (!(c(m, t) <= 0))
    return i(m, -l);
}
function Ai(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Wt(e, t) {
  const [n, r] = ne(e);
  return [t === void 0 ? n : t, r];
}
function Bi(e, t) {
  const [n, r] = Ii(e, t), { startOfMonth: s, endOfMonth: a } = t, o = Tn(e, n, r, t), [i, c] = Wt(
    o,
    // initialMonth is always computed from props.month if provided
    e.month ? o : void 0
  );
  Ee(() => {
    const C = Tn(e, n, r, t);
    c(C);
  }, [e.timeZone]);
  const l = Ei(i, r, e, t), m = _i(l, e.endMonth ? a(e.endMonth) : void 0, e, t), d = $i(l, m, e, t), b = Ai(d), M = Fi(d), x = Ui(i, n, e, t), W = Pi(i, r, e, t), { disableNavigation: P, onMonthChange: O } = e, g = (C) => b.some((Y) => Y.days.some((_) => _.isEqualTo(C))), u = (C) => {
    if (P)
      return;
    let Y = s(C);
    n && Y < s(n) && (Y = s(n)), r && Y > s(r) && (Y = s(r)), c(Y), O?.(Y);
  };
  return {
    months: d,
    weeks: b,
    days: M,
    navStart: n,
    navEnd: r,
    previousMonth: x,
    nextMonth: W,
    goToMonth: u,
    goToDay: (C) => {
      g(C) || u(C.date);
    }
  };
}
var _e;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(_e || (_e = {}));
function Wn(e) {
  return !e[ue.disabled] && !e[ue.hidden] && !e[ue.outside];
}
function Hi(e, t, n, r) {
  let s, a = -1;
  for (const o of e) {
    const i = t(o);
    Wn(i) && (i[ue.focused] && a < _e.FocusedModifier ? (s = o, a = _e.FocusedModifier) : r?.isEqualTo(o) && a < _e.LastFocused ? (s = o, a = _e.LastFocused) : n(o.date) && a < _e.Selected ? (s = o, a = _e.Selected) : i[ue.today] && a < _e.Today && (s = o, a = _e.Today));
  }
  return s || (s = e.find((o) => Wn(t(o)))), s;
}
function Ri(e, t, n, r, s, a, o) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: l, addMonths: m, addWeeks: d, addYears: b, endOfBroadcastWeek: M, endOfISOWeek: x, endOfWeek: W, max: P, min: O, startOfBroadcastWeek: g, startOfISOWeek: u, startOfWeek: N } = o;
  let C = {
    day: l,
    week: d,
    month: m,
    year: b,
    startOfWeek: (Y) => c ? g(Y, o) : i ? u(Y) : N(Y),
    endOfWeek: (Y) => c ? M(Y) : i ? x(Y) : W(Y)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = P([r, C]) : t === "after" && s && (C = O([s, C])), C;
}
function Dr(e, t, n, r, s, a, o, i = 0) {
  if (i > 365)
    return;
  const c = Ri(e, t, n.date, r, s, a, o), l = !!(a.disabled && Be(c, a.disabled, o)), m = !!(a.hidden && Be(c, a.hidden, o)), d = c, b = new ir(c, d, o);
  return !l && !m ? b : Dr(e, t, b, r, s, a, o, i + 1);
}
function ji(e, t, n, r, s) {
  const { autoFocus: a } = e, [o, i] = ne(), c = Hi(t.days, n, r || (() => !1), o), [l, m] = ne(a ? c : void 0);
  return {
    isFocusTarget: (W) => !!c?.isEqualTo(W),
    setFocused: m,
    focused: l,
    blur: () => {
      i(l), m(void 0);
    },
    moveFocus: (W, P) => {
      if (!l)
        return;
      const O = Dr(W, P, l, t.navStart, t.navEnd, e, s);
      O && (e.disableNavigation && !t.days.some((u) => u.isEqualTo(O)) || (t.goToDay(O), m(O)));
    }
  };
}
function qi(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [a, o] = Wt(n, s ? n : void 0), i = s ? n : a, { isSameDay: c } = t, l = (M) => i?.some((x) => c(x, M)) ?? !1, { min: m, max: d } = e;
  return {
    selected: i,
    select: (M, x, W) => {
      let P = [...i ?? []];
      if (l(M)) {
        if (i?.length === m || r && i?.length === 1)
          return;
        P = i?.filter((O) => !c(O, M));
      } else
        i?.length === d ? P = [M] : P = [...P, M];
      return s || o(P), s?.(P, M, x, W), P;
    },
    isSelected: l
  };
}
function Li(e, t, n = 0, r = 0, s = !1, a = Ie) {
  const { from: o, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: m } = a;
  let d;
  if (!o && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (o && !i)
    c(o, e) ? n === 0 ? d = { from: o, to: e } : s ? d = { from: o, to: void 0 } : d = void 0 : m(e, o) ? d = { from: e, to: o } : d = { from: o, to: e };
  else if (o && i)
    if (c(o, e) && c(i, e))
      s ? d = { from: o, to: i } : d = void 0;
    else if (c(o, e))
      d = { from: o, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (m(e, o))
      d = { from: e, to: i };
    else if (l(e, o))
      d = { from: o, to: e };
    else if (l(e, i))
      d = { from: o, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const b = a.differenceInCalendarDays(d.to, d.from);
    r > 0 && b > r ? d = { from: e, to: void 0 } : n > 1 && b < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function zi(e, t, n = Ie) {
  const r = Array.isArray(t) ? t : [t];
  let s = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
  for (let i = 0; i <= o; i++) {
    if (r.includes(s.getDay()))
      return !0;
    s = n.addDays(s, 1);
  }
  return !1;
}
function Yn(e, t, n = Ie) {
  return Ae(e, t.from, !1, n) || Ae(e, t.to, !1, n) || Ae(t, e.from, !1, n) || Ae(t, e.to, !1, n);
}
function Zi(e, t, n = Ie) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ae(e, i, !1, n) : hr(i, n) ? i.some((c) => Ae(e, c, !1, n)) : sn(i) ? i.from && i.to ? Yn(e, { from: i.from, to: i.to }, n) : !1 : fr(i) ? zi(e, i.dayOfWeek, n) : lr(i) ? n.isAfter(i.before, i.after) ? Yn(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Be(e.from, i, n) || Be(e.to, i, n) : dr(i) || ur(i) ? Be(e.from, i, n) || Be(e.to, i, n) : !1))
    return !0;
  const o = r.filter((i) => typeof i == "function");
  if (o.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (o.some((m) => m(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Qi(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: a, onSelect: o } = e, [i, c] = Wt(s, o ? s : void 0), l = o ? s : i;
  return {
    selected: l,
    select: (b, M, x) => {
      const { min: W, max: P } = e, O = b ? Li(b, l, W, P, a, t) : void 0;
      return r && n && O?.from && O.to && Zi({ from: O.from, to: O.to }, n, t) && (O.from = b, O.to = void 0), o || c(O), o?.(O, b, M, x), O;
    },
    isSelected: (b) => l && Ae(l, b, !1, t)
  };
}
function Gi(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [a, o] = Wt(n, s ? n : void 0), i = s ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, b, M) => {
      let x = d;
      return !r && i && i && c(d, i) && (x = void 0), s || o(x), s?.(x, d, b, M), x;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function Ki(e, t) {
  const n = Gi(e, t), r = qi(e, t), s = Qi(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return s;
    default:
      return;
  }
}
function tt(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new be(t.today, t.timeZone)), t.month && (t.month = new be(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new be(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new be(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new be(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new be(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((Q) => new be(Q, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new be(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new be(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: a, locale: o, classNames: i } = Fe(() => {
    const Q = { ...rn, ...t.locale };
    return {
      dateLib: new Se({
        locale: Q,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: ei(t.components),
      formatters: ui(t.formatters),
      labels: { ...Oi, ...t.labels },
      locale: Q,
      classNames: { ...ni(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]), { captionLayout: c, mode: l, navLayout: m, numberOfMonths: d = 1, onDayBlur: b, onDayClick: M, onDayFocus: x, onDayKeyDown: W, onDayMouseEnter: P, onDayMouseLeave: O, onNextClick: g, onPrevClick: u, showWeekNumber: N, styles: D } = t, { formatCaption: C, formatDay: Y, formatMonthDropdown: _, formatWeekNumber: j, formatWeekNumberHeader: B, formatWeekdayName: U, formatYearDropdown: H } = r, L = Bi(t, a), { days: F, months: p, navStart: w, navEnd: S, previousMonth: k, nextMonth: $, goToMonth: I } = L, q = Jo(F, t, w, S, a), { isSelected: G, select: K, selected: ee } = Ki(t, a) ?? {}, { blur: V, focused: te, isFocusTarget: oe, moveFocus: pe, setFocused: ae } = ji(t, L, q, G ?? (() => !1), a), { labelDayButton: ie, labelGridcell: De, labelGrid: ve, labelMonthDropdown: Te, labelNav: Xe, labelPrevious: Le, labelNext: Pe, labelWeekday: We, labelWeekNumber: at, labelWeekNumberHeader: ot, labelYearDropdown: it } = s, ct = Fe(() => mi(a, t.ISOWeek), [a, t.ISOWeek]), Je = l !== void 0 || M !== void 0, ze = X(() => {
    k && (I(k), u?.(k));
  }, [k, I, u]), fe = X(() => {
    $ && (I($), g?.($));
  }, [I, $, g]), lt = X((Q, ce) => (z) => {
    z.preventDefault(), z.stopPropagation(), ae(Q), K?.(Q.date, ce, z), M?.(Q.date, ce, z);
  }, [K, M, ae]), dt = X((Q, ce) => (z) => {
    ae(Q), x?.(Q.date, ce, z);
  }, [x, ae]), ut = X((Q, ce) => (z) => {
    V(), b?.(Q.date, ce, z);
  }, [V, b]), ft = X((Q, ce) => (z) => {
    const f = {
      ArrowLeft: [
        z.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        z.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [z.shiftKey ? "year" : "week", "after"],
      ArrowUp: [z.shiftKey ? "year" : "week", "before"],
      PageUp: [z.shiftKey ? "year" : "month", "before"],
      PageDown: [z.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (f[z.key]) {
      z.preventDefault(), z.stopPropagation();
      const [y, v] = f[z.key];
      pe(y, v);
    }
    W?.(Q.date, ce, z);
  }, [pe, W, t.dir]), ht = X((Q, ce) => (z) => {
    P?.(Q.date, ce, z);
  }, [P]), Ve = X((Q, ce) => (z) => {
    O?.(Q.date, ce, z);
  }, [O]), Yt = X((Q) => (ce) => {
    const z = Number(ce.target.value), f = a.setMonth(a.startOfMonth(Q), z);
    I(f);
  }, [a, I]), _t = X((Q) => (ce) => {
    const z = Number(ce.target.value), f = a.setYear(a.startOfMonth(Q), z);
    I(f);
  }, [a, I]), { className: Ft, style: Oe } = Fe(() => ({
    className: [i[A.Root], t.className].filter(Boolean).join(" "),
    style: { ...D?.[A.Root], ...t.style }
  }), [i, t.className, t.style, D]), Et = ti(t), Nt = je(null);
  Yi(Nt, !!t.animate, {
    classNames: i,
    months: p,
    focused: te,
    dateLib: a
  });
  const $t = {
    dayPickerProps: t,
    selected: ee,
    select: K,
    isSelected: G,
    months: p,
    nextMonth: $,
    previousMonth: k,
    goToMonth: I,
    getModifiers: q,
    components: n,
    classNames: i,
    styles: D,
    labels: s,
    formatters: r
  };
  return E.createElement(
    cr.Provider,
    { value: $t },
    E.createElement(
      n.Root,
      { rootRef: t.animate ? Nt : void 0, className: Ft, style: Oe, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Et },
      E.createElement(
        n.Months,
        { className: i[A.Months], style: D?.[A.Months] },
        !t.hideNavigation && !m && E.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[A.Nav], style: D?.[A.Nav], "aria-label": Xe(), onPreviousClick: ze, onNextClick: fe, previousMonth: k, nextMonth: $ }),
        p.map((Q, ce) => E.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[A.Month],
            style: D?.[A.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ce,
            displayIndex: ce,
            calendarMonth: Q
          },
          m === "around" && !t.hideNavigation && ce === 0 && E.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[A.PreviousMonthButton], tabIndex: k ? void 0 : -1, "aria-disabled": k ? void 0 : !0, "aria-label": Le(k), onClick: ze, "data-animated-button": t.animate ? "true" : void 0 },
            E.createElement(n.Chevron, { disabled: k ? void 0 : !0, className: i[A.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          E.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[A.MonthCaption], style: D?.[A.MonthCaption], calendarMonth: Q, displayIndex: ce }, c?.startsWith("dropdown") ? E.createElement(
            n.DropdownNav,
            { className: i[A.Dropdowns], style: D?.[A.Dropdowns] },
            (() => {
              const z = c === "dropdown" || c === "dropdown-months" ? E.createElement(n.MonthsDropdown, { key: "month", className: i[A.MonthsDropdown], "aria-label": Te(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Yt(Q.date), options: fi(Q.date, w, S, r, a), style: D?.[A.Dropdown], value: a.getMonth(Q.date) }) : E.createElement("span", { key: "month" }, _(Q.date, a)), f = c === "dropdown" || c === "dropdown-years" ? E.createElement(n.YearsDropdown, { key: "year", className: i[A.YearsDropdown], "aria-label": it(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: _t(Q.date), options: gi(w, S, r, a, !!t.reverseYears), style: D?.[A.Dropdown], value: a.getYear(Q.date) }) : E.createElement("span", { key: "year" }, H(Q.date, a));
              return a.getMonthYearOrder() === "year-first" ? [f, z] : [z, f];
            })(),
            E.createElement("span", { role: "status", "aria-live": "polite", style: {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            } }, C(Q.date, a.options, a))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            E.createElement(n.CaptionLabel, { className: i[A.CaptionLabel], role: "status", "aria-live": "polite" }, C(Q.date, a.options, a))
          )),
          m === "around" && !t.hideNavigation && ce === d - 1 && E.createElement(
            n.NextMonthButton,
            { type: "button", className: i[A.NextMonthButton], tabIndex: $ ? void 0 : -1, "aria-disabled": $ ? void 0 : !0, "aria-label": Pe($), onClick: fe, "data-animated-button": t.animate ? "true" : void 0 },
            E.createElement(n.Chevron, { disabled: $ ? void 0 : !0, className: i[A.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ce === d - 1 && m === "after" && !t.hideNavigation && E.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[A.Nav], style: D?.[A.Nav], "aria-label": Xe(), onPreviousClick: ze, onNextClick: fe, previousMonth: k, nextMonth: $ }),
          E.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": ve(Q.date, a.options, a) || void 0, className: i[A.MonthGrid], style: D?.[A.MonthGrid] },
            !t.hideWeekdays && E.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[A.Weekdays], style: D?.[A.Weekdays] },
              N && E.createElement(n.WeekNumberHeader, { "aria-label": ot(a.options), className: i[A.WeekNumberHeader], style: D?.[A.WeekNumberHeader], scope: "col" }, B()),
              ct.map((z) => E.createElement(n.Weekday, { "aria-label": We(z, a.options, a), className: i[A.Weekday], key: String(z), style: D?.[A.Weekday], scope: "col" }, U(z, a.options, a)))
            ),
            E.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[A.Weeks], style: D?.[A.Weeks] }, Q.weeks.map((z) => E.createElement(
              n.Week,
              { className: i[A.Week], key: z.weekNumber, style: D?.[A.Week], week: z },
              N && // biome-ignore lint/a11y/useSemanticElements: react component
              E.createElement(n.WeekNumber, { week: z, style: D?.[A.WeekNumber], "aria-label": at(z.weekNumber, {
                locale: o
              }), className: i[A.WeekNumber], scope: "row", role: "rowheader" }, j(z.weekNumber, a)),
              z.days.map((f) => {
                const { date: y } = f, v = q(f);
                if (v[ue.focused] = !v.hidden && !!te?.isEqualTo(f), v[Ce.selected] = G?.(y) || v.selected, sn(ee)) {
                  const { from: ke, to: Ze } = ee;
                  v[Ce.range_start] = !!(ke && Ze && a.isSameDay(y, ke)), v[Ce.range_end] = !!(ke && Ze && a.isSameDay(y, Ze)), v[Ce.range_middle] = Ae(ee, y, !0, a);
                }
                const Z = hi(v, D, t.modifiersStyles), le = Vo(v, i, t.modifiersClassNames), de = !Je && !v.hidden ? De(y, v, a.options, a) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  E.createElement(n.Day, { key: `${a.format(y, "yyyy-MM-dd")}_${a.format(f.displayMonth, "yyyy-MM")}`, day: f, modifiers: v, className: le.join(" "), style: Z, role: "gridcell", "aria-selected": v.selected || void 0, "aria-label": de, "data-day": a.format(y, "yyyy-MM-dd"), "data-month": f.outside ? a.format(y, "yyyy-MM") : void 0, "data-selected": v.selected || void 0, "data-disabled": v.disabled || void 0, "data-hidden": v.hidden || void 0, "data-outside": f.outside || void 0, "data-focused": v.focused || void 0, "data-today": v.today || void 0 }, !v.hidden && Je ? E.createElement(n.DayButton, { className: i[A.DayButton], style: D?.[A.DayButton], type: "button", day: f, modifiers: v, disabled: v.disabled || void 0, tabIndex: oe(f) ? 0 : -1, "aria-label": ie(y, v, a.options, a), onClick: lt(f, v), onBlur: ut(f, v), onFocus: dt(f, v), onKeyDown: ft(f, v), onMouseEnter: ht(f, v), onMouseLeave: Ve(f, v) }, Y(y, a.options, a)) : !v.hidden && Y(f.date, a.options, a))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      E.createElement(n.Footer, { className: i[A.Footer], style: D?.[A.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const _n = (e) => {
  const t = e?.from ? Ne(e.from) : void 0, n = e?.to ? st(e.to) : void 0;
  return t && n && n.getTime() < t.getTime() ? { from: t, to: st(t) } : { from: t, to: n };
}, Xi = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function Ji({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: s = !1
}) {
  const a = R(Tt()), o = _n(e), i = o.from ? ye(o.from) : ye(a), [c, l] = ne(o), [m, d] = ne(i);
  Ee(() => {
    const g = _n(e);
    l((u) => {
      const N = u.from?.getTime() ?? null, D = u.to?.getTime() ?? null, C = g.from?.getTime() ?? null, Y = g.to?.getTime() ?? null;
      if (N === C && D === Y)
        return u;
      if (g.from) {
        const B = ye(g.from);
        d((U) => U === B || U === B - 1 ? U : B);
      }
      return g;
    });
  }, [e]);
  const b = (g, u) => {
    if (s) return;
    const N = wt(xt(/* @__PURE__ */ new Date(), g), u), D = Ne(N), C = st(N), Y = () => r?.("start"), _ = () => r?.("end");
    if (n === "end") {
      if (!c.from) {
        l({ from: D, to: C }), t({ from: D }), _();
        return;
      }
      const B = c.from, U = c.to ?? st(B);
      let H = B, L = C;
      D.getTime() < B.getTime() && (H = D, L = U);
      const F = { from: H, to: L };
      l(F), t(F), Y();
      return;
    }
    l({ from: D, to: C }), t({ from: D }), _();
  }, M = (g, u) => {
    if (!c.from || !c.to) return !1;
    const N = Ge(c.from), D = ye(c.from), C = Ge(c.to), Y = ye(c.to), _ = g * 12 + u, j = D * 12 + N, B = Y * 12 + C;
    return _ >= j && _ <= B;
  }, x = (g, u) => {
    if (!c.from) return !1;
    const N = Ge(c.from), D = ye(c.from);
    return g === D && u === N;
  }, W = (g, u) => {
    if (!c.to) return !1;
    const N = Ge(c.to), D = ye(c.to);
    return g === D && u === N;
  }, P = (g, u) => !1, O = (g) => /* @__PURE__ */ T("div", { className: "flex-1", children: [
    /* @__PURE__ */ h("div", { className: "text-center font-semibold text-lg mb-4", children: g }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-4 gap-2", children: Xi.map((u, N) => {
      const D = M(g, N), C = x(g, N), Y = W(g, N), _ = C || Y, j = P();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !j && !s && b(g, N),
          disabled: j || s,
          className: `
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${j || s ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : _ ? "bg-[#003DB8] text-white" : D ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: u
        },
        u
      );
    }) })
  ] }, g);
  return /* @__PURE__ */ T("div", { className: "w-full", children: [
    /* @__PURE__ */ T("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !s && d(m - 1),
          disabled: s,
          className: `p-2 rounded-md transition-colors ${s ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h($n, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ T("div", { className: "text-lg font-semibold", children: [
        m,
        " - ",
        m + 1
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !s && d(m + 1),
          disabled: s,
          className: `p-2 rounded-md transition-colors ${s ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(In, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ T("div", { className: "flex gap-8", children: [
      O(m),
      O(m + 1)
    ] })
  ] });
}
const Vi = ["Q1", "Q2", "Q3", "Q4"];
function ec({
  selectedRange: e,
  onSelect: t,
  disabled: n = !1
}) {
  const r = ye(e.from), [s, a] = ne(r);
  R(Tt());
  const o = (b, M) => {
    if (n) return;
    const x = ss(
      Na(xt(/* @__PURE__ */ new Date(), b), M + 1)
    );
    if (!e.from) {
      t({ from: x, to: x });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      x < e.from ? t({ from: x, to: e.from }) : t({ from: e.from, to: x });
      return;
    }
    t({ from: x, to: x });
  }, i = (b, M) => {
    if (!e.from || !e.to) return !1;
    const x = St(e.from) - 1, W = ye(e.from), P = St(e.to) - 1, O = ye(e.to), g = b * 4 + M, u = W * 4 + x, N = O * 4 + P;
    return g >= u && g <= N;
  }, c = (b, M) => {
    if (!e.from) return !1;
    const x = St(e.from) - 1, W = ye(e.from);
    return b === W && M === x;
  }, l = (b, M) => {
    if (!e.to) return !1;
    const x = St(e.to) - 1, W = ye(e.to);
    return b === W && M === x;
  }, m = (b, M) => !1, d = (b) => /* @__PURE__ */ T("div", { className: "flex-1", children: [
    /* @__PURE__ */ h("div", { className: "text-center font-semibold text-lg mb-4", children: b }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3", children: Vi.map((M, x) => {
      const W = i(b, x), P = c(b, x), O = l(b, x), g = P || O, u = m();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !u && !n && o(b, x),
          disabled: u || n,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${u || n ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : g ? "bg-blue-600 text-white" : W ? "bg-blue-100 text-blue-900" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: M
        },
        M
      );
    }) })
  ] }, b);
  return /* @__PURE__ */ T("div", { className: "w-full", children: [
    /* @__PURE__ */ T("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !n && a(s - 1),
          disabled: n,
          className: `p-2 rounded-md transition-colors ${n ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h($n, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ T("div", { className: "text-lg font-semibold", children: [
        s,
        " - ",
        s + 1
      ] }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !n && a(s + 1),
          disabled: n,
          className: `p-2 rounded-md transition-colors ${n ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(In, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ T("div", { className: "flex gap-8", children: [
      d(s),
      d(s + 1)
    ] })
  ] });
}
function tc({
  unit: e,
  excludeEnabled: t,
  selectedRange: n,
  displayedMonth: r,
  setDisplayedMonth: s,
  dayPickerModifiers: a,
  dayPickerDisabledMatcher: o,
  monthsViewIndex: i,
  setMonthsViewIndex: c,
  monthsViewYear: l,
  setMonthsViewYear: m,
  yearsViewIndex: d,
  setYearsViewIndex: b,
  yearsViewDecade: M,
  setYearsViewDecade: x,
  handleCalendarSelect: W,
  handleResetCalendarSelect: P,
  handleWeekCalendarSelect: O,
  monthQuarterRange: g,
  activeDateField: u,
  setActiveDateField: N,
  onMonthSelect: D,
  onYearSelect: C,
  todayDateObj: Y
}) {
  const _ = je(null), j = je(null);
  Ee(() => {
    if (e !== "day") return;
    const H = (p, w) => {
      const S = p.querySelector(
        "span[data-month-name]"
      ), k = p.querySelector(
        "span[data-year-name]"
      );
      if (S) {
        const K = p.textContent || "";
        p.style.gap = "6px";
        let ee = "";
        if (k)
          ee = k.textContent || "";
        else {
          const V = K.match(/\d{4}/);
          V && (ee = V[0]);
        }
        if (!k && ee) {
          const V = document.createElement("span");
          V.textContent = ee, V.setAttribute("data-year-name", "true"), V.style.cursor = "pointer", V.onclick = (oe) => {
            oe.stopPropagation(), oe.preventDefault();
            const pe = parseInt(ee, 10);
            if (!isNaN(pe)) {
              const ae = Math.floor(pe / 10) * 10;
              x(ae), b(w), c(null);
            }
          };
          const te = S.nextSibling;
          if (te && te.nodeType === Node.TEXT_NODE)
            te.parentNode?.insertBefore(V, te.nextSibling);
          else {
            const oe = document.createTextNode(" ");
            p.appendChild(oe), p.appendChild(V);
          }
        } else k && (k.onclick = (V) => {
          V.stopPropagation(), V.preventDefault();
          const te = parseInt(ee, 10);
          if (!isNaN(te)) {
            const oe = Math.floor(te / 10) * 10;
            x(oe), b(w), c(null);
          }
        });
        S.onclick = (V) => {
          V.stopPropagation(), V.preventDefault();
          const te = parseInt(
            (k?.textContent || "").trim() || K,
            10
          );
          isNaN(te) || (m(te), c(w), b(null));
        };
        return;
      }
      const $ = p.textContent || "", I = $.trim().split(/\s+/);
      let q = "", G = "";
      if (I.length >= 2)
        q = I[0], G = I[1];
      else if (I.length === 1) {
        const K = $.match(/^([A-Za-z]+)(\d{4})$/);
        if (K)
          q = K[1], G = K[2];
        else
          return;
      } else
        return;
      if (q && G) {
        const K = p.firstChild;
        if (p.style.gap = "6px", K && K.nodeType === Node.TEXT_NODE && (K.textContent || "").indexOf(q) !== -1) {
          const te = document.createElement("span");
          te.textContent = q, te.setAttribute("data-month-name", "true"), te.style.cursor = "pointer", te.onclick = (ae) => {
            ae.stopPropagation(), ae.preventDefault();
            const ie = parseInt(G, 10);
            isNaN(ie) || (m(ie), c(w), b(null));
          };
          const oe = document.createElement("span");
          oe.textContent = G, oe.setAttribute("data-year-name", "true"), oe.style.cursor = "pointer", oe.onclick = (ae) => {
            ae.stopPropagation(), ae.preventDefault();
            const ie = parseInt(G, 10);
            if (!isNaN(ie)) {
              const De = Math.floor(ie / 10) * 10;
              x(De), b(w), c(null);
            }
          }, p.innerHTML = "", p.appendChild(te);
          const pe = document.createTextNode(" ");
          p.appendChild(pe), p.appendChild(oe);
        }
      }
    }, L = (p, w) => {
      if (!p) return;
      p.querySelectorAll(".rdp-caption_label").forEach((k, $) => {
        const I = k, q = w !== null ? w : $ === 0 ? 0 : 1;
        i === q || d === q || H(I, q);
      });
    }, F = setTimeout(() => {
      i === null && d === null ? L(_.current, null) : (L(_.current, 0), L(j.current, 1));
    }, 150);
    return () => clearTimeout(F);
  }, [
    e,
    r,
    i,
    d,
    c,
    m,
    x,
    b
  ]);
  const B = (H) => {
    const L = H - 1, F = H + 10, p = ye(r), w = [];
    for (let S = L; S <= F; S++)
      w.push(S);
    return /* @__PURE__ */ T("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ T("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => x(M - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ h("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ T("div", { className: "text-lg font-semibold", children: [
          H,
          "-",
          H + 9
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => x(M + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ h("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: w.map((S) => {
        const k = !Xt, $ = S < H || S > H + 9;
        return /* @__PURE__ */ h(
          "button",
          {
            onClick: () => C(S),
            disabled: k,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${$ ? "opacity-50 bg-gray-50 text-gray-500" : p === S ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: S
          },
          S
        );
      }) })
    ] });
  }, U = (H) => /* @__PURE__ */ T("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ T("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => m(l - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ h("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-lg font-semibold", children: H }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => m(l + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ h("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: mo.map((L, F) => {
      const p = !Xt, w = ye(r) === H && Ge(r) === F;
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => D(H, F),
          disabled: p,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${w ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: L
        },
        L
      );
    }) })
  ] });
  return /* @__PURE__ */ T("div", { className: "flex gap-4 justify-center mb-4", children: [
    e === "day" && /* @__PURE__ */ h(
      "div",
      {
        className: `flex gap-4 ${t ? "excluded-enabled" : "excluded-disabled"}`,
        children: d !== null ? d === 0 ? /* @__PURE__ */ T(nt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: B(M)
            }
          ),
          /* @__PURE__ */ h("div", { ref: j, children: /* @__PURE__ */ h(
            tt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: W,
              modifiers: a,
              month: Ne(Ue(r, 1)),
              onMonthChange: (H) => {
                const L = new Date(r), p = new Date(H).getMonth() - L.getMonth();
                p !== 1 && p !== -11 && s(Ne(Ue(H, -1)));
              },
              numberOfMonths: 1,
              disabled: o,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: {
                chevron: "fill-black"
              }
            }
          ) })
        ] }) : /* @__PURE__ */ T(nt, { children: [
          /* @__PURE__ */ h("div", { ref: _, children: /* @__PURE__ */ h(
            tt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: W,
              modifiers: a,
              month: r,
              onMonthChange: s,
              numberOfMonths: 1,
              disabled: o,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: {
                chevron: "fill-black"
              }
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: B(M)
            }
          )
        ] }) : i === null ? /* @__PURE__ */ h("div", { ref: _, children: /* @__PURE__ */ h(
          tt,
          {
            mode: "range",
            navLayout: "around",
            selected: n,
            onSelect: (H, L) => {
              P(H, L);
            },
            modifiers: a,
            month: r,
            onMonthChange: s,
            numberOfMonths: 2,
            disabled: o,
            modifiersClassNames: {
              selected: "rdp-day_selected",
              disabled: "rdp-day_disabled text-black",
              excludedWeekday: "rdp-day_excluded-weekday",
              "excluded-saved-date": "rdp-day_excluded-saved-date"
            },
            classNames: {
              chevron: "fill-black"
            },
            styles: {
              month_grid: {
                borderCollapse: "separate",
                borderSpacing: "0 0.40rem"
              },
              cell: {
                padding: "0.25rem 0",
                backgroundClip: "content-box"
              }
            }
          }
        ) }) : i === 0 ? /* @__PURE__ */ T(nt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: U(l)
            }
          ),
          /* @__PURE__ */ h("div", { ref: j, children: /* @__PURE__ */ h(
            tt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: W,
              modifiers: a,
              month: Ne(Ue(r, 1)),
              onMonthChange: (H) => {
                const L = new Date(r), p = new Date(H).getMonth() - L.getMonth();
                p !== 1 && p !== -11 && s(Ne(Ue(H, -1)));
              },
              numberOfMonths: 1,
              disabled: o,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: {
                chevron: "fill-black"
              }
            }
          ) })
        ] }) : /* @__PURE__ */ T(nt, { children: [
          /* @__PURE__ */ h("div", { ref: _, children: /* @__PURE__ */ h(
            tt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: W,
              modifiers: a,
              month: r,
              onMonthChange: s,
              numberOfMonths: 1,
              disabled: o,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: {
                chevron: "fill-black"
              }
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: U(l)
            }
          )
        ] })
      }
    ),
    e === "week" && /* @__PURE__ */ h(
      tt,
      {
        mode: "range",
        navLayout: "around",
        showWeekNumber: !0,
        locale: void 0,
        formatters: {
          formatWeekNumber: (H) => `W${String(H).padStart(2, "0")}`
        },
        selected: n,
        onSelect: (H, L) => {
          O(H, L);
        },
        modifiers: a,
        onWeekNumberClick: (H, L) => {
          L && L.length > 0 && O(
            {
              from: L[0],
              to: L[L.length - 1]
            },
            L[0]
          );
        },
        month: r,
        onMonthChange: s,
        numberOfMonths: 2,
        disabled: (H) => o(H),
        modifiersClassNames: {
          selected: "rdp-day_selected bg-[#003DB8]",
          disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
          excludedWeekday: "rdp-day_excluded-weekday",
          "excluded-saved-date": "rdp-day_excluded-saved-date"
        },
        classNames: {
          chevron: "fill-black"
        },
        styles: {
          month_grid: {
            borderCollapse: "separate",
            borderSpacing: "0 0.40rem"
          },
          cell: {
            padding: "0.25rem 0",
            backgroundClip: "content-box"
          }
        }
      }
    ),
    e === "month" && /* @__PURE__ */ h(
      Ji,
      {
        selectedRange: g,
        onSelect: W,
        activeDateField: u,
        onActiveFieldChange: N,
        disabled: t
      }
    ),
    e === "quarter" && /* @__PURE__ */ h(
      ec,
      {
        selectedRange: g,
        onSelect: W,
        disabled: t
      }
    )
  ] });
}
function nc({
  excludeEnabled: e,
  hasEmptyDates: t,
  hasFutureDates: n,
  onToday: r,
  onClear: s,
  onCancel: a,
  onApply: o
}) {
  return /* @__PURE__ */ T("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
    /* @__PURE__ */ h(
      "button",
      {
        onClick: r,
        disabled: e,
        className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${e ? "text-blue-300 cursor-not-allowed bg-transparent" : "text-blue-600 hover:bg-blue-50"}`,
        children: "Today"
      }
    ),
    /* @__PURE__ */ T("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          disabled: e,
          className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-gray-600 hover:bg-gray-100"}`,
          children: "Clear dates"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: a,
          disabled: e,
          className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-gray-600 hover:bg-gray-100"}`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: o,
          disabled: !!(e || t || n),
          className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${e || t || n ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
          children: "Apply"
        }
      )
    ] })
  ] });
}
function rc({
  initialSelection: e,
  onApply: t
}) {
  const n = Tt(), r = (e?.excludeFilterTypes || []).filter(
    (f) => f === "days" || f === "saved-dates"
  ), [s, a] = ne(
    e?.unit || "day"
  ), [o, i] = ne(
    e?.startDateUtc || n
  ), [c, l] = ne(
    e?.endDateUtc || n
  ), [m, d] = ne(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [b, M] = ne(e?.duration || 1), [x, W] = ne(
    e?.excludedWeekdays || []
  ), [P, O] = ne(
    e?.excludedSpecificDates || []
  ), [g, u] = ne(!1), [N, D] = ne(r), [C, Y] = ne(null), [_, j] = ne(
    e?.excludedSavedDates || []
  ), [B, U] = ne(""), [H, L] = ne(e?.excludedDateRanges || []), [F, p] = ne(() => e?.excludeEnabled ? !0 : !!(r.length > 0 || e?.excludedWeekdays && e.excludedWeekdays.length > 0 || e?.excludedSavedDates && e.excludedSavedDates.length > 0)), w = je({
    excludeFilterTypes: r,
    excludedWeekdays: e?.excludedWeekdays || [],
    excludedSpecificDates: e?.excludedSpecificDates || [],
    excludedSavedDates: e?.excludedSavedDates || [],
    excludedDateRanges: e?.excludedDateRanges || []
  }), [S, k] = ne([]), [$, I] = ne(() => e?.startDateUtc ? Ne(R(e.startDateUtc)) : Ne(R(n))), [q, G] = ne(null), [K, ee] = ne(() => e?.startDateUtc ? ye(R(e.startDateUtc)) : ye(R(n))), [V, te] = ne(null), [oe, pe] = ne(() => {
    if (e?.startDateUtc) {
      const y = ye(R(e.startDateUtc));
      return Math.floor(y / 10) * 10;
    }
    const f = ye(R(n));
    return Math.floor(f / 10) * 10;
  });
  Ee(() => {
    if (o && c) {
      const f = rr(
        o,
        c,
        s,
        x
      );
      M(f);
    } else
      M(1);
  }, [o, c, s, x]), Ee(() => {
    (async () => {
      await rt.init();
      const y = await rt.getData(
        "savedDateRanges"
      );
      y && k(y);
    })();
  }, []), Ee(() => {
    o && !c ? d("end") : !o && c && d("start");
  }, [o, c]), Ee(() => {
    q === null && ee(ye($));
  }, [$, q]), Ee(() => {
    C !== "saved-dates" && U("");
  }, [C]);
  const ae = X(
    (f) => {
      if (_.length === 0) return !1;
      const y = re(f);
      return _.some((v) => {
        const Z = S.find((de) => de.id === v);
        return !Z || !(y >= Z.selection.startDateUtc && y <= Z.selection.endDateUtc) ? !1 : (Z.selection.excludedWeekdays && Z.selection.excludedWeekdays.length > 0 && Z.selection.excludedWeekdays.includes(f.getDay()) || Z.selection.excludedSpecificDates && Z.selection.excludedSpecificDates.length > 0 && Z.selection.excludedSpecificDates.includes(y) || Z.selection.excludedSavedDates && Z.selection.excludedSavedDates.some(
          (ke) => {
            const Ze = S.find(
              (br) => br.id === ke
            );
            return Ze ? y >= Ze.selection.startDateUtc && y <= Ze.selection.endDateUtc : !1;
          }
        ) || Z.selection.excludedDateRanges && Z.selection.excludedDateRanges.some(
          (ke) => y >= ke.start && y <= ke.end
        ), !0);
      });
    },
    [_, S]
  ), ie = Fe(() => {
    const f = {};
    return x.length > 0 && (f.excludedWeekday = {
      dayOfWeek: x
    }), _.length > 0 && (f["excluded-saved-date"] = ae), f;
  }, [_, x, ae]), De = Fe(
    () => ({
      from: o ? R(o) : void 0,
      to: c ? R(c) : void 0
    }),
    [o, c]
  ), ve = Fe(() => R(n), [n]), Te = Fe(
    () => ({
      from: o ? R(o) : ve,
      to: c ? R(c) : ve
    }),
    [c, o, ve]
  ), Xe = Fe(() => {
    const f = B.trim().toLowerCase();
    return f ? S.filter((y) => {
      const v = (/* @__PURE__ */ new Date(y.selection.startDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase(), Z = (/* @__PURE__ */ new Date(y.selection.endDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase();
      return y.label.toLowerCase().includes(f) || `${v} - ${Z}`.includes(f);
    }) : S;
  }, [S, B]), Le = Fe(
    () => !o || o.trim() === "" || !c || c.trim() === "",
    [c, o]
  ), Pe = Fe(() => !1, [c, o, n]), We = X(
    (f) => f.filter(
      (y) => y === "days" || y === "saved-dates"
    ),
    []
  ), at = X(
    (f) => {
      if (f) {
        u(!0);
        const y = w.current, v = We(
          y.excludeFilterTypes
        );
        D([...v]), W([...y.excludedWeekdays]), O([...y.excludedSpecificDates]), j([...y.excludedSavedDates]), L([...y.excludedDateRanges]);
        const Z = v.find(
          (le) => le === "days" || le === "saved-dates"
        );
        Y(
          Z ?? null
        );
      } else {
        const y = w.current, v = We(
          y.excludeFilterTypes
        );
        D([...v]), W([...y.excludedWeekdays]), O([...y.excludedSpecificDates]), j([...y.excludedSavedDates]), L([...y.excludedDateRanges]), p(
          v.length > 0 || y.excludedWeekdays.length > 0 || y.excludedSavedDates.length > 0
        ), u(!1), Y(null);
      }
    },
    [We]
  ), ot = X(
    (f) => {
      g && (N.includes(f) || D([...N, f]), Y((y) => y === f ? null : f));
    },
    [g, N]
  ), it = X(
    (f) => {
      if (!g) return;
      const y = N.filter((v) => v !== f);
      if (D(y), f === "days" && W([]), f === "saved-dates" && j([]), C === f) {
        const v = y.find(
          (Z) => Z === "days" || Z === "saved-dates"
        );
        Y(
          v ?? null
        );
      }
    },
    [C, g, N]
  ), ct = X(() => {
    const f = w.current, y = We(
      f.excludeFilterTypes
    );
    D([...y]), W([...f.excludedWeekdays]), O([...f.excludedSpecificDates]), j([...f.excludedSavedDates]), L([...f.excludedDateRanges]), p(
      y.length > 0 || f.excludedWeekdays.length > 0 || f.excludedSavedDates.length > 0
    ), u(!1), Y(null);
  }, [We]), Je = X(() => {
    const f = x.length > 0, y = _.length > 0, v = [];
    f && v.push("days"), y && v.push("saved-dates");
    const Z = f ? [...x] : [], le = [], de = y ? [..._] : [], ke = [];
    w.current = {
      excludeFilterTypes: v,
      excludedWeekdays: Z,
      excludedSpecificDates: le,
      excludedSavedDates: de,
      excludedDateRanges: ke
    }, D(v), W(Z), O(le), j(de), L(ke), p(v.length > 0), u(!1), Y(null);
  }, [_, x]), ze = X(
    (f) => {
      W((y) => y.includes(f) ? y.filter((v) => v !== f) : [...y, f]), g && D((y) => y.includes("days") ? y : [...y, "days"]);
    },
    [g]
  ), fe = X((f) => {
    f && I(Ne(R(f)));
  }, []), lt = X(
    (f) => {
      g || (i(f), f ? c || d("end") : d("start"), f && c && R(f) > R(c) && l(f), fe(f));
    },
    [c, g, fe]
  ), dt = X(
    (f) => {
      g || (l(f), f ? o || d("start") : d("end"), f && o && R(f) < R(o) && i(f), fe(f));
    },
    [g, o, fe]
  ), ut = X(
    (f) => {
      if (!(g || f <= 0)) {
        if (M(f), o) {
          const y = Ga(
            o,
            s,
            f,
            x
          );
          l(y), fe(y);
        } else if (c) {
          const y = Ka(
            c,
            s,
            f,
            x
          );
          i(y), fe(y);
        }
        d("start");
      }
    },
    [
      c,
      g,
      x,
      o,
      s,
      fe
    ]
  ), ft = X(
    (f) => {
      g || a(f);
    },
    [g]
  ), ht = X(
    (f, y) => {
      g || (i(f), l(y), d("start"), fe(f));
    },
    [g, fe]
  ), Ve = X(
    (f) => {
      if (g) return;
      i(f.startDateUtc), l(f.endDateUtc), a(f.unit);
      const y = f.excludedWeekdays || [];
      W(y), M(f.duration), d("start");
      const v = (f.excludeFilterTypes || []).filter(
        (ke) => ke === "days" || ke === "saved-dates"
      ), Z = f.excludedSpecificDates || [], le = f.excludedSavedDates || [], de = f.excludedDateRanges || [];
      D(v), O(Z), j(le), L(de), w.current = {
        excludeFilterTypes: v,
        excludedWeekdays: y,
        excludedSpecificDates: Z,
        excludedSavedDates: le,
        excludedDateRanges: de
      }, p(
        v.length > 0 || y.length > 0 || le.length > 0
      ), u(!1), Y(null), f.startDateUtc && fe(f.startDateUtc);
    },
    [g, fe]
  ), Yt = X(() => {
    g || (i(n), l(n), W([]), d("start"), fe(n));
  }, [g, n, fe]), _t = X(() => {
    g || (i(""), l(""), M(1), a("day"), W([]), d("start"), u(!1), D([]), O([]), j([]), L([]), Y(null), w.current = {
      excludeFilterTypes: [],
      excludedWeekdays: [],
      excludedSpecificDates: [],
      excludedSavedDates: [],
      excludedDateRanges: []
    }, p(!1), fe(n));
  }, [g, n, fe]), Ft = X(() => {
    if (g || Le || Pe) return;
    const f = sr(
      o,
      c,
      s,
      x,
      F,
      N,
      P,
      _,
      H
    );
    t(f);
  }, [
    c,
    F,
    g,
    N,
    H,
    _,
    P,
    x,
    Le,
    Pe,
    t,
    o,
    s
  ]), Oe = X(
    (f) => {
      if (!g && f?.from) {
        const y = re(f.from);
        if (i(y), f?.to) {
          const v = re(f.to);
          l(v), d("start");
        } else
          l(y), d("end");
      }
    },
    [g]
  ), Et = X(
    (f, y) => {
      if (!g) {
        if (o && c && f?.to) {
          const v = re(y);
          m === "start" ? R(c).getTime() > R(v).getTime() ? i(v) : (i(v), l("")) : R(o).getTime() > R(v).getTime() ? (l(o), i(v)) : (l(v), i(o)), d(m === "start" ? "end" : "start");
          return;
        }
        if (!o && c && f?.from) {
          l(re(f?.from)), d("start");
          return;
        }
        if (!o && !c && f?.from) {
          i(re(f?.from)), l(""), d("end");
          return;
        }
        if (f?.from) {
          const v = re(f.from);
          if (i(v), f?.to) {
            const Z = re(f.to);
            l(Z), d("start");
          } else
            l(v), d("end");
        }
      }
    },
    [m, c, g, o]
  ), Nt = X(
    (f, y) => {
      if (!(g || !f) && f.from) {
        let v = ge(f.from, {
          weekStartsOn: we
        }), Z = he(v, 6);
        if (o && c)
          if (m === "start")
            if (R(re(y)).getTime() > R(c).getTime() && R(re(y)).getTime() > R(o).getTime())
              v = ge(y, {
                weekStartsOn: we
              }), Z = he(v, 6), Oe({ from: v, to: Z });
            else if (R(re(y)).getTime() < R(c).getTime() && R(re(y)).getTime() < R(o).getTime()) {
              v = ge(y, {
                weekStartsOn: we
              }), Z = he(v, 6);
              const le = ge(c, {
                weekStartsOn: we
              }), de = he(le, 6);
              Oe({ from: v, to: de });
            } else if (R(re(y)).getTime() > R(o).getTime() && R(re(y)).getTime() < R(c).getTime()) {
              v = ge(y, {
                weekStartsOn: we
              }), Z = he(v, 6);
              const le = ge(c, {
                weekStartsOn: we
              }), de = he(le, 6);
              Oe({ from: v, to: de });
            } else
              v = ge(y, {
                weekStartsOn: we
              }), Z = he(y, 6), Oe({ from: v, to: Z });
          else if (R(re(y)).getTime() > R(c).getTime()) {
            v = ge(f.from, {
              weekStartsOn: we
            }), Z = he(v, 6);
            const le = ge(y, {
              weekStartsOn: we
            }), de = he(le, 6);
            Oe({ from: v, to: de });
          } else if (R(re(y)).getTime() < R(c).getTime() && R(re(y)).getTime() < R(o).getTime()) {
            v = ge(y, {
              weekStartsOn: we
            }), Z = he(v, 6);
            const le = ge(o, {
              weekStartsOn: we
            }), de = he(le, 6);
            Oe({ from: v, to: de });
          } else {
            v = ge(o, {
              weekStartsOn: we
            }), Z = he(v, 6);
            const le = ge(y, {
              weekStartsOn: we
            }), de = he(le, 6);
            Oe({ from: v, to: de });
          }
        if (f.to && (!o || !c)) {
          const le = ge(f.to, {
            weekStartsOn: we
          }), de = he(le, 6);
          Oe({ from: v, to: de });
        }
        d(m === "start" ? "end" : "start");
      }
    },
    [
      m,
      c,
      g,
      Oe,
      o
    ]
  ), $t = X(
    (f) => {
      if (g) return !0;
      re(f);
      const y = !Xt, v = g && N.includes("days") && x.includes(f.getDay()), Z = g && N.includes("saved-dates") && ae(f);
      return y || v || Z;
    },
    [
      g,
      N,
      x,
      ae,
      n
    ]
  ), Q = X(() => {
    if (!Pe) return null;
    const f = o && o > n, y = c && c > n;
    return f && y ? "Start date and end date cannot be in the future." : f ? "Start date cannot be in the future." : y ? "End date cannot be in the future." : null;
  }, [c, Pe, o, n]), ce = X((f, y) => {
    const v = Ne(
      wt(xt(/* @__PURE__ */ new Date(), f), y)
    );
    I(v), G(null), ee(f);
  }, []), z = X(
    (f) => {
      const y = Ge($), v = Ne(
        wt(xt(/* @__PURE__ */ new Date(), f), y)
      );
      I(v), te(null), pe(Math.floor(f / 10) * 10);
    },
    [$]
  );
  return {
    today: n,
    unit: s,
    startDateUtc: o,
    endDateUtc: c,
    activeDateField: m,
    duration: b,
    excludedWeekdays: x,
    excludedSpecificDates: P,
    excludeEnabled: g,
    excludeFilterTypes: N,
    activeFilterView: C,
    excludedSavedDates: _,
    savedDatesSearchTerm: B,
    excludedDateRanges: H,
    savedDatesForFilter: S,
    displayedMonth: $,
    monthsViewIndex: q,
    monthsViewYear: K,
    yearsViewIndex: V,
    yearsViewDecade: oe,
    excludeApplied: F,
    hasFutureDates: Pe,
    hasEmptyDates: Le,
    dayPickerModifiers: ie,
    selectedRange: De,
    todayDateObj: ve,
    monthQuarterRange: Te,
    filteredSavedDates: Xe,
    dayPickerDisabledMatcher: $t,
    getFutureDateWarning: Q,
    setActiveDateField: d,
    setSavedDatesSearchTerm: U,
    setMonthsViewIndex: G,
    setYearsViewIndex: te,
    setYearsViewDecade: pe,
    setMonthsViewYear: ee,
    setDisplayedMonth: I,
    handleStartDateChange: lt,
    handleEndDateChange: dt,
    handleDurationChange: ut,
    handleUnitChange: ft,
    handlePresetSelect: ht,
    handleSavedDateSelect: Ve,
    handleToday: Yt,
    handleClear: _t,
    handleApply: Ft,
    handleCalendarSelect: Oe,
    handleResetCalendarSelect: Et,
    handleWeekCalendarSelect: Nt,
    handleExcludeToggle: at,
    handleExcludeFilterButtonClick: ot,
    handleExcludeRemoveType: it,
    handleExcludeCancel: ct,
    handleExcludeSave: Je,
    toggleWeekday: ze,
    setExcludedSavedDates: j,
    setExcludeFilterTypes: D,
    setActiveFilterView: Y,
    excludeSavedStateRef: w,
    sanitizeExcludeFilterTypes: We,
    handleMonthSelect: ce,
    handleYearSelect: z
  };
}
function hc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const {
    unit: s,
    startDateUtc: a,
    endDateUtc: o,
    activeDateField: i,
    duration: c,
    excludedWeekdays: l,
    excludedSpecificDates: m,
    excludeEnabled: d,
    excludeFilterTypes: b,
    activeFilterView: M,
    excludedSavedDates: x,
    savedDatesSearchTerm: W,
    excludedDateRanges: P,
    displayedMonth: O,
    monthsViewIndex: g,
    monthsViewYear: u,
    yearsViewIndex: N,
    yearsViewDecade: D,
    excludeApplied: C,
    hasFutureDates: Y,
    hasEmptyDates: _,
    dayPickerModifiers: j,
    selectedRange: B,
    todayDateObj: U,
    monthQuarterRange: H,
    filteredSavedDates: L,
    dayPickerDisabledMatcher: F,
    getFutureDateWarning: p,
    setActiveDateField: w,
    setSavedDatesSearchTerm: S,
    setMonthsViewIndex: k,
    setYearsViewIndex: $,
    setYearsViewDecade: I,
    setMonthsViewYear: q,
    setDisplayedMonth: G,
    handleStartDateChange: K,
    handleEndDateChange: ee,
    handleDurationChange: V,
    handleUnitChange: te,
    handlePresetSelect: oe,
    handleSavedDateSelect: pe,
    handleToday: ae,
    handleClear: ie,
    handleApply: De,
    handleCalendarSelect: ve,
    handleResetCalendarSelect: Te,
    handleWeekCalendarSelect: Xe,
    handleExcludeToggle: Le,
    handleExcludeFilterButtonClick: Pe,
    handleExcludeRemoveType: We,
    handleExcludeCancel: at,
    handleExcludeSave: ot,
    toggleWeekday: it,
    setExcludedSavedDates: ct,
    setExcludeFilterTypes: Je,
    setActiveFilterView: ze,
    excludeSavedStateRef: fe,
    handleMonthSelect: lt,
    handleYearSelect: dt
  } = rc({
    initialSelection: e,
    onApply: t
  }), ut = {
    height: qt,
    minHeight: qt,
    maxHeight: qt,
    width: Lt,
    minWidth: Lt,
    maxWidth: Lt,
    overflow: "hidden",
    ...r
  }, ft = sr(
    a,
    o,
    s,
    l,
    C,
    b,
    m,
    x,
    P
  ), ht = {
    weekdaysCount: fe.current.excludedWeekdays.length,
    savedDatesCount: fe.current.excludedSavedDates.length
  }, Ve = p();
  return /* @__PURE__ */ T(
    "div",
    {
      className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200",
      style: ut,
      children: [
        /* @__PURE__ */ h(
          ro,
          {
            onPresetSelect: oe,
            onSavedDateSelect: pe,
            currentSelection: ft,
            themeColors: r,
            disabled: d
          }
        ),
        /* @__PURE__ */ T("div", { className: "flex-1 flex flex-col min-h-0", children: [
          /* @__PURE__ */ T("div", { className: "px-6 pt-6 overflow-y-auto flex-1", children: [
            /* @__PURE__ */ h(
              fo,
              {
                unit: s,
                excludeEnabled: d,
                onUnitChange: te
              }
            ),
            /* @__PURE__ */ h(
              lo,
              {
                startDateUtc: a,
                endDateUtc: o,
                duration: c,
                unit: s,
                excludeEnabled: d,
                activeDateField: i,
                onStartDateChange: K,
                onEndDateChange: ee,
                onDurationChange: V,
                onActiveFieldChange: w
              }
            ),
            Y && Ve && /* @__PURE__ */ T("div", { className: "mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2", children: [
              /* @__PURE__ */ h(qr, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ h("p", { className: "text-sm text-amber-800", children: Ve })
            ] }),
            /* @__PURE__ */ h(
              go,
              {
                excludeEnabled: d,
                excludeApplied: C,
                excludeFilterTypes: b,
                activeFilterView: M,
                excludedWeekdays: l,
                excludedSavedDates: x,
                savedDatesSearchTerm: W,
                filteredSavedDates: L,
                onExcludeToggle: Le,
                onFilterButtonClick: Pe,
                onRemoveFilterType: We,
                onCancel: at,
                onSave: ot,
                onToggleWeekday: it,
                setSavedDatesSearchTerm: S,
                setExcludedSavedDates: ct,
                setExcludeFilterTypes: Je,
                setActiveFilterView: ze,
                summary: ht
              }
            ),
            /* @__PURE__ */ h(
              tc,
              {
                unit: s,
                excludeEnabled: d,
                selectedRange: B,
                displayedMonth: O,
                setDisplayedMonth: G,
                dayPickerModifiers: j,
                dayPickerDisabledMatcher: F,
                monthsViewIndex: g,
                setMonthsViewIndex: k,
                monthsViewYear: u,
                setMonthsViewYear: q,
                yearsViewIndex: N,
                setYearsViewIndex: $,
                yearsViewDecade: D,
                setYearsViewDecade: I,
                handleCalendarSelect: ve,
                handleResetCalendarSelect: Te,
                handleWeekCalendarSelect: Xe,
                monthQuarterRange: H,
                activeDateField: i,
                setActiveDateField: w,
                onMonthSelect: lt,
                onYearSelect: dt,
                todayDateObj: U
              }
            )
          ] }),
          /* @__PURE__ */ h(
            nc,
            {
              excludeEnabled: d,
              hasEmptyDates: _,
              hasFutureDates: Y,
              onToday: ae,
              onClear: ie,
              onCancel: n,
              onApply: De
            }
          )
        ] })
      ]
    }
  );
}
export {
  Xt as ALLOW_FUTURE_DATES,
  hc as AdvancedDateRangePicker,
  lc as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  dc as WEEK_NUMBERING_MODE,
  we as WEEK_STARTS_ON,
  rr as calcDurationFromRange,
  Ga as calcEndFromDuration,
  Ka as calcStartFromDuration,
  sr as createSelection,
  uc as formatDisplayDate,
  re as formatUtc,
  Va as getPresets,
  Tt as getTodayUtc,
  Ja as getUnitAbbreviation,
  fc as parseDisplayDate,
  R as parseUtc
};
