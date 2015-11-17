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
			this.ast1 = parser.parse(this.file1);
			this.ast2 = parser.parse(this.file2);
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
	static name = "Binary Expression Comparison Algorithm"
	public compareASTs() {
		var count1 = this.countElement("BinaryExpression", this.ast1);
		var count2 = this.countElement("BinaryExpression", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;

		if (likliness == 100) {
			description = "These have the exact same number of binary expressions."
		} else if (likliness > 90) {
			description = "These have a very similar number of binary expressions."
		} else if (likliness > 70) {
			description = "These have a similar number of binary expressions, but we can't be certain that these files are the same."

		} else if (likliness > 50) {
			description = "These do not have the same number of binary expressions. It is unlikely that these are duplicates."
		} else {
			description = "One file has more than twice the number of binary expressions in it. It is very unlikely that these files are duplicates."
		}
		if (count1 > 50 || count2 > 50) {
			description += ` Because of the large number of binary expressions (${count1} and ${count2}), this should be considered a good test of similarity.`
		}
		if (count1 <= 5 && count2 <= 5) {
			description += ` Because of the very small number of binary expressions (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description });
	}

}

class VariableDeclaratorComparisonAlgorithm extends ASTComparisonAlgorithm {
	static name = "Binary Expression Comparison Algorithm"
	public compareASTs() {
		var count1 = this.countElement("VariableDeclarator", this.ast1);
		var count2 = this.countElement("VariableDeclarator", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;

		if (likliness == 100) {
			description = "These have the exact same number of variable declarations."
		} else if (likliness > 90) {
			description = "These have a very similar number of variable declarations."
		} else if (likliness > 70) {
			description = "These have a similar number of variable declarations, but we can't be certain that these files are the same."

		} else if (likliness > 50) {
			description = "These do not have the same number of variable declarations. It is unlikely that these are duplicates."
		} else {
			description = "One file has more than twice the number of variables in it. It is very unlikely that these files are duplicates."
		}
		if (count1 > 50 || count2 > 50) {
			description += ` Because of the large number of variables (${count1} and ${count2}), this should be considered a good test of similarity.`
		}
		if (count1 <= 5 && count2 <= 5) {
			description += ` Because of the very small number of variables (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description });
	}

}

class CallExpressionComparisonAlgorithm extends ASTComparisonAlgorithm {
	static name = "Call Expression Comparison Algorithm"
	public compareASTs() {
		var count1 = this.countElement("CallExpression", this.ast1);
		var count2 = this.countElement("CallExpression", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		if (likliness == 100) {
			description = "These have the exact same number of function calls."
		} else if (likliness > 90) {
			description = "These have a very similar number of function calls."
		} else if (likliness > 70) {
			description = "These have a similar number of function calls, but we can't be certain that these files are the same."
		} else if (likliness > 50) {
			description = "These do not have the same number of function calls. It is unlikely that these are duplicates."
		} else {
			description = "One file has more than twice the number of function calls in it. It is very unlikely that these files are duplicates."
		}
		if (count1 > 50 || count2 > 50) {
			description += ` Because of the large number of function calls (${count1} and ${count2}), this should be considered a good test of similarity.`
		}
		if (count1 <= 5 && count2 <= 5) {
			description += ` Because of the very small number of function calls (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description });
	}

}

class LiteralComparisonAlgorithm extends ASTComparisonAlgorithm {
	static name = "Literal Comparison Algorithm"
	public compareASTs() {
		var count1 = this.countElement("Literal", this.ast1);
		var count2 = this.countElement("Literal", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		if (likliness == 100) {
			description = "These have the exact same number of literal declarations."
		} else if (likliness > 90) {
			description = "These have a very similar number of literal declarations."
		} else if (likliness > 70) {
			description = "These have a similar number of literal declarations, but we can't be certain that these files are the same."
		} else if (likliness > 50) {
			description = "These do not have the same number of literal declarations. It is unlikely that these are duplicates."
		} else {
			description = "One file has more than twice the number of literals in it. It is very unlikely that these files are duplicates."
		}
		if (count1 > 50 || count2 > 50) {
			description += ` Because of the large number of literals (${count1} and ${count2}), this should be considered a good test of similarity.`
		}
		if (count1 <= 5 && count2 <= 5) {
			description += ` Because of the very small number of literals (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description });
	}

}

class FunctionDeclarationComparisonAlgorithm extends ASTComparisonAlgorithm {
	static name = "Function Declaration Comparison Algorithm"
	public compareASTs() {
		var count1 = this.countElement("FunctionDeclaration", this.ast1);
		var count2 = this.countElement("FunctionDeclaration", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;

		if (likliness == 100) {
			description = "These have the exact same number of function declarations."
		} else if (likliness > 90) {
			description = "These have a very similar number of function declarations."
		} else if (likliness > 70) {
			description = "These have a similar number of function declarations, but we can't be certain that these files are the same."

		} else if (likliness > 50) {
			description = "These do not have the same number of function declarations. It is unlikely that these are duplicates."
		} else {
			description = "One file has more than twice the number of function in it. It is very unlikely that these files are duplicates."
		}
		if (count1 > 50 || count2 > 50) {
			description += ` Because of the large number of function (${count1} and ${count2}), this should be considered a good test of similarity.`
		}
		if (count1 <= 5 && count2 <= 5) {
			description += ` Because of the very small number of function (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description });
	}

}