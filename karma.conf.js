// Karma configuration
'use strict';
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',  
            './src/client/app.module.js',
            './src/server/be.module.js',
            './src/client/mainController.controller.js',
            './src/client/services/availableServer.service.js',
            './src/client/mainController.controller.spec.js',
            './src/client/services/availableServer.service.spec.js'
        ],

        // list of files to exclude
        exclude: [],
        preprocessors: [],
        reporters: ['spec'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
