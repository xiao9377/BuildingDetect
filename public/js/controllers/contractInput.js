define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ContractInputController', function ($scope, toaster, $modal, $state, $filter, FileUploader, DateService, ContractService) {

        $scope.contract = {};
        $scope.contract.id = '';
        $scope.contract.name = '';
        $scope.contract.isTemp = false;
        $scope.contract.startDate = $filter('date')(new Date(),'yyyy-MM-dd');
        $scope.contract.endDate = '';
        $scope.contract.type = '';
        $scope.contract.client = '';
        $scope.contract.detectItem = '';
        $scope.contract.structurePoint = '';
        $scope.contract.payment = [];
        $scope.contract.payState = 0;
        $scope.contract.total = 0;
        $scope.contract.state = 0;
        $scope.contract.attachment = '';
        $scope.contract.reportIds = [];
        $scope.contract.letters = [];
        $scope.contract.remark = '';
        $scope.contract.secretLevel = 5;

        var uploader = $scope.uploader = new FileUploader({
            url: '/contract/upload'
        });

        // filters
        uploader.filters.push({
            name: 'customFilter',
            fn: function (item, options) {
                return this.queue.length <= 1;
            }
        });

        // upload callback
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.contract.attachment = response.filename;
        };

        uploader.onCompleteAll = function () {
            toaster.pop('success', '操作结果', '附件上传成功!');
            $scope.postContract();
        };

        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            toaster.pop('error', '操作结果', '附件上传失败!');
        };


        var uploaderImport = $scope.uploaderImport = new FileUploader({
            url: '/contract/import'
        });

        // filters
        uploaderImport.filters.push({
            name: 'uploaderImport',
            fn: function (item, options) {
                return this.queue.length <= 1;
            }
        });

        // upload callback
        uploaderImport.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.contract = response;
        };

        uploaderImport.onCompleteAll = function () {
            toaster.pop('success', '操作结果', '导入成功!');
            $state.go('contract');
        };

        uploaderImport.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            toaster.pop('error', '操作结果', '导入失败!');
        };

        $scope.importContract = function () {
            if (uploaderImport.queue.length > 0) {
                uploaderImport.uploadAll();
            } else {
                toaster.pop('error', '提示', '请选择导入的模板文件!');
            }
        };

        $scope.setContractState = function (state) {
            $scope.contract.state = state;
        };

        $scope.contractSecretText = '绝密';
        $scope.setContractSecret = function (secret) {
            $scope.contract.secretLevel = secret;

            if (1 == secret) {
                $scope.contractSecretText = '绝密';
            } else if (2 == secret) {
                $scope.contractSecretText = '机密';
            } else if (3 == secret) {
                $scope.contractSecretText = '秘密';
            } else if (4 == secret) {
                $scope.contractSecretText = '内部';
            } else if (5 == secret) {
                $scope.contractSecretText = '公开';
            }
        };

        $scope.payment = {};
        $scope.payment.firstStep = {};
        $scope.payment.secondStep = {};
        $scope.payment.thirdStep = {};

        $scope.project = {};
        $scope.project.name = '';
        $scope.project.contractIds = [];
        $scope.project.areaCount = '';
        $scope.project.constructionUnit = '';
        $scope.project.structureType = '';

        $scope.isFirstStep = true;
        $scope.isSecondStep = false;
        $scope.isThirdStep = false;

        $scope.firstStepEnable = false;
        $scope.secondStepEnable = false;
        $scope.thirdStepEnable = false;

        $scope.$watch('isFirstStep', function (value) {
            if (value) {
                $scope.firstStepEnable = true;
            } else {
                $scope.payment.firstStep.time = '';
                $scope.payment.firstStep.fee = '';

                $scope.firstStepEnable = false;
            }
        });

        $scope.$watch('isSecondStep', function (value) {
            if (value) {
                $scope.secondStepEnable = true;
            } else {
                $scope.payment.secondStep.time = '';
                $scope.payment.secondStep.fee = '';

                $scope.secondStepEnable = false;
            }
        });

        $scope.$watch('isThirdStep', function (value) {
            if (value) {
                $scope.thirdStepEnable = true;
            } else {
                $scope.payment.thirdStep.time = '';
                $scope.payment.thirdStep.fee = '';

                $scope.thirdStepEnable = false;
            }
        });

        $scope.checkInput = function () {

            if ('' === $scope.contract.id) {
                var modalInstance = $modal.open({
                    templateUrl: '../../views/tpls/ModelConfirm.html',
                    controller: 'ModalConfirmController',
                    resolve: {
                        //通过resolve传值给模态框的controller
                        data: function () {
                            return {title: '取消确认', msg: '检测到您未输入合同编号，是否保存该合同为临时合同？'};
                        }
                    }
                });

                modalInstance.opened.then(function () {
                    // 模态窗口打开之后执行的函数
                });

                modalInstance.result.then(function (result) {

                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var monthStr = '';
                    if (month < 10) {
                        monthStr = '0' + month;
                    } else {
                        monthStr = '' + month;
                    }
                    var day = date.getDate();
                    var dayStr = '';
                    if (day < 10) {
                        dayStr = '0' + day;
                    } else {
                        dayStr = '' + day;
                    }
                    var hour = date.getHours();
                    var hourStr = '';
                    if (hour < 10) {
                        hourStr = '0' + hour;
                    } else {
                        hourStr = '' + hour;
                    }
                    var minute = date.getMinutes();
                    var minuteStr = '';
                    if (minute < 10) {
                        minuteStr = '0' + minute;
                    } else {
                        minuteStr = '' + minute;
                    }
                    var second = date.getSeconds();
                    var secondStr = '';
                    if (second < 10) {
                        secondStr = '0' + second;
                    } else {
                        secondStr = '' + second;
                    }
                    var tempId = '' + year + monthStr + dayStr + hourStr + minuteStr + secondStr;

                    $scope.contract.id = tempId;
                    $scope.contract.isTemp = true;

                    if (uploader.queue.length > 0) {
                        $scope.postUpload($scope.contract.id);
                    } else {
                        $scope.postContract();
                    }
                }, function (reason) {
                    //点击空白区域或者点击取消

                });
            } else {

                if (uploader.queue.length > 0) {
                    $scope.postUpload($scope.contract.id);
                } else {
                    $scope.postContract();
                }
            }
        };

        $scope.postUpload = function (contractId) {
            uploader.formData.push({contractId: contractId});
            uploader.uploadAll();
        };

        $scope.postContract = function () {

            console.log($scope.contract);
            console.log($scope.project);

            var data = {};
            data.contract = $scope.contract;

            if ($scope.isFirstStep) {
                $scope.payment.firstStep.fee = Number($scope.payment.firstStep.fee);
                $scope.payment.firstStep.isFinished = false;
                data.contract.payment.push($scope.payment.firstStep);
            }
            if ($scope.isSecondStep) {
                $scope.payment.secondStep.fee = Number($scope.payment.secondStep.fee);
                $scope.payment.secondStep.isFinished = false;
                data.contract.payment.push($scope.payment.secondStep);
            }
            if ($scope.isThirdStep) {
                $scope.payment.thirdStep.fee = Number($scope.payment.thirdStep.fee);
                $scope.payment.thirdStep.isFinished = false;
                data.contract.payment.push($scope.payment.thirdStep);
            }

            var payment = data.contract.payment;
            payment.forEach(function (item) {
                if (!item.isFinished && (DateService.dateDiff(item.time) <= 0)) {
                    data.contract.payState = 1;
                }else{
                    data.contract.payState = 0;
                }
            });

            if($scope.contract.total == 0){
                payment.forEach(function(item){
                    data.contract.total += item.fee;
                });
            }

            data.project = $scope.project;
            data.project.contractIds.push(data.contract.id);

            ContractService.postContract(data).then(function (result) {

                toaster.pop('success', '操作结果', '合同添加成功!');

                $state.go('contract', {});

            }, function (error) {

                toaster.pop('error', '操作结果', '合同添加失败!');
            });
        };
    });
});