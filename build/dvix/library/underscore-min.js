KISSY.add('dvix/library/underscore', function () {
    (function () {
        var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function (a) {
                return a instanceof x ? a : this instanceof x ? (this._wrapped = a, void 0) : new x(a);
            };
        'undefined' != typeof exports ? ('undefined' != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = '1.5.2';
        var y = x.each = x.forEach = function (a, b, d) {
                if (null != a)
                    if (l && a.forEach === l)
                        a.forEach(b, d);
                    else if (a.length === +a.length) {
                        for (var e = 0, f = a.length; f > e; e++)
                            if (b.call(d, a[e], e, a) === c)
                                return;
                    } else
                        for (var g = x.keys(a), e = 0, f = g.length; f > e; e++)
                            if (b.call(d, a[g[e]], g[e], a) === c)
                                return;
            };
        x.map = x.collect = function (a, b, c) {
            var d = [];
            return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function (a, e, f) {
                d.push(b.call(c, a, e, f));
            }), d);
        };
        var z = 'Reduce of empty array with no initial value';
        x.reduce = x.foldl = x.inject = function (a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), n && a.reduce === n)
                return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
            if (y(a, function (a, f, g) {
                    e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
                }), !e)
                throw new TypeError(z);
            return c;
        }, x.reduceRight = x.foldr = function (a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), o && a.reduceRight === o)
                return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
            var f = a.length;
            if (f !== +f) {
                var g = x.keys(a);
                f = g.length;
            }
            if (y(a, function (h, i, j) {
                    i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0);
                }), !e)
                throw new TypeError(z);
            return c;
        }, x.find = x.detect = function (a, b, c) {
            var d;
            return A(a, function (a, e, f) {
                return b.call(c, a, e, f) ? (d = a, !0) : void 0;
            }), d;
        }, x.filter = x.select = function (a, b, c) {
            var d = [];
            return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function (a, e, f) {
                b.call(c, a, e, f) && d.push(a);
            }), d);
        }, x.reject = function (a, b, c) {
            return x.filter(a, function (a, d, e) {
                return !b.call(c, a, d, e);
            }, c);
        }, x.every = x.all = function (a, b, d) {
            b || (b = x.identity);
            var e = !0;
            return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function (a, f, g) {
                return (e = e && b.call(d, a, f, g)) ? void 0 : c;
            }), !!e);
        };
        var A = x.some = x.any = function (a, b, d) {
                b || (b = x.identity);
                var e = !1;
                return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function (a, f, g) {
                    return e || (e = b.call(d, a, f, g)) ? c : void 0;
                }), !!e);
            };
        x.contains = x.include = function (a, b) {
            return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function (a) {
                return a === b;
            });
        }, x.invoke = function (a, b) {
            var c = h.call(arguments, 2), d = x.isFunction(b);
            return x.map(a, function (a) {
                return (d ? b : a[b]).apply(a, c);
            });
        }, x.pluck = function (a, b) {
            return x.map(a, function (a) {
                return a[b];
            });
        }, x.where = function (a, b, c) {
            return x.isEmpty(b) ? c ? void 0 : [] : x[c ? 'find' : 'filter'](a, function (a) {
                for (var c in b)
                    if (b[c] !== a[c])
                        return !1;
                return !0;
            });
        }, x.findWhere = function (a, b) {
            return x.where(a, b, !0);
        }, x.max = function (a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)
                return Math.max.apply(Math, a);
            if (!b && x.isEmpty(a))
                return -1 / 0;
            var d = {
                    computed: -1 / 0,
                    value: -1 / 0
                };
            return y(a, function (a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g > d.computed && (d = {
                    value: a,
                    computed: g
                });
            }), d.value;
        }, x.min = function (a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)
                return Math.min.apply(Math, a);
            if (!b && x.isEmpty(a))
                return 1 / 0;
            var d = {
                    computed: 1 / 0,
                    value: 1 / 0
                };
            return y(a, function (a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g < d.computed && (d = {
                    value: a,
                    computed: g
                });
            }), d.value;
        }, x.shuffle = function (a) {
            var b, c = 0, d = [];
            return y(a, function (a) {
                b = x.random(c++), d[c - 1] = d[b], d[b] = a;
            }), d;
        }, x.sample = function (a, b, c) {
            return arguments.length < 2 || c ? a[x.random(a.length - 1)] : x.shuffle(a).slice(0, Math.max(0, b));
        };
        var B = function (a) {
            return x.isFunction(a) ? a : function (b) {
                return b[a];
            };
        };
        x.sortBy = function (a, b, c) {
            var d = B(b);
            return x.pluck(x.map(a, function (a, b, e) {
                return {
                    value: a,
                    index: b,
                    criteria: d.call(c, a, b, e)
                };
            }).sort(function (a, b) {
                var c = a.criteria, d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c)
                        return 1;
                    if (d > c || void 0 === d)
                        return -1;
                }
                return a.index - b.index;
            }), 'value');
        };
        var C = function (a) {
            return function (b, c, d) {
                var e = {}, f = null == c ? x.identity : B(c);
                return y(b, function (c, g) {
                    var h = f.call(d, c, g, b);
                    a(e, h, c);
                }), e;
            };
        };
        x.groupBy = C(function (a, b, c) {
            (x.has(a, b) ? a[b] : a[b] = []).push(c);
        }), x.indexBy = C(function (a, b, c) {
            a[b] = c;
        }), x.countBy = C(function (a, b) {
            x.has(a, b) ? a[b]++ : a[b] = 1;
        }), x.sortedIndex = function (a, b, c, d) {
            c = null == c ? x.identity : B(c);
            for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                var h = f + g >>> 1;
                c.call(d, a[h]) < e ? f = h + 1 : g = h;
            }
            return f;
        }, x.toArray = function (a) {
            return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : [];
        }, x.size = function (a) {
            return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length;
        }, x.first = x.head = x.take = function (a, b, c) {
            return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b);
        }, x.initial = function (a, b, c) {
            return h.call(a, 0, a.length - (null == b || c ? 1 : b));
        }, x.last = function (a, b, c) {
            return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0));
        }, x.rest = x.tail = x.drop = function (a, b, c) {
            return h.call(a, null == b || c ? 1 : b);
        }, x.compact = function (a) {
            return x.filter(a, x.identity);
        };
        var D = function (a, b, c) {
            return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function (a) {
                x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a);
            }), c);
        };
        x.flatten = function (a, b) {
            return D(a, b, []);
        }, x.without = function (a) {
            return x.difference(a, h.call(arguments, 1));
        }, x.uniq = x.unique = function (a, b, c, d) {
            x.isFunction(b) && (d = c, c = b, b = !1);
            var e = c ? x.map(a, c, d) : a, f = [], g = [];
            return y(e, function (c, d) {
                (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]));
            }), f;
        }, x.union = function () {
            return x.uniq(x.flatten(arguments, !0));
        }, x.intersection = function (a) {
            var b = h.call(arguments, 1);
            return x.filter(x.uniq(a), function (a) {
                return x.every(b, function (b) {
                    return x.indexOf(b, a) >= 0;
                });
            });
        }, x.difference = function (a) {
            var b = i.apply(d, h.call(arguments, 1));
            return x.filter(a, function (a) {
                return !x.contains(b, a);
            });
        }, x.zip = function () {
            for (var a = x.max(x.pluck(arguments, 'length').concat(0)), b = new Array(a), c = 0; a > c; c++)
                b[c] = x.pluck(arguments, '' + c);
            return b;
        }, x.object = function (a, b) {
            if (null == a)
                return {};
            for (var c = {}, d = 0, e = a.length; e > d; d++)
                b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c;
        }, x.indexOf = function (a, b, c) {
            if (null == a)
                return -1;
            var d = 0, e = a.length;
            if (c) {
                if ('number' != typeof c)
                    return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
                d = 0 > c ? Math.max(0, e + c) : c;
            }
            if (s && a.indexOf === s)
                return a.indexOf(b, c);
            for (; e > d; d++)
                if (a[d] === b)
                    return d;
            return -1;
        }, x.lastIndexOf = function (a, b, c) {
            if (null == a)
                return -1;
            var d = null != c;
            if (t && a.lastIndexOf === t)
                return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
            for (var e = d ? c : a.length; e--;)
                if (a[e] === b)
                    return e;
            return -1;
        }, x.range = function (a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;)
                f[e++] = a, a += c;
            return f;
        };
        var E = function () {
        };
        x.bind = function (a, b) {
            var c, d;
            if (w && a.bind === w)
                return w.apply(a, h.call(arguments, 1));
            if (!x.isFunction(a))
                throw new TypeError();
            return c = h.call(arguments, 2), d = function () {
                if (!(this instanceof d))
                    return a.apply(b, c.concat(h.call(arguments)));
                E.prototype = a.prototype;
                var e = new E();
                E.prototype = null;
                var f = a.apply(e, c.concat(h.call(arguments)));
                return Object(f) === f ? f : e;
            };
        }, x.partial = function (a) {
            var b = h.call(arguments, 1);
            return function () {
                return a.apply(this, b.concat(h.call(arguments)));
            };
        }, x.bindAll = function (a) {
            var b = h.call(arguments, 1);
            if (0 === b.length)
                throw new Error('bindAll must be passed function names');
            return y(b, function (b) {
                a[b] = x.bind(a[b], a);
            }), a;
        }, x.memoize = function (a, b) {
            var c = {};
            return b || (b = x.identity), function () {
                var d = b.apply(this, arguments);
                return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
            };
        }, x.delay = function (a, b) {
            var c = h.call(arguments, 2);
            return setTimeout(function () {
                return a.apply(null, c);
            }, b);
        }, x.defer = function (a) {
            return x.delay.apply(x, [
                a,
                1
            ].concat(h.call(arguments, 1)));
        }, x.throttle = function (a, b, c) {
            var d, e, f, g = null, h = 0;
            c || (c = {});
            var i = function () {
                h = c.leading === !1 ? 0 : new Date(), g = null, f = a.apply(d, e);
            };
            return function () {
                var j = new Date();
                h || c.leading !== !1 || (h = j);
                var k = b - (j - h);
                return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f;
            };
        }, x.debounce = function (a, b, c) {
            var d, e, f, g, h;
            return function () {
                f = this, e = arguments, g = new Date();
                var i = function () {
                        var j = new Date() - g;
                        b > j ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e)));
                    }, j = c && !d;
                return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e)), h;
            };
        }, x.once = function (a) {
            var b, c = !1;
            return function () {
                return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b);
            };
        }, x.wrap = function (a, b) {
            return function () {
                var c = [a];
                return g.apply(c, arguments), b.apply(this, c);
            };
        }, x.compose = function () {
            var a = arguments;
            return function () {
                for (var b = arguments, c = a.length - 1; c >= 0; c--)
                    b = [a[c].apply(this, b)];
                return b[0];
            };
        }, x.after = function (a, b) {
            return function () {
                return --a < 1 ? b.apply(this, arguments) : void 0;
            };
        }, x.keys = v || function (a) {
            if (a !== Object(a))
                throw new TypeError('Invalid object');
            var b = [];
            for (var c in a)
                x.has(a, c) && b.push(c);
            return b;
        }, x.values = function (a) {
            for (var b = x.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++)
                d[e] = a[b[e]];
            return d;
        }, x.pairs = function (a) {
            for (var b = x.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++)
                d[e] = [
                    b[e],
                    a[b[e]]
                ];
            return d;
        }, x.invert = function (a) {
            for (var b = {}, c = x.keys(a), d = 0, e = c.length; e > d; d++)
                b[a[c[d]]] = c[d];
            return b;
        }, x.functions = x.methods = function (a) {
            var b = [];
            for (var c in a)
                x.isFunction(a[c]) && b.push(c);
            return b.sort();
        }, x.extend = function (a) {
            return y(h.call(arguments, 1), function (b) {
                if (b)
                    for (var c in b)
                        a[c] = b[c];
            }), a;
        }, x.pick = function (a) {
            var b = {}, c = i.apply(d, h.call(arguments, 1));
            return y(c, function (c) {
                c in a && (b[c] = a[c]);
            }), b;
        }, x.omit = function (a) {
            var b = {}, c = i.apply(d, h.call(arguments, 1));
            for (var e in a)
                x.contains(c, e) || (b[e] = a[e]);
            return b;
        }, x.defaults = function (a) {
            return y(h.call(arguments, 1), function (b) {
                if (b)
                    for (var c in b)
                        void 0 === a[c] && (a[c] = b[c]);
            }), a;
        }, x.clone = function (a) {
            return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a;
        }, x.tap = function (a, b) {
            return b(a), a;
        };
        var F = function (a, b, c, d) {
            if (a === b)
                return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b)
                return a === b;
            a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
            var e = j.call(a);
            if (e != j.call(b))
                return !1;
            switch (e) {
            case '[object String]':
                return a == String(b);
            case '[object Number]':
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a == +b;
            case '[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
            }
            if ('object' != typeof a || 'object' != typeof b)
                return !1;
            for (var f = c.length; f--;)
                if (c[f] == a)
                    return d[f] == b;
            var g = a.constructor, h = b.constructor;
            if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h))
                return !1;
            c.push(a), d.push(b);
            var i = 0, k = !0;
            if ('[object Array]' == e) {
                if (i = a.length, k = i == b.length)
                    for (; i-- && (k = F(a[i], b[i], c, d)););
            } else {
                for (var l in a)
                    if (x.has(a, l) && (i++, !(k = x.has(b, l) && F(a[l], b[l], c, d))))
                        break;
                if (k) {
                    for (l in b)
                        if (x.has(b, l) && !i--)
                            break;
                    k = !i;
                }
            }
            return c.pop(), d.pop(), k;
        };
        x.isEqual = function (a, b) {
            return F(a, b, [], []);
        }, x.isEmpty = function (a) {
            if (null == a)
                return !0;
            if (x.isArray(a) || x.isString(a))
                return 0 === a.length;
            for (var b in a)
                if (x.has(a, b))
                    return !1;
            return !0;
        }, x.isElement = function (a) {
            return !(!a || 1 !== a.nodeType);
        }, x.isArray = u || function (a) {
            return '[object Array]' == j.call(a);
        }, x.isObject = function (a) {
            return a === Object(a);
        }, y([
            'Arguments',
            'Function',
            'String',
            'Number',
            'Date',
            'RegExp'
        ], function (a) {
            x['is' + a] = function (b) {
                return j.call(b) == '[object ' + a + ']';
            };
        }), x.isArguments(arguments) || (x.isArguments = function (a) {
            return !(!a || !x.has(a, 'callee'));
        }), 'function' != typeof /./ && (x.isFunction = function (a) {
            return 'function' == typeof a;
        }), x.isFinite = function (a) {
            return isFinite(a) && !isNaN(parseFloat(a));
        }, x.isNaN = function (a) {
            return x.isNumber(a) && a != +a;
        }, x.isBoolean = function (a) {
            return a === !0 || a === !1 || '[object Boolean]' == j.call(a);
        }, x.isNull = function (a) {
            return null === a;
        }, x.isUndefined = function (a) {
            return void 0 === a;
        }, x.has = function (a, b) {
            return k.call(a, b);
        }, x.noConflict = function () {
            return a._ = b, this;
        }, x.identity = function (a) {
            return a;
        }, x.times = function (a, b, c) {
            for (var d = Array(Math.max(0, a)), e = 0; a > e; e++)
                d[e] = b.call(c, e);
            return d;
        }, x.random = function (a, b) {
            return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1));
        };
        var G = {
                escape: {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    '\'': '&#x27;'
                }
            };
        G.unescape = x.invert(G.escape);
        var H = {
                escape: new RegExp('[' + x.keys(G.escape).join('') + ']', 'g'),
                unescape: new RegExp('(' + x.keys(G.unescape).join('|') + ')', 'g')
            };
        x.each([
            'escape',
            'unescape'
        ], function (a) {
            x[a] = function (b) {
                return null == b ? '' : ('' + b).replace(H[a], function (b) {
                    return G[a][b];
                });
            };
        }), x.result = function (a, b) {
            if (null == a)
                return void 0;
            var c = a[b];
            return x.isFunction(c) ? c.call(a) : c;
        }, x.mixin = function (a) {
            y(x.functions(a), function (b) {
                var c = x[b] = a[b];
                x.prototype[b] = function () {
                    var a = [this._wrapped];
                    return g.apply(a, arguments), M.call(this, c.apply(x, a));
                };
            });
        };
        var I = 0;
        x.uniqueId = function (a) {
            var b = ++I + '';
            return a ? a + b : b;
        }, x.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var J = /(.)^/, K = {
                '\'': '\'',
                '\\': '\\',
                '\r': 'r',
                '\n': 'n',
                '\t': 't',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            }, L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function (a, b, c) {
            var d;
            c = x.defaults({}, c, x.templateSettings);
            var e = new RegExp([
                    (c.escape || J).source,
                    (c.interpolate || J).source,
                    (c.evaluate || J).source
                ].join('|') + '|$', 'g'), f = 0, g = '__p+=\'';
            a.replace(e, function (b, c, d, e, h) {
                return g += a.slice(f, h).replace(L, function (a) {
                    return '\\' + K[a];
                }), c && (g += '\'+\n((__t=(' + c + '))==null?\'\':_.escape(__t))+\n\''), d && (g += '\'+\n((__t=(' + d + '))==null?\'\':__t)+\n\''), e && (g += '\';\n' + e + '\n__p+=\''), f = h + b.length, b;
            }), g += '\';\n', c.variable || (g = 'with(obj||{}){\n' + g + '}\n'), g = 'var __t,__p=\'\',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,\'\');};\n' + g + 'return __p;\n';
            try {
                d = new Function(c.variable || 'obj', '_', g);
            } catch (h) {
                throw h.source = g, h;
            }
            if (b)
                return d(b, x);
            var i = function (a) {
                return d.call(this, a, x);
            };
            return i.source = 'function(' + (c.variable || 'obj') + '){\n' + g + '}', i;
        }, x.chain = function (a) {
            return x(a).chain();
        };
        var M = function (a) {
            return this._chain ? x(a).chain() : a;
        };
        x.mixin(x), y([
            'pop',
            'push',
            'reverse',
            'shift',
            'sort',
            'splice',
            'unshift'
        ], function (a) {
            var b = d[a];
            x.prototype[a] = function () {
                var c = this._wrapped;
                return b.apply(c, arguments), 'shift' != a && 'splice' != a || 0 !== c.length || delete c[0], M.call(this, c);
            };
        }), y([
            'concat',
            'join',
            'slice'
        ], function (a) {
            var b = d[a];
            x.prototype[a] = function () {
                return M.call(this, b.apply(this._wrapped, arguments));
            };
        }), x.extend(x.prototype, {
            chain: function () {
                return this._chain = !0, this;
            },
            value: function () {
                return this._wrapped;
            }
        });
    }.call(window));
});