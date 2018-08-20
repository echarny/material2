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
var collections_1 = require("@angular/cdk/collections");
var tree_1 = require("@angular/cdk/tree");
var checklist_database_1 = require("./checklist-database");
/**
 * Checklist demo with nested tree
 */
var ChecklistNestedTreeDemo = /** @class */ (function () {
    function ChecklistNestedTreeDemo(database, changeDetectorRef) {
        this.database = database;
        this.changeDetectorRef = changeDetectorRef;
        /** The selection for checklist */
        this.checklistSelection = new collections_1.SelectionModel(true /* multiple */);
        this.getChildren = function (node) { return node.children; };
        this.hasNoContent = function (_nodeData) { return _nodeData.item === ''; };
        this.treeControl = new tree_1.NestedTreeControl(this.getChildren);
        this.dataSource = database.data;
    }
    /** Whether all the descendants of the node are selected */
    ChecklistNestedTreeDemo.prototype.descendantsAllSelected = function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        if (!descendants.length) {
            return this.checklistSelection.isSelected(node);
        }
        var selected = this.checklistSelection.isSelected(node);
        var allSelected = descendants.every(function (child) { return _this.checklistSelection.isSelected(child); });
        if (!selected && allSelected) {
            this.checklistSelection.select(node);
            this.changeDetectorRef.markForCheck();
        }
        return allSelected;
    };
    /** Whether part of the descendants are selected */
    ChecklistNestedTreeDemo.prototype.descendantsPartiallySelected = function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        if (!descendants.length) {
            return false;
        }
        var result = descendants.some(function (child) { return _this.checklistSelection.isSelected(child); });
        return result && !this.descendantsAllSelected(node);
    };
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    ChecklistNestedTreeDemo.prototype.todoItemSelectionToggle = function (node) {
        this.checklistSelection.toggle(node);
        var descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? (_a = this.checklistSelection).select.apply(_a, descendants.concat([node])) : (_b = this.checklistSelection).deselect.apply(_b, descendants.concat([node]));
        this.changeDetectorRef.markForCheck();
        var _a, _b;
    };
    /** Select the category so we can insert the new item. */
    ChecklistNestedTreeDemo.prototype.addNewItem = function (node) {
        this.database.insertItem(node, '');
        this.treeControl.expand(node);
    };
    /** Save the node to database */
    ChecklistNestedTreeDemo.prototype.saveNode = function (node, itemValue) {
        this.database.updateItem(node, itemValue);
    };
    ChecklistNestedTreeDemo = __decorate([
        core_1.Component({selector: 'checklist-nested-tree-demo',
            template: "<mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"> <mat-nested-tree-node *matTreeNodeDef=\"let node\"> <div class=\"mat-tree-node\"> <button mat-icon-button matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.item\" [disabled]=\"!node.children.value.length\"> <mat-icon class=\"mat-icon-rtl-mirror\" *ngIf=\"node.children.value.length\"> {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}} </mat-icon> </button> <mat-checkbox *ngIf=\"!hasNoContent(node)\" [checked]=\"descendantsAllSelected(node)\" [indeterminate]=\"descendantsPartiallySelected(node)\" (change)=\"todoItemSelectionToggle(node)\"> {{node.item}} </mat-checkbox> <mat-form-field *ngIf=\"hasNoContent(node)\"> <input matInput #itemValue placeholder=\"New item...\" (blur)=\"saveNode(node, itemValue.value)\"> </mat-form-field> <button mat-icon-button (click)=\"addNewItem(node)\"><mat-icon>add</mat-icon></button> </div> <div class=\"demo-tree-node-nested\" [class.demo-tree-node-invisible]=\"!treeControl.isExpanded(node)\"> <ng-container matTreeNodeOutlet></ng-container> </div> </mat-nested-tree-node> </mat-tree> ",
            styles: [".demo-tree-node-invisible { display: none; } .demo-tree-node-nested { padding-left: 40px; } "],
            providers: [checklist_database_1.ChecklistDatabase],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [checklist_database_1.ChecklistDatabase, core_1.ChangeDetectorRef])
    ], ChecklistNestedTreeDemo);
    return ChecklistNestedTreeDemo;
}());
exports.ChecklistNestedTreeDemo = ChecklistNestedTreeDemo;
//# sourceMappingURL=checklist-nested-tree-demo.js.map