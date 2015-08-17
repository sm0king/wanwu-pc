KISSY.add("address", function(e, t, a, n, r) {
    var i = t.all;

    function s(t) {
        var a = this;
        if (!e.get(t.renderId)) {
            return
        }
        a.cfg = e.merge({
            sourceUrl: "//division-data.alicdn.com/simple/addr_3_001.js",
            hasTown: false,
            selectTips: ["\u56fd\u5bb6", "\u7701/\u76f4\u8f96\u5e02", "\u5e02", "\u533a/\u53bf", "\u8857\u9053"],
            unKnownTownOption: true,
            townUrl: "//lsp.wuliu.taobao.com/locationservice/addr/output_address_town.do",
            autoFocus: true
        }, t);
        s.superclass.constructor.call(a, a.cfg);
        a.set("selectNameArr", ["country", "province", "city", "area", "town"]);
        a._init()
    }
    e.extend(s, a);
    e.augment(s, {
        _init: function() {
            var e = this;
            i(e.get("renderId")).empty();
            e.val = {};
            e.focusId = [];
            e._getAddressData();
            e._initEvent()
        },
        _getAddressData: function() {
            var t = this;
            e.getScript(t.get("sourceUrl"), {
                success: function() {
                    t._processData(tdist);
                    t._displayData();
                    tdist = null
                }
            })
        },
        _processData: function(t) {
            var a = this,
                n = t,
                r = {},
                i;
            a.set("allAddressData", t);
            e.each(n, function(e, t) {
                i = n[t];
                if (!r[t]) {
                    r[t] = {
                        n: i[0],
                        p: i[1],
                        ch: []
                    }
                } else {
                    r[t].n = i[0];
                    r[t].p = i[1]
                }
                if (!r[i[1]]) {
                    r[i[1]] = {
                        ch: [t]
                    }
                } else {
                    r[i[1]].ch.push(t)
                }
            });
            a.set("allAddressRight", r);
            r = null
        },
        _displayData: function() {
            var e = this,
                t = e.get("allAddressRight"),
                a = 0,
                n;
            if (t) {
                if (t[0] && t[0].ch && t[0].ch.length) {
                    a = 0
                } else if (t[1] && t[1].ch && t[1].ch.length) {
                    a = 1
                } else {
                    return false
                }
                n = t[a];
                var r = e.filter(n.ch);
                if (e.get("focus") && e.get("focus")) {
                    var s = e.get("focus").id;
                    e.focusId.push(e.get("focus"));
                    e._getFocusId(e.get("focus"))
                }
                if (r && r.length) {
                    i(e.get("renderId")).append(e._createSelect(r, e.get("selectNameArr")[a], e.get("selectTips")[a]));
                    e._createSelectNext(++a)
                }
                e.set("focus", "");
                e.focusId = null
            }
        },
        _getFocusId: function(e) {
            var t = this,
                a = t.get("allAddressRight");
            if (a[e].p) {
                t.focusId.push(a[e].p);
                t._getFocusId(a[e].p)
            }
        },
        _createSelect: function(e, t, a, n) {
            var r = this,
                i = r.get("allAddressRight"),
                s, l, c = document.createElement("select");
            if (n) {
                i = n
            }
            c.name = t;
            c.className = "J_AddressCN";
            if (!r.get("autoFocus")) {
                c.options.add(new Option("\u8bf7\u9009\u62e9" + a, ""))
            }
            if (r.focusId) {
                var o = "," + r.focusId.join(",") + ",";
                for (var d = 0, f = e.length; d < f; d++) {
                    l = e[d];
                    s = new Option(i[l].n, l);
                    if (o.indexOf("," + l + ",") > -1) {
                        s.selected = true
                    }
                    c.options.add(s)
                }
            } else {
                for (var d = 0, f = e.length; d < f; d++) {
                    l = e[d];
                    s = new Option(i[l].n, l);
                    c.options.add(s)
                }
            }
            if (r.get("unKnownTownOption") && t.indexOf("town") > -1) {
                s = new Option("\u6211\u4e0d\u77e5\u9053", "");
                c.options.add(s)
            }
            return c
        },
        _initEvent: function() {
            var e = this,
                t = e.get("selectNameArr");
            r.undelegate(i(e.get("renderId")), "change", ".J_AddressCN");
            r.delegate(i(e.get("renderId")), "change", ".J_AddressCN", function(a) {
                var n = i(a.target),
                    r = n.val(),
                    s = n.attr("name");
                e.clearVal(s);
                e.val[s] = r;
                while (n.next()) {
                    n.next().remove()
                }
                for (var l = 0, c = t.length; l < c; l++) {
                    if (t[l] == s) {
                        selectType = l;
                        break
                    }
                }
                if (r) {
                    e._createSelectNext(++selectType)
                } else {
                    var o = n[0].selectedIndex;
                    if (n[0].options[o].text === "\u6211\u4e0d\u77e5\u9053") {
                        delete e.val.town;
                        e.fire("change", {
                            data: e.val
                        });
                        e.fire("anyChange", {
                            data: e.val
                        })
                    }
                }
            })
        },
        clearVal: function(e) {
            var t = this;
            if (e == "country") {
                t.val = {}
            } else if (e == "province") {
                delete t.val.city;
                delete t.val.area;
                delete t.val.town
            } else if (e == "city") {
                delete t.val.area;
                delete t.val.town
            } else if (e == "area") {
                delete t.val.town
            }
        },
        _createSelectNext: function(e) {
            var t = this,
                a = i(".J_AddressCN", this.get("renderId")),
                n = i(a[a.length - 1]),
                r = n.val(),
                s = n.attr("name"),
                l = t.get("allAddressRight")[r];
            if (r) {
                t.val[s] = r
            }
            if (!l) {
                if (t.val.town) {
                    t.fire("change", {
                        data: t.val
                    })
                }
                t.fire("anyChange", {
                    data: t.val
                })
            } else {
                var c = t.filter(l.ch);
                if (r && c && c.length) {
                    i(t.get("renderId")).append(t._createSelect(c, t.get("selectNameArr")[e], t.get("selectTips")[e]));
                    t._createSelectNext(++e)
                } else {
                    if (t.get("hasTown")) {
                        t.getTownData()
                    } else {
                        t.fire("change", {
                            data: t.val
                        });
                        t.fire("anyChange", {
                            data: t.val
                        })
                    }
                }
            }
        },
        getTownData: function() {
            var e = this,
                t = [];
            if (e._param().l0 > 1) {
                e.fire("change", {
                    data: e.val
                });
                e.fire("anyChange", {
                    data: e.val
                });
                return false
            }
            new n({
                url: e.get("townUrl"),
                dataType: "jsonp",
                data: e._param(),
                success: function(a) {
                    if (a.success) {
                        if (a.result) {
                            var n = a.result;
                            e.set("townData", n);
                            for (var r in n) {
                                var s = n[r];
                                n[r] = {
                                    n: s[0],
                                    py: s[1]
                                };
                                t.push(r)
                            }
                            var l = e.filter(t);
                            if (l && l.length) {
                                i(e.get("renderId")).append(e._createSelect(l, "town", e.get("selectTips")[4], n));
                                e._createSelectNext()
                            } else {
                                e.fire("change", {
                                    data: e.val
                                });
                                e.fire("anyChange", {
                                    data: e.val
                                })
                            }
                        }
                    } else {
                        e.fire("change", {
                            data: e.val
                        });
                        e.fire("anyChange", {
                            data: e.val
                        })
                    }
                }
            })
        },
        _param: function() {
            var t = this.val,
                a = {};
            e.each(t, function(e, t) {
                switch (t) {
                    case "country":
                        a["l0"] = e;
                        break;
                    case "province":
                        a["l1"] = e;
                        break;
                    case "city":
                        a["l2"] = e;
                        break;
                    case "area":
                        a["l3"] = e;
                        break;
                    default:
                        break
                }
            });
            return a
        },
        filter: function(e) {
            var t = this,
                a = [],
                n = t.get("ignored");
            if (n && n.length) {
                n = "," + n.join(",") + ","
            } else {
                return e
            }
            for (var r = 0, i = e.length; r < i; r++) {
                if (n.indexOf("," + e[r] + ",") == -1) {
                    a.push(e[r])
                }
            }
            return a
        }
    });
    (function() {
        function t() {}
        t.prototype = {
            toId: function() {
                var e, t, a = {};
                for (e in this) {
                    if (this.hasOwnProperty(e)) {
                        a[e] = this[e].id
                    }
                }
                return a
            },
            toText: function() {
                var e, t, a = {};
                for (e in this) {
                    if (this.hasOwnProperty(e)) {
                        a[e] = this[e].name
                    }
                }
                return a
            },
            getCoordinate: function(t) {
                var a, n, r = "";
                for (a in this) {
                    if (this.hasOwnProperty(a)) {
                        r += this[a].name
                    }
                }
                e.getScript("//lsp.wuliu.taobao.com/locationservice/addr/geoCoding.do?addr=" + r, {
                    success: function() {
                        t(geoCoding)
                    }
                })
            }
        };
        e.augment(s, {
            getVal: function() {
                var e = this,
                    a = e.val;
                var n = new t,
                    r = e.get("allAddressRight");
                for (var i in a) {
                    var s = e.get("allAddressData")[a[i]];
                    if (!s) {
                        s = [e.get("townData")[a[i]].n, i]
                    }
                    n[i] = {
                        name: s[0],
                        id: s[1]
                    }
                }
                return n
            }
        })
    })();
    return s
}, {
    requires: ["node", "base", "ajax", "event"]
});
