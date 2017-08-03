'use strict';

app.directive('jsonld', ['$filter', '$sce', function ($filter, $sce) {
        return {
            restrict: 'E',
            template: function () {
                return '<script type="application/ld+json" ng-bind-html="onGetJson()"></script>';
            },
            scope: {
                json: '=json'
            },
            link: function (scope, element, attrs) {
                scope.onGetJson = function () {
                    return $sce.trustAsHtml($filter('json')(scope.json));
                }
            },
            replace: true
        };
    }]);

app.directive('uiLinhabar', ['$rootScope', '$anchorScroll', function ($rootScope, $anchorScroll) {
        return {
            restrict: 'AC',
            template: '<span class="bar"></span>',
            link: function (scope, el, attrs) {
                el.addClass('linhabar hide');

                scope.$on('$routeChangeStart', function (e) {
                    $anchorScroll();
                    el.removeClass('hide').addClass('active');
                });

                scope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState) {
                    event.targetScope.$watch('$viewContentLoaded', function () {
                        el.addClass('hide').removeClass('active');
                    });
                });

                scope.$on('loading-started', function (e) {
                    el.removeClass('hide').addClass('active');
                });

                scope.$on('loading-complete', function (e) {
                    el.addClass('hide').removeClass('active');
                });
            }
        }
    }]);

app.directive('backButton', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                scope.$apply(function () {
                    history.back();
                });

            });
        }
    };
});

app.directive('alerts', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/alerts.html'
    };
});

app.directive('autofill', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$on('autofill:update', function () {
                ngModel.$setViewValue(element.val());
            });
        }
    };
});

app.directive('hasRoles', ['AuthService', function (AuthService) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {

                var paramRoles = attributes.hasRoles.split(',');

                if (!AuthService.isAuthorized(paramRoles)) {
                    element.remove();
                }

            }
        };
    }]);

app.directive('hasRolesDisable', ['AuthService', function (AuthService) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {

                var paramRoles = attributes.hasRolesDisable.split(',');

                if (!AuthService.isAuthorized(paramRoles)) {
                    angular.forEach(element.find('input, select, textarea, button, a'), function (node) {
                        var ele = angular.element(node);
                        ele.attr('disabled', 'true');
                    });
                }
            }
        };
    }]);

app.directive('isLogged', ['AuthService', function (AuthService) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                if (!AuthService.isAuthenticated()) {
                    element.remove();
                }
            }
        };
    }]);

app.directive('confirmButton', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            actionOK: '&confirmAction',
            actionCancel: '&cancelAction'
        },
        link: function (scope, element, attrs) {
            var buttonId, html, message, nope, title, yep;
            buttonId = Math.floor(Math.random() * 10000000000);
            attrs.buttonId = buttonId;
            message = attrs.message || 'Tem certeza?';
            yep = attrs.yes || 'Sim';
            nope = attrs.no || 'Não';
            title = attrs.title || 'Confirmação';

            element.bind('click', function (e) {

                var box = bootbox.dialog({
                    message: message,
                    title: title,
                    buttons: {
                        success: {
                            label: yep,
                            className: 'btn-success',
                            callback: function () {
                                $timeout(function () {
                                    scope.$apply(scope.actionOK);
                                });
                            }
                        },
                        danger: {
                            label: nope,
                            className: 'btn-danger',
                            callback: function () {
                                scope.$apply(scope.actionCancel);
                            }
                        }
                    }
                });

            });
        }
    };
});

app.directive('validationMsg', ['ValidationService', function (ValidationService) {
        return {
            restrict: 'E',
            scope: {
                propriedade: '@'
            },
            template: '<div class="error text-danger" ng-show="msg"><small class="error" >{{msg}}</small></div>',
            controller: function ($scope) {
                $scope.$watch(function () {
                    return ValidationService.validation[$scope.propriedade];
                },
                        function (msg) {
                            $scope.msg = msg;
                        }
                );
            }
        };
    }]);

app.directive('maxLength', ['$compile', 'AlertService', function ($compile, AlertService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                attrs.$set('ngTrim', 'false');
                var maxlength = parseInt(attrs.maxLength, 10);
                ctrl.$parsers.push(function (value) {
                    if (value !== undefined && value.length !== undefined) {
                        if (value.length > maxlength) {
                            AlertService.addWithTimeout('warning', 'O valor máximo de caracteres (' + maxlength + ') para esse campo já foi alcançado');
                            value = value.substr(0, maxlength);
                            ctrl.$setViewValue(value);
                            ctrl.$render();
                        }
                    }
                    return value;
                });
            }
        };
    }]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('menu', ['AuthService', function (AuthService) {
        return {
            restrict: 'A',
            templateUrl: 'views/partials/menu.html',
            link: function (scope, elem, $attrs) {
                AuthService.menus().then(function (res) {
                    scope.menus = res.data;
                });
            }
        };

    }]);

app.directive('passwordStrength', [
    function () {
        return {
            require: 'ngModel',
            restrict: 'E',
            scope: {
                password: '=ngModel'
            },

            link: function (scope, elem, attrs, ctrl) {
                scope.$watch('password', function (newVal) {

                    scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                            isSatisfied(newVal && /(?=.*[a-z])/.test(newVal)) +
                            isSatisfied(newVal && /(?=.*[A-Z])/.test(newVal)) +
                            isSatisfied(newVal && /(?=.*[@#$%])/.test(newVal)) +
                            isSatisfied(newVal && /(?=.*\\d)/.test(newVal));
                    function isSatisfied(criteria) {
                        return criteria ? 1 : 0;
                    }
                }, true);
            },
            template: '<div class="progress">' +
                    '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
                    '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
                    '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
                    '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
                    '</div>'
        }
    }
]);

app.directive('patternValidator', [
    function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    var patt = new RegExp(attrs.patternValidator);

                    var isValid = patt.test(viewValue);

                    ctrl.$setValidity('passwordPattern', isValid);

                    // angular does this with all validators -> return isValid ? viewValue : undefined;
                    // But it means that the ng-model will have a value of undefined
                    // So just return viewValue!
                    return viewValue;

                });
            }
        };
    }
]);
 