import { jsxs as N, jsx as m, Fragment as mt } from "react/jsx-runtime";
import C, { createContext as Cr, useContext as Tr, useCallback as ve, useRef as Ye, useLayoutEffect as Wr, useState as R, useEffect as Me, useMemo as jt, forwardRef as Rn, createElement as on } from "react";
function Yr(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Er = {}, gt = {};
function Je(e, t) {
  try {
    const r = (Er[e] ||= new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format)(t).split("GMT")[1];
    return r in gt ? gt[r] : gn(r, r.split(":"));
  } catch {
    if (e in gt) return gt[e];
    const n = e?.match(_r);
    return n ? gn(e, n.slice(1)) : NaN;
  }
}
const _r = /([+-]\d\d):?(\d\d)?/;
function gn(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), s = +(t[2] || 0) / 60;
  return gt[e] = n * 60 + r > 0 ? n * 60 + r + s : n * 60 - r - s;
}
class Ee extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Je(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), qn(this), an(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Ee(...n, t) : new Ee(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Ee(+this, t);
  }
  getTimezoneOffset() {
    const t = -Je(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), an(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Ee(+new Date(t), this.timeZone);
  }
  //#endregion
}
const yn = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!yn.test(e)) return;
  const t = e.replace(yn, "$1UTC");
  Ee.prototype[t] && (e.startsWith("get") ? Ee.prototype[e] = function() {
    return this.internal[t]();
  } : (Ee.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Fr(this), +this;
  }, Ee.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), an(this), +this;
  }));
});
function an(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Je(e.timeZone, e) * 60));
}
function Fr(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), qn(e);
}
function qn(e) {
  const t = Je(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), i = s - o, a = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  i && a && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + i);
  const l = s - n;
  l && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + l);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const g = s > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, f = Math.round(-(Je(e.timeZone, e) * 60)) % 60;
  (f || g) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + f), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + f + g));
  const w = Je(e.timeZone, e), D = w > 0 ? Math.floor(w) : Math.ceil(w), T = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - D, x = D !== n, b = T - l;
  if (x && b) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + b);
    const u = Je(e.timeZone, e), y = u > 0 ? Math.floor(u) : Math.ceil(u), O = D - y;
    O && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + O), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + O));
  }
}
class le extends Ee {
  //#region static
  static tz(t, ...n) {
    return n.length ? new le(...n, t) : new le(Date.now(), t);
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
    return `${t} GMT${n}${r}${s} (${Yr(this.timeZone, this)})`;
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
    return new le(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new le(+new Date(t), this.timeZone);
  }
  //#endregion
}
const jn = 6048e5, Ir = 864e5, Ln = 6e4, zn = 36e5, pn = Symbol.for("constructDateFrom");
function V(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && pn in e ? e[pn](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function $(e, t) {
  return V(t || e, e);
}
function Q(e, t, n) {
  const r = $(e, n?.in);
  return isNaN(t) ? V(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Fe(e, t, n) {
  const r = $(e, n?.in);
  if (isNaN(t)) return V(e, NaN);
  if (!t)
    return r;
  const s = r.getDate(), o = V(e, r.getTime());
  o.setMonth(r.getMonth() + t + 1, 0);
  const i = o.getDate();
  return s >= i ? o : (r.setFullYear(
    o.getFullYear(),
    o.getMonth(),
    s
  ), r);
}
let Pr = {};
function wt() {
  return Pr;
}
function J(e, t) {
  const n = wt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = $(e, t?.in), o = s.getDay(), i = (o < r ? 7 : 0) + o - r;
  return s.setDate(s.getDate() - i), s.setHours(0, 0, 0, 0), s;
}
function yt(e, t) {
  return J(e, { ...t, weekStartsOn: 1 });
}
function Zn(e, t) {
  const n = $(e, t?.in), r = n.getFullYear(), s = V(n, 0);
  s.setFullYear(r + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const o = yt(s), i = V(n, 0);
  i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
  const a = yt(i);
  return n.getTime() >= o.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
}
function bn(e) {
  const t = $(e), n = new Date(
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
function je(e, ...t) {
  const n = V.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function pt(e, t) {
  const n = $(e, t?.in);
  return n.setHours(0, 0, 0, 0), n;
}
function ln(e, t, n) {
  const [r, s] = je(
    n?.in,
    e,
    t
  ), o = pt(r), i = pt(s), a = +o - bn(o), l = +i - bn(i);
  return Math.round((a - l) / Ir);
}
function Ur(e, t) {
  const n = Zn(e, t), r = V(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), yt(r);
}
function Qn(e, t, n) {
  return Fe(e, t * 3, n);
}
function dn(e, t, n) {
  return Q(e, t * 7, n);
}
function $r(e, t, n) {
  return Fe(e, t * 12, n);
}
function Br(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = V.bind(null, s));
    const o = $(s, r);
    (!n || n < o || isNaN(+o)) && (n = o);
  }), V(r, n || NaN);
}
function Ar(e, t) {
  let n, r = t?.in;
  return e.forEach((s) => {
    !r && typeof s == "object" && (r = V.bind(null, s));
    const o = $(s, r);
    (!n || n > o || isNaN(+o)) && (n = o);
  }), V(r, n || NaN);
}
function Lt(e, t) {
  const n = +$(e) - +$(t);
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Hr(e, t, n) {
  const [r, s] = je(
    n?.in,
    e,
    t
  );
  return +pt(r) == +pt(s);
}
function Vn(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Rr(e) {
  return !(!Vn(e) && typeof e != "number" || isNaN(+$(e)));
}
function Gn(e, t, n) {
  const [r, s] = je(
    n?.in,
    e,
    t
  ), o = r.getFullYear() - s.getFullYear(), i = r.getMonth() - s.getMonth();
  return o * 12 + i;
}
function Wt(e, t) {
  const n = $(e, t?.in);
  return Math.trunc(n.getMonth() / 3) + 1;
}
function Kn(e, t, n) {
  const [r, s] = je(
    n?.in,
    e,
    t
  ), o = Dn(r, s), i = Math.abs(
    ln(r, s)
  );
  r.setDate(r.getDate() - o * i);
  const a = +(Dn(r, s) === -o), l = o * (i - a);
  return l === 0 ? 0 : l;
}
function Dn(e, t) {
  const n = e.getFullYear() - t.getFullYear() || e.getMonth() - t.getMonth() || e.getDate() - t.getDate() || e.getHours() - t.getHours() || e.getMinutes() - t.getMinutes() || e.getSeconds() - t.getSeconds() || e.getMilliseconds() - t.getMilliseconds();
  return n < 0 ? -1 : n > 0 ? 1 : n;
}
function Xn(e) {
  return (t) => {
    const n = Math.trunc, r = n(t);
    return r === 0 ? 0 : r;
  };
}
function qr(e, t) {
  const n = $(e, t?.in);
  return n.setHours(23, 59, 59, 999), n;
}
function ot(e, t) {
  const n = $(e, t?.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function jr(e, t) {
  const n = $(e, t?.in);
  return +qr(n, t) == +ot(n, t);
}
function Jn(e, t, n) {
  const [r, s, o] = je(
    n?.in,
    e,
    e,
    t
  ), i = Lt(s, o), a = Math.abs(
    Gn(s, o)
  );
  if (a < 1) return 0;
  s.getMonth() === 1 && s.getDate() > 27 && s.setDate(30), s.setMonth(s.getMonth() - i * a);
  let l = Lt(s, o) === -i;
  jr(r) && a === 1 && Lt(r, o) === 1 && (l = !1);
  const d = i * (a - +l);
  return d === 0 ? 0 : d;
}
function Lr(e, t, n) {
  const r = Jn(e, t, n) / 3;
  return Xn()(r);
}
function zr(e, t, n) {
  const r = Kn(e, t, n) / 7;
  return Xn()(r);
}
function un(e, t) {
  const [n, r] = je(e, t.start, t.end);
  return { start: n, end: r };
}
function er(e, t) {
  const { start: n, end: r } = un(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(V(n, i)), i.setDate(i.getDate() + a), i.setHours(0, 0, 0, 0);
  return s ? l.reverse() : l;
}
function Zr(e, t) {
  const { start: n, end: r } = un(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0), i.setDate(1);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(V(n, i)), i.setMonth(i.getMonth() + a);
  return s ? l.reverse() : l;
}
function Qr(e, t) {
  const n = $(e, t?.in), r = n.getMonth(), s = r - r % 3;
  return n.setMonth(s, 1), n.setHours(0, 0, 0, 0), n;
}
function ne(e, t) {
  const n = $(e, t?.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Vr(e, t) {
  const n = $(e, t?.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function fn(e, t) {
  const n = $(e, t?.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Gr(e, t) {
  const { start: n, end: r } = un(t?.in, e);
  let s = +n > +r;
  const o = s ? +n : +r, i = s ? r : n;
  i.setHours(0, 0, 0, 0), i.setMonth(0, 1);
  let a = 1;
  const l = [];
  for (; +i <= o; )
    l.push(V(n, i)), i.setFullYear(i.getFullYear() + a);
  return s ? l.reverse() : l;
}
function tr(e, t) {
  const n = wt(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, s = $(e, t?.in), o = s.getDay(), i = (o < r ? -7 : 0) + 6 - (o - r);
  return s.setDate(s.getDate() + i), s.setHours(23, 59, 59, 999), s;
}
function Kr(e, t) {
  return tr(e, { ...t, weekStartsOn: 1 });
}
const Xr = {
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
}, Jr = (e, t, n) => {
  let r;
  const s = Xr[e];
  return typeof s == "string" ? r = s : t === 1 ? r = s.one : r = s.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function zt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const es = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, ts = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, ns = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, rs = {
  date: zt({
    formats: es,
    defaultWidth: "full"
  }),
  time: zt({
    formats: ts,
    defaultWidth: "full"
  }),
  dateTime: zt({
    formats: ns,
    defaultWidth: "full"
  })
}, ss = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, os = (e, t, n, r) => ss[e];
function ut(e) {
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
const as = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, is = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, cs = {
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
}, ls = {
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
}, ds = {
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
}, us = {
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
}, fs = (e, t) => {
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
}, hs = {
  ordinalNumber: fs,
  era: ut({
    values: as,
    defaultWidth: "wide"
  }),
  quarter: ut({
    values: is,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: ut({
    values: cs,
    defaultWidth: "wide"
  }),
  day: ut({
    values: ls,
    defaultWidth: "wide"
  }),
  dayPeriod: ut({
    values: ds,
    defaultWidth: "wide",
    formattingValues: us,
    defaultFormattingWidth: "wide"
  })
};
function ft(e) {
  return (t, n = {}) => {
    const r = n.width, s = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], o = t.match(s);
    if (!o)
      return null;
    const i = o[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(a) ? gs(a, (f) => f.test(i)) : (
      // [TODO] -- I challenge you to fix the type
      ms(a, (f) => f.test(i))
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
function ms(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function gs(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function ys(e) {
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
const ps = /^(\d+)(th|st|nd|rd)?/i, bs = /\d+/i, Ds = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ws = {
  any: [/^b/i, /^(a|c)/i]
}, xs = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, vs = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ks = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Ms = {
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
}, Ns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ss = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Os = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Cs = {
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
}, Ts = {
  ordinalNumber: ys({
    matchPattern: ps,
    parsePattern: bs,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: ft({
    matchPatterns: Ds,
    defaultMatchWidth: "wide",
    parsePatterns: ws,
    defaultParseWidth: "any"
  }),
  quarter: ft({
    matchPatterns: xs,
    defaultMatchWidth: "wide",
    parsePatterns: vs,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: ft({
    matchPatterns: ks,
    defaultMatchWidth: "wide",
    parsePatterns: Ms,
    defaultParseWidth: "any"
  }),
  day: ft({
    matchPatterns: Ns,
    defaultMatchWidth: "wide",
    parsePatterns: Ss,
    defaultParseWidth: "any"
  }),
  dayPeriod: ft({
    matchPatterns: Os,
    defaultMatchWidth: "any",
    parsePatterns: Cs,
    defaultParseWidth: "any"
  })
}, hn = {
  code: "en-US",
  formatDistance: Jr,
  formatLong: rs,
  formatRelative: os,
  localize: hs,
  match: Ts,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ws(e, t) {
  const n = $(e, t?.in);
  return ln(n, fn(n)) + 1;
}
function nr(e, t) {
  const n = $(e, t?.in), r = +yt(n) - +Ur(n);
  return Math.round(r / jn) + 1;
}
function rr(e, t) {
  const n = $(e, t?.in), r = n.getFullYear(), s = wt(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? s.firstWeekContainsDate ?? s.locale?.options?.firstWeekContainsDate ?? 1, i = V(t?.in || e, 0);
  i.setFullYear(r + 1, 0, o), i.setHours(0, 0, 0, 0);
  const a = J(i, t), l = V(t?.in || e, 0);
  l.setFullYear(r, 0, o), l.setHours(0, 0, 0, 0);
  const d = J(l, t);
  return +n >= +a ? r + 1 : +n >= +d ? r : r - 1;
}
function Ys(e, t) {
  const n = wt(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, s = rr(e, t), o = V(t?.in || e, 0);
  return o.setFullYear(s, 0, r), o.setHours(0, 0, 0, 0), J(o, t);
}
function sr(e, t) {
  const n = $(e, t?.in), r = +J(n, t) - +Ys(n, t);
  return Math.round(r / jn) + 1;
}
function q(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const Re = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return q(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : q(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return q(e.getDate(), t.length);
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
    return q(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return q(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return q(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return q(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), s = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return q(s, t.length);
  }
}, nt = {
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
      const r = e.getFullYear(), s = r > 0 ? r : 1 - r;
      return n.ordinalNumber(s, { unit: "year" });
    }
    return Re.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const s = rr(e, r), o = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const i = o % 100;
      return q(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : q(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Zn(e);
    return q(n, t.length);
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
    return q(n, t.length);
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
        return q(r, 2);
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
        return q(r, 2);
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
        return q(r + 1, 2);
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
    const s = sr(e, r);
    return t === "wo" ? n.ordinalNumber(s, { unit: "week" }) : q(s, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = nr(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : q(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Re.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Ws(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : q(r, t.length);
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
        return q(o, 2);
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
        return q(o, t.length);
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
        return q(s, t.length);
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
    switch (r === 12 ? s = nt.noon : r === 0 ? s = nt.midnight : s = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? s = nt.evening : r >= 12 ? s = nt.afternoon : r >= 4 ? s = nt.morning : s = nt.night, t) {
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
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : q(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : q(r, t.length);
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
        return vn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Xe(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Xe(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return vn(r);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Xe(r);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Xe(r, ":");
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
        return "GMT" + xn(r, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Xe(r, ":");
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
        return "GMT" + xn(r, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Xe(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return q(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return q(+e, t.length);
  }
};
function xn(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(s) : n + String(s) + t + q(o, 2);
}
function vn(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + q(Math.abs(e) / 60, 2) : Xe(e, t);
}
function Xe(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), s = q(Math.trunc(r / 60), 2), o = q(r % 60, 2);
  return n + s + t + o;
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
}, or = (e, t) => {
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
}, Es = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], s = n[2];
  if (!s)
    return kn(e, t);
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
  return o.replace("{{date}}", kn(r, t)).replace("{{time}}", or(s, t));
}, _s = {
  p: or,
  P: Es
}, Fs = /^D+$/, Is = /^Y+$/, Ps = ["D", "DD", "YY", "YYYY"];
function Us(e) {
  return Fs.test(e);
}
function $s(e) {
  return Is.test(e);
}
function Bs(e, t, n) {
  const r = As(e, t, n);
  if (console.warn(r), Ps.includes(e)) throw new RangeError(r);
}
function As(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Hs = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Rs = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, qs = /^'([^]*?)'?$/, js = /''/g, Ls = /[a-zA-Z]/;
function zs(e, t, n) {
  const r = wt(), s = n?.locale ?? r.locale ?? hn, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, a = $(e, n?.in);
  if (!Rr(a))
    throw new RangeError("Invalid time value");
  let l = t.match(Rs).map((g) => {
    const f = g[0];
    if (f === "p" || f === "P") {
      const w = _s[f];
      return w(g, s.formatLong);
    }
    return g;
  }).join("").match(Hs).map((g) => {
    if (g === "''")
      return { isToken: !1, value: "'" };
    const f = g[0];
    if (f === "'")
      return { isToken: !1, value: Zs(g) };
    if (wn[f])
      return { isToken: !0, value: g };
    if (f.match(Ls))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + f + "`"
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
    const f = g.value;
    (!n?.useAdditionalWeekYearTokens && $s(f) || !n?.useAdditionalDayOfYearTokens && Us(f)) && Bs(f, t, String(e));
    const w = wn[f[0]];
    return w(a, f, s.localize, d);
  }).join("");
}
function Zs(e) {
  const t = e.match(qs);
  return t ? t[1].replace(js, "'") : e;
}
function Qs(e, t) {
  const n = $(e, t?.in), r = n.getFullYear(), s = n.getMonth(), o = V(n, 0);
  return o.setFullYear(r, s + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function et(e, t) {
  return $(e, t?.in).getMonth();
}
function re(e, t) {
  return $(e, t?.in).getFullYear();
}
function Vs(e, t) {
  return +$(e) > +$(t);
}
function Gs(e, t) {
  return +$(e) < +$(t);
}
function Ks(e, t, n) {
  const [r, s] = je(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear() && r.getMonth() === s.getMonth();
}
function Xs(e, t, n) {
  const [r, s] = je(
    n?.in,
    e,
    t
  );
  return r.getFullYear() === s.getFullYear();
}
function Js(e, t) {
  const n = () => V(t?.in, NaN), s = ro(e);
  let o;
  if (s.date) {
    const d = so(s.date, 2);
    o = oo(d.restDateString, d.year);
  }
  if (!o || isNaN(+o)) return n();
  const i = +o;
  let a = 0, l;
  if (s.time && (a = ao(s.time), isNaN(a)))
    return n();
  if (s.timezone) {
    if (l = io(s.timezone), isNaN(l)) return n();
  } else {
    const d = new Date(i + a), g = $(0, t?.in);
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
  return $(i + a + l, t?.in);
}
const Yt = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, eo = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, to = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, no = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function ro(e) {
  const t = {}, n = e.split(Yt.dateTimeDelimiter);
  let r;
  if (n.length > 2)
    return t;
  if (/:/.test(n[0]) ? r = n[0] : (t.date = n[0], r = n[1], Yt.timeZoneDelimiter.test(t.date) && (t.date = e.split(Yt.timeZoneDelimiter)[0], r = e.substr(
    t.date.length,
    e.length
  ))), r) {
    const s = Yt.timezone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timezone = s[1]) : t.time = r;
  }
  return t;
}
function so(e, t) {
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
function oo(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const n = e.match(eo);
  if (!n) return /* @__PURE__ */ new Date(NaN);
  const r = !!n[4], s = ht(n[1]), o = ht(n[2]) - 1, i = ht(n[3]), a = ht(n[4]), l = ht(n[5]) - 1;
  if (r)
    return ho(t, a, l) ? co(t, a, l) : /* @__PURE__ */ new Date(NaN);
  {
    const d = /* @__PURE__ */ new Date(0);
    return !uo(t, o, i) || !fo(t, s) ? /* @__PURE__ */ new Date(NaN) : (d.setUTCFullYear(t, o, Math.max(s, i)), d);
  }
}
function ht(e) {
  return e ? parseInt(e) : 1;
}
function ao(e) {
  const t = e.match(to);
  if (!t) return NaN;
  const n = Zt(t[1]), r = Zt(t[2]), s = Zt(t[3]);
  return mo(n, r, s) ? n * zn + r * Ln + s * 1e3 : NaN;
}
function Zt(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function io(e) {
  if (e === "Z") return 0;
  const t = e.match(no);
  if (!t) return 0;
  const n = t[1] === "+" ? -1 : 1, r = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return go(r, s) ? n * (r * zn + s * Ln) : NaN;
}
function co(e, t, n) {
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = (t - 1) * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const lo = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function ar(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function uo(e, t, n) {
  return t >= 0 && t <= 11 && n >= 1 && n <= (lo[t] || (ar(e) ? 29 : 28));
}
function fo(e, t) {
  return t >= 1 && t <= (ar(e) ? 366 : 365);
}
function ho(e, t, n) {
  return t >= 1 && t <= 53 && n >= 0 && n <= 6;
}
function mo(e, t, n) {
  return e === 24 ? t === 0 && n === 0 : n >= 0 && n < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function go(e, t) {
  return t >= 0 && t <= 59;
}
function bt(e, t, n) {
  const r = $(e, n?.in), s = r.getFullYear(), o = r.getDate(), i = V(e, 0);
  i.setFullYear(s, t, 15), i.setHours(0, 0, 0, 0);
  const a = Qs(i);
  return r.setMonth(t, Math.min(o, a)), r;
}
function yo(e, t, n) {
  const r = $(e, n?.in), s = Math.trunc(r.getMonth() / 3) + 1, o = t - s;
  return bt(r, r.getMonth() + o * 3);
}
function Dt(e, t, n) {
  const r = $(e, n?.in);
  return isNaN(+r) ? V(e, NaN) : (r.setFullYear(t), r);
}
const Mn = 5, po = 4;
function bo(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, s = t.addDays(e, -r + 1), o = t.addDays(s, Mn * 7 - 1);
  return t.getMonth(e) === t.getMonth(o) ? Mn : po;
}
function ir(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
function Do(e, t) {
  const n = ir(e, t), r = bo(e, t);
  return t.addDays(n, r * 7 - 1);
}
class be {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? le.tz(this.options.timeZone) : new this.Date(), this.newDate = (r, s, o) => this.overrides?.newDate ? this.overrides.newDate(r, s, o) : this.options.timeZone ? new le(r, s, o, this.options.timeZone) : new Date(r, s, o), this.addDays = (r, s) => this.overrides?.addDays ? this.overrides.addDays(r, s) : Q(r, s), this.addMonths = (r, s) => this.overrides?.addMonths ? this.overrides.addMonths(r, s) : Fe(r, s), this.addWeeks = (r, s) => this.overrides?.addWeeks ? this.overrides.addWeeks(r, s) : dn(r, s), this.addYears = (r, s) => this.overrides?.addYears ? this.overrides.addYears(r, s) : $r(r, s), this.differenceInCalendarDays = (r, s) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, s) : ln(r, s), this.differenceInCalendarMonths = (r, s) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, s) : Gn(r, s), this.eachMonthOfInterval = (r) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Zr(r), this.eachYearOfInterval = (r) => {
      const s = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Gr(r), o = new Set(s.map((a) => this.getYear(a)));
      if (o.size === s.length)
        return s;
      const i = [];
      return o.forEach((a) => {
        i.push(new Date(a, 0, 1));
      }), i;
    }, this.endOfBroadcastWeek = (r) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Do(r, this), this.endOfISOWeek = (r) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(r) : Kr(r), this.endOfMonth = (r) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(r) : ot(r), this.endOfWeek = (r, s) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(r, s) : tr(r, this.options), this.endOfYear = (r) => this.overrides?.endOfYear ? this.overrides.endOfYear(r) : Vr(r), this.format = (r, s, o) => {
      const i = this.overrides?.format ? this.overrides.format(r, s, this.options) : zs(r, s, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
    }, this.getISOWeek = (r) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(r) : nr(r), this.getMonth = (r, s) => this.overrides?.getMonth ? this.overrides.getMonth(r, this.options) : et(r, this.options), this.getYear = (r, s) => this.overrides?.getYear ? this.overrides.getYear(r, this.options) : re(r, this.options), this.getWeek = (r, s) => this.overrides?.getWeek ? this.overrides.getWeek(r, this.options) : sr(r, this.options), this.isAfter = (r, s) => this.overrides?.isAfter ? this.overrides.isAfter(r, s) : Vs(r, s), this.isBefore = (r, s) => this.overrides?.isBefore ? this.overrides.isBefore(r, s) : Gs(r, s), this.isDate = (r) => this.overrides?.isDate ? this.overrides.isDate(r) : Vn(r), this.isSameDay = (r, s) => this.overrides?.isSameDay ? this.overrides.isSameDay(r, s) : Hr(r, s), this.isSameMonth = (r, s) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(r, s) : Ks(r, s), this.isSameYear = (r, s) => this.overrides?.isSameYear ? this.overrides.isSameYear(r, s) : Xs(r, s), this.max = (r) => this.overrides?.max ? this.overrides.max(r) : Br(r), this.min = (r) => this.overrides?.min ? this.overrides.min(r) : Ar(r), this.setMonth = (r, s) => this.overrides?.setMonth ? this.overrides.setMonth(r, s) : bt(r, s), this.setYear = (r, s) => this.overrides?.setYear ? this.overrides.setYear(r, s) : Dt(r, s), this.startOfBroadcastWeek = (r, s) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : ir(r, this), this.startOfDay = (r) => this.overrides?.startOfDay ? this.overrides.startOfDay(r) : pt(r), this.startOfISOWeek = (r) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(r) : yt(r), this.startOfMonth = (r) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(r) : ne(r), this.startOfWeek = (r, s) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(r, this.options) : J(r, this.options), this.startOfYear = (r) => this.overrides?.startOfYear ? this.overrides.startOfYear(r) : fn(r), this.options = { locale: hn, ...t }, this.overrides = n;
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
    return t && be.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: s } = this.options, o = n?.code;
    if (o && be.yearFirstLocales.has(o))
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
be.yearFirstLocales = /* @__PURE__ */ new Set([
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
const _e = new be();
class cr {
  constructor(t, n, r = _e) {
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
class wo {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class xo {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function vo(e) {
  return C.createElement("button", { ...e });
}
function ko(e) {
  return C.createElement("span", { ...e });
}
function Mo(e) {
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
function No(e) {
  const { day: t, modifiers: n, ...r } = e;
  return C.createElement("td", { ...r });
}
function So(e) {
  const { day: t, modifiers: n, ...r } = e, s = C.useRef(null);
  return C.useEffect(() => {
    n.focused && s.current?.focus();
  }, [n.focused]), C.createElement("button", { ref: s, ...r });
}
var F;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(F || (F = {}));
var z;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(z || (z = {}));
var Ne;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ne || (Ne = {}));
var pe;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(pe || (pe = {}));
function Oo(e) {
  const { options: t, className: n, components: r, classNames: s, ...o } = e, i = [s[F.Dropdown], n].join(" "), a = t?.find(({ value: l }) => l === o.value);
  return C.createElement(
    "span",
    { "data-disabled": o.disabled, className: s[F.DropdownRoot] },
    C.createElement(r.Select, { className: i, ...o }, t?.map(({ value: l, label: d, disabled: g }) => C.createElement(r.Option, { key: l, value: l, disabled: g }, d))),
    C.createElement(
      "span",
      { className: s[F.CaptionLabel], "aria-hidden": !0 },
      a?.label,
      C.createElement(r.Chevron, { orientation: "down", size: 18, className: s[F.Chevron] })
    )
  );
}
function Co(e) {
  return C.createElement("div", { ...e });
}
function To(e) {
  return C.createElement("div", { ...e });
}
function Wo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r }, e.children);
}
function Yo(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return C.createElement("div", { ...r });
}
function Eo(e) {
  return C.createElement("table", { ...e });
}
function _o(e) {
  return C.createElement("div", { ...e });
}
const lr = Cr(void 0);
function xt() {
  const e = Tr(lr);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Fo(e) {
  const { components: t } = xt();
  return C.createElement(t.Dropdown, { ...e });
}
function Io(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: s, ...o } = e, { components: i, classNames: a, labels: { labelPrevious: l, labelNext: d } } = xt(), g = ve((w) => {
    s && n?.(w);
  }, [s, n]), f = ve((w) => {
    r && t?.(w);
  }, [r, t]);
  return C.createElement(
    "nav",
    { ...o },
    C.createElement(
      i.PreviousMonthButton,
      { type: "button", className: a[F.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": l(r), onClick: f },
      C.createElement(i.Chevron, { disabled: r ? void 0 : !0, className: a[F.Chevron], orientation: "left" })
    ),
    C.createElement(
      i.NextMonthButton,
      { type: "button", className: a[F.NextMonthButton], tabIndex: s ? void 0 : -1, "aria-disabled": s ? void 0 : !0, "aria-label": d(s), onClick: g },
      C.createElement(i.Chevron, { disabled: s ? void 0 : !0, orientation: "right", className: a[F.Chevron] })
    )
  );
}
function Po(e) {
  const { components: t } = xt();
  return C.createElement(t.Button, { ...e });
}
function Uo(e) {
  return C.createElement("option", { ...e });
}
function $o(e) {
  const { components: t } = xt();
  return C.createElement(t.Button, { ...e });
}
function Bo(e) {
  const { rootRef: t, ...n } = e;
  return C.createElement("div", { ...n, ref: t });
}
function Ao(e) {
  return C.createElement("select", { ...e });
}
function Ho(e) {
  const { week: t, ...n } = e;
  return C.createElement("tr", { ...n });
}
function Ro(e) {
  return C.createElement("th", { ...e });
}
function qo(e) {
  return C.createElement(
    "thead",
    { "aria-hidden": !0 },
    C.createElement("tr", { ...e })
  );
}
function jo(e) {
  const { week: t, ...n } = e;
  return C.createElement("th", { ...n });
}
function Lo(e) {
  return C.createElement("th", { ...e });
}
function zo(e) {
  return C.createElement("tbody", { ...e });
}
function Zo(e) {
  const { components: t } = xt();
  return C.createElement(t.Dropdown, { ...e });
}
const Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: vo,
  CaptionLabel: ko,
  Chevron: Mo,
  Day: No,
  DayButton: So,
  Dropdown: Oo,
  DropdownNav: Co,
  Footer: To,
  Month: Wo,
  MonthCaption: Yo,
  MonthGrid: Eo,
  Months: _o,
  MonthsDropdown: Fo,
  Nav: Io,
  NextMonthButton: Po,
  Option: Uo,
  PreviousMonthButton: $o,
  Root: Bo,
  Select: Ao,
  Week: Ho,
  WeekNumber: jo,
  WeekNumberHeader: Lo,
  Weekday: Ro,
  Weekdays: qo,
  Weeks: zo,
  YearsDropdown: Zo
}, Symbol.toStringTag, { value: "Module" }));
function Ie(e, t, n = !1, r = _e) {
  let { from: s, to: o } = e;
  const { differenceInCalendarDays: i, isSameDay: a } = r;
  return s && o ? (i(o, s) < 0 && ([s, o] = [o, s]), i(t, s) >= (n ? 1 : 0) && i(o, t) >= (n ? 1 : 0)) : !n && o ? a(o, t) : !n && s ? a(s, t) : !1;
}
function dr(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function mn(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function ur(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function fr(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function hr(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function mr(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function Pe(e, t, n = _e) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: s, differenceInCalendarDays: o, isAfter: i } = n;
  return r.some((a) => {
    if (typeof a == "boolean")
      return a;
    if (n.isDate(a))
      return s(e, a);
    if (mr(a, n))
      return a.includes(e);
    if (mn(a))
      return Ie(a, e, !1, n);
    if (hr(a))
      return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
    if (dr(a)) {
      const l = o(a.before, e), d = o(a.after, e), g = l > 0, f = d < 0;
      return i(a.before, a.after) ? f && g : g || f;
    }
    return ur(a) ? o(e, a.after) > 0 : fr(a) ? o(a.before, e) > 0 : typeof a == "function" ? a(e) : !1;
  });
}
function Vo(e, t, n, r, s) {
  const { disabled: o, hidden: i, modifiers: a, showOutsideDays: l, broadcastCalendar: d, today: g } = t, { isSameDay: f, isSameMonth: w, startOfMonth: D, isBefore: v, endOfMonth: T, isAfter: x } = s, b = n && D(n), u = r && T(r), y = {
    [z.focused]: [],
    [z.outside]: [],
    [z.disabled]: [],
    [z.hidden]: [],
    [z.today]: []
  }, O = {};
  for (const p of e) {
    const { date: S, displayMonth: k } = p, I = !!(k && !w(S, k)), W = !!(b && v(S, b)), A = !!(u && x(S, u)), G = !!(o && Pe(S, o, s)), oe = !!(i && Pe(S, i, s)) || W || A || // Broadcast calendar will show outside days as default
    !d && !l && I || d && l === !1 && I, Z = f(S, g ?? s.today());
    I && y.outside.push(p), G && y.disabled.push(p), oe && y.hidden.push(p), Z && y.today.push(p), a && Object.keys(a).forEach((ge) => {
      const de = a?.[ge];
      de && Pe(S, de, s) && (O[ge] ? O[ge].push(p) : O[ge] = [p]);
    });
  }
  return (p) => {
    const S = {
      [z.focused]: !1,
      [z.disabled]: !1,
      [z.hidden]: !1,
      [z.outside]: !1,
      [z.today]: !1
    }, k = {};
    for (const I in y) {
      const W = y[I];
      S[I] = W.some((A) => A === p);
    }
    for (const I in O)
      k[I] = O[I].some((W) => W === p);
    return {
      ...S,
      // custom modifiers should override all the previous ones
      ...k
    };
  };
}
function Go(e, t, n = {}) {
  return Object.entries(e).filter(([, s]) => s === !0).reduce((s, [o]) => (n[o] ? s.push(n[o]) : t[z[o]] ? s.push(t[z[o]]) : t[Ne[o]] && s.push(t[Ne[o]]), s), [t[F.Day]]);
}
function Ko(e) {
  return {
    ...Qo,
    ...e
  };
}
function Xo(e) {
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
function Jo() {
  const e = {};
  for (const t in F)
    e[F[t]] = `rdp-${F[t]}`;
  for (const t in z)
    e[z[t]] = `rdp-${z[t]}`;
  for (const t in Ne)
    e[Ne[t]] = `rdp-${Ne[t]}`;
  for (const t in pe)
    e[pe[t]] = `rdp-${pe[t]}`;
  return e;
}
function gr(e, t, n) {
  return (n ?? new be(t)).formatMonthYear(e);
}
const ea = gr;
function ta(e, t, n) {
  return (n ?? new be(t)).format(e, "d");
}
function na(e, t = _e) {
  return t.format(e, "LLLL");
}
function ra(e, t, n) {
  return (n ?? new be(t)).format(e, "cccccc");
}
function sa(e, t = _e) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function oa() {
  return "";
}
function yr(e, t = _e) {
  return t.format(e, "yyyy");
}
const aa = yr, ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: gr,
  formatDay: ta,
  formatMonthCaption: ea,
  formatMonthDropdown: na,
  formatWeekNumber: sa,
  formatWeekNumberHeader: oa,
  formatWeekdayName: ra,
  formatYearCaption: aa,
  formatYearDropdown: yr
}, Symbol.toStringTag, { value: "Module" }));
function ca(e) {
  return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...ia,
    ...e
  };
}
function la(e, t, n, r, s) {
  const { startOfMonth: o, startOfYear: i, endOfYear: a, eachMonthOfInterval: l, getMonth: d } = s;
  return l({
    start: i(e),
    end: a(e)
  }).map((w) => {
    const D = r.formatMonthDropdown(w, s), v = d(w), T = t && w < o(t) || n && w > o(n) || !1;
    return { value: v, label: D, disabled: T };
  });
}
function da(e, t = {}, n = {}) {
  let r = { ...t?.[F.Day] };
  return Object.entries(e).filter(([, s]) => s === !0).forEach(([s]) => {
    r = {
      ...r,
      ...n?.[s]
    };
  }), r;
}
function ua(e, t, n) {
  const r = e.today(), s = t ? e.startOfISOWeek(r) : e.startOfWeek(r), o = [];
  for (let i = 0; i < 7; i++) {
    const a = e.addDays(s, i);
    o.push(a);
  }
  return o;
}
function fa(e, t, n, r, s = !1) {
  if (!e || !t)
    return;
  const { startOfYear: o, endOfYear: i, eachYearOfInterval: a, getYear: l } = r, d = o(e), g = i(t), f = a({ start: d, end: g });
  return s && f.reverse(), f.map((w) => {
    const D = n.formatYearDropdown(w, r);
    return {
      value: l(w),
      label: D,
      disabled: !1
    };
  });
}
function pr(e, t, n, r) {
  let s = (r ?? new be(n)).format(e, "PPPP");
  return t.today && (s = `Today, ${s}`), t.selected && (s = `${s}, selected`), s;
}
const ha = pr;
function br(e, t, n) {
  return (n ?? new be(t)).formatMonthYear(e);
}
const ma = br;
function ga(e, t, n, r) {
  let s = (r ?? new be(n)).format(e, "PPPP");
  return t?.today && (s = `Today, ${s}`), s;
}
function ya(e) {
  return "Choose the Month";
}
function pa() {
  return "";
}
function ba(e) {
  return "Go to the Next Month";
}
function Da(e) {
  return "Go to the Previous Month";
}
function wa(e, t, n) {
  return (n ?? new be(t)).format(e, "cccc");
}
function xa(e, t) {
  return `Week ${e}`;
}
function va(e) {
  return "Week Number";
}
function ka(e) {
  return "Choose the Year";
}
const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: ma,
  labelDay: ha,
  labelDayButton: pr,
  labelGrid: br,
  labelGridcell: ga,
  labelMonthDropdown: ya,
  labelNav: pa,
  labelNext: ba,
  labelPrevious: Da,
  labelWeekNumber: xa,
  labelWeekNumberHeader: va,
  labelWeekday: wa,
  labelYearDropdown: ka
}, Symbol.toStringTag, { value: "Module" })), vt = (e) => e instanceof HTMLElement ? e : null, Qt = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Na = (e) => vt(e.querySelector("[data-animated-month]")), Vt = (e) => vt(e.querySelector("[data-animated-caption]")), Gt = (e) => vt(e.querySelector("[data-animated-weeks]")), Sa = (e) => vt(e.querySelector("[data-animated-nav]")), Oa = (e) => vt(e.querySelector("[data-animated-weekdays]"));
function Ca(e, t, { classNames: n, months: r, focused: s, dateLib: o }) {
  const i = Ye(null), a = Ye(r), l = Ye(!1);
  Wr(() => {
    const d = a.current;
    if (a.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const g = o.isSameMonth(r[0].date, d[0].date), f = o.isAfter(r[0].date, d[0].date), w = f ? n[pe.caption_after_enter] : n[pe.caption_before_enter], D = f ? n[pe.weeks_after_enter] : n[pe.weeks_before_enter], v = i.current, T = e.current.cloneNode(!0);
    if (T instanceof HTMLElement ? (Qt(T).forEach((y) => {
      if (!(y instanceof HTMLElement))
        return;
      const O = Na(y);
      O && y.contains(O) && y.removeChild(O);
      const p = Vt(y);
      p && p.classList.remove(w);
      const S = Gt(y);
      S && S.classList.remove(D);
    }), i.current = T) : i.current = null, l.current || g || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    s)
      return;
    const x = v instanceof HTMLElement ? Qt(v) : [], b = Qt(e.current);
    if (b?.every((u) => u instanceof HTMLElement) && x && x.every((u) => u instanceof HTMLElement)) {
      l.current = !0, e.current.style.isolation = "isolate";
      const u = Sa(e.current);
      u && (u.style.zIndex = "1"), b.forEach((y, O) => {
        const p = x[O];
        if (!p)
          return;
        y.style.position = "relative", y.style.overflow = "hidden";
        const S = Vt(y);
        S && S.classList.add(w);
        const k = Gt(y);
        k && k.classList.add(D);
        const I = () => {
          l.current = !1, e.current && (e.current.style.isolation = ""), u && (u.style.zIndex = ""), S && S.classList.remove(w), k && k.classList.remove(D), y.style.position = "", y.style.overflow = "", y.contains(p) && y.removeChild(p);
        };
        p.style.pointerEvents = "none", p.style.position = "absolute", p.style.overflow = "hidden", p.setAttribute("aria-hidden", "true");
        const W = Oa(p);
        W && (W.style.opacity = "0");
        const A = Vt(p);
        A && (A.classList.add(f ? n[pe.caption_before_exit] : n[pe.caption_after_exit]), A.addEventListener("animationend", I));
        const G = Gt(p);
        G && G.classList.add(f ? n[pe.weeks_before_exit] : n[pe.weeks_after_exit]), y.insertBefore(p, y.firstChild);
      });
    }
  });
}
function Ta(e, t, n, r) {
  const s = e[0], o = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: l } = n ?? {}, { addDays: d, differenceInCalendarDays: g, differenceInCalendarMonths: f, endOfBroadcastWeek: w, endOfISOWeek: D, endOfMonth: v, endOfWeek: T, isAfter: x, startOfBroadcastWeek: b, startOfISOWeek: u, startOfWeek: y } = r, O = l ? b(s, r) : i ? u(s) : y(s), p = l ? w(o) : i ? D(v(o)) : T(v(o)), S = g(p, O), k = f(o, s) + 1, I = [];
  for (let G = 0; G <= S; G++) {
    const oe = d(O, G);
    if (t && x(oe, t))
      break;
    I.push(oe);
  }
  const A = (l ? 35 : 42) * k;
  if (a && I.length < A) {
    const G = A - I.length;
    for (let oe = 0; oe < G; oe++) {
      const Z = d(I[I.length - 1], 1);
      I.push(Z);
    }
  }
  return I;
}
function Wa(e) {
  const t = [];
  return e.reduce((n, r) => {
    const s = r.weeks.reduce((o, i) => o.concat(i.days.slice()), t.slice());
    return n.concat(s.slice());
  }, t.slice());
}
function Ya(e, t, n, r) {
  const { numberOfMonths: s = 1 } = n, o = [];
  for (let i = 0; i < s; i++) {
    const a = r.addMonths(e, i);
    if (t && a > t)
      break;
    o.push(a);
  }
  return o;
}
function Nn(e, t, n, r) {
  const { month: s, defaultMonth: o, today: i = r.today(), numberOfMonths: a = 1 } = e;
  let l = s || o || i;
  const { differenceInCalendarMonths: d, addMonths: g, startOfMonth: f } = r;
  if (n && d(n, l) < a - 1) {
    const w = -1 * (a - 1);
    l = g(n, w);
  }
  return t && d(l, t) < 0 && (l = t), f(l);
}
function Ea(e, t, n, r) {
  const { addDays: s, endOfBroadcastWeek: o, endOfISOWeek: i, endOfMonth: a, endOfWeek: l, getISOWeek: d, getWeek: g, startOfBroadcastWeek: f, startOfISOWeek: w, startOfWeek: D } = r, v = e.reduce((T, x) => {
    const b = n.broadcastCalendar ? f(x, r) : n.ISOWeek ? w(x) : D(x), u = n.broadcastCalendar ? o(x) : n.ISOWeek ? i(a(x)) : l(a(x)), y = t.filter((k) => k >= b && k <= u), O = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && y.length < O) {
      const k = t.filter((I) => {
        const W = O - y.length;
        return I > u && I <= s(u, W);
      });
      y.push(...k);
    }
    const p = y.reduce((k, I) => {
      const W = n.ISOWeek ? d(I) : g(I), A = k.find((oe) => oe.weekNumber === W), G = new cr(I, x, r);
      return A ? A.days.push(G) : k.push(new xo(W, [G])), k;
    }, []), S = new wo(x, p);
    return T.push(S), T;
  }, []);
  return n.reverseMonths ? v.reverse() : v;
}
function _a(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: s, startOfDay: o, startOfMonth: i, endOfMonth: a, addYears: l, endOfYear: d, newDate: g, today: f } = t, { fromYear: w, toYear: D, fromMonth: v, toMonth: T } = e;
  !n && v && (n = v), !n && w && (n = t.newDate(w, 0, 1)), !r && T && (r = T), !r && D && (r = g(D, 11, 31));
  const x = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = i(n) : w ? n = g(w, 0, 1) : !n && x && (n = s(l(e.today ?? f(), -100))), r ? r = a(r) : D ? r = g(D, 11, 31) : !r && x && (r = d(e.today ?? f())), [
    n && o(n),
    r && o(r)
  ];
}
function Fa(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, d = s ? o : 1, g = i(e);
  if (!t)
    return a(g, d);
  if (!(l(t, e) < o))
    return a(g, d);
}
function Ia(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: s, numberOfMonths: o } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: l } = r, d = s ? o ?? 1 : 1, g = i(e);
  if (!t)
    return a(g, -d);
  if (!(l(g, t) <= 0))
    return a(g, -d);
}
function Pa(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Et(e, t) {
  const [n, r] = R(e);
  return [t === void 0 ? n : t, r];
}
function Ua(e, t) {
  const [n, r] = _a(e, t), { startOfMonth: s, endOfMonth: o } = t, i = Nn(e, n, r, t), [a, l] = Et(
    i,
    // initialMonth is always computed from props.month if provided
    e.month ? i : void 0
  );
  Me(() => {
    const S = Nn(e, n, r, t);
    l(S);
  }, [e.timeZone]);
  const d = Ya(a, r, e, t), g = Ta(d, e.endMonth ? o(e.endMonth) : void 0, e, t), f = Ea(d, g, e, t), w = Pa(f), D = Wa(f), v = Ia(a, n, e, t), T = Fa(a, r, e, t), { disableNavigation: x, onMonthChange: b } = e, u = (S) => w.some((k) => k.days.some((I) => I.isEqualTo(S))), y = (S) => {
    if (x)
      return;
    let k = s(S);
    n && k < s(n) && (k = s(n)), r && k > s(r) && (k = s(r)), l(k), b?.(k);
  };
  return {
    months: f,
    weeks: w,
    days: D,
    navStart: n,
    navEnd: r,
    previousMonth: v,
    nextMonth: T,
    goToMonth: y,
    goToDay: (S) => {
      u(S) || y(S.date);
    }
  };
}
var We;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(We || (We = {}));
function Sn(e) {
  return !e[z.disabled] && !e[z.hidden] && !e[z.outside];
}
function $a(e, t, n, r) {
  let s, o = -1;
  for (const i of e) {
    const a = t(i);
    Sn(a) && (a[z.focused] && o < We.FocusedModifier ? (s = i, o = We.FocusedModifier) : r?.isEqualTo(i) && o < We.LastFocused ? (s = i, o = We.LastFocused) : n(i.date) && o < We.Selected ? (s = i, o = We.Selected) : a[z.today] && o < We.Today && (s = i, o = We.Today));
  }
  return s || (s = e.find((i) => Sn(t(i)))), s;
}
function Ba(e, t, n, r, s, o, i) {
  const { ISOWeek: a, broadcastCalendar: l } = o, { addDays: d, addMonths: g, addWeeks: f, addYears: w, endOfBroadcastWeek: D, endOfISOWeek: v, endOfWeek: T, max: x, min: b, startOfBroadcastWeek: u, startOfISOWeek: y, startOfWeek: O } = i;
  let S = {
    day: d,
    week: f,
    month: g,
    year: w,
    startOfWeek: (k) => l ? u(k, i) : a ? y(k) : O(k),
    endOfWeek: (k) => l ? D(k) : a ? v(k) : T(k)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? S = x([r, S]) : t === "after" && s && (S = b([s, S])), S;
}
function Dr(e, t, n, r, s, o, i, a = 0) {
  if (a > 365)
    return;
  const l = Ba(e, t, n.date, r, s, o, i), d = !!(o.disabled && Pe(l, o.disabled, i)), g = !!(o.hidden && Pe(l, o.hidden, i)), f = l, w = new cr(l, f, i);
  return !d && !g ? w : Dr(e, t, w, r, s, o, i, a + 1);
}
function Aa(e, t, n, r, s) {
  const { autoFocus: o } = e, [i, a] = R(), l = $a(t.days, n, r || (() => !1), i), [d, g] = R(o ? l : void 0);
  return {
    isFocusTarget: (T) => !!l?.isEqualTo(T),
    setFocused: g,
    focused: d,
    blur: () => {
      a(d), g(void 0);
    },
    moveFocus: (T, x) => {
      if (!d)
        return;
      const b = Dr(T, x, d, t.navStart, t.navEnd, e, s);
      b && (e.disableNavigation && !t.days.some((y) => y.isEqualTo(b)) || (t.goToDay(b), g(b)));
    }
  };
}
function Ha(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, i] = Et(n, s ? n : void 0), a = s ? n : o, { isSameDay: l } = t, d = (D) => a?.some((v) => l(v, D)) ?? !1, { min: g, max: f } = e;
  return {
    selected: a,
    select: (D, v, T) => {
      let x = [...a ?? []];
      if (d(D)) {
        if (a?.length === g || r && a?.length === 1)
          return;
        x = a?.filter((b) => !l(b, D));
      } else
        a?.length === f ? x = [D] : x = [...x, D];
      return s || i(x), s?.(x, D, v, T), x;
    },
    isSelected: d
  };
}
function Ra(e, t, n = 0, r = 0, s = !1, o = _e) {
  const { from: i, to: a } = t || {}, { isSameDay: l, isAfter: d, isBefore: g } = o;
  let f;
  if (!i && !a)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (i && !a)
    l(i, e) ? n === 0 ? f = { from: i, to: e } : s ? f = { from: i, to: void 0 } : f = void 0 : g(e, i) ? f = { from: e, to: i } : f = { from: i, to: e };
  else if (i && a)
    if (l(i, e) && l(a, e))
      s ? f = { from: i, to: a } : f = void 0;
    else if (l(i, e))
      f = { from: i, to: n > 0 ? void 0 : e };
    else if (l(a, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (g(e, i))
      f = { from: e, to: a };
    else if (d(e, i))
      f = { from: i, to: e };
    else if (d(e, a))
      f = { from: i, to: e };
    else
      throw new Error("Invalid range");
  if (f?.from && f?.to) {
    const w = o.differenceInCalendarDays(f.to, f.from);
    r > 0 && w > r ? f = { from: e, to: void 0 } : n > 1 && w < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function qa(e, t, n = _e) {
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
function On(e, t, n = _e) {
  return Ie(e, t.from, !1, n) || Ie(e, t.to, !1, n) || Ie(t, e.from, !1, n) || Ie(t, e.to, !1, n);
}
function ja(e, t, n = _e) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? Ie(e, a, !1, n) : mr(a, n) ? a.some((l) => Ie(e, l, !1, n)) : mn(a) ? a.from && a.to ? On(e, { from: a.from, to: a.to }, n) : !1 : hr(a) ? qa(e, a.dayOfWeek, n) : dr(a) ? n.isAfter(a.before, a.after) ? On(e, {
    from: n.addDays(a.after, 1),
    to: n.addDays(a.before, -1)
  }, n) : Pe(e.from, a, n) || Pe(e.to, a, n) : ur(a) || fr(a) ? Pe(e.from, a, n) || Pe(e.to, a, n) : !1))
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
function La(e, t) {
  const { disabled: n, excludeDisabled: r, selected: s, required: o, onSelect: i } = e, [a, l] = Et(s, i ? s : void 0), d = i ? s : a;
  return {
    selected: d,
    select: (w, D, v) => {
      const { min: T, max: x } = e, b = w ? Ra(w, d, T, x, o, t) : void 0;
      return r && n && b?.from && b.to && ja({ from: b.from, to: b.to }, n, t) && (b.from = w, b.to = void 0), i || l(b), i?.(b, w, D, v), b;
    },
    isSelected: (w) => d && Ie(d, w, !1, t)
  };
}
function za(e, t) {
  const { selected: n, required: r, onSelect: s } = e, [o, i] = Et(n, s ? n : void 0), a = s ? n : o, { isSameDay: l } = t;
  return {
    selected: a,
    select: (f, w, D) => {
      let v = f;
      return !r && a && a && l(f, a) && (v = void 0), s || i(v), s?.(v, f, w, D), v;
    },
    isSelected: (f) => a ? l(a, f) : !1
  };
}
function Za(e, t) {
  const n = za(e, t), r = Ha(e, t), s = La(e, t);
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
function qe(e) {
  let t = e;
  t.timeZone && (t = {
    ...e
  }, t.today && (t.today = new le(t.today, t.timeZone)), t.month && (t.month = new le(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new le(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new le(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new le(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new le(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = t.selected?.map((U) => new le(U, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? new le(t.selected.from, t.timeZone) : void 0,
    to: t.selected.to ? new le(t.selected.to, t.timeZone) : void 0
  }));
  const { components: n, formatters: r, labels: s, dateLib: o, locale: i, classNames: a } = jt(() => {
    const U = { ...hn, ...t.locale };
    return {
      dateLib: new be({
        locale: U,
        weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
        firstWeekContainsDate: t.firstWeekContainsDate,
        useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
        timeZone: t.timeZone,
        numerals: t.numerals
      }, t.dateLib),
      components: Ko(t.components),
      formatters: ca(t.formatters),
      labels: { ...Ma, ...t.labels },
      locale: U,
      classNames: { ...Jo(), ...t.classNames }
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
  ]), { captionLayout: l, mode: d, navLayout: g, numberOfMonths: f = 1, onDayBlur: w, onDayClick: D, onDayFocus: v, onDayKeyDown: T, onDayMouseEnter: x, onDayMouseLeave: b, onNextClick: u, onPrevClick: y, showWeekNumber: O, styles: p } = t, { formatCaption: S, formatDay: k, formatMonthDropdown: I, formatWeekNumber: W, formatWeekNumberHeader: A, formatWeekdayName: G, formatYearDropdown: oe } = r, Z = Ua(t, o), { days: ge, months: de, navStart: Se, navEnd: ye, previousMonth: ae, nextMonth: ie, goToMonth: me } = Z, Le = Vo(ge, t, Se, ye, o), { isSelected: Oe, select: at, selected: ee } = Za(t, o) ?? {}, { blur: se, focused: Ce, isFocusTarget: $e, moveFocus: ze, setFocused: ke } = Aa(t, Z, Le, Oe ?? (() => !1), o), { labelDayButton: Ze, labelGridcell: Be, labelGrid: tt, labelMonthDropdown: Ae, labelNav: kt, labelPrevious: Ft, labelNext: it, labelWeekday: It, labelWeekNumber: Pt, labelWeekNumberHeader: Ut, labelYearDropdown: $t } = s, Bt = jt(() => ua(o, t.ISOWeek), [o, t.ISOWeek]), Mt = d !== void 0 || D !== void 0, ct = ve(() => {
    ae && (me(ae), y?.(ae));
  }, [ae, me, y]), Qe = ve(() => {
    ie && (me(ie), u?.(ie));
  }, [me, ie, u]), At = ve((U, c) => (h) => {
    h.preventDefault(), h.stopPropagation(), ke(U), at?.(U.date, c, h), D?.(U.date, c, h);
  }, [at, D, ke]), ce = ve((U, c) => (h) => {
    ke(U), v?.(U.date, c, h);
  }, [v, ke]), Ht = ve((U, c) => (h) => {
    se(), w?.(U.date, c, h);
  }, [se, w]), Nt = ve((U, c) => (h) => {
    const M = {
      ArrowLeft: [
        h.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        h.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [h.shiftKey ? "year" : "week", "after"],
      ArrowUp: [h.shiftKey ? "year" : "week", "before"],
      PageUp: [h.shiftKey ? "year" : "month", "before"],
      PageDown: [h.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (M[h.key]) {
      h.preventDefault(), h.stopPropagation();
      const [_, Y] = M[h.key];
      ze(_, Y);
    }
    T?.(U.date, c, h);
  }, [ze, T, t.dir]), St = ve((U, c) => (h) => {
    x?.(U.date, c, h);
  }, [x]), He = ve((U, c) => (h) => {
    b?.(U.date, c, h);
  }, [b]), Ot = ve((U) => (c) => {
    const h = Number(c.target.value), M = o.setMonth(o.startOfMonth(U), h);
    me(M);
  }, [o, me]), Ve = ve((U) => (c) => {
    const h = Number(c.target.value), M = o.setYear(o.startOfMonth(U), h);
    me(M);
  }, [o, me]), { className: Rt, style: qt } = jt(() => ({
    className: [a[F.Root], t.className].filter(Boolean).join(" "),
    style: { ...p?.[F.Root], ...t.style }
  }), [a, t.className, t.style, p]), Ct = Xo(t), lt = Ye(null);
  Ca(lt, !!t.animate, {
    classNames: a,
    months: de,
    focused: Ce,
    dateLib: o
  });
  const Ge = {
    dayPickerProps: t,
    selected: ee,
    select: at,
    isSelected: Oe,
    months: de,
    nextMonth: ie,
    previousMonth: ae,
    goToMonth: me,
    getModifiers: Le,
    components: n,
    classNames: a,
    styles: p,
    labels: s,
    formatters: r
  };
  return C.createElement(
    lr.Provider,
    { value: Ge },
    C.createElement(
      n.Root,
      { rootRef: t.animate ? lt : void 0, className: Rt, style: qt, dir: t.dir, id: t.id, lang: t.lang, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...Ct },
      C.createElement(
        n.Months,
        { className: a[F.Months], style: p?.[F.Months] },
        !t.hideNavigation && !g && C.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[F.Nav], style: p?.[F.Nav], "aria-label": kt(), onPreviousClick: ct, onNextClick: Qe, previousMonth: ae, nextMonth: ie }),
        de.map((U, c) => C.createElement(
          n.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: a[F.Month],
            style: p?.[F.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: c,
            displayIndex: c,
            calendarMonth: U
          },
          g === "around" && !t.hideNavigation && c === 0 && C.createElement(
            n.PreviousMonthButton,
            { type: "button", className: a[F.PreviousMonthButton], tabIndex: ae ? void 0 : -1, "aria-disabled": ae ? void 0 : !0, "aria-label": Ft(ae), onClick: ct, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(n.Chevron, { disabled: ae ? void 0 : !0, className: a[F.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          C.createElement(n.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: a[F.MonthCaption], style: p?.[F.MonthCaption], calendarMonth: U, displayIndex: c }, l?.startsWith("dropdown") ? C.createElement(
            n.DropdownNav,
            { className: a[F.Dropdowns], style: p?.[F.Dropdowns] },
            (() => {
              const h = l === "dropdown" || l === "dropdown-months" ? C.createElement(n.MonthsDropdown, { key: "month", className: a[F.MonthsDropdown], "aria-label": Ae(), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Ot(U.date), options: la(U.date, Se, ye, r, o), style: p?.[F.Dropdown], value: o.getMonth(U.date) }) : C.createElement("span", { key: "month" }, I(U.date, o)), M = l === "dropdown" || l === "dropdown-years" ? C.createElement(n.YearsDropdown, { key: "year", className: a[F.YearsDropdown], "aria-label": $t(o.options), classNames: a, components: n, disabled: !!t.disableNavigation, onChange: Ve(U.date), options: fa(Se, ye, r, o, !!t.reverseYears), style: p?.[F.Dropdown], value: o.getYear(U.date) }) : C.createElement("span", { key: "year" }, oe(U.date, o));
              return o.getMonthYearOrder() === "year-first" ? [M, h] : [h, M];
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
            } }, S(U.date, o.options, o))
          ) : (
            // biome-ignore lint/a11y/useSemanticElements: breaking change
            C.createElement(n.CaptionLabel, { className: a[F.CaptionLabel], role: "status", "aria-live": "polite" }, S(U.date, o.options, o))
          )),
          g === "around" && !t.hideNavigation && c === f - 1 && C.createElement(
            n.NextMonthButton,
            { type: "button", className: a[F.NextMonthButton], tabIndex: ie ? void 0 : -1, "aria-disabled": ie ? void 0 : !0, "aria-label": it(ie), onClick: Qe, "data-animated-button": t.animate ? "true" : void 0 },
            C.createElement(n.Chevron, { disabled: ie ? void 0 : !0, className: a[F.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          c === f - 1 && g === "after" && !t.hideNavigation && C.createElement(n.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: a[F.Nav], style: p?.[F.Nav], "aria-label": kt(), onPreviousClick: ct, onNextClick: Qe, previousMonth: ae, nextMonth: ie }),
          C.createElement(
            n.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": tt(U.date, o.options, o) || void 0, className: a[F.MonthGrid], style: p?.[F.MonthGrid] },
            !t.hideWeekdays && C.createElement(
              n.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: a[F.Weekdays], style: p?.[F.Weekdays] },
              O && C.createElement(n.WeekNumberHeader, { "aria-label": Ut(o.options), className: a[F.WeekNumberHeader], style: p?.[F.WeekNumberHeader], scope: "col" }, A()),
              Bt.map((h) => C.createElement(n.Weekday, { "aria-label": It(h, o.options, o), className: a[F.Weekday], key: String(h), style: p?.[F.Weekday], scope: "col" }, G(h, o.options, o)))
            ),
            C.createElement(n.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: a[F.Weeks], style: p?.[F.Weeks] }, U.weeks.map((h) => C.createElement(
              n.Week,
              { className: a[F.Week], key: h.weekNumber, style: p?.[F.Week], week: h },
              O && // biome-ignore lint/a11y/useSemanticElements: react component
              C.createElement(n.WeekNumber, { week: h, style: p?.[F.WeekNumber], "aria-label": Pt(h.weekNumber, {
                locale: i
              }), className: a[F.WeekNumber], scope: "row", role: "rowheader" }, W(h.weekNumber, o)),
              h.days.map((M) => {
                const { date: _ } = M, Y = Le(M);
                if (Y[z.focused] = !Y.hidden && !!Ce?.isEqualTo(M), Y[Ne.selected] = Oe?.(_) || Y.selected, mn(ee)) {
                  const { from: j, to: ue } = ee;
                  Y[Ne.range_start] = !!(j && ue && o.isSameDay(_, j)), Y[Ne.range_end] = !!(j && ue && o.isSameDay(_, ue)), Y[Ne.range_middle] = Ie(ee, _, !0, o);
                }
                const H = da(Y, p, t.modifiersStyles), K = Go(Y, a, t.modifiersClassNames), P = !Mt && !Y.hidden ? Be(_, Y, o.options, o) : void 0;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: react component
                  C.createElement(n.Day, { key: `${o.format(_, "yyyy-MM-dd")}_${o.format(M.displayMonth, "yyyy-MM")}`, day: M, modifiers: Y, className: K.join(" "), style: H, role: "gridcell", "aria-selected": Y.selected || void 0, "aria-label": P, "data-day": o.format(_, "yyyy-MM-dd"), "data-month": M.outside ? o.format(_, "yyyy-MM") : void 0, "data-selected": Y.selected || void 0, "data-disabled": Y.disabled || void 0, "data-hidden": Y.hidden || void 0, "data-outside": M.outside || void 0, "data-focused": Y.focused || void 0, "data-today": Y.today || void 0 }, !Y.hidden && Mt ? C.createElement(n.DayButton, { className: a[F.DayButton], style: p?.[F.DayButton], type: "button", day: M, modifiers: Y, disabled: Y.disabled || void 0, tabIndex: $e(M) ? 0 : -1, "aria-label": Ze(_, Y, o.options, o), onClick: At(M, Y), onBlur: Ht(M, Y), onFocus: ce(M, Y), onKeyDown: Nt(M, Y), onMouseEnter: St(M, Y), onMouseLeave: He(M, Y) }, k(_, o.options, o)) : !Y.hidden && k(M.date, o.options, o))
                );
              })
            )))
          )
        ))
      ),
      t.footer && // biome-ignore lint/a11y/useSemanticElements: react component
      C.createElement(n.Footer, { className: a[F.Footer], style: p?.[F.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
const Qa = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Va = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Cn = (e) => {
  const t = Va(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, wr = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Ga = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
var Ka = {
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
const Xa = Rn(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: s = "",
    children: o,
    iconNode: i,
    ...a
  }, l) => on(
    "svg",
    {
      ref: l,
      ...Ka,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: wr("lucide", s),
      ...!o && !Ga(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...i.map(([d, g]) => on(d, g)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
const Ue = (e, t) => {
  const n = Rn(
    ({ className: r, ...s }, o) => on(Xa, {
      ref: o,
      iconNode: t,
      className: wr(
        `lucide-${Qa(Cn(e))}`,
        `lucide-${e}`,
        r
      ),
      ...s
    })
  );
  return n.displayName = Cn(e), n;
};
const Ja = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], ei = Ue("bookmark", Ja);
const ti = [
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
], Kt = Ue("calendar-days", ti);
const ni = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ri = Ue("chevron-down", ni);
const si = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], xr = Ue("chevron-left", si);
const oi = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], vr = Ue("chevron-right", oi);
const ai = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], ii = Ue("circle-question-mark", ai);
const ci = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], li = Ue("plus", ci);
const di = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], ui = Ue("trash-2", di);
const fi = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Tn = Ue("x", fi);
function hi(e, t) {
  const n = bi(t);
  return "formatToParts" in n ? gi(n, e) : yi(n, e);
}
const mi = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function gi(e, t) {
  try {
    const n = e.formatToParts(t), r = [];
    for (let s = 0; s < n.length; s++) {
      const o = mi[n[s].type];
      o !== void 0 && (r[o] = parseInt(n[s].value, 10));
    }
    return r;
  } catch (n) {
    if (n instanceof RangeError)
      return [NaN];
    throw n;
  }
}
function yi(e, t) {
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
}).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), pi = Wn === "06/25/2014, 00:00:00" || Wn === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
function bi(e) {
  return Xt[e] || (Xt[e] = pi ? new Intl.DateTimeFormat("en-US", {
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
function kr(e, t, n, r, s, o, i) {
  const a = /* @__PURE__ */ new Date(0);
  return a.setUTCFullYear(e, t, n), a.setUTCHours(r, s, o, i), a;
}
const Yn = 36e5, Di = 6e4, Jt = {
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};
function Mr(e, t, n) {
  if (!e)
    return 0;
  let r = Jt.timezoneZ.exec(e);
  if (r)
    return 0;
  let s, o;
  if (r = Jt.timezoneHH.exec(e), r)
    return s = parseInt(r[1], 10), En(s) ? -(s * Yn) : NaN;
  if (r = Jt.timezoneHHMM.exec(e), r) {
    s = parseInt(r[2], 10);
    const i = parseInt(r[3], 10);
    return En(s, i) ? (o = Math.abs(s) * Yn + i * Di, r[1] === "+" ? -o : o) : NaN;
  }
  if (vi(e)) {
    t = new Date(t || Date.now());
    const i = n ? t : wi(t), a = cn(i, e);
    return -(n ? a : xi(t, a, e));
  }
  return NaN;
}
function wi(e) {
  return kr(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
}
function cn(e, t) {
  const n = hi(e, t), r = kr(n[0], n[1] - 1, n[2], n[3] % 24, n[4], n[5], 0).getTime();
  let s = e.getTime();
  const o = s % 1e3;
  return s -= o >= 0 ? o : 1e3 + o, r - s;
}
function xi(e, t, n) {
  let s = e.getTime() - t;
  const o = cn(new Date(s), n);
  if (t === o)
    return t;
  s -= o - t;
  const i = cn(new Date(s), n);
  return o === i ? o : Math.max(o, i);
}
function En(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
const _n = {};
function vi(e) {
  if (_n[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), _n[e] = !0, !0;
  } catch {
    return !1;
  }
}
function Fn(e) {
  const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), +e - +t;
}
const ki = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/, en = 36e5, In = 6e4, Mi = 2, he = {
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
  timeZone: ki
};
function Ni(e, t = {}) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  const n = t.additionalDigits == null ? Mi : Number(t.additionalDigits);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (Object.prototype.toString.call(e) !== "[object String]")
    return /* @__PURE__ */ new Date(NaN);
  const r = Si(e), { year: s, restDateString: o } = Oi(r.date, n), i = Ci(o, s);
  if (i === null || isNaN(i.getTime()))
    return /* @__PURE__ */ new Date(NaN);
  if (i) {
    const a = i.getTime();
    let l = 0, d;
    if (r.time && (l = Ti(r.time), l === null || isNaN(l)))
      return /* @__PURE__ */ new Date(NaN);
    if (r.timeZone || t.timeZone) {
      if (d = Mr(r.timeZone || t.timeZone, new Date(a + l)), isNaN(d))
        return /* @__PURE__ */ new Date(NaN);
    } else
      d = Fn(new Date(a + l)), d = Fn(new Date(a + l + d));
    return new Date(a + l + d);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Si(e) {
  const t = {};
  let n = he.dateTimePattern.exec(e), r;
  if (n ? (t.date = n[1], r = n[3]) : (n = he.datePattern.exec(e), n ? (t.date = n[1], r = n[2]) : (t.date = null, r = e)), r) {
    const s = he.timeZone.exec(r);
    s ? (t.time = r.replace(s[1], ""), t.timeZone = s[1].trim()) : t.time = r;
  }
  return t;
}
function Oi(e, t) {
  if (e) {
    const n = he.YYY[t], r = he.YYYYY[t];
    let s = he.YYYY.exec(e) || r.exec(e);
    if (s) {
      const o = s[1];
      return {
        year: parseInt(o, 10),
        restDateString: e.slice(o.length)
      };
    }
    if (s = he.YY.exec(e) || n.exec(e), s) {
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
function Ci(e, t) {
  if (t === null)
    return null;
  let n, r, s;
  if (!e || !e.length)
    return n = /* @__PURE__ */ new Date(0), n.setUTCFullYear(t), n;
  let o = he.MM.exec(e);
  if (o)
    return n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1, Un(t, r) ? (n.setUTCFullYear(t, r), n) : /* @__PURE__ */ new Date(NaN);
  if (o = he.DDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0);
    const i = parseInt(o[1], 10);
    return Ei(t, i) ? (n.setUTCFullYear(t, 0, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = he.MMDD.exec(e), o) {
    n = /* @__PURE__ */ new Date(0), r = parseInt(o[1], 10) - 1;
    const i = parseInt(o[2], 10);
    return Un(t, r, i) ? (n.setUTCFullYear(t, r, i), n) : /* @__PURE__ */ new Date(NaN);
  }
  if (o = he.Www.exec(e), o)
    return s = parseInt(o[1], 10) - 1, $n(s) ? Pn(t, s) : /* @__PURE__ */ new Date(NaN);
  if (o = he.WwwD.exec(e), o) {
    s = parseInt(o[1], 10) - 1;
    const i = parseInt(o[2], 10) - 1;
    return $n(s, i) ? Pn(t, s, i) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ti(e) {
  let t, n, r = he.HH.exec(e);
  if (r)
    return t = parseFloat(r[1].replace(",", ".")), tn(t) ? t % 24 * en : NaN;
  if (r = he.HHMM.exec(e), r)
    return t = parseInt(r[1], 10), n = parseFloat(r[2].replace(",", ".")), tn(t, n) ? t % 24 * en + n * In : NaN;
  if (r = he.HHMMSS.exec(e), r) {
    t = parseInt(r[1], 10), n = parseInt(r[2], 10);
    const s = parseFloat(r[3].replace(",", "."));
    return tn(t, n, s) ? t % 24 * en + n * In + s * 1e3 : NaN;
  }
  return null;
}
function Pn(e, t, n) {
  t = t || 0, n = n || 0;
  const r = /* @__PURE__ */ new Date(0);
  r.setUTCFullYear(e, 0, 4);
  const s = r.getUTCDay() || 7, o = t * 7 + n + 1 - s;
  return r.setUTCDate(r.getUTCDate() + o), r;
}
const Wi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Yi = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Nr(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Un(e, t, n) {
  if (t < 0 || t > 11)
    return !1;
  if (n != null) {
    if (n < 1)
      return !1;
    const r = Nr(e);
    if (r && n > Yi[t] || !r && n > Wi[t])
      return !1;
  }
  return !0;
}
function Ei(e, t) {
  if (t < 1)
    return !1;
  const n = Nr(e);
  return !(n && t > 366 || !n && t > 365);
}
function $n(e, t) {
  return !(e < 0 || e > 52 || t != null && (t < 0 || t > 6));
}
function tn(e, t, n) {
  return !(e < 0 || e >= 25 || t != null && (t < 0 || t >= 60) || n != null && (n < 0 || n >= 60));
}
function _i(e, t, n) {
  e = Ni(e, n);
  const r = Mr(t, e, !0), s = new Date(e.getTime() - r), o = /* @__PURE__ */ new Date(0);
  return o.setFullYear(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()), o.setHours(s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), s.getUTCMilliseconds()), o;
}
const fe = 0, Ji = !1, rt = !0, ec = "firstFullWeek", Fi = "UTC";
function E(e) {
  const t = Js(`${e}T00:00:00.000Z`);
  return _i(t, Fi);
}
function B(e) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function _t() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ii(e, t, n) {
  const r = E(e);
  let s;
  switch (t) {
    case "day":
      s = Q(r, n);
      break;
    case "week":
      s = dn(r, n);
      break;
    case "month":
      s = Fe(r, n);
      break;
    case "quarter":
      s = Qn(r, n);
      break;
    default:
      s = r;
  }
  return B(s);
}
function Pi(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = E(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Q(s, 1), r.includes(s.getDay()) || o++;
    return B(s);
  } else
    return Ii(e, t, n - 1);
}
function Ui(e, t, n, r) {
  if (n <= 0) return e;
  if (t === "day" && r.length > 0) {
    let s = E(e), o = 0;
    for (r.includes(s.getDay()) || (o = 1); o < n; )
      s = Q(s, -1), r.includes(s.getDay()) || o++;
    return B(s);
  } else {
    const s = E(e);
    let o;
    switch (t) {
      case "day":
        o = Q(s, -(n - 1));
        break;
      case "week":
        o = dn(s, -(n - 1));
        break;
      case "month":
        o = Fe(s, -(n - 1));
        break;
      case "quarter":
        o = Qn(s, -(n - 1));
        break;
      default:
        o = s;
    }
    return B(o);
  }
}
function Sr(e, t, n, r) {
  const s = E(e), o = E(t);
  if (s > o) return 0;
  if (n === "day" && r.length > 0)
    return er({ start: s, end: o }).filter(
      (l) => !r.includes(l.getDay())
    ).length;
  switch (n) {
    case "day":
      return Kn(o, s) + 1;
    case "week":
      return zr(o, s) + 1;
    case "month":
      return Jn(o, s) + 1;
    case "quarter":
      return Lr(o, s) + 1;
    default:
      return 1;
  }
}
function $i(e, t, n) {
  const r = E(e), s = E(t);
  if (r > s) return [];
  const o = er({ start: r, end: s });
  return n.length === 0 ? o.map(B) : o.filter((i) => !n.includes(i.getDay())).map(B);
}
function Bn(e, t, n = "day", r = [], s, o, i, a, l) {
  const d = Sr(
    e,
    t,
    n,
    r
  ), g = $i(
    e,
    t,
    r
  ), f = {
    startDateUtc: e,
    endDateUtc: t,
    unit: n,
    duration: d,
    excludedWeekdays: r,
    includedDatesUtc: g
  };
  return s !== void 0 && (f.excludeEnabled = s), o && (f.excludeFilterTypes = o), i && (f.excludedSpecificDates = i), a && (f.excludedSavedDates = a), l && (f.excludedDateRanges = l), f;
}
function tc(e) {
  const [t, n, r] = e.split("-");
  return `${r}/${n}/${t}`;
}
function nc(e) {
  const t = e.split("/");
  if (t.length !== 3) return null;
  const [n, r, s] = t, o = parseInt(r, 10), i = parseInt(n, 10), a = parseInt(s, 10);
  if (isNaN(o) || isNaN(i) || isNaN(a) || o < 1 || o > 12 || i < 1 || i > 31 || a < 1900 || a > 2100)
    return null;
  const l = o.toString().padStart(2, "0"), d = i.toString().padStart(2, "0");
  return `${a}-${l}-${d}`;
}
function Bi(e) {
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
function Ai() {
  const e = _t(), t = E(e);
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
        const n = B(Q(t, -1));
        return {
          startDateUtc: n,
          endDateUtc: n
        };
      }
    },
    thisWeek: {
      label: "This Week",
      getValue: () => {
        let n = J(t, {
          weekStartsOn: fe
        }), r = Q(n, 6);
        return {
          startDateUtc: B(n),
          endDateUtc: B(r)
        };
      }
    },
    monthToDate: {
      label: "Month to Date",
      getValue: () => {
        const n = ne(t);
        return {
          startDateUtc: B(n),
          endDateUtc: e
        };
      }
    },
    yearToDate: {
      label: "Year to Date",
      getValue: () => {
        const n = fn(t);
        return {
          startDateUtc: B(n),
          endDateUtc: e
        };
      }
    }
  };
}
const Hi = "DateRangePickerDB", Ri = 1, Te = "savedDateRanges";
class qi {
  db = null;
  initialized = !1;
  /**
   * Initialize the database
   */
  async init() {
    if (!(this.initialized && this.db))
      return new Promise((t, n) => {
        const r = indexedDB.open(Hi, Ri);
        r.onerror = () => n(r.error), r.onsuccess = () => {
          this.db = r.result, this.initialized = !0, t();
        }, r.onupgradeneeded = (s) => {
          const o = s.target.result;
          o.objectStoreNames.contains(Te) || o.createObjectStore(Te, {
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
      const a = this.db.transaction([Te], "readwrite").objectStore(Te).put({
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
      const i = this.db.transaction([Te], "readonly").objectStore(Te).get(t);
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
      const i = this.db.transaction([Te], "readwrite").objectStore(Te).delete(t);
      i.onerror = () => r(i.error), i.onsuccess = () => n();
    });
  }
  /**
   * Clear all data
   */
  async clearAll() {
    return await this.ensureInit(), new Promise((t, n) => {
      const o = this.db.transaction([Te], "readwrite").objectStore(Te).clear();
      o.onerror = () => n(o.error), o.onsuccess = () => t();
    });
  }
}
const st = new qi(), nn = "savedDateRanges";
function ji({
  onPresetSelect: e,
  onSavedDateSelect: t,
  currentSelection: n,
  themeColors: r
}) {
  const [s, o] = R([]), [i, a] = R(!1), [l, d] = R(""), [g, f] = R(!1);
  Me(() => {
    (async () => {
      await st.init();
      const y = await st.getData(
        nn
      );
      y && o(y);
    })();
  }, []);
  const w = Ai(), D = (u) => {
    const { startDateUtc: y, endDateUtc: O } = u();
    e(y, O);
  }, v = async () => {
    if (l.trim() === "") {
      alert("Please enter a label for the saved date range");
      return;
    }
    const u = {
      id: `saved-${Date.now()}`,
      label: l.trim(),
      selection: n,
      createdAt: Date.now()
    }, y = [...s, u];
    o(y), await st.saveData(nn, y), d(""), a(!1);
  }, T = async (u) => {
    const y = s.filter((O) => O.id !== u);
    o(y), await st.saveData(nn, y);
  }, x = (u) => {
    t ? t(u.selection) : e(u.selection.startDateUtc, u.selection.endDateUtc);
  }, b = (u, y) => {
    const O = (p) => (/* @__PURE__ */ new Date(p + "T00:00:00")).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    return u === y ? O(u) : `${O(u)} - ${O(y)}`;
  };
  return /* @__PURE__ */ N(
    "div",
    {
      className: "w-72 bg-white border-r border-gray-200 py-4 flex flex-col h-full overflow-hidden",
      style: { ...r },
      children: [
        /* @__PURE__ */ N("div", { className: "mb-3 px-4 flex-shrink-0", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ m("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Quick Select" }) }),
          /* @__PURE__ */ m("div", { className: "", children: Object.values(w).map((u) => {
            const { startDateUtc: y, endDateUtc: O } = u.getValue();
            return /* @__PURE__ */ N(
              "button",
              {
                onClick: () => D(u.getValue),
                className: "w-full text-left px-3 py-2 hover:bg-white hover:shadow-sm rounded-md transition-all",
                children: [
                  /* @__PURE__ */ m("div", { className: "text-sm font-semibold text-gray-900", children: u.label }),
                  /* @__PURE__ */ m("div", { className: "text-xs text-gray-600 leading-relaxed mt-0.5", children: b(y, O) })
                ]
              },
              u.label
            );
          }) })
        ] }),
        /* @__PURE__ */ N("div", { className: "flex flex-col flex-1 min-h-0 border-t border-gray-200 px-4", children: [
          /* @__PURE__ */ m("div", { className: "flex items-center justify-between mb-2 flex-shrink-0 mt-3", children: /* @__PURE__ */ N("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ m("h3", { className: "text-xs font-semibold text-gray-600 uppercase", children: "Saved Dates" }),
            /* @__PURE__ */ m(
              "button",
              {
                onClick: () => f(!g),
                className: "text-gray-400 hover:text-gray-600",
                children: /* @__PURE__ */ m(ii, { className: "w-3 h-3" })
              }
            )
          ] }) }),
          g && /* @__PURE__ */ m("div", { className: "mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 flex-shrink-0", children: "Save your frequently used date ranges for quick access later." }),
          s.length === 0 ? /* @__PURE__ */ m("p", { className: "text-xs text-gray-500 mb-3 italic flex-shrink-0", children: "No saved dates yet" }) : /* @__PURE__ */ m("div", { className: "space-y-2 mb-3 overflow-y-auto flex-1 min-h-0", children: s.map((u) => /* @__PURE__ */ m(
            "div",
            {
              className: "group bg-white rounded-md hover:shadow-sm transition-all border border-gray-200",
              children: /* @__PURE__ */ N("div", { className: "flex items-start justify-between px-3 py-2", children: [
                /* @__PURE__ */ N(
                  "button",
                  {
                    onClick: () => x(u),
                    className: "flex-1 text-left",
                    children: [
                      /* @__PURE__ */ m("div", { className: "text-sm font-semibold text-gray-900 mb-1", children: u.label }),
                      /* @__PURE__ */ m("div", { className: "text-xs text-gray-600 leading-relaxed", children: b(
                        u.selection.startDateUtc,
                        u.selection.endDateUtc
                      ) }),
                      (u.selection.excludedWeekdays?.length > 0 || u.selection.excludedSpecificDates && u.selection.excludedSpecificDates.length > 0 || u.selection.excludedSavedDates && u.selection.excludedSavedDates.length > 0 || u.selection.excludedDateRanges && u.selection.excludedDateRanges.length > 0) && /* @__PURE__ */ N("div", { className: "text-xs text-gray-500 mt-1 space-y-0.5", children: [
                        u.selection.excludedWeekdays?.length > 0 && /* @__PURE__ */ N("div", { children: [
                          "Days:",
                          " ",
                          u.selection.excludedWeekdays.map(
                            (y) => [
                              "Sun",
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat"
                            ][y]
                          ).join(", ")
                        ] }),
                        u.selection.excludedSpecificDates && u.selection.excludedSpecificDates.length > 0 && /* @__PURE__ */ N("div", { children: [
                          "Specific Dates:",
                          " ",
                          u.selection.excludedSpecificDates.length
                        ] }),
                        u.selection.excludedSavedDates && u.selection.excludedSavedDates.length > 0 && /* @__PURE__ */ N("div", { children: [
                          "Saved: ",
                          u.selection.excludedSavedDates.length
                        ] }),
                        u.selection.excludedDateRanges && u.selection.excludedDateRanges.length > 0 && /* @__PURE__ */ N("div", { children: [
                          "Ranges:",
                          " ",
                          u.selection.excludedDateRanges.length
                        ] })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ m(
                  "button",
                  {
                    onClick: () => T(u.id),
                    className: "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-2",
                    children: /* @__PURE__ */ m(ui, { className: "w-3.5 h-3.5" })
                  }
                )
              ] })
            },
            u.id
          )) }),
          /* @__PURE__ */ N(
            "button",
            {
              onClick: () => a(!0),
              className: "w-full flex-shrink-0 px-3 py-2 text-[#003DB8] opacity-50 hover:opacity-100 text-sm font-medium rounded-mdtransition-colors flex items-center justify-center gap-2 mt-auto",
              children: [
                /* @__PURE__ */ m(li, { className: "w-4 h-4" }),
                "Save selected date"
              ]
            }
          )
        ] }),
        i && /* @__PURE__ */ N(mt, { children: [
          /* @__PURE__ */ m(
            "div",
            {
              className: "fixed inset-0 bg-black/30 z-50",
              onClick: () => a(!1)
            }
          ),
          /* @__PURE__ */ m("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ N("div", { className: "bg-white rounded-lg shadow-xl p-5 w-80 border border-gray-200 pointer-events-auto", children: [
            /* @__PURE__ */ m("h3", { className: "text-base font-semibold mb-3 text-gray-800", children: "Save Date Range" }),
            /* @__PURE__ */ N("div", { className: "mb-2", children: [
              /* @__PURE__ */ m("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Label" }),
              /* @__PURE__ */ m(
                "input",
                {
                  type: "text",
                  value: l,
                  onChange: (u) => d(u.target.value),
                  placeholder: "e.g., Q1 2025, Holiday Period",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  autoFocus: !0,
                  onKeyDown: (u) => {
                    u.key === "Enter" && v();
                  }
                }
              )
            ] }),
            /* @__PURE__ */ N("div", { className: "mb-4 p-2 bg-gray-50 rounded text-xs text-gray-600 space-y-1", children: [
              /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("strong", { children: "Range:" }),
                " ",
                b(
                  n.startDateUtc,
                  n.endDateUtc
                )
              ] }),
              /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("strong", { children: "Duration:" }),
                " ",
                n.duration,
                " ",
                n.unit,
                "(s)"
              ] }),
              n.excludedWeekdays && n.excludedWeekdays.length > 0 && /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("strong", { children: "Excluded Days:" }),
                " ",
                n.excludedWeekdays.map(
                  (u) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][u]
                ).join(", ")
              ] }),
              n.excludedSpecificDates && n.excludedSpecificDates.length > 0 && /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("strong", { children: "Excluded Specific Dates:" }),
                " ",
                n.excludedSpecificDates.length,
                " date(s)"
              ] }),
              n.excludedSavedDates && n.excludedSavedDates.length > 0 && /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("strong", { children: "Excluded Saved Dates:" }),
                " ",
                n.excludedSavedDates.length,
                " saved date(s)"
              ] }),
              n.excludedDateRanges && n.excludedDateRanges.length > 0 && /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("strong", { children: "Excluded Date Ranges:" }),
                " ",
                n.excludedDateRanges.length,
                " range(s)"
              ] })
            ] }),
            /* @__PURE__ */ N("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: () => a(!1),
                  className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: v,
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
const An = (e) => {
  const t = e?.from ? ne(e.from) : void 0, n = e?.to ? ot(e.to) : void 0;
  return t && n && n.getTime() < t.getTime() ? { from: t, to: ot(t) } : { from: t, to: n };
}, Li = [
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
function zi({
  selectedRange: e,
  onSelect: t,
  activeDateField: n = "start",
  onActiveFieldChange: r
}) {
  const s = E(_t()), o = An(e), i = o.from ? re(o.from) : re(s), [a, l] = R(o), [d, g] = R(i);
  Me(() => {
    const b = An(e);
    l((u) => {
      const y = u.from?.getTime() ?? null, O = u.to?.getTime() ?? null, p = b.from?.getTime() ?? null, S = b.to?.getTime() ?? null;
      if (y === p && O === S)
        return u;
      if (b.from) {
        const W = re(b.from);
        g((A) => A === W || A === W - 1 ? A : W);
      }
      return b;
    });
  }, [e]);
  const f = (b, u) => {
    const y = bt(Dt(/* @__PURE__ */ new Date(), b), u), O = ne(y), p = ot(y), S = () => r?.("start"), k = () => r?.("end");
    if (n === "end") {
      if (!a.from) {
        l({ from: O, to: p }), t({ from: O }), k();
        return;
      }
      const W = a.from, A = a.to ?? ot(W);
      let G = W, oe = p;
      O.getTime() < W.getTime() && (G = O, oe = A);
      const Z = { from: G, to: oe };
      l(Z), t(Z), S();
      return;
    }
    l({ from: O, to: p }), t({ from: O }), k();
  }, w = (b, u) => {
    if (!a.from || !a.to) return !1;
    const y = et(a.from), O = re(a.from), p = et(a.to), S = re(a.to), k = b * 12 + u, I = O * 12 + y, W = S * 12 + p;
    return k >= I && k <= W;
  }, D = (b, u) => {
    if (!a.from) return !1;
    const y = et(a.from), O = re(a.from);
    return b === O && u === y;
  }, v = (b, u) => {
    if (!a.to) return !1;
    const y = et(a.to), O = re(a.to);
    return b === O && u === y;
  }, T = (b, u) => !1, x = (b) => /* @__PURE__ */ N("div", { className: "flex-1", children: [
    /* @__PURE__ */ m("div", { className: "text-center font-semibold text-lg mb-4", children: b }),
    /* @__PURE__ */ m("div", { className: "grid grid-cols-4 gap-2", children: Li.map((u, y) => {
      const O = w(b, y), p = D(b, y), S = v(b, y), k = p || S, I = T();
      return /* @__PURE__ */ m(
        "button",
        {
          onClick: () => !I && f(b, y),
          disabled: I,
          className: `
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${I ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : k ? "bg-[#003DB8] text-white" : O ? "bg-[#CEDBF5] text-[#1F1F1F]" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: u
        },
        u
      );
    }) })
  ] }, b);
  return /* @__PURE__ */ N("div", { className: "w-full", children: [
    /* @__PURE__ */ N("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ m(
        "button",
        {
          onClick: () => g(d - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ m(xr, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ N("div", { className: "text-lg font-semibold", children: [
        d,
        " - ",
        d + 1
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: () => g(d + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ m(vr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ N("div", { className: "flex gap-8", children: [
      x(d),
      x(d + 1)
    ] })
  ] });
}
const Zi = ["Q1", "Q2", "Q3", "Q4"];
function Qi({
  selectedRange: e,
  onSelect: t
}) {
  const n = re(e.from), [r, s] = R(n);
  E(_t());
  const o = (f, w) => {
    const D = Qr(
      yo(Dt(/* @__PURE__ */ new Date(), f), w + 1)
    );
    if (!e.from) {
      t({ from: D, to: D });
      return;
    }
    if (!e.to || e.from.getTime() === e.to.getTime()) {
      D < e.from ? t({ from: D, to: e.from }) : t({ from: e.from, to: D });
      return;
    }
    t({ from: D, to: D });
  }, i = (f, w) => {
    if (!e.from || !e.to) return !1;
    const D = Wt(e.from) - 1, v = re(e.from), T = Wt(e.to) - 1, x = re(e.to), b = f * 4 + w, u = v * 4 + D, y = x * 4 + T;
    return b >= u && b <= y;
  }, a = (f, w) => {
    if (!e.from) return !1;
    const D = Wt(e.from) - 1, v = re(e.from);
    return f === v && w === D;
  }, l = (f, w) => {
    if (!e.to) return !1;
    const D = Wt(e.to) - 1, v = re(e.to);
    return f === v && w === D;
  }, d = (f, w) => !1, g = (f) => /* @__PURE__ */ N("div", { className: "flex-1", children: [
    /* @__PURE__ */ m("div", { className: "text-center font-semibold text-lg mb-4", children: f }),
    /* @__PURE__ */ m("div", { className: "grid grid-cols-2 gap-3", children: Zi.map((w, D) => {
      const v = i(f, D), T = a(f, D), x = l(f, D), b = T || x, u = d();
      return /* @__PURE__ */ m(
        "button",
        {
          onClick: () => !u && o(f, D),
          disabled: u,
          className: `
                  px-4 py-6 text-base font-medium rounded-md transition-colors
                  ${u ? "opacity-30 bg-gray-100 text-gray-400 cursor-not-allowed" : b ? "bg-blue-600 text-white" : v ? "bg-blue-100 text-blue-900" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: w
        },
        w
      );
    }) })
  ] }, f);
  return /* @__PURE__ */ N("div", { className: "w-full", children: [
    /* @__PURE__ */ N("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ m(
        "button",
        {
          onClick: () => s(r - 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ m(xr, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ N("div", { className: "text-lg font-semibold", children: [
        r,
        " - ",
        r + 1
      ] }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: () => s(r + 1),
          className: "p-2 hover:bg-gray-100 rounded-md transition-colors",
          children: /* @__PURE__ */ m(vr, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ N("div", { className: "flex gap-8", children: [
      g(r),
      g(r + 1)
    ] })
  ] });
}
function Hn({
  value: e,
  onChange: t,
  placeholder: n = "DD/MM/YYYY",
  className: r = "",
  onFocus: s
}) {
  const o = Ye(null), [i, a] = R(""), l = Ye(0), d = (v) => {
    if (!v || v.length !== 10) return "";
    const [T, x, b] = v.split("-");
    return `${b}/${x}/${T}`;
  }, g = (v) => {
    const T = v.replace(/\D/g, "");
    if (T.length !== 8) return null;
    const x = T.substring(0, 2), b = T.substring(2, 4), u = T.substring(4, 8), y = parseInt(b, 10), O = parseInt(x, 10), p = parseInt(u, 10);
    return y < 1 || y > 12 || O < 1 || O > 31 || p < 1900 || p > 2100 ? null : `${u}-${b}-${x}`;
  };
  return Me(() => {
    a(d(e));
  }, [e]), /* @__PURE__ */ m(
    "input",
    {
      ref: o,
      type: "text",
      value: i,
      onChange: (v) => {
        const T = v.target.value, x = v.target.selectionStart || 0, b = i;
        if (T.length < b.length) {
          if (T.replace(/\D/g, "").length < b.replace(/\D/g, "").length) {
            const p = T.replace(/\D/g, "");
            let S = "";
            if (p.length > 0 && (S = p.substring(0, 2), p.length > 2 && (S += "/" + p.substring(2, 4)), p.length > 4 && (S += "/" + p.substring(4, 8))), a(S), setTimeout(() => {
              if (o.current) {
                const k = Math.min(x, S.length);
                o.current.setSelectionRange(k, k);
              }
            }, 0), p.length === 8) {
              const k = g(S);
              k && t(k);
            }
          } else
            a(b), setTimeout(() => {
              o.current && o.current.setSelectionRange(x, x);
            }, 0);
          return;
        }
        const u = T.replace(/\D/g, "");
        let y = "";
        if (u.length > 0) {
          let p = u.substring(0, 2);
          if (p.length === 2) {
            const S = parseInt(p, 10);
            S > 31 ? p = "31" : S < 1 && p.length === 2 && (p = "01");
          }
          if (y = p, u.length > 2) {
            let S = u.substring(2, 4);
            if (S.length === 2) {
              const k = parseInt(S, 10);
              k > 12 ? S = "12" : k < 1 && S.length === 2 && (S = "01");
            }
            y += "/" + S;
          }
          if (u.length > 4) {
            let S = u.substring(4, 8);
            if (S.length === 4) {
              const k = parseInt(S, 10);
              k > 2100 ? S = "2100" : k < 1900 && (S = "1900");
            }
            y += "/" + S;
          }
        }
        a(y);
        let O = x;
        if (y.length > b.length) {
          const p = y.length - b.length;
          O = x + p;
        }
        if (y[O] === "/" && O++, setTimeout(() => {
          if (o.current) {
            const p = Math.min(O, y.length);
            o.current.setSelectionRange(p, p);
          }
        }, 0), u.length === 8) {
          const p = g(y);
          p && t(p);
        }
      },
      onBlur: () => {
        if (i) {
          const v = g(i);
          v ? (t(v), a(d(v))) : a(d(e));
        }
      },
      onFocus: (v) => {
        s && s(v);
      },
      onKeyDown: (v) => {
        const T = o.current;
        if (!T) return;
        const x = T.selectionStart || 0;
        if (l.current = x, v.key === "ArrowLeft" || v.key === "ArrowRight") {
          setTimeout(() => {
            const b = T.selectionStart || 0;
            if (i[b] === "/") {
              const u = v.key === "ArrowLeft" ? -1 : 1;
              T.setSelectionRange(b + u, b + u);
            }
          }, 0);
          return;
        }
        if (!(v.key === "Backspace" || v.key === "Delete" || v.key === "Tab" || v.key === "Escape" || v.key === "Enter")) {
          if (!/^\d$/.test(v.key)) {
            v.preventDefault();
            return;
          }
          if (i[x] === "/") {
            v.preventDefault();
            const b = i.substring(0, x) + v.key + i.substring(x + 1);
            a(b), setTimeout(() => {
              if (o.current) {
                const u = x + 1;
                o.current.setSelectionRange(u, u);
              }
            }, 0);
            return;
          }
          if (x >= 3 && x <= 5) {
            const u = i.replace(/\D/g, "").substring(2, 4), y = u.length === 1 ? u : "", O = v.key;
            if (u.length === 1 && x === 5) {
              const p = parseInt(y + O, 10);
              if ((p === 0 || p > 12) && (v.preventDefault(), p > 12)) {
                const S = i.substring(0, 3) + y + "2" + i.substring(5);
                a(S), setTimeout(() => {
                  o.current && o.current.setSelectionRange(6, 6);
                }, 0);
              }
            }
          }
          if (x >= 0 && x <= 2) {
            const u = i.replace(/\D/g, "").substring(0, 2), y = u.length === 1 ? u : "", O = v.key;
            if (u.length === 1 && x === 1) {
              const p = parseInt(y + O, 10);
              if ((p === 0 || p > 31) && (v.preventDefault(), p > 31)) {
                const S = y + "1" + i.substring(2);
                a(S), setTimeout(() => {
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
const Vi = [
  { value: 0, label: "Su" },
  { value: 1, label: "Mo" },
  { value: 2, label: "Tu" },
  { value: 3, label: "We" },
  { value: 4, label: "Th" },
  { value: 5, label: "Fr" },
  { value: 6, label: "Sa" }
], Gi = [
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
], rn = "var(--adrp-container-height, min(720px, 85vh))", sn = "var(--adrp-container-width, min(1200px, 98vw))";
function rc({
  initialSelection: e,
  onApply: t,
  onCancel: n,
  themeColors: r
}) {
  const s = _t(), o = {
    height: rn,
    minHeight: rn,
    maxHeight: rn,
    width: sn,
    minWidth: sn,
    maxWidth: sn,
    overflow: "hidden",
    ...r
  }, [i, a] = R(
    e?.unit || "day"
  ), [l, d] = R(
    e?.startDateUtc || s
  ), [g, f] = R(
    e?.endDateUtc || s
  ), [w, D] = R(
    () => e?.startDateUtc && !e?.endDateUtc ? "end" : (!e?.startDateUtc && e?.endDateUtc, "start")
  ), [v, T] = R(e?.duration || 1), [x, b] = R(
    e?.excludedWeekdays || []
  ), [u, y] = R(
    []
  ), O = Ye(null), [p, S] = R(0), [k, I] = R(!1), [W, A] = R([]), [G, oe] = R(!1), [Z, ge] = R(null), [de, Se] = R([]), [ye, ae] = R([]), [ie, me] = R(
    void 0
  ), Le = Ye(null), [Oe, at] = R([]), [ee, se] = R(() => e?.startDateUtc ? ne(E(e.startDateUtc)) : ne(E(s))), [Ce, $e] = R(null), [ze, ke] = R(() => e?.startDateUtc ? re(E(e.startDateUtc)) : re(E(s))), [Ze, Be] = R(null), [tt, Ae] = R(() => {
    if (e?.startDateUtc) {
      const h = re(E(e.startDateUtc));
      return Math.floor(h / 10) * 10;
    }
    const c = re(E(s));
    return Math.floor(c / 10) * 10;
  });
  Me(() => {
    if (l && g) {
      const c = Sr(
        l,
        g,
        i,
        x
      );
      T(c);
    } else
      T(1);
  }, [l, g, i, x]), Me(() => {
    if (O.current) {
      const h = document.createElement("canvas").getContext("2d");
      if (h) {
        h.font = "14px system-ui, -apple-system, sans-serif";
        const M = h.measureText(v.toString()).width;
        S(12 + M + 4);
      }
    }
  }, [v]), Me(() => {
    const c = (h) => {
      Le.current && !Le.current.contains(h.target) && oe(!1);
    };
    return document.addEventListener("mousedown", c), () => document.removeEventListener("mousedown", c);
  }, []), Me(() => {
    (async () => {
      await st.init();
      const h = await st.getData(
        "savedDateRanges"
      );
      h && at(h);
    })();
  }, []), Me(() => {
    l && !g ? D("end") : !l && g && D("start");
  }, [l, g]);
  const kt = (c) => {
    d(c), c ? g || D("end") : D("start"), c && g && E(c) > E(g) && f(c), c && se(ne(E(c)));
  }, Ft = (c) => {
    f(c), c ? l || D("start") : D("end"), c && l && E(c) < E(l) && d(c), c && se(ne(E(c)));
  }, it = !rt, It = (c) => {
    if (!(c <= 0)) {
      if (T(c), l) {
        const h = Pi(
          l,
          i,
          c,
          x
        );
        f(h), se(ne(E(h)));
      } else if (g) {
        const h = Ui(
          g,
          i,
          c,
          x
        );
        d(h), se(ne(E(h)));
      }
      D("start");
    }
  }, Pt = (c) => {
    a(c);
  }, Ut = (c) => {
    x.includes(c) ? b(x.filter((h) => h !== c)) : b([...x, c]);
  }, $t = (c, h) => {
    d(c), f(h), D("start"), c && se(ne(E(c)));
  }, Bt = (c) => {
    d(c.startDateUtc), f(c.endDateUtc), a(c.unit), b(c.excludedWeekdays), T(c.duration), D("start"), c.excludeEnabled !== void 0 && I(c.excludeEnabled), c.excludeFilterTypes ? A(c.excludeFilterTypes) : A([]), c.excludedSpecificDates ? y(c.excludedSpecificDates) : y([]), c.excludedSavedDates ? Se(c.excludedSavedDates) : Se([]), c.excludedDateRanges ? ae(c.excludedDateRanges) : ae([]), c.startDateUtc && se(ne(E(c.startDateUtc)));
  }, Mt = () => {
    d(s), f(s), b([]), D("start"), se(ne(E(s)));
  }, ct = () => {
    d(""), f(""), T(1), a("day"), b([]), D("start"), I(!1), A([]), y([]), Se([]), ae([]), me(void 0), ge(null), se(ne(E(s)));
  }, Qe = !l || l.trim() === "" || !g || g.trim() === "", At = () => {
    if (Qe)
      return;
    const c = Bn(
      l,
      g,
      i,
      x,
      k,
      W,
      u,
      de,
      ye
    );
    t(c);
  }, ce = (c) => {
    if (c?.from) {
      const h = B(c.from);
      if (d(h), c?.to) {
        const M = B(c.to);
        f(M), D("start");
      } else
        f(h), D("end");
    }
  }, Ht = (c, h) => {
    if (l && g && c?.to) {
      const M = B(h);
      w === "start" ? E(g).getTime() > E(M).getTime() ? d(M) : (d(M), f("")) : E(l).getTime() > E(M).getTime() ? (f(l), d(M)) : (f(M), d(l)), D(w === "start" ? "end" : "start");
      return;
    }
    if (!l && g && c?.from) {
      f(B(c?.from)), D("start");
      return;
    }
    if (!l && !g && c?.from) {
      d(B(c?.from)), f(""), D("end");
      return;
    }
    if (c?.from) {
      const M = B(c.from);
      if (d(M), c?.to) {
        const _ = B(c.to);
        f(_), D("start");
      } else
        f(M), D("end");
    }
  }, Nt = (c, h) => {
    if (c && c.from) {
      let M = J(c.from, {
        weekStartsOn: fe
      }), _ = Q(M, 6);
      if (l && g)
        if (w === "start")
          if (E(B(h)).getTime() > E(g).getTime() && E(B(h)).getTime() > E(l).getTime())
            M = J(h, {
              weekStartsOn: fe
            }), _ = Q(M, 6), ce({ from: M, to: _ });
          else if (E(B(h)).getTime() < E(g).getTime() && E(B(h)).getTime() < E(l).getTime()) {
            M = J(h, {
              weekStartsOn: fe
            }), _ = Q(M, 6);
            const Y = J(g, {
              weekStartsOn: fe
            }), H = Q(Y, 6);
            ce({ from: M, to: H });
          } else if (E(B(h)).getTime() > E(l).getTime() && E(B(h)).getTime() < E(g).getTime()) {
            M = J(h, {
              weekStartsOn: fe
            }), _ = Q(M, 6);
            const Y = J(g, {
              weekStartsOn: fe
            }), H = Q(Y, 6);
            ce({ from: M, to: H });
          } else
            M = J(h, {
              weekStartsOn: fe
            }), _ = Q(h, 6), ce({ from: M, to: _ });
        else if (E(B(h)).getTime() > E(g).getTime()) {
          M = J(c.from, {
            weekStartsOn: fe
          }), _ = Q(M, 6);
          const Y = J(h, {
            weekStartsOn: fe
          }), H = Q(Y, 6);
          ce({ from: M, to: H });
        } else if (E(B(h)).getTime() < E(g).getTime() && E(B(h)).getTime() < E(l).getTime()) {
          M = J(h, {
            weekStartsOn: fe
          }), _ = Q(M, 6);
          const Y = J(l, {
            weekStartsOn: fe
          }), H = Q(Y, 6);
          ce({ from: M, to: H });
        } else {
          M = J(l, {
            weekStartsOn: fe
          }), _ = Q(M, 6);
          const Y = J(h, {
            weekStartsOn: fe
          }), H = Q(Y, 6);
          ce({ from: M, to: H });
        }
      if (c.to && (!l || !g)) {
        const Y = J(c.to, {
          weekStartsOn: fe
        }), H = Q(Y, 6);
        ce({ from: M, to: H });
      }
      D(w === "start" ? "end" : "start");
    }
  }, St = E(s), He = {
    from: l ? E(l) : void 0,
    to: g ? E(g) : void 0
  }, Ot = {
    from: l ? E(l) : St,
    to: g ? E(g) : St
  }, Ve = (c) => {
    const h = !rt, M = k && W.includes("days") && x.includes(c.getDay()), _ = k && W.includes("specific-date") && u.includes(B(c)), Y = k && W.includes("saved-dates") && de.some((K) => {
      const P = Oe.find((X) => X.id === K);
      if (!P) return !1;
      const j = B(c);
      if (!(j >= P.selection.startDateUtc && j <= P.selection.endDateUtc)) return !1;
      if (P.selection.excludedWeekdays && P.selection.excludedWeekdays.length > 0 && P.selection.excludedWeekdays.includes(c.getDay()) || P.selection.excludedSpecificDates && P.selection.excludedSpecificDates.length > 0 && P.selection.excludedSpecificDates.includes(j) || P.selection.excludedSavedDates && P.selection.excludedSavedDates.some(
        (we) => {
          const L = Oe.find(
            (te) => te.id === we
          );
          return L ? j >= L.selection.startDateUtc && j <= L.selection.endDateUtc : !1;
        }
      ))
        return !0;
      let De = !1;
      return !!(P.selection.excludedDateRanges && (De = P.selection.excludedDateRanges.some(
        (X) => j >= X.start && j <= X.end
      ), De));
    }), H = k && W.includes("date-range") && ye.some((K) => {
      const P = B(c);
      return P >= K.start && P <= K.end;
    });
    return h || M || _ || Y || H;
  }, Rt = (c, h) => {
    const M = ne(
      bt(Dt(/* @__PURE__ */ new Date(), c), h)
    );
    se(M), $e(null), ke(c);
  }, qt = (c) => {
    const h = et(ee), M = ne(
      bt(Dt(/* @__PURE__ */ new Date(), c), h)
    );
    se(M), Be(null), Ae(Math.floor(c / 10) * 10);
  };
  Me(() => {
    Ce === null && ke(re(ee));
  }, [ee, Ce]);
  const Ct = (c) => {
    const h = c - 1, M = c + 10, _ = re(ee), Y = [];
    for (let H = h; H <= M; H++)
      Y.push(H);
    return /* @__PURE__ */ N("div", { className: "flex flex-col w-full", children: [
      /* @__PURE__ */ N("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => Ae(tt - 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ m("span", { className: "text-lg", children: "<<" })
          }
        ),
        /* @__PURE__ */ N("div", { className: "text-lg font-semibold", children: [
          c,
          "-",
          c + 9
        ] }),
        /* @__PURE__ */ m(
          "button",
          {
            onClick: () => Ae(tt + 10),
            className: "p-1 hover:bg-gray-100 rounded transition-colors",
            children: /* @__PURE__ */ m("span", { className: "text-lg", children: ">>" })
          }
        )
      ] }),
      /* @__PURE__ */ m("div", { className: "grid grid-cols-3 gap-2 w-full", children: Y.map((H) => {
        const K = !rt, P = H < c || H > c + 9;
        return /* @__PURE__ */ m(
          "button",
          {
            onClick: () => qt(H),
            disabled: K,
            className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors 
                  ${P ? "opacity-50 bg-gray-50 text-gray-500" : _ === H ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
            children: H
          },
          H
        );
      }) })
    ] });
  }, lt = (c) => /* @__PURE__ */ N("div", { className: "flex flex-col w-full", children: [
    /* @__PURE__ */ N("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ m(
        "button",
        {
          onClick: () => ke(ze - 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ m("span", { className: "text-lg", children: "<<" })
        }
      ),
      /* @__PURE__ */ m("div", { className: "text-lg font-semibold", children: c }),
      /* @__PURE__ */ m(
        "button",
        {
          onClick: () => ke(ze + 1),
          className: "p-1 hover:bg-gray-100 rounded transition-colors",
          children: /* @__PURE__ */ m("span", { className: "text-lg", children: ">>" })
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "grid grid-cols-3 gap-2 w-full", children: Gi.map((h, M) => {
      const _ = !rt, Y = re(ee) === c && et(ee) === M;
      return /* @__PURE__ */ m(
        "button",
        {
          onClick: () => Rt(c, M),
          disabled: _,
          className: `
                  px-3 py-4 border border-gray-300 text-sm font-medium rounded-md transition-colors
                  ${Y ? "bg-[#003DB8] text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}
                `,
          children: h
        },
        h
      );
    }) })
  ] }), Ge = Ye(null), U = Ye(null);
  return Me(() => {
    if (i !== "day") return;
    const c = (_, Y) => {
      const H = _.querySelector(
        "span[data-month-name]"
      ), K = _.querySelector(
        "span[data-year-name]"
      );
      if (H) {
        const X = _.textContent || "";
        _.style.gap = "6px";
        let we = "";
        if (K)
          we = K.textContent || "";
        else {
          const L = X.match(/\d{4}/);
          L && (we = L[0]);
        }
        if (!K && we) {
          const L = document.createElement("span");
          L.textContent = we, L.setAttribute("data-year-name", "true"), L.style.cursor = "pointer", L.onclick = (xe) => {
            xe.stopPropagation(), xe.preventDefault();
            const Tt = parseInt(we, 10);
            if (!isNaN(Tt)) {
              const Ke = Math.floor(Tt / 10) * 10;
              Ae(Ke), Be(Y), $e(null);
            }
          };
          const te = H.nextSibling;
          if (te && te.nodeType === Node.TEXT_NODE)
            te.parentNode?.insertBefore(L, te.nextSibling);
          else {
            const xe = document.createTextNode(" ");
            _.appendChild(xe), _.appendChild(L);
          }
        } else K && (K.onclick = (L) => {
          L.stopPropagation(), L.preventDefault();
          const te = parseInt(we, 10);
          if (!isNaN(te)) {
            const xe = Math.floor(te / 10) * 10;
            Ae(xe), Be(Y), $e(null);
          }
        });
        H.onclick = (L) => {
          L.stopPropagation(), L.preventDefault();
          const te = parseInt(we, 10);
          isNaN(te) || (ke(te), $e(Y), Be(null));
        };
        return;
      }
      const P = _.textContent || "", j = P.trim().split(/\s+/);
      let ue = "", De = "";
      if (j.length >= 2)
        ue = j[0], De = j[1];
      else if (j.length === 1) {
        const X = P.match(/^([A-Za-z]+)(\d{4})$/);
        if (X)
          ue = X[1], De = X[2];
        else
          return;
      } else
        return;
      if (ue && De) {
        const X = _.firstChild;
        if (_.style.gap = "6px", X && X.nodeType === Node.TEXT_NODE && (X.textContent || "").indexOf(ue) !== -1) {
          const te = document.createElement("span");
          te.textContent = ue, te.setAttribute("data-month-name", "true"), te.style.cursor = "pointer", te.onclick = (Ke) => {
            Ke.stopPropagation(), Ke.preventDefault();
            const dt = parseInt(De, 10);
            isNaN(dt) || (ke(dt), $e(Y), Be(null));
          };
          const xe = document.createElement("span");
          xe.textContent = De, xe.setAttribute("data-year-name", "true"), xe.style.cursor = "pointer", xe.onclick = (Ke) => {
            Ke.stopPropagation(), Ke.preventDefault();
            const dt = parseInt(De, 10);
            if (!isNaN(dt)) {
              const Or = Math.floor(dt / 10) * 10;
              Ae(Or), Be(Y), $e(null);
            }
          }, _.innerHTML = "", _.appendChild(te);
          const Tt = document.createTextNode(" ");
          _.appendChild(Tt), _.appendChild(xe);
        }
      }
    }, h = (_, Y) => {
      if (!_) return;
      _.querySelectorAll(".rdp-caption_label").forEach((K, P) => {
        const j = K, ue = Y !== null ? Y : P === 0 ? 0 : 1;
        Ce === ue || Ze === ue || c(j, ue);
      });
    }, M = setTimeout(() => {
      Ce === null && Ze === null ? h(Ge.current, null) : (h(Ge.current, 0), h(U.current, 1));
    }, 150);
    return () => clearTimeout(M);
  }, [i, ee, Ce, Ze]), /* @__PURE__ */ N(
    "div",
    {
      className: "flex gap-4 bg-white rounded-lg shadow-xl border border-gray-200",
      style: o,
      children: [
        /* @__PURE__ */ m(
          ji,
          {
            onPresetSelect: $t,
            onSavedDateSelect: Bt,
            currentSelection: Bn(
              l,
              g,
              i,
              x,
              k,
              W,
              u,
              de,
              ye
            ),
            themeColors: r
          }
        ),
        /* @__PURE__ */ N("div", { className: "flex-1 flex flex-col min-h-0", children: [
          /* @__PURE__ */ N("div", { className: "px-6 pt-6 overflow-y-auto flex-1", children: [
            /* @__PURE__ */ m("div", { className: "flex gap-2 mb-4", children: ["day", "week", "month", "quarter"].map(
              (c) => /* @__PURE__ */ m(
                "button",
                {
                  onClick: () => Pt(c),
                  className: `px-4 py-2 rounded-lg text-sm font-light transition-colors ${i === c ? "bg-[#EBF0F9] text-[#003DB8] border border-[#003DB8]" : "bg-[#EBF0F9] text-gray-500 hover:bg-[#EBF0F9]"}`,
                  children: c.charAt(0).toUpperCase() + c.slice(1)
                },
                c
              )
            ) }),
            /* @__PURE__ */ N("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
              /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m(
                  "label",
                  {
                    className: `block text-xs font-medium mb-1 ${w === "start" ? "text-blue-600" : "text-gray-600"}`,
                    children: "Start Date"
                  }
                ),
                /* @__PURE__ */ m(
                  Hn,
                  {
                    value: l,
                    onChange: kt,
                    placeholder: "DD/MM/YYYY",
                    onFocus: () => D("start"),
                    className: `w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${w === "start" ? "border-blue-500" : "border-gray-300"}`
                  }
                )
              ] }),
              /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m(
                  "label",
                  {
                    className: `block text-xs font-medium mb-1 ${w === "end" ? "text-blue-600" : "text-gray-600"}`,
                    children: "End Date"
                  }
                ),
                /* @__PURE__ */ m(
                  Hn,
                  {
                    value: g,
                    onChange: Ft,
                    placeholder: "DD/MM/YYYY",
                    onFocus: () => D("end"),
                    className: `w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${w === "end" ? "border-blue-500" : "border-gray-300"}`
                  }
                )
              ] }),
              /* @__PURE__ */ N("div", { children: [
                /* @__PURE__ */ m("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Duration" }),
                /* @__PURE__ */ N("div", { className: "relative", children: [
                  /* @__PURE__ */ m(
                    "input",
                    {
                      ref: O,
                      type: "number",
                      min: "1",
                      value: v,
                      onChange: (c) => It(Number(c.target.value)),
                      className: "w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                    }
                  ),
                  /* @__PURE__ */ m(
                    "span",
                    {
                      className: "absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none",
                      style: { left: `${p}px` },
                      children: Bi(i)
                    }
                  )
                ] })
              ] })
            ] }),
            it,
            /* @__PURE__ */ N("div", { className: "mb-4", children: [
              /* @__PURE__ */ N("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ m(
                  "input",
                  {
                    type: "checkbox",
                    id: "exclude-checkbox",
                    checked: k,
                    onChange: (c) => I(c.target.checked),
                    className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  }
                ),
                /* @__PURE__ */ m(
                  "label",
                  {
                    htmlFor: "exclude-checkbox",
                    className: "text-sm text-gray-700",
                    children: "exclude from selection"
                  }
                ),
                /* @__PURE__ */ N("div", { className: "relative flex-1", ref: Le, children: [
                  /* @__PURE__ */ m(
                    "button",
                    {
                      type: "button",
                      onClick: () => k && oe(!G),
                      disabled: !k,
                      className: "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
                      children: /* @__PURE__ */ m(
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
                  /* @__PURE__ */ m(ri, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" }),
                  G && k && /* @__PURE__ */ m("div", { className: "absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", children: /* @__PURE__ */ N("div", { className: "p-2 space-y-1", children: [
                    /* @__PURE__ */ N("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: W.includes("days"),
                          onChange: (c) => {
                            c.target.checked ? A([
                              ...W,
                              "days"
                            ]) : A(
                              W.filter((h) => h !== "days")
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ m("span", { className: "text-sm text-gray-700", children: "Days" })
                    ] }),
                    /* @__PURE__ */ N("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: W.includes("specific-date"),
                          onChange: (c) => {
                            c.target.checked ? A([
                              ...W,
                              "specific-date"
                            ]) : A(
                              W.filter(
                                (h) => h !== "specific-date"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ m("span", { className: "text-sm text-gray-700", children: "Specific Date" })
                    ] }),
                    /* @__PURE__ */ N("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: W.includes("saved-dates"),
                          onChange: (c) => {
                            c.target.checked ? A([
                              ...W,
                              "saved-dates"
                            ]) : A(
                              W.filter(
                                (h) => h !== "saved-dates"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ m("span", { className: "text-sm text-gray-700", children: "Saved Dates" })
                    ] }),
                    /* @__PURE__ */ N("label", { className: "flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer", children: [
                      /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: W.includes("date-range"),
                          onChange: (c) => {
                            c.target.checked ? A([
                              ...W,
                              "date-range"
                            ]) : A(
                              W.filter(
                                (h) => h !== "date-range"
                              )
                            );
                          },
                          className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }
                      ),
                      /* @__PURE__ */ m("span", { className: "text-sm text-gray-700", children: "Date Range" })
                    ] })
                  ] }) })
                ] })
              ] }),
              k && W.length > 0 && /* @__PURE__ */ N("div", { className: "flex gap-2 items-center", children: [
                W.includes("days") && /* @__PURE__ */ N(
                  "button",
                  {
                    onClick: () => ge(
                      Z === "days" ? null : "days"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${Z === "days" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ m(Kt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ N("span", { children: [
                        "Days (",
                        x.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                W.includes("specific-date") && /* @__PURE__ */ N(
                  "button",
                  {
                    onClick: () => ge(
                      Z === "specific-date" ? null : "specific-date"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${Z === "specific-date" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ m(Kt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ N("span", { children: [
                        "Dates (",
                        u.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                W.includes("saved-dates") && /* @__PURE__ */ N(
                  "button",
                  {
                    onClick: () => ge(
                      Z === "saved-dates" ? null : "saved-dates"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${Z === "saved-dates" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ m(ei, { className: "w-4 h-4" }),
                      /* @__PURE__ */ N("span", { children: [
                        "Saved (",
                        de.length,
                        " selected)"
                      ] })
                    ]
                  }
                ),
                W.includes("date-range") && /* @__PURE__ */ N(
                  "button",
                  {
                    onClick: () => ge(
                      Z === "date-range" ? null : "date-range"
                    ),
                    className: `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${Z === "date-range" ? "bg-blue-100 text-blue-700 border border-blue-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                    children: [
                      /* @__PURE__ */ m(Kt, { className: "w-4 h-4" }),
                      /* @__PURE__ */ N("span", { children: [
                        "Date Ranges (",
                        ye.length,
                        " selected)"
                      ] })
                    ]
                  }
                )
              ] }),
              k && Z === "days" && W.includes("days") && /* @__PURE__ */ m("div", { className: "mt-3 flex gap-2", children: Vi.map((c) => /* @__PURE__ */ m(
                "button",
                {
                  onClick: () => Ut(c.value),
                  className: `flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${x.includes(c.value) ? "bg-red-100 text-red-700 border-2 border-red-400" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                  children: c.label
                },
                c.value
              )) }),
              k && Z === "specific-date" && W.includes("specific-date") && /* @__PURE__ */ N("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ m("p", { className: "text-xs text-gray-500 text-center mb-2", children: "Click individual dates to exclude them" }),
                /* @__PURE__ */ m("div", { className: "flex justify-center p-4 border border-gray-200 rounded-md bg-gray-50", children: /* @__PURE__ */ m(
                  qe,
                  {
                    mode: "multiple",
                    selected: u.map((c) => E(c)),
                    onSelect: (c) => {
                      c && y(
                        c.map((h) => B(h))
                      );
                    },
                    numberOfMonths: 2,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                u.length > 0 && /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-2", children: u.map((c) => /* @__PURE__ */ N(
                  "div",
                  {
                    className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                    children: [
                      /* @__PURE__ */ m("span", { children: (/* @__PURE__ */ new Date(c + "T00:00:00")).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        }
                      ) }),
                      /* @__PURE__ */ m(
                        "button",
                        {
                          onClick: () => {
                            y(
                              u.filter((h) => h !== c)
                            );
                          },
                          className: "hover:bg-red-200 rounded-full p-0.5",
                          children: /* @__PURE__ */ m(Tn, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  },
                  c
                )) })
              ] }),
              k && Z === "saved-dates" && W.includes("saved-dates") && /* @__PURE__ */ m("div", { className: "mt-3 flex flex-col gap-3", children: Oe.length === 0 ? /* @__PURE__ */ m("p", { className: "text-sm text-gray-500 text-center py-4", children: "No saved dates available" }) : /* @__PURE__ */ m("div", { className: "space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2", children: Oe.map((c) => {
                const h = de.includes(
                  c.id
                );
                return /* @__PURE__ */ N(
                  "div",
                  {
                    className: `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${h ? "bg-red-50 border border-red-300" : "bg-white hover:bg-gray-50 border border-gray-200"}`,
                    onClick: () => {
                      Se(
                        h ? de.filter(
                          (M) => M !== c.id
                        ) : [
                          ...de,
                          c.id
                        ]
                      );
                    },
                    children: [
                      /* @__PURE__ */ N("div", { className: "flex-1", children: [
                        /* @__PURE__ */ m("div", { className: "text-sm font-medium text-gray-900", children: c.label }),
                        /* @__PURE__ */ N("div", { className: "text-xs text-gray-600", children: [
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
                      /* @__PURE__ */ m(
                        "input",
                        {
                          type: "checkbox",
                          checked: h,
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
              k && Z === "date-range" && W.includes("date-range") && /* @__PURE__ */ N("div", { className: "mt-3 flex flex-col gap-3", children: [
                /* @__PURE__ */ m("div", { className: "border border-gray-200 rounded-md bg-gray-50 p-4", children: /* @__PURE__ */ m(
                  qe,
                  {
                    mode: "range",
                    selected: ie,
                    onSelect: (c) => me(c),
                    numberOfMonths: 2,
                    disabled: (c) => !rt,
                    modifiersClassNames: {
                      selected: "bg-red-500 text-white hover:bg-red-600 rounded-md"
                    }
                  }
                ) }),
                ie?.from && ie?.to && /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ m(
                    "button",
                    {
                      onClick: () => {
                        const c = {
                          id: `range-${Date.now()}`,
                          start: B(ie.from),
                          end: B(ie.to)
                        };
                        ae([
                          ...ye,
                          c
                        ]), me(void 0);
                      },
                      className: "px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors",
                      children: "Add Date Range"
                    }
                  ),
                  /* @__PURE__ */ m(
                    "button",
                    {
                      onClick: () => me(void 0),
                      className: "px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors",
                      children: "Clear Selection"
                    }
                  )
                ] }),
                ye.length > 0 && /* @__PURE__ */ N("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ m("p", { className: "text-xs text-gray-600 font-medium", children: "Excluded Date Ranges:" }),
                  /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-2", children: ye.map((c) => /* @__PURE__ */ N(
                    "div",
                    {
                      className: "flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs",
                      children: [
                        /* @__PURE__ */ N("span", { children: [
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
                        /* @__PURE__ */ m(
                          "button",
                          {
                            onClick: () => {
                              ae(
                                ye.filter(
                                  (h) => h.id !== c.id
                                )
                              );
                            },
                            className: "hover:bg-red-200 rounded-full p-0.5",
                            children: /* @__PURE__ */ m(Tn, { className: "w-3 h-3" })
                          }
                        )
                      ]
                    },
                    c.id
                  )) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ N("div", { className: "flex gap-4 justify-center mb-4", children: [
              i === "day" && /* @__PURE__ */ m("div", { className: "flex gap-4", children: Ze !== null ? Ze === 0 ? (
                // When yearsViewIndex === 0, show years grid on left and single calendar on right
                /* @__PURE__ */ N(mt, { children: [
                  /* @__PURE__ */ m(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: Ct(tt)
                    }
                  ),
                  /* @__PURE__ */ m("div", { ref: U, children: /* @__PURE__ */ m(
                    qe,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: He,
                      onSelect: ce,
                      month: ne(Fe(ee, 1)),
                      onMonthChange: (c) => {
                        const h = new Date(ee), _ = new Date(c).getMonth() - h.getMonth();
                        _ !== 1 && _ !== -11 && se(
                          ne(Fe(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: Ve,
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
                /* @__PURE__ */ N(mt, { children: [
                  /* @__PURE__ */ m("div", { ref: Ge, children: /* @__PURE__ */ m(
                    qe,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: He,
                      onSelect: ce,
                      month: ee,
                      onMonthChange: se,
                      numberOfMonths: 1,
                      disabled: Ve,
                      modifiersClassNames: {
                        selected: "rdp-day_selected bg-[#003DB8]",
                        disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                      },
                      classNames: {
                        chevron: "fill-black"
                      }
                    }
                  ) }),
                  /* @__PURE__ */ m(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: Ct(tt)
                    }
                  )
                ] })
              ) : Ce === null ? (
                // When monthsViewIndex === null, show single DayPicker with 2 months (original UI)
                /* @__PURE__ */ m("div", { ref: Ge, children: /* @__PURE__ */ m(
                  qe,
                  {
                    mode: "range",
                    navLayout: "around",
                    selected: He,
                    onSelect: (c, h) => {
                      Ht(c, h);
                    },
                    month: ee,
                    onMonthChange: se,
                    numberOfMonths: 2,
                    disabled: Ve,
                    modifiersClassNames: {
                      selected: "rdp-day_selected bg-[#003DB8]",
                      disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                    },
                    classNames: {
                      chevron: "fill-black"
                    }
                  }
                ) })
              ) : Ce === 0 ? (
                // When monthsViewIndex === 0, show months grid on left and single calendar on right
                /* @__PURE__ */ N(mt, { children: [
                  /* @__PURE__ */ m(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: lt(ze)
                    }
                  ),
                  /* @__PURE__ */ m("div", { ref: U, children: /* @__PURE__ */ m(
                    qe,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: He,
                      onSelect: ce,
                      month: ne(Fe(ee, 1)),
                      onMonthChange: (c) => {
                        const h = new Date(ee), _ = new Date(c).getMonth() - h.getMonth();
                        _ !== 1 && _ !== -11 && se(
                          ne(Fe(c, -1))
                        );
                      },
                      numberOfMonths: 1,
                      disabled: Ve,
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
                /* @__PURE__ */ N(mt, { children: [
                  /* @__PURE__ */ m("div", { ref: Ge, children: /* @__PURE__ */ m(
                    qe,
                    {
                      mode: "range",
                      navLayout: "around",
                      selected: He,
                      onSelect: ce,
                      month: ee,
                      onMonthChange: se,
                      numberOfMonths: 1,
                      disabled: Ve,
                      modifiersClassNames: {
                        selected: "rdp-day_selected bg-[#003DB8]",
                        disabled: "rdp-day_disabled opacity-30 bg-gray-100 text-black"
                      },
                      classNames: {
                        chevron: "fill-black"
                      }
                    }
                  ) }),
                  /* @__PURE__ */ m(
                    "div",
                    {
                      className: "w-full flex-shrink-0",
                      style: { minWidth: "280px", maxWidth: "280px" },
                      children: lt(ze)
                    }
                  )
                ] })
              ) }),
              i === "week" && /* @__PURE__ */ m(
                qe,
                {
                  mode: "range",
                  navLayout: "around",
                  showWeekNumber: !0,
                  locale: void 0,
                  formatters: {
                    formatWeekNumber: (c) => `W${String(c).padStart(2, "0")}`
                  },
                  selected: He,
                  onSelect: (c, h) => {
                    Nt(c, h);
                  },
                  onWeekNumberClick: (c, h) => {
                    h && h.length > 0 && Nt(
                      {
                        from: h[0],
                        to: h[h.length - 1]
                      },
                      h[0]
                    );
                  },
                  month: ee,
                  onMonthChange: se,
                  numberOfMonths: 2,
                  disabled: (c) => {
                    const h = !rt, M = k && W.includes("days") && x.includes(c.getDay()), _ = k && W.includes("specific-date") && u.includes(B(c)), Y = k && W.includes("saved-dates") && de.some((K) => {
                      const P = Oe.find(
                        (X) => X.id === K
                      );
                      if (!P) return !1;
                      const j = B(c);
                      if (!(j >= P.selection.startDateUtc && j <= P.selection.endDateUtc)) return !1;
                      if (P.selection.excludedWeekdays && P.selection.excludedWeekdays.length > 0 && P.selection.excludedWeekdays.includes(c.getDay()) || P.selection.excludedSpecificDates && P.selection.excludedSpecificDates.length > 0 && P.selection.excludedSpecificDates.includes(j) || P.selection.excludedSavedDates && P.selection.excludedSavedDates.some(
                        (we) => {
                          const L = Oe.find(
                            (te) => te.id === we
                          );
                          return L ? j >= L.selection.startDateUtc && j <= L.selection.endDateUtc : !1;
                        }
                      ))
                        return !0;
                      let De = !1;
                      return !!(P.selection.excludedDateRanges && (De = P.selection.excludedDateRanges.some(
                        (X) => j >= X.start && j <= X.end
                      ), De));
                    }), H = k && W.includes("date-range") && ye.some((K) => {
                      const P = B(c);
                      return P >= K.start && P <= K.end;
                    });
                    return h || M || _ || Y || H;
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
              i === "month" && /* @__PURE__ */ m(
                zi,
                {
                  selectedRange: Ot,
                  onSelect: ce,
                  activeDateField: w,
                  onActiveFieldChange: D
                }
              ),
              i === "quarter" && /* @__PURE__ */ m(
                Qi,
                {
                  selectedRange: Ot,
                  onSelect: ce
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ N("div", { className: "flex items-center justify-between pt-4 pb-6 px-6 border-t border-gray-200", children: [
            /* @__PURE__ */ m(
              "button",
              {
                onClick: Mt,
                className: "px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors",
                children: "Today"
              }
            ),
            /* @__PURE__ */ N("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: ct,
                  className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
                  children: "Clear dates"
                }
              ),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: n,
                  className: "px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ m(
                "button",
                {
                  onClick: At,
                  disabled: !!(Qe || it),
                  className: `px-4 py-2 text-sm font-medium rounded-md transition-colors ${Qe || it ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
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
  rt as ALLOW_FUTURE_DATES,
  rc as AdvancedDateRangePicker,
  Ji as CONSTRAIN_WEEK_TO_CURRENT_MONTH,
  ec as WEEK_NUMBERING_MODE,
  fe as WEEK_STARTS_ON,
  Sr as calcDurationFromRange,
  Pi as calcEndFromDuration,
  Ui as calcStartFromDuration,
  Bn as createSelection,
  tc as formatDisplayDate,
  B as formatUtc,
  Ai as getPresets,
  _t as getTodayUtc,
  Bi as getUnitAbbreviation,
  nc as parseDisplayDate,
  E as parseUtc
};
