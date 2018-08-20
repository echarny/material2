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
var file_database_1 = require("./file-database");
var TreeDemo = /** @class */ (function () {
    function TreeDemo(database) {
        var _this = this;
        this.transformer = function (node, level) {
            var flatNode = new file_database_1.FileFlatNode();
            flatNode.filename = node.filename;
            flatNode.type = node.type;
            flatNode.level = level;
            flatNode.expandable = !!node.children;
            return flatNode;
        };
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.expandable; };
        this.getChildren = function (node) { return node.children; };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.hasNestedChild = function (_, nodeData) { return !(nodeData.type); };
        this.treeFlattener = new tree_2.MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        // For flat tree
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new tree_2.MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        // For nested tree
        this.nestedTreeControl = new tree_1.NestedTreeControl(this.getChildren);
        this.nestedDataSource = new tree_2.MatTreeNestedDataSource();
        database.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
            _this.nestedDataSource.data = data;
        });
    }
    TreeDemo = __decorate([
        core_1.Component({selector: 'tree-demo',
            template: "<mat-accordion class=\"demo-tree-container\"> <mat-expansion-panel> <mat-expansion-panel-header>Flattened tree</mat-expansion-panel-header> <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"> <mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle matTreeNodePadding> <button mat-icon-button disabled></button> {{node.filename}} : {{node.type}} </mat-tree-node> <mat-tree-node *matTreeNodeDef=\"let node;when: hasChild\" matTreeNodePadding> <button mat-icon-button matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.filename\"> <mat-icon class=\"mat-icon-rtl-mirror\"> {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> {{node.filename}} : {{node.type}} </mat-tree-node> </mat-tree> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Nested tree</mat-expansion-panel-header> <mat-tree [dataSource]=\"nestedDataSource\" [treeControl]=\"nestedTreeControl\"> <mat-nested-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle> <li class=\"mat-tree-node\"> <button mat-icon-button disabled></button> {{node.filename}}:  {{node.type}} </li> </mat-nested-tree-node> <mat-nested-tree-node *matTreeNodeDef=\"let node; when: hasNestedChild\"> <li> <div class=\"mat-tree-node\"> <button mat-icon-button matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.filename\"> <mat-icon class=\"mat-icon-rtl-mirror\"> {{nestedTreeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> {{node.filename}} </div> <ul [class.demo-tree-invisible]=\"!nestedTreeControl.isExpanded(node)\"> <ng-container matTreeNodeOutlet></ng-container> </ul> </li> </mat-nested-tree-node> </mat-tree> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>CDK Flattened tree</mat-expansion-panel-header> <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"> <cdk-tree-node *cdkTreeNodeDef=\"let node\" cdkTreeNodePadding class=\"demo-tree-node\"> <button mat-icon-button disabled></button> {{node.filename}}:  {{node.type}} </cdk-tree-node> <cdk-tree-node *cdkTreeNodeDef=\"let node; when: hasChild\" cdkTreeNodePadding class=\"demo-tree-node\"> <button mat-icon-button [attr.aria-label]=\"'toggle ' + node.filename\" cdkTreeNodeToggle> <mat-icon class=\"mat-icon-rtl-mirror\"> {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> {{node.filename}}:  {{node.type}} </cdk-tree-node> </cdk-tree> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>CDK Nested tree</mat-expansion-panel-header> <cdk-tree [dataSource]=\"nestedDataSource\" [treeControl]=\"nestedTreeControl\"> <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"demo-tree-node\"> <button mat-icon-button disabled></button> {{node.filename}}:  {{node.type}} </cdk-nested-tree-node> <cdk-nested-tree-node *cdkTreeNodeDef=\"let node; when: hasNestedChild\" class=\"demo-tree-node\"> <button mat-icon-button [attr.aria-label]=\"'toggle ' + node.filename\" cdkTreeNodeToggle> <mat-icon class=\"mat-icon-rtl-mirror\"> {{nestedTreeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> {{node.filename}}:  {{node.type}} <div [class.demo-tree-invisible]=\"!nestedTreeControl.isExpanded(node)\" class=\"demo-tree-nested-node\"> <ng-container cdkTreeNodeOutlet></ng-container> </div> </cdk-nested-tree-node> </cdk-tree> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Todo list Flattened tree</mat-expansion-panel-header> <checklist-tree-demo></checklist-tree-demo> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Todo list Nested tree</mat-expansion-panel-header> <checklist-nested-tree-demo></checklist-nested-tree-demo> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Dynamic flat tree</mat-expansion-panel-header> <dynamic-tree-demo></dynamic-tree-demo> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Loadmore flat tree</mat-expansion-panel-header> <loadmore-tree-demo></loadmore-tree-demo> </mat-expansion-panel> </mat-accordion> ",
            styles: [".demo-tree-container .demo-tree-node { display: block; } .demo-tree-container .demo-tree-nested-node { padding-left: 20px; } .demo-tree-container .demo-tree-invisible { display: none; } .demo-tree-container ul, .demo-tree-container li { -webkit-margin-before: 0; -webkit-margin-after: 0; list-style-type: none; } .demo-tree-container .mat-card { margin: 16px; } "],
            providers: [file_database_1.FileDatabase]
        }),
        __metadata("design:paramtypes", [file_database_1.FileDatabase])
    ], TreeDemo);
    return TreeDemo;
}());
exports.TreeDemo = TreeDemo;
//# sourceMappingURL=tree-demo.js.map