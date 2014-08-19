KISSY.add('dvix/utils/tools', function (a) {
    return {
        probOneStrSize: function () {
            a.all('body').append('<span style=\'line-height:1;visibility:hidden;position:absolute;left:0;top:0;\' id=\'off-the-cuff-str\'>8</span>');
            var b = a.all('#off-the-cuff-str'), c = {
                    en: {
                        width: b.width(),
                        height: b.height()
                    }
                };
            return b.html('\u56FD'), c.cn = {
                width: b.width(),
                height: b.height()
            }, b.remove(), b = null, c;
        },
        getChildsArr: function (a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) {
                var e = a[c];
                b = b.concat(e);
            }
            return b;
        },
        getArrMergerNumber: function (a, b, c) {
            var d = 0, e = b ? b : 0, f = c || 0 == c ? c : a.length - 1;
            if (e > f)
                return d;
            for (var g = 0, h = a.length; h > g && !(g >= e && (d += Number(a[g]), g == f)); g++);
            return d;
        },
        getDisMinATArr: function (a, b) {
            for (var c = 0, d = Math.abs(a - b[0]), e = 1, f = b.length; f > e; e++)
                d > Math.abs(a - b[e]) && (d = Math.abs(a - b[e]), c = e);
            return c;
        },
        getArrScales: function (a) {
            for (var b = [], c = 0, d = 0, e = 0, f = [], g = 0, h = a.length; h > g; g++)
                a[g] = Number(a[g]), c += a[g];
            for (var i = 0, j = a.length; j > i; i++) {
                var k = Math.round(a[i] / c * 100);
                if (f.push(k), i == a.length - 1) {
                    for (var l = 0, m = 0, n = f.length - 1; n > m; m++)
                        l += f[m];
                    l = 100 - l, l = 0 > l ? 0 : l, k = l;
                }
                b.push(k);
            }
            c = 0;
            for (var o = 0, p = b.length; p > o; o++)
                b[o] = isNaN(b[o]) || b[o] < 0 ? 0 : b[o], d < b[o] && (d = b[o], e = o), c += b[o];
            return c > 100 ? b[e] = b[e] - (c - 100) : 100 > c && (b[e] = b[e] + (100 - c)), b;
        },
        numAddSymbol: function (a, b) {
            var c = Number(a), d = b ? b : ',';
            if (!c)
                return String(a);
            if (c >= 1000) {
                var e = parseInt(c / 1000);
                return String(a.toString().replace(e, e + d));
            }
            return String(c);
        },
        getPath: function (a) {
            var b = 'M', c = 'L', d = '';
            d = _.isArray(a[0]) ? b + a[0][0] + ' ' + a[0][1] : b + a[0].x + ' ' + a[0].y;
            for (var e = 1, f = a.length; f > e; e++) {
                var g = 0, h = 0, i = a[e];
                _.isArray(i) ? (g = i[0], h = i[1]) : (g = i.x, h = i.y), d += ' ' + c + g + ' ' + h;
            }
            return d;
        }
    };
});