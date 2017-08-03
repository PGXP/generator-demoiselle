'use strict';

app.config(['$routeProvider', 'USER_ROLES',
    function ($routeProvider, USER_ROLES) {

        $routeProvider

                .when('/coordenador', {
                    templateUrl: 'views/coordenador/list.html',
                    controller: 'CoordenadorController',
                    data: {
                        authorizedRoles: [USER_ROLES.ADMINISTRADOR, USER_ROLES.COORDENADOR]
                    }
                })

                .when('/coordenador/edit', {
                    templateUrl: 'views/coordenador/edit.html',
                    controller: 'CoordenadorController',
                    data: {
                        authorizedRoles: [USER_ROLES.ADMINISTRADOR, USER_ROLES.COORDENADOR]
                    }
                })

                .when('/coordenador/edit/:id', {
                    templateUrl: 'views/coordenador/edit.html',
                    controller: 'CoordenadorController',
                    data: {
                        authorizedRoles: [USER_ROLES.ADMINISTRADOR, USER_ROLES.COORDENADOR]
                    }
                });

    }]);
