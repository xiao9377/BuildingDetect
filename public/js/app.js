define([
    'angular',
    'ui-router',
    'toaster',
    'ui-bootstrap',
    'angular-jqcloud',
    'ng-datepicker',
    'angular-file-upload',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (angular) {
    'use strict';
    return angular.module('app', [
        'controllers',
        'directives',
        'filters',
        'services',
        'ui.router',
        'toaster',
        'ui.bootstrap',
        'angular-jqcloud',
        'ng-bs3-datepicker',
        'angularFileUpload'
    ]);
});
