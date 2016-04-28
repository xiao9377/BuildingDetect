define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ProjectListController', function ($scope, $state, $stateParams, ProjectService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.projects = [];

        $scope.getProjectsByPage = function (page, number) {
            ProjectService.getProjectByPage(page, number).then(function (result) {

                $scope.totalItems = result.count;
                $scope.projects = result.results;

            }, function (error) {
                console.log(error);
            });
        };

        $scope.getProjectsByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getProjectsByPage(value, $scope.itemsPerPage);
            }
        });

        $scope.toAddContract = function (projectId) {
            $state.go('contract.addContract', {projectId: projectId});
        };
    });

    controllers.controller('AddContractController', function ($scope, $state, $stateParams,$filter, toaster,FileUploader, $modal, ContractService, ProjectService, DateService) {

        var projectId = $stateParams.projectId;
        $scope.projectId = projectId;
        console.log($scope.projectId);

        $scope.getProjectsById = function(projectId){
            ProjectService.getProjectById(projectId).then(function (result) {
                //console.log(result);
                $scope.project = result;
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getProjectsById(projectId);

        $scope.newContract = {};
        $scope.newContract.id = '';
        $scope.newContract.name = '';
        $scope.newContract.isTemp = false;
        $scope.newContract.startDate = $filter('date')(new Date(),'yyyy-MM-dd');
        $scope.newContract.endDate = '';
        $scope.newContract.type = '';
        $scope.newContract.client = '';
        $scope.newContract.detectItem = '';
        $scope.newContract.structurePoint = '';
        $scope.newContract.payment = [];
        $scope.newContract.payState = 0;
        $scope.newContract.state = 0;
        $scope.newContract.attachment = '';
        $scope.newContract.reportIds = [];
        $scope.newContract.letters = [];
        $scope.newContract.remark = '';
        $scope.newContract.secretLevel = 5;
        $scope.newContract.stateText = '未检测';

        $scope.payment = {};
        $scope.payment.firstStep = {};
        $scope.payment.secondStep = {};
        $scope.payment.thirdStep = {};

        // 是否添加阶段标志位
        $scope.isFirstStep = true;
        $scope.isSecondStep = false;
        $scope.isThirdStep = false;

        $scope.$watch('isFirstStep', function (value) {
            if (value) {

            } else {
                $scope.payment.firstStep.time = '';
                $scope.payment.firstStep.fee = '';
            }
        });

        $scope.$watch('isSecondStep', function (value) {
            if (value) {

            } else {
                $scope.payment.secondStep.time = '';
                $scope.payment.secondStep.fee = '';
            }
        });

        $scope.$watch('isThirdStep', function (value) {
            if (value) {

            } else {
                $scope.payment.thirdStep.time = '';
                $scope.payment.thirdStep.fee = '';
            }
        });

        $scope.setContractState = function (state) {
            $scope.newContract.state = state;

            if(0 == state) {
                $scope.newContract.stateText = '未检测';
            } else if(1 == state) {
                $scope.newContract.stateText = '检测中';
            } else if(2 == state) {
                $scope.newContract.stateText = '已完成';
            }
        };

        $scope.contractSecretText = '绝密';
        $scope.setContractSecret = function(secret) {
            $scope.newContract.secretLevel = secret;

            if (1 == secret) {
                $scope.contractSecretText = '绝密';
            } else if(2 == secret) {
                $scope.contractSecretText = '机密';
            } else if(3 == secret) {
                $scope.contractSecretText = '秘密';
            } else if(4 == secret) {
                $scope.contractSecretText = '内部';
            } else if(5 == secret) {
                $scope.contractSecretText = '公开';
            }
        };

        $scope.checkInput = function () {

            if ('' === $scope.newContract.id) {
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

                    $scope.newContract.id = tempId;
                    $scope.newContract.isTemp = true;

                    if(uploader.queue.length > 0) {
                        $scope.postUpload($scope.newContract.id);
                    } else {
                        $scope.submitContract();
                    }

                }, function (reason) {
                    //点击空白区域或者点击取消

                });
            } else {
                if(uploader.queue.length > 0) {
                    $scope.postUpload($scope.newContract.id);
                } else {
                    $scope.submitContract();
                }
            }
        };

        $scope.postUpload = function (contractId) {
            uploader.formData.push({contractId: contractId});
            uploader.uploadAll();
        };

        $scope.submitContract = function () {

            var data = {};
            data.contract = $scope.newContract;

            if ($scope.isFirstStep) {
                $scope.payment.firstStep.fee = Number($scope.payment.firstStep.fee);
                $scope.payment.firstStep.isFinished = false;
                data.contract.payment.push($scope.payment.firstStep);
            }
            if ($scope.isSecondStep) {
                $scope.payment.secondStep.fee = Number($scope.payment.secondStep.fee);
                $scope.payment.firstStep.isFinished = false;
                data.contract.payment.push($scope.payment.secondStep);
            }
            if ($scope.isThirdStep) {
                $scope.payment.thirdStep.fee = Number($scope.payment.thirdStep.fee);
                $scope.payment.firstStep.isFinished = false;
                data.contract.payment.push($scope.payment.thirdStep);
            }

            data.projectId = $scope.projectId;
            var payment = data.contract.payment;
            payment.forEach(function (item) {
                if (!item.isFinished && (DateService.dateDiff(item.time) <= 0)) {
                    data.contract.payState = 1;
                }else{
                    data.contract.payState = 0;
                }
            });

            ContractService.addContract(data).then(function (result) {
                toaster.pop('success', '操作结果', '合同添加成功!');

                $state.go('contract', {});

            }, function (error) {
                toaster.pop('error', '操作结果', '合同添加失败!');
            });
        };

        $scope.cancel = function () {

            var modalInstance = $modal.open({
                templateUrl: '../../views/tpls/ModelConfirm.html',
                controller: 'ModalConfirmController',
                resolve: {
                    //通过resolve传值给模态框的controller
                    data: function () {
                        return {title: '取消确认', msg: '取消后将不保存刚刚输入的信息，是否取消？'};
                    }
                }
            });

            modalInstance.opened.then(function () {
                // 模态窗口打开之后执行的函数
            });

            modalInstance.result.then(function (result) {
                $state.go('contract.project', {});
            }, function (reason) {
                //点击空白区域或者点击取消
            });
        };

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
            $scope.newContract.attachment = response.filename;
        };

        uploader.onCompleteAll = function () {
            toaster.pop('success', '操作结果', '附件上传成功!');
            $scope.submitContract();
        };

        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            toaster.pop('error', '操作结果', '附件上传失败!');
        };
    });
});