import { jsxs as A, jsx as h, Fragment as ot } from "react/jsx-runtime";
import U, { forwardRef as Bn, createElement as Kt, useState as V, useEffect as Oe, useRef as Le, useMemo as We, createContext as Nr, useContext as Sr, useCallback as X, useLayoutEffect as Tr } from "react";
import { LocalizationProvider as Cr } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField as an } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs as Or } from "@mui/x-date-pickers/AdapterDayjs";
const Wr = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Yr = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), cn = (e) => {
  const t = Yr(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Un = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), _r = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Fr = {
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
const Er = Bn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: s,
    iconNode: a,
    ...i
  }, c) => Kt(
    "svg",
    {
      ref: c,
      ...Fr,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Un("lucide", o),
      ...!s && !_r(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...a.map(([l, g]) => Kt(l, g)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
const Ie = (e, t) => {
  const n = Bn(
    ({ className: r, ...o }, s) => Kt(Er, {
      ref: s,
      iconNode: t,
      className: Un(
        `lucide-${Wr(cn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = cn(e), n;
};
const $r = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], Ir = Ie("bookmark", $r);
const Pr = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ln = Ie("chevron-down", Pr);
const Br = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], An = Ie("chevron-left", Br);
const Ur = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Hn = Ie("chevron-right", Ur);
const Ar = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Hr = Ie("circle-question-mark", Ar);
const jr = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Lr = Ie("plus", jr);
const Rr = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], qr = Ie("search", Rr);
const zr = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], Zr = Ie("trash-2", zr);
const Qr = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Gr = Ie("triangle-alert", Qr);
const Kr = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], dn = Ie("x", Kr), jn = 6048e5, Xr = 864e5, Ln = 6e4, Rn = 36e5, un = Symbol.for("constructDateFrom");
function ye(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && un in e ? e[un](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function K(e, t) {
  return ye(t || e, e);
}
function me(e, t, n) {
  const r = K(e, n?.in);
  return isNaN(t) ? ye(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ue(e, t, n) {
  const r = K(e, n?.in);
  if (isNaN(t)) return ye(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), s = ye(e, r.getTime());
  s.setMonth(r.getMonth() + t + 1, 0);
  const a = s.getDate();
  return o >= a ? s : (r.setFullYear(
    s.getFullYear(),
    s.getMonth(),
    o
  ), r);
}
let Jr = {};
function vt() {
  return Jr;
}
function be(e, t) {
  const n = vt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = K(e, t?.in), s = o.getDay(), a = (s < r ? 7 : 0) + s - r;
  return o.setDate(o.getDate() - a), o.setHours(0, 0, 0, 0), o;
}
function Dt(e, t) {
  return be(e, { ...t, weekStartsOn: 1 });
}
function qn(e, t) {
  const n = K(e, t?.in), r = n.getFullYear(), o = ye(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Dt(o), a = ye(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = Dt(a);
  return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function fn(e) {
  const t = K(e), n = new Date(
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
function Re(e, ...t) {
  const n = ye.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function xt(e, t) {
  const n = K(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function en(e, t, n) {
  const [r, o] = Re(
    n?.in,
    e,
    t
  ), s = xt(r), a = xt(o), i = +s - fn(s), c = +a - fn(a);
  return Math.round((i - c) / Xr);
}
function Vr(e, t) {
  const n = qn(e, t), r = ye(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Dt(r);
}
function zn(e, t, n) {
  return Ue(e, t * 3, n);
}
function tn(e, t, n) {
  return me(e, t * 7, n);
}
function eo(e, t, n) {
  return Ue(e, t * 12, n);
}
function to(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ye.bind(null, o));
    const s = K(o, r);
    (!n || n < s || isNaN(+s)) && (n = s);
  }), ye(r, n || NaN);
}
function no(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ye.bind(null, o));
    const s = K(o, r);
    (!n || n > s || isNaN(+s)) && (n = s);
  }), ye(r, n || NaN);
}
function Pt(e, t) {
  const n = +K(e) - +K(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function ro(e, t, n) {
  const [r, o] = Re(
    n?.in,
    e,
    t
  );
  return +xt(r) == +xt(o);
}
function Zn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function oo(e) {
  return !(!Zn(e) && typeof e != "number" || isNaN(+K(e)));
}
function Qn(e, t, n) {
  const [r, o] = Re(
    n?.in,
    e,
    t
  ), s = r.getFullYear() - o.getFullYear(), a = r.getMonth() - o.getMonth();
  return s * 12 + a;
}
function tt(e, t) {
  const n = K(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function Gn(e, t, n) {
  const [r, o] = Re(
    n?.in,
    e,
    t
  ), s = hn(r, o), a = Math.abs(
    en(r, o)
  );
  r.setDate(r.getDate() - s * a);
  const i = +(hn(r, o) === -s), c = s * (a - i);
  return c === 0 ? 0 : c;
}
function hn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Kn(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function so(e, t) {
  const n = K(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function at(e, t) {
  const n = K(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function ao(e, t) {
  const n = K(e, t?.in);
  return +so(n, t) == +at(n, t);
}
function Xn(e, t, n) {
  const [r, o, s] = Re(
    n?.in,
    e,
    e,
    t
  ), a = Pt(o, s), i = Math.abs(
    Qn(o, s)
  );
  if (i < 1) return 0;
  o.getMonth() === 1 && o.getDate() > 27 && o.setDate(30), o.setMonth(o.getMonth() - a * i);
  let c = Pt(o, s) === -a;
  ao(r) && i === 1 && Pt(r, s) === 1 && (c = !1);
  const l = a * (i - +c);
  return l === 0 ? 0 : l;
}
function io(e, t, n) {
  const r = Xn(e, t, n) / 3;
  return Kn()(r);
}
function co(e, t, n) {
  const r = Gn(e, t, n) / 7;
  return Kn()(r);
}
function nn(e, t) {
  const [n, r] = Re(e, t.start, t.end);
  return { start: n, end: r };
}
function Jn(e, t) {
  const { start: n, end: r } = nn(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0);
  let i = 1;
  const c = [];
  for (; +a <= s; )
    c.push(ye(n, a)), a.setDate(a.getDate() + i), a.setHours(0, 0, 0, 0);
  return o ? c.reverse() : c;
}
function lo(e, t) {
  const { start: n, end: r } = nn(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const c = [];
  for (; +a <= s; )
    c.push(ye(n, a)), a.setMonth(a.getMonth() + i);
  return o ? c.reverse() : c;
}
function mn(e, t) {
  const n = K(e, t?.in), r = n.getMonth(), o = r - r % 3;
  return n.setMonth(o, 1), n.setHours(0, 0, 0, 0), n;
}
function Ne(e, t) {
  const n = K(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function uo(e, t) {
  const n = K(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function rn(e, t) {
  const n = K(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function fo(e, t) {
  const { start: n, end: r } = nn(t?.in, e);
  let o = +n > +r;
  const s = o ? +n : +r, a = o ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +a <= s; )
    c.push(ye(n, a)), a.setFullYear(a.getFullYear() + i);
  return o ? c.reverse() : c;
}
function Vn(e, t) {
  const n = vt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = K(e, t?.in), s = o.getDay(), a = (s < r ? -7 : 0) + 6 - (s - r);
  return o.setDate(o.getDate() + a), o.setHours(23, 59, 59, 999), o;
}
function ho(e, t) {
  return Vn(e, { ...t, weekStartsOn: 1 });
}
function gn(e, t) {
  const n = K(e, t?.in), r = n.getMonth(), o = r - r % 3 + 3;
  return n.setMonth(o, 0), n.setHours(23, 59, 59, 999), n;
}
const mo = {
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
}, go = (e, t, n) => {
  let r;
  const o = mo[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Bt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const yo = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, po = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, bo = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Do = {
  date: Bt({
    formats: yo,
    defaultWidth: "full"
  }),
  time: Bt({
    formats: po,
    defaultWidth: "full"
  }),
  dateTime: Bt({
    formats: bo,
    defaultWidth: "full"
  })
}, xo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, wo = (e, t, n, r) => xo[e];
function gt(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const a = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : a;
      o = e.formattingValues[i] || e.formattingValues[a];
    } else {
      const a = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[a];
    }
    const s = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[s];
  };
}
const vo = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Mo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ko = {
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
}, No = {
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
}, So = {
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
}, To = {
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
}, Co = (e, t) => {
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
}, Oo = {
  ordinalNumber: Co,
  era: gt({
    values: vo,
    defaultWidth: "wide"
  }),
  quarter: gt({
    values: Mo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: gt({
    values: ko,
    defaultWidth: "wide"
  }),
  day: gt({
    values: No,
    defaultWidth: "wide"
  }),
  dayPeriod: gt({
    values: So,
    defaultWidth: "wide",
    formattingValues: To,
    defaultFormattingWidth: "wide"
  })
};
function yt(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
    if (!s)
      return null;
    const a = s[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? Yo(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      Wo(i, (d) => d.test(a))
    );
    let l;
    l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(l)
    ) : l;
    const g = t.slice(a.length);
    return { value: l, rest: g };
  };
}
function Wo(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Yo(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function _o(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], s = t.match(e.parsePattern);
    if (!s) return null;
    let a = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    const i = t.slice(o.length);
    return { value: a, rest: i };
  };
}
const Fo = /^(\d+)(th|st|nd|rd)?/i, Eo = /\d+/i, $o = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Io = {
  any: [/^b/i, /^(a|c)/i]
}, Po = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Bo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Uo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Ao = {
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
}, Ho = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, jo = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Lo = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ro = {
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
}, qo = {
  ordinalNumber: _o({
    matchPattern: Fo,
    parsePattern: Eo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: yt({
    matchPatterns: $o,
    defaultMatchWidth: "wide",
    parsePatterns: Io,
    defaultParseWidth: "any"
  }),
  quarter: yt({
    matchPatterns: Po,
    defaultMatchWidth: "wide",
    parsePatterns: Bo,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: yt({
    matchPatterns: Uo,
    defaultMatchWidth: "wide",
    parsePatterns: Ao,
    defaultParseWidth: "any"
  }),
  day: yt({
    matchPatterns: Ho,
    defaultMatchWidth: "wide",
    parsePatterns: jo,
    defaultParseWidth: "any"
  }),
  dayPeriod: yt({
    matchPatterns: Lo,
    defaultMatchWidth: "any",
    parsePatterns: Ro,
    defaultParseWidth: "any"
  })
}, on = {
  code: "en-US",
  formatDistance: go,
  formatLong: Do,
  formatRelative: wo,
  localize: Oo,
  match: qo,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function zo(e, t) {
  const n = K(e, t?.in);
  return en(n, rn(n)) + 1;
}
function er(e, t) {
  const n = K(e, t?.in), r = +Dt(n) - +Vr(n);
  return Math.round(r / jn) + 1;
}
function tr(e, t) {
  const n = K(e, t?.in), r = n.getFullYear(), o = vt(), s = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, a = ye(t?.in || e, 0);
  a.setFullYear(r + 1, 0, s), a.setHours(0, 0, 0, 0);
  const i = be(a, t), c = ye(t?.in || e, 0);
  c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
  const l = be(c, t);
  return +n >= +i ? r + 1 : +n >= +l ? r : r - 1;
}
function Zo(e, t) {
  const n = vt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = tr(e, t), s = ye(t?.in || e, 0);
  return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), be(s, t);
}
function nr(e, t) {
  const n = K(e, t?.in), r = +be(n, t) - +Zo(n, t);
  return Math.round(r / jn) + 1;
}
function ae(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const je = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ae(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ae(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ae(e.getDate(), t.length);
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
    return ae(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ae(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ae(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ae(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ae(o, t.length);
  }
}, nt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, yn = {
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
    return je.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = tr(e, r), s = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const a = s % 100;
      return ae(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(s, { unit: "year" }) : ae(s, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = qn(e);
    return ae(n, t.length);
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
    return ae(n, t.length);
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
        return ae(r, 2);
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
        return ae(r, 2);
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
        return je.M(e, t);
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
        return ae(r + 1, 2);
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
    const o = nr(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ae(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = er(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ae(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : je.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = zo(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ae(r, t.length);
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
    const o = e.getDay(), s = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(s);
      // Padded numerical value
      case "ee":
        return ae(s, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(s, { unit: "day" });
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
    const o = e.getDay(), s = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(s);
      // Padded numerical value
      case "cc":
        return ae(s, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(s, { unit: "day" });
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
        return ae(o, t.length);
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
    switch (r === 12 ? o = nt.noon : r === 0 ? o = nt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = nt.evening : r >= 12 ? o = nt.afternoon : r >= 4 ? o = nt.morning : o = nt.night, t) {
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
    return je.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : je.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ae(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ae(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : je.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : je.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return je.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return bn(r);
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
        return bn(r);
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
        return "GMT" + pn(r, ":");
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
        return "GMT" + pn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Qe(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ae(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ae(+e, t.length);
  }
};
function pn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
  return s === 0 ? n + String(o) : n + String(o) + t + ae(s, 2);
}
function bn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ae(Math.abs(e) / 60, 2) : Qe(e, t);
}
function Qe(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ae(Math.trunc(r / 60), 2), s = ae(r % 60, 2);
  return n + o + t + s;
}
const Dn = (e, t) => {
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
}, rr = (e, t) => {
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
}, Qo = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return Dn(e, t);
  let s;
  switch (r) {
    case "P":
      s = t.dateTime({ width: "short" });
      break;
    case "PP":
      s = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      s = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      s = t.dateTime({ width: "full" });
      break;
  }
  return s.replace("{{date}}", Dn(r, t)).replace("{{time}}", rr(o, t));
}, Go = {
  p: rr,
  P: Qo
}, Ko = /^D+$/, Xo = /^Y+$/, Jo = ["D", "DD", "YY", "YYYY"];
function Vo(e) {
  return Ko.test(e);
}
function es(e) {
  return Xo.test(e);
}
function ts(e, t, n) {
  const r = ns(e, t, n);
  if (console.warn(r), Jo.includes(e)) throw new RangeError(r);
}
function ns(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const rs = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, os = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ss = /^'([^]*?)'?$/, as = /''/g, is = /[a-zA-Z]/;
function cs(e, t, n) {
  const r = vt(), o = n?.locale ?? r.locale ?? on, s = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = K(e, n?.in);
  if (!oo(i))
    throw new RangeError("Invalid time value");
  let c = t.match(os).map((g) => {
    const d = g[0];
    if (d === "p" || d === "P") {
      const S = Go[d];
      return S(g, o.formatLong);
    }
    return g;
  }).join("").match(rs).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const d = g[0];
    if (d === "'")
      return { isToken: !1, value: ls(g) };
    if (yn[d])
      return { isToken: !0, value: g };
    if (d.match(is))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: g };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const l = {
    firstWeekContainsDate: s,
    weekStartsOn: a,
    locale: o
  };
  return c.map((g) => {
    if (!g.isToken) return g.value;
    const d = g.value;
    (!n?.useAdditionalWeekYearTokens && es(d) || !n?.useAdditionalDayOfYearTokens && Vo(d)) && ts(d, t, String(e));
    const S = yn[d[0]];
    return S(i, d, o.localize, l);
  }).join("");
}
function ls(e) {
  const t = e.match(ss);
  return t ? t[1].replace(as, "'") : e;
}
function ds(e, t) {
  const n = K(e, t?.in), r = n.getFullYear(), o = n.getMonth(), s = ye(n, 0);
  return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
}
function Ge(e, t) {
  return K(e, t?.in).getMonth();
}
function ge(e, t) {
  return K(e, t?.in).getFullYear();
}
function us(e, t) {
  return +K(e) > +K(t);
}
function fs(e, t) {
  return +K(e) < +K(t);
}
function hs(e, t, n) {
  const [r, o] = Re(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function ms(e, t, n) {
  const [r, o] = Re(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function gs(e, t) {
  const n = () => ye(t?.in, NaN), o = Ds(e);
  let s;
  if (o.date) {
    const l = xs(o.date, 2);
    s = ws(l.restDateString, l.year);
  }
  if (!s || isNaN(+s)) return n();
  const a = +s;
  let i = 0, c;
  if (o.time && (i = vs(o.time), isNaN(i)))
    return n();
  if (o.timezone) {
    if (c = Ms(o.timezone), isNaN(c)) return n();
  } else {
    const l = new Date(a + i), g = K(0, t?.in);
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
  return K(a + i + c, t?.in);
}
const St = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, ys = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, ps = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, bs = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Ds(e) {
  const t = {}, n = e.split(St.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], St.timeZoneDelimiter.test(t.date) && (t.date = e.split(St.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const o = St.timezone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timezone = o[1]) : t.time = r;
  }
  return t;
}
function xs(e, t) {
  const n = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), r = e.match(n);
  if (!r) return { year: NaN, restDateString: "" };
  const o = r[1] ? parseInt(r[1]) : null, s = r[2] ? parseInt(r[2]) : null;
  return {
    year: s === null ? o : s * 100,
    restDateString: e.slice((r[1] || r[2]).length)
  };
}
function ws(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(ys);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], o = pt(n[1]), s = pt(n[2]) - 1, a = pt(n[3]), i = pt(n[4]), c = pt(n[5]) - 1;
  if (r)
    return Cs(t, i, c) ? ks(t, i, c) : /* @__PURE__ */ new Date(NaN);
  {
    const l = /* @__PURE__ */ new Date(0);
    return !Ss(t, s, a) || !Ts(t, o) ? /* @__PURE__ */ new Date(NaN) : (l.setUTCFullYear(t, s, Math.max(o, a)), l);
  }
}
function pt(e) {
  return e ? parseInt(e) : 1;
}
function vs(e) {
  const t = e.match(ps);
  if (!t) return NaN;
  const n = Ut(t[1]), r = Ut(t[2]), o = Ut(t[3]);
  return Os(n, r, o) ? n * Rn + r * Ln + o * 1e3 : NaN;
}
function Ut(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Ms(e) {
  if (e === "Z") return 0;
  const t = e.match(bs);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), o = t[3] && parseInt(t[3]) || 0;
  return Ws(r, o) ? n * (r * Rn + o * Ln) : NaN;
}
function ks(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, s = (t - 1) * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + s), r;
}
const Ns = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function or(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Ss(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (Ns[t] || (or(e) ? 29 : 28));
}
function Ts(e, t) {
  return t >= 1 && t <= (or(e) ? 366 : 365);
}
function Cs(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function Os(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function Ws(e, t) {
  return t >= 0 && t <= 59;
}
function wt(e, t, n) {
  const r = K(e, n?.in), o = r.getFullYear(), s = r.getDate(), a = ye(e, 0);
  a.setFullYear(o, t, 15), a.setHours(0, 0, 0, 0);
  const i = ds(a);
  return r.setMonth(t, Math.min(s, i)), r;
}
function At(e, t, n) {
  const r = K(e, n?.in), o = Math.trunc(r.getMonth() / 3) + 1, s = t - o;
  return wt(r, r.getMonth() + s * 3);
}
function Xe(e, t, n) {
  const r = K(e, n?.in);
  return isNaN(+r) ? ye(e, NaN) : (r.setFullYear(t), r);
}
function Ys(e, t) {
  const n = Is(t);
  return "formatToParts" in n ? Fs(n, e) : Es(n, e);
}
const _s = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Fs(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let o = 0; o < n.length; o++) {
      const s = _s[n[o].type];
      s !== void 0 && (r[s] = parseInt(n[o].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function Es(e, t) {
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
const Ht = {}, xn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), $s = xn === "06/25/2014, 00:00:00" || xn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function Is(e) {
  return Ht[e] || (Ht[e] = $s ? new Intl.DateTimeFormat("en-US", {
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
  })), Ht[e];
}
function sr(e, t, n, r, o, s, a) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, o, s, a), i;
}
const wn = 36e5, Ps = 6e4, jt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function ar(e, t, n) {
  if (!e)
    return 0;
  let r = jt.timezoneZ.exec(e);
  if (r)
    return 0;
  let o, s;
  if (r = jt.timezoneHH.exec(e), r)
    return o = parseInt(r[1], 10), vn(o) ? -(o * wn) : NaN;
  if (r = jt.timezoneHHMM.exec(e), r) {
    o = parseInt(r[2], 10);
    const a = parseInt(r[3], 10);
    return vn(o, a) ? (s = Math.abs(o) * wn + a * Ps, r[1] === "+" ? -s : s) : NaN;
  }
  if (As(e)) {
    t = new Date(t || Date.now());
    const a = n ? t : Bs(t), i = Xt(a, e);
    return -(n ? i : Us(t, i, e));
  }
  return NaN;
}
function Bs(e) {
  return sr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function Xt(e, t) {
  const n = Ys(e, t), r = sr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let o = e.getTime();
  const s = o % 1e3;
  return o -= s >= 0 ? s : 1e3 + s, r - o;
}
function Us(e, t, n) {
  let o = e.getTime() - t;
  const s = Xt(new Date(o), n);
  if (t === s)
    return t;
  o -= s - t;
  const a = Xt(new Date(o), n);
  return s === a ? s : Math.max(s, a);
}
function vn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Mn = {};
function As(e) {
  if (Mn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Mn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function kn(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const Hs = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Lt = 36e5, Nn = 6e4, js = 2, ve = {
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
  timeZone: Hs
};
function Ls(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? js : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = Rs(e), { year: o, restDateString: s } = qs(r.date, n), a = zs(s, o);
  if (a === null || isNaN(a.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (a) {
    const i = a.getTime();
    let c = 0, l;
    if (r.time && (c = Zs(r.time), c === null || isNaN(c)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (l = ar(r.timeZone || t.timeZone, new Date(i + c)), isNaN(l))
        return /* @__PURE__ */ new Date(NaN);
    } else
      l = kn(new Date(i + c)), l = kn(new Date(i + c + l));
    return new Date(i + c + l);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Rs(e) {
  const t = {};
  let n = ve.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = ve.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const o = ve.timeZone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timeZone = o[1].trim()) : t.time = r;
  }
  return t;
}
function qs(e, t) {
  if (e) {
    const n = ve.YYY[t], r = ve.YYYYY[t];
    let o = ve.YYYY.exec(e) || r.exec(e);
    if (o) {
      const s = o[1];
      return {
        year: parseInt(s, 10),
        restDateString: e.slice(s.length)
      };
    }
    if (o = ve.YY.exec(e) || n.exec(e), o) {
      const s = o[1];
      return {
        year: parseInt(s, 10) * 100,
        restDateString: e.slice(s.length)
      };
    }
  }
  return {
    year: null
  };
}
function zs(e, t) {
  if (t === null)
    return null;
  let n, r, o;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let s = ve.MM.exec(e);
  if (s)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(s[1], 10) - 1, Tn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (s = ve.DDD.exec(e), s) {
    n = /* @__PURE__ */ new Date(0);
    const a = parseInt(s[1], 10);
    return Ks(t, a) ? (n.setUTCFullYear(t, 0, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (s = ve.MMDD.exec(e), s) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(s[1], 10) - 1;
    const a = parseInt(s[2], 10);
    return Tn(t, r, a) ? (n.setUTCFullYear(t, r, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (s = ve.Www.exec(e), s)
    return o = parseInt(s[1], 10) - 1, Cn(o) ? Sn(t, o) : /* @__PURE__ */ new Date(NaN);
  if (s = ve.WwwD.exec(e), s) {
    o = parseInt(s[1], 10) - 1;
    const a = parseInt(s[2], 10) - 1;
    return Cn(o, a) ? Sn(t, o, a) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Zs(e) {
  let t, n, r = ve.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Rt(t) ? t % 24 * Lt : NaN;
  if (r = ve.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Rt(t, n) ? t % 24 * Lt + n * Nn : NaN;
  if (r = ve.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const o = parseFloat(r[3].replace(",", "."));
    return Rt(t, n, o) ? t % 24 * Lt + n * Nn + o * 1e3 : NaN;
  }
  return null;
}
function Sn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, s = t * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + s), r;
}
const Qs = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Gs = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ir(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Tn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = ir(e);
    if (r && n > Gs[t] || !r && n > Qs[t])
      return !1;
  }
  return !0;
}
function Ks(e, t) {
  if (t < 1)
    return !1;
  const n = ir(e);
  return !(n && t > 366 || !n && t > 365);
}
function Cn(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Rt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function Xs(e, t, n) {
  e = Ls(e, n);
  const r = ar(t, e, !0), o = new Date(e.getTime() - r), s = /* @__PURE__ */ new Date(0);
  return s.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), s.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), s;
}
const we = 0, mc = !1, Jt = !0, gc = "firstFullWeek", Js = "UTC";
function L(e) {
  const t = gs(`${e}T00:00:00.000Z`);
  return Xs(t, Js);
}
function se(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ot() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Vs(e, t, n) {
  const r = L(e);
  let o;
  switch (t) {
    case "day":
      o = me(r, n);
      break;
    case "week":
      o = tn(r, n);
      break;
    case "month":
      o = Ue(r, n);
      break;
    case "quarter":
      o = zn(r, n);
      break;
    default:
      o = r;
  }
  return se(o);
}
function ea(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = L(e), s = 0;
    for (r.includes(o.getDay()) || (s = 1); s < n; )
      o = me(o, 1), r.includes(o.getDay()) || s++;
    return se(o);
  } else
    return Vs(e, t, n - 1);
}
function ta(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = L(e), s = 0;
    for (r.includes(o.getDay()) || (s = 1); s < n; )
      o = me(o, -1), r.includes(o.getDay()) || s++;
    return se(o);
  } else {
    const o = L(e);
    let s;
    switch (t) {
      case "day":
        s = me(o, -(n - 1));
        break;
      case "week":
        s = tn(o, -(n - 1));
        break;
      case "month":
        s = Ue(o, -(n - 1));
        break;
      case "quarter":
        s = zn(o, -(n - 1));
        break;
      default:
        s = o;
    }
    return se(s);
  }
}
function cr(e, t, n, r) {
  const o = L(e), s = L(t);
  if (o > s) return 0;
  if (n === "day" && r.length > 0)
    return Jn({ start: o, end: s }).filter(
      (c) => !r.includes(c.getDay())
    ).length;
  switch (n) {
    case "day":
      return Gn(s, o) + 1;
    case "week":
      return co(s, o) + 1;
    case "month":
      return Xn(s, o) + 1;
    case "quarter":
      return io(s, o) + 1;
    default:
      return 1;
  }
}
function na(e, t, n) {
  const r = L(e), o = L(t);
  if (r > o) return [];
  const s = Jn({ start: r, end: o });
  return n.length === 0 ? s.map(se) : s.filter((a) => !n.includes(a.getDay())).map(se);
}
function lr(e, t, n = "day", r = [], o, s, a, i, c) {
  const l = cr(
    e,
    t,
    n,
    r
  ), g = na(
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
  return o !== void 0 && (d.excludeEnabled = o), s && (d.excludeFilterTypes = s), a && (d.excludedSpecificDates = a), i && (d.excludedSavedDates = i), c && (d.excludedDateRanges = c), d;
}
function yc(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function pc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, o] = t, s = parseInt(r, 10), a = parseInt(n, 10), i = parseInt(o, 10);
  if (isNaN(s) || isNaN(a) || isNaN(i) || s < 1 || s > 12 || a < 1 || a > 31 || i < 1900 || i > 2100)
    return null;
  const c = s.toString().padStart(2, "0"), l = a.toString().padStart(2, "0");
  return `${i}-${c}-${l}`;
}
function ra(e) {
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
function oa() {
  const e = Ot(), t = L(e);
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
        const n = se(me(t, -1));
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
          weekStartsOn: we
        }), r = me(n, 6);
        return {
          startDateUtc: se(n),
          endDateUtc: se(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = Ne(t);
        return {
          startDateUtc: se(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = rn(t);
        return {
          startDateUtc: se(n),
          endDateUtc: e
        };
      }
    }
  };
}
const sa = "DateRangePickerDB", aa = 1, Fe = "savedDateRanges";
class ia {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(sa, aa);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (o) => {
          const s = o.target.result;
          s.objectStoreNames.contains(Fe) || s.createObjectStore(Fe, {
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
      const i = this.db.transaction([Fe], "readwrite").objectStore(Fe).put({
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
      const a = this.db.transaction([Fe], "readonly").objectStore(Fe).get(t);
      a.onerror = () => r(a.error), a.onsuccess = () => {
        const i = a.result;
        i && i.data ? n(i.data) : n(null);
      };
    });
  }
  /**
   * Delete data from IndexedDB
   */
  async deleteData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const a = this.db.transaction([Fe], "readwrite").objectStore(Fe).delete(t);
      a.onerror = () => r(a.error), a.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const s = this.db.transaction([Fe], "readwrite").objectStore(Fe).clear();
      s.onerror = () => n(s.error), s.onsuccess = () => t();
    });
  }
}
const st = new ia(), qt = "savedDateRanges";
function ca({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r,
  disabled: o = !1
}) {
  const [s, a] = V([]), [i, c] = V(!1), [l, g] = V(""), [d, S] = V(!1);
  Oe(() => {
    (async () => {
      await st.init();
      const C = await st.getData(
        qt
      );
      C && a(C);
    })();
  }, []);
  const F = oa(), D = (f) => {
    if (o) return;
    const { startDateUtc: C, endDateUtc: y } = f();
    e(C, y);
  }, _ = async () => {
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
    }, C = [...s, f];
    a(C), await st.saveData(qt, C), g(""), c(!1);
  }, P = async (f) => {
    if (o) return;
    const C = s.filter((y) => y.id !== f);
    a(C), await st.saveData(qt, C);
  }, $ = (f) => {
    o || (t ? t(f.selection) : e(f.selection.startDateUtc, f.selection.endDateUtc));
  }, k = (f, C) => {
    const y = (O) => (/* @__PURE__ */ new Date(O + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return f === C ? y(f) : `${y(f)} - ${y(C)}`;
  };
  return /* @__PURE__ */ A(
    "div",
    {
      className: `w-44 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden ${o ? "opacity-60" : ""}`,
      style: { ...r },
      children: [
        /* @__PURE__ */ h("div", { className: "mb-1 mt-4 px-3 flex-shrink-0", children: /* @__PURE__ */ h("div", { className: "flex flex-col", children: Object.values(F).map((f) => {
          const { startDateUtc: C, endDateUtc: y } = f.getValue();
          return /* @__PURE__ */ A(
            "button",
            {
              onClick: () => D(f.getValue),
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
                    children: k(C, y)
                  }
                )
              ]
            },
            f.label
          );
        }) }) }),
        /* @__PURE__ */ A("div", { className: "flex justify-between flex-col flex-1 min-h-0 border-t border-gray-200 px-3 h-full", children: [
          /* @__PURE__ */ A("div", { children: [
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-3 flex-shrink-0 mt-3", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ h("h3", { className: "text-xs font-semibold text-[#757575]", children: "Saved Dates" }) }),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => {
                    o || S(!d);
                  },
                  disabled: o,
                  className: `text-gray-400 ${o ? "cursor-not-allowed opacity-50" : "hover:text-gray-600"}`,
                  children: /* @__PURE__ */ h(Hr, { className: "w-3 h-3" })
                }
              )
            ] }),
            d && /* @__PURE__ */ h("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
            s.length === 0 ? /* @__PURE__ */ h("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ h("div", { className: "space-y-3 mb-3 overflow-y-auto flex-1 min-h-0", children: s.map((f) => /* @__PURE__ */ A(
              "div",
              {
                className: "group bg-white rounded-md hover:shadow-sm transition-all",
                children: [
                  /* @__PURE__ */ A("div", { className: "flex items-start justify-between px-1", children: [
                    /* @__PURE__ */ h(
                      "button",
                      {
                        onClick: () => $(f),
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
                        onClick: () => P(f.id),
                        disabled: o,
                        className: `${o ? "opacity-40 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"} text-red-500 hover:text-red-700 transition-opacity ml-2`,
                        children: /* @__PURE__ */ h(Zr, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      className: `text-[10px] leading-relaxed font-medium px-1 ${o ? "text-gray-400" : "text-[#61708F]"}`,
                      children: k(
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
                /* @__PURE__ */ h(Lr, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          ) })
        ] }),
        i && /* @__PURE__ */ A(ot, { children: [
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
                    f.key === "Enter" && _();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ A("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
              /* @__PURE__ */ A("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Range:" }),
                " ",
                k(
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
                  onClick: _,
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
function la(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ct = { exports: {} }, da = Ct.exports, On;
function ua() {
  return On || (On = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(da, (function() {
      var n = 1e3, r = 6e4, o = 36e5, s = "millisecond", a = "second", i = "minute", c = "hour", l = "day", g = "week", d = "month", S = "quarter", F = "year", D = "date", _ = "Invalid Date", P = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, $ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, k = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(T) {
        var b = ["th", "st", "nd", "rd"], v = T % 100;
        return "[" + T + (b[(v - 20) % 10] || b[v] || b[0]) + "]";
      } }, f = function(T, b, v) {
        var w = String(T);
        return !w || w.length >= b ? T : "" + Array(b + 1 - w.length).join(v) + T;
      }, C = { s: f, z: function(T) {
        var b = -T.utcOffset(), v = Math.abs(b), w = Math.floor(v / 60), M = v % 60;
        return (b <= 0 ? "+" : "-") + f(w, 2, "0") + ":" + f(M, 2, "0");
      }, m: function T(b, v) {
        if (b.date() < v.date()) return -T(v, b);
        var w = 12 * (v.year() - b.year()) + (v.month() - b.month()), M = b.clone().add(w, d), E = v - M < 0, B = b.clone().add(w + (E ? -1 : 1), d);
        return +(-(w + (v - M) / (E ? M - B : B - M)) || 0);
      }, a: function(T) {
        return T < 0 ? Math.ceil(T) || 0 : Math.floor(T);
      }, p: function(T) {
        return { M: d, y: F, w: g, d: l, D, h: c, m: i, s: a, ms: s, Q: S }[T] || String(T || "").toLowerCase().replace(/s$/, "");
      }, u: function(T) {
        return T === void 0;
      } }, y = "en", O = {};
      O[y] = k;
      var Y = "$isDayjsObject", m = function(T) {
        return T instanceof j || !(!T || !T[Y]);
      }, I = function T(b, v, w) {
        var M;
        if (!b) return y;
        if (typeof b == "string") {
          var E = b.toLowerCase();
          O[E] && (M = E), v && (O[E] = v, M = E);
          var B = b.split("-");
          if (!M && B.length > 1) return T(B[0]);
        } else {
          var q = b.name;
          O[q] = b, M = q;
        }
        return !w && M && (y = M), M || !w && y;
      }, N = function(T, b) {
        if (m(T)) return T.clone();
        var v = typeof b == "object" ? b : {};
        return v.date = T, v.args = arguments, new j(v);
      }, W = C;
      W.l = I, W.i = m, W.w = function(T, b) {
        return N(T, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
      };
      var j = (function() {
        function T(v) {
          this.$L = I(v.locale, null, !0), this.parse(v), this.$x = this.$x || v.x || {}, this[Y] = !0;
        }
        var b = T.prototype;
        return b.parse = function(v) {
          this.$d = (function(w) {
            var M = w.date, E = w.utc;
            if (M === null) return /* @__PURE__ */ new Date(NaN);
            if (W.u(M)) return /* @__PURE__ */ new Date();
            if (M instanceof Date) return new Date(M);
            if (typeof M == "string" && !/Z$/i.test(M)) {
              var B = M.match(P);
              if (B) {
                var q = B[2] - 1 || 0, G = (B[7] || "0").substring(0, 3);
                return E ? new Date(Date.UTC(B[1], q, B[3] || 1, B[4] || 0, B[5] || 0, B[6] || 0, G)) : new Date(B[1], q, B[3] || 1, B[4] || 0, B[5] || 0, B[6] || 0, G);
              }
            }
            return new Date(M);
          })(v), this.init();
        }, b.init = function() {
          var v = this.$d;
          this.$y = v.getFullYear(), this.$M = v.getMonth(), this.$D = v.getDate(), this.$W = v.getDay(), this.$H = v.getHours(), this.$m = v.getMinutes(), this.$s = v.getSeconds(), this.$ms = v.getMilliseconds();
        }, b.$utils = function() {
          return W;
        }, b.isValid = function() {
          return this.$d.toString() !== _;
        }, b.isSame = function(v, w) {
          var M = N(v);
          return this.startOf(w) <= M && M <= this.endOf(w);
        }, b.isAfter = function(v, w) {
          return N(v) < this.startOf(w);
        }, b.isBefore = function(v, w) {
          return this.endOf(w) < N(v);
        }, b.$g = function(v, w, M) {
          return W.u(v) ? this[w] : this.set(M, v);
        }, b.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, b.valueOf = function() {
          return this.$d.getTime();
        }, b.startOf = function(v, w) {
          var M = this, E = !!W.u(w) || w, B = W.p(v), q = function(te, ce) {
            var he = W.w(M.$u ? Date.UTC(M.$y, ce, te) : new Date(M.$y, ce, te), M);
            return E ? he : he.endOf(l);
          }, G = function(te, ce) {
            return W.w(M.toDate()[te].apply(M.toDate("s"), (E ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ce)), M);
          }, J = this.$W, ee = this.$M, oe = this.$D, fe = "set" + (this.$u ? "UTC" : "");
          switch (B) {
            case F:
              return E ? q(1, 0) : q(31, 11);
            case d:
              return E ? q(1, ee) : q(0, ee + 1);
            case g:
              var ne = this.$locale().weekStart || 0, re = (J < ne ? J + 7 : J) - ne;
              return q(E ? oe - re : oe + (6 - re), ee);
            case l:
            case D:
              return G(fe + "Hours", 0);
            case c:
              return G(fe + "Minutes", 1);
            case i:
              return G(fe + "Seconds", 2);
            case a:
              return G(fe + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, b.endOf = function(v) {
          return this.startOf(v, !1);
        }, b.$set = function(v, w) {
          var M, E = W.p(v), B = "set" + (this.$u ? "UTC" : ""), q = (M = {}, M[l] = B + "Date", M[D] = B + "Date", M[d] = B + "Month", M[F] = B + "FullYear", M[c] = B + "Hours", M[i] = B + "Minutes", M[a] = B + "Seconds", M[s] = B + "Milliseconds", M)[E], G = E === l ? this.$D + (w - this.$W) : w;
          if (E === d || E === F) {
            var J = this.clone().set(D, 1);
            J.$d[q](G), J.init(), this.$d = J.set(D, Math.min(this.$D, J.daysInMonth())).$d;
          } else q && this.$d[q](G);
          return this.init(), this;
        }, b.set = function(v, w) {
          return this.clone().$set(v, w);
        }, b.get = function(v) {
          return this[W.p(v)]();
        }, b.add = function(v, w) {
          var M, E = this;
          v = Number(v);
          var B = W.p(w), q = function(ee) {
            var oe = N(E);
            return W.w(oe.date(oe.date() + Math.round(ee * v)), E);
          };
          if (B === d) return this.set(d, this.$M + v);
          if (B === F) return this.set(F, this.$y + v);
          if (B === l) return q(1);
          if (B === g) return q(7);
          var G = (M = {}, M[i] = r, M[c] = o, M[a] = n, M)[B] || 1, J = this.$d.getTime() + v * G;
          return W.w(J, this);
        }, b.subtract = function(v, w) {
          return this.add(-1 * v, w);
        }, b.format = function(v) {
          var w = this, M = this.$locale();
          if (!this.isValid()) return M.invalidDate || _;
          var E = v || "YYYY-MM-DDTHH:mm:ssZ", B = W.z(this), q = this.$H, G = this.$m, J = this.$M, ee = M.weekdays, oe = M.months, fe = M.meridiem, ne = function(ce, he, De, Te) {
            return ce && (ce[he] || ce(w, E)) || De[he].slice(0, Te);
          }, re = function(ce) {
            return W.s(q % 12 || 12, ce, "0");
          }, te = fe || function(ce, he, De) {
            var Te = ce < 12 ? "AM" : "PM";
            return De ? Te.toLowerCase() : Te;
          };
          return E.replace($, (function(ce, he) {
            return he || (function(De) {
              switch (De) {
                case "YY":
                  return String(w.$y).slice(-2);
                case "YYYY":
                  return W.s(w.$y, 4, "0");
                case "M":
                  return J + 1;
                case "MM":
                  return W.s(J + 1, 2, "0");
                case "MMM":
                  return ne(M.monthsShort, J, oe, 3);
                case "MMMM":
                  return ne(oe, J);
                case "D":
                  return w.$D;
                case "DD":
                  return W.s(w.$D, 2, "0");
                case "d":
                  return String(w.$W);
                case "dd":
                  return ne(M.weekdaysMin, w.$W, ee, 2);
                case "ddd":
                  return ne(M.weekdaysShort, w.$W, ee, 3);
                case "dddd":
                  return ee[w.$W];
                case "H":
                  return String(q);
                case "HH":
                  return W.s(q, 2, "0");
                case "h":
                  return re(1);
                case "hh":
                  return re(2);
                case "a":
                  return te(q, G, !0);
                case "A":
                  return te(q, G, !1);
                case "m":
                  return String(G);
                case "mm":
                  return W.s(G, 2, "0");
                case "s":
                  return String(w.$s);
                case "ss":
                  return W.s(w.$s, 2, "0");
                case "SSS":
                  return W.s(w.$ms, 3, "0");
                case "Z":
                  return B;
              }
              return null;
            })(ce) || B.replace(":", "");
          }));
        }, b.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, b.diff = function(v, w, M) {
          var E, B = this, q = W.p(w), G = N(v), J = (G.utcOffset() - this.utcOffset()) * r, ee = this - G, oe = function() {
            return W.m(B, G);
          };
          switch (q) {
            case F:
              E = oe() / 12;
              break;
            case d:
              E = oe();
              break;
            case S:
              E = oe() / 3;
              break;
            case g:
              E = (ee - J) / 6048e5;
              break;
            case l:
              E = (ee - J) / 864e5;
              break;
            case c:
              E = ee / o;
              break;
            case i:
              E = ee / r;
              break;
            case a:
              E = ee / n;
              break;
            default:
              E = ee;
          }
          return M ? E : W.a(E);
        }, b.daysInMonth = function() {
          return this.endOf(d).$D;
        }, b.$locale = function() {
          return O[this.$L];
        }, b.locale = function(v, w) {
          if (!v) return this.$L;
          var M = this.clone(), E = I(v, w, !0);
          return E && (M.$L = E), M;
        }, b.clone = function() {
          return W.w(this.$d, this);
        }, b.toDate = function() {
          return new Date(this.valueOf());
        }, b.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, b.toISOString = function() {
          return this.$d.toISOString();
        }, b.toString = function() {
          return this.$d.toUTCString();
        }, T;
      })(), Z = j.prototype;
      return N.prototype = Z, [["$ms", s], ["$s", a], ["$m", i], ["$H", c], ["$W", l], ["$M", d], ["$y", F], ["$D", D]].forEach((function(T) {
        Z[T[1]] = function(b) {
          return this.$g(b, T[0], T[1]);
        };
      })), N.extend = function(T, b) {
        return T.$i || (T(b, j, N), T.$i = !0), N;
      }, N.locale = I, N.isDayjs = m, N.unix = function(T) {
        return N(1e3 * T);
      }, N.en = O[y], N.Ls = O, N.p = {}, N;
    }));
  })(Ct)), Ct.exports;
}
var fa = ua();
const ha = /* @__PURE__ */ la(fa), Tt = (e) => {
  if (!e)
    return null;
  const t = ha(e);
  return t.isValid() ? t : null;
};
function ma({
  startDateUtc: e,
  endDateUtc: t,
  duration: n,
  unit: r,
  excludeEnabled: o,
  activeDateField: s,
  onStartDateChange: a,
  onEndDateChange: i,
  onDurationChange: c,
  onActiveFieldChange: l
}) {
  const g = Le(null), [d, S] = V(0), [F, D] = V(
    () => Tt(e)
  ), [_, P] = V(
    () => Tt(t)
  ), [$, k] = V(!1), [f, C] = V(!1);
  Oe(() => {
    if (g.current) {
      const W = document.createElement("canvas").getContext("2d");
      if (W) {
        W.font = "14px system-ui, -apple-system, sans-serif";
        const j = W.measureText(n.toString()).width;
        S(12 + j + 4);
      }
    }
  }, [n]);
  const y = (N, W) => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: o ? "#f3f4f6" : N ? "#ffffff" : "#f9fafb",
      "& fieldset": {
        borderColor: W ? void 0 : N ? "#3b82f6" : void 0
      },
      "&:hover fieldset": {
        borderColor: W ? void 0 : N ? "#2563eb" : void 0
      },
      "&.Mui-focused": {
        backgroundColor: o ? "#f3f4f6" : "#ffffff"
      },
      "&.Mui-focused fieldset": {
        borderColor: W ? void 0 : "#3b82f6",
        boxShadow: W ? void 0 : "0 0 0 2px rgba(59,130,246,0.2)"
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
    const N = Tt(e);
    D(N), (!e || N && N.isValid()) && k(!1);
  }, [e]), Oe(() => {
    const N = Tt(t);
    P(N), (!t || N && N.isValid()) && C(!1);
  }, [t]);
  const O = (N, W) => {
    D(N), W?.validationError == null && (N ? N.isValid() && a(N.format("YYYY-MM-DD")) : a(""));
  }, Y = (N) => {
    k(N != null);
  }, m = (N, W) => {
    P(N), W?.validationError == null && (N ? N.isValid() && i(N.format("YYYY-MM-DD")) : i(""));
  }, I = (N) => {
    C(N != null);
  };
  return /* @__PURE__ */ h(Cr, { dateAdapter: Or, children: /* @__PURE__ */ A("div", { className: "flex gap-3 pb-2 px-4 border-b border-gray-200", children: [
    /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${o ? "text-gray-400" : "text-[#61708F]"}`,
          children: "Start Date"
        }
      ),
      /* @__PURE__ */ h(
        an,
        {
          value: F,
          onChange: O,
          onError: Y,
          format: "DD/MM/YYYY",
          disabled: o,
          onFocus: () => l("start"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              error: $,
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
                ...y(
                  s === "start",
                  $
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
        an,
        {
          value: _,
          onChange: m,
          onError: I,
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
                ...y(
                  s === "end",
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
            onChange: (N) => c(Number(N.target.value)),
            disabled: o,
            className: `w-[120px] h-[28px] pl-3 pr-10 py-2 text-gray-500 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${o ? "bg-gray-100" : "bg-[#f9fafb]"}`
          }
        ),
        /* @__PURE__ */ h(
          "span",
          {
            className: `absolute top-1/2 -translate-y-1/2 text-[12px] pointer-events-none ${o ? "text-gray-300" : "text-gray-500"}`,
            style: { left: `${d}px` },
            children: ra(r)
          }
        )
      ] })
    ] })
  ] }) });
}
const ga = ["day", "week", "month", "quarter"];
function ya({
  unit: e,
  excludeEnabled: t,
  onUnitChange: n
}) {
  return /* @__PURE__ */ h("div", { className: "flex gap-2 mb-2 justify-end border-b border-gray-200 pb-2 pr-4", children: ga.map((r) => /* @__PURE__ */ h(
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
const Wn = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], pa = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], ba = [
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
], Da = "var(--adrp-container-height, min(468px, 85vh))", zt = "var(--adrp-container-width, min(696px, 98vw))";
function xa({
  excludeEnabled: e,
  excludeFilterTypes: t,
  activeFilterView: n,
  excludedWeekdays: r,
  excludedSavedDates: o,
  savedDatesSearchTerm: s,
  filteredSavedDates: a,
  onExcludeToggle: i,
  onFilterButtonClick: c,
  onRemoveFilterType: l,
  onCancel: g,
  onSave: d,
  onToggleWeekday: S,
  setSavedDatesSearchTerm: F,
  setExcludedSavedDates: D,
  setExcludeFilterTypes: _,
  setActiveFilterView: P,
  savedDatesForFilter: $
}) {
  const k = We(() => {
    const m = /* @__PURE__ */ new Map();
    for (const I of $)
      m.set(I.id, I);
    return m;
  }, [$]), f = Wn.filter(
    (m) => r.includes(m.value)
  ), C = o.map((m) => k.get(m)).filter((m) => !!m), y = (m) => {
    const I = /* @__PURE__ */ new Date(m.selection.startDateUtc + "T00:00:00"), N = /* @__PURE__ */ new Date(m.selection.endDateUtc + "T00:00:00"), W = {
      month: "short",
      day: "numeric",
      year: "numeric"
    }, j = I.toLocaleDateString("en-US", W), Z = N.toLocaleDateString("en-US", W);
    return j === Z ? j : `${j} - ${Z}`;
  }, O = (m) => {
    const I = y(m), N = m.label?.trim();
    return N && N.toLowerCase() !== I.toLowerCase() ? N : I;
  }, Y = (m) => {
    D((I) => {
      if (!I.includes(m))
        return I;
      const N = I.filter((W) => W !== m);
      return N.length === 0 && _(
        (W) => W.filter((j) => j !== "saved-dates")
      ), N;
    });
  };
  return /* @__PURE__ */ A("div", { className: "py-2 border-b border-gray-200", children: [
    /* @__PURE__ */ A("div", { className: "flex items-center gap-3 px-4", children: [
      /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: "exclude-checkbox",
            checked: e,
            onChange: (m) => i(m.target.checked),
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
      e && /* @__PURE__ */ A(ot, { children: [
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2 relative", children: [
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              onClick: () => c("days"),
              style: { width: "80px", height: "24px" },
              className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "days" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
              children: [
                /* @__PURE__ */ h("span", { children: "weeks" }),
                /* @__PURE__ */ h(ln, { className: "w-4 h-4 text-gray-400" })
              ]
            }
          ),
          n === "days" && t.includes("days") && /* @__PURE__ */ h("div", { className: "absolute top-full left-0 mt-2 z-20", children: /* @__PURE__ */ h("div", { className: "flex flex-col gap-3 px-2 py-2 bg-white border border-gray-200 rounded-xl shadow-xl", children: /* @__PURE__ */ h("div", { className: "flex justify-center", children: /* @__PURE__ */ h("div", { className: "inline-flex flex-col items-center gap-2 ", children: Wn.map((m) => {
            const I = r.includes(
              m.value
            );
            return /* @__PURE__ */ h(
              "button",
              {
                onClick: () => S(m.value),
                className: `w-9 h-9 flex items-center justify-center rounded-md text-sm font-semibold transition-colors ${I ? "bg-[#CEDBF5] shadow-inner" : "text-gray-800 hover:bg-gray-100"}`,
                children: m.label.charAt(0)
              },
              m.value
            );
          }) }) }) }) }),
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              onClick: () => c("saved-dates"),
              style: { width: "80px", height: "24px" },
              className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "saved-dates" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
              children: [
                /* @__PURE__ */ h("span", { children: "Saved" }),
                /* @__PURE__ */ h(ln, { className: "w-4 h-4 text-gray-400" })
              ]
            }
          ),
          e && n === "saved-dates" && t.includes("saved-dates") && /* @__PURE__ */ h("div", { className: "absolute top-full left-0 mt-2 z-20 w-80", children: /* @__PURE__ */ A("div", { className: "flex flex-col gap-3 px-3 py-3 bg-white border border-gray-200 rounded-xl shadow-xl", children: [
            /* @__PURE__ */ A("div", { className: "relative", children: [
              /* @__PURE__ */ h(qr, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: "text",
                  value: s,
                  onChange: (m) => F(m.target.value),
                  placeholder: "Search saved dates",
                  className: "w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            a.length === 0 ? /* @__PURE__ */ h("p", { className: "text-sm text-gray-500 text-center py-6", children: "No saved dates found" }) : /* @__PURE__ */ h("div", { className: "max-h-64 overflow-y-auto space-y-2 pr-1", children: a.map((m) => {
              const I = o.includes(
                m.id
              ), N = (/* @__PURE__ */ new Date(
                m.selection.startDateUtc + "T00:00:00"
              )).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              }), W = (/* @__PURE__ */ new Date(
                m.selection.endDateUtc + "T00:00:00"
              )).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
              return /* @__PURE__ */ A(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    D((j) => {
                      if (j.includes(m.id)) {
                        const Z = j.filter(
                          (T) => T !== m.id
                        );
                        return Z.length === 0 && _(
                          (T) => T.filter(
                            (b) => b !== "saved-dates"
                          )
                        ), Z;
                      }
                      return _((Z) => Z.includes("saved-dates") ? Z : [...Z, "saved-dates"]), [...j, m.id];
                    });
                  },
                  className: `w-full flex items-center justify-between px-3 py-2 rounded-md border text-left transition-colors ${I ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200 hover:bg-gray-50"}`,
                  children: [
                    /* @__PURE__ */ A("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ h("span", { className: "text-sm font-medium text-gray-900", children: m.label }),
                      /* @__PURE__ */ A("span", { className: "text-xs text-gray-600", children: [
                        N,
                        " - ",
                        W
                      ] })
                    ] }),
                    /* @__PURE__ */ h("div", { className: "ml-2 flex items-center", children: /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: I,
                        onChange: () => {
                        },
                        className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 pointer-events-none"
                      }
                    ) })
                  ]
                },
                m.id
              );
            }) }),
            /* @__PURE__ */ A("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ A("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
                /* @__PURE__ */ h(Ir, { className: "w-4 h-4 text-gray-400" }),
                /* @__PURE__ */ A("span", { children: [
                  o.length,
                  " selected"
                ] })
              ] }),
              /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  onClick: () => l("saved-dates"),
                  className: "text-xs font-medium text-blue-600 hover:text-blue-700",
                  children: "Clear"
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2 ml-auto", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => {
                g(), P(null);
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
                d(), P(null);
              },
              className: "px-4 py-2 bg-[#003DB8] text-white text-xs font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors",
              children: "Save Exclusion"
            }
          )
        ] })
      ] })
    ] }),
    (f.length > 0 || C.length > 0) && /* @__PURE__ */ h("div", { className: "w-full border-t border-gray-200 pt-3 px-4", children: /* @__PURE__ */ A("div", { className: "flex flex-wrap gap-2", children: [
      f.map((m) => {
        const I = pa[m.value] ?? m.label;
        return /* @__PURE__ */ A(
          "span",
          {
            className: "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700",
            title: I,
            children: [
              I,
              e && /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  onClick: () => S(m.value),
                  className: "text-gray-400 hover:text-gray-600 transition-colors",
                  "aria-label": `Remove ${I}`,
                  children: /* @__PURE__ */ h(dn, { className: "h-4 w-4" })
                }
              )
            ]
          },
          m.value
        );
      }),
      C.map((m) => {
        const I = O(m), N = y(m);
        return /* @__PURE__ */ A(
          "span",
          {
            className: "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700",
            title: N,
            children: [
              I,
              e && /* @__PURE__ */ h(
                "button",
                {
                  type: "button",
                  onClick: () => Y(m.id),
                  className: "text-gray-400 hover:text-gray-600 transition-colors",
                  "aria-label": `Remove ${I}`,
                  children: /* @__PURE__ */ h(dn, { className: "h-4 w-4" })
                }
              )
            ]
          },
          m.id
        );
      })
    ] }) })
  ] });
}
function wa(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const va = {}, bt = {};
function Ke(e, t) {
  try {
    const r = (va[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in bt ? bt[r] : Yn(r, r.split(":"));
  } catch {
    if (e in bt) return bt[e];
    const n = e?.match(Ma);
    return n ? Yn(e, n.slice(1)) : NaN;
  }
}
const Ma = /([+-]\d\d):?(\d\d)?/;
function Yn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return bt[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class $e extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ke(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), dr(this), Vt(this)) : this.setTime(Date.now());
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
    return Date.prototype.setTime.apply(this, arguments), Vt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new $e(+new Date(t), this.timeZone);
  }
  //#endregion
}
const _n = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!_n.test(e)) return;
  const t = e.replace(_n, "$1UTC");
  $e.prototype[t] && (e.startsWith("get") ? $e.prototype[e] = function() {
    return this.internal[t]();
  } : ($e.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), ka(this), +this;
  }, $e.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Vt(this), +this;
  }));
});
function Vt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ke(e.timeZone, e) * 60));
}
function ka(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), dr(e);
}
function dr(e) {
  const t = Ke(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), s = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = o - s, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const l = /* @__PURE__ */ new Date(+e);
  l.setUTCSeconds(0);
  const g = o > 0 ? l.getSeconds() : (l.getSeconds() - 60) % 60, d = Math.round(-(Ke(e.timeZone, e) * 60)) % 60;
  (d || g) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + g));
  const S = Ke(e.timeZone, e), F = S > 0 ? Math.floor(S) : Math.ceil(S), _ = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - F, P = F !== n, $ = _ - c;
  if (P && $) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + $);
    const k = Ke(e.timeZone, e), f = k > 0 ? Math.floor(k) : Math.ceil(k), C = F - f;
    C && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + C), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + C));
  }
}
class xe extends $e {
  //#region static
  static tz(t, ...n) {
    return n.length ? new xe(...n, t) : new xe(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${wa(this.timeZone, this)})`;
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
    return new xe(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new xe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Fn = 5, Na = 4;
function Sa(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, Fn * 7 - 1);
  return t.getMonth(e) === t.getMonth(s) ? Fn : Na;
}
function ur(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Ta(e, t) {
  const n = ur(e, t), r = Sa(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? xe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, s) => this.overrides?.newDate ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new xe(r, o, s, this.options.timeZone) : new Date(r, o, s), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : me(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : Ue(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : tn(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : eo(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : en(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Qn(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : lo(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : fo(r), s = new Set(o.map((i) => this.getYear(i)));
      if (s.size === o.length)
        return o;
      const a = [];
      return s.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Ta(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : ho(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : at(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : Vn(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : uo(r), this.format = (r, o, s) => {
      const a = this.overrides?.format ? this.overrides.format(r, o, this.options) : cs(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : er(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ge(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ge(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : nr(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : us(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : fs(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Zn(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : ro(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : hs(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : ms(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : to(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : no(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : wt(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : Xe(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : ur(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : xt(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Dt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Ne(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : be(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : rn(r), this.options = { locale: on, ...t }, this.overrides = n;
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
    return t && Se.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, s = n?.code;
    if (s && Se.yearFirstLocales.has(s))
      try {
        return new Intl.DateTimeFormat(s, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const a = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, a);
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
const Pe = new Se();
class fr {
  constructor(t, n, r = Pe) {
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
class Ca {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Oa {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Wa(e) {
  return U.createElement("button", { ...e });
}
function Ya(e) {
  return U.createElement("span", { ...e });
}
function _a(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    U.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && U.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && U.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && U.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && U.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Fa(e) {
  const { day: t, modifiers: n, ...r } = e;
  return U.createElement("td", { ...r });
}
function Ea(e) {
  const { day: t, modifiers: n, ...r } = e, o = U.useRef(null);
  return U.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), U.createElement("button", { ref: o, ...r });
}
var H;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(H || (H = {}));
var ue;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ue || (ue = {}));
var Ye;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ye || (Ye = {}));
var ke;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(ke || (ke = {}));
function $a(e) {
  const { options: t, className: n, components: r, classNames: o, ...s } = e, a = [o[H.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === s.value);
  return U.createElement(
    "span",
    { "data-disabled": s.disabled, className: o[H.DropdownRoot] },
    U.createElement(r.Select, { className: a, ...s }, t?.map(({ value: c, label: l, disabled: g }) => U.createElement(r.Option, { key: c, value: c, disabled: g }, l))),
    U.createElement(
      "span",
      { className: o[H.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      U.createElement(r.Chevron, { orientation: "down", size: 18, className: o[H.Chevron] })
    )
  );
}
function Ia(e) {
  return U.createElement("div", { ...e });
}
function Pa(e) {
  return U.createElement("div", { ...e });
}
function Ba(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return U.createElement("div", { ...r }, e.children);
}
function Ua(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return U.createElement("div", { ...r });
}
function Aa(e) {
  return U.createElement("table", { ...e });
}
function Ha(e) {
  return U.createElement("div", { ...e });
}
const hr = Nr(void 0);
function Mt() {
  const e = Sr(hr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function ja(e) {
  const { components: t } = Mt();
  return U.createElement(t.Dropdown, { ...e });
}
function La(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: a, classNames: i, labels: { labelPrevious: c, labelNext: l } } = Mt(), g = X((S) => {
    o && n?.(S);
  }, [o, n]), d = X((S) => {
    r && t?.(S);
  }, [r, t]);
  return U.createElement(
    "nav",
    { ...s },
    U.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[H.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      U.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[H.Chevron], orientation: "left" })
    ),
    U.createElement(
      a.NextMonthButton,
      { type: "button", className: i[H.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": l(o), onClick: g },
      U.createElement(a.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[H.Chevron] })
    )
  );
}
function Ra(e) {
  const { components: t } = Mt();
  return U.createElement(t.Button, { ...e });
}
function qa(e) {
  return U.createElement("option", { ...e });
}
function za(e) {
  const { components: t } = Mt();
  return U.createElement(t.Button, { ...e });
}
function Za(e) {
  const { rootRef: t, ...n } = e;
  return U.createElement("div", { ...n, ref: t });
}
function Qa(e) {
  return U.createElement("select", { ...e });
}
function Ga(e) {
  const { week: t, ...n } = e;
  return U.createElement("tr", { ...n });
}
function Ka(e) {
  return U.createElement("th", { ...e });
}
function Xa(e) {
  return U.createElement(
    "thead",
    { "aria-hidden": !0 },
    U.createElement("tr", { ...e })
  );
}
function Ja(e) {
  const { week: t, ...n } = e;
  return U.createElement("th", { ...n });
}
function Va(e) {
  return U.createElement("th", { ...e });
}
function ei(e) {
  return U.createElement("tbody", { ...e });
}
function ti(e) {
  const { components: t } = Mt();
  return U.createElement(t.Dropdown, { ...e });
}
const ni = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Wa,
  CaptionLabel: Ya,
  Chevron: _a,
  Day: Fa,
  DayButton: Ea,
  Dropdown: $a,
  DropdownNav: Ia,
  Footer: Pa,
  Month: Ba,
  MonthCaption: Ua,
  MonthGrid: Aa,
  Months: Ha,
  MonthsDropdown: ja,
  Nav: La,
  NextMonthButton: Ra,
  Option: qa,
  PreviousMonthButton: za,
  Root: Za,
  Select: Qa,
  Week: Ga,
  WeekNumber: Ja,
  WeekNumberHeader: Va,
  Weekday: Ka,
  Weekdays: Xa,
  Weeks: ei,
  YearsDropdown: ti
}, Symbol.toStringTag, { value: "Module" }));
function Ae(e, t, n = !1, r = Pe) {
  let { from: o, to: s } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return o && s ? (a(s, o) < 0 && ([o, s] = [s, o]), a(t, o) >= (n ? 1 : 0) && a(s, t) >= (n ? 1 : 0)) : !n && s ? i(s, t) : !n && o ? i(o, t) : !1;
}
function mr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function sn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function gr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function yr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function pr(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function br(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function He(e, t, n = Pe) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: s, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (br(i, n))
      return i.includes(e);
    if (sn(i))
      return Ae(i, e, !1, n);
    if (pr(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (mr(i)) {
      const c = s(i.before, e), l = s(i.after, e), g = c > 0, d = l < 0;
      return a(i.before, i.after) ? d && g : g || d;
    }
    return gr(i) ? s(e, i.after) > 0 : yr(i) ? s(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function ri(e, t, n, r, o) {
  const { disabled: s, hidden: a, modifiers: i, showOutsideDays: c, broadcastCalendar: l, today: g } = t, { isSameDay: d, isSameMonth: S, startOfMonth: F, isBefore: D, endOfMonth: _, isAfter: P } = o, $ = n && F(n), k = r && _(r), f = {
    [ue.focused]: [],
    [ue.outside]: [],
    [ue.disabled]: [],
    [ue.hidden]: [],
    [ue.today]: []
  }, C = {};
  for (const y of e) {
    const { date: O, displayMonth: Y } = y, m = !!(Y && !S(O, Y)), I = !!($ && D(O, $)), N = !!(k && P(O, k)), W = !!(s && He(O, s, o)), j = !!(a && He(O, a, o)) || I || N || // Broadcast calendar will show outside days as default
    !l && !c && m || l && c === !1 && m, Z = d(O, g ?? o.today());
    m && f.outside.push(y), W && f.disabled.push(y), j && f.hidden.push(y), Z && f.today.push(y), i && Object.keys(i).forEach((T) => {
      const b = i?.[T];
      b && He(O, b, o) && (C[T] ? C[T].push(y) : C[T] = [y]);
    });
  }
  return (y) => {
    const O = {
      [ue.focused]: !1,
      [ue.disabled]: !1,
      [ue.hidden]: !1,
      [ue.outside]: !1,
      [ue.today]: !1
    }, Y = {};
    for (const m in f) {
      const I = f[m];
      O[m] = I.some((N) => N === y);
    }
    for (const m in C)
      Y[m] = C[m].some((I) => I === y);
    return {
      ...O,
      // custom modifiers should override all the previous ones
      ...Y
    };
  };
}
function oi(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[ue[s]] ? o.push(t[ue[s]]) : t[Ye[s]] && o.push(t[Ye[s]]), o), [t[H.Day]]);
}
function si(e) {
  return {
    ...ni,
    ...e
  };
}
function ai(e) {
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
function ii() {
  const e = {};
  for (const t in H)
    e[H[t]] = `rdp-${H[t]}`;
  for (const t in ue)
    e[ue[t]] = `rdp-${ue[t]}`;
  for (const t in Ye)
    e[Ye[t]] = `rdp-${Ye[t]}`;
  for (const t in ke)
    e[ke[t]] = `rdp-${ke[t]}`;
  return e;
}
function Dr(e, t, n) {
  return (n ?? new Se(t)).formatMonthYear(e);
}
const ci = Dr;
function li(e, t, n) {
  return (n ?? new Se(t)).format(e, "d");
}
function di(e, t = Pe) {
  return t.format(e, "LLLL");
}
function ui(e, t, n) {
  return (n ?? new Se(t)).format(e, "cccccc");
}
function fi(e, t = Pe) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function hi() {
  return "";
}
function xr(e, t = Pe) {
  return t.format(e, "yyyy");
}
const mi = xr, gi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Dr,
  formatDay: li,
  formatMonthCaption: ci,
  formatMonthDropdown: di,
  formatWeekNumber: fi,
  formatWeekNumberHeader: hi,
  formatWeekdayName: ui,
  formatYearCaption: mi,
  formatYearDropdown: xr
}, Symbol.toStringTag, { value: "Module" }));
function yi(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...gi,
    ...e
  };
}
function pi(e, t, n, r, o) {
  const { startOfMonth: s, startOfYear: a, endOfYear: i, eachMonthOfInterval: c, getMonth: l } = o;
  return c({
    start: a(e),
    end: i(e)
  }).map((S) => {
    const F = r.formatMonthDropdown(S, o), D = l(S), _ = t && S < s(t) || n && S > s(n) || !1;
    return { value: D, label: F, disabled: _ };
  });
}
function bi(e, t = {}, n = {}) {
  let r = { ...t?.[H.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Di(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(o, a);
    s.push(i);
  }
  return s;
}
function xi(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: s, endOfYear: a, eachYearOfInterval: i, getYear: c } = r, l = s(e), g = a(t), d = i({ start: l, end: g });
  return o && d.reverse(), d.map((S) => {
    const F = n.formatYearDropdown(S, r);
    return {
      value: c(S),
      label: F,
      disabled: !1
    };
  });
}
function wr(e, t, n, r) {
  let o = (r ?? new Se(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const wi = wr;
function vr(e, t, n) {
  return (n ?? new Se(t)).formatMonthYear(e);
}
const vi = vr;
function Mi(e, t, n, r) {
  let o = (r ?? new Se(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function ki(e) {
  return "Choose the Month";
}
function Ni() {
  return "";
}
function Si(e) {
  return "Go to the Next Month";
}
function Ti(e) {
  return "Go to the Previous Month";
}
function Ci(e, t, n) {
  return (n ?? new Se(t)).format(e, "cccc");
}
function Oi(e, t) {
  return `Week ${e}`;
}
function Wi(e) {
  return "Week Number";
}
function Yi(e) {
  return "Choose the Year";
}
const _i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: vi,
  labelDay: wi,
  labelDayButton: wr,
  labelGrid: vr,
  labelGridcell: Mi,
  labelMonthDropdown: ki,
  labelNav: Ni,
  labelNext: Si,
  labelPrevious: Ti,
  labelWeekNumber: Oi,
  labelWeekNumberHeader: Wi,
  labelWeekday: Ci,
  labelYearDropdown: Yi
}, Symbol.toStringTag, { value: "Module" })), kt = (e) => e instanceof HTMLElement ? e : null, Zt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Fi = (e) => kt(e.querySelector("[data-animated-month]")), Qt = (e) => kt(e.querySelector("[data-animated-caption]")), Gt = (e) => kt(e.querySelector("[data-animated-weeks]")), Ei = (e) => kt(e.querySelector("[data-animated-nav]")), $i = (e) => kt(e.querySelector("[data-animated-weekdays]"));
function Ii(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
  const a = Le(null), i = Le(r), c = Le(!1);
  Tr(() => {
    const l = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || l.length === 0 || r.length !== l.length)
      return;
    const g = s.isSameMonth(r[0].date, l[0].date), d = s.isAfter(r[0].date, l[0].date), S = d ? n[ke.caption_after_enter] : n[ke.caption_before_enter], F = d ? n[ke.weeks_after_enter] : n[ke.weeks_before_enter], D = a.current, _ = e.current.cloneNode(!0);
    if (_ instanceof HTMLElement ? (Zt(_).forEach((f) => {
      if (!(f instanceof HTMLElement))
        return;
      const C = Fi(f);
      C && f.contains(C) && f.removeChild(C);
      const y = Qt(f);
      y && y.classList.remove(S);
      const O = Gt(f);
      O && O.classList.remove(F);
    }), a.current = _) : a.current = null, c.current || g || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const P = D instanceof HTMLElement ? Zt(D) : [], $ = Zt(e.current);
    if ($?.every((k) => k instanceof HTMLElement) && P && P.every((k) => k instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const k = Ei(e.current);
      k && (k.style.zIndex = "1"), $.forEach((f, C) => {
        const y = P[C];
        if (!y)
          return;
        f.style.position = "relative", f.style.overflow = "hidden";
        const O = Qt(f);
        O && O.classList.add(S);
        const Y = Gt(f);
        Y && Y.classList.add(F);
        const m = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), k && (k.style.zIndex = ""), O && O.classList.remove(S), Y && Y.classList.remove(F), f.style.position = "", f.style.overflow = "", f.contains(y) && f.removeChild(y);
        };
        y.style.pointerEvents = "none", y.style.position = "absolute", y.style.overflow = "hidden", y.setAttribute("aria-hidden", "true");
        const I = $i(y);
        I && (I.style.opacity = "0");
        const N = Qt(y);
        N && (N.classList.add(d ? n[ke.caption_before_exit] : n[ke.caption_after_exit]), N.addEventListener("animationend", m));
        const W = Gt(y);
        W && W.classList.add(d ? n[ke.weeks_before_exit] : n[ke.weeks_after_exit]), f.insertBefore(y, f.firstChild);
      });
    }
  });
}
function Pi(e, t, n, r) {
  const o = e[0], s = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: g, differenceInCalendarMonths: d, endOfBroadcastWeek: S, endOfISOWeek: F, endOfMonth: D, endOfWeek: _, isAfter: P, startOfBroadcastWeek: $, startOfISOWeek: k, startOfWeek: f } = r, C = c ? $(o, r) : a ? k(o) : f(o), y = c ? S(s) : a ? F(D(s)) : _(D(s)), O = g(y, C), Y = d(s, o) + 1, m = [];
  for (let W = 0; W <= O; W++) {
    const j = l(C, W);
    if (t && P(j, t))
      break;
    m.push(j);
  }
  const N = (c ? 35 : 42) * Y;
  if (i && m.length < N) {
    const W = N - m.length;
    for (let j = 0; j < W; j++) {
      const Z = l(m[m.length - 1], 1);
      m.push(Z);
    }
  }
  return m;
}
function Bi(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((s, a) => s.concat(a.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Ui(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, s = [];
  for (let a = 0; a < o; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    s.push(i);
  }
  return s;
}
function En(e, t, n, r) {
  const { month: o, defaultMonth: s, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || s || a;
  const { differenceInCalendarMonths: l, addMonths: g, startOfMonth: d } = r;
  if (n && l(n, c) < i - 1) {
    const S = -1 * (i - 1);
    c = g(n, S);
  }
  return t && l(c, t) < 0 && (c = t), d(c);
}
function Ai(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: a, endOfMonth: i, endOfWeek: c, getISOWeek: l, getWeek: g, startOfBroadcastWeek: d, startOfISOWeek: S, startOfWeek: F } = r, D = e.reduce((_, P) => {
    const $ = n.broadcastCalendar ? d(P, r) : n.ISOWeek ? S(P) : F(P), k = n.broadcastCalendar ? s(P) : n.ISOWeek ? a(i(P)) : c(i(P)), f = t.filter((Y) => Y >= $ && Y <= k), C = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && f.length < C) {
      const Y = t.filter((m) => {
        const I = C - f.length;
        return m > k && m <= o(k, I);
      });
      f.push(...Y);
    }
    const y = f.reduce((Y, m) => {
      const I = n.ISOWeek ? l(m) : g(m), N = Y.find((j) => j.weekNumber === I), W = new fr(m, P, r);
      return N ? N.days.push(W) : Y.push(new Oa(I, [W])), Y;
    }, []), O = new Ca(P, y);
    return _.push(O), _;
  }, []);
  return n.reverseMonths ? D.reverse() : D;
}
function Hi(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: s, startOfMonth: a, endOfMonth: i, addYears: c, endOfYear: l, newDate: g, today: d } = t, { fromYear: S, toYear: F, fromMonth: D, toMonth: _ } = e;
  !n && D && (n = D), !n && S && (n = t.newDate(S, 0, 1)), !r && _ && (r = _), !r && F && (r = g(F, 11, 31));
  const P = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : S ? n = g(S, 0, 1) : !n && P && (n = o(c(e.today ?? d(), -100))), r ? r = i(r) : F ? r = g(F, 11, 31) : !r && P && (r = l(e.today ?? d())), [
    n && s(n),
    r && s(r)
  ];
}
function ji(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? s : 1, g = a(e);
  if (!t)
    return i(g, l);
  if (!(c(t, e) < s))
    return i(g, l);
}
function Li(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: c } = r, l = o ? s ?? 1 : 1, g = a(e);
  if (!t)
    return i(g, -l);
  if (!(c(g, t) <= 0))
    return i(g, -l);
}
function Ri(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Wt(e, t) {
  const [n, r] = V(e);
  return [t === void 0 ? n : t, r];
}
function qi(e, t) {
  const [n, r] = Hi(e, t), { startOfMonth: o, endOfMonth: s } = t, a = En(e, n, r, t), [i, c] = Wt(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  Oe(() => {
    const O = En(e, n, r, t);
    c(O);
  }, [e.timeZone]);
  const l = Ui(i, r, e, t), g = Pi(l, e.endMonth ? s(e.endMonth) : void 0, e, t), d = Ai(l, g, e, t), S = Ri(d), F = Bi(d), D = Li(i, n, e, t), _ = ji(i, r, e, t), { disableNavigation: P, onMonthChange: $ } = e, k = (O) => S.some((Y) => Y.days.some((m) => m.isEqualTo(O))), f = (O) => {
    if (P)
      return;
    let Y = o(O);
    n && Y < o(n) && (Y = o(n)), r && Y > o(r) && (Y = o(r)), c(Y), $?.(Y);
  };
  return {
    months: d,
    weeks: S,
    days: F,
    navStart: n,
    navEnd: r,
    previousMonth: D,
    nextMonth: _,
    goToMonth: f,
    goToDay: (O) => {
      k(O) || f(O.date);
    }
  };
}
var Ee;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ee || (Ee = {}));
function $n(e) {
  return !e[ue.disabled] && !e[ue.hidden] && !e[ue.outside];
}
function zi(e, t, n, r) {
  let o, s = -1;
  for (const a of e) {
    const i = t(a);
    $n(i) && (i[ue.focused] && s < Ee.FocusedModifier ? (o = a, s = Ee.FocusedModifier) : r?.isEqualTo(a) && s < Ee.LastFocused ? (o = a, s = Ee.LastFocused) : n(a.date) && s < Ee.Selected ? (o = a, s = Ee.Selected) : i[ue.today] && s < Ee.Today && (o = a, s = Ee.Today));
  }
  return o || (o = e.find((a) => $n(t(a)))), o;
}
function Zi(e, t, n, r, o, s, a) {
  const { ISOWeek: i, broadcastCalendar: c } = s, { addDays: l, addMonths: g, addWeeks: d, addYears: S, endOfBroadcastWeek: F, endOfISOWeek: D, endOfWeek: _, max: P, min: $, startOfBroadcastWeek: k, startOfISOWeek: f, startOfWeek: C } = a;
  let O = {
    day: l,
    week: d,
    month: g,
    year: S,
    startOfWeek: (Y) => c ? k(Y, a) : i ? f(Y) : C(Y),
    endOfWeek: (Y) => c ? F(Y) : i ? D(Y) : _(Y)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? O = P([r, O]) : t === "after" && o && (O = $([o, O])), O;
}
function Mr(e, t, n, r, o, s, a, i = 0) {
  if (i > 365)
    return;
  const c = Zi(e, t, n.date, r, o, s, a), l = !!(s.disabled && He(c, s.disabled, a)), g = !!(s.hidden && He(c, s.hidden, a)), d = c, S = new fr(c, d, a);
  return !l && !g ? S : Mr(e, t, S, r, o, s, a, i + 1);
}
function Qi(e, t, n, r, o) {
  const { autoFocus: s } = e, [a, i] = V(), c = zi(t.days, n, r || (() => !1), a), [l, g] = V(s ? c : void 0);
  return {
    isFocusTarget: (_) => !!c?.isEqualTo(_),
    setFocused: g,
    focused: l,
    blur: () => {
      i(l), g(void 0);
    },
    moveFocus: (_, P) => {
      if (!l)
        return;
      const $ = Mr(_, P, l, t.navStart, t.navEnd, e, o);
      $ && (e.disableNavigation && !t.days.some((f) => f.isEqualTo($)) || (t.goToDay($), g($)));
    }
  };
}
function Gi(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Wt(n, o ? n : void 0), i = o ? n : s, { isSameDay: c } = t, l = (F) => i?.some((D) => c(D, F)) ?? !1, { min: g, max: d } = e;
  return {
    selected: i,
    select: (F, D, _) => {
      let P = [...i ?? []];
      if (l(F)) {
        if (i?.length === g || r && i?.length === 1)
          return;
        P = i?.filter(($) => !c($, F));
      } else
        i?.length === d ? P = [F] : P = [...P, F];
      return o || a(P), o?.(P, F, D, _), P;
    },
    isSelected: l
  };
}
function Ki(e, t, n = 0, r = 0, o = !1, s = Pe) {
  const { from: a, to: i } = t || {}, { isSameDay: c, isAfter: l, isBefore: g } = s;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    c(a, e) ? n === 0 ? d = { from: a, to: e } : o ? d = { from: a, to: void 0 } : d = void 0 : g(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (c(a, e) && c(i, e))
      o ? d = { from: a, to: i } : d = void 0;
    else if (c(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (g(e, a))
      d = { from: e, to: i };
    else if (l(e, a))
      d = { from: a, to: e };
    else if (l(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const S = s.differenceInCalendarDays(d.to, d.from);
    r > 0 && S > r ? d = { from: e, to: void 0 } : n > 1 && S < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Xi(e, t, n = Pe) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const s = n.differenceInCalendarDays(e.to, e.from), a = Math.min(s, 6);
  for (let i = 0; i <= a; i++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function In(e, t, n = Pe) {
  return Ae(e, t.from, !1, n) || Ae(e, t.to, !1, n) || Ae(t, e.from, !1, n) || Ae(t, e.to, !1, n);
}
function Ji(e, t, n = Pe) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ae(e, i, !1, n) : br(i, n) ? i.some((c) => Ae(e, c, !1, n)) : sn(i) ? i.from && i.to ? In(e, { from: i.from, to: i.to }, n) : !1 : pr(i) ? Xi(e, i.dayOfWeek, n) : mr(i) ? n.isAfter(i.before, i.after) ? In(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : He(e.from, i, n) || He(e.to, i, n) : gr(i) || yr(i) ? He(e.from, i, n) || He(e.to, i, n) : !1))
    return !0;
  const a = r.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let l = 0; l <= c; l++) {
      if (a.some((g) => g(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Vi(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: a } = e, [i, c] = Wt(o, a ? o : void 0), l = a ? o : i;
  return {
    selected: l,
    select: (S, F, D) => {
      const { min: _, max: P } = e, $ = S ? Ki(S, l, _, P, s, t) : void 0;
      return r && n && $?.from && $.to && Ji({ from: $.from, to: $.to }, n, t) && ($.from = S, $.to = void 0), a || c($), a?.($, S, F, D), $;
    },
    isSelected: (S) => l && Ae(l, S, !1, t)
  };
}
function ec(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [s, a] = Wt(n, o ? n : void 0), i = o ? n : s, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, S, F) => {
      let D = d;
      return !r && i && i && c(d, i) && (D = void 0), o || a(D), o?.(D, d, S, F), D;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function tc(e, t) {
  const n = ec(e, t), r = Gi(e, t), o = Vi(e, t);
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
function rt(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new xe(t.today, t.timeZone)), t.month && (t.month = new xe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new xe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new xe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new xe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new xe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((Q) => new xe(Q, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new xe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new xe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: s, locale: a, classNames: i } = We(() => {
    const Q = { ...on, ...t.locale };
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
      components: si(t.components),
      formatters: yi(t.formatters),
      labels: { ..._i, ...t.labels },
      locale: Q,
      classNames: { ...ii(), ...t.classNames }
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
  ]), { captionLayout: c, mode: l, navLayout: g, numberOfMonths: d = 1, onDayBlur: S, onDayClick: F, onDayFocus: D, onDayKeyDown: _, onDayMouseEnter: P, onDayMouseLeave: $, onNextClick: k, onPrevClick: f, showWeekNumber: C, styles: y } = t, { formatCaption: O, formatDay: Y, formatMonthDropdown: m, formatWeekNumber: I, formatWeekNumberHeader: N, formatWeekdayName: W, formatYearDropdown: j } = r, Z = qi(t, s), { days: T, months: b, navStart: v, navEnd: w, previousMonth: M, nextMonth: E, goToMonth: B } = Z, q = ri(T, t, v, w, s), { isSelected: G, select: J, selected: ee } = tc(t, s) ?? {}, { blur: oe, focused: fe, isFocusTarget: ne, moveFocus: re, setFocused: te } = Qi(t, Z, q, G ?? (() => !1), s), { labelDayButton: ce, labelGridcell: he, labelGrid: De, labelMonthDropdown: Te, labelNav: Je, labelPrevious: qe, labelNext: Be, labelWeekday: _e, labelWeekNumber: it, labelWeekNumberHeader: ct, labelYearDropdown: lt } = o, dt = We(() => Di(s, t.ISOWeek), [s, t.ISOWeek]), Ve = l !== void 0 || F !== void 0, ze = X(() => {
    M && (B(M), f?.(M));
  }, [M, B, f]), pe = X(() => {
    E && (B(E), k?.(E));
  }, [B, E, k]), ut = X((Q, ie) => (R) => {
    R.preventDefault(), R.stopPropagation(), te(Q), J?.(Q.date, ie, R), F?.(Q.date, ie, R);
  }, [J, F, te]), ft = X((Q, ie) => (R) => {
    te(Q), D?.(Q.date, ie, R);
  }, [D, te]), ht = X((Q, ie) => (R) => {
    oe(), S?.(Q.date, ie, R);
  }, [oe, S]), mt = X((Q, ie) => (R) => {
    const u = {
      ArrowLeft: [
        R.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        R.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [R.shiftKey ? "year" : "week", "after"],
      ArrowUp: [R.shiftKey ? "year" : "week", "before"],
      PageUp: [R.shiftKey ? "year" : "month", "before"],
      PageDown: [R.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (u[R.key]) {
      R.preventDefault(), R.stopPropagation();
      const [p, x] = u[R.key];
      re(p, x);
    }
    _?.(Q.date, ie, R);
  }, [re, _, t.dir]), et = X((Q, ie) => (R) => {
    P?.(Q.date, ie, R);
  }, [P]), Yt = X((Q, ie) => (R) => {
    $?.(Q.date, ie, R);
  }, [$]), _t = X((Q) => (ie) => {
    const R = Number(ie.target.value), u = s.setMonth(s.startOfMonth(Q), R);
    B(u);
  }, [s, B]), Ft = X((Q) => (ie) => {
    const R = Number(ie.target.value), u = s.setYear(s.startOfMonth(Q), R);
    B(u);
  }, [s, B]), { className: Et, style: Ce } = We(() => ({
    className: [i[H.Root], t.className].filter(Boolean).join(" "),
    style: { ...y?.[H.Root], ...t.style }
  }), [i, t.className, t.style, y]), $t = ai(t), Nt = Le(null);
  Ii(Nt, !!t.animate, {
    classNames: i,
    months: b,
    focused: fe,
    dateLib: s
  });
  const It = {
    dayPickerProps: t,
    selected: ee,
    select: J,
    isSelected: G,
    months: b,
    nextMonth: E,
    previousMonth: M,
    goToMonth: B,
    getModifiers: q,
    components: n,
    classNames: i,
    styles: y,
    labels: o,
    formatters: r
  };
  return U.createElement(
    hr.Provider,
    { value: It },
    U.createElement(
      n.Root,
      { rootRef: t.animate ? Nt : void 0, className: Et, style: Ce, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...$t },
      U.createElement(
        n.Months,
        { className: i[H.Months], style: y?.[H.Months] },
        !t.hideNavigation && !g && U.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[H.Nav], style: y?.[H.Nav], "aria-label": Je(), onPreviousClick: ze, onNextClick: pe, previousMonth: M, nextMonth: E }),
        b.map((Q, ie) => U.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[H.Month],
            style: y?.[H.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ie,
            displayIndex: ie,
            calendarMonth: Q
          },
          g === "around" && !t.hideNavigation && ie === 0 && U.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[H.PreviousMonthButton], tabIndex: M ? void 0 : -1, "aria-disabled": M ? void 0 : !0, "aria-label": qe(M), onClick: ze, "data-animated-button": t.animate ? "true" : void 0 },
            U.createElement(n.Chevron, { disabled: M ? void 0 : !0, className: i[H.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          U.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[H.MonthCaption], style: y?.[H.MonthCaption], calendarMonth: Q, displayIndex: ie }, c?.startsWith("dropdown") ? U.createElement(
            n.DropdownNav,
            { className: i[H.Dropdowns], style: y?.[H.Dropdowns] },
            (() => {
              const R = c === "dropdown" || c === "dropdown-months" ? U.createElement(n.MonthsDropdown, { key: "month", className: i[H.MonthsDropdown], "aria-label": Te(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: _t(Q.date), options: pi(Q.date, v, w, r, s), style: y?.[H.Dropdown], value: s.getMonth(Q.date) }) : U.createElement("span", { key: "month" }, m(Q.date, s)), u = c === "dropdown" || c === "dropdown-years" ? U.createElement(n.YearsDropdown, { key: "year", className: i[H.YearsDropdown], "aria-label": lt(s.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Ft(Q.date), options: xi(v, w, r, s, !!t.reverseYears), style: y?.[H.Dropdown], value: s.getYear(Q.date) }) : U.createElement("span", { key: "year" }, j(Q.date, s));
              return s.getMonthYearOrder() === "year-first" ? [u, R] : [R, u];
            })(),
            U.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, O(Q.date, s.options, s))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            U.createElement(n.CaptionLabel, { className: i[H.CaptionLabel], role: "status", "aria-live": "polite" }, O(Q.date, s.options, s))
          )),
          g === "around" && !t.hideNavigation && ie === d - 1 && U.createElement(
            n.NextMonthButton,
            { type: "button", className: i[H.NextMonthButton], tabIndex: E ? void 0 : -1, "aria-disabled": E ? void 0 : !0, "aria-label": Be(E), onClick: pe, "data-animated-button": t.animate ? "true" : void 0 },
            U.createElement(n.Chevron, { disabled: E ? void 0 : !0, className: i[H.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ie === d - 1 && g === "after" && !t.hideNavigation && U.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[H.Nav], style: y?.[H.Nav], "aria-label": Je(), onPreviousClick: ze, onNextClick: pe, previousMonth: M, nextMonth: E }),
          U.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": l === "multiple" || l === "range", "aria-label": De(Q.date, s.options, s) || void 0, className: i[H.MonthGrid], style: y?.[H.MonthGrid] },
            !t.hideWeekdays && U.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[H.Weekdays], style: y?.[H.Weekdays] },
              C && U.createElement(n.WeekNumberHeader, { "aria-label": ct(s.options), className: i[H.WeekNumberHeader], style: y?.[H.WeekNumberHeader], scope: "col" }, N()),
              dt.map((R) => U.createElement(n.Weekday, { "aria-label": _e(R, s.options, s), className: i[H.Weekday], key: String(R), style: y?.[H.Weekday], scope: "col" }, W(R, s.options, s)))
            ),
            U.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[H.Weeks], style: y?.[H.Weeks] }, Q.weeks.map((R) => U.createElement(
              n.Week,
              { className: i[H.Week], key: R.weekNumber, style: y?.[H.Week], week: R },
              C && // biome-ignore lint/a11y/useSemanticElements: react component
              U.createElement(n.WeekNumber, { week: R, style: y?.[H.WeekNumber], "aria-label": it(R.weekNumber, {
                locale: a
              }), className: i[H.WeekNumber], scope: "row", role: "rowheader" }, I(R.weekNumber, s)),
              R.days.map((u) => {
                const { date: p } = u, x = q(u);
                if (x[ue.focused] = !x.hidden && !!fe?.isEqualTo(u), x[Ye.selected] = G?.(p) || x.selected, sn(ee)) {
                  const { from: Me, to: Ze } = ee;
                  x[Ye.range_start] = !!(Me && Ze && s.isSameDay(p, Me)), x[Ye.range_end] = !!(Me && Ze && s.isSameDay(p, Ze)), x[Ye.range_middle] = Ae(ee, p, !0, s);
                }
                const z = bi(x, y, t.modifiersStyles), le = oi(x, i, t.modifiersClassNames), de = !Ve && !x.hidden ? he(p, x, s.options, s) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  U.createElement(n.Day, { key: `${s.format(p, "yyyy-MM-dd")}_${s.format(u.displayMonth, "yyyy-MM")}`, day: u, modifiers: x, className: le.join(" "), style: z, role: "gridcell", "aria-selected": x.selected || void 0, "aria-label": de, "data-day": s.format(p, "yyyy-MM-dd"), "data-month": u.outside ? s.format(p, "yyyy-MM") : void 0, "data-selected": x.selected || void 0, "data-disabled": x.disabled || void 0, "data-hidden": x.hidden || void 0, "data-outside": u.outside || void 0, "data-focused": x.focused || void 0, "data-today": x.today || void 0 }, !x.hidden && Ve ? U.createElement(n.DayButton, { className: i[H.DayButton], style: y?.[H.DayButton], type: "button", day: u, modifiers: x, disabled: x.disabled || void 0, tabIndex: ne(u) ? 0 : -1, "aria-label": ce(p, x, s.options, s), onClick: ut(u, x), onBlur: ht(u, x), onFocus: ft(u, x), onKeyDown: mt(u, x), onMouseEnter: et(u, x), onMouseLeave: Yt(u, x) }, Y(p, s.options, s)) : !x.hidden && Y(u.date, s.options, s))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      U.createElement(n.Footer, { className: i[H.Footer], style: y?.[H.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Pn = (e) => {
  const t = e?.from ? Ne(e.from) : void 0, n = e?.to ? at(e.to) : void 0;
  return t && n && n.getTime() < t.getTime() ? { from: t, to: at(t) } : { from: t, to: n };
}, nc = [
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
function rc({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: o = !1
}) {
  const s = L(Ot()), a = Pn(e), i = a.from ? ge(a.from) : ge(s), [c, l] = V(a), [g, d] = V(i), S = () => {
    if (!e.from || !e.to) return !1;
    const f = e.from.getTime() === e.to.getTime(), C = e.from.getTime() === s.getTime() && e.to.getTime() === s.getTime();
    return f && C;
  };
  Oe(() => {
    const f = Pn(e);
    l((C) => {
      const y = C.from?.getTime() ?? null, O = C.to?.getTime() ?? null, Y = f.from?.getTime() ?? null, m = f.to?.getTime() ?? null;
      if (y === Y && O === m)
        return C;
      if (f.from) {
        const W = ge(f.from);
        d((j) => j === W || j === W - 1 ? j : W);
      }
      return f;
    });
  }, [e]);
  const F = (f, C) => {
    if (o) return;
    const y = wt(Xe(/* @__PURE__ */ new Date(), f), C), O = Ne(y), Y = at(y), m = () => r?.("start"), I = () => r?.("end");
    if (S()) {
      l({ from: O, to: Y }), t({ from: O }), I();
      return;
    }
    if (n === "end") {
      if (!c.from) {
        l({ from: O, to: Y }), t({ from: O }), I();
        return;
      }
      const W = c.from, j = c.to ?? at(W);
      let Z = W, T = Y;
      O.getTime() < W.getTime() && (Z = O, T = j);
      const b = { from: Z, to: T };
      l(b), t(b), m();
      return;
    }
    l({ from: O, to: Y }), t({ from: O }), I();
  }, D = (f, C) => {
    if (!c.from || !c.to || S()) return !1;
    const y = Ge(c.from), O = ge(c.from), Y = Ge(c.to), m = ge(c.to), I = f * 12 + C, N = O * 12 + y, W = m * 12 + Y;
    return I >= N && I <= W;
  }, _ = (f, C) => {
    if (!c.from || S()) return !1;
    const y = Ge(c.from), O = ge(c.from);
    return f === O && C === y;
  }, P = (f, C) => {
    if (!c.to || S()) return !1;
    const y = Ge(c.to), O = ge(c.to);
    return f === O && C === y;
  }, $ = (f, C) => !1, k = (f, C, y, O) => /* @__PURE__ */ A("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center mb-4", style: { ...O }, children: [
      C && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && d(g - 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(An, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md ", children: f }),
      y && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && d(g + 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(Hn, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2", children: nc.map((Y, m) => {
      const I = D(f, m), N = _(f, m), W = P(f, m), j = N || W, Z = $();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !Z && !o && F(f, m),
          disabled: Z || o,
          className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors
                  ${Z || o ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : j ? "bg-[#003DB8] text-white" : I ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: Y
        },
        Y
      );
    }) })
  ] }, f);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ A("div", { className: "flex gap-8 justify-between px-6", children: [
    k(g, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    k(g + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
const oc = ["Q1", "Q2", "Q3", "Q4"];
function sc({
  selectedRange: e,
  onSelect: t,
  disabled: n = !1
}) {
  const r = ge(e.from), [o, s] = V(r), a = L(Ot()), i = () => {
    const D = e.from.getTime() === e.to.getTime(), _ = e.from.getTime() === a.getTime() && e.to.getTime() === a.getTime();
    return D && _;
  }, c = (D, _) => {
    if (n) return;
    const P = At(Xe(/* @__PURE__ */ new Date(), D), _ + 1), $ = mn(P), k = gn(P);
    if (i()) {
      t({ from: $, to: k });
      return;
    }
    const f = tt(e.from), C = ge(e.from), y = mn(
      At(Xe(/* @__PURE__ */ new Date(), C), f)
    ), O = tt(e.to), Y = ge(e.to), m = gn(
      At(Xe(/* @__PURE__ */ new Date(), Y), O)
    );
    if (y.getTime() === m.getTime()) {
      t({ from: $, to: k });
      return;
    }
    const N = _ + 1;
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      t({ from: $, to: m });
      return;
    }
    if (D > Y || D === Y && N > O) {
      t({ from: y, to: k });
      return;
    }
    t({ from: $, to: k });
  }, l = (D, _) => {
    if (!e.from || !e.to || i()) return !1;
    const P = tt(e.from) - 1, $ = ge(e.from), k = tt(e.to) - 1, f = ge(e.to), C = D * 4 + _, y = $ * 4 + P, O = f * 4 + k;
    return C >= y && C <= O;
  }, g = (D, _) => {
    if (!e.from || i()) return !1;
    const P = tt(e.from) - 1, $ = ge(e.from);
    return D === $ && _ === P;
  }, d = (D, _) => {
    if (!e.to || i()) return !1;
    const P = tt(e.to) - 1, $ = ge(e.to);
    return D === $ && _ === P;
  }, S = (D, _) => !1, F = (D, _, P, $) => /* @__PURE__ */ A("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ A(
      "div",
      {
        className: "flex items-center justify-center gap-2 mb-4",
        style: { ...$ },
        children: [
          _ && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !n && s(o - 1),
              disabled: n,
              className: `p-1 rounded-md transition-colors ${n ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(An, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md", children: D }),
          P && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !n && s(o + 1),
              disabled: n,
              className: `p-1 rounded-md transition-colors ${n ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(Hn, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3", children: oc.map((k, f) => {
      const C = l(D, f), y = g(D, f), O = d(D, f), Y = y || O, m = S();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !m && !n && c(D, f),
          disabled: m || n,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${m || n ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : Y ? "bg-[#003DB8] text-white" : C ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: k
        },
        k
      );
    }) })
  ] }, D);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ A("div", { className: "flex gap-8 justify-between px-6", children: [
    F(o, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    F(o + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
function ac({
  unit: e,
  excludeEnabled: t,
  selectedRange: n,
  displayedMonth: r,
  setDisplayedMonth: o,
  dayPickerModifiers: s,
  dayPickerDisabledMatcher: a,
  monthsViewIndex: i,
  setMonthsViewIndex: c,
  monthsViewYear: l,
  setMonthsViewYear: g,
  yearsViewIndex: d,
  setYearsViewIndex: S,
  yearsViewDecade: F,
  setYearsViewDecade: D,
  handleCalendarSelect: _,
  handleResetCalendarSelect: P,
  handleWeekCalendarSelect: $,
  monthQuarterRange: k,
  activeDateField: f,
  setActiveDateField: C,
  onMonthSelect: y,
  onYearSelect: O,
  todayDateObj: Y
}) {
  const m = Le(null), I = Le(null);
  Oe(() => {
    if (e !== "day") return;
    const T = (w, M) => {
      const E = w.querySelector(
        "span[data-month-name]"
      ), B = w.querySelector(
        "span[data-year-name]"
      );
      if (E) {
        const oe = w.textContent || "";
        w.style.gap = "6px", w.style.fontSize = "14px", w.style.fontWeight = "600";
        let fe = "";
        if (B)
          fe = B.textContent || "";
        else {
          const ne = oe.match(/\d{4}/);
          ne && (fe = ne[0]);
        }
        if (!B && fe) {
          const ne = document.createElement("span");
          ne.textContent = fe, ne.setAttribute("data-year-name", "true"), ne.style.cursor = "pointer", ne.style.fontSize = "14px", ne.style.fontWeight = "600", ne.onclick = (te) => {
            te.stopPropagation(), te.preventDefault();
            const ce = parseInt(fe, 10);
            if (!isNaN(ce)) {
              const he = Math.floor(ce / 10) * 10;
              D(he), S(M), c(null);
            }
          };
          const re = E.nextSibling;
          if (re && re.nodeType === Node.TEXT_NODE)
            re.parentNode?.insertBefore(ne, re.nextSibling);
          else {
            const te = document.createTextNode(" ");
            w.appendChild(te), w.appendChild(ne);
          }
        } else B && (B.onclick = (ne) => {
          ne.stopPropagation(), ne.preventDefault();
          const re = parseInt(fe, 10);
          if (!isNaN(re)) {
            const te = Math.floor(re / 10) * 10;
            D(te), S(M), c(null);
          }
        });
        E.onclick = (ne) => {
          ne.stopPropagation(), ne.preventDefault();
          const re = parseInt(
            (B?.textContent || "").trim() || oe,
            10
          );
          isNaN(re) || (g(re), c(M), S(null));
        };
        return;
      }
      const q = w.textContent || "", G = q.trim().split(/\s+/);
      let J = "", ee = "";
      if (G.length >= 2)
        J = G[0], ee = G[1];
      else if (G.length === 1) {
        const oe = q.match(/^([A-Za-z]+)(\d{4})$/);
        if (oe)
          J = oe[1], ee = oe[2];
        else
          return;
      } else
        return;
      if (J && ee) {
        const oe = w.firstChild;
        if (w.style.gap = "6px", oe && oe.nodeType === Node.TEXT_NODE && (oe.textContent || "").indexOf(J) !== -1) {
          const re = document.createElement("span");
          re.textContent = J, re.setAttribute("data-month-name", "true"), re.style.cursor = "pointer", re.style.fontSize = "14px", re.style.fontWeight = "600", re.onclick = (he) => {
            he.stopPropagation(), he.preventDefault();
            const De = parseInt(ee, 10);
            isNaN(De) || (g(De), c(M), S(null));
          };
          const te = document.createElement("span");
          te.textContent = ee, te.setAttribute("data-year-name", "true"), te.style.cursor = "pointer", te.style.fontSize = "14px", te.style.fontWeight = "600", te.onclick = (he) => {
            he.stopPropagation(), he.preventDefault();
            const De = parseInt(ee, 10);
            if (!isNaN(De)) {
              const Te = Math.floor(De / 10) * 10;
              D(Te), S(M), c(null);
            }
          }, w.innerHTML = "", w.appendChild(re);
          const ce = document.createTextNode(" ");
          w.appendChild(ce), w.appendChild(te);
        }
      }
    }, b = (w, M) => {
      if (!w) return;
      w.querySelectorAll(".rdp-caption_label").forEach((B, q) => {
        const G = B, J = M !== null ? M : q === 0 ? 0 : 1;
        i === J || d === J || T(G, J);
      });
    }, v = setTimeout(() => {
      i === null && d === null ? b(m.current, null) : (b(m.current, 0), b(I.current, 1));
    }, 150);
    return () => clearTimeout(v);
  }, [
    e,
    r,
    i,
    d,
    c,
    g,
    D,
    S
  ]);
  const N = (T) => {
    const b = T - 1, v = T + 10, w = ge(r), M = [];
    for (let E = b; E <= v; E++)
      M.push(E);
    return /* @__PURE__ */ A("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => D(F - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ h("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ A("div", { className: "text-lg font-semibold", children: [
          T,
          "-",
          T + 9
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => D(F + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ h("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: M.map((E) => {
        const B = !Jt, q = E < T || E > T + 9;
        return /* @__PURE__ */ h(
          "button",
          {
            onClick: () => O(E),
            disabled: B,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${q ? "opacity-50 bg-gray-50 text-gray-500" : w === E ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: E
          },
          E
        );
      }) })
    ] });
  }, W = (T) => /* @__PURE__ */ A("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => g(l - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ h("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-lg font-semibold", children: T }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => g(l + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ h("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: ba.map((b, v) => {
      const w = !Jt, M = ge(r) === T && Ge(r) === v;
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => y(T, v),
          disabled: w,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${M ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: b
        },
        b
      );
    }) })
  ] }), j = {
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
  }, Z = {
    chevron: "fill-[#1F1F1F] w-4 h-4"
  };
  return /* @__PURE__ */ A(
    "div",
    {
      className: `flex gap-4 justify-center mb-4 h-[264px] ${t ? "excluded-enabled" : "excluded-disabled"} ${e}-picker-calender`,
      children: [
        e === "day" && /* @__PURE__ */ h("div", { className: "flex gap-4", children: d !== null ? d === 0 ? /* @__PURE__ */ A(ot, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: N(F)
            }
          ),
          /* @__PURE__ */ h("div", { ref: I, children: /* @__PURE__ */ h(
            rt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: _,
              modifiers: s,
              month: Ne(Ue(r, 1)),
              onMonthChange: (T) => {
                const b = new Date(r), w = new Date(T).getMonth() - b.getMonth();
                w !== 1 && w !== -11 && o(Ne(Ue(T, -1)));
              },
              numberOfMonths: 1,
              disabled: a,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: Z,
              styles: j
            }
          ) })
        ] }) : /* @__PURE__ */ A(ot, { children: [
          /* @__PURE__ */ h("div", { ref: m, children: /* @__PURE__ */ h(
            rt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: _,
              modifiers: s,
              month: r,
              onMonthChange: o,
              numberOfMonths: 1,
              disabled: a,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: Z,
              styles: j
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: N(F)
            }
          )
        ] }) : i === null ? /* @__PURE__ */ h(
          "div",
          {
            ref: m,
            className: "w-full",
            style: { minWidth: 0 },
            children: /* @__PURE__ */ h(
              rt,
              {
                mode: "range",
                navLayout: "around",
                selected: n,
                onSelect: (T, b) => {
                  P(T, b);
                },
                modifiers: s,
                month: r,
                onMonthChange: o,
                numberOfMonths: 2,
                disabled: a,
                className: "text-xs",
                modifiersClassNames: {
                  selected: "rdp-day_selected",
                  disabled: "rdp-day_disabled text-black",
                  excludedWeekday: "rdp-day_excluded-weekday",
                  "excluded-saved-date": "rdp-day_excluded-saved-date"
                },
                classNames: Z,
                styles: {
                  ...j,
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
                    ...j.caption,
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
        ) : i === 0 ? /* @__PURE__ */ A(ot, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: W(l)
            }
          ),
          /* @__PURE__ */ h("div", { ref: I, children: /* @__PURE__ */ h(
            rt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: _,
              modifiers: s,
              month: Ne(Ue(r, 1)),
              onMonthChange: (T) => {
                const b = new Date(r), w = new Date(T).getMonth() - b.getMonth();
                w !== 1 && w !== -11 && o(Ne(Ue(T, -1)));
              },
              numberOfMonths: 1,
              disabled: a,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: Z,
              styles: j
            }
          ) })
        ] }) : /* @__PURE__ */ A(ot, { children: [
          /* @__PURE__ */ h("div", { ref: m, children: /* @__PURE__ */ h(
            rt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: _,
              modifiers: s,
              month: r,
              onMonthChange: o,
              numberOfMonths: 1,
              disabled: a,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date"
              },
              classNames: {
                chevron: "fill-black"
              },
              styles: j
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0",
              style: { minWidth: "280px", maxWidth: "280px" },
              children: W(l)
            }
          )
        ] }) }),
        e === "week" && /* @__PURE__ */ h(
          rt,
          {
            mode: "range",
            navLayout: "around",
            showWeekNumber: !0,
            locale: void 0,
            formatters: {
              formatWeekNumber: (T) => `W${String(T).padStart(2, "0")}`
            },
            selected: n,
            onSelect: (T, b) => {
              $(T, b);
            },
            modifiers: s,
            onWeekNumberClick: (T, b) => {
              b && b.length > 0 && $(
                {
                  from: b[0],
                  to: b[b.length - 1]
                },
                b[0]
              );
            },
            month: r,
            onMonthChange: o,
            numberOfMonths: 2,
            disabled: (T) => a(T),
            modifiersClassNames: {
              selected: "rdp-day_selected bg-[#003DB8]",
              disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
              excludedWeekday: "rdp-day_excluded-weekday",
              "excluded-saved-date": "rdp-day_excluded-saved-date"
            },
            className: "text-xs",
            classNames: Z,
            styles: {
              ...j,
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
                ...j.caption,
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
          rc,
          {
            selectedRange: k,
            onSelect: _,
            activeDateField: f,
            onActiveFieldChange: C,
            disabled: t
          }
        ),
        e === "quarter" && /* @__PURE__ */ h(
          sc,
          {
            selectedRange: k,
            onSelect: _,
            disabled: t
          }
        )
      ]
    }
  );
}
function ic({
  excludeEnabled: e,
  hasEmptyDates: t,
  hasFutureDates: n,
  onToday: r,
  onClear: o,
  onCancel: s,
  onApply: a
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
          onClick: s,
          disabled: e,
          className: `px-4 py-2 text-xs font-semibold rounded-md transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-[#003DB8] hover:bg-gray-100"}`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: a,
          disabled: !!(e || t || n),
          className: `px-4 py-2 text-xs font-semibold rounded-md transition-colors ${e || t || n ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#003DB8] text-white hover:bg-[#003DB8]"}`,
          children: "Apply"
        }
      )
    ] })
  ] });
}
function cc({
  initialSelection: e,
  onApply: t
}) {
  const n = Ot(), r = (e?.excludeFilterTypes || []).filter(
    (u) => u === "days" || u === "saved-dates"
  ), [o, s] = V(
    e?.unit || "day"
  ), [a, i] = V(
    e?.startDateUtc || n
  ), [c, l] = V(
    e?.endDateUtc || n
  ), [g, d] = V(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [S, F] = V(e?.duration || 1), [D, _] = V(
    e?.excludedWeekdays || []
  ), [P, $] = V(
    e?.excludedSpecificDates || []
  ), [k, f] = V(!1), [C, y] = V(r), [O, Y] = V(null), [m, I] = V(
    e?.excludedSavedDates || []
  ), [N, W] = V(""), [j, Z] = V(e?.excludedDateRanges || []), [T, b] = V(() => e?.excludeEnabled ? !0 : !!(r.length > 0 || e?.excludedWeekdays && e.excludedWeekdays.length > 0 || e?.excludedSavedDates && e.excludedSavedDates.length > 0)), v = Le({
    excludeFilterTypes: r,
    excludedWeekdays: e?.excludedWeekdays || [],
    excludedSpecificDates: e?.excludedSpecificDates || [],
    excludedSavedDates: e?.excludedSavedDates || [],
    excludedDateRanges: e?.excludedDateRanges || []
  }), [w, M] = V([]), [E, B] = V(() => e?.startDateUtc ? Ne(L(e.startDateUtc)) : Ne(L(n))), [q, G] = V(null), [J, ee] = V(() => e?.startDateUtc ? ge(L(e.startDateUtc)) : ge(L(n))), [oe, fe] = V(null), [ne, re] = V(() => {
    if (e?.startDateUtc) {
      const p = ge(L(e.startDateUtc));
      return Math.floor(p / 10) * 10;
    }
    const u = ge(L(n));
    return Math.floor(u / 10) * 10;
  });
  Oe(() => {
    if (a && c) {
      const u = cr(
        a,
        c,
        o,
        D
      );
      F(u);
    } else
      F(1);
  }, [a, c, o, D]), Oe(() => {
    (async () => {
      await st.init();
      const p = await st.getData(
        "savedDateRanges"
      );
      p && M(p);
    })();
  }, []), Oe(() => {
    a && !c ? d("end") : !a && c && d("start");
  }, [a, c]), Oe(() => {
    q === null && ee(ge(E));
  }, [E, q]), Oe(() => {
    O !== "saved-dates" && W("");
  }, [O]);
  const te = X(
    (u) => {
      if (m.length === 0) return !1;
      const p = se(u);
      return m.some((x) => {
        const z = w.find((de) => de.id === x);
        return !z || !(p >= z.selection.startDateUtc && p <= z.selection.endDateUtc) ? !1 : (z.selection.excludedWeekdays && z.selection.excludedWeekdays.length > 0 && z.selection.excludedWeekdays.includes(u.getDay()) || z.selection.excludedSpecificDates && z.selection.excludedSpecificDates.length > 0 && z.selection.excludedSpecificDates.includes(p) || z.selection.excludedSavedDates && z.selection.excludedSavedDates.some(
          (Me) => {
            const Ze = w.find(
              (kr) => kr.id === Me
            );
            return Ze ? p >= Ze.selection.startDateUtc && p <= Ze.selection.endDateUtc : !1;
          }
        ) || z.selection.excludedDateRanges && z.selection.excludedDateRanges.some(
          (Me) => p >= Me.start && p <= Me.end
        ), !0);
      });
    },
    [m, w]
  ), ce = We(() => {
    const u = {};
    return D.length > 0 && (u.excludedWeekday = {
      dayOfWeek: D
    }), m.length > 0 && (u["excluded-saved-date"] = te), u;
  }, [m, D, te]), he = We(
    () => ({
      from: a ? L(a) : void 0,
      to: c ? L(c) : void 0
    }),
    [a, c]
  ), De = We(() => L(n), [n]), Te = We(
    () => ({
      from: a ? L(a) : De,
      to: c ? L(c) : De
    }),
    [c, a, De]
  ), Je = We(() => {
    const u = N.trim().toLowerCase();
    return u ? w.filter((p) => {
      const x = (/* @__PURE__ */ new Date(p.selection.startDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase(), z = (/* @__PURE__ */ new Date(p.selection.endDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase();
      return p.label.toLowerCase().includes(u) || `${x} - ${z}`.includes(u);
    }) : w;
  }, [w, N]), qe = We(
    () => !a || a.trim() === "" || !c || c.trim() === "",
    [c, a]
  ), Be = We(() => !1, [c, a, n]), _e = X(
    (u) => u.filter(
      (p) => p === "days" || p === "saved-dates"
    ),
    []
  ), it = X(
    (u) => {
      if (u) {
        f(!0), s("day");
        const p = v.current, x = _e(
          p.excludeFilterTypes
        );
        y([...x]), _([...p.excludedWeekdays]), $([...p.excludedSpecificDates]), I([...p.excludedSavedDates]), Z([...p.excludedDateRanges]);
        const z = x.find(
          (le) => le === "days" || le === "saved-dates"
        );
        Y(
          z ?? null
        );
      } else {
        const p = v.current, x = _e(
          p.excludeFilterTypes
        );
        y([...x]), _([...p.excludedWeekdays]), $([...p.excludedSpecificDates]), I([...p.excludedSavedDates]), Z([...p.excludedDateRanges]), b(
          x.length > 0 || p.excludedWeekdays.length > 0 || p.excludedSavedDates.length > 0
        ), f(!1), Y(null);
      }
    },
    [_e]
  ), ct = X(
    (u) => {
      k && (C.includes(u) || y([...C, u]), Y((p) => p === u ? null : u));
    },
    [k, C]
  ), lt = X(
    (u) => {
      if (!k) return;
      const p = C.filter((x) => x !== u);
      if (y(p), u === "days" && _([]), u === "saved-dates" && I([]), O === u) {
        const x = p.find(
          (z) => z === "days" || z === "saved-dates"
        );
        Y(
          x ?? null
        );
      }
    },
    [O, k, C]
  ), dt = X(() => {
    const u = v.current, p = _e(
      u.excludeFilterTypes
    );
    y([...p]), _([...u.excludedWeekdays]), $([...u.excludedSpecificDates]), I([...u.excludedSavedDates]), Z([...u.excludedDateRanges]), b(
      p.length > 0 || u.excludedWeekdays.length > 0 || u.excludedSavedDates.length > 0
    ), f(!1), Y(null);
  }, [_e]), Ve = X(() => {
    const u = D.length > 0, p = m.length > 0, x = [];
    u && x.push("days"), p && x.push("saved-dates");
    const z = u ? [...D] : [], le = [], de = p ? [...m] : [], Me = [];
    v.current = {
      excludeFilterTypes: x,
      excludedWeekdays: z,
      excludedSpecificDates: le,
      excludedSavedDates: de,
      excludedDateRanges: Me
    }, y(x), _(z), $(le), I(de), Z(Me), b(x.length > 0), f(!1), Y(null);
  }, [m, D]), ze = X(
    (u) => {
      _((p) => p.includes(u) ? p.filter((x) => x !== u) : [...p, u]), k && y((p) => p.includes("days") ? p : [...p, "days"]);
    },
    [k]
  ), pe = X((u) => {
    u && B(Ne(L(u)));
  }, []), ut = X(
    (u) => {
      k || (i(u), u ? c || d("end") : d("start"), u && c && L(u) > L(c) && l(u), pe(u));
    },
    [c, k, pe]
  ), ft = X(
    (u) => {
      k || (l(u), u ? a || d("start") : d("end"), u && a && L(u) < L(a) && i(u), pe(u));
    },
    [k, a, pe]
  ), ht = X(
    (u) => {
      if (!(k || u <= 0)) {
        if (F(u), a) {
          const p = ea(
            a,
            o,
            u,
            D
          );
          l(p), pe(p);
        } else if (c) {
          const p = ta(
            c,
            o,
            u,
            D
          );
          i(p), pe(p);
        }
        d("start");
      }
    },
    [
      c,
      k,
      D,
      a,
      o,
      pe
    ]
  ), mt = X(
    (u) => {
      k || s(u);
    },
    [k]
  ), et = X(
    (u, p) => {
      k || (i(u), l(p), d("start"), pe(u));
    },
    [k, pe]
  ), Yt = X(
    (u) => {
      if (k) return;
      i(u.startDateUtc), l(u.endDateUtc), s(u.unit);
      const p = u.excludedWeekdays || [];
      _(p), F(u.duration), d("start");
      const x = (u.excludeFilterTypes || []).filter(
        (Me) => Me === "days" || Me === "saved-dates"
      ), z = u.excludedSpecificDates || [], le = u.excludedSavedDates || [], de = u.excludedDateRanges || [];
      y(x), $(z), I(le), Z(de), v.current = {
        excludeFilterTypes: x,
        excludedWeekdays: p,
        excludedSpecificDates: z,
        excludedSavedDates: le,
        excludedDateRanges: de
      }, b(
        x.length > 0 || p.length > 0 || le.length > 0
      ), f(!1), Y(null), u.startDateUtc && pe(u.startDateUtc);
    },
    [k, pe]
  ), _t = X(() => {
    k || (i(n), l(n), _([]), d("start"), pe(n));
  }, [k, n, pe]), Ft = X(() => {
    k || (i(""), l(""), F(1), _([]), d("start"), f(!1), y([]), $([]), I([]), Z([]), Y(null), v.current = {
      excludeFilterTypes: [],
      excludedWeekdays: [],
      excludedSpecificDates: [],
      excludedSavedDates: [],
      excludedDateRanges: []
    }, b(!1), pe(n));
  }, [k, n, pe]), Et = X(() => {
    if (k || qe || Be) return;
    const u = lr(
      a,
      c,
      o,
      D,
      T,
      C,
      P,
      m,
      j
    );
    t(u);
  }, [
    c,
    T,
    k,
    C,
    j,
    m,
    P,
    D,
    qe,
    Be,
    t,
    a,
    o
  ]), Ce = X(
    (u) => {
      if (!k && u?.from) {
        const p = se(u.from);
        if (i(p), u?.to) {
          const x = se(u.to);
          l(x), d("start");
        } else
          l(p), d("end");
      }
    },
    [k]
  ), $t = X(
    (u, p) => {
      if (!k) {
        if (a && c && u?.to) {
          const x = se(p);
          g === "start" ? L(c).getTime() > L(x).getTime() ? i(x) : (i(x), l("")) : L(a).getTime() > L(x).getTime() ? (l(a), i(x)) : (l(x), i(a)), d(g === "start" ? "end" : "start");
          return;
        }
        if (!a && c && u?.from) {
          l(se(u?.from)), d("start");
          return;
        }
        if (!a && !c && u?.from) {
          i(se(u?.from)), l(""), d("end");
          return;
        }
        if (u?.from) {
          const x = se(u.from);
          if (i(x), u?.to) {
            const z = se(u.to);
            l(z), d("start");
          } else
            l(x), d("end");
        }
      }
    },
    [g, c, k, a]
  ), Nt = X(
    (u, p) => {
      if (!(k || !u) && u.from) {
        let x = be(u.from, {
          weekStartsOn: we
        }), z = me(x, 6);
        if (a && c)
          if (g === "start")
            if (L(se(p)).getTime() > L(c).getTime() && L(se(p)).getTime() > L(a).getTime())
              x = be(p, {
                weekStartsOn: we
              }), z = me(x, 6), Ce({ from: x, to: z });
            else if (L(se(p)).getTime() < L(c).getTime() && L(se(p)).getTime() < L(a).getTime()) {
              x = be(p, {
                weekStartsOn: we
              }), z = me(x, 6);
              const le = be(c, {
                weekStartsOn: we
              }), de = me(le, 6);
              Ce({ from: x, to: de });
            } else if (L(se(p)).getTime() > L(a).getTime() && L(se(p)).getTime() < L(c).getTime()) {
              x = be(p, {
                weekStartsOn: we
              }), z = me(x, 6);
              const le = be(c, {
                weekStartsOn: we
              }), de = me(le, 6);
              Ce({ from: x, to: de });
            } else
              x = be(p, {
                weekStartsOn: we
              }), z = me(p, 6), Ce({ from: x, to: z });
          else if (L(se(p)).getTime() > L(c).getTime()) {
            x = be(u.from, {
              weekStartsOn: we
            }), z = me(x, 6);
            const le = be(p, {
              weekStartsOn: we
            }), de = me(le, 6);
            Ce({ from: x, to: de });
          } else if (L(se(p)).getTime() < L(c).getTime() && L(se(p)).getTime() < L(a).getTime()) {
            x = be(p, {
              weekStartsOn: we
            }), z = me(x, 6);
            const le = be(a, {
              weekStartsOn: we
            }), de = me(le, 6);
            Ce({ from: x, to: de });
          } else {
            x = be(a, {
              weekStartsOn: we
            }), z = me(x, 6);
            const le = be(p, {
              weekStartsOn: we
            }), de = me(le, 6);
            Ce({ from: x, to: de });
          }
        if (u.to && (!a || !c)) {
          const le = be(u.to, {
            weekStartsOn: we
          }), de = me(le, 6);
          Ce({ from: x, to: de });
        }
        d(g === "start" ? "end" : "start");
      }
    },
    [
      g,
      c,
      k,
      Ce,
      a
    ]
  ), It = X(
    (u) => {
      if (k) return !0;
      se(u);
      const p = !Jt, x = k && C.includes("days") && D.includes(u.getDay()), z = k && C.includes("saved-dates") && te(u);
      return p || x || z;
    },
    [
      k,
      C,
      D,
      te,
      n
    ]
  ), Q = X(() => {
    if (!Be) return null;
    const u = a && a > n, p = c && c > n;
    return u && p ? "Start date and end date cannot be in the future." : u ? "Start date cannot be in the future." : p ? "End date cannot be in the future." : null;
  }, [c, Be, a, n]), ie = X((u, p) => {
    const x = Ne(
      wt(Xe(/* @__PURE__ */ new Date(), u), p)
    );
    B(x), G(null), ee(u);
  }, []), R = X(
    (u) => {
      const p = Ge(E), x = Ne(
        wt(Xe(/* @__PURE__ */ new Date(), u), p)
      );
      B(x), fe(null), re(Math.floor(u / 10) * 10);
    },
    [E]
  );
  return {
    today: n,
    unit: o,
    startDateUtc: a,
    endDateUtc: c,
    activeDateField: g,
    duration: S,
    excludedWeekdays: D,
    excludedSpecificDates: P,
    excludeEnabled: k,
    excludeFilterTypes: C,
    activeFilterView: O,
    excludedSavedDates: m,
    savedDatesSearchTerm: N,
    excludedDateRanges: j,
    savedDatesForFilter: w,
    displayedMonth: E,
    monthsViewIndex: q,
    monthsViewYear: J,
    yearsViewIndex: oe,
    yearsViewDecade: ne,
    excludeApplied: T,
    hasFutureDates: Be,
    hasEmptyDates: qe,
    dayPickerModifiers: ce,
    selectedRange: he,
    todayDateObj: De,
    monthQuarterRange: Te,
    filteredSavedDates: Je,
    dayPickerDisabledMatcher: It,
    getFutureDateWarning: Q,
    setActiveDateField: d,
    setSavedDatesSearchTerm: W,
    setMonthsViewIndex: G,
    setYearsViewIndex: fe,
    setYearsViewDecade: re,
    setMonthsViewYear: ee,
    setDisplayedMonth: B,
    handleStartDateChange: ut,
    handleEndDateChange: ft,
    handleDurationChange: ht,
    handleUnitChange: mt,
    handlePresetSelect: et,
    handleSavedDateSelect: Yt,
    handleToday: _t,
    handleClear: Ft,
    handleApply: Et,
    handleCalendarSelect: Ce,
    handleResetCalendarSelect: $t,
    handleWeekCalendarSelect: Nt,
    handleExcludeToggle: it,
    handleExcludeFilterButtonClick: ct,
    handleExcludeRemoveType: lt,
    handleExcludeCancel: dt,
    handleExcludeSave: Ve,
    toggleWeekday: ze,
    setExcludedSavedDates: I,
    setExcludeFilterTypes: y,
    setActiveFilterView: Y,
    excludeSavedStateRef: v,
    sanitizeExcludeFilterTypes: _e,
    handleMonthSelect: ie,
    handleYearSelect: R
  };
}
function bc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const {
    unit: o,
    startDateUtc: s,
    endDateUtc: a,
    activeDateField: i,
    duration: c,
    excludedWeekdays: l,
    excludedSpecificDates: g,
    excludeEnabled: d,
    excludeFilterTypes: S,
    activeFilterView: F,
    excludedSavedDates: D,
    savedDatesSearchTerm: _,
    excludedDateRanges: P,
    displayedMonth: $,
    monthsViewIndex: k,
    monthsViewYear: f,
    yearsViewIndex: C,
    yearsViewDecade: y,
    excludeApplied: O,
    hasFutureDates: Y,
    hasEmptyDates: m,
    dayPickerModifiers: I,
    selectedRange: N,
    todayDateObj: W,
    monthQuarterRange: j,
    savedDatesForFilter: Z,
    filteredSavedDates: T,
    dayPickerDisabledMatcher: b,
    getFutureDateWarning: v,
    setActiveDateField: w,
    setSavedDatesSearchTerm: M,
    setMonthsViewIndex: E,
    setYearsViewIndex: B,
    setYearsViewDecade: q,
    setMonthsViewYear: G,
    setDisplayedMonth: J,
    handleStartDateChange: ee,
    handleEndDateChange: oe,
    handleDurationChange: fe,
    handleUnitChange: ne,
    handlePresetSelect: re,
    handleSavedDateSelect: te,
    handleToday: ce,
    handleClear: he,
    handleApply: De,
    handleCalendarSelect: Te,
    handleResetCalendarSelect: Je,
    handleWeekCalendarSelect: qe,
    handleExcludeToggle: Be,
    handleExcludeFilterButtonClick: _e,
    handleExcludeRemoveType: it,
    handleExcludeCancel: ct,
    handleExcludeSave: lt,
    toggleWeekday: dt,
    setExcludedSavedDates: Ve,
    setExcludeFilterTypes: ze,
    setActiveFilterView: pe,
    handleMonthSelect: ut,
    handleYearSelect: ft
  } = cc({
    initialSelection: e,
    onApply: t
  }), ht = {
    height: "auto",
    minHeight: Da,
    width: zt,
    minWidth: zt,
    maxWidth: zt,
    overflow: "visible",
    ...r
  }, mt = lr(
    s,
    a,
    o,
    l,
    O,
    S,
    g,
    D,
    P
  ), et = v();
  return /* @__PURE__ */ A(
    "div",
    {
      className: "flex bg-white rounded-xl shadow-xl border border-gray-200",
      style: ht,
      children: [
        /* @__PURE__ */ h(
          ca,
          {
            onPresetSelect: re,
            onSavedDateSelect: te,
            currentSelection: mt,
            themeColors: r,
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
                  ya,
                  {
                    unit: o,
                    excludeEnabled: d,
                    onUnitChange: ne
                  }
                ),
                /* @__PURE__ */ h(
                  ma,
                  {
                    startDateUtc: s,
                    endDateUtc: a,
                    duration: c,
                    unit: o,
                    excludeEnabled: d,
                    activeDateField: i,
                    onStartDateChange: ee,
                    onEndDateChange: oe,
                    onDurationChange: fe,
                    onActiveFieldChange: w
                  }
                ),
                Y && et && /* @__PURE__ */ A("div", { className: "mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2", children: [
                  /* @__PURE__ */ h(Gr, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ h("p", { className: "text-sm text-amber-800", children: et })
                ] }),
                /* @__PURE__ */ h(
                  xa,
                  {
                    excludeEnabled: d,
                    excludeFilterTypes: S,
                    activeFilterView: F,
                    excludedWeekdays: l,
                    excludedSavedDates: D,
                    savedDatesSearchTerm: _,
                    filteredSavedDates: T,
                    savedDatesForFilter: Z,
                    onExcludeToggle: Be,
                    onFilterButtonClick: _e,
                    onRemoveFilterType: it,
                    onCancel: ct,
                    onSave: lt,
                    onToggleWeekday: dt,
                    setSavedDatesSearchTerm: M,
                    setExcludedSavedDates: Ve,
                    setExcludeFilterTypes: ze,
                    setActiveFilterView: pe
                  }
                ),
                /* @__PURE__ */ h(
                  ac,
                  {
                    unit: o,
                    excludeEnabled: d,
                    selectedRange: N,
                    displayedMonth: $,
                    setDisplayedMonth: J,
                    dayPickerModifiers: I,
                    dayPickerDisabledMatcher: b,
                    monthsViewIndex: k,
                    setMonthsViewIndex: E,
                    monthsViewYear: f,
                    setMonthsViewYear: G,
                    yearsViewIndex: C,
                    setYearsViewIndex: B,
                    yearsViewDecade: y,
                    setYearsViewDecade: q,
                    handleCalendarSelect: Te,
                    handleResetCalendarSelect: Je,
                    handleWeekCalendarSelect: qe,
                    monthQuarterRange: j,
                    activeDateField: i,
                    setActiveDateField: w,
                    onMonthSelect: ut,
                    onYearSelect: ft,
                    todayDateObj: W
                  }
                )
              ] }),
              /* @__PURE__ */ h(
                ic,
                {
                  excludeEnabled: d,
                  hasEmptyDates: m,
                  hasFutureDates: Y,
                  onToday: ce,
                  onClear: he,
                  onCancel: n,
                  onApply: De
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
  Jt as ALLOW_FUTURE_DATES,
  bc as AdvancedDateRangePicker,
  mc as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  gc as WEEK_NUMBERING_MODE,
  we as WEEK_STARTS_ON,
  cr as calcDurationFromRange,
  ea as calcEndFromDuration,
  ta as calcStartFromDuration,
  lr as createSelection,
  yc as formatDisplayDate,
  se as formatUtc,
  oa as getPresets,
  Ot as getTodayUtc,
  ra as getUnitAbbreviation,
  pc as parseDisplayDate,
  L as parseUtc
};
