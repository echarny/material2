"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
var FileNode = /** @class */ (function () {
    function FileNode() {
    }
    return FileNode;
}());
exports.FileNode = FileNode;
/** Flat node with expandable and level information */
var FileFlatNode = /** @class */ (function () {
    function FileFlatNode() {
    }
    return FileFlatNode;
}());
exports.FileFlatNode = FileFlatNode;
/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
var TREE_DATA = "\n  {\n    \"Documents\": {\n      \"angular\": {\n        \"src\": {\n          \"core\": \"ts\",\n          \"compiler\": \"ts\"\n        }\n      },\n      \"material2\": {\n        \"src\": {\n          \"button\": \"ts\",\n          \"checkbox\": \"ts\",\n          \"input\": \"ts\"\n        }\n      }\n    },\n    \"Downloads\": {\n        \"Tutorial\": \"html\",\n        \"November\": \"pdf\",\n        \"October\": \"pdf\"\n    },\n    \"Pictures\": {\n        \"Sun\": \"png\",\n        \"Woods\": \"jpg\",\n        \"Photo Booth Library\": {\n          \"Contents\": \"dir\",\n          \"Pictures\": \"dir\"\n        }\n    },\n    \"Applications\": {\n        \"Chrome\": \"app\",\n        \"Calendar\": \"app\",\n        \"Webstorm\": \"app\"\n    }\n}";
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
    FileDatabase.prototype.buildFileTree = function (value, level) {
        var data = [];
        for (var k in value) {
            var v = value[k];
            var node = new FileNode();
            node.filename = "" + k;
            if (v === null || v === undefined) {
                // no action
            }
            else if (typeof v === 'object') {
                node.children = this.buildFileTree(v, level + 1);
            }
            else {
                node.type = v;
            }
            data.push(node);
        }
        return data;
    };
    FileDatabase = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FileDatabase);
    return FileDatabase;
}());
exports.FileDatabase = FileDatabase;
//# sourceMappingURL=file-database.js.map