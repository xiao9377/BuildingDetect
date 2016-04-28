define(['services/services'], function (services) {
    'use strict';

    services.service('ProjectService', function ($http, $q) {

        var requestProjectByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/project/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestProjectById = function(id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/project/id/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        return {
            getProjectByPage: function (page, number) {
                return requestProjectByPage(page, number);
            },
            getProjectById: function(id){
                return requestProjectById(id);
            }
        }
    });
});