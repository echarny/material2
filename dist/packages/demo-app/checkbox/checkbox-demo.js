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
var MatCheckboxDemoNestedChecklist = /** @class */ (function () {
    function MatCheckboxDemoNestedChecklist() {
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
    MatCheckboxDemoNestedChecklist.prototype.allComplete = function (task) {
        var subtasks = task.subtasks;
        return task.completed || (subtasks != null && subtasks.every(function (t) { return t.completed; }));
    };
    MatCheckboxDemoNestedChecklist.prototype.someComplete = function (tasks) {
        var numComplete = tasks.filter(function (t) { return t.completed; }).length;
        return numComplete > 0 && numComplete < tasks.length;
    };
    MatCheckboxDemoNestedChecklist.prototype.setAllCompleted = function (tasks, completed) {
        tasks.forEach(function (t) { return t.completed = completed; });
    };
    MatCheckboxDemoNestedChecklist = __decorate([
        core_1.Component({selector: 'mat-checkbox-demo-nested-checklist',
            styles: ["\n    li {\n      margin-bottom: 4px;\n    }\n  "],
            template: "<h2>Tasks</h2> <ul> <li *ngFor=\"let task of tasks\"> <mat-checkbox [(ngModel)]=\"task.completed\" [checked]=\"allComplete(task)\" [indeterminate]=\"someComplete(task.subtasks)\" (change)=\"setAllCompleted(task.subtasks, $event.checked)\"> <h3>{{task.name}}</h3> </mat-checkbox> <ul> <li *ngFor=\"let subtask of task.subtasks\"> <mat-checkbox [(ngModel)]=\"subtask.completed\"> {{subtask.name}} </mat-checkbox> </li> </ul> </li> </ul> ",
        })
    ], MatCheckboxDemoNestedChecklist);
    return MatCheckboxDemoNestedChecklist;
}());
exports.MatCheckboxDemoNestedChecklist = MatCheckboxDemoNestedChecklist;
var CheckboxDemo = /** @class */ (function () {
    function CheckboxDemo() {
        this.isIndeterminate = false;
        this.isChecked = false;
        this.isDisabled = false;
        this.labelPosition = 'after';
        this.useAlternativeColor = false;
    }
    CheckboxDemo.prototype.printResult = function () {
        if (this.isIndeterminate) {
            return 'Maybe!';
        }
        return this.isChecked ? 'Yes!' : 'No!';
    };
    CheckboxDemo.prototype.checkboxColor = function () {
        return this.useAlternativeColor ? 'primary' : 'accent';
    };
    CheckboxDemo = __decorate([
        core_1.Component({selector: 'mat-checkbox-demo',
            template: "<h1>mat-checkbox: Basic Example</h1> <form> <mat-checkbox [(ngModel)]=\"isChecked\" name=\"cb\" value=\"basic_checkbox\" [color]=\"checkboxColor()\" (change)=\"isIndeterminate = false\" [indeterminate]=\"isIndeterminate\" [disabled]=\"isDisabled\" [labelPosition]=\"labelPosition\"> Do you want to <em>foobar</em> the <em>bazquux</em>? </mat-checkbox> - <strong>{{printResult()}}</strong> </form> <div class=\"demo-checkbox\"> <input id=\"indeterminate-toggle\" type=\"checkbox\" [(ngModel)]=\"isIndeterminate\" [disabled]=\"isDisabled\"> <label for=\"indeterminate-toggle\">Toggle Indeterminate</label> <input id=\"disabled-toggle\" type=\"checkbox\" [(ngModel)]=\"isDisabled\"> <label for=\"disabled-toggle\">Toggle Disabled</label> <input id=\"color-toggle\" type=\"checkbox\" [(ngModel)]=\"useAlternativeColor\"> <label for=\"color-toggle\">Toggle Color</label> </div> <div> <p>Label position:</p> <div> <input #after type=\"radio\" value=\"after\" id=\"align-after\" name=\"labelPosition\" (click)=\"labelPosition = after.value\" checked> <label for=\"align-after\">After</label> </div> <div> <input #before type=\"radio\" value=\"before\" id=\"align-before\" name=\"labelPosition\" (click)=\"labelPosition = before.value\"> <label for=\"align-before\">Before</label> </div> </div> <h1>Pseudo checkboxes</h1> <mat-pseudo-checkbox></mat-pseudo-checkbox> <mat-pseudo-checkbox [disabled]=\"true\"></mat-pseudo-checkbox> <mat-pseudo-checkbox state=\"checked\"></mat-pseudo-checkbox> <mat-pseudo-checkbox state=\"checked\" [disabled]=\"true\"></mat-pseudo-checkbox> <mat-pseudo-checkbox state=\"indeterminate\"></mat-pseudo-checkbox> <mat-pseudo-checkbox state=\"indeterminate\" [disabled]=\"true\"></mat-pseudo-checkbox> <h1>Nested Checklist</h1> <mat-checkbox-demo-nested-checklist></mat-checkbox-demo-nested-checklist> ",
            styles: [".demo-checkbox { margin: 8px 0; } "],
        })
    ], CheckboxDemo);
    return CheckboxDemo;
}());
exports.CheckboxDemo = CheckboxDemo;
//# sourceMappingURL=checkbox-demo.js.map