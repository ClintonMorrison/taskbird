/**
 * A service that handles showing modals
 *
 * @author Clinton Morrison
 * @date August 21, 2015
 */

window.ModalService = {};

(function () {
    var self = this;

    var _showModal = function(selector, title, content) {
        $(selector).find('.modal-title').text(title);
        $(selector).find('.modal-content').text(content);
        $(selector).modal('show');
    };

    ModalService.alert = function(title, message, callback) {
        if (!callback) {
            callback = function() {};
        }

        $('#modal-alert').modal({
            onHide: callback
        });

        _showModal('#modal-alert', title, message);
    };

    ModalService.confirm = function(title, message, callback) {
        if (!callback) {
            callback = function () {};
        }
        $('#modal-confirm').modal({
            onApprove: function() {
                callback(true);
            },
            onDeny: function() {
                callback(false);
            }
        });
        _showModal('#modal-confirm', title, message);
    };

    ModalService.promptText = function(title, message, callback) {
        if (!callback) {
            callback = function() {};
        }
        $('#modal-prompt').modal({
            onApprove: function() {
                callback($('#modal-text-input').val());
            },
            onDeny: function() {
                callback(false);
            }
        });
        _showModal('#modal-prompt', title, message);
    };
})();

$(document).ready(function () {
    $('.ui.modal').modal();
});
