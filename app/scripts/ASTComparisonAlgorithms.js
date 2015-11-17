var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parser = require("esprima");
var traverser = require("estraverse");
var ASTComparisonAlgorithm = (function (_super) {
    __extends(ASTComparisonAlgorithm, _super);
    function ASTComparisonAlgorithm() {
        _super.apply(this, arguments);
    }
    ASTComparisonAlgorithm.prototype.compareWorker = function () {
        // if (this.file1.path == this.file2.path) {
        // 	this.submitResults({
        // 		likeliness: 100,
        // 		resultDescription: "They are exact"
        // 	})
        // }
        // else {
        // 	this.submitResults({
        // 		likeliness: 0,
        // 		resultDescription: "They aren't the same"
        // 	})
        // }
        try {
            var fs = require('fs');
            var file1 = fs.readFileSync(this.file1.path);
            var file2 = fs.readFileSync(this.file2.path);
            this.ast1 = parser.parse(file1);
            this.ast2 = parser.parse(file2);
        }
        catch (Error) {
            this.throwError(new Error("There was a problem generating the AST."));
        }
        this.submitProgress(50);
        this.compareASTs();
    };
    ASTComparisonAlgorithm.prototype.getPercentSimilarity = function (n1, n2) {
        var min = Math.min(n1, n2) + 1;
        var max = Math.max(n1, n2) + 1;
        return 100 - (((max - min) / max) * 100);
    };
    ASTComparisonAlgorithm.prototype.countElement = function (element, ast) {
        var count = 0;
        traverser.traverse(ast, {
            enter: function (node, parent) {
                if (node.type == element)
                    count++;
            }
        });
        return count;
    };
    return ASTComparisonAlgorithm;
})(CompareAlgorithm);
var BinaryExpressionCompareAlgorithm = (function (_super) {
    __extends(BinaryExpressionCompareAlgorithm, _super);
    function BinaryExpressionCompareAlgorithm() {
        _super.apply(this, arguments);
    }
    BinaryExpressionCompareAlgorithm.prototype.compareASTs = function () {
        var count1 = this.countElement("BinaryExpression", this.ast1);
        var count2 = this.countElement("BinaryExpression", this.ast2);
        var likliness = this.getPercentSimilarity(count1, count2);
        this.submitResults({ likeliness: likliness, resultDescription: "" });
    };
    return BinaryExpressionCompareAlgorithm;
})(ASTComparisonAlgorithm);
var VariableDeclaratorComparisonAlgorithm = (function (_super) {
    __extends(VariableDeclaratorComparisonAlgorithm, _super);
    function VariableDeclaratorComparisonAlgorithm() {
        _super.apply(this, arguments);
    }
    VariableDeclaratorComparisonAlgorithm.prototype.compareASTs = function () {
        var count1 = this.countElement("VariableDeclarator", this.ast1);
        var count2 = this.countElement("VariableDeclarator", this.ast2);
        var likliness = this.getPercentSimilarity(count1, count2);
        this.submitResults({ likeliness: likliness, resultDescription: "" });
    };
    return VariableDeclaratorComparisonAlgorithm;
})(ASTComparisonAlgorithm);
var CallExpressionComparisonAlgorithm = (function (_super) {
    __extends(CallExpressionComparisonAlgorithm, _super);
    function CallExpressionComparisonAlgorithm() {
        _super.apply(this, arguments);
    }
    CallExpressionComparisonAlgorithm.prototype.compareASTs = function () {
        var count1 = this.countElement("CallExpression", this.ast1);
        var count2 = this.countElement("CallExpression", this.ast2);
        var likliness = this.getPercentSimilarity(count1, count2);
        this.submitResults({ likeliness: likliness, resultDescription: "" });
    };
    return CallExpressionComparisonAlgorithm;
})(ASTComparisonAlgorithm);
var LiteralComparisonAlgorithm = (function (_super) {
    __extends(LiteralComparisonAlgorithm, _super);
    function LiteralComparisonAlgorithm() {
        _super.apply(this, arguments);
    }
    LiteralComparisonAlgorithm.prototype.compareASTs = function () {
        var count1 = this.countElement("Literal", this.ast1);
        var count2 = this.countElement("Literal", this.ast2);
        var likliness = this.getPercentSimilarity(count1, count2);
        this.submitResults({ likeliness: likliness, resultDescription: "" });
    };
    return LiteralComparisonAlgorithm;
})(ASTComparisonAlgorithm);
var FunctionDeclarationComparisonAlgorithm = (function (_super) {
    __extends(FunctionDeclarationComparisonAlgorithm, _super);
    function FunctionDeclarationComparisonAlgorithm() {
        _super.apply(this, arguments);
    }
    FunctionDeclarationComparisonAlgorithm.prototype.compareASTs = function () {
        var count1 = this.countElement("FunctionDeclaration", this.ast1);
        var count2 = this.countElement("FunctionDeclaration", this.ast2);
        var likliness = this.getPercentSimilarity(count1, count2);
        this.submitResults({ likeliness: likliness, resultDescription: "" });
    };
    return FunctionDeclarationComparisonAlgorithm;
})(ASTComparisonAlgorithm);
