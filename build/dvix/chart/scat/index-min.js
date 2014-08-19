KISSY.add('dvix/chart/scat/index-min', function (a, b, c, d, e, f, g, h, i, j) {
    var k = b.Canvax;
    return b.extend({
        init: function () {
            this.dataFrame = null, this._xAxis = null, this._yAxis = null, this._back = null, this._graphs = null, this._tips = null, this.stageTip = new k.Display.Sprite({ id: 'tip' }), this.core = new k.Display.Sprite({ id: 'core' }), this.stageBg = new k.Display.Sprite({ id: 'bg' }), this.stage.addChild(this.stageBg), this.stage.addChild(this.core), this.stage.addChild(this.stageTip);
        },
        draw: function (a, b) {
            b.rotate && this.rotate(b.rotate), this.dataFrame = this._initData(a, b), this._initModule(b, this.dataFrame), this._startDraw(), this._drawEnd(), this._arguments = arguments;
        },
        clear: function () {
            this.stageBg.removeAllChildren(), this.core.removeAllChildren(), this.stageTip.removeAllChildren();
        },
        reset: function (a, b) {
            this.clear(), this.width = parseInt(this.element.width()), this.height = parseInt(this.element.height()), this.draw(a, b);
        },
        _initModule: function (a, b) {
            this._xAxis = new f(a.xAxis, b.xAxis), this._yAxis = new g(a.yAxis, b.yAxis), this._back = new h(a.back), this._graphs = new i(a.graphs), this._tips = new j(a.tips);
        },
        _startDraw: function () {
            var a = 0, b = this.height - this._xAxis.h;
            this._yAxis.draw({
                pos: {
                    x: 0,
                    y: b
                },
                yMaxHeight: b
            }), a = this._yAxis.w, this._xAxis.draw({
                w: this.width - a,
                max: { left: -a },
                pos: {
                    x: a,
                    y: b
                }
            }), this._back.draw({
                w: this.width - a,
                h: b,
                xAxis: { data: this._yAxis.data },
                yAxis: { data: this._xAxis.data },
                pos: {
                    x: a + this._xAxis.disOriginX,
                    y: b
                }
            }), this._graphs.draw(this._trimGraphs(), {
                w: this._xAxis.xGraphsWidth,
                h: this._yAxis.yGraphsHeight,
                pos: {
                    x: a + this._xAxis.disOriginX,
                    y: b
                }
            }), this._graphs.grow();
        },
        _trimGraphs: function () {
            var a = this._xAxis.dataOrg, b = this._yAxis.dataOrg, c = Math.min(b.length, a.length);
            a.length = c, b.length = c;
            for (var d = (this._xAxis.xDis, this._yAxis.dataSection[this._yAxis.dataSection.length - 1]), e = this._xAxis.dataSection[this._xAxis.dataSection.length - 1], f = [], g = 0, h = b.length; h > g; g++) {
                !f[g] && (f[g] = []);
                for (var i = 0, j = b[g].length; j > i; i++) {
                    var k = -(b[g][i] - this._yAxis._baseNumber) / (d - this._yAxis._baseNumber) * this._yAxis.yGraphsHeight, l = (a[g][i] - this._xAxis._baseNumber) / (e - this._xAxis._baseNumber) * this._xAxis.w;
                    f[g][i] = {
                        value: {
                            x: a[g][i],
                            y: b[g][i]
                        },
                        x: l,
                        y: k
                    };
                }
            }
            return f;
        },
        _drawEnd: function () {
            this.stageBg.addChild(this._back.sprite), this.core.addChild(this._xAxis.sprite), this.core.addChild(this._graphs.sprite), this.core.addChild(this._yAxis.sprite), this.stageTip.addChild(this._tips.sprite);
        }
    });
}, {
    requires: [
        'dvix/chart/',
        'dvix/utils/tools',
        'dvix/utils/datasection',
        'dvix/event/eventtype',
        './xaxis',
        'dvix/components/yaxis/yAxis',
        'dvix/components/back/Back',
        './graphs',
        'dvix/components/tips/Tips'
    ]
});