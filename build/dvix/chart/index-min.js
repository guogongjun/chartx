KISSY.add('dvix/chart/', function (a, b) {
    var c = a.all, d = function (a) {
            this.element = c(a), this.width = parseInt(this.element.width()), this.height = parseInt(this.element.height()), this.canvax = new b({ el: this.element }), this.stage = new b.Display.Stage({
                id: 'main',
                context: {
                    x: 0.5,
                    y: 0.5
                }
            }), this.canvax.addChild(this.stage), arguments.callee.superclass.constructor.apply(this, arguments), this.init.apply(this, arguments);
        };
    return d.Canvax = b, d.extend = function (b, c, d) {
        var e = this, f = function () {
                e.apply(this, arguments), d && d.apply(this, arguments);
            };
        return f.extend = e.extend, a.extend(f, e, b, c);
    }, a.extend(d, b.Event.EventDispatcher, {
        init: function () {
        },
        rotate: function (a) {
            var b = this.width, c = this.height;
            this.width = c, this.height = b;
            var d = this;
            _.each(d.stage.children, function (e) {
                e.context.rotation = a || -90, e.context.x = (b - c) / 2, e.context.y = (c - b) / 2, e.context.rotateOrigin.x = d.width * e.context.$model.scaleX / 2, e.context.rotateOrigin.y = d.height * e.context.$model.scaleY / 2;
            });
        },
        _initData: function (a, b) {
            var c = {
                    org: [],
                    data: [],
                    yAxis: {
                        field: [],
                        org: []
                    },
                    xAxis: {
                        field: [],
                        org: []
                    }
                }, d = c.org = a, e = d[0];
            _.extend(c.yAxis, b.yAxis), _.extend(c.xAxis, b.xAxis);
            for (var f = [], g = 0, h = e.length; h > g; g++) {
                var i = {};
                i.field = e[g], i.index = g, i.data = [], f.push(i);
            }
            for (var g = 1, h = d.length; h > g; g++)
                for (var j = 0, k = d[g].length; k > j; j++)
                    f[j].data.push(d[g][j]);
            c.data = f;
            var l = function (a, b) {
                    for (var c = _.filter(b, function (b) {
                                return _.some(a, function (a) {
                                    return b.field == a;
                                });
                            }), d = [], e = 0, f = a.length; f > e; e++)
                        for (var g = 0, h = c.length; h > g; g++)
                            if (a[e] == c[g].field) {
                                d.push(c[g].data);
                                break;
                            }
                    return d;
                }, m = c.xAxis.field;
            !m || '' == m || _.isArray(m) && 0 == m.length ? (c.xAxis.org = [f[0].data], m = c.xAxis.field = [f[0].field]) : (_.isString(m) && (m = [m]), c.xAxis.org = l(m, f));
            var n = c.yAxis.field;
            return !n || '' == n || _.isArray(n) && 0 == n.length ? n = _.difference(e, m) : _.isString(n) && (n = [n]), c.yAxis.field = n, c.yAxis.org = l(n, f), c;
        }
    }), d;
}, {
    requires: [
        'canvax/',
        'node'
    ]
});