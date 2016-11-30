define(
    "chartx/chart/original/demand",
    [
        'chartx/chart/index',
        'chartx/utils/simple-data-format',
        'chartx/chart/original/demand/graphs',
        'chartx/components/polar/polar',
        'chartx/components/tips/tip'
    ],
    function(Chart , dataFormat , Graphs , Polar , Tip){
        /*
         *@node chart在dom里的目标容器节点。
        */
        var Canvax = Chart.Canvax;
    
        return Chart.extend( {
            init:function(node, data, opts){
                this._node = node;
                this._data = data;
                this._opts = opts;

                this._graphs = null;
                this._coordinate = null;

                this.dataFrame = this.initData( data );

                _.deepExtend( this, this._opts );
                debugger

                this.padding.top = 30;
                this.padding.bottom = 30;
            },
            draw:function(){
                this._initModule(); //初始化模块  

                this._layout();

                this._startDraw(); //开始绘图

                this._drawEnd(); //绘制结束，添加到舞台

                this._bindEvent();
                
                this.inited = true;
            },
            _initModule : function(){
                var w = this.width - this.padding.left - this.padding.right;
                var h = this.height - this.padding.top - this.padding.bottom;

                //初始化坐标系统
                this._coordinate = new Polar( _.deepExtend({
                    w : w,
                    h : h
                } , this._opts.coordinate ));

                this._graphs = new Graphs({
                    coordinate : this._coordinate, //极坐标系统
                    options : this._opts.graphs,
                    dataFrame : this.dataFrame                     
                });

                //tips
                this._tip = new Tip(this.tips, this.canvax.getDomContainer());
                this._tip._getDefaultContent = this._getTipDefaultContent;
            },
            _getTipDefaultContent: function( e ){
                return e.node.data.name;
            },
            _startDraw: function(){
                this._graphs.draw();
            },
            _layout: function(){
                var _gsc = this._graphs.sprite.context;
                _gsc.x = this.padding.left;
                _gsc.y = this.padding.top;
            },
            _drawEnd: function(){
                this.stage.addChild( this._graphs.sprite );
                this.stage.addChild( this._tip.sprite );
            },
            initData: dataFormat,
            _bindEvent  : function(){
                var self = this;
                this._graphs.sprite.on("panstart mouseover", function(e){
                    if( e.eventInfo ){
                        self._tip.show( e );
                    }
                });
                this._graphs.sprite.on("panmove mousemove", function(e){
                    if( e.eventInfo ){
                        self._tip.move( e );
                    }

                });
                this._graphs.sprite.on("panend mouseout", function(e){
                    if( e.eventInfo ){
                        self._tip.hide( e );
                    }
                });
                this._graphs.sprite.on("tap click", function(e){

                });
            }
           
        });
    
    } 
);
