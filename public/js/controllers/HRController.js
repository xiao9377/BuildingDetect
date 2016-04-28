/**
 * Created by yg on 2016/4/9.
 */
define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('HRController', function ($scope, $state, HRService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.noAttachment = function(attachment){
            return attachment=='';
        };
        $scope.getEmployeeByPage = function (page, number) {
            HRService.getEmployeeByPage(page, number).then(function (result) {
                //console.log(result);
                $scope.totalItems = result.count;
                $scope.employees = result.results;
                for(var i = 0; i<result.count; i++){
                    if($scope.noAttachment(result.results[i].attachment)){
                        $scope.employees[i].attachmentLink = '';
                    }else{
                        $scope.employees[i].attachmentLink = '/employee/get/attachment?filename=' + result.results[i].attachment;
                    }
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.getEmployeeByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getEmployeeByPage(value, $scope.itemsPerPage);
            }
        });

        $scope.addEmployee = function () {
            //console.log("add employee");
            $state.go('employeeAdd');
        };

        $scope.employeeDetail = function (employeeId) {
            $state.go('employeeDetail', {employeeId: employeeId});
        };

        $scope.getUserList = function(){
            $state.go('employeeUserList', {});
        }
    });

    controllers.controller('EmployeeAddController', function ($scope, $state, toaster, FileUploader, HRService) {

        $scope.employee = {};
        $scope.employee.name = '';
        $scope.employee.sex = '';
        $scope.employee.age = 0;
        $scope.employee.job = '';
        $scope.employee.title = '';
        $scope.employee.seniority = 0;
        $scope.employee.education = '';
        $scope.employee.major = '';
        $scope.employee.nowPost = '';
        $scope.employee.contact = '';
        $scope.employee.attachment = '';

        var uploader = $scope.uploader = new FileUploader({
            url: 'employee/upload'
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length <= 1;
            }
        });

        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.log(response);
            $scope.employee.attachment = response.filename;
        };

        uploader.onCompleteAll = function() {
            $scope.postEmployee();
        };

        $scope.uploadFile = function() {
            uploader.uploadAll();
        };

        $scope.checkPost = function () {
            if(uploader.queue.length > 0) {
                $scope.uploadFile();
            } else {
                $scope.postEmployee();
            }
        };

        $scope.cancel = function () {
            $state.go('employee');
        };

        $scope.postEmployee = function () {

            var data = {};
            data.employee = $scope.employee;

            HRService.postEmployee(data).then(function (result) {
                console.log(result);
                $state.go('employee', {});
                toaster.pop('success', '操作结果', '人员添加成功');
            }, function (err) {
                console.log(err);
                toaster.pop('error', '操作结果', '人员添加失败');
            });
        };
    });

    controllers.controller('EmployeeDetailController', function ($scope, $state, $stateParams, toaster, FileUploader, HRService) {

        var employeeId = $stateParams.employeeId;
        //console.log(employeeId);
        $scope.back = function () {
            $state.go('employee');
        };
        $scope.cancel = function () {
            $scope.getEmployeeDetail(employeeId);
            $scope.isEdit = false;
        };

        $scope.getEmployeeDetail = function (employeeId) {
            console.log(employeeId);
            HRService.getEmployeeById(employeeId).then(function (result) {
                //console.log(result);
                $scope.employee = result;
                if(result.attachment == ''){
                    $scope.noAttachment = true;
                    $scope.employee.attachmentLink = '';
                }else{
                    $scope.noAttachment = false;
                    $scope.employee.attachmentLink = '/employee/get/attachment?filename=' + result.attachment;
                }
            }, function (err) {
                console.log(err);
            });
        };
        $scope.getEmployeeDetail(employeeId);

        $scope.deleteEmployee = function (employeeId) {
            if (confirm("确定删除该员工吗？")) {
                HRService.deleteEmployee(employeeId).then(function (result) {
                    //console.log(result);
                    toaster.pop('success', '操作结果', '删除员工成功');
                    $state.go('employee');
                }, function (err) {
                    console.log(err);
                });
            }
        };

        $scope.isEdit = false;
        $scope.editEmployee = function () {
            $scope.isEdit = true;
        };

        $scope.updateEmployee = function () {
            var data = {};
            data.employee = $scope.employee;
            HRService.updateEmployee(data).then(function (result) {
                console.log(result);
                toaster.pop('success', '操作结果', '修改成功');
                $scope.isEdit = false;
                $scope.getEmployeeDetail(employeeId);
            }, function (err) {
                console.log(err);
                alert('不能为空');
            });
        };

        var uploader = $scope.uploader = new FileUploader({
            url: 'employee/upload'
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length <= 1;
            }
        });

        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.log(response);
            $scope.employee.attachment = response.filename;
        };

        uploader.onCompleteAll = function() {
            $scope.updateEmployee();
        };

        $scope.uploadFile = function() {
            uploader.uploadAll();
        };

        $scope.updateCheck = function () {
            if(uploader.queue.length > 0) {
                $scope.uploadFile();
            } else {
                $scope.updateEmployee();
            }
        };
    });
});