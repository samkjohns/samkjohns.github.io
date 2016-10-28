(function() {
  var process = {
    env: {
      NODE_ENV: "production"
    }
  };
  var g, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, c) {
      if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
      b != Array.prototype && b != Object.prototype && (b[a] = c.value)
    },
    h = function(b) {
      return "undefined" != typeof window && window === b ? b : "undefined" != typeof global ? global : b
    }(this);

  function ba(b, a) {
    var c = "es3";
    if (a) {
      var d = h,
        e = b.split(".");
      for (b = 0; b < e.length - 1; b++) {
        var f = e[b];
        f in d || (d[f] = {});
        d = d[f]
      }
      b = e[e.length - 1];
      var k = d[b],
        m = a(k);
      m != k && null != m && aa(d, b, {
        configurable: !0,
        writable: !0,
        value: m
      })
    }
  }

  function ca() {
    ca = function() {};
    h.Symbol || (h.Symbol = da)
  }
  var ea = 0;

  function da(b) {
    return "jscomp_symbol_" + (b || "") + ea++
  }

  function l() {
    ca();
    var b = h.Symbol.iterator;
    b || (b = h.Symbol.iterator = h.Symbol("iterator"));
    "function" != typeof Array.prototype[b] && aa(Array.prototype, b, {
      configurable: !0,
      writable: !0,
      value: function() {
        return fa(this)
      }
    });
    l = function() {}
  }

  function fa(b) {
    var a = 0;
    return ga(function() {
      return a < b.length ? {
        done: !1,
        value: b[a++]
      } : {
        done: !0
      }
    })
  }

  function ga(b) {
    l();
    var a = {
      next: b
    };
    a[h.Symbol.iterator] = function() {
      return this
    };
    return a
  }

  function ha(b, a) {
    l();
    b instanceof String && (b += "");
    var c = 0,
      d = {
        next: function() {
          if (c < b.length) {
            var e = c++;
            return {
              value: a(e, b[e]),
              done: !1
            }
          }
          d.next = function() {
            return {
              done: !0,
              value: void 0
            }
          };
          return d.next()
        }
      };
    d[Symbol.iterator] = function() {
      return d
    };
    return d
  }
  ba("Array.prototype.keys", function(b) {
    return b ? b : function() {
      return ha(this, function(a) {
        return a
      })
    }
  });
  ba("Array.prototype.values", function(b) {
    return b ? b : function() {
      return ha(this, function(a, b) {
        return b
      })
    }
  });
  var n = "";

  function p(b) {
    var a = b || self,
      c;
    if (a.AMP_MODE) c = a.AMP_MODE;
    else {
      c = a;
      if (c.context && c.context.mode) c = c.context.mode;
      else {
        var d = ia(c.location.originalHash || c.location.hash),
          e = ia(c.location.search);
        n || (n = c.AMP_CONFIG && c.AMP_CONFIG.v ? c.AMP_CONFIG.v : "1477334765771");
        c = {
          localDev: !1,
          development: !("1" != d.development && !c.AMP_DEV_MODE),
          filter: d.filter,
          minified: !0,
          lite: void 0 != e.amp_lite,
          test: !1,
          log: d.log,
          version: n
        }
      }
      c = a.AMP_MODE = c
    }
    return c
  }

  function ia(b) {
    var a = Object.create(null);
    if (!b) return a;
    if (0 == b.indexOf("?") || 0 == b.indexOf("#")) b = b.substr(1);
    for (var c = b.split("&"), d = 0; d < c.length; d++) {
      var e = c[d],
        f = e.indexOf("="),
        k, m; - 1 != f ? (k = decodeURIComponent(e.substring(0, f)).trim(), m = decodeURIComponent(e.substring(f + 1)).trim()) : (k = decodeURIComponent(e).trim(), m = "");
      k && (a[k] = m)
    }
    return a
  };
  var ja = (new Date).getTime();

  function ka(b, a, c) {
    this.win = b;
    this.c = a;
    this.a = this.win.console && this.win.console.log && "0" != p().log ? this.c({
      localDev: !1,
      development: p(void 0).development,
      filter: p(void 0).filter,
      minified: !0,
      lite: p(void 0).lite,
      test: !1,
      log: p(void 0).log,
      version: p(void 0).version
    }) : 0;
    this.b = c || ""
  }

  function v(b, a, c, d) {
    if (0 != b.a) {
      var e = b.win.console.log;
      "ERROR" == c ? e = b.win.console.error || e : "INFO" == c ? e = b.win.console.info || e : "WARN" == c && (e = b.win.console.warn || e);
      d.unshift(Date.now() - ja, "[" + a + "]");
      e.apply(b.win.console, d)
    }
  }
  g = ka.prototype;
  g.isEnabled = function() {
    return 0 != this.a
  };
  g.fine = function(b, a) {
    4 <= this.a && v(this, b, "FINE", Array.prototype.slice.call(arguments, 1))
  };
  g.info = function(b, a) {
    3 <= this.a && v(this, b, "INFO", Array.prototype.slice.call(arguments, 1))
  };
  g.warn = function(b, a) {
    2 <= this.a && v(this, b, "WARN", Array.prototype.slice.call(arguments, 1))
  };
  g.error = function(b, a) {
    if (1 <= this.a) v(this, b, "ERROR", Array.prototype.slice.call(arguments, 1));
    else {
      var c = w.apply(null, Array.prototype.slice.call(arguments, 1));
      x(this, c);
      this.win.setTimeout(function() {
        throw c;
      })
    }
  };
  g.createError = function(b) {
    var a = w.apply(null, arguments);
    x(this, a);
    return a
  };
  g.assert = function(b, a, c) {
    var d;
    if (!b) {
      var e = (a || "Assertion failed").split("%s"),
        f = e.shift(),
        k = f,
        m = [];
      "" != f && m.push(f);
      for (f = 2; f < arguments.length; f++) {
        var q = arguments[f];
        q && q.tagName && (d = q);
        var t = e.shift();
        m.push(q);
        var u = t.trim();
        "" != u && m.push(u);
        var u = k,
          r;
        r = q;
        r = r instanceof Element ? r.tagName.toLowerCase() + (r.id ? "#" + r.id : "") : r;
        k = u + (r + t)
      }
      f = Error(k);
      f.fromAssert = !0;
      f.associatedElement = d;
      f.messageArray = m;
      x(this, f);
      throw f;
    }
    return b
  };
  g.assertElement = function(b, a) {
    this.assert(b && 1 == b.nodeType, (a || "Element expected") + ": %s", b);
    return b
  };
  g.assertString = function(b, a) {
    this.assert("string" == typeof b, (a || "String expected") + ": %s", b);
    return b
  };
  g.assertNumber = function(b, a) {
    this.assert("number" == typeof b, (a || "Number expected") + ": %s", b);
    return b
  };
  g.assertEnumValue = function(b, a, c) {
    for (var d in b)
      if (b[d] == a) return b[d];
    this.assert(!1, 'Unknown %s value: "%s"', c || "enum", a)
  };

  function x(b, a) {
    b.b && (a.message ? -1 == a.message.indexOf(b.b) && (a.message += b.b) : a.message = b.b)
  }

  function w(b) {
    for (var a = null, c = "", d = 0; d < arguments.length; d++) {
      var e = arguments[d];
      e instanceof Error && !a ? a = e : (c && (c += " "), c += e)
    }
    a ? c && (a.message = c + ": " + a.message) : a = Error(c);
    return a
  }

  function y(b) {
    var a = w.apply(null, arguments);
    setTimeout(function() {
      throw a;
    })
  }
  self.log = self.log || {
    user: null,
    dev: null
  };
  var z = self.log,
    A = null;

  function B() {
    if (z.user) return z.user;
    if (!A) throw Error("failed to call initLogConstructor");
    return z.user = new A(self, function(b) {
      var a = parseInt(b.log, 10);
      return b.development || 1 <= a ? 4 : 0
    }, "\u200b\u200b\u200b")
  }

  function la() {
    if (!z.dev) {
      if (!A) throw Error("failed to call initLogConstructor");
      z.dev = new A(self, function(b) {
        b = parseInt(b.log, 10);
        return 3 <= b ? 4 : 2 <= b ? 3 : 0
      })
    }
  };
  var C = {},
    ma = 0;

  function na(b, a, c) {
    var d = C[b];
    B().assert(d, "Unknown 3p: " + b);
    d(a, c)
  }

  function D(b, a, c) {
    b.document.write('<script src="' + encodeURI(a) + '">\x3c/script>');
    c && (a = ma++, b["__runScript" + a] = c, b.document.write("<script>__runScript" + a + "()\x3c/script>"))
  }

  function E(b, a, c, d) {
    var e = b.document.createElement("script");
    e.src = a;
    c && (e.onload = c);
    d && (e.onerror = d);
    b.document.body.appendChild(e)
  }

  function oa(b) {
    var a = window,
      c = a.Promise;
    c ? c.resolve().then(b) : a.setTimeout(b, 0)
  }

  function G(b, a) {
    Array.isArray(b) || (b = [b]);
    if (void 0 !== a)
      for (var c = 0; c <= b.length; c++) {
        var d = a.indexOf(b[c]);
        if (0 == d) return
      }
    throw Error("Invalid src " + a);
  }

  function H(b, a, c, d) {
    var e = b.context.master,
      f = e.__ampMasterTasks;
    f || (f = e.__ampMasterTasks = {});
    var k = f[a];
    f[a] || (k = f[a] = []);
    k.push(d);
    b.context.isMaster && c(function(b) {
      for (var c = 0; c < k.length; c++) k[c].call(null, b);
      f[a] = {
        push: function(a) {
          a(b)
        }
      }
    })
  }

  function I(b, a, c) {
    for (var d = c || [], e = 0; e < a.length; e++) {
      var f = a[e];
      if (Array.isArray(f)) {
        for (var k = b, m = 0, q = 0; q < f.length; q++) k[f[q]] && (m += 1);
        B().assert(1 === m, "%s must contain exactly one of attributes: %s.", k.type, f.join(", "));
        d = d.concat(f)
      } else B().assert(b[f], "Missing attribute for %s: %s.", b.type, f), d.push(f)
    }
    if (c) {
      var e = d,
        f = {
          width: !0,
          height: !0,
          type: !0,
          referrer: !0,
          canonicalUrl: !0,
          pageViewId: !0,
          location: !0,
          mode: !0,
          consentNotificationId: !0,
          container: !0
        },
        t;
      for (t in b) !b.hasOwnProperty(t) || t in f || 0 >
        e.indexOf(t) && y(Error("Unknown attribute for " + b.type + ": " + t + "."))
    }
  };

  function pa(b, a) {
    var c = Number(a || 0);
    return b ? c + b.replace(/\D/g, "") % 1E6 * 1E6 : c
  };
  var J = self.AMP_CONFIG || {},
    qa = J.thirdPartyUrl || "https://3p.ampproject.net",
    ra = J.thirdPartyFrameRegex || /^d-\d+\.ampproject\.net$/,
    sa = J.cdnUrl || "https://cdn.ampproject.org",
    ta = J.errorReportingUrl || "https://amp-error-reporting.appspot.com/r";
  var L, ua, va = /[?&]amp_js[^&]*/;

  function M(b) {
    var a;
    L || (L = self.document.createElement("a"), ua = self.UrlCache || (self.UrlCache = Object.create(null)));
    var c = ua[b];
    if (c) return c;
    L.href = b;
    L.protocol || (L.href = L.href);
    var d = {
      href: L.href,
      protocol: L.protocol,
      host: L.host,
      hostname: L.hostname,
      port: "0" == L.port ? "" : L.port,
      pathname: L.pathname,
      search: L.search,
      hash: L.hash,
      origin: null
    };
    "/" !== d.pathname[0] && (d.pathname = "/" + d.pathname);
    if ("http:" == d.protocol && 80 == d.port || "https:" == d.protocol && 443 == d.port) d.port = "", d.host = d.hostname;
    d.origin = L.origin &&
      "null" != L.origin ? L.origin : "data:" != d.protocol && d.host ? d.protocol + "//" + d.host : d.href;
    var e = d;
    return a ? e : ua[b] = e
  }

  function N(b) {
    "string" == typeof b && (b = M(b));
    var a = b;
    "string" == typeof a && (a = M(a));
    var c = a.pathname.split("/")[1];
    if (a.origin != sa && (0 != a.origin.indexOf("http://localhost:") || "c" != c && "v" != c)) return b.href;
    a = b.pathname.split("/");
    c = a[1];
    B().assert("c" == c || "v" == c, "Unknown path prefix in url %s", b.href);
    var d = a[2],
      e = "s" == d ? "https://" + decodeURIComponent(a[3]) : "http://" + decodeURIComponent(d);
    B().assert(0 < e.indexOf("."), "Expected a . in origin %s", e);
    a.splice(1, "s" == d ? 3 : 2);
    a = e + a.join("/");
    c = (c = b.search) && "?" !=
      c ? (c = c.replace(va, "").replace(/^[?&]/, "")) ? "?" + c : "" : "";
    return a + c + (b.hash || "")
  };

  function O(b, a) {
    var c = .1;
    I(a, [], "slot targeting categoryExclusions tagForChildDirectedTreatment cookieOptions overrideWidth overrideHeight loadingStrategy consentNotificationId useSameDomainRenderingUntilDeprecated experimentId multiSize multiSizeValidation".split(" "));
    b.context.clientId && (b.gaGlobal = {
      vid: b.context.clientId,
      hid: b.context.pageViewId
    });
    if (void 0 != a.useSameDomainRenderingUntilDeprecated || a.multiSize) wa(b, a, 3);
    else {
      var d = Math.random(),
        e = b.context.location.href;
      if ((0 < e.indexOf("google_glade=0") ||
          d < c) && 0 > e.indexOf("google_glade=1")) wa(b, a, 1);
      else {
        var f = d < 2 * c ? 2 : 0;
        xa(b, a, f)
      }
    }
  }

  function ya(b, a, c, d, e) {
    var f = null;
    c(b) && d(a) ? f = {
      badDim: "width and height",
      badVal: b + "x" + a
    } : c(b) ? f = {
      badDim: "width",
      badVal: b
    } : d(a) && (f = {
      badDim: "height",
      badVal: a
    });
    return f ? (B().error("AMP-AD", e(f)), !1) : !0
  }

  function wa(b, a, c) {
    var d = [
        [parseInt(a.overrideWidth || a.width, 10), parseInt(a.overrideHeight || a.height, 10)]
      ],
      e = b.document.querySelector("#c");
    e.style.top = "50%";
    e.style.left = "50%";
    e.style.bottom = "";
    e.style.right = "";
    e.style.transform = "translate(-50%, -50%)";
    var f = a.multiSize || null;
    if (f) {
      var k = f.split(",");
      k.forEach(function(b) {
        var c = b.split("x");
        if (2 != c.length) B().error("AMP-AD", "Invalid multi-size data format '" + b + "'.");
        else {
          var f = c[0],
            e = c[1];
          if (ya(f, e, function(a) {
                return isNaN(Number(a))
              }, function(a) {
                return isNaN(Number(a))
              },
              function(a) {
                var b = a.badDim,
                  c = a.badVal;
                return "Invalid " + b + " of " + c + " given for secondary size."
              })) {
            var c = Number(f),
              k = Number(e),
              m = d[0],
              P = m[0],
              F = m[1];
            if (ya(c, k, function(a) {
                return a > P
              }, function(a) {
                return a > F
              }, function(a) {
                var b = a.badDim;
                return "Secondary " + b + " " + a.badVal + " " + ("can't be larger than the primary " + b + ".")
              })) {
              var K = a.multiSizeValidation || "true";
              if ("false" != K && 0 != K) {
                var Q = 2 / 3,
                  Fa = Q * P,
                  Ga = Q * F;
                if (!ya(c, k, function(a) {
                    return a < Fa
                  }, function(a) {
                    return a < Ga
                  }, function(a) {
                    var b = a.badDim;
                    return "Secondary " +
                      b + " " + a.badVal + " is " + ("smaller than 2/3rds of the primary " + b + ".")
                  })) return
              }
              d.push([c, k])
            }
          }
        }
      })
    }
    E(b, "https://www.googletagservices.com/tag/js/gpt.js", function() {
      b.googletag.cmd.push(function() {
        var f = b.googletag,
          e = f.pubads(),
          k = f.defineSlot(a.slot, d, "c").addService(e);
        1 === c ? e.markAsGladeControl() : 3 === c && e.markAsGladeOptOut();
        if (a.experimentId) {
          var u = a.experimentId.split(",");
          e.forceExperiment = e.forceExperiment || function() {};
          u && u.forEach(function(a) {
            return e.forceExperiment(a)
          })
        }
        e.markAsAmp();
        e.set("page_url",
          b.context.canonicalUrl);
        e.setCorrelator(Number(pa(b.context.clientId, b.context.pageViewId)));
        f.enableServices();
        if (a.categoryExclusions)
          if (Array.isArray(a.categoryExclusions))
            for (u = 0; u < a.categoryExclusions.length; u++) k.setCategoryExclusion(a.categoryExclusions[u]);
          else k.setCategoryExclusion(a.categoryExclusions);
        a.cookieOptions && e.setCookieOptions(a.cookieOptions);
        void 0 != a.tagForChildDirectedTreatment && e.setTagForChildDirectedTreatment(a.tagForChildDirectedTreatment);
        if (a.targeting)
          for (var r in a.targeting) k.setTargeting(r,
            a.targeting[r]);
        e.addEventListener("slotRenderEnded", function(a) {
          var c = d[0],
            e = c[0],
            f = c[1],
            k = a.size,
            m = k ? k[0] : null,
            q = k ? k[1] : null,
            u = a.creativeId || "_backfill_";
          if (a.isEmpty || k && (m > e || q > f)) b.context.noContentAvailable(), u = "_empty_";
          else {
            for (var r, t = 1; t < d.length; t++)
              if (d[t][0] == m && d[t][1] == q) {
                r = {
                  width: m,
                  height: q
                };
                break
              }
            b.context.renderStart(r)
          }
          b.context.reportRenderedEntityIdentifier("dfp-" + u)
        });
        b.document.getElementById("c").slot = k;
        f.display("c")
      })
    })
  }

  function xa(b, a, c) {
    var d = parseInt(a.overrideHeight || a.height, 10),
      e = parseInt(a.overrideWidth || a.width, 10),
      f = {};
    a.categoryExclusions && (f.categoryExclusions = a.categoryExclusions);
    a.cookieOptions && (f.cookieOptOut = a.cookieOptions);
    void 0 != a.tagForChildDirectedTreatment && (f.tagForChildDirectedTreatment = a.tagForChildDirectedTreatment);
    a.targeting && (f.targeting = a.targeting);
    2 === c && (f.gladeEids = "108809102");
    var k = a.experimentId;
    k && (f.gladeEids = f.gladeEids ? f.gladeEids + "," + k : k);
    c = b.document.querySelector("#c");
    c.setAttribute("data-glade", "");
    c.setAttribute("data-amp-ad", "");
    c.setAttribute("data-ad-unit-path", a.slot);
    0 < Object.keys(f).length && c.setAttribute("data-json", JSON.stringify(f));
    c.setAttribute("data-page-url", b.context.canonicalUrl);
    c.setAttribute("height", d);
    c.setAttribute("width", e);
    c.style.top = "50%";
    c.style.left = "50%";
    c.style.bottom = "";
    c.style.right = "";
    c.style.transform = "translate(-50%, -50%)";
    c.addEventListener("gladeAdFetched", function(a) {
      a.detail.empty && b.context.noContentAvailable();
      b.context.renderStart()
    });
    window.glade = {
      correlator: pa(b.context.clientId, b.context.pageViewId)
    };
    E(b, "https://securepubads.g.doubleclick.net/static/glade.js")
  };

  function R(b, a) {
    if (window.parent != window) {
      var c = a || {};
      c.type = b;
      c.sentinel = window.context.amp3pSentinel;
      window.parent.postMessage(c, window.context.location.origin)
    }
  }
  var S = [];

  function T(b, a) {
    var c = window,
      d = {
        type: b,
        cb: a
      };
    S.push(d);
    za(c);
    return function() {
      var a = S.indexOf(d); - 1 < a && S.splice(a, 1)
    }
  }

  function za(b) {
    b.AMP_LISTENING || (b.AMP_LISTENING = !0, b.addEventListener("message", function(a) {
      if (a.source == b.parent && a.origin == b.context.location.origin && "string" == typeof a.data && 0 == a.data.indexOf("amp-")) {
        var c = JSON.parse(a.data.substr(4));
        if (c.sentinel == b.context.amp3pSentinel)
          for (a.stopImmediatePropagation && a.stopImmediatePropagation(), a = 0; a < S.length; a++)
            if (S[a].type == c.type) {
              var d = S[a].cb;
              try {
                d(c)
              } catch (e) {
                setTimeout(function() {
                  throw e;
                })
              }
            }
      }
    }))
  };
  var Aa = !0,
    Ba = 0,
    U = {},
    V = {},
    Ca = 0;

  function W(b) {
    try {
      b.ampSeen || (b.ampSeen = !0, Da(b), Ha(b), Ia(b, b.document.querySelectorAll("iframe")), Ja(b))
    } catch (a) {
      console.error(a.message, a.stack)
    }
  }

  function Ka(b, a) {
    var c = a.document,
      d = c.close;
    c.close = function() {
      b.ampManageWin = function(a) {
        W(a)
      };
      c.write("<script>window.parent.ampManageWin(window)\x3c/script>");
      c._close = d;
      return c._close()
    }
  }

  function La(b) {
    var a = parent,
      c = b.getAttribute("srcdoc");
    a.ampManageWin = function(a) {
      W(a)
    };
    c += "<script>window.parent.ampManageWin(window)\x3c/script>";
    b.setAttribute("srcdoc", c)
  }

  function Ia(b, a) {
    for (var c = {}, d = 0; d < a.length; c = {
        node: c.node
      }, d++) {
      c.node = a[d];
      try {
        if ("IFRAME" == c.node.tagName) {
          var e = c.node.getAttribute("src"),
            f = c.node.getAttribute("srcdoc");
          if (null == e || /^(about:|javascript:)/i.test(e.trim()) || f) c.node.contentWindow ? (Ma(b, c.node.contentWindow), c.node.addEventListener("load", function(a) {
            return function() {
              try {
                Ma(b, a.node.contentWindow)
              } catch (m) {
                console.error(m.message, m.stack)
              }
            }
          }(c))) : f && La(c.node)
        }
      } catch (k) {
        console.error(k.message, k.stack)
      }
    }
  }

  function Ma(b, a) {
    if (!a.ampSeen) {
      var c = a.document;
      Ka(b, a);
      c.body && c.body.childNodes.length && W(a)
    }
  }

  function Ha(b) {
    if (window.MutationObserver) {
      var a = new MutationObserver(function(a) {
        for (var c = 0; c < a.length; c++) Ia(b, a[c].addedNodes)
      });
      a.observe(b.document.documentElement, {
        subtree: !0,
        childList: !0
      })
    }
  }

  function Da(b) {
    var a = b.setTimeout;
    b.setTimeout = function(b, c) {
      var d = c;
      Aa || (d += 1E3);
      arguments[1] = d;
      return a.apply(this, arguments)
    };
    b.setInterval = function(a) {
      function c() {
        V[d] = b.setTimeout.apply(b, e);
        return "string" == typeof a ? (0, b.eval).call(b, a) : a.apply(this, arguments)
      }
      var d = Ca++,
        e = Array.prototype.slice.call(arguments);
      e[0] = c;
      V[d] = b.setTimeout.apply(b, e);
      return d
    };
    var c = b.clearInterval;
    b.clearInterval = function(a) {
      c(a);
      b.clearTimeout(V[a]);
      delete V[a]
    };
    var d = b.requestAnimationFrame || b.webkitRequestAnimationFrame;
    b.requestAnimationFrame = function(a) {
      if (!Aa) {
        var c = Ba++;
        U[c] = [b, a];
        delete U[c - 20];
        return c
      }
      return d.call(this, a)
    };
    var e = b.cancelAnimationFrame;
    b.cancelAnimationFrame = function(a) {
      e.call(this, a);
      delete U[a]
    };
    b.webkitRequestAnimationFrame && (b.webkitRequestAnimationFrame = b.requestAnimationFrame, b.webkitCancelAnimationFrame = b.webkitCancelRequestAnimationFrame = b.cancelAnimationFrame)
  }

  function Ja(b) {
    function a() {
      if (2 < c++) throw Error("security error");
    }
    var c = 0;
    try {
      b.alert = a, b.prompt = function() {
        a();
        return ""
      }, b.confirm = function() {
        a();
        return !1
      }
    } catch (d) {
      console.error(d.message, d.stack)
    }
  }

  function Na() {
    T("embed-state", function(b) {
      if (Aa = b.inViewport) {
        for (var a in U) U.hasOwnProperty(a) && (b = U[a], b[0].requestAnimationFrame(b[1]));
        U = {}
      }
    })
  };

  function Oa(b, a) {
    E(b, "https://connect.facebook.net/en_US/sdk.js", function() {
      a(b.FB)
    })
  };

  function Pa(b, a) {
    E(b, "https://platform.twitter.com/widgets.js", function() {
      a(b.twttr)
    })
  };
  var Qa = ["width", "height", "cid"];

  function Ra(b, a, c) {
    I(c, Qa, []);
    var d = a.document.createElement("ins");
    d.setAttribute("class", "adbladeads");
    d.setAttribute("data-width", c.width);
    d.setAttribute("data-height", c.height);
    d.setAttribute("data-cid", c.cid);
    d.setAttribute("data-host", b);
    d.setAttribute("data-protocol", "https");
    d.setAttribute("data-tag-type", 1);
    a.document.getElementById("c").appendChild(d);
    D(a, "https://" + b + "/js/ads/async/show.js")
  };
  var X = {
    track: "https://track.adform.net",
    adx: "https://adx.adform.net",
    a2: "https://a2.adform.net",
    adx2: "https://adx2.adform.net",
    asia: "https://asia.adform.net",
    adx3: "https://adx3.adform.net"
  };

  function Sa(b) {
    return b.split("&").map(function(a) {
      var b = a.split("=")[0];
      a = a.split("=")[1];
      return encodeURIComponent(b) + "=" + encodeURIComponent(a)
    }).join("&")
  };

  function Ta(b, a) {
    I(a, ["adUnits"]);
    var c;
    context.isMaster && (context.master.apntag = context.master.apntag || {}, context.master.apntag.anq = context.master.apntag.anq || [], c = context.master.apntag, c.anq.push(function() {
      a.pageOpts && c.anq.push(function() {
        c.debug = a.debug || !1;
        c.setPageOpts(a.pageOpts)
      });
      a.adUnits.forEach(function(a) {
        c.defineTag(a)
      })
    }), E(b, "https://acdn.adnxs.com/ast/ast.js", function() {
      c.anq.push(function() {
        c.loadTags();
        c.initialRequestMade = !0
      })
    }));
    var d = b.document.createElement("div");
    d.setAttribute("id",
      a.target);
    var e = b.document.getElementById("c");
    e && e.appendChild(d);
    c || (c = context.master.apntag, b.apntag = context.master.apntag);
    c.anq.push(function() {
      if (c.initialRequestMade) c.showTag(a.target, b.window);
      else c.onEvent("adAvailable", a.target, function() {
        c.showTag(a.target, b.window)
      });
      c.onEvent("adNoBid", a.target, function() {
        context.noContentAvailable()
      })
    })
  };

  function Ua(b, a) {
    if ("DFP" === a.adserver) {
      var c = {
        slot: a.slot,
        targeting: Criteo.ComputeDFPTargetingForAMP(a.cookiename || Criteo.PubTag.RTA.DefaultCrtgRtaCookieName, a.varname || Criteo.PubTag.RTA.DefaultCrtgContentName),
        width: a.width,
        height: a.height,
        type: "criteo"
      };
      O(b, c)
    }
  };
  var Va = ["width", "height", "id"];
  var Wa = ["https://go.eu.bbelements.com", "https://go.idnes.bbelements.com", "https://go.goldbachpoland.bbelements.com", "https://go.pol.bbelements.com", "https://go.idmnet.bbelements.com"];
  var Xa = ["nend_params"];
  var Ya = Object.prototype.hasOwnProperty;

  function Za(b, a) {
    for (var c in a) Ya.call(a, c) && (b[c] = a[c]);
    return b
  };
  var $a = ["adsafe", "section", "wordads"],
    ab = ["siteid"];

  function bb(b, a) {
    E(b, "https://ads.contextweb.com/ht.js", function() {
      var c = {
        timeout: a.timeout || 1E3,
        slots: [{
          cp: a.pid,
          ct: a.tagid,
          cf: a.width + "x" + a.height,
          placement: a.slot,
          elementId: "c"
        }],
        done: function(c) {
          O(b, {
            width: a.width,
            height: a.height,
            slot: a.slot,
            targeting: c[a.slot]
          })
        }
      };
      (new window.PulsePointHeaderTag(c)).init()
    })
  };

  function cb(b, a) {
    function c(a, b) {
      if ("object" === typeof b && ("V" === a || "I" === a))
        for (var c in b) b.hasOwnProperty(c) && ("V" === a && rubicontag.setFPV(c, b[c]), "I" === a && rubicontag.setFPI(c, b[c]))
    }

    function d() {
      if (!f) {
        f = !0;
        for (var c = rubicontag.getSlot("c").getAdServerTargeting(), d = /rpfl_\d+/i, e = 0; e < c.length; e++) d.test(c[e].key) && (c = c[e].values);
        a.targeting || (a.targeting = {});
        a.targeting["rpfl_" + a.account] = c;
        a.targeting.rpfl_elemid = "c";
        a.method && delete a.method;
        a.account && delete a.account;
        a.pos && delete a.pos;
        a.kw &&
          delete a.kw;
        a.visitor && delete a.visitor;
        a.inventory && delete a.inventory;
        O(b, a)
      }
    }
    var e = [
        [parseInt(a.overrideWidth || a.width, 10), parseInt(a.overrideHeight || a.height, 10)]
      ],
      f = !1;
    E(b, "https://ads.rubiconproject.com/header/" + encodeURIComponent(a.account) + ".js", function() {
      b.rubicontag.cmd.push(function() {
        var f = b.rubicontag,
          m = f.defineSlot(a.slot, e, "c");
        a.pos && m.setPosition(a.pos);
        a.kw && f.addKW(a.kw);
        a.visitor && c("V", a.visitor);
        a.inventory && c("I", a.inventory);
        f.setUrl(N(context.location.href));
        f.setIntegration("amp");
        f.run(d, 1E3)
      })
    })
  };
  var db = {
      taboola: !0,
      "mantis-recommend": !0,
      plista: !0,
      zergnet: !0,
      _ping_: !0
    },
    Y = location.hash.substr(1);
  0 == Y.indexOf("{%22") && (Y = decodeURIComponent(Y));
  var Z = Y ? JSON.parse(Y) : {};
  window.context = Z._context;
  (function() {
    A = ka;
    la();
    B()
  })();
  C.a9 = function(b, a) {
    I(a, [], ["aax_size", "aax_pubname", "aax_src"]);
    b.aax_size = a.aax_size;
    b.aax_pubname = a.aax_pubname;
    b.aax_src = a.aax_src;
    D(b, "https://c.amazon-adsystem.com/aax2/assoc.js")
  };
  C.accesstrade = function(b, a) {
    I(a, ["atops", "atrotid"]);
    b.atParams = a;
    D(b, "https://h.accesstrade.net/js/amp/amp.js")
  };
  C.adblade = function(b, a) {
    Ra("web.adblade.com", b, a)
  };
  C.adform = function(b, a) {
    I(a, [
      ["src", "bn", "mid"]
    ]);
    b.Adform = {
      ampData: a
    };
    var c = a.src,
      d = a.bn,
      e = a.mid,
      f;
    c ? (G(Object.keys(X).map(function(a) {
      return X[a]
    }), c), f = c) : d ? f = X.track + "/adfscript/?bn=" + encodeURIComponent(d) + ";msrc=1" : e && (f = X.adx + "/adx/?mid=" + encodeURIComponent(e));
    D(b, f)
  };
  C.adgeneration = function(b, a) {
    I(a, ["id"], ["targetid", "displayid", "adtype", "async", "option"]);
    var c = a.option ? Sa(a.option) : null,
      d = "https://i.socdm.com/sdk/js/adg-script-loader.js?id=" + encodeURIComponent(a.id) + "&width=" + encodeURIComponent(a.width) + "&height=" + encodeURIComponent(a.height) + "&adType=" + (a.adtype ? encodeURIComponent(a.adtype.toUpperCase()) : "FREE") + "&async=" + (a.async ? encodeURIComponent(a.async.toLowerCase()) : "false") + "&displayid=" + (a.displayid ? encodeURIComponent(a.displayid) : "1") + "&tagver=2.0.0" +
      (a.targetid ? "&targetID=" + encodeURIComponent(a.targetid) : "") + (c ? "&" + c : "");
    a.async && "true" === a.async.toLowerCase() ? E(b, d) : D(b, d)
  };
  C.adition = function(b, a) {
    I(a, ["version"]);
    b.data = a;
    D(b, "https://imagesrv.adition.com/js/amp/v" + encodeURIComponent(a.version) + ".js")
  };
  C.adman = function(b, a) {
    I(a, ["ws", "host", "s"], []);
    var c = b.document.createElement("script");
    c.setAttribute("data-ws", a.ws);
    c.setAttribute("data-h", a.host);
    c.setAttribute("data-s", a.s);
    c.setAttribute("data-tech", "amp");
    c.src = "https://static.adman.gr/adman.js";
    b.document.body.appendChild(c)
  };
  C.adreactor = function(b, a) {
    I(a, [], ["zid", "pid", "custom3"]);
    a = "https://adserver.adreactor.com/servlet/view/banner/javascript/zone?zid=" + encodeURIComponent(a.zid) + "&pid=" + encodeURIComponent(a.pid) + "&custom3=" + encodeURIComponent(a.custom3) + "&random=" + Math.floor(89999999 * Math.random() + 1E7) + "&millis=" + Date.now();
    D(b, a)
  };
  C.adsense = function(b, a) {
    I(a, [], "adClient adSlot adHost adtest tagOrigin experimentId".split(" "));
    b.context.clientId && (b.gaGlobal = {
      vid: b.context.clientId,
      hid: b.context.pageViewId
    });
    var c = b.document.createElement("script");
    c.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    b.document.body.appendChild(c);
    c = b.document.createElement("ins");
    c.setAttribute("data-ad-client", a.adClient);
    a.adSlot && c.setAttribute("data-ad-slot", a.adSlot);
    a.adHost && c.setAttribute("data-ad-host", a.adHost);
    null != a.adtest && c.setAttribute("data-adtest", a.adtest);
    a.tagOrigin && c.setAttribute("data-tag-origin", a.tagOrigin);
    c.setAttribute("data-page-url", b.context.canonicalUrl);
    c.setAttribute("class", "adsbygoogle");
    c.style.cssText = "display:inline-block;width:100%;height:100%;";
    var d = {};
    if (a.experimentId) {
      var e = a.experimentId.split(",");
      e && (d.params = {
        google_ad_modifications: {
          eids: e
        }
      })
    }
    b.document.getElementById("c").appendChild(c);
    (b.adsbygoogle = b.adsbygoogle || []).push(d)
  };
  C.adsnative = function(b, a) {
    try {
      I(a, ["anapiid"], ["ankv", "ancat", "antid"])
    } catch (t) {
      I(a, ["annid", "anwid"], ["ankv", "ancat", "antid"])
    }
    var c = void 0;
    if (a.ankv) {
      var c = {},
        d = a.ankv.split(","),
        e;
      for (e in d) {
        var f = d[e].split(":");
        c[f.pop()] = f.pop()
      }
    }
    var k = a.ancat ? a.ancat.split(",") : void 0;
    b._AdsNativeOpts = {
      apiKey: a.anapiid,
      networkKey: a.annid,
      nativeAdElementId: "adsnative_ampad",
      currentPageUrl: b.context.location.href,
      widgetId: a.anwid,
      templateKey: a.antid,
      categories: k,
      keyValues: c,
      amp: !0
    };
    var m = b.document.createElement("div"),
      q = b.document.getElementById("c");
    m.id = b._AdsNativeOpts.nativeAdElementId;
    q.appendChild(m);
    D(b, "https://static.adsnative.com/static/js/render.v1.js")
  };
  C.adspirit = function(b, a) {
    I(a, [], ["asmParams", "asmHost"]);
    var c = b.document.createElement("ins");
    c.setAttribute("data-asm-params", a.asmParams);
    c.setAttribute("data-asm-host", a.asmHost);
    c.setAttribute("class", "asm_async_creative");
    c.style.cssText = "display:inline-block;text-align:left;";
    b.document.getElementById("c").appendChild(c);
    c = b.document.createElement("script");
    c.src = "https://" + a.asmHost + "/adasync.js";
    b.document.body.appendChild(c)
  };
  C.adstir = function(b, a) {
    I(a, [], ["appId", "adSpot"]);
    var c = b.document.createElement("div");
    c.setAttribute("class", "adstir-ad-async");
    c.setAttribute("data-ver", "4.0");
    c.setAttribute("data-app-id", a.appId);
    c.setAttribute("data-ad-spot", a.adSpot);
    c.setAttribute("data-amp", !0);
    c.setAttribute("data-origin", b.context.location.href);
    b.document.getElementById("c").appendChild(c);
    E(b, "https://js.ad-stir.com/js/adstir_async.js")
  };
  C.adtech = function(b, a) {
    var c = a.src;
    if ("undefined" != typeof c) {
      G("https:", c);
      a = c;
      if (-1 === a.indexOf("/addyn/")) throw Error("Invalid src " + a);
      D(b, c)
    } else I(a, ["atwmn", "atwdiv"], "atwco atwheight atwhtnmat atwmoat atwnetid atwothat atwplid atwpolar atwsizes atwwidth".split(" ")), b.atwco = a.atwco, b.atwdiv = a.atwdiv, b.atwheight = a.atwheight, b.atwhtnmat = a.atwhtnmat, b.atwmn = a.atwmn, b.atwmoat = a.atwmoat, b.atwnetid = a.atwnetid, b.atwothat = a.atwothat, b.atwplid = a.atwplid, b.atwpolar = a.atwpolar, b.atwsizes = a.atwsizes, b.atwwidth =
      a.atwwidth, D(b, "https://s.aolcdn.com/os/ads/adsWrapper3.js")
  };
  C.aduptech = function(b, a) {
    I(a, ["placementkey"], ["query", "mincpc", "adtest"]);
    b.document.getElementById("c").setAttribute("id", "aduptech");
    E(b, "https://s.d.adup-tech.com/jsapi", function() {
      a.responsive = !0;
      window.uAd.embed("aduptech", a)
    })
  };
  C.advertserve = function(b, a) {
    I(a, [], ["zid", "pid", "client"]);
    a = "https://" + a.client + ".advertserve.com/servlet/view/banner/javascript/zone?amp=true&zid=" + encodeURIComponent(a.zid) + "&pid=" + encodeURIComponent(a.pid) + "&random=" + Math.floor(89999999 * Math.random() + 1E7) + "&millis=" + Date.now();
    D(b, a)
  };
  C.affiliateb = function(b, a) {
    I(a, ["afb_a", "afb_p", "afb_t"]);
    b.afbParam = a;
    D(b, "https://track.affiliate-b.com/amp/a.js")
  };
  C.amoad = function(b, a) {
    I(a, ["sid"], ["adType"]);
    var c, d = {};
    "native" === a.adType ? (c = "https://j.amoad.com/js/n.js", d["class"] = "amoad_native", d["data-sid"] = a.sid) : (c = "https://j.amoad.com/js/a.js", d["class"] = "amoad_frame sid_" + a.sid + " container_div sp");
    b.amoadOption = {
      ampData: a
    };
    var e = b.document.createElement("div");
    Object.keys(d).forEach(function(a) {
      e.setAttribute(a, d[a])
    });
    b.document.getElementById("c").appendChild(e);
    E(b, c)
  };
  C.appnexus = function(b, a) {
    function c(a) {
      for (var b = "https://ib.adnxs.com/ttj?", c = 0; c < a.length; c++) b += a[c] + "&";
      return b
    }
    var d = [];
    d.push("size=" + a.width + "x" + a.height);
    a.tagid ? (I(a, ["tagid"]), d.push("id=" + encodeURIComponent(a.tagid)), D(b, c(d))) : a.member && a.code ? (I(a, ["member", "code"]), d.push("member=" + encodeURIComponent(a.member)), d.push("inv_code=" + encodeURIComponent(a.code)), D(b, c(d))) : Ta(b, a)
  };
  C.atomx = function(b, a) {
    var c = ["click", "uv1", "uv2", "uv3", "context"];
    I(a, ["id"], c);
    for (var d = ["size=" + a.width + "x" + a.height, "id=" + encodeURIComponent(a.id)], e = 0; e < c.length; e++) {
      var f = c[e];
      f in a && d.push(f + "=" + encodeURIComponent(a[f]))
    }
    D(b, "https://s.ato.mx/p.js#" + d.join("&"))
  };
  C.caprofitx = function(b, a) {
    I(a, ["tagid"], []);
    b.caprofitxConfig = a;
    E(b, "https://cdn.caprofitx.com/tags/amp/profitx_amp.js")
  };
  C.chargeads = function(b, a) {
    a = a.src;
    G("https://www.chargeplatform.com/", a);
    D(b, a)
  };
  C.colombia = function(b, a) {
    I(a, ["clmb_slot", "clmb_position", "clmb_section", "clmb_divid", "loadingStrategy"]);
    (b._colombia = b._colombia || []).push({
      clmbslot: a.clmb_slot,
      clmbposition: a.clmb_position,
      clmbsection: a.clmb_section,
      clmbdivid: a.clmb_divid
    });
    b.context.observeIntersection(function(a) {
      a.forEach(function(a) {
        0 < a.intersectionRect.height && b._colombia.push({
          visible: !0,
          rect: a
        })
      })
    });
    E(b, "https://static.clmbtech.com/ad/commons/js/colombia-amp.js")
  };
  C.contentad = function(b, a) {
    I(a, [], ["id", "d", "wid", "url"]);
    b.id = a.id;
    b.d = a.d;
    b.wid = a.wid;
    b.url = a.url;
    var c = window.document.createElement("div");
    c.id = "contentad" + b.wid;
    window.document.body.appendChild(c);
    var d = window.context.location.href;
    a.url && (d = d.replace(window.context.location.host, a.url));
    var e = "https://api.content.ad/Scripts/widget2.aspx?id=" + encodeURIComponent(b.id) + "&d=" + encodeURIComponent(b.d) + "&wid=" + b.wid + "&url=" + encodeURIComponent(d) + "&cb=" + Date.now();
    D(b, e)
  };
  C.criteo = function(b, a) {
    E(b, "https://static.criteo.net/js/ld/publishertag.js", function() {
      "rta" === a.tagtype ? (H(window, "call-rta", function(b) {
        Criteo.CallRTA({
          networkid: a.networkid,
          cookiename: a.cookiename || Criteo.PubTag.RTA.DefaultCrtgRtaCookieName,
          varname: a.varname || Criteo.PubTag.RTA.DefaultCrtgContentName
        });
        b(null)
      }, function() {}), Ua(b, a)) : a.tagtype && "passback" !== a.tagtype || Criteo.DisplayAd({
        zoneid: a.zone,
        containerid: "c",
        integrationmode: "amp"
      })
    })
  };
  C.dotandads = function(b, a) {
    b.data = a;
    D(b, "https://amp.ad.dotandad.com/dotandadsAmp.js")
  };
  C.doubleclick = O;
  C.eplanning = function(b, a) {
    I(a, "epl_si epl_isv epl_sv epl_sec epl_kvs epl_e".split(" "));
    (b._eplanning = b._eplanning || []).push({
      sI: a.epl_si,
      isV: a.epl_isv,
      sV: a.epl_sv,
      sec: a.epl_sec,
      kVs: a.epl_kvs,
      e: a.epl_e
    });
    E(b, "https://us.img.e-planning.net/layers/epl-amp.js")
  };
  C.ezoic = function(b, a) {
    I(a, [], ["slot", "targeting", "extras"]);
    E(b, "https://g.ezoic.net/ezoic/ampad.js", function() {
      E(b, "https://www.googletagservices.com/tag/js/gpt.js", function() {
        b.googletag.cmd.push(function() {
          (new window.EzoicAmpAd(b, a)).createAd()
        })
      })
    })
  };
  C.facebook = function(b, a) {
    var c = a.embedAs || "post";
    B().assert(-1 !== ["post", "video"].indexOf(c), 'Attribute data-embed-as  for <amp-facebook> value is wrong, should be "post" or "video" was: %s', c);
    var d = b.document.createElement("div");
    d.className = "fb-" + c;
    d.setAttribute("data-href", a.href);
    b.document.getElementById("c").appendChild(d);
    Oa(b, function(b) {
      delete a.width;
      delete a.height;
      "post" === c && b.Event.subscribe("xfbml.resize", function(a) {
        context.updateDimensions(parseInt(a.width, 10), parseInt(a.height,
          10) + 20)
      });
      b.init({
        xfbml: !0,
        version: "v2.5"
      })
    })
  };
  C.flite = function(b, a) {
    I(a, [], ["guid", "mixins"]);
    var c = a.guid,
      d = b,
      e = encodeURIComponent,
      f, k = "";
    d.FLITE = d.FLITE || {};
    d.FLITE.config = d.FLITE.config || {};
    d.FLITE.config[c] = d.FLITE.config[c] || {};
    d.FLITE.config[c].cb = Math.random();
    d.FLITE.config[c].ts = +Number(new Date);
    b = b.context.location.href;
    f = b.match(/[A-Za-z]+:[/][/][A-Za-z0-9.-]+/);
    k = a.mixins ? "&dep=" + a.mixins : "";
    a = ["https://r.flite.com/syndication/uscript.js?i=", e(c), "&v=3", k, "&x=us0&cb=", d.FLITE.config[c].cb, "&d=", e(f && f[0] || b), "&tz=", (new Date).getTimezoneOffset()].join("");
    E(d, a)
  };
  C.genieessp = function(b, a) {
    I(a, ["vid", "zid"]);
    b.data = a;
    D(b, "https://js.gsspcln.jp/l/amp.js")
  };
  C.gmossp = function(b, a) {
    I(a, Va, []);
    b.gmosspParam = a;
    D(b, "https://cdn.gmossp-sp.jp/ads/amp.js")
  };
  C.ibillboard = function(b, a) {
    I(a, ["src"]);
    a = a.src;
    G(Wa, a);
    D(b, a)
  };
  C.imobile = function(b, a) {
    b.imobileParam = a;
    D(b, "https://spamp.i-mobile.co.jp/script/amp.js")
  };
  C.improvedigital = function(b, a) {
    I(a, ["placement"], ["width", "height", "optin", "keyvalue"]);
    var c = "https://ad.360yield.com/adj?p=" + encodeURIComponent(a.placement) + "&w=" + encodeURIComponent(a.width) + "&h=" + encodeURIComponent(a.height) + "&optin=" + encodeURIComponent(a.optin) + "&tz=" + (new Date).getTimezoneOffset();
    a = a.keyvalue;
    var d = "",
      e = "&",
      f = 0;
    if (a && 0 < a.length) {
      var k = a.split("&");
      for (a = 0; a < k.length; a++)
        if (k[a]) {
          var m = k[a].split("="),
            q = m[1] ? encodeURIComponent(m[1]) : "";
          0 < f && (d += e);
          f++;
          d += m[0] + "=" + q
        }
    }
    d && (c += "&" +
      d);
    D(b, c)
  };
  C.industrybrains = function(b, a) {
    Ra("web.industrybrains.com", b, a)
  };
  C.inmobi = function(b, a) {
    I(a, ["siteid", "slotid"], []);
    var c = {
      siteid: a.siteid,
      slot: a.slotid,
      manual: !0,
      onError: function(a) {
        "nfr" == a && (b.context.noContentAvailable(), document.getElementById("my-ad-slot").style.display = "none")
      },
      onSuccess: function() {
        b.context.renderStart()
      }
    };
    D(b, "https://cf.cdn.inmobi.com/ad/inmobi.secure.js", function() {
      b.document.write("<div id='my-ad-slot'></div>");
      b._inmobi.getNewAd(document.getElementById("my-ad-slot"), c)
    })
  };
  C.kargo = function(b, a) {
    I(a, ["site", "slot"], ["options"]);
    var c = "https://storage.cloud.kargo.com/ad/network/tag/v3/" + a.site + ".js",
      d = {};
    if (null != a.options) try {
      d = JSON.parse(a.options)
    } catch (e) {}
    d.source_window = b;
    H(b, "kargo-load", function(a) {
      var b = this;
      E(this, c, function() {
        var c = !1;
        null != b.Kargo && b.Kargo.loaded && (c = !0);
        a(c)
      })
    }, function(b) {
      if (b) b = d.source_window, b.context.isMaster || (b.Kargo = b.context.master.Kargo), b.Kargo.getAd(a.slot, d);
      else throw Error("Kargo AdTag failed to load");
    })
  };
  C.loka = function(b, a) {
    I(a, ["unitParams"], []);
    b.lokaParams = a;
    b.document.querySelector("#c").addEventListener("lokaUnitLoaded", function(a) {
      a.detail.isReady ? b.context.renderStart() : b.context.noContentAvailable()
    });
    E(b, "https://loka-cdn.akamaized.net/scene/amp.js")
  };
  C.mads = function(b, a) {
    I(a, ["adrequest"], []);
    D(b, "https://eu2.madsone.com/js/tags.js", function() {
      window.MADSAdrequest.adrequest(JSON.parse(a.adrequest))
    })
  };
  C["mantis-display"] = function(b, a) {
    I(a, ["property", "zone"], []);
    b.mantis = b.mantis || [];
    b.mantis.push(["display", "load", {
      property: a.property
    }]);
    var c = b.document.createElement("div");
    c.setAttribute("data-mantis-zone", a.zone);
    b.document.getElementById("c").appendChild(c);
    E(b, "https://assets.mantisadnetwork.com/mantodea.min.js")
  };
  C["mantis-recommend"] = function(b, a) {
    I(a, ["property"], ["css"]);
    b.mantis = b.mantis || [];
    b.mantis.push(["recommend", "load", {
      property: a.property,
      render: "recommended",
      css: a.css
    }]);
    a = b.document.createElement("div");
    a.setAttribute("id", "recommended");
    b.document.getElementById("c").appendChild(a);
    E(b, "https://assets.mantisadnetwork.com/recommend.min.js")
  };
  C.mediaimpact = function(b, a) {
    b.fif = !1;
    b.sas_loadHandler = function(a) {
      a.hasAd ? (a.crea1 || (a.crea1 = {
        width: 300,
        height: 250
      }), b.context.renderStart({
        width: a.crea1.width,
        height: a.crea1.height
      })) : b.context.noContentAvailable()
    };
    window.addEventListener("load", function() {
      asmi.sas.call(a.site + "/(" + a.page + ")", a.format, a.target + ";googleAMP=1;", "", "sas_" + a.slot.replace("sas_", ""), 1)
    }, !1);
    asmiSetup = {
      view: "m",
      async: !0
    };
    E(b, "https://ec-ns.sascdn.com/diff/251/pages/amp_default.js", function() {
      if (!document.getElementById("sas_" +
          a.slot.replace("sas_", ""))) {
        var c = b.document.createElement("div");
        c.id = "sas_" + a.slot.replace("sas_", "");
        b.document.body.appendChild(c)
      }
    })
  };
  C.meg = function(b, a) {
    I(a, ["code"]);
    a = a.code;
    var c = b.encodeURIComponent(b.navigator.language),
      d = b.encodeURIComponent(b.context.referrer),
      d = ["lang=" + c, "ref=" + d].join("&");
    b._megAdsLoaderCallbacks = {
      onSuccess: function() {
        b.context.renderStart()
      },
      onError: function() {
        b.context.noContentAvailable()
      }
    };
    E(b, "https://apps.meg.com/embedjs/" + a + "?" + d, function() {}, function() {
      b.context.noContentAvailable()
    })
  };
  C.microad = function(b, a) {
    I(a, [], "spot url referrer ifa appid geo".split(" "));
    b.document.getElementById("c").setAttribute("id", a.spot);
    E(b, "https://j.microad.net/js/camp.js", function() {
      MicroAd.Compass.showAd(a)
    })
  };
  C.mixpo = function(b, a) {
    I(a, ["guid", "subdomain"]);
    var c = b,
      d = "www" == a.subdomain ? "cdn" : a.subdomain + "-cdn";
    b = a.loader || "https://" + d + ".mixpo.com/js/loader.js";
    c.mixpoAd = {
      amp: !0,
      noflash: !0,
      width: a.width,
      height: a.height,
      guid: a.guid,
      subdomain: a.subdomain,
      embedv: a.embedv,
      clicktag: a.clicktag,
      customTarget: a.customtarget,
      dynClickthrough: a.dynclickthrough,
      viewTracking: a.viewtracking,
      customCSS: a.customcss,
      local: a.local,
      enableMRAID: a.enablemraid,
      jsPlayer: a.jsplayer
    };
    D(c, b)
  };
  C.nativo = function(b, a) {
    var c;
    (function(a, b, c) {
      function d(a) {
        return "undefined" != typeof a && !isNaN(a) && 0 <= parseInt(a, 10)
      }

      function e(a) {
        return d(a.delayByTime) && "delay" in a && !("delayByView" in a)
      }

      function f(a) {
        return d(a.delayByTime) && "delayByView" in a
      }

      function t() {
        b.context.observeIntersection(function(a) {
          var d = r(a);
          "undefined" != typeof d.rootBounds && d.intersectionRect.top == d.rootBounds.top + d.boundingClientRect.y && f(c) && !F && (b.PostRelease.Start(), F = !0)
        })
      }

      function u() {
        setTimeout(function() {
          b.PostRelease.Start();
          F = !0
        }, parseInt(c.delayByTime, 10))
      }

      function r(a) {
        return a[a.length - 1]
      }

      function Ea(a) {
        K = a
      }

      function P(a) {
        a = r(a);
        Ea(100 * a.intersectionRect.height / a.boundingClientRect.height / 100);
        b.PostRelease.checkIsAdVisible()
      }
      b.history.replaceState(null, null, location.pathname + location.hash.replace(/({).*(})/, ""));
      var F = !1,
        K, Q = b.context.location;
      a.getPercentageOfadViewed = function() {
        return K
      };
      a.getScriptURL = function() {
        return "https://s.ntv.io/serve/load.js"
      };
      a.setupAd = function() {
        b._prx = [
          ["cfg.Amp"]
        ];
        b._prx.push(["cfg.RequestUrl",
          c.requestUrl || Q.href
        ]);
        for (var a in c) switch (a) {
          case "premium":
            b._prx.push(["cfg.SetUserPremium"]);
            break;
          case "debug":
            b._prx.push(["cfg.Debug"]);
            break;
          case "delay":
            d(c.delayByTime) && b._prx.push(["cfg.SetNoAutoStart"])
        }
      };
      a.Start = function() {
        e(c) ? u() : f(c) && t();
        b.PostRelease.checkAmpViewability = function() {
          return a.getPercentageOfadViewed()
        };
        b.context.observeIntersection(P)
      }
    })(c || (c = {}), b, a);
    c.setupAd();
    E(b, c.getScriptURL(), c.Start)
  };
  C.nend = function(b, a) {
    I(a, Xa, []);
    b.nendParam = a;
    D(b, "https://js1.nend.net/js/amp.js")
  };
  C.nokta = function(b, a) {
    I(a, ["category", "site", "zone"]);
    b.category = a.category;
    b.site = a.site;
    b.zone = a.zone;
    b.iwidth = a.width;
    b.iheight = a.height;
    D(b, "https://static.virgul.com/theme/mockups/noktaamp/ampjs.js")
  };
  C.openadstream = function(b, a) {
    I(a, ["adhost", "sitepage", "pos"], ["query"]);
    var c = "https://" + encodeURIComponent(a.adhost) + "/3/" + a.sitepage + "/1" + String(Math.random()).substring(2, 11) + "@" + a.pos;
    a.query && (c = c + "?" + a.query);
    D(b, c)
  };
  C.openx = function(b, a) {
    var c = ["host", "nc", "auid", "dfpSlot", "dfp"],
      d = Za({}, a);
    I(a, [], c);
    a.dfpSlot && (c.forEach(function(b) {
      if (b in d && "dfp" !== b) {
        if (0 === b.indexOf("dfp")) {
          var c = b.substring(3),
            c = c.substring(0, 1).toLowerCase() + c.substring(1);
          d[c] = a[b]
        }
        delete d[b]
      }
    }), "dfp" in a && (Za(d, d.dfp), delete d.dfp));
    if (a.host) {
      var e = "https://" + a.host + "/mw/1.0/jstag";
      a.nc && a.dfpSlot ? (e += "?nc=" + encodeURIComponent(a.nc), D(b, e, function() {
        OX._requestArgs.amp = 1;
        O(b, d)
      })) : a.auid && (b.OX_cmds = [function() {
        var c = OX(),
          d = b.document.createElement("div");
        b.document.body.appendChild(d);
        OX._requestArgs.amp = 1;
        c.addAdUnit(a.auid);
        c.setAdSizes([a.width + "x" + a.height]);
        c.getOrCreateAdUnit(a.auid).set("anchor", d);
        c.load()
      }], E(b, e))
    } else a.dfpSlot && O(b, d)
  };
  C.plista = function(b, a) {
    I(a, [], "publickey widgetname urlprefix item geo categories countrycode".split(" "));
    var c = b.document.createElement("div");
    c.setAttribute("data-display", "plista_widget_" + a.widgetname);
    b.document.getElementById("c").appendChild(c);
    window.PLISTA = {
      publickey: a.publickey,
      widgets: [{
        name: a.widgetname,
        pre: a.urlprefix
      }],
      item: a.item,
      geo: a.geo,
      categories: a.categories,
      noCache: !0,
      useDocumentReady: !1,
      dataMode: "data-display"
    };
    E(b, "https://static" + (a.countrycode ? "-" + encodeURIComponent(a.countrycode) :
      "") + ".plista.com/async.js")
  };
  C.pubmatic = function(b, a) {
    E(b, "https://ads.pubmatic.com/AdServer/js/amp.js", function() {
      a.kadpageurl = b.context.location.href;
      PubMatic.showAd(a)
    })
  };
  C.pubmine = function(b, a) {
    I(a, ab, $a);
    var c;
    (function(a, b, c) {
      var d = {
          adSafe: "adsafe" in c ? c.adsafe : "0",
          amznPay: [],
          domain: M(N(b.context.location.href)).origin,
          pageURL: N(b.context.location.href),
          wordAds: "wordads" in c ? c.wordads : "0"
        },
        e = {
          sectionId: c.siteid + ("section" in c ? c.section : "1"),
          height: c.height,
          width: c.width
        };
      a.customParams = d;
      a.slotPrefix = "automattic-id-";
      a.displayAd = function(b) {
        a.ids = a.ids || {};
        a.ids[b] = 1
      };
      a.id = function() {
        return a.slotPrefix + (parseInt(1E4 * Math.random(), 10) + 1 + (new Date).getMilliseconds())
      };
      a.initAd = function() {
        var c = e || {},
          d = b.document,
          f = d.write,
          k = a.id();
        f.call(d, '<body style="margin:0;">');
        f.call(d, '<div id="' + k + '" data-section="' + (c.sectionId || 0) + '"' + (c.type ? 'data-type="' + c.type + '"' : "") + " " + (c.forcedUrl ? 'data-forcedurl="' + c.forcedUrl + '"' : "") + ' style="width:' + (c.width || 0) + "px; height:" + (c.height || 0) + 'px; margin: 0;">');
        a.displayAd(k);
        f.call(d, "</div></body>")
      }
    })(c || (c = {}), b, a);
    b.__ATA = c;
    c.initAd();
    E(b, "https://s.pubmine.com/showad.js")
  };
  C.pulsepoint = function(b, a) {
    I(a, [], ["pid", "tagid", "tagtype", "slot", "timeout"]);
    "hb" === a.tagtype ? bb(b, a) : D(b, "https://tag.contextweb.com/getjs.aspx?action=VIEWAD&cwpid=" + encodeURIComponent(a.pid) + "&cwtagid=" + encodeURIComponent(a.tagid) + "&cwadformat=" + encodeURIComponent(a.width + "X" + a.height))
  };
  C.purch = function(b, a) {
    I(a, [], ["pid", "divid"]);
    b.data = a;
    G("https:", "https://ramp.purch.com/serve/creative_amp.js");
    D(b, "https://ramp.purch.com/serve/creative_amp.js")
  };
  C.revcontent = function(b, a) {
    I(a, [], "id width height endpoint ssl wrapper".split(" "));
    b.data = a;
    D(window, "https://labs-cdn.revcontent.com/build/amphtml/revcontent.amp.min.js")
  };
  C.rubicon = function(b, a) {
    I(a, [], "slot targeting categoryExclusions tagForChildDirectedTreatment cookieOptions overrideWidth overrideHeight loadingStrategy consentNotificationId useSameDomainRenderingUntilDeprecated account site zone size pos kw visitor inventory type method callback".split(" "));
    if ("fastLane" === a.method) cb(b, a);
    else {
      var c = N(context.location.href);
      b.rp_account = a.account;
      b.rp_site = a.site;
      b.rp_zonesize = a.zone + "-" + a.size;
      b.rp_adtype = "js";
      b.rp_page = c;
      b.rp_kw = a.kw;
      b.rp_visitor = a.visitor;
      b.rp_inventory = a.inventory;
      b.rp_amp = "st";
      b.rp_callback = a.callback;
      D(b, "https://ads.rubiconproject.com/ad/" + encodeURIComponent(a.account) + ".js")
    }
  };
  C.sharethrough = function(b, a) {
    I(a, ["pkey"], []);
    b.pkey = a.pkey;
    D(b, "https://native.sharethrough.com/iframe/amp.js")
  };
  C.smartadserver = function(b, a) {
    E(b, "https://ec-ns.sascdn.com/diff/js/amp.v0.js", function() {
      b.sas.callAmpAd(a)
    })
  };
  C.sortable = function(b, a) {
    I(a, ["site", "name"]);
    var c = b.document.getElementById("c"),
      d = b.document.createElement("div");
    d.className = "ad-tag";
    d.setAttribute("data-ad-name", a.name);
    d.setAttribute("data-ad-size", a.width + "x" + a.height);
    c.appendChild(d);
    E(b, "https://tags-cdn.deployads.com/a/" + encodeURIComponent(a.site) + ".js")
  };
  C.sovrn = function(b, a) {
    b.width = a.width;
    b.height = a.height;
    b.domain = a.domain;
    b.u = a.u;
    b.iid = a.iid;
    b.aid = a.aid;
    b.z = a.z;
    b.tf = a.tf;
    D(b, "https://ap.lijit.com/www/sovrn_amp/sovrn_ads.js")
  };
  C.taboola = function(b, a) {
    var c = ["height", "type", "width", "placement", "mode"];
    I(a, ["publisher", "placement", "mode", "article video photo search category homepage others".split(" ")]);
    var d = {
      referrer: a.referrer || b.context.referrer,
      url: a.url || b.context.canonicalUrl
    };
    Object.keys(a).forEach(function(b) {
      -1 === c.indexOf(b) && (d[b] = a[b])
    });
    (b._taboola = b._taboola || []).push([{
      viewId: b.context.pageViewId,
      publisher: a.publisher,
      placement: a.placement,
      mode: a.mode,
      framework: "amp",
      container: "c"
    }, d, {
      flush: !0
    }]);
    b.context.observeIntersection(function(c) {
      c.forEach(function(c) {
        c.intersectionRect.height &&
          b._taboola.push({
            visible: !0,
            rects: c,
            placement: a.placement
          })
      })
    });
    E(b, "https://cdn.taboola.com/libtrc/" + encodeURIComponent(a.publisher) + "/loader.js")
  };
  C.teads = function(b, a) {
    b._teads_amp = {
      allowed_data: ["pid", "tag"],
      mandatory_data: ["pid"],
      mandatory_tag_data: ["tta", "ttp"],
      data: a
    };
    I(a, b._teads_amp.mandatory_data, b._teads_amp.allowed_data);
    a.tag ? (I(a.tag, b._teads_amp.mandatory_tag_data), b._tta = a.tag.tta, b._ttp = a.tag.ttp, E(b, "https://cdn.teads.tv/media/format/" + encodeURI(a.tag.js || "v3/teads-format.min.js"))) : E(b, "https://a.teads.tv/page/" + encodeURIComponent(a.pid) + "/tag")
  };
  C.triplelift = function(b, a) {
    a = a.src;
    G("https://ib.3lift.com/", a);
    E(b, a)
  };
  C.twitter = function(b, a) {
    function c(a) {
      var b = a.offsetHeight;
      0 != b && context.updateDimensions(a.offsetWidth, b + 20)
    }
    var d = b.document.createElement("div");
    d.id = "tweet";
    d.style.width = "100%";
    d.style.display = "flex";
    d.style.alignItems = "center";
    d.style.justifyContent = "center";
    b.document.getElementById("c").appendChild(d);
    Pa(b, function(b) {
      delete a.width;
      delete a.height;
      var e;
      b.events.bind("resize", function(a) {
        e === a.target && c(e)
      });
      b.widgets.createTweet(a.tweetid, d, a).then(function(a) {
        a && (e = a, c(e))
      })
    })
  };
  C.webediads = function(b, a) {
    I(a, ["site", "page", "position"], ["query"]);
    E(b, "https://eu1.wbdds.com/amp.min.js", function() {
      b.wads.amp.init({
        site: a.site,
        page: a.page,
        position: a.position,
        query: a.query ? a.query : ""
      })
    })
  };
  C["weborama-display"] = function(b, a) {
    var c = "wbo_bid_price wbo_price_paid wbo_random wbo_debug wbo_host wbo_publisherclick wbo_customparameter wbo_disable_unload_event wbo_donottrack wbo_script_variant wbo_is_mobile wbo_vars wbo_weak_encoding".split(" ");
    I(a, ["width", "height", "wbo_account_id", "wbo_tracking_element_id", "wbo_fullhost"], c);
    b.weborama_display_tag = {
      forcesecure: !0,
      bursttarget: "self",
      burst: "never",
      width: a.width,
      height: a.height,
      account_id: a.wbo_account_id,
      customparameter: a.wbo_customparameter,
      tracking_element_id: a.wbo_tracking_element_id,
      host: a.wbo_host,
      fullhost: a.wbo_fullhost,
      bid_price: a.wbo_bid_price,
      price_paid: a.wbo_price_paid,
      random: a.wbo_random,
      debug: a.wbo_debug,
      publisherclick: a.wbo_publisherclick,
      disable_unload_event: a.wbo_disable_unload_event,
      donottrack: a.wbo_donottrack,
      script_variant: a.wbo_script_variant,
      is_mobile: a.wbo_is_mobile,
      vars: a.wbo_vars,
      weak_encoding: a.wbo_weak_encoding
    };
    D(b, "https://cstatic.weborama.fr/js/advertiserv2/adperf_launch_1.0.0_scrambled.js")
  };
  C.widespace = function(b, a) {
    I(a, ["sid"], []);
    a = "https://engine.widespace.com/map/engine/dynamic?isamp=1&sid=" + encodeURIComponent(a.sid);
    D(b, a)
  };
  C.yahoojp = function(b, a) {
    I(a, ["yadsid"], []);
    b.yahoojpParam = a;
    D(b, "https://s.yimg.jp/images/listing/tool/yads/ydn/amp/amp.js")
  };
  C.yieldbot = function(b, a) {
    I(a, ["psn", "ybSlot", "slot"], "targeting categoryExclusions tagForChildDirectedTreatment cookieOptions overrideWidth overrideHeight".split(" "));
    b.ybotq = b.ybotq || [];
    E(b, "https://cdn.yldbt.com/js/yieldbot.intent.amp.js", function() {
      b.ybotq.push(function() {
        try {
          var c = [
            [parseInt(a.overrideWidth || a.width, 10), parseInt(a.overrideHeight || a.height, 10)]
          ];
          b.yieldbot.psn(a.psn);
          b.yieldbot.enableAsync();
          if (window.context.isMaster) b.yieldbot.defineSlot(a.ybSlot, {
            sizes: c
          }), b.yieldbot.go();
          else {
            var d = {};
            d[a.ybSlot] = c;
            b.yieldbot.nextPageview(d)
          }
        } catch (e) {
          y(e)
        }
      });
      b.ybotq.push(function() {
        try {
          var c = b.yieldbot.getSlotCriteria(a.ybSlot);
          a.targeting = a.targeting || {};
          for (var d in c) a.targeting[d] = c[d]
        } catch (e) {
          y(e)
        }
        delete a.ybSlot;
        delete a.psn;
        O(b, a)
      })
    })
  };
  C.yieldmo = function(b, a) {
    var c = b.document.createElement("div");
    c.id = "ym_" + a.ymid;
    c.className = "ym";
    c.dataset.ampEnabled = !0;
    b.document.getElementById("c").appendChild(c);
    var d = "https://static.yieldmo.com/ym.amp1.js";
    E(b, d)
  };
  C.zergnet = function(b, a) {
    I(a, ["zergid"], []);
    b.zergnetWidgetId = a.zergid;
    D(b, "https://www.zergnet.com/zerg-amp.js")
  };
  C.yieldone = function(b, a) {
    I(a, ["pubid", "pid", "width", "height"], []);
    b.yieldoneParam = a;
    D(b, "https://img.ak.impact-ad.jp/ic/pone/commonjs/yone-amp.js")
  };
  C.zucks = function(b, a) {
    I(a, ["frameId"]);
    D(b, "https://j.zucks.net.zimg.jp/j?f=" + a.frameId)
  };
  var eb = ["facebook", "twitter", "doubleclick", "yieldbot", "_ping_"];

  function fb(b) {
    var a = window,
      c = Z.type;
    B().assert("AMP-EMBED" == a.context.tagName ? !!db[Z.type] : !0, "Embed type %s not allowed with tag %s", Z.type, a.context.tagName);
    b ? b(Z, function(b) {
      B().assert(b, "Expected configuration to be passed as first argument");
      na(c, a, b)
    }) : na(c, a, Z)
  }

  function gb() {
    return window.context.master == window
  }
  window.draw3p = function(b, a, c) {
    try {
      hb();
      window.context.location = M(Z._context.location.href);
      ib();
      jb(a);
      c && kb(c);
      Object.defineProperties(window.context, {
        master: {
          get: function() {
            var a = "frame_" + Z.type + "_master",
              b;
            try {
              b = window.parent.frames[a]
            } catch (m) {}
            b || (window.name = a, b = window);
            return b
          }
        },
        isMaster: {
          get: gb
        }
      });
      window.context.data = Z;
      window.context.noContentAvailable = lb;
      window.context.requestResize = mb;
      window.context.renderStart = nb;
      if ("facebook" === Z.type || "twitter" === Z.type) window.context.updateDimensions =
        ob;
      var d = window.context.initialIntersection;
      window.context.observeIntersection = function(a) {
        var b = pb(a);
        oa(function() {
          return a([d])
        });
        return b
      };
      window.context.onResizeSuccess = qb;
      window.context.onResizeDenied = rb;
      window.context.reportRenderedEntityIdentifier = sb;
      window.context.computeInMasterFrame = H;
      delete Z._context;
      W(window);
      Na();
      fb(b);
      tb();
      R("send-embed-state");
      R("bootstrap-loaded")
    } catch (f) {
      var e = window.context || {
        mode: {
          test: !1
        }
      };
      if (!e.mode.test) throw ub(f, e.canary), f;
    }
  };

  function lb() {
    R("no-content")
  }

  function ob(b, a) {
    R("embed-size", {
      width: b,
      height: a
    })
  }

  function mb(b, a) {
    R("embed-size", {
      width: b,
      height: a
    })
  }

  function nb(b) {
    R("render-start", b)
  }

  function pb(b) {
    R("send-intersections");
    return T("intersection", function(a) {
      b(a.changes)
    })
  }

  function tb() {
    var b = window;
    T("embed-state", function(a) {
      b.context.hidden = a.pageHidden;
      var c = b.document.createEvent("Event");
      c.data = {
        hidden: a.pageHidden
      };
      c.initEvent("amp:visibilitychange", !0, !0);
      b.dispatchEvent(c)
    })
  }

  function qb(b) {
    return T("embed-size-changed", function(a) {
      b(a.requestedHeight, a.requestedWidth)
    })
  }

  function rb(b) {
    return T("embed-size-denied", function(a) {
      b(a.requestedHeight, a.requestedWidth)
    })
  }

  function sb(b) {
    B().assert("string" == typeof b, "entityId should be a string %s", b);
    R("entity-id", {
      id: b
    })
  }

  function ib() {
    var b = window.context.location,
      a = window.location.ancestorOrigins;
    a && a.length && B().assert(a[0] == b.origin, "Parent origin mismatch: %s, %s", a[0], b.origin)
  }

  function jb(b) {
    var a = window,
      c = Z.type,
      d = M(qa).hostname;
    a.location.hostname != d && (ra.test(a.location.hostname) || "ads.localhost" != a.location.hostname && -1 == eb.indexOf(c) && B().assert(b && -1 != b.indexOf(c), "Non-whitelisted 3p type for custom iframe: " + c))
  }

  function kb(b) {
    var a = window;
    if (!a.document.referrer) throw Error("Referrer expected: " + a.location.href);
    var c = a.location.ancestorOrigins,
      d = c ? c[0] : a.document.referrer,
      c = M(d).hostname,
      e = M(sa).hostname,
      f = c == e;
    f && (c = M(N(a.document.referrer)).hostname);
    for (a = 0; a < b.length; a++) {
      var k;
      if (!(k = b[a] == c)) {
        k = "." + b[a];
        var m = c.length - k.length;
        k = 0 <= m && c.indexOf(k, m) == m
      }
      if (k) return
    }
    throw Error("Invalid embedding hostname: " + c + " not in " + b);
  }

  function hb() {
    var b = window;
    if (b == b.parent) throw Error("Must be framed: " + b.location.href);
  }

  function ub(b, a) {
    (new Image).src = ta + "?3p=1&v=" + encodeURIComponent("1477334765771") + "&m=" + encodeURIComponent(b.message) + "&ca=" + (a ? 1 : 0) + "&r=" + encodeURIComponent(document.referrer) + "&s=" + encodeURIComponent(b.stack || "")
  };
})();
//# sourceMappingURL=f.js.map
