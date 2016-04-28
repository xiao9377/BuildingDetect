define(['services/services'], function (services) {
    'use strict';

    services.service('LetterService', function ($http, $q) {

        var submitLetter = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/letter/post',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestLettersByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/letter/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        return {
            postLetter: function (data) {
                return submitLetter(data);
            },
            getLettersByPage: function (page, number) {
                return requestLettersByPage(page, number);
            }
        }
    });
});