define("chartx/chart/original/sector/yaxis",["chartx/components/yaxis/yAxis"],function(a){var b=function(a,c){b.superclass.constructor.apply(this,arguments)};return Chartx.extend(b,a,{updateLayout:function(a){var b=this;_.each(b.sprite.children,function(c,d){var e=a[d],f=e.y,g=c.children[0];if(g.context.y=f,b.line.enabled){var h=c.children[1];h.context.y=e.y}})},_initData:function(a){var b=this._setDataSection(a);this.dataOrg=a.org,this.dataSection=b}}),b});