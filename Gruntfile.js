"use strict";

var fs = require('fs');

function filter(files){
    for(var i = 0;i < files.length;i++){
        var file = files[ i ];
        if(file.indexOf('.html') != file.length - 5){
            files.splice(i, 1);
            i--;
        }
    }
    return files;
}

module.exports = function (grunt) {
    var executeDir = process.cwd() + '/template',
        path = filter(fs.readdirSync(executeDir));

    var current = null, jadeTamplates = {};
    while(current = path.shift()){
        var state = fs.statSync(executeDir + '/' + current);
        if (state.isFile()) {
            jadeTamplates[ 'app/' + current ] = 'template/' + current
        }else{
            var children = fs.readdirSync(executeDir + '/' + current);
            children.forEach(function(val, index){
                children[ index ] = current + '/' + val;
            });
            path = path.concat(children);
        }
    }

    //console.log(jadeTamplates);
    //return;

    grunt.initConfig({
        copy:{
            main: {
                flatten: true,
                files: [
                    { expand: true, cwd: 'node_modules/bootstrap/dist/',src: [ '**' ], dest: 'app/plugs/bootstrap/' },
                    { expand: true, cwd: 'node_modules/jquery/dist/',src: [ 'jquery.min.js' ], dest: 'app/plugs/jquery/' }
                ]
            }
        },
        connect:{
            options:{
                port: 8081,
                hostname: '0.0.0.0'
            },
            demo:{
                options:{
                    open: true,
                    middleware: function(connect){
                        return [
                          connect.static('app')
                        ];
                    }
                }
            }
        },
        watch:{
            jade:{
                tasks: [ 'jade' ],
                files: [
                    'template/**/*.jade',
                    'template/**/*.html'
                ]
            }
        },
        jade: {
            options:{
                pretty: true
            },
            analysis:{
                files:jadeTamplates
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('server', ['connect:demo', 'watch']);

}

