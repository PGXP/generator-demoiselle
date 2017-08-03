'use strict';
var app = angular.module('app', [
    'ngAria',
    'ngAnimate',
    'ngResource',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngWebsocket',
    'ngMaterial',
    'ngMdIcons',
    'socialLogin',
    'Config'
]).config(['$routeProvider', 'USER_ROLES', '$websocketProvider', 'socialProvider', '$mdThemingProvider', '$mdProgressCircularProvider',
    function ($routeProvider, USER_ROLES, $websocketProvider, socialProvider, $mdThemingProvider, $mdProgressCircularProvider) {

        socialProvider.setGoogleKey("cod_google");
        socialProvider.setFbKey({appId: "id", apiVersion: "v2.10"});

        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });

        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
                .primaryPalette('customBlue', {
                    'default': '500',
                    'hue-1': '50'
                })
                .accentPalette('red');
        $mdThemingProvider.theme('input', 'default')
                .primaryPalette('grey');

        $mdProgressCircularProvider.configure({
            progressSize: 100,
            strokeWidth: 20,
            duration: 800
        });

        $websocketProvider.$setup({
            lazy: false,
            reconnect: true,
            reconnectInterval: 777,
            mock: false,
            enqueue: true
        });

        $routeProvider.otherwise({
            redirectTo: '/dashboard',
            data: {
                authorizedRoles: [USER_ROLES.COORDENADOR, USER_ROLES.PROFESSOR]
            }
        });

        $routeProvider.when('/403', {
            templateUrl: 'views/login.html',
            controller: 'AuthController',
            data: {
                authorizedRoles: [USER_ROLES.NOT_LOGGED]
            }
        });

        $routeProvider.when('/privacidade', {
            templateUrl: 'views/privacidade.html',
            controller: 'AuthController',
            data: {
                authorizedRoles: [USER_ROLES.NOT_LOGGED]
            }
        });

    }
]);

app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.useApplyAsync(true);
        $httpProvider.interceptors.push(['$q', '$rootScope', 'AppService', 'ENV', function ($q, $rootScope, AppService, ENV) {
                return {
                    'request': function (config) {
                        $rootScope.$broadcast('loading-started');
                        var token = AppService.getToken();
                        if (config.url.indexOf("http") === -1) {
                            if (config.url.indexOf("api") !== -1) {
                                config.url = ENV.apiEndpoint + config.url;
                            }
                        }

                        if (token) {
                            config.headers['Authorization'] = 'JWT ' + token;
                        }

                        return config || $q.when(config);
                    },
                    'response': function (response) {
                        $rootScope.$broadcast('loading-complete');
                        return response || $q.when(response);
                    },
                    'responseError': function (rejection) {
                        $rootScope.$broadcast('loading-complete');
                        return $q.reject(rejection);
                    },
                    'requestError': function (rejection) {
                        $rootScope.$broadcast('loading-complete');
                        return $q.reject(rejection);
                    }
                };
            }]);
        $httpProvider.interceptors.push(['$injector', function ($injector) {
                return $injector.get('AuthInterceptor');
            }]);
    }]);
app.run(['$rootScope', '$location', '$window', 'AUTH_EVENTS', 'APP_EVENTS', 'USER_ROLES', 'AuthService', 'AppService', 'AlertService',
    function ($rootScope, $location, $window, AUTH_EVENTS, APP_EVENTS, USER_ROLES, AuthService, AppService, AlertService) {

        $rootScope.$on('$routeChangeStart', function (event, next) {

            if (next.redirectTo !== '/') {
                var authorizedRoles = next.data.authorizedRoles;
                if (authorizedRoles.indexOf(USER_ROLES.NOT_LOGGED) === -1) {

                    if (!AuthService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if (AuthService.isAuthenticated()) {
                            // user is not allowed
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            // user is not logged in
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                }
            }
        });

        $rootScope.$on('event:social-sign-in-success', function (event, userDetails) {
            AuthService.social(userDetails).then(
                    function (res) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    },
                    function (res) {
                        AlertService.addWithTimeout('warning', 'Utilize usuário e senha');
                    });
        });

        $rootScope.$on('event:social-sign-out-success', function (event, logoutStatus) {

        });

        $rootScope.$on(AUTH_EVENTS.quantidade, function (emit, args) {
            $rootScope.$apply(function () {
                $rootScope.conectados = args.emit.data;
            });
        });

        $rootScope.$on(AUTH_EVENTS.lista, function (emit, args) {
            $rootScope.$apply(function () {
                $rootScope.lista = JSON.parse(args.emit.data);
            });
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
            $location.path("/403");
        });
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
            $rootScope.currentUser = null;
            AppService.removeToken();
            $location.path("/login");
        });
        $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
            AppService.removeToken();
            $location.path("/login");
        });
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
            $rootScope.currentUser = null;
            AppService.removeToken();
            $location.path('/login');
        });
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            $window.location.reload();
            $location.path('/dashboard');
        });
        $rootScope.$on(APP_EVENTS.offline, function () {
            AlertService.clear();
            AlertService.addWithTimeout('danger', 'Servidor está temporariamente indisponível, tente mais tarde');
        });

        $window.addEventListener('load', function (e) {
            $window.applicationCache.addEventListener('updateready', function (e) {
                if ($window.applicationCache.status === $window.applicationCache.UPDATEREADY) {
                    $window.location.reload();
                }
            }, false);
        }, false);
    }]);

app.constant('APP_EVENTS', {
    offline: 'app-events-offline'
});
app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    exit: 'exit',
    push: 'push',
    sistema: 'sistema',
    quantidade: 'count',
    lista: 'list'
});
app.constant('USER_ROLES', {
    ADMINISTRADOR: 'ADMINISTRADOR',
    GERENTE: 'GERENTE',
    COORDENADOR: 'GERENTE',
    ATENDENTE: 'ATENDENTE',
    VISITANTE: 'VISITANTE',
    NOT_LOGGED: 'NOT_LOGGED'
});

app.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', 'APP_EVENTS',
    function ($rootScope, $q, AUTH_EVENTS, APP_EVENTS) {

        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    '-1': APP_EVENTS.offline,
                    0: APP_EVENTS.offline,
                    404: APP_EVENTS.offline,
                    503: APP_EVENTS.offline,
                    412: APP_EVENTS.validate,
                    401: AUTH_EVENTS.notAuthenticated,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    }]);
