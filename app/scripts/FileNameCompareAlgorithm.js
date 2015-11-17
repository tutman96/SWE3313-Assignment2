var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FileNameCompareAlgorithm = (function (_super) {
    __extends(FileNameCompareAlgorithm, _super);
    function FileNameCompareAlgorithm() {
        _super.apply(this, arguments);
    }
    FileNameCompareAlgorithm.prototype.setup = function () {
    };
    FileNameCompareAlgorithm.prototype.compareWorker = function () {
        if (this.file1.path == this.file2.path) {
            this.submitResults({
                likeliness: 100,
                resultDescription: "The file names and paths match"
            });
        }
        else {
            this.submitResults({
                likeliness: 0,
                resultDescription: "The file names aren't the same"
            });
        }
    };
    return FileNameCompareAlgorithm;
})(CompareAlgorithm);
