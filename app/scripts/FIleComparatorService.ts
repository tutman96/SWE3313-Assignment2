///<reference path="../../typings/tsd.d.ts"/>

class FileComparatorService {

	private algoritms = new Array<CompareAlgorithm>();

	static $inject = [];

	constructor() {

	}

	public addCompareAlgoritm(algorithm: CompareAlgorithm) {
		if (!(algorithm instanceof CompareAlgorithm)) {
			throw new Error(algorithm.toString() + " is not an instace of CompareAlgorithm");
		}

		this.algoritms.push(algorithm);
	}

	public start(onFinished: AsyncResultArrayCallback<any>) {
		var functs: Dictionary<AsyncFunction<any>> = {};

		this.algoritms.forEach(algorithm => {
			functs[algorithm.constructor['name']] = (callback) => {
				algorithm.on("error", (err) => {
					callback(err);
				})

				algorithm.onResults((results) => {
					setTimeout(() => {
						callback(null, results);
					},250)
				})
				
				algorithm.start();
			}
		});

		async.series(functs, onFinished);
	}
}
angular.module('assignment2').service("FileComparatorService", FileComparatorService);