/**
 * Created by yg on 2016/4/16.
 */
define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ChargeInputController', function ($scope, $state, $stateParams, toaster,DateService, ContractService) {

        var contractId = $stateParams.contractId;
        $scope.getContractById = function (contractId) {
            ContractService.getContractById(contractId).then(function (result) {
                console.log('contract: ' + result);
                $scope.contract = result.contract;
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getContractById(contractId);

        $scope.cancel = function () {
            $state.go('contract');
        };

        $scope.updatePayment = function () {
            var data = {};
            data.contract = $scope.contract;
            if ($scope.isFirstStep) {
                $scope.payment.firstStep.fee = Number($scope.payment.firstStep.fee);
                $scope.payment.firstStep.isFinished = true;
                data.contract.payment[0] = $scope.payment.firstStep;
            }
            if ($scope.isSecondStep) {
                $scope.payment.secondStep.fee = Number($scope.payment.secondStep.fee);
                $scope.payment.secondStep.isFinished = true;
                data.contract.payment[1] = $scope.payment.secondStep;
            }
            if ($scope.isThirdStep) {
                $scope.payment.thirdStep.fee = Number($scope.payment.thirdStep.fee);
                $scope.payment.thirdStep.isFinished = true;
                data.contract.payment[2] = $scope.payment.thirdStep;
            }
            var payment = data.contract.payment;
            payment.forEach(function (item) {
                if (!item.isFinished && (DateService.dateDiff(item.time) <= 0)) {
                    data.contract.payState = 1;
                }else{
                    data.contract.payState = 0;
                }
            });
            ContractService.updatePayment(data).then(function (result) {

                console.log(result);
                toaster.pop('success', '操作结果', '收款登记成功!');
            }, function (err) {
                console.log(err);
                toaster.pop('error', '操作结果', '收款登记失败!');
            });
        }
    })
});