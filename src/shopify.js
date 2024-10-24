/**
 * This is code from Shopify's webhook docs page which is used to decode the rails_data object. It may need to be updated as Shopify's docs change.
 */
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
var Xa = -1,
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

export { nl as startDecoding };
