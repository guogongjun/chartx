define(
    "chartx/chart/bar/graphs", [
        "canvax/index",
        "canvax/shape/Rect",
        "chartx/utils/tools",
        "chartx/chart/theme",
        "canvax/animation/AnimationFrame",
        "canvax/shape/BrokenLine"
    ],
    function(Canvax, Rect, Tools, Theme, AnimationFrame, BrokenLine) {

        var Graphs = function(opt, root) {
            this.data = [];
            this.w = 0;
            this.h = 0;
            this.root = root;
            this._yAxisFieldsMap = {}; //{"uv":{index:0,fillStyle:"" , ...} ...}
            this._setyAxisFieldsMap();

            this.animation = true;

            this.pos = {
                x: 0,
                y: 0
            };

            this._colors = Theme.colors;

            this.bar = {
                width: 0,
                _width: 0,
                radius: 4,
                fillStyle : null,
                filter : function(){} //用来定制bar的样式
            };

            this.text = {
                enabled: false,
                fillStyle: '#999',
                fontSize: 12,
                format: null,
                lineWidth:1,
                strokeStyle: 'white'
            };

            this.average = {
                enabled: false,
                field: "average",
                fieldInd: -1,
                fillStyle: "#c4c9d6",
                data: null
            };

            this.checked = {
                enabled: false,
                fillStyle: '#00A8E6',
                strokeStyle: '#00A8E6',
                globalAlpha: 0.1,
                lineWidth: 2
            }

            this.sort = null;

            this._barsLen = 0;

            this.eventEnabled = true;

            this.sprite = null;
            this.txtsSp = null;
            this.checkedSp = null;

            this.yDataSectionLen = 0; //y轴方向有多少个section

            _.deepExtend(this, opt);

            this._initaverage();

            this.init();
        };

        Graphs.prototype = {
            init: function() {
                this.sprite = new Canvax.Display.Sprite({
                    id: "graphsEl"
                });
                this.barsSp = new Canvax.Display.Sprite({
                    id: "barsSp"
                });
                this.txtsSp = new Canvax.Display.Sprite({
                    id: "txtsSp",
                    context: {
                        //visible: false
                    }
                });
                this.checkedSp = new Canvax.Display.Sprite({
                    id: "checkedSp"
                });
            },
            setX: function($n) {
                this.sprite.context.x = $n
            },
            setY: function($n) {
                this.sprite.context.y = $n
            },
            getInfo: function(index) {
                //该index指当前
                return this._getInfoHandler({
                    iGroup: index
                })
            },
            _checked: function($o) {
                var me = this
                var index = $o.iNode
                var group = me.barsSp.getChildById('barGroup_' + index)
                if (!group) {
                    return
                }

                me.checkedSp.removeChildById('line_' + index)
                me.checkedSp.removeChildById('rect_' + index)
                var hoverRect = group.getChildAt(0)
                var x0 = hoverRect.context.x
                var x1 = hoverRect.context.x + hoverRect.context.width,
                    y = -me.h

                if ($o.checked) {
                    var rect = new Rect({
                        id: "rect_" + index,
                        pointChkPriority: false,
                        context: {
                            x: x0,
                            y: y,
                            width: hoverRect.context.width,
                            height: hoverRect.context.height,
                            fillStyle: me.checked.fillStyle,
                            globalAlpha: me.checked.globalAlpha
                        }
                    });
                    me.checkedSp.addChild(rect)

                    var line = new BrokenLine({
                        id: "line_" + index,
                        context: {
                            pointList: [
                                [x0, y],
                                [x1, y]
                            ],
                            strokeStyle: me.checked.strokeStyle,
                            lineWidth: me.checked.lineWidth
                        }
                    });
                    me.checkedSp.addChild(line)
                }
            },
            removeAllChecked: function() {
                var me = this
                me.checkedSp.removeAllChildren()
            },
            setBarStyle: function($o) {
                var me = this
                var index = $o.iNode
                var group = me.barsSp.getChildById('barGroup_' + index)
                
                var fillStyle = $o.fillStyle || me._getColor(me.bar.fillStyle)
                for (var a = 0, al = group.getNumChildren(); a < al; a++) {
                    var rectEl = group.getChildAt(a)
                    rectEl.context.fillStyle = fillStyle
                }
            },
            _setyAxisFieldsMap: function() {
                var me = this;
                _.each(_.flatten(this.root.dataFrame.yAxis.field), function(field, i) {
                    me._yAxisFieldsMap[field] = {
                        index: i
                    };
                });
            },
            _initaverage: function() {
                if (this.average.enabled) {
                    _.each(this.root.dataFraem, function(fd, i) {
                        if (fd.field == this.average.field) {
                            this.average.fieldInd = i;
                        }
                    });
                }
            },
            _getColor: function(c, groups, vLen, i, h, v, value, field) {
                var style = null;
                if (_.isString(c)) {
                    style = c
                };
                if (_.isArray(c)) {
                    style = _.flatten(c)[this._yAxisFieldsMap[field].index];
                };
                if (_.isFunction(c)) {
                    style = c.apply(this, [{
                        iGroup: i,
                        iNode: h,
                        iLay: v,
                        field: field,
                        value: value,
                        xAxis: {
                            field: this.root._xAxis.field,
                            value: this.root._xAxis.data[h].content
                        }
                    }]);
                };
                if (!style || style == "") {
                    style = this._colors[this._yAxisFieldsMap[field].index];
                };
                return style;
            },
            //只用到了i v。 i＝＝ 一级分组， v 二级分组
            _getFieldFromIHV : function( i , h , v ){
                var yField = this.root._yAxis.field;
                var field = null;
                if( _.isString(yField[i]) ){
                    field = yField[i];
                } else if( _.isArray(yField[i]) ){
                    field = yField[i][v];
                }
                return field;
            },
            checkBarW: function(xDis1, xDis2) {
                if (this.bar.width) {
                    if (_.isFunction(this.bar.width)) {
                        this.bar._width = this.bar.width(xDis1);
                    } else {
                        this.bar._width = this.bar.width;
                    }
                } else {
                    this.bar._width = parseInt(xDis2) - (parseInt(Math.max(1, xDis2 * 0.3)));

                    //这里的判断逻辑用意已经忘记了，先放着， 有问题在看
                    if (this.bar._width == 1 && xDis1 > 3) {
                        this.bar._width = parseInt(xDis1) - 2;
                    };
                };
                this.bar._width < 1 && (this.bar._width = 1);
            },
            resetData: function(data, opt) {
                this.draw(data.data, opt);
            },
            draw: function(data, opt) {
                _.deepExtend(this, opt);
                if (data.length == 0) {
                    return;
                };

                var preLen = 0;
                this.data[0] && (preLen = this.data[0][0].length);

                this.data = data;
                var me = this;
                var groups = data.length;
                var itemW = 0;

                _.each(data, function(h_group, i) {
                    /*
                    //h_group为横向的分组。如果yAxis.field = ["uv","pv"]的话，
                    //h_group就会为两组，一组代表uv 一组代表pv。
                    var spg = new Canvax.Display.Sprite({ id : "barGroup"+i });
                    */

                    //vLen 为一单元bar上面纵向堆叠的length
                    //比如yAxis.field = [?
                    //    ["uv","pv"],  vLen == 2
                    //    "click"       vLen == 1
                    //]

                    //if (h <= preLen - 1)的话说明本次绘制之前sprite里面已经有bar了。需要做特定的动画效果走过去

                    var vLen = h_group.length;
                    if (vLen == 0) return;
                    var hLen = h_group[0].length;

                    //itemW 还是要跟着xAxis的xDis保持一致
                    itemW = parseInt(me.w / hLen);

                    me._barsLen = hLen * groups;

                    for (h = 0; h < hLen; h++) {
                        var groupH;
                        if (i == 0) {
                            //横向的分组
                            if (h <= preLen - 1) {
                                groupH = me.barsSp.getChildById("barGroup_" + h);
                            } else {
                                groupH = new Canvax.Display.Sprite({
                                    id: "barGroup_" + h
                                });
                                me.barsSp.addChild(groupH);
                                groupH.iNode = h;
                                groupH.on("click dblclick mousedown mousemove mouseup", function(e) {
                                    if (!e.eventInfo) {
                                        e.eventInfo = me._getInfoHandler(this);
                                    };
                                });
                            };

                            if (me.eventEnabled) {
                                var hoverRect;
                                if (h <= preLen - 1) {
                                    hoverRect = groupH.getChildById("bhr_" + h);
                                    hoverRect.context.width = itemW;
                                    hoverRect.context.x = itemW * h;
                                } else {
                                    hoverRect = new Rect({
                                        id: "bhr_" + h,
                                        pointChkPriority: false,
                                        context: {
                                            x: itemW * h,
                                            y: (me.sort && me.sort == "desc") ? 0 : -me.h,
                                            width: itemW,
                                            height: me.h,
                                            fillStyle: "#ccc",
                                            globalAlpha: 0
                                        }
                                    });
                                    groupH.addChild(hoverRect);
                                    hoverRect.hover(function(e) {
                                        this.context.globalAlpha = 0.1;
                                    }, function(e) {
                                        this.context.globalAlpha = 0;
                                    });
                                    hoverRect.iGroup = -1, hoverRect.iNode = h, hoverRect.iLay = -1;
                                    hoverRect.on("panstart mouseover mousemove mouseout click", function(e) {
                                        e.eventInfo = me._getInfoHandler(this, e);
                                    });
                                }
                            };
                        } else {
                            groupH = me.barsSp.getChildById("barGroup_" + h);
                        };

                        //同上面，给txt做好分组
                        var txtGroupH;
                        if (i == 0) {
                            if (h <= preLen - 1) {
                                txtGroupH = me.txtsSp.getChildById("txtGroup_" + h);
                            } else {
                                txtGroupH = new Canvax.Display.Sprite({
                                    id: "txtGroup_" + h
                                });
                                me.txtsSp.addChild(txtGroupH);
                                txtGroupH.iGroup = i;
                            };
                        } else {
                            txtGroupH = me.txtsSp.getChildById("txtGroup_" + h);
                        };

                        for (v = 0; v < vLen; v++) {
                            //单个的bar，从纵向的底部开始堆叠矩形
                            var rectData = h_group[v][h];
                            rectData.iGroup = i, rectData.iNode = h, rectData.iLay = v
                            var rectH = parseInt(Math.abs(rectData.y));
                            if (v > 0) {
                                rectH = rectH - parseInt(Math.abs(h_group[v - 1][h].y));
                            };
                            var beginY = parseInt(rectData.y);

                            var fillStyle = me._getColor(me.bar.fillStyle, groups, vLen, i, h, v, rectData.value, rectData.field);

                            //根据第一行数据来配置下_yAxisFieldsMap中对应field的fillStyle
                            if (h == 0) {
                                var _yMap = me._yAxisFieldsMap[ me._getFieldFromIHV( i , h , v ) ];
                                if (!_yMap.fillStyle) {
                                    _yMap.fillStyle = fillStyle;
                                };
                            }

                            rectData.fillStyle = fillStyle;

                            var finalPos = {
                                x: Math.round(rectData.x - me.bar._width / 2),
                                y: beginY,
                                width: parseInt(me.bar._width),
                                height: rectH,
                                fillStyle: fillStyle,
                                scaleY: 1
                            };
                            var rectCxt = {
                                x: finalPos.x,
                                y: 0,
                                width: finalPos.width,
                                height: finalPos.height,
                                fillStyle: finalPos.fillStyle,
                                scaleY: 0
                            };
                            
                            if (!!me.bar.radius && v == vLen - 1) {
                                var radiusR = Math.min(me.bar._width / 2, rectH);
                                radiusR = Math.min(radiusR, me.bar.radius);
                                rectCxt.radius = [radiusR, radiusR, 0, 0];
                            };

                            if (!me.animation) {
                                delete rectCxt.scaleY;
                                rectCxt.y = finalPos.y;
                            };

                            var rectEl;
                            if (h <= preLen - 1) {
                                rectEl = groupH.getChildById("bar_" + i + "_" + h + "_" + v);
                                rectEl.context.fillStyle = fillStyle;
                            } else {
                                rectEl = new Rect({
                                    id: "bar_" + i + "_" + h + "_" + v,
                                    context: rectCxt
                                });
                                groupH.addChild(rectEl);
                            };

                            rectEl.finalPos = finalPos;

                            rectEl.iGroup = i, rectEl.iNode = h, rectEl.iLay = v;

                            me.bar.filter.apply( rectEl, [ rectData , me] );

                            if (me.eventEnabled) {
                                rectEl.on("panstart mouseover mousemove mouseout click dblclick", function(e) {
                                    e.eventInfo = me._getInfoHandler(this, e);
                                    if (e.type == "mouseover") {
                                        this.parent.getChildById("bhr_" + this.iNode).context.globalAlpha = 0.1;
                                    }
                                    if (e.type == "mouseout") {
                                        this.parent.getChildById("bhr_" + this.iNode).context.globalAlpha = 0;
                                    }
                                });
                            };

                            if (v == vLen - 1 && me.text.enabled) {
                                //文字
                                var contents = [rectData];

                                var infosp;
                                if (h <= preLen - 1) {
                                    infosp = txtGroupH.getChildById("infosp_" + i + "_" + h);
                                } else {
                                    infosp = new Canvax.Display.Sprite({
                                        id: "infosp_" + i + "_" + h,
                                        context: {
                                            visible: false
                                        }
                                    });
                                    infosp._hGroup = h;
                                    txtGroupH.addChild(infosp);
                                };

                                if (vLen > 1) {
                                    for (var c = vLen - 2; c >= 0; c--) {
                                        contents.unshift(h_group[c][h]);
                                    }
                                };

                                var infoWidth = 0;
                                var infoHeight = 0;
                                
                                _.each(contents, function(cdata, ci) {
                                    var content = cdata.value;
                                    if (_.isFunction(me.text.format)) {
                                        var _formatc = me.text.format.apply( self , [content , cdata]);
                                        if(!!_formatc || _formatc==="" || _formatc===0){
                                            content = _formatc
                                        }
                                    };
                                    if (!me.animation && _.isNumber(content)) {
                                        content = Tools.numAddSymbol(content);
                                    };

                                    if( content === "" ){
                                        return;
                                    };

                                    if (ci > 0 && infosp.children.length>0) {
                                        txt = new Canvax.Display.Text("/", {
                                            context: {
                                                x: infoWidth + 2,
                                                fillStyle: "#999"
                                            }
                                        });
                                        infoWidth += txt.getTextWidth() + 2;
                                        infosp.addChild(txt);
                                    };

                                    var txt;
                                    if (h <= preLen - 1) {
                                        txt = infosp.getChildById("info_txt_" + i + "_" + h + "_" + ci);
                                    } else {
                                        txt = new Canvax.Display.Text( content , {
                                            id: "info_txt_" + i + "_" + h + "_" + ci,
                                            context: {
                                                x: infoWidth + 2,
                                                fillStyle: cdata.fillStyle,
                                                fontSize: me.text.fontSize,
                                                lineWidth: me.text.lineWidth,
                                                strokeStyle: me.text.strokeStyle
                                            }
                                        });
                                        infosp.addChild(txt);
                                    };
                                    txt._text = cdata.value;
                                    txt._data = cdata;
                                    infoWidth += txt.getTextWidth() + 2;
                                    infoHeight = Math.max(infoHeight, txt.getTextHeight());

                                    if( me.animation ){
                                        txt.resetText(0);
                                    };
                                });

                                infosp._finalX = rectData.x - infoWidth / 2;
                                infosp._finalY = finalPos.y - infoHeight;
                                infosp._centerX = rectData.x;
                                infosp.context.width = infoWidth;
                                infosp.context.height = infoHeight;

                                if (!me.animation) {
                                    infosp.context.y = finalPos.y - infoHeight;
                                    infosp.context.x = rectData.x - infoWidth / 2;
                                    infosp.context.visible = true;
                                };
                            }
                        };
                    }
                });

                this.sprite.addChild(this.barsSp);

                this.sprite.addChild(this.checkedSp)

                if (this.text.enabled) {
                    this.sprite.addChild(this.txtsSp);
                };

                //如果有average模块配置。
                if (this.average.enabled && this.average.data) {
                    !this.averageSp && (this.averageSp = new Canvax.Display.Sprite({
                        id: "averageSp"
                    }));
                    _.each(this.average.layoutData, function(average, i) {
                        var averageRectC = {
                            x: itemW * i,
                            y: average.y,
                            fillStyle: me.average.fillStyle,
                            width: itemW,
                            height: 2
                        };
                        var averageLine;
                        if (i <= preLen - 1) {
                            averageLine = me.averageSp.getChildById("average_" + i);
                            averageLine.context.x = averageRectC.x;
                            averageLine.context.y = averageRectC.y;
                            averageLine.context.width = averageRectC.width;
                        } else {
                            averageLine = new Rect({
                                id: "average_" + i,
                                context: averageRectC
                            });
                            me.averageSp.addChild(averageLine);
                        };

                    });
                    this.sprite.addChild(me.averageSp);
                };

                this.sprite.context.x = this.pos.x;
                this.sprite.context.y = this.pos.y;

                if (this.sort && this.sort == "desc") {
                    this.sprite.context.y -= this.h;
                };
            },
            _updateInfoTextPos: function(el) {
                if (this.root.type == "horizontal") {
                    return;
                };
                var infoWidth = 0;
                var infoHeight = 0;
                var cl = el.children.length;
                _.each(el.children, function(c, i) {
                    if (c.getTextWidth) {
                        c.context.x = infoWidth;
                        infoWidth += c.getTextWidth() + (i < cl ? 2 : 0);
                        infoHeight = Math.max(infoHeight, c.getTextHeight());
                    };
                });
                el.context.x = el._centerX - infoWidth / 2 + 1;
                el.context.width = infoWidth;
                el.context.height = infoHeight;
            },
            /**
             * 生长动画
             */
            grow: function(callback, opt) {
                var self = this;
                if (!this.animation) {
                    callback && callback(self);
                    return;
                };
                var sy = 1;
                if (this.sort && this.sort == "desc") {
                    sy = -1;
                };

                //先把已经不在当前range范围内的元素destroy掉
                if ( self.data[0] && self.barsSp.children.length > self.data[0][0].length) {
                    for (var i = self.data[0][0].length, l = self.barsSp.children.length; i < l; i++) {
                        self.barsSp.getChildAt(i).destroy();
                        self.text.enabled && self.txtsSp.getChildAt(i).destroy();
                        self.averageSp && self.averageSp.getChildAt(i).destroy();
                        i--;
                        l--;
                    };
                };

                var options = _.extend({
                    delay: Math.min(1000 / this._barsLen, 80),
                    easing: "Back.Out",
                    duration: 500
                }, opt);

                _.each(self.data, function(h_group, g) {
                    var vLen = h_group.length;
                    if (vLen == 0) return;
                    var hLen = h_group[0].length;
                    for (h = 0; h < hLen; h++) {
                        for (v = 0; v < vLen; v++) {

                            var group = self.barsSp.getChildById("barGroup_" + h);

                            var bar = group.getChildById("bar_" + g + "_" + h + "_" + v);
                            //console.log("finalPos"+bar.finalPos.y)

                            if (options.duration == 0) {
                                bar.context.scaleY = sy;
                                bar.context.y = sy * sy * bar.finalPos.y;
                                bar.context.x = bar.finalPos.x;
                                bar.context.width = bar.finalPos.width;
                                bar.context.height = bar.finalPos.height;
                            } else {
                                if (bar._tweenObj) {
                                    AnimationFrame.destroyTween(bar._tweenObj);
                                };
                                bar._tweenObj = bar.animate({
                                    scaleY: sy,
                                    y: sy * bar.finalPos.y,
                                    x: bar.finalPos.x,
                                    width: bar.finalPos.width,
                                    height: bar.finalPos.height
                                }, {
                                    duration: options.duration,
                                    easing: options.easing,
                                    delay: h * options.delay,
                                    onUpdate: function(arg) {

                                    },
                                    onComplete: function(arg) {
                                        if (arg.width < 3) {
                                            this.context.radius = 0;
                                        }
                                    },
                                    id: bar.id
                                });
                            };

                        };

                        //txt grow
                        if (self.text.enabled) {
                            var txtGroupH = self.txtsSp.getChildById("txtGroup_" + h);

                            var infosp = txtGroupH.getChildById("infosp_" + g + "_" + h);

                            if (self.root.type == "horizontal") {
                                infosp.context.x = infosp._finalX;
                            };

                            infosp.animate({
                                y: infosp._finalY,
                                x: infosp._finalX
                            }, {
                                duration: options.duration,
                                easing: options.easing,
                                delay: h * options.delay,
                                onUpdate: function() {
                                    this.context.visible = true;
                                },
                                onComplete: function() {}
                            });

                            _.each(infosp.children, function(txt) {
                                if (txt._text || txt._text===0) {
                                    if (txt._tweenObj) {
                                        AnimationFrame.destroyTween(txt._tweenObj);
                                    };
                                    txt._tweenObj = AnimationFrame.registTween({
                                        from: {
                                            v: txt.text
                                        },
                                        to: {
                                            v: txt._text
                                        },
                                        duration: options.duration + 300,
                                        delay: h * options.delay,
                                        onUpdate: function() {
                                            var content = this.v;

                                            if (_.isFunction(self.text.format)) {
                                                var _formatc = self.text.format.apply( self , [content , txt._data]);
                                                if(!!_formatc || _formatc==="" || _formatc===0){
                                                    content = _formatc
                                                }
                                            } else if (_.isNumber(content)) {
                                                content = Tools.numAddSymbol(parseInt(content));
                                            };
                                            txt.resetText(content);
                                            if (txt.parent) {
                                                self._updateInfoTextPos(txt.parent);
                                            } else {
                                                txt.destroy();
                                            }
                                        }
                                    })
                                };
                            });
                        }
                    };
                });
                callback && callback(self);
                /*
                window.setTimeout(function() {
                    callback && callback(self);
                }, 300 * (this.barsSp.children.length - 1));
                */
            },
            _getInfoHandler: function(target) {
                var node = {
                    iGroup: target.iGroup,
                    iNode: target.iNode,
                    iLay: target.iLay,
                    nodesInfoList: this._getNodeInfo(target.iGroup, target.iNode, target.iLay)
                };
                return node;
            },
            _getNodeInfo: function(iGroup, iNode, iLay) {
                var arr = [];
                var me = this;
                var groups = me.data.length;

                iGroup == undefined && (iGroup = -1);
                iNode == undefined && (iNode = 0);
                iLay == undefined && (iLay = -1);

                _.each(me.data, function(h_group, i) {
                    var node;
                    var vLen = h_group.length;
                    if (vLen == 0) return;
                    var hLen = h_group[0].length;
                    for (h = 0; h < hLen; h++) {
                        if (h == iNode) {
                            for (v = 0; v < vLen; v++) {
                                if ((iGroup == i || iGroup == -1) && (iLay == v || iLay == -1)) {
                                    node = h_group[v][h]
                                    node.fillStyle = me._getColor(me.bar.fillStyle, groups, vLen, i, h, v, node.value, node.field);
                                    arr.push(node)
                                }
                            }
                        }
                    }
                });
                return arr;
            }
        };
        return Graphs;
    }
);