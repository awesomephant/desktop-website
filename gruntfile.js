module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['gruntfile.js'],
            options: {
                globals: {
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './css/main.css': './sass/main.scss'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['./js/src/window.js', './js/src/spawnWindow.js', './js/src/spawnNotepadWindow.js', './js/src/timer.js', './js/src/clock.js', './js/src/listPeople.js', './js/src/toggleMenu.js', './js/src/requestFullscreen.js'],
                dest: './js/dist/app.js',
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        './css/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },
        watch: {
            css: {
                files: ['./sass/*.scss'],
                tasks: ['sass', 'postcss']
            },
            js: {
                files: ['./js/src/*.js'],
                tasks: ['concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', ['sass', 'postcss', 'concat']);

};