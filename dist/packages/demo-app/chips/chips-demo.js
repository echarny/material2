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
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var ChipsDemo = /** @class */ (function () {
    function ChipsDemo() {
        this.tabIndex = 0;
        this.visible = true;
        this.color = '';
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = true;
        this.message = '';
        // Enter, comma, semi-colon
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA, 186];
        this.selectedPeople = null;
        this.people = [
            { name: 'Kara' },
            { name: 'Jeremy' },
            { name: 'Topher' },
            { name: 'Elad' },
            { name: 'Kristiyan' },
            { name: 'Paul' }
        ];
        this.availableColors = [
            { name: 'none', color: undefined },
            { name: 'Primary', color: 'primary' },
            { name: 'Accent', color: 'accent' },
            { name: 'Warn', color: 'warn' }
        ];
        this.selectedColors = ['Primary', 'Warn'];
        this.selectedColor = 'Accent';
    }
    ChipsDemo.prototype.displayMessage = function (message) {
        this.message = message;
    };
    ChipsDemo.prototype.add = function (event) {
        var input = event.input, value = event.value;
        // Add our person
        if ((value || '').trim()) {
            this.people.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    };
    ChipsDemo.prototype.remove = function (person) {
        var index = this.people.indexOf(person);
        if (index >= 0) {
            this.people.splice(index, 1);
        }
    };
    ChipsDemo.prototype.removeColor = function (color) {
        var index = this.availableColors.indexOf(color);
        if (index >= 0) {
            this.availableColors.splice(index, 1);
        }
        index = this.selectedColors.indexOf(color.name);
        if (index >= 0) {
            this.selectedColors.splice(index, 1);
        }
    };
    ChipsDemo.prototype.toggleVisible = function () {
        this.visible = false;
    };
    ChipsDemo = __decorate([
        core_1.Component({selector: 'chips-demo',
            template: "<div class=\"demo-chips\"> <mat-card> <mat-toolbar color=\"primary\">Static Chips</mat-toolbar> <mat-card-content> <h4>Simple</h4> <mat-chip-list> <mat-chip>Chip 1</mat-chip> <mat-chip>Chip 2</mat-chip> <mat-chip disabled>Chip 3</mat-chip> </mat-chip-list> <h4>Unstyled</h4> <mat-chip-list> <mat-basic-chip>Basic Chip 1</mat-basic-chip> <mat-basic-chip>Basic Chip 2</mat-basic-chip> <mat-basic-chip>Basic Chip 3</mat-basic-chip> </mat-chip-list> <h4>Advanced</h4> <mat-chip-list selectable=\"false\"> <mat-chip color=\"accent\" selected=\"true\">Selected/Colored</mat-chip> <mat-chip color=\"warn\" selected=\"true\" *ngIf=\"visible\" (destroyed)=\"displayMessage('chip destroyed')\" (removed)=\"toggleVisible()\"> With Events <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> </mat-chip-list> <div>{{message}}</div> <h4>With avatar and icons</h4> <mat-chip-list> <mat-chip> <mat-icon matChipAvatar>home</mat-icon> Home <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> <mat-chip color=\"accent\" selected=\"true\"> <mat-chip-avatar>P</mat-chip-avatar> Portel <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> <mat-chip> <mat-chip-avatar>M</mat-chip-avatar> Molly </mat-chip> <mat-chip> Koby <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> <mat-chip> Razzle </mat-chip> <mat-chip> <img src=\"https://material.angularjs.org/material2_assets/ngconf/Mal.png\" matChipAvatar> Mal </mat-chip> <mat-chip selected=\"true\" color=\"warn\"> <img src=\"https://material.angularjs.org/material2_assets/ngconf/Husi.png\" matChipAvatar> Husi <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> <mat-chip> Good <mat-icon matChipTrailingIcon>star</mat-icon> </mat-chip> <mat-chip> Bad <mat-icon matChipTrailingIcon>star_border</mat-icon> </mat-chip> </mat-chip-list> </mat-card-content> </mat-card> <mat-card> <mat-toolbar color=\"primary\">Dynamic Chips</mat-toolbar> <mat-card-content> <h4>Form Field</h4> <p> You can easily put the the <code>&lt;mat-chip-list&gt;</code> inside of an <code>&lt;mat-form-field&gt;</code>. </p> <button mat-button (click)=\"tabIndex = (tabIndex === 0 ? -1 : 0)\"> Set tabIndex to {{tabIndex === 0 ? -1 : 0}} </button> <mat-form-field class=\"demo-has-chip-list\"> <mat-chip-list [tabIndex]=\"tabIndex\" #chipList1 [(ngModel)]=\"selectedPeople\" required> <mat-chip  *ngFor=\"let person of people\" [color]=\"color\" [selectable]=\"selectable\" [removable]=\"removable\" (removed)=\"remove(person)\"> {{person.name}} <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon> </mat-chip> <input placeholder=\"New Contributor...\" [matChipInputFor]=\"chipList1\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" [matChipInputAddOnBlur]=\"addOnBlur\" (matChipInputTokenEnd)=\"add($event)\" /> </mat-chip-list> </mat-form-field> <p> You can also put <code>&lt;mat-form-field&gt;</code> outside of an <code>mat-chip-list</code>. With <code>matChipInput</code> the input work with chip-list </p> <mat-form-field> <mat-chip-list [tabIndex]=\"tabIndex\"  #chipList2 [(ngModel)]=\"selectedPeople\" required> <mat-chip *ngFor=\"let person of people\" [color]=\"color\" [selectable]=\"selectable\" [removable]=\"removable\" (removed)=\"remove(person)\"> {{person.name}} <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon> </mat-chip> </mat-chip-list> <input placeholder=\"New Contributor...\" [matChipInputFor]=\"chipList2\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" [matChipInputAddOnBlur]=\"addOnBlur\" (matChipInputTokenEnd)=\"add($event)\" /> </mat-form-field> <p> Chips list without input </p> <mat-form-field class=\"demo-has-chip-list\"> <mat-chip-list #chipList3> <mat-chip *ngFor=\"let person of people\" [color]=\"color\" [selectable]=\"selectable\" [removable]=\"removable\" (removed)=\"remove(person)\"> {{person.name}} <mat-icon matChipRemove *ngIf=\"removable\">cancel</mat-icon> </mat-chip> </mat-chip-list> </mat-form-field> <p> The example above has overridden the <code>[separatorKeys]</code> input to allow for <code>ENTER</code>, <code>COMMA</code> and <code>SEMI COLON</code> keys. </p> <h4>Options</h4> <p> <mat-checkbox name=\"selectable\" [(ngModel)]=\"selectable\">Selectable</mat-checkbox> <mat-checkbox name=\"removable\" [(ngModel)]=\"removable\">Removable</mat-checkbox> <mat-checkbox name=\"addOnBlur\" [(ngModel)]=\"addOnBlur\">Add on Blur</mat-checkbox> </p> <h4>Stacked Chips</h4> <p> You can also stack the chips if you want them on top of each other and/or use the <code>(focus)</code> event to run custom code. </p> <mat-chip-list class=\"mat-chip-list-stacked\" aria-orientation=\"vertical\" [tabIndex]=\"-1\"> <mat-chip *ngFor=\"let aColor of availableColors\" (focus)=\"color = aColor.color\" [color]=\"aColor.color\" selected=\"true\"> {{aColor.name}} </mat-chip> </mat-chip-list> <h4>NgModel with chip list</h4> <mat-chip-list [multiple]=\"true\" [(ngModel)]=\"selectedColors\"> <mat-chip *ngFor=\"let aColor of availableColors\" [color]=\"aColor.color\" [value]=\"aColor.name\" (removed)=\"removeColor(aColor)\"> {{aColor.name}} <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> </mat-chip-list> The selected colors are <span *ngFor=\"let color of selectedColors\">{{color}}</span>. <h4>NgModel with single selection chip list</h4> <mat-chip-list [(ngModel)]=\"selectedColor\"> <mat-chip *ngFor=\"let aColor of availableColors\" [color]=\"aColor.color\" [value]=\"aColor.name\" (removed)=\"removeColor(aColor)\"> {{aColor.name}} <mat-icon matChipRemove>cancel</mat-icon> </mat-chip> </mat-chip-list> The selected color is {{selectedColor}}. </mat-card-content> </mat-card> </div> ",
            styles: [".demo-chips .mat-chip-list-stacked { display: block; max-width: 200px; } .demo-chips .mat-card { padding: 0; margin: 16px; } .demo-chips .mat-card .mat-toolbar { margin: 0; } .demo-chips .mat-card .mat-card-content { padding: 24px; } .demo-chips .mat-basic-chip { margin: auto 10px; } .demo-chips mat-chip-list input { width: 150px; } .demo-has-chip-list { width: 100%; } "]
        })
    ], ChipsDemo);
    return ChipsDemo;
}());
exports.ChipsDemo = ChipsDemo;
//# sourceMappingURL=chips-demo.js.map