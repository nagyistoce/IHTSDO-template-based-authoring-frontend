angular.module('templates-common', ['views/appHeader.tpl.html']);

angular.module("views/appHeader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/appHeader.tpl.html",
    "<nav class=\"navbar navbar-default\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "        \n" +
    "        <a class=\"navbar-brand\" href=\"#\" ng-href=\"#/\">\n" +
    "        <span> <img class=\"img-responsive\" src=\"assets/small_logo.png\" alt=\"ihtsdo-logo\"></span> \n" +
    "        <span class=\"navbar-version\">Authoring Service</span>\n" +
    "        </a>\n" +
    "     \n" +
    "		</div>\n" +
    "		<ul id=\"topNav\"  class=\"nav navbar-nav navbar-right\">\n" +
    "			<li>\n" +
    "				<a href=\"#/\">Create New Model</a>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<a href=\"#/login\">\n" +
    "					<span>Login</span>\n" +
    "					<i class=\"fa fa-caret-right\"></i>\n" +
    "				</a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "</nav>\n" +
    "");
}]);
