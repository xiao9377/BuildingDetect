define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ReportListController', function ($scope, ReportService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.reports = [];

        $scope.getReportsByPage = function (page, number) {
            ReportService.getReportsByPage(page, number).then(function (result) {
                $scope.totalItems = result.count;
                $scope.reports = result.results;

            }, function (error) {
                console.log(error);
            });
        };

        $scope.getReportsByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getReportsByPage(value, $scope.itemsPerPage);
            }
        });

    });
});