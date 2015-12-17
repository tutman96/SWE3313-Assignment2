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
        catch (err) {
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
    ASTComparisonAlgorithm.prototype.getConfidence = function (confGoal, count1, count2, likliness) {
        //return Math.min((100 - (((confGoal - (count1 + count2)) / confGoal) * 100)) + (((count1 + count1) > 5) ? (100 - likliness) : 0), 100);
        var total = count1 + count2;
        var liklinessOffset = (100 - likliness) / 2;
        var unConfidence = ((confGoal - total) / confGoal);
        var confidence = (100 - (unConfidence * 100));
        confidence += liklinessOffset;
        confidence = Math.max(0, Math.min(100, confidence));
        return confidence;
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
        var description;
        var confGoal = 1000;
        var confidence = this.getConfidence(confGoal, count1, count2, likliness);
        if (likliness == 100) {
            description = "These have the exact same number of binary expressions.";
        }
        else if (likliness > 90) {
            description = "These have a very similar number of binary expressions.";
        }
        else if (likliness > 70) {
            description = "These have a similar number of binary expressions, but we can't be certain that these files are the same.";
        }
        else if (likliness > 50) {
            description = "These do not have the same number of binary expressions. It is unlikely that these are duplicates.";
        }
        else {
            description = "One file has more than twice the number of binary expressions in it. It is very unlikely that these files are duplicates.";
        }
        if (count1 > 50 || count2 > 50) {
            description += "\n\nBecause of the large number of binary expressions (" + count1 + " and " + count2 + "), this should be considered a good test of similarity.";
        }
        else if (count1 <= 5 && count2 <= 5) {
            description += "\n\nBecause of the very small number of binary expressions (" + count1 + " and " + count2 + "), this should be considered a poor test of similarity.";
        }
        else {
            description += "\n\n(" + count1 + " and " + count2 + ")";
        }
        this.submitResults({ likeliness: likliness, resultDescription: description, confidence: confidence });
    };
    BinaryExpressionCompareAlgorithm.algorithmName = "Binary Expression";
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
        var description;
        var confGoal = 1000;
        var confidence = this.getConfidence(confGoal, count1, count2, likliness);
        if (likliness == 100) {
            description = "These have the exact same number of variable declarations.";
        }
        else if (likliness > 90) {
            description = "These have a very similar number of variable declarations.";
        }
        else if (likliness > 70) {
            description = "These have a similar number of variable declarations, but we can't be certain that these files are the same.";
        }
        else if (likliness > 50) {
            description = "These do not have the same number of variable declarations. It is unlikely that these are duplicates.";
        }
        else {
            description = "One file has more than twice the number of variables in it. It is very unlikely that these files are duplicates.";
        }
        if (count1 > 50 || count2 > 50) {
            description += "\n\nBecause of the large number of variables (" + count1 + " and " + count2 + "), this should be considered a good test of similarity.";
        }
        else if (count1 <= 5 && count2 <= 5) {
            description += "\n\nBecause of the very small number of variables (" + count1 + " and " + count2 + "), this should be considered a poor test of similarity.";
        }
        else {
            description += "\n\n(" + count1 + " and " + count2 + ")";
        }
        this.submitResults({ likeliness: likliness, resultDescription: description, confidence: confidence });
    };
    VariableDeclaratorComparisonAlgorithm.algorithmName = "Variable Declaration";
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
        var description;
        var confGoal = 2000;
        var confidence = this.getConfidence(confGoal, count1, count2, likliness);
        if (likliness == 100) {
            description = "These have the exact same number of function calls.";
        }
        else if (likliness > 90) {
            description = "These have a very similar number of function calls.";
        }
        else if (likliness > 70) {
            description = "These have a similar number of function calls, but we can't be certain that these files are the same.";
        }
        else if (likliness > 50) {
            description = "These do not have the same number of function calls. It is unlikely that these are duplicates.";
        }
        else {
            description = "One file has more than twice the number of function calls in it. It is very unlikely that these files are duplicates.";
        }
        if (count1 > 50 || count2 > 50) {
            description += "\n\nBecause of the large number of function calls (" + count1 + " and " + count2 + "), this should be considered a good test of similarity.";
        }
        else if (count1 <= 5 && count2 <= 5) {
            description += "\n\nBecause of the very small number of function calls (" + count1 + " and " + count2 + "), this should be considered a poor test of similarity.";
        }
        else {
            description += "\n\n(" + count1 + " and " + count2 + ")";
        }
        this.submitResults({ likeliness: likliness, resultDescription: description, confidence: confidence });
    };
    CallExpressionComparisonAlgorithm.algorithmName = "Call Expression";
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
        var description;
        var confGoal = 100;
        var confidence = this.getConfidence(confGoal, count1, count2, likliness);
        if (likliness == 100) {
            description = "These have the exact same number of literal declarations.";
        }
        else if (likliness > 90) {
            description = "These have a very similar number of literal declarations.";
        }
        else if (likliness > 70) {
            description = "These have a similar number of literal declarations, but we can't be certain that these files are the same.";
        }
        else if (likliness > 50) {
            description = "These do not have the same number of literal declarations. It is unlikely that these are duplicates.";
        }
        else {
            description = "One file has more than twice the number of literals in it. It is very unlikely that these files are duplicates.";
        }
        if (count1 > 50 || count2 > 50) {
            description += "\n\nBecause of the large number of literals (" + count1 + " and " + count2 + "), this should be considered a good test of similarity.";
        }
        else if (count1 <= 5 && count2 <= 5) {
            description += "\n\nBecause of the very small number of literals (" + count1 + " and " + count2 + "), this should be considered a poor test of similarity.";
        }
        else {
            description += "\n\n(" + count1 + " and " + count2 + ")";
        }
        this.submitResults({ likeliness: likliness, resultDescription: description, confidence: confidence });
    };
    LiteralComparisonAlgorithm.algorithmName = "Literal";
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
        var description;
        var confGoal = 25;
        var confidence = this.getConfidence(confGoal, count1, count2, likliness);
        console.log(confidence);
        if (likliness == 100) {
            description = "These have the exact same number of function declarations.";
        }
        else if (likliness > 90) {
            description = "These have a very similar number of function declarations.";
        }
        else if (likliness > 70) {
            description = "These have a similar number of function declarations, but we can't be certain that these files are the same.";
        }
        else if (likliness > 50) {
            description = "These do not have the same number of function declarations. It is unlikely that these are duplicates.";
        }
        else {
            description = "One file has more than twice the number of function in it. It is very unlikely that these files are duplicates.";
        }
        if (count1 > 50 || count2 > 50) {
            description += "\n\nBecause of the large number of functions (" + count1 + " and " + count2 + "), this should be considered a good test of similarity.";
        }
        else if (count1 <= 5 && count2 <= 5) {
            description += "\n\nBecause of the very small number of functions (" + count1 + " and " + count2 + "), this should be considered a poor test of similarity.";
        }
        else {
            description += "\n\n(" + count1 + " and " + count2 + ")";
        }
        this.submitResults({ likeliness: likliness, resultDescription: description, confidence: confidence });
    };
    FunctionDeclarationComparisonAlgorithm.algorithmName = "Function Declaration";
    return FunctionDeclarationComparisonAlgorithm;
})(ASTComparisonAlgorithm);
