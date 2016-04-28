define(['directives/directives'], function (directives) {
    'use strict';
    directives.directive('yearItem', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '../../views/tpls/yearItem.html',
            scope: {
                year: '@year',
                amount: '@amount'
            },
            link: function (scope, element, attr, ctrl, trans) {
            }
        }
    });
});