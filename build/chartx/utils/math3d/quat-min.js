define("chartx/utils/math3d/quat",["chartx/utils/math3d/common","chartx/utils/math3d/mat3","chartx/utils/math3d/vec3","chartx/utils/math3d/vec4"],function(a,b,c,d){var e={};return e.create=function(){var b=new a.ARRAY_TYPE(4);return b[0]=0,b[1]=0,b[2]=0,b[3]=1,b},e.rotationTo=function(){var a=c.create(),b=c.fromValues(1,0,0),d=c.fromValues(0,1,0);return function(f,g,h){var i=c.dot(g,h);return i<-.999999?(c.cross(a,b,g),c.length(a)<1e-6&&c.cross(a,d,g),c.normalize(a,a),e.setAxisAngle(f,a,Math.PI),f):i>.999999?(f[0]=0,f[1]=0,f[2]=0,f[3]=1,f):(c.cross(a,g,h),f[0]=a[0],f[1]=a[1],f[2]=a[2],f[3]=1+i,e.normalize(f,f))}}(),e.setAxes=function(){var a=b.create();return function(b,c,d,f){return a[0]=d[0],a[3]=d[1],a[6]=d[2],a[1]=f[0],a[4]=f[1],a[7]=f[2],a[2]=-c[0],a[5]=-c[1],a[8]=-c[2],e.normalize(b,e.fromMat3(b,a))}}(),e.clone=d.clone,e.fromValues=d.fromValues,e.copy=d.copy,e.set=d.set,e.identity=function(a){return a[0]=0,a[1]=0,a[2]=0,a[3]=1,a},e.setAxisAngle=function(a,b,c){c=.5*c;var d=Math.sin(c);return a[0]=d*b[0],a[1]=d*b[1],a[2]=d*b[2],a[3]=Math.cos(c),a},e.getAxisAngle=function(a,b){var c=2*Math.acos(b[3]),d=Math.sin(c/2);return 0!=d?(a[0]=b[0]/d,a[1]=b[1]/d,a[2]=b[2]/d):(a[0]=1,a[1]=0,a[2]=0),c},e.add=d.add,e.multiply=function(a,b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=c[0],i=c[1],j=c[2],k=c[3];return a[0]=d*k+g*h+e*j-f*i,a[1]=e*k+g*i+f*h-d*j,a[2]=f*k+g*j+d*i-e*h,a[3]=g*k-d*h-e*i-f*j,a},e.mul=e.multiply,e.scale=d.scale,e.rotateX=function(a,b,c){c*=.5;var d=b[0],e=b[1],f=b[2],g=b[3],h=Math.sin(c),i=Math.cos(c);return a[0]=d*i+g*h,a[1]=e*i+f*h,a[2]=f*i-e*h,a[3]=g*i-d*h,a},e.rotateY=function(a,b,c){c*=.5;var d=b[0],e=b[1],f=b[2],g=b[3],h=Math.sin(c),i=Math.cos(c);return a[0]=d*i-f*h,a[1]=e*i+g*h,a[2]=f*i+d*h,a[3]=g*i-e*h,a},e.rotateZ=function(a,b,c){c*=.5;var d=b[0],e=b[1],f=b[2],g=b[3],h=Math.sin(c),i=Math.cos(c);return a[0]=d*i+e*h,a[1]=e*i-d*h,a[2]=f*i+g*h,a[3]=g*i-f*h,a},e.calculateW=function(a,b){var c=b[0],d=b[1],e=b[2];return a[0]=c,a[1]=d,a[2]=e,a[3]=Math.sqrt(Math.abs(1-c*c-d*d-e*e)),a},e.dot=d.dot,e.lerp=d.lerp,e.slerp=function(a,b,c,d){var e,f,g,h,i,j=b[0],k=b[1],l=b[2],m=b[3],n=c[0],o=c[1],p=c[2],q=c[3];return f=j*n+k*o+l*p+m*q,f<0&&(f=-f,n=-n,o=-o,p=-p,q=-q),1-f>1e-6?(e=Math.acos(f),g=Math.sin(e),h=Math.sin((1-d)*e)/g,i=Math.sin(d*e)/g):(h=1-d,i=d),a[0]=h*j+i*n,a[1]=h*k+i*o,a[2]=h*l+i*p,a[3]=h*m+i*q,a},e.sqlerp=function(){var a=e.create(),b=e.create();return function(c,d,f,g,h,i){return e.slerp(a,d,h,i),e.slerp(b,f,g,i),e.slerp(c,a,b,2*i*(1-i)),c}}(),e.invert=function(a,b){var c=b[0],d=b[1],e=b[2],f=b[3],g=c*c+d*d+e*e+f*f,h=g?1/g:0;return a[0]=-c*h,a[1]=-d*h,a[2]=-e*h,a[3]=f*h,a},e.conjugate=function(a,b){return a[0]=-b[0],a[1]=-b[1],a[2]=-b[2],a[3]=b[3],a},e.length=d.length,e.len=e.length,e.squaredLength=d.squaredLength,e.sqrLen=e.squaredLength,e.normalize=d.normalize,e.fromMat3=function(a,b){var c,d=b[0]+b[4]+b[8];if(d>0)c=Math.sqrt(d+1),a[3]=.5*c,c=.5/c,a[0]=(b[5]-b[7])*c,a[1]=(b[6]-b[2])*c,a[2]=(b[1]-b[3])*c;else{var e=0;b[4]>b[0]&&(e=1),b[8]>b[3*e+e]&&(e=2);var f=(e+1)%3,g=(e+2)%3;c=Math.sqrt(b[3*e+e]-b[3*f+f]-b[3*g+g]+1),a[e]=.5*c,c=.5/c,a[3]=(b[3*f+g]-b[3*g+f])*c,a[f]=(b[3*f+e]+b[3*e+f])*c,a[g]=(b[3*g+e]+b[3*e+g])*c}return a},e.str=function(a){return"quat("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+")"},e.exactEquals=d.exactEquals,e.equals=d.equals,e});