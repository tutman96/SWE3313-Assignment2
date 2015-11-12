var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CompareAlgorithm = (function () {
    function CompareAlgorithm(file1, file2) {
        this.messageListeners = {};
        this.file1 = file1;
        this.file2 = file2;
        this.setup();
    }
    CompareAlgorithm.prototype.start = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        console.log("Starting");
        this.compareWorker();
        this.onResultsCallback = callback;
        this.submitProgress(0);
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
        if (this.onResultsCallback)
            this.onResultsCallback(null, results);
    };
    CompareAlgorithm.prototype.throwError = function (error) {
        this.onResultsCallback(error);
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
var FileNameCompareAlgorithm = (function (_super) {
    __extends(FileNameCompareAlgorithm, _super);
    function FileNameCompareAlgorithm() {
        _super.apply(this, arguments);
    }
    FileNameCompareAlgorithm.prototype.setup = function () {
        this.on("test", function (message) {
            console.log("Test:", message);
        });
    };
    FileNameCompareAlgorithm.prototype.compareWorker = function () {
        if (this.file1.path == this.file2.path) {
            this.submitResults({
                likeliness: 100,
                resultDescription: "They are exact"
            });
        }
        else {
            this.submitResults({
                likeliness: 0,
                resultDescription: "They aren't the same"
            });
        }
    };
    return FileNameCompareAlgorithm;
})(CompareAlgorithm);
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
