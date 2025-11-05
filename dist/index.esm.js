import { jsxs as v, jsx as f, Fragment as ct } from "react/jsx-runtime";
import S, { createContext as xr, useContext as vr, useCallback as ge, useRef as ke, useLayoutEffect as kr, useState as B, useEffect as We, useMemo as $t, forwardRef as In, createElement as Kt } from "react";
function Mr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Nr = {}, lt = {};
function Qe(e, t) {
  try {
    const r = (Nr[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in lt ? lt[r] : cn(r, r.split(":"));
  } catch {
    if (e in lt) return lt[e];
    const n = e?.match(Sr);
    return n ? cn(e, n.slice(1)) : NaN;
  }
}
const Sr = /([+-]\d\d):?(\d\d)?/;
function cn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return lt[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class Me extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Qe(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Fn(this), Xt(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Me(...n, t) : new Me(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Me(+this, t);
  }
  getTimezoneOffset() {
    const t = -Qe(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Xt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Me(+new Date(t), this.timeZone);
  }
  //#endregion
}
const ln = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!ln.test(e)) return;
  const t = e.replace(ln, "$1UTC");
  Me.prototype[t] && (e.startsWith("get") ? Me.prototype[e] = function() {
    return this.internal[t]();
  } : (Me.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Or(this), +this;
  }, Me.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Xt(this), +this;
  }));
});
function Xt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Qe(e.timeZone, e) * 60));
}
function Or(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Fn(e);
}
function Fn(e) {
  const t = Qe(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = s - o, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const l = s - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const p = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(Qe(e.timeZone, e) * 60)) % 60;
  (d || p) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + p));
  const y = Qe(e.timeZone, e), m = y > 0 ? Math.floor(y) : Math.ceil(y), N = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - m, k = m !== n, h = N - l;
  if (k && h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
    const w = Qe(e.timeZone, e), b = w > 0 ? Math.floor(w) : Math.ceil(w), O = m - b;
    O && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + O), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + O));
  }
}
class oe extends Me {
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
    return `${t} GMT${n}${r}${s} (${Mr(this.timeZone, this)})`;
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
const Pn = 6048e5, Cr = 864e5, Un = 6e4, $n = 36e5, dn = Symbol.for("constructDateFrom");
function V(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && dn in e ? e[dn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function P(e, t) {
  return V(t || e, e);
}
function Ne(e, t, n) {
  const r = P(e, n?.in);
  return isNaN(t) ? V(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ye(e, t, n) {
  const r = P(e, n?.in);
  if (isNaN(t)) return V(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), o = V(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const a = o.getDate();
  return s >= a ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    s
  ), r);
}
let Tr = {};
function mt() {
  return Tr;
}
function Ie(e, t) {
  const n = mt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = P(e, t?.in), o = s.getDay(), a = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function dt(e, t) {
  return Ie(e, { ...t, weekStartsOn: 1 });
}
function Bn(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = V(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const o = dt(s), a = V(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = dt(a);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function un(e) {
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
function He(e, ...t) {
  const n = V.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ut(e, t) {
  const n = P(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function tn(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  ), o = ut(r), a = ut(s), i = +o - un(o), l = +a - un(a);
  return Math.round((i - l) / Cr);
}
function Wr(e, t) {
  const n = Bn(e, t), r = V(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), dt(r);
}
function An(e, t, n) {
  return Ye(e, t * 3, n);
}
function nn(e, t, n) {
  return Ne(e, t * 7, n);
}
function Yr(e, t, n) {
  return Ye(e, t * 12, n);
}
function Er(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = V.bind(null, s));
    const o = P(s, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), V(r, n || NaN);
}
function _r(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = V.bind(null, s));
    const o = P(s, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), V(r, n || NaN);
}
function Bt(e, t) {
  const n = +P(e) - +P(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Ir(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  );
  return +ut(r) == +ut(s);
}
function Hn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Fr(e) {
  return !(!Hn(e) && typeof e != "number" || isNaN(+P(e)));
}
function Rn(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  ), o = r.getFullYear() - s.getFullYear(), a = r.getMonth() - s.getMonth();
  return o * 12 + a;
}
function kt(e, t) {
  const n = P(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function qn(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  ), o = fn(r, s), a = Math.abs(
    tn(r, s)
  );
  r.setDate(r.getDate() - o * a);
  const i = +(fn(r, s) === -o), l = o * (a - i);
  return l === 0 ? 0 : l;
}
function fn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function jn(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function Pr(e, t) {
  const n = P(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function Ln(e, t) {
  const n = P(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Ur(e, t) {
  const n = P(e, t?.in);
  return +Pr(n, t) == +Ln(n, t);
}
function Zn(e, t, n) {
  const [r, s, o] = He(
    n?.in,
    e,
    e,
    t
  ), a = Bt(s, o), i = Math.abs(
    Rn(s, o)
  );
  if (i < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - a * i);
  let l = Bt(s, o) === -a;
  Ur(r) && i === 1 && Bt(r, o) === 1 && (l = !1);
  const u = a * (i - +l);
  return u === 0 ? 0 : u;
}
function $r(e, t, n) {
  const r = Zn(e, t, n) / 3;
  return jn()(r);
}
function Br(e, t, n) {
  const r = qn(e, t, n) / 7;
  return jn()(r);
}
function rn(e, t) {
  const [n, r] = He(e, t.start, t.end);
  return { start: n, end: r };
}
function zn(e, t) {
  const { start: n, end: r } = rn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0);
  let i = 1;
  const l = [];
  for (; +a <= o; )
    l.push(V(n, a)), a.setDate(a.getDate() + i), a.setHours(0, 0, 0, 0);
  return s ? l.reverse() : l;
}
function Ar(e, t) {
  const { start: n, end: r } = rn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const l = [];
  for (; +a <= o; )
    l.push(V(n, a)), a.setMonth(a.getMonth() + i);
  return s ? l.reverse() : l;
}
function Hr(e, t) {
  const n = P(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function ee(e, t) {
  const n = P(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Rr(e, t) {
  const n = P(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function sn(e, t) {
  const n = P(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function qr(e, t) {
  const { start: n, end: r } = rn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const l = [];
  for (; +a <= o; )
    l.push(V(n, a)), a.setFullYear(a.getFullYear() + i);
  return s ? l.reverse() : l;
}
function Qn(e, t) {
  const n = mt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = P(e, t?.in), o = s.getDay(), a = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + a), s.setHours(23, 59, 59, 999), s;
}
function jr(e, t) {
  return Qn(e, { ...t, weekStartsOn: 1 });
}
const Lr = {
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
}, Zr = (e, t, n) => {
  let r;
  const s = Lr[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function At(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const zr = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Qr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Vr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Gr = {
  date: At({
    formats: zr,
    defaultWidth: "full"
  }),
  time: At({
    formats: Qr,
    defaultWidth: "full"
  }),
  dateTime: At({
    formats: Vr,
    defaultWidth: "full"
  })
}, Kr = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Xr = (e, t, n, r) => Kr[e];
function ot(e) {
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
const Jr = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, es = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ts = {
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
}, ns = {
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
}, rs = {
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
}, ss = {
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
}, os = (e, t) => {
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
}, as = {
  ordinalNumber: os,
  era: ot({
    values: Jr,
    defaultWidth: "wide"
  }),
  quarter: ot({
    values: es,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: ot({
    values: ts,
    defaultWidth: "wide"
  }),
  day: ot({
    values: ns,
    defaultWidth: "wide"
  }),
  dayPeriod: ot({
    values: rs,
    defaultWidth: "wide",
    formattingValues: ss,
    defaultFormattingWidth: "wide"
  })
};
function at(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(s);
    if (!o)
      return null;
    const a = o[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(i) ? cs(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      is(i, (d) => d.test(a))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const p = t.slice(a.length);
    return { value: u, rest: p };
  };
}
function is(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function cs(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ls(e) {
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
const ds = /^(\d+)(th|st|nd|rd)?/i, us = /\d+/i, fs = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, hs = {
  any: [/^b/i, /^(a|c)/i]
}, ms = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, gs = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ys = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ps = {
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
}, bs = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ds = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, ws = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, xs = {
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
}, vs = {
  ordinalNumber: ls({
    matchPattern: ds,
    parsePattern: us,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: at({
    matchPatterns: fs,
    defaultMatchWidth: "wide",
    parsePatterns: hs,
    defaultParseWidth: "any"
  }),
  quarter: at({
    matchPatterns: ms,
    defaultMatchWidth: "wide",
    parsePatterns: gs,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: at({
    matchPatterns: ys,
    defaultMatchWidth: "wide",
    parsePatterns: ps,
    defaultParseWidth: "any"
  }),
  day: at({
    matchPatterns: bs,
    defaultMatchWidth: "wide",
    parsePatterns: Ds,
    defaultParseWidth: "any"
  }),
  dayPeriod: at({
    matchPatterns: ws,
    defaultMatchWidth: "any",
    parsePatterns: xs,
    defaultParseWidth: "any"
  })
}, on = {
  code: "en-US",
  formatDistance: Zr,
  formatLong: Gr,
  formatRelative: Xr,
  localize: as,
  match: vs,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function ks(e, t) {
  const n = P(e, t?.in);
  return tn(n, sn(n)) + 1;
}
function Vn(e, t) {
  const n = P(e, t?.in), r = +dt(n) - +Wr(n);
  return Math.round(r / Pn) + 1;
}
function Gn(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = mt(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, a = V(t?.in || e, 0);
  a.setFullYear(r + 1, 0, o), a.setHours(0, 0, 0, 0);
  const i = Ie(a, t), l = V(t?.in || e, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const u = Ie(l, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function Ms(e, t) {
  const n = mt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = Gn(e, t), o = V(t?.in || e, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), Ie(o, t);
}
function Kn(e, t) {
  const n = P(e, t?.in), r = +Ie(n, t) - +Ms(n, t);
  return Math.round(r / Pn) + 1;
}
function R(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Be = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return R(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : R(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return R(e.getDate(), t.length);
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
    return R(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return R(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return R(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return R(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), s = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return R(s, t.length);
  }
}, Ke = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, hn = {
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
    return Be.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const s = Gn(e, r), o = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const a = o % 100;
      return R(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : R(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Bn(e);
    return R(n, t.length);
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
    return R(n, t.length);
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
        return R(r, 2);
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
        return R(r, 2);
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
        return Be.M(e, t);
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
        return R(r + 1, 2);
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
    const s = Kn(e, r);
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : R(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Vn(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : R(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Be.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = ks(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : R(r, t.length);
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
        return R(o, 2);
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
        return R(o, t.length);
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
        return R(s, t.length);
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
    return Be.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Be.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : R(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : R(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Be.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Be.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Be.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return gn(r);
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
        return gn(r);
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
        return "GMT" + mn(r, ":");
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
        return "GMT" + mn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + ze(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return R(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return R(+e, t.length);
  }
};
function mn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + t + R(o, 2);
}
function gn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + R(Math.abs(e) / 60, 2) : ze(e, t);
}
function ze(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = R(Math.trunc(r / 60), 2), o = R(r % 60, 2);
  return n + s + t + o;
}
const yn = (e, t) => {
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
}, Xn = (e, t) => {
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
}, Ns = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return yn(e, t);
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
  return o.replace("{{date}}", yn(r, t)).replace("{{time}}", Xn(s, t));
}, Ss = {
  p: Xn,
  P: Ns
}, Os = /^D+$/, Cs = /^Y+$/, Ts = ["D", "DD", "YY", "YYYY"];
function Ws(e) {
  return Os.test(e);
}
function Ys(e) {
  return Cs.test(e);
}
function Es(e, t, n) {
  const r = _s(e, t, n);
  if (console.warn(r), Ts.includes(e)) throw new RangeError(r);
}
function _s(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Is = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Fs = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ps = /^'([^]*?)'?$/, Us = /''/g, $s = /[a-zA-Z]/;
function Bs(e, t, n) {
  const r = mt(), s = n?.locale ?? r.locale ?? on, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = P(e, n?.in);
  if (!Fr(i))
    throw new RangeError("Invalid time value");
  let l = t.match(Fs).map((p) => {
    const d = p[0];
    if (d === "p" || d === "P") {
      const y = Ss[d];
      return y(p, s.formatLong);
    }
    return p;
  }).join("").match(Is).map((p) => {
    if (p === "''")
      return { isToken: !1, value: "'" };
    const d = p[0];
    if (d === "'")
      return { isToken: !1, value: As(p) };
    if (hn[d])
      return { isToken: !0, value: p };
    if (d.match($s))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: p };
  });
  s.localize.preprocessor && (l = s.localize.preprocessor(i, l));
  const u = {
    firstWeekContainsDate: o,
    weekStartsOn: a,
    locale: s
  };
  return l.map((p) => {
    if (!p.isToken) return p.value;
    const d = p.value;
    (!n?.useAdditionalWeekYearTokens && Ys(d) || !n?.useAdditionalDayOfYearTokens && Ws(d)) && Es(d, t, String(e));
    const y = hn[d[0]];
    return y(i, d, s.localize, u);
  }).join("");
}
function As(e) {
  const t = e.match(Ps);
  return t ? t[1].replace(Us, "'") : e;
}
function Hs(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = n.getMonth(), o = V(n, 0);
  return o.setFullYear(r, s + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Ve(e, t) {
  return P(e, t?.in).getMonth();
}
function te(e, t) {
  return P(e, t?.in).getFullYear();
}
function Rs(e, t) {
  return +P(e) > +P(t);
}
function qs(e, t) {
  return +P(e) < +P(t);
}
function js(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function Ls(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function Zs(e, t) {
  const n = () => V(t?.in, NaN), s = Gs(e);
  let o;
  if (s.date) {
    const u = Ks(s.date, 2);
    o = Xs(u.restDateString, u.year);
  }
  if (!o || isNaN(+o)) return n();
  const a = +o;
  let i = 0, l;
  if (s.time && (i = Js(s.time), isNaN(i)))
    return n();
  if (s.timezone) {
    if (l = eo(s.timezone), isNaN(l)) return n();
  } else {
    const u = new Date(a + i), p = P(0, t?.in);
    return p.setFullYear(
      u.getUTCFullYear(),
      u.getUTCMonth(),
      u.getUTCDate()
    ), p.setHours(
      u.getUTCHours(),
      u.getUTCMinutes(),
      u.getUTCSeconds(),
      u.getUTCMilliseconds()
    ), p;
  }
  return P(a + i + l, t?.in);
}
const Mt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, zs = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, Qs = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Vs = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Gs(e) {
  const t = {}, n = e.split(Mt.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], Mt.timeZoneDelimiter.test(t.date) && (t.date = e.split(Mt.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = Mt.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function Ks(e, t) {
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
function Xs(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(zs);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = it(n[1]), o = it(n[2]) - 1, a = it(n[3]), i = it(n[4]), l = it(n[5]) - 1;
  if (r)
    return oo(t, i, l) ? to(t, i, l) : /* @__PURE__ */ new Date(NaN);
  {
    const u = /* @__PURE__ */ new Date(0);
    return !ro(t, o, a) || !so(t, s) ? /* @__PURE__ */ new Date(NaN) : (u.setUTCFullYear(t, o, Math.max(s, a)), u);
  }
}
function it(e) {
  return e ? parseInt(e) : 1;
}
function Js(e) {
  const t = e.match(Qs);
  if (!t) return NaN;
  const n = Ht(t[1]), r = Ht(t[2]), s = Ht(t[3]);
  return ao(n, r, s) ? n * $n + r * Un + s * 1e3 : NaN;
}
function Ht(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function eo(e) {
  if (e === "Z") return 0;
  const t = e.match(Vs);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return io(r, s) ? n * (r * $n + s * Un) : NaN;
}
function to(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const no = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Jn(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function ro(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (no[t] || (Jn(e) ? 29 : 28));
}
function so(e, t) {
  return t >= 1 && t <= (Jn(e) ? 366 : 365);
}
function oo(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function ao(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function io(e, t) {
  return t >= 0 && t <= 59;
}
function ft(e, t, n) {
  const r = P(e, n?.in), s = r.getFullYear(), o = r.getDate(), a = V(e, 0);
  a.setFullYear(s, t, 15), a.setHours(0, 0, 0, 0);
  const i = Hs(a);
  return r.setMonth(t, Math.min(o, i)), r;
}
function co(e, t, n) {
  const r = P(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, o = t - s;
  return ft(r, r.getMonth() + o * 3);
}
function ht(e, t, n) {
  const r = P(e, n?.in);
  return isNaN(+r) ? V(e, NaN) : (r.setFullYear(t), r);
}
const pn = 5, lo = 4;
function uo(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), o = t.addDays(s, pn * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? pn : lo;
}
function er(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function fo(e, t) {
  const n = er(e, t), r = uo(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? oe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, o) => this.overrides?.newDate ? this.overrides.newDate(r, s, o) : this.options.timeZone ? new oe(r, s, o, this.options.timeZone) : new Date(r, s, o), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : Ne(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Ye(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : nn(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : Yr(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : tn(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : Rn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Ar(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : qr(r), o = new Set(s.map((i) => this.getYear(i)));
      if (o.size === s.length)
        return s;
      const a = [];
      return o.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : fo(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : jr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Ln(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : Qn(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Rr(r), this.format = (r, s, o) => {
      const a = this.overrides?.format ? this.overrides.format(r, s, this.options) : Bs(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Vn(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ve(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : te(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Kn(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : Rs(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : qs(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Hn(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : Ir(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : js(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : Ls(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Er(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : _r(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : ft(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : ht(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : er(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ut(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : dt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : ee(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Ie(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : sn(r), this.options = { locale: on, ...t }, this.overrides = n;
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
    const a = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, a);
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
const Se = new ue();
class tr {
  constructor(t, n, r = Se) {
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
class ho {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class mo {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function go(e) {
  return S.createElement("button", { ...e });
}
function yo(e) {
  return S.createElement("span", { ...e });
}
function po(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    S.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && S.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && S.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && S.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && S.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function bo(e) {
  const { day: t, modifiers: n, ...r } = e;
  return S.createElement("td", { ...r });
}
function Do(e) {
  const { day: t, modifiers: n, ...r } = e, s = S.useRef(null);
  return S.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), S.createElement("button", { ref: s, ...r });
}
var W;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(W || (W = {}));
var Q;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(Q || (Q = {}));
var De;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(De || (De = {}));
var de;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(de || (de = {}));
function wo(e) {
  const { options: t, className: n, components: r, classNames: s, ...o } = e, a = [s[W.Dropdown], n].join(" "), i = t?.find(({ value: l }) => l === o.value);
  return S.createElement(
    "span",
    { "data-disabled": o.disabled, className: s[W.DropdownRoot] },
    S.createElement(r.Select, { className: a, ...o }, t?.map(({ value: l, label: u, disabled: p }) => S.createElement(r.Option, { key: l, value: l, disabled: p }, u))),
    S.createElement(
      "span",
      { className: s[W.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      S.createElement(r.Chevron, { orientation: "down", size: 18, className: s[W.Chevron] })
    )
  );
}
function xo(e) {
  return S.createElement("div", { ...e });
}
function vo(e) {
  return S.createElement("div", { ...e });
}
function ko(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return S.createElement("div", { ...r }, e.children);
}
function Mo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return S.createElement("div", { ...r });
}
function No(e) {
  return S.createElement("table", { ...e });
}
function So(e) {
  return S.createElement("div", { ...e });
}
const nr = xr(void 0);
function gt() {
  const e = vr(nr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Oo(e) {
  const { components: t } = gt();
  return S.createElement(t.Dropdown, { ...e });
}
function Co(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...o } = e, { components: a, classNames: i, labels: { labelPrevious: l, labelNext: u } } = gt(), p = ge((y) => {
    s && n?.(y);
  }, [s, n]), d = ge((y) => {
    r && t?.(y);
  }, [r, t]);
  return S.createElement(
    "nav",
    { ...o },
    S.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[W.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      S.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[W.Chevron], orientation: "left" })
    ),
    S.createElement(
      a.NextMonthButton,
      { type: "button", className: i[W.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": u(s), onClick: p },
      S.createElement(a.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: i[W.Chevron] })
    )
  );
}
function To(e) {
  const { components: t } = gt();
  return S.createElement(t.Button, { ...e });
}
function Wo(e) {
  return S.createElement("option", { ...e });
}
function Yo(e) {
  const { components: t } = gt();
  return S.createElement(t.Button, { ...e });
}
function Eo(e) {
  const { rootRef: t, ...n } = e;
  return S.createElement("div", { ...n, ref: t });
}
function _o(e) {
  return S.createElement("select", { ...e });
}
function Io(e) {
  const { week: t, ...n } = e;
  return S.createElement("tr", { ...n });
}
function Fo(e) {
  return S.createElement("th", { ...e });
}
function Po(e) {
  return S.createElement(
    "thead",
    { "aria-hidden": !0 },
    S.createElement("tr", { ...e })
  );
}
function Uo(e) {
  const { week: t, ...n } = e;
  return S.createElement("th", { ...n });
}
function $o(e) {
  return S.createElement("th", { ...e });
}
function Bo(e) {
  return S.createElement("tbody", { ...e });
}
function Ao(e) {
  const { components: t } = gt();
  return S.createElement(t.Dropdown, { ...e });
}
const Ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: go,
  CaptionLabel: yo,
  Chevron: po,
  Day: bo,
  DayButton: Do,
  Dropdown: wo,
  DropdownNav: xo,
  Footer: vo,
  Month: ko,
  MonthCaption: Mo,
  MonthGrid: No,
  Months: So,
  MonthsDropdown: Oo,
  Nav: Co,
  NextMonthButton: To,
  Option: Wo,
  PreviousMonthButton: Yo,
  Root: Eo,
  Select: _o,
  Week: Io,
  WeekNumber: Uo,
  WeekNumberHeader: $o,
  Weekday: Fo,
  Weekdays: Po,
  Weeks: Bo,
  YearsDropdown: Ao
}, Symbol.toStringTag, { value: "Module" }));
function Ee(e, t, n = !1, r = Se) {
  let { from: s, to: o } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return s && o ? (a(o, s) < 0 && ([s, o] = [o, s]), a(t, s) >= (n ? 1 : 0) && a(o, t) >= (n ? 1 : 0)) : !n && o ? i(o, t) : !n && s ? i(s, t) : !1;
}
function rr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function an(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function sr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function or(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ar(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ir(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function _e(e, t, n = Se) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: o, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return s(e, i);
    if (ir(i, n))
      return i.includes(e);
    if (an(i))
      return Ee(i, e, !1, n);
    if (ar(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (rr(i)) {
      const l = o(i.before, e), u = o(i.after, e), p = l > 0, d = u < 0;
      return a(i.before, i.after) ? d && p : p || d;
    }
    return sr(i) ? o(e, i.after) > 0 : or(i) ? o(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Ro(e, t, n, r, s) {
  const { disabled: o, hidden: a, modifiers: i, showOutsideDays: l, broadcastCalendar: u, today: p } = t, { isSameDay: d, isSameMonth: y, startOfMonth: m, isBefore: D, endOfMonth: N, isAfter: k } = s, h = n && m(n), w = r && N(r), b = {
    [Q.focused]: [],
    [Q.outside]: [],
    [Q.disabled]: [],
    [Q.hidden]: [],
    [Q.today]: []
  }, O = {};
  for (const g of e) {
    const { date: C, displayMonth: I } = g, $ = !!(I && !y(C, I)), A = !!(h && D(C, h)), G = !!(w && k(C, w)), Z = !!(o && _e(C, o, s)), ne = !!(a && _e(C, a, s)) || A || G || // Broadcast calendar will show outside days as default
    !u && !l && $ || u && l === !1 && $, re = d(C, p ?? s.today());
    $ && b.outside.push(g), Z && b.disabled.push(g), ne && b.hidden.push(g), re && b.today.push(g), i && Object.keys(i).forEach((fe) => {
      const he = i?.[fe];
      he && _e(C, he, s) && (O[fe] ? O[fe].push(g) : O[fe] = [g]);
    });
  }
  return (g) => {
    const C = {
      [Q.focused]: !1,
      [Q.disabled]: !1,
      [Q.hidden]: !1,
      [Q.outside]: !1,
      [Q.today]: !1
    }, I = {};
    for (const $ in b) {
      const A = b[$];
      C[$] = A.some((G) => G === g);
    }
    for (const $ in O)
      I[$] = O[$].some((A) => A === g);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...I
    };
  };
}
function qo(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [o]) => (n[o] ? s.push(n[o]) : t[Q[o]] ? s.push(t[Q[o]]) : t[De[o]] && s.push(t[De[o]]), s), [t[W.Day]]);
}
function jo(e) {
  return {
    ...Ho,
    ...e
  };
}
function Lo(e) {
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
function Zo() {
  const e = {};
  for (const t in W)
    e[W[t]] = `rdp-${W[t]}`;
  for (const t in Q)
    e[Q[t]] = `rdp-${Q[t]}`;
  for (const t in De)
    e[De[t]] = `rdp-${De[t]}`;
  for (const t in de)
    e[de[t]] = `rdp-${de[t]}`;
  return e;
}
function cr(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const zo = cr;
function Qo(e, t, n) {
  return (n ?? new ue(t)).format(e, "d");
}
function Vo(e, t = Se) {
  return t.format(e, "LLLL");
}
function Go(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccccc");
}
function Ko(e, t = Se) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Xo() {
  return "";
}
function lr(e, t = Se) {
  return t.format(e, "yyyy");
}
const Jo = lr, ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: cr,
  formatDay: Qo,
  formatMonthCaption: zo,
  formatMonthDropdown: Vo,
  formatWeekNumber: Ko,
  formatWeekNumberHeader: Xo,
  formatWeekdayName: Go,
  formatYearCaption: Jo,
  formatYearDropdown: lr
}, Symbol.toStringTag, { value: "Module" }));
function ta(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...ea,
    ...e
  };
}
function na(e, t, n, r, s) {
  const { startOfMonth: o, startOfYear: a, endOfYear: i, eachMonthOfInterval: l, getMonth: u } = s;
  return l({
    start: a(e),
    end: i(e)
  }).map((y) => {
    const m = r.formatMonthDropdown(y, s), D = u(y), N = t && y < o(t) || n && y > o(n) || !1;
    return { value: D, label: m, disabled: N };
  });
}
function ra(e, t = {}, n = {}) {
  let r = { ...t?.[W.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function sa(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), o = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(s, a);
    o.push(i);
  }
  return o;
}
function oa(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, eachYearOfInterval: i, getYear: l } = r, u = o(e), p = a(t), d = i({ start: u, end: p });
  return s && d.reverse(), d.map((y) => {
    const m = n.formatYearDropdown(y, r);
    return {
      value: l(y),
      label: m,
      disabled: !1
    };
  });
}
function dr(e, t, n, r) {
  let s = (r ?? new ue(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const aa = dr;
function ur(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const ia = ur;
function ca(e, t, n, r) {
  let s = (r ?? new ue(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function la(e) {
  return "Choose the Month";
}
function da() {
  return "";
}
function ua(e) {
  return "Go to the Next Month";
}
function fa(e) {
  return "Go to the Previous Month";
}
function ha(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccc");
}
function ma(e, t) {
  return `Week ${e}`;
}
function ga(e) {
  return "Week Number";
}
function ya(e) {
  return "Choose the Year";
}
const pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ia,
  labelDay: aa,
  labelDayButton: dr,
  labelGrid: ur,
  labelGridcell: ca,
  labelMonthDropdown: la,
  labelNav: da,
  labelNext: ua,
  labelPrevious: fa,
  labelWeekNumber: ma,
  labelWeekNumberHeader: ga,
  labelWeekday: ha,
  labelYearDropdown: ya
}, Symbol.toStringTag, { value: "Module" })), yt = (e) => e instanceof HTMLElement ? e : null, Rt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], ba = (e) => yt(e.querySelector("[data-animated-month]")), qt = (e) => yt(e.querySelector("[data-animated-caption]")), jt = (e) => yt(e.querySelector("[data-animated-weeks]")), Da = (e) => yt(e.querySelector("[data-animated-nav]")), wa = (e) => yt(e.querySelector("[data-animated-weekdays]"));
function xa(e, t, { classNames: n, months: r, focused: s, dateLib: o }) {
  const a = ke(null), i = ke(r), l = ke(!1);
  kr(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const p = o.isSameMonth(r[0].date, u[0].date), d = o.isAfter(r[0].date, u[0].date), y = d ? n[de.caption_after_enter] : n[de.caption_before_enter], m = d ? n[de.weeks_after_enter] : n[de.weeks_before_enter], D = a.current, N = e.current.cloneNode(!0);
    if (N instanceof HTMLElement ? (Rt(N).forEach((b) => {
      if (!(b instanceof HTMLElement))
        return;
      const O = ba(b);
      O && b.contains(O) && b.removeChild(O);
      const g = qt(b);
      g && g.classList.remove(y);
      const C = jt(b);
      C && C.classList.remove(m);
    }), a.current = N) : a.current = null, l.current || p || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const k = D instanceof HTMLElement ? Rt(D) : [], h = Rt(e.current);
    if (h?.every((w) => w instanceof HTMLElement) && k && k.every((w) => w instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const w = Da(e.current);
      w && (w.style.zIndex = "1"), h.forEach((b, O) => {
        const g = k[O];
        if (!g)
          return;
        b.style.position = "relative", b.style.overflow = "hidden";
        const C = qt(b);
        C && C.classList.add(y);
        const I = jt(b);
        I && I.classList.add(m);
        const $ = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), C && C.classList.remove(y), I && I.classList.remove(m), b.style.position = "", b.style.overflow = "", b.contains(g) && b.removeChild(g);
        };
        g.style.pointerEvents = "none", g.style.position = "absolute", g.style.overflow = "hidden", g.setAttribute("aria-hidden", "true");
        const A = wa(g);
        A && (A.style.opacity = "0");
        const G = qt(g);
        G && (G.classList.add(d ? n[de.caption_before_exit] : n[de.caption_after_exit]), G.addEventListener("animationend", $));
        const Z = jt(g);
        Z && Z.classList.add(d ? n[de.weeks_before_exit] : n[de.weeks_after_exit]), b.insertBefore(g, b.firstChild);
      });
    }
  });
}
function va(e, t, n, r) {
  const s = e[0], o = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: p, differenceInCalendarMonths: d, endOfBroadcastWeek: y, endOfISOWeek: m, endOfMonth: D, endOfWeek: N, isAfter: k, startOfBroadcastWeek: h, startOfISOWeek: w, startOfWeek: b } = r, O = l ? h(s, r) : a ? w(s) : b(s), g = l ? y(o) : a ? m(D(o)) : N(D(o)), C = p(g, O), I = d(o, s) + 1, $ = [];
  for (let Z = 0; Z <= C; Z++) {
    const ne = u(O, Z);
    if (t && k(ne, t))
      break;
    $.push(ne);
  }
  const G = (l ? 35 : 42) * I;
  if (i && $.length < G) {
    const Z = G - $.length;
    for (let ne = 0; ne < Z; ne++) {
      const re = u($[$.length - 1], 1);
      $.push(re);
    }
  }
  return $;
}
function ka(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((o, a) => o.concat(a.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function Ma(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, o = [];
  for (let a = 0; a < s; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    o.push(i);
  }
  return o;
}
function bn(e, t, n, r) {
  const { month: s, defaultMonth: o, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let l = s || o || a;
  const { differenceInCalendarMonths: u, addMonths: p, startOfMonth: d } = r;
  if (n && u(n, l) < i - 1) {
    const y = -1 * (i - 1);
    l = p(n, y);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function Na(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: o, endOfISOWeek: a, endOfMonth: i, endOfWeek: l, getISOWeek: u, getWeek: p, startOfBroadcastWeek: d, startOfISOWeek: y, startOfWeek: m } = r, D = e.reduce((N, k) => {
    const h = n.broadcastCalendar ? d(k, r) : n.ISOWeek ? y(k) : m(k), w = n.broadcastCalendar ? o(k) : n.ISOWeek ? a(i(k)) : l(i(k)), b = t.filter((I) => I >= h && I <= w), O = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && b.length < O) {
      const I = t.filter(($) => {
        const A = O - b.length;
        return $ > w && $ <= s(w, A);
      });
      b.push(...I);
    }
    const g = b.reduce((I, $) => {
      const A = n.ISOWeek ? u($) : p($), G = I.find((ne) => ne.weekNumber === A), Z = new tr($, k, r);
      return G ? G.days.push(Z) : I.push(new mo(A, [Z])), I;
    }, []), C = new ho(k, g);
    return N.push(C), N;
  }, []);
  return n.reverseMonths ? D.reverse() : D;
}
function Sa(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: o, startOfMonth: a, endOfMonth: i, addYears: l, endOfYear: u, newDate: p, today: d } = t, { fromYear: y, toYear: m, fromMonth: D, toMonth: N } = e;
  !n && D && (n = D), !n && y && (n = t.newDate(y, 0, 1)), !r && N && (r = N), !r && m && (r = p(m, 11, 31));
  const k = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : y ? n = p(y, 0, 1) : !n && k && (n = s(l(e.today ?? d(), -100))), r ? r = i(r) : m ? r = p(m, 11, 31) : !r && k && (r = u(e.today ?? d())), [
    n && o(n),
    r && o(r)
  ];
}
function Oa(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = s ? o : 1, p = a(e);
  if (!t)
    return i(p, u);
  if (!(l(t, e) < o))
    return i(p, u);
}
function Ca(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: l } = r, u = s ? o ?? 1 : 1, p = a(e);
  if (!t)
    return i(p, -u);
  if (!(l(p, t) <= 0))
    return i(p, -u);
}
function Ta(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Nt(e, t) {
  const [n, r] = B(e);
  return [t === void 0 ? n : t, r];
}
function Wa(e, t) {
  const [n, r] = Sa(e, t), { startOfMonth: s, endOfMonth: o } = t, a = bn(e, n, r, t), [i, l] = Nt(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  We(() => {
    const C = bn(e, n, r, t);
    l(C);
  }, [e.timeZone]);
  const u = Ma(i, r, e, t), p = va(u, e.endMonth ? o(e.endMonth) : void 0, e, t), d = Na(u, p, e, t), y = Ta(d), m = ka(d), D = Ca(i, n, e, t), N = Oa(i, r, e, t), { disableNavigation: k, onMonthChange: h } = e, w = (C) => y.some((I) => I.days.some(($) => $.isEqualTo(C))), b = (C) => {
    if (k)
      return;
    let I = s(C);
    n && I < s(n) && (I = s(n)), r && I > s(r) && (I = s(r)), l(I), h?.(I);
  };
  return {
    months: d,
    weeks: y,
    days: m,
    navStart: n,
    navEnd: r,
    previousMonth: D,
    nextMonth: N,
    goToMonth: b,
    goToDay: (C) => {
      w(C) || b(C.date);
    }
  };
}
var ve;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(ve || (ve = {}));
function Dn(e) {
  return !e[Q.disabled] && !e[Q.hidden] && !e[Q.outside];
}
function Ya(e, t, n, r) {
  let s, o = -1;
  for (const a of e) {
    const i = t(a);
    Dn(i) && (i[Q.focused] && o < ve.FocusedModifier ? (s = a, o = ve.FocusedModifier) : r?.isEqualTo(a) && o < ve.LastFocused ? (s = a, o = ve.LastFocused) : n(a.date) && o < ve.Selected ? (s = a, o = ve.Selected) : i[Q.today] && o < ve.Today && (s = a, o = ve.Today));
  }
  return s || (s = e.find((a) => Dn(t(a)))), s;
}
function Ea(e, t, n, r, s, o, a) {
  const { ISOWeek: i, broadcastCalendar: l } = o, { addDays: u, addMonths: p, addWeeks: d, addYears: y, endOfBroadcastWeek: m, endOfISOWeek: D, endOfWeek: N, max: k, min: h, startOfBroadcastWeek: w, startOfISOWeek: b, startOfWeek: O } = a;
  let C = {
    day: u,
    week: d,
    month: p,
    year: y,
    startOfWeek: (I) => l ? w(I, a) : i ? b(I) : O(I),
    endOfWeek: (I) => l ? m(I) : i ? D(I) : N(I)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = k([r, C]) : t === "after" && s && (C = h([s, C])), C;
}
function fr(e, t, n, r, s, o, a, i = 0) {
  if (i > 365)
    return;
  const l = Ea(e, t, n.date, r, s, o, a), u = !!(o.disabled && _e(l, o.disabled, a)), p = !!(o.hidden && _e(l, o.hidden, a)), d = l, y = new tr(l, d, a);
  return !u && !p ? y : fr(e, t, y, r, s, o, a, i + 1);
}
function _a(e, t, n, r, s) {
  const { autoFocus: o } = e, [a, i] = B(), l = Ya(t.days, n, r || (() => !1), a), [u, p] = B(o ? l : void 0);
  return {
    isFocusTarget: (N) => !!l?.isEqualTo(N),
    setFocused: p,
    focused: u,
    blur: () => {
      i(u), p(void 0);
    },
    moveFocus: (N, k) => {
      if (!u)
        return;
      const h = fr(N, k, u, t.navStart, t.navEnd, e, s);
      h && (e.disableNavigation && !t.days.some((b) => b.isEqualTo(h)) || (t.goToDay(h), p(h)));
    }
  };
}
function Ia(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, a] = Nt(n, s ? n : void 0), i = s ? n : o, { isSameDay: l } = t, u = (m) => i?.some((D) => l(D, m)) ?? !1, { min: p, max: d } = e;
  return {
    selected: i,
    select: (m, D, N) => {
      let k = [...i ?? []];
      if (u(m)) {
        if (i?.length === p || r && i?.length === 1)
          return;
        k = i?.filter((h) => !l(h, m));
      } else
        i?.length === d ? k = [m] : k = [...k, m];
      return s || a(k), s?.(k, m, D, N), k;
    },
    isSelected: u
  };
}
function Fa(e, t, n = 0, r = 0, s = !1, o = Se) {
  const { from: a, to: i } = t || {}, { isSameDay: l, isAfter: u, isBefore: p } = o;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    l(a, e) ? n === 0 ? d = { from: a, to: e } : s ? d = { from: a, to: void 0 } : d = void 0 : p(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (l(a, e) && l(i, e))
      s ? d = { from: a, to: i } : d = void 0;
    else if (l(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (l(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (p(e, a))
      d = { from: e, to: i };
    else if (u(e, a))
      d = { from: a, to: e };
    else if (u(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const y = o.differenceInCalendarDays(d.to, d.from);
    r > 0 && y > r ? d = { from: e, to: void 0 } : n > 1 && y < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Pa(e, t, n = Se) {
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
function wn(e, t, n = Se) {
  return Ee(e, t.from, !1, n) || Ee(e, t.to, !1, n) || Ee(t, e.from, !1, n) || Ee(t, e.to, !1, n);
}
function Ua(e, t, n = Se) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ee(e, i, !1, n) : ir(i, n) ? i.some((l) => Ee(e, l, !1, n)) : an(i) ? i.from && i.to ? wn(e, { from: i.from, to: i.to }, n) : !1 : ar(i) ? Pa(e, i.dayOfWeek, n) : rr(i) ? n.isAfter(i.before, i.after) ? wn(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : _e(e.from, i, n) || _e(e.to, i, n) : sr(i) || or(i) ? _e(e.from, i, n) || _e(e.to, i, n) : !1))
    return !0;
  const a = r.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= l; u++) {
      if (a.some((p) => p(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function $a(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: o, onSelect: a } = e, [i, l] = Nt(s, a ? s : void 0), u = a ? s : i;
  return {
    selected: u,
    select: (y, m, D) => {
      const { min: N, max: k } = e, h = y ? Fa(y, u, N, k, o, t) : void 0;
      return r && n && h?.from && h.to && Ua({ from: h.from, to: h.to }, n, t) && (h.from = y, h.to = void 0), a || l(h), a?.(h, y, m, D), h;
    },
    isSelected: (y) => u && Ee(u, y, !1, t)
  };
}
function Ba(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, a] = Nt(n, s ? n : void 0), i = s ? n : o, { isSameDay: l } = t;
  return {
    selected: i,
    select: (d, y, m) => {
      let D = d;
      return !r && i && i && l(d, i) && (D = void 0), s || a(D), s?.(D, d, y, m), D;
    },
    isSelected: (d) => i ? l(i, d) : !1
  };
}
function Aa(e, t) {
  const n = Ba(e, t), r = Ia(e, t), s = $a(e, t);
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
function Ae(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new oe(t.today, t.timeZone)), t.month && (t.month = new oe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new oe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new oe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new oe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new oe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((M) => new oe(M, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new oe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new oe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: o, locale: a, classNames: i } = $t(() => {
    const M = { ...on, ...t.locale };
    return {
      dateLib: new ue({
        locale: M,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: jo(t.components),
      formatters: ta(t.formatters),
      labels: { ...pa, ...t.labels },
      locale: M,
      classNames: { ...Zo(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: p, numberOfMonths: d = 1, onDayBlur: y, onDayClick: m, onDayFocus: D, onDayKeyDown: N, onDayMouseEnter: k, onDayMouseLeave: h, onNextClick: w, onPrevClick: b, showWeekNumber: O, styles: g } = t, { formatCaption: C, formatDay: I, formatMonthDropdown: $, formatWeekNumber: A, formatWeekNumberHeader: G, formatWeekdayName: Z, formatYearDropdown: ne } = r, re = Wa(t, o), { days: fe, months: he, navStart: Oe, navEnd: Re, previousMonth: J, nextMonth: ce, goToMonth: L } = re, K = Ro(fe, t, Oe, Re, o), { isSelected: ye, select: we, selected: Ce } = Aa(t, o) ?? {}, { blur: Te, focused: Pe, isFocusTarget: Ue, moveFocus: qe, setFocused: pe } = _a(t, re, K, ye ?? (() => !1), o), { labelDayButton: Ot, labelGridcell: Ct, labelGrid: et, labelMonthDropdown: Tt, labelNav: pt, labelPrevious: Wt, labelNext: Yt, labelWeekday: Et, labelWeekNumber: _t, labelWeekNumberHeader: It, labelYearDropdown: tt } = s, Ft = $t(() => sa(o, t.ISOWeek), [o, t.ISOWeek]), be = u !== void 0 || m !== void 0, nt = ge(() => {
    J && (L(J), b?.(J));
  }, [J, L, b]), Ge = ge(() => {
    ce && (L(ce), w?.(ce));
  }, [L, ce, w]), bt = ge((M, F) => (T) => {
    T.preventDefault(), T.stopPropagation(), pe(M), we?.(M.date, F, T), m?.(M.date, F, T);
  }, [we, m, pe]), $e = ge((M, F) => (T) => {
    pe(M), D?.(M.date, F, T);
  }, [D, pe]), Dt = ge((M, F) => (T) => {
    Te(), y?.(M.date, F, T);
  }, [Te, y]), je = ge((M, F) => (T) => {
    const _ = {
      ArrowLeft: [
        T.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        T.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [T.shiftKey ? "year" : "week", "after"],
      ArrowUp: [T.shiftKey ? "year" : "week", "before"],
      PageUp: [T.shiftKey ? "year" : "month", "before"],
      PageDown: [T.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (_[T.key]) {
      T.preventDefault(), T.stopPropagation();
      const [E, Y] = _[T.key];
      qe(E, Y);
    }
    N?.(M.date, F, T);
  }, [qe, N, t.dir]), Pt = ge((M, F) => (T) => {
    k?.(M.date, F, T);
  }, [k]), Ut = ge((M, F) => (T) => {
    h?.(M.date, F, T);
  }, [h]), wt = ge((M) => (F) => {
    const T = Number(F.target.value), _ = o.setMonth(o.startOfMonth(M), T);
    L(_);
  }, [o, L]), xt = ge((M) => (F) => {
    const T = Number(F.target.value), _ = o.setYear(o.startOfMonth(M), T);
    L(_);
  }, [o, L]), { className: Le, style: rt } = $t(() => ({
    className: [i[W.Root], t.className].filter(Boolean).join(" "),
    style: { ...g?.[W.Root], ...t.style }
  }), [i, t.className, t.style, g]), c = Lo(t), x = ke(null);
  xa(x, !!t.animate, {
    classNames: i,
    months: he,
    focused: Pe,
    dateLib: o
  });
  const H = {
    dayPickerProps: t,
    selected: Ce,
    select: we,
    isSelected: ye,
    months: he,
    nextMonth: ce,
    previousMonth: J,
    goToMonth: L,
    getModifiers: K,
    components: n,
    classNames: i,
    styles: g,
    labels: s,
    formatters: r
  };
  return S.createElement(
    nr.Provider,
    { value: H },
    S.createElement(
      n.Root,
      { rootRef: t.animate ? x : void 0, className: Le, style: rt, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...c },
      S.createElement(
        n.Months,
        { className: i[W.Months], style: g?.[W.Months] },
        !t.hideNavigation && !p && S.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[W.Nav], style: g?.[W.Nav], "aria-label": pt(), onPreviousClick: nt, onNextClick: Ge, previousMonth: J, nextMonth: ce }),
        he.map((M, F) => S.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[W.Month],
            style: g?.[W.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: F,
            displayIndex: F,
            calendarMonth: M
          },
          p === "around" && !t.hideNavigation && F === 0 && S.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[W.PreviousMonthButton], tabIndex: J ? void 0 : -1, "aria-disabled": J ? void 0 : !0, "aria-label": Wt(J), onClick: nt, "data-animated-button": t.animate ? "true" : void 0 },
            S.createElement(n.Chevron, { disabled: J ? void 0 : !0, className: i[W.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          S.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[W.MonthCaption], style: g?.[W.MonthCaption], calendarMonth: M, displayIndex: F }, l?.startsWith("dropdown") ? S.createElement(
            n.DropdownNav,
            { className: i[W.Dropdowns], style: g?.[W.Dropdowns] },
            (() => {
              const T = l === "dropdown" || l === "dropdown-months" ? S.createElement(n.MonthsDropdown, { key: "month", className: i[W.MonthsDropdown], "aria-label": Tt(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: wt(M.date), options: na(M.date, Oe, Re, r, o), style: g?.[W.Dropdown], value: o.getMonth(M.date) }) : S.createElement("span", { key: "month" }, $(M.date, o)), _ = l === "dropdown" || l === "dropdown-years" ? S.createElement(n.YearsDropdown, { key: "year", className: i[W.YearsDropdown], "aria-label": tt(o.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: xt(M.date), options: oa(Oe, Re, r, o, !!t.reverseYears), style: g?.[W.Dropdown], value: o.getYear(M.date) }) : S.createElement("span", { key: "year" }, ne(M.date, o));
              return o.getMonthYearOrder() === "year-first" ? [_, T] : [T, _];
            })(),
            S.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, C(M.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            S.createElement(n.CaptionLabel, { className: i[W.CaptionLabel], role: "status", "aria-live": "polite" }, C(M.date, o.options, o))
          )),
          p === "around" && !t.hideNavigation && F === d - 1 && S.createElement(
            n.NextMonthButton,
            { type: "button", className: i[W.NextMonthButton], tabIndex: ce ? void 0 : -1, "aria-disabled": ce ? void 0 : !0, "aria-label": Yt(ce), onClick: Ge, "data-animated-button": t.animate ? "true" : void 0 },
            S.createElement(n.Chevron, { disabled: ce ? void 0 : !0, className: i[W.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          F === d - 1 && p === "after" && !t.hideNavigation && S.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[W.Nav], style: g?.[W.Nav], "aria-label": pt(), onPreviousClick: nt, onNextClick: Ge, previousMonth: J, nextMonth: ce }),
          S.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": et(M.date, o.options, o) || void 0, className: i[W.MonthGrid], style: g?.[W.MonthGrid] },
            !t.hideWeekdays && S.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[W.Weekdays], style: g?.[W.Weekdays] },
              O && S.createElement(n.WeekNumberHeader, { "aria-label": It(o.options), className: i[W.WeekNumberHeader], style: g?.[W.WeekNumberHeader], scope: "col" }, G()),
              Ft.map((T) => S.createElement(n.Weekday, { "aria-label": Et(T, o.options, o), className: i[W.Weekday], key: String(T), style: g?.[W.Weekday], scope: "col" }, Z(T, o.options, o)))
            ),
            S.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[W.Weeks], style: g?.[W.Weeks] }, M.weeks.map((T) => S.createElement(
              n.Week,
              { className: i[W.Week], key: T.weekNumber, style: g?.[W.Week], week: T },
              O && // biome-ignore lint/a11y/useSemanticElements: react component
              S.createElement(n.WeekNumber, { week: T, style: g?.[W.WeekNumber], "aria-label": _t(T.weekNumber, {
                locale: a
              }), className: i[W.WeekNumber], scope: "row", role: "rowheader" }, A(T.weekNumber, o)),
              T.days.map((_) => {
                const { date: E } = _, Y = K(_);
                if (Y[Q.focused] = !Y.hidden && !!Pe?.isEqualTo(_), Y[De.selected] = ye?.(E) || Y.selected, an(Ce)) {
                  const { from: se, to: q } = Ce;
                  Y[De.range_start] = !!(se && q && o.isSameDay(E, se)), Y[De.range_end] = !!(se && q && o.isSameDay(E, q)), Y[De.range_middle] = Ee(Ce, E, !0, o);
                }
                const le = ra(Y, g, t.modifiersStyles), ie = qo(Y, i, t.modifiersClassNames), z = !be && !Y.hidden ? Ct(E, Y, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  S.createElement(n.Day, { key: `${o.format(E, "yyyy-MM-dd")}_${o.format(_.displayMonth, "yyyy-MM")}`, day: _, modifiers: Y, className: ie.join(" "), style: le, role: "gridcell", "aria-selected": Y.selected || void 0, "aria-label": z, "data-day": o.format(E, "yyyy-MM-dd"), "data-month": _.outside ? o.format(E, "yyyy-MM") : void 0, "data-selected": Y.selected || void 0, "data-disabled": Y.disabled || void 0, "data-hidden": Y.hidden || void 0, "data-outside": _.outside || void 0, "data-focused": Y.focused || void 0, "data-today": Y.today || void 0 }, !Y.hidden && be ? S.createElement(n.DayButton, { className: i[W.DayButton], style: g?.[W.DayButton], type: "button", day: _, modifiers: Y, disabled: Y.disabled || void 0, tabIndex: Ue(_) ? 0 : -1, "aria-label": Ot(E, Y, o.options, o), onClick: bt(_, Y), onBlur: Dt(_, Y), onFocus: $e(_, Y), onKeyDown: je(_, Y), onMouseEnter: Pt(_, Y), onMouseLeave: Ut(_, Y) }, I(E, o.options, o)) : !Y.hidden && I(_.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      S.createElement(n.Footer, { className: i[W.Footer], style: g?.[W.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ha = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ra = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), xn = (e) => {
  const t = Ra(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, hr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), qa = (e) => {
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
var ja = {
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
const La = In(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: o,
    iconNode: a,
    ...i
  }, l) => Kt(
    "svg",
    {
      ref: l,
      ...ja,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: hr("lucide", s),
      ...!o && !qa(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...a.map(([u, p]) => Kt(u, p)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = (e, t) => {
  const n = In(
    ({ className: r, ...s }, o) => Kt(La, {
      ref: o,
      iconNode: t,
      className: hr(
        `lucide-${Ha(xn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = xn(e), n;
};
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Za = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], za = Fe("bookmark", Za);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qa = [
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
], Lt = Fe("calendar-days", Qa);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Va = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ga = Fe("chevron-down", Va);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ka = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], mr = Fe("chevron-left", Ka);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xa = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], gr = Fe("chevron-right", Xa);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ja = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], ei = Fe("circle-question-mark", Ja);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ti = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ni = Fe("plus", ti);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ri = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], si = Fe("trash-2", ri);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oi = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], vn = Fe("x", oi);
function ai(e, t) {
  const n = ui(t);
  return "formatToParts" in n ? ci(n, e) : li(n, e);
}
const ii = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function ci(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const o = ii[n[s].type];
      o !== void 0 && (r[o] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function li(e, t) {
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
const Zt = {}, kn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), di = kn === "06/25/2014, 00:00:00" || kn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function ui(e) {
  return Zt[e] || (Zt[e] = di ? new Intl.DateTimeFormat("en-US", {
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
  })), Zt[e];
}
function yr(e, t, n, r, s, o, a) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, s, o, a), i;
}
const Mn = 36e5, fi = 6e4, zt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function pr(e, t, n) {
  if (!e)
    return 0;
  let r = zt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, o;
  if (r = zt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), Nn(s) ? -(s * Mn) : NaN;
  if (r = zt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const a = parseInt(r[3], 10);
    return Nn(s, a) ? (o = Math.abs(s) * Mn + a * fi, r[1] === "+" ? -o : o) : NaN;
  }
  if (gi(e)) {
    t = new Date(t || Date.now());
    const a = n ? t : hi(t), i = Jt(a, e);
    return -(n ? i : mi(t, i, e));
  }
  return NaN;
}
function hi(e) {
  return yr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function Jt(e, t) {
  const n = ai(e, t), r = yr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const o = s % 1e3;
  return s -= o >= 0 ? o : 1e3 + o, r - s;
}
function mi(e, t, n) {
  let s = e.getTime() - t;
  const o = Jt(new Date(s), n);
  if (t === o)
    return t;
  s -= o - t;
  const a = Jt(new Date(s), n);
  return o === a ? o : Math.max(o, a);
}
function Nn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Sn = {};
function gi(e) {
  if (Sn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Sn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function On(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const yi = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Qt = 36e5, Cn = 6e4, pi = 2, ae = {
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
  timeZone: yi
};
function bi(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? pi : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = Di(e), { year: s, restDateString: o } = wi(r.date, n), a = xi(o, s);
  if (a === null || isNaN(a.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (a) {
    const i = a.getTime();
    let l = 0, u;
    if (r.time && (l = vi(r.time), l === null || isNaN(l)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (u = pr(r.timeZone || t.timeZone, new Date(i + l)), isNaN(u))
        return /* @__PURE__ */ new Date(NaN);
    } else
      u = On(new Date(i + l)), u = On(new Date(i + l + u));
    return new Date(i + l + u);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Di(e) {
  const t = {};
  let n = ae.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = ae.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = ae.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function wi(e, t) {
  if (e) {
    const n = ae.YYY[t], r = ae.YYYYY[t];
    let s = ae.YYYY.exec(e) || r.exec(e);
    if (s) {
      const o = s[1];
      return {
        year: parseInt(o, 10),
        restDateString: e.slice(o.length)
      };
    }
    if (s = ae.YY.exec(e) || n.exec(e), s) {
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
function xi(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let o = ae.MM.exec(e);
  if (o)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1, Wn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (o = ae.DDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0);
    const a = parseInt(o[1], 10);
    return Ni(t, a) ? (n.setUTCFullYear(t, 0, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ae.MMDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1;
    const a = parseInt(o[2], 10);
    return Wn(t, r, a) ? (n.setUTCFullYear(t, r, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ae.Www.exec(e), o)
    return s = parseInt(o[1], 10) - 1, Yn(s) ? Tn(t, s) : /* @__PURE__ */ new Date(NaN);
  if (o = ae.WwwD.exec(e), o) {
    s = parseInt(o[1], 10) - 1;
    const a = parseInt(o[2], 10) - 1;
    return Yn(s, a) ? Tn(t, s, a) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function vi(e) {
  let t, n, r = ae.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Vt(t) ? t % 24 * Qt : NaN;
  if (r = ae.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Vt(t, n) ? t % 24 * Qt + n * Cn : NaN;
  if (r = ae.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return Vt(t, n, s) ? t % 24 * Qt + n * Cn + s * 1e3 : NaN;
  }
  return null;
}
function Tn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const ki = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Mi = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function br(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Wn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = br(e);
    if (r && n > Mi[t] || !r && n > ki[t])
      return !1;
  }
  return !0;
}
function Ni(e, t) {
  if (t < 1)
    return !1;
  const n = br(e);
  return !(n && t > 366 || !n && t > 365);
}
function Yn(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Vt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function Si(e, t, n) {
  e = bi(e, n);
  const r = pr(t, e, !0), s = new Date(e.getTime() - r), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), o.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), o;
}
const en = 0, Zi = !1, Xe = !0, zi = "firstFullWeek", Oi = "UTC";
function U(e) {
  const t = Zs(`${e}T00:00:00.000Z`);
  return Si(t, Oi);
}
function j(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function St() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ci(e, t, n) {
  const r = U(e);
  let s;
  switch (t) {
    case "day":
      s = Ne(r, n);
      break;
    case "week":
      s = nn(r, n);
      break;
    case "month":
      s = Ye(r, n);
      break;
    case "quarter":
      s = An(r, n);
      break;
    default:
      s = r;
  }
  return j(s);
}
function Ti(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = U(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Ne(s, 1), r.includes(s.getDay()) || o++;
    return j(s);
  } else
    return Ci(e, t, n - 1);
}
function Wi(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = U(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Ne(s, -1), r.includes(s.getDay()) || o++;
    return j(s);
  } else {
    const s = U(e);
    let o;
    switch (t) {
      case "day":
        o = Ne(s, -(n - 1));
        break;
      case "week":
        o = nn(s, -(n - 1));
        break;
      case "month":
        o = Ye(s, -(n - 1));
        break;
      case "quarter":
        o = An(s, -(n - 1));
        break;
      default:
        o = s;
    }
    return j(o);
  }
}
function Dr(e, t, n, r) {
  const s = U(e), o = U(t);
  if (s > o) return 0;
  if (n === "day" && r.length > 0)
    return zn({ start: s, end: o }).filter(
      (l) => !r.includes(l.getDay())
    ).length;
  switch (n) {
    case "day":
      return qn(o, s) + 1;
    case "week":
      return Br(o, s) + 1;
    case "month":
      return Zn(o, s) + 1;
    case "quarter":
      return $r(o, s) + 1;
    default:
      return 1;
  }
}
function Yi(e, t, n) {
  const r = U(e), s = U(t);
  if (r > s) return [];
  const o = zn({ start: r, end: s });
  return n.length === 0 ? o.map(j) : o.filter((a) => !n.includes(a.getDay())).map(j);
}
function En(e, t, n = "day", r = [], s, o, a, i, l) {
  const u = Dr(
    e,
    t,
    n,
    r
  ), p = Yi(
    e,
    t,
    r
  ), d = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: u,
    excludedWeekdays: r,
    includedDatesUtc: p
  };
  return s !== void 0 && (d.excludeEnabled = s), o && (d.excludeFilterTypes = o), a && (d.excludedSpecificDates = a), i && (d.excludedSavedDates = i), l && (d.excludedDateRanges = l), d;
}
function Qi(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function Vi(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, s] = t, o = parseInt(r, 10), a = parseInt(n, 10), i = parseInt(s, 10);
  if (isNaN(o) || isNaN(a) || isNaN(i) || o < 1 || o > 12 || a < 1 || a > 31 || i < 1900 || i > 2100)
    return null;
  const l = o.toString().padStart(2, "0"), u = a.toString().padStart(2, "0");
  return `${i}-${l}-${u}`;
}
function Ei(e) {
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
function _i() {
  const e = St(), t = U(e);
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
        const n = j(Ne(t, -1));
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
          weekStartsOn: en
        }), r = Ne(n, 6);
        return {
          startDateUtc: j(n),
          endDateUtc: j(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = ee(t);
        return {
          startDateUtc: j(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = sn(t);
        return {
          startDateUtc: j(n),
          endDateUtc: e
        };
      }
    }
  };
}
const Ii = "DateRangePickerDB", Fi = 1, xe = "savedDateRanges";
class Pi {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(Ii, Fi);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (s) => {
          const o = s.target.result;
          o.objectStoreNames.contains(xe) || o.createObjectStore(xe, {
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
      const i = this.db.transaction([xe], "readwrite").objectStore(xe).put({
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
      const a = this.db.transaction([xe], "readonly").objectStore(xe).get(t);
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
      const a = this.db.transaction([xe], "readwrite").objectStore(xe).delete(t);
      a.onerror = () => r(a.error), a.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const o = this.db.transaction([xe], "readwrite").objectStore(xe).clear();
      o.onerror = () => n(o.error), o.onsuccess = () => t();
    });
  }
}
const Je = new Pi(), Gt = "savedDateRanges";
function Ui({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n
}) {
  const [r, s] = B([]), [o, a] = B(!1), [i, l] = B(""), [u, p] = B(!1);
  We(() => {
    (async () => {
      await Je.init();
      const w = await Je.getData(Gt);
      w && s(w);
    })();
  }, []);
  const d = _i(), y = (h) => {
    const { startDateUtc: w, endDateUtc: b } = h();
    e(w, b);
  }, m = async () => {
    if (i.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const h = {
      id: `saved-${Date.now()}`,
      label: i.trim(),
      selection: n,
      createdAt: Date.now()
    }, w = [...r, h];
    s(w), await Je.saveData(Gt, w), l(""), a(!1);
  }, D = async (h) => {
    const w = r.filter((b) => b.id !== h);
    s(w), await Je.saveData(Gt, w);
  }, N = (h) => {
    t ? t(h.selection) : e(h.selection.startDateUtc, h.selection.endDateUtc);
  }, k = (h, w) => {
    const b = (O) => (/* @__PURE__ */ new Date(O + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return h === w ? b(h) : `${b(h)} - ${b(w)}`;
  };
  return /* @__PURE__ */ v("div", { className: "w-72 bg-white border-r border-gray-200 py-4 flex flex-col ", children: [
    /* @__PURE__ */ v("div", { className: "mb-3 px-4 flex-shrink-0", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
      /* @__PURE__ */ f("div", { className: "", children: Object.values(d).map((h) => {
        const { startDateUtc: w, endDateUtc: b } = h.getValue();
        return /* @__PURE__ */ v(
          "button",
          {
            onClick: () => y(h.getValue),
            className: "w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all",
            children: [
              /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900", children: h.label }),
              /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed mt-0.5", children: k(w, b) })
            ]
          },
          h.label
        );
      }) })
    ] }),
    /* @__PURE__ */ v("div", { className: "flex flex-col flex-1 min-h-0 border-t border-gray-200 px-4", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2 flex-shrink-0 mt-3", children: /* @__PURE__ */ v("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Saved Dates" }),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => p(!u),
            className: "text-gray-400 hover:text-gray-600",
            children: /* @__PURE__ */ f(ei, { className: "w-3 h-3" })
          }
        )
      ] }) }),
      u && /* @__PURE__ */ f("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
      r.length === 0 ? /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ f("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: r.map((h) => /* @__PURE__ */ f(
        "div",
        {
          className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
          children: /* @__PURE__ */ v("div", { className: "flex items-start justify-between px-3 py-2", children: [
            /* @__PURE__ */ v(
              "button",
              {
                onClick: () => N(h),
                className: "flex-1 text-left",
                children: [
                  /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900 mb-1", children: h.label }),
                  /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed", children: k(
                    h.selection.startDateUtc,
                    h.selection.endDateUtc
                  ) }),
                  (h.selection.excludedWeekdays?.length > 0 || h.selection.excludedSpecificDates && h.selection.excludedSpecificDates.length > 0 || h.selection.excludedSavedDates && h.selection.excludedSavedDates.length > 0 || h.selection.excludedDateRanges && h.selection.excludedDateRanges.length > 0) && /* @__PURE__ */ v("div", { className: "text-xs text-gray-500 mt-1 space-y-0.5", children: [
                    h.selection.excludedWeekdays?.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Days:",
                      " ",
                      h.selection.excludedWeekdays.map(
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
                    h.selection.excludedSpecificDates && h.selection.excludedSpecificDates.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Specific Dates:",
                      " ",
                      h.selection.excludedSpecificDates.length
                    ] }),
                    h.selection.excludedSavedDates && h.selection.excludedSavedDates.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Saved: ",
                      h.selection.excludedSavedDates.length
                    ] }),
                    h.selection.excludedDateRanges && h.selection.excludedDateRanges.length > 0 && /* @__PURE__ */ v("div", { children: [
                      "Ranges:",
                      " ",
                      h.selection.excludedDateRanges.length
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ f(
              "button",
              {
                onClick: () => D(h.id),
                className: "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2",
                children: /* @__PURE__ */ f(si, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        },
        h.id
      )) }),
      /* @__PURE__ */ v(
        "button",
        {
          onClick: () => a(!0),
          className: "w-full flex-shrink-0 px-3 py-2 text-[#003DB8] opacity-50 hover:opacity-100 text-sm font-medium rounded-mdtransition-colors flex items-center justify-center gap-2 mt-auto",
          children: [
            /* @__PURE__ */ f(ni, { className: "w-4 h-4" }),
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
          onClick: () => a(!1)
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
              value: i,
              onChange: (h) => l(h.target.value),
              placeholder: "e.g., Q1 2025, Holiday Period",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              autoFocus: !0,
              onKeyDown: (h) => {
                h.key === "Enter" && m();
              }
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("strong", { children: "Range:" }),
            " ",
            k(
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
              (h) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][h]
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
              onClick: () => a(!1),
              className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ f(
            "button",
            {
              onClick: m,
              className: "px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors",
              children: "Save"
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
const $i = [
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
function Bi({
  selectedRange: e,
  onSelect: t
}) {
  const n = te(e.from), [r, s] = B(n);
  U(St());
  const o = (d, y) => {
    const m = ft(ht(/* @__PURE__ */ new Date(), d), y);
    if (!e.from) {
      t({ from: m, to: m });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      m < e.from ? t({ from: m, to: e.from }) : t({ from: e.from, to: m });
      return;
    }
    t({ from: m, to: m });
  }, a = (d, y) => {
    if (!e.from || !e.to) return !1;
    const m = Ve(e.from), D = te(e.from), N = Ve(e.to), k = te(e.to), h = d * 12 + y, w = D * 12 + m, b = k * 12 + N;
    return h >= w && h <= b;
  }, i = (d, y) => {
    if (!e.from) return !1;
    const m = Ve(e.from), D = te(e.from);
    return d === D && y === m;
  }, l = (d, y) => {
    if (!e.to) return !1;
    const m = Ve(e.to), D = te(e.to);
    return d === D && y === m;
  }, u = (d, y) => !1, p = (d) => /* @__PURE__ */ v("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-4 gap-2", children: $i.map((y, m) => {
      const D = a(d, m), N = i(d, m), k = l(d, m), h = N || k, w = u();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !w && o(d, m),
          disabled: w,
          className: `
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${w ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : h ? "bg-[#003DB8] text-white" : D ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: y
        },
        y
      );
    }) })
  ] }, d);
  return /* @__PURE__ */ v("div", { className: "w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(mr, { className: "w-5 h-5" })
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
          children: /* @__PURE__ */ f(gr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "flex gap-8", children: [
      p(r),
      p(r + 1)
    ] })
  ] });
}
const Ai = ["Q1", "Q2", "Q3", "Q4"];
function Hi({
  selectedRange: e,
  onSelect: t
}) {
  const n = te(e.from), [r, s] = B(n);
  U(St());
  const o = (d, y) => {
    const m = Hr(
      co(ht(/* @__PURE__ */ new Date(), d), y + 1)
    );
    if (!e.from) {
      t({ from: m, to: m });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      m < e.from ? t({ from: m, to: e.from }) : t({ from: e.from, to: m });
      return;
    }
    t({ from: m, to: m });
  }, a = (d, y) => {
    if (!e.from || !e.to) return !1;
    const m = kt(e.from) - 1, D = te(e.from), N = kt(e.to) - 1, k = te(e.to), h = d * 4 + y, w = D * 4 + m, b = k * 4 + N;
    return h >= w && h <= b;
  }, i = (d, y) => {
    if (!e.from) return !1;
    const m = kt(e.from) - 1, D = te(e.from);
    return d === D && y === m;
  }, l = (d, y) => {
    if (!e.to) return !1;
    const m = kt(e.to) - 1, D = te(e.to);
    return d === D && y === m;
  }, u = (d, y) => !1, p = (d) => /* @__PURE__ */ v("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-2 gap-3", children: Ai.map((y, m) => {
      const D = a(d, m), N = i(d, m), k = l(d, m), h = N || k, w = u();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !w && o(d, m),
          disabled: w,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${w ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : h ? "bg-blue-600 text-white" : D ? "bg-blue-100 text-blue-900" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: y
        },
        y
      );
    }) })
  ] }, d);
  return /* @__PURE__ */ v("div", { className: "w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ f(mr, { className: "w-5 h-5" })
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
          children: /* @__PURE__ */ f(gr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "flex gap-8", children: [
      p(r),
      p(r + 1)
    ] })
  ] });
}
function _n({
  value: e,
  onChange: t,
  placeholder: n = "DD/MM/YYYY",
  className: r = ""
}) {
  const s = ke(null), [o, a] = B(""), i = ke(0), l = (m) => {
    if (!m || m.length !== 10) return "";
    const [D, N, k] = m.split("-");
    return `${k}/${N}/${D}`;
  }, u = (m) => {
    const D = m.replace(/\D/g, "");
    if (D.length !== 8) return null;
    const N = D.substring(0, 2), k = D.substring(2, 4), h = D.substring(4, 8), w = parseInt(k, 10), b = parseInt(N, 10), O = parseInt(h, 10);
    return w < 1 || w > 12 || b < 1 || b > 31 || O < 1900 || O > 2100 ? null : `${h}-${k}-${N}`;
  };
  return We(() => {
    a(l(e));
  }, [e]), /* @__PURE__ */ f(
    "input",
    {
      ref: s,
      type: "text",
      value: o,
      onChange: (m) => {
        const D = m.target.value, N = m.target.selectionStart || 0, k = o;
        if (D.length < k.length) {
          if (D.replace(/\D/g, "").length < k.replace(/\D/g, "").length) {
            const O = D.replace(/\D/g, "");
            let g = "";
            if (O.length > 0 && (g = O.substring(0, 2), O.length > 2 && (g += "/" + O.substring(2, 4)), O.length > 4 && (g += "/" + O.substring(4, 8))), a(g), setTimeout(() => {
              if (s.current) {
                const C = Math.min(N, g.length);
                s.current.setSelectionRange(C, C);
              }
            }, 0), O.length === 8) {
              const C = u(g);
              C && t(C);
            }
          } else
            a(k), setTimeout(() => {
              s.current && s.current.setSelectionRange(N, N);
            }, 0);
          return;
        }
        const h = D.replace(/\D/g, "");
        let w = "";
        if (h.length > 0) {
          let O = h.substring(0, 2);
          if (O.length === 2) {
            const g = parseInt(O, 10);
            g > 31 ? O = "31" : g < 1 && O.length === 2 && (O = "01");
          }
          if (w = O, h.length > 2) {
            let g = h.substring(2, 4);
            if (g.length === 2) {
              const C = parseInt(g, 10);
              C > 12 ? g = "12" : C < 1 && g.length === 2 && (g = "01");
            }
            w += "/" + g;
          }
          if (h.length > 4) {
            let g = h.substring(4, 8);
            if (g.length === 4) {
              const C = parseInt(g, 10);
              C > 2100 ? g = "2100" : C < 1900 && (g = "1900");
            }
            w += "/" + g;
          }
        }
        a(w);
        let b = N;
        if (w.length > k.length) {
          const O = w.length - k.length;
          b = N + O;
        }
        if (w[b] === "/" && b++, setTimeout(() => {
          if (s.current) {
            const O = Math.min(b, w.length);
            s.current.setSelectionRange(O, O);
          }
        }, 0), h.length === 8) {
          const O = u(w);
          O && t(O);
        }
      },
      onBlur: () => {
        if (o) {
          const m = u(o);
          m ? (t(m), a(l(m))) : a(l(e));
        }
      },
      onKeyDown: (m) => {
        const D = s.current;
        if (!D) return;
        const N = D.selectionStart || 0;
        if (i.current = N, m.key === "ArrowLeft" || m.key === "ArrowRight") {
          setTimeout(() => {
            const k = D.selectionStart || 0;
            if (o[k] === "/") {
              const h = m.key === "ArrowLeft" ? -1 : 1;
              D.setSelectionRange(k + h, k + h);
            }
          }, 0);
          return;
        }
        if (!(m.key === "Backspace" || m.key === "Delete" || m.key === "Tab" || m.key === "Escape" || m.key === "Enter")) {
          if (!/^\d$/.test(m.key)) {
            m.preventDefault();
            return;
          }
          if (o[N] === "/") {
            m.preventDefault();
            const k = o.substring(0, N) + m.key + o.substring(N + 1);
            a(k), setTimeout(() => {
              if (s.current) {
                const h = N + 1;
                s.current.setSelectionRange(h, h);
              }
            }, 0);
            return;
          }
          if (N >= 3 && N <= 5) {
            const h = o.replace(/\D/g, "").substring(2, 4), w = h.length === 1 ? h : "", b = m.key;
            if (h.length === 1 && N === 5) {
              const O = parseInt(w + b, 10);
              if ((O === 0 || O > 12) && (m.preventDefault(), O > 12)) {
                const g = o.substring(0, 3) + w + "2" + o.substring(5);
                a(g), setTimeout(() => {
                  s.current && s.current.setSelectionRange(6, 6);
                }, 0);
              }
            }
          }
          if (N >= 0 && N <= 2) {
            const h = o.replace(/\D/g, "").substring(0, 2), w = h.length === 1 ? h : "", b = m.key;
            if (h.length === 1 && N === 1) {
              const O = parseInt(w + b, 10);
              if ((O === 0 || O > 31) && (m.preventDefault(), O > 31)) {
                const g = w + "1" + o.substring(2);
                a(g), setTimeout(() => {
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
const Ri = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], qi = [
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
function Gi({
  initialSelection: e,
  onApply: t,
  onCancel: n
}) {
  const r = St(), [s, o] = B(
    e?.unit || "day"
  ), [a, i] = B(
    e?.startDateUtc || r
  ), [l, u] = B(
    e?.endDateUtc || r
  ), [p, d] = B(e?.duration || 1), [y, m] = B(
    e?.excludedWeekdays || []
  ), [D, N] = B(
    []
  ), k = ke(null), [h, w] = B(0), [b, O] = B(!1), [g, C] = B([]), [I, $] = B(!1), [A, G] = B(null), [Z, ne] = B([]), [re, fe] = B([]), [he, Oe] = B(
    void 0
  ), Re = ke(null), [J, ce] = B([]), [L, K] = B(() => e?.startDateUtc ? ee(U(e.startDateUtc)) : ee(U(r))), [ye, we] = B(null), [Ce, Te] = B(() => e?.startDateUtc ? te(U(e.startDateUtc)) : te(U(r))), [Pe, Ue] = B(null), [qe, pe] = B(() => {
    if (e?.startDateUtc) {
      const x = te(U(e.startDateUtc));
      return Math.floor(x / 10) * 10;
    }
    const c = te(U(r));
    return Math.floor(c / 10) * 10;
  });
  We(() => {
    if (a && l) {
      const c = Dr(
        a,
        l,
        s,
        y
      );
      d(c);
    } else
      d(1);
  }, [a, l, s, y]), We(() => {
    if (k.current) {
      const x = document.createElement("canvas").getContext("2d");
      if (x) {
        x.font = "14px system-ui, -apple-system, sans-serif";
        const H = x.measureText(p.toString()).width;
        w(12 + H + 4);
      }
    }
  }, [p]), We(() => {
    const c = (x) => {
      Re.current && !Re.current.contains(x.target) && $(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, []), We(() => {
    (async () => {
      await Je.init();
      const x = await Je.getData(
        "savedDateRanges"
      );
      x && ce(x);
    })();
  }, []);
  const Ot = (c) => {
    i(c), c && l && U(c) > U(l) && u(c), c && K(ee(U(c)));
  }, Ct = (c) => {
    u(c), c && a && U(c) < U(a) && i(c), c && K(ee(U(c)));
  }, et = !Xe, Tt = (c) => {
    if (!(c <= 0)) {
      if (d(c), a) {
        const x = Ti(
          a,
          s,
          c,
          y
        );
        u(x), K(ee(U(x)));
      } else if (l) {
        const x = Wi(
          l,
          s,
          c,
          y
        );
        i(x), K(ee(U(x)));
      }
    }
  }, pt = (c) => {
    o(c);
  }, Wt = (c) => {
    y.includes(c) ? m(y.filter((x) => x !== c)) : m([...y, c]);
  }, Yt = (c, x) => {
    i(c), u(x), c && K(ee(U(c)));
  }, Et = (c) => {
    i(c.startDateUtc), u(c.endDateUtc), o(c.unit), m(c.excludedWeekdays), d(c.duration), c.excludeEnabled !== void 0 && O(c.excludeEnabled), c.excludeFilterTypes ? C(c.excludeFilterTypes) : C([]), c.excludedSpecificDates ? N(c.excludedSpecificDates) : N([]), c.excludedSavedDates ? ne(c.excludedSavedDates) : ne([]), c.excludedDateRanges ? fe(c.excludedDateRanges) : fe([]), c.startDateUtc && K(ee(U(c.startDateUtc)));
  }, _t = () => {
    i(r), u(r), m([]), K(ee(U(r)));
  }, It = () => {
    i(""), u(""), d(1), o("day"), m([]), O(!1), C([]), N([]), ne([]), fe([]), Oe(void 0), G(null), K(ee(U(r)));
  }, tt = !a || a.trim() === "" || !l || l.trim() === "", Ft = () => {
    if (tt)
      return;
    const c = En(
      a,
      l,
      s,
      y,
      b,
      g,
      D,
      Z,
      re
    );
    t(c);
  }, be = (c) => {
    if (c?.from) {
      const x = j(c.from);
      if (i(x), c?.to) {
        const H = j(c.to);
        u(H);
      } else
        u(x);
    }
  }, nt = (c, x) => {
    if (a && l && c?.to) {
      i(j(x)), x > U(l) && u("");
      return;
    }
    if (!a && l && c?.from) {
      u(j(c?.from));
      return;
    }
    if (!a && !l && c?.from) {
      i(j(c?.from)), u("");
      return;
    }
    if (c?.from) {
      const H = j(c.from);
      if (i(H), c?.to) {
        const M = j(c.to);
        u(M);
      } else
        u(H);
    }
  }, Ge = (c) => {
    if (c && c.from) {
      const x = Ie(c.from, {
        weekStartsOn: en
      }), H = Ne(x, 6);
      if (c.to) {
        const M = Ie(c.to, {
          weekStartsOn: en
        }), F = Ne(M, 6);
        be({ from: x, to: F });
      } else
        be({ from: x, to: H });
    }
  }, bt = U(r), $e = {
    from: a ? U(a) : void 0,
    to: l ? U(l) : void 0
  }, Dt = {
    from: a ? U(a) : bt,
    to: l ? U(l) : bt
  }, je = (c) => {
    const x = !Xe, H = b && g.includes("days") && y.includes(c.getDay()), M = b && g.includes("specific-date") && D.includes(j(c)), F = b && g.includes("saved-dates") && Z.some((_) => {
      const E = J.find((z) => z.id === _);
      if (!E) return !1;
      const Y = j(c);
      if (!(Y >= E.selection.startDateUtc && Y <= E.selection.endDateUtc)) return !1;
      if (E.selection.excludedWeekdays && E.selection.excludedWeekdays.length > 0 && E.selection.excludedWeekdays.includes(c.getDay()) || E.selection.excludedSpecificDates && E.selection.excludedSpecificDates.length > 0 && E.selection.excludedSpecificDates.includes(Y) || E.selection.excludedSavedDates && E.selection.excludedSavedDates.some(
        (se) => {
          const q = J.find(
            (X) => X.id === se
          );
          return q ? Y >= q.selection.startDateUtc && Y <= q.selection.endDateUtc : !1;
        }
      ))
        return !0;
      let ie = !1;
      return !!(E.selection.excludedDateRanges && (ie = E.selection.excludedDateRanges.some(
        (z) => Y >= z.start && Y <= z.end
      ), ie));
    }), T = b && g.includes("date-range") && re.some((_) => {
      const E = j(c);
      return E >= _.start && E <= _.end;
    });
    return x || H || M || F || T;
  }, Pt = (c, x) => {
    const H = ee(
      ft(ht(/* @__PURE__ */ new Date(), c), x)
    );
    K(H), we(null), Te(c);
  }, Ut = (c) => {
    const x = Ve(L), H = ee(
      ft(ht(/* @__PURE__ */ new Date(), c), x)
    );
    K(H), Ue(null), pe(Math.floor(c / 10) * 10);
  };
  We(() => {
    ye === null && Te(te(L));
  }, [L, ye]);
  const wt = (c) => {
    const x = c - 1, H = c + 10, M = te(L), F = [];
    for (let T = x; T <= H; T++)
      F.push(T);
    return /* @__PURE__ */ v("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => pe(qe - 10),
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
            onClick: () => pe(qe + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: F.map((T) => {
        const _ = !Xe, E = T < c || T > c + 9;
        return /* @__PURE__ */ f(
          "button",
          {
            onClick: () => Ut(T),
            disabled: _,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${E ? "opacity-50 bg-gray-50 text-gray-500" : M === T ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: T
          },
          T
        );
      }) })
    ] });
  }, xt = (c) => /* @__PURE__ */ v("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Te(Ce - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ f("div", { className: "text-lg font-semibold", children: c }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Te(Ce + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: qi.map((x, H) => {
      const M = !Xe, F = te(L) === c && Ve(L) === H;
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => Pt(c, H),
          disabled: M,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${F ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: x
        },
        x
      );
    }) })
  ] }), Le = ke(null), rt = ke(null);
  return We(() => {
    if (s !== "day") return;
    const c = (M, F) => {
      const T = M.querySelector(
        "span[data-month-name]"
      ), _ = M.querySelector(
        "span[data-year-name]"
      );
      if (T) {
        const z = M.textContent || "";
        M.style.gap = "6px";
        let se = "";
        if (_)
          se = _.textContent || "";
        else {
          const q = z.match(/\d{4}/);
          q && (se = q[0]);
        }
        if (!_ && se) {
          const q = document.createElement("span");
          q.textContent = se, q.setAttribute("data-year-name", "true"), q.style.cursor = "pointer", q.onclick = (me) => {
            me.stopPropagation(), me.preventDefault();
            const vt = parseInt(se, 10);
            if (!isNaN(vt)) {
              const Ze = Math.floor(vt / 10) * 10;
              pe(Ze), Ue(F), we(null);
            }
          };
          const X = T.nextSibling;
          if (X && X.nodeType === Node.TEXT_NODE)
            X.parentNode?.insertBefore(q, X.nextSibling);
          else {
            const me = document.createTextNode(" ");
            M.appendChild(me), M.appendChild(q);
          }
        } else _ && (_.onclick = (q) => {
          q.stopPropagation(), q.preventDefault();
          const X = parseInt(se, 10);
          if (!isNaN(X)) {
            const me = Math.floor(X / 10) * 10;
            pe(me), Ue(F), we(null);
          }
        });
        T.onclick = (q) => {
          q.stopPropagation(), q.preventDefault();
          const X = parseInt(se, 10);
          isNaN(X) || (Te(X), we(F), Ue(null));
        };
        return;
      }
      const E = M.textContent || "", Y = E.trim().split(/\s+/);
      let le = "", ie = "";
      if (Y.length >= 2)
        le = Y[0], ie = Y[1];
      else if (Y.length === 1) {
        const z = E.match(/^([A-Za-z]+)(\d{4})$/);
        if (z)
          le = z[1], ie = z[2];
        else
          return;
      } else
        return;
      if (le && ie) {
        const z = M.firstChild;
        if (M.style.gap = "6px", z && z.nodeType === Node.TEXT_NODE && (z.textContent || "").indexOf(le) !== -1) {
          const X = document.createElement("span");
          X.textContent = le, X.setAttribute("data-month-name", "true"), X.style.cursor = "pointer", X.onclick = (Ze) => {
            Ze.stopPropagation(), Ze.preventDefault();
            const st = parseInt(ie, 10);
            isNaN(st) || (Te(st), we(F), Ue(null));
          };
          const me = document.createElement("span");
          me.textContent = ie, me.setAttribute("data-year-name", "true"), me.style.cursor = "pointer", me.onclick = (Ze) => {
            Ze.stopPropagation(), Ze.preventDefault();
            const st = parseInt(ie, 10);
            if (!isNaN(st)) {
              const wr = Math.floor(st / 10) * 10;
              pe(wr), Ue(F), we(null);
            }
          }, M.innerHTML = "", M.appendChild(X);
          const vt = document.createTextNode(" ");
          M.appendChild(vt), M.appendChild(me);
        }
      }
    }, x = (M, F) => {
      if (!M) return;
      M.querySelectorAll(".rdp-caption_label").forEach((_, E) => {
        const Y = _, le = F !== null ? F : E === 0 ? 0 : 1;
        ye === le || Pe === le || c(Y, le);
      });
    }, H = setTimeout(() => {
      ye === null && Pe === null ? x(Le.current, null) : (x(Le.current, 0), x(rt.current, 1));
    }, 150);
    return () => clearTimeout(H);
  }, [s, L, ye, Pe]), /* @__PURE__ */ v("div", { className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-[85vh]", children: [
    /* @__PURE__ */ f(
      Ui,
      {
        onPresetSelect: Yt,
        onSavedDateSelect: Et,
        currentSelection: En(
          a,
          l,
          s,
          y,
          b,
          g,
          D,
          Z,
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
              onClick: () => pt(c),
              className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${s === c ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
              children: c.charAt(0).toUpperCase() + c.slice(1)
            },
            c
          )
        ) }),
        /* @__PURE__ */ v("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
          /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Start Date" }),
            /* @__PURE__ */ f(
              _n,
              {
                value: a,
                onChange: Ot,
                placeholder: "DD/MM/YYYY",
                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ v("div", { children: [
            /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "End Date" }),
            /* @__PURE__ */ f(
              _n,
              {
                value: l,
                onChange: Ct,
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
                  ref: k,
                  type: "number",
                  min: "1",
                  value: p,
                  onChange: (c) => Tt(Number(c.target.value)),
                  className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                }
              ),
              /* @__PURE__ */ f(
                "span",
                {
                  className: "absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none",
                  style: { left: `${h}px` },
                  children: Ei(s)
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
                checked: b,
                onChange: (c) => O(c.target.checked),
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
            /* @__PURE__ */ v("div", { className: "relative flex-1", ref: Re, children: [
              /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  onClick: () => b && $(!I),
                  disabled: !b,
                  className: "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                  children: /* @__PURE__ */ f(
                    "span",
                    {
                      className: g.length === 0 ? "text-gray-400" : "text-gray-700",
                      children: g.length === 0 ? "select a filter" : g.length === 1 ? (() => {
                        switch (g[0]) {
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
                      })() : `${g.length} filters selected`
                    }
                  )
                }
              ),
              /* @__PURE__ */ f(Ga, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }),
              I && b && /* @__PURE__ */ f("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", children: /* @__PURE__ */ v("div", { className: "p-2 space-y-1", children: [
                /* @__PURE__ */ v("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                  /* @__PURE__ */ f(
                    "input",
                    {
                      type: "checkbox",
                      checked: g.includes("days"),
                      onChange: (c) => {
                        c.target.checked ? C([
                          ...g,
                          "days"
                        ]) : C(
                          g.filter((x) => x !== "days")
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
                      checked: g.includes("specific-date"),
                      onChange: (c) => {
                        c.target.checked ? C([
                          ...g,
                          "specific-date"
                        ]) : C(
                          g.filter(
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
                      checked: g.includes("saved-dates"),
                      onChange: (c) => {
                        c.target.checked ? C([
                          ...g,
                          "saved-dates"
                        ]) : C(
                          g.filter(
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
                      checked: g.includes("date-range"),
                      onChange: (c) => {
                        c.target.checked ? C([
                          ...g,
                          "date-range"
                        ]) : C(
                          g.filter(
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
          b && g.length > 0 && /* @__PURE__ */ v("div", { className: "flex gap-2 items-center", children: [
            g.includes("days") && /* @__PURE__ */ v(
              "button",
              {
                onClick: () => G(
                  A === "days" ? null : "days"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${A === "days" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ f(Lt, { className: "w-4 h-4" }),
                  /* @__PURE__ */ v("span", { children: [
                    "Days (",
                    y.length,
                    " selected)"
                  ] })
                ]
              }
            ),
            g.includes("specific-date") && /* @__PURE__ */ v(
              "button",
              {
                onClick: () => G(
                  A === "specific-date" ? null : "specific-date"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${A === "specific-date" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ f(Lt, { className: "w-4 h-4" }),
                  /* @__PURE__ */ v("span", { children: [
                    "Dates (",
                    D.length,
                    " selected)"
                  ] })
                ]
              }
            ),
            g.includes("saved-dates") && /* @__PURE__ */ v(
              "button",
              {
                onClick: () => G(
                  A === "saved-dates" ? null : "saved-dates"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${A === "saved-dates" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ f(za, { className: "w-4 h-4" }),
                  /* @__PURE__ */ v("span", { children: [
                    "Saved (",
                    Z.length,
                    " selected)"
                  ] })
                ]
              }
            ),
            g.includes("date-range") && /* @__PURE__ */ v(
              "button",
              {
                onClick: () => G(
                  A === "date-range" ? null : "date-range"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${A === "date-range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ f(Lt, { className: "w-4 h-4" }),
                  /* @__PURE__ */ v("span", { children: [
                    "Date Ranges (",
                    re.length,
                    " selected)"
                  ] })
                ]
              }
            )
          ] }),
          b && A === "days" && g.includes("days") && /* @__PURE__ */ f("div", { className: "mt-3 flex gap-2", children: Ri.map((c) => /* @__PURE__ */ f(
            "button",
            {
              onClick: () => Wt(c.value),
              className: `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${y.includes(c.value) ? "bg-red-100 text-red-700 border-2 border-red-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: c.label
            },
            c.value
          )) }),
          b && A === "specific-date" && g.includes("specific-date") && /* @__PURE__ */ v("div", { className: "mt-3 flex flex-col gap-3", children: [
            /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 text-center mb-2", children: "Click individual dates to exclude them" }),
            /* @__PURE__ */ f("div", { className: "flex justify-center p-4 border border-gray-200 rounded-md bg-gray-50", children: /* @__PURE__ */ f(
              Ae,
              {
                mode: "multiple",
                selected: D.map((c) => U(c)),
                onSelect: (c) => {
                  c && N(
                    c.map((x) => j(x))
                  );
                },
                numberOfMonths: 2,
                modifiersClassNames: {
                  selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                }
              }
            ) }),
            D.length > 0 && /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: D.map((c) => /* @__PURE__ */ v(
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
                        N(
                          D.filter((x) => x !== c)
                        );
                      },
                      className: "hover:bg-red-200 rounded-full p-0.5",
                      children: /* @__PURE__ */ f(vn, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              c
            )) })
          ] }),
          b && A === "saved-dates" && g.includes("saved-dates") && /* @__PURE__ */ f("div", { className: "mt-3 flex flex-col gap-3", children: J.length === 0 ? /* @__PURE__ */ f("p", { className: "text-sm text-gray-500 text-center py-4", children: "No saved dates available" }) : /* @__PURE__ */ f("div", { className: "space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2", children: J.map((c) => {
            const x = Z.includes(
              c.id
            );
            return /* @__PURE__ */ v(
              "div",
              {
                className: `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${x ? "bg-red-50 border border-red-300" : "bg-white hover:bg-gray-50 border border-gray-200"}`,
                onClick: () => {
                  ne(
                    x ? Z.filter(
                      (H) => H !== c.id
                    ) : [
                      ...Z,
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
          b && A === "date-range" && g.includes("date-range") && /* @__PURE__ */ v("div", { className: "mt-3 flex flex-col gap-3", children: [
            /* @__PURE__ */ f("div", { className: "border border-gray-200 rounded-md bg-gray-50 p-4", children: /* @__PURE__ */ f(
              Ae,
              {
                mode: "range",
                selected: he,
                onSelect: (c) => Oe(c),
                numberOfMonths: 2,
                disabled: (c) => !Xe,
                modifiersClassNames: {
                  selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                }
              }
            ) }),
            he?.from && he?.to && /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => {
                    const c = {
                      id: `range-${Date.now()}`,
                      start: j(he.from),
                      end: j(he.to)
                    };
                    fe([
                      ...re,
                      c
                    ]), Oe(void 0);
                  },
                  className: "px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors",
                  children: "Add Date Range"
                }
              ),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => Oe(void 0),
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
                          fe(
                            re.filter(
                              (x) => x.id !== c.id
                            )
                          );
                        },
                        className: "hover:bg-red-200 rounded-full p-0.5",
                        children: /* @__PURE__ */ f(vn, { className: "w-3 h-3" })
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
          s === "day" && /* @__PURE__ */ f("div", { className: "flex gap-4", children: Pe !== null ? Pe === 0 ? (
            // When yearsViewIndex === 0, show years grid on left and single calendar on right
            /* @__PURE__ */ v(ct, { children: [
              /* @__PURE__ */ f(
                "div",
                {
                  className: "w-full flex-shrink-0",
                  style: { minWidth: "280px", maxWidth: "280px" },
                  children: wt(qe)
                }
              ),
              /* @__PURE__ */ f("div", { ref: rt, children: /* @__PURE__ */ f(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: be,
                  month: ee(Ye(L, 1)),
                  onMonthChange: (c) => {
                    const x = new Date(L), M = new Date(c).getMonth() - x.getMonth();
                    M !== 1 && M !== -11 && K(
                      ee(Ye(c, -1))
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
            /* @__PURE__ */ v(ct, { children: [
              /* @__PURE__ */ f("div", { ref: Le, children: /* @__PURE__ */ f(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: be,
                  month: L,
                  onMonthChange: K,
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
                  children: wt(qe)
                }
              )
            ] })
          ) : ye === null ? (
            // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
            /* @__PURE__ */ f("div", { ref: Le, children: /* @__PURE__ */ f(
              Ae,
              {
                mode: "range",
                navLayout: "around",
                selected: $e,
                onSelect: (c, x) => {
                  nt(c, x);
                },
                month: L,
                onMonthChange: K,
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
          ) : ye === 0 ? (
            // When monthsViewIndex === 0, show months grid on left and single calendar on right
            /* @__PURE__ */ v(ct, { children: [
              /* @__PURE__ */ f(
                "div",
                {
                  className: "w-full flex-shrink-0",
                  style: { minWidth: "280px", maxWidth: "280px" },
                  children: xt(Ce)
                }
              ),
              /* @__PURE__ */ f("div", { ref: rt, children: /* @__PURE__ */ f(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: be,
                  month: ee(Ye(L, 1)),
                  onMonthChange: (c) => {
                    const x = new Date(L), M = new Date(c).getMonth() - x.getMonth();
                    M !== 1 && M !== -11 && K(
                      ee(Ye(c, -1))
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
            /* @__PURE__ */ v(ct, { children: [
              /* @__PURE__ */ f("div", { ref: Le, children: /* @__PURE__ */ f(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: be,
                  month: L,
                  onMonthChange: K,
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
                  children: xt(Ce)
                }
              )
            ] })
          ) }),
          s === "week" && /* @__PURE__ */ f(
            Ae,
            {
              mode: "range",
              navLayout: "around",
              showWeekNumber: !0,
              locale: void 0,
              formatters: {
                formatWeekNumber: (c) => `W${String(c).padStart(2, "0")}`
              },
              selected: $e,
              onSelect: Ge,
              onWeekNumberClick: (c, x) => {
                x && x.length > 0 && Ge({
                  from: x[0],
                  to: x[x.length - 1]
                });
              },
              month: L,
              onMonthChange: K,
              numberOfMonths: 2,
              disabled: (c) => {
                const x = !Xe, H = b && g.includes("days") && y.includes(c.getDay()), M = b && g.includes("specific-date") && D.includes(j(c)), F = b && g.includes("saved-dates") && Z.some((_) => {
                  const E = J.find(
                    (z) => z.id === _
                  );
                  if (!E) return !1;
                  const Y = j(c);
                  if (!(Y >= E.selection.startDateUtc && Y <= E.selection.endDateUtc)) return !1;
                  if (E.selection.excludedWeekdays && E.selection.excludedWeekdays.length > 0 && E.selection.excludedWeekdays.includes(c.getDay()) || E.selection.excludedSpecificDates && E.selection.excludedSpecificDates.length > 0 && E.selection.excludedSpecificDates.includes(Y) || E.selection.excludedSavedDates && E.selection.excludedSavedDates.some(
                    (se) => {
                      const q = J.find(
                        (X) => X.id === se
                      );
                      return q ? Y >= q.selection.startDateUtc && Y <= q.selection.endDateUtc : !1;
                    }
                  ))
                    return !0;
                  let ie = !1;
                  return !!(E.selection.excludedDateRanges && (ie = E.selection.excludedDateRanges.some(
                    (z) => Y >= z.start && Y <= z.end
                  ), ie));
                }), T = b && g.includes("date-range") && re.some((_) => {
                  const E = j(c);
                  return E >= _.start && E <= _.end;
                });
                return x || H || M || F || T;
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
          s === "month" && /* @__PURE__ */ f(
            Bi,
            {
              selectedRange: Dt,
              onSelect: be
            }
          ),
          s === "quarter" && /* @__PURE__ */ f(
            Hi,
            {
              selectedRange: Dt,
              onSelect: be
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ v("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: _t,
            className: "px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
            children: "Today"
          }
        ),
        /* @__PURE__ */ v("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ f(
            "button",
            {
              onClick: It,
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
              onClick: Ft,
              disabled: !!(tt || et),
              className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${tt || et ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
              children: "Apply"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  Xe as ALLOW_FUTURE_DATES,
  Gi as AdvancedDateRangePicker,
  Zi as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  zi as WEEK_NUMBERING_MODE,
  en as WEEK_STARTS_ON,
  Dr as calcDurationFromRange,
  Ti as calcEndFromDuration,
  Wi as calcStartFromDuration,
  En as createSelection,
  Qi as formatDisplayDate,
  j as formatUtc,
  _i as getPresets,
  St as getTodayUtc,
  Ei as getUnitAbbreviation,
  Vi as parseDisplayDate,
  U as parseUtc
};
