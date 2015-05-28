angular.module('templateBasedAuthoring.accountService', [])
    .factory('accountService', ["$http", function ($http) {
        var serviceEndPoint = "https://dev-ims.ihtsdotools.org/api/account";
        return {
        getAccount: function () {
                return $http.get(serviceEndPoint, {withCredentials: true})
                .success(function(data, status) {
                    return data;
                  })
                .error(function(data, status) {
                    return data;
                });
            }
     };
 }]);