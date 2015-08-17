/**
 * 用于部分不需要独立js的页面加载公共js
 */
requirejs.config({
  baseUrl: '../js',
  paths: {
    'config': 'config'
  }
})
require(['config'], function() {
  require(['jquery', 'bootstrap'], function($) {})
})
