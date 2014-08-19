KISSY.add('library/color', function (a, b) {
    function c(a) {
        P = a;
    }
    function d() {
        P = Q;
    }
    function e(a, b) {
        return a = +a || 0, b = b || P, b[a % b.length];
    }
    function f(a) {
        R = a;
    }
    function g() {
        S = R;
    }
    function h() {
        return R;
    }
    function i(a, c, d, e, f, g, h) {
        O || (O = b.getContext());
        for (var i = O.createRadialGradient(a, c, d, e, f, g), j = 0, k = h.length; k > j; j++)
            i.addColorStop(h[j][0], h[j][1]);
        return i.__nonRecursion = !0, i;
    }
    function j(a, c, d, e, f) {
        O || (O = b.getContext());
        for (var g = O.createLinearGradient(a, c, d, e), h = 0, i = f.length; i > h; h++)
            g.addColorStop(f[h][0], f[h][1]);
        return g.__nonRecursion = !0, g;
    }
    function k(a, b, c) {
        a = p(a), b = p(b), a = F(a), b = F(b);
        for (var d = [], e = (b[0] - a[0]) / c, f = (b[1] - a[1]) / c, g = (b[2] - a[2]) / c, h = 0, i = a[0], j = a[1], k = a[2]; c > h; h++)
            d[h] = m([
                I(Math.floor(i), [
                    0,
                    255
                ]),
                I(Math.floor(j), [
                    0,
                    255
                ]),
                I(Math.floor(k), [
                    0,
                    255
                ])
            ]), i += e, j += f, k += g;
        return i = b[0], j = b[1], k = b[2], d[h] = m([
            i,
            j,
            k
        ]), d;
    }
    function l(a, b) {
        var c = [], d = a.length;
        if (void 0 === b && (b = 20), 1 === d)
            c = k(a[0], a[0], b);
        else if (d > 1)
            for (var e = 0, f = d - 1; f > e; e++) {
                var g = k(a[e], a[e + 1], b);
                f - 1 > e && g.pop(), c = c.concat(g);
            }
        return c;
    }
    function m(a, b) {
        if (b = b || 'rgb', a && (3 === a.length || 4 === a.length)) {
            if (a = H(a, function (a) {
                    return a > 1 ? Math.ceil(a) : a;
                }), b.indexOf('hex') > -1)
                return a = H(a.slice(0, 3), function (a) {
                    return a = Number(a).toString(16), 1 === a.length ? '0' + a : a;
                }), '#' + a.join('');
            if (b.indexOf('hs') > -1) {
                var c = H(a.slice(1, 3), function (a) {
                        return a + '%';
                    });
                a[1] = c[0], a[2] = c[1];
            }
            return b.indexOf('a') > -1 ? (3 === a.length && a.push(1), a[3] = I(a[3], [
                0,
                1
            ]), b + '(' + a.slice(0, 4).join(',') + ')') : b + '(' + a.slice(0, 3).join(',') + ')';
        }
    }
    function n(a) {
        a = z(a), a.indexOf('#') > -1 && (a = q(a));
        var b = a.replace(/[rgbahsvl%\(\)]/gi, '').split(',');
        return b = H(b, function (a) {
            return Number(a);
        });
    }
    function o(a, b) {
        var c = F(a), d = c[3];
        return 'undefined' == typeof d && (d = 1), a.indexOf('hsb') > -1 ? c = J(c) : a.indexOf('hsl') > -1 && (c = K(c)), b.indexOf('hsb') > -1 || b.indexOf('hsv') > -1 ? c = M(c) : b.indexOf('hsl') > -1 && (c = N(c)), c[3] = d, m(c, b);
    }
    function p(a) {
        return o(a, 'rgba');
    }
    function q(a) {
        return o(a, 'rgb');
    }
    function r(a) {
        return o(a, 'hex');
    }
    function s(a) {
        return o(a, 'hsva');
    }
    function t(a) {
        return o(a, 'hsv');
    }
    function u(a) {
        return o(a, 'hsba');
    }
    function v(a) {
        return o(a, 'hsb');
    }
    function w(a) {
        return o(a, 'hsla');
    }
    function x(a) {
        return o(a, 'hsl');
    }
    function y(a) {
        for (var b in U)
            if (r(U[b]) === r(a))
                return b;
        return null;
    }
    function z(a) {
        return a = String(a), a = a.replace(/(^\s*)|(\s*$)/g, ''), /^[^#]*?$/i.test(a) && (a = a.replace(/\s/g, '')), a;
    }
    function A(a) {
        if (U[a] && (a = U[a]), a = z(a), a = a.replace(/hsv/i, 'hsb'), /^#[0-9a-f]{3}$/i.test(a)) {
            var b = a.replace('#', '').split('');
            a = '#' + b[0] + b[0] + b[1] + b[1] + b[2] + b[2];
        }
        return a;
    }
    function B(a, b) {
        var c = b > 0 ? 1 : -1;
        'undefined' == typeof b && (b = 0), b = Math.abs(b) > 1 ? 1 : Math.abs(b), a = q(a);
        for (var d = F(a), e = 0; 3 > e; e++)
            d[e] = 1 === c ? Math.floor(d[e] * (1 - b)) : Math.floor((255 - d[e]) * b + d[e]);
        return 'rgb(' + d.join(',') + ')';
    }
    function C(a) {
        var b = F(p(a));
        return b = H(b, function (a) {
            return 255 - a;
        }), m(b, 'rgb');
    }
    function D(a, b, c) {
        'undefined' == typeof c && (c = 0.5), c = 1 - I(c, [
            0,
            1
        ]);
        for (var d = 2 * c - 1, e = F(p(a)), f = F(p(b)), g = e[3] - f[3], h = ((d * g === -1 ? d : (d + g) / (1 + d * g)) + 1) / 2, i = 1 - h, j = [], k = 0; 3 > k; k++)
            j[k] = e[k] * h + f[k] * i;
        var l = e[3] * c + f[3] * (1 - c);
        return l = Math.max(0, Math.min(1, l)), 1 === e[3] && 1 === f[3] ? m(j, 'rgb') : (j[3] = l, m(j, 'rgba'));
    }
    function E() {
        return r('rgb(' + Math.round(256 * Math.random()) + ',' + Math.round(256 * Math.random()) + ',' + Math.round(256 * Math.random()) + ')');
    }
    function F(a) {
        a = A(a);
        var b = a.match(T);
        if (null === b)
            throw new Error('The color format error');
        var c, d, e, f = [];
        if (b[2])
            c = b[2].replace('#', '').split(''), e = [
                c[0] + c[1],
                c[2] + c[3],
                c[4] + c[5]
            ], f = H(e, function (a) {
                return I(parseInt(a, 16), [
                    0,
                    255
                ]);
            });
        else if (b[4]) {
            var g = b[4].split(',');
            d = g[3], e = g.slice(0, 3), f = H(e, function (a) {
                return a = Math.floor(a.indexOf('%') > 0 ? 2.55 * parseInt(a, 0) : a), I(a, [
                    0,
                    255
                ]);
            }), 'undefined' != typeof d && f.push(I(parseFloat(d), [
                0,
                1
            ]));
        } else if (b[5] || b[6]) {
            var h = (b[5] || b[6]).split(','), i = parseInt(h[0], 0) / 360, j = h[1], k = h[2];
            d = h[3], f = H([
                j,
                k
            ], function (a) {
                return I(parseFloat(a) / 100, [
                    0,
                    1
                ]);
            }), f.unshift(i), 'undefined' != typeof d && f.push(I(parseFloat(d), [
                0,
                1
            ]));
        }
        return f;
    }
    function G(a, b) {
        null === b && (b = 1);
        var c = F(p(a));
        return c[3] = I(Number(b).toFixed(4), [
            0,
            1
        ]), m(c, 'rgba');
    }
    function H(a, b) {
        if ('function' != typeof b)
            throw new TypeError();
        for (var c = a ? a.length : 0, d = 0; c > d; d++)
            a[d] = b(a[d]);
        return a;
    }
    function I(a, b) {
        return a <= b[0] ? a = b[0] : a >= b[1] && (a = b[1]), a;
    }
    function J(a) {
        var b, c, d, e = a[0], f = a[1], g = a[2];
        if (0 === f)
            b = 255 * g, c = 255 * g, d = 255 * g;
        else {
            var h = 6 * e;
            6 === h && (h = 0);
            var i = Math.floor(h), j = g * (1 - f), k = g * (1 - f * (h - i)), l = g * (1 - f * (1 - (h - i))), m = 0, n = 0, o = 0;
            0 === i ? (m = g, n = l, o = j) : 1 === i ? (m = k, n = g, o = j) : 2 === i ? (m = j, n = g, o = l) : 3 === i ? (m = j, n = k, o = g) : 4 === i ? (m = l, n = j, o = g) : (m = g, n = j, o = k), b = 255 * m, c = 255 * n, d = 255 * o;
        }
        return [
            b,
            c,
            d
        ];
    }
    function K(a) {
        var b, c, d, e = a[0], f = a[1], g = a[2];
        if (0 === f)
            b = 255 * g, c = 255 * g, d = 255 * g;
        else {
            var h;
            h = 0.5 > g ? g * (1 + f) : g + f - f * g;
            var i = 2 * g - h;
            b = 255 * L(i, h, e + 1 / 3), c = 255 * L(i, h, e), d = 255 * L(i, h, e - 1 / 3);
        }
        return [
            b,
            c,
            d
        ];
    }
    function L(a, b, c) {
        return 0 > c && (c += 1), c > 1 && (c -= 1), 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a;
    }
    function M(a) {
        var b, c, d = a[0] / 255, e = a[1] / 255, f = a[2] / 255, g = Math.min(d, e, f), h = Math.max(d, e, f), i = h - g, j = h;
        if (0 === i)
            b = 0, c = 0;
        else {
            c = i / h;
            var k = ((h - d) / 6 + i / 2) / i, l = ((h - e) / 6 + i / 2) / i, m = ((h - f) / 6 + i / 2) / i;
            d === h ? b = m - l : e === h ? b = 1 / 3 + k - m : f === h && (b = 2 / 3 + l - k), 0 > b && (b += 1), b > 1 && (b -= 1);
        }
        return b = 360 * b, c = 100 * c, j = 100 * j, [
            b,
            c,
            j
        ];
    }
    function N(a) {
        var b, c, d = a[0] / 255, e = a[1] / 255, f = a[2] / 255, g = Math.min(d, e, f), h = Math.max(d, e, f), i = h - g, j = (h + g) / 2;
        if (0 === i)
            b = 0, c = 0;
        else {
            c = 0.5 > j ? i / (h + g) : i / (2 - h - g);
            var k = ((h - d) / 6 + i / 2) / i, l = ((h - e) / 6 + i / 2) / i, m = ((h - f) / 6 + i / 2) / i;
            d === h ? b = m - l : e === h ? b = 1 / 3 + k - m : f === h && (b = 2 / 3 + l - k), 0 > b && (b += 1), b > 1 && (b -= 1);
        }
        return b = 360 * b, c = 100 * c, j = 100 * j, [
            b,
            c,
            j
        ];
    }
    var O, P = [
            '#ff9277',
            ' #dddd00',
            ' #ffc877',
            ' #bbe3ff',
            ' #d5ffbb',
            '#bbbbff',
            ' #ddb000',
            ' #b0dd00',
            ' #e2bbff',
            ' #ffbbe3',
            '#ff7777',
            ' #ff9900',
            ' #83dd00',
            ' #77e3ff',
            ' #778fff',
            '#c877ff',
            ' #ff77ab',
            ' #ff6600',
            ' #aa8800',
            ' #77c7ff',
            '#ad77ff',
            ' #ff77ff',
            ' #dd0083',
            ' #777700',
            ' #00aa00',
            '#0088aa',
            ' #8400dd',
            ' #aa0088',
            ' #dd0000',
            ' #772e00'
        ], Q = P, R = 'rgba(255,255,0,0.5)', S = R, T = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i, U = {
            aliceblue: '#f0f8ff',
            antiquewhite: '#faebd7',
            aqua: '#0ff',
            aquamarine: '#7fffd4',
            azure: '#f0ffff',
            beige: '#f5f5dc',
            bisque: '#ffe4c4',
            black: '#000',
            blanchedalmond: '#ffebcd',
            blue: '#00f',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chartreuse: '#7fff00',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            cornsilk: '#fff8dc',
            crimson: '#dc143c',
            cyan: '#0ff',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgray: '#a9a9a9',
            darkgrey: '#a9a9a9',
            darkgreen: '#006400',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkslategrey: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deeppink: '#ff1493',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            floralwhite: '#fffaf0',
            forestgreen: '#228b22',
            fuchsia: '#f0f',
            gainsboro: '#dcdcdc',
            ghostwhite: '#f8f8ff',
            gold: '#ffd700',
            goldenrod: '#daa520',
            gray: '#808080',
            grey: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            honeydew: '#f0fff0',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            ivory: '#fffff0',
            khaki: '#f0e68c',
            lavender: '#e6e6fa',
            lavenderblush: '#fff0f5',
            lawngreen: '#7cfc00',
            lemonchiffon: '#fffacd',
            lightblue: '#add8e6',
            lightcoral: '#f08080',
            lightcyan: '#e0ffff',
            lightgoldenrodyellow: '#fafad2',
            lightgray: '#d3d3d3',
            lightgrey: '#d3d3d3',
            lightgreen: '#90ee90',
            lightpink: '#ffb6c1',
            lightsalmon: '#ffa07a',
            lightseagreen: '#20b2aa',
            lightskyblue: '#87cefa',
            lightslategray: '#789',
            lightslategrey: '#789',
            lightsteelblue: '#b0c4de',
            lightyellow: '#ffffe0',
            lime: '#0f0',
            limegreen: '#32cd32',
            linen: '#faf0e6',
            magenta: '#f0f',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370d8',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumspringgreen: '#00fa9a',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            mintcream: '#f5fffa',
            mistyrose: '#ffe4e1',
            moccasin: '#ffe4b5',
            navajowhite: '#ffdead',
            navy: '#000080',
            oldlace: '#fdf5e6',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palegoldenrod: '#eee8aa',
            palegreen: '#98fb98',
            paleturquoise: '#afeeee',
            palevioletred: '#d87093',
            papayawhip: '#ffefd5',
            peachpuff: '#ffdab9',
            peru: '#cd853f',
            pink: '#ffc0cb',
            plum: '#dda0dd',
            powderblue: '#b0e0e6',
            purple: '#800080',
            red: '#f00',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            seashell: '#fff5ee',
            sienna: '#a0522d',
            silver: '#c0c0c0',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#fffafa',
            springgreen: '#00ff7f',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            thistle: '#d8bfd8',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            wheat: '#f5deb3',
            white: '#fff',
            whitesmoke: '#f5f5f5',
            yellow: '#ff0',
            yellowgreen: '#9acd32'
        };
    return {
        customPalette: c,
        resetPalette: d,
        getColor: e,
        getHighlightColor: h,
        customHighlight: f,
        resetHighlight: g,
        getRadialGradient: i,
        getLinearGradient: j,
        getGradientColors: l,
        getStepColors: k,
        reverse: C,
        mix: D,
        lift: B,
        trim: z,
        random: E,
        toRGB: q,
        toRGBA: p,
        toHex: r,
        toHSL: x,
        toHSLA: w,
        toHSB: v,
        toHSBA: u,
        toHSV: t,
        toHSVA: s,
        toName: y,
        toColor: m,
        toArray: n,
        alpha: G,
        getData: F
    };
}, { requires: ['canvax/core/Base'] });