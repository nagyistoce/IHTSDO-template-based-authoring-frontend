angular.module( 'templateBasedAuthoring', [
    'templates-app',
    'templates-common',
    'templateBasedAuthoring.createModel',
    'templateBasedAuthoring.matrix',
    'templateBasedAuthoring.sharedVariablesService',
    'ui.router' 
])

.config( ["$stateProvider", "$urlRouterProvider", function myAppConfig ( $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise( '/createModel' );
}])

.run( function run () {
})

.controller( 'AppCtrl', ["$scope", "$location", function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | templateBasedAuthoring' ;
    }
  });
}])

;

