class MainController {

	file1: File;
	file2: File;

	static $inject = ['$scope'];
	constructor(private $scope: angular.IScope) {
		this.$scope['mc'] = this;
	}

	start() {
		console.log("File1:", this.file1);
		console.log("File2:", this.file2);
		var fnca = new FileNameCompareAlgorithm(this.file1, this.file2)
		fnca.onProgress((message) => {
			console.log("got progress", message);
		});
		fnca.onResults((r) => {
			console.log(r);
		})
		fnca.start(() => {
			console.log("Done!");
		});
		fnca.emit("test", ["ha"]);
	}
}
angular.module('assignment2').controller("MainController", MainController);