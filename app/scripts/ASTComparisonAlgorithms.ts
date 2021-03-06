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
		} catch (err) { this.throwError(new Error("There was a problem generating the AST.")) }
		this.submitProgress(50);
		this.compareASTs();
	}

	protected getPercentSimilarity(n1, n2) {
		let min = Math.min(n1, n2) + 1
		let max = Math.max(n1, n2) + 1
		return 100 - (((max - min) / max) * 100)
	}
	
	protected getConfidence(confGoal:number,count1:number,count2:number,likliness:number)
	{
		//return Math.min((100 - (((confGoal - (count1 + count2)) / confGoal) * 100)) + (((count1 + count1) > 5) ? (100 - likliness) : 0), 100);
		var total = count1+count2;
		var liklinessOffset = (100-likliness) / 2
		var unConfidence = ((confGoal - total)/confGoal);
		var confidence = (100 - (unConfidence * 100));
		confidence += liklinessOffset;
		confidence = Math.max(0,Math.min(100,confidence));
		return confidence;
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
	static algorithmName = "Binary Expression"
	public compareASTs() {
		var count1 = this.countElement("BinaryExpression", this.ast1);
		var count2 = this.countElement("BinaryExpression", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		var confGoal = 1000;
		var confidence = this.getConfidence(confGoal,count1,count2,likliness)

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
			description += `\n\nBecause of the large number of binary expressions (${count1} and ${count2}), this should be considered a good test of similarity.`
		} else if (count1 <= 5 && count2 <= 5) {
			description += `\n\nBecause of the very small number of binary expressions (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}else {
			description += `\n\n(${count1} and ${count2})`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description, confidence:confidence});
	}

}

class VariableDeclaratorComparisonAlgorithm extends ASTComparisonAlgorithm {
	static algorithmName = "Variable Declaration"
	public compareASTs() {
		var count1 = this.countElement("VariableDeclarator", this.ast1);
		var count2 = this.countElement("VariableDeclarator", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		var confGoal = 1000;
		var confidence = this.getConfidence(confGoal,count1,count2,likliness)
		
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
			description += `\n\nBecause of the large number of variables (${count1} and ${count2}), this should be considered a good test of similarity.`
		} else if (count1 <= 5 && count2 <= 5) {
			description += `\n\nBecause of the very small number of variables (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}else {
			description += `\n\n(${count1} and ${count2})`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description, confidence:confidence});
	}

}

class CallExpressionComparisonAlgorithm extends ASTComparisonAlgorithm {
	static algorithmName = "Call Expression"
	public compareASTs() {
		var count1 = this.countElement("CallExpression", this.ast1);
		var count2 = this.countElement("CallExpression", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		var confGoal = 2000;
		var confidence = this.getConfidence(confGoal,count1,count2,likliness)
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
			description += `\n\nBecause of the large number of function calls (${count1} and ${count2}), this should be considered a good test of similarity.`
		} else if (count1 <= 5 && count2 <= 5) {
			description += `\n\nBecause of the very small number of function calls (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}else {
			description += `\n\n(${count1} and ${count2})`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description, confidence:confidence});
	}

}

class LiteralComparisonAlgorithm extends ASTComparisonAlgorithm {
	static algorithmName = "Literal"
	public compareASTs() {
		var count1 = this.countElement("Literal", this.ast1);
		var count2 = this.countElement("Literal", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		var confGoal = 100;
		var confidence = this.getConfidence(confGoal,count1,count2,likliness)
		
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
			description += `\n\nBecause of the large number of literals (${count1} and ${count2}), this should be considered a good test of similarity.`
		} else if (count1 <= 5 && count2 <= 5) {
			description += `\n\nBecause of the very small number of literals (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}else {
			description += `\n\n(${count1} and ${count2})`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description, confidence:confidence});
	}

}

class FunctionDeclarationComparisonAlgorithm extends ASTComparisonAlgorithm {
	static algorithmName = "Function Declaration"
	public compareASTs() {
		var count1 = this.countElement("FunctionDeclaration", this.ast1);
		var count2 = this.countElement("FunctionDeclaration", this.ast2);
		var likliness = this.getPercentSimilarity(count1, count2);
		var description: string;
		var confGoal = 25;
		var confidence = this.getConfidence(confGoal,count1,count2,likliness)
		console.log(confidence)
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
			description += `\n\nBecause of the large number of functions (${count1} and ${count2}), this should be considered a good test of similarity.`	
		} else if (count1 <= 5 && count2 <= 5) {
			description += `\n\nBecause of the very small number of functions (${count1} and ${count2}), this should be considered a poor test of similarity.`
		}
		else {
			description += `\n\n(${count1} and ${count2})`
		}

		this.submitResults({ likeliness: likliness, resultDescription: description, confidence:confidence});
	}

}