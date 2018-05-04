angular.module('services')
.factory('locationService', ['$http', '$q', '$window', function ($http, $q, $window) {
    var location = {};

    location.get = function (search) {

        var d = $q.defer();
        $http.get('/api/Location/', { params: { key: search } })
        .then(function (data) {
            d.resolve(data);
        }, function (data) {
            d.resolve(data);
        });
        return d.promise;
    };

    location.add = function (model) {
        var d = $q.defer();
        $http.post('/api/Location/', model)
        .then(function (data) {
            d.resolve(data);
        }, function (data) {
            d.resolve(data);
        })

        return d.promise;
    };

    location.getVisitorCount = function () {
        var d = $q.defer();
        $http.get('/api/Location/Count')
        .then(function (data) {
            d.resolve(data);
        }, function (data) {
            d.resolve(data);
        })

        return d.promise;
    };

    location.lazyLoadMapApi = function () {
        var deferred = $q.defer()

        console.log('loadScript')
        var s = document.createElement('script')
        s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2RLC5cpU_XAyAA_HUoaaAJHsLYSw9Mdc&callback=initMap'
        document.body.appendChild(s);

        $window.initMap = function () {
            deferred.resolve()
        }
        return deferred.promise
    }

    return location;
}]);