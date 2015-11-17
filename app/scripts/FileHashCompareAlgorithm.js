var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FileHashCompareAlgorithm = (function (_super) {
    __extends(FileHashCompareAlgorithm, _super);
    function FileHashCompareAlgorithm() {
        _super.apply(this, arguments);
    }
    FileHashCompareAlgorithm.prototype.setup = function () {
    };
    FileHashCompareAlgorithm.prototype.md5 = function (str) {
        return require('crypto')
            .createHash('md5')
            .update(str, 'utf8')
            .digest('base64');
    };
    FileHashCompareAlgorithm.prototype.compareWorker = function () {
        var _this = this;
        var fs = require('fs');
        try {
            fs.readFile(this.file1.path, function (err, data) {
                if (err) {
                    _this.throwError(err);
                    return;
                }
                var hash1 = _this.md5(data);
                _this.submitProgress(40);
                fs.readFile(_this.file2.path, function (err, data) {
                    if (err) {
                        _this.throwError(err);
                        return;
                    }
                    var hash2 = _this.md5(data);
                    _this.submitProgress(80);
                    if (hash1 == hash2) {
                        _this.submitResults({
                            likeliness: 100,
                            resultDescription: "They contain the same data"
                        });
                    }
                    else {
                        _this.submitResults({
                            likeliness: 0,
                            resultDescription: "They don't contain the same data"
                        });
                    }
                });
            });
        }
        catch (err) {
            this.throwError(err);
        }
    };
    return FileHashCompareAlgorithm;
})(CompareAlgorithm);
