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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CheckboxAccessibilityDemo = /** @class */ (function () {
    function CheckboxAccessibilityDemo() {
        this.tasks = [
            {
                name: 'Reminders',
                completed: false,
                subtasks: [
                    { name: 'Cook Dinner', completed: false },
                    { name: 'Read the Material Design Spec', completed: false },
                    { name: 'Upgrade Application to Angular', completed: false }
                ]
            },
            {
                name: 'Groceries',
                completed: false,
                subtasks: [
                    { name: 'Organic Eggs', completed: false },
                    { name: 'Protein Powder', completed: false },
                    { name: 'Almond Meal Flour', completed: false }
                ]
            }
        ];
    }
    CheckboxAccessibilityDemo.prototype.allComplete = function (task) {
        var subtasks = task.subtasks;
        return task.completed || (subtasks != null && subtasks.every(function (t) { return t.completed; }));
    };
    CheckboxAccessibilityDemo.prototype.someComplete = function (tasks) {
        var numComplete = tasks.filter(function (t) { return t.completed; }).length;
        return numComplete > 0 && numComplete < tasks.length;
    };
    CheckboxAccessibilityDemo.prototype.setAllCompleted = function (tasks, completed) {
        tasks.forEach(function (t) { return t.completed = completed; });
    };
    CheckboxAccessibilityDemo = __decorate([
        core_1.Component({selector: 'checkbox-a11y',
            template: "<section> <h2>Checkbox without label</h2> <mat-checkbox aria-label=\"A single checkbox with no label example\"></mat-checkbox> </section> <section> <h2>Standalone checkbox</h2> <div> <mat-checkbox>Yes, I agree to the terms and conditions</mat-checkbox> </div> <div> <mat-checkbox [disabled]=\"true\">No, I do not agree to the terms and conditions</mat-checkbox> </div> <div> <mat-checkbox [indeterminate]=\"true\">A partially done task</mat-checkbox> </div> </section> <section> <h2>Nested checklist</h2> <div *ngFor=\"let task of tasks\"> <mat-checkbox [(ngModel)]=\"task.completed\" [checked]=\"allComplete(task)\" [indeterminate]=\"someComplete(task.subtasks)\" (change)=\"setAllCompleted(task.subtasks, $event.checked)\"> {{task.name}} </mat-checkbox> <div class=\"demo-sub-list\"> <div *ngFor=\"let subtask of task.subtasks\"> <mat-checkbox [(ngModel)]=\"subtask.completed\"> {{subtask.name}} </mat-checkbox> </div> </div> </div> </section> <section> <h2>Colored checkboxes</h2> <mat-checkbox color=\"primary\">Primary</mat-checkbox> <mat-checkbox color=\"accent\">Accent</mat-checkbox> <mat-checkbox color=\"warn\">Warn</mat-checkbox> </section> ",
            styles: [".demo-sub-list { margin-left: 20px; } "],
        })
    ], CheckboxAccessibilityDemo);
    return CheckboxAccessibilityDemo;
}());
exports.CheckboxAccessibilityDemo = CheckboxAccessibilityDemo;
//# sourceMappingURL=checkbox-a11y.js.map