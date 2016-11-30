define("chartx/chart/original/sector",["chartx/chart/index","chartx/utils/tools","chartx/utils/gradient-color","chartx/utils/datasection","./sector/xaxis","./sector/yaxis","chartx/chart/original/sector/graphs","chartx/components/tips/tip","chartx/utils/dataformat"],function(a,b,c,d,e,f,g,h,i){var j=a.Canvax;return a.extend({dis:{left:10,right:10,top:10,bottom:10},graphs:{fillStyle:{first:"#2e99e5",last:"#cbe2f2",end:"#F6F5F4"}},_xAxis:null,_yAxis:null,_graphs:null,init:function(a,b,c){_.deepExtend(this,c),this.dataFrame=this._initData(b,c)},_setStages:function(){this.core=new j.Display.Sprite({id:"core"}),this.stageBg=new j.Display.Sprite({id:"bg"}),this.stageTip=new j.Display.Sprite({id:"tip"}),this.stage.addChild(this.stageBg),this.stage.addChild(this.core),this.stage.addChild(this.stageTip)},draw:function(){this._setStages(),this._initModule(),this._startDraw(),this._drawEnd(),this.inited=!0},_initData:function(a,b){var c=i.apply(this,arguments),d=[],e=c.xAxis.org[0],f=c.yAxis.org[0];_.each(e,function(a,b){var c={index:b,xAxis:a,yAxis:f[b]};d.push(c)});var a=_.sortBy(d,"xAxis"),g=[],h=[];return _.each(a,function(a,b){g.push(a.xAxis),h.push(a.yAxis)}),c.xAxis.org[0]=g,c.yAxis.org[0]=h,c.graphs={org:a},c},_initModule:function(){this._xAxis=new e(this.xAxis,this.dataFrame.xAxis),this._yAxis=new f(this.yAxis,this.dataFrame.yAxis),this._graphs=new g(this.graphs,this.canvax.getDomContainer())},_startDraw:function(a){var b=a&&a.w||this.width-this.dis.left-this.dis.right,c=a&&a.h||this.height-this.dis.top-this.dis.bottom,d=parseInt(c-this._xAxis.h);this._yAxis.draw({pos:{x:0,y:d},yMaxHeight:d});var e=Math.ceil(this._yAxis.w);this._xAxis.draw({graphh:c,graphw:b,yAxisW:e}),this._xAxis.yAxisW!=e&&(this._yAxis.resetWidth(this._xAxis.yAxisW),e=this._xAxis.yAxisW),this.graphsw=Math.min(parseInt(b-e),d),this.graphsH=this.graphsw,d=parseInt(this.dis.top+this.graphsH),this._yAxis.setY(d),this._xAxis.setY(d);var f=this._trimGraphs();this._graphs.draw({pos:{x:e,y:d},data:f.data}),this._yAxis.updateLayout(f.yAxisData),this._xAxis.updateLayout(f.xAxisData)},_trimGraphs:function(){var a=this,b=[],d=[],e=[],f=this.dataFrame.org,g=f[f.length-1].xAxis,h=this.graphsw,i=new c(a.graphs.fillStyle.first,a.graphs.fillStyle.last,f.length-1);return i.push(a.graphs.fillStyle.end),_.each(f,function(a,c){b.unshift({r:Math.floor(a.xAxis/g*h),startAngle:-90,endAngle:0,fillStyle:i[c]}),d.push({y:-Math.floor(a.xAxis/g*h)}),e.push({x:Math.floor(a.xAxis/g*h)})}),e.unshift({x:0}),{data:b,yAxisData:d,xAxisData:e}},_drawEnd:function(){this.core.context.y=this.dis.top,this.core.context.x=this.dis.left,this.core.addChild(this._xAxis.sprite),this.core.addChild(this._graphs.sprite),this.core.addChild(this._yAxis.sprite)}})});