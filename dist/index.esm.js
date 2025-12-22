import { jsxs as H, jsx as h, Fragment as gt } from "react/jsx-runtime";
import U, { forwardRef as Kn, createElement as sn, useState as ne, useEffect as Ne, useRef as _e, useMemo as $e, createContext as Hr, useContext as Ar, useCallback as ie, useLayoutEffect as jr } from "react";
import { LocalizationProvider as Rr } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField as bn } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs as Lr } from "@mui/x-date-pickers/AdapterDayjs";
const qr = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), zr = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), wn = (e) => {
  const t = zr(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Xn = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Zr = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Qr = {
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
const Gr = Kn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => sn(
    "svg",
    {
      ref: c,
      ...Qr,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Xn("lucide", o),
      ...!a && !Zr(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...s.map(([d, g]) => sn(d, g)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
const Qe = (e, t) => {
  const n = Kn(
    ({ className: r, ...o }, a) => sn(Gr, {
      ref: a,
      iconNode: t,
      className: Xn(
        `lucide-${qr(wn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = wn(e), n;
};
const Kr = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], zt = Qe("chevron-down", Kr);
const Xr = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Jn = Qe("chevron-left", Xr);
const Jr = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Vn = Qe("chevron-right", Jr);
const Vr = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], eo = Qe("circle-question-mark", Vr);
const to = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], no = Qe("plus", to);
const ro = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], oo = Qe("search", ro);
const ao = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], so = Qe("trash-2", ao);
const io = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], co = Qe("triangle-alert", io);
const lo = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], uo = Qe("x", lo), er = 6048e5, fo = 864e5, tr = 6e4, nr = 36e5, vn = Symbol.for("constructDateFrom");
function be(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && vn in e ? e[vn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ce(e, t) {
  return be(t || e, e);
}
function pe(e, t, n) {
  const r = ce(e, n?.in);
  return isNaN(t) ? be(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function qe(e, t, n) {
  const r = ce(e, n?.in);
  if (isNaN(t)) return be(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = be(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let ho = {};
function $t() {
  return ho;
}
function xe(e, t) {
  const n = $t(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ce(e, t?.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function Yt(e, t) {
  return xe(e, { ...t, weekStartsOn: 1 });
}
function rr(e, t) {
  const n = ce(e, t?.in), r = n.getFullYear(), o = be(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = Yt(o), s = be(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Yt(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function kn(e) {
  const t = ce(e), n = new Date(
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
function Xe(e, ...t) {
  const n = be.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Ft(e, t) {
  const n = ce(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function hn(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  ), a = Ft(r), s = Ft(o), i = +a - kn(a), c = +s - kn(s);
  return Math.round((i - c) / fo);
}
function mo(e, t) {
  const n = rr(e, t), r = be(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Yt(r);
}
function or(e, t, n) {
  return qe(e, t * 3, n);
}
function ar(e, t, n) {
  return pe(e, t * 7, n);
}
function go(e, t, n) {
  return qe(e, t * 12, n);
}
function po(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = ce(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function yo(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = ce(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function Zt(e, t) {
  const n = +ce(e) - +ce(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function xo(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  );
  return +Ft(r) == +Ft(o);
}
function sr(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Do(e) {
  return !(!sr(e) && typeof e != "number" || isNaN(+ce(e)));
}
function ir(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function ft(e, t) {
  const n = ce(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function mn(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  ), a = Mn(r, o), s = Math.abs(
    hn(r, o)
  );
  r.setDate(r.getDate() - a * s);
  const i = +(Mn(r, o) === -a), c = a * (s - i);
  return c === 0 ? 0 : c;
}
function Mn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function cr(e) {
  return (t) => {
    const r = (e ? Math[e] : Math.trunc)(t);
    return r === 0 ? 0 : r;
  };
}
function bo(e, t) {
  const n = ce(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function yt(e, t) {
  const n = ce(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function wo(e, t) {
  const n = ce(e, t?.in);
  return +bo(n, t) == +yt(n, t);
}
function gn(e, t, n) {
  const [r, o, a] = Xe(
    n?.in,
    e,
    e,
    t
  ), s = Zt(o, a), i = Math.abs(
    ir(o, a)
  );
  if (i < 1) return 0;
  o.getMonth() === 1 && o.getDate() > 27 && o.setDate(30), o.setMonth(o.getMonth() - s * i);
  let c = Zt(o, a) === -s;
  wo(r) && i === 1 && Zt(r, a) === 1 && (c = !1);
  const d = s * (i - +c);
  return d === 0 ? 0 : d;
}
function dr(e, t, n) {
  const r = gn(e, t, n) / 3;
  return cr(n?.roundingMethod)(r);
}
function vo(e, t, n) {
  const r = mn(e, t, n) / 7;
  return cr(n?.roundingMethod)(r);
}
function pn(e, t) {
  const [n, r] = Xe(e, t.start, t.end);
  return { start: n, end: r };
}
function lr(e, t) {
  const { start: n, end: r } = pn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(be(n, s)), s.setDate(s.getDate() + i), s.setHours(0, 0, 0, 0);
  return o ? c.reverse() : c;
}
function ko(e, t) {
  const { start: n, end: r } = pn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(be(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function cn(e, t) {
  const n = ce(e, t?.in), r = n.getMonth(), o = r - r % 3;
  return n.setMonth(o, 1), n.setHours(0, 0, 0, 0), n;
}
function Ce(e, t) {
  const n = ce(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Mo(e, t) {
  const n = ce(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function yn(e, t) {
  const n = ce(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function No(e, t) {
  const { start: n, end: r } = pn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(be(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function ur(e, t) {
  const n = $t(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ce(e, t?.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function So(e, t) {
  return ur(e, { ...t, weekStartsOn: 1 });
}
function Nn(e, t) {
  const n = ce(e, t?.in), r = n.getMonth(), o = r - r % 3 + 3;
  return n.setMonth(o, 0), n.setHours(23, 59, 59, 999), n;
}
const Co = {
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
}, To = (e, t, n) => {
  let r;
  const o = Co[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Qt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Oo = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Wo = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, _o = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Yo = {
  date: Qt({
    formats: Oo,
    defaultWidth: "full"
  }),
  time: Qt({
    formats: Wo,
    defaultWidth: "full"
  }),
  dateTime: Qt({
    formats: _o,
    defaultWidth: "full"
  })
}, Fo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Eo = (e, t, n, r) => Fo[e];
function Tt(e) {
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
const $o = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Io = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Bo = {
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
}, Uo = {
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
}, Po = {
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
}, Ho = {
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
}, Ao = (e, t) => {
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
}, jo = {
  ordinalNumber: Ao,
  era: Tt({
    values: $o,
    defaultWidth: "wide"
  }),
  quarter: Tt({
    values: Io,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Tt({
    values: Bo,
    defaultWidth: "wide"
  }),
  day: Tt({
    values: Uo,
    defaultWidth: "wide"
  }),
  dayPeriod: Tt({
    values: Po,
    defaultWidth: "wide",
    formattingValues: Ho,
    defaultFormattingWidth: "wide"
  })
};
function Ot(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? Lo(i, (l) => l.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Ro(i, (l) => l.test(s))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(c) : c, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const g = t.slice(s.length);
    return { value: d, rest: g };
  };
}
function Ro(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Lo(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function qo(e) {
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
const zo = /^(\d+)(th|st|nd|rd)?/i, Zo = /\d+/i, Qo = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Go = {
  any: [/^b/i, /^(a|c)/i]
}, Ko = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Xo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Jo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Vo = {
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
}, ea = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ta = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, na = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ra = {
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
}, oa = {
  ordinalNumber: qo({
    matchPattern: zo,
    parsePattern: Zo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ot({
    matchPatterns: Qo,
    defaultMatchWidth: "wide",
    parsePatterns: Go,
    defaultParseWidth: "any"
  }),
  quarter: Ot({
    matchPatterns: Ko,
    defaultMatchWidth: "wide",
    parsePatterns: Xo,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ot({
    matchPatterns: Jo,
    defaultMatchWidth: "wide",
    parsePatterns: Vo,
    defaultParseWidth: "any"
  }),
  day: Ot({
    matchPatterns: ea,
    defaultMatchWidth: "wide",
    parsePatterns: ta,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ot({
    matchPatterns: na,
    defaultMatchWidth: "any",
    parsePatterns: ra,
    defaultParseWidth: "any"
  })
}, xn = {
  code: "en-US",
  formatDistance: To,
  formatLong: Yo,
  formatRelative: Eo,
  localize: jo,
  match: oa,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function aa(e, t) {
  const n = ce(e, t?.in);
  return hn(n, yn(n)) + 1;
}
function fr(e, t) {
  const n = ce(e, t?.in), r = +Yt(n) - +mo(n);
  return Math.round(r / er) + 1;
}
function hr(e, t) {
  const n = ce(e, t?.in), r = n.getFullYear(), o = $t(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, s = be(t?.in || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = xe(s, t), c = be(t?.in || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const d = xe(c, t);
  return +n >= +i ? r + 1 : +n >= +d ? r : r - 1;
}
function sa(e, t) {
  const n = $t(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = hr(e, t), a = be(t?.in || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), xe(a, t);
}
function mr(e, t) {
  const n = ce(e, t?.in), r = +xe(n, t) - +sa(n, t);
  return Math.round(r / er) + 1;
}
function fe(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ke = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return fe(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : fe(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return fe(e.getDate(), t.length);
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
    return fe(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return fe(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return fe(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return fe(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return fe(o, t.length);
  }
}, ht = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Sn = {
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
    return Ke.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = hr(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return fe(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : fe(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = rr(e);
    return fe(n, t.length);
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
    return fe(n, t.length);
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
        return fe(r, 2);
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
        return fe(r, 2);
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
        return Ke.M(e, t);
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
        return fe(r + 1, 2);
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
    const o = mr(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : fe(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = fr(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : fe(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ke.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = aa(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : fe(r, t.length);
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
        return fe(a, 2);
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
        return fe(a, t.length);
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
        return fe(o, t.length);
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
    switch (r === 12 ? o = ht.noon : r === 0 ? o = ht.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = ht.evening : r >= 12 ? o = ht.afternoon : r >= 4 ? o = ht.morning : o = ht.night, t) {
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
    return Ke.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ke.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : fe(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : fe(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ke.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ke.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ke.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Tn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return rt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return rt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Tn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return rt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return rt(r, ":");
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
        return "GMT" + Cn(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + rt(r, ":");
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
        return "GMT" + Cn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + rt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return fe(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return fe(+e, t.length);
  }
};
function Cn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + fe(a, 2);
}
function Tn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + fe(Math.abs(e) / 60, 2) : rt(e, t);
}
function rt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = fe(Math.trunc(r / 60), 2), a = fe(r % 60, 2);
  return n + o + t + a;
}
const On = (e, t) => {
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
}, gr = (e, t) => {
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
}, ia = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return On(e, t);
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
  return a.replace("{{date}}", On(r, t)).replace("{{time}}", gr(o, t));
}, ca = {
  p: gr,
  P: ia
}, da = /^D+$/, la = /^Y+$/, ua = ["D", "DD", "YY", "YYYY"];
function fa(e) {
  return da.test(e);
}
function ha(e) {
  return la.test(e);
}
function ma(e, t, n) {
  const r = ga(e, t, n);
  if (console.warn(r), ua.includes(e)) throw new RangeError(r);
}
function ga(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const pa = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, ya = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, xa = /^'([^]*?)'?$/, Da = /''/g, ba = /[a-zA-Z]/;
function wa(e, t, n) {
  const r = $t(), o = n?.locale ?? r.locale ?? xn, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, s = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = ce(e, n?.in);
  if (!Do(i))
    throw new RangeError("Invalid time value");
  let c = t.match(ya).map((g) => {
    const l = g[0];
    if (l === "p" || l === "P") {
      const k = ca[l];
      return k(g, o.formatLong);
    }
    return g;
  }).join("").match(pa).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const l = g[0];
    if (l === "'")
      return { isToken: !1, value: va(g) };
    if (Sn[l])
      return { isToken: !0, value: g };
    if (l.match(ba))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + l + "`"
      );
    return { isToken: !1, value: g };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const d = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((g) => {
    if (!g.isToken) return g.value;
    const l = g.value;
    (!n?.useAdditionalWeekYearTokens && ha(l) || !n?.useAdditionalDayOfYearTokens && fa(l)) && ma(l, t, String(e));
    const k = Sn[l[0]];
    return k(i, l, o.localize, d);
  }).join("");
}
function va(e) {
  const t = e.match(xa);
  return t ? t[1].replace(Da, "'") : e;
}
function ka(e, t) {
  const n = ce(e, t?.in), r = n.getFullYear(), o = n.getMonth(), a = be(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function ot(e, t) {
  return ce(e, t?.in).getMonth();
}
function De(e, t) {
  return ce(e, t?.in).getFullYear();
}
function Ma(e, t) {
  return +ce(e) > +ce(t);
}
function Na(e, t) {
  return +ce(e) < +ce(t);
}
function Sa(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Ca(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Ta(e, t) {
  const n = () => be(t?.in, NaN), o = Ya(e);
  let a;
  if (o.date) {
    const d = Fa(o.date, 2);
    a = Ea(d.restDateString, d.year);
  }
  if (!a || isNaN(+a)) return n();
  const s = +a;
  let i = 0, c;
  if (o.time && (i = $a(o.time), isNaN(i)))
    return n();
  if (o.timezone) {
    if (c = Ia(o.timezone), isNaN(c)) return n();
  } else {
    const d = new Date(s + i), g = ce(0, t?.in);
    return g.setFullYear(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate()
    ), g.setHours(
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
      d.getUTCMilliseconds()
    ), g;
  }
  return ce(s + i + c, t?.in);
}
const Pt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Oa = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Wa = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, _a = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Ya(e) {
  const t = {}, n = e.split(Pt.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], Pt.timeZoneDelimiter.test(t.date) && (t.date = e.split(Pt.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const o = Pt.timezone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timezone = o[1]) : t.time = r;
  }
  return t;
}
function Fa(e, t) {
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
function Ea(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(Oa);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], o = Wt(n[1]), a = Wt(n[2]) - 1, s = Wt(n[3]), i = Wt(n[4]), c = Wt(n[5]) - 1;
  if (r)
    return Aa(t, i, c) ? Ba(t, i, c) : /* @__PURE__ */ new Date(NaN);
  {
    const d = /* @__PURE__ */ new Date(0);
    return !Pa(t, a, s) || !Ha(t, o) ? /* @__PURE__ */ new Date(NaN) : (d.setUTCFullYear(t, a, Math.max(o, s)), d);
  }
}
function Wt(e) {
  return e ? parseInt(e) : 1;
}
function $a(e) {
  const t = e.match(Wa);
  if (!t) return NaN;
  const n = Gt(t[1]), r = Gt(t[2]), o = Gt(t[3]);
  return ja(n, r, o) ? n * nr + r * tr + o * 1e3 : NaN;
}
function Gt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Ia(e) {
  if (e === "Z") return 0;
  const t = e.match(_a);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), o = t[3] && parseInt(t[3]) || 0;
  return Ra(r, o) ? n * (r * nr + o * tr) : NaN;
}
function Ba(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, a = (t - 1) * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const Ua = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function pr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Pa(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (Ua[t] || (pr(e) ? 29 : 28));
}
function Ha(e, t) {
  return t >= 1 && t <= (pr(e) ? 366 : 365);
}
function Aa(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function ja(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function Ra(e, t) {
  return t >= 0 && t <= 59;
}
function Et(e, t, n) {
  const r = ce(e, n?.in), o = r.getFullYear(), a = r.getDate(), s = be(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = ka(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Kt(e, t, n) {
  const r = ce(e, n?.in), o = Math.trunc(r.getMonth() / 3) + 1, a = t - o;
  return Et(r, r.getMonth() + a * 3);
}
function st(e, t, n) {
  const r = ce(e, n?.in);
  return isNaN(+r) ? be(e, NaN) : (r.setFullYear(t), r);
}
function La(e, t) {
  const n = Ga(t);
  return "formatToParts" in n ? za(n, e) : Za(n, e);
}
const qa = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function za(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let o = 0; o < n.length; o++) {
      const a = qa[n[o].type];
      a !== void 0 && (r[a] = parseInt(n[o].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function Za(e, t) {
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
const Xt = {}, Wn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Qa = Wn === "06/25/2014, 00:00:00" || Wn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function Ga(e) {
  return Xt[e] || (Xt[e] = Qa ? new Intl.DateTimeFormat("en-US", {
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
  })), Xt[e];
}
function yr(e, t, n, r, o, a, s) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, o, a, s), i;
}
const _n = 36e5, Ka = 6e4, Jt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function xr(e, t, n) {
  if (!e)
    return 0;
  let r = Jt.timezoneZ.exec(e);
  if (r)
    return 0;
  let o, a;
  if (r = Jt.timezoneHH.exec(e), r)
    return o = parseInt(r[1], 10), Yn(o) ? -(o * _n) : NaN;
  if (r = Jt.timezoneHHMM.exec(e), r) {
    o = parseInt(r[2], 10);
    const s = parseInt(r[3], 10);
    return Yn(o, s) ? (a = Math.abs(o) * _n + s * Ka, r[1] === "+" ? -a : a) : NaN;
  }
  if (Va(e)) {
    t = new Date(t || Date.now());
    const s = n ? t : Xa(t), i = dn(s, e);
    return -(n ? i : Ja(t, i, e));
  }
  return NaN;
}
function Xa(e) {
  return yr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function dn(e, t) {
  const n = La(e, t), r = yr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let o = e.getTime();
  const a = o % 1e3;
  return o -= a >= 0 ? a : 1e3 + a, r - o;
}
function Ja(e, t, n) {
  let o = e.getTime() - t;
  const a = dn(new Date(o), n);
  if (t === a)
    return t;
  o -= a - t;
  const s = dn(new Date(o), n);
  return a === s ? a : Math.max(a, s);
}
function Yn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Fn = {};
function Va(e) {
  if (Fn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Fn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function En(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const es = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Vt = 36e5, $n = 6e4, ts = 2, Te = {
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
  timeZone: es
};
function ns(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? ts : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = rs(e), { year: o, restDateString: a } = os(r.date, n), s = as(a, o);
  if (s === null || isNaN(s.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (s) {
    const i = s.getTime();
    let c = 0, d;
    if (r.time && (c = ss(r.time), c === null || isNaN(c)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (d = xr(r.timeZone || t.timeZone, new Date(i + c)), isNaN(d))
        return /* @__PURE__ */ new Date(NaN);
    } else
      d = En(new Date(i + c)), d = En(new Date(i + c + d));
    return new Date(i + c + d);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function rs(e) {
  const t = {};
  let n = Te.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = Te.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const o = Te.timeZone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timeZone = o[1].trim()) : t.time = r;
  }
  return t;
}
function os(e, t) {
  if (e) {
    const n = Te.YYY[t], r = Te.YYYYY[t];
    let o = Te.YYYY.exec(e) || r.exec(e);
    if (o) {
      const a = o[1];
      return {
        year: parseInt(a, 10),
        restDateString: e.slice(a.length)
      };
    }
    if (o = Te.YY.exec(e) || n.exec(e), o) {
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
function as(e, t) {
  if (t === null)
    return null;
  let n, r, o;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let a = Te.MM.exec(e);
  if (a)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1, Bn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (a = Te.DDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0);
    const s = parseInt(a[1], 10);
    return ds(t, s) ? (n.setUTCFullYear(t, 0, s), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Te.MMDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1;
    const s = parseInt(a[2], 10);
    return Bn(t, r, s) ? (n.setUTCFullYear(t, r, s), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Te.Www.exec(e), a)
    return o = parseInt(a[1], 10) - 1, Un(o) ? In(t, o) : /* @__PURE__ */ new Date(NaN);
  if (a = Te.WwwD.exec(e), a) {
    o = parseInt(a[1], 10) - 1;
    const s = parseInt(a[2], 10) - 1;
    return Un(o, s) ? In(t, o, s) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function ss(e) {
  let t, n, r = Te.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), en(t) ? t % 24 * Vt : NaN;
  if (r = Te.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), en(t, n) ? t % 24 * Vt + n * $n : NaN;
  if (r = Te.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const o = parseFloat(r[3].replace(",", "."));
    return en(t, n, o) ? t % 24 * Vt + n * $n + o * 1e3 : NaN;
  }
  return null;
}
function In(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, a = t * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const is = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], cs = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Dr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Bn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = Dr(e);
    if (r && n > cs[t] || !r && n > is[t])
      return !1;
  }
  return !0;
}
function ds(e, t) {
  if (t < 1)
    return !1;
  const n = Dr(e);
  return !(n && t > 366 || !n && t > 365);
}
function Un(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function en(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function ls(e, t, n) {
  e = ns(e, n);
  const r = xr(t, e, !0), o = new Date(e.getTime() - r), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), a.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), a;
}
const ke = 0, Nc = !1, ln = !0, Sc = "firstFullWeek", us = "UTC";
function q(e) {
  const t = Ta(`${e}T00:00:00.000Z`);
  return ls(t, us);
}
function de(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function jt() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function un(e, t, n) {
  const r = q(e);
  let o;
  switch (t) {
    case "day":
      o = pe(r, n);
      break;
    case "week":
      o = ar(r, n);
      break;
    case "month":
      o = qe(r, n);
      break;
    case "quarter":
      o = or(r, n);
      break;
    default:
      o = r;
  }
  return de(o);
}
function fs(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = q(e), a = 0;
    for (r.includes(o.getDay()) || (a = 1); a < n; )
      o = pe(o, 1), r.includes(o.getDay()) || a++;
    return de(o);
  } else {
    if (t === "week" || t === "month" || t === "quarter") {
      const o = un(e, t, n);
      return de(pe(q(o), -1));
    }
    return un(e, t, n - 1);
  }
}
function hs(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = q(e), a = 0;
    for (r.includes(o.getDay()) || (a = 1); a < n; )
      o = pe(o, -1), r.includes(o.getDay()) || a++;
    return de(o);
  } else {
    if (t === "week" || t === "month" || t === "quarter") {
      const s = un(e, t, -n);
      return de(pe(q(s), 1));
    }
    const o = q(e);
    let a;
    switch (t) {
      case "day":
        a = pe(o, -(n - 1));
        break;
      default:
        a = pe(o, -(n - 1));
    }
    return de(a);
  }
}
function br(e, t, n, r) {
  const o = q(e), a = q(t);
  if (o > a) return 0;
  if (n === "day" && r.length > 0)
    return lr({ start: o, end: a }).filter(
      (c) => !r.includes(c.getDay())
    ).length;
  switch (n) {
    case "day":
      return mn(a, o) + 1;
    case "week":
      return vo(a, o) + 1;
    case "month":
      return gn(a, o) + 1;
    case "quarter":
      return dr(a, o) + 1;
    default:
      return 1;
  }
}
function ms(e, t, n) {
  const r = q(e), o = q(t);
  if (r > o) return [];
  const a = lr({ start: r, end: o });
  return n.length === 0 ? a.map(de) : a.filter((s) => !n.includes(s.getDay())).map(de);
}
function wr(e, t, n = "day", r = [], o, a, s, i, c) {
  const d = br(
    e,
    t,
    n,
    r
  ), g = ms(
    e,
    t,
    r
  ), l = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: d,
    excludedWeekdays: r,
    includedDatesUtc: g
  };
  return o !== void 0 && (l.excludeEnabled = o), a && (l.excludeFilterTypes = a), s && (l.excludedSpecificDates = s), i && (l.excludedSavedDates = i), c && (l.excludedDateRanges = c), l;
}
function Cc(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function Tc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, o] = t, a = parseInt(r, 10), s = parseInt(n, 10), i = parseInt(o, 10);
  if (isNaN(a) || isNaN(s) || isNaN(i) || a < 1 || a > 12 || s < 1 || s > 31 || i < 1900 || i > 2100)
    return null;
  const c = a.toString().padStart(2, "0"), d = s.toString().padStart(2, "0");
  return `${i}-${c}-${d}`;
}
function gs(e) {
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
function Pn(e, t) {
  const n = /* @__PURE__ */ new Date(e + "T00:00:00"), r = /* @__PURE__ */ new Date(t + "T00:00:00"), o = n.getMonth(), a = r.getMonth(), s = n.getFullYear(), i = r.getFullYear(), c = n.getDate(), d = r.getDate();
  if (e === t)
    return n.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  if (o === a && s === i)
    return `${n.toLocaleDateString("en-US", { month: "short" })} ${c}-${d}, ${s}`;
  if (s === i) {
    const k = n.toLocaleDateString("en-US", {
      month: "short"
    }), W = r.toLocaleDateString("en-US", { month: "short" });
    return `${k} ${c} - ${W} ${d}, ${s}`;
  }
  const g = n.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }), l = r.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return `${g} - ${l}`;
}
function ps() {
  const e = jt(), t = q(e);
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
        const n = de(pe(t, -1));
        return {
          startDateUtc: n,
          endDateUtc: n
        };
      }
    },
    thisWeek: {
      label: "This Week",
      getValue: () => {
        let n = xe(t, {
          weekStartsOn: ke
        }), r = pe(n, 6);
        return {
          startDateUtc: de(n),
          endDateUtc: de(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = Ce(t);
        return {
          startDateUtc: de(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = yn(t);
        return {
          startDateUtc: de(n),
          endDateUtc: e
        };
      }
    }
  };
}
const ys = "DateRangePickerDB", xs = 1, Pe = "savedDateRanges";
class Ds {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(ys, xs);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (o) => {
          const a = o.target.result;
          a.objectStoreNames.contains(Pe) || a.createObjectStore(Pe, {
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
      const i = this.db.transaction([Pe], "readwrite").objectStore(Pe).put({
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
      const s = this.db.transaction([Pe], "readonly").objectStore(Pe).get(t);
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
      const s = this.db.transaction([Pe], "readwrite").objectStore(Pe).delete(t);
      s.onerror = () => r(s.error), s.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const a = this.db.transaction([Pe], "readwrite").objectStore(Pe).clear();
      a.onerror = () => n(a.error), a.onsuccess = () => t();
    });
  }
}
const pt = new Ds(), tn = "savedDateRanges";
function bs({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r = {},
  disabled: o = !1
}) {
  const [a, s] = ne([]), [i, c] = ne(!1), [d, g] = ne(""), [l, k] = ne(!1);
  Ne(() => {
    (async () => {
      await pt.init();
      const m = await pt.getData(
        tn
      );
      m && s(m);
    })();
  }, []);
  const W = ps(), E = (u) => {
    if (o) return;
    const { startDateUtc: m, endDateUtc: y } = u();
    e(m, y);
  }, P = async () => {
    if (o) return;
    if (d.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const u = {
      id: `saved-${Date.now()}`,
      label: d.trim(),
      selection: n,
      createdAt: Date.now()
    }, m = [...a, u];
    s(m), await pt.saveData(tn, m), g(""), c(!1);
  }, S = async (u) => {
    if (o) return;
    const m = a.filter((y) => y.id !== u);
    s(m), await pt.saveData(tn, m);
  }, $ = (u) => {
    o || (t ? t(u.selection) : e(u.selection.startDateUtc, u.selection.endDateUtc));
  }, B = (u, m) => {
    const y = (T) => (/* @__PURE__ */ new Date(T + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return u === m ? y(u) : `${y(u)} - ${y(m)}`;
  }, w = (u) => {
    if (n.startDateUtc !== u.startDateUtc || n.endDateUtc !== u.endDateUtc)
      return !1;
    const m = (_ = [], O = []) => {
      if (_.length !== O.length) return !1;
      const K = new Set(_);
      return O.every((ue) => K.has(ue));
    };
    if (!m(
      n.excludedWeekdays,
      u.excludedWeekdays
    ) || !m(
      n.excludedSpecificDates,
      u.excludedSpecificDates
    ) || !m(
      n.excludedSavedDates,
      u.excludedSavedDates
    ))
      return !1;
    const y = n.excludedDateRanges || [], T = u.excludedDateRanges || [];
    if (y.length !== T.length) return !1;
    const I = (_) => `${_.start}|${_.end}`, j = new Set(y.map(I));
    return T.every((_) => j.has(I(_)));
  };
  return /* @__PURE__ */ H(
    "div",
    {
      className: `w-44 flex-shrink-0 border-r border-gray-200 flex flex-col overflow-hidden ${o ? "opacity-60" : ""}`,
      children: [
        /* @__PURE__ */ h("div", { className: "mb-1 mt-4 px-3 flex-shrink-0", children: /* @__PURE__ */ h("div", { className: "flex flex-col", children: Object.values(W).map((u) => {
          const { startDateUtc: m, endDateUtc: y } = u.getValue(), T = n.startDateUtc === m && n.endDateUtc === y;
          return /* @__PURE__ */ H(
            "button",
            {
              onClick: () => E(u.getValue),
              disabled: o,
              "aria-disabled": o,
              className: `w-full text-left px-1 rounded-md transition-all mb-3 ${o ? "cursor-not-allowed text-gray-400" : ""}`,
              children: [
                /* @__PURE__ */ h(
                  "div",
                  {
                    className: `text-xs font-semibold ${o ? "text-gray-400" : T ? "text-[#0955ed]" : "text-[#1F1F1F]"}`,
                    children: u.label
                  }
                ),
                /* @__PURE__ */ h(
                  "div",
                  {
                    className: `text-[10px] leading-relaxed font-medium
 mt-0.5 ${o ? "text-gray-400" : T ? "text-[#0955ed]" : "text-[#61708F]"}`,
                    children: B(m, y)
                  }
                )
              ]
            },
            u.label
          );
        }) }) }),
        /* @__PURE__ */ H("div", { className: "flex justify-between flex-col flex-1 min-h-0 border-t border-gray-200 px-3 h-full", children: [
          /* @__PURE__ */ H("div", { className: "overflow-y-auto", children: [
            /* @__PURE__ */ H("div", { className: "flex items-center justify-between mb-3 flex-shrink-0 mt-3", children: [
              /* @__PURE__ */ h("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ h("h3", { className: "text-xs font-semibold text-[#757575]", children: "Saved Dates" }) }),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => {
                    o || k(!l);
                  },
                  disabled: o,
                  className: `text-gray-400 ${o ? "cursor-not-allowed opacity-50" : "hover:text-gray-600"}`,
                  children: /* @__PURE__ */ h(eo, { className: "w-3 h-3" })
                }
              )
            ] }),
            l && /* @__PURE__ */ h("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
            a.length === 0 ? /* @__PURE__ */ h("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ h("div", { className: "space-y-3 mb-3 overflow-y-auto flex-1 min-h-0", children: a.map((u) => {
              const m = w(u.selection);
              return /* @__PURE__ */ H(
                "div",
                {
                  className: "group rounded-md hover:shadow-sm transition-all",
                  children: [
                    /* @__PURE__ */ H("div", { className: "flex items-start justify-between px-1", children: [
                      /* @__PURE__ */ h(
                        "button",
                        {
                          onClick: () => $(u),
                          disabled: o,
                          className: `flex-1 text-left ${o ? "cursor-not-allowed opacity-60" : ""}`,
                          children: /* @__PURE__ */ h(
                            "div",
                            {
                              className: `text-xs font-semibold mb-1 ${o ? "text-gray-400" : m ? "text-[#0955ed]" : "text-gray-900"}`,
                              children: u.label
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ h(
                        "button",
                        {
                          onClick: () => S(u.id),
                          disabled: o,
                          className: `${o ? "opacity-40 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"} text-red-500 hover:text-red-700 transition-opacity ml-2`,
                          children: /* @__PURE__ */ h(so, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ h(
                      "div",
                      {
                        className: `text-[10px] leading-relaxed font-medium px-1 ${o ? "text-gray-400" : m ? "text-[#0955ed]" : "text-[#61708F]"}`,
                        children: B(
                          u.selection.startDateUtc,
                          u.selection.endDateUtc
                        )
                      }
                    )
                  ]
                },
                u.id
              );
            }) })
          ] }),
          /* @__PURE__ */ h("div", { children: /* @__PURE__ */ H(
            "button",
            {
              onClick: () => {
                o || c(!0);
              },
              disabled: o,
              className: `w-full flex-shrink-0 px-1 py-4 text-[#003DB8] opacity-50 hover:opacity-100 text-xs font-medium rounded-md transition-colors flex items-center justify-center mt-auto ${o ? "cursor-not-allowed" : ""}`,
              children: [
                /* @__PURE__ */ h(no, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          ) })
        ] }),
        i && /* @__PURE__ */ H(gt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "fixed inset-0 bg-black/30 z-50",
              onClick: () => c(!1)
            }
          ),
          /* @__PURE__ */ h("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ H("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
            /* @__PURE__ */ h("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
            /* @__PURE__ */ H("div", { className: "mb-2", children: [
              /* @__PURE__ */ h("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
              /* @__PURE__ */ h(
                "input",
                {
                  type: "text",
                  value: d,
                  onChange: (u) => g(u.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (u) => {
                    u.key === "Enter" && P();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ H("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
              /* @__PURE__ */ H("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Range:" }),
                " ",
                B(
                  n.startDateUtc,
                  n.endDateUtc
                )
              ] }),
              /* @__PURE__ */ H("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Duration:" }),
                " ",
                n.duration,
                " ",
                n.unit,
                "(s)"
              ] }),
              n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ H("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Days:" }),
                " ",
                n.excludedWeekdays.map(
                  (u) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][u]
                ).join(", ")
              ] }),
              n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ H("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Specific Dates:" }),
                " ",
                n.excludedSpecificDates.length,
                " date(s)"
              ] }),
              n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ H("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Saved Dates:" }),
                " ",
                n.excludedSavedDates.length,
                " saved date(s)"
              ] }),
              n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ H("div", { children: [
                /* @__PURE__ */ h("strong", { children: "Excluded Date Ranges:" }),
                " ",
                n.excludedDateRanges.length,
                " range(s)"
              ] })
            ] }),
            /* @__PURE__ */ H("div", { className: "flex justify-end gap-2", children: [
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
                  onClick: P,
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
function ws(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var At = { exports: {} }, vs = At.exports, Hn;
function ks() {
  return Hn || (Hn = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(vs, (function() {
      var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", s = "second", i = "minute", c = "hour", d = "day", g = "week", l = "month", k = "quarter", W = "year", E = "date", P = "Invalid Date", S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, $ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, B = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(v) {
        var p = ["th", "st", "nd", "rd"], N = v % 100;
        return "[" + v + (p[(N - 20) % 10] || p[N] || p[0]) + "]";
      } }, w = function(v, p, N) {
        var M = String(v);
        return !M || M.length >= p ? v : "" + Array(p + 1 - M.length).join(N) + v;
      }, u = { s: w, z: function(v) {
        var p = -v.utcOffset(), N = Math.abs(p), M = Math.floor(N / 60), b = N % 60;
        return (p <= 0 ? "+" : "-") + w(M, 2, "0") + ":" + w(b, 2, "0");
      }, m: function v(p, N) {
        if (p.date() < N.date()) return -v(N, p);
        var M = 12 * (N.year() - p.year()) + (N.month() - p.month()), b = p.clone().add(M, l), Y = N - b < 0, C = p.clone().add(M + (Y ? -1 : 1), l);
        return +(-(M + (N - b) / (Y ? b - C : C - b)) || 0);
      }, a: function(v) {
        return v < 0 ? Math.ceil(v) || 0 : Math.floor(v);
      }, p: function(v) {
        return { M: l, y: W, w: g, d, D: E, h: c, m: i, s, ms: a, Q: k }[v] || String(v || "").toLowerCase().replace(/s$/, "");
      }, u: function(v) {
        return v === void 0;
      } }, m = "en", y = {};
      y[m] = B;
      var T = "$isDayjsObject", I = function(v) {
        return v instanceof K || !(!v || !v[T]);
      }, j = function v(p, N, M) {
        var b;
        if (!p) return m;
        if (typeof p == "string") {
          var Y = p.toLowerCase();
          y[Y] && (b = Y), N && (y[Y] = N, b = Y);
          var C = p.split("-");
          if (!b && C.length > 1) return v(C[0]);
        } else {
          var z = p.name;
          y[z] = p, b = z;
        }
        return !M && b && (m = b), b || !M && m;
      }, _ = function(v, p) {
        if (I(v)) return v.clone();
        var N = typeof p == "object" ? p : {};
        return N.date = v, N.args = arguments, new K(N);
      }, O = u;
      O.l = j, O.i = I, O.w = function(v, p) {
        return _(v, { locale: p.$L, utc: p.$u, x: p.$x, $offset: p.$offset });
      };
      var K = (function() {
        function v(N) {
          this.$L = j(N.locale, null, !0), this.parse(N), this.$x = this.$x || N.x || {}, this[T] = !0;
        }
        var p = v.prototype;
        return p.parse = function(N) {
          this.$d = (function(M) {
            var b = M.date, Y = M.utc;
            if (b === null) return /* @__PURE__ */ new Date(NaN);
            if (O.u(b)) return /* @__PURE__ */ new Date();
            if (b instanceof Date) return new Date(b);
            if (typeof b == "string" && !/Z$/i.test(b)) {
              var C = b.match(S);
              if (C) {
                var z = C[2] - 1 || 0, Q = (C[7] || "0").substring(0, 3);
                return Y ? new Date(Date.UTC(C[1], z, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, Q)) : new Date(C[1], z, C[3] || 1, C[4] || 0, C[5] || 0, C[6] || 0, Q);
              }
            }
            return new Date(b);
          })(N), this.init();
        }, p.init = function() {
          var N = this.$d;
          this.$y = N.getFullYear(), this.$M = N.getMonth(), this.$D = N.getDate(), this.$W = N.getDay(), this.$H = N.getHours(), this.$m = N.getMinutes(), this.$s = N.getSeconds(), this.$ms = N.getMilliseconds();
        }, p.$utils = function() {
          return O;
        }, p.isValid = function() {
          return this.$d.toString() !== P;
        }, p.isSame = function(N, M) {
          var b = _(N);
          return this.startOf(M) <= b && b <= this.endOf(M);
        }, p.isAfter = function(N, M) {
          return _(N) < this.startOf(M);
        }, p.isBefore = function(N, M) {
          return this.endOf(M) < _(N);
        }, p.$g = function(N, M, b) {
          return O.u(N) ? this[M] : this.set(b, N);
        }, p.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, p.valueOf = function() {
          return this.$d.getTime();
        }, p.startOf = function(N, M) {
          var b = this, Y = !!O.u(M) || M, C = O.p(N), z = function(ee, Z) {
            var se = O.w(b.$u ? Date.UTC(b.$y, Z, ee) : new Date(b.$y, Z, ee), b);
            return Y ? se : se.endOf(d);
          }, Q = function(ee, Z) {
            return O.w(b.toDate()[ee].apply(b.toDate("s"), (Y ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), b);
          }, oe = this.$W, X = this.$M, D = this.$D, L = "set" + (this.$u ? "UTC" : "");
          switch (C) {
            case W:
              return Y ? z(1, 0) : z(31, 11);
            case l:
              return Y ? z(1, X) : z(0, X + 1);
            case g:
              var G = this.$locale().weekStart || 0, ae = (oe < G ? oe + 7 : oe) - G;
              return z(Y ? D - ae : D + (6 - ae), X);
            case d:
            case E:
              return Q(L + "Hours", 0);
            case c:
              return Q(L + "Minutes", 1);
            case i:
              return Q(L + "Seconds", 2);
            case s:
              return Q(L + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, p.endOf = function(N) {
          return this.startOf(N, !1);
        }, p.$set = function(N, M) {
          var b, Y = O.p(N), C = "set" + (this.$u ? "UTC" : ""), z = (b = {}, b[d] = C + "Date", b[E] = C + "Date", b[l] = C + "Month", b[W] = C + "FullYear", b[c] = C + "Hours", b[i] = C + "Minutes", b[s] = C + "Seconds", b[a] = C + "Milliseconds", b)[Y], Q = Y === d ? this.$D + (M - this.$W) : M;
          if (Y === l || Y === W) {
            var oe = this.clone().set(E, 1);
            oe.$d[z](Q), oe.init(), this.$d = oe.set(E, Math.min(this.$D, oe.daysInMonth())).$d;
          } else z && this.$d[z](Q);
          return this.init(), this;
        }, p.set = function(N, M) {
          return this.clone().$set(N, M);
        }, p.get = function(N) {
          return this[O.p(N)]();
        }, p.add = function(N, M) {
          var b, Y = this;
          N = Number(N);
          var C = O.p(M), z = function(X) {
            var D = _(Y);
            return O.w(D.date(D.date() + Math.round(X * N)), Y);
          };
          if (C === l) return this.set(l, this.$M + N);
          if (C === W) return this.set(W, this.$y + N);
          if (C === d) return z(1);
          if (C === g) return z(7);
          var Q = (b = {}, b[i] = r, b[c] = o, b[s] = n, b)[C] || 1, oe = this.$d.getTime() + N * Q;
          return O.w(oe, this);
        }, p.subtract = function(N, M) {
          return this.add(-1 * N, M);
        }, p.format = function(N) {
          var M = this, b = this.$locale();
          if (!this.isValid()) return b.invalidDate || P;
          var Y = N || "YYYY-MM-DDTHH:mm:ssZ", C = O.z(this), z = this.$H, Q = this.$m, oe = this.$M, X = b.weekdays, D = b.months, L = b.meridiem, G = function(Z, se, he, ve) {
            return Z && (Z[se] || Z(M, Y)) || he[se].slice(0, ve);
          }, ae = function(Z) {
            return O.s(z % 12 || 12, Z, "0");
          }, ee = L || function(Z, se, he) {
            var ve = Z < 12 ? "AM" : "PM";
            return he ? ve.toLowerCase() : ve;
          };
          return Y.replace($, (function(Z, se) {
            return se || (function(he) {
              switch (he) {
                case "YY":
                  return String(M.$y).slice(-2);
                case "YYYY":
                  return O.s(M.$y, 4, "0");
                case "M":
                  return oe + 1;
                case "MM":
                  return O.s(oe + 1, 2, "0");
                case "MMM":
                  return G(b.monthsShort, oe, D, 3);
                case "MMMM":
                  return G(D, oe);
                case "D":
                  return M.$D;
                case "DD":
                  return O.s(M.$D, 2, "0");
                case "d":
                  return String(M.$W);
                case "dd":
                  return G(b.weekdaysMin, M.$W, X, 2);
                case "ddd":
                  return G(b.weekdaysShort, M.$W, X, 3);
                case "dddd":
                  return X[M.$W];
                case "H":
                  return String(z);
                case "HH":
                  return O.s(z, 2, "0");
                case "h":
                  return ae(1);
                case "hh":
                  return ae(2);
                case "a":
                  return ee(z, Q, !0);
                case "A":
                  return ee(z, Q, !1);
                case "m":
                  return String(Q);
                case "mm":
                  return O.s(Q, 2, "0");
                case "s":
                  return String(M.$s);
                case "ss":
                  return O.s(M.$s, 2, "0");
                case "SSS":
                  return O.s(M.$ms, 3, "0");
                case "Z":
                  return C;
              }
              return null;
            })(Z) || C.replace(":", "");
          }));
        }, p.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, p.diff = function(N, M, b) {
          var Y, C = this, z = O.p(M), Q = _(N), oe = (Q.utcOffset() - this.utcOffset()) * r, X = this - Q, D = function() {
            return O.m(C, Q);
          };
          switch (z) {
            case W:
              Y = D() / 12;
              break;
            case l:
              Y = D();
              break;
            case k:
              Y = D() / 3;
              break;
            case g:
              Y = (X - oe) / 6048e5;
              break;
            case d:
              Y = (X - oe) / 864e5;
              break;
            case c:
              Y = X / o;
              break;
            case i:
              Y = X / r;
              break;
            case s:
              Y = X / n;
              break;
            default:
              Y = X;
          }
          return b ? Y : O.a(Y);
        }, p.daysInMonth = function() {
          return this.endOf(l).$D;
        }, p.$locale = function() {
          return y[this.$L];
        }, p.locale = function(N, M) {
          if (!N) return this.$L;
          var b = this.clone(), Y = j(N, M, !0);
          return Y && (b.$L = Y), b;
        }, p.clone = function() {
          return O.w(this.$d, this);
        }, p.toDate = function() {
          return new Date(this.valueOf());
        }, p.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, p.toISOString = function() {
          return this.$d.toISOString();
        }, p.toString = function() {
          return this.$d.toUTCString();
        }, v;
      })(), ue = K.prototype;
      return _.prototype = ue, [["$ms", a], ["$s", s], ["$m", i], ["$H", c], ["$W", d], ["$M", l], ["$y", W], ["$D", E]].forEach((function(v) {
        ue[v[1]] = function(p) {
          return this.$g(p, v[0], v[1]);
        };
      })), _.extend = function(v, p) {
        return v.$i || (v(p, K, _), v.$i = !0), _;
      }, _.locale = j, _.isDayjs = I, _.unix = function(v) {
        return _(1e3 * v);
      }, _.en = y[m], _.Ls = y, _.p = {}, _;
    }));
  })(At)), At.exports;
}
var Ms = ks();
const Ns = /* @__PURE__ */ ws(Ms), Ht = (e) => {
  if (!e)
    return null;
  const t = Ns(e);
  return t.isValid() ? t : null;
};
function Ss({
  startDateUtc: e,
  endDateUtc: t,
  duration: n,
  unit: r,
  selectedUnit: o,
  excludeEnabled: a,
  activeDateField: s,
  onStartDateChange: i,
  onEndDateChange: c,
  onDurationChange: d,
  onActiveFieldChange: g,
  endFieldError: l,
  setEndFieldError: k,
  startFieldError: W,
  setStartFieldError: E
}) {
  const P = _e(null), [S, $] = ne(0), [B, w] = ne(
    () => Ht(e)
  ), [u, m] = ne(
    () => Ht(t)
  ), y = o || r, I = y === "week" && r !== "week" || y === "month" && r !== "month" || y === "quarter" && r !== "quarter" ? "" : n;
  Ne(() => {
    if (P.current) {
      const p = document.createElement("canvas").getContext("2d");
      if (p) {
        p.font = "14px system-ui, -apple-system, sans-serif";
        const N = I.toString(), M = p.measureText(N).width;
        $(12 + M + 4);
      }
    }
  }, [I]);
  const j = (v, p) => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: a ? "#f3f4f6" : v ? "#ffffff" : "#f9fafb",
      "& fieldset": {
        borderColor: p ? void 0 : v ? "#3b82f6" : void 0
      },
      "&:hover fieldset": {
        borderColor: p ? void 0 : v ? "#2563eb" : void 0
      },
      "&.Mui-focused": {
        backgroundColor: a ? "#f3f4f6" : "#ffffff"
      },
      "&.Mui-focused fieldset": {
        borderColor: p ? void 0 : "#3b82f6",
        boxShadow: p ? void 0 : "0 0 0 2px rgba(59,130,246,0.2)"
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
      color: a ? "#9ca3af" : void 0
    },
    "& .MuiInputLabel-root": {
      color: a ? "#9ca3af" : void 0
    }
  });
  Ne(() => {
    const v = Ht(e);
    w(v), (!e || v && v.isValid()) && E(!1);
  }, [e]), Ne(() => {
    const v = Ht(t);
    m(v), (!t || v && v.isValid()) && k(!1);
  }, [t]);
  const _ = (v, p) => {
    w(v), p?.validationError == null && (v ? v.isValid() && i(v.format("YYYY-MM-DD")) : i(""));
  }, O = (v) => {
    E(v != null);
  }, K = (v, p) => {
    m(v), p?.validationError == null && (v ? v.isValid() && c(v.format("YYYY-MM-DD")) : c(""));
  }, ue = (v) => {
    k(v != null);
  };
  return /* @__PURE__ */ h(Rr, { dateAdapter: Lr, children: /* @__PURE__ */ H("div", { className: "flex gap-3 pb-2 px-4 border-b border-gray-200", children: [
    /* @__PURE__ */ H("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${a ? "text-gray-400" : "text-[#61708F]"}`,
          children: "Start Date"
        }
      ),
      /* @__PURE__ */ h(
        bn,
        {
          value: B,
          onChange: _,
          onError: O,
          format: "DD/MM/YYYY",
          disabled: a,
          onFocus: () => g("start"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              error: W,
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
                ...j(
                  s === "start",
                  W
                ),
                width: "172px"
                // Do NOT specify height here, but ensure InputProps.sx sets the height
                // Optionally, you can add padding to control inner height if needed
              },
              disabled: a
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ H("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium mb-1 ${a ? "text-gray-400" : "text-[#61708F]"}`,
          children: "End Date"
        }
      ),
      /* @__PURE__ */ h(
        bn,
        {
          value: u,
          onChange: K,
          onError: ue,
          format: "DD/MM/YYYY",
          disabled: a,
          onFocus: () => g("end"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              error: l,
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
                ...j(
                  s === "end",
                  l
                ),
                width: "172px"
                // Do NOT specify height here, but ensure InputProps.sx sets the height
                // Optionally, you can add padding to control inner height if needed
              },
              disabled: a
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ H("div", { children: [
      /* @__PURE__ */ h(
        "label",
        {
          className: `block text-xs font-medium ${a ? "text-gray-400" : "text-[#61708F]"} mb-1`,
          children: "Duration"
        }
      ),
      /* @__PURE__ */ H("div", { className: "relative", children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: P,
            type: "number",
            min: "1",
            value: I,
            onChange: (v) => d(Number(v.target.value)),
            disabled: a,
            className: `w-[120px] h-[28px] pl-3 pr-10 py-2 text-gray-500 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${a ? "bg-gray-100" : "bg-[#f9fafb]"}`
          }
        ),
        /* @__PURE__ */ h(
          "span",
          {
            className: `absolute top-1/2 -translate-y-1/2 text-[12px] pointer-events-none ${a ? "text-gray-300" : "text-gray-500"}`,
            style: { left: `${S}px` },
            children: gs(y)
          }
        )
      ] })
    ] })
  ] }) });
}
const Cs = ["day", "week", "month", "quarter"];
function Ts({
  unit: e,
  excludeEnabled: t,
  onUnitChange: n
}) {
  return /* @__PURE__ */ h("div", { className: "flex gap-2 mb-2 justify-end border-b border-gray-200 pb-2 pr-4", children: Cs.map((r) => /* @__PURE__ */ h(
    "button",
    {
      onClick: () => n(r),
      disabled: t,
      className: `px-4 py-2 w-20 rounded-[4px] text-xs font-medium transition-colors ${t ? e === r ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8] opacity-60 cursor-not-allowed" : "bg-[#EBF0F9] text-gray-400 opacity-60 cursor-not-allowed border border-transparent" : e === r ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
      children: r.charAt(0).toUpperCase() + r.slice(1)
    },
    r
  )) });
}
const An = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], jn = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
], Os = [
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
], Ws = "var(--adrp-container-height, min(468px, 85vh))", nn = "var(--adrp-container-width, min(756px, 98vw))";
function _s({
  excludeEnabled: e,
  excludeFilterTypes: t,
  activeFilterView: n,
  excludedWeekdays: r,
  excludedSavedDates: o,
  excludedSpecificDates: a,
  excludedDateRanges: s,
  savedDatesSearchTerm: i,
  filteredSavedDates: c,
  onExcludeToggle: d,
  onFilterButtonClick: g,
  onRemoveFilterType: l,
  onCancel: k,
  onSave: W,
  onToggleWeekday: E,
  setSavedDatesSearchTerm: P,
  setExcludedSavedDates: S,
  setExcludedSpecificDates: $,
  setExcludedDateRanges: B,
  setExcludeFilterTypes: w,
  setActiveFilterView: u,
  savedDatesForFilter: m
}) {
  const [y, T] = ne(!1), [I, j] = ne(!1), [_, O] = ne(!1), K = _e(null), ue = _e(null), v = _e(null), p = _e(null);
  Ne(() => {
    function D(L) {
      if (!n) return;
      const G = L.target;
      p.current && !p.current.contains(G) && u(null);
    }
    return n && document.addEventListener("mousedown", D), () => {
      document.removeEventListener("mousedown", D);
    };
  }, [n, u]), Ne(() => {
    function D(L) {
      const G = L.target, ae = K.current && K.current.contains(G), ee = ue.current && ue.current.contains(G);
      !ae && !ee && T(!1);
    }
    return y && document.addEventListener("mousedown", D), () => {
      document.removeEventListener("mousedown", D);
    };
  }, [y]);
  const N = $e(() => {
    const D = /* @__PURE__ */ new Map();
    for (const L of m)
      D.set(L.id, L);
    return D;
  }, [m]), M = An.filter(
    (D) => r.includes(D.value)
  ), b = o.map((D) => N.get(D)).filter((D) => !!D), Y = (D) => {
    const L = /* @__PURE__ */ new Date(D.selection.startDateUtc + "T00:00:00"), G = /* @__PURE__ */ new Date(D.selection.endDateUtc + "T00:00:00"), ae = {
      month: "short",
      day: "numeric",
      year: "numeric"
    }, ee = L.toLocaleDateString("en-US", ae), Z = G.toLocaleDateString("en-US", ae);
    return ee === Z ? ee : `${ee} - ${Z}`;
  }, C = (D) => {
    const L = Y(D), G = D.label?.trim();
    return G && G.toLowerCase() !== L.toLowerCase() ? G : L;
  }, z = (D) => {
    S((L) => {
      if (!L.includes(D))
        return L;
      const G = L.filter((ae) => ae !== D);
      return G.length === 0 && w(
        (ae) => ae.filter((ee) => ee !== "saved-dates")
      ), G;
    });
  }, Q = (D) => {
    B((L) => {
      const G = L.filter((ae) => ae.id !== D);
      return G.length === 0 && w(
        (ae) => ae.filter((ee) => ee !== "date-range")
      ), G;
    });
  }, oe = (D) => {
    $((L) => L.filter((G) => G !== D));
  }, X = [
    ...M.map((D) => ({
      id: `day-${D.value}`,
      label: jn[D.value] ?? D.label,
      title: jn[D.value] ?? D.label,
      onRemove: () => E(D.value)
    })),
    ...b.map((D) => ({
      id: `saved-${D.id}`,
      label: C(D),
      title: Y(D),
      onRemove: () => z(D.id)
    })),
    ...s.map((D) => ({
      id: `range-${D.id}`,
      label: Pn(D.start, D.end),
      title: Pn(D.start, D.end),
      onRemove: () => Q(D.id)
    })),
    ...a.map((D) => ({
      id: `specific-${D}`,
      label: (/* @__PURE__ */ new Date(D + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      title: D,
      onRemove: () => oe(D)
    }))
  ];
  return Ne(() => {
    const D = () => {
      if (v.current && !e && !y) {
        const L = v.current, G = L.scrollWidth > L.clientWidth;
        O(G);
      } else
        O(!1);
    };
    return D(), window.addEventListener("resize", D), () => {
      window.removeEventListener("resize", D);
    };
  }, [e, y, X.length]), /* @__PURE__ */ H("div", { className: " border-b border-gray-200 ", children: [
    /* @__PURE__ */ H("div", { className: "py-2 flex items-center gap-3 px-4 h-[45px]", children: [
      /* @__PURE__ */ H("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: "exclude-checkbox",
            checked: e || X.length > 0,
            onChange: (D) => {
              const L = D.target.checked;
              d(L), !L && !e && X.length > 0 && (S([]), $([]), B([]), w([]), r.forEach((G) => E(G)));
            },
            className: `w-4 h-4 border-gray-300 rounded focus:ring-blue-500 ${!e && X.length > 0 ? "accent-[#61708F]" : "text-blue-600"}`
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
      !e && X.length > 0 && /* @__PURE__ */ h(
        "button",
        {
          ref: ue,
          type: "button",
          onClick: () => {
            d(!0), T(!1), j(!0);
          },
          className: "text-sm font-medium text-[#003DB8] ml-auto",
          children: "Edit"
        }
      ),
      e && /* @__PURE__ */ H(gt, { children: [
        /* @__PURE__ */ H(
          "div",
          {
            ref: p,
            className: "flex items-center gap-2 relative",
            children: [
              /* @__PURE__ */ H(
                "button",
                {
                  type: "button",
                  onClick: () => g("days"),
                  style: { width: "80px", height: "24px" },
                  className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "days" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
                  children: [
                    /* @__PURE__ */ h("span", { children: "weeks" }),
                    /* @__PURE__ */ h(zt, { className: "w-4 h-4 text-gray-400" })
                  ]
                }
              ),
              n === "days" && t.includes("days") && /* @__PURE__ */ h("div", { className: "absolute w-12 h-[264px] top-full left-7 mt-1 z-20", children: /* @__PURE__ */ h("div", { className: "flex flex-col gap-3 px-2 py-2 bg-white border border-[0.5px]  border-gray-200 rounded-lg", children: /* @__PURE__ */ h("div", { className: "flex justify-center", children: /* @__PURE__ */ h("div", { className: "inline-flex flex-col items-center gap-2 ", children: An.map((D) => {
                const L = r.includes(
                  D.value
                );
                return /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: () => E(D.value),
                    className: `w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${L ? "bg-[#CEDBF5] shadow-inner" : "text-gray-800 hover:bg-gray-100"}`,
                    children: D.label.charAt(0)
                  },
                  D.value
                );
              }) }) }) }) }),
              /* @__PURE__ */ H(
                "button",
                {
                  type: "button",
                  onClick: () => g("saved-dates"),
                  style: { width: "80px", height: "24px" },
                  className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "saved-dates" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
                  children: [
                    /* @__PURE__ */ h("span", { children: "Saved" }),
                    /* @__PURE__ */ h(zt, { className: "w-4 h-4 text-gray-400" })
                  ]
                }
              ),
              e && n === "saved-dates" && t.includes("saved-dates") && /* @__PURE__ */ h("div", { className: "absolute top-full left-0 mt-2 z-20 w-80 max-h-64", children: /* @__PURE__ */ H("div", { className: "flex flex-col gap-3 px-4 py-4 bg-white rounded-xl shadow-xl", children: [
                /* @__PURE__ */ H("div", { className: "relative h-7 w-72 flex items-center", children: [
                  /* @__PURE__ */ h(oo, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                  /* @__PURE__ */ h(
                    "input",
                    {
                      type: "text",
                      value: i,
                      onChange: (D) => P(D.target.value),
                      placeholder: "Search saved dates",
                      className: "w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }
                  )
                ] }),
                c.length === 0 ? /* @__PURE__ */ h("p", { className: "text-sm text-gray-500 text-center py-6", children: "No saved dates found" }) : /* @__PURE__ */ h("div", { className: "max-h-64 overflow-y-auto space-y-2", children: c.map((D) => {
                  const L = o.includes(
                    D.id
                  ), G = (/* @__PURE__ */ new Date(
                    D.selection.startDateUtc + "T00:00:00"
                  )).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  }), ae = (/* @__PURE__ */ new Date(
                    D.selection.endDateUtc + "T00:00:00"
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
                        S((ee) => {
                          if (ee.includes(D.id)) {
                            const Z = ee.filter(
                              (se) => se !== D.id
                            );
                            return Z.length === 0 && w(
                              (se) => se.filter(
                                (he) => he !== "saved-dates"
                              )
                            ), Z;
                          }
                          return w((Z) => Z.includes("saved-dates") ? Z : [...Z, "saved-dates"]), [...ee, D.id];
                        });
                      },
                      className: `w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${L ? "bg-[#CEDBF5] " : "bg-white  hover:bg-gray-50"}`,
                      children: /* @__PURE__ */ H("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ h("span", { className: "text-xs font-semibold text-gray-900", children: D.label }),
                        /* @__PURE__ */ H("span", { className: "text-[10px] font-medium text-gray-600", children: [
                          G,
                          " - ",
                          ae
                        ] })
                      ] })
                    },
                    D.id
                  );
                }) })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ H("div", { className: "flex items-center gap-2 ml-auto h-7", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => {
                k(), u(null);
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
                W(), u(null);
              },
              className: "px-4 h-7 flex items-center py-2 bg-[#003DB8] text-white text-xs font-semibold rounded-[4px] shadow-sm hover:bg-blue-700 transition-colors",
              children: "Save Exclusion"
            }
          )
        ] })
      ] })
    ] }),
    X.length > 0 && /* @__PURE__ */ H("div", { className: "w-full border-t border-gray-200 py-3 px-4 relative", children: [
      /* @__PURE__ */ H("div", { className: "flex items-center w-full gap-2", children: [
        /* @__PURE__ */ H("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ h(
            "div",
            {
              ref: v,
              className: `flex gap-2 ${e || y ? "flex-wrap" : "flex-nowrap overflow-hidden"}`,
              children: X.map((D) => /* @__PURE__ */ H(
                "span",
                {
                  className: "inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 flex-shrink-0",
                  title: D.title,
                  children: [
                    D.label,
                    e && /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        onClick: D.onRemove,
                        className: "text-gray-400 hover:text-gray-600 transition-colors",
                        "aria-label": `Remove ${D.label}`,
                        children: /* @__PURE__ */ h(uo, { className: "h-2.5 w-2.5" })
                      }
                    )
                  ]
                },
                D.id
              ))
            }
          ),
          !e && !y && _ && /* @__PURE__ */ h(
            "div",
            {
              className: "absolute right-0 top-0 bottom-0 w-16 pointer-events-none",
              style: {
                background: "linear-gradient(to right, transparent, white 70%)"
              }
            }
          )
        ] }),
        !e && !y && _ && /* @__PURE__ */ H(
          "button",
          {
            type: "button",
            onClick: () => T(!0),
            className: "text-sm text-[#5F6B7C] hover:text-gray-900 font-normal flex items-center gap-1 whitespace-nowrap flex-shrink-0",
            children: [
              "more ",
              /* @__PURE__ */ h(zt, { className: "w-4 h-4" })
            ]
          }
        )
      ] }),
      y && !e && // Only show expanded card if NOT enabled (read-only view)
      /* @__PURE__ */ h(
        "div",
        {
          ref: K,
          className: "absolute top-0 left-0 w-full min-h-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded-lg",
          children: /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-2", children: X.map((D) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700",
              title: D.title,
              children: D.label
            },
            D.id
          )) })
        }
      )
    ] })
  ] });
}
function Ys(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Fs = {}, _t = {};
function at(e, t) {
  try {
    const r = (Fs[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in _t ? _t[r] : Rn(r, r.split(":"));
  } catch {
    if (e in _t) return _t[e];
    const n = e?.match(Es);
    return n ? Rn(e, n.slice(1)) : NaN;
  }
}
const Es = /([+-]\d\d):?(\d\d)?/;
function Rn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return _t[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Ae extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(at(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), vr(this), fn(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Ae(...n, t) : new Ae(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Ae(+this, t);
  }
  getTimezoneOffset() {
    const t = -at(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), fn(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ae(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ln = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ln.test(e)) return;
  const t = e.replace(Ln, "$1UTC");
  Ae.prototype[t] && (e.startsWith("get") ? Ae.prototype[e] = function() {
    return this.internal[t]();
  } : (Ae.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), $s(this), +this;
  }, Ae.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), fn(this), +this;
  }));
});
function fn(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-at(e.timeZone, e) * 60));
}
function $s(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), vr(e);
}
function vr(e) {
  const t = at(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const g = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, l = Math.round(-(at(e.timeZone, e) * 60)) % 60;
  (l || g) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + l), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + l + g));
  const k = at(e.timeZone, e), W = k > 0 ? Math.floor(k) : Math.ceil(k), P = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - W, S = W !== n, $ = P - c;
  if (S && $) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + $);
    const B = at(e.timeZone, e), w = B > 0 ? Math.floor(B) : Math.ceil(B), u = W - w;
    u && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + u), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + u));
  }
}
class Me extends Ae {
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
    return `${t} GMT${n}${r}${o} (${Ys(this.timeZone, this)})`;
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
const qn = 5, Is = 4;
function Bs(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, qn * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? qn : Is;
}
function kr(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Us(e, t) {
  const n = kr(e, t), r = Bs(e, t);
  return t.addDays(n, r * 7 - 1);
}
class Ye {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Me.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, a) => this.overrides?.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Me(r, o, a, this.options.timeZone) : new Date(r, o, a), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : pe(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : qe(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : ar(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : go(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : hn(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : ir(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : ko(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : No(r), a = new Set(o.map((i) => this.getYear(i)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((i) => {
        s.push(new Date(i, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Us(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : So(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : yt(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : ur(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Mo(r), this.format = (r, o, a) => {
      const s = this.overrides?.format ? this.overrides.format(r, o, this.options) : wa(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : fr(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : ot(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : De(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : mr(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Ma(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Na(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : sr(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : xo(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Sa(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Ca(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : po(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : yo(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Et(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : st(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : kr(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Ft(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Yt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Ce(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : xe(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : yn(r), this.options = { locale: xn, ...t }, this.overrides = n;
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
    return t && Ye.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n?.code;
    if (a && Ye.yearFirstLocales.has(a))
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
Ye.yearFirstLocales = /* @__PURE__ */ new Set([
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
const je = new Ye();
class Mr {
  constructor(t, n, r = je) {
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
class Ps {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class Hs {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function As(e) {
  return U.createElement("button", { ...e });
}
function js(e) {
  return U.createElement("span", { ...e });
}
function Rs(e) {
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
function Ls(e) {
  const { day: t, modifiers: n, ...r } = e;
  return U.createElement("td", { ...r });
}
function qs(e) {
  const { day: t, modifiers: n, ...r } = e, o = U.useRef(null);
  return U.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), U.createElement("button", { ref: o, ...r });
}
var R;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(R || (R = {}));
var ye;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(ye || (ye = {}));
var Ue;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ue || (Ue = {}));
var We;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(We || (We = {}));
function zs(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[R.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === a.value);
  return U.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[R.DropdownRoot] },
    U.createElement(r.Select, { className: s, ...a }, t?.map(({ value: c, label: d, disabled: g }) => U.createElement(r.Option, { key: c, value: c, disabled: g }, d))),
    U.createElement(
      "span",
      { className: o[R.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      U.createElement(r.Chevron, { orientation: "down", size: 18, className: o[R.Chevron] })
    )
  );
}
function Zs(e) {
  return U.createElement("div", { ...e });
}
function Qs(e) {
  return U.createElement("div", { ...e });
}
function Gs(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return U.createElement("div", { ...r }, e.children);
}
function Ks(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return U.createElement("div", { ...r });
}
function Xs(e) {
  return U.createElement("table", { ...e });
}
function Js(e) {
  return U.createElement("div", { ...e });
}
const Nr = Hr(void 0);
function It() {
  const e = Ar(Nr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Vs(e) {
  const { components: t } = It();
  return U.createElement(t.Dropdown, { ...e });
}
function ei(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: d } } = It(), g = ie((k) => {
    o && n?.(k);
  }, [o, n]), l = ie((k) => {
    r && t?.(k);
  }, [r, t]);
  return U.createElement(
    "nav",
    { ...a },
    U.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[R.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: l },
      U.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[R.Chevron], orientation: "left" })
    ),
    U.createElement(
      s.NextMonthButton,
      { type: "button", className: i[R.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": d(o), onClick: g },
      U.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[R.Chevron] })
    )
  );
}
function ti(e) {
  const { components: t } = It();
  return U.createElement(t.Button, { ...e });
}
function ni(e) {
  return U.createElement("option", { ...e });
}
function ri(e) {
  const { components: t } = It();
  return U.createElement(t.Button, { ...e });
}
function oi(e) {
  const { rootRef: t, ...n } = e;
  return U.createElement("div", { ...n, ref: t });
}
function ai(e) {
  return U.createElement("select", { ...e });
}
function si(e) {
  const { week: t, ...n } = e;
  return U.createElement("tr", { ...n });
}
function ii(e) {
  return U.createElement("th", { ...e });
}
function ci(e) {
  return U.createElement(
    "thead",
    { "aria-hidden": !0 },
    U.createElement("tr", { ...e })
  );
}
function di(e) {
  const { week: t, ...n } = e;
  return U.createElement("th", { ...n });
}
function li(e) {
  return U.createElement("th", { ...e });
}
function ui(e) {
  return U.createElement("tbody", { ...e });
}
function fi(e) {
  const { components: t } = It();
  return U.createElement(t.Dropdown, { ...e });
}
const hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: As,
  CaptionLabel: js,
  Chevron: Rs,
  Day: Ls,
  DayButton: qs,
  Dropdown: zs,
  DropdownNav: Zs,
  Footer: Qs,
  Month: Gs,
  MonthCaption: Ks,
  MonthGrid: Xs,
  Months: Js,
  MonthsDropdown: Vs,
  Nav: ei,
  NextMonthButton: ti,
  Option: ni,
  PreviousMonthButton: ri,
  Root: oi,
  Select: ai,
  Week: si,
  WeekNumber: di,
  WeekNumberHeader: li,
  Weekday: ii,
  Weekdays: ci,
  Weeks: ui,
  YearsDropdown: fi
}, Symbol.toStringTag, { value: "Module" }));
function ze(e, t, n = !1, r = je) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Sr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Dn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Cr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Tr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Or(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Wr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Ze(e, t, n = je) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Wr(i, n))
      return i.includes(e);
    if (Dn(i))
      return ze(i, e, !1, n);
    if (Or(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Sr(i)) {
      const c = a(i.before, e), d = a(i.after, e), g = c > 0, l = d < 0;
      return s(i.before, i.after) ? l && g : g || l;
    }
    return Cr(i) ? a(e, i.after) > 0 : Tr(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function mi(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: d, today: g } = t, { isSameDay: l, isSameMonth: k, startOfMonth: W, isBefore: E, endOfMonth: P, isAfter: S } = o, $ = n && W(n), B = r && P(r), w = {
    [ye.focused]: [],
    [ye.outside]: [],
    [ye.disabled]: [],
    [ye.hidden]: [],
    [ye.today]: []
  }, u = {};
  for (const m of e) {
    const { date: y, displayMonth: T } = m, I = !!(T && !k(y, T)), j = !!($ && E(y, $)), _ = !!(B && S(y, B)), O = !!(a && Ze(y, a, o)), K = !!(s && Ze(y, s, o)) || j || _ || // Broadcast calendar will show outside days as default
    !d && !c && I || d && c === !1 && I, ue = l(y, g ?? o.today());
    I && w.outside.push(m), O && w.disabled.push(m), K && w.hidden.push(m), ue && w.today.push(m), i && Object.keys(i).forEach((v) => {
      const p = i?.[v];
      p && Ze(y, p, o) && (u[v] ? u[v].push(m) : u[v] = [m]);
    });
  }
  return (m) => {
    const y = {
      [ye.focused]: !1,
      [ye.disabled]: !1,
      [ye.hidden]: !1,
      [ye.outside]: !1,
      [ye.today]: !1
    }, T = {};
    for (const I in w) {
      const j = w[I];
      y[I] = j.some((_) => _ === m);
    }
    for (const I in u)
      T[I] = u[I].some((j) => j === m);
    return {
      ...y,
      // custom modifiers should override all the previous ones
      ...T
    };
  };
}
function gi(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[ye[a]] ? o.push(t[ye[a]]) : t[Ue[a]] && o.push(t[Ue[a]]), o), [t[R.Day]]);
}
function pi(e) {
  return {
    ...hi,
    ...e
  };
}
function yi(e) {
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
function xi() {
  const e = {};
  for (const t in R)
    e[R[t]] = `rdp-${R[t]}`;
  for (const t in ye)
    e[ye[t]] = `rdp-${ye[t]}`;
  for (const t in Ue)
    e[Ue[t]] = `rdp-${Ue[t]}`;
  for (const t in We)
    e[We[t]] = `rdp-${We[t]}`;
  return e;
}
function _r(e, t, n) {
  return (n ?? new Ye(t)).formatMonthYear(e);
}
const Di = _r;
function bi(e, t, n) {
  return (n ?? new Ye(t)).format(e, "d");
}
function wi(e, t = je) {
  return t.format(e, "LLLL");
}
function vi(e, t, n) {
  return (n ?? new Ye(t)).format(e, "cccccc");
}
function ki(e, t = je) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Mi() {
  return "";
}
function Yr(e, t = je) {
  return t.format(e, "yyyy");
}
const Ni = Yr, Si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: _r,
  formatDay: bi,
  formatMonthCaption: Di,
  formatMonthDropdown: wi,
  formatWeekNumber: ki,
  formatWeekNumberHeader: Mi,
  formatWeekdayName: vi,
  formatYearCaption: Ni,
  formatYearDropdown: Yr
}, Symbol.toStringTag, { value: "Module" }));
function Ci(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Si,
    ...e
  };
}
function Ti(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: d } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((k) => {
    const W = r.formatMonthDropdown(k, o), E = d(k), P = t && k < a(t) || n && k > a(n) || !1;
    return { value: E, label: W, disabled: P };
  });
}
function Oi(e, t = {}, n = {}) {
  let r = { ...t?.[R.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function Wi(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let s = 0; s < 7; s++) {
    const i = e.addDays(o, s);
    a.push(i);
  }
  return a;
}
function _i(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, d = a(e), g = s(t), l = i({ start: d, end: g });
  return o && l.reverse(), l.map((k) => {
    const W = n.formatYearDropdown(k, r);
    return {
      value: c(k),
      label: W,
      disabled: !1
    };
  });
}
function Fr(e, t, n, r) {
  let o = (r ?? new Ye(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Yi = Fr;
function Er(e, t, n) {
  return (n ?? new Ye(t)).formatMonthYear(e);
}
const Fi = Er;
function Ei(e, t, n, r) {
  let o = (r ?? new Ye(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function $i(e) {
  return "Choose the Month";
}
function Ii() {
  return "";
}
function Bi(e) {
  return "Go to the Next Month";
}
function Ui(e) {
  return "Go to the Previous Month";
}
function Pi(e, t, n) {
  return (n ?? new Ye(t)).format(e, "cccc");
}
function Hi(e, t) {
  return `Week ${e}`;
}
function Ai(e) {
  return "Week Number";
}
function ji(e) {
  return "Choose the Year";
}
const Ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Fi,
  labelDay: Yi,
  labelDayButton: Fr,
  labelGrid: Er,
  labelGridcell: Ei,
  labelMonthDropdown: $i,
  labelNav: Ii,
  labelNext: Bi,
  labelPrevious: Ui,
  labelWeekNumber: Hi,
  labelWeekNumberHeader: Ai,
  labelWeekday: Pi,
  labelYearDropdown: ji
}, Symbol.toStringTag, { value: "Module" })), Bt = (e) => e instanceof HTMLElement ? e : null, rn = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Li = (e) => Bt(e.querySelector("[data-animated-month]")), on = (e) => Bt(e.querySelector("[data-animated-caption]")), an = (e) => Bt(e.querySelector("[data-animated-weeks]")), qi = (e) => Bt(e.querySelector("[data-animated-nav]")), zi = (e) => Bt(e.querySelector("[data-animated-weekdays]"));
function Zi(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = _e(null), i = _e(r), c = _e(!1);
  jr(() => {
    const d = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const g = a.isSameMonth(r[0].date, d[0].date), l = a.isAfter(r[0].date, d[0].date), k = l ? n[We.caption_after_enter] : n[We.caption_before_enter], W = l ? n[We.weeks_after_enter] : n[We.weeks_before_enter], E = s.current, P = e.current.cloneNode(!0);
    if (P instanceof HTMLElement ? (rn(P).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const u = Li(w);
      u && w.contains(u) && w.removeChild(u);
      const m = on(w);
      m && m.classList.remove(k);
      const y = an(w);
      y && y.classList.remove(W);
    }), s.current = P) : s.current = null, c.current || g || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const S = E instanceof HTMLElement ? rn(E) : [], $ = rn(e.current);
    if ($?.every((B) => B instanceof HTMLElement) && S && S.every((B) => B instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const B = qi(e.current);
      B && (B.style.zIndex = "1"), $.forEach((w, u) => {
        const m = S[u];
        if (!m)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const y = on(w);
        y && y.classList.add(k);
        const T = an(w);
        T && T.classList.add(W);
        const I = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), B && (B.style.zIndex = ""), y && y.classList.remove(k), T && T.classList.remove(W), w.style.position = "", w.style.overflow = "", w.contains(m) && w.removeChild(m);
        };
        m.style.pointerEvents = "none", m.style.position = "absolute", m.style.overflow = "hidden", m.setAttribute("aria-hidden", "true");
        const j = zi(m);
        j && (j.style.opacity = "0");
        const _ = on(m);
        _ && (_.classList.add(l ? n[We.caption_before_exit] : n[We.caption_after_exit]), _.addEventListener("animationend", I));
        const O = an(m);
        O && O.classList.add(l ? n[We.weeks_before_exit] : n[We.weeks_after_exit]), w.insertBefore(m, w.firstChild);
      });
    }
  });
}
function Qi(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: d, differenceInCalendarDays: g, differenceInCalendarMonths: l, endOfBroadcastWeek: k, endOfISOWeek: W, endOfMonth: E, endOfWeek: P, isAfter: S, startOfBroadcastWeek: $, startOfISOWeek: B, startOfWeek: w } = r, u = c ? $(o, r) : s ? B(o) : w(o), m = c ? k(a) : s ? W(E(a)) : P(E(a)), y = g(m, u), T = l(a, o) + 1, I = [];
  for (let O = 0; O <= y; O++) {
    const K = d(u, O);
    if (t && S(K, t))
      break;
    I.push(K);
  }
  const _ = (c ? 35 : 42) * T;
  if (i && I.length < _) {
    const O = _ - I.length;
    for (let K = 0; K < O; K++) {
      const ue = d(I[I.length - 1], 1);
      I.push(ue);
    }
  }
  return I;
}
function Gi(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Ki(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function zn(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: d, addMonths: g, startOfMonth: l } = r;
  if (n && d(n, c) < i - 1) {
    const k = -1 * (i - 1);
    c = g(n, k);
  }
  return t && d(c, t) < 0 && (c = t), l(c);
}
function Xi(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: d, getWeek: g, startOfBroadcastWeek: l, startOfISOWeek: k, startOfWeek: W } = r, E = e.reduce((P, S) => {
    const $ = n.broadcastCalendar ? l(S, r) : n.ISOWeek ? k(S) : W(S), B = n.broadcastCalendar ? a(S) : n.ISOWeek ? s(i(S)) : c(i(S)), w = t.filter((T) => T >= $ && T <= B), u = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < u) {
      const T = t.filter((I) => {
        const j = u - w.length;
        return I > B && I <= o(B, j);
      });
      w.push(...T);
    }
    const m = w.reduce((T, I) => {
      const j = n.ISOWeek ? d(I) : g(I), _ = T.find((K) => K.weekNumber === j), O = new Mr(I, S, r);
      return _ ? _.days.push(O) : T.push(new Hs(j, [O])), T;
    }, []), y = new Ps(S, m);
    return P.push(y), P;
  }, []);
  return n.reverseMonths ? E.reverse() : E;
}
function Ji(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: d, newDate: g, today: l } = t, { fromYear: k, toYear: W, fromMonth: E, toMonth: P } = e;
  !n && E && (n = E), !n && k && (n = t.newDate(k, 0, 1)), !r && P && (r = P), !r && W && (r = g(W, 11, 31));
  const S = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : k ? n = g(k, 0, 1) : !n && S && (n = o(c(e.today ?? l(), -100))), r ? r = i(r) : W ? r = g(W, 11, 31) : !r && S && (r = d(e.today ?? l())), [
    n && a(n),
    r && a(r)
  ];
}
function Vi(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, d = o ? a : 1, g = s(e);
  if (!t)
    return i(g, d);
  if (!(c(t, e) < a))
    return i(g, d);
}
function ec(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, d = o ? a ?? 1 : 1, g = s(e);
  if (!t)
    return i(g, -d);
  if (!(c(g, t) <= 0))
    return i(g, -d);
}
function tc(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Rt(e, t) {
  const [n, r] = ne(e);
  return [t === void 0 ? n : t, r];
}
function nc(e, t) {
  const [n, r] = Ji(e, t), { startOfMonth: o, endOfMonth: a } = t, s = zn(e, n, r, t), [i, c] = Rt(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Ne(() => {
    const y = zn(e, n, r, t);
    c(y);
  }, [e.timeZone]);
  const d = Ki(i, r, e, t), g = Qi(d, e.endMonth ? a(e.endMonth) : void 0, e, t), l = Xi(d, g, e, t), k = tc(l), W = Gi(l), E = ec(i, n, e, t), P = Vi(i, r, e, t), { disableNavigation: S, onMonthChange: $ } = e, B = (y) => k.some((T) => T.days.some((I) => I.isEqualTo(y))), w = (y) => {
    if (S)
      return;
    let T = o(y);
    n && T < o(n) && (T = o(n)), r && T > o(r) && (T = o(r)), c(T), $?.(T);
  };
  return {
    months: l,
    weeks: k,
    days: W,
    navStart: n,
    navEnd: r,
    previousMonth: E,
    nextMonth: P,
    goToMonth: w,
    goToDay: (y) => {
      B(y) || w(y.date);
    }
  };
}
var He;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(He || (He = {}));
function Zn(e) {
  return !e[ye.disabled] && !e[ye.hidden] && !e[ye.outside];
}
function rc(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    Zn(i) && (i[ye.focused] && a < He.FocusedModifier ? (o = s, a = He.FocusedModifier) : r?.isEqualTo(s) && a < He.LastFocused ? (o = s, a = He.LastFocused) : n(s.date) && a < He.Selected ? (o = s, a = He.Selected) : i[ye.today] && a < He.Today && (o = s, a = He.Today));
  }
  return o || (o = e.find((s) => Zn(t(s)))), o;
}
function oc(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: d, addMonths: g, addWeeks: l, addYears: k, endOfBroadcastWeek: W, endOfISOWeek: E, endOfWeek: P, max: S, min: $, startOfBroadcastWeek: B, startOfISOWeek: w, startOfWeek: u } = s;
  let y = {
    day: d,
    week: l,
    month: g,
    year: k,
    startOfWeek: (T) => c ? B(T, s) : i ? w(T) : u(T),
    endOfWeek: (T) => c ? W(T) : i ? E(T) : P(T)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? y = S([r, y]) : t === "after" && o && (y = $([o, y])), y;
}
function $r(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = oc(e, t, n.date, r, o, a, s), d = !!(a.disabled && Ze(c, a.disabled, s)), g = !!(a.hidden && Ze(c, a.hidden, s)), l = c, k = new Mr(c, l, s);
  return !d && !g ? k : $r(e, t, k, r, o, a, s, i + 1);
}
function ac(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = ne(), c = rc(t.days, n, r || (() => !1), s), [d, g] = ne(a ? c : void 0);
  return {
    isFocusTarget: (P) => !!c?.isEqualTo(P),
    setFocused: g,
    focused: d,
    blur: () => {
      i(d), g(void 0);
    },
    moveFocus: (P, S) => {
      if (!d)
        return;
      const $ = $r(P, S, d, t.navStart, t.navEnd, e, o);
      $ && (e.disableNavigation && !t.days.some((w) => w.isEqualTo($)) || (t.goToDay($), g($)));
    }
  };
}
function sc(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Rt(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, d = (W) => i?.some((E) => c(E, W)) ?? !1, { min: g, max: l } = e;
  return {
    selected: i,
    select: (W, E, P) => {
      let S = [...i ?? []];
      if (d(W)) {
        if (i?.length === g || r && i?.length === 1)
          return;
        S = i?.filter(($) => !c($, W));
      } else
        i?.length === l ? S = [W] : S = [...S, W];
      return o || s(S), o?.(S, W, E, P), S;
    },
    isSelected: d
  };
}
function ic(e, t, n = 0, r = 0, o = !1, a = je) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: d, isBefore: g } = a;
  let l;
  if (!s && !i)
    l = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? l = { from: s, to: e } : o ? l = { from: s, to: void 0 } : l = void 0 : g(e, s) ? l = { from: e, to: s } : l = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? l = { from: s, to: i } : l = void 0;
    else if (c(s, e))
      l = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      l = { from: e, to: n > 0 ? void 0 : e };
    else if (g(e, s))
      l = { from: e, to: i };
    else if (d(e, s))
      l = { from: s, to: e };
    else if (d(e, i))
      l = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (l?.from && l?.to) {
    const k = a.differenceInCalendarDays(l.to, l.from);
    r > 0 && k > r ? l = { from: e, to: void 0 } : n > 1 && k < n && (l = { from: e, to: void 0 });
  }
  return l;
}
function cc(e, t, n = je) {
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
function Qn(e, t, n = je) {
  return ze(e, t.from, !1, n) || ze(e, t.to, !1, n) || ze(t, e.from, !1, n) || ze(t, e.to, !1, n);
}
function dc(e, t, n = je) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? ze(e, i, !1, n) : Wr(i, n) ? i.some((c) => ze(e, c, !1, n)) : Dn(i) ? i.from && i.to ? Qn(e, { from: i.from, to: i.to }, n) : !1 : Or(i) ? cc(e, i.dayOfWeek, n) : Sr(i) ? n.isAfter(i.before, i.after) ? Qn(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : Ze(e.from, i, n) || Ze(e.to, i, n) : Cr(i) || Tr(i) ? Ze(e.from, i, n) || Ze(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= c; d++) {
      if (s.some((g) => g(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function lc(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: s } = e, [i, c] = Rt(o, s ? o : void 0), d = s ? o : i;
  return {
    selected: d,
    select: (k, W, E) => {
      const { min: P, max: S } = e, $ = k ? ic(k, d, P, S, a, t) : void 0;
      return r && n && $?.from && $.to && dc({ from: $.from, to: $.to }, n, t) && ($.from = k, $.to = void 0), s || c($), s?.($, k, W, E), $;
    },
    isSelected: (k) => d && ze(d, k, !1, t)
  };
}
function uc(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Rt(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (l, k, W) => {
      let E = l;
      return !r && i && i && c(l, i) && (E = void 0), o || s(E), o?.(E, l, k, W), E;
    },
    isSelected: (l) => i ? c(i, l) : !1
  };
}
function fc(e, t) {
  const n = uc(e, t), r = sc(e, t), o = lc(e, t);
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
function mt(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new Me(t.today, t.timeZone)), t.month && (t.month = new Me(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new Me(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new Me(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new Me(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new Me(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((re) => new Me(re, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new Me(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new Me(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: s, classNames: i } = $e(() => {
    const re = { ...xn, ...t.locale };
    return {
      dateLib: new Ye({
        locale: re,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: pi(t.components),
      formatters: Ci(t.formatters),
      labels: { ...Ri, ...t.labels },
      locale: re,
      classNames: { ...xi(), ...t.classNames }
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
  ]), { captionLayout: c, mode: d, navLayout: g, numberOfMonths: l = 1, onDayBlur: k, onDayClick: W, onDayFocus: E, onDayKeyDown: P, onDayMouseEnter: S, onDayMouseLeave: $, onNextClick: B, onPrevClick: w, showWeekNumber: u, styles: m } = t, { formatCaption: y, formatDay: T, formatMonthDropdown: I, formatWeekNumber: j, formatWeekNumberHeader: _, formatWeekdayName: O, formatYearDropdown: K } = r, ue = nc(t, a), { days: v, months: p, navStart: N, navEnd: M, previousMonth: b, nextMonth: Y, goToMonth: C } = ue, z = mi(v, t, N, M, a), { isSelected: Q, select: oe, selected: X } = fc(t, a) ?? {}, { blur: D, focused: L, isFocusTarget: G, moveFocus: ae, setFocused: ee } = ac(t, ue, z, Q ?? (() => !1), a), { labelDayButton: Z, labelGridcell: se, labelGrid: he, labelMonthDropdown: ve, labelNav: Oe, labelPrevious: Ie, labelNext: Je, labelWeekday: xt, labelWeekNumber: Ve, labelWeekNumberHeader: Ge, labelYearDropdown: Dt } = o, bt = $e(() => Wi(a, t.ISOWeek), [a, t.ISOWeek]), Re = d !== void 0 || W !== void 0, et = ie(() => {
    b && (C(b), w?.(b));
  }, [b, C, w]), tt = ie(() => {
    Y && (C(Y), B?.(Y));
  }, [C, Y, B]), nt = ie((re, ge) => (J) => {
    J.preventDefault(), J.stopPropagation(), ee(re), oe?.(re.date, ge, J), W?.(re.date, ge, J);
  }, [oe, W, ee]), Le = ie((re, ge) => (J) => {
    ee(re), E?.(re.date, ge, J);
  }, [E, ee]), Fe = ie((re, ge) => (J) => {
    D(), k?.(re.date, ge, J);
  }, [D, k]), wt = ie((re, ge) => (J) => {
    const me = {
      ArrowLeft: [
        J.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        J.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [J.shiftKey ? "year" : "week", "after"],
      ArrowUp: [J.shiftKey ? "year" : "week", "before"],
      PageUp: [J.shiftKey ? "year" : "month", "before"],
      PageDown: [J.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (me[J.key]) {
      J.preventDefault(), J.stopPropagation();
      const [Se, le] = me[J.key];
      ae(Se, le);
    }
    P?.(re.date, ge, J);
  }, [ae, P, t.dir]), vt = ie((re, ge) => (J) => {
    S?.(re.date, ge, J);
  }, [S]), kt = ie((re, ge) => (J) => {
    $?.(re.date, ge, J);
  }, [$]), it = ie((re) => (ge) => {
    const J = Number(ge.target.value), me = a.setMonth(a.startOfMonth(re), J);
    C(me);
  }, [a, C]), Mt = ie((re) => (ge) => {
    const J = Number(ge.target.value), me = a.setYear(a.startOfMonth(re), J);
    C(me);
  }, [a, C]), { className: ct, style: we } = $e(() => ({
    className: [i[R.Root], t.className].filter(Boolean).join(" "),
    style: { ...m?.[R.Root], ...t.style }
  }), [i, t.className, t.style, m]), Nt = yi(t), dt = _e(null);
  Zi(dt, !!t.animate, {
    classNames: i,
    months: p,
    focused: L,
    dateLib: a
  });
  const lt = {
    dayPickerProps: t,
    selected: X,
    select: oe,
    isSelected: Q,
    months: p,
    nextMonth: Y,
    previousMonth: b,
    goToMonth: C,
    getModifiers: z,
    components: n,
    classNames: i,
    styles: m,
    labels: o,
    formatters: r
  };
  return U.createElement(
    Nr.Provider,
    { value: lt },
    U.createElement(
      n.Root,
      { rootRef: t.animate ? dt : void 0, className: ct, style: we, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Nt },
      U.createElement(
        n.Months,
        { className: i[R.Months], style: m?.[R.Months] },
        !t.hideNavigation && !g && U.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[R.Nav], style: m?.[R.Nav], "aria-label": Oe(), onPreviousClick: et, onNextClick: tt, previousMonth: b, nextMonth: Y }),
        p.map((re, ge) => U.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[R.Month],
            style: m?.[R.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ge,
            displayIndex: ge,
            calendarMonth: re
          },
          g === "around" && !t.hideNavigation && ge === 0 && U.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[R.PreviousMonthButton], tabIndex: b ? void 0 : -1, "aria-disabled": b ? void 0 : !0, "aria-label": Ie(b), onClick: et, "data-animated-button": t.animate ? "true" : void 0 },
            U.createElement(n.Chevron, { disabled: b ? void 0 : !0, className: i[R.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          U.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[R.MonthCaption], style: m?.[R.MonthCaption], calendarMonth: re, displayIndex: ge }, c?.startsWith("dropdown") ? U.createElement(
            n.DropdownNav,
            { className: i[R.Dropdowns], style: m?.[R.Dropdowns] },
            (() => {
              const J = c === "dropdown" || c === "dropdown-months" ? U.createElement(n.MonthsDropdown, { key: "month", className: i[R.MonthsDropdown], "aria-label": ve(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: it(re.date), options: Ti(re.date, N, M, r, a), style: m?.[R.Dropdown], value: a.getMonth(re.date) }) : U.createElement("span", { key: "month" }, I(re.date, a)), me = c === "dropdown" || c === "dropdown-years" ? U.createElement(n.YearsDropdown, { key: "year", className: i[R.YearsDropdown], "aria-label": Dt(a.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Mt(re.date), options: _i(N, M, r, a, !!t.reverseYears), style: m?.[R.Dropdown], value: a.getYear(re.date) }) : U.createElement("span", { key: "year" }, K(re.date, a));
              return a.getMonthYearOrder() === "year-first" ? [me, J] : [J, me];
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
            } }, y(re.date, a.options, a))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            U.createElement(n.CaptionLabel, { className: i[R.CaptionLabel], role: "status", "aria-live": "polite" }, y(re.date, a.options, a))
          )),
          g === "around" && !t.hideNavigation && ge === l - 1 && U.createElement(
            n.NextMonthButton,
            { type: "button", className: i[R.NextMonthButton], tabIndex: Y ? void 0 : -1, "aria-disabled": Y ? void 0 : !0, "aria-label": Je(Y), onClick: tt, "data-animated-button": t.animate ? "true" : void 0 },
            U.createElement(n.Chevron, { disabled: Y ? void 0 : !0, className: i[R.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ge === l - 1 && g === "after" && !t.hideNavigation && U.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[R.Nav], style: m?.[R.Nav], "aria-label": Oe(), onPreviousClick: et, onNextClick: tt, previousMonth: b, nextMonth: Y }),
          U.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": he(re.date, a.options, a) || void 0, className: i[R.MonthGrid], style: m?.[R.MonthGrid] },
            !t.hideWeekdays && U.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[R.Weekdays], style: m?.[R.Weekdays] },
              u && U.createElement(n.WeekNumberHeader, { "aria-label": Ge(a.options), className: i[R.WeekNumberHeader], style: m?.[R.WeekNumberHeader], scope: "col" }, _()),
              bt.map((J) => U.createElement(n.Weekday, { "aria-label": xt(J, a.options, a), className: i[R.Weekday], key: String(J), style: m?.[R.Weekday], scope: "col" }, O(J, a.options, a)))
            ),
            U.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[R.Weeks], style: m?.[R.Weeks] }, re.weeks.map((J) => U.createElement(
              n.Week,
              { className: i[R.Week], key: J.weekNumber, style: m?.[R.Week], week: J },
              u && // biome-ignore lint/a11y/useSemanticElements: react component
              U.createElement(n.WeekNumber, { week: J, style: m?.[R.WeekNumber], "aria-label": Ve(J.weekNumber, {
                locale: s
              }), className: i[R.WeekNumber], scope: "row", role: "rowheader" }, j(J.weekNumber, a)),
              J.days.map((me) => {
                const { date: Se } = me, le = z(me);
                if (le[ye.focused] = !le.hidden && !!L?.isEqualTo(me), le[Ue.selected] = Q?.(Se) || le.selected, Dn(X)) {
                  const { from: St, to: Ct } = X;
                  le[Ue.range_start] = !!(St && Ct && a.isSameDay(Se, St)), le[Ue.range_end] = !!(St && Ct && a.isSameDay(Se, Ct)), le[Ue.range_middle] = ze(X, Se, !0, a);
                }
                const Ee = Oi(le, m, t.modifiersStyles), Lt = gi(le, i, t.modifiersClassNames), qt = !Re && !le.hidden ? se(Se, le, a.options, a) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  U.createElement(n.Day, { key: `${a.format(Se, "yyyy-MM-dd")}_${a.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: le, className: Lt.join(" "), style: Ee, role: "gridcell", "aria-selected": le.selected || void 0, "aria-label": qt, "data-day": a.format(Se, "yyyy-MM-dd"), "data-month": me.outside ? a.format(Se, "yyyy-MM") : void 0, "data-selected": le.selected || void 0, "data-disabled": le.disabled || void 0, "data-hidden": le.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": le.focused || void 0, "data-today": le.today || void 0 }, !le.hidden && Re ? U.createElement(n.DayButton, { className: i[R.DayButton], style: m?.[R.DayButton], type: "button", day: me, modifiers: le, disabled: le.disabled || void 0, tabIndex: G(me) ? 0 : -1, "aria-label": Z(Se, le, a.options, a), onClick: nt(me, le), onBlur: Fe(me, le), onFocus: Le(me, le), onKeyDown: wt(me, le), onMouseEnter: vt(me, le), onMouseLeave: kt(me, le) }, T(Se, a.options, a)) : !le.hidden && T(me.date, a.options, a))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      U.createElement(n.Footer, { className: i[R.Footer], style: m?.[R.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Gn = (e) => {
  const t = e?.from ? Ce(e.from) : void 0, n = e?.to ? yt(e.to) : void 0;
  return t && n && n.getTime() < t.getTime() ? { from: t, to: yt(t) } : { from: t, to: n };
}, hc = [
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
function mc({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: o = !1
}) {
  const a = q(jt()), s = Gn(e), i = s.from ? De(s.from) : De(a), [c, d] = ne(s), [g, l] = ne(i), k = () => {
    if (!e.from || !e.to) return !1;
    const w = e.from.getTime() === e.to.getTime(), u = e.from.getTime() === a.getTime() && e.to.getTime() === a.getTime();
    return w && u;
  };
  Ne(() => {
    const w = Gn(e);
    d((u) => {
      const m = u.from?.getTime() ?? null, y = u.to?.getTime() ?? null, T = w.from?.getTime() ?? null, I = w.to?.getTime() ?? null;
      if (m === T && y === I)
        return u;
      if (w.from) {
        const O = De(w.from);
        l((K) => K === O || K === O - 1 ? K : O);
      }
      return w;
    });
  }, [e]);
  const W = (w, u) => {
    if (o) return;
    const m = Et(st(/* @__PURE__ */ new Date(), w), u), y = Ce(m), T = yt(m), I = () => r?.("start"), j = () => r?.("end");
    if (k()) {
      const O = { from: y, to: T };
      d(O), t(O), j();
      return;
    }
    if (n === "end") {
      if (!c.from) {
        const N = { from: y, to: T };
        d(N), t(N), j();
        return;
      }
      const O = c.from, K = c.to ?? yt(O);
      let ue = O, v = T;
      y.getTime() < O.getTime() && (ue = y, v = K);
      const p = { from: ue, to: v };
      d(p), t(p), I();
      return;
    }
    const _ = { from: y, to: T };
    d(_), t(_), j();
  }, E = (w, u) => {
    if (!c.from || !c.to || k()) return !1;
    const m = ot(c.from), y = De(c.from), T = ot(c.to), I = De(c.to), j = w * 12 + u, _ = y * 12 + m, O = I * 12 + T;
    return j >= _ && j <= O;
  }, P = (w, u) => {
    if (!c.from || k()) return !1;
    const m = ot(c.from), y = De(c.from);
    return w === y && u === m;
  }, S = (w, u) => {
    if (!c.to || k()) return !1;
    const m = ot(c.to), y = De(c.to);
    return w === y && u === m;
  }, $ = (w, u) => !1, B = (w, u, m, y) => /* @__PURE__ */ H("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ H("div", { className: "flex items-center mb-4", style: { ...y }, children: [
      u && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && l(g - 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(Jn, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md ", children: w }),
      m && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && l(g + 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(Vn, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2", children: hc.map((T, I) => {
      const j = E(w, I), _ = P(w, I), O = S(w, I), K = _ || O, ue = $();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !ue && !o && W(w, I),
          disabled: ue || o,
          className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors
                  ${ue || o ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : K ? "bg-[#003DB8] text-white" : j ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: T
        },
        T
      );
    }) })
  ] }, w);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ H("div", { className: "flex gap-4 justify-center", children: [
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
const gc = ["Q1", "Q2", "Q3", "Q4"];
function pc({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: o = !1
}) {
  const a = De(e.from), [s, i] = ne(a), c = q(jt()), d = () => {
    const S = e.from.getTime() === e.to.getTime(), $ = e.from.getTime() === c.getTime() && e.to.getTime() === c.getTime();
    return S && $;
  }, g = (S, $) => {
    if (o) return;
    const B = Kt(st(/* @__PURE__ */ new Date(), S), $ + 1), w = cn(B), u = Nn(B), m = () => r?.("start"), y = () => r?.("end");
    if (d()) {
      t({ from: w, to: u }), y();
      return;
    }
    const T = ft(e.from), I = De(e.from), j = cn(
      Kt(st(/* @__PURE__ */ new Date(), I), T)
    ), _ = ft(e.to), O = De(e.to), K = Nn(
      Kt(st(/* @__PURE__ */ new Date(), O), _)
    );
    if (j.getTime(), K.getTime(), n === "end") {
      if (w.getTime() < j.getTime()) {
        t({ from: w, to: K }), m();
        return;
      }
      t({ from: j, to: u }), m();
      return;
    }
    t({ from: w, to: u }), y();
  }, l = (S, $) => {
    if (!e.from || !e.to || d()) return !1;
    const B = ft(e.from) - 1, w = De(e.from), u = ft(e.to) - 1, m = De(e.to), y = S * 4 + $, T = w * 4 + B, I = m * 4 + u;
    return y >= T && y <= I;
  }, k = (S, $) => {
    if (!e.from || d()) return !1;
    const B = ft(e.from) - 1, w = De(e.from);
    return S === w && $ === B;
  }, W = (S, $) => {
    if (!e.to || d()) return !1;
    const B = ft(e.to) - 1, w = De(e.to);
    return S === w && $ === B;
  }, E = (S, $) => !1, P = (S, $, B, w) => /* @__PURE__ */ H("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ H(
      "div",
      {
        className: "flex items-center justify-center gap-2 mb-4",
        style: { ...w },
        children: [
          $ && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !o && i(s - 1),
              disabled: o,
              className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(Jn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md", children: S }),
          B && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !o && i(s + 1),
              disabled: o,
              className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(Vn, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3", children: gc.map((u, m) => {
      const y = l(S, m), T = k(S, m), I = W(S, m), j = T || I, _ = E();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !_ && !o && g(S, m),
          disabled: _ || o,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${_ || o ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : j ? "bg-[#003DB8] text-white" : y ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: u
        },
        u
      );
    }) })
  ] }, S);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ H("div", { className: "flex gap-4 justify-center", children: [
    P(s, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    P(s + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
function yc({
  unit: e,
  excludeEnabled: t,
  selectedRange: n,
  displayedMonth: r,
  setDisplayedMonth: o,
  dayPickerModifiers: a,
  dayPickerDisabledMatcher: s,
  monthsViewIndex: i,
  setMonthsViewIndex: c,
  monthsViewYear: d,
  setMonthsViewYear: g,
  yearsViewIndex: l,
  setYearsViewIndex: k,
  yearsViewDecade: W,
  setYearsViewDecade: E,
  handleCalendarSelect: P,
  handleResetCalendarSelect: S,
  handleWeekCalendarSelect: $,
  monthQuarterRange: B,
  activeDateField: w,
  setActiveDateField: u,
  onMonthSelect: m,
  onYearSelect: y,
  todayDateObj: T,
  onDayClick: I,
  endFieldError: j,
  startFieldError: _
}) {
  const O = _e(null), K = _e(null);
  Ne(() => {
    if (e !== "day") return;
    const M = (C, z) => {
      const Q = C.querySelector(
        "span[data-month-name]"
      ), oe = C.querySelector(
        "span[data-year-name]"
      );
      if (Q) {
        const ae = C.textContent || "";
        C.style.gap = "6px", C.style.fontSize = "14px", C.style.fontWeight = "600";
        let ee = "";
        if (oe)
          ee = oe.textContent || "";
        else {
          const Z = ae.match(/\d{4}/);
          Z && (ee = Z[0]);
        }
        if (!oe && ee) {
          const Z = document.createElement("span");
          Z.textContent = ee, Z.setAttribute("data-year-name", "true"), Z.style.cursor = "pointer", Z.style.fontSize = "14px", Z.style.fontWeight = "600", Z.onclick = (he) => {
            he.stopPropagation(), he.preventDefault();
            const ve = parseInt(ee, 10);
            if (!isNaN(ve)) {
              const Oe = Math.floor(ve / 10) * 10;
              E(Oe), k(z), c(null);
            }
          };
          const se = Q.nextSibling;
          if (se && se.nodeType === Node.TEXT_NODE)
            se.parentNode?.insertBefore(Z, se.nextSibling);
          else {
            const he = document.createTextNode(" ");
            C.appendChild(he), C.appendChild(Z);
          }
        } else oe && (oe.onclick = (Z) => {
          Z.stopPropagation(), Z.preventDefault();
          const se = parseInt(ee, 10);
          if (!isNaN(se)) {
            const he = Math.floor(se / 10) * 10;
            E(he), k(z), c(null);
          }
        });
        Q.onclick = (Z) => {
          Z.stopPropagation(), Z.preventDefault();
          const se = parseInt(
            (oe?.textContent || "").trim() || ae,
            10
          );
          isNaN(se) || (g(se), c(z), k(null));
        };
        return;
      }
      const X = C.textContent || "", D = X.trim().split(/\s+/);
      let L = "", G = "";
      if (D.length >= 2)
        L = D[0], G = D[1];
      else if (D.length === 1) {
        const ae = X.match(/^([A-Za-z]+)(\d{4})$/);
        if (ae)
          L = ae[1], G = ae[2];
        else
          return;
      } else
        return;
      if (L && G) {
        const ae = C.firstChild;
        if (C.style.gap = "6px", ae && ae.nodeType === Node.TEXT_NODE && (ae.textContent || "").indexOf(L) !== -1) {
          const se = document.createElement("span");
          se.textContent = L, se.setAttribute("data-month-name", "true"), se.style.cursor = "pointer", se.style.fontSize = "14px", se.style.fontWeight = "600", se.onclick = (Oe) => {
            Oe.stopPropagation(), Oe.preventDefault();
            const Ie = parseInt(G, 10);
            isNaN(Ie) || (g(Ie), c(z), k(null));
          };
          const he = document.createElement("span");
          he.textContent = G, he.setAttribute("data-year-name", "true"), he.style.cursor = "pointer", he.style.fontSize = "14px", he.style.fontWeight = "600", he.onclick = (Oe) => {
            Oe.stopPropagation(), Oe.preventDefault();
            const Ie = parseInt(G, 10);
            if (!isNaN(Ie)) {
              const Je = Math.floor(Ie / 10) * 10;
              E(Je), k(z), c(null);
            }
          }, C.innerHTML = "", C.appendChild(se);
          const ve = document.createTextNode(" ");
          C.appendChild(ve), C.appendChild(he);
        }
      }
    }, b = (C, z) => {
      if (!C) return;
      C.querySelectorAll(".rdp-caption_label").forEach((oe, X) => {
        const D = oe, L = z !== null ? z : X === 0 ? 0 : 1;
        i === L || l === L || M(D, L);
      });
    }, Y = setTimeout(() => {
      i === null && l === null ? b(O.current, null) : (b(O.current, 0), b(K.current, 1));
    }, 150);
    return () => clearTimeout(Y);
  }, [
    e,
    r,
    i,
    l,
    c,
    g,
    E,
    k
  ]);
  const ue = (M) => {
    const b = M - 1, Y = M + 10, C = De(r), z = [];
    for (let Q = b; Q <= Y; Q++)
      z.push(Q);
    return /* @__PURE__ */ H(
      "div",
      {
        className: "flex flex-col w-full",
        style: { width: "224px", height: "256px" },
        children: [
          /* @__PURE__ */ H("div", { className: "flex items-center justify-between mb-4 h-[32px]", children: [
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => E(W - 10),
                className: "p-1 rounded-md transition-colors hover:bg-gray-100",
                type: "button",
                children: /* @__PURE__ */ h(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-4 h-4",
                    children: /* @__PURE__ */ h("path", { d: "m15 18-6-6 6-6" })
                  }
                )
              }
            ),
            /* @__PURE__ */ H("div", { className: "text-sm font-semibold text-gray-900", children: [
              M,
              "-",
              M + 9
            ] }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => E(W + 10),
                className: "p-1 rounded-md transition-colors hover:bg-gray-100",
                type: "button",
                children: /* @__PURE__ */ h(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-4 h-4",
                    children: /* @__PURE__ */ h("path", { d: "m9 18 6-6-6-6" })
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: z.map((Q) => {
            const oe = !ln, X = Q < M || Q > M + 9;
            return /* @__PURE__ */ h(
              "button",
              {
                onClick: () => y(Q),
                disabled: oe,
                className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center justify-center
                  ${X ? "opacity-50 text-gray-500" : C === Q ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
                type: "button",
                children: Q
              },
              Q
            );
          }) })
        ]
      }
    );
  }, v = (M) => /* @__PURE__ */ H(
    "div",
    {
      className: "flex flex-col w-full",
      style: { width: "224px", height: "256px" },
      children: [
        /* @__PURE__ */ H("div", { className: "flex items-center justify-between mb-4 h-[32px]", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => g(d - 1),
              className: "p-1 rounded-md transition-colors hover:bg-gray-100",
              type: "button",
              children: /* @__PURE__ */ h(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-4 h-4",
                  children: /* @__PURE__ */ h("path", { d: "m15 18-6-6 6-6" })
                }
              )
            }
          ),
          /* @__PURE__ */ h("div", { className: "text-sm font-semibold text-gray-900", children: M }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => g(d + 1),
              className: "p-1 rounded-md transition-colors hover:bg-gray-100",
              type: "button",
              children: /* @__PURE__ */ h(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-4 h-4",
                  children: /* @__PURE__ */ h("path", { d: "m9 18 6-6-6-6" })
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: Os.map((b, Y) => {
          const C = !ln, z = De(r) === M && ot(r) === Y;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m(M, Y),
              disabled: C,
              className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center justify-center
                  ${z ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
              type: "button",
              children: b
            },
            b
          );
        }) })
      ]
    }
  ), p = {
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
  }, N = {
    chevron: "fill-[#1F1F1F] w-4 h-4"
  };
  return /* @__PURE__ */ H(
    "div",
    {
      className: `flex gap-4 justify-center mb-4 h-[264px] ${t ? "excluded-enabled" : "excluded-disabled"} ${e}-picker-calender`,
      children: [
        e === "day" && /* @__PURE__ */ h("div", { className: "flex gap-4 ", children: l !== null ? l === 0 ? /* @__PURE__ */ H(gt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0 justify-items-center",
              style: { minWidth: "288px", maxWidth: "280px" },
              children: ue(W)
            }
          ),
          /* @__PURE__ */ h("div", { ref: K, children: /* @__PURE__ */ h(
            mt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: P,
              modifiers: a,
              month: Ce(qe(r, 1)),
              onMonthChange: (M) => {
                const b = new Date(r), C = new Date(M).getMonth() - b.getMonth();
                C !== 1 && C !== -11 && o(Ce(qe(M, -1)));
              },
              numberOfMonths: 1,
              disabled: s,
              onDayClick: I,
              classNames: N,
              className: "text-xs",
              styles: {
                ...p,
                month: {
                  width: "224px",
                  minWidth: "224px",
                  maxWidth: "260px",
                  height: "256px"
                },
                caption: {
                  ...p.caption,
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
          ) })
        ] }) : /* @__PURE__ */ H(gt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              ref: O,
              className: "day_with_years_picker_left_container",
              children: /* @__PURE__ */ h(
                mt,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: n,
                  onSelect: P,
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
                  classNames: N,
                  className: "text-xs",
                  styles: {
                    ...p,
                    month: {
                      width: "224px",
                      minWidth: "224px",
                      maxWidth: "260px",
                      height: "256px"
                    },
                    caption: {
                      ...p.caption,
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
                    },
                    month_caption: {
                      height: "32px"
                    }
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0 justify-items-center",
              style: { minWidth: "232px", maxWidth: "280px" },
              children: ue(W)
            }
          )
        ] }) : i === null ? /* @__PURE__ */ h(
          "div",
          {
            ref: O,
            className: "w-full",
            style: { minWidth: 0 },
            children: /* @__PURE__ */ h(
              mt,
              {
                mode: "range",
                navLayout: "around",
                selected: j || _ ? void 0 : n,
                onSelect: (M, b) => {
                  S(M, b);
                },
                modifiers: a,
                month: r,
                onMonthChange: o,
                numberOfMonths: 2,
                disabled: s,
                className: "text-xs",
                onDayClick: I,
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
                classNames: N,
                styles: {
                  ...p,
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
                    ...p.caption,
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
        ) : i === 0 ? /* @__PURE__ */ H(gt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "justify-items-center month_picker_left_container",
              style: { minWidth: "288px", maxWidth: "280px" },
              children: v(d)
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              ref: K,
              className: "day_picker_right_container",
              children: /* @__PURE__ */ h(
                mt,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: n,
                  onSelect: P,
                  modifiers: a,
                  month: Ce(qe(r, 1)),
                  onMonthChange: (M) => {
                    const b = new Date(r), C = new Date(M).getMonth() - b.getMonth();
                    C !== 1 && C !== -11 && o(Ce(qe(M, -1)));
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
                  classNames: N,
                  className: "text-xs",
                  styles: {
                    ...p,
                    month: {
                      width: "224px",
                      minWidth: "224px",
                      maxWidth: "260px",
                      height: "256px"
                    },
                    caption: {
                      ...p.caption,
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
              )
            }
          )
        ] }) : /* @__PURE__ */ H(gt, { children: [
          /* @__PURE__ */ h("div", { ref: O, className: "day_picker_left_container", children: /* @__PURE__ */ h(
            mt,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: P,
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
              classNames: N,
              className: "text-xs",
              styles: {
                ...p,
                month: {
                  width: "224px",
                  minWidth: "224px",
                  maxWidth: "260px",
                  height: "256px"
                },
                caption: {
                  ...p.caption,
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
                },
                month_caption: {
                  height: "32px"
                }
              }
            }
          ) }),
          /* @__PURE__ */ h(
            "div",
            {
              className: "justify-items-center month_picker_right_container",
              style: { minWidth: "232px", maxWidth: "280px" },
              children: v(d)
            }
          )
        ] }) }),
        e === "week" && /* @__PURE__ */ h(
          mt,
          {
            mode: "range",
            navLayout: "around",
            showWeekNumber: !0,
            locale: void 0,
            formatters: {
              formatWeekNumber: (M) => `W${String(M).padStart(2, "0")}`
            },
            selected: n,
            onSelect: (M, b) => {
              $(M, b);
            },
            modifiers: a,
            onWeekNumberClick: (M, b) => {
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
            disabled: (M) => s(M),
            onDayClick: I,
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
            classNames: N,
            styles: {
              ...p,
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
                ...p.caption,
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
          mc,
          {
            selectedRange: B,
            onSelect: P,
            activeDateField: w,
            onActiveFieldChange: u,
            disabled: t
          }
        ),
        e === "quarter" && /* @__PURE__ */ h(
          pc,
          {
            selectedRange: B,
            onSelect: P,
            activeDateField: w,
            onActiveFieldChange: u,
            disabled: t
          }
        )
      ]
    }
  );
}
function xc({
  excludeEnabled: e,
  hasEmptyDates: t,
  hasFutureDates: n,
  onToday: r,
  onClear: o,
  onCancel: a,
  onApply: s
}) {
  return /* @__PURE__ */ H("div", { className: "flex items-center justify-between pt-2 pb-2 px-6 border-t border-gray-200", children: [
    /* @__PURE__ */ h("div", {}),
    /* @__PURE__ */ H("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: o,
          disabled: e,
          className: `px-4 py-2 text-xs font-medium rounded-[4px] transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-gray-600 hover:bg-gray-100"}`,
          children: "Clear dates"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: a,
          disabled: e,
          className: `px-4 py-2 text-xs font-semibold rounded-[4px] transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-[#003DB8] hover:bg-gray-100"}`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          disabled: !!(e || t || n),
          className: `px-4 py-2 text-xs font-semibold rounded-[4px] transition-colors ${e || t || n ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#003DB8] text-white hover:bg-[#003DB8]"}`,
          children: "Apply"
        }
      )
    ] })
  ] });
}
function Dc({
  initialSelection: e,
  onApply: t
}) {
  const n = jt(), r = (e?.excludeFilterTypes || []).filter(
    (f) => f === "days" || f === "saved-dates" || f === "date-range"
  ), [o, a] = ne(
    e?.unit || "day"
  ), [s, i] = ne(
    e?.startDateUtc || n
  ), [c, d] = ne(
    e?.endDateUtc || n
  ), [g, l] = ne(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [k, W] = ne(e?.duration || 1), [E, P] = ne(null), [S, $] = ne(
    e?.excludedWeekdays || []
  ), [B, w] = ne(
    e?.excludedSpecificDates || []
  ), [u, m] = ne(!1), [y, T] = ne(r), [I, j] = ne(null), [_, O] = ne(
    e?.excludedSavedDates || []
  ), [K, ue] = ne(""), [v, p] = ne(e?.excludedDateRanges || []), [N, M] = ne(() => e?.excludeEnabled ? !0 : !!(r.length > 0 || e?.excludedWeekdays && e.excludedWeekdays.length > 0 || e?.excludedSavedDates && e.excludedSavedDates.length > 0)), b = _e(
    (e?.excludedSavedDates && e.excludedSavedDates.length > 0 || e?.excludedDateRanges && e.excludedDateRanges.length > 0 || e?.excludedSpecificDates && e.excludedSpecificDates.length > 0) && e?.startDateUtc && e?.endDateUtc ? {
      start: e.startDateUtc,
      end: e.endDateUtc
    } : null
  ), Y = _e({
    excludeFilterTypes: r,
    excludedWeekdays: e?.excludedWeekdays || [],
    excludedSpecificDates: e?.excludedSpecificDates || [],
    excludedSavedDates: e?.excludedSavedDates || [],
    excludedDateRanges: e?.excludedDateRanges || []
  }), [C, z] = ne([]), [Q, oe] = ne(void 0), [X, D] = ne(() => e?.startDateUtc ? Ce(q(e.startDateUtc)) : Ce(q(n))), [L, G] = ne(null), [ae, ee] = ne(() => e?.startDateUtc ? De(q(e.startDateUtc)) : De(q(n))), [Z, se] = ne(null), [he, ve] = ne(() => {
    if (e?.startDateUtc) {
      const x = De(q(e.startDateUtc));
      return Math.floor(x / 10) * 10;
    }
    const f = De(q(n));
    return Math.floor(f / 10) * 10;
  }), [Oe, Ie] = ne(!1), [Je, xt] = ne(!1), Ve = $e(() => {
    if (!s || !c) return o;
    if (o === "day") return "day";
    const f = q(s), x = q(c), F = pe(x, 1), A = (V) => {
      if (V === "day") return !0;
      if (V === "week") {
        const te = mn(F, f);
        return te > 0 && te % 7 === 0;
      }
      if (V === "month") {
        const te = gn(F, f);
        return te > 0 && qe(f, te).getTime() === F.getTime();
      }
      if (V === "quarter") {
        const te = dr(F, f);
        return te > 0 && or(f, te).getTime() === F.getTime();
      }
      return !1;
    };
    return o === "quarter" ? A("quarter") ? "quarter" : A("month") ? "month" : A("week") ? "week" : "day" : o === "month" ? A("month") ? "month" : A("week") ? "week" : "day" : o === "week" ? A("week") ? "week" : "day" : o;
  }, [o, s, c]);
  Ne(() => {
    if (s && c) {
      const f = br(
        s,
        c,
        Ve,
        S
      );
      W(f);
    } else
      W(1);
  }, [s, c, Ve, S]), Ne(() => {
    if (u || !s || !c || !b.current || !(_.length > 0 || B.length > 0 || v.length > 0))
      return;
    const x = b.current;
    (s > x.end || c < x.start) && (O([]), w([]), p([]), T((A) => A.filter((V) => V === "days")), Y.current && (Y.current = {
      ...Y.current,
      excludedSavedDates: [],
      excludedSpecificDates: [],
      excludedDateRanges: [],
      excludeFilterTypes: Y.current.excludeFilterTypes.filter(
        (A) => A === "days"
      )
    }), b.current = null, M(S.length > 0));
  }, [
    s,
    c,
    u,
    _,
    B,
    v,
    S
  ]), Ne(() => {
    (async () => {
      await pt.init();
      const x = await pt.getData(
        "savedDateRanges"
      );
      x && z(x);
    })();
  }, []), Ne(() => {
    s && !c ? l("end") : !s && c && l("start");
  }, [s, c]), Ne(() => {
    L === null && ee(De(X));
  }, [X, L]), Ne(() => {
    I !== "saved-dates" && ue("");
  }, [I]);
  const Ge = ie(
    (f) => {
      if (_.length === 0) return !1;
      const x = de(f);
      return _.some((F) => {
        const A = C.find((te) => te.id === F);
        return !A || !(x >= A.selection.startDateUtc && x <= A.selection.endDateUtc) ? !1 : (A.selection.excludedWeekdays && A.selection.excludedWeekdays.length > 0 && A.selection.excludedWeekdays.includes(f.getDay()) || A.selection.excludedSpecificDates && A.selection.excludedSpecificDates.length > 0 && A.selection.excludedSpecificDates.includes(x) || A.selection.excludedSavedDates && A.selection.excludedSavedDates.some(
          (Be) => {
            const ut = C.find(
              (Ut) => Ut.id === Be
            );
            return ut ? x >= ut.selection.startDateUtc && x <= ut.selection.endDateUtc : !1;
          }
        ) || A.selection.excludedDateRanges && A.selection.excludedDateRanges.some(
          (Be) => x >= Be.start && x <= Be.end
        ), !0);
      });
    },
    [_, C]
  ), Dt = $e(() => {
    const f = {};
    return S.length > 0 && (f.excludedWeekday = {
      dayOfWeek: S
    }), _.length > 0 && (f["excluded-saved-date"] = Ge), B.length > 0 && (f["excluded-specific-date"] = (x) => B.includes(de(x))), v.length > 0 && (f["excluded-range"] = (x) => {
      const F = de(x);
      return v.some(
        (A) => F >= A.start && F <= A.end
      );
    }), E && (f["exclude-range-start"] = (x) => de(x) === E), f;
  }, [
    _,
    S,
    Ge,
    B,
    v,
    E
  ]), bt = $e(
    () => ({
      from: s ? q(s) : void 0,
      to: c ? q(c) : void 0
    }),
    [s, c]
  ), Re = $e(() => q(n), [n]), et = $e(
    () => ({
      from: s ? q(s) : Re,
      to: c ? q(c) : Re
    }),
    [c, s, Re]
  ), tt = $e(() => {
    const f = K.trim().toLowerCase();
    return f ? C.filter((x) => {
      const F = (/* @__PURE__ */ new Date(x.selection.startDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase(), A = (/* @__PURE__ */ new Date(x.selection.endDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase();
      return x.label.toLowerCase().includes(f) || `${F} - ${A}`.includes(f);
    }) : C;
  }, [C, K]), nt = $e(
    () => !s || s.trim() === "" || !c || c.trim() === "",
    [c, s]
  ), Le = $e(() => !1, [c, s, n]), Fe = ie(
    (f) => f.filter(
      (x) => x === "days" || x === "saved-dates" || x === "date-range"
    ),
    []
  ), wt = ie(
    (f) => {
      if (f) {
        m(!0), a("day");
        const x = Y.current, F = Fe(
          x.excludeFilterTypes
        );
        T([...F]), $([...x.excludedWeekdays]), w([...x.excludedSpecificDates]), O([...x.excludedSavedDates]), p([...x.excludedDateRanges]), j(null);
      } else {
        const x = Y.current, F = Fe(
          x.excludeFilterTypes
        );
        T([...F]), $([...x.excludedWeekdays]), w([...x.excludedSpecificDates]), O([...x.excludedSavedDates]), p([...x.excludedDateRanges]), M(
          F.length > 0 || x.excludedWeekdays.length > 0 || x.excludedSavedDates.length > 0
        ), m(!1), j(null), P(null);
      }
    },
    [Fe]
  ), vt = ie(
    (f) => {
      u && (y.includes(f) || T([...y, f]), j((x) => x === f ? null : f));
    },
    [u, y]
  ), kt = ie(
    (f) => {
      if (!u) return;
      const x = y.filter((F) => F !== f);
      if (T(x), f === "days" && $([]), f === "saved-dates" && O([]), f === "date-range" && p([]), I === f) {
        const F = x.find(
          (A) => A === "days" || A === "saved-dates"
        );
        j(
          F ?? null
        );
      }
    },
    [I, u, y]
  ), it = ie(() => {
    const f = Y.current, x = Fe(
      f.excludeFilterTypes
    );
    T([...x]), $([...f.excludedWeekdays]), w([...f.excludedSpecificDates]), O([...f.excludedSavedDates]), p([...f.excludedDateRanges]), M(
      x.length > 0 || f.excludedWeekdays.length > 0 || f.excludedSavedDates.length > 0
    ), m(!1), j(null), P(null);
  }, [Fe]), Mt = ie(() => {
    const f = S.length > 0, x = _.length > 0, F = v.length > 0, A = B.length > 0, V = [];
    f && V.push("days"), x && V.push("saved-dates"), F && V.push("date-range"), A && V.push("specific-date");
    const te = f ? [...S] : [], Be = A ? [...B] : [], ut = x ? [..._] : [], Ut = F ? [...v] : [];
    Y.current = {
      excludeFilterTypes: V,
      excludedWeekdays: te,
      excludedSpecificDates: Be,
      excludedSavedDates: ut,
      excludedDateRanges: Ut
    }, s && c && (b.current = { start: s, end: c });
    const Pr = Fe(V);
    T(Pr), $(te), w(Be), O(ut), p(Ut), M(V.length > 0), m(!1), j(null), P(null);
  }, [
    v,
    _,
    S,
    B,
    Fe,
    s,
    c
  ]), ct = ie(
    (f) => {
      $((x) => x.includes(f) ? x.filter((F) => F !== f) : [...x, f]), u && T((x) => x.includes("days") ? x : [...x, "days"]);
    },
    [u]
  ), we = ie((f) => {
    f && D(Ce(q(f)));
  }, []), Nt = ie(
    (f) => {
      u || (i(f), f ? c || l("end") : l("start"), f && c && q(f) > q(c) && d(f), we(f));
    },
    [c, u, we]
  ), dt = ie(
    (f) => {
      u || (d(f), f ? s || l("start") : l("end"), f && s && q(f) < q(s) && i(f), we(f));
    },
    [u, s, we]
  ), lt = ie(
    (f) => {
      if (!(u || f <= 0)) {
        if (W(f), s) {
          let x = s;
          if (o === "week" || o === "month" || o === "quarter") {
            const A = q(s);
            let V = A;
            o === "week" ? V = xe(A, {
              weekStartsOn: ke
            }) : o === "month" ? V = Ce(A) : o === "quarter" && (V = cn(A));
            const te = de(V);
            te !== s && (i(te), x = te);
          }
          const F = fs(
            x,
            o,
            f,
            S
          );
          d(F), we(F);
        } else if (c) {
          const x = hs(
            c,
            o,
            f,
            S
          );
          i(x), we(x);
        }
        l("start");
      }
    },
    [
      c,
      u,
      S,
      s,
      o,
      we
    ]
  ), re = ie(
    (f) => {
      u || (a(f), (f === "day" || f === "week") && s && D(Ce(q(s))));
    },
    [u, s]
  ), ge = ie(
    (f, x) => {
      u || (i(f), d(x), l("start"), we(f));
    },
    [u, we]
  ), J = ie(
    (f) => {
      if (u) return;
      i(f.startDateUtc), d(f.endDateUtc), a(f.unit);
      const x = f.excludedWeekdays || [];
      $(x), W(f.duration), l("start");
      const F = (f.excludeFilterTypes || []).filter(
        (Be) => Be === "days" || Be === "saved-dates" || Be === "date-range"
      ), A = f.excludedSpecificDates || [], V = f.excludedSavedDates || [], te = f.excludedDateRanges || [];
      T(F), w(A), O(V), p(te), f.startDateUtc && f.endDateUtc && (b.current = {
        start: f.startDateUtc,
        end: f.endDateUtc
      }), Y.current = {
        excludeFilterTypes: F,
        excludedWeekdays: x,
        excludedSpecificDates: A,
        excludedSavedDates: V,
        excludedDateRanges: te
      }, M(
        F.length > 0 || x.length > 0 || V.length > 0
      ), m(!1), j(null), f.startDateUtc && we(f.startDateUtc);
    },
    [u, we]
  ), me = ie(() => {
    u || (i(n), d(n), $([]), l("start"), we(n));
  }, [u, n, we]), Se = ie(() => {
    u || (i(""), d(""), W(1), $([]), l("start"), m(!1), T([]), w([]), O([]), p([]), j(null), Y.current = {
      excludeFilterTypes: [],
      excludedWeekdays: [],
      excludedSpecificDates: [],
      excludedSavedDates: [],
      excludedDateRanges: []
    }, M(!1), we(n));
  }, [u, n, we]), le = ie(() => {
    if (u || nt || Le) return;
    const f = wr(
      s,
      c,
      o,
      S,
      N,
      y,
      B,
      _,
      v
    );
    t(f);
  }, [
    c,
    N,
    u,
    y,
    v,
    _,
    B,
    S,
    nt,
    Le,
    t,
    s,
    o
  ]), Ee = ie(
    (f) => {
      if (!u && f?.from) {
        const x = de(f.from);
        if (i(x), f?.to) {
          const F = de(f.to);
          d(F), l("start");
        } else
          d(x), l("end");
      }
    },
    [u]
  ), Lt = ie(
    (f, x) => {
      if (!u) {
        if (s && c && f?.to) {
          const F = de(x);
          g === "start" ? q(c).getTime() > q(F).getTime() ? i(F) : (i(F), d("")) : q(s).getTime() > q(F).getTime() ? (d(s), i(F)) : (d(F), i(s)), l(g === "start" ? "end" : "start");
          return;
        }
        if (!s && c && f?.from) {
          d(de(f?.from)), l("start");
          return;
        }
        if (!s && !c && f?.from) {
          i(de(f?.from)), d(""), l("end");
          return;
        }
        if (f?.from) {
          const F = de(f.from);
          if (i(F), f?.to) {
            const A = de(f.to);
            d(A), l("start");
          } else
            d(F), l("end");
        }
      }
    },
    [g, c, u, s]
  ), qt = ie(
    (f, x) => {
      if (!(u || !f) && f.from) {
        let F = xe(f.from, {
          weekStartsOn: ke
        }), A = pe(F, 6);
        if (s && c)
          if (g === "start")
            if (q(de(x)).getTime() > q(c).getTime() && q(de(x)).getTime() > q(s).getTime())
              F = xe(x, {
                weekStartsOn: ke
              }), A = pe(F, 6), Ee({ from: F, to: A });
            else if (q(de(x)).getTime() < q(c).getTime() && q(de(x)).getTime() < q(s).getTime()) {
              F = xe(x, {
                weekStartsOn: ke
              }), A = pe(F, 6);
              const V = xe(c, {
                weekStartsOn: ke
              }), te = pe(V, 6);
              Ee({ from: F, to: te });
            } else if (q(de(x)).getTime() > q(s).getTime() && q(de(x)).getTime() < q(c).getTime()) {
              F = xe(x, {
                weekStartsOn: ke
              }), A = pe(F, 6);
              const V = xe(c, {
                weekStartsOn: ke
              }), te = pe(V, 6);
              Ee({ from: F, to: te });
            } else
              F = xe(x, {
                weekStartsOn: ke
              }), A = pe(x, 6), Ee({ from: F, to: A });
          else if (q(de(x)).getTime() > q(c).getTime()) {
            F = xe(f.from, {
              weekStartsOn: ke
            }), A = pe(F, 6);
            const V = xe(x, {
              weekStartsOn: ke
            }), te = pe(V, 6);
            Ee({ from: F, to: te });
          } else if (q(de(x)).getTime() < q(c).getTime() && q(de(x)).getTime() < q(s).getTime()) {
            F = xe(x, {
              weekStartsOn: ke
            }), A = pe(F, 6);
            const V = xe(s, {
              weekStartsOn: ke
            }), te = pe(V, 6);
            Ee({ from: F, to: te });
          } else {
            F = xe(s, {
              weekStartsOn: ke
            }), A = pe(F, 6);
            const V = xe(x, {
              weekStartsOn: ke
            }), te = pe(V, 6);
            Ee({ from: F, to: te });
          }
        if (f.to && (!s || !c)) {
          const V = xe(f.to, {
            weekStartsOn: ke
          }), te = pe(V, 6);
          Ee({ from: F, to: te });
        }
        l(g === "start" ? "end" : "start");
      }
    },
    [
      g,
      c,
      u,
      Ee,
      s
    ]
  ), St = ie(
    (f) => {
      if (u) {
        if (!s || !c) return !0;
        const V = de(f);
        return V < s || V > c;
      }
      de(f);
      const x = !ln, F = u && y.includes("days") && S.includes(f.getDay()), A = u && y.includes("saved-dates") && Ge(f);
      return x || F || A;
    },
    [
      u,
      y,
      S,
      Ge,
      n,
      s,
      c
    ]
  ), Ct = ie(() => {
    if (!Le) return null;
    const f = s && s > n, x = c && c > n;
    return f && x ? "Start date and end date cannot be in the future." : f ? "Start date cannot be in the future." : x ? "End date cannot be in the future." : null;
  }, [c, Le, s, n]), Ir = ie((f, x) => {
    const F = Ce(
      Et(st(/* @__PURE__ */ new Date(), f), x)
    );
    D(F), G(null), ee(f);
  }, []), Br = ie(
    (f) => {
      const x = ot(X), F = Ce(
        Et(st(/* @__PURE__ */ new Date(), f), x)
      );
      D(F), se(null), ve(Math.floor(f / 10) * 10);
    },
    [X]
  ), Ur = ie(
    (f) => {
      if (!u) return;
      const x = de(f);
      if (!(s && c && (x < s || x > c)))
        if (E) {
          const F = x < E ? x : E, A = x < E ? E : x, V = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            start: F,
            end: A
          };
          p((te) => [...te, V]), P(null), T((te) => te.includes("date-range") ? te : [...te, "date-range"]);
        } else
          P(x);
    },
    [u, s, c, E]
  );
  return {
    today: n,
    unit: o,
    displayUnit: Ve,
    startDateUtc: s,
    endDateUtc: c,
    activeDateField: g,
    duration: k,
    excludedWeekdays: S,
    excludedSpecificDates: B,
    excludeEnabled: u,
    excludeFilterTypes: y,
    activeFilterView: I,
    excludedSavedDates: _,
    savedDatesSearchTerm: K,
    excludedDateRanges: v,
    savedDatesForFilter: C,
    displayedMonth: X,
    monthsViewIndex: L,
    monthsViewYear: ae,
    yearsViewIndex: Z,
    yearsViewDecade: he,
    excludeApplied: N,
    hasFutureDates: Le,
    hasEmptyDates: nt,
    dayPickerModifiers: Dt,
    selectedRange: bt,
    todayDateObj: Re,
    monthQuarterRange: et,
    filteredSavedDates: tt,
    dayPickerDisabledMatcher: St,
    getFutureDateWarning: Ct,
    setActiveDateField: l,
    setSavedDatesSearchTerm: ue,
    setMonthsViewIndex: G,
    setYearsViewIndex: se,
    setYearsViewDecade: ve,
    setMonthsViewYear: ee,
    setDisplayedMonth: D,
    handleStartDateChange: Nt,
    handleEndDateChange: dt,
    handleDurationChange: lt,
    handleUnitChange: re,
    handlePresetSelect: ge,
    handleSavedDateSelect: J,
    handleToday: me,
    handleClear: Se,
    handleApply: le,
    handleCalendarSelect: Ee,
    handleResetCalendarSelect: Lt,
    handleWeekCalendarSelect: qt,
    handleExcludeToggle: wt,
    handleExcludeFilterButtonClick: vt,
    handleExcludeRemoveType: kt,
    handleExcludeCancel: it,
    handleExcludeSave: Mt,
    toggleWeekday: ct,
    setExcludedSavedDates: O,
    setExcludedSpecificDates: w,
    setExcludedDateRanges: p,
    setExcludeFilterTypes: T,
    setActiveFilterView: j,
    excludeSavedStateRef: Y,
    sanitizeExcludeFilterTypes: Fe,
    handleMonthSelect: Ir,
    handleYearSelect: Br,
    handleDayClick: Ur,
    excludeSelectionStart: E,
    endFieldError: Oe,
    setEndFieldError: Ie,
    startFieldError: Je,
    setStartFieldError: xt
  };
}
function Oc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const {
    unit: o,
    displayUnit: a,
    startDateUtc: s,
    endDateUtc: i,
    activeDateField: c,
    duration: d,
    excludedWeekdays: g,
    excludedSpecificDates: l,
    excludeEnabled: k,
    excludeFilterTypes: W,
    activeFilterView: E,
    excludedSavedDates: P,
    savedDatesSearchTerm: S,
    excludedDateRanges: $,
    displayedMonth: B,
    monthsViewIndex: w,
    monthsViewYear: u,
    yearsViewIndex: m,
    yearsViewDecade: y,
    excludeApplied: T,
    hasFutureDates: I,
    hasEmptyDates: j,
    dayPickerModifiers: _,
    selectedRange: O,
    todayDateObj: K,
    monthQuarterRange: ue,
    savedDatesForFilter: v,
    filteredSavedDates: p,
    dayPickerDisabledMatcher: N,
    getFutureDateWarning: M,
    setActiveDateField: b,
    setSavedDatesSearchTerm: Y,
    setMonthsViewIndex: C,
    setYearsViewIndex: z,
    setYearsViewDecade: Q,
    setMonthsViewYear: oe,
    setDisplayedMonth: X,
    handleStartDateChange: D,
    handleEndDateChange: L,
    handleDurationChange: G,
    handleUnitChange: ae,
    handlePresetSelect: ee,
    handleSavedDateSelect: Z,
    handleToday: se,
    handleClear: he,
    handleApply: ve,
    handleCalendarSelect: Oe,
    handleResetCalendarSelect: Ie,
    handleWeekCalendarSelect: Je,
    handleExcludeToggle: xt,
    handleExcludeFilterButtonClick: Ve,
    handleExcludeRemoveType: Ge,
    handleExcludeCancel: Dt,
    handleExcludeSave: bt,
    toggleWeekday: Re,
    setExcludedSavedDates: et,
    setExcludedSpecificDates: tt,
    setExcludedDateRanges: nt,
    setExcludeFilterTypes: Le,
    setActiveFilterView: Fe,
    handleMonthSelect: wt,
    handleYearSelect: vt,
    handleDayClick: kt,
    endFieldError: it,
    setEndFieldError: Mt,
    startFieldError: ct,
    setStartFieldError: we
  } = Dc({
    initialSelection: e,
    onApply: t
  }), Nt = {
    height: "auto",
    minHeight: Ws,
    width: nn,
    minWidth: nn,
    maxWidth: nn,
    overflow: "visible",
    ...r
  }, dt = wr(
    s,
    i,
    o,
    g,
    T,
    W,
    l,
    P,
    $
  ), lt = M();
  return /* @__PURE__ */ H(
    "div",
    {
      className: "flex bg-white rounded-xl shadow-xl border border-gray-200",
      style: Nt,
      children: [
        /* @__PURE__ */ h(
          bs,
          {
            onPresetSelect: ee,
            onSavedDateSelect: Z,
            currentSelection: dt,
            themeColors: r || {},
            disabled: k
          }
        ),
        /* @__PURE__ */ H(
          "div",
          {
            className: "flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden",
            style: { minWidth: "520px" },
            children: [
              /* @__PURE__ */ H("div", { className: "pt-4 flex-1 min-w-0 overflow-x-hidden", children: [
                /* @__PURE__ */ h(
                  Ts,
                  {
                    unit: o,
                    excludeEnabled: k,
                    onUnitChange: ae
                  }
                ),
                /* @__PURE__ */ h(
                  Ss,
                  {
                    startDateUtc: s,
                    endDateUtc: i,
                    duration: d,
                    unit: a,
                    selectedUnit: o,
                    excludeEnabled: k,
                    activeDateField: c,
                    onStartDateChange: D,
                    onEndDateChange: L,
                    onDurationChange: G,
                    onActiveFieldChange: b,
                    endFieldError: it,
                    setEndFieldError: Mt,
                    startFieldError: ct,
                    setStartFieldError: we
                  }
                ),
                I && lt && /* @__PURE__ */ H("div", { className: "mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2", children: [
                  /* @__PURE__ */ h(co, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ h("p", { className: "text-sm text-amber-800", children: lt })
                ] }),
                /* @__PURE__ */ h(
                  _s,
                  {
                    excludeEnabled: k,
                    excludeFilterTypes: W,
                    activeFilterView: E,
                    excludedWeekdays: g,
                    excludedSavedDates: P,
                    excludedSpecificDates: l,
                    excludedDateRanges: $,
                    savedDatesSearchTerm: S,
                    filteredSavedDates: p,
                    savedDatesForFilter: v,
                    onExcludeToggle: xt,
                    onFilterButtonClick: Ve,
                    onRemoveFilterType: Ge,
                    onCancel: Dt,
                    onSave: bt,
                    onToggleWeekday: Re,
                    setSavedDatesSearchTerm: Y,
                    setExcludedSavedDates: et,
                    setExcludedSpecificDates: tt,
                    setExcludedDateRanges: nt,
                    setExcludeFilterTypes: Le,
                    setActiveFilterView: Fe
                  }
                ),
                /* @__PURE__ */ h(
                  yc,
                  {
                    unit: o,
                    excludeEnabled: k,
                    selectedRange: O,
                    displayedMonth: B,
                    setDisplayedMonth: X,
                    dayPickerModifiers: _,
                    dayPickerDisabledMatcher: N,
                    monthsViewIndex: w,
                    setMonthsViewIndex: C,
                    monthsViewYear: u,
                    setMonthsViewYear: oe,
                    yearsViewIndex: m,
                    setYearsViewIndex: z,
                    yearsViewDecade: y,
                    setYearsViewDecade: Q,
                    handleCalendarSelect: Oe,
                    handleResetCalendarSelect: Ie,
                    handleWeekCalendarSelect: Je,
                    monthQuarterRange: ue,
                    activeDateField: c,
                    setActiveDateField: b,
                    onMonthSelect: wt,
                    onYearSelect: vt,
                    todayDateObj: K,
                    onDayClick: kt,
                    endFieldError: it,
                    startFieldError: ct
                  }
                )
              ] }),
              /* @__PURE__ */ h(
                xc,
                {
                  excludeEnabled: k,
                  hasEmptyDates: j,
                  hasFutureDates: I,
                  onToday: se,
                  onClear: he,
                  onCancel: n,
                  onApply: ve
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
  ln as ALLOW_FUTURE_DATES,
  Oc as AdvancedDateRangePicker,
  Nc as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  Sc as WEEK_NUMBERING_MODE,
  ke as WEEK_STARTS_ON,
  br as calcDurationFromRange,
  fs as calcEndFromDuration,
  hs as calcStartFromDuration,
  wr as createSelection,
  Cc as formatDisplayDate,
  de as formatUtc,
  ps as getPresets,
  jt as getTodayUtc,
  gs as getUnitAbbreviation,
  Tc as parseDisplayDate,
  q as parseUtc
};
