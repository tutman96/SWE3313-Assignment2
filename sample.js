var parser = require("esprima");
var traverser = require("estraverse");
var code = require("./asttools");
var fs = require("fs");
function percentDifference(v1, v2) {
    var min = Math.min(v1, v2);
    var max = Math.max(v1, v2);
    return ((max - min) / max) * 100;
}
function test(js1, js2) {
    var tree1 = parser.parse(js1);
    var tree2 = parser.parse(js2);
    var vd1 = code("VariableDeclarator", tree1);
    var vd2 = code("VariableDeclarator", tree2);
    var be1 = code("BinaryExpression", tree1);
    var be2 = code("BinaryExpression", tree2);
    var ce1 = code("CallExpression", tree1);
    var ce2 = code("CallExpression", tree2);
    var l1 = code("Literal", tree1);
    var l2 = code("Literal", tree2);
    var fd1 = code("FunctionDeclaration", tree1);
    var fd2 = code("FunctionDeclaration", tree2);
    console.log("VariableDeclarator:\t" + vd1 + " vs " + vd2 + "\t(" + percentDifference(vd1, vd2) + "% difference)");
    console.log("BinaryExpression:\t" + be1 + " vs " + be2 + "\t(" + percentDifference(be1, be2) + "% difference)");
    console.log("CallExpression:\t\t" + ce1 + " vs " + ce2 + "\t(" + percentDifference(ce1, ce2) + "% difference)");
    console.log("Literal:\t\t" + l1 + " vs " + l2 + "\t(" + percentDifference(l1, l2) + "% difference)");
    console.log("FunctionDeclaration:\t" + fd1 + " vs " + fd2 + "\t(" + percentDifference(fd1, fd2) + "% difference)");
    var tree1NodesCount = 0;
    traverser.traverse(tree1, {
        enter: function () {
            tree1NodesCount++;
        }
    });
    var tree2NodesCount = 0;
    traverser.traverse(tree2, {
        enter: function () {
            tree2NodesCount++;
        }
    });
    console.log("tree1", tree1NodesCount);
    console.log("tree2", tree2NodesCount);
    console.log("\n\n\n\n\n\n\n\n\n");
}
var js1 = fs.readFileSync("/Users/john/Downloads/bootstrap-3.3.5-dist/js/bootstrap.js");
var js2 = fs.readFileSync("/Users/john/Downloads/bootstrap-3.3.5-dist/js/bootstrap.min.js");
test(js1, js2);
js1 = fs.readFileSync("/Users/john/Downloads/bootstrap-3.3.5-dist/js/jquery-1.11.3.js");
js2 = fs.readFileSync("/Users/john/Downloads/bootstrap-3.3.5-dist/js/jquery-1.11.3.min.js");
test(js1, js2);
js1 = fs.readFileSync("/Users/john/repos/SWE3313-Assignment2/asttools.js");
js2 = fs.readFileSync("/Users/john/repos/SWE3313-Assignment2/sample.js");
test(js1, js2);
