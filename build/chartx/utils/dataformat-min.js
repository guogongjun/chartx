define("chartx/utils/dataformat",[],function(){return function(a,b){function c(a){for(var b={},c=d.data,e=0,f=c.length;f>e;e++)c[e]&&(b[c[e].field]=c[e].data[a]);return b}var d={org:[],data:[],yAxis:{field:null,org:[]},xAxis:{field:[],org:[]},zAxis:{field:[],org:[]},getRowData:c};if(!a||0==a.length)return d;var e=a;d.org=e;var f=e[0]?e[0]:[];b?(b.yAxis&&(d.yAxis.field=b.yAxis.field),b.xAxis&&(d.xAxis.field=b.xAxis.field),b.zAxis&&(d.zAxis.field=b.zAxis.field)):(this.yAxis&&(d.yAxis.field=this.yAxis.field),this.xAxis&&(d.xAxis.field=this.xAxis.field),this.zAxis&&(d.zAxis.field=this.zAxis.field));for(var g=[],h=0,i=f.length;i>h;h++){var j={};j.field=f[h],j.index=h,j.data=[],g.push(j)}d.data=g;var k=function(a,b,c){for(var d=b,e=[],f=0,g=a.length;g>f;f++)if(_.isArray(a[f]))e.push(k(a[f],b,c));else for(var h=0,i=d.length;i>h;h++)if(a[f]==d[h].field){e.push(d[h].data);break}return e},l=d.xAxis.field;l&&""!=l&&(!_.isArray(l)||0!=l.length&&_.find(g,function(a){return _.indexOf(l,a.field)>=0?!0:!1}))?_.isString(l)&&(l=[l]):l=d.xAxis.field=[g[0].field];var m=d.yAxis.field;""==m||_.isArray(m)&&0==m.length?m=[]:m?_.isString(m)&&(m=[m]):m=_.difference(f,l),d.yAxis.field=m;for(var n=_.flatten(d.yAxis.field),h=1,i=e.length;i>h;h++)for(var o=0,p=e[h].length;p>o;o++){var q=e[h][o];q&&_.indexOf(n,e[0][o])>=0&&(q=isNaN(Number(q))?q:Number(q)),g[o].data.push(q)}d.xAxis.org=k(l,g),d.yAxis.org=k(m,g,"yAxis");var r=d.zAxis.field;_.isString(r)&&(r=[r]),d.zAxis.field=r;var s=_.flatten(d.zAxis.field);return s.length>0&&(d.zAxis.org=k(r,g)),d}});