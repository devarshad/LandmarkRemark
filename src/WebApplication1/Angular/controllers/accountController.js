angular.module('controllers')
.controller('accountController', ['$location', '$scope', '$rootScope', '$filter', 'accountService', function ($location, $scope, $rootScope, $filter, accountService) {
    $scope.signUp = function (e) {
        var isValid = true;
        if (e) {
            if ($scope.txtUserName == null || $scope.txtUserName=='' || e.which != 13) {
                isValid = false;
            }
        }
        if (isValid) {
            accountService.signUp($scope.txtUserName)
            $rootScope.UserName = $scope.txtUserName;
            //redirect to homepage
            $location.path('/');
        }
    }
    $scope.signOff = function () {
        accountService.signOff($rootScope.UserName)
        $location.path('/login');
    }
}])