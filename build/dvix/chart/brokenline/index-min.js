KISSY.add('dvix/chart/brokenline/', function (a, b, c, d, e, f, g) {
    var h = b.Canvax, i = function () {
            this.title = 'brokenline', this.type = null, this.oneStrSize = null, this.element = null, this.canvax = null, this.width = 0, this.height = 0, this.data = null, this.dataRange = {
                start: 0,
                to: 0
            }, this.fieldList = {
                title: '',
                index: 0
            }, this.barWidth = 1, this.spaceWidth = 5, this.spaceWidthMin = 1, this.xAxis = null, this.yAxis = null, this.graphs = {
                barColor: [
                    '#458AE6',
                    '#39BCC0',
                    '#5BCB8A'
                ],
                lineColor: '#D6D6D6',
                sprite: null
            }, this.customPL = function (a) {
                return a;
            }, this.init.apply(this, arguments);
        };
    return i.prototype = {
        _yBlock: 0,
        _yOverDiff: 0,
        init: function (a) {
            var b = this;
            b.element = a, b.width = parseInt(a.width()), b.height = parseInt(a.height()), b.canvax = new h({ el: b.element }), b.stage = new h.Display.Stage({
                context: {
                    width: b.width,
                    height: b.height
                }
            }), b.oneStrSize = e.probOneStrSize();
        },
        draw: function (a, b) {
            var c = this;
            c._config(a, b), c._initData(), c._initLayout(), c._calculateDataRange(), c._startDraw(), c._drawEnd();
        },
        _config: function (b, c) {
            var d = this;
            d.data = b;
            for (var e = 0, h = b[0].length; h > e; e++)
                d.fieldList[b[0][e]] = { index: d._getIndexForField(b[0][e], b[0]) };
            c.xAxis && (d.xAxis = new f(d, c.xAxis), c.xAxis = null, delete c.xAxis), c.yAxis && (d.yAxis = new g(d, c.yAxis), c.yAxis = null, delete c.yAxis), c && a.mix(d, c, void 0, void 0, !0);
        },
        _getIndexForField: function (a, b) {
            for (var c = 0, d = b.length; d > c; c++)
                if (a === b[c])
                    return c;
        },
        _initData: function () {
            var a = this;
            a.xAxis.getxAxisData(), a.yAxis.getyAxisData();
        },
        _initLayout: function () {
            var a = this;
            a.yMarginTop = Math.round(a.oneStrSize.en.height / 2), a.yAxis.yAxisLayout(), a.xAxis.xAxisLayout(), a._graphsLayout();
        },
        _startDraw: function () {
            var a = this;
            a._graphsDraw(), a.yAxis.yAxisDraw(), a.xAxis.xAxisDraw();
        },
        _drawEnd: function () {
            var a = this;
            a.stage.addChild(a.xAxis.sprite), a.stage.addChild(a.yAxis.sprite), a.stage.addChild(a.graphs.sprite), a.canvax.addChild(a.stage);
        },
        _graphsLayout: function () {
            var a = this, b = a.yAxis.sprite.context;
            a.graphs.sprite = new h.Display.Sprite({
                context: {
                    x: b.width,
                    y: b.y,
                    width: a.width - b.width,
                    height: b.height
                }
            });
        },
        _calculateDataRange: function () {
            var a = this, b = a.graphs.sprite.context, c = a.data.length - 1;
            a.dataRange.start = 1, a.dataRange.to = (a.barWidth + a.spaceWidthMin) * c > b.width ? parseInt(b.width / (a.barWidth + a.spaceWidthMin)) : c;
            var d = (b.width - a.barWidth) / (a.dataRange.to - a.dataRange.start);
            a.spaceWidth = d - a.barWidth, a._yBlock = parseInt(b.height / (a.yAxis.data.length - 1)), a._yOverDiff = b.height - a._yBlock * (a.yAxis.data.length - 1);
        },
        _graphsDraw: function () {
            for (var b = this, e = b.data, f = b.yAxis, g = (b.xAxis, b.graphs), h = g.sprite.context, i = 0, j = f.data.length - 1; j > i; i++) {
                var k = -b.oneStrSize.en.width + 2, l = Math.round(i * b._yBlock) + b._yOverDiff;
                g.sprite.addChild(new c({
                    context: {
                        xStart: k,
                        yStart: l,
                        xEnd: k + h.width + b.oneStrSize.en.width - 2,
                        yEnd: l,
                        lineType: 'dashed',
                        lineWidth: 1,
                        strokeStyle: g.lineColor
                    }
                }));
            }
            g.sprite.addChild(new c({
                id: 'line-left',
                context: {
                    xStart: 0,
                    yStart: -h.y,
                    xEnd: 0,
                    yEnd: h.height,
                    lineWidth: 1,
                    strokeStyle: g.lineColor
                }
            })), g.sprite.addChild(new c({
                id: 'line-bottom',
                context: {
                    xStart: 0,
                    yStart: h.height,
                    xEnd: b.width - h.x,
                    yEnd: h.height,
                    lineWidth: 1,
                    strokeStyle: g.lineColor
                }
            }));
            var m = b.dataRange, n = 0, o = 0;
            a.each(f.data, function (a) {
                n = Math.max(n, a), o = Math.min(o, a);
            });
            var p = b.barWidth + b.spaceWidth;
            a.each(f.fields, function (c) {
                for (var i = [], j = m.start; j <= m.to; j++) {
                    var k = j - m.start, l = Math.round(k * p), q = h.height - Math.round((h.height - b._yOverDiff) * (e[j][b.fieldList[c].index] / (n - o)));
                    i.push([
                        l,
                        q
                    ]);
                }
                b.xAxis.getxAxisPoints(i, p);
                var r = (f.data.length - 1 - a.indexOf(0, f.data)) * b._yBlock - g.sprite.context.height;
                g.sprite.addChild(new d({
                    context: {
                        pointList: b.customPL(i),
                        strokeStyle: 'red',
                        lineWidth: 1,
                        x: 0,
                        y: r
                    }
                }));
            });
        }
    }, i;
}, {
    requires: [
        'dvix/',
        'canvax/shape/Line',
        'canvax/shape/BrokenLine',
        'dvix/utils/tools',
        'dvix/components/xaxis/xAxis',
        'dvix/components/yaxis/yAxis'
    ]
});