var moment = require('moment');

exports.getDateRange = function (date) {
    var strings = (date + '').split('-');
    var currentMonth = parseInt(strings[1].substr(1, 1));
    var nextMonth = currentMonth + 1;
    var nextMonthStr = strings[0] + '-';
    if (nextMonth < 10) {
        nextMonthStr += ('0' + nextMonth);
    } else {
        nextMonthStr += ('' + nextMonth);
    }

    var result = {};
    result.from = new Date(date + '-01');
    result.to = new Date(nextMonthStr + '-01');

    return result;
};

exports.getYearRange = function (year) {
    var result = {};
    result.from = new Date(year + '-01-01');
    result.to = new Date((year + 1) + '-01-01');
    return result;
};

exports.getDateString = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var monthStr = '';
    if (month < 10) {
        monthStr = '0' + month;
    } else {
        monthStr = '' + month;
    }
    var day = date.getDate();
    var dayStr = '';
    if (day < 10) {
        dayStr = '0' + day;
    } else {
        dayStr = '' + day;
    }
    return '' + year + monthStr + dayStr;
};

var getDateString = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var monthStr = '';
    if (month < 10) {
        monthStr = '0' + month;
    } else {
        monthStr = '' + month;
    }
    var day = date.getDate();
    var dayStr = '';
    if (day < 10) {
        dayStr = '0' + day;
    } else {
        dayStr = '' + day;
    }
    return '' + year + '-' + monthStr +'-'+ dayStr;
};

exports.getDateTimeString = function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var monthStr = '';
    if (month < 10) {
        monthStr = '0' + month;
    } else {
        monthStr = '' + month;
    }
    var day = date.getDate();
    var dayStr = '';
    if (day < 10) {
        dayStr = '0' + day;
    } else {
        dayStr = '' + day;
    }
    var hour = date.getHours();
    var hourStr = '';
    if (hour < 10) {
        hourStr = '0' + hour;
    } else {
        hourStr = '' + hour;
    }
    var minute = date.getMinutes();
    var minuteStr = '';
    if (minute < 10) {
        minuteStr = '0' + minute;
    } else {
        minuteStr = '' + minute;
    }
    var second = date.getSeconds();
    var secondStr = '';
    if (second < 10) {
        secondStr = '0' + second;
    } else {
        secondStr = '' + second;
    }
    return '' + year + monthStr + dayStr + hourStr + minuteStr + secondStr;
};

exports.dateDiff = function (validDate) {
    var now = getDateString();
    validDate = moment(validDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
    //console.log(validDate);
    var date1 = new Date(Date.parse(validDate.replace(/-/g, "/"))).getTime();
    var date2 = new Date(Date.parse(now.replace(/-/g, "/"))).getTime();
    //console.log((date1 - date2)/ 1000 / 60 / 60 / 24);
    return (date1 - date2) / 1000 / 60 / 60 / 24; //返回相差天数
};
