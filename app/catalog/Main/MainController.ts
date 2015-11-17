///<reference path="../../scripts/FileComparatorService"/>

class MainController {

	file1: File;
	file2: File;

	static $inject = ['$scope','FileComparatorService'];
	constructor(private $scope: angular.IScope, private FileComparatorService: FileComparatorService) {
		this.$scope['mc'] = this;
	}

	start() {
		console.log("File1:", this.file1);
		console.log("File2:", this.file2);
		var fnca = new FileNameCompareAlgorithm(this.file1, this.file2)
		fnca.onProgress((message) => {
			console.log("got progress", message);
		});
		
		this.FileComparatorService.addCompareAlgoritm(fnca);
		
		this.FileComparatorService.start((err, results) => {
			if (err) throw err;
			console.log(results);
		});
	}
}
angular.module('assignment2').controller("MainController", MainController);