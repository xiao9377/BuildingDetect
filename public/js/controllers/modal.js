define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ModalConfirmController', function ($scope, $modalInstance, data) {

        $scope.title = data.title;
        $scope.message = data.msg;

        $scope.ok = function () {
            $modalInstance.close('ok');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
});