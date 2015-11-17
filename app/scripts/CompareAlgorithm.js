var CompareAlgorithm = (function () {
    function CompareAlgorithm(file1, file2) {
        this.name = "";
        this.messageListeners = {};
        this.file1 = file1;
        this.file2 = file2;
        this.setup();
    }
    CompareAlgorithm.prototype.start = function () {
        this.submitProgress(0);
        this.compareWorker();
    };
    CompareAlgorithm.prototype.setup = function () {
    };
    CompareAlgorithm.prototype.emit = function (eventType, message) {
        (this.messageListeners[eventType] || []).forEach(function (func) { return func(message); });
    };
    CompareAlgorithm.prototype.on = function (eventType, callback) {
        if (!this.messageListeners[eventType])
            this.messageListeners[eventType] = [];
        this.messageListeners[eventType].push(callback);
    };
    CompareAlgorithm.prototype.submitProgress = function (progress) {
        this.emit("progress", progress);
    };
    CompareAlgorithm.prototype.submitResults = function (results) {
        this.submitProgress(100);
        this.emit("results", results);
    };
    CompareAlgorithm.prototype.throwError = function (error) {
        this.emit("error", error);
    };
    CompareAlgorithm.prototype.onProgress = function (callback) {
        this.on("progress", callback);
    };
    CompareAlgorithm.prototype.onResults = function (callback) {
        this.on("results", callback);
    };
    return CompareAlgorithm;
})();
