angular.module( 'templateBasedAuthoring', [
    'templates-app',
    'templates-common',
    'templateBasedAuthoring.createModel',
    'templateBasedAuthoring.matrix',
    'templateBasedAuthoring.sharedVariablesService',
    'templateBasedAuthoring.snowowlService',
    'templateBasedAuthoring.conceptNameFilter',
    'templateBasedAuthoring.accountService',
    'ui.router',
    'ngRoute'
])

.config( ["$stateProvider", "$urlRouterProvider", "$locationProvider", function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider) {
    var endpoint = "https://dev-ims.ihtsdotools.org/";
    var refferer = "http://localhost/#/createModel";
    $urlRouterProvider
        .otherwise('/createModel');
    $stateProvider
    .state('login', {
        url: endpoint + "/#/login" + "?serviceReferer=" + refferer
    })
    .state('logout', {
        url: endpoint + "/#/logout"
    })
    .state('settings', {
        url: endpoint + "/#/settings"
    })
    .state('register', {
        url: endpoint + "/#/register"
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
        rewriteLinks: true
    });
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