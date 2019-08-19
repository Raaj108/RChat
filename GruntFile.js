module.exports = (grunt) => {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    watch: {
      less: {
        files: ['resources/less/*.less'],
        tasks: ['less'],
        options:{
          spawn: false
        }
      }
    },    
    
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'public/css/main.css': 'resources/less/main.less'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
}
