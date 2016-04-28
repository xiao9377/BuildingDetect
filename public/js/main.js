require.config({
    paths: {
        // 注意后面不能加.js
        'angular': '../components/angular/angular',
        'ui-router': '../components/angular-ui-router/release/angular-ui-router',
        'domReady': '../components/requirejs-domready/domReady',
        'angular-file-upload': '../components/angular-file-upload/angular-file-upload.min',
        'toaster': '../components/angularjs-toaster/toaster',
        'ui-bootstrap': '../components/ui-bootstrap-tpls-0.11.0',
        'jquery': '../components/jquery/dist/jquery.min',
        'jqcloud': '../components/jqcloud2/dist/jqcloud',
        'angular-jqcloud': '../components/angular-jqcloud',
        'tittwer-bootstrap': '../components/bootstrap/dist/js/bootstrap.min',
        'socket-io': '../components/socket.io',
        'moment': '../components/moment',
        'ng-datepicker': '../components/angular-bootstrap3-datepicker/ng-bs3-datepicker',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui-router': {
            deps: ['angular']
        },
        'angular-file-upload': {
            deps: ['angular']
        },
        'toaster': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular']
        },
        'tittwer-bootstrap': {
            deps: ['jquery']
        },
        'jqcloud': {
            deps: ['jquery']
        },
        'angular-jqcloud': {
            deps: ['angular', 'jquery', 'jqcloud']
        },
        'socket-io': {
            exports: 'io'
        },
        'ng-datepicker': {
            deps: ['angular', 'jquery', 'tittwer-bootstrap', 'moment']
        }
    },
    deps: [
        './bootstrap'
    ]
});

require([
    'jquery',
    'tittwer-bootstrap',
], function ($, _bootstrap, datetimepicker) {
    // this is where all the site code should begin
    return {};
});

require([
        'app',
        'bootstrap',
        'controllers/controllers',
        'services/services',
        'directives/directives',
        'filters/filters'],
    function (app) {
        'use strict';
        return app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/index');

            $stateProvider.state('index', {
                    url: '/index',
                    templateUrl: '../views/tpls/Home.html',
                    controller: 'HomeController'
                })
                .state('contract', {
                    url: '/contractmanage',
                    views: {
                        '': {
                            templateUrl: '../views/tpls/ContractManage.html',
                        },
                        'sidebar@contract': {
                            templateUrl: '../views/tpls/ContractManageSidebar.html',
                            controller: 'AdminContractSideMenuController'
                        },
                        'content@contract': {
                            templateUrl: '../views/tpls/ContractList.html',
                            controller: 'ContractListController'
                        }
                    }
                })
                .state('contract.detail', {
                    url: '/detail/:contractId',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/ContractDetail.html',
                            controller: 'ContractDetailController'
                        }
                    }
                })
                .state('contract.report', {
                    url: '/report',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/ReportList.html',
                            controller: 'ReportListController'
                        }
                    }
                })
                .state('contract.letter', {
                    url: '/letter',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/LetterList.html',
                            controller: 'LetterListController'
                        }
                    }
                })
                .state('contract.file', {
                    url: '/file',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/FileList.html',
                            controller: 'FileListController'
                        }
                    }
                })
                .state('contract.state', {
                    url: '/state/:state',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/ContractListType.html',
                            controller: 'ContractStateListController'
                        }
                    }
                })
                .state('contract.fileAdd', {
                    url: '/fileadd',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/FileAdd.html',
                            controller: 'FileAddController'
                        }
                    }
                })
                .state('contract.project', {
                    url: '/project',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/ProjectList.html',
                            controller: 'ProjectListController'
                        }
                    }
                })
                .state('contract.addContract', {
                    url: '/add/:projectId',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/AddContract.html',
                            controller: 'AddContractController'
                        }
                    }
                })
                .state('contract.chargeInput',{
                    url: '/chargeinput/:contractId',
                    views: {
                        'content@contract': {
                            templateUrl: '../views/tpls/ChargeInput.html',
                            controller: 'ChargeInputController'
                        }
                    }
                })
                .state('contractInput', {
                    url: '/contractinput',
                    templateUrl: '../views/tpls/ContractInput.html',
                    controller: 'ContractInputController'
                })
                .state('employee', {
                    url: '/humanresource',
                    templateUrl: '../views/tpls/HumanResource.html',
                    controller: 'HRController'
                })
                .state('employeeAdd', {
                    url: '/employeeadd',
                    templateUrl: '../views/tpls/EmployeeAdd.html',
                    controller: 'EmployeeAddController'
                })
                .state('employeeDetail', {
                    url: '/employeedetail/:employeeId',
                    templateUrl: '../views/tpls/EmployeeDetail.html',
                    controller: 'EmployeeDetailController'
                })
                .state('device', {
                    url: '/device',
                    templateUrl: '../views/tpls/Device.html',
                    controller: 'DeviceController'
                })
                .state('deviceAdd', {
                    url: '/deviceadd',
                    templateUrl: '../views/tpls/DeviceAdd.html',
                    controller: 'DeviceAddController'
                })
                .state('deviceDetail', {
                    url: '/devicedetai/:deviceId',
                    templateUrl: '../views/tpls/DeviceDetail.html',
                    controller: 'DeviceDetailController'
                })
                .state('employeeUserList', {
                    url: '/userlist',
                    templateUrl: '../views/tpls/UserList.html',
                    controller: 'UserListController'
                })
                .state('employeeUserDetail', {
                    url: '/userdetail/:userId',
                    templateUrl: '../views/tpls/UserDetail.html',
                    controller: 'UserDetailController'
                });
        }]);
    }
);
