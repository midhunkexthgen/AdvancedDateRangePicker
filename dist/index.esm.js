import { jsxs as v, jsx as f, Fragment as ct } from "react/jsx-runtime";
import C, { createContext as vr, useContext as kr, useCallback as ye, useRef as Me, useLayoutEffect as Mr, useState as B, useEffect as Ye, useMemo as Bt, forwardRef as Fn, createElement as Xt } from "react";
function Nr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Sr = {}, lt = {};
function Ve(e, t) {
  try {
    const r = (Sr[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in lt ? lt[r] : ln(r, r.split(":"));
  } catch {
    if (e in lt) return lt[e];
    const n = e?.match(Or);
    return n ? ln(e, n.slice(1)) : NaN;
  }
}
const Or = /([+-]\d\d):?(\d\d)?/;
function ln(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return lt[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class Ne extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Ve(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Pn(this), Jt(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Ne(...n, t) : new Ne(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Ne(+this, t);
  }
  getTimezoneOffset() {
    const t = -Ve(this.timeZone, this);
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
    return new Ne(+new Date(t), this.timeZone);
  }
  //#endregion
}
const dn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!dn.test(e)) return;
  const t = e.replace(dn, "$1UTC");
  Ne.prototype[t] && (e.startsWith("get") ? Ne.prototype[e] = function() {
    return this.internal[t]();
  } : (Ne.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Cr(this), +this;
  }, Ne.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Jt(this), +this;
  }));
});
function Jt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Ve(e.timeZone, e) * 60));
}
function Cr(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Pn(e);
}
function Pn(e) {
  const t = Ve(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = s - o, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const l = s - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const g = s > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, u = Math.round(-(Ve(e.timeZone, e) * 60)) % 60;
  (u || g) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + g));
  const y = Ve(e.timeZone, e), h = y > 0 ? Math.floor(y) : Math.ceil(y), N = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, M = h !== n, m = N - l;
  if (M && m) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + m);
    const w = Ve(e.timeZone, e), O = w > 0 ? Math.floor(w) : Math.ceil(w), D = h - O;
    D && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + D), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + D));
  }
}
class oe extends Ne {
  //#region static
  static tz(t, ...n) {
    return n.length ? new oe(...n, t) : new oe(Date.now(), t);
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
    return `${t} GMT${n}${r}${s} (${Nr(this.timeZone, this)})`;
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
    return new oe(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new oe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Un = 6048e5, Tr = 864e5, $n = 6e4, Bn = 36e5, un = Symbol.for("constructDateFrom");
function z(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && un in e ? e[un](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function P(e, t) {
  return z(t || e, e);
}
function Se(e, t, n) {
  const r = P(e, n?.in);
  return isNaN(t) ? z(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ee(e, t, n) {
  const r = P(e, n?.in);
  if (isNaN(t)) return z(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), o = z(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const i = o.getDate();
  return s >= i ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    s
  ), r);
}
let Wr = {};
function mt() {
  return Wr;
}
function Fe(e, t) {
  const n = mt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = P(e, t?.in), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function dt(e, t) {
  return Fe(e, { ...t, weekStartsOn: 1 });
}
function An(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = z(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const o = dt(s), i = z(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = dt(i);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function fn(e) {
  const t = P(e), n = new Date(
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
  const n = z.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ut(e, t) {
  const n = P(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function nn(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  ), o = ut(r), i = ut(s), a = +o - fn(o), l = +i - fn(i);
  return Math.round((a - l) / Tr);
}
function Yr(e, t) {
  const n = An(e, t), r = z(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), dt(r);
}
function Hn(e, t, n) {
  return Ee(e, t * 3, n);
}
function rn(e, t, n) {
  return Se(e, t * 7, n);
}
function Er(e, t, n) {
  return Ee(e, t * 12, n);
}
function _r(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = z.bind(null, s));
    const o = P(s, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), z(r, n || NaN);
}
function Ir(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = z.bind(null, s));
    const o = P(s, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), z(r, n || NaN);
}
function At(e, t) {
  const n = +P(e) - +P(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Fr(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  );
  return +ut(r) == +ut(s);
}
function Rn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Pr(e) {
  return !(!Rn(e) && typeof e != "number" || isNaN(+P(e)));
}
function qn(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  ), o = r.getFullYear() - s.getFullYear(), i = r.getMonth() - s.getMonth();
  return o * 12 + i;
}
function Nt(e, t) {
  const n = P(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function jn(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  ), o = hn(r, s), i = Math.abs(
    nn(r, s)
  );
  r.setDate(r.getDate() - o * i);
  const a = +(hn(r, s) === -o), l = o * (i - a);
  return l === 0 ? 0 : l;
}
function hn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Ln(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function Ur(e, t) {
  const n = P(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function Zn(e, t) {
  const n = P(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function $r(e, t) {
  const n = P(e, t?.in);
  return +Ur(n, t) == +Zn(n, t);
}
function zn(e, t, n) {
  const [r, s, o] = Re(
    n?.in,
    e,
    e,
    t
  ), i = At(s, o), a = Math.abs(
    qn(s, o)
  );
  if (a < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - i * a);
  let l = At(s, o) === -i;
  $r(r) && a === 1 && At(r, o) === 1 && (l = !1);
  const d = i * (a - +l);
  return d === 0 ? 0 : d;
}
function Br(e, t, n) {
  const r = zn(e, t, n) / 3;
  return Ln()(r);
}
function Ar(e, t, n) {
  const r = jn(e, t, n) / 7;
  return Ln()(r);
}
function sn(e, t) {
  const [n, r] = Re(e, t.start, t.end);
  return { start: n, end: r };
}
function Qn(e, t) {
  const { start: n, end: r } = sn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(z(n, i)), i.setDate(i.getDate() + a), i.setHours(0, 0, 0, 0);
  return s ? l.reverse() : l;
}
function Hr(e, t) {
  const { start: n, end: r } = sn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(z(n, i)), i.setMonth(i.getMonth() + a);
  return s ? l.reverse() : l;
}
function Rr(e, t) {
  const n = P(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function te(e, t) {
  const n = P(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function qr(e, t) {
  const n = P(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function on(e, t) {
  const n = P(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function jr(e, t) {
  const { start: n, end: r } = sn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(z(n, i)), i.setFullYear(i.getFullYear() + a);
  return s ? l.reverse() : l;
}
function Vn(e, t) {
  const n = mt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = P(e, t?.in), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Lr(e, t) {
  return Vn(e, { ...t, weekStartsOn: 1 });
}
const Zr = {
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
}, zr = (e, t, n) => {
  let r;
  const s = Zr[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Ht(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Qr = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Vr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Gr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Kr = {
  date: Ht({
    formats: Qr,
    defaultWidth: "full"
  }),
  time: Ht({
    formats: Vr,
    defaultWidth: "full"
  }),
  dateTime: Ht({
    formats: Gr,
    defaultWidth: "full"
  })
}, Xr = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Jr = (e, t, n, r) => Xr[e];
function ot(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let s;
    if (r === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth, a = n?.width ? String(n.width) : i;
      s = e.formattingValues[a] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth, a = n?.width ? String(n.width) : e.defaultWidth;
      s = e.values[a] || e.values[i];
    }
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return s[o];
  };
}
const es = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ts = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ns = {
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
}, rs = {
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
}, ss = {
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
}, os = {
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
}, as = (e, t) => {
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
}, is = {
  ordinalNumber: as,
  era: ot({
    values: es,
    defaultWidth: "wide"
  }),
  quarter: ot({
    values: ts,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: ot({
    values: ns,
    defaultWidth: "wide"
  }),
  day: ot({
    values: rs,
    defaultWidth: "wide"
  }),
  dayPeriod: ot({
    values: ss,
    defaultWidth: "wide",
    formattingValues: os,
    defaultFormattingWidth: "wide"
  })
};
function at(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(s);
    if (!o)
      return null;
    const i = o[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? ls(a, (u) => u.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      cs(a, (u) => u.test(i))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(l) : l, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const g = t.slice(i.length);
    return { value: d, rest: g };
  };
}
function cs(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function ls(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ds(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const s = r[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const a = t.slice(s.length);
    return { value: i, rest: a };
  };
}
const us = /^(\d+)(th|st|nd|rd)?/i, fs = /\d+/i, hs = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ms = {
  any: [/^b/i, /^(a|c)/i]
}, gs = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, ys = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ps = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, bs = {
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
}, Ds = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ws = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, xs = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, vs = {
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
}, ks = {
  ordinalNumber: ds({
    matchPattern: us,
    parsePattern: fs,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: at({
    matchPatterns: hs,
    defaultMatchWidth: "wide",
    parsePatterns: ms,
    defaultParseWidth: "any"
  }),
  quarter: at({
    matchPatterns: gs,
    defaultMatchWidth: "wide",
    parsePatterns: ys,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: at({
    matchPatterns: ps,
    defaultMatchWidth: "wide",
    parsePatterns: bs,
    defaultParseWidth: "any"
  }),
  day: at({
    matchPatterns: Ds,
    defaultMatchWidth: "wide",
    parsePatterns: ws,
    defaultParseWidth: "any"
  }),
  dayPeriod: at({
    matchPatterns: xs,
    defaultMatchWidth: "any",
    parsePatterns: vs,
    defaultParseWidth: "any"
  })
}, an = {
  code: "en-US",
  formatDistance: zr,
  formatLong: Kr,
  formatRelative: Jr,
  localize: is,
  match: ks,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ms(e, t) {
  const n = P(e, t?.in);
  return nn(n, on(n)) + 1;
}
function Gn(e, t) {
  const n = P(e, t?.in), r = +dt(n) - +Yr(n);
  return Math.round(r / Un) + 1;
}
function Kn(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = mt(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, i = z(t?.in || e, 0);
  i.setFullYear(r + 1, 0, o), i.setHours(0, 0, 0, 0);
  const a = Fe(i, t), l = z(t?.in || e, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const d = Fe(l, t);
  return +n >= +a ? r + 1 : +n >= +d ? r : r - 1;
}
function Ns(e, t) {
  const n = mt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = Kn(e, t), o = z(t?.in || e, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), Fe(o, t);
}
function Xn(e, t) {
  const n = P(e, t?.in), r = +Fe(n, t) - +Ns(n, t);
  return Math.round(r / Un) + 1;
}
function A(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Ae = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return A(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : A(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return A(e.getDate(), t.length);
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
    return A(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return A(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return A(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return A(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), s = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return A(s, t.length);
  }
}, Ke = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, mn = {
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
    return Ae.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const s = Kn(e, r), o = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const i = o % 100;
      return A(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : A(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = An(e);
    return A(n, t.length);
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
    return A(n, t.length);
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
        return A(r, 2);
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
        return A(r, 2);
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
        return Ae.M(e, t);
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
        return A(r + 1, 2);
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
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : A(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Gn(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : A(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ae.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Ms(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : A(r, t.length);
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
    const s = e.getDay(), o = (s - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(o);
      // Padded numerical value
      case "ee":
        return A(o, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
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
    const s = e.getDay(), o = (s - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(o);
      // Padded numerical value
      case "cc":
        return A(o, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
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
        return A(s, t.length);
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
    switch (r === 12 ? s = Ke.noon : r === 0 ? s = Ke.midnight : s = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? s = Ke.evening : r >= 12 ? s = Ke.afternoon : r >= 4 ? s = Ke.morning : s = Ke.night, t) {
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
    return Ae.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ae.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : A(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : A(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ae.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ae.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Ae.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return yn(r);
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
        return yn(r);
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
        return "GMT" + gn(r, ":");
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
        return "GMT" + gn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Qe(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return A(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return A(+e, t.length);
  }
};
function gn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + t + A(o, 2);
}
function yn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + A(Math.abs(e) / 60, 2) : Qe(e, t);
}
function Qe(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = A(Math.trunc(r / 60), 2), o = A(r % 60, 2);
  return n + s + t + o;
}
const pn = (e, t) => {
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
}, Ss = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return pn(e, t);
  let o;
  switch (r) {
    case "P":
      o = t.dateTime({ width: "short" });
      break;
    case "PP":
      o = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = t.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", pn(r, t)).replace("{{time}}", Jn(s, t));
}, Os = {
  p: Jn,
  P: Ss
}, Cs = /^D+$/, Ts = /^Y+$/, Ws = ["D", "DD", "YY", "YYYY"];
function Ys(e) {
  return Cs.test(e);
}
function Es(e) {
  return Ts.test(e);
}
function _s(e, t, n) {
  const r = Is(e, t, n);
  if (console.warn(r), Ws.includes(e)) throw new RangeError(r);
}
function Is(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Fs = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ps = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Us = /^'([^]*?)'?$/, $s = /''/g, Bs = /[a-zA-Z]/;
function As(e, t, n) {
  const r = mt(), s = n?.locale ?? r.locale ?? an, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = P(e, n?.in);
  if (!Pr(a))
    throw new RangeError("Invalid time value");
  let l = t.match(Ps).map((g) => {
    const u = g[0];
    if (u === "p" || u === "P") {
      const y = Os[u];
      return y(g, s.formatLong);
    }
    return g;
  }).join("").match(Fs).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const u = g[0];
    if (u === "'")
      return { isToken: !1, value: Hs(g) };
    if (mn[u])
      return { isToken: !0, value: g };
    if (u.match(Bs))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + u + "`"
      );
    return { isToken: !1, value: g };
  });
  s.localize.preprocessor && (l = s.localize.preprocessor(a, l));
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: i,
    locale: s
  };
  return l.map((g) => {
    if (!g.isToken) return g.value;
    const u = g.value;
    (!n?.useAdditionalWeekYearTokens && Es(u) || !n?.useAdditionalDayOfYearTokens && Ys(u)) && _s(u, t, String(e));
    const y = mn[u[0]];
    return y(a, u, s.localize, d);
  }).join("");
}
function Hs(e) {
  const t = e.match(Us);
  return t ? t[1].replace($s, "'") : e;
}
function Rs(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = n.getMonth(), o = z(n, 0);
  return o.setFullYear(r, s + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Ge(e, t) {
  return P(e, t?.in).getMonth();
}
function ne(e, t) {
  return P(e, t?.in).getFullYear();
}
function qs(e, t) {
  return +P(e) > +P(t);
}
function js(e, t) {
  return +P(e) < +P(t);
}
function Ls(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function Zs(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function zs(e, t) {
  const n = () => z(t?.in, NaN), s = Ks(e);
  let o;
  if (s.date) {
    const d = Xs(s.date, 2);
    o = Js(d.restDateString, d.year);
  }
  if (!o || isNaN(+o)) return n();
  const i = +o;
  let a = 0, l;
  if (s.time && (a = eo(s.time), isNaN(a)))
    return n();
  if (s.timezone) {
    if (l = to(s.timezone), isNaN(l)) return n();
  } else {
    const d = new Date(i + a), g = P(0, t?.in);
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
  return P(i + a + l, t?.in);
}
const St = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Qs = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Vs = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Gs = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Ks(e) {
  const t = {}, n = e.split(St.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], St.timeZoneDelimiter.test(t.date) && (t.date = e.split(St.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = St.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function Xs(e, t) {
  const n = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), r = e.match(n);
  if (!r) return { year: NaN, restDateString: "" };
  const s = r[1] ? parseInt(r[1]) : null, o = r[2] ? parseInt(r[2]) : null;
  return {
    year: o === null ? s : o * 100,
    restDateString: e.slice((r[1] || r[2]).length)
  };
}
function Js(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(Qs);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = it(n[1]), o = it(n[2]) - 1, i = it(n[3]), a = it(n[4]), l = it(n[5]) - 1;
  if (r)
    return ao(t, a, l) ? no(t, a, l) : /* @__PURE__ */ new Date(NaN);
  {
    const d = /* @__PURE__ */ new Date(0);
    return !so(t, o, i) || !oo(t, s) ? /* @__PURE__ */ new Date(NaN) : (d.setUTCFullYear(t, o, Math.max(s, i)), d);
  }
}
function it(e) {
  return e ? parseInt(e) : 1;
}
function eo(e) {
  const t = e.match(Vs);
  if (!t) return NaN;
  const n = Rt(t[1]), r = Rt(t[2]), s = Rt(t[3]);
  return io(n, r, s) ? n * Bn + r * $n + s * 1e3 : NaN;
}
function Rt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function to(e) {
  if (e === "Z") return 0;
  const t = e.match(Gs);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return co(r, s) ? n * (r * Bn + s * $n) : NaN;
}
function no(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const ro = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function er(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function so(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (ro[t] || (er(e) ? 29 : 28));
}
function oo(e, t) {
  return t >= 1 && t <= (er(e) ? 366 : 365);
}
function ao(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function io(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function co(e, t) {
  return t >= 0 && t <= 59;
}
function ft(e, t, n) {
  const r = P(e, n?.in), s = r.getFullYear(), o = r.getDate(), i = z(e, 0);
  i.setFullYear(s, t, 15), i.setHours(0, 0, 0, 0);
  const a = Rs(i);
  return r.setMonth(t, Math.min(o, a)), r;
}
function lo(e, t, n) {
  const r = P(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, o = t - s;
  return ft(r, r.getMonth() + o * 3);
}
function ht(e, t, n) {
  const r = P(e, n?.in);
  return isNaN(+r) ? z(e, NaN) : (r.setFullYear(t), r);
}
const bn = 5, uo = 4;
function fo(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), o = t.addDays(s, bn * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? bn : uo;
}
function tr(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function ho(e, t) {
  const n = tr(e, t), r = fo(e, t);
  return t.addDays(n, r * 7 - 1);
}
class ue {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? oe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, o) => this.overrides?.newDate ? this.overrides.newDate(r, s, o) : this.options.timeZone ? new oe(r, s, o, this.options.timeZone) : new Date(r, s, o), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : Se(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Ee(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : rn(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : Er(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : nn(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : qn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Hr(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : jr(r), o = new Set(s.map((a) => this.getYear(a)));
      if (o.size === s.length)
        return s;
      const i = [];
      return o.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : ho(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Lr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Zn(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : Vn(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : qr(r), this.format = (r, s, o) => {
      const i = this.overrides?.format ? this.overrides.format(r, s, this.options) : As(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Gn(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ge(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ne(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Xn(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : qs(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : js(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Rn(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : Fr(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : Ls(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : Zs(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : _r(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Ir(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : ft(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : ht(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : tr(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ut(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : dt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : te(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Fe(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : on(r), this.options = { locale: an, ...t }, this.overrides = n;
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
    return t && ue.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: s } = this.options, o = n?.code;
    if (o && ue.yearFirstLocales.has(o))
      try {
        return new Intl.DateTimeFormat(o, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: s
        }).format(t);
      } catch {
      }
    const i = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, i);
  }
}
ue.yearFirstLocales = /* @__PURE__ */ new Set([
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
const Oe = new ue();
class nr {
  constructor(t, n, r = Oe) {
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
class mo {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class go {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function yo(e) {
  return C.createElement("button", { ...e });
}
function po(e) {
  return C.createElement("span", { ...e });
}
function bo(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    C.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && C.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && C.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && C.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && C.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Do(e) {
  const { day: t, modifiers: n, ...r } = e;
  return C.createElement("td", { ...r });
}
function wo(e) {
  const { day: t, modifiers: n, ...r } = e, s = C.useRef(null);
  return C.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), C.createElement("button", { ref: s, ...r });
}
var E;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(E || (E = {}));
var Z;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Z || (Z = {}));
var we;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(we || (we = {}));
var de;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(de || (de = {}));
function xo(e) {
  const { options: t, className: n, components: r, classNames: s, ...o } = e, i = [s[E.Dropdown], n].join(" "), a = t?.find(({ value: l }) => l === o.value);
  return C.createElement(
    "span",
    { "data-disabled": o.disabled, className: s[E.DropdownRoot] },
    C.createElement(r.Select, { className: i, ...o }, t?.map(({ value: l, label: d, disabled: g }) => C.createElement(r.Option, { key: l, value: l, disabled: g }, d))),
    C.createElement(
      "span",
      { className: s[E.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      C.createElement(r.Chevron, { orientation: "down", size: 18, className: s[E.Chevron] })
    )
  );
}
function vo(e) {
  return C.createElement("div", { ...e });
}
function ko(e) {
  return C.createElement("div", { ...e });
}
function Mo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r }, e.children);
}
function No(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r });
}
function So(e) {
  return C.createElement("table", { ...e });
}
function Oo(e) {
  return C.createElement("div", { ...e });
}
const rr = vr(void 0);
function gt() {
  const e = kr(rr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Co(e) {
  const { components: t } = gt();
  return C.createElement(t.Dropdown, { ...e });
}
function To(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...o } = e, { components: i, classNames: a, labels: { labelPrevious: l, labelNext: d } } = gt(), g = ye((y) => {
    s && n?.(y);
  }, [s, n]), u = ye((y) => {
    r && t?.(y);
  }, [r, t]);
  return C.createElement(
    "nav",
    { ...o },
    C.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[E.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: u },
      C.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[E.Chevron], orientation: "left" })
    ),
    C.createElement(
      i.NextMonthButton,
      { type: "button", className: a[E.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": d(s), onClick: g },
      C.createElement(i.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: a[E.Chevron] })
    )
  );
}
function Wo(e) {
  const { components: t } = gt();
  return C.createElement(t.Button, { ...e });
}
function Yo(e) {
  return C.createElement("option", { ...e });
}
function Eo(e) {
  const { components: t } = gt();
  return C.createElement(t.Button, { ...e });
}
function _o(e) {
  const { rootRef: t, ...n } = e;
  return C.createElement("div", { ...n, ref: t });
}
function Io(e) {
  return C.createElement("select", { ...e });
}
function Fo(e) {
  const { week: t, ...n } = e;
  return C.createElement("tr", { ...n });
}
function Po(e) {
  return C.createElement("th", { ...e });
}
function Uo(e) {
  return C.createElement(
    "thead",
    { "aria-hidden": !0 },
    C.createElement("tr", { ...e })
  );
}
function $o(e) {
  const { week: t, ...n } = e;
  return C.createElement("th", { ...n });
}
function Bo(e) {
  return C.createElement("th", { ...e });
}
function Ao(e) {
  return C.createElement("tbody", { ...e });
}
function Ho(e) {
  const { components: t } = gt();
  return C.createElement(t.Dropdown, { ...e });
}
const Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: yo,
  CaptionLabel: po,
  Chevron: bo,
  Day: Do,
  DayButton: wo,
  Dropdown: xo,
  DropdownNav: vo,
  Footer: ko,
  Month: Mo,
  MonthCaption: No,
  MonthGrid: So,
  Months: Oo,
  MonthsDropdown: Co,
  Nav: To,
  NextMonthButton: Wo,
  Option: Yo,
  PreviousMonthButton: Eo,
  Root: _o,
  Select: Io,
  Week: Fo,
  WeekNumber: $o,
  WeekNumberHeader: Bo,
  Weekday: Po,
  Weekdays: Uo,
  Weeks: Ao,
  YearsDropdown: Ho
}, Symbol.toStringTag, { value: "Module" }));
function _e(e, t, n = !1, r = Oe) {
  let { from: s, to: o } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return s && o ? (i(o, s) < 0 && ([s, o] = [o, s]), i(t, s) >= (n ? 1 : 0) && i(o, t) >= (n ? 1 : 0)) : !n && o ? a(o, t) : !n && s ? a(s, t) : !1;
}
function sr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function cn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function or(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function ar(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ir(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function cr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Ie(e, t, n = Oe) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: o, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return s(e, a);
    if (cr(a, n))
      return a.includes(e);
    if (cn(a))
      return _e(a, e, !1, n);
    if (ir(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (sr(a)) {
      const l = o(a.before, e), d = o(a.after, e), g = l > 0, u = d < 0;
      return i(a.before, a.after) ? u && g : g || u;
    }
    return or(a) ? o(e, a.after) > 0 : ar(a) ? o(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function qo(e, t, n, r, s) {
  const { disabled: o, hidden: i, modifiers: a, showOutsideDays: l, broadcastCalendar: d, today: g } = t, { isSameDay: u, isSameMonth: y, startOfMonth: h, isBefore: k, endOfMonth: N, isAfter: M } = s, m = n && h(n), w = r && N(r), O = {
    [Z.focused]: [],
    [Z.outside]: [],
    [Z.disabled]: [],
    [Z.hidden]: [],
    [Z.today]: []
  }, D = {};
  for (const b of e) {
    const { date: p, displayMonth: _ } = b, U = !!(_ && !y(p, _)), X = !!(m && k(p, m)), H = !!(w && M(p, w)), Q = !!(o && Ie(p, o, s)), V = !!(i && Ie(p, i, s)) || X || H || // Broadcast calendar will show outside days as default
    !d && !l && U || d && l === !1 && U, fe = u(p, g ?? s.today());
    U && O.outside.push(b), Q && O.disabled.push(b), V && O.hidden.push(b), fe && O.today.push(b), a && Object.keys(a).forEach((re) => {
      const he = a?.[re];
      he && Ie(p, he, s) && (D[re] ? D[re].push(b) : D[re] = [b]);
    });
  }
  return (b) => {
    const p = {
      [Z.focused]: !1,
      [Z.disabled]: !1,
      [Z.hidden]: !1,
      [Z.outside]: !1,
      [Z.today]: !1
    }, _ = {};
    for (const U in O) {
      const X = O[U];
      p[U] = X.some((H) => H === b);
    }
    for (const U in D)
      _[U] = D[U].some((X) => X === b);
    return {
      ...p,
      // custom modifiers should override all the previous ones
      ..._
    };
  };
}
function jo(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [o]) => (n[o] ? s.push(n[o]) : t[Z[o]] ? s.push(t[Z[o]]) : t[we[o]] && s.push(t[we[o]]), s), [t[E.Day]]);
}
function Lo(e) {
  return {
    ...Ro,
    ...e
  };
}
function Zo(e) {
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
function zo() {
  const e = {};
  for (const t in E)
    e[E[t]] = `rdp-${E[t]}`;
  for (const t in Z)
    e[Z[t]] = `rdp-${Z[t]}`;
  for (const t in we)
    e[we[t]] = `rdp-${we[t]}`;
  for (const t in de)
    e[de[t]] = `rdp-${de[t]}`;
  return e;
}
function lr(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const Qo = lr;
function Vo(e, t, n) {
  return (n ?? new ue(t)).format(e, "d");
}
function Go(e, t = Oe) {
  return t.format(e, "LLLL");
}
function Ko(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccccc");
}
function Xo(e, t = Oe) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Jo() {
  return "";
}
function dr(e, t = Oe) {
  return t.format(e, "yyyy");
}
const ea = dr, ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: lr,
  formatDay: Vo,
  formatMonthCaption: Qo,
  formatMonthDropdown: Go,
  formatWeekNumber: Xo,
  formatWeekNumberHeader: Jo,
  formatWeekdayName: Ko,
  formatYearCaption: ea,
  formatYearDropdown: dr
}, Symbol.toStringTag, { value: "Module" }));
function na(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...ta,
    ...e
  };
}
function ra(e, t, n, r, s) {
  const { startOfMonth: o, startOfYear: i, endOfYear: a, eachMonthOfInterval: l, getMonth: d } = s;
  return l({
    start: i(e),
    end: a(e)
  }).map((y) => {
    const h = r.formatMonthDropdown(y, s), k = d(y), N = t && y < o(t) || n && y > o(n) || !1;
    return { value: k, label: h, disabled: N };
  });
}
function sa(e, t = {}, n = {}) {
  let r = { ...t?.[E.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function oa(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), o = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(s, i);
    o.push(a);
  }
  return o;
}
function aa(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: i, eachYearOfInterval: a, getYear: l } = r, d = o(e), g = i(t), u = a({ start: d, end: g });
  return s && u.reverse(), u.map((y) => {
    const h = n.formatYearDropdown(y, r);
    return {
      value: l(y),
      label: h,
      disabled: !1
    };
  });
}
function ur(e, t, n, r) {
  let s = (r ?? new ue(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const ia = ur;
function fr(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const ca = fr;
function la(e, t, n, r) {
  let s = (r ?? new ue(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function da(e) {
  return "Choose the Month";
}
function ua() {
  return "";
}
function fa(e) {
  return "Go to the Next Month";
}
function ha(e) {
  return "Go to the Previous Month";
}
function ma(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccc");
}
function ga(e, t) {
  return `Week ${e}`;
}
function ya(e) {
  return "Week Number";
}
function pa(e) {
  return "Choose the Year";
}
const ba = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ca,
  labelDay: ia,
  labelDayButton: ur,
  labelGrid: fr,
  labelGridcell: la,
  labelMonthDropdown: da,
  labelNav: ua,
  labelNext: fa,
  labelPrevious: ha,
  labelWeekNumber: ga,
  labelWeekNumberHeader: ya,
  labelWeekday: ma,
  labelYearDropdown: pa
}, Symbol.toStringTag, { value: "Module" })), yt = (e) => e instanceof HTMLElement ? e : null, qt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Da = (e) => yt(e.querySelector("[data-animated-month]")), jt = (e) => yt(e.querySelector("[data-animated-caption]")), Lt = (e) => yt(e.querySelector("[data-animated-weeks]")), wa = (e) => yt(e.querySelector("[data-animated-nav]")), xa = (e) => yt(e.querySelector("[data-animated-weekdays]"));
function va(e, t, { classNames: n, months: r, focused: s, dateLib: o }) {
  const i = Me(null), a = Me(r), l = Me(!1);
  Mr(() => {
    const d = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const g = o.isSameMonth(r[0].date, d[0].date), u = o.isAfter(r[0].date, d[0].date), y = u ? n[de.caption_after_enter] : n[de.caption_before_enter], h = u ? n[de.weeks_after_enter] : n[de.weeks_before_enter], k = i.current, N = e.current.cloneNode(!0);
    if (N instanceof HTMLElement ? (qt(N).forEach((O) => {
      if (!(O instanceof HTMLElement))
        return;
      const D = Da(O);
      D && O.contains(D) && O.removeChild(D);
      const b = jt(O);
      b && b.classList.remove(y);
      const p = Lt(O);
      p && p.classList.remove(h);
    }), i.current = N) : i.current = null, l.current || g || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const M = k instanceof HTMLElement ? qt(k) : [], m = qt(e.current);
    if (m?.every((w) => w instanceof HTMLElement) && M && M.every((w) => w instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const w = wa(e.current);
      w && (w.style.zIndex = "1"), m.forEach((O, D) => {
        const b = M[D];
        if (!b)
          return;
        O.style.position = "relative", O.style.overflow = "hidden";
        const p = jt(O);
        p && p.classList.add(y);
        const _ = Lt(O);
        _ && _.classList.add(h);
        const U = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), p && p.classList.remove(y), _ && _.classList.remove(h), O.style.position = "", O.style.overflow = "", O.contains(b) && O.removeChild(b);
        };
        b.style.pointerEvents = "none", b.style.position = "absolute", b.style.overflow = "hidden", b.setAttribute("aria-hidden", "true");
        const X = xa(b);
        X && (X.style.opacity = "0");
        const H = jt(b);
        H && (H.classList.add(u ? n[de.caption_before_exit] : n[de.caption_after_exit]), H.addEventListener("animationend", U));
        const Q = Lt(b);
        Q && Q.classList.add(u ? n[de.weeks_before_exit] : n[de.weeks_after_exit]), O.insertBefore(b, O.firstChild);
      });
    }
  });
}
function ka(e, t, n, r) {
  const s = e[0], o = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: g, differenceInCalendarMonths: u, endOfBroadcastWeek: y, endOfISOWeek: h, endOfMonth: k, endOfWeek: N, isAfter: M, startOfBroadcastWeek: m, startOfISOWeek: w, startOfWeek: O } = r, D = l ? m(s, r) : i ? w(s) : O(s), b = l ? y(o) : i ? h(k(o)) : N(k(o)), p = g(b, D), _ = u(o, s) + 1, U = [];
  for (let Q = 0; Q <= p; Q++) {
    const V = d(D, Q);
    if (t && M(V, t))
      break;
    U.push(V);
  }
  const H = (l ? 35 : 42) * _;
  if (a && U.length < H) {
    const Q = H - U.length;
    for (let V = 0; V < Q; V++) {
      const fe = d(U[U.length - 1], 1);
      U.push(fe);
    }
  }
  return U;
}
function Ma(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((o, i) => o.concat(i.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function Na(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, o = [];
  for (let i = 0; i < s; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    o.push(a);
  }
  return o;
}
function Dn(e, t, n, r) {
  const { month: s, defaultMonth: o, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let l = s || o || i;
  const { differenceInCalendarMonths: d, addMonths: g, startOfMonth: u } = r;
  if (n && d(n, l) < a - 1) {
    const y = -1 * (a - 1);
    l = g(n, y);
  }
  return t && d(l, t) < 0 && (l = t), u(l);
}
function Sa(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: o, endOfISOWeek: i, endOfMonth: a, endOfWeek: l, getISOWeek: d, getWeek: g, startOfBroadcastWeek: u, startOfISOWeek: y, startOfWeek: h } = r, k = e.reduce((N, M) => {
    const m = n.broadcastCalendar ? u(M, r) : n.ISOWeek ? y(M) : h(M), w = n.broadcastCalendar ? o(M) : n.ISOWeek ? i(a(M)) : l(a(M)), O = t.filter((_) => _ >= m && _ <= w), D = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && O.length < D) {
      const _ = t.filter((U) => {
        const X = D - O.length;
        return U > w && U <= s(w, X);
      });
      O.push(..._);
    }
    const b = O.reduce((_, U) => {
      const X = n.ISOWeek ? d(U) : g(U), H = _.find((V) => V.weekNumber === X), Q = new nr(U, M, r);
      return H ? H.days.push(Q) : _.push(new go(X, [Q])), _;
    }, []), p = new mo(M, b);
    return N.push(p), N;
  }, []);
  return n.reverseMonths ? k.reverse() : k;
}
function Oa(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: o, startOfMonth: i, endOfMonth: a, addYears: l, endOfYear: d, newDate: g, today: u } = t, { fromYear: y, toYear: h, fromMonth: k, toMonth: N } = e;
  !n && k && (n = k), !n && y && (n = t.newDate(y, 0, 1)), !r && N && (r = N), !r && h && (r = g(h, 11, 31));
  const M = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : y ? n = g(y, 0, 1) : !n && M && (n = s(l(e.today ?? u(), -100))), r ? r = a(r) : h ? r = g(h, 11, 31) : !r && M && (r = d(e.today ?? u())), [
    n && o(n),
    r && o(r)
  ];
}
function Ca(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, d = s ? o : 1, g = i(e);
  if (!t)
    return a(g, d);
  if (!(l(t, e) < o))
    return a(g, d);
}
function Ta(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, d = s ? o ?? 1 : 1, g = i(e);
  if (!t)
    return a(g, -d);
  if (!(l(g, t) <= 0))
    return a(g, -d);
}
function Wa(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Ot(e, t) {
  const [n, r] = B(e);
  return [t === void 0 ? n : t, r];
}
function Ya(e, t) {
  const [n, r] = Oa(e, t), { startOfMonth: s, endOfMonth: o } = t, i = Dn(e, n, r, t), [a, l] = Ot(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Ye(() => {
    const p = Dn(e, n, r, t);
    l(p);
  }, [e.timeZone]);
  const d = Na(a, r, e, t), g = ka(d, e.endMonth ? o(e.endMonth) : void 0, e, t), u = Sa(d, g, e, t), y = Wa(u), h = Ma(u), k = Ta(a, n, e, t), N = Ca(a, r, e, t), { disableNavigation: M, onMonthChange: m } = e, w = (p) => y.some((_) => _.days.some((U) => U.isEqualTo(p))), O = (p) => {
    if (M)
      return;
    let _ = s(p);
    n && _ < s(n) && (_ = s(n)), r && _ > s(r) && (_ = s(r)), l(_), m?.(_);
  };
  return {
    months: u,
    weeks: y,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: k,
    nextMonth: N,
    goToMonth: O,
    goToDay: (p) => {
      w(p) || O(p.date);
    }
  };
}
var ke;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ke || (ke = {}));
function wn(e) {
  return !e[Z.disabled] && !e[Z.hidden] && !e[Z.outside];
}
function Ea(e, t, n, r) {
  let s, o = -1;
  for (const i of e) {
    const a = t(i);
    wn(a) && (a[Z.focused] && o < ke.FocusedModifier ? (s = i, o = ke.FocusedModifier) : r?.isEqualTo(i) && o < ke.LastFocused ? (s = i, o = ke.LastFocused) : n(i.date) && o < ke.Selected ? (s = i, o = ke.Selected) : a[Z.today] && o < ke.Today && (s = i, o = ke.Today));
  }
  return s || (s = e.find((i) => wn(t(i)))), s;
}
function _a(e, t, n, r, s, o, i) {
  const { ISOWeek: a, broadcastCalendar: l } = o, { addDays: d, addMonths: g, addWeeks: u, addYears: y, endOfBroadcastWeek: h, endOfISOWeek: k, endOfWeek: N, max: M, min: m, startOfBroadcastWeek: w, startOfISOWeek: O, startOfWeek: D } = i;
  let p = {
    day: d,
    week: u,
    month: g,
    year: y,
    startOfWeek: (_) => l ? w(_, i) : a ? O(_) : D(_),
    endOfWeek: (_) => l ? h(_) : a ? k(_) : N(_)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? p = M([r, p]) : t === "after" && s && (p = m([s, p])), p;
}
function hr(e, t, n, r, s, o, i, a = 0) {
  if (a > 365)
    return;
  const l = _a(e, t, n.date, r, s, o, i), d = !!(o.disabled && Ie(l, o.disabled, i)), g = !!(o.hidden && Ie(l, o.hidden, i)), u = l, y = new nr(l, u, i);
  return !d && !g ? y : hr(e, t, y, r, s, o, i, a + 1);
}
function Ia(e, t, n, r, s) {
  const { autoFocus: o } = e, [i, a] = B(), l = Ea(t.days, n, r || (() => !1), i), [d, g] = B(o ? l : void 0);
  return {
    isFocusTarget: (N) => !!l?.isEqualTo(N),
    setFocused: g,
    focused: d,
    blur: () => {
      a(d), g(void 0);
    },
    moveFocus: (N, M) => {
      if (!d)
        return;
      const m = hr(N, M, d, t.navStart, t.navEnd, e, s);
      m && (e.disableNavigation && !t.days.some((O) => O.isEqualTo(m)) || (t.goToDay(m), g(m)));
    }
  };
}
function Fa(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, i] = Ot(n, s ? n : void 0), a = s ? n : o, { isSameDay: l } = t, d = (h) => a?.some((k) => l(k, h)) ?? !1, { min: g, max: u } = e;
  return {
    selected: a,
    select: (h, k, N) => {
      let M = [...a ?? []];
      if (d(h)) {
        if (a?.length === g || r && a?.length === 1)
          return;
        M = a?.filter((m) => !l(m, h));
      } else
        a?.length === u ? M = [h] : M = [...M, h];
      return s || i(M), s?.(M, h, k, N), M;
    },
    isSelected: d
  };
}
function Pa(e, t, n = 0, r = 0, s = !1, o = Oe) {
  const { from: i, to: a } = t || {}, { isSameDay: l, isAfter: d, isBefore: g } = o;
  let u;
  if (!i && !a)
    u = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    l(i, e) ? n === 0 ? u = { from: i, to: e } : s ? u = { from: i, to: void 0 } : u = void 0 : g(e, i) ? u = { from: e, to: i } : u = { from: i, to: e };
  else if (i && a)
    if (l(i, e) && l(a, e))
      s ? u = { from: i, to: a } : u = void 0;
    else if (l(i, e))
      u = { from: i, to: n > 0 ? void 0 : e };
    else if (l(a, e))
      u = { from: e, to: n > 0 ? void 0 : e };
    else if (g(e, i))
      u = { from: e, to: a };
    else if (d(e, i))
      u = { from: i, to: e };
    else if (d(e, a))
      u = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (u?.from && u?.to) {
    const y = o.differenceInCalendarDays(u.to, u.from);
    r > 0 && y > r ? u = { from: e, to: void 0 } : n > 1 && y < n && (u = { from: e, to: void 0 });
  }
  return u;
}
function Ua(e, t, n = Oe) {
  const r = Array.isArray(t) ? t : [t];
  let s = e.from;
  const o = n.differenceInCalendarDays(e.to, e.from), i = Math.min(o, 6);
  for (let a = 0; a <= i; a++) {
    if (r.includes(s.getDay()))
      return !0;
    s = n.addDays(s, 1);
  }
  return !1;
}
function xn(e, t, n = Oe) {
  return _e(e, t.from, !1, n) || _e(e, t.to, !1, n) || _e(t, e.from, !1, n) || _e(t, e.to, !1, n);
}
function $a(e, t, n = Oe) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? _e(e, a, !1, n) : cr(a, n) ? a.some((l) => _e(e, l, !1, n)) : cn(a) ? a.from && a.to ? xn(e, { from: a.from, to: a.to }, n) : !1 : ir(a) ? Ua(e, a.dayOfWeek, n) : sr(a) ? n.isAfter(a.before, a.after) ? xn(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Ie(e.from, a, n) || Ie(e.to, a, n) : or(a) || ar(a) ? Ie(e.from, a, n) || Ie(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= l; d++) {
      if (i.some((g) => g(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function Ba(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: o, onSelect: i } = e, [a, l] = Ot(s, i ? s : void 0), d = i ? s : a;
  return {
    selected: d,
    select: (y, h, k) => {
      const { min: N, max: M } = e, m = y ? Pa(y, d, N, M, o, t) : void 0;
      return r && n && m?.from && m.to && $a({ from: m.from, to: m.to }, n, t) && (m.from = y, m.to = void 0), i || l(m), i?.(m, y, h, k), m;
    },
    isSelected: (y) => d && _e(d, y, !1, t)
  };
}
function Aa(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, i] = Ot(n, s ? n : void 0), a = s ? n : o, { isSameDay: l } = t;
  return {
    selected: a,
    select: (u, y, h) => {
      let k = u;
      return !r && a && a && l(u, a) && (k = void 0), s || i(k), s?.(k, u, y, h), k;
    },
    isSelected: (u) => a ? l(a, u) : !1
  };
}
function Ha(e, t) {
  const n = Aa(e, t), r = Fa(e, t), s = Ba(e, t);
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
function He(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new oe(t.today, t.timeZone)), t.month && (t.month = new oe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new oe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new oe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new oe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new oe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((T) => new oe(T, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new oe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new oe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: o, locale: i, classNames: a } = Bt(() => {
    const T = { ...an, ...t.locale };
    return {
      dateLib: new ue({
        locale: T,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Lo(t.components),
      formatters: na(t.formatters),
      labels: { ...ba, ...t.labels },
      locale: T,
      classNames: { ...zo(), ...t.classNames }
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
  ]), { captionLayout: l, mode: d, navLayout: g, numberOfMonths: u = 1, onDayBlur: y, onDayClick: h, onDayFocus: k, onDayKeyDown: N, onDayMouseEnter: M, onDayMouseLeave: m, onNextClick: w, onPrevClick: O, showWeekNumber: D, styles: b } = t, { formatCaption: p, formatDay: _, formatMonthDropdown: U, formatWeekNumber: X, formatWeekNumberHeader: H, formatWeekdayName: Q, formatYearDropdown: V } = r, fe = Ya(t, o), { days: re, months: he, navStart: xe, navEnd: Ue, previousMonth: ae, nextMonth: ee, goToMonth: pe } = fe, J = qo(re, t, xe, Ue, o), { isSelected: G, select: be, selected: De } = Ha(t, o) ?? {}, { blur: qe, focused: Ce, isFocusTarget: je, moveFocus: Te, setFocused: We } = Ia(t, fe, J, G ?? (() => !1), o), { labelDayButton: $e, labelGridcell: Tt, labelGrid: Wt, labelMonthDropdown: et, labelNav: pt, labelPrevious: Yt, labelNext: Et, labelWeekday: _t, labelWeekNumber: It, labelWeekNumberHeader: Ft, labelYearDropdown: Pt } = s, tt = Bt(() => oa(o, t.ISOWeek), [o, t.ISOWeek]), bt = d !== void 0 || h !== void 0, me = ye(() => {
    ae && (pe(ae), O?.(ae));
  }, [ae, pe, O]), nt = ye(() => {
    ee && (pe(ee), w?.(ee));
  }, [pe, ee, w]), Dt = ye((T, Y) => (W) => {
    W.preventDefault(), W.stopPropagation(), We(T), be?.(T.date, Y, W), h?.(T.date, Y, W);
  }, [be, h, We]), wt = ye((T, Y) => (W) => {
    We(T), k?.(T.date, Y, W);
  }, [k, We]), Be = ye((T, Y) => (W) => {
    qe(), y?.(T.date, Y, W);
  }, [qe, y]), xt = ye((T, Y) => (W) => {
    const I = {
      ArrowLeft: [
        W.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        W.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [W.shiftKey ? "year" : "week", "after"],
      ArrowUp: [W.shiftKey ? "year" : "week", "before"],
      PageUp: [W.shiftKey ? "year" : "month", "before"],
      PageDown: [W.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (I[W.key]) {
      W.preventDefault(), W.stopPropagation();
      const [$, S] = I[W.key];
      Te($, S);
    }
    N?.(T.date, Y, W);
  }, [Te, N, t.dir]), Le = ye((T, Y) => (W) => {
    M?.(T.date, Y, W);
  }, [M]), Ut = ye((T, Y) => (W) => {
    m?.(T.date, Y, W);
  }, [m]), $t = ye((T) => (Y) => {
    const W = Number(Y.target.value), I = o.setMonth(o.startOfMonth(T), W);
    pe(I);
  }, [o, pe]), vt = ye((T) => (Y) => {
    const W = Number(Y.target.value), I = o.setYear(o.startOfMonth(T), W);
    pe(I);
  }, [o, pe]), { className: kt, style: Ze } = Bt(() => ({
    className: [a[E.Root], t.className].filter(Boolean).join(" "),
    style: { ...b?.[E.Root], ...t.style }
  }), [a, t.className, t.style, b]), rt = Zo(t), c = Me(null);
  va(c, !!t.animate, {
    classNames: a,
    months: he,
    focused: Ce,
    dateLib: o
  });
  const x = {
    dayPickerProps: t,
    selected: De,
    select: be,
    isSelected: G,
    months: he,
    nextMonth: ee,
    previousMonth: ae,
    goToMonth: pe,
    getModifiers: J,
    components: n,
    classNames: a,
    styles: b,
    labels: s,
    formatters: r
  };
  return C.createElement(
    rr.Provider,
    { value: x },
    C.createElement(
      n.Root,
      { rootRef: t.animate ? c : void 0, className: kt, style: Ze, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...rt },
      C.createElement(
        n.Months,
        { className: a[E.Months], style: b?.[E.Months] },
        !t.hideNavigation && !g && C.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[E.Nav], style: b?.[E.Nav], "aria-label": pt(), onPreviousClick: me, onNextClick: nt, previousMonth: ae, nextMonth: ee }),
        he.map((T, Y) => C.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[E.Month],
            style: b?.[E.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Y,
            displayIndex: Y,
            calendarMonth: T
          },
          g === "around" && !t.hideNavigation && Y === 0 && C.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[E.PreviousMonthButton], tabIndex: ae ? void 0 : -1, "aria-disabled": ae ? void 0 : !0, "aria-label": Yt(ae), onClick: me, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(n.Chevron, { disabled: ae ? void 0 : !0, className: a[E.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          C.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[E.MonthCaption], style: b?.[E.MonthCaption], calendarMonth: T, displayIndex: Y }, l?.startsWith("dropdown") ? C.createElement(
            n.DropdownNav,
            { className: a[E.Dropdowns], style: b?.[E.Dropdowns] },
            (() => {
              const W = l === "dropdown" || l === "dropdown-months" ? C.createElement(n.MonthsDropdown, { key: "month", className: a[E.MonthsDropdown], "aria-label": et(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: $t(T.date), options: ra(T.date, xe, Ue, r, o), style: b?.[E.Dropdown], value: o.getMonth(T.date) }) : C.createElement("span", { key: "month" }, U(T.date, o)), I = l === "dropdown" || l === "dropdown-years" ? C.createElement(n.YearsDropdown, { key: "year", className: a[E.YearsDropdown], "aria-label": Pt(o.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: vt(T.date), options: aa(xe, Ue, r, o, !!t.reverseYears), style: b?.[E.Dropdown], value: o.getYear(T.date) }) : C.createElement("span", { key: "year" }, V(T.date, o));
              return o.getMonthYearOrder() === "year-first" ? [I, W] : [W, I];
            })(),
            C.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, p(T.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            C.createElement(n.CaptionLabel, { className: a[E.CaptionLabel], role: "status", "aria-live": "polite" }, p(T.date, o.options, o))
          )),
          g === "around" && !t.hideNavigation && Y === u - 1 && C.createElement(
            n.NextMonthButton,
            { type: "button", className: a[E.NextMonthButton], tabIndex: ee ? void 0 : -1, "aria-disabled": ee ? void 0 : !0, "aria-label": Et(ee), onClick: nt, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(n.Chevron, { disabled: ee ? void 0 : !0, className: a[E.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Y === u - 1 && g === "after" && !t.hideNavigation && C.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[E.Nav], style: b?.[E.Nav], "aria-label": pt(), onPreviousClick: me, onNextClick: nt, previousMonth: ae, nextMonth: ee }),
          C.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": Wt(T.date, o.options, o) || void 0, className: a[E.MonthGrid], style: b?.[E.MonthGrid] },
            !t.hideWeekdays && C.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[E.Weekdays], style: b?.[E.Weekdays] },
              D && C.createElement(n.WeekNumberHeader, { "aria-label": Ft(o.options), className: a[E.WeekNumberHeader], style: b?.[E.WeekNumberHeader], scope: "col" }, H()),
              tt.map((W) => C.createElement(n.Weekday, { "aria-label": _t(W, o.options, o), className: a[E.Weekday], key: String(W), style: b?.[E.Weekday], scope: "col" }, Q(W, o.options, o)))
            ),
            C.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[E.Weeks], style: b?.[E.Weeks] }, T.weeks.map((W) => C.createElement(
              n.Week,
              { className: a[E.Week], key: W.weekNumber, style: b?.[E.Week], week: W },
              D && // biome-ignore lint/a11y/useSemanticElements: react component
              C.createElement(n.WeekNumber, { week: W, style: b?.[E.WeekNumber], "aria-label": It(W.weekNumber, {
                locale: i
              }), className: a[E.WeekNumber], scope: "row", role: "rowheader" }, X(W.weekNumber, o)),
              W.days.map((I) => {
                const { date: $ } = I, S = J(I);
                if (S[Z.focused] = !S.hidden && !!Ce?.isEqualTo(I), S[we.selected] = G?.($) || S.selected, cn(De)) {
                  const { from: j, to: se } = De;
                  S[we.range_start] = !!(j && se && o.isSameDay($, j)), S[we.range_end] = !!(j && se && o.isSameDay($, se)), S[we.range_middle] = _e(De, $, !0, o);
                }
                const q = sa(S, b, t.modifiersStyles), le = jo(S, a, t.modifiersClassNames), ce = !bt && !S.hidden ? Tt($, S, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  C.createElement(n.Day, { key: `${o.format($, "yyyy-MM-dd")}_${o.format(I.displayMonth, "yyyy-MM")}`, day: I, modifiers: S, className: le.join(" "), style: q, role: "gridcell", "aria-selected": S.selected || void 0, "aria-label": ce, "data-day": o.format($, "yyyy-MM-dd"), "data-month": I.outside ? o.format($, "yyyy-MM") : void 0, "data-selected": S.selected || void 0, "data-disabled": S.disabled || void 0, "data-hidden": S.hidden || void 0, "data-outside": I.outside || void 0, "data-focused": S.focused || void 0, "data-today": S.today || void 0 }, !S.hidden && bt ? C.createElement(n.DayButton, { className: a[E.DayButton], style: b?.[E.DayButton], type: "button", day: I, modifiers: S, disabled: S.disabled || void 0, tabIndex: je(I) ? 0 : -1, "aria-label": $e($, S, o.options, o), onClick: Dt(I, S), onBlur: Be(I, S), onFocus: wt(I, S), onKeyDown: xt(I, S), onMouseEnter: Le(I, S), onMouseLeave: Ut(I, S) }, _($, o.options, o)) : !S.hidden && _(I.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      C.createElement(n.Footer, { className: a[E.Footer], style: b?.[E.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Ra = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), qa = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), vn = (e) => {
  const t = qa(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, mr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), ja = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var La = {
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
const Za = Fn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: o,
    iconNode: i,
    ...a
  }, l) => Xt(
    "svg",
    {
      ref: l,
      ...La,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: mr("lucide", s),
      ...!o && !ja(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...i.map(([d, g]) => Xt(d, g)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
const Pe = (e, t) => {
  const n = Fn(
    ({ className: r, ...s }, o) => Xt(Za, {
      ref: o,
      iconNode: t,
      className: mr(
        `lucide-${Ra(vn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = vn(e), n;
};
const za = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], Qa = Pe("bookmark", za);
const Va = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
], Zt = Pe("calendar-days", Va);
const Ga = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ka = Pe("chevron-down", Ga);
const Xa = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], gr = Pe("chevron-left", Xa);
const Ja = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], yr = Pe("chevron-right", Ja);
const ei = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], ti = Pe("circle-question-mark", ei);
const ni = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ri = Pe("plus", ni);
const si = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], oi = Pe("trash-2", si);
const ai = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], kn = Pe("x", ai);
function ii(e, t) {
  const n = fi(t);
  return "formatToParts" in n ? li(n, e) : di(n, e);
}
const ci = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function li(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const o = ci[n[s].type];
      o !== void 0 && (r[o] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function di(e, t) {
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
const zt = {}, Mn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), ui = Mn === "06/25/2014, 00:00:00" || Mn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function fi(e) {
  return zt[e] || (zt[e] = ui ? new Intl.DateTimeFormat("en-US", {
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
  })), zt[e];
}
function pr(e, t, n, r, s, o, i) {
  const a = /* @__PURE__ */ new Date(0);
  return a.setUTCFullYear(e, t, n), a.setUTCHours(r, s, o, i), a;
}
const Nn = 36e5, hi = 6e4, Qt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function br(e, t, n) {
  if (!e)
    return 0;
  let r = Qt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, o;
  if (r = Qt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), Sn(s) ? -(s * Nn) : NaN;
  if (r = Qt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const i = parseInt(r[3], 10);
    return Sn(s, i) ? (o = Math.abs(s) * Nn + i * hi, r[1] === "+" ? -o : o) : NaN;
  }
  if (yi(e)) {
    t = new Date(t || Date.now());
    const i = n ? t : mi(t), a = en(i, e);
    return -(n ? a : gi(t, a, e));
  }
  return NaN;
}
function mi(e) {
  return pr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function en(e, t) {
  const n = ii(e, t), r = pr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const o = s % 1e3;
  return s -= o >= 0 ? o : 1e3 + o, r - s;
}
function gi(e, t, n) {
  let s = e.getTime() - t;
  const o = en(new Date(s), n);
  if (t === o)
    return t;
  s -= o - t;
  const i = en(new Date(s), n);
  return o === i ? o : Math.max(o, i);
}
function Sn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const On = {};
function yi(e) {
  if (On[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), On[e] = !0, !0;
  } catch {
    return !1;
  }
}
function Cn(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const pi = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Vt = 36e5, Tn = 6e4, bi = 2, ie = {
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
  timeZone: pi
};
function Di(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? bi : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = wi(e), { year: s, restDateString: o } = xi(r.date, n), i = vi(o, s);
  if (i === null || isNaN(i.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (i) {
    const a = i.getTime();
    let l = 0, d;
    if (r.time && (l = ki(r.time), l === null || isNaN(l)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (d = br(r.timeZone || t.timeZone, new Date(a + l)), isNaN(d))
        return /* @__PURE__ */ new Date(NaN);
    } else
      d = Cn(new Date(a + l)), d = Cn(new Date(a + l + d));
    return new Date(a + l + d);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function wi(e) {
  const t = {};
  let n = ie.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = ie.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = ie.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function xi(e, t) {
  if (e) {
    const n = ie.YYY[t], r = ie.YYYYY[t];
    let s = ie.YYYY.exec(e) || r.exec(e);
    if (s) {
      const o = s[1];
      return {
        year: parseInt(o, 10),
        restDateString: e.slice(o.length)
      };
    }
    if (s = ie.YY.exec(e) || n.exec(e), s) {
      const o = s[1];
      return {
        year: parseInt(o, 10) * 100,
        restDateString: e.slice(o.length)
      };
    }
  }
  return {
    year: null
  };
}
function vi(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let o = ie.MM.exec(e);
  if (o)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1, Yn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (o = ie.DDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0);
    const i = parseInt(o[1], 10);
    return Si(t, i) ? (n.setUTCFullYear(t, 0, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ie.MMDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1;
    const i = parseInt(o[2], 10);
    return Yn(t, r, i) ? (n.setUTCFullYear(t, r, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ie.Www.exec(e), o)
    return s = parseInt(o[1], 10) - 1, En(s) ? Wn(t, s) : /* @__PURE__ */ new Date(NaN);
  if (o = ie.WwwD.exec(e), o) {
    s = parseInt(o[1], 10) - 1;
    const i = parseInt(o[2], 10) - 1;
    return En(s, i) ? Wn(t, s, i) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function ki(e) {
  let t, n, r = ie.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Gt(t) ? t % 24 * Vt : NaN;
  if (r = ie.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Gt(t, n) ? t % 24 * Vt + n * Tn : NaN;
  if (r = ie.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return Gt(t, n, s) ? t % 24 * Vt + n * Tn + s * 1e3 : NaN;
  }
  return null;
}
function Wn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const Mi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ni = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Dr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Yn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = Dr(e);
    if (r && n > Ni[t] || !r && n > Mi[t])
      return !1;
  }
  return !0;
}
function Si(e, t) {
  if (t < 1)
    return !1;
  const n = Dr(e);
  return !(n && t > 366 || !n && t > 365);
}
function En(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Gt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function Oi(e, t, n) {
  e = Di(e, n);
  const r = br(t, e, !0), s = new Date(e.getTime() - r), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), o.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), o;
}
const tn = 0, zi = !1, Xe = !0, Qi = "firstFullWeek", Ci = "UTC";
function F(e) {
  const t = zs(`${e}T00:00:00.000Z`);
  return Oi(t, Ci);
}
function R(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ct() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ti(e, t, n) {
  const r = F(e);
  let s;
  switch (t) {
    case "day":
      s = Se(r, n);
      break;
    case "week":
      s = rn(r, n);
      break;
    case "month":
      s = Ee(r, n);
      break;
    case "quarter":
      s = Hn(r, n);
      break;
    default:
      s = r;
  }
  return R(s);
}
function Wi(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = F(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Se(s, 1), r.includes(s.getDay()) || o++;
    return R(s);
  } else
    return Ti(e, t, n - 1);
}
function Yi(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = F(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Se(s, -1), r.includes(s.getDay()) || o++;
    return R(s);
  } else {
    const s = F(e);
    let o;
    switch (t) {
      case "day":
        o = Se(s, -(n - 1));
        break;
      case "week":
        o = rn(s, -(n - 1));
        break;
      case "month":
        o = Ee(s, -(n - 1));
        break;
      case "quarter":
        o = Hn(s, -(n - 1));
        break;
      default:
        o = s;
    }
    return R(o);
  }
}
function wr(e, t, n, r) {
  const s = F(e), o = F(t);
  if (s > o) return 0;
  if (n === "day" && r.length > 0)
    return Qn({ start: s, end: o }).filter(
      (l) => !r.includes(l.getDay())
    ).length;
  switch (n) {
    case "day":
      return jn(o, s) + 1;
    case "week":
      return Ar(o, s) + 1;
    case "month":
      return zn(o, s) + 1;
    case "quarter":
      return Br(o, s) + 1;
    default:
      return 1;
  }
}
function Ei(e, t, n) {
  const r = F(e), s = F(t);
  if (r > s) return [];
  const o = Qn({ start: r, end: s });
  return n.length === 0 ? o.map(R) : o.filter((i) => !n.includes(i.getDay())).map(R);
}
function _n(e, t, n = "day", r = [], s, o, i, a, l) {
  const d = wr(
    e,
    t,
    n,
    r
  ), g = Ei(
    e,
    t,
    r
  ), u = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: d,
    excludedWeekdays: r,
    includedDatesUtc: g
  };
  return s !== void 0 && (u.excludeEnabled = s), o && (u.excludeFilterTypes = o), i && (u.excludedSpecificDates = i), a && (u.excludedSavedDates = a), l && (u.excludedDateRanges = l), u;
}
function Vi(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function Gi(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, s] = t, o = parseInt(r, 10), i = parseInt(n, 10), a = parseInt(s, 10);
  if (isNaN(o) || isNaN(i) || isNaN(a) || o < 1 || o > 12 || i < 1 || i > 31 || a < 1900 || a > 2100)
    return null;
  const l = o.toString().padStart(2, "0"), d = i.toString().padStart(2, "0");
  return `${a}-${l}-${d}`;
}
function _i(e) {
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
function Ii() {
  const e = Ct(), t = F(e);
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
        const n = R(Se(t, -1));
        return {
          startDateUtc: n,
          endDateUtc: n
        };
      }
    },
    thisWeek: {
      label: "This Week",
      getValue: () => {
        let n = Fe(t, {
          weekStartsOn: tn
        }), r = Se(n, 6);
        return {
          startDateUtc: R(n),
          endDateUtc: R(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = te(t);
        return {
          startDateUtc: R(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = on(t);
        return {
          startDateUtc: R(n),
          endDateUtc: e
        };
      }
    }
  };
}
const Fi = "DateRangePickerDB", Pi = 1, ve = "savedDateRanges";
class Ui {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(Fi, Pi);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (s) => {
          const o = s.target.result;
          o.objectStoreNames.contains(ve) || o.createObjectStore(ve, {
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
      const a = this.db.transaction([ve], "readwrite").objectStore(ve).put({
        id: t,
        data: n,
        timestamp: Date.now()
      });
      a.onerror = () => s(a.error), a.onsuccess = () => r();
    });
  }
  /**
   * Get data from IndexedDB
   */
  async getData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const i = this.db.transaction([ve], "readonly").objectStore(ve).get(t);
      i.onerror = () => r(i.error), i.onsuccess = () => {
        const a = i.result;
        a && a.data ? n(a.data) : n(null);
      };
    });
  }
  /**
   * Delete data from IndexedDB
   */
  async deleteData(t) {
    return await this.ensureInit(), new Promise((n, r) => {
      const i = this.db.transaction([ve], "readwrite").objectStore(ve).delete(t);
      i.onerror = () => r(i.error), i.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const o = this.db.transaction([ve], "readwrite").objectStore(ve).clear();
      o.onerror = () => n(o.error), o.onsuccess = () => t();
    });
  }
}
const Je = new Ui(), Kt = "savedDateRanges";
function $i({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n
}) {
  const [r, s] = B([]), [o, i] = B(!1), [a, l] = B(""), [d, g] = B(!1);
  Ye(() => {
    (async () => {
      await Je.init();
      const w = await Je.getData(
        Kt
      );
      w && s(w);
    })();
  }, []);
  const u = Ii(), y = (m) => {
    const { startDateUtc: w, endDateUtc: O } = m();
    e(w, O);
  }, h = async () => {
    if (a.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const m = {
      id: `saved-${Date.now()}`,
      label: a.trim(),
      selection: n,
      createdAt: Date.now()
    }, w = [...r, m];
    s(w), await Je.saveData(Kt, w), l(""), i(!1);
  }, k = async (m) => {
    const w = r.filter((O) => O.id !== m);
    s(w), await Je.saveData(Kt, w);
  }, N = (m) => {
    t ? t(m.selection) : e(m.selection.startDateUtc, m.selection.endDateUtc);
  }, M = (m, w) => {
    const O = (D) => (/* @__PURE__ */ new Date(D + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return m === w ? O(m) : `${O(m)} - ${O(w)}`;
  };
  return /* @__PURE__ */ v("div", { className: "w-72 bg-white border-r border-gray-200 py-4 flex flex-col ", children: [
    /* @__PURE__ */ v("div", { className: "mb-3 px-4 flex-shrink-0", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
      /* @__PURE__ */ f("div", { className: "", children: Object.values(u).map((m) => {
        const { startDateUtc: w, endDateUtc: O } = m.getValue();
        return /* @__PURE__ */ v(
          "button",
          {
            onClick: () => y(m.getValue),
            className: "w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all",
            children: [
              /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900", children: m.label }),
              /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed mt-0.5", children: M(w, O) })
            ]
          },
          m.label
        );
      }) })
    ] }),
    /* @__PURE__ */ v("div", { className: "flex flex-col flex-1 min-h-0 border-t border-gray-200 px-4", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2 flex-shrink-0 mt-3", children: /* @__PURE__ */ v("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Saved Dates" }),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => g(!d),
            className: "text-gray-400 hover:text-gray-600",
            children: /* @__PURE__ */ f(ti, { className: "w-3 h-3" })
          }
        )
      ] }) }),
      d && /* @__PURE__ */ f("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
      r.length === 0 ? /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ f("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: r.map((m) => /* @__PURE__ */ f(
        "div",
        {
          className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
          children: /* @__PURE__ */ v("div", { className: "flex items-start justify-between px-3 py-2", children: [
            /* @__PURE__ */ v(
              "button",
              {
                onClick: () => N(m),
                className: "flex-1 text-left",
                children: [
                  /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900 mb-1", children: m.label }),
                  /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed", children: M(
                    m.selection.startDateUtc,
                    m.selection.endDateUtc
                  ) }),
                  (m.selection.excludedWeekdays?.length > 0 || m.selection.excludedSpecificDates && m.selection.excludedSpecificDates.length > 0 || m.selection.excludedSavedDates && m.selection.excludedSavedDates.length > 0 || m.selection.excludedDateRanges && m.selection.excludedDateRanges.length > 0) && /* @__PURE__ */ v("div", { className: "text-xs text-gray-500 mt-1 space-y-0.5", children: [
                    m.selection.excludedWeekdays?.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Days:",
                      " ",
                      m.selection.excludedWeekdays.map(
                        (w) => [
                          "Sun",
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat"
                        ][w]
                      ).join(", ")
                    ] }),
                    m.selection.excludedSpecificDates && m.selection.excludedSpecificDates.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Specific Dates:",
                      " ",
                      m.selection.excludedSpecificDates.length
                    ] }),
                    m.selection.excludedSavedDates && m.selection.excludedSavedDates.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Saved: ",
                      m.selection.excludedSavedDates.length
                    ] }),
                    m.selection.excludedDateRanges && m.selection.excludedDateRanges.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Ranges:",
                      " ",
                      m.selection.excludedDateRanges.length
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ f(
              "button",
              {
                onClick: () => k(m.id),
                className: "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2",
                children: /* @__PURE__ */ f(oi, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        },
        m.id
      )) }),
      /* @__PURE__ */ v(
        "button",
        {
          onClick: () => i(!0),
          className: "w-full flex-shrink-0 px-3 py-2 text-[#003DB8] opacity-50 hover:opacity-100 text-sm font-medium rounded-mdtransition-colors flex items-center justify-center gap-2 mt-auto",
          children: [
            /* @__PURE__ */ f(ri, { className: "w-4 h-4" }),
            "Save selected date"
          ]
        }
      )
    ] }),
    o && /* @__PURE__ */ v(ct, { children: [
      /* @__PURE__ */ f(
        "div",
        {
          className: "fixed inset-0 bg-black/30 z-50",
          onClick: () => i(!1)
        }
      ),
      /* @__PURE__ */ f("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ v("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
        /* @__PURE__ */ f("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
        /* @__PURE__ */ v("div", { className: "mb-2", children: [
          /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
          /* @__PURE__ */ f(
            "input",
            {
              type: "text",
              value: a,
              onChange: (m) => l(m.target.value),
              placeholder: "e.g., Q1 2025, Holiday Period",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              autoFocus: !0,
              onKeyDown: (m) => {
                m.key === "Enter" && h();
              }
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Range:" }),
            " ",
            M(
              n.startDateUtc,
              n.endDateUtc
            )
          ] }),
          /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Duration:" }),
            " ",
            n.duration,
            " ",
            n.unit,
            "(s)"
          ] }),
          n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Excluded Days:" }),
            " ",
            n.excludedWeekdays.map(
              (m) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][m]
            ).join(", ")
          ] }),
          n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Excluded Specific Dates:" }),
            " ",
            n.excludedSpecificDates.length,
            " date(s)"
          ] }),
          n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Excluded Saved Dates:" }),
            " ",
            n.excludedSavedDates.length,
            " saved date(s)"
          ] }),
          n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Excluded Date Ranges:" }),
            " ",
            n.excludedDateRanges.length,
            " range(s)"
          ] })
        ] }),
        /* @__PURE__ */ v("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: () => i(!1),
              className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: h,
              className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors",
              children: "Save"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
const Bi = [
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
function Ai({
  selectedRange: e,
  onSelect: t
}) {
  const n = ne(e.from), [r, s] = B(n);
  F(Ct());
  const o = (u, y) => {
    const h = ft(ht(/* @__PURE__ */ new Date(), u), y);
    if (!e.from) {
      t({ from: h, to: h });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      h < e.from ? t({ from: h, to: e.from }) : t({ from: e.from, to: h });
      return;
    }
    t({ from: h, to: h });
  }, i = (u, y) => {
    if (!e.from || !e.to) return !1;
    const h = Ge(e.from), k = ne(e.from), N = Ge(e.to), M = ne(e.to), m = u * 12 + y, w = k * 12 + h, O = M * 12 + N;
    return m >= w && m <= O;
  }, a = (u, y) => {
    if (!e.from) return !1;
    const h = Ge(e.from), k = ne(e.from);
    return u === k && y === h;
  }, l = (u, y) => {
    if (!e.to) return !1;
    const h = Ge(e.to), k = ne(e.to);
    return u === k && y === h;
  }, d = (u, y) => !1, g = (u) => /* @__PURE__ */ v("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: u }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-4 gap-2", children: Bi.map((y, h) => {
      const k = i(u, h), N = a(u, h), M = l(u, h), m = N || M, w = d();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !w && o(u, h),
          disabled: w,
          className: `
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${w ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : m ? "bg-[#003DB8] text-white" : k ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: y
        },
        y
      );
    }) })
  ] }, u);
  return /* @__PURE__ */ v("div", { className: "w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(gr, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ v("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(yr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "flex gap-8", children: [
      g(r),
      g(r + 1)
    ] })
  ] });
}
const Hi = ["Q1", "Q2", "Q3", "Q4"];
function Ri({
  selectedRange: e,
  onSelect: t
}) {
  const n = ne(e.from), [r, s] = B(n);
  F(Ct());
  const o = (u, y) => {
    const h = Rr(
      lo(ht(/* @__PURE__ */ new Date(), u), y + 1)
    );
    if (!e.from) {
      t({ from: h, to: h });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      h < e.from ? t({ from: h, to: e.from }) : t({ from: e.from, to: h });
      return;
    }
    t({ from: h, to: h });
  }, i = (u, y) => {
    if (!e.from || !e.to) return !1;
    const h = Nt(e.from) - 1, k = ne(e.from), N = Nt(e.to) - 1, M = ne(e.to), m = u * 4 + y, w = k * 4 + h, O = M * 4 + N;
    return m >= w && m <= O;
  }, a = (u, y) => {
    if (!e.from) return !1;
    const h = Nt(e.from) - 1, k = ne(e.from);
    return u === k && y === h;
  }, l = (u, y) => {
    if (!e.to) return !1;
    const h = Nt(e.to) - 1, k = ne(e.to);
    return u === k && y === h;
  }, d = (u, y) => !1, g = (u) => /* @__PURE__ */ v("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: u }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-2 gap-3", children: Hi.map((y, h) => {
      const k = i(u, h), N = a(u, h), M = l(u, h), m = N || M, w = d();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !w && o(u, h),
          disabled: w,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${w ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : m ? "bg-blue-600 text-white" : k ? "bg-blue-100 text-blue-900" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: y
        },
        y
      );
    }) })
  ] }, u);
  return /* @__PURE__ */ v("div", { className: "w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(gr, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ v("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(yr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "flex gap-8", children: [
      g(r),
      g(r + 1)
    ] })
  ] });
}
function In({
  value: e,
  onChange: t,
  placeholder: n = "DD/MM/YYYY",
  className: r = ""
}) {
  const s = Me(null), [o, i] = B(""), a = Me(0), l = (h) => {
    if (!h || h.length !== 10) return "";
    const [k, N, M] = h.split("-");
    return `${M}/${N}/${k}`;
  }, d = (h) => {
    const k = h.replace(/\D/g, "");
    if (k.length !== 8) return null;
    const N = k.substring(0, 2), M = k.substring(2, 4), m = k.substring(4, 8), w = parseInt(M, 10), O = parseInt(N, 10), D = parseInt(m, 10);
    return w < 1 || w > 12 || O < 1 || O > 31 || D < 1900 || D > 2100 ? null : `${m}-${M}-${N}`;
  };
  return Ye(() => {
    i(l(e));
  }, [e]), /* @__PURE__ */ f(
    "input",
    {
      ref: s,
      type: "text",
      value: o,
      onChange: (h) => {
        const k = h.target.value, N = h.target.selectionStart || 0, M = o;
        if (k.length < M.length) {
          if (k.replace(/\D/g, "").length < M.replace(/\D/g, "").length) {
            const D = k.replace(/\D/g, "");
            let b = "";
            if (D.length > 0 && (b = D.substring(0, 2), D.length > 2 && (b += "/" + D.substring(2, 4)), D.length > 4 && (b += "/" + D.substring(4, 8))), i(b), setTimeout(() => {
              if (s.current) {
                const p = Math.min(N, b.length);
                s.current.setSelectionRange(p, p);
              }
            }, 0), D.length === 8) {
              const p = d(b);
              p && t(p);
            }
          } else
            i(M), setTimeout(() => {
              s.current && s.current.setSelectionRange(N, N);
            }, 0);
          return;
        }
        const m = k.replace(/\D/g, "");
        let w = "";
        if (m.length > 0) {
          let D = m.substring(0, 2);
          if (D.length === 2) {
            const b = parseInt(D, 10);
            b > 31 ? D = "31" : b < 1 && D.length === 2 && (D = "01");
          }
          if (w = D, m.length > 2) {
            let b = m.substring(2, 4);
            if (b.length === 2) {
              const p = parseInt(b, 10);
              p > 12 ? b = "12" : p < 1 && b.length === 2 && (b = "01");
            }
            w += "/" + b;
          }
          if (m.length > 4) {
            let b = m.substring(4, 8);
            if (b.length === 4) {
              const p = parseInt(b, 10);
              p > 2100 ? b = "2100" : p < 1900 && (b = "1900");
            }
            w += "/" + b;
          }
        }
        i(w);
        let O = N;
        if (w.length > M.length) {
          const D = w.length - M.length;
          O = N + D;
        }
        if (w[O] === "/" && O++, setTimeout(() => {
          if (s.current) {
            const D = Math.min(O, w.length);
            s.current.setSelectionRange(D, D);
          }
        }, 0), m.length === 8) {
          const D = d(w);
          D && t(D);
        }
      },
      onBlur: () => {
        if (o) {
          const h = d(o);
          h ? (t(h), i(l(h))) : i(l(e));
        }
      },
      onKeyDown: (h) => {
        const k = s.current;
        if (!k) return;
        const N = k.selectionStart || 0;
        if (a.current = N, h.key === "ArrowLeft" || h.key === "ArrowRight") {
          setTimeout(() => {
            const M = k.selectionStart || 0;
            if (o[M] === "/") {
              const m = h.key === "ArrowLeft" ? -1 : 1;
              k.setSelectionRange(M + m, M + m);
            }
          }, 0);
          return;
        }
        if (!(h.key === "Backspace" || h.key === "Delete" || h.key === "Tab" || h.key === "Escape" || h.key === "Enter")) {
          if (!/^\d$/.test(h.key)) {
            h.preventDefault();
            return;
          }
          if (o[N] === "/") {
            h.preventDefault();
            const M = o.substring(0, N) + h.key + o.substring(N + 1);
            i(M), setTimeout(() => {
              if (s.current) {
                const m = N + 1;
                s.current.setSelectionRange(m, m);
              }
            }, 0);
            return;
          }
          if (N >= 3 && N <= 5) {
            const m = o.replace(/\D/g, "").substring(2, 4), w = m.length === 1 ? m : "", O = h.key;
            if (m.length === 1 && N === 5) {
              const D = parseInt(w + O, 10);
              if ((D === 0 || D > 12) && (h.preventDefault(), D > 12)) {
                const b = o.substring(0, 3) + w + "2" + o.substring(5);
                i(b), setTimeout(() => {
                  s.current && s.current.setSelectionRange(6, 6);
                }, 0);
              }
            }
          }
          if (N >= 0 && N <= 2) {
            const m = o.replace(/\D/g, "").substring(0, 2), w = m.length === 1 ? m : "", O = h.key;
            if (m.length === 1 && N === 1) {
              const D = parseInt(w + O, 10);
              if ((D === 0 || D > 31) && (h.preventDefault(), D > 31)) {
                const b = w + "1" + o.substring(2);
                i(b), setTimeout(() => {
                  s.current && s.current.setSelectionRange(2, 2);
                }, 0);
              }
            }
          }
        }
      },
      placeholder: n,
      maxLength: 10,
      className: r
    }
  );
}
const qi = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], ji = [
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
function Ki({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const s = Ct(), [o, i] = B(
    e?.unit || "day"
  ), [a, l] = B(
    e?.startDateUtc || s
  ), [d, g] = B(
    e?.endDateUtc || s
  ), [u, y] = B(e?.duration || 1), [h, k] = B(
    e?.excludedWeekdays || []
  ), [N, M] = B(
    []
  ), m = Me(null), [w, O] = B(0), [D, b] = B(!1), [p, _] = B([]), [U, X] = B(!1), [H, Q] = B(null), [V, fe] = B([]), [re, he] = B([]), [xe, Ue] = B(
    void 0
  ), ae = Me(null), [ee, pe] = B([]), [J, G] = B(() => e?.startDateUtc ? te(F(e.startDateUtc)) : te(F(s))), [be, De] = B(null), [qe, Ce] = B(() => e?.startDateUtc ? ne(F(e.startDateUtc)) : ne(F(s))), [je, Te] = B(null), [We, $e] = B(() => {
    if (e?.startDateUtc) {
      const x = ne(F(e.startDateUtc));
      return Math.floor(x / 10) * 10;
    }
    const c = ne(F(s));
    return Math.floor(c / 10) * 10;
  });
  Ye(() => {
    if (a && d) {
      const c = wr(
        a,
        d,
        o,
        h
      );
      y(c);
    } else
      y(1);
  }, [a, d, o, h]), Ye(() => {
    if (m.current) {
      const x = document.createElement("canvas").getContext("2d");
      if (x) {
        x.font = "14px system-ui, -apple-system, sans-serif";
        const T = x.measureText(u.toString()).width;
        O(12 + T + 4);
      }
    }
  }, [u]), Ye(() => {
    const c = (x) => {
      ae.current && !ae.current.contains(x.target) && X(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, []), Ye(() => {
    (async () => {
      await Je.init();
      const x = await Je.getData(
        "savedDateRanges"
      );
      x && pe(x);
    })();
  }, []);
  const Tt = (c) => {
    l(c), c && d && F(c) > F(d) && g(c), c && G(te(F(c)));
  }, Wt = (c) => {
    g(c), c && a && F(c) < F(a) && l(c), c && G(te(F(c)));
  }, et = !Xe, pt = (c) => {
    if (!(c <= 0)) {
      if (y(c), a) {
        const x = Wi(
          a,
          o,
          c,
          h
        );
        g(x), G(te(F(x)));
      } else if (d) {
        const x = Yi(
          d,
          o,
          c,
          h
        );
        l(x), G(te(F(x)));
      }
    }
  }, Yt = (c) => {
    i(c);
  }, Et = (c) => {
    h.includes(c) ? k(h.filter((x) => x !== c)) : k([...h, c]);
  }, _t = (c, x) => {
    l(c), g(x), c && G(te(F(c)));
  }, It = (c) => {
    l(c.startDateUtc), g(c.endDateUtc), i(c.unit), k(c.excludedWeekdays), y(c.duration), c.excludeEnabled !== void 0 && b(c.excludeEnabled), c.excludeFilterTypes ? _(c.excludeFilterTypes) : _([]), c.excludedSpecificDates ? M(c.excludedSpecificDates) : M([]), c.excludedSavedDates ? fe(c.excludedSavedDates) : fe([]), c.excludedDateRanges ? he(c.excludedDateRanges) : he([]), c.startDateUtc && G(te(F(c.startDateUtc)));
  }, Ft = () => {
    l(s), g(s), k([]), G(te(F(s)));
  }, Pt = () => {
    l(""), g(""), y(1), i("day"), k([]), b(!1), _([]), M([]), fe([]), he([]), Ue(void 0), Q(null), G(te(F(s)));
  }, tt = !a || a.trim() === "" || !d || d.trim() === "", bt = () => {
    if (tt)
      return;
    const c = _n(
      a,
      d,
      o,
      h,
      D,
      p,
      N,
      V,
      re
    );
    t(c);
  }, me = (c) => {
    if (c?.from) {
      const x = R(c.from);
      if (l(x), c?.to) {
        const T = R(c.to);
        g(T);
      } else
        g(x);
    }
  }, nt = (c, x) => {
    if (a && d && c?.to) {
      l(R(x)), console.log(
        "dayPickerProps",
        x,
        "parseUtc(endDateUtc)",
        F(d)
      ), x.getTime() > F(d).getTime() && g("");
      return;
    }
    if (!a && d && c?.from) {
      g(R(c?.from));
      return;
    }
    if (!a && !d && c?.from) {
      l(R(c?.from)), g("");
      return;
    }
    if (c?.from) {
      const T = R(c.from);
      if (l(T), c?.to) {
        const Y = R(c.to);
        g(Y);
      } else
        g(T);
    }
  }, Dt = (c) => {
    if (c && c.from) {
      const x = Fe(c.from, {
        weekStartsOn: tn
      }), T = Se(x, 6);
      if (c.to) {
        const Y = Fe(c.to, {
          weekStartsOn: tn
        }), W = Se(Y, 6);
        me({ from: x, to: W });
      } else
        me({ from: x, to: T });
    }
  }, wt = F(s), Be = {
    from: a ? F(a) : void 0,
    to: d ? F(d) : void 0
  }, xt = {
    from: a ? F(a) : wt,
    to: d ? F(d) : wt
  }, Le = (c) => {
    const x = !Xe, T = D && p.includes("days") && h.includes(c.getDay()), Y = D && p.includes("specific-date") && N.includes(R(c)), W = D && p.includes("saved-dates") && V.some(($) => {
      const S = ee.find((j) => j.id === $);
      if (!S) return !1;
      const q = R(c);
      if (!(q >= S.selection.startDateUtc && q <= S.selection.endDateUtc)) return !1;
      if (S.selection.excludedWeekdays && S.selection.excludedWeekdays.length > 0 && S.selection.excludedWeekdays.includes(c.getDay()) || S.selection.excludedSpecificDates && S.selection.excludedSpecificDates.length > 0 && S.selection.excludedSpecificDates.includes(q) || S.selection.excludedSavedDates && S.selection.excludedSavedDates.some(
        (se) => {
          const L = ee.find(
            (K) => K.id === se
          );
          return L ? q >= L.selection.startDateUtc && q <= L.selection.endDateUtc : !1;
        }
      ))
        return !0;
      let ce = !1;
      return !!(S.selection.excludedDateRanges && (ce = S.selection.excludedDateRanges.some(
        (j) => q >= j.start && q <= j.end
      ), ce));
    }), I = D && p.includes("date-range") && re.some(($) => {
      const S = R(c);
      return S >= $.start && S <= $.end;
    });
    return x || T || Y || W || I;
  }, Ut = (c, x) => {
    const T = te(
      ft(ht(/* @__PURE__ */ new Date(), c), x)
    );
    G(T), De(null), Ce(c);
  }, $t = (c) => {
    const x = Ge(J), T = te(
      ft(ht(/* @__PURE__ */ new Date(), c), x)
    );
    G(T), Te(null), $e(Math.floor(c / 10) * 10);
  };
  Ye(() => {
    be === null && Ce(ne(J));
  }, [J, be]);
  const vt = (c) => {
    const x = c - 1, T = c + 10, Y = ne(J), W = [];
    for (let I = x; I <= T; I++)
      W.push(I);
    return /* @__PURE__ */ v("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => $e(We - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ f("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ v("div", { className: "text-lg font-semibold", children: [
          c,
          "-",
          c + 9
        ] }),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => $e(We + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: W.map((I) => {
        const $ = !Xe, S = I < c || I > c + 9;
        return /* @__PURE__ */ f(
          "button",
          {
            onClick: () => $t(I),
            disabled: $,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${S ? "opacity-50 bg-gray-50 text-gray-500" : Y === I ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: I
          },
          I
        );
      }) })
    ] });
  }, kt = (c) => /* @__PURE__ */ v("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Ce(qe - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ f("div", { className: "text-lg font-semibold", children: c }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Ce(qe + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: ji.map((x, T) => {
      const Y = !Xe, W = ne(J) === c && Ge(J) === T;
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Ut(c, T),
          disabled: Y,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${W ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: x
        },
        x
      );
    }) })
  ] }), Ze = Me(null), rt = Me(null);
  return Ye(() => {
    if (o !== "day") return;
    const c = (Y, W) => {
      const I = Y.querySelector(
        "span[data-month-name]"
      ), $ = Y.querySelector(
        "span[data-year-name]"
      );
      if (I) {
        const j = Y.textContent || "";
        Y.style.gap = "6px";
        let se = "";
        if ($)
          se = $.textContent || "";
        else {
          const L = j.match(/\d{4}/);
          L && (se = L[0]);
        }
        if (!$ && se) {
          const L = document.createElement("span");
          L.textContent = se, L.setAttribute("data-year-name", "true"), L.style.cursor = "pointer", L.onclick = (ge) => {
            ge.stopPropagation(), ge.preventDefault();
            const Mt = parseInt(se, 10);
            if (!isNaN(Mt)) {
              const ze = Math.floor(Mt / 10) * 10;
              $e(ze), Te(W), De(null);
            }
          };
          const K = I.nextSibling;
          if (K && K.nodeType === Node.TEXT_NODE)
            K.parentNode?.insertBefore(L, K.nextSibling);
          else {
            const ge = document.createTextNode(" ");
            Y.appendChild(ge), Y.appendChild(L);
          }
        } else $ && ($.onclick = (L) => {
          L.stopPropagation(), L.preventDefault();
          const K = parseInt(se, 10);
          if (!isNaN(K)) {
            const ge = Math.floor(K / 10) * 10;
            $e(ge), Te(W), De(null);
          }
        });
        I.onclick = (L) => {
          L.stopPropagation(), L.preventDefault();
          const K = parseInt(se, 10);
          isNaN(K) || (Ce(K), De(W), Te(null));
        };
        return;
      }
      const S = Y.textContent || "", q = S.trim().split(/\s+/);
      let le = "", ce = "";
      if (q.length >= 2)
        le = q[0], ce = q[1];
      else if (q.length === 1) {
        const j = S.match(/^([A-Za-z]+)(\d{4})$/);
        if (j)
          le = j[1], ce = j[2];
        else
          return;
      } else
        return;
      if (le && ce) {
        const j = Y.firstChild;
        if (Y.style.gap = "6px", j && j.nodeType === Node.TEXT_NODE && (j.textContent || "").indexOf(le) !== -1) {
          const K = document.createElement("span");
          K.textContent = le, K.setAttribute("data-month-name", "true"), K.style.cursor = "pointer", K.onclick = (ze) => {
            ze.stopPropagation(), ze.preventDefault();
            const st = parseInt(ce, 10);
            isNaN(st) || (Ce(st), De(W), Te(null));
          };
          const ge = document.createElement("span");
          ge.textContent = ce, ge.setAttribute("data-year-name", "true"), ge.style.cursor = "pointer", ge.onclick = (ze) => {
            ze.stopPropagation(), ze.preventDefault();
            const st = parseInt(ce, 10);
            if (!isNaN(st)) {
              const xr = Math.floor(st / 10) * 10;
              $e(xr), Te(W), De(null);
            }
          }, Y.innerHTML = "", Y.appendChild(K);
          const Mt = document.createTextNode(" ");
          Y.appendChild(Mt), Y.appendChild(ge);
        }
      }
    }, x = (Y, W) => {
      if (!Y) return;
      Y.querySelectorAll(".rdp-caption_label").forEach(($, S) => {
        const q = $, le = W !== null ? W : S === 0 ? 0 : 1;
        be === le || je === le || c(q, le);
      });
    }, T = setTimeout(() => {
      be === null && je === null ? x(Ze.current, null) : (x(Ze.current, 0), x(rt.current, 1));
    }, 150);
    return () => clearTimeout(T);
  }, [o, J, be, je]), /* @__PURE__ */ v(
    "div",
    {
      className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-[85vh]",
      style: r,
      children: [
        /* @__PURE__ */ f(
          $i,
          {
            onPresetSelect: _t,
            onSavedDateSelect: It,
            currentSelection: _n(
              a,
              d,
              o,
              h,
              D,
              p,
              N,
              V,
              re
            )
          }
        ),
        /* @__PURE__ */ v("div", { className: "flex-1 flex flex-col min-h-0", children: [
          /* @__PURE__ */ v("div", { className: "px-6 pt-6 overflow-y-auto flex-1", children: [
            /* @__PURE__ */ f("div", { className: "flex gap-2 mb-4", children: ["day", "week", "month", "quarter"].map(
              (c) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => Yt(c),
                  className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${o === c ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
                  children: c.charAt(0).toUpperCase() + c.slice(1)
                },
                c
              )
            ) }),
            /* @__PURE__ */ v("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Start Date" }),
                /* @__PURE__ */ f(
                  In,
                  {
                    value: a,
                    onChange: Tt,
                    placeholder: "DD/MM/YYYY",
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "End Date" }),
                /* @__PURE__ */ f(
                  In,
                  {
                    value: d,
                    onChange: Wt,
                    placeholder: "DD/MM/YYYY",
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Duration" }),
                /* @__PURE__ */ v("div", { className: "relative", children: [
                  /* @__PURE__ */ f(
                    "input",
                    {
                      ref: m,
                      type: "number",
                      min: "1",
                      value: u,
                      onChange: (c) => pt(Number(c.target.value)),
                      className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "span",
                    {
                      className: "absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none",
                      style: { left: `${w}px` },
                      children: _i(o)
                    }
                  )
                ] })
              ] })
            ] }),
            et,
            /* @__PURE__ */ v("div", { className: "mb-4", children: [
              /* @__PURE__ */ v("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ f(
                  "input",
                  {
                    type: "checkbox",
                    id: "exclude-checkbox",
                    checked: D,
                    onChange: (c) => b(c.target.checked),
                    className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ f(
                  "label",
                  {
                    htmlFor: "exclude-checkbox",
                    className: "text-sm text-gray-700",
                    children: "exclude from selection"
                  }
                ),
                /* @__PURE__ */ v("div", { className: "relative flex-1", ref: ae, children: [
                  /* @__PURE__ */ f(
                    "button",
                    {
                      type: "button",
                      onClick: () => D && X(!U),
                      disabled: !D,
                      className: "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                      children: /* @__PURE__ */ f(
                        "span",
                        {
                          className: p.length === 0 ? "text-gray-400" : "text-gray-700",
                          children: p.length === 0 ? "select a filter" : p.length === 1 ? (() => {
                            switch (p[0]) {
                              case "days":
                                return "Days";
                              case "specific-date":
                                return "Specific Date";
                              case "saved-dates":
                                return "Saved Dates";
                              case "date-range":
                                return "Date Range";
                              default:
                                return "Specific Date";
                            }
                          })() : `${p.length} filters selected`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ f(Ka, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }),
                  U && D && /* @__PURE__ */ f("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", children: /* @__PURE__ */ v("div", { className: "p-2 space-y-1", children: [
                    /* @__PURE__ */ v("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: p.includes("days"),
                          onChange: (c) => {
                            c.target.checked ? _([
                              ...p,
                              "days"
                            ]) : _(
                              p.filter((x) => x !== "days")
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Days" })
                    ] }),
                    /* @__PURE__ */ v("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: p.includes("specific-date"),
                          onChange: (c) => {
                            c.target.checked ? _([
                              ...p,
                              "specific-date"
                            ]) : _(
                              p.filter(
                                (x) => x !== "specific-date"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Specific Date" })
                    ] }),
                    /* @__PURE__ */ v("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: p.includes("saved-dates"),
                          onChange: (c) => {
                            c.target.checked ? _([
                              ...p,
                              "saved-dates"
                            ]) : _(
                              p.filter(
                                (x) => x !== "saved-dates"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Saved Dates" })
                    ] }),
                    /* @__PURE__ */ v("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: p.includes("date-range"),
                          onChange: (c) => {
                            c.target.checked ? _([
                              ...p,
                              "date-range"
                            ]) : _(
                              p.filter(
                                (x) => x !== "date-range"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Date Range" })
                    ] })
                  ] }) })
                ] })
              ] }),
              D && p.length > 0 && /* @__PURE__ */ v("div", { className: "flex gap-2 items-center", children: [
                p.includes("days") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => Q(
                      H === "days" ? null : "days"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "days" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Zt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Days (",
                        h.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                p.includes("specific-date") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => Q(
                      H === "specific-date" ? null : "specific-date"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "specific-date" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Zt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Dates (",
                        N.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                p.includes("saved-dates") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => Q(
                      H === "saved-dates" ? null : "saved-dates"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "saved-dates" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Qa, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Saved (",
                        V.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                p.includes("date-range") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => Q(
                      H === "date-range" ? null : "date-range"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "date-range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Zt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Date Ranges (",
                        re.length,
                        " selected)"
                      ] })
                    ]
                  }
                )
              ] }),
              D && H === "days" && p.includes("days") && /* @__PURE__ */ f("div", { className: "mt-3 flex gap-2", children: qi.map((c) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => Et(c.value),
                  className: `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${h.includes(c.value) ? "bg-red-100 text-red-700 border-2 border-red-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                  children: c.label
                },
                c.value
              )) }),
              D && H === "specific-date" && p.includes("specific-date") && /* @__PURE__ */ v("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 text-center mb-2", children: "Click individual dates to exclude them" }),
                /* @__PURE__ */ f("div", { className: "flex justify-center p-4 border border-gray-200 rounded-md bg-gray-50", children: /* @__PURE__ */ f(
                  He,
                  {
                    mode: "multiple",
                    selected: N.map((c) => F(c)),
                    onSelect: (c) => {
                      c && M(
                        c.map((x) => R(x))
                      );
                    },
                    numberOfMonths: 2,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                N.length > 0 && /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: N.map((c) => /* @__PURE__ */ v(
                  "div",
                  {
                    className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                    children: [
                      /* @__PURE__ */ f("span", { children: (/* @__PURE__ */ new Date(c + "T00:00:00")).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        }
                      ) }),
                      /* @__PURE__ */ f(
                        "button",
                        {
                          onClick: () => {
                            M(
                              N.filter((x) => x !== c)
                            );
                          },
                          className: "hover:bg-red-200 rounded-full p-0.5",
                          children: /* @__PURE__ */ f(kn, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  },
                  c
                )) })
              ] }),
              D && H === "saved-dates" && p.includes("saved-dates") && /* @__PURE__ */ f("div", { className: "mt-3 flex flex-col gap-3", children: ee.length === 0 ? /* @__PURE__ */ f("p", { className: "text-sm text-gray-500 text-center py-4", children: "No saved dates available" }) : /* @__PURE__ */ f("div", { className: "space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2", children: ee.map((c) => {
                const x = V.includes(
                  c.id
                );
                return /* @__PURE__ */ v(
                  "div",
                  {
                    className: `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${x ? "bg-red-50 border border-red-300" : "bg-white hover:bg-gray-50 border border-gray-200"}`,
                    onClick: () => {
                      fe(
                        x ? V.filter(
                          (T) => T !== c.id
                        ) : [
                          ...V,
                          c.id
                        ]
                      );
                    },
                    children: [
                      /* @__PURE__ */ v("div", { className: "flex-1", children: [
                        /* @__PURE__ */ f("div", { className: "text-sm font-medium text-gray-900", children: c.label }),
                        /* @__PURE__ */ v("div", { className: "text-xs text-gray-600", children: [
                          (/* @__PURE__ */ new Date(
                            c.selection.startDateUtc + "T00:00:00"
                          )).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }),
                          " ",
                          "-",
                          " ",
                          (/* @__PURE__ */ new Date(
                            c.selection.endDateUtc + "T00:00:00"
                          )).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })
                        ] })
                      ] }),
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: x,
                          onChange: () => {
                          },
                          className: "w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        }
                      )
                    ]
                  },
                  c.id
                );
              }) }) }),
              D && H === "date-range" && p.includes("date-range") && /* @__PURE__ */ v("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ f("div", { className: "border border-gray-200 rounded-md bg-gray-50 p-4", children: /* @__PURE__ */ f(
                  He,
                  {
                    mode: "range",
                    selected: xe,
                    onSelect: (c) => Ue(c),
                    numberOfMonths: 2,
                    disabled: (c) => !Xe,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                xe?.from && xe?.to && /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => {
                        const c = {
                          id: `range-${Date.now()}`,
                          start: R(xe.from),
                          end: R(xe.to)
                        };
                        he([
                          ...re,
                          c
                        ]), Ue(void 0);
                      },
                      className: "px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors",
                      children: "Add Date Range"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => Ue(void 0),
                      className: "px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors",
                      children: "Clear Selection"
                    }
                  )
                ] }),
                re.length > 0 && /* @__PURE__ */ v("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ f("p", { className: "text-xs text-gray-600 font-medium", children: "Excluded Date Ranges:" }),
                  /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: re.map((c) => /* @__PURE__ */ v(
                    "div",
                    {
                      className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                      children: [
                        /* @__PURE__ */ v("span", { children: [
                          (/* @__PURE__ */ new Date(
                            c.start + "T00:00:00"
                          )).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }),
                          " - ",
                          (/* @__PURE__ */ new Date(
                            c.end + "T00:00:00"
                          )).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })
                        ] }),
                        /* @__PURE__ */ f(
                          "button",
                          {
                            onClick: () => {
                              he(
                                re.filter(
                                  (x) => x.id !== c.id
                                )
                              );
                            },
                            className: "hover:bg-red-200 rounded-full p-0.5",
                            children: /* @__PURE__ */ f(kn, { className: "w-3 h-3" })
                          }
                        )
                      ]
                    },
                    c.id
                  )) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ v("div", { className: "flex gap-4 justify-center mb-4", children: [
              o === "day" && /* @__PURE__ */ f("div", { className: "flex gap-4", children: je !== null ? je === 0 ? (
                // When yearsViewIndex === 0, show years grid on left and single calendar on right
                /* @__PURE__ */ v(ct, { children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: vt(We)
                    }
                  ),
                  /* @__PURE__ */ f("div", { ref: rt, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: me,
                      month: te(Ee(J, 1)),
                      onMonthChange: (c) => {
                        const x = new Date(J), Y = new Date(c).getMonth() - x.getMonth();
                        Y !== 1 && Y !== -11 && G(
                          te(Ee(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: Le,
                      modifiersClassNames: {
                        selected: "rdp-day_selected bg-[#003DB8]",
                        disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                      },
                      classNames: {
                        chevron: "fill-black"
                      }
                    }
                  ) })
                ] })
              ) : (
                // When yearsViewIndex === 1, show single calendar on left and years grid on right
                /* @__PURE__ */ v(ct, { children: [
                  /* @__PURE__ */ f("div", { ref: Ze, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: me,
                      month: J,
                      onMonthChange: G,
                      numberOfMonths: 1,
                      disabled: Le,
                      modifiersClassNames: {
                        selected: "rdp-day_selected bg-[#003DB8]",
                        disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                      },
                      classNames: {
                        chevron: "fill-black"
                      }
                    }
                  ) }),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: vt(We)
                    }
                  )
                ] })
              ) : be === null ? (
                // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
                /* @__PURE__ */ f("div", { ref: Ze, children: /* @__PURE__ */ f(
                  He,
                  {
                    mode: "range",
                    navLayout: "around",
                    selected: Be,
                    onSelect: (c, x) => {
                      nt(c, x);
                    },
                    month: J,
                    onMonthChange: G,
                    numberOfMonths: 2,
                    disabled: Le,
                    modifiersClassNames: {
                      selected: "rdp-day_selected bg-[#003DB8]",
                      disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                    },
                    classNames: {
                      chevron: "fill-black"
                    }
                  }
                ) })
              ) : be === 0 ? (
                // When monthsViewIndex === 0, show months grid on left and single calendar on right
                /* @__PURE__ */ v(ct, { children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: kt(qe)
                    }
                  ),
                  /* @__PURE__ */ f("div", { ref: rt, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: me,
                      month: te(Ee(J, 1)),
                      onMonthChange: (c) => {
                        const x = new Date(J), Y = new Date(c).getMonth() - x.getMonth();
                        Y !== 1 && Y !== -11 && G(
                          te(Ee(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: Le,
                      modifiersClassNames: {
                        selected: "rdp-day_selected bg-[#003DB8]",
                        disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                      },
                      classNames: {
                        chevron: "fill-black"
                      }
                    }
                  ) })
                ] })
              ) : (
                // When monthsViewIndex === 1, show single calendar on left and months grid on right
                /* @__PURE__ */ v(ct, { children: [
                  /* @__PURE__ */ f("div", { ref: Ze, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: me,
                      month: J,
                      onMonthChange: G,
                      numberOfMonths: 1,
                      disabled: Le,
                      modifiersClassNames: {
                        selected: "rdp-day_selected bg-[#003DB8]",
                        disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                      },
                      classNames: {
                        chevron: "fill-black"
                      }
                    }
                  ) }),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: kt(qe)
                    }
                  )
                ] })
              ) }),
              o === "week" && /* @__PURE__ */ f(
                He,
                {
                  mode: "range",
                  navLayout: "around",
                  showWeekNumber: !0,
                  locale: void 0,
                  formatters: {
                    formatWeekNumber: (c) => `W${String(c).padStart(2, "0")}`
                  },
                  selected: Be,
                  onSelect: Dt,
                  onWeekNumberClick: (c, x) => {
                    x && x.length > 0 && Dt({
                      from: x[0],
                      to: x[x.length - 1]
                    });
                  },
                  month: J,
                  onMonthChange: G,
                  numberOfMonths: 2,
                  disabled: (c) => {
                    const x = !Xe, T = D && p.includes("days") && h.includes(c.getDay()), Y = D && p.includes("specific-date") && N.includes(R(c)), W = D && p.includes("saved-dates") && V.some(($) => {
                      const S = ee.find(
                        (j) => j.id === $
                      );
                      if (!S) return !1;
                      const q = R(c);
                      if (!(q >= S.selection.startDateUtc && q <= S.selection.endDateUtc)) return !1;
                      if (S.selection.excludedWeekdays && S.selection.excludedWeekdays.length > 0 && S.selection.excludedWeekdays.includes(c.getDay()) || S.selection.excludedSpecificDates && S.selection.excludedSpecificDates.length > 0 && S.selection.excludedSpecificDates.includes(q) || S.selection.excludedSavedDates && S.selection.excludedSavedDates.some(
                        (se) => {
                          const L = ee.find(
                            (K) => K.id === se
                          );
                          return L ? q >= L.selection.startDateUtc && q <= L.selection.endDateUtc : !1;
                        }
                      ))
                        return !0;
                      let ce = !1;
                      return !!(S.selection.excludedDateRanges && (ce = S.selection.excludedDateRanges.some(
                        (j) => q >= j.start && q <= j.end
                      ), ce));
                    }), I = D && p.includes("date-range") && re.some(($) => {
                      const S = R(c);
                      return S >= $.start && S <= $.end;
                    });
                    return x || T || Y || W || I;
                  },
                  modifiersClassNames: {
                    selected: "rdp-day_selected bg-[#003DB8]",
                    disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                  },
                  classNames: {
                    chevron: "fill-black"
                  }
                }
              ),
              o === "month" && /* @__PURE__ */ f(
                Ai,
                {
                  selectedRange: xt,
                  onSelect: me
                }
              ),
              o === "quarter" && /* @__PURE__ */ f(
                Ri,
                {
                  selectedRange: xt,
                  onSelect: me
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ v("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
            /* @__PURE__ */ f(
              "button",
              {
                onClick: Ft,
                className: "px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
                children: "Today"
              }
            ),
            /* @__PURE__ */ v("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: Pt,
                  className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
                  children: "Clear dates"
                }
              ),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: n,
                  className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: bt,
                  disabled: !!(tt || et),
                  className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${tt || et ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
                  children: "Apply"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  Xe as ALLOW_FUTURE_DATES,
  Ki as AdvancedDateRangePicker,
  zi as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  Qi as WEEK_NUMBERING_MODE,
  tn as WEEK_STARTS_ON,
  wr as calcDurationFromRange,
  Wi as calcEndFromDuration,
  Yi as calcStartFromDuration,
  _n as createSelection,
  Vi as formatDisplayDate,
  R as formatUtc,
  Ii as getPresets,
  Ct as getTodayUtc,
  _i as getUnitAbbreviation,
  Gi as parseDisplayDate,
  F as parseUtc
};
