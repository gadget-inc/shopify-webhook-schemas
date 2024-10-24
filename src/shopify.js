var xa = Object.defineProperty;
var La = (e, t, r) =>
  t in e
    ? xa(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r,
      })
    : (e[t] = r);
var wt = (e, t, r) => La(e, typeof t != "symbol" ? t + "" : t, r);
function Pa(e, t) {
  for (var r = 0; r < t.length; r++) {
    const n = t[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const a in n)
        if (a !== "default" && !(a in e)) {
          const o = Object.getOwnPropertyDescriptor(n, a);
          o &&
            Object.defineProperty(
              e,
              a,
              o.get
                ? o
                : {
                    enumerable: !0,
                    get: () => n[a],
                  }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module",
    })
  );
}
var $l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ca(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var dn = {
    exports: {},
  },
  Nt = {},
  fn = {
    exports: {},
  },
  A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ot = Symbol.for("react.element"),
  Ta = Symbol.for("react.portal"),
  Da = Symbol.for("react.fragment"),
  Ma = Symbol.for("react.strict_mode"),
  Oa = Symbol.for("react.profiler"),
  ka = Symbol.for("react.provider"),
  _a = Symbol.for("react.context"),
  Fa = Symbol.for("react.forward_ref"),
  Na = Symbol.for("react.suspense"),
  Ia = Symbol.for("react.memo"),
  Aa = Symbol.for("react.lazy"),
  Ar = Symbol.iterator;
function ja(e) {
  return e === null || typeof e != "object" ? null : ((e = (Ar && e[Ar]) || e["@@iterator"]), typeof e == "function" ? e : null);
}
var hn = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  mn = Object.assign,
  pn = {};
function ze(e, t, r) {
  (this.props = e), (this.context = t), (this.refs = pn), (this.updater = r || hn);
}
ze.prototype.isReactComponent = {};
ze.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
ze.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function vn() {}
vn.prototype = ze.prototype;
function sr(e, t, r) {
  (this.props = e), (this.context = t), (this.refs = pn), (this.updater = r || hn);
}
var ur = (sr.prototype = new vn());
ur.constructor = sr;
mn(ur, ze.prototype);
ur.isPureReactComponent = !0;
var jr = Array.isArray,
  yn = Object.prototype.hasOwnProperty,
  cr = {
    current: null,
  },
  gn = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0,
  };
function wn(e, t, r) {
  var n,
    a = {},
    o = null,
    i = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t))
      yn.call(t, n) && !gn.hasOwnProperty(n) && (a[n] = t[n]);
  var l = arguments.length - 2;
  if (l === 1) a.children = r;
  else if (1 < l) {
    for (var s = Array(l), u = 0; u < l; u++) s[u] = arguments[u + 2];
    a.children = s;
  }
  if (e && e.defaultProps) for (n in ((l = e.defaultProps), l)) a[n] === void 0 && (a[n] = l[n]);
  return {
    $$typeof: ot,
    type: e,
    key: o,
    ref: i,
    props: a,
    _owner: cr.current,
  };
}
function Ua(e, t) {
  return {
    $$typeof: ot,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function dr(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ot;
}
function Ba(e) {
  var t = {
    "=": "=0",
    ":": "=2",
  };
  return (
    "$" +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var Ur = /\/+/g;
function Wt(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ba("" + e.key) : t.toString(36);
}
function Pt(e, t, r, n, a) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ot:
          case Ta:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (a = a(i)),
      (e = n === "" ? "." + Wt(i, 0) : n),
      jr(a)
        ? ((r = ""),
          e != null && (r = e.replace(Ur, "$&/") + "/"),
          Pt(a, t, r, "", function (u) {
            return u;
          }))
        : a != null &&
          (dr(a) && (a = Ua(a, r + (!a.key || (i && i.key === a.key) ? "" : ("" + a.key).replace(Ur, "$&/") + "/") + e)), t.push(a)),
      1
    );
  if (((i = 0), (n = n === "" ? "." : n + ":"), jr(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var s = n + Wt(o, l);
      i += Pt(o, t, r, s, a);
    }
  else if (((s = ja(e)), typeof s == "function"))
    for (e = s.call(e), l = 0; !(o = e.next()).done; ) (o = o.value), (s = n + Wt(o, l++)), (i += Pt(o, t, r, s, a));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function Et(e, t, r) {
  if (e == null) return e;
  var n = [],
    a = 0;
  return (
    Pt(e, n, "", "", function (o) {
      return t.call(r, o, a++);
    }),
    n
  );
}
function $a(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (r) {
          (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = r));
        },
        function (r) {
          (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = r));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var re = {
    current: null,
  },
  Ct = {
    transition: null,
  },
  za = {
    ReactCurrentDispatcher: re,
    ReactCurrentBatchConfig: Ct,
    ReactCurrentOwner: cr,
  };
function En() {
  throw Error("act(...) is not supported in production builds of React.");
}
A.Children = {
  map: Et,
  forEach: function (e, t, r) {
    Et(
      e,
      function () {
        t.apply(this, arguments);
      },
      r
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Et(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Et(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!dr(e)) throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  },
};
A.Component = ze;
A.Fragment = Da;
A.Profiler = Oa;
A.PureComponent = sr;
A.StrictMode = Ma;
A.Suspense = Na;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = za;
A.act = En;
A.cloneElement = function (e, t, r) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var n = mn({}, e.props),
    a = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if ((t.ref !== void 0 && ((o = t.ref), (i = cr.current)), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps))
      var l = e.type.defaultProps;
    for (s in t) yn.call(t, s) && !gn.hasOwnProperty(s) && (n[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) n.children = r;
  else if (1 < s) {
    l = Array(s);
    for (var u = 0; u < s; u++) l[u] = arguments[u + 2];
    n.children = l;
  }
  return {
    $$typeof: ot,
    type: e.type,
    key: a,
    ref: o,
    props: n,
    _owner: i,
  };
};
A.createContext = function (e) {
  return (
    (e = {
      $$typeof: _a,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = {
      $$typeof: ka,
      _context: e,
    }),
    (e.Consumer = e)
  );
};
A.createElement = wn;
A.createFactory = function (e) {
  var t = wn.bind(null, e);
  return (t.type = e), t;
};
A.createRef = function () {
  return {
    current: null,
  };
};
A.forwardRef = function (e) {
  return {
    $$typeof: Fa,
    render: e,
  };
};
A.isValidElement = dr;
A.lazy = function (e) {
  return {
    $$typeof: Aa,
    _payload: {
      _status: -1,
      _result: e,
    },
    _init: $a,
  };
};
A.memo = function (e, t) {
  return {
    $$typeof: Ia,
    type: e,
    compare: t === void 0 ? null : t,
  };
};
A.startTransition = function (e) {
  var t = Ct.transition;
  Ct.transition = {};
  try {
    e();
  } finally {
    Ct.transition = t;
  }
};
A.unstable_act = En;
A.useCallback = function (e, t) {
  return re.current.useCallback(e, t);
};
A.useContext = function (e) {
  return re.current.useContext(e);
};
A.useDebugValue = function () {};
A.useDeferredValue = function (e) {
  return re.current.useDeferredValue(e);
};
A.useEffect = function (e, t) {
  return re.current.useEffect(e, t);
};
A.useId = function () {
  return re.current.useId();
};
A.useImperativeHandle = function (e, t, r) {
  return re.current.useImperativeHandle(e, t, r);
};
A.useInsertionEffect = function (e, t) {
  return re.current.useInsertionEffect(e, t);
};
A.useLayoutEffect = function (e, t) {
  return re.current.useLayoutEffect(e, t);
};
A.useMemo = function (e, t) {
  return re.current.useMemo(e, t);
};
A.useReducer = function (e, t, r) {
  return re.current.useReducer(e, t, r);
};
A.useRef = function (e) {
  return re.current.useRef(e);
};
A.useState = function (e) {
  return re.current.useState(e);
};
A.useSyncExternalStore = function (e, t, r) {
  return re.current.useSyncExternalStore(e, t, r);
};
A.useTransition = function () {
  return re.current.useTransition();
};
A.version = "18.3.1";
fn.exports = A;
var d = fn.exports;
const Ha = Ca(d),
  zl = Pa(
    {
      __proto__: null,
      default: Ha,
    },
    [d]
  );
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Va = d,
  Wa = Symbol.for("react.element"),
  Ka = Symbol.for("react.fragment"),
  Ja = Object.prototype.hasOwnProperty,
  Ya = Va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Ga = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0,
  };
function Sn(e, t, r) {
  var n,
    a = {},
    o = null,
    i = null;
  r !== void 0 && (o = "" + r), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (n in t) Ja.call(t, n) && !Ga.hasOwnProperty(n) && (a[n] = t[n]);
  if (e && e.defaultProps) for (n in ((t = e.defaultProps), t)) a[n] === void 0 && (a[n] = t[n]);
  return {
    $$typeof: Wa,
    type: e,
    key: o,
    ref: i,
    props: a,
    _owner: Ya.current,
  };
}
Nt.Fragment = Ka;
Nt.jsx = Sn;
Nt.jsxs = Sn;
dn.exports = Nt;
var Hl = dn.exports,
  Xa = -1,
  Qa = -2,
  qa = -3,
  Za = -4,
  eo = -5,
  to = -6,
  ro = -7,
  no = "B",
  ao = "D",
  Rn = "E",
  oo = "M",
  io = "N",
  bn = "P",
  lo = "R",
  so = "S",
  uo = "Y",
  co = "U",
  fo = "Z",
  xn = class {
    constructor() {
      wt(this, "promise");
      wt(this, "resolve");
      wt(this, "reject");
      this.promise = new Promise((t, r) => {
        (this.resolve = t), (this.reject = r);
      });
    }
  };
function ho() {
  const e = new TextDecoder();
  let t = "";
  return new TransformStream({
    transform(r, n) {
      const a = e.decode(r, {
          stream: !0,
        }),
        o = (t + a).split(`
`);
      t = o.pop() || "";
      for (const i of o) n.enqueue(i);
    },
    flush(r) {
      t && r.enqueue(t);
    },
  });
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Kt = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : void 0;
function qt(e) {
  const { hydrated: t, values: r } = this;
  if (typeof e == "number") return Br.call(this, e);
  if (!Array.isArray(e) || !e.length) throw new SyntaxError();
  const n = r.length;
  for (const a of e) r.push(a);
  return (t.length = r.length), Br.call(this, n);
}
function Br(e) {
  const { hydrated: t, values: r, deferred: n, plugins: a } = this;
  let o;
  const i = [
    [
      e,
      (s) => {
        o = s;
      },
    ],
  ];
  let l = [];
  for (; i.length > 0; ) {
    const [s, u] = i.pop();
    switch (s) {
      case ro:
        u(void 0);
        continue;
      case eo:
        u(null);
        continue;
      case Qa:
        u(NaN);
        continue;
      case to:
        u(1 / 0);
        continue;
      case qa:
        u(-1 / 0);
        continue;
      case Za:
        u(-0);
        continue;
    }
    if (t[s]) {
      u(t[s]);
      continue;
    }
    const c = r[s];
    if (!c || typeof c != "object") {
      (t[s] = c), u(c);
      continue;
    }
    if (Array.isArray(c))
      if (typeof c[0] == "string") {
        const [h, v, y] = c;
        switch (h) {
          case ao:
            u((t[s] = new Date(v)));
            continue;
          case co:
            u((t[s] = new URL(v)));
            continue;
          case no:
            u((t[s] = BigInt(v)));
            continue;
          case lo:
            u((t[s] = new RegExp(v, y)));
            continue;
          case uo:
            u((t[s] = Symbol.for(v)));
            continue;
          case so:
            const w = new Set();
            t[s] = w;
            for (let L = 1; L < c.length; L++)
              i.push([
                c[L],
                (p) => {
                  w.add(p);
                },
              ]);
            u(w);
            continue;
          case oo:
            const b = new Map();
            t[s] = b;
            for (let L = 1; L < c.length; L += 2) {
              const p = [];
              i.push([
                c[L + 1],
                (O) => {
                  p[1] = O;
                },
              ]),
                i.push([
                  c[L],
                  (O) => {
                    p[0] = O;
                  },
                ]),
                l.push(() => {
                  b.set(p[0], p[1]);
                });
            }
            u(b);
            continue;
          case io:
            const x = Object.create(null);
            t[s] = x;
            for (const L of Object.keys(v).reverse()) {
              const p = [];
              i.push([
                v[L],
                (O) => {
                  p[1] = O;
                },
              ]),
                i.push([
                  Number(L.slice(1)),
                  (O) => {
                    p[0] = O;
                  },
                ]),
                l.push(() => {
                  x[p[0]] = p[1];
                });
            }
            u(x);
            continue;
          case bn:
            if (t[v]) u((t[s] = t[v]));
            else {
              const L = new xn();
              (n[v] = L), u((t[s] = L.promise));
            }
            continue;
          case Rn:
            const [, R, S] = c;
            let D = S && Kt && Kt[S] ? new Kt[S](R) : new Error(R);
            (t[s] = D), u(D);
            continue;
          case fo:
            u((t[s] = t[v]));
            continue;
          default:
            if (Array.isArray(a)) {
              const L = [],
                p = c.slice(1);
              for (let O = 0; O < p.length; O++) {
                const j = p[O];
                i.push([
                  j,
                  (F) => {
                    L[O] = F;
                  },
                ]);
              }
              l.push(() => {
                for (const O of a) {
                  const j = O(c[0], ...L);
                  if (j) {
                    u((t[s] = j.value));
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const h = [];
        t[s] = h;
        for (let v = 0; v < c.length; v++) {
          const y = c[v];
          y !== Xa &&
            i.push([
              y,
              (w) => {
                h[v] = w;
              },
            ]);
        }
        u(h);
        continue;
      }
    else {
      const h = {};
      t[s] = h;
      for (const v of Object.keys(c).reverse()) {
        const y = [];
        i.push([
          c[v],
          (w) => {
            y[1] = w;
          },
        ]),
          i.push([
            Number(v.slice(1)),
            (w) => {
              y[0] = w;
            },
          ]),
          l.push(() => {
            h[y[0]] = y[1];
          });
      }
      u(h);
      continue;
    }
  }
  for (; l.length > 0; ) l.pop()();
  return o;
}
async function mo(e, t) {
  const { plugins: r } = t ?? {},
    n = new xn(),
    a = e.pipeThrough(ho()).getReader(),
    o = {
      values: [],
      hydrated: [],
      deferred: {},
      plugins: r,
    },
    i = await po.call(o, a);
  let l = n.promise;
  return (
    i.done
      ? n.resolve()
      : (l = vo
          .call(o, a)
          .then(n.resolve)
          .catch((s) => {
            for (const u of Object.values(o.deferred)) u.reject(s);
            n.reject(s);
          })),
    {
      done: l.then(() => a.closed),
      value: i.value,
    }
  );
}
async function po(e) {
  const t = await e.read();
  if (!t.value) throw new SyntaxError();
  let r;
  try {
    r = JSON.parse(t.value);
  } catch {
    throw new SyntaxError();
  }
  return {
    done: t.done,
    value: qt.call(this, r),
  };
}
async function vo(e) {
  let t = await e.read();
  for (; !t.done; ) {
    if (!t.value) continue;
    const r = t.value;
    switch (r[0]) {
      case bn: {
        const n = r.indexOf(":"),
          a = Number(r.slice(1, n)),
          o = this.deferred[a];
        if (!o) throw new Error(`Deferred ID ${a} not found in stream`);
        const i = r.slice(n + 1);
        let l;
        try {
          l = JSON.parse(i);
        } catch {
          throw new SyntaxError();
        }
        const s = qt.call(this, l);
        o.resolve(s);
        break;
      }
      case Rn: {
        const n = r.indexOf(":"),
          a = Number(r.slice(1, n)),
          o = this.deferred[a];
        if (!o) throw new Error(`Deferred ID ${a} not found in stream`);
        const i = r.slice(n + 1);
        let l;
        try {
          l = JSON.parse(i);
        } catch {
          throw new SyntaxError();
        }
        const s = qt.call(this, l);
        o.reject(s);
        break;
      }
      default:
        throw new SyntaxError();
    }
    t = await e.read();
  }
}
/**
 * React Router v7.0.0-pre.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _() {
  return (
    (_ = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    _.apply(this, arguments)
  );
}
function _e(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    a,
    o;
  for (o = 0; o < n.length; o++) (a = n[o]), !(t.indexOf(a) >= 0) && (r[a] = e[a]);
  return r;
}
var q;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(q || (q = {}));
const $r = "popstate";
function yo(e) {
  e === void 0 && (e = {});
  function t(n, a) {
    let { pathname: o, search: i, hash: l } = n.location;
    return nt(
      "",
      {
        pathname: o,
        search: i,
        hash: l,
      },
      (a.state && a.state.usr) || null,
      (a.state && a.state.key) || "default"
    );
  }
  function r(n, a) {
    return typeof a == "string" ? a : Te(a);
  }
  return wo(t, r, null, e);
}
function U(e, t) {
  throw new Error(t);
}
function go() {
  return Math.random().toString(36).substr(2, 8);
}
function zr(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
  };
}
function nt(e, t, r, n) {
  return (
    r === void 0 && (r = null),
    _(
      {
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: "",
      },
      typeof t == "string" ? be(t) : t,
      {
        state: r,
        key: (t && t.key) || n || go(),
      }
    )
  );
}
function Te(e) {
  let { pathname: t = "/", search: r = "", hash: n = "" } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function be(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && ((t.hash = e.substr(r)), (e = e.substr(0, r)));
    let n = e.indexOf("?");
    n >= 0 && ((t.search = e.substr(n)), (e = e.substr(0, n))), e && (t.pathname = e);
  }
  return t;
}
function wo(e, t, r, n) {
  n === void 0 && (n = {});
  let { window: a = document.defaultView, v5Compat: o = !1 } = n,
    i = a.history,
    l = q.Pop,
    s = null,
    u = c();
  u == null &&
    ((u = 0),
    i.replaceState(
      _({}, i.state, {
        idx: u,
      }),
      ""
    ));
  function c() {
    return (
      i.state || {
        idx: null,
      }
    ).idx;
  }
  function h() {
    l = q.Pop;
    let x = c(),
      R = x == null ? null : x - u;
    (u = x),
      s &&
        s({
          action: l,
          location: b.location,
          delta: R,
        });
  }
  function v(x, R) {
    l = q.Push;
    let S = nt(b.location, x, R);
    u = c() + 1;
    let D = zr(S, u),
      L = b.createHref(S);
    try {
      i.pushState(D, "", L);
    } catch (p) {
      if (p instanceof DOMException && p.name === "DataCloneError") throw p;
      a.location.assign(L);
    }
    o &&
      s &&
      s({
        action: l,
        location: b.location,
        delta: 1,
      });
  }
  function y(x, R) {
    l = q.Replace;
    let S = nt(b.location, x, R);
    u = c();
    let D = zr(S, u),
      L = b.createHref(S);
    i.replaceState(D, "", L),
      o &&
        s &&
        s({
          action: l,
          location: b.location,
          delta: 0,
        });
  }
  function w(x) {
    let R = a.location.origin !== "null" ? a.location.origin : a.location.href,
      S = typeof x == "string" ? x : Te(x);
    return (S = S.replace(/ $/, "%20")), R || U(), new URL(S, R);
  }
  let b = {
    get action() {
      return l;
    },
    get location() {
      return e(a, i);
    },
    listen(x) {
      if (s) throw new Error("A history only accepts one active listener");
      return (
        a.addEventListener($r, h),
        (s = x),
        () => {
          a.removeEventListener($r, h), (s = null);
        }
      );
    },
    createHref(x) {
      return t(a, x);
    },
    createURL: w,
    encodeLocation(x) {
      let R = w(x);
      return {
        pathname: R.pathname,
        search: R.search,
        hash: R.hash,
      };
    },
    push: v,
    replace: y,
    go(x) {
      return i.go(x);
    },
  };
  return b;
}
var G;
(function (e) {
  (e.data = "data"), (e.redirect = "redirect"), (e.error = "error");
})(G || (G = {}));
const Eo = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function So(e) {
  return e.index === !0;
}
function kt(e, t, r, n) {
  return (
    r === void 0 && (r = []),
    n === void 0 && (n = {}),
    e.map((a, o) => {
      let i = [...r, String(o)],
        l = typeof a.id == "string" ? a.id : i.join("-");
      if ((a.index !== !0 || !a.children || U(), n[l] && U(), So(a))) {
        let s = _({}, a, t(a), {
          id: l,
        });
        return (n[l] = s), s;
      } else {
        let s = _({}, a, t(a), {
          id: l,
          children: void 0,
        });
        return (n[l] = s), a.children && (s.children = kt(a.children, t, i, n)), s;
      }
    })
  );
}
function Ee(e, t, r) {
  return r === void 0 && (r = "/"), Tt(e, t, r, !1);
}
function Tt(e, t, r, n) {
  let a = typeof t == "string" ? be(t) : t,
    o = ie(a.pathname || "/", r);
  if (o == null) return null;
  let i = Pn(e);
  Ro(i);
  let l = null;
  for (let s = 0; l == null && s < i.length; ++s) {
    let u = _o(o);
    l = Oo(i[s], u, n);
  }
  return l;
}
function Ln(e, t) {
  let { route: r, pathname: n, params: a } = e;
  return {
    id: r.id,
    pathname: n,
    params: a,
    data: t[r.id],
    handle: r.handle,
  };
}
function Pn(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let a = (o, i, l) => {
    let s = {
      relativePath: l === void 0 ? o.path || "" : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    s.relativePath.startsWith("/") && (s.relativePath.startsWith(n) || U(), (s.relativePath = s.relativePath.slice(n.length)));
    let u = me([n, s.relativePath]),
      c = r.concat(s);
    o.children && o.children.length > 0 && (o.index === !0 && U(), Pn(o.children, t, c, u)),
      !(o.path == null && !o.index) &&
        t.push({
          path: u,
          score: Do(u, o.index),
          routesMeta: c,
        });
  };
  return (
    e.forEach((o, i) => {
      var l;
      if (o.path === "" || !((l = o.path) != null && l.includes("?"))) a(o, i);
      else for (let s of Cn(o.path)) a(o, i, s);
    }),
    t
  );
}
function Cn(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t,
    a = r.endsWith("?"),
    o = r.replace(/\?$/, "");
  if (n.length === 0) return a ? [o, ""] : [o];
  let i = Cn(n.join("/")),
    l = [];
  return (
    l.push(...i.map((s) => (s === "" ? o : [o, s].join("/")))), a && l.push(...i), l.map((s) => (e.startsWith("/") && s === "" ? "/" : s))
  );
}
function Ro(e) {
  e.sort((t, r) =>
    t.score !== r.score
      ? r.score - t.score
      : Mo(
          t.routesMeta.map((n) => n.childrenIndex),
          r.routesMeta.map((n) => n.childrenIndex)
        )
  );
}
const bo = /^:[\w-]+$/,
  xo = 3,
  Lo = 2,
  Po = 1,
  Co = 10,
  To = -2,
  Hr = (e) => e === "*";
function Do(e, t) {
  let r = e.split("/"),
    n = r.length;
  return r.some(Hr) && (n += To), t && (n += Lo), r.filter((a) => !Hr(a)).reduce((a, o) => a + (bo.test(o) ? xo : o === "" ? Po : Co), n);
}
function Mo(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function Oo(e, t, r) {
  r === void 0 && (r = !1);
  let { routesMeta: n } = e,
    a = {},
    o = "/",
    i = [];
  for (let l = 0; l < n.length; ++l) {
    let s = n[l],
      u = l === n.length - 1,
      c = o === "/" ? t : t.slice(o.length) || "/",
      h = _t(
        {
          path: s.relativePath,
          caseSensitive: s.caseSensitive,
          end: u,
        },
        c
      ),
      v = s.route;
    if (
      (!h &&
        u &&
        r &&
        !n[n.length - 1].route.index &&
        (h = _t(
          {
            path: s.relativePath,
            caseSensitive: s.caseSensitive,
            end: !1,
          },
          c
        )),
      !h)
    )
      return null;
    Object.assign(a, h.params),
      i.push({
        params: a,
        pathname: me([o, h.pathname]),
        pathnameBase: Io(me([o, h.pathnameBase])),
        route: v,
      }),
      h.pathnameBase !== "/" && (o = me([o, h.pathnameBase]));
  }
  return i;
}
function _t(e, t) {
  typeof e == "string" &&
    (e = {
      path: e,
      caseSensitive: !1,
      end: !0,
    });
  let [r, n] = ko(e.path, e.caseSensitive, e.end),
    a = t.match(r);
  if (!a) return null;
  let o = a[0],
    i = o.replace(/(.)\/+$/, "$1"),
    l = a.slice(1);
  return {
    params: n.reduce((u, c, h) => {
      let { paramName: v, isOptional: y } = c;
      if (v === "*") {
        let b = l[h] || "";
        i = o.slice(0, o.length - b.length).replace(/(.)\/+$/, "$1");
      }
      const w = l[h];
      return y && !w ? (u[v] = void 0) : (u[v] = (w || "").replace(/%2F/g, "/")), u;
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function ko(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0);
  let n = [],
    a =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, l, s) => (
            n.push({
              paramName: l,
              isOptional: s != null,
            }),
            s ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (n.push({
          paramName: "*",
        }),
        (a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
      ? (a += "\\/*$")
      : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"),
    [new RegExp(a, t ? void 0 : "i"), n]
  );
}
function _o(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch {
    return e;
  }
}
function ie(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length,
    n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function Fo(e, t) {
  t === void 0 && (t = "/");
  let { pathname: r, search: n = "", hash: a = "" } = typeof e == "string" ? be(e) : e;
  return {
    pathname: r ? (r.startsWith("/") ? r : No(r, t)) : t,
    search: Ao(n),
    hash: jo(a),
  };
}
function No(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((a) => {
      a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function Tn(e) {
  return e.filter((t, r) => r === 0 || (t.route.path && t.route.path.length > 0));
}
function fr(e) {
  let t = Tn(e);
  return t.map((r, n) => (n === t.length - 1 ? r.pathname : r.pathnameBase));
}
function hr(e, t, r, n) {
  n === void 0 && (n = !1);
  let a;
  typeof e == "string"
    ? (a = be(e))
    : ((a = _({}, e)),
      !a.pathname || !a.pathname.includes("?") || U(),
      !a.pathname || !a.pathname.includes("#") || U(),
      !a.search || !a.search.includes("#") || U());
  let o = e === "" || a.pathname === "",
    i = o ? "/" : a.pathname,
    l;
  if (i == null) l = r;
  else {
    let h = t.length - 1;
    if (!n && i.startsWith("..")) {
      let v = i.split("/");
      for (; v[0] === ".."; ) v.shift(), (h -= 1);
      a.pathname = v.join("/");
    }
    l = h >= 0 ? t[h] : "/";
  }
  let s = Fo(a, l),
    u = i && i !== "/" && i.endsWith("/"),
    c = (o || i === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (u || c) && (s.pathname += "/"), s;
}
const me = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Io = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Ao = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  jo = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
class Uo {
  constructor(t, r) {
    (this.type = "DataWithResponseInit"), (this.data = t), (this.init = r || null);
  }
}
function Bo(e, t) {
  return new Uo(
    e,
    typeof t == "number"
      ? {
          status: t,
        }
      : t
  );
}
const $o = function (t, r) {
  r === void 0 && (r = 302);
  let n = r;
  typeof n == "number"
    ? (n = {
        status: n,
      })
    : typeof n.status > "u" && (n.status = 302);
  let a = new Headers(n.headers);
  return (
    a.set("Location", t),
    new Response(
      null,
      _({}, n, {
        headers: a,
      })
    )
  );
};
class Re {
  constructor(t, r, n, a) {
    a === void 0 && (a = !1),
      (this.status = t),
      (this.statusText = r || ""),
      (this.internal = a),
      n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n);
  }
}
function He(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const Dn = ["POST", "PUT", "PATCH", "DELETE"],
  zo = new Set(Dn),
  Ho = ["GET", ...Dn],
  Vo = new Set(Ho),
  Wo = new Set([301, 302, 303, 307, 308]),
  Ko = new Set([307, 308]),
  Jt = {
    state: "idle",
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Jo = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Ze = {
    state: "unblocked",
    proceed: void 0,
    reset: void 0,
    location: void 0,
  },
  mr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Yo = (e) => ({
    hasErrorBoundary: !!e.hasErrorBoundary,
  }),
  Mn = "remix-router-transitions",
  On = Symbol("ResetLoaderData");
function Wl(e) {
  const t = e.window ? e.window : typeof window < "u" ? window : void 0,
    r = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u";
  e.routes.length > 0 || U();
  let n = e.mapRouteProperties || Yo,
    a = {},
    o = kt(e.routes, n, void 0, a),
    i,
    l = e.basename || "/",
    s = e.dataStrategy || ti,
    u = e.patchRoutesOnNavigation,
    c = _({}, e.future),
    h = null,
    v = new Set(),
    y = null,
    w = null,
    b = null,
    x = e.hydrationData != null,
    R = Ee(o, e.history.location, l),
    S = null;
  if (R == null && !u) {
    let f = ae(404, {
        pathname: e.history.location.pathname,
      }),
      { matches: m, route: g } = qr(o);
    (R = m),
      (S = {
        [g.id]: f,
      });
  }
  R && !e.hydrationData && pt(R, o, e.history.location.pathname).active && (R = null);
  let D;
  if (R)
    if (R.some((f) => f.route.lazy)) D = !1;
    else if (!R.some((f) => f.route.loader)) D = !0;
    else {
      let f = e.hydrationData ? e.hydrationData.loaderData : null,
        m = e.hydrationData ? e.hydrationData.errors : null,
        g = (E) =>
          E.route.loader
            ? typeof E.route.loader == "function" && E.route.loader.hydrate === !0
              ? !1
              : (f && f[E.route.id] !== void 0) || (m && m[E.route.id] !== void 0)
            : !0;
      if (m) {
        let E = R.findIndex((C) => m[C.route.id] !== void 0);
        D = R.slice(0, E + 1).every(g);
      } else D = R.every(g);
    }
  else {
    (D = !1), (R = []);
    let f = pt(null, o, e.history.location.pathname);
    f.active && f.matches && (R = f.matches);
  }
  let L,
    p = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: R,
      initialized: D,
      navigation: Jt,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || S,
      fetchers: new Map(),
      blockers: new Map(),
    },
    O = q.Pop,
    j = !1,
    F,
    W = !1,
    B = new Map(),
    Z = null,
    ne = !1,
    pe = !1,
    ct = new Set(),
    ee = new Map(),
    dt = 0,
    Ke = -1,
    Ne = new Map(),
    ve = new Set(),
    Ie = new Map(),
    Je = new Map(),
    ye = new Set(),
    Ae = new Map(),
    ia = new Map(),
    ft,
    Ye = null;
  function la() {
    if (
      ((h = e.history.listen((f) => {
        let { action: m, location: g, delta: E } = f;
        if (ft) {
          ft(), (ft = void 0);
          return;
        }
        let C = _r({
          currentLocation: p.location,
          nextLocation: g,
          historyAction: m,
        });
        if (C && E != null) {
          let k = new Promise((N) => {
            ft = N;
          });
          e.history.go(E * -1),
            ht(C, {
              state: "blocked",
              location: g,
              proceed() {
                ht(C, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: g,
                }),
                  k.then(() => e.history.go(E));
              },
              reset() {
                let N = new Map(p.blockers);
                N.set(C, Ze),
                  te({
                    blockers: N,
                  });
              },
            });
          return;
        }
        return De(m, g);
      })),
      r)
    ) {
      hi(t, B);
      let f = () => mi(t, B);
      t.addEventListener("pagehide", f), (Z = () => t.removeEventListener("pagehide", f));
    }
    return (
      p.initialized ||
        De(q.Pop, p.location, {
          initialHydration: !0,
        }),
      L
    );
  }
  function sa() {
    h && h(), Z && Z(), v.clear(), F && F.abort(), p.fetchers.forEach((f, m) => zt(m)), p.blockers.forEach((f, m) => kr(m));
  }
  function ua(f) {
    return v.add(f), () => v.delete(f);
  }
  function te(f, m) {
    m === void 0 && (m = {}), (p = _({}, p, f));
    let g = [],
      E = [];
    p.fetchers.forEach((C, k) => {
      C.state === "idle" && (ye.has(k) ? g.push(k) : E.push(k));
    }),
      [...v].forEach((C) =>
        C(p, {
          deletedFetchers: g,
          viewTransitionOpts: m.viewTransitionOpts,
          flushSync: m.flushSync === !0,
        })
      ),
      g.forEach((C) => zt(C)),
      E.forEach((C) => p.fetchers.delete(C));
  }
  function je(f, m, g) {
    var E, C, k;
    let { flushSync: N } = g === void 0 ? {} : g,
      M =
        p.actionData != null &&
        p.navigation.formMethod != null &&
        ue(p.navigation.formMethod) &&
        p.navigation.state === "loading" &&
        ((E = f.state) == null ? void 0 : E._isRedirect) !== !0,
      T;
    m.actionData ? (Object.keys(m.actionData).length > 0 ? (T = m.actionData) : (T = null)) : M ? (T = p.actionData) : (T = null);
    let P = m.loaderData ? Xr(p.loaderData, m.loaderData, m.matches || [], m.errors) : p.loaderData,
      I = p.blockers;
    I.size > 0 && ((I = new Map(I)), I.forEach((K, Y) => I.set(Y, Ze)));
    let $ =
      j === !0 ||
      (p.navigation.formMethod != null && ue(p.navigation.formMethod) && ((C = f.state) == null ? void 0 : C._isRedirect) !== !0);
    i && ((o = i), (i = void 0)),
      ne || O === q.Pop || (O === q.Push ? e.history.push(f, f.state) : O === q.Replace && e.history.replace(f, f.state));
    let V;
    if (O === q.Pop) {
      let K = B.get(p.location.pathname);
      K && K.has(f.pathname)
        ? (V = {
            currentLocation: p.location,
            nextLocation: f,
          })
        : B.has(f.pathname) &&
          (V = {
            currentLocation: f,
            nextLocation: p.location,
          });
    } else if (W) {
      let K = B.get(p.location.pathname);
      K ? K.add(f.pathname) : ((K = new Set([f.pathname])), B.set(p.location.pathname, K)),
        (V = {
          currentLocation: p.location,
          nextLocation: f,
        });
    }
    te(
      _({}, m, {
        actionData: T,
        loaderData: P,
        historyAction: O,
        location: f,
        initialized: !0,
        navigation: Jt,
        revalidation: "idle",
        restoreScrollPosition: Nr(f, m.matches || p.matches),
        preventScrollReset: $,
        blockers: I,
      }),
      {
        viewTransitionOpts: V,
        flushSync: N === !0,
      }
    ),
      (O = q.Pop),
      (j = !1),
      (W = !1),
      (ne = !1),
      (pe = !1),
      (k = Ye) == null || k.resolve(),
      (Ye = null);
  }
  async function Lr(f, m) {
    if (typeof f == "number") {
      e.history.go(f);
      return;
    }
    let g = Zt(p.location, p.matches, l, f, m == null ? void 0 : m.fromRouteId, m == null ? void 0 : m.relative),
      { path: E, submission: C, error: k } = Vr(!1, g, m),
      N = p.location,
      M = nt(p.location, E, m && m.state);
    M = _({}, M, e.history.encodeLocation(M));
    let T = m && m.replace != null ? m.replace : void 0,
      P = q.Push;
    T === !0
      ? (P = q.Replace)
      : T === !1 || (C != null && ue(C.formMethod) && C.formAction === p.location.pathname + p.location.search && (P = q.Replace));
    let I = m && "preventScrollReset" in m ? m.preventScrollReset === !0 : void 0,
      $ = (m && m.flushSync) === !0,
      V = _r({
        currentLocation: N,
        nextLocation: M,
        historyAction: P,
      });
    if (V) {
      ht(V, {
        state: "blocked",
        location: M,
        proceed() {
          ht(V, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: M,
          }),
            Lr(f, m);
        },
        reset() {
          let K = new Map(p.blockers);
          K.set(V, Ze),
            te({
              blockers: K,
            });
        },
      });
      return;
    }
    await De(P, M, {
      submission: C,
      pendingError: k,
      preventScrollReset: I,
      replace: m && m.replace,
      enableViewTransition: m && m.viewTransition,
      flushSync: $,
    });
  }
  function ca() {
    Ye || (Ye = pi()),
      $t(),
      te({
        revalidation: "loading",
      });
    let f = Ye.promise;
    return p.navigation.state === "submitting"
      ? f
      : p.navigation.state === "idle"
      ? (De(p.historyAction, p.location, {
          startUninterruptedRevalidation: !0,
        }),
        f)
      : (De(O || p.historyAction, p.navigation.location, {
          overrideNavigation: p.navigation,
          enableViewTransition: W === !0,
        }),
        f);
  }
  async function De(f, m, g) {
    F && F.abort(),
      (F = null),
      (O = f),
      (ne = (g && g.startUninterruptedRevalidation) === !0),
      Ea(p.location, p.matches),
      (j = (g && g.preventScrollReset) === !0),
      (W = (g && g.enableViewTransition) === !0);
    let E = i || o,
      C = g && g.overrideNavigation,
      k = Ee(E, m, l),
      N = (g && g.flushSync) === !0,
      M = pt(k, E, m.pathname);
    if ((M.active && M.matches && (k = M.matches), !k)) {
      let { error: Y, notFoundMatches: z, route: J } = Ht(m.pathname);
      je(
        m,
        {
          matches: z,
          loaderData: {},
          errors: {
            [J.id]: Y,
          },
        },
        {
          flushSync: N,
        }
      );
      return;
    }
    if (p.initialized && !pe && li(p.location, m) && !(g && g.submission && ue(g.submission.formMethod))) {
      je(
        m,
        {
          matches: k,
        },
        {
          flushSync: N,
        }
      );
      return;
    }
    F = new AbortController();
    let T = Be(e.history, m, F.signal, g && g.submission),
      P;
    if (g && g.pendingError)
      P = [
        $e(k).route.id,
        {
          type: G.error,
          error: g.pendingError,
        },
      ];
    else if (g && g.submission && ue(g.submission.formMethod)) {
      let Y = await da(T, m, g.submission, k, M.active, {
        replace: g.replace,
        flushSync: N,
      });
      if (Y.shortCircuited) return;
      if (Y.pendingActionResult) {
        let [z, J] = Y.pendingActionResult;
        if (oe(J) && He(J.error) && J.error.status === 404) {
          (F = null),
            je(m, {
              matches: Y.matches,
              loaderData: {},
              errors: {
                [z]: J.error,
              },
            });
          return;
        }
      }
      (k = Y.matches || k),
        (P = Y.pendingActionResult),
        (C = Yt(m, g.submission)),
        (N = !1),
        (M.active = !1),
        (T = Be(e.history, T.url, T.signal));
    }
    let {
      shortCircuited: I,
      matches: $,
      loaderData: V,
      errors: K,
    } = await fa(T, m, k, M.active, C, g && g.submission, g && g.fetcherSubmission, g && g.replace, g && g.initialHydration === !0, N, P);
    I ||
      ((F = null),
      je(
        m,
        _(
          {
            matches: $ || k,
          },
          Qr(P),
          {
            loaderData: V,
            errors: K,
          }
        )
      ));
  }
  async function da(f, m, g, E, C, k) {
    k === void 0 && (k = {}), $t();
    let N = di(m, g);
    if (
      (te(
        {
          navigation: N,
        },
        {
          flushSync: k.flushSync === !0,
        }
      ),
      C)
    ) {
      let P = await vt(E, m.pathname, f.signal);
      if (P.type === "aborted")
        return {
          shortCircuited: !0,
        };
      if (P.type === "error") {
        let { boundaryId: I, error: $ } = mt(m.pathname, P);
        return {
          matches: P.partialMatches,
          pendingActionResult: [
            I,
            {
              type: G.error,
              error: $,
            },
          ],
        };
      } else if (P.matches) E = P.matches;
      else {
        let { notFoundMatches: I, error: $, route: V } = Ht(m.pathname);
        return {
          matches: I,
          pendingActionResult: [
            V.id,
            {
              type: G.error,
              error: $,
            },
          ],
        };
      }
    }
    let M,
      T = rt(E, m);
    if (!T.route.action && !T.route.lazy)
      M = {
        type: G.error,
        error: ae(405, {
          method: f.method,
          pathname: m.pathname,
          routeId: T.route.id,
        }),
      };
    else if (((M = (await Ge("action", p, f, [T], E, null))[T.route.id]), f.signal.aborted))
      return {
        shortCircuited: !0,
      };
    if (ke(M)) {
      let P;
      return (
        k && k.replace != null
          ? (P = k.replace)
          : (P = Jr(M.response.headers.get("Location"), new URL(f.url), l) === p.location.pathname + p.location.search),
        await Me(f, M, !0, {
          submission: g,
          replace: P,
        }),
        {
          shortCircuited: !0,
        }
      );
    }
    if (oe(M)) {
      let P = $e(E, T.route.id);
      return (
        (k && k.replace) !== !0 && (O = q.Push),
        {
          matches: E,
          pendingActionResult: [P.route.id, M],
        }
      );
    }
    return {
      matches: E,
      pendingActionResult: [T.route.id, M],
    };
  }
  async function fa(f, m, g, E, C, k, N, M, T, P, I) {
    let $ = C || Yt(m, k),
      V = k || N || en($),
      K = !ne && !T;
    if (E) {
      if (K) {
        let X = Pr(I);
        te(
          _(
            {
              navigation: $,
            },
            X !== void 0
              ? {
                  actionData: X,
                }
              : {}
          ),
          {
            flushSync: P,
          }
        );
      }
      let H = await vt(g, m.pathname, f.signal);
      if (H.type === "aborted")
        return {
          shortCircuited: !0,
        };
      if (H.type === "error") {
        let { boundaryId: X, error: he } = mt(m.pathname, H);
        return {
          matches: H.partialMatches,
          loaderData: {},
          errors: {
            [X]: he,
          },
        };
      } else if (H.matches) g = H.matches;
      else {
        let { error: X, notFoundMatches: he, route: qe } = Ht(m.pathname);
        return {
          matches: he,
          loaderData: {},
          errors: {
            [qe.id]: X,
          },
        };
      }
    }
    let Y = i || o,
      [z, J] = Wr(e.history, p, g, V, m, T === !0, pe, ct, ye, Ie, ve, Y, l, I);
    if (((Ke = ++dt), z.length === 0 && J.length === 0)) {
      let H = Mr();
      return (
        je(
          m,
          _(
            {
              matches: g,
              loaderData: {},
              errors:
                I && oe(I[1])
                  ? {
                      [I[0]]: I[1].error,
                    }
                  : null,
            },
            Qr(I),
            H
              ? {
                  fetchers: new Map(p.fetchers),
                }
              : {}
          ),
          {
            flushSync: P,
          }
        ),
        {
          shortCircuited: !0,
        }
      );
    }
    if (K) {
      let H = {};
      if (!E) {
        H.navigation = $;
        let X = Pr(I);
        X !== void 0 && (H.actionData = X);
      }
      J.length > 0 && (H.fetchers = ha(J)),
        te(H, {
          flushSync: P,
        });
    }
    J.forEach((H) => {
      Le(H.key), H.controller && ee.set(H.key, H.controller);
    });
    let Ue = () => J.forEach((H) => Le(H.key));
    F && F.signal.addEventListener("abort", Ue);
    let { loaderResults: Xe, fetcherResults: we } = await Cr(p, g, z, J, f);
    if (f.signal.aborted)
      return {
        shortCircuited: !0,
      };
    F && F.signal.removeEventListener("abort", Ue), J.forEach((H) => ee.delete(H.key));
    let fe = St(Xe);
    if (fe)
      return (
        await Me(f, fe.result, !0, {
          replace: M,
        }),
        {
          shortCircuited: !0,
        }
      );
    if (((fe = St(we)), fe))
      return (
        ve.add(fe.key),
        await Me(f, fe.result, !0, {
          replace: M,
        }),
        {
          shortCircuited: !0,
        }
      );
    let { loaderData: Vt, errors: Qe } = Gr(p, g, Xe, I, J, we);
    T &&
      p.errors &&
      Object.entries(p.errors)
        .filter((H) => {
          let [X] = H;
          return !z.some((he) => he.route.id === X);
        })
        .forEach((H) => {
          let [X, he] = H;
          Qe = Object.assign(Qe || {}, {
            [X]: he,
          });
        });
    let Oe = Mr(),
      yt = Or(Ke),
      gt = Oe || yt || J.length > 0;
    return _(
      {
        matches: g,
        loaderData: Vt,
        errors: Qe,
      },
      gt
        ? {
            fetchers: new Map(p.fetchers),
          }
        : {}
    );
  }
  function Pr(f) {
    if (f && !oe(f[1]))
      return {
        [f[0]]: f[1].data,
      };
    if (p.actionData) return Object.keys(p.actionData).length === 0 ? null : p.actionData;
  }
  function ha(f) {
    return (
      f.forEach((m) => {
        let g = p.fetchers.get(m.key),
          E = et(void 0, g ? g.data : void 0);
        p.fetchers.set(m.key, E);
      }),
      new Map(p.fetchers)
    );
  }
  async function ma(f, m, g, E) {
    Le(f);
    let C = (E && E.flushSync) === !0,
      k = i || o,
      N = Zt(p.location, p.matches, l, g, m, E == null ? void 0 : E.relative),
      M = Ee(k, N, l),
      T = pt(M, k, N);
    if ((T.active && T.matches && (M = T.matches), !M)) {
      ge(
        f,
        m,
        ae(404, {
          pathname: N,
        }),
        {
          flushSync: C,
        }
      );
      return;
    }
    let { path: P, submission: I, error: $ } = Vr(!0, N, E);
    if ($) {
      ge(f, m, $, {
        flushSync: C,
      });
      return;
    }
    let V = rt(M, P),
      K = (E && E.preventScrollReset) === !0;
    if (I && ue(I.formMethod)) {
      await pa(f, m, P, V, M, T.active, C, K, I);
      return;
    }
    Ie.set(f, {
      routeId: m,
      path: P,
    }),
      await va(f, m, P, V, M, T.active, C, K, I);
  }
  async function pa(f, m, g, E, C, k, N, M, T) {
    $t(), Ie.delete(f);
    function P(Q) {
      if (!Q.route.action && !Q.route.lazy) {
        let Pe = ae(405, {
          method: T.formMethod,
          pathname: g,
          routeId: m,
        });
        return (
          ge(f, m, Pe, {
            flushSync: N,
          }),
          !0
        );
      }
      return !1;
    }
    if (!k && P(E)) return;
    let I = p.fetchers.get(f);
    xe(f, fi(T, I), {
      flushSync: N,
    });
    let $ = new AbortController(),
      V = Be(e.history, g, $.signal, T);
    if (k) {
      let Q = await vt(C, g, V.signal);
      if (Q.type === "aborted") return;
      if (Q.type === "error") {
        let { error: Pe } = mt(g, Q);
        ge(f, m, Pe, {
          flushSync: N,
        });
        return;
      } else if (Q.matches) {
        if (((C = Q.matches), (E = rt(C, g)), P(E))) return;
      } else {
        ge(
          f,
          m,
          ae(404, {
            pathname: g,
          }),
          {
            flushSync: N,
          }
        );
        return;
      }
    }
    ee.set(f, $);
    let K = dt,
      z = (await Ge("action", p, V, [E], C, f))[E.route.id];
    if (V.signal.aborted) {
      ee.get(f) === $ && ee.delete(f);
      return;
    }
    if (ye.has(f)) {
      if (ke(z) || oe(z)) {
        xe(f, Ce(void 0));
        return;
      }
    } else {
      if (ke(z))
        if ((ee.delete(f), Ke > K)) {
          xe(f, Ce(void 0));
          return;
        } else
          return (
            ve.add(f),
            xe(f, et(T)),
            Me(V, z, !1, {
              fetcherSubmission: T,
              preventScrollReset: M,
            })
          );
      if (oe(z)) {
        ge(f, m, z.error);
        return;
      }
    }
    let J = p.navigation.location || p.location,
      Ue = Be(e.history, J, $.signal),
      Xe = i || o,
      we = p.navigation.state !== "idle" ? Ee(Xe, p.navigation.location, l) : p.matches;
    we || U();
    let fe = ++dt;
    Ne.set(f, fe);
    let Vt = et(T, z.data);
    p.fetchers.set(f, Vt);
    let [Qe, Oe] = Wr(e.history, p, we, T, J, !1, pe, ct, ye, Ie, ve, Xe, l, [E.route.id, z]);
    Oe.filter((Q) => Q.key !== f).forEach((Q) => {
      let Pe = Q.key,
        Ir = p.fetchers.get(Pe),
        ba = et(void 0, Ir ? Ir.data : void 0);
      p.fetchers.set(Pe, ba), Le(Pe), Q.controller && ee.set(Pe, Q.controller);
    }),
      te({
        fetchers: new Map(p.fetchers),
      });
    let yt = () => Oe.forEach((Q) => Le(Q.key));
    $.signal.addEventListener("abort", yt);
    let { loaderResults: gt, fetcherResults: H } = await Cr(p, we, Qe, Oe, Ue);
    if ($.signal.aborted) return;
    $.signal.removeEventListener("abort", yt), Ne.delete(f), ee.delete(f), Oe.forEach((Q) => ee.delete(Q.key));
    let X = St(gt);
    if (X)
      return Me(Ue, X.result, !1, {
        preventScrollReset: M,
      });
    if (((X = St(H)), X))
      return (
        ve.add(X.key),
        Me(Ue, X.result, !1, {
          preventScrollReset: M,
        })
      );
    let { loaderData: he, errors: qe } = Gr(p, we, gt, void 0, Oe, H);
    if (p.fetchers.has(f)) {
      let Q = Ce(z.data);
      p.fetchers.set(f, Q);
    }
    Or(fe),
      p.navigation.state === "loading" && fe > Ke
        ? (O || U(),
          F && F.abort(),
          je(p.navigation.location, {
            matches: we,
            loaderData: he,
            errors: qe,
            fetchers: new Map(p.fetchers),
          }))
        : (te({
            errors: qe,
            loaderData: Xr(p.loaderData, he, we, qe),
            fetchers: new Map(p.fetchers),
          }),
          (pe = !1));
  }
  async function va(f, m, g, E, C, k, N, M, T) {
    let P = p.fetchers.get(f);
    xe(f, et(T, P ? P.data : void 0), {
      flushSync: N,
    });
    let I = new AbortController(),
      $ = Be(e.history, g, I.signal);
    if (k) {
      let z = await vt(C, g, $.signal);
      if (z.type === "aborted") return;
      if (z.type === "error") {
        let { error: J } = mt(g, z);
        ge(f, m, J, {
          flushSync: N,
        });
        return;
      } else if (z.matches) (C = z.matches), (E = rt(C, g));
      else {
        ge(
          f,
          m,
          ae(404, {
            pathname: g,
          }),
          {
            flushSync: N,
          }
        );
        return;
      }
    }
    ee.set(f, I);
    let V = dt,
      Y = (await Ge("loader", p, $, [E], C, f))[E.route.id];
    if ((ee.get(f) === I && ee.delete(f), !$.signal.aborted)) {
      if (ye.has(f)) {
        xe(f, Ce(void 0));
        return;
      }
      if (ke(Y))
        if (Ke > V) {
          xe(f, Ce(void 0));
          return;
        } else {
          ve.add(f),
            await Me($, Y, !1, {
              preventScrollReset: M,
            });
          return;
        }
      if (oe(Y)) {
        ge(f, m, Y.error);
        return;
      }
      xe(f, Ce(Y.data));
    }
  }
  async function Me(f, m, g, E) {
    let { submission: C, fetcherSubmission: k, preventScrollReset: N, replace: M } = E === void 0 ? {} : E;
    m.response.headers.has("X-Remix-Revalidate") && (pe = !0);
    let T = m.response.headers.get("Location");
    T || U(), (T = Jr(T, new URL(f.url), l));
    let P = nt(p.location, T, {
      _isRedirect: !0,
    });
    if (r) {
      let z = !1;
      if (m.response.headers.has("X-Remix-Reload-Document")) z = !0;
      else if (mr.test(T)) {
        const J = e.history.createURL(T);
        z = J.origin !== t.location.origin || ie(J.pathname, l) == null;
      }
      if (z) {
        M ? t.location.replace(T) : t.location.assign(T);
        return;
      }
    }
    F = null;
    let I = M === !0 || m.response.headers.has("X-Remix-Replace") ? q.Replace : q.Push,
      { formMethod: $, formAction: V, formEncType: K } = p.navigation;
    !C && !k && $ && V && K && (C = en(p.navigation));
    let Y = C || k;
    if (Ko.has(m.response.status) && Y && ue(Y.formMethod))
      await De(I, P, {
        submission: _({}, Y, {
          formAction: T,
        }),
        preventScrollReset: N || j,
        enableViewTransition: g ? W : void 0,
      });
    else {
      let z = Yt(P, C);
      await De(I, P, {
        overrideNavigation: z,
        fetcherSubmission: k,
        preventScrollReset: N || j,
        enableViewTransition: g ? W : void 0,
      });
    }
  }
  async function Ge(f, m, g, E, C, k) {
    let N,
      M = {};
    try {
      N = await ri(s, f, m, g, E, C, k, a, n);
    } catch (T) {
      return (
        E.forEach((P) => {
          M[P.route.id] = {
            type: G.error,
            error: T,
          };
        }),
        M
      );
    }
    for (let [T, P] of Object.entries(N))
      if (ui(P)) {
        let I = P.result;
        M[T] = {
          type: G.redirect,
          response: oi(I, g, T, C, l),
        };
      } else M[T] = await ai(P);
    return M;
  }
  async function Cr(f, m, g, E, C) {
    f.matches;
    let k = Ge("loader", f, C, g, m, null),
      N = Promise.all(
        E.map(async (P) => {
          if (P.matches && P.match && P.controller) {
            let $ = (await Ge("loader", f, Be(e.history, P.path, P.controller.signal), [P.match], P.matches, P.key))[P.match.route.id];
            return {
              [P.key]: $,
            };
          } else
            return Promise.resolve({
              [P.key]: {
                type: G.error,
                error: ae(404, {
                  pathname: P.path,
                }),
              },
            });
        })
      ),
      M = await k,
      T = (await N).reduce((P, I) => Object.assign(P, I), {});
    return {
      loaderResults: M,
      fetcherResults: T,
    };
  }
  function $t() {
    (pe = !0),
      Ie.forEach((f, m) => {
        ee.has(m) && ct.add(m), Le(m);
      });
  }
  function xe(f, m, g) {
    g === void 0 && (g = {}),
      p.fetchers.set(f, m),
      te(
        {
          fetchers: new Map(p.fetchers),
        },
        {
          flushSync: (g && g.flushSync) === !0,
        }
      );
  }
  function ge(f, m, g, E) {
    E === void 0 && (E = {});
    let C = $e(p.matches, m);
    zt(f),
      te(
        {
          errors: {
            [C.route.id]: g,
          },
          fetchers: new Map(p.fetchers),
        },
        {
          flushSync: (E && E.flushSync) === !0,
        }
      );
  }
  function Tr(f) {
    return Je.set(f, (Je.get(f) || 0) + 1), ye.has(f) && ye.delete(f), p.fetchers.get(f) || Jo;
  }
  function zt(f) {
    let m = p.fetchers.get(f);
    ee.has(f) && !(m && m.state === "loading" && Ne.has(f)) && Le(f),
      Ie.delete(f),
      Ne.delete(f),
      ve.delete(f),
      ye.delete(f),
      ct.delete(f),
      p.fetchers.delete(f);
  }
  function ya(f) {
    let m = (Je.get(f) || 0) - 1;
    m <= 0 ? (Je.delete(f), ye.add(f)) : Je.set(f, m),
      te({
        fetchers: new Map(p.fetchers),
      });
  }
  function Le(f) {
    let m = ee.get(f);
    m && (m.abort(), ee.delete(f));
  }
  function Dr(f) {
    for (let m of f) {
      let g = Tr(m),
        E = Ce(g.data);
      p.fetchers.set(m, E);
    }
  }
  function Mr() {
    let f = [],
      m = !1;
    for (let g of ve) {
      let E = p.fetchers.get(g);
      E || U(), E.state === "loading" && (ve.delete(g), f.push(g), (m = !0));
    }
    return Dr(f), m;
  }
  function Or(f) {
    let m = [];
    for (let [g, E] of Ne)
      if (E < f) {
        let C = p.fetchers.get(g);
        C || U(), C.state === "loading" && (Le(g), Ne.delete(g), m.push(g));
      }
    return Dr(m), m.length > 0;
  }
  function ga(f, m) {
    let g = p.blockers.get(f) || Ze;
    return Ae.get(f) !== m && Ae.set(f, m), g;
  }
  function kr(f) {
    p.blockers.delete(f), Ae.delete(f);
  }
  function ht(f, m) {
    let g = p.blockers.get(f) || Ze;
    (g.state === "unblocked" && m.state === "blocked") ||
      (g.state === "blocked" && m.state === "blocked") ||
      (g.state === "blocked" && m.state === "proceeding") ||
      (g.state === "blocked" && m.state === "unblocked") ||
      (g.state === "proceeding" && m.state === "unblocked") ||
      U();
    let E = new Map(p.blockers);
    E.set(f, m),
      te({
        blockers: E,
      });
  }
  function _r(f) {
    let { currentLocation: m, nextLocation: g, historyAction: E } = f;
    if (Ae.size === 0) return;
    Ae.size > 1;
    let C = Array.from(Ae.entries()),
      [k, N] = C[C.length - 1],
      M = p.blockers.get(k);
    if (
      !(M && M.state === "proceeding") &&
      N({
        currentLocation: m,
        nextLocation: g,
        historyAction: E,
      })
    )
      return k;
  }
  function Ht(f) {
    let m = ae(404, {
        pathname: f,
      }),
      g = i || o,
      { matches: E, route: C } = qr(g);
    return {
      notFoundMatches: E,
      route: C,
      error: m,
    };
  }
  function mt(f, m) {
    return {
      boundaryId: $e(m.partialMatches).route.id,
      error: ae(400, {
        type: "route-discovery",
        pathname: f,
        message: m.error != null && "message" in m.error ? m.error : String(m.error),
      }),
    };
  }
  function wa(f, m, g) {
    if (((y = f), (b = m), (w = g || null), !x && p.navigation === Jt)) {
      x = !0;
      let E = Nr(p.location, p.matches);
      E != null &&
        te({
          restoreScrollPosition: E,
        });
    }
    return () => {
      (y = null), (b = null), (w = null);
    };
  }
  function Fr(f, m) {
    return (
      (w &&
        w(
          f,
          m.map((E) => Ln(E, p.loaderData))
        )) ||
      f.key
    );
  }
  function Ea(f, m) {
    if (y && b) {
      let g = Fr(f, m);
      y[g] = b();
    }
  }
  function Nr(f, m) {
    if (y) {
      let g = Fr(f, m),
        E = y[g];
      if (typeof E == "number") return E;
    }
    return null;
  }
  function pt(f, m, g) {
    if (u)
      if (f) {
        if (Object.keys(f[0].params).length > 0)
          return {
            active: !0,
            matches: Tt(m, g, l, !0),
          };
      } else
        return {
          active: !0,
          matches: Tt(m, g, l, !0) || [],
        };
    return {
      active: !1,
      matches: null,
    };
  }
  async function vt(f, m, g) {
    let E = f;
    for (;;) {
      let C = i == null,
        k = i || o;
      try {
        await Zo(u, m, E, k, a, n, ia, g);
      } catch (T) {
        return {
          type: "error",
          error: T,
          partialMatches: E,
        };
      } finally {
        C && (o = [...o]);
      }
      if (g.aborted)
        return {
          type: "aborted",
        };
      let N = Ee(k, m, l);
      if (N)
        return {
          type: "success",
          matches: N,
        };
      let M = Tt(k, m, l, !0);
      if (!M || (E.length === M.length && E.every((T, P) => T.route.id === M[P].route.id)))
        return {
          type: "success",
          matches: null,
        };
      E = M;
    }
  }
  function Sa(f) {
    (a = {}), (i = kt(f, n, void 0, a));
  }
  function Ra(f, m) {
    let g = i == null;
    kn(f, m, i || o, a, n), g && ((o = [...o]), te({}));
  }
  return (
    (L = {
      get basename() {
        return l;
      },
      get future() {
        return c;
      },
      get state() {
        return p;
      },
      get routes() {
        return o;
      },
      get window() {
        return t;
      },
      initialize: la,
      subscribe: ua,
      enableScrollRestoration: wa,
      navigate: Lr,
      fetch: ma,
      revalidate: ca,
      createHref: (f) => e.history.createHref(f),
      encodeLocation: (f) => e.history.encodeLocation(f),
      getFetcher: Tr,
      deleteFetcher: ya,
      dispose: sa,
      getBlocker: ga,
      deleteBlocker: kr,
      patchRoutes: Ra,
      _internalFetchControllers: ee,
      _internalSetRoutes: Sa,
    }),
    L
  );
}
function Go(e) {
  return e != null && (("formData" in e && e.formData != null) || ("body" in e && e.body !== void 0));
}
function Zt(e, t, r, n, a, o) {
  let i, l;
  if (a) {
    i = [];
    for (let u of t)
      if ((i.push(u), u.route.id === a)) {
        l = u;
        break;
      }
  } else (i = t), (l = t[t.length - 1]);
  let s = hr(n || ".", fr(i), ie(e.pathname, r) || e.pathname, o === "path");
  if ((n == null && ((s.search = e.search), (s.hash = e.hash)), (n == null || n === "" || n === ".") && l)) {
    let u = pr(s.search);
    if (l.route.index && !u) s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index";
    else if (!l.route.index && u) {
      let c = new URLSearchParams(s.search),
        h = c.getAll("index");
      c.delete("index"), h.filter((y) => y).forEach((y) => c.append("index", y));
      let v = c.toString();
      s.search = v ? "?" + v : "";
    }
  }
  return r !== "/" && (s.pathname = s.pathname === "/" ? r : me([r, s.pathname])), Te(s);
}
function Vr(e, t, r) {
  if (!r || !Go(r))
    return {
      path: t,
    };
  if (r.formMethod && !ci(r.formMethod))
    return {
      path: t,
      error: ae(405, {
        method: r.formMethod,
      }),
    };
  let n = () => ({
      path: t,
      error: ae(400, {
        type: "invalid-body",
      }),
    }),
    o = (r.formMethod || "get").toUpperCase(),
    i = Fn(t);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!ue(o)) return n();
      let h =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
          ? Array.from(r.body.entries()).reduce((v, y) => {
              let [w, b] = y;
              return (
                "" +
                v +
                w +
                "=" +
                b +
                `
`
              );
            }, "")
          : String(r.body);
      return {
        path: t,
        submission: {
          formMethod: o,
          formAction: i,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: h,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!ue(o)) return n();
      try {
        let h = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: t,
          submission: {
            formMethod: o,
            formAction: i,
            formEncType: r.formEncType,
            formData: void 0,
            json: h,
            text: void 0,
          },
        };
      } catch {
        return n();
      }
    }
  }
  typeof FormData != "function" && U();
  let l, s;
  if (r.formData) (l = er(r.formData)), (s = r.formData);
  else if (r.body instanceof FormData) (l = er(r.body)), (s = r.body);
  else if (r.body instanceof URLSearchParams) (l = r.body), (s = Yr(l));
  else if (r.body == null) (l = new URLSearchParams()), (s = new FormData());
  else
    try {
      (l = new URLSearchParams(r.body)), (s = Yr(l));
    } catch {
      return n();
    }
  let u = {
    formMethod: o,
    formAction: i,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (ue(u.formMethod))
    return {
      path: t,
      submission: u,
    };
  let c = be(t);
  return (
    e && c.search && pr(c.search) && l.append("index", ""),
    (c.search = "?" + l),
    {
      path: Te(c),
      submission: u,
    }
  );
}
function Xo(e, t) {
  let r = e;
  if (t) {
    let n = e.findIndex((a) => a.route.id === t);
    n >= 0 && (r = e.slice(0, n));
  }
  return r;
}
function Wr(e, t, r, n, a, o, i, l, s, u, c, h, v, y) {
  let w = y ? (oe(y[1]) ? y[1].error : y[1].data) : void 0,
    b = e.createURL(t.location),
    x = e.createURL(a),
    R = y && oe(y[1]) ? y[0] : void 0,
    S = R ? Xo(r, R) : r,
    D = y ? y[1].statusCode : void 0,
    L = D && D >= 400,
    p = S.filter((j, F) => {
      let { route: W } = j;
      if (W.lazy) return !0;
      if (W.loader == null) return !1;
      if (o)
        return typeof W.loader != "function" || W.loader.hydrate
          ? !0
          : !t.loaderData.hasOwnProperty(W.id) && (!t.errors || t.errors[W.id] === void 0);
      if (Qo(t.loaderData, t.matches[F], j)) return !0;
      let B = t.matches[F],
        Z = j;
      return Kr(
        j,
        _(
          {
            currentUrl: b,
            currentParams: B.params,
            nextUrl: x,
            nextParams: Z.params,
          },
          n,
          {
            actionResult: w,
            actionStatus: D,
            defaultShouldRevalidate: L ? !1 : i || b.pathname + b.search === x.pathname + x.search || b.search !== x.search || qo(B, Z),
          }
        )
      );
    }),
    O = [];
  return (
    u.forEach((j, F) => {
      if (o || !r.some((pe) => pe.route.id === j.routeId) || s.has(F)) return;
      let W = Ee(h, j.path, v);
      if (!W) {
        O.push({
          key: F,
          routeId: j.routeId,
          path: j.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let B = t.fetchers.get(F),
        Z = rt(W, j.path),
        ne = !1;
      c.has(F)
        ? (ne = !1)
        : l.has(F)
        ? (l.delete(F), (ne = !0))
        : B && B.state !== "idle" && B.data === void 0
        ? (ne = i)
        : (ne = Kr(
            Z,
            _(
              {
                currentUrl: b,
                currentParams: t.matches[t.matches.length - 1].params,
                nextUrl: x,
                nextParams: r[r.length - 1].params,
              },
              n,
              {
                actionResult: w,
                actionStatus: D,
                defaultShouldRevalidate: L ? !1 : i,
              }
            )
          )),
        ne &&
          O.push({
            key: F,
            routeId: j.routeId,
            path: j.path,
            matches: W,
            match: Z,
            controller: new AbortController(),
          });
    }),
    [p, O]
  );
}
function Qo(e, t, r) {
  let n = !t || r.route.id !== t.route.id,
    a = !e.hasOwnProperty(r.route.id);
  return n || a;
}
function qo(e, t) {
  let r = e.route.path;
  return e.pathname !== t.pathname || (r != null && r.endsWith("*") && e.params["*"] !== t.params["*"]);
}
function Kr(e, t) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(t);
    if (typeof r == "boolean") return r;
  }
  return t.defaultShouldRevalidate;
}
async function Zo(e, t, r, n, a, o, i, l) {
  let s = [t, ...r.map((u) => u.route.id)].join("-");
  try {
    let u = i.get(s);
    u ||
      ((u = e({
        path: t,
        matches: r,
        patch: (c, h) => {
          l.aborted || kn(c, h, n, a, o);
        },
      })),
      i.set(s, u)),
      u && si(u) && (await u);
  } finally {
    i.delete(s);
  }
}
function kn(e, t, r, n, a) {
  var o;
  let i;
  if (e) {
    let u = n[e];
    u || U(), u.children || (u.children = []), (i = u.children);
  } else i = r;
  let l = t.filter((u) => !i.some((c) => _n(u, c))),
    s = kt(l, a, [e || "_", "patch", String(((o = i) == null ? void 0 : o.length) || "0")], n);
  i.push(...s);
}
function _n(e, t) {
  return "id" in e && "id" in t && e.id === t.id
    ? !0
    : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive
    ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0)
      ? !0
      : e.children.every((r, n) => {
          var a;
          return (a = t.children) == null ? void 0 : a.some((o) => _n(r, o));
        })
    : !1;
}
async function ei(e, t, r) {
  if (!e.lazy) return;
  let n = await e.lazy();
  if (!e.lazy) return;
  let a = r[e.id];
  a || U();
  let o = {};
  for (let i in n) !(a[i] !== void 0 && i !== "hasErrorBoundary") && !Eo.has(i) && (o[i] = n[i]);
  Object.assign(a, o),
    Object.assign(
      a,
      _({}, t(a), {
        lazy: void 0,
      })
    );
}
async function ti(e) {
  let { matches: t } = e,
    r = t.filter((a) => a.shouldLoad);
  return (await Promise.all(r.map((a) => a.resolve()))).reduce(
    (a, o, i) =>
      Object.assign(a, {
        [r[i].route.id]: o,
      }),
    {}
  );
}
async function ri(e, t, r, n, a, o, i, l, s, u) {
  let c = o.map((y) => (y.route.lazy ? ei(y.route, s, l) : void 0)),
    h = o.map((y, w) => {
      let b = c[w],
        x = a.some((S) => S.route.id === y.route.id);
      return _({}, y, {
        shouldLoad: x,
        resolve: async (S) => (
          S && n.method === "GET" && (y.route.lazy || y.route.loader) && (x = !0),
          x
            ? ni(t, n, y, b, S, u)
            : Promise.resolve({
                type: G.data,
                result: void 0,
              })
        ),
      });
    }),
    v = await e({
      matches: h,
      request: n,
      params: o[0].params,
      fetcherKey: i,
      context: u,
    });
  try {
    await Promise.all(c);
  } catch {}
  return v;
}
async function ni(e, t, r, n, a, o) {
  let i,
    l,
    s = (u) => {
      let c,
        h = new Promise((w, b) => (c = b));
      (l = () => c()), t.signal.addEventListener("abort", l);
      let v = (w) =>
          typeof u != "function"
            ? Promise.reject(
                new Error(
                  "You cannot call the handler for a route which defines a boolean " + ('"' + e + '" [routeId: ' + r.route.id + "]")
                )
              )
            : u(
                {
                  request: t,
                  params: r.params,
                  context: o,
                },
                ...(w !== void 0 ? [w] : [])
              ),
        y = (async () => {
          try {
            return {
              type: "data",
              result: await (a ? a((b) => v(b)) : v()),
            };
          } catch (w) {
            return {
              type: "error",
              result: w,
            };
          }
        })();
      return Promise.race([y, h]);
    };
  try {
    let u = r.route[e];
    if (n)
      if (u) {
        let c,
          [h] = await Promise.all([
            s(u).catch((v) => {
              c = v;
            }),
            n,
          ]);
        if (c !== void 0) throw c;
        i = h;
      } else if ((await n, (u = r.route[e]), u)) i = await s(u);
      else if (e === "action") {
        let c = new URL(t.url),
          h = c.pathname + c.search;
        throw ae(405, {
          method: t.method,
          pathname: h,
          routeId: r.route.id,
        });
      } else
        return {
          type: G.data,
          result: void 0,
        };
    else if (u) i = await s(u);
    else {
      let c = new URL(t.url),
        h = c.pathname + c.search;
      throw ae(404, {
        pathname: h,
      });
    }
  } catch (u) {
    return {
      type: G.error,
      result: u,
    };
  } finally {
    l && t.signal.removeEventListener("abort", l);
  }
  return i;
}
async function ai(e) {
  let { result: t, type: r } = e;
  if (Nn(t)) {
    let l;
    try {
      let s = t.headers.get("Content-Type");
      s && /\bapplication\/json\b/.test(s) ? (t.body == null ? (l = null) : (l = await t.json())) : (l = await t.text());
    } catch (s) {
      return {
        type: G.error,
        error: s,
      };
    }
    return r === G.error
      ? {
          type: G.error,
          error: new Re(t.status, t.statusText, l),
          statusCode: t.status,
          headers: t.headers,
        }
      : {
          type: G.data,
          data: l,
          statusCode: t.status,
          headers: t.headers,
        };
  }
  if (r === G.error) {
    if (Zr(t)) {
      var n;
      if (t.data instanceof Error) {
        var a;
        return {
          type: G.error,
          error: t.data,
          statusCode: (a = t.init) == null ? void 0 : a.status,
        };
      }
      t = new Re(((n = t.init) == null ? void 0 : n.status) || 500, void 0, t.data);
    }
    return {
      type: G.error,
      error: t,
      statusCode: He(t) ? t.status : void 0,
    };
  }
  if (Zr(t)) {
    var o, i;
    return {
      type: G.data,
      data: t.data,
      statusCode: (o = t.init) == null ? void 0 : o.status,
      headers: (i = t.init) != null && i.headers ? new Headers(t.init.headers) : void 0,
    };
  }
  return {
    type: G.data,
    data: t,
  };
}
function oi(e, t, r, n, a) {
  let o = e.headers.get("Location");
  if ((o || U(), !mr.test(o))) {
    let i = n.slice(0, n.findIndex((l) => l.route.id === r) + 1);
    (o = Zt(new URL(t.url), i, a, o)), e.headers.set("Location", o);
  }
  return e;
}
function Jr(e, t, r) {
  if (mr.test(e)) {
    let n = e,
      a = n.startsWith("//") ? new URL(t.protocol + n) : new URL(n),
      o = ie(a.pathname, r) != null;
    if (a.origin === t.origin && o) return a.pathname + a.search + a.hash;
  }
  return e;
}
function Be(e, t, r, n) {
  let a = e.createURL(Fn(t)).toString(),
    o = {
      signal: r,
    };
  if (n && ue(n.formMethod)) {
    let { formMethod: i, formEncType: l } = n;
    (o.method = i.toUpperCase()),
      l === "application/json"
        ? ((o.headers = new Headers({
            "Content-Type": l,
          })),
          (o.body = JSON.stringify(n.json)))
        : l === "text/plain"
        ? (o.body = n.text)
        : l === "application/x-www-form-urlencoded" && n.formData
        ? (o.body = er(n.formData))
        : (o.body = n.formData);
  }
  return new Request(a, o);
}
function er(e) {
  let t = new URLSearchParams();
  for (let [r, n] of e.entries()) t.append(r, typeof n == "string" ? n : n.name);
  return t;
}
function Yr(e) {
  let t = new FormData();
  for (let [r, n] of e.entries()) t.append(r, n);
  return t;
}
function ii(e, t, r, n, a) {
  n === void 0 && (n = !1), a === void 0 && (a = !1);
  let o = {},
    i = null,
    l,
    s = !1,
    u = {},
    c = r && oe(r[1]) ? r[1].error : void 0;
  return (
    e.forEach((h) => {
      if (!(h.route.id in t)) return;
      let v = h.route.id,
        y = t[v];
      if ((ke(y) && U(), oe(y))) {
        let w = y.error;
        if ((c !== void 0 && ((w = c), (c = void 0)), (i = i || {}), a)) i[v] = w;
        else {
          let b = $e(e, v);
          i[b.route.id] == null && (i[b.route.id] = w);
        }
        n || (o[v] = On), s || ((s = !0), (l = He(y.error) ? y.error.status : 500)), y.headers && (u[v] = y.headers);
      } else (o[v] = y.data), y.statusCode && y.statusCode !== 200 && !s && (l = y.statusCode), y.headers && (u[v] = y.headers);
    }),
    c !== void 0 &&
      r &&
      ((i = {
        [r[0]]: c,
      }),
      (o[r[0]] = void 0)),
    {
      loaderData: o,
      errors: i,
      statusCode: l || 200,
      loaderHeaders: u,
    }
  );
}
function Gr(e, t, r, n, a, o) {
  let { loaderData: i, errors: l } = ii(t, r, n);
  return (
    a.forEach((s) => {
      let { key: u, match: c, controller: h } = s,
        v = o[u];
      if ((v || U(), !(h && h.signal.aborted)))
        if (oe(v)) {
          let y = $e(e.matches, c == null ? void 0 : c.route.id);
          (l && l[y.route.id]) ||
            (l = _({}, l, {
              [y.route.id]: v.error,
            })),
            e.fetchers.delete(u);
        } else if (ke(v)) U();
        else {
          let y = Ce(v.data);
          e.fetchers.set(u, y);
        }
    }),
    {
      loaderData: i,
      errors: l,
    }
  );
}
function Xr(e, t, r, n) {
  let a = Object.entries(t)
    .filter((o) => {
      let [, i] = o;
      return i !== On;
    })
    .reduce((o, i) => {
      let [l, s] = i;
      return (o[l] = s), o;
    }, {});
  for (let o of r) {
    let i = o.route.id;
    if ((!t.hasOwnProperty(i) && e.hasOwnProperty(i) && o.route.loader && (a[i] = e[i]), n && n.hasOwnProperty(i))) break;
  }
  return a;
}
function Qr(e) {
  return e
    ? oe(e[1])
      ? {
          actionData: {},
        }
      : {
          actionData: {
            [e[0]]: e[1].data,
          },
        }
    : {};
}
function $e(e, t) {
  return (t ? e.slice(0, e.findIndex((n) => n.route.id === t) + 1) : [...e]).reverse().find((n) => n.route.hasErrorBoundary === !0) || e[0];
}
function qr(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((r) => r.index || !r.path || r.path === "/") || {
          id: "__shim-error-route__",
        };
  return {
    matches: [
      {
        params: {},
        pathname: "",
        pathnameBase: "",
        route: t,
      },
    ],
    route: t,
  };
}
function ae(e, t) {
  let { pathname: r, routeId: n, method: a, type: o, message: i } = t === void 0 ? {} : t,
    l = "Unknown Server Error",
    s = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((l = "Bad Request"),
        o === "route-discovery"
          ? (s =
              'Unable to match URL "' +
              r +
              '" - the `patchRoutesOnNavigation()` ' +
              (`function threw the following error:
` +
                i))
          : a && r && n
          ? (s =
              "You made a " +
              a +
              ' request to "' +
              r +
              '" but ' +
              ('did not provide a `loader` for route "' + n + '", ') +
              "so there is no way to handle the request.")
          : o === "invalid-body" && (s = "Unable to encode submission body"))
      : e === 403
      ? ((l = "Forbidden"), (s = 'Route "' + n + '" does not match URL "' + r + '"'))
      : e === 404
      ? ((l = "Not Found"), (s = 'No route matches URL "' + r + '"'))
      : e === 405 &&
        ((l = "Method Not Allowed"),
        a && r && n
          ? (s =
              "You made a " +
              a.toUpperCase() +
              ' request to "' +
              r +
              '" but ' +
              ('did not provide an `action` for route "' + n + '", ') +
              "so there is no way to handle the request.")
          : a && (s = 'Invalid request method "' + a.toUpperCase() + '"')),
    new Re(e || 500, l, new Error(s), !0)
  );
}
function St(e) {
  let t = Object.entries(e);
  for (let r = t.length - 1; r >= 0; r--) {
    let [n, a] = t[r];
    if (ke(a))
      return {
        key: n,
        result: a,
      };
  }
}
function Fn(e) {
  let t = typeof e == "string" ? be(e) : e;
  return Te(
    _({}, t, {
      hash: "",
    })
  );
}
function li(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search ? !1 : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? !0 : t.hash !== "";
}
function si(e) {
  return typeof e == "object" && e != null && "then" in e;
}
function ui(e) {
  return Nn(e.result) && Wo.has(e.result.status);
}
function oe(e) {
  return e.type === G.error;
}
function ke(e) {
  return (e && e.type) === G.redirect;
}
function Zr(e) {
  return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit";
}
function Nn(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
function ci(e) {
  return Vo.has(e.toUpperCase());
}
function ue(e) {
  return zo.has(e.toUpperCase());
}
function pr(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function rt(e, t) {
  let r = typeof t == "string" ? be(t).search : t.search;
  if (e[e.length - 1].route.index && pr(r || "")) return e[e.length - 1];
  let n = Tn(e);
  return n[n.length - 1];
}
function en(e) {
  let { formMethod: t, formAction: r, formEncType: n, text: a, formData: o, json: i } = e;
  if (!(!t || !r || !n)) {
    if (a != null)
      return {
        formMethod: t,
        formAction: r,
        formEncType: n,
        formData: void 0,
        json: void 0,
        text: a,
      };
    if (o != null)
      return {
        formMethod: t,
        formAction: r,
        formEncType: n,
        formData: o,
        json: void 0,
        text: void 0,
      };
    if (i !== void 0)
      return {
        formMethod: t,
        formAction: r,
        formEncType: n,
        formData: void 0,
        json: i,
        text: void 0,
      };
  }
}
function Yt(e, t) {
  return t
    ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function di(e, t) {
  return {
    state: "submitting",
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function et(e, t) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function fi(e, t) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function Ce(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function hi(e, t) {
  try {
    let r = e.sessionStorage.getItem(Mn);
    if (r) {
      let n = JSON.parse(r);
      for (let [a, o] of Object.entries(n || {})) o && Array.isArray(o) && t.set(a, new Set(o || []));
    }
  } catch {}
}
function mi(e, t) {
  if (t.size > 0) {
    let r = {};
    for (let [n, a] of t) r[n] = [...a];
    try {
      e.sessionStorage.setItem(Mn, JSON.stringify(r));
    } catch {}
  }
}
function pi() {
  let e,
    t,
    r = new Promise((n, a) => {
      (e = async (o) => {
        n(o);
        try {
          await r;
        } catch {}
      }),
        (t = async (o) => {
          a(o);
          try {
            await r;
          } catch {}
        });
    });
  return {
    promise: r,
    resolve: e,
    reject: t,
  };
}
const Fe = d.createContext(null);
Fe.displayName = "DataRouter";
const Ve = d.createContext(null);
Ve.displayName = "DataRouterState";
const vr = d.createContext({
  isTransitioning: !1,
});
vr.displayName = "ViewTransition";
const In = d.createContext(new Map());
In.displayName = "Fetchers";
const vi = d.createContext(null);
vi.displayName = "Await";
const se = d.createContext(null);
se.displayName = "Navigation";
const It = d.createContext(null);
It.displayName = "Location";
const ce = d.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1,
});
ce.displayName = "Route";
const yr = d.createContext(null);
yr.displayName = "RouteError";
function yi(e, t) {
  let { relative: r } = t === void 0 ? {} : t;
  it() || U();
  let { basename: n, navigator: a } = d.useContext(se),
    {
      hash: o,
      pathname: i,
      search: l,
    } = lt(e, {
      relative: r,
    }),
    s = i;
  return (
    n !== "/" && (s = i === "/" ? n : me([n, i])),
    a.createHref({
      pathname: s,
      search: l,
      hash: o,
    })
  );
}
function it() {
  return d.useContext(It) != null;
}
function de() {
  return it() || U(), d.useContext(It).location;
}
function An(e) {
  d.useContext(se).static || d.useLayoutEffect(e);
}
function jn() {
  let { isDataRoute: e } = d.useContext(ce);
  return e ? Oi() : gi();
}
function gi() {
  it() || U();
  let e = d.useContext(Fe),
    { basename: t, navigator: r } = d.useContext(se),
    { matches: n } = d.useContext(ce),
    { pathname: a } = de(),
    o = JSON.stringify(fr(n)),
    i = d.useRef(!1);
  return (
    An(() => {
      i.current = !0;
    }),
    d.useCallback(
      function (s, u) {
        if ((u === void 0 && (u = {}), !i.current)) return;
        if (typeof s == "number") {
          r.go(s);
          return;
        }
        let c = hr(s, JSON.parse(o), a, u.relative === "path");
        e == null && t !== "/" && (c.pathname = c.pathname === "/" ? t : me([t, c.pathname])),
          (u.replace ? r.replace : r.push)(c, u.state, u);
      },
      [t, r, o, a, e]
    )
  );
}
const wi = d.createContext(null);
function Ei(e) {
  let t = d.useContext(ce).outlet;
  return (
    t &&
    d.createElement(
      wi.Provider,
      {
        value: e,
      },
      t
    )
  );
}
function Kl() {
  let { matches: e } = d.useContext(ce),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function lt(e, t) {
  let { relative: r } = t === void 0 ? {} : t,
    { matches: n } = d.useContext(ce),
    { pathname: a } = de(),
    o = JSON.stringify(fr(n));
  return d.useMemo(() => hr(e, JSON.parse(o), a, r === "path"), [e, o, a, r]);
}
function Si(e, t, r, n) {
  it() || U();
  let { navigator: a } = d.useContext(se),
    { matches: o } = d.useContext(ce),
    i = o[o.length - 1],
    l = i ? i.params : {},
    s = i ? i.pathname : "/",
    u = i ? i.pathnameBase : "/",
    c = i && i.route;
  {
    let R = (c && c.path) || "";
    $n(s, !c || R.endsWith("*"));
  }
  let h = de(),
    v;
  v = h;
  let y = v.pathname || "/",
    w = y;
  if (u !== "/") {
    let R = u.replace(/^\//, "").split("/");
    w = "/" + y.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let b = Ee(e, {
    pathname: w,
  });
  return Pi(
    b &&
      b.map((R) =>
        Object.assign({}, R, {
          params: Object.assign({}, l, R.params),
          pathname: me([u, a.encodeLocation ? a.encodeLocation(R.pathname).pathname : R.pathname]),
          pathnameBase: R.pathnameBase === "/" ? u : me([u, a.encodeLocation ? a.encodeLocation(R.pathnameBase).pathname : R.pathnameBase]),
        })
      ),
    o,
    r
  );
}
function Ri() {
  let e = Bn(),
    t = He(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    n = "rgba(200,200,200, 0.5)",
    a = {
      padding: "0.5rem",
      backgroundColor: n,
    },
    o = {
      padding: "2px 4px",
      backgroundColor: n,
    },
    i = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (i = d.createElement(
      d.Fragment,
      null,
      d.createElement("p", null, "💿 Hey developer 👋"),
      d.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        d.createElement(
          "code",
          {
            style: o,
          },
          "ErrorBoundary"
        ),
        " or",
        " ",
        d.createElement(
          "code",
          {
            style: o,
          },
          "errorElement"
        ),
        " prop on your route."
      )
    )),
    d.createElement(
      d.Fragment,
      null,
      d.createElement("h2", null, "Unexpected Application Error!"),
      d.createElement(
        "h3",
        {
          style: {
            fontStyle: "italic",
          },
        },
        t
      ),
      r
        ? d.createElement(
            "pre",
            {
              style: a,
            },
            r
          )
        : null,
      i
    )
  );
}
const bi = d.createElement(Ri, null);
class xi extends d.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return {
      error: t,
    };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location || (r.revalidation !== "idle" && t.revalidation === "idle")
      ? {
          error: t.error,
          location: t.location,
          revalidation: t.revalidation,
        }
      : {
          error: t.error !== void 0 ? t.error : r.error,
          location: r.location,
          revalidation: t.revalidation || r.revalidation,
        };
  }
  componentDidCatch(t, r) {
    console.error("React Router caught the following error during render", t, r);
  }
  render() {
    return this.state.error !== void 0
      ? d.createElement(
          ce.Provider,
          {
            value: this.props.routeContext,
          },
          d.createElement(yr.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Li(e) {
  let { routeContext: t, match: r, children: n } = e,
    a = d.useContext(Fe);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (r.route.errorElement || r.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = r.route.id),
    d.createElement(
      ce.Provider,
      {
        value: t,
      },
      n
    )
  );
}
function Pi(e, t, r, n) {
  var a;
  if ((t === void 0 && (t = []), r === void 0 && (r = null), e == null)) {
    if (!r) return null;
    if (r.errors) e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0) e = r.matches;
    else return null;
  }
  let o = e,
    i = (a = r) == null ? void 0 : a.errors;
  if (i != null) {
    let u = o.findIndex((c) => c.route.id && (i == null ? void 0 : i[c.route.id]) !== void 0);
    u >= 0 || U(), (o = o.slice(0, Math.min(o.length, u + 1)));
  }
  let l = !1,
    s = -1;
  if (r)
    for (let u = 0; u < o.length; u++) {
      let c = o[u];
      if (((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (s = u), c.route.id)) {
        let { loaderData: h, errors: v } = r,
          y = c.route.loader && !h.hasOwnProperty(c.route.id) && (!v || v[c.route.id] === void 0);
        if (c.route.lazy || y) {
          (l = !0), s >= 0 ? (o = o.slice(0, s + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((u, c, h) => {
    let v,
      y = !1,
      w = null,
      b = null;
    r &&
      ((v = i && c.route.id ? i[c.route.id] : void 0),
      (w = c.route.errorElement || bi),
      l &&
        (s < 0 && h === 0
          ? ($n("route-fallback", !1), (y = !0), (b = null))
          : s === h && ((y = !0), (b = c.route.hydrateFallbackElement || null))));
    let x = t.concat(o.slice(0, h + 1)),
      R = () => {
        let S;
        return (
          v
            ? (S = w)
            : y
            ? (S = b)
            : c.route.Component
            ? (S = d.createElement(c.route.Component, null))
            : c.route.element
            ? (S = c.route.element)
            : (S = u),
          d.createElement(Li, {
            match: c,
            routeContext: {
              outlet: u,
              matches: x,
              isDataRoute: r != null,
            },
            children: S,
          })
        );
      };
    return r && (c.route.ErrorBoundary || c.route.errorElement || h === 0)
      ? d.createElement(xi, {
          location: r.location,
          revalidation: r.revalidation,
          component: w,
          error: v,
          children: R(),
          routeContext: {
            outlet: null,
            matches: x,
            isDataRoute: !0,
          },
        })
      : R();
  }, null);
}
var tr;
(function (e) {
  (e.UseBlocker = "useBlocker"), (e.UseRevalidator = "useRevalidator"), (e.UseNavigateStable = "useNavigate");
})(tr || (tr = {}));
var le;
(function (e) {
  (e.UseBlocker = "useBlocker"),
    (e.UseLoaderData = "useLoaderData"),
    (e.UseActionData = "useActionData"),
    (e.UseRouteError = "useRouteError"),
    (e.UseNavigation = "useNavigation"),
    (e.UseRouteLoaderData = "useRouteLoaderData"),
    (e.UseMatches = "useMatches"),
    (e.UseRevalidator = "useRevalidator"),
    (e.UseNavigateStable = "useNavigate"),
    (e.UseRouteId = "useRouteId");
})(le || (le = {}));
function Ci(e) {
  let t = d.useContext(Fe);
  return t || U(), t;
}
function st(e) {
  let t = d.useContext(Ve);
  return t || U(), t;
}
function Ti(e) {
  let t = d.useContext(ce);
  return t || U(), t;
}
function ut(e) {
  let t = Ti(),
    r = t.matches[t.matches.length - 1];
  return r.route.id || U(), r.route.id;
}
function Di() {
  return ut(le.UseRouteId);
}
function Mi() {
  return st(le.UseNavigation).navigation;
}
function Un() {
  let { matches: e, loaderData: t } = st(le.UseMatches);
  return d.useMemo(() => e.map((r) => Ln(r, t)), [e, t]);
}
function Jl() {
  let e = st(le.UseLoaderData),
    t = ut(le.UseLoaderData);
  return e.loaderData[t];
}
function Yl() {
  let e = st(le.UseActionData),
    t = ut(le.UseLoaderData);
  return e.actionData ? e.actionData[t] : void 0;
}
function Bn() {
  var e;
  let t = d.useContext(yr),
    r = st(le.UseRouteError),
    n = ut(le.UseRouteError);
  return t !== void 0 ? t : (e = r.errors) == null ? void 0 : e[n];
}
function Oi() {
  let { router: e } = Ci(tr.UseNavigateStable),
    t = ut(le.UseNavigateStable),
    r = d.useRef(!1);
  return (
    An(() => {
      r.current = !0;
    }),
    d.useCallback(
      async function (a, o) {
        o === void 0 && (o = {}),
          r.current &&
            (typeof a == "number"
              ? e.navigate(a)
              : await e.navigate(
                  a,
                  _(
                    {
                      fromRouteId: t,
                    },
                    o
                  )
                ));
      },
      [e, t]
    )
  );
}
const tn = {};
function $n(e, t, r) {
  !t && !tn[e] && (tn[e] = !0);
}
const rn = {};
function nn(e, t) {
  !e && !rn[t] && ((rn[t] = !0), console.warn(t));
}
function Gl(e) {
  let t = {
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      (e.element,
      Object.assign(t, {
        element: d.createElement(e.Component),
        Component: void 0,
      })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement,
      Object.assign(t, {
        hydrateFallbackElement: d.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      })),
    e.ErrorBoundary &&
      (e.errorElement,
      Object.assign(t, {
        errorElement: d.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      })),
    t
  );
}
class ki {
  constructor() {
    (this.status = "pending"),
      (this.promise = new Promise((t, r) => {
        (this.resolve = (n) => {
          this.status === "pending" && ((this.status = "resolved"), t(n));
        }),
          (this.reject = (n) => {
            this.status === "pending" && ((this.status = "rejected"), r(n));
          });
      }));
  }
}
function Xl(e) {
  let { router: t, flushSync: r } = e,
    [n, a] = d.useState(t.state),
    [o, i] = d.useState(),
    [l, s] = d.useState({
      isTransitioning: !1,
    }),
    [u, c] = d.useState(),
    [h, v] = d.useState(),
    [y, w] = d.useState(),
    b = d.useRef(new Map()),
    x = d.useCallback(
      (L, p) => {
        let { deletedFetchers: O, flushSync: j, viewTransitionOpts: F } = p;
        O.forEach((B) => b.current.delete(B)),
          L.fetchers.forEach((B, Z) => {
            B.data !== void 0 && b.current.set(Z, B.data);
          }),
          nn(
            j === !1 || r != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          );
        let W = t.window != null && t.window.document != null && typeof t.window.document.startViewTransition == "function";
        if (
          (nn(
            F == null || W,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
          ),
          !F || !W)
        ) {
          r && j ? r(() => a(L)) : d.startTransition(() => a(L));
          return;
        }
        if (r && j) {
          r(() => {
            h && (u && u.resolve(), h.skipTransition()),
              s({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: F.currentLocation,
                nextLocation: F.nextLocation,
              });
          });
          let B = t.window.document.startViewTransition(() => {
            r(() => a(L));
          });
          B.finished.finally(() => {
            r(() => {
              c(void 0),
                v(void 0),
                i(void 0),
                s({
                  isTransitioning: !1,
                });
            });
          }),
            r(() => v(B));
          return;
        }
        h
          ? (u && u.resolve(),
            h.skipTransition(),
            w({
              state: L,
              currentLocation: F.currentLocation,
              nextLocation: F.nextLocation,
            }))
          : (i(L),
            s({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: F.currentLocation,
              nextLocation: F.nextLocation,
            }));
      },
      [t.window, r, h, u]
    );
  d.useLayoutEffect(() => t.subscribe(x), [t, x]),
    d.useEffect(() => {
      l.isTransitioning && !l.flushSync && c(new ki());
    }, [l]),
    d.useEffect(() => {
      if (u && o && t.window) {
        let L = o,
          p = u.promise,
          O = t.window.document.startViewTransition(async () => {
            d.startTransition(() => a(L)), await p;
          });
        O.finished.finally(() => {
          c(void 0),
            v(void 0),
            i(void 0),
            s({
              isTransitioning: !1,
            });
        }),
          v(O);
      }
    }, [o, u, t.window]),
    d.useEffect(() => {
      u && o && n.location.key === o.location.key && u.resolve();
    }, [u, h, n.location, o]),
    d.useEffect(() => {
      !l.isTransitioning &&
        y &&
        (i(y.state),
        s({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: y.currentLocation,
          nextLocation: y.nextLocation,
        }),
        w(void 0));
    }, [l.isTransitioning, y]);
  let R = d.useMemo(
      () => ({
        createHref: t.createHref,
        encodeLocation: t.encodeLocation,
        go: (L) => t.navigate(L),
        push: (L, p, O) =>
          t.navigate(L, {
            state: p,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
        replace: (L, p, O) =>
          t.navigate(L, {
            replace: !0,
            state: p,
            preventScrollReset: O == null ? void 0 : O.preventScrollReset,
          }),
      }),
      [t]
    ),
    S = t.basename || "/",
    D = d.useMemo(
      () => ({
        router: t,
        navigator: R,
        static: !1,
        basename: S,
      }),
      [t, R, S]
    );
  return d.createElement(
    d.Fragment,
    null,
    d.createElement(
      Fe.Provider,
      {
        value: D,
      },
      d.createElement(
        Ve.Provider,
        {
          value: n,
        },
        d.createElement(
          In.Provider,
          {
            value: b.current,
          },
          d.createElement(
            vr.Provider,
            {
              value: l,
            },
            d.createElement(
              zn,
              {
                basename: S,
                location: n.location,
                navigationType: n.historyAction,
                navigator: R,
              },
              d.createElement(_i, {
                routes: t.routes,
                future: t.future,
                state: n,
              })
            )
          )
        )
      )
    ),
    null
  );
}
const _i = d.memo(Fi);
function Fi(e) {
  let { routes: t, future: r, state: n } = e;
  return Si(t, void 0, n);
}
function Ql(e) {
  return Ei(e.context);
}
function zn(e) {
  let { basename: t = "/", children: r = null, location: n, navigationType: a = q.Pop, navigator: o, static: i = !1 } = e;
  it() && U();
  let l = t.replace(/^\/*/, "/"),
    s = d.useMemo(
      () => ({
        basename: l,
        navigator: o,
        static: i,
        future: {},
      }),
      [l, o, i]
    );
  typeof n == "string" && (n = be(n));
  let { pathname: u = "/", search: c = "", hash: h = "", state: v = null, key: y = "default" } = n,
    w = d.useMemo(() => {
      let b = ie(u, l);
      return b == null
        ? null
        : {
            location: {
              pathname: b,
              search: c,
              hash: h,
              state: v,
              key: y,
            },
            navigationType: a,
          };
    }, [l, u, c, h, v, y, a]);
  return w == null
    ? null
    : d.createElement(
        se.Provider,
        {
          value: s,
        },
        d.createElement(It.Provider, {
          children: r,
          value: w,
        })
      );
}
var an;
(function (e) {
  (e[(e.pending = 0)] = "pending"), (e[(e.success = 1)] = "success"), (e[(e.error = 2)] = "error");
})(an || (an = {}));
const Dt = "get",
  Gt = "application/x-www-form-urlencoded";
function At(e) {
  return e != null && typeof e.tagName == "string";
}
function Ni(e) {
  return At(e) && e.tagName.toLowerCase() === "button";
}
function Ii(e) {
  return At(e) && e.tagName.toLowerCase() === "form";
}
function Ai(e) {
  return At(e) && e.tagName.toLowerCase() === "input";
}
function ji(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ui(e, t) {
  return e.button === 0 && (!t || t === "_self") && !ji(e);
}
function rr(e) {
  return (
    e === void 0 && (e = ""),
    new URLSearchParams(
      typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams
        ? e
        : Object.keys(e).reduce((t, r) => {
            let n = e[r];
            return t.concat(Array.isArray(n) ? n.map((a) => [r, a]) : [[r, n]]);
          }, [])
    )
  );
}
function Bi(e, t) {
  let r = rr(e);
  return (
    t &&
      t.forEach((n, a) => {
        r.has(a) ||
          t.getAll(a).forEach((o) => {
            r.append(a, o);
          });
      }),
    r
  );
}
let Rt = null;
function $i() {
  if (Rt === null)
    try {
      new FormData(document.createElement("form"), 0), (Rt = !1);
    } catch {
      Rt = !0;
    }
  return Rt;
}
const zi = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Xt(e) {
  return e != null && !zi.has(e) ? null : e;
}
function Hi(e, t) {
  let r, n, a, o, i;
  if (Ii(e)) {
    let l = e.getAttribute("action");
    (n = l ? ie(l, t) : null), (r = e.getAttribute("method") || Dt), (a = Xt(e.getAttribute("enctype")) || Gt), (o = new FormData(e));
  } else if (Ni(e) || (Ai(e) && (e.type === "submit" || e.type === "image"))) {
    let l = e.form;
    if (l == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let s = e.getAttribute("formaction") || l.getAttribute("action");
    if (
      ((n = s ? ie(s, t) : null),
      (r = e.getAttribute("formmethod") || l.getAttribute("method") || Dt),
      (a = Xt(e.getAttribute("formenctype")) || Xt(l.getAttribute("enctype")) || Gt),
      (o = new FormData(l, e)),
      !$i())
    ) {
      let { name: u, type: c, value: h } = e;
      if (c === "image") {
        let v = u ? u + "." : "";
        o.append(v + "x", "0"), o.append(v + "y", "0");
      } else u && o.append(u, h);
    }
  } else {
    if (At(e)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    (r = Dt), (n = null), (a = Gt), (i = e);
  }
  return (
    o && a === "text/plain" && ((i = o), (o = void 0)),
    {
      action: n,
      method: r.toLowerCase(),
      encType: a,
      formData: o,
      body: i,
    }
  );
}
function Se(e, t) {
  throw new Error(t);
}
async function Hn(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let r = await import(e.module);
    return (t[e.id] = r), r;
  } catch (r) {
    return (
      console.error("Error loading route module `" + e.module + "`, reloading page..."),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Vi(e, t, r) {
  let n = e
      .map((o) => {
        let i = t[o.route.id],
          l = r.routes[o.route.id];
        return [
          l.css
            ? l.css.map((s) => ({
                rel: "stylesheet",
                href: s,
              }))
            : [],
          (i == null || i.links == null ? void 0 : i.links()) || [],
        ];
      })
      .flat(2),
    a = Gi(e, r);
  return Kn(n, a);
}
async function Vn(e, t) {
  if ((!e.css && !t.links) || !qi()) return;
  let r = [];
  if (
    (e.css &&
      r.push(
        ...e.css.map((o) => ({
          rel: "stylesheet",
          href: o,
        }))
      ),
    t.links && r.push(...t.links()),
    r.length === 0)
  )
    return;
  let n = [];
  for (let o of r)
    !gr(o) &&
      o.rel === "stylesheet" &&
      n.push(
        _({}, o, {
          rel: "preload",
          as: "style",
        })
      );
  let a = n.filter(
    (o) => (!o.media || window.matchMedia(o.media).matches) && !document.querySelector('link[rel="stylesheet"][href="' + o.href + '"]')
  );
  await Promise.all(a.map(Wi));
}
async function Wi(e) {
  return new Promise((t) => {
    let r = document.createElement("link");
    Object.assign(r, e);
    function n() {
      document.head.contains(r) && document.head.removeChild(r);
    }
    (r.onload = () => {
      n(), t();
    }),
      (r.onerror = () => {
        n(), t();
      }),
      document.head.appendChild(r);
  });
}
function gr(e) {
  return e != null && typeof e.page == "string";
}
function Ki(e) {
  return e == null
    ? !1
    : e.href == null
    ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string"
    : typeof e.rel == "string" && typeof e.href == "string";
}
async function Ji(e, t, r) {
  let n = await Promise.all(
    e.map(async (a) => {
      let o = await Hn(t.routes[a.route.id], r);
      return o.links ? o.links() : [];
    })
  );
  return Kn(
    n
      .flat(1)
      .filter(Ki)
      .filter((a) => a.rel === "stylesheet" || a.rel === "preload")
      .map((a) =>
        a.rel === "stylesheet"
          ? _({}, a, {
              rel: "prefetch",
              as: "style",
            })
          : _({}, a, {
              rel: "prefetch",
            })
      )
  );
}
function on(e, t, r, n, a, o) {
  let i = Qi(e),
    l = (c, h) => (r[h] ? c.route.id !== r[h].route.id : !0),
    s = (c, h) => {
      var v;
      return (
        r[h].pathname !== c.pathname || (((v = r[h].route.path) == null ? void 0 : v.endsWith("*")) && r[h].params["*"] !== c.params["*"])
      );
    };
  return o === "data" && a.search !== i.search
    ? t.filter((c, h) => {
        if (!n.routes[c.route.id].hasLoader) return !1;
        if (l(c, h) || s(c, h)) return !0;
        if (c.route.shouldRevalidate) {
          var y;
          let w = c.route.shouldRevalidate({
            currentUrl: new URL(a.pathname + a.search + a.hash, window.origin),
            currentParams: ((y = r[0]) == null ? void 0 : y.params) || {},
            nextUrl: new URL(e, window.origin),
            nextParams: c.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof w == "boolean") return w;
        }
        return !0;
      })
    : t.filter((c, h) => {
        let v = n.routes[c.route.id];
        return (o === "assets" || v.hasLoader) && (l(c, h) || s(c, h));
      });
}
function Yi(e, t) {
  return Wn(
    e
      .map((r) => {
        let n = t.routes[r.route.id],
          a = [n.module];
        return n.imports && (a = a.concat(n.imports)), a;
      })
      .flat(1)
  );
}
function Gi(e, t) {
  return Wn(
    e
      .map((r) => {
        let n = t.routes[r.route.id],
          a = [n.module];
        return n.imports && (a = a.concat(n.imports)), a;
      })
      .flat(1)
  );
}
function Wn(e) {
  return [...new Set(e)];
}
function Xi(e) {
  let t = {},
    r = Object.keys(e).sort();
  for (let n of r) t[n] = e[n];
  return t;
}
function Kn(e, t) {
  let r = new Set(),
    n = new Set(t);
  return e.reduce((a, o) => {
    if (t && !gr(o) && o.as === "script" && o.href && n.has(o.href)) return a;
    let l = JSON.stringify(Xi(o));
    return (
      r.has(l) ||
        (r.add(l),
        a.push({
          key: l,
          link: o,
        })),
      a
    );
  }, []);
}
function Qi(e) {
  let t = be(e);
  return t.search === void 0 && (t.search = ""), t;
}
let bt;
function qi() {
  if (bt !== void 0) return bt;
  let e = document.createElement("link");
  return (bt = e.relList.supports("preload")), (e = null), bt;
}
function ln(e) {
  return {
    __html: e,
  };
}
function Zi(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u";
}
async function wr(e) {
  let t = {
    signal: e.signal,
  };
  if (e.method !== "GET") {
    t.method = e.method;
    let r = e.headers.get("Content-Type");
    r && /\bapplication\/json\b/.test(r)
      ? ((t.headers = {
          "Content-Type": r,
        }),
        (t.body = JSON.stringify(await e.json())))
      : r && /\btext\/plain\b/.test(r)
      ? ((t.headers = {
          "Content-Type": r,
        }),
        (t.body = await e.text()))
      : r && /\bapplication\/x-www-form-urlencoded\b/.test(r)
      ? (t.body = new URLSearchParams(await e.text()))
      : (t.body = await e.formData());
  }
  return t;
}
const Jn = Symbol("SingleFetchRedirect");
function ql(e, t, r) {
  return async (n) => {
    let { request: a, matches: o, fetcherKey: i } = n;
    return a.method !== "GET" ? el(a, o) : i ? rl(a, o) : tl(e, t, r(), a, o);
  };
}
async function el(e, t) {
  let r = t.find((o) => o.shouldLoad);
  r || Se();
  let n,
    a = await r.resolve(
      async (o) =>
        await o(async () => {
          let l = jt(e.url),
            s = await wr(e),
            { data: u, status: c } = await Er(l, s);
          return (n = c), nr(u, r.route.id);
        })
    );
  return Zi(a.result) || He(a.result)
    ? {
        [r.route.id]: a,
      }
    : {
        [r.route.id]: {
          type: a.type,
          result: Bo(a.result, n),
        },
      };
}
async function tl(e, t, r, n, a) {
  let o = new Set(),
    i = !1,
    l = a.map(() => sn()),
    s = Promise.all(l.map((w) => w.promise)),
    u = sn(),
    c = Gn(jt(n.url)),
    h = await wr(n),
    v = {},
    y = Promise.all(
      a.map(async (w, b) =>
        w.resolve(async (x) => {
          if ((l[b].resolve(), !w.shouldLoad)) {
            var R;
            if (!r.state.initialized) return;
            if (w.route.id in r.state.loaderData && e.routes[w.route.id].hasLoader && (R = t[w.route.id]) != null && R.shouldRevalidate) {
              i = !0;
              return;
            }
          }
          if (e.routes[w.route.id].hasClientLoader) {
            e.routes[w.route.id].hasLoader && (i = !0);
            try {
              let S = await Yn(x, c, h, w.route.id);
              v[w.route.id] = {
                type: "data",
                result: S,
              };
            } catch (S) {
              v[w.route.id] = {
                type: "error",
                result: S,
              };
            }
            return;
          }
          e.routes[w.route.id].hasLoader && o.add(w.route.id);
          try {
            let S = await x(async () => {
              let D = await u.promise;
              return Xn(D, w.route.id);
            });
            v[w.route.id] = {
              type: "data",
              result: S,
            };
          } catch (S) {
            v[w.route.id] = {
              type: "error",
              result: S,
            };
          }
        })
      )
    );
  if ((await s, (!r.state.initialized || o.size === 0) && !window.__reactRouterHdrActive)) u.resolve({});
  else
    try {
      i &&
        o.size > 0 &&
        c.searchParams.set(
          "_routes",
          a
            .filter((b) => o.has(b.route.id))
            .map((b) => b.route.id)
            .join(",")
        );
      let w = await Er(c, h);
      u.resolve(w.data);
    } catch (w) {
      u.reject(w);
    }
  return await y, v;
}
async function rl(e, t) {
  let r = t.find((a) => a.shouldLoad);
  r || Se();
  let n = await r.resolve(async (a) => {
    let o = Gn(jt(e.url)),
      i = await wr(e);
    return Yn(a, o, i, r.route.id);
  });
  return {
    [r.route.id]: n,
  };
}
function Yn(e, t, r, n) {
  return e(async () => {
    let a = new URL(t);
    a.searchParams.set("_routes", n);
    let { data: o } = await Er(a, r);
    return Xn(o, n);
  });
}
function Gn(e) {
  let t = e.searchParams.getAll("index");
  e.searchParams.delete("index");
  let r = [];
  for (let n of t) n && r.push(n);
  for (let n of r) e.searchParams.append("index", n);
  return e;
}
function jt(e) {
  let t = typeof e == "string" ? new URL(e, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : e;
  return t.pathname === "/" ? (t.pathname = "_root.data") : (t.pathname = t.pathname.replace(/\/$/, "") + ".data"), t;
}
async function Er(e, t) {
  let r = await fetch(e, t);
  if (r.status === 404 && !r.headers.has("X-Remix-Response")) throw new Re(404, "Not Found", !0);
  r.body || Se();
  try {
    let n = await nl(r.body, window);
    return {
      status: r.status,
      data: n.value,
    };
  } catch {
    throw new Error("Unable to decode turbo-stream response");
  }
}
function nl(e, t) {
  return mo(e, {
    plugins: [
      function (r) {
        for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) a[o - 1] = arguments[o];
        if (r === "SanitizedError") {
          let [i, l, s] = a,
            u = Error;
          i && i in t && typeof t[i] == "function" && (u = t[i]);
          let c = new u(l);
          return (
            (c.stack = s),
            {
              value: c,
            }
          );
        }
        if (r === "ErrorResponse") {
          let [i, l, s] = a;
          return {
            value: new Re(l, s, i),
          };
        }
        if (r === "SingleFetchRedirect")
          return {
            value: {
              [Jn]: a[0],
            },
          };
        if (r === "SingleFetchClassInstance")
          return {
            value: a[0],
          };
        if (r === "SingleFetchFallback")
          return {
            value: void 0,
          };
      },
    ],
  });
}
function Xn(e, t) {
  let r = e[Jn];
  return r ? nr(r, t) : e[t] !== void 0 ? nr(e[t], t) : null;
}
function nr(e, t) {
  if ("error" in e) throw e.error;
  if ("redirect" in e) {
    let r = {};
    return (
      e.revalidate && (r["X-Remix-Revalidate"] = "yes"),
      e.reload && (r["X-Remix-Reload-Document"] = "yes"),
      e.replace && (r["X-Remix-Replace"] = "yes"),
      $o(e.redirect, {
        status: e.status,
        headers: r,
      })
    );
  } else {
    if ("data" in e) return e.data;
    throw new Error('No response found for routeId "' + t + '"');
  }
}
function sn() {
  let e,
    t,
    r = new Promise((n, a) => {
      (e = async (o) => {
        n(o);
        try {
          await r;
        } catch {}
      }),
        (t = async (o) => {
          a(o);
          try {
            await r;
          } catch {}
        });
    });
  return {
    promise: r,
    resolve: e,
    reject: t,
  };
}
class Zl extends d.Component {
  constructor(t) {
    super(t),
      (this.state = {
        error: t.error || null,
        location: t.location,
      });
  }
  static getDerivedStateFromError(t) {
    return {
      error: t,
    };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location
      ? {
          error: t.error || null,
          location: t.location,
        }
      : {
          error: t.error || r.error,
          location: r.location,
        };
  }
  render() {
    return this.state.error
      ? d.createElement(Qn, {
          error: this.state.error,
          isOutsideRemixApp: !0,
        })
      : this.props.children;
  }
}
function Qn(e) {
  let { error: t, isOutsideRemixApp: r } = e;
  console.error(t);
  let n = d.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `,
    },
  });
  if (He(t))
    return d.createElement(
      ar,
      {
        title: "Unhandled Thrown Response!",
      },
      d.createElement(
        "h1",
        {
          style: {
            fontSize: "24px",
          },
        },
        t.status,
        " ",
        t.statusText
      ),
      n
    );
  let a;
  if (t instanceof Error) a = t;
  else {
    let o = t == null ? "Unknown Error" : typeof t == "object" && "toString" in t ? t.toString() : JSON.stringify(t);
    a = new Error(o);
  }
  return d.createElement(
    ar,
    {
      title: "Application Error!",
      isOutsideRemixApp: r,
    },
    d.createElement(
      "h1",
      {
        style: {
          fontSize: "24px",
        },
      },
      "Application Error"
    ),
    d.createElement(
      "pre",
      {
        style: {
          padding: "2rem",
          background: "hsla(10, 50%, 50%, 0.1)",
          color: "red",
          overflow: "auto",
        },
      },
      a.stack
    ),
    n
  );
}
function ar(e) {
  var t;
  let { title: r, renderScripts: n, isOutsideRemixApp: a, children: o } = e,
    { routeModules: i } = We();
  return (t = i.root) != null && t.Layout && !a
    ? o
    : d.createElement(
        "html",
        {
          lang: "en",
        },
        d.createElement(
          "head",
          null,
          d.createElement("meta", {
            charSet: "utf-8",
          }),
          d.createElement("meta", {
            name: "viewport",
            content: "width=device-width,initial-scale=1,viewport-fit=cover",
          }),
          d.createElement("title", null, r)
        ),
        d.createElement(
          "body",
          null,
          d.createElement(
            "main",
            {
              style: {
                fontFamily: "system-ui, sans-serif",
                padding: "2rem",
              },
            },
            o,
            n ? d.createElement(El, null) : null
          )
        )
      );
}
function al() {
  return d.createElement(
    ar,
    {
      title: "Loading...",
      renderScripts: !0,
    },
    d.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `,
      },
    })
  );
}
function qn(e) {
  let t = {};
  return (
    Object.values(e).forEach((r) => {
      let n = r.parentId || "";
      t[n] || (t[n] = []), t[n].push(r);
    }),
    t
  );
}
function ol(e, t, r) {
  let n = Zn(t),
    a = t.HydrateFallback && (!r || e.id === "root") ? t.HydrateFallback : e.id === "root" ? al : void 0,
    o = t.ErrorBoundary
      ? t.ErrorBoundary
      : e.id === "root"
      ? () =>
          d.createElement(Qn, {
            error: Bn(),
          })
      : void 0;
  return e.id === "root" && t.Layout
    ? _(
        {},
        n
          ? {
              element: d.createElement(t.Layout, null, d.createElement(n, null)),
            }
          : {
              Component: n,
            },
        o
          ? {
              errorElement: d.createElement(t.Layout, null, d.createElement(o, null)),
            }
          : {
              ErrorBoundary: o,
            },
        a
          ? {
              hydrateFallbackElement: d.createElement(t.Layout, null, d.createElement(a, null)),
            }
          : {
              HydrateFallback: a,
            }
      )
    : {
        Component: n,
        ErrorBoundary: o,
        HydrateFallback: a,
      };
}
function es(e, t, r, n, a, o) {
  return Sr(t, r, n, o, "", qn(t), e);
}
function xt(e, t, r) {
  if (r) {
    let i = "You cannot call " + (e === "action" ? "serverAction()" : "serverLoader()") + ' in SPA Mode (routeId: "' + t.id + '")';
    throw (console.error(i), new Re(400, "Bad Request", new Error(i), !0));
  }
  let a =
    "You are trying to call " +
    (e === "action" ? "serverAction()" : "serverLoader()") +
    " on a route that does not have a server " +
    (e + ' (routeId: "' + t.id + '")');
  if ((e === "loader" && !t.hasLoader) || (e === "action" && !t.hasAction))
    throw (console.error(a), new Re(400, "Bad Request", new Error(a), !0));
}
function Qt(e, t) {
  let r = e === "clientAction" ? "a" : "an",
    n =
      'Route "' +
      t +
      '" does not have ' +
      r +
      " " +
      e +
      ", but you are trying to " +
      ("submit to it. To fix this, please add " + r + " `" + e + "` function to the route");
  throw (console.error(n), new Re(405, "Method Not Allowed", new Error(n), !0));
}
function Sr(e, t, r, n, a, o, i) {
  return (
    a === void 0 && (a = ""),
    o === void 0 && (o = qn(e)),
    (o[a] || []).map((l) => {
      let s = t[l.id];
      function u(S) {
        return typeof S != "function" && Se(), S();
      }
      function c(S) {
        return l.hasLoader ? u(S) : Promise.resolve(null);
      }
      function h(S) {
        if (!l.hasAction) throw Qt("action", l.id);
        return u(S);
      }
      async function v(S) {
        let D = t[l.id],
          L = D ? Vn(l, D) : Promise.resolve();
        try {
          return S();
        } finally {
          await L;
        }
      }
      let y = {
        id: l.id,
        index: l.index,
        path: l.path,
      };
      if (s) {
        var w, b, x;
        Object.assign(
          y,
          _({}, y, ol(l, s, n), {
            handle: s.handle,
            shouldRevalidate: i ? un(l.id, s.shouldRevalidate, i) : s.shouldRevalidate,
          })
        );
        let S = r == null || (w = r.loaderData) == null ? void 0 : w[l.id],
          D = r == null || (b = r.errors) == null ? void 0 : b[l.id],
          L = i == null && (((x = s.clientLoader) == null ? void 0 : x.hydrate) === !0 || !l.hasLoader);
        (y.loader = async (p, O) => {
          let { request: j, params: F } = p;
          try {
            return await v(
              async () => (
                s || Se(!1),
                s.clientLoader
                  ? s.clientLoader({
                      request: j,
                      params: F,
                      async serverLoader() {
                        if ((xt("loader", l, n), L)) {
                          if (D !== void 0) throw D;
                          return S;
                        }
                        return c(O);
                      },
                    })
                  : n
                  ? null
                  : c(O)
              )
            );
          } finally {
            L = !1;
          }
        }),
          (y.loader.hydrate = ll(l, s, n)),
          (y.action = (p, O) => {
            let { request: j, params: F } = p;
            return v(async () => {
              if ((s || Se(!1), !s.clientAction)) {
                if (n) throw Qt("clientAction", l.id);
                return h(O);
              }
              return s.clientAction({
                request: j,
                params: F,
                async serverAction() {
                  return xt("action", l, n), h(O);
                },
              });
            });
          });
      } else
        l.hasClientLoader || (y.loader = (S, D) => v(() => (n ? Promise.resolve(null) : c(D)))),
          l.hasClientAction ||
            (y.action = (S, D) =>
              v(() => {
                if (n) throw Qt("clientAction", l.id);
                return h(D);
              })),
          (y.lazy = async () => {
            let S = await il(l, t),
              D = _({}, S);
            if (S.clientLoader) {
              let L = S.clientLoader;
              D.loader = (p, O) =>
                L(
                  _({}, p, {
                    async serverLoader() {
                      return xt("loader", l, n), c(O);
                    },
                  })
                );
            }
            if (S.clientAction) {
              let L = S.clientAction;
              D.action = (p, O) =>
                L(
                  _({}, p, {
                    async serverAction() {
                      return xt("action", l, n), h(O);
                    },
                  })
                );
            }
            return (
              i && (D.shouldRevalidate = un(l.id, S.shouldRevalidate, i)),
              _(
                {},
                D.loader
                  ? {
                      loader: D.loader,
                    }
                  : {},
                D.action
                  ? {
                      action: D.action,
                    }
                  : {},
                {
                  hasErrorBoundary: D.hasErrorBoundary,
                  shouldRevalidate: D.shouldRevalidate,
                  handle: D.handle,
                  Component: D.Component,
                  ErrorBoundary: D.ErrorBoundary,
                }
              )
            );
          });
      let R = Sr(e, t, r, n, l.id, o, i);
      return R.length > 0 && (y.children = R), y;
    })
  );
}
function un(e, t, r) {
  let n = !1;
  return (a) => (n ? (t ? t(a) : a.defaultShouldRevalidate) : ((n = !0), r.has(e)));
}
async function il(e, t) {
  let r = await Hn(e, t);
  return (
    await Vn(e, r),
    {
      Component: Zn(r),
      ErrorBoundary: r.ErrorBoundary,
      clientAction: r.clientAction,
      clientLoader: r.clientLoader,
      handle: r.handle,
      links: r.links,
      meta: r.meta,
      shouldRevalidate: r.shouldRevalidate,
    }
  );
}
function Zn(e) {
  if (e.default == null) return;
  if (!(typeof e.default == "object" && Object.keys(e.default).length === 0)) return e.default;
}
function ll(e, t, r) {
  return (r && e.id !== "root") || (t.clientLoader != null && (t.clientLoader.hydrate === !0 || e.hasLoader !== !0));
}
const Mt = new Set(),
  sl = 1e3,
  Ft = new Set(),
  ul = 7680;
function Rr(e) {
  return !e;
}
function cl(e, t) {
  let r = new Set(t.state.matches.map((i) => i.route.id)),
    n = t.state.location.pathname.split("/").filter(Boolean),
    a = ["/"];
  for (n.pop(); n.length > 0; ) a.push("/" + n.join("/")), n.pop();
  a.forEach((i) => {
    let l = Ee(t.routes, i, t.basename);
    l && l.forEach((s) => r.add(s.route.id));
  });
  let o = [...r].reduce(
    (i, l) =>
      Object.assign(i, {
        [l]: e.routes[l],
      }),
    {}
  );
  return _({}, e, {
    routes: o,
  });
}
function ts(e, t, r, n) {
  if (Rr(r))
    return async (a) => {
      let { path: o, patch: i } = a;
      Ft.has(o) || (await ea([o], e, t, r, n, i));
    };
}
function rs(e, t, r, n) {
  d.useEffect(() => {
    var a;
    if (!Rr(n) || ((a = navigator.connection) == null ? void 0 : a.saveData) === !0) return;
    function o(c) {
      let h = c.tagName === "FORM" ? c.getAttribute("action") : c.getAttribute("href");
      if (!h) return;
      let v = new URL(h, window.location.origin);
      Ft.has(v.pathname) || Mt.add(v.pathname);
    }
    async function i() {
      let c = Array.from(Mt.keys()).filter((h) => (Ft.has(h) ? (Mt.delete(h), !1) : !0));
      if (c.length !== 0)
        try {
          await ea(c, t, r, n, e.basename, e.patchRoutes);
        } catch (h) {
          console.error("Failed to fetch manifest patches", h);
        }
    }
    document.body.querySelectorAll("a[data-discover], form[data-discover]").forEach((c) => o(c)), i();
    let l = fl(i, 100);
    function s(c) {
      return c.nodeType === Node.ELEMENT_NODE;
    }
    let u = new MutationObserver((c) => {
      let h = new Set();
      c.forEach((v) => {
        [v.target, ...v.addedNodes].forEach((y) => {
          s(y) &&
            (((y.tagName === "A" && y.getAttribute("data-discover")) || (y.tagName === "FORM" && y.getAttribute("data-discover"))) &&
              h.add(y),
            y.tagName !== "A" && y.querySelectorAll("a[data-discover], form[data-discover]").forEach((w) => h.add(w)));
        });
      }),
        h.forEach((v) => o(v)),
        l();
    });
    return (
      u.observe(document.documentElement, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeFilter: ["data-discover", "href", "action"],
      }),
      () => u.disconnect()
    );
  }, [n, t, r, e]);
}
async function ea(e, t, r, n, a, o) {
  let i = ((a ?? "/") + "/__manifest").replace(/\/+/g, "/"),
    l = new URL(i, window.location.origin);
  if ((e.sort().forEach((y) => l.searchParams.append("p", y)), l.searchParams.set("version", t.version), l.toString().length > ul)) {
    Mt.clear();
    return;
  }
  let s = await fetch(l);
  if (s.ok) {
    if (s.status >= 400) throw new Error(await s.text());
  } else throw new Error(s.status + " " + s.statusText);
  let u = await s.json(),
    c = new Set(Object.keys(t.routes)),
    h = Object.values(u).reduce(
      (y, w) =>
        c.has(w.id)
          ? y
          : Object.assign(y, {
              [w.id]: w,
            }),
      {}
    );
  Object.assign(t.routes, h), e.forEach((y) => dl(y, Ft));
  let v = new Set();
  Object.values(h).forEach((y) => {
    (!y.parentId || !h[y.parentId]) && v.add(y.parentId);
  }),
    v.forEach((y) => o(y || null, Sr(h, r, null, n, y)));
}
function dl(e, t) {
  if (t.size >= sl) {
    let r = t.values().next().value;
    t.delete(r);
  }
  t.add(e);
}
function fl(e, t) {
  let r;
  return function () {
    for (var n = arguments.length, a = new Array(n), o = 0; o < n; o++) a[o] = arguments[o];
    window.clearTimeout(r), (r = window.setTimeout(() => e(...a), t));
  };
}
const hl = ["page"],
  ml = ["page", "matches"],
  pl = ["tagName"];
function ta() {
  let e = d.useContext(Fe);
  return e || Se(), e;
}
function Ut() {
  let e = d.useContext(Ve);
  return e || Se(), e;
}
const Bt = d.createContext(void 0);
Bt.displayName = "FrameworkContext";
function We() {
  let e = d.useContext(Bt);
  return e || Se(), e;
}
function vl(e, t) {
  let r = d.useContext(Bt),
    [n, a] = d.useState(!1),
    [o, i] = d.useState(!1),
    { onFocus: l, onBlur: s, onMouseEnter: u, onMouseLeave: c, onTouchStart: h } = t,
    v = d.useRef(null);
  d.useEffect(() => {
    if ((e === "render" && i(!0), e === "viewport")) {
      let b = (R) => {
          R.forEach((S) => {
            i(S.isIntersecting);
          });
        },
        x = new IntersectionObserver(b, {
          threshold: 0.5,
        });
      return (
        v.current && x.observe(v.current),
        () => {
          x.disconnect();
        }
      );
    }
  }, [e]),
    d.useEffect(() => {
      if (n) {
        let b = setTimeout(() => {
          i(!0);
        }, 100);
        return () => {
          clearTimeout(b);
        };
      }
    }, [n]);
  let y = () => {
      a(!0);
    },
    w = () => {
      a(!1), i(!1);
    };
  return r
    ? e !== "intent"
      ? [o, v, {}]
      : [
          o,
          v,
          {
            onFocus: tt(l, y),
            onBlur: tt(s, w),
            onMouseEnter: tt(u, y),
            onMouseLeave: tt(c, w),
            onTouchStart: tt(h, y),
          },
        ]
    : [!1, v, {}];
}
function tt(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function br(e, t, r) {
  if (r && !Ot) return [e[0]];
  if (t) {
    let n = e.findIndex((a) => t[a.route.id] !== void 0);
    return e.slice(0, n + 1);
  }
  return e;
}
function ns() {
  let { isSpaMode: e, manifest: t, routeModules: r, criticalCss: n } = We(),
    { errors: a, matches: o } = Ut(),
    i = br(o, a, e),
    l = d.useMemo(() => Vi(i, r, t), [i, r, t]);
  return d.createElement(
    d.Fragment,
    null,
    n
      ? d.createElement("style", {
          dangerouslySetInnerHTML: {
            __html: n,
          },
        })
      : null,
    l.map((s) => {
      let { key: u, link: c } = s;
      return gr(c)
        ? d.createElement(
            ra,
            _(
              {
                key: u,
              },
              c
            )
          )
        : d.createElement(
            "link",
            _(
              {
                key: u,
              },
              c
            )
          );
    })
  );
}
function ra(e) {
  let { page: t } = e,
    r = _e(e, hl),
    { router: n } = ta(),
    a = d.useMemo(() => Ee(n.routes, t, n.basename), [n.routes, t, n.basename]);
  return a
    ? d.createElement(
        gl,
        _(
          {
            page: t,
            matches: a,
          },
          r
        )
      )
    : (console.warn("Tried to prefetch " + t + " but no routes matched."), null);
}
function yl(e) {
  let { manifest: t, routeModules: r } = We(),
    [n, a] = d.useState([]);
  return (
    d.useEffect(() => {
      let o = !1;
      return (
        Ji(e, t, r).then((i) => {
          o || a(i);
        }),
        () => {
          o = !0;
        }
      );
    }, [e, t, r]),
    n
  );
}
function gl(e) {
  let { page: t, matches: r } = e,
    n = _e(e, ml),
    a = de(),
    { manifest: o, routeModules: i } = We(),
    { loaderData: l, matches: s } = Ut(),
    u = d.useMemo(() => on(t, r, s, o, a, "data"), [t, r, s, o, a]),
    c = d.useMemo(() => on(t, r, s, o, a, "assets"), [t, r, s, o, a]),
    h = d.useMemo(() => {
      if (t === a.pathname + a.search + a.hash) return [];
      let w = new Set(),
        b = !1;
      if (
        (r.forEach((R) => {
          var S;
          o.routes[R.route.id].hasLoader &&
            ((!u.some((D) => D.route.id === R.route.id) && R.route.id in l && (S = i[R.route.id]) != null && S.shouldRevalidate) ||
            o.routes[R.route.id].hasClientLoader
              ? (b = !0)
              : w.add(R.route.id));
        }),
        w.size === 0)
      )
        return [];
      let x = jt(t);
      return (
        b &&
          w.size > 0 &&
          x.searchParams.set(
            "_routes",
            r
              .filter((R) => w.has(R.route.id))
              .map((R) => R.route.id)
              .join(",")
          ),
        [x.pathname + x.search]
      );
    }, [l, a, o, u, r, t, i]),
    v = d.useMemo(() => Yi(c, o), [c, o]),
    y = yl(c);
  return d.createElement(
    d.Fragment,
    null,
    h.map((w) =>
      d.createElement(
        "link",
        _(
          {
            key: w,
            rel: "prefetch",
            as: "fetch",
            href: w,
          },
          n
        )
      )
    ),
    v.map((w) =>
      d.createElement(
        "link",
        _(
          {
            key: w,
            rel: "modulepreload",
            href: w,
          },
          n
        )
      )
    ),
    y.map((w) => {
      let { key: b, link: x } = w;
      return d.createElement(
        "link",
        _(
          {
            key: b,
          },
          x
        )
      );
    })
  );
}
function as() {
  let { isSpaMode: e, routeModules: t } = We(),
    { errors: r, matches: n, loaderData: a } = Ut(),
    o = de(),
    i = br(n, r, e),
    l = null;
  r && (l = r[i[i.length - 1].route.id]);
  let s = [],
    u = null,
    c = [];
  for (let h = 0; h < i.length; h++) {
    let v = i[h],
      y = v.route.id,
      w = a[y],
      b = v.params,
      x = t[y],
      R = [],
      S = {
        id: y,
        data: w,
        meta: [],
        params: v.params,
        pathname: v.pathname,
        handle: v.route.handle,
        error: l,
      };
    if (
      ((c[h] = S),
      x != null && x.meta
        ? (R =
            typeof x.meta == "function"
              ? x.meta({
                  data: w,
                  params: b,
                  location: o,
                  matches: c,
                  error: l,
                })
              : Array.isArray(x.meta)
              ? [...x.meta]
              : x.meta)
        : u && (R = [...u]),
      (R = R || []),
      !Array.isArray(R))
    )
      throw new Error(
        "The route at " +
          v.route.path +
          ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://remix.run/route/meta`
      );
    (S.meta = R), (c[h] = S), (s = [...R]), (u = s);
  }
  return d.createElement(
    d.Fragment,
    null,
    s.flat().map((h) => {
      if (!h) return null;
      if ("tagName" in h) {
        let { tagName: y } = h,
          w = _e(h, pl);
        if (!wl(y)) return console.warn("A meta object uses an invalid tagName: " + y + ". Expected either 'link' or 'meta'"), null;
        let b = y;
        return d.createElement(
          b,
          _(
            {
              key: JSON.stringify(w),
            },
            w
          )
        );
      }
      if ("title" in h)
        return d.createElement(
          "title",
          {
            key: "title",
          },
          String(h.title)
        );
      if ("charset" in h) {
        var v;
        (v = h.charSet) != null || (h.charSet = h.charset), delete h.charset;
      }
      if ("charSet" in h && h.charSet != null)
        return typeof h.charSet == "string"
          ? d.createElement("meta", {
              key: "charSet",
              charSet: h.charSet,
            })
          : null;
      if ("script:ld+json" in h)
        try {
          let y = JSON.stringify(h["script:ld+json"]);
          return d.createElement("script", {
            key: "script:ld+json:" + y,
            type: "application/ld+json",
            dangerouslySetInnerHTML: {
              __html: y,
            },
          });
        } catch {
          return null;
        }
      return d.createElement(
        "meta",
        _(
          {
            key: JSON.stringify(h),
          },
          h
        )
      );
    })
  );
}
function wl(e) {
  return typeof e == "string" && /^(meta|link)$/.test(e);
}
let Ot = !1;
function El(e) {
  let { manifest: t, serverHandoffString: r, isSpaMode: n, renderMeta: a } = We(),
    { router: o, static: i, staticContext: l } = ta(),
    { matches: s } = Ut(),
    u = Rr(n);
  a && (a.didRenderScripts = !0);
  let c = br(s, null, n);
  d.useEffect(() => {
    Ot = !0;
  }, []);
  let h = d.useMemo(() => {
      var w;
      let x = l
          ? "window.__reactRouterContext = " +
            r +
            ";" +
            "window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
          : " ",
        R = i
          ? ((w = t.hmr) != null && w.runtime ? "import " + JSON.stringify(t.hmr.runtime) + ";" : "") +
            (u ? "" : "import " + JSON.stringify(t.url)) +
            `;
` +
            c.map((S, D) => "import * as route" + D + " from " + JSON.stringify(t.routes[S.route.id].module) + ";").join(`
`) +
            `
  ` +
            (u ? "window.__reactRouterManifest = " + JSON.stringify(cl(t, o), null, 2) + ";" : "") +
            `
  window.__reactRouterRouteModules = {` +
            c.map((S, D) => JSON.stringify(S.route.id) + ":route" + D).join(",") +
            `};

import(` +
            JSON.stringify(t.entry.module) +
            ");"
          : " ";
      return d.createElement(
        d.Fragment,
        null,
        d.createElement(
          "script",
          _({}, e, {
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: ln(x),
            type: void 0,
          })
        ),
        d.createElement(
          "script",
          _({}, e, {
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: ln(R),
            type: "module",
            async: !0,
          })
        )
      );
    }, []),
    v = c
      .map((w) => {
        let b = t.routes[w.route.id];
        return (b.imports || []).concat([b.module]);
      })
      .flat(1),
    y = Ot ? [] : t.entry.imports.concat(v);
  return Ot
    ? null
    : d.createElement(
        d.Fragment,
        null,
        u
          ? null
          : d.createElement("link", {
              rel: "modulepreload",
              href: t.url,
              crossOrigin: e.crossOrigin,
            }),
        d.createElement("link", {
          rel: "modulepreload",
          href: t.entry.module,
          crossOrigin: e.crossOrigin,
        }),
        Sl(y).map((w) =>
          d.createElement("link", {
            key: w,
            rel: "modulepreload",
            href: w,
            crossOrigin: e.crossOrigin,
          })
        ),
        h
      );
}
function Sl(e) {
  return [...new Set(e)];
}
function Rl() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
  return (n) => {
    t.forEach((a) => {
      typeof a == "function" ? a(n) : a != null && (a.current = n);
    });
  };
}
const bl = [
    "onClick",
    "discover",
    "prefetch",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  xl = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"],
  Ll = [
    "discover",
    "fetcherKey",
    "navigate",
    "reloadDocument",
    "replace",
    "state",
    "method",
    "action",
    "onSubmit",
    "relative",
    "preventScrollReset",
    "viewTransition",
  ],
  Pl = ["getKey", "storageKey"],
  na = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u",
  Cl = "7";
try {
  na && (window.__reactRouterVersion = Cl);
} catch {}
function os(e) {
  let { basename: t, children: r, window: n } = e,
    a = d.useRef();
  a.current == null &&
    (a.current = yo({
      window: n,
      v5Compat: !0,
    }));
  let o = a.current,
    [i, l] = d.useState({
      action: o.action,
      location: o.location,
    }),
    s = d.useCallback(
      (u) => {
        d.startTransition(() => l(u));
      },
      [l]
    );
  return (
    d.useLayoutEffect(() => o.listen(s), [o, s]),
    d.createElement(zn, {
      basename: t,
      children: r,
      location: i.location,
      navigationType: i.action,
      navigator: o,
    })
  );
}
const aa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  oa = d.forwardRef(function (t, r) {
    let {
        onClick: n,
        discover: a = "render",
        prefetch: o = "none",
        relative: i,
        reloadDocument: l,
        replace: s,
        state: u,
        target: c,
        to: h,
        preventScrollReset: v,
        viewTransition: y,
      } = t,
      w = _e(t, bl),
      { basename: b } = d.useContext(se),
      x = typeof h == "string" && aa.test(h),
      R,
      S = !1;
    if (typeof h == "string" && x && ((R = h), na))
      try {
        let B = new URL(window.location.href),
          Z = h.startsWith("//") ? new URL(B.protocol + h) : new URL(h),
          ne = ie(Z.pathname, b);
        Z.origin === B.origin && ne != null ? (h = ne + Z.search + Z.hash) : (S = !0);
      } catch {}
    let D = yi(h, {
        relative: i,
      }),
      [L, p, O] = vl(o, w),
      j = kl(h, {
        replace: s,
        state: u,
        target: c,
        preventScrollReset: v,
        relative: i,
        viewTransition: y,
      });
    function F(B) {
      n && n(B), B.defaultPrevented || j(B);
    }
    let W = d.createElement(
      "a",
      _({}, w, O, {
        href: R || D,
        onClick: S || l ? n : F,
        ref: Rl(r, p),
        target: c,
        "data-discover": !x && a === "render" ? "true" : void 0,
      })
    );
    return L && !x
      ? d.createElement(
          d.Fragment,
          null,
          W,
          d.createElement(ra, {
            page: D,
          })
        )
      : W;
  });
oa.displayName = "Link";
const Tl = d.forwardRef(function (t, r) {
  let {
      "aria-current": n = "page",
      caseSensitive: a = !1,
      className: o = "",
      end: i = !1,
      style: l,
      to: s,
      viewTransition: u,
      children: c,
    } = t,
    h = _e(t, xl),
    v = lt(s, {
      relative: h.relative,
    }),
    y = de(),
    w = d.useContext(Ve),
    { navigator: b, basename: x } = d.useContext(se),
    R = w != null && Ul(v) && u === !0,
    S = b.encodeLocation ? b.encodeLocation(v).pathname : v.pathname,
    D = y.pathname,
    L = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
  a || ((D = D.toLowerCase()), (L = L ? L.toLowerCase() : null), (S = S.toLowerCase())), L && x && (L = ie(L, x) || L);
  const p = S !== "/" && S.endsWith("/") ? S.length - 1 : S.length;
  let O = D === S || (!i && D.startsWith(S) && D.charAt(p) === "/"),
    j = L != null && (L === S || (!i && L.startsWith(S) && L.charAt(S.length) === "/")),
    F = {
      isActive: O,
      isPending: j,
      isTransitioning: R,
    },
    W = O ? n : void 0,
    B;
  typeof o == "function"
    ? (B = o(F))
    : (B = [o, O ? "active" : null, j ? "pending" : null, R ? "transitioning" : null].filter(Boolean).join(" "));
  let Z = typeof l == "function" ? l(F) : l;
  return d.createElement(
    oa,
    _({}, h, {
      "aria-current": W,
      className: B,
      ref: r,
      style: Z,
      to: s,
      viewTransition: u,
    }),
    typeof c == "function" ? c(F) : c
  );
});
Tl.displayName = "NavLink";
const Dl = d.forwardRef((e, t) => {
  let {
      discover: r = "render",
      fetcherKey: n,
      navigate: a,
      reloadDocument: o,
      replace: i,
      state: l,
      method: s = Dt,
      action: u,
      onSubmit: c,
      relative: h,
      preventScrollReset: v,
      viewTransition: y,
    } = e,
    w = _e(e, Ll),
    b = Nl(),
    x = Il(u, {
      relative: h,
    }),
    R = s.toLowerCase() === "get" ? "get" : "post",
    S = typeof u == "string" && aa.test(u),
    D = (L) => {
      if ((c && c(L), L.defaultPrevented)) return;
      L.preventDefault();
      let p = L.nativeEvent.submitter,
        O = (p == null ? void 0 : p.getAttribute("formmethod")) || s;
      b(p || L.currentTarget, {
        fetcherKey: n,
        method: O,
        navigate: a,
        replace: i,
        state: l,
        relative: h,
        preventScrollReset: v,
        viewTransition: y,
      });
    };
  return d.createElement(
    "form",
    _(
      {
        ref: t,
        method: R,
        action: x,
        onSubmit: o ? c : D,
      },
      w,
      {
        "data-discover": !S && r === "render" ? "true" : void 0,
      }
    )
  );
});
Dl.displayName = "Form";
function Ml(e) {
  let { getKey: t, storageKey: r } = e,
    n = _e(e, Pl),
    a = d.useContext(Bt),
    { basename: o } = d.useContext(se),
    i = de(),
    l = Un();
  Al({
    getKey: t,
    storageKey: r,
  });
  let s = d.useMemo(() => {
    if (!a || !t) return null;
    let c = lr(i, l, o, t);
    return c !== i.key ? c : null;
  }, []);
  if (!a || a.isSpaMode) return null;
  let u = ((c, h) => {
    if (!window.history.state || !window.history.state.key) {
      let v = Math.random().toString(32).slice(2);
      window.history.replaceState(
        {
          key: v,
        },
        ""
      );
    }
    try {
      let y = JSON.parse(sessionStorage.getItem(c) || "{}")[h || window.history.state.key];
      typeof y == "number" && window.scrollTo(0, y);
    } catch (v) {
      console.error(v), sessionStorage.removeItem(c);
    }
  }).toString();
  return d.createElement(
    "script",
    _({}, n, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: "(" + u + ")(" + JSON.stringify(r || ir) + ", " + JSON.stringify(s) + ")",
      },
    })
  );
}
Ml.displayName = "ScrollRestoration";
var at;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(at || (at = {}));
var or;
(function (e) {
  (e.UseFetcher = "useFetcher"), (e.UseFetchers = "useFetchers"), (e.UseScrollRestoration = "useScrollRestoration");
})(or || (or = {}));
function xr(e) {
  let t = d.useContext(Fe);
  return t || U(), t;
}
function Ol(e) {
  let t = d.useContext(Ve);
  return t || U(), t;
}
function kl(e, t) {
  let { target: r, replace: n, state: a, preventScrollReset: o, relative: i, viewTransition: l } = t === void 0 ? {} : t,
    s = jn(),
    u = de(),
    c = lt(e, {
      relative: i,
    });
  return d.useCallback(
    (h) => {
      if (Ui(h, r)) {
        h.preventDefault();
        let v = n !== void 0 ? n : Te(u) === Te(c);
        s(e, {
          replace: v,
          state: a,
          preventScrollReset: o,
          relative: i,
          viewTransition: l,
        });
      }
    },
    [u, s, c, n, a, r, e, o, i, l]
  );
}
function is(e) {
  let t = d.useRef(rr(e)),
    r = d.useRef(!1),
    n = de(),
    a = d.useMemo(() => Bi(n.search, r.current ? null : t.current), [n.search]),
    o = jn(),
    i = d.useCallback(
      (l, s) => {
        const u = rr(typeof l == "function" ? l(a) : l);
        (r.current = !0), o("?" + u, s);
      },
      [o, a]
    );
  return [a, i];
}
let _l = 0,
  Fl = () => "__" + String(++_l) + "__";
function Nl() {
  let { router: e } = xr(at.UseSubmit),
    { basename: t } = d.useContext(se),
    r = Di();
  return d.useCallback(
    async function (n, a) {
      a === void 0 && (a = {});
      let { action: o, method: i, encType: l, formData: s, body: u } = Hi(n, t);
      if (a.navigate === !1) {
        let c = a.fetcherKey || Fl();
        await e.fetch(c, r, a.action || o, {
          preventScrollReset: a.preventScrollReset,
          formData: s,
          body: u,
          formMethod: a.method || i,
          formEncType: a.encType || l,
          flushSync: a.flushSync,
        });
      } else
        await e.navigate(a.action || o, {
          preventScrollReset: a.preventScrollReset,
          formData: s,
          body: u,
          formMethod: a.method || i,
          formEncType: a.encType || l,
          replace: a.replace,
          state: a.state,
          fromRouteId: r,
          flushSync: a.flushSync,
          viewTransition: a.viewTransition,
        });
    },
    [e, t, r]
  );
}
function Il(e, t) {
  let { relative: r } = t === void 0 ? {} : t,
    { basename: n } = d.useContext(se),
    a = d.useContext(ce);
  a || U();
  let [o] = a.matches.slice(-1),
    i = _(
      {},
      lt(e || ".", {
        relative: r,
      })
    ),
    l = de();
  if (e == null) {
    i.search = l.search;
    let s = new URLSearchParams(i.search),
      u = s.getAll("index");
    if (u.some((h) => h === "")) {
      s.delete("index"), u.filter((v) => v).forEach((v) => s.append("index", v));
      let h = s.toString();
      i.search = h ? "?" + h : "";
    }
  }
  return (
    (!e || e === ".") && o.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"),
    n !== "/" && (i.pathname = i.pathname === "/" ? n : me([n, i.pathname])),
    Te(i)
  );
}
const ir = "react-router-scroll-positions";
let Lt = {};
function lr(e, t, r, n) {
  let a = null;
  return (
    n &&
      (r !== "/"
        ? (a = n(
            _({}, e, {
              pathname: ie(e.pathname, r) || e.pathname,
            }),
            t
          ))
        : (a = n(e, t))),
    a == null && (a = e.key),
    a
  );
}
function Al(e) {
  let { getKey: t, storageKey: r } = e === void 0 ? {} : e,
    { router: n } = xr(at.UseScrollRestoration),
    { restoreScrollPosition: a, preventScrollReset: o } = Ol(or.UseScrollRestoration),
    { basename: i } = d.useContext(se),
    l = de(),
    s = Un(),
    u = Mi();
  d.useEffect(
    () => (
      (window.history.scrollRestoration = "manual"),
      () => {
        window.history.scrollRestoration = "auto";
      }
    ),
    []
  ),
    jl(
      d.useCallback(() => {
        if (u.state === "idle") {
          let c = lr(l, s, i, t);
          Lt[c] = window.scrollY;
        }
        try {
          sessionStorage.setItem(r || ir, JSON.stringify(Lt));
        } catch {}
        window.history.scrollRestoration = "auto";
      }, [u.state, t, i, l, s, r])
    ),
    typeof document < "u" &&
      (d.useLayoutEffect(() => {
        try {
          let c = sessionStorage.getItem(r || ir);
          c && (Lt = JSON.parse(c));
        } catch {}
      }, [r]),
      d.useLayoutEffect(() => {
        let c = n == null ? void 0 : n.enableScrollRestoration(Lt, () => window.scrollY, t ? (h, v) => lr(h, v, i, t) : void 0);
        return () => c && c();
      }, [n, i, t]),
      d.useLayoutEffect(() => {
        if (a !== !1) {
          if (typeof a == "number") {
            window.scrollTo(0, a);
            return;
          }
          if (l.hash) {
            let c = document.getElementById(decodeURIComponent(l.hash.slice(1)));
            if (c) {
              c.scrollIntoView();
              return;
            }
          }
          o !== !0 && window.scrollTo(0, 0);
        }
      }, [l, a, o]));
}
function jl(e, t) {
  let { capture: r } = {};
  d.useEffect(() => {
    let n =
      r != null
        ? {
            capture: r,
          }
        : void 0;
    return (
      window.addEventListener("pagehide", e, n),
      () => {
        window.removeEventListener("pagehide", e, n);
      }
    );
  }, [e, r]);
}
function Ul(e, t) {
  t === void 0 && (t = {});
  let r = d.useContext(vr);
  r == null && U();
  let { basename: n } = xr(at.useViewTransitionState),
    a = lt(e, {
      relative: t.relative,
    });
  if (!r.isTransitioning) return !1;
  let o = ie(r.currentLocation.pathname, n) || r.currentLocation.pathname,
    i = ie(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return _t(a.pathname, i) != null || _t(a.pathname, o) != null;
}
new TextEncoder();
var cn;
(function (e) {
  (e.Development = "development"), (e.Production = "production"), (e.Test = "test");
})(cn || (cn = {}));
function ls(e) {
  if (!e) return null;
  let t = Object.entries(e),
    r = {};
  for (let [n, a] of t)
    if (a && a.__type === "RouteErrorResponse") r[n] = new Re(a.status, a.statusText, a.data, a.internal === !0);
    else if (a && a.__type === "Error") {
      if (a.__subType) {
        let o = window[a.__subType];
        if (typeof o == "function")
          try {
            let i = new o(a.message);
            (i.stack = a.stack), (r[n] = i);
          } catch {}
      }
      if (r[n] == null) {
        let o = new Error(a.message);
        (o.stack = a.stack), (r[n] = o);
      }
    } else r[n] = a;
  return r;
}
export {
  zl as A,
  os as B,
  Yl as C,
  Bt as F,
  ns as L,
  as as M,
  Ql as O,
  Zl as R,
  Ml as S,
  Xl as a,
  ls as b,
  Sr as c,
  nl as startDecoding,
  Wl as e,
  yo as f,
  Gl as g,
  ql as h,
  U as i,
  ts as j,
  es as k,
  Hl as l,
  Ee as m,
  de as n,
  Un as o,
  El as p,
  Ha as q,
  d as r,
  ll as s,
  Jl as t,
  rs as u,
  is as v,
  $l as w,
  Ca as x,
  Kl as y,
  oa as z,
};
