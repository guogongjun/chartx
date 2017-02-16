define("chartx/utils/tools",[],function(){return{getMaxAtArr:function(a){return a.sort(function(a,b){return b-a}),a[0]},getArrMergerNumber:function(a,b,c){var d=0,e=b?b:0,f=c||0==c?c:a.length-1;if(e>f)return d;for(var g=0,h=a.length;h>g&&!(g>=e&&(d+=Number(a[g]),g==f));g++);return d},getDisMinATArr:function(a,b){for(var c=0,d=Math.abs(a-b[0]),e=1,f=b.length;f>e;e++)d>Math.abs(a-b[e])&&(d=Math.abs(a-b[e]),c=e);return c},getArrScalesAtArr:function(a,b,c){for(var d=[],e=0,f=a.length;f>e;e++){var g=a[e],h=g/b;d.push(this.numExact(h,c))}return d},getMaxChildArrLength:function(a){for(var b=0,c=a,d=0,e=c.length;e>d;d++)c[d]&&(b=Math.max(b,c[d].length));return b},getArrScales:function(a){for(var b=[],c=0,d=0,e=0,f=[],g=0,h=a.length;h>g;g++)a[g]=Number(a[g]),c+=a[g];for(var i=0,j=a.length;j>i;i++){var k=Math.round(a[i]/c*100);if(f.push(k),i==a.length-1){for(var l=0,m=0,n=f.length-1;n>m;m++)l+=f[m];l=100-l,l=0>l?0:l,k=l}b.push(k)}c=0;for(var o=0,p=b.length;p>o;o++)b[o]=isNaN(b[o])||b[o]<0?0:b[o],d<b[o]&&(d=b[o],e=o),c+=b[o];return c>100?b[e]=b[e]-(c-100):100>c&&(b[e]=b[e]+(100-c)),b},numExact:function(a,b){var c=isNaN(b)?2:b,d=Math.pow(10,c);return Math.round(a*d)/d},numAddSymbol:function(a,b){var c=Number(a),d=b?b:",";if(!c)return String(a);if(c>=1e3){var e=parseInt(c/1e3);return String(a.toString().replace(e,e+d))}return String(a)},getPath:function(a){var b="M",c="L",d="";d=_.isArray(a[0])?b+a[0][0]+" "+a[0][1]:b+a[0].x+" "+a[0].y;for(var e=1,f=a.length;f>e;e++){var g=0,h=0,i=a[e];_.isArray(i)?(g=i[0],h=i[1]):(g=i.x,h=i.y),d+=" "+c+g+" "+h}return d},json2MatrixData:function(a){if(a.length>0&&!_.isArray(a[0])){for(var b=[],c=[],d=0,e=0,f=a.length;f>e;e++){var g=a[e];if(0==e){for(var h in g)c.push(h);b.push(c),d=c.length}for(var i=[],j=0;d>j;j++)i.push(g[c[j]]);b.push(i)}return b}return a}}});