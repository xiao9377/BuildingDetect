define(['services/services'], function (services) {
    'use strict';

    services.service('ReportService', function ($http, $q) {

        var submitReport = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/report/post',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestReportsByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/report/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };


        return {
            postReport: function (data) {
                return submitReport(data);
            },
            getReportsByPage: function (page, number) {
                return requestReportsByPage(page, number);
            }
        }

    });
});