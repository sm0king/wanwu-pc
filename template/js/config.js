requirejs.config({
    baseUrl: '../plugs',
    paths: {
        'jquery': 'jquery/jquery.min',
        'Chart': 'Chart.min',
        'bootstrap': 'bootstrap/js/bootstrap.min',
        'bootstrapValidator': 'bootstrapValidator/js/bootstrapValidator.min',
        'datetimepicker': 'datetimepicker/bootstrap-datetimepicker.min',
        'dateLang':'datetimepicker/bootstrap-datetimepicker.zh-CN',
        'html5shiv': 'html5shiv.min',
        'imagebox': 'imagebox/imagebox',
        'cookie': 'jquery.cookie',
        'jqueryForm':'jquery.form/jquery.form',
        'foxUpload': 'jquery.form/jquery.foxupload',
        'jqueryTag': 'jquery.tagsinput',
        'metisMenu': 'metisMenu/metisMenu.min',
        'select': 'select/dropkick',
        'unslider': 'unslider.min',
        'ZeroClipboard':'ueditor/third-party/zeroclipboard/ZeroClipboard',
        'ueditorConfig':'ueditor/ueditor.config',
        'ueditor':'ueditor/ueditor.all.min',
        'sbAdmin':'../js/sb-admin-2',
        'dialog':'../js/dialog',
        'foxuploadBrand':'jquery.form/jquery.foxupload_brand',
        'foxuploadProduct':'jquery.form/jquery.foxupload_product',
.,        'KISSY':'kiss_seed',
        'tbJs':'../js/info/tbJs',
        'productDetail':'../js/product/detail',
        'productEdit':'../js/product/product_edit',
        'productAdd':'../js/product/product_add',
        'productMEdit':'../js/product/product_m_edit',
        'addr':'../js/info/addr'
        'productMEdit':'../js/product/product_m_edit'
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
            deps: ["jquery","bootstrap"],
            exports:"$"
        },
        "dateLang":{
            deps:["datetimepicker"]
        },
        "html5shiv": {
        },
        "imagebox": {
            deps: ['jquery']
        },
        "cookie": {
            deps: ["jquery"]
        },
        "jqueryForm":{
            deps:["jquery"]
        },
        "foxUpload": {
            deps: ["jquery",'jqueryForm']
        },
        "foxUpload": {
            deps: ["jquery",'jqueryForm']
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
        "ueditorConfig":{
        },
        "ueditor":{
            deps:['ueditorConfig'],
            exports:'UE'
        },
        "productEdit":{
            deps:["jquery","ueditor","ZeroClipboard","bootstrap","dialog","foxuploadProduct"]
        },
        "productAdd":{
            deps:["jquery","ueditor","ZeroClipboard","bootstrap","dialog","foxuploadProduct"]
        },
        "productMEdit":{
            deps:["jquery"]
        },
        "foxuploadBrand":{
            deps:['jquery','jqueryForm']
        },
        "foxuploadProduct":{
            deps:['jquery','jqueryForm']
        },
        "sbAdmin":{
            deps:['jquery','bootstrap']
        },
        "dialog":{
            deps:['jquery','bootstrap']
        },
        "tbJs":{
            deps:['KISSY']
        }
    }
})
define(['sbAdmin','dialog'],function($){})
