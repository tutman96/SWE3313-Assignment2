abstract class CompareAlgorithm {
	protected file1: File;
	protected file2: File;
	
	protected name: string = "";
	protected static weight: number = 1;

	messageListeners: { [eventTypes: string]: Array<(data: any) => void> } = {};

	constructor(file1: File, file2: File) {
		this.file1 = file1;
		this.file2 = file2;
		this.setup();
	}

	start() {
		this.submitProgress(0);
		this.compareWorker();
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
	}

	protected throwError(error: any) {
		this.emit("error", error);
	}

	onProgress(callback: (progress: number) => void) {
		this.on("progress", callback);
	}

	onResults(callback: (results: { likeliness: number, resultDescription?: string }) => void) {
		this.on("results", callback);
	}
}