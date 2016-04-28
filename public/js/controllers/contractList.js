define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ContractListController', function ($scope, $state, $filter, ContractService, DateService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.getContractByPage = function (page, number) {
            ContractService.getContractByPage(page, number).then(function (result) {
                //console.log(result);
                $scope.totalItems = result.count;
                $scope.contracts = result.results;

                for (var i = 0; i < $scope.contracts.length; i++) {
                    $scope.contracts[i].step = 0;
                    if(0 == $scope.contracts[i].state) {
                        $scope.contracts[i].currentState = '未检测';
                    } else if(1 == $scope.contracts[i].state) {
                        $scope.contracts[i].currentState = '检测中';
                    } else {
                        $scope.contracts[i].currentState = '已完成';
                    }
                    $scope.contracts[i].payment.forEach(function (item) {
                        if (item.isFinished) {
                            $scope.contracts[i].step++;
                        }
                    });
                }
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getContractByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getContractByPage(value, $scope.itemsPerPage);
            }
        });

        $scope.toContractDetail = function (contractId) {
            $state.go('contract.detail', {contractId: contractId});
        };
        $scope.toChargeInput = function (contractId) {
            $state.go('contract.chargeInput', {contractId: contractId});
        };

        $scope.payWarning = function (payment) {
            var n = 0;
            //console.log(payment);
            payment.forEach(function (item) {
                if (!item.isFinished && (DateService.dateDiff(item.time) <= 0)) {
                    //console.log($scope.dateDiff(item.time));
                    n++;
                }
            });
            //console.log(n);
            return n;
        }
    });

    controllers.controller('ContractStateListController', function ($scope, $state, $stateParams, $filter, ContractService, DateService) {

        $scope.state = $stateParams.state;

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.getContractByState = function (state, page, number) {
            ContractService.getContractByState(state, page, number).then(function (result) {
                //console.log(result);
                $scope.totalItems = result.count;
                $scope.contracts = result.results;

                for (var i = 0; i < $scope.contracts.length; i++) {
                    $scope.contracts[i].step = 0;
                    if(0 == $scope.contracts[i].state) {
                        $scope.contracts[i].currentState = '未检测';
                    } else if(1 == $scope.contracts[i].state) {
                        $scope.contracts[i].currentState = '检测中';
                    } else {
                        $scope.contracts[i].currentState = '已完成';
                    }
                    $scope.contracts[i].payment.forEach(function (item) {
                        if (item.isFinished) {
                            $scope.contracts[i].step++;
                        }
                    });
                }
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getContractByState($scope.state, $scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getContractByPage(value, $scope.itemsPerPage);
            }
        });

        $scope.toContractDetail = function (contractId) {
            $state.go('contract.detail', {contractId: contractId});
        };
        $scope.toChargeInput = function (contractId) {
            $state.go('contract.chargeInput', {contractId: contractId});
        };

        $scope.payWarning = function (payment) {
            var n = 0;
            //console.log(payment);
            payment.forEach(function (item) {
                if (!item.isFinished && (DateService.dateDiff(item.time) <= 0)) {
                    n++;
                }
            });
            //console.log(n);
            return n;
        }
    });
});