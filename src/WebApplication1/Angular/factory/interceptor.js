angular.module('interceptors', [])
.factory('httpRequestInterceptor', function ($q, $location, Session, $rootScope) {
    return {
        'request': function (request) {
            if ($location.$$path.indexOf("/error") != -1) {
                return request;
            }
            else if ($location.$$path.indexOf("/login") != -1 || (!Session.get('UserName'))) {
                if (Session.get('UserName'))
                    $location.path('/home');
                else {
                    $location.path('/login');
                }
            }else {
                $rootScope.UserName = Session.get('UserName');
            }
            return request;
        },
        'response': function (result) {
            return result;
        },
        'responseError': function (rejection) {
            if (rejection.status == 404) {
                $location.path('/error');
            }
            return $q.reject(rejection);
        }
    }
});