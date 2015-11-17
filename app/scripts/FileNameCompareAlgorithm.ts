class FileNameCompareAlgorithm extends CompareAlgorithm {
	setup() {
		this.on("test", (message) => {
			console.log("Test:", message);
		})
	}

	compareWorker() {
		if (this.file1.path == this.file2.path) {
			this.submitResults({
				likeliness: 100,
				resultDescription: "They are exact"
			})
		}
		else {
			this.submitResults({
				likeliness: 0,
				resultDescription: "They aren't the same"
			})
		}
	}
}