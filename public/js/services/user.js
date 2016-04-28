/**
 * Created by yg on 2016/4/26.
 */
define(['services/services'], function (services) {
    'use strict';

    services.service('UserService', function($q, $http){

        var requestUsersByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/user/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestUsersById = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/user/id/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var updateUserAuth = function (user) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/user/updateAuth',
                data: {user: user},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var removeUser = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/user/delete/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        return {
            getUsersByPage: function(page, number){
                return requestUsersByPage(page, number);
            },
            getUserDetail: function(id){
                return requestUsersById(id);
            },
            updateUserAuth: function(user){
                return updateUserAuth(user);
            },
            deleteUser: function(id){
                return removeUser(id);
            }
        }
    })
});