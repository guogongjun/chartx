define("chartx/chart/bar/graphs",["canvax/index","canvax/shape/Rect","chartx/utils/tools","chartx/chart/theme","canvax/animation/AnimationFrame","canvax/shape/BrokenLine"],function(a,b,c,d,e,f){var g=function(a,b){this.data=[],this.w=0,this.h=0,this.root=b,this._yAxisFieldsMap={},this._setyAxisFieldsMap(),this.animation=!0,this.pos={x:0,y:0},this._colors=d.colors,this.bar={width:0,_width:0,radius:4},this.text={enabled:!1,fillStyle:"#999",fontSize:12,format:null},this.average={enabled:!1,field:"average",fieldInd:-1,fillStyle:"#c4c9d6",data:null},this.checked={enabled:!1,fillStyle:"#00A8E6",strokeStyle:"#00A8E6",globalAlpha:.1,lineWidth:2},this.sort=null,this._barsLen=0,this.eventEnabled=!0,this.sprite=null,this.txtsSp=null,this.checkedSp=null,this.yDataSectionLen=0,_.deepExtend(this,a),this._initaverage(),this.init()};return g.prototype={init:function(){this.sprite=new a.Display.Sprite({id:"graphsEl"}),this.barsSp=new a.Display.Sprite({id:"barsSp"}),this.txtsSp=new a.Display.Sprite({id:"txtsSp",context:{}}),this.checkedSp=new a.Display.Sprite({id:"checkedSp"})},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},getInfo:function(a){return this._getInfoHandler({iGroup:a})},_checked:function(a){var c=this,d=a.iGroup,e=c.barsSp.getChildById("barGroup_"+d);if(e){c.checkedSp.removeChildById("line_"+d),c.checkedSp.removeChildById("rect_"+d);var g=e.getChildAt(0),h=g.context.x+1,i=g.context.x+g.context.width-1,j=-c.h;if(a.checked){var k=new b({id:"rect_"+d,pointChkPriority:!1,context:{x:h,y:j,width:g.context.width,height:g.context.height,fillStyle:c.checked.fillStyle,globalAlpha:c.checked.globalAlpha}});c.checkedSp.addChild(k);var l=new f({id:"line_"+d,context:{pointList:[[h,j],[i,j]],strokeStyle:c.checked.strokeStyle,lineWidth:c.checked.lineWidth}});c.checkedSp.addChild(l)}}},removeAllChecked:function(){var a=this;a.checkedSp.removeAllChildren()},setBarStyle:function(a){for(var b=this,c=a.iGroup,d=b.barsSp.getChildById("barGroup_"+c),e=a.fillStyle||b._getColor(b.bar.fillStyle),f=0,g=d.getNumChildren();g>f;f++){var h=d.getChildAt(f);h.context.fillStyle=e}},_setyAxisFieldsMap:function(){var a=this;_.each(_.flatten(this.root.dataFrame.yAxis.field),function(b,c){a._yAxisFieldsMap[b]=c})},_initaverage:function(){this.average.enabled&&_.each(this.root.dataFraem,function(a,b){a.field==this.average.field&&(this.average.fieldInd=b)})},_getColor:function(a,b,c,d,e,f,g,h){var i=null;return _.isString(a)&&(i=a),_.isArray(a)&&(i=_.flatten(a)[this._yAxisFieldsMap[h]]),_.isFunction(a)&&(i=a.apply(this,[{iGroup:d,iNode:e,iLay:f,field:h,value:g}])),i&&""!=i||(i=this._colors[this._yAxisFieldsMap[h]]),i},checkBarW:function(a,b){this.bar.width&&_.isFunction(this.bar.width)&&(this.bar._width=this.bar.width(a)),this.bar.width||(this.bar._width=parseInt(b)-parseInt(Math.max(1,.3*b))),this.bar._width<1&&(this.bar._width=1),1==this.bar._width&&a>3&&(this.bar._width=parseInt(a)-2)},resetData:function(a,b){this.draw(a.data,b)},draw:function(d,e){if(_.deepExtend(this,e),0!=d.length){var f=0;this.data[0]&&(f=this.data[0][0].length),this.data=d;var g=this,i=d.length,j=0;_.each(d,function(d,e){var k=d.length;if(0!=k){var l=d[0].length;for(j=g.w/l,g._barsLen=l*i,15>j&&(g.text.enabled=!1),h=0;h<l;h++){var m;if(0==e){if(h<=f-1?m=g.barsSp.getChildById("barGroup_"+h):(m=new a.Display.Sprite({id:"barGroup_"+h}),g.barsSp.addChild(m),m.iGroup=h,m.on("click mousedown mousemove mouseup",function(a){a.eventInfo||(a.eventInfo=g._getInfoHandler(this))})),g.eventEnabled){var n;h<=f-1?(n=m.getChildById("bhr_"+h),n.context.width=j,n.context.x=j*h):(n=new b({id:"bhr_"+h,pointChkPriority:!1,context:{x:j*h,y:-g.h,width:j,height:g.h,fillStyle:"#ccc",globalAlpha:0}}),m.addChild(n),n.hover(function(a){this.context.globalAlpha=.1},function(a){this.context.globalAlpha=0}),n.iGroup=h,n.iNode=-1,n.iLay=-1,n.on("panstart mouseover mousemove mouseout click",function(a){a.eventInfo=g._getInfoHandler(this,a)}))}}else m=g.barsSp.getChildById("barGroup_"+h);for(v=0;v<k;v++){var o=d[v][h];o.iGroup=h,o.iNode=e,o.iLay=v;var p=parseInt(Math.abs(o.y));v>0&&(p-=parseInt(Math.abs(d[v-1][h].y)));var q=parseInt(o.y),r=g._getColor(g.bar.fillStyle,i,k,e,h,v,o.value,o.field);o.fillStyle=r;var s={x:Math.round(o.x-g.bar._width/2),y:q,width:parseInt(g.bar._width),height:p,fillStyle:r,scaleY:1},t={x:s.x,y:0,width:s.width,height:s.height,fillStyle:s.fillStyle,scaleY:0};if(g.bar.radius&&v==k-1){var u=Math.min(g.bar._width/2,p);u=Math.min(u,g.bar.radius),t.radius=[u,u,0,0]}g.animation||(delete t.scaleY,t.y=s.y);var w;if(h<=f-1?w=m.getChildById("bar_"+e+"_"+h+"_"+v):(w=new b({id:"bar_"+e+"_"+h+"_"+v,context:t}),m.addChild(w)),w.finalPos=s,w.iGroup=h,w.iNode=e,w.iLay=v,g.eventEnabled&&w.on("panstart mouseover mousemove mouseout click",function(a){a.eventInfo=g._getInfoHandler(this,a),"mouseover"==a.type&&(this.parent.getChildById("bhr_"+this.iGroup).context.globalAlpha=.1),"mouseout"==a.type&&(this.parent.getChildById("bhr_"+this.iGroup).context.globalAlpha=0)}),v==k-1&&g.text.enabled){var x,y=[o];if(h<=f-1?x=g.txtsSp.getChildById("infosp_"+e+"_"+h):(x=new a.Display.Sprite({id:"infosp_"+e+"_"+h,context:{visible:!1}}),x._hGroup=h,g.txtsSp.addChild(x)),k>1)for(var z=k-2;z>=0;z--)y.unshift(d[z][h]);var A=0,B=0;_.each(y,function(b,d){var i=b.value;!g.animation&&_.isFunction(g.text.format)&&(i=g.text.format(b.value)),!g.animation&&_.isNumber(i)&&(i=c.numAddSymbol(i));var j;h<=f-1?j=x.getChildById("info_txt_"+e+"_"+h+"_"+d):(j=new a.Display.Text(g.animation?0:i,{id:"info_txt_"+e+"_"+h+"_"+d,context:{x:A+2,fillStyle:b.fillStyle,fontSize:g.text.fontSize}}),x.addChild(j)),j._text=i,A+=j.getTextWidth()+2,B=Math.max(B,j.getTextHeight()),k-2>=d&&(j=new a.Display.Text("/",{context:{x:A+2,fillStyle:"#999"}}),A+=j.getTextWidth()+2,x.addChild(j))}),x._finalX=o.x-A/2,x._finalY=s.y-B,x._centerX=o.x,x.context.width=A,x.context.height=B,g.animation||(x.context.y=s.y-B,x.context.x=o.x-A/2,x.context.visible=!0)}}}}}),this.sprite.addChild(this.barsSp),this.sprite.addChild(this.checkedSp),this.text.enabled&&this.sprite.addChild(this.txtsSp),this.average.enabled&&this.average.data&&(!this.averageSp&&(this.averageSp=new a.Display.Sprite({id:"averageSp"})),_.each(this.average.layoutData,function(a,c){var d,e={x:j*c,y:a.y,fillStyle:g.average.fillStyle,width:j,height:2};f-1>=c?(d=g.averageSp.getChildById("average_"+c),d.context.x=e.x,d.context.y=e.y,d.context.width=e.width):(d=new b({id:"average_"+c,context:e}),g.averageSp.addChild(d))}),this.sprite.addChild(g.averageSp)),this.sprite.context.x=this.pos.x,this.sprite.context.y=this.pos.y,this.sort&&"desc"==this.sort&&(this.sprite.context.y-=this.h)}},_updateInfoTextPos:function(a){if("horizontal"!=this.root.type){var b=0,c=0,d=a.children.length;_.each(a.children,function(a,e){a.getTextWidth&&(a.context.x=b,b+=a.getTextWidth()+(d>e?2:0),c=Math.max(c,a.getTextHeight()))}),a.context.x=a._centerX-b/2+1,a.context.width=b,a.context.height=c}},grow:function(a,b){var d=this;if(!this.animation)return void(a&&a(d));var f=1;if(this.sort&&"desc"==this.sort&&(f=-1),d.barsSp.children.length>d.data[0][0].length)for(var g=d.data[0][0].length,i=d.barsSp.children.length;i>g;g++){d.barsSp.getChildAt(g).destroy();for(var j=0,k=d.txtsSp.children.length;k>j;j++)d.txtsSp.children[j]._hGroup==g&&(d.txtsSp.children[j].destroy(),j--,k--);d.averageSp&&d.averageSp.getChildAt(g).destroy(),g--,i--}var l=_.extend({delay:Math.min(1e3/this._barsLen,80),easing:"Back.Out",duration:500},b);_.each(d.data,function(a,b){var g=a.length;if(0!=g){var i=a[0].length;for(h=0;h<i;h++)for(v=0;v<g;v++){var j=d.barsSp.getChildById("barGroup_"+h),k=j.getChildById("bar_"+b+"_"+h+"_"+v);if(0==l.duration?(k.context.scaleY=f,k.context.y=f*f*k.finalPos.y,k.context.x=k.finalPos.x,k.context.width=k.finalPos.width,k.context.height=k.finalPos.height):(k._tweenObj&&e.destroyTween(k._tweenObj),k._tweenObj=k.animate({scaleY:f,y:f*k.finalPos.y,x:k.finalPos.x,width:k.finalPos.width,height:k.finalPos.height},{duration:l.duration,easing:l.easing,delay:h*l.delay,onUpdate:function(a){},onComplete:function(a){a.width<3&&(this.context.radius=0)},id:k.id})),d.text.enabled){var m=d.txtsSp.getChildById("infosp_"+b+"_"+h);"horizontal"==d.root.type&&(m.context.x=m._finalX),m.animate({y:m._finalY,x:m._finalX},{duration:l.duration,easing:l.easing,delay:h*l.delay,onUpdate:function(){this.context.visible=!0},onComplete:function(){}}),_.each(m.children,function(a){a._text&&e.registTween({from:{v:a.text},to:{v:a._text},duration:l.duration+300,delay:h*l.delay,onUpdate:function(){var b=this.v;_.isFunction(d.text.format)?b=d.text.format(b):_.isNumber(b)&&(b=c.numAddSymbol(parseInt(b))),a.resetText(b),a.parent?d._updateInfoTextPos(a.parent):a.destroy()}})})}}}}),window.setTimeout(function(){a&&a(d)},300*(this.barsSp.children.length-1))},_getInfoHandler:function(a){var b={iGroup:a.iGroup,iNode:a.iNode,iLay:a.iLay,nodesInfoList:this._getNodeInfo(a.iGroup,a.iNode,a.iLay)};return b},_getNodeInfo:function(a,b,c){var d=[],e=this,f=e.data.length;return void 0==a&&(a=0),void 0==b&&(b=-1),void 0==c&&(c=-1),_.each(e.data,function(g,i){var j,k=g.length;if(0!=k){var l=g[0].length;for(h=0;h<l;h++)if(h==a)for(v=0;v<k;v++)b!=i&&-1!=b||c!=v&&-1!=c||(j=g[v][h],j.fillStyle=e._getColor(e.bar.fillStyle,f,k,i,h,v,j.value,j.field),d.push(j))}}),d}},g}),define("chartx/chart/bar/xaxis",["chartx/components/xaxis/xAxis"],function(a){var b=function(a,c){this.xDis1=0,b.superclass.constructor.apply(this,arguments)};return Chartx.extend(b,a,{_trimXAxis:function(a,b){var c=[];this.xDis1=b/a.length;for(var d=0,e=a.length;e>d;d++){var f={content:a[d],x:this.xDis1*(d+1)-this.xDis1/2};c.push(f)}return c}}),b}),define("chartx/chart/bar/yaxis",["chartx/components/yaxis/yAxis"],function(a){var b=function(a,c,d){b.superclass.constructor.apply(this,[a.bar?a.bar:a,c,d])};return Chartx.extend(b,a,{_setDataSection:function(a,b){var c=[];return _.each(a.org,function(a,b){for(var d=[],e=a[0].length,f=a.length,g=0,b=0;e>b;b++){for(var h=0,i=0;f>i;i++)h+=a[i][b],g=Math.min(a[i][b],g);d.push(h)}d.push(g),c.push(d)}),b||(b=[]),_.flatten(c).concat(b)}}),b}),define("chartx/chart/bar/index",["chartx/chart/index","chartx/utils/tools","chartx/utils/datasection","chartx/chart/bar/xaxis","chartx/chart/bar/yaxis","chartx/components/back/Back","chartx/chart/bar/graphs","chartx/components/tips/tip","chartx/utils/dataformat","chartx/components/datazoom/index"],function(a,b,c,d,e,f,g,h,i,j){var k=a.Canvax,l=a.extend({init:function(a,b,c){this._xAxis=null,this._yAxis=null,this._back=null,this._graphs=null,this._tip=null,this._checkedList=[],this._currCheckedList=[],this._node=a,this._data=b,this._opts=c,this.dataZoom={enabled:!1,range:{start:0,end:b.length-1}},c.dataZoom&&(this.dataZoom.enabled=!0,this.padding.bottom+=46),c.proportion?(this.proportion=c.proportion,this._initProportion(a,b,c)):_.deepExtend(this,c),this.dataFrame=this._initData(b)},resetData:function(a){this.dataFrame=this._initData(a,this),this._xAxis.resetData(this.dataFrame.xAxis,{animation:!1}),this._yAxis.resetData(this.dataFrame.yAxis,{animation:!1}),this._graphs.resetData(this._trimGraphs()),this._graphs.grow(function(){},{delay:0})},getCheckedCurrList:function(){var a=this;return _.filter(a._getCurrCheckedList(),function(a){return a})},getCheckedList:function(){var a=this;return _.filter(a._checkedList,function(a){return a})},checkAt:function(a){var b=this,c=a-b.dataZoom.range.start,d=b._graphs.getInfo(c);b._checkedList[a]=d,b._checkedBar({iGroup:c,checked:!0}),b._checkedMiniBar({iGroup:a,checked:!0}),d.iGroup=a},uncheckAt:function(a){var b=this,c=a-b.dataZoom.range.start;b._checked(b._graphs.getInfo(c))},getGroupChecked:function(a){var b=!1;return _.each(this.getCheckedList(),function(c){c&&c.iGroup==a.eventInfo.iGroup&&(b=!0)}),b},_initProportion:function(a,c,d){!d.tips&&(d.tips={}),d.tips=_.deepExtend(d.tips,{content:function(a){var c="<table>",d=this;return _.each(a.nodesInfoList,function(a,e){c+="<tr style='color:"+d.text.fillStyle+"'>";var f=d.prefix[e];f?c+="<td>"+f+"：</td>":a.field&&(c+="<td>"+a.field+"：</td>"),c+="<td>"+b.numAddSymbol(a.value)+"（"+Math.round(a.value/a.vCount*100)+"%）</td></tr>"}),c+="</table>"}}),_.deepExtend(this,d),_.deepExtend(this.yAxis,{dataSection:[0,20,40,60,80,100],text:{format:function(a){return a+"%"}}}),!this.graphs&&(this.graphs={}),_.deepExtend(this.graphs,{bar:{radius:0}})},_setStages:function(){this.core=new k.Display.Sprite({id:"core"}),this.stageBg=new k.Display.Sprite({id:"bg"}),this.stageTip=new k.Display.Sprite({id:"tip"}),this.stage.addChild(this.stageBg),this.stage.addChild(this.core),this.stage.addChild(this.stageTip),this.rotate&&this._rotate(this.rotate)},draw:function(){this._setStages(),this._initModule(),this._startDraw(),this._drawEnd(),this.inited=!0},_initData:function(a,b){var c;if(this.dataZoom.enabled){var d=[a[0]];d=d.concat(a.slice(this.dataZoom.range.start+1,this.dataZoom.range.end+1)),c=i.apply(this,[d,b])}else c=i.apply(this,arguments);return _.each(c.yAxis.field,function(a,b){_.isArray(a)||(a=[a],c.yAxis.org[b]=[c.yAxis.org[b]])}),c},_getaverageData:function(){var a=[],b=this;return this._graphs&&this._graphs.average&&this._graphs.average.data?this._graphs.average.data:(this._graphs.average.enabled&&_.each(this.dataFrame.data,function(c,d){c.field==b._graphs.average.field&&(a=c.data)}),this._graphs.average.data=a,a)},_setaverageLayoutData:function(){var a=[],b=this;if(this._graphs.average.enabled){var c=this._yAxis.dataSection[this._yAxis.dataSection.length-1];_.each(this._graphs.average.data,function(d,e){a.push({value:d,y:-(d-b._yAxis._bottomNumber)/Math.abs(c-b._yAxis._bottomNumber)*b._yAxis.yGraphsHeight})}),this._graphs.average.layoutData=a}},_initModule:function(){this._graphs=new g(this.graphs,this),this._xAxis=new d(this.xAxis,this.dataFrame.xAxis),this._yAxis=new e(this.yAxis,this.dataFrame.yAxis,this._getaverageData()),this._back=new f(this.back),this._tip=new h(this.tips,this.canvax.getDomContainer())},_startDraw:function(a){var b=a&&a.w||this.width,c=a&&a.h||this.height,d=parseInt(c-this._xAxis.h),e=d-this.padding.top-this.padding.bottom;this._yAxis.draw({pos:{x:this.padding.left,y:d-this.padding.bottom},yMaxHeight:e}),this.dataZoom.enabled&&(this.__cloneBar=this._getCloneBar(),this._yAxis.resetData(this.__cloneBar.thumbBar.dataFrame.yAxis,{animation:!1}));var f=this._yAxis.w;this._xAxis.draw({graphh:c-this.padding.bottom,graphw:b-this.padding.right,yAxisW:f}),this._xAxis.yAxisW!=f&&(this._yAxis.resetWidth(this._xAxis.yAxisW),f=this._xAxis.yAxisW);var g=this._yAxis.yGraphsHeight;this._back.draw({w:this._xAxis.xGraphsWidth,h:g,xAxis:{data:this._yAxis.layoutData},yAxis:{data:this._xAxis.layoutData},pos:{x:f,y:d-this.padding.bottom}}),this._setaverageLayoutData();var h=this._trimGraphs();this._graphs.draw(h.data,{w:this._xAxis.xGraphsWidth,h:this._yAxis.yGraphsHeight,pos:{x:f,y:d-this.padding.bottom},yDataSectionLen:this._yAxis.dataSection.length,sort:this._yAxis.sort}),this.dataZoom.enabled&&this._initDataZoom()},_setXaxisYaxisToTipsInfo:function(a){if(a.eventInfo){a.eventInfo.xAxis={field:this.dataFrame.xAxis.field,value:this.dataFrame.xAxis.org[0][a.eventInfo.iGroup]};var b=this;_.each(a.eventInfo.nodesInfoList,function(a,c){_.isArray(b.dataFrame.yAxis.field[a.iNode])?a.field=b.dataFrame.yAxis.field[a.iNode][a.iLay]:a.field=b.dataFrame.yAxis.field[a.iNode],b._checkedList[a.iGroup]?a.checked=!0:a.checked=!1})}},_trimGraphs:function(a,b){a||(a=this._xAxis),b||(b=this._yAxis);var c=a.data,d=b.dataOrg,e=d.length,f=a.xDis1,g=f/(e+1);this._graphs.checkBarW&&this._graphs.checkBarW(f,g);for(var h=b.dataSection[b.dataSection.length-1],i=[],j=[],k=[],l=[],m=this,n=0;e>n;n++){!i[n]&&(i[n]=[]),k[n]=0,j[n]={};var o=d[n];_.each(o,function(a,d){!i[n][d]&&(i[n][d]=[]),m.dataZoom.enabled&&(a=a.slice(m.dataZoom.range.start,m.dataZoom.range.end)),_.each(a,function(e,j){if(c[j]){var p=0;m.proportion&&_.each(o,function(a,b){p+=a[j]});var q=c[j].x-f/2+g*(n+1),r=0;r=m.proportion?-e/p*b.yGraphsHeight:-(e-b._bottomNumber)/Math.abs(h-b._bottomNumber)*b.yGraphsHeight,d>0&&(r+=i[n][d-1][j].y),m._yAxis.sort&&"desc"==m._yAxis.sort&&(r=-(b.yGraphsHeight-Math.abs(r)));var s={value:e,field:m._getTargetField(n,d,j,b.field),x:q,y:r};m.proportion&&(s.vCount=p),i[n][d].push(s),k[n]+=Number(e),l=a.length}})})}for(var p=0,q=k.length;q>p;p++)j[p].agValue=k[p]/l,j[p].agPosition=-(k[p]/l-b._bottomNumber)/(h-b._bottomNumber)*b.yGraphsHeight;return this.dataFrame.yAxis.center=j,{data:i}},_getTargetField:function(a,b,c,d){if(d||(d=this._yAxis.field),_.isString(d))return d;if(_.isArray(d)){var e=d[a];if(_.isString(e))return e;if(_.isArray(e))return e[b]}},_drawEnd:function(){var a=this;this.stageBg.addChild(this._back.sprite),this.core.addChild(this._xAxis.sprite),this.core.addChild(this._graphs.sprite),this.core.addChild(this._yAxis.sprite),this.stageTip.addChild(this._tip.sprite),this._graphs.grow(function(b){a._opts.markLine&&a._initMarkLine(b),a._opts.markPoint&&a._initMarkPoint(b)}),this.bindEvent()},_initDataZoom:function(){var a=this,b=_.deepExtend({w:a._xAxis.xGraphsWidth,count:a._data.length-1,pos:{x:a._xAxis.pos.x,y:a._xAxis.pos.y+a._xAxis.h},dragIng:function(b){(parseInt(b.start)!=parseInt(a.dataZoom.range.start)||parseInt(b.end)!=parseInt(a.dataZoom.range.end))&&(a.dataZoom.range.end<=a.dataZoom.range.start&&(a.dataZoom.range.end=a.dataZoom.range.start+1),a.dataZoom.range.start=parseInt(b.start),a.dataZoom.range.end=parseInt(b.end),a.dataFrame=a._initData(a._data,this),a._xAxis.resetData(a.dataFrame.xAxis,{animation:!1}),a._graphs.average.data=null,a._graphs.w=a._xAxis.xGraphsWidth,a._getaverageData(),a._setaverageLayoutData(),a._graphs.resetData(a._trimGraphs()),a._graphs.grow(function(){},{delay:0,easing:"Quadratic.Out",duration:300}),a._removeChecked())},dragEnd:function(b){a._updateChecked()}},a.dataZoom);a._dataZoom=new j(b);var c=this.__cloneBar.thumbBar._graphs.sprite;c.id=c.id+"_datazoomthumbbarbg",c.context.x=0,c.context.y=a._dataZoom.h-a._dataZoom.barY,c.context.scaleY=a._dataZoom.barH/this.__cloneBar.thumbBar._graphs.h,a._dataZoom.dataZoomBg.addChild(c),a.core.addChild(a._dataZoom.sprite),this.__cloneBar.thumbBar.destroy(),this.__cloneBar.cloneEl.parentNode.removeChild(this.__cloneBar.cloneEl)},_getCloneBar:function(){var a=this,b=a.el.cloneNode();b.innerHTML="",b.id=a.el.id+"_currclone",b.style.position="absolute",b.style.width=a.el.offsetWidth+"px",b.style.height=a.el.offsetHeight+"px",b.style.top="10000px",document.body.appendChild(b);var c=_.deepExtend({},a._opts);_.deepExtend(c,{graphs:{bar:{fillStyle:a.dataZoom.normalColor||"#ececec"},animation:!1,eventEnabled:!1,text:{enabled:!1},average:{enabled:!1}},dataZoom:{enabled:!1},xAxis:{},yAxis:{}});var d=new l(b,a._data,c);return d.draw(),{thumbBar:d,cloneEl:b}},_initMarkLine:function(a){var b=this;require(["chartx/components/markline/index"],function(c){for(var d=0,e=b._yAxis.dataOrg.length;e>d;d++){var f=d,g=b.dataFrame.yAxis.center[d].agPosition,h=a.sprite.children[0]?a.sprite.children[0].children[d+1].context.fillStyle:"#000000",i=b.dataFrame.yAxis.field[d]+"均值";if(b.markLine.text&&b.markLine.text.enabled&&_.isFunction(b.markLine.text.format)){var j={iGroup:f,value:b.dataFrame.yAxis.center[f].agValue};i=b.markLine.text.format(j)}var j={w:b._xAxis.xGraphsWidth,h:b._yAxis.yGraphsHeight,origin:{x:b._back.pos.x,y:b._back.pos.y},field:_.isArray(b._yAxis.field[d])?b._yAxis.field[d][0]:b._yAxis.field[d],line:{y:g,list:[[0,0],[b._xAxis.xGraphsWidth,0]],strokeStyle:h},text:{content:i,fillStyle:h}};new c(_.deepExtend(j,b._opts.markLine)).done(function(){b.core.addChild(this.sprite)})}})},_initMarkPoint:function(a){var b=this,c={x:a.sprite.context.x,y:a.sprite.context.y};require(["chartx/components/markpoint/index"],function(d){_.each(a.data,function(a,e){a.length;_.each(a,function(a){_.each(a,function(a){var e=_.clone(a);e.x+=c.x,e.y+=c.y;var f={value:e.value,shapeType:"droplet",markTarget:e.field,iGroup:e.iNode,iNode:e.iGroup,iLay:e.iLay,point:{x:e.x,y:e.y}};new d(b._opts,f).done(function(){b.core.addChild(this.sprite);var a=this;this.shape.hover(function(a){this.context.hr++,this.context.cursor="pointer",a.stopPropagation()},function(a){this.context.hr--,a.stopPropagation()}),this.shape.on("mousemove",function(a){a.stopPropagation()}),this.shape.on("tap click",function(c){c.stopPropagation(),c.eventInfo=a,b.fire("markpointclick",c)})})})})})})},_removeChecked:function(){this._graphs.removeAllChecked()},_updateChecked:function(){var a=this;a._currCheckedList=a._getCurrCheckedList();for(var b=0,c=a._currCheckedList.length;c>b;b++){var d=a._currCheckedList[b];a._checkedBar({iGroup:d.iGroup-a.dataZoom.range.start,checked:!0})}},_getCurrCheckedList:function(){var a=this;return _.filter(a._checkedList,function(b){return b&&b.iGroup>=a.dataZoom.range.start&&b.iGroup<=a.dataZoom.range.end?b:void 0})},_checked:function(a){var b=this;if(b._graphs.checked.enabled){var c=a.iGroup+b.dataZoom.range.start,d=!0;b._checkedList[c]?(b._checkedList[c]=null,d=!1):b._checkedList[c]=a,b._checkedBar({iGroup:a.iGroup,checked:d}),b._checkedMiniBar({iGroup:c,checked:d}),a.iGroup=c}},_checkedBar:function(a){var b=this,c=b._graphs;c._checked(a)},_checkedMiniBar:function(a){var b=this,c=b.__cloneBar.thumbBar._graphs,d="";a.checked&&(d=b._opts.dataZoom.checked&&b._opts.dataZoom.checked.fillStyle||d),c.setBarStyle({iGroup:a.iGroup,fillStyle:d})},bindEvent:function(){var a=this;this._graphs.sprite.on("panstart mouseover",function(b){a._setXaxisYaxisToTipsInfo(b),a._tip.show(b),a.fire(b.type,b)}),this._graphs.sprite.on("panmove mousemove",function(b){a._setXaxisYaxisToTipsInfo(b),a._tip.move(b),a.fire(b.type,b)}),this._graphs.sprite.on("panend mouseout",function(b){a._tip.hide(b),a.fire(b.type,b)}),this._graphs.sprite.on("tap click mousedown mouseup",function(b){"click"==b.type&&(a.fire("checkedBefor"),a._checked(_.clone(b.eventInfo))),a._setXaxisYaxisToTipsInfo(b),a.fire(b.type,b)})}});return l});