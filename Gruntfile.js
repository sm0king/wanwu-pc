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

module.exports = function (grunt) {
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
                tasks: [ 'jade:compile' ],
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
            compile:{
                options:{
                    basedir:'template',
                    pretty:true
                },
                files:[{
                    expand:true,
                    src:[
                    'template/**/*.jade',
                    'template/**/*.html'],
                    dest:'app/'
                }]
            }
            /*options:{
                pretty: true
            },
            analysis:{
                files:jadeTamplates
            }*/
        }
    });
    var JadeInheritance = require('jade-inheritance');
    var changedFiles = [];

    var onChange = grunt.util._.debounce(function() {
        var options = grunt.config('jade.compile.options');
        var dependantFiles = [];

        changedFiles.forEach(function(filename) {
          var directory = options.basedir;
          var inheritance = new JadeInheritance(filename, directory, options);
          dependantFiles = dependantFiles.concat(inheritance.files);
        });

        var config = grunt.config('jade.compile.files')[0];
        config.src = dependantFiles;
        grunt.config('jade.compile.files', [config]);

        changedFiles = [];
    }, 200)
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('jade-inheritance');

    grunt.event.on('watch', function(action, filepath){
        changedFiles.push(filepath);
        onChange();
        /*console.log('xxxxxxxxxxxxxxxxxxxxxx');
        jade -p <filepath>
        // console.log(jade -p <filepath>)
        console.log('xxxxxxxxxxxxxxxxxxxxxx');
        var target = filepath.replace('template', 'app'),
            config = {};

        config[ target ] = filepath;
        grunt.config('jade.analysis.files', config);*/
    });

    grunt.registerTask('server', ['jade','connect:demo', 'watch']);

}

