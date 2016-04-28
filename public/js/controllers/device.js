/**
 * Created by yg on 2016/4/9.
 */
define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('DeviceController', function ($scope, $state, $filter, toaster, DeviceService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.noAttachment = function(attachment){
            return attachment=='';
        };
        $scope.getDeviceByPage = function (page, number) {
            DeviceService.getDeviceByPage(page, number).then(function (result) {
                //console.log(result);
                $scope.totalItems = result.count;
                $scope.devices = result.results;
                for(var i = 0; i<result.count; i++){
                    if($scope.noAttachment(result.results[i].attachment)){
                        $scope.devices[i].attachmentLink = '';
                    }else{
                        $scope.devices[i].attachmentLink = '/device/get/attachment?filename=' + result.results[i].attachment;
                    }
                }
            }, function (err) {
                console.log(err);
            });
        };

        $scope.getDeviceByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getDeviceByPage(value, $scope.itemsPerPage);
            }
        });

        $scope.addDevice = function () {
            $state.go('deviceAdd');
        };

        $scope.deviceDetail = function (deviceId) {
            $state.go('deviceDetail', {deviceId: deviceId});
        };

        $scope.dateDiff = function (validDate) {
            validDate = $filter('date')(validDate, 'yyyy-MM-dd');
            //console.log('validDate: '+validDate);
            var newDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            //console.log('now date : '+newDate);
            var date1 = new Date(Date.parse(validDate.replace(/-/g, "/"))).getTime();
            var date2 = new Date(Date.parse(newDate.replace(/-/g, "/"))).getTime();
            return (date1 - date2) / 1000 / 60 / 60 / 24; //返回相差天数
        };


    });

    controllers.controller('DeviceAddController', function ($scope, $state, toaster, FileUploader, DeviceService) {

        $scope.device = {};
        $scope.device.id = '';
        $scope.device.detectContent = '';
        $scope.device.standard = '';
        $scope.device.name = '';
        $scope.device.version = '';
        $scope.device.range = '';
        $scope.device.method = '';
        $scope.device.validDate = '';
        $scope.device.result = '';
        $scope.device.attachment = '';

        var uploader = $scope.uploader = new FileUploader({
            url: 'device/upload'
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length <= 1;
            }
        });

        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.log(response);
            $scope.device.attachment = response.filename;
        };

        uploader.onCompleteAll = function() {
            $scope.postDevice();
        };

        $scope.uploadFile = function() {
            uploader.uploadAll();
        };

        $scope.checkPost = function () {
            if(uploader.queue.length > 0) {
                $scope.uploadFile();
            } else {
                $scope.postDevice();
            }
        };

        $scope.cancel = function () {
            $state.go('device');
        };

        $scope.postDevice = function () {

            var data = {};
            data.device = $scope.device;
            DeviceService.postDevice(data).then(function (result) {
                //console.log(result);
                toaster.pop('success', '操作结果', '设备添加成功');
                $state.go('device');
            }, function (err) {
                console.log(err);
                toaster.pop('error', '操作结果', '设备添加失败');
            });
        }
    });

    controllers.controller('DeviceDetailController', function ($scope, $state, $stateParams, toaster, FileUploader, DeviceService) {

        var deviceId = $stateParams.deviceId;

        $scope.device = {};

        var uploader = $scope.uploader = new FileUploader({
            url: 'device/upload'
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item, options) {
                return this.queue.length <= 1;
            }
        });

        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.log(response);
            $scope.device.attachment = response.filename;
        };

        uploader.onCompleteAll = function() {
            $scope.updateDevice();
        };

        $scope.uploadFile = function() {
            uploader.uploadAll();
        };

        $scope.checkUpdate = function () {
            if(uploader.queue.length > 0) {
                $scope.uploadFile();
            } else {
                $scope.updateDevice();
            }
        };

        $scope.back = function () {
            $state.go('device');
        };
        $scope.cancel = function () {
            $scope.getDeviceDetail(deviceId);
            $scope.isEdit = false;
        };

        $scope.getDeviceDetail = function (deviceId) {

            DeviceService.getDeviceById(deviceId).then(function (result) {

                //console.log(result);
                $scope.device = result;
                if(result.attachment == ''){
                    $scope.noAttachment = true;
                    $scope.device.attachmentLink = '';
                }else{
                    $scope.noAttachment = false;
                    $scope.device.attachmentLink = '/device/get/attachment?filename=' + result.attachment;
                }

            }, function (err) {
                console.log(err);
            });
        };

        $scope.getDeviceDetail(deviceId);

        $scope.isEdit = false;
        $scope.editDevice = function () {
            $scope.isEdit = true;
        };

        $scope.deleteDevice = function (deviceId) {
            if (confirm("确定删除该设备吗？")) {
                DeviceService.deleteDevice(deviceId).then(function (result) {
                    //console.log(result);
                    $state.go('device');
                    toaster.pop('success', '操作结果', '删除设备成功');
                }, function (err) {
                    console.log(err);
                });
            }
        };

        $scope.updateDevice = function () {
            var data = {};
            data.device = $scope.device;
            DeviceService.updateDevice(data).then(function (result) {
                //console.log(result);
                toaster.pop('success', '操作结果', '修改成功');
                $scope.isEdit = false;
                $scope.getDeviceDetail(deviceId);
            }, function (err) {
                console.log(err);
                alert('不能为空');
            });
        }
    });
});