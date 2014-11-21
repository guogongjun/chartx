define("dvix/chart/pie/index",["dvix/chart/","dvix/components/pie/Pie","dvix/components/line/Graphs","dvix/components/pie/PieTip"],function(a,b,c,d){var e=a.Canvax;return a.extend({init:function(){this.config={mode:1,event:{enabled:1}},this.stageBg=new e.Display.Sprite({id:"bg"}),this.core=new e.Display.Sprite({id:"core"}),this.stageTip=new e.Display.Stage({id:"stageTip"}),this.canvax.addChild(this.stageTip),this.stageTip.toFront(),this.stage.addChild(this.core)},draw:function(){this._initModule(),this._startDraw(),this._drawEnd(),this._arguments=arguments},getList:function(){var a,b=this,c=[];if(b._pie){var d=b._pie.getList();if(d.length>0)for(var e=0;e<d.length;e++)a=d[e],c.push({name:a.name,index:a.index,color:a.color,r:a.r,percentage:a.percentage})}return c},show:function(a){this._pie&&this._pie.showHideSector(a)},slice:function(a){this._pie&&this._pie.slice(a)},_initData:function(a){var b={};if(b.org=a,b.data=[],_.isArray(a))for(var c=0;c<a.length;c++){var d={};_.isArray(a[c])?(d.name=a[c][0],d.y=parseFloat(a[c][1]),d.sliced=!1,d.selected=!1):"object"==typeof a[c]&&(d.name=a[c].name,d.y=parseFloat(a[c].y),d.sliced=a[c].sliced||!1,d.selected=a[c].selected||!1),d.name&&b.data.push(d)}return b},clear:function(){this.stageBg.removeAllChildren(),this.core.removeAllChildren(),this.stageTip.removeAllChildren()},reset:function(a,b){this.clear(),this.width=parseInt(this.element.width()),this.height=parseInt(this.element.height()),this.draw(a,b)},_initModule:function(){var a=this,c=a.width,e=a.height,f=2*Math.min(c,e)/3/2,g=parseInt(a.innerRadius||0),h=2*f/3;g=g>=0?g:0,g=h>=g?g:h;var i=c/2,j=e/2;a.pie={x:i,y:j,r0:g,r:f,boundWidth:c,boundHeight:e,data:a.dataFrame,dataLabel:a.dataLabel,strokeWidth:a.strokeWidth,allowPointSelect:a.allowPointSelect,animation:a.animation},a.tip.enabled&&(a._tip=new d(a),a.pie.tipCallback={position:function(b){a._tip&&(a._tip.sprite.context.visible=!0,a._tip.sprite.context.x=b.x+5,a._tip.sprite.context.y=b.y-5)},isshow:function(b){a._tip.sprite.context.visible=b},update:function(b){a._tip._reset(b)}}),a._pie=new b(a.pie)},_startDraw:function(){this._pie.draw(this)},_drawEnd:function(){this.core.addChild(this._pie.sprite),this._tip&&this.stageTip.addChild(this._tip.sprite),this.fire("complete")}})});