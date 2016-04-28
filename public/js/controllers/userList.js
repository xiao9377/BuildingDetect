/**
 * Created by yg on 2016/4/26.
 */
define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('UserListController', function($scope, $state, UserService, HRService){
        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.users = [];

        $scope.getUsersByPage = function (page, number) {
            UserService.getUsersByPage(page, number).then(function (result) {
                console.log(result);
                $scope.totalItems = result.count;
                $scope.users = result.results;
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getUsersByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getUsersByPage(value, $scope.itemsPerPage);
            }
        });

        $scope.userAuth = function(auth){
            if(auth == 0){
                return '管理员';
            }
            if(auth == 1){
                return '信息员';
            }
            if(auth == 2){
                return '普通员工';
            }
            if(auth == 3){
                return '无权限';
            }
        };

        $scope.userDetail = function(userId){
            $state.go('employeeUserDetail', {userId: userId});
        };
        $scope.toEmployeeList = function(){
            $state.go('employee');
        }
    });

    controllers.controller('UserDetailController', function($scope, $state, $stateParams, toaster, UserService){

        var userId = $stateParams.userId;

        $scope.back = function () {
            $state.go('employeeUserList');
        };
        $scope.cancel = function () {
            $scope.getUserDetail(userId);
            $scope.isEdit = false;
        };

        $scope.getUserDetail = function (userId) {

            UserService.getUserDetail(userId).then(function (result) {
                //console.log(result);
                $scope.user = result;

            }, function (err) {
                console.log(err);
            });
        };

        $scope.getUserDetail(userId);

        $scope.isEdit = false;
        $scope.editUser = function () {
            $scope.isEdit = true;
        };

        $scope.deleteUser = function (userId) {
            if (confirm("确定删除该用户吗？")) {
                UserService.deleteUser(userId).then(function (result) {
                    //console.log(result);
                    $state.go('employeeUserList');
                    toaster.pop('success', '操作结果', '删除用户成功');
                }, function (err) {
                    console.log(err);
                });
            }
        };

        $scope.updateAuth = function () {
            var user = $scope.user;
            user.authority = parseInt($scope.user.authority);
            //console.log(user);
            UserService.updateUserAuth(user).then(function (result) {
                console.log(result);
                toaster.pop('success', '操作结果', '修改成功');
                $scope.isEdit = false;
                $scope.getUserDetail(userId);
            }, function (err) {
                console.log(err);
            });
        };

        $scope.userAuth = function(auth){
            if(auth == 0){
                return '管理员';
            }
            if(auth == 1){
                return '信息员';
            }
            if(auth == 2){
                return '普通员工';
            }
            if(auth == 3){
                return '无权限';
            }
        };
    })
});