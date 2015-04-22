angular.module('templateBasedAuthoring.sharedVariablesService', [])
    .factory('sharedVariablesService', function () {
        var templateName = '';

        return {
            getTemplateName: function () {
                return templateName;
            },
            setTemplateName: function(value) {
                templateName = value;
            }
        };
    });