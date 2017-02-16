define("chartx/chart/pie/pie",["canvax/index","canvax/shape/Sector","canvax/shape/Line","canvax/shape/BrokenLine","canvax/shape/Rect","chartx/utils/tools","canvax/animation/AnimationFrame","chartx/components/tips/tip","chartx/chart/theme"],function(Canvax,Sector,Line,BrokenLine,Rect,Tools,AnimationFrame,Tip,Theme){var Pie=function(a,b,c){this.data=null,this.sprite=null,this.branchSp=null,this.sectorsSp=null,this.checkedSp=null,this.branchTxt=null,this.dataLabel={enabled:!0,allowLine:!0,format:null},this.checked={enabled:!1,r:8,globalAlpha:.3},this.tips=_.deepExtend({enabled:!0},b),this.domContainer=c,this._tip=null,this.init(a),this.colorIndex=0,this.sectors=[],this.sectorMap=[],this.isMoving=!1,this.labelMaxCount=15,this.labelList=[],this.completed=!1};return Pie.prototype={init:function(a){_.deepExtend(this,a),this.sprite=new Canvax.Display.Sprite,this.sectorsSp=new Canvax.Display.Sprite,this.sprite.addChild(this.sectorsSp),this.checkedSp=new Canvax.Display.Sprite,this.sprite.addChild(this.checkedSp),this._tip=new Tip(this.tips,this.domContainer),this._tip._getDefaultContent=this._getTipDefaultContent,this.sprite.addChild(this._tip.sprite),this.dataLabel.enabled&&(this.branchSp=new Canvax.Display.Sprite),this._configData(),this._configColors(),this.clear()},clear:function(){this.domContainer.innerHTML=""},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},_configData:function(){var a=this;a.total=0,a.angleOffset=_.isNaN(a.startAngle)?-90:a.startAngle,a.angleOffset=a.angleOffset%360,a.currentAngle=0+a.angleOffset;var b=360+a.angleOffset,c=12*a.boundWidth/1e3;a.labelFontSize=12>c?12:c;var d=2,e=a.data.data;if(a.clickMoveDis=a.r/11,e.length&&e.length>0){for(var f=0;f<e.length;f++)a.total+=e[f].y;if(a.total>0){for(var g=0,h=0,i=0,j=0;j<e.length;j++){var k=e[j].y/a.total,l=+(100*k).toFixed(d),m=Math.abs(100*k-l);i+=l,j>0&&k>e[g].orginPercentage&&(g=j),j>0&&m>e[h].percentageOffset&&(h=j);var n=360*k,o=a.currentAngle+n>b?b:a.currentAngle+n,p=Math.cos((a.currentAngle+n/2)/180*Math.PI),q=Math.sin((a.currentAngle+n/2)/180*Math.PI),r=a.currentAngle+n/2;p=p.toFixed(5),q=q.toFixed(5);var s=function(a){a>=b&&(a=b),a%=360;var c=parseInt(a/90);if(a>=0)switch(c){case 0:return 1;case 1:return 2;case 2:return 3;case 3:case 4:return 4}else if(0>a)switch(c){case 0:return 4;case-1:return 3;case-2:return 2;case-3:case-4:return 1}}(r);_.extend(e[j],{start:a.currentAngle,end:o,midAngle:r,outOffsetx:a.clickMoveDis*p,outOffsety:a.clickMoveDis*q,centerx:(a.r-a.clickMoveDis)*p,centery:(a.r-a.clickMoveDis)*q,outx:(a.r+a.clickMoveDis)*p,outy:(a.r+a.clickMoveDis)*q,edgex:(a.r+2*a.clickMoveDis)*p,edgey:(a.r+2*a.clickMoveDis)*q,orginPercentage:k,percentage:l,percentageOffset:m,txt:l+"%",quadrant:s,labelDirection:1==s||4==s?1:0,index:j,isMax:!1,checked:!1}),a.currentAngle+=n,a.currentAngle>b&&(a.currentAngle=b)}e[g].isMax=!0}}},getList:function(){var a=this,b=[];return a.sectors&&a.sectors.length>0&&(b=a.sectors),b},getLabelList:function(){return this.labelList},getTopAndBottomIndex:function(){var a,b,c=self.data,d={},e=270,f=90,g=90,h=90;return c.length>0&&_.each(self.data,function(){1==c.quadrant||2==c.quadrant?(b=Math.abs(c.middleAngle-f),h>b&&(d.bottomIndex=c.index,h=b)):(3==c.quadrant||4==c.quadrant)&&(a=Math.abs(c.middleAngle-e),g>a&&(d.topIndex=c.index,g=a))}),d},getColorByIndex:function(a,b){return b>=a.length&&((this.data.data.length-1)%a.length==0&&b%a.length==0?b=b%a.length+1:b%=a.length),a[b]},_configColors:function(){this.colors=this.colors?this.colors:Theme.colors},draw:function(a){var b=this;b.setX(b.x),b.setY(b.y),b._widget(),a.animation&&b.grow(),a.complete&&a.complete.call(b)},focus:function(a,b){var c=this,d=c.sectorMap[a].sector,e=c.data.data[a];e._selected=!0,d.animate({x:e.outOffsetx,y:e.outOffsety},{duration:100,onComplete:function(){b&&b()}})},unfocus:function(a,b){var c=this,d=c.sectorMap[a].sector,e=c.data.data[a];e._selected=!1,d.animate({x:0,y:0},{duration:100,onComplete:function(){b&&b()}})},check:function(a){var b=this.sectorMap[a].sector,c=this.data.data[a];if(!c.checked){var d=this;c._selected?this.addCheckedSec(b):this.focus(a,function(){d.addCheckedSec(b)}),c.checked=!0}},uncheck:function(a){var b=this.sectorMap[a].sector,c=this.data.data[a];if(c.checked){var d=this;d.cancelCheckedSec(b,function(){d.unfocus(a)}),c.checked=!1}},uncheckAll:function(){var a=this;_.each(this.sectorMap,function(b,c){var d=(b.sector,a.data.data[c]);d.checked&&a.uncheck(c)})},grow:function(){var a=this;_.each(a.sectors,function(b,c){b.context&&(b.context.r0=0,b.context.r=0,b.context.startAngle=a.angleOffset,b.context.endAngle=a.angleOffset)}),a._hideGrowLabel(),AnimationFrame.registTween({from:{process:0,r:0,r0:0},to:{process:1,r:a.r,r0:a.r0},duration:500,onUpdate:function(){for(var b=0;b<a.sectors.length;b++){var c=a.sectors[b],d=c.context;if(d){if(d.r=this.r,d.r0=this.r0,d.globalAlpha=this.process,0==b)d.startAngle=c.startAngle,d.endAngle=c.startAngle+(c.endAngle-c.startAngle)*this.process;else{var e=function(b){var c=b-1,d=a.sectors[c].context;return 0==c?d?d.endAngle:0:d?d.endAngle:arguments.callee(c)}(b);d.startAngle=e,d.endAngle=d.startAngle+(c.endAngle-c.startAngle)*this.process}c.sector._checkedSec&&(c.sector._checkedSec.context.r0=d.r-1,c.sector._checkedSec.context.r=d.r+a.checked.r,c.sector._checkedSec.context.startAngle=d.startAngle,c.sector._checkedSec.context.endAngle=d.endAngle)}}},onComplete:function(){a._showGrowLabel(),a.completed=!0}})},_showGrowLabel:function(){this.branchSp&&(this.branchSp.context.globalAlpha=1,_.each(this.labelList,function(a){a.labelEle.style.visibility="visible"}))},_hideGrowLabel:function(){this.branchSp&&(this.branchSp.context.globalAlpha=0,_.each(this.labelList,function(a){a.labelEle.style.visibility="hidden"}))},_showTip:function(a,b){this._tip.show(this._geteventInfo(a,b))},_hideTip:function(a){this._tip.hide(a)},_moveTip:function(a,b){this._tip.move(this._geteventInfo(a,b))},_getTipDefaultContent:function(a){return"<div style='color:"+a.fillStyle+"'><div style='padding-bottom:3px;'>"+a.name+"："+a.value+"</div>"+parseInt(a.percentage)+"%</div>"},_geteventInfo:function(a,b){var c=this.data.data[b],d=this.getColorByIndex(this.colors,b);return a.eventInfo={iNode:b,name:c.name,percentage:c.percentage,value:c.y,fillStyle:d,data:this.data.data[b],checked:c.checked},a},_sectorFocus:function(a,b){this.sectorMap[b]&&this.focusCallback&&a&&this.focusCallback.focus(a,b)},_sectorUnfocus:function(a,b){this.focusCallback&&a&&this.focusCallback.unfocus(a,b)},_getByIndex:function(a){return this.sectorMap[a]},_widgetLabel:function(quadrant,indexs,lmin,rmin,isEnd,ySpaceInfo){var self=this,count=0,data=self.data.data,sectorMap=self.sectorMap,minTxtDis=15,labelOffsetX=5,outCircleRadius=self.r+2*self.clickMoveDis,currentIndex,baseY,clockwise,isleft,minPercent,currentY,adjustX,txtDis,bkLineStartPoint,bklineMidPoint,bklineEndPoint,brokenline,branchTxt,bwidth,bheight,bx,by,isMixed,yBound,remainingNum,remainingY,adjustY;for(clockwise=2==quadrant||4==quadrant,isleft=2==quadrant||3==quadrant,isup=3==quadrant||4==quadrant,minY=isleft?lmin:rmin,indexs.length>0&&indexs.sort(function(a,b){return isup?data[a].edgey-data[b].edgey:data[b].edgey-data[a].edgey}),i=0;i<indexs.length;i++)if(currentIndex=indexs[i],!(data[currentIndex].ignored||data[currentIndex].y<minY||count>=self.labelMaxCount)){count++,currentY=data[currentIndex].edgey,adjustX=Math.abs(data[currentIndex].edgex),txtDis=currentY-baseY,0!=i&&(Math.abs(txtDis)<minTxtDis||isup&&0>txtDis||!isup&&txtDis>0)&&(currentY=isup?baseY+minTxtDis:baseY-minTxtDis,outCircleRadius-Math.abs(currentY)>0&&(adjustX=Math.sqrt(Math.pow(outCircleRadius,2)-Math.pow(currentY,2))),(isleft&&-adjustX>data[currentIndex].edgex||!isleft&&adjustX<data[currentIndex].edgex)&&(adjustX=Math.abs(data[currentIndex].edgex))),isEnd&&(yBound=isleft?ySpaceInfo.left:ySpaceInfo.right,remainingNum=indexs.length-i,remainingY=isup?yBound-remainingNum*minTxtDis:yBound+remainingNum*minTxtDis,(isup&&currentY>remainingY||!isup&&remainingY>currentY)&&(currentY=remainingY)),bkLineStartPoint=[data[currentIndex].outx,data[currentIndex].outy],bklineMidPoint=[isleft?-adjustX:adjustX,currentY],bklineEndPoint=[isleft?-adjustX-labelOffsetX:adjustX+labelOffsetX,currentY],baseY=currentY,isEnd||(isleft?ySpaceInfo.left=baseY:ySpaceInfo.right=baseY),brokenline=new BrokenLine({context:{lineType:"solid",smooth:!1,pointList:[[data[currentIndex].centerx,data[currentIndex].centery],[data[currentIndex].outx,data[currentIndex].outy],bkLineStartPoint,bklineMidPoint,bklineEndPoint],lineWidth:1,strokeStyle:sectorMap[currentIndex].color}});var labelTxt="",formatReg=/\{.+?\}/g,point=data[currentIndex];switch(self.dataLabel.format&&(_.isFunction(self.dataLabel.format)?labelTxt=this.dataLabel.format(data[currentIndex]):(labelTxt=self.dataLabel.format.replace(formatReg,function(match,index){var matchStr=match.replace(/\{([\s\S]+?)\}/g,"$1"),vals=matchStr.split("."),obj=eval(vals[0]),pro=vals[1];return obj[pro]}),labelTxt&&(labelTxt="<span>"+labelTxt+"</span>"))),labelTxt||(labelTxt="<span>"+data[currentIndex].name+" : "+data[currentIndex].txt+"</span>"),branchTxt=document.createElement("div"),branchTxt.style.cssText=" ;position:absolute;left:-1000px;top:-1000px;color:"+sectorMap[currentIndex].color,branchTxt.innerHTML=labelTxt,self.domContainer.appendChild(branchTxt),bwidth=branchTxt.offsetWidth,bheight=branchTxt.offsetHeight,this.branchTxt=branchTxt,bx=isleft?-adjustX:adjustX,by=currentY,quadrant){case 1:bx+=labelOffsetX,by-=bheight/2;break;case 2:bx-=bwidth+labelOffsetX,by-=bheight/2;break;case 3:bx-=bwidth+labelOffsetX,by-=bheight/2;break;case 4:bx+=labelOffsetX,by-=bheight/2}branchTxt.style.left=bx+self.x+"px",branchTxt.style.top=by+self.y+"px",self.dataLabel.allowLine&&self.branchSp.addChild(brokenline),self.sectorMap[currentIndex].label={line:brokenline,label:branchTxt,visible:!0},self.labelList.push({width:bwidth,height:bheight,x:bx+self.x,y:by+self.y,data:data[currentIndex],labelTxt:labelTxt,labelEle:branchTxt})}},_showLabelAll:function(a){var b=this;_.each(this.sectorMap,function(a,c){b._showLabel(c)})},_hideLabelAll:function(a){var b=this;_.each(this.sectorMap,function(a,c){b._hideLabel(c)})},_hideLabel:function(a){if(this.sectorMap[a]){var b=this.sectorMap[a].label;b.line.context.visible=!1,b.label.style.display="none",b.visible=!1}},_showLabel:function(a){if(this.sectorMap[a]){var b=this.sectorMap[a].label;b.line.context.visible=!0,b.label.style.display="block",b.visible=!0}},_startWidgetLabel:function(){for(var a=this,b=a.data.data,c=0,d=0,e=0,f=0,g=[],h=[{indexs:[],count:0},{indexs:[],count:0},{indexs:[],count:0},{indexs:[],count:0}],i={right:{startQuadrant:4,endQuadrant:1,clockwise:!0,indexs:[]},left:{startQuadrant:3,endQuadrant:2,clockwise:!1,indexs:[]}},j=0;j<b.length;j++){var k=b[j].quadrant;h[k-1].indexs.push(j),h[k-1].count++}h[0].count>1&&h[0].indexs.reverse(),h[2].count>1&&h[2].indexs.reverse(),h[0].count>h[3].count&&(i.right.startQuadrant=1,i.right.endQuadrant=4,i.right.clockwise=!1),h[1].count>h[2].count&&(i.left.startQuadrant=2,i.left.endQuadrant=3,i.left.clockwise=!0),i.right.indexs=h[i.right.startQuadrant-1].indexs.concat(h[i.right.endQuadrant-1].indexs),i.left.indexs=h[i.left.startQuadrant-1].indexs.concat(h[i.left.endQuadrant-1].indexs);var l,m;i.right.indexs.length>a.labelMaxCount&&(m=i.right.indexs.slice(0),m.sort(function(a,c){return b[c].y-b[a].y}),l=m.slice(a.labelMaxCount),c=b[l[0]].percentage,e=b[l[0]].y),i.left.indexs.length>a.labelMaxCount&&(m=i.left.indexs.slice(0),m.sort(function(a,c){return b[c].y-b[a].y}),l=m.slice(a.labelMaxCount),d=b[l[0]].percentage,f=b[l[0]].y),g.push(i.right.startQuadrant),g.push(i.right.endQuadrant),g.push(i.left.startQuadrant),g.push(i.left.endQuadrant);var n={};for(j=0;j<g.length;j++){var o=1==j||3==j;a._widgetLabel(g[j],h[g[j]-1].indexs,f,e,o,n)}},_getAngleTime:function(a){return Math.abs(a.startAngle-a.endAngle)/360*500},addCheckedSec:function(a,b){var c=a.context,d=new Sector({context:{x:c.x,y:c.y,r0:c.r-1,r:c.r+this.checked.r,startAngle:c.startAngle,endAngle:c.startAngle,fillStyle:c.fillStyle,globalAlpha:this.checked.globalAlpha},id:"checked_"+a.id});a._checkedSec=d,this.checkedSp.addChild(d),this.completed?d.animate({endAngle:c.endAngle},{duration:this._getAngleTime(c),onComplete:function(){b&&b()}}):d.context.endAngle=c.endAngle},cancelCheckedSec:function(a,b){var c=a._checkedSec;c.animate({startAngle:c.context.endAngle-.3},{onComplete:function(){delete a._checkedSec,c.destroy(),b&&b()},duration:150})},_widget:function(){var a,b=this,c=b.data.data;if(c.length>0&&b.total>0){b.branchSp&&b.sprite.addChild(b.branchSp);for(var d=0;d<c.length;d++){b.colorIndex>=b.colors.length&&(b.colorIndex=0);var e=b.getColorByIndex(b.colors,d),f=new Sector({hoverClone:!1,context:{x:c[d].sliced?c[d].outOffsetx:0,y:c[d].sliced?c[d].outOffsety:0,r0:b.r0,r:b.r,startAngle:c[d].start,endAngle:c[d].end,fillStyle:e,index:c[d].index,cursor:"pointer"},id:"sector"+d});f.__data=c[d],f.__colorIndex=d,f.__dataIndex=d,f.__isSliced=c[d].sliced,b.event.enabled&&f.hover(function(a){b.tips.enabled&&b._showTip(a,this.__dataIndex);var c=b.data.data[this.__dataIndex];c.checked||(b._sectorFocus(a,this.__dataIndex),b.focus(this.__dataIndex))},function(a){b.tips.enabled&&b._hideTip(a),b._geteventInfo(a,this.__dataIndex);var c=b.data.data[this.__dataIndex];c.checked||(b._sectorUnfocus(a,this.__dataIndex),b.unfocus(this.__dataIndex))}),b.event.enabled&&f.on("mousedown mouseup click mousemove dblclick",function(a){b._geteventInfo(a,this.__dataIndex),"click"==a.type&&b.secClick(this,a),"mousemove"==a.type&&b.tips.enabled&&b._moveTip(a,this.__dataIndex)}),c[d].ignored||b.sectorsSp.addChildAt(f,0),a={name:c[d].name,value:c[d].y,sector:f,context:f.context,originx:f.context.x,originy:f.context.y,r:b.r,startAngle:f.context.startAngle,endAngle:f.context.endAngle,color:e,index:d,percentage:c[d].percentage,visible:!0},b.sectors.push(a)}if(b.sectors.length>0){b.sectorMap={};for(var d=0;d<b.sectors.length;d++)b.sectorMap[b.sectors[d].index]=b.sectors[d]}b.dataLabel.enabled&&b._startWidgetLabel()}},secClick:function(a,b){if(this.checked.enabled){var c=this.data.data[a.__dataIndex];a.clickIng||(a.clickIng=!0,c.checked?this.cancelCheckedSec(a,function(){a.clickIng=!1}):this.addCheckedSec(a,function(){a.clickIng=!1}),c.checked=!c.checked,b.eventInfo.checked=c.checked)}}},Pie}),define("chartx/chart/pie/index",["chartx/chart/index","chartx/chart/pie/pie","chartx/components/legend/index","chartx/utils/tools"],function(a,b,c,d){var e=a.Canvax;return a.extend({init:function(a,b,c){this.data=b,this.ignoreFields=[],this._opts=c,this.options=c,this.event={enabled:!0},this.xAxis={field:null},this.yAxis={field:null},_.deepExtend(this,c),this.dataFrame=this._initData(b,this),this._setLengend(),this.stageBg=new e.Display.Sprite({id:"bg"}),this.core=new e.Display.Sprite({id:"core"}),this.stageTip=new e.Display.Stage({id:"stageTip"}),this.canvax.addChild(this.stageTip),this.stageTip.toFront()},draw:function(){this._initModule(),this._startDraw(),this._drawEnd(),this.inited=!0},getByIndex:function(a){return this._pie._getByIndex(a)},getList:function(){var a,b=this,c=[];if(b._pie){var d=b._pie.getList();if(d.length>0)for(var e=0;e<d.length;e++){a=d[e];var f=b._pie.data.data[e];c.push({name:a.name,index:a.index,color:a.color,r:a.r,value:a.value,percentage:a.percentage,checked:f.checked})}}return c},getCheckedList:function(){var a=[];return _.each(this.getList(),function(b){b.checked&&a.push(b)}),a},focusAt:function(a){this._pie&&this._pie.focus(a)},unfocusAt:function(a){this._pie&&this._pie.unfocus(a)},checkAt:function(a){this._pie&&this._pie.check(a)},uncheckAt:function(a){this._pie&&this._pie.uncheck(a)},uncheckAll:function(){this._pie&&this._pie.uncheckAll()},checkOf:function(a){this.checkAt(this.getIndexOf(a))},uncheckOf:function(a){this.uncheckAt(this.getIndexOf(a))},getLabelList:function(){return this._pie.getLabelList()},showLabelAt:function(a){this._pie&&this._pie._showLabel(a)},hideLabelAt:function(a){this._pie&&this._pie._hideLabel(a)},showLabelOf:function(a){this.showLabelAt(this.getIndexOf(a))},hideLabelOf:function(a){this.hideLabelAt(this.getIndexOf(a))},showLabelAll:function(){var a=this;_.each(this.getLabelList(),function(b,c){a.showLabelAt(c)})},hideLabelAll:function(){var a=this;_.each(this.getLabelList(),function(b,c){a.hideLabelAt(c)})},getIndexOf:function(a){for(var b,c=this.getList(),d=0,e=c.length;e>d;d++)if(c[d].name==a){b=d;break}return b},_initData:function(a,b){if(!a||0==a.length)return h;a.length>0&&!_.isArray(a[0])&&(a=d.json2MatrixData(a));var c=[],a=_.clone(a);if(this.xAxis.field){var e=a.shift(),f=_.indexOf(e,this.xAxis.field),g=f+1;g>=e.length&&(g=0),this.yAxis.field&&(g=_.indexOf(e,this.yAxis.field)),_.each(a,function(a){var b=[];_.isArray(a)?(b.push(a[f]),b.push(a[g])):"object"==typeof a&&(b.push(a.name),b.push(a.y)),c.push(b)})}else c=a;var h={};if(h.org=c,h.data=[],_.isArray(c))for(var i=0;i<c.length;i++){var j={};_.isArray(c[i])?(j.name=c[i][0],j.y=parseFloat(c[i][1]),j.sliced=!1,j.selected=!1):"object"==typeof c[i]&&(j.name=c[i].name,j.y=parseFloat(c[i].y),j.sliced=c[i].sliced||!1,j.selected=c[i].selected||!1),j.name&&h.data.push(j)}if((c.length>0&&"asc"==b.sort||"desc"==b.sort)&&(h.org.sort(function(a,c){return"desc"==b.sort?a[1]-c[1]:"asc"==b.sort?c[1]-a[1]:void 0}),h.data.sort(function(a,c){return"desc"==b.sort?a.y-c.y:"asc"==b.sort?c.y-a.y:void 0})),h.data.length>0)for(i=0;i<h.data.length;i++)_.contains(this.ignoreFields,h.data[i].name)&&(h.data[i].ignored=!0,h.data[i].y=0);return h},clear:function(){this.stageBg.removeAllChildren(),this.core.removeAllChildren(),this.stageTip.removeAllChildren()},reset:function(a){a=a||{},this.clear(),this._pie.clear();var b=a.data||this.data;_.deepExtend(this,a.options),this.dataFrame=this._initData(b,this.options),this.draw()},_initModule:function(){var a=this,c=a.width,d=a.height;c-=this.padding.left+this.padding.right,d-=this.padding.top+this.padding.bottom;var e=2*Math.min(c,d)/3/2;a.dataLabel&&0==a.dataLabel.enabled&&(e=Math.min(c,d)/2,e-=e/11),e=parseInt(e),0>e&&(e=1);var f=parseInt(a.innerRadius||0),g=e-20;f=f>=0?f:0,f=g>=f?f:g,0>f&&(f=0);var h=c/2+this.padding.left,i=d/2+this.padding.top;a.pie={x:h,y:i,r0:f,r:e,boundWidth:c,boundHeight:d,data:a.dataFrame,animation:a.animation,event:a.event,startAngle:parseInt(a.startAngle),colors:a.colors,focusCallback:{focus:function(b,c){a.fire("focus",b)},unfocus:function(b,c){a.fire("unfocus",b)}},checked:a.checked?a.checked:{enabled:!1}},a.dataLabel&&(a.pie.dataLabel=a.dataLabel),a._pie=new b(a.pie,a.tips,a.canvax.getDomContainer()),a.event.enabled&&a._pie.sprite.on("mousedown mousemove mouseup click dblclick",function(b){a.fire(b.type,b)})},_startDraw:function(){this._pie.draw(this);var a=this;this._legend&&!this._legend.inited&&(_.each(this.getList(),function(b,c){var d=b.color;a._legend.setStyle(b.name,{fillStyle:d})}),this._legend.inited=!0)},_drawEnd:function(){this.core.addChild(this._pie.sprite),this._tip&&this.stageTip.addChild(this._tip.sprite),this.fire("complete",{data:this.getList()}),this.stage.addChild(this.core)},remove:function(a){var b=this,c=b.data;if(a&&c.length>1)for(var d=1;d<c.length;d++)c[d][0]!=a||_.contains(b.ignoreFields,a)||b.ignoreFields.push(a);b.reset()},add:function(a){var b=this,c=b.data;if(a&&c.length>1)for(var d=1;d<c.length;d++)c[d][0]==a&&_.contains(b.ignoreFields,a)&&b.ignoreFields.splice(_.indexOf(b.ignoreFields,a),1);b.reset()},_setLengend:function(){var a=this;if(!(!this.legend||this.legend&&"enabled"in this.legend&&!this.legend.enabled)){var b=_.deepExtend({legend:!0,label:function(a){return a.field},onChecked:function(b){a.add(b)},onUnChecked:function(b){a.remove(b)},layoutType:"v"},this._opts.legend);this._legend=new c(this._getLegendData(),b),this.stage.addChild(this._legend.sprite),this._legend.pos({x:this.width-this._legend.width,y:this.height/2-this._legend.h/2}),this.padding.right+=this._legend.width}},_getLegendData:function(){var a=[];return _.each(this.dataFrame.data,function(b,c){a.push({field:b.name,value:b.y,fillStyle:null})}),a}})});