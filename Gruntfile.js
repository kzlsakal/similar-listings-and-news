const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    webpack: {
      prod: Object.assign({ mode: 'production' }, webpackConfig),
      dev: Object.assign({ mode: 'development' }, webpackConfig)
    }
  });

  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['webpack:dev']);
  grunt.registerTask('deploy', ['webpack:prod']);
};
