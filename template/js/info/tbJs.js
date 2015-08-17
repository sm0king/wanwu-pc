(function() {
    var e = this;
    var t = e._;
    var r = {};
    var i = Array.prototype,
        a = Object.prototype,
        n = Function.prototype;
    var s = i.slice,
        l = i.unshift,
        o = a.toString,
        c = a.hasOwnProperty;
    var u = i.forEach,
        f = i.map,
        d = i.reduce,
        h = i.reduceRight,
        p = i.filter,
        g = i.every,
        v = i.some,
        _ = i.indexOf,
        y = i.lastIndexOf,
        m = Array.isArray,
        b = Object.keys,
        C = n.bind;
    var J = function(e) {
        return new E(e)
    };
    if (typeof module !== "undefined" && module.exports) {
        module.exports = J;
        J._ = J
    } else {
        e["_"] = J
    }
    J.VERSION = "1.1.6";
    var T = J.each = J.forEach = function(e, t, i) {
        if (e == null) return;
        if (u && e.forEach === u) {
            e.forEach(t, i)
        } else if (J.isNumber(e.length)) {
            for (var a = 0, n = e.length; a < n; a++) {
                if (a in e && t.call(i, e[a], a, e) === r) return
            }
        } else {
            for (var s in e) {
                if (c.call(e, s)) {
                    if (t.call(i, e[s], s, e) === r) return
                }
            }
        }
    };
    J.map = function(e, t, r) {
        var i = [];
        if (e == null) return i;
        if (f && e.map === f) return e.map(t, r);
        T(e, function(e, a, n) {
            i[i.length] = t.call(r, e, a, n)
        });
        return i
    };
    J.reduce = J.foldl = J.inject = function(e, t, r, i) {
        var a = r !== void 0;
        if (e == null) e = [];
        if (d && e.reduce === d) {
            if (i) t = J.bind(t, i);
            return a ? e.reduce(t, r) : e.reduce(t)
        }
        T(e, function(e, n, s) {
            if (!a && n === 0) {
                r = e;
                a = true
            } else {
                r = t.call(i, r, e, n, s)
            }
        });
        if (!a) throw new TypeError("Reduce of empty array with no initial value");
        return r
    };
    J.reduceRight = J.foldr = function(e, t, r, i) {
        if (e == null) e = [];
        if (h && e.reduceRight === h) {
            if (i) t = J.bind(t, i);
            return r !== void 0 ? e.reduceRight(t, r) : e.reduceRight(t)
        }
        var a = (J.isArray(e) ? e.slice() : J.toArray(e)).reverse();
        return J.reduce(a, t, r, i)
    };
    J.find = J.detect = function(e, t, r) {
        var i;
        w(e, function(e, a, n) {
            if (t.call(r, e, a, n)) {
                i = e;
                return true
            }
        });
        return i
    };
    J.filter = J.select = function(e, t, r) {
        var i = [];
        if (e == null) return i;
        if (p && e.filter === p) return e.filter(t, r);
        T(e, function(e, a, n) {
            if (t.call(r, e, a, n)) i[i.length] = e
        });
        return i
    };
    J.reject = function(e, t, r) {
        var i = [];
        if (e == null) return i;
        T(e, function(e, a, n) {
            if (!t.call(r, e, a, n)) i[i.length] = e
        });
        return i
    };
    J.every = J.all = function(e, t, i) {
        var a = true;
        if (e == null) return a;
        if (g && e.every === g) return e.every(t, i);
        T(e, function(e, n, s) {
            if (!(a = a && t.call(i, e, n, s))) return r
        });
        return a
    };
    var w = J.some = J.any = function(e, t, i) {
        t || (t = J.identity);
        var a = false;
        if (e == null) return a;
        if (v && e.some === v) return e.some(t, i);
        T(e, function(e, n, s) {
            if (a = t.call(i, e, n, s)) return r
        });
        return a
    };
    J.include = J.contains = function(e, t) {
        var r = false;
        if (e == null) return r;
        if (_ && e.indexOf === _) return e.indexOf(t) != -1;
        w(e, function(e) {
            if (r = e === t) return true
        });
        return r
    };
    J.invoke = function(e, t) {
        var r = s.call(arguments, 2);
        return J.map(e, function(e) {
            return (t.call ? t || e : e[t]).apply(e, r)
        })
    };
    J.pluck = function(e, t) {
        return J.map(e, function(e) {
            return e[t]
        })
    };
    J.max = function(e, t, r) {
        if (!t && J.isArray(e)) return Math.max.apply(Math, e);
        var i = {
            computed: -Infinity
        };
        T(e, function(e, a, n) {
            var s = t ? t.call(r, e, a, n) : e;
            s >= i.computed && (i = {
                value: e,
                computed: s
            })
        });
        return i.value
    };
    J.min = function(e, t, r) {
        if (!t && J.isArray(e)) return Math.min.apply(Math, e);
        var i = {
            computed: Infinity
        };
        T(e, function(e, a, n) {
            var s = t ? t.call(r, e, a, n) : e;
            s < i.computed && (i = {
                value: e,
                computed: s
            })
        });
        return i.value
    };
    J.sortBy = function(e, t, r) {
        return J.pluck(J.map(e, function(e, i, a) {
            return {
                value: e,
                criteria: t.call(r, e, i, a)
            }
        }).sort(function(e, t) {
            var r = e.criteria,
                i = t.criteria;
            return r < i ? -1 : r > i ? 1 : 0
        }), "value")
    };
    J.groupBy = function(e, t) {
        var r = {};
        T(e, function(e, i) {
            var a = t(e, i);
            (r[a] || (r[a] = [])).push(e)
        });
        return r
    };
    J.sortedIndex = function(e, t, r) {
        r || (r = J.identity);
        var i = 0,
            a = e.length;
        while (i < a) {
            var n = i + a >> 1;
            r(e[n]) < r(t) ? i = n + 1 : a = n
        }
        return i
    };
    J.toArray = function(e) {
        if (!e) return [];
        if (e.toArray) return e.toArray();
        if (J.isArray(e)) return s.call(e);
        if (J.isArguments(e)) return s.call(e);
        return J.values(e)
    };
    J.size = function(e) {
        return J.toArray(e).length
    };
    J.first = J.head = function(e, t, r) {
        return t != null && !r ? s.call(e, 0, t) : e[0]
    };
    J.rest = J.tail = function(e, t, r) {
        return s.call(e, t == null || r ? 1 : t)
    };
    J.last = function(e) {
        return e[e.length - 1]
    };
    J.compact = function(e) {
        return J.filter(e, function(e) {
            return !!e
        })
    };
    J.flatten = function(e) {
        return J.reduce(e, function(e, t) {
            if (J.isArray(t)) return e.concat(J.flatten(t));
            e[e.length] = t;
            return e
        }, [])
    };
    J.without = function(e) {
        var t = s.call(arguments, 1);
        return J.filter(e, function(e) {
            return !J.include(t, e)
        })
    };
    J.uniq = J.unique = function(e, t) {
        return J.reduce(e, function(e, r, i) {
            if (0 == i || (t === true ? J.last(e) != r : !J.include(e, r))) e[e.length] = r;
            return e
        }, [])
    };
    J.intersect = function(e) {
        var t = s.call(arguments, 1);
        return J.filter(J.uniq(e), function(e) {
            return J.every(t, function(t) {
                return J.indexOf(t, e) >= 0
            })
        })
    };
    J.zip = function() {
        var e = s.call(arguments);
        var t = J.max(J.pluck(e, "length"));
        var r = new Array(t);
        for (var i = 0; i < t; i++) r[i] = J.pluck(e, "" + i);
        return r
    };
    J.indexOf = function(e, t, r) {
        if (e == null) return -1;
        var i, a;
        if (r) {
            i = J.sortedIndex(e, t);
            return e[i] === t ? i : -1
        }
        if (_ && e.indexOf === _) return e.indexOf(t);
        for (i = 0, a = e.length; i < a; i++)
            if (e[i] === t) return i;
        return -1
    };
    J.lastIndexOf = function(e, t) {
        if (e == null) return -1;
        if (y && e.lastIndexOf === y) return e.lastIndexOf(t);
        var r = e.length;
        while (r--)
            if (e[r] === t) return r;
        return -1
    };
    J.range = function(e, t, r) {
        if (arguments.length <= 1) {
            t = e || 0;
            e = 0
        }
        r = arguments[2] || 1;
        var i = Math.max(Math.ceil((t - e) / r), 0);
        var a = 0;
        var n = new Array(i);
        while (a < i) {
            n[a++] = e;
            e += r
        }
        return n
    };
    J.bind = function(e, t) {
        if (e.bind === C && C) return C.apply(e, s.call(arguments, 1));
        var r = s.call(arguments, 2);
        return function() {
            return e.apply(t, r.concat(s.call(arguments)))
        }
    };
    J.bindAll = function(e) {
        var t = s.call(arguments, 1);
        if (t.length == 0) t = J.functions(e);
        T(t, function(t) {
            e[t] = J.bind(e[t], e)
        });
        return e
    };
    J.memoize = function(e, t) {
        var r = {};
        t || (t = J.identity);
        return function() {
            var i = t.apply(this, arguments);
            return c.call(r, i) ? r[i] : r[i] = e.apply(this, arguments)
        }
    };
    J.delay = function(e, t) {
        var r = s.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(e, r)
        }, t)
    };
    J.defer = function(e) {
        return J.delay.apply(J, [e, 1].concat(s.call(arguments, 1)))
    };
    var k = function(e, t, r) {
        var i;
        return function() {
            var a = this,
                n = arguments;
            var s = function() {
                i = null;
                e.apply(a, n)
            };
            if (r) clearTimeout(i);
            if (r || !i) i = setTimeout(s, t)
        }
    };
    J.throttle = function(e, t) {
        return k(e, t, false)
    };
    J.debounce = function(e, t) {
        return k(e, t, true)
    };
    J.once = function(e) {
        var t = false,
            r;
        return function() {
            if (t) return r;
            t = true;
            return r = e.apply(this, arguments)
        }
    };
    J.wrap = function(e, t) {
        return function() {
            var r = [e].concat(s.call(arguments));
            return t.apply(this, r)
        }
    };
    J.compose = function() {
        var e = s.call(arguments);
        return function() {
            var t = s.call(arguments);
            for (var r = e.length - 1; r >= 0; r--) {
                t = [e[r].apply(this, t)]
            }
            return t[0]
        }
    };
    J.after = function(e, t) {
        return function() {
            if (--e < 1) {
                return t.apply(this, arguments)
            }
        }
    };
    J.keys = b || function(e) {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var t = [];
        for (var r in e)
            if (c.call(e, r)) t[t.length] = r;
        return t
    };
    J.values = function(e) {
        return J.map(e, J.identity)
    };
    J.functions = J.methods = function(e) {
        return J.filter(J.keys(e), function(t) {
            return J.isFunction(e[t])
        }).sort()
    };
    J.extend = function(e) {
        T(s.call(arguments, 1), function(t) {
            for (var r in t) {
                if (t[r] !== void 0) e[r] = t[r]
            }
        });
        return e
    };
    J.defaults = function(e) {
        T(s.call(arguments, 1), function(t) {
            for (var r in t) {
                if (e[r] == null) e[r] = t[r]
            }
        });
        return e
    };
    J.clone = function(e) {
        return J.isArray(e) ? e.slice() : J.extend({}, e)
    };
    J.tap = function(e, t) {
        t(e);
        return e
    };
    J.isEqual = function(e, t) {
        if (e === t) return true;
        var r = typeof e,
            i = typeof t;
        if (r != i) return false;
        if (e == t) return true;
        if (!e && t || e && !t) return false;
        if (e._chain) e = e._wrapped;
        if (t._chain) t = t._wrapped;
        if (e.isEqual) return e.isEqual(t);
        if (t.isEqual) return t.isEqual(e);
        if (J.isDate(e) && J.isDate(t)) return e.getTime() === t.getTime();
        if (J.isNaN(e) && J.isNaN(t)) return false;
        if (J.isRegExp(e) && J.isRegExp(t)) return e.source === t.source && e.global === t.global && e.ignoreCase === t.ignoreCase && e.multiline === t.multiline;
        if (r !== "object") return false;
        if (e.length && e.length !== t.length) return false;
        var a = J.keys(e),
            n = J.keys(t);
        if (a.length != n.length) return false;
        for (var s in e)
            if (!(s in t) || !J.isEqual(e[s], t[s])) return false;
        return true
    };
    J.isEmpty = function(e) {
        if (J.isArray(e) || J.isString(e)) return e.length === 0;
        for (var t in e)
            if (c.call(e, t)) return false;
        return true
    };
    J.isElement = function(e) {
        return !!(e && e.nodeType == 1)
    };
    J.isArray = m || function(e) {
        return o.call(e) === "[object Array]"
    };
    J.isObject = function(e) {
        return e === Object(e)
    };
    J.isArguments = function(e) {
        return !!(e && c.call(e, "callee"))
    };
    J.isFunction = function(e) {
        return !!(e && e.constructor && e.call && e.apply)
    };
    J.isString = function(e) {
        return !!(e === "" || e && e.charCodeAt && e.substr)
    };
    J.isNumber = function(e) {
        return !!(e === 0 || e && e.toExponential && e.toFixed)
    };
    J.isNaN = function(e) {
        return e !== e
    };
    J.isBoolean = function(e) {
        return e === true || e === false
    };
    J.isDate = function(e) {
        return !!(e && e.getTimezoneOffset && e.setUTCFullYear)
    };
    J.isRegExp = function(e) {
        return !!(e && e.test && e.exec && (e.ignoreCase || e.ignoreCase === false))
    };
    J.isNull = function(e) {
        return e === null
    };
    J.isUndefined = function(e) {
        return e === void 0
    };
    J.noConflict = function() {
        e._ = t;
        return this
    };
    J.identity = function(e) {
        return e
    };
    J.times = function(e, t, r) {
        for (var i = 0; i < e; i++) t.call(r, i)
    };
    J.mixin = function(e) {
        T(J.functions(e), function(t) {
            D(t, J[t] = e[t])
        })
    };
    var S = 0;
    J.uniqueId = function(e) {
        var t = S++;
        return e ? e + t : t
    };
    J.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g
    };
    J.template = function(e, t) {
        var r = J.templateSettings;
        var i = "var __p=[],print=function(){__p.push.apply(__p,arguments);};" + "with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(r.interpolate, function(e, t) {
            return "'," + t.replace(/\\'/g, "'") + ",'"
        }).replace(r.evaluate || null, function(e, t) {
            return "');" + t.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
        var a = new Function("obj", i);
        return t ? a(t) : a
    };
    var E = function(e) {
        this._wrapped = e
    };
    J.prototype = E.prototype;
    var A = function(e, t) {
        return t ? J(e).chain() : e
    };
    var D = function(e, t) {
        E.prototype[e] = function() {
            var e = s.call(arguments);
            l.call(e, this._wrapped);
            return A(t.apply(J, e), this._chain)
        }
    };
    J.mixin(J);
    T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = i[e];
        E.prototype[e] = function() {
            t.apply(this._wrapped, arguments);
            return A(this._wrapped, this._chain)
        }
    });
    T(["concat", "join", "slice"], function(e) {
        var t = i[e];
        E.prototype[e] = function() {
            return A(t.apply(this._wrapped, arguments), this._chain)
        }
    });
    E.prototype.chain = function() {
        this._chain = true;
        return this
    };
    E.prototype.value = function() {
        return this._wrapped
    }
})();
(function() {
    var e = this;
    var t = e.Backbone;
    var i;
    if (typeof exports !== "undefined") {
        i = exports
    } else {
        i = e.Backbone = {}
    }
    i.VERSION = "0.5.1";
    var r = e._;
    if (!r && typeof require !== "undefined") r = require("underscore")._;
    var a = e.jQuery || e.Zepto;
    i.noConflict = function() {
        e.Backbone = t;
        return this
    };
    i.emulateHTTP = false;
    i.emulateJSON = false;
    i.Events = {
        bind: function(e, t) {
            var i = this._callbacks || (this._callbacks = {});
            var r = i[e] || (i[e] = []);
            r.push(t);
            return this
        },
        unbind: function(e, t) {
            var i;
            if (!e) {
                this._callbacks = {}
            } else if (i = this._callbacks) {
                if (!t) {
                    i[e] = []
                } else {
                    var r = i[e];
                    if (!r) return this;
                    for (var a = 0, n = r.length; a < n; a++) {
                        if (t === r[a]) {
                            r[a] = null;
                            break
                        }
                    }
                }
            }
            return this
        },
        trigger: function(e) {
            var t, i, r, a, n;
            var s = 2;
            if (!(i = this._callbacks)) return this;
            while (s--) {
                r = s ? e : "all";
                if (t = i[r]) {
                    for (var o = 0, l = t.length; o < l; o++) {
                        if (!(a = t[o])) {
                            t.splice(o, 1);
                            o--;
                            l--
                        } else {
                            n = s ? Array.prototype.slice.call(arguments, 1) : arguments;
                            a.apply(this, n)
                        }
                    }
                }
            }
            return this
        }
    };
    i.Model = function(e, t) {
        var i;
        e || (e = {});
        if (i = this.defaults) {
            if (r.isFunction(i)) i = i();
            e = r.extend({}, i, e)
        }
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = r.uniqueId("c");
        this.set(e, {
            silent: true
        });
        this._changed = false;
        this._previousAttributes = r.clone(this.attributes);
        if (t && t.collection) this.collection = t.collection;
        this.initialize(e, t)
    };
    r.extend(i.Model.prototype, i.Events, {
        _previousAttributes: null,
        _changed: false,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return r.clone(this.attributes)
        },
        get: function(e) {
            return this.attributes[e]
        },
        escape: function(e) {
            var t;
            if (t = this._escapedAttributes[e]) return t;
            var i = this.attributes[e];
            return this._escapedAttributes[e] = J(i == null ? "" : "" + i)
        },
        has: function(e) {
            return this.attributes[e] != null
        },
        set: function(e, t) {
            t || (t = {});
            if (!e) return this;
            if (e.attributes) e = e.attributes;
            var i = this.attributes,
                a = this._escapedAttributes;
            if (!t.silent && this.validate && !this._performValidation(e, t)) return false;
            if (this.idAttribute in e) this.id = e[this.idAttribute];
            var n = this._changing;
            this._changing = true;
            for (var s in e) {
                var o = e[s];
                if (!r.isEqual(i[s], o)) {
                    i[s] = o;
                    delete a[s];
                    this._changed = true;
                    if (!t.silent) this.trigger("change:" + s, this, o, t)
                }
            }
            if (!n && !t.silent && this._changed) this.change(t);
            this._changing = false;
            return this
        },
        unset: function(e, t) {
            if (!(e in this.attributes)) return this;
            t || (t = {});
            var i = this.attributes[e];
            var r = {};
            r[e] = void 0;
            if (!t.silent && this.validate && !this._performValidation(r, t)) return false;
            delete this.attributes[e];
            delete this._escapedAttributes[e];
            if (e == this.idAttribute) delete this.id;
            this._changed = true;
            if (!t.silent) {
                this.trigger("change:" + e, this, void 0, t);
                this.change(t)
            }
            return this
        },
        clear: function(e) {
            e || (e = {});
            var t;
            var i = this.attributes;
            var r = {};
            for (t in i) r[t] = void 0;
            if (!e.silent && this.validate && !this._performValidation(r, e)) return false;
            this.attributes = {};
            this._escapedAttributes = {};
            this._changed = true;
            if (!e.silent) {
                for (t in i) {
                    this.trigger("change:" + t, this, void 0, e)
                }
                this.change(e)
            }
            return this
        },
        fetch: function(e) {
            e || (e = {});
            var t = this;
            var r = e.success;
            e.success = function(i, a, n) {
                if (!t.set(t.parse(i, n), e)) return false;
                if (r) r(t, i)
            };
            e.error = C(e.error, t, e);
            return (this.sync || i.sync).call(this, "read", this, e)
        },
        save: function(e, t) {
            t || (t = {});
            if (e && !this.set(e, t)) return false;
            var r = this;
            var a = t.success;
            t.success = function(e, i, n) {
                if (!r.set(r.parse(e, n), t)) return false;
                if (a) a(r, e, n)
            };
            t.error = C(t.error, r, t);
            var n = this.isNew() ? "create" : "update";
            return (this.sync || i.sync).call(this, n, this, t)
        },
        destroy: function(e) {
            e || (e = {});
            if (this.isNew()) return this.trigger("destroy", this, this.collection, e);
            var t = this;
            var r = e.success;
            e.success = function(i) {
                t.trigger("destroy", t, t.collection, e);
                if (r) r(t, i)
            };
            e.error = C(e.error, t, e);
            return (this.sync || i.sync).call(this, "delete", this, e)
        },
        url: function() {
            var e = m(this.collection) || this.urlRoot || b();
            if (this.isNew()) return e;
            return e + (e.charAt(e.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(e, t) {
            return e
        },
        clone: function() {
            return new this.constructor(this)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(e) {
            this.trigger("change", this, e);
            this._previousAttributes = r.clone(this.attributes);
            this._changed = false
        },
        hasChanged: function(e) {
            if (e) return this._previousAttributes[e] != this.attributes[e];
            return this._changed
        },
        changedAttributes: function(e) {
            e || (e = this.attributes);
            var t = this._previousAttributes;
            var i = false;
            for (var a in e) {
                if (!r.isEqual(t[a], e[a])) {
                    i = i || {};
                    i[a] = e[a]
                }
            }
            return i
        },
        previous: function(e) {
            if (!e || !this._previousAttributes) return null;
            return this._previousAttributes[e]
        },
        previousAttributes: function() {
            return r.clone(this._previousAttributes)
        },
        _performValidation: function(e, t) {
            var i = this.validate(e);
            if (i) {
                if (t.error) {
                    t.error(this, i, t)
                } else {
                    this.trigger("error", this, i, t)
                }
                return false
            }
            return true
        }
    });
    i.Collection = function(e, t) {
        t || (t = {});
        if (t.comparator) this.comparator = t.comparator;
        r.bindAll(this, "_onModelEvent", "_removeReference");
        this._reset();
        if (e) this.reset(e, {
            silent: true
        });
        this.initialize.apply(this, arguments)
    };
    r.extend(i.Collection.prototype, i.Events, {
        model: i.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(e) {
                return e.toJSON()
            })
        },
        add: function(e, t) {
            if (r.isArray(e)) {
                for (var i = 0, a = e.length; i < a; i++) {
                    this._add(e[i], t)
                }
            } else {
                this._add(e, t)
            }
            return this
        },
        remove: function(e, t) {
            if (r.isArray(e)) {
                for (var i = 0, a = e.length; i < a; i++) {
                    this._remove(e[i], t)
                }
            } else {
                this._remove(e, t)
            }
            return this
        },
        get: function(e) {
            if (e == null) return null;
            return this._byId[e.id != null ? e.id : e]
        },
        getByCid: function(e) {
            return e && this._byCid[e.cid || e]
        },
        at: function(e) {
            return this.models[e]
        },
        sort: function(e) {
            e || (e = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            this.models = this.sortBy(this.comparator);
            if (!e.silent) this.trigger("reset", this, e);
            return this
        },
        pluck: function(e) {
            return r.map(this.models, function(t) {
                return t.get(e)
            })
        },
        reset: function(e, t) {
            e || (e = []);
            t || (t = {});
            this.each(this._removeReference);
            this._reset();
            this.add(e, {
                silent: true
            });
            if (!t.silent) this.trigger("reset", this, t);
            return this
        },
        fetch: function(e) {
            e || (e = {});
            var t = this;
            var r = e.success;
            e.success = function(i, a, n) {
                t[e.add ? "add" : "reset"](t.parse(i, n), e);
                if (r) r(t, i)
            };
            e.error = C(e.error, t, e);
            return (this.sync || i.sync).call(this, "read", this, e)
        },
        create: function(e, t) {
            var i = this;
            t || (t = {});
            e = this._prepareModel(e, t);
            if (!e) return false;
            var r = t.success;
            t.success = function(e, a, n) {
                i.add(e, t);
                if (r) r(e, a, n)
            };
            e.save(null, t);
            return e
        },
        parse: function(e, t) {
            return e
        },
        chain: function() {
            return r(this.models).chain()
        },
        _reset: function(e) {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function(e, t) {
            if (!(e instanceof i.Model)) {
                var r = e;
                e = new this.model(r, {
                    collection: this
                });
                if (e.validate && !e._performValidation(r, t)) e = false
            } else if (!e.collection) {
                e.collection = this
            }
            return e
        },
        _add: function(e, t) {
            t || (t = {});
            e = this._prepareModel(e, t);
            if (!e) return false;
            var i = this.getByCid(e);
            if (i) throw new Error(["Can't add the same model to a set twice", i.id]);
            this._byId[e.id] = e;
            this._byCid[e.cid] = e;
            var r = t.at != null ? t.at : this.comparator ? this.sortedIndex(e, this.comparator) : this.length;
            this.models.splice(r, 0, e);
            e.bind("all", this._onModelEvent);
            this.length++;
            if (!t.silent) e.trigger("add", e, this, t);
            return e
        },
        _remove: function(e, t) {
            t || (t = {});
            e = this.getByCid(e) || this.get(e);
            if (!e) return null;
            delete this._byId[e.id];
            delete this._byCid[e.cid];
            this.models.splice(this.indexOf(e), 1);
            this.length--;
            if (!t.silent) e.trigger("remove", e, this, t);
            this._removeReference(e);
            return e
        },
        _removeReference: function(e) {
            if (this == e.collection) {
                delete e.collection
            }
            e.unbind("all", this._onModelEvent)
        },
        _onModelEvent: function(e, t, i, r) {
            if ((e == "add" || e == "remove") && i != this) return;
            if (e == "destroy") {
                this._remove(t, r)
            }
            if (t && e === "change:" + t.idAttribute) {
                delete this._byId[t.previous(t.idAttribute)];
                this._byId[t.id] = t
            }
            this.trigger.apply(this, arguments)
        }
    });
    var n = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty"];
    r.each(n, function(e) {
        i.Collection.prototype[e] = function() {
            return r[e].apply(r, [this.models].concat(r.toArray(arguments)))
        }
    });
    i.Router = function(e) {
        e || (e = {});
        if (e.routes) this.routes = e.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var s = /:([\w\d]+)/g;
    var o = /\*([\w\d]+)/g;
    var l = /[-[\]{}()+?.,\\^$|#\s]/g;
    r.extend(i.Router.prototype, i.Events, {
        initialize: function() {},
        route: function(e, t, a) {
            i.history || (i.history = new i.History);
            if (!r.isRegExp(e)) e = this._routeToRegExp(e);
            i.history.route(e, r.bind(function(i) {
                var r = this._extractParameters(e, i);
                a.apply(this, r);
                this.trigger.apply(this, ["route:" + t].concat(r))
            }, this))
        },
        navigate: function(e, t) {
            i.history.navigate(e, t)
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            var e = [];
            for (var t in this.routes) {
                e.unshift([t, this.routes[t]])
            }
            for (var i = 0, r = e.length; i < r; i++) {
                this.route(e[i][0], e[i][1], this[e[i][1]])
            }
        },
        _routeToRegExp: function(e) {
            e = e.replace(l, "\\$&").replace(s, "([^/]*)").replace(o, "(.*?)");
            return new RegExp("^" + e + "$")
        },
        _extractParameters: function(e, t) {
            return e.exec(t).slice(1)
        }
    });
    i.History = function() {
        this.handlers = [];
        r.bindAll(this, "checkUrl")
    };
    var c = /^#*/;
    var u = /msie [\w.]+/;
    var d = false;
    r.extend(i.History.prototype, {
        interval: 50,
        getFragment: function(e, t) {
            if (e == null) {
                if (this._hasPushState || t) {
                    e = window.location.pathname;
                    var i = window.location.search;
                    if (i) e += i;
                    if (e.indexOf(this.options.root) == 0) e = e.substr(this.options.root.length)
                } else {
                    e = window.location.hash
                }
            }
            return e.replace(c, "")
        },
        start: function(e) {
            if (d) throw new Error("Backbone.history has already been started");
            this.options = r.extend({}, {
                root: "/"
            }, this.options, e);
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            var t = this.getFragment();
            var i = document.documentMode;
            var n = u.exec(navigator.userAgent.toLowerCase()) && (!i || i <= 7);
            if (n) {
                this.iframe = a('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(t)
            }
            if (this._hasPushState) {
                a(window).bind("popstate", this.checkUrl)
            } else if ("onhashchange" in window && !n) {
                a(window).bind("hashchange", this.checkUrl)
            } else {
                setInterval(this.checkUrl, this.interval)
            }
            this.fragment = t;
            d = true;
            var s = window.location;
            var o = s.pathname == this.options.root;
            if (this._wantsPushState && !this._hasPushState && !o) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + "#" + this.fragment)
            } else if (this._wantsPushState && this._hasPushState && o && s.hash) {
                this.fragment = s.hash.replace(c, "");
                window.history.replaceState({}, document.title, s.protocol + "//" + s.host + this.options.root + this.fragment)
            }
            return this.loadUrl()
        },
        route: function(e, t) {
            this.handlers.unshift({
                route: e,
                callback: t
            })
        },
        checkUrl: function(e) {
            var t = this.getFragment();
            if (t == this.fragment && this.iframe) t = this.getFragment(this.iframe.location.hash);
            if (t == this.fragment || t == decodeURIComponent(this.fragment)) return false;
            if (this.iframe) this.navigate(t);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function(e) {
            var t = this.fragment = this.getFragment(e);
            var i = r.any(this.handlers, function(e) {
                if (e.route.test(t)) {
                    e.callback(t);
                    return true
                }
            });
            return i
        },
        navigate: function(e, t) {
            var i = (e || "").replace(c, "");
            if (this.fragment == i || this.fragment == decodeURIComponent(i)) return;
            if (this._hasPushState) {
                var r = window.location;
                if (i.indexOf(this.options.root) != 0) i = this.options.root + i;
                this.fragment = i;
                window.history.pushState({}, document.title, r.protocol + "//" + r.host + i)
            } else {
                window.location.hash = this.fragment = i;
                if (this.iframe && i != this.getFragment(this.iframe.location.hash)) {
                    this.iframe.document.open().close();
                    this.iframe.location.hash = i
                }
            }
            if (t) this.loadUrl(e)
        }
    });
    i.View = function(e) {
        this.cid = r.uniqueId("view");
        this._configure(e || {});
        this._ensureElement();
        this.delegateEvents();
        this.initialize.apply(this, arguments)
    };
    var h = function(e) {
        return a(e, this.el)
    };
    var f = /^(\S+)\s*(.*)$/;
    var p = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    r.extend(i.View.prototype, i.Events, {
        tagName: "div",
        $: h,
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            a(this.el).remove();
            return this
        },
        make: function(e, t, i) {
            var r = document.createElement(e);
            if (t) a(r).attr(t);
            if (i) a(r).html(i);
            return r
        },
        delegateEvents: function(e) {
            if (!(e || (e = this.events))) return;
            a(this.el).unbind(".delegateEvents" + this.cid);
            for (var t in e) {
                var i = this[e[t]];
                if (!i) throw new Error('Event "' + e[t] + '" does not exist');
                var n = t.match(f);
                var s = n[1],
                    o = n[2];
                i = r.bind(i, this);
                s += ".delegateEvents" + this.cid;
                if (o === "") {
                    a(this.el).bind(s, i)
                } else {
                    a(this.el).delegate(o, s, i)
                }
            }
        },
        _configure: function(e) {
            if (this.options) e = r.extend({}, this.options, e);
            for (var t = 0, i = p.length; t < i; t++) {
                var a = p[t];
                if (e[a]) this[a] = e[a]
            }
            this.options = e
        },
        _ensureElement: function() {
            if (!this.el) {
                var e = this.attributes || {};
                if (this.id) e.id = this.id;
                if (this.className) e["class"] = this.className;
                this.el = this.make(this.tagName, e)
            } else if (r.isString(this.el)) {
                this.el = a(this.el).get(0)
            }
        }
    });
    var g = function(e, t) {
        var i = y(this, e, t);
        i.extend = this.extend;
        return i
    };
    i.Model.extend = i.Collection.extend = i.Router.extend = i.View.extend = g;
    var v = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    i.sync = function(e, t, n) {
        var s = v[e];
        var o = r.extend({
            type: s,
            dataType: "json",
            processData: false
        }, n);
        if (!o.url) {
            o.url = m(t) || b()
        }
        if (!o.data && t && (e == "create" || e == "update")) {
            o.contentType = "application/json";
            o.data = JSON.stringify(t.toJSON())
        }
        if (i.emulateJSON) {
            o.contentType = "application/x-www-form-urlencoded";
            o.processData = true;
            o.data = o.data ? {
                model: o.data
            } : {}
        }
        if (i.emulateHTTP) {
            if (s === "PUT" || s === "DELETE") {
                if (i.emulateJSON) o.data._method = s;
                o.type = "POST";
                o.beforeSend = function(e) {
                    e.setRequestHeader("X-HTTP-Method-Override", s)
                }
            }
        }
        return a.ajax(o)
    };
    var _ = function() {};
    var y = function(e, t, i) {
        var a;
        if (t && t.hasOwnProperty("constructor")) {
            a = t.constructor
        } else {
            a = function() {
                return e.apply(this, arguments)
            }
        }
        r.extend(a, e);
        _.prototype = e.prototype;
        a.prototype = new _;
        if (t) r.extend(a.prototype, t);
        if (i) r.extend(a, i);
        a.prototype.constructor = a;
        a.__super__ = e.prototype;
        return a
    };
    var m = function(e) {
        if (!(e && e.url)) return null;
        return r.isFunction(e.url) ? e.url() : e.url
    };
    var b = function() {
        throw new Error('A "url" property or function must be specified')
    };
    var C = function(e, t, i) {
        return function(r) {
            if (e) {
                e(t, r, i)
            } else {
                t.trigger("error", t, r, i)
            }
        }
    };
    var J = function(e) {
        return e.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    }
}).call(this);
var Mustache = function() {
    var e = function() {};
    e.prototype = {
        otag: "{{",
        ctag: "}}",
        pragmas: {},
        buffer: [],
        pragmas_implemented: {
            "IMPLICIT-ITERATOR": true
        },
        context: {},
        render: function(e, t, i, r) {
            if (!r) {
                this.context = t;
                this.buffer = []
            }
            if (!this.includes("", e)) {
                if (r) {
                    return e
                } else {
                    this.send(e);
                    return
                }
            }
            e = this.render_pragmas(e);
            var a = this.render_section(e, t, i);
            if (r) {
                return this.render_tags(a, t, i, r)
            }
            this.render_tags(a, t, i, r)
        },
        send: function(e) {
            if (e != "") {
                this.buffer.push(e)
            }
        },
        render_pragmas: function(e) {
            if (!this.includes("%", e)) {
                return e
            }
            var t = this;
            var i = new RegExp(this.otag + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + this.ctag, "g");
            return e.replace(i, function(e, i, r) {
                if (!t.pragmas_implemented[i]) {
                    throw {
                        message: "This implementation of mustache doesn't understand the '" + i + "' pragma"
                    }
                }
                t.pragmas[i] = {};
                if (r) {
                    var a = r.split("=");
                    t.pragmas[i][a[0]] = a[1]
                }
                return ""
            })
        },
        render_partial: function(e, t, i) {
            e = this.trim(e);
            if (!i || i[e] === undefined) {
                throw {
                    message: "unknown_partial '" + e + "'"
                }
            }
            if (typeof t[e] != "object") {
                return this.render(i[e], t, i, true)
            }
            return this.render(i[e], t[e], i, true)
        },
        render_section: function(e, t, i) {
            if (!this.includes("#", e) && !this.includes("^", e)) {
                return e
            }
            var r = this;
            var a = new RegExp(this.otag + "(\\^|\\#)\\s*(.+)\\s*" + this.ctag + "\n*([\\s\\S]+?)" + this.otag + "\\/\\s*\\2\\s*" + this.ctag + "\\s*", "mg");
            return e.replace(a, function(e, a, n, s) {
                var o = r.find(n, t);
                if (a == "^") {
                    if (!o || r.is_array(o) && o.length === 0) {
                        return r.render(s, t, i, true)
                    } else {
                        return ""
                    }
                } else if (a == "#") {
                    if (r.is_array(o)) {
                        return r.map(o, function(e) {
                            return r.render(s, r.create_context(e), i, true)
                        }).join("")
                    } else if (r.is_object(o)) {
                        return r.render(s, r.create_context(o), i, true)
                    } else if (typeof o === "function") {
                        return o.call(t, s, function(e) {
                            return r.render(e, t, i, true)
                        })
                    } else if (o) {
                        return r.render(s, t, i, true)
                    } else {
                        return ""
                    }
                }
            })
        },
        render_tags: function(e, t, i, r) {
            var a = this;
            var n = function() {
                return new RegExp(a.otag + "(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?" + a.ctag + "+", "g")
            };
            var s = n();
            var o = function(e, r, o) {
                switch (r) {
                    case "!":
                        return "";
                    case "=":
                        a.set_delimiters(o);
                        s = n();
                        return "";
                    case ">":
                        return a.render_partial(o, t, i);
                    case "{":
                        return a.find(o, t);
                    default:
                        return a.escape(a.find(o, t))
                }
            };
            var l = e.split("\n");
            for (var c = 0; c < l.length; c++) {
                l[c] = l[c].replace(s, o, this);
                if (!r) {
                    this.send(l[c])
                }
            }
            if (r) {
                return l.join("\n")
            }
        },
        set_delimiters: function(e) {
            var t = e.split(" ");
            this.otag = this.escape_regex(t[0]);
            this.ctag = this.escape_regex(t[1])
        },
        escape_regex: function(e) {
            if (!arguments.callee.sRE) {
                var t = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
                arguments.callee.sRE = new RegExp("(\\" + t.join("|\\") + ")", "g")
            }
            return e.replace(arguments.callee.sRE, "\\$1")
        },
        find: function(e, t) {
            e = this.trim(e);

            function i(e) {
                return e === false || e === 0 || e
            }
            var r;
            if (i(t[e])) {
                r = t[e]
            } else if (i(this.context[e])) {
                r = this.context[e]
            }
            if (typeof r === "function") {
                return r.apply(t)
            }
            if (r !== undefined) {
                return r
            }
            return ""
        },
        includes: function(e, t) {
            return t.indexOf(this.otag + e) != -1
        },
        escape: function(e) {
            e = String(e === null ? "" : e);
            return e.replace(/&(?!\w+;)|["'<>\\]/g, function(e) {
                switch (e) {
                    case "&":
                        return "&amp;";
                    case "\\":
                        return "\\\\";
                    case '"':
                        return "&quot;";
                    case "'":
                        return "&#39;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    default:
                        return e
                }
            })
        },
        create_context: function(e) {
            if (this.is_object(e)) {
                return e
            } else {
                var t = ".";
                if (this.pragmas["IMPLICIT-ITERATOR"]) {
                    t = this.pragmas["IMPLICIT-ITERATOR"].iterator
                }
                var i = {};
                i[t] = e;
                return i
            }
        },
        is_object: function(e) {
            return e && typeof e == "object"
        },
        is_array: function(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        },
        trim: function(e) {
            return e.replace(/^\s*|\s*$/g, "")
        },
        map: function(e, t) {
            if (typeof e.map == "function") {
                return e.map(t)
            } else {
                var i = [];
                var r = e.length;
                for (var a = 0; a < r; a++) {
                    i.push(t(e[a]))
                }
                return i
            }
        }
    };
    return {
        name: "mustache.js",
        version: "0.3.1-dev",
        to_html: function(t, i, r, a) {
            var n = new e;
            if (a) {
                n.send = a
            }
            n.render(t, i, r);
            if (!a) {
                return n.buffer.join("\n")
            }
        }
    }
}();
(function() {
    var e, t, i, a, n = 0,
        r = {},
        c = {
            LOAD_ERROR: "\ufffd\ufffd\u05b7\ufffd\ufffd\ufffd\ufffd\u0221\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\u053a\ufffd\ufffd\ufffd\ufffd\ufffd"
        };
    i = {
        stringify: function(e) {
            var t = window.JSON || {},
                i;
            try {
                i = t.stringify(e)
            } catch (a) {}
            return i
        },
        parse: function(e) {
            var t;
            try {
                t = new Function("return" + e.replace(/\n|\r|\t/g, ""))()
            } catch (i) {}
            return t
        }
    };
    t = {
        isString: function(e) {
            return !!(e === "" || e && e.charCodeAt && e.substr)
        },
        isNumber: function(e) {
            return !!(e === 0 || e && e.toExponential && e.toFixed)
        },
        isObject: function(e) {
            return e === Object(e)
        },
        isArray: Array.isArray || function(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        },
        isEmpty: function(e) {
            var t = this;
            if (t.isArray(e) || t.isString(e)) return e.length === 0;
            for (var i in e)
                if (Object.prototype.hasOwnProperty.call(e, i)) return false;
            return true
        },
        uniq: function(e) {
            var t = n++;
            return e ? e + t : t
        },
        each: function(e, t, i) {
            var a = this,
                n = Array.prototype.forEach;
            if (e == null) return;
            if (n && e.forEach === n) {
                e.forEach(t, i)
            } else if (a.isNumber(e.length)) {
                for (var c = 0, s = e.length; c < s; c++) {
                    if (c in e && t.call(i, e[c], c, e) === r) return
                }
            } else {
                for (var o in e) {
                    if (Object.prototype.hasOwnProperty.call(e, o)) {
                        if (t.call(i, e[o], o, e) === r) return
                    }
                }
            }
        },
        duff: function(e, t) {
            var i = e.length % 8;
            while (i) {
                t(e[i--])
            }
            i = Math.floor(e.length / 8);
            while (i) {
                t(e[i--]);
                t(e[i--]);
                t(e[i--]);
                t(e[i--]);
                t(e[i--]);
                t(e[i--]);
                t(e[i--]);
                t(e[i--])
            }
        },
        substitute: function(e, t, i) {
            return e.replace ? e.replace(/\{(\w+)\}/g, function(e, a) {
                var n = !i ? t[a] : i(a);
                return n !== undefined ? n : e
            }) : ""
        }
    };
    a = {
        _key: "AreaGrid",
        _cache: {
            version: "0",
            data: null
        },
        _inst: null,
        _save: function() {
            var e = this,
                t = e._inst,
                a = e._key,
                n = e._cache;
            if (!t) {
                return
            }
            t[a] = i.stringify(n)
        },
        _load: function() {
            var e = this,
                t = e._inst,
                a = e._key,
                n = t && t[a];
            if (!n) {
                return
            }
            if (n != "undefined") {
                e._cache = i.parse(n)
            }
        },
        _get: function(e, t) {
            if (!t) {
                return e
            }
            var i = e,
                a = t.split("."),
                n, r, c = 0,
                s = a.length;
            for (; c < s; c += 1) {
                n = a[c];
                r = i && i[n];
                if (r !== undefined) {
                    i = r
                } else {
                    r = null;
                    break
                }
            }
            return r
        },
        _set: function(e, t, i) {
            var a = e,
                n = t.split("."),
                r, c, s = 0,
                o = n.length;
            if (o === 1) {
                r = n[0];
                a[r] = i
            } else {
                for (; s < o - 1; s += 1) {
                    r = n[s];
                    c = a[r];
                    !c && (c = a[r] = {});
                    a = c
                }
                c[n[o - 1]] = i
            }
        },
        _delete: function(e, i) {
            if (!i || !e) {
                return
            }
            var a = e,
                n = i.split("."),
                r, c, s = 0,
                o = n.length;
            if (o === 1) {
                r = n[0]
            } else {
                for (; s < o - 1; s += 1) {
                    r = n[s];
                    c = a[r] || {};
                    a = c
                }
            }
            if (t.isObject(a)) {
                try {
                    delete a[r]
                } catch (l) {}
            }
        },
        init: function() {
            var e = this,
                t;
            if ("localStorage" in window) {
                try {
                    window.localStorage && (e._inst = t = window.localStorage)
                } catch (i) {}
            } else if ("globalStorage" in window) {
                try {
                    window.globalStorage && (e._inst = t = window.globalStorage[window.location.hostname])
                } catch (i) {}
            }
            e._load()
        },
        set: function(e, t) {
            var i = this,
                a = i._cache;
            i._set(a, e, t);
            i._save()
        },
        get: function(e) {
            var t = this,
                i = t._cache;
            return t._get(i, e)
        },
        deleteKey: function(e) {
            var t = this,
                i = t._cache;
            t._delete(i, e);
            t._save()
        },
        flush: function() {
            var e = this;
            e._cache = {
                version: "0",
                data: null
            };
            e._save();
            return true
        },
        storageSize: function() {
            var e = this,
                t = e._inst,
                i = e._key,
                a = t && t[i];
            return a ? a.length : 0
        }
    };
    e = function(e) {
        this.initialize(e)
    };
    e.uids = {};
    e.load = function(i, n) {
        var r = this,
            s, o, l;
        a.init();
        s = a.get("version");
        if (a._inst) {
            a.set("version", i);
            o = a._cache
        }
        l = n || o && o.data;
        if (l) {
            t.each(e.uids, function(e) {
                e.data = l;
                e.trigger()
            });
            a._inst && n && a.set("data", n)
        } else {
            alert(c["LOAD_ERROR"])
        }
    };
    e.prototype = {
        initialize: function(i) {
            var a = this,
                n = t.uniq();
            e.uids[n] = a;
            a.bind(function() {
                a.serialize()
            })
        },
        bind: function(e) {
            var t = this,
                i = t._callbacks || (t._callbacks = []);
            i.push(e);
            return t
        },
        trigger: function() {
            var e = this,
                t = e._callbacks,
                i, a = 0,
                n;
            if (!t || !t[0]) {
                return
            }
            n = t.length;
            for (; a < n; a++) {
                i = t[a];
                i && i.call(e)
            }
        },
        async: function(e) {
            var i = this,
                n = a.get("version"),
                r = document,
                c = r.getElementById("J_AreaGrid"),
                e = c.getAttribute("data-url"),
                s = r.getElementsByTagName("head")[0],
                o = r.createElement("script"),
                n;
            a.init();
            if (a._inst && (!a._cache.data || t.isEmpty(a._cache.data))) {
                a._cache.version = "0"
            }
            e = t.substitute(e, a._cache || {
                version: "0"
            });
            o.setAttribute("src", e);
            s.appendChild(o)
        },
        serialize: function() {
            var e = this,
                i = e.data,
                a = {},
                n, r, c;
            n = i["2"];
            r = i["3"];
            c = i["4"];
            if (!i.relation) {
                t.each(r, function(e, t) {
                    var i = e[1],
                        n = a[i] || [];
                    n.push(t);
                    a[i] = n
                });
                i.relation = a
            }
            i = _.clone(i);
            e.attrs = i
        },
        relation: function() {
            var e = this,
                i = e.data,
                a = {},
                n, r, c;
            n = i["2"], r = i["3"], c = i["4"];
            t.each(r, function(e, t) {
                var i = e[1],
                    n = a[i] || [];
                n.push(t);
                a[i] = n
            });
            i.relation = a
        },
        query: function(e, i) {
            var a = this,
                n = a.attrs,
                r;
            if (_.isArray(e)) {
                r = [];
                t.each(e, function(e) {
                    var t;
                    e = e + "";
                    if (i) {
                        t = n[i][e]
                    } else {
                        t = n["2"][e];
                        t = t || n["3"][e];
                        t = t || n["4"][e]
                    }
                    t && t[0] && r.push(t[0])
                })
            } else {
                e = e + "";
                if (i) {
                    r = n[i][e]
                } else {
                    r = n["2"][e];
                    r = r || n["3"][e];
                    r = r || n["4"][e]
                }
                r = r && r[0] && r[0]
            }
            return r
        },
        children: function(e) {
            var t = this,
                i = t.attrs;
            return i.relation[e]
        },
        parent: function(e, t) {
            var i = this,
                a, n = i.attrs;
            a = n["4"][e];
            a = a || n["3"][e];
            a = a || n["2"][e];
            return a && a[1]
        }
    };
    e.storage = a;
    window.AreaGrid = e
})();
(function() {
    var e = KISSY,
        t = e.DOM,
        a = e.Event,
        i = e.all,
        r, n;
    if (!presetData) {
        return
    }
    window._close = function() {
        parent._close()
    };
    var l = {
        EMPTY: " ",
        AREA_NULL: "\u672a\u6dfb\u52a0\u5730\u533a",
        NOT_SELECTED: "\u8bf7\u9009\u62e9\u5730\u533a",
        ENABLE_BATCH: "\u6279\u91cf\u64cd\u4f5c",
        CHANGE_TYPE: "\u5207\u6362\u8ba1\u4ef7\u65b9\u5f0f\u540e\uff0c\u6240\u8bbe\u7f6e\u5f53\u524d\u6a21\u677f\u7684\u8fd0\u8f93\u4fe1\u606f\u5c06\u88ab\u6e05\u7a7a\uff0c\u786e\u5b9a\u7ee7\u7eed\u4e48\uff1f",
        CANCEL_COD: "\u53d6\u6d88",
        MODIFY_COD: "\u4fee\u6539",
        COD_DEFAULT: "\u4f7f\u7528\u5feb\u9012\u516c\u53f8\u8fd0\u8d39",
        COD_CUSTOM: "\u81ea\u5b9a\u4e49\u8bbe\u7f6e",
        BATCH_NULL: "\u8bf7\u9009\u62e9\u8981\u6279\u91cf\u5904\u7406\u7684\u5730\u533a",
        TYPE_NAME_NUM: "\u4ef6",
        TYPE_NAME_WEIGHT: "kg",
        TYPE_NAMEEXTRA_WEIGHT: "\u91cd",
        TYPE_NAME_SIZE: "m&#179",
        TYPE_NAMEEXTRA_SIZE: "\u4f53\u79ef",
        RULE_DELETE_CONFIRM: "\u786e\u8ba4\u8981\u5220\u9664\u5f53\u524d\u5730\u533a\u7684\u8bbe\u7f6e\u4e48\uff1f"
    };
    var s, c, o, u, d = {},
        f = {},
        h = {};
    var g = function() {
        var a = {
            clearPrice: false
        };
        a = e.mix(a, arguments[0]);
        t.query(".J_Section").each(function(i) {
            var r = t.query(".input-text", i);
            if (t.get("#J_sellerBearFre") && t.get("#J_sellerBearFre").checked) {
                e.each(t.query(".j_sellerBearFrePrice"), function(e) {
                    t.show(e);
                    t.hide(t.next(e))
                });
                t.attr(r, "disabled", "disabled");
                if (t.get("#J_CODCustomer")) {
                    t.attr(t.get("#J_CODCustomer"), "disabled", "disabled")
                }
                if (t.get("#J_YYPSCustomer")) {
                    t.attr(t.get("#J_YYPSCustomer"), "disabled", "disabled")
                }
                if (t.get("#J_TPLForm")["limitType"]) {
                    t.get("#J_TPLForm")["limitType"][0].click();
                    t.get("#J_TPLForm")["limitType"][1].disabled = true
                }
            } else {
                t.removeAttr(r, "disabled");
                e.each(t.query(".j_sellerBearFrePrice"), function(e) {
                    t.hide(e);
                    t.show(t.next(e));
                    if (a.clearPrice) {
                        t.next(e).value = ""
                    }
                });
                if (t.get("#J_CODCustomer")) {
                    t.removeAttr(t.get("#J_CODCustomer"), "disabled")
                }
                if (t.get("#J_YYPSCustomer")) {
                    t.removeAttr(t.get("#J_YYPSCustomer"), "disabled")
                }
                if (t.get("#J_TPLForm")["limitType"]) {
                    t.get("#J_TPLForm")["limitType"][1].disabled = false
                }
            }
        })
    };
    var p = function() {
        if (t.get("#J_TPLForm")["limitType"]) {
            return t.get("#J_TPLForm")["limitType"][1].checked ? true : false
        } else {
            return false
        }
    };
    var v = false;
    var y = function() {
        var a = p();
        if (t.get("#J_sellerBearFre") && t.get("#J_sellerBearFre").checked && !a) {
            e.each(t.query(".J_PostageDetail"), function(e) {
                if (!t.hasClass(e, "hidden")) {
                    t.hide(e)
                }
            });
            e.all(".J_EditFareCon").each(function(e) {
                if (!t.hasClass(e, "hidden")) {
                    t.hide(e)
                }
            });
            t.css(".J_ToggleIT", "color", "#bfbfbf");
            t.css("#J_ToggleCOD", "color", "#bfbfbf");
            t.css("#J_ToggleYYPS", "color", "#bfbfbf");
            v = true
        } else {
            e.each(t.query(".J_PostageDetail"), function(e) {
                if (!t.hasClass(e, "hidden")) {
                    t.show(e)
                }
            });
            e.all(".J_EditFareCon").each(function(e) {
                if (!t.hasClass(e, "hidden")) {
                    t.show(e)
                }
            });
            t.css(".J_ToggleIT", "color", "");
            t.css("#J_ToggleCOD", "color", "");
            t.css("#J_ToggleYYPS", "color", "");
            v = false
        }
        if (a) {
            if (e.one("#J_SelectByCustom")) {
                e.all(".J_Section", "#J_SelectByCustom").each(function(e) {
                    if (t.attr(e, "data-customType") !== "express") {
                        t.hide(e)
                    }
                })
            }
        } else {
            if (e.one("#J_SelectByCustom")) {
                e.all(".J_Section", "#J_SelectByCustom").show()
            }
        }
    };
    var m = presetData.type,
        J = presetData.list;
    s = Backbone.Model.extend({
        defaults: {
            enabled: false,
            global: false,
            start: "1",
            postage: "",
            plus: "1",
            postageplus: "",
            wayDay: "20"
        },
        special: function(t) {
            var a = this,
                i = t || a.get("special"),
                r = {
                    starterror: "start",
                    postageerror: "postage",
                    pluserror: "plus",
                    postagepluserror: "postageplus",
                    wayDayerror: "wayDay"
                };
            _.each(i, function(t) {
                _.each(r, function(e, a) {
                    t[a] = function() {
                        var a = t.errors || {};
                        return !!a[e]
                    }
                });
                t.group = function() {
                    var a = [],
                        i = [],
                        r = "",
                        n = function(e, t) {
                            a.push({
                                str: t.join("\u3001")
                            })
                        };
                    var s = t.provCodes,
                        c = {};
                    _.each(t.areas, function(e) {
                        var t = AreaCode.parent(e);
                        if (t in s) {
                            if (!(t in c)) {
                                a.push({
                                    str: AreaCode.query(t)
                                });
                                c[t] = true
                            }
                            return
                        }
                        var l = AreaCode.query(t),
                            o = AreaCode.query(e);
                        if (l != r && i.length) {
                            n(r, i);
                            i = []
                        }
                        i.push(o);
                        r = l
                    });
                    if (i.length) {
                        n(r, i)
                    }
                    var o = [];
                    e.each(a, function(e) {
                        o.push(e.str)
                    });
                    return a.length ? [{
                        str: o.join("\u3001")
                    }] : [{
                        str: l["AREA_NULL"]
                    }]
                }
            })
        },
        serialize: function(e) {
            var a = this,
                i = a.get("delivery"),
                r = {
                    starterror: "start",
                    postageerror: "postage",
                    pluserror: "plus",
                    postagepluserror: "postageplus",
                    wayDayerror: "wayDay"
                },
                n = {
                    withSpecial: function() {
                        var e = a.get("special");
                        return e && !!e[0]
                    },
                    isBatch: function() {
                        return !!a.get("batch")
                    },
                    typeName: function() {
                        return m === "number" ? l["TYPE_NAME_NUM"] : m === "weight" ? l["TYPE_NAME_WEIGHT"] : t.val("#J_Cube")
                    },
                    typeNameExtra: function() {
                        return m === "number" ? l["TYPE_NAME_NUM"] : m === "weight" ? l["TYPE_NAMEEXTRA_WEIGHT"] : l["TYPE_NAMEEXTRA_SIZE"]
                    }
                };
            _.each(r, function(e, t) {
                n[t] = function() {
                    var t = a.get("errors") || {};
                    return !!t[e]
                }
            });
            (i === "cod" || i === "oneday" || i === "twoday" || i === "thrday" || i === "yyps") && (n["enabled"] = true);
            a.set(n)
        },
        initialize: function() {
            var e = this;
            e.special();
            e.serialize()
        },
        switcher: function(e) {
            var t = this;
            t.set(e);
            t.trigger("switcher")
        },
        addSpecial: function() {
            var e = this,
                t = e.get("special") || [],
                a = "n",
                i = e.get("counter") || 0,
                r = {
                    gid: a + (i + 1),
                    delivery: e.get("delivery"),
                    start: "1",
                    postage: " ",
                    plus: "1",
                    postageplus: " ",
                    wayDay: " ",
                    areas: [],
                    errors: {
                        start: false,
                        postage: false,
                        plus: false,
                        postageplus: false,
                        wayDay: false
                    }
                };
            t.push(r);
            e.special(t);
            e.set({
                special: t,
                counter: i + 1
            });
            e.trigger("addSpecial")
        },
        deleteSpecial: function(e) {
            var t = this,
                a = e.gid,
                i = e.silent || false,
                r = t.get("special"),
                n, l;
            n = _.detect(r, function(e) {
                return e.gid === a
            });
            l = _.indexOf(r, n);
            if (l !== -1) {
                r.splice(l, 1);
                if (!i) {
                    t.trigger("deleteSpecial")
                }
            }
        },
        batchSpecial: function(e) {
            var t = this,
                a, i, r;
            if (!e) {
                return
            }
            a = e.action;
            i = e.selected;
            fields = e.fields;
            switch (a) {
                case "delete":
                    _.each(i, function(e) {
                        t.deleteSpecial({
                            gid: e,
                            silent: true
                        })
                    });
                    t.clearError();
                    t.clearError({
                        isAll: true
                    });
                    t.trigger("batchSpecial");
                    break;
                case "update":
                    _.each(i, function(e) {
                        _.each(fields, function(a, i) {
                            t.setSpecial(e, i, a)
                        })
                    });
                    t.clearError({
                        isAll: true
                    });
                    t.trigger("batchSpecial");
                    break;
                default:
                    break
            }
        },
        getSpecial: function(e) {
            var t = this,
                a = t.get("special") || [],
                i;
            _.each(a, function(t) {
                t.gid === e && (i = t)
            });
            return i || a
        },
        setSpecial: function(e, t, a) {
            var i = this,
                r = _.isString(e) ? i.getSpecial(e) : e;
            r && (r[t] = a)
        },
        getArea: function(e) {
            var t = this,
                a = t.get("special"),
                i = [];
            if (e !== undefined) {
                _.each(a, function(t) {
                    t.gid === e && (i = t.areas)
                })
            } else {
                _.each(a, function(e) {
                    i = i.concat(e.areas)
                })
            }
            return i
        },
        refillAddress: function(e) {
            var t = this,
                a = t.get("special"),
                i, r, e = e || {};
            i = e.gid;
            r = e.codes;
            _.each(a, function(t) {
                if (t.gid === i) {
                    t.areas = r;
                    t.provCodes = e.provCodes
                }
            });
            t.trigger("refillAddress")
        },
        refillAmount: function(e) {
            var t = this,
                a = t.get("special"),
                i, r, n, l = {};
            if (!e) {
                return
            }
            i = e.gid;
            r = e.field;
            n = e.val;
            if (i) {
                _.each(a, function(e) {
                    if (e.gid === i) {
                        e[r] = n
                    }
                })
            } else {
                l[r] = n;
                t.set(l)
            }
        },
        toggleBatch: function(e) {
            var t = this;
            t.set(e);
            t.trigger("toggleBatch")
        },
        clearError: function(e) {
            e = e || {};
            var t = this,
                a, i, r = e.isSpecial,
                n = e.gid,
                l = e.key,
                s = function(e) {
                    if (!e) {
                        return
                    }
                    if (l) {
                        e[l] = false
                    } else {
                        _.each(e, function(t, a) {
                            e[a] = false
                        })
                    }
                };
            if (e.isAll) {
                i = t.getSpecial() || {};
                _.each(i, function(e) {
                    s(e.errors)
                });
                t.set({
                    specialmessage: []
                });
                if (e.withDefault) {
                    t.set({
                        message: []
                    });
                    s(t.get("errors"))
                }
            } else if (e.isSpecial) {
                a = t.getSpecial(n) || {};
                t.set({
                    specialmessage: []
                });
                s(a.errors)
            } else {
                t.set({
                    message: []
                });
                s(t.get("errors"))
            }
        }
    });
    o = Backbone.View.extend({
        initialize: function() {
            var e = this;
            _.bindAll(this, "render");
            e.model.bind("deleteSpecial", e.render);
            e.model.bind("addSpecial", e.render);
            e.model.bind("batchSpecial", e.render);
            e.model.bind("refillAddress", e.render);
            e.model.bind("switcher", e.render);
            e.model.bind("toggleBatch", e.render)
        },
        render: function(a) {
            var i = this,
                r = i.el,
                n = t.parent(r, ".J_Section"),
                l = t.query(".J_Delivery", n),
                s = i.model.get("enabled"),
                c, o, u = i.model.get("delivery");
            a = a || {};

            function d() {
                var e, a;
                switch (u) {
                    case "cod":
                        e = t.get("#J_ToggleCOD");
                        break;
                    case "yyps":
                        e = t.get("#J_ToggleYYPS");
                        break;
                    case "oneday":
                        e = t.query(".J_ToggleIT");
                        break;
                    default:
                        break
                }
                if (u == "twoday" || u == "thrday") {
                    e = t.query(".J_ToggleIT")
                }
                if (!e) {
                    return
                }
                if (i.model.get("inherit")) {
                    c = "";
                    t.html(i.el, c);
                    t.addClass(i.el, "hidden")
                }
            }
            o = t.get("#J_RuleTemplate");
            o = o && o.innerHTML;
            l = l && l[0];
            if (s || u.indexOf("day") != -1) {
                if (u.indexOf("day") == -1) {
                    l.checked = true
                }
                d();
                if (i.model.get("inherit")) {
                    return
                }
                var f = i.model.get("isCustomSelect");
                if (!f || f === "0" || f === "2") {
                    c = Mustache.to_html(o, i.model.toJSON());
                    t.html(r, c);
                    t.removeClass(r, "hidden")
                } else if (f === "1") {
                    t.html(r, "");
                    t.addClass(r, "hidden")
                }
                if (f && f !== "0") {
                    e.one(".J_EditFareCon", n).removeClass("hidden")
                }
                g();
                y()
            } else {
                l.checked = false;
                c = "";
                t.html(i.el, c);
                t.addClass(r, "hidden");
                g();
                y();
                if (e.one(".J_EditFareCon", n)) {
                    e.one(".J_EditFareCon", n).addClass("hidden")
                }
            }
            i.delegate();
            i.binder();
            return i
        },
        deleteSpecial: function(e) {
            var a = this,
                i = t.parent(e, "tr"),
                r = i.getAttribute("data-group");
            a.model.deleteSpecial({
                gid: r
            });
            return a
        },
        addSpecial: function() {
            var e = this;
            e.model.addSpecial();
            return e
        },
        refillAddress: function(e, t, a) {
            var i = this;
            i.model.refillAddress({
                gid: e,
                codes: t,
                provCodes: a
            });
            return i
        },
        validator: function(t) {
            _.each(t, function(t) {
                if (t.getAttribute("type") === "text") {
                    a.on(t, "blur", function(a) {
                        var i = this.getAttribute("data-field"),
                            r = {
                                start: m === "number" ? "int" : "dfloat",
                                postage: "float",
                                plus: m === "number" ? "int" : "dfloat",
                                postageplus: "float",
                                wayDay: "int"
                            },
                            n;
                        val = e.trim(this.value);
                        n = r[i];
                        val = n === "int" ? parseInt(val, 10) : parseFloat(val);
                        val = val !== val ? l["EMPTY"] : n === "float" ? val.toFixed(2) : n === "dfloat" ? val.toFixed(1) : val;
                        t.value = val
                    });
                    a.on(t, "keypress", function(e) {
                        var t = window.event ? window.event.keyCode : e ? e.which : null;
                        if ((t < 46 || t > 57) && t !== 8 && t !== 0) {
                            e.preventDefault()
                        }
                    })
                }
            })
        },
        batchSpecial: function(i, r) {
            var n = this,
                s = [],
                c = t.query(".J_DefaultSet", n.el),
                o, u = t.query("input.J_BatchField", n.el),
                d = [];
            c = c && c[0];
            if (!c) {
                return
            }
            c = c.cloneNode(true);
            o = t.query(".J_Message", c);
            exinputs = t.query("input", c);
            t.removeData(c);
            _.each(exinputs, function(e) {
                t.removeData(e)
            });
            _.each(o, function(e) {
                e.parentNode.removeChild(e)
            });
            c = c.innerHTML;
            _.each(u, function(e) {
                e.checked && d.push(e)
            });
            if (!d || !d[0]) {
                alert(l["BATCH_NULL"]);
                return
            }
            _.each(d, function(e) {
                var a = t.parent(e, "tr");
                s.push(a.getAttribute("data-group"))
            });
            if (i === "delete") {
                confirm(l["RULE_DELETE_CONFIRM"]) && n.model.batchSpecial({
                    action: i,
                    selected: s
                })
            } else {
                e.use("overlay", function() {
                    var o = e.Dialog,
                        u = new o({
                            bodyContent: '<form method="post">' + c + '<div class="btns"><button type="submit" class="J_Submit">\u786e\u5b9a</button><button type="button" class="J_Cancel">\u53d6\u6d88</button></div></form>',
                            elCls: "dialog-batch",
                            mask: true,
                            aria: true,
                            xy: [t.docWidth() / 2 - 278, t.offset(r).top + t.height(r) + 10]
                        });
                    u.on("show", function() {
                        var r, c, o;
                        r = u.get("contentEl").getDOMNode();
                        c = r.getElementsByTagName("form")[0];
                        o = r.getElementsByTagName("input");
                        _.each(o, function(e) {
                            var t = e.getAttribute("data-field");
                            e.value = t === "start" || t === "plus" ? "1" : l["EMPTY"]
                        });
                        a.on(c, "submit", function(t) {
                            t.preventDefault();
                            var a, r, c, o = {};
                            a = u.get("contentEl").getDOMNode();
                            c = a.getElementsByTagName("input");
                            _.each(c, function(t) {
                                var a = t.getAttribute("data-field"),
                                    i = t.value;
                                i = !e.trim(i) ? l["EMPTY"] : i;
                                if (a) {
                                    o[a] = i
                                }
                            });
                            n.model.batchSpecial({
                                action: i,
                                selected: s,
                                fields: o
                            });
                            u.hide()
                        });
                        a.on(r, "click", function(e) {
                            var a = e.target,
                                i = [],
                                n = t.query(".J_Group", r),
                                l = t.query(".J_Province", r);
                            arrCity = t.query(".J_City", r);
                            switch (true) {
                                case t.hasClass(a, "J_Cancel"):
                                    u.hide();
                                    break;
                                default:
                                    break
                            }
                        });
                        n.validator(o)
                    });
                    u.on("hide", function() {
                        u.destroy()
                    });
                    u.render();
                    u.show()
                })
            }
        },
        toggleBatch: function(e) {
            var t = this;
            t.model.toggleBatch({
                batch: !t.model.get("batch")
            })
        },
        setArea: function(i) {
            var r = this,
                n = t.parent(i, ".J_PostageDetail").getAttribute("data-delivery"),
                l = t.parent(i, "tr").getAttribute("data-group"),
                s = function() {
                    var e = t.get("#J_AreaTemplate").innerHTML,
                        a = areaGroup,
                        i = a.group,
                        r = a.inited,
                        n;
                    if (!r) {
                        _.each(i, function(e, t) {
                            var a = e.codes,
                                i = [];
                            _.each(a, function(e) {
                                var t = {
                                        title: AreaCode.query(e),
                                        code: e
                                    },
                                    a = [],
                                    r = AreaCode.children(e);
                                _.each(r, function(e) {
                                    a.push({
                                        title: AreaCode.query(e),
                                        code: e
                                    })
                                });
                                if (a[0]) {
                                    t.citys = a;
                                    t.withCitys = true
                                }
                                i.push(t)
                            });
                            e.areas = i;
                            e.gid = t;
                            e.even = function() {
                                return t % 2 !== 0
                            }
                        });
                        a.inited = true
                    }
                    n = Mustache.to_html(e, areaGroup);
                    return n
                };
            e.use("overlay", function() {
                var c = e.Dialog,
                    o = s(),
                    u = new c({
                        headerContent: '<div class="title">\u9009\u62e9\u533a\u57df</div>',
                        bodyContent: '<form method="post">' + o + '<div class="btns"><button type="submit" class="J_Submit">\u786e\u5b9a</button><button type="button" class="J_Cancel">\u53d6\u6d88</button></div></form>',
                        elCls: "dialog-areas",
                        mask: true,
                        aria: true,
                        xy: [t.docWidth() / 2 - 278, t.offset(i).top + t.height(i) + 10]
                    });
                u.on("hide", function() {
                    u.destroy()
                });
                u.on("show", function() {
                    var s, c, o, f, h, g, p, v, y, m;
                    g = d[n];
                    p = g.getArea();
                    v = g.getArea(l);
                    e.each(v, function(e) {
                        if (AreaCode.query(e, 2)) {
                            v = v.concat(AreaCode.children(e))
                        }
                    });
                    e.each(p, function(e) {
                        if (AreaCode.query(e, 2)) {
                            p = p.concat(AreaCode.children(e))
                        }
                    });
                    i.blur();
                    s = u.get("contentEl").getDOMNode();
                    c = s.getElementsByTagName("form")[0];
                    o = t.query(".J_Group", s);
                    f = t.query(".J_Province", s);
                    h = t.query(".J_City", s);
                    y = function() {
                        _.each(o, function(e) {
                            var a = e.value.split(","),
                                i = [];
                            _.each(a, function(e) {
                                var a = t.get("#J_Province_" + e);
                                a && (a.checked || a.diabled) && i.push(1)
                            });
                            e.checked = i.length === a.length
                        })
                    };
                    m = function() {
                        var e = [];
                        _.each(t.query("div.ecity", s), function(e) {
                            var a = t.get("input.J_Province", e),
                                i = 0;
                            if (!a) {
                                return
                            }
                            var r = t.query("input.J_City", e);
                            t.data(e, "citysNum", r.length);
                            _.each(r, function(e) {
                                var t = e.value,
                                    a = _.indexOf(v, t) !== -1;
                                if (a) {
                                    i++
                                }
                                e.checked = a;
                                e.disabled = _.indexOf(v, t) === -1 && _.indexOf(p, t) !== -1
                            });
                            a.disabled = true;
                            _.each(AreaCode.children(a.value), function(e) {
                                if (a.disabled) {
                                    a.disabled = _.indexOf(p, e) !== -1
                                }
                            });
                            i > 0 && t.html(t.get("span.check_num", e), "(" + i + ")");
                            a.checked = i === r.length;
                            t.data(e, "selectedNum", i)
                        });
                        _.each(o, function(e) {
                            var a = e.value.split(","),
                                i = [],
                                r = [];
                            _.each(a, function(e) {
                                var a = t.get("#J_Province_" + e);
                                a.checked && i.push(1);
                                a.disabled && r.push(1)
                            });
                            e.checked = i.length === a.length;
                            e.disabled = r.length === a.length
                        })
                    };
                    a.on(c, "submit", function(e) {
                        var a = [],
                            i = {};
                        e.preventDefault();
                        t.filter("input.J_Province", function(e) {
                            var a = t.parent(e, ".ecity");
                            _.each(t.query(".J_City", a), function(t) {
                                if (t.disabled) {
                                    e.checked = false
                                }
                            })
                        });
                        t.filter("input.J_City", function(e) {
                            if (e.checked && !e.disabled) {
                                a.push(e.value)
                            }
                        });
                        t.filter("input.J_Province", function(e) {
                            if (e.checked && !e.disabled) {
                                i[e.value] = true
                            }
                        });
                        r.refillAddress(l, a, i);
                        u.hide()
                    });
                    var J;

                    function C(e) {
                        var a = e.checked,
                            i = t.parent(e, "div.ecity"),
                            r = t.query("input.J_City", i),
                            n = a ? r.length : 0;
                        _.each(r, function(e) {
                            if (!e.disabled) {
                                e.checked = a
                            } else {
                                n = n - 1
                            }
                        });
                        n = n < 0 ? 0 : n;
                        t.data(i, "selectedNum", n);
                        t.html(t.get("span.check_num", i), n ? "(" + n + ")" : "")
                    }
                    a.on(s, "click", function(e) {
                        var a = e.target,
                            i = [],
                            r = t.query(".J_Group", s),
                            n = t.query(".J_Province", s),
                            l = t.query(".J_City", s);
                        if ("close_button" === a.className) {
                            t.removeClass(t.parent(a, 3), "showCityPop");
                            return
                        }
                        var c = t.parent(a, "div.ecity");
                        if (t.hasClass(a, "trigger")) {
                            var o = !!t.data(a, "isShow");
                            if (J && J != c) {
                                t.removeClass(J, "showCityPop")
                            }
                            t[o ? "removeClass" : "addClass"](c, "showCityPop");
                            J = c;
                            t.data(a, "isShow", !o)
                        } else if (t.hasClass(a, "J_City")) {
                            var d = t.data(c, "selectedNum") || 0;
                            a.checked ? ++d : d--;
                            t.data(c, "selectedNum", d);
                            t.html(t.get("span.check_num", c), d ? "(" + d + ")" : "");
                            var f = t.data(c, "citysNum");
                            if (!a.disabled) {
                                t.get("input.J_Province", c).checked = f === d
                            }
                            y()
                        }
                        switch (true) {
                            case t.hasClass(a, "J_Cancel"):
                                u.hide();
                                break;
                            case t.hasClass(a, "dcity"):
                                break;
                            case t.hasClass(a, "J_Group"):
                                i = a.value.split(",");
                                _.each(i, function(e) {
                                    var i = t.get("#J_Province_" + e);
                                    if (!i.disabled) {
                                        i.checked = a.checked
                                    }
                                    C(i)
                                });
                                break;
                            case t.hasClass(a, "J_Province"):
                                C(a);
                                y();
                                break;
                            default:
                                break
                        }
                        if (J && J !== c) {
                            t.removeClass(J, "showCityPop")
                        }
                    });
                    m()
                });
                u.show()
            })
        },
        binder: function() {
            var i = this,
                r = i.el.getElementsByTagName("input"),
                n = t.query(".J_BatchCheck", i.el) || [],
                s = t.query(".J_BatchField", i.el) || [],
                c = function(e, r) {
                    var n = false,
                        l = function() {
                            if (_.isArray(e)) {
                                _.each(e, function(t) {
                                    if (!e.disabled) {
                                        t.checked = n
                                    }
                                })
                            } else if (e.tagName) {
                                if (!e.disabled) {
                                    e.checked = n
                                }
                            }
                        },
                        s = function() {
                            var e = [];
                            _.each(r, function(t) {
                                t.checked && e.push(t)
                            });
                            n = e.length === r.length;
                            l()
                        };
                    a.on(e, "click", function(e) {
                        if (this.checked) {
                            n = true;
                            _.each(r, function(e) {
                                var a = t.parent(e, "tr").getAttribute("data-group");
                                if (!e.disabled) {
                                    e.checked = true;
                                    i.model.setSpecial(a, "checked", true)
                                }
                            })
                        } else {
                            n = false;
                            _.each(r, function(e) {
                                var a = t.parent(e, "tr").getAttribute("data-group");
                                e.checked = false;
                                i.model.setSpecial(a, "checked", true)
                            })
                        }
                        l()
                    });
                    a.on(r, "click", function(e) {
                        var a = e.target,
                            r = t.parent(a, "tr").getAttribute("data-group");
                        i.model.setSpecial(r, "checked", a.checked);
                        s()
                    });
                    s()
                };
            c(n, s);
            _.each(r, function(r) {
                if (r.getAttribute("type") === "text") {
                    a.on(r, "blur", function(a) {
                        var n = this.getAttribute("data-field"),
                            s = e.one(this),
                            c = t.parent(this, 2),
                            o, u = {
                                start: m === "number" ? "int" : "dfloat",
                                postage: "float",
                                plus: m === "number" ? "int" : "dfloat",
                                postageplus: "float",
                                wayDay: "int"
                            },
                            d;
                        o = e.trim(this.value);
                        d = u[n];
                        o = d === "int" ? parseInt(o, 10) : parseFloat(o);
                        o = o !== o ? l["EMPTY"] : d === "float" ? o.toFixed(2) : d === "dfloat" ? o.toFixed(1) : o;
                        if (n === "wayDay") {
                            if (s.attr("id") === "J_GlobalWayDay") {
                                var f = e.all(".J_ItemWayDay");
                                e.each(f, function(t) {
                                    t = e.one(t);
                                    if (!!t.val() && t.val() * 1 > o) {
                                        t.val(o);
                                        var a = t.parent(2)[0];
                                        if (a.tagName.toLowerCase() === "tr") {
                                            i.model.refillAmount({
                                                gid: a.getAttribute("data-group"),
                                                field: n,
                                                val: o
                                            })
                                        }
                                    }
                                })
                            } else {
                                var h = e.one("#J_GlobalWayDay").val() * 1;
                                o = o > h ? h : o
                            }
                        }
                        r.value = o;
                        if (c.tagName.toLowerCase() === "tr") {
                            i.model.refillAmount({
                                gid: c.getAttribute("data-group"),
                                field: n,
                                val: o
                            })
                        } else {
                            i.model.refillAmount({
                                field: n,
                                val: o
                            })
                        }
                    });
                    a.on(r, "keypress", function(e) {
                        var t = window.event ? window.event.keyCode : e ? e.which : null;
                        if ((t < 46 || t > 57) && t !== 8 && t !== 0) {
                            e.preventDefault()
                        }
                    });
                    a.on(r, "focus", function(e) {
                        var a = this.getAttribute("data-field"),
                            r = t.parent(this, 2),
                            n = r && r.getAttribute("data-group"),
                            l = r.tagName.toLowerCase() === "tr",
                            s, c;
                        i.model.clearError({
                            isSpecial: l,
                            gid: n,
                            key: a
                        });
                        t.removeClass(this, "input-error");
                        s = l ? t.query(".J_SpecialMessage", i.el) : t.query(".J_DefaultMessage", i.el);
                        s = s && s[0];
                        if (!s) {
                            return
                        }
                        c = t.query(".J_Message", s);
                        _.each(c, function(e) {
                            e.parentNode.removeChild(e)
                        })
                    })
                }
            })
        },
        delegate: function() {
            var e = this,
                i = t.children(e.el),
                r;
            a.on(i, "click", function(a) {
                var i = a.target;
                switch (true) {
                    case t.hasClass(i, "J_DeleteRule"):
                        a.preventDefault();
                        confirm(l["RULE_DELETE_CONFIRM"]) && e.deleteSpecial(i);
                        break;
                    case t.hasClass(i, "J_AddRule"):
                        a.preventDefault();
                        e.addSpecial(i);
                        break;
                    case t.hasClass(i, "J_ToggleBatch"):
                        a.preventDefault();
                        e.toggleBatch(i);
                        break;
                    case t.hasClass(i, "J_BatchDel"):
                        a.preventDefault();
                        e.batchSpecial("delete");
                        break;
                    case t.hasClass(i, "J_BatchSet"):
                        a.preventDefault();
                        e.batchSpecial("update", i);
                        break;
                    case t.hasClass(i, "J_EditArea"):
                        a.preventDefault();
                        e.setArea(i);
                        break;
                    default:
                        break
                }
            })
        }
    });
    var C = {
        tplManage: function() {
            var r = this,
                n = t.query(".J_CalcRule"),
                s = t.query(".J_Delivery"),
                c = t.get("#J_TPLForm"),
                o = t.get("#J_TPLPostData"),
                u = t.get("#J_ToggleCOD"),
                h = t.query(".J_ToggleIT"),
                p = t.get("#J_buyerBearFre"),
                J = t.get("#J_sellerBearFre"),
                C = t.get("#J_ToggleYYPS");

            function b(e) {
                var i, r;
                switch (e) {
                    case "cod":
                        i = t.get("#J_ToggleCOD");
                        break;
                    case "yyps":
                        i = t.get("#J_ToggleYYPS");
                        break;
                    default:
                        break
                }
                if (-1 != e.indexOf("day")) {
                    i = t.query(".J_ToggleIT")
                }
                if (!i) {
                    return
                }
                if (e.indexOf("day") !== -1) {
                    var n = i[0];
                    if (e == "twoday") n = i[1];
                    if (e == "thrday") n = i[2];
                    if (typeof n != "undefined") {
                        a.on(n, "click", function(a) {
                            if (v) {
                                return false
                            }
                            var i = d[e],
                                r = i.get("inherit"),
                                n = t.prev(a.target);
                            a.preventDefault();
                            i.switcher({
                                inherit: !r
                            });
                            if (r) {
                                a.target.innerHTML = l["CANCEL_COD"];
                                n.innerHTML = l["COD_CUSTOM"]
                            } else {
                                a.target.innerHTML = l["MODIFY_COD"];
                                n.innerHTML = l["COD_DEFAULT"]
                            }
                        })
                    }
                } else {
                    a.on(i, "click", function(a) {
                        var i = d[e],
                            r = i.get("inherit"),
                            n = t.prev(this);
                        a.preventDefault();
                        i.switcher({
                            inherit: !r
                        });
                        if (r) {
                            this.innerHTML = l["CANCEL_COD"];
                            n.innerHTML = l["COD_CUSTOM"]
                        } else {
                            this.innerHTML = l["MODIFY_COD"];
                            n.innerHTML = l["COD_DEFAULT"]
                        }
                    })
                }
            }

            function k(t) {
                e.each(n, function(e) {
                    if (e.getAttribute("data-type") === t) {
                        e.checked = true;
                        return false
                    }
                })
            }
            r.mvc();
            a.on(c, "submit", function(a) {
                var r = {};
                var n = t.query(".J_InDays");
                if (e.one("#J_SelectByCustom")) {
                    var l = 0;
                    e.all(".J_Delivery", "#J_SelectByCustom").each(function(e) {
                        if (e[0].checked && e.attr("data-iscustomselect") && e.attr("data-type") !== "yzpost") {
                            l++
                        }
                    });
                    if (l > 5) {
                        alert("\u6307\u5b9a\u5feb\u9012\u914d\u7f6e\u7684\u5feb\u9012\u516c\u53f8\u4e0d\u80fd\u8d85\u8fc75\u4e2a\uff01");
                        return false
                    }
                }
                _.each(n, function(e) {
                    var a = d[t.attr(e, "data-inDays")];
                    a.switcher({
                        enabled: e.checked
                    })
                });
                _.each(d, function(t) {
                    var a = t.get("delivery"),
                        i, n, l = ["withSpecial", "counter", "isBatch", "group", "typeName", "typeNameExtra", "checked", "errors", "starterror", "postageerror", "pluserror", "postagepluserror"];
                    i = e.JSON.stringify(t.toJSON());
                    i = e.JSON.parse(i);
                    n = i.special || [];
                    _.each(l, function(e) {
                        try {
                            delete i[e]
                        } catch (t) {}
                    });
                    _.each(n, function(e) {
                        _.each(l, function(t) {
                            try {
                                delete e[t]
                            } catch (a) {}
                        })
                    });
                    r[a] = i
                });
                r = e.JSON.stringify(r);
                o && (o.value = r);
                var s = function(t) {
                    var a, i = {};
                    a = t.all("input").add(t.all("select"));
                    a.each(function(t) {
                        if (t[0].name != "") {
                            var a = t[0].name == "serviceType" && t.hasClass("hidden");
                            a ? i[t[0].name] = "0" : i[t[0].name] = e.trim(t.val());
                            t[0].name == "areas" && (i[t[0].name] = t.val().split(","));
                            t["preferentialStandard"] == undefined && (t["preferentialStandard"] = "0");
                            t["preferentialMoney"] == undefined && (t["preferentialMoney"] = "0")
                        }
                    });
                    i["errors"] = {
                        preferentialMoney: false,
                        preferentialStandard: false
                    };
                    return i
                };
                var c = [],
                    u = {};
                i(".table").all("tbody").all("tr").each(function(e, t) {
                    if (t == i(".table").all("tbody").all("tr").length - 1) {
                        return
                    }
                    c.push(s(e))
                });
                u.list = c;
                u.message = [];
                i("#J_SetFree")[0].checked ? i("#J_FreeValue").val(e.JSON.stringify(u)) : i("#J_FreeValue").val(e.JSON.stringify({
                    list: []
                }))
            });
            if (typeof c["limitType"] != "undefined") {
                a.on(c["limitType"][0], "click", function() {
                    y()
                });
                a.on(c["limitType"][1], "click", function() {
                    if (t.get(J).checked) {
                        alert("\u9009\u62e9\u201c\u65e0\u6761\u4ef6\u5305\u90ae\u201d\u540e\uff0c\u6240\u6709\u533a\u57df\u7684\u8fd0\u8d39\u5c06\u8bbe\u7f6e\u4e3a0\u5143\u4e14\u539f\u8fd0\u8d39\u8bbe\u7f6e\u65e0\u6cd5\u6062\u590d\uff0c\u8bf7\u4fdd\u5b58\u539f\u6709\u8fd0\u8d39\u8bbe\u7f6e\uff0c\u60a8\u4ecd\u7136\u53ef\u4ee5\u8bbe\u7f6e\u9650\u552e\u7684\u57ce\u5e02")
                    }
                    y()
                })
            }
            var S = true;
            if (t.get("#J_CODSeller")) {
                S = t.get("#J_CODSeller").checked ? true : false;
                a.on(t.get("#J_CODSeller"), "click", function() {
                    S = true
                });
                a.on(t.get("#J_CODCustomer"), "click", function() {
                    S = false
                })
            }
            var T = true;
            if (t.get("#J_YYPSSeller")) {
                T = t.get("#J_YYPSSeller").checked ? true : false;
                a.on(t.get("#J_YYPSSeller"), "click", function() {
                    T = true
                });
                a.on(t.get("#J_YYPSCustomer"), "click", function() {
                    T = false
                })
            }
            if (t.get(p)) {
                a.on(p, "click", function() {
                    alert("\u60a8\u7684\u8fd0\u8d39\u8bbe\u7f6e\u5c06\u53d8\u4e3a\u672a\u8bbe\u7f6e\u72b6\u6001\uff0c\u8bf7\u8bbe\u7f6e\u8fd0\u8d39");
                    g({
                        clearPrice: true
                    });
                    y();
                    if (!S) {
                        t.get("#J_CODSeller").checked = false;
                        t.get("#J_CODCustomer").checked = true
                    }
                    if (!T) {
                        t.get("#J_YYPSSeller").checked = false;
                        t.get("#J_YYPSCustomer").checked = true
                    }
                })
            }
            if (t.get(J)) {
                a.on(J, "click", function() {
                    alert("\u9009\u62e9\u201c\u5356\u5bb6\u627f\u62c5\u8fd0\u8d39\u201d\u540e\uff0c\u6240\u6709\u533a\u57df\u7684\u8fd0\u8d39\u5c06\u8bbe\u7f6e\u4e3a0\u5143\u4e14\u539f\u8fd0\u8d39\u8bbe\u7f6e\u65e0\u6cd5\u6062\u590d\uff0c\u8bf7\u4fdd\u5b58\u539f\u6709\u8fd0\u8d39\u8bbe\u7f6e\u3002");
                    g();
                    y();
                    if (!S) {
                        t.get("#J_CODCustomer").checked = false;
                        t.get("#J_CODSeller").checked = true
                    }
                    if (!T) {
                        t.get("#J_YYPSCustomer").checked = false;
                        t.get("#J_YYPSSeller").checked = true
                    }
                })
            }
            a.on(s, "click", function(a) {
                var i = this,
                    r = t.parent(i, ".J_Section"),
                    n = t.query(".J_PostageDetail", r)[0],
                    l = n.getAttribute("data-delivery"),
                    s, c = d[l],
                    o = f[l],
                    u = !!e.one(i).attr("data-isCustomSelect");
                s = d["express"];
                if (u && u !== "0") {
                    var h = e.one(this).attr("data-type"),
                        g = d[h].get("isCustomSelect");
                    c.switcher({
                        enabled: i.checked,
                        isCustomSelect: g || "1"
                    })
                } else {
                    c.switcher({
                        enabled: i.checked
                    })
                }
            });
            _.each(n, function(e) {
                var t = e.getAttribute("data-type");
                e.checked = t === m
            });
            n && a.on(n, "click", function(e) {
                var a = this.getAttribute("data-type");
                if (a === m || !confirm(l["CHANGE_TYPE"])) {
                    e.preventDefault();
                    k(m);
                    return
                } else {
                    var i = t.query(".J_ToggleIT");
                    var n = t.prev(i);
                    var s = t.get("#J_ToggleCOD");
                    var c = t.get("#J_ToggleYYPS");
                    if (i) {
                        for (var o = 0; o < i.length; o++) {
                            i[o].innerHTML = l["MODIFY_COD"];
                            t.prev(i[o]).innerHTML = l["COD_DEFAULT"]
                        }
                    }
                    if (s) {
                        s.innerHTML = l["MODIFY_COD"];
                        t.prev(s).innerHTML = l["COD_DEFAULT"]
                    }
                    if (c) {
                        c.innerHTML = l["MODIFY_COD"];
                        t.prev(c).innerHTML = l["COD_DEFAULT"]
                    }
                }
                presetData.type = m = a;
                if (t.get("#J_SelectByCustom")) {
                    r.mvc(true, ["express"])
                } else {
                    r.mvc(true)
                }
            });
            b("cod");
            b("yyps");
            b("oneday");
            b("twoday");
            b("thrday");
            a.on(".J_EditFromDefaultExpress", "click", function() {
                var t = e.one(this),
                    a = t.attr("data-type"),
                    i = d[a],
                    r = i.get("inherit"),
                    n = i.get("isCustomSelect");
                if (n === "1") {
                    t.text("\u53d6\u6d88");
                    t.prev().text("\u81ea\u5b9a\u4e49\u6a21\u677f")
                } else if (n === "2") {
                    t.text("\u4fee\u6539");
                    t.prev().text("\u4f7f\u7528\u5feb\u9012\u8fd0\u8d39\u6a21\u677f")
                }
                i.switcher({
                    isCustomSelect: n === "1" ? "2" : "1"
                })
            })
        },
        mvc: function(a, i) {
            var r = t.query(".J_PostageDetail"),
                n = this;
            _.each(r, function(t) {
                var r = t.getAttribute("data-delivery"),
                    n = {
                        delivery: r,
                        inherit: !J[r] && (r === "cod" || r.indexOf("day") != -1 || r === "yyps"),
                        enabled: i && i.length > 0 ? e.inArray(r, i) : false
                    },
                    l;
                n = a ? n : _.extend(n, J[r] || {});
                d[r] = new s(n)
            });
            _.each(d, function(e) {
                var t = e.get("delivery"),
                    a;
                _.each(r, function(e) {
                    var i = e.getAttribute("data-delivery");
                    i === t && (a = e)
                });
                if (a) {
                    f[t] = new o({
                        model: e,
                        el: a
                    })
                }
            });
            if (d["internallogistics"]) {
                d["internallogistics"].set({
                    global: true
                })
            }
            _.each(f, function(e) {
                e.render({
                    refresh: true
                })
            })
        },
        autoIframe: function() {
            try {
                var e = parent.document.getElementById("J_DeliveryTemplate");
                setInterval(function() {
                    e && (e.style.height = "5000px")
                }, 300)
            } catch (t) {}
        },
        initCity: function() {
            var t = this,
                a = e.all,
                i = false,
                n = a("#J_address").val() == "" ? [] : e.JSON.parse(a("#J_address").val())["path"],
                l = n.length ? n[n.length - 1] : "",
                s = new r({
                    renderId: "#J_AddressChoose",
                    sourceUrl: "//division-data.alicdn.com/simple/addr_4_1111.js",
                    focus: l,
                    autoFocus: false,
                    hasTown: false
                }).on("anyChange", function(e) {
                    var t = e.data,
                        r = [];
                    for (key in t) {
                        r.push(t[key])
                    }
                    i && a("#J_address").val('{"path":[' + r.join(",") + "]}");
                    i = true
                })
        },
        initFareTime: function() {
            if (e.get("#J_FareTime") && fareTimeData) {
                new n({
                    renderTo: "J_FareTime",
                    resultId: "J_FareTimeResult",
                    data: fareTimeData
                })
            }
        },
        init: function() {
            var e = this;
            e.initCity();
            window.AreaCode = new AreaGrid;
            window.AreaCode.bind(function() {
                e.tplManage()
            });
            window.AreaCode.async();
            e.autoIframe();
            e.initFareTime()
        }
    };
    e.ready(function() {
        e.use("address,mui/select/search", function(e, t, a) {
            r = t;
            n = a;
            C.init()
        })
    });
    var b = t.get("#oned_arrive"),
        k = t.get("#twod_arrive"),
        S = t.get("#thrd_arrive");
    if (e.isEmptyObject(presetData && presetData.list)) {
        t.attr(b, "checked", "true");
        t.attr(k, "checked", "true");
        t.attr(S, "checked", "true")
    } else {
        presetData.list && presetData.list.oneday && presetData.list.oneday.enabled && t.attr(b, "checked", "true");
        presetData.list && presetData.list.twoday && presetData.list.twoday.enabled && t.attr(k, "checked", "true");
        presetData.list && presetData.list.thrday && presetData.list.thrday.enabled && t.attr(S, "checked", "true")
    }
})();
KISSY.add("addressPop", function(e, t) {
    var a = e.all,
        i = e.Event,
        n = e.DOM;

    function c(e) {
        this.set("tmpEl", e.tmpEl);
        this.set("trigger", e.trigger);
        this.cfg = {
            GROUP: ".J_Group",
            PROVINCE: ".J_Province",
            CITY: ".J_City",
            ECITY: ".ecity",
            NUMBER: ".check_num",
            PROFLAG: "#J_Province_"
        };
        this.initializer()
    }
    e.extend(c, e.Base, {
        initializer: function() {
            this._bindEvent()
        },
        _htmlTpl: function() {
            var t = this;
            var a = t.get("tmpEl").html(),
                i = areaGroup,
                n = i.group,
                c = i.inited,
                r;
            if (!c) {
                _.each(n, function(t, a) {
                    var i = t.codes,
                        n = [];
                    e.each(i, function(t) {
                        var a = {
                                title: AreaCode.query(t),
                                code: t
                            },
                            i = [],
                            c = AreaCode.children(t);
                        e.each(c, function(e) {
                            i.push({
                                title: AreaCode.query(e),
                                code: e
                            })
                        });
                        if (i[0]) {
                            a.citys = i;
                            a.withCitys = true
                        }
                        n.push(a)
                    });
                    t.areas = n;
                    t.gid = a;
                    t.even = function() {
                        return a % 2 !== 0
                    }
                });
                i.inited = true
            }
            r = Mustache.to_html(a, areaGroup);
            return r
        },
        _initPop: function(t) {
            var i = this,
                n = t.target;
            var c = e.Dialog;
            i.dialog = new c({
                headerContent: '<div class="title">\u9009\u62e9\u5730\u533a</div>',
                bodyContent: '<form method="post" id="J_AreaForm">' + i._htmlTpl() + '<div class="btns"><button type="submit" class="J_Submit">\u786e\u5b9a</button><button type="button" class="J_Cancel">\u53d6\u6d88</button></div></form>',
                elCls: "dialog-areas",
                mask: true,
                aria: true,
                xy: [a(document).width() / 2 - 278, a(n).offset().top + a(n).height() + 10]
            });
            i._popClose();
            i._popEvent();
            i.dialog.show()
        },
        _popClose: function() {
            var e = this;
            e.dialog.on("hide", function() {
                e.dialog.destroy()
            })
        },
        _cascade: function(t) {
            var i = this;
            e.each(t, function(t) {
                var i = t.value.split(","),
                    n = [];
                e.each(i, function(e) {
                    var t = a("#J_Province_" + e)[0];
                    t && (t.checked || t.diabled) && n.push(1)
                });
                t.checked = n.length === i.length
            })
        },
        _render: function(t, i) {
            var n = this;
            checks = [], areas = sectionAreas = a(n.el).attr("data-areas").split(",");
            e.each(a(t).all(n.cfg.ECITY), function(t) {
                var i = a(t).all(n.cfg.PROVINCE)[0],
                    c = 0;
                if (!i) {
                    return
                }
                var r = a(t).all(n.cfg.CITY),
                    l = r.length;
                a(t).attr("citysNum", r.length);
                e.each(r, function(t) {
                    var a = t.value,
                        i = e.indexOf(a, areas) !== -1;
                    if (i) {
                        c++
                    }
                    t.checked = i;
                    t.disabled = e.indexOf(a, areas) === -1 && e.indexOf(a, sectionAreas) !== -1
                });
                e.each(AreaCode.children(i.value), function(t) {
                    if (i.disabled) {
                        i.disabled = e.indexOf(t, sectionAreas) !== -1
                    }
                });
                c > 0 && a(t).all(n.cfg.NUMBER).html(c);
                i.checked = c === r.length;
                if (e.indexOf(i.value, areas) !== -1) {
                    i.checked = true;
                    a(t).all(n.cfg.NUMBER).html(r.length);
                    a(i).parent(n.cfg.ECITY).all(n.cfg.CITY).attr("checked", "checked")
                }
                a(t).attr("selectedNum", c)
            });
            e.each(i, function(t) {
                var i = t.value.split(","),
                    c = [],
                    r = [];
                e.each(i, function(e) {
                    var t = a(n.cfg.PROFLAG + e)[0];
                    t.checked && c.push(1);
                    t.disabled && r.push(1)
                });
                t.checked = c.length === i.length;
                t.disabled = r.length === i.length
            })
        },
        _changeCode: function(t, a) {
            var i = this,
                n = [];
            e.each(t, function(e) {
                n.push(AreaCode.query(e))
            });
            return n
        },
        _formSubmit: function(t) {
            var c = this;
            i.on(t, "submit", function(t) {
                var i = [],
                    r = {},
                    l = [],
                    s = 0,
                    o = 0;
                t.preventDefault();
                n.filter("input.J_Province", function(t) {
                    var a = n.parent(t, ".ecity");
                    e.each(n.query(".J_City", a), function(e) {
                        if (e.disabled) {
                            t.checked = false
                        }
                    })
                });
                n.filter("input.J_City", function(e) {
                    if (e.checked && !e.disabled) {
                        i.push(e.value);
                        o++
                    }
                });
                n.filter("input.J_Province", function(e) {
                    if (e.checked && !e.disabled) {
                        r[e.value] = true;
                        l.push(e.value);
                        s += a(e).parent(".ecity").all(".J_City").length
                    }
                });
                var d = s != o ? i : l;
                a(c.el).attr("data-areas", d.join(","));
                a(c.el).prev(".address-area").val(d.join(","));
                var h = d.length > 10 ? c._changeCode(d).splice(0, 10) : c._changeCode(d);
                d.length > 10 && h.push("...");
                var u = d.length == 0 ? "\u672a\u6dfb\u52a0\u5730\u533a" : h;
                a(c.el).next(".area-group").all("p").html(u);
                c.dialog.hide()
            })
        },
        _popEvent: function() {
            var t = this;
            t.dialog.on("show", function() {
                var c, r, l, s, o, d, h, u, f, v;
                c = t.dialog.get("contentEl").getDOMNode();
                r = c.getElementsByTagName("form")[0];
                l = a(c).all(t.cfg.GROUP);
                s = a(c).all(t.cfg.PROVINCE);
                o = a(c).all(t.cfg.CITY);
                t._cascade(l);
                t._render(c, l);
                t._formSubmit(c);
                var g;

                function p(t) {
                    var a = t.checked,
                        i = n.parent(t, "div.ecity"),
                        c = n.query("input.J_City", i),
                        r = a ? c.length : 0;
                    e.each(c, function(e) {
                        if (!e.disabled) {
                            e.checked = a
                        } else {
                            r = r - 1
                        }
                    });
                    r = r < 0 ? 0 : r;
                    n.data(i, "selectedNum", r);
                    n.html(n.get("span.check_num", i), r ? "(" + r + ")" : "")
                }
                i.on(c, "click", function(i) {
                    var r = i.target,
                        l = [],
                        s = n.query(".J_Group", c),
                        o = n.query(".J_Province", c),
                        d = n.query(".J_City", c);
                    if (a(r).hasClass("close_button")) {
                        n.removeClass(n.parent(r, 3), "showCityPop");
                        return
                    }
                    var h = n.parent(r, "div.ecity");
                    if (n.hasClass(r, "trigger")) {
                        var u = !!n.data(r, "isShow");
                        if (g && g != h) {
                            n.removeClass(g, "showCityPop")
                        }
                        n[u ? "removeClass" : "addClass"](h, "showCityPop");
                        g = h;
                        n.data(r, "isShow", !u)
                    } else if (n.hasClass(r, "J_City")) {
                        var f = n.data(h, "selectedNum") || parseInt(a(h).all(".check_num").html()) || 0;
                        r.checked ? ++f : f--;
                        n.data(h, "selectedNum", f);
                        n.html(n.get("span.check_num", h), f ? "(" + f + ")" : "");
                        var v = n.data(h, "citysNum") || parseInt(a(h).attr("citysNum"));
                        if (!r.disabled) {
                            n.get("input.J_Province", h).checked = v === f
                        }
                        t._cascade()
                    }
                    switch (true) {
                        case n.hasClass(r, "J_Cancel"):
                            t.dialog.hide();
                            break;
                        case n.hasClass(r, "J_Group"):
                            l = r.value.split(",");
                            e.each(l, function(e) {
                                var t = n.get("#J_Province_" + e);
                                if (!t.disabled) {
                                    t.checked = r.checked
                                }
                                p(t)
                            });
                            break;
                        case n.hasClass(r, "J_Province"):
                            p(r);
                            t._cascade();
                            break;
                        default:
                            break
                    }
                    if (g && g !== h) {
                        n.removeClass(g, "showCityPop")
                    }
                });
                t._render()
            })
        },
        _bindEvent: function() {
            var e = this;
            i.delegate(".table", "click", e.get("trigger"), function(t) {
                t.halt();
                e.el = t.target;
                e._initPop(t)
            })
        }
    });
    return c
}, {
    requires: ["overlay"]
});
KISSY.add("free", function(e, t, a) {
    var n = e.all,
        i = e.Event,
        r = e.DOM;

    function s(e) {
        var t = this;
        this.cfg = {
            0: {
                options: [{
                    text: "\u4ef6\u6570",
                    value: "0"
                }, {
                    text: "\u91d1\u989d",
                    value: "1"
                }, {
                    text: "\u4ef6\u6570 + \u91d1\u989d",
                    value: "2"
                }],
                style: "\u4ef6",
                type: "preferentialStandard",
                act: "\u6ee1"
            },
            1: {
                options: [{
                    text: "\u91cd\u91cf",
                    value: "0"
                }, {
                    text: "\u91d1\u989d",
                    value: "1"
                }, {
                    text: "\u91cd\u91cf + \u91d1\u989d",
                    value: "2"
                }],
                style: "kg\u5185",
                type: "preferentialStandard",
                act: "\u5728"
            },
            3: {
                options: [{
                    text: "\u4f53\u79ef",
                    value: "0"
                }, {
                    text: "\u91d1\u989d",
                    value: "1"
                }, {
                    text: "\u4f53\u79ef + \u91d1\u989d",
                    value: "2"
                }],
                style: "m\u00b3\u5185",
                type: "preferentialStandard",
                act: "\u5728"
            }
        };
        this.erropMap = {
            preferentialStandardError: "preferentialStandard",
            preferentialMoneyError: "preferentialMoney"
        };
        t.isTmp = false;
        t.isParm = false;
        this.initializer()
    }
    e.extend(s, e.Base, {
        initializer: function() {
            this._initFree();
            this._toggleTmp();
            this._selectStyle();
            this._selectStyle();
            this._delateItem();
            this._addItem();
            this._changeType();
            this._changeTypes();
            this._changeDate();
            this._changeCondition();
            this._clearError();
            this._rSticArea()
        },
        _initFree: function() {
            var e = this;
            e.Address = new a({
                tmpEl: n("#J_AreaTemplate"),
                trigger: ".J_Edit"
            })
        },
        _parseDate: function() {
            var t = this,
                a = [];
            if (!initJSON.list || !initJSON.list.length) {
                initJSON.list = [{
                    areas: [],
                    preferentialMoney: "",
                    preferentialStandard: "",
                    serviceType: 0,
                    transType: 0,
                    designated: "0",
                    errors: {
                        preferentialMoney: false,
                        preferentialStandard: false
                    }
                }]
            }
            t.dataJson = initJSON;
            t.dataJson.condition = t.condition;
            e.each(t.dataJson.list, function(a) {
                var n = [],
                    i;
                if (!!a.areas.length) {
                    e.each(a.areas, function(e) {
                        n.push(AreaCode.query(e))
                    });
                    if (n.length > 10) {
                        i = n.splice(0, 10);
                        i.push("...")
                    } else {
                        i = n
                    }
                    a.texts = i
                } else {
                    a.texts = ["\u672a\u6dfb\u52a0\u5730\u533a"]
                }
                a.checkedValue = parseFloat(a.preferentialStandard) > 0 && parseFloat(a.preferentialMoney) > 0;
                a.typeValue = a[t.dataJson.condition.type];
                e.each(t.erropMap, function(e, t) {
                    a[t] = a.errors[e]
                })
            });
            t._getDate();
            t._getTypes()
        },
        _getTypes: function() {
            var t = this,
                a = [];
            n(".J_pecify").each(function(e) {
                if (e[0].checked) {
                    a.push({
                        text: e.next("label").html(),
                        value: e.val()
                    })
                }
            });
            t.dataJson && (t.dataJson.types = a);
            e.each(t.dataJson.list, function(e) {
                parseFloat(e.transType) == 0 && (e.transType = t.dataJson.types[0]["value"])
            })
        },
        _changeTypes: function() {
            var e = this;
            n(".J_pecify").on("click", function() {
                if (e.dataJson == undefined) {
                    return
                }
                e._getTypes();
                e._render()
            })
        },
        _getDate: function() {
            var e = this,
                t = [];
            n(".J_ServiceValue").each(function(e) {
                if (e[0].checked) {
                    t.push({
                        text: e.next("label").html(),
                        value: e.val()
                    })
                }
            });
            e.dataJson && (e.dataJson.service = t)
        },
        _changeDate: function() {
            var e = this;
            n(".J_Section").all(".J_Delivery").on("click", function() {
                e._getDate();
                e._render()
            })
        },
        _changeCondition: function() {
            var e = this;
            i.delegate(".table", "change", ".J_ChageContion", function(a) {
                var i = n(a.target),
                    r = parseInt(i.parent("tr").attr("data-index"));
                e._conditionJson(r);
                if (i.val() == 1) {
                    e.conJson.condition = false
                } else if (i.val() == 2) {
                    e.conJson.condition = true;
                    e.conJson.flag = true
                }
                n(i).next(".free-contion").html(new t(e._conditionTpl()).render(e.conJson));
                e._rSticArea()
            })
        },
        _conditionJson: function(e) {
            var t = this,
                a;
            a = t.dataJson.list[e];
            t.conJson = {
                condition: true,
                flag: false,
                typeValue: a.typeValue,
                type: t.dataJson.condition.type,
                style: t.dataJson.condition.style,
                money: a.preferentialMoney,
                act: t.dataJson.condition.act
            }
        },
        _conditionTpl: function() {
            var e = this;
            return '{{#if condition}} {{act}} <input type="text" value="{{typeValue}}" class="input-text" name="{{type}}"> {{style}}{{#if flag}} , <input type="text" name="preferentialMoney" class="input-text input-65" value="{{money}}"> \u5143\u4ee5\u4e0a {{/if}}{{else}}\u6ee1 <input class="input-text input-65" type="text" name="preferentialMoney" value="{{money}}"> \u5143{{/if}}\u5305\u90ae'
        },
        _render: function() {
            var e = this;
            n("#J_Tbody").html(new t(n("#J_FreeTemplate").html()).render(e.dataJson));
            e._rSticArea()
        },
        _toggleTmp: function() {
            var e = this,
                t = !!n("#J_DeliveryINTERNALLOGISTICS").length,
                a = !switchFlag;
            n("#J_buyerBearFre")[0].checked == true && n(".set-free").show() && (e.isTmp = true);
            t && n(".set-free").hide();
            a && n(".set-free").hide();
            n(".J_Freight").all("input").on("click", function(i) {
                if (this.checked == true && this.value == "0") {
                    if (a) {
                        n(".set-free").hide() && (e.isTmp = false)
                    } else {
                        if (t) {
                            n(".set-free").hide() && (e.isTmp = false)
                        } else {
                            n(".set-free").show() && (e.isTmp = true)
                        }
                    }
                } else {
                    n(".set-free").hide() && (e.isTmp = false)
                }
            });
            e._showTmp()
        },
        _showTmp: function() {
            var e = this;
            if (!!initJSON.list && initJSON.list.length > 0) {
                n("#J_SetFree")[0].checked = true;
                n(".table").show() && (e.isParm = true);
                setTimeout(function() {
                    e._parseDate();
                    e._render()
                }, 600)
            }
            n("#J_SetFree").on("click", function() {
                this.checked == true ? n(".table").show() && (e.isParm = true) : n(".table").hide() && (e.isParm = false);
                e._parseDate();
                e._render()
            })
        },
        _selectStyle: function() {
            var e = this,
                t;
            n(".J_CalcRule").each(function(a) {
                if (a[0].checked == true) {
                    t = e.cfg[a[0].value]
                }
            });
            e.condition = n(".J_CalcRule").length == 1 ? e.cfg[n(".J_CalcRule").val()] : t;
            n(".J_CalcRule").on("click", function() {
                if (this.checked == true) {
                    e.condition = e.cfg[this.value];
                    e.dataJson && (e.dataJson.condition = e.cfg[this.value]);
                    e._render()
                }
            })
        },
        _delateItem: function() {
            var e = this;
            i.delegate(".table", "click", ".J_DelateItem", function(e) {
                e.halt();
                n(e.target).parent("tr").remove()
            })
        },
        _addItem: function() {
            var e = this;
            i.delegate(".table", "click", ".J_AddItem", function(t) {
                t.halt();
                var a = n(t.target).parent("tr").clone(true),
                    i = n(t.target).parent("tr").all(".J_Service").val(),
                    r = n(t.target).parent("tr").all(".J_ChageContion").val();
                a.insertAfter(n(t.target).parent("tr"));
                a.all(".J_Service").val(i);
                a.all(".J_ChageContion").val(r);
                e._rSticArea()
            })
        },
        _changeType: function() {
            var e = this;
            i.delegate(".table", "change", ".J_Service", function(e) {
                if (n(e.target).val() == "111") {
                    n(e.target).parent("tr").all(".J_Trans").removeClass("hidden")
                } else {
                    n(e.target).parent("tr").all(".J_Trans").addClass("hidden")
                }
            })
        },
        _clearError: function() {
            var e = this;
            i.delegate(".table", "focusin", ".input-error", function(e) {
                n(e.target).removeClass("input-error");
                n(".table").all(".J_DefaultMessage").html("")
            })
        },
        _rSticArea: function() {
            var e = this;
            i.on(n(".table").all(".input-text"), "keypress", function(e) {
                var t = window.event ? window.event.keyCode : e ? e.which : null;
                if ((t < 46 || t > 57) && t !== 8 && t !== 0) {
                    e.preventDefault()
                }
            })
        }
    });
    return s
}, {
    requires: ["xtemplate", "addressPop"]
});
