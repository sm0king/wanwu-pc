"use strict";

var fs = require('fs');

//返回 files 中以.html文件结尾的文件
function filter(files) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.indexOf('.html') != file.length - 5) {
            files.splice(i, 1);
            i--;
        }
    }
    return files;
}

//指示一个文件是否是 .html 文件
function isHtml(filtName) {
    return filtName.indexOf('.html') == filtName.length - 5;
}

//获取 /template 目录下的 .html 文件做为 Jade 模板
//返回：grunt-contrib-jade 任务所需要的配置格式如：
//      {
//          "target": "source"
//      }
function getTemplates() {
    //读取Gruntfile.js所在目录下的 template 目录
    var executeDir = process.cwd() + '/template',

        //读取template目录下的所有文件和目录信息
        path = fs.readdirSync(executeDir);

    //表示一条目录或文件信息
    var current = null,

        //保存返回结果
        jadeTamplates = {};

    //循环读取到的文件或目录信息
    while (current = path.shift()) {

        //console.log(current)
        //读取文件或目录的状态信息
        var state = fs.statSync(executeDir + '/' + current);

        //如果是一个文件
        if (state.isFile()) {
            //如果该文件是 .html 文件，则加入模板之中
            //.master 或 .jade 文件不用加入其中，因为模板编译器会自动读取这类文件.
            isHtml(current) && (jadeTamplates['app/' + current] = 'template/' + current);
        } else {
            //过滤掉插件文件夹
            if (current !== 'plugs') {
                //读取子目录中的信息
                var children = fs.readdirSync(executeDir + '/' + current);

                //循环读取出来的目录或文件信息，拼接上路径
                children.forEach(function(val, index) {
                    children[index] = current + '/' + val;
                });

                //将子目录为中的信息追加到待处理数组中
                path = path.concat(children);
            };
        }
    }
    return jadeTamplates;
}

module.exports = function(grunt) {
    var jadeTamplates = getTemplates();

    //console.log(jadeTamplates);
    //return;
    grunt.initConfig({
        user: grunt.file.readJSON('user.json'),
        copy: {
            main: {
                flatten: true,
                files: [{
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/',
                    src: ['**'],
                    dest: 'app/plugs/bootstrap/'
                }, {
                    expand: true,
                    cwd: 'node_modules/jquery/dist/',
                    src: ['jquery.min.js'],
                    dest: 'app/plugs/jquery/'
                }]
            },
            svn:{
                files:[{
                    expand:true,
                    cwd:'app/',
                    src:['**'],
                    dest:'<%= user.svnpath %>'
                }],
                options:{
                    process:function(content,srcpath){
                        if (srcpath.indexOf('.js')!== -1 && srcpath.indexOf('plugs') === -1) {
                            return content.replace('baseUrl:"../js"','baseUrl:"/style/backend/app/js"');
                        }else{
                            return content;
                        }
                    }
                }
            },
            plugs:{
                files:[{
                    expand:true,
                    cwd:'template/plugs/',
                    src:['**'],
                    dest:'app/plugs/'
                }]
            },
            json:{
                files:[{
                    expand:true,
                    cwd:'template',
                    src:['**/*.json','!plugs/**'],
                    // filter:function(filepath){return filepath.indexOf('plugs') !== 9;},
                    dest:'app/'
                }]
            },
            all:{
                files:[{
                    expand:true,
                    cwd:'template',
                    src:['**/*.{png,jpg,gif,js,css}'],
                    dest:'app/'
                }]
            },
            test:{
                src:'test.js',
                dest:'testDist.js',
                options:{
                    process:function(content,srcpath){
                        console.log('xxxxxxxxxxxxxxxxxxxxxx');
                        console.log(content);
                        console.log('----------------------');
                        console.log(srcpath)
                        console.log('xxxxxxxxxxxxxxxxxxxxxx');
                        return content.replace('baseUrl:"../js"','baseUrl:"/style/backend/app/js"')
                    }
                }
            }
        },
        connect: {
            options: {
                port: 8081,
                hostname: '0.0.0.0'
            },
            demo: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('app')
                        ];
                    }
                }
            }
        },
        watch: {
            jade: {
                tasks: ['jade'],
                files: [
                    'template/**/*.jade',
                    'template/**/*.html'
                ],
                options: {
                    spawn: false
                }
            },
            cpAll:{
                tasks:['copy:all'],
                files:['template/js/**/*.js','template/css/**/*.css','template/img/**/*.{png,jpg,gif}'],
                options:{
                    spawn:false
                }
            },
            cpJson:{
                tasks:['copy:json'],
                files:['template/**/*.json'],
                options:{
                    spawn:false
                }
            },
            plugs:{
                tasks:['copy:plugs'],
                files:['template/plugs/**'],
                options:{
                    spawn:false
                }
            }
        },
        jade: {
            options: {
                pretty: true
            },
            analysis: {
                files: jadeTamplates
            }
        },
        uglify: {
            options: {
                mangle: true,
                preserveComments: false
            },
            densityJS: {
                files: [{
                    expand: true,
                    cwd: 'template/js/',
                    src: ['**/*.js'],
                    dest: 'app/js/'
                }]
            },
            test:{
                src:'test.js',
                dest:'testDist.js',
                process:function(content,srcpath){
                    console.log('xxxxxxxxxxxxxxxxxxxxxx');
                    console.log(content);
                    console.log('----------------------');
                    console.log(srcpath)
                    console.log('xxxxxxxxxxxxxxxxxxxxxx');
                    return('xxxxxxxxxxxxxxxxxxxxxx');
                }
            }
        },
        cssmin:{
            options:{
                compatibility:'ie7',
                noAdvanced:true
            },
            densityCSS:{
                files:[{
                    expand:true,
                    cwd:'template/css/',
                    src:['**/*.css'],
                    dest:'app/css/'
                }]
            }
        },
        imagemin:{
            options:{},
            densityimg:{
                files:[{
                    expand:true,
                    cwd:'template/img/',
                    src:['**/*.{png,jpg,gif}'],
                    dest:'app/img/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    //当监视到模板修改时的回调函数
    grunt.event.on('watch', function(action, filepath) {

        //新的 jade 配置对象
        var config = {};

        //如果改变的是 .jade 类型的文件
        if (filepath.indexOf('.jade') >= 0) {
            //将所有模板获取出来，重新生成一次
            config = getTemplates();
        } else {
            //只生成被修改的模板
            var target = filepath.replace('template', 'app')
            config[target] = filepath;
        }
        //var user = grunt.file.readJSON('user.json')
        //user.changeFile = filepath;
        //user.allChange.push(filepath)
        //console.log(user.allChange)
        //更新  Jade 配置

        grunt.config('jade.analysis.files', config);
    });

    grunt.registerTask('server', ['jade', 'connect:demo', 'watch']);
    grunt.registerTask('dist','压缩任务',function(){
        grunt.task.run(['uglify:densityJS','cssmin:densityCSS','imagemin:densityimg']);
        // grunt.log.writeln('压缩任务已经完成，正在发布到SVN地址....')
        grunt.task.run(['copy:svn']);
    })
}
