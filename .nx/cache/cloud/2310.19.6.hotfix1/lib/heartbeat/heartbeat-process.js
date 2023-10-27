'use strict';
var ot = Object.defineProperty;
var mo = Object.getOwnPropertyDescriptor;
var vo = Object.getOwnPropertyNames;
var _o = Object.prototype.hasOwnProperty;
var Q = (e, t) => () => (e && (t = e((e = 0))), t);
var x = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Fe = (e, t) => {
    for (var r in t) ot(e, r, { get: t[r], enumerable: !0 });
  },
  Co = (e, t, r, o) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let n of vo(t))
        !_o.call(e, n) &&
          n !== r &&
          ot(e, n, {
            get: () => t[n],
            enumerable: !(o = mo(t, n)) || o.enumerable,
          });
    return e;
  };
var Me = (e) => Co(ot({}, '__esModule', { value: !0 }), e);
var sr = {};
Fe(sr, {
  configureLightClientRequire: () => Eo,
  configuredPaths: () => st,
  lightClientRequire: () => Z,
});
function Eo(e) {
  (st = e),
    (Z = function (t) {
      if (st.length === 0)
        throw new Error(
          'Light client require must have paths configured with `configureLightClientRequire`.'
        );
      let r;
      try {
        r = require.resolve(t, { paths: e });
      } catch (o) {
        throw (
          (process.env.NX_VERBOSE_LOGGING === 'true' &&
            console.error(
              `Was not able to require.resolve module ${t} from the following paths: ${e}. This may be expected.`
            ),
          o)
        );
      }
      try {
        return require(r);
      } catch (o) {
        throw (
          (process.env.NX_VERBOSE_LOGGING === 'true' &&
            console.error(
              `Was not able require module ${t} from path ${r}. This may be expected. `
            ),
          o)
        );
      }
    });
}
var Z,
  st,
  Re = Q(() => {
    'use strict';
    st = [];
  });
var de = x((ie) => {
  'use strict';
  Re();
  try {
    try {
      let { output: e } = Z('nx/src/utils/output'),
        t;
      try {
        t = Z('nx/src/utils/app-root').workspaceRoot;
      } catch {
        t = Z('nx/src/utils/workspace-root').workspaceRoot;
      }
      (ie.workspaceRoot = t), (ie.output = e);
    } catch {
      let { output: t } = Z('@nrwl/workspace/src/utilities/output'),
        { appRootPath: r } = Z('@nrwl/tao/src/utils/app-root');
      (ie.workspaceRoot = r), (ie.output = t);
    }
  } catch {
    let t = (r) => {
      var o;
      return `${r.title}

${
  (o = r.bodyLines) == null
    ? void 0
    : o.join(`
`)
}`;
    };
    (ie.output = {
      note: (r) => console.info(t(r)),
      error: (r) => console.error(t(r)),
      warn: (r) => console.warn(t(r)),
      success: (r) => console.log(t(r)),
      addVerticalSeparator: () => '',
      addNewline: () =>
        console.log(`
`),
    }),
      (ie.workspaceRoot = process.cwd());
  }
});
var ur = {};
Fe(ur, { getCloudOptions: () => it });
function it() {
  var o, n;
  let e = JSON.parse(yo((0, ir.readFileSync)(`${Ro}/nx.json`).toString())),
    t = {},
    r = [];
  for (let s in e.targetDefaults) e.targetDefaults[s].cache && r.push(s);
  return (
    e.nxCloudAccessToken &&
      (t.accessToken ?? (t.accessToken = e.nxCloudAccessToken)),
    e.nxCloudUrl && (t.url ?? (t.url = e.nxCloudUrl)),
    e.nxCloudEncryptionKey && (t.encryptionKey = e.nxCloudEncryptionKey),
    e.parallel && (t.parallel ?? (t.parallel = e.parallel)),
    e.cacheDirectory &&
      (t.cacheDirectory ?? (t.cacheDirectory = e.cacheDirectory)),
    r.length && (t.cacheableOperations ?? (t.cacheableOperations = r)),
    {
      nxJson: e,
      nxCloudOptions: {
        ...t,
        ...((n = (o = e.tasksRunnerOptions) == null ? void 0 : o.default) ==
        null
          ? void 0
          : n.options),
      },
    }
  );
}
var ir,
  yo,
  Ro,
  ut = Q(() => {
    'use strict';
    ir = require('fs');
    Re();
    (yo = Z('strip-json-comments')), ({ workspaceRoot: Ro } = de());
  });
function ar() {
  return (
    process.env.CI === 'true' ||
    process.env.TF_BUILD === 'true' ||
    process.env.GITHUB_ACTIONS === 'true' ||
    process.env.BUILDKITE === 'true' ||
    process.env.CIRCLECI === 'true' ||
    process.env.CIRRUS_CI === 'true' ||
    process.env.TRAVIS === 'true' ||
    !!process.env['bamboo.buildKey'] ||
    !!process.env.CODEBUILD_BUILD_ID ||
    !!process.env.GITLAB_CI ||
    !!process.env.HEROKU_TEST_RUN_ID ||
    !!process.env.BUILD_ID ||
    !!process.env.BUILD_BUILDID ||
    !!process.env.TEAMCITY_VERSION
  );
}
var cr = Q(() => {
  'use strict';
});
function at() {
  let { nxCloudOptions: e } = it();
  return !e.url || e.useLatestApi
    ? !1
    : e.url.endsWith('snapshot.nx.app')
    ? !0
    : !(e.url.endsWith('.nx.app') || e.url.indexOf('localhost') > -1);
}
var fr = Q(() => {
  'use strict';
  ut();
});
var hr = x((Zi, ct) => {
  var go = require('fs'),
    lr = require('path'),
    xo = require('os');
  function pr(e) {
    console.log(`[dotenv][DEBUG] ${e}`);
  }
  var Io = `
`,
    To = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
    Oo = /\\n/g,
    wo = /\r\n|\n|\r/;
  function dr(e, t) {
    let r = !!(t && t.debug),
      o = {};
    return (
      e
        .toString()
        .split(wo)
        .forEach(function (n, s) {
          let i = n.match(To);
          if (i != null) {
            let a = i[1],
              u = i[2] || '',
              f = u.length - 1,
              c = u[0] === '"' && u[f] === '"';
            (u[0] === "'" && u[f] === "'") || c
              ? ((u = u.substring(1, f)), c && (u = u.replace(Oo, Io)))
              : (u = u.trim()),
              (o[a] = u);
          } else r && pr(`did not match key and value when parsing line ${s + 1}: ${n}`);
        }),
      o
    );
  }
  function bo(e) {
    return e[0] === '~' ? lr.join(xo.homedir(), e.slice(1)) : e;
  }
  function So(e) {
    let t = lr.resolve(process.cwd(), '.env'),
      r = 'utf8',
      o = !1;
    e &&
      (e.path != null && (t = bo(e.path)),
      e.encoding != null && (r = e.encoding),
      e.debug != null && (o = !0));
    try {
      let n = dr(go.readFileSync(t, { encoding: r }), { debug: o });
      return (
        Object.keys(n).forEach(function (s) {
          Object.prototype.hasOwnProperty.call(process.env, s)
            ? o &&
              pr(
                `"${s}" is already defined in \`process.env\` and will not be overwritten`
              )
            : (process.env[s] = n[s]);
        }),
        { parsed: n }
      );
    } catch (n) {
      return { error: n };
    }
  }
  ct.exports.config = So;
  ct.exports.parse = dr;
});
var mr = x((ge, ft) => {
  (function (e, t) {
    typeof ge == 'object' && typeof ft == 'object'
      ? (ft.exports = t(require('child_process'), require('crypto')))
      : typeof define == 'function' && define.amd
      ? define(['child_process', 'crypto'], t)
      : typeof ge == 'object'
      ? (ge['electron-machine-id'] = t(
          require('child_process'),
          require('crypto')
        ))
      : (e['electron-machine-id'] = t(e.child_process, e.crypto));
  })(ge, function (e, t) {
    return (function (r) {
      function o(s) {
        if (n[s]) return n[s].exports;
        var i = (n[s] = { exports: {}, id: s, loaded: !1 });
        return (
          r[s].call(i.exports, i, i.exports, o), (i.loaded = !0), i.exports
        );
      }
      var n = {};
      return (o.m = r), (o.c = n), (o.p = ''), o(0);
    })([
      function (r, o, n) {
        r.exports = n(34);
      },
      function (r, o, n) {
        var s = n(29)('wks'),
          i = n(33),
          a = n(2).Symbol,
          u = typeof a == 'function',
          f = (r.exports = function (c) {
            return s[c] || (s[c] = (u && a[c]) || (u ? a : i)('Symbol.' + c));
          });
        f.store = s;
      },
      function (r, o) {
        var n = (r.exports =
          typeof window < 'u' && window.Math == Math
            ? window
            : typeof self < 'u' && self.Math == Math
            ? self
            : Function('return this')());
        typeof __g == 'number' && (__g = n);
      },
      function (r, o, n) {
        var s = n(9);
        r.exports = function (i) {
          if (!s(i)) throw TypeError(i + ' is not an object!');
          return i;
        };
      },
      function (r, o, n) {
        r.exports = !n(24)(function () {
          return (
            Object.defineProperty({}, 'a', {
              get: function () {
                return 7;
              },
            }).a != 7
          );
        });
      },
      function (r, o, n) {
        var s = n(12),
          i = n(17);
        r.exports = n(4)
          ? function (a, u, f) {
              return s.f(a, u, i(1, f));
            }
          : function (a, u, f) {
              return (a[u] = f), a;
            };
      },
      function (r, o) {
        var n = (r.exports = { version: '2.4.0' });
        typeof __e == 'number' && (__e = n);
      },
      function (r, o, n) {
        var s = n(14);
        r.exports = function (i, a, u) {
          if ((s(i), a === void 0)) return i;
          switch (u) {
            case 1:
              return function (f) {
                return i.call(a, f);
              };
            case 2:
              return function (f, c) {
                return i.call(a, f, c);
              };
            case 3:
              return function (f, c, l) {
                return i.call(a, f, c, l);
              };
          }
          return function () {
            return i.apply(a, arguments);
          };
        };
      },
      function (r, o) {
        var n = {}.hasOwnProperty;
        r.exports = function (s, i) {
          return n.call(s, i);
        };
      },
      function (r, o) {
        r.exports = function (n) {
          return typeof n == 'object' ? n !== null : typeof n == 'function';
        };
      },
      function (r, o) {
        r.exports = {};
      },
      function (r, o) {
        var n = {}.toString;
        r.exports = function (s) {
          return n.call(s).slice(8, -1);
        };
      },
      function (r, o, n) {
        var s = n(3),
          i = n(26),
          a = n(32),
          u = Object.defineProperty;
        o.f = n(4)
          ? Object.defineProperty
          : function (f, c, l) {
              if ((s(f), (c = a(c, !0)), s(l), i))
                try {
                  return u(f, c, l);
                } catch {}
              if ('get' in l || 'set' in l)
                throw TypeError('Accessors not supported!');
              return 'value' in l && (f[c] = l.value), f;
            };
      },
      function (r, o, n) {
        var s = n(42),
          i = n(15);
        r.exports = function (a) {
          return s(i(a));
        };
      },
      function (r, o) {
        r.exports = function (n) {
          if (typeof n != 'function')
            throw TypeError(n + ' is not a function!');
          return n;
        };
      },
      function (r, o) {
        r.exports = function (n) {
          if (n == null) throw TypeError("Can't call method on  " + n);
          return n;
        };
      },
      function (r, o, n) {
        var s = n(9),
          i = n(2).document,
          a = s(i) && s(i.createElement);
        r.exports = function (u) {
          return a ? i.createElement(u) : {};
        };
      },
      function (r, o) {
        r.exports = function (n, s) {
          return {
            enumerable: !(1 & n),
            configurable: !(2 & n),
            writable: !(4 & n),
            value: s,
          };
        };
      },
      function (r, o, n) {
        var s = n(12).f,
          i = n(8),
          a = n(1)('toStringTag');
        r.exports = function (u, f, c) {
          u &&
            !i((u = c ? u : u.prototype), a) &&
            s(u, a, { configurable: !0, value: f });
        };
      },
      function (r, o, n) {
        var s = n(29)('keys'),
          i = n(33);
        r.exports = function (a) {
          return s[a] || (s[a] = i(a));
        };
      },
      function (r, o) {
        var n = Math.ceil,
          s = Math.floor;
        r.exports = function (i) {
          return isNaN((i = +i)) ? 0 : (i > 0 ? s : n)(i);
        };
      },
      function (r, o, n) {
        var s = n(11),
          i = n(1)('toStringTag'),
          a =
            s(
              (function () {
                return arguments;
              })()
            ) == 'Arguments',
          u = function (f, c) {
            try {
              return f[c];
            } catch {}
          };
        r.exports = function (f) {
          var c, l, p;
          return f === void 0
            ? 'Undefined'
            : f === null
            ? 'Null'
            : typeof (l = u((c = Object(f)), i)) == 'string'
            ? l
            : a
            ? s(c)
            : (p = s(c)) == 'Object' && typeof c.callee == 'function'
            ? 'Arguments'
            : p;
        };
      },
      function (r, o) {
        r.exports =
          'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
            ','
          );
      },
      function (r, o, n) {
        var s = n(2),
          i = n(6),
          a = n(7),
          u = n(5),
          f = 'prototype',
          c = function (l, p, d) {
            var h,
              C,
              y,
              U = l & c.F,
              T = l & c.G,
              I = l & c.S,
              R = l & c.P,
              b = l & c.B,
              _ = l & c.W,
              S = T ? i : i[p] || (i[p] = {}),
              w = S[f],
              N = T ? s : I ? s[p] : (s[p] || {})[f];
            T && (d = p);
            for (h in d)
              (C = !U && N && N[h] !== void 0),
                (C && h in S) ||
                  ((y = C ? N[h] : d[h]),
                  (S[h] =
                    T && typeof N[h] != 'function'
                      ? d[h]
                      : b && C
                      ? a(y, s)
                      : _ && N[h] == y
                      ? (function (L) {
                          var K = function (j, B, W) {
                            if (this instanceof L) {
                              switch (arguments.length) {
                                case 0:
                                  return new L();
                                case 1:
                                  return new L(j);
                                case 2:
                                  return new L(j, B);
                              }
                              return new L(j, B, W);
                            }
                            return L.apply(this, arguments);
                          };
                          return (K[f] = L[f]), K;
                        })(y)
                      : R && typeof y == 'function'
                      ? a(Function.call, y)
                      : y),
                  R &&
                    (((S.virtual || (S.virtual = {}))[h] = y),
                    l & c.R && w && !w[h] && u(w, h, y)));
          };
        (c.F = 1),
          (c.G = 2),
          (c.S = 4),
          (c.P = 8),
          (c.B = 16),
          (c.W = 32),
          (c.U = 64),
          (c.R = 128),
          (r.exports = c);
      },
      function (r, o) {
        r.exports = function (n) {
          try {
            return !!n();
          } catch {
            return !0;
          }
        };
      },
      function (r, o, n) {
        r.exports = n(2).document && document.documentElement;
      },
      function (r, o, n) {
        r.exports =
          !n(4) &&
          !n(24)(function () {
            return (
              Object.defineProperty(n(16)('div'), 'a', {
                get: function () {
                  return 7;
                },
              }).a != 7
            );
          });
      },
      function (r, o, n) {
        'use strict';
        var s = n(28),
          i = n(23),
          a = n(57),
          u = n(5),
          f = n(8),
          c = n(10),
          l = n(45),
          p = n(18),
          d = n(52),
          h = n(1)('iterator'),
          C = !([].keys && 'next' in [].keys()),
          y = '@@iterator',
          U = 'keys',
          T = 'values',
          I = function () {
            return this;
          };
        r.exports = function (R, b, _, S, w, N, L) {
          l(_, b, S);
          var K,
            j,
            B,
            W = function (v) {
              if (!C && v in g) return g[v];
              switch (v) {
                case U:
                  return function () {
                    return new _(this, v);
                  };
                case T:
                  return function () {
                    return new _(this, v);
                  };
              }
              return function () {
                return new _(this, v);
              };
            },
            A = b + ' Iterator',
            Y = w == T,
            V = !1,
            g = R.prototype,
            P = g[h] || g[y] || (w && g[w]),
            F = P || W(w),
            te = w ? (Y ? W('entries') : F) : void 0,
            m = (b == 'Array' && g.entries) || P;
          if (
            (m &&
              ((B = d(m.call(new R()))),
              B !== Object.prototype &&
                (p(B, A, !0), s || f(B, h) || u(B, h, I))),
            Y &&
              P &&
              P.name !== T &&
              ((V = !0),
              (F = function () {
                return P.call(this);
              })),
            (s && !L) || (!C && !V && g[h]) || u(g, h, F),
            (c[b] = F),
            (c[A] = I),
            w)
          )
            if (
              ((K = { values: Y ? F : W(T), keys: N ? F : W(U), entries: te }),
              L)
            )
              for (j in K) j in g || a(g, j, K[j]);
            else i(i.P + i.F * (C || V), b, K);
          return K;
        };
      },
      function (r, o) {
        r.exports = !0;
      },
      function (r, o, n) {
        var s = n(2),
          i = '__core-js_shared__',
          a = s[i] || (s[i] = {});
        r.exports = function (u) {
          return a[u] || (a[u] = {});
        };
      },
      function (r, o, n) {
        var s,
          i,
          a,
          u = n(7),
          f = n(41),
          c = n(25),
          l = n(16),
          p = n(2),
          d = p.process,
          h = p.setImmediate,
          C = p.clearImmediate,
          y = p.MessageChannel,
          U = 0,
          T = {},
          I = 'onreadystatechange',
          R = function () {
            var _ = +this;
            if (T.hasOwnProperty(_)) {
              var S = T[_];
              delete T[_], S();
            }
          },
          b = function (_) {
            R.call(_.data);
          };
        (h && C) ||
          ((h = function (_) {
            for (var S = [], w = 1; arguments.length > w; )
              S.push(arguments[w++]);
            return (
              (T[++U] = function () {
                f(typeof _ == 'function' ? _ : Function(_), S);
              }),
              s(U),
              U
            );
          }),
          (C = function (_) {
            delete T[_];
          }),
          n(11)(d) == 'process'
            ? (s = function (_) {
                d.nextTick(u(R, _, 1));
              })
            : y
            ? ((i = new y()),
              (a = i.port2),
              (i.port1.onmessage = b),
              (s = u(a.postMessage, a, 1)))
            : p.addEventListener &&
              typeof postMessage == 'function' &&
              !p.importScripts
            ? ((s = function (_) {
                p.postMessage(_ + '', '*');
              }),
              p.addEventListener('message', b, !1))
            : (s =
                I in l('script')
                  ? function (_) {
                      c.appendChild(l('script'))[I] = function () {
                        c.removeChild(this), R.call(_);
                      };
                    }
                  : function (_) {
                      setTimeout(u(R, _, 1), 0);
                    })),
          (r.exports = { set: h, clear: C });
      },
      function (r, o, n) {
        var s = n(20),
          i = Math.min;
        r.exports = function (a) {
          return a > 0 ? i(s(a), 9007199254740991) : 0;
        };
      },
      function (r, o, n) {
        var s = n(9);
        r.exports = function (i, a) {
          if (!s(i)) return i;
          var u, f;
          if (
            (a &&
              typeof (u = i.toString) == 'function' &&
              !s((f = u.call(i)))) ||
            (typeof (u = i.valueOf) == 'function' && !s((f = u.call(i)))) ||
            (!a && typeof (u = i.toString) == 'function' && !s((f = u.call(i))))
          )
            return f;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      function (r, o) {
        var n = 0,
          s = Math.random();
        r.exports = function (i) {
          return 'Symbol('.concat(
            i === void 0 ? '' : i,
            ')_',
            (++n + s).toString(36)
          );
        };
      },
      function (r, o, n) {
        'use strict';
        function s(I) {
          return I && I.__esModule ? I : { default: I };
        }
        function i() {
          return process.platform !== 'win32'
            ? ''
            : process.arch === 'ia32' &&
              process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')
            ? 'mixed'
            : 'native';
        }
        function a(I) {
          return (0, h.createHash)('sha256').update(I).digest('hex');
        }
        function u(I) {
          switch (y) {
            case 'darwin':
              return I.split('IOPlatformUUID')[1]
                .split(
                  `
`
                )[0]
                .replace(/\=|\s+|\"/gi, '')
                .toLowerCase();
            case 'win32':
              return I.toString()
                .split('REG_SZ')[1]
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            case 'linux':
              return I.toString()
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            case 'freebsd':
              return I.toString()
                .replace(/\r+|\n+|\s+/gi, '')
                .toLowerCase();
            default:
              throw new Error('Unsupported platform: ' + process.platform);
          }
        }
        function f(I) {
          var R = u((0, d.execSync)(T[y]).toString());
          return I ? R : a(R);
        }
        function c(I) {
          return new p.default(function (R, b) {
            return (0, d.exec)(T[y], {}, function (_, S, w) {
              if (_)
                return b(
                  new Error('Error while obtaining machine id: ' + _.stack)
                );
              var N = u(S.toString());
              return R(I ? N : a(N));
            });
          });
        }
        Object.defineProperty(o, '__esModule', { value: !0 });
        var l = n(35),
          p = s(l);
        (o.machineIdSync = f), (o.machineId = c);
        var d = n(70),
          h = n(71),
          C = process,
          y = C.platform,
          U = {
            native: '%windir%\\System32',
            mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32',
          },
          T = {
            darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
            win32:
              U[i()] +
              '\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid',
            linux:
              '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
            freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid',
          };
      },
      function (r, o, n) {
        r.exports = { default: n(36), __esModule: !0 };
      },
      function (r, o, n) {
        n(66), n(68), n(69), n(67), (r.exports = n(6).Promise);
      },
      function (r, o) {
        r.exports = function () {};
      },
      function (r, o) {
        r.exports = function (n, s, i, a) {
          if (!(n instanceof s) || (a !== void 0 && a in n))
            throw TypeError(i + ': incorrect invocation!');
          return n;
        };
      },
      function (r, o, n) {
        var s = n(13),
          i = n(31),
          a = n(62);
        r.exports = function (u) {
          return function (f, c, l) {
            var p,
              d = s(f),
              h = i(d.length),
              C = a(l, h);
            if (u && c != c) {
              for (; h > C; ) if (((p = d[C++]), p != p)) return !0;
            } else
              for (; h > C; C++)
                if ((u || C in d) && d[C] === c) return u || C || 0;
            return !u && -1;
          };
        };
      },
      function (r, d, n) {
        var s = n(7),
          i = n(44),
          a = n(43),
          u = n(3),
          f = n(31),
          c = n(64),
          l = {},
          p = {},
          d = (r.exports = function (h, C, y, U, T) {
            var I,
              R,
              b,
              _,
              S = T
                ? function () {
                    return h;
                  }
                : c(h),
              w = s(y, U, C ? 2 : 1),
              N = 0;
            if (typeof S != 'function')
              throw TypeError(h + ' is not iterable!');
            if (a(S)) {
              for (I = f(h.length); I > N; N++)
                if (
                  ((_ = C ? w(u((R = h[N]))[0], R[1]) : w(h[N])),
                  _ === l || _ === p)
                )
                  return _;
            } else
              for (b = S.call(h); !(R = b.next()).done; )
                if (((_ = i(b, w, R.value, C)), _ === l || _ === p)) return _;
          });
        (d.BREAK = l), (d.RETURN = p);
      },
      function (r, o) {
        r.exports = function (n, s, i) {
          var a = i === void 0;
          switch (s.length) {
            case 0:
              return a ? n() : n.call(i);
            case 1:
              return a ? n(s[0]) : n.call(i, s[0]);
            case 2:
              return a ? n(s[0], s[1]) : n.call(i, s[0], s[1]);
            case 3:
              return a ? n(s[0], s[1], s[2]) : n.call(i, s[0], s[1], s[2]);
            case 4:
              return a
                ? n(s[0], s[1], s[2], s[3])
                : n.call(i, s[0], s[1], s[2], s[3]);
          }
          return n.apply(i, s);
        };
      },
      function (r, o, n) {
        var s = n(11);
        r.exports = Object('z').propertyIsEnumerable(0)
          ? Object
          : function (i) {
              return s(i) == 'String' ? i.split('') : Object(i);
            };
      },
      function (r, o, n) {
        var s = n(10),
          i = n(1)('iterator'),
          a = Array.prototype;
        r.exports = function (u) {
          return u !== void 0 && (s.Array === u || a[i] === u);
        };
      },
      function (r, o, n) {
        var s = n(3);
        r.exports = function (i, a, u, f) {
          try {
            return f ? a(s(u)[0], u[1]) : a(u);
          } catch (l) {
            var c = i.return;
            throw (c !== void 0 && s(c.call(i)), l);
          }
        };
      },
      function (r, o, n) {
        'use strict';
        var s = n(49),
          i = n(17),
          a = n(18),
          u = {};
        n(5)(u, n(1)('iterator'), function () {
          return this;
        }),
          (r.exports = function (f, c, l) {
            (f.prototype = s(u, { next: i(1, l) })), a(f, c + ' Iterator');
          });
      },
      function (r, o, n) {
        var s = n(1)('iterator'),
          i = !1;
        try {
          var a = [7][s]();
          (a.return = function () {
            i = !0;
          }),
            Array.from(a, function () {
              throw 2;
            });
        } catch {}
        r.exports = function (u, f) {
          if (!f && !i) return !1;
          var c = !1;
          try {
            var l = [7],
              p = l[s]();
            (p.next = function () {
              return { done: (c = !0) };
            }),
              (l[s] = function () {
                return p;
              }),
              u(l);
          } catch {}
          return c;
        };
      },
      function (r, o) {
        r.exports = function (n, s) {
          return { value: s, done: !!n };
        };
      },
      function (r, o, n) {
        var s = n(2),
          i = n(30).set,
          a = s.MutationObserver || s.WebKitMutationObserver,
          u = s.process,
          f = s.Promise,
          c = n(11)(u) == 'process';
        r.exports = function () {
          var l,
            p,
            d,
            h = function () {
              var T, I;
              for (c && (T = u.domain) && T.exit(); l; ) {
                (I = l.fn), (l = l.next);
                try {
                  I();
                } catch (R) {
                  throw (l ? d() : (p = void 0), R);
                }
              }
              (p = void 0), T && T.enter();
            };
          if (c)
            d = function () {
              u.nextTick(h);
            };
          else if (a) {
            var C = !0,
              y = document.createTextNode('');
            new a(h).observe(y, { characterData: !0 }),
              (d = function () {
                y.data = C = !C;
              });
          } else if (f && f.resolve) {
            var U = f.resolve();
            d = function () {
              U.then(h);
            };
          } else
            d = function () {
              i.call(s, h);
            };
          return function (T) {
            var I = { fn: T, next: void 0 };
            p && (p.next = I), l || ((l = I), d()), (p = I);
          };
        };
      },
      function (r, o, n) {
        var s = n(3),
          i = n(50),
          a = n(22),
          u = n(19)('IE_PROTO'),
          f = function () {},
          c = 'prototype',
          l = function () {
            var p,
              d = n(16)('iframe'),
              h = a.length,
              C = '>';
            for (
              d.style.display = 'none',
                n(25).appendChild(d),
                d.src = 'javascript:',
                p = d.contentWindow.document,
                p.open(),
                p.write('<script>document.F=Object</script' + C),
                p.close(),
                l = p.F;
              h--;

            )
              delete l[c][a[h]];
            return l();
          };
        r.exports =
          Object.create ||
          function (p, d) {
            var h;
            return (
              p !== null
                ? ((f[c] = s(p)), (h = new f()), (f[c] = null), (h[u] = p))
                : (h = l()),
              d === void 0 ? h : i(h, d)
            );
          };
      },
      function (r, o, n) {
        var s = n(12),
          i = n(3),
          a = n(54);
        r.exports = n(4)
          ? Object.defineProperties
          : function (u, f) {
              i(u);
              for (var c, l = a(f), p = l.length, d = 0; p > d; )
                s.f(u, (c = l[d++]), f[c]);
              return u;
            };
      },
      function (r, o, n) {
        var s = n(55),
          i = n(17),
          a = n(13),
          u = n(32),
          f = n(8),
          c = n(26),
          l = Object.getOwnPropertyDescriptor;
        o.f = n(4)
          ? l
          : function (p, d) {
              if (((p = a(p)), (d = u(d, !0)), c))
                try {
                  return l(p, d);
                } catch {}
              if (f(p, d)) return i(!s.f.call(p, d), p[d]);
            };
      },
      function (r, o, n) {
        var s = n(8),
          i = n(63),
          a = n(19)('IE_PROTO'),
          u = Object.prototype;
        r.exports =
          Object.getPrototypeOf ||
          function (f) {
            return (
              (f = i(f)),
              s(f, a)
                ? f[a]
                : typeof f.constructor == 'function' &&
                  f instanceof f.constructor
                ? f.constructor.prototype
                : f instanceof Object
                ? u
                : null
            );
          };
      },
      function (r, o, n) {
        var s = n(8),
          i = n(13),
          a = n(39)(!1),
          u = n(19)('IE_PROTO');
        r.exports = function (f, c) {
          var l,
            p = i(f),
            d = 0,
            h = [];
          for (l in p) l != u && s(p, l) && h.push(l);
          for (; c.length > d; ) s(p, (l = c[d++])) && (~a(h, l) || h.push(l));
          return h;
        };
      },
      function (r, o, n) {
        var s = n(53),
          i = n(22);
        r.exports =
          Object.keys ||
          function (a) {
            return s(a, i);
          };
      },
      function (r, o) {
        o.f = {}.propertyIsEnumerable;
      },
      function (r, o, n) {
        var s = n(5);
        r.exports = function (i, a, u) {
          for (var f in a) u && i[f] ? (i[f] = a[f]) : s(i, f, a[f]);
          return i;
        };
      },
      function (r, o, n) {
        r.exports = n(5);
      },
      function (r, o, n) {
        var s = n(9),
          i = n(3),
          a = function (u, f) {
            if ((i(u), !s(f) && f !== null))
              throw TypeError(f + ": can't set as prototype!");
          };
        r.exports = {
          set:
            Object.setPrototypeOf ||
            ('__proto__' in {}
              ? (function (u, f, c) {
                  try {
                    (c = n(7)(
                      Function.call,
                      n(51).f(Object.prototype, '__proto__').set,
                      2
                    )),
                      c(u, []),
                      (f = !(u instanceof Array));
                  } catch {
                    f = !0;
                  }
                  return function (l, p) {
                    return a(l, p), f ? (l.__proto__ = p) : c(l, p), l;
                  };
                })({}, !1)
              : void 0),
          check: a,
        };
      },
      function (r, o, n) {
        'use strict';
        var s = n(2),
          i = n(6),
          a = n(12),
          u = n(4),
          f = n(1)('species');
        r.exports = function (c) {
          var l = typeof i[c] == 'function' ? i[c] : s[c];
          u &&
            l &&
            !l[f] &&
            a.f(l, f, {
              configurable: !0,
              get: function () {
                return this;
              },
            });
        };
      },
      function (r, o, n) {
        var s = n(3),
          i = n(14),
          a = n(1)('species');
        r.exports = function (u, f) {
          var c,
            l = s(u).constructor;
          return l === void 0 || (c = s(l)[a]) == null ? f : i(c);
        };
      },
      function (r, o, n) {
        var s = n(20),
          i = n(15);
        r.exports = function (a) {
          return function (u, f) {
            var c,
              l,
              p = String(i(u)),
              d = s(f),
              h = p.length;
            return d < 0 || d >= h
              ? a
                ? ''
                : void 0
              : ((c = p.charCodeAt(d)),
                c < 55296 ||
                c > 56319 ||
                d + 1 === h ||
                (l = p.charCodeAt(d + 1)) < 56320 ||
                l > 57343
                  ? a
                    ? p.charAt(d)
                    : c
                  : a
                  ? p.slice(d, d + 2)
                  : ((c - 55296) << 10) + (l - 56320) + 65536);
          };
        };
      },
      function (r, o, n) {
        var s = n(20),
          i = Math.max,
          a = Math.min;
        r.exports = function (u, f) {
          return (u = s(u)), u < 0 ? i(u + f, 0) : a(u, f);
        };
      },
      function (r, o, n) {
        var s = n(15);
        r.exports = function (i) {
          return Object(s(i));
        };
      },
      function (r, o, n) {
        var s = n(21),
          i = n(1)('iterator'),
          a = n(10);
        r.exports = n(6).getIteratorMethod = function (u) {
          if (u != null) return u[i] || u['@@iterator'] || a[s(u)];
        };
      },
      function (r, o, n) {
        'use strict';
        var s = n(37),
          i = n(47),
          a = n(10),
          u = n(13);
        (r.exports = n(27)(
          Array,
          'Array',
          function (f, c) {
            (this._t = u(f)), (this._i = 0), (this._k = c);
          },
          function () {
            var f = this._t,
              c = this._k,
              l = this._i++;
            return !f || l >= f.length
              ? ((this._t = void 0), i(1))
              : c == 'keys'
              ? i(0, l)
              : c == 'values'
              ? i(0, f[l])
              : i(0, [l, f[l]]);
          },
          'values'
        )),
          (a.Arguments = a.Array),
          s('keys'),
          s('values'),
          s('entries');
      },
      function (r, o) {},
      function (r, o, n) {
        'use strict';
        var s,
          i,
          a,
          u = n(28),
          f = n(2),
          c = n(7),
          l = n(21),
          p = n(23),
          d = n(9),
          h = (n(3), n(14)),
          C = n(38),
          y = n(40),
          U = (n(58).set, n(60)),
          T = n(30).set,
          I = n(48)(),
          R = 'Promise',
          b = f.TypeError,
          S = f.process,
          _ = f[R],
          S = f.process,
          w = l(S) == 'process',
          N = function () {},
          L = !!(function () {
            try {
              var m = _.resolve(1),
                v = ((m.constructor = {})[n(1)('species')] = function (E) {
                  E(N, N);
                });
              return (
                (w || typeof PromiseRejectionEvent == 'function') &&
                m.then(N) instanceof v
              );
            } catch {}
          })(),
          K = function (m, v) {
            return m === v || (m === _ && v === a);
          },
          j = function (m) {
            var v;
            return !(!d(m) || typeof (v = m.then) != 'function') && v;
          },
          B = function (m) {
            return K(_, m) ? new W(m) : new i(m);
          },
          W = (i = function (m) {
            var v, E;
            (this.promise = new m(function (O, q) {
              if (v !== void 0 || E !== void 0)
                throw b('Bad Promise constructor');
              (v = O), (E = q);
            })),
              (this.resolve = h(v)),
              (this.reject = h(E));
          }),
          A = function (m) {
            try {
              m();
            } catch (v) {
              return { error: v };
            }
          },
          Y = function (m, v) {
            if (!m._n) {
              m._n = !0;
              var E = m._c;
              I(function () {
                for (
                  var O = m._v,
                    q = m._s == 1,
                    se = 0,
                    le = function (ne) {
                      var re,
                        Le,
                        Ee = q ? ne.ok : ne.fail,
                        ye = ne.resolve,
                        pe = ne.reject,
                        Be = ne.domain;
                      try {
                        Ee
                          ? (q || (m._h == 2 && P(m), (m._h = 1)),
                            Ee === !0
                              ? (re = O)
                              : (Be && Be.enter(),
                                (re = Ee(O)),
                                Be && Be.exit()),
                            re === ne.promise
                              ? pe(b('Promise-chain cycle'))
                              : (Le = j(re))
                              ? Le.call(re, ye, pe)
                              : ye(re))
                          : pe(O);
                      } catch (ho) {
                        pe(ho);
                      }
                    };
                  E.length > se;

                )
                  le(E[se++]);
                (m._c = []), (m._n = !1), v && !m._h && V(m);
              });
            }
          },
          V = function (m) {
            T.call(f, function () {
              var v,
                E,
                O,
                q = m._v;
              if (
                (g(m) &&
                  ((v = A(function () {
                    w
                      ? S.emit('unhandledRejection', q, m)
                      : (E = f.onunhandledrejection)
                      ? E({ promise: m, reason: q })
                      : (O = f.console) &&
                        O.error &&
                        O.error('Unhandled promise rejection', q);
                  })),
                  (m._h = w || g(m) ? 2 : 1)),
                (m._a = void 0),
                v)
              )
                throw v.error;
            });
          },
          g = function (m) {
            if (m._h == 1) return !1;
            for (var v, E = m._a || m._c, O = 0; E.length > O; )
              if (((v = E[O++]), v.fail || !g(v.promise))) return !1;
            return !0;
          },
          P = function (m) {
            T.call(f, function () {
              var v;
              w
                ? S.emit('rejectionHandled', m)
                : (v = f.onrejectionhandled) && v({ promise: m, reason: m._v });
            });
          },
          F = function (m) {
            var v = this;
            v._d ||
              ((v._d = !0),
              (v = v._w || v),
              (v._v = m),
              (v._s = 2),
              v._a || (v._a = v._c.slice()),
              Y(v, !0));
          },
          te = function (m) {
            var v,
              E = this;
            if (!E._d) {
              (E._d = !0), (E = E._w || E);
              try {
                if (E === m) throw b("Promise can't be resolved itself");
                (v = j(m))
                  ? I(function () {
                      var O = { _w: E, _d: !1 };
                      try {
                        v.call(m, c(te, O, 1), c(F, O, 1));
                      } catch (q) {
                        F.call(O, q);
                      }
                    })
                  : ((E._v = m), (E._s = 1), Y(E, !1));
              } catch (O) {
                F.call({ _w: E, _d: !1 }, O);
              }
            }
          };
        L ||
          ((_ = function (m) {
            C(this, _, R, '_h'), h(m), s.call(this);
            try {
              m(c(te, this, 1), c(F, this, 1));
            } catch (v) {
              F.call(this, v);
            }
          }),
          (s = function (m) {
            (this._c = []),
              (this._a = void 0),
              (this._s = 0),
              (this._d = !1),
              (this._v = void 0),
              (this._h = 0),
              (this._n = !1);
          }),
          (s.prototype = n(56)(_.prototype, {
            then: function (m, v) {
              var E = B(U(this, _));
              return (
                (E.ok = typeof m != 'function' || m),
                (E.fail = typeof v == 'function' && v),
                (E.domain = w ? S.domain : void 0),
                this._c.push(E),
                this._a && this._a.push(E),
                this._s && Y(this, !1),
                E.promise
              );
            },
            catch: function (m) {
              return this.then(void 0, m);
            },
          })),
          (W = function () {
            var m = new s();
            (this.promise = m),
              (this.resolve = c(te, m, 1)),
              (this.reject = c(F, m, 1));
          })),
          p(p.G + p.W + p.F * !L, { Promise: _ }),
          n(18)(_, R),
          n(59)(R),
          (a = n(6)[R]),
          p(p.S + p.F * !L, R, {
            reject: function (m) {
              var v = B(this),
                E = v.reject;
              return E(m), v.promise;
            },
          }),
          p(p.S + p.F * (u || !L), R, {
            resolve: function (m) {
              if (m instanceof _ && K(m.constructor, this)) return m;
              var v = B(this),
                E = v.resolve;
              return E(m), v.promise;
            },
          }),
          p(
            p.S +
              p.F *
                !(
                  L &&
                  n(46)(function (m) {
                    _.all(m).catch(N);
                  })
                ),
            R,
            {
              all: function (m) {
                var v = this,
                  E = B(v),
                  O = E.resolve,
                  q = E.reject,
                  se = A(function () {
                    var le = [],
                      ne = 0,
                      re = 1;
                    y(m, !1, function (Le) {
                      var Ee = ne++,
                        ye = !1;
                      le.push(void 0),
                        re++,
                        v.resolve(Le).then(function (pe) {
                          ye || ((ye = !0), (le[Ee] = pe), --re || O(le));
                        }, q);
                    }),
                      --re || O(le);
                  });
                return se && q(se.error), E.promise;
              },
              race: function (m) {
                var v = this,
                  E = B(v),
                  O = E.reject,
                  q = A(function () {
                    y(m, !1, function (se) {
                      v.resolve(se).then(E.resolve, O);
                    });
                  });
                return q && O(q.error), E.promise;
              },
            }
          );
      },
      function (r, o, n) {
        'use strict';
        var s = n(61)(!0);
        n(27)(
          String,
          'String',
          function (i) {
            (this._t = String(i)), (this._i = 0);
          },
          function () {
            var i,
              a = this._t,
              u = this._i;
            return u >= a.length
              ? { value: void 0, done: !0 }
              : ((i = s(a, u)), (this._i += i.length), { value: i, done: !1 });
          }
        );
      },
      function (r, o, n) {
        n(65);
        for (
          var s = n(2),
            i = n(5),
            a = n(10),
            u = n(1)('toStringTag'),
            f = [
              'NodeList',
              'DOMTokenList',
              'MediaList',
              'StyleSheetList',
              'CSSRuleList',
            ],
            c = 0;
          c < 5;
          c++
        ) {
          var l = f[c],
            p = s[l],
            d = p && p.prototype;
          d && !d[u] && i(d, u, l), (a[l] = a.Array);
        }
      },
      function (r, o) {
        r.exports = require('child_process');
      },
      function (r, o) {
        r.exports = require('crypto');
      },
    ]);
  });
});
var gr = {};
Fe(gr, {
  ACCESS_TOKEN: () => Ie,
  DEFAULT_FILE_SIZE_LIMIT: () => Do,
  DISTRIBUTED_TASK_EXECUTION_INTERNAL_ERROR_STATUS_CODE: () => Po,
  ENCRYPTION_KEY: () => Er,
  NO_COMPLETED_TASKS_TIMEOUT: () => Bo,
  NO_MESSAGES_TIMEOUT: () => Lo,
  NUMBER_OF_AXIOS_RETRIES: () => xe,
  NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT: () => qo,
  NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE: () => ko,
  NX_CLOUD_FORCE_METRICS: () => Cr,
  NX_CLOUD_NO_TIMEOUTS: () => Pe,
  NX_CLOUD_UNLIMITED_OUTPUT: () => Mo,
  NX_NO_CLOUD: () => Ho,
  UNLIMITED_FILE_SIZE: () => Fo,
  UNLIMITED_TIMEOUT: () => dt,
  VERBOSE_LOGGING: () => X,
  agentRunningInDistributedExecution: () => Go,
  extractGitRef: () => Vo,
  extractGitSha: () => Te,
  getBranch: () => Rr,
  getCIExecutionEnv: () => lt,
  getCIExecutionId: () => Ko,
  getMachineInfo: () => Wo,
  getRunGroup: () => zo,
  nxInvokedByRunner: () => jo,
  parseCommand: () => Jo,
});
function Go(e) {
  return !!e;
}
function jo() {
  return (
    process.env.NX_INVOKED_BY_RUNNER === 'true' ||
    process.env.NX_CLOUD === 'false'
  );
}
function Te() {
  try {
    return (0, pt.execSync)('git rev-parse HEAD', { stdio: 'pipe' })
      .toString()
      .trim();
  } catch {
    return;
  }
}
function Vo() {
  try {
    return (0, pt.execSync)('git rev-parse --symbolic-full-name HEAD', {
      stdio: 'pipe',
    })
      .toString()
      .trim();
  } catch {
    return;
  }
}
function Xo() {
  try {
    let e = (0, _r.readFileSync)((0, De.join)(Ao, 'nx-cloud.env'));
    return Uo.parse(e);
  } catch {
    return {};
  }
}
function $o() {
  let e = Xo();
  (Ie =
    process.env.NX_CLOUD_AUTH_TOKEN ||
    process.env.NX_CLOUD_ACCESS_TOKEN ||
    e.NX_CLOUD_AUTH_TOKEN ||
    e.NX_CLOUD_ACCESS_TOKEN),
    (Er = process.env.NX_CLOUD_ENCRYPTION_KEY || e.NX_CLOUD_ENCRYPTION_KEY),
    (X =
      process.env.NX_VERBOSE_LOGGING === 'true' ||
      e.NX_VERBOSE_LOGGING === 'true'),
    (Pe =
      process.env.NX_CLOUD_NO_TIMEOUTS === 'true' ||
      e.NX_CLOUD_NO_TIMEOUTS === 'true');
}
function Ko() {
  if (!at()) return yr();
}
function yr() {
  return process.env.NX_CI_EXECUTION_ID !== void 0
    ? process.env.NX_CI_EXECUTION_ID
    : process.env.NX_RUN_GROUP !== void 0
    ? process.env.NX_RUN_GROUP
    : process.env.CIRCLECI !== void 0 && process.env.CIRCLE_WORKFLOW_ID
    ? process.env.CIRCLE_WORKFLOW_ID
    : process.env.TRAVIS_BUILD_ID !== void 0
    ? process.env.TRAVIS_BUILD_ID
    : process.env.GITHUB_ACTIONS && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`
    : process.env.BUILD_BUILDID
    ? process.env.BUILD_BUILDID
    : process.env.BITBUCKET_BUILD_NUMBER !== void 0
    ? process.env.BITBUCKET_BUILD_NUMBER
    : process.env.VERCEL_GIT_COMMIT_SHA !== void 0
    ? process.env.VERCEL_GIT_COMMIT_SHA
    : process.env.CI_PIPELINE_ID
    ? process.env.CI_PIPELINE_ID
    : process.env.BUILD_TAG
    ? process.env.BUILD_TAG
    : null;
}
function lt() {
  if (!at()) return process.env.NX_CI_EXECUTION_ENV ?? '';
}
function zo() {
  if (process.env.NX_RUN_GROUP !== void 0) return process.env.NX_RUN_GROUP;
  let e = yr();
  return e ? (lt() ? `${e}-${lt()}` : e) : Te();
}
function Rr() {
  if (process.env.NX_BRANCH !== void 0) return process.env.NX_BRANCH;
  if (process.env.CIRCLECI !== void 0) {
    if (process.env.CIRCLE_PR_NUMBER !== void 0)
      return process.env.CIRCLE_PR_NUMBER;
    if (process.env.CIRCLE_PULL_REQUEST !== void 0) {
      let e = process.env.CIRCLE_PULL_REQUEST.split('/');
      return e[e.length - 1];
    } else if (process.env.CIRCLE_BRANCH !== void 0)
      return process.env.CIRCLE_BRANCH;
  }
  if (process.env.TRAVIS_PULL_REQUEST !== void 0)
    return process.env.TRAVIS_PULL_REQUEST;
  if (process.env.GITHUB_ACTIONS) {
    if (process.env.GITHUB_REF) {
      let e = process.env.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
      if (e) return e[1];
    }
    return process.env.GITHUB_HEAD_REF ?? '';
  }
  return process.env.BITBUCKET_PR_ID !== void 0
    ? process.env.BITBUCKET_PR_ID
    : process.env.VERCEL_GIT_COMMIT_REF !== void 0
    ? process.env.VERCEL_GIT_COMMIT_REF
    : process.env.CI_MERGE_REQUEST_IID
    ? process.env.CI_MERGE_REQUEST_IID
    : process.env.CI_COMMIT_BRANCH
    ? process.env.CI_COMMIT_BRANCH
    : process.env.GIT_BRANCH
    ? process.env.GIT_BRANCH
    : null;
}
function Wo() {
  let e = require('os'),
    t = (0, vr.createHash)('md5');
  return (
    t.update(No()),
    {
      machineId: t.digest('base64'),
      platform: e.platform(),
      version: e.version ? e.version() : '',
      cpuCores: e.cpus().length,
    }
  );
}
function Jo() {
  let e = (0, De.parse)(process.argv[1]).name,
    t = `${process.argv.slice(2).join(' ')}`;
  return `${e} ${t}`;
}
var pt,
  vr,
  _r,
  De,
  Uo,
  No,
  Ao,
  dt,
  Lo,
  Bo,
  Fo,
  Mo,
  Do,
  Po,
  qo,
  ko,
  Cr,
  xe,
  Ho,
  Ie,
  Er,
  X,
  Pe,
  Oe = Q(() => {
    'use strict';
    (pt = require('child_process')),
      (vr = require('crypto')),
      (_r = require('fs')),
      (De = require('path'));
    cr();
    fr();
    (Uo = hr()),
      ({ machineIdSync: No } = mr()),
      ({ workspaceRoot: Ao } = de()),
      (dt = 9999999),
      (Lo = process.env.NX_CLOUD_AGENT_TIMEOUT_MS
        ? Number(process.env.NX_CLOUD_AGENT_TIMEOUT_MS)
        : 36e5),
      (Bo = process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS
        ? Number(process.env.NX_CLOUD_ORCHESTRATOR_TIMEOUT_MS)
        : 36e5),
      (Fo = 1e3 * 1e3 * 1e4),
      (Mo = process.env.NX_CLOUD_UNLIMITED_OUTPUT === 'true'),
      (Do = 1e3 * 1e3 * 300),
      (Po = 166),
      (qo = process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT
        ? Number(process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_AGENT_COUNT)
        : null),
      (ko =
        process.env.NX_CLOUD_DISTRIBUTED_EXECUTION_STOP_AGENTS_ON_FAILURE !=
        'false'),
      (Cr = process.env.NX_CLOUD_FORCE_METRICS === 'true'),
      (xe = process.env.NX_CLOUD_NUMBER_OF_RETRIES
        ? Number(process.env.NX_CLOUD_NUMBER_OF_RETRIES)
        : ar()
        ? 10
        : 1),
      (Ho = process.env.NX_NO_CLOUD === 'true');
    $o();
  });
function ht(e) {
  return new Promise((t) => {
    setTimeout(() => t(null), e);
  });
}
var xr = Q(() => {
  'use strict';
});
var mt = x((nu, Ir) => {
  'use strict';
  Ir.exports = function (t, r) {
    return function () {
      for (var n = new Array(arguments.length), s = 0; s < n.length; s++)
        n[s] = arguments[s];
      return t.apply(r, n);
    };
  };
});
var H = x((ou, wr) => {
  'use strict';
  var Yo = mt(),
    ue = Object.prototype.toString;
  function Ct(e) {
    return ue.call(e) === '[object Array]';
  }
  function vt(e) {
    return typeof e > 'u';
  }
  function Qo(e) {
    return (
      e !== null &&
      !vt(e) &&
      e.constructor !== null &&
      !vt(e.constructor) &&
      typeof e.constructor.isBuffer == 'function' &&
      e.constructor.isBuffer(e)
    );
  }
  function Zo(e) {
    return ue.call(e) === '[object ArrayBuffer]';
  }
  function es(e) {
    return typeof FormData < 'u' && e instanceof FormData;
  }
  function ts(e) {
    var t;
    return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
        ? (t = ArrayBuffer.isView(e))
        : (t = e && e.buffer && e.buffer instanceof ArrayBuffer),
      t
    );
  }
  function rs(e) {
    return typeof e == 'string';
  }
  function ns(e) {
    return typeof e == 'number';
  }
  function Tr(e) {
    return e !== null && typeof e == 'object';
  }
  function qe(e) {
    if (ue.call(e) !== '[object Object]') return !1;
    var t = Object.getPrototypeOf(e);
    return t === null || t === Object.prototype;
  }
  function os(e) {
    return ue.call(e) === '[object Date]';
  }
  function ss(e) {
    return ue.call(e) === '[object File]';
  }
  function is(e) {
    return ue.call(e) === '[object Blob]';
  }
  function Or(e) {
    return ue.call(e) === '[object Function]';
  }
  function us(e) {
    return Tr(e) && Or(e.pipe);
  }
  function as(e) {
    return typeof URLSearchParams < 'u' && e instanceof URLSearchParams;
  }
  function cs(e) {
    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
  }
  function fs() {
    return typeof navigator < 'u' &&
      (navigator.product === 'ReactNative' ||
        navigator.product === 'NativeScript' ||
        navigator.product === 'NS')
      ? !1
      : typeof window < 'u' && typeof document < 'u';
  }
  function Et(e, t) {
    if (!(e === null || typeof e > 'u'))
      if ((typeof e != 'object' && (e = [e]), Ct(e)))
        for (var r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
      else
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            t.call(null, e[n], n, e);
  }
  function _t() {
    var e = {};
    function t(n, s) {
      qe(e[s]) && qe(n)
        ? (e[s] = _t(e[s], n))
        : qe(n)
        ? (e[s] = _t({}, n))
        : Ct(n)
        ? (e[s] = n.slice())
        : (e[s] = n);
    }
    for (var r = 0, o = arguments.length; r < o; r++) Et(arguments[r], t);
    return e;
  }
  function ls(e, t, r) {
    return (
      Et(t, function (n, s) {
        r && typeof n == 'function' ? (e[s] = Yo(n, r)) : (e[s] = n);
      }),
      e
    );
  }
  function ps(e) {
    return e.charCodeAt(0) === 65279 && (e = e.slice(1)), e;
  }
  wr.exports = {
    isArray: Ct,
    isArrayBuffer: Zo,
    isBuffer: Qo,
    isFormData: es,
    isArrayBufferView: ts,
    isString: rs,
    isNumber: ns,
    isObject: Tr,
    isPlainObject: qe,
    isUndefined: vt,
    isDate: os,
    isFile: ss,
    isBlob: is,
    isFunction: Or,
    isStream: us,
    isURLSearchParams: as,
    isStandardBrowserEnv: fs,
    forEach: Et,
    merge: _t,
    extend: ls,
    trim: cs,
    stripBOM: ps,
  };
});
var ke = x((su, Sr) => {
  'use strict';
  var he = H();
  function br(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  Sr.exports = function (t, r, o) {
    if (!r) return t;
    var n;
    if (o) n = o(r);
    else if (he.isURLSearchParams(r)) n = r.toString();
    else {
      var s = [];
      he.forEach(r, function (u, f) {
        u === null ||
          typeof u > 'u' ||
          (he.isArray(u) ? (f = f + '[]') : (u = [u]),
          he.forEach(u, function (l) {
            he.isDate(l)
              ? (l = l.toISOString())
              : he.isObject(l) && (l = JSON.stringify(l)),
              s.push(br(f) + '=' + br(l));
          }));
      }),
        (n = s.join('&'));
    }
    if (n) {
      var i = t.indexOf('#');
      i !== -1 && (t = t.slice(0, i)),
        (t += (t.indexOf('?') === -1 ? '?' : '&') + n);
    }
    return t;
  };
});
var Nr = x((iu, Ur) => {
  'use strict';
  var ds = H();
  function He() {
    this.handlers = [];
  }
  He.prototype.use = function (t, r, o) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: r,
        synchronous: o ? o.synchronous : !1,
        runWhen: o ? o.runWhen : null,
      }),
      this.handlers.length - 1
    );
  };
  He.prototype.eject = function (t) {
    this.handlers[t] && (this.handlers[t] = null);
  };
  He.prototype.forEach = function (t) {
    ds.forEach(this.handlers, function (o) {
      o !== null && t(o);
    });
  };
  Ur.exports = He;
});
var Lr = x((uu, Ar) => {
  'use strict';
  var hs = H();
  Ar.exports = function (t, r) {
    hs.forEach(t, function (n, s) {
      s !== r &&
        s.toUpperCase() === r.toUpperCase() &&
        ((t[r] = n), delete t[s]);
    });
  };
});
var Ge = x((au, Br) => {
  'use strict';
  Br.exports = function (t, r, o, n, s) {
    return (
      (t.config = r),
      o && (t.code = o),
      (t.request = n),
      (t.response = s),
      (t.isAxiosError = !0),
      (t.toJSON = function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
        };
      }),
      t
    );
  };
});
var je = x((cu, Fr) => {
  'use strict';
  var ms = Ge();
  Fr.exports = function (t, r, o, n, s) {
    var i = new Error(t);
    return ms(i, r, o, n, s);
  };
});
var yt = x((fu, Mr) => {
  'use strict';
  var vs = je();
  Mr.exports = function (t, r, o) {
    var n = o.config.validateStatus;
    !o.status || !n || n(o.status)
      ? t(o)
      : r(
          vs(
            'Request failed with status code ' + o.status,
            o.config,
            null,
            o.request,
            o
          )
        );
  };
});
var Pr = x((lu, Dr) => {
  'use strict';
  var Ve = H();
  Dr.exports = Ve.isStandardBrowserEnv()
    ? (function () {
        return {
          write: function (r, o, n, s, i, a) {
            var u = [];
            u.push(r + '=' + encodeURIComponent(o)),
              Ve.isNumber(n) && u.push('expires=' + new Date(n).toGMTString()),
              Ve.isString(s) && u.push('path=' + s),
              Ve.isString(i) && u.push('domain=' + i),
              a === !0 && u.push('secure'),
              (document.cookie = u.join('; '));
          },
          read: function (r) {
            var o = document.cookie.match(
              new RegExp('(^|;\\s*)(' + r + ')=([^;]*)')
            );
            return o ? decodeURIComponent(o[3]) : null;
          },
          remove: function (r) {
            this.write(r, '', Date.now() - 864e5);
          },
        };
      })()
    : (function () {
        return {
          write: function () {},
          read: function () {
            return null;
          },
          remove: function () {},
        };
      })();
});
var kr = x((pu, qr) => {
  'use strict';
  qr.exports = function (t) {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
  };
});
var Gr = x((du, Hr) => {
  'use strict';
  Hr.exports = function (t, r) {
    return r ? t.replace(/\/+$/, '') + '/' + r.replace(/^\/+/, '') : t;
  };
});
var Rt = x((hu, jr) => {
  'use strict';
  var _s = kr(),
    Cs = Gr();
  jr.exports = function (t, r) {
    return t && !_s(r) ? Cs(t, r) : r;
  };
});
var Xr = x((mu, Vr) => {
  'use strict';
  var gt = H(),
    Es = [
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
    ];
  Vr.exports = function (t) {
    var r = {},
      o,
      n,
      s;
    return (
      t &&
        gt.forEach(
          t.split(`
`),
          function (a) {
            if (
              ((s = a.indexOf(':')),
              (o = gt.trim(a.substr(0, s)).toLowerCase()),
              (n = gt.trim(a.substr(s + 1))),
              o)
            ) {
              if (r[o] && Es.indexOf(o) >= 0) return;
              o === 'set-cookie'
                ? (r[o] = (r[o] ? r[o] : []).concat([n]))
                : (r[o] = r[o] ? r[o] + ', ' + n : n);
            }
          }
        ),
      r
    );
  };
});
var zr = x((vu, Kr) => {
  'use strict';
  var $r = H();
  Kr.exports = $r.isStandardBrowserEnv()
    ? (function () {
        var t = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement('a'),
          o;
        function n(s) {
          var i = s;
          return (
            t && (r.setAttribute('href', i), (i = r.href)),
            r.setAttribute('href', i),
            {
              href: r.href,
              protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
              host: r.host,
              search: r.search ? r.search.replace(/^\?/, '') : '',
              hash: r.hash ? r.hash.replace(/^#/, '') : '',
              hostname: r.hostname,
              port: r.port,
              pathname:
                r.pathname.charAt(0) === '/' ? r.pathname : '/' + r.pathname,
            }
          );
        }
        return (
          (o = n(window.location.href)),
          function (i) {
            var a = $r.isString(i) ? n(i) : i;
            return a.protocol === o.protocol && a.host === o.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })();
});
var Jr = x((_u, Wr) => {
  'use strict';
  var Xe = H(),
    ys = yt(),
    Rs = Pr(),
    gs = ke(),
    xs = Rt(),
    Is = Xr(),
    Ts = zr(),
    xt = je();
  Wr.exports = function (t) {
    return new Promise(function (o, n) {
      var s = t.data,
        i = t.headers,
        a = t.responseType;
      Xe.isFormData(s) && delete i['Content-Type'];
      var u = new XMLHttpRequest();
      if (t.auth) {
        var f = t.auth.username || '',
          c = t.auth.password
            ? unescape(encodeURIComponent(t.auth.password))
            : '';
        i.Authorization = 'Basic ' + btoa(f + ':' + c);
      }
      var l = xs(t.baseURL, t.url);
      u.open(t.method.toUpperCase(), gs(l, t.params, t.paramsSerializer), !0),
        (u.timeout = t.timeout);
      function p() {
        if (u) {
          var h =
              'getAllResponseHeaders' in u
                ? Is(u.getAllResponseHeaders())
                : null,
            C =
              !a || a === 'text' || a === 'json' ? u.responseText : u.response,
            y = {
              data: C,
              status: u.status,
              statusText: u.statusText,
              headers: h,
              config: t,
              request: u,
            };
          ys(o, n, y), (u = null);
        }
      }
      if (
        ('onloadend' in u
          ? (u.onloadend = p)
          : (u.onreadystatechange = function () {
              !u ||
                u.readyState !== 4 ||
                (u.status === 0 &&
                  !(u.responseURL && u.responseURL.indexOf('file:') === 0)) ||
                setTimeout(p);
            }),
        (u.onabort = function () {
          u && (n(xt('Request aborted', t, 'ECONNABORTED', u)), (u = null));
        }),
        (u.onerror = function () {
          n(xt('Network Error', t, null, u)), (u = null);
        }),
        (u.ontimeout = function () {
          var C = 'timeout of ' + t.timeout + 'ms exceeded';
          t.timeoutErrorMessage && (C = t.timeoutErrorMessage),
            n(
              xt(
                C,
                t,
                t.transitional && t.transitional.clarifyTimeoutError
                  ? 'ETIMEDOUT'
                  : 'ECONNABORTED',
                u
              )
            ),
            (u = null);
        }),
        Xe.isStandardBrowserEnv())
      ) {
        var d =
          (t.withCredentials || Ts(l)) && t.xsrfCookieName
            ? Rs.read(t.xsrfCookieName)
            : void 0;
        d && (i[t.xsrfHeaderName] = d);
      }
      'setRequestHeader' in u &&
        Xe.forEach(i, function (C, y) {
          typeof s > 'u' && y.toLowerCase() === 'content-type'
            ? delete i[y]
            : u.setRequestHeader(y, C);
        }),
        Xe.isUndefined(t.withCredentials) ||
          (u.withCredentials = !!t.withCredentials),
        a && a !== 'json' && (u.responseType = t.responseType),
        typeof t.onDownloadProgress == 'function' &&
          u.addEventListener('progress', t.onDownloadProgress),
        typeof t.onUploadProgress == 'function' &&
          u.upload &&
          u.upload.addEventListener('progress', t.onUploadProgress),
        t.cancelToken &&
          t.cancelToken.promise.then(function (C) {
            u && (u.abort(), n(C), (u = null));
          }),
        s || (s = null),
        u.send(s);
    });
  };
});
var Qr = x((Cu, Yr) => {
  var me = 1e3,
    ve = me * 60,
    _e = ve * 60,
    ae = _e * 24,
    Os = ae * 7,
    ws = ae * 365.25;
  Yr.exports = function (e, t) {
    t = t || {};
    var r = typeof e;
    if (r === 'string' && e.length > 0) return bs(e);
    if (r === 'number' && isFinite(e)) return t.long ? Us(e) : Ss(e);
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(e)
    );
  };
  function bs(e) {
    if (((e = String(e)), !(e.length > 100))) {
      var t =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          e
        );
      if (t) {
        var r = parseFloat(t[1]),
          o = (t[2] || 'ms').toLowerCase();
        switch (o) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return r * ws;
          case 'weeks':
          case 'week':
          case 'w':
            return r * Os;
          case 'days':
          case 'day':
          case 'd':
            return r * ae;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return r * _e;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return r * ve;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return r * me;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return r;
          default:
            return;
        }
      }
    }
  }
  function Ss(e) {
    var t = Math.abs(e);
    return t >= ae
      ? Math.round(e / ae) + 'd'
      : t >= _e
      ? Math.round(e / _e) + 'h'
      : t >= ve
      ? Math.round(e / ve) + 'm'
      : t >= me
      ? Math.round(e / me) + 's'
      : e + 'ms';
  }
  function Us(e) {
    var t = Math.abs(e);
    return t >= ae
      ? $e(e, t, ae, 'day')
      : t >= _e
      ? $e(e, t, _e, 'hour')
      : t >= ve
      ? $e(e, t, ve, 'minute')
      : t >= me
      ? $e(e, t, me, 'second')
      : e + ' ms';
  }
  function $e(e, t, r, o) {
    var n = t >= r * 1.5;
    return Math.round(e / r) + ' ' + o + (n ? 's' : '');
  }
});
var It = x((Eu, Zr) => {
  function Ns(e) {
    (r.debug = r),
      (r.default = r),
      (r.coerce = u),
      (r.disable = s),
      (r.enable = n),
      (r.enabled = i),
      (r.humanize = Qr()),
      (r.destroy = f),
      Object.keys(e).forEach((c) => {
        r[c] = e[c];
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {});
    function t(c) {
      let l = 0;
      for (let p = 0; p < c.length; p++)
        (l = (l << 5) - l + c.charCodeAt(p)), (l |= 0);
      return r.colors[Math.abs(l) % r.colors.length];
    }
    r.selectColor = t;
    function r(c) {
      let l,
        p = null,
        d,
        h;
      function C(...y) {
        if (!C.enabled) return;
        let U = C,
          T = Number(new Date()),
          I = T - (l || T);
        (U.diff = I),
          (U.prev = l),
          (U.curr = T),
          (l = T),
          (y[0] = r.coerce(y[0])),
          typeof y[0] != 'string' && y.unshift('%O');
        let R = 0;
        (y[0] = y[0].replace(/%([a-zA-Z%])/g, (_, S) => {
          if (_ === '%%') return '%';
          R++;
          let w = r.formatters[S];
          if (typeof w == 'function') {
            let N = y[R];
            (_ = w.call(U, N)), y.splice(R, 1), R--;
          }
          return _;
        })),
          r.formatArgs.call(U, y),
          (U.log || r.log).apply(U, y);
      }
      return (
        (C.namespace = c),
        (C.useColors = r.useColors()),
        (C.color = r.selectColor(c)),
        (C.extend = o),
        (C.destroy = r.destroy),
        Object.defineProperty(C, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () =>
            p !== null
              ? p
              : (d !== r.namespaces && ((d = r.namespaces), (h = r.enabled(c))),
                h),
          set: (y) => {
            p = y;
          },
        }),
        typeof r.init == 'function' && r.init(C),
        C
      );
    }
    function o(c, l) {
      let p = r(this.namespace + (typeof l > 'u' ? ':' : l) + c);
      return (p.log = this.log), p;
    }
    function n(c) {
      r.save(c), (r.namespaces = c), (r.names = []), (r.skips = []);
      let l,
        p = (typeof c == 'string' ? c : '').split(/[\s,]+/),
        d = p.length;
      for (l = 0; l < d; l++)
        p[l] &&
          ((c = p[l].replace(/\*/g, '.*?')),
          c[0] === '-'
            ? r.skips.push(new RegExp('^' + c.slice(1) + '$'))
            : r.names.push(new RegExp('^' + c + '$')));
    }
    function s() {
      let c = [...r.names.map(a), ...r.skips.map(a).map((l) => '-' + l)].join(
        ','
      );
      return r.enable(''), c;
    }
    function i(c) {
      if (c[c.length - 1] === '*') return !0;
      let l, p;
      for (l = 0, p = r.skips.length; l < p; l++)
        if (r.skips[l].test(c)) return !1;
      for (l = 0, p = r.names.length; l < p; l++)
        if (r.names[l].test(c)) return !0;
      return !1;
    }
    function a(c) {
      return c
        .toString()
        .substring(2, c.toString().length - 2)
        .replace(/\.\*\?$/, '*');
    }
    function u(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function f() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
      );
    }
    return r.enable(r.load()), r;
  }
  Zr.exports = Ns;
});
var en = x((z, Ke) => {
  z.formatArgs = Ls;
  z.save = Bs;
  z.load = Fs;
  z.useColors = As;
  z.storage = Ms();
  z.destroy = (() => {
    let e = !1;
    return () => {
      e ||
        ((e = !0),
        console.warn(
          'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
        ));
    };
  })();
  z.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33',
  ];
  function As() {
    return typeof window < 'u' &&
      window.process &&
      (window.process.type === 'renderer' || window.process.__nwjs)
      ? !0
      : typeof navigator < 'u' &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < 'u' &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < 'u' &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < 'u' &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function Ls(e) {
    if (
      ((e[0] =
        (this.useColors ? '%c' : '') +
        this.namespace +
        (this.useColors ? ' %c' : ' ') +
        e[0] +
        (this.useColors ? '%c ' : ' ') +
        '+' +
        Ke.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    let t = 'color: ' + this.color;
    e.splice(1, 0, t, 'color: inherit');
    let r = 0,
      o = 0;
    e[0].replace(/%[a-zA-Z%]/g, (n) => {
      n !== '%%' && (r++, n === '%c' && (o = r));
    }),
      e.splice(o, 0, t);
  }
  z.log = console.debug || console.log || (() => {});
  function Bs(e) {
    try {
      e ? z.storage.setItem('debug', e) : z.storage.removeItem('debug');
    } catch {}
  }
  function Fs() {
    let e;
    try {
      e = z.storage.getItem('debug');
    } catch {}
    return (
      !e && typeof process < 'u' && 'env' in process && (e = process.env.DEBUG),
      e
    );
  }
  function Ms() {
    try {
      return localStorage;
    } catch {}
  }
  Ke.exports = It()(z);
  var { formatters: Ds } = Ke.exports;
  Ds.j = function (e) {
    try {
      return JSON.stringify(e);
    } catch (t) {
      return '[UnexpectedJSONParseError]: ' + t.message;
    }
  };
});
var rn = x((yu, tn) => {
  'use strict';
  tn.exports = (e, t = process.argv) => {
    let r = e.startsWith('-') ? '' : e.length === 1 ? '-' : '--',
      o = t.indexOf(r + e),
      n = t.indexOf('--');
    return o !== -1 && (n === -1 || o < n);
  };
});
var sn = x((Ru, on) => {
  'use strict';
  var Ps = require('os'),
    nn = require('tty'),
    J = rn(),
    { env: M } = process,
    oe;
  J('no-color') || J('no-colors') || J('color=false') || J('color=never')
    ? (oe = 0)
    : (J('color') || J('colors') || J('color=true') || J('color=always')) &&
      (oe = 1);
  'FORCE_COLOR' in M &&
    (M.FORCE_COLOR === 'true'
      ? (oe = 1)
      : M.FORCE_COLOR === 'false'
      ? (oe = 0)
      : (oe =
          M.FORCE_COLOR.length === 0
            ? 1
            : Math.min(parseInt(M.FORCE_COLOR, 10), 3)));
  function Tt(e) {
    return e === 0
      ? !1
      : { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 };
  }
  function Ot(e, t) {
    if (oe === 0) return 0;
    if (J('color=16m') || J('color=full') || J('color=truecolor')) return 3;
    if (J('color=256')) return 2;
    if (e && !t && oe === void 0) return 0;
    let r = oe || 0;
    if (M.TERM === 'dumb') return r;
    if (process.platform === 'win32') {
      let o = Ps.release().split('.');
      return Number(o[0]) >= 10 && Number(o[2]) >= 10586
        ? Number(o[2]) >= 14931
          ? 3
          : 2
        : 1;
    }
    if ('CI' in M)
      return [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
      ].some((o) => o in M) || M.CI_NAME === 'codeship'
        ? 1
        : r;
    if ('TEAMCITY_VERSION' in M)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(M.TEAMCITY_VERSION) ? 1 : 0;
    if (M.COLORTERM === 'truecolor') return 3;
    if ('TERM_PROGRAM' in M) {
      let o = parseInt((M.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
      switch (M.TERM_PROGRAM) {
        case 'iTerm.app':
          return o >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
      }
    }
    return /-256(color)?$/i.test(M.TERM)
      ? 2
      : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
          M.TERM
        ) || 'COLORTERM' in M
      ? 1
      : r;
  }
  function qs(e) {
    let t = Ot(e, e && e.isTTY);
    return Tt(t);
  }
  on.exports = {
    supportsColor: qs,
    stdout: Tt(Ot(!0, nn.isatty(1))),
    stderr: Tt(Ot(!0, nn.isatty(2))),
  };
});
var an = x((D, We) => {
  var ks = require('tty'),
    ze = require('util');
  D.init = Ks;
  D.log = Vs;
  D.formatArgs = Gs;
  D.save = Xs;
  D.load = $s;
  D.useColors = Hs;
  D.destroy = ze.deprecate(() => {},
  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  D.colors = [6, 2, 3, 4, 5, 1];
  try {
    let e = sn();
    e &&
      (e.stderr || e).level >= 2 &&
      (D.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
        68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
        129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
        169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
        201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
      ]);
  } catch {}
  D.inspectOpts = Object.keys(process.env)
    .filter((e) => /^debug_/i.test(e))
    .reduce((e, t) => {
      let r = t
          .substring(6)
          .toLowerCase()
          .replace(/_([a-z])/g, (n, s) => s.toUpperCase()),
        o = process.env[t];
      return (
        /^(yes|on|true|enabled)$/i.test(o)
          ? (o = !0)
          : /^(no|off|false|disabled)$/i.test(o)
          ? (o = !1)
          : o === 'null'
          ? (o = null)
          : (o = Number(o)),
        (e[r] = o),
        e
      );
    }, {});
  function Hs() {
    return 'colors' in D.inspectOpts
      ? !!D.inspectOpts.colors
      : ks.isatty(process.stderr.fd);
  }
  function Gs(e) {
    let { namespace: t, useColors: r } = this;
    if (r) {
      let o = this.color,
        n = '\x1B[3' + (o < 8 ? o : '8;5;' + o),
        s = `  ${n};1m${t} \x1B[0m`;
      (e[0] =
        s +
        e[0]
          .split(
            `
`
          )
          .join(
            `
` + s
          )),
        e.push(n + 'm+' + We.exports.humanize(this.diff) + '\x1B[0m');
    } else e[0] = js() + t + ' ' + e[0];
  }
  function js() {
    return D.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
  }
  function Vs(...e) {
    return process.stderr.write(
      ze.format(...e) +
        `
`
    );
  }
  function Xs(e) {
    e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
  }
  function $s() {
    return process.env.DEBUG;
  }
  function Ks(e) {
    e.inspectOpts = {};
    let t = Object.keys(D.inspectOpts);
    for (let r = 0; r < t.length; r++)
      e.inspectOpts[t[r]] = D.inspectOpts[t[r]];
  }
  We.exports = It()(D);
  var { formatters: un } = We.exports;
  un.o = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      ze
        .inspect(e, this.inspectOpts)
        .split(
          `
`
        )
        .map((t) => t.trim())
        .join(' ')
    );
  };
  un.O = function (e) {
    return (
      (this.inspectOpts.colors = this.useColors),
      ze.inspect(e, this.inspectOpts)
    );
  };
});
var cn = x((gu, wt) => {
  typeof process > 'u' ||
  process.type === 'renderer' ||
  process.browser === !0 ||
  process.__nwjs
    ? (wt.exports = en())
    : (wt.exports = an());
});
var ln = x((xu, fn) => {
  var we;
  fn.exports = function () {
    if (!we) {
      try {
        we = cn()('follow-redirects');
      } catch {}
      typeof we != 'function' && (we = function () {});
    }
    we.apply(null, arguments);
  };
});
var Ft = x((Iu, Bt) => {
  var ce = require('url'),
    bt = ce.URL,
    zs = require('http'),
    Ws = require('https'),
    Ut = require('stream').Writable,
    hn = require('assert'),
    mn = ln(),
    Nt = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'],
    At = Object.create(null);
  Nt.forEach(function (e) {
    At[e] = function (t, r, o) {
      this._redirectable.emit(e, t, r, o);
    };
  });
  var Js = Se('ERR_INVALID_URL', 'Invalid URL', TypeError),
    pn = Se('ERR_FR_REDIRECTION_FAILURE', 'Redirected request failed'),
    Ys = Se(
      'ERR_FR_TOO_MANY_REDIRECTS',
      'Maximum number of redirects exceeded'
    ),
    Qs = Se(
      'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
      'Request body larger than maxBodyLength limit'
    ),
    Zs = Se('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
    ei = Ut.prototype.destroy || _n;
  function $(e, t) {
    Ut.call(this),
      this._sanitizeOptions(e),
      (this._options = e),
      (this._ended = !1),
      (this._ending = !1),
      (this._redirectCount = 0),
      (this._redirects = []),
      (this._requestBodyLength = 0),
      (this._requestBodyBuffers = []),
      t && this.on('response', t);
    var r = this;
    (this._onNativeResponse = function (o) {
      r._processResponse(o);
    }),
      this._performRequest();
  }
  $.prototype = Object.create(Ut.prototype);
  $.prototype.abort = function () {
    Lt(this._currentRequest), this._currentRequest.abort(), this.emit('abort');
  };
  $.prototype.destroy = function (e) {
    return Lt(this._currentRequest, e), ei.call(this, e), this;
  };
  $.prototype.write = function (e, t, r) {
    if (this._ending) throw new Zs();
    if (!fe(e) && !ri(e))
      throw new TypeError('data should be a string, Buffer or Uint8Array');
    if ((be(t) && ((r = t), (t = null)), e.length === 0)) {
      r && r();
      return;
    }
    this._requestBodyLength + e.length <= this._options.maxBodyLength
      ? ((this._requestBodyLength += e.length),
        this._requestBodyBuffers.push({ data: e, encoding: t }),
        this._currentRequest.write(e, t, r))
      : (this.emit('error', new Qs()), this.abort());
  };
  $.prototype.end = function (e, t, r) {
    if (
      (be(e) ? ((r = e), (e = t = null)) : be(t) && ((r = t), (t = null)), !e)
    )
      (this._ended = this._ending = !0),
        this._currentRequest.end(null, null, r);
    else {
      var o = this,
        n = this._currentRequest;
      this.write(e, t, function () {
        (o._ended = !0), n.end(null, null, r);
      }),
        (this._ending = !0);
    }
  };
  $.prototype.setHeader = function (e, t) {
    (this._options.headers[e] = t), this._currentRequest.setHeader(e, t);
  };
  $.prototype.removeHeader = function (e) {
    delete this._options.headers[e], this._currentRequest.removeHeader(e);
  };
  $.prototype.setTimeout = function (e, t) {
    var r = this;
    function o(i) {
      i.setTimeout(e),
        i.removeListener('timeout', i.destroy),
        i.addListener('timeout', i.destroy);
    }
    function n(i) {
      r._timeout && clearTimeout(r._timeout),
        (r._timeout = setTimeout(function () {
          r.emit('timeout'), s();
        }, e)),
        o(i);
    }
    function s() {
      r._timeout && (clearTimeout(r._timeout), (r._timeout = null)),
        r.removeListener('abort', s),
        r.removeListener('error', s),
        r.removeListener('response', s),
        r.removeListener('close', s),
        t && r.removeListener('timeout', t),
        r.socket || r._currentRequest.removeListener('socket', n);
    }
    return (
      t && this.on('timeout', t),
      this.socket ? n(this.socket) : this._currentRequest.once('socket', n),
      this.on('socket', o),
      this.on('abort', s),
      this.on('error', s),
      this.on('response', s),
      this.on('close', s),
      this
    );
  };
  ['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(
    function (e) {
      $.prototype[e] = function (t, r) {
        return this._currentRequest[e](t, r);
      };
    }
  );
  ['aborted', 'connection', 'socket'].forEach(function (e) {
    Object.defineProperty($.prototype, e, {
      get: function () {
        return this._currentRequest[e];
      },
    });
  });
  $.prototype._sanitizeOptions = function (e) {
    if (
      (e.headers || (e.headers = {}),
      e.host && (e.hostname || (e.hostname = e.host), delete e.host),
      !e.pathname && e.path)
    ) {
      var t = e.path.indexOf('?');
      t < 0
        ? (e.pathname = e.path)
        : ((e.pathname = e.path.substring(0, t)),
          (e.search = e.path.substring(t)));
    }
  };
  $.prototype._performRequest = function () {
    var e = this._options.protocol,
      t = this._options.nativeProtocols[e];
    if (!t) {
      this.emit('error', new TypeError('Unsupported protocol ' + e));
      return;
    }
    if (this._options.agents) {
      var r = e.slice(0, -1);
      this._options.agent = this._options.agents[r];
    }
    var o = (this._currentRequest = t.request(
      this._options,
      this._onNativeResponse
    ));
    o._redirectable = this;
    for (var n of Nt) o.on(n, At[n]);
    if (
      ((this._currentUrl = /^\//.test(this._options.path)
        ? ce.format(this._options)
        : this._options.path),
      this._isRedirect)
    ) {
      var s = 0,
        i = this,
        a = this._requestBodyBuffers;
      (function u(f) {
        if (o === i._currentRequest)
          if (f) i.emit('error', f);
          else if (s < a.length) {
            var c = a[s++];
            o.finished || o.write(c.data, c.encoding, u);
          } else i._ended && o.end();
      })();
    }
  };
  $.prototype._processResponse = function (e) {
    var t = e.statusCode;
    this._options.trackRedirects &&
      this._redirects.push({
        url: this._currentUrl,
        headers: e.headers,
        statusCode: t,
      });
    var r = e.headers.location;
    if (!r || this._options.followRedirects === !1 || t < 300 || t >= 400) {
      (e.responseUrl = this._currentUrl),
        (e.redirects = this._redirects),
        this.emit('response', e),
        (this._requestBodyBuffers = []);
      return;
    }
    if (
      (Lt(this._currentRequest),
      e.destroy(),
      ++this._redirectCount > this._options.maxRedirects)
    ) {
      this.emit('error', new Ys());
      return;
    }
    var o,
      n = this._options.beforeRedirect;
    n &&
      (o = Object.assign(
        { Host: e.req.getHeader('host') },
        this._options.headers
      ));
    var s = this._options.method;
    (((t === 301 || t === 302) && this._options.method === 'POST') ||
      (t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method))) &&
      ((this._options.method = 'GET'),
      (this._requestBodyBuffers = []),
      St(/^content-/i, this._options.headers));
    var i = St(/^host$/i, this._options.headers),
      a = ce.parse(this._currentUrl),
      u = i || a.host,
      f = /^\w+:/.test(r)
        ? this._currentUrl
        : ce.format(Object.assign(a, { host: u })),
      c;
    try {
      c = ce.resolve(f, r);
    } catch (h) {
      this.emit('error', new pn({ cause: h }));
      return;
    }
    mn('redirecting to', c), (this._isRedirect = !0);
    var l = ce.parse(c);
    if (
      (Object.assign(this._options, l),
      ((l.protocol !== a.protocol && l.protocol !== 'https:') ||
        (l.host !== u && !ti(l.host, u))) &&
        St(/^(?:authorization|cookie)$/i, this._options.headers),
      be(n))
    ) {
      var p = { headers: e.headers, statusCode: t },
        d = { url: f, method: s, headers: o };
      try {
        n(this._options, p, d);
      } catch (h) {
        this.emit('error', h);
        return;
      }
      this._sanitizeOptions(this._options);
    }
    try {
      this._performRequest();
    } catch (h) {
      this.emit('error', new pn({ cause: h }));
    }
  };
  function vn(e) {
    var t = { maxRedirects: 21, maxBodyLength: 10485760 },
      r = {};
    return (
      Object.keys(e).forEach(function (o) {
        var n = o + ':',
          s = (r[n] = e[o]),
          i = (t[o] = Object.create(s));
        function a(f, c, l) {
          if (fe(f)) {
            var p;
            try {
              p = dn(new bt(f));
            } catch {
              p = ce.parse(f);
            }
            if (!fe(p.protocol)) throw new Js({ input: f });
            f = p;
          } else bt && f instanceof bt ? (f = dn(f)) : ((l = c), (c = f), (f = { protocol: n }));
          return (
            be(c) && ((l = c), (c = null)),
            (c = Object.assign(
              { maxRedirects: t.maxRedirects, maxBodyLength: t.maxBodyLength },
              f,
              c
            )),
            (c.nativeProtocols = r),
            !fe(c.host) && !fe(c.hostname) && (c.hostname = '::1'),
            hn.equal(c.protocol, n, 'protocol mismatch'),
            mn('options', c),
            new $(c, l)
          );
        }
        function u(f, c, l) {
          var p = i.request(f, c, l);
          return p.end(), p;
        }
        Object.defineProperties(i, {
          request: { value: a, configurable: !0, enumerable: !0, writable: !0 },
          get: { value: u, configurable: !0, enumerable: !0, writable: !0 },
        });
      }),
      t
    );
  }
  function _n() {}
  function dn(e) {
    var t = {
      protocol: e.protocol,
      hostname: e.hostname.startsWith('[')
        ? e.hostname.slice(1, -1)
        : e.hostname,
      hash: e.hash,
      search: e.search,
      pathname: e.pathname,
      path: e.pathname + e.search,
      href: e.href,
    };
    return e.port !== '' && (t.port = Number(e.port)), t;
  }
  function St(e, t) {
    var r;
    for (var o in t) e.test(o) && ((r = t[o]), delete t[o]);
    return r === null || typeof r > 'u' ? void 0 : String(r).trim();
  }
  function Se(e, t, r) {
    function o(n) {
      Error.captureStackTrace(this, this.constructor),
        Object.assign(this, n || {}),
        (this.code = e),
        (this.message = this.cause ? t + ': ' + this.cause.message : t);
    }
    return (
      (o.prototype = new (r || Error)()),
      (o.prototype.constructor = o),
      (o.prototype.name = 'Error [' + e + ']'),
      o
    );
  }
  function Lt(e, t) {
    for (var r of Nt) e.removeListener(r, At[r]);
    e.on('error', _n), e.destroy(t);
  }
  function ti(e, t) {
    hn(fe(e) && fe(t));
    var r = e.length - t.length - 1;
    return r > 0 && e[r] === '.' && e.endsWith(t);
  }
  function fe(e) {
    return typeof e == 'string' || e instanceof String;
  }
  function be(e) {
    return typeof e == 'function';
  }
  function ri(e) {
    return typeof e == 'object' && 'length' in e;
  }
  Bt.exports = vn({ http: zs, https: Ws });
  Bt.exports.wrap = vn;
});
var Mt = x((Tu, ni) => {
  ni.exports = {
    name: 'axios',
    version: '0.21.2',
    description: 'Promise based HTTP client for the browser and node.js',
    main: 'index.js',
    scripts: {
      test: 'grunt test',
      start: 'node ./sandbox/server.js',
      build: 'NODE_ENV=production grunt build',
      preversion: 'npm test',
      version:
        'npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json',
      postversion: 'git push && git push --tags',
      examples: 'node ./examples/server.js',
      coveralls:
        'cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
      fix: 'eslint --fix lib/**/*.js',
    },
    repository: { type: 'git', url: 'https://github.com/axios/axios.git' },
    keywords: ['xhr', 'http', 'ajax', 'promise', 'node'],
    author: 'Matt Zabriskie',
    license: 'MIT',
    bugs: { url: 'https://github.com/axios/axios/issues' },
    homepage: 'https://axios-http.com',
    devDependencies: {
      coveralls: '^3.0.0',
      'es6-promise': '^4.2.4',
      grunt: '^1.3.0',
      'grunt-banner': '^0.6.0',
      'grunt-cli': '^1.2.0',
      'grunt-contrib-clean': '^1.1.0',
      'grunt-contrib-watch': '^1.0.0',
      'grunt-eslint': '^23.0.0',
      'grunt-karma': '^4.0.0',
      'grunt-mocha-test': '^0.13.3',
      'grunt-ts': '^6.0.0-beta.19',
      'grunt-webpack': '^4.0.2',
      'istanbul-instrumenter-loader': '^1.0.0',
      'jasmine-core': '^2.4.1',
      karma: '^6.3.2',
      'karma-chrome-launcher': '^3.1.0',
      'karma-firefox-launcher': '^2.1.0',
      'karma-jasmine': '^1.1.1',
      'karma-jasmine-ajax': '^0.1.13',
      'karma-safari-launcher': '^1.0.0',
      'karma-sauce-launcher': '^4.3.6',
      'karma-sinon': '^1.0.5',
      'karma-sourcemap-loader': '^0.3.8',
      'karma-webpack': '^4.0.2',
      'load-grunt-tasks': '^3.5.2',
      minimist: '^1.2.0',
      mocha: '^8.2.1',
      sinon: '^4.5.0',
      'terser-webpack-plugin': '^4.2.3',
      typescript: '^4.0.5',
      'url-search-params': '^0.10.0',
      webpack: '^4.44.2',
      'webpack-dev-server': '^3.11.0',
    },
    browser: { './lib/adapters/http.js': './lib/adapters/xhr.js' },
    jsdelivr: 'dist/axios.min.js',
    unpkg: 'dist/axios.min.js',
    typings: './index.d.ts',
    dependencies: { 'follow-redirects': '^1.14.0' },
    bundlesize: [{ path: './dist/axios.min.js', threshold: '5kB' }],
  };
});
var xn = x((Ou, gn) => {
  'use strict';
  var Ue = H(),
    Cn = yt(),
    oi = Rt(),
    si = ke(),
    ii = require('http'),
    ui = require('https'),
    ai = Ft().http,
    ci = Ft().https,
    En = require('url'),
    fi = require('zlib'),
    li = Mt(),
    Je = je(),
    Dt = Ge(),
    yn = /https:?/;
  function Rn(e, t, r) {
    if (
      ((e.hostname = t.host),
      (e.host = t.host),
      (e.port = t.port),
      (e.path = r),
      t.auth)
    ) {
      var o = Buffer.from(
        t.auth.username + ':' + t.auth.password,
        'utf8'
      ).toString('base64');
      e.headers['Proxy-Authorization'] = 'Basic ' + o;
    }
    e.beforeRedirect = function (s) {
      (s.headers.host = s.host), Rn(s, t, s.href);
    };
  }
  gn.exports = function (t) {
    return new Promise(function (o, n) {
      var s = function (g) {
          o(g);
        },
        i = function (g) {
          n(g);
        },
        a = t.data,
        u = t.headers;
      if (
        ('User-Agent' in u || 'user-agent' in u
          ? !u['User-Agent'] &&
            !u['user-agent'] &&
            (delete u['User-Agent'], delete u['user-agent'])
          : (u['User-Agent'] = 'axios/' + li.version),
        a && !Ue.isStream(a))
      ) {
        if (!Buffer.isBuffer(a))
          if (Ue.isArrayBuffer(a)) a = Buffer.from(new Uint8Array(a));
          else if (Ue.isString(a)) a = Buffer.from(a, 'utf-8');
          else
            return i(
              Je(
                'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                t
              )
            );
        u['Content-Length'] = a.length;
      }
      var f = void 0;
      if (t.auth) {
        var c = t.auth.username || '',
          l = t.auth.password || '';
        f = c + ':' + l;
      }
      var p = oi(t.baseURL, t.url),
        d = En.parse(p),
        h = d.protocol || 'http:';
      if (!f && d.auth) {
        var C = d.auth.split(':'),
          y = C[0] || '',
          U = C[1] || '';
        f = y + ':' + U;
      }
      f && delete u.Authorization;
      var T = yn.test(h),
        I = T ? t.httpsAgent : t.httpAgent,
        R = {
          path: si(d.path, t.params, t.paramsSerializer).replace(/^\?/, ''),
          method: t.method.toUpperCase(),
          headers: u,
          agent: I,
          agents: { http: t.httpAgent, https: t.httpsAgent },
          auth: f,
        };
      t.socketPath
        ? (R.socketPath = t.socketPath)
        : ((R.hostname = d.hostname), (R.port = d.port));
      var b = t.proxy;
      if (!b && b !== !1) {
        var _ = h.slice(0, -1) + '_proxy',
          S = process.env[_] || process.env[_.toUpperCase()];
        if (S) {
          var w = En.parse(S),
            N = process.env.no_proxy || process.env.NO_PROXY,
            L = !0;
          if (N) {
            var K = N.split(',').map(function (g) {
              return g.trim();
            });
            L = !K.some(function (g) {
              return g
                ? g === '*' ||
                  (g[0] === '.' &&
                    d.hostname.substr(d.hostname.length - g.length) === g)
                  ? !0
                  : d.hostname === g
                : !1;
            });
          }
          if (
            L &&
            ((b = { host: w.hostname, port: w.port, protocol: w.protocol }),
            w.auth)
          ) {
            var j = w.auth.split(':');
            b.auth = { username: j[0], password: j[1] };
          }
        }
      }
      b &&
        ((R.headers.host = d.hostname + (d.port ? ':' + d.port : '')),
        Rn(
          R,
          b,
          h + '//' + d.hostname + (d.port ? ':' + d.port : '') + R.path
        ));
      var B,
        W = T && (b ? yn.test(b.protocol) : !0);
      t.transport
        ? (B = t.transport)
        : t.maxRedirects === 0
        ? (B = W ? ui : ii)
        : (t.maxRedirects && (R.maxRedirects = t.maxRedirects),
          (B = W ? ci : ai)),
        t.maxBodyLength > -1 && (R.maxBodyLength = t.maxBodyLength);
      var A = B.request(R, function (g) {
        if (!A.aborted) {
          var P = g,
            F = g.req || A;
          if (
            g.statusCode !== 204 &&
            F.method !== 'HEAD' &&
            t.decompress !== !1
          )
            switch (g.headers['content-encoding']) {
              case 'gzip':
              case 'compress':
              case 'deflate':
                (P = P.pipe(fi.createUnzip())),
                  delete g.headers['content-encoding'];
                break;
            }
          var te = {
            status: g.statusCode,
            statusText: g.statusMessage,
            headers: g.headers,
            config: t,
            request: F,
          };
          if (t.responseType === 'stream') (te.data = P), Cn(s, i, te);
          else {
            var m = [],
              v = 0;
            P.on('data', function (O) {
              m.push(O),
                (v += O.length),
                t.maxContentLength > -1 &&
                  v > t.maxContentLength &&
                  (P.destroy(),
                  i(
                    Je(
                      'maxContentLength size of ' +
                        t.maxContentLength +
                        ' exceeded',
                      t,
                      null,
                      F
                    )
                  ));
            }),
              P.on('error', function (O) {
                A.aborted || i(Dt(O, t, null, F));
              }),
              P.on('end', function () {
                var O = Buffer.concat(m);
                t.responseType !== 'arraybuffer' &&
                  ((O = O.toString(t.responseEncoding)),
                  (!t.responseEncoding || t.responseEncoding === 'utf8') &&
                    (O = Ue.stripBOM(O))),
                  (te.data = O),
                  Cn(s, i, te);
              });
          }
        }
      });
      if (
        (A.on('error', function (g) {
          (A.aborted && g.code !== 'ERR_FR_TOO_MANY_REDIRECTS') ||
            i(Dt(g, t, null, A));
        }),
        t.timeout)
      ) {
        var Y = parseInt(t.timeout, 10);
        if (isNaN(Y)) {
          i(
            Je(
              'error trying to parse `config.timeout` to int',
              t,
              'ERR_PARSE_TIMEOUT',
              A
            )
          );
          return;
        }
        A.setTimeout(Y, function () {
          A.abort(),
            i(
              Je(
                'timeout of ' + Y + 'ms exceeded',
                t,
                t.transitional && t.transitional.clarifyTimeoutError
                  ? 'ETIMEDOUT'
                  : 'ECONNABORTED',
                A
              )
            );
        });
      }
      t.cancelToken &&
        t.cancelToken.promise.then(function (g) {
          A.aborted || (A.abort(), i(g));
        }),
        Ue.isStream(a)
          ? a
              .on('error', function (g) {
                i(Dt(g, t, null, A));
              })
              .pipe(A)
          : A.end(a);
    });
  };
});
var Qe = x((wu, On) => {
  'use strict';
  var G = H(),
    In = Lr(),
    pi = Ge(),
    di = { 'Content-Type': 'application/x-www-form-urlencoded' };
  function Tn(e, t) {
    !G.isUndefined(e) &&
      G.isUndefined(e['Content-Type']) &&
      (e['Content-Type'] = t);
  }
  function hi() {
    var e;
    return (
      typeof XMLHttpRequest < 'u'
        ? (e = Jr())
        : typeof process < 'u' &&
          Object.prototype.toString.call(process) === '[object process]' &&
          (e = xn()),
      e
    );
  }
  var Ye = {
    transitional: {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    adapter: hi(),
    transformRequest: [
      function (t, r) {
        return (
          In(r, 'Accept'),
          In(r, 'Content-Type'),
          G.isFormData(t) ||
          G.isArrayBuffer(t) ||
          G.isBuffer(t) ||
          G.isStream(t) ||
          G.isFile(t) ||
          G.isBlob(t)
            ? t
            : G.isArrayBufferView(t)
            ? t.buffer
            : G.isURLSearchParams(t)
            ? (Tn(r, 'application/x-www-form-urlencoded;charset=utf-8'),
              t.toString())
            : G.isObject(t) || (r && r['Content-Type'] === 'application/json')
            ? (Tn(r, 'application/json'), JSON.stringify(t))
            : t
        );
      },
    ],
    transformResponse: [
      function (t) {
        var r = this.transitional,
          o = r && r.silentJSONParsing,
          n = r && r.forcedJSONParsing,
          s = !o && this.responseType === 'json';
        if (s || (n && G.isString(t) && t.length))
          try {
            return JSON.parse(t);
          } catch (i) {
            if (s)
              throw i.name === 'SyntaxError' ? pi(i, this, 'E_JSON_PARSE') : i;
          }
        return t;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function (t) {
      return t >= 200 && t < 300;
    },
  };
  Ye.headers = { common: { Accept: 'application/json, text/plain, */*' } };
  G.forEach(['delete', 'get', 'head'], function (t) {
    Ye.headers[t] = {};
  });
  G.forEach(['post', 'put', 'patch'], function (t) {
    Ye.headers[t] = G.merge(di);
  });
  On.exports = Ye;
});
var bn = x((bu, wn) => {
  'use strict';
  var mi = H(),
    vi = Qe();
  wn.exports = function (t, r, o) {
    var n = this || vi;
    return (
      mi.forEach(o, function (i) {
        t = i.call(n, t, r);
      }),
      t
    );
  };
});
var Pt = x((Su, Sn) => {
  'use strict';
  Sn.exports = function (t) {
    return !!(t && t.__CANCEL__);
  };
});
var An = x((Uu, Nn) => {
  'use strict';
  var Un = H(),
    qt = bn(),
    _i = Pt(),
    Ci = Qe();
  function kt(e) {
    e.cancelToken && e.cancelToken.throwIfRequested();
  }
  Nn.exports = function (t) {
    kt(t),
      (t.headers = t.headers || {}),
      (t.data = qt.call(t, t.data, t.headers, t.transformRequest)),
      (t.headers = Un.merge(
        t.headers.common || {},
        t.headers[t.method] || {},
        t.headers
      )),
      Un.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function (n) {
          delete t.headers[n];
        }
      );
    var r = t.adapter || Ci.adapter;
    return r(t).then(
      function (n) {
        return (
          kt(t),
          (n.data = qt.call(t, n.data, n.headers, t.transformResponse)),
          n
        );
      },
      function (n) {
        return (
          _i(n) ||
            (kt(t),
            n &&
              n.response &&
              (n.response.data = qt.call(
                t,
                n.response.data,
                n.response.headers,
                t.transformResponse
              ))),
          Promise.reject(n)
        );
      }
    );
  };
});
var Ht = x((Nu, Ln) => {
  'use strict';
  var k = H();
  Ln.exports = function (t, r) {
    r = r || {};
    var o = {},
      n = ['url', 'method', 'data'],
      s = ['headers', 'auth', 'proxy', 'params'],
      i = [
        'baseURL',
        'transformRequest',
        'transformResponse',
        'paramsSerializer',
        'timeout',
        'timeoutMessage',
        'withCredentials',
        'adapter',
        'responseType',
        'xsrfCookieName',
        'xsrfHeaderName',
        'onUploadProgress',
        'onDownloadProgress',
        'decompress',
        'maxContentLength',
        'maxBodyLength',
        'maxRedirects',
        'transport',
        'httpAgent',
        'httpsAgent',
        'cancelToken',
        'socketPath',
        'responseEncoding',
      ],
      a = ['validateStatus'];
    function u(p, d) {
      return k.isPlainObject(p) && k.isPlainObject(d)
        ? k.merge(p, d)
        : k.isPlainObject(d)
        ? k.merge({}, d)
        : k.isArray(d)
        ? d.slice()
        : d;
    }
    function f(p) {
      k.isUndefined(r[p])
        ? k.isUndefined(t[p]) || (o[p] = u(void 0, t[p]))
        : (o[p] = u(t[p], r[p]));
    }
    k.forEach(n, function (d) {
      k.isUndefined(r[d]) || (o[d] = u(void 0, r[d]));
    }),
      k.forEach(s, f),
      k.forEach(i, function (d) {
        k.isUndefined(r[d])
          ? k.isUndefined(t[d]) || (o[d] = u(void 0, t[d]))
          : (o[d] = u(void 0, r[d]));
      }),
      k.forEach(a, function (d) {
        d in r ? (o[d] = u(t[d], r[d])) : d in t && (o[d] = u(void 0, t[d]));
      });
    var c = n.concat(s).concat(i).concat(a),
      l = Object.keys(t)
        .concat(Object.keys(r))
        .filter(function (d) {
          return c.indexOf(d) === -1;
        });
    return k.forEach(l, f), o;
  };
});
var Pn = x((Au, Dn) => {
  'use strict';
  var Fn = Mt(),
    Gt = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
    function (e, t) {
      Gt[e] = function (o) {
        return typeof o === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
      };
    }
  );
  var Bn = {},
    Ei = Fn.version.split('.');
  function Mn(e, t) {
    for (var r = t ? t.split('.') : Ei, o = e.split('.'), n = 0; n < 3; n++) {
      if (r[n] > o[n]) return !0;
      if (r[n] < o[n]) return !1;
    }
    return !1;
  }
  Gt.transitional = function (t, r, o) {
    var n = r && Mn(r);
    function s(i, a) {
      return (
        '[Axios v' +
        Fn.version +
        "] Transitional option '" +
        i +
        "'" +
        a +
        (o ? '. ' + o : '')
      );
    }
    return function (i, a, u) {
      if (t === !1) throw new Error(s(a, ' has been removed in ' + r));
      return (
        n &&
          !Bn[a] &&
          ((Bn[a] = !0),
          console.warn(
            s(
              a,
              ' has been deprecated since v' +
                r +
                ' and will be removed in the near future'
            )
          )),
        t ? t(i, a, u) : !0
      );
    };
  };
  function yi(e, t, r) {
    if (typeof e != 'object') throw new TypeError('options must be an object');
    for (var o = Object.keys(e), n = o.length; n-- > 0; ) {
      var s = o[n],
        i = t[s];
      if (i) {
        var a = e[s],
          u = a === void 0 || i(a, s, e);
        if (u !== !0) throw new TypeError('option ' + s + ' must be ' + u);
        continue;
      }
      if (r !== !0) throw Error('Unknown option ' + s);
    }
  }
  Dn.exports = { isOlderVersion: Mn, assertOptions: yi, validators: Gt };
});
var Vn = x((Lu, jn) => {
  'use strict';
  var Hn = H(),
    Ri = ke(),
    qn = Nr(),
    kn = An(),
    Ze = Ht(),
    Gn = Pn(),
    Ce = Gn.validators;
  function Ne(e) {
    (this.defaults = e),
      (this.interceptors = { request: new qn(), response: new qn() });
  }
  Ne.prototype.request = function (t) {
    typeof t == 'string'
      ? ((t = arguments[1] || {}), (t.url = arguments[0]))
      : (t = t || {}),
      (t = Ze(this.defaults, t)),
      t.method
        ? (t.method = t.method.toLowerCase())
        : this.defaults.method
        ? (t.method = this.defaults.method.toLowerCase())
        : (t.method = 'get');
    var r = t.transitional;
    r !== void 0 &&
      Gn.assertOptions(
        r,
        {
          silentJSONParsing: Ce.transitional(Ce.boolean, '1.0.0'),
          forcedJSONParsing: Ce.transitional(Ce.boolean, '1.0.0'),
          clarifyTimeoutError: Ce.transitional(Ce.boolean, '1.0.0'),
        },
        !1
      );
    var o = [],
      n = !0;
    this.interceptors.request.forEach(function (p) {
      (typeof p.runWhen == 'function' && p.runWhen(t) === !1) ||
        ((n = n && p.synchronous), o.unshift(p.fulfilled, p.rejected));
    });
    var s = [];
    this.interceptors.response.forEach(function (p) {
      s.push(p.fulfilled, p.rejected);
    });
    var i;
    if (!n) {
      var a = [kn, void 0];
      for (
        Array.prototype.unshift.apply(a, o),
          a.concat(s),
          i = Promise.resolve(t);
        a.length;

      )
        i = i.then(a.shift(), a.shift());
      return i;
    }
    for (var u = t; o.length; ) {
      var f = o.shift(),
        c = o.shift();
      try {
        u = f(u);
      } catch (l) {
        c(l);
        break;
      }
    }
    try {
      i = kn(u);
    } catch (l) {
      return Promise.reject(l);
    }
    for (; s.length; ) i = i.then(s.shift(), s.shift());
    return i;
  };
  Ne.prototype.getUri = function (t) {
    return (
      (t = Ze(this.defaults, t)),
      Ri(t.url, t.params, t.paramsSerializer).replace(/^\?/, '')
    );
  };
  Hn.forEach(['delete', 'get', 'head', 'options'], function (t) {
    Ne.prototype[t] = function (r, o) {
      return this.request(
        Ze(o || {}, { method: t, url: r, data: (o || {}).data })
      );
    };
  });
  Hn.forEach(['post', 'put', 'patch'], function (t) {
    Ne.prototype[t] = function (r, o, n) {
      return this.request(Ze(n || {}, { method: t, url: r, data: o }));
    };
  });
  jn.exports = Ne;
});
var Vt = x((Bu, Xn) => {
  'use strict';
  function jt(e) {
    this.message = e;
  }
  jt.prototype.toString = function () {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };
  jt.prototype.__CANCEL__ = !0;
  Xn.exports = jt;
});
var Kn = x((Fu, $n) => {
  'use strict';
  var gi = Vt();
  function et(e) {
    if (typeof e != 'function')
      throw new TypeError('executor must be a function.');
    var t;
    this.promise = new Promise(function (n) {
      t = n;
    });
    var r = this;
    e(function (n) {
      r.reason || ((r.reason = new gi(n)), t(r.reason));
    });
  }
  et.prototype.throwIfRequested = function () {
    if (this.reason) throw this.reason;
  };
  et.source = function () {
    var t,
      r = new et(function (n) {
        t = n;
      });
    return { token: r, cancel: t };
  };
  $n.exports = et;
});
var Wn = x((Mu, zn) => {
  'use strict';
  zn.exports = function (t) {
    return function (o) {
      return t.apply(null, o);
    };
  };
});
var Yn = x((Du, Jn) => {
  'use strict';
  Jn.exports = function (t) {
    return typeof t == 'object' && t.isAxiosError === !0;
  };
});
var eo = x((Pu, Xt) => {
  'use strict';
  var Qn = H(),
    xi = mt(),
    tt = Vn(),
    Ii = Ht(),
    Ti = Qe();
  function Zn(e) {
    var t = new tt(e),
      r = xi(tt.prototype.request, t);
    return Qn.extend(r, tt.prototype, t), Qn.extend(r, t), r;
  }
  var ee = Zn(Ti);
  ee.Axios = tt;
  ee.create = function (t) {
    return Zn(Ii(ee.defaults, t));
  };
  ee.Cancel = Vt();
  ee.CancelToken = Kn();
  ee.isCancel = Pt();
  ee.all = function (t) {
    return Promise.all(t);
  };
  ee.spread = Wn();
  ee.isAxiosError = Yn();
  Xt.exports = ee;
  Xt.exports.default = ee;
});
var ro = x((qu, to) => {
  to.exports = eo();
});
function Kt(e, t = 1e4) {
  let r = (s) => s,
    o = process.env.NX_CLOUD_API || e.url || 'https://cloud.nx.app',
    n = Ie ? Ie : e.accessToken;
  if (!n)
    throw new Error(
      'Unable to authenticate. Either define accessToken in nx.json or set the NX_CLOUD_ACCESS_TOKEN env variable.'
    );
  if (e.customProxyConfigPath) {
    let { nxCloudProxyConfig: s } = require((0, oo.join)(
      process.cwd(),
      e.customProxyConfigPath
    ));
    r = s ?? r;
  }
  return Oi.create(
    r({
      baseURL: o,
      timeout: Pe ? dt : t,
      headers: {
        authorization: n,
        'Nx-Cloud-Client-Version': e.clientVersion || 'unknown',
      },
    })
  );
}
async function nt(e, t = xe) {
  try {
    return await e();
  } catch (r) {
    let o = (r.response && r.response.status) || r.code;
    (o === 401 || o === 403) && (t = 0);
    let n = r.response
      ? r.response.data.message
        ? r.response.data.message
        : r.response.data
      : r.message;
    if (t === 0)
      throw (
        (typeof n != 'string' && (n = r.message),
        new $t(
          'failure',
          `Error when connecting to Nx Cloud. Code: ${o}. Error: ${n}`,
          r
        ))
      );
    if (o == 429) {
      if (!rt) {
        let s = 1e4 + (xe + 1 - t) * 6e4 * Math.random();
        no.note({ title: `Received Code ${o}. ${n} Retrying in ${s}ms.` }),
          (rt = ht(s));
      }
      await rt, (rt = null);
    } else {
      let s = 1e3 + (xe + 1 - t) * 4e3 * Math.random();
      X && no.note({ title: `Received Code ${o}. Retrying in ${s}ms.` }),
        await ht(s);
    }
    return nt(e, t - 1);
  }
}
var oo,
  no,
  Oi,
  $t,
  rt,
  zt = Q(() => {
    'use strict';
    oo = require('path');
    Oe();
    xr();
    ({ output: no } = de()),
      (Oi = ro()),
      ($t = class {
        constructor(t, r, o) {
          this.type = t;
          this.message = r;
          this.axiosException = o;
        }
      });
    rt = null;
  });
function Jt() {
  for (let e of Object.values(wi))
    if (e.detectorFn(process.env)) {
      let t = e.contextRetrieverFn(process.env);
      return (
        X && console.log(JSON.stringify(t, null, 2)),
        { ...t, inferredFromTaskRunner: !0 }
      );
    }
  return X && console.log('[Nx Cloud] Did not identify a VCS platform.'), null;
}
function bi(e) {
  return e.CIRCLECI === 'true';
}
function Si(e) {
  X && console.log('[Nx Cloud] Detected Env: CircleCI');
  let t = (o) => {
      if (o.CIRCLE_PR_NUMBER !== void 0) return o.CIRCLE_PR_NUMBER;
      if (o.CIRCLE_PULL_REQUEST !== void 0) {
        let n = o.CIRCLE_PULL_REQUEST.split('/');
        return n[n.length - 1];
      }
      return o.CIRCLE_BRANCH !== void 0 ? o.CIRCLE_BRANCH : 'unknown';
    },
    r = (o) =>
      o.CIRCLE_USERNAME !== void 0
        ? o.CIRCLE_USERNAME
        : o.CIRCLE_PR_USERNAME
        ? o.CIRCLE_PR_USERNAME
        : null;
  return {
    branch: t(e),
    ref: e.CIRCLE_BRANCH ?? null,
    title: Yt(),
    headSha: e.CIRCLE_SHA1 ?? 'unknown',
    baseSha: null,
    commitLink: e.CIRCLE_PULL_REQUEST ?? null,
    author: r(e),
    authorUrl: null,
    authorAvatarUrl: null,
  };
}
function Ui(e) {
  return e.TRAVIS === 'true';
}
function Ni(e) {
  return (
    X && console.log('[Nx Cloud] Detected Env: TravisCI'),
    {
      branch: ((r) =>
        r.TRAVIS_EVENT_TYPE === 'pull_request'
          ? r.TRAVIS_PULL_REQUEST
          : r.TRAVIS_BRANCH)(e),
      ref: null,
      title: e.TRAVIS_COMMIT_MESSAGE,
      headSha: e.TRAVIS_COMMIT ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: so(),
      authorUrl: null,
      authorAvatarUrl: null,
    }
  );
}
function Ai(e) {
  return e.GITHUB_ACTIONS === 'true';
}
function Li(e) {
  X && console.log('[Nx Cloud] Detected Env: GitHub Actions');
  let t = (n) => {
      if (n.GITHUB_REF) {
        let s = n.GITHUB_REF.match(/refs\/pull\/(\d+)\/merge/);
        if (s) return s[1];
      }
      return n.GITHUB_HEAD_REF
        ? n.GITHUB_HEAD_REF
        : n.GITHUB_REF_NAME
        ? n.GITHUB_REF_NAME
        : 'unknown';
    },
    r = (n) => {
      let s = `${n.GITHUB_SERVER_URL}/${n.GITHUB_REPOSITORY}`;
      return n.GITHUB_EVENT_NAME === 'pull_request'
        ? `${s}/pull/${t(n)}`
        : `${s}/commit/${n.GITHUB_SHA}`;
    },
    o = (n) =>
      n.GITHUB_HEAD_REF
        ? n.GITHUB_HEAD_REF
        : n.GITHUB_REF
        ? n.GITHUB_REF
        : null;
  return {
    branch: t(e),
    ref: o(e),
    title: Yt(),
    headSha: e.GITHUB_SHA ?? 'unknown',
    baseSha: null,
    commitLink: r(e),
    author: e.GITHUB_ACTOR ?? null,
    authorUrl: `https://github.com/${e.GITHUB_ACTOR}`,
    authorAvatarUrl: `https://avatars.githubusercontent.com/u/${e.GITHUB_ACTOR_ID}`,
  };
}
function Bi(e) {
  return e.BITBUCKET_BUILD_NUMBER != null;
}
function Fi(e) {
  return (
    X && console.log('[Nx Cloud] Detected Env: BitBucket Pipelines'),
    {
      branch: e.BITBUCKET_PR_ID ?? e.BITBUCKET_BRANCH ?? 'unknown',
      ref: null,
      title: Yt(),
      headSha: e.BITBUCKET_COMMIT ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: so(),
      authorUrl: null,
      authorAvatarUrl: null,
    }
  );
}
function Mi(e) {
  return e.BUILD_BUILDID !== void 0 && e.AGENT_NAME !== void 0;
}
function Di(e) {
  return (
    X && console.log('[Nx Cloud] Detected Env: Azure DevOps'),
    {
      branch:
        e.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ??
        e.BUILD_SOURCEBRANCHNAME ??
        'unknown',
      ref: null,
      title: e.BUILD_SOURCEVERSIONMESSAGE ?? null,
      headSha: Te() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: e.BUILD_REQUESTEDFOR ?? null,
      authorUrl: null,
      authorAvatarUrl: null,
    }
  );
}
function Pi(e) {
  return e.GITLAB_CI === 'true';
}
function qi(e) {
  return (
    X && console.log('[Nx Cloud] Detected Env: GitLab Pipelines'),
    {
      branch: ((r) =>
        r.CI_MERGE_REQUEST_IID
          ? r.CI_MERGE_REQUEST_IID
          : r.CI_COMMIT_BRANCH
          ? r.CI_COMMIT_BRANCH
          : 'unknown')(e),
      ref: e.CI_COMMIT_REF_NAME ?? null,
      title: e.CI_COMMIT_MESSAGE ?? null,
      headSha: Te() ?? 'unknown',
      baseSha: null,
      commitLink: null,
      author: e.GITLAB_USER_NAME ?? null,
      authorUrl: null,
      authorAvatarUrl: null,
    }
  );
}
function Yt() {
  try {
    return (0, Wt.execSync)('git log -1 --pretty=%B', {
      encoding: 'utf-8',
    }).trim();
  } catch {
    return null;
  }
}
function so() {
  try {
    return (0, Wt.execSync)('git log -1 --pretty=%aN', {
      encoding: 'utf-8',
    }).trim();
  } catch {
    return null;
  }
}
var Wt,
  wi,
  io = Q(() => {
    'use strict';
    Wt = require('child_process');
    Oe();
    wi = {
      CIRCLE_CI: { detectorFn: bi, contextRetrieverFn: Si },
      TRAVIS_CI: { detectorFn: Ui, contextRetrieverFn: Ni },
      GITHUB_ACTIONS: { detectorFn: Ai, contextRetrieverFn: Li },
      BITBUCKET_PIPELINES: { detectorFn: Bi, contextRetrieverFn: Fi },
      AZURE_DEVOPS: { detectorFn: Mi, contextRetrieverFn: Di },
      GITLAB_PIPELINES: { detectorFn: Pi, contextRetrieverFn: qi },
    };
  });
var $u,
  uo = Q(() => {
    'use strict';
    Re();
    ({ output: $u } = de());
  });
var Qt,
  ki,
  Zt,
  Ae,
  er,
  ao = Q(() => {
    'use strict';
    Qt = require('perf_hooks');
    zt();
    Oe();
    uo();
    (ki = []),
      (Zt = (e) => {
        let t = Qt.performance.now();
        return {
          recordMetric: (o) => {
            let n = Qt.performance.now();
            (o.durationMs = n - t), (o.entryType = e), ki.push(o);
          },
        };
      }),
      (Ae = (e) => {
        var t;
        return {
          success:
            ((t = e == null ? void 0 : e.status) == null
              ? void 0
              : t.toString().startsWith('2')) ?? !1,
          statusCode: (e == null ? void 0 : e.status) ?? -1,
        };
      }),
      (er = { success: !1, statusCode: -1 });
  });
var fo = {};
Fe(fo, { RunGroupApi: () => tr });
var co,
  tr,
  lo = Q(() => {
    'use strict';
    zt();
    io();
    ao();
    ({ output: co } = de()),
      (tr = class {
        constructor(t) {
          this.apiAxiosInstance = Kt(t);
        }
        async createRunGroup(t, r, o, n, s, i, a, u, f) {
          var l;
          let c = Zt('createRunGroup');
          try {
            let p = await nt(() =>
              this.apiAxiosInstance.post(
                '/nx-cloud/executions/create-run-group',
                {
                  branch: t,
                  runGroup: r,
                  ciExecutionId: o,
                  ciExecutionEnv: n,
                  stopAgentsOnFailure: s,
                  agentCount: i,
                  stopAgentsAfter: a,
                  commitSha: u,
                  vcsContext: Jt(),
                }
              )
            );
            c.recordMetric(Ae(p));
          } catch (p) {
            c.recordMetric(
              (l = p == null ? void 0 : p.axiosException) != null && l.response
                ? Ae(p.axiosException.response)
                : er
            ),
              co.error({ title: p.message }),
              process.exit(1);
          }
        }
        async completeRunGroup(t, r, o, n) {
          var i;
          let s = Zt('completeRunGroup');
          try {
            let a = await nt(() =>
              this.apiAxiosInstance.post(
                '/nx-cloud/executions/complete-run-group',
                {
                  branch: t,
                  runGroup: r,
                  ciExecutionId: o,
                  ciExecutionEnv: n,
                  vcsContext: Jt(),
                }
              )
            );
            s.recordMetric(Ae(a));
          } catch (a) {
            s.recordMetric(
              (i = a == null ? void 0 : a.axiosException) != null && i.response
                ? Ae(a.axiosException.response)
                : er
            ),
              co.error({ title: a.message }),
              process.exit(1);
          }
        }
      });
  });
var po = require('fs');
var rr = require('os'),
  nr = require('path');
function or(e) {
  return (0, nr.join)((0, rr.tmpdir)(), `run-group-${e}-marker.lock`);
}
var Hi = 5 * 60 * 60 * 1e3,
  Gi = setTimeout(() => {}, Hi);
function ji() {
  let e = JSON.parse(process.env.NX_CLOUD_LIGHT_CLIENT_RESOLUTION_PATHS),
    { configureLightClientRequire: t } = (Re(), Me(sr));
  t(e);
  let { getCloudOptions: r } = (ut(), Me(ur)),
    { RunGroupApi: o } = (lo(), Me(fo)),
    {
      getBranch: n,
      getRunGroup: s,
      getCIExecutionId: i,
      getCIExecutionEnv: a,
      VERBOSE_LOGGING: u,
    } = (Oe(), Me(gr)),
    { nxCloudOptions: f } = r(),
    c = new o(f),
    l = n(),
    p = s(),
    d = i(),
    h = a();
  Vi(c, l, p, d, h, u);
}
function Vi(e, t, r, o, n, s) {
  let i = async () => {
    s &&
      console.log(
        '[NX CLOUD] Completing run group: ',
        JSON.stringify({
          branch: t,
          runGroup: r,
          ciExecutionId: o,
          ciExecutionEnv: n,
        })
      ),
      await e.completeRunGroup(t, r, o, n),
      (0, po.rmdirSync)(or(r)),
      clearInterval(Gi),
      process.exit(0);
  };
  process.on('SIGINT', i), process.on('SIGTERM', i);
}
ji();
