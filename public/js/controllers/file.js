/**
 * Created by yg on 2016/4/21.
 */
define(['controllers/controllers'], function (controllers) {
    'use strict';

    controllers.controller('FileListController', function ($scope, FileService) {

        $scope.maxSize = 8;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.isFirstRequest = true;

        $scope.files = [];

        $scope.noAttachment = function(attachment){
            return attachment=='';
        };
        $scope.getFilesByPage = function (page, number) {
            FileService.getFilesByPage(page, number).then(function (result) {
                console.log(result);
                $scope.totalItems = result.count;
                $scope.files = result.results;
                for(var i = 0; i<result.count; i++){
                    if($scope.noAttachment(result.results[i].attachment)){
                        $scope.files[i].attachmentLink = '';
                    }else{
                        $scope.files[i].attachmentLink = '/file/get/attachment?filename=' + result.results[i].attachment;
                    }
                }
            }, function (error) {
                console.log(error);
            });
        };

        $scope.getFilesByPage($scope.currentPage, $scope.itemsPerPage);

        $scope.$watch('currentPage', function (value) {
            // 翻页操作
            if ($scope.isFirstRequest) {
                $scope.isFirstRequest = false;
            } else {
                $scope.getFilesByPage(value, $scope.itemsPerPage);
            }
        });

    });

    controllers.controller('FileAddController', function($scope, $state, $filter, toaster, FileUploader, FileService){

        $scope.file = {};
        $scope.file.theme = '';
        $scope.file.date = $filter('date')(new Date(),'yyyy-MM-dd');
        $scope.file.attachment = '';

        var uploader = $scope.uploader = new FileUploader({
            url: 'file/upload'
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
            $scope.file.attachment = response.filename;
        };

        uploader.onCompleteAll = function() {
            $scope.postFile();
        };

        $scope.uploadFile = function() {
            uploader.uploadAll();
        };

        $scope.cancel = function(){
            $state.go('contract.file');
        };

        $scope.checkInput = function(){
            if(uploader.queue.length > 0) {
                $scope.uploadFile();
            } else {
                $scope.postFile();
            }
        };

        $scope.postFile = function(){
            var data = {};
            data.file = $scope.file;
            FileService.postFile(data).then(function (result) {
                console.log(result);
                toaster.pop('success', '操作结果', '文件添加成功');
                $state.go('contract.file');
            }, function (err) {
                console.log(err);
                toaster.pop('error', '操作结果', '文件添加失败');
            });
        }
    });
});