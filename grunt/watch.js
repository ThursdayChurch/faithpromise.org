module.exports = function (grunt) {

    var app = grunt.option('app');

    grunt.config('watch', {

        website_css: {
            files: ['app-website/less/**/*.less'],
            tasks: ['css']
        },

        website_js: {
            files: ['app-website/js/**/*.js'],
            tasks: ['uglify:website', 'replace:angular_uib']
        },

        website_templates: {
            files: ['app-website/js/**/*.html'],
            tasks: ['copy:website_templates']
        }

    });

    grunt.registerTask('watch_app', [
        'watch:website_css',
        'watch:website_js',
        'watch:website_templates'
    ]);

};