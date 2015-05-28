angular.module( 'templateBasedAuthoring.matrix', [
  'ui.router', 'ui.bootstrap', 'ngRoute'
])

.config(function config( $stateProvider ) {
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
})

.filter('prettyJSON', function () {
    function syntaxHighlight(json) {
      return JSON ? JSON.stringify(json, null, '  ') : 'your browser doesnt support JSON so cant pretty print';
    }
    return syntaxHighlight;
})

.service('MatrixService', ['$http', function ($http) {
    var apiEndpoint = "/snowowl/ihtsdo-authoring/";
    var snowowlEndpoint = "/snowowl/snomed-ct/";
    return {
        getConceptDescendants: function (conceptId) {
                return $http.get(apiEndpoint +'descendants/' + conceptId).then(function(response) {
                        return response;
                    });
            },
        getTemplate: function (name) {
                return $http.get(apiEndpoint +'templates/' + name).then(function(response) {
                        return response;
                    });
        },
        getLogicalModel: function (logicalModelName) {
                return $http.get(apiEndpoint +'models/logical/' + logicalModelName).then(function(response) {
                        return response;
                    });
            },
        getLexicalModel: function (lexicalModelName) {
                return $http.get(apiEndpoint +'models/lexical/' + lexicalModelName).then(function(response) {
                        return response;
                    });
            },
        saveWork: function (templateName, work) {
                return $http.post(apiEndpoint +'templates/' + templateName + '/work', work, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            },
        updateWork: function (templateName, work, workId) {
                return $http.put(apiEndpoint +'templates/' + templateName + '/work/' + workId, work, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            },
        commitWork: function (templateName, workId) {
                return $http.post(apiEndpoint + 'templates/' + templateName + '/work/' + workId + '/commit').then(function(response) {
                        return response;
                    });
            },
        workValidation: function (templateName, workId) {
                return $http.get(apiEndpoint + 'templates/' + templateName + '/work/' + workId + '/validation').then(function(response) {
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
        startClassification: function (taskId) {
                var JSON = '{"reasonerId": "au.csiro.snorocket.owlapi3.snorocket.factory"}';
                return $http.post(snowowlEndpoint +'MAIN/tasks/' + taskId + '/classifications', JSON, {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
                    }).then(function(response) {
                        return response;
                    });
            },
        checkClassificationResult: function (classifierId, taskId) {
                return $http.get(snowowlEndpoint + 'MAIN/tasks/' + taskId + '/classifications/' + classifierId ).then(function(response) {
                        return response;
                    });
        },
        getEquivalentConcepts: function (classifierId, taskId) {
                return $http.get(snowowlEndpoint + 'MAIN/tasks/' + taskId + '/classifications/' + classifierId + '/equivalent-concepts').then(function(response) {
                        return response;
                    });
        },
        getRelationshipChanges: function (classifierId, taskId) {
                return $http.get(snowowlEndpoint + 'MAIN/tasks/' + taskId + '/classifications/' + classifierId + '/relationship-changes').then(function(response) {
                        return response;
                    });
        }
    };
}])

.controller( 'MatrixCtrl', ['$scope', '$filter', 'MatrixService', 'sharedVariablesService', 'snowowlService', '$timeout', '$window', function matrixCtrl($scope, $filter, MatrixService, sharedVariablesService, snowowlService, $timeout, $window) {
    $scope.headers = [];
    $scope.loaded = false;
    $scope.results = [];
    $scope.unParsedHeaders = [];
    $scope.saved = false;
    $scope.work = {};
    $scope.validationPassed = false;
    $scope.validationFailed = false;
    $scope.errors = {};
    $scope.objectOrder = [];
    $scope.inProgress = false;
    $scope.workId = null;
    
    MatrixService.getTemplate(sharedVariablesService.getTemplateName()).then(function(data) {
            $scope.templateName = data.data.name;
            MatrixService.getLogicalModel(data.data.logicalModelName).then(function(innerData) {
                $scope.model = innerData.data;
                $scope.parseModel($scope.model);
            });
        });
    $scope.parseModel = function(model) {
        for(var i = 0; i < model.attributes.length; i++)
        {
            for(var j = 0; j < model.attributes[i].length; j++)
            {
                $scope.headers.push(model.attributes[i][j].attribute);
                $scope.unParsedHeaders.push(model.attributes[i][j].attribute);
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
    
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    $scope.saveWork = function(){
        $scope.inProgress = true;
        $scope.saveProgress = true;
        $scope.save = false;
        if($scope.workId == null){
            MatrixService.saveWork($scope.templateName, $scope.work).then(function(data){
                $scope.saved = true;
                $scope.workId = data.data.name;
                MatrixService.workValidation($scope.templateName, data.data.name).then(function(innerData){
                    $scope.validationErrors = innerData.data;
                    $scope.inProgress = false;
                    $scope.saveProgress = false;
                    if(innerData.data.anyError === false)
                    {
                        $scope.validationFailed = false;
                        $scope.validationPassed = true;   
                    }
                    else{
                        $scope.renderErrors();
                        $scope.validationPassed = false; 
                        $scope.validationFailed = true;
                    }
                });
            });
        }
        else{
            MatrixService.updateWork($scope.templateName, $scope.work, $scope.workId).then(function(data){
                $scope.saved = true;
                MatrixService.workValidation($scope.templateName, $scope.workId).then(function(innerData){
                    $scope.validationErrors = innerData.data;
                    $scope.inProgress = false;
                    $scope.saveProgress = false;
                    if(innerData.data.anyError === false)
                    {
                        $scope.validationFailed = false;
                        $scope.validationPassed = true;   
                    }
                    else{
                        $scope.renderErrors();
                        $scope.validationPassed = false; 
                        $scope.validationFailed = true;
                    }
                });
            });   
        }
    };
    
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    
    $scope.renderErrors = function(){
        if($scope.validationErrors.conceptResults[0].parentsMessages[0] != null)
        {
            var parentError = $scope.validationErrors.conceptResults[0].parentsMessages[0];
            $scope.errors.parentConceptID = parentError;
        }
        var arrays = $scope.validationErrors.conceptResults[0].attributesMessages;
        var merged = [];
        merged = merged.concat.apply(merged, arrays);
        for(var i = 0; i < $scope.objectOrder.length; i++)
        {
            if(isEmpty(merged[i]))
            {

            }
            else{
                $scope.errors[$scope.objectOrder[i]] = merged[i].valueMessage;
            }
        }
    };
    
    $scope.retrieveClass = function(id){
        if($scope.errors.hasOwnProperty(id))
        {
            return "error";
        }
    };
    
    $scope.commitWork = function(){
        $scope.inProgress = true;
        $scope.committProgress = true;
        MatrixService.commitWork($scope.templateName, $scope.workId).then(function(data){
            $scope.taskId = data.data.taskId;
            $scope.committed = true;
            $scope.inProgress = false;
            $scope.committProgress = false;
        });
    };
    
    $scope.classifyWork = function(){
        $scope.classifyProgress = true;
        $scope.inProgress = true;
        MatrixService.startClassification($scope.taskId).then(function(data){
            var location = data.headers('Location');
            $scope.classifactionJobId = location.replace(/^.*\/(.*)$/, "$1");
            $scope.pollForResult();
        });
    };
    
    $scope.pollForResult = function() {
        $timeout(function() {
            MatrixService.checkClassificationResult($scope.classifactionJobId, $scope.taskId).then(function(data){
                if(data.data.status == "COMPLETED")
                {
                    $scope.validationResultsComplete = true;
                    return;
                }
            });
            if($scope.validationResultsComplete === true)
            {
                $scope.generateClassifierResults();
                return;
            }
            $scope.pollForResult();
        }, 20000);
    };
    
    $scope.generateClassifierResults = function() {
        var jsonData = {};
        var jsonDataTwo = {};
        MatrixService.getEquivalentConcepts($scope.classifactionJobId, $scope.taskId).then(function(data){
                $scope.equivalenceReport = data.data.items;
            });
        MatrixService.getRelationshipChanges($scope.classifactionJobId, $scope.taskId).then(function(data){
                $scope.relationshipChangeReport = data.data.items;
            });
        $scope.classified = true;
        $scope.inProgress = false;
        $scope.classifyProgress = false;
    };

	function Output(msg) {
		var m = document.getElementById("messages");
		m.innerHTML = msg + m.innerHTML;
	}

	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");
	}

	function FileSelectHandler(e) {
		new FileDragHover(e);

		var files = e.target.files || e.dataTransfer.files;

		for (var i = 0, f; f = files[i]; i++) {
			new ParseFile(f);
		}

	}

	function ParseFile(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $scope.results = $scope.tsvJSON(e.target.result);
            $scope.validationJson($scope.results);
            $scope.loaded = true;
            $scope.$apply();
        };
        reader.readAsText(file);
        
		new Output(
			"<p>File information: <strong>" + file.name +
			"</strong> type: <strong>" + file.type +
			"</strong> size: <strong>" + file.size +
			"</strong> bytes</p>"
		);
	}
	$scope.Init = function(){

		var fileselect = document.getElementById("fileselect"),
			filedrag = document.getElementById("filedrag"),
			submitbutton = document.getElementById("submitbutton");

		fileselect.addEventListener("change", FileSelectHandler, false);

		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);
			filedrag.style.display = "block";
			submitbutton.style.display = "none";
		}

	};
	if (window.File && window.FileList && window.FileReader) {
        
		$scope.Init();
	}
    
    $scope.validationJson = function(input) {
        var work = {};
        work.name = guid();
        work.taskId = "test";
        work.concepts = [];
        var concept = {};
        var saveProgress = false;
        var commitProgress = false;
        var classifyProgress = false;
        concept.id = guid();
        concept.term = "test";
        concept.parents = [];
        concept.attributes = [];
        var headers = $scope.unParsedHeaders;
        var temp = {}; 
        for(var j = 0; j < headers.length; j++)
        {
            if(temp[headers[j]] != "temp")
            {
                temp[headers[j]] = "temp";
                if(j == (headers.length -1))
                {
                    concept.attributes.push(temp);   
                }
            }
            else{
                concept.attributes.push(temp);
                temp = {};
                temp[headers[j]] = "temp";
            }
        }
        for(var i = 0; i < input.length; i++){
          var obj = {};
          var currentLine = input[i];
          if (concept.parents.indexOf(currentLine.ParentConceptID) == -1) {
              concept.parents.push(currentLine.ParentConceptID);
          }
        }
        //Loop through groups and fill in variables
        for(var k = 0; k < concept.attributes.length; k++){
            $scope.parseAttributes(concept.attributes[k], input);
        }
        work.concepts.push(concept);
        $scope.work = work;
    };
    
    $scope.parseAttributes = function(object, input){
        angular.forEach(object, function(item, name) {
                object[name] = input[0][name];
                $scope.objectOrder.push(name);
            }, object);
    };
    
    $scope.tsvJSON = function(tsv){

      var lines = tsv.split("\n");
      var result = [];
      var headers= lines[0].split("\t");
      for(var i = 1; i < lines.length; i++){
          var obj = {};
          var currentline = lines[i].split("\t");
          for(var j = 0 ; j < headers.length; j++){
              obj[headers[j]] = currentline[j];
          }
          result.push(obj);
      }
      return result;
    };
}]);