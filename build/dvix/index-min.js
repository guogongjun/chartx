function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}
window.Site = {
    local: !!~location.search.indexOf('local'),
    daily: !!~location.search.indexOf('daily'),
    debug: !!~location.search.indexOf('debug'),
    build: !!~location.search.indexOf('build')
}, /daily.taobao.net/g.test(location.host) && (Site.daily = !0);
var canvaxVersion = '2014.07.25', canvaxUrl = 'http://g.tbcdn.cn/thx/canvax/' + canvaxVersion + '/';
Site.daily && (canvaxVersion = '2014.07.25', canvaxUrl = 'http://g.assets.daily.taobao.net/thx/canvax/' + canvaxVersion + '/'), canvaxUrl = 'http://nick.daily.taobao.net/canvax', KISSY.config({
    packages: [{
            name: 'canvax',
            path: canvaxUrl,
            debug: Site.debug
        }]
}), KISSY.add('dvix/index', function (a, b) {
    var c = { Canvax: b };
    return c;
}, { requires: ['canvax/'] });