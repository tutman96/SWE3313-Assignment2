///<reference path="../../scripts/FileComparatorService"/>

enum AlgorithmStatus {
	Running = 0,
	Finished = 1,
	Error = 2
}

class ResultsController {

	file1: File;
	file2: File;

	titleText = "Processing...";

	private algorithms = [
		// FileNameCompareAlgorithm,
		// FileHashCompareAlgorithm,
		BinaryExpressionCompareAlgorithm,
		VariableDeclaratorComparisonAlgorithm,
		CallExpressionComparisonAlgorithm,
		LiteralComparisonAlgorithm,
		FunctionDeclarationComparisonAlgorithm
	];

	results = new Array<{
		name: string,
		progress: number,
		status?: AlgorithmStatus,
		likeliness?: number,
		resultDescription?: string
	}>();

	static $inject = ['$scope', '$state', '$stateParams', 'FileComparatorService'];
	constructor(private $scope: angular.IScope, private $state: angular.ui.IStateService, private $stateParams, private FileComparatorService: FileComparatorService) {
		this.$scope['rc'] = this;
		console.log($stateParams);

		this.file1 = $stateParams['file1'];
		this.file2 = $stateParams['file2'];

		if (typeof this.file1 == "string" || typeof this.file2 == "string") {
			this.$state.go("home");
			return;
		}

		this.algorithms.forEach(algorithmClass => {
			var al = new algorithmClass(this.file1, this.file2);

			var result = {
				name: al.constructor['name'],
				progress: null,
				status: AlgorithmStatus.Running,
				likeliness: 0,
				resultDescription: ""
			}

			this.results.push(result);

			al.onProgress((progress) => {
				this.safeApply(() => {
					result.progress = progress;
				});
			})

			al.onResults((algorithmResults) => {
				console.log("Results:", algorithmResults);
				this.safeApply(() => {
					result.status = AlgorithmStatus.Finished;
					result.likeliness = algorithmResults.likeliness;
					result.resultDescription = algorithmResults.resultDescription;
				});
			})

			al.on("error", (err: Error) => {
				this.safeApply(() => {
					result.status = AlgorithmStatus.Error;
					result.resultDescription = err.message;
				});
			})

			this.FileComparatorService.addCompareAlgoritm(al);
		});

		setTimeout(() => {
			this.FileComparatorService.start((err, results) => {
				this.safeApply(() => {
					this.titleText = "Compiling results..."
				});
				setTimeout(() => {
					this.$state.go("end", {
						results: results
					})
				}, 1000);
			});
		}, 500);
	}

	safeApply(fn?: () => void) {
		var phase = this.$scope.$root.$$phase;
		if (phase == '$apply' || phase == '$digest') {
			if (fn && (typeof (fn) === 'function')) {
				fn();
			}
		} else {
			this.$scope.$apply(fn);
		}
	};
}
angular.module('assignment2').controller("ResultsController", ResultsController);

angular.module('assignment2').filter('capitalize', () => {
	return function(input, all) {
		var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		return (!!input) ? input.replace(reg, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }) : '';
	}
});