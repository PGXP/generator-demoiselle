'use strict';

app.controller('AuthController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$location', '$routeParams', 'AlertService',
    function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location, $routeParams, AlertService) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        var id = $routeParams.id;
        var path = $location.$$url;

        if (path === '/usuario/senha/' + id) {
            $scope.credentials.username = id;
        }

        $scope.change = function (credentials) {

            if ($rootScope.currentUser)
                $scope.credentials.username = $rootScope.currentUser.identity;

            if (credentials.password) {

                AuthService.change(credentials).then(function () {
                    $("#message").html("Senha Atualizada");
                },
                        function (response) {
                            error(response.data, response.status);
                        });
            }
        };

        $scope.login = function (credentials) {
            if (credentials.username && credentials.password) {
                AuthService.login(credentials).then(function (res) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                },
                        function (res) {
                            var data = res.data[0].error;
                            var status = res.status;

                            if (status === 401) {
                                AlertService.addWithTimeout('warning', data);
                            } else if (status === 412 || status === 422) {
                                AlertService.addWithTimeout('warning', data);
                            } else if (status === 403) {
                                AlertService.showMessageForbiden();
                            }

                        });
            } else {
                AlertService.addWithTimeout('warning', 'Preencha os campos');
            }
        };

        $scope.aminesia = function (credentials) {

            if (credentials.username) {
                AuthService.aminesia(credentials).then(function () {

                },
                        function (response) {
                            error(response.data, response.status);
                        });
            }
        };

        $scope.logout = function () {
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

    }
]);