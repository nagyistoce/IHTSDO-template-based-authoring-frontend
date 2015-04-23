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

.controller( 'MatrixCtrl', ['$scope', '$filter', 'MatrixService', 'sharedVariablesService', 'snowowlService', function matrixCtrl($scope, $filter, MatrixService, sharedVariablesService, snowowlService) {
    $scope.headers = [];
    $scope.parsedHeaders = [];
    MatrixService.getLogicalModel(sharedVariablesService.getTemplateName()).then(function(data) {
            $scope.model = data.data;
            $scope.parseModel($scope.model);
        });
    $scope.parseModel = function(model) {
        for(var i = 0; i < model.attributeRestrictionGroups.length; i++)
        {
            for(var j = 0; j < model.attributeRestrictionGroups[i].length; j++)
            {
                $scope.headers.push(model.attributeRestrictionGroups[i][j].typeConceptId);
            }
        }
        callServiceForEachItem();
    };
    function callServiceForEachItem() {
      var promise;

      angular.forEach($scope.headers, function(item) {
        if (!promise) {
          //First time through so just call the service
          promise = $scope.getName(item);
        } else {
          //Chain each subsequent request
          promise = promise.then(function() {

            return $scope.getName(item);
          });
        }
      });
    }
    $scope.getName = function(id){
        snowowlService.getConceptName(id).then(function(data) {
                    var index = $scope.headers.indexOf(id);
                    $scope.headers[index] = data.data.preferredSynonym;
                });
    };
    $scope.getConceptName = function(value){
        return function(value) {
        snowowlService.getConceptName(value).then(function(data) {
                    return data.data.preferredSynonym;
                });
      };
    };
    $scope.assignName = function(header, data){
        header = data;
    };
}]);