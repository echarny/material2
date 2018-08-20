"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var tree_2 = require("@angular/material/tree");
var rxjs_1 = require("rxjs");
/**
 * Node for to-do item
 */
var /**
 * Node for to-do item
 */
TodoItemNode = /** @class */ (function () {
    function TodoItemNode() {
    }
    return TodoItemNode;
}());
exports.TodoItemNode = TodoItemNode;
/** Flat to-do item node with expandable and level information */
var /** Flat to-do item node with expandable and level information */
TodoItemFlatNode = /** @class */ (function () {
    function TodoItemFlatNode() {
    }
    return TodoItemFlatNode;
}());
exports.TodoItemFlatNode = TodoItemFlatNode;
/**
 * The Json object for to-do list data.
 */
var TREE_DATA = {
    Groceries: {
        'Almond Meal flour': null,
        'Organic eggs': null,
        'Protein Powder': null,
        Fruits: {
            Apple: null,
            Berries: ['Blueberry', 'Raspberry'],
            Orange: null
        }
    },
    Reminders: [
        'Cook dinner',
        'Read the Material Design spec',
        'Upgrade Application to Angular'
    ]
};
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
var ChecklistDatabase = /** @class */ (function () {
    function ChecklistDatabase() {
        this.dataChange = new rxjs_1.BehaviorSubject([]);
        this.initialize();
    }
    Object.defineProperty(ChecklistDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    ChecklistDatabase.prototype.initialize = function () {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        var data = this.buildFileTree(TREE_DATA, 0);
        // Notify the change.
        this.dataChange.next(data);
    };
    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    /**
       * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
       * The return value is the list of `TodoItemNode`.
       */
    ChecklistDatabase.prototype.buildFileTree = /**
       * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
       * The return value is the list of `TodoItemNode`.
       */
    function (obj, level) {
        var _this = this;
        return Object.keys(obj).reduce(function (accumulator, key) {
            var value = obj[key];
            var node = new TodoItemNode();
            node.item = key;
            if (value != null) {
                if (typeof value === 'object') {
                    node.children = _this.buildFileTree(value, level + 1);
                }
                else {
                    node.item = value;
                }
            }
            return accumulator.concat(node);
        }, []);
    };
    /** Add an item to to-do list */
    /** Add an item to to-do list */
    ChecklistDatabase.prototype.insertItem = /** Add an item to to-do list */
    function (parent, name) {
        if (parent.children) {
            parent.children.push({ item: name });
            this.dataChange.next(this.data);
        }
    };
    ChecklistDatabase.prototype.updateItem = function (node, name) {
        node.item = name;
        this.dataChange.next(this.data);
    };
    ChecklistDatabase.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ChecklistDatabase.ctorParameters = function () { return []; };
    return ChecklistDatabase;
}());
exports.ChecklistDatabase = ChecklistDatabase;
/**
 * @title Tree with checkboxes
 */
var TreeChecklistExample = /** @class */ (function () {
    function TreeChecklistExample(database) {
        var _this = this;
        this.database = database;
        /** Map from flat node to nested node. This helps us finding the nested node to be modified */
        this.flatNodeMap = new Map();
        /** Map from nested node to flattened node. This helps us to keep the same object for selection */
        this.nestedNodeMap = new Map();
        /** A selected parent node to be inserted */
        this.selectedParent = null;
        /** The new item's name */
        this.newItemName = '';
        /** The selection for checklist */
        this.checklistSelection = new collections_1.SelectionModel(true /* multiple */);
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.expandable; };
        this.getChildren = function (node) { return node.children; };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.hasNoContent = function (_, _nodeData) { return _nodeData.item === ''; };
        /**
           * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
           */
        this.transformer = function (node, level) {
            var existingNode = _this.nestedNodeMap.get(node);
            var flatNode = existingNode && existingNode.item === node.item
                ? existingNode
                : new TodoItemFlatNode();
            flatNode.item = node.item;
            flatNode.level = level;
            flatNode.expandable = !!node.children;
            _this.flatNodeMap.set(flatNode, node);
            _this.nestedNodeMap.set(node, flatNode);
            return flatNode;
        };
        this.treeFlattener = new tree_2.MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new tree_2.MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        database.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    /** Whether all the descendants of the node are selected */
    /** Whether all the descendants of the node are selected */
    TreeChecklistExample.prototype.descendantsAllSelected = /** Whether all the descendants of the node are selected */
    function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        return descendants.every(function (child) { return _this.checklistSelection.isSelected(child); });
    };
    /** Whether part of the descendants are selected */
    /** Whether part of the descendants are selected */
    TreeChecklistExample.prototype.descendantsPartiallySelected = /** Whether part of the descendants are selected */
    function (node) {
        var _this = this;
        var descendants = this.treeControl.getDescendants(node);
        var result = descendants.some(function (child) { return _this.checklistSelection.isSelected(child); });
        return result && !this.descendantsAllSelected(node);
    };
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    TreeChecklistExample.prototype.todoItemSelectionToggle = /** Toggle the to-do item selection. Select/deselect all the descendants node */
    function (node) {
        this.checklistSelection.toggle(node);
        var descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? (_a = this.checklistSelection).select.apply(_a, descendants) : (_b = this.checklistSelection).deselect.apply(_b, descendants);
        var _a, _b;
    };
    /** Select the category so we can insert the new item. */
    /** Select the category so we can insert the new item. */
    TreeChecklistExample.prototype.addNewItem = /** Select the category so we can insert the new item. */
    function (node) {
        var parentNode = this.flatNodeMap.get(node);
        this.database.insertItem((parentNode), '');
        this.treeControl.expand(node);
    };
    /** Save the node to database */
    /** Save the node to database */
    TreeChecklistExample.prototype.saveNode = /** Save the node to database */
    function (node, itemValue) {
        var nestedNode = this.flatNodeMap.get(node);
        this.database.updateItem((nestedNode), itemValue);
    };
    TreeChecklistExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree-checklist-example',
                    template: "<mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"><mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle matTreeNodePadding><button mat-icon-button disabled=\"disabled\"></button><mat-checkbox class=\"checklist-leaf-node\" [checked]=\"checklistSelection.isSelected(node)\" (change)=\"checklistSelection.toggle(node);\">{{node.item}}</mat-checkbox></mat-tree-node><mat-tree-node *matTreeNodeDef=\"let node; when: hasNoContent\" matTreeNodePadding><button mat-icon-button disabled=\"disabled\"></button><mat-form-field><input matInput #itemValue placeholder=\"New item...\"></mat-form-field><button mat-button (click)=\"saveNode(node, itemValue.value)\">Save</button></mat-tree-node><mat-tree-node *matTreeNodeDef=\"let node; when: hasChild\" matTreeNodePadding><button mat-icon-button matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.filename\"><mat-icon class=\"mat-icon-rtl-mirror\">{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon></button><mat-checkbox [checked]=\"descendantsAllSelected(node)\" [indeterminate]=\"descendantsPartiallySelected(node)\" (change)=\"todoItemSelectionToggle(node)\">{{node.item}}</mat-checkbox><button mat-icon-button (click)=\"addNewItem(node)\"><mat-icon>add</mat-icon></button></mat-tree-node></mat-tree>",
                    styles: [""],
                    providers: [ChecklistDatabase]
                },] },
    ];
    /** @nocollapse */
    TreeChecklistExample.ctorParameters = function () { return [
        { type: ChecklistDatabase, },
    ]; };
    return TreeChecklistExample;
}());
exports.TreeChecklistExample = TreeChecklistExample;
//# sourceMappingURL=tree-checklist-example.js.map