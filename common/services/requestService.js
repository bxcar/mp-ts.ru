/**
 * Created by Vista on 27.01.17.
 */

var requestService = {
    get: function (action, data, successCallback, errorCallback) {
        $.get(urlService.api + action, data)
            .then(function (result) {
                successCallback(result)
            }, function (result) {
                errorCallback(result)
            });
    },
    post: function (action, data, successCallback, errorCallback) {
        $.post(urlService.api + action, data)
            .then(function (result) {
                successCallback(result)
            }, function (result) {
                errorCallback(result)
            });
    }
}