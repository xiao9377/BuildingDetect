/**
 * Created by yg on 2016/4/25.
 */
var app = angular.module('RegisterApp', ['ngRoute', 'ui.bootstrap', 'toaster']);

app.controller('RegisterController', function ($scope, $interval, $modal, toaster, RegisterService) {

    $scope.user = {};
    $scope.user.name = '';
    $scope.user.phone = '';
    $scope.user.password = '';
    $scope.user.authority = 3;

    //$scope.getValidCode = function () {
    //    RegisterService.getValidCode($scope.user).then(function (result) {
    //        console.log(result);
    //        var t = 60;
    //        $scope.delay = t + ' s';
    //        var timer = $interval(function () {
    //            t -= 1;
    //            $scope.delay = t + ' s';
    //        }, 1000, 60);
    //        if (result.err) {
    //            return $scope.err = result.err;
    //        }
    //        if (result.resultCode == 100) {
    //            $scope.getCode = true;
    //            $scope.afterTime = true;
    //            alert('验证码已发送，请查看手机。');
    //            timer.then(function () {
    //                $scope.afterTime = false;
    //                $scope.getCode = false;
    //                $scope.delay = '';
    //                timer = undefined;
    //            });
    //        }
    //    });
    //};

    $scope.submit = function () {
        RegisterService.doRegister($scope.user).then(function (result) {
            //console.log('111111111' + result);
            if (result.err) {
                //console.log(result.err);
                return $scope.err = result.err;
            }
            if (confirm('确认以下信息是否正确\n\n姓名： ' + result.employee.name + '\n性别： ' +
                    result.employee.sex + '\n手机号： ' + result.employee.contact)) {
                RegisterService.confirmRegister($scope.user).then(function (result) {
                    if (result.err) {
                        return console.log('error: ' + result.err);
                    }
                    //console.log("register success!");
                    //toaster.pop('success', '操作结果', '注册成功，请登录。');
                    window.location.href = '/login';
                });
            }
        });
    }
})
;

//app.controller('RegisterConfirmController', function ($scope, $modalInstance, data, RegisterService) {
//
//    $scope.title = data.title;
//    $scope.message = data.msg;
//    var user = data.user;
//
//    $scope.ok = function () {
//        console.log('111111111');
//
//        RegisterService.confirmRegister(user).then(function (result) {
//            if (result.err) {
//                return console.log(result.err);
//            }
//            console.log("register success!");
//            $modalInstance.close('ok');
//            //window.location.href = '/login';
//        });
//    };
//
//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };
//});

app.service('RegisterService', function ($http, $q) {
    var register = function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
            method: 'POST',
            url: '/register',
            data: {user: user},
            timeout: 6000
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return promise;
    };

    var confirmRegister = function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
            method: 'POST',
            url: '/confirmregister',
            data: {user: user},
            timeout: 6000
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return promise;
    };
    var getValidCode = function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
            method: 'POST',
            url: '/getvalidcode',
            data: {user: user},
            timeout: 6000
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (error) {
            deferred.reject(error);
        });
        return promise;
    };

    return {
        doRegister: function (user) {
            return register(user);
        },
        confirmRegister: function (user) {
            return confirmRegister(user);
        },
        getValidCode: function (user) {
            return getValidCode(user);
        }
    }

});
