define("chartx/chart/pie/3d/pie",["canvax/index","canvax/shape/Sector","canvax/shape/Line","canvax/shape/BrokenLine","canvax/shape/Rect","canvax/shape/Path","chartx/utils/tools","canvax/animation/AnimationFrame","chartx/components/tips/tip","chartx/chart/theme","chartx/utils/colorformat"],function(Canvax,Sector,Line,BrokenLine,Rect,Path,Tools,AnimationFrame,Tip,Theme,ColorFormat){function curveTo(a,b,c,d,e,f,g,h){var i=[];if(f>e&&f-e>PI/2+1e-4)i=i.concat(curveTo(a,b,c,d,e,e+PI/2,g,h)),i=i.concat(curveTo(a,b,c,d,e+PI/2,f,g,h));else if(e>f&&e-f>PI/2+1e-4)i=i.concat(curveTo(a,b,c,d,e,e-PI/2,g,h)),i=i.concat(curveTo(a,b,c,d,e-PI/2,f,g,h));else{var j=f-e;i=["C",a+c*cos(e)-c*dFactor*j*sin(e)+g,b+d*sin(e)+d*dFactor*j*cos(e)+h,a+c*cos(f)+c*dFactor*j*sin(f)+g,b+d*sin(f)-d*dFactor*j*cos(f)+h,a+c*cos(f)+g,b+d*sin(f)+h]}return i}var PI=Math.PI,deg2rad=PI/180,sin=Math.sin,cos=Math.cos,round=Math.round,dFactor=4*(Math.sqrt(2)-1)/3/(PI/2),_attrs=["side1","side2","inn","out","top"],Pie=function(a,b,c){this.data=null,this.sprite=null,this.branchSp=null,this.sectorsSp=null,this.checkedSp=null,this.branchTxt=null,this.dataLabel={enabled:!0,allowLine:!0,format:null},this.checked={enabled:!1},this.tips=_.deepExtend({enabled:!0},b),this.domContainer=c,this._tip=null,this.init(a),this.colorIndex=0,this.sectors=[],this.sectorMap=[],this.isMoving=!1,this.labelMaxCount=15,this.labelList=[]};return Pie.prototype={init:function(a){_.deepExtend(this,a),this.sprite=new Canvax.Display.Sprite,this.sectorsSp=new Canvax.Display.Sprite,this.sprite.addChild(this.sectorsSp),this.checkedSp=new Canvax.Display.Sprite,this.sprite.addChild(this.checkedSp),this._tip=new Tip(this.tips,this.domContainer),this._tip._getDefaultContent=this._getTipDefaultContent,this.sprite.addChild(this._tip.sprite),this.dataLabel.enabled&&(this.branchSp=new Canvax.Display.Sprite),this._configData(),this._configColors()},clear:function(){this.domContainer.innerHTML=""},setX:function(a){this.sprite.context.x=a},setY:function(a){this.sprite.context.y=a},_configData:function(){var a=this;a.total=0,a.angleOffset=_.isNaN(a.startAngle)?0:a.startAngle,a.angleOffset=a.angleOffset%360,a.currentAngle=0+a.angleOffset;var b=360+a.angleOffset,c=12*a.boundWidth/1e3;a.labelFontSize=12>c?12:c;var d=2,e=a.data.data;if(a.clickMoveDis=a.r/6,e.length&&e.length>0){for(var f=0;f<e.length;f++)a.total+=e[f].y;if(a.total>0){for(var g=0,h=0,i=0,j=0;j<e.length;j++){var k=e[j].y/a.total,l=+(100*k).toFixed(d),m=Math.abs(100*k-l);i+=l,j>0&&k>e[g].orginPercentage&&(g=j),j>0&&m>e[h].percentageOffset&&(h=j);var n=360*k,o=a.currentAngle+n>b?b:a.currentAngle+n,p=Math.cos((a.currentAngle+n/2)/180*Math.PI),q=Math.sin((a.currentAngle+n/2)/180*Math.PI),r=a.currentAngle+n/2;p=p.toFixed(5),q=q.toFixed(5);var s=function(a){a>=b&&(a=b),a%=360;var c=parseInt(a/90);if(a>=0)switch(c){case 0:return 1;case 1:return 2;case 2:return 3;case 3:case 4:return 4}else if(0>a)switch(c){case 0:return 4;case-1:return 3;case-2:return 2;case-3:case-4:return 1}}(r);_.extend(e[j],{start:a.currentAngle,end:o,midAngle:r,outOffsetx:a.clickMoveDis*p,outOffsety:a.clickMoveDis*q,centerx:(a.r-a.clickMoveDis)*p*Math.sin(Math.PI/4),centery:(a.r-a.clickMoveDis)*q*Math.cos(Math.PI/4),outx:(a.r+a.clickMoveDis)*p,outy:(a.r+a.clickMoveDis)*q,edgex:(a.r+2*a.clickMoveDis)*p,edgey:(a.r+2*a.clickMoveDis)*q,orginPercentage:k,percentage:l,percentageOffset:m,txt:l+"%",quadrant:s,labelDirection:1==s||4==s?1:0,index:j,isMax:!1,checked:!1}),a.currentAngle+=n,a.currentAngle>b&&(a.currentAngle=b)}e[g].isMax=!0}}},getList:function(){var a=this,b=[];return a.sectors&&a.sectors.length>0&&(b=a.sectors),b},getLabelList:function(){return this.labelList},getTopAndBottomIndex:function(){var a,b,c=self.data,d={},e=270,f=90,g=90,h=90;return c.length>0&&_.each(self.data,function(){1==c.quadrant||2==c.quadrant?(b=Math.abs(c.middleAngle-f),h>b&&(d.bottomIndex=c.index,h=b)):(3==c.quadrant||4==c.quadrant)&&(a=Math.abs(c.middleAngle-e),g>a&&(d.topIndex=c.index,g=a))}),d},getColorByIndex:function(a,b){return b>=a.length&&((this.data.data.length-1)%a.length==0&&b%a.length==0?b=b%a.length+1:b%=a.length),a[b]},_configColors:function(){this.colors=this.colors?this.colors:Theme.colors},draw:function(a){var b=this;b.setX(b.x),b.setY(b.y),b._widget(),a.animation&&b.grow(),a.complete&&a.complete.call(b)},focus:function(a,b){var c=this,d=c.sectorMap[a].sector,e=c.sprite.getChildById("sector_sp_top").getChildById("sp_top_clone_"+a),f=c.sprite.getChildById("sector_sp_out").getChildById("sp_out_clone_"+a),g=c.sprite.getChildById("sector_sp_inn").getChildById("sp_inn_clone_"+a),h=c.sprite.getChildById("sector_sp_side1").getChildById("sp_side1_clone_"+a),i=c.sprite.getChildById("sector_sp_side2").getChildById("sp_side2_clone_"+a),j=c.data.data[a];j._selected=!0,d.animate({x:j.outOffsetx,y:j.outOffsety},{duration:100,onUpdate:function(a){e.context.x=a.x,e.context.y=a.y,f.context.x=a.x,f.context.y=a.y,g.context.x=a.x,g.context.y=a.y,h.context.x=a.x,h.context.y=a.y,i.context.x=a.x,i.context.y=a.y},onComplete:function(){b&&b()}})},unfocus:function(a,b){var c=this,d=c.sectorMap[a].sector,e=c.sprite.getChildById("sector_sp_top").getChildById("sp_top_clone_"+a),f=c.sprite.getChildById("sector_sp_out").getChildById("sp_out_clone_"+a),g=c.sprite.getChildById("sector_sp_inn").getChildById("sp_inn_clone_"+a),h=c.sprite.getChildById("sector_sp_side1").getChildById("sp_side1_clone_"+a),i=c.sprite.getChildById("sector_sp_side2").getChildById("sp_side2_clone_"+a),j=c.data.data[a];j._selected=!1,d.animate({x:0,y:0},{duration:100,onUpdate:function(a){e.context.x=a.x,e.context.y=a.y,f.context.x=a.x,f.context.y=a.y,g.context.x=a.x,g.context.y=a.y,h.context.x=a.x,h.context.y=a.y,i.context.x=a.x,i.context.y=a.y},onComplete:function(){b&&b()}})},check:function(a){var b=this.sectorMap[a].sector,c=this.data.data[a];if(!c.checked){var d=this;c._selected?this.addCheckedSec(b):this.focus(a,function(){d.addCheckedSec(b)}),c.checked=!0}},uncheck:function(a){var b=this.sectorMap[a].sector,c=this.data.data[a];if(c.checked){var d=this;d.cancelCheckedSec(b,function(){d.unfocus(a)}),c.checked=!1}},uncheckAll:function(){var a=this;_.each(this.sectorMap,function(b,c){var d=b.sector,e=a.data.data[c];e.checked&&(a.cancelCheckedSec(d),e.checked=!1)})},grow:function(){var a=this,b=null;_.each(a.sectors,function(c,d){c.startAngleForAnimation=a.angleOffset,c.endAngleForAnimation=a.angleOffset,_.each(c.sector&&c.sector.children,function(a){(b=a.context)&&(b.path="M 0,0")})}),a._hideDataLabel(),AnimationFrame.registTween({from:{process:0,r:0,r0:0},to:{process:1,r:a.r,r0:a.r0},duration:500,onUpdate:function(){for(var c=0;c<a.sectors.length;c++){var d=a.sectors[c];if(0==c)d.startAngleForAnimation=d.startAngle,d.endAngleForAnimation=d.startAngle+(d.endAngle-d.startAngle)*this.process;else{var e=function(b){var c=b-1,d=a.sectors[c];return 0==c?d?d.endAngleForAnimation:0:d?d.endAngleForAnimation:arguments.callee(c)}(c);d.startAngleForAnimation=e,d.endAngleForAnimation=d.startAngleForAnimation+(d.endAngle-d.startAngle)*this.process}var f=a.setPaths({alpha:45*deg2rad,beta:0,depth:26.25,end:deg2rad*(d.startAngleForAnimation+360)-1e-5,innerR:this.r0,r:this.r,start:deg2rad*(d.endAngleForAnimation+360)+1e-5,x:0,y:0});_.each(d.sector&&d.sector.children,function(a){if(b=a.context){b.globalAlpha=this.process;var c=a.id.split("_")[1];b.path=f[c]}})}},onComplete:function(){_.each(_attrs,function(b){a["sectorsSp3d_"+b].context.globalAlpha=1}),a.sprite.removeChildById(a.sectorsSp.id),delete a.spriteSp,a._showDataLabel()}})},_showDataLabel:function(){this.branchSp&&(this.branchSp.context.globalAlpha=1,_.each(this.labelList,function(a){a.labelEle.style.display="block"}))},_hideDataLabel:function(){this.branchSp&&(this.branchSp.context.globalAlpha=0,_.each(this.labelList,function(a){a.labelEle.style.display="none"}))},_showTip:function(a,b){this._tip.show(this._geteventInfo(a,b))},_hideTip:function(a){this._tip.hide(a)},_moveTip:function(a,b){this._tip.move(this._geteventInfo(a,b))},_getTipDefaultContent:function(a){return"<div style='color:"+a.fillStyle+"'><div style='padding-bottom:3px;'>"+a.name+"："+a.value+"</div>"+parseInt(a.percentage)+"%</div>"},_geteventInfo:function(a,b){var c=this.data.data[b],d=this.getColorByIndex(this.colors,b);return a.eventInfo={iNode:b,name:c.name,percentage:c.percentage,value:c.y,fillStyle:d,data:this.data.data[b],checked:c.checked},a},_sectorFocus:function(a,b){this.sectorMap[b]&&this.focusCallback&&a&&this.focusCallback.focus(a,b)},_sectorUnfocus:function(a,b){this.focusCallback&&a&&this.focusCallback.unfocus(a,b)},_getByIndex:function(a){return this.sectorMap[a]},_widgetLabel:function(quadrant,indexs,lmin,rmin,isEnd,ySpaceInfo){var self=this,count=0,data=self.data.data,sectorMap=self.sectorMap,minTxtDis=15,labelOffsetX=5,outCircleRadius=self.r+2*self.clickMoveDis,currentIndex,baseY,clockwise,isleft,minPercent,currentY,adjustX,txtDis,bkLineStartPoint,bklineMidPoint,bklineEndPoint,branchLine,brokenline,branchTxt,bwidth,bheight,bx,by,isMixed,yBound,remainingNum,remainingY,adjustY;for(clockwise=2==quadrant||4==quadrant,isleft=2==quadrant||3==quadrant,isup=3==quadrant||4==quadrant,minY=isleft?lmin:rmin,indexs.length>0&&indexs.sort(function(a,b){return isup?data[a].edgey-data[b].edgey:data[b].edgey-data[a].edgey}),i=0;i<indexs.length;i++)if(currentIndex=indexs[i],!(data[currentIndex].ignored||data[currentIndex].y<minY||count>=self.labelMaxCount)){count++,currentY=data[currentIndex].edgey,adjustX=Math.abs(data[currentIndex].edgex),txtDis=currentY-baseY,0!=i&&(Math.abs(txtDis)<minTxtDis||isup&&0>txtDis||!isup&&txtDis>0)&&(currentY=isup?baseY+minTxtDis:baseY-minTxtDis,outCircleRadius-Math.abs(currentY)>0&&(adjustX=Math.sqrt(Math.pow(outCircleRadius,2)-Math.pow(currentY,2))),(isleft&&-adjustX>data[currentIndex].edgex||!isleft&&adjustX<data[currentIndex].edgex)&&(adjustX=Math.abs(data[currentIndex].edgex))),isEnd&&(yBound=isleft?ySpaceInfo.left:ySpaceInfo.right,remainingNum=indexs.length-i,remainingY=isup?yBound-remainingNum*minTxtDis:yBound+remainingNum*minTxtDis,(isup&&currentY>remainingY||!isup&&remainingY>currentY)&&(currentY=remainingY)),bkLineStartPoint=[data[currentIndex].outx,data[currentIndex].outy],bklineMidPoint=[isleft?-adjustX:adjustX,currentY],bklineEndPoint=[isleft?-adjustX-labelOffsetX:adjustX+labelOffsetX,currentY],baseY=currentY,isEnd||(isleft?ySpaceInfo.left=baseY:ySpaceInfo.right=baseY),branchLine=new Line({context:{xStart:data[currentIndex].centerx,yStart:data[currentIndex].centery,xEnd:data[currentIndex].outx,yEnd:data[currentIndex].outy,lineWidth:1,strokeStyle:sectorMap[currentIndex].color,lineType:"solid"}}),brokenline=new BrokenLine({context:{lineType:"solid",smooth:!1,pointList:[bkLineStartPoint,bklineMidPoint,bklineEndPoint],lineWidth:1,strokeStyle:sectorMap[currentIndex].color}});var labelTxt="",formatReg=/\{.+?\}/g,point=data[currentIndex];switch(self.dataLabel.format&&(_.isFunction(self.dataLabel.format)?labelTxt=this.dataLabel.format(data[currentIndex]):(labelTxt=self.dataLabel.format.replace(formatReg,function(match,index){var matchStr=match.replace(/\{([\s\S]+?)\}/g,"$1"),vals=matchStr.split("."),obj=eval(vals[0]),pro=vals[1];return obj[pro]}),labelTxt&&(labelTxt="<span>"+labelTxt+"</span>"))),labelTxt||(labelTxt="<span>"+data[currentIndex].name+" : "+data[currentIndex].txt+"</span>"),branchTxt=document.createElement("div"),branchTxt.style.cssText=" ;position:absolute;left:-1000px;top:-1000px;color:"+sectorMap[currentIndex].color,branchTxt.innerHTML=labelTxt,self.domContainer.appendChild(branchTxt),bwidth=branchTxt.offsetWidth,bheight=branchTxt.offsetHeight,this.branchTxt=branchTxt,bx=isleft?-adjustX:adjustX,by=currentY,quadrant){case 1:bx+=labelOffsetX,by-=bheight/2;break;case 2:bx-=bwidth+labelOffsetX,by-=bheight/2;break;case 3:bx-=bwidth+labelOffsetX,by-=bheight/2;break;case 4:bx+=labelOffsetX,by-=bheight/2}branchTxt.style.left=bx+self.x+"px",branchTxt.style.top=by+self.y+"px",self.dataLabel.allowLine&&(self.branchSp.addChild(branchLine),self.branchSp.addChild(brokenline)),self.sectorMap[currentIndex].label={line1:branchLine,line2:brokenline,label:branchTxt},self.labelList.push({width:bwidth,height:bheight,x:bx+self.x,y:by+self.y,data:data[currentIndex],labelTxt:labelTxt,labelEle:branchTxt})}},_hideLabel:function(a){if(this.sectorMap[a]){var b=this.sectorMap[a].label;b.line1.context.visible=!1,b.line2.context.visible=!1,b.label.style.display="none"}},_showLabel:function(a){if(this.sectorMap[a]){var b=this.sectorMap[a].label;b.line1.context.visible=!0,b.line2.context.visible=!0,b.label.style.display="block"}},_startWidgetLabel:function(){for(var a=this,b=a.data.data,c=0,d=0,e=0,f=0,g=[],h=[{indexs:[],count:0},{indexs:[],count:0},{indexs:[],count:0},{indexs:[],count:0}],i={right:{startQuadrant:4,endQuadrant:1,clockwise:!0,indexs:[]},left:{startQuadrant:3,endQuadrant:2,clockwise:!1,indexs:[]}},j=0;j<b.length;j++){var k=b[j].quadrant;h[k-1].indexs.push(j),h[k-1].count++}h[0].count>1&&h[0].indexs.reverse(),h[2].count>1&&h[2].indexs.reverse(),h[0].count>h[3].count&&(i.right.startQuadrant=1,i.right.endQuadrant=4,i.right.clockwise=!1),h[1].count>h[2].count&&(i.left.startQuadrant=2,i.left.endQuadrant=3,i.left.clockwise=!0),i.right.indexs=h[i.right.startQuadrant-1].indexs.concat(h[i.right.endQuadrant-1].indexs),i.left.indexs=h[i.left.startQuadrant-1].indexs.concat(h[i.left.endQuadrant-1].indexs);var l,m;i.right.indexs.length>a.labelMaxCount&&(m=i.right.indexs.slice(0),m.sort(function(a,c){return b[c].y-b[a].y}),l=m.slice(a.labelMaxCount),c=b[l[0]].percentage,e=b[l[0]].y),i.left.indexs.length>a.labelMaxCount&&(m=i.left.indexs.slice(0),m.sort(function(a,c){return b[c].y-b[a].y}),l=m.slice(a.labelMaxCount),d=b[l[0]].percentage,f=b[l[0]].y),g.push(i.right.startQuadrant),g.push(i.right.endQuadrant),g.push(i.left.startQuadrant),g.push(i.left.endQuadrant);var n={};for(j=0;j<g.length;j++){var o=1==j||3==j;a._widgetLabel(g[j],h[g[j]-1].indexs,f,e,o,n)}},_getAngleTime:function(a){return Math.abs(a.startAngle-a.endAngle)/360*500},addCheckedSec:function(a,b){var c=a.context,d=new Sector({context:{x:c.x,y:c.y,r0:c.r,r:c.r+8,startAngle:c.startAngle,endAngle:c.startAngle+.5,fillStyle:c.fillStyle},id:"checked_"+a.id});this.checkedSp.addChild(d),d.animate({endAngle:c.endAngle},{duration:this._getAngleTime(c),onComplete:function(){b&&b()}})},cancelCheckedSec:function(a,b){var c=this.checkedSp.getChildById("checked_"+a.id);c.animate({startAngle:c.context.endAngle-.3},{onComplete:function(){c.destroy(),b&&b()},duration:150})},_widget:function(){var a,b=this,c=b.data.data;if(_.each(_attrs,function(a){b["sectorsSp3d_"+a]=b.sectorsSp.getChildById("sector_sp_"+a)||new Canvax.Display.Sprite({id:"sector_sp_"+a})}),c.length>0&&b.total>0){b.branchSp&&b.sprite.addChild(b.branchSp);for(var d=0;d<c.length;d++){b.colorIndex>=b.colors.length&&(b.colorIndex=0);var e=b.getColorByIndex(b.colors,d),f=ColorFormat.colorBrightness(e,-.2),g=b.sectorsSp.getChildById("sector_sp_"+d)||new Canvax.Display.Sprite({id:"sector_sp_"+d,context:{x:c[d].sliced?c[d].outOffsetx:0,y:c[d].sliced?c[d].outOffsety:0}}),h=b.setPaths({alpha:45*deg2rad,beta:0,depth:26.25,end:deg2rad*(c[d].end+360)-1e-4,innerR:b.r0,r:b.r,start:deg2rad*(c[d].start+360)+1e-4,x:0,y:0});_.each(_attrs,function(a){var i=new Path({id:"path_"+a+"_"+c[d].index,context:{x:c[d].sliced?c[d].outOffsetx:0,y:c[d].sliced?c[d].outOffsety:0,path:h[a],fillStyle:"top"===a?e:f,index:c[d].index,cursor:"pointer"}});g.addChild(i);var j=i.clone();j.id="sp_"+a+"_clone_"+c[d].index,b["sectorsSp3d_"+a].addChild(j),"top"===a&&(j.__data=c[d],j.__colorIndex=d,j.__dataIndex=d,j.__isSliced=c[d].sliced,j.hover(function(a){b.tips.enabled&&b._showTip(a,this.__dataIndex);var c=b.data.data[this.__dataIndex];c.checked||(b._sectorFocus(a,this.__dataIndex),b.focus(this.__dataIndex))},function(a){b.tips.enabled&&b._hideTip(a);var c=b.data.data[this.__dataIndex];c.checked||(b._sectorUnfocus(a,this.__dataIndex),b.unfocus(this.__dataIndex))}),j.on("mousedown mouseup click mousemove dblclick",function(a){b._geteventInfo(a,this.__dataIndex),"click"==a.type&&b.secClick(this,a),"mousemove"==a.type&&b.tips.enabled&&b._moveTip(a,this.__dataIndex)}))}),c[d].ignored?_.each(_attrs,function(a){b["sectorsSp3d_"+a].removeChildById("sp_"+a+"_clone_"+c[d].index)}):b.sectorsSp.addChild(g),a={name:c[d].name,value:c[d].y,sector:g,r:b.r,startAngle:c[d].start,endAngle:c[d].end,color:e,index:d,percentage:c[d].percentage,visible:!0},b.sectors.push(a)}if(b.sectors.length>0){b.sectorMap={};for(var d=0;d<b.sectors.length;d++)b.sectorMap[b.sectors[d].index]=b.sectors[d]}b.dataLabel.enabled&&b._startWidgetLabel(),_attrs=["side1","side2","inn","out","top"],_.each(_attrs,function(a){b.sprite.addChild(b["sectorsSp3d_"+a])}),b.animation&&_.each(_attrs,function(a){b["sectorsSp3d_"+a].context.globalAlpha=0})}},secClick:function(a,b){if(this.checked.enabled){var c=this.data.data[a.__dataIndex];c.checked?this.cancelCheckedSec(a,function(){a.clickIng=!1}):this.addCheckedSec(a,function(){a.clickIng=!1}),c.checked=!c.checked,b.eventInfo.checked=c.checked}},arc3dPath:function(a){function b(a){return a%=2*PI,a>PI&&(a=2*PI-a),a}var c=a.x,d=a.y,e=a.start,f=a.end-1e-5,g=a.r,h=a.innerR,i=a.depth,j=a.alpha,k=a.beta,l=cos(e),m=sin(e),n=cos(f),o=sin(f),p=g*cos(k),q=g*cos(j),r=h*cos(k),s=h*cos(j),t=i*sin(k),u=i*sin(j),v=["M",c+p*l,d+q*m];v=v.concat(curveTo(c,d,p,q,e,f,0,0)),v=v.concat(["L",c+r*n,d+s*o]),v=v.concat(curveTo(c,d,r,s,f,e,0,0)),v=v.concat(["Z"]);var w=k>0?PI/2:0,x=j>0?0:PI/2,y=e>-w?e:f>-w?-w:e,z=PI-x>f?f:PI-x>e?PI-x:f,A=2*PI-x,B=["M",c+p*cos(y),d+q*sin(y)];B=B.concat(curveTo(c,d,p,q,y,z,0,0)),f>A&&A>e?(B=B.concat(["L",c+p*cos(z)+t,d+q*sin(z)+u]),B=B.concat(curveTo(c,d,p,q,z,A,t,u)),B=B.concat(["L",c+p*cos(A),d+q*sin(A)]),B=B.concat(curveTo(c,d,p,q,A,f,0,0)),B=B.concat(["L",c+p*cos(f)+t,d+q*sin(f)+u]),B=B.concat(curveTo(c,d,p,q,f,A,t,u)),B=B.concat(["L",c+p*cos(A),d+q*sin(A)]),B=B.concat(curveTo(c,d,p,q,A,z,0,0))):f>PI-x&&PI-x>e&&(B=B.concat(["L",c+p*cos(z)+t,d+q*sin(z)+u]),B=B.concat(curveTo(c,d,p,q,z,f,t,u)),B=B.concat(["L",c+p*cos(f),d+q*sin(f)]),B=B.concat(curveTo(c,d,p,q,f,z,0,0))),B=B.concat(["L",c+p*cos(z)+t,d+q*sin(z)+u]),B=B.concat(curveTo(c,d,p,q,z,y,t,u)),B=B.concat(["Z"]);var C=["M",c+r*l,d+s*m];C=C.concat(curveTo(c,d,r,s,e,f,0,0)),C=C.concat(["L",c+r*cos(f)+t,d+s*sin(f)+u]),C=C.concat(curveTo(c,d,r,s,f,e,t,u)),C=C.concat(["Z"]);var D=["M",c+p*l,d+q*m,"L",c+p*l+t,d+q*m+u,"L",c+r*l+t,d+s*m+u,"L",c+r*l,d+s*m,"Z"],E=["M",c+p*n,d+q*o,"L",c+p*n+t,d+q*o+u,"L",c+r*n+t,d+s*o+u,"L",c+r*n,d+s*o,"Z"],F=Math.atan2(u,-t),G=Math.abs(f+F),H=Math.abs(e+F),I=Math.abs((e+f)/2+F);G=b(G),H=b(H),I=b(I);var J=1e5,K=I*J,L=H*J,M=G*J;return{top:v,zTop:PI*J+1,out:B,zOut:Math.max(K,L,M),inn:C,zInn:Math.max(K,L,M),side1:D,zSide1:.99*M,side2:E,zSide2:.99*L}},arrayToPath:function(a){var b=a.join(",").replace(/([0-9a-zA-Z.]+)(\,)([0-9a-zA-Z.]+)/gi,function(a,b,c,d){return/[a-zA-Z]/.test(b)&&/[0-9.]+/.test(d)||/[0-9.]+/.test(b)&&/[a-zA-Z]/.test(d)?b+d:a});return b},setPaths:function(a){var b=this,c=b.arc3dPath(a),d={};return _.extend(d,c),_.each(_attrs,function(a){d[a]=b.arrayToPath(c[a])}),d}},Pie});