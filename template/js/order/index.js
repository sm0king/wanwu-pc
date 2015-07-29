requirejs.config({
    baseUrl: '../js',
    paths: {
      'config':'config'
    }
})
require(['config'], function() {
    require(['jquery','bootstrap'], function($) {})
})
