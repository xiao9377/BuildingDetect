define(['services/services', 'socket-io'], function (services, io) {
    'use strict';

    //我们把socket服务定义成了一个factory，这样它只会被实例化一次，而且在整个应用的作用域范围内就成为了一个单例
    services.factory('socket', function ($rootScope) {

        var socket = io(); //默认连接部署网站的服务器

        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () { // 在AngularJS上下文之外更新了model，所以手动执行脏检查
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () { // 在AngularJS上下文之外更新了model，所以手动执行脏检查
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });

});
