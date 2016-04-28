var app = angular.module('LoginApp', ['ngRoute']);

app.controller('LoginController', function ($scope,$location, LoginService) {

    $scope.user = {};
    $scope.user.name = '';
    $scope.user.phone = '';
    $scope.user.password = '';
    $scope.user.authority = 3;

    $scope.select = 3;

    $scope.showError = false;

    $scope.submit = function() {
        $scope.user.authority = $scope.select;

        LoginService.doLogin($scope.user).then(function (result) {
            //console.log('111111111' + result);
            if (result.err) {
                //console.log(result.err);
                return $scope.showError = true;
            }
            //console.log("success!");
            window.location.href = '/';

        });
    }
});

app.service('LoginService', function ($http, $q) {
    var login = function (user) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http({
            method: 'POST',
            url: '/login',
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
        doLogin: function (user) {
            return login(user);
        }
    }

});
