KISSY.add('dvix/utils/datasection', function () {
    function a(a, b) {
        var c, d, e = [
                1,
                2,
                5,
                10
            ];
        for (c = a / b, d = 0; d < e.length && (a = e[d], !(c <= (e[d] + (e[d + 1] || e[d])) / 2)); d++);
        return a *= b;
    }
    function b(a) {
        return parseFloat(a.toPrecision(14));
    }
    function c(c, d, e) {
        var f = e && e.scale ? parseFloat(e.scale) : 1, g = e && e.isInt ? 1 : 0;
        isNaN(f) && (f = 1);
        var h = Math.max.apply(null, c), i = h;
        h *= f;
        var j = Math.min.apply(null, c);
        j == h && (j = h >= 0 ? 0 : 2 * h);
        var k = h - j;
        if (k) {
            var l = j;
            j -= 0.05 * k, 0 > j && l >= 0 && (j = 0), h += 0.05 * k;
        }
        var m = 72 * (h - j) / 365, n = Math.pow(10, Math.floor(Math.log(m) / Math.LN10));
        m = a(m, n), g && (m = Math.ceil(m));
        var o, p, q = b(Math.floor(j / m) * m), r = b(Math.ceil(h / m) * m), s = [];
        for (o = q; r >= o && (s.push(o), o = b(o + m), o !== p);)
            p = o;
        return s.length >= 3 && s[s.length - 2] >= i && s.pop(), s;
    }
    function d(a, b, c) {
        var d = Math.max.apply(null, a), e = (Math.min.apply(null, a), a.length), f = b ? b : 9, g = [], h = d, i = String(Math.ceil(d)).length, j = 1;
        c || (c = {}), j = parseFloat(c.scale), isNaN(j) || (d *= j), d % Math.pow(10, i - 1) != 0 && (h = i >= 3 ? parseInt(d / Math.pow(10, i - 2)) % 2 == 0 ? parseInt(d / Math.pow(10, i - 2)) * Math.pow(10, i - 2) + 2 * Math.pow(10, i - 2) : parseInt(d / Math.pow(10, i - 2)) * Math.pow(10, i - 2) + Math.pow(10, i - 2) : parseInt(d / Math.pow(10, i - 1) + 1) * Math.pow(10, i - 1)), i = String(h).length, f >= e && (f = e);
        var k = f;
        if (i >= 2) {
            for (var l = 1, m = h / Math.pow(10, i - 2); m >= l; l++)
                h / (l * Math.pow(10, i - 2)) == parseInt(h / (l * Math.pow(10, i - 2))) && h / (l * Math.pow(10, i - 2)) <= f && f - h / (l * Math.pow(10, i - 2)) < k && (k = f - h / (l * Math.pow(10, i - 2)));
            for (var n = 0, o = f - k; o > n; n++)
                g[n] = h / (f - k) * (n + 1);
        } else if (1 >= i) {
            for (var p = 1, q = h; q >= p; p++)
                h / p == parseInt(h / p) && f >= h / p && k > f - h / p && (k = f - h / p);
            for (var r = 0, s = f - k; s > r; r++)
                g[r] = h / (f - k) * (r + 1);
        }
        return g.length < 1 && (g = [0]), g;
    }
    var e = {
            section: function (a, b, e) {
                var f = [];
                return e && 1 == e.mode ? f = d(a, b, e) : (f = c(a, b, e), f.length < 1 && (f = d(a, b, e))), f;
            }
        };
    return e;
});