angular.module('templates-common', ['views/appHeader.tpl.html']);

angular.module("views/appHeader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/appHeader.tpl.html",
    "<nav class=\"navbar navbar-default\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "            <a href=\"#\" ng-href=\"#/\">\n" +
    "                <span ng-hide=\"memberLogo\">\n" +
    "                    <img class=\"img-responsive\" src=\"assets/logo.png\" alt=\"ihtsdo-logo\">\n" +
    "                </span>\n" +
    "            </a>\n" +
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
