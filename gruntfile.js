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
            files: ['./sass/*.scss'],
            tasks: ['sass', 'postcss']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', ['sass', 'postcss']);

};