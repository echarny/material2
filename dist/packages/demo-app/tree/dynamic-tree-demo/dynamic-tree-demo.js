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
var core_1 = require("@angular/core");
var tree_1 = require("@angular/cdk/tree");
var dynamic_database_1 = require("./dynamic-database");
var DynamicTreeDemo = /** @class */ (function () {
    function DynamicTreeDemo(database) {
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.expandable; };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new dynamic_database_1.DynamicDataSource(this.treeControl, database);
        this.dataSource.data = database.initialData();
    }
    DynamicTreeDemo = __decorate([
        core_1.Component({selector: 'dynamic-tree-demo',
            template: "<mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"> <mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodePadding> <button mat-icon-button disabled></button> {{node.item}} </mat-tree-node> <mat-tree-node *matTreeNodeDef=\"let node; when: hasChild\" matTreeNodePadding> <button mat-icon-button [attr.aria-label]=\"'toggle ' + node.filename\" matTreeNodeToggle> <mat-icon class=\"mat-icon-rtl-mirror\"> {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> {{node.item}} <mat-progress-bar *ngIf=\"node.isLoading\" mode=\"indeterminate\" class=\"demo-tree-progress-bar\"></mat-progress-bar> </mat-tree-node> </mat-tree> ",
            styles: [".demo-tree-progress-bar { margin-left: 30px; } "],
            providers: [dynamic_database_1.DynamicDatabase]
        }),
        __metadata("design:paramtypes", [dynamic_database_1.DynamicDatabase])
    ], DynamicTreeDemo);
    return DynamicTreeDemo;
}());
exports.DynamicTreeDemo = DynamicTreeDemo;
//# sourceMappingURL=dynamic-tree-demo.js.map