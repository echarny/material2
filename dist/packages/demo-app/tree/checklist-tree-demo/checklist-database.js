"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
 * Node for to-do item
 */
var TodoItemNode = /** @class */ (function () {
    function TodoItemNode(item, children, parent) {
        this.item = item;
        this.parent = parent;
        this.children = new rxjs_1.BehaviorSubject(children === undefined ? [] : children);
    }
    return TodoItemNode;
}());
exports.TodoItemNode = TodoItemNode;
/**
 * The Json object for to-do list data.
 */
var TREE_DATA = [
    new TodoItemNode('Reminders', [
        new TodoItemNode('Cook dinner'),
        new TodoItemNode('Read the Material Design spec'),
        new TodoItemNode('Upgrade Application to Angular')
    ]),
    new TodoItemNode('Groceries', [
        new TodoItemNode('Organic eggs'),
        new TodoItemNode('Protein Powder'),
        new TodoItemNode('Almond Meal flour'),
        new TodoItemNode('Fruits', [
            new TodoItemNode('Apple'),
            new TodoItemNode('Orange'),
            new TodoItemNode('Berries', [
                new TodoItemNode('Blueberry'),
                new TodoItemNode('Raspberry')
            ])
        ])
    ])
];
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
var ChecklistDatabase = /** @class */ (function () {
    function ChecklistDatabase() {
        this.dataChange = new rxjs_1.BehaviorSubject(TREE_DATA);
    }
    Object.defineProperty(ChecklistDatabase.prototype, "data", {
        get: function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    /** Add an item to to-do list */
    ChecklistDatabase.prototype.insertItem = function (parent, name) {
        var child = new TodoItemNode(name, [], parent);
        var children = parent.children.value;
        children.push(child);
        parent.children.next(children);
        this.dataChange.next(this.data);
    };
    ChecklistDatabase.prototype.updateItem = function (node, name) {
        var newNode = new TodoItemNode(name, node.children.value, node.parent);
        if (node.parent) {
            var children = node.parent.children.value;
            var index = children.indexOf(node);
            children.splice(index, 1, newNode);
            node.parent.children.next(children);
            this.dataChange.next(this.data);
        }
    };
    ChecklistDatabase = __decorate([
        core_1.Injectable()
    ], ChecklistDatabase);
    return ChecklistDatabase;
}());
exports.ChecklistDatabase = ChecklistDatabase;
//# sourceMappingURL=checklist-database.js.map