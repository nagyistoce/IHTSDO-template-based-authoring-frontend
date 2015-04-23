angular.module('templateBasedAuthoring.conceptNameFilter', 
    ['templateBasedAuthoring.snowowlService'])
    .filter('conceptNameFilter', ['snowowlService', function (snowowlService) {
      return function(input) {
          console.log('filter');
        snowowlService.getConceptName(input).then(function(data) {
                    console.log(data);
                    return data.data.preferredSynonym;
                });
      };
}]);