define("chartx/components/tips/tip",["canvax/index","canvax/shape/Rect","chartx/utils/tools"],function(a,b,c){var d=function(a,b){this.enabled=!0,this.tipDomContainer=b,this.cW=0,this.cH=0,this.dW=0,this.dH=0,this.backR="5px",this.sprite=null,this.content=null,this.fillStyle="rgba(255,255,255,0.95)",this.text={fillStyle:"#999"},this.strokeStyle="#ccc",this.lineWidth=1,this._tipDom=null,this.offset=10,this.tipsInfo={},this.prefix=[],this.positionInRange=!1,this.init(a)};return d.prototype={init:function(b){_.deepExtend(this,b),this.sprite=new a.Display.Sprite({id:"TipSprite"});var c=this;this.sprite.on("destroy",function(){c._tipDom=null})},show:function(a){if(this.enabled){this.hide();var b=a.target.getStage();this.cW=b.context.width,this.cH=b.context.height,this._initContent(a),this.setPosition(a),this.sprite.toFront()}},move:function(a){this.enabled&&(this._setContent(a),this.setPosition(a))},hide:function(){},setPosition:function(a){if(this._tipDom){var b=a.pos||a.target.localToGlobal(a.point),c=this._checkX(b.x+this.offset),d=this._checkY(b.y+this.offset);this._tipDom.style.cssText+=";visibility:visible;left:"+c+"px;top:"+d+"px;-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"}},_initContent:function(a){this._tipDom=document.createElement("div"),this._tipDom.className="chart-tips",this._tipDom.style.cssText+="；-moz-border-radius:"+this.backR+"; -webkit-border-radius:"+this.backR+"; border-radius:"+this.backR+";background:"+this.fillStyle+";border:1px solid "+this.strokeStyle+";visibility:hidden;position:absolute;display:inline-block;*display:inline;*zoom:1;padding:6px;color:"+this.text.fillStyle+";line-height:1.5",this._tipDom.style.cssText+="; -moz-box-shadow:1px 1px 3px "+this.strokeStyle+"; -webkit-box-shadow:1px 1px 3px "+this.strokeStyle+"; box-shadow:1px 1px 3px "+this.strokeStyle+";",this.tipDomContainer.appendChild(this._tipDom),this._setContent(a)},_removeContent:function(){this._tipDom&&(this.tipDomContainer.removeChild(this._tipDom),this._tipDom=null)},_setContent:function(a){if(this._tipDom){var b=this._getContent(a);if("_hide_"===b)return void this.hide();this._tipDom.innerHTML=b,this.dW=this._tipDom.offsetWidth,this.dH=this._tipDom.offsetHeight}},_getContent:function(a){_.extend(this.tipsInfo,a.tipsInfo||a.eventInfo||{});var b=_.isFunction(this.content)?this.content(this.tipsInfo):this.content;return b||0==b||(b=this._getDefaultContent(this.tipsInfo)),b},_getDefaultContent:function(a){var b="<table border='0' cellpadding='0' cellspacing='0'>",d=this;return _.each(a.nodesInfoList,function(a,e){b+="<tr style='color:"+(a.color||a.fillStyle||a.strokeStyle)+"'>";var f=d.prefix[e];f?b+="<td>"+f+"：</td>":a.field&&(b+="<td>"+a.field+"：</td>"),b+="<td>"+c.numAddSymbol(a.value)+"</td></tr>"}),b+="</table>"},_checkX:function(a){if(this.positionInRange){var b=this.dW+2;0>a&&(a=0),a+b>this.cW&&(a=this.cW-b)}return a},_checkY:function(a){if(this.positionInRange){var b=this.dH+2;0>a&&(a=0),a+b>this.cH&&(a=this.cH-b)}return a}},d});