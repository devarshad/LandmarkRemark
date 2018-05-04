angular.module('controllers')
.controller('locationController', ['$window', '$scope', '$rootScope', '$filter', 'locationService', function ($window, $scope, $rootScope, $filter, locationService) {

    $scope.locations = [];

    // InfoWindow content
    var content = '<div id="iw-container">' +
                      '<div class="iw-title">@@userName</div>' +
                      '<div class="iw-content">@@remark</div>' +
                      '<div class="iw-bottom-gradient"></div>' +
                    '</div>';

    var myContent = '<div id="iw-container">' +
                              '<div class="iw-title">@@userName</div>' +
                              '<div class="iw-content" style="overflow:hidden !important;">' +
                                    '<textarea ng-model="location.Remark"  placeholder="Add a note.." id="myNote"></textarea>' +
                                    '<span><i id="okNote" class="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;<i id="cancelNote" class="fa fa-times" aria-hidden="true"></i></span>' +
                                '</div>' +
                              '<div class="iw-bottom-gradient"></div>' +
                            '</div>';


    var map = {};
    var bounds = [];
    var _markers = [];
    var currentLocationMarker = null;
    $scope.location = {};
    $scope.location.UserName = $rootScope.UserName;
    var myLocationAdded = true;

    locationService.lazyLoadMapApi().then(function () {
        map = $window.map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: new google.maps.LatLng(26.0667, 50.577)
        });
        addPostions('', function (_remoteData) {
            //setTimeout(function () {
                var currentLocation = new google.maps.LatLng(26.0667, 50.577);

                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        currentLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        var myData = $filter('filter')(_remoteData, { UserName: $rootScope.UserName, 'Position.Latitude': currentLocation.lat, 'Position.Longitude': currentLocation.lng }, true);
                        if (myData.length == 0) {
                            myLocationAdded = false;
                            currentLocationMarker = new google.maps.Marker({
                                position: currentLocation,
                                map: map
                            });
                            bounds.extend(currentLocationMarker.getPosition());
                            currentLocationMarker.InfoWindow = new google.maps.InfoWindow({
                                content: myContent.replace('@@userName', $rootScope.UserName),
                                position: currentLocation,
                                // Assign a maximum value for the width of the infowindow allows
                                // greater control over the various content elements
                                maxWidth: 100
                            });


                            google.maps.event.addListener(currentLocationMarker, 'click', function () {
                                currentLocationMarker.InfoWindow.open(map);
                                document.getElementById('myNote').focus();

                                $('#okNote').one('click', function () {
                                    $scope.location.Position = { Latitude: currentLocation.lat, Logitude: currentLocation.lng, Remark: $('#myNote')[0].value.replace(/\r?\n/g, '<br/>') };
                                    locationService.add($scope.location)
                                            .then(function (response) {
                                                if (response.status == 200) {
                                                    $('#myNote').parent().css({ 'overflow-y': 'auto' });
                                                    $('#myNote').parent().html($('#myNote')[0].value.replace(/\r?\n/g, '<br/>'));
                                                    document.getElementsByClassName('gm-style-iw')[_remoteData.length].
                                                            getElementsByClassName('iw-bottom-gradient')[0].style.display = "inline-block";
                                                }
                                            });
                                });
                                $('#cancelNote').one('click', function () {
                                    $('#myNote')[0].value = "";
                                    currentLocationMarker.InfoWindow.close();
                                });
                            });

                            google.maps.event.addListener(currentLocationMarker.InfoWindow, 'domready', function () {
                                // Reference to the DIV that wraps the bottom of infowindow
                                positionInfoWindow(document.getElementsByClassName('gm-style-iw')[_remoteData.length]);
                                //Hide bottom gradient
                                document.getElementsByClassName('gm-style-iw')[_remoteData.length].
                                    getElementsByClassName('iw-bottom-gradient')[0].style.display = "none";
                            }); 
                        }
                        map.fitBounds(bounds);

                    }, function (status) {
                    });
                }
            //}, 10);
        });

    });

    $scope.search = function (e) {
        var isSearch = true;
        if (e) {
            if (e.which != 13) {
                isSearch = false;
            }
        }
        if (isSearch) {
            resetMap();
            addPostions($scope.key, function () { });
        }
    }

    function resetMap() {
        if (_markers && _markers.length > 0) {
            angular.forEach(_markers, function (object, index) {
                object.InfoWindow.close();
                object.setMap(null);
            })
        }
        if (myLocationAdded && currentLocationMarker) {
            currentLocationMarker.InfoWindow.close();
            currentLocationMarker.setMap(null);
        }
    }

    function addPostions(key, callback) {
        bounds = new google.maps.LatLngBounds();

        locationService.get(key)
        .then(function (response) {
            if (response.status == 200) {
                var data = response.data;

                _markers = new Array(data.length);
                angular.forEach(data, function (object, index) {
                    // marker options
                    _markers[index] = new google.maps.Marker({
                        position: { lat: object.Position.Latitude, lng: object.Position.Logitude },
                        map: map,
                        title: object.Position.Remark
                    });

                    _markers[index].InfoWindow = new google.maps.InfoWindow({
                        content: content.replace('@@userName', object.UserName).replace('@@remark', object.Position.Remark),
                        position: { lat: object.Position.Latitude, lng: object.Position.Logitude },
                        // Assign a maximum value for the width of the infowindow allows
                        // greater control over the various content elements
                        maxWidth: 100
                    });

                    _markers[index].InfoWindow.open(map);
                    bounds.extend(_markers[index].getPosition());
                    google.maps.event.addListener(_markers[index].InfoWindow, 'domready', function () {
                        // Reference to the DIV that wraps the bottom of infowindow
                        positionInfoWindow(document.getElementsByClassName('gm-style-iw')[index]);
                    });
                });
                callback(data);
            }
        });
    }

    function positionInfoWindow(iwOuter) {
        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
        */

        var iwBackground = iwOuter.previousSibling;

        // Removes background shadow DIV
        iwBackground.children[1].style.display = 'none';

        // Removes white background DIV
        iwBackground.children[3].style.display = 'none';

        // Moves the infowindow 115px to the right.
        iwOuter.parentNode.parentNode.style.top = "-10px";

        // Remove close button
        iwOuter.nextSibling.style.display = "none"

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if (iwOuter.getElementsByClassName('iw-content')[0].offsetHeight < 65) {
            iwOuter.getElementsByClassName('iw-bottom-gradient')[0].style.display = "none";
        }
    }
}])