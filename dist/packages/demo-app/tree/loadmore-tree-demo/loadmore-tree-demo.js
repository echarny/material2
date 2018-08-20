"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var tree_2 = require("@angular/material/tree");
var loadmore_database_1 = require("./loadmore-database");
var LOAD_MORE = 'LOAD_MORE';
/**
 * When a node has a large number of children, only load part of the children, and display a
 * `Load more...` button to manually request for more data in the tree.
 */
var LoadmoreTreeDemo = /** @class */ (function () {
    function LoadmoreTreeDemo(database) {
        var _this = this;
        this.database = database;
        this.nodeMap = new Map();
        this.getChildren = function (node) { return node.childrenChange; };
        this.transformer = function (node, level) {
            if (_this.nodeMap.has(node.item)) {
                return _this.nodeMap.get(node.item);
            }
            var newNode = new loadmore_database_1.LoadmoreFlatNode(node.item, level, node.hasChildren, node.loadMoreParentItem);
            _this.nodeMap.set(node.item, newNode);
            return newNode;
        };
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.expandable; };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.isLoadMore = function (_, _nodeData) { return _nodeData.item === LOAD_MORE; };
        this.treeFlattener = new tree_2.MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new tree_2.MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        database.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
        });
        database.initialize();
    }
    /** Load more nodes from data source */
    LoadmoreTreeDemo.prototype.loadMore = function (item) {
        this.database.loadMore(item);
    };
    LoadmoreTreeDemo.prototype.loadChildren = function (node) {
        this.database.loadMore(node.item, true);
    };
    LoadmoreTreeDemo = __decorate([
        core_1.Component({selector: 'loadmore-tree-demo',
            template: "<mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"> <!-- Leaf node --> <mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodePadding> <button mat-icon-button disabled></button> {{node.item}} </mat-tree-node> <!-- expandable node --> <mat-tree-node *matTreeNodeDef=\"let node; when: hasChild\" matTreeNodePadding> <button mat-icon-button [attr.aria-label]=\"'toggle ' + node.filename\" (click)=\"loadChildren(node)\" matTreeNodeToggle> <mat-icon class=\"mat-icon-rtl-mirror\"> {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> {{node.item}} </mat-tree-node> <mat-tree-node *matTreeNodeDef=\"let node; when: isLoadMore\"> <button mat-button (click)=\"loadMore(node.loadMoreParentItem)\"> Load more... </button> </mat-tree-node> </mat-tree> ",
            styles: [""],
            providers: [loadmore_database_1.LoadmoreDatabase]
        }),
        __metadata("design:paramtypes", [loadmore_database_1.LoadmoreDatabase])
    ], LoadmoreTreeDemo);
    return LoadmoreTreeDemo;
}());
exports.LoadmoreTreeDemo = LoadmoreTreeDemo;
//# sourceMappingURL=loadmore-tree-demo.js.map