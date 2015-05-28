angular.module( 'templateBasedAuthoring', [
    'templates-app',
    'templates-common',
    'templateBasedAuthoring.createModel',
    'templateBasedAuthoring.matrix',
    'templateBasedAuthoring.sharedVariablesService',
    'templateBasedAuthoring.snowowlService',
    'templateBasedAuthoring.conceptNameFilter',
    'templateBasedAuthoring.accountService',
    'ui.router'
])

.config( ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$provide", function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider, $provide) {
    var endpoint = "https://dev-ims.ihtsdotools.org/";
    var refferer = "https://dev-term.ihtsdotools.org/authoring/";
    $provide.decorator('$sniffer', ["$delegate", function($delegate) {
      $delegate.history = false;
      return $delegate;
    }]);
    $urlRouterProvider
        .otherwise('/createModel');
    $stateProvider
    .state('login', {
        url: endpoint + "/#/login" + "?serviceReferer=" + refferer
    })
    .state('logout', {
        url: endpoint + "/#/logout" + "?serviceReferer=" + refferer
    })
    .state('settings', {
        url: endpoint + "/#/settings" + "?serviceReferer=" + refferer
    })
    .state('register', {
        url: endpoint + "/#/register" + "?serviceReferer=" + refferer
    });
    $locationProvider.html5Mode(true);
//    .when('/logout', {
//        redirectTo: function(){ window.location = endpoint + "/#/logout";}
//      })
//    .when('/settings', {
//        redirectTo: function(){ window.location = endpoint + "/#/settings";}
//      })
//    .when('/register', {
//        redirectTo: function(){ window.location = endpoint + "/#/register";}
//      })
    //.otherwise({ url: '/createModel' });
}])

.run( function run () {
})

.controller( 'AppCtrl', ["$scope", "$location", "accountService", function AppCtrl ( $scope, $location, accountService ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, accountService){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | templateBasedAuthoring' ;
//        accountService.getAccount().then(function(data) {
//                console.log(data);
//            }); 
    }
  });
}]);