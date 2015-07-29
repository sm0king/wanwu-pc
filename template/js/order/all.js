requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    define(['jquery','bootstrap','select'], function($) {})
})
