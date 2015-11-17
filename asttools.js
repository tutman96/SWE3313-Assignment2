var traverser = require("estraverse");
module.exports = function countTypes(typename, ast) {
    var count = 0;
    traverser.traverse(ast, {
        enter: function (node, parent) {
            if (node.type == typename)
                count++;
        }
    });
    return count;
};
