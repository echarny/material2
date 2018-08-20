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
var material_examples_1 = require("@angular/material-examples");
var coercion_1 = require("@angular/cdk/coercion");
/** Displays a set of material examples in a mat-accordion. */
var ExampleList = /** @class */ (function () {
    function ExampleList() {
        this.exampleComponents = material_examples_1.EXAMPLE_COMPONENTS;
    }
    Object.defineProperty(ExampleList.prototype, "expandAll", {
        get: function () { return this._expandAll; },
        set: function (v) { this._expandAll = coercion_1.coerceBooleanProperty(v); },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ExampleList.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ExampleList.prototype, "ids", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], ExampleList.prototype, "expandAll", null);
    ExampleList = __decorate([
        core_1.Component({
            selector: 'material-example-list',
            template: "\n    <mat-accordion multi>\n      <mat-expansion-panel *ngFor=\"let id of ids\" [expanded]=\"expandAll\">\n        <mat-expansion-panel-header>\n          <div class=\"header\">\n            <div class=\"title\"> {{exampleComponents[id]?.title}} </div>\n            <div class=\"id\"> <{{id}}> </div>\n          </div>\n        </mat-expansion-panel-header>\n\n        <ng-template matExpansionPanelContent>\n          <material-example [id]=\"id\"></material-example>\n        </ng-template>\n      </mat-expansion-panel>\n    </mat-accordion>\n  ",
            styles: ["\n    mat-expansion-panel {\n      box-shadow: none !important;\n      background: transparent;\n      border-top: 1px solid #CCC;\n    }\n\n    .header {\n      display: flex;\n      justify-content: space-between;\n      width: 100%;\n      padding-right: 24px;\n      align-items: center;\n    }\n\n    .id {\n      font-family: monospace;\n      color: #666;\n      font-size: 12px;\n    }\n  "]
        })
    ], ExampleList);
    return ExampleList;
}());
exports.ExampleList = ExampleList;
//# sourceMappingURL=example-list.js.map