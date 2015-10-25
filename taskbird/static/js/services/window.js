/**
 * Created by clinton on 10/24/2015.
 */

var windowService = angular.module('windowService', ['$rootScope', '$timeout']);

taskApp.service('windowService', ['$rootScope', '$timeout', function($rootScope, $timeout) {

    var sizeData = {};

    var _updateSizeData = function () {
        $timeout(function () {
            $rootScope.$apply(function () {
               sizeData.width = $(window).width();
                sizeData.height = $(window).height();
            });
        });

    };

    $(window).resize(_.debounce(function () { _updateSizeData();}, 500));
    _updateSizeData();

    this.getDimensions = function () {
        return sizeData;
    };

    this.scrollToBottom = function () {
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    }

    this.scrollToElement = function (selector) {
        $("html, body").animate({ scrollTop: $(selector).offset().top - 20 }, "slow");
    }
}]);