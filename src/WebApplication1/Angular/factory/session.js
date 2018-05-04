angular.module('myapp')
.factory('Session', [function () {
    var Session = {
        set: function (key, value) {
            return sessionStorage.setItem(key, value);
        },
        get: function (key) {
            return sessionStorage.getItem(key);
        },
        remove: function(key) {
            return sessionStorage.removeItem(key);
        }
    };
    return Session;
}])