angular.module('templates-app', ['createModel/createModel.tpl.html', 'matrix/matrix.tpl.html']);

angular.module("createModel/createModel.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("createModel/createModel.tpl.html",
    "<h2>New Logical Model:</h2>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <span>\n" +
    "       Select a Logical Model to Load:\n" +
    "    </span>\n" +
    "    <span>\n" +
    "        <select ng-model=\"logicalModelToLoad\">\n" +
    "            <option>Please Select An Option</option>\n" +
    "            <option ng-repeat=\"item in logicalModels\" value=\"{{item}}\">{{item}}</option>\n" +
    "        </select>\n" +
    "    </span>\n" +
    "   <span>\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"loadLogicalModel()\">Load</button>\n" +
    "    </span>\n" +
    "    <span>\n" +
    "    <button class=\"btn btn-primary\" style=\"margin-right:10px;\"ng-click=\"saveLogicalModel()\">Save Logical Model</button>\n" +
    "     </span>\n" +
    "    <span class=\"col-md-2\" ng-show=\"logicalSuccess\">Logical Model Successfully Saved.</span>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        </br>\n" +
    "        <textarea class=\"col-md-12\" style=\"height:300px\" id=\"logicalJsonTextarea\" ng-model=\"logicalJsonString\"></textarea>\n" +
    "        <span class=\"red\" ng-if=\"!logicalWellFormed\">JSON is invalid</span>\n" +
    "    </div>\n" +
    "    <div class=\"jsonView col-md-6\">\n" +
    "        <json child=\"logicalJsonData\" default-collapsed=\"false\" type=\"object\"></json>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"col-md-12 row\">\n" +
    "<h2>New Lexical Model:</h2>\n" +
    "   <span>\n" +
    "    Select a Lexical Model to Load:\n" +
    "  </span>\n" +
    "    <span>\n" +
    "        <select ng-model=\"lexicalModelToLoad\">\n" +
    "            <option>Please Select An Option</option>\n" +
    "            <option ng-repeat=\"item in lexicalModels\" value=\"{{item}}\">{{item}}</option>\n" +
    "        </select>\n" +
    "    </span>\n" +
    "   <span>\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"loadLexicalModel()\">Load</button>\n" +
    "   </span>\n" +
    "    <button class=\"btn btn-primary style=\"margin-right:10px;\"ng-click=\"saveLexicalModel()\">Save Lexical Model</button>\n" +
    "    <div class=\"col-md-2\" ng-show=\"lexicalSuccess\">Lexical Model Successfully Saved.</div>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <div class=\"col-md-6\">\n" +
    "        </br>\n" +
    "        <textarea class=\"col-md-12\" style=\"height:300px\" id=\"lexicalJsonTextarea\" ng-model=\"lexicalJsonString\"></textarea>\n" +
    "        <span class=\"red\" ng-if=\"!lexicalWellFormed\">JSON is invalid</span>\n" +
    "    </div>\n" +
    "    <div class=\"jsonView col-md-6\">\n" +
    "        <json child=\"lexicalJsonData\" default-collapsed=\"false\" type=\"object\"></json>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<button class=\"btn btn-primary pull-right\" style=\"margin-left:10px;\" ng-click=\"generateMatrix()\">Next...</button>\n" +
    "");
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
    "            <tr>\n" +
    "                <th>Parent Concept Id</th>\n" +
    "                <th ng-repeat=\"(key, value) in headers track by $index\">{{value}}</th>\n" +
    "            </tr>\n" +
    "            <tr ng-repeat=\"item in results\">\n" +
    "                <td>{{item.ParentConceptID}}</td>\n" +
    "                <td ng-repeat=\"(key, value) in unParsedHeaders track by $index\">{{item[value]}}</td>\n" +
    "            </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <button style=\"margin-right:10px\" ng-disabled=\"!loaded\" class=\"btn btn-primary col-md-2\" ng-click=\"saveWork()\">Save and Validate Work</button>\n" +
    "    <button style=\"margin-right:10px\" ng-disabled=\"!validationPassed\" class=\"btn btn-primary col-md-2\" ng-click=\"commitWork()\">Commit Work</button>\n" +
    "    <button style=\"margin-right:10px\" ng-disabled=\"!commited\" class=\"btn btn-primary col-md-2\" ng-click=\"classifyWork()\">Classify Work</button>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 row\">\n" +
    "    <div ng-if=\"validationPassed\">\n" +
    "        Work Has been saved and Successfully passed Validation.    \n" +
    "    </div>\n" +
    "    <div ng-if=\"validationFailed\">\n" +
    "        Work Has been saved but failed Validation:\n" +
    "        {{validationErrors}}\n" +
    "    </div>\n" +
    "    <div ng-if=\"committed\">\n" +
    "        Your work has been Committed. The Task Id is {{taskId}}    \n" +
    "    </div>\n" +
    "</div>");
}]);
