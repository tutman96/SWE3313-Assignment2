<<<<<<< HEAD
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
abstract;
=======
>>>>>>> 0bcc9cc42c19f912c270206a87db1ab7f3a05669
var CompareAlgorithm = (function () {
    function CompareAlgorithm(file1, file2) {
        this.name = "";
        this.messageListeners = {};
<<<<<<< HEAD
        this.abstract = compareWorker();
        this.filename1 = filename1;
        this.filename2 = filename2;
=======
        this.file1 = file1;
        this.file2 = file2;
>>>>>>> 0bcc9cc42c19f912c270206a87db1ab7f3a05669
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
