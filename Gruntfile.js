module.exports = function(grunt) {
  // grunt.log.header = function() {};
  // grunt.fail.report = function() {};
  // grunt.fail.warn = function() {};
  // grunt.log.muted = true;

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        maxcomplexity: 30,
        expr: true,
        loopfunc: true,
        quotmark: 'single',
        node: true
      },
      files: [
        '*.js',
        'utils/**/*.js',
        'test/**/*.js',
        'config/*.js'
      ]
    },

    jscs: {
      options: {
        force: true,
        disallowTrailingWhitespace: true,
        requireSpaceAfterLineComment: true,
        disallowFunctionDeclarations: true,
        disallowMultipleVarDecl: true,
        disallowMixedSpacesAndTabs: true,
        disallowNewlineBeforeBlockStatements: true,
        disallowKeywordsOnNewLine: ['else'],
        validateIndentation: 2
      },
      files: { src: [
        '*.js',
        'utils/**/*.js',
        'test/**/*.js',
        'config/*.js'
      ]}
    },

    mochacli: {
      options: {
        timeout: 0, // disable timeout
        reporter: 'spec'
      },
      crave: {
        src: ['test/crave/api/*/*.js']
      }
    },

    env : {
      options: {
        // Shared Options Hash
      },
      qa: {
        NODE_ENV: 'qa'
      },
      production: {
        NODE_ENV: 'prod'
      },
      production_proxy: {
        NODE_ENV: 'prod',
        NODE_CONFIG : '{"proxy": "http://127.0.0.1:8888"}'
      },
      qa_proxy: {
        NODE_ENV: 'qa',
        NODE_CONFIG : '{"proxy": "http://127.0.0.1:8888"}'
      }
    }

  });

  // Get proxy grunt option
  var proxy = '';
  if(grunt.option('proxy') === true) {
    proxy = '_proxy';
  } else {
    proxy = '';
  }

  // Get smoke grunt option
  var smoke = '';
  if(grunt.option('smoke') === true) {
    smoke = '_smoke';
  } else {
    smoke = '';
  }
  // console.log(grunt.option.flags());

  // Load plugin(s)
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  // Add task(s)
  grunt.registerTask('default', ['jscs', 'jshint']);
  grunt.registerTask('crave', 'Crave service test', ['env:production'+proxy, 'mochacli:crave']);

};

