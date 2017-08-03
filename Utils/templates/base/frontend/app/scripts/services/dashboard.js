'use strict';

app.factory('DashboardService', ['$http', function ($http) {

        var service = {};

        service.get = function () {
            return $http.get('api/constantes/perfil').then(function (res) {
                return res;
            });
        };

        service.delete = function () {
            return $http.delete('api/constantes/perfil').then(function (res) {
                return res;
            });
        };

        service.put = function () {
            return $http.put('api/constantes/perfil').then(function (res) {
                return res;
            });
        };

        service.post = function () {
            return $http.post('api/constantes/perfil').then(function (res) {
                return res;
            });
        };

        service.patch = function () {
            return $http.patch('api/constantes/perfil').then(function (res) {
                return res;
            });
        };

        return service;
    }]);

