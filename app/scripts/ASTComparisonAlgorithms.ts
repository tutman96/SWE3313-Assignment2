var parser = require("esprima");
var traverser = require("estraverse");

abstract class ASTComparisonAlgorithm extends CompareAlgorithm {

	protected ast1: any;
	protected ast2: any;

	compareWorker() {
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
		} catch (Error) { this.throwError(new Error("There was a problem generating the AST.")) }
		this.submitProgress(50);
		this.compareASTs();
	}

	protected getPercentSimilarity(n1, n2) {
		let min = Math.min(n1, n2) + 1
		let max = Math.max(n1, n2) + 1
		return 100 - (((max - min) / max) * 100)
	}

	protected countElement(element: string, ast: any) {
		var count = 0;
		traverser.traverse(ast, {
			enter: (node, parent) => {
				if (node.type == element)
					count++;
			}
		})
		return count;
	}

	abstract compareASTs()

}

class BinaryExpressionCompareAlgorithm extends ASTComparisonAlgorithm {

	public compareASTs() {
		var count1 = this.countElement("BinaryExpression", this.ast1);
		var count2 = this.countElement("BinaryExpression", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		this.submitResults({ likeliness: likliness, resultDescription: "" });
	}

}

class VariableDeclaratorComparisonAlgorithm extends ASTComparisonAlgorithm {

	public compareASTs() {
		var count1 = this.countElement("VariableDeclarator", this.ast1);
		var count2 = this.countElement("VariableDeclarator", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		this.submitResults({ likeliness: likliness, resultDescription: "" });
	}

}

class CallExpressionComparisonAlgorithm extends ASTComparisonAlgorithm {

	public compareASTs() {
		var count1 = this.countElement("CallExpression", this.ast1);
		var count2 = this.countElement("CallExpression", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		this.submitResults({ likeliness: likliness, resultDescription: "" });
	}

}

class LiteralComparisonAlgorithm extends ASTComparisonAlgorithm {

	public compareASTs() {
		var count1 = this.countElement("Literal", this.ast1);
		var count2 = this.countElement("Literal", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		this.submitResults({ likeliness: likliness, resultDescription: "" });
	}

}

class FunctionDeclarationComparisonAlgorithm extends ASTComparisonAlgorithm {

	public compareASTs() {
		var count1 = this.countElement("FunctionDeclaration", this.ast1);
		var count2 = this.countElement("FunctionDeclaration", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		this.submitResults({ likeliness: likliness, resultDescription: "" });
	}

}