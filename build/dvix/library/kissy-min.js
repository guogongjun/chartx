var KISSY = function (a) {
        var b, c = this, d = 0, e = '';
        return b = {
            __BUILD_TIME: '20131125184002',
            Env: { host: c },
            Config: {
                debug: '@DEBUG@',
                fns: {}
            },
            version: '1.32',
            config: function (c, d) {
                var e, f, g, h = this, i = b.Config, j = i.fns;
                return b.isObject(c) ? b.each(c, function (a, b) {
                    g = j[b], g ? g.call(h, a) : i[b] = a;
                }) : (e = j[c], d === a ? f = e ? e.call(h) : i[c] : e ? f = e.call(h, d) : i[c] = d), f;
            },
            log: function (d, e, f) {
                b.Config.debug && (f && (d = f + ': ' + d), c.console !== a && console.log && console[e && console[e] ? e : 'log'](d));
            },
            error: function (a) {
                if (b.Config.debug)
                    throw a instanceof Error ? a : new Error(a);
            },
            guid: function (a) {
                return (a || e) + d++;
            }
        };
    }();
!function (a, b) {
    function c() {
    }
    function d(a, b) {
        var d;
        return m ? d = m(a) : (c.prototype = a, d = new c()), d.constructor = b, d;
    }
    function e(a, b) {
        for (var c in b)
            a[c] = b[c];
    }
    function f(b, c, d, e, f, i) {
        if (!c || !b)
            return b;
        var j, k, l, m;
        for (c[h] = b, i.push(c), l = a.keys(c), m = l.length, j = 0; m > j; j++)
            k = l[j], k != h && g(k, b, c, d, e, f, i);
        return b;
    }
    function g(c, d, e, g, i, j, l) {
        if (g || !(c in d) || j) {
            var m = d[c], n = e[c];
            if (m === n)
                return m === b && (d[c] = m), void 0;
            if (i && (n = i.call(e, c, n)), j && n && (a.isArray(n) || a.isPlainObject(n)))
                if (n[h])
                    d[c] = n[h];
                else {
                    var o = m && (a.isArray(m) || a.isPlainObject(m)) ? m : a.isArray(n) ? [] : {};
                    d[c] = o, f(o, n, g, i, k, l);
                }
            else
                n === b || !g && c in d || (d[c] = n);
        }
    }
    var h = '__MIX_CIRCULAR', i = '__~ks_stamped', j = this, k = !0, l = '', m = Object.create, n = !{ toString: 1 }.propertyIsEnumerable('toString'), o = [
            'constructor',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toString',
            'toLocaleString',
            'valueOf'
        ];
    e(a, {
        stamp: function (c, d, e) {
            e = e || i;
            var f = c[e];
            if (f)
                return f;
            if (!d)
                try {
                    f = c[e] = a.guid(e);
                } catch (g) {
                    f = b;
                }
            return f;
        },
        keys: function (a) {
            var b, c, d = [];
            for (b in a)
                d.push(b);
            if (n)
                for (c = o.length - 1; c >= 0; c--)
                    b = o[c], a.hasOwnProperty(b) && d.push(b);
            return d;
        },
        mix: function (c, d, e, g, i) {
            if ('object' == typeof e && (g = e.whitelist, i = e.deep, e = e.overwrite), g && 'function' != typeof g) {
                var j = g;
                g = function (c, d) {
                    return a.inArray(c, j) ? d : b;
                };
            }
            e === b && (e = k);
            var l, m = [], n = 0;
            for (f(c, d, e, g, i, m); l = m[n++];)
                delete l[h];
            return c;
        },
        merge: function (b) {
            b = a.makeArray(arguments);
            var c, d = {}, e = b.length;
            for (c = 0; e > c; c++)
                a.mix(d, b[c]);
            return d;
        },
        augment: function (c) {
            var d = a.makeArray(arguments), e = d.length - 2, f = 1, g = d[e], h = d[e + 1];
            for (a.isArray(h) || (g = h, h = b, e++), 'boolean' != typeof g && (g = b, e++); e > f; f++)
                a.mix(c.prototype, d[f].prototype || d[f], g, h);
            return c;
        },
        extend: function (b, c, e, f) {
            if (!c || !b)
                return b;
            var g, h = c.prototype;
            return g = d(h, b), b.prototype = a.mix(g, b.prototype), b.superclass = d(h, c), e && a.mix(g, e), f && a.mix(b, f), b;
        },
        namespace: function () {
            var b, c, d, e = a.makeArray(arguments), f = e.length, g = null, h = e[f - 1] === k && f--;
            for (b = 0; f > b; b++)
                for (d = (l + e[b]).split('.'), g = h ? j : this, c = j[d[0]] === g ? 1 : 0; c < d.length; ++c)
                    g = g[d[c]] = g[d[c]] || {};
            return g;
        }
    });
}(KISSY), function (a, b) {
    var c = !0, d = Array.prototype, e = d.indexOf, f = d.lastIndexOf, g = d.filter, h = d.every, i = d.some, j = d.map, k = !1;
    a.mix(a, {
        each: function (c, d, e) {
            if (c) {
                var f, g, h, i = 0, j = c && c.length, l = j === b || 'function' === a.type(c);
                if (e = e || null, l)
                    for (h = a.keys(c); i < h.length && (f = h[i], d.call(e, c[f], f, c) !== k); i++);
                else
                    for (g = c[0]; j > i && d.call(e, g, i, c) !== k; g = c[++i]);
            }
            return c;
        },
        indexOf: e ? function (a, b) {
            return e.call(b, a);
        } : function (a, b) {
            for (var c = 0, d = b.length; d > c; ++c)
                if (b[c] === a)
                    return c;
            return -1;
        },
        lastIndexOf: f ? function (a, b) {
            return f.call(b, a);
        } : function (a, b) {
            for (var c = b.length - 1; c >= 0 && b[c] !== a; c--);
            return c;
        },
        unique: function (b, c) {
            var d = b.slice();
            c && d.reverse();
            for (var e, f, g = 0; g < d.length;) {
                for (f = d[g]; (e = a.lastIndexOf(f, d)) !== g;)
                    d.splice(e, 1);
                g += 1;
            }
            return c && d.reverse(), d;
        },
        inArray: function (b, c) {
            return a.indexOf(b, c) > -1;
        },
        filter: g ? function (a, b, c) {
            return g.call(a, b, c || this);
        } : function (b, c, d) {
            var e = [];
            return a.each(b, function (a, b, f) {
                c.call(d || this, a, b, f) && e.push(a);
            }), e;
        },
        map: j ? function (a, b, c) {
            return j.call(a, b, c || this);
        } : function (a, b, c) {
            for (var d = a.length, e = new Array(d), f = 0; d > f; f++) {
                var g = 'string' == typeof a ? a.charAt(f) : a[f];
                (g || f in a) && (e[f] = b.call(c || this, g, f, a));
            }
            return e;
        },
        reduce: function (a, d) {
            var e = a.length;
            if ('function' != typeof d)
                throw new TypeError('callback is not function!');
            if (0 === e && 2 == arguments.length)
                throw new TypeError('arguments invalid');
            var f, g = 0;
            if (arguments.length >= 3)
                f = arguments[2];
            else
                do {
                    if (g in a) {
                        f = a[g++];
                        break;
                    }
                    if (g += 1, g >= e)
                        throw new TypeError();
                } while (c);
            for (; e > g;)
                g in a && (f = d.call(b, f, a[g], g, a)), g++;
            return f;
        },
        every: h ? function (a, b, c) {
            return h.call(a, b, c || this);
        } : function (a, b, d) {
            for (var e = a && a.length || 0, f = 0; e > f; f++)
                if (f in a && !b.call(d, a[f], f, a))
                    return k;
            return c;
        },
        some: i ? function (a, b, c) {
            return i.call(a, b, c || this);
        } : function (a, b, d) {
            for (var e = a && a.length || 0, f = 0; e > f; f++)
                if (f in a && b.call(d, a[f], f, a))
                    return c;
            return k;
        },
        makeArray: function (b) {
            if (null == b)
                return [];
            if (a.isArray(b))
                return b;
            var c = typeof b.length, d = typeof b;
            if ('number' != c || b.alert || 'string' == d || 'function' == d && !('item' in b && 'number' == c))
                return [b];
            for (var e = [], f = 0, g = b.length; g > f; f++)
                e[f] = b[f];
            return e;
        }
    });
}(KISSY), function (a, b) {
    function c(a) {
        var b = typeof a;
        return null == a || 'object' !== b && 'function' !== b;
    }
    function d() {
        if (f)
            return f;
        var b = i;
        return a.each(m, function (a) {
            b += a + '|';
        }), b = b.slice(0, -1), f = new RegExp(b, 'g');
    }
    function e() {
        if (g)
            return g;
        var b = i;
        return a.each(n, function (a) {
            b += a + '|';
        }), b += '&#(\\d{1,5});', g = new RegExp(b, 'g');
    }
    var f, g, h = '&', i = '', j = '=', k = !0, l = 16, m = {
            '&amp;': '&',
            '&gt;': '>',
            '&lt;': '<',
            '&#x60;': '`',
            '&#x2F;': '/',
            '&quot;': '"',
            '&#x27;': '\''
        }, n = {}, o = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
    !function () {
        for (var a in m)
            n[m[a]] = a;
    }(), a.mix(a, {
        urlEncode: function (a) {
            return encodeURIComponent(String(a));
        },
        urlDecode: function (a) {
            return decodeURIComponent(a.replace(/\+/g, ' '));
        },
        fromUnicode: function (a) {
            return a.replace(/\\u([a-f\d]{4})/gi, function (a, b) {
                return String.fromCharCode(parseInt(b, l));
            });
        },
        escapeHtml: function (a) {
            return (a + '').replace(d(), function (a) {
                return n[a];
            });
        },
        escapeRegExp: function (a) {
            return a.replace(o, '\\$&');
        },
        unEscapeHtml: function (a) {
            return a.replace(e(), function (a, b) {
                return m[a] || String.fromCharCode(+b);
            });
        },
        param: function (d, e, f, g) {
            e = e || h, f = f || j, g === b && (g = k);
            var l, m, n, o, p, q = [], r = a.urlEncode;
            for (l in d)
                if (p = d[l], l = r(l), c(p))
                    q.push(l), p !== b && q.push(f, r(p + i)), q.push(e);
                else if (a.isArray(p) && p.length)
                    for (m = 0, o = p.length; o > m; ++m)
                        n = p[m], c(n) && (q.push(l, g ? r('[]') : i), n !== b && q.push(f, r(n + i)), q.push(e));
            return q.pop(), q.join(i);
        },
        unparam: function (c, d, e) {
            if ('string' != typeof c || !(c = a.trim(c)))
                return {};
            d = d || h, e = e || j;
            for (var f, g, i, k = {}, l = a.urlDecode, m = c.split(d), n = 0, o = m.length; o > n; ++n) {
                if (f = m[n].indexOf(e), -1 == f)
                    g = l(m[n]), i = b;
                else {
                    g = l(m[n].substring(0, f)), i = m[n].substring(f + 1);
                    try {
                        i = l(i);
                    } catch (p) {
                        a.log(p + 'decodeURIComponent error : ' + i, 'error');
                    }
                    a.endsWith(g, '[]') && (g = g.substring(0, g.length - 2));
                }
                g in k ? a.isArray(k[g]) ? k[g].push(i) : k[g] = [
                    k[g],
                    i
                ] : k[g] = i;
            }
            return k;
        }
    }), a.escapeHTML = a.escapeHtml, a.unEscapeHTML = a.unEscapeHtml;
}(KISSY), function (a) {
    function b(a, b, c) {
        var d = [].slice, e = d.call(arguments, 3), f = function () {
            }, g = function () {
                var g = d.call(arguments);
                return b.apply(this instanceof f ? this : c, a ? g.concat(e) : e.concat(g));
            };
        return f.prototype = b.prototype, g.prototype = new f(), g;
    }
    a.mix(a, {
        noop: function () {
        },
        bind: b(0, b, null, 0),
        rbind: b(0, b, null, 1),
        later: function (b, c, d, e, f) {
            c = c || 0;
            var g, h, i = b, j = a.makeArray(f);
            return 'string' == typeof b && (i = e[b]), i || a.error('method undefined'), g = function () {
                i.apply(e, j);
            }, h = d ? setInterval(g, c) : setTimeout(g, c), {
                id: h,
                interval: d,
                cancel: function () {
                    this.interval ? clearInterval(h) : clearTimeout(h);
                }
            };
        },
        throttle: function (b, c, d) {
            if (c = c || 150, -1 === c)
                return function () {
                    b.apply(d || this, arguments);
                };
            var e = a.now();
            return function () {
                var f = a.now();
                f - e > c && (e = f, b.apply(d || this, arguments));
            };
        },
        buffer: function (b, c, d) {
            function e() {
                e.stop(), f = a.later(b, c, 0, d || this, arguments);
            }
            if (c = c || 150, -1 === c)
                return function () {
                    b.apply(d || this, arguments);
                };
            var f = null;
            return e.stop = function () {
                f && (f.cancel(), f = 0);
            }, e;
        }
    });
}(KISSY), function (a, b) {
    function c(b, d, e) {
        var h, i, j, k, l = b;
        if (!b)
            return l;
        if (b[g])
            return e[b[g]].destination;
        if ('object' == typeof b) {
            var m = b.constructor;
            a.inArray(m, [
                Boolean,
                String,
                Number,
                Date,
                RegExp
            ]) ? l = new m(b.valueOf()) : (h = a.isArray(b)) ? l = d ? a.filter(b, d) : b.concat() : (i = a.isPlainObject(b)) && (l = {}), b[g] = k = a.guid('c'), e[k] = {
                destination: l,
                input: b
            };
        }
        if (h)
            for (var n = 0; n < l.length; n++)
                l[n] = c(l[n], d, e);
        else if (i)
            for (j in b)
                j === g || d && d.call(b, b[j], j, b) === f || (l[j] = c(b[j], d, e));
        return l;
    }
    function d(c, d, f, g) {
        if (c[h] === d && d[h] === c)
            return e;
        c[h] = d, d[h] = c;
        var i = function (a, c) {
            return null !== a && a !== b && a[c] !== b;
        };
        for (var j in d)
            !i(c, j) && i(d, j) && f.push('expected has key \'' + j + '\', but missing from actual.');
        for (j in c)
            !i(d, j) && i(c, j) && f.push('expected missing key \'' + j + '\', but present in actual.');
        for (j in d)
            j != h && (a.equals(c[j], d[j], f, g) || g.push('\'' + j + '\' was \'' + (d[j] ? d[j].toString() : d[j]) + '\' in expected, but was \'' + (c[j] ? c[j].toString() : c[j]) + '\' in actual.'));
        return a.isArray(c) && a.isArray(d) && c.length != d.length && g.push('arrays were not the same length'), delete c[h], delete d[h], 0 === f.length && 0 === g.length;
    }
    var e = !0, f = !1, g = '__~ks_cloned', h = '__~ks_compared';
    a.mix(a, {
        equals: function (a, c, f, g) {
            return f = f || [], g = g || [], a === c ? e : a === b || null === a || c === b || null === c ? null == a && null == c : a instanceof Date && c instanceof Date ? a.getTime() == c.getTime() : 'string' == typeof a && 'string' == typeof c ? a == c : 'number' == typeof a && 'number' == typeof c ? a == c : 'object' == typeof a && 'object' == typeof c ? d(a, c, f, g) : a === c;
        },
        clone: function (d, e) {
            var f = {}, h = c(d, e, f);
            return a.each(f, function (a) {
                if (a = a.input, a[g])
                    try {
                        delete a[g];
                    } catch (c) {
                        a[g] = b;
                    }
            }), f = null, h;
        },
        now: Date.now || function () {
            return +new Date();
        }
    });
}(KISSY), function (a, b) {
    var c = /^[\s\xa0]+|[\s\xa0]+$/g, d = String.prototype.trim, e = /\\?\{([^{}]+)\}/g, f = '';
    a.mix(a, {
        trim: d ? function (a) {
            return null == a ? f : d.call(a);
        } : function (a) {
            return null == a ? f : (a + '').replace(c, f);
        },
        substitute: function (a, c, d) {
            return 'string' == typeof a && c ? a.replace(d || e, function (a, d) {
                return '\\' === a.charAt(0) ? a.slice(1) : c[d] === b ? f : c[d];
            }) : a;
        },
        ucfirst: function (a) {
            return a += '', a.charAt(0).toUpperCase() + a.substring(1);
        },
        startsWith: function (a, b) {
            return 0 === a.lastIndexOf(b, 0);
        },
        endsWith: function (a, b) {
            var c = a.length - b.length;
            return c >= 0 && a.indexOf(b, c) == c;
        }
    });
}(KISSY), function (a, b) {
    function c(a, b) {
        return f.hasOwnProperty.call(a, b);
    }
    var d = {}, e = !1, f = Object.prototype, g = f.toString;
    a.mix(a, {
        isBoolean: 0,
        isNumber: 0,
        isString: 0,
        isFunction: 0,
        isArray: 0,
        isDate: 0,
        isRegExp: 0,
        isObject: 0,
        type: function (a) {
            return null == a ? String(a) : d[g.call(a)] || 'object';
        },
        isNull: function (a) {
            return null === a;
        },
        isUndefined: function (a) {
            return a === b;
        },
        isEmptyObject: function (a) {
            for (var c in a)
                if (c !== b)
                    return e;
            return !0;
        },
        isPlainObject: function (d) {
            if (!d || 'object' !== a.type(d) || d.nodeType || d.window == d)
                return e;
            var f, g;
            try {
                if ((g = d.constructor) && !c(d, 'constructor') && !c(g.prototype, 'isPrototypeOf'))
                    return e;
            } catch (h) {
                return e;
            }
            for (f in d);
            return f === b || c(d, f);
        }
    }), a.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function (b, c) {
        d['[object ' + b + ']'] = c = b.toLowerCase(), a['is' + b] = function (b) {
            return a.type(b) == c;
        };
    });
}(KISSY), function (a, b) {
    function c(d, f, h) {
        if (d instanceof g)
            return h || a.error('no rejected callback!'), h(d[k]);
        var i = d[k], j = d[l];
        if (j)
            j.push([
                f,
                h
            ]);
        else {
            if (!e(i))
                return f && f(i);
            c(i, f, h);
        }
        return b;
    }
    function d(a) {
        var b = this;
        return b instanceof d ? (b.promise = a || new f(), void 0) : new d(a);
    }
    function e(a) {
        return a && a instanceof f;
    }
    function f(a) {
        var c = this;
        c[k] = a, a === b && (c[l] = []);
    }
    function g(b) {
        if (b instanceof g)
            return b;
        var c = this;
        return f.apply(c, arguments), c[k] instanceof f && a.error('assert.not(this.__promise_value instanceof promise) in Reject constructor'), c;
    }
    function h(b, e, h) {
        function i(b) {
            try {
                return e ? e(b) : b;
            } catch (c) {
                return a.log(c.stack || c, 'error'), new g(c);
            }
        }
        function j(b) {
            try {
                return h ? h(b) : new g(b);
            } catch (c) {
                return a.log(c.stack || c, 'error'), new g(c);
            }
        }
        function k(b) {
            return m ? (a.error('already done at fulfilled'), void 0) : (b instanceof f && a.error('assert.not(value instanceof Promise) in when'), m = 1, l.resolve(i(b)), void 0);
        }
        var l = new d(), m = 0;
        return b instanceof f ? c(b, k, function (b) {
            return m ? (a.error('already done at rejected'), void 0) : (m = 1, l.resolve(j(b)), void 0);
        }) : k(b), l.promise;
    }
    function i(a) {
        return !j(a) && e(a) && a[l] === b && (!e(a[k]) || i(a[k]));
    }
    function j(a) {
        return e(a) && a[l] === b && a[k] instanceof g;
    }
    var k = '__promise_value', l = '__promise_pendings';
    d.prototype = {
        constructor: d,
        resolve: function (d) {
            var e, f = this.promise;
            return (e = f[l]) ? (f[k] = d, e = [].concat(e), f[l] = b, a.each(e, function (a) {
                c(f, a[0], a[1]);
            }), d) : null;
        },
        reject: function (a) {
            return this.resolve(new g(a));
        }
    }, f.prototype = {
        constructor: f,
        then: function (a, b) {
            return h(this, a, b);
        },
        fail: function (a) {
            return h(this, 0, a);
        },
        fin: function (a) {
            return h(this, function (b) {
                return a(b, !0);
            }, function (b) {
                return a(b, !1);
            });
        },
        done: function (a, b) {
            var c = this, d = function (a) {
                    setTimeout(function () {
                        throw a;
                    }, 0);
                }, e = a || b ? c.then(a, b) : c;
            e.fail(d);
        },
        isResolved: function () {
            return i(this);
        },
        isRejected: function () {
            return j(this);
        }
    }, a.extend(g, f), KISSY.Defer = d, KISSY.Promise = f, f.Defer = d, a.mix(f, {
        when: h,
        isPromise: e,
        isResolved: i,
        isRejected: j,
        all: function (a) {
            var b = a.length;
            if (!b)
                return null;
            for (var c = d(), e = 0; e < a.length; e++)
                !function (d, e) {
                    h(d, function (d) {
                        a[e] = d, 0 === --b && c.resolve(a);
                    }, function (a) {
                        c.reject(a);
                    });
                }(a[e], e);
            return c.promise;
        }
    });
}(KISSY), function (a) {
    function b(a, b) {
        for (var c, d = 0, e = a.length - 1, f = []; e >= 0; e--)
            c = a[e], '.' == c || ('..' === c ? d++ : d ? d-- : f[f.length] = c);
        if (b)
            for (; d--; d)
                f[f.length] = '..';
        return f = f.reverse();
    }
    var c = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/, d = {
            resolve: function () {
                var c, d, e, f = '', g = arguments, h = 0;
                for (d = g.length - 1; d >= 0 && !h; d--)
                    e = g[d], 'string' == typeof e && e && (f = e + '/' + f, h = '/' == e.charAt(0));
                return c = b(a.filter(f.split('/'), function (a) {
                    return !!a;
                }), !h).join('/'), (h ? '/' : '') + c || '.';
            },
            normalize: function (c) {
                var d = '/' == c.charAt(0), e = '/' == c.slice(-1);
                return c = b(a.filter(c.split('/'), function (a) {
                    return !!a;
                }), !d).join('/'), c || d || (c = '.'), c && e && (c += '/'), (d ? '/' : '') + c;
            },
            join: function () {
                var b = a.makeArray(arguments);
                return d.normalize(a.filter(b, function (a) {
                    return a && 'string' == typeof a;
                }).join('/'));
            },
            relative: function (b, c) {
                b = d.normalize(b), c = d.normalize(c);
                var e, f, g = a.filter(b.split('/'), function (a) {
                        return !!a;
                    }), h = [], i = a.filter(c.split('/'), function (a) {
                        return !!a;
                    }), j = Math.min(g.length, i.length);
                for (e = 0; j > e && g[e] == i[e]; e++);
                for (f = e; e < g.length;)
                    h.push('..'), e++;
                return h = h.concat(i.slice(f)), h = h.join('/');
            },
            basename: function (a, b) {
                var d, e = a.match(c) || [];
                return d = e[3] || '', b && d && d.slice(-1 * b.length) == b && (d = d.slice(0, -1 * b.length)), d;
            },
            dirname: function (a) {
                var b = a.match(c) || [], d = b[1] || '', e = b[2] || '';
                return d || e ? (e && (e = e.substring(0, e.length - 1)), d + e) : '.';
            },
            extname: function (a) {
                return (a.match(c) || [])[4] || '';
            }
        };
    d && (a.Path = d);
}(KISSY), function (a, b) {
    function c(b) {
        b._queryMap || (b._queryMap = a.unparam(b._query));
    }
    function d(a) {
        this._query = a || '';
    }
    function e(a) {
        return 1 == a.length ? '0' + a : a;
    }
    function f(a, b) {
        return a.toLowerCase() == b.toLowerCase();
    }
    function g(a, b) {
        return encodeURI(a).replace(b, function (a) {
            return '%' + e(a.charCodeAt(0).toString(16));
        });
    }
    function h(b) {
        if (b instanceof h)
            return b.clone();
        var c, e = this;
        return a.mix(e, {
            scheme: '',
            userInfo: '',
            hostname: '',
            port: '',
            path: '',
            query: '',
            fragment: ''
        }), c = h.getComponents(b), a.each(c, function (b, c) {
            if (b = b || '', 'query' == c)
                e.query = new d(b);
            else {
                try {
                    b = a.urlDecode(b);
                } catch (f) {
                    a.log(f + 'urlDecode error : ' + b, 'error');
                }
                e[c] = b;
            }
        }), e;
    }
    var i = /[#\/\?@]/g, j = /[#\?]/g, k = /[#@]/g, l = /#/g, m = new RegExp('^(?:([\\w\\d+.-]+):)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$'), n = a.Path, o = {
            scheme: 1,
            userInfo: 2,
            hostname: 3,
            port: 4,
            path: 5,
            query: 6,
            fragment: 7
        };
    d.prototype = {
        constructor: d,
        clone: function () {
            return new d(this.toString());
        },
        reset: function (a) {
            var b = this;
            return b._query = a || '', b._queryMap = null, b;
        },
        count: function () {
            var b, d, e = this, f = 0;
            c(e), b = e._queryMap;
            for (d in b)
                a.isArray(b[d]) ? f += b[d].length : f++;
            return f;
        },
        has: function (b) {
            var d, e = this;
            return c(e), d = e._queryMap, b ? b in d : !a.isEmptyObject(d);
        },
        get: function (a) {
            var b, d = this;
            return c(d), b = d._queryMap, a ? b[a] : b;
        },
        keys: function () {
            var b = this;
            return c(b), a.keys(b._queryMap);
        },
        set: function (b, e) {
            var f, g = this;
            return c(g), f = g._queryMap, 'string' == typeof b ? g._queryMap[b] = e : (b instanceof d && (b = b.get()), a.each(b, function (a, b) {
                f[b] = a;
            })), g;
        },
        remove: function (a) {
            var b = this;
            return c(b), a ? delete b._queryMap[a] : b._queryMap = {}, b;
        },
        add: function (e, f) {
            var g, h, i = this;
            return a.isObject(e) ? (e instanceof d && (e = e.get()), a.each(e, function (a, b) {
                i.add(b, a);
            })) : (c(i), g = i._queryMap, h = g[e], h = h === b ? f : [].concat(h).concat(f), g[e] = h), i;
        },
        toString: function (d) {
            var e = this;
            return c(e), a.param(e._queryMap, b, b, d);
        }
    }, h.prototype = {
        constructor: h,
        clone: function () {
            var b = new h(), c = this;
            return a.each(o, function (a, d) {
                b[d] = c[d];
            }), b.query = b.query.clone(), b;
        },
        resolve: function (b) {
            'string' == typeof b && (b = new h(b));
            var c, d = this, e = 0, f = [
                    'scheme',
                    'userInfo',
                    'hostname',
                    'port',
                    'path',
                    'query',
                    'fragment'
                ], g = d.clone();
            return a.each(f, function (d) {
                if ('path' == d)
                    if (e)
                        g[d] = b[d];
                    else {
                        var f = b.path;
                        f && (e = 1, a.startsWith(f, '/') || (g.hostname && !g.path ? f = '/' + f : g.path && (c = g.path.lastIndexOf('/'), -1 != c && (f = g.path.slice(0, c + 1) + f))), g.path = n.normalize(f));
                    }
                else
                    'query' == d ? (e || b.query.toString()) && (g.query = b.query.clone(), e = 1) : (e || b[d]) && (g[d] = b[d], e = 1);
            }), g;
        },
        getScheme: function () {
            return this.scheme;
        },
        setScheme: function (a) {
            return this.scheme = a, this;
        },
        getHostname: function () {
            return this.hostname;
        },
        setHostname: function (a) {
            return this.hostname = a, this;
        },
        setUserInfo: function (a) {
            return this.userInfo = a, this;
        },
        getUserInfo: function () {
            return this.userInfo;
        },
        setPort: function (a) {
            return this.port = a, this;
        },
        getPort: function () {
            return this.port;
        },
        setPath: function (a) {
            return this.path = a, this;
        },
        getPath: function () {
            return this.path;
        },
        setQuery: function (b) {
            return 'string' == typeof b && (a.startsWith(b, '?') && (b = b.slice(1)), b = new d(g(b, k))), this.query = b, this;
        },
        getQuery: function () {
            return this.query;
        },
        getFragment: function () {
            return this.fragment;
        },
        setFragment: function (b) {
            var c = this;
            return a.startsWith(b, '#') && (b = b.slice(1)), c.fragment = b, c;
        },
        isSameOriginAs: function (a) {
            var b = this;
            return f(b.hostname, a.hostname) && f(b.scheme, a.scheme) && f(b.port, a.port);
        },
        toString: function (b) {
            var c, d, e, f, h, k, m, o = [], p = this;
            return (c = p.scheme) && (o.push(g(c, i)), o.push(':')), (d = p.hostname) && (o.push('//'), (m = p.userInfo) && (o.push(g(m, i)), o.push('@')), o.push(encodeURIComponent(d)), (f = p.port) && (o.push(':'), o.push(f))), (e = p.path) && (d && !a.startsWith(e, '/') && (e = '/' + e), e = n.normalize(e), o.push(g(e, j))), (k = p.query.toString.call(p.query, b)) && (o.push('?'), o.push(k)), (h = p.fragment) && (o.push('#'), o.push(g(h, l))), o.join('');
        }
    }, h.Query = d, h.getComponents = function (b) {
        b = b || '';
        var c = b.match(m) || [], d = {};
        return a.each(o, function (a, b) {
            d[b] = c[a];
        }), d;
    }, a.Uri = h;
}(KISSY), function (a, b) {
    function c(a) {
        var b = 0;
        return parseFloat(a.replace(/\./g, function () {
            return 0 === b++ ? '.' : '';
        }));
    }
    function d(a, b) {
        var d, e;
        b[d = 'trident'] = 0.1, (e = a.match(/Trident\/([\d.]*)/)) && e[1] && (b[d] = c(e[1])), b.core = d;
    }
    function e(a) {
        var b, d;
        return (b = a.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) && (d = b[1] || b[2]) ? c(d) : 0;
    }
    function f(a) {
        var f, g, i, j, k, l = '', m = l, n = l, o = [
                6,
                9
            ], p = '{{version}}', q = '<!--[if IE ' + p + ']><s></s><![endif]-->', r = h && h.createElement('div'), s = [], t = {
                webkit: b,
                trident: b,
                gecko: b,
                presto: b,
                chrome: b,
                safari: b,
                firefox: b,
                ie: b,
                opera: b,
                mobile: b,
                core: b,
                shell: b,
                phantomjs: b,
                os: b,
                ipad: b,
                iphone: b,
                ipod: b,
                ios: b,
                android: b,
                nodejs: b
            };
        if (r && r.getElementsByTagName && (r.innerHTML = q.replace(p, ''), s = r.getElementsByTagName('s')), s.length > 0) {
            for (d(a, t), j = o[0], k = o[1]; k >= j; j++)
                if (r.innerHTML = q.replace(p, j), s.length > 0) {
                    t[n = 'ie'] = j;
                    break;
                }
            !t.ie && (i = e(a)) && (t[n = 'ie'] = i);
        } else
            (g = a.match(/AppleWebKit\/([\d.]*)/)) && g[1] ? (t[m = 'webkit'] = c(g[1]), (g = a.match(/OPR\/(\d+\.\d+)/)) && g[1] ? t[n = 'opera'] = c(g[1]) : (g = a.match(/Chrome\/([\d.]*)/)) && g[1] ? t[n = 'chrome'] = c(g[1]) : (g = a.match(/\/([\d.]*) Safari/)) && g[1] && (t[n = 'safari'] = c(g[1])), / Mobile\//.test(a) && a.match(/iPad|iPod|iPhone/) ? (t.mobile = 'apple', g = a.match(/OS ([^\s]*)/), g && g[1] && (t.ios = c(g[1].replace('_', '.'))), f = 'ios', g = a.match(/iPad|iPod|iPhone/), g && g[0] && (t[g[0].toLowerCase()] = t.ios)) : / Android/i.test(a) ? (/Mobile/.test(a) && (f = t.mobile = 'android'), g = a.match(/Android ([^\s]*);/), g && g[1] && (t.android = c(g[1]))) : (g = a.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) && (t.mobile = g[0].toLowerCase()), (g = a.match(/PhantomJS\/([^\s]*)/)) && g[1] && (t.phantomjs = c(g[1]))) : (g = a.match(/Presto\/([\d.]*)/)) && g[1] ? (t[m = 'presto'] = c(g[1]), (g = a.match(/Opera\/([\d.]*)/)) && g[1] && (t[n = 'opera'] = c(g[1]), (g = a.match(/Opera\/.* Version\/([\d.]*)/)) && g[1] && (t[n] = c(g[1])), (g = a.match(/Opera Mini[^;]*/)) && g ? t.mobile = g[0].toLowerCase() : (g = a.match(/Opera Mobi[^;]*/)) && g && (t.mobile = g[0]))) : (i = e(a)) ? (t[n = 'ie'] = i, d(a, t)) : (g = a.match(/Gecko/)) && (t[m = 'gecko'] = 0.1, (g = a.match(/rv:([\d.]*)/)) && g[1] && (t[m] = c(g[1]), /Mobile|Tablet/.test(a) && (t.mobile = 'firefox')), (g = a.match(/Firefox\/([\d.]*)/)) && g[1] && (t[n = 'firefox'] = c(g[1])));
        return f || (/windows|win32/i.test(a) ? f = 'windows' : /macintosh|mac_powerpc/i.test(a) ? f = 'macintosh' : /linux/i.test(a) ? f = 'linux' : /rhino/i.test(a) && (f = 'rhino')), t.os = f, t.core = t.core || m, t.shell = n, t;
    }
    var g = a.Env.host, h = g.document, i = g.navigator, j = i && i.userAgent || '', k = KISSY.UA = f(j);
    if ('object' == typeof process) {
        var l, m;
        (l = process.versions) && (m = l.node) && (k.os = process.platform, k.nodejs = c(m));
    }
    k.getDescriptorFromUserAgent = f;
    var n = [
            'webkit',
            'trident',
            'gecko',
            'presto',
            'chrome',
            'safari',
            'firefox',
            'ie',
            'opera'
        ], o = h && h.documentElement, p = '';
    o && (a.each(n, function (a) {
        var b = k[a];
        b && (p += ' ks-' + a + (parseInt(b) + ''), p += ' ks-' + a);
    }), a.trim(p) && (o.className = a.trim(o.className + p)));
}(KISSY), function (a) {
    var b = a.Env, c = b.host, d = a.UA, e = c.document || {}, f = 'ontouchstart' in e && !d.phantomjs, g = e.documentMode, h = g || d.ie, i = (b.nodejs && 'object' == typeof global ? global : c).JSON;
    g && 9 > g && (i = 0), a.Features = {
        isTouchSupported: function () {
            return f;
        },
        isDeviceMotionSupported: function () {
            return !!c.DeviceMotionEvent;
        },
        isHashChangeSupported: function () {
            return 'onhashchange' in c && (!h || h > 7);
        },
        isNativeJSONSupported: function () {
            return i;
        }
    };
}(KISSY), function (a) {
    var b = a.Loader = {};
    b.Status = {
        INIT: 0,
        LOADING: 1,
        LOADED: 2,
        ERROR: 3,
        ATTACHED: 4
    };
}(KISSY), function (a) {
    function b(a) {
        if ('string' == typeof a)
            return c(a);
        for (var b = [], d = 0, e = a.length; e > d; d++)
            b[d] = c(a[d]);
        return b;
    }
    function c(a) {
        return '/' == a.charAt(a.length - 1) && (a += 'index'), a;
    }
    function d(b, c, d) {
        var e, f, g = b.Env.mods;
        for (c = a.makeArray(c), f = 0; f < c.length; f++)
            if (e = g[c[f]], !e || e.status !== d)
                return 0;
        return 1;
    }
    var e = a.Loader, f = a.Path, g = a.Env.host, h = a.startsWith, i = e.Status, j = i.ATTACHED, k = i.LOADED, l = i.ERROR, m = e.Utils = {}, n = g.document;
    a.mix(m, {
        docHead: function () {
            return n.getElementsByTagName('head')[0] || n.documentElement;
        },
        normalDepModuleName: function (a, b) {
            var c, d = 0;
            if (!b)
                return b;
            if ('string' == typeof b)
                return h(b, '../') || h(b, './') ? f.resolve(f.dirname(a), b) : f.normalize(b);
            for (c = b.length; c > d; d++)
                b[d] = m.normalDepModuleName(a, b[d]);
            return b;
        },
        createModulesInfo: function (b, c) {
            a.each(c, function (a) {
                m.createModuleInfo(b, a);
            });
        },
        createModuleInfo: function (b, d, f) {
            d = c(d);
            var g = b.Env.mods, h = g[d];
            return h ? h : (g[d] = h = new e.Module(a.mix({
                name: d,
                runtime: b
            }, f)), h);
        },
        isAttached: function (a, b) {
            return d(a, b, j);
        },
        getModules: function (b, c) {
            var d, e, f, g, h = [b], i = b.Env.mods;
            return a.each(c, function (c) {
                d = i[c], d && 'css' == d.getType() || (e = m.unalias(b, c), f = a.reduce(e, function (a, b) {
                    return g = i[b], a && g && g.status == j;
                }, !0), f ? h.push(i[e[0]].value) : h.push(null));
            }), h;
        },
        attachModsRecursively: function (a, b, c, d) {
            c = c || [];
            var e, f = 1, g = a.length, h = c.length;
            for (e = 0; g > e; e++)
                f = m.attachModRecursively(a[e], b, c, d) && f, c.length = h;
            return f;
        },
        attachModRecursively: function (b, c, d, e) {
            var f, g = c.Env.mods, h = g[b];
            return h ? (f = h.status, f == j ? 1 : (f == l && e.push(h), f != k ? 0 : a.inArray(b, d) ? (d.push(b), a.error('find cyclic dependency between mods: ' + d), 0) : (d.push(b), m.attachModsRecursively(h.getNormalizedRequires(), c, d, e) ? (m.attachMod(c, h), 1) : 0))) : 0;
        },
        attachMod: function (a, b) {
            if (b.status == k) {
                var c = b.fn;
                b.value = 'function' == typeof c ? c.apply(b, m.getModules(a, b.getRequiresWithAlias())) : c, b.status = j;
            }
        },
        getModNamesAsArray: function (a) {
            return 'string' == typeof a && (a = a.replace(/\s+/g, '').split(',')), a;
        },
        normalizeModNames: function (a, b, c) {
            return m.unalias(a, m.normalizeModNamesWithAlias(a, b, c));
        },
        unalias: function (a, c) {
            for (var d, e, f, g, h = [].concat(c), i = 0, j = a.Env.mods; !i;)
                for (i = 1, d = h.length - 1; d >= 0; d--)
                    if ((e = j[h[d]]) && (f = e.alias)) {
                        for (i = 0, g = f.length - 1; g >= 0; g--)
                            f[g] || f.splice(g, 1);
                        h.splice.apply(h, [
                            d,
                            1
                        ].concat(b(f)));
                    }
            return h;
        },
        normalizeModNamesWithAlias: function (a, c, d) {
            var e, f, g = [];
            if (c)
                for (e = 0, f = c.length; f > e; e++)
                    c[e] && g.push(b(c[e]));
            return d && (g = m.normalDepModuleName(d, g)), g;
        },
        registerModule: function (b, d, e, f) {
            d = c(d);
            var g = b.Env.mods, h = g[d];
            return h && h.fn ? (a.log(d + ' is defined more than once'), void 0) : (m.createModuleInfo(b, d), h = g[d], a.mix(h, {
                name: d,
                status: k,
                fn: e
            }), a.mix(h, f), void 0);
        },
        getMappedPath: function (a, b, c) {
            var d, e, f, g = c || a.Config.mappedRules || [];
            for (d = 0; d < g.length; d++)
                if (f = g[d], e = b.match(f[0]))
                    return b.replace(f[0], f[1]);
            return b;
        }
    });
}(KISSY), function (a) {
    function b(a, b) {
        return b in a ? a[b] : a.runtime.Config[b];
    }
    function c(b) {
        a.mix(this, b);
    }
    function d(b) {
        this.status = g.Status.INIT, a.mix(this, b), this.callbacks = [];
    }
    function e(a) {
        var b = a.name, c = '.' + a.getType(), d = '-min';
        return b = h.join(h.dirname(b), h.basename(b, c)), a.getPackage().isDebug() && (d = ''), b + d + c;
    }
    function f(b, c) {
        var d, e = b.config('packages'), f = c + '/', g = '';
        for (d in e)
            a.startsWith(f, d + '/') && d.length > g.length && (g = d);
        return e[g] || k;
    }
    var g = a.Loader, h = a.Path, i = 'ignorePackageNameInUri', j = g.Utils;
    a.augment(c, {
        reset: function (b) {
            a.mix(this, b);
        },
        getTag: function () {
            return b(this, 'tag');
        },
        getName: function () {
            return this.name;
        },
        getBase: function () {
            return b(this, 'base');
        },
        getPrefixUriForCombo: function () {
            var a = this, b = a.getName();
            return a.getBase() + (b && !a.isIgnorePackageNameInUri() ? b + '/' : '');
        },
        getPackageUri: function () {
            var b = this;
            return b.packageUri ? b.packageUri : b.packageUri = new a.Uri(this.getPrefixUriForCombo());
        },
        getBaseUri: function () {
            return b(this, 'baseUri');
        },
        isDebug: function () {
            return b(this, 'debug');
        },
        isIgnorePackageNameInUri: function () {
            return b(this, i);
        },
        getCharset: function () {
            return b(this, 'charset');
        },
        isCombine: function () {
            return b(this, 'combine');
        },
        getGroup: function () {
            return b(this, 'group');
        }
    }), g.Package = c, a.augment(d, {
        addCallback: function (a) {
            this.callbacks.push(a);
        },
        notifyAll: function () {
            for (var a, b = this.callbacks.length, c = 0; b > c; c++) {
                a = this.callbacks[c];
                try {
                    a(this);
                } catch (d) {
                    setTimeout(function () {
                        throw d;
                    }, 0);
                }
            }
            this.callbacks = [];
        },
        setValue: function (a) {
            this.value = a;
        },
        getType: function () {
            var a = this, b = a.type;
            return b || (b = '.css' == h.extname(a.name).toLowerCase() ? 'css' : 'js', a.type = b), b;
        },
        getFullPath: function () {
            var a, b, c, d, e, f, g = this;
            return g.fullpath || (d = g.getPackage(), c = d.getBaseUri(), f = g.getPath(), d.isIgnorePackageNameInUri() && (e = d.getName()) && (f = h.relative(e, f)), b = c.resolve(f), (a = g.getTag()) && (a += '.' + g.getType(), b.query.set('t', a)), g.fullpath = j.getMappedPath(g.runtime, b.toString())), g.fullpath;
        },
        getPath: function () {
            var a = this;
            return a.path || (a.path = e(a));
        },
        getValue: function () {
            return this.value;
        },
        getName: function () {
            return this.name;
        },
        getPackage: function () {
            var a = this;
            return a.packageInfo || (a.packageInfo = f(a.runtime, a.name));
        },
        getTag: function () {
            var a = this;
            return a.tag || a.getPackage().getTag();
        },
        getCharset: function () {
            var a = this;
            return a.charset || a.getPackage().getCharset();
        },
        getRequiredMods: function () {
            var b = this, c = b.runtime;
            return a.map(b.getNormalizedRequires(), function (a) {
                return j.createModuleInfo(c, a);
            });
        },
        getRequiresWithAlias: function () {
            var a = this, b = a.requiresWithAlias, c = a.requires;
            return c && 0 != c.length ? (b || (a.requiresWithAlias = b = j.normalizeModNamesWithAlias(a.runtime, c, a.name)), b) : c || [];
        },
        getNormalizedRequires: function () {
            var a, b = this, c = b.normalizedRequiresStatus, d = b.status, e = b.requires;
            return e && 0 != e.length ? (a = b.normalizedRequires) && c == d ? a : (b.normalizedRequiresStatus = d, b.normalizedRequires = j.normalizeModNames(b.runtime, e, b.name)) : e || [];
        }
    }), g.Module = d;
    var k = new g.Package({
            name: '',
            runtime: a
        });
}(KISSY), function (a) {
    function b() {
        i || (g.debug('start css poll timer'), d());
    }
    function c(a, b) {
        var c = 0;
        if (f.webkit)
            a.sheet && (g.debug('webkit css poll loaded: ' + b), c = 1);
        else if (a.sheet)
            try {
                var d = a.sheet.cssRules;
                d && (g.debug('same domain css poll loaded: ' + b), c = 1);
            } catch (e) {
                var h = e.name;
                g.debug('css poll exception: ' + h + ' ' + e.code + ' ' + b), 'NS_ERROR_DOM_SECURITY_ERR' == h && (g.debug('css poll exception: ' + h + 'loaded : ' + b), c = 1);
            }
        return c;
    }
    function d() {
        for (var b in j) {
            var f = j[b], h = f.node;
            c(h, b) && (f.callback && f.callback.call(h), delete j[b]);
        }
        a.isEmptyObject(j) ? (g.debug('clear css poll timer'), i = 0) : i = setTimeout(d, e);
    }
    var e = 30, f = a.UA, g = {
            debug: function (b) {
                a.log(b, void 0, 's/loader/getScript');
            }
        }, h = a.Loader.Utils, i = 0, j = {};
    h.pollCss = function (a, c) {
        var d, e = a.href;
        d = j[e] = {}, d.node = a, d.callback = c, b();
    }, h.isCssLoaded = c;
}(KISSY), function (a) {
    var b, c = 1000, d = a.Env.host.document, e = a.Loader.Utils, f = a.Path, g = {}, h = a.UA;
    a.getScript = function (i, j, k) {
        function l() {
            var a = t.readyState;
            a && 'loaded' != a && 'complete' != a || (t.onreadystatechange = t.onload = null, v(0));
        }
        var m, n, o, p, q, r = j, s = 0;
        if (a.startsWith(f.extname(i).toLowerCase(), '.css') && (s = 1), a.isPlainObject(r) && (j = r.success, m = r.error, n = r.timeout, k = r.charset, o = r.attrs), p = g[i] = g[i] || [], p.push([
                j,
                m
            ]), p.length > 1)
            return p.node;
        var t = d.createElement(s ? 'link' : 'script'), u = function () {
                q && (q.cancel(), q = void 0);
            };
        o && a.each(o, function (a, b) {
            t.setAttribute(b, a);
        }), k && (t.charset = k), s ? (t.href = i, t.rel = 'stylesheet') : (t.src = i, t.async = !0), p.node = t;
        var v = function (b) {
                var c, d = b;
                u(), a.each(g[i], function (a) {
                    (c = a[d]) && c.call(t);
                }), delete g[i];
            }, w = 'onload' in t, x = a.Config.forceCssPoll || h.webkit && h.webkit < 536;
        return s && x && w && (w = !1), w ? (t.onload = l, t.onerror = function () {
            t.onerror = null, v(1);
        }) : s ? e.pollCss(t, function () {
            v(0);
        }) : t.onreadystatechange = l, n && (q = a.later(function () {
            v(1);
        }, n * c)), b || (b = e.docHead()), s ? b.appendChild(t) : b.insertBefore(t, b.firstChild), t;
    };
}(KISSY), function (a, b) {
    function c(b) {
        var c;
        return b = b.replace(/\\/g, '/'), '/' != b.charAt(b.length - 1) && (b += '/'), d ? c = d.resolve(b) : (a.startsWith(b, 'file:') || (b = 'file:' + b), c = new a.Uri(b)), c;
    }
    var d, e, f = a.Loader, g = f.Utils, h = a.Env.host, i = h.location, j = a.Config.fns;
    !a.UA.nodejs && i && (e = i.href) && (d = new a.Uri(e)), j.map = function (a) {
        var b = this.Config;
        return b.mappedRules = a === !1 ? [] : (b.mappedRules || []).concat(a || []);
    }, j.mapCombo = function (a) {
        var b = this.Config;
        return b.mappedComboRules = a === !1 ? [] : (b.mappedComboRules || []).concat(a || []);
    }, j.packages = function (d) {
        var e, g = this.Config, h = g.packages = g.packages || {};
        return d ? (a.each(d, function (b, d) {
            e = b.name || d;
            var g = c(b.base || b.path);
            b.name = e, b.base = g.toString(), b.baseUri = g, b.runtime = a, delete b.path, h[e] ? h[e].reset(b) : h[e] = new f.Package(b);
        }), b) : d === !1 ? (g.packages = {}, b) : h;
    }, j.modules = function (b) {
        var c = this, d = c.Env;
        b && a.each(b, function (b, e) {
            g.createModuleInfo(c, e, b), a.mix(d.mods[e], b);
        });
    }, j.base = function (a) {
        var d, e = this, f = e.Config;
        return a ? (d = c(a), f.base = d.toString(), f.baseUri = d, b) : f.base;
    };
}(KISSY), function (a, b) {
    function c(b, c) {
        a.mix(this, {
            runtime: b,
            requireLoadedMods: {},
            waitingModules: c
        });
    }
    function d() {
        var b, c, d, e, f = a.Env.host.document.getElementsByTagName('script');
        for (c = f.length - 1; c >= 0; c--)
            if (e = f[c], 'interactive' == e.readyState) {
                b = e;
                break;
            }
        return d = b ? b.getAttribute('data-mod-name') : i;
    }
    var e, f, g, h, i, j, k, l, m, n = b, o = 0;
    e = a.Loader, f = e.Status, g = e.Utils, h = a.UA, j = f.LOADING, k = f.LOADED, l = f.ERROR, m = f.ATTACHED, a.augment(c, {
        use: function (a) {
            var b, c = a.length;
            for (b = 0; c > b; b++)
                this.loadModule(a[b]);
        },
        loadModRequires: function (a) {
            var b, c = this, d = c.requireLoadedMods, e = a.name;
            d[e] || (d[e] = 1, b = a.getNormalizedRequires(), c.use(b));
        },
        loadModule: function (a) {
            var b, c, d = this, e = d.waitingModules, f = d.runtime, h = g.createModuleInfo(f, a);
            if (b = h.status, b != m && b != l)
                if (b === k)
                    d.loadModRequires(h);
                else {
                    if (c = e.contains(a))
                        return;
                    h.addCallback(function () {
                        d.loadModRequires(h), e.remove(a), e.notifyAll();
                    }), e.add(a), j > b && d.fetchModule(h);
                }
        },
        fetchModule: function (c) {
            function d() {
                if (c.fn) {
                    var b = 'load remote module: "' + m + '" from: "' + q + '"';
                    a.log(b, 'info');
                } else
                    e();
                c.notifyAll();
            }
            function e() {
                var b = m + ' is not loaded! can not find module in path : ' + q;
                a.log(b, 'error'), c.status = l;
            }
            var f = this, k = f.runtime, m = c.getName(), p = c.getCharset(), q = c.getFullPath(), r = h.ie, s = 'css' == c.getType();
            c.status = j, r && !s && (i = m, o = Number(+new Date())), a.getScript(q, {
                attrs: r ? { 'data-mod-name': m } : b,
                success: function () {
                    s ? g.registerModule(k, m, a.noop) : n && (g.registerModule(k, m, n.fn, n.config), n = b), a.later(d);
                },
                error: d,
                charset: p
            });
        }
    }), c.add = function (a, b, c, e) {
        'function' == typeof a && (c = b, b = a, h.ie ? (a = d(), g.registerModule(e, a, b, c), i = null, o = 0) : n = {
            fn: b,
            config: c
        });
    }, e.SimpleLoader = c;
}(KISSY), function (a) {
    function b(b, c, d) {
        function e() {
            --f || c(h, g);
        }
        var f = b && b.length, g = [], h = [];
        a.each(b, function (b) {
            a.getScript(b.fullpath, {
                success: function () {
                    h.push(b), e();
                },
                error: function () {
                    g.push(b), e();
                },
                charset: d
            });
        });
    }
    function c(b, c) {
        a.mix(this, {
            runtime: b,
            waitingModules: c
        });
    }
    function d(b) {
        a.each(b, function (b) {
            var c = [];
            a.each(b.mods, function (a) {
                a.status == k && c.push(a.name);
            }), c.length && a.log('load remote modules: "' + c.join(', ') + '" from: "' + b.fullpath + '"');
        });
    }
    function e(a, b) {
        a = a.split(/\//), b = b.split(/\//);
        for (var c = Math.min(a.length, b.length), d = 0; c > d && a[d] === b[d]; d++);
        return a.slice(0, d).join('/') + '/';
    }
    function f(a) {
        var b, c = 5381;
        for (b = a.length; --b > -1;)
            c = (c << 5) + c + a.charCodeAt(b);
        return c + '';
    }
    var g = a.Loader, h = g.Status, i = g.Utils, j = h.LOADING, k = h.LOADED, l = h.ERROR, m = a.now(), n = h.ATTACHED;
    c.groupTag = m, a.augment(c, {
        use: function (c) {
            var e, f, g = this, h = g.runtime;
            e = a.keys(g.calculate(c)), i.createModulesInfo(h, e), f = g.getComboUrls(e), a.each(f.css, function (c) {
                b(c, function (b, c) {
                    d(b), a.each(b, function (b) {
                        a.each(b.mods, function (b) {
                            i.registerModule(h, b.getName(), a.noop), b.notifyAll();
                        });
                    }), a.each(c, function (b) {
                        a.each(b.mods, function (c) {
                            var d = c.name + ' is not loaded! can not find module in path : ' + b.fullpath;
                            a.log(d, 'error'), c.status = l, c.notifyAll();
                        });
                    });
                }, c.charset);
            }), a.each(f.js, function (c) {
                b(c, function (b) {
                    d(b), a.each(c, function (b) {
                        a.each(b.mods, function (c) {
                            if (!c.fn) {
                                var d = c.name + ' is not loaded! can not find module in path : ' + b.fullpath;
                                a.log(d, 'error'), c.status = l;
                            }
                            c.notifyAll();
                        });
                    });
                }, c.charset);
            });
        },
        calculate: function (a, b, c) {
            var d, e, f, g, h = this, m = h.waitingModules, o = h.runtime;
            for (c = c || {}, b = b || {}, d = 0; d < a.length; d++)
                e = a[d], b[e] || (b[e] = 1, f = i.createModuleInfo(o, e), g = f.status, g !== l && (g != k && g != n && (m.contains(e) || (g != j && (f.status = j, c[e] = 1), f.addCallback(function (a) {
                    m.remove(a.getName()), m.notifyAll();
                }), m.add(e))), h.calculate(f.getNormalizedRequires(), b, c)));
            return c;
        },
        getComboMods: function (b, c) {
            for (var d, f, g, h, j, k, l, n, o, p, q, r, s, t = {}, u = this.runtime, v = 0, w = b.length; w > v; ++v) {
                f = b[v], g = i.createModuleInfo(u, f), j = g.getType(), s = g.getFullPath(), h = g.getPackage(), q = h.getName(), o = h.getCharset(), n = h.getTag(), r = h.getGroup(), p = h.getPrefixUriForCombo(), d = h.getPackageUri();
                var x = q;
                if ((g.canBeCombined = h.isCombine() && a.startsWith(s, p)) && r) {
                    x = r + '_' + o + '_' + m;
                    var y;
                    (y = c[x]) ? y.isSameOriginAs(d) ? y.setPath(e(y.getPath(), d.getPath())) : (x = q, c[q] = d) : c[x] = d.clone();
                } else
                    c[q] = d;
                k = t[j] = t[j] || {}, (l = k[x]) ? 1 == l.tags.length && l.tags[0] == n || l.tags.push(n) : (l = k[x] = [], l.charset = o, l.tags = [n]), l.push(g);
            }
            return t;
        },
        getComboUrls: function (a) {
            function b() {
                z.push({
                    fullpath: i.getMappedPath(c, y + p.join(g) + u, d.mappedComboRules),
                    mods: q
                });
            }
            var c = this.runtime, d = c.Config, e = d.comboPrefix, g = d.comboSep, h = d.comboMaxFileNum, j = d.comboMaxUrlLength, k = {}, l = this.getComboMods(a, k), m = {};
            for (var n in l) {
                m[n] = {};
                for (var o in l[n]) {
                    var p = [], q = [], r = l[n][o], s = r.tags, t = s.length > 1 ? f(s.join('')) : s[0], u = t ? '?t=' + encodeURIComponent(t) + '.' + n : '', v = u.length, w = k[o].toString(), x = w.length, y = w + e, z = m[n][o] = [], A = y.length;
                    z.charset = r.charset, z.mods = [];
                    for (var B = 0; B < r.length; B++) {
                        var C = r[B];
                        z.mods.push(C);
                        var D = C.getFullPath();
                        if (C.canBeCombined) {
                            var E = D.slice(x).replace(/\?.*$/, '');
                            p.push(E), q.push(C), (p.length > h || A + p.join(g).length + v > j) && (p.pop(), q.pop(), b(), p = [], q = [], B--);
                        } else
                            z.push({
                                fullpath: D,
                                mods: [C]
                            });
                    }
                    p.length && b();
                }
            }
            return m;
        }
    }), g.ComboLoader = c;
}(KISSY), function (a, b) {
    function c(b) {
        a.mix(this, {
            fn: b,
            waitMods: {}
        });
    }
    function d(a) {
        return new Function('return ' + a)();
    }
    function e(c) {
        var e = c.src || '';
        if (!e.match(m))
            return 0;
        var f = c.getAttribute('data-config');
        f = f ? d(f) : {};
        var g, h, i = f.comboPrefix = f.comboPrefix || '??', j = f.comboSep = f.comboSep || ',', k = e.indexOf(i);
        return -1 == k ? h = e.replace(l, '$1') : (h = e.substring(0, k), '/' != h.charAt(h.length - 1) && (h += '/'), g = e.substring(k + i.length).split(j), a.each(g, function (a) {
            return a.match(m) ? (h += a.replace(l, '$1'), !1) : b;
        })), a.mix({ base: h }, f);
    }
    function f() {
        var b, c, d = h.host.document.getElementsByTagName('script');
        for (b = d.length - 1; b >= 0; b--)
            if (c = e(d[b]))
                return c;
        return a.error('must load kissy by file name: seed.js or seed-min.js'), null;
    }
    var g = KISSY.Loader, h = a.Env, i = g.Utils, j = g.SimpleLoader, k = g.ComboLoader;
    c.prototype = {
        constructor: c,
        notifyAll: function () {
            var b = this, c = b.fn;
            c && a.isEmptyObject(b.waitMods) && (b.fn = null, c());
        },
        add: function (a) {
            this.waitMods[a] = 1;
        },
        remove: function (a) {
            delete this.waitMods[a];
        },
        contains: function (a) {
            return this.waitMods[a];
        }
    }, g.WaitingModules = c, a.mix(a, {
        add: function (b, c, d) {
            'string' == typeof b ? i.registerModule(a, b, c, d) : j.add(b, c, d, a);
        },
        use: function (d, e) {
            function f() {
                var c, j = [];
                c = i.attachModsRecursively(g, a, b, j), c ? e && (m ? e.apply(a, i.getModules(a, d)) : setTimeout(function () {
                    e.apply(a, i.getModules(a, d));
                }, 0)) : j.length ? l && (m ? l.apply(a, j) : setTimeout(function () {
                    l.apply(a, j);
                }, 0)) : (o.fn = f, h.use(g));
            }
            var g, h, l, m, n = a.Config, o = new c(f);
            return a.isPlainObject(e) && (m = e.sync, l = e.error, e = e.success), d = i.getModNamesAsArray(d), d = i.normalizeModNamesWithAlias(a, d), g = i.unalias(a, d), h = n.combine && !a.UA.nodejs ? new k(a, o) : new j(a, o), m ? o.notifyAll() : setTimeout(function () {
                o.notifyAll();
            }, 0), a;
        },
        require: function (b) {
            return i.getModules(a, i.normalizeModNamesWithAlias(a, [b]))[1];
        }
    });
    var l = /^(.*)(seed|kissy)(?:-min)?\.js[^/]*/i, m = /(seed|kissy)(?:-min)?\.js/i;
    a.UA.nodejs ? a.config({
        charset: 'utf-8',
        base: __dirname.replace(/\\/g, '/').replace(/\/$/, '') + '/'
    }) : a.config(a.mix({
        comboMaxUrlLength: 2000,
        comboMaxFileNum: 40,
        charset: 'utf-8',
        tag: '20131125184002'
    }, f())), h.mods = {};
}(KISSY), function (a, b) {
    function c() {
        g && !f.nodejs && w(e, t, c), k.resolve(a);
    }
    function d() {
        if (!g || g.readyState === u)
            return c(), void 0;
        if (v(e, t, c), q) {
            var a = function () {
                w(g, r, a), c();
            };
            v(g, r, a);
        } else {
            var b = function () {
                g.readyState === u && (w(g, s, b), c());
            };
            v(g, s, b);
            var d, f = h && h.doScroll;
            try {
                d = null === e.frameElement;
            } catch (i) {
                d = !1;
            }
            if (f && d) {
                var j = function () {
                    try {
                        f('left'), c();
                    } catch (a) {
                        setTimeout(j, n);
                    }
                };
                j();
            }
        }
    }
    var e = a.Env.host, f = a.UA, g = e.document, h = g && g.documentElement, i = e.location, j = '', k = new a.Defer(), l = k.promise, m = 500, n = 40, o = /^#?([\w-]+)$/, p = /\S/, q = !(!g || !g.addEventListener), r = 'DOMContentLoaded', s = 'readystatechange', t = 'load', u = 'complete', v = q ? function (a, b, c) {
            a.addEventListener(b, c, !1);
        } : function (a, b, c) {
            a.attachEvent('on' + b, c);
        }, w = q ? function (a, b, c) {
            a.removeEventListener(b, c, !1);
        } : function (a, b, c) {
            a.detachEvent('on' + b, c);
        };
    if (a.mix(a, {
            isWindow: function (a) {
                return null != a && a == a.window;
            },
            parseXML: function (c) {
                if (c.documentElement)
                    return c;
                var d;
                try {
                    e.DOMParser ? d = new DOMParser().parseFromString(c, 'text/xml') : (d = new ActiveXObject('Microsoft.XMLDOM'), d.async = !1, d.loadXML(c));
                } catch (f) {
                    a.log('parseXML error : '), a.log(f), d = b;
                }
                return d && d.documentElement && !d.getElementsByTagName('parsererror').length || a.error('Invalid XML: ' + c), d;
            },
            globalEval: function (a) {
                a && p.test(a) && (e.execScript || function (a) {
                    e.eval.call(e, a);
                })(a);
            },
            ready: function (a) {
                return l.done(a), this;
            },
            available: function (b, c) {
                b = (b + j).match(o)[1];
                var d, e = 1, f = a.later(function () {
                        ((d = g.getElementById(b)) || ++e > m) && f.cancel();
                    }, n, !0);
            }
        }), i && -1 !== (i.search || j).indexOf('ks-debug') && (a.Config.debug = !0), d(), f.ie)
        try {
            g.execCommand('BackgroundImageCache', !1, !0);
        } catch (x) {
        }
}(KISSY, void 0), function (a) {
    if (a.config({
            modules: {
                core: {
                    alias: [
                        'dom',
                        'event',
                        'ajax',
                        'anim',
                        'base',
                        'node',
                        'json',
                        'ua',
                        'cookie'
                    ]
                }
            }
        }), 'undefined' != typeof location) {
        var b = a.startsWith(location.href, 'https'), c = b ? 'https://s.tbcdn.cn/s/kissy/' : 'http://a.tbcdn.cn/s/kissy/';
        a.config({
            packages: {
                gallery: { base: c },
                mobile: { base: c }
            }
        });
    }
}(KISSY), function (a, b, c) {
    a({
        ajax: {
            requires: [
                'dom',
                'json',
                'event'
            ]
        }
    }), a({
        anim: {
            requires: [
                'dom',
                'event'
            ]
        }
    }), a({ base: { requires: ['event/custom'] } }), a({
        button: {
            requires: [
                'component/base',
                'event'
            ]
        }
    }), a({
        calendar: {
            requires: [
                'node',
                'event'
            ]
        }
    }), a({ color: { requires: ['base'] } }), a({
        combobox: {
            requires: [
                'dom',
                'component/base',
                'node',
                'menu',
                'ajax'
            ]
        }
    }), a({
        'component/base': {
            requires: [
                'rich-base',
                'node',
                'event'
            ]
        }
    }), a({
        'component/extension': {
            requires: [
                'dom',
                'node'
            ]
        }
    }), a({
        'component/plugin/drag': {
            requires: [
                'rich-base',
                'dd/base'
            ]
        }
    }), a({ 'component/plugin/resize': { requires: ['resizable'] } }), a({
        datalazyload: {
            requires: [
                'dom',
                'event',
                'base'
            ]
        }
    }), a({
        dd: {
            alias: [
                'dd/base',
                'dd/droppable'
            ]
        }
    }), a({
        'dd/base': {
            requires: [
                'dom',
                'node',
                'event',
                'rich-base',
                'base'
            ]
        }
    }), a({
        'dd/droppable': {
            requires: [
                'dd/base',
                'dom',
                'node',
                'rich-base'
            ]
        }
    }), a({
        'dd/plugin/constrain': {
            requires: [
                'base',
                'node'
            ]
        }
    }), a({
        'dd/plugin/proxy': {
            requires: [
                'node',
                'base',
                'dd/base'
            ]
        }
    }), a({
        'dd/plugin/scroll': {
            requires: [
                'dd/base',
                'base',
                'node',
                'dom'
            ]
        }
    });
    var d = c.ie && (c.ie < 9 || document.documentMode < 9);
    a({
        dom: {
            alias: [
                'dom/base',
                d ? 'dom/ie' : ''
            ]
        }
    }), a({ 'dom/ie': { requires: ['dom/base'] } }), a({
        editor: {
            requires: [
                'node',
                'htmlparser',
                'component/base',
                'core'
            ]
        }
    }), a({
        event: {
            alias: [
                'event/base',
                'event/dom',
                'event/custom'
            ]
        }
    }), a({ 'event/custom': { requires: ['event/base'] } }), a({
        'event/dom': {
            alias: [
                'event/dom/base',
                b.isTouchSupported() ? 'event/dom/touch' : '',
                b.isDeviceMotionSupported() ? 'event/dom/shake' : '',
                b.isHashChangeSupported() ? '' : 'event/dom/hashchange',
                c.ie < 9 ? 'event/dom/ie' : '',
                c.ie ? '' : 'event/dom/focusin'
            ]
        }
    }), a({
        'event/dom/base': {
            requires: [
                'dom',
                'event/base'
            ]
        }
    }), a({ 'event/dom/focusin': { requires: ['event/dom/base'] } }), a({
        'event/dom/hashchange': {
            requires: [
                'event/dom/base',
                'dom'
            ]
        }
    }), a({
        'event/dom/ie': {
            requires: [
                'event/dom/base',
                'dom'
            ]
        }
    }), a({ 'event/dom/shake': { requires: ['event/dom/base'] } }), a({
        'event/dom/touch': {
            requires: [
                'event/dom/base',
                'dom'
            ]
        }
    }), a({
        imagezoom: {
            requires: [
                'node',
                'overlay'
            ]
        }
    }), a({ json: { requires: [KISSY.Features.isNativeJSONSupported() ? '' : 'json/json2'] } }), a({ kison: { requires: ['base'] } }), a({
        menu: {
            requires: [
                'component/extension',
                'node',
                'component/base',
                'event'
            ]
        }
    }), a({
        menubutton: {
            requires: [
                'node',
                'menu',
                'button',
                'component/base'
            ]
        }
    }), a({
        mvc: {
            requires: [
                'event',
                'base',
                'ajax',
                'json',
                'node'
            ]
        }
    }), a({
        node: {
            requires: [
                'dom',
                'event/dom',
                'anim'
            ]
        }
    }), a({
        overlay: {
            requires: [
                'node',
                'component/base',
                'component/extension',
                'event'
            ]
        }
    }), a({
        resizable: {
            requires: [
                'node',
                'rich-base',
                'dd/base'
            ]
        }
    }), a({ 'rich-base': { requires: ['base'] } }), a({ separator: { requires: ['component/base'] } }), a({
        'split-button': {
            requires: [
                'component/base',
                'button',
                'menubutton'
            ]
        }
    }), a({ stylesheet: { requires: ['dom'] } }), a({
        swf: {
            requires: [
                'dom',
                'json',
                'base'
            ]
        }
    }), a({
        switchable: {
            requires: [
                'dom',
                'event',
                'anim',
                KISSY.Features.isTouchSupported() ? 'dd/base' : ''
            ]
        }
    }), a({
        tabs: {
            requires: [
                'button',
                'toolbar',
                'component/base'
            ]
        }
    }), a({
        toolbar: {
            requires: [
                'component/base',
                'node'
            ]
        }
    }), a({
        tree: {
            requires: [
                'node',
                'component/base',
                'event'
            ]
        }
    }), a({
        waterfall: {
            requires: [
                'node',
                'base'
            ]
        }
    }), a({ xtemplate: { alias: ['xtemplate/facade'] } }), a({ 'xtemplate/compiler': { requires: ['xtemplate/runtime'] } }), a({
        'xtemplate/facade': {
            requires: [
                'xtemplate/runtime',
                'xtemplate/compiler'
            ]
        }
    });
}(function (a) {
    KISSY.config('modules', a);
}, KISSY.Features, KISSY.UA), function (a) {
    !function (a) {
        a.add('empty', a.noop), a.add('promise', function () {
            return a.Promise;
        }), a.add('ua', function () {
            return a.UA;
        }), a.add('uri', function () {
            return a.Uri;
        }), a.add('path', function () {
            return a.Path;
        });
    }(KISSY), a.UA.nodejs && (a.KISSY = a, module.exports = a);
}(KISSY), KISSY.add('dom/base/api', function (a) {
    var b = a.Env.host, c = a.UA, d = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, e = {
            ELEMENT_NODE: 1,
            ATTRIBUTE_NODE: 2,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            ENTITY_REFERENCE_NODE: 5,
            ENTITY_NODE: 6,
            PROCESSING_INSTRUCTION_NODE: 7,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9,
            DOCUMENT_TYPE_NODE: 10,
            DOCUMENT_FRAGMENT_NODE: 11,
            NOTATION_NODE: 12
        }, f = {
            isCustomDomain: function (a) {
                a = a || b;
                var c = a.document.domain, d = a.location.hostname;
                return c != d && c != '[' + d + ']';
            },
            getEmptyIframeSrc: function (a) {
                return a = a || b, c.ie && f.isCustomDomain(a) ? 'javascript:void(function(){' + encodeURIComponent('document.open();document.domain=\'' + a.document.domain + '\';document.close();') + '}())' : '';
            },
            NodeType: e,
            getWindow: function (a) {
                return a ? 'scrollTo' in a && a.document ? a : a.nodeType == e.DOCUMENT_NODE ? a.defaultView || a.parentWindow : !1 : b;
            },
            _isNodeList: function (a) {
                return a && !a.nodeType && a.item && !a.setTimeout;
            },
            nodeName: function (a) {
                var b = f.get(a), d = b.nodeName.toLowerCase();
                if (c.ie) {
                    var e = b.scopeName;
                    e && 'HTML' != e && (d = e.toLowerCase() + ':' + d);
                }
                return d;
            },
            _RE_NUM_NO_PX: new RegExp('^(' + d + ')(?!px)[a-z%]+$', 'i')
        };
    return a.mix(f, e), f;
}), KISSY.add('dom/base/attr', function (a, b, c) {
    function d(a, b) {
        b = s[b] || b;
        var c = u[b];
        return c && c.get ? c.get(a, b) : a[b];
    }
    var e = a.Env.host.document, f = b.NodeType, g = e && e.documentElement, h = g && g.textContent === c ? 'innerText' : 'textContent', i = '', j = b.nodeName, k = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, l = /^(?:button|input|object|select|textarea)$/i, m = /^a(?:rea)?$/i, n = /:|^on/, o = /\r/g, p = {}, q = {
            val: 1,
            css: 1,
            html: 1,
            text: 1,
            data: 1,
            width: 1,
            height: 1,
            offset: 1,
            scrollTop: 1,
            scrollLeft: 1
        }, r = {
            tabindex: {
                get: function (a) {
                    var b = a.getAttributeNode('tabindex');
                    return b && b.specified ? parseInt(b.value, 10) : l.test(a.nodeName) || m.test(a.nodeName) && a.href ? 0 : c;
                }
            }
        }, s = {
            hidefocus: 'hideFocus',
            tabindex: 'tabIndex',
            readonly: 'readOnly',
            'for': 'htmlFor',
            'class': 'className',
            maxlength: 'maxLength',
            cellspacing: 'cellSpacing',
            cellpadding: 'cellPadding',
            rowspan: 'rowSpan',
            colspan: 'colSpan',
            usemap: 'useMap',
            frameborder: 'frameBorder',
            contenteditable: 'contentEditable'
        }, t = {
            get: function (a, d) {
                return b.prop(a, d) ? d.toLowerCase() : c;
            },
            set: function (a, c, d) {
                var e;
                return c === !1 ? b.removeAttr(a, d) : (e = s[d] || d, e in a && (a[e] = !0), a.setAttribute(d, d.toLowerCase())), d;
            }
        }, u = {}, v = {}, w = {
            select: {
                get: function (a) {
                    var c, d, e, f = a.selectedIndex, g = a.options, h = 'select-one' === a.type;
                    if (0 > f)
                        return null;
                    if (h)
                        return b.val(g[f]);
                    for (c = [], d = 0, e = g.length; e > d; ++d)
                        g[d].selected && c.push(b.val(g[d]));
                    return c;
                },
                set: function (c, d) {
                    var e = a.makeArray(d), f = c.options;
                    return a.each(f, function (c) {
                        c.selected = a.inArray(b.val(c), e);
                    }), e.length || (c.selectedIndex = -1), e;
                }
            }
        };
    return a.each([
        'radio',
        'checkbox'
    ], function (c) {
        w[c] = {
            get: function (a) {
                return null === a.getAttribute('value') ? 'on' : a.value;
            },
            set: function (c, d) {
                return a.isArray(d) ? c.checked = a.inArray(b.val(c), d) : void 0;
            }
        };
    }), r.style = {
        get: function (a) {
            return a.style.cssText;
        }
    }, a.mix(b, {
        _valHooks: w,
        _propFix: s,
        _attrHooks: r,
        _propHooks: u,
        _attrNodeHook: v,
        _attrFix: p,
        prop: function (e, f, g) {
            var h, i, j, k = b.query(e);
            if (a.isPlainObject(f))
                return a.each(f, function (a, c) {
                    b.prop(k, c, a);
                }), c;
            if (f = s[f] || f, j = u[f], g !== c)
                for (h = k.length - 1; h >= 0; h--)
                    i = k[h], j && j.set ? j.set(i, g, f) : i[f] = g;
            else if (k.length)
                return d(k[0], f);
            return c;
        },
        hasProp: function (a, e) {
            var f, g, h = b.query(a), i = h.length;
            for (f = 0; i > f; f++)
                if (g = h[f], d(g, e) !== c)
                    return !0;
            return !1;
        },
        removeProp: function (a, d) {
            d = s[d] || d;
            var e, f, g = b.query(a);
            for (e = g.length - 1; e >= 0; e--) {
                f = g[e];
                try {
                    f[d] = c, delete f[d];
                } catch (h) {
                }
            }
        },
        attr: function (d, e, g, h) {
            var l, m, o, s = b.query(d), u = s[0];
            if (a.isPlainObject(e)) {
                h = g;
                for (var w in e)
                    b.attr(s, w, e[w], h);
                return c;
            }
            if (!(e = a.trim(e)))
                return c;
            if (h && q[e])
                return b[e](d, g);
            if (e = e.toLowerCase(), h && q[e])
                return b[e](d, g);
            if (e = p[e] || e, l = k.test(e) ? t : n.test(e) ? v : r[e], g === c) {
                if (u && u.nodeType === f.ELEMENT_NODE)
                    return 'form' == j(u) && (l = v), l && l.get ? l.get(u, e) : (o = u.getAttribute(e), null === o ? c : o);
            } else
                for (m = s.length - 1; m >= 0; m--)
                    u = s[m], u && u.nodeType === f.ELEMENT_NODE && ('form' == j(u) && (l = v), l && l.set ? l.set(u, g, e) : u.setAttribute(e, i + g));
            return c;
        },
        removeAttr: function (a, c) {
            c = c.toLowerCase(), c = p[c] || c;
            var d, e, g, h = b.query(a);
            for (g = h.length - 1; g >= 0; g--)
                e = h[g], e.nodeType == f.ELEMENT_NODE && (e.removeAttribute(c), k.test(c) && (d = s[c] || c) in e && (e[d] = !1));
        },
        hasAttr: g && !g.hasAttribute ? function (a, c) {
            c = c.toLowerCase();
            var d, e, f, g = b.query(a);
            for (d = 0; d < g.length; d++)
                if (e = g[d], f = e.getAttributeNode(c), f && f.specified)
                    return !0;
            return !1;
        } : function (a, c) {
            var d, e = b.query(a), f = e.length;
            for (d = 0; f > d; d++)
                if (e[d].hasAttribute(c))
                    return !0;
            return !1;
        },
        val: function (d, e) {
            var f, g, h, i, k, l;
            if (e === c)
                return h = b.get(d), h ? (f = w[j(h)] || w[h.type], f && 'get' in f && (g = f.get(h, 'value')) !== c ? g : (g = h.value, 'string' == typeof g ? g.replace(o, '') : null == g ? '' : g)) : c;
            for (i = b.query(d), k = i.length - 1; k >= 0; k--) {
                if (h = i[k], 1 !== h.nodeType)
                    return c;
                l = e, null == l ? l = '' : 'number' == typeof l ? l += '' : a.isArray(l) && (l = a.map(l, function (a) {
                    return null == a ? '' : a + '';
                })), f = w[j(h)] || w[h.type], f && 'set' in f && f.set(h, l, 'value') !== c || (h.value = l);
            }
            return c;
        },
        text: function (a, d) {
            var e, g, j;
            if (d === c)
                return e = b.get(a), e.nodeType == f.ELEMENT_NODE ? e[h] || i : e.nodeType == f.TEXT_NODE ? e.nodeValue : c;
            for (g = b.query(a), j = g.length - 1; j >= 0; j--)
                e = g[j], e.nodeType == f.ELEMENT_NODE ? e[h] = d : e.nodeType == f.TEXT_NODE && (e.nodeValue = d);
            return c;
        }
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base', function (a, b) {
    return a.mix(a, {
        DOM: b,
        get: b.get,
        query: b.query
    }), b;
}, {
    requires: [
        './base/api',
        './base/attr',
        './base/class',
        './base/create',
        './base/data',
        './base/insertion',
        './base/offset',
        './base/style',
        './base/selector',
        './base/traversal'
    ]
}), KISSY.add('dom/base/class', function (a, b, c) {
    function d(a) {
        return (f + a + f).replace(i, f);
    }
    function e(d, e, f, i) {
        if (!(e = a.trim(e)))
            return i ? !1 : c;
        var j, k, l, m, n = b.query(d), o = n.length, p = e.split(h), q = [];
        for (m = 0; m < p.length; m++)
            l = a.trim(p[m]), l && q.push(l);
        for (m = 0; o > m; m++)
            if (j = n[m], j.nodeType == g.ELEMENT_NODE && (k = f(j, q, q.length), k !== c))
                return k;
        return i ? !1 : c;
    }
    var f = ' ', g = b.NodeType, h = /[\.\s]\s*\.?/, i = /[\n\t]/g;
    return a.mix(b, {
        hasClass: function (a, b) {
            return e(a, b, function (a, b, c) {
                var e, g, h, i = a.className;
                if (i) {
                    for (e = d(i), g = 0, h = !0; c > g; g++)
                        if (e.indexOf(f + b[g] + f) < 0) {
                            h = !1;
                            break;
                        }
                    if (h)
                        return !0;
                }
            }, !0);
        },
        addClass: function (b, g) {
            e(b, g, function (b, c, e) {
                var h, i, j, k = b.className;
                if (k) {
                    for (h = d(k), i = k, j = 0; e > j; j++)
                        h.indexOf(f + c[j] + f) < 0 && (i += f + c[j]);
                    b.className = a.trim(i);
                } else
                    b.className = g;
            }, c);
        },
        removeClass: function (b, g) {
            e(b, g, function (b, c, e) {
                var g, h, i, j = b.className;
                if (j)
                    if (e) {
                        for (g = d(j), h = 0; e > h; h++)
                            for (i = f + c[h] + f; g.indexOf(i) >= 0;)
                                g = g.replace(i, f);
                        b.className = a.trim(g);
                    } else
                        b.className = '';
            }, c);
        },
        replaceClass: function (a, c, d) {
            b.removeClass(a, c), b.addClass(a, d);
        },
        toggleClass: function (d, f, g) {
            var h, i, j = a.isBoolean(g);
            e(d, f, function (a, c, d) {
                for (i = 0; d > i; i++)
                    f = c[i], h = j ? !g : b.hasClass(a, f), b[h ? 'removeClass' : 'addClass'](a, f);
            }, c);
        }
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base/create', function (a, b, c) {
    function d(a, b) {
        return a.getElementsByTagName(b);
    }
    function e(c) {
        var d = a.require('event/dom');
        d && d.detach(c), b.removeData(c);
    }
    function f(a, b) {
        var c = b && b != k ? b.createElement(o) : q;
        return c.innerHTML = 'm<div>' + a + '</div>', c.lastChild;
    }
    function g(a, b, c) {
        var e = b.nodeType;
        if (e == l.DOCUMENT_FRAGMENT_NODE)
            for (var f = b.childNodes, h = c.childNodes, i = 0; f[i];)
                h[i] && g(a, f[i], h[i]), i++;
        else if (e == l.ELEMENT_NODE)
            for (var j = d(b, '*'), k = d(c, '*'), m = 0; j[m];)
                k[m] && a(j[m], k[m]), m++;
    }
    function h(c, d) {
        var e, f, g = a.require('event/dom');
        if (d.nodeType != l.ELEMENT_NODE || b.hasData(c)) {
            e = b.data(c);
            for (f in e)
                b.data(d, f, e[f]);
            g && (g._DOMUtils.removeData(d), g._clone(c, d));
        }
    }
    function i(c, d) {
        return a.isPlainObject(d) && (c.nodeType == l.ELEMENT_NODE ? b.attr(c, d, !0) : c.nodeType == l.DOCUMENT_FRAGMENT_NODE && b.attr(c.childNodes, d, !0)), c;
    }
    function j(b) {
        var c, d, e, f = null;
        if (b && (b.push || b.item) && b[0])
            for (d = b[0].ownerDocument, f = d.createDocumentFragment(), b = a.makeArray(b), c = 0, e = b.length; e > c; c++)
                f.appendChild(b[c]);
        else
            a.log('Unable to convert ' + b + ' to fragment.');
        return f;
    }
    var k = a.Env.host.document, l = b.NodeType, m = a.UA, n = m.ie, o = 'div', p = 'parentNode', q = k && k.createElement(o), r = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, s = /<([\w:]+)/, t = /^\s+/, u = n && 9 > n, v = /<|&#?\w+;/, w = k && 'outerHTML' in k.documentElement, x = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    a.mix(b, {
        create: function (d, e, g, h) {
            var l = null;
            if (!d)
                return l;
            if (d.nodeType)
                return b.clone(d);
            if ('string' != typeof d)
                return l;
            h === c && (h = !0), h && (d = a.trim(d));
            var m, n, q, w, y, z = b._creators, A = g || k, B = o;
            return v.test(d) ? (q = x.exec(d)) ? l = A.createElement(q[1]) : (d = d.replace(r, '<$1></$2>'), (q = s.exec(d)) && (w = q[1]) && (B = w.toLowerCase()), m = (z[B] || f)(d, A), u && (n = d.match(t)) && m.insertBefore(A.createTextNode(n[0]), m.firstChild), y = m.childNodes, 1 === y.length ? l = y[0][p].removeChild(y[0]) : y.length ? l = j(y) : a.error(d + ' : create node error')) : l = A.createTextNode(d), i(l, e);
        },
        _fixCloneAttributes: null,
        _creators: { div: f },
        _defaultCreator: f,
        html: function (a, f, g, h) {
            var i, j, k, m = b.query(a), n = m[0], o = !1;
            if (n) {
                if (f === c)
                    return n.nodeType == l.ELEMENT_NODE ? n.innerHTML : null;
                if (f += '', !(f.match(/<(?:script|style|link)/i) || u && f.match(t) || B[(f.match(s) || [
                        '',
                        ''
                    ])[1].toLowerCase()]))
                    try {
                        for (j = m.length - 1; j >= 0; j--)
                            k = m[j], k.nodeType == l.ELEMENT_NODE && (e(d(k, '*')), k.innerHTML = f);
                        o = !0;
                    } catch (p) {
                    }
                o || (i = b.create(f, 0, n.ownerDocument, 0), b.empty(m), b.append(i, m, g)), h && h();
            }
        },
        outerHTML: function (a, f, g) {
            var h, i, j, m, n = b.query(a), p = n.length, r = n[0];
            if (r) {
                if (f === c)
                    return w ? r.outerHTML : (m = r.ownerDocument, h = m && m != k ? m.createElement(o) : q, h.innerHTML = '', h.appendChild(b.clone(r, !0)), h.innerHTML);
                if (f += '', !f.match(/<(?:script|style|link)/i) && w)
                    for (i = p - 1; i >= 0; i--)
                        r = n[i], r.nodeType == l.ELEMENT_NODE && (e(r), e(d(r, '*')), r.outerHTML = f);
                else
                    j = b.create(f, 0, r.ownerDocument, 0), b.insertBefore(j, n, g), b.remove(n);
            }
        },
        remove: function (a, c) {
            var f, g, h, i, j = b.query(a);
            for (i = j.length - 1; i >= 0; i--)
                f = j[i], c || f.nodeType != l.ELEMENT_NODE || (h = d(f, '*'), e(h), e(f)), (g = f.parentNode) && g.removeChild(f);
        },
        clone: function (a, c, d, e) {
            'object' == typeof c && (e = c.deepWithDataAndEvent, d = c.withDataAndEvent, c = c.deep);
            var f, i, j = b.get(a), k = b._fixCloneAttributes;
            return j ? (i = j.nodeType, f = j.cloneNode(c), (i == l.ELEMENT_NODE || i == l.DOCUMENT_FRAGMENT_NODE) && (k && i == l.ELEMENT_NODE && k(j, f), c && k && g(k, j, f)), d && (h(j, f), c && e && g(h, j, f)), f) : null;
        },
        empty: function (a) {
            var c, d, e = b.query(a);
            for (d = e.length - 1; d >= 0; d--)
                c = e[d], b.remove(c.childNodes);
        },
        _nodeListToFragment: j
    });
    var y, z = b._creators, A = b.create, B = {
            option: 'select',
            optgroup: 'select',
            area: 'map',
            thead: 'table',
            td: 'tr',
            th: 'tr',
            tr: 'tbody',
            tbody: 'table',
            tfoot: 'table',
            caption: 'table',
            colgroup: 'table',
            col: 'colgroup',
            legend: 'fieldset'
        };
    for (y in B)
        !function (a) {
            z[y] = function (b, c) {
                return A('<' + a + '>' + b + '</' + a + '>', null, c);
            };
        }(B[y]);
    return b;
}, { requires: ['./api'] }), KISSY.add('dom/base/data', function (a, b, c) {
    var d = a.Env.host, e = '__ks_data_' + a.now(), f = {}, g = {}, h = {};
    h.applet = 1, h.object = 1, h.embed = 1;
    var i = {
            hasData: function (b, d) {
                if (b)
                    if (d !== c) {
                        if (d in b)
                            return !0;
                    } else if (!a.isEmptyObject(b))
                        return !0;
                return !1;
            }
        }, j = {
            hasData: function (a, b) {
                if (a == d)
                    return j.hasData(g, b);
                var c = a[e];
                return i.hasData(c, b);
            },
            data: function (a, b, f) {
                if (a == d)
                    return j.data(g, b, f);
                var h = a[e];
                return f === c ? b !== c ? h && h[b] : h = a[e] = a[e] || {} : (h = a[e] = a[e] || {}, h[b] = f, void 0);
            },
            removeData: function (b, f) {
                if (b == d)
                    return j.removeData(g, f);
                var h = b[e];
                if (f !== c)
                    delete h[f], a.isEmptyObject(h) && j.removeData(b);
                else
                    try {
                        delete b[e];
                    } catch (i) {
                        b[e] = c;
                    }
            }
        }, k = {
            hasData: function (a, b) {
                var c = a[e];
                if (!c)
                    return !1;
                var d = f[c];
                return i.hasData(d, b);
            },
            data: function (b, d, g) {
                if (h[b.nodeName.toLowerCase()])
                    return c;
                var i, j = b[e];
                if (!j) {
                    if (d !== c && g === c)
                        return c;
                    j = b[e] = a.guid();
                }
                return i = f[j], g === c ? d !== c ? i && i[d] : i = f[j] = f[j] || {} : (i = f[j] = f[j] || {}, i[d] = g, void 0);
            },
            removeData: function (b, d) {
                var g, h = b[e];
                if (h)
                    if (g = f[h], d !== c)
                        delete g[d], a.isEmptyObject(g) && k.removeData(b);
                    else {
                        delete f[h];
                        try {
                            delete b[e];
                        } catch (i) {
                            b[e] = c;
                        }
                        b.removeAttribute && b.removeAttribute(e);
                    }
            }
        };
    return a.mix(b, {
        __EXPANDO: e,
        hasData: function (a, c) {
            for (var d = !1, e = b.query(a), f = 0; f < e.length; f++) {
                var g = e[f];
                if (d = g.nodeType ? k.hasData(g, c) : j.hasData(g, c))
                    return d;
            }
            return d;
        },
        data: function (d, e, f) {
            var g = b.query(d), h = g[0];
            if (a.isPlainObject(e)) {
                for (var i in e)
                    b.data(g, i, e[i]);
                return c;
            }
            if (f === c) {
                if (h)
                    return h.nodeType ? k.data(h, e) : j.data(h, e);
            } else
                for (var l = g.length - 1; l >= 0; l--)
                    h = g[l], h.nodeType ? k.data(h, e, f) : j.data(h, e, f);
            return c;
        },
        removeData: function (a, c) {
            var d, e, f = b.query(a);
            for (e = f.length - 1; e >= 0; e--)
                d = f[e], d.nodeType ? k.removeData(d, c) : j.removeData(d, c);
        }
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base/insertion', function (a, b) {
    function c(a) {
        return !a.type || n.test(a.type);
    }
    function d(a, b) {
        var e, f, g, m = [];
        for (e = 0; a[e]; e++)
            if (f = a[e], g = j(f), f.nodeType == h.DOCUMENT_FRAGMENT_NODE)
                m.push.apply(m, d(k(f.childNodes), b));
            else if ('script' === g && c(f))
                f.parentNode && f.parentNode.removeChild(f), b && b.push(f);
            else {
                if (f.nodeType == h.ELEMENT_NODE && !i.test(g)) {
                    var n, o, p = [], q = f.getElementsByTagName('script');
                    for (o = 0; o < q.length; o++)
                        n = q[o], c(n) && p.push(n);
                    l.apply(a, [
                        e + 1,
                        0
                    ].concat(p));
                }
                m.push(f);
            }
        return m;
    }
    function e(b) {
        if (b.src)
            a.getScript(b.src);
        else {
            var c = a.trim(b.text || b.textContent || b.innerHTML || '');
            c && a.globalEval(c);
        }
    }
    function f(c, f, g, h) {
        c = b.query(c), h && (h = []), c = d(c, h), b._fixInsertionChecked && b._fixInsertionChecked(c), f = b.query(f);
        var i, j, k, l, m, n = c.length, o = f.length;
        if ((n || h && h.length) && o)
            for (i = b._nodeListToFragment(c), o > 1 && (m = b.clone(i, !0), f = a.makeArray(f)), j = 0; o > j; j++)
                k = f[j], i && (l = j > 0 ? b.clone(m, !0) : i, g(l, k)), h && h.length && a.each(h, e);
    }
    var g = 'parentNode', h = b.NodeType, i = /^(?:button|input|object|select|textarea)$/i, j = b.nodeName, k = a.makeArray, l = [].splice, m = 'nextSibling', n = /\/(java|ecma)script/i;
    return a.mix(b, {
        _fixInsertionChecked: null,
        insertBefore: function (a, b, c) {
            f(a, b, function (a, b) {
                b[g] && b[g].insertBefore(a, b);
            }, c);
        },
        insertAfter: function (a, b, c) {
            f(a, b, function (a, b) {
                b[g] && b[g].insertBefore(a, b[m]);
            }, c);
        },
        appendTo: function (a, b, c) {
            f(a, b, function (a, b) {
                b.appendChild(a);
            }, c);
        },
        prependTo: function (a, b, c) {
            f(a, b, function (a, b) {
                b.insertBefore(a, b.firstChild);
            }, c);
        },
        wrapAll: function (a, c) {
            c = b.clone(b.get(c), !0), a = b.query(a), a[0].parentNode && b.insertBefore(c, a[0]);
            for (var d; (d = c.firstChild) && 1 == d.nodeType;)
                c = d;
            b.appendTo(a, c);
        },
        wrap: function (c, d) {
            c = b.query(c), d = b.get(d), a.each(c, function (a) {
                b.wrapAll(a, d);
            });
        },
        wrapInner: function (c, d) {
            c = b.query(c), d = b.get(d), a.each(c, function (a) {
                var c = a.childNodes;
                c.length ? b.wrapAll(c, d) : a.appendChild(d);
            });
        },
        unwrap: function (c) {
            c = b.query(c), a.each(c, function (a) {
                var c = a.parentNode;
                b.replaceWith(c, c.childNodes);
            });
        },
        replaceWith: function (a, c) {
            var d = b.query(a);
            c = b.query(c), b.remove(c, !0), b.insertBefore(c, d), b.remove(d);
        }
    }), a.each({
        prepend: 'prependTo',
        append: 'appendTo',
        before: 'insertBefore',
        after: 'insertAfter'
    }, function (a, c) {
        b[c] = b[a];
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base/offset', function (a, b, c) {
    function d(a) {
        var b, c, d, e = a.ownerDocument, f = e.body;
        return a.getBoundingClientRect ? (b = a.getBoundingClientRect(), c = b[z], d = b[A], c -= k.clientLeft || f.clientLeft || 0, d -= k.clientTop || f.clientTop || 0, {
            left: c,
            top: d
        }) : {
            left: 0,
            top: 0
        };
    }
    function e(a) {
        var c = d(a), e = l(a[v]);
        return c.left += b[C](e), c.top += b[D](e), c;
    }
    function f(a, b) {
        var c, f = {
                left: 0,
                top: 0
            }, g = l(a[v]), h = a;
        b = b || g;
        do
            c = g == b ? e(h) : d(h), f.left += c.left, f.top += c.top;
        while (g && g != b && (h = g.frameElement) && (g = g.parent));
        return f;
    }
    function g(a, c) {
        'static' === b.css(a, q) && (a.style[q] = r);
        var d, e, g = f(a), h = {};
        for (e in c)
            d = p(b.css(a, e)) || 0, h[e] = p(d + c[e] - g[e]);
        b.css(a, h);
    }
    var h = a.Env.host, i = h.document, j = b.NodeType, k = i && i.documentElement, l = b.getWindow, m = 'CSS1Compat', n = 'compatMode', o = Math.max, p = parseFloat, q = 'position', r = 'relative', s = 'document', t = 'body', u = 'documentElement', v = 'ownerDocument', w = 'viewport', x = 'scroll', y = 'client', z = 'left', A = 'top', B = a.isNumber, C = x + 'Left', D = x + 'Top';
    return a.mix(b, {
        offset: function (a, d, e) {
            if (d === c) {
                var h, i = b.get(a);
                return i && (h = f(i, e)), h;
            }
            var j, k = b.query(a);
            for (j = k.length - 1; j >= 0; j--)
                i = k[j], g(i, d);
            return c;
        },
        scrollIntoView: function (d, e, f, g) {
            var h, i;
            if (h = b.get(d)) {
                e && (e = b.get(e)), e || (e = h.ownerDocument), e.nodeType == j.DOCUMENT_NODE && (e = l(e)), a.isPlainObject(f) && (g = f.allowHorizontalScroll, i = f.onlyScrollIfNeeded, f = f.alignWithTop), g = g === c ? !0 : g;
                var k, m, n, o, q, r, s, t, u, v, w = !!l(e), x = b.offset(h), y = b.outerHeight(h), B = b.outerWidth(h);
                w ? (s = e, v = b.height(s), u = b.width(s), t = {
                    left: b.scrollLeft(s),
                    top: b.scrollTop(s)
                }, q = {
                    left: x[z] - t[z],
                    top: x[A] - t[A]
                }, r = {
                    left: x[z] + B - (t[z] + u),
                    top: x[A] + y - (t[A] + v)
                }, o = t) : (k = b.offset(e), m = e.clientHeight, n = e.clientWidth, o = {
                    left: b.scrollLeft(e),
                    top: b.scrollTop(e)
                }, q = {
                    left: x[z] - (k[z] + (p(b.css(e, 'borderLeftWidth')) || 0)),
                    top: x[A] - (k[A] + (p(b.css(e, 'borderTopWidth')) || 0))
                }, r = {
                    left: x[z] + B - (k[z] + n + (p(b.css(e, 'borderRightWidth')) || 0)),
                    top: x[A] + y - (k[A] + m + (p(b.css(e, 'borderBottomWidth')) || 0))
                }), i ? (q.top < 0 || r.top > 0) && (f === !0 ? b.scrollTop(e, o.top + q.top) : f === !1 ? b.scrollTop(e, o.top + r.top) : q.top < 0 ? b.scrollTop(e, o.top + q.top) : b.scrollTop(e, o.top + r.top)) : (f = f === c ? !0 : !!f, f ? b.scrollTop(e, o.top + q.top) : b.scrollTop(e, o.top + r.top)), g && (i ? (q.left < 0 || r.left > 0) && (f === !0 ? b.scrollLeft(e, o.left + q.left) : f === !1 ? b.scrollLeft(e, o.left + r.left) : q.left < 0 ? b.scrollLeft(e, o.left + q.left) : b.scrollLeft(e, o.left + r.left)) : (f = f === c ? !0 : !!f, f ? b.scrollLeft(e, o.left + q.left) : b.scrollLeft(e, o.left + r.left)));
            }
        },
        docWidth: 0,
        docHeight: 0,
        viewportHeight: 0,
        viewportWidth: 0,
        scrollTop: 0,
        scrollLeft: 0
    }), a.each([
        'Left',
        'Top'
    ], function (a, d) {
        var e = x + a;
        b[e] = function (f, g) {
            if (B(f))
                return arguments.callee(h, f);
            f = b.get(f);
            var i, k, m, n, o = l(f);
            return o ? g !== c ? (g = parseFloat(g), k = 'Left' == a ? g : b.scrollLeft(o), m = 'Top' == a ? g : b.scrollTop(o), o.scrollTo(k, m)) : (i = o['page' + (d ? 'Y' : 'X') + 'Offset'], B(i) || (n = o[s], i = n[u][e], B(i) || (i = n[t][e]))) : f.nodeType == j.ELEMENT_NODE && (g !== c ? f[e] = parseFloat(g) : i = f[e]), i;
        };
    }), a.each([
        'Width',
        'Height'
    ], function (a) {
        b['doc' + a] = function (c) {
            c = b.get(c);
            var d = l(c), e = d[s];
            return o(e[u][x + a], e[t][x + a], b[w + a](e));
        }, b[w + a] = function (c) {
            c = b.get(c);
            var d = y + a, e = l(c), f = e[s], g = f[t], h = f[u], i = h[d];
            return f[n] === m && i || g && g[d] || i;
        };
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base/selector', function (a, b, c) {
    function d(a) {
        var b, c, d = this;
        for (c = 0; c < d.length && (b = d[c], a(b, c) !== !1); c++);
    }
    function e(g, h) {
        var j, k, l, m = 'string' == typeof g, n = h === c && (l = 1) ? [p] : e(h);
        if (g ? m ? (g = A(g), l && 'body' == g ? j = [p.body] : 1 == n.length && g && (j = i(g, n[0]))) : l && (j = g.nodeType || g.setTimeout ? [g] : g.getDOMNodes ? g.getDOMNodes() : t(g) ? g : v(g) ? a.makeArray(g) : [g]) : j = [], !j && (j = [], g)) {
            for (k = 0; k < n.length; k++)
                x.apply(j, f(g, n[k]));
            j.length > 1 && (n.length > 1 || m && g.indexOf(z) > -1) && b.unique(j);
        }
        return j.each = d, j;
    }
    function f(a, b) {
        var c = [], d = 'string' == typeof a;
        return c = d && a.match(C) || !d ? j(a, b) : d && a.replace(/"(?:(?:\\.)|[^"])*"/g, '').replace(/'(?:(?:\\.)|[^'])*'/g, '').indexOf(z) > -1 ? h(a, b) : g(a, b);
    }
    function g(a, b) {
        var c = [], d = s('sizzle');
        return d ? d(a, b, c) : l(a), c;
    }
    function h(a, b) {
        var c, d = [], e = a.split(/\s*,\s*/);
        for (c = 0; c < e.length; c++)
            x.apply(d, f(e[c], b));
        return d;
    }
    function i(a, c) {
        var d, e, f, g, h, i;
        return B.test(a) ? (e = m(a.slice(1), c), d = e ? [e] : []) : (f = C.exec(a), f && (g = f[1], h = f[2], i = f[3], c = g ? m(g, c) : c, c && (i ? g && -1 == a.indexOf(y) ? (e = m(g, c), n(e, i) && (d = [e])) : d = [].concat(b._getElementsByClassName(i, h, c)) : h && (d = u(b._getElementsByTagName(h, c)))), d = d || [])), d;
    }
    function j(a, b) {
        var c, d = 'string' == typeof a;
        return d ? c = i(a, b) || [] : t(a) || v(a) ? c = r(a, function (a) {
            return k(a, b);
        }) : k(a, b) && (c = [a]), c;
    }
    function k(a, c) {
        return a ? c == p ? !0 : b._contains(c, a) : !1;
    }
    function l(b) {
        a.error('Unsupported selector: ' + b);
    }
    function m(a, c) {
        var d = c.nodeType == q.DOCUMENT_NODE, e = d ? c : c.ownerDocument;
        return b._getElementById(a, c, e, d);
    }
    function n(a, b) {
        var c = a && a.className;
        return c && (y + c + y).indexOf(y + b + y) > -1;
    }
    function o(a, b) {
        var c = a && a.getAttributeNode(b);
        return c && c.nodeValue;
    }
    var p = a.Env.host.document, q = b.NodeType, r = a.filter, s = function (b) {
            return a.require(b);
        }, t = a.isArray, u = a.makeArray, v = b._isNodeList, w = b.nodeName, x = Array.prototype.push, y = ' ', z = ',', A = a.trim, B = /^#[\w-]+$/, C = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;
    return a.mix(b, {
        _getAttr: o,
        _hasSingleClass: n,
        _getElementById: function (a, c, d, e) {
            var f = d.getElementById(a), g = b._getAttr(f, 'id');
            return !f && !e && !b._contains(d, c) || f && g != a ? b.filter('*', '#' + a, c)[0] || null : e || f && b._contains(c, f) ? f : null;
        },
        _getElementsByTagName: function (a, b) {
            return b.getElementsByTagName(a);
        },
        _getElementsByClassName: function (a, b, c) {
            return u(c.querySelectorAll((b || '') + '.' + a));
        },
        _compareNodeOrder: function (a, b) {
            return a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
        },
        query: e,
        get: function (a, b) {
            return e(a, b)[0] || null;
        },
        unique: function () {
            function a(a, d) {
                return a == d ? (c = !0, 0) : b._compareNodeOrder(a, d);
            }
            var c, d = !0;
            return [
                0,
                0
            ].sort(function () {
                return d = !1, 0;
            }), function (b) {
                if (c = d, b.sort(a), c)
                    for (var e = 1, f = b.length; f > e;)
                        b[e] === b[e - 1] ? b.splice(e, 1) : e++;
                return b;
            };
        }(),
        filter: function (b, c, d) {
            var f, g, h, i, j = e(b, d), k = s('sizzle'), m = [];
            return 'string' == typeof c && (c = A(c)) && (f = C.exec(c)) && (h = f[1], g = f[2], i = f[3], h ? !h || g || i || (c = function (a) {
                return o(a, 'id') == h;
            }) : c = function (a) {
                var b = !0, c = !0;
                return g && (b = w(a) == g.toLowerCase()), i && (c = n(a, i)), c && b;
            }), a.isFunction(c) ? m = a.filter(j, c) : c && k ? m = k.matches(c, j) : l(c), m;
        },
        test: function (a, c, d) {
            var f = e(a, d);
            return f.length && b.filter(f, c, d).length === f.length;
        }
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base/style', function (a, b, c) {
    function d(a) {
        return a.replace(y, 'ms-').replace(z, A);
    }
    function e(a) {
        var c, d, e = G[a];
        return G[a] || (c = m.body || m.documentElement, d = m.createElement(a), b.prepend(d, c), e = b.css(d, 'display'), c.removeChild(d), G[a] = e), e;
    }
    function f(a, b, c) {
        var d, e = {};
        for (d in b)
            e[d] = a[n][d], a[n][d] = b[d];
        c.call(a);
        for (d in b)
            a[n][d] = e[d];
    }
    function g(b, e, f) {
        var g, h, i;
        if (3 === b.nodeType || 8 === b.nodeType || !(g = b[n]))
            return c;
        if (e = d(e), i = E[e], e = F[e] || e, f !== c) {
            if (null === f || f === C ? f = C : isNaN(Number(f)) || x[e] || (f += D), i && i.set && (f = i.set(b, f)), f !== c) {
                try {
                    g[e] = f;
                } catch (j) {
                    a.log('css set error :' + j);
                }
                f === C && g.removeAttribute && g.removeAttribute(e);
            }
            return g.cssText || (k.webkit && (g = b.outerHTML), b.removeAttribute('style')), c;
        }
        return i && 'get' in i && (h = i.get(b, !1)) !== c || (h = g[e]), h === c ? '' : h;
    }
    function h(a) {
        var b, d = arguments;
        return 0 !== a.offsetWidth ? b = i.apply(c, d) : f(a, H, function () {
            b = i.apply(c, d);
        }), b;
    }
    function i(c, d, e) {
        if (a.isWindow(c))
            return d == q ? b.viewportWidth(c) : b.viewportHeight(c);
        if (9 == c.nodeType)
            return d == q ? b.docWidth(c) : b.docHeight(c);
        var f = d === q ? [
                'Left',
                'Right'
            ] : [
                'Top',
                'Bottom'
            ], g = d === q ? c.offsetWidth : c.offsetHeight;
        return g > 0 ? ('border' !== e && a.each(f, function (a) {
            e || (g -= parseFloat(b.css(c, 'padding' + a)) || 0), 'margin' === e ? g += parseFloat(b.css(c, e + a)) || 0 : g -= parseFloat(b.css(c, 'border' + a + 'Width')) || 0;
        }), g) : (g = b._getComputedStyle(c, d), (null == g || Number(g) < 0) && (g = c.style[d] || 0), g = parseFloat(g) || 0, e && a.each(f, function (a) {
            g += parseFloat(b.css(c, 'padding' + a)) || 0, 'padding' !== e && (g += parseFloat(b.css(c, 'border' + a + 'Width')) || 0), 'margin' === e && (g += parseFloat(b.css(c, e + a)) || 0);
        }), g);
    }
    var j = a.Env.host, k = a.UA, l = b.nodeName, m = j.document, n = 'style', o = 'float', p = /^margin/, q = 'width', r = 'height', s = 'auto', t = 'display', u = t + a.now(), v = 'none', w = parseInt, x = {
            fillOpacity: 1,
            fontWeight: 1,
            lineHeight: 1,
            opacity: 1,
            orphans: 1,
            widows: 1,
            zIndex: 1,
            zoom: 1
        }, y = /^-ms-/, z = /-([a-z])/gi, A = function (a, b) {
            return b.toUpperCase();
        }, B = /([A-Z]|^ms)/g, C = '', D = 'px', E = {}, F = {}, G = {};
    F[o] = 'cssFloat', a.mix(b, {
        _camelCase: d,
        _CUSTOM_STYLES: E,
        _cssProps: F,
        _getComputedStyle: function (a, c) {
            var d, e, f, g, h, i = '', j = a.ownerDocument;
            return c = c.replace(B, '-$1').toLowerCase(), (d = j.defaultView.getComputedStyle(a, null)) && (i = d.getPropertyValue(c) || d[c]), '' !== i || b.contains(j, a) || (c = F[c] || c, i = a[n][c]), b._RE_NUM_NO_PX.test(i) && p.test(c) && (h = a.style, e = h.width, f = h.minWidth, g = h.maxWidth, h.minWidth = h.maxWidth = h.width = i, i = d.width, h.width = e, h.minWidth = f, h.maxWidth = g), i;
        },
        style: function (d, e, f) {
            var h, i, j, k = b.query(d), l = k[0];
            if (a.isPlainObject(e)) {
                for (h in e)
                    for (j = k.length - 1; j >= 0; j--)
                        g(k[j], h, e[h]);
                return c;
            }
            if (f === c)
                return i = '', l && (i = g(l, e, f)), i;
            for (j = k.length - 1; j >= 0; j--)
                g(k[j], e, f);
            return c;
        },
        css: function (e, f, h) {
            var i, j, k, l, m = b.query(e), n = m[0];
            if (a.isPlainObject(f)) {
                for (i in f)
                    for (l = m.length - 1; l >= 0; l--)
                        g(m[l], i, f[i]);
                return c;
            }
            if (f = d(f), j = E[f], h === c)
                return k = '', n && (j && 'get' in j && (k = j.get(n, !0)) !== c || (k = b._getComputedStyle(n, f))), k === c ? '' : k;
            for (l = m.length - 1; l >= 0; l--)
                g(m[l], f, h);
            return c;
        },
        show: function (a) {
            var c, d, f, g, h = b.query(a);
            for (g = h.length - 1; g >= 0; g--)
                f = h[g], f[n][t] = b.data(f, u) || C, b.css(f, t) === v && (c = f.tagName.toLowerCase(), d = e(c), b.data(f, u, d), f[n][t] = d);
        },
        hide: function (a) {
            var c, d, e = b.query(a);
            for (d = e.length - 1; d >= 0; d--) {
                c = e[d];
                var f = c[n], g = f[t];
                g !== v && (g && b.data(c, u, g), f[t] = v);
            }
        },
        toggle: function (a) {
            var c, d, e = b.query(a);
            for (d = e.length - 1; d >= 0; d--)
                c = e[d], b.css(c, t) === v ? b.show(c) : b.hide(c);
        },
        addStyleSheet: function (a, c, d) {
            a = a || j, 'string' == typeof a && (d = c, c = a, a = j), a = b.get(a);
            var e, f = b.getWindow(a), g = f.document;
            d && (d = d.replace('#', C)) && (e = b.get('#' + d, g)), e || (e = b.create('<style>', { id: d }, g), b.get('head', g).appendChild(e), e.styleSheet ? e.styleSheet.cssText = c : e.appendChild(g.createTextNode(c)));
        },
        unselectable: function (c) {
            var d, e, f, g, h, i = b.query(c), j = 0;
            for (e = i.length - 1; e >= 0; e--)
                if (d = i[e], k.gecko)
                    d[n].MozUserSelect = 'none';
                else if (k.webkit)
                    d[n].KhtmlUserSelect = 'none';
                else if (k.ie || k.opera)
                    for (h = d.getElementsByTagName('*'), d.setAttribute('unselectable', 'on'), g = [
                            'iframe',
                            'textarea',
                            'input',
                            'select'
                        ]; f = h[j++];)
                        a.inArray(l(f), g) || f.setAttribute('unselectable', 'on');
        },
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0,
        width: 0,
        height: 0
    }), a.each([
        q,
        r
    ], function (c) {
        b['inner' + a.ucfirst(c)] = function (a) {
            var d = b.get(a);
            return d && h(d, c, 'padding');
        }, b['outer' + a.ucfirst(c)] = function (a, d) {
            var e = b.get(a);
            return e && h(e, c, d ? 'margin' : 'border');
        }, b[c] = function (a, d) {
            var e = b.css(a, c, d);
            return e && (e = parseFloat(e)), e;
        };
    });
    var H = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
        };
    return a.each([
        'height',
        'width'
    ], function (a) {
        E[a] = {
            get: function (b, d) {
                return d ? h(b, a) + 'px' : c;
            }
        };
    }), a.each([
        'left',
        'top'
    ], function (c) {
        E[c] = {
            get: function (d, e) {
                var f, g;
                return e && (f = b._getComputedStyle(d, c), f === s && (f = 0, a.inArray(b.css(d, 'position'), [
                    'absolute',
                    'fixed'
                ]) && (g = d['left' === c ? 'offsetLeft' : 'offsetTop'], (k.ie && (m.documentMode || 0) < 9 || k.opera) && (g -= d.offsetParent && d.offsetParent['client' + ('left' == c ? 'Left' : 'Top')] || 0), f = g - (w(b.css(d, 'margin-' + c)) || 0)), f += 'px')), f;
            }
        };
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/base/traversal', function (a, b, c) {
    function d(d, f, h, i, j, k, l) {
        if (!(d = b.get(d)))
            return null;
        if (0 === f)
            return d;
        if (k || (d = d[h]), !d)
            return null;
        j = j && b.get(j) || null, f === c && (f = 1);
        var m, n, o = [], p = a.isArray(f);
        for (a.isNumber(f) && (m = 0, n = f, f = function () {
                return ++m === n;
            }); d && d != j && (!(d.nodeType == g.ELEMENT_NODE || d.nodeType == g.TEXT_NODE && l) || !e(d, f) || i && !i(d) || (o.push(d), p));)
            d = d[h];
        return p ? o : o[0] || null;
    }
    function e(c, d) {
        if (!d)
            return !0;
        if (a.isArray(d)) {
            var e, f = d.length;
            if (!f)
                return !0;
            for (e = 0; f > e; e++)
                if (b.test(c, d[e]))
                    return !0;
        } else if (b.test(c, d))
            return !0;
        return !1;
    }
    function f(c, d, e, f) {
        var h, i, j, k = [], l = b.get(c), m = l;
        if (l && e && (m = l.parentNode), m) {
            for (h = a.makeArray(m.childNodes), i = 0; i < h.length; i++)
                j = h[i], (f || j.nodeType == g.ELEMENT_NODE) && j != l && k.push(j);
            d && (k = b.filter(k, d));
        }
        return k;
    }
    var g = b.NodeType, h = 16;
    return a.mix(b, {
        _contains: function (a, b) {
            return !!(a.compareDocumentPosition(b) & h);
        },
        closest: function (a, b, c, e) {
            return d(a, b, 'parentNode', function (a) {
                return a.nodeType != g.DOCUMENT_FRAGMENT_NODE;
            }, c, !0, e);
        },
        parent: function (a, b, e) {
            return d(a, b, 'parentNode', function (a) {
                return a.nodeType != g.DOCUMENT_FRAGMENT_NODE;
            }, e, c);
        },
        first: function (a, e, f) {
            var g = b.get(a);
            return d(g && g.firstChild, e, 'nextSibling', c, c, !0, f);
        },
        last: function (a, e, f) {
            var g = b.get(a);
            return d(g && g.lastChild, e, 'previousSibling', c, c, !0, f);
        },
        next: function (a, b, e) {
            return d(a, b, 'nextSibling', c, c, c, e);
        },
        prev: function (a, b, e) {
            return d(a, b, 'previousSibling', c, c, c, e);
        },
        siblings: function (a, b, c) {
            return f(a, b, !0, c);
        },
        children: function (a, b) {
            return f(a, b, c);
        },
        contents: function (a, b) {
            return f(a, b, c, 1);
        },
        contains: function (a, c) {
            return a = b.get(a), c = b.get(c), a && c ? b._contains(a, c) : !1;
        },
        index: function (c, d) {
            var e, f, h, i = b.query(c), j = 0, k = i[0];
            if (!d) {
                if (f = k && k.parentNode, !f)
                    return -1;
                for (e = k; e = e.previousSibling;)
                    e.nodeType == g.ELEMENT_NODE && j++;
                return j;
            }
            return h = b.query(d), 'string' == typeof d ? a.indexOf(k, h) : a.indexOf(h[0], i);
        },
        equals: function (a, c) {
            if (a = b.query(a), c = b.query(c), a.length != c.length)
                return !1;
            for (var d = a.length; d >= 0; d--)
                if (a[d] != c[d])
                    return !1;
            return !0;
        }
    }), b;
}, { requires: ['./api'] }), KISSY.add('dom/ie/attr', function (a, b) {
    var c, d = b._attrHooks, e = b._attrNodeHook, f = b.NodeType, g = b._valHooks, h = b._propFix, i = 'href', j = document.documentMode || a.UA.ie;
    return 8 > j && (d.style.set = function (a, b) {
        a.style.cssText = b;
    }, a.mix(e, {
        get: function (a, b) {
            var c = a.getAttributeNode(b);
            return c && (c.specified || c.nodeValue) ? c.nodeValue : void 0;
        },
        set: function (a, b, c) {
            var d, e = a.getAttributeNode(c);
            if (e)
                e.nodeValue = b;
            else
                try {
                    d = a.ownerDocument.createAttribute(c), d.value = b, a.setAttributeNode(d);
                } catch (f) {
                    return a.setAttribute(c, b, 0);
                }
        }
    }), a.mix(b._attrFix, h), d.tabIndex = d.tabindex, a.each([
        i,
        'src',
        'width',
        'height',
        'colSpan',
        'rowSpan'
    ], function (a) {
        d[a] = {
            get: function (b) {
                var c = b.getAttribute(a, 2);
                return null === c ? void 0 : c;
            }
        };
    }), g.button = d.value = e, d.placeholder = {
        get: function (a, b) {
            return a[b] || e.get(a, b);
        }
    }, g.option = {
        get: function (a) {
            var b = a.attributes.value;
            return !b || b.specified ? a.value : a.text;
        }
    }), c = d[i] = d[i] || {}, c.set = function (a, b, c) {
        var d, e = a.childNodes, g = e.length, h = g > 0;
        for (g -= 1; g >= 0; g--)
            e[g].nodeType != f.TEXT_NODE && (h = 0);
        h && (d = a.ownerDocument.createElement('b'), d.style.display = 'none', a.appendChild(d)), a.setAttribute(c, '' + b), d && a.removeChild(d);
    }, b;
}, { requires: ['dom/base'] }), KISSY.add('dom/ie/create', function (a, b) {
    var c = document.documentMode || a.UA.ie;
    b._fixCloneAttributes = function (a, c) {
        c.clearAttributes && c.clearAttributes(), c.mergeAttributes && c.mergeAttributes(a);
        var d = c.nodeName.toLowerCase(), e = a.childNodes;
        if ('object' !== d || c.childNodes.length)
            'input' !== d || 'checkbox' !== a.type && 'radio' !== a.type ? 'option' === d ? c.selected = a.defaultSelected : ('input' === d || 'textarea' === d) && (c.defaultValue = a.defaultValue) : (a.checked && (c.defaultChecked = c.checked = a.checked), c.value !== a.value && (c.value = a.value));
        else
            for (var f = 0; f < e.length; f++)
                c.appendChild(e[f].cloneNode(!0));
        c.removeAttribute(b.__EXPANDO);
    };
    var d = b._creators, e = b._defaultCreator, f = /<tbody/i;
    8 > c && (d.table = function (c, d) {
        var g = e(c, d), h = f.test(c);
        if (h)
            return g;
        var i = g.firstChild, j = a.makeArray(i.childNodes);
        return a.each(j, function (a) {
            'tbody' != b.nodeName(a) || a.childNodes.length || i.removeChild(a);
        }), g;
    });
}, { requires: ['dom/base'] }), KISSY.add('dom/ie', function (a, b) {
    return b;
}, {
    requires: [
        './ie/attr',
        './ie/create',
        './ie/insertion',
        './ie/selector',
        './ie/style',
        './ie/traversal',
        './ie/input-selection'
    ]
}), KISSY.add('dom/ie/input-selection', function (a, b) {
    function c(a, b) {
        var c = 0, f = 0, h = d(a), i = e(a);
        return i.inRange(h) && (i.setEndPoint('EndToStart', h), c = g(a, i).length, b && (f = c + g(a, h).length)), [
            c,
            f
        ];
    }
    function d(a) {
        return a.ownerDocument.selection.createRange();
    }
    function e(a) {
        if ('textarea' == a.type) {
            var b = a.document.body.createTextRange();
            return b.moveToElementText(a), b;
        }
        return a.createTextRange();
    }
    function f(a, b, c) {
        var d = Math.min(b, c), e = Math.max(b, c);
        if (d == e)
            return 0;
        if ('textarea' == a.type) {
            var f = a.value.substring(d, e).replace(/\r\n/g, '\n').length;
            return b > c && (f = -f), f;
        }
        return c - b;
    }
    function g(a, b) {
        if ('textarea' == a.type) {
            var c = b.text, d = b.duplicate();
            return 0 == d.compareEndPoints('StartToEnd', d) ? c : (d.moveEnd('character', -1), d.text == c && (c += '\r\n'), c);
        }
        return b.text;
    }
    var h = b._propHooks;
    h.selectionStart = {
        set: function (a, b) {
            var g = d(a), h = e(a);
            if (h.inRange(g)) {
                var i = c(a, 1)[1], j = f(a, b, i);
                g.collapse(!1), g.moveStart('character', -j), b > i && g.collapse(!0), g.select();
            }
        },
        get: function (a) {
            return c(a)[0];
        }
    }, h.selectionEnd = {
        set: function (a, b) {
            var g = d(a), h = e(a);
            if (h.inRange(g)) {
                var i = c(a)[0], j = f(a, i, b);
                g.collapse(!0), g.moveEnd('character', j), i > b && g.collapse(!1), g.select();
            }
        },
        get: function (a) {
            return c(a, 1)[1];
        }
    };
}, { requires: ['dom/base'] }), KISSY.add('dom/ie/insertion', function (a, b) {
    function c(a) {
        ('checkbox' === a.type || 'radio' === a.type) && (a.defaultChecked = a.checked);
    }
    var d = document.documentMode || a.UA.ie;
    8 > d && (b._fixInsertionChecked = function e(a) {
        for (var d = 0; d < a.length; d++) {
            var f = a[d];
            if (f.nodeType == b.NodeType.DOCUMENT_FRAGMENT_NODE)
                e(f.childNodes);
            else if ('input' == b.nodeName(f))
                c(f);
            else if (f.nodeType == b.NodeType.ELEMENT_NODE)
                for (var g = f.getElementsByTagName('input'), h = 0; h < g.length; h++)
                    e(g[h]);
        }
    });
}, { requires: ['dom/base'] }), KISSY.add('dom/ie/selector', function (a, b) {
    var c = a.Env.host.document;
    b._compareNodeOrder = function (a, b) {
        return a.sourceIndex - b.sourceIndex;
    }, c.querySelectorAll || (b._getElementsByClassName = function (a, c, d) {
        if (!d)
            return [];
        for (var e, f = d.getElementsByTagName(c || '*'), g = [], h = 0, i = 0, j = f.length; j > h; ++h)
            e = f[h], b._hasSingleClass(e, a) && (g[i++] = e);
        return g;
    }), b._getElementsByTagName = function (b, c) {
        var d, e, f, g, h = a.makeArray(c.getElementsByTagName(b));
        if ('*' === b) {
            for (d = [], e = 0, f = 0; g = h[e++];)
                1 === g.nodeType && (d[f++] = g);
            h = d;
        }
        return h;
    };
}, { requires: ['dom/base'] }), KISSY.add('dom/ie/style', function (a, b) {
    var c = b._cssProps, d = document.documentMode || a.UA.ie, e = 100, f = a.Env.host.document, g = f && f.documentElement, h = 'opacity', i = 'style', j = /^(top|right|bottom|left)$/, k = 'filter', l = 'currentStyle', m = 'runtimeStyle', n = 'left', o = 'px', p = b._CUSTOM_STYLES, q = 'backgroundPosition', r = /opacity\s*=\s*([^)]*)/, s = /alpha\([^)]*\)/i;
    c['float'] = 'styleFloat', p[q] = {
        get: function (a, b) {
            return b ? a[l][q + 'X'] + ' ' + a[l][q + 'Y'] : a[i][q];
        }
    };
    try {
        null == g.style[h] && (p[h] = {
            get: function (a, b) {
                return r.test((b && a[l] ? a[l][k] : a[i][k]) || '') ? parseFloat(RegExp.$1) / e + '' : b ? '1' : '';
            },
            set: function (b, c) {
                c = parseFloat(c);
                var d = b[i], f = b[l], g = isNaN(c) ? '' : 'alpha(' + h + '=' + c * e + ')', j = a.trim(f && f[k] || d[k] || '');
                d.zoom = 1, (!(c >= 1) && g || a.trim(j.replace(s, '')) || (d.removeAttribute(k), g && (!f || f[k]))) && (d.filter = s.test(j) ? j.replace(s, g) : j + (j ? ', ' : '') + g);
            }
        });
    } catch (t) {
        a.log('IE filters ActiveX is disabled. ex = ' + t);
    }
    var u = 8 == d, v = {}, w = [
            '',
            'Top',
            'Left',
            'Right',
            'Bottom'
        ];
    v.thin = u ? '1px' : '2px', v.medium = u ? '3px' : '4px', v.thick = u ? '5px' : '6px', a.each(w, function (a) {
        var b = 'border' + a + 'Width', c = 'border' + a + 'Style';
        p[b] = {
            get: function (a, d) {
                var e = d ? a[l] : 0, f = e && String(e[b]) || void 0;
                return f && f.indexOf('px') < 0 && (f = v[f] && 'none' !== e[c] ? v[f] : 0), f;
            }
        };
    }), b._getComputedStyle = function (a, d) {
        d = c[d] || d;
        var e = a[l] && a[l][d];
        if (b._RE_NUM_NO_PX.test(e) && !j.test(d)) {
            var f = a[i], g = f[n], h = a[m][n];
            a[m][n] = a[l][n], f[n] = 'fontSize' === d ? '1em' : e || 0, e = f.pixelLeft + o, f[n] = g, a[m][n] = h;
        }
        return '' === e ? 'auto' : e;
    };
}, { requires: ['dom/base'] }), KISSY.add('dom/ie/traversal', function (a, b) {
    b._contains = function (a, c) {
        return a.nodeType == b.NodeType.DOCUMENT_NODE && (a = a.documentElement), c = c.parentNode, a == c ? !0 : c && c.nodeType == b.NodeType.ELEMENT_NODE ? a.contains && a.contains(c) : !1;
    };
}, { requires: ['dom/base'] }), KISSY.add('event/base', function (a, b, c, d, e) {
    return a.Event = {
        _Utils: b,
        _Object: c,
        _Observer: d,
        _ObservableEvent: e
    };
}, {
    requires: [
        './base/utils',
        './base/object',
        './base/observer',
        './base/observable'
    ]
}), KISSY.add('event/base/object', function (a) {
    function b() {
        this.timeStamp = a.now();
    }
    var c = function () {
            return !1;
        }, d = function () {
            return !0;
        };
    return b.prototype = {
        constructor: b,
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function () {
            this.isDefaultPrevented = d;
        },
        stopPropagation: function () {
            this.isPropagationStopped = d;
        },
        stopImmediatePropagation: function () {
            var a = this;
            a.isImmediatePropagationStopped = d, a.stopPropagation();
        },
        halt: function (a) {
            var b = this;
            a ? b.stopImmediatePropagation() : b.stopPropagation(), b.preventDefault();
        }
    }, b;
}), KISSY.add('event/base/observable', function (a) {
    function b(b) {
        var c = this;
        a.mix(c, b), c.reset();
    }
    return b.prototype = {
        constructor: b,
        hasObserver: function () {
            return !!this.observers.length;
        },
        reset: function () {
            var a = this;
            a.observers = [];
        },
        removeObserver: function (a) {
            var b, c = this, d = c.observers, e = d.length;
            for (b = 0; e > b; b++)
                if (d[b] == a) {
                    d.splice(b, 1);
                    break;
                }
            c.checkMemory();
        },
        checkMemory: function () {
        },
        findObserver: function (a) {
            var b, c = this.observers;
            for (b = c.length - 1; b >= 0; --b)
                if (a.equals(c[b]))
                    return b;
            return -1;
        }
    }, b;
}), KISSY.add('event/base/observer', function (a) {
    function b(b) {
        a.mix(this, b);
    }
    return b.prototype = {
        constructor: b,
        equals: function (b) {
            var c = this;
            return !!a.reduce(c.keys, function (a, d) {
                return a && c[d] === b[d];
            }, 1);
        },
        simpleNotify: function (a, b) {
            var c, d = this;
            return c = d.fn.call(d.context || b.currentTarget, a, d.data), d.once && b.removeObserver(d), c;
        },
        notifyInternal: function (a, b) {
            var c = this.simpleNotify(a, b);
            return c === !1 && a.halt(), c;
        },
        notify: function (a, b) {
            var c, d = this, e = a._ks_groups;
            if (!e || d.groups && d.groups.match(e))
                return c = d.notifyInternal(a, b);
        }
    }, b;
}), KISSY.add('event/base/utils', function (a) {
    var b, c;
    return {
        splitAndRun: c = function (b, c) {
            b = a.trim(b), -1 == b.indexOf(' ') ? c(b) : a.each(b.split(/\s+/), c);
        },
        normalizeParam: function (c, d, e) {
            var f = d || {};
            f = a.isFunction(d) ? {
                fn: d,
                context: e
            } : a.merge(f);
            var g = b(c);
            return c = g[0], f.groups = g[1], f.type = c, f;
        },
        batchForType: function (b, d) {
            var e = a.makeArray(arguments), f = e[2 + d];
            c(f, function (a) {
                var c = [].concat(e);
                c.splice(0, 2), c[d] = a, b.apply(null, c);
            });
        },
        getTypedGroups: b = function (a) {
            if (a.indexOf('.') < 0)
                return [
                    a,
                    ''
                ];
            var b = a.match(/([^.]+)?(\..+)?$/), c = b[1], d = [c], e = b[2];
            return e ? (e = e.split('.').sort(), d.push(e.join('.'))) : d.push(''), d;
        },
        getGroupsRe: function (a) {
            return new RegExp(a.split('.').join('.*\\.') + '(?:\\.|$)');
        }
    };
}), KISSY.add('event/custom/api-impl', function (a, b, c, d) {
    var e = a.trim, f = c._Utils, g = f.splitAndRun, h = '__~ks_bubble_targets';
    return a.mix(b, {
        fire: function (a, b, c) {
            var e = a, h = void 0;
            return c = c || {}, g(b, function (b) {
                var g, i, j = f.getTypedGroups(b), k = j[1];
                b = j[0], k && (k = f.getGroupsRe(k), c._ks_groups = k), i = d.getCustomEvent(e, b) || new d({
                    currentTarget: a,
                    type: b
                }), g = i.fire(c), h !== !1 && void 0 !== g && (h = g);
            }), h;
        },
        publish: function (b, c, e) {
            var f;
            return g(c, function (c) {
                f = d.getCustomEvent(b, c, 1), a.mix(f, e);
            }), b;
        },
        addTarget: function (c, d) {
            var e = b.getTargets(c);
            return a.inArray(d, e) || e.push(d), c;
        },
        removeTarget: function (c, d) {
            var e = b.getTargets(c), f = a.indexOf(d, e);
            return -1 != f && e.splice(f, 1), c;
        },
        getTargets: function (a) {
            return a[h] = a[h] || [], a[h];
        },
        on: function (a, b, c, g) {
            return b = e(b), f.batchForType(function (b, c, e) {
                var g, h = f.normalizeParam(b, c, e);
                b = h.type, g = d.getCustomEvent(a, b, 1), g && g.on(h);
            }, 0, b, c, g), a;
        },
        detach: function (b, c, g, h) {
            return c = e(c), f.batchForType(function (c, e, g) {
                var h, i, j = f.normalizeParam(c, e, g);
                c = j.type, c ? (i = d.getCustomEvent(b, c, 1), i && i.detach(j)) : (h = d.getCustomEvents(b), a.each(h, function (a) {
                    a.detach(j);
                }));
            }, 0, c, g, h), b;
        }
    });
}, {
    requires: [
        './api',
        'event/base',
        './observable'
    ]
}), KISSY.add('event/custom/api', function () {
    return {};
}), KISSY.add('event/custom', function (a, b, c, d) {
    var e = {};
    a.each(c, function (b, c) {
        e[c] = function () {
            var c = a.makeArray(arguments);
            return c.unshift(this), b.apply(null, c);
        };
    });
    var f = a.mix({
            _ObservableCustomEvent: d,
            Target: e
        }, c);
    return a.mix(b, {
        Target: e,
        custom: f
    }), a.EventTarget = e, f;
}, {
    requires: [
        './base',
        './custom/api-impl',
        './custom/observable'
    ]
}), KISSY.add('event/custom/object', function (a, b) {
    function c(b) {
        c.superclass.constructor.call(this), a.mix(this, b);
    }
    return a.extend(c, b._Object), c;
}, { requires: ['event/base'] }), KISSY.add('event/custom/observable', function (a, b, c, d, e) {
    function f() {
        var a = this;
        f.superclass.constructor.apply(a, arguments), a.defaultFn = null, a.defaultTargetOnly = !1, a.bubbles = !0;
    }
    var g = e._Utils;
    a.extend(f, e._ObservableEvent, {
        constructor: f,
        on: function (a) {
            var b = new c(a);
            -1 == this.findObserver(b) && this.observers.push(b);
        },
        checkMemory: function () {
            var b = this, c = b.currentTarget, d = f.getCustomEvents(c);
            d && (b.hasObserver() || delete d[b.type], a.isEmptyObject(d) && delete c[h]);
        },
        fire: function (a) {
            if (this.hasObserver() || this.bubbles) {
                a = a || {};
                var c, e, g, h, i, j = this, k = j.type, l = j.defaultFn, m = j.currentTarget, n = a;
                if (a.type = k, n instanceof d || (n.target = m, n = new d(n)), n.currentTarget = m, i = j.notify(n), h !== !1 && void 0 !== i && (h = i), j.bubbles)
                    for (e = b.getTargets(m), g = e && e.length || 0, c = 0; g > c && !n.isPropagationStopped(); c++)
                        i = b.fire(e[c], k, n), h !== !1 && void 0 !== i && (h = i);
                if (l && !n.isDefaultPrevented()) {
                    var o = f.getCustomEvent(n.target, n.type);
                    (!j.defaultTargetOnly && !o.defaultTargetOnly || j == n.target) && l.call(j);
                }
                return h;
            }
        },
        notify: function (a) {
            var b, c, d, e = this.observers, f = e.length;
            for (d = 0; f > d && !a.isImmediatePropagationStopped(); d++)
                b = e[d].notify(a, this), c !== !1 && void 0 !== b && (c = b);
            return c;
        },
        detach: function (a) {
            var b, c = this, d = a.fn, e = a.context, f = c.currentTarget, h = c.observers, i = a.groups;
            if (h.length) {
                i && (b = g.getGroupsRe(i));
                var j, k, l, m, n, o = h.length;
                if (d || b) {
                    for (e = e || f, j = 0, k = 0, l = []; o > j; ++j)
                        m = h[j], n = m.context || f, (e != n || d && d != m.fn || b && !m.groups.match(b)) && (l[k++] = m);
                    c.observers = l;
                } else
                    c.reset();
                c.checkMemory();
            }
        }
    });
    var h = '__~ks_custom_events';
    return f.getCustomEvent = function (a, b, c) {
        var d, e = f.getCustomEvents(a, c);
        return d = e && e[b], !d && c && (d = e[b] = new f({
            currentTarget: a,
            type: b
        })), d;
    }, f.getCustomEvents = function (a, b) {
        return !a[h] && b && (a[h] = {}), a[h];
    }, f;
}, {
    requires: [
        './api',
        './observer',
        './object',
        'event/base'
    ]
}), KISSY.add('event/custom/observer', function (a, b) {
    function c() {
        c.superclass.constructor.apply(this, arguments);
    }
    return a.extend(c, b._Observer, {
        keys: [
            'fn',
            'context',
            'groups'
        ]
    }), c;
}, { requires: ['event/base'] }), KISSY.add('event/dom/base/api', function (a, b, c, d, e, f, g) {
    function h(a, b) {
        var c = d[b] || {};
        return a.originalType || (a.selector ? c.delegateFix && (a.originalType = b, b = c.delegateFix) : c.onFix && (a.originalType = b, b = c.onFix)), b;
    }
    function i(b, c, d) {
        var e, i, j, k;
        d = a.merge(d), c = h(d, c), e = f.getCustomEvents(b, 1), (k = e.handle) || (k = e.handle = function (a) {
            var b, c = a.type, d = k.currentTarget;
            if (f.triggeredEvent != c && 'undefined' != typeof KISSY)
                return b = f.getCustomEvent(d, c), b ? (a.currentTarget = d, a = new g(a), b.notify(a)) : void 0;
        }, k.currentTarget = b), (j = e.events) || (j = e.events = {}), i = j[c], i || (i = j[c] = new f({
            type: c,
            fn: k,
            currentTarget: b
        }), i.setup()), i.on(d), b = null;
    }
    function j(b, c, d) {
        d = a.merge(d);
        var e;
        c = h(d, c);
        var g = f.getCustomEvents(b), i = (g || {}).events;
        if (g && i)
            if (c)
                e = i[c], e && e.detach(d);
            else
                for (c in i)
                    i[c].detach(d);
    }
    var k = b._Utils;
    return a.mix(b, {
        add: function (b, d, e, f) {
            return d = a.trim(d), b = c.query(b), k.batchForType(function (a, b, c, d) {
                var e, f = k.normalizeParam(b, c, d);
                for (b = f.type, e = a.length - 1; e >= 0; e--)
                    i(a[e], b, f);
            }, 1, b, d, e, f), b;
        },
        remove: function (b, d, e, f) {
            return d = a.trim(d), b = c.query(b), k.batchForType(function (a, b, c, d) {
                var e, f = k.normalizeParam(b, c, d);
                for (b = f.type, e = a.length - 1; e >= 0; e--)
                    j(a[e], b, f);
            }, 1, b, d, e, f), b;
        },
        delegate: function (a, c, d, e, f) {
            return b.add(a, c, {
                fn: e,
                context: f,
                selector: d
            });
        },
        undelegate: function (a, c, d, e, f) {
            return b.remove(a, c, {
                fn: e,
                context: f,
                selector: d
            });
        },
        fire: function (b, d, e, g) {
            var h = void 0;
            return e = e || {}, e.synthetic = 1, k.splitAndRun(d, function (d) {
                e.type = d;
                var i, j, l, m, n = k.getTypedGroups(d), o = n[1];
                for (o && (o = k.getGroupsRe(o)), d = n[0], a.mix(e, {
                        type: d,
                        _ks_groups: o
                    }), b = c.query(b), j = b.length - 1; j >= 0; j--)
                    l = b[j], m = f.getCustomEvent(l, d), g || m || (m = new f({
                        type: d,
                        currentTarget: l
                    })), m && (i = m.fire(e, g), h !== !1 && void 0 !== i && (h = i));
            }), h;
        },
        fireHandler: function (a, c, d) {
            return b.fire(a, c, d, 1);
        },
        _clone: function (b, c) {
            var d, e;
            (d = f.getCustomEvents(b)) && (e = d.events, a.each(e, function (b, d) {
                a.each(b.observers, function (a) {
                    i(c, d, a);
                });
            }));
        },
        _ObservableDOMEvent: f
    }), b.on = b.add, b.detach = b.remove, b;
}, {
    requires: [
        'event/base',
        'dom',
        './special',
        './utils',
        './observable',
        './object'
    ]
}), KISSY.add('event/dom/base', function (a, b, c, d, e, f) {
    return a.mix(b, {
        KeyCodes: c,
        _DOMUtils: d,
        Gesture: e,
        _Special: f
    }), b;
}, {
    requires: [
        'event/base',
        './base/key-codes',
        './base/utils',
        './base/gesture',
        './base/special',
        './base/api',
        './base/mouseenter',
        './base/mousewheel',
        './base/valuechange'
    ]
}), KISSY.add('event/dom/base/gesture', function () {
    return {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup',
        tap: 'click',
        doubleTap: 'dblclick'
    };
}), KISSY.add('event/dom/base/key-codes', function (a) {
    var b = a.UA, c = {
            MAC_ENTER: 3,
            BACKSPACE: 8,
            TAB: 9,
            NUM_CENTER: 12,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAUSE: 19,
            CAPS_LOCK: 20,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            PRINT_SCREEN: 44,
            INSERT: 45,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            QUESTION_MARK: 63,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            META: 91,
            WIN_KEY_RIGHT: 92,
            CONTEXT_MENU: 93,
            NUM_ZERO: 96,
            NUM_ONE: 97,
            NUM_TWO: 98,
            NUM_THREE: 99,
            NUM_FOUR: 100,
            NUM_FIVE: 101,
            NUM_SIX: 102,
            NUM_SEVEN: 103,
            NUM_EIGHT: 104,
            NUM_NINE: 105,
            NUM_MULTIPLY: 106,
            NUM_PLUS: 107,
            NUM_MINUS: 109,
            NUM_PERIOD: 110,
            NUM_DIVISION: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            NUMLOCK: 144,
            SEMICOLON: 186,
            DASH: 189,
            EQUALS: 187,
            COMMA: 188,
            PERIOD: 190,
            SLASH: 191,
            APOSTROPHE: 192,
            SINGLE_QUOTE: 222,
            OPEN_SQUARE_BRACKET: 219,
            BACKSLASH: 220,
            CLOSE_SQUARE_BRACKET: 221,
            WIN_KEY: 224,
            MAC_FF_META: 224,
            WIN_IME: 229
        };
    return c.isTextModifyingKeyEvent = function (a) {
        if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= c.F1 && a.keyCode <= c.F12)
            return !1;
        switch (a.keyCode) {
        case c.ALT:
        case c.CAPS_LOCK:
        case c.CONTEXT_MENU:
        case c.CTRL:
        case c.DOWN:
        case c.END:
        case c.ESC:
        case c.HOME:
        case c.INSERT:
        case c.LEFT:
        case c.MAC_FF_META:
        case c.META:
        case c.NUMLOCK:
        case c.NUM_CENTER:
        case c.PAGE_DOWN:
        case c.PAGE_UP:
        case c.PAUSE:
        case c.PRINT_SCREEN:
        case c.RIGHT:
        case c.SHIFT:
        case c.UP:
        case c.WIN_KEY:
        case c.WIN_KEY_RIGHT:
            return !1;
        default:
            return !0;
        }
    }, c.isCharacterKey = function (a) {
        if (a >= c.ZERO && a <= c.NINE)
            return !0;
        if (a >= c.NUM_ZERO && a <= c.NUM_MULTIPLY)
            return !0;
        if (a >= c.A && a <= c.Z)
            return !0;
        if (b.webkit && 0 == a)
            return !0;
        switch (a) {
        case c.SPACE:
        case c.QUESTION_MARK:
        case c.NUM_PLUS:
        case c.NUM_MINUS:
        case c.NUM_PERIOD:
        case c.NUM_DIVISION:
        case c.SEMICOLON:
        case c.DASH:
        case c.EQUALS:
        case c.COMMA:
        case c.PERIOD:
        case c.SLASH:
        case c.APOSTROPHE:
        case c.SINGLE_QUOTE:
        case c.OPEN_SQUARE_BRACKET:
        case c.BACKSLASH:
        case c.CLOSE_SQUARE_BRACKET:
            return !0;
        default:
            return !1;
        }
    }, c;
}), KISSY.add('event/dom/base/mouseenter', function (a, b, c, d) {
    return a.each([
        {
            name: 'mouseenter',
            fix: 'mouseover'
        },
        {
            name: 'mouseleave',
            fix: 'mouseout'
        }
    ], function (a) {
        d[a.name] = {
            onFix: a.fix,
            delegateFix: a.fix,
            handle: function (a, b, d) {
                var e = a.currentTarget, f = a.relatedTarget;
                return !f || f !== e && !c.contains(e, f) ? [b.simpleNotify(a, d)] : void 0;
            }
        };
    }), b;
}, {
    requires: [
        './api',
        'dom',
        './special'
    ]
}), KISSY.add('event/dom/base/mousewheel', function (a, b) {
    var c = a.UA, d = c.gecko ? 'DOMMouseScroll' : 'mousewheel';
    b.mousewheel = {
        onFix: d,
        delegateFix: d
    };
}, { requires: ['./special'] }), KISSY.add('event/dom/base/object', function (a, b, c) {
    function d(a) {
        var b = this;
        b.altKey = c, b.attrChange = c, b.attrName = c, b.bubbles = c, b.button = c, b.cancelable = c, b.charCode = c, b.clientX = c, b.clientY = c, b.ctrlKey = c, b.data = c, b.detail = c, b.eventPhase = c, b.fromElement = c, b.handler = c, b.keyCode = c, b.metaKey = c, b.newValue = c, b.offsetX = c, b.offsetY = c, b.pageX = c, b.pageY = c, b.prevValue = c, b.relatedNode = c, b.relatedTarget = c, b.screenX = c, b.screenY = c, b.shiftKey = c, b.srcElement = c, b.toElement = c, b.view = c, b.wheelDelta = c, b.which = c, b.changedTouches = c, b.touches = c, b.targetTouches = c, b.rotation = c, b.scale = c, d.superclass.constructor.call(b), b.originalEvent = a, b.isDefaultPrevented = a.defaultPrevented || a.returnValue === i || a.getPreventDefault && a.getPreventDefault() ? function () {
            return h;
        } : function () {
            return i;
        }, e(b), f(b);
    }
    function e(a) {
        for (var b, d = a.originalEvent, e = j.length, f = d.currentTarget, h = 9 === f.nodeType ? f : f.ownerDocument || g; e;)
            b = j[--e], a[b] = d[b];
        if (a.target || (a.target = a.srcElement || h), 3 === a.target.nodeType && (a.target = a.target.parentNode), !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement), a.pageX === c && a.clientX !== c) {
            var i = h.documentElement, k = h.body;
            a.pageX = a.clientX + (i && i.scrollLeft || k && k.scrollLeft || 0) - (i && i.clientLeft || k && k.clientLeft || 0), a.pageY = a.clientY + (i && i.scrollTop || k && k.scrollTop || 0) - (i && i.clientTop || k && k.clientTop || 0);
        }
        a.which === c && (a.which = a.charCode === c ? a.keyCode : a.charCode), a.metaKey === c && (a.metaKey = a.ctrlKey), a.which || a.button === c || (a.which = 1 & a.button ? 1 : 2 & a.button ? 3 : 4 & a.button ? 2 : 0);
    }
    function f(b) {
        var d, e, f, g = b.detail;
        b.wheelDelta && (f = b.wheelDelta / 120), b.detail && (f = -(g % 3 == 0 ? g / 3 : g)), b.axis !== c && (b.axis === b.HORIZONTAL_AXIS ? (e = 0, d = -1 * f) : b.axis === b.VERTICAL_AXIS && (d = 0, e = f)), b.wheelDeltaY !== c && (e = b.wheelDeltaY / 120), b.wheelDeltaX !== c && (d = -1 * b.wheelDeltaX / 120), d || e || (e = f), (d !== c || e !== c || f !== c) && a.mix(b, {
            deltaY: e,
            delta: f,
            deltaX: d
        });
    }
    var g = a.Env.host.document, h = !0, i = !1, j = 'type altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which axis changedTouches touches targetTouches rotation scale'.split(' ');
    return a.extend(d, b._Object, {
        constructor: d,
        preventDefault: function () {
            var a = this.originalEvent;
            a.preventDefault ? a.preventDefault() : a.returnValue = i, d.superclass.preventDefault.call(this);
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = h, d.superclass.stopPropagation.call(this);
        }
    }), b.DOMEventObject = d, d;
}, { requires: ['event/base'] }), KISSY.add('event/dom/base/observable', function (a, b, c, d, e, f, g) {
    function h(b) {
        var c = this;
        a.mix(c, b), c.reset();
    }
    var i = g._Utils;
    return a.extend(h, g._ObservableEvent, {
        setup: function () {
            var a = this, b = a.type, e = c[b] || {}, f = a.currentTarget, g = d.data(f), h = g.handle;
            e.setup && e.setup.call(f, b) !== !1 || d.simpleAdd(f, b, h);
        },
        constructor: h,
        reset: function () {
            var a = this;
            h.superclass.reset.call(a), a.delegateCount = 0, a.lastCount = 0;
        },
        notify: function (a) {
            var c, d, e, f, g, h, i, j, k, l, m = a.target, n = this, o = n.currentTarget, p = n.observers, q = [], r = n.delegateCount || 0;
            if (r && !m.disabled)
                for (; m != o;) {
                    for (j = [], g = 0; r > g; g++)
                        l = p[g], b.test(m, l.selector) && j.push(l);
                    j.length && q.push({
                        currentTarget: m,
                        currentTargetObservers: j
                    }), m = m.parentNode || o;
                }
            for (q.push({
                    currentTarget: o,
                    currentTargetObservers: p.slice(r)
                }), g = 0, i = q.length; !a.isPropagationStopped() && i > g; ++g)
                for (f = q[g], j = f.currentTargetObservers, c = f.currentTarget, a.currentTarget = c, h = 0; !a.isImmediatePropagationStopped() && h < j.length; h++)
                    k = j[h], d = k.notify(a, n), e !== !1 && void 0 !== d && (e = d);
            return e;
        },
        fire: function (d, e) {
            d = d || {};
            var g = this, i = g.type, j = c[i];
            j && j.onFix && (i = j.onFix);
            var k, l, m = g.currentTarget, n = !0;
            d.type = i, d instanceof f || (l = d, d = new f({
                currentTarget: m,
                target: m
            }), a.mix(d, l));
            var o, p = m, q = b.getWindow(p.ownerDocument || p), r = q.document, s = [], t = 0, u = 'on' + i;
            do
                s.push(p), p = p.parentNode || p.ownerDocument || p === r && q;
            while (p);
            p = s[t];
            do
                d.currentTarget = p, k = h.getCustomEvent(p, i), k && (o = k.notify(d), n !== !1 && void 0 !== o && (n = o)), p[u] && p[u].call(p) === !1 && d.preventDefault(), p = s[++t];
            while (!e && p && !d.isPropagationStopped());
            if (!e && !d.isDefaultPrevented()) {
                var v;
                try {
                    u && m[i] && ('focus' !== i && 'blur' !== i || 0 !== m.offsetWidth) && !a.isWindow(m) && (v = m[u], v && (m[u] = null), h.triggeredEvent = i, m[i]());
                } catch (w) {
                    a.log('trigger action error: '), a.log(w);
                }
                v && (m[u] = v), h.triggeredEvent = '';
            }
            return n;
        },
        on: function (a) {
            var b = this, d = b.observers, f = c[b.type] || {}, g = a instanceof e ? a : new e(a);
            -1 == b.findObserver(g) && (g.selector ? (d.splice(b.delegateCount, 0, g), b.delegateCount++) : g.last ? (d.push(g), b.lastCount++) : d.splice(d.length - b.lastCount, 0, g), f.add && f.add.call(b.currentTarget, g));
        },
        detach: function (a) {
            var b, d = this, e = c[d.type] || {}, f = 'selector' in a, g = a.selector, h = a.context, j = a.fn, k = d.currentTarget, l = d.observers, m = a.groups;
            if (l.length) {
                m && (b = i.getGroupsRe(m));
                var n, o, p, q, r, s = l.length;
                if (j || f || b) {
                    for (h = h || k, n = 0, o = 0, p = []; s > n; ++n)
                        q = l[n], r = q.context || k, h != r || j && j != q.fn || f && (g && g != q.selector || !g && !q.selector) || b && !q.groups.match(b) ? p[o++] = q : (q.selector && d.delegateCount && d.delegateCount--, q.last && d.lastCount && d.lastCount--, e.remove && e.remove.call(k, q));
                    d.observers = p;
                } else
                    d.reset();
                d.checkMemory();
            }
        },
        checkMemory: function () {
            var b, e, f = this, g = f.type, h = c[g] || {}, i = f.currentTarget, j = d.data(i);
            j && (b = j.events, f.hasObserver() || (e = j.handle, h.tearDown && h.tearDown.call(i, g) !== !1 || d.simpleRemove(i, g, e), delete b[g]), a.isEmptyObject(b) && (j.handle = null, d.removeData(i)));
        }
    }), h.triggeredEvent = '', h.getCustomEvent = function (a, b) {
        var c, e = d.data(a);
        return e && (c = e.events), c ? c[b] : void 0;
    }, h.getCustomEvents = function (a, b) {
        var c = d.data(a);
        return !c && b && d.data(a, c = {}), c;
    }, h;
}, {
    requires: [
        'dom',
        './special',
        './utils',
        './observer',
        './object',
        'event/base'
    ]
}), KISSY.add('event/dom/base/observer', function (a, b, c) {
    function d() {
        d.superclass.constructor.apply(this, arguments);
    }
    return a.extend(d, c._Observer, {
        keys: [
            'fn',
            'selector',
            'data',
            'context',
            'originalType',
            'groups',
            'last'
        ],
        notifyInternal: function (a, c) {
            var d, e, f, g = this, h = a.type;
            return g.originalType && (a.type = g.originalType), (d = b[a.type]) && d.handle ? (e = d.handle(a, g, c), e && e.length > 0 && (f = e[0])) : f = g.simpleNotify(a, c), f === !1 && a.halt(), a.type = h, f;
        }
    }), d;
}, {
    requires: [
        './special',
        'event/base'
    ]
}), KISSY.add('event/dom/base/special', function () {
    return {};
}), KISSY.add('event/dom/base/utils', function (a, b) {
    var c = 'ksEventTargetId_1.30', d = a.Env.host.document, e = d && d.addEventListener ? function (a, b, c, d) {
            a.addEventListener && a.addEventListener(b, c, !!d);
        } : function (a, b, c) {
            a.attachEvent && a.attachEvent('on' + b, c);
        }, f = d && d.removeEventListener ? function (a, b, c, d) {
            a.removeEventListener && a.removeEventListener(b, c, !!d);
        } : function (a, b, c) {
            a.detachEvent && a.detachEvent('on' + b, c);
        };
    return {
        simpleAdd: e,
        simpleRemove: f,
        data: function (a, d) {
            return b.data(a, c, d);
        },
        removeData: function (a) {
            return b.removeData(a, c);
        }
    };
}, { requires: ['dom'] }), KISSY.add('event/dom/base/valuechange', function (a, b, c, d) {
    function e(a) {
        if (c.hasData(a, r)) {
            var b = c.data(a, r);
            clearTimeout(b), c.removeData(a, r);
        }
    }
    function f(a) {
        c.removeData(a, q), e(a);
    }
    function g(a) {
        e(a.target);
    }
    function h(a) {
        var d = a.value, e = c.data(a, q);
        d !== e && (b.fireHandler(a, n, {
            prevVal: e,
            newVal: d
        }), c.data(a, q, d));
    }
    function i(a) {
        c.hasData(a, r) || c.data(a, r, setTimeout(function () {
            h(a), c.data(a, r, setTimeout(arguments.callee, s));
        }, s));
    }
    function j(a) {
        var b = a.target;
        'focus' == a.type && c.data(b, q, b.value), i(b);
    }
    function k(a) {
        h(a.target);
    }
    function l(a) {
        m(a), b.on(a, 'blur', g), b.on(a, 'webkitspeechchange', k), b.on(a, 'mousedown keyup keydown focus', j);
    }
    function m(a) {
        f(a), b.remove(a, 'blur', g), b.remove(a, 'webkitspeechchange', k), b.remove(a, 'mousedown keyup keydown focus', j);
    }
    var n = 'valuechange', o = c.nodeName, p = 'event/valuechange', q = p + '/history', r = p + '/poll', s = 50;
    return d[n] = {
        setup: function () {
            var a = this, b = o(a);
            ('input' == b || 'textarea' == b) && l(a);
        },
        tearDown: function () {
            var a = this;
            m(a);
        }
    }, b;
}, {
    requires: [
        './api',
        'dom',
        './special'
    ]
}), KISSY.add('event/dom/focusin', function (a, b) {
    var c = b._Special;
    return a.each([
        {
            name: 'focusin',
            fix: 'focus'
        },
        {
            name: 'focusout',
            fix: 'blur'
        }
    ], function (d) {
        function e(a) {
            var c = a.target;
            return b.fire(c, d.name);
        }
        var f = a.guid('attaches_' + a.now() + '_');
        c[d.name] = {
            setup: function () {
                var a = this.ownerDocument || this;
                f in a || (a[f] = 0), a[f] += 1, 1 === a[f] && a.addEventListener(d.fix, e, !0);
            },
            tearDown: function () {
                var a = this.ownerDocument || this;
                a[f] -= 1, 0 === a[f] && a.removeEventListener(d.fix, e, !0);
            }
        };
    }), b;
}, { requires: ['event/dom/base'] }), KISSY.add('event/dom/hashchange', function (a, b, c) {
    function d(a) {
        return a.contentWindow.document;
    }
    var e = a.UA, f = b._Special, g = a.Env.host, h = g.document, i = h && h.documentMode, j = '__replace_history_' + a.now(), k = i || e.ie, l = 'hashchange';
    b.REPLACE_HISTORY = j;
    var m, n, o, p = 50, q = '<html><head><title>' + (h && h.title || '') + ' - {hash}</title>{head}</head><body>{hash}</body></html>', r = function () {
            var b = new a.Uri(location.href);
            return '#' + b.getFragment();
        }, s = function () {
            var b, c = r();
            (b = a.endsWith(c, j)) && (c = c.slice(0, -j.length), location.hash = c), c !== n && (n = c, t(c, b)), m = setTimeout(s, p);
        }, t = k && 8 > k ? function (b, e) {
            var f = a.substitute(q, {
                    hash: a.escapeHTML(b),
                    head: c.isCustomDomain() ? '<script>document.domain = \'' + h.domain + '\';</script>' : ''
                }), g = d(o);
            try {
                e ? g.open('text/html', 'replace') : g.open(), g.write(f), g.close();
            } catch (i) {
            }
        } : function () {
            u();
        }, u = function () {
            b.fireHandler(g, l);
        }, v = function () {
            m || s();
        }, w = function () {
            m && clearTimeout(m), m = 0;
        };
    k && 8 > k && (v = function () {
        function e() {
            var b = a.trim(d(o).body.innerText), c = r();
            b != c && (a.log('set loc hash :' + b), location.hash = b, n = b), u();
        }
        if (!o) {
            var f = c.getEmptyIframeSrc();
            o = c.create('<iframe ' + (f ? 'src="' + f + '"' : '') + ' style="display: none" height="0" width="0" tabindex="-1" title="empty"/>'), c.prepend(o, h.documentElement), b.add(o, 'load', function () {
                b.remove(o, 'load'), t(r()), b.add(o, 'load', e), s();
            }), h.onpropertychange = function () {
                try {
                    'title' === event.propertyName && (d(o).title = h.title + ' - ' + r());
                } catch (a) {
                }
            };
        }
    }, w = function () {
        m && clearTimeout(m), m = 0, b.detach(o), c.remove(o), o = 0;
    }), f[l] = {
        setup: function () {
            this === g && (n = r(), v());
        },
        tearDown: function () {
            this === g && w();
        }
    };
}, {
    requires: [
        'event/dom/base',
        'dom'
    ]
}), KISSY.add('event/dom/ie/change', function (a, b, c) {
    function d(a) {
        return k.test(a.nodeName);
    }
    function e(a) {
        var b = a.type;
        return 'checkbox' == b || 'radio' == b;
    }
    function f(a) {
        'checked' == a.originalEvent.propertyName && (this.__changed = 1);
    }
    function g(a) {
        this.__changed && (this.__changed = 0, b.fire(this, 'change', a));
    }
    function h(a) {
        var c = a.target;
        d(c) && !c.__changeHandler && (c.__changeHandler = 1, b.on(c, 'change', {
            fn: i,
            last: 1
        }));
    }
    function i(a) {
        var c = this;
        if (!a.isPropagationStopped() && !e(c)) {
            var d;
            (d = c.parentNode) && b.fire(d, 'change', a);
        }
    }
    var j = b._Special, k = /^(?:textarea|input|select)$/i;
    j.change = {
        setup: function () {
            var a = this;
            if (d(a)) {
                if (!e(a))
                    return !1;
                b.on(a, 'propertychange', f), b.on(a, 'click', g);
            } else
                b.on(a, 'beforeactivate', h);
        },
        tearDown: function () {
            var j = this;
            if (d(j)) {
                if (!e(j))
                    return !1;
                b.remove(j, 'propertychange', f), b.remove(j, 'click', g);
            } else
                b.remove(j, 'beforeactivate', h), a.each(c.query('textarea,input,select', j), function (a) {
                    a.__changeHandler && (a.__changeHandler = 0, b.remove(a, 'change', {
                        fn: i,
                        last: 1
                    }));
                });
        }
    };
}, {
    requires: [
        'event/dom/base',
        'dom'
    ]
}), KISSY.add('event/dom/ie', function () {
}, {
    requires: [
        './ie/change',
        './ie/submit'
    ]
}), KISSY.add('event/dom/ie/submit', function (a, b, c) {
    function d(a) {
        var c = a.target, d = g(c), f = 'input' == d || 'button' == d ? c.form : null;
        f && !f.__submit__fix && (f.__submit__fix = 1, b.on(f, 'submit', {
            fn: e,
            last: 1
        }));
    }
    function e(a) {
        var c = this;
        !c.parentNode || a.isPropagationStopped() || a.synthetic || b.fire(c.parentNode, 'submit', a);
    }
    var f = b._Special, g = c.nodeName;
    f.submit = {
        setup: function () {
            var a = this;
            return 'form' == g(a) ? !1 : (b.on(a, 'click keypress', d), void 0);
        },
        tearDown: function () {
            var f = this;
            return 'form' == g(f) ? !1 : (b.remove(f, 'click keypress', d), a.each(c.query('form', f), function (a) {
                a.__submit__fix && (a.__submit__fix = 0, b.remove(a, 'submit', {
                    fn: e,
                    last: 1
                }));
            }), void 0);
        }
    };
}, {
    requires: [
        'event/dom/base',
        'dom'
    ]
}), KISSY.add('event/dom/shake', function (a, b, c) {
    function d() {
        f = c, l = 0;
    }
    function e(a) {
        var b, d = a.accelerationIncludingGravity, e = d.x, i = d.y, o = d.z;
        f !== c && (b = m(n(e - f), n(i - g), n(o - h)), b > j && q(), b > k && (l = 1)), f = e, g = i, h = o;
    }
    var f, g, h, i = b._Special, j = 5, k = 20, l = 0, m = Math.max, n = Math.abs, o = a.Env.host, p = 'devicemotion', q = a.buffer(function () {
            l && (b.fireHandler(o, 'shake', {
                accelerationIncludingGravity: {
                    x: f,
                    y: g,
                    z: h
                }
            }), d());
        }, 250);
    i.shake = {
        setup: function () {
            this == o && o.addEventListener(p, e, !1);
        },
        tearDown: function () {
            this == o && (q.stop(), d(), o.removeEventListener(p, e, !1));
        }
    };
}, { requires: ['event/dom/base'] }), KISSY.add('event/dom/touch/double-tap', function (a, b, c, d) {
    function e() {
    }
    var f = 'singleTap', g = 'doubleTap', h = 300;
    return a.extend(e, d, {
        onTouchStart: function (a) {
            var b = this;
            return e.superclass.onTouchStart.apply(b, arguments) === !1 ? !1 : (b.startTime = a.timeStamp, b.singleTapTimer && (clearTimeout(b.singleTapTimer), b.singleTapTimer = 0), void 0);
        },
        onTouchMove: function () {
            return !1;
        },
        onTouchEnd: function (a) {
            var b = this, d = b.lastEndTime, e = a.timeStamp, i = a.target, j = a.changedTouches[0], k = e - b.startTime;
            return b.lastEndTime = e, d && (k = e - d, h > k) ? (b.lastEndTime = 0, c.fire(i, g, {
                touch: j,
                duration: k / 1000
            }), void 0) : (k = e - b.startTime, k > h ? c.fire(i, f, {
                touch: j,
                duration: k / 1000
            }) : b.singleTapTimer = setTimeout(function () {
                c.fire(i, f, {
                    touch: j,
                    duration: k / 1000
                });
            }, h), void 0);
        }
    }), b[f] = b[g] = { handle: new e() }, e;
}, {
    requires: [
        './handle-map',
        'event/dom/base',
        './single-touch'
    ]
}), KISSY.add('event/dom/touch/gesture', function (a, b) {
    var c, d, e, f = b.Gesture, g = a.Features;
    return g.isTouchSupported() && (c = 'touchstart', d = 'touchmove', e = 'touchend'), c && (f.start = c, f.move = d, f.end = e, f.tap = 'tap', f.doubleTap = 'doubleTap'), f;
}, { requires: ['event/dom/base'] }), KISSY.add('event/dom/touch/handle-map', function () {
    return {};
}), KISSY.add('event/dom/touch/handle', function (a, b, c, d, e) {
    'use strict';
    function f(a) {
        var b = this;
        b.doc = a, b.eventHandle = {}, b.init();
    }
    var g = a.guid('touch-handle'), h = a.Features, i = 30, j = {};
    j[e.start] = 'onTouchStart', j[e.move] = 'onTouchMove', j[e.end] = 'onTouchEnd', 'mousedown' !== e.start && (j.touchcancel = 'onTouchEnd');
    var k = a.throttle(function (a) {
            this.callEventHandle('onTouchMove', a);
        }, i);
    return f.prototype = {
        init: function () {
            var a, b, c = this, e = c.doc;
            for (a in j)
                b = j[a], d.on(e, a, c[b], c);
        },
        normalize: function (a) {
            var b, c, d = a.type;
            return h.isTouchSupported() ? a : -1 != d.indexOf('mouse') && 1 != a.which ? void 0 : (c = [a], b = !d.match(/up$/i), a.touches = b ? c : [], a.targetTouches = b ? c : [], a.changedTouches = c, a);
        },
        onTouchMove: function (a) {
            k.call(this, a);
        },
        onTouchStart: function (a) {
            var b, c, d = this, e = d.eventHandle;
            for (b in e)
                c = e[b].handle, c.isActive = 1;
            d.callEventHandle('onTouchStart', a);
        },
        onTouchEnd: function (a) {
            this.callEventHandle('onTouchEnd', a);
        },
        callEventHandle: function (a, b) {
            var c, d, e = this, f = e.eventHandle;
            if (b = e.normalize(b)) {
                for (c in f)
                    d = f[c].handle, d.processed || (d.processed = 1, d.isActive && d[a](b) === !1 && (d.isActive = 0));
                for (c in f)
                    d = f[c].handle, d.processed = 0;
            }
        },
        addEventHandle: function (a) {
            var b = this, d = b.eventHandle, e = c[a].handle;
            d[a] ? d[a].count++ : d[a] = {
                count: 1,
                handle: e
            };
        },
        removeEventHandle: function (a) {
            var b = this.eventHandle;
            b[a] && (b[a].count--, b[a].count || delete b[a]);
        },
        destroy: function () {
            var a, b, c = this, e = c.doc;
            for (a in j)
                b = j[a], d.detach(e, a, c[b], c);
        }
    }, {
        addDocumentHandle: function (a, d) {
            var e = b.getWindow(a.ownerDocument || a), h = e.document, i = c[d].setup, j = b.data(h, g);
            j || b.data(h, g, j = new f(h)), i && i.call(a, d), j.addEventHandle(d);
        },
        removeDocumentHandle: function (d, e) {
            var f = b.getWindow(d.ownerDocument || d), h = f.document, i = c[e].tearDown, j = b.data(h, g);
            i && i.call(d, e), j && (j.removeEventHandle(e), a.isEmptyObject(j.eventHandle) && (j.destroy(), b.removeData(h, g)));
        }
    };
}, {
    requires: [
        'dom',
        './handle-map',
        'event/dom/base',
        './gesture',
        './tap',
        './swipe',
        './double-tap',
        './pinch',
        './tap-hold',
        './rotate'
    ]
}), KISSY.add('event/dom/touch/multi-touch', function (a, b) {
    function c() {
    }
    return c.prototype = {
        requiredTouchCount: 2,
        onTouchStart: function (a) {
            var b = this, c = b.requiredTouchCount, d = a.touches, e = d.length;
            e === c ? b.start() : e > c && b.end(a);
        },
        onTouchEnd: function (a) {
            this.end(a);
        },
        start: function () {
            var a = this;
            a.isTracking || (a.isTracking = !0, a.isStarted = !1);
        },
        fireEnd: a.noop,
        getCommonTarget: function (c) {
            var d = c.touches, e = d[0].target, f = d[1].target;
            if (e == f)
                return e;
            if (b.contains(e, f))
                return e;
            for (;;) {
                if (b.contains(f, e))
                    return f;
                f = f.parentNode;
            }
            return a.error('getCommonTarget error!'), void 0;
        },
        end: function (a) {
            var b = this;
            b.isTracking && (b.isTracking = !1, b.isStarted && (b.isStarted = !1, b.fireEnd(a)));
        }
    }, c;
}, { requires: ['dom'] }), KISSY.add('event/dom/touch/pinch', function (a, b, c, d, e) {
    function f(a, b) {
        var c = a.pageX - b.pageX, d = a.pageY - b.pageY;
        return Math.sqrt(c * c + d * d);
    }
    function g() {
    }
    function h(a) {
        a.touches && 2 != a.touches.length || a.preventDefault();
    }
    var i = 'pinch', j = 'pinchStart', k = 'pinchEnd';
    a.extend(g, d, {
        onTouchMove: function (b) {
            var d = this;
            if (d.isTracking) {
                var e = b.touches, g = f(e[0], e[1]);
                if (d.lastTouches = e, d.isStarted)
                    c.fire(d.target, i, a.mix(b, {
                        distance: g,
                        scale: g / d.startDistance
                    }));
                else {
                    d.isStarted = !0, d.startDistance = g;
                    var h = d.target = d.getCommonTarget(b);
                    c.fire(h, j, a.mix(b, {
                        distance: g,
                        scale: 1
                    }));
                }
            }
        },
        fireEnd: function (b) {
            var d = this;
            c.fire(d.target, k, a.mix(b, { touches: d.lastTouches }));
        }
    });
    var l = new g();
    return b[j] = b[k] = { handle: l }, b[i] = {
        handle: l,
        setup: function () {
            c.on(this, e.move, h);
        },
        tearDown: function () {
            c.detach(this, e.move, h);
        }
    }, g;
}, {
    requires: [
        './handle-map',
        'event/dom/base',
        './multi-touch',
        './gesture'
    ]
}), KISSY.add('event/dom/touch/rotate', function (a, b, c, d, e, f) {
    function g() {
    }
    function h(a) {
        a.touches && 2 != a.touches.length || a.preventDefault();
    }
    var i = 'rotateStart', j = 'rotate', k = 180 / Math.PI, l = 'rotateEnd';
    a.extend(g, c, {
        onTouchMove: function (b) {
            var c = this;
            if (c.isTracking) {
                var e = b.touches, g = e[0], h = e[1], l = c.lastAngle, m = Math.atan2(h.pageY - g.pageY, h.pageX - g.pageX) * k;
                if (l !== f) {
                    var n = Math.abs(m - l), o = (m + 360) % 360, p = (m - 360) % 360;
                    Math.abs(o - l) < n ? m = o : Math.abs(p - l) < n && (m = p);
                }
                c.lastTouches = e, c.lastAngle = m, c.isStarted ? d.fire(c.target, j, a.mix(b, {
                    angle: m,
                    rotation: m - c.startAngle
                })) : (c.isStarted = !0, c.startAngle = m, c.target = c.getCommonTarget(b), d.fire(c.target, i, a.mix(b, {
                    angle: m,
                    rotation: 0
                })));
            }
        },
        end: function () {
            var a = this;
            a.lastAngle = f, g.superclass.end.apply(a, arguments);
        },
        fireEnd: function (b) {
            var c = this;
            d.fire(c.target, l, a.mix(b, { touches: c.lastTouches }));
        }
    });
    var m = new g();
    return b[l] = b[i] = { handle: m }, b[j] = {
        handle: m,
        setup: function () {
            d.on(this, e.move, h);
        },
        tearDown: function () {
            d.detach(this, e.move, h);
        }
    }, g;
}, {
    requires: [
        './handle-map',
        './multi-touch',
        'event/dom/base',
        './gesture'
    ]
}), KISSY.add('event/dom/touch/single-touch', function (a) {
    function b() {
    }
    return b.prototype = {
        requiredTouchCount: 1,
        onTouchStart: function (a) {
            var b = this;
            return a.touches.length != b.requiredTouchCount ? !1 : (b.lastTouches = a.touches, void 0);
        },
        onTouchMove: a.noop,
        onTouchEnd: a.noop
    }, b;
}), KISSY.add('event/dom/touch/swipe', function (a, b, c, d) {
    function e(a, b, d) {
        var e, f, i = b.changedTouches, j = i[0], l = j.pageX, m = j.pageY, n = l - a.startX, o = m - a.startY, p = Math.abs(n), q = Math.abs(o);
        if (d ? a.isVertical && a.isHorizontal && (q > p ? a.isHorizontal = 0 : a.isVertical = 0) : (a.isVertical && k > q && (a.isVertical = 0), a.isHorizontal && k > p && (a.isHorizontal = 0)), a.isHorizontal)
            f = 0 > n ? 'left' : 'right', e = p;
        else {
            if (!a.isVertical)
                return !1;
            f = 0 > o ? 'up' : 'down', e = q;
        }
        return c.fire(b.target, d ? h : g, {
            originalEvent: b.originalEvent,
            touch: j,
            direction: f,
            distance: e,
            duration: (b.timeStamp - a.startTime) / 1000
        }), void 0;
    }
    function f() {
    }
    var g = 'swipe', h = 'swiping', i = 1000, j = 35, k = 50;
    return a.extend(f, d, {
        onTouchStart: function (a) {
            var b = this;
            if (f.superclass.onTouchStart.apply(b, arguments) === !1)
                return !1;
            var c = a.touches[0];
            return b.startTime = a.timeStamp, b.isHorizontal = 1, b.isVertical = 1, b.startX = c.pageX, this.startY = c.pageY, -1 != a.type.indexOf('mouse') && a.preventDefault(), void 0;
        },
        onTouchMove: function (a) {
            var b = this, c = a.changedTouches[0], d = c.pageX, f = c.pageY, g = d - b.startX, h = f - b.startY, k = Math.abs(g), l = Math.abs(h), m = a.timeStamp;
            return m - b.startTime > i ? !1 : (b.isVertical && k > j && (b.isVertical = 0), b.isHorizontal && l > j && (b.isHorizontal = 0), e(b, a, 1));
        },
        onTouchEnd: function (a) {
            var b = this;
            return b.onTouchMove(a) === !1 ? !1 : e(b, a, 0);
        }
    }), b[g] = b[h] = { handle: new f() }, f;
}, {
    requires: [
        './handle-map',
        'event/dom/base',
        './single-touch'
    ]
}), KISSY.add('event/dom/touch/tap-hold', function (a, b, c, d, e) {
    function f() {
    }
    function g(a) {
        a.touches && 1 != a.touches.length || a.preventDefault();
    }
    var h = 'tapHold', i = 1000;
    return a.extend(f, c, {
        onTouchStart: function (b) {
            var c = this;
            return f.superclass.onTouchStart.call(c, b) === !1 ? !1 : (c.timer = setTimeout(function () {
                d.fire(b.target, h, {
                    touch: b.touches[0],
                    duration: (a.now() - b.timeStamp) / 1000
                });
            }, i), void 0);
        },
        onTouchMove: function () {
            return clearTimeout(this.timer), !1;
        },
        onTouchEnd: function () {
            clearTimeout(this.timer);
        }
    }), b[h] = {
        setup: function () {
            d.on(this, e.start, g);
        },
        tearDown: function () {
            d.detach(this, e.start, g);
        },
        handle: new f()
    }, f;
}, {
    requires: [
        './handle-map',
        './single-touch',
        'event/dom/base',
        './gesture'
    ]
}), KISSY.add('event/dom/touch/tap', function (a, b, c, d) {
    function e() {
    }
    var f = 'tap';
    return a.extend(e, d, {
        onTouchMove: function () {
            return !1;
        },
        onTouchEnd: function (a) {
            c.fire(a.target, f, { touch: a.changedTouches[0] });
        }
    }), b[f] = { handle: new e() }, e;
}, {
    requires: [
        './handle-map',
        'event/dom/base',
        './single-touch'
    ]
}), KISSY.add('event/dom/touch', function (a, b, c, d) {
    var e, f = b._Special, g = {
            setup: function (a) {
                d.addDocumentHandle(this, a);
            },
            tearDown: function (a) {
                d.removeDocumentHandle(this, a);
            }
        };
    for (e in c)
        f[e] = g;
}, {
    requires: [
        'event/dom/base',
        './touch/handle-map',
        './touch/handle'
    ]
}), KISSY.add('json/json2', function () {
    function f(a) {
        return 10 > a ? '0' + a : a;
    }
    function quote(a) {
        return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
            var b = meta[a];
            return 'string' == typeof b ? b : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + a + '"';
    }
    function str(a, b) {
        var c, d, e, f, g, h = gap, i = b[a];
        switch (i && 'object' == typeof i && 'function' == typeof i.toJSON && (i = i.toJSON(a)), 'function' == typeof rep && (i = rep.call(b, a, i)), typeof i) {
        case 'string':
            return quote(i);
        case 'number':
            return isFinite(i) ? String(i) : 'null';
        case 'boolean':
        case 'null':
            return String(i);
        case 'object':
            if (!i)
                return 'null';
            if (gap += indent, g = [], '[object Array]' === Object.prototype.toString.apply(i)) {
                for (f = i.length, c = 0; f > c; c += 1)
                    g[c] = str(c, i) || 'null';
                return e = 0 === g.length ? '[]' : gap ? '[\n' + gap + g.join(',\n' + gap) + '\n' + h + ']' : '[' + g.join(',') + ']', gap = h, e;
            }
            if (rep && 'object' == typeof rep)
                for (f = rep.length, c = 0; f > c; c += 1)
                    d = rep[c], 'string' == typeof d && (e = str(d, i), e && g.push(quote(d) + (gap ? ': ' : ':') + e));
            else
                for (d in i)
                    Object.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ': ' : ':') + e));
            return e = 0 === g.length ? '{}' : gap ? '{\n' + gap + g.join(',\n' + gap) + '\n' + h + '}' : '{' + g.join(',') + '}', gap = h, e;
        }
    }
    var JSON = {};
    'function' != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf();
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        }, rep;
    return JSON.stringify = function (a, b, c) {
        var d;
        if (gap = '', indent = '', 'number' == typeof c)
            for (d = 0; c > d; d += 1)
                indent += ' ';
        else
            'string' == typeof c && (indent = c);
        if (rep = b, b && 'function' != typeof b && ('object' != typeof b || 'number' != typeof b.length))
            throw new Error('JSON.stringify');
        return str('', { '': a });
    }, JSON.parse = function (text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && 'object' == typeof e)
                for (c in e)
                    Object.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e);
        }
        var j;
        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
            return j = eval('(' + text + ')'), 'function' == typeof reviver ? walk({ '': j }, '') : j;
        throw new SyntaxError('JSON.parse');
    }, JSON;
}), KISSY.add('json', function (a, b) {
    return b || (b = JSON), a.JSON = {
        parse: function (a) {
            return null == a || '' === a ? null : b.parse(a);
        },
        stringify: b.stringify
    };
}, { requires: [KISSY.Features.isNativeJSONSupported() ? '' : 'json/json2'] }), KISSY.add('ajax', function (a, b, c) {
    function d(b, d, f, g, h) {
        return a.isFunction(d) && (g = f, f = d, d = e), c({
            type: h || 'get',
            url: b,
            data: d,
            success: f,
            dataType: g
        });
    }
    var e = void 0;
    return a.mix(c, {
        serialize: b.serialize,
        get: d,
        post: function (b, c, f, g) {
            return a.isFunction(c) && (g = f, f = c, c = e), d(b, c, f, g, 'post');
        },
        jsonp: function (b, c, f) {
            return a.isFunction(c) && (f = c, c = e), d(b, c, f, 'jsonp');
        },
        getScript: a.getScript,
        getJSON: function (b, c, f) {
            return a.isFunction(c) && (f = c, c = e), d(b, c, f, 'json');
        },
        upload: function (b, d, f, g, h) {
            return a.isFunction(f) && (h = g, g = f, f = e), c({
                url: b,
                type: 'post',
                dataType: h,
                form: d,
                data: f,
                success: g
            });
        }
    }), a.mix(a, {
        Ajax: c,
        IO: c,
        ajax: c,
        io: c,
        jsonp: c.jsonp
    }), c;
}, {
    requires: [
        'ajax/form-serializer',
        'ajax/base',
        'ajax/xhr-transport',
        'ajax/script-transport',
        'ajax/jsonp',
        'ajax/form',
        'ajax/iframe-transport',
        'ajax/methods'
    ]
}), KISSY.add('ajax/base', function (a, b, c, d) {
    function e(b) {
        var c = b.context;
        delete b.context, b = a.mix(a.clone(r), b, { deep: !0 }), b.context = c || b;
        var e, f, g = b.type, h = b.dataType;
        return f = b.uri = o.resolve(b.url), b.uri.setQuery(''), 'crossDomain' in b || (b.crossDomain = !b.uri.isSameOriginAs(o)), g = b.type = g.toUpperCase(), b.hasContent = !l.test(g), b.processData && (e = b.data) && 'string' != typeof e && (b.data = a.param(e, d, d, b.serializeArray)), h = b.dataType = a.trim(h || '*').split(i), 'cache' in b || !a.inArray(h[0], [
            'script',
            'jsonp'
        ]) || (b.cache = !1), b.hasContent || (b.data && f.query.add(a.unparam(b.data)), b.cache === !1 && f.query.set('_ksTS', a.now() + '_' + a.guid())), b;
    }
    function f(a, b) {
        g.fire(a, {
            ajaxConfig: b.config,
            io: b
        });
    }
    function g(b) {
        function c(a) {
            return function (c) {
                (j = d.timeoutTimer) && (clearTimeout(j), d.timeoutTimer = 0);
                var e = b[a];
                e && e.apply(o, c), f(a, d);
            };
        }
        var d = this;
        if (!(d instanceof g))
            return new g(b);
        k.call(d), b = e(b), a.mix(d, {
            responseData: null,
            config: b || {},
            timeoutTimer: null,
            responseText: null,
            responseXML: null,
            responseHeadersString: '',
            responseHeaders: null,
            requestHeaders: { 'X-Requested-With': 'XMLHttpRequest' },
            readyState: 0,
            state: 0,
            statusText: null,
            status: 0,
            transport: null,
            _defer: new a.Defer(this)
        });
        var h, i;
        f('start', d), h = q[b.dataType[0]] || q['*'], i = new h(d), d.transport = i, b.contentType && d.setRequestHeader('Content-Type', b.contentType);
        var j, l, m = b.dataType[0], n = b.timeout, o = b.context, p = b.headers, r = b.accepts;
        d.setRequestHeader('Accept', m && r[m] ? r[m] + ('*' === m ? '' : ', */*; q=0.01') : r['*']);
        for (l in p)
            d.setRequestHeader(l, p[l]);
        if (b.beforeSend && b.beforeSend.call(o, d, b) === !1)
            return d;
        d.then(c('success'), c('error')), d.fin(c('complete')), d.readyState = 1, f('send', d), b.async && n > 0 && (d.timeoutTimer = setTimeout(function () {
            d.abort('timeout');
        }, 1000 * n));
        try {
            d.state = 1, i.send();
        } catch (s) {
            d.state < 2 ? (a.log(s.stack || s, 'error'), d._ioReady(-1, s.message)) : a.error(s);
        }
        return d;
    }
    var h = /^(?:about|app|app\-storage|.+\-extension|file|widget)$/, i = /\s+/, j = function (a) {
            return a;
        }, k = a.Promise, l = /^(?:GET|HEAD)$/, m = a.Env.host, n = m.location || {}, o = new a.Uri(n.href), p = o && h.test(o.getScheme()), q = {}, r = {
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            async: !0,
            serializeArray: !0,
            processData: !0,
            accepts: {
                xml: 'application/xml, text/xml',
                html: 'text/html',
                text: 'text/plain',
                json: 'application/json, text/javascript',
                '*': '*/*'
            },
            converters: {
                text: {
                    json: b.parse,
                    html: j,
                    text: j,
                    xml: a.parseXML
                }
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            }
        };
    return r.converters.html = r.converters.text, a.mix(g, c.Target), a.mix(g, {
        isLocal: p,
        setupConfig: function (b) {
            a.mix(r, b, { deep: !0 });
        },
        setupTransport: function (a, b) {
            q[a] = b;
        },
        getTransport: function (a) {
            return q[a];
        },
        getConfig: function () {
            return r;
        }
    }), g;
}, {
    requires: [
        'json',
        'event'
    ]
}), KISSY.add('ajax/form-serializer', function (a, b) {
    function c(a) {
        return a.replace(f, '\r\n');
    }
    var d, e = /^(?:select|textarea)/i, f = /\r?\n/g, g = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
    return d = {
        serialize: function (b, c) {
            return a.param(d.getFormData(b), void 0, void 0, c || !1);
        },
        getFormData: function (d) {
            var f = [], h = {};
            return a.each(b.query(d), function (b) {
                var c = b.elements ? a.makeArray(b.elements) : [b];
                f.push.apply(f, c);
            }), f = a.filter(f, function (a) {
                return a.name && !a.disabled && (a.checked || e.test(a.nodeName) || g.test(a.type));
            }), a.each(f, function (d) {
                var e, f = b.val(d);
                if (null !== f) {
                    if (f = a.isArray(f) ? a.map(f, c) : c(f), e = h[d.name], !e)
                        return h[d.name] = f, void 0;
                    e && !a.isArray(e) && (e = h[d.name] = [e]), e.push.apply(e, a.makeArray(f));
                }
            }), h;
        }
    };
}, { requires: ['dom'] }), KISSY.add('ajax/form', function (a, b, c, d) {
    return b.on('start', function (b) {
        var e, f, g, h, i, j, k, l = b.io, m = l.config;
        (k = m.form) && (e = c.get(k), g = e.encoding || e.enctype, j = m.data, 'multipart/form-data' != g.toLowerCase() ? (i = d.getFormData(e), m.hasContent ? (i = a.param(i, void 0, void 0, m.serializeArray), j ? m.data += '&' + i : m.data = i) : m.uri.query.add(i)) : (h = m.dataType, f = h[0], '*' == f && (f = 'text'), h.length = 2, h[0] = 'iframe', h[1] = f));
    }), b;
}, {
    requires: [
        './base',
        'dom',
        './form-serializer'
    ]
}), KISSY.add('ajax/iframe-transport', function (a, b, c, d) {
    'use strict';
    function e(c) {
        var d, e = a.guid('io-iframe'), f = b.getEmptyIframeSrc();
        return d = c.iframe = b.create('<iframe ' + (f ? ' src="' + f + '" ' : '') + ' id="' + e + '" name="' + e + '" style="position:absolute;left:-9999px;top:-9999px;"/>'), b.prepend(d, i.body || i.documentElement), d;
    }
    function f(c, d, e) {
        var f, g, h, j, k = [];
        return a.each(c, function (c, l) {
            for (f = a.isArray(c), g = a.makeArray(c), h = 0; h < g.length; h++)
                j = i.createElement('input'), j.type = 'hidden', j.name = l + (f && e ? '[]' : ''), j.value = g[h], b.append(j, d), k.push(j);
        }), k;
    }
    function g(a) {
        b.remove(a);
    }
    function h(b) {
        this.io = b, a.log('use IframeTransport for: ' + b.config.url);
    }
    var i = a.Env.host.document, j = 200, k = 500, l = 30;
    return d.setupConfig({
        converters: {
            iframe: d.getConfig().converters.text,
            text: {
                iframe: function (a) {
                    return a;
                }
            },
            xml: {
                iframe: function (a) {
                    return a;
                }
            }
        }
    }), a.augment(h, {
        send: function () {
            function d() {
                c.on(h, 'load error', j._callback, j), n.submit();
            }
            var g, h, i, j = this, k = j.io, l = k.config, m = l.data, n = b.get(l.form);
            j.attrs = {
                target: b.attr(n, 'target') || '',
                action: b.attr(n, 'action') || '',
                method: b.attr(n, 'method')
            }, j.form = n, h = e(k), b.attr(n, {
                target: h.id,
                action: k._getUrlForSend(),
                method: 'post'
            }), m && (i = a.unparam(m)), i && (g = f(i, n, l.serializeArray)), j.fields = g, 6 == a.UA.ie ? setTimeout(d, 0) : d();
        },
        _callback: function (d) {
            var e, f = this, h = f.form, i = f.io, m = d.type, n = i.iframe;
            if (n)
                if ('abort' == m && 6 == a.UA.ie ? setTimeout(function () {
                        b.attr(h, f.attrs);
                    }, 0) : b.attr(h, f.attrs), g(this.fields), c.detach(n), setTimeout(function () {
                        b.remove(n);
                    }, l), i.iframe = null, 'load' == m)
                    try {
                        e = n.contentWindow.document, e && e.body && (i.responseText = a.trim(b.text(e.body)), a.startsWith(i.responseText, '<?xml') && (i.responseText = void 0)), i.responseXML = e && e.XMLDocument ? e.XMLDocument : e, e ? i._ioReady(j, 'success') : i._ioReady(k, 'parser error');
                    } catch (o) {
                        i._ioReady(k, 'parser error');
                    }
                else
                    'error' == m && i._ioReady(k, 'error');
        },
        abort: function () {
            this._callback({ type: 'abort' });
        }
    }), d.setupTransport('iframe', h), d;
}, {
    requires: [
        'dom',
        'event',
        './base'
    ]
}), KISSY.add('ajax/jsonp', function (a, b) {
    var c = a.Env.host;
    return b.setupConfig({
        jsonp: 'callback',
        jsonpCallback: function () {
            return a.guid('jsonp');
        }
    }), b.on('start', function (b) {
        var d = b.io, e = d.config, f = e.dataType;
        if ('jsonp' == f[0]) {
            var g, h, i = e.jsonpCallback, j = a.isFunction(i) ? i() : i, k = c[j];
            e.uri.query.set(e.jsonp, j), c[j] = function (b) {
                arguments.length > 1 && (b = a.makeArray(arguments)), g = [b];
            }, d.fin(function () {
                if (c[j] = k, void 0 === k)
                    try {
                        delete c[j];
                    } catch (a) {
                    }
                else
                    g && k(g[0]);
            }), h = d.converters = d.converters || {}, h.script = h.script || {}, h.script.json = function () {
                return g || a.error(' not call jsonpCallback: ' + j), g[0];
            }, f.length = 2, f[0] = 'script', f[1] = 'json';
        }
    }), b;
}, { requires: ['./base'] }), KISSY.add('ajax/methods', function (a, b, c) {
    function d(b) {
        var d, e, f, g = b.responseText, h = b.responseXML, i = b.config, j = i.converters, k = b.converters || {}, l = i.contents, m = i.dataType;
        if (g || h) {
            for (e = b.mimeType || b.getResponseHeader('Content-Type'); '*' == m[0];)
                m.shift();
            if (!m.length)
                for (d in l)
                    if (l[d].test(e)) {
                        m[0] != d && m.unshift(d);
                        break;
                    }
            if (m[0] = m[0] || 'text', 'text' == m[0] && g !== c)
                f = g;
            else if ('xml' == m[0] && h !== c)
                f = h;
            else {
                var n = {
                        text: g,
                        xml: h
                    };
                a.each([
                    'text',
                    'xml'
                ], function (a) {
                    var b = m[0], d = k[a] && k[a][b] || j[a] && j[a][b];
                    return d && n[a] ? (m.unshift(a), f = 'text' == a ? g : h, !1) : c;
                });
            }
        }
        for (var o = m[0], p = 1; p < m.length; p++) {
            d = m[p];
            var q = k[o] && k[o][d] || j[o] && j[o][d];
            if (!q)
                throw 'no covert for ' + o + ' => ' + d;
            f = q(f), o = d;
        }
        b.responseData = f;
    }
    var e = 200, f = a.Promise, g = 300, h = 304, i = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
    a.extend(b, f, {
        setRequestHeader: function (a, b) {
            var c = this;
            return c.requestHeaders[a] = b, c;
        },
        getAllResponseHeaders: function () {
            var a = this;
            return 2 === a.state ? a.responseHeadersString : null;
        },
        getResponseHeader: function (a) {
            var b, d, e = this;
            if (2 === e.state) {
                if (!(d = e.responseHeaders))
                    for (d = e.responseHeaders = {}; b = i.exec(e.responseHeadersString);)
                        d[b[1]] = b[2];
                b = d[a];
            }
            return b === c ? null : b;
        },
        overrideMimeType: function (a) {
            var b = this;
            return b.state || (b.mimeType = a), b;
        },
        abort: function (a) {
            var b = this;
            return a = a || 'abort', b.transport && b.transport.abort(a), b._ioReady(0, a), b;
        },
        getNativeXhr: function () {
            var a;
            return (a = this.transport) ? a.nativeXhr : null;
        },
        _ioReady: function (b, c) {
            var f = this;
            if (2 != f.state) {
                f.state = 2, f.readyState = 4;
                var i;
                if (b >= e && g > b || b == h)
                    if (b == h)
                        c = 'not modified', i = !0;
                    else
                        try {
                            d(f), c = 'success', i = !0;
                        } catch (j) {
                            a.log(j.stack || j, 'error'), c = 'parser error';
                        }
                else
                    0 > b && (b = 0);
                f.status = b, f.statusText = c;
                var k = f._defer;
                k[i ? 'resolve' : 'reject']([
                    f.responseData,
                    c,
                    f
                ]);
            }
        },
        _getUrlForSend: function () {
            var b = this.config, c = b.uri, d = a.Uri.getComponents(b.url).query || '', e = c.toString(b.serializeArray);
            return e + (d ? (c.query.has() ? '&' : '?') + d : d);
        }
    });
}, { requires: ['./base'] }), KISSY.add('ajax/script-transport', function (a, b, c, d) {
    function e(c) {
        var d = c.config;
        return d.crossDomain ? (this.io = c, a.log('use ScriptTransport for: ' + d.url), this) : new (b.getTransport('*'))(c);
    }
    var f = a.Env.host, g = f.document, h = 200, i = 500;
    return b.setupConfig({
        accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
        contents: { script: /javascript|ecmascript/ },
        converters: {
            text: {
                script: function (b) {
                    return a.globalEval(b), b;
                }
            }
        }
    }), a.augment(e, {
        send: function () {
            var a, b = this, c = b.io, d = c.config, e = g.head || g.getElementsByTagName('head')[0] || g.documentElement;
            b.head = e, a = g.createElement('script'), b.script = a, a.async = !0, d.scriptCharset && (a.charset = d.scriptCharset), a.src = c._getUrlForSend(), a.onerror = a.onload = a.onreadystatechange = function (a) {
                a = a || f.event, b._callback((a.type || 'error').toLowerCase());
            }, e.insertBefore(a, e.firstChild);
        },
        _callback: function (a, b) {
            var c = this, e = c.script, f = c.io, g = c.head;
            e && (b || !e.readyState || /loaded|complete/.test(e.readyState) || 'error' == a) && (e.onerror = e.onload = e.onreadystatechange = null, g && e.parentNode && g.removeChild(e), c.script = d, c.head = d, b || 'error' == a ? 'error' == a && f._ioReady(i, 'script error') : f._ioReady(h, 'success'));
        },
        abort: function () {
            this._callback(0, 1);
        }
    }), b.setupTransport('script', e), b;
}, {
    requires: [
        './base',
        './xhr-transport'
    ]
}), KISSY.add('ajax/sub-domain-transport', function (a, b, c, d) {
    function e(b) {
        var c = this, d = b.config;
        c.io = b, d.crossDomain = !1, a.log('use SubDomainTransport for: ' + d.url);
    }
    function f() {
        var a = this, b = a.io.config, d = b.uri, e = d.getHostname(), g = i[e];
        g.ready = 1, c.detach(g.iframe, 'load', f, a), a.send();
    }
    var g = '/sub_domain_proxy.html', h = a.Env.host.document, i = {};
    return a.augment(e, b.proto, {
        send: function () {
            var e, j, k = this, l = k.io.config, m = l.uri, n = m.getHostname(), o = i[n], p = g;
            return l.xdr && l.xdr.subDomain && l.xdr.subDomain.proxy && (p = l.xdr.subDomain.proxy), o && o.ready ? (k.nativeXhr = b.nativeXhr(0, o.iframe.contentWindow), k.nativeXhr ? k.sendInternal() : a.error('document.domain not set correctly!'), void 0) : (o ? e = o.iframe : (o = i[n] = {}, e = o.iframe = h.createElement('iframe'), d.css(e, {
                position: 'absolute',
                left: '-9999px',
                top: '-9999px'
            }), d.prepend(e, h.body || h.documentElement), j = new a.Uri(), j.setScheme(m.getScheme()), j.setPort(m.getPort()), j.setHostname(n), j.setPath(p), e.src = j.toString()), c.on(e, 'load', f, k), void 0);
        }
    }), e;
}, {
    requires: [
        './xhr-transport-base',
        'event',
        'dom'
    ]
}), KISSY.add('ajax/xdr-flash-transport', function (a, b, c) {
    function d(a, b, d) {
        if (!j) {
            j = !0;
            var e = '<object id="' + h + '" type="application/x-shockwave-flash" data="' + a + '" width="0" height="0"><param name="movie" value="' + a + '" /><param name="FlashVars" value="yid=' + b + '&uid=' + d + '&host=KISSY.IO" /><param name="allowScriptAccess" value="always" /></object>', f = i.createElement('div');
            c.prepend(f, i.body || i.documentElement), f.innerHTML = e;
        }
    }
    function e(b) {
        a.log('use XdrFlashTransport for: ' + b.config.url), this.io = b;
    }
    var f, g = {}, h = 'io_swf', i = a.Env.host.document, j = !1;
    return a.augment(e, {
        send: function () {
            var b = this, c = b.io, e = c.config, h = e.xdr || {};
            return d(h.src || a.Config.base + 'ajax/io.swf', 1, 1), f ? (b._uid = a.guid(), g[b._uid] = b, f.send(c._getUrlForSend(), {
                id: b._uid,
                uid: b._uid,
                method: e.type,
                data: e.hasContent && e.data || {}
            }), void 0) : (setTimeout(function () {
                b.send();
            }, 200), void 0);
        },
        abort: function () {
            f.abort(this._uid);
        },
        _xdrResponse: function (a, b) {
            var c, d, e = this, f = b.id, h = b.c, i = e.io;
            switch (h && (d = h.responseText) && (i.responseText = decodeURI(d)), a) {
            case 'success':
                c = {
                    status: 200,
                    statusText: 'success'
                }, delete g[f];
                break;
            case 'abort':
                delete g[f];
                break;
            case 'timeout':
            case 'transport error':
            case 'failure':
                delete g[f], c = {
                    status: 'status' in h ? h.status : 500,
                    statusText: h.statusText || a
                };
            }
            c && i._ioReady(c.status, c.statusText);
        }
    }), b.applyTo = function (c, d, e) {
        var f = d.split('.').slice(1), g = b;
        a.each(f, function (a) {
            g = g[a];
        }), g.apply(null, e);
    }, b.xdrReady = function () {
        f = i.getElementById(h);
    }, b.xdrResponse = function (a, b) {
        var c = g[b.uid];
        c && c._xdrResponse(a, b);
    }, e;
}, {
    requires: [
        './base',
        'dom'
    ]
}), KISSY.add('ajax/xhr-transport-base', function (a, b) {
    function c(b, c) {
        try {
            return new (c || h).XMLHttpRequest();
        } catch (d) {
            a.log('createStandardXHR error: ' + b);
        }
        return void 0;
    }
    function d(b, c) {
        try {
            return new (c || h).ActiveXObject('Microsoft.XMLHTTP');
        } catch (d) {
            a.log('createActiveXHR error: ' + b);
        }
        return void 0;
    }
    function e(a) {
        return i && a instanceof i;
    }
    function f(a) {
        var b, c = a.ifModified;
        return c && (b = a.uri, a.cache === !1 && (b = b.clone(), b.query.remove('_ksTS')), b = b.toString()), b;
    }
    var g = 200, h = a.Env.host, i = a.UA.ie > 7 && h.XDomainRequest, j = 204, k = 404, l = 1223, m = { proto: {} }, n = {}, o = {};
    return b.__lastModifiedCached = n, b.__eTagCached = o, m.nativeXhr = h.ActiveXObject ? function (a, e) {
        return !m.supportCORS && a && i ? new i() : !b.isLocal && c(a, e) || d(a, e);
    } : c, m._XDomainRequest = i, m.supportCORS = 'withCredentials' in m.nativeXhr(), a.mix(m.proto, {
        sendInternal: function () {
            var a, b, c, d, g = this, h = g.io, i = h.config, j = g.nativeXhr, k = i.type, l = i.async, m = h.mimeType, p = h.requestHeaders || {}, q = h._getUrlForSend(), r = f(i);
            if (r && ((c = n[r]) && (p['If-Modified-Since'] = c), (c = o[r]) && (p['If-None-Match'] = c)), (a = i.username) ? j.open(k, q, l, a, i.password) : j.open(k, q, l), b = i.xhrFields)
                for (d in b)
                    j[d] = b[d];
            if (m && j.overrideMimeType && j.overrideMimeType(m), p['X-Requested-With'] === !1 && delete p['X-Requested-With'], 'undefined' != typeof j.setRequestHeader)
                for (d in p)
                    j.setRequestHeader(d, p[d]);
            j.send(i.hasContent && i.data || null), l && 4 != j.readyState ? e(j) ? (j.onload = function () {
                j.readyState = 4, j.status = 200, g._callback();
            }, j.onerror = function () {
                j.readyState = 4, j.status = 500, g._callback();
            }) : j.onreadystatechange = function () {
                g._callback();
            } : g._callback();
        },
        abort: function () {
            this._callback(0, 1);
        },
        _callback: function (c, d) {
            var h, i, m, p, q, r = this, s = r.nativeXhr, t = r.io, u = t.config;
            try {
                if (d || 4 == s.readyState)
                    if (e(s) ? (s.onerror = a.noop, s.onload = a.noop) : s.onreadystatechange = a.noop, d)
                        4 !== s.readyState && s.abort();
                    else {
                        h = f(u);
                        var v = s.status;
                        e(s) || (t.responseHeadersString = s.getAllResponseHeaders()), h && (i = s.getResponseHeader('Last-Modified'), m = s.getResponseHeader('ETag'), i && (n[h] = i), m && (o[m] = m)), q = s.responseXML, q && q.documentElement && (t.responseXML = q), t.responseText = s.responseText;
                        try {
                            p = s.statusText;
                        } catch (w) {
                            a.log('xhr statusText error: '), a.log(w), p = '';
                        }
                        v || !b.isLocal || u.crossDomain ? v === l && (v = j) : v = t.responseText ? g : k, t._ioReady(v, p);
                    }
            } catch (x) {
                s.onreadystatechange = a.noop, d || t._ioReady(-1, x);
            }
        }
    }), m;
}, { requires: ['./base'] }), KISSY.add('ajax/xhr-transport', function (a, b, c, d, e) {
    function f(b) {
        return i.domain && a.endsWith(b, i.domain);
    }
    function g(b) {
        var g, h = b.config, i = h.crossDomain, k = this, l = h.xdr || {}, m = l.subDomain = l.subDomain || {};
        if (k.io = b, i) {
            if (f(h.uri.getHostname()) && m.proxy !== !1)
                return new d(b);
            if (!(c.supportCORS || 'flash' !== String(l.use) && j))
                return new e(b);
        }
        return g = k.nativeXhr = c.nativeXhr(i), a.log('crossDomain: ' + i + ', use ' + (j && g instanceof j ? 'XDomainRequest' : 'XhrTransport') + ' for: ' + h.url), k;
    }
    var h = a.Env.host, i = h.document, j = c._XDomainRequest;
    return a.augment(g, c.proto, {
        send: function () {
            this.sendInternal();
        }
    }), b.setupTransport('*', g), b;
}, {
    requires: [
        './base',
        './xhr-transport-base',
        './sub-domain-transport',
        './xdr-flash-transport'
    ]
}), KISSY.add('cookie', function (a) {
    function b(a) {
        return 'string' == typeof a && '' !== a;
    }
    var c = a.Env.host.document, d = 86400000, e = encodeURIComponent, f = a.urlDecode;
    return a.Cookie = {
        get: function (a) {
            var d, e;
            return b(a) && (e = String(c.cookie).match(new RegExp('(?:^| )' + a + '(?:(?:=([^;]*))|;|$)'))) && (d = e[1] ? f(e[1]) : ''), d;
        },
        set: function (a, f, g, h, i, j) {
            var k = String(e(f)), l = g;
            'number' == typeof l && (l = new Date(), l.setTime(l.getTime() + g * d)), l instanceof Date && (k += '; expires=' + l.toUTCString()), b(h) && (k += '; domain=' + h), b(i) && (k += '; path=' + i), j && (k += '; secure'), c.cookie = a + '=' + k;
        },
        remove: function (a, b, c, d) {
            this.set(a, '', -1, b, c, d);
        }
    };
}), KISSY.add('base/attribute', function (a, b) {
    function c(a, b) {
        return 'string' == typeof b ? a[b] : b;
    }
    function d(b, c, d, e, f, g, h) {
        return h = h || d, b.fire(c + a.ucfirst(d) + 'Change', {
            attrName: h,
            subAttrName: g,
            prevVal: e,
            newVal: f
        });
    }
    function e(a, b, c) {
        var d = a[b] || {};
        return c && (a[b] = d), d;
    }
    function f(a) {
        return e(a, '__attrs', !0);
    }
    function g(a) {
        return e(a, '__attrVals', !0);
    }
    function h(a, c) {
        for (var d = 0, e = c.length; a != b && e > d; d++)
            a = a[c[d]];
        return a;
    }
    function i(a, c, d) {
        var e = c.length - 1, f = a;
        if (e >= 0) {
            for (var g = 0; e > g; g++)
                a = a[c[g]];
            a != b ? a[c[g]] = d : f = b;
        }
        return f;
    }
    function j(a, b) {
        var c, d = a.hasAttr(b);
        return d || -1 === b.indexOf('.') || (c = b.split('.'), b = c.shift()), {
            path: c,
            name: b
        };
    }
    function k(c, d, e) {
        var f = e;
        return d && (f = c === b ? {} : a.clone(c), i(f, d, e)), f;
    }
    function l(a, c, e, f, i) {
        f = f || {};
        var l, m, n, o, p = j(a, c), q = c;
        return c = p.name, m = p.path, o = a.get(c), m && (n = h(o, m)), m || o !== e ? m && n === e ? b : (e = k(o, m, e), f.silent || !1 !== d(a, 'before', c, o, e, q) ? (l = a.setInternal(c, e, f), l === !1 ? l : (f.silent || (e = g(a)[c], d(a, 'after', c, o, e, q), i ? i.push({
            prevVal: o,
            newVal: e,
            attrName: c,
            subAttrName: q
        }) : d(a, '', '*', [o], [e], [q], [c])), a)) : !1) : b;
    }
    function m() {
    }
    function n(a, d) {
        var g, h = f(a), i = e(h, d), j = i.valueFn;
        return j && (j = c(a, j)) && (g = j.call(a), g !== b && (i.value = g), delete i.valueFn, h[d] = i), i.value;
    }
    function o(a, d, g, h) {
        var i, l, m;
        m = j(a, d), d = m.name, i = m.path, i && (l = a.get(d), g = k(l, i, g));
        var n, o = e(f(a), d, !0), p = o.validator;
        return p && (p = c(a, p)) && (n = p.call(a, g, d, h), n !== b && n !== !0) ? n : b;
    }
    m.INVALID = {};
    var p = m.INVALID;
    return m.prototype = {
        getAttrs: function () {
            return f(this);
        },
        getAttrVals: function () {
            var a, b = this, c = {}, d = f(b);
            for (a in d)
                c[a] = b.get(a);
            return c;
        },
        addAttr: function (b, c, d) {
            var e = this, g = f(e), h = a.clone(c);
            return g[b] ? a.mix(g[b], h, d) : g[b] = h, e;
        },
        addAttrs: function (b, c) {
            var d = this;
            return a.each(b, function (a, b) {
                d.addAttr(b, a);
            }), c && d.set(c), d;
        },
        hasAttr: function (a) {
            return f(this).hasOwnProperty(a);
        },
        removeAttr: function (a) {
            var b = this;
            return b.hasAttr(a) && (delete f(b)[a], delete g(b)[a]), b;
        },
        set: function (c, e, f) {
            var g = this;
            if (a.isPlainObject(c)) {
                f = e;
                var h, i = Object(c), j = [], k = [];
                for (c in i)
                    (h = o(g, c, i[c], i)) !== b && k.push(h);
                if (k.length)
                    return f && f.error && f.error(k), !1;
                for (c in i)
                    l(g, c, i[c], f, j);
                var m = [], n = [], p = [], q = [];
                return a.each(j, function (a) {
                    n.push(a.prevVal), p.push(a.newVal), m.push(a.attrName), q.push(a.subAttrName);
                }), m.length && d(g, '', '*', n, p, q, m), g;
            }
            return l(g, c, e, f);
        },
        setInternal: function (a, d, h) {
            var i, j, k = this, l = e(f(k), a, !0), m = l.setter;
            return j = o(k, a, d), j !== b ? (h.error && h.error(j), !1) : (m && (m = c(k, m)) && (i = m.call(k, d, a)), i === p ? !1 : (i !== b && (d = i), g(k)[a] = d, void 0));
        },
        get: function (a) {
            var d, i, j, k, l = this, m = '.', o = l.hasAttr(a), p = g(l);
            return o || -1 === a.indexOf(m) || (d = a.split(m), a = d.shift()), i = e(f(l), a), j = i.getter, k = a in p ? p[a] : n(l, a), j && (j = c(l, j)) && (k = j.call(l, k, a)), a in p || k === b || (p[a] = k), d && (k = h(k, d)), k;
        },
        reset: function (a, b) {
            var c = this;
            if ('string' == typeof a)
                return c.hasAttr(a) ? c.set(a, n(c, a), b) : c;
            b = a;
            var d = f(c), e = {};
            for (a in d)
                e[a] = n(c, a);
            return c.set(e, b), c;
        }
    }, m;
}), KISSY.add('base', function (a, b, c) {
    function d(a) {
        var b = this, c = b.constructor;
        for (b.userConfig = a; c;)
            e(b, c.ATTRS), c = c.superclass ? c.superclass.constructor : null;
        f(b, a);
    }
    function e(a, b) {
        if (b)
            for (var c in b)
                a.addAttr(c, b[c], !1);
    }
    function f(a, b) {
        if (b)
            for (var c in b)
                a.setInternal(c, b[c]);
    }
    return a.augment(d, c.Target, b), d.Attribute = b, a.Base = d, d;
}, {
    requires: [
        'base/attribute',
        'event/custom'
    ]
}), KISSY.add('anim', function (a, b, c) {
    return b.Easing = c, a.mix(a, {
        Anim: b,
        Easing: b.Easing
    }), b;
}, {
    requires: [
        'anim/base',
        'anim/easing',
        'anim/color',
        'anim/background-position'
    ]
}), KISSY.add('anim/background-position', function (a, b, c, d) {
    function e(a) {
        a = a.replace(/left|top/g, '0px').replace(/right|bottom/g, '100%').replace(/([0-9\.]+)(\s|\)|$)/g, '$1px$2');
        var b = a.match(/(-?[0-9\.]+)(px|%|em|pt)\s(-?[0-9\.]+)(px|%|em|pt)/);
        return [
            parseFloat(b[1]),
            b[2],
            parseFloat(b[3]),
            b[4]
        ];
    }
    function f() {
        f.superclass.constructor.apply(this, arguments);
    }
    return a.extend(f, d, {
        load: function () {
            var b, c = this;
            if (f.superclass.load.apply(c, arguments), b = c.unit = [
                    'px',
                    'px'
                ], c.from) {
                var d = e(c.from);
                c.from = [
                    d[0],
                    d[2]
                ], b = [
                    d[1],
                    d[3]
                ];
            } else
                c.from = [
                    0,
                    0
                ];
            if (c.to) {
                var g = e(c.to);
                c.to = [
                    g[0],
                    g[2]
                ], c.unit = [
                    g[1],
                    g[3]
                ];
            } else
                c.to = [
                    0,
                    0
                ];
            b && (b[0] !== c.unit[0] || b[1] !== c.unit[1]) && (a.log('BackgroundPosition x y unit is not same :', 'warn'), a.log(b, 'warn'), a.log(c.unit, 'warn'));
        },
        interpolate: function (a, b, c) {
            var d = this.unit, e = f.superclass.interpolate;
            return e(a[0], b[0], c) + d[0] + ' ' + e(a[1], b[1], c) + d[1];
        },
        cur: function () {
            return b.css(this.anim.config.el, 'backgroundPosition');
        },
        update: function () {
            var a = this, c = a.prop, d = a.anim.config.el, e = a.from, f = a.to, g = a.interpolate(e, f, a.pos);
            b.css(d, c, g);
        }
    }), d.Factories.backgroundPosition = f, f;
}, {
    requires: [
        'dom',
        './base',
        './fx'
    ]
}), KISSY.add('anim/base', function (a, b, c, d, e, f, g) {
    function h(c, d, e, f, g) {
        if (c.el) {
            var j = c.el;
            return d = c.props, delete c.el, delete c.props, new h(j, d, c);
        }
        var k, l = this;
        if (c = b.get(c)) {
            if (!(l instanceof h))
                return new h(c, d, e, f, g);
            d = 'string' == typeof d ? a.unparam(String(d), ';', ':') : a.clone(d), a.each(d, function (b, c) {
                var e = a.trim(t(c));
                e ? c != e && (d[e] = d[c], delete d[c]) : delete d[c];
            }), k = a.isPlainObject(e) ? a.clone(e) : {
                duration: parseFloat(e) || void 0,
                easing: f,
                complete: g
            }, k = a.merge(x, k), k.el = c, k.props = d, l.config = k, l._duration = 1000 * k.duration, l.domEl = c, l._backupProps = {}, l._fxs = {}, l.on('complete', i);
        }
    }
    function i(c) {
        var d, e, f = this, g = f.config;
        a.isEmptyObject(d = f._backupProps) || b.css(g.el, d), (e = g.complete) && e.call(f, c);
    }
    function j() {
        var c, g, h, i, j = this, l = j.config, m = j._backupProps, n = l.el, o = l.specialEasing || {}, p = j._fxs, q = l.props;
        if (k(j), j.fire('beforeStart') === !1)
            return j.stop(0), void 0;
        if (n.nodeType == u.ELEMENT_NODE) {
            g = 'none' === b.css(n, 'display');
            for (i in q)
                if (h = q[i], 'hide' == h && g || 'show' == h && !g)
                    return j.stop(1), void 0;
        }
        n.nodeType == u.ELEMENT_NODE && (q.width || q.height) && (c = n.style, a.mix(m, {
            overflow: c.overflow,
            'overflow-x': c.overflowX,
            'overflow-y': c.overflowY
        }), c.overflow = 'hidden', 'inline' === b.css(n, 'display') && 'none' === b.css(n, 'float') && (s.ie ? c.zoom = 1 : c.display = 'inline-block')), a.each(q, function (b, c) {
            var e;
            a.isArray(b) ? (e = o[c] = b[1], q[c] = b[0]) : e = o[c] = o[c] || l.easing, 'string' == typeof e && (e = o[c] = d[e]), o[c] = e || d.easeNone;
        }), a.each(w, function (c, d) {
            var e, f;
            (f = q[d]) && (e = {}, a.each(c, function (a) {
                e[a] = b.css(n, a), o[a] = o[d];
            }), b.css(n, d, f), a.each(e, function (a, c) {
                q[c] = b.css(n, c), b.css(n, c, a);
            }), delete q[d]);
        });
        for (i in q) {
            h = a.trim(q[i]);
            var r, t, x = {
                    prop: i,
                    anim: j,
                    easing: o[i]
                }, z = f.getFx(x);
            a.inArray(h, v) ? (m[i] = b.style(n, i), 'toggle' == h && (h = g ? 'show' : 'hide'), 'hide' == h ? (r = 0, t = z.cur(), m.display = 'none') : (t = 0, r = z.cur(), b.css(n, i, t), b.show(n)), h = r) : (r = h, t = z.cur()), h += '';
            var A = '', B = h.match(y);
            B && (r = parseFloat(B[2]), A = B[3], A && 'px' !== A && (b.css(n, i, h), t = r / z.cur() * t, b.css(n, i, t + A)), B[1] && (r = ('-=' === B[1] ? -1 : 1) * r + t)), x.from = t, x.to = r, x.unit = A, z.load(x), p[i] = z;
        }
        j._startTime = a.now(), e.start(j);
    }
    function k(c) {
        var d = c.config.el, e = b.data(d, z);
        e || b.data(d, z, e = {}), e[a.stamp(c)] = c;
    }
    function l(c) {
        var d = c.config.el, e = b.data(d, z);
        e && (delete e[a.stamp(c)], a.isEmptyObject(e) && b.removeData(d, z));
    }
    function m(c) {
        var d = c.config.el, e = b.data(d, z);
        return e ? !!e[a.stamp(c)] : 0;
    }
    function n(c) {
        var d = c.config.el, e = b.data(d, A);
        e || b.data(d, A, e = {}), e[a.stamp(c)] = c;
    }
    function o(c) {
        var d = c.config.el, e = b.data(d, A);
        e && (delete e[a.stamp(c)], a.isEmptyObject(e) && b.removeData(d, A));
    }
    function p(c) {
        var d = c.config.el, e = b.data(d, A);
        return e ? !!e[a.stamp(c)] : 0;
    }
    function q(c, d, e) {
        var f = b.data(c, 'resume' == e ? A : z), g = a.merge(f);
        a.each(g, function (a) {
            (void 0 === d || a.config.queue == d) && a[e]();
        });
    }
    function r(c, d, e, f) {
        e && f !== !1 && g.removeQueue(c, f);
        var h = b.data(c, z), i = a.merge(h);
        a.each(i, function (a) {
            a.config.queue == f && a.stop(d);
        });
    }
    var s = a.UA, t = b._camelCase, u = b.NodeType, v = [
            'hide',
            'show',
            'toggle'
        ], w = {
            background: ['backgroundPosition'],
            border: [
                'borderBottomWidth',
                'borderLeftWidth',
                'borderRightWidth',
                'borderTopWidth'
            ],
            borderBottom: ['borderBottomWidth'],
            borderLeft: ['borderLeftWidth'],
            borderTop: ['borderTopWidth'],
            borderRight: ['borderRightWidth'],
            font: [
                'fontSize',
                'fontWeight'
            ],
            margin: [
                'marginBottom',
                'marginLeft',
                'marginRight',
                'marginTop'
            ],
            padding: [
                'paddingBottom',
                'paddingLeft',
                'paddingRight',
                'paddingTop'
            ]
        }, x = {
            duration: 1,
            easing: 'easeNone'
        }, y = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
    h.SHORT_HANDS = w, h.prototype = {
        constructor: h,
        isRunning: function () {
            return m(this);
        },
        isPaused: function () {
            return p(this);
        },
        pause: function () {
            var b = this;
            return b.isRunning() && (b._pauseDiff = a.now() - b._startTime, e.stop(b), l(b), n(b)), b;
        },
        resume: function () {
            var b = this;
            return b.isPaused() && (b._startTime = a.now() - b._pauseDiff, o(b), k(b), e.start(b)), b;
        },
        _runInternal: j,
        run: function () {
            var a = this, b = a.config.queue;
            return b === !1 ? j.call(a) : g.queue(a), a;
        },
        _frame: function () {
            var a, b, c, d = this, e = d.config, f = 1, g = d._fxs;
            for (a in g)
                (c = g[a]).finished || (e.frame && (b = e.frame(c)), 1 == b || 0 == b ? (c.finished = b, f &= b) : (f &= c.frame(), f && e.frame && e.frame(c)));
            (d.fire('step') === !1 || f) && d.stop(f);
        },
        stop: function (a) {
            var b, c, d = this, f = d.config, h = f.queue, i = d._fxs;
            if (!d.isRunning())
                return h !== !1 && g.remove(d), d;
            if (a) {
                for (b in i)
                    (c = i[b]).finished || (f.frame ? f.frame(c, 1) : c.frame(1));
                d.fire('complete');
            }
            return e.stop(d), l(d), h !== !1 && g.dequeue(d), d;
        }
    }, a.augment(h, c.Target);
    var z = a.guid('ks-anim-unqueued-' + a.now() + '-'), A = a.guid('ks-anim-paused-' + a.now() + '-');
    return h.stop = function (c, d, e, f) {
        if (null === f || 'string' == typeof f || f === !1)
            return r.apply(void 0, arguments);
        e && g.removeQueues(c);
        var h = b.data(c, z), i = a.merge(h);
        a.each(i, function (a) {
            a.stop(d);
        });
    }, a.each([
        'pause',
        'resume'
    ], function (a) {
        h[a] = function (b, c) {
            return null === c || 'string' == typeof c || c === !1 ? q(b, c, a) : (q(b, void 0, a), void 0);
        };
    }), h.isRunning = function (c) {
        var d = b.data(c, z);
        return d && !a.isEmptyObject(d);
    }, h.isPaused = function (c) {
        var d = b.data(c, A);
        return d && !a.isEmptyObject(d);
    }, h.Q = g, h;
}, {
    requires: [
        'dom',
        'event',
        './easing',
        './manager',
        './fx',
        './queue'
    ]
}), KISSY.add('anim/color', function (a, b, c, d) {
    function e(b) {
        b += '';
        var c;
        if (c = b.match(j))
            return [
                parseInt(c[1]),
                parseInt(c[2]),
                parseInt(c[3])
            ];
        if (c = b.match(k))
            return [
                parseInt(c[1]),
                parseInt(c[2]),
                parseInt(c[3]),
                parseInt(c[4])
            ];
        if (c = b.match(l)) {
            for (var d = 1; d < c.length; d++)
                c[d].length < 2 && (c[d] += c[d]);
            return [
                parseInt(c[1], g),
                parseInt(c[2], g),
                parseInt(c[3], g)
            ];
        }
        return i[b = b.toLowerCase()] ? i[b] : (a.log('only allow rgb or hex color string : ' + b, 'warn'), [
            255,
            255,
            255
        ]);
    }
    function f() {
        f.superclass.constructor.apply(this, arguments);
    }
    var g = 16, h = Math.floor, i = {
            black: [
                0,
                0,
                0
            ],
            silver: [
                192,
                192,
                192
            ],
            gray: [
                128,
                128,
                128
            ],
            white: [
                255,
                255,
                255
            ],
            maroon: [
                128,
                0,
                0
            ],
            red: [
                255,
                0,
                0
            ],
            purple: [
                128,
                0,
                128
            ],
            fuchsia: [
                255,
                0,
                255
            ],
            green: [
                0,
                128,
                0
            ],
            lime: [
                0,
                255,
                0
            ],
            olive: [
                128,
                128,
                0
            ],
            yellow: [
                255,
                255,
                0
            ],
            navy: [
                0,
                0,
                128
            ],
            blue: [
                0,
                0,
                255
            ],
            teal: [
                0,
                128,
                128
            ],
            aqua: [
                0,
                255,
                255
            ]
        }, j = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i, k = /^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+),\s*([0-9]+)\)$/i, l = /^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i, m = c.SHORT_HANDS, n = [
            'backgroundColor',
            'borderBottomColor',
            'borderLeftColor',
            'borderRightColor',
            'borderTopColor',
            'color',
            'outlineColor'
        ];
    return m.background = m.background || [], m.background.push('backgroundColor'), m.borderColor = [
        'borderBottomColor',
        'borderLeftColor',
        'borderRightColor',
        'borderTopColor'
    ], m.border.push('borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor'), m.borderBottom.push('borderBottomColor'), m.borderLeft.push('borderLeftColor'), m.borderRight.push('borderRightColor'), m.borderTop.push('borderTopColor'), a.extend(f, d, {
        load: function () {
            var a = this;
            f.superclass.load.apply(a, arguments), a.from && (a.from = e(a.from)), a.to && (a.to = e(a.to));
        },
        interpolate: function (b, c, d) {
            var e = f.superclass.interpolate;
            return 3 == b.length && 3 == c.length ? 'rgb(' + [
                h(e(b[0], c[0], d)),
                h(e(b[1], c[1], d)),
                h(e(b[2], c[2], d))
            ].join(', ') + ')' : 4 == b.length || 4 == c.length ? 'rgba(' + [
                h(e(b[0], c[0], d)),
                h(e(b[1], c[1], d)),
                h(e(b[2], c[2], d)),
                h(e(b[3] || 1, c[3] || 1, d))
            ].join(', ') + ')' : (a.log('anim/color unknown value : ' + b), void 0);
        }
    }), a.each(n, function (a) {
        d.Factories[a] = f;
    }), f;
}, {
    requires: [
        'dom',
        './base',
        './fx'
    ]
}), KISSY.add('anim/easing', function () {
    var a = Math.PI, b = Math.pow, c = Math.sin, d = 1.70158, e = {
            swing: function (b) {
                return -Math.cos(b * a) / 2 + 0.5;
            },
            easeNone: function (a) {
                return a;
            },
            easeIn: function (a) {
                return a * a;
            },
            easeOut: function (a) {
                return (2 - a) * a;
            },
            easeBoth: function (a) {
                return (a *= 2) < 1 ? 0.5 * a * a : 0.5 * (1 - --a * (a - 2));
            },
            easeInStrong: function (a) {
                return a * a * a * a;
            },
            easeOutStrong: function (a) {
                return 1 - --a * a * a * a;
            },
            easeBothStrong: function (a) {
                return (a *= 2) < 1 ? 0.5 * a * a * a * a : 0.5 * (2 - (a -= 2) * a * a * a);
            },
            elasticIn: function (d) {
                var e = 0.3, f = e / 4;
                return 0 === d || 1 === d ? d : -(b(2, 10 * (d -= 1)) * c(2 * (d - f) * a / e));
            },
            elasticOut: function (d) {
                var e = 0.3, f = e / 4;
                return 0 === d || 1 === d ? d : b(2, -10 * d) * c(2 * (d - f) * a / e) + 1;
            },
            elasticBoth: function (d) {
                var e = 0.45, f = e / 4;
                return 0 === d || 2 === (d *= 2) ? d : 1 > d ? -0.5 * b(2, 10 * (d -= 1)) * c(2 * (d - f) * a / e) : b(2, -10 * (d -= 1)) * c(2 * (d - f) * a / e) * 0.5 + 1;
            },
            backIn: function (a) {
                return 1 === a && (a -= 0.001), a * a * ((d + 1) * a - d);
            },
            backOut: function (a) {
                return (a -= 1) * a * ((d + 1) * a + d) + 1;
            },
            backBoth: function (a) {
                var b = d, c = (b *= 1.525) + 1;
                return (a *= 2) < 1 ? 0.5 * a * a * (c * a - b) : 0.5 * ((a -= 2) * a * (c * a + b) + 2);
            },
            bounceIn: function (a) {
                return 1 - e.bounceOut(1 - a);
            },
            bounceOut: function (a) {
                var b, c = 7.5625;
                return b = 1 / 2.75 > a ? c * a * a : 2 / 2.75 > a ? c * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? c * (a -= 2.25 / 2.75) * a + 0.9375 : c * (a -= 2.625 / 2.75) * a + 0.984375;
            },
            bounceBoth: function (a) {
                return 0.5 > a ? 0.5 * e.bounceIn(2 * a) : 0.5 * e.bounceOut(2 * a - 1) + 0.5;
            }
        };
    return e;
}), KISSY.add('anim/fx', function (a, b, c) {
    function d(a) {
        this.load(a);
    }
    function e(a, d) {
        return a.style && null != a.style[d] || null == b.attr(a, d, c, 1) ? 0 : 1;
    }
    return d.prototype = {
        constructor: d,
        load: function (b) {
            var c = this;
            a.mix(c, b), c.pos = 0, c.unit = c.unit || '';
        },
        frame: function (b) {
            var c, d = this, e = d.anim, f = 0;
            if (d.finished)
                return 1;
            var g = a.now(), h = e._startTime, i = e._duration;
            return b || g >= i + h ? (d.pos = 1, f = 1) : (c = g - h, d.pos = d.easing(c / i)), d.update(), d.finished = d.finished || f, f;
        },
        interpolate: function (b, d, e) {
            return a.isNumber(b) && a.isNumber(d) ? (b + (d - b) * e).toFixed(3) : c;
        },
        update: function () {
            var d = this, f = d.anim, g = d.prop, h = f.config.el, i = d.from, j = d.to, k = d.interpolate(i, j, d.pos);
            k === c ? d.finished || (d.finished = 1, b.css(h, g, j), a.log(g + ' update directly ! : ' + k + ' : ' + i + ' : ' + j)) : (k += d.unit, e(h, g) ? b.attr(h, g, k, 1) : b.css(h, g, k));
        },
        cur: function () {
            var a = this, d = a.prop, f = a.anim.config.el;
            if (e(f, d))
                return b.attr(f, d, c, 1);
            var g, h = b.css(f, d);
            return isNaN(g = parseFloat(h)) ? h && 'auto' !== h ? h : 0 : g;
        }
    }, d.Factories = {}, d.getFx = function (a) {
        var b = d.Factories[a.prop] || d;
        return new b(a);
    }, d;
}, { requires: ['dom'] }), KISSY.add('anim/manager', function (a) {
    var b = a.stamp;
    return {
        interval: 15,
        runnings: {},
        timer: null,
        start: function (a) {
            var c = this, d = b(a);
            c.runnings[d] || (c.runnings[d] = a, c.startTimer());
        },
        stop: function (a) {
            this.notRun(a);
        },
        notRun: function (c) {
            var d = this, e = b(c);
            delete d.runnings[e], a.isEmptyObject(d.runnings) && d.stopTimer();
        },
        pause: function (a) {
            this.notRun(a);
        },
        resume: function (a) {
            this.start(a);
        },
        startTimer: function () {
            var a = this;
            a.timer || (a.timer = setTimeout(function () {
                a.runFrames() ? a.stopTimer() : (a.timer = 0, a.startTimer());
            }, a.interval));
        },
        stopTimer: function () {
            var a = this, b = a.timer;
            b && (clearTimeout(b), a.timer = 0);
        },
        runFrames: function () {
            var a, b = this, c = 1, d = b.runnings;
            for (a in d)
                c = 0, d[a]._frame();
            return c;
        }
    };
}), KISSY.add('anim/queue', function (a, b) {
    function c(a, c, d) {
        c = c || f;
        var g, h = b.data(a, e);
        return h || d || b.data(a, e, h = {}), h && (g = h[c], g || d || (g = h[c] = [])), g;
    }
    function d(c, d) {
        d = d || f;
        var g = b.data(c, e);
        g && delete g[d], a.isEmptyObject(g) && b.removeData(c, e);
    }
    var e = a.guid('ks-queue-' + a.now() + '-'), f = a.guid('ks-queue-' + a.now() + '-'), g = '...', h = {
            queueCollectionKey: e,
            queue: function (a) {
                var b = a.config.el, d = a.config.queue, e = c(b, d);
                return e.push(a), e[0] !== g && h.dequeue(a), e;
            },
            remove: function (b) {
                var d, e = b.config.el, f = b.config.queue, g = c(e, f, 1);
                g && (d = a.indexOf(b, g), d > -1 && g.splice(d, 1));
            },
            removeQueues: function (a) {
                b.removeData(a, e);
            },
            removeQueue: d,
            dequeue: function (a) {
                var b = a.config.el, e = a.config.queue, f = c(b, e, 1), h = f && f.shift();
                h == g && (h = f.shift()), h ? (f.unshift(g), h._runInternal()) : d(b, e);
            }
        };
    return h;
}, { requires: ['dom'] }), KISSY.add('node/anim', function (a, b, c, d, e) {
    function f(a, b, c) {
        for (var d = [], e = {}, f = c || 0; b > f; f++)
            d.push.apply(d, g[f]);
        for (f = 0; f < d.length; f++)
            e[d[f]] = a;
        return e;
    }
    var g = [
            [
                'height',
                'marginTop',
                'marginBottom',
                'paddingTop',
                'paddingBottom'
            ],
            [
                'width',
                'marginLeft',
                'marginRight',
                'paddingLeft',
                'paddingRight'
            ],
            ['opacity']
        ];
    a.augment(d, {
        animate: function () {
            var b = this, d = a.makeArray(arguments);
            return a.each(b, function (b) {
                var f = a.clone(d), g = f[0];
                g.props ? (g.el = b, c(g).run()) : c.apply(e, [b].concat(f)).run();
            }), b;
        },
        stop: function (b, d, e) {
            var f = this;
            return a.each(f, function (a) {
                c.stop(a, b, d, e);
            }), f;
        },
        pause: function (b, d) {
            var e = this;
            return a.each(e, function (a) {
                c.pause(a, d);
            }), e;
        },
        resume: function (b, d) {
            var e = this;
            return a.each(e, function (a) {
                c.resume(a, d);
            }), e;
        },
        isRunning: function () {
            for (var a = this, b = 0; b < a.length; b++)
                if (c.isRunning(a[b]))
                    return !0;
            return !1;
        },
        isPaused: function () {
            for (var a = this, b = 0; b < a.length; b++)
                if (c.isPaused(a[b]))
                    return 1;
            return 0;
        }
    }), a.each({
        show: f('show', 3),
        hide: f('hide', 3),
        toggle: f('toggle', 3),
        fadeIn: f('show', 3, 2),
        fadeOut: f('hide', 3, 2),
        fadeToggle: f('toggle', 3, 2),
        slideDown: f('show', 1),
        slideUp: f('hide', 1),
        slideToggle: f('toggle', 1)
    }, function (e, f) {
        d.prototype[f] = function (d, g, h) {
            var i = this;
            return b[f] && !d ? b[f](i) : a.each(i, function (a) {
                c(a, e, d, h || 'easeOut', g).run();
            }), i;
        };
    });
}, {
    requires: [
        'dom',
        'anim',
        './base'
    ]
}), KISSY.add('node/attach', function (a, b, c, d, e) {
    function f(a, c, d) {
        d.unshift(c);
        var f = b[a].apply(b, d);
        return f === e ? c : f;
    }
    function g(a, c, f) {
        f.unshift(c);
        var g = b[a].apply(b, f);
        return g === e ? c : null === g ? null : new d(g);
    }
    function h(c, d, g, h) {
        return h[g] !== e || a.isObject(h[0]) ? f(c, d, h) : (h.unshift(d), b[c].apply(b, h));
    }
    var i = d.prototype, j = a.makeArray, k = [
            'nodeName',
            'equals',
            'contains',
            'index',
            'scrollTop',
            'scrollLeft',
            'height',
            'width',
            'innerHeight',
            'innerWidth',
            'outerHeight',
            'outerWidth',
            'addStyleSheet',
            'appendTo',
            'prependTo',
            'insertBefore',
            'before',
            'after',
            'insertAfter',
            'test',
            'hasClass',
            'addClass',
            'removeClass',
            'replaceClass',
            'toggleClass',
            'removeAttr',
            'hasAttr',
            'hasProp',
            'scrollIntoView',
            'remove',
            'empty',
            'removeData',
            'hasData',
            'unselectable',
            'wrap',
            'wrapAll',
            'replaceWith',
            'wrapInner',
            'unwrap'
        ], l = [
            'filter',
            'first',
            'last',
            'parent',
            'closest',
            'next',
            'prev',
            'clone',
            'siblings',
            'contents',
            'children'
        ], m = {
            attr: 1,
            text: 0,
            css: 1,
            style: 1,
            val: 0,
            prop: 1,
            offset: 0,
            html: 0,
            outerHTML: 0,
            data: 1
        }, n = [
            'on',
            'detach',
            'fire',
            'fireHandler',
            'delegate',
            'undelegate'
        ];
    d.KeyCodes = c.KeyCodes, a.each(k, function (a) {
        i[a] = function () {
            var b = j(arguments);
            return f(a, this, b);
        };
    }), a.each(l, function (a) {
        i[a] = function () {
            var b = j(arguments);
            return g(a, this, b);
        };
    }), a.each(m, function (a, b) {
        i[b] = function () {
            var c = j(arguments);
            return h(b, this, a, c);
        };
    }), a.each(n, function (a) {
        i[a] = function () {
            var b = this, d = j(arguments);
            return d.unshift(b), c[a].apply(c, d), b;
        };
    });
}, {
    requires: [
        'dom',
        'event/dom',
        './base'
    ]
}), KISSY.add('node/base', function (a, b, c) {
    function d(c, e, f) {
        var k, l = this;
        if (!(l instanceof d))
            return new d(c, e, f);
        if (!c)
            return l;
        if ('string' == typeof c) {
            if (k = b.create(c, e, f), k.nodeType === g.DOCUMENT_FRAGMENT_NODE)
                return h.apply(this, i(k.childNodes)), l;
        } else {
            if (a.isArray(c) || j(c))
                return h.apply(l, i(c)), l;
            k = c;
        }
        return l[0] = k, l.length = 1, l;
    }
    var e = Array.prototype, f = e.slice, g = b.NodeType, h = e.push, i = a.makeArray, j = b._isNodeList;
    return d.prototype = {
        constructor: d,
        length: 0,
        item: function (b) {
            var c = this;
            return a.isNumber(b) ? b >= c.length ? null : new d(c[b]) : new d(b);
        },
        add: function (b, f, g) {
            a.isNumber(f) && (g = f, f = c);
            var i = d.all(b, f).getDOMNodes(), j = new d(this);
            if (g === c)
                h.apply(j, i);
            else {
                var k = [
                        g,
                        0
                    ];
                k.push.apply(k, i), e.splice.apply(j, k);
            }
            return j;
        },
        slice: function () {
            return new d(f.apply(this, arguments));
        },
        getDOMNodes: function () {
            return f.call(this);
        },
        each: function (b, c) {
            var e = this;
            return a.each(e, function (a, f) {
                return a = new d(a), b.call(c || a, a, f, e);
            }), e;
        },
        getDOMNode: function () {
            return this[0];
        },
        end: function () {
            var a = this;
            return a.__parent || a;
        },
        all: function (a) {
            var b, c = this;
            return b = c.length > 0 ? d.all(a, c) : new d(), b.__parent = c, b;
        },
        one: function (a) {
            var b = this, c = b.all(a), d = c.length ? c.slice(0, 1) : null;
            return d && (d.__parent = b), d;
        }
    }, a.mix(d, {
        all: function (e, f) {
            return 'string' == typeof e && (e = a.trim(e)) && e.length >= 3 && a.startsWith(e, '<') && a.endsWith(e, '>') ? (f && (f.getDOMNode && (f = f[0]), f = f.ownerDocument || f), new d(e, c, f)) : new d(b.query(e, f));
        },
        one: function (a, b) {
            var c = d.all(a, b);
            return c.length ? c.slice(0, 1) : null;
        }
    }), d.NodeType = g, d;
}, { requires: ['dom'] }), KISSY.add('node', function (a, b) {
    return a.mix(a, {
        Node: b,
        NodeList: b,
        one: b.one,
        all: b.all
    }), b;
}, {
    requires: [
        'node/base',
        'node/attach',
        'node/override',
        'node/anim'
    ]
}), KISSY.add('node/override', function (a, b, c) {
    var d = c.prototype;
    a.each([
        'append',
        'prepend',
        'before',
        'after'
    ], function (a) {
        d[a] = function (c) {
            var d = c, e = this;
            return 'string' == typeof d && (d = b.create(d)), d && b[a](d, e), e;
        };
    }), a.each([
        'wrap',
        'wrapAll',
        'replaceWith',
        'wrapInner'
    ], function (a) {
        var b = d[a];
        d[a] = function (a) {
            var d = this;
            return 'string' == typeof a && (a = c.all(a, d[0].ownerDocument)), b.call(d, a);
        };
    });
}, {
    requires: [
        'dom',
        './base',
        './attach'
    ]
}), KISSY.use('ua,dom,event,node,json,ajax,anim,base,cookie', { sync: !0 });