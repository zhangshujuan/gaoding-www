(function() {
    var root = this;
    var assetsPath = "/dev";
    var config = {
        base: typeof process === "undefined" ? window.HEALTH.assetsPath : null,
		vars: {
		    'jqueryVersion':'1-8-3',
            'jqueryui':'jqueryui/jqueryui'
		},
        alias: {

            // lib
            
            // plugins
            "$": 'pluginPath/jquery/jquery-{jqueryVersion}',
            "jquery": 'pluginPath/jquery/jquery-{jqueryVersion}',
            "jqueryui":'pluginPath/{jqueryui}',
            "tooltip":'pluginPath/bs/tooltip',
            "bootstrap":'pluginPath/bs/index',
            "handlebars":'pluginPath/template/index',
            "handlebars-helper":'pluginPath/template/handlebars-helper',
            "common":'scripts/utils/common',
            "popover":'scripts/plugins/bs/popover',
            "uploader":'pluginPath/uploader/uploader',
            "handlebars":'pluginPath/template/handlebars',
            "dataBind":'widget/databind'
        },
        paths: {
            pluginPath: 'scripts/plugins',
            utilsPath:'scripts/utils'
        },
        comboSyntax: ["??", ","],
        comboMaxLength: 500,
           preload: [
                "common"
           ],
        map: [],
        charset: 'utf-8',
        timeout: 20000,
        debug: true
    };
    if (root.seajs) {
        root.seajs.config(config);
    }
    return config;
}).call(this);