'use strict';

app.controller('CoordenadorController', ['$scope', '$location', '$routeParams', '$rootScope', 'CoordenadorService', 'AlertService', 'ValidationService',
    function ($scope, $location, $routeParams, $rootScope, CoordenadorService, AlertService, ValidationService) {

        $scope.coordenador = {};

        var id = $routeParams.id;
        var path = $location.$$url;

        if (path === '/coordenador') {
            ValidationService.clear();
            $scope.coordenadors = [];
            CoordenadorService.findAll().then(
                    function (res) {
                        $scope.coordenadors = res.data;
                    },
                    function (res) {

                        var data = res.data;
                        var status = res.status;
                        var message = res.message;

                        if (status === 401) {
                            AlertService.addWithTimeout('warning', message);
                        } else if (status === 412 || status === 422) {
                            ValidationService.registrarViolacoes(data);
                        } else if (status === 403) {
                            AlertService.showMessageForbiden();
                        }

                    }
            );
        }

        if (path === '/coordenador/edit') {
            ValidationService.clear();
            $scope.coordenador = {};
        }


        if (path === '/coordenador/edit/' + id) {
            ValidationService.clear();
            CoordenadorService.get(id).then(
                    function (res) {
                        $scope.coordenador = res.data;

                    },
                    function (res) {

                        var data = res.data;
                        var status = res.status;
                        var message = res.message;

                        if (status === 401) {
                            AlertService.addWithTimeout('warning', message);
                        } else if (status === 412 || status === 422) {
                            ValidationService.registrarViolacoes(data);
                        } else if (status === 403) {
                            AlertService.showMessageForbiden();
                        }

                    }

            );
        }

        $scope.new = function () {
            $location.path('/coordenador/edit');
        };

        $scope.save = function () {

            CoordenadorService.save($scope.coordenador).then(
                    function (res) {
                        AlertService.addWithTimeout('success', 'Coordenador salvo com sucesso');
                        $location.path('/coordenador');
                    },
                    function (res) {

                        var data = res.data;
                        var status = res.status;
                        var message = res.message;

                        if (status === 401) {
                            AlertService.addWithTimeout('warning', message);
                        } else if (status === 412 || status === 422) {
                            ValidationService.registrarViolacoes(data);
                        } else if (status === 403) {
                            AlertService.showMessageForbiden();
                        }

                    }
            );
        };

        $scope.delete = function () {
            CoordenadorService.delete($scope.coordenador.id).then(
                    function () {
                        AlertService.addWithTimeout('success', 'Coordenador removido com sucesso');
                        $location.path('/coordenador');

                    },
                    function (res) {

                        var data = res.data;
                        var status = res.status;
                        var message = res.message;

                        if (status === 401) {
                            AlertService.addWithTimeout('warning', message);
                        } else if (status === 412 || status === 422) {
                            ValidationService.registrarViolacoes(data);
                        } else if (status === 403) {
                            AlertService.showMessageForbiden();
                        }

                    }
            );
        };

        $scope.edit = function (id) {
            $location.path('/coordenador/edit/' + id);
        };

        $scope.gridOptions = {
            paginationPageSizes: [13],
            paginationPageSize: 13,
            data: 'coordenadors',
            i18n: "pt",
            columnDefs: [
                {field: 'fullname', name: 'Descricão', width: "450"},
                {name: 'Ação', cellTemplate: '<a has-roles="COORDENADOR" ng-click="grid.appScope.edit(row.entity.id)" class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-plus-sign"></i> Alterar</a>', width: "200"}]

        };

    }]);



