class FileNameCompareAlgorithm extends CompareAlgorithm {
	setup() {
		
	}

	compareWorker() {
		if (this.file1.path == this.file2.path) {
			this.submitResults({
				likeliness: 100,
				resultDescription: "The file names and paths match"
			})
		}
		else {
			this.submitResults({
				likeliness: 0,
				resultDescription: "The file names aren't the same"
			})
		}
	}
}