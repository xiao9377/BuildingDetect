define(['controllers/controllers'], function (controllers) {

    controllers.controller('NavBarController', function ($scope, $filter, $http, $rootScope, $state, $location, AuthService, DeviceService, ContractService) {

        $scope.navItems = {
            index: true,
            contractInput: false,
            contract: false,
            employee: false,
            device: false,
        };

        $scope.changeState = function (state) {
            for (item in $scope.navItems) {
                if (item == state) {
                    $scope.navItems[item] = true;
                } else {
                    $scope.navItems[item] = false;
                }
            }
            if($scope.auth == 3){
                $state.go('index');
            }
        };

        $scope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {

            if (toState.name.match(/contractInput*/g)) {
                $scope.changeState('contractInput');
            } else if (toState.name.match(/contract*/g)) {
                $scope.changeState('contract');
            } else if (toState.name.match(/employee*/g)) {
                $scope.changeState('employee');
            } else if (toState.name.match(/device*/g)) {
                $scope.changeState('device');
            } else {
                $scope.changeState('index');
            }
        });

        $scope.dateDiff = function (validDate) {
            validDate = $filter('date')(validDate, 'yyyy-MM-dd');
            //console.log('validDate: '+validDate);
            var newDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            //console.log('now date : '+newDate);
            var date1 = new Date(Date.parse(validDate.replace(/-/g, "/"))).getTime();
            var date2 = new Date(Date.parse(newDate.replace(/-/g, "/"))).getTime();
            return (date1 - date2) / 1000 / 60 / 60 / 24; //返回相差天数
        };

        $scope.deviceWarning = false;
        $scope.contractWarning = false;

        $scope.haveWarningDevice = function(){
            var n =0;
            DeviceService.getAllDevices().then(function(result){
                //console.log(result);
                var count = result.count;
                var devices = result.results;
                for(var i=0; i<count; i++){
                    if($scope.dateDiff(devices[i].validDate)<=30){
                        n++;
                    }
                }
                //console.log(n);
                if(n > 0){
                    $scope.deviceWarning = true;
                    //console.log($scope.deviceWarning);
                }
            }, function (err) {
                console.log(err);
            });
        };
        $scope.haveWarningContract = function(){
            var n =0;
            ContractService.getAllContracts().then(function(result){
                //console.log(result);
                var count = result.count;
                var contracts = result.results;
                for(var i=0; i<count; i++){
                    contracts[i].payment.forEach(function(item){
                        if(!item.isFinished && ($scope.dateDiff(item.time)<=0)){
                            n++;
                        }
                    });
                }
                //console.log(n);
                if(n > 0){
                    $scope.contractWarning = true;
                    //console.log($scope.contractWarning);
                }
            }, function (err) {
                console.log(err);
            });
        };
        $scope.haveWarningDevice();
        $scope.haveWarningContract();

        $scope.getUser = function(){
            $http({
                method: 'GET',
                url: '/getuser',
                timeout: 6000
            }).success(function(data){
                //console.log('get user success!');
                //console.log(data);
                $scope.userName = data.user.name;
                $scope.auth = data.user.authority;
            }).error(function(error){
                console.log(error);
            });
        };
        $scope.getUser();

        $scope.logout = function(){
            $http({
                method: 'GET',
                url: '/logout',
                timeout: 6000
            }).success(function (data) {
                console.log('logout...');
                window.location.href = '/login';
            }).error(function (error) {
                console.log(error);
            });
        };

        //$scope.isAccess = false;
        //$scope.setUserAccess = function(){
        //    $scope.isAccess = ($scope.auth != 3);
        //    //console.log($scope.isAccess);
        //};
        //$scope.setUserAccess();
        //$rootScope.$on('$stateChangeStart', function(event, next, current){
            //console.log($scope.auth);
            //if(!AuthService.isUrlAccessibleForUser($scope.auth, next.url)){
                //console.log(!AuthService.isUrlAccessibleForUser($scope.auth, next.url));
                //$rootScope.$on('$stateChangeSuccess', function(event, next, current){
                //    window.location.href = '/#/index';
                //});
                //$location.path('/index');
            //}
        //})
    });
});