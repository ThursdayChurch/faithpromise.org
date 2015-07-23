module.exports = function (grunt) {

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time
    require('time-grunt')(grunt);

    // Temp paths
    var temp_dir = 'temp';

    // Roots
    var src_root = '.';
    var web_root = 'public';
    var views_root = 'resources/views';
    var build_root = 'public/build';
    var release_root = '_release';

    // JS Paths
    var js_src_dir = src_root + '/js';
    var js_output_dir = build_root + '/js';
    var js_output_file_dev = js_output_dir + '/main.dev.js';
    var js_output_file_production = js_output_dir + '/main.min.js';
    var js_output_file_temp = temp_dir + '/main.tmp.js';
    var js_input = [
        'bower_components/angular-ui-bootstrap/src/position/position.js',
        'bower_components/angular-ui-bootstrap/src/dropdown/dropdown.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/angular-ui-bootstrap/src/modal/modal.js',
        temp_dir + '/template-cache.tmp',
        temp_dir + '/angular-ui-template-cache.tmp',
        js_src_dir + '/app.module.js',
        js_src_dir + '/**/*.js'
    ];

    // LESS Paths
    var less_src_dir = src_root + '/less';
    var less_output_dir = build_root + '/css';
    var less_output_file_dev = less_output_dir + '/main.dev.css';
    var less_output_file_production = less_output_dir + '/main.min.css';
    var lessInput = [
        less_src_dir + '/main.less'
    ];

    // Image paths
    var image_src_dir = src_root + '/images';
    var image_output_dir = build_root + '/images';

    // Font paths
    var font_src_dir = src_root + '/assets';
    var font_output_dir = build_root + '/fonts';

    // Project configuration.
    grunt.initConfig(
        {
            clean: {
                build: [build_root + '/**/*.*'],
                release: [release_root + '/**/*.*']
            },
            concat: {
                options: {
                    separator: '\n;'
                },
                js_dev: {
                    src: js_input,
                    dest: js_output_file_dev
                },
                js_production: {
                    src: js_input,
                    dest: js_output_file_temp
                }
            },
            uglify: {
                production: {
                    files: [{
                        src: js_output_file_temp,
                        dest: js_output_file_production
                    }]
                }
            },
            removelogging: {
                production: {
                    src: [js_output_file_temp]
                }
            },
            less: {
                dev: {
                    files: [{
                        src: lessInput,
                        dest: less_output_file_dev
                    }],
                    options: {
                        compress: false
                    }
                },
                production: {
                    files: [{
                        src: lessInput,
                        dest: less_output_file_production
                    }],
                    options: {
                        compress: true
                    }
                }
            },
            // TODO: Can't get this to work. It crashes
            //uncss: {
            //    options: {
            //        htmlroot: 'public'
            //    },
            //    production: {
            //        files: {
            //            'public/build/main.tidy.css': ['public/**/*.html', '!public/assets/**/*.html']
            //        }
            //    }
            //},
            replace: {
                fontello: {
                    options: {
                        patterns: [
                            {
                                match: '../font/',
                                replacement: '/build/fonts/fontello/font/'
                            },
                            {
                                match: '[class^="icon-"]',
                                replacement: '.icon:before, [class^="icon-"]'
                            }
                        ],
                        usePrefix: false
                    },
                    files: [
                        {
                            expand: false,
                            flatten: true,
                            src: [font_src_dir + '/fontello/css/fontello.css'],
                            dest: temp_dir + '/fontello.css.tmp'
                        }
                    ]
                },
                remove_public: {
                    options: {
                        patterns: [
                            {
                                match: 'public/build',
                                replacement: '/build'
                            }
                        ],
                        usePrefix: false
                    },
                    files: [
                        {
                            expand: false,
                            src: [views_root + '/layouts/**/*.php'],
                            dest: './'
                        }
                    ]
                }
            },
            htmlbuild: {
                production: {
                    src: views_root + '/layouts/**/*.php',
                    options: {
                        replace: true,
                        scripts: {
                            main: 'public/build/js/main.min.js'
                        },
                        styles: {
                            main: 'public/build/css/main.min.css'
                        }
                    }
                }
            },
            cacheBust: {
                options: {
                    baseDir: web_root,
                    rename: false
                },
                production: {
                    files: [
                        {
                            src: [views_root + '/layouts/**/*.php']
                        }
                    ]
                }
            },
            autoprefixer: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
                },
                dev: {
                    src: less_output_file_dev
                },
                production: {
                    src: less_output_file_production
                }
            },
            watch: {
                css: {
                    files: [less_src_dir + '/**/*.less', 'assets/fontello/**/*.*'],
                    tasks: ['css_dev']
                },
                js: {
                    files: js_src_dir + '/**/*.js',
                    tasks: ['concat:js_dev']
                },
                svg: {
                    files: [src_root + '/**/*.svg'],
                    tasks: ['svgstore:default']
                },
                templates: {
                    files: js_src_dir + '/**/*.html',
                    tasks: ['html2js:templates', 'concat:js_dev']
                }
            },
            copy: {
                fontello: {
                    expand: true,
                    cwd: font_src_dir + '/',
                    src: ['fontello/font/*.*'],
                    dest: font_output_dir + '/'
                },
                svg4everybody: {
                    src: 'bower_components/svg4everybody/svg4everybody.min.js',
                    dest: js_output_dir + '/svg4everybody.min.js'
                },
                appTemplates: {
                    expand: true,
                    cwd: js_src_dir,
                    src: 'directives/**/*.html',
                    dest: js_output_dir
                },
                release_files: {
                    expand: true,
                    src: [
                        './**/*.*',
                        '!./_release/**/*.*',
                        '!./bower_components/**/*.*',
                        '!./database/**/*.*',
                        '!./images/**/*.*',
                        '!./js/**/*.*',
                        '!./less/**/*.*',
                        '!./node_modules/**/*.*',
                        '!./storage/**/*.*',
                        '!./temp/**/*.*',
                        '!./tests/**/*.*',
                        '!./vendor/**/*.*',
                        '!./.env',
                        '!./.gitattributes',
                        '!./.gitignore',
                        '!./bower.json',
                        '!./Gruntfile.js',
                        '!./gulpfile.js',
                        '!./gulpfile.js',
                        '!./Homestead.yaml.example',
                        '!./package.json',
                        '!./phpspec.yml',
                        '!./phpunit.xml',
                        '!./readme.md',
                        '!./TODO.txt'
                    ],
                    dest: release_root
                }
            },
            html2js: {
                templates: {
                    options: {
                        base: js_src_dir
                    },
                    src: [js_src_dir + '/**/*.html'],
                    dest: temp_dir + '/template-cache.tmp',
                    module: 'template-cache'
                },
                angularUi: {
                    options: {
                        base: 'bower_components/angular-ui-bootstrap'
                    },
                    src: ['bower_components/angular-ui-bootstrap/template/modal/*.html'],
                    dest: temp_dir + '/angular-ui-template-cache.tmp',
                    module: 'angular-ui-template-cache'
                }
            },
            svgstore: {
                options: {
                    svg: {
                        //viewBox: '0 0 100 100',
                        xmlns: 'http://www.w3.org/2000/svg'
                    }
                },
                default: {
                    files: [
                        {
                            src: image_src_dir + '/sprites/general/*.svg',
                            dest: image_output_dir + '/general.svg'
                        },
                        {
                            src: image_src_dir + '/sprites/video/*.svg',
                            dest: image_output_dir + '/video.svg'
                        }
                    ]
                }
            },
            git_deploy: {
                production: {
                    options: {
                        url: 'git@github.faithpromise.org:faithpromise/faithpromise.org.git',
                        branch: 'release'
                    },
                    src: release_root
                }
            }
        }
    );

    // Register tasks
    grunt.registerTask('default', ['build_dev']);

    grunt.registerTask('deploy_production', [
        'clean:build',
        '_build_production',
        'clean:release',
        'copy:release',
        'git_deploy_production',
        'build_dev' // Restore dev files
    ]);

    grunt.registerTask('_build_common', [
        'copy:fontello',
        'copy:svg4everybody',
        'copy:appTemplates',
        'html2js',
        'svgstore:default'
    ]);

    grunt.registerTask('build_dev', [
        '_build_common',
        '_css_dev',
        'concat:js_dev'
    ]);

    grunt.registerTask('_build_production', [
        'clean:build',
        '_build_common',
        '_js_production',
        '_css_production',
        'htmlbuild:production',
        'replace:remove_public',
        'cacheBust:production'
    ]);

    grunt.registerTask('_js_production', [
        'concat:js_production',
        'removelogging',
        'uglify:production'
    ]);

    grunt.registerTask('_css_production', [
        'replace:fontello',
        'less:production',
        'autoprefixer:production'
    ]);

    grunt.registerTask('_css_dev', [
        'replace:fontello',
        'less:dev',
        'autoprefixer:dev'
    ]);
};