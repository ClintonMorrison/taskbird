/**
 * Created by clinton on 1/14/2016.
 */

taskApp.service('util', function() {

    this.toDateRange = function (str) {
        if (!str || str === 'all') {
            return null;
        }
        var start, end, format = 'YYYY-MM-DD\\Thh:mm:ss';
        var parts = str.split(':')
        if (parts[0] === 'this') {
            start = moment().startOf(parts[1]);
            end = moment().endOf(parts[1]);
        } else if (parts[0] === 'days') {
            start = moment().startOf('day');
            if (parts[1] === '+') {
                end = moment().add(parseInt(parts[2], 10), 'days').endOf('day');
            } else {
                end = moment().subtract(parseInt(parts[2], 10), 'days').endOf('day');
            }
        } else if (parts[0] === 'date') {
            start = moment(parts[1], 'YYYY-MM-DD').startOf('day');
            end = moment(parts[1], 'YYYY-MM-DD').endOf('day');
        }

        if (!start || !end) {
            return null;
        }

        return [start, end];
    };

});