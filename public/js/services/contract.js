define(['services/services'], function (services) {
    'use strict';
    services.service('ContractService', function ($http, $q) {

        // 提交新合同
        var submitContract = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/contract/post',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        // 对已有工程添加合同
        var pushContract = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/contract/add',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestContractById = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/contract/id/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestContractByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/contract/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestContractByState = function (state, page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/contract/state/' + state + '?page=' + page + '&number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestContractByYear = function (year, page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/contract/year/' + year + '?page=' + page + '&number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var removeContract = function(id){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/contract/delete/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var getAllContracts = function(){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/contract/getall',
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var updatePayment = function(data){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/contract/postpayment',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };
        var updateState = function(contract){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/contract/updatestate',
                data: {contract: contract},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        return {

            postContract: function (data) {
                return submitContract(data);
            },
            addContract: function (data) {
                return pushContract(data);
            },
            getContractById: function (id) {
                return requestContractById(id);
            },
            getContractByPage: function (page, number) {
                return requestContractByPage(page, number);
            },
            getContractByState: function (state, page, number) {
                return requestContractByState(state, page, number);
            },
            getContractByYear: function (year, page, number) {
                return requestContractByYear(year, page, number);
            },
            deleteContract: function(id){
                return removeContract(id);
            },
            getAllContracts: function(){
                return getAllContracts();
            },
            updatePayment: function(data){
                return updatePayment(data);
            },
            updateState: function(contract){
                return updateState(contract);
            }
        };
    });
});
