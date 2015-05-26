angular.module( 'templateBasedAuthoring.createModel', [
  'ui.router', 'JSONedit'
])

.config(function config( $stateProvider ) {
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
})

.service('ModelService', ['$http', function ($http) {
    var apiEndpoint = "/snowowl/ihtsdo-authoring/";
    return {
        //Logical Model
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
            },

        //Lexical Model
        saveLexicalModel: function (model) {
                return $http.post(apiEndpoint +'models/lexical', model, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            },
        getLexicalModelList: function () {
                return $http.get(apiEndpoint +'models/lexical').then(function(response) {
                        return response;
                    });
            },
        getLexicalModel: function (lexicalModelName) {
                return $http.get(apiEndpoint +'models/lexical/' + lexicalModelName).then(function(response) {
                        return response;
                    });
            },
        validateLexicalModel: function (lexicalModelName, schema) {
                return $http.post(apiEndpoint +'models/lexical/' + lexicalModelName + '/valid-content', schema, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            },
        getTemplate: function (name) {
                return $http.get(apiEndpoint +'templates/' + name).then(function(response) {
                        return response;
                    });
        },
        saveTemplate: function (lexicalModelName, logicalModelName, name) {
                var json = {};
                json.name = name;
                json.lexicalModelName = lexicalModelName;
                json.logicalModelName = logicalModelName;
                return $http.post(apiEndpoint +'templates', json, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
        },
       //Common
         getConceptDescendants: function (conceptId) {
                return $http.get(apiEndpoint +'descendants/' + conceptId).then(function(response) {
                        return response;
                    });
            }
    };
}])

.controller( 'CreateModelCtrl', ['$scope', '$filter', 'ModelService', 'sharedVariablesService', '$location', function createModelCtrl($scope, $filter, ModelService, sharedVariablesService, $location) {
    $scope.logicalModels = null;
    $scope.logicalSuccess = false;
    $scope.logicalJsonData = {};

    $scope.lexicalModels = null;
    $scope.lexicallSuccess = false;
    $scope.lexicalJsonData = {};

    //Initial load check to see if models have allready been loaded.
    if(sharedVariablesService.getTemplateName() !== '')
    {
        ModelService.getTemplate(sharedVariablesService.getTemplateName()).then(function(data) {
            ModelService.getLogicalModel(data.data.logicalModelName).then(function(innerData) {
                $scope.logicalJsonData = innerData.data;
            });
            ModelService.getLexicalModel(data.data.lexicalModelName).then(function(innerData) {
                $scope.lexicalJsonData = innerData.data;
            });
        });
    }
    
    
    //Logical Functions
    $scope.$watch('logicalJsonData', function(json) {
        $scope.logicalJsonString = $filter('json')(json);
    }, true);

    $scope.$watch('logicalJsonString', function(json) {
        try {
            $scope.logicalJsonData = JSON.parse(json);
            $scope.logicalWellFormed = true;
        } catch(e) {
            $scope.logicalWellFormed = false;
        }
    }, true);
    
    ModelService.getLogicalModelList().then(function(data) {
            $scope.logicalModels = data.data;
        });
    $scope.saveLogicalModel = function() {
        ModelService.saveLogicalModel($scope.logicalJsonData).then(function(data) {
            //sharedVariablesService.setTemplateName($scope.logicalJsonData.name);
            $scope.logicalSuccess = true;
        });
    };
    $scope.loadLogicalModel = function() {
        ModelService.getLogicalModel($scope.logicalModelToLoad).then(function(data) {
            $scope.logicalJsonData = data.data;
            //sharedVariablesService.setTemplateName($scope.logicalModelToLoad);
        });
    };
    
    //Lexical Functions
    $scope.$watch('lexicalJsonData', function(json) {
        $scope.lexicalJsonString = $filter('json')(json);
    }, true);

    $scope.$watch('lexicalJsonString', function(json) {
        try {
            $scope.lexicalJsonData = JSON.parse(json);
            $scope.lexicalWellFormed = true;
        } catch(e) {
            $scope.lexicalWellFormed = false;
        }
    }, true);
    
    ModelService.getLexicalModelList().then(function(data) {
            $scope.lexicalModels = data.data;
        });
    $scope.saveLexicalModel = function() {
        ModelService.saveLexicalModel($scope.lexicalJsonData).then(function(data) {
            $scope.lexicalSuccess = true;
        });
    };
    $scope.loadLexicalModel = function() {
        ModelService.getLexicalModel($scope.lexicalModelToLoad).then(function(data) {
            $scope.lexicalJsonData = data.data;
            //sharedVariablesService.setTemplateName($scope.lexicalModelToLoad);
        });
    };
    
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    $scope.generateMatrix = function() {
        
        ModelService.saveTemplate($scope.lexicalJsonData.name, $scope.logicalJsonData.name, "Test");
        sharedVariablesService.setTemplateName("Test");
        $location.path('/matrix');
    };
}]);