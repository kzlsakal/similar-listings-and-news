const webpackConfig = require('./webpack.config.js');
const grunt = require('grunt');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    aws: grunt.file.readJSON(process.env.HOME + '/.aws/grunt-aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>'
      },
      bundle: {
        src: 'public/similar-listings-news.bundle.js',
        dest: '<%= aws.path %>js/similar-listings-news.bundle.js'
      }
    },
    webpack: {
      prod: Object.assign({ mode: 'production', stats: 'minimal' }, webpackConfig),
      dev: Object.assign({ mode: 'development' }, webpackConfig)
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws');

  grunt.registerTask('default', ['webpack:dev']);
  grunt.registerTask('upload', ['webpack:prod', 's3']);
};
