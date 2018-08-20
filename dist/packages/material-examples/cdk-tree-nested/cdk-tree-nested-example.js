"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var tree_2 = require("@angular/material/tree");
var rxjs_1 = require("rxjs");
/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
var /**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
FileNode = /** @class */ (function () {
    function FileNode() {
    }
    return FileNode;
}());
exports.FileNode = FileNode;
/**
 * The Json tree data in string. The data could be parsed into Json object
 */
var TREE_DATA = JSON.stringify({
    Applications: {
        Calendar: 'app',
        Chrome: 'app',
        Webstorm: 'app'
    },
    Documents: {
        angular: {
            src: {
                compiler: 'ts',
                core: 'ts'
            }
        },
        material2: {
            src: {
                button: 'ts',
                checkbox: 'ts',
                input: 'ts'
            }
        }
    },
    Downloads: {
        October: 'pdf',
        November: 'pdf',
        Tutorial: 'html'
    },
    Pictures: {
        'Photo Booth Library': {
            Contents: 'dir',
            Pictures: 'dir'
        },
        Sun: 'png',
        Woods: 'jpg'
    }
});
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
var FileDatabase = /** @class */ (function () {
    function FileDatabase() {
        this.dataChange = new rxjs_1.BehaviorSubject([]);
        this.initialize();
    }
    Object.defineProperty(FileDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    FileDatabase.prototype.initialize = function () {
        // Parse the string to json object.
        var dataObject = JSON.parse(TREE_DATA);
        // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
        //     file node as children.
        var data = this.buildFileTree(dataObject, 0);
        // Notify the change.
        this.dataChange.next(data);
    };
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `FileNode`.
     */
    /**
       * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
       * The return value is the list of `FileNode`.
       */
    FileDatabase.prototype.buildFileTree = /**
       * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
       * The return value is the list of `FileNode`.
       */
    function (obj, level) {
        var _this = this;
        return Object.keys(obj).reduce(function (accumulator, key) {
            var value = obj[key];
            var node = new FileNode();
            node.filename = key;
            if (value != null) {
                if (typeof value === 'object') {
                    node.children = _this.buildFileTree(value, level + 1);
                }
                else {
                    node.type = value;
                }
            }
            return accumulator.concat(node);
        }, []);
    };
    FileDatabase.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    FileDatabase.ctorParameters = function () { return []; };
    return FileDatabase;
}());
exports.FileDatabase = FileDatabase;
/**
 * @title Tree with nested nodes
 */
var CdkTreeNestedExample = /** @class */ (function () {
    function CdkTreeNestedExample(database) {
        var _this = this;
        this.hasNestedChild = function (_, nodeData) { return !nodeData.type; };
        this._getChildren = function (node) { return rxjs_1.of(node.children); };
        this.nestedTreeControl = new tree_1.NestedTreeControl(this._getChildren);
        this.nestedDataSource = new tree_2.MatTreeNestedDataSource();
        database.dataChange.subscribe(function (data) { return _this.nestedDataSource.data = data; });
    }
    CdkTreeNestedExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cdk-tree-nested-example',
                    template: "<cdk-tree [dataSource]=\"nestedDataSource\" [treeControl]=\"nestedTreeControl\"><cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"example-tree-node\"><button mat-icon-button disabled=\"disabled\"></button> {{node.filename}}: {{node.type}}</cdk-nested-tree-node><cdk-nested-tree-node *cdkTreeNodeDef=\"let node; when: hasNestedChild\" class=\"example-tree-node\"><button mat-icon-button [attr.aria-label]=\"'toggle ' + node.filename\" cdkTreeNodeToggle><mat-icon class=\"mat-icon-rtl-mirror\">{{nestedTreeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon></button> {{node.filename}}: {{node.type}}<div [class.example-tree-invisible]=\"!nestedTreeControl.isExpanded(node)\"><ng-container cdkTreeNodeOutlet></ng-container></div></cdk-nested-tree-node></cdk-tree>",
                    styles: [".example-tree-invisible { display: none; } .example-tree ul, .example-tree li { margin-top: 0; margin-bottom: 0; list-style-type: none; } .example-tree-node { display: block; padding-left: 40px; } "],
                    providers: [FileDatabase]
                },] },
    ];
    /** @nocollapse */
    CdkTreeNestedExample.ctorParameters = function () { return [
        { type: FileDatabase, },
    ]; };
    return CdkTreeNestedExample;
}());
exports.CdkTreeNestedExample = CdkTreeNestedExample;
//# sourceMappingURL=cdk-tree-nested-example.js.map