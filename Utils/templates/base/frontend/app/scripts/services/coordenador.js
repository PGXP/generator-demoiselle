'use strict';

app.factory('CoordenadorService', ['$http', function ($http) {
        var service = {};

        service.get = function (id) {
            return $http.get('api/coordenadors/' + id).then(function (res) {
                return res;
            });
        };

        service.delete = function (id) {
            return $http.delete('api/coordenadors/' + id).then(function (res) {
                return res;
            });
        };

        service.save = function (coordenador) {
            return $http({
                url: 'api/coordenadors',
                method: coordenador.id ? "PUT" : "POST",
                data: coordenador
            }).then(
                    function (res) {
                        return res;
                    }
            );
        };

        service.list = function (field, order, init, qtde) {
            return $http.get('api/coordenadors/' + '?sort=' + field).then(
                    function (res) {
                        return res;
                    }
            );

        };

        service.findAll = function () {
            return $http.get('api/coordenadors?sort=fullname').then(function (res) {
                return res;
            });
        };

        service.searchByName = function (name) {
            return $http.get('api/coordenadors/searchByName/' + name).then(
                    function (res) {
                        return res;
                    }
            );

        };

        return service;
    }]);

