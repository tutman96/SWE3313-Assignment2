abstract class CompareAlgorithm {
	protected file1: File;
	protected file2: File;

	messageListeners: { [eventTypes: string]: Array<(data: any) => void> } = {};
	onResultsCallback: (err?, results?) => void;

	constructor(file1: File, file2: File) {
		this.file1 = file1;
		this.file2 = file2;
		this.setup();
	}

	start(callback: (err) => void = function() { }) {
		console.log("Starting");
		this.compareWorker();
		this.onResultsCallback = callback;
		this.submitProgress(0);
	}

	abstract compareWorker();
	protected setup() {

	}

	emit(eventType: string, message: any) {
		(this.messageListeners[eventType] || []).forEach(func => func(message));
	}

	on(eventType: string, callback: (message: any) => void) {
		if (!this.messageListeners[eventType]) this.messageListeners[eventType] = [];
		this.messageListeners[eventType].push(callback);
	}

	protected submitProgress(progress: number) {
		this.emit("progress", progress);
	}

	protected submitResults(results: { likeliness: number, resultDescription?: string }) {
		this.submitProgress(100);
		this.emit("results", results);
		if (this.onResultsCallback) this.onResultsCallback(null, results);
	}

	protected throwError(error: any) {
		this.onResultsCallback(error);
		this.emit("error", error);
	}

	onProgress(callback: (progress: number) => void) {
		this.on("progress", callback);
	}

	onResults(callback: (results: { likeliness: number, resultDescription?: string }) => void) {
		this.on("results", callback);
	}
}

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

// var fnca = new FileNameCompareAlgorithm("2", "2")
// fnca.onProgress((message) => {
// 	console.log("got progress", message);
// });
// fnca.onResults((r) => {
// 	console.log(r);
// })
// fnca.start(() => {
// 	console.log("Done!");
// });
// fnca.emit("test", ["ha"]);