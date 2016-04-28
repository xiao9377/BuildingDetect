define(['controllers/controllers'], function (controllers) {
    'use strict';
    controllers.controller('AdminContractSideMenuController', function ($scope, $state) {
        $scope.contractMenu = [
            {
                name: "已完成",
                url: 2
            },
            {
                name: "检测中",
                url: 1
            },
            {
                name: "未检测",
                url: 0
            }
        ];

        $scope.goToContractStateList = function (state) {
            $state.go('contract.state', {state: state});
        };
        $scope.reportMenu = [
            {
                name: "报告查看",
                url: "contract.report"
            },
            {
                name: "报告录入",
                url: "contract"
            }
        ];

        $scope.letterMenu = [
            {
                name: "联系函查看",
                url: "contract.letter"
            },
            {
                name: "文件查看",
                url: "contract.file"
            },
            {
                name: "添加文件",
                url: "contract.fileAdd"
            }
        ];

        $scope.projectMenu = [
            {
                name: "工程查看",
                url: "contract.project"
            },
            {
                name: "合同录入",
                url: "contractInput"
            }
        ];

        $scope.clickBlogItem = function () {
            $scope.groupBlog = !$scope.groupBlog;
        };
        $scope.clickEssayItem = function () {
            $scope.groupEssay = !$scope.groupEssay;
        };
        $scope.clickStateItem = function () {
            $scope.groupState = !$scope.groupState;
        };
        $scope.clickProjectItem = function () {
            $scope.groupProject = !$scope.groupProject;
        };
    });
});