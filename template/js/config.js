requirejs.config({
    baseUrl: '../plugs',
    paths: {
        'jquery': 'jquery/jquery.min',
        'Chart': 'Chart.min',
        'bootstrap': 'bootstrap/js/bootstrap.min',
        'bootstrapValidator': 'bootstrapValidator/js/bootstrapValidator.min',
        'datetimepicker': 'datetimepicker/bootstrap-datetimepicker.min',
        'html5shiv': 'html5shiv.min',
        'imagebox': 'imagebox/imagebox',
        'cookie': 'jquery.cookie',
        'jqueryForm': 'jquery.form/jquery.foxupload',
        'jqueryTag': 'jquery.tagsinput',
        'metisMenu': 'metisMenu/metisMenu.min',
        'select': 'select/dropkick',
        'unslider': 'unslider.min',
        'sbAdmin' : '../js/sb-admin-2',
        'dialog' : '../js/dialog'
    },
    shim: {
        "jquery": {
            exports: "$"
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "bootstrapValidator": {
            deps: ["jquery","bootstrap"]
        },
        "datetimepicker": {
            deps: ["jquery","bootstrap"]
        },
        "html5shiv": {
        },
        "imagebox": {
            deps: ["imagebox"],
            exports: "imagebox"
        },
        "cookie": {
            deps: ["jquery"]
        },
        "jqueryForm": {
            deps: ["jquery"]
        },
        "jqueryTag": {
            deps: ["jquery"]
        },
        "metisMenu": {
            deps: ["jquery",'bootstrap']
        },
        "select": {
            deps: ["jquery"]
        },
        "unslider": {
            deps: ["jquery"]
        },
        "sbAdmin": {
            deps: ["jquery","bootstrap"]
        },
        "dialog": {
            deps: ["jquery"]
        }
    }
})
define(['sbAdmin','dialog'], function($) {});
