KISSY.add('canvax/animation/Animation', function () {
    for (var a = 0, b = [
                'ms',
                'moz',
                'webkit',
                'o'
            ], c = 0; c < b.length && !window.requestAnimationFrame; ++c)
        window.requestAnimationFrame = window[b[c] + 'RequestAnimationFrame'], window.cancelAnimationFrame = window[b[c] + 'CancelAnimationFrame'] || window[b[c] + 'CancelRequestAnimationFrame'];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (b) {
        var c = new Date().getTime(), d = Math.max(0, 16 - (c - a)), e = window.setTimeout(function () {
                b(c + d);
            }, d);
        return a = c + d, e;
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
        clearTimeout(a);
    }), void 0 === Date.now && (Date.now = function () {
        return new Date().valueOf();
    });
    var d = d || function () {
            var a = [];
            return {
                REVISION: '12',
                getAll: function () {
                    return a;
                },
                removeAll: function () {
                    a = [];
                },
                add: function (b) {
                    a.push(b);
                },
                remove: function (b) {
                    var c = _.indexOf(b, a);
                    -1 !== c && a.splice(c, 1);
                },
                update: function (b) {
                    if (0 === a.length)
                        return !1;
                    var c = 0;
                    for (b = void 0 !== b ? b : 'undefined' != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); c < a.length;)
                        a[c].update(b) ? c++ : a.splice(c, 1);
                    return !0;
                }
            };
        }();
    return d.Tween = function (a) {
        var b = a, c = {}, e = {}, f = {}, g = 1000, h = 0, i = !1, j = !1, k = !1, l = 0, m = null, n = d.Easing.Linear.None, o = d.Interpolation.Linear, p = [], q = null, r = !1, s = null, t = null;
        for (var u in a)
            c[u] = parseFloat(a[u], 10);
        this.to = function (a, b) {
            return void 0 !== b && (g = b), e = a, this;
        }, this.start = function (a) {
            d.add(this), j = !0, r = !1, m = void 0 !== a ? a : 'undefined' != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), m += l;
            for (var g in e) {
                if (e[g] instanceof Array) {
                    if (0 === e[g].length)
                        continue;
                    e[g] = [b[g]].concat(e[g]);
                }
                c[g] = b[g], c[g] instanceof Array == !1 && (c[g] *= 1), f[g] = c[g] || 0;
            }
            return this;
        }, this.stop = function () {
            return j ? (d.remove(this), j = !1, this.stopChainedTweens(), this) : this;
        }, this.stopChainedTweens = function () {
            for (var a = 0, b = p.length; b > a; a++)
                p[a].stop();
        }, this.delay = function (a) {
            return l = a, this;
        }, this.repeat = function (a) {
            return h = a, this;
        }, this.yoyo = function (a) {
            return i = a, this;
        }, this.easing = function (a) {
            return n = a, this;
        }, this.interpolation = function (a) {
            return o = a, this;
        }, this.chain = function () {
            return p = arguments, this;
        }, this.onStart = function (a) {
            return q = a, this;
        }, this.onUpdate = function (a) {
            return s = a, this;
        }, this.onComplete = function (a) {
            return t = a, this;
        }, this.update = function (a) {
            var d;
            if (m > a)
                return !0;
            r === !1 && (null !== q && q.call(b), r = !0);
            var j = (a - m) / g;
            j = j > 1 ? 1 : j;
            var u = n(j);
            for (d in e) {
                var v = c[d] || 0, w = e[d];
                w instanceof Array ? b[d] = o(w, u) : ('string' == typeof w && (w = v + parseFloat(w, 10)), 'number' == typeof w && (b[d] = v + (w - v) * u));
            }
            if (null !== s && s.call(b, u), 1 == j) {
                if (h > 0) {
                    isFinite(h) && h--;
                    for (d in f) {
                        if ('string' == typeof e[d] && (f[d] = f[d] + parseFloat(e[d], 10)), i) {
                            var x = f[d];
                            f[d] = e[d], e[d] = x, k = !k;
                        }
                        c[d] = f[d];
                    }
                    return m = a + l, !0;
                }
                null !== t && t.call(b);
                for (var y = 0, z = p.length; z > y; y++)
                    p[y].start(a);
                return !1;
            }
            return !0;
        };
    }, d.Easing = {
        Linear: {
            None: function (a) {
                return a;
            }
        },
        Quadratic: {
            In: function (a) {
                return a * a;
            },
            Out: function (a) {
                return a * (2 - a);
            },
            InOut: function (a) {
                return (a *= 2) < 1 ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
            }
        },
        Cubic: {
            In: function (a) {
                return a * a * a;
            },
            Out: function (a) {
                return --a * a * a + 1;
            },
            InOut: function (a) {
                return (a *= 2) < 1 ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2);
            }
        },
        Quartic: {
            In: function (a) {
                return a * a * a * a;
            },
            Out: function (a) {
                return 1 - --a * a * a * a;
            },
            InOut: function (a) {
                return (a *= 2) < 1 ? 0.5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2);
            }
        },
        Quintic: {
            In: function (a) {
                return a * a * a * a * a;
            },
            Out: function (a) {
                return --a * a * a * a * a + 1;
            },
            InOut: function (a) {
                return (a *= 2) < 1 ? 0.5 * a * a * a * a * a : 0.5 * ((a -= 2) * a * a * a * a + 2);
            }
        },
        Sinusoidal: {
            In: function (a) {
                return 1 - Math.cos(a * Math.PI / 2);
            },
            Out: function (a) {
                return Math.sin(a * Math.PI / 2);
            },
            InOut: function (a) {
                return 0.5 * (1 - Math.cos(Math.PI * a));
            }
        },
        Exponential: {
            In: function (a) {
                return 0 === a ? 0 : Math.pow(1024, a - 1);
            },
            Out: function (a) {
                return 1 === a ? 1 : 1 - Math.pow(2, -10 * a);
            },
            InOut: function (a) {
                return 0 === a ? 0 : 1 === a ? 1 : (a *= 2) < 1 ? 0.5 * Math.pow(1024, a - 1) : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
            }
        },
        Circular: {
            In: function (a) {
                return 1 - Math.sqrt(1 - a * a);
            },
            Out: function (a) {
                return Math.sqrt(1 - --a * a);
            },
            InOut: function (a) {
                return (a *= 2) < 1 ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            }
        },
        Elastic: {
            In: function (a) {
                var b, c = 0.1, d = 0.4;
                return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / d)));
            },
            Out: function (a) {
                var b, c = 0.1, d = 0.4;
                return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / d) + 1);
            },
            InOut: function (a) {
                var b, c = 0.1, d = 0.4;
                return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1, b = d / 4) : b = d * Math.asin(1 / c) / (2 * Math.PI), (a *= 2) < 1 ? -0.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / d) : c * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / d) * 0.5 + 1);
            }
        },
        Back: {
            In: function (a) {
                var b = 1.70158;
                return a * a * ((b + 1) * a - b);
            },
            Out: function (a) {
                var b = 1.70158;
                return --a * a * ((b + 1) * a + b) + 1;
            },
            InOut: function (a) {
                var b = 2.5949095;
                return (a *= 2) < 1 ? 0.5 * a * a * ((b + 1) * a - b) : 0.5 * ((a -= 2) * a * ((b + 1) * a + b) + 2);
            }
        },
        Bounce: {
            In: function (a) {
                return 1 - d.Easing.Bounce.Out(1 - a);
            },
            Out: function (a) {
                return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
            },
            InOut: function (a) {
                return 0.5 > a ? 0.5 * d.Easing.Bounce.In(2 * a) : 0.5 * d.Easing.Bounce.Out(2 * a - 1) + 0.5;
            }
        }
    }, d.Interpolation = {
        Linear: function (a, b) {
            var c = a.length - 1, e = c * b, f = Math.floor(e), g = d.Interpolation.Utils.Linear;
            return 0 > b ? g(a[0], a[1], e) : b > 1 ? g(a[c], a[c - 1], c - e) : g(a[f], a[f + 1 > c ? c : f + 1], e - f);
        },
        Bezier: function (a, b) {
            var c, e = 0, f = a.length - 1, g = Math.pow, h = d.Interpolation.Utils.Bernstein;
            for (c = 0; f >= c; c++)
                e += g(1 - b, f - c) * g(b, c) * a[c] * h(f, c);
            return e;
        },
        CatmullRom: function (a, b) {
            var c = a.length - 1, e = c * b, f = Math.floor(e), g = d.Interpolation.Utils.CatmullRom;
            return a[0] === a[c] ? (0 > b && (f = Math.floor(e = c * (1 + b))), g(a[(f - 1 + c) % c], a[f], a[(f + 1) % c], a[(f + 2) % c], e - f)) : 0 > b ? a[0] - (g(a[0], a[0], a[1], a[1], -e) - a[0]) : b > 1 ? a[c] - (g(a[c], a[c], a[c - 1], a[c - 1], e - c) - a[c]) : g(a[f ? f - 1 : 0], a[f], a[f + 1 > c ? c : f + 1], a[f + 2 > c ? c : f + 2], e - f);
        },
        Utils: {
            Linear: function (a, b, c) {
                return (b - a) * c + a;
            },
            Bernstein: function (a, b) {
                var c = d.Interpolation.Utils.Factorial;
                return c(a) / c(b) / c(a - b);
            },
            Factorial: function () {
                var a = [1];
                return function (b) {
                    var c, d = 1;
                    if (a[b])
                        return a[b];
                    for (c = b; c > 1; c--)
                        d *= c;
                    return a[b] = d;
                };
            }(),
            CatmullRom: function (a, b, c, d, e) {
                var f = 0.5 * (c - a), g = 0.5 * (d - b), h = e * e, i = e * h;
                return (2 * b - 2 * c + f + g) * i + (-3 * b + 3 * c - 2 * f - g) * h + f * e + b;
            }
        }
    }, d;
}), KISSY.add('canvax/core/Base', function () {
    var a = {};
    'Boolean Number String Function Array Date RegExp Object Error'.replace(/[^, ]+/g, function (b) {
        a['[object ' + b + ']'] = b.toLowerCase();
    });
    var b = {
            mainFrameRate: 40,
            now: 0,
            _pixelCtx: null,
            __emptyFunc: function () {
            },
            _devicePixelRatio: window.devicePixelRatio || 1,
            _createCanvas: function (a, b, c) {
                var d = document.createElement('canvas');
                return d.style.position = 'absolute', d.style.width = b + 'px', d.style.height = c + 'px', d.setAttribute('width', b * this._devicePixelRatio), d.setAttribute('height', c * this._devicePixelRatio), d.setAttribute('id', a), d;
            },
            createObject: function (a, c) {
                var d, e = Object.create;
                return e ? d = e(a) : (b.__emptyFunc.prototype = a, d = new b.__emptyFunc()), d.constructor = c, d;
            },
            creatClass: function (a, c, d) {
                if (!c || !a)
                    return a;
                var e, f = c.prototype;
                return e = b.createObject(f, a), a.prototype = _.extend(e, a.prototype), a.superclass = b.createObject(f, c), d && _.extend(e, d), a;
            },
            debugMode: !1,
            log: function () {
                var a = this;
                if (a.debugMode) {
                    if ('Error' in window)
                        for (var b in arguments)
                            throw new Error(arguments[b]);
                    else if ('console' in window && console.log)
                        for (var b in arguments)
                            console.log(arguments[b]);
                    return a;
                }
            },
            initElement: function (a) {
                'undefined' != typeof FlashCanvas && FlashCanvas.initElement && FlashCanvas.initElement(a);
            },
            getContext1: function (a) {
                if (!a) {
                    var b = document.createElement('canvas');
                    'undefined' != typeof FlashCanvas && FlashCanvas.initElement && FlashCanvas.initElement(b), a = b.getContext('2d');
                }
                return a;
            },
            _UID: 0,
            getUID: function () {
                return this._UID++;
            },
            createId: function (a) {
                var c = a.charCodeAt(a.length - 1);
                return c >= 48 && 57 >= c && (a += '_'), a + b.getUID();
            },
            getType: function (b) {
                return null == b ? String(b) : 'object' == typeof b || 'function' == typeof b ? a[Object.prototype.toString.call(b)] || 'object' : typeof b;
            }
        };
    return b;
}, { requires: [window._ ? '' : 'canvax/library/underscore'] }), KISSY.add('canvax/core/propertyFactory', function (a, b) {
    function c(a, d, e) {
        function g(a, f) {
            (!unwatchOne[a] || unwatchOne[a] && '$' !== a.charAt(0)) && (d[a] = f);
            var g = b.getType(f);
            if ('function' === g)
                unwatchOne[a] || n.push(a);
            else {
                if (-1 !== _.indexOf(i, a) || '$' === a.charAt(0) && !e[a])
                    return n.push(a);
                var o, p;
                if ('object' === g && 'function' == typeof f.get && _.keys(f).length <= 2) {
                    var q = f.set, r = f.get;
                    o = function (b) {
                        var c = o.value, e = c;
                        return arguments.length ? (h || ('function' == typeof q && q.call(j, b), p !== b && (p = b, c = o.value = d[a] = b, j.$fire && j.$fire(a, c, e))), void 0) : (b = o.value = d[a] = r.call(j), c !== b && (p = void 0, j.$fire && j.$fire(a, b, c)), b);
                    }, m.push(o);
                } else
                    o = function (e) {
                        var f, i = o.value, k = i;
                        if (!arguments.length)
                            return 'array' !== g && 'object' !== g || i.$model || (i = c(i, i), o.value = i), i;
                        var l = b.getType(e);
                        h || i !== e && ('array' === l || 'object' === l ? (i = e.$model ? e : c(e, e), f = i.$model) : i = e, o.value = i, d[a] = f ? f : i, f || j.$fire && j.$fire(a, i, k), g != l && (g = l), j.$watch && j.$watch.call(j, a, i, k));
                    }, o.value = f, l.push(a);
                k[a] = {
                    set: o,
                    get: o,
                    enumerable: !0
                };
            }
        }
        var h = !0, i = a.$skipArray, j = {}, k = {}, l = [], m = [], n = _.keys(unwatchOne);
        d = d || {}, e = e || {}, i = _.isArray(i) ? i.concat(n) : n;
        for (var o in a)
            g(o, a[o]);
        return j = f(j, k, n), _.forEach(n, function (b) {
            a[b] && (j[b] = 'function' == typeof a[b] ? function () {
                a[b].apply(this, arguments);
            } : a[b]);
        }), j.$model = d, j.$accessor = k, j.hasOwnProperty = function (a) {
            return a in j.$model;
        }, h = !1, j;
    }
    function d(a, b, c) {
        var d = a[b] && a[b].set;
        return 3 !== arguments.length ? d() : (d(c), void 0);
    }
    unwatchOne = {
        $skipArray: 0,
        $watch: 1,
        $fire: 2,
        $model: 3,
        $accessor: 4,
        $owner: 5,
        path: 6
    };
    var e = Object.defineProperty;
    try {
        e({}, '_', { value: 'x' });
        var f = Object.defineProperties;
    } catch (g) {
        '__defineGetter__' in Object && (e = function (a, b, c) {
            return 'value' in c && (a[b] = c.value), 'get' in c && a.__defineGetter__(b, c.get), 'set' in c && a.__defineSetter__(b, c.set), a;
        }, f = function (a, b) {
            for (var c in b)
                b.hasOwnProperty(c) && e(a, c, b[c]);
            return a;
        });
    }
    return !f && window.VBArray && (window.execScript([
        'Function parseVB(code)',
        '\tExecuteGlobal(code)',
        'End Function'
    ].join('\n'), 'VBScript'), f = function (a, b, c) {
        a = c.slice(0), a.push('hasOwnProperty');
        var e = 'VBClass' + setTimeout('1'), f = {}, g = [];
        g.push('Class ' + e, '\tPrivate [__data__], [__proxy__]', '\tPublic Default Function [__const__](d, p)', '\t\tSet [__data__] = d: set [__proxy__] = p', '\t\tSet [__const__] = Me', '\tEnd Function'), _.forEach(a, function (a) {
            f[a] !== !0 && (f[a] = !0, g.push('\tPublic [' + a + ']'));
        });
        for (var h in b)
            f[h] = !0, g.push('\tPublic Property Let [' + h + '](val)', '\t\tCall [__proxy__]([__data__], "' + h + '", val)', '\tEnd Property', '\tPublic Property Set [' + h + '](val)', '\t\tCall [__proxy__]([__data__], "' + h + '", val)', '\tEnd Property', '\tPublic Property Get [' + h + ']', '\tOn Error Resume Next', '\t\tSet[' + h + '] = [__proxy__]([__data__],"' + h + '")', '\tIf Err.Number <> 0 Then', '\t\t[' + h + '] = [__proxy__]([__data__],"' + h + '")', '\tEnd If', '\tOn Error Goto 0', '\tEnd Property');
        return g.push('End Class'), g.push('Function ' + e + 'Factory(a, b)', '\tDim o', '\tSet o = (New ' + e + ')(a, b)', '\tSet ' + e + 'Factory = o', 'End Function'), window.parseVB(g.join('\r\n')), window[e + 'Factory'](b, d);
    }), c;
}, { requires: ['canvax/core/Base'] }), KISSY.add('canvax/display/Bitmap', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'bitmap', b.img = a.img || null, a.context || (a.context = {}), b._context = {
            dx: a.context.dx || 0,
            dy: a.context.dy || 0,
            dWidth: a.context.dWidth || 0,
            dHeight: a.context.dHeight || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            if (this.img) {
                var c = this.img;
                b.width && b.height ? b.dWidth && b.dHeight ? a.drawImage(c, b.dx, b.dy, b.dWidth, b.dHeight, 0, 0, b.width, b.height) : a.drawImage(c, 0, 0, b.width, b.height) : a.drawImage(c, 0, 0);
            }
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/display/DisplayObject', function (a, b, c, d, e, f, g) {
    var h = function (a) {
        arguments.callee.superclass.constructor.apply(this, arguments);
        var b = this;
        b.id = a.id || null, b._transform = null, b._transformStage = null, b._eventId = null, b._heartBeatNum = 0, b.stage = null, b.parent = null, b._eventEnabled = !1, b.dragEnabled = !1, b._createContext(a);
        var c = e.createId(b.type);
        b._eventId = c, null == b.id && (b.id = c), b.init.apply(b, arguments);
    };
    return e.creatClass(h, b, {
        init: function () {
        },
        _createContext: function (a) {
            var b = this;
            b.context = null, a.context || (a.context = {});
            var c = {
                    width: a.context.width || 0,
                    height: a.context.height || 0,
                    x: a.context.x || 0,
                    y: a.context.y || 0,
                    alpha: a.context.alpha || 1,
                    scaleX: a.context.scaleX || 1,
                    scaleY: a.context.scaleY || 1,
                    scaleOrigin: a.context.scaleOrigin || {
                        x: 0,
                        y: 0
                    },
                    rotation: a.context.rotation || 0,
                    rotateOrigin: a.context.rotateOrigin || {
                        x: 0,
                        y: 0
                    },
                    visible: a.context.visible || !0,
                    cursor: a.context.cursor || 'default'
                }, d = {
                    fillStyle: a.context.fillStyle || null,
                    lineCap: a.context.lineCap || null,
                    lineJoin: a.context.lineJoin || null,
                    lineWidth: a.context.lineWidth || null,
                    miterLimit: a.context.miterLimit || null,
                    shadowBlur: a.context.shadowBlur || null,
                    shadowColor: a.context.shadowColor || null,
                    shadowOffsetX: a.context.shadowOffsetX || null,
                    shadowOffsetY: a.context.shadowOffsetY || null,
                    strokeStyle: a.context.strokeStyle || null,
                    globalAlpha: a.context.globalAlpha || null,
                    font: a.context.font || null,
                    textAlign: a.context.textAlign || 'left',
                    textBaseline: a.context.textBaseline || 'top',
                    arcScaleX_: a.context.arcScaleX_ || null,
                    arcScaleY_: a.context.arcScaleY_ || null,
                    lineScale_: a.context.lineScale_ || null,
                    globalCompositeOperation: a.context.globalCompositeOperation || 'source-over'
                };
            c = _.extend(c, d), b._context && (c = _.extend(b._context, c)), b._notWatch = !1, c.$owner = b, c.$watch = function (a, b, c) {
                if (!this.$owner._notWatch) {
                    var d = this.$owner.getStage();
                    d.stageRending || this.$owner.heartBeat({
                        convertType: 'context',
                        shape: this.$owner,
                        name: a,
                        value: b,
                        preValue: c
                    });
                }
            }, b.context = g(c);
        },
        clone: function (a) {
            var b = _.clone(this);
            return b.parent = null, b.stage = null, a || (b.id = e.createId(b.type), b._eventId = b.id, b.context = g(this.context.$model), b.context.$owner = b, b.context.$watch = this.context.$watch), b;
        },
        heartBeat: function (a) {
            this._heartBeatNum++;
            var b = this.getStage();
            b.heartBeat && b.heartBeat(a);
        },
        getCurrentWidth: function () {
            return Math.abs(this.context.width * this.context.scaleX);
        },
        getCurrentHeight: function () {
            return Math.abs(this.context.height * this.context.scaleY);
        },
        getStage: function () {
            if (this.stage)
                return this.stage;
            var a = this;
            if ('stage' != a.type) {
                for (; a.parent && (a = a.parent, 'stage' != a.type););
                if ('stage' !== a.type)
                    return !1;
            }
            return this.stage = a, a;
        },
        localToGlobal: function (a, b) {
            var d = this._transformStage;
            if (d || (d = this.getConcatenatedMatrix(), this._transformStage, d), d = d.clone(), null == d)
                return {
                    x: 0,
                    y: 0
                };
            var e = new c(1, 0, 0, 1, a, b);
            return e.concat(d), {
                x: e.tx,
                y: e.ty
            };
        },
        globalToLocal: function (a, b) {
            var d = this._transformStage;
            if (d || (d = this.getConcatenatedMatrix(), this._transformStage = d), d = d.clone(), null == d)
                return {
                    x: 0,
                    y: 0
                };
            d.invert();
            var e = new c(1, 0, 0, 1, a, b);
            return e.concat(d), {
                x: e.tx,
                y: e.ty
            };
        },
        localToTarget: function (a, b, c) {
            var d = localToGlobal(a, b);
            return c.globalToLocal(d.x, d.y);
        },
        getConcatenatedMatrix: function () {
            var a = this._transformStage;
            if (a)
                return a;
            a = new c();
            for (var b = this; null != b && (a.concat(b._transform), b.parent && 'stage' != b.type); b = b.parent);
            return this._transformStage = a, a;
        },
        setEventEnable: function (a) {
            return _.isBoolean(a) ? (this._eventEnabled = a, !0) : !1;
        },
        getIndex: function () {
            return this.parent ? _.indexOf(this.parent.children, this) : void 0;
        },
        toBack: function (a) {
            if (this.parent) {
                var b = this.getIndex(), c = 0;
                if (_.isNumber(a)) {
                    if (0 == a)
                        return;
                    c = b - a;
                }
                var d = this.parent.children.splice(b, 1)[0];
                0 > c && (c = 0), this.parent.addChildAt(d, c);
            }
        },
        toFront: function (a) {
            if (this.parent) {
                var b = this.getIndex(), c = this.parent.children.length, d = c;
                if (_.isNumber(a)) {
                    if (0 == a)
                        return;
                    d = b + a + 1;
                }
                var e = this.parent.children.splice(b, 1)[0];
                d > c && (d = c), this.parent.addChildAt(e, d - 1);
            }
        },
        _transformHander: function (a) {
            a.transform.apply(a, this._updateTransform().toArray()), a.globalAlpha *= this.context.alpha;
        },
        _updateTransform: function () {
            var a = this._transform || new c();
            if (a.identity(), 1 !== this.context.scaleX || 1 !== this.context.scaleY) {
                var b = new d(this.context.scaleOrigin);
                (b.x || b.y) && a.translate(-b.x, -b.y), a.scale(this.context.scaleX, this.context.scaleY), (b.x || b.y) && a.translate(b.x, b.y);
            }
            var e = this.context.rotation;
            if (e) {
                var b = new d(this.context.rotateOrigin);
                (b.x || b.y) && a.translate(-b.x, -b.y), a.rotate(e % 360 * Math.PI / 180), (b.x || b.y) && a.translate(b.x, b.y);
            }
            return (0 != this.context.x || 0 != this.context.y) && a.translate(this.context.x, this.context.y), this._transform = a, a;
        },
        getRect: function (a) {
            return a;
        },
        hitTestPoint: function (a, b) {
            var c, d = a, e = b;
            if (this._notWatch = !0, this._transform) {
                var g = this._transform.clone().invert(), h = [
                        d,
                        e
                    ];
                g.mulVector(h, [
                    d,
                    e,
                    1
                ]), d = h[0], e = h[1];
            }
            if (!this._rect) {
                if (this._rect = this.getRect(this.context), !this._rect)
                    return !1;
                !this.context.width && this._rect.width && (this.context.width = this._rect.width), !this.context.height && this._rect.height && (this.context.height = this._rect.height);
            }
            return this._rect.width && this._rect.height ? (c = d >= this._rect.x && d <= this._rect.x + this._rect.width && e >= this._rect.y && e <= this._rect.y + this._rect.height ? f.isInside(this, d, e) : !1, this._notWatch = !1, c) : !1;
        },
        _render: function (a, b, c) {
            !this.context.visible || this.context.alpha <= 0 || (a.save(), b || this._transformHander(a, c), this.render(a), a.restore());
        },
        render: function () {
        },
        remove: function () {
            this.parent && this.parent.removeChild(this);
        },
        destroy: function () {
            this.remove(), this.context = null, delete this.context;
        },
        toString: function () {
            var a;
            if (!this.parent)
                return this.id + '(stage)';
            for (var b = this; null != b; b = b.parent) {
                var c = b.id + '(' + b.type + ')';
                if (a = null == a ? c : c + '-->' + a, b == b.parent || !b.parent)
                    break;
            }
            return a;
        }
    }), h;
}, {
    requires: [
        'canvax/event/EventDispatcher',
        'canvax/geom/Matrix',
        'canvax/display/Point',
        'canvax/core/Base',
        'canvax/utils/HitTestPoint',
        'canvax/core/propertyFactory'
    ]
}), KISSY.add('canvax/display/DisplayObjectContainer', function (a, b, c) {
    return DisplayObjectContainer = function () {
        var a = this;
        a.children = [], a.mouseChildren = [], arguments.callee.superclass.constructor.apply(this, arguments), a._eventEnabled = !0;
    }, b.creatClass(DisplayObjectContainer, c, {
        addChild: function (a) {
            return a ? -1 != this.getChildIndex(a) ? (a.parent = this, a) : (a.parent && a.parent.removeChild(a), this.children.push(a), a.parent = this, this.heartBeat && this.heartBeat({
                convertType: 'children',
                target: a,
                src: this
            }), this.afterAddChild && this.afterAddChild(a), a) : void 0;
        },
        addChildAt: function (a, b) {
            return -1 != this.getChildIndex(a) ? (a.parent = this, a) : (a.parent && a.parent.removeChild(a), this.children.splice(b, 0, a), a.parent = this, this.heartBeat && this.heartBeat({
                convertType: 'children',
                target: a,
                src: this
            }), this.afterAddChild && this.afterAddChild(a, b), a);
        },
        removeChild: function (a) {
            return this.removeChildAt(_.indexOf(this.children, a));
        },
        removeChildAt: function (a) {
            if (0 > a || a > this.children.length - 1)
                return !1;
            var b = this.children[a];
            return null != b && (b.parent = null), this.children.splice(a, 1), this.heartBeat && this.heartBeat({
                convertType: 'children',
                target: b,
                src: this
            }), this.afterDelChild && this.afterDelChild(b, a), b;
        },
        removeChildById: function (a) {
            for (var b = 0, c = this.children.length; c > b; b++)
                if (this.children[b].id == a)
                    return this.removeChildAt(b);
            return !1;
        },
        removeAllChildren: function () {
            for (; this.children.length > 0;)
                this.removeChildAt(0);
        },
        destroy: function () {
            this.parent && this.parent.removeChild(this);
            for (var a = 0, b = this.children.length; b > a; a++) {
                var c = this.children[a];
                c.destroy();
            }
        },
        getChildById: function (a, b) {
            if (b)
                return null;
            for (var c = 0, d = this.children.length; d > c; c++)
                if (this.children[c].id == a)
                    return this.children[c];
            return null;
        },
        getChildAt: function (a) {
            return 0 > a || a > this.children.length - 1 ? null : this.children[a];
        },
        getChildIndex: function (a) {
            return _.indexOf(this.children, a);
        },
        setChildIndex: function (a, b) {
            if (a.parent == this) {
                var c = _.indexOf(this.children, a);
                b != c && (this.children.splice(c, 1), this.children.splice(b, 0, a));
            }
        },
        contains: function (a) {
            return -1 != this.getChildIndex(a);
        },
        getNumChildren: function () {
            return this.children.length;
        },
        getObjectsUnderPoint: function (a, b, c) {
            for (var d = [], e = this.children.length - 1; e >= 0; e--) {
                var f = this.children[e];
                if (null != f && f._eventEnabled)
                    if (f instanceof DisplayObjectContainer) {
                        if (f.mouseChildren && f.getNumChildren() > 0) {
                            var g = f.getObjectsUnderPoint(a, b);
                            g.length > 0 && (d = d.concat(g));
                        }
                    } else if (f.hitTestPoint(a, b) && (d.push(f), void 0 != c && !isNaN(c) && d.length == c))
                        return d;
            }
            return d;
        },
        render: function (a) {
            for (var b = 0, c = this.children.length; c > b; b++) {
                var d = this.children[b];
                d._render(a);
            }
        }
    }), DisplayObjectContainer;
}, {
    requires: [
        'canvax/core/Base',
        'canvax/display/DisplayObject'
    ]
}), KISSY.add('canvax/display/Movieclip', function (a, b, c) {
    var d = function (a) {
        var b = this;
        a.context || (a.context = {}), b.type = 'movieclip', b.currentFrame = 0, b.autoPlay = a.autoPlay || !1, b.repeat = a.repeat || 0, b.overPlay = a.overPlay || !1, b._frameRate = c.mainFrameRate, b._speedTime = parseInt(1000 / b._frameRate), b._preRenderTime = 0, b._context = {}, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        init: function () {
        },
        getStatus: function () {
            return this.autoPlay;
        },
        getFrameRate: function () {
            return this._frameRate;
        },
        setFrameRate: function (a) {
            var b = this;
            b._frameRate != a && (b._frameRate = a, b._speedTime = parseInt(1000 / b._frameRate));
        },
        afterAddChild: function (a, b) {
            1 != this.children.length && void 0 != b && b <= this.currentFrame && this.currentFrame++;
        },
        afterDelChild: function (a, b) {
            this.currentFrame;
            b < this.currentFrame && this.currentFrame--, this.currentFrame >= this.children.length && this.children.length > 0 && (this.currentFrame = this.children.length - 1);
        },
        _goto: function (a) {
            var b = this.children.length;
            a >= b && (a %= b), 0 > a && (a = this.children.length - 1 - Math.abs(a) % b), this.currentFrame = a;
        },
        gotoAndStop: function (a) {
            return this._goto(a), this.autoPlay ? (this.autoPlay = !1, void 0) : (this._preRenderTime = 0, this.getStage().heartBeat(), void 0);
        },
        stop: function () {
            this.autoPlay && (this.autoPlay = !1);
        },
        gotoAndPlay: function (a) {
            this._goto(a), this.play();
        },
        play: function () {
            if (!this.autoPlay) {
                this.autoPlay = !0;
                var a = this.getStage().parent;
                a._heartBeat || 0 != a._taskList.length || a.__startEnter(), this._push2TaskList(), this._preRenderTime = new Date().getTime();
            }
        },
        _push2TaskList: function () {
            this._enterInCanvax || (this.getStage().parent._taskList.push(this), this._enterInCanvax = !0);
        },
        _enterInCanvax: !1,
        __enterFrame: function () {
            var a = this;
            c.now - a._preRenderTime >= a._speedTime && a.getStage().heartBeat();
        },
        next: function () {
            var a = this;
            a.autoPlay || a.gotoAndStop(a._next());
        },
        pre: function () {
            var a = this;
            a.autoPlay || a.gotoAndStop(a._pre());
        },
        _next: function () {
            return this.currentFrame >= this.children.length - 1 ? this.currentFrame = 0 : this.currentFrame++, this.currentFrame;
        },
        _pre: function () {
            return 0 == this.currentFrame ? this.currentFrame = this.children.length - 1 : this.currentFrame--, this.currentFrame;
        },
        render: function (a) {
            if (!(c.now - this._preRenderTime < this._speedTime)) {
                if (this.overPlay)
                    for (var b = 0; b <= this.currentFrame; b++)
                        this.getChildAt(b)._render(a);
                else
                    this.getChildAt(this.currentFrame)._render(a);
                if (1 == this.children.length && (this.autoPlay = !1), this.currentFrame == this.getNumChildren() - 1 && (this.repeat || (this.stop(), this.hasEvent('end') && this.fire('end')), _.isNumber(this.repeat) && this.repeat > 0 && this.repeat--), this.autoPlay)
                    c.now - this._preRenderTime >= this._speedTime && (this._preRenderTime = c.now, this._next()), this._push2TaskList();
                else if (this._enterInCanvax) {
                    this._enterInCanvax = !1;
                    var d = this.getStage().parent._taskList;
                    d.splice(_.indexOf(d, this), 1);
                }
            }
        }
    }), d;
}, {
    requires: [
        'canvax/display/DisplayObjectContainer',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/display/Point', function () {
    var a = function (a, b) {
        if (1 != arguments.length || 'object' != typeof arguments[0])
            a || (a = 0), b || (b = 0), this.x = 1 * a, this.y = 1 * b;
        else {
            var c = arguments[0];
            if ('x' in c && 'y' in c)
                this.x = 1 * c.x, this.y = 1 * c.y;
            else {
                var d = 0;
                for (var e in c) {
                    if (0 != d) {
                        this.y = 1 * c[e];
                        break;
                    }
                    this.x = 1 * c[e], d++;
                }
            }
        }
    };
    return a;
}, { requires: [] }), KISSY.add('canvax/display/Shape', function (a, b, c, d) {
    var e = function (a) {
        var b = this;
        b._hoverable = !1, b._clickable = !1, b._hoverClass = !1, b._dragDuplicate = null, b.type = b.type || 'shape', a.draw && (b.draw = a.draw), arguments.callee.superclass.constructor.apply(this, arguments), b._rect = null;
    };
    return d.creatClass(e, b, {
        init: function () {
        },
        draw: function () {
        },
        getRect: function (a) {
            return a;
        },
        setContextStyle: function (a, b) {
            for (p in b)
                p in a && b[p] && (a[p] = b[p]);
        },
        drawEnd: function (a) {
            if (!this._hasFillAndStroke) {
                var b = this.context;
                'stroke' != this.drawTypeOnly && a.closePath(), (b.strokeStyle || b.lineWidth) && a.stroke(), b.fillStyle && 'stroke' != this.drawTypeOnly && a.fill();
            }
        },
        render: function () {
            var a = this, b = a.context, c = a.getStage().context2D;
            b && a.setContextStyle(c, b), 'shape' == a.context.type ? a.draw.apply(a) : a.draw && (c.beginPath(), a.draw(c, b), a.drawEnd(c));
        },
        dashedLineTo: function (a, b, c, d, e, f) {
            f = 'undefined' == typeof f ? 5 : f;
            for (var g = d - b, h = e - c, i = Math.floor(Math.sqrt(g * g + h * h) / f), j = 0; i > j; ++j)
                a[j % 2 === 0 ? 'moveTo' : 'lineTo'](b + g / i * j, c + h / i * j);
        }
    }), e;
}, {
    requires: [
        'canvax/display/DisplayObject',
        'canvax/geom/Vector',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/display/Sprite', function (a, b, c) {
    var d = function () {
        var a = this;
        a.type = 'sprite', arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        init: function () {
        }
    }), d;
}, {
    requires: [
        'canvax/display/DisplayObjectContainer',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/display/Stage', function (a, b, c) {
    var d = function () {
        var a = this;
        a.type = 'stage', a.context2D = null, a.stageRending = !1, a._isReady = !1, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        init: function () {
        },
        initStage: function (a, b, d) {
            var e = this;
            e.context2D = a, e.context.width = b, e.context.height = d, e.context.scaleX = c._devicePixelRatio, e.context.scaleY = c._devicePixelRatio, e._isReady = !0;
        },
        render: function (a) {
            this.stageRending = !0, a || (a = this.context2D), this.clear();
            var b = this.dragTarget;
            if (b) {
                var c = b.globalToLocal(this.mouseX, this.mouseY);
                b.context.x = c.x, b.context.y = c.y;
            }
            d.superclass.render.call(this, a), this.stageRending = !1;
        },
        heartBeat: function (a) {
            var b = this;
            b._isReady && (a || (a = {}), a.stage = b, b.parent && b.parent.heartBeat(a));
        },
        clear: function (a, b, c, d) {
            arguments.length >= 4 ? this.context2D.clearRect(a, b, c, d) : this.context2D.clearRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
        }
    }), d;
}, {
    requires: [
        'canvax/display/DisplayObjectContainer',
        'canvax/core/Base',
        'canvax/event/StageEvent'
    ]
}), KISSY.add('canvax/display/Text', function (a, b, c) {
    var d = function (a, b) {
        var c = this;
        c.type = 'text', c._reNewline = /\r?\n/, b.context || (b.context = {}), c._context = {
            fontSize: b.context.fontSize || 13,
            fontWeight: b.context.fontWeight || 'normal',
            fontFamily: b.context.fontFamily || '\u5FAE\u8F6F\u96C5\u9ED1',
            textDecoration: b.context.textDecoration || '',
            fontStyle: b.context.fontStyle || 'blank',
            lineHeight: b.context.lineHeight || 1.3,
            textBackgroundColor: b.context.textBackgroundColor || ''
        }, c.text = a.toString(), arguments.callee.superclass.constructor.apply(this, [b]);
    };
    return c.creatClass(d, b, {
        init: function () {
        },
        render: function (a) {
            var b = this.text.split(this._reNewline);
            this.context.width = this._getTextWidth(a, b), this.context.height = this._getTextHeight(a, b), this.clipTo && this.clipContext(this, a), this._renderTextBackground(a, b), this._renderText(a, b), this.clipTo && a.restore();
        },
        _renderText: function (a, b) {
            a.save(), this._setShadow(a), this._renderTextFill(a, b), this._renderTextStroke(a, b), this._removeShadow(a), a.restore();
        },
        _renderTextFill: function (a, b) {
            if (this.context.fillStyle) {
                this._boundaries = [];
                for (var c = 0, d = 0, e = b.length; e > d; d++) {
                    var f = this._getHeightOfLine(a, d, b);
                    c += f, this._renderTextLine('fillText', a, b[d], this._getLeftOffset(), this._getTopOffset() + c, d);
                }
            }
        },
        _renderTextStroke: function (a, b) {
            if (this.context.strokeStyle || this._skipFillStrokeCheck) {
                var c = 0;
                a.save(), this.strokeDashArray && (1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), supportsLineDash && a.setLineDash(this.strokeDashArray)), a.beginPath();
                for (var d = 0, e = b.length; e > d; d++) {
                    var f = this._getHeightOfLine(a, d, b);
                    c += f, this._renderTextLine('strokeText', a, b[d], this._getLeftOffset(), this._getTopOffset() + c, d);
                }
                a.closePath(), a.restore();
            }
        },
        _renderTextLine: function (a, b, c, d, e, f) {
            if (e -= this.context.fontSize / 4, 'justify' !== this.context.textAlign)
                return this._renderChars(a, b, c, d, e, f), void 0;
            var g = b.measureText(c).width, h = this.context.width;
            if (h > g)
                for (var i = c.split(/\s+/), j = b.measureText(c.replace(/\s+/g, '')).width, k = h - j, l = i.length - 1, m = k / l, n = 0, o = 0, p = i.length; p > o; o++)
                    this._renderChars(a, b, i[o], d + n, e, f), n += b.measureText(i[o]).width + m;
            else
                this._renderChars(a, b, c, d, e, f);
        },
        _renderChars: function (a, b, c, d, e) {
            b[a](c, d, e);
        },
        _setShadow: function (a) {
            this.shadow && (a.shadowColor = 'red', a.shadowBlur = 1, a.shadowOffsetX = 1, a.shadowOffsetY = 1);
        },
        _removeShadow: function (a) {
            a.shadowColor = '', a.shadowBlur = a.shadowOffsetX = a.shadowOffsetY = 0;
        },
        _getHeightOfLine: function () {
            return this.context.fontSize * this.context.lineHeight;
        },
        _getTextWidth: function (a, b) {
            for (var c = a.measureText(b[0] || '|').width, d = 1, e = b.length; e > d; d++) {
                var f = a.measureText(b[d]).width;
                f > c && (c = f);
            }
            return c;
        },
        _getTextHeight: function (a, b) {
            return this.context.fontSize * b.length * this.context.lineHeight;
        },
        clipContext: function (a, b) {
            b.save(), b.beginPath(), a.clipTo(b), b.clip();
        },
        _renderTextBackground: function (a, b) {
            this._renderTextBoxBackground(a), this._renderTextLinesBackground(a, b);
        },
        _renderTextBoxBackground: function (a) {
            this.context.backgroundColor && (a.save(), a.fillStyle = this.context.backgroundColor, a.fillRect(this._getLeftOffset(), this._getTopOffset(), this.context.width, this.context.height), a.restore());
        },
        _getLeftOffset: function () {
            var a = 0;
            switch (this.context.textAlign) {
            case 'left':
                a = 0;
                break;
            case 'center':
                a = -this.context.width / 2;
                break;
            case 'right':
                a = -this.context.width;
            }
            return a;
        },
        _getTopOffset: function () {
            var a = 0;
            switch (this.context.textBaseline) {
            case 'top':
                a = 0;
                break;
            case 'middle':
                a = -this.context.height / 2;
                break;
            case 'bottom':
                a = -this.context.height;
            }
            return a;
        },
        _renderTextLinesBackground: function (a, b) {
            if (this.context.textBackgroundColor) {
                a.save(), a.fillStyle = this.context.textBackgroundColor;
                for (var c = 0, d = b.length; d > c; c++)
                    if ('' !== b[c]) {
                        var e = this._getLineWidth(a, b[c]), f = this._getLineLeftOffset(e);
                        a.fillRect(this._getLeftOffset() + f, this._getTopOffset() + c * this.context.fontSize * this.context.lineHeight, e, this.context.fontSize * this.context.lineHeight);
                    }
                a.restore();
            }
        },
        _getLineWidth: function (a, b) {
            return 'justify' === this.context.textAlign ? this.context.width : a.measureText(b).width;
        },
        _getLineLeftOffset: function (a) {
            return 'center' === this.context.textAlign ? (this.context.width - a) / 2 : 'right' === this.context.textAlign ? this.context.width - a : 0;
        }
    }), d;
}, {
    requires: [
        'canvax/display/DisplayObject',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/event/EventBase', function () {
    var a = function (a, b, c) {
        this.type = a, this.target = null, this.currentTarget = null, this.params = null, this.bubbles = void 0 != b ? b : !1, this.cancelable = void 0 != c ? c : !1;
    };
    return a.prototype.stopPropagation = function () {
    }, a.prototype.preventDefault = function () {
    }, a.prototype.clone = function () {
        return Base.copy(this);
    }, a.prototype.dispose = function () {
        delete this.type, delete this.target, delete this.currentTarget, delete this.params;
    }, a.prototype.toString = function () {
        return '[EventBase type=' + this.type + ']';
    }, a;
}, { requires: ['canvax/core/Base'] }), KISSY.add('canvax/event/EventDispatcher', function (a, b, c) {
    var d = function () {
        arguments.callee.superclass.constructor.call(this, name);
    };
    return b.creatClass(d, c, {
        on: function (a, b) {
            this._addEventListener(a, b);
        },
        addEventListener: function (a, b) {
            this._addEventListener(a, b);
        },
        un: function (a, b) {
            this._removeEventListener(a, b);
        },
        removeEventListener: function (a, b) {
            this._removeEventListener(a, b);
        },
        removeEventListenerByType: function (a) {
            this._removeEventListenerByType(a);
        },
        removeAllEventListeners: function () {
            this._removeAllEventListeners();
        },
        fire: function (a) {
            _.isString(a) && (a = { type: a }), this.dispatchEvent(a);
        },
        dispatchEvent: function (a) {
            if ('mouseover' != a.type) {
                if (this._dispatchEvent(a), 'mouseout' == a.type && this._hoverClass) {
                    var b = this.getStage().parent;
                    this._hoverClass = !1, b._hoverStage.removeChildById(this.id);
                }
            } else {
                var c = this._heartBeatNum;
                if (this._dispatchEvent(a), c != this._heartBeatNum) {
                    this._hoverClass = !0;
                    var b = this.getStage().parent;
                    _.values(b.convertStages[this.getStage().id].convertShapes).length > 1 || delete b.convertStages[this.getStage().id];
                    var d = this.clone(!0);
                    d._transform = d.getConcatenatedMatrix(), b._hoverStage.addChild(d);
                }
            }
        },
        hasEvent: function (a) {
            return this._hasEventListener(a);
        },
        hasEventListener: function (a) {
            return this._hasEventListener(a);
        },
        hover: function (a, b) {
            this.on('mouseover', a), this.on('mouseout', b);
        },
        once: function (a, b) {
            this.on(a, function () {
                b.apply(this, arguments), this.un(a, arguments.callee);
            });
        }
    }), d;
}, {
    requires: [
        'canvax/core/Base',
        'canvax/event/EventManager'
    ]
}), KISSY.add('canvax/event/EventManager', function () {
    var a = function () {
        this._eventMap = {};
    };
    return a.prototype = {
        _addEventListener: function (a, b) {
            if ('function' != typeof b)
                return !1;
            'mouseover' == a && (this._hoverable = !0), 'click' == a && (this._clickable = !0);
            var c = this._eventMap[a];
            return c ? -1 == _.indexOf(c, b) ? (c.push(b), this._eventEnabled = !0, !0) : !1 : (c = this._eventMap[a] = [], c.push(b), this._eventEnabled = !0, !0);
        },
        _removeEventListener: function (a, b) {
            if (1 == arguments.length)
                return this.removeEventListenerByType(a);
            var c = this._eventMap[a];
            if (!c)
                return !1;
            for (var d = 0; d < c.length; d++) {
                var e = c[d];
                if (e === b)
                    return c.splice(d, 1), 0 == c.length && (delete this._eventMap[a], 'mouseover' == a && (this._hoverable = !1), 'click' == a && (this._clickable = !1), _.isEmpty(this._eventMap) && (this._eventEnabled = !1)), !0;
            }
            return !1;
        },
        _removeEventListenerByType: function (a) {
            var b = this._eventMap[a];
            return b ? !1 : (delete this._eventMap[a], 'mouseover' == a && (this._hoverable = !1), 'click' == a && (this._clickable = !1), _.isEmpty(this._eventMap) && (this._eventEnabled = !1), !0);
        },
        _removeAllEventListeners: function () {
            this._eventMap = {}, this._hoverable = !1, this._chickable = !1, this._eventEnabled = !1;
        },
        _dispatchEvent: function (a) {
            var b = this._eventMap[a.type];
            if (!b)
                return !1;
            a.target || (a.target = this), b = b.slice();
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                'function' == typeof d && d.call(this, a);
            }
            return !0;
        },
        _hasEventListener: function (a) {
            var b = this._eventMap[a];
            return null != b && b.length > 0;
        }
    }, a;
}, { requires: [] }), KISSY.add('canvax/event/StageEvent', function (a, b, c) {
    var d = function (a, c, d) {
        b.call(this, a, c, d), this.mouseX = 0, this.mouseY = 0;
    };
    return c.creatClass(d, b, {
        toString: function () {
            return '[StageEvent type=' + this.type + ', mouseX=' + this.mouseX + ', mouseY=' + this.mouseY + ']';
        }
    }), d.ENTER_FRAME = 'enterframe', d.MOUSE_DOWN = 'mousedown', d.MOUSE_UP = 'mouseup', d.MOUSE_MOVE = 'mousemove', d.MOUSE_OVER = 'mouseover', d.MOUSE_OUT = 'mouseout', d;
}, {
    requires: [
        'canvax/event/EventBase',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/geom/Matrix', function (a, b) {
    var c = function (a, b, c, d, e, f) {
        this.a = void 0 != a ? a : 1, this.b = void 0 != b ? b : 0, this.c = void 0 != c ? c : 0, this.d = void 0 != d ? d : 1, this.tx = void 0 != e ? e : 0, this.ty = void 0 != f ? f : 0;
    };
    return b.creatClass(c, function () {
    }, {
        concat: function (a) {
            var b = this.a, c = this.c, d = this.tx;
            return this.a = b * a.a + this.b * a.c, this.b = b * a.b + this.b * a.d, this.c = c * a.a + this.d * a.c, this.d = c * a.b + this.d * a.d, this.tx = d * a.a + this.ty * a.c + a.tx, this.ty = d * a.b + this.ty * a.d + a.ty, this;
        },
        concatTransform: function (a, b, d, e, f) {
            var g = 1, h = 0;
            if (f % 360) {
                var i = f * Math.PI / 180;
                g = Math.cos(i), h = Math.sin(i);
            }
            return this.concat(new c(g * d, h * d, -h * e, g * e, a, b)), this;
        },
        rotate: function (a) {
            var b = Math.cos(a), c = Math.sin(a), d = this.a, e = this.c, f = this.tx;
            if (a > 0)
                this.a = d * b - this.b * c, this.b = d * c + this.b * b, this.c = e * b - this.d * c, this.d = e * c + this.d * b, this.tx = f * b - this.ty * c, this.ty = f * c + this.ty * b;
            else {
                var g = Math.sin(Math.abs(a)), h = Math.cos(Math.abs(a));
                this.a = d * h + this.b * g, this.b = -d * g + this.b * h, this.c = e * h + this.d * g, this.d = -e * g + h * this.d, this.tx = h * f + g * this.ty, this.ty = h * this.ty - g * f;
            }
            return this;
        },
        scale: function (a, b) {
            return this.a *= a, this.d *= b, this.tx *= a, this.ty *= b, this;
        },
        translate: function (a, b) {
            return this.tx += a, this.ty += b, this;
        },
        identity: function () {
            return this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this;
        },
        invert: function () {
            var a = this.a, b = this.b, c = this.c, d = this.d, e = this.tx, f = a * d - b * c;
            return this.a = d / f, this.b = -b / f, this.c = -c / f, this.d = a / f, this.tx = (c * this.ty - d * e) / f, this.ty = -(a * this.ty - b * e) / f, this;
        },
        clone: function () {
            return new c(this.a, this.b, this.c, this.d, this.tx, this.ty);
        },
        toString: function () {
            return '(a=' + this.a + ', b=' + this.b + ', c=' + this.c + ', d=' + this.d + ', tx=' + this.tx + ', ty=' + this.ty + ')';
        },
        toArray: function () {
            return [
                this.a,
                this.b,
                this.c,
                this.d,
                this.tx,
                this.ty
            ];
        },
        mulVector: function (a, b) {
            var c = this.a, d = this.c, e = this.tx, f = this.b, g = this.d, h = this.ty;
            return a[0] = b[0] * c + b[1] * d + e, a[1] = b[0] * f + b[1] * g + h, a;
        }
    }), c;
}, { requires: ['canvax/core/Base'] }), KISSY.add('canvax/geom/Vector', function () {
    var a = {
            add: function (a, b, c) {
                return a[0] = b[0] + c[0], a[1] = b[1] + c[1], a;
            },
            sub: function (a, b, c) {
                return a[0] = b[0] - c[0], a[1] = b[1] - c[1], a;
            },
            length: function (a) {
                return Math.sqrt(this.lengthSquare(a));
            },
            lengthSquare: function (a) {
                return a[0] * a[0] + a[1] * a[1];
            },
            mul: function (a, b, c) {
                return a[0] = b[0] * c[0], a[1] = b[1] * c[1], a;
            },
            dot: function (a, b) {
                return a[0] * b[0] + a[1] * b[1];
            },
            scale: function (a, b, c) {
                return a[0] = b[0] * c, a[1] = b[1] * c, a;
            },
            normalize: function (b, c) {
                var d = a.length(c);
                return 0 === d ? (b[0] = 0, b[1] = 0) : (b[0] = c[0] / d, b[1] = c[1] / d), b;
            },
            distance: function (a, b) {
                return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
            },
            negate: function (a, b) {
                a[0] = -b[0], a[1] = -b[1];
            },
            middle: function (a, b, c) {
                return a[0] = (b[0] + c[0]) / 2, a[1] = (b[1] + c[1]) / 2, a;
            }
        };
    return a;
}, { requires: ['canvax/core/Base'] }), KISSY.add('canvax/index', function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = function (a) {
        var b = this;
        b.type = 'canvax', b.el = a.el || null, b.el.html(''), b.mouseTarget = null, b.dragTarget = null, b.convertStages = {}, b.rootOffset = {
            left: 0,
            top: 0
        }, b.mouseX = 0, b.mouseY = 0, b._heartBeat = !1, b._speedTime = parseInt(1000 / d.mainFrameRate), b._preRenderTime = 0, b._taskList = [], b._Event = null, b._hoverStage = null, b._pixelCtx = null, b._isReady = !1, b._touching = !1, b._draging = !1, b._cursor = 'default', arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return d.creatClass(p, b, {
        init: function () {
            var a = this;
            a.context.width = a.el.width(), a.context.height = a.el.height(), a._creatHoverStage(), a._initEvent(), a.createPixelContext(), a._isReady = !0;
        },
        _creatHoverStage: function () {
            var a = this;
            a._hoverStage = new c({
                id: 'activCanvas' + new Date().getTime(),
                context: {
                    width: a.context.width,
                    height: a.context.height
                }
            }), a.addChild(a._hoverStage);
        },
        _initEvent: function () {
            var a = this;
            a.rootOffset = a.el.offset(), a._Event = new e(), a.el.on('click', function (b) {
                a.__mouseHandler(b);
            }), a.el.on('mousedown', function (b) {
                a.__mouseHandler(b);
            }), a._moveStep = 0, a.el.on('mousemove', function (b) {
                return a._moveStep < 1 ? (a._moveStep++, void 0) : (a._moveStep = 0, a.__mouseHandler(b), void 0);
            }), a.el.on('mouseup', function (b) {
                a.__mouseHandler(b);
            }), a.el.on('mouseout', function (b) {
                a.__mouseHandler(b);
            });
        },
        createPixelContext: function () {
            var b = this, c = null;
            c = 0 == a.all('#_pixelCanvas').length ? d._createCanvas('_pixelCanvas', b.context.width, b.context.height) : a.all('#_pixelCanvas')[0], document.body.appendChild(c), d.initElement(c), c.style.display = 'none', d._pixelCtx = c.getContext('2d');
        },
        __mouseHandler: function (a) {
            var b = this, c = a.pageX - b.rootOffset.left, d = a.pageY - b.rootOffset.top;
            if (b.mouseX = c, b.mouseY = d, 'mousedown' == a.type) {
                if (!b.mouseTarget) {
                    var e = b.getObjectsUnderPoint(b.mouseX, b.mouseY, 1)[0];
                    e && (b.mouseTarget = e);
                }
                b.mouseTarget && b.dragEnabled && (b._touching = !0);
            }
            if (('mouseup' == a.type || 'mouseout' == a.type) && (1 == b._draging && b._dragEnd(), b._draging = !1, b._touching = !1), 'mouseout' == a.type && b.__getMouseTarget(a), 'mousemove' == a.type || 'mousedown' == a.type) {
                if (b._touching && 'mousemove' == a.type && b.mouseTarget)
                    return b._draging ? b._dragIng() : (b.mouseTarget.dragBegin && b.mouseTarget.dragBegin(a), b.mouseTarget.context.visible = !1, b._clone2hoverStage()), b._draging = !0, b;
                this.__getMouseTarget(a);
            } else if (this.mouseTarget) {
                var f = _.extend(b._Event, a);
                f.target = f.currentTarget = this.mouseTarget || this, f.mouseX = this.mouseX, f.mouseY = this.mouseY, this.mouseTarget.dispatchEvent(f);
            }
            try {
                a.preventDefault(), a.stopPropagation();
            } catch (f) {
            }
        },
        __getMouseTarget: function (a) {
            var b = this.mouseTarget;
            if ('mousemove' != a.type || !b || !b.hitTestPoint(this.mouseX, this.mouseY)) {
                var c = this.getObjectsUnderPoint(this.mouseX, this.mouseY, 1)[0], d = _.extend(this._Event, a);
                if (d.target = d.currentTarget = c, d.mouseX = this.mouseX, d.mouseY = this.mouseY, this._cursorHander(c, b), b && b != c || 'mouseout' == d.type) {
                    if (!b)
                        return;
                    this.mouseTarget = null, d.type = 'mouseout', d.target = d.currentTarget = b, b.context.visible || (b.context.visible = !0), b.dispatchEvent(d);
                }
                c && b != c && c._hoverable && (this.mouseTarget = c, d.type = 'mouseover', d.target = d.currentTarget = c, c.dispatchEvent(d));
            }
        },
        _clone2hoverStage: function () {
            var a = this, b = a._hoverStage.getChildById(a.mouseTarget.id);
            b || (b = a.mouseTarget.clone(!0), b._transform = b.getConcatenatedMatrix(), a._hoverStage.addChild(b)), b.context = f(a.mouseTarget.context.$model), b.context.$owner = b, b.context.$watch = a.mouseTarget.context.$watch, b.context.visible = !0, b._dragPoint = b.globalToLocal(a.mouseX, a.mouseY);
        },
        _dragIng: function () {
            var a = this, b = a._hoverStage.getChildById(a.mouseTarget.id);
            b.context.x = a.mouseX - b._dragPoint.x, b.context.y = a.mouseY - b._dragPoint.y, a.mouseTarget.drag && a.mouseTarget.drag(event);
        },
        _dragEnd: function () {
            var a = this;
            a.dragEnd && a.dragEnd(event);
            var b = a._hoverStage.getChildById(a.mouseTarget.id);
            a.mouseTarget.context = b.context, a.mouseTarget.context.$owner = a.mouseTarget, a.mouseTarget.context.visible = !1, a.mouseTarget._updateTransform(), 'mouseout' == event.type && b.destroy();
        },
        _cursorHander: function (a, b) {
            a || b || this.setCursor('default'), a && b != a && this.setCursor(a.context.cursor);
        },
        setCursor: function (a) {
            this._cursor != a && (this.el.css('cursor', a), this._cursor = a);
        },
        setFrameRate: function (a) {
            d.mainFrameRate != a && (d.mainFrameRate = a, this._speedTime = parseInt(1000 / d.mainFrameRate));
        },
        __startEnter: function () {
            var a = this;
            a.requestAid || (a.requestAid = requestAnimationFrame(function () {
                a.__enterFrame();
            }));
        },
        __enterFrame: function () {
            var a = this;
            if (a.requestAid = null, d.now = new Date().getTime(), a._heartBeat) {
                if (d.now - a._preRenderTime < a._speedTime)
                    return a.__startEnter(), void 0;
                _.each(_.values(a.convertStages), function (a) {
                    a.stage._render(a.stage.context2D);
                }), a._heartBeat = !1, a.convertStages = {}, a._preRenderTime = new Date().getTime();
            }
            if (a._taskList.length > 0)
                for (var b = 0, c = a._taskList.length; c > b; b++) {
                    var e = a._taskList[b];
                    e.__enterFrame ? e.__enterFrame() : a.__taskList.splice(b--, 1);
                }
            a._taskList.length > 0 && a.__startEnter();
        },
        afterAddChild: function (a) {
            var b = d._createCanvas(a.id, this.context.width, this.context.height);
            1 == this.children.length ? this.el.append(b) : this.children.length > 1 && this.el[0].insertBefore(b, this._hoverStage.context2D.canvas), d.initElement(b), a.initStage(b.getContext('2d'), this.context.width, this.context.height);
        },
        afterDelChild: function () {
        },
        heartBeat: function (a) {
            var b = this;
            if ('context' == a.convertType) {
                var c = a.stage, d = a.shape, e = a.name, f = a.value, g = a.preValue;
                if (!b._isReady)
                    return;
                if (b.convertStages[c.id] || (b.convertStages[c.id] = {
                        stage: c,
                        convertShapes: {}
                    }), d) {
                    b.convertStages[c.id].convertShapes[d.id] || (b.convertStages[c.id].convertShapes[d.id] = {
                        shape: d,
                        convertType: null,
                        convertLog: []
                    });
                    var h = b.convertStages[c.id].convertShapes[d.id];
                    h.convertLog.push(e, f, g);
                }
            }
            if ('children' == a.convertType) {
                var i = a.target, c = a.src.getStage();
                (c || 'stage' == i.type) && (c = c || i, b.convertStages[c.id] || (b.convertStages[c.id] = {
                    stage: c,
                    convertShapes: {}
                }));
            }
            if (!a.convertType) {
                var c = a.stage;
                b.convertStages[c.id] || (b.convertStages[c.id] = {
                    stage: c,
                    convertShapes: {}
                });
            }
            b._heartBeat ? b._heartBeat = !0 : (b._heartBeat = !0, b.__startEnter());
        }
    }), p.propertyFactory = f, p.Display = {
        Stage: c,
        Sprite: g,
        Text: h,
        Shape: i,
        Movieclip: j,
        Bitmap: k,
        Point: l
    }, p.Shapes = m, p.Utils = { ImagesLoader: o }, p.Animation = n, p;
}, {
    requires: [
        'canvax/display/DisplayObjectContainer',
        'canvax/display/Stage',
        'canvax/core/Base',
        'canvax/event/StageEvent',
        'canvax/core/propertyFactory',
        'canvax/display/Sprite',
        'canvax/display/Text',
        'canvax/display/Shape',
        'canvax/display/Movieclip',
        'canvax/display/Bitmap',
        'canvax/display/Point',
        'canvax/shape/Shapes',
        'canvax/animation/Animation',
        'canvax/utils/ImagesLoader',
        window._ ? '' : 'canvax/library/underscore'
    ]
}), KISSY.add('canvax/shape/Beziercurve', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'beziercurve', b.drawTypeOnly = 'stroke', a.context || (a.context = {}), b._context = {
            xStart: a.context.xStart || 0,
            yStart: a.context.yStart || 0,
            cpX1: a.context.cpX1 || 0,
            cpY1: a.context.cpY1 || 0,
            cpX2: a.context.cpX2 || 0,
            cpY2: a.context.cpY2 || 0,
            xEnd: a.context.xEnd || 0,
            yEnd: a.context.yEnd || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            a.moveTo(b.xStart, b.yStart), 'undefined' != typeof b.cpX2 && 'undefined' != typeof b.cpY2 ? a.bezierCurveTo(b.cpX1, b.cpY1, b.cpX2, b.cpY2, b.xEnd, b.yEnd) : a.quadraticCurveTo(b.cpX1, b.cpY1, b.xEnd, b.yEnd);
        },
        getRect: function (a) {
            var b = Math.min(a.xStart, a.xEnd, a.cpX1), c = Math.min(a.yStart, a.yEnd, a.cpY1), d = Math.max(a.xStart, a.xEnd, a.cpX1), e = Math.max(a.yStart, a.yEnd, a.cpY1), f = a.cpX2, g = a.cpY2;
            'undefined' != typeof f && 'undefined' != typeof g && (b = Math.min(b, f), c = Math.min(c, g), d = Math.max(d, f), e = Math.max(e, g));
            var h = a.lineWidth || 1;
            return {
                x: b - h,
                y: c - h,
                width: d - b + h,
                height: e - c + h
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/BrokenLine', function (a, b, c, d) {
    var e = function (a) {
        var b = this;
        b.type = 'brokenLine', b.drawTypeOnly = 'stroke', a.context || (a.context = {}), b._context = { pointList: a.context.pointList || [] }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return d.creatClass(e, b, {
        draw: function (a, b) {
            var c = b.pointList.$model;
            if (!(c.length < 2))
                if (b.lineType && 'solid' != b.lineType) {
                    if ('dashed' == b.lineType || 'dotted' == b.lineType) {
                        var d = b.lineWidth || 1, e = [
                                d * ('dashed' == b.lineType ? 6 : 1),
                                4 * d
                            ];
                        a.moveTo(c[0][0], c[0][1]);
                        for (var f = 1, g = c.length; g > f; f++)
                            for (var h, i, j, k = c[f - 1][0], l = c[f][0], m = c[f - 1][1], n = c[f][1], o = l - k, p = n - m, q = Math.atan2(p, o), r = k, s = m, t = 0, u = !0; !(0 > o ? l >= r : r >= l) || !(0 > p ? n >= s : s >= n);)
                                h = e[t++ % e.length], i = r + Math.cos(q) * h, r = 0 > o ? Math.max(l, i) : Math.min(l, i), j = s + Math.sin(q) * h, s = 0 > p ? Math.max(n, j) : Math.min(n, j), u ? a.lineTo(r, s) : a.moveTo(r, s), u = !u;
                    }
                } else {
                    a.moveTo(c[0][0], c[0][1]);
                    for (var f = 1, g = c.length; g > f; f++)
                        a.lineTo(c[f][0], c[f][1]);
                }
        },
        getRect: function (a) {
            return c.prototype.getRect(a);
        }
    }), e;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/shape/Polygon',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Circle', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'circle', a.context || (a.context = {}), b._context = { r: a.context.r || 0 }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            b && a.arc(0, 0, b.r, 0, 2 * Math.PI, !0);
        },
        getRect: function (a) {
            var b;
            return b = a.fillStyle || a.strokeStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(0 - a.r - b / 2),
                y: Math.round(0 - a.r - b / 2),
                width: 2 * a.r + b,
                height: 2 * a.r + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Droplet', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'droplet', a.context || (a.context = {}), b._context = {
            hr: a.context.hr || 0,
            vr: a.context.vr || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            a.moveTo(0, b.hr), a.bezierCurveTo(b.hr, b.hr, 3 * b.hr / 2, -b.hr / 3, 0, -b.vr), a.bezierCurveTo(3 * -b.hr / 2, -b.hr / 3, -b.hr, b.hr, 0, b.hr);
        },
        getRect: function (a) {
            var b;
            return b = a.fillStyle || a.strokeStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(0 - a.hr - b / 2),
                y: Math.round(0 - a.vr - b / 2),
                width: 2 * a.hr + b,
                height: a.hr + a.vr + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Ellipse', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'ellipse', a.context || (a.context = {}), b._context = {
            hr: a.context.hr || 0,
            vr: a.context.vr || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            var c = b.hr > b.vr ? b.hr : b.vr, d = b.hr / c, e = b.vr / c;
            a.scale(d, e), a.arc(0, 0, c, 0, 2 * Math.PI, !0), document.createElement('canvas').getContext && a.scale(1 / d, 1 / e);
        },
        getRect: function (a) {
            var b;
            return b = a.fillStyle || a.strokeStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(0 - a.hr - b / 2),
                y: Math.round(0 - a.vr - b / 2),
                width: 2 * a.hr + b,
                height: 2 * a.vr + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Heart', function (a, b, c) {
    var d = function (a) {
        var b = this;
        this.type = 'heart', a.context || (a.context = {}), b._context = {
            hr: a.context.hr || 0,
            vr: a.context.vr || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            a.moveTo(0, 0), a.bezierCurveTo(b.hr / 2, 2 * -b.vr / 3, 2 * b.hr, b.vr / 3, 0, b.vr), a.bezierCurveTo(2 * -b.hr, b.vr / 3, -b.hr / 2, 2 * -b.vr / 3, 0, 0);
        },
        getRect: function (a) {
            var b;
            return b = a.fillStyle || a.strokeStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(0 - a.hr - b / 2),
                y: Math.round(0 - a.vr / 4 - b / 2),
                width: 2 * a.hr + b,
                height: 5 * a.vr / 4 + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Isogon', function (a, b, c, d) {
    var e = function (a) {
            var b = this;
            this.type = 'isogon', a.context || (a.context = {}), b._context = {
                pointList: [],
                r: a.context.r || 0,
                n: a.context.n || 0
            }, arguments.callee.superclass.constructor.apply(this, arguments);
        }, f = c.sin, g = c.cos, h = Math.PI;
    return d.creatClass(e, b, {
        draw: function (a, b) {
            var c = b.n;
            if (c && !(2 > c)) {
                var d = 0, e = 0, i = b.r, j = 2 * h / c, k = -h / 2, l = d + i * g(k), m = e + i * f(k);
                k += j;
                var n = b.pointList = [];
                n.push([
                    l,
                    m
                ]);
                for (var o = 0, p = c - 1; p > o; o++)
                    n.push([
                        d + i * g(k),
                        e + i * f(k)
                    ]), k += j;
                n.push([
                    l,
                    m
                ]), a.moveTo(n[0][0], n[0][1]);
                for (var o = 0; o < n.length; o++)
                    a.lineTo(n[o][0], n[o][1]);
            }
        },
        getRect: function (a) {
            var b;
            return b = a.strokeStyle || a.fillStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(0 - a.r - b / 2),
                y: Math.round(0 - a.r - b / 2),
                width: 2 * a.r + b,
                height: 2 * a.r + b
            };
        }
    }), e;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/utils/Math',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Line', function (a, b, c) {
    var d = function (a) {
        var b = this;
        this.type = 'line', this.drawTypeOnly = 'stroke', a.context || (a.context = {}), b._context = {
            lineType: a.context.lineType || null,
            xStart: a.context.xStart || 0,
            yStart: a.context.yStart || 0,
            xEnd: a.context.xEnd || 0,
            yEnd: a.context.yEnd || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            if (b.lineType && 'solid' != b.lineType) {
                if ('dashed' == b.lineType || 'dotted' == b.lineType) {
                    var c = (b.lineWidth || 1) * ('dashed' == b.lineType ? 5 : 1);
                    this.dashedLineTo(a, b.xStart, b.yStart, b.xEnd, b.yEnd, c);
                }
            } else
                a.moveTo(b.xStart, b.yStart), a.lineTo(b.xEnd, b.yEnd);
        },
        getRect: function (a) {
            var b = a.lineWidth || 1;
            return {
                x: Math.min(a.xStart, a.xEnd) - b,
                y: Math.min(a.yStart, a.yEnd) - b,
                width: Math.abs(a.xStart - a.xEnd) + b,
                height: Math.abs(a.yStart - a.yEnd) + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Path', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'path', a.context || (a.context = {}), b._context = {
            $pointList: [],
            path: a.context.path || ''
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        _parsePathData: function (a) {
            if (!a)
                return [];
            var b = a, c = [
                    'm',
                    'M',
                    'l',
                    'L',
                    'v',
                    'V',
                    'h',
                    'H',
                    'z',
                    'Z',
                    'c',
                    'C',
                    'q',
                    'Q',
                    't',
                    'T',
                    's',
                    'S',
                    'a',
                    'A'
                ];
            b = b.replace(/  /g, ' '), b = b.replace(/ /g, ','), b = b.replace(/(\d)-/g, '$1,-'), b = b.replace(/,,/g, ',');
            var d;
            for (d = 0; d < c.length; d++)
                b = b.replace(new RegExp(c[d], 'g'), '|' + c[d]);
            var e = b.split('|'), f = [], g = 0, h = 0;
            for (d = 1; d < e.length; d++) {
                var i = e[d], j = i.charAt(0);
                i = i.slice(1), i = i.replace(new RegExp('e,-', 'g'), 'e-');
                var k = i.split(',');
                k.length > 0 && '' === k[0] && k.shift();
                for (var l = 0; l < k.length; l++)
                    k[l] = parseFloat(k[l]);
                for (; k.length > 0 && !isNaN(k[0]);) {
                    var m, n, o, p, q, r, s, t, u = null, v = [], w = g, x = h;
                    switch (j) {
                    case 'l':
                        g += k.shift(), h += k.shift(), u = 'L', v.push(g, h);
                        break;
                    case 'L':
                        g = k.shift(), h = k.shift(), v.push(g, h);
                        break;
                    case 'm':
                        g += k.shift(), h += k.shift(), u = 'M', v.push(g, h), j = 'l';
                        break;
                    case 'M':
                        g = k.shift(), h = k.shift(), u = 'M', v.push(g, h), j = 'L';
                        break;
                    case 'h':
                        g += k.shift(), u = 'L', v.push(g, h);
                        break;
                    case 'H':
                        g = k.shift(), u = 'L', v.push(g, h);
                        break;
                    case 'v':
                        h += k.shift(), u = 'L', v.push(g, h);
                        break;
                    case 'V':
                        h = k.shift(), u = 'L', v.push(g, h);
                        break;
                    case 'C':
                        v.push(k.shift(), k.shift(), k.shift(), k.shift()), g = k.shift(), h = k.shift(), v.push(g, h);
                        break;
                    case 'c':
                        v.push(g + k.shift(), h + k.shift(), g + k.shift(), h + k.shift()), g += k.shift(), h += k.shift(), u = 'C', v.push(g, h);
                        break;
                    case 'S':
                        m = g, n = h, o = f[f.length - 1], 'C' === o.command && (m = g + (g - o.points[2]), n = h + (h - o.points[3])), v.push(m, n, k.shift(), k.shift()), g = k.shift(), h = k.shift(), u = 'C', v.push(g, h);
                        break;
                    case 's':
                        m = g, n = h, o = f[f.length - 1], 'C' === o.command && (m = g + (g - o.points[2]), n = h + (h - o.points[3])), v.push(m, n, g + k.shift(), h + k.shift()), g += k.shift(), h += k.shift(), u = 'C', v.push(g, h);
                        break;
                    case 'Q':
                        v.push(k.shift(), k.shift()), g = k.shift(), h = k.shift(), v.push(g, h);
                        break;
                    case 'q':
                        v.push(g + k.shift(), h + k.shift()), g += k.shift(), h += k.shift(), u = 'Q', v.push(g, h);
                        break;
                    case 'T':
                        m = g, n = h, o = f[f.length - 1], 'Q' === o.command && (m = g + (g - o.points[0]), n = h + (h - o.points[1])), g = k.shift(), h = k.shift(), u = 'Q', v.push(m, n, g, h);
                        break;
                    case 't':
                        m = g, n = h, o = f[f.length - 1], 'Q' === o.command && (m = g + (g - o.points[0]), n = h + (h - o.points[1])), g += k.shift(), h += k.shift(), u = 'Q', v.push(m, n, g, h);
                        break;
                    case 'A':
                        p = k.shift(), q = k.shift(), r = k.shift(), s = k.shift(), t = k.shift(), w = g, x = h, g = k.shift(), h = k.shift(), u = 'A', v = this._convertPoint(w, x, g, h, s, t, p, q, r);
                        break;
                    case 'a':
                        p = k.shift(), q = k.shift(), r = k.shift(), s = k.shift(), t = k.shift(), w = g, x = h, g += k.shift(), h += k.shift(), u = 'A', v = this._convertPoint(w, x, g, h, s, t, p, q, r);
                    }
                    f.push({
                        command: u || j,
                        points: v
                    });
                }
                ('z' === j || 'Z' === j) && f.push({
                    command: 'z',
                    points: []
                });
            }
            return f;
        },
        _convertPoint: function (a, b, c, d, e, f, g, h, i) {
            var j = i * (Math.PI / 180), k = Math.cos(j) * (a - c) / 2 + Math.sin(j) * (b - d) / 2, l = -1 * Math.sin(j) * (a - c) / 2 + Math.cos(j) * (b - d) / 2, m = k * k / (g * g) + l * l / (h * h);
            m > 1 && (g *= Math.sqrt(m), h *= Math.sqrt(m));
            var n = Math.sqrt((g * g * h * h - g * g * l * l - h * h * k * k) / (g * g * l * l + h * h * k * k));
            e === f && (n *= -1), isNaN(n) && (n = 0);
            var o = n * g * l / h, p = n * -h * k / g, q = (a + c) / 2 + Math.cos(j) * o - Math.sin(j) * p, r = (b + d) / 2 + Math.sin(j) * o + Math.cos(j) * p, s = function (a) {
                    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
                }, t = function (a, b) {
                    return (a[0] * b[0] + a[1] * b[1]) / (s(a) * s(b));
                }, u = function (a, b) {
                    return (a[0] * b[1] < a[1] * b[0] ? -1 : 1) * Math.acos(t(a, b));
                }, v = u([
                    1,
                    0
                ], [
                    (k - o) / g,
                    (l - p) / h
                ]), w = [
                    (k - o) / g,
                    (l - p) / h
                ], x = [
                    (-1 * k - o) / g,
                    (-1 * l - p) / h
                ], y = u(w, x);
            return t(w, x) <= -1 && (y = Math.PI), t(w, x) >= 1 && (y = 0), 0 === f && y > 0 && (y -= 2 * Math.PI), 1 === f && 0 > y && (y += 2 * Math.PI), [
                q,
                r,
                g,
                h,
                v,
                y,
                j,
                f
            ];
        },
        draw: function (a, b) {
            for (var c, d = b.path, e = this._parsePathData(d), f = 0, g = 0, h = b.$pointList = [], i = [], j = 0, k = e.length; k > j; j++) {
                'M' == e[j].command.toUpperCase() && (i.length > 0 && h.push(i), i = []), c = e[j].points;
                for (var l = 0, m = c.length; m > l; l += 2)
                    i.push([
                        c[l] + f,
                        c[l + 1] + g
                    ]);
            }
            i.length > 0 && h.push(i);
            for (var n, j = 0, k = e.length; k > j; j++) {
                n = e[j].command, c = e[j].points;
                for (var l = 0, m = c.length; m > l; l++)
                    c[l] += l % 2 === 0 ? f : g;
                switch (n) {
                case 'L':
                    a.lineTo(c[0], c[1]);
                    break;
                case 'M':
                    a.moveTo(c[0], c[1]);
                    break;
                case 'C':
                    a.bezierCurveTo(c[0], c[1], c[2], c[3], c[4], c[5]);
                    break;
                case 'Q':
                    a.quadraticCurveTo(c[0], c[1], c[2], c[3]);
                    break;
                case 'A':
                    var o = c[0], p = c[1], q = c[2], r = c[3], s = c[4], t = c[5], u = c[6], v = c[7], w = q > r ? q : r, x = q > r ? 1 : q / r, y = q > r ? r / q : 1;
                    a.translate(o, p), a.rotate(u), a.scale(x, y), a.arc(0, 0, w, s, s + t, 1 - v), a.scale(1 / x, 1 / y), a.rotate(-u), a.translate(-o, -p);
                    break;
                case 'z':
                    a.closePath();
                }
            }
        },
        getRect: function (a) {
            var b;
            b = a.strokeStyle || a.fillStyle ? a.lineWidth || 1 : 0;
            for (var c = Number.MAX_VALUE, d = Number.MIN_VALUE, e = Number.MAX_VALUE, f = Number.MIN_VALUE, g = 0, h = 0, i = this._parsePathData(a.path), j = 0; j < i.length; j++)
                for (var k = i[j].points, l = 0; l < k.length; l++)
                    l % 2 === 0 ? (k[l] + g < c && (c = k[l] + g), k[l] + g > d && (d = k[l] + g)) : (k[l] + h < e && (e = k[l] + h), k[l] + h > f && (f = k[l] + h));
            var m;
            return m = c === Number.MAX_VALUE || d === Number.MIN_VALUE || e === Number.MAX_VALUE || f === Number.MIN_VALUE ? {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            } : {
                x: Math.round(c - b / 2),
                y: Math.round(e - b / 2),
                width: d - c + b,
                height: f - e + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Polygon', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'polygon', b._hasFillAndStroke = !0, a.context || (a.context = {}), b._context = {
            lineType: a.context.lineType || null,
            pointList: a.context.pointList || []
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        draw: function (a, b) {
            return a.save(), a.beginPath(), this.buildPath(a, b), a.closePath(), (b.strokeStyle || b.lineWidth) && a.stroke(), b.fillStyle && (('dashed' == b.lineType || 'dotted' == b.lineType) && (a.beginPath(), this.buildPath(a, {
                lineType: 'solid',
                lineWidth: b.lineWidth,
                pointList: b.pointList
            }), a.closePath()), a.fill()), a.restore(), !0;
        },
        buildPath: function (a, b) {
            var c = b.pointList.$model, d = c[0], e = c[c.length - 1];
            if (d && e && d[0] == e[0] && d[1] == e[1] && c.pop(), !(c.length < 2))
                if (b.lineType && 'solid' != b.lineType) {
                    if ('dashed' == b.lineType || 'dotted' == b.lineType) {
                        var f = (b.lineWidth || 1) * ('dashed' == b.lineType ? 5 : 1);
                        a.moveTo(c[0][0], c[0][1]);
                        for (var g = 1, h = c.length; h > g; g++)
                            this.dashedLineTo(a, c[g - 1][0], c[g - 1][1], c[g][0], c[g][1], f);
                        this.dashedLineTo(a, c[c.length - 1][0], c[c.length - 1][1], c[0][0], c[0][1], f);
                    }
                } else {
                    a.moveTo(c[0][0], c[0][1]);
                    for (var g = 1, h = c.length; h > g; g++)
                        a.lineTo(c[g][0], c[g][1]);
                    a.lineTo(c[0][0], c[0][1]);
                }
        },
        getRect: function (a) {
            for (var b = Number.MAX_VALUE, c = Number.MIN_VALUE, d = Number.MAX_VALUE, e = Number.MIN_VALUE, f = a.pointList.$model, g = 0, h = f.length; h > g; g++)
                f[g][0] < b && (b = f[g][0]), f[g][0] > c && (c = f[g][0]), f[g][1] < d && (d = f[g][1]), f[g][1] > e && (e = f[g][1]);
            var i;
            return i = a.strokeStyle || a.fillStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(b - i / 2),
                y: Math.round(d - i / 2),
                width: c - b + i,
                height: e - d + i
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Rect', function (a, b, c) {
    var d = function (a) {
        var b = this;
        b.type = 'rect', a.context || (a.context = {}), b._context = {
            width: a.context.width || 0,
            height: a.context.height || 0,
            radius: a.context.radius || []
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return c.creatClass(d, b, {
        _buildRadiusPath: function (a, b) {
            var c, d, e, f, g = 0, h = 0, i = this.context.width, j = this.context.height, k = b.radius.$model;
            'number' == typeof k ? c = d = e = f = k : k instanceof Array ? 1 === k.length ? c = d = e = f = k[0] : 2 === k.length ? (c = e = k[0], d = f = k[1]) : 3 === k.length ? (c = k[0], d = f = k[1], e = k[2]) : (c = k[0], d = k[1], e = k[2], f = k[3]) : c = d = e = f = 0, a.moveTo(g + c, h), a.lineTo(g + i - d, h), 0 !== d && a.quadraticCurveTo(g + i, h, g + i, h + d), a.lineTo(g + i, h + j - e), 0 !== e && a.quadraticCurveTo(g + i, h + j, g + i - e, h + j), a.lineTo(g + f, h + j), 0 !== f && a.quadraticCurveTo(g, h + j, g, h + j - f), a.lineTo(g, h + c), 0 !== c && a.quadraticCurveTo(g, h, g + c, h);
        },
        draw: function (a, b) {
            if (b.$model.radius.length)
                this._buildRadiusPath(a, b);
            else {
                var c = 0, d = 0;
                a.fillStyle && a.fillRect(c, d, this.context.width, this.context.height), a.lineWidth && a.strokeRect(c, d, this.context.width, this.context.height);
            }
        },
        getRect: function (a) {
            var b;
            return b = a.fillStyle || a.strokeStyle ? a.lineWidth || 1 : 0, {
                x: Math.round(0 - b / 2),
                y: Math.round(0 - b / 2),
                width: this.context.width + b,
                height: this.context.height + b
            };
        }
    }), d;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Sector', function (a, b, c, d, e) {
    var f = function (a) {
        var b = this;
        b.type = 'sector', a.context || (a.context = {}), b._context = {
            pointList: [],
            r0: a.context.r0 || 0,
            r: a.context.r || 0,
            startAngle: a.context.startAngle || 0,
            endAngle: a.context.endAngle || 0
        }, arguments.callee.superclass.constructor.apply(this, arguments);
    };
    return e.creatClass(f, b, {
        draw: function (a, b) {
            var d = 0, e = 0, f = 'undefined' == typeof b.r0 ? 0 : b.r0, g = b.r, h = b.startAngle, i = b.endAngle, j = 2 * Math.PI;
            h = c.degreeToRadian(h), i = c.degreeToRadian(i), a.arc(d, e, g, j - h, j - i, !0), 0 !== f && a.arc(d, e, f, j - i, j - h, !1);
        },
        getRect: function (a) {
            var b = 0, e = 0, f = 'undefined' == typeof a.r0 ? 0 : a.r0, g = a.r, h = a.startAngle, i = a.endAngle, j = [];
            return 90 > h && i > 90 && j.push([
                b,
                e - g
            ]), 180 > h && i > 180 && j.push([
                b - g,
                e
            ]), 270 > h && i > 270 && j.push([
                b,
                e + g
            ]), 360 > h && i > 360 && j.push([
                b + g,
                e
            ]), h = c.degreeToRadian(h), i = c.degreeToRadian(i), j.push([
                c.cos(h) * f + b,
                e - c.sin(h) * f
            ]), j.push([
                c.cos(h) * g + b,
                e - c.sin(h) * g
            ]), j.push([
                c.cos(i) * g + b,
                e - c.sin(i) * g
            ]), j.push([
                c.cos(i) * f + b,
                e - c.sin(i) * f
            ]), a.pointList = j, d.prototype.getRect(a);
        }
    }), f;
}, {
    requires: [
        'canvax/display/Shape',
        'canvax/utils/Math',
        'canvax/shape/Polygon',
        'canvax/core/Base'
    ]
}), KISSY.add('canvax/shape/Shapes', function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var n = {
            Beziercurve: b,
            BrokenLine: c,
            Circle: d,
            Droplet: e,
            Ellipse: f,
            Heart: g,
            Isogon: h,
            Line: i,
            Path: j,
            Polygon: k,
            Sector: l,
            Rect: m
        };
    return n;
}, {
    requires: [
        'canvax/shape/Beziercurve',
        'canvax/shape/BrokenLine',
        'canvax/shape/Circle',
        'canvax/shape/Droplet',
        'canvax/shape/Ellipse',
        'canvax/shape/Heart',
        'canvax/shape/Isogon',
        'canvax/shape/Line',
        'canvax/shape/Path',
        'canvax/shape/Polygon',
        'canvax/shape/Sector',
        'canvax/shape/Rect'
    ]
}), KISSY.add('canvax/utils/HitTestPoint', function (a, b) {
    function c(a, c, g) {
        if (!a || !a.type)
            return !1;
        var h = a.type, i = d(h, a, c, g);
        if ('undefined' != typeof i)
            return i;
        if ('beziercurve' != h && a.buildPath && b._pixelCtx.isPointInPath)
            return e(a, b._pixelCtx, c, g);
        if (b._pixelCtx.getImageData)
            return f(a, c, g);
        switch (h) {
        case 'heart':
            return !0;
        case 'droplet':
            return !0;
        case 'ellipse':
            return !0;
        default:
            return !1;
        }
    }
    function d(a, b, c, d) {
        switch (a) {
        case 'line':
            return i(b.context, c, d);
        case 'brokenLine':
            return j(b, c, d);
        case 'text':
            return !0;
        case 'ring':
            return k(b, c, d);
        case 'rect':
            return !0;
        case 'circle':
            return m(b, c, d);
        case 'ellipse':
            return o(b, c, d);
        case 'sector':
            return n(b, c, d);
        case 'path':
            return q(b, c, d);
        case 'polygon':
        case 'star':
        case 'isogon':
            return p(b, c, d);
        case 'image':
            return !0;
        }
    }
    function e(a, b, c, d) {
        var e = a.context;
        return b.beginPath(), a.buildPath(b, e), b.closePath(), b.isPointInPath(c, d);
    }
    function f(a, c, d) {
        var e = a.context, f = b._pixelCtx;
        f.save(), f.beginPath(), a.setContextStyle(f, e), f.transform.apply(f, a.getConcatenatedMatrix().toArray()), f.clearRect(a._rect.x - 10, a._rect.y - 10, a._rect.width + 20, a._rect.height + 20), a.draw(f, e), a.drawEnd(f), f.closePath(), f.restore();
        var h = a.getConcatenatedMatrix();
        if (h) {
            var i = h.clone(), j = [
                    c,
                    d
                ];
            i.mulVector(j, [
                c,
                d,
                1
            ]), c = j[0], d = j[1];
        }
        return g(f, c, d);
    }
    function g(a, b, c, d) {
        var e;
        'undefined' != typeof d ? (d = Math.floor((d || 1) / 2), e = a.getImageData(b - d, c - d, d + d, d + d).data) : e = a.getImageData(b, c, 1, 1).data;
        for (var f = e.length; f--;)
            if (0 !== e[f])
                return !0;
        return !1;
    }
    function h(a, b, d) {
        return !c(a, b, d);
    }
    function i(a, b, c) {
        var d = a.xStart, e = a.yStart, f = a.xEnd, g = a.yEnd, h = a.lineWidth, i = 0, j = d;
        if (d === f)
            return Math.abs(b - d) <= h / 2;
        i = (e - g) / (d - f), j = (d * g - f * e) / (d - f);
        var k = (i * b - c + j) * (i * b - c + j) / (i * i + 1);
        return h / 2 * h / 2 >= k;
    }
    function j(a, b, c) {
        for (var d, e = a.context, f = e.pointList.$model, g = !1, h = 0, j = f.length - 1; j > h && (d = {
                xStart: f[h][0],
                yStart: f[h][1],
                xEnd: f[h + 1][0],
                yEnd: f[h + 1][1],
                lineWidth: e.lineWidth
            }, !l({
                x: Math.min(d.xStart, d.xEnd) - d.lineWidth,
                y: Math.min(d.yStart, d.yEnd) - d.lineWidth,
                width: Math.abs(d.xStart - d.xEnd) + d.lineWidth,
                height: Math.abs(d.yStart - d.yEnd) + d.lineWidth
            }, b, c) || !(g = i(d, b, c))); h++);
        return g;
    }
    function k(a, b, c) {
        var d = a.context;
        return m(a, b, c) && !m(a, b, c, d.r0 || 0) ? !0 : !1;
    }
    function l(a, b, c) {
        return b >= a.x && b <= a.x + a.width && c >= a.y && c <= a.y + a.height ? !0 : !1;
    }
    function m(a, b, c, d) {
        var e = a.context;
        return !d && (d = e.r), d * d > b * b + c * c;
    }
    function n(a, b, c) {
        var d = a.context;
        if (!m(a, b, c) || d.r0 > 0 && m(a, b, c, d.r0))
            return !1;
        var e = (360 - Math.atan2(c, b) / Math.PI * 180) % 360, f = (360 + d.endAngle) % 360, g = (360 + d.startAngle) % 360;
        return f > g ? e >= g && f >= e : !(e >= f && g >= e);
    }
    function o(a, b, c) {
        var d, e = a.context, f = {
                x: 0,
                y: 0
            }, g = e.hr, h = e.vr, i = {
                x: b,
                y: c
            };
        return i.x -= f.x, i.y -= f.y, i.x *= i.x, i.y *= i.y, g *= g, h *= h, d = h * i.x + g * i.y - g * h, 0 > d;
    }
    function p(a, b, c) {
        var d, e, f, g = a.context ? a.context : a, h = g.pointList.$model || g.pointList, i = h.length, j = !1, k = !0;
        for (d = 0; i > d; ++d)
            if (h[d][0] == b && h[d][1] == c) {
                k = !1, j = !0;
                break;
            }
        if (k)
            for (k = !1, j = !1, d = 0, e = i - 1; i > d; e = d++)
                if (h[d][1] < c && c < h[e][1] || h[e][1] < c && c < h[d][1]) {
                    if (b <= h[d][0] || b <= h[e][0])
                        if (f = (c - h[d][1]) * (h[e][0] - h[d][0]) / (h[e][1] - h[d][1]) + h[d][0], f > b)
                            j = !j;
                        else if (b == f) {
                            j = !0;
                            break;
                        }
                } else if (c == h[d][1]) {
                    if (b < h[d][0]) {
                        h[d][1] > h[e][1] ? --c : ++c;
                        break;
                    }
                } else if (h[d][1] == h[e][1] && c == h[d][1] && (h[d][0] < b && b < h[e][0] || h[e][0] < b && b < h[d][0])) {
                    j = !0;
                    break;
                }
        return j;
    }
    function q(a, b, c) {
        for (var d = a.context, e = d.$pointList || d.pointList.$model, f = !1, g = 0, h = e.length; h > g && !(f = p({ pointList: e[g] }, b, c)); g++);
        return f;
    }
    function r(a, c) {
        b._pixelCtx.save(), c && (b._pixelCtx.font = c);
        var d = b._pixelCtx.measureText(a).width;
        return b._pixelCtx.restore(), d;
    }
    var s = {};
    return s = {
        isInside: c,
        isOutside: h,
        getTextWidth: r
    };
}, { requires: ['canvax/core/Base'] }), KISSY.add('canvax/utils/ImagesLoader', function (a, b, c) {
    var d = function (a) {
        arguments.callee.superclass.constructor.apply(this, arguments), this.urls = a || [], this.images = [], this.loads = 0, this.init();
    };
    return b.creatClass(d, c, {
        init: function () {
            this.images.length = this.urls.length;
        },
        _loadHand: function (a, b) {
            var c = new Image(), d = this;
            return c.onload = function () {
                d.images.splice(a, 1, c), b(a, c);
            }, c;
        },
        _load: function (a, b, c) {
            this._loadHand(a, c).src = b + '?t=' + new Date().getTime();
        },
        start: function () {
            var a = this;
            if (this.urls.length > 0)
                for (var b = 0, c = this.urls.length; c > b; b++) {
                    var d = this.urls[b];
                    a._load(b, d, function (b, d) {
                        a.loads = a.loads + 1, a.hasEvent('secSuccess') && a.fire({
                            index: b,
                            img: d,
                            type: 'secSuccess'
                        }), a.loads == c && a.hasEvent('success') && a.fire({
                            images: a.images,
                            type: 'success'
                        });
                    });
                }
        }
    }), d;
}, {
    requires: [
        'canvax/core/Base',
        'canvax/event/EventDispatcher'
    ]
}), KISSY.add('canvax/utils/Math', function () {
    function a(a, b) {
        return a = (b ? a * f : a).toFixed(4), 'undefined' == typeof e.sin[a] && (e.sin[a] = Math.sin(a)), e.sin[a];
    }
    function b(a, b) {
        return a = (b ? a * f : a).toFixed(4), 'undefined' == typeof e.cos[a] && (e.cos[a] = Math.cos(a)), e.cos[a];
    }
    function c(a) {
        return a * f;
    }
    function d(a) {
        return a / f;
    }
    var e = {
            sin: {},
            cos: {}
        }, f = Math.PI / 180;
    return {
        sin: a,
        cos: b,
        degreeToRadian: c,
        radianToDegree: d
    };
}, { requires: [] });