class FileHashCompareAlgorithm extends CompareAlgorithm {
	setup() {

	}

	md5(str) {
		return require('crypto')
			.createHash('md5')
			.update(str, 'utf8')
			.digest('base64')
	}

	compareWorker() {
		var fs = require('fs');
		
		try {
			fs.readFile(this.file1.path, (err, data) => {
				if (err) {
					this.throwError(err);
					return;
				}
				var hash1 = this.md5(data);
				this.submitProgress(40);

				fs.readFile(this.file2.path, (err, data) => {
					if (err) {
						this.throwError(err);
						return;
					}
					var hash2 = this.md5(data);
					this.submitProgress(80);

					if (hash1 == hash2) {
						this.submitResults({
							likeliness: 100,
							resultDescription: "They contain the same data"
						})
					}
					else {
						this.submitResults({
							likeliness: 0,
							resultDescription: "They don't contain the same data"
						})
					}
				})
			})
		}
		catch (err) {
			this.throwError(err);
		}
	}
}