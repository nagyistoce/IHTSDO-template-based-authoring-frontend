angular.module( 'templateBasedAuthoring.matrix', [
  'ui.router'
])

.config(["$stateProvider", function config( $stateProvider ) {
  $stateProvider.state( 'matrix', {
    url: '/matrix',
    views: {
      "main": {
        controller: 'MatrixCtrl',
        templateUrl: 'matrix/matrix.tpl.html'
      }
    },
    data:{ pageTitle: 'Matrix' }
  });
}])

.service('MatrixService', ['$http', function ($http) {
    var apiEndpoint = "/snowowl/ihtsdo-authoring/";
    return {
        getConceptDescendants: function (conceptId) {
                return $http.get(apiEndpoint +'descendants/' + conceptId).then(function(response) {
                        return response;
                    });
            },
        getLogicalModel: function (logicalModelName) {
                return $http.get(apiEndpoint +'models/logical/' + logicalModelName).then(function(response) {
                        return response;
                    });
            },
        validateLogicalModel: function (logicalModelName, schema) {
                return $http.post(apiEndpoint +'models/logical/' + logicalModelName + '/valid-content', schema, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            }
    };
}])

.controller( 'MatrixCtrl', ['$scope', '$filter', 'MatrixService', 'sharedVariablesService', function matrixCtrl($scope, $filter, MatrixService, sharedVariablesService) {
    MatrixService.getLogicalModel(sharedVariablesService.getTemplateName()).then(function(data) {
            $scope.model = data.data;
        });
    $scope.parseModel = function(model) {
        
    };
}]);