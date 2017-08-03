'use strict';

app.config(['$routeProvider', 'USER_ROLES',
    function ($routeProvider, USER_ROLES) {

        $routeProvider

                .when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'AuthController',
                    data: {
                        authorizedRoles: [USER_ROLES.NOT_LOGGED]
                    }
                })

                .when('/usuario/senha/:id', {
                    templateUrl: 'views/usuario/senha.html',
                    controller: 'AuthController',
                    data: {
                        authorizedRoles: [USER_ROLES.NOT_LOGGED]
                    }
                })

                .when('/aminesia/', {
                    templateUrl: 'views/aminesia.html',
                    controller: 'AuthController',
                    data: {
                        authorizedRoles: [USER_ROLES.NOT_LOGGED]
                    }
                })

                .when('/usuario/senha/', {
                    templateUrl: 'views/usuario/senha.html',
                    controller: 'AuthController',
                    data: {
                        authorizedRoles: [USER_ROLES.COORDENADOR, USER_ROLES.PROFESSOR, USER_ROLES.ATENDENTE]
                    }
                });

    }]);
