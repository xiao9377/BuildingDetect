/**
 * Created by yg on 2016/4/21.
 */
define(['services/services'], function (services) {
    'use strict';

    services.service('FileService', function ($http, $q) {

        var submitFile = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/file/post',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestFilesByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/file/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };


        return {
            postFile: function (data) {
                return submitFile(data);
            },
            getFilesByPage: function (page, number) {
                return requestFilesByPage(page, number);
            }
        }

    });
});