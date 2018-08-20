"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tab group with dynamically changing tabs
 */
var TabGroupDynamicExample = /** @class */ (function () {
    function TabGroupDynamicExample() {
        this.tabs = ['First', 'Second', 'Third'];
        this.selected = new forms_1.FormControl(0);
    }
    TabGroupDynamicExample.prototype.addTab = function (selectAfterAdding) {
        this.tabs.push('New');
        if (selectAfterAdding) {
            this.selected.setValue(this.tabs.length - 1);
        }
    };
    TabGroupDynamicExample.prototype.removeTab = function (index) {
        this.tabs.splice(index, 1);
    };
    TabGroupDynamicExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-group-dynamic-example',
                    template: "<div><span class=\"example-input-label\">Selected tab index:</span><mat-form-field><input matInput type=\"number\" [formControl]=\"selected\"></mat-form-field></div><div><button mat-raised-button class=\"example-add-tab-button\" (click)=\"addTab(selectAfterAdding.checked)\">Add new tab</button><mat-checkbox #selectAfterAdding>Select tab after adding</mat-checkbox></div><mat-tab-group [selectedIndex]=\"selected.value\" (selectedIndexChange)=\"selected.setValue($event)\"><mat-tab *ngFor=\"let tab of tabs; let index = index\" [label]=\"tab\">Contents for {{tab}} tab <button mat-raised-button class=\"example-delete-tab-button\" [disabled]=\"tabs.length === 1\" (click)=\"removeTab(index)\">Delete Tab</button></mat-tab></mat-tab-group>",
                    styles: [".example-input-label, .example-add-tab-button, .example-delete-tab-button { margin: 8px; } "],
                },] },
    ];
    return TabGroupDynamicExample;
}());
exports.TabGroupDynamicExample = TabGroupDynamicExample;
//# sourceMappingURL=tab-group-dynamic-example.js.map