define(['directives/directives'], function (directives) {
    'use strict';
    directives.directive('popOver', function () {
        return {
            restrict: 'C',
            scope: {
                title: '@tooltipTitle',
                content: '@tooltipContent'
            },
            link: function (scope, element, attr, ctrl, trans) {
                element.bind('mouseover', function (e) {
                    attr.$set('originalTitle',  scope.title);
                    element.tooltip();
                });
            }
        }
    });
});