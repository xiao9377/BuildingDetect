define(['controllers/controllers'], function (controllers) {
    'use strict';
    controllers.controller('HomeController', function ($scope, toaster, $modal) {
        $scope.text = 'Lan';
        $scope.name = '';

        $scope.getUserInfo = function () {
            $scope.name = VersionService.getUserInfo();
            toaster.pop('success', '操作结果', '状态提交成功!');

            $modal.open({
                templateUrl: '../../views/tpls/ModalDialogStateEdit.html',
                resolve: {
                    //通过resolve传值给模态框的controller
                    data: function () {
                        return 'Lan';
                    }
                }
            });
        };

        //just for test
        $scope.news = [
            {
                id: 1,
                status: 0,
                text: "《习近平时代》：在中国改革，究竟有多难？"
            },
            {
                id: 2,
                status: 0,
                text: "李克强：做食品就是要良心打头"
            },
            {
                id: 3,
                status: 1,
                text: "人民币中间价跌逾200点 央行今日净投放1500亿元"
            },
            {
                id: 4,
                status: 1,
                text: "英媒：钢价急升 中国“僵尸”钢厂卷土重来"
            },
            {
                id: 5,
                status: 1,
                text: "吴官正退休后画铅笔画配诗骂贪官：贪污受贿骨头贱"
            },
            {
                id: 6,
                status: 1,
                text: "美战机飞越黄岩岛附近空域 接连挑衅争议地区"
            },
            {
                id: 7,
                status: 1,
                text: "联合国强烈谴责朝鲜发射潜射导弹：将采取进一步措施"
            }
        ];
        $scope.msgs = [
            {
                id: 1,
                status: 0,
                text: "这里可以显示通知和公告。"
            },
            {
                id: 2,
                status: 0,
                text: "这里可以显示通知和公告。"
            },
            {
                id: 3,
                status: 0,
                text: "这里可以显示通知和公告。"
            }
        ];
    });
})
;
