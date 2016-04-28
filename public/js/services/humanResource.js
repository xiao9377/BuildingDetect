/**
 * Created by yg on 2016/4/9.
 */
define(['services/services'], function(services){
   'use strict';

    services.service('HRService', function($http, $q){

        // 添加新员工
        var submitEmployee = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            console.log("submit before post");
            $http({
                method: 'POST',
                url: '/employee/post',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        // 修改员工信息
        var updateEmployee = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/employee/update',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        //删除员工
        var deleteEmployee = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/delete/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestEmployeeById = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/id/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestEmployeeByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestEmployeeByName = function (name, page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/name/' + name + '?page=' + page + '&number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestEmployeeBySex = function (sex, page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/sex/' + sex + '?page=' + page + '&number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestEmployeeByJob = function (job, page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/job/' + job + '?page=' + page + '&number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestEmployeeByPhone = function (phone) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/employee/phone/' + phone,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        return {

            postEmployee: function (data) {
                return submitEmployee(data);
            },
            updateEmployee: function (data) {
                return updateEmployee(data);
            },
            deleteEmployee: function (id) {
                return deleteEmployee(id);
            },
            getEmployeeById: function(id){
                return requestEmployeeById(id);
            },
            getEmployeeByPage: function (page, number) {
                return requestEmployeeByPage(page, number);
            },
            getEmployeeByName: function (name, page, number) {
                return requestEmployeeByName(name, page, number);
            },
            getEmployeeBySex: function (sex, page, number) {
                return requestEmployeeByName(sex, page, number);
            },
            getEmployeeByJob: function (job, page, number) {
                return requestEmployeeByJob(job, page, number);
            },
            getEmployeeByPhone: function (phone) {
                return requestEmployeeByPhone(phone);
            }
        };
    });
});