/**
 * Created by yg on 2016/4/22.
 */
define(['services/services'], function (services) {
    'use strict';

    services.service('DateService', function ($http, $q, $filter) {

        var dateDiff = function (validDate) {
            validDate = $filter('date')(validDate, 'yyyy-MM-dd');
            //console.log('validDate: '+validDate);
            var newDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            //console.log('now date : '+newDate);
            var date1 = new Date(Date.parse(validDate.replace(/-/g, "/"))).getTime();
            var date2 = new Date(Date.parse(newDate.replace(/-/g, "/"))).getTime();
            return (date1 - date2) / 1000 / 60 / 60 / 24; //返回相差天数
        };

        return{
            dateDiff: function(date){
                return dateDiff(date);
            }
        }
    });
});