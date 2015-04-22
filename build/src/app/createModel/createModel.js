angular.module( 'templateBasedAuthoring.createModel', [
  'ui.router', 'JSONedit'
])

.config(["$stateProvider", function config( $stateProvider ) {
  $stateProvider.state( 'createModel', {
    url: '/createModel',
    views: {
      "main": {
        controller: 'CreateModelCtrl',
        templateUrl: 'createModel/createModel.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Model' }
  });
}])

.service('ModelService', ['$http', function ($http) {
    var apiEndpoint = "/snowowl/ihtsdo-authoring/";
    return {
        saveLogicalModel: function (model) {
                return $http.post(apiEndpoint +'models/logical', model, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            },
        getLogicalModelList: function () {
                return $http.get(apiEndpoint +'models/logical').then(function(response) {
                        return response;
                    });
            },
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

.controller( 'CreateModelCtrl', ['$scope', '$filter', 'ModelService', 'sharedVariablesService', '$location', function createModelCtrl($scope, $filter, ModelService, sharedVariablesService, $location) {
    $scope.logicalModels = null;
    $scope.success = false;
    $scope.jsonData = {
//      "name" : "example-logical-model",
//      "isARestrictions" : [ {
//        "conceptId" : "71388002",
//        "rangeRelationType" : "DESCENDANTS"
//      } ],
//      "attributeRestrictionGroups" : [ 
//    [ {
//        "typeConceptId" : "260686004",
//        "rangeRelationType" : "SELF",
//        "rangeConceptId" : "312251004"
//      }, {
//        "typeConceptId" : "405813007",
//        "rangeRelationType" : "DESCENDANTS_AND_SELF",
//        "rangeConceptId" : "442083009"
//      } ], 
//    [ {
//        "typeConceptId" : "260686004",
//        "rangeRelationType" : "SELF",
//        "rangeConceptId" : "312251004"
//      }, {
//        "typeConceptId" : "405813007",
//        "rangeRelationType" : "DESCENDANTS_AND_SELF",
//        "rangeConceptId" : "442083009"
//      }, {
//        "typeConceptId" : "363703001",
//        "rangeRelationType" : "DESCENDANTS",
//        "rangeConceptId" : "429892002"
//      } ] ]
    };

    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);
    
    ModelService.getLogicalModelList().then(function(data) {
            $scope.logicalModels = data.data;
        });
    $scope.saveModel = function() {
        ModelService.saveLogicalModel($scope.jsonData).then(function(data) {
            sharedVariablesService.setTemplateName($scope.jsonData.name);
            $scope.success = true;
        });
    };
    $scope.loadModel = function() {
        ModelService.getLogicalModel($scope.modelToLoad).then(function(data) {
            $scope.jsonData = data.data;
            sharedVariablesService.setTemplateName($scope.modelToLoad);
        });
    };
    $scope.generateMatrix = function() {
        $location.path('/matrix');
    };
}]);