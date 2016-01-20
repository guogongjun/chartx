define("chartx/chart/map/index",["canvax/index","chartx/chart/index","canvax/shape/Path","canvax/shape/Polygon","chartx/chart/map/map-data/params","chartx/chart/map/map-data/geo-coord","chartx/chart/map/map-data/text-fixed","chartx/utils/projection/normal","chartx/components/tips/tip","chartx/utils/dataformat","chartx/components/markpoint/index","chartx/chart/theme","chartx/utils/colorformat"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){return b.extend({init:function(b,c,d){this._opts=d,this.mapName="china",this._mapDataMap={},this._nameMap={},this.checkedList={},this.tips={},this.area={strokeStyle:null,fillStyle:null,hoverStrokeStyle:null,normalFillStyle:"#fff",normalStrokeStyle:"#ccc",lineWidth:1,linkage:!1,text:{fillStyle:"#999",enabled:!1}},this.geoCoordSupply={},this.areaField="area",this.valueField="value",this.tips={},this.checked={enabled:!1},_.deepExtend(this,d),this.maxValue=1,this._initData(c),this.valueField=this.dataFrame.yAxis.field,this._mapScale=1,this.sprite=new a.Display.Sprite({id:"mapSp"}),this.spriteTip=new a.Display.Sprite({id:"tip"})},_initData:function(a){this.dataFrame=j(a,{xAxis:{field:[this.areaField]},yAxis:{field:this.valueField}});var b=this;return _.each(this.dataFrame.data,function(a){a.field==b.valueField&&(b.maxValue=_.max(a.data))}),this.dataFrame},draw:function(){this.sprite.removeAllChildren(),this.stage.addChild(this.sprite),this.stage.addChild(this.spriteTip),this._tips&&this._tips.hide(),this._initModule();var a=this;this._getMapData(this.mapName,function(b){a._widget(b),"markPoint"in a._opts&&a._initMarkPoint(),a._setSpPos(),this.inited=!0})},_setSpPos:function(){var a=this._mapDataMap[this.mapName].transform,b=this.sprite.context;b.width=a.width,b.height=a.height,b.x=(this.width-a.width)/2,b.y=(this.height-a.height)/2,b=this.spriteTip.context,b.width=a.width,b.height=a.height,b.x=(this.width-a.width)/2,b.y=(this.height-a.height)/2},_getMapData:function(a,b){this._mapDataMap[a]=this._mapDataMap[a]||{},e.params[a].getGeoJson(this._mapDataCallback(a,b))},_mapDataCallback:function(a,b){var c=this;return function(d){c._mapDataMap[a].mapData=d,c._mapDataMap[a].rate=.75,c._mapDataMap[a].projection=h;var e=c._getProjectionData(a,d);_.isFunction(b)&&b(e)}},_nameChange:function(a,b){return this._nameMap[a]&&this._nameMap[a][b]||b},_getProjectionData:function(a,b){var c,d=this._mapDataMap[a].projection,h=[],i=this._mapDataMap[a].bbox||d.getBbox(b),j=this._getTransform(i,this._mapDataMap[a].rate),k=this._mapDataMap[a].lastTransform||{scale:{}};j.left!=k.left||j.top!=k.top||j.scale.x!=k.scale.x||j.scale.y!=k.scale.y?(c=d.geoJson2Path(b,j),k=_.clone(j)):(j=this._mapDataMap[a].transform,c=this._mapDataMap[a].pathArray),this._mapDataMap[a].bbox=i,this._mapDataMap[a].transform=j,this._mapDataMap[a].lastTransform=k,this._mapDataMap[a].pathArray=c;for(var l=[j.left,j.top],m=0,n=c.length;n>m;m++)h.push(this._getSingleProvince(a,c[m],l));if("china"==a){var o=this.geo2pos(a,f["南海诸岛"]||e.params["南海诸岛"].textCoord),p=j.scale.x/10.5,q=[32*p+o[0],83*p+o[1]];g["南海诸岛"]&&(q[0]+=g["南海诸岛"][0],q[1]+=g["南海诸岛"][1]),h.push({name:this._nameChange(a,"南海诸岛"),path:e.params["南海诸岛"].getPath(o,p),position:l,textX:q[0],textY:q[1]})}return h},parsePercent:function(a,b){return"string"==typeof a?_trim(a).match(/%$/)?parseFloat(a)/100*b:parseFloat(a):a},geo2pos:function(a,b){return this._mapDataMap[a].transform?this._mapDataMap[a].projection.geo2pos(this._mapDataMap[a].transform,b):null},_getSingleProvince:function(a,b,c){var d,e=b.properties.name,h=g[e]||[0,0];if(f[e])d=this.geo2pos(a,f[e]);else if(b.cp)d=[b.cp[0]+h[0],b.cp[1]+h[1]];else{var i=this._mapDataMap[a].bbox;d=this.geo2pos(a,[i.left+i.width/2,i.top+i.height/2]),d[0]+=h[0],d[1]+=h[1]}return b.name=e,b.position=c,b.textX=d[0],b.textY=d[1],b},_getTransform:function(a,b){var c,d,e=this.width,f=this.height;c=c?this.parsePercent(c,e):e,d=d?this.parsePercent(d,f):f;var g=a.width,h=a.height,i=c/b/g,j=d/h;return i>j?(i=j*b,c=g*i):(j=i,i=j*b,d=h*j),{left:0,top:0,width:c,height:d,baseScale:1,scale:{x:i,y:j}}},_createDataObj:function(a,b){var c={};return _.each(b,function(b,d){c[b]=a[d]}),c},_getDataForArea:function(a){var b={area:a},c=this;return _.each(this.dataFrame.xAxis.org[0],function(d,e){(d.indexOf(a.name)>=0||a.name.indexOf(d)>=0)&&(b.data=c._createDataObj(c.dataFrame.org[e+1],c.dataFrame.org[0]),b.dataIndex=e)}),b},_getColor:function(a,b,c){var d=a;if(_.isFunction(a)&&(d=a.apply(this,[b,this.dataFrame])),!d||""==d){var e=b.data;if(e&&e.color)d=e.color;else if("fillStyle"==c){var f=e?e[this.valueField]:0;d=f?m.colorRgba(l.brandColor,parseFloat((.85*f/this.maxValue).toFixed(2))):null}}return d},getList:function(){return this.mapDataList},getCheckedList:function(){var a=[];for(var b in this.checkedList)a.push(this.checkedList[b]);return a},_widget:function(b){var d=this,f=b;f.length;this.mapDataList=f,_.each(f,function(a){var b=d._getDataForArea(a);b.data&&(a.data=b.data)}),this.fire("begindraw");var g;d.area.text.enabled&&(g=new a.Display.Sprite({id:"area_name"}));var h=new a.Display.Sprite({id:"areas"});_.each(f,function(b,f){b.ind=f;var i=d._getDataForArea(b),j=d._getColor(d.area.fillStyle,i,"fillStyle")||d.area.normalFillStyle,k=d._getColor(d.area.strokeStyle,i,"strokeStyle")||d.area.normalStrokeStyle,n={x:0,y:0,scaleX:d._mapScale,scaleY:d._mapScale,path:b.path,lineWidth:d.area.lineWidth,fillStyle:j,strokeStyle:k,cursor:"pointer"},o=new c({id:"area_"+b.id,hoverClone:!1,pointChkPriority:!1,context:n});if(h.addChild(o),o.mapData=b,o._strokeStyle=k,o._fillStyle=j,o._hoverFillStyle=j,o.on("mouseover",function(a){if(!a.fromTarget||"text"!=a.fromTarget.type||a.fromTarget.text!=this.mapData.name){if(!this.mapData.checked){this.toFront();var b=d.area.hoverStrokeStyle||l.brandColor;this.context.strokeStyle=b,this.context.fillStyle=this._hoverFillStyle}d.fire("areaover",a),d._tips.show(d._setTipsInfoHand(a,this.mapData))}}),o.on("mousemove",function(a){d._tips.move(d._setTipsInfoHand(a,this.mapData)),d.fire("mousemove",a)}),o.on("mouseout",function(a){a.toTarget&&"text"==a.toTarget.type&&a.toTarget.text==this.mapData.name||(this.mapData.checked||(this.context.strokeStyle=this._strokeStyle,this.context.fillStyle=this._fillStyle,this.toBack()),d.fire("areaout",a),d._tips.hide(a))}),o.on("dblclick",function(a){d.area.linkage&&("台湾"==d.mapName||this.mapData.name==d.mapName?d.mapName="china":d.mapName=e.params[this.mapData.name]?this.mapData.name:"china"),a.area=this.mapData,a.areaData=d._getDataForArea(this.mapData),a.eventInfo=d._getDataForArea(this.mapData),d.fire("areadblclick",a),d.fire("dblclick",a)}),o.on("mousedown",function(a){d.fire("mousedown",a)}),o.on("click",function(a){var b=this,c=a.currentTarget.mapData;d.checked.enabled&&(d.checkedList[c.id]?(c.checked=!1,delete d.checkedList[c.id],b._fillStyle==d.area.normalFillStyle&&(b.context.fillStyle=d.area.normalFillStyle)):(d.checkedList[c.id]=c,c.checked=!0,b.context.fillStyle==d.area.normalFillStyle&&(b.context.fillStyle=m.colorRgba(b.context.strokeStyle,.05)))),a.eventInfo={mapData:c},d.fire("click",a)}),o.on("mouseup",function(a){d._tips.move(d._setTipsInfoHand(a,this.mapData)),d.fire("mouseup",a)}),d.area.text.enabled){var p=new a.Display.Text(_.isFunction(d.area.text.filter)?d.area.text.filter(b.name):b.name,{context:{cursor:"pointer",x:b.textX,y:b.textY,fillStyle:d.area.text.fillStyle,textBaseline:"middle",textAlign:"center"}});p.area=o,p.on("mouseover",function(a){return a.fromTarget&&a.fromTarget==this.area?void this.area.toFront():void this.area.fire("mouseover",a)}),p.on("mousemove",function(a){this.area.fire("mousemove",a)}),p.on("mouseout",function(a){a.toTarget&&a.toTarget==this.area||this.area.fire("mouseout",a)}),p.on("click",function(a){this.area.fire("mousedown",a)}),g.addChild(p)}}),_.each(f,function(a,b){if(a.checked){var c=h.getChildById("area_"+a.id);c.toFront(),c.context.strokeStyle=d.area.hoverStrokeStyle||l.brandColor,c.context.fillStyle==d.area.normalFillStyle&&(c.context.fillStyle=m.colorRgba(c.context.strokeStyle,.05))}}),d.sprite.addChild(h),g&&d.sprite.addChild(g)},checkAt:function(a){var b=this,c=_.find(this.mapDataList,function(b){return b.ind==a}),d=b.sprite.getChildById("areas").getChildById("area_"+c.id);if(!b.checkedList[c.id]){b.checkedList[c.id]=c,c.checked=!0;var e=b.area.hoverStrokeStyle||l.brandColor;d.context.strokeStyle=e,d.context.fillStyle==b.area.normalFillStyle&&(d.context.fillStyle=m.colorRgba(d.context.strokeStyle,.05)),d.toFront()}},uncheckAt:function(a){var b=this,c=_.find(this.mapDataList,function(b){return b.ind==a}),d=b.sprite.getChildById("areas").getChildById("area_"+c.id);b.checkedList[c.id]&&(c.checked=!1,delete b.checkedList[c.id],d.context.strokeStyle=d._strokeStyle,d.context.fillStyle=d._fillStyle,d.toBack())},uncheckAll:function(){var a=this;for(var b in a.checkedList)this.uncheckAt(a.checkedList[b].ind);a.checkedList={}},checkOf:function(a){this.checkAt(this._getAreaIndexOfName(a))},uncheckOf:function(a){this.uncheckAt(this._getAreaIndexOfName(a))},_getAreaIndexOfName:function(a){for(var b,c=0,d=this.mapDataList.length;d>c;c++){var e=this.mapDataList[c];if(e.name.indexOf(a)>=0||a.indexOf(e.name)>=0){b=c;break}}return b},_initMarkPoint:function(){var a=this;require(["chartx/chart/map/map-data/geo-json/china_city"],function(b){_.each(a.dataFrame.xAxis.org[0],function(c,d){if(c in a.geoCoordSupply)a._setMarkToPoint(c,a.geo2pos(a.mapName,a.geoCoordSupply[c]));else for(var e in b)if(c in b[e]){var f=a.geo2pos(a.mapName,b[e][c]);a._setMarkToPoint(c,f);break}})})},_setMarkToPoint:function(a,b){var c=this,d={name:a},e={point:{x:b[0],y:b[1]}},f=c._getDataForArea(d);c._opts.markPoint&&c._opts.markPoint.r&&_.isFunction(c._opts.markPoint.r)&&(c._opts.markPoint.r=c._opts.markPoint.r(f)),new k(c._opts,e,f).done(function(){var a=this.shape;a.mapData=d,a.on("mouseover",function(a){c._tips.show(c._setTipsInfoHand(a,this.mapData)),this.context.lineWidth+=2}),a.on("mousemove",function(a){c._tips.move(c._setTipsInfoHand(a,this.mapData))}),a.on("mouseout",function(a){c._tips.hide(),this.context.lineWidth-=2}),a.on("click",function(a){a.areaData=c._getDataForArea(this.mapData),c.fire("markpointclick",a)}),c.sprite.addChild(this.sprite)})},_initModule:function(){this._tips=new i(this.tips,this.canvax.getDomContainer()),this._tips._getDefaultContent=function(a){var b="<table>",c=this;return b+="<tr><td colspan='2'>"+a.area.value+"</td></tr>",_.each(a.nodesInfoList,function(a,d){b+="<tr >";var e=c.prefix[d];e||(e=a.field),b+="<td>"+e+"：</td>",b+="<td>"+a.value+"</td></tr>"}),b+="</table>"},this.spriteTip.addChild(this._tips.sprite)},_setTipsInfoHand:function(a,b){var c={checked:!!this.checkedList[b.id],area:{field:this.areaField,value:b.name},nodesInfoList:[]},d=this._getDataForArea(b);return d.data&&_.each(this.valueField,function(a,b){var e=d.data[a];void 0!==e&&null!==e&&c.nodesInfoList.push({field:a,value:d.data[a]})}),a.tipsInfo=c,a}})});