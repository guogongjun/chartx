define("chartx/layout/cloud/index",[],function(){function a(a){function b(a){var b=(a+="").indexOf("."),c=a;if(b>=0?a=a.slice(0,b):c+=".",a&&!g.hasOwnProperty(a))throw new Error("unknown type: "+a);return{type:a,name:c}}function c(a){return function(){for(var b,c,d=g[a],e=-1,f=d.length;++e<f;)(c=(b=d[e]).value)&&c.apply(this,arguments);return i}}var d,e=-1,f=a.length,g={},h={},i=this;for(i.on=function(a,c){if(a=b(a),arguments.length<2)return(c=h[a.name])&&c.value;if(a.type){var d,e=g[a.type],f=h[a.name];f&&(f.value=null,d=e.indexOf(f),g[a.type]=e=e.slice(0,d).concat(e.slice(d+1)),delete h[a.name]),c&&(c={value:c},h[a.name]=c,e.push(c))}else if(null==c)for(var j in g)if(c=h[j+a.name]){c.value=null;var e=g[j],d=e.indexOf(c);g[j]=e.slice(0,d).concat(e.slice(d+1)),delete h[c.name]}return i};++e<f;){if(d=a[e]+"",!d||d in i)throw new Error("illegal or duplicate type: "+d);g[d]=[],i[d]=c(d)}}function b(){return new a(arguments)}function c(){function a(a){a.width=a.height=1;var b=Math.sqrt(a.getContext("2d").getImageData(0,0,1,1).data.length>>2);a.width=(t<<5)/b,a.height=u/b;var c=a.getContext("2d");return c.fillStyle=c.strokeStyle="red",c.textAlign="center",{context:c,ratio:b}}function c(a,b,c){for(var d,e,f,g=([{x:0,y:0},{x:o[0],y:o[1]}],b.x),h=b.y,i=Math.sqrt(o[0]*o[0]+o[1]*o[1]),j=C(o),l=H()<.5?1:-1,n=-l;(d=j(n+=l))&&(e=~~d[0],f=~~d[1],!(Math.min(Math.abs(e),Math.abs(f))>=i));)if(b.x=g+e,b.y=h+f,!(b.x+b.x0<0||b.y+b.y0<0||b.x+b.x1>o[0]||b.y+b.y1>o[1]||c&&k(b,a,o[0])||c&&!m(b,c))){for(var p,q=b.sprite,r=b.width>>5,s=o[0]>>5,t=b.x-(r<<4),u=127&t,v=32-u,w=b.y1-b.y0,x=(b.y+b.y0)*s+(t>>5),y=0;w>y;y++){p=0;for(var z=0;r>=z;z++)a[x+z]|=p<<v|(r>z?(p=q[y*r+z])>>>u:0);x+=s}return delete b.sprite,!0}return!1}var o=[256,256],s=d,w=e,x=g,y=f,z=f,A=h,B=i,C=n,D=[],E=1/0,F=b("word","end"),G=null,H=Math.random,I={},J=q;return I.canvas=function(a){return arguments.length?(J=r(a),I):J},I.start=function(){function b(){for(var a=Date.now();Date.now()-a<E&&++h<g&&G;){var b=k[h];b.x=o[0]*(H()+.5)>>1,b.y=o[1]*(H()+.5)>>1,j(d,b,k,h),b.hasText&&c(e,b,f)&&(i.push(b),F.word(b),f?l(f,b):f=[{x:b.x+b.x0,y:b.y+b.y0},{x:b.x+b.x1,y:b.y+b.y1}],b.x-=o[0]>>1,b.y-=o[1]>>1)}h>=g&&(I.stop(),F.end(i,f))}var d=a(J()),e=p((o[0]>>5)*o[1]),f=null,g=D.length,h=-1,i=[],k=D.map(function(a,b){return a.text=s.call(this,a,b),a.font=w.call(this,a,b),a.style=y.call(this,a,b),a.weight=z.call(this,a,b),a.rotate=A.call(this,a,b),a.size=~~x.call(this,a,b),a.padding=B.call(this,a,b),a}).sort(function(a,b){return b.size-a.size});return G&&clearInterval(G),G=setInterval(b,0),b(),I},I.stop=function(){return G&&(clearInterval(G),G=null),I},I.timeInterval=function(a){return arguments.length?(E=null==a?1/0:a,I):E},I.words=function(a){return arguments.length?(D=a,I):D},I.size=function(a){return arguments.length?(o=[+a[0],+a[1]],I):o},I.font=function(a){return arguments.length?(w=r(a),I):w},I.fontStyle=function(a){return arguments.length?(y=r(a),I):y},I.fontWeight=function(a){return arguments.length?(z=r(a),I):z},I.rotate=function(a){return arguments.length?(A=r(a),I):A},I.text=function(a){return arguments.length?(s=r(a),I):s},I.spiral=function(a){return arguments.length?(C=v[a]||a,I):C},I.fontSize=function(a){return arguments.length?(x=r(a),I):x},I.padding=function(a){return arguments.length?(B=r(a),I):B},I.random=function(a){return arguments.length?(H=a,I):H},I.on=function(){var a=F.on.apply(F,arguments);return a===F?I:a},I}function d(a){return a.text}function e(){return"serif"}function f(){return"normal"}function g(a){return Math.sqrt(a.value)}function h(){return 30*(~~(6*Math.random())-3)}function i(){return 1}function j(a,b,c,d){if(!b.sprite){var e=a.context,f=a.ratio;e.clearRect(0,0,(t<<5)/f,u/f);var g=0,h=0,i=0,j=c.length;for(--d;++d<j;){b=c[d],e.save(),e.font=b.style+" "+b.weight+" "+~~((b.size+1)/f)+"px "+b.font;var k=e.measureText(b.text+"m").width*f,l=b.size<<1;if(b.rotate){var m=Math.sin(b.rotate*s),n=Math.cos(b.rotate*s),o=k*n,p=k*m,q=l*n,r=l*m;k=Math.max(Math.abs(o+r),Math.abs(o-r))+31>>5<<5,l=~~Math.max(Math.abs(p+q),Math.abs(p-q))}else k=k+31>>5<<5;if(l>i&&(i=l),g+k>=t<<5&&(g=0,h+=i,i=0),h+l>=u)break;e.translate((g+(k>>1))/f,(h+(l>>1))/f),b.rotate&&e.rotate(b.rotate*s),e.fillText(b.text,0,0),b.padding&&(e.lineWidth=2*b.padding,e.strokeText(b.text,0,0)),e.restore(),b.width=k,b.height=l,b.xoff=g,b.yoff=h,b.x1=k>>1,b.y1=l>>1,b.x0=-b.x1,b.y0=-b.y1,b.hasText=!0,g+=k}for(var v=e.getImageData(0,0,(t<<5)/f,u/f).data,w=[];--d>=0;)if(b=c[d],b.hasText){for(var k=b.width,x=k>>5,l=b.y1-b.y0,y=0;l*x>y;y++)w[y]=0;if(g=b.xoff,null==g)return;h=b.yoff;for(var z=0,A=-1,B=0;l>B;B++){for(var y=0;k>y;y++){var C=x*B+(y>>5),D=v[(h+B)*(t<<5)+(g+y)<<2]?1<<31-y%32:0;w[C]|=D,z|=D}z?A=B:(b.y0++,l--,B--,h++)}b.y1=b.y0+A,b.sprite=w.slice(0,(b.y1-b.y0)*x)}}}function k(a,b,c){c>>=5;for(var d,e=a.sprite,f=a.width>>5,g=a.x-(f<<4),h=127&g,i=32-h,j=a.y1-a.y0,k=(a.y+a.y0)*c+(g>>5),l=0;j>l;l++){d=0;for(var m=0;f>=m;m++)if((d<<i|(f>m?(d=e[l*f+m])>>>h:0))&b[k+m])return!0;k+=c}return!1}function l(a,b){var c=a[0],d=a[1];b.x+b.x0<c.x&&(c.x=b.x+b.x0),b.y+b.y0<c.y&&(c.y=b.y+b.y0),b.x+b.x1>d.x&&(d.x=b.x+b.x1),b.y+b.y1>d.y&&(d.y=b.y+b.y1)}function m(a,b){return a.x+a.x1>b[0].x&&a.x+a.x0<b[1].x&&a.y+a.y1>b[0].y&&a.y+a.y0<b[1].y}function n(a){var b=a[0]/a[1];return function(a){return[b*(a*=.1)*Math.cos(a),a*Math.sin(a)]}}function o(a){var b=4,c=b*a[0]/a[1],d=0,e=0;return function(a){var f=0>a?-1:1;switch(Math.sqrt(1+4*f*a)-f&3){case 0:d+=c;break;case 1:e+=b;break;case 2:d-=c;break;default:e-=b}return[d,e]}}function p(a){for(var b=[],c=-1;++c<a;)b[c]=0;return b}function q(){return document.createElement("canvas")}function r(a){return"function"==typeof a?a:function(){return a}}b.prototype=a.prototype;var s=Math.PI/180,t=64,u=2048,v={archimedean:n,rectangular:o};return c});