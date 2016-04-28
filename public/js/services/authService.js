/**
 * Created by yg on 2016/4/27.
 */
define(['services/services'], function (services) {
    'use strict';

    services.service('AuthService', function ($http) {

        var userRole = ['ADMIN', 'XINXI', 'EMPLOYEE', 'USER'];
        var userRoleRouteMap = {
            'ADMIN': ['/index', '/contractinput', 'contractmanage', '/humanresource', '/device'],
            'XINXI': ['/index', '/contractinput', 'contractmanage', '/humanresource', '/device'],
            'EMPLOYEE': ['/index', '/contractinput', 'contractmanage', '/humanresource', '/device'],
            'USER': ['/index']
        };

        var isUrlAccessibleForUser = function (auth, route) {
            console.log(auth);
            console.log(route);
            var validUrlsForRole = ['/index'];
            if(auth == 0){
                validUrlsForRole = userRoleRouteMap.ADMIN;
            }else if(auth == 1){
                validUrlsForRole = userRoleRouteMap.XINXI;
            }else if(auth == 2){
                validUrlsForRole = userRoleRouteMap.EMPLOYEE;
            }else if(auth == 3){
                validUrlsForRole = userRoleRouteMap.USER;
            }
            //console.log(validUrlsForRole);
            for (var j = 0; j < validUrlsForRole.length; j++) {
                console.log(validUrlsForRole[j]);
                if (validUrlsForRole[j] == route){
                    return true;
                }
            }
        };

        return {
            isUrlAccessibleForUser: function (auth, route) {
                isUrlAccessibleForUser(auth ,route);
            }
        }
    })
});