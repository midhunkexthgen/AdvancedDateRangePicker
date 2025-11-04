import { jsxs as x, jsx as u, Fragment as ct } from "react/jsx-runtime";
import N, { createContext as wr, useContext as xr, useCallback as ye, useRef as ke, useLayoutEffect as vr, useState as A, useEffect as We, useMemo as Ut, forwardRef as _n, createElement as Gt } from "react";
import "react-day-picker/dist/style.css";
function kr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Mr = {}, lt = {};
function Qe(e, t) {
  try {
    const r = (Mr[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in lt ? lt[r] : an(r, r.split(":"));
  } catch {
    if (e in lt) return lt[e];
    const n = e?.match(Nr);
    return n ? an(e, n.slice(1)) : NaN;
  }
}
const Nr = /([+-]\d\d):?(\d\d)?/;
function an(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return lt[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class Me extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Qe(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), In(this), Kt(this)) : this.setTime(Date.now());
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
    return Date.prototype.setTime.apply(this, arguments), Kt(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Me(+new Date(t), this.timeZone);
  }
  //#endregion
}
const cn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!cn.test(e)) return;
  const t = e.replace(cn, "$1UTC");
  Me.prototype[t] && (e.startsWith("get") ? Me.prototype[e] = function() {
    return this.internal[t]();
  } : (Me.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Sr(this), +this;
  }, Me.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Kt(this), +this;
  }));
});
function Kt(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Qe(e.timeZone, e) * 60));
}
function Sr(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), In(e);
}
function In(e) {
  const t = Qe(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), a = s - o, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  a && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
  const c = s - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const f = /* @__PURE__ */ new Date(+e);
  f.setUTCSeconds(0);
  const p = s > 0 ? f.getSeconds() : (f.getSeconds() - 60) % 60, d = Math.round(-(Qe(e.timeZone, e) * 60)) % 60;
  (d || p) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + p));
  const y = Qe(e.timeZone, e), m = y > 0 ? Math.floor(y) : Math.ceil(y), M = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - m, k = m !== n, h = M - c;
  if (k && h) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
    const w = Qe(e.timeZone, e), b = w > 0 ? Math.floor(w) : Math.ceil(w), S = m - b;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
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
    return `${t} GMT${n}${r}${s} (${kr(this.timeZone, this)})`;
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
const Fn = 6048e5, Or = 864e5, Pn = 6e4, Un = 36e5, ln = Symbol.for("constructDateFrom");
function K(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ln in e ? e[ln](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function P(e, t) {
  return K(t || e, e);
}
function Ne(e, t, n) {
  const r = P(e, n?.in);
  return isNaN(t) ? K(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ye(e, t, n) {
  const r = P(e, n?.in);
  if (isNaN(t)) return K(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), o = K(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const a = o.getDate();
  return s >= a ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    s
  ), r);
}
let Cr = {};
function mt() {
  return Cr;
}
function Ie(e, t) {
  const n = mt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = P(e, t?.in), o = s.getDay(), a = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - a), s.setHours(0, 0, 0, 0), s;
}
function dt(e, t) {
  return Ie(e, { ...t, weekStartsOn: 1 });
}
function $n(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = K(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const o = dt(s), a = K(n, 0);
  a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0);
  const i = dt(a);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function dn(e) {
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
  const n = K.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function ut(e, t) {
  const n = P(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function en(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  ), o = ut(r), a = ut(s), i = +o - dn(o), c = +a - dn(a);
  return Math.round((i - c) / Or);
}
function Tr(e, t) {
  const n = $n(e, t), r = K(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), dt(r);
}
function Bn(e, t, n) {
  return Ye(e, t * 3, n);
}
function tn(e, t, n) {
  return Ne(e, t * 7, n);
}
function Wr(e, t, n) {
  return Ye(e, t * 12, n);
}
function Yr(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = K.bind(null, s));
    const o = P(s, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), K(r, n || NaN);
}
function Er(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = K.bind(null, s));
    const o = P(s, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), K(r, n || NaN);
}
function $t(e, t) {
  const n = +P(e) - +P(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function _r(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  );
  return +ut(r) == +ut(s);
}
function An(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Ir(e) {
  return !(!An(e) && typeof e != "number" || isNaN(+P(e)));
}
function Hn(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  ), o = r.getFullYear() - s.getFullYear(), a = r.getMonth() - s.getMonth();
  return o * 12 + a;
}
function vt(e, t) {
  const n = P(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function Rn(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  ), o = un(r, s), a = Math.abs(
    en(r, s)
  );
  r.setDate(r.getDate() - o * a);
  const i = +(un(r, s) === -o), c = o * (a - i);
  return c === 0 ? 0 : c;
}
function un(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function qn(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function Fr(e, t) {
  const n = P(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function jn(e, t) {
  const n = P(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Pr(e, t) {
  const n = P(e, t?.in);
  return +Fr(n, t) == +jn(n, t);
}
function Ln(e, t, n) {
  const [r, s, o] = He(
    n?.in,
    e,
    e,
    t
  ), a = $t(s, o), i = Math.abs(
    Hn(s, o)
  );
  if (i < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - a * i);
  let c = $t(s, o) === -a;
  Pr(r) && i === 1 && $t(r, o) === 1 && (c = !1);
  const f = a * (i - +c);
  return f === 0 ? 0 : f;
}
function Ur(e, t, n) {
  const r = Ln(e, t, n) / 3;
  return qn()(r);
}
function $r(e, t, n) {
  const r = Rn(e, t, n) / 7;
  return qn()(r);
}
function nn(e, t) {
  const [n, r] = He(e, t.start, t.end);
  return { start: n, end: r };
}
function Zn(e, t) {
  const { start: n, end: r } = nn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0);
  let i = 1;
  const c = [];
  for (; +a <= o; )
    c.push(K(n, a)), a.setDate(a.getDate() + i), a.setHours(0, 0, 0, 0);
  return s ? c.reverse() : c;
}
function Br(e, t) {
  const { start: n, end: r } = nn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0), a.setDate(1);
  let i = 1;
  const c = [];
  for (; +a <= o; )
    c.push(K(n, a)), a.setMonth(a.getMonth() + i);
  return s ? c.reverse() : c;
}
function Ar(e, t) {
  const n = P(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function te(e, t) {
  const n = P(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Hr(e, t) {
  const n = P(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function rn(e, t) {
  const n = P(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Rr(e, t) {
  const { start: n, end: r } = nn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, a = s ? r : n;
  a.setHours(0, 0, 0, 0), a.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +a <= o; )
    c.push(K(n, a)), a.setFullYear(a.getFullYear() + i);
  return s ? c.reverse() : c;
}
function zn(e, t) {
  const n = mt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = P(e, t?.in), o = s.getDay(), a = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + a), s.setHours(23, 59, 59, 999), s;
}
function qr(e, t) {
  return zn(e, { ...t, weekStartsOn: 1 });
}
const jr = {
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
}, Lr = (e, t, n) => {
  let r;
  const s = jr[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Bt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Zr = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, zr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Qr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Vr = {
  date: Bt({
    formats: Zr,
    defaultWidth: "full"
  }),
  time: Bt({
    formats: zr,
    defaultWidth: "full"
  }),
  dateTime: Bt({
    formats: Qr,
    defaultWidth: "full"
  })
}, Gr = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Kr = (e, t, n, r) => Gr[e];
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
const Xr = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Jr = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, es = {
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
}, ts = {
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
}, ns = {
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
}, rs = {
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
}, ss = (e, t) => {
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
}, os = {
  ordinalNumber: ss,
  era: ot({
    values: Xr,
    defaultWidth: "wide"
  }),
  quarter: ot({
    values: Jr,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: ot({
    values: es,
    defaultWidth: "wide"
  }),
  day: ot({
    values: ts,
    defaultWidth: "wide"
  }),
  dayPeriod: ot({
    values: ns,
    defaultWidth: "wide",
    formattingValues: rs,
    defaultFormattingWidth: "wide"
  })
};
function at(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(s);
    if (!o)
      return null;
    const a = o[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? is(i, (d) => d.test(a)) : (
      // [TODO] -- I challenge you to fix the type
      as(i, (d) => d.test(a))
    );
    let f;
    f = e.valueCallback ? e.valueCallback(c) : c, f = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(f)
    ) : f;
    const p = t.slice(a.length);
    return { value: f, rest: p };
  };
}
function as(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function is(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function cs(e) {
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
const ls = /^(\d+)(th|st|nd|rd)?/i, ds = /\d+/i, us = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, fs = {
  any: [/^b/i, /^(a|c)/i]
}, hs = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, ms = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, gs = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ys = {
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
}, ps = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, bs = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ds = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, ws = {
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
}, xs = {
  ordinalNumber: cs({
    matchPattern: ls,
    parsePattern: ds,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: at({
    matchPatterns: us,
    defaultMatchWidth: "wide",
    parsePatterns: fs,
    defaultParseWidth: "any"
  }),
  quarter: at({
    matchPatterns: hs,
    defaultMatchWidth: "wide",
    parsePatterns: ms,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: at({
    matchPatterns: gs,
    defaultMatchWidth: "wide",
    parsePatterns: ys,
    defaultParseWidth: "any"
  }),
  day: at({
    matchPatterns: ps,
    defaultMatchWidth: "wide",
    parsePatterns: bs,
    defaultParseWidth: "any"
  }),
  dayPeriod: at({
    matchPatterns: Ds,
    defaultMatchWidth: "any",
    parsePatterns: ws,
    defaultParseWidth: "any"
  })
}, sn = {
  code: "en-US",
  formatDistance: Lr,
  formatLong: Vr,
  formatRelative: Kr,
  localize: os,
  match: xs,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function vs(e, t) {
  const n = P(e, t?.in);
  return en(n, rn(n)) + 1;
}
function Qn(e, t) {
  const n = P(e, t?.in), r = +dt(n) - +Tr(n);
  return Math.round(r / Fn) + 1;
}
function Vn(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = mt(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, a = K(t?.in || e, 0);
  a.setFullYear(r + 1, 0, o), a.setHours(0, 0, 0, 0);
  const i = Ie(a, t), c = K(t?.in || e, 0);
  c.setFullYear(r, 0, o), c.setHours(0, 0, 0, 0);
  const f = Ie(c, t);
  return +n >= +i ? r + 1 : +n >= +f ? r : r - 1;
}
function ks(e, t) {
  const n = mt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = Vn(e, t), o = K(t?.in || e, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), Ie(o, t);
}
function Gn(e, t) {
  const n = P(e, t?.in), r = +Ie(n, t) - +ks(n, t);
  return Math.round(r / Fn) + 1;
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
}, Xe = {
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
    return Be.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const s = Vn(e, r), o = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const a = o % 100;
      return R(a, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : R(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = $n(e);
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
    const s = Gn(e, r);
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : R(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Qn(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : R(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Be.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = vs(e);
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
    switch (r === 12 ? s = Xe.noon : r === 0 ? s = Xe.midnight : s = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? s = Xe.evening : r >= 12 ? s = Xe.afternoon : r >= 4 ? s = Xe.morning : s = Xe.night, t) {
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
        return mn(r);
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
        return mn(r);
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
        return "GMT" + hn(r, ":");
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
        return "GMT" + hn(r, ":");
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
function hn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + t + R(o, 2);
}
function mn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + R(Math.abs(e) / 60, 2) : ze(e, t);
}
function ze(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = R(Math.trunc(r / 60), 2), o = R(r % 60, 2);
  return n + s + t + o;
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
}, Kn = (e, t) => {
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
}, Ms = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return gn(e, t);
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
  return o.replace("{{date}}", gn(r, t)).replace("{{time}}", Kn(s, t));
}, Ns = {
  p: Kn,
  P: Ms
}, Ss = /^D+$/, Os = /^Y+$/, Cs = ["D", "DD", "YY", "YYYY"];
function Ts(e) {
  return Ss.test(e);
}
function Ws(e) {
  return Os.test(e);
}
function Ys(e, t, n) {
  const r = Es(e, t, n);
  if (console.warn(r), Cs.includes(e)) throw new RangeError(r);
}
function Es(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const _s = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Is = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Fs = /^'([^]*?)'?$/, Ps = /''/g, Us = /[a-zA-Z]/;
function $s(e, t, n) {
  const r = mt(), s = n?.locale ?? r.locale ?? sn, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, a = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, i = P(e, n?.in);
  if (!Ir(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Is).map((p) => {
    const d = p[0];
    if (d === "p" || d === "P") {
      const y = Ns[d];
      return y(p, s.formatLong);
    }
    return p;
  }).join("").match(_s).map((p) => {
    if (p === "''")
      return { isToken: !1, value: "'" };
    const d = p[0];
    if (d === "'")
      return { isToken: !1, value: Bs(p) };
    if (fn[d])
      return { isToken: !0, value: p };
    if (d.match(Us))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: p };
  });
  s.localize.preprocessor && (c = s.localize.preprocessor(i, c));
  const f = {
    firstWeekContainsDate: o,
    weekStartsOn: a,
    locale: s
  };
  return c.map((p) => {
    if (!p.isToken) return p.value;
    const d = p.value;
    (!n?.useAdditionalWeekYearTokens && Ws(d) || !n?.useAdditionalDayOfYearTokens && Ts(d)) && Ys(d, t, String(e));
    const y = fn[d[0]];
    return y(i, d, s.localize, f);
  }).join("");
}
function Bs(e) {
  const t = e.match(Fs);
  return t ? t[1].replace(Ps, "'") : e;
}
function As(e, t) {
  const n = P(e, t?.in), r = n.getFullYear(), s = n.getMonth(), o = K(n, 0);
  return o.setFullYear(r, s + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Ve(e, t) {
  return P(e, t?.in).getMonth();
}
function ne(e, t) {
  return P(e, t?.in).getFullYear();
}
function Hs(e, t) {
  return +P(e) > +P(t);
}
function Rs(e, t) {
  return +P(e) < +P(t);
}
function qs(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function js(e, t, n) {
  const [r, s] = He(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function Ls(e, t) {
  const n = () => K(t?.in, NaN), s = Vs(e);
  let o;
  if (s.date) {
    const f = Gs(s.date, 2);
    o = Ks(f.restDateString, f.year);
  }
  if (!o || isNaN(+o)) return n();
  const a = +o;
  let i = 0, c;
  if (s.time && (i = Xs(s.time), isNaN(i)))
    return n();
  if (s.timezone) {
    if (c = Js(s.timezone), isNaN(c)) return n();
  } else {
    const f = new Date(a + i), p = P(0, t?.in);
    return p.setFullYear(
      f.getUTCFullYear(),
      f.getUTCMonth(),
      f.getUTCDate()
    ), p.setHours(
      f.getUTCHours(),
      f.getUTCMinutes(),
      f.getUTCSeconds(),
      f.getUTCMilliseconds()
    ), p;
  }
  return P(a + i + c, t?.in);
}
const kt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Zs = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, zs = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, Qs = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function Vs(e) {
  const t = {}, n = e.split(kt.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], kt.timeZoneDelimiter.test(t.date) && (t.date = e.split(kt.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = kt.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function Gs(e, t) {
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
function Ks(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(Zs);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = it(n[1]), o = it(n[2]) - 1, a = it(n[3]), i = it(n[4]), c = it(n[5]) - 1;
  if (r)
    return so(t, i, c) ? eo(t, i, c) : /* @__PURE__ */ new Date(NaN);
  {
    const f = /* @__PURE__ */ new Date(0);
    return !no(t, o, a) || !ro(t, s) ? /* @__PURE__ */ new Date(NaN) : (f.setUTCFullYear(t, o, Math.max(s, a)), f);
  }
}
function it(e) {
  return e ? parseInt(e) : 1;
}
function Xs(e) {
  const t = e.match(zs);
  if (!t) return NaN;
  const n = At(t[1]), r = At(t[2]), s = At(t[3]);
  return oo(n, r, s) ? n * Un + r * Pn + s * 1e3 : NaN;
}
function At(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function Js(e) {
  if (e === "Z") return 0;
  const t = e.match(Qs);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return ao(r, s) ? n * (r * Un + s * Pn) : NaN;
}
function eo(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const to = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Xn(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function no(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (to[t] || (Xn(e) ? 29 : 28));
}
function ro(e, t) {
  return t >= 1 && t <= (Xn(e) ? 366 : 365);
}
function so(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function oo(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function ao(e, t) {
  return t >= 0 && t <= 59;
}
function ft(e, t, n) {
  const r = P(e, n?.in), s = r.getFullYear(), o = r.getDate(), a = K(e, 0);
  a.setFullYear(s, t, 15), a.setHours(0, 0, 0, 0);
  const i = As(a);
  return r.setMonth(t, Math.min(o, i)), r;
}
function io(e, t, n) {
  const r = P(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, o = t - s;
  return ft(r, r.getMonth() + o * 3);
}
function ht(e, t, n) {
  const r = P(e, n?.in);
  return isNaN(+r) ? K(e, NaN) : (r.setFullYear(t), r);
}
const yn = 5, co = 4;
function lo(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), o = t.addDays(s, yn * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? yn : co;
}
function Jn(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function uo(e, t) {
  const n = Jn(e, t), r = lo(e, t);
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
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? oe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, o) => this.overrides?.newDate ? this.overrides.newDate(r, s, o) : this.options.timeZone ? new oe(r, s, o, this.options.timeZone) : new Date(r, s, o), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : Ne(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Ye(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : tn(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : Wr(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : en(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : Hn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Br(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Rr(r), o = new Set(s.map((i) => this.getYear(i)));
      if (o.size === s.length)
        return s;
      const a = [];
      return o.forEach((i) => {
        a.push(new Date(i, 0, 1));
      }), a;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : uo(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : qr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : jn(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : zn(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Hr(r), this.format = (r, s, o) => {
      const a = this.overrides?.format ? this.overrides.format(r, s, this.options) : $s(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(a) : a;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : Qn(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Ve(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ne(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : Gn(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : Hs(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : Rs(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : An(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : _r(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : qs(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : js(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Yr(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Er(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : ft(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : ht(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : Jn(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : ut(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : dt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : te(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Ie(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : rn(r), this.options = { locale: sn, ...t }, this.overrides = n;
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
class er {
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
class fo {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class ho {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function mo(e) {
  return N.createElement("button", { ...e });
}
function go(e) {
  return N.createElement("span", { ...e });
}
function yo(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    N.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && N.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && N.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && N.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && N.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function po(e) {
  const { day: t, modifiers: n, ...r } = e;
  return N.createElement("td", { ...r });
}
function bo(e) {
  const { day: t, modifiers: n, ...r } = e, s = N.useRef(null);
  return N.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), N.createElement("button", { ref: s, ...r });
}
var Y;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(Y || (Y = {}));
var V;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(V || (V = {}));
var De;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(De || (De = {}));
var de;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(de || (de = {}));
function Do(e) {
  const { options: t, className: n, components: r, classNames: s, ...o } = e, a = [s[Y.Dropdown], n].join(" "), i = t?.find(({ value: c }) => c === o.value);
  return N.createElement(
    "span",
    { "data-disabled": o.disabled, className: s[Y.DropdownRoot] },
    N.createElement(r.Select, { className: a, ...o }, t?.map(({ value: c, label: f, disabled: p }) => N.createElement(r.Option, { key: c, value: c, disabled: p }, f))),
    N.createElement(
      "span",
      { className: s[Y.CaptionLabel], "aria-hidden": !0 },
      i?.label,
      N.createElement(r.Chevron, { orientation: "down", size: 18, className: s[Y.Chevron] })
    )
  );
}
function wo(e) {
  return N.createElement("div", { ...e });
}
function xo(e) {
  return N.createElement("div", { ...e });
}
function vo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return N.createElement("div", { ...r }, e.children);
}
function ko(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return N.createElement("div", { ...r });
}
function Mo(e) {
  return N.createElement("table", { ...e });
}
function No(e) {
  return N.createElement("div", { ...e });
}
const tr = wr(void 0);
function gt() {
  const e = xr(tr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function So(e) {
  const { components: t } = gt();
  return N.createElement(t.Dropdown, { ...e });
}
function Oo(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...o } = e, { components: a, classNames: i, labels: { labelPrevious: c, labelNext: f } } = gt(), p = ye((y) => {
    s && n?.(y);
  }, [s, n]), d = ye((y) => {
    r && t?.(y);
  }, [r, t]);
  return N.createElement(
    "nav",
    { ...o },
    N.createElement(
      a.PreviousMonthButton,
      { type: "button", className: i[Y.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: d },
      N.createElement(a.Chevron, { disabled: r ? void 0 : !0, className: i[Y.Chevron], orientation: "left" })
    ),
    N.createElement(
      a.NextMonthButton,
      { type: "button", className: i[Y.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": f(s), onClick: p },
      N.createElement(a.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: i[Y.Chevron] })
    )
  );
}
function Co(e) {
  const { components: t } = gt();
  return N.createElement(t.Button, { ...e });
}
function To(e) {
  return N.createElement("option", { ...e });
}
function Wo(e) {
  const { components: t } = gt();
  return N.createElement(t.Button, { ...e });
}
function Yo(e) {
  const { rootRef: t, ...n } = e;
  return N.createElement("div", { ...n, ref: t });
}
function Eo(e) {
  return N.createElement("select", { ...e });
}
function _o(e) {
  const { week: t, ...n } = e;
  return N.createElement("tr", { ...n });
}
function Io(e) {
  return N.createElement("th", { ...e });
}
function Fo(e) {
  return N.createElement(
    "thead",
    { "aria-hidden": !0 },
    N.createElement("tr", { ...e })
  );
}
function Po(e) {
  const { week: t, ...n } = e;
  return N.createElement("th", { ...n });
}
function Uo(e) {
  return N.createElement("th", { ...e });
}
function $o(e) {
  return N.createElement("tbody", { ...e });
}
function Bo(e) {
  const { components: t } = gt();
  return N.createElement(t.Dropdown, { ...e });
}
const Ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: mo,
  CaptionLabel: go,
  Chevron: yo,
  Day: po,
  DayButton: bo,
  Dropdown: Do,
  DropdownNav: wo,
  Footer: xo,
  Month: vo,
  MonthCaption: ko,
  MonthGrid: Mo,
  Months: No,
  MonthsDropdown: So,
  Nav: Oo,
  NextMonthButton: Co,
  Option: To,
  PreviousMonthButton: Wo,
  Root: Yo,
  Select: Eo,
  Week: _o,
  WeekNumber: Po,
  WeekNumberHeader: Uo,
  Weekday: Io,
  Weekdays: Fo,
  Weeks: $o,
  YearsDropdown: Bo
}, Symbol.toStringTag, { value: "Module" }));
function Ee(e, t, n = !1, r = Se) {
  let { from: s, to: o } = e;
  const { differenceInCalendarDays: a, isSameDay: i } = r;
  return s && o ? (a(o, s) < 0 && ([s, o] = [o, s]), a(t, s) >= (n ? 1 : 0) && a(o, t) >= (n ? 1 : 0)) : !n && o ? i(o, t) : !n && s ? i(s, t) : !1;
}
function nr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function on(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function rr(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function sr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function or(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function ar(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function _e(e, t, n = Se) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: o, isAfter: a } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return s(e, i);
    if (ar(i, n))
      return i.includes(e);
    if (on(i))
      return Ee(i, e, !1, n);
    if (or(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (nr(i)) {
      const c = o(i.before, e), f = o(i.after, e), p = c > 0, d = f < 0;
      return a(i.before, i.after) ? d && p : p || d;
    }
    return rr(i) ? o(e, i.after) > 0 : sr(i) ? o(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Ho(e, t, n, r, s) {
  const { disabled: o, hidden: a, modifiers: i, showOutsideDays: c, broadcastCalendar: f, today: p } = t, { isSameDay: d, isSameMonth: y, startOfMonth: m, isBefore: D, endOfMonth: M, isAfter: k } = s, h = n && m(n), w = r && M(r), b = {
    [V.focused]: [],
    [V.outside]: [],
    [V.disabled]: [],
    [V.hidden]: [],
    [V.today]: []
  }, S = {};
  for (const g of e) {
    const { date: C, displayMonth: E } = g, B = !!(E && !y(C, E)), H = !!(h && D(C, h)), X = !!(w && k(C, w)), Z = !!(o && _e(C, o, s)), re = !!(a && _e(C, a, s)) || H || X || // Broadcast calendar will show outside days as default
    !f && !c && B || f && c === !1 && B, se = d(C, p ?? s.today());
    B && b.outside.push(g), Z && b.disabled.push(g), re && b.hidden.push(g), se && b.today.push(g), i && Object.keys(i).forEach((fe) => {
      const he = i?.[fe];
      he && _e(C, he, s) && (S[fe] ? S[fe].push(g) : S[fe] = [g]);
    });
  }
  return (g) => {
    const C = {
      [V.focused]: !1,
      [V.disabled]: !1,
      [V.hidden]: !1,
      [V.outside]: !1,
      [V.today]: !1
    }, E = {};
    for (const B in b) {
      const H = b[B];
      C[B] = H.some((X) => X === g);
    }
    for (const B in S)
      E[B] = S[B].some((H) => H === g);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...E
    };
  };
}
function Ro(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [o]) => (n[o] ? s.push(n[o]) : t[V[o]] ? s.push(t[V[o]]) : t[De[o]] && s.push(t[De[o]]), s), [t[Y.Day]]);
}
function qo(e) {
  return {
    ...Ao,
    ...e
  };
}
function jo(e) {
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
function Lo() {
  const e = {};
  for (const t in Y)
    e[Y[t]] = `rdp-${Y[t]}`;
  for (const t in V)
    e[V[t]] = `rdp-${V[t]}`;
  for (const t in De)
    e[De[t]] = `rdp-${De[t]}`;
  for (const t in de)
    e[de[t]] = `rdp-${de[t]}`;
  return e;
}
function ir(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const Zo = ir;
function zo(e, t, n) {
  return (n ?? new ue(t)).format(e, "d");
}
function Qo(e, t = Se) {
  return t.format(e, "LLLL");
}
function Vo(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccccc");
}
function Go(e, t = Se) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Ko() {
  return "";
}
function cr(e, t = Se) {
  return t.format(e, "yyyy");
}
const Xo = cr, Jo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: ir,
  formatDay: zo,
  formatMonthCaption: Zo,
  formatMonthDropdown: Qo,
  formatWeekNumber: Go,
  formatWeekNumberHeader: Ko,
  formatWeekdayName: Vo,
  formatYearCaption: Xo,
  formatYearDropdown: cr
}, Symbol.toStringTag, { value: "Module" }));
function ea(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Jo,
    ...e
  };
}
function ta(e, t, n, r, s) {
  const { startOfMonth: o, startOfYear: a, endOfYear: i, eachMonthOfInterval: c, getMonth: f } = s;
  return c({
    start: a(e),
    end: i(e)
  }).map((y) => {
    const m = r.formatMonthDropdown(y, s), D = f(y), M = t && y < o(t) || n && y > o(n) || !1;
    return { value: D, label: m, disabled: M };
  });
}
function na(e, t = {}, n = {}) {
  let r = { ...t?.[Y.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function ra(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), o = [];
  for (let a = 0; a < 7; a++) {
    const i = e.addDays(s, a);
    o.push(i);
  }
  return o;
}
function sa(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: a, eachYearOfInterval: i, getYear: c } = r, f = o(e), p = a(t), d = i({ start: f, end: p });
  return s && d.reverse(), d.map((y) => {
    const m = n.formatYearDropdown(y, r);
    return {
      value: c(y),
      label: m,
      disabled: !1
    };
  });
}
function lr(e, t, n, r) {
  let s = (r ?? new ue(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const oa = lr;
function dr(e, t, n) {
  return (n ?? new ue(t)).formatMonthYear(e);
}
const aa = dr;
function ia(e, t, n, r) {
  let s = (r ?? new ue(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function ca(e) {
  return "Choose the Month";
}
function la() {
  return "";
}
function da(e) {
  return "Go to the Next Month";
}
function ua(e) {
  return "Go to the Previous Month";
}
function fa(e, t, n) {
  return (n ?? new ue(t)).format(e, "cccc");
}
function ha(e, t) {
  return `Week ${e}`;
}
function ma(e) {
  return "Week Number";
}
function ga(e) {
  return "Choose the Year";
}
const ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: aa,
  labelDay: oa,
  labelDayButton: lr,
  labelGrid: dr,
  labelGridcell: ia,
  labelMonthDropdown: ca,
  labelNav: la,
  labelNext: da,
  labelPrevious: ua,
  labelWeekNumber: ha,
  labelWeekNumberHeader: ma,
  labelWeekday: fa,
  labelYearDropdown: ga
}, Symbol.toStringTag, { value: "Module" })), yt = (e) => e instanceof HTMLElement ? e : null, Ht = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], pa = (e) => yt(e.querySelector("[data-animated-month]")), Rt = (e) => yt(e.querySelector("[data-animated-caption]")), qt = (e) => yt(e.querySelector("[data-animated-weeks]")), ba = (e) => yt(e.querySelector("[data-animated-nav]")), Da = (e) => yt(e.querySelector("[data-animated-weekdays]"));
function wa(e, t, { classNames: n, months: r, focused: s, dateLib: o }) {
  const a = ke(null), i = ke(r), c = ke(!1);
  vr(() => {
    const f = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || f.length === 0 || r.length !== f.length)
      return;
    const p = o.isSameMonth(r[0].date, f[0].date), d = o.isAfter(r[0].date, f[0].date), y = d ? n[de.caption_after_enter] : n[de.caption_before_enter], m = d ? n[de.weeks_after_enter] : n[de.weeks_before_enter], D = a.current, M = e.current.cloneNode(!0);
    if (M instanceof HTMLElement ? (Ht(M).forEach((b) => {
      if (!(b instanceof HTMLElement))
        return;
      const S = pa(b);
      S && b.contains(S) && b.removeChild(S);
      const g = Rt(b);
      g && g.classList.remove(y);
      const C = qt(b);
      C && C.classList.remove(m);
    }), a.current = M) : a.current = null, c.current || p || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const k = D instanceof HTMLElement ? Ht(D) : [], h = Ht(e.current);
    if (h?.every((w) => w instanceof HTMLElement) && k && k.every((w) => w instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const w = ba(e.current);
      w && (w.style.zIndex = "1"), h.forEach((b, S) => {
        const g = k[S];
        if (!g)
          return;
        b.style.position = "relative", b.style.overflow = "hidden";
        const C = Rt(b);
        C && C.classList.add(y);
        const E = qt(b);
        E && E.classList.add(m);
        const B = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), w && (w.style.zIndex = ""), C && C.classList.remove(y), E && E.classList.remove(m), b.style.position = "", b.style.overflow = "", b.contains(g) && b.removeChild(g);
        };
        g.style.pointerEvents = "none", g.style.position = "absolute", g.style.overflow = "hidden", g.setAttribute("aria-hidden", "true");
        const H = Da(g);
        H && (H.style.opacity = "0");
        const X = Rt(g);
        X && (X.classList.add(d ? n[de.caption_before_exit] : n[de.caption_after_exit]), X.addEventListener("animationend", B));
        const Z = qt(g);
        Z && Z.classList.add(d ? n[de.weeks_before_exit] : n[de.weeks_after_exit]), b.insertBefore(g, b.firstChild);
      });
    }
  });
}
function xa(e, t, n, r) {
  const s = e[0], o = e[e.length - 1], { ISOWeek: a, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: f, differenceInCalendarDays: p, differenceInCalendarMonths: d, endOfBroadcastWeek: y, endOfISOWeek: m, endOfMonth: D, endOfWeek: M, isAfter: k, startOfBroadcastWeek: h, startOfISOWeek: w, startOfWeek: b } = r, S = c ? h(s, r) : a ? w(s) : b(s), g = c ? y(o) : a ? m(D(o)) : M(D(o)), C = p(g, S), E = d(o, s) + 1, B = [];
  for (let Z = 0; Z <= C; Z++) {
    const re = f(S, Z);
    if (t && k(re, t))
      break;
    B.push(re);
  }
  const X = (c ? 35 : 42) * E;
  if (i && B.length < X) {
    const Z = X - B.length;
    for (let re = 0; re < Z; re++) {
      const se = f(B[B.length - 1], 1);
      B.push(se);
    }
  }
  return B;
}
function va(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((o, a) => o.concat(a.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function ka(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, o = [];
  for (let a = 0; a < s; a++) {
    const i = r.addMonths(e, a);
    if (t && i > t)
      break;
    o.push(i);
  }
  return o;
}
function pn(e, t, n, r) {
  const { month: s, defaultMonth: o, today: a = r.today(), numberOfMonths: i = 1 } = e;
  let c = s || o || a;
  const { differenceInCalendarMonths: f, addMonths: p, startOfMonth: d } = r;
  if (n && f(n, c) < i - 1) {
    const y = -1 * (i - 1);
    c = p(n, y);
  }
  return t && f(c, t) < 0 && (c = t), d(c);
}
function Ma(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: o, endOfISOWeek: a, endOfMonth: i, endOfWeek: c, getISOWeek: f, getWeek: p, startOfBroadcastWeek: d, startOfISOWeek: y, startOfWeek: m } = r, D = e.reduce((M, k) => {
    const h = n.broadcastCalendar ? d(k, r) : n.ISOWeek ? y(k) : m(k), w = n.broadcastCalendar ? o(k) : n.ISOWeek ? a(i(k)) : c(i(k)), b = t.filter((E) => E >= h && E <= w), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && b.length < S) {
      const E = t.filter((B) => {
        const H = S - b.length;
        return B > w && B <= s(w, H);
      });
      b.push(...E);
    }
    const g = b.reduce((E, B) => {
      const H = n.ISOWeek ? f(B) : p(B), X = E.find((re) => re.weekNumber === H), Z = new er(B, k, r);
      return X ? X.days.push(Z) : E.push(new ho(H, [Z])), E;
    }, []), C = new fo(k, g);
    return M.push(C), M;
  }, []);
  return n.reverseMonths ? D.reverse() : D;
}
function Na(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: o, startOfMonth: a, endOfMonth: i, addYears: c, endOfYear: f, newDate: p, today: d } = t, { fromYear: y, toYear: m, fromMonth: D, toMonth: M } = e;
  !n && D && (n = D), !n && y && (n = t.newDate(y, 0, 1)), !r && M && (r = M), !r && m && (r = p(m, 11, 31));
  const k = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = a(n) : y ? n = p(y, 0, 1) : !n && k && (n = s(c(e.today ?? d(), -100))), r ? r = i(r) : m ? r = p(m, 11, 31) : !r && k && (r = f(e.today ?? d())), [
    n && o(n),
    r && o(r)
  ];
}
function Sa(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o = 1 } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: c } = r, f = s ? o : 1, p = a(e);
  if (!t)
    return i(p, f);
  if (!(c(t, e) < o))
    return i(p, f);
}
function Oa(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o } = n, { startOfMonth: a, addMonths: i, differenceInCalendarMonths: c } = r, f = s ? o ?? 1 : 1, p = a(e);
  if (!t)
    return i(p, -f);
  if (!(c(p, t) <= 0))
    return i(p, -f);
}
function Ca(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Mt(e, t) {
  const [n, r] = A(e);
  return [t === void 0 ? n : t, r];
}
function Ta(e, t) {
  const [n, r] = Na(e, t), { startOfMonth: s, endOfMonth: o } = t, a = pn(e, n, r, t), [i, c] = Mt(
    a,
    // initialMonth is always computed from props.month if provided
    e.month ? a : void 0
  );
  We(() => {
    const C = pn(e, n, r, t);
    c(C);
  }, [e.timeZone]);
  const f = ka(i, r, e, t), p = xa(f, e.endMonth ? o(e.endMonth) : void 0, e, t), d = Ma(f, p, e, t), y = Ca(d), m = va(d), D = Oa(i, n, e, t), M = Sa(i, r, e, t), { disableNavigation: k, onMonthChange: h } = e, w = (C) => y.some((E) => E.days.some((B) => B.isEqualTo(C))), b = (C) => {
    if (k)
      return;
    let E = s(C);
    n && E < s(n) && (E = s(n)), r && E > s(r) && (E = s(r)), c(E), h?.(E);
  };
  return {
    months: d,
    weeks: y,
    days: m,
    navStart: n,
    navEnd: r,
    previousMonth: D,
    nextMonth: M,
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
function bn(e) {
  return !e[V.disabled] && !e[V.hidden] && !e[V.outside];
}
function Wa(e, t, n, r) {
  let s, o = -1;
  for (const a of e) {
    const i = t(a);
    bn(i) && (i[V.focused] && o < ve.FocusedModifier ? (s = a, o = ve.FocusedModifier) : r?.isEqualTo(a) && o < ve.LastFocused ? (s = a, o = ve.LastFocused) : n(a.date) && o < ve.Selected ? (s = a, o = ve.Selected) : i[V.today] && o < ve.Today && (s = a, o = ve.Today));
  }
  return s || (s = e.find((a) => bn(t(a)))), s;
}
function Ya(e, t, n, r, s, o, a) {
  const { ISOWeek: i, broadcastCalendar: c } = o, { addDays: f, addMonths: p, addWeeks: d, addYears: y, endOfBroadcastWeek: m, endOfISOWeek: D, endOfWeek: M, max: k, min: h, startOfBroadcastWeek: w, startOfISOWeek: b, startOfWeek: S } = a;
  let C = {
    day: f,
    week: d,
    month: p,
    year: y,
    startOfWeek: (E) => c ? w(E, a) : i ? b(E) : S(E),
    endOfWeek: (E) => c ? m(E) : i ? D(E) : M(E)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = k([r, C]) : t === "after" && s && (C = h([s, C])), C;
}
function ur(e, t, n, r, s, o, a, i = 0) {
  if (i > 365)
    return;
  const c = Ya(e, t, n.date, r, s, o, a), f = !!(o.disabled && _e(c, o.disabled, a)), p = !!(o.hidden && _e(c, o.hidden, a)), d = c, y = new er(c, d, a);
  return !f && !p ? y : ur(e, t, y, r, s, o, a, i + 1);
}
function Ea(e, t, n, r, s) {
  const { autoFocus: o } = e, [a, i] = A(), c = Wa(t.days, n, r || (() => !1), a), [f, p] = A(o ? c : void 0);
  return {
    isFocusTarget: (M) => !!c?.isEqualTo(M),
    setFocused: p,
    focused: f,
    blur: () => {
      i(f), p(void 0);
    },
    moveFocus: (M, k) => {
      if (!f)
        return;
      const h = ur(M, k, f, t.navStart, t.navEnd, e, s);
      h && (e.disableNavigation && !t.days.some((b) => b.isEqualTo(h)) || (t.goToDay(h), p(h)));
    }
  };
}
function _a(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, a] = Mt(n, s ? n : void 0), i = s ? n : o, { isSameDay: c } = t, f = (m) => i?.some((D) => c(D, m)) ?? !1, { min: p, max: d } = e;
  return {
    selected: i,
    select: (m, D, M) => {
      let k = [...i ?? []];
      if (f(m)) {
        if (i?.length === p || r && i?.length === 1)
          return;
        k = i?.filter((h) => !c(h, m));
      } else
        i?.length === d ? k = [m] : k = [...k, m];
      return s || a(k), s?.(k, m, D, M), k;
    },
    isSelected: f
  };
}
function Ia(e, t, n = 0, r = 0, s = !1, o = Se) {
  const { from: a, to: i } = t || {}, { isSameDay: c, isAfter: f, isBefore: p } = o;
  let d;
  if (!a && !i)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (a && !i)
    c(a, e) ? n === 0 ? d = { from: a, to: e } : s ? d = { from: a, to: void 0 } : d = void 0 : p(e, a) ? d = { from: e, to: a } : d = { from: a, to: e };
  else if (a && i)
    if (c(a, e) && c(i, e))
      s ? d = { from: a, to: i } : d = void 0;
    else if (c(a, e))
      d = { from: a, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (p(e, a))
      d = { from: e, to: i };
    else if (f(e, a))
      d = { from: a, to: e };
    else if (f(e, i))
      d = { from: a, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const y = o.differenceInCalendarDays(d.to, d.from);
    r > 0 && y > r ? d = { from: e, to: void 0 } : n > 1 && y < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Fa(e, t, n = Se) {
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
function Dn(e, t, n = Se) {
  return Ee(e, t.from, !1, n) || Ee(e, t.to, !1, n) || Ee(t, e.from, !1, n) || Ee(t, e.to, !1, n);
}
function Pa(e, t, n = Se) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? Ee(e, i, !1, n) : ar(i, n) ? i.some((c) => Ee(e, c, !1, n)) : on(i) ? i.from && i.to ? Dn(e, { from: i.from, to: i.to }, n) : !1 : or(i) ? Fa(e, i.dayOfWeek, n) : nr(i) ? n.isAfter(i.before, i.after) ? Dn(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : _e(e.from, i, n) || _e(e.to, i, n) : rr(i) || sr(i) ? _e(e.from, i, n) || _e(e.to, i, n) : !1))
    return !0;
  const a = r.filter((i) => typeof i == "function");
  if (a.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let f = 0; f <= c; f++) {
      if (a.some((p) => p(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Ua(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: o, onSelect: a } = e, [i, c] = Mt(s, a ? s : void 0), f = a ? s : i;
  return {
    selected: f,
    select: (y, m, D) => {
      const { min: M, max: k } = e, h = y ? Ia(y, f, M, k, o, t) : void 0;
      return r && n && h?.from && h.to && Pa({ from: h.from, to: h.to }, n, t) && (h.from = y, h.to = void 0), a || c(h), a?.(h, y, m, D), h;
    },
    isSelected: (y) => f && Ee(f, y, !1, t)
  };
}
function $a(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, a] = Mt(n, s ? n : void 0), i = s ? n : o, { isSameDay: c } = t;
  return {
    selected: i,
    select: (d, y, m) => {
      let D = d;
      return !r && i && i && c(d, i) && (D = void 0), s || a(D), s?.(D, d, y, m), D;
    },
    isSelected: (d) => i ? c(i, d) : !1
  };
}
function Ba(e, t) {
  const n = $a(e, t), r = _a(e, t), s = Ua(e, t);
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
  }, t.today && (t.today = new oe(t.today, t.timeZone)), t.month && (t.month = new oe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new oe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new oe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new oe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new oe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((W) => new oe(W, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new oe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new oe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: o, locale: a, classNames: i } = Ut(() => {
    const W = { ...sn, ...t.locale };
    return {
      dateLib: new ue({
        locale: W,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: qo(t.components),
      formatters: ea(t.formatters),
      labels: { ...ya, ...t.labels },
      locale: W,
      classNames: { ...Lo(), ...t.classNames }
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
  ]), { captionLayout: c, mode: f, navLayout: p, numberOfMonths: d = 1, onDayBlur: y, onDayClick: m, onDayFocus: D, onDayKeyDown: M, onDayMouseEnter: k, onDayMouseLeave: h, onNextClick: w, onPrevClick: b, showWeekNumber: S, styles: g } = t, { formatCaption: C, formatDay: E, formatMonthDropdown: B, formatWeekNumber: H, formatWeekNumberHeader: X, formatWeekdayName: Z, formatYearDropdown: re } = r, se = Ta(t, o), { days: fe, months: he, navStart: Oe, navEnd: Re, previousMonth: ee, nextMonth: le, goToMonth: L } = se, J = Ho(fe, t, Oe, Re, o), { isSelected: pe, select: we, selected: Ce } = Ba(t, o) ?? {}, { blur: Te, focused: Pe, isFocusTarget: Ue, moveFocus: qe, setFocused: be } = Ea(t, se, J, pe ?? (() => !1), o), { labelDayButton: St, labelGridcell: Ot, labelGrid: tt, labelMonthDropdown: Ct, labelNav: pt, labelPrevious: Tt, labelNext: Wt, labelWeekday: Yt, labelWeekNumber: Et, labelWeekNumberHeader: _t, labelYearDropdown: nt } = s, It = Ut(() => ra(o, t.ISOWeek), [o, t.ISOWeek]), me = f !== void 0 || m !== void 0, Ge = ye(() => {
    ee && (L(ee), b?.(ee));
  }, [ee, L, b]), Ke = ye(() => {
    le && (L(le), w?.(le));
  }, [L, le, w]), $e = ye((W, _) => (T) => {
    T.preventDefault(), T.stopPropagation(), be(W), we?.(W.date, _, T), m?.(W.date, _, T);
  }, [we, m, be]), bt = ye((W, _) => (T) => {
    be(W), D?.(W.date, _, T);
  }, [D, be]), je = ye((W, _) => (T) => {
    Te(), y?.(W.date, _, T);
  }, [Te, y]), Ft = ye((W, _) => (T) => {
    const O = {
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
    if (O[T.key]) {
      T.preventDefault(), T.stopPropagation();
      const [F, I] = O[T.key];
      qe(F, I);
    }
    M?.(W.date, _, T);
  }, [qe, M, t.dir]), Pt = ye((W, _) => (T) => {
    k?.(W.date, _, T);
  }, [k]), Dt = ye((W, _) => (T) => {
    h?.(W.date, _, T);
  }, [h]), wt = ye((W) => (_) => {
    const T = Number(_.target.value), O = o.setMonth(o.startOfMonth(W), T);
    L(O);
  }, [o, L]), Le = ye((W) => (_) => {
    const T = Number(_.target.value), O = o.setYear(o.startOfMonth(W), T);
    L(O);
  }, [o, L]), { className: rt, style: l } = Ut(() => ({
    className: [i[Y.Root], t.className].filter(Boolean).join(" "),
    style: { ...g?.[Y.Root], ...t.style }
  }), [i, t.className, t.style, g]), v = jo(t), j = ke(null);
  wa(j, !!t.animate, {
    classNames: i,
    months: he,
    focused: Pe,
    dateLib: o
  });
  const $ = {
    dayPickerProps: t,
    selected: Ce,
    select: we,
    isSelected: pe,
    months: he,
    nextMonth: le,
    previousMonth: ee,
    goToMonth: L,
    getModifiers: J,
    components: n,
    classNames: i,
    styles: g,
    labels: s,
    formatters: r
  };
  return N.createElement(
    tr.Provider,
    { value: $ },
    N.createElement(
      n.Root,
      { rootRef: t.animate ? j : void 0, className: rt, style: l, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...v },
      N.createElement(
        n.Months,
        { className: i[Y.Months], style: g?.[Y.Months] },
        !t.hideNavigation && !p && N.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[Y.Nav], style: g?.[Y.Nav], "aria-label": pt(), onPreviousClick: Ge, onNextClick: Ke, previousMonth: ee, nextMonth: le }),
        he.map((W, _) => N.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: i[Y.Month],
            style: g?.[Y.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: _,
            displayIndex: _,
            calendarMonth: W
          },
          p === "around" && !t.hideNavigation && _ === 0 && N.createElement(
            n.PreviousMonthButton,
            { type: "button", className: i[Y.PreviousMonthButton], tabIndex: ee ? void 0 : -1, "aria-disabled": ee ? void 0 : !0, "aria-label": Tt(ee), onClick: Ge, "data-animated-button": t.animate ? "true" : void 0 },
            N.createElement(n.Chevron, { disabled: ee ? void 0 : !0, className: i[Y.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          N.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: i[Y.MonthCaption], style: g?.[Y.MonthCaption], calendarMonth: W, displayIndex: _ }, c?.startsWith("dropdown") ? N.createElement(
            n.DropdownNav,
            { className: i[Y.Dropdowns], style: g?.[Y.Dropdowns] },
            (() => {
              const T = c === "dropdown" || c === "dropdown-months" ? N.createElement(n.MonthsDropdown, { key: "month", className: i[Y.MonthsDropdown], "aria-label": Ct(), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: wt(W.date), options: ta(W.date, Oe, Re, r, o), style: g?.[Y.Dropdown], value: o.getMonth(W.date) }) : N.createElement("span", { key: "month" }, B(W.date, o)), O = c === "dropdown" || c === "dropdown-years" ? N.createElement(n.YearsDropdown, { key: "year", className: i[Y.YearsDropdown], "aria-label": nt(o.options), classNames: i, components: n, disabled: !!t.disableNavigation, onChange: Le(W.date), options: sa(Oe, Re, r, o, !!t.reverseYears), style: g?.[Y.Dropdown], value: o.getYear(W.date) }) : N.createElement("span", { key: "year" }, re(W.date, o));
              return o.getMonthYearOrder() === "year-first" ? [O, T] : [T, O];
            })(),
            N.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, C(W.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            N.createElement(n.CaptionLabel, { className: i[Y.CaptionLabel], role: "status", "aria-live": "polite" }, C(W.date, o.options, o))
          )),
          p === "around" && !t.hideNavigation && _ === d - 1 && N.createElement(
            n.NextMonthButton,
            { type: "button", className: i[Y.NextMonthButton], tabIndex: le ? void 0 : -1, "aria-disabled": le ? void 0 : !0, "aria-label": Wt(le), onClick: Ke, "data-animated-button": t.animate ? "true" : void 0 },
            N.createElement(n.Chevron, { disabled: le ? void 0 : !0, className: i[Y.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          _ === d - 1 && p === "after" && !t.hideNavigation && N.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: i[Y.Nav], style: g?.[Y.Nav], "aria-label": pt(), onPreviousClick: Ge, onNextClick: Ke, previousMonth: ee, nextMonth: le }),
          N.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": f === "multiple" || f === "range", "aria-label": tt(W.date, o.options, o) || void 0, className: i[Y.MonthGrid], style: g?.[Y.MonthGrid] },
            !t.hideWeekdays && N.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: i[Y.Weekdays], style: g?.[Y.Weekdays] },
              S && N.createElement(n.WeekNumberHeader, { "aria-label": _t(o.options), className: i[Y.WeekNumberHeader], style: g?.[Y.WeekNumberHeader], scope: "col" }, X()),
              It.map((T) => N.createElement(n.Weekday, { "aria-label": Yt(T, o.options, o), className: i[Y.Weekday], key: String(T), style: g?.[Y.Weekday], scope: "col" }, Z(T, o.options, o)))
            ),
            N.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: i[Y.Weeks], style: g?.[Y.Weeks] }, W.weeks.map((T) => N.createElement(
              n.Week,
              { className: i[Y.Week], key: T.weekNumber, style: g?.[Y.Week], week: T },
              S && // biome-ignore lint/a11y/useSemanticElements: react component
              N.createElement(n.WeekNumber, { week: T, style: g?.[Y.WeekNumber], "aria-label": Et(T.weekNumber, {
                locale: a
              }), className: i[Y.WeekNumber], scope: "row", role: "rowheader" }, H(T.weekNumber, o)),
              T.days.map((O) => {
                const { date: F } = O, I = J(O);
                if (I[V.focused] = !I.hidden && !!Pe?.isEqualTo(O), I[De.selected] = pe?.(F) || I.selected, on(Ce)) {
                  const { from: q, to: z } = Ce;
                  I[De.range_start] = !!(q && z && o.isSameDay(F, q)), I[De.range_end] = !!(q && z && o.isSameDay(F, z)), I[De.range_middle] = Ee(Ce, F, !0, o);
                }
                const ie = na(I, g, t.modifiersStyles), Q = Ro(I, i, t.modifiersClassNames), ce = !me && !I.hidden ? Ot(F, I, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  N.createElement(n.Day, { key: `${o.format(F, "yyyy-MM-dd")}_${o.format(O.displayMonth, "yyyy-MM")}`, day: O, modifiers: I, className: Q.join(" "), style: ie, role: "gridcell", "aria-selected": I.selected || void 0, "aria-label": ce, "data-day": o.format(F, "yyyy-MM-dd"), "data-month": O.outside ? o.format(F, "yyyy-MM") : void 0, "data-selected": I.selected || void 0, "data-disabled": I.disabled || void 0, "data-hidden": I.hidden || void 0, "data-outside": O.outside || void 0, "data-focused": I.focused || void 0, "data-today": I.today || void 0 }, !I.hidden && me ? N.createElement(n.DayButton, { className: i[Y.DayButton], style: g?.[Y.DayButton], type: "button", day: O, modifiers: I, disabled: I.disabled || void 0, tabIndex: Ue(O) ? 0 : -1, "aria-label": St(F, I, o.options, o), onClick: $e(O, I), onBlur: je(O, I), onFocus: bt(O, I), onKeyDown: Ft(O, I), onMouseEnter: Pt(O, I), onMouseLeave: Dt(O, I) }, E(F, o.options, o)) : !I.hidden && E(O.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      N.createElement(n.Footer, { className: i[Y.Footer], style: g?.[Y.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aa = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ha = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), wn = (e) => {
  const t = Ha(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, fr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Ra = (e) => {
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
var qa = {
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
const ja = _n(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: o,
    iconNode: a,
    ...i
  }, c) => Gt(
    "svg",
    {
      ref: c,
      ...qa,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: fr("lucide", s),
      ...!o && !Ra(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...a.map(([f, p]) => Gt(f, p)),
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
  const n = _n(
    ({ className: r, ...s }, o) => Gt(ja, {
      ref: o,
      iconNode: t,
      className: fr(
        `lucide-${Aa(wn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = wn(e), n;
};
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const La = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], Za = Fe("bookmark", La);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const za = [
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
], jt = Fe("calendar-days", za);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qa = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Va = Fe("chevron-down", Qa);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ga = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], hr = Fe("chevron-left", Ga);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ka = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], mr = Fe("chevron-right", Ka);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xa = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ja = Fe("circle-question-mark", Xa);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ei = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ti = Fe("plus", ei);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ni = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], ri = Fe("trash-2", ni);
/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const si = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], xn = Fe("x", si);
function oi(e, t) {
  const n = di(t);
  return "formatToParts" in n ? ii(n, e) : ci(n, e);
}
const ai = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function ii(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const o = ai[n[s].type];
      o !== void 0 && (r[o] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function ci(e, t) {
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
const Lt = {}, vn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), li = vn === "06/25/2014, 00:00:00" || vn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function di(e) {
  return Lt[e] || (Lt[e] = li ? new Intl.DateTimeFormat("en-US", {
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
  })), Lt[e];
}
function gr(e, t, n, r, s, o, a) {
  const i = /* @__PURE__ */ new Date(0);
  return i.setUTCFullYear(e, t, n), i.setUTCHours(r, s, o, a), i;
}
const kn = 36e5, ui = 6e4, Zt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function yr(e, t, n) {
  if (!e)
    return 0;
  let r = Zt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, o;
  if (r = Zt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), Mn(s) ? -(s * kn) : NaN;
  if (r = Zt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const a = parseInt(r[3], 10);
    return Mn(s, a) ? (o = Math.abs(s) * kn + a * ui, r[1] === "+" ? -o : o) : NaN;
  }
  if (mi(e)) {
    t = new Date(t || Date.now());
    const a = n ? t : fi(t), i = Xt(a, e);
    return -(n ? i : hi(t, i, e));
  }
  return NaN;
}
function fi(e) {
  return gr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function Xt(e, t) {
  const n = oi(e, t), r = gr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const o = s % 1e3;
  return s -= o >= 0 ? o : 1e3 + o, r - s;
}
function hi(e, t, n) {
  let s = e.getTime() - t;
  const o = Xt(new Date(s), n);
  if (t === o)
    return t;
  s -= o - t;
  const a = Xt(new Date(s), n);
  return o === a ? o : Math.max(o, a);
}
function Mn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const Nn = {};
function mi(e) {
  if (Nn[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), Nn[e] = !0, !0;
  } catch {
    return !1;
  }
}
function Sn(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const gi = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, zt = 36e5, On = 6e4, yi = 2, ae = {
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
  timeZone: gi
};
function pi(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? yi : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = bi(e), { year: s, restDateString: o } = Di(r.date, n), a = wi(o, s);
  if (a === null || isNaN(a.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (a) {
    const i = a.getTime();
    let c = 0, f;
    if (r.time && (c = xi(r.time), c === null || isNaN(c)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (f = yr(r.timeZone || t.timeZone, new Date(i + c)), isNaN(f))
        return /* @__PURE__ */ new Date(NaN);
    } else
      f = Sn(new Date(i + c)), f = Sn(new Date(i + c + f));
    return new Date(i + c + f);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function bi(e) {
  const t = {};
  let n = ae.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = ae.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = ae.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function Di(e, t) {
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
function wi(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let o = ae.MM.exec(e);
  if (o)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1, Tn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (o = ae.DDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0);
    const a = parseInt(o[1], 10);
    return Mi(t, a) ? (n.setUTCFullYear(t, 0, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ae.MMDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1;
    const a = parseInt(o[2], 10);
    return Tn(t, r, a) ? (n.setUTCFullYear(t, r, a), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ae.Www.exec(e), o)
    return s = parseInt(o[1], 10) - 1, Wn(s) ? Cn(t, s) : /* @__PURE__ */ new Date(NaN);
  if (o = ae.WwwD.exec(e), o) {
    s = parseInt(o[1], 10) - 1;
    const a = parseInt(o[2], 10) - 1;
    return Wn(s, a) ? Cn(t, s, a) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function xi(e) {
  let t, n, r = ae.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Qt(t) ? t % 24 * zt : NaN;
  if (r = ae.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Qt(t, n) ? t % 24 * zt + n * On : NaN;
  if (r = ae.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return Qt(t, n, s) ? t % 24 * zt + n * On + s * 1e3 : NaN;
  }
  return null;
}
function Cn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const vi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], ki = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function pr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Tn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = pr(e);
    if (r && n > ki[t] || !r && n > vi[t])
      return !1;
  }
  return !0;
}
function Mi(e, t) {
  if (t < 1)
    return !1;
  const n = pr(e);
  return !(n && t > 366 || !n && t > 365);
}
function Wn(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Qt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function Ni(e, t, n) {
  e = pi(e, n);
  const r = yr(t, e, !0), s = new Date(e.getTime() - r), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), o.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), o;
}
const Jt = 0, Zi = !1, Je = !0, zi = "firstFullWeek", Si = "UTC";
function U(e) {
  const t = Ls(`${e}T00:00:00.000Z`);
  return Ni(t, Si);
}
function G(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Nt() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Oi(e, t, n) {
  const r = U(e);
  let s;
  switch (t) {
    case "day":
      s = Ne(r, n);
      break;
    case "week":
      s = tn(r, n);
      break;
    case "month":
      s = Ye(r, n);
      break;
    case "quarter":
      s = Bn(r, n);
      break;
    default:
      s = r;
  }
  return G(s);
}
function Ci(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = U(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Ne(s, 1), r.includes(s.getDay()) || o++;
    return G(s);
  } else
    return Oi(e, t, n - 1);
}
function Ti(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = U(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Ne(s, -1), r.includes(s.getDay()) || o++;
    return G(s);
  } else {
    const s = U(e);
    let o;
    switch (t) {
      case "day":
        o = Ne(s, -(n - 1));
        break;
      case "week":
        o = tn(s, -(n - 1));
        break;
      case "month":
        o = Ye(s, -(n - 1));
        break;
      case "quarter":
        o = Bn(s, -(n - 1));
        break;
      default:
        o = s;
    }
    return G(o);
  }
}
function br(e, t, n, r) {
  const s = U(e), o = U(t);
  if (s > o) return 0;
  if (n === "day" && r.length > 0)
    return Zn({ start: s, end: o }).filter(
      (c) => !r.includes(c.getDay())
    ).length;
  switch (n) {
    case "day":
      return Rn(o, s) + 1;
    case "week":
      return $r(o, s) + 1;
    case "month":
      return Ln(o, s) + 1;
    case "quarter":
      return Ur(o, s) + 1;
    default:
      return 1;
  }
}
function Wi(e, t, n) {
  const r = U(e), s = U(t);
  if (r > s) return [];
  const o = Zn({ start: r, end: s });
  return n.length === 0 ? o.map(G) : o.filter((a) => !n.includes(a.getDay())).map(G);
}
function Yn(e, t, n = "day", r = [], s, o, a, i, c) {
  const f = br(
    e,
    t,
    n,
    r
  ), p = Wi(
    e,
    t,
    r
  ), d = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: f,
    excludedWeekdays: r,
    includedDatesUtc: p
  };
  return s !== void 0 && (d.excludeEnabled = s), o && (d.excludeFilterTypes = o), a && (d.excludedSpecificDates = a), i && (d.excludedSavedDates = i), c && (d.excludedDateRanges = c), d;
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
  const c = o.toString().padStart(2, "0"), f = a.toString().padStart(2, "0");
  return `${i}-${c}-${f}`;
}
function Yi(e) {
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
function Ei() {
  const e = Nt(), t = U(e);
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
        const n = G(Ne(t, -1));
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
          weekStartsOn: Jt
        }), r = Ne(n, 6);
        return {
          startDateUtc: G(n),
          endDateUtc: G(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = te(t);
        return {
          startDateUtc: G(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = rn(t);
        return {
          startDateUtc: G(n),
          endDateUtc: e
        };
      }
    }
  };
}
const _i = "DateRangePickerDB", Ii = 1, xe = "savedDateRanges";
class Fi {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(_i, Ii);
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
const et = new Fi(), Vt = "savedDateRanges";
function Pi({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n
}) {
  const [r, s] = A([]), [o, a] = A(!1), [i, c] = A(""), [f, p] = A(!1);
  We(() => {
    (async () => {
      await et.init();
      const w = await et.getData(Vt);
      w && s(w);
    })();
  }, []);
  const d = Ei(), y = (h) => {
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
    s(w), await et.saveData(Vt, w), c(""), a(!1);
  }, D = async (h) => {
    const w = r.filter((b) => b.id !== h);
    s(w), await et.saveData(Vt, w);
  }, M = (h) => {
    t ? t(h.selection) : e(h.selection.startDateUtc, h.selection.endDateUtc);
  }, k = (h, w) => {
    const b = (S) => (/* @__PURE__ */ new Date(S + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return h === w ? b(h) : `${b(h)} - ${b(w)}`;
  };
  return /* @__PURE__ */ x("div", { className: "w-72 bg-white border-r border-gray-200 py-4 flex flex-col ", children: [
    /* @__PURE__ */ x("div", { className: "mb-3 px-4 flex-shrink-0", children: [
      /* @__PURE__ */ u("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ u("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
      /* @__PURE__ */ u("div", { className: "", children: Object.values(d).map((h) => {
        const { startDateUtc: w, endDateUtc: b } = h.getValue();
        return /* @__PURE__ */ x(
          "button",
          {
            onClick: () => y(h.getValue),
            className: "w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all",
            children: [
              /* @__PURE__ */ u("div", { className: "text-sm font-semibold text-gray-900", children: h.label }),
              /* @__PURE__ */ u("div", { className: "text-xs text-gray-600 leading-relaxed mt-0.5", children: k(w, b) })
            ]
          },
          h.label
        );
      }) })
    ] }),
    /* @__PURE__ */ x("div", { className: "flex flex-col flex-1 min-h-0 border-t border-gray-200 px-4", children: [
      /* @__PURE__ */ u("div", { className: "flex items-center justify-between mb-2 flex-shrink-0 mt-3", children: /* @__PURE__ */ x("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ u("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Saved Dates" }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => p(!f),
            className: "text-gray-400 hover:text-gray-600",
            children: /* @__PURE__ */ u(Ja, { className: "w-3 h-3" })
          }
        )
      ] }) }),
      f && /* @__PURE__ */ u("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
      r.length === 0 ? /* @__PURE__ */ u("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ u("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: r.map((h) => /* @__PURE__ */ u(
        "div",
        {
          className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
          children: /* @__PURE__ */ x("div", { className: "flex items-start justify-between px-3 py-2", children: [
            /* @__PURE__ */ x(
              "button",
              {
                onClick: () => M(h),
                className: "flex-1 text-left",
                children: [
                  /* @__PURE__ */ u("div", { className: "text-sm font-semibold text-gray-900 mb-1", children: h.label }),
                  /* @__PURE__ */ u("div", { className: "text-xs text-gray-600 leading-relaxed", children: k(
                    h.selection.startDateUtc,
                    h.selection.endDateUtc
                  ) }),
                  (h.selection.excludedWeekdays?.length > 0 || h.selection.excludedSpecificDates && h.selection.excludedSpecificDates.length > 0 || h.selection.excludedSavedDates && h.selection.excludedSavedDates.length > 0 || h.selection.excludedDateRanges && h.selection.excludedDateRanges.length > 0) && /* @__PURE__ */ x("div", { className: "text-xs text-gray-500 mt-1 space-y-0.5", children: [
                    h.selection.excludedWeekdays?.length > 0 && /* @__PURE__ */ x("div", { children: [
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
                    h.selection.excludedSpecificDates && h.selection.excludedSpecificDates.length > 0 && /* @__PURE__ */ x("div", { children: [
                      "Specific Dates:",
                      " ",
                      h.selection.excludedSpecificDates.length
                    ] }),
                    h.selection.excludedSavedDates && h.selection.excludedSavedDates.length > 0 && /* @__PURE__ */ x("div", { children: [
                      "Saved: ",
                      h.selection.excludedSavedDates.length
                    ] }),
                    h.selection.excludedDateRanges && h.selection.excludedDateRanges.length > 0 && /* @__PURE__ */ x("div", { children: [
                      "Ranges:",
                      " ",
                      h.selection.excludedDateRanges.length
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: () => D(h.id),
                className: "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2",
                children: /* @__PURE__ */ u(ri, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        },
        h.id
      )) }),
      /* @__PURE__ */ x(
        "button",
        {
          onClick: () => a(!0),
          className: "w-full flex-shrink-0 px-3 py-2 text-[#003DB8] opacity-50 hover:opacity-100 text-sm font-medium rounded-mdtransition-colors flex items-center justify-center gap-2 mt-auto",
          children: [
            /* @__PURE__ */ u(ti, { className: "w-4 h-4" }),
            "Save selected date"
          ]
        }
      )
    ] }),
    o && /* @__PURE__ */ x(ct, { children: [
      /* @__PURE__ */ u(
        "div",
        {
          className: "fixed inset-0 bg-black/30 z-50",
          onClick: () => a(!1)
        }
      ),
      /* @__PURE__ */ u("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ x("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
        /* @__PURE__ */ u("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
        /* @__PURE__ */ x("div", { className: "mb-2", children: [
          /* @__PURE__ */ u("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "text",
              value: i,
              onChange: (h) => c(h.target.value),
              placeholder: "e.g., Q1 2025, Holiday Period",
              className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              autoFocus: !0,
              onKeyDown: (h) => {
                h.key === "Enter" && m();
              }
            }
          )
        ] }),
        /* @__PURE__ */ x("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
          /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("strong", { children: "Range:" }),
            " ",
            k(
              n.startDateUtc,
              n.endDateUtc
            )
          ] }),
          /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("strong", { children: "Duration:" }),
            " ",
            n.duration,
            " ",
            n.unit,
            "(s)"
          ] }),
          n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("strong", { children: "Excluded Days:" }),
            " ",
            n.excludedWeekdays.map(
              (h) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][h]
            ).join(", ")
          ] }),
          n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("strong", { children: "Excluded Specific Dates:" }),
            " ",
            n.excludedSpecificDates.length,
            " date(s)"
          ] }),
          n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("strong", { children: "Excluded Saved Dates:" }),
            " ",
            n.excludedSavedDates.length,
            " saved date(s)"
          ] }),
          n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("strong", { children: "Excluded Date Ranges:" }),
            " ",
            n.excludedDateRanges.length,
            " range(s)"
          ] })
        ] }),
        /* @__PURE__ */ x("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onClick: () => a(!1),
              className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ u(
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
const Ui = [
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
function $i({
  selectedRange: e,
  onSelect: t
}) {
  const n = ne(e.from), [r, s] = A(n);
  U(Nt());
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
    const m = Ve(e.from), D = ne(e.from), M = Ve(e.to), k = ne(e.to), h = d * 12 + y, w = D * 12 + m, b = k * 12 + M;
    return h >= w && h <= b;
  }, i = (d, y) => {
    if (!e.from) return !1;
    const m = Ve(e.from), D = ne(e.from);
    return d === D && y === m;
  }, c = (d, y) => {
    if (!e.to) return !1;
    const m = Ve(e.to), D = ne(e.to);
    return d === D && y === m;
  }, f = (d, y) => !1, p = (d) => /* @__PURE__ */ x("div", { className: "flex-1", children: [
    /* @__PURE__ */ u("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ u("div", { className: "grid grid-cols-4 gap-2", children: Ui.map((y, m) => {
      const D = a(d, m), M = i(d, m), k = c(d, m), h = M || k, w = f();
      return /* @__PURE__ */ u(
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
  return /* @__PURE__ */ x("div", { className: "w-full", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ u(hr, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ x("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ u(mr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex gap-8", children: [
      p(r),
      p(r + 1)
    ] })
  ] });
}
const Bi = ["Q1", "Q2", "Q3", "Q4"];
function Ai({
  selectedRange: e,
  onSelect: t
}) {
  const n = ne(e.from), [r, s] = A(n);
  U(Nt());
  const o = (d, y) => {
    const m = Ar(
      io(ht(/* @__PURE__ */ new Date(), d), y + 1)
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
    const m = vt(e.from) - 1, D = ne(e.from), M = vt(e.to) - 1, k = ne(e.to), h = d * 4 + y, w = D * 4 + m, b = k * 4 + M;
    return h >= w && h <= b;
  }, i = (d, y) => {
    if (!e.from) return !1;
    const m = vt(e.from) - 1, D = ne(e.from);
    return d === D && y === m;
  }, c = (d, y) => {
    if (!e.to) return !1;
    const m = vt(e.to) - 1, D = ne(e.to);
    return d === D && y === m;
  }, f = (d, y) => !1, p = (d) => /* @__PURE__ */ x("div", { className: "flex-1", children: [
    /* @__PURE__ */ u("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ u("div", { className: "grid grid-cols-2 gap-3", children: Bi.map((y, m) => {
      const D = a(d, m), M = i(d, m), k = c(d, m), h = M || k, w = f();
      return /* @__PURE__ */ u(
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
  return /* @__PURE__ */ x("div", { className: "w-full", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ u(hr, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ x("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ u(mr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex gap-8", children: [
      p(r),
      p(r + 1)
    ] })
  ] });
}
function En({
  value: e,
  onChange: t,
  placeholder: n = "DD/MM/YYYY",
  className: r = ""
}) {
  const s = ke(null), [o, a] = A(""), i = ke(0), c = (m) => {
    if (!m || m.length !== 10) return "";
    const [D, M, k] = m.split("-");
    return `${k}/${M}/${D}`;
  }, f = (m) => {
    const D = m.replace(/\D/g, "");
    if (D.length !== 8) return null;
    const M = D.substring(0, 2), k = D.substring(2, 4), h = D.substring(4, 8), w = parseInt(k, 10), b = parseInt(M, 10), S = parseInt(h, 10);
    return w < 1 || w > 12 || b < 1 || b > 31 || S < 1900 || S > 2100 ? null : `${h}-${k}-${M}`;
  };
  return We(() => {
    a(c(e));
  }, [e]), /* @__PURE__ */ u(
    "input",
    {
      ref: s,
      type: "text",
      value: o,
      onChange: (m) => {
        const D = m.target.value, M = m.target.selectionStart || 0, k = o;
        if (D.length < k.length) {
          if (D.replace(/\D/g, "").length < k.replace(/\D/g, "").length) {
            const S = D.replace(/\D/g, "");
            let g = "";
            if (S.length > 0 && (g = S.substring(0, 2), S.length > 2 && (g += "/" + S.substring(2, 4)), S.length > 4 && (g += "/" + S.substring(4, 8))), a(g), setTimeout(() => {
              if (s.current) {
                const C = Math.min(M, g.length);
                s.current.setSelectionRange(C, C);
              }
            }, 0), S.length === 8) {
              const C = f(g);
              C && t(C);
            }
          } else
            a(k), setTimeout(() => {
              s.current && s.current.setSelectionRange(M, M);
            }, 0);
          return;
        }
        const h = D.replace(/\D/g, "");
        let w = "";
        if (h.length > 0) {
          let S = h.substring(0, 2);
          if (S.length === 2) {
            const g = parseInt(S, 10);
            g > 31 ? S = "31" : g < 1 && S.length === 2 && (S = "01");
          }
          if (w = S, h.length > 2) {
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
        let b = M;
        if (w.length > k.length) {
          const S = w.length - k.length;
          b = M + S;
        }
        if (w[b] === "/" && b++, setTimeout(() => {
          if (s.current) {
            const S = Math.min(b, w.length);
            s.current.setSelectionRange(S, S);
          }
        }, 0), h.length === 8) {
          const S = f(w);
          S && t(S);
        }
      },
      onBlur: () => {
        if (o) {
          const m = f(o);
          m ? (t(m), a(c(m))) : a(c(e));
        }
      },
      onKeyDown: (m) => {
        const D = s.current;
        if (!D) return;
        const M = D.selectionStart || 0;
        if (i.current = M, m.key === "ArrowLeft" || m.key === "ArrowRight") {
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
          if (o[M] === "/") {
            m.preventDefault();
            const k = o.substring(0, M) + m.key + o.substring(M + 1);
            a(k), setTimeout(() => {
              if (s.current) {
                const h = M + 1;
                s.current.setSelectionRange(h, h);
              }
            }, 0);
            return;
          }
          if (M >= 3 && M <= 5) {
            const h = o.replace(/\D/g, "").substring(2, 4), w = h.length === 1 ? h : "", b = m.key;
            if (h.length === 1 && M === 5) {
              const S = parseInt(w + b, 10);
              if ((S === 0 || S > 12) && (m.preventDefault(), S > 12)) {
                const g = o.substring(0, 3) + w + "2" + o.substring(5);
                a(g), setTimeout(() => {
                  s.current && s.current.setSelectionRange(6, 6);
                }, 0);
              }
            }
          }
          if (M >= 0 && M <= 2) {
            const h = o.replace(/\D/g, "").substring(0, 2), w = h.length === 1 ? h : "", b = m.key;
            if (h.length === 1 && M === 1) {
              const S = parseInt(w + b, 10);
              if ((S === 0 || S > 31) && (m.preventDefault(), S > 31)) {
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
const Hi = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], Ri = [
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
  const r = Nt(), [s, o] = A(
    e?.unit || "day"
  ), [a, i] = A(
    e?.startDateUtc || r
  ), [c, f] = A(
    e?.endDateUtc || r
  ), [p, d] = A(e?.duration || 1), [y, m] = A(
    e?.excludedWeekdays || []
  ), [D, M] = A(
    []
  ), k = ke(null), [h, w] = A(0), [b, S] = A(!1), [g, C] = A([]), [E, B] = A(!1), [H, X] = A(null), [Z, re] = A([]), [se, fe] = A([]), [he, Oe] = A(
    void 0
  ), Re = ke(null), [ee, le] = A([]), [L, J] = A(() => e?.startDateUtc ? te(U(e.startDateUtc)) : te(U(r))), [pe, we] = A(null), [Ce, Te] = A(() => e?.startDateUtc ? ne(U(e.startDateUtc)) : ne(U(r))), [Pe, Ue] = A(null), [qe, be] = A(() => {
    if (e?.startDateUtc) {
      const v = ne(U(e.startDateUtc));
      return Math.floor(v / 10) * 10;
    }
    const l = ne(U(r));
    return Math.floor(l / 10) * 10;
  });
  We(() => {
    if (a && c) {
      const l = br(
        a,
        c,
        s,
        y
      );
      d(l);
    } else
      d(1);
  }, [a, c, s, y]), We(() => {
    if (k.current) {
      const v = document.createElement("canvas").getContext("2d");
      if (v) {
        v.font = "14px system-ui, -apple-system, sans-serif";
        const j = v.measureText(p.toString()).width;
        w(12 + j + 4);
      }
    }
  }, [p]), We(() => {
    const l = (v) => {
      Re.current && !Re.current.contains(v.target) && B(!1);
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, []), We(() => {
    (async () => {
      await et.init();
      const v = await et.getData("savedDateRanges");
      v && le(v);
    })();
  }, []);
  const St = (l) => {
    i(l), l && c && U(l) > U(c) && f(l), l && J(te(U(l)));
  }, Ot = (l) => {
    f(l), l && a && U(l) < U(a) && i(l), l && J(te(U(l)));
  }, tt = !Je, Ct = (l) => {
    if (!(l <= 0)) {
      if (d(l), a) {
        const v = Ci(
          a,
          s,
          l,
          y
        );
        f(v), J(te(U(v)));
      } else if (c) {
        const v = Ti(
          c,
          s,
          l,
          y
        );
        i(v), J(te(U(v)));
      }
    }
  }, pt = (l) => {
    o(l);
  }, Tt = (l) => {
    y.includes(l) ? m(y.filter((v) => v !== l)) : m([...y, l]);
  }, Wt = (l, v) => {
    i(l), f(v), l && J(te(U(l)));
  }, Yt = (l) => {
    i(l.startDateUtc), f(l.endDateUtc), o(l.unit), m(l.excludedWeekdays), d(l.duration), l.excludeEnabled !== void 0 && S(l.excludeEnabled), l.excludeFilterTypes ? C(l.excludeFilterTypes) : C([]), l.excludedSpecificDates ? M(l.excludedSpecificDates) : M([]), l.excludedSavedDates ? re(l.excludedSavedDates) : re([]), l.excludedDateRanges ? fe(l.excludedDateRanges) : fe([]), l.startDateUtc && J(te(U(l.startDateUtc)));
  }, Et = () => {
    i(r), f(r), m([]), J(te(U(r)));
  }, _t = () => {
    i(""), f(""), d(1), o("day"), m([]), S(!1), C([]), M([]), re([]), fe([]), Oe(void 0), X(null), J(te(U(r)));
  }, nt = !a || a.trim() === "" || !c || c.trim() === "", It = () => {
    if (nt)
      return;
    const l = Yn(
      a,
      c,
      s,
      y,
      b,
      g,
      D,
      Z,
      se
    );
    t(l);
  }, me = (l) => {
    if (l?.from) {
      const v = G(l.from);
      if (i(v), l?.to) {
        const j = G(l.to);
        f(j);
      } else
        f(v);
    }
  }, Ge = (l) => {
    if (l && l.from) {
      const v = Ie(l.from, {
        weekStartsOn: Jt
      }), j = Ne(v, 6);
      if (l.to) {
        const $ = Ie(l.to, {
          weekStartsOn: Jt
        }), W = Ne($, 6);
        me({ from: v, to: W });
      } else
        me({ from: v, to: j });
    }
  }, Ke = U(r), $e = {
    from: a ? U(a) : void 0,
    to: c ? U(c) : void 0
  }, bt = {
    from: a ? U(a) : Ke,
    to: c ? U(c) : Ke
  }, je = (l) => {
    const v = !Je, j = b && g.includes("days") && y.includes(l.getDay()), $ = b && g.includes("specific-date") && D.includes(G(l)), W = b && g.includes("saved-dates") && Z.some((T) => {
      const O = ee.find((Q) => Q.id === T);
      if (!O) return !1;
      const F = G(l);
      if (!(F >= O.selection.startDateUtc && F <= O.selection.endDateUtc)) return !1;
      if (O.selection.excludedWeekdays && O.selection.excludedWeekdays.length > 0 && O.selection.excludedWeekdays.includes(l.getDay()) || O.selection.excludedSpecificDates && O.selection.excludedSpecificDates.length > 0 && O.selection.excludedSpecificDates.includes(F) || O.selection.excludedSavedDates && O.selection.excludedSavedDates.some(
        (ce) => {
          const q = ee.find(
            (z) => z.id === ce
          );
          return q ? F >= q.selection.startDateUtc && F <= q.selection.endDateUtc : !1;
        }
      ))
        return !0;
      let ie = !1;
      return !!(O.selection.excludedDateRanges && (ie = O.selection.excludedDateRanges.some(
        (Q) => F >= Q.start && F <= Q.end
      ), ie));
    }), _ = b && g.includes("date-range") && se.some((T) => {
      const O = G(l);
      return O >= T.start && O <= T.end;
    });
    return v || j || $ || W || _;
  }, Ft = (l, v) => {
    const j = te(
      ft(ht(/* @__PURE__ */ new Date(), l), v)
    );
    J(j), we(null), Te(l);
  }, Pt = (l) => {
    const v = Ve(L), j = te(
      ft(ht(/* @__PURE__ */ new Date(), l), v)
    );
    J(j), Ue(null), be(Math.floor(l / 10) * 10);
  };
  We(() => {
    pe === null && Te(ne(L));
  }, [L, pe]);
  const Dt = (l) => {
    const v = l - 1, j = l + 10, $ = ne(L), W = [];
    for (let _ = v; _ <= j; _++)
      W.push(_);
    return /* @__PURE__ */ x("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => be(qe - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ u("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ x("div", { className: "text-lg font-semibold", children: [
          l,
          "-",
          l + 9
        ] }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => be(qe + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ u("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ u("div", { className: "grid grid-cols-3 gap-2 w-full", children: W.map((_) => {
        const T = !Je, O = _ < l || _ > l + 9;
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => Pt(_),
            disabled: T,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${O ? "opacity-50 bg-gray-50 text-gray-500" : $ === _ ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: _
          },
          _
        );
      }) })
    ] });
  }, wt = (l) => /* @__PURE__ */ x("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => Te(Ce - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ u("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ u("div", { className: "text-lg font-semibold", children: l }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => Te(Ce + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ u("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ u("div", { className: "grid grid-cols-3 gap-2 w-full", children: Ri.map((v, j) => {
      const $ = !Je, W = ne(L) === l && Ve(L) === j;
      return /* @__PURE__ */ u(
        "button",
        {
          onClick: () => Ft(l, j),
          disabled: $,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${W ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: v
        },
        v
      );
    }) })
  ] }), Le = ke(null), rt = ke(null);
  return We(() => {
    if (s !== "day") return;
    const l = ($, W) => {
      const _ = $.querySelector(
        "span[data-month-name]"
      ), T = $.querySelector(
        "span[data-year-name]"
      );
      if (_) {
        const Q = $.textContent || "";
        $.style.gap = "6px";
        let ce = "";
        if (T)
          ce = T.textContent || "";
        else {
          const q = Q.match(/\d{4}/);
          q && (ce = q[0]);
        }
        if (!T && ce) {
          const q = document.createElement("span");
          q.textContent = ce, q.setAttribute("data-year-name", "true"), q.style.cursor = "pointer", q.onclick = (ge) => {
            ge.stopPropagation(), ge.preventDefault();
            const xt = parseInt(ce, 10);
            if (!isNaN(xt)) {
              const Ze = Math.floor(xt / 10) * 10;
              be(Ze), Ue(W), we(null);
            }
          };
          const z = _.nextSibling;
          if (z && z.nodeType === Node.TEXT_NODE)
            z.parentNode?.insertBefore(q, z.nextSibling);
          else {
            const ge = document.createTextNode(" ");
            $.appendChild(ge), $.appendChild(q);
          }
        } else T && (T.onclick = (q) => {
          q.stopPropagation(), q.preventDefault();
          const z = parseInt(ce, 10);
          if (!isNaN(z)) {
            const ge = Math.floor(z / 10) * 10;
            be(ge), Ue(W), we(null);
          }
        });
        _.onclick = (q) => {
          q.stopPropagation(), q.preventDefault();
          const z = parseInt(ce, 10);
          isNaN(z) || (Te(z), we(W), Ue(null));
        };
        return;
      }
      const O = $.textContent || "", F = O.trim().split(/\s+/);
      let I = "", ie = "";
      if (F.length >= 2)
        I = F[0], ie = F[1];
      else if (F.length === 1) {
        const Q = O.match(/^([A-Za-z]+)(\d{4})$/);
        if (Q)
          I = Q[1], ie = Q[2];
        else
          return;
      } else
        return;
      if (I && ie) {
        const Q = $.firstChild;
        if ($.style.gap = "6px", Q && Q.nodeType === Node.TEXT_NODE && (Q.textContent || "").indexOf(I) !== -1) {
          const z = document.createElement("span");
          z.textContent = I, z.setAttribute("data-month-name", "true"), z.style.cursor = "pointer", z.onclick = (Ze) => {
            Ze.stopPropagation(), Ze.preventDefault();
            const st = parseInt(ie, 10);
            isNaN(st) || (Te(st), we(W), Ue(null));
          };
          const ge = document.createElement("span");
          ge.textContent = ie, ge.setAttribute("data-year-name", "true"), ge.style.cursor = "pointer", ge.onclick = (Ze) => {
            Ze.stopPropagation(), Ze.preventDefault();
            const st = parseInt(ie, 10);
            if (!isNaN(st)) {
              const Dr = Math.floor(st / 10) * 10;
              be(Dr), Ue(W), we(null);
            }
          }, $.innerHTML = "", $.appendChild(z);
          const xt = document.createTextNode(" ");
          $.appendChild(xt), $.appendChild(ge);
        }
      }
    }, v = ($, W) => {
      if (!$) return;
      $.querySelectorAll(".rdp-caption_label").forEach((T, O) => {
        const F = T, I = W !== null ? W : O === 0 ? 0 : 1;
        pe === I || Pe === I || l(F, I);
      });
    }, j = setTimeout(() => {
      pe === null && Pe === null ? v(Le.current, null) : (v(Le.current, 0), v(rt.current, 1));
    }, 150);
    return () => clearTimeout(j);
  }, [s, L, pe, Pe]), /* @__PURE__ */ x("div", { className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-h-[85vh]", children: [
    /* @__PURE__ */ u(
      Pi,
      {
        onPresetSelect: Wt,
        onSavedDateSelect: Yt,
        currentSelection: Yn(
          a,
          c,
          s,
          y,
          b,
          g,
          D,
          Z,
          se
        )
      }
    ),
    /* @__PURE__ */ x("div", { className: "flex-1 flex flex-col min-h-0", children: [
      /* @__PURE__ */ x("div", { className: "px-6 pt-6 overflow-y-auto flex-1", children: [
        /* @__PURE__ */ u("div", { className: "flex gap-2 mb-4", children: ["day", "week", "month", "quarter"].map(
          (l) => /* @__PURE__ */ u(
            "button",
            {
              onClick: () => pt(l),
              className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${s === l ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
              children: l.charAt(0).toUpperCase() + l.slice(1)
            },
            l
          )
        ) }),
        /* @__PURE__ */ x("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
          /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Start Date" }),
            /* @__PURE__ */ u(
              En,
              {
                value: a,
                onChange: St,
                placeholder: "DD/MM/YYYY",
                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "End Date" }),
            /* @__PURE__ */ u(
              En,
              {
                value: c,
                onChange: Ot,
                placeholder: "DD/MM/YYYY",
                className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ u("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Duration" }),
            /* @__PURE__ */ x("div", { className: "relative", children: [
              /* @__PURE__ */ u(
                "input",
                {
                  ref: k,
                  type: "number",
                  min: "1",
                  value: p,
                  onChange: (l) => Ct(Number(l.target.value)),
                  className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                }
              ),
              /* @__PURE__ */ u(
                "span",
                {
                  className: "absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none",
                  style: { left: `${h}px` },
                  children: Yi(s)
                }
              )
            ] })
          ] })
        ] }),
        tt,
        /* @__PURE__ */ x("div", { className: "mb-4", children: [
          /* @__PURE__ */ x("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ u(
              "input",
              {
                type: "checkbox",
                id: "exclude-checkbox",
                checked: b,
                onChange: (l) => S(l.target.checked),
                className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ u(
              "label",
              {
                htmlFor: "exclude-checkbox",
                className: "text-sm text-gray-700",
                children: "exclude from selection"
              }
            ),
            /* @__PURE__ */ x("div", { className: "relative flex-1", ref: Re, children: [
              /* @__PURE__ */ u(
                "button",
                {
                  type: "button",
                  onClick: () => b && B(!E),
                  disabled: !b,
                  className: "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                  children: /* @__PURE__ */ u(
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
              /* @__PURE__ */ u(Va, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }),
              E && b && /* @__PURE__ */ u("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", children: /* @__PURE__ */ x("div", { className: "p-2 space-y-1", children: [
                /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "checkbox",
                      checked: g.includes("days"),
                      onChange: (l) => {
                        l.target.checked ? C([
                          ...g,
                          "days"
                        ]) : C(
                          g.filter((v) => v !== "days")
                        );
                      },
                      className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ u("span", { className: "text-sm text-gray-700", children: "Days" })
                ] }),
                /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "checkbox",
                      checked: g.includes("specific-date"),
                      onChange: (l) => {
                        l.target.checked ? C([
                          ...g,
                          "specific-date"
                        ]) : C(
                          g.filter(
                            (v) => v !== "specific-date"
                          )
                        );
                      },
                      className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ u("span", { className: "text-sm text-gray-700", children: "Specific Date" })
                ] }),
                /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "checkbox",
                      checked: g.includes("saved-dates"),
                      onChange: (l) => {
                        l.target.checked ? C([
                          ...g,
                          "saved-dates"
                        ]) : C(
                          g.filter(
                            (v) => v !== "saved-dates"
                          )
                        );
                      },
                      className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ u("span", { className: "text-sm text-gray-700", children: "Saved Dates" })
                ] }),
                /* @__PURE__ */ x("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "checkbox",
                      checked: g.includes("date-range"),
                      onChange: (l) => {
                        l.target.checked ? C([
                          ...g,
                          "date-range"
                        ]) : C(
                          g.filter(
                            (v) => v !== "date-range"
                          )
                        );
                      },
                      className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ u("span", { className: "text-sm text-gray-700", children: "Date Range" })
                ] })
              ] }) })
            ] })
          ] }),
          b && g.length > 0 && /* @__PURE__ */ x("div", { className: "flex gap-2 items-center", children: [
            g.includes("days") && /* @__PURE__ */ x(
              "button",
              {
                onClick: () => X(
                  H === "days" ? null : "days"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "days" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ u(jt, { className: "w-4 h-4" }),
                  /* @__PURE__ */ x("span", { children: [
                    "Days (",
                    y.length,
                    " selected)"
                  ] })
                ]
              }
            ),
            g.includes("specific-date") && /* @__PURE__ */ x(
              "button",
              {
                onClick: () => X(
                  H === "specific-date" ? null : "specific-date"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "specific-date" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ u(jt, { className: "w-4 h-4" }),
                  /* @__PURE__ */ x("span", { children: [
                    "Dates (",
                    D.length,
                    " selected)"
                  ] })
                ]
              }
            ),
            g.includes("saved-dates") && /* @__PURE__ */ x(
              "button",
              {
                onClick: () => X(
                  H === "saved-dates" ? null : "saved-dates"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "saved-dates" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ u(Za, { className: "w-4 h-4" }),
                  /* @__PURE__ */ x("span", { children: [
                    "Saved (",
                    Z.length,
                    " selected)"
                  ] })
                ]
              }
            ),
            g.includes("date-range") && /* @__PURE__ */ x(
              "button",
              {
                onClick: () => X(
                  H === "date-range" ? null : "date-range"
                ),
                className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${H === "date-range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                children: [
                  /* @__PURE__ */ u(jt, { className: "w-4 h-4" }),
                  /* @__PURE__ */ x("span", { children: [
                    "Date Ranges (",
                    se.length,
                    " selected)"
                  ] })
                ]
              }
            )
          ] }),
          b && H === "days" && g.includes("days") && /* @__PURE__ */ u("div", { className: "mt-3 flex gap-2", children: Hi.map((l) => /* @__PURE__ */ u(
            "button",
            {
              onClick: () => Tt(l.value),
              className: `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${y.includes(l.value) ? "bg-red-100 text-red-700 border-2 border-red-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: l.label
            },
            l.value
          )) }),
          b && H === "specific-date" && g.includes("specific-date") && /* @__PURE__ */ x("div", { className: "mt-3 flex flex-col gap-3", children: [
            /* @__PURE__ */ u("p", { className: "text-xs text-gray-500 text-center mb-2", children: "Click individual dates to exclude them" }),
            /* @__PURE__ */ u("div", { className: "flex justify-center p-4 border border-gray-200 rounded-md bg-gray-50", children: /* @__PURE__ */ u(
              Ae,
              {
                mode: "multiple",
                selected: D.map((l) => U(l)),
                onSelect: (l) => {
                  l && M(
                    l.map((v) => G(v))
                  );
                },
                numberOfMonths: 2,
                modifiersClassNames: {
                  selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                }
              }
            ) }),
            D.length > 0 && /* @__PURE__ */ u("div", { className: "flex flex-wrap gap-2", children: D.map((l) => /* @__PURE__ */ x(
              "div",
              {
                className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                children: [
                  /* @__PURE__ */ u("span", { children: (/* @__PURE__ */ new Date(l + "T00:00:00")).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    }
                  ) }),
                  /* @__PURE__ */ u(
                    "button",
                    {
                      onClick: () => {
                        M(
                          D.filter((v) => v !== l)
                        );
                      },
                      className: "hover:bg-red-200 rounded-full p-0.5",
                      children: /* @__PURE__ */ u(xn, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              l
            )) })
          ] }),
          b && H === "saved-dates" && g.includes("saved-dates") && /* @__PURE__ */ u("div", { className: "mt-3 flex flex-col gap-3", children: ee.length === 0 ? /* @__PURE__ */ u("p", { className: "text-sm text-gray-500 text-center py-4", children: "No saved dates available" }) : /* @__PURE__ */ u("div", { className: "space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2", children: ee.map((l) => {
            const v = Z.includes(
              l.id
            );
            return /* @__PURE__ */ x(
              "div",
              {
                className: `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${v ? "bg-red-50 border border-red-300" : "bg-white hover:bg-gray-50 border border-gray-200"}`,
                onClick: () => {
                  re(
                    v ? Z.filter(
                      (j) => j !== l.id
                    ) : [
                      ...Z,
                      l.id
                    ]
                  );
                },
                children: [
                  /* @__PURE__ */ x("div", { className: "flex-1", children: [
                    /* @__PURE__ */ u("div", { className: "text-sm font-medium text-gray-900", children: l.label }),
                    /* @__PURE__ */ x("div", { className: "text-xs text-gray-600", children: [
                      (/* @__PURE__ */ new Date(
                        l.selection.startDateUtc + "T00:00:00"
                      )).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }),
                      " ",
                      "-",
                      " ",
                      (/* @__PURE__ */ new Date(
                        l.selection.endDateUtc + "T00:00:00"
                      )).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    ] })
                  ] }),
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "checkbox",
                      checked: v,
                      onChange: () => {
                      },
                      className: "w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    }
                  )
                ]
              },
              l.id
            );
          }) }) }),
          b && H === "date-range" && g.includes("date-range") && /* @__PURE__ */ x("div", { className: "mt-3 flex flex-col gap-3", children: [
            /* @__PURE__ */ u("div", { className: "border border-gray-200 rounded-md bg-gray-50 p-4", children: /* @__PURE__ */ u(
              Ae,
              {
                mode: "range",
                selected: he,
                onSelect: (l) => Oe(l),
                numberOfMonths: 2,
                disabled: (l) => !Je,
                modifiersClassNames: {
                  selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                }
              }
            ) }),
            he?.from && he?.to && /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => {
                    const l = {
                      id: `range-${Date.now()}`,
                      start: G(he.from),
                      end: G(he.to)
                    };
                    fe([
                      ...se,
                      l
                    ]), Oe(void 0);
                  },
                  className: "px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors",
                  children: "Add Date Range"
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => Oe(void 0),
                  className: "px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors",
                  children: "Clear Selection"
                }
              )
            ] }),
            se.length > 0 && /* @__PURE__ */ x("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ u("p", { className: "text-xs text-gray-600 font-medium", children: "Excluded Date Ranges:" }),
              /* @__PURE__ */ u("div", { className: "flex flex-wrap gap-2", children: se.map((l) => /* @__PURE__ */ x(
                "div",
                {
                  className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                  children: [
                    /* @__PURE__ */ x("span", { children: [
                      (/* @__PURE__ */ new Date(
                        l.start + "T00:00:00"
                      )).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }),
                      " - ",
                      (/* @__PURE__ */ new Date(
                        l.end + "T00:00:00"
                      )).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })
                    ] }),
                    /* @__PURE__ */ u(
                      "button",
                      {
                        onClick: () => {
                          fe(
                            se.filter(
                              (v) => v.id !== l.id
                            )
                          );
                        },
                        className: "hover:bg-red-200 rounded-full p-0.5",
                        children: /* @__PURE__ */ u(xn, { className: "w-3 h-3" })
                      }
                    )
                  ]
                },
                l.id
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ x("div", { className: "flex gap-4 justify-center mb-4", children: [
          s === "day" && /* @__PURE__ */ u("div", { className: "flex gap-4", children: Pe !== null ? Pe === 0 ? (
            // When yearsViewIndex === 0, show years grid on left and single calendar on right
            /* @__PURE__ */ x(ct, { children: [
              /* @__PURE__ */ u(
                "div",
                {
                  className: "w-full flex-shrink-0",
                  style: { minWidth: "280px", maxWidth: "280px" },
                  children: Dt(qe)
                }
              ),
              /* @__PURE__ */ u("div", { ref: rt, children: /* @__PURE__ */ u(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: me,
                  month: te(Ye(L, 1)),
                  onMonthChange: (l) => {
                    const v = new Date(L), $ = new Date(l).getMonth() - v.getMonth();
                    $ !== 1 && $ !== -11 && J(
                      te(Ye(l, -1))
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
            /* @__PURE__ */ x(ct, { children: [
              /* @__PURE__ */ u("div", { ref: Le, children: /* @__PURE__ */ u(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: me,
                  month: L,
                  onMonthChange: J,
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
              /* @__PURE__ */ u(
                "div",
                {
                  className: "w-full flex-shrink-0",
                  style: { minWidth: "280px", maxWidth: "280px" },
                  children: Dt(qe)
                }
              )
            ] })
          ) : pe === null ? (
            // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
            /* @__PURE__ */ u("div", { ref: Le, children: /* @__PURE__ */ u(
              Ae,
              {
                mode: "range",
                navLayout: "around",
                selected: $e,
                onSelect: me,
                month: L,
                onMonthChange: J,
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
          ) : pe === 0 ? (
            // When monthsViewIndex === 0, show months grid on left and single calendar on right
            /* @__PURE__ */ x(ct, { children: [
              /* @__PURE__ */ u(
                "div",
                {
                  className: "w-full flex-shrink-0",
                  style: { minWidth: "280px", maxWidth: "280px" },
                  children: wt(Ce)
                }
              ),
              /* @__PURE__ */ u("div", { ref: rt, children: /* @__PURE__ */ u(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: me,
                  month: te(Ye(L, 1)),
                  onMonthChange: (l) => {
                    const v = new Date(L), $ = new Date(l).getMonth() - v.getMonth();
                    $ !== 1 && $ !== -11 && J(
                      te(Ye(l, -1))
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
            /* @__PURE__ */ x(ct, { children: [
              /* @__PURE__ */ u("div", { ref: Le, children: /* @__PURE__ */ u(
                Ae,
                {
                  mode: "range",
                  navLayout: "around",
                  selected: $e,
                  onSelect: me,
                  month: L,
                  onMonthChange: J,
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
              /* @__PURE__ */ u(
                "div",
                {
                  className: "w-full flex-shrink-0",
                  style: { minWidth: "280px", maxWidth: "280px" },
                  children: wt(Ce)
                }
              )
            ] })
          ) }),
          s === "week" && /* @__PURE__ */ u(
            Ae,
            {
              mode: "range",
              navLayout: "around",
              showWeekNumber: !0,
              locale: void 0,
              formatters: {
                formatWeekNumber: (l) => `W${String(l).padStart(2, "0")}`
              },
              selected: $e,
              onSelect: Ge,
              onWeekNumberClick: (l, v) => {
                v && v.length > 0 && Ge({
                  from: v[0],
                  to: v[v.length - 1]
                });
              },
              month: L,
              onMonthChange: J,
              numberOfMonths: 2,
              disabled: (l) => {
                const v = !Je, j = b && g.includes("days") && y.includes(l.getDay()), $ = b && g.includes("specific-date") && D.includes(G(l)), W = b && g.includes("saved-dates") && Z.some((T) => {
                  const O = ee.find(
                    (Q) => Q.id === T
                  );
                  if (!O) return !1;
                  const F = G(l);
                  if (!(F >= O.selection.startDateUtc && F <= O.selection.endDateUtc)) return !1;
                  if (O.selection.excludedWeekdays && O.selection.excludedWeekdays.length > 0 && O.selection.excludedWeekdays.includes(l.getDay()) || O.selection.excludedSpecificDates && O.selection.excludedSpecificDates.length > 0 && O.selection.excludedSpecificDates.includes(F) || O.selection.excludedSavedDates && O.selection.excludedSavedDates.some(
                    (ce) => {
                      const q = ee.find(
                        (z) => z.id === ce
                      );
                      return q ? F >= q.selection.startDateUtc && F <= q.selection.endDateUtc : !1;
                    }
                  ))
                    return !0;
                  let ie = !1;
                  return !!(O.selection.excludedDateRanges && (ie = O.selection.excludedDateRanges.some(
                    (Q) => F >= Q.start && F <= Q.end
                  ), ie));
                }), _ = b && g.includes("date-range") && se.some((T) => {
                  const O = G(l);
                  return O >= T.start && O <= T.end;
                });
                return v || j || $ || W || _;
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
          s === "month" && /* @__PURE__ */ u(
            $i,
            {
              selectedRange: bt,
              onSelect: me
            }
          ),
          s === "quarter" && /* @__PURE__ */ u(
            Ai,
            {
              selectedRange: bt,
              onSelect: me
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ x("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
        /* @__PURE__ */ u(
          "button",
          {
            onClick: Et,
            className: "px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
            children: "Today"
          }
        ),
        /* @__PURE__ */ x("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ u(
            "button",
            {
              onClick: _t,
              className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
              children: "Clear dates"
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: n,
              className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              onClick: It,
              disabled: !!(nt || tt),
              className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${nt || tt ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
              children: "Apply"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  Je as ALLOW_FUTURE_DATES,
  Gi as AdvancedDateRangePicker,
  Zi as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  zi as WEEK_NUMBERING_MODE,
  Jt as WEEK_STARTS_ON,
  br as calcDurationFromRange,
  Ci as calcEndFromDuration,
  Ti as calcStartFromDuration,
  Yn as createSelection,
  Qi as formatDisplayDate,
  G as formatUtc,
  Ei as getPresets,
  Nt as getTodayUtc,
  Yi as getUnitAbbreviation,
  Vi as parseDisplayDate,
  U as parseUtc
};
