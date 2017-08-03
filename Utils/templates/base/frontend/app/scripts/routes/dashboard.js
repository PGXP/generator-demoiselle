'use strict';

app.config(['$routeProvider', 'USER_ROLES',
    function ($routeProvider, USER_ROLES) {

        $routeProvider

                .when('/', {
                    templateUrl: 'views/dashboard/diario.html',
                    controller: 'DiarioController',
                    data: {
                        authorizedRoles: [USER_ROLES.COORDENADOR, USER_ROLES.ADMINISTRADOR, USER_ROLES.PROFESSOR, USER_ROLES.ATENDENTE]
                    }
                })

                .when('/diario', {
                    templateUrl: 'views/dashboard/diario.html',
                    controller: 'DiarioController',
                    data: {
                        authorizedRoles: [USER_ROLES.COORDENADOR, USER_ROLES.ADMINISTRADOR, USER_ROLES.PROFESSOR, USER_ROLES.ATENDENTE]
                    }
                })

                .when('/dashboard', {
                    templateUrl: 'views/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    data: {
                        authorizedRoles: [USER_ROLES.COORDENADOR, USER_ROLES.ADMINISTRADOR]
                    }
                });

    }]);