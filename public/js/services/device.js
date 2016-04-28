/**
 * Created by yg on 2016/4/9.
 */
define(['services/services'], function(services){
    'use strict';

    services.service('DeviceService', function($http, $q){

        // 添加新设备
        var submitDevice = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            //console.log("submit before post");
            $http({
                method: 'POST',
                url: '/device/post',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        // 修改设备信息
        var updateDevice = function (data) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'POST',
                url: '/device/update',
                data: {data: data},
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        //删除设备
        var deleteDevice = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/device/delete/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestDeviceById = function (id) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/device/id/' + id,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestDeviceByPage = function (page, number) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/device/page/' + page + '?number=' + number,
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        var requestAllDevices = function(){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http({
                method: 'GET',
                url: '/device/getall',
                timeout: 6000
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
            return promise;
        };

        return {

            postDevice: function (data) {
                return submitDevice(data);
            },
            updateDevice: function (data) {
                return updateDevice(data);
            },
            deleteDevice: function (id) {
                return deleteDevice(id);
            },
            getDeviceById: function(id){
                return requestDeviceById(id);
            },
            getDeviceByPage: function (page, number) {
                return requestDeviceByPage(page, number);
            },
            getAllDevices: function(){
                return requestAllDevices();
            }
        };
    });
});