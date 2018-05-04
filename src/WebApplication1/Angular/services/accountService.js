angular.module('services')
.factory('accountService', ['$http', '$q', 'Session', function ($http, $q, Session) {
    var account = {};

    account.signUp = function (userName) {
        //$http.post('/api/Account/SignUp', model)
        //.then(function (data) {
        //    d.resolve(data);
        //}, function (data) {
        //    d.resolve(data);
        //})

        //return d.promise;
        Session.set('UserName', userName);
    };
    account.signOff = function (userName) {
        Session.remove('UserName');
    }
    return account;
}]);