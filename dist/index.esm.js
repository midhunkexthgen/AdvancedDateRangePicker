import { jsxs as A, jsx as h, Fragment as ct } from "react/jsx-runtime";
import P, { forwardRef as Ln, createElement as rn, useState as X, useEffect as Oe, useRef as Pe, useMemo as Fe, createContext as Yr, useContext as _r, useCallback as J, useLayoutEffect as Fr } from "react";
import { LocalizationProvider as Er } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField as mn } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs as $r } from "@mui/x-date-pickers/AdapterDayjs";
const Ir = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Br = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), gn = (e) => {
  const t = Br(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, qn = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Pr = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Ur = {
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
const Ar = Ln(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => rn(
    "svg",
    {
      ref: c,
      ...Ur,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: qn("lucide", o),
      ...!a && !Pr(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([l, g]) => rn(l, g)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
const Le = (e, t) => {
  const n = Ln(
    ({ className: r, ...o }, a) => rn(Ar, {
      ref: a,
      iconNode: t,
      className: qn(
        `lucide-${Ir(gn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = gn(e), n;
};
const Hr = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Rt = Le("chevron-down", Hr);
const jr = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], zn = Le("chevron-left", jr);
const Rr = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Zn = Le("chevron-right", Rr);
const Lr = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], qr = Le("circle-question-mark", Lr);
const zr = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Zr = Le("plus", zr);
const Qr = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], Gr = Le("search", Qr);
const Kr = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Xr = Le("trash-2", Kr);
const Jr = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Vr = Le("triangle-alert", Jr);
const eo = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], to = Le("x", eo), Qn = 6048e5, no = 864e5, Gn = 6e4, Kn = 36e5, yn = Symbol.for("constructDateFrom");
function pe(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && yn in e ? e[yn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function V(e, t) {
  return pe(t || e, e);
}
function ge(e, t, n) {
  const r = V(e, n?.in);
  return isNaN(t) ? pe(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function He(e, t, n) {
  const r = V(e, n?.in);
  if (isNaN(t)) return pe(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = pe(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let ro = {};
function Ct() {
  return ro;
}
function be(e, t) {
  const n = Ct(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = V(e, t?.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function kt(e, t) {
  return be(e, { ...t, weekStartsOn: 1 });
}
function Xn(e, t) {
  const n = V(e, t?.in), r = n.getFullYear(), o = pe(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = kt(o), s = pe(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = kt(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function pn(e) {
  const t = V(e), n = new Date(
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
function Qe(e, ...t) {
  const n = pe.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Nt(e, t) {
  const n = V(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function cn(e, t, n) {
  const [r, o] = Qe(
    n?.in,
    e,
    t
  ), a = Nt(r), s = Nt(o), i = +a - pn(a), c = +s - pn(s);
  return Math.round((i - c) / no);
}
function oo(e, t) {
  const n = Xn(e, t), r = pe(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), kt(r);
}
function Jn(e, t, n) {
  return He(e, t * 3, n);
}
function ln(e, t, n) {
  return ge(e, t * 7, n);
}
function ao(e, t, n) {
  return He(e, t * 12, n);
}
function so(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = V(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function io(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = pe.bind(null, o));
    const a = V(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), pe(r, n || NaN);
}
function Lt(e, t) {
  const n = +V(e) - +V(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function co(e, t, n) {
  const [r, o] = Qe(
    n?.in,
    e,
    t
  );
  return +Nt(r) == +Nt(o);
}
function Vn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function lo(e) {
  return !(!Vn(e) && typeof e != "number" || isNaN(+V(e)));
}
function er(e, t, n) {
  const [r, o] = Qe(
    n?.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function at(e, t) {
  const n = V(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function tr(e, t, n) {
  const [r, o] = Qe(
    n?.in,
    e,
    t
  ), a = bn(r, o), s = Math.abs(
    cn(r, o)
  );
  r.setDate(r.getDate() - a * s);
  const i = +(bn(r, o) === -a), c = a * (s - i);
  return c === 0 ? 0 : c;
}
function bn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function nr(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function uo(e, t) {
  const n = V(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function dt(e, t) {
  const n = V(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function fo(e, t) {
  const n = V(e, t?.in);
  return +uo(n, t) == +dt(n, t);
}
function rr(e, t, n) {
  const [r, o, a] = Qe(
    n?.in,
    e,
    e,
    t
  ), s = Lt(o, a), i = Math.abs(
    er(o, a)
  );
  if (i < 1) return 0;
  o.getMonth() === 1 && o.getDate() > 27 && o.setDate(30), o.setMonth(o.getMonth() - s * i);
  let c = Lt(o, a) === -s;
  fo(r) && i === 1 && Lt(r, a) === 1 && (c = !1);
  const l = s * (i - +c);
  return l === 0 ? 0 : l;
}
function ho(e, t, n) {
  const r = rr(e, t, n) / 3;
  return nr()(r);
}
function mo(e, t, n) {
  const r = tr(e, t, n) / 7;
  return nr()(r);
}
function dn(e, t) {
  const [n, r] = Qe(e, t.start, t.end);
  return { start: n, end: r };
}
function or(e, t) {
  const { start: n, end: r } = dn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(pe(n, s)), s.setDate(s.getDate() + i), s.setHours(0, 0, 0, 0);
  return o ? c.reverse() : c;
}
function go(e, t) {
  const { start: n, end: r } = dn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(pe(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function xn(e, t) {
  const n = V(e, t?.in), r = n.getMonth(), o = r - r % 3;
  return n.setMonth(o, 1), n.setHours(0, 0, 0, 0), n;
}
function Ce(e, t) {
  const n = V(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function yo(e, t) {
  const n = V(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function un(e, t) {
  const n = V(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function po(e, t) {
  const { start: n, end: r } = dn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(pe(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function ar(e, t) {
  const n = Ct(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = V(e, t?.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function bo(e, t) {
  return ar(e, { ...t, weekStartsOn: 1 });
}
function Dn(e, t) {
  const n = V(e, t?.in), r = n.getMonth(), o = r - r % 3 + 3;
  return n.setMonth(o, 0), n.setHours(23, 59, 59, 999), n;
}
const xo = {
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
}, Do = (e, t, n) => {
  let r;
  const o = xo[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function qt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const wo = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, vo = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Mo = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ko = {
  date: qt({
    formats: wo,
    defaultWidth: "full"
  }),
  time: qt({
    formats: vo,
    defaultWidth: "full"
  }),
  dateTime: qt({
    formats: Mo,
    defaultWidth: "full"
  })
}, No = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, So = (e, t, n, r) => No[e];
function Dt(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : s;
      o = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[s];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const Co = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, To = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Oo = {
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
}, Wo = {
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
}, Yo = {
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
}, _o = {
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
}, Fo = (e, t) => {
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
}, Eo = {
  ordinalNumber: Fo,
  era: Dt({
    values: Co,
    defaultWidth: "wide"
  }),
  quarter: Dt({
    values: To,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Dt({
    values: Oo,
    defaultWidth: "wide"
  }),
  day: Dt({
    values: Wo,
    defaultWidth: "wide"
  }),
  dayPeriod: Dt({
    values: Yo,
    defaultWidth: "wide",
    formattingValues: _o,
    defaultFormattingWidth: "wide"
  })
};
function wt(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? Io(i, (d) => d.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      $o(i, (d) => d.test(s))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const g = t.slice(s.length);
    return { value: l, rest: g };
  };
}
function $o(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Io(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Bo(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let s = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const i = t.slice(o.length);
    return { value: s, rest: i };
  };
}
const Po = /^(\d+)(th|st|nd|rd)?/i, Uo = /\d+/i, Ao = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ho = {
  any: [/^b/i, /^(a|c)/i]
}, jo = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ro = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Lo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, qo = {
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
}, zo = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Zo = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Qo = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Go = {
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
}, Ko = {
  ordinalNumber: Bo({
    matchPattern: Po,
    parsePattern: Uo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: wt({
    matchPatterns: Ao,
    defaultMatchWidth: "wide",
    parsePatterns: Ho,
    defaultParseWidth: "any"
  }),
  quarter: wt({
    matchPatterns: jo,
    defaultMatchWidth: "wide",
    parsePatterns: Ro,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: wt({
    matchPatterns: Lo,
    defaultMatchWidth: "wide",
    parsePatterns: qo,
    defaultParseWidth: "any"
  }),
  day: wt({
    matchPatterns: zo,
    defaultMatchWidth: "wide",
    parsePatterns: Zo,
    defaultParseWidth: "any"
  }),
  dayPeriod: wt({
    matchPatterns: Qo,
    defaultMatchWidth: "any",
    parsePatterns: Go,
    defaultParseWidth: "any"
  })
}, fn = {
  code: "en-US",
  formatDistance: Do,
  formatLong: ko,
  formatRelative: So,
  localize: Eo,
  match: Ko,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Xo(e, t) {
  const n = V(e, t?.in);
  return cn(n, un(n)) + 1;
}
function sr(e, t) {
  const n = V(e, t?.in), r = +kt(n) - +oo(n);
  return Math.round(r / Qn) + 1;
}
function ir(e, t) {
  const n = V(e, t?.in), r = n.getFullYear(), o = Ct(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, s = pe(t?.in || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = be(s, t), c = pe(t?.in || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const l = be(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function Jo(e, t) {
  const n = Ct(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = ir(e, t), a = pe(t?.in || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), be(a, t);
}
function cr(e, t) {
  const n = V(e, t?.in), r = +be(n, t) - +Jo(n, t);
  return Math.round(r / Qn) + 1;
}
function le(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ze = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return le(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : le(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return le(e.getDate(), t.length);
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
    return le(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return le(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return le(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return le(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return le(o, t.length);
  }
}, st = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, wn = {
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
      const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
      return n.ordinalNumber(o, { unit: "year" });
    }
    return Ze.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = ir(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return le(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : le(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Xn(e);
    return le(n, t.length);
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
    return le(n, t.length);
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
        return le(r, 2);
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
        return le(r, 2);
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
        return Ze.M(e, t);
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
        return le(r + 1, 2);
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
    const o = cr(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : le(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = sr(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : le(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ze.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Xo(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : le(r, t.length);
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
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(a);
      // Padded numerical value
      case "ee":
        return le(a, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(a, { unit: "day" });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(a);
      // Padded numerical value
      case "cc":
        return le(a, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), o = r === 0 ? 7 : r;
    switch (t) {
      // 2
      case "i":
        return String(o);
      // 02
      case "ii":
        return le(o, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(o, { unit: "day" });
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
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r === 12 ? o = st.noon : r === 0 ? o = st.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r >= 17 ? o = st.evening : r >= 12 ? o = st.afternoon : r >= 4 ? o = st.morning : o = st.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
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
    return Ze.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ze.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : le(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : le(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ze.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ze.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ze.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Mn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Je(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Je(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Mn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Je(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Je(r, ":");
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
        return "GMT" + vn(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Je(r, ":");
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
        return "GMT" + vn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Je(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return le(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return le(+e, t.length);
  }
};
function vn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + le(a, 2);
}
function Mn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + le(Math.abs(e) / 60, 2) : Je(e, t);
}
function Je(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = le(Math.trunc(r / 60), 2), a = le(r % 60, 2);
  return n + o + t + a;
}
const kn = (e, t) => {
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
}, lr = (e, t) => {
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
}, Vo = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return kn(e, t);
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
  return a.replace("{{date}}", kn(r, t)).replace("{{time}}", lr(o, t));
}, ea = {
  p: lr,
  P: Vo
}, ta = /^D+$/, na = /^Y+$/, ra = ["D", "DD", "YY", "YYYY"];
function oa(e) {
  return ta.test(e);
}
function aa(e) {
  return na.test(e);
}
function sa(e, t, n) {
  const r = ia(e, t, n);
  if (console.warn(r), ra.includes(e)) throw new RangeError(r);
}
function ia(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const ca = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, la = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, da = /^'([^]*?)'?$/, ua = /''/g, fa = /[a-zA-Z]/;
function ha(e, t, n) {
  const r = Ct(), o = n?.locale ?? r.locale ?? fn, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, s = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = V(e, n?.in);
  if (!lo(i))
    throw new RangeError("Invalid time value");
  let c = t.match(la).map((g) => {
    const d = g[0];
    if (d === "p" || d === "P") {
      const N = ea[d];
      return N(g, o.formatLong);
    }
    return g;
  }).join("").match(ca).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const d = g[0];
    if (d === "'")
      return { isToken: !1, value: ma(g) };
    if (wn[d])
      return { isToken: !0, value: g };
    if (d.match(fa))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: g };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((g) => {
    if (!g.isToken) return g.value;
    const d = g.value;
    (!n?.useAdditionalWeekYearTokens && aa(d) || !n?.useAdditionalDayOfYearTokens && oa(d)) && sa(d, t, String(e));
    const N = wn[d[0]];
    return N(i, d, o.localize, l);
  }).join("");
}
function ma(e) {
  const t = e.match(da);
  return t ? t[1].replace(ua, "'") : e;
}
function ga(e, t) {
  const n = V(e, t?.in), r = n.getFullYear(), o = n.getMonth(), a = pe(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Ve(e, t) {
  return V(e, t?.in).getMonth();
}
function ye(e, t) {
  return V(e, t?.in).getFullYear();
}
function ya(e, t) {
  return +V(e) > +V(t);
}
function pa(e, t) {
  return +V(e) < +V(t);
}
function ba(e, t, n) {
  const [r, o] = Qe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function xa(e, t, n) {
  const [r, o] = Qe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Da(e, t) {
  const n = () => pe(t?.in, NaN), o = ka(e);
  let a;
  if (o.date) {
    const l = Na(o.date, 2);
    a = Sa(l.restDateString, l.year);
  }
  if (!a || isNaN(+a)) return n();
  const s = +a;
  let i = 0, c;
  if (o.time && (i = Ca(o.time), isNaN(i)))
    return n();
  if (o.timezone) {
    if (c = Ta(o.timezone), isNaN(c)) return n();
  } else {
    const l = new Date(s + i), g = V(0, t?.in);
    return g.setFullYear(
      l.getUTCFullYear(),
      l.getUTCMonth(),
      l.getUTCDate()
    ), g.setHours(
      l.getUTCHours(),
      l.getUTCMinutes(),
      l.getUTCSeconds(),
      l.getUTCMilliseconds()
    ), g;
  }
  return V(s + i + c, t?.in);
}
const _t = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, wa = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, va = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Ma = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function ka(e) {
  const t = {}, n = e.split(_t.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], _t.timeZoneDelimiter.test(t.date) && (t.date = e.split(_t.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const o = _t.timezone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timezone = o[1]) : t.time = r;
  }
  return t;
}
function Na(e, t) {
  const n = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), r = e.match(n);
  if (!r) return { year: NaN, restDateString: "" };
  const o = r[1] ? parseInt(r[1]) : null, a = r[2] ? parseInt(r[2]) : null;
  return {
    year: a === null ? o : a * 100,
    restDateString: e.slice((r[1] || r[2]).length)
  };
}
function Sa(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(wa);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], o = vt(n[1]), a = vt(n[2]) - 1, s = vt(n[3]), i = vt(n[4]), c = vt(n[5]) - 1;
  if (r)
    return Fa(t, i, c) ? Oa(t, i, c) : /* @__PURE__ */ new Date(NaN);
  {
    const l = /* @__PURE__ */ new Date(0);
    return !Ya(t, a, s) || !_a(t, o) ? /* @__PURE__ */ new Date(NaN) : (l.setUTCFullYear(t, a, Math.max(o, s)), l);
  }
}
function vt(e) {
  return e ? parseInt(e) : 1;
}
function Ca(e) {
  const t = e.match(va);
  if (!t) return NaN;
  const n = zt(t[1]), r = zt(t[2]), o = zt(t[3]);
  return Ea(n, r, o) ? n * Kn + r * Gn + o * 1e3 : NaN;
}
function zt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Ta(e) {
  if (e === "Z") return 0;
  const t = e.match(Ma);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), o = t[3] && parseInt(t[3]) || 0;
  return $a(r, o) ? n * (r * Kn + o * Gn) : NaN;
}
function Oa(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, a = (t - 1) * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const Wa = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function dr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Ya(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (Wa[t] || (dr(e) ? 29 : 28));
}
function _a(e, t) {
  return t >= 1 && t <= (dr(e) ? 366 : 365);
}
function Fa(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function Ea(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function $a(e, t) {
  return t >= 0 && t <= 59;
}
function St(e, t, n) {
  const r = V(e, n?.in), o = r.getFullYear(), a = r.getDate(), s = pe(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = ga(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Zt(e, t, n) {
  const r = V(e, n?.in), o = Math.trunc(r.getMonth() / 3) + 1, a = t - o;
  return St(r, r.getMonth() + a * 3);
}
function tt(e, t, n) {
  const r = V(e, n?.in);
  return isNaN(+r) ? pe(e, NaN) : (r.setFullYear(t), r);
}
function Ia(e, t) {
  const n = Ha(t);
  return "formatToParts" in n ? Pa(n, e) : Ua(n, e);
}
const Ba = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Pa(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let o = 0; o < n.length; o++) {
      const a = Ba[n[o].type];
      a !== void 0 && (r[a] = parseInt(n[o].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function Ua(e, t) {
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
const Qt = {}, Nn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Aa = Nn === "06/25/2014, 00:00:00" || Nn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function Ha(e) {
  return Qt[e] || (Qt[e] = Aa ? new Intl.DateTimeFormat("en-US", {
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
  })), Qt[e];
}
function ur(e, t, n, r, o, a, s) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, o, a, s), i;
}
const Sn = 36e5, ja = 6e4, Gt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function fr(e, t, n) {
  if (!e)
    return 0;
  let r = Gt.timezoneZ.exec(e);
  if (r)
    return 0;
  let o, a;
  if (r = Gt.timezoneHH.exec(e), r)
    return o = parseInt(r[1], 10), Cn(o) ? -(o * Sn) : NaN;
  if (r = Gt.timezoneHHMM.exec(e), r) {
    o = parseInt(r[2], 10);
    const s = parseInt(r[3], 10);
    return Cn(o, s) ? (a = Math.abs(o) * Sn + s * ja, r[1] === "+" ? -a : a) : NaN;
  }
  if (qa(e)) {
    t = new Date(t || Date.now());
    const s = n ? t : Ra(t), i = on(s, e);
    return -(n ? i : La(t, i, e));
  }
  return NaN;
}
function Ra(e) {
  return ur(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function on(e, t) {
  const n = Ia(e, t), r = ur(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let o = e.getTime();
  const a = o % 1e3;
  return o -= a >= 0 ? a : 1e3 + a, r - o;
}
function La(e, t, n) {
  let o = e.getTime() - t;
  const a = on(new Date(o), n);
  if (t === a)
    return t;
  o -= a - t;
  const s = on(new Date(o), n);
  return a === s ? a : Math.max(a, s);
}
function Cn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Tn = {};
function qa(e) {
  if (Tn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Tn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function On(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const za = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Kt = 36e5, Wn = 6e4, Za = 2, Se = {
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
  timeZone: za
};
function Qa(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? Za : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = Ga(e), { year: o, restDateString: a } = Ka(r.date, n), s = Xa(a, o);
  if (s === null || isNaN(s.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (s) {
    const i = s.getTime();
    let c = 0, l;
    if (r.time && (c = Ja(r.time), c === null || isNaN(c)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (l = fr(r.timeZone || t.timeZone, new Date(i + c)), isNaN(l))
        return /* @__PURE__ */ new Date(NaN);
    } else
      l = On(new Date(i + c)), l = On(new Date(i + c + l));
    return new Date(i + c + l);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Ga(e) {
  const t = {};
  let n = Se.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = Se.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const o = Se.timeZone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timeZone = o[1].trim()) : t.time = r;
  }
  return t;
}
function Ka(e, t) {
  if (e) {
    const n = Se.YYY[t], r = Se.YYYYY[t];
    let o = Se.YYYY.exec(e) || r.exec(e);
    if (o) {
      const a = o[1];
      return {
        year: parseInt(a, 10),
        restDateString: e.slice(a.length)
      };
    }
    if (o = Se.YY.exec(e) || n.exec(e), o) {
      const a = o[1];
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
function Xa(e, t) {
  if (t === null)
    return null;
  let n, r, o;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let a = Se.MM.exec(e);
  if (a)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1, _n(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (a = Se.DDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0);
    const s = parseInt(a[1], 10);
    return ts(t, s) ? (n.setUTCFullYear(t, 0, s), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Se.MMDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1;
    const s = parseInt(a[2], 10);
    return _n(t, r, s) ? (n.setUTCFullYear(t, r, s), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Se.Www.exec(e), a)
    return o = parseInt(a[1], 10) - 1, Fn(o) ? Yn(t, o) : /* @__PURE__ */ new Date(NaN);
  if (a = Se.WwwD.exec(e), a) {
    o = parseInt(a[1], 10) - 1;
    const s = parseInt(a[2], 10) - 1;
    return Fn(o, s) ? Yn(t, o, s) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ja(e) {
  let t, n, r = Se.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Xt(t) ? t % 24 * Kt : NaN;
  if (r = Se.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Xt(t, n) ? t % 24 * Kt + n * Wn : NaN;
  if (r = Se.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const o = parseFloat(r[3].replace(",", "."));
    return Xt(t, n, o) ? t % 24 * Kt + n * Wn + o * 1e3 : NaN;
  }
  return null;
}
function Yn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, a = t * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const Va = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], es = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function hr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function _n(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = hr(e);
    if (r && n > es[t] || !r && n > Va[t])
      return !1;
  }
  return !0;
}
function ts(e, t) {
  if (t < 1)
    return !1;
  const n = hr(e);
  return !(n && t > 366 || !n && t > 365);
}
function Fn(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Xt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function ns(e, t, n) {
  e = Qa(e, n);
  const r = fr(t, e, !0), o = new Date(e.getTime() - r), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), a.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), a;
}
const Ne = 0, bc = !1, an = !0, xc = "firstFullWeek", rs = "UTC";
function z(e) {
  const t = Da(`${e}T00:00:00.000Z`);
  return ns(t, rs);
}
function ae(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function $t() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function os(e, t, n) {
  const r = z(e);
  let o;
  switch (t) {
    case "day":
      o = ge(r, n);
      break;
    case "week":
      o = ln(r, n);
      break;
    case "month":
      o = He(r, n);
      break;
    case "quarter":
      o = Jn(r, n);
      break;
    default:
      o = r;
  }
  return ae(o);
}
function as(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = z(e), a = 0;
    for (r.includes(o.getDay()) || (a = 1); a < n; )
      o = ge(o, 1), r.includes(o.getDay()) || a++;
    return ae(o);
  } else
    return os(e, t, n - 1);
}
function ss(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = z(e), a = 0;
    for (r.includes(o.getDay()) || (a = 1); a < n; )
      o = ge(o, -1), r.includes(o.getDay()) || a++;
    return ae(o);
  } else {
    const o = z(e);
    let a;
    switch (t) {
      case "day":
        a = ge(o, -(n - 1));
        break;
      case "week":
        a = ln(o, -(n - 1));
        break;
      case "month":
        a = He(o, -(n - 1));
        break;
      case "quarter":
        a = Jn(o, -(n - 1));
        break;
      default:
        a = o;
    }
    return ae(a);
  }
}
function mr(e, t, n, r) {
  const o = z(e), a = z(t);
  if (o > a) return 0;
  if (n === "day" && r.length > 0)
    return or({ start: o, end: a }).filter(
      (c) => !r.includes(c.getDay())
    ).length;
  switch (n) {
    case "day":
      return tr(a, o) + 1;
    case "week":
      return mo(a, o) + 1;
    case "month":
      return rr(a, o) + 1;
    case "quarter":
      return ho(a, o) + 1;
    default:
      return 1;
  }
}
function is(e, t, n) {
  const r = z(e), o = z(t);
  if (r > o) return [];
  const a = or({ start: r, end: o });
  return n.length === 0 ? a.map(ae) : a.filter((s) => !n.includes(s.getDay())).map(ae);
}
function gr(e, t, n = "day", r = [], o, a, s, i, c) {
  const l = mr(
    e,
    t,
    n,
    r
  ), g = is(
    e,
    t,
    r
  ), d = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: l,
    excludedWeekdays: r,
    includedDatesUtc: g
  };
  return o !== void 0 && (d.excludeEnabled = o), a && (d.excludeFilterTypes = a), s && (d.excludedSpecificDates = s), i && (d.excludedSavedDates = i), c && (d.excludedDateRanges = c), d;
}
function Dc(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function wc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, o] = t, a = parseInt(r, 10), s = parseInt(n, 10), i = parseInt(o, 10);
  if (isNaN(a) || isNaN(s) || isNaN(i) || a < 1 || a > 12 || s < 1 || s > 31 || i < 1900 || i > 2100)
    return null;
  const c = a.toString().padStart(2, "0"), l = s.toString().padStart(2, "0");
  return `${i}-${c}-${l}`;
}
function cs(e) {
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
function ls() {
  const e = $t(), t = z(e);
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
        const n = ae(ge(t, -1));
        return {
          startDateUtc: n,
          endDateUtc: n
        };
      }
    },
    thisWeek: {
      label: "This Week",
      getValue: () => {
        let n = be(t, {
          weekStartsOn: Ne
        }), r = ge(n, 6);
        return {
          startDateUtc: ae(n),
          endDateUtc: ae(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = Ce(t);
        return {
          startDateUtc: ae(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = un(t);
        return {
          startDateUtc: ae(n),
          endDateUtc: e
        };
      }
    }
  };
}
const ds = "DateRangePickerDB", us = 1, $e = "savedDateRanges";
class fs {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(ds, us);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (o) => {
          const a = o.target.result;
          a.objectStoreNames.contains($e) || a.createObjectStore($e, {
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
    return await this.ensureInit(), new Promise((r, o) => {
      const i = this.db.transaction([$e], "readwrite").objectStore($e).put({
        id: t,
        data: n,
        timestamp: Date.now()
      });
      i.onerror = () => o(i.error), i.onsuccess = () => r();
    });
  }
  /**
   * Get data from IndexedDB
   */
  async getData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const s = this.db.transaction([$e], "readonly").objectStore($e).get(t);
      s.onerror = () => r(s.error), s.onsuccess = () => {
        const i = s.result;
        i && i.data ? n(i.data) : n(null);
      };
    });
  }
  /**
   * Delete data from IndexedDB
   */
  async deleteData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const s = this.db.transaction([$e], "readwrite").objectStore($e).delete(t);
      s.onerror = () => r(s.error), s.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const a = this.db.transaction([$e], "readwrite").objectStore($e).clear();
      a.onerror = () => n(a.error), a.onsuccess = () => t();
    });
  }
}
const lt = new fs(), Jt = "savedDateRanges";
function hs({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r = {},
  disabled: o = !1
}) {
  const [a, s] = X([]), [i, c] = X(!1), [l, g] = X(""), [d, N] = X(!1);
  Oe(() => {
    (async () => {
      await lt.init();
      const p = await lt.getData(
        Jt
      );
      p && s(p);
    })();
  }, []);
  const W = ls(), M = (f) => {
    if (o) return;
    const { startDateUtc: p, endDateUtc: w } = f();
    e(p, w);
  }, $ = async () => {
    if (o) return;
    if (l.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const f = {
      id: `saved-${Date.now()}`,
      label: l.trim(),
      selection: n,
      createdAt: Date.now()
    }, p = [...a, f];
    s(p), await lt.saveData(Jt, p), g(""), c(!1);
  }, C = async (f) => {
    if (o) return;
    const p = a.filter((w) => w.id !== f);
    s(p), await lt.saveData(Jt, p);
  }, F = (f) => {
    o || (t ? t(f.selection) : e(f.selection.startDateUtc, f.selection.endDateUtc));
  }, B = (f, p) => {
    const w = (v) => (/* @__PURE__ */ new Date(v + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return f === p ? w(f) : `${w(f)} - ${w(p)}`;
  };
  return /* @__PURE__ */ A(
    "div",
    {
      className: `w-44 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden ${o ? "opacity-60" : ""}`,
      style: { ...r },
      children: [
        /* @__PURE__ */ h("div", { className: "mb-1 mt-4 px-3 flex-shrink-0", children: /* @__PURE__ */ h("div", { className: "flex flex-col", children: Object.values(W).map((f) => {
          const { startDateUtc: p, endDateUtc: w } = f.getValue();
          return /* @__PURE__ */ A(
            "button",
            {
              onClick: () => M(f.getValue),
              disabled: o,
              "aria-disabled": o,
              className: `w-full text-left px-1 rounded-md transition-all mb-3 ${o ? "cursor-not-allowed bg-gray-100 text-gray-400" : "hover:bg-white hover:shadow-sm"}`,
              children: [
                /* @__PURE__ */ h(
                  "div",
                  {
                    className: `text-xs font-semibold ${o ? "text-gray-400" : "text-[#1F1F1F]"}`,
                    children: f.label
                  }
                ),
                /* @__PURE__ */ h(
                  "div",
                  {
                    className: `text-[10px] leading-relaxed font-medium
 mt-0.5 ${o ? "text-gray-400" : "text-[#61708F]"}`,
                    children: B(p, w)
                  }
                )
              ]
            },
            f.label
          );
        }) }) }),
        /* @__PURE__ */ A("div", { className: "flex justify-between flex-col flex-1 min-h-0 border-t border-gray-200 px-3 h-full", children: [
          /* @__PURE__ */ A("div", { className: "overflow-y-auto", children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-3 flex-shrink-0 mt-3", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ h("h3", { className: "text-xs font-semibold text-[#757575]", children: "Saved Dates" }) }),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => {
                    o || N(!d);
                  },
                  disabled: o,
                  className: `text-gray-400 ${o ? "cursor-not-allowed opacity-50" : "hover:text-gray-600"}`,
                  children: /* @__PURE__ */ h(qr, { className: "w-3 h-3" })
                }
              )
            ] }),
            d && /* @__PURE__ */ h("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
            a.length === 0 ? /* @__PURE__ */ h("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ h("div", { className: "space-y-3 mb-3 overflow-y-auto flex-1 min-h-0", children: a.map((f) => /* @__PURE__ */ A(
              "div",
              {
                className: "group bg-white rounded-md hover:shadow-sm transition-all",
                children: [
                  /* @__PURE__ */ A("div", { className: "flex items-start justify-between px-1", children: [
                    /* @__PURE__ */ h(
                      "button",
                      {
                        onClick: () => F(f),
                        disabled: o,
                        className: `flex-1 text-left ${o ? "cursor-not-allowed opacity-60" : ""}`,
                        children: /* @__PURE__ */ h(
                          "div",
                          {
                            className: `text-xs font-semibold mb-1 ${o ? "text-gray-400" : "text-gray-900"}`,
                            children: f.label
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ h(
                      "button",
                      {
                        onClick: () => C(f.id),
                        disabled: o,
                        className: `${o ? "opacity-40 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"} text-red-500 hover:text-red-700 transition-opacity ml-2`,
                        children: /* @__PURE__ */ h(Xr, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      className: `text-[10px] leading-relaxed font-medium px-1 ${o ? "text-gray-400" : "text-[#61708F]"}`,
                      children: B(
                        f.selection.startDateUtc,
                        f.selection.endDateUtc
                      )
                    }
                  )
                ]
              },
              f.id
            )) })
          ] }),
          /* @__PURE__ */ h("div", { children: /* @__PURE__ */ A(
            "button",
            {
              onClick: () => {
                o || c(!0);
              },
              disabled: o,
              className: `w-full flex-shrink-0 px-1 py-4 text-[#003DB8] opacity-50 hover:opacity-100 text-xs font-medium rounded-md transition-colors flex items-center justify-center mt-auto ${o ? "cursor-not-allowed" : ""}`,
              children: [
                /* @__PURE__ */ h(Zr, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          ) })
        ] }),
        i && /* @__PURE__ */ A(ct, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "fixed inset-0 bg-black/30 z-50",
              onClick: () => c(!1)
            }
          ),
          /* @__PURE__ */ h("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ A("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
            /* @__PURE__ */ h("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
            /* @__PURE__ */ A("div", { className: "mb-2", children: [
              /* @__PURE__ */ h("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: "text",
                  value: l,
                  onChange: (f) => g(f.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (f) => {
                    f.key === "Enter" && $();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ A("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
              /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Range:" }),
                " ",
                B(
                  n.startDateUtc,
                  n.endDateUtc
                )
              ] }),
              /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Duration:" }),
                " ",
                n.duration,
                " ",
                n.unit,
                "(s)"
              ] }),
              n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Days:" }),
                " ",
                n.excludedWeekdays.map(
                  (f) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][f]
                ).join(", ")
              ] }),
              n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Specific Dates:" }),
                " ",
                n.excludedSpecificDates.length,
                " date(s)"
              ] }),
              n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Saved Dates:" }),
                " ",
                n.excludedSavedDates.length,
                " saved date(s)"
              ] }),
              n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Date Ranges:" }),
                " ",
                n.excludedDateRanges.length,
                " range(s)"
              ] })
            ] }),
            /* @__PURE__ */ A("div", { className: "flex justify-end gap-2", children: [
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
                  onClick: $,
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
function ms(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Et = { exports: {} }, gs = Et.exports, En;
function ys() {
  return En || (En = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(gs, (function() {
      var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", c = "hour", l = "day", g = "week", d = "month", N = "quarter", W = "year", M = "date", $ = "Invalid Date", C = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, F = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, B = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(E) {
        var b = ["th", "st", "nd", "rd"], D = E % 100;
        return "[" + E + (b[(D - 20) % 10] || b[D] || b[0]) + "]";
      } }, f = function(E, b, D) {
        var Y = String(E);
        return !Y || Y.length >= b ? E : "" + Array(b + 1 - Y.length).join(D) + E;
      }, p = { s: f, z: function(E) {
        var b = -E.utcOffset(), D = Math.abs(b), Y = Math.floor(D / 60), y = D % 60;
        return (b <= 0 ? "+" : "-") + f(Y, 2, "0") + ":" + f(y, 2, "0");
      }, m: function E(b, D) {
        if (b.date() < D.date()) return -E(D, b);
        var Y = 12 * (D.year() - b.year()) + (D.month() - b.month()), y = b.clone().add(Y, d), O = D - y < 0, _ = b.clone().add(Y + (O ? -1 : 1), d);
        return +(-(Y + (D - y) / (O ? y - _ : _ - y)) || 0);
      }, a: function(E) {
        return E < 0 ? Math.ceil(E) || 0 : Math.floor(E);
      }, p: function(E) {
        return { M: d, y: W, w: g, d: l, D: M, h: c, m: i, s, ms: a, Q: N }[E] || String(E || "").toLowerCase().replace(/s$/, "");
      }, u: function(E) {
        return E === void 0;
      } }, w = "en", v = {};
      v[w] = B;
      var T = "$isDayjsObject", U = function(E) {
        return E instanceof ee || !(!E || !E[T]);
      }, L = function E(b, D, Y) {
        var y;
        if (!b) return w;
        if (typeof b == "string") {
          var O = b.toLowerCase();
          v[O] && (y = O), D && (v[O] = D, y = O);
          var _ = b.split("-");
          if (!y && _.length > 1) return E(_[0]);
        } else {
          var m = b.name;
          v[m] = b, y = m;
        }
        return !Y && y && (w = y), y || !Y && w;
      }, k = function(E, b) {
        if (U(E)) return E.clone();
        var D = typeof b == "object" ? b : {};
        return D.date = E, D.args = arguments, new ee(D);
      }, S = p;
      S.l = L, S.i = U, S.w = function(E, b) {
        return k(E, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
      };
      var ee = (function() {
        function E(D) {
          this.$L = L(D.locale, null, !0), this.parse(D), this.$x = this.$x || D.x || {}, this[T] = !0;
        }
        var b = E.prototype;
        return b.parse = function(D) {
          this.$d = (function(Y) {
            var y = Y.date, O = Y.utc;
            if (y === null) return /* @__PURE__ */ new Date(NaN);
            if (S.u(y)) return /* @__PURE__ */ new Date();
            if (y instanceof Date) return new Date(y);
            if (typeof y == "string" && !/Z$/i.test(y)) {
              var _ = y.match(C);
              if (_) {
                var m = _[2] - 1 || 0, H = (_[7] || "0").substring(0, 3);
                return O ? new Date(Date.UTC(_[1], m, _[3] || 1, _[4] || 0, _[5] || 0, _[6] || 0, H)) : new Date(_[1], m, _[3] || 1, _[4] || 0, _[5] || 0, _[6] || 0, H);
              }
            }
            return new Date(y);
          })(D), this.init();
        }, b.init = function() {
          var D = this.$d;
          this.$y = D.getFullYear(), this.$M = D.getMonth(), this.$D = D.getDate(), this.$W = D.getDay(), this.$H = D.getHours(), this.$m = D.getMinutes(), this.$s = D.getSeconds(), this.$ms = D.getMilliseconds();
        }, b.$utils = function() {
          return S;
        }, b.isValid = function() {
          return this.$d.toString() !== $;
        }, b.isSame = function(D, Y) {
          var y = k(D);
          return this.startOf(Y) <= y && y <= this.endOf(Y);
        }, b.isAfter = function(D, Y) {
          return k(D) < this.startOf(Y);
        }, b.isBefore = function(D, Y) {
          return this.endOf(Y) < k(D);
        }, b.$g = function(D, Y, y) {
          return S.u(D) ? this[Y] : this.set(y, D);
        }, b.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, b.valueOf = function() {
          return this.$d.getTime();
        }, b.startOf = function(D, Y) {
          var y = this, O = !!S.u(Y) || Y, _ = S.p(D), m = function(oe, te) {
            var De = S.w(y.$u ? Date.UTC(y.$y, te, oe) : new Date(y.$y, te, oe), y);
            return O ? De : De.endOf(l);
          }, H = function(oe, te) {
            return S.w(y.toDate()[oe].apply(y.toDate("s"), (O ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(te)), y);
          }, j = this.$W, q = this.$M, K = this.$D, ne = "set" + (this.$u ? "UTC" : "");
          switch (_) {
            case W:
              return O ? m(1, 0) : m(31, 11);
            case d:
              return O ? m(1, q) : m(0, q + 1);
            case g:
              var he = this.$locale().weekStart || 0, re = (j < he ? j + 7 : j) - he;
              return m(O ? K - re : K + (6 - re), q);
            case l:
            case M:
              return H(ne + "Hours", 0);
            case c:
              return H(ne + "Minutes", 1);
            case i:
              return H(ne + "Seconds", 2);
            case s:
              return H(ne + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, b.endOf = function(D) {
          return this.startOf(D, !1);
        }, b.$set = function(D, Y) {
          var y, O = S.p(D), _ = "set" + (this.$u ? "UTC" : ""), m = (y = {}, y[l] = _ + "Date", y[M] = _ + "Date", y[d] = _ + "Month", y[W] = _ + "FullYear", y[c] = _ + "Hours", y[i] = _ + "Minutes", y[s] = _ + "Seconds", y[a] = _ + "Milliseconds", y)[O], H = O === l ? this.$D + (Y - this.$W) : Y;
          if (O === d || O === W) {
            var j = this.clone().set(M, 1);
            j.$d[m](H), j.init(), this.$d = j.set(M, Math.min(this.$D, j.daysInMonth())).$d;
          } else m && this.$d[m](H);
          return this.init(), this;
        }, b.set = function(D, Y) {
          return this.clone().$set(D, Y);
        }, b.get = function(D) {
          return this[S.p(D)]();
        }, b.add = function(D, Y) {
          var y, O = this;
          D = Number(D);
          var _ = S.p(Y), m = function(q) {
            var K = k(O);
            return S.w(K.date(K.date() + Math.round(q * D)), O);
          };
          if (_ === d) return this.set(d, this.$M + D);
          if (_ === W) return this.set(W, this.$y + D);
          if (_ === l) return m(1);
          if (_ === g) return m(7);
          var H = (y = {}, y[i] = r, y[c] = o, y[s] = n, y)[_] || 1, j = this.$d.getTime() + D * H;
          return S.w(j, this);
        }, b.subtract = function(D, Y) {
          return this.add(-1 * D, Y);
        }, b.format = function(D) {
          var Y = this, y = this.$locale();
          if (!this.isValid()) return y.invalidDate || $;
          var O = D || "YYYY-MM-DDTHH:mm:ssZ", _ = S.z(this), m = this.$H, H = this.$m, j = this.$M, q = y.weekdays, K = y.months, ne = y.meridiem, he = function(te, De, xe, we) {
            return te && (te[De] || te(Y, O)) || xe[De].slice(0, we);
          }, re = function(te) {
            return S.s(m % 12 || 12, te, "0");
          }, oe = ne || function(te, De, xe) {
            var we = te < 12 ? "AM" : "PM";
            return xe ? we.toLowerCase() : we;
          };
          return O.replace(F, (function(te, De) {
            return De || (function(xe) {
              switch (xe) {
                case "YY":
                  return String(Y.$y).slice(-2);
                case "YYYY":
                  return S.s(Y.$y, 4, "0");
                case "M":
                  return j + 1;
                case "MM":
                  return S.s(j + 1, 2, "0");
                case "MMM":
                  return he(y.monthsShort, j, K, 3);
                case "MMMM":
                  return he(K, j);
                case "D":
                  return Y.$D;
                case "DD":
                  return S.s(Y.$D, 2, "0");
                case "d":
                  return String(Y.$W);
                case "dd":
                  return he(y.weekdaysMin, Y.$W, q, 2);
                case "ddd":
                  return he(y.weekdaysShort, Y.$W, q, 3);
                case "dddd":
                  return q[Y.$W];
                case "H":
                  return String(m);
                case "HH":
                  return S.s(m, 2, "0");
                case "h":
                  return re(1);
                case "hh":
                  return re(2);
                case "a":
                  return oe(m, H, !0);
                case "A":
                  return oe(m, H, !1);
                case "m":
                  return String(H);
                case "mm":
                  return S.s(H, 2, "0");
                case "s":
                  return String(Y.$s);
                case "ss":
                  return S.s(Y.$s, 2, "0");
                case "SSS":
                  return S.s(Y.$ms, 3, "0");
                case "Z":
                  return _;
              }
              return null;
            })(te) || _.replace(":", "");
          }));
        }, b.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, b.diff = function(D, Y, y) {
          var O, _ = this, m = S.p(Y), H = k(D), j = (H.utcOffset() - this.utcOffset()) * r, q = this - H, K = function() {
            return S.m(_, H);
          };
          switch (m) {
            case W:
              O = K() / 12;
              break;
            case d:
              O = K();
              break;
            case N:
              O = K() / 3;
              break;
            case g:
              O = (q - j) / 6048e5;
              break;
            case l:
              O = (q - j) / 864e5;
              break;
            case c:
              O = q / o;
              break;
            case i:
              O = q / r;
              break;
            case s:
              O = q / n;
              break;
            default:
              O = q;
          }
          return y ? O : S.a(O);
        }, b.daysInMonth = function() {
          return this.endOf(d).$D;
        }, b.$locale = function() {
          return v[this.$L];
        }, b.locale = function(D, Y) {
          if (!D) return this.$L;
          var y = this.clone(), O = L(D, Y, !0);
          return O && (y.$L = O), y;
        }, b.clone = function() {
          return S.w(this.$d, this);
        }, b.toDate = function() {
          return new Date(this.valueOf());
        }, b.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, b.toISOString = function() {
          return this.$d.toISOString();
        }, b.toString = function() {
          return this.$d.toUTCString();
        }, E;
      })(), ie = ee.prototype;
      return k.prototype = ie, [["$ms", a], ["$s", s], ["$m", i], ["$H", c], ["$W", l], ["$M", d], ["$y", W], ["$D", M]].forEach((function(E) {
        ie[E[1]] = function(b) {
          return this.$g(b, E[0], E[1]);
        };
      })), k.extend = function(E, b) {
        return E.$i || (E(b, ee, k), E.$i = !0), k;
      }, k.locale = L, k.isDayjs = U, k.unix = function(E) {
        return k(1e3 * E);
      }, k.en = v[w], k.Ls = v, k.p = {}, k;
    }));
  })(Et)), Et.exports;
}
var ps = ys();
const bs = /* @__PURE__ */ ms(ps), Ft = (e) => {
  if (!e)
    return null;
  const t = bs(e);
  return t.isValid() ? t : null;
};
function xs({
  startDateUtc: e,
  endDateUtc: t,
  duration: n,
  unit: r,
  excludeEnabled: o,
  activeDateField: a,
  onStartDateChange: s,
  onEndDateChange: i,
  onDurationChange: c,
  onActiveFieldChange: l
}) {
  const g = Pe(null), [d, N] = X(0), [W, M] = X(
    () => Ft(e)
  ), [$, C] = X(
    () => Ft(t)
  ), [F, B] = X(!1), [f, p] = X(!1);
  Oe(() => {
    if (g.current) {
      const S = document.createElement("canvas").getContext("2d");
      if (S) {
        S.font = "14px system-ui, -apple-system, sans-serif";
        const ee = S.measureText(n.toString()).width;
        N(12 + ee + 4);
      }
    }
  }, [n]);
  const w = (k, S) => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: o ? "#f3f4f6" : k ? "#ffffff" : "#f9fafb",
      "& fieldset": {
        borderColor: S ? void 0 : k ? "#3b82f6" : void 0
      },
      "&:hover fieldset": {
        borderColor: S ? void 0 : k ? "#2563eb" : void 0
      },
      "&.Mui-focused": {
        backgroundColor: o ? "#f3f4f6" : "#ffffff"
      },
      "&.Mui-focused fieldset": {
        borderColor: S ? void 0 : "#3b82f6",
        boxShadow: S ? void 0 : "0 0 0 2px rgba(59,130,246,0.2)"
      },
      "&.Mui-error fieldset": {
        borderColor: "#d32f2f"
      },
      "&.Mui-error:hover fieldset": {
        borderColor: "#d32f2f"
      },
      "&.Mui-error.Mui-focused fieldset": {
        borderColor: "#d32f2f",
        boxShadow: "0 0 0 2px rgba(211,47,47,0.2)"
      },
      "&.Mui-disabled": {
        backgroundColor: "#f3f4f6"
      },
      "&.Mui-disabled fieldset": {
        borderColor: "#e5e7eb"
      }
    },
    "& .MuiOutlinedInput-input": {
      paddingTop: "10px",
      paddingBottom: "10px",
      color: o ? "#9ca3af" : void 0
    },
    "& .MuiInputLabel-root": {
      color: o ? "#9ca3af" : void 0
    }
  });
  Oe(() => {
    const k = Ft(e);
    M(k), (!e || k && k.isValid()) && B(!1);
  }, [e]), Oe(() => {
    const k = Ft(t);
    C(k), (!t || k && k.isValid()) && p(!1);
  }, [t]);
  const v = (k, S) => {
    M(k), S?.validationError == null && (k ? k.isValid() && s(k.format("YYYY-MM-DD")) : s(""));
  }, T = (k) => {
    B(k != null);
  }, U = (k, S) => {
    C(k), S?.validationError == null && (k ? k.isValid() && i(k.format("YYYY-MM-DD")) : i(""));
  }, L = (k) => {
    p(k != null);
  };
  return /* @__PURE__ */ h(Er, { dateAdapter: $r, children: /* @__PURE__ */ A("div", { className: "flex gap-3 pb-2 px-4 border-b border-gray-200", children: [
    /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${o ? "text-gray-400" : "text-[#61708F]"}`,
          children: "Start Date"
        }
      ),
      /* @__PURE__ */ h(
        mn,
        {
          value: W,
          onChange: v,
          onError: T,
          format: "DD/MM/YYYY",
          disabled: o,
          onFocus: () => l("start"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              error: F,
              // To ensure the height is reflected, use InputProps with sx for the input element
              InputProps: {
                sx: {
                  minHeight: "28px",
                  height: "28px",
                  maxHeight: "28px",
                  boxSizing: "border-box",
                  fontSize: "12px"
                }
              },
              sx: {
                ...w(
                  a === "start",
                  F
                ),
                width: "172px"
                // Do NOT specify height here, but ensure InputProps.sx sets the height
                // Optionally, you can add padding to control inner height if needed
              },
              disabled: o
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${o ? "text-gray-400" : "text-[#61708F]"}`,
          children: "End Date"
        }
      ),
      /* @__PURE__ */ h(
        mn,
        {
          value: $,
          onChange: U,
          onError: L,
          format: "DD/MM/YYYY",
          disabled: o,
          onFocus: () => l("end"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              error: f,
              // To ensure the height is reflected, use InputProps with sx for the input element
              InputProps: {
                sx: {
                  minHeight: "28px",
                  height: "28px",
                  maxHeight: "28px",
                  boxSizing: "border-box",
                  fontSize: "12px"
                }
              },
              sx: {
                ...w(
                  a === "end",
                  f
                ),
                width: "172px"
                // Do NOT specify height here, but ensure InputProps.sx sets the height
                // Optionally, you can add padding to control inner height if needed
              },
              disabled: o
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium ${o ? "text-gray-400" : "text-[#61708F]"} mb-1`,
          children: "Duration"
        }
      ),
      /* @__PURE__ */ A("div", { className: "relative", children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: g,
            type: "number",
            min: "1",
            value: n,
            onChange: (k) => c(Number(k.target.value)),
            disabled: o,
            className: `w-[120px] h-[28px] pl-3 pr-10 py-2 text-gray-500 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${o ? "bg-gray-100" : "bg-[#f9fafb]"}`
          }
        ),
        /* @__PURE__ */ h(
          "span",
          {
            className: `absolute top-1/2 -translate-y-1/2 text-[12px] pointer-events-none ${o ? "text-gray-300" : "text-gray-500"}`,
            style: { left: `${d}px` },
            children: cs(r)
          }
        )
      ] })
    ] })
  ] }) });
}
const Ds = ["day", "week", "month", "quarter"];
function ws({
  unit: e,
  excludeEnabled: t,
  onUnitChange: n
}) {
  return /* @__PURE__ */ h("div", { className: "flex gap-2 mb-2 justify-end border-b border-gray-200 pb-2 pr-4", children: Ds.map((r) => /* @__PURE__ */ h(
    "button",
    {
      onClick: () => n(r),
      disabled: t,
      className: `px-4 py-2 w-20 rounded-lg text-xs font-medium transition-colors ${t ? e === r ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8] opacity-60 cursor-not-allowed" : "bg-[#EBF0F9] text-gray-400 opacity-60 cursor-not-allowed border border-transparent" : e === r ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
      children: r.charAt(0).toUpperCase() + r.slice(1)
    },
    r
  )) });
}
const $n = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], In = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], vs = [
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
], Ms = "var(--adrp-container-height, min(468px, 85vh))", Vt = "var(--adrp-container-width, min(696px, 98vw))";
function ks({
  excludeEnabled: e,
  excludeFilterTypes: t,
  activeFilterView: n,
  excludedWeekdays: r,
  excludedSavedDates: o,
  excludedSpecificDates: a,
  excludedDateRanges: s,
  savedDatesSearchTerm: i,
  filteredSavedDates: c,
  onExcludeToggle: l,
  onFilterButtonClick: g,
  onRemoveFilterType: d,
  onCancel: N,
  onSave: W,
  onToggleWeekday: M,
  setSavedDatesSearchTerm: $,
  setExcludedSavedDates: C,
  setExcludedSpecificDates: F,
  setExcludedDateRanges: B,
  setExcludeFilterTypes: f,
  setActiveFilterView: p,
  savedDatesForFilter: w
}) {
  const [v, T] = X(!1), [U, L] = X(!1), k = Pe(null), S = Pe(null);
  Oe(() => {
    function m(H) {
      const j = H.target, q = k.current && k.current.contains(j), K = S.current && S.current.contains(j);
      !q && !K && T(!1);
    }
    return v && document.addEventListener("mousedown", m), () => {
      document.removeEventListener("mousedown", m);
    };
  }, [v]);
  const ee = Fe(() => {
    const m = /* @__PURE__ */ new Map();
    for (const H of w)
      m.set(H.id, H);
    return m;
  }, [w]), ie = $n.filter(
    (m) => r.includes(m.value)
  ), E = o.map((m) => ee.get(m)).filter((m) => !!m), b = (m) => {
    const H = /* @__PURE__ */ new Date(m.selection.startDateUtc + "T00:00:00"), j = /* @__PURE__ */ new Date(m.selection.endDateUtc + "T00:00:00"), q = {
      month: "short",
      day: "numeric",
      year: "numeric"
    }, K = H.toLocaleDateString("en-US", q), ne = j.toLocaleDateString("en-US", q);
    return K === ne ? K : `${K} - ${ne}`;
  }, D = (m) => {
    const H = b(m), j = m.label?.trim();
    return j && j.toLowerCase() !== H.toLowerCase() ? j : H;
  }, Y = (m) => {
    C((H) => {
      if (!H.includes(m))
        return H;
      const j = H.filter((q) => q !== m);
      return j.length === 0 && f(
        (q) => q.filter((K) => K !== "saved-dates")
      ), j;
    });
  }, y = (m) => {
    B((H) => {
      const j = H.filter((q) => q.id !== m);
      return j.length === 0 && f(
        (q) => q.filter((K) => K !== "date-range")
      ), j;
    });
  }, O = (m) => {
    F((H) => H.filter((j) => j !== m));
  }, _ = [
    ...ie.map((m) => ({
      id: `day-${m.value}`,
      label: In[m.value] ?? m.label,
      title: In[m.value] ?? m.label,
      onRemove: () => M(m.value)
    })),
    ...E.map((m) => ({
      id: `saved-${m.id}`,
      label: D(m),
      title: b(m),
      onRemove: () => Y(m.id)
    })),
    ...s.map((m) => ({
      id: `range-${m.id}`,
      label: `${m.start} - ${m.end}`,
      title: `${m.start} - ${m.end}`,
      onRemove: () => y(m.id)
    })),
    ...a.map((m) => ({
      id: `specific-${m}`,
      label: (/* @__PURE__ */ new Date(m + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      title: m,
      onRemove: () => O(m)
    }))
  ];
  return /* @__PURE__ */ A("div", { className: " border-b border-gray-200", children: [
    /* @__PURE__ */ A("div", { className: "py-2 flex items-center gap-3 px-4", children: [
      /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: "exclude-checkbox",
            checked: e,
            onChange: (m) => l(m.target.checked),
            className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          }
        ),
        /* @__PURE__ */ h(
          "label",
          {
            htmlFor: "exclude-checkbox",
            className: "text-sm font-medium text-[#1F1F1F]",
            children: "exclude"
          }
        )
      ] }),
      v && /* @__PURE__ */ h(
        "button",
        {
          ref: S,
          type: "button",
          onClick: () => {
            l(!0), T(!1), L(!0);
          },
          className: "text-sm font-medium text-blue-600 hover:text-blue-700 ml-auto",
          children: "Edit"
        }
      ),
      e && /* @__PURE__ */ A(ct, { children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2 relative", children: [
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              onClick: () => g("days"),
              style: { width: "80px", height: "24px" },
              className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "days" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
              children: [
                /* @__PURE__ */ h("span", { children: "weeks" }),
                /* @__PURE__ */ h(Rt, { className: "w-4 h-4 text-gray-400" })
              ]
            }
          ),
          n === "days" && t.includes("days") && /* @__PURE__ */ h("div", { className: "absolute w-12 h-[264px] top-full left-7 mt-1 z-20", children: /* @__PURE__ */ h("div", { className: "flex flex-col gap-3 px-2 py-2 bg-white border border-[0.5px]  border-gray-200 rounded-lg", children: /* @__PURE__ */ h("div", { className: "flex justify-center", children: /* @__PURE__ */ h("div", { className: "inline-flex flex-col items-center gap-2 ", children: $n.map((m) => {
            const H = r.includes(
              m.value
            );
            return /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M(m.value),
                className: `w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${H ? "bg-[#CEDBF5] shadow-inner" : "text-gray-800 hover:bg-gray-100"}`,
                children: m.label.charAt(0)
              },
              m.value
            );
          }) }) }) }) }),
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              onClick: () => g("saved-dates"),
              style: { width: "80px", height: "24px" },
              className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "saved-dates" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
              children: [
                /* @__PURE__ */ h("span", { children: "Saved" }),
                /* @__PURE__ */ h(Rt, { className: "w-4 h-4 text-gray-400" })
              ]
            }
          ),
          e && n === "saved-dates" && t.includes("saved-dates") && /* @__PURE__ */ h("div", { className: "absolute top-full left-0 mt-2 z-20 w-80 max-h-64", children: /* @__PURE__ */ A("div", { className: "flex flex-col gap-3 px-4 py-4 bg-white rounded-xl shadow-xl", children: [
            /* @__PURE__ */ A("div", { className: "relative h-7 w-72 flex items-center", children: [
              /* @__PURE__ */ h(Gr, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: "text",
                  value: i,
                  onChange: (m) => $(m.target.value),
                  placeholder: "Search saved dates",
                  className: "w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            c.length === 0 ? /* @__PURE__ */ h("p", { className: "text-sm text-gray-500 text-center py-6", children: "No saved dates found" }) : /* @__PURE__ */ h("div", { className: "max-h-64 overflow-y-auto space-y-2", children: c.map((m) => {
              const H = o.includes(
                m.id
              ), j = (/* @__PURE__ */ new Date(
                m.selection.startDateUtc + "T00:00:00"
              )).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              }), q = (/* @__PURE__ */ new Date(
                m.selection.endDateUtc + "T00:00:00"
              )).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
              return /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    C((K) => {
                      if (K.includes(m.id)) {
                        const ne = K.filter(
                          (he) => he !== m.id
                        );
                        return ne.length === 0 && f(
                          (he) => he.filter(
                            (re) => re !== "saved-dates"
                          )
                        ), ne;
                      }
                      return f((ne) => ne.includes("saved-dates") ? ne : [...ne, "saved-dates"]), [...K, m.id];
                    });
                  },
                  className: `w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${H ? "bg-[#CEDBF5] " : "bg-white  hover:bg-gray-50"}`,
                  children: /* @__PURE__ */ A("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ h("span", { className: "text-xs font-semibold text-gray-900", children: m.label }),
                    /* @__PURE__ */ A("span", { className: "text-[10px] font-medium text-gray-600", children: [
                      j,
                      " - ",
                      q
                    ] })
                  ] })
                },
                m.id
              );
            }) })
          ] }) })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2 ml-auto h-7", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => {
                N(), p(null);
              },
              className: "px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => {
                W(), p(null);
              },
              className: "px-4 h-7 flex items-center py-2 bg-[#003DB8] text-white text-xs font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors",
              children: "Save Exclusion"
            }
          )
        ] })
      ] })
    ] }),
    _.length > 0 && /* @__PURE__ */ A("div", { className: "w-full border-t border-gray-200 py-3 px-4 relative", children: [
      /* @__PURE__ */ A("div", { className: "flex items-center w-full", children: [
        /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-2 flex-1", children: (e || v ? _ : _.slice(0, 4)).map((m) => /* @__PURE__ */ A(
          "span",
          {
            className: "inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700",
            title: m.title,
            children: [
              m.label,
              e && /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  onClick: m.onRemove,
                  className: "text-gray-400 hover:text-gray-600 transition-colors",
                  "aria-label": `Remove ${m.label}`,
                  children: /* @__PURE__ */ h(to, { className: "h-2.5 w-2.5" })
                }
              )
            ]
          },
          m.id
        )) }),
        !e && !v && _.length > 4 && /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            onClick: () => T(!0),
            className: "text-sm text-[#5F6B7C] hover:text-gray-900 font-normal flex items-center gap-1 ml-auto whitespace-nowrap",
            children: [
              "more ",
              /* @__PURE__ */ h(Rt, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      v && !e && // Only show expanded card if NOT enabled (read-only view)
      /* @__PURE__ */ h(
        "div",
        {
          ref: k,
          className: "absolute top-0 left-0 w-full min-h-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded-lg",
          children: /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-2", children: _.map((m) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700",
              title: m.title,
              children: m.label
            },
            m.id
          )) })
        }
      )
    ] })
  ] });
}
function Ns(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Ss = {}, Mt = {};
function et(e, t) {
  try {
    const r = (Ss[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in Mt ? Mt[r] : Bn(r, r.split(":"));
  } catch {
    if (e in Mt) return Mt[e];
    const n = e?.match(Cs);
    return n ? Bn(e, n.slice(1)) : NaN;
  }
}
const Cs = /([+-]\d\d):?(\d\d)?/;
function Bn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return Mt[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Be extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(et(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), yr(this), sn(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Be(...n, t) : new Be(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Be(+this, t);
  }
  getTimezoneOffset() {
    const t = -et(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), sn(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Be(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Pn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Pn.test(e)) return;
  const t = e.replace(Pn, "$1UTC");
  Be.prototype[t] && (e.startsWith("get") ? Be.prototype[e] = function() {
    return this.internal[t]();
  } : (Be.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Ts(this), +this;
  }, Be.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), sn(this), +this;
  }));
});
function sn(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-et(e.timeZone, e) * 60));
}
function Ts(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), yr(e);
}
function yr(e) {
  const t = et(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const g = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(et(e.timeZone, e) * 60)) % 60;
  (d || g) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + g));
  const N = et(e.timeZone, e), W = N > 0 ? Math.floor(N) : Math.ceil(N), $ = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - W, C = W !== n, F = $ - c;
  if (C && F) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + F);
    const B = et(e.timeZone, e), f = B > 0 ? Math.floor(B) : Math.ceil(B), p = W - f;
    p && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + p), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + p));
  }
}
class Me extends Be {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Me(...n, t) : new Me(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + o;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, o] = this.internal.toUTCString().split(" ");
    return `${t?.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${Ns(this.timeZone, this)})`;
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
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, o];
  }
  //#endregion
  withTimeZone(t) {
    return new Me(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Me(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Un = 5, Os = 4;
function Ws(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, Un * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? Un : Os;
}
function pr(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Ys(e, t) {
  const n = pr(e, t), r = Ws(e, t);
  return t.addDays(n, r * 7 - 1);
}
class We {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Me.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, a) => this.overrides?.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Me(r, o, a, this.options.timeZone) : new Date(r, o, a), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : ge(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : He(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : ln(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : ao(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : cn(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : er(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : go(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : po(r), a = new Set(o.map((i) => this.getYear(i)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((i) => {
        s.push(new Date(i, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Ys(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : bo(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : dt(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : ar(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : yo(r), this.format = (r, o, a) => {
      const s = this.overrides?.format ? this.overrides.format(r, o, this.options) : ha(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : sr(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ve(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ye(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : cr(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : ya(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : pa(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Vn(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : co(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : ba(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : xa(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : so(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : io(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : St(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : tt(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : pr(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Nt(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : kt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Ce(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : be(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : un(r), this.options = { locale: fn, ...t }, this.overrides = n;
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
    for (let o = 0; o < 10; o++)
      r[o.toString()] = n.format(o);
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
    return t && We.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n?.code;
    if (a && We.yearFirstLocales.has(a))
      try {
        return new Intl.DateTimeFormat(a, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const s = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, s);
  }
}
We.yearFirstLocales = /* @__PURE__ */ new Set([
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
const Ue = new We();
class br {
  constructor(t, n, r = Ue) {
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
class _s {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Fs {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Es(e) {
  return P.createElement("button", { ...e });
}
function $s(e) {
  return P.createElement("span", { ...e });
}
function Is(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    P.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && P.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && P.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && P.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && P.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Bs(e) {
  const { day: t, modifiers: n, ...r } = e;
  return P.createElement("td", { ...r });
}
function Ps(e) {
  const { day: t, modifiers: n, ...r } = e, o = P.useRef(null);
  return P.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), P.createElement("button", { ref: o, ...r });
}
var R;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(R || (R = {}));
var me;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(me || (me = {}));
var Ee;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ee || (Ee = {}));
var Te;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Te || (Te = {}));
function Us(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[R.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === a.value);
  return P.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[R.DropdownRoot] },
    P.createElement(r.Select, { className: s, ...a }, t?.map(({ value: c, label: l, disabled: g }) => P.createElement(r.Option, { key: c, value: c, disabled: g }, l))),
    P.createElement(
      "span",
      { className: o[R.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      P.createElement(r.Chevron, { orientation: "down", size: 18, className: o[R.Chevron] })
    )
  );
}
function As(e) {
  return P.createElement("div", { ...e });
}
function Hs(e) {
  return P.createElement("div", { ...e });
}
function js(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r }, e.children);
}
function Rs(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r });
}
function Ls(e) {
  return P.createElement("table", { ...e });
}
function qs(e) {
  return P.createElement("div", { ...e });
}
const xr = Yr(void 0);
function Tt() {
  const e = _r(xr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function zs(e) {
  const { components: t } = Tt();
  return P.createElement(t.Dropdown, { ...e });
}
function Zs(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: l } } = Tt(), g = J((N) => {
    o && n?.(N);
  }, [o, n]), d = J((N) => {
    r && t?.(N);
  }, [r, t]);
  return P.createElement(
    "nav",
    { ...a },
    P.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[R.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      P.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[R.Chevron], orientation: "left" })
    ),
    P.createElement(
      s.NextMonthButton,
      { type: "button", className: i[R.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: g },
      P.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[R.Chevron] })
    )
  );
}
function Qs(e) {
  const { components: t } = Tt();
  return P.createElement(t.Button, { ...e });
}
function Gs(e) {
  return P.createElement("option", { ...e });
}
function Ks(e) {
  const { components: t } = Tt();
  return P.createElement(t.Button, { ...e });
}
function Xs(e) {
  const { rootRef: t, ...n } = e;
  return P.createElement("div", { ...n, ref: t });
}
function Js(e) {
  return P.createElement("select", { ...e });
}
function Vs(e) {
  const { week: t, ...n } = e;
  return P.createElement("tr", { ...n });
}
function ei(e) {
  return P.createElement("th", { ...e });
}
function ti(e) {
  return P.createElement(
    "thead",
    { "aria-hidden": !0 },
    P.createElement("tr", { ...e })
  );
}
function ni(e) {
  const { week: t, ...n } = e;
  return P.createElement("th", { ...n });
}
function ri(e) {
  return P.createElement("th", { ...e });
}
function oi(e) {
  return P.createElement("tbody", { ...e });
}
function ai(e) {
  const { components: t } = Tt();
  return P.createElement(t.Dropdown, { ...e });
}
const si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Es,
  CaptionLabel: $s,
  Chevron: Is,
  Day: Bs,
  DayButton: Ps,
  Dropdown: Us,
  DropdownNav: As,
  Footer: Hs,
  Month: js,
  MonthCaption: Rs,
  MonthGrid: Ls,
  Months: qs,
  MonthsDropdown: zs,
  Nav: Zs,
  NextMonthButton: Qs,
  Option: Gs,
  PreviousMonthButton: Ks,
  Root: Xs,
  Select: Js,
  Week: Vs,
  WeekNumber: ni,
  WeekNumberHeader: ri,
  Weekday: ei,
  Weekdays: ti,
  Weeks: oi,
  YearsDropdown: ai
}, Symbol.toStringTag, { value: "Module" }));
function je(e, t, n = !1, r = Ue) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Dr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function hn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function wr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function vr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Mr(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function kr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Re(e, t, n = Ue) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (kr(i, n))
      return i.includes(e);
    if (hn(i))
      return je(i, e, !1, n);
    if (Mr(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Dr(i)) {
      const c = a(i.before, e), l = a(i.after, e), g = c > 0, d = l < 0;
      return s(i.before, i.after) ? d && g : g || d;
    }
    return wr(i) ? a(e, i.after) > 0 : vr(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ii(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: g } = t, { isSameDay: d, isSameMonth: N, startOfMonth: W, isBefore: M, endOfMonth: $, isAfter: C } = o, F = n && W(n), B = r && $(r), f = {
    [me.focused]: [],
    [me.outside]: [],
    [me.disabled]: [],
    [me.hidden]: [],
    [me.today]: []
  }, p = {};
  for (const w of e) {
    const { date: v, displayMonth: T } = w, U = !!(T && !N(v, T)), L = !!(F && M(v, F)), k = !!(B && C(v, B)), S = !!(a && Re(v, a, o)), ee = !!(s && Re(v, s, o)) || L || k || // Broadcast calendar will show outside days as default
    !l && !c && U || l && c === !1 && U, ie = d(v, g ?? o.today());
    U && f.outside.push(w), S && f.disabled.push(w), ee && f.hidden.push(w), ie && f.today.push(w), i && Object.keys(i).forEach((E) => {
      const b = i?.[E];
      b && Re(v, b, o) && (p[E] ? p[E].push(w) : p[E] = [w]);
    });
  }
  return (w) => {
    const v = {
      [me.focused]: !1,
      [me.disabled]: !1,
      [me.hidden]: !1,
      [me.outside]: !1,
      [me.today]: !1
    }, T = {};
    for (const U in f) {
      const L = f[U];
      v[U] = L.some((k) => k === w);
    }
    for (const U in p)
      T[U] = p[U].some((L) => L === w);
    return {
      ...v,
      // custom modifiers should override all the previous ones
      ...T
    };
  };
}
function ci(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[me[a]] ? o.push(t[me[a]]) : t[Ee[a]] && o.push(t[Ee[a]]), o), [t[R.Day]]);
}
function li(e) {
  return {
    ...si,
    ...e
  };
}
function di(e) {
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
function ui() {
  const e = {};
  for (const t in R)
    e[R[t]] = `rdp-${R[t]}`;
  for (const t in me)
    e[me[t]] = `rdp-${me[t]}`;
  for (const t in Ee)
    e[Ee[t]] = `rdp-${Ee[t]}`;
  for (const t in Te)
    e[Te[t]] = `rdp-${Te[t]}`;
  return e;
}
function Nr(e, t, n) {
  return (n ?? new We(t)).formatMonthYear(e);
}
const fi = Nr;
function hi(e, t, n) {
  return (n ?? new We(t)).format(e, "d");
}
function mi(e, t = Ue) {
  return t.format(e, "LLLL");
}
function gi(e, t, n) {
  return (n ?? new We(t)).format(e, "cccccc");
}
function yi(e, t = Ue) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function pi() {
  return "";
}
function Sr(e, t = Ue) {
  return t.format(e, "yyyy");
}
const bi = Sr, xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Nr,
  formatDay: hi,
  formatMonthCaption: fi,
  formatMonthDropdown: mi,
  formatWeekNumber: yi,
  formatWeekNumberHeader: pi,
  formatWeekdayName: gi,
  formatYearCaption: bi,
  formatYearDropdown: Sr
}, Symbol.toStringTag, { value: "Module" }));
function Di(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...xi,
    ...e
  };
}
function wi(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((N) => {
    const W = r.formatMonthDropdown(N, o), M = l(N), $ = t && N < a(t) || n && N > a(n) || !1;
    return { value: M, label: W, disabled: $ };
  });
}
function vi(e, t = {}, n = {}) {
  let r = { ...t?.[R.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Mi(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function ki(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, l = a(e), g = s(t), d = i({ start: l, end: g });
  return o && d.reverse(), d.map((N) => {
    const W = n.formatYearDropdown(N, r);
    return {
      value: c(N),
      label: W,
      disabled: !1
    };
  });
}
function Cr(e, t, n, r) {
  let o = (r ?? new We(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Ni = Cr;
function Tr(e, t, n) {
  return (n ?? new We(t)).formatMonthYear(e);
}
const Si = Tr;
function Ci(e, t, n, r) {
  let o = (r ?? new We(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function Ti(e) {
  return "Choose the Month";
}
function Oi() {
  return "";
}
function Wi(e) {
  return "Go to the Next Month";
}
function Yi(e) {
  return "Go to the Previous Month";
}
function _i(e, t, n) {
  return (n ?? new We(t)).format(e, "cccc");
}
function Fi(e, t) {
  return `Week ${e}`;
}
function Ei(e) {
  return "Week Number";
}
function $i(e) {
  return "Choose the Year";
}
const Ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Si,
  labelDay: Ni,
  labelDayButton: Cr,
  labelGrid: Tr,
  labelGridcell: Ci,
  labelMonthDropdown: Ti,
  labelNav: Oi,
  labelNext: Wi,
  labelPrevious: Yi,
  labelWeekNumber: Fi,
  labelWeekNumberHeader: Ei,
  labelWeekday: _i,
  labelYearDropdown: $i
}, Symbol.toStringTag, { value: "Module" })), Ot = (e) => e instanceof HTMLElement ? e : null, en = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Bi = (e) => Ot(e.querySelector("[data-animated-month]")), tn = (e) => Ot(e.querySelector("[data-animated-caption]")), nn = (e) => Ot(e.querySelector("[data-animated-weeks]")), Pi = (e) => Ot(e.querySelector("[data-animated-nav]")), Ui = (e) => Ot(e.querySelector("[data-animated-weekdays]"));
function Ai(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = Pe(null), i = Pe(r), c = Pe(!1);
  Fr(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const g = a.isSameMonth(r[0].date, l[0].date), d = a.isAfter(r[0].date, l[0].date), N = d ? n[Te.caption_after_enter] : n[Te.caption_before_enter], W = d ? n[Te.weeks_after_enter] : n[Te.weeks_before_enter], M = s.current, $ = e.current.cloneNode(!0);
    if ($ instanceof HTMLElement ? (en($).forEach((f) => {
      if (!(f instanceof HTMLElement))
        return;
      const p = Bi(f);
      p && f.contains(p) && f.removeChild(p);
      const w = tn(f);
      w && w.classList.remove(N);
      const v = nn(f);
      v && v.classList.remove(W);
    }), s.current = $) : s.current = null, c.current || g || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const C = M instanceof HTMLElement ? en(M) : [], F = en(e.current);
    if (F?.every((B) => B instanceof HTMLElement) && C && C.every((B) => B instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const B = Pi(e.current);
      B && (B.style.zIndex = "1"), F.forEach((f, p) => {
        const w = C[p];
        if (!w)
          return;
        f.style.position = "relative", f.style.overflow = "hidden";
        const v = tn(f);
        v && v.classList.add(N);
        const T = nn(f);
        T && T.classList.add(W);
        const U = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), B && (B.style.zIndex = ""), v && v.classList.remove(N), T && T.classList.remove(W), f.style.position = "", f.style.overflow = "", f.contains(w) && f.removeChild(w);
        };
        w.style.pointerEvents = "none", w.style.position = "absolute", w.style.overflow = "hidden", w.setAttribute("aria-hidden", "true");
        const L = Ui(w);
        L && (L.style.opacity = "0");
        const k = tn(w);
        k && (k.classList.add(d ? n[Te.caption_before_exit] : n[Te.caption_after_exit]), k.addEventListener("animationend", U));
        const S = nn(w);
        S && S.classList.add(d ? n[Te.weeks_before_exit] : n[Te.weeks_after_exit]), f.insertBefore(w, f.firstChild);
      });
    }
  });
}
function Hi(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: g, differenceInCalendarMonths: d, endOfBroadcastWeek: N, endOfISOWeek: W, endOfMonth: M, endOfWeek: $, isAfter: C, startOfBroadcastWeek: F, startOfISOWeek: B, startOfWeek: f } = r, p = c ? F(o, r) : s ? B(o) : f(o), w = c ? N(a) : s ? W(M(a)) : $(M(a)), v = g(w, p), T = d(a, o) + 1, U = [];
  for (let S = 0; S <= v; S++) {
    const ee = l(p, S);
    if (t && C(ee, t))
      break;
    U.push(ee);
  }
  const k = (c ? 35 : 42) * T;
  if (i && U.length < k) {
    const S = k - U.length;
    for (let ee = 0; ee < S; ee++) {
      const ie = l(U[U.length - 1], 1);
      U.push(ie);
    }
  }
  return U;
}
function ji(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Ri(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function An(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: l, addMonths: g, startOfMonth: d } = r;
  if (n && l(n, c) < i - 1) {
    const N = -1 * (i - 1);
    c = g(n, N);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function Li(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: g, startOfBroadcastWeek: d, startOfISOWeek: N, startOfWeek: W } = r, M = e.reduce(($, C) => {
    const F = n.broadcastCalendar ? d(C, r) : n.ISOWeek ? N(C) : W(C), B = n.broadcastCalendar ? a(C) : n.ISOWeek ? s(i(C)) : c(i(C)), f = t.filter((T) => T >= F && T <= B), p = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && f.length < p) {
      const T = t.filter((U) => {
        const L = p - f.length;
        return U > B && U <= o(B, L);
      });
      f.push(...T);
    }
    const w = f.reduce((T, U) => {
      const L = n.ISOWeek ? l(U) : g(U), k = T.find((ee) => ee.weekNumber === L), S = new br(U, C, r);
      return k ? k.days.push(S) : T.push(new Fs(L, [S])), T;
    }, []), v = new _s(C, w);
    return $.push(v), $;
  }, []);
  return n.reverseMonths ? M.reverse() : M;
}
function qi(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: l, newDate: g, today: d } = t, { fromYear: N, toYear: W, fromMonth: M, toMonth: $ } = e;
  !n && M && (n = M), !n && N && (n = t.newDate(N, 0, 1)), !r && $ && (r = $), !r && W && (r = g(W, 11, 31));
  const C = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : N ? n = g(N, 0, 1) : !n && C && (n = o(c(e.today ?? d(), -100))), r ? r = i(r) : W ? r = g(W, 11, 31) : !r && C && (r = l(e.today ?? d())), [
    n && a(n),
    r && a(r)
  ];
}
function zi(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a : 1, g = s(e);
  if (!t)
    return i(g, l);
  if (!(c(t, e) < a))
    return i(g, l);
}
function Zi(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? a ?? 1 : 1, g = s(e);
  if (!t)
    return i(g, -l);
  if (!(c(g, t) <= 0))
    return i(g, -l);
}
function Qi(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function It(e, t) {
  const [n, r] = X(e);
  return [t === void 0 ? n : t, r];
}
function Gi(e, t) {
  const [n, r] = qi(e, t), { startOfMonth: o, endOfMonth: a } = t, s = An(e, n, r, t), [i, c] = It(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Oe(() => {
    const v = An(e, n, r, t);
    c(v);
  }, [e.timeZone]);
  const l = Ri(i, r, e, t), g = Hi(l, e.endMonth ? a(e.endMonth) : void 0, e, t), d = Li(l, g, e, t), N = Qi(d), W = ji(d), M = Zi(i, n, e, t), $ = zi(i, r, e, t), { disableNavigation: C, onMonthChange: F } = e, B = (v) => N.some((T) => T.days.some((U) => U.isEqualTo(v))), f = (v) => {
    if (C)
      return;
    let T = o(v);
    n && T < o(n) && (T = o(n)), r && T > o(r) && (T = o(r)), c(T), F?.(T);
  };
  return {
    months: d,
    weeks: N,
    days: W,
    navStart: n,
    navEnd: r,
    previousMonth: M,
    nextMonth: $,
    goToMonth: f,
    goToDay: (v) => {
      B(v) || f(v.date);
    }
  };
}
var Ie;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ie || (Ie = {}));
function Hn(e) {
  return !e[me.disabled] && !e[me.hidden] && !e[me.outside];
}
function Ki(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Hn(i) && (i[me.focused] && a < Ie.FocusedModifier ? (o = s, a = Ie.FocusedModifier) : r?.isEqualTo(s) && a < Ie.LastFocused ? (o = s, a = Ie.LastFocused) : n(s.date) && a < Ie.Selected ? (o = s, a = Ie.Selected) : i[me.today] && a < Ie.Today && (o = s, a = Ie.Today));
  }
  return o || (o = e.find((s) => Hn(t(s)))), o;
}
function Xi(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: l, addMonths: g, addWeeks: d, addYears: N, endOfBroadcastWeek: W, endOfISOWeek: M, endOfWeek: $, max: C, min: F, startOfBroadcastWeek: B, startOfISOWeek: f, startOfWeek: p } = s;
  let v = {
    day: l,
    week: d,
    month: g,
    year: N,
    startOfWeek: (T) => c ? B(T, s) : i ? f(T) : p(T),
    endOfWeek: (T) => c ? W(T) : i ? M(T) : $(T)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? v = C([r, v]) : t === "after" && o && (v = F([o, v])), v;
}
function Or(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = Xi(e, t, n.date, r, o, a, s), l = !!(a.disabled && Re(c, a.disabled, s)), g = !!(a.hidden && Re(c, a.hidden, s)), d = c, N = new br(c, d, s);
  return !l && !g ? N : Or(e, t, N, r, o, a, s, i + 1);
}
function Ji(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = X(), c = Ki(t.days, n, r || (() => !1), s), [l, g] = X(a ? c : void 0);
  return {
    isFocusTarget: ($) => !!c?.isEqualTo($),
    setFocused: g,
    focused: l,
    blur: () => {
      i(l), g(void 0);
    },
    moveFocus: ($, C) => {
      if (!l)
        return;
      const F = Or($, C, l, t.navStart, t.navEnd, e, o);
      F && (e.disableNavigation && !t.days.some((f) => f.isEqualTo(F)) || (t.goToDay(F), g(F)));
    }
  };
}
function Vi(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = It(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, l = (W) => i?.some((M) => c(M, W)) ?? !1, { min: g, max: d } = e;
  return {
    selected: i,
    select: (W, M, $) => {
      let C = [...i ?? []];
      if (l(W)) {
        if (i?.length === g || r && i?.length === 1)
          return;
        C = i?.filter((F) => !c(F, W));
      } else
        i?.length === d ? C = [W] : C = [...C, W];
      return o || s(C), o?.(C, W, M, $), C;
    },
    isSelected: l
  };
}
function ec(e, t, n = 0, r = 0, o = !1, a = Ue) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: g } = a;
  let d;
  if (!s && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? d = { from: s, to: e } : o ? d = { from: s, to: void 0 } : d = void 0 : g(e, s) ? d = { from: e, to: s } : d = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? d = { from: s, to: i } : d = void 0;
    else if (c(s, e))
      d = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (g(e, s))
      d = { from: e, to: i };
    else if (l(e, s))
      d = { from: s, to: e };
    else if (l(e, i))
      d = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const N = a.differenceInCalendarDays(d.to, d.from);
    r > 0 && N > r ? d = { from: e, to: void 0 } : n > 1 && N < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function tc(e, t, n = Ue) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), s = Math.min(a, 6);
  for (let i = 0; i <= s; i++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function jn(e, t, n = Ue) {
  return je(e, t.from, !1, n) || je(e, t.to, !1, n) || je(t, e.from, !1, n) || je(t, e.to, !1, n);
}
function nc(e, t, n = Ue) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? je(e, i, !1, n) : kr(i, n) ? i.some((c) => je(e, c, !1, n)) : hn(i) ? i.from && i.to ? jn(e, { from: i.from, to: i.to }, n) : !1 : Mr(i) ? tc(e, i.dayOfWeek, n) : Dr(i) ? n.isAfter(i.before, i.after) ? jn(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Re(e.from, i, n) || Re(e.to, i, n) : wr(i) || vr(i) ? Re(e.from, i, n) || Re(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (s.some((g) => g(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function rc(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = It(o, s ? o : void 0), l = s ? o : i;
  return {
    selected: l,
    select: (N, W, M) => {
      const { min: $, max: C } = e, F = N ? ec(N, l, $, C, a, t) : void 0;
      return r && n && F?.from && F.to && nc({ from: F.from, to: F.to }, n, t) && (F.from = N, F.to = void 0), s || c(F), s?.(F, N, W, M), F;
    },
    isSelected: (N) => l && je(l, N, !1, t)
  };
}
function oc(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = It(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, N, W) => {
      let M = d;
      return !r && i && i && c(d, i) && (M = void 0), o || s(M), o?.(M, d, N, W), M;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function ac(e, t) {
  const n = oc(e, t), r = Vi(e, t), o = rc(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return o;
    default:
      return;
  }
}
function it(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Me(t.today, t.timeZone)), t.month && (t.month = new Me(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Me(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Me(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Me(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Me(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((Z) => new Me(Z, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Me(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Me(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = Fe(() => {
    const Z = { ...fn, ...t.locale };
    return {
      dateLib: new We({
        locale: Z,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: li(t.components),
      formatters: Di(t.formatters),
      labels: { ...Ii, ...t.labels },
      locale: Z,
      classNames: { ...ui(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: g, numberOfMonths: d = 1, onDayBlur: N, onDayClick: W, onDayFocus: M, onDayKeyDown: $, onDayMouseEnter: C, onDayMouseLeave: F, onNextClick: B, onPrevClick: f, showWeekNumber: p, styles: w } = t, { formatCaption: v, formatDay: T, formatMonthDropdown: U, formatWeekNumber: L, formatWeekNumberHeader: k, formatWeekdayName: S, formatYearDropdown: ee } = r, ie = Gi(t, a), { days: E, months: b, navStart: D, navEnd: Y, previousMonth: y, nextMonth: O, goToMonth: _ } = ie, m = ii(E, t, D, Y, a), { isSelected: H, select: j, selected: q } = ac(t, a) ?? {}, { blur: K, focused: ne, isFocusTarget: he, moveFocus: re, setFocused: oe } = Ji(t, ie, m, H ?? (() => !1), a), { labelDayButton: te, labelGridcell: De, labelGrid: xe, labelMonthDropdown: we, labelNav: qe, labelPrevious: ut, labelNext: ze, labelWeekday: ft, labelWeekNumber: ht, labelWeekNumberHeader: Ge, labelYearDropdown: Ae } = o, Ye = Fe(() => Mi(a, t.ISOWeek), [a, t.ISOWeek]), nt = l !== void 0 || W !== void 0, Ke = J(() => {
    y && (_(y), f?.(y));
  }, [y, _, f]), Xe = J(() => {
    O && (_(O), B?.(O));
  }, [_, O, B]), mt = J((Z, fe) => (G) => {
    G.preventDefault(), G.stopPropagation(), oe(Z), j?.(Z.date, fe, G), W?.(Z.date, fe, G);
  }, [j, W, oe]), gt = J((Z, fe) => (G) => {
    oe(Z), M?.(Z.date, fe, G);
  }, [M, oe]), yt = J((Z, fe) => (G) => {
    K(), N?.(Z.date, fe, G);
  }, [K, N]), ve = J((Z, fe) => (G) => {
    const de = {
      ArrowLeft: [
        G.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        G.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [G.shiftKey ? "year" : "week", "after"],
      ArrowUp: [G.shiftKey ? "year" : "week", "before"],
      PageUp: [G.shiftKey ? "year" : "month", "before"],
      PageDown: [G.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (de[G.key]) {
      G.preventDefault(), G.stopPropagation();
      const [ke, se] = de[G.key];
      re(ke, se);
    }
    $?.(Z.date, fe, G);
  }, [re, $, t.dir]), pt = J((Z, fe) => (G) => {
    C?.(Z.date, fe, G);
  }, [C]), bt = J((Z, fe) => (G) => {
    F?.(Z.date, fe, G);
  }, [F]), xt = J((Z) => (fe) => {
    const G = Number(fe.target.value), de = a.setMonth(a.startOfMonth(Z), G);
    _(de);
  }, [a, _]), rt = J((Z) => (fe) => {
    const G = Number(fe.target.value), de = a.setYear(a.startOfMonth(Z), G);
    _(de);
  }, [a, _]), { className: Bt, style: Pt } = Fe(() => ({
    className: [i[R.Root], t.className].filter(Boolean).join(" "),
    style: { ...w?.[R.Root], ...t.style }
  }), [i, t.className, t.style, w]), Ut = di(t), Wt = Pe(null);
  Ai(Wt, !!t.animate, {
    classNames: i,
    months: b,
    focused: ne,
    dateLib: a
  });
  const At = {
    dayPickerProps: t,
    selected: q,
    select: j,
    isSelected: H,
    months: b,
    nextMonth: O,
    previousMonth: y,
    goToMonth: _,
    getModifiers: m,
    components: n,
    classNames: i,
    styles: w,
    labels: o,
    formatters: r
  };
  return P.createElement(
    xr.Provider,
    { value: At },
    P.createElement(
      n.Root,
      { rootRef: t.animate ? Wt : void 0, className: Bt, style: Pt, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Ut },
      P.createElement(
        n.Months,
        { className: i[R.Months], style: w?.[R.Months] },
        !t.hideNavigation && !g && P.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[R.Nav], style: w?.[R.Nav], "aria-label": qe(), onPreviousClick: Ke, onNextClick: Xe, previousMonth: y, nextMonth: O }),
        b.map((Z, fe) => P.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[R.Month],
            style: w?.[R.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: fe,
            displayIndex: fe,
            calendarMonth: Z
          },
          g === "around" && !t.hideNavigation && fe === 0 && P.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[R.PreviousMonthButton], tabIndex: y ? void 0 : -1, "aria-disabled": y ? void 0 : !0, "aria-label": ut(y), onClick: Ke, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(n.Chevron, { disabled: y ? void 0 : !0, className: i[R.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          P.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[R.MonthCaption], style: w?.[R.MonthCaption], calendarMonth: Z, displayIndex: fe }, c?.startsWith("dropdown") ? P.createElement(
            n.DropdownNav,
            { className: i[R.Dropdowns], style: w?.[R.Dropdowns] },
            (() => {
              const G = c === "dropdown" || c === "dropdown-months" ? P.createElement(n.MonthsDropdown, { key: "month", className: i[R.MonthsDropdown], "aria-label": we(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: xt(Z.date), options: wi(Z.date, D, Y, r, a), style: w?.[R.Dropdown], value: a.getMonth(Z.date) }) : P.createElement("span", { key: "month" }, U(Z.date, a)), de = c === "dropdown" || c === "dropdown-years" ? P.createElement(n.YearsDropdown, { key: "year", className: i[R.YearsDropdown], "aria-label": Ae(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: rt(Z.date), options: ki(D, Y, r, a, !!t.reverseYears), style: w?.[R.Dropdown], value: a.getYear(Z.date) }) : P.createElement("span", { key: "year" }, ee(Z.date, a));
              return a.getMonthYearOrder() === "year-first" ? [de, G] : [G, de];
            })(),
            P.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, v(Z.date, a.options, a))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            P.createElement(n.CaptionLabel, { className: i[R.CaptionLabel], role: "status", "aria-live": "polite" }, v(Z.date, a.options, a))
          )),
          g === "around" && !t.hideNavigation && fe === d - 1 && P.createElement(
            n.NextMonthButton,
            { type: "button", className: i[R.NextMonthButton], tabIndex: O ? void 0 : -1, "aria-disabled": O ? void 0 : !0, "aria-label": ze(O), onClick: Xe, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(n.Chevron, { disabled: O ? void 0 : !0, className: i[R.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          fe === d - 1 && g === "after" && !t.hideNavigation && P.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[R.Nav], style: w?.[R.Nav], "aria-label": qe(), onPreviousClick: Ke, onNextClick: Xe, previousMonth: y, nextMonth: O }),
          P.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": xe(Z.date, a.options, a) || void 0, className: i[R.MonthGrid], style: w?.[R.MonthGrid] },
            !t.hideWeekdays && P.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[R.Weekdays], style: w?.[R.Weekdays] },
              p && P.createElement(n.WeekNumberHeader, { "aria-label": Ge(a.options), className: i[R.WeekNumberHeader], style: w?.[R.WeekNumberHeader], scope: "col" }, k()),
              Ye.map((G) => P.createElement(n.Weekday, { "aria-label": ft(G, a.options, a), className: i[R.Weekday], key: String(G), style: w?.[R.Weekday], scope: "col" }, S(G, a.options, a)))
            ),
            P.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[R.Weeks], style: w?.[R.Weeks] }, Z.weeks.map((G) => P.createElement(
              n.Week,
              { className: i[R.Week], key: G.weekNumber, style: w?.[R.Week], week: G },
              p && // biome-ignore lint/a11y/useSemanticElements: react component
              P.createElement(n.WeekNumber, { week: G, style: w?.[R.WeekNumber], "aria-label": ht(G.weekNumber, {
                locale: s
              }), className: i[R.WeekNumber], scope: "row", role: "rowheader" }, L(G.weekNumber, a)),
              G.days.map((de) => {
                const { date: ke } = de, se = m(de);
                if (se[me.focused] = !se.hidden && !!ne?.isEqualTo(de), se[Ee.selected] = H?.(ke) || se.selected, hn(q)) {
                  const { from: x, to: I } = q;
                  se[Ee.range_start] = !!(x && I && a.isSameDay(ke, x)), se[Ee.range_end] = !!(x && I && a.isSameDay(ke, I)), se[Ee.range_middle] = je(q, ke, !0, a);
                }
                const Ht = vi(se, w, t.modifiersStyles), jt = ci(se, i, t.modifiersClassNames), u = !nt && !se.hidden ? De(ke, se, a.options, a) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  P.createElement(n.Day, { key: `${a.format(ke, "yyyy-MM-dd")}_${a.format(de.displayMonth, "yyyy-MM")}`, day: de, modifiers: se, className: jt.join(" "), style: Ht, role: "gridcell", "aria-selected": se.selected || void 0, "aria-label": u, "data-day": a.format(ke, "yyyy-MM-dd"), "data-month": de.outside ? a.format(ke, "yyyy-MM") : void 0, "data-selected": se.selected || void 0, "data-disabled": se.disabled || void 0, "data-hidden": se.hidden || void 0, "data-outside": de.outside || void 0, "data-focused": se.focused || void 0, "data-today": se.today || void 0 }, !se.hidden && nt ? P.createElement(n.DayButton, { className: i[R.DayButton], style: w?.[R.DayButton], type: "button", day: de, modifiers: se, disabled: se.disabled || void 0, tabIndex: he(de) ? 0 : -1, "aria-label": te(ke, se, a.options, a), onClick: mt(de, se), onBlur: yt(de, se), onFocus: gt(de, se), onKeyDown: ve(de, se), onMouseEnter: pt(de, se), onMouseLeave: bt(de, se) }, T(ke, a.options, a)) : !se.hidden && T(de.date, a.options, a))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      P.createElement(n.Footer, { className: i[R.Footer], style: w?.[R.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Rn = (e) => {
  const t = e?.from ? Ce(e.from) : void 0, n = e?.to ? dt(e.to) : void 0;
  return t && n && n.getTime() < t.getTime() ? { from: t, to: dt(t) } : { from: t, to: n };
}, sc = [
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
function ic({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: o = !1
}) {
  const a = z($t()), s = Rn(e), i = s.from ? ye(s.from) : ye(a), [c, l] = X(s), [g, d] = X(i), N = () => {
    if (!e.from || !e.to) return !1;
    const f = e.from.getTime() === e.to.getTime(), p = e.from.getTime() === a.getTime() && e.to.getTime() === a.getTime();
    return f && p;
  };
  Oe(() => {
    const f = Rn(e);
    l((p) => {
      const w = p.from?.getTime() ?? null, v = p.to?.getTime() ?? null, T = f.from?.getTime() ?? null, U = f.to?.getTime() ?? null;
      if (w === T && v === U)
        return p;
      if (f.from) {
        const S = ye(f.from);
        d((ee) => ee === S || ee === S - 1 ? ee : S);
      }
      return f;
    });
  }, [e]);
  const W = (f, p) => {
    if (o) return;
    const w = St(tt(/* @__PURE__ */ new Date(), f), p), v = Ce(w), T = dt(w), U = () => r?.("start"), L = () => r?.("end");
    if (N()) {
      l({ from: v, to: T }), t({ from: v }), L();
      return;
    }
    if (n === "end") {
      if (!c.from) {
        l({ from: v, to: T }), t({ from: v }), L();
        return;
      }
      const S = c.from, ee = c.to ?? dt(S);
      let ie = S, E = T;
      v.getTime() < S.getTime() && (ie = v, E = ee);
      const b = { from: ie, to: E };
      l(b), t(b), U();
      return;
    }
    l({ from: v, to: T }), t({ from: v }), L();
  }, M = (f, p) => {
    if (!c.from || !c.to || N()) return !1;
    const w = Ve(c.from), v = ye(c.from), T = Ve(c.to), U = ye(c.to), L = f * 12 + p, k = v * 12 + w, S = U * 12 + T;
    return L >= k && L <= S;
  }, $ = (f, p) => {
    if (!c.from || N()) return !1;
    const w = Ve(c.from), v = ye(c.from);
    return f === v && p === w;
  }, C = (f, p) => {
    if (!c.to || N()) return !1;
    const w = Ve(c.to), v = ye(c.to);
    return f === v && p === w;
  }, F = (f, p) => !1, B = (f, p, w, v) => /* @__PURE__ */ A("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center mb-4", style: { ...v }, children: [
      p && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && d(g - 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(zn, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md ", children: f }),
      w && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && d(g + 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(Zn, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2", children: sc.map((T, U) => {
      const L = M(f, U), k = $(f, U), S = C(f, U), ee = k || S, ie = F();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !ie && !o && W(f, U),
          disabled: ie || o,
          className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors
                  ${ie || o ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : ee ? "bg-[#003DB8] text-white" : L ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: T
        },
        T
      );
    }) })
  ] }, f);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ A("div", { className: "flex gap-8 justify-between px-6", children: [
    B(g, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    B(g + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
const cc = ["Q1", "Q2", "Q3", "Q4"];
function lc({
  selectedRange: e,
  onSelect: t,
  disabled: n = !1
}) {
  const r = ye(e.from), [o, a] = X(r), s = z($t()), i = () => {
    const M = e.from.getTime() === e.to.getTime(), $ = e.from.getTime() === s.getTime() && e.to.getTime() === s.getTime();
    return M && $;
  }, c = (M, $) => {
    if (n) return;
    const C = Zt(tt(/* @__PURE__ */ new Date(), M), $ + 1), F = xn(C), B = Dn(C);
    if (i()) {
      t({ from: F, to: B });
      return;
    }
    const f = at(e.from), p = ye(e.from), w = xn(
      Zt(tt(/* @__PURE__ */ new Date(), p), f)
    ), v = at(e.to), T = ye(e.to), U = Dn(
      Zt(tt(/* @__PURE__ */ new Date(), T), v)
    );
    if (w.getTime() === U.getTime()) {
      t({ from: F, to: B });
      return;
    }
    const k = $ + 1;
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      t({ from: F, to: U });
      return;
    }
    if (M > T || M === T && k > v) {
      t({ from: w, to: B });
      return;
    }
    t({ from: F, to: B });
  }, l = (M, $) => {
    if (!e.from || !e.to || i()) return !1;
    const C = at(e.from) - 1, F = ye(e.from), B = at(e.to) - 1, f = ye(e.to), p = M * 4 + $, w = F * 4 + C, v = f * 4 + B;
    return p >= w && p <= v;
  }, g = (M, $) => {
    if (!e.from || i()) return !1;
    const C = at(e.from) - 1, F = ye(e.from);
    return M === F && $ === C;
  }, d = (M, $) => {
    if (!e.to || i()) return !1;
    const C = at(e.to) - 1, F = ye(e.to);
    return M === F && $ === C;
  }, N = (M, $) => !1, W = (M, $, C, F) => /* @__PURE__ */ A("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ A(
      "div",
      {
        className: "flex items-center justify-center gap-2 mb-4",
        style: { ...F },
        children: [
          $ && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !n && a(o - 1),
              disabled: n,
              className: `p-1 rounded-md transition-colors ${n ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(zn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md", children: M }),
          C && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !n && a(o + 1),
              disabled: n,
              className: `p-1 rounded-md transition-colors ${n ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(Zn, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3", children: cc.map((B, f) => {
      const p = l(M, f), w = g(M, f), v = d(M, f), T = w || v, U = N();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !U && !n && c(M, f),
          disabled: U || n,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${U || n ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : T ? "bg-[#003DB8] text-white" : p ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: B
        },
        B
      );
    }) })
  ] }, M);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ A("div", { className: "flex gap-8 justify-between px-6", children: [
    W(o, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    W(o + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
function dc({
  unit: e,
  excludeEnabled: t,
  selectedRange: n,
  displayedMonth: r,
  setDisplayedMonth: o,
  dayPickerModifiers: a,
  dayPickerDisabledMatcher: s,
  monthsViewIndex: i,
  setMonthsViewIndex: c,
  monthsViewYear: l,
  setMonthsViewYear: g,
  yearsViewIndex: d,
  setYearsViewIndex: N,
  yearsViewDecade: W,
  setYearsViewDecade: M,
  handleCalendarSelect: $,
  handleResetCalendarSelect: C,
  handleWeekCalendarSelect: F,
  monthQuarterRange: B,
  activeDateField: f,
  setActiveDateField: p,
  onMonthSelect: w,
  onYearSelect: v,
  todayDateObj: T,
  onDayClick: U
}) {
  const L = Pe(null), k = Pe(null);
  Oe(() => {
    if (e !== "day") return;
    const b = (y, O) => {
      const _ = y.querySelector(
        "span[data-month-name]"
      ), m = y.querySelector(
        "span[data-year-name]"
      );
      if (_) {
        const ne = y.textContent || "";
        y.style.gap = "6px", y.style.fontSize = "14px", y.style.fontWeight = "600";
        let he = "";
        if (m)
          he = m.textContent || "";
        else {
          const re = ne.match(/\d{4}/);
          re && (he = re[0]);
        }
        if (!m && he) {
          const re = document.createElement("span");
          re.textContent = he, re.setAttribute("data-year-name", "true"), re.style.cursor = "pointer", re.style.fontSize = "14px", re.style.fontWeight = "600", re.onclick = (te) => {
            te.stopPropagation(), te.preventDefault();
            const De = parseInt(he, 10);
            if (!isNaN(De)) {
              const xe = Math.floor(De / 10) * 10;
              M(xe), N(O), c(null);
            }
          };
          const oe = _.nextSibling;
          if (oe && oe.nodeType === Node.TEXT_NODE)
            oe.parentNode?.insertBefore(re, oe.nextSibling);
          else {
            const te = document.createTextNode(" ");
            y.appendChild(te), y.appendChild(re);
          }
        } else m && (m.onclick = (re) => {
          re.stopPropagation(), re.preventDefault();
          const oe = parseInt(he, 10);
          if (!isNaN(oe)) {
            const te = Math.floor(oe / 10) * 10;
            M(te), N(O), c(null);
          }
        });
        _.onclick = (re) => {
          re.stopPropagation(), re.preventDefault();
          const oe = parseInt(
            (m?.textContent || "").trim() || ne,
            10
          );
          isNaN(oe) || (g(oe), c(O), N(null));
        };
        return;
      }
      const H = y.textContent || "", j = H.trim().split(/\s+/);
      let q = "", K = "";
      if (j.length >= 2)
        q = j[0], K = j[1];
      else if (j.length === 1) {
        const ne = H.match(/^([A-Za-z]+)(\d{4})$/);
        if (ne)
          q = ne[1], K = ne[2];
        else
          return;
      } else
        return;
      if (q && K) {
        const ne = y.firstChild;
        if (y.style.gap = "6px", ne && ne.nodeType === Node.TEXT_NODE && (ne.textContent || "").indexOf(q) !== -1) {
          const oe = document.createElement("span");
          oe.textContent = q, oe.setAttribute("data-month-name", "true"), oe.style.cursor = "pointer", oe.style.fontSize = "14px", oe.style.fontWeight = "600", oe.onclick = (xe) => {
            xe.stopPropagation(), xe.preventDefault();
            const we = parseInt(K, 10);
            isNaN(we) || (g(we), c(O), N(null));
          };
          const te = document.createElement("span");
          te.textContent = K, te.setAttribute("data-year-name", "true"), te.style.cursor = "pointer", te.style.fontSize = "14px", te.style.fontWeight = "600", te.onclick = (xe) => {
            xe.stopPropagation(), xe.preventDefault();
            const we = parseInt(K, 10);
            if (!isNaN(we)) {
              const qe = Math.floor(we / 10) * 10;
              M(qe), N(O), c(null);
            }
          }, y.innerHTML = "", y.appendChild(oe);
          const De = document.createTextNode(" ");
          y.appendChild(De), y.appendChild(te);
        }
      }
    }, D = (y, O) => {
      if (!y) return;
      y.querySelectorAll(".rdp-caption_label").forEach((m, H) => {
        const j = m, q = O !== null ? O : H === 0 ? 0 : 1;
        i === q || d === q || b(j, q);
      });
    }, Y = setTimeout(() => {
      i === null && d === null ? D(L.current, null) : (D(L.current, 0), D(k.current, 1));
    }, 150);
    return () => clearTimeout(Y);
  }, [
    e,
    r,
    i,
    d,
    c,
    g,
    M,
    N
  ]);
  const S = (b) => {
    const D = b - 1, Y = b + 10, y = ye(r), O = [];
    for (let _ = D; _ <= Y; _++)
      O.push(_);
    return /* @__PURE__ */ A("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => M(W - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ h("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ A("div", { className: "text-lg font-semibold", children: [
          b,
          "-",
          b + 9
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => M(W + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ h("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: O.map((_) => {
        const m = !an, H = _ < b || _ > b + 9;
        return /* @__PURE__ */ h(
          "button",
          {
            onClick: () => v(_),
            disabled: m,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${H ? "opacity-50 bg-gray-50 text-gray-500" : y === _ ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: _
          },
          _
        );
      }) })
    ] });
  }, ee = (b) => /* @__PURE__ */ A("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => g(l - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ h("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-lg font-semibold", children: b }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => g(l + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ h("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: vs.map((D, Y) => {
      const y = !an, O = ye(r) === b && Ve(r) === Y;
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => w(b, Y),
          disabled: y,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${O ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: D
        },
        D
      );
    }) })
  ] }), ie = {
    day: {
      width: "32px",
      height: "28px",
      padding: 0
    },
    day_button: {
      width: "32px",
      height: "28px",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    weekdays: {
      borderBottom: "1px solid #D5E0F6",
      paddingBottom: "0.35rem",
      marginBottom: "0.35rem"
    },
    head: {
      borderBottom: "1px solid #D5E0F6",
      marginBottom: "0.35rem"
    },
    head_row: {
      borderBottom: "1px solid #D5E0F6"
    },
    head_cell: {
      paddingBottom: "0.35rem"
    },
    caption: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "32px"
    },
    caption_label: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1"
    },
    nav_button: {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      border: "1px solid #D3DBF0",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    },
    nav_button_previous: {
      marginRight: "6px",
      height: "32px"
    },
    nav_button_next: {
      marginLeft: "6px",
      height: "32px"
    },
    month_caption: {
      height: "32px"
    }
  }, E = {
    chevron: "fill-[#1F1F1F] w-4 h-4"
  };
  return /* @__PURE__ */ A(
    "div",
    {
      className: `flex gap-4 justify-center mb-4 h-[264px] ${t ? "excluded-enabled" : "excluded-disabled"} ${e}-picker-calender`,
      children: [
        e === "day" && /* @__PURE__ */ h("div", { className: "flex gap-4", children: d !== null ? d === 0 ? /* @__PURE__ */ A(ct, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: S(W)
            }
          ),
          /* @__PURE__ */ h("div", { ref: k, children: /* @__PURE__ */ h(
            it,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: $,
              modifiers: a,
              month: Ce(He(r, 1)),
              onMonthChange: (b) => {
                const D = new Date(r), y = new Date(b).getMonth() - D.getMonth();
                y !== 1 && y !== -11 && o(Ce(He(b, -1)));
              },
              numberOfMonths: 1,
              disabled: s,
              onDayClick: U,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date",
                "excluded-specific-date": "rdp-day_excluded-specific-date",
                "excluded-range": "rdp-day_excluded-range",
                "exclude-range-start": "rdp-day_exclude-range-start"
              },
              modifiersStyles: {
                "excluded-range": {
                  backgroundColor: "#f3f3f3",
                  color: "#1f2937"
                },
                "exclude-range-start": {
                  backgroundColor: "#f3f3f3",
                  color: "#1f2937"
                }
              },
              classNames: E,
              styles: ie
            }
          ) })
        ] }) : /* @__PURE__ */ A(ct, { children: [
          /* @__PURE__ */ h("div", { ref: L, children: /* @__PURE__ */ h(
            it,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: $,
              modifiers: a,
              month: r,
              onMonthChange: o,
              numberOfMonths: 1,
              disabled: s,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date",
                "excluded-specific-date": "rdp-day_excluded-specific-date",
                "excluded-range": "rdp-day_excluded-range",
                "exclude-range-start": "rdp-day_exclude-range-start"
              },
              modifiersStyles: {
                "excluded-range": {
                  backgroundColor: "#f3f3f3",
                  color: "#1f2937"
                },
                "exclude-range-start": {
                  backgroundColor: "#f3f3f3",
                  color: "#1f2937"
                }
              },
              classNames: E,
              styles: ie
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: S(W)
            }
          )
        ] }) : i === null ? /* @__PURE__ */ h(
          "div",
          {
            ref: L,
            className: "w-full",
            style: { minWidth: 0 },
            children: /* @__PURE__ */ h(
              it,
              {
                mode: "range",
                navLayout: "around",
                selected: n,
                onSelect: (b, D) => {
                  C(b, D);
                },
                modifiers: a,
                month: r,
                onMonthChange: o,
                numberOfMonths: 2,
                disabled: s,
                className: "text-xs",
                onDayClick: U,
                modifiersClassNames: {
                  selected: "rdp-day_selected",
                  disabled: "rdp-day_disabled text-black",
                  excludedWeekday: "rdp-day_excluded-weekday",
                  "excluded-saved-date": "rdp-day_excluded-saved-date",
                  "excluded-specific-date": "rdp-day_excluded-specific-date",
                  "excluded-range": "rdp-day_excluded-range",
                  "exclude-range-start": "rdp-day_exclude-range-start"
                },
                modifiersStyles: {
                  "excluded-range": {
                    backgroundColor: "#f3f3f3",
                    color: "#1f2937"
                  },
                  "exclude-range-start": {
                    backgroundColor: "#f3f3f3",
                    color: "#1f2937"
                  }
                },
                classNames: E,
                styles: {
                  ...ie,
                  months: {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    gap: "24px",
                    width: "100%"
                  },
                  month: {
                    width: "224px",
                    // width: "calc((100% - 24px) / 2)",
                    minWidth: "224px",
                    maxWidth: "260px",
                    height: "256px"
                  },
                  caption: {
                    ...ie.caption,
                    paddingBottom: "8px"
                  },
                  month_grid: {
                    borderCollapse: "separate",
                    borderSpacing: "0 0.25rem",
                    width: "100%"
                  },
                  table: {
                    width: "100%"
                  },
                  cell: {
                    padding: "0.10rem 0",
                    backgroundClip: "content-box"
                  }
                }
              }
            )
          }
        ) : i === 0 ? /* @__PURE__ */ A(ct, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: ee(l)
            }
          ),
          /* @__PURE__ */ h("div", { ref: k, children: /* @__PURE__ */ h(
            it,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: $,
              modifiers: a,
              month: Ce(He(r, 1)),
              onMonthChange: (b) => {
                const D = new Date(r), y = new Date(b).getMonth() - D.getMonth();
                y !== 1 && y !== -11 && o(Ce(He(b, -1)));
              },
              numberOfMonths: 1,
              disabled: s,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date",
                "excluded-specific-date": "rdp-day_excluded-specific-date"
              },
              classNames: E,
              styles: ie
            }
          ) })
        ] }) : /* @__PURE__ */ A(ct, { children: [
          /* @__PURE__ */ h("div", { ref: L, children: /* @__PURE__ */ h(
            it,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: $,
              modifiers: a,
              month: r,
              onMonthChange: o,
              numberOfMonths: 1,
              disabled: s,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date",
                "excluded-specific-date": "rdp-day_excluded-specific-date"
              },
              classNames: {
                chevron: "fill-black"
              },
              styles: ie
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: ee(l)
            }
          )
        ] }) }),
        e === "week" && /* @__PURE__ */ h(
          it,
          {
            mode: "range",
            navLayout: "around",
            showWeekNumber: !0,
            locale: void 0,
            formatters: {
              formatWeekNumber: (b) => `W${String(b).padStart(2, "0")}`
            },
            selected: n,
            onSelect: (b, D) => {
              F(b, D);
            },
            modifiers: a,
            onWeekNumberClick: (b, D) => {
              D && D.length > 0 && F(
                {
                  from: D[0],
                  to: D[D.length - 1]
                },
                D[0]
              );
            },
            month: r,
            onMonthChange: o,
            numberOfMonths: 2,
            disabled: (b) => s(b),
            onDayClick: U,
            modifiersClassNames: {
              selected: "rdp-day_selected bg-[#003DB8]",
              disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
              excludedWeekday: "rdp-day_excluded-weekday",
              "excluded-saved-date": "rdp-day_excluded-saved-date",
              "excluded-specific-date": "rdp-day_excluded-specific-date",
              "excluded-range": "rdp-day_excluded-range",
              "exclude-range-start": "rdp-day_exclude-range-start"
            },
            modifiersStyles: {
              "excluded-specific-date": {
                backgroundColor: "#f3f3f3",
                color: "#1f2937"
              },
              "excluded-range": {
                backgroundColor: "#f3f3f3",
                color: "#1f2937"
              },
              "exclude-range-start": {
                backgroundColor: "#f3f3f3",
                color: "#1f2937"
              }
            },
            className: "text-xs",
            classNames: E,
            styles: {
              ...ie,
              months: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                gap: "24px",
                width: "100%"
              },
              month: {
                width: "252px",
                // width: "calc((100% - 24px) / 2)",
                minWidth: "224px",
                maxWidth: "260px",
                height: "256px"
              },
              caption: {
                ...ie.caption,
                paddingBottom: "8px"
              },
              month_grid: {
                borderCollapse: "separate",
                borderSpacing: "0 0.25rem",
                width: "100%"
              },
              table: {
                width: "100%"
              },
              cell: {
                padding: "0.10rem 0",
                backgroundClip: "content-box"
              },
              caption_label: {
                fontSize: "14px !important",
                fontWeight: "600",
                lineHeight: "1"
              }
            }
          }
        ),
        e === "month" && /* @__PURE__ */ h(
          ic,
          {
            selectedRange: B,
            onSelect: $,
            activeDateField: f,
            onActiveFieldChange: p,
            disabled: t
          }
        ),
        e === "quarter" && /* @__PURE__ */ h(
          lc,
          {
            selectedRange: B,
            onSelect: $,
            disabled: t
          }
        )
      ]
    }
  );
}
function uc({
  excludeEnabled: e,
  hasEmptyDates: t,
  hasFutureDates: n,
  onToday: r,
  onClear: o,
  onCancel: a,
  onApply: s
}) {
  return /* @__PURE__ */ A("div", { className: "flex items-center justify-between pt-2 pb-2 px-6 border-t border-gray-200", children: [
    /* @__PURE__ */ h(
      "button",
      {
        onClick: r,
        disabled: e,
        className: `px-4 py-2 text-xs font-semibold rounded-md transition-colors ${e ? "text-blue-300 cursor-not-allowed bg-transparent" : "text-blue-600 hover:bg-blue-50"}`,
        children: "Today"
      }
    ),
    /* @__PURE__ */ A("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: o,
          disabled: e,
          className: `px-4 py-2 text-xs font-medium rounded-md transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-gray-600 hover:bg-gray-100"}`,
          children: "Clear dates"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: a,
          disabled: e,
          className: `px-4 py-2 text-xs font-semibold rounded-md transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-[#003DB8] hover:bg-gray-100"}`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          disabled: !!(e || t || n),
          className: `px-4 py-2 text-xs font-semibold rounded-md transition-colors ${e || t || n ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#003DB8] text-white hover:bg-[#003DB8]"}`,
          children: "Apply"
        }
      )
    ] })
  ] });
}
function fc({
  initialSelection: e,
  onApply: t
}) {
  const n = $t(), r = (e?.excludeFilterTypes || []).filter(
    (u) => u === "days" || u === "saved-dates" || u === "date-range"
  ), [o, a] = X(
    e?.unit || "day"
  ), [s, i] = X(
    e?.startDateUtc || n
  ), [c, l] = X(
    e?.endDateUtc || n
  ), [g, d] = X(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [N, W] = X(e?.duration || 1), [M, $] = X(null), [C, F] = X(
    e?.excludedWeekdays || []
  ), [B, f] = X(
    e?.excludedSpecificDates || []
  ), [p, w] = X(!1), [v, T] = X(r), [U, L] = X(null), [k, S] = X(
    e?.excludedSavedDates || []
  ), [ee, ie] = X(""), [E, b] = X(e?.excludedDateRanges || []), [D, Y] = X(() => e?.excludeEnabled ? !0 : !!(r.length > 0 || e?.excludedWeekdays && e.excludedWeekdays.length > 0 || e?.excludedSavedDates && e.excludedSavedDates.length > 0)), y = Pe({
    excludeFilterTypes: r,
    excludedWeekdays: e?.excludedWeekdays || [],
    excludedSpecificDates: e?.excludedSpecificDates || [],
    excludedSavedDates: e?.excludedSavedDates || [],
    excludedDateRanges: e?.excludedDateRanges || []
  }), [O, _] = X([]), [m, H] = X(void 0), [j, q] = X(() => e?.startDateUtc ? Ce(z(e.startDateUtc)) : Ce(z(n))), [K, ne] = X(null), [he, re] = X(() => e?.startDateUtc ? ye(z(e.startDateUtc)) : ye(z(n))), [oe, te] = X(null), [De, xe] = X(() => {
    if (e?.startDateUtc) {
      const x = ye(z(e.startDateUtc));
      return Math.floor(x / 10) * 10;
    }
    const u = ye(z(n));
    return Math.floor(u / 10) * 10;
  });
  Oe(() => {
    if (s && c) {
      const u = mr(
        s,
        c,
        o,
        C
      );
      W(u);
    } else
      W(1);
  }, [s, c, o, C]), Oe(() => {
    (async () => {
      await lt.init();
      const x = await lt.getData(
        "savedDateRanges"
      );
      x && _(x);
    })();
  }, []), Oe(() => {
    s && !c ? d("end") : !s && c && d("start");
  }, [s, c]), Oe(() => {
    K === null && re(ye(j));
  }, [j, K]), Oe(() => {
    U !== "saved-dates" && ie("");
  }, [U]);
  const we = J(
    (u) => {
      if (k.length === 0) return !1;
      const x = ae(u);
      return k.some((I) => {
        const Q = O.find((ue) => ue.id === I);
        return !Q || !(x >= Q.selection.startDateUtc && x <= Q.selection.endDateUtc) ? !1 : (Q.selection.excludedWeekdays && Q.selection.excludedWeekdays.length > 0 && Q.selection.excludedWeekdays.includes(u.getDay()) || Q.selection.excludedSpecificDates && Q.selection.excludedSpecificDates.length > 0 && Q.selection.excludedSpecificDates.includes(x) || Q.selection.excludedSavedDates && Q.selection.excludedSavedDates.some(
          (_e) => {
            const ot = O.find(
              (Yt) => Yt.id === _e
            );
            return ot ? x >= ot.selection.startDateUtc && x <= ot.selection.endDateUtc : !1;
          }
        ) || Q.selection.excludedDateRanges && Q.selection.excludedDateRanges.some(
          (_e) => x >= _e.start && x <= _e.end
        ), !0);
      });
    },
    [k, O]
  ), qe = Fe(() => {
    const u = {};
    return C.length > 0 && (u.excludedWeekday = {
      dayOfWeek: C
    }), k.length > 0 && (u["excluded-saved-date"] = we), B.length > 0 && (u["excluded-specific-date"] = (x) => B.includes(ae(x))), E.length > 0 && (u["excluded-range"] = (x) => {
      const I = ae(x);
      return E.some(
        (Q) => I >= Q.start && I <= Q.end
      );
    }), M && (u["exclude-range-start"] = (x) => ae(x) === M), u;
  }, [
    k,
    C,
    we,
    B,
    E,
    M
  ]), ut = Fe(
    () => ({
      from: s ? z(s) : void 0,
      to: c ? z(c) : void 0
    }),
    [s, c]
  ), ze = Fe(() => z(n), [n]), ft = Fe(
    () => ({
      from: s ? z(s) : ze,
      to: c ? z(c) : ze
    }),
    [c, s, ze]
  ), ht = Fe(() => {
    const u = ee.trim().toLowerCase();
    return u ? O.filter((x) => {
      const I = (/* @__PURE__ */ new Date(x.selection.startDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase(), Q = (/* @__PURE__ */ new Date(x.selection.endDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase();
      return x.label.toLowerCase().includes(u) || `${I} - ${Q}`.includes(u);
    }) : O;
  }, [O, ee]), Ge = Fe(
    () => !s || s.trim() === "" || !c || c.trim() === "",
    [c, s]
  ), Ae = Fe(() => !1, [c, s, n]), Ye = J(
    (u) => u.filter(
      (x) => x === "days" || x === "saved-dates" || x === "date-range"
    ),
    []
  ), nt = J(
    (u) => {
      if (u) {
        w(!0), a("day");
        const x = y.current, I = Ye(
          x.excludeFilterTypes
        );
        T([...I]), F([...x.excludedWeekdays]), f([...x.excludedSpecificDates]), S([...x.excludedSavedDates]), b([...x.excludedDateRanges]);
        const Q = I.find(
          (ce) => ce === "days" || ce === "saved-dates"
        );
        L(
          Q ?? null
        );
      } else {
        const x = y.current, I = Ye(
          x.excludeFilterTypes
        );
        T([...I]), F([...x.excludedWeekdays]), f([...x.excludedSpecificDates]), S([...x.excludedSavedDates]), b([...x.excludedDateRanges]), Y(
          I.length > 0 || x.excludedWeekdays.length > 0 || x.excludedSavedDates.length > 0
        ), w(!1), L(null), $(null);
      }
    },
    [Ye]
  ), Ke = J(
    (u) => {
      p && (v.includes(u) || T([...v, u]), L((x) => x === u ? null : u));
    },
    [p, v]
  ), Xe = J(
    (u) => {
      if (!p) return;
      const x = v.filter((I) => I !== u);
      if (T(x), u === "days" && F([]), u === "saved-dates" && S([]), u === "date-range" && b([]), U === u) {
        const I = x.find(
          (Q) => Q === "days" || Q === "saved-dates"
        );
        L(
          I ?? null
        );
      }
    },
    [U, p, v]
  ), mt = J(() => {
    const u = y.current, x = Ye(
      u.excludeFilterTypes
    );
    T([...x]), F([...u.excludedWeekdays]), f([...u.excludedSpecificDates]), S([...u.excludedSavedDates]), b([...u.excludedDateRanges]), Y(
      x.length > 0 || u.excludedWeekdays.length > 0 || u.excludedSavedDates.length > 0
    ), w(!1), L(null), $(null);
  }, [Ye]), gt = J(() => {
    const u = C.length > 0, x = k.length > 0, I = E.length > 0, Q = B.length > 0, ce = [];
    u && ce.push("days"), x && ce.push("saved-dates"), I && ce.push("date-range"), Q && ce.push("specific-date");
    const ue = u ? [...C] : [], _e = Q ? [...B] : [], ot = x ? [...k] : [], Yt = I ? [...E] : [];
    y.current = {
      excludeFilterTypes: ce,
      excludedWeekdays: ue,
      excludedSpecificDates: _e,
      excludedSavedDates: ot,
      excludedDateRanges: Yt
    };
    const Wr = Ye(ce);
    T(Wr), F(ue), f(_e), S(ot), b(Yt), Y(ce.length > 0), w(!1), L(null), $(null);
  }, [
    E,
    k,
    C,
    B,
    Ye
  ]), yt = J(
    (u) => {
      F((x) => x.includes(u) ? x.filter((I) => I !== u) : [...x, u]), p && T((x) => x.includes("days") ? x : [...x, "days"]);
    },
    [p]
  ), ve = J((u) => {
    u && q(Ce(z(u)));
  }, []), pt = J(
    (u) => {
      p || (i(u), u ? c || d("end") : d("start"), u && c && z(u) > z(c) && l(u), ve(u));
    },
    [c, p, ve]
  ), bt = J(
    (u) => {
      p || (l(u), u ? s || d("start") : d("end"), u && s && z(u) < z(s) && i(u), ve(u));
    },
    [p, s, ve]
  ), xt = J(
    (u) => {
      if (!(p || u <= 0)) {
        if (W(u), s) {
          const x = as(
            s,
            o,
            u,
            C
          );
          l(x), ve(x);
        } else if (c) {
          const x = ss(
            c,
            o,
            u,
            C
          );
          i(x), ve(x);
        }
        d("start");
      }
    },
    [
      c,
      p,
      C,
      s,
      o,
      ve
    ]
  ), rt = J(
    (u) => {
      p || (a(u), (u === "day" || u === "week") && s && q(Ce(z(s))));
    },
    [p, s]
  ), Bt = J(
    (u, x) => {
      p || (i(u), l(x), d("start"), ve(u));
    },
    [p, ve]
  ), Pt = J(
    (u) => {
      if (p) return;
      i(u.startDateUtc), l(u.endDateUtc), a(u.unit);
      const x = u.excludedWeekdays || [];
      F(x), W(u.duration), d("start");
      const I = (u.excludeFilterTypes || []).filter(
        (_e) => _e === "days" || _e === "saved-dates" || _e === "date-range"
      ), Q = u.excludedSpecificDates || [], ce = u.excludedSavedDates || [], ue = u.excludedDateRanges || [];
      T(I), f(Q), S(ce), b(ue), y.current = {
        excludeFilterTypes: I,
        excludedWeekdays: x,
        excludedSpecificDates: Q,
        excludedSavedDates: ce,
        excludedDateRanges: ue
      }, Y(
        I.length > 0 || x.length > 0 || ce.length > 0
      ), w(!1), L(null), u.startDateUtc && ve(u.startDateUtc);
    },
    [p, ve]
  ), Ut = J(() => {
    p || (i(n), l(n), F([]), d("start"), ve(n));
  }, [p, n, ve]), Wt = J(() => {
    p || (i(""), l(""), W(1), F([]), d("start"), w(!1), T([]), f([]), S([]), b([]), L(null), y.current = {
      excludeFilterTypes: [],
      excludedWeekdays: [],
      excludedSpecificDates: [],
      excludedSavedDates: [],
      excludedDateRanges: []
    }, Y(!1), ve(n));
  }, [p, n, ve]), At = J(() => {
    if (p || Ge || Ae) return;
    const u = gr(
      s,
      c,
      o,
      C,
      D,
      v,
      B,
      k,
      E
    );
    t(u);
  }, [
    c,
    D,
    p,
    v,
    E,
    k,
    B,
    C,
    Ge,
    Ae,
    t,
    s,
    o
  ]), Z = J(
    (u) => {
      if (!p && u?.from) {
        const x = ae(u.from);
        if (i(x), u?.to) {
          const I = ae(u.to);
          l(I), d("start");
        } else
          l(x), d("end");
      }
    },
    [p]
  ), fe = J(
    (u, x) => {
      if (!p) {
        if (s && c && u?.to) {
          const I = ae(x);
          g === "start" ? z(c).getTime() > z(I).getTime() ? i(I) : (i(I), l("")) : z(s).getTime() > z(I).getTime() ? (l(s), i(I)) : (l(I), i(s)), d(g === "start" ? "end" : "start");
          return;
        }
        if (!s && c && u?.from) {
          l(ae(u?.from)), d("start");
          return;
        }
        if (!s && !c && u?.from) {
          i(ae(u?.from)), l(""), d("end");
          return;
        }
        if (u?.from) {
          const I = ae(u.from);
          if (i(I), u?.to) {
            const Q = ae(u.to);
            l(Q), d("start");
          } else
            l(I), d("end");
        }
      }
    },
    [g, c, p, s]
  ), G = J(
    (u, x) => {
      if (!(p || !u) && u.from) {
        let I = be(u.from, {
          weekStartsOn: Ne
        }), Q = ge(I, 6);
        if (s && c)
          if (g === "start")
            if (z(ae(x)).getTime() > z(c).getTime() && z(ae(x)).getTime() > z(s).getTime())
              I = be(x, {
                weekStartsOn: Ne
              }), Q = ge(I, 6), Z({ from: I, to: Q });
            else if (z(ae(x)).getTime() < z(c).getTime() && z(ae(x)).getTime() < z(s).getTime()) {
              I = be(x, {
                weekStartsOn: Ne
              }), Q = ge(I, 6);
              const ce = be(c, {
                weekStartsOn: Ne
              }), ue = ge(ce, 6);
              Z({ from: I, to: ue });
            } else if (z(ae(x)).getTime() > z(s).getTime() && z(ae(x)).getTime() < z(c).getTime()) {
              I = be(x, {
                weekStartsOn: Ne
              }), Q = ge(I, 6);
              const ce = be(c, {
                weekStartsOn: Ne
              }), ue = ge(ce, 6);
              Z({ from: I, to: ue });
            } else
              I = be(x, {
                weekStartsOn: Ne
              }), Q = ge(x, 6), Z({ from: I, to: Q });
          else if (z(ae(x)).getTime() > z(c).getTime()) {
            I = be(u.from, {
              weekStartsOn: Ne
            }), Q = ge(I, 6);
            const ce = be(x, {
              weekStartsOn: Ne
            }), ue = ge(ce, 6);
            Z({ from: I, to: ue });
          } else if (z(ae(x)).getTime() < z(c).getTime() && z(ae(x)).getTime() < z(s).getTime()) {
            I = be(x, {
              weekStartsOn: Ne
            }), Q = ge(I, 6);
            const ce = be(s, {
              weekStartsOn: Ne
            }), ue = ge(ce, 6);
            Z({ from: I, to: ue });
          } else {
            I = be(s, {
              weekStartsOn: Ne
            }), Q = ge(I, 6);
            const ce = be(x, {
              weekStartsOn: Ne
            }), ue = ge(ce, 6);
            Z({ from: I, to: ue });
          }
        if (u.to && (!s || !c)) {
          const ce = be(u.to, {
            weekStartsOn: Ne
          }), ue = ge(ce, 6);
          Z({ from: I, to: ue });
        }
        d(g === "start" ? "end" : "start");
      }
    },
    [
      g,
      c,
      p,
      Z,
      s
    ]
  ), de = J(
    (u) => {
      if (p) {
        if (!s || !c) return !0;
        const ce = ae(u);
        return ce < s || ce > c;
      }
      ae(u);
      const x = !an, I = p && v.includes("days") && C.includes(u.getDay()), Q = p && v.includes("saved-dates") && we(u);
      return x || I || Q;
    },
    [
      p,
      v,
      C,
      we,
      n,
      s,
      c
    ]
  ), ke = J(() => {
    if (!Ae) return null;
    const u = s && s > n, x = c && c > n;
    return u && x ? "Start date and end date cannot be in the future." : u ? "Start date cannot be in the future." : x ? "End date cannot be in the future." : null;
  }, [c, Ae, s, n]), se = J((u, x) => {
    const I = Ce(
      St(tt(/* @__PURE__ */ new Date(), u), x)
    );
    q(I), ne(null), re(u);
  }, []), Ht = J(
    (u) => {
      const x = Ve(j), I = Ce(
        St(tt(/* @__PURE__ */ new Date(), u), x)
      );
      q(I), te(null), xe(Math.floor(u / 10) * 10);
    },
    [j]
  ), jt = J(
    (u) => {
      if (!p) return;
      const x = ae(u);
      if (!(s && c && (x < s || x > c)))
        if (M) {
          const I = x < M ? x : M, Q = x < M ? M : x, ce = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            start: I,
            end: Q
          };
          b((ue) => [...ue, ce]), $(null), T((ue) => ue.includes("date-range") ? ue : [...ue, "date-range"]);
        } else
          $(x);
    },
    [p, s, c, M]
  );
  return {
    today: n,
    unit: o,
    startDateUtc: s,
    endDateUtc: c,
    activeDateField: g,
    duration: N,
    excludedWeekdays: C,
    excludedSpecificDates: B,
    excludeEnabled: p,
    excludeFilterTypes: v,
    activeFilterView: U,
    excludedSavedDates: k,
    savedDatesSearchTerm: ee,
    excludedDateRanges: E,
    savedDatesForFilter: O,
    displayedMonth: j,
    monthsViewIndex: K,
    monthsViewYear: he,
    yearsViewIndex: oe,
    yearsViewDecade: De,
    excludeApplied: D,
    hasFutureDates: Ae,
    hasEmptyDates: Ge,
    dayPickerModifiers: qe,
    selectedRange: ut,
    todayDateObj: ze,
    monthQuarterRange: ft,
    filteredSavedDates: ht,
    dayPickerDisabledMatcher: de,
    getFutureDateWarning: ke,
    setActiveDateField: d,
    setSavedDatesSearchTerm: ie,
    setMonthsViewIndex: ne,
    setYearsViewIndex: te,
    setYearsViewDecade: xe,
    setMonthsViewYear: re,
    setDisplayedMonth: q,
    handleStartDateChange: pt,
    handleEndDateChange: bt,
    handleDurationChange: xt,
    handleUnitChange: rt,
    handlePresetSelect: Bt,
    handleSavedDateSelect: Pt,
    handleToday: Ut,
    handleClear: Wt,
    handleApply: At,
    handleCalendarSelect: Z,
    handleResetCalendarSelect: fe,
    handleWeekCalendarSelect: G,
    handleExcludeToggle: nt,
    handleExcludeFilterButtonClick: Ke,
    handleExcludeRemoveType: Xe,
    handleExcludeCancel: mt,
    handleExcludeSave: gt,
    toggleWeekday: yt,
    setExcludedSavedDates: S,
    setExcludedSpecificDates: f,
    setExcludedDateRanges: b,
    setExcludeFilterTypes: T,
    setActiveFilterView: L,
    excludeSavedStateRef: y,
    sanitizeExcludeFilterTypes: Ye,
    handleMonthSelect: se,
    handleYearSelect: Ht,
    handleDayClick: jt,
    excludeSelectionStart: M
  };
}
function vc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const {
    unit: o,
    startDateUtc: a,
    endDateUtc: s,
    activeDateField: i,
    duration: c,
    excludedWeekdays: l,
    excludedSpecificDates: g,
    excludeEnabled: d,
    excludeFilterTypes: N,
    activeFilterView: W,
    excludedSavedDates: M,
    savedDatesSearchTerm: $,
    excludedDateRanges: C,
    displayedMonth: F,
    monthsViewIndex: B,
    monthsViewYear: f,
    yearsViewIndex: p,
    yearsViewDecade: w,
    excludeApplied: v,
    hasFutureDates: T,
    hasEmptyDates: U,
    dayPickerModifiers: L,
    selectedRange: k,
    todayDateObj: S,
    monthQuarterRange: ee,
    savedDatesForFilter: ie,
    filteredSavedDates: E,
    dayPickerDisabledMatcher: b,
    getFutureDateWarning: D,
    setActiveDateField: Y,
    setSavedDatesSearchTerm: y,
    setMonthsViewIndex: O,
    setYearsViewIndex: _,
    setYearsViewDecade: m,
    setMonthsViewYear: H,
    setDisplayedMonth: j,
    handleStartDateChange: q,
    handleEndDateChange: K,
    handleDurationChange: ne,
    handleUnitChange: he,
    handlePresetSelect: re,
    handleSavedDateSelect: oe,
    handleToday: te,
    handleClear: De,
    handleApply: xe,
    handleCalendarSelect: we,
    handleResetCalendarSelect: qe,
    handleWeekCalendarSelect: ut,
    handleExcludeToggle: ze,
    handleExcludeFilterButtonClick: ft,
    handleExcludeRemoveType: ht,
    handleExcludeCancel: Ge,
    handleExcludeSave: Ae,
    toggleWeekday: Ye,
    setExcludedSavedDates: nt,
    setExcludedSpecificDates: Ke,
    setExcludedDateRanges: Xe,
    setExcludeFilterTypes: mt,
    setActiveFilterView: gt,
    handleMonthSelect: yt,
    handleYearSelect: ve,
    handleDayClick: pt
  } = fc({
    initialSelection: e,
    onApply: t
  }), bt = {
    height: "auto",
    minHeight: Ms,
    width: Vt,
    minWidth: Vt,
    maxWidth: Vt,
    overflow: "visible",
    ...r
  }, xt = gr(
    a,
    s,
    o,
    l,
    v,
    N,
    g,
    M,
    C
  ), rt = D();
  return /* @__PURE__ */ A(
    "div",
    {
      className: "flex bg-white rounded-xl shadow-xl border border-gray-200",
      style: bt,
      children: [
        /* @__PURE__ */ h(
          hs,
          {
            onPresetSelect: re,
            onSavedDateSelect: oe,
            currentSelection: xt,
            themeColors: r || {},
            disabled: d
          }
        ),
        /* @__PURE__ */ A(
          "div",
          {
            className: "flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden",
            style: { minWidth: "520px" },
            children: [
              /* @__PURE__ */ A("div", { className: "pt-4 flex-1 min-w-0 overflow-x-hidden", children: [
                /* @__PURE__ */ h(
                  ws,
                  {
                    unit: o,
                    excludeEnabled: d,
                    onUnitChange: he
                  }
                ),
                /* @__PURE__ */ h(
                  xs,
                  {
                    startDateUtc: a,
                    endDateUtc: s,
                    duration: c,
                    unit: o,
                    excludeEnabled: d,
                    activeDateField: i,
                    onStartDateChange: q,
                    onEndDateChange: K,
                    onDurationChange: ne,
                    onActiveFieldChange: Y
                  }
                ),
                T && rt && /* @__PURE__ */ A("div", { className: "mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2", children: [
                  /* @__PURE__ */ h(Vr, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ h("p", { className: "text-sm text-amber-800", children: rt })
                ] }),
                /* @__PURE__ */ h(
                  ks,
                  {
                    excludeEnabled: d,
                    excludeFilterTypes: N,
                    activeFilterView: W,
                    excludedWeekdays: l,
                    excludedSavedDates: M,
                    excludedSpecificDates: g,
                    excludedDateRanges: C,
                    savedDatesSearchTerm: $,
                    filteredSavedDates: E,
                    savedDatesForFilter: ie,
                    onExcludeToggle: ze,
                    onFilterButtonClick: ft,
                    onRemoveFilterType: ht,
                    onCancel: Ge,
                    onSave: Ae,
                    onToggleWeekday: Ye,
                    setSavedDatesSearchTerm: y,
                    setExcludedSavedDates: nt,
                    setExcludedSpecificDates: Ke,
                    setExcludedDateRanges: Xe,
                    setExcludeFilterTypes: mt,
                    setActiveFilterView: gt
                  }
                ),
                /* @__PURE__ */ h(
                  dc,
                  {
                    unit: o,
                    excludeEnabled: d,
                    selectedRange: k,
                    displayedMonth: F,
                    setDisplayedMonth: j,
                    dayPickerModifiers: L,
                    dayPickerDisabledMatcher: b,
                    monthsViewIndex: B,
                    setMonthsViewIndex: O,
                    monthsViewYear: f,
                    setMonthsViewYear: H,
                    yearsViewIndex: p,
                    setYearsViewIndex: _,
                    yearsViewDecade: w,
                    setYearsViewDecade: m,
                    handleCalendarSelect: we,
                    handleResetCalendarSelect: qe,
                    handleWeekCalendarSelect: ut,
                    monthQuarterRange: ee,
                    activeDateField: i,
                    setActiveDateField: Y,
                    onMonthSelect: yt,
                    onYearSelect: ve,
                    todayDateObj: S,
                    onDayClick: pt
                  }
                )
              ] }),
              /* @__PURE__ */ h(
                uc,
                {
                  excludeEnabled: d,
                  hasEmptyDates: U,
                  hasFutureDates: T,
                  onToday: te,
                  onClear: De,
                  onCancel: n,
                  onApply: xe
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  an as ALLOW_FUTURE_DATES,
  vc as AdvancedDateRangePicker,
  bc as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  xc as WEEK_NUMBERING_MODE,
  Ne as WEEK_STARTS_ON,
  mr as calcDurationFromRange,
  as as calcEndFromDuration,
  ss as calcStartFromDuration,
  gr as createSelection,
  Dc as formatDisplayDate,
  ae as formatUtc,
  ls as getPresets,
  $t as getTodayUtc,
  cs as getUnitAbbreviation,
  wc as parseDisplayDate,
  z as parseUtc
};
