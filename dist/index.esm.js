import { jsxs as x, jsx as f, Fragment as lt } from "react/jsx-runtime";
import C, { createContext as Nr, useContext as Sr, useCallback as be, useRef as Me, useLayoutEffect as Or, useState as B, useEffect as We, useMemo as At, forwardRef as $n, createElement as tn } from "react";
function Cr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Tr = {}, dt = {};
function Qe(e, t) {
  try {
    const r = (Tr[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in dt ? dt[r] : fn(r, r.split(":"));
  } catch {
    if (e in dt) return dt[e];
    const n = e?.match(Wr);
    return n ? fn(e, n.slice(1)) : NaN;
  }
}
const Wr = /([+-]\d\d):?(\d\d)?/;
function fn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return dt[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class Ne extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Qe(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Bn(this), nn(this)) : this.setTime(Date.now());
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
    const t = -Qe(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), nn(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ne(+new Date(t), this.timeZone);
  }
  //#endregion
}
const hn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!hn.test(e)) return;
  const t = e.replace(hn, "$1UTC");
  Ne.prototype[t] && (e.startsWith("get") ? Ne.prototype[e] = function() {
    return this.internal[t]();
  } : (Ne.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Yr(this), +this;
  }, Ne.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), nn(this), +this;
  }));
});
function nn(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Qe(e.timeZone, e) * 60));
}
function Yr(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Bn(e);
}
function Bn(e) {
  const t = Qe(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = s - o, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = s - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const y = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(Qe(e.timeZone, e) * 60)) % 60;
  (d || y) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + y));
  const b = Qe(e.timeZone, e), h = b > 0 ? Math.floor(b) : Math.ceil(b), O = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, v = h !== n, w = O - l;
  if (v && w) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w);
    const g = Qe(e.timeZone, e), k = g > 0 ? Math.floor(g) : Math.ceil(g), S = h - k;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class ae extends Ne {
  //#region static
  static tz(t, ...n) {
    return n.length ? new ae(...n, t) : new ae(Date.now(), t);
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
    return `${t} GMT${n}${r}${s} (${Cr(this.timeZone, this)})`;
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
    return new ae(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new ae(+new Date(t), this.timeZone);
  }
  //#endregion
}
const An = 6048e5, Er = 864e5, Hn = 6e4, Rn = 36e5, mn = Symbol.for("constructDateFrom");
function z(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && mn in e ? e[mn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function U(e, t) {
  return z(t || e, e);
}
function Se(e, t, n) {
  const r = U(e, n?.in);
  return isNaN(t) ? z(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ye(e, t, n) {
  const r = U(e, n?.in);
  if (isNaN(t)) return z(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), o = z(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const a = o.getDate();
  return s >= a ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    s
  ), r);
}
let _r = {};
function gt() {
  return _r;
}
function Ie(e, t) {
  const n = gt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = U(e, t?.in), o = s.getDay(), a = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function ut(e, t) {
  return Ie(e, { ...t, weekStartsOn: 1 });
}
function qn(e, t) {
  const n = U(e, t?.in), r = n.getFullYear(), s = z(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const o = ut(s), a = z(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = ut(a);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function gn(e) {
  const t = U(e), n = new Date(
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
function ft(e, t) {
  const n = U(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function on(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  ), o = ft(r), a = ft(s), i = +o - gn(o), l = +a - gn(a);
  return Math.round((i - l) / Er);
}
function Ir(e, t) {
  const n = qn(e, t), r = z(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ut(r);
}
function jn(e, t, n) {
  return Ye(e, t * 3, n);
}
function an(e, t, n) {
  return Se(e, t * 7, n);
}
function Fr(e, t, n) {
  return Ye(e, t * 12, n);
}
function Pr(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = z.bind(null, s));
    const o = U(s, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), z(r, n || NaN);
}
function Ur(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = z.bind(null, s));
    const o = U(s, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), z(r, n || NaN);
}
function Ht(e, t) {
  const n = +U(e) - +U(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function $r(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  );
  return +ft(r) == +ft(s);
}
function Ln(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Br(e) {
  return !(!Ln(e) && typeof e != "number" || isNaN(+U(e)));
}
function Zn(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  ), o = r.getFullYear() - s.getFullYear(), a = r.getMonth() - s.getMonth();
  return o * 12 + a;
}
function Mt(e, t) {
  const n = U(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function zn(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  ), o = yn(r, s), a = Math.abs(
    on(r, s)
  );
  r.setDate(r.getDate() - o * a);
  const i = +(yn(r, s) === -o), l = o * (a - i);
  return l === 0 ? 0 : l;
}
function yn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Qn(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function Ar(e, t) {
  const n = U(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function Vn(e, t) {
  const n = U(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Hr(e, t) {
  const n = U(e, t?.in);
  return +Ar(n, t) == +Vn(n, t);
}
function Gn(e, t, n) {
  const [r, s, o] = Re(
    n?.in,
    e,
    e,
    t
  ), a = Ht(s, o), i = Math.abs(
    Zn(s, o)
  );
  if (i < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - a * i);
  let l = Ht(s, o) === -a;
  Hr(r) && i === 1 && Ht(r, o) === 1 && (l = !1);
  const u = a * (i - +l);
  return u === 0 ? 0 : u;
}
function Rr(e, t, n) {
  const r = Gn(e, t, n) / 3;
  return Qn()(r);
}
function qr(e, t, n) {
  const r = zn(e, t, n) / 7;
  return Qn()(r);
}
function cn(e, t) {
  const [n, r] = Re(e, t.start, t.end);
  return { start: n, end: r };
}
function Kn(e, t) {
  const { start: n, end: r } = cn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0);
  let i = 1;
  const l = [];
  for (; +a <= o; )
    l.push(z(n, a)), a.setDate(a.getDate() + i), a.setHours(0, 0, 0, 0);
  return s ? l.reverse() : l;
}
function jr(e, t) {
  const { start: n, end: r } = cn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= o; )
    l.push(z(n, a)), a.setMonth(a.getMonth() + i);
  return s ? l.reverse() : l;
}
function Lr(e, t) {
  const n = U(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function J(e, t) {
  const n = U(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Zr(e, t) {
  const n = U(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function ln(e, t) {
  const n = U(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function zr(e, t) {
  const { start: n, end: r } = cn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= o; )
    l.push(z(n, a)), a.setFullYear(a.getFullYear() + i);
  return s ? l.reverse() : l;
}
function Xn(e, t) {
  const n = gt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = U(e, t?.in), o = s.getDay(), a = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + a), s.setHours(23, 59, 59, 999), s;
}
function Qr(e, t) {
  return Xn(e, { ...t, weekStartsOn: 1 });
}
const Vr = {
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
}, Gr = (e, t, n) => {
  let r;
  const s = Vr[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Rt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Kr = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Xr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Jr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, es = {
  date: Rt({
    formats: Kr,
    defaultWidth: "full"
  }),
  time: Rt({
    formats: Xr,
    defaultWidth: "full"
  }),
  dateTime: Rt({
    formats: Jr,
    defaultWidth: "full"
  })
}, ts = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ns = (e, t, n, r) => ts[e];
function at(e) {
  return (t, n) => {
    const r = n?.context ? String(n.context) : "standalone";
    let s;
    if (r === "formatting" && e.formattingValues) {
      const a = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : a;
      s = e.formattingValues[i] || e.formattingValues[a];
    } else {
      const a = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
      s = e.values[i] || e.values[a];
    }
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return s[o];
  };
}
const rs = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ss = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, os = {
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
}, as = {
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
}, is = {
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
}, cs = {
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
}, ls = (e, t) => {
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
}, ds = {
  ordinalNumber: ls,
  era: at({
    values: rs,
    defaultWidth: "wide"
  }),
  quarter: at({
    values: ss,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: at({
    values: os,
    defaultWidth: "wide"
  }),
  day: at({
    values: as,
    defaultWidth: "wide"
  }),
  dayPeriod: at({
    values: is,
    defaultWidth: "wide",
    formattingValues: cs,
    defaultFormattingWidth: "wide"
  })
};
function it(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(s);
    if (!o)
      return null;
    const a = o[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? fs(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      us(i, (d) => d.test(a))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const y = t.slice(a.length);
    return { value: u, rest: y };
  };
}
function us(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function fs(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function hs(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const s = r[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let a = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    const i = t.slice(s.length);
    return { value: a, rest: i };
  };
}
const ms = /^(\d+)(th|st|nd|rd)?/i, gs = /\d+/i, ys = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ps = {
  any: [/^b/i, /^(a|c)/i]
}, bs = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Ds = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ws = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, xs = {
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
}, vs = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ks = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ms = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Ns = {
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
}, Ss = {
  ordinalNumber: hs({
    matchPattern: ms,
    parsePattern: gs,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: it({
    matchPatterns: ys,
    defaultMatchWidth: "wide",
    parsePatterns: ps,
    defaultParseWidth: "any"
  }),
  quarter: it({
    matchPatterns: bs,
    defaultMatchWidth: "wide",
    parsePatterns: Ds,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: it({
    matchPatterns: ws,
    defaultMatchWidth: "wide",
    parsePatterns: xs,
    defaultParseWidth: "any"
  }),
  day: it({
    matchPatterns: vs,
    defaultMatchWidth: "wide",
    parsePatterns: ks,
    defaultParseWidth: "any"
  }),
  dayPeriod: it({
    matchPatterns: Ms,
    defaultMatchWidth: "any",
    parsePatterns: Ns,
    defaultParseWidth: "any"
  })
}, dn = {
  code: "en-US",
  formatDistance: Gr,
  formatLong: es,
  formatRelative: ns,
  localize: ds,
  match: Ss,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Os(e, t) {
  const n = U(e, t?.in);
  return on(n, ln(n)) + 1;
}
function Jn(e, t) {
  const n = U(e, t?.in), r = +ut(n) - +Ir(n);
  return Math.round(r / An) + 1;
}
function er(e, t) {
  const n = U(e, t?.in), r = n.getFullYear(), s = gt(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, a = z(t?.in || e, 0);
  a.setFullYear(r + 1, 0, o), a.setHours(0, 0, 0, 0);
  const i = Ie(a, t), l = z(t?.in || e, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const u = Ie(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function Cs(e, t) {
  const n = gt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = er(e, t), o = z(t?.in || e, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), Ie(o, t);
}
function tr(e, t) {
  const n = U(e, t?.in), r = +Ie(n, t) - +Cs(n, t);
  return Math.round(r / An) + 1;
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
}, et = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, pn = {
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
    const s = er(e, r), o = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const a = o % 100;
      return A(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : A(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = qn(e);
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
    const s = tr(e, r);
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : A(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Jn(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : A(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ae.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Os(e);
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
        return Dn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return ze(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return ze(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Dn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return ze(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return ze(r, ":");
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
        return "GMT" + bn(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + ze(r, ":");
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
        return "GMT" + bn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + ze(r, ":");
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
function bn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + t + A(o, 2);
}
function Dn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + A(Math.abs(e) / 60, 2) : ze(e, t);
}
function ze(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = A(Math.trunc(r / 60), 2), o = A(r % 60, 2);
  return n + s + t + o;
}
const wn = (e, t) => {
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
}, nr = (e, t) => {
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
}, Ts = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return wn(e, t);
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
  return o.replace("{{date}}", wn(r, t)).replace("{{time}}", nr(s, t));
}, Ws = {
  p: nr,
  P: Ts
}, Ys = /^D+$/, Es = /^Y+$/, _s = ["D", "DD", "YY", "YYYY"];
function Is(e) {
  return Ys.test(e);
}
function Fs(e) {
  return Es.test(e);
}
function Ps(e, t, n) {
  const r = Us(e, t, n);
  if (console.warn(r), _s.includes(e)) throw new RangeError(r);
}
function Us(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const $s = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Bs = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, As = /^'([^]*?)'?$/, Hs = /''/g, Rs = /[a-zA-Z]/;
function qs(e, t, n) {
  const r = gt(), s = n?.locale ?? r.locale ?? dn, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = U(e, n?.in);
  if (!Br(i))
    throw new RangeError("Invalid time value");
  let l = t.match(Bs).map((y) => {
    const d = y[0];
    if (d === "p" || d === "P") {
      const b = Ws[d];
      return b(y, s.formatLong);
    }
    return y;
  }).join("").match($s).map((y) => {
    if (y === "''")
      return { isToken: !1, value: "'" };
    const d = y[0];
    if (d === "'")
      return { isToken: !1, value: js(y) };
    if (pn[d])
      return { isToken: !0, value: y };
    if (d.match(Rs))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: y };
  });
  s.localize.preprocessor && (l = s.localize.preprocessor(i, l));
  const u = {
    firstWeekContainsDate: o,
    weekStartsOn: a,
    locale: s
  };
  return l.map((y) => {
    if (!y.isToken) return y.value;
    const d = y.value;
    (!n?.useAdditionalWeekYearTokens && Fs(d) || !n?.useAdditionalDayOfYearTokens && Is(d)) && Ps(d, t, String(e));
    const b = pn[d[0]];
    return b(i, d, s.localize, u);
  }).join("");
}
function js(e) {
  const t = e.match(As);
  return t ? t[1].replace(Hs, "'") : e;
}
function Ls(e, t) {
  const n = U(e, t?.in), r = n.getFullYear(), s = n.getMonth(), o = z(n, 0);
  return o.setFullYear(r, s + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Ve(e, t) {
  return U(e, t?.in).getMonth();
}
function ee(e, t) {
  return U(e, t?.in).getFullYear();
}
function Zs(e, t) {
  return +U(e) > +U(t);
}
function zs(e, t) {
  return +U(e) < +U(t);
}
function Qs(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function Vs(e, t, n) {
  const [r, s] = Re(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function Gs(e, t) {
  const n = () => z(t?.in, NaN), s = eo(e);
  let o;
  if (s.date) {
    const u = to(s.date, 2);
    o = no(u.restDateString, u.year);
  }
  if (!o || isNaN(+o)) return n();
  const a = +o;
  let i = 0, l;
  if (s.time && (i = ro(s.time), isNaN(i)))
    return n();
  if (s.timezone) {
    if (l = so(s.timezone), isNaN(l)) return n();
  } else {
    const u = new Date(a + i), y = U(0, t?.in);
    return y.setFullYear(
      u.getUTCFullYear(),
      u.getUTCMonth(),
      u.getUTCDate()
    ), y.setHours(
      u.getUTCHours(),
      u.getUTCMinutes(),
      u.getUTCSeconds(),
      u.getUTCMilliseconds()
    ), y;
  }
  return U(a + i + l, t?.in);
}
const Nt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Ks = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Xs = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Js = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function eo(e) {
  const t = {}, n = e.split(Nt.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], Nt.timeZoneDelimiter.test(t.date) && (t.date = e.split(Nt.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = Nt.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function to(e, t) {
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
function no(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(Ks);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = ct(n[1]), o = ct(n[2]) - 1, a = ct(n[3]), i = ct(n[4]), l = ct(n[5]) - 1;
  if (r)
    return lo(t, i, l) ? oo(t, i, l) : /* @__PURE__ */ new Date(NaN);
  {
    const u = /* @__PURE__ */ new Date(0);
    return !io(t, o, a) || !co(t, s) ? /* @__PURE__ */ new Date(NaN) : (u.setUTCFullYear(t, o, Math.max(s, a)), u);
  }
}
function ct(e) {
  return e ? parseInt(e) : 1;
}
function ro(e) {
  const t = e.match(Xs);
  if (!t) return NaN;
  const n = qt(t[1]), r = qt(t[2]), s = qt(t[3]);
  return uo(n, r, s) ? n * Rn + r * Hn + s * 1e3 : NaN;
}
function qt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function so(e) {
  if (e === "Z") return 0;
  const t = e.match(Js);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return fo(r, s) ? n * (r * Rn + s * Hn) : NaN;
}
function oo(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const ao = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function rr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function io(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (ao[t] || (rr(e) ? 29 : 28));
}
function co(e, t) {
  return t >= 1 && t <= (rr(e) ? 366 : 365);
}
function lo(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function uo(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function fo(e, t) {
  return t >= 0 && t <= 59;
}
function ht(e, t, n) {
  const r = U(e, n?.in), s = r.getFullYear(), o = r.getDate(), a = z(e, 0);
  a.setFullYear(s, t, 15), a.setHours(0, 0, 0, 0);
  const i = Ls(a);
  return r.setMonth(t, Math.min(o, i)), r;
}
function ho(e, t, n) {
  const r = U(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, o = t - s;
  return ht(r, r.getMonth() + o * 3);
}
function mt(e, t, n) {
  const r = U(e, n?.in);
  return isNaN(+r) ? z(e, NaN) : (r.setFullYear(t), r);
}
const xn = 5, mo = 4;
function go(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), o = t.addDays(s, xn * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? xn : mo;
}
function sr(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function yo(e, t) {
  const n = sr(e, t), r = go(e, t);
  return t.addDays(n, r * 7 - 1);
}
class fe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? ae.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, o) => this.overrides?.newDate ? this.overrides.newDate(r, s, o) : this.options.timeZone ? new ae(r, s, o, this.options.timeZone) : new Date(r, s, o), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : Se(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Ye(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : an(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : Fr(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : on(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : Zn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : jr(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : zr(r), o = new Set(s.map((i) => this.getYear(i)));
      if (o.size === s.length)
        return s;
      const a = [];
      return o.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : yo(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Qr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Vn(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : Xn(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Zr(r), this.format = (r, s, o) => {
      const a = this.overrides?.format ? this.overrides.format(r, s, this.options) : qs(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Jn(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ve(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ee(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : tr(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : Zs(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : zs(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Ln(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : $r(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : Qs(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : Vs(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Pr(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Ur(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : ht(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : mt(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : sr(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ft(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : ut(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : J(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Ie(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : ln(r), this.options = { locale: dn, ...t }, this.overrides = n;
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
    return t && fe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: s } = this.options, o = n?.code;
    if (o && fe.yearFirstLocales.has(o))
      try {
        return new Intl.DateTimeFormat(o, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: s
        }).format(t);
      } catch {
      }
    const a = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, a);
  }
}
fe.yearFirstLocales = /* @__PURE__ */ new Set([
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
const Oe = new fe();
class or {
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
class po {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class bo {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Do(e) {
  return C.createElement("button", { ...e });
}
function wo(e) {
  return C.createElement("span", { ...e });
}
function xo(e) {
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
function vo(e) {
  const { day: t, modifiers: n, ...r } = e;
  return C.createElement("td", { ...r });
}
function ko(e) {
  const { day: t, modifiers: n, ...r } = e, s = C.useRef(null);
  return C.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), C.createElement("button", { ref: s, ...r });
}
var W;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(W || (W = {}));
var Z;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Z || (Z = {}));
var we;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(we || (we = {}));
var ue;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(ue || (ue = {}));
function Mo(e) {
  const { options: t, className: n, components: r, classNames: s, ...o } = e, a = [s[W.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === o.value);
  return C.createElement(
    "span",
    { "data-disabled": o.disabled, className: s[W.DropdownRoot] },
    C.createElement(r.Select, { className: a, ...o }, t?.map(({ value: l, label: u, disabled: y }) => C.createElement(r.Option, { key: l, value: l, disabled: y }, u))),
    C.createElement(
      "span",
      { className: s[W.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      C.createElement(r.Chevron, { orientation: "down", size: 18, className: s[W.Chevron] })
    )
  );
}
function No(e) {
  return C.createElement("div", { ...e });
}
function So(e) {
  return C.createElement("div", { ...e });
}
function Oo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r }, e.children);
}
function Co(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r });
}
function To(e) {
  return C.createElement("table", { ...e });
}
function Wo(e) {
  return C.createElement("div", { ...e });
}
const ar = Nr(void 0);
function yt() {
  const e = Sr(ar);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Yo(e) {
  const { components: t } = yt();
  return C.createElement(t.Dropdown, { ...e });
}
function Eo(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...o } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: u } } = yt(), y = be((b) => {
    s && n?.(b);
  }, [s, n]), d = be((b) => {
    r && t?.(b);
  }, [r, t]);
  return C.createElement(
    "nav",
    { ...o },
    C.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[W.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      C.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[W.Chevron], orientation: "left" })
    ),
    C.createElement(
      a.NextMonthButton,
      { type: "button", className: i[W.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": u(s), onClick: y },
      C.createElement(a.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: i[W.Chevron] })
    )
  );
}
function _o(e) {
  const { components: t } = yt();
  return C.createElement(t.Button, { ...e });
}
function Io(e) {
  return C.createElement("option", { ...e });
}
function Fo(e) {
  const { components: t } = yt();
  return C.createElement(t.Button, { ...e });
}
function Po(e) {
  const { rootRef: t, ...n } = e;
  return C.createElement("div", { ...n, ref: t });
}
function Uo(e) {
  return C.createElement("select", { ...e });
}
function $o(e) {
  const { week: t, ...n } = e;
  return C.createElement("tr", { ...n });
}
function Bo(e) {
  return C.createElement("th", { ...e });
}
function Ao(e) {
  return C.createElement(
    "thead",
    { "aria-hidden": !0 },
    C.createElement("tr", { ...e })
  );
}
function Ho(e) {
  const { week: t, ...n } = e;
  return C.createElement("th", { ...n });
}
function Ro(e) {
  return C.createElement("th", { ...e });
}
function qo(e) {
  return C.createElement("tbody", { ...e });
}
function jo(e) {
  const { components: t } = yt();
  return C.createElement(t.Dropdown, { ...e });
}
const Lo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Do,
  CaptionLabel: wo,
  Chevron: xo,
  Day: vo,
  DayButton: ko,
  Dropdown: Mo,
  DropdownNav: No,
  Footer: So,
  Month: Oo,
  MonthCaption: Co,
  MonthGrid: To,
  Months: Wo,
  MonthsDropdown: Yo,
  Nav: Eo,
  NextMonthButton: _o,
  Option: Io,
  PreviousMonthButton: Fo,
  Root: Po,
  Select: Uo,
  Week: $o,
  WeekNumber: Ho,
  WeekNumberHeader: Ro,
  Weekday: Bo,
  Weekdays: Ao,
  Weeks: qo,
  YearsDropdown: jo
}, Symbol.toStringTag, { value: "Module" }));
function Ee(e, t, n = !1, r = Oe) {
  let { from: s, to: o } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return s && o ? (a(o, s) < 0 && ([s, o] = [o, s]), a(t, s) >= (n ? 1 : 0) && a(o, t) >= (n ? 1 : 0)) : !n && o ? i(o, t) : !n && s ? i(s, t) : !1;
}
function ir(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function un(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function cr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function lr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function dr(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ur(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function _e(e, t, n = Oe) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: o, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return s(e, i);
    if (ur(i, n))
      return i.includes(e);
    if (un(i))
      return Ee(i, e, !1, n);
    if (dr(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (ir(i)) {
      const l = o(i.before, e), u = o(i.after, e), y = l > 0, d = u < 0;
      return a(i.before, i.after) ? d && y : y || d;
    }
    return cr(i) ? o(e, i.after) > 0 : lr(i) ? o(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Zo(e, t, n, r, s) {
  const { disabled: o, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: y } = t, { isSameDay: d, isSameMonth: b, startOfMonth: h, isBefore: D, endOfMonth: O, isAfter: v } = s, w = n && h(n), g = r && O(r), k = {
    [Z.focused]: [],
    [Z.outside]: [],
    [Z.disabled]: [],
    [Z.hidden]: [],
    [Z.today]: []
  }, S = {};
  for (const p of e) {
    const { date: T, displayMonth: M } = p, I = !!(M && !b(T, M)), G = !!(w && D(T, w)), X = !!(g && v(T, g)), H = !!(o && _e(T, o, s)), te = !!(a && _e(T, a, s)) || G || X || // Broadcast calendar will show outside days as default
    !u && !l && I || u && l === !1 && I, ie = d(T, y ?? s.today());
    I && k.outside.push(p), H && k.disabled.push(p), te && k.hidden.push(p), ie && k.today.push(p), i && Object.keys(i).forEach((he) => {
      const ne = i?.[he];
      ne && _e(T, ne, s) && (S[he] ? S[he].push(p) : S[he] = [p]);
    });
  }
  return (p) => {
    const T = {
      [Z.focused]: !1,
      [Z.disabled]: !1,
      [Z.hidden]: !1,
      [Z.outside]: !1,
      [Z.today]: !1
    }, M = {};
    for (const I in k) {
      const G = k[I];
      T[I] = G.some((X) => X === p);
    }
    for (const I in S)
      M[I] = S[I].some((G) => G === p);
    return {
      ...T,
      // custom modifiers should override all the previous ones
      ...M
    };
  };
}
function zo(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [o]) => (n[o] ? s.push(n[o]) : t[Z[o]] ? s.push(t[Z[o]]) : t[we[o]] && s.push(t[we[o]]), s), [t[W.Day]]);
}
function Qo(e) {
  return {
    ...Lo,
    ...e
  };
}
function Vo(e) {
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
function Go() {
  const e = {};
  for (const t in W)
    e[W[t]] = `rdp-${W[t]}`;
  for (const t in Z)
    e[Z[t]] = `rdp-${Z[t]}`;
  for (const t in we)
    e[we[t]] = `rdp-${we[t]}`;
  for (const t in ue)
    e[ue[t]] = `rdp-${ue[t]}`;
  return e;
}
function fr(e, t, n) {
  return (n ?? new fe(t)).formatMonthYear(e);
}
const Ko = fr;
function Xo(e, t, n) {
  return (n ?? new fe(t)).format(e, "d");
}
function Jo(e, t = Oe) {
  return t.format(e, "LLLL");
}
function ea(e, t, n) {
  return (n ?? new fe(t)).format(e, "cccccc");
}
function ta(e, t = Oe) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function na() {
  return "";
}
function hr(e, t = Oe) {
  return t.format(e, "yyyy");
}
const ra = hr, sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: fr,
  formatDay: Xo,
  formatMonthCaption: Ko,
  formatMonthDropdown: Jo,
  formatWeekNumber: ta,
  formatWeekNumberHeader: na,
  formatWeekdayName: ea,
  formatYearCaption: ra,
  formatYearDropdown: hr
}, Symbol.toStringTag, { value: "Module" }));
function oa(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...sa,
    ...e
  };
}
function aa(e, t, n, r, s) {
  const { startOfMonth: o, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = s;
  return l({
    start: a(e),
    end: i(e)
  }).map((b) => {
    const h = r.formatMonthDropdown(b, s), D = u(b), O = t && b < o(t) || n && b > o(n) || !1;
    return { value: D, label: h, disabled: O };
  });
}
function ia(e, t = {}, n = {}) {
  let r = { ...t?.[W.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function ca(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), o = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(s, a);
    o.push(i);
  }
  return o;
}
function la(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, eachYearOfInterval: i, getYear: l } = r, u = o(e), y = a(t), d = i({ start: u, end: y });
  return s && d.reverse(), d.map((b) => {
    const h = n.formatYearDropdown(b, r);
    return {
      value: l(b),
      label: h,
      disabled: !1
    };
  });
}
function mr(e, t, n, r) {
  let s = (r ?? new fe(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const da = mr;
function gr(e, t, n) {
  return (n ?? new fe(t)).formatMonthYear(e);
}
const ua = gr;
function fa(e, t, n, r) {
  let s = (r ?? new fe(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function ha(e) {
  return "Choose the Month";
}
function ma() {
  return "";
}
function ga(e) {
  return "Go to the Next Month";
}
function ya(e) {
  return "Go to the Previous Month";
}
function pa(e, t, n) {
  return (n ?? new fe(t)).format(e, "cccc");
}
function ba(e, t) {
  return `Week ${e}`;
}
function Da(e) {
  return "Week Number";
}
function wa(e) {
  return "Choose the Year";
}
const xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ua,
  labelDay: da,
  labelDayButton: mr,
  labelGrid: gr,
  labelGridcell: fa,
  labelMonthDropdown: ha,
  labelNav: ma,
  labelNext: ga,
  labelPrevious: ya,
  labelWeekNumber: ba,
  labelWeekNumberHeader: Da,
  labelWeekday: pa,
  labelYearDropdown: wa
}, Symbol.toStringTag, { value: "Module" })), pt = (e) => e instanceof HTMLElement ? e : null, jt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], va = (e) => pt(e.querySelector("[data-animated-month]")), Lt = (e) => pt(e.querySelector("[data-animated-caption]")), Zt = (e) => pt(e.querySelector("[data-animated-weeks]")), ka = (e) => pt(e.querySelector("[data-animated-nav]")), Ma = (e) => pt(e.querySelector("[data-animated-weekdays]"));
function Na(e, t, { classNames: n, months: r, focused: s, dateLib: o }) {
  const a = Me(null), i = Me(r), l = Me(!1);
  Or(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const y = o.isSameMonth(r[0].date, u[0].date), d = o.isAfter(r[0].date, u[0].date), b = d ? n[ue.caption_after_enter] : n[ue.caption_before_enter], h = d ? n[ue.weeks_after_enter] : n[ue.weeks_before_enter], D = a.current, O = e.current.cloneNode(!0);
    if (O instanceof HTMLElement ? (jt(O).forEach((k) => {
      if (!(k instanceof HTMLElement))
        return;
      const S = va(k);
      S && k.contains(S) && k.removeChild(S);
      const p = Lt(k);
      p && p.classList.remove(b);
      const T = Zt(k);
      T && T.classList.remove(h);
    }), a.current = O) : a.current = null, l.current || y || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const v = D instanceof HTMLElement ? jt(D) : [], w = jt(e.current);
    if (w?.every((g) => g instanceof HTMLElement) && v && v.every((g) => g instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const g = ka(e.current);
      g && (g.style.zIndex = "1"), w.forEach((k, S) => {
        const p = v[S];
        if (!p)
          return;
        k.style.position = "relative", k.style.overflow = "hidden";
        const T = Lt(k);
        T && T.classList.add(b);
        const M = Zt(k);
        M && M.classList.add(h);
        const I = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), g && (g.style.zIndex = ""), T && T.classList.remove(b), M && M.classList.remove(h), k.style.position = "", k.style.overflow = "", k.contains(p) && k.removeChild(p);
        };
        p.style.pointerEvents = "none", p.style.position = "absolute", p.style.overflow = "hidden", p.setAttribute("aria-hidden", "true");
        const G = Ma(p);
        G && (G.style.opacity = "0");
        const X = Lt(p);
        X && (X.classList.add(d ? n[ue.caption_before_exit] : n[ue.caption_after_exit]), X.addEventListener("animationend", I));
        const H = Zt(p);
        H && H.classList.add(d ? n[ue.weeks_before_exit] : n[ue.weeks_after_exit]), k.insertBefore(p, k.firstChild);
      });
    }
  });
}
function Sa(e, t, n, r) {
  const s = e[0], o = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: y, differenceInCalendarMonths: d, endOfBroadcastWeek: b, endOfISOWeek: h, endOfMonth: D, endOfWeek: O, isAfter: v, startOfBroadcastWeek: w, startOfISOWeek: g, startOfWeek: k } = r, S = l ? w(s, r) : a ? g(s) : k(s), p = l ? b(o) : a ? h(D(o)) : O(D(o)), T = y(p, S), M = d(o, s) + 1, I = [];
  for (let H = 0; H <= T; H++) {
    const te = u(S, H);
    if (t && v(te, t))
      break;
    I.push(te);
  }
  const X = (l ? 35 : 42) * M;
  if (i && I.length < X) {
    const H = X - I.length;
    for (let te = 0; te < H; te++) {
      const ie = u(I[I.length - 1], 1);
      I.push(ie);
    }
  }
  return I;
}
function Oa(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((o, a) => o.concat(a.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function Ca(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, o = [];
  for (let a = 0; a < s; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    o.push(i);
  }
  return o;
}
function vn(e, t, n, r) {
  const { month: s, defaultMonth: o, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let l = s || o || a;
  const { differenceInCalendarMonths: u, addMonths: y, startOfMonth: d } = r;
  if (n && u(n, l) < i - 1) {
    const b = -1 * (i - 1);
    l = y(n, b);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function Ta(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: o, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: y, startOfBroadcastWeek: d, startOfISOWeek: b, startOfWeek: h } = r, D = e.reduce((O, v) => {
    const w = n.broadcastCalendar ? d(v, r) : n.ISOWeek ? b(v) : h(v), g = n.broadcastCalendar ? o(v) : n.ISOWeek ? a(i(v)) : l(i(v)), k = t.filter((M) => M >= w && M <= g), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && k.length < S) {
      const M = t.filter((I) => {
        const G = S - k.length;
        return I > g && I <= s(g, G);
      });
      k.push(...M);
    }
    const p = k.reduce((M, I) => {
      const G = n.ISOWeek ? u(I) : y(I), X = M.find((te) => te.weekNumber === G), H = new or(I, v, r);
      return X ? X.days.push(H) : M.push(new bo(G, [H])), M;
    }, []), T = new po(v, p);
    return O.push(T), O;
  }, []);
  return n.reverseMonths ? D.reverse() : D;
}
function Wa(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: o, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: u, newDate: y, today: d } = t, { fromYear: b, toYear: h, fromMonth: D, toMonth: O } = e;
  !n && D && (n = D), !n && b && (n = t.newDate(b, 0, 1)), !r && O && (r = O), !r && h && (r = y(h, 11, 31));
  const v = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : b ? n = y(b, 0, 1) : !n && v && (n = s(l(e.today ?? d(), -100))), r ? r = i(r) : h ? r = y(h, 11, 31) : !r && v && (r = u(e.today ?? d())), [
    n && o(n),
    r && o(r)
  ];
}
function Ya(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = s ? o : 1, y = a(e);
  if (!t)
    return i(y, u);
  if (!(l(t, e) < o))
    return i(y, u);
}
function Ea(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = s ? o ?? 1 : 1, y = a(e);
  if (!t)
    return i(y, -u);
  if (!(l(y, t) <= 0))
    return i(y, -u);
}
function _a(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function St(e, t) {
  const [n, r] = B(e);
  return [t === void 0 ? n : t, r];
}
function Ia(e, t) {
  const [n, r] = Wa(e, t), { startOfMonth: s, endOfMonth: o } = t, a = vn(e, n, r, t), [i, l] = St(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  We(() => {
    const T = vn(e, n, r, t);
    l(T);
  }, [e.timeZone]);
  const u = Ca(i, r, e, t), y = Sa(u, e.endMonth ? o(e.endMonth) : void 0, e, t), d = Ta(u, y, e, t), b = _a(d), h = Oa(d), D = Ea(i, n, e, t), O = Ya(i, r, e, t), { disableNavigation: v, onMonthChange: w } = e, g = (T) => b.some((M) => M.days.some((I) => I.isEqualTo(T))), k = (T) => {
    if (v)
      return;
    let M = s(T);
    n && M < s(n) && (M = s(n)), r && M > s(r) && (M = s(r)), l(M), w?.(M);
  };
  return {
    months: d,
    weeks: b,
    days: h,
    navStart: n,
    navEnd: r,
    previousMonth: D,
    nextMonth: O,
    goToMonth: k,
    goToDay: (T) => {
      g(T) || k(T.date);
    }
  };
}
var ke;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ke || (ke = {}));
function kn(e) {
  return !e[Z.disabled] && !e[Z.hidden] && !e[Z.outside];
}
function Fa(e, t, n, r) {
  let s, o = -1;
  for (const a of e) {
    const i = t(a);
    kn(i) && (i[Z.focused] && o < ke.FocusedModifier ? (s = a, o = ke.FocusedModifier) : r?.isEqualTo(a) && o < ke.LastFocused ? (s = a, o = ke.LastFocused) : n(a.date) && o < ke.Selected ? (s = a, o = ke.Selected) : i[Z.today] && o < ke.Today && (s = a, o = ke.Today));
  }
  return s || (s = e.find((a) => kn(t(a)))), s;
}
function Pa(e, t, n, r, s, o, a) {
  const { ISOWeek: i, broadcastCalendar: l } = o, { addDays: u, addMonths: y, addWeeks: d, addYears: b, endOfBroadcastWeek: h, endOfISOWeek: D, endOfWeek: O, max: v, min: w, startOfBroadcastWeek: g, startOfISOWeek: k, startOfWeek: S } = a;
  let T = {
    day: u,
    week: d,
    month: y,
    year: b,
    startOfWeek: (M) => l ? g(M, a) : i ? k(M) : S(M),
    endOfWeek: (M) => l ? h(M) : i ? D(M) : O(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? T = v([r, T]) : t === "after" && s && (T = w([s, T])), T;
}
function yr(e, t, n, r, s, o, a, i = 0) {
  if (i > 365)
    return;
  const l = Pa(e, t, n.date, r, s, o, a), u = !!(o.disabled && _e(l, o.disabled, a)), y = !!(o.hidden && _e(l, o.hidden, a)), d = l, b = new or(l, d, a);
  return !u && !y ? b : yr(e, t, b, r, s, o, a, i + 1);
}
function Ua(e, t, n, r, s) {
  const { autoFocus: o } = e, [a, i] = B(), l = Fa(t.days, n, r || (() => !1), a), [u, y] = B(o ? l : void 0);
  return {
    isFocusTarget: (O) => !!l?.isEqualTo(O),
    setFocused: y,
    focused: u,
    blur: () => {
      i(u), y(void 0);
    },
    moveFocus: (O, v) => {
      if (!u)
        return;
      const w = yr(O, v, u, t.navStart, t.navEnd, e, s);
      w && (e.disableNavigation && !t.days.some((k) => k.isEqualTo(w)) || (t.goToDay(w), y(w)));
    }
  };
}
function $a(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, a] = St(n, s ? n : void 0), i = s ? n : o, { isSameDay: l } = t, u = (h) => i?.some((D) => l(D, h)) ?? !1, { min: y, max: d } = e;
  return {
    selected: i,
    select: (h, D, O) => {
      let v = [...i ?? []];
      if (u(h)) {
        if (i?.length === y || r && i?.length === 1)
          return;
        v = i?.filter((w) => !l(w, h));
      } else
        i?.length === d ? v = [h] : v = [...v, h];
      return s || a(v), s?.(v, h, D, O), v;
    },
    isSelected: u
  };
}
function Ba(e, t, n = 0, r = 0, s = !1, o = Oe) {
  const { from: a, to: i } = t || {}, { isSameDay: l, isAfter: u, isBefore: y } = o;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    l(a, e) ? n === 0 ? d = { from: a, to: e } : s ? d = { from: a, to: void 0 } : d = void 0 : y(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (l(a, e) && l(i, e))
      s ? d = { from: a, to: i } : d = void 0;
    else if (l(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (y(e, a))
      d = { from: e, to: i };
    else if (u(e, a))
      d = { from: a, to: e };
    else if (u(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const b = o.differenceInCalendarDays(d.to, d.from);
    r > 0 && b > r ? d = { from: e, to: void 0 } : n > 1 && b < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Aa(e, t, n = Oe) {
  const r = Array.isArray(t) ? t : [t];
  let s = e.from;
  const o = n.differenceInCalendarDays(e.to, e.from), a = Math.min(o, 6);
  for (let i = 0; i <= a; i++) {
    if (r.includes(s.getDay()))
      return !0;
    s = n.addDays(s, 1);
  }
  return !1;
}
function Mn(e, t, n = Oe) {
  return Ee(e, t.from, !1, n) || Ee(e, t.to, !1, n) || Ee(t, e.from, !1, n) || Ee(t, e.to, !1, n);
}
function Ha(e, t, n = Oe) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ee(e, i, !1, n) : ur(i, n) ? i.some((l) => Ee(e, l, !1, n)) : un(i) ? i.from && i.to ? Mn(e, { from: i.from, to: i.to }, n) : !1 : dr(i) ? Aa(e, i.dayOfWeek, n) : ir(i) ? n.isAfter(i.before, i.after) ? Mn(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : _e(e.from, i, n) || _e(e.to, i, n) : cr(i) || lr(i) ? _e(e.from, i, n) || _e(e.to, i, n) : !1))
    return !0;
  const a = r.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= l; u++) {
      if (a.some((y) => y(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Ra(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: o, onSelect: a } = e, [i, l] = St(s, a ? s : void 0), u = a ? s : i;
  return {
    selected: u,
    select: (b, h, D) => {
      const { min: O, max: v } = e, w = b ? Ba(b, u, O, v, o, t) : void 0;
      return r && n && w?.from && w.to && Ha({ from: w.from, to: w.to }, n, t) && (w.from = b, w.to = void 0), a || l(w), a?.(w, b, h, D), w;
    },
    isSelected: (b) => u && Ee(u, b, !1, t)
  };
}
function qa(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, a] = St(n, s ? n : void 0), i = s ? n : o, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, b, h) => {
      let D = d;
      return !r && i && i && l(d, i) && (D = void 0), s || a(D), s?.(D, d, b, h), D;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function ja(e, t) {
  const n = qa(e, t), r = $a(e, t), s = Ra(e, t);
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
  }, t.today && (t.today = new ae(t.today, t.timeZone)), t.month && (t.month = new ae(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new ae(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new ae(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new ae(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new ae(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((m) => new ae(m, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new ae(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new ae(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: o, locale: a, classNames: i } = At(() => {
    const m = { ...dn, ...t.locale };
    return {
      dateLib: new fe({
        locale: m,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Qo(t.components),
      formatters: oa(t.formatters),
      labels: { ...xa, ...t.labels },
      locale: m,
      classNames: { ...Go(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: y, numberOfMonths: d = 1, onDayBlur: b, onDayClick: h, onDayFocus: D, onDayKeyDown: O, onDayMouseEnter: v, onDayMouseLeave: w, onNextClick: g, onPrevClick: k, showWeekNumber: S, styles: p } = t, { formatCaption: T, formatDay: M, formatMonthDropdown: I, formatWeekNumber: G, formatWeekNumberHeader: X, formatWeekdayName: H, formatYearDropdown: te } = r, ie = Ia(t, o), { days: he, months: ne, navStart: xe, navEnd: Ce, previousMonth: re, nextMonth: ce, goToMonth: se } = ie, rt = Zo(he, t, xe, Ce, o), { isSelected: K, select: Q, selected: me } = ja(t, o) ?? {}, { blur: Te, focused: qe, isFocusTarget: Pe, moveFocus: Ue, setFocused: De } = Ua(t, ie, rt, K ?? (() => !1), o), { labelDayButton: Ge, labelGridcell: $e, labelGrid: Ct, labelMonthDropdown: Tt, labelNav: Ke, labelPrevious: Wt, labelNext: Yt, labelWeekday: Et, labelWeekNumber: _t, labelWeekNumberHeader: It, labelYearDropdown: Ft } = s, Pt = At(() => ca(o, t.ISOWeek), [o, t.ISOWeek]), Xe = u !== void 0 || h !== void 0, st = be(() => {
    re && (se(re), k?.(re));
  }, [re, se, k]), ge = be(() => {
    ce && (se(ce), g?.(ce));
  }, [se, ce, g]), Ut = be((m, Y) => (N) => {
    N.preventDefault(), N.stopPropagation(), De(m), Q?.(m.date, Y, N), h?.(m.date, Y, N);
  }, [Q, h, De]), bt = be((m, Y) => (N) => {
    De(m), D?.(m.date, Y, N);
  }, [D, De]), Dt = be((m, Y) => (N) => {
    Te(), b?.(m.date, Y, N);
  }, [Te, b]), Be = be((m, Y) => (N) => {
    const _ = {
      ArrowLeft: [
        N.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        N.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [N.shiftKey ? "year" : "week", "after"],
      ArrowUp: [N.shiftKey ? "year" : "week", "before"],
      PageUp: [N.shiftKey ? "year" : "month", "before"],
      PageDown: [N.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (_[N.key]) {
      N.preventDefault(), N.stopPropagation();
      const [$, E] = _[N.key];
      Ue($, E);
    }
    O?.(m.date, Y, N);
  }, [Ue, O, t.dir]), wt = be((m, Y) => (N) => {
    v?.(m.date, Y, N);
  }, [v]), je = be((m, Y) => (N) => {
    w?.(m.date, Y, N);
  }, [w]), $t = be((m) => (Y) => {
    const N = Number(Y.target.value), _ = o.setMonth(o.startOfMonth(m), N);
    se(_);
  }, [o, se]), Bt = be((m) => (Y) => {
    const N = Number(Y.target.value), _ = o.setYear(o.startOfMonth(m), N);
    se(_);
  }, [o, se]), { className: xt, style: vt } = At(() => ({
    className: [i[W.Root], t.className].filter(Boolean).join(" "),
    style: { ...p?.[W.Root], ...t.style }
  }), [i, t.className, t.style, p]), Le = Vo(t), Je = Me(null);
  Na(Je, !!t.animate, {
    classNames: i,
    months: ne,
    focused: qe,
    dateLib: o
  });
  const c = {
    dayPickerProps: t,
    selected: me,
    select: Q,
    isSelected: K,
    months: ne,
    nextMonth: ce,
    previousMonth: re,
    goToMonth: se,
    getModifiers: rt,
    components: n,
    classNames: i,
    styles: p,
    labels: s,
    formatters: r
  };
  return C.createElement(
    ar.Provider,
    { value: c },
    C.createElement(
      n.Root,
      { rootRef: t.animate ? Je : void 0, className: xt, style: vt, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Le },
      C.createElement(
        n.Months,
        { className: i[W.Months], style: p?.[W.Months] },
        !t.hideNavigation && !y && C.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[W.Nav], style: p?.[W.Nav], "aria-label": Ke(), onPreviousClick: st, onNextClick: ge, previousMonth: re, nextMonth: ce }),
        ne.map((m, Y) => C.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[W.Month],
            style: p?.[W.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: Y,
            displayIndex: Y,
            calendarMonth: m
          },
          y === "around" && !t.hideNavigation && Y === 0 && C.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[W.PreviousMonthButton], tabIndex: re ? void 0 : -1, "aria-disabled": re ? void 0 : !0, "aria-label": Wt(re), onClick: st, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(n.Chevron, { disabled: re ? void 0 : !0, className: i[W.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          C.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[W.MonthCaption], style: p?.[W.MonthCaption], calendarMonth: m, displayIndex: Y }, l?.startsWith("dropdown") ? C.createElement(
            n.DropdownNav,
            { className: i[W.Dropdowns], style: p?.[W.Dropdowns] },
            (() => {
              const N = l === "dropdown" || l === "dropdown-months" ? C.createElement(n.MonthsDropdown, { key: "month", className: i[W.MonthsDropdown], "aria-label": Tt(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: $t(m.date), options: aa(m.date, xe, Ce, r, o), style: p?.[W.Dropdown], value: o.getMonth(m.date) }) : C.createElement("span", { key: "month" }, I(m.date, o)), _ = l === "dropdown" || l === "dropdown-years" ? C.createElement(n.YearsDropdown, { key: "year", className: i[W.YearsDropdown], "aria-label": Ft(o.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Bt(m.date), options: la(xe, Ce, r, o, !!t.reverseYears), style: p?.[W.Dropdown], value: o.getYear(m.date) }) : C.createElement("span", { key: "year" }, te(m.date, o));
              return o.getMonthYearOrder() === "year-first" ? [_, N] : [N, _];
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
            } }, T(m.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            C.createElement(n.CaptionLabel, { className: i[W.CaptionLabel], role: "status", "aria-live": "polite" }, T(m.date, o.options, o))
          )),
          y === "around" && !t.hideNavigation && Y === d - 1 && C.createElement(
            n.NextMonthButton,
            { type: "button", className: i[W.NextMonthButton], tabIndex: ce ? void 0 : -1, "aria-disabled": ce ? void 0 : !0, "aria-label": Yt(ce), onClick: ge, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(n.Chevron, { disabled: ce ? void 0 : !0, className: i[W.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          Y === d - 1 && y === "after" && !t.hideNavigation && C.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[W.Nav], style: p?.[W.Nav], "aria-label": Ke(), onPreviousClick: st, onNextClick: ge, previousMonth: re, nextMonth: ce }),
          C.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": Ct(m.date, o.options, o) || void 0, className: i[W.MonthGrid], style: p?.[W.MonthGrid] },
            !t.hideWeekdays && C.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[W.Weekdays], style: p?.[W.Weekdays] },
              S && C.createElement(n.WeekNumberHeader, { "aria-label": It(o.options), className: i[W.WeekNumberHeader], style: p?.[W.WeekNumberHeader], scope: "col" }, X()),
              Pt.map((N) => C.createElement(n.Weekday, { "aria-label": Et(N, o.options, o), className: i[W.Weekday], key: String(N), style: p?.[W.Weekday], scope: "col" }, H(N, o.options, o)))
            ),
            C.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[W.Weeks], style: p?.[W.Weeks] }, m.weeks.map((N) => C.createElement(
              n.Week,
              { className: i[W.Week], key: N.weekNumber, style: p?.[W.Week], week: N },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              C.createElement(n.WeekNumber, { week: N, style: p?.[W.WeekNumber], "aria-label": _t(N.weekNumber, {
                locale: a
              }), className: i[W.WeekNumber], scope: "row", role: "rowheader" }, G(N.weekNumber, o)),
              N.days.map((_) => {
                const { date: $ } = _, E = rt(_);
                if (E[Z.focused] = !E.hidden && !!qe?.isEqualTo(_), E[we.selected] = K?.($) || E.selected, un(me)) {
                  const { from: oe, to: j } = me;
                  E[we.range_start] = !!(oe && j && o.isSameDay($, oe)), E[we.range_end] = !!(oe && j && o.isSameDay($, j)), E[we.range_middle] = Ee(me, $, !0, o);
                }
                const F = ia(E, p, t.modifiersStyles), q = zo(E, i, t.modifiersClassNames), de = !Xe && !E.hidden ? $e($, E, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  C.createElement(n.Day, { key: `${o.format($, "yyyy-MM-dd")}_${o.format(_.displayMonth, "yyyy-MM")}`, day: _, modifiers: E, className: q.join(" "), style: F, role: "gridcell", "aria-selected": E.selected || void 0, "aria-label": de, "data-day": o.format($, "yyyy-MM-dd"), "data-month": _.outside ? o.format($, "yyyy-MM") : void 0, "data-selected": E.selected || void 0, "data-disabled": E.disabled || void 0, "data-hidden": E.hidden || void 0, "data-outside": _.outside || void 0, "data-focused": E.focused || void 0, "data-today": E.today || void 0 }, !E.hidden && Xe ? C.createElement(n.DayButton, { className: i[W.DayButton], style: p?.[W.DayButton], type: "button", day: _, modifiers: E, disabled: E.disabled || void 0, tabIndex: Pe(_) ? 0 : -1, "aria-label": Ge($, E, o.options, o), onClick: Ut(_, E), onBlur: Dt(_, E), onFocus: bt(_, E), onKeyDown: Be(_, E), onMouseEnter: wt(_, E), onMouseLeave: je(_, E) }, M($, o.options, o)) : !E.hidden && M(_.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      C.createElement(n.Footer, { className: i[W.Footer], style: p?.[W.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const La = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Za = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Nn = (e) => {
  const t = Za(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, pr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), za = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Qa = {
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
const Va = $n(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: o,
    iconNode: a,
    ...i
  }, l) => tn(
    "svg",
    {
      ref: l,
      ...Qa,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: pr("lucide", s),
      ...!o && !za(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...a.map(([u, y]) => tn(u, y)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
const Fe = (e, t) => {
  const n = $n(
    ({ className: r, ...s }, o) => tn(Va, {
      ref: o,
      iconNode: t,
      className: pr(
        `lucide-${La(Nn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = Nn(e), n;
};
const Ga = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], Ka = Fe("bookmark", Ga);
const Xa = [
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
], zt = Fe("calendar-days", Xa);
const Ja = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ei = Fe("chevron-down", Ja);
const ti = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], br = Fe("chevron-left", ti);
const ni = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Dr = Fe("chevron-right", ni);
const ri = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], si = Fe("circle-question-mark", ri);
const oi = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ai = Fe("plus", oi);
const ii = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], ci = Fe("trash-2", ii);
const li = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Sn = Fe("x", li);
function di(e, t) {
  const n = gi(t);
  return "formatToParts" in n ? fi(n, e) : hi(n, e);
}
const ui = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function fi(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const o = ui[n[s].type];
      o !== void 0 && (r[o] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function hi(e, t) {
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
const Qt = {}, On = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), mi = On === "06/25/2014, 00:00:00" || On === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function gi(e) {
  return Qt[e] || (Qt[e] = mi ? new Intl.DateTimeFormat("en-US", {
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
function wr(e, t, n, r, s, o, a) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, s, o, a), i;
}
const Cn = 36e5, yi = 6e4, Vt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function xr(e, t, n) {
  if (!e)
    return 0;
  let r = Vt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, o;
  if (r = Vt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), Tn(s) ? -(s * Cn) : NaN;
  if (r = Vt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const a = parseInt(r[3], 10);
    return Tn(s, a) ? (o = Math.abs(s) * Cn + a * yi, r[1] === "+" ? -o : o) : NaN;
  }
  if (Di(e)) {
    t = new Date(t || Date.now());
    const a = n ? t : pi(t), i = rn(a, e);
    return -(n ? i : bi(t, i, e));
  }
  return NaN;
}
function pi(e) {
  return wr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function rn(e, t) {
  const n = di(e, t), r = wr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const o = s % 1e3;
  return s -= o >= 0 ? o : 1e3 + o, r - s;
}
function bi(e, t, n) {
  let s = e.getTime() - t;
  const o = rn(new Date(s), n);
  if (t === o)
    return t;
  s -= o - t;
  const a = rn(new Date(s), n);
  return o === a ? o : Math.max(o, a);
}
function Tn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Wn = {};
function Di(e) {
  if (Wn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Wn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function Yn(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const wi = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Gt = 36e5, En = 6e4, xi = 2, le = {
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
  timeZone: wi
};
function vi(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? xi : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = ki(e), { year: s, restDateString: o } = Mi(r.date, n), a = Ni(o, s);
  if (a === null || isNaN(a.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (a) {
    const i = a.getTime();
    let l = 0, u;
    if (r.time && (l = Si(r.time), l === null || isNaN(l)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (u = xr(r.timeZone || t.timeZone, new Date(i + l)), isNaN(u))
        return /* @__PURE__ */ new Date(NaN);
    } else
      u = Yn(new Date(i + l)), u = Yn(new Date(i + l + u));
    return new Date(i + l + u);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function ki(e) {
  const t = {};
  let n = le.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = le.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = le.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function Mi(e, t) {
  if (e) {
    const n = le.YYY[t], r = le.YYYYY[t];
    let s = le.YYYY.exec(e) || r.exec(e);
    if (s) {
      const o = s[1];
      return {
        year: parseInt(o, 10),
        restDateString: e.slice(o.length)
      };
    }
    if (s = le.YY.exec(e) || n.exec(e), s) {
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
function Ni(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let o = le.MM.exec(e);
  if (o)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1, In(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (o = le.DDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0);
    const a = parseInt(o[1], 10);
    return Ti(t, a) ? (n.setUTCFullYear(t, 0, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = le.MMDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1;
    const a = parseInt(o[2], 10);
    return In(t, r, a) ? (n.setUTCFullYear(t, r, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = le.Www.exec(e), o)
    return s = parseInt(o[1], 10) - 1, Fn(s) ? _n(t, s) : /* @__PURE__ */ new Date(NaN);
  if (o = le.WwwD.exec(e), o) {
    s = parseInt(o[1], 10) - 1;
    const a = parseInt(o[2], 10) - 1;
    return Fn(s, a) ? _n(t, s, a) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Si(e) {
  let t, n, r = le.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Kt(t) ? t % 24 * Gt : NaN;
  if (r = le.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Kt(t, n) ? t % 24 * Gt + n * En : NaN;
  if (r = le.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return Kt(t, n, s) ? t % 24 * Gt + n * En + s * 1e3 : NaN;
  }
  return null;
}
function _n(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const Oi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Ci = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function vr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function In(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = vr(e);
    if (r && n > Ci[t] || !r && n > Oi[t])
      return !1;
  }
  return !0;
}
function Ti(e, t) {
  if (t < 1)
    return !1;
  const n = vr(e);
  return !(n && t > 366 || !n && t > 365);
}
function Fn(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Kt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function Wi(e, t, n) {
  e = vi(e, n);
  const r = xr(t, e, !0), s = new Date(e.getTime() - r), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), o.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), o;
}
const sn = 0, Gi = !1, tt = !0, Ki = "firstFullWeek", Yi = "UTC";
function P(e) {
  const t = Gs(`${e}T00:00:00.000Z`);
  return Wi(t, Yi);
}
function R(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ot() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ei(e, t, n) {
  const r = P(e);
  let s;
  switch (t) {
    case "day":
      s = Se(r, n);
      break;
    case "week":
      s = an(r, n);
      break;
    case "month":
      s = Ye(r, n);
      break;
    case "quarter":
      s = jn(r, n);
      break;
    default:
      s = r;
  }
  return R(s);
}
function _i(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = P(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Se(s, 1), r.includes(s.getDay()) || o++;
    return R(s);
  } else
    return Ei(e, t, n - 1);
}
function Ii(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = P(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Se(s, -1), r.includes(s.getDay()) || o++;
    return R(s);
  } else {
    const s = P(e);
    let o;
    switch (t) {
      case "day":
        o = Se(s, -(n - 1));
        break;
      case "week":
        o = an(s, -(n - 1));
        break;
      case "month":
        o = Ye(s, -(n - 1));
        break;
      case "quarter":
        o = jn(s, -(n - 1));
        break;
      default:
        o = s;
    }
    return R(o);
  }
}
function kr(e, t, n, r) {
  const s = P(e), o = P(t);
  if (s > o) return 0;
  if (n === "day" && r.length > 0)
    return Kn({ start: s, end: o }).filter(
      (l) => !r.includes(l.getDay())
    ).length;
  switch (n) {
    case "day":
      return zn(o, s) + 1;
    case "week":
      return qr(o, s) + 1;
    case "month":
      return Gn(o, s) + 1;
    case "quarter":
      return Rr(o, s) + 1;
    default:
      return 1;
  }
}
function Fi(e, t, n) {
  const r = P(e), s = P(t);
  if (r > s) return [];
  const o = Kn({ start: r, end: s });
  return n.length === 0 ? o.map(R) : o.filter((a) => !n.includes(a.getDay())).map(R);
}
function Pn(e, t, n = "day", r = [], s, o, a, i, l) {
  const u = kr(
    e,
    t,
    n,
    r
  ), y = Fi(
    e,
    t,
    r
  ), d = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: u,
    excludedWeekdays: r,
    includedDatesUtc: y
  };
  return s !== void 0 && (d.excludeEnabled = s), o && (d.excludeFilterTypes = o), a && (d.excludedSpecificDates = a), i && (d.excludedSavedDates = i), l && (d.excludedDateRanges = l), d;
}
function Xi(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function Ji(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, s] = t, o = parseInt(r, 10), a = parseInt(n, 10), i = parseInt(s, 10);
  if (isNaN(o) || isNaN(a) || isNaN(i) || o < 1 || o > 12 || a < 1 || a > 31 || i < 1900 || i > 2100)
    return null;
  const l = o.toString().padStart(2, "0"), u = a.toString().padStart(2, "0");
  return `${i}-${l}-${u}`;
}
function Pi(e) {
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
function Ui() {
  const e = Ot(), t = P(e);
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
        let n = Ie(t, {
          weekStartsOn: sn
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
        const n = J(t);
        return {
          startDateUtc: R(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = ln(t);
        return {
          startDateUtc: R(n),
          endDateUtc: e
        };
      }
    }
  };
}
const $i = "DateRangePickerDB", Bi = 1, ve = "savedDateRanges";
class Ai {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open($i, Bi);
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
      const i = this.db.transaction([ve], "readwrite").objectStore(ve).put({
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
      const a = this.db.transaction([ve], "readonly").objectStore(ve).get(t);
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
      const a = this.db.transaction([ve], "readwrite").objectStore(ve).delete(t);
      a.onerror = () => r(a.error), a.onsuccess = () => n();
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
const nt = new Ai(), Xt = "savedDateRanges";
function Hi({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r
}) {
  const [s, o] = B([]), [a, i] = B(!1), [l, u] = B(""), [y, d] = B(!1);
  We(() => {
    (async () => {
      await nt.init();
      const k = await nt.getData(
        Xt
      );
      k && o(k);
    })();
  }, []);
  const b = Ui(), h = (g) => {
    const { startDateUtc: k, endDateUtc: S } = g();
    e(k, S);
  }, D = async () => {
    if (l.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const g = {
      id: `saved-${Date.now()}`,
      label: l.trim(),
      selection: n,
      createdAt: Date.now()
    }, k = [...s, g];
    o(k), await nt.saveData(Xt, k), u(""), i(!1);
  }, O = async (g) => {
    const k = s.filter((S) => S.id !== g);
    o(k), await nt.saveData(Xt, k);
  }, v = (g) => {
    t ? t(g.selection) : e(g.selection.startDateUtc, g.selection.endDateUtc);
  }, w = (g, k) => {
    const S = (p) => (/* @__PURE__ */ new Date(p + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return g === k ? S(g) : `${S(g)} - ${S(k)}`;
  };
  return /* @__PURE__ */ x(
    "div",
    {
      className: "w-72 bg-white border-r border-gray-200 py-4 flex flex-col h-full overflow-hidden",
      style: { ...r },
      children: [
        /* @__PURE__ */ x("div", { className: "mb-3 px-4 flex-shrink-0", children: [
          /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
          /* @__PURE__ */ f("div", { className: "", children: Object.values(b).map((g) => {
            const { startDateUtc: k, endDateUtc: S } = g.getValue();
            return /* @__PURE__ */ x(
              "button",
              {
                onClick: () => h(g.getValue),
                className: "w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all",
                children: [
                  /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900", children: g.label }),
                  /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed mt-0.5", children: w(k, S) })
                ]
              },
              g.label
            );
          }) })
        ] }),
        /* @__PURE__ */ x("div", { className: "flex flex-col flex-1 min-h-0 border-t border-gray-200 px-4", children: [
          /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2 flex-shrink-0 mt-3", children: /* @__PURE__ */ x("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Saved Dates" }),
            /* @__PURE__ */ f(
              "button",
              {
                onClick: () => d(!y),
                className: "text-gray-400 hover:text-gray-600",
                children: /* @__PURE__ */ f(si, { className: "w-3 h-3" })
              }
            )
          ] }) }),
          y && /* @__PURE__ */ f("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
          s.length === 0 ? /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ f("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: s.map((g) => /* @__PURE__ */ f(
            "div",
            {
              className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
              children: /* @__PURE__ */ x("div", { className: "flex items-start justify-between px-3 py-2", children: [
                /* @__PURE__ */ x(
                  "button",
                  {
                    onClick: () => v(g),
                    className: "flex-1 text-left",
                    children: [
                      /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900 mb-1", children: g.label }),
                      /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed", children: w(
                        g.selection.startDateUtc,
                        g.selection.endDateUtc
                      ) }),
                      (g.selection.excludedWeekdays?.length > 0 || g.selection.excludedSpecificDates && g.selection.excludedSpecificDates.length > 0 || g.selection.excludedSavedDates && g.selection.excludedSavedDates.length > 0 || g.selection.excludedDateRanges && g.selection.excludedDateRanges.length > 0) && /* @__PURE__ */ x("div", { className: "text-xs text-gray-500 mt-1 space-y-0.5", children: [
                        g.selection.excludedWeekdays?.length > 0 && /* @__PURE__ */ x("div", { children: [
                          "Days:",
                          " ",
                          g.selection.excludedWeekdays.map(
                            (k) => [
                              "Sun",
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat"
                            ][k]
                          ).join(", ")
                        ] }),
                        g.selection.excludedSpecificDates && g.selection.excludedSpecificDates.length > 0 && /* @__PURE__ */ x("div", { children: [
                          "Specific Dates:",
                          " ",
                          g.selection.excludedSpecificDates.length
                        ] }),
                        g.selection.excludedSavedDates && g.selection.excludedSavedDates.length > 0 && /* @__PURE__ */ x("div", { children: [
                          "Saved: ",
                          g.selection.excludedSavedDates.length
                        ] }),
                        g.selection.excludedDateRanges && g.selection.excludedDateRanges.length > 0 && /* @__PURE__ */ x("div", { children: [
                          "Ranges:",
                          " ",
                          g.selection.excludedDateRanges.length
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ f(
                  "button",
                  {
                    onClick: () => O(g.id),
                    className: "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2",
                    children: /* @__PURE__ */ f(ci, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            },
            g.id
          )) }),
          /* @__PURE__ */ x(
            "button",
            {
              onClick: () => i(!0),
              className: "w-full flex-shrink-0 px-3 py-2 text-[#003DB8] opacity-50 hover:opacity-100 text-sm font-medium rounded-mdtransition-colors flex items-center justify-center gap-2 mt-auto",
              children: [
                /* @__PURE__ */ f(ai, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          )
        ] }),
        a && /* @__PURE__ */ x(lt, { children: [
          /* @__PURE__ */ f(
            "div",
            {
              className: "fixed inset-0 bg-black/30 z-50",
              onClick: () => i(!1)
            }
          ),
          /* @__PURE__ */ f("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ x("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
            /* @__PURE__ */ f("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
            /* @__PURE__ */ x("div", { className: "mb-2", children: [
              /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
              /* @__PURE__ */ f(
                "input",
                {
                  type: "text",
                  value: l,
                  onChange: (g) => u(g.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (g) => {
                    g.key === "Enter" && D();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ x("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("strong", { children: "Range:" }),
                " ",
                w(
                  n.startDateUtc,
                  n.endDateUtc
                )
              ] }),
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("strong", { children: "Duration:" }),
                " ",
                n.duration,
                " ",
                n.unit,
                "(s)"
              ] }),
              n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("strong", { children: "Excluded Days:" }),
                " ",
                n.excludedWeekdays.map(
                  (g) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][g]
                ).join(", ")
              ] }),
              n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("strong", { children: "Excluded Specific Dates:" }),
                " ",
                n.excludedSpecificDates.length,
                " date(s)"
              ] }),
              n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("strong", { children: "Excluded Saved Dates:" }),
                " ",
                n.excludedSavedDates.length,
                " saved date(s)"
              ] }),
              n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("strong", { children: "Excluded Date Ranges:" }),
                " ",
                n.excludedDateRanges.length,
                " range(s)"
              ] })
            ] }),
            /* @__PURE__ */ x("div", { className: "flex justify-end gap-2", children: [
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
                  onClick: D,
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
const Ri = [
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
function qi({
  selectedRange: e,
  onSelect: t
}) {
  const n = ee(e.from), [r, s] = B(n);
  P(Ot());
  const o = (d, b) => {
    const h = ht(mt(/* @__PURE__ */ new Date(), d), b);
    if (!e.from) {
      t({ from: h, to: h });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      h < e.from ? t({ from: h, to: e.from }) : t({ from: e.from, to: h });
      return;
    }
    t({ from: h, to: h });
  }, a = (d, b) => {
    if (!e.from || !e.to) return !1;
    const h = Ve(e.from), D = ee(e.from), O = Ve(e.to), v = ee(e.to), w = d * 12 + b, g = D * 12 + h, k = v * 12 + O;
    return w >= g && w <= k;
  }, i = (d, b) => {
    if (!e.from) return !1;
    const h = Ve(e.from), D = ee(e.from);
    return d === D && b === h;
  }, l = (d, b) => {
    if (!e.to) return !1;
    const h = Ve(e.to), D = ee(e.to);
    return d === D && b === h;
  }, u = (d, b) => !1, y = (d) => /* @__PURE__ */ x("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-4 gap-2", children: Ri.map((b, h) => {
      const D = a(d, h), O = i(d, h), v = l(d, h), w = O || v, g = u();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !g && o(d, h),
          disabled: g,
          className: `
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${g ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : w ? "bg-[#003DB8] text-white" : D ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: b
        },
        b
      );
    }) })
  ] }, d);
  return /* @__PURE__ */ x("div", { className: "w-full", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(br, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ x("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(Dr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex gap-8", children: [
      y(r),
      y(r + 1)
    ] })
  ] });
}
const ji = ["Q1", "Q2", "Q3", "Q4"];
function Li({
  selectedRange: e,
  onSelect: t
}) {
  const n = ee(e.from), [r, s] = B(n);
  P(Ot());
  const o = (d, b) => {
    const h = Lr(
      ho(mt(/* @__PURE__ */ new Date(), d), b + 1)
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
  }, a = (d, b) => {
    if (!e.from || !e.to) return !1;
    const h = Mt(e.from) - 1, D = ee(e.from), O = Mt(e.to) - 1, v = ee(e.to), w = d * 4 + b, g = D * 4 + h, k = v * 4 + O;
    return w >= g && w <= k;
  }, i = (d, b) => {
    if (!e.from) return !1;
    const h = Mt(e.from) - 1, D = ee(e.from);
    return d === D && b === h;
  }, l = (d, b) => {
    if (!e.to) return !1;
    const h = Mt(e.to) - 1, D = ee(e.to);
    return d === D && b === h;
  }, u = (d, b) => !1, y = (d) => /* @__PURE__ */ x("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-2 gap-3", children: ji.map((b, h) => {
      const D = a(d, h), O = i(d, h), v = l(d, h), w = O || v, g = u();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !g && o(d, h),
          disabled: g,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${g ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : w ? "bg-blue-600 text-white" : D ? "bg-blue-100 text-blue-900" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: b
        },
        b
      );
    }) })
  ] }, d);
  return /* @__PURE__ */ x("div", { className: "w-full", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(br, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ x("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(Dr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex gap-8", children: [
      y(r),
      y(r + 1)
    ] })
  ] });
}
function Un({
  value: e,
  onChange: t,
  placeholder: n = "DD/MM/YYYY",
  className: r = ""
}) {
  const s = Me(null), [o, a] = B(""), i = Me(0), l = (h) => {
    if (!h || h.length !== 10) return "";
    const [D, O, v] = h.split("-");
    return `${v}/${O}/${D}`;
  }, u = (h) => {
    const D = h.replace(/\D/g, "");
    if (D.length !== 8) return null;
    const O = D.substring(0, 2), v = D.substring(2, 4), w = D.substring(4, 8), g = parseInt(v, 10), k = parseInt(O, 10), S = parseInt(w, 10);
    return g < 1 || g > 12 || k < 1 || k > 31 || S < 1900 || S > 2100 ? null : `${w}-${v}-${O}`;
  };
  return We(() => {
    a(l(e));
  }, [e]), /* @__PURE__ */ f(
    "input",
    {
      ref: s,
      type: "text",
      value: o,
      onChange: (h) => {
        const D = h.target.value, O = h.target.selectionStart || 0, v = o;
        if (D.length < v.length) {
          if (D.replace(/\D/g, "").length < v.replace(/\D/g, "").length) {
            const S = D.replace(/\D/g, "");
            let p = "";
            if (S.length > 0 && (p = S.substring(0, 2), S.length > 2 && (p += "/" + S.substring(2, 4)), S.length > 4 && (p += "/" + S.substring(4, 8))), a(p), setTimeout(() => {
              if (s.current) {
                const T = Math.min(O, p.length);
                s.current.setSelectionRange(T, T);
              }
            }, 0), S.length === 8) {
              const T = u(p);
              T && t(T);
            }
          } else
            a(v), setTimeout(() => {
              s.current && s.current.setSelectionRange(O, O);
            }, 0);
          return;
        }
        const w = D.replace(/\D/g, "");
        let g = "";
        if (w.length > 0) {
          let S = w.substring(0, 2);
          if (S.length === 2) {
            const p = parseInt(S, 10);
            p > 31 ? S = "31" : p < 1 && S.length === 2 && (S = "01");
          }
          if (g = S, w.length > 2) {
            let p = w.substring(2, 4);
            if (p.length === 2) {
              const T = parseInt(p, 10);
              T > 12 ? p = "12" : T < 1 && p.length === 2 && (p = "01");
            }
            g += "/" + p;
          }
          if (w.length > 4) {
            let p = w.substring(4, 8);
            if (p.length === 4) {
              const T = parseInt(p, 10);
              T > 2100 ? p = "2100" : T < 1900 && (p = "1900");
            }
            g += "/" + p;
          }
        }
        a(g);
        let k = O;
        if (g.length > v.length) {
          const S = g.length - v.length;
          k = O + S;
        }
        if (g[k] === "/" && k++, setTimeout(() => {
          if (s.current) {
            const S = Math.min(k, g.length);
            s.current.setSelectionRange(S, S);
          }
        }, 0), w.length === 8) {
          const S = u(g);
          S && t(S);
        }
      },
      onBlur: () => {
        if (o) {
          const h = u(o);
          h ? (t(h), a(l(h))) : a(l(e));
        }
      },
      onKeyDown: (h) => {
        const D = s.current;
        if (!D) return;
        const O = D.selectionStart || 0;
        if (i.current = O, h.key === "ArrowLeft" || h.key === "ArrowRight") {
          setTimeout(() => {
            const v = D.selectionStart || 0;
            if (o[v] === "/") {
              const w = h.key === "ArrowLeft" ? -1 : 1;
              D.setSelectionRange(v + w, v + w);
            }
          }, 0);
          return;
        }
        if (!(h.key === "Backspace" || h.key === "Delete" || h.key === "Tab" || h.key === "Escape" || h.key === "Enter")) {
          if (!/^\d$/.test(h.key)) {
            h.preventDefault();
            return;
          }
          if (o[O] === "/") {
            h.preventDefault();
            const v = o.substring(0, O) + h.key + o.substring(O + 1);
            a(v), setTimeout(() => {
              if (s.current) {
                const w = O + 1;
                s.current.setSelectionRange(w, w);
              }
            }, 0);
            return;
          }
          if (O >= 3 && O <= 5) {
            const w = o.replace(/\D/g, "").substring(2, 4), g = w.length === 1 ? w : "", k = h.key;
            if (w.length === 1 && O === 5) {
              const S = parseInt(g + k, 10);
              if ((S === 0 || S > 12) && (h.preventDefault(), S > 12)) {
                const p = o.substring(0, 3) + g + "2" + o.substring(5);
                a(p), setTimeout(() => {
                  s.current && s.current.setSelectionRange(6, 6);
                }, 0);
              }
            }
          }
          if (O >= 0 && O <= 2) {
            const w = o.replace(/\D/g, "").substring(0, 2), g = w.length === 1 ? w : "", k = h.key;
            if (w.length === 1 && O === 1) {
              const S = parseInt(g + k, 10);
              if ((S === 0 || S > 31) && (h.preventDefault(), S > 31)) {
                const p = g + "1" + o.substring(2);
                a(p), setTimeout(() => {
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
const Zi = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], zi = [
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
], Jt = "var(--adrp-container-height, min(720px, 85vh))", en = "var(--adrp-container-width, min(1200px, 98vw))";
function ec({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const s = Ot(), o = {
    height: Jt,
    minHeight: Jt,
    maxHeight: Jt,
    width: en,
    minWidth: en,
    maxWidth: en,
    overflow: "hidden",
    ...r
  }, [a, i] = B(
    e?.unit || "day"
  ), [l, u] = B(
    e?.startDateUtc || s
  ), [y, d] = B(
    e?.endDateUtc || s
  ), [b, h] = B(e?.duration || 1), [D, O] = B(
    e?.excludedWeekdays || []
  ), [v, w] = B(
    []
  ), g = Me(null), [k, S] = B(0), [p, T] = B(!1), [M, I] = B([]), [G, X] = B(!1), [H, te] = B(null), [ie, he] = B([]), [ne, xe] = B([]), [Ce, re] = B(
    void 0
  ), ce = Me(null), [se, rt] = B([]), [K, Q] = B(() => e?.startDateUtc ? J(P(e.startDateUtc)) : J(P(s))), [me, Te] = B(null), [qe, Pe] = B(() => e?.startDateUtc ? ee(P(e.startDateUtc)) : ee(P(s))), [Ue, De] = B(null), [Ge, $e] = B(() => {
    if (e?.startDateUtc) {
      const m = ee(P(e.startDateUtc));
      return Math.floor(m / 10) * 10;
    }
    const c = ee(P(s));
    return Math.floor(c / 10) * 10;
  });
  We(() => {
    if (l && y) {
      const c = kr(
        l,
        y,
        a,
        D
      );
      h(c);
    } else
      h(1);
  }, [l, y, a, D]), We(() => {
    if (g.current) {
      const m = document.createElement("canvas").getContext("2d");
      if (m) {
        m.font = "14px system-ui, -apple-system, sans-serif";
        const Y = m.measureText(b.toString()).width;
        S(12 + Y + 4);
      }
    }
  }, [b]), We(() => {
    const c = (m) => {
      ce.current && !ce.current.contains(m.target) && X(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, []), We(() => {
    (async () => {
      await nt.init();
      const m = await nt.getData(
        "savedDateRanges"
      );
      m && rt(m);
    })();
  }, []);
  const Ct = (c) => {
    u(c), c && y && P(c) > P(y) && d(c), c && Q(J(P(c)));
  }, Tt = (c) => {
    d(c), c && l && P(c) < P(l) && u(c), c && Q(J(P(c)));
  }, Ke = !tt, Wt = (c) => {
    if (!(c <= 0)) {
      if (h(c), l) {
        const m = _i(
          l,
          a,
          c,
          D
        );
        d(m), Q(J(P(m)));
      } else if (y) {
        const m = Ii(
          y,
          a,
          c,
          D
        );
        u(m), Q(J(P(m)));
      }
    }
  }, Yt = (c) => {
    i(c);
  }, Et = (c) => {
    D.includes(c) ? O(D.filter((m) => m !== c)) : O([...D, c]);
  }, _t = (c, m) => {
    u(c), d(m), c && Q(J(P(c)));
  }, It = (c) => {
    u(c.startDateUtc), d(c.endDateUtc), i(c.unit), O(c.excludedWeekdays), h(c.duration), c.excludeEnabled !== void 0 && T(c.excludeEnabled), c.excludeFilterTypes ? I(c.excludeFilterTypes) : I([]), c.excludedSpecificDates ? w(c.excludedSpecificDates) : w([]), c.excludedSavedDates ? he(c.excludedSavedDates) : he([]), c.excludedDateRanges ? xe(c.excludedDateRanges) : xe([]), c.startDateUtc && Q(J(P(c.startDateUtc)));
  }, Ft = () => {
    u(s), d(s), O([]), Q(J(P(s)));
  }, Pt = () => {
    u(""), d(""), h(1), i("day"), O([]), T(!1), I([]), w([]), he([]), xe([]), re(void 0), te(null), Q(J(P(s)));
  }, Xe = !l || l.trim() === "" || !y || y.trim() === "", st = () => {
    if (Xe)
      return;
    const c = Pn(
      l,
      y,
      a,
      D,
      p,
      M,
      v,
      ie,
      ne
    );
    t(c);
  }, ge = (c) => {
    if (c?.from) {
      const m = R(c.from);
      if (u(m), c?.to) {
        const Y = R(c.to);
        d(Y);
      } else
        d(m);
    }
  }, Ut = (c, m) => {
    if (l && y && c?.to) {
      u(R(m)), console.log(
        "dayPickerProps",
        m,
        "parseUtc(endDateUtc)",
        P(y)
      ), m.getTime() > P(y).getTime() && d("");
      return;
    }
    if (!l && y && c?.from) {
      d(R(c?.from));
      return;
    }
    if (!l && !y && c?.from) {
      u(R(c?.from)), d("");
      return;
    }
    if (c?.from) {
      const Y = R(c.from);
      if (u(Y), c?.to) {
        const N = R(c.to);
        d(N);
      } else
        d(Y);
    }
  }, bt = (c) => {
    if (c && c.from) {
      const m = Ie(c.from, {
        weekStartsOn: sn
      }), Y = Se(m, 6);
      if (c.to) {
        const N = Ie(c.to, {
          weekStartsOn: sn
        }), _ = Se(N, 6);
        ge({ from: m, to: _ });
      } else
        ge({ from: m, to: Y });
    }
  }, Dt = P(s), Be = {
    from: l ? P(l) : void 0,
    to: y ? P(y) : void 0
  }, wt = {
    from: l ? P(l) : Dt,
    to: y ? P(y) : Dt
  }, je = (c) => {
    const m = !tt, Y = p && M.includes("days") && D.includes(c.getDay()), N = p && M.includes("specific-date") && v.includes(R(c)), _ = p && M.includes("saved-dates") && ie.some((E) => {
      const F = se.find((j) => j.id === E);
      if (!F) return !1;
      const q = R(c);
      if (!(q >= F.selection.startDateUtc && q <= F.selection.endDateUtc)) return !1;
      if (F.selection.excludedWeekdays && F.selection.excludedWeekdays.length > 0 && F.selection.excludedWeekdays.includes(c.getDay()) || F.selection.excludedSpecificDates && F.selection.excludedSpecificDates.length > 0 && F.selection.excludedSpecificDates.includes(q) || F.selection.excludedSavedDates && F.selection.excludedSavedDates.some(
        (ye) => {
          const L = se.find(
            (V) => V.id === ye
          );
          return L ? q >= L.selection.startDateUtc && q <= L.selection.endDateUtc : !1;
        }
      ))
        return !0;
      let oe = !1;
      return !!(F.selection.excludedDateRanges && (oe = F.selection.excludedDateRanges.some(
        (j) => q >= j.start && q <= j.end
      ), oe));
    }), $ = p && M.includes("date-range") && ne.some((E) => {
      const F = R(c);
      return F >= E.start && F <= E.end;
    });
    return m || Y || N || _ || $;
  }, $t = (c, m) => {
    const Y = J(
      ht(mt(/* @__PURE__ */ new Date(), c), m)
    );
    Q(Y), Te(null), Pe(c);
  }, Bt = (c) => {
    const m = Ve(K), Y = J(
      ht(mt(/* @__PURE__ */ new Date(), c), m)
    );
    Q(Y), De(null), $e(Math.floor(c / 10) * 10);
  };
  We(() => {
    me === null && Pe(ee(K));
  }, [K, me]);
  const xt = (c) => {
    const m = c - 1, Y = c + 10, N = ee(K), _ = [];
    for (let $ = m; $ <= Y; $++)
      _.push($);
    return /* @__PURE__ */ x("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => $e(Ge - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ f("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ x("div", { className: "text-lg font-semibold", children: [
          c,
          "-",
          c + 9
        ] }),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => $e(Ge + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: _.map(($) => {
        const E = !tt, F = $ < c || $ > c + 9;
        return /* @__PURE__ */ f(
          "button",
          {
            onClick: () => Bt($),
            disabled: E,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${F ? "opacity-50 bg-gray-50 text-gray-500" : N === $ ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: $
          },
          $
        );
      }) })
    ] });
  }, vt = (c) => /* @__PURE__ */ x("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Pe(qe - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ f("div", { className: "text-lg font-semibold", children: c }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Pe(qe + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: zi.map((m, Y) => {
      const N = !tt, _ = ee(K) === c && Ve(K) === Y;
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => $t(c, Y),
          disabled: N,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${_ ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: m
        },
        m
      );
    }) })
  ] }), Le = Me(null), Je = Me(null);
  return We(() => {
    if (a !== "day") return;
    const c = (N, _) => {
      const $ = N.querySelector(
        "span[data-month-name]"
      ), E = N.querySelector(
        "span[data-year-name]"
      );
      if ($) {
        const j = N.textContent || "";
        N.style.gap = "6px";
        let ye = "";
        if (E)
          ye = E.textContent || "";
        else {
          const L = j.match(/\d{4}/);
          L && (ye = L[0]);
        }
        if (!E && ye) {
          const L = document.createElement("span");
          L.textContent = ye, L.setAttribute("data-year-name", "true"), L.style.cursor = "pointer", L.onclick = (pe) => {
            pe.stopPropagation(), pe.preventDefault();
            const kt = parseInt(ye, 10);
            if (!isNaN(kt)) {
              const Ze = Math.floor(kt / 10) * 10;
              $e(Ze), De(_), Te(null);
            }
          };
          const V = $.nextSibling;
          if (V && V.nodeType === Node.TEXT_NODE)
            V.parentNode?.insertBefore(L, V.nextSibling);
          else {
            const pe = document.createTextNode(" ");
            N.appendChild(pe), N.appendChild(L);
          }
        } else E && (E.onclick = (L) => {
          L.stopPropagation(), L.preventDefault();
          const V = parseInt(ye, 10);
          if (!isNaN(V)) {
            const pe = Math.floor(V / 10) * 10;
            $e(pe), De(_), Te(null);
          }
        });
        $.onclick = (L) => {
          L.stopPropagation(), L.preventDefault();
          const V = parseInt(ye, 10);
          isNaN(V) || (Pe(V), Te(_), De(null));
        };
        return;
      }
      const F = N.textContent || "", q = F.trim().split(/\s+/);
      let de = "", oe = "";
      if (q.length >= 2)
        de = q[0], oe = q[1];
      else if (q.length === 1) {
        const j = F.match(/^([A-Za-z]+)(\d{4})$/);
        if (j)
          de = j[1], oe = j[2];
        else
          return;
      } else
        return;
      if (de && oe) {
        const j = N.firstChild;
        if (N.style.gap = "6px", j && j.nodeType === Node.TEXT_NODE && (j.textContent || "").indexOf(de) !== -1) {
          const V = document.createElement("span");
          V.textContent = de, V.setAttribute("data-month-name", "true"), V.style.cursor = "pointer", V.onclick = (Ze) => {
            Ze.stopPropagation(), Ze.preventDefault();
            const ot = parseInt(oe, 10);
            isNaN(ot) || (Pe(ot), Te(_), De(null));
          };
          const pe = document.createElement("span");
          pe.textContent = oe, pe.setAttribute("data-year-name", "true"), pe.style.cursor = "pointer", pe.onclick = (Ze) => {
            Ze.stopPropagation(), Ze.preventDefault();
            const ot = parseInt(oe, 10);
            if (!isNaN(ot)) {
              const Mr = Math.floor(ot / 10) * 10;
              $e(Mr), De(_), Te(null);
            }
          }, N.innerHTML = "", N.appendChild(V);
          const kt = document.createTextNode(" ");
          N.appendChild(kt), N.appendChild(pe);
        }
      }
    }, m = (N, _) => {
      if (!N) return;
      N.querySelectorAll(".rdp-caption_label").forEach((E, F) => {
        const q = E, de = _ !== null ? _ : F === 0 ? 0 : 1;
        me === de || Ue === de || c(q, de);
      });
    }, Y = setTimeout(() => {
      me === null && Ue === null ? m(Le.current, null) : (m(Le.current, 0), m(Je.current, 1));
    }, 150);
    return () => clearTimeout(Y);
  }, [a, K, me, Ue]), /* @__PURE__ */ x(
    "div",
    {
      className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200",
      style: o,
      children: [
        /* @__PURE__ */ f(
          Hi,
          {
            onPresetSelect: _t,
            onSavedDateSelect: It,
            currentSelection: Pn(
              l,
              y,
              a,
              D,
              p,
              M,
              v,
              ie,
              ne
            ),
            themeColors: r
          }
        ),
        /* @__PURE__ */ x("div", { className: "flex-1 flex flex-col min-h-0", children: [
          /* @__PURE__ */ x("div", { className: "px-6 pt-6 overflow-y-auto flex-1", children: [
            /* @__PURE__ */ f("div", { className: "flex gap-2 mb-4", children: ["day", "week", "month", "quarter"].map(
              (c) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => Yt(c),
                  className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${a === c ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
                  children: c.charAt(0).toUpperCase() + c.slice(1)
                },
                c
              )
            ) }),
            /* @__PURE__ */ x("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Start Date" }),
                /* @__PURE__ */ f(
                  Un,
                  {
                    value: l,
                    onChange: Ct,
                    placeholder: "DD/MM/YYYY",
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                )
              ] }),
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "End Date" }),
                /* @__PURE__ */ f(
                  Un,
                  {
                    value: y,
                    onChange: Tt,
                    placeholder: "DD/MM/YYYY",
                    className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }
                )
              ] }),
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Duration" }),
                /* @__PURE__ */ x("div", { className: "relative", children: [
                  /* @__PURE__ */ f(
                    "input",
                    {
                      ref: g,
                      type: "number",
                      min: "1",
                      value: b,
                      onChange: (c) => Wt(Number(c.target.value)),
                      className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "span",
                    {
                      className: "absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none",
                      style: { left: `${k}px` },
                      children: Pi(a)
                    }
                  )
                ] })
              ] })
            ] }),
            Ke,
            /* @__PURE__ */ x("div", { className: "mb-4", children: [
              /* @__PURE__ */ x("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ f(
                  "input",
                  {
                    type: "checkbox",
                    id: "exclude-checkbox",
                    checked: p,
                    onChange: (c) => T(c.target.checked),
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
                /* @__PURE__ */ x("div", { className: "relative flex-1", ref: ce, children: [
                  /* @__PURE__ */ f(
                    "button",
                    {
                      type: "button",
                      onClick: () => p && X(!G),
                      disabled: !p,
                      className: "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                      children: /* @__PURE__ */ f(
                        "span",
                        {
                          className: M.length === 0 ? "text-gray-400" : "text-gray-700",
                          children: M.length === 0 ? "select a filter" : M.length === 1 ? (() => {
                            switch (M[0]) {
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
                          })() : `${M.length} filters selected`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ f(ei, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }),
                  G && p && /* @__PURE__ */ f("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", children: /* @__PURE__ */ x("div", { className: "p-2 space-y-1", children: [
                    /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: M.includes("days"),
                          onChange: (c) => {
                            c.target.checked ? I([
                              ...M,
                              "days"
                            ]) : I(
                              M.filter((m) => m !== "days")
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Days" })
                    ] }),
                    /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: M.includes("specific-date"),
                          onChange: (c) => {
                            c.target.checked ? I([
                              ...M,
                              "specific-date"
                            ]) : I(
                              M.filter(
                                (m) => m !== "specific-date"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Specific Date" })
                    ] }),
                    /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: M.includes("saved-dates"),
                          onChange: (c) => {
                            c.target.checked ? I([
                              ...M,
                              "saved-dates"
                            ]) : I(
                              M.filter(
                                (m) => m !== "saved-dates"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ f("span", { className: "text-sm text-gray-700", children: "Saved Dates" })
                    ] }),
                    /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: M.includes("date-range"),
                          onChange: (c) => {
                            c.target.checked ? I([
                              ...M,
                              "date-range"
                            ]) : I(
                              M.filter(
                                (m) => m !== "date-range"
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
              p && M.length > 0 && /* @__PURE__ */ x("div", { className: "flex gap-2 items-center", children: [
                M.includes("days") && /* @__PURE__ */ x(
                  "button",
                  {
                    onClick: () => te(
                      H === "days" ? null : "days"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "days" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(zt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ x("span", { children: [
                        "Days (",
                        D.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                M.includes("specific-date") && /* @__PURE__ */ x(
                  "button",
                  {
                    onClick: () => te(
                      H === "specific-date" ? null : "specific-date"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "specific-date" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(zt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ x("span", { children: [
                        "Dates (",
                        v.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                M.includes("saved-dates") && /* @__PURE__ */ x(
                  "button",
                  {
                    onClick: () => te(
                      H === "saved-dates" ? null : "saved-dates"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "saved-dates" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Ka, { className: "w-4 h-4" }),
                      /* @__PURE__ */ x("span", { children: [
                        "Saved (",
                        ie.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                M.includes("date-range") && /* @__PURE__ */ x(
                  "button",
                  {
                    onClick: () => te(
                      H === "date-range" ? null : "date-range"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "date-range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(zt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ x("span", { children: [
                        "Date Ranges (",
                        ne.length,
                        " selected)"
                      ] })
                    ]
                  }
                )
              ] }),
              p && H === "days" && M.includes("days") && /* @__PURE__ */ f("div", { className: "mt-3 flex gap-2", children: Zi.map((c) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => Et(c.value),
                  className: `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${D.includes(c.value) ? "bg-red-100 text-red-700 border-2 border-red-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                  children: c.label
                },
                c.value
              )) }),
              p && H === "specific-date" && M.includes("specific-date") && /* @__PURE__ */ x("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 text-center mb-2", children: "Click individual dates to exclude them" }),
                /* @__PURE__ */ f("div", { className: "flex justify-center p-4 border border-gray-200 rounded-md bg-gray-50", children: /* @__PURE__ */ f(
                  He,
                  {
                    mode: "multiple",
                    selected: v.map((c) => P(c)),
                    onSelect: (c) => {
                      c && w(
                        c.map((m) => R(m))
                      );
                    },
                    numberOfMonths: 2,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                v.length > 0 && /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: v.map((c) => /* @__PURE__ */ x(
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
                            w(
                              v.filter((m) => m !== c)
                            );
                          },
                          className: "hover:bg-red-200 rounded-full p-0.5",
                          children: /* @__PURE__ */ f(Sn, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  },
                  c
                )) })
              ] }),
              p && H === "saved-dates" && M.includes("saved-dates") && /* @__PURE__ */ f("div", { className: "mt-3 flex flex-col gap-3", children: se.length === 0 ? /* @__PURE__ */ f("p", { className: "text-sm text-gray-500 text-center py-4", children: "No saved dates available" }) : /* @__PURE__ */ f("div", { className: "space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2", children: se.map((c) => {
                const m = ie.includes(
                  c.id
                );
                return /* @__PURE__ */ x(
                  "div",
                  {
                    className: `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${m ? "bg-red-50 border border-red-300" : "bg-white hover:bg-gray-50 border border-gray-200"}`,
                    onClick: () => {
                      he(
                        m ? ie.filter(
                          (Y) => Y !== c.id
                        ) : [
                          ...ie,
                          c.id
                        ]
                      );
                    },
                    children: [
                      /* @__PURE__ */ x("div", { className: "flex-1", children: [
                        /* @__PURE__ */ f("div", { className: "text-sm font-medium text-gray-900", children: c.label }),
                        /* @__PURE__ */ x("div", { className: "text-xs text-gray-600", children: [
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
                          checked: m,
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
              p && H === "date-range" && M.includes("date-range") && /* @__PURE__ */ x("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ f("div", { className: "border border-gray-200 rounded-md bg-gray-50 p-4", children: /* @__PURE__ */ f(
                  He,
                  {
                    mode: "range",
                    selected: Ce,
                    onSelect: (c) => re(c),
                    numberOfMonths: 2,
                    disabled: (c) => !tt,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                Ce?.from && Ce?.to && /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => {
                        const c = {
                          id: `range-${Date.now()}`,
                          start: R(Ce.from),
                          end: R(Ce.to)
                        };
                        xe([
                          ...ne,
                          c
                        ]), re(void 0);
                      },
                      className: "px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors",
                      children: "Add Date Range"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => re(void 0),
                      className: "px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors",
                      children: "Clear Selection"
                    }
                  )
                ] }),
                ne.length > 0 && /* @__PURE__ */ x("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ f("p", { className: "text-xs text-gray-600 font-medium", children: "Excluded Date Ranges:" }),
                  /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: ne.map((c) => /* @__PURE__ */ x(
                    "div",
                    {
                      className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                      children: [
                        /* @__PURE__ */ x("span", { children: [
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
                              xe(
                                ne.filter(
                                  (m) => m.id !== c.id
                                )
                              );
                            },
                            className: "hover:bg-red-200 rounded-full p-0.5",
                            children: /* @__PURE__ */ f(Sn, { className: "w-3 h-3" })
                          }
                        )
                      ]
                    },
                    c.id
                  )) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ x("div", { className: "flex gap-4 justify-center mb-4", children: [
              a === "day" && /* @__PURE__ */ f("div", { className: "flex gap-4", children: Ue !== null ? Ue === 0 ? (
                // When yearsViewIndex === 0, show years grid on left and single calendar on right
                /* @__PURE__ */ x(lt, { children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: xt(Ge)
                    }
                  ),
                  /* @__PURE__ */ f("div", { ref: Je, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: ge,
                      month: J(Ye(K, 1)),
                      onMonthChange: (c) => {
                        const m = new Date(K), N = new Date(c).getMonth() - m.getMonth();
                        N !== 1 && N !== -11 && Q(
                          J(Ye(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: je,
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
                /* @__PURE__ */ x(lt, { children: [
                  /* @__PURE__ */ f("div", { ref: Le, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: ge,
                      month: K,
                      onMonthChange: Q,
                      numberOfMonths: 1,
                      disabled: je,
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
                      children: xt(Ge)
                    }
                  )
                ] })
              ) : me === null ? (
                // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
                /* @__PURE__ */ f("div", { ref: Le, children: /* @__PURE__ */ f(
                  He,
                  {
                    mode: "range",
                    navLayout: "around",
                    selected: Be,
                    onSelect: (c, m) => {
                      Ut(c, m);
                    },
                    month: K,
                    onMonthChange: Q,
                    numberOfMonths: 2,
                    disabled: je,
                    modifiersClassNames: {
                      selected: "rdp-day_selected bg-[#003DB8]",
                      disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                    },
                    classNames: {
                      chevron: "fill-black"
                    }
                  }
                ) })
              ) : me === 0 ? (
                // When monthsViewIndex === 0, show months grid on left and single calendar on right
                /* @__PURE__ */ x(lt, { children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: vt(qe)
                    }
                  ),
                  /* @__PURE__ */ f("div", { ref: Je, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: ge,
                      month: J(Ye(K, 1)),
                      onMonthChange: (c) => {
                        const m = new Date(K), N = new Date(c).getMonth() - m.getMonth();
                        N !== 1 && N !== -11 && Q(
                          J(Ye(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: je,
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
                /* @__PURE__ */ x(lt, { children: [
                  /* @__PURE__ */ f("div", { ref: Le, children: /* @__PURE__ */ f(
                    He,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Be,
                      onSelect: ge,
                      month: K,
                      onMonthChange: Q,
                      numberOfMonths: 1,
                      disabled: je,
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
                      children: vt(qe)
                    }
                  )
                ] })
              ) }),
              a === "week" && /* @__PURE__ */ f(
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
                  onSelect: bt,
                  onWeekNumberClick: (c, m) => {
                    m && m.length > 0 && bt({
                      from: m[0],
                      to: m[m.length - 1]
                    });
                  },
                  month: K,
                  onMonthChange: Q,
                  numberOfMonths: 2,
                  disabled: (c) => {
                    const m = !tt, Y = p && M.includes("days") && D.includes(c.getDay()), N = p && M.includes("specific-date") && v.includes(R(c)), _ = p && M.includes("saved-dates") && ie.some((E) => {
                      const F = se.find(
                        (j) => j.id === E
                      );
                      if (!F) return !1;
                      const q = R(c);
                      if (!(q >= F.selection.startDateUtc && q <= F.selection.endDateUtc)) return !1;
                      if (F.selection.excludedWeekdays && F.selection.excludedWeekdays.length > 0 && F.selection.excludedWeekdays.includes(c.getDay()) || F.selection.excludedSpecificDates && F.selection.excludedSpecificDates.length > 0 && F.selection.excludedSpecificDates.includes(q) || F.selection.excludedSavedDates && F.selection.excludedSavedDates.some(
                        (ye) => {
                          const L = se.find(
                            (V) => V.id === ye
                          );
                          return L ? q >= L.selection.startDateUtc && q <= L.selection.endDateUtc : !1;
                        }
                      ))
                        return !0;
                      let oe = !1;
                      return !!(F.selection.excludedDateRanges && (oe = F.selection.excludedDateRanges.some(
                        (j) => q >= j.start && q <= j.end
                      ), oe));
                    }), $ = p && M.includes("date-range") && ne.some((E) => {
                      const F = R(c);
                      return F >= E.start && F <= E.end;
                    });
                    return m || Y || N || _ || $;
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
              a === "month" && /* @__PURE__ */ f(
                qi,
                {
                  selectedRange: wt,
                  onSelect: ge
                }
              ),
              a === "quarter" && /* @__PURE__ */ f(
                Li,
                {
                  selectedRange: wt,
                  onSelect: ge
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ x("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
            /* @__PURE__ */ f(
              "button",
              {
                onClick: Ft,
                className: "px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
                children: "Today"
              }
            ),
            /* @__PURE__ */ x("div", { className: "flex gap-2", children: [
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
                  onClick: st,
                  disabled: !!(Xe || Ke),
                  className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${Xe || Ke ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
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
  tt as ALLOW_FUTURE_DATES,
  ec as AdvancedDateRangePicker,
  Gi as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  Ki as WEEK_NUMBERING_MODE,
  sn as WEEK_STARTS_ON,
  kr as calcDurationFromRange,
  _i as calcEndFromDuration,
  Ii as calcStartFromDuration,
  Pn as createSelection,
  Xi as formatDisplayDate,
  R as formatUtc,
  Ui as getPresets,
  Ot as getTodayUtc,
  Pi as getUnitAbbreviation,
  Ji as parseDisplayDate,
  P as parseUtc
};
