import { jsxs as H, jsx as h, Fragment as mt } from "react/jsx-runtime";
import U, { forwardRef as Kn, createElement as sn, useState as ne, useEffect as Me, useRef as _e, useMemo as $e, createContext as Ar, useContext as jr, useCallback as se, useLayoutEffect as Rr } from "react";
import { LocalizationProvider as Lr } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField as bn } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs as qr } from "@mui/x-date-pickers/AdapterDayjs";
const zr = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Zr = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), wn = (e) => {
  const t = Zr(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Xn = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Qr = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Gr = {
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
const Kr = Kn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: i,
    ...s
  }, d) => sn(
    "svg",
    {
      ref: d,
      ...Gr,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Xn("lucide", o),
      ...!a && !Qr(s) && { "aria-hidden": "true" },
      ...s
    },
    [
      ...i.map(([c, m]) => sn(c, m)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
const Qe = (e, t) => {
  const n = Kn(
    ({ className: r, ...o }, a) => sn(Kr, {
      ref: a,
      iconNode: t,
      className: Xn(
        `lucide-${zr(wn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = wn(e), n;
};
const Xr = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], zt = Qe("chevron-down", Xr);
const Jr = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Jn = Qe("chevron-left", Jr);
const Vr = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Vn = Qe("chevron-right", Vr);
const eo = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], to = Qe("circle-question-mark", eo);
const no = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ro = Qe("plus", no);
const oo = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], ao = Qe("search", oo);
const so = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], io = Qe("trash-2", so);
const co = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], lo = Qe("triangle-alert", co);
const uo = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], fo = Qe("x", uo), er = 6048e5, ho = 864e5, tr = 6e4, nr = 36e5, vn = Symbol.for("constructDateFrom");
function be(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && vn in e ? e[vn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ie(e, t) {
  return be(t || e, e);
}
function pe(e, t, n) {
  const r = ie(e, n?.in);
  return isNaN(t) ? be(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function qe(e, t, n) {
  const r = ie(e, n?.in);
  if (isNaN(t)) return be(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = be(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const i = a.getDate();
  return o >= i ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let mo = {};
function $t() {
  return mo;
}
function xe(e, t) {
  const n = $t(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ie(e, t?.in), a = o.getDay(), i = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
}
function Yt(e, t) {
  return xe(e, { ...t, weekStartsOn: 1 });
}
function rr(e, t) {
  const n = ie(e, t?.in), r = n.getFullYear(), o = be(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = Yt(o), i = be(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const s = Yt(i);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
function kn(e) {
  const t = ie(e), n = new Date(
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
  const n = ie(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function hn(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  ), a = Ft(r), i = Ft(o), s = +a - kn(a), d = +i - kn(i);
  return Math.round((s - d) / ho);
}
function go(e, t) {
  const n = rr(e, t), r = be(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Yt(r);
}
function or(e, t, n) {
  return qe(e, t * 3, n);
}
function ar(e, t, n) {
  return pe(e, t * 7, n);
}
function po(e, t, n) {
  return qe(e, t * 12, n);
}
function yo(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = ie(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function xo(e, t) {
  let n, r = t?.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = ie(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function Zt(e, t) {
  const n = +ie(e) - +ie(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Do(e, t, n) {
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
function bo(e) {
  return !(!sr(e) && typeof e != "number" || isNaN(+ie(e)));
}
function ir(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
  return a * 12 + i;
}
function ut(e, t) {
  const n = ie(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function mn(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  ), a = Mn(r, o), i = Math.abs(
    hn(r, o)
  );
  r.setDate(r.getDate() - a * i);
  const s = +(Mn(r, o) === -a), d = a * (i - s);
  return d === 0 ? 0 : d;
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
function wo(e, t) {
  const n = ie(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function pt(e, t) {
  const n = ie(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function vo(e, t) {
  const n = ie(e, t?.in);
  return +wo(n, t) == +pt(n, t);
}
function gn(e, t, n) {
  const [r, o, a] = Xe(
    n?.in,
    e,
    e,
    t
  ), i = Zt(o, a), s = Math.abs(
    ir(o, a)
  );
  if (s < 1) return 0;
  o.getMonth() === 1 && o.getDate() > 27 && o.setDate(30), o.setMonth(o.getMonth() - i * s);
  let d = Zt(o, a) === -i;
  vo(r) && s === 1 && Zt(r, a) === 1 && (d = !1);
  const c = i * (s - +d);
  return c === 0 ? 0 : c;
}
function dr(e, t, n) {
  const r = gn(e, t, n) / 3;
  return cr(n?.roundingMethod)(r);
}
function ko(e, t, n) {
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
  const a = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0);
  let s = 1;
  const d = [];
  for (; +i <= a; )
    d.push(be(n, i)), i.setDate(i.getDate() + s), i.setHours(0, 0, 0, 0);
  return o ? d.reverse() : d;
}
function Mo(e, t) {
  const { start: n, end: r } = pn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let s = 1;
  const d = [];
  for (; +i <= a; )
    d.push(be(n, i)), i.setMonth(i.getMonth() + s);
  return o ? d.reverse() : d;
}
function cn(e, t) {
  const n = ie(e, t?.in), r = n.getMonth(), o = r - r % 3;
  return n.setMonth(o, 1), n.setHours(0, 0, 0, 0), n;
}
function Te(e, t) {
  const n = ie(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function No(e, t) {
  const n = ie(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function yn(e, t) {
  const n = ie(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function So(e, t) {
  const { start: n, end: r } = pn(t?.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, i = o ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let s = 1;
  const d = [];
  for (; +i <= a; )
    d.push(be(n, i)), i.setFullYear(i.getFullYear() + s);
  return o ? d.reverse() : d;
}
function ur(e, t) {
  const n = $t(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, o = ie(e, t?.in), a = o.getDay(), i = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
}
function Co(e, t) {
  return ur(e, { ...t, weekStartsOn: 1 });
}
function Nn(e, t) {
  const n = ie(e, t?.in), r = n.getMonth(), o = r - r % 3 + 3;
  return n.setMonth(o, 0), n.setHours(23, 59, 59, 999), n;
}
const To = {
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
}, Oo = (e, t, n) => {
  let r;
  const o = To[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Qt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Wo = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, _o = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Yo = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Fo = {
  date: Qt({
    formats: Wo,
    defaultWidth: "full"
  }),
  time: Qt({
    formats: _o,
    defaultWidth: "full"
  }),
  dateTime: Qt({
    formats: Yo,
    defaultWidth: "full"
  })
}, Eo = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, $o = (e, t, n, r) => Eo[e];
function Tt(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth, s = n?.width ? String(n.width) : i;
      o = e.formattingValues[s] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth, s = n?.width ? String(n.width) : e.defaultWidth;
      o = e.values[s] || e.values[i];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const Io = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Bo = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Uo = {
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
}, Po = {
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
}, Ho = {
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
}, Ao = {
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
}, jo = (e, t) => {
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
}, Ro = {
  ordinalNumber: jo,
  era: Tt({
    values: Io,
    defaultWidth: "wide"
  }),
  quarter: Tt({
    values: Bo,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Tt({
    values: Uo,
    defaultWidth: "wide"
  }),
  day: Tt({
    values: Po,
    defaultWidth: "wide"
  }),
  dayPeriod: Tt({
    values: Ho,
    defaultWidth: "wide",
    formattingValues: Ao,
    defaultFormattingWidth: "wide"
  })
};
function Ot(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const i = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], d = Array.isArray(s) ? qo(s, (f) => f.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      Lo(s, (f) => f.test(i))
    );
    let c;
    c = e.valueCallback ? e.valueCallback(d) : d, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const m = t.slice(i.length);
    return { value: c, rest: m };
  };
}
function Lo(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function qo(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function zo(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let i = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const s = t.slice(o.length);
    return { value: i, rest: s };
  };
}
const Zo = /^(\d+)(th|st|nd|rd)?/i, Qo = /\d+/i, Go = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ko = {
  any: [/^b/i, /^(a|c)/i]
}, Xo = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Jo = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Vo = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ea = {
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
}, ta = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, na = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, ra = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, oa = {
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
}, aa = {
  ordinalNumber: zo({
    matchPattern: Zo,
    parsePattern: Qo,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ot({
    matchPatterns: Go,
    defaultMatchWidth: "wide",
    parsePatterns: Ko,
    defaultParseWidth: "any"
  }),
  quarter: Ot({
    matchPatterns: Xo,
    defaultMatchWidth: "wide",
    parsePatterns: Jo,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ot({
    matchPatterns: Vo,
    defaultMatchWidth: "wide",
    parsePatterns: ea,
    defaultParseWidth: "any"
  }),
  day: Ot({
    matchPatterns: ta,
    defaultMatchWidth: "wide",
    parsePatterns: na,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ot({
    matchPatterns: ra,
    defaultMatchWidth: "any",
    parsePatterns: oa,
    defaultParseWidth: "any"
  })
}, xn = {
  code: "en-US",
  formatDistance: Oo,
  formatLong: Fo,
  formatRelative: $o,
  localize: Ro,
  match: aa,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function sa(e, t) {
  const n = ie(e, t?.in);
  return hn(n, yn(n)) + 1;
}
function fr(e, t) {
  const n = ie(e, t?.in), r = +Yt(n) - +go(n);
  return Math.round(r / er) + 1;
}
function hr(e, t) {
  const n = ie(e, t?.in), r = n.getFullYear(), o = $t(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? o.firstWeekContainsDate ?? o.locale?.options?.firstWeekContainsDate ?? 1, i = be(t?.in || e, 0);
  i.setFullYear(r + 1, 0, a), i.setHours(0, 0, 0, 0);
  const s = xe(i, t), d = be(t?.in || e, 0);
  d.setFullYear(r, 0, a), d.setHours(0, 0, 0, 0);
  const c = xe(d, t);
  return +n >= +s ? r + 1 : +n >= +c ? r : r - 1;
}
function ia(e, t) {
  const n = $t(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, o = hr(e, t), a = be(t?.in || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), xe(a, t);
}
function mr(e, t) {
  const n = ie(e, t?.in), r = +xe(n, t) - +ia(n, t);
  return Math.round(r / er) + 1;
}
function he(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ke = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return he(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : he(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return he(e.getDate(), t.length);
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
    return he(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return he(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return he(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return he(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return he(o, t.length);
  }
}, ft = {
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
      const i = a % 100;
      return he(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : he(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = rr(e);
    return he(n, t.length);
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
    return he(n, t.length);
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
        return he(r, 2);
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
        return he(r, 2);
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
        return he(r + 1, 2);
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
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : he(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = fr(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : he(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ke.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = sa(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : he(r, t.length);
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
        return he(a, 2);
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
        return he(a, t.length);
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
        return he(o, t.length);
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
    switch (r === 12 ? o = ft.noon : r === 0 ? o = ft.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = ft.evening : r >= 12 ? o = ft.afternoon : r >= 4 ? o = ft.morning : o = ft.night, t) {
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
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : he(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : he(r, t.length);
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
        return nt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return nt(r, ":");
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
        return nt(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return nt(r, ":");
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
        return "GMT" + nt(r, ":");
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
        return "GMT" + nt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return he(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return he(+e, t.length);
  }
};
function Cn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + he(a, 2);
}
function Tn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + he(Math.abs(e) / 60, 2) : nt(e, t);
}
function nt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = he(Math.trunc(r / 60), 2), a = he(r % 60, 2);
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
}, ca = (e, t) => {
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
}, da = {
  p: gr,
  P: ca
}, la = /^D+$/, ua = /^Y+$/, fa = ["D", "DD", "YY", "YYYY"];
function ha(e) {
  return la.test(e);
}
function ma(e) {
  return ua.test(e);
}
function ga(e, t, n) {
  const r = pa(e, t, n);
  if (console.warn(r), fa.includes(e)) throw new RangeError(r);
}
function pa(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const ya = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, xa = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Da = /^'([^]*?)'?$/, ba = /''/g, wa = /[a-zA-Z]/;
function va(e, t, n) {
  const r = $t(), o = n?.locale ?? r.locale ?? xn, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = ie(e, n?.in);
  if (!bo(s))
    throw new RangeError("Invalid time value");
  let d = t.match(xa).map((m) => {
    const f = m[0];
    if (f === "p" || f === "P") {
      const D = da[f];
      return D(m, o.formatLong);
    }
    return m;
  }).join("").match(ya).map((m) => {
    if (m === "''")
      return { isToken: !1, value: "'" };
    const f = m[0];
    if (f === "'")
      return { isToken: !1, value: ka(m) };
    if (Sn[f])
      return { isToken: !0, value: m };
    if (f.match(wa))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + f + "`"
      );
    return { isToken: !1, value: m };
  });
  o.localize.preprocessor && (d = o.localize.preprocessor(s, d));
  const c = {
    firstWeekContainsDate: a,
    weekStartsOn: i,
    locale: o
  };
  return d.map((m) => {
    if (!m.isToken) return m.value;
    const f = m.value;
    (!n?.useAdditionalWeekYearTokens && ma(f) || !n?.useAdditionalDayOfYearTokens && ha(f)) && ga(f, t, String(e));
    const D = Sn[f[0]];
    return D(s, f, o.localize, c);
  }).join("");
}
function ka(e) {
  const t = e.match(Da);
  return t ? t[1].replace(ba, "'") : e;
}
function Ma(e, t) {
  const n = ie(e, t?.in), r = n.getFullYear(), o = n.getMonth(), a = be(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function rt(e, t) {
  return ie(e, t?.in).getMonth();
}
function De(e, t) {
  return ie(e, t?.in).getFullYear();
}
function Na(e, t) {
  return +ie(e) > +ie(t);
}
function Sa(e, t) {
  return +ie(e) < +ie(t);
}
function Ca(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Ta(e, t, n) {
  const [r, o] = Xe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Oa(e, t) {
  const n = () => be(t?.in, NaN), o = Fa(e);
  let a;
  if (o.date) {
    const c = Ea(o.date, 2);
    a = $a(c.restDateString, c.year);
  }
  if (!a || isNaN(+a)) return n();
  const i = +a;
  let s = 0, d;
  if (o.time && (s = Ia(o.time), isNaN(s)))
    return n();
  if (o.timezone) {
    if (d = Ba(o.timezone), isNaN(d)) return n();
  } else {
    const c = new Date(i + s), m = ie(0, t?.in);
    return m.setFullYear(
      c.getUTCFullYear(),
      c.getUTCMonth(),
      c.getUTCDate()
    ), m.setHours(
      c.getUTCHours(),
      c.getUTCMinutes(),
      c.getUTCSeconds(),
      c.getUTCMilliseconds()
    ), m;
  }
  return ie(i + s + d, t?.in);
}
const Pt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Wa = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, _a = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Ya = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Fa(e) {
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
function Ea(e, t) {
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
function $a(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(Wa);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], o = Wt(n[1]), a = Wt(n[2]) - 1, i = Wt(n[3]), s = Wt(n[4]), d = Wt(n[5]) - 1;
  if (r)
    return ja(t, s, d) ? Ua(t, s, d) : /* @__PURE__ */ new Date(NaN);
  {
    const c = /* @__PURE__ */ new Date(0);
    return !Ha(t, a, i) || !Aa(t, o) ? /* @__PURE__ */ new Date(NaN) : (c.setUTCFullYear(t, a, Math.max(o, i)), c);
  }
}
function Wt(e) {
  return e ? parseInt(e) : 1;
}
function Ia(e) {
  const t = e.match(_a);
  if (!t) return NaN;
  const n = Gt(t[1]), r = Gt(t[2]), o = Gt(t[3]);
  return Ra(n, r, o) ? n * nr + r * tr + o * 1e3 : NaN;
}
function Gt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Ba(e) {
  if (e === "Z") return 0;
  const t = e.match(Ya);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), o = t[3] && parseInt(t[3]) || 0;
  return La(r, o) ? n * (r * nr + o * tr) : NaN;
}
function Ua(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const o = r.getUTCDay() || 7, a = (t - 1) * 7 + n + 1 - o;
  return r.setUTCDate(r.getUTCDate() + a), r;
}
const Pa = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function pr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Ha(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (Pa[t] || (pr(e) ? 29 : 28));
}
function Aa(e, t) {
  return t >= 1 && t <= (pr(e) ? 366 : 365);
}
function ja(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function Ra(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function La(e, t) {
  return t >= 0 && t <= 59;
}
function Et(e, t, n) {
  const r = ie(e, n?.in), o = r.getFullYear(), a = r.getDate(), i = be(e, 0);
  i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
  const s = Ma(i);
  return r.setMonth(t, Math.min(a, s)), r;
}
function Kt(e, t, n) {
  const r = ie(e, n?.in), o = Math.trunc(r.getMonth() / 3) + 1, a = t - o;
  return Et(r, r.getMonth() + a * 3);
}
function at(e, t, n) {
  const r = ie(e, n?.in);
  return isNaN(+r) ? be(e, NaN) : (r.setFullYear(t), r);
}
function qa(e, t) {
  const n = Ka(t);
  return "formatToParts" in n ? Za(n, e) : Qa(n, e);
}
const za = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Za(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let o = 0; o < n.length; o++) {
      const a = za[n[o].type];
      a !== void 0 && (r[a] = parseInt(n[o].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function Qa(e, t) {
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
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), Ga = Wn === "06/25/2014, 00:00:00" || Wn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function Ka(e) {
  return Xt[e] || (Xt[e] = Ga ? new Intl.DateTimeFormat("en-US", {
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
function yr(e, t, n, r, o, a, i) {
  const s = /* @__PURE__ */ new Date(0);
  return s.setUTCFullYear(e, t, n), s.setUTCHours(r, o, a, i), s;
}
const _n = 36e5, Xa = 6e4, Jt = {
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
    const i = parseInt(r[3], 10);
    return Yn(o, i) ? (a = Math.abs(o) * _n + i * Xa, r[1] === "+" ? -a : a) : NaN;
  }
  if (es(e)) {
    t = new Date(t || Date.now());
    const i = n ? t : Ja(t), s = dn(i, e);
    return -(n ? s : Va(t, s, e));
  }
  return NaN;
}
function Ja(e) {
  return yr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function dn(e, t) {
  const n = qa(e, t), r = yr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let o = e.getTime();
  const a = o % 1e3;
  return o -= a >= 0 ? a : 1e3 + a, r - o;
}
function Va(e, t, n) {
  let o = e.getTime() - t;
  const a = dn(new Date(o), n);
  if (t === a)
    return t;
  o -= a - t;
  const i = dn(new Date(o), n);
  return a === i ? a : Math.max(a, i);
}
function Yn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Fn = {};
function es(e) {
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
const ts = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Vt = 36e5, $n = 6e4, ns = 2, Oe = {
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
  timeZone: ts
};
function rs(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? ns : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = os(e), { year: o, restDateString: a } = as(r.date, n), i = ss(a, o);
  if (i === null || isNaN(i.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (i) {
    const s = i.getTime();
    let d = 0, c;
    if (r.time && (d = is(r.time), d === null || isNaN(d)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (c = xr(r.timeZone || t.timeZone, new Date(s + d)), isNaN(c))
        return /* @__PURE__ */ new Date(NaN);
    } else
      c = En(new Date(s + d)), c = En(new Date(s + d + c));
    return new Date(s + d + c);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function os(e) {
  const t = {};
  let n = Oe.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = Oe.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const o = Oe.timeZone.exec(r);
    o ? (t.time = r.replace(o[1], ""), t.timeZone = o[1].trim()) : t.time = r;
  }
  return t;
}
function as(e, t) {
  if (e) {
    const n = Oe.YYY[t], r = Oe.YYYYY[t];
    let o = Oe.YYYY.exec(e) || r.exec(e);
    if (o) {
      const a = o[1];
      return {
        year: parseInt(a, 10),
        restDateString: e.slice(a.length)
      };
    }
    if (o = Oe.YY.exec(e) || n.exec(e), o) {
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
function ss(e, t) {
  if (t === null)
    return null;
  let n, r, o;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let a = Oe.MM.exec(e);
  if (a)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1, Bn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (a = Oe.DDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0);
    const i = parseInt(a[1], 10);
    return ls(t, i) ? (n.setUTCFullYear(t, 0, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Oe.MMDD.exec(e), a) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(a[1], 10) - 1;
    const i = parseInt(a[2], 10);
    return Bn(t, r, i) ? (n.setUTCFullYear(t, r, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Oe.Www.exec(e), a)
    return o = parseInt(a[1], 10) - 1, Un(o) ? In(t, o) : /* @__PURE__ */ new Date(NaN);
  if (a = Oe.WwwD.exec(e), a) {
    o = parseInt(a[1], 10) - 1;
    const i = parseInt(a[2], 10) - 1;
    return Un(o, i) ? In(t, o, i) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function is(e) {
  let t, n, r = Oe.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), en(t) ? t % 24 * Vt : NaN;
  if (r = Oe.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), en(t, n) ? t % 24 * Vt + n * $n : NaN;
  if (r = Oe.HHMMSS.exec(e), r) {
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
const cs = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ds = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
    if (r && n > ds[t] || !r && n > cs[t])
      return !1;
  }
  return !0;
}
function ls(e, t) {
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
function us(e, t, n) {
  e = rs(e, n);
  const r = xr(t, e, !0), o = new Date(e.getTime() - r), a = /* @__PURE__ */ new Date(0);
  return a.setFullYear(o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()), a.setHours(o.getUTCHours(), o.getUTCMinutes(), o.getUTCSeconds(), o.getUTCMilliseconds()), a;
}
const ve = 0, Sc = !1, ln = !0, Cc = "firstFullWeek", fs = "UTC";
function z(e) {
  const t = Oa(`${e}T00:00:00.000Z`);
  return us(t, fs);
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
  const r = z(e);
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
function hs(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = z(e), a = 0;
    for (r.includes(o.getDay()) || (a = 1); a < n; )
      o = pe(o, 1), r.includes(o.getDay()) || a++;
    return de(o);
  } else {
    if (t === "week" || t === "month" || t === "quarter") {
      const o = un(e, t, n);
      return de(pe(z(o), -1));
    }
    return un(e, t, n - 1);
  }
}
function ms(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let o = z(e), a = 0;
    for (r.includes(o.getDay()) || (a = 1); a < n; )
      o = pe(o, -1), r.includes(o.getDay()) || a++;
    return de(o);
  } else {
    if (t === "week" || t === "month" || t === "quarter") {
      const i = un(e, t, -n);
      return de(pe(z(i), 1));
    }
    const o = z(e);
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
  const o = z(e), a = z(t);
  if (o > a) return 0;
  if (n === "day" && r.length > 0)
    return lr({ start: o, end: a }).filter(
      (d) => !r.includes(d.getDay())
    ).length;
  switch (n) {
    case "day":
      return mn(a, o) + 1;
    case "week":
      return ko(a, o) + 1;
    case "month":
      return gn(a, o) + 1;
    case "quarter":
      return dr(a, o) + 1;
    default:
      return 1;
  }
}
function gs(e, t, n) {
  const r = z(e), o = z(t);
  if (r > o) return [];
  const a = lr({ start: r, end: o });
  return n.length === 0 ? a.map(de) : a.filter((i) => !n.includes(i.getDay())).map(de);
}
function wr(e, t, n = "day", r = [], o, a, i, s, d) {
  const c = br(
    e,
    t,
    n,
    r
  ), m = gs(
    e,
    t,
    r
  ), f = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: c,
    excludedWeekdays: r,
    includedDatesUtc: m
  };
  return o !== void 0 && (f.excludeEnabled = o), a && (f.excludeFilterTypes = a), i && (f.excludedSpecificDates = i), s && (f.excludedSavedDates = s), d && (f.excludedDateRanges = d), f;
}
function Tc(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function Oc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, o] = t, a = parseInt(r, 10), i = parseInt(n, 10), s = parseInt(o, 10);
  if (isNaN(a) || isNaN(i) || isNaN(s) || a < 1 || a > 12 || i < 1 || i > 31 || s < 1900 || s > 2100)
    return null;
  const d = a.toString().padStart(2, "0"), c = i.toString().padStart(2, "0");
  return `${s}-${d}-${c}`;
}
function ps(e) {
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
  const n = /* @__PURE__ */ new Date(e + "T00:00:00"), r = /* @__PURE__ */ new Date(t + "T00:00:00"), o = n.getMonth(), a = r.getMonth(), i = n.getFullYear(), s = r.getFullYear(), d = n.getDate(), c = r.getDate();
  if (e === t)
    return n.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  if (o === a && i === s)
    return `${n.toLocaleDateString("en-US", { month: "short" })} ${d}-${c}, ${i}`;
  if (i === s) {
    const D = n.toLocaleDateString("en-US", {
      month: "short"
    }), _ = r.toLocaleDateString("en-US", { month: "short" });
    return `${D} ${d} - ${_} ${c}, ${i}`;
  }
  const m = n.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }), f = r.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return `${m} - ${f}`;
}
function ys() {
  const e = jt(), t = z(e);
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
          weekStartsOn: ve
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
        const n = Te(t);
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
const xs = "DateRangePickerDB", Ds = 1, He = "savedDateRanges";
class bs {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(xs, Ds);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (o) => {
          const a = o.target.result;
          a.objectStoreNames.contains(He) || a.createObjectStore(He, {
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
      const s = this.db.transaction([He], "readwrite").objectStore(He).put({
        id: t,
        data: n,
        timestamp: Date.now()
      });
      s.onerror = () => o(s.error), s.onsuccess = () => r();
    });
  }
  /**
   * Get data from IndexedDB
   */
  async getData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const i = this.db.transaction([He], "readonly").objectStore(He).get(t);
      i.onerror = () => r(i.error), i.onsuccess = () => {
        const s = i.result;
        s && s.data ? n(s.data) : n(null);
      };
    });
  }
  /**
   * Delete data from IndexedDB
   */
  async deleteData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const i = this.db.transaction([He], "readwrite").objectStore(He).delete(t);
      i.onerror = () => r(i.error), i.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const a = this.db.transaction([He], "readwrite").objectStore(He).clear();
      a.onerror = () => n(a.error), a.onsuccess = () => t();
    });
  }
}
const gt = new bs(), tn = "savedDateRanges";
function ws({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r = {},
  disabled: o = !1
}) {
  const [a, i] = ne([]), [s, d] = ne(!1), [c, m] = ne(""), [f, D] = ne(!1);
  Me(() => {
    (async () => {
      await gt.init();
      const l = await gt.getData(
        tn
      );
      l && i(l);
    })();
  }, []);
  const _ = ys(), I = (p) => {
    if (o) return;
    const { startDateUtc: l, endDateUtc: v } = p();
    e(l, v);
  }, P = async () => {
    if (o) return;
    if (c.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const p = {
      id: `saved-${Date.now()}`,
      label: c.trim(),
      selection: n,
      createdAt: Date.now()
    }, l = [...a, p];
    i(l), await gt.saveData(tn, l), m(""), d(!1);
  }, W = async (p) => {
    if (o) return;
    const l = a.filter((v) => v.id !== p);
    i(l), await gt.saveData(tn, l);
  }, O = (p) => {
    o || (t ? t(p.selection) : e(p.selection.startDateUtc, p.selection.endDateUtc));
  }, B = (p, l) => {
    const v = (T) => (/* @__PURE__ */ new Date(T + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return p === l ? v(p) : `${v(p)} - ${v(l)}`;
  }, w = (p) => {
    if (n.startDateUtc !== p.startDateUtc || n.endDateUtc !== p.endDateUtc)
      return !1;
    const l = (E = [], C = []) => {
      if (E.length !== C.length) return !1;
      const Z = new Set(E);
      return C.every((le) => Z.has(le));
    };
    if (!l(
      n.excludedWeekdays,
      p.excludedWeekdays
    ) || !l(
      n.excludedSpecificDates,
      p.excludedSpecificDates
    ) || !l(
      n.excludedSavedDates,
      p.excludedSavedDates
    ))
      return !1;
    const v = n.excludedDateRanges || [], T = p.excludedDateRanges || [];
    if (v.length !== T.length) return !1;
    const Y = (E) => `${E.start}|${E.end}`, q = new Set(v.map(Y));
    return T.every((E) => q.has(Y(E)));
  };
  return /* @__PURE__ */ H(
    "div",
    {
      className: `w-44 flex-shrink-0 border-r border-gray-200 flex flex-col overflow-hidden ${o ? "opacity-60" : ""}`,
      children: [
        /* @__PURE__ */ h("div", { className: "mb-1 mt-4 px-3 flex-shrink-0", children: /* @__PURE__ */ h("div", { className: "flex flex-col", children: Object.values(_).map((p) => {
          const { startDateUtc: l, endDateUtc: v } = p.getValue(), T = n.startDateUtc === l && n.endDateUtc === v;
          return /* @__PURE__ */ H(
            "button",
            {
              onClick: () => I(p.getValue),
              disabled: o,
              "aria-disabled": o,
              className: `w-full text-left px-1 rounded-md transition-all mb-3 ${o ? "cursor-not-allowed text-gray-400" : ""}`,
              children: [
                /* @__PURE__ */ h(
                  "div",
                  {
                    className: `text-xs font-semibold ${o ? "text-gray-400" : T ? "text-[#0955ed]" : "text-[#1F1F1F]"}`,
                    children: p.label
                  }
                ),
                /* @__PURE__ */ h(
                  "div",
                  {
                    className: `text-[10px] leading-relaxed font-medium
 mt-0.5 ${o ? "text-gray-400" : T ? "text-[#0955ed]" : "text-[#61708F]"}`,
                    children: B(l, v)
                  }
                )
              ]
            },
            p.label
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
                    o || D(!f);
                  },
                  disabled: o,
                  className: `text-gray-400 ${o ? "cursor-not-allowed opacity-50" : "hover:text-gray-600"}`,
                  children: /* @__PURE__ */ h(to, { className: "w-3 h-3" })
                }
              )
            ] }),
            f && /* @__PURE__ */ h("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
            a.length === 0 ? /* @__PURE__ */ h("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ h("div", { className: "space-y-3 mb-3 overflow-y-auto flex-1 min-h-0", children: a.map((p) => {
              const l = w(p.selection);
              return /* @__PURE__ */ H(
                "div",
                {
                  className: "group rounded-md hover:shadow-sm transition-all",
                  children: [
                    /* @__PURE__ */ H("div", { className: "flex items-start justify-between px-1", children: [
                      /* @__PURE__ */ h(
                        "button",
                        {
                          onClick: () => O(p),
                          disabled: o,
                          className: `flex-1 text-left ${o ? "cursor-not-allowed opacity-60" : ""}`,
                          children: /* @__PURE__ */ h(
                            "div",
                            {
                              className: `text-xs font-semibold mb-1 ${o ? "text-gray-400" : l ? "text-[#0955ed]" : "text-gray-900"}`,
                              children: p.label
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ h(
                        "button",
                        {
                          onClick: () => W(p.id),
                          disabled: o,
                          className: `${o ? "opacity-40 cursor-not-allowed" : "opacity-0 group-hover:opacity-100"} text-red-500 hover:text-red-700 transition-opacity ml-2`,
                          children: /* @__PURE__ */ h(io, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ h(
                      "div",
                      {
                        className: `text-[10px] leading-relaxed font-medium px-1 ${o ? "text-gray-400" : l ? "text-[#0955ed]" : "text-[#61708F]"}`,
                        children: B(
                          p.selection.startDateUtc,
                          p.selection.endDateUtc
                        )
                      }
                    )
                  ]
                },
                p.id
              );
            }) })
          ] }),
          /* @__PURE__ */ h("div", { children: /* @__PURE__ */ H(
            "button",
            {
              onClick: () => {
                o || d(!0);
              },
              disabled: o,
              className: `w-full flex-shrink-0 px-1 py-4 text-[#003DB8] opacity-50 hover:opacity-100 text-xs font-medium rounded-md transition-colors flex items-center justify-center mt-auto ${o ? "cursor-not-allowed" : ""}`,
              children: [
                /* @__PURE__ */ h(ro, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          ) })
        ] }),
        s && /* @__PURE__ */ H(mt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "fixed inset-0 bg-black/30 z-50",
              onClick: () => d(!1)
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
                  value: c,
                  onChange: (p) => m(p.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (p) => {
                    p.key === "Enter" && P();
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
                  (p) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][p]
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
                  onClick: () => d(!1),
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
function vs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var At = { exports: {} }, ks = At.exports, Hn;
function Ms() {
  return Hn || (Hn = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(ks, (function() {
      var n = 1e3, r = 6e4, o = 36e5, a = "millisecond", i = "second", s = "minute", d = "hour", c = "day", m = "week", f = "month", D = "quarter", _ = "year", I = "date", P = "Invalid Date", W = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, O = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, B = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(N) {
        var g = ["th", "st", "nd", "rd"], k = N % 100;
        return "[" + N + (g[(k - 20) % 10] || g[k] || g[0]) + "]";
      } }, w = function(N, g, k) {
        var S = String(N);
        return !S || S.length >= g ? N : "" + Array(g + 1 - S.length).join(k) + N;
      }, p = { s: w, z: function(N) {
        var g = -N.utcOffset(), k = Math.abs(g), S = Math.floor(k / 60), b = k % 60;
        return (g <= 0 ? "+" : "-") + w(S, 2, "0") + ":" + w(b, 2, "0");
      }, m: function N(g, k) {
        if (g.date() < k.date()) return -N(k, g);
        var S = 12 * (k.year() - g.year()) + (k.month() - g.month()), b = g.clone().add(S, f), $ = k - b < 0, M = g.clone().add(S + ($ ? -1 : 1), f);
        return +(-(S + (k - b) / ($ ? b - M : M - b)) || 0);
      }, a: function(N) {
        return N < 0 ? Math.ceil(N) || 0 : Math.floor(N);
      }, p: function(N) {
        return { M: f, y: _, w: m, d: c, D: I, h: d, m: s, s: i, ms: a, Q: D }[N] || String(N || "").toLowerCase().replace(/s$/, "");
      }, u: function(N) {
        return N === void 0;
      } }, l = "en", v = {};
      v[l] = B;
      var T = "$isDayjsObject", Y = function(N) {
        return N instanceof Z || !(!N || !N[T]);
      }, q = function N(g, k, S) {
        var b;
        if (!g) return l;
        if (typeof g == "string") {
          var $ = g.toLowerCase();
          v[$] && (b = $), k && (v[$] = k, b = $);
          var M = g.split("-");
          if (!b && M.length > 1) return N(M[0]);
        } else {
          var R = g.name;
          v[R] = g, b = R;
        }
        return !S && b && (l = b), b || !S && l;
      }, E = function(N, g) {
        if (Y(N)) return N.clone();
        var k = typeof g == "object" ? g : {};
        return k.date = N, k.args = arguments, new Z(k);
      }, C = p;
      C.l = q, C.i = Y, C.w = function(N, g) {
        return E(N, { locale: g.$L, utc: g.$u, x: g.$x, $offset: g.$offset });
      };
      var Z = (function() {
        function N(k) {
          this.$L = q(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[T] = !0;
        }
        var g = N.prototype;
        return g.parse = function(k) {
          this.$d = (function(S) {
            var b = S.date, $ = S.utc;
            if (b === null) return /* @__PURE__ */ new Date(NaN);
            if (C.u(b)) return /* @__PURE__ */ new Date();
            if (b instanceof Date) return new Date(b);
            if (typeof b == "string" && !/Z$/i.test(b)) {
              var M = b.match(W);
              if (M) {
                var R = M[2] - 1 || 0, G = (M[7] || "0").substring(0, 3);
                return $ ? new Date(Date.UTC(M[1], R, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, G)) : new Date(M[1], R, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, G);
              }
            }
            return new Date(b);
          })(k), this.init();
        }, g.init = function() {
          var k = this.$d;
          this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds();
        }, g.$utils = function() {
          return C;
        }, g.isValid = function() {
          return this.$d.toString() !== P;
        }, g.isSame = function(k, S) {
          var b = E(k);
          return this.startOf(S) <= b && b <= this.endOf(S);
        }, g.isAfter = function(k, S) {
          return E(k) < this.startOf(S);
        }, g.isBefore = function(k, S) {
          return this.endOf(S) < E(k);
        }, g.$g = function(k, S, b) {
          return C.u(k) ? this[S] : this.set(b, k);
        }, g.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, g.valueOf = function() {
          return this.$d.getTime();
        }, g.startOf = function(k, S) {
          var b = this, $ = !!C.u(S) || S, M = C.p(k), R = function(ae, Q) {
            var ce = C.w(b.$u ? Date.UTC(b.$y, Q, ae) : new Date(b.$y, Q, ae), b);
            return $ ? ce : ce.endOf(c);
          }, G = function(ae, Q) {
            return C.w(b.toDate()[ae].apply(b.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Q)), b);
          }, oe = this.$W, ee = this.$M, x = this.$D, j = "set" + (this.$u ? "UTC" : "");
          switch (M) {
            case _:
              return $ ? R(1, 0) : R(31, 11);
            case f:
              return $ ? R(1, ee) : R(0, ee + 1);
            case m:
              var K = this.$locale().weekStart || 0, re = (oe < K ? oe + 7 : oe) - K;
              return R($ ? x - re : x + (6 - re), ee);
            case c:
            case I:
              return G(j + "Hours", 0);
            case d:
              return G(j + "Minutes", 1);
            case s:
              return G(j + "Seconds", 2);
            case i:
              return G(j + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, g.endOf = function(k) {
          return this.startOf(k, !1);
        }, g.$set = function(k, S) {
          var b, $ = C.p(k), M = "set" + (this.$u ? "UTC" : ""), R = (b = {}, b[c] = M + "Date", b[I] = M + "Date", b[f] = M + "Month", b[_] = M + "FullYear", b[d] = M + "Hours", b[s] = M + "Minutes", b[i] = M + "Seconds", b[a] = M + "Milliseconds", b)[$], G = $ === c ? this.$D + (S - this.$W) : S;
          if ($ === f || $ === _) {
            var oe = this.clone().set(I, 1);
            oe.$d[R](G), oe.init(), this.$d = oe.set(I, Math.min(this.$D, oe.daysInMonth())).$d;
          } else R && this.$d[R](G);
          return this.init(), this;
        }, g.set = function(k, S) {
          return this.clone().$set(k, S);
        }, g.get = function(k) {
          return this[C.p(k)]();
        }, g.add = function(k, S) {
          var b, $ = this;
          k = Number(k);
          var M = C.p(S), R = function(ee) {
            var x = E($);
            return C.w(x.date(x.date() + Math.round(ee * k)), $);
          };
          if (M === f) return this.set(f, this.$M + k);
          if (M === _) return this.set(_, this.$y + k);
          if (M === c) return R(1);
          if (M === m) return R(7);
          var G = (b = {}, b[s] = r, b[d] = o, b[i] = n, b)[M] || 1, oe = this.$d.getTime() + k * G;
          return C.w(oe, this);
        }, g.subtract = function(k, S) {
          return this.add(-1 * k, S);
        }, g.format = function(k) {
          var S = this, b = this.$locale();
          if (!this.isValid()) return b.invalidDate || P;
          var $ = k || "YYYY-MM-DDTHH:mm:ssZ", M = C.z(this), R = this.$H, G = this.$m, oe = this.$M, ee = b.weekdays, x = b.months, j = b.meridiem, K = function(Q, ce, fe, Ne) {
            return Q && (Q[ce] || Q(S, $)) || fe[ce].slice(0, Ne);
          }, re = function(Q) {
            return C.s(R % 12 || 12, Q, "0");
          }, ae = j || function(Q, ce, fe) {
            var Ne = Q < 12 ? "AM" : "PM";
            return fe ? Ne.toLowerCase() : Ne;
          };
          return $.replace(O, (function(Q, ce) {
            return ce || (function(fe) {
              switch (fe) {
                case "YY":
                  return String(S.$y).slice(-2);
                case "YYYY":
                  return C.s(S.$y, 4, "0");
                case "M":
                  return oe + 1;
                case "MM":
                  return C.s(oe + 1, 2, "0");
                case "MMM":
                  return K(b.monthsShort, oe, x, 3);
                case "MMMM":
                  return K(x, oe);
                case "D":
                  return S.$D;
                case "DD":
                  return C.s(S.$D, 2, "0");
                case "d":
                  return String(S.$W);
                case "dd":
                  return K(b.weekdaysMin, S.$W, ee, 2);
                case "ddd":
                  return K(b.weekdaysShort, S.$W, ee, 3);
                case "dddd":
                  return ee[S.$W];
                case "H":
                  return String(R);
                case "HH":
                  return C.s(R, 2, "0");
                case "h":
                  return re(1);
                case "hh":
                  return re(2);
                case "a":
                  return ae(R, G, !0);
                case "A":
                  return ae(R, G, !1);
                case "m":
                  return String(G);
                case "mm":
                  return C.s(G, 2, "0");
                case "s":
                  return String(S.$s);
                case "ss":
                  return C.s(S.$s, 2, "0");
                case "SSS":
                  return C.s(S.$ms, 3, "0");
                case "Z":
                  return M;
              }
              return null;
            })(Q) || M.replace(":", "");
          }));
        }, g.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, g.diff = function(k, S, b) {
          var $, M = this, R = C.p(S), G = E(k), oe = (G.utcOffset() - this.utcOffset()) * r, ee = this - G, x = function() {
            return C.m(M, G);
          };
          switch (R) {
            case _:
              $ = x() / 12;
              break;
            case f:
              $ = x();
              break;
            case D:
              $ = x() / 3;
              break;
            case m:
              $ = (ee - oe) / 6048e5;
              break;
            case c:
              $ = (ee - oe) / 864e5;
              break;
            case d:
              $ = ee / o;
              break;
            case s:
              $ = ee / r;
              break;
            case i:
              $ = ee / n;
              break;
            default:
              $ = ee;
          }
          return b ? $ : C.a($);
        }, g.daysInMonth = function() {
          return this.endOf(f).$D;
        }, g.$locale = function() {
          return v[this.$L];
        }, g.locale = function(k, S) {
          if (!k) return this.$L;
          var b = this.clone(), $ = q(k, S, !0);
          return $ && (b.$L = $), b;
        }, g.clone = function() {
          return C.w(this.$d, this);
        }, g.toDate = function() {
          return new Date(this.valueOf());
        }, g.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, g.toISOString = function() {
          return this.$d.toISOString();
        }, g.toString = function() {
          return this.$d.toUTCString();
        }, N;
      })(), le = Z.prototype;
      return E.prototype = le, [["$ms", a], ["$s", i], ["$m", s], ["$H", d], ["$W", c], ["$M", f], ["$y", _], ["$D", I]].forEach((function(N) {
        le[N[1]] = function(g) {
          return this.$g(g, N[0], N[1]);
        };
      })), E.extend = function(N, g) {
        return N.$i || (N(g, Z, E), N.$i = !0), E;
      }, E.locale = q, E.isDayjs = Y, E.unix = function(N) {
        return E(1e3 * N);
      }, E.en = v[l], E.Ls = v, E.p = {}, E;
    }));
  })(At)), At.exports;
}
var Ns = Ms();
const Ss = /* @__PURE__ */ vs(Ns), Ht = (e) => {
  if (!e)
    return null;
  const t = Ss(e);
  return t.isValid() ? t : null;
};
function Cs({
  startDateUtc: e,
  endDateUtc: t,
  duration: n,
  unit: r,
  selectedUnit: o,
  excludeEnabled: a,
  activeDateField: i,
  onStartDateChange: s,
  onEndDateChange: d,
  onDurationChange: c,
  onActiveFieldChange: m,
  endFieldError: f,
  setEndFieldError: D,
  startFieldError: _,
  setStartFieldError: I
}) {
  const P = _e(null), [W, O] = ne(0), [B, w] = ne(
    () => Ht(e)
  ), [p, l] = ne(
    () => Ht(t)
  ), v = o || r, Y = v === "week" && r !== "week" || v === "month" && r !== "month" || v === "quarter" && r !== "quarter" ? "" : n;
  Me(() => {
    if (P.current) {
      const g = document.createElement("canvas").getContext("2d");
      if (g) {
        g.font = "14px system-ui, -apple-system, sans-serif";
        const k = Y.toString(), S = g.measureText(k).width;
        O(12 + S + 4);
      }
    }
  }, [Y]);
  const q = (N, g) => ({
    "& .MuiOutlinedInput-root": {
      backgroundColor: a ? "#f3f4f6" : N ? "#ffffff" : "#f9fafb",
      "& fieldset": {
        borderColor: g ? void 0 : N ? "#3b82f6" : void 0
      },
      "&:hover fieldset": {
        borderColor: g ? void 0 : N ? "#2563eb" : void 0
      },
      "&.Mui-focused": {
        backgroundColor: a ? "#f3f4f6" : "#ffffff"
      },
      "&.Mui-focused fieldset": {
        borderColor: g ? void 0 : "#3b82f6",
        boxShadow: g ? void 0 : "0 0 0 2px rgba(59,130,246,0.2)"
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
  Me(() => {
    const N = Ht(e);
    w(N), (!e || N && N.isValid()) && I(!1);
  }, [e]), Me(() => {
    const N = Ht(t);
    l(N), (!t || N && N.isValid()) && D(!1);
  }, [t]);
  const E = (N, g) => {
    w(N), g?.validationError == null && (N ? N.isValid() && s(N.format("YYYY-MM-DD")) : s(""));
  }, C = (N) => {
    I(N != null);
  }, Z = (N, g) => {
    l(N), g?.validationError == null && (N ? N.isValid() && d(N.format("YYYY-MM-DD")) : d(""));
  }, le = (N) => {
    D(N != null);
  };
  return /* @__PURE__ */ h(Lr, { dateAdapter: qr, children: /* @__PURE__ */ H("div", { className: "flex gap-3 pb-2 px-4 border-b border-gray-200", children: [
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
          onChange: E,
          onError: C,
          format: "DD/MM/YYYY",
          disabled: a,
          onFocus: () => m("start"),
          className: "w-full",
          slotProps: {
            textField: {
              size: "small",
              fullWidth: !0,
              variant: "outlined",
              error: _,
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
                ...q(
                  i === "start",
                  _
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
          value: p,
          onChange: Z,
          onError: le,
          format: "DD/MM/YYYY",
          disabled: a,
          onFocus: () => m("end"),
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
                ...q(
                  i === "end",
                  f
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
            value: Y,
            onChange: (N) => c(Number(N.target.value)),
            disabled: a,
            className: `w-[120px] h-[28px] pl-3 pr-10 py-2 text-gray-500 border border-gray-300 rounded-md text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] ${a ? "bg-gray-100" : "bg-[#f9fafb]"}`
          }
        ),
        /* @__PURE__ */ h(
          "span",
          {
            className: `absolute top-1/2 -translate-y-1/2 text-[12px] pointer-events-none ${a ? "text-gray-300" : "text-gray-500"}`,
            style: { left: `${W}px` },
            children: ps(v)
          }
        )
      ] })
    ] })
  ] }) });
}
const Ts = ["day", "week", "month", "quarter"];
function Os({
  unit: e,
  excludeEnabled: t,
  onUnitChange: n
}) {
  return /* @__PURE__ */ h("div", { className: "flex gap-2 mb-2 justify-end border-b border-gray-200 pb-2 pr-4", children: Ts.map((r) => /* @__PURE__ */ h(
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
], Ws = [
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
], _s = "var(--adrp-container-height, min(468px, 85vh))", nn = "var(--adrp-container-width, min(756px, 98vw))";
function Ys({
  excludeEnabled: e,
  excludeFilterTypes: t,
  activeFilterView: n,
  excludedWeekdays: r,
  excludedSavedDates: o,
  excludedSpecificDates: a,
  excludedDateRanges: i,
  savedDatesSearchTerm: s,
  filteredSavedDates: d,
  onExcludeToggle: c,
  onFilterButtonClick: m,
  onRemoveFilterType: f,
  onCancel: D,
  onSave: _,
  onToggleWeekday: I,
  setSavedDatesSearchTerm: P,
  setExcludedSavedDates: W,
  setExcludedSpecificDates: O,
  setExcludedDateRanges: B,
  setExcludeFilterTypes: w,
  setActiveFilterView: p,
  savedDatesForFilter: l
}) {
  const [v, T] = ne(!1), [Y, q] = ne(!1), [E, C] = ne(!1), Z = _e(null), le = _e(null), N = _e(null), g = _e(null);
  Me(() => {
    function x(j) {
      if (!n) return;
      const K = j.target;
      g.current && !g.current.contains(K) && p(null);
    }
    return n && document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [n, p]), Me(() => {
    function x(j) {
      const K = j.target, re = Z.current && Z.current.contains(K), ae = le.current && le.current.contains(K);
      !re && !ae && T(!1);
    }
    return v && document.addEventListener("mousedown", x), () => {
      document.removeEventListener("mousedown", x);
    };
  }, [v]);
  const k = $e(() => {
    const x = /* @__PURE__ */ new Map();
    for (const j of l)
      x.set(j.id, j);
    return x;
  }, [l]), S = An.filter(
    (x) => r.includes(x.value)
  ), b = o.map((x) => k.get(x)).filter((x) => !!x), $ = (x) => {
    const j = /* @__PURE__ */ new Date(x.selection.startDateUtc + "T00:00:00"), K = /* @__PURE__ */ new Date(x.selection.endDateUtc + "T00:00:00"), re = {
      month: "short",
      day: "numeric",
      year: "numeric"
    }, ae = j.toLocaleDateString("en-US", re), Q = K.toLocaleDateString("en-US", re);
    return ae === Q ? ae : `${ae} - ${Q}`;
  }, M = (x) => {
    const j = $(x), K = x.label?.trim();
    return K && K.toLowerCase() !== j.toLowerCase() ? K : j;
  }, R = (x) => {
    W((j) => {
      if (!j.includes(x))
        return j;
      const K = j.filter((re) => re !== x);
      return K.length === 0 && w(
        (re) => re.filter((ae) => ae !== "saved-dates")
      ), K;
    });
  }, G = (x) => {
    B((j) => {
      const K = j.filter((re) => re.id !== x);
      return K.length === 0 && w(
        (re) => re.filter((ae) => ae !== "date-range")
      ), K;
    });
  }, oe = (x) => {
    O((j) => j.filter((K) => K !== x));
  }, ee = [
    ...S.map((x) => ({
      id: `day-${x.value}`,
      label: jn[x.value] ?? x.label,
      title: jn[x.value] ?? x.label,
      onRemove: () => I(x.value)
    })),
    ...b.map((x) => ({
      id: `saved-${x.id}`,
      label: M(x),
      title: $(x),
      onRemove: () => R(x.id)
    })),
    ...i.map((x) => ({
      id: `range-${x.id}`,
      label: Pn(x.start, x.end),
      title: Pn(x.start, x.end),
      onRemove: () => G(x.id)
    })),
    ...a.map((x) => ({
      id: `specific-${x}`,
      label: (/* @__PURE__ */ new Date(x + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      title: x,
      onRemove: () => oe(x)
    }))
  ];
  return Me(() => {
    const x = () => {
      if (N.current && !e && !v) {
        const j = N.current, K = j.scrollWidth > j.clientWidth;
        C(K);
      } else
        C(!1);
    };
    return x(), window.addEventListener("resize", x), () => {
      window.removeEventListener("resize", x);
    };
  }, [e, v, ee.length]), /* @__PURE__ */ H("div", { className: " border-b border-gray-200 ", children: [
    /* @__PURE__ */ H("div", { className: "py-2 flex items-center gap-3 px-4 h-[45px]", children: [
      /* @__PURE__ */ H("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h(
          "input",
          {
            type: "checkbox",
            id: "exclude-checkbox",
            checked: e || ee.length > 0,
            onChange: (x) => {
              const j = x.target.checked;
              c(j), !j && !e && ee.length > 0 && (W([]), O([]), B([]), w([]), r.forEach((K) => I(K)));
            },
            className: `w-4 h-4 border-gray-300 rounded focus:ring-blue-500 ${!e && ee.length > 0 ? "accent-[#61708F]" : "text-blue-600"}`
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
      !e && ee.length > 0 && /* @__PURE__ */ h(
        "button",
        {
          ref: le,
          type: "button",
          onClick: () => {
            c(!0), T(!1), q(!0);
          },
          className: "text-sm font-medium text-[#003DB8] ml-auto",
          children: "Edit"
        }
      ),
      e && /* @__PURE__ */ H(mt, { children: [
        /* @__PURE__ */ H(
          "div",
          {
            ref: g,
            className: "flex items-center gap-2 relative",
            children: [
              /* @__PURE__ */ H(
                "button",
                {
                  type: "button",
                  onClick: () => m("days"),
                  style: { width: "80px", height: "24px" },
                  className: `flex items-center justify-between gap-1 px-2 rounded-md border text-xs font-medium transition-colors ${n === "days" ? "border-blue-500 bg-gray-50 text-gray-700" : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"}`,
                  children: [
                    /* @__PURE__ */ h("span", { children: "weeks" }),
                    /* @__PURE__ */ h(zt, { className: "w-4 h-4 text-gray-400" })
                  ]
                }
              ),
              n === "days" && t.includes("days") && /* @__PURE__ */ h("div", { className: "absolute w-12 h-[264px] top-full left-7 mt-1 z-20", children: /* @__PURE__ */ h("div", { className: "flex flex-col gap-3 px-2 py-2 bg-white border border-[0.5px]  border-gray-200 rounded-lg", children: /* @__PURE__ */ h("div", { className: "flex justify-center", children: /* @__PURE__ */ h("div", { className: "inline-flex flex-col items-center gap-2 ", children: An.map((x) => {
                const j = r.includes(
                  x.value
                );
                return /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: () => I(x.value),
                    className: `w-8 h-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors ${j ? "bg-[#CEDBF5] shadow-inner" : "text-gray-800 hover:bg-gray-100"}`,
                    children: x.label.charAt(0)
                  },
                  x.value
                );
              }) }) }) }) }),
              /* @__PURE__ */ H(
                "button",
                {
                  type: "button",
                  onClick: () => m("saved-dates"),
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
                  /* @__PURE__ */ h(ao, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
                  /* @__PURE__ */ h(
                    "input",
                    {
                      type: "text",
                      value: s,
                      onChange: (x) => P(x.target.value),
                      placeholder: "Search saved dates",
                      className: "w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }
                  )
                ] }),
                d.length === 0 ? /* @__PURE__ */ h("p", { className: "text-sm text-gray-500 text-center py-6", children: "No saved dates found" }) : /* @__PURE__ */ h("div", { className: "max-h-64 overflow-y-auto space-y-2", children: d.map((x) => {
                  const j = o.includes(
                    x.id
                  ), K = (/* @__PURE__ */ new Date(
                    x.selection.startDateUtc + "T00:00:00"
                  )).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  }), re = (/* @__PURE__ */ new Date(
                    x.selection.endDateUtc + "T00:00:00"
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
                        W((ae) => {
                          if (ae.includes(x.id)) {
                            const Q = ae.filter(
                              (ce) => ce !== x.id
                            );
                            return Q.length === 0 && w(
                              (ce) => ce.filter(
                                (fe) => fe !== "saved-dates"
                              )
                            ), Q;
                          }
                          return w((Q) => Q.includes("saved-dates") ? Q : [...Q, "saved-dates"]), [...ae, x.id];
                        });
                      },
                      className: `w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${j ? "bg-[#CEDBF5] " : "bg-white  hover:bg-gray-50"}`,
                      children: /* @__PURE__ */ H("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ h("span", { className: "text-xs font-semibold text-gray-900", children: x.label }),
                        /* @__PURE__ */ H("span", { className: "text-[10px] font-medium text-gray-600", children: [
                          K,
                          " - ",
                          re
                        ] })
                      ] })
                    },
                    x.id
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
                D(), p(null);
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
                _(), p(null);
              },
              className: "px-4 h-7 flex items-center py-2 bg-[#003DB8] text-white text-xs font-semibold rounded-[4px] shadow-sm hover:bg-blue-700 transition-colors",
              children: "Save Exclusion"
            }
          )
        ] })
      ] })
    ] }),
    ee.length > 0 && /* @__PURE__ */ H("div", { className: "w-full border-t border-gray-200 py-3 px-4 relative", children: [
      /* @__PURE__ */ H("div", { className: "flex items-center w-full gap-2", children: [
        /* @__PURE__ */ H("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ h(
            "div",
            {
              ref: N,
              className: `flex gap-2 ${e || v ? "flex-wrap" : "flex-nowrap overflow-hidden"}`,
              children: ee.map((x) => /* @__PURE__ */ H(
                "span",
                {
                  className: "inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 flex-shrink-0",
                  title: x.title,
                  children: [
                    x.label,
                    e && /* @__PURE__ */ h(
                      "button",
                      {
                        type: "button",
                        onClick: x.onRemove,
                        className: "text-gray-400 hover:text-gray-600 transition-colors",
                        "aria-label": `Remove ${x.label}`,
                        children: /* @__PURE__ */ h(fo, { className: "h-2.5 w-2.5" })
                      }
                    )
                  ]
                },
                x.id
              ))
            }
          ),
          !e && !v && E && /* @__PURE__ */ h(
            "div",
            {
              className: "absolute right-0 top-0 bottom-0 w-16 pointer-events-none",
              style: {
                background: "linear-gradient(to right, transparent, white 70%)"
              }
            }
          )
        ] }),
        !e && !v && E && /* @__PURE__ */ H(
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
      v && !e && // Only show expanded card if NOT enabled (read-only view)
      /* @__PURE__ */ h(
        "div",
        {
          ref: Z,
          className: "absolute top-0 left-0 w-full min-h-full bg-white border border-gray-200 shadow-lg z-10 p-4 rounded-lg",
          children: /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-2", children: ee.map((x) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center h-7 gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700",
              title: x.title,
              children: x.label
            },
            x.id
          )) })
        }
      )
    ] })
  ] });
}
function Fs(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Es = {}, _t = {};
function ot(e, t) {
  try {
    const r = (Es[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in _t ? _t[r] : Rn(r, r.split(":"));
  } catch {
    if (e in _t) return _t[e];
    const n = e?.match($s);
    return n ? Rn(e, n.slice(1)) : NaN;
  }
}
const $s = /([+-]\d\d):?(\d\d)?/;
function Rn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return _t[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class je extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(ot(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), vr(this), fn(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new je(...n, t) : new je(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new je(+this, t);
  }
  getTimezoneOffset() {
    const t = -ot(this.timeZone, this);
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
    return new je(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ln = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ln.test(e)) return;
  const t = e.replace(Ln, "$1UTC");
  je.prototype[t] && (e.startsWith("get") ? je.prototype[e] = function() {
    return this.internal[t]();
  } : (je.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Is(this), +this;
  }, je.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), fn(this), +this;
  }));
});
function fn(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-ot(e.timeZone, e) * 60));
}
function Is(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), vr(e);
}
function vr(e) {
  const t = ot(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = o - a, s = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && s && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const d = o - n;
  d && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + d);
  const c = /* @__PURE__ */ new Date(+e);
  c.setUTCSeconds(0);
  const m = o > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, f = Math.round(-(ot(e.timeZone, e) * 60)) % 60;
  (f || m) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + f), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + f + m));
  const D = ot(e.timeZone, e), _ = D > 0 ? Math.floor(D) : Math.ceil(D), P = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - _, W = _ !== n, O = P - d;
  if (W && O) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + O);
    const B = ot(e.timeZone, e), w = B > 0 ? Math.floor(B) : Math.ceil(B), p = _ - w;
    p && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + p), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + p));
  }
}
class ke extends je {
  //#region static
  static tz(t, ...n) {
    return n.length ? new ke(...n, t) : new ke(Date.now(), t);
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
    return `${t} GMT${n}${r}${o} (${Fs(this.timeZone, this)})`;
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
    return new ke(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ke(+new Date(t), this.timeZone);
  }
  //#endregion
}
const qn = 5, Bs = 4;
function Us(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, qn * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? qn : Bs;
}
function kr(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Ps(e, t) {
  const n = kr(e, t), r = Us(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? ke.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, o, a) => this.overrides?.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new ke(r, o, a, this.options.timeZone) : new Date(r, o, a), this.addDays = (r, o) => this.overrides?.addDays ? this.overrides.addDays(r, o) : pe(r, o), this.addMonths = (r, o) => this.overrides?.addMonths ? this.overrides.addMonths(r, o) : qe(r, o), this.addWeeks = (r, o) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, o) : ar(r, o), this.addYears = (r, o) => this.overrides?.addYears ? this.overrides.addYears(r, o) : po(r, o), this.differenceInCalendarDays = (r, o) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : hn(r, o), this.differenceInCalendarMonths = (r, o) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : ir(r, o), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Mo(r), this.eachYearOfInterval = (r) => {
      const o = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : So(r), a = new Set(o.map((s) => this.getYear(s)));
      if (a.size === o.length)
        return o;
      const i = [];
      return a.forEach((s) => {
        i.push(new Date(s, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Ps(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Co(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : pt(r), this.endOfWeek = (r, o) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, o) : ur(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : No(r), this.format = (r, o, a) => {
      const i = this.overrides?.format ? this.overrides.format(r, o, this.options) : va(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : fr(r), this.getMonth = (r, o) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : rt(r, this.options), this.getYear = (r, o) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : De(r, this.options), this.getWeek = (r, o) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : mr(r, this.options), this.isAfter = (r, o) => this.overrides?.isAfter ? this.overrides.isAfter(r, o) : Na(r, o), this.isBefore = (r, o) => this.overrides?.isBefore ? this.overrides.isBefore(r, o) : Sa(r, o), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : sr(r), this.isSameDay = (r, o) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, o) : Do(r, o), this.isSameMonth = (r, o) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, o) : Ca(r, o), this.isSameYear = (r, o) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, o) : Ta(r, o), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : yo(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : xo(r), this.setMonth = (r, o) => this.overrides?.setMonth ? this.overrides.setMonth(r, o) : Et(r, o), this.setYear = (r, o) => this.overrides?.setYear ? this.overrides.setYear(r, o) : at(r, o), this.startOfBroadcastWeek = (r, o) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : kr(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : Ft(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Yt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : Te(r), this.startOfWeek = (r, o) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : xe(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : yn(r), this.options = { locale: xn, ...t }, this.overrides = n;
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
    const i = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, i);
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
const Re = new Ye();
class Mr {
  constructor(t, n, r = Re) {
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
class Hs {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class As {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function js(e) {
  return U.createElement("button", { ...e });
}
function Rs(e) {
  return U.createElement("span", { ...e });
}
function Ls(e) {
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
function qs(e) {
  const { day: t, modifiers: n, ...r } = e;
  return U.createElement("td", { ...r });
}
function zs(e) {
  const { day: t, modifiers: n, ...r } = e, o = U.useRef(null);
  return U.useEffect(() => {
    n.focused && o.current?.focus();
  }, [n.focused]), U.createElement("button", { ref: o, ...r });
}
var L;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(L || (L = {}));
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
function Zs(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, i = [o[L.Dropdown], n].join(" "), s = t?.find(({ value: d }) => d === a.value);
  return U.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[L.DropdownRoot] },
    U.createElement(r.Select, { className: i, ...a }, t?.map(({ value: d, label: c, disabled: m }) => U.createElement(r.Option, { key: d, value: d, disabled: m }, c))),
    U.createElement(
      "span",
      { className: o[L.CaptionLabel], "aria-hidden": !0 },
      s?.label,
      U.createElement(r.Chevron, { orientation: "down", size: 18, className: o[L.Chevron] })
    )
  );
}
function Qs(e) {
  return U.createElement("div", { ...e });
}
function Gs(e) {
  return U.createElement("div", { ...e });
}
function Ks(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return U.createElement("div", { ...r }, e.children);
}
function Xs(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return U.createElement("div", { ...r });
}
function Js(e) {
  return U.createElement("table", { ...e });
}
function Vs(e) {
  return U.createElement("div", { ...e });
}
const Nr = Ar(void 0);
function It() {
  const e = jr(Nr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function ei(e) {
  const { components: t } = It();
  return U.createElement(t.Dropdown, { ...e });
}
function ti(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: i, classNames: s, labels: { labelPrevious: d, labelNext: c } } = It(), m = se((D) => {
    o && n?.(D);
  }, [o, n]), f = se((D) => {
    r && t?.(D);
  }, [r, t]);
  return U.createElement(
    "nav",
    { ...a },
    U.createElement(
      i.PreviousMonthButton,
      { type: "button", className: s[L.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": d(r), onClick: f },
      U.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: s[L.Chevron], orientation: "left" })
    ),
    U.createElement(
      i.NextMonthButton,
      { type: "button", className: s[L.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": c(o), onClick: m },
      U.createElement(i.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: s[L.Chevron] })
    )
  );
}
function ni(e) {
  const { components: t } = It();
  return U.createElement(t.Button, { ...e });
}
function ri(e) {
  return U.createElement("option", { ...e });
}
function oi(e) {
  const { components: t } = It();
  return U.createElement(t.Button, { ...e });
}
function ai(e) {
  const { rootRef: t, ...n } = e;
  return U.createElement("div", { ...n, ref: t });
}
function si(e) {
  return U.createElement("select", { ...e });
}
function ii(e) {
  const { week: t, ...n } = e;
  return U.createElement("tr", { ...n });
}
function ci(e) {
  return U.createElement("th", { ...e });
}
function di(e) {
  return U.createElement(
    "thead",
    { "aria-hidden": !0 },
    U.createElement("tr", { ...e })
  );
}
function li(e) {
  const { week: t, ...n } = e;
  return U.createElement("th", { ...n });
}
function ui(e) {
  return U.createElement("th", { ...e });
}
function fi(e) {
  return U.createElement("tbody", { ...e });
}
function hi(e) {
  const { components: t } = It();
  return U.createElement(t.Dropdown, { ...e });
}
const mi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: js,
  CaptionLabel: Rs,
  Chevron: Ls,
  Day: qs,
  DayButton: zs,
  Dropdown: Zs,
  DropdownNav: Qs,
  Footer: Gs,
  Month: Ks,
  MonthCaption: Xs,
  MonthGrid: Js,
  Months: Vs,
  MonthsDropdown: ei,
  Nav: ti,
  NextMonthButton: ni,
  Option: ri,
  PreviousMonthButton: oi,
  Root: ai,
  Select: si,
  Week: ii,
  WeekNumber: li,
  WeekNumberHeader: ui,
  Weekday: ci,
  Weekdays: di,
  Weeks: fi,
  YearsDropdown: hi
}, Symbol.toStringTag, { value: "Module" }));
function ze(e, t, n = !1, r = Re) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: i, isSameDay: s } = r;
  return o && a ? (i(a, o) < 0 && ([o, a] = [a, o]), i(t, o) >= (n ? 1 : 0) && i(a, t) >= (n ? 1 : 0)) : !n && a ? s(a, t) : !n && o ? s(o, t) : !1;
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
function Ze(e, t, n = Re) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: i } = n;
  return r.some((s) => {
    if (typeof s == "boolean")
      return s;
    if (n.isDate(s))
      return o(e, s);
    if (Wr(s, n))
      return s.includes(e);
    if (Dn(s))
      return ze(s, e, !1, n);
    if (Or(s))
      return Array.isArray(s.dayOfWeek) ? s.dayOfWeek.includes(e.getDay()) : s.dayOfWeek === e.getDay();
    if (Sr(s)) {
      const d = a(s.before, e), c = a(s.after, e), m = d > 0, f = c < 0;
      return i(s.before, s.after) ? f && m : m || f;
    }
    return Cr(s) ? a(e, s.after) > 0 : Tr(s) ? a(s.before, e) > 0 : typeof s == "function" ? s(e) : !1;
  });
}
function gi(e, t, n, r, o) {
  const { disabled: a, hidden: i, modifiers: s, showOutsideDays: d, broadcastCalendar: c, today: m } = t, { isSameDay: f, isSameMonth: D, startOfMonth: _, isBefore: I, endOfMonth: P, isAfter: W } = o, O = n && _(n), B = r && P(r), w = {
    [ye.focused]: [],
    [ye.outside]: [],
    [ye.disabled]: [],
    [ye.hidden]: [],
    [ye.today]: []
  }, p = {};
  for (const l of e) {
    const { date: v, displayMonth: T } = l, Y = !!(T && !D(v, T)), q = !!(O && I(v, O)), E = !!(B && W(v, B)), C = !!(a && Ze(v, a, o)), Z = !!(i && Ze(v, i, o)) || q || E || // Broadcast calendar will show outside days as default
    !c && !d && Y || c && d === !1 && Y, le = f(v, m ?? o.today());
    Y && w.outside.push(l), C && w.disabled.push(l), Z && w.hidden.push(l), le && w.today.push(l), s && Object.keys(s).forEach((N) => {
      const g = s?.[N];
      g && Ze(v, g, o) && (p[N] ? p[N].push(l) : p[N] = [l]);
    });
  }
  return (l) => {
    const v = {
      [ye.focused]: !1,
      [ye.disabled]: !1,
      [ye.hidden]: !1,
      [ye.outside]: !1,
      [ye.today]: !1
    }, T = {};
    for (const Y in w) {
      const q = w[Y];
      v[Y] = q.some((E) => E === l);
    }
    for (const Y in p)
      T[Y] = p[Y].some((q) => q === l);
    return {
      ...v,
      // custom modifiers should override all the previous ones
      ...T
    };
  };
}
function pi(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[ye[a]] ? o.push(t[ye[a]]) : t[Ue[a]] && o.push(t[Ue[a]]), o), [t[L.Day]]);
}
function yi(e) {
  return {
    ...mi,
    ...e
  };
}
function xi(e) {
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
function Di() {
  const e = {};
  for (const t in L)
    e[L[t]] = `rdp-${L[t]}`;
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
const bi = _r;
function wi(e, t, n) {
  return (n ?? new Ye(t)).format(e, "d");
}
function vi(e, t = Re) {
  return t.format(e, "LLLL");
}
function ki(e, t, n) {
  return (n ?? new Ye(t)).format(e, "cccccc");
}
function Mi(e, t = Re) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Ni() {
  return "";
}
function Yr(e, t = Re) {
  return t.format(e, "yyyy");
}
const Si = Yr, Ci = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: _r,
  formatDay: wi,
  formatMonthCaption: bi,
  formatMonthDropdown: vi,
  formatWeekNumber: Mi,
  formatWeekNumberHeader: Ni,
  formatWeekdayName: ki,
  formatYearCaption: Si,
  formatYearDropdown: Yr
}, Symbol.toStringTag, { value: "Module" }));
function Ti(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Ci,
    ...e
  };
}
function Oi(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: i, endOfYear: s, eachMonthOfInterval: d, getMonth: c } = o;
  return d({
    start: i(e),
    end: s(e)
  }).map((D) => {
    const _ = r.formatMonthDropdown(D, o), I = c(D), P = t && D < a(t) || n && D > a(n) || !1;
    return { value: I, label: _, disabled: P };
  });
}
function Wi(e, t = {}, n = {}) {
  let r = { ...t?.[L.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n?.[o]
    };
  }), r;
}
function _i(e, t, n) {
  const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), a = [];
  for (let i = 0; i < 7; i++) {
    const s = e.addDays(o, i);
    a.push(s);
  }
  return a;
}
function Yi(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: i, eachYearOfInterval: s, getYear: d } = r, c = a(e), m = i(t), f = s({ start: c, end: m });
  return o && f.reverse(), f.map((D) => {
    const _ = n.formatYearDropdown(D, r);
    return {
      value: d(D),
      label: _,
      disabled: !1
    };
  });
}
function Fr(e, t, n, r) {
  let o = (r ?? new Ye(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Fi = Fr;
function Er(e, t, n) {
  return (n ?? new Ye(t)).formatMonthYear(e);
}
const Ei = Er;
function $i(e, t, n, r) {
  let o = (r ?? new Ye(n)).format(e, "PPPP");
  return t?.today && (o = `Today, ${o}`), o;
}
function Ii(e) {
  return "Choose the Month";
}
function Bi() {
  return "";
}
function Ui(e) {
  return "Go to the Next Month";
}
function Pi(e) {
  return "Go to the Previous Month";
}
function Hi(e, t, n) {
  return (n ?? new Ye(t)).format(e, "cccc");
}
function Ai(e, t) {
  return `Week ${e}`;
}
function ji(e) {
  return "Week Number";
}
function Ri(e) {
  return "Choose the Year";
}
const Li = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Ei,
  labelDay: Fi,
  labelDayButton: Fr,
  labelGrid: Er,
  labelGridcell: $i,
  labelMonthDropdown: Ii,
  labelNav: Bi,
  labelNext: Ui,
  labelPrevious: Pi,
  labelWeekNumber: Ai,
  labelWeekNumberHeader: ji,
  labelWeekday: Hi,
  labelYearDropdown: Ri
}, Symbol.toStringTag, { value: "Module" })), Bt = (e) => e instanceof HTMLElement ? e : null, rn = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], qi = (e) => Bt(e.querySelector("[data-animated-month]")), on = (e) => Bt(e.querySelector("[data-animated-caption]")), an = (e) => Bt(e.querySelector("[data-animated-weeks]")), zi = (e) => Bt(e.querySelector("[data-animated-nav]")), Zi = (e) => Bt(e.querySelector("[data-animated-weekdays]"));
function Qi(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const i = _e(null), s = _e(r), d = _e(!1);
  Rr(() => {
    const c = s.current;
    if (s.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || c.length === 0 || r.length !== c.length)
      return;
    const m = a.isSameMonth(r[0].date, c[0].date), f = a.isAfter(r[0].date, c[0].date), D = f ? n[We.caption_after_enter] : n[We.caption_before_enter], _ = f ? n[We.weeks_after_enter] : n[We.weeks_before_enter], I = i.current, P = e.current.cloneNode(!0);
    if (P instanceof HTMLElement ? (rn(P).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const p = qi(w);
      p && w.contains(p) && w.removeChild(p);
      const l = on(w);
      l && l.classList.remove(D);
      const v = an(w);
      v && v.classList.remove(_);
    }), i.current = P) : i.current = null, d.current || m || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const W = I instanceof HTMLElement ? rn(I) : [], O = rn(e.current);
    if (O?.every((B) => B instanceof HTMLElement) && W && W.every((B) => B instanceof HTMLElement)) {
      d.current = !0, e.current.style.isolation = "isolate";
      const B = zi(e.current);
      B && (B.style.zIndex = "1"), O.forEach((w, p) => {
        const l = W[p];
        if (!l)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const v = on(w);
        v && v.classList.add(D);
        const T = an(w);
        T && T.classList.add(_);
        const Y = () => {
          d.current = !1, e.current && (e.current.style.isolation = ""), B && (B.style.zIndex = ""), v && v.classList.remove(D), T && T.classList.remove(_), w.style.position = "", w.style.overflow = "", w.contains(l) && w.removeChild(l);
        };
        l.style.pointerEvents = "none", l.style.position = "absolute", l.style.overflow = "hidden", l.setAttribute("aria-hidden", "true");
        const q = Zi(l);
        q && (q.style.opacity = "0");
        const E = on(l);
        E && (E.classList.add(f ? n[We.caption_before_exit] : n[We.caption_after_exit]), E.addEventListener("animationend", Y));
        const C = an(l);
        C && C.classList.add(f ? n[We.weeks_before_exit] : n[We.weeks_after_exit]), w.insertBefore(l, w.firstChild);
      });
    }
  });
}
function Gi(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: i, fixedWeeks: s, broadcastCalendar: d } = n ?? {}, { addDays: c, differenceInCalendarDays: m, differenceInCalendarMonths: f, endOfBroadcastWeek: D, endOfISOWeek: _, endOfMonth: I, endOfWeek: P, isAfter: W, startOfBroadcastWeek: O, startOfISOWeek: B, startOfWeek: w } = r, p = d ? O(o, r) : i ? B(o) : w(o), l = d ? D(a) : i ? _(I(a)) : P(I(a)), v = m(l, p), T = f(a, o) + 1, Y = [];
  for (let C = 0; C <= v; C++) {
    const Z = c(p, C);
    if (t && W(Z, t))
      break;
    Y.push(Z);
  }
  const E = (d ? 35 : 42) * T;
  if (s && Y.length < E) {
    const C = E - Y.length;
    for (let Z = 0; Z < C; Z++) {
      const le = c(Y[Y.length - 1], 1);
      Y.push(le);
    }
  }
  return Y;
}
function Ki(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, i) => a.concat(i.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Xi(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let i = 0; i < o; i++) {
    const s = r.addMonths(e, i);
    if (t && s > t)
      break;
    a.push(s);
  }
  return a;
}
function zn(e, t, n, r) {
  const { month: o, defaultMonth: a, today: i = r.today(), numberOfMonths: s = 1 } = e;
  let d = o || a || i;
  const { differenceInCalendarMonths: c, addMonths: m, startOfMonth: f } = r;
  if (n && c(n, d) < s - 1) {
    const D = -1 * (s - 1);
    d = m(n, D);
  }
  return t && c(d, t) < 0 && (d = t), f(d);
}
function Ji(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: i, endOfMonth: s, endOfWeek: d, getISOWeek: c, getWeek: m, startOfBroadcastWeek: f, startOfISOWeek: D, startOfWeek: _ } = r, I = e.reduce((P, W) => {
    const O = n.broadcastCalendar ? f(W, r) : n.ISOWeek ? D(W) : _(W), B = n.broadcastCalendar ? a(W) : n.ISOWeek ? i(s(W)) : d(s(W)), w = t.filter((T) => T >= O && T <= B), p = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < p) {
      const T = t.filter((Y) => {
        const q = p - w.length;
        return Y > B && Y <= o(B, q);
      });
      w.push(...T);
    }
    const l = w.reduce((T, Y) => {
      const q = n.ISOWeek ? c(Y) : m(Y), E = T.find((Z) => Z.weekNumber === q), C = new Mr(Y, W, r);
      return E ? E.days.push(C) : T.push(new As(q, [C])), T;
    }, []), v = new Hs(W, l);
    return P.push(v), P;
  }, []);
  return n.reverseMonths ? I.reverse() : I;
}
function Vi(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: i, endOfMonth: s, addYears: d, endOfYear: c, newDate: m, today: f } = t, { fromYear: D, toYear: _, fromMonth: I, toMonth: P } = e;
  !n && I && (n = I), !n && D && (n = t.newDate(D, 0, 1)), !r && P && (r = P), !r && _ && (r = m(_, 11, 31));
  const W = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : D ? n = m(D, 0, 1) : !n && W && (n = o(d(e.today ?? f(), -100))), r ? r = s(r) : _ ? r = m(_, 11, 31) : !r && W && (r = c(e.today ?? f())), [
    n && a(n),
    r && a(r)
  ];
}
function ec(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: i, addMonths: s, differenceInCalendarMonths: d } = r, c = o ? a : 1, m = i(e);
  if (!t)
    return s(m, c);
  if (!(d(t, e) < a))
    return s(m, c);
}
function tc(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: i, addMonths: s, differenceInCalendarMonths: d } = r, c = o ? a ?? 1 : 1, m = i(e);
  if (!t)
    return s(m, -c);
  if (!(d(m, t) <= 0))
    return s(m, -c);
}
function nc(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Rt(e, t) {
  const [n, r] = ne(e);
  return [t === void 0 ? n : t, r];
}
function rc(e, t) {
  const [n, r] = Vi(e, t), { startOfMonth: o, endOfMonth: a } = t, i = zn(e, n, r, t), [s, d] = Rt(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Me(() => {
    const v = zn(e, n, r, t);
    d(v);
  }, [e.timeZone]);
  const c = Xi(s, r, e, t), m = Gi(c, e.endMonth ? a(e.endMonth) : void 0, e, t), f = Ji(c, m, e, t), D = nc(f), _ = Ki(f), I = tc(s, n, e, t), P = ec(s, r, e, t), { disableNavigation: W, onMonthChange: O } = e, B = (v) => D.some((T) => T.days.some((Y) => Y.isEqualTo(v))), w = (v) => {
    if (W)
      return;
    let T = o(v);
    n && T < o(n) && (T = o(n)), r && T > o(r) && (T = o(r)), d(T), O?.(T);
  };
  return {
    months: f,
    weeks: D,
    days: _,
    navStart: n,
    navEnd: r,
    previousMonth: I,
    nextMonth: P,
    goToMonth: w,
    goToDay: (v) => {
      B(v) || w(v.date);
    }
  };
}
var Ae;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Ae || (Ae = {}));
function Zn(e) {
  return !e[ye.disabled] && !e[ye.hidden] && !e[ye.outside];
}
function oc(e, t, n, r) {
  let o, a = -1;
  for (const i of e) {
    const s = t(i);
    Zn(s) && (s[ye.focused] && a < Ae.FocusedModifier ? (o = i, a = Ae.FocusedModifier) : r?.isEqualTo(i) && a < Ae.LastFocused ? (o = i, a = Ae.LastFocused) : n(i.date) && a < Ae.Selected ? (o = i, a = Ae.Selected) : s[ye.today] && a < Ae.Today && (o = i, a = Ae.Today));
  }
  return o || (o = e.find((i) => Zn(t(i)))), o;
}
function ac(e, t, n, r, o, a, i) {
  const { ISOWeek: s, broadcastCalendar: d } = a, { addDays: c, addMonths: m, addWeeks: f, addYears: D, endOfBroadcastWeek: _, endOfISOWeek: I, endOfWeek: P, max: W, min: O, startOfBroadcastWeek: B, startOfISOWeek: w, startOfWeek: p } = i;
  let v = {
    day: c,
    week: f,
    month: m,
    year: D,
    startOfWeek: (T) => d ? B(T, i) : s ? w(T) : p(T),
    endOfWeek: (T) => d ? _(T) : s ? I(T) : P(T)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? v = W([r, v]) : t === "after" && o && (v = O([o, v])), v;
}
function $r(e, t, n, r, o, a, i, s = 0) {
  if (s > 365)
    return;
  const d = ac(e, t, n.date, r, o, a, i), c = !!(a.disabled && Ze(d, a.disabled, i)), m = !!(a.hidden && Ze(d, a.hidden, i)), f = d, D = new Mr(d, f, i);
  return !c && !m ? D : $r(e, t, D, r, o, a, i, s + 1);
}
function sc(e, t, n, r, o) {
  const { autoFocus: a } = e, [i, s] = ne(), d = oc(t.days, n, r || (() => !1), i), [c, m] = ne(a ? d : void 0);
  return {
    isFocusTarget: (P) => !!d?.isEqualTo(P),
    setFocused: m,
    focused: c,
    blur: () => {
      s(c), m(void 0);
    },
    moveFocus: (P, W) => {
      if (!c)
        return;
      const O = $r(P, W, c, t.navStart, t.navEnd, e, o);
      O && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(O)) || (t.goToDay(O), m(O)));
    }
  };
}
function ic(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, i] = Rt(n, o ? n : void 0), s = o ? n : a, { isSameDay: d } = t, c = (_) => s?.some((I) => d(I, _)) ?? !1, { min: m, max: f } = e;
  return {
    selected: s,
    select: (_, I, P) => {
      let W = [...s ?? []];
      if (c(_)) {
        if (s?.length === m || r && s?.length === 1)
          return;
        W = s?.filter((O) => !d(O, _));
      } else
        s?.length === f ? W = [_] : W = [...W, _];
      return o || i(W), o?.(W, _, I, P), W;
    },
    isSelected: c
  };
}
function cc(e, t, n = 0, r = 0, o = !1, a = Re) {
  const { from: i, to: s } = t || {}, { isSameDay: d, isAfter: c, isBefore: m } = a;
  let f;
  if (!i && !s)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !s)
    d(i, e) ? n === 0 ? f = { from: i, to: e } : o ? f = { from: i, to: void 0 } : f = void 0 : m(e, i) ? f = { from: e, to: i } : f = { from: i, to: e };
  else if (i && s)
    if (d(i, e) && d(s, e))
      o ? f = { from: i, to: s } : f = void 0;
    else if (d(i, e))
      f = { from: i, to: n > 0 ? void 0 : e };
    else if (d(s, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (m(e, i))
      f = { from: e, to: s };
    else if (c(e, i))
      f = { from: i, to: e };
    else if (c(e, s))
      f = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (f?.from && f?.to) {
    const D = a.differenceInCalendarDays(f.to, f.from);
    r > 0 && D > r ? f = { from: e, to: void 0 } : n > 1 && D < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function dc(e, t, n = Re) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), i = Math.min(a, 6);
  for (let s = 0; s <= i; s++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function Qn(e, t, n = Re) {
  return ze(e, t.from, !1, n) || ze(e, t.to, !1, n) || ze(t, e.from, !1, n) || ze(t, e.to, !1, n);
}
function lc(e, t, n = Re) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((s) => typeof s != "function").some((s) => typeof s == "boolean" ? s : n.isDate(s) ? ze(e, s, !1, n) : Wr(s, n) ? s.some((d) => ze(e, d, !1, n)) : Dn(s) ? s.from && s.to ? Qn(e, { from: s.from, to: s.to }, n) : !1 : Or(s) ? dc(e, s.dayOfWeek, n) : Sr(s) ? n.isAfter(s.before, s.after) ? Qn(e, {
    from: n.addDays(s.after, 1),
    to: n.addDays(s.before, -1)
  }, n) : Ze(e.from, s, n) || Ze(e.to, s, n) : Cr(s) || Tr(s) ? Ze(e.from, s, n) || Ze(e.to, s, n) : !1))
    return !0;
  const i = r.filter((s) => typeof s == "function");
  if (i.length) {
    let s = e.from;
    const d = n.differenceInCalendarDays(e.to, e.from);
    for (let c = 0; c <= d; c++) {
      if (i.some((m) => m(s)))
        return !0;
      s = n.addDays(s, 1);
    }
  }
  return !1;
}
function uc(e, t) {
  const { disabled: n, excludeDisabled: r, selected: o, required: a, onSelect: i } = e, [s, d] = Rt(o, i ? o : void 0), c = i ? o : s;
  return {
    selected: c,
    select: (D, _, I) => {
      const { min: P, max: W } = e, O = D ? cc(D, c, P, W, a, t) : void 0;
      return r && n && O?.from && O.to && lc({ from: O.from, to: O.to }, n, t) && (O.from = D, O.to = void 0), i || d(O), i?.(O, D, _, I), O;
    },
    isSelected: (D) => c && ze(c, D, !1, t)
  };
}
function fc(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, i] = Rt(n, o ? n : void 0), s = o ? n : a, { isSameDay: d } = t;
  return {
    selected: s,
    select: (f, D, _) => {
      let I = f;
      return !r && s && s && d(f, s) && (I = void 0), o || i(I), o?.(I, f, D, _), I;
    },
    isSelected: (f) => s ? d(s, f) : !1
  };
}
function hc(e, t) {
  const n = fc(e, t), r = ic(e, t), o = uc(e, t);
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
function ht(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new ke(t.today, t.timeZone)), t.month && (t.month = new ke(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new ke(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new ke(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new ke(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new ke(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((J) => new ke(J, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new ke(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new ke(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: o, dateLib: a, locale: i, classNames: s } = $e(() => {
    const J = { ...xn, ...t.locale };
    return {
      dateLib: new Ye({
        locale: J,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: yi(t.components),
      formatters: Ti(t.formatters),
      labels: { ...Li, ...t.labels },
      locale: J,
      classNames: { ...Di(), ...t.classNames }
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
  ]), { captionLayout: d, mode: c, navLayout: m, numberOfMonths: f = 1, onDayBlur: D, onDayClick: _, onDayFocus: I, onDayKeyDown: P, onDayMouseEnter: W, onDayMouseLeave: O, onNextClick: B, onPrevClick: w, showWeekNumber: p, styles: l } = t, { formatCaption: v, formatDay: T, formatMonthDropdown: Y, formatWeekNumber: q, formatWeekNumberHeader: E, formatWeekdayName: C, formatYearDropdown: Z } = r, le = rc(t, a), { days: N, months: g, navStart: k, navEnd: S, previousMonth: b, nextMonth: $, goToMonth: M } = le, R = gi(N, t, k, S, a), { isSelected: G, select: oe, selected: ee } = hc(t, a) ?? {}, { blur: x, focused: j, isFocusTarget: K, moveFocus: re, setFocused: ae } = sc(t, le, R, G ?? (() => !1), a), { labelDayButton: Q, labelGridcell: ce, labelGrid: fe, labelMonthDropdown: Ne, labelNav: Se, labelPrevious: Ie, labelNext: Je, labelWeekday: yt, labelWeekNumber: xt, labelWeekNumberHeader: Ve, labelYearDropdown: Ge } = o, Dt = $e(() => _i(a, t.ISOWeek), [a, t.ISOWeek]), st = c !== void 0 || _ !== void 0, Pe = se(() => {
    b && (M(b), w?.(b));
  }, [b, M, w]), et = se(() => {
    $ && (M($), B?.($));
  }, [M, $, B]), bt = se((J, ge) => (X) => {
    X.preventDefault(), X.stopPropagation(), ae(J), oe?.(J.date, ge, X), _?.(J.date, ge, X);
  }, [oe, _, ae]), tt = se((J, ge) => (X) => {
    ae(J), I?.(J.date, ge, X);
  }, [I, ae]), Le = se((J, ge) => (X) => {
    x(), D?.(J.date, ge, X);
  }, [x, D]), Fe = se((J, ge) => (X) => {
    const me = {
      ArrowLeft: [
        X.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        X.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [X.shiftKey ? "year" : "week", "after"],
      ArrowUp: [X.shiftKey ? "year" : "week", "before"],
      PageUp: [X.shiftKey ? "year" : "month", "before"],
      PageDown: [X.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (me[X.key]) {
      X.preventDefault(), X.stopPropagation();
      const [Ce, ue] = me[X.key];
      re(Ce, ue);
    }
    P?.(J.date, ge, X);
  }, [re, P, t.dir]), wt = se((J, ge) => (X) => {
    W?.(J.date, ge, X);
  }, [W]), vt = se((J, ge) => (X) => {
    O?.(J.date, ge, X);
  }, [O]), kt = se((J) => (ge) => {
    const X = Number(ge.target.value), me = a.setMonth(a.startOfMonth(J), X);
    M(me);
  }, [a, M]), it = se((J) => (ge) => {
    const X = Number(ge.target.value), me = a.setYear(a.startOfMonth(J), X);
    M(me);
  }, [a, M]), { className: Mt, style: ct } = $e(() => ({
    className: [s[L.Root], t.className].filter(Boolean).join(" "),
    style: { ...l?.[L.Root], ...t.style }
  }), [s, t.className, t.style, l]), we = xi(t), dt = _e(null);
  Qi(dt, !!t.animate, {
    classNames: s,
    months: g,
    focused: j,
    dateLib: a
  });
  const Nt = {
    dayPickerProps: t,
    selected: ee,
    select: oe,
    isSelected: G,
    months: g,
    nextMonth: $,
    previousMonth: b,
    goToMonth: M,
    getModifiers: R,
    components: n,
    classNames: s,
    styles: l,
    labels: o,
    formatters: r
  };
  return U.createElement(
    Nr.Provider,
    { value: Nt },
    U.createElement(
      n.Root,
      { rootRef: t.animate ? dt : void 0, className: Mt, style: ct, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...we },
      U.createElement(
        n.Months,
        { className: s[L.Months], style: l?.[L.Months] },
        !t.hideNavigation && !m && U.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: s[L.Nav], style: l?.[L.Nav], "aria-label": Se(), onPreviousClick: Pe, onNextClick: et, previousMonth: b, nextMonth: $ }),
        g.map((J, ge) => U.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: s[L.Month],
            style: l?.[L.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: ge,
            displayIndex: ge,
            calendarMonth: J
          },
          m === "around" && !t.hideNavigation && ge === 0 && U.createElement(
            n.PreviousMonthButton,
            { type: "button", className: s[L.PreviousMonthButton], tabIndex: b ? void 0 : -1, "aria-disabled": b ? void 0 : !0, "aria-label": Ie(b), onClick: Pe, "data-animated-button": t.animate ? "true" : void 0 },
            U.createElement(n.Chevron, { disabled: b ? void 0 : !0, className: s[L.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          U.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: s[L.MonthCaption], style: l?.[L.MonthCaption], calendarMonth: J, displayIndex: ge }, d?.startsWith("dropdown") ? U.createElement(
            n.DropdownNav,
            { className: s[L.Dropdowns], style: l?.[L.Dropdowns] },
            (() => {
              const X = d === "dropdown" || d === "dropdown-months" ? U.createElement(n.MonthsDropdown, { key: "month", className: s[L.MonthsDropdown], "aria-label": Ne(), classNames: s, components: n, disabled: !!t.disableNavigation, onChange: kt(J.date), options: Oi(J.date, k, S, r, a), style: l?.[L.Dropdown], value: a.getMonth(J.date) }) : U.createElement("span", { key: "month" }, Y(J.date, a)), me = d === "dropdown" || d === "dropdown-years" ? U.createElement(n.YearsDropdown, { key: "year", className: s[L.YearsDropdown], "aria-label": Ge(a.options), classNames: s, components: n, disabled: !!t.disableNavigation, onChange: it(J.date), options: Yi(k, S, r, a, !!t.reverseYears), style: l?.[L.Dropdown], value: a.getYear(J.date) }) : U.createElement("span", { key: "year" }, Z(J.date, a));
              return a.getMonthYearOrder() === "year-first" ? [me, X] : [X, me];
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
            } }, v(J.date, a.options, a))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            U.createElement(n.CaptionLabel, { className: s[L.CaptionLabel], role: "status", "aria-live": "polite" }, v(J.date, a.options, a))
          )),
          m === "around" && !t.hideNavigation && ge === f - 1 && U.createElement(
            n.NextMonthButton,
            { type: "button", className: s[L.NextMonthButton], tabIndex: $ ? void 0 : -1, "aria-disabled": $ ? void 0 : !0, "aria-label": Je($), onClick: et, "data-animated-button": t.animate ? "true" : void 0 },
            U.createElement(n.Chevron, { disabled: $ ? void 0 : !0, className: s[L.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          ge === f - 1 && m === "after" && !t.hideNavigation && U.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: s[L.Nav], style: l?.[L.Nav], "aria-label": Se(), onPreviousClick: Pe, onNextClick: et, previousMonth: b, nextMonth: $ }),
          U.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": c === "multiple" || c === "range", "aria-label": fe(J.date, a.options, a) || void 0, className: s[L.MonthGrid], style: l?.[L.MonthGrid] },
            !t.hideWeekdays && U.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: s[L.Weekdays], style: l?.[L.Weekdays] },
              p && U.createElement(n.WeekNumberHeader, { "aria-label": Ve(a.options), className: s[L.WeekNumberHeader], style: l?.[L.WeekNumberHeader], scope: "col" }, E()),
              Dt.map((X) => U.createElement(n.Weekday, { "aria-label": yt(X, a.options, a), className: s[L.Weekday], key: String(X), style: l?.[L.Weekday], scope: "col" }, C(X, a.options, a)))
            ),
            U.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: s[L.Weeks], style: l?.[L.Weeks] }, J.weeks.map((X) => U.createElement(
              n.Week,
              { className: s[L.Week], key: X.weekNumber, style: l?.[L.Week], week: X },
              p && // biome-ignore lint/a11y/useSemanticElements: react component
              U.createElement(n.WeekNumber, { week: X, style: l?.[L.WeekNumber], "aria-label": xt(X.weekNumber, {
                locale: i
              }), className: s[L.WeekNumber], scope: "row", role: "rowheader" }, q(X.weekNumber, a)),
              X.days.map((me) => {
                const { date: Ce } = me, ue = R(me);
                if (ue[ye.focused] = !ue.hidden && !!j?.isEqualTo(me), ue[Ue.selected] = G?.(Ce) || ue.selected, Dn(ee)) {
                  const { from: St, to: Ct } = ee;
                  ue[Ue.range_start] = !!(St && Ct && a.isSameDay(Ce, St)), ue[Ue.range_end] = !!(St && Ct && a.isSameDay(Ce, Ct)), ue[Ue.range_middle] = ze(ee, Ce, !0, a);
                }
                const Lt = Wi(ue, l, t.modifiersStyles), Ee = pi(ue, s, t.modifiersClassNames), qt = !st && !ue.hidden ? ce(Ce, ue, a.options, a) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  U.createElement(n.Day, { key: `${a.format(Ce, "yyyy-MM-dd")}_${a.format(me.displayMonth, "yyyy-MM")}`, day: me, modifiers: ue, className: Ee.join(" "), style: Lt, role: "gridcell", "aria-selected": ue.selected || void 0, "aria-label": qt, "data-day": a.format(Ce, "yyyy-MM-dd"), "data-month": me.outside ? a.format(Ce, "yyyy-MM") : void 0, "data-selected": ue.selected || void 0, "data-disabled": ue.disabled || void 0, "data-hidden": ue.hidden || void 0, "data-outside": me.outside || void 0, "data-focused": ue.focused || void 0, "data-today": ue.today || void 0 }, !ue.hidden && st ? U.createElement(n.DayButton, { className: s[L.DayButton], style: l?.[L.DayButton], type: "button", day: me, modifiers: ue, disabled: ue.disabled || void 0, tabIndex: K(me) ? 0 : -1, "aria-label": Q(Ce, ue, a.options, a), onClick: bt(me, ue), onBlur: Le(me, ue), onFocus: tt(me, ue), onKeyDown: Fe(me, ue), onMouseEnter: wt(me, ue), onMouseLeave: vt(me, ue) }, T(Ce, a.options, a)) : !ue.hidden && T(me.date, a.options, a))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      U.createElement(n.Footer, { className: s[L.Footer], style: l?.[L.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Gn = (e) => {
  const t = e?.from ? Te(e.from) : void 0, n = e?.to ? pt(e.to) : void 0;
  return t && n && n.getTime() < t.getTime() ? { from: t, to: pt(t) } : { from: t, to: n };
}, mc = [
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
function gc({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: o = !1
}) {
  const a = z(jt()), i = Gn(e), s = i.from ? De(i.from) : De(a), [d, c] = ne(i), [m, f] = ne(s), D = () => {
    if (!e.from || !e.to) return !1;
    const w = e.from.getTime() === e.to.getTime(), p = e.from.getTime() === a.getTime() && e.to.getTime() === a.getTime();
    return w && p;
  };
  Me(() => {
    const w = Gn(e);
    c((p) => {
      const l = p.from?.getTime() ?? null, v = p.to?.getTime() ?? null, T = w.from?.getTime() ?? null, Y = w.to?.getTime() ?? null;
      if (l === T && v === Y)
        return p;
      if (w.from) {
        const C = De(w.from);
        f((Z) => Z === C || Z === C - 1 ? Z : C);
      }
      return w;
    });
  }, [e]);
  const _ = (w, p) => {
    if (o) return;
    const l = Et(at(/* @__PURE__ */ new Date(), w), p), v = Te(l), T = pt(l), Y = () => r?.("start"), q = () => r?.("end");
    if (D()) {
      const C = { from: v, to: T };
      c(C), t(C), q();
      return;
    }
    if (n === "end") {
      if (!d.from) {
        const k = { from: v, to: T };
        c(k), t(k), q();
        return;
      }
      const C = d.from, Z = d.to ?? pt(C);
      let le = C, N = T;
      v.getTime() < C.getTime() && (le = v, N = Z);
      const g = { from: le, to: N };
      c(g), t(g), Y();
      return;
    }
    const E = { from: v, to: T };
    c(E), t(E), q();
  }, I = (w, p) => {
    if (!d.from || !d.to || D()) return !1;
    const l = rt(d.from), v = De(d.from), T = rt(d.to), Y = De(d.to), q = w * 12 + p, E = v * 12 + l, C = Y * 12 + T;
    return q >= E && q <= C;
  }, P = (w, p) => {
    if (!d.from || D()) return !1;
    const l = rt(d.from), v = De(d.from);
    return w === v && p === l;
  }, W = (w, p) => {
    if (!d.to || D()) return !1;
    const l = rt(d.to), v = De(d.to);
    return w === v && p === l;
  }, O = (w, p) => !1, B = (w, p, l, v) => /* @__PURE__ */ H("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ H("div", { className: "flex items-center mb-4", style: { ...v }, children: [
      p && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && f(m - 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(Jn, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md ", children: w }),
      l && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !o && f(m + 1),
          disabled: o,
          className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
          children: /* @__PURE__ */ h(Vn, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2", children: mc.map((T, Y) => {
      const q = I(w, Y), E = P(w, Y), C = W(w, Y), Z = E || C, le = O();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !le && !o && _(w, Y),
          disabled: le || o,
          className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors
                  ${le || o ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : Z ? "bg-[#003DB8] text-white" : q ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: T
        },
        T
      );
    }) })
  ] }, w);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ H("div", { className: "flex gap-4 justify-center", children: [
    B(m, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    B(m + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
const pc = ["Q1", "Q2", "Q3", "Q4"];
function yc({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r,
  disabled: o = !1
}) {
  const a = De(e.from), [i, s] = ne(a), d = z(jt()), c = () => {
    const W = e.from.getTime() === e.to.getTime(), O = e.from.getTime() === d.getTime() && e.to.getTime() === d.getTime();
    return W && O;
  }, m = (W, O) => {
    if (o) return;
    const B = Kt(at(/* @__PURE__ */ new Date(), W), O + 1), w = cn(B), p = Nn(B), l = () => r?.("start"), v = () => r?.("end");
    if (c()) {
      t({ from: w, to: p }), v();
      return;
    }
    const T = ut(e.from), Y = De(e.from), q = cn(
      Kt(at(/* @__PURE__ */ new Date(), Y), T)
    ), E = ut(e.to), C = De(e.to), Z = Nn(
      Kt(at(/* @__PURE__ */ new Date(), C), E)
    );
    if (q.getTime(), Z.getTime(), n === "end") {
      if (w.getTime() < q.getTime()) {
        t({ from: w, to: Z }), l();
        return;
      }
      t({ from: q, to: p }), l();
      return;
    }
    t({ from: w, to: p }), v();
  }, f = (W, O) => {
    if (!e.from || !e.to || c()) return !1;
    const B = ut(e.from) - 1, w = De(e.from), p = ut(e.to) - 1, l = De(e.to), v = W * 4 + O, T = w * 4 + B, Y = l * 4 + p;
    return v >= T && v <= Y;
  }, D = (W, O) => {
    if (!e.from || c()) return !1;
    const B = ut(e.from) - 1, w = De(e.from);
    return W === w && O === B;
  }, _ = (W, O) => {
    if (!e.to || c()) return !1;
    const B = ut(e.to) - 1, w = De(e.to);
    return W === w && O === B;
  }, I = (W, O) => !1, P = (W, O, B, w) => /* @__PURE__ */ H("div", { style: { width: "224px", height: "256px" }, children: [
    /* @__PURE__ */ H(
      "div",
      {
        className: "flex items-center justify-center gap-2 mb-4",
        style: { ...w },
        children: [
          O && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !o && s(i - 1),
              disabled: o,
              className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(Jn, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ h("div", { className: "text-center font-semibold text-sm px-3 py-1 rounded-md", children: W }),
          B && /* @__PURE__ */ h(
            "button",
            {
              onClick: () => !o && s(i + 1),
              disabled: o,
              className: `p-1 rounded-md transition-colors ${o ? "cursor-not-allowed opacity-40" : "hover:bg-gray-100"}`,
              children: /* @__PURE__ */ h(Vn, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ h("div", { className: "grid grid-cols-2 gap-3", children: pc.map((p, l) => {
      const v = f(W, l), T = D(W, l), Y = _(W, l), q = T || Y, E = I();
      return /* @__PURE__ */ h(
        "button",
        {
          onClick: () => !E && !o && m(W, l),
          disabled: E || o,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${E || o ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : q ? "bg-[#003DB8] text-white" : v ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: p
        },
        p
      );
    }) })
  ] }, W);
  return /* @__PURE__ */ h("div", { className: "w-full", children: /* @__PURE__ */ H("div", { className: "flex gap-4 justify-center", children: [
    P(i, !0, !1, {
      justifyContent: "start",
      gap: "3rem"
    }),
    P(i + 1, !1, !0, {
      justifyContent: "end",
      gap: "3rem"
    })
  ] }) });
}
function xc({
  unit: e,
  excludeEnabled: t,
  selectedRange: n,
  displayedMonth: r,
  setDisplayedMonth: o,
  dayPickerModifiers: a,
  dayPickerDisabledMatcher: i,
  monthsViewIndex: s,
  setMonthsViewIndex: d,
  monthsViewYear: c,
  setMonthsViewYear: m,
  yearsViewIndex: f,
  setYearsViewIndex: D,
  yearsViewDecade: _,
  setYearsViewDecade: I,
  handleCalendarSelect: P,
  handleResetCalendarSelect: W,
  handleWeekCalendarSelect: O,
  monthQuarterRange: B,
  activeDateField: w,
  setActiveDateField: p,
  onMonthSelect: l,
  onYearSelect: v,
  todayDateObj: T,
  onDayClick: Y,
  endFieldError: q,
  startFieldError: E
}) {
  const C = _e(null), Z = _e(null);
  Me(() => {
    if (e !== "day") return;
    const S = (M, R) => {
      const G = M.querySelector(
        "span[data-month-name]"
      ), oe = M.querySelector(
        "span[data-year-name]"
      );
      if (G) {
        const re = M.textContent || "";
        M.style.gap = "6px", M.style.fontSize = "14px", M.style.fontWeight = "600";
        let ae = "";
        if (oe)
          ae = oe.textContent || "";
        else {
          const Q = re.match(/\d{4}/);
          Q && (ae = Q[0]);
        }
        if (!oe && ae) {
          const Q = document.createElement("span");
          Q.textContent = ae, Q.setAttribute("data-year-name", "true"), Q.style.cursor = "pointer", Q.style.fontSize = "14px", Q.style.fontWeight = "600", Q.onclick = (fe) => {
            fe.stopPropagation(), fe.preventDefault();
            const Ne = parseInt(ae, 10);
            if (!isNaN(Ne)) {
              const Se = Math.floor(Ne / 10) * 10;
              I(Se), D(R), d(null);
            }
          };
          const ce = G.nextSibling;
          if (ce && ce.nodeType === Node.TEXT_NODE)
            ce.parentNode?.insertBefore(Q, ce.nextSibling);
          else {
            const fe = document.createTextNode(" ");
            M.appendChild(fe), M.appendChild(Q);
          }
        } else oe && (oe.onclick = (Q) => {
          Q.stopPropagation(), Q.preventDefault();
          const ce = parseInt(ae, 10);
          if (!isNaN(ce)) {
            const fe = Math.floor(ce / 10) * 10;
            I(fe), D(R), d(null);
          }
        });
        G.onclick = (Q) => {
          Q.stopPropagation(), Q.preventDefault();
          const ce = parseInt(
            (oe?.textContent || "").trim() || re,
            10
          );
          isNaN(ce) || (m(ce), d(R), D(null));
        };
        return;
      }
      const ee = M.textContent || "", x = ee.trim().split(/\s+/);
      let j = "", K = "";
      if (x.length >= 2)
        j = x[0], K = x[1];
      else if (x.length === 1) {
        const re = ee.match(/^([A-Za-z]+)(\d{4})$/);
        if (re)
          j = re[1], K = re[2];
        else
          return;
      } else
        return;
      if (j && K) {
        const re = M.firstChild;
        if (M.style.gap = "6px", re && re.nodeType === Node.TEXT_NODE && (re.textContent || "").indexOf(j) !== -1) {
          const ce = document.createElement("span");
          ce.textContent = j, ce.setAttribute("data-month-name", "true"), ce.style.cursor = "pointer", ce.style.fontSize = "14px", ce.style.fontWeight = "600", ce.onclick = (Se) => {
            Se.stopPropagation(), Se.preventDefault();
            const Ie = parseInt(K, 10);
            isNaN(Ie) || (m(Ie), d(R), D(null));
          };
          const fe = document.createElement("span");
          fe.textContent = K, fe.setAttribute("data-year-name", "true"), fe.style.cursor = "pointer", fe.style.fontSize = "14px", fe.style.fontWeight = "600", fe.onclick = (Se) => {
            Se.stopPropagation(), Se.preventDefault();
            const Ie = parseInt(K, 10);
            if (!isNaN(Ie)) {
              const Je = Math.floor(Ie / 10) * 10;
              I(Je), D(R), d(null);
            }
          }, M.innerHTML = "", M.appendChild(ce);
          const Ne = document.createTextNode(" ");
          M.appendChild(Ne), M.appendChild(fe);
        }
      }
    }, b = (M, R) => {
      if (!M) return;
      M.querySelectorAll(".rdp-caption_label").forEach((oe, ee) => {
        const x = oe, j = R !== null ? R : ee === 0 ? 0 : 1;
        s === j || f === j || S(x, j);
      });
    }, $ = setTimeout(() => {
      s === null && f === null ? b(C.current, null) : (b(C.current, 0), b(Z.current, 1));
    }, 150);
    return () => clearTimeout($);
  }, [
    e,
    r,
    s,
    f,
    d,
    m,
    I,
    D
  ]);
  const le = (S) => {
    const b = S - 1, $ = S + 10, M = De(r), R = [];
    for (let G = b; G <= $; G++)
      R.push(G);
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
                onClick: () => I(_ - 10),
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
              S,
              "-",
              S + 9
            ] }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => I(_ + 10),
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
          /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: R.map((G) => {
            const oe = !ln, ee = G < S || G > S + 9;
            return /* @__PURE__ */ h(
              "button",
              {
                onClick: () => v(G),
                disabled: oe,
                className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center justify-center
                  ${ee ? "opacity-50 text-gray-500" : M === G ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
                type: "button",
                children: G
              },
              G
            );
          }) })
        ]
      }
    );
  }, N = (S) => /* @__PURE__ */ H(
    "div",
    {
      className: "flex flex-col w-full",
      style: { width: "224px", height: "256px" },
      children: [
        /* @__PURE__ */ H("div", { className: "flex items-center justify-between mb-4 h-[32px]", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m(c - 1),
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
          /* @__PURE__ */ h("div", { className: "text-sm font-semibold text-gray-900", children: S }),
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => m(c + 1),
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
        /* @__PURE__ */ h("div", { className: "grid grid-cols-3 gap-2 w-full", children: Ws.map((b, $) => {
          const M = !ln, R = De(r) === S && rt(r) === $;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => l(S, $),
              disabled: M,
              className: `
                  px-3 py-2 text-xs font-medium rounded-md transition-colors flex items-center justify-center
                  ${R ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
              type: "button",
              children: b
            },
            b
          );
        }) })
      ]
    }
  ), g = {
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
  }, k = {
    chevron: "fill-[#1F1F1F] w-4 h-4"
  };
  return /* @__PURE__ */ H(
    "div",
    {
      className: `flex gap-4 justify-center mb-4 h-[264px] ${t ? "excluded-enabled" : "excluded-disabled"} ${e}-picker-calender`,
      children: [
        e === "day" && /* @__PURE__ */ h("div", { className: "flex gap-4 ", children: f !== null ? f === 0 ? /* @__PURE__ */ H(mt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "w-full flex-shrink-0 justify-items-center",
              style: { minWidth: "288px", maxWidth: "280px" },
              children: le(_)
            }
          ),
          /* @__PURE__ */ h("div", { ref: Z, children: /* @__PURE__ */ h(
            ht,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: P,
              modifiers: a,
              month: Te(qe(r, 1)),
              onMonthChange: (S) => {
                const b = new Date(r), M = new Date(S).getMonth() - b.getMonth();
                M !== 1 && M !== -11 && o(Te(qe(S, -1)));
              },
              numberOfMonths: 1,
              disabled: i,
              onDayClick: Y,
              classNames: k,
              className: "text-xs",
              styles: {
                ...g,
                month: {
                  width: "224px",
                  minWidth: "224px",
                  maxWidth: "260px",
                  height: "256px"
                },
                caption: {
                  ...g.caption,
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
        ] }) : /* @__PURE__ */ H(mt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              ref: C,
              className: "day_with_years_picker_left_container",
              children: /* @__PURE__ */ h(
                ht,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: n,
                  onSelect: P,
                  modifiers: a,
                  month: r,
                  onMonthChange: o,
                  numberOfMonths: 1,
                  disabled: i,
                  modifiersClassNames: {
                    selected: "rdp-day_selected bg-[#003DB8]",
                    disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                    excludedWeekday: "rdp-day_excluded-weekday",
                    "excluded-saved-date": "rdp-day_excluded-saved-date",
                    "excluded-specific-date": "rdp-day_excluded-specific-date"
                  },
                  classNames: k,
                  className: "text-xs",
                  styles: {
                    ...g,
                    month: {
                      width: "224px",
                      minWidth: "224px",
                      maxWidth: "260px",
                      height: "256px"
                    },
                    caption: {
                      ...g.caption,
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
              children: le(_)
            }
          )
        ] }) : s === null ? /* @__PURE__ */ h(
          "div",
          {
            ref: C,
            className: "w-full",
            style: { minWidth: 0 },
            children: /* @__PURE__ */ h(
              ht,
              {
                mode: "range",
                navLayout: "around",
                selected: q || E ? void 0 : n,
                onSelect: (S, b) => {
                  W(S, b);
                },
                modifiers: a,
                month: r,
                onMonthChange: o,
                numberOfMonths: 2,
                disabled: i,
                className: "text-xs",
                onDayClick: Y,
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
                classNames: k,
                styles: {
                  ...g,
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
                    ...g.caption,
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
        ) : s === 0 ? /* @__PURE__ */ H(mt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              className: "justify-items-center month_picker_left_container",
              style: { minWidth: "288px", maxWidth: "280px" },
              children: N(c)
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              ref: Z,
              className: "day_picker_right_container",
              children: /* @__PURE__ */ h(
                ht,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: n,
                  onSelect: P,
                  modifiers: a,
                  month: Te(qe(r, 1)),
                  onMonthChange: (S) => {
                    const b = new Date(r), M = new Date(S).getMonth() - b.getMonth();
                    M !== 1 && M !== -11 && o(Te(qe(S, -1)));
                  },
                  numberOfMonths: 1,
                  disabled: i,
                  modifiersClassNames: {
                    selected: "rdp-day_selected bg-[#003DB8]",
                    disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                    excludedWeekday: "rdp-day_excluded-weekday",
                    "excluded-saved-date": "rdp-day_excluded-saved-date",
                    "excluded-specific-date": "rdp-day_excluded-specific-date"
                  },
                  classNames: k,
                  className: "text-xs",
                  styles: {
                    ...g,
                    month: {
                      width: "224px",
                      minWidth: "224px",
                      maxWidth: "260px",
                      height: "256px"
                    },
                    caption: {
                      ...g.caption,
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
        ] }) : /* @__PURE__ */ H(mt, { children: [
          /* @__PURE__ */ h("div", { ref: C, className: "day_picker_left_container", children: /* @__PURE__ */ h(
            ht,
            {
              mode: "range",
              navLayout: "around",
              selected: n,
              onSelect: P,
              modifiers: a,
              month: r,
              onMonthChange: o,
              numberOfMonths: 1,
              disabled: i,
              modifiersClassNames: {
                selected: "rdp-day_selected bg-[#003DB8]",
                disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black",
                excludedWeekday: "rdp-day_excluded-weekday",
                "excluded-saved-date": "rdp-day_excluded-saved-date",
                "excluded-specific-date": "rdp-day_excluded-specific-date"
              },
              classNames: k,
              className: "text-xs",
              styles: {
                ...g,
                month: {
                  width: "224px",
                  minWidth: "224px",
                  maxWidth: "260px",
                  height: "256px"
                },
                caption: {
                  ...g.caption,
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
              children: N(c)
            }
          )
        ] }) }),
        e === "week" && /* @__PURE__ */ h(
          ht,
          {
            mode: "range",
            navLayout: "around",
            showWeekNumber: !0,
            locale: void 0,
            formatters: {
              formatWeekNumber: (S) => `W${String(S).padStart(2, "0")}`
            },
            selected: n,
            onSelect: (S, b) => {
              O(S, b);
            },
            modifiers: a,
            onWeekNumberClick: (S, b) => {
              b && b.length > 0 && O(
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
            disabled: (S) => i(S),
            onDayClick: Y,
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
            classNames: k,
            styles: {
              ...g,
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
                ...g.caption,
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
          gc,
          {
            selectedRange: B,
            onSelect: P,
            activeDateField: w,
            onActiveFieldChange: p,
            disabled: t
          }
        ),
        e === "quarter" && /* @__PURE__ */ h(
          yc,
          {
            selectedRange: B,
            onSelect: P,
            activeDateField: w,
            onActiveFieldChange: p,
            disabled: t
          }
        )
      ]
    }
  );
}
function Dc({
  excludeEnabled: e,
  hasEmptyDates: t,
  hasFutureDates: n,
  allowClear: r = !1,
  onToday: o,
  onClear: a,
  onCancel: i,
  onApply: s
}) {
  const d = e || n || t && !r;
  return /* @__PURE__ */ H("div", { className: "flex items-center justify-between pt-2 pb-2 px-6 border-t border-gray-200", children: [
    /* @__PURE__ */ h("div", {}),
    /* @__PURE__ */ H("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ h(
        "button",
        {
          onClick: a,
          disabled: e,
          className: `px-4 py-2 text-xs font-medium rounded-[4px] transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-gray-600 hover:bg-gray-100"}`,
          children: "Clear dates"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: i,
          disabled: e,
          className: `px-4 py-2 text-xs font-semibold rounded-[4px] transition-colors ${e ? "text-gray-300 cursor-not-allowed bg-gray-100/40" : "text-[#003DB8] hover:bg-gray-100"}`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: s,
          disabled: d,
          className: `px-4 py-2 text-xs font-semibold rounded-[4px] transition-colors ${d ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#003DB8] text-white hover:bg-[#003DB8]"}`,
          children: "Apply"
        }
      )
    ] })
  ] });
}
function bc({
  initialSelection: e,
  onApply: t,
  allowClear: n = !1
}) {
  const r = jt(), o = (e?.excludeFilterTypes || []).filter(
    (u) => u === "days" || u === "saved-dates" || u === "date-range"
  ), [a, i] = ne(
    e?.unit || "day"
  ), [s, d] = ne(
    e?.startDateUtc || r
  ), [c, m] = ne(
    e?.endDateUtc || r
  ), [f, D] = ne(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [_, I] = ne(e?.duration || 1), [P, W] = ne(null), [O, B] = ne(
    e?.excludedWeekdays || []
  ), [w, p] = ne(
    e?.excludedSpecificDates || []
  ), [l, v] = ne(!1), [T, Y] = ne(o), [q, E] = ne(null), [C, Z] = ne(
    e?.excludedSavedDates || []
  ), [le, N] = ne(""), [g, k] = ne(e?.excludedDateRanges || []), [S, b] = ne(() => e?.excludeEnabled ? !0 : !!(o.length > 0 || e?.excludedWeekdays && e.excludedWeekdays.length > 0 || e?.excludedSavedDates && e.excludedSavedDates.length > 0)), $ = _e(
    (e?.excludedSavedDates && e.excludedSavedDates.length > 0 || e?.excludedDateRanges && e.excludedDateRanges.length > 0 || e?.excludedSpecificDates && e.excludedSpecificDates.length > 0) && e?.startDateUtc && e?.endDateUtc ? {
      start: e.startDateUtc,
      end: e.endDateUtc
    } : null
  ), M = _e({
    excludeFilterTypes: o,
    excludedWeekdays: e?.excludedWeekdays || [],
    excludedSpecificDates: e?.excludedSpecificDates || [],
    excludedSavedDates: e?.excludedSavedDates || [],
    excludedDateRanges: e?.excludedDateRanges || []
  }), [R, G] = ne([]), [oe, ee] = ne(void 0), [x, j] = ne(() => e?.startDateUtc ? Te(z(e.startDateUtc)) : Te(z(r))), [K, re] = ne(null), [ae, Q] = ne(() => e?.startDateUtc ? De(z(e.startDateUtc)) : De(z(r))), [ce, fe] = ne(null), [Ne, Se] = ne(() => {
    if (e?.startDateUtc) {
      const y = De(z(e.startDateUtc));
      return Math.floor(y / 10) * 10;
    }
    const u = De(z(r));
    return Math.floor(u / 10) * 10;
  }), [Ie, Je] = ne(!1), [yt, xt] = ne(!1), Ve = $e(() => {
    if (!s || !c) return a;
    if (a === "day") return "day";
    const u = z(s), y = z(c), F = pe(y, 1), A = (V) => {
      if (V === "day") return !0;
      if (V === "week") {
        const te = mn(F, u);
        return te > 0 && te % 7 === 0;
      }
      if (V === "month") {
        const te = gn(F, u);
        return te > 0 && qe(u, te).getTime() === F.getTime();
      }
      if (V === "quarter") {
        const te = dr(F, u);
        return te > 0 && or(u, te).getTime() === F.getTime();
      }
      return !1;
    };
    return a === "quarter" ? A("quarter") ? "quarter" : A("month") ? "month" : A("week") ? "week" : "day" : a === "month" ? A("month") ? "month" : A("week") ? "week" : "day" : a === "week" ? A("week") ? "week" : "day" : a;
  }, [a, s, c]);
  Me(() => {
    if (s && c) {
      const u = br(
        s,
        c,
        Ve,
        O
      );
      I(u);
    } else
      I(1);
  }, [s, c, Ve, O]), Me(() => {
    if (l || !s || !c || !$.current || !(C.length > 0 || w.length > 0 || g.length > 0))
      return;
    const y = $.current;
    (s > y.end || c < y.start) && (Z([]), p([]), k([]), Y((A) => A.filter((V) => V === "days")), M.current && (M.current = {
      ...M.current,
      excludedSavedDates: [],
      excludedSpecificDates: [],
      excludedDateRanges: [],
      excludeFilterTypes: M.current.excludeFilterTypes.filter(
        (A) => A === "days"
      )
    }), $.current = null, b(O.length > 0));
  }, [
    s,
    c,
    l,
    C,
    w,
    g,
    O
  ]), Me(() => {
    (async () => {
      await gt.init();
      const y = await gt.getData(
        "savedDateRanges"
      );
      y && G(y);
    })();
  }, []), Me(() => {
    s && !c ? D("end") : !s && c && D("start");
  }, [s, c]), Me(() => {
    K === null && Q(De(x));
  }, [x, K]), Me(() => {
    q !== "saved-dates" && N("");
  }, [q]);
  const Ge = se(
    (u) => {
      if (C.length === 0) return !1;
      const y = de(u);
      return C.some((F) => {
        const A = R.find((te) => te.id === F);
        return !A || !(y >= A.selection.startDateUtc && y <= A.selection.endDateUtc) ? !1 : (A.selection.excludedWeekdays && A.selection.excludedWeekdays.length > 0 && A.selection.excludedWeekdays.includes(u.getDay()) || A.selection.excludedSpecificDates && A.selection.excludedSpecificDates.length > 0 && A.selection.excludedSpecificDates.includes(y) || A.selection.excludedSavedDates && A.selection.excludedSavedDates.some(
          (Be) => {
            const lt = R.find(
              (Ut) => Ut.id === Be
            );
            return lt ? y >= lt.selection.startDateUtc && y <= lt.selection.endDateUtc : !1;
          }
        ) || A.selection.excludedDateRanges && A.selection.excludedDateRanges.some(
          (Be) => y >= Be.start && y <= Be.end
        ), !0);
      });
    },
    [C, R]
  ), Dt = $e(() => {
    const u = {};
    return O.length > 0 && (u.excludedWeekday = {
      dayOfWeek: O
    }), C.length > 0 && (u["excluded-saved-date"] = Ge), w.length > 0 && (u["excluded-specific-date"] = (y) => w.includes(de(y))), g.length > 0 && (u["excluded-range"] = (y) => {
      const F = de(y);
      return g.some(
        (A) => F >= A.start && F <= A.end
      );
    }), P && (u["exclude-range-start"] = (y) => de(y) === P), u;
  }, [
    C,
    O,
    Ge,
    w,
    g,
    P
  ]), st = $e(
    () => ({
      from: s ? z(s) : void 0,
      to: c ? z(c) : void 0
    }),
    [s, c]
  ), Pe = $e(() => z(r), [r]), et = $e(
    () => ({
      from: s ? z(s) : Pe,
      to: c ? z(c) : Pe
    }),
    [c, s, Pe]
  ), bt = $e(() => {
    const u = le.trim().toLowerCase();
    return u ? R.filter((y) => {
      const F = (/* @__PURE__ */ new Date(y.selection.startDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase(), A = (/* @__PURE__ */ new Date(y.selection.endDateUtc + "T00:00:00")).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).toLowerCase();
      return y.label.toLowerCase().includes(u) || `${F} - ${A}`.includes(u);
    }) : R;
  }, [R, le]), tt = $e(
    () => !s || s.trim() === "" || !c || c.trim() === "",
    [c, s]
  ), Le = $e(() => !1, [c, s, r]), Fe = se(
    (u) => u.filter(
      (y) => y === "days" || y === "saved-dates" || y === "date-range"
    ),
    []
  ), wt = se(
    (u) => {
      if (u) {
        v(!0), i("day");
        const y = M.current, F = Fe(
          y.excludeFilterTypes
        );
        Y([...F]), B([...y.excludedWeekdays]), p([...y.excludedSpecificDates]), Z([...y.excludedSavedDates]), k([...y.excludedDateRanges]), E(null);
      } else {
        const y = M.current, F = Fe(
          y.excludeFilterTypes
        );
        Y([...F]), B([...y.excludedWeekdays]), p([...y.excludedSpecificDates]), Z([...y.excludedSavedDates]), k([...y.excludedDateRanges]), b(
          F.length > 0 || y.excludedWeekdays.length > 0 || y.excludedSavedDates.length > 0
        ), v(!1), E(null), W(null);
      }
    },
    [Fe]
  ), vt = se(
    (u) => {
      l && (T.includes(u) || Y([...T, u]), E((y) => y === u ? null : u));
    },
    [l, T]
  ), kt = se(
    (u) => {
      if (!l) return;
      const y = T.filter((F) => F !== u);
      if (Y(y), u === "days" && B([]), u === "saved-dates" && Z([]), u === "date-range" && k([]), q === u) {
        const F = y.find(
          (A) => A === "days" || A === "saved-dates"
        );
        E(
          F ?? null
        );
      }
    },
    [q, l, T]
  ), it = se(() => {
    const u = M.current, y = Fe(
      u.excludeFilterTypes
    );
    Y([...y]), B([...u.excludedWeekdays]), p([...u.excludedSpecificDates]), Z([...u.excludedSavedDates]), k([...u.excludedDateRanges]), b(
      y.length > 0 || u.excludedWeekdays.length > 0 || u.excludedSavedDates.length > 0
    ), v(!1), E(null), W(null);
  }, [Fe]), Mt = se(() => {
    const u = O.length > 0, y = C.length > 0, F = g.length > 0, A = w.length > 0, V = [];
    u && V.push("days"), y && V.push("saved-dates"), F && V.push("date-range"), A && V.push("specific-date");
    const te = u ? [...O] : [], Be = A ? [...w] : [], lt = y ? [...C] : [], Ut = F ? [...g] : [];
    M.current = {
      excludeFilterTypes: V,
      excludedWeekdays: te,
      excludedSpecificDates: Be,
      excludedSavedDates: lt,
      excludedDateRanges: Ut
    }, s && c && ($.current = { start: s, end: c });
    const Hr = Fe(V);
    Y(Hr), B(te), p(Be), Z(lt), k(Ut), b(V.length > 0), v(!1), E(null), W(null);
  }, [
    g,
    C,
    O,
    w,
    Fe,
    s,
    c
  ]), ct = se(
    (u) => {
      B((y) => y.includes(u) ? y.filter((F) => F !== u) : [...y, u]), l && Y((y) => y.includes("days") ? y : [...y, "days"]);
    },
    [l]
  ), we = se((u) => {
    u && j(Te(z(u)));
  }, []), dt = se(
    (u) => {
      l || (d(u), u ? c || D("end") : D("start"), u && c && z(u) > z(c) && m(u), we(u));
    },
    [c, l, we]
  ), Nt = se(
    (u) => {
      l || (m(u), u ? s || D("start") : D("end"), u && s && z(u) < z(s) && d(u), we(u));
    },
    [l, s, we]
  ), J = se(
    (u) => {
      if (!(l || u <= 0)) {
        if (I(u), s) {
          let y = s;
          if (a === "week" || a === "month" || a === "quarter") {
            const A = z(s);
            let V = A;
            a === "week" ? V = xe(A, {
              weekStartsOn: ve
            }) : a === "month" ? V = Te(A) : a === "quarter" && (V = cn(A));
            const te = de(V);
            te !== s && (d(te), y = te);
          }
          const F = hs(
            y,
            a,
            u,
            O
          );
          m(F), we(F);
        } else if (c) {
          const y = ms(
            c,
            a,
            u,
            O
          );
          d(y), we(y);
        }
        D("start");
      }
    },
    [
      c,
      l,
      O,
      s,
      a,
      we
    ]
  ), ge = se(
    (u) => {
      l || (i(u), (u === "day" || u === "week") && s && j(Te(z(s))));
    },
    [l, s]
  ), X = se(
    (u, y) => {
      l || (d(u), m(y), D("start"), we(u));
    },
    [l, we]
  ), me = se(
    (u) => {
      if (l) return;
      d(u.startDateUtc), m(u.endDateUtc), i(u.unit);
      const y = u.excludedWeekdays || [];
      B(y), I(u.duration), D("start");
      const F = (u.excludeFilterTypes || []).filter(
        (Be) => Be === "days" || Be === "saved-dates" || Be === "date-range"
      ), A = u.excludedSpecificDates || [], V = u.excludedSavedDates || [], te = u.excludedDateRanges || [];
      Y(F), p(A), Z(V), k(te), u.startDateUtc && u.endDateUtc && ($.current = {
        start: u.startDateUtc,
        end: u.endDateUtc
      }), M.current = {
        excludeFilterTypes: F,
        excludedWeekdays: y,
        excludedSpecificDates: A,
        excludedSavedDates: V,
        excludedDateRanges: te
      }, b(
        F.length > 0 || y.length > 0 || V.length > 0
      ), v(!1), E(null), u.startDateUtc && we(u.startDateUtc);
    },
    [l, we]
  ), Ce = se(() => {
    l || (d(r), m(r), B([]), D("start"), we(r));
  }, [l, r, we]), ue = se(() => {
    l || (d(""), m(""), I(1), B([]), D("start"), v(!1), Y([]), p([]), Z([]), k([]), E(null), M.current = {
      excludeFilterTypes: [],
      excludedWeekdays: [],
      excludedSpecificDates: [],
      excludedSavedDates: [],
      excludedDateRanges: []
    }, b(!1), we(r));
  }, [l, r, we]), Lt = se(() => {
    if (l || Le) return;
    if (tt) {
      n && t(null);
      return;
    }
    const u = wr(
      s,
      c,
      a,
      O,
      S,
      T,
      w,
      C,
      g
    );
    t(u);
  }, [
    n,
    c,
    S,
    l,
    T,
    g,
    C,
    w,
    O,
    tt,
    Le,
    t,
    s,
    a
  ]), Ee = se(
    (u) => {
      if (!l && u?.from) {
        const y = de(u.from);
        if (d(y), u?.to) {
          const F = de(u.to);
          m(F), D("start");
        } else
          m(y), D("end");
      }
    },
    [l]
  ), qt = se(
    (u, y) => {
      if (!l) {
        if (s && c && u?.to) {
          const F = de(y);
          f === "start" ? z(c).getTime() > z(F).getTime() ? d(F) : (d(F), m("")) : z(s).getTime() > z(F).getTime() ? (m(s), d(F)) : (m(F), d(s)), D(f === "start" ? "end" : "start");
          return;
        }
        if (!s && c && u?.from) {
          m(de(u?.from)), D("start");
          return;
        }
        if (!s && !c && u?.from) {
          d(de(u?.from)), m(""), D("end");
          return;
        }
        if (u?.from) {
          const F = de(u.from);
          if (d(F), u?.to) {
            const A = de(u.to);
            m(A), D("start");
          } else
            m(F), D("end");
        }
      }
    },
    [f, c, l, s]
  ), St = se(
    (u, y) => {
      if (!(l || !u) && u.from) {
        let F = xe(u.from, {
          weekStartsOn: ve
        }), A = pe(F, 6);
        if (s && c)
          if (f === "start")
            if (z(de(y)).getTime() > z(c).getTime() && z(de(y)).getTime() > z(s).getTime())
              F = xe(y, {
                weekStartsOn: ve
              }), A = pe(F, 6), Ee({ from: F, to: A });
            else if (z(de(y)).getTime() < z(c).getTime() && z(de(y)).getTime() < z(s).getTime()) {
              F = xe(y, {
                weekStartsOn: ve
              }), A = pe(F, 6);
              const V = xe(c, {
                weekStartsOn: ve
              }), te = pe(V, 6);
              Ee({ from: F, to: te });
            } else if (z(de(y)).getTime() > z(s).getTime() && z(de(y)).getTime() < z(c).getTime()) {
              F = xe(y, {
                weekStartsOn: ve
              }), A = pe(F, 6);
              const V = xe(c, {
                weekStartsOn: ve
              }), te = pe(V, 6);
              Ee({ from: F, to: te });
            } else
              F = xe(y, {
                weekStartsOn: ve
              }), A = pe(y, 6), Ee({ from: F, to: A });
          else if (z(de(y)).getTime() > z(c).getTime()) {
            F = xe(u.from, {
              weekStartsOn: ve
            }), A = pe(F, 6);
            const V = xe(y, {
              weekStartsOn: ve
            }), te = pe(V, 6);
            Ee({ from: F, to: te });
          } else if (z(de(y)).getTime() < z(c).getTime() && z(de(y)).getTime() < z(s).getTime()) {
            F = xe(y, {
              weekStartsOn: ve
            }), A = pe(F, 6);
            const V = xe(s, {
              weekStartsOn: ve
            }), te = pe(V, 6);
            Ee({ from: F, to: te });
          } else {
            F = xe(s, {
              weekStartsOn: ve
            }), A = pe(F, 6);
            const V = xe(y, {
              weekStartsOn: ve
            }), te = pe(V, 6);
            Ee({ from: F, to: te });
          }
        if (u.to && (!s || !c)) {
          const V = xe(u.to, {
            weekStartsOn: ve
          }), te = pe(V, 6);
          Ee({ from: F, to: te });
        }
        D(f === "start" ? "end" : "start");
      }
    },
    [
      f,
      c,
      l,
      Ee,
      s
    ]
  ), Ct = se(
    (u) => {
      if (l) {
        if (!s || !c) return !0;
        const V = de(u);
        return V < s || V > c;
      }
      de(u);
      const y = !ln, F = l && T.includes("days") && O.includes(u.getDay()), A = l && T.includes("saved-dates") && Ge(u);
      return y || F || A;
    },
    [
      l,
      T,
      O,
      Ge,
      r,
      s,
      c
    ]
  ), Ir = se(() => {
    if (!Le) return null;
    const u = s && s > r, y = c && c > r;
    return u && y ? "Start date and end date cannot be in the future." : u ? "Start date cannot be in the future." : y ? "End date cannot be in the future." : null;
  }, [c, Le, s, r]), Br = se((u, y) => {
    const F = Te(
      Et(at(/* @__PURE__ */ new Date(), u), y)
    );
    j(F), re(null), Q(u);
  }, []), Ur = se(
    (u) => {
      const y = rt(x), F = Te(
        Et(at(/* @__PURE__ */ new Date(), u), y)
      );
      j(F), fe(null), Se(Math.floor(u / 10) * 10);
    },
    [x]
  ), Pr = se(
    (u) => {
      if (!l) return;
      const y = de(u);
      if (!(s && c && (y < s || y > c)))
        if (P) {
          const F = y < P ? y : P, A = y < P ? P : y, V = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            start: F,
            end: A
          };
          k((te) => [...te, V]), W(null), Y((te) => te.includes("date-range") ? te : [...te, "date-range"]);
        } else
          W(y);
    },
    [l, s, c, P]
  );
  return {
    today: r,
    unit: a,
    displayUnit: Ve,
    startDateUtc: s,
    endDateUtc: c,
    activeDateField: f,
    duration: _,
    excludedWeekdays: O,
    excludedSpecificDates: w,
    excludeEnabled: l,
    excludeFilterTypes: T,
    activeFilterView: q,
    excludedSavedDates: C,
    savedDatesSearchTerm: le,
    excludedDateRanges: g,
    savedDatesForFilter: R,
    displayedMonth: x,
    monthsViewIndex: K,
    monthsViewYear: ae,
    yearsViewIndex: ce,
    yearsViewDecade: Ne,
    excludeApplied: S,
    hasFutureDates: Le,
    hasEmptyDates: tt,
    dayPickerModifiers: Dt,
    selectedRange: st,
    todayDateObj: Pe,
    monthQuarterRange: et,
    filteredSavedDates: bt,
    dayPickerDisabledMatcher: Ct,
    getFutureDateWarning: Ir,
    setActiveDateField: D,
    setSavedDatesSearchTerm: N,
    setMonthsViewIndex: re,
    setYearsViewIndex: fe,
    setYearsViewDecade: Se,
    setMonthsViewYear: Q,
    setDisplayedMonth: j,
    handleStartDateChange: dt,
    handleEndDateChange: Nt,
    handleDurationChange: J,
    handleUnitChange: ge,
    handlePresetSelect: X,
    handleSavedDateSelect: me,
    handleToday: Ce,
    handleClear: ue,
    handleApply: Lt,
    handleCalendarSelect: Ee,
    handleResetCalendarSelect: qt,
    handleWeekCalendarSelect: St,
    handleExcludeToggle: wt,
    handleExcludeFilterButtonClick: vt,
    handleExcludeRemoveType: kt,
    handleExcludeCancel: it,
    handleExcludeSave: Mt,
    toggleWeekday: ct,
    setExcludedSavedDates: Z,
    setExcludedSpecificDates: p,
    setExcludedDateRanges: k,
    setExcludeFilterTypes: Y,
    setActiveFilterView: E,
    excludeSavedStateRef: M,
    sanitizeExcludeFilterTypes: Fe,
    handleMonthSelect: Br,
    handleYearSelect: Ur,
    handleDayClick: Pr,
    excludeSelectionStart: P,
    endFieldError: Ie,
    setEndFieldError: Je,
    startFieldError: yt,
    setStartFieldError: xt
  };
}
function Wc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  allowClear: r = !1,
  themeColors: o
}) {
  const {
    unit: a,
    displayUnit: i,
    startDateUtc: s,
    endDateUtc: d,
    activeDateField: c,
    duration: m,
    excludedWeekdays: f,
    excludedSpecificDates: D,
    excludeEnabled: _,
    excludeFilterTypes: I,
    activeFilterView: P,
    excludedSavedDates: W,
    savedDatesSearchTerm: O,
    excludedDateRanges: B,
    displayedMonth: w,
    monthsViewIndex: p,
    monthsViewYear: l,
    yearsViewIndex: v,
    yearsViewDecade: T,
    excludeApplied: Y,
    hasFutureDates: q,
    hasEmptyDates: E,
    dayPickerModifiers: C,
    selectedRange: Z,
    todayDateObj: le,
    monthQuarterRange: N,
    savedDatesForFilter: g,
    filteredSavedDates: k,
    dayPickerDisabledMatcher: S,
    getFutureDateWarning: b,
    setActiveDateField: $,
    setSavedDatesSearchTerm: M,
    setMonthsViewIndex: R,
    setYearsViewIndex: G,
    setYearsViewDecade: oe,
    setMonthsViewYear: ee,
    setDisplayedMonth: x,
    handleStartDateChange: j,
    handleEndDateChange: K,
    handleDurationChange: re,
    handleUnitChange: ae,
    handlePresetSelect: Q,
    handleSavedDateSelect: ce,
    handleToday: fe,
    handleClear: Ne,
    handleApply: Se,
    handleCalendarSelect: Ie,
    handleResetCalendarSelect: Je,
    handleWeekCalendarSelect: yt,
    handleExcludeToggle: xt,
    handleExcludeFilterButtonClick: Ve,
    handleExcludeRemoveType: Ge,
    handleExcludeCancel: Dt,
    handleExcludeSave: st,
    toggleWeekday: Pe,
    setExcludedSavedDates: et,
    setExcludedSpecificDates: bt,
    setExcludedDateRanges: tt,
    setExcludeFilterTypes: Le,
    setActiveFilterView: Fe,
    handleMonthSelect: wt,
    handleYearSelect: vt,
    handleDayClick: kt,
    endFieldError: it,
    setEndFieldError: Mt,
    startFieldError: ct,
    setStartFieldError: we
  } = bc({
    initialSelection: e,
    onApply: t,
    allowClear: r
  }), dt = {
    height: "auto",
    minHeight: _s,
    width: nn,
    minWidth: nn,
    maxWidth: nn,
    overflow: "visible",
    ...o
  }, Nt = wr(
    s,
    d,
    a,
    f,
    Y,
    I,
    D,
    W,
    B
  ), J = b();
  return /* @__PURE__ */ H(
    "div",
    {
      className: "flex bg-white rounded-xl shadow-xl border border-gray-200",
      style: dt,
      children: [
        /* @__PURE__ */ h(
          ws,
          {
            onPresetSelect: Q,
            onSavedDateSelect: ce,
            currentSelection: Nt,
            themeColors: o || {},
            disabled: _
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
                  Os,
                  {
                    unit: a,
                    excludeEnabled: _,
                    onUnitChange: ae
                  }
                ),
                /* @__PURE__ */ h(
                  Cs,
                  {
                    startDateUtc: s,
                    endDateUtc: d,
                    duration: m,
                    unit: i,
                    selectedUnit: a,
                    excludeEnabled: _,
                    activeDateField: c,
                    onStartDateChange: j,
                    onEndDateChange: K,
                    onDurationChange: re,
                    onActiveFieldChange: $,
                    endFieldError: it,
                    setEndFieldError: Mt,
                    startFieldError: ct,
                    setStartFieldError: we
                  }
                ),
                q && J && /* @__PURE__ */ H("div", { className: "mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2", children: [
                  /* @__PURE__ */ h(lo, { className: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" }),
                  /* @__PURE__ */ h("p", { className: "text-sm text-amber-800", children: J })
                ] }),
                /* @__PURE__ */ h(
                  Ys,
                  {
                    excludeEnabled: _,
                    excludeFilterTypes: I,
                    activeFilterView: P,
                    excludedWeekdays: f,
                    excludedSavedDates: W,
                    excludedSpecificDates: D,
                    excludedDateRanges: B,
                    savedDatesSearchTerm: O,
                    filteredSavedDates: k,
                    savedDatesForFilter: g,
                    onExcludeToggle: xt,
                    onFilterButtonClick: Ve,
                    onRemoveFilterType: Ge,
                    onCancel: Dt,
                    onSave: st,
                    onToggleWeekday: Pe,
                    setSavedDatesSearchTerm: M,
                    setExcludedSavedDates: et,
                    setExcludedSpecificDates: bt,
                    setExcludedDateRanges: tt,
                    setExcludeFilterTypes: Le,
                    setActiveFilterView: Fe
                  }
                ),
                /* @__PURE__ */ h(
                  xc,
                  {
                    unit: a,
                    excludeEnabled: _,
                    selectedRange: Z,
                    displayedMonth: w,
                    setDisplayedMonth: x,
                    dayPickerModifiers: C,
                    dayPickerDisabledMatcher: S,
                    monthsViewIndex: p,
                    setMonthsViewIndex: R,
                    monthsViewYear: l,
                    setMonthsViewYear: ee,
                    yearsViewIndex: v,
                    setYearsViewIndex: G,
                    yearsViewDecade: T,
                    setYearsViewDecade: oe,
                    handleCalendarSelect: Ie,
                    handleResetCalendarSelect: Je,
                    handleWeekCalendarSelect: yt,
                    monthQuarterRange: N,
                    activeDateField: c,
                    setActiveDateField: $,
                    onMonthSelect: wt,
                    onYearSelect: vt,
                    todayDateObj: le,
                    onDayClick: kt,
                    endFieldError: it,
                    startFieldError: ct
                  }
                )
              ] }),
              /* @__PURE__ */ h(
                Dc,
                {
                  excludeEnabled: _,
                  hasEmptyDates: E,
                  hasFutureDates: q,
                  allowClear: r,
                  onToday: fe,
                  onClear: Ne,
                  onCancel: n,
                  onApply: Se
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
  Wc as AdvancedDateRangePicker,
  Sc as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  Cc as WEEK_NUMBERING_MODE,
  ve as WEEK_STARTS_ON,
  br as calcDurationFromRange,
  hs as calcEndFromDuration,
  ms as calcStartFromDuration,
  wr as createSelection,
  Tc as formatDisplayDate,
  de as formatUtc,
  ys as getPresets,
  jt as getTodayUtc,
  ps as getUnitAbbreviation,
  Oc as parseDisplayDate,
  z as parseUtc
};
