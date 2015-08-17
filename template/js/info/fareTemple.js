requirejs.config({
    baseUrl: '../js',
    paths: {
        'config': 'config',
    }
})
require(['config'], function() {

    require(['KISSY'], function(KISSY) {
        presetData = {
            "list": {},
            "type": "number"
        };
        areaGroup = {
            "group": [{
                "title": "华东",
                "codes": ["310000", "320000", "330000", "340000", "360000"]
            }, {
                "title": "华北",
                "codes": ["110000", "120000", "140000", "370000", "130000", "150000"]
            }, {
                "title": "华中",
                "codes": ["430000", "420000", "410000"]
            }, {
                "title": "华南",
                "codes": ["440000", "450000", "350000", "460000"]
            }, {
                "title": "东北",
                "codes": ["210000", "220000", "230000"]
            }, {
                "title": "西北",
                "codes": ["610000", "650000", "620000", "640000", "630000"]
            }, {
                "title": "西南",
                "codes": ["500000", "530000", "520000", "540000", "510000"]
            }, {
                "title": "港澳台",
                "codes": ["810000", "820000", "710000"]
            }, {
                "title": "海外",
                "codes": ["990000"]
            }]
        };
        require(['tbJs'],function(){
            debugger
        })
    })
})
