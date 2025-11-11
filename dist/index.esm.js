import { jsxs as v, jsx as f, Fragment as ft } from "react/jsx-runtime";
import S, { createContext as Or, useContext as Cr, useCallback as be, useRef as Ce, useLayoutEffect as Tr, useState as B, useEffect as Oe, useMemo as Rt, forwardRef as An, createElement as rn } from "react";
function Wr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Yr = {}, ht = {};
function Xe(e, t) {
  try {
    const r = (Yr[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in ht ? ht[r] : mn(r, r.split(":"));
  } catch {
    if (e in ht) return ht[e];
    const n = e?.match(Er);
    return n ? mn(e, n.slice(1)) : NaN;
  }
}
const Er = /([+-]\d\d):?(\d\d)?/;
function mn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return ht[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class Te extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Xe(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Hn(this), sn(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Te(...n, t) : new Te(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Te(+this, t);
  }
  getTimezoneOffset() {
    const t = -Xe(this.timeZone, this);
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
    return new Te(+new Date(t), this.timeZone);
  }
  //#endregion
}
const gn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!gn.test(e)) return;
  const t = e.replace(gn, "$1UTC");
  Te.prototype[t] && (e.startsWith("get") ? Te.prototype[e] = function() {
    return this.internal[t]();
  } : (Te.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), _r(this), +this;
  }, Te.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), sn(this), +this;
  }));
});
function sn(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Xe(e.timeZone, e) * 60));
}
function _r(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Hn(e);
}
function Hn(e) {
  const t = Xe(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = s - o, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const l = s - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const g = s > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, d = Math.round(-(Xe(e.timeZone, e) * 60)) % 60;
  (d || g) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + d), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + d + g));
  const p = Xe(e.timeZone, e), y = p > 0 ? Math.floor(p) : Math.ceil(p), O = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - y, x = y !== n, k = O - l;
  if (x && k) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + k);
    const h = Xe(e.timeZone, e), w = h > 0 ? Math.floor(h) : Math.ceil(h), Y = y - w;
    Y && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + Y), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + Y));
  }
}
class oe extends Te {
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
    return `${t} GMT${n}${r}${s} (${Wr(this.timeZone, this)})`;
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
const Rn = 6048e5, Fr = 864e5, qn = 6e4, jn = 36e5, yn = Symbol.for("constructDateFrom");
function Z(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && yn in e ? e[yn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function U(e, t) {
  return Z(t || e, e);
}
function We(e, t, n) {
  const r = U(e, n?.in);
  return isNaN(t) ? Z(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Ee(e, t, n) {
  const r = U(e, n?.in);
  if (isNaN(t)) return Z(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), o = Z(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const i = o.getDate();
  return s >= i ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    s
  ), r);
}
let Ir = {};
function bt() {
  return Ir;
}
function Ie(e, t) {
  const n = bt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = U(e, t?.in), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function mt(e, t) {
  return Ie(e, { ...t, weekStartsOn: 1 });
}
function Ln(e, t) {
  const n = U(e, t?.in), r = n.getFullYear(), s = Z(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const o = mt(s), i = Z(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = mt(i);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function pn(e) {
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
function qe(e, ...t) {
  const n = Z.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function gt(e, t) {
  const n = U(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function cn(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  ), o = gt(r), i = gt(s), a = +o - pn(o), l = +i - pn(i);
  return Math.round((a - l) / Fr);
}
function Pr(e, t) {
  const n = Ln(e, t), r = Z(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), mt(r);
}
function Zn(e, t, n) {
  return Ee(e, t * 3, n);
}
function ln(e, t, n) {
  return We(e, t * 7, n);
}
function Ur(e, t, n) {
  return Ee(e, t * 12, n);
}
function $r(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = Z.bind(null, s));
    const o = U(s, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), Z(r, n || NaN);
}
function Br(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = Z.bind(null, s));
    const o = U(s, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), Z(r, n || NaN);
}
function qt(e, t) {
  const n = +U(e) - +U(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Ar(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  );
  return +gt(r) == +gt(s);
}
function zn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Hr(e) {
  return !(!zn(e) && typeof e != "number" || isNaN(+U(e)));
}
function Qn(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  ), o = r.getFullYear() - s.getFullYear(), i = r.getMonth() - s.getMonth();
  return o * 12 + i;
}
function Ct(e, t) {
  const n = U(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function Vn(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  ), o = bn(r, s), i = Math.abs(
    cn(r, s)
  );
  r.setDate(r.getDate() - o * i);
  const a = +(bn(r, s) === -o), l = o * (i - a);
  return l === 0 ? 0 : l;
}
function bn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Gn(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function Rr(e, t) {
  const n = U(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function Kn(e, t) {
  const n = U(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function qr(e, t) {
  const n = U(e, t?.in);
  return +Rr(n, t) == +Kn(n, t);
}
function Xn(e, t, n) {
  const [r, s, o] = qe(
    n?.in,
    e,
    e,
    t
  ), i = qt(s, o), a = Math.abs(
    Qn(s, o)
  );
  if (a < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - i * a);
  let l = qt(s, o) === -i;
  qr(r) && a === 1 && qt(r, o) === 1 && (l = !1);
  const u = i * (a - +l);
  return u === 0 ? 0 : u;
}
function jr(e, t, n) {
  const r = Xn(e, t, n) / 3;
  return Gn()(r);
}
function Lr(e, t, n) {
  const r = Vn(e, t, n) / 7;
  return Gn()(r);
}
function dn(e, t) {
  const [n, r] = qe(e, t.start, t.end);
  return { start: n, end: r };
}
function Jn(e, t) {
  const { start: n, end: r } = dn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(Z(n, i)), i.setDate(i.getDate() + a), i.setHours(0, 0, 0, 0);
  return s ? l.reverse() : l;
}
function Zr(e, t) {
  const { start: n, end: r } = dn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(Z(n, i)), i.setMonth(i.getMonth() + a);
  return s ? l.reverse() : l;
}
function zr(e, t) {
  const n = U(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function te(e, t) {
  const n = U(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Qr(e, t) {
  const n = U(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function un(e, t) {
  const n = U(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Vr(e, t) {
  const { start: n, end: r } = dn(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(Z(n, i)), i.setFullYear(i.getFullYear() + a);
  return s ? l.reverse() : l;
}
function er(e, t) {
  const n = bt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = U(e, t?.in), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Gr(e, t) {
  return er(e, { ...t, weekStartsOn: 1 });
}
const Kr = {
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
}, Xr = (e, t, n) => {
  let r;
  const s = Kr[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function jt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Jr = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, es = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ts = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ns = {
  date: jt({
    formats: Jr,
    defaultWidth: "full"
  }),
  time: jt({
    formats: es,
    defaultWidth: "full"
  }),
  dateTime: jt({
    formats: ts,
    defaultWidth: "full"
  })
}, rs = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ss = (e, t, n, r) => rs[e];
function lt(e) {
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
const os = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, as = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, is = {
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
}, cs = {
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
}, ls = {
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
}, ds = {
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
}, us = (e, t) => {
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
}, fs = {
  ordinalNumber: us,
  era: lt({
    values: os,
    defaultWidth: "wide"
  }),
  quarter: lt({
    values: as,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: lt({
    values: is,
    defaultWidth: "wide"
  }),
  day: lt({
    values: cs,
    defaultWidth: "wide"
  }),
  dayPeriod: lt({
    values: ls,
    defaultWidth: "wide",
    formattingValues: ds,
    defaultFormattingWidth: "wide"
  })
};
function dt(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(s);
    if (!o)
      return null;
    const i = o[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? ms(a, (d) => d.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      hs(a, (d) => d.test(i))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(l) : l, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const g = t.slice(i.length);
    return { value: u, rest: g };
  };
}
function hs(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function ms(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function gs(e) {
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
const ys = /^(\d+)(th|st|nd|rd)?/i, ps = /\d+/i, bs = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Ds = {
  any: [/^b/i, /^(a|c)/i]
}, ws = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, xs = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, vs = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, ks = {
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
}, Ms = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Ss = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Os = {
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
}, Cs = {
  ordinalNumber: gs({
    matchPattern: ys,
    parsePattern: ps,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: dt({
    matchPatterns: bs,
    defaultMatchWidth: "wide",
    parsePatterns: Ds,
    defaultParseWidth: "any"
  }),
  quarter: dt({
    matchPatterns: ws,
    defaultMatchWidth: "wide",
    parsePatterns: xs,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: dt({
    matchPatterns: vs,
    defaultMatchWidth: "wide",
    parsePatterns: ks,
    defaultParseWidth: "any"
  }),
  day: dt({
    matchPatterns: Ms,
    defaultMatchWidth: "wide",
    parsePatterns: Ns,
    defaultParseWidth: "any"
  }),
  dayPeriod: dt({
    matchPatterns: Ss,
    defaultMatchWidth: "any",
    parsePatterns: Os,
    defaultParseWidth: "any"
  })
}, fn = {
  code: "en-US",
  formatDistance: Xr,
  formatLong: ns,
  formatRelative: ss,
  localize: fs,
  match: Cs,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ts(e, t) {
  const n = U(e, t?.in);
  return cn(n, un(n)) + 1;
}
function tr(e, t) {
  const n = U(e, t?.in), r = +mt(n) - +Pr(n);
  return Math.round(r / Rn) + 1;
}
function nr(e, t) {
  const n = U(e, t?.in), r = n.getFullYear(), s = bt(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, i = Z(t?.in || e, 0);
  i.setFullYear(r + 1, 0, o), i.setHours(0, 0, 0, 0);
  const a = Ie(i, t), l = Z(t?.in || e, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const u = Ie(l, t);
  return +n >= +a ? r + 1 : +n >= +u ? r : r - 1;
}
function Ws(e, t) {
  const n = bt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = nr(e, t), o = Z(t?.in || e, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), Ie(o, t);
}
function rr(e, t) {
  const n = U(e, t?.in), r = +Ie(n, t) - +Ws(n, t);
  return Math.round(r / Rn) + 1;
}
function A(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const He = {
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
}, tt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Dn = {
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
    return He.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const s = nr(e, r), o = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const i = o % 100;
      return A(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : A(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Ln(e);
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
        return He.M(e, t);
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
    const s = rr(e, r);
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : A(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = tr(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : A(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : He.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Ts(e);
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
    switch (r === 12 ? s = tt.noon : r === 0 ? s = tt.midnight : s = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? s = tt.evening : r >= 12 ? s = tt.afternoon : r >= 4 ? s = tt.morning : s = tt.night, t) {
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
    return He.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : He.H(e, t);
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
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : He.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : He.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return He.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return xn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Ke(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ke(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return xn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Ke(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ke(r, ":");
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
        return "GMT" + wn(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Ke(r, ":");
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
        return "GMT" + wn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Ke(r, ":");
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
function wn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + t + A(o, 2);
}
function xn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + A(Math.abs(e) / 60, 2) : Ke(e, t);
}
function Ke(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = A(Math.trunc(r / 60), 2), o = A(r % 60, 2);
  return n + s + t + o;
}
const vn = (e, t) => {
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
}, sr = (e, t) => {
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
}, Ys = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return vn(e, t);
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
  return o.replace("{{date}}", vn(r, t)).replace("{{time}}", sr(s, t));
}, Es = {
  p: sr,
  P: Ys
}, _s = /^D+$/, Fs = /^Y+$/, Is = ["D", "DD", "YY", "YYYY"];
function Ps(e) {
  return _s.test(e);
}
function Us(e) {
  return Fs.test(e);
}
function $s(e, t, n) {
  const r = Bs(e, t, n);
  if (console.warn(r), Is.includes(e)) throw new RangeError(r);
}
function Bs(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const As = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Hs = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Rs = /^'([^]*?)'?$/, qs = /''/g, js = /[a-zA-Z]/;
function Ls(e, t, n) {
  const r = bt(), s = n?.locale ?? r.locale ?? fn, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = U(e, n?.in);
  if (!Hr(a))
    throw new RangeError("Invalid time value");
  let l = t.match(Hs).map((g) => {
    const d = g[0];
    if (d === "p" || d === "P") {
      const p = Es[d];
      return p(g, s.formatLong);
    }
    return g;
  }).join("").match(As).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const d = g[0];
    if (d === "'")
      return { isToken: !1, value: Zs(g) };
    if (Dn[d])
      return { isToken: !0, value: g };
    if (d.match(js))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + d + "`"
      );
    return { isToken: !1, value: g };
  });
  s.localize.preprocessor && (l = s.localize.preprocessor(a, l));
  const u = {
    firstWeekContainsDate: o,
    weekStartsOn: i,
    locale: s
  };
  return l.map((g) => {
    if (!g.isToken) return g.value;
    const d = g.value;
    (!n?.useAdditionalWeekYearTokens && Us(d) || !n?.useAdditionalDayOfYearTokens && Ps(d)) && $s(d, t, String(e));
    const p = Dn[d[0]];
    return p(a, d, s.localize, u);
  }).join("");
}
function Zs(e) {
  const t = e.match(Rs);
  return t ? t[1].replace(qs, "'") : e;
}
function zs(e, t) {
  const n = U(e, t?.in), r = n.getFullYear(), s = n.getMonth(), o = Z(n, 0);
  return o.setFullYear(r, s + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function Je(e, t) {
  return U(e, t?.in).getMonth();
}
function ne(e, t) {
  return U(e, t?.in).getFullYear();
}
function Qs(e, t) {
  return +U(e) > +U(t);
}
function Vs(e, t) {
  return +U(e) < +U(t);
}
function Gs(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function Ks(e, t, n) {
  const [r, s] = qe(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function Xs(e, t) {
  const n = () => Z(t?.in, NaN), s = no(e);
  let o;
  if (s.date) {
    const u = ro(s.date, 2);
    o = so(u.restDateString, u.year);
  }
  if (!o || isNaN(+o)) return n();
  const i = +o;
  let a = 0, l;
  if (s.time && (a = oo(s.time), isNaN(a)))
    return n();
  if (s.timezone) {
    if (l = ao(s.timezone), isNaN(l)) return n();
  } else {
    const u = new Date(i + a), g = U(0, t?.in);
    return g.setFullYear(
      u.getUTCFullYear(),
      u.getUTCMonth(),
      u.getUTCDate()
    ), g.setHours(
      u.getUTCHours(),
      u.getUTCMinutes(),
      u.getUTCSeconds(),
      u.getUTCMilliseconds()
    ), g;
  }
  return U(i + a + l, t?.in);
}
const Tt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, Js = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, eo = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, to = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function no(e) {
  const t = {}, n = e.split(Tt.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], Tt.timeZoneDelimiter.test(t.date) && (t.date = e.split(Tt.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = Tt.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function ro(e, t) {
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
function so(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(Js);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = ut(n[1]), o = ut(n[2]) - 1, i = ut(n[3]), a = ut(n[4]), l = ut(n[5]) - 1;
  if (r)
    return fo(t, a, l) ? io(t, a, l) : /* @__PURE__ */ new Date(NaN);
  {
    const u = /* @__PURE__ */ new Date(0);
    return !lo(t, o, i) || !uo(t, s) ? /* @__PURE__ */ new Date(NaN) : (u.setUTCFullYear(t, o, Math.max(s, i)), u);
  }
}
function ut(e) {
  return e ? parseInt(e) : 1;
}
function oo(e) {
  const t = e.match(eo);
  if (!t) return NaN;
  const n = Lt(t[1]), r = Lt(t[2]), s = Lt(t[3]);
  return ho(n, r, s) ? n * jn + r * qn + s * 1e3 : NaN;
}
function Lt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function ao(e) {
  if (e === "Z") return 0;
  const t = e.match(to);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return mo(r, s) ? n * (r * jn + s * qn) : NaN;
}
function io(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const co = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function or(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function lo(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (co[t] || (or(e) ? 29 : 28));
}
function uo(e, t) {
  return t >= 1 && t <= (or(e) ? 366 : 365);
}
function fo(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function ho(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function mo(e, t) {
  return t >= 0 && t <= 59;
}
function yt(e, t, n) {
  const r = U(e, n?.in), s = r.getFullYear(), o = r.getDate(), i = Z(e, 0);
  i.setFullYear(s, t, 15), i.setHours(0, 0, 0, 0);
  const a = zs(i);
  return r.setMonth(t, Math.min(o, a)), r;
}
function go(e, t, n) {
  const r = U(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, o = t - s;
  return yt(r, r.getMonth() + o * 3);
}
function pt(e, t, n) {
  const r = U(e, n?.in);
  return isNaN(+r) ? Z(e, NaN) : (r.setFullYear(t), r);
}
const kn = 5, yo = 4;
function po(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), o = t.addDays(s, kn * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? kn : yo;
}
function ar(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function bo(e, t) {
  const n = ar(e, t), r = po(e, t);
  return t.addDays(n, r * 7 - 1);
}
class he {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? oe.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, o) => this.overrides?.newDate ? this.overrides.newDate(r, s, o) : this.options.timeZone ? new oe(r, s, o, this.options.timeZone) : new Date(r, s, o), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : We(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Ee(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : ln(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : Ur(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : cn(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : Qn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Zr(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Vr(r), o = new Set(s.map((a) => this.getYear(a)));
      if (o.size === s.length)
        return s;
      const i = [];
      return o.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : bo(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Gr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : Kn(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : er(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Qr(r), this.format = (r, s, o) => {
      const i = this.overrides?.format ? this.overrides.format(r, s, this.options) : Ls(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : tr(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : Je(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : ne(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : rr(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : Qs(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : Vs(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : zn(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : Ar(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : Gs(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : Ks(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : $r(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Br(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : yt(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : pt(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : ar(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : gt(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : mt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : te(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Ie(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : un(r), this.options = { locale: fn, ...t }, this.overrides = n;
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
    return t && he.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: s } = this.options, o = n?.code;
    if (o && he.yearFirstLocales.has(o))
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
he.yearFirstLocales = /* @__PURE__ */ new Set([
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
const Ye = new he();
class ir {
  constructor(t, n, r = Ye) {
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
class Do {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class wo {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function xo(e) {
  return S.createElement("button", { ...e });
}
function vo(e) {
  return S.createElement("span", { ...e });
}
function ko(e) {
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
function Mo(e) {
  const { day: t, modifiers: n, ...r } = e;
  return S.createElement("td", { ...r });
}
function No(e) {
  const { day: t, modifiers: n, ...r } = e, s = S.useRef(null);
  return S.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), S.createElement("button", { ref: s, ...r });
}
var T;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(T || (T = {}));
var L;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(L || (L = {}));
var we;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(we || (we = {}));
var fe;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(fe || (fe = {}));
function So(e) {
  const { options: t, className: n, components: r, classNames: s, ...o } = e, i = [s[T.Dropdown], n].join(" "), a = t?.find(({ value: l }) => l === o.value);
  return S.createElement(
    "span",
    { "data-disabled": o.disabled, className: s[T.DropdownRoot] },
    S.createElement(r.Select, { className: i, ...o }, t?.map(({ value: l, label: u, disabled: g }) => S.createElement(r.Option, { key: l, value: l, disabled: g }, u))),
    S.createElement(
      "span",
      { className: s[T.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      S.createElement(r.Chevron, { orientation: "down", size: 18, className: s[T.Chevron] })
    )
  );
}
function Oo(e) {
  return S.createElement("div", { ...e });
}
function Co(e) {
  return S.createElement("div", { ...e });
}
function To(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return S.createElement("div", { ...r }, e.children);
}
function Wo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return S.createElement("div", { ...r });
}
function Yo(e) {
  return S.createElement("table", { ...e });
}
function Eo(e) {
  return S.createElement("div", { ...e });
}
const cr = Or(void 0);
function Dt() {
  const e = Cr(cr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function _o(e) {
  const { components: t } = Dt();
  return S.createElement(t.Dropdown, { ...e });
}
function Fo(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...o } = e, { components: i, classNames: a, labels: { labelPrevious: l, labelNext: u } } = Dt(), g = be((p) => {
    s && n?.(p);
  }, [s, n]), d = be((p) => {
    r && t?.(p);
  }, [r, t]);
  return S.createElement(
    "nav",
    { ...o },
    S.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[T.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: d },
      S.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[T.Chevron], orientation: "left" })
    ),
    S.createElement(
      i.NextMonthButton,
      { type: "button", className: a[T.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": u(s), onClick: g },
      S.createElement(i.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: a[T.Chevron] })
    )
  );
}
function Io(e) {
  const { components: t } = Dt();
  return S.createElement(t.Button, { ...e });
}
function Po(e) {
  return S.createElement("option", { ...e });
}
function Uo(e) {
  const { components: t } = Dt();
  return S.createElement(t.Button, { ...e });
}
function $o(e) {
  const { rootRef: t, ...n } = e;
  return S.createElement("div", { ...n, ref: t });
}
function Bo(e) {
  return S.createElement("select", { ...e });
}
function Ao(e) {
  const { week: t, ...n } = e;
  return S.createElement("tr", { ...n });
}
function Ho(e) {
  return S.createElement("th", { ...e });
}
function Ro(e) {
  return S.createElement(
    "thead",
    { "aria-hidden": !0 },
    S.createElement("tr", { ...e })
  );
}
function qo(e) {
  const { week: t, ...n } = e;
  return S.createElement("th", { ...n });
}
function jo(e) {
  return S.createElement("th", { ...e });
}
function Lo(e) {
  return S.createElement("tbody", { ...e });
}
function Zo(e) {
  const { components: t } = Dt();
  return S.createElement(t.Dropdown, { ...e });
}
const zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: xo,
  CaptionLabel: vo,
  Chevron: ko,
  Day: Mo,
  DayButton: No,
  Dropdown: So,
  DropdownNav: Oo,
  Footer: Co,
  Month: To,
  MonthCaption: Wo,
  MonthGrid: Yo,
  Months: Eo,
  MonthsDropdown: _o,
  Nav: Fo,
  NextMonthButton: Io,
  Option: Po,
  PreviousMonthButton: Uo,
  Root: $o,
  Select: Bo,
  Week: Ao,
  WeekNumber: qo,
  WeekNumberHeader: jo,
  Weekday: Ho,
  Weekdays: Ro,
  Weeks: Lo,
  YearsDropdown: Zo
}, Symbol.toStringTag, { value: "Module" }));
function _e(e, t, n = !1, r = Ye) {
  let { from: s, to: o } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return s && o ? (i(o, s) < 0 && ([s, o] = [o, s]), i(t, s) >= (n ? 1 : 0) && i(o, t) >= (n ? 1 : 0)) : !n && o ? a(o, t) : !n && s ? a(s, t) : !1;
}
function lr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function hn(e) {
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
function Fe(e, t, n = Ye) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: o, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return s(e, a);
    if (hr(a, n))
      return a.includes(e);
    if (hn(a))
      return _e(a, e, !1, n);
    if (fr(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (lr(a)) {
      const l = o(a.before, e), u = o(a.after, e), g = l > 0, d = u < 0;
      return i(a.before, a.after) ? d && g : g || d;
    }
    return dr(a) ? o(e, a.after) > 0 : ur(a) ? o(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Qo(e, t, n, r, s) {
  const { disabled: o, hidden: i, modifiers: a, showOutsideDays: l, broadcastCalendar: u, today: g } = t, { isSameDay: d, isSameMonth: p, startOfMonth: y, isBefore: b, endOfMonth: O, isAfter: x } = s, k = n && y(n), h = r && O(r), w = {
    [L.focused]: [],
    [L.outside]: [],
    [L.disabled]: [],
    [L.hidden]: [],
    [L.today]: []
  }, Y = {};
  for (const D of e) {
    const { date: N, displayMonth: M } = D, $ = !!(M && !p(N, M)), W = !!(k && b(N, k)), H = !!(h && x(N, h)), ee = !!(o && Fe(N, o, s)), le = !!(i && Fe(N, i, s)) || W || H || // Broadcast calendar will show outside days as default
    !u && !l && $ || u && l === !1 && $, X = d(N, g ?? s.today());
    $ && w.outside.push(D), ee && w.disabled.push(D), le && w.hidden.push(D), X && w.today.push(D), a && Object.keys(a).forEach((me) => {
      const ae = a?.[me];
      ae && Fe(N, ae, s) && (Y[me] ? Y[me].push(D) : Y[me] = [D]);
    });
  }
  return (D) => {
    const N = {
      [L.focused]: !1,
      [L.disabled]: !1,
      [L.hidden]: !1,
      [L.outside]: !1,
      [L.today]: !1
    }, M = {};
    for (const $ in w) {
      const W = w[$];
      N[$] = W.some((H) => H === D);
    }
    for (const $ in Y)
      M[$] = Y[$].some((W) => W === D);
    return {
      ...N,
      // custom modifiers should override all the previous ones
      ...M
    };
  };
}
function Vo(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [o]) => (n[o] ? s.push(n[o]) : t[L[o]] ? s.push(t[L[o]]) : t[we[o]] && s.push(t[we[o]]), s), [t[T.Day]]);
}
function Go(e) {
  return {
    ...zo,
    ...e
  };
}
function Ko(e) {
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
function Xo() {
  const e = {};
  for (const t in T)
    e[T[t]] = `rdp-${T[t]}`;
  for (const t in L)
    e[L[t]] = `rdp-${L[t]}`;
  for (const t in we)
    e[we[t]] = `rdp-${we[t]}`;
  for (const t in fe)
    e[fe[t]] = `rdp-${fe[t]}`;
  return e;
}
function mr(e, t, n) {
  return (n ?? new he(t)).formatMonthYear(e);
}
const Jo = mr;
function ea(e, t, n) {
  return (n ?? new he(t)).format(e, "d");
}
function ta(e, t = Ye) {
  return t.format(e, "LLLL");
}
function na(e, t, n) {
  return (n ?? new he(t)).format(e, "cccccc");
}
function ra(e, t = Ye) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function sa() {
  return "";
}
function gr(e, t = Ye) {
  return t.format(e, "yyyy");
}
const oa = gr, aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: mr,
  formatDay: ea,
  formatMonthCaption: Jo,
  formatMonthDropdown: ta,
  formatWeekNumber: ra,
  formatWeekNumberHeader: sa,
  formatWeekdayName: na,
  formatYearCaption: oa,
  formatYearDropdown: gr
}, Symbol.toStringTag, { value: "Module" }));
function ia(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...aa,
    ...e
  };
}
function ca(e, t, n, r, s) {
  const { startOfMonth: o, startOfYear: i, endOfYear: a, eachMonthOfInterval: l, getMonth: u } = s;
  return l({
    start: i(e),
    end: a(e)
  }).map((p) => {
    const y = r.formatMonthDropdown(p, s), b = u(p), O = t && p < o(t) || n && p > o(n) || !1;
    return { value: b, label: y, disabled: O };
  });
}
function la(e, t = {}, n = {}) {
  let r = { ...t?.[T.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function da(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), o = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(s, i);
    o.push(a);
  }
  return o;
}
function ua(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: i, eachYearOfInterval: a, getYear: l } = r, u = o(e), g = i(t), d = a({ start: u, end: g });
  return s && d.reverse(), d.map((p) => {
    const y = n.formatYearDropdown(p, r);
    return {
      value: l(p),
      label: y,
      disabled: !1
    };
  });
}
function yr(e, t, n, r) {
  let s = (r ?? new he(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const fa = yr;
function pr(e, t, n) {
  return (n ?? new he(t)).formatMonthYear(e);
}
const ha = pr;
function ma(e, t, n, r) {
  let s = (r ?? new he(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function ga(e) {
  return "Choose the Month";
}
function ya() {
  return "";
}
function pa(e) {
  return "Go to the Next Month";
}
function ba(e) {
  return "Go to the Previous Month";
}
function Da(e, t, n) {
  return (n ?? new he(t)).format(e, "cccc");
}
function wa(e, t) {
  return `Week ${e}`;
}
function xa(e) {
  return "Week Number";
}
function va(e) {
  return "Choose the Year";
}
const ka = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ha,
  labelDay: fa,
  labelDayButton: yr,
  labelGrid: pr,
  labelGridcell: ma,
  labelMonthDropdown: ga,
  labelNav: ya,
  labelNext: pa,
  labelPrevious: ba,
  labelWeekNumber: wa,
  labelWeekNumberHeader: xa,
  labelWeekday: Da,
  labelYearDropdown: va
}, Symbol.toStringTag, { value: "Module" })), wt = (e) => e instanceof HTMLElement ? e : null, Zt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Ma = (e) => wt(e.querySelector("[data-animated-month]")), zt = (e) => wt(e.querySelector("[data-animated-caption]")), Qt = (e) => wt(e.querySelector("[data-animated-weeks]")), Na = (e) => wt(e.querySelector("[data-animated-nav]")), Sa = (e) => wt(e.querySelector("[data-animated-weekdays]"));
function Oa(e, t, { classNames: n, months: r, focused: s, dateLib: o }) {
  const i = Ce(null), a = Ce(r), l = Ce(!1);
  Tr(() => {
    const u = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const g = o.isSameMonth(r[0].date, u[0].date), d = o.isAfter(r[0].date, u[0].date), p = d ? n[fe.caption_after_enter] : n[fe.caption_before_enter], y = d ? n[fe.weeks_after_enter] : n[fe.weeks_before_enter], b = i.current, O = e.current.cloneNode(!0);
    if (O instanceof HTMLElement ? (Zt(O).forEach((w) => {
      if (!(w instanceof HTMLElement))
        return;
      const Y = Ma(w);
      Y && w.contains(Y) && w.removeChild(Y);
      const D = zt(w);
      D && D.classList.remove(p);
      const N = Qt(w);
      N && N.classList.remove(y);
    }), i.current = O) : i.current = null, l.current || g || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const x = b instanceof HTMLElement ? Zt(b) : [], k = Zt(e.current);
    if (k?.every((h) => h instanceof HTMLElement) && x && x.every((h) => h instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const h = Na(e.current);
      h && (h.style.zIndex = "1"), k.forEach((w, Y) => {
        const D = x[Y];
        if (!D)
          return;
        w.style.position = "relative", w.style.overflow = "hidden";
        const N = zt(w);
        N && N.classList.add(p);
        const M = Qt(w);
        M && M.classList.add(y);
        const $ = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), h && (h.style.zIndex = ""), N && N.classList.remove(p), M && M.classList.remove(y), w.style.position = "", w.style.overflow = "", w.contains(D) && w.removeChild(D);
        };
        D.style.pointerEvents = "none", D.style.position = "absolute", D.style.overflow = "hidden", D.setAttribute("aria-hidden", "true");
        const W = Sa(D);
        W && (W.style.opacity = "0");
        const H = zt(D);
        H && (H.classList.add(d ? n[fe.caption_before_exit] : n[fe.caption_after_exit]), H.addEventListener("animationend", $));
        const ee = Qt(D);
        ee && ee.classList.add(d ? n[fe.weeks_before_exit] : n[fe.weeks_after_exit]), w.insertBefore(D, w.firstChild);
      });
    }
  });
}
function Ca(e, t, n, r) {
  const s = e[0], o = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: g, differenceInCalendarMonths: d, endOfBroadcastWeek: p, endOfISOWeek: y, endOfMonth: b, endOfWeek: O, isAfter: x, startOfBroadcastWeek: k, startOfISOWeek: h, startOfWeek: w } = r, Y = l ? k(s, r) : i ? h(s) : w(s), D = l ? p(o) : i ? y(b(o)) : O(b(o)), N = g(D, Y), M = d(o, s) + 1, $ = [];
  for (let ee = 0; ee <= N; ee++) {
    const le = u(Y, ee);
    if (t && x(le, t))
      break;
    $.push(le);
  }
  const H = (l ? 35 : 42) * M;
  if (a && $.length < H) {
    const ee = H - $.length;
    for (let le = 0; le < ee; le++) {
      const X = u($[$.length - 1], 1);
      $.push(X);
    }
  }
  return $;
}
function Ta(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((o, i) => o.concat(i.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function Wa(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, o = [];
  for (let i = 0; i < s; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    o.push(a);
  }
  return o;
}
function Mn(e, t, n, r) {
  const { month: s, defaultMonth: o, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let l = s || o || i;
  const { differenceInCalendarMonths: u, addMonths: g, startOfMonth: d } = r;
  if (n && u(n, l) < a - 1) {
    const p = -1 * (a - 1);
    l = g(n, p);
  }
  return t && u(l, t) < 0 && (l = t), d(l);
}
function Ya(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: o, endOfISOWeek: i, endOfMonth: a, endOfWeek: l, getISOWeek: u, getWeek: g, startOfBroadcastWeek: d, startOfISOWeek: p, startOfWeek: y } = r, b = e.reduce((O, x) => {
    const k = n.broadcastCalendar ? d(x, r) : n.ISOWeek ? p(x) : y(x), h = n.broadcastCalendar ? o(x) : n.ISOWeek ? i(a(x)) : l(a(x)), w = t.filter((M) => M >= k && M <= h), Y = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && w.length < Y) {
      const M = t.filter(($) => {
        const W = Y - w.length;
        return $ > h && $ <= s(h, W);
      });
      w.push(...M);
    }
    const D = w.reduce((M, $) => {
      const W = n.ISOWeek ? u($) : g($), H = M.find((le) => le.weekNumber === W), ee = new ir($, x, r);
      return H ? H.days.push(ee) : M.push(new wo(W, [ee])), M;
    }, []), N = new Do(x, D);
    return O.push(N), O;
  }, []);
  return n.reverseMonths ? b.reverse() : b;
}
function Ea(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: o, startOfMonth: i, endOfMonth: a, addYears: l, endOfYear: u, newDate: g, today: d } = t, { fromYear: p, toYear: y, fromMonth: b, toMonth: O } = e;
  !n && b && (n = b), !n && p && (n = t.newDate(p, 0, 1)), !r && O && (r = O), !r && y && (r = g(y, 11, 31));
  const x = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : p ? n = g(p, 0, 1) : !n && x && (n = s(l(e.today ?? d(), -100))), r ? r = a(r) : y ? r = g(y, 11, 31) : !r && x && (r = u(e.today ?? d())), [
    n && o(n),
    r && o(r)
  ];
}
function _a(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, u = s ? o : 1, g = i(e);
  if (!t)
    return a(g, u);
  if (!(l(t, e) < o))
    return a(g, u);
}
function Fa(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, u = s ? o ?? 1 : 1, g = i(e);
  if (!t)
    return a(g, -u);
  if (!(l(g, t) <= 0))
    return a(g, -u);
}
function Ia(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Wt(e, t) {
  const [n, r] = B(e);
  return [t === void 0 ? n : t, r];
}
function Pa(e, t) {
  const [n, r] = Ea(e, t), { startOfMonth: s, endOfMonth: o } = t, i = Mn(e, n, r, t), [a, l] = Wt(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Oe(() => {
    const N = Mn(e, n, r, t);
    l(N);
  }, [e.timeZone]);
  const u = Wa(a, r, e, t), g = Ca(u, e.endMonth ? o(e.endMonth) : void 0, e, t), d = Ya(u, g, e, t), p = Ia(d), y = Ta(d), b = Fa(a, n, e, t), O = _a(a, r, e, t), { disableNavigation: x, onMonthChange: k } = e, h = (N) => p.some((M) => M.days.some(($) => $.isEqualTo(N))), w = (N) => {
    if (x)
      return;
    let M = s(N);
    n && M < s(n) && (M = s(n)), r && M > s(r) && (M = s(r)), l(M), k?.(M);
  };
  return {
    months: d,
    weeks: p,
    days: y,
    navStart: n,
    navEnd: r,
    previousMonth: b,
    nextMonth: O,
    goToMonth: w,
    goToDay: (N) => {
      h(N) || w(N.date);
    }
  };
}
var Se;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Se || (Se = {}));
function Nn(e) {
  return !e[L.disabled] && !e[L.hidden] && !e[L.outside];
}
function Ua(e, t, n, r) {
  let s, o = -1;
  for (const i of e) {
    const a = t(i);
    Nn(a) && (a[L.focused] && o < Se.FocusedModifier ? (s = i, o = Se.FocusedModifier) : r?.isEqualTo(i) && o < Se.LastFocused ? (s = i, o = Se.LastFocused) : n(i.date) && o < Se.Selected ? (s = i, o = Se.Selected) : a[L.today] && o < Se.Today && (s = i, o = Se.Today));
  }
  return s || (s = e.find((i) => Nn(t(i)))), s;
}
function $a(e, t, n, r, s, o, i) {
  const { ISOWeek: a, broadcastCalendar: l } = o, { addDays: u, addMonths: g, addWeeks: d, addYears: p, endOfBroadcastWeek: y, endOfISOWeek: b, endOfWeek: O, max: x, min: k, startOfBroadcastWeek: h, startOfISOWeek: w, startOfWeek: Y } = i;
  let N = {
    day: u,
    week: d,
    month: g,
    year: p,
    startOfWeek: (M) => l ? h(M, i) : a ? w(M) : Y(M),
    endOfWeek: (M) => l ? y(M) : a ? b(M) : O(M)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? N = x([r, N]) : t === "after" && s && (N = k([s, N])), N;
}
function br(e, t, n, r, s, o, i, a = 0) {
  if (a > 365)
    return;
  const l = $a(e, t, n.date, r, s, o, i), u = !!(o.disabled && Fe(l, o.disabled, i)), g = !!(o.hidden && Fe(l, o.hidden, i)), d = l, p = new ir(l, d, i);
  return !u && !g ? p : br(e, t, p, r, s, o, i, a + 1);
}
function Ba(e, t, n, r, s) {
  const { autoFocus: o } = e, [i, a] = B(), l = Ua(t.days, n, r || (() => !1), i), [u, g] = B(o ? l : void 0);
  return {
    isFocusTarget: (O) => !!l?.isEqualTo(O),
    setFocused: g,
    focused: u,
    blur: () => {
      a(u), g(void 0);
    },
    moveFocus: (O, x) => {
      if (!u)
        return;
      const k = br(O, x, u, t.navStart, t.navEnd, e, s);
      k && (e.disableNavigation && !t.days.some((w) => w.isEqualTo(k)) || (t.goToDay(k), g(k)));
    }
  };
}
function Aa(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, i] = Wt(n, s ? n : void 0), a = s ? n : o, { isSameDay: l } = t, u = (y) => a?.some((b) => l(b, y)) ?? !1, { min: g, max: d } = e;
  return {
    selected: a,
    select: (y, b, O) => {
      let x = [...a ?? []];
      if (u(y)) {
        if (a?.length === g || r && a?.length === 1)
          return;
        x = a?.filter((k) => !l(k, y));
      } else
        a?.length === d ? x = [y] : x = [...x, y];
      return s || i(x), s?.(x, y, b, O), x;
    },
    isSelected: u
  };
}
function Ha(e, t, n = 0, r = 0, s = !1, o = Ye) {
  const { from: i, to: a } = t || {}, { isSameDay: l, isAfter: u, isBefore: g } = o;
  let d;
  if (!i && !a)
    d = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    l(i, e) ? n === 0 ? d = { from: i, to: e } : s ? d = { from: i, to: void 0 } : d = void 0 : g(e, i) ? d = { from: e, to: i } : d = { from: i, to: e };
  else if (i && a)
    if (l(i, e) && l(a, e))
      s ? d = { from: i, to: a } : d = void 0;
    else if (l(i, e))
      d = { from: i, to: n > 0 ? void 0 : e };
    else if (l(a, e))
      d = { from: e, to: n > 0 ? void 0 : e };
    else if (g(e, i))
      d = { from: e, to: a };
    else if (u(e, i))
      d = { from: i, to: e };
    else if (u(e, a))
      d = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (d?.from && d?.to) {
    const p = o.differenceInCalendarDays(d.to, d.from);
    r > 0 && p > r ? d = { from: e, to: void 0 } : n > 1 && p < n && (d = { from: e, to: void 0 });
  }
  return d;
}
function Ra(e, t, n = Ye) {
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
function Sn(e, t, n = Ye) {
  return _e(e, t.from, !1, n) || _e(e, t.to, !1, n) || _e(t, e.from, !1, n) || _e(t, e.to, !1, n);
}
function qa(e, t, n = Ye) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? _e(e, a, !1, n) : hr(a, n) ? a.some((l) => _e(e, l, !1, n)) : hn(a) ? a.from && a.to ? Sn(e, { from: a.from, to: a.to }, n) : !1 : fr(a) ? Ra(e, a.dayOfWeek, n) : lr(a) ? n.isAfter(a.before, a.after) ? Sn(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Fe(e.from, a, n) || Fe(e.to, a, n) : dr(a) || ur(a) ? Fe(e.from, a, n) || Fe(e.to, a, n) : !1))
    return !0;
  const i = r.filter((a) => typeof a == "function");
  if (i.length) {
    let a = e.from;
    const l = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= l; u++) {
      if (i.some((g) => g(a)))
        return !0;
      a = n.addDays(a, 1);
    }
  }
  return !1;
}
function ja(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: o, onSelect: i } = e, [a, l] = Wt(s, i ? s : void 0), u = i ? s : a;
  return {
    selected: u,
    select: (p, y, b) => {
      const { min: O, max: x } = e, k = p ? Ha(p, u, O, x, o, t) : void 0;
      return r && n && k?.from && k.to && qa({ from: k.from, to: k.to }, n, t) && (k.from = p, k.to = void 0), i || l(k), i?.(k, p, y, b), k;
    },
    isSelected: (p) => u && _e(u, p, !1, t)
  };
}
function La(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, i] = Wt(n, s ? n : void 0), a = s ? n : o, { isSameDay: l } = t;
  return {
    selected: a,
    select: (d, p, y) => {
      let b = d;
      return !r && a && a && l(d, a) && (b = void 0), s || i(b), s?.(b, d, p, y), b;
    },
    isSelected: (d) => a ? l(a, d) : !1
  };
}
function Za(e, t) {
  const n = La(e, t), r = Aa(e, t), s = ja(e, t);
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
function Re(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new oe(t.today, t.timeZone)), t.month && (t.month = new oe(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new oe(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new oe(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new oe(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new oe(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((I) => new oe(I, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new oe(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new oe(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: o, locale: i, classNames: a } = Rt(() => {
    const I = { ...fn, ...t.locale };
    return {
      dateLib: new he({
        locale: I,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Go(t.components),
      formatters: ia(t.formatters),
      labels: { ...ka, ...t.labels },
      locale: I,
      classNames: { ...Xo(), ...t.classNames }
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
  ]), { captionLayout: l, mode: u, navLayout: g, numberOfMonths: d = 1, onDayBlur: p, onDayClick: y, onDayFocus: b, onDayKeyDown: O, onDayMouseEnter: x, onDayMouseLeave: k, onNextClick: h, onPrevClick: w, showWeekNumber: Y, styles: D } = t, { formatCaption: N, formatDay: M, formatMonthDropdown: $, formatWeekNumber: W, formatWeekNumberHeader: H, formatWeekdayName: ee, formatYearDropdown: le } = r, X = Pa(t, o), { days: me, months: ae, navStart: xe, navEnd: ue, previousMonth: re, nextMonth: se, goToMonth: de } = X, je = Qo(me, t, xe, ue, o), { isSelected: ve, select: st, selected: G } = Za(t, o) ?? {}, { blur: J, focused: ke, isFocusTarget: Ue, moveFocus: Le, setFocused: De } = Ba(t, X, je, ve ?? (() => !1), o), { labelDayButton: Ze, labelGridcell: $e, labelGrid: et, labelMonthDropdown: Be, labelNav: xt, labelPrevious: Et, labelNext: ot, labelWeekday: _t, labelWeekNumber: Ft, labelWeekNumberHeader: It, labelYearDropdown: Pt } = s, Ut = Rt(() => da(o, t.ISOWeek), [o, t.ISOWeek]), vt = u !== void 0 || y !== void 0, at = be(() => {
    re && (de(re), w?.(re));
  }, [re, de, w]), ze = be(() => {
    se && (de(se), h?.(se));
  }, [de, se, h]), $t = be((I, c) => (m) => {
    m.preventDefault(), m.stopPropagation(), De(I), st?.(I.date, c, m), y?.(I.date, c, m);
  }, [st, y, De]), Me = be((I, c) => (m) => {
    De(I), b?.(I.date, c, m);
  }, [b, De]), Bt = be((I, c) => (m) => {
    J(), p?.(I.date, c, m);
  }, [J, p]), kt = be((I, c) => (m) => {
    const C = {
      ArrowLeft: [
        m.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        m.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [m.shiftKey ? "year" : "week", "after"],
      ArrowUp: [m.shiftKey ? "year" : "week", "before"],
      PageUp: [m.shiftKey ? "year" : "month", "before"],
      PageDown: [m.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (C[m.key]) {
      m.preventDefault(), m.stopPropagation();
      const [_, E] = C[m.key];
      Le(_, E);
    }
    O?.(I.date, c, m);
  }, [Le, O, t.dir]), Mt = be((I, c) => (m) => {
    x?.(I.date, c, m);
  }, [x]), Ae = be((I, c) => (m) => {
    k?.(I.date, c, m);
  }, [k]), Nt = be((I) => (c) => {
    const m = Number(c.target.value), C = o.setMonth(o.startOfMonth(I), m);
    de(C);
  }, [o, de]), Qe = be((I) => (c) => {
    const m = Number(c.target.value), C = o.setYear(o.startOfMonth(I), m);
    de(C);
  }, [o, de]), { className: At, style: Ht } = Rt(() => ({
    className: [a[T.Root], t.className].filter(Boolean).join(" "),
    style: { ...D?.[T.Root], ...t.style }
  }), [a, t.className, t.style, D]), St = Ko(t), it = Ce(null);
  Oa(it, !!t.animate, {
    classNames: a,
    months: ae,
    focused: ke,
    dateLib: o
  });
  const Ve = {
    dayPickerProps: t,
    selected: G,
    select: st,
    isSelected: ve,
    months: ae,
    nextMonth: se,
    previousMonth: re,
    goToMonth: de,
    getModifiers: je,
    components: n,
    classNames: a,
    styles: D,
    labels: s,
    formatters: r
  };
  return S.createElement(
    cr.Provider,
    { value: Ve },
    S.createElement(
      n.Root,
      { rootRef: t.animate ? it : void 0, className: At, style: Ht, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...St },
      S.createElement(
        n.Months,
        { className: a[T.Months], style: D?.[T.Months] },
        !t.hideNavigation && !g && S.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[T.Nav], style: D?.[T.Nav], "aria-label": xt(), onPreviousClick: at, onNextClick: ze, previousMonth: re, nextMonth: se }),
        ae.map((I, c) => S.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[T.Month],
            style: D?.[T.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: c,
            displayIndex: c,
            calendarMonth: I
          },
          g === "around" && !t.hideNavigation && c === 0 && S.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[T.PreviousMonthButton], tabIndex: re ? void 0 : -1, "aria-disabled": re ? void 0 : !0, "aria-label": Et(re), onClick: at, "data-animated-button": t.animate ? "true" : void 0 },
            S.createElement(n.Chevron, { disabled: re ? void 0 : !0, className: a[T.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          S.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[T.MonthCaption], style: D?.[T.MonthCaption], calendarMonth: I, displayIndex: c }, l?.startsWith("dropdown") ? S.createElement(
            n.DropdownNav,
            { className: a[T.Dropdowns], style: D?.[T.Dropdowns] },
            (() => {
              const m = l === "dropdown" || l === "dropdown-months" ? S.createElement(n.MonthsDropdown, { key: "month", className: a[T.MonthsDropdown], "aria-label": Be(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Nt(I.date), options: ca(I.date, xe, ue, r, o), style: D?.[T.Dropdown], value: o.getMonth(I.date) }) : S.createElement("span", { key: "month" }, $(I.date, o)), C = l === "dropdown" || l === "dropdown-years" ? S.createElement(n.YearsDropdown, { key: "year", className: a[T.YearsDropdown], "aria-label": Pt(o.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Qe(I.date), options: ua(xe, ue, r, o, !!t.reverseYears), style: D?.[T.Dropdown], value: o.getYear(I.date) }) : S.createElement("span", { key: "year" }, le(I.date, o));
              return o.getMonthYearOrder() === "year-first" ? [C, m] : [m, C];
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
            } }, N(I.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            S.createElement(n.CaptionLabel, { className: a[T.CaptionLabel], role: "status", "aria-live": "polite" }, N(I.date, o.options, o))
          )),
          g === "around" && !t.hideNavigation && c === d - 1 && S.createElement(
            n.NextMonthButton,
            { type: "button", className: a[T.NextMonthButton], tabIndex: se ? void 0 : -1, "aria-disabled": se ? void 0 : !0, "aria-label": ot(se), onClick: ze, "data-animated-button": t.animate ? "true" : void 0 },
            S.createElement(n.Chevron, { disabled: se ? void 0 : !0, className: a[T.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          c === d - 1 && g === "after" && !t.hideNavigation && S.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[T.Nav], style: D?.[T.Nav], "aria-label": xt(), onPreviousClick: at, onNextClick: ze, previousMonth: re, nextMonth: se }),
          S.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": u === "multiple" || u === "range", "aria-label": et(I.date, o.options, o) || void 0, className: a[T.MonthGrid], style: D?.[T.MonthGrid] },
            !t.hideWeekdays && S.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[T.Weekdays], style: D?.[T.Weekdays] },
              Y && S.createElement(n.WeekNumberHeader, { "aria-label": It(o.options), className: a[T.WeekNumberHeader], style: D?.[T.WeekNumberHeader], scope: "col" }, H()),
              Ut.map((m) => S.createElement(n.Weekday, { "aria-label": _t(m, o.options, o), className: a[T.Weekday], key: String(m), style: D?.[T.Weekday], scope: "col" }, ee(m, o.options, o)))
            ),
            S.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[T.Weeks], style: D?.[T.Weeks] }, I.weeks.map((m) => S.createElement(
              n.Week,
              { className: a[T.Week], key: m.weekNumber, style: D?.[T.Week], week: m },
              Y && // biome-ignore lint/a11y/useSemanticElements: react component
              S.createElement(n.WeekNumber, { week: m, style: D?.[T.WeekNumber], "aria-label": Ft(m.weekNumber, {
                locale: i
              }), className: a[T.WeekNumber], scope: "row", role: "rowheader" }, W(m.weekNumber, o)),
              m.days.map((C) => {
                const { date: _ } = C, E = je(C);
                if (E[L.focused] = !E.hidden && !!ke?.isEqualTo(C), E[we.selected] = ve?.(_) || E.selected, hn(G)) {
                  const { from: R, to: ie } = G;
                  E[we.range_start] = !!(R && ie && o.isSameDay(_, R)), E[we.range_end] = !!(R && ie && o.isSameDay(_, ie)), E[we.range_middle] = _e(G, _, !0, o);
                }
                const z = la(E, D, t.modifiersStyles), Q = Vo(E, a, t.modifiersClassNames), F = !vt && !E.hidden ? $e(_, E, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  S.createElement(n.Day, { key: `${o.format(_, "yyyy-MM-dd")}_${o.format(C.displayMonth, "yyyy-MM")}`, day: C, modifiers: E, className: Q.join(" "), style: z, role: "gridcell", "aria-selected": E.selected || void 0, "aria-label": F, "data-day": o.format(_, "yyyy-MM-dd"), "data-month": C.outside ? o.format(_, "yyyy-MM") : void 0, "data-selected": E.selected || void 0, "data-disabled": E.disabled || void 0, "data-hidden": E.hidden || void 0, "data-outside": C.outside || void 0, "data-focused": E.focused || void 0, "data-today": E.today || void 0 }, !E.hidden && vt ? S.createElement(n.DayButton, { className: a[T.DayButton], style: D?.[T.DayButton], type: "button", day: C, modifiers: E, disabled: E.disabled || void 0, tabIndex: Ue(C) ? 0 : -1, "aria-label": Ze(_, E, o.options, o), onClick: $t(C, E), onBlur: Bt(C, E), onFocus: Me(C, E), onKeyDown: kt(C, E), onMouseEnter: Mt(C, E), onMouseLeave: Ae(C, E) }, M(_, o.options, o)) : !E.hidden && M(C.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      S.createElement(n.Footer, { className: a[T.Footer], style: D?.[T.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const za = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qa = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), On = (e) => {
  const t = Qa(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Dr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Va = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Ga = {
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
const Ka = An(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: o,
    iconNode: i,
    ...a
  }, l) => rn(
    "svg",
    {
      ref: l,
      ...Ga,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Dr("lucide", s),
      ...!o && !Va(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...i.map(([u, g]) => rn(u, g)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
const Pe = (e, t) => {
  const n = An(
    ({ className: r, ...s }, o) => rn(Ka, {
      ref: o,
      iconNode: t,
      className: Dr(
        `lucide-${za(On(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = On(e), n;
};
const Xa = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], Ja = Pe("bookmark", Xa);
const ei = [
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
], Vt = Pe("calendar-days", ei);
const ti = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ni = Pe("chevron-down", ti);
const ri = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], wr = Pe("chevron-left", ri);
const si = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], xr = Pe("chevron-right", si);
const oi = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], ai = Pe("circle-question-mark", oi);
const ii = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ci = Pe("plus", ii);
const li = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], di = Pe("trash-2", li);
const ui = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Cn = Pe("x", ui);
function fi(e, t) {
  const n = pi(t);
  return "formatToParts" in n ? mi(n, e) : gi(n, e);
}
const hi = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function mi(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const o = hi[n[s].type];
      o !== void 0 && (r[o] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function gi(e, t) {
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
const Gt = {}, Tn = new Intl.DateTimeFormat("en-US", {
  hourCycle: "h23",
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), yi = Tn === "06/25/2014, 00:00:00" || Tn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function pi(e) {
  return Gt[e] || (Gt[e] = yi ? new Intl.DateTimeFormat("en-US", {
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
  })), Gt[e];
}
function vr(e, t, n, r, s, o, i) {
  const a = /* @__PURE__ */ new Date(0);
  return a.setUTCFullYear(e, t, n), a.setUTCHours(r, s, o, i), a;
}
const Wn = 36e5, bi = 6e4, Kt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function kr(e, t, n) {
  if (!e)
    return 0;
  let r = Kt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, o;
  if (r = Kt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), Yn(s) ? -(s * Wn) : NaN;
  if (r = Kt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const i = parseInt(r[3], 10);
    return Yn(s, i) ? (o = Math.abs(s) * Wn + i * bi, r[1] === "+" ? -o : o) : NaN;
  }
  if (xi(e)) {
    t = new Date(t || Date.now());
    const i = n ? t : Di(t), a = on(i, e);
    return -(n ? a : wi(t, a, e));
  }
  return NaN;
}
function Di(e) {
  return vr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function on(e, t) {
  const n = fi(e, t), r = vr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const o = s % 1e3;
  return s -= o >= 0 ? o : 1e3 + o, r - s;
}
function wi(e, t, n) {
  let s = e.getTime() - t;
  const o = on(new Date(s), n);
  if (t === o)
    return t;
  s -= o - t;
  const i = on(new Date(s), n);
  return o === i ? o : Math.max(o, i);
}
function Yn(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const En = {};
function xi(e) {
  if (En[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), En[e] = !0, !0;
  } catch {
    return !1;
  }
}
function _n(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const vi = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, Xt = 36e5, Fn = 6e4, ki = 2, ce = {
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
  timeZone: vi
};
function Mi(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? ki : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = Ni(e), { year: s, restDateString: o } = Si(r.date, n), i = Oi(o, s);
  if (i === null || isNaN(i.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (i) {
    const a = i.getTime();
    let l = 0, u;
    if (r.time && (l = Ci(r.time), l === null || isNaN(l)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (u = kr(r.timeZone || t.timeZone, new Date(a + l)), isNaN(u))
        return /* @__PURE__ */ new Date(NaN);
    } else
      u = _n(new Date(a + l)), u = _n(new Date(a + l + u));
    return new Date(a + l + u);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Ni(e) {
  const t = {};
  let n = ce.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = ce.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = ce.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function Si(e, t) {
  if (e) {
    const n = ce.YYY[t], r = ce.YYYYY[t];
    let s = ce.YYYY.exec(e) || r.exec(e);
    if (s) {
      const o = s[1];
      return {
        year: parseInt(o, 10),
        restDateString: e.slice(o.length)
      };
    }
    if (s = ce.YY.exec(e) || n.exec(e), s) {
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
function Oi(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let o = ce.MM.exec(e);
  if (o)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1, Pn(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (o = ce.DDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0);
    const i = parseInt(o[1], 10);
    return Yi(t, i) ? (n.setUTCFullYear(t, 0, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ce.MMDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1;
    const i = parseInt(o[2], 10);
    return Pn(t, r, i) ? (n.setUTCFullYear(t, r, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = ce.Www.exec(e), o)
    return s = parseInt(o[1], 10) - 1, Un(s) ? In(t, s) : /* @__PURE__ */ new Date(NaN);
  if (o = ce.WwwD.exec(e), o) {
    s = parseInt(o[1], 10) - 1;
    const i = parseInt(o[2], 10) - 1;
    return Un(s, i) ? In(t, s, i) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ci(e) {
  let t, n, r = ce.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), Jt(t) ? t % 24 * Xt : NaN;
  if (r = ce.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), Jt(t, n) ? t % 24 * Xt + n * Fn : NaN;
  if (r = ce.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return Jt(t, n, s) ? t % 24 * Xt + n * Fn + s * 1e3 : NaN;
  }
  return null;
}
function In(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const Ti = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Wi = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Mr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Pn(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = Mr(e);
    if (r && n > Wi[t] || !r && n > Ti[t])
      return !1;
  }
  return !0;
}
function Yi(e, t) {
  if (t < 1)
    return !1;
  const n = Mr(e);
  return !(n && t > 366 || !n && t > 365);
}
function Un(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function Jt(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function Ei(e, t, n) {
  e = Mi(e, n);
  const r = kr(t, e, !0), s = new Date(e.getTime() - r), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), o.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), o;
}
const an = 0, Xi = !1, nt = !0, Ji = "firstFullWeek", _i = "UTC";
function P(e) {
  const t = Xs(`${e}T00:00:00.000Z`);
  return Ei(t, _i);
}
function q(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Yt() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Fi(e, t, n) {
  const r = P(e);
  let s;
  switch (t) {
    case "day":
      s = We(r, n);
      break;
    case "week":
      s = ln(r, n);
      break;
    case "month":
      s = Ee(r, n);
      break;
    case "quarter":
      s = Zn(r, n);
      break;
    default:
      s = r;
  }
  return q(s);
}
function Ii(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = P(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = We(s, 1), r.includes(s.getDay()) || o++;
    return q(s);
  } else
    return Fi(e, t, n - 1);
}
function Pi(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = P(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = We(s, -1), r.includes(s.getDay()) || o++;
    return q(s);
  } else {
    const s = P(e);
    let o;
    switch (t) {
      case "day":
        o = We(s, -(n - 1));
        break;
      case "week":
        o = ln(s, -(n - 1));
        break;
      case "month":
        o = Ee(s, -(n - 1));
        break;
      case "quarter":
        o = Zn(s, -(n - 1));
        break;
      default:
        o = s;
    }
    return q(o);
  }
}
function Nr(e, t, n, r) {
  const s = P(e), o = P(t);
  if (s > o) return 0;
  if (n === "day" && r.length > 0)
    return Jn({ start: s, end: o }).filter(
      (l) => !r.includes(l.getDay())
    ).length;
  switch (n) {
    case "day":
      return Vn(o, s) + 1;
    case "week":
      return Lr(o, s) + 1;
    case "month":
      return Xn(o, s) + 1;
    case "quarter":
      return jr(o, s) + 1;
    default:
      return 1;
  }
}
function Ui(e, t, n) {
  const r = P(e), s = P(t);
  if (r > s) return [];
  const o = Jn({ start: r, end: s });
  return n.length === 0 ? o.map(q) : o.filter((i) => !n.includes(i.getDay())).map(q);
}
function $n(e, t, n = "day", r = [], s, o, i, a, l) {
  const u = Nr(
    e,
    t,
    n,
    r
  ), g = Ui(
    e,
    t,
    r
  ), d = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: u,
    excludedWeekdays: r,
    includedDatesUtc: g
  };
  return s !== void 0 && (d.excludeEnabled = s), o && (d.excludeFilterTypes = o), i && (d.excludedSpecificDates = i), a && (d.excludedSavedDates = a), l && (d.excludedDateRanges = l), d;
}
function ec(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function tc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, s] = t, o = parseInt(r, 10), i = parseInt(n, 10), a = parseInt(s, 10);
  if (isNaN(o) || isNaN(i) || isNaN(a) || o < 1 || o > 12 || i < 1 || i > 31 || a < 1900 || a > 2100)
    return null;
  const l = o.toString().padStart(2, "0"), u = i.toString().padStart(2, "0");
  return `${a}-${l}-${u}`;
}
function $i(e) {
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
function Bi() {
  const e = Yt(), t = P(e);
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
        const n = q(We(t, -1));
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
          weekStartsOn: an
        }), r = We(n, 6);
        return {
          startDateUtc: q(n),
          endDateUtc: q(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = te(t);
        return {
          startDateUtc: q(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = un(t);
        return {
          startDateUtc: q(n),
          endDateUtc: e
        };
      }
    }
  };
}
const Ai = "DateRangePickerDB", Hi = 1, Ne = "savedDateRanges";
class Ri {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(Ai, Hi);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (s) => {
          const o = s.target.result;
          o.objectStoreNames.contains(Ne) || o.createObjectStore(Ne, {
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
      const a = this.db.transaction([Ne], "readwrite").objectStore(Ne).put({
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
      const i = this.db.transaction([Ne], "readonly").objectStore(Ne).get(t);
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
      const i = this.db.transaction([Ne], "readwrite").objectStore(Ne).delete(t);
      i.onerror = () => r(i.error), i.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const o = this.db.transaction([Ne], "readwrite").objectStore(Ne).clear();
      o.onerror = () => n(o.error), o.onsuccess = () => t();
    });
  }
}
const rt = new Ri(), en = "savedDateRanges";
function qi({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r
}) {
  const [s, o] = B([]), [i, a] = B(!1), [l, u] = B(""), [g, d] = B(!1);
  Oe(() => {
    (async () => {
      await rt.init();
      const w = await rt.getData(
        en
      );
      w && o(w);
    })();
  }, []);
  const p = Bi(), y = (h) => {
    const { startDateUtc: w, endDateUtc: Y } = h();
    e(w, Y);
  }, b = async () => {
    if (l.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const h = {
      id: `saved-${Date.now()}`,
      label: l.trim(),
      selection: n,
      createdAt: Date.now()
    }, w = [...s, h];
    o(w), await rt.saveData(en, w), u(""), a(!1);
  }, O = async (h) => {
    const w = s.filter((Y) => Y.id !== h);
    o(w), await rt.saveData(en, w);
  }, x = (h) => {
    t ? t(h.selection) : e(h.selection.startDateUtc, h.selection.endDateUtc);
  }, k = (h, w) => {
    const Y = (D) => (/* @__PURE__ */ new Date(D + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return h === w ? Y(h) : `${Y(h)} - ${Y(w)}`;
  };
  return /* @__PURE__ */ v(
    "div",
    {
      className: "w-72 bg-white border-r border-gray-200 py-4 flex flex-col h-full overflow-hidden",
      style: { ...r },
      children: [
        /* @__PURE__ */ v("div", { className: "mb-3 px-4 flex-shrink-0", children: [
          /* @__PURE__ */ f("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ f("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
          /* @__PURE__ */ f("div", { className: "", children: Object.values(p).map((h) => {
            const { startDateUtc: w, endDateUtc: Y } = h.getValue();
            return /* @__PURE__ */ v(
              "button",
              {
                onClick: () => y(h.getValue),
                className: "w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all",
                children: [
                  /* @__PURE__ */ f("div", { className: "text-sm font-semibold text-gray-900", children: h.label }),
                  /* @__PURE__ */ f("div", { className: "text-xs text-gray-600 leading-relaxed mt-0.5", children: k(w, Y) })
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
                onClick: () => d(!g),
                className: "text-gray-400 hover:text-gray-600",
                children: /* @__PURE__ */ f(ai, { className: "w-3 h-3" })
              }
            )
          ] }) }),
          g && /* @__PURE__ */ f("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
          s.length === 0 ? /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ f("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: s.map((h) => /* @__PURE__ */ f(
            "div",
            {
              className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
              children: /* @__PURE__ */ v("div", { className: "flex items-start justify-between px-3 py-2", children: [
                /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => x(h),
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
                    onClick: () => O(h.id),
                    className: "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2",
                    children: /* @__PURE__ */ f(di, { className: "w-3.5 h-3.5" })
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
                /* @__PURE__ */ f(ci, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          )
        ] }),
        i && /* @__PURE__ */ v(ft, { children: [
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
                  value: l,
                  onChange: (h) => u(h.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (h) => {
                    h.key === "Enter" && b();
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
                  onClick: b,
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
const ji = [
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
function Li({
  selectedRange: e,
  onSelect: t
}) {
  const n = ne(e.from), [r, s] = B(n);
  P(Yt());
  const o = (d, p) => {
    const y = yt(pt(/* @__PURE__ */ new Date(), d), p);
    if (!e.from) {
      t({ from: y, to: y });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      y < e.from ? t({ from: y, to: e.from }) : t({ from: e.from, to: y });
      return;
    }
    t({ from: y, to: y });
  }, i = (d, p) => {
    if (!e.from || !e.to) return !1;
    const y = Je(e.from), b = ne(e.from), O = Je(e.to), x = ne(e.to), k = d * 12 + p, h = b * 12 + y, w = x * 12 + O;
    return k >= h && k <= w;
  }, a = (d, p) => {
    if (!e.from) return !1;
    const y = Je(e.from), b = ne(e.from);
    return d === b && p === y;
  }, l = (d, p) => {
    if (!e.to) return !1;
    const y = Je(e.to), b = ne(e.to);
    return d === b && p === y;
  }, u = (d, p) => !1, g = (d) => /* @__PURE__ */ v("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-4 gap-2", children: ji.map((p, y) => {
      const b = i(d, y), O = a(d, y), x = l(d, y), k = O || x, h = u();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !h && o(d, y),
          disabled: h,
          className: `
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${h ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : k ? "bg-[#003DB8] text-white" : b ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: p
        },
        p
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
          children: /* @__PURE__ */ f(wr, { className: "w-5 h-5" })
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
          children: /* @__PURE__ */ f(xr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "flex gap-8", children: [
      g(r),
      g(r + 1)
    ] })
  ] });
}
const Zi = ["Q1", "Q2", "Q3", "Q4"];
function zi({
  selectedRange: e,
  onSelect: t
}) {
  const n = ne(e.from), [r, s] = B(n);
  P(Yt());
  const o = (d, p) => {
    const y = zr(
      go(pt(/* @__PURE__ */ new Date(), d), p + 1)
    );
    if (!e.from) {
      t({ from: y, to: y });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      y < e.from ? t({ from: y, to: e.from }) : t({ from: e.from, to: y });
      return;
    }
    t({ from: y, to: y });
  }, i = (d, p) => {
    if (!e.from || !e.to) return !1;
    const y = Ct(e.from) - 1, b = ne(e.from), O = Ct(e.to) - 1, x = ne(e.to), k = d * 4 + p, h = b * 4 + y, w = x * 4 + O;
    return k >= h && k <= w;
  }, a = (d, p) => {
    if (!e.from) return !1;
    const y = Ct(e.from) - 1, b = ne(e.from);
    return d === b && p === y;
  }, l = (d, p) => {
    if (!e.to) return !1;
    const y = Ct(e.to) - 1, b = ne(e.to);
    return d === b && p === y;
  }, u = (d, p) => !1, g = (d) => /* @__PURE__ */ v("div", { className: "flex-1", children: [
    /* @__PURE__ */ f("div", { className: "text-center font-semibold text-lg mb-4", children: d }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-2 gap-3", children: Zi.map((p, y) => {
      const b = i(d, y), O = a(d, y), x = l(d, y), k = O || x, h = u();
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => !h && o(d, y),
          disabled: h,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${h ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : k ? "bg-blue-600 text-white" : b ? "bg-blue-100 text-blue-900" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: p
        },
        p
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
          children: /* @__PURE__ */ f(wr, { className: "w-5 h-5" })
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
          children: /* @__PURE__ */ f(xr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "flex gap-8", children: [
      g(r),
      g(r + 1)
    ] })
  ] });
}
function Bn({
  value: e,
  onChange: t,
  placeholder: n = "DD/MM/YYYY",
  className: r = "",
  onFocus: s
}) {
  const o = Ce(null), [i, a] = B(""), l = Ce(0), u = (b) => {
    if (!b || b.length !== 10) return "";
    const [O, x, k] = b.split("-");
    return `${k}/${x}/${O}`;
  }, g = (b) => {
    const O = b.replace(/\D/g, "");
    if (O.length !== 8) return null;
    const x = O.substring(0, 2), k = O.substring(2, 4), h = O.substring(4, 8), w = parseInt(k, 10), Y = parseInt(x, 10), D = parseInt(h, 10);
    return w < 1 || w > 12 || Y < 1 || Y > 31 || D < 1900 || D > 2100 ? null : `${h}-${k}-${x}`;
  };
  return Oe(() => {
    a(u(e));
  }, [e]), /* @__PURE__ */ f(
    "input",
    {
      ref: o,
      type: "text",
      value: i,
      onChange: (b) => {
        const O = b.target.value, x = b.target.selectionStart || 0, k = i;
        if (O.length < k.length) {
          if (O.replace(/\D/g, "").length < k.replace(/\D/g, "").length) {
            const D = O.replace(/\D/g, "");
            let N = "";
            if (D.length > 0 && (N = D.substring(0, 2), D.length > 2 && (N += "/" + D.substring(2, 4)), D.length > 4 && (N += "/" + D.substring(4, 8))), a(N), setTimeout(() => {
              if (o.current) {
                const M = Math.min(x, N.length);
                o.current.setSelectionRange(M, M);
              }
            }, 0), D.length === 8) {
              const M = g(N);
              M && t(M);
            }
          } else
            a(k), setTimeout(() => {
              o.current && o.current.setSelectionRange(x, x);
            }, 0);
          return;
        }
        const h = O.replace(/\D/g, "");
        let w = "";
        if (h.length > 0) {
          let D = h.substring(0, 2);
          if (D.length === 2) {
            const N = parseInt(D, 10);
            N > 31 ? D = "31" : N < 1 && D.length === 2 && (D = "01");
          }
          if (w = D, h.length > 2) {
            let N = h.substring(2, 4);
            if (N.length === 2) {
              const M = parseInt(N, 10);
              M > 12 ? N = "12" : M < 1 && N.length === 2 && (N = "01");
            }
            w += "/" + N;
          }
          if (h.length > 4) {
            let N = h.substring(4, 8);
            if (N.length === 4) {
              const M = parseInt(N, 10);
              M > 2100 ? N = "2100" : M < 1900 && (N = "1900");
            }
            w += "/" + N;
          }
        }
        a(w);
        let Y = x;
        if (w.length > k.length) {
          const D = w.length - k.length;
          Y = x + D;
        }
        if (w[Y] === "/" && Y++, setTimeout(() => {
          if (o.current) {
            const D = Math.min(Y, w.length);
            o.current.setSelectionRange(D, D);
          }
        }, 0), h.length === 8) {
          const D = g(w);
          D && t(D);
        }
      },
      onBlur: () => {
        if (i) {
          const b = g(i);
          b ? (t(b), a(u(b))) : a(u(e));
        }
      },
      onFocus: (b) => {
        s && s(b);
      },
      onKeyDown: (b) => {
        const O = o.current;
        if (!O) return;
        const x = O.selectionStart || 0;
        if (l.current = x, b.key === "ArrowLeft" || b.key === "ArrowRight") {
          setTimeout(() => {
            const k = O.selectionStart || 0;
            if (i[k] === "/") {
              const h = b.key === "ArrowLeft" ? -1 : 1;
              O.setSelectionRange(k + h, k + h);
            }
          }, 0);
          return;
        }
        if (!(b.key === "Backspace" || b.key === "Delete" || b.key === "Tab" || b.key === "Escape" || b.key === "Enter")) {
          if (!/^\d$/.test(b.key)) {
            b.preventDefault();
            return;
          }
          if (i[x] === "/") {
            b.preventDefault();
            const k = i.substring(0, x) + b.key + i.substring(x + 1);
            a(k), setTimeout(() => {
              if (o.current) {
                const h = x + 1;
                o.current.setSelectionRange(h, h);
              }
            }, 0);
            return;
          }
          if (x >= 3 && x <= 5) {
            const h = i.replace(/\D/g, "").substring(2, 4), w = h.length === 1 ? h : "", Y = b.key;
            if (h.length === 1 && x === 5) {
              const D = parseInt(w + Y, 10);
              if ((D === 0 || D > 12) && (b.preventDefault(), D > 12)) {
                const N = i.substring(0, 3) + w + "2" + i.substring(5);
                a(N), setTimeout(() => {
                  o.current && o.current.setSelectionRange(6, 6);
                }, 0);
              }
            }
          }
          if (x >= 0 && x <= 2) {
            const h = i.replace(/\D/g, "").substring(0, 2), w = h.length === 1 ? h : "", Y = b.key;
            if (h.length === 1 && x === 1) {
              const D = parseInt(w + Y, 10);
              if ((D === 0 || D > 31) && (b.preventDefault(), D > 31)) {
                const N = w + "1" + i.substring(2);
                a(N), setTimeout(() => {
                  o.current && o.current.setSelectionRange(2, 2);
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
const Qi = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], Vi = [
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
], tn = "var(--adrp-container-height, min(720px, 85vh))", nn = "var(--adrp-container-width, min(1200px, 98vw))";
function nc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const s = Yt(), o = {
    height: tn,
    minHeight: tn,
    maxHeight: tn,
    width: nn,
    minWidth: nn,
    maxWidth: nn,
    overflow: "hidden",
    ...r
  }, [i, a] = B(
    e?.unit || "day"
  ), [l, u] = B(
    e?.startDateUtc || s
  ), [g, d] = B(
    e?.endDateUtc || s
  ), [p, y] = B(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [b, O] = B(e?.duration || 1), [x, k] = B(
    e?.excludedWeekdays || []
  ), [h, w] = B(
    []
  ), Y = Ce(null), [D, N] = B(0), [M, $] = B(!1), [W, H] = B([]), [ee, le] = B(!1), [X, me] = B(null), [ae, xe] = B([]), [ue, re] = B([]), [se, de] = B(
    void 0
  ), je = Ce(null), [ve, st] = B([]), [G, J] = B(() => e?.startDateUtc ? te(P(e.startDateUtc)) : te(P(s))), [ke, Ue] = B(null), [Le, De] = B(() => e?.startDateUtc ? ne(P(e.startDateUtc)) : ne(P(s))), [Ze, $e] = B(null), [et, Be] = B(() => {
    if (e?.startDateUtc) {
      const m = ne(P(e.startDateUtc));
      return Math.floor(m / 10) * 10;
    }
    const c = ne(P(s));
    return Math.floor(c / 10) * 10;
  });
  Oe(() => {
    if (l && g) {
      const c = Nr(
        l,
        g,
        i,
        x
      );
      O(c);
    } else
      O(1);
  }, [l, g, i, x]), Oe(() => {
    if (Y.current) {
      const m = document.createElement("canvas").getContext("2d");
      if (m) {
        m.font = "14px system-ui, -apple-system, sans-serif";
        const C = m.measureText(b.toString()).width;
        N(12 + C + 4);
      }
    }
  }, [b]), Oe(() => {
    const c = (m) => {
      je.current && !je.current.contains(m.target) && le(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, []), Oe(() => {
    (async () => {
      await rt.init();
      const m = await rt.getData(
        "savedDateRanges"
      );
      m && st(m);
    })();
  }, []), Oe(() => {
    l && !g ? y("end") : !l && g && y("start");
  }, [l, g]);
  const xt = (c) => {
    u(c), c ? g || y("end") : y("start"), c && g && P(c) > P(g) && d(c), c && J(te(P(c)));
  }, Et = (c) => {
    d(c), c ? l || y("start") : y("end"), c && l && P(c) < P(l) && u(c), c && J(te(P(c)));
  }, ot = !nt, _t = (c) => {
    if (!(c <= 0)) {
      if (O(c), l) {
        const m = Ii(
          l,
          i,
          c,
          x
        );
        d(m), J(te(P(m)));
      } else if (g) {
        const m = Pi(
          g,
          i,
          c,
          x
        );
        u(m), J(te(P(m)));
      }
      y("start");
    }
  }, Ft = (c) => {
    a(c);
  }, It = (c) => {
    x.includes(c) ? k(x.filter((m) => m !== c)) : k([...x, c]);
  }, Pt = (c, m) => {
    u(c), d(m), y("start"), c && J(te(P(c)));
  }, Ut = (c) => {
    u(c.startDateUtc), d(c.endDateUtc), a(c.unit), k(c.excludedWeekdays), O(c.duration), y("start"), c.excludeEnabled !== void 0 && $(c.excludeEnabled), c.excludeFilterTypes ? H(c.excludeFilterTypes) : H([]), c.excludedSpecificDates ? w(c.excludedSpecificDates) : w([]), c.excludedSavedDates ? xe(c.excludedSavedDates) : xe([]), c.excludedDateRanges ? re(c.excludedDateRanges) : re([]), c.startDateUtc && J(te(P(c.startDateUtc)));
  }, vt = () => {
    u(s), d(s), k([]), y("start"), J(te(P(s)));
  }, at = () => {
    u(""), d(""), O(1), a("day"), k([]), y("start"), $(!1), H([]), w([]), xe([]), re([]), de(void 0), me(null), J(te(P(s)));
  }, ze = !l || l.trim() === "" || !g || g.trim() === "", $t = () => {
    if (ze)
      return;
    const c = $n(
      l,
      g,
      i,
      x,
      M,
      W,
      h,
      ae,
      ue
    );
    t(c);
  }, Me = (c) => {
    if (c?.from) {
      const m = q(c.from);
      if (u(m), c?.to) {
        const C = q(c.to);
        d(C), y("start");
      } else
        d(m), y("end");
    }
  }, Bt = (c, m) => {
    if (l && g && c?.to) {
      const C = q(m);
      p === "start" ? P(g).getTime() > P(C).getTime() ? u(C) : (u(C), d("")) : P(l).getTime() > P(C).getTime() ? (d(l), u(C)) : (d(C), u(l)), y(p === "start" ? "end" : "start");
      return;
    }
    if (!l && g && c?.from) {
      d(q(c?.from)), y("start");
      return;
    }
    if (!l && !g && c?.from) {
      u(q(c?.from)), d(""), y("end");
      return;
    }
    if (c?.from) {
      const C = q(c.from);
      if (u(C), c?.to) {
        const _ = q(c.to);
        d(_), y("start");
      } else
        d(C), y("end");
    }
  }, kt = (c) => {
    if (c && c.from) {
      const m = Ie(c.from, {
        weekStartsOn: an
      }), C = We(m, 6);
      if (c.to) {
        const _ = Ie(c.to, {
          weekStartsOn: an
        }), E = We(_, 6);
        Me({ from: m, to: E });
      } else
        Me({ from: m, to: C });
    }
  }, Mt = P(s), Ae = {
    from: l ? P(l) : void 0,
    to: g ? P(g) : void 0
  }, Nt = {
    from: l ? P(l) : Mt,
    to: g ? P(g) : Mt
  }, Qe = (c) => {
    const m = !nt, C = M && W.includes("days") && x.includes(c.getDay()), _ = M && W.includes("specific-date") && h.includes(q(c)), E = M && W.includes("saved-dates") && ae.some((Q) => {
      const F = ve.find((V) => V.id === Q);
      if (!F) return !1;
      const R = q(c);
      if (!(R >= F.selection.startDateUtc && R <= F.selection.endDateUtc)) return !1;
      if (F.selection.excludedWeekdays && F.selection.excludedWeekdays.length > 0 && F.selection.excludedWeekdays.includes(c.getDay()) || F.selection.excludedSpecificDates && F.selection.excludedSpecificDates.length > 0 && F.selection.excludedSpecificDates.includes(R) || F.selection.excludedSavedDates && F.selection.excludedSavedDates.some(
        (ye) => {
          const j = ve.find(
            (K) => K.id === ye
          );
          return j ? R >= j.selection.startDateUtc && R <= j.selection.endDateUtc : !1;
        }
      ))
        return !0;
      let ge = !1;
      return !!(F.selection.excludedDateRanges && (ge = F.selection.excludedDateRanges.some(
        (V) => R >= V.start && R <= V.end
      ), ge));
    }), z = M && W.includes("date-range") && ue.some((Q) => {
      const F = q(c);
      return F >= Q.start && F <= Q.end;
    });
    return m || C || _ || E || z;
  }, At = (c, m) => {
    const C = te(
      yt(pt(/* @__PURE__ */ new Date(), c), m)
    );
    J(C), Ue(null), De(c);
  }, Ht = (c) => {
    const m = Je(G), C = te(
      yt(pt(/* @__PURE__ */ new Date(), c), m)
    );
    J(C), $e(null), Be(Math.floor(c / 10) * 10);
  };
  Oe(() => {
    ke === null && De(ne(G));
  }, [G, ke]);
  const St = (c) => {
    const m = c - 1, C = c + 10, _ = ne(G), E = [];
    for (let z = m; z <= C; z++)
      E.push(z);
    return /* @__PURE__ */ v("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ f(
          "button",
          {
            onClick: () => Be(et - 10),
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
            onClick: () => Be(et + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: E.map((z) => {
        const Q = !nt, F = z < c || z > c + 9;
        return /* @__PURE__ */ f(
          "button",
          {
            onClick: () => Ht(z),
            disabled: Q,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${F ? "opacity-50 bg-gray-50 text-gray-500" : _ === z ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: z
          },
          z
        );
      }) })
    ] });
  }, it = (c) => /* @__PURE__ */ v("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ v("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => De(Le - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ f("div", { className: "text-lg font-semibold", children: c }),
      /* @__PURE__ */ f(
        "button",
        {
          onClick: () => De(Le + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ f("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "grid grid-cols-3 gap-2 w-full", children: Vi.map((m, C) => {
      const _ = !nt, E = ne(G) === c && Je(G) === C;
      return /* @__PURE__ */ f(
        "button",
        {
          onClick: () => At(c, C),
          disabled: _,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${E ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: m
        },
        m
      );
    }) })
  ] }), Ve = Ce(null), I = Ce(null);
  return Oe(() => {
    if (i !== "day") return;
    const c = (_, E) => {
      const z = _.querySelector(
        "span[data-month-name]"
      ), Q = _.querySelector(
        "span[data-year-name]"
      );
      if (z) {
        const V = _.textContent || "";
        _.style.gap = "6px";
        let ye = "";
        if (Q)
          ye = Q.textContent || "";
        else {
          const j = V.match(/\d{4}/);
          j && (ye = j[0]);
        }
        if (!Q && ye) {
          const j = document.createElement("span");
          j.textContent = ye, j.setAttribute("data-year-name", "true"), j.style.cursor = "pointer", j.onclick = (pe) => {
            pe.stopPropagation(), pe.preventDefault();
            const Ot = parseInt(ye, 10);
            if (!isNaN(Ot)) {
              const Ge = Math.floor(Ot / 10) * 10;
              Be(Ge), $e(E), Ue(null);
            }
          };
          const K = z.nextSibling;
          if (K && K.nodeType === Node.TEXT_NODE)
            K.parentNode?.insertBefore(j, K.nextSibling);
          else {
            const pe = document.createTextNode(" ");
            _.appendChild(pe), _.appendChild(j);
          }
        } else Q && (Q.onclick = (j) => {
          j.stopPropagation(), j.preventDefault();
          const K = parseInt(ye, 10);
          if (!isNaN(K)) {
            const pe = Math.floor(K / 10) * 10;
            Be(pe), $e(E), Ue(null);
          }
        });
        z.onclick = (j) => {
          j.stopPropagation(), j.preventDefault();
          const K = parseInt(ye, 10);
          isNaN(K) || (De(K), Ue(E), $e(null));
        };
        return;
      }
      const F = _.textContent || "", R = F.trim().split(/\s+/);
      let ie = "", ge = "";
      if (R.length >= 2)
        ie = R[0], ge = R[1];
      else if (R.length === 1) {
        const V = F.match(/^([A-Za-z]+)(\d{4})$/);
        if (V)
          ie = V[1], ge = V[2];
        else
          return;
      } else
        return;
      if (ie && ge) {
        const V = _.firstChild;
        if (_.style.gap = "6px", V && V.nodeType === Node.TEXT_NODE && (V.textContent || "").indexOf(ie) !== -1) {
          const K = document.createElement("span");
          K.textContent = ie, K.setAttribute("data-month-name", "true"), K.style.cursor = "pointer", K.onclick = (Ge) => {
            Ge.stopPropagation(), Ge.preventDefault();
            const ct = parseInt(ge, 10);
            isNaN(ct) || (De(ct), Ue(E), $e(null));
          };
          const pe = document.createElement("span");
          pe.textContent = ge, pe.setAttribute("data-year-name", "true"), pe.style.cursor = "pointer", pe.onclick = (Ge) => {
            Ge.stopPropagation(), Ge.preventDefault();
            const ct = parseInt(ge, 10);
            if (!isNaN(ct)) {
              const Sr = Math.floor(ct / 10) * 10;
              Be(Sr), $e(E), Ue(null);
            }
          }, _.innerHTML = "", _.appendChild(K);
          const Ot = document.createTextNode(" ");
          _.appendChild(Ot), _.appendChild(pe);
        }
      }
    }, m = (_, E) => {
      if (!_) return;
      _.querySelectorAll(".rdp-caption_label").forEach((Q, F) => {
        const R = Q, ie = E !== null ? E : F === 0 ? 0 : 1;
        ke === ie || Ze === ie || c(R, ie);
      });
    }, C = setTimeout(() => {
      ke === null && Ze === null ? m(Ve.current, null) : (m(Ve.current, 0), m(I.current, 1));
    }, 150);
    return () => clearTimeout(C);
  }, [i, G, ke, Ze]), /* @__PURE__ */ v(
    "div",
    {
      className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200",
      style: o,
      children: [
        /* @__PURE__ */ f(
          qi,
          {
            onPresetSelect: Pt,
            onSavedDateSelect: Ut,
            currentSelection: $n(
              l,
              g,
              i,
              x,
              M,
              W,
              h,
              ae,
              ue
            ),
            themeColors: r
          }
        ),
        /* @__PURE__ */ v("div", { className: "flex-1 flex flex-col min-h-0", children: [
          /* @__PURE__ */ v("div", { className: "px-6 pt-6 overflow-y-auto flex-1", children: [
            /* @__PURE__ */ f("div", { className: "flex gap-2 mb-4", children: ["day", "week", "month", "quarter"].map(
              (c) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => Ft(c),
                  className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${i === c ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
                  children: c.charAt(0).toUpperCase() + c.slice(1)
                },
                c
              )
            ) }),
            /* @__PURE__ */ v("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ f(
                  "label",
                  {
                    className: `block text-xs font-medium mb-1 ${p === "start" ? "text-blue-600" : "text-gray-600"}`,
                    children: "Start Date"
                  }
                ),
                /* @__PURE__ */ f(
                  Bn,
                  {
                    value: l,
                    onChange: xt,
                    placeholder: "DD/MM/YYYY",
                    onFocus: () => y("start"),
                    className: `w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${p === "start" ? "border-blue-500" : "border-gray-300"}`
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ f(
                  "label",
                  {
                    className: `block text-xs font-medium mb-1 ${p === "end" ? "text-blue-600" : "text-gray-600"}`,
                    children: "End Date"
                  }
                ),
                /* @__PURE__ */ f(
                  Bn,
                  {
                    value: g,
                    onChange: Et,
                    placeholder: "DD/MM/YYYY",
                    onFocus: () => y("end"),
                    className: `w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${p === "end" ? "border-blue-500" : "border-gray-300"}`
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ f("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Duration" }),
                /* @__PURE__ */ v("div", { className: "relative", children: [
                  /* @__PURE__ */ f(
                    "input",
                    {
                      ref: Y,
                      type: "number",
                      min: "1",
                      value: b,
                      onChange: (c) => _t(Number(c.target.value)),
                      className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "span",
                    {
                      className: "absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none",
                      style: { left: `${D}px` },
                      children: $i(i)
                    }
                  )
                ] })
              ] })
            ] }),
            ot,
            /* @__PURE__ */ v("div", { className: "mb-4", children: [
              /* @__PURE__ */ v("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ f(
                  "input",
                  {
                    type: "checkbox",
                    id: "exclude-checkbox",
                    checked: M,
                    onChange: (c) => $(c.target.checked),
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
                /* @__PURE__ */ v("div", { className: "relative flex-1", ref: je, children: [
                  /* @__PURE__ */ f(
                    "button",
                    {
                      type: "button",
                      onClick: () => M && le(!ee),
                      disabled: !M,
                      className: "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                      children: /* @__PURE__ */ f(
                        "span",
                        {
                          className: W.length === 0 ? "text-gray-400" : "text-gray-700",
                          children: W.length === 0 ? "select a filter" : W.length === 1 ? (() => {
                            switch (W[0]) {
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
                          })() : `${W.length} filters selected`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ f(ni, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }),
                  ee && M && /* @__PURE__ */ f("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", children: /* @__PURE__ */ v("div", { className: "p-2 space-y-1", children: [
                    /* @__PURE__ */ v("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ f(
                        "input",
                        {
                          type: "checkbox",
                          checked: W.includes("days"),
                          onChange: (c) => {
                            c.target.checked ? H([
                              ...W,
                              "days"
                            ]) : H(
                              W.filter((m) => m !== "days")
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
                          checked: W.includes("specific-date"),
                          onChange: (c) => {
                            c.target.checked ? H([
                              ...W,
                              "specific-date"
                            ]) : H(
                              W.filter(
                                (m) => m !== "specific-date"
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
                          checked: W.includes("saved-dates"),
                          onChange: (c) => {
                            c.target.checked ? H([
                              ...W,
                              "saved-dates"
                            ]) : H(
                              W.filter(
                                (m) => m !== "saved-dates"
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
                          checked: W.includes("date-range"),
                          onChange: (c) => {
                            c.target.checked ? H([
                              ...W,
                              "date-range"
                            ]) : H(
                              W.filter(
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
              M && W.length > 0 && /* @__PURE__ */ v("div", { className: "flex gap-2 items-center", children: [
                W.includes("days") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => me(
                      X === "days" ? null : "days"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${X === "days" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Vt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Days (",
                        x.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                W.includes("specific-date") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => me(
                      X === "specific-date" ? null : "specific-date"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${X === "specific-date" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Vt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Dates (",
                        h.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                W.includes("saved-dates") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => me(
                      X === "saved-dates" ? null : "saved-dates"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${X === "saved-dates" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Ja, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Saved (",
                        ae.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                W.includes("date-range") && /* @__PURE__ */ v(
                  "button",
                  {
                    onClick: () => me(
                      X === "date-range" ? null : "date-range"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${X === "date-range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ f(Vt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ v("span", { children: [
                        "Date Ranges (",
                        ue.length,
                        " selected)"
                      ] })
                    ]
                  }
                )
              ] }),
              M && X === "days" && W.includes("days") && /* @__PURE__ */ f("div", { className: "mt-3 flex gap-2", children: Qi.map((c) => /* @__PURE__ */ f(
                "button",
                {
                  onClick: () => It(c.value),
                  className: `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${x.includes(c.value) ? "bg-red-100 text-red-700 border-2 border-red-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                  children: c.label
                },
                c.value
              )) }),
              M && X === "specific-date" && W.includes("specific-date") && /* @__PURE__ */ v("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ f("p", { className: "text-xs text-gray-500 text-center mb-2", children: "Click individual dates to exclude them" }),
                /* @__PURE__ */ f("div", { className: "flex justify-center p-4 border border-gray-200 rounded-md bg-gray-50", children: /* @__PURE__ */ f(
                  Re,
                  {
                    mode: "multiple",
                    selected: h.map((c) => P(c)),
                    onSelect: (c) => {
                      c && w(
                        c.map((m) => q(m))
                      );
                    },
                    numberOfMonths: 2,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                h.length > 0 && /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: h.map((c) => /* @__PURE__ */ v(
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
                              h.filter((m) => m !== c)
                            );
                          },
                          className: "hover:bg-red-200 rounded-full p-0.5",
                          children: /* @__PURE__ */ f(Cn, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  },
                  c
                )) })
              ] }),
              M && X === "saved-dates" && W.includes("saved-dates") && /* @__PURE__ */ f("div", { className: "mt-3 flex flex-col gap-3", children: ve.length === 0 ? /* @__PURE__ */ f("p", { className: "text-sm text-gray-500 text-center py-4", children: "No saved dates available" }) : /* @__PURE__ */ f("div", { className: "space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2", children: ve.map((c) => {
                const m = ae.includes(
                  c.id
                );
                return /* @__PURE__ */ v(
                  "div",
                  {
                    className: `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${m ? "bg-red-50 border border-red-300" : "bg-white hover:bg-gray-50 border border-gray-200"}`,
                    onClick: () => {
                      xe(
                        m ? ae.filter(
                          (C) => C !== c.id
                        ) : [
                          ...ae,
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
              M && X === "date-range" && W.includes("date-range") && /* @__PURE__ */ v("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ f("div", { className: "border border-gray-200 rounded-md bg-gray-50 p-4", children: /* @__PURE__ */ f(
                  Re,
                  {
                    mode: "range",
                    selected: se,
                    onSelect: (c) => de(c),
                    numberOfMonths: 2,
                    disabled: (c) => !nt,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                se?.from && se?.to && /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => {
                        const c = {
                          id: `range-${Date.now()}`,
                          start: q(se.from),
                          end: q(se.to)
                        };
                        re([
                          ...ue,
                          c
                        ]), de(void 0);
                      },
                      className: "px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors",
                      children: "Add Date Range"
                    }
                  ),
                  /* @__PURE__ */ f(
                    "button",
                    {
                      onClick: () => de(void 0),
                      className: "px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors",
                      children: "Clear Selection"
                    }
                  )
                ] }),
                ue.length > 0 && /* @__PURE__ */ v("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ f("p", { className: "text-xs text-gray-600 font-medium", children: "Excluded Date Ranges:" }),
                  /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-2", children: ue.map((c) => /* @__PURE__ */ v(
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
                              re(
                                ue.filter(
                                  (m) => m.id !== c.id
                                )
                              );
                            },
                            className: "hover:bg-red-200 rounded-full p-0.5",
                            children: /* @__PURE__ */ f(Cn, { className: "w-3 h-3" })
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
              i === "day" && /* @__PURE__ */ f("div", { className: "flex gap-4", children: Ze !== null ? Ze === 0 ? (
                // When yearsViewIndex === 0, show years grid on left and single calendar on right
                /* @__PURE__ */ v(ft, { children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: St(et)
                    }
                  ),
                  /* @__PURE__ */ f("div", { ref: I, children: /* @__PURE__ */ f(
                    Re,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Ae,
                      onSelect: Me,
                      month: te(Ee(G, 1)),
                      onMonthChange: (c) => {
                        const m = new Date(G), _ = new Date(c).getMonth() - m.getMonth();
                        _ !== 1 && _ !== -11 && J(
                          te(Ee(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: Qe,
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
                /* @__PURE__ */ v(ft, { children: [
                  /* @__PURE__ */ f("div", { ref: Ve, children: /* @__PURE__ */ f(
                    Re,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Ae,
                      onSelect: Me,
                      month: G,
                      onMonthChange: J,
                      numberOfMonths: 1,
                      disabled: Qe,
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
                      children: St(et)
                    }
                  )
                ] })
              ) : ke === null ? (
                // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
                /* @__PURE__ */ f("div", { ref: Ve, children: /* @__PURE__ */ f(
                  Re,
                  {
                    mode: "range",
                    navLayout: "around",
                    selected: Ae,
                    onSelect: (c, m) => {
                      Bt(c, m);
                    },
                    month: G,
                    onMonthChange: J,
                    numberOfMonths: 2,
                    disabled: Qe,
                    modifiersClassNames: {
                      selected: "rdp-day_selected bg-[#003DB8]",
                      disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                    },
                    classNames: {
                      chevron: "fill-black"
                    }
                  }
                ) })
              ) : ke === 0 ? (
                // When monthsViewIndex === 0, show months grid on left and single calendar on right
                /* @__PURE__ */ v(ft, { children: [
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: it(Le)
                    }
                  ),
                  /* @__PURE__ */ f("div", { ref: I, children: /* @__PURE__ */ f(
                    Re,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Ae,
                      onSelect: Me,
                      month: te(Ee(G, 1)),
                      onMonthChange: (c) => {
                        const m = new Date(G), _ = new Date(c).getMonth() - m.getMonth();
                        _ !== 1 && _ !== -11 && J(
                          te(Ee(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: Qe,
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
                /* @__PURE__ */ v(ft, { children: [
                  /* @__PURE__ */ f("div", { ref: Ve, children: /* @__PURE__ */ f(
                    Re,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: Ae,
                      onSelect: Me,
                      month: G,
                      onMonthChange: J,
                      numberOfMonths: 1,
                      disabled: Qe,
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
                      children: it(Le)
                    }
                  )
                ] })
              ) }),
              i === "week" && /* @__PURE__ */ f(
                Re,
                {
                  mode: "range",
                  navLayout: "around",
                  showWeekNumber: !0,
                  locale: void 0,
                  formatters: {
                    formatWeekNumber: (c) => `W${String(c).padStart(2, "0")}`
                  },
                  selected: Ae,
                  onSelect: kt,
                  onWeekNumberClick: (c, m) => {
                    m && m.length > 0 && kt({
                      from: m[0],
                      to: m[m.length - 1]
                    });
                  },
                  month: G,
                  onMonthChange: J,
                  numberOfMonths: 2,
                  disabled: (c) => {
                    const m = !nt, C = M && W.includes("days") && x.includes(c.getDay()), _ = M && W.includes("specific-date") && h.includes(q(c)), E = M && W.includes("saved-dates") && ae.some((Q) => {
                      const F = ve.find(
                        (V) => V.id === Q
                      );
                      if (!F) return !1;
                      const R = q(c);
                      if (!(R >= F.selection.startDateUtc && R <= F.selection.endDateUtc)) return !1;
                      if (F.selection.excludedWeekdays && F.selection.excludedWeekdays.length > 0 && F.selection.excludedWeekdays.includes(c.getDay()) || F.selection.excludedSpecificDates && F.selection.excludedSpecificDates.length > 0 && F.selection.excludedSpecificDates.includes(R) || F.selection.excludedSavedDates && F.selection.excludedSavedDates.some(
                        (ye) => {
                          const j = ve.find(
                            (K) => K.id === ye
                          );
                          return j ? R >= j.selection.startDateUtc && R <= j.selection.endDateUtc : !1;
                        }
                      ))
                        return !0;
                      let ge = !1;
                      return !!(F.selection.excludedDateRanges && (ge = F.selection.excludedDateRanges.some(
                        (V) => R >= V.start && R <= V.end
                      ), ge));
                    }), z = M && W.includes("date-range") && ue.some((Q) => {
                      const F = q(c);
                      return F >= Q.start && F <= Q.end;
                    });
                    return m || C || _ || E || z;
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
              i === "month" && /* @__PURE__ */ f(
                Li,
                {
                  selectedRange: Nt,
                  onSelect: Me
                }
              ),
              i === "quarter" && /* @__PURE__ */ f(
                zi,
                {
                  selectedRange: Nt,
                  onSelect: Me
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ v("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
            /* @__PURE__ */ f(
              "button",
              {
                onClick: vt,
                className: "px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
                children: "Today"
              }
            ),
            /* @__PURE__ */ v("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: at,
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
                  onClick: $t,
                  disabled: !!(ze || ot),
                  className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${ze || ot ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
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
  nt as ALLOW_FUTURE_DATES,
  nc as AdvancedDateRangePicker,
  Xi as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  Ji as WEEK_NUMBERING_MODE,
  an as WEEK_STARTS_ON,
  Nr as calcDurationFromRange,
  Ii as calcEndFromDuration,
  Pi as calcStartFromDuration,
  $n as createSelection,
  ec as formatDisplayDate,
  q as formatUtc,
  Bi as getPresets,
  Yt as getTodayUtc,
  $i as getUnitAbbreviation,
  tc as parseDisplayDate,
  P as parseUtc
};
