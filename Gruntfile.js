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

function isHtml(filtName){
    return filtName.indexOf('.html') == filtName.length - 5;
}

function getTemplates(){
    var executeDir = process.cwd() + '/template',
        path = fs.readdirSync(executeDir);

    var current = null, jadeTamplates = {};
    while(current = path.shift()){
        var state = fs.statSync(executeDir + '/' + current);
        if (state.isFile()) {

            isHtml(current) && (jadeTamplates[ 'app/' + current ] = 'template/' + current);
        }else{
            var children = fs.readdirSync(executeDir + '/' + current);
            children.forEach(function(val, index){
                children[ index ] = current + '/' + val;
            });
            path = path.concat(children);
        }
    }
    return jadeTamplates;
}

module.exports = function (grunt) {
    var jadeTamplates = getTemplates();

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
                ],
                options: {
                    spawn: false
                }
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
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.event.on('watch', function(action, filepath){
        var config = {};

        if (filepath.indexOf('.jade') >= 0) {
            config = getTemplates();
        }else{
            var target = filepath.replace('template', 'app')
            config[ target ] = filepath;
        }
        

        
        grunt.config('jade.analysis.files', config);
    });

    grunt.registerTask('server', ['jade','connect:demo', 'watch']);

}

