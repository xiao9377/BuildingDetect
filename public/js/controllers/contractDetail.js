define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('ContractDetailController', function ($scope, $state, $stateParams, ContractService, LetterService, ReportService, toaster) {

        var contractId = $state.params.contractId;

        $scope.getContractDetail = function (contractId) {
            ContractService.getContractById(contractId).then(function (result) {
                $scope.project = result.project;
                $scope.contract = result.contract;
                if(result.contract.attachment == ''){
                    $scope.noAttachment = true;
                    $scope.contract.attachmentLink = '';
                }else{
                    $scope.noAttachment = false;
                    $scope.contract.attachmentLink = '/contract/get/attachment?filename=' + result.contract.attachment;
                }
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getContractDetail(contractId);

        $scope.newLetter = {};
        $scope.newLetter.name = '';
        $scope.newLetter.contact = '';
        $scope.newLetter.date = '';
        $scope.newLetter.secretLevel = 5;
        $scope.newLetter.content = '';
        $scope.newLetter.remark = '';

        $scope.newLetterSecretText = '绝密';

        $scope.newReport = {};
        $scope.newReport.name = '';
        $scope.newReport.type = '';
        $scope.newReport.date = '';
        $scope.newReport.amount = '';
        $scope.newReport.secretLevel = 5;
        $scope.newReport.remark = '';

        $scope.newReportSecretText = '绝密';

        $scope.setLetterSecret = function(secret) {
            $scope.newLetter.secretLevel = secret;

            if (1 == secret) {
                $scope.newLetterSecretText = '绝密';
            } else if(2 == secret) {
                $scope.newLetterSecretText = '机密';
            } else if(3 == secret) {
                $scope.newLetterSecretText = '秘密';
            } else if(4 == secret) {
                $scope.newLetterSecretText = '内部';
            } else if(5 == secret) {
                $scope.newLetterSecretText = '公开';
            }
        };

        $scope.setReportSecret = function(secret) {
            $scope.newReport.secretLevel = secret;

            if (1 == secret) {
                $scope.newReportSecretText = '绝密';
            } else if(2 == secret) {
                $scope.newReportSecretText = '机密';
            } else if(3 == secret) {
                $scope.newReportSecretText = '秘密';
            } else if(4 == secret) {
                $scope.newReportSecretText = '内部';
            } else if(5 == secret) {
                $scope.newReportSecretText = '公开';
            }

        };

        $scope.getStateText = function(state){
            if(0 == state) {
                return '未检测';
            } else if(1 == state) {
                return '检测中';
            } else if(2 == state) {
                return '已完成';
            }
        };

        $scope.showAddLetter = false;
        $scope.showAddReport = false;


        $scope.addLetter = function () {
            $scope.showAddReport = false;
            $scope.showAddLetter = true;
        };

        $scope.addReport = function () {
            $scope.showAddLetter = false;
            $scope.showAddReport = true;
        };

        $scope.initial = function () {
            $scope.showAddLetter = false;
            $scope.showAddReport = false;
        };

        $scope.saveLetter = function () {

            $scope.newLetter.contractId = $scope.contract.id;
            $scope.newLetter.projectName = $scope.project.name;
            $scope.newLetter.attachment = '';

            console.log($scope.newLetter);
            LetterService.postLetter($scope.newLetter).then(function (result) {

                toaster.pop('success', '操作结果', '联系函添加成功!');

                $state.go('contract.letter', {});

            }, function (error) {

                toaster.pop('error', '操作结果', '联系函添加失败!');
            });
        };

        $scope.saveReport = function () {

            $scope.newReport.contractId = $scope.contract.id;
            $scope.newReport.projectName = $scope.project.name;

            console.log($scope.newReport);
            ReportService.postReport($scope.newReport).then(function (result) {

                toaster.pop('success', '操作结果', '报告添加成功!');

                $state.go('contract.report', {});

            }, function (error) {

                toaster.pop('error', '操作结果', '报告添加失败!');
            });
        };

        $scope.back = function(){
            $state.go('contract');
        };

        $scope.deleteContract = function(contractId){
            if(confirm('确定删除该合同吗？')){
                ContractService.deleteContract(contractId).then(function(result){
                    $state.go('contract');
                    toaster.pop('success', '操作结果', '合同删除成功!');
                }, function(err){
                    console.log(err);
                    toaster.pop('error', '操作结果', '合同删除失败!');
                });
            }
        };

        $scope.updateState = function(){
            var contract = $scope.contract;
            //console.log(contract);
            ContractService.updateState(contract).then(function(result){
                toaster.pop('success', '操作结果', '状态更新成功!');
            }, function(err){
                console.log(err);
                toaster.pop('error', '操作结果', '合同删除失败!');
            });
        }
    });
});