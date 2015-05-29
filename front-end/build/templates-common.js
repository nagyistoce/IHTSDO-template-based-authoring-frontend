angular.module('templates-common', ['views/appHeader.tpl.html']);

angular.module("views/appHeader.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/appHeader.tpl.html",
    "<nav class=\"navbar navbar-default\">\n" +
    "\n" +
    "		<div class=\"navbar-header\">\n" +
    "        \n" +
    "        <a class=\"navbar-brand\" ui-sref=\"createRefset\">\n" +
    "        <span> <img class=\"img-responsive\" src=\"assets/small_logo.png\" alt=\"ihtsdo-logo\"></span> \n" +
    "        <span class=\"navbar-version\">Authoring Service</span>\n" +
    "        </a>\n" +
    "     \n" +
    "		</div>\n" +
    "		<ul id=\"topNav\"  class=\"nav navbar-nav navbar-right pull-left\">\n" +
    "			<li>\n" +
    "				<a ui-sref=\"createModel\">Create New Model</a>\n" +
    "			</li>\n" +
    "			\n" +
    "		</ul>\n" +
    "        \n" +
    "	<ul id=\"identity\"  class=\"nav navbar-nav navbar-right pull-right\">\n" +
    "			<li>\n" +
    "				<a ui-sref=\"register\" target=\"_self\">\n" +
    "					<span>Register</span>\n" +
    "					\n" +
    "				</a>\n" +
    "			</li>\n" +
    "			<li>\n" +
    "				<a ui-sref=\"login\" target=\"_self\">\n" +
    "					<span>Login</span>\n" +
    "				</a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "        \n" +
    "</nav>\n" +
    "");
}]);
