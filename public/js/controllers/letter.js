define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('LetterListController', function ($scope, LetterService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.letters = [];

        $scope.getLettersByPage = function (page, number) {
            LetterService.getLettersByPage(page, number).then(function (result) {
                $scope.totalItems = result.count;
                $scope.letters = result.results;

            }, function (error) {
                console.log(error);
            });
        };

        $scope.getLettersByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getLettersByPage(value, $scope.itemsPerPage);
            }
        });

    });
});