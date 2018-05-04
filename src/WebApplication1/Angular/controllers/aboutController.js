angular.module('controllers')
.controller('aboutController', ['$scope', 'locationService', 'Session', function ($scope, locationService, Session) {
//get current logged in user
    $scope.userFullName = Session.get('UserName');
	locationService.getVisitorCount()
		.then(function (response) {
			if (response.status == 200) {
				$scope.visitorCount = response.data;
			}
		});
}])