angular.module('templates-app', ['createModel/createModel.tpl.html', 'matrix/matrix.tpl.html']);

angular.module("createModel/createModel.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("createModel/createModel.tpl.html",
    "<h1 style=\"margin-left:15px;\">New Logical Model:</h1>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <div class=\"col-md-2\">\n" +
    "        <div>Select a Model to Load:</div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-2\">\n" +
    "        <select ng-model=\"modelToLoad\">\n" +
    "            <option>Please Select An Option</option>\n" +
    "            <option ng-repeat=\"item in logicalModels\" value=\"{{item}}\">{{item}}</option>\n" +
    "        </select>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-1\">\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"loadModel()\">Load</button>\n" +
    "    </div>\n" +
    "    <button class=\"btn btn-primary col-md-2\" style=\"margin-right:10px;\"ng-click=\"saveModel()\">Save Logical Model</button>\n" +
    "    <div class=\"col-md-2\" ng-show=\"success\">Model Successfully Saved.</div>\n" +
    "    <button class=\"btn btn-primary col-md-2\" style=\"margin-left:10px;\" ng-click=\"generateMatrix()\">Generate Matrix</button>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        </br>\n" +
    "        <textarea class=\"col-md-12\" style=\"height:300px\" id=\"jsonTextarea\" ng-model=\"jsonString\"></textarea>\n" +
    "        <span class=\"red\" ng-if=\"!wellFormed\">JSON is invalid</span>\n" +
    "    </div>\n" +
    "    <div class=\"jsonView col-md-6\">\n" +
    "        <json child=\"jsonData\" default-collapsed=\"false\" type=\"object\"></json>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("matrix/matrix.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("matrix/matrix.tpl.html",
    "<h1 style=\"margin-left:15px;\">Matrix</h1>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <form id=\"upload\" onsubmit=\"init()\" method=\"POST\" enctype=\"multipart/form-data\">\n" +
    "        <fieldset>\n" +
    "            <legend>.TSV Upload</legend>\n" +
    "            <input type=\"hidden\" id=\"MAX_FILE_SIZE\" name=\"MAX_FILE_SIZE\" value=\"300000\" />\n" +
    "            <div>\n" +
    "                <label for=\"fileselect\">Files to upload:</label>\n" +
    "                <input type=\"file\" id=\"fileselect\" name=\"fileselect[]\" multiple=\"multiple\" />\n" +
    "                <div id=\"filedrag\">or drop files here</div>\n" +
    "            </div>\n" +
    "            <div id=\"submitbutton\">\n" +
    "                <button type=\"submit\">Upload Files</button>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "    <div id=\"messages\">\n" +
    "        <p>Status Messages</p>\n" +
    "    </div>\n" +
    "    \n" +
    "    <table class=\"table table-striped\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th>Parent Concept Id</th>\n" +
    "                <th ng-repeat=\"(key, value) in headers\">{{value}}</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr>\n" +
    "                <td></td>\n" +
    "                <td ng-repeat=\"(key, value) in headers\"></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td></td>\n" +
    "                <td ng-repeat=\"(key, value) in headers\"></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td></td>\n" +
    "                <td ng-repeat=\"(key, value) in headers\"></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td></td>\n" +
    "                <td ng-repeat=\"(key, value) in headers\"></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td></td>\n" +
    "                <td ng-repeat=\"(key, value) in headers\"></td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>");
}]);
