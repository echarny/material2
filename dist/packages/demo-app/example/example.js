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
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var material_examples_1 = require("@angular/material-examples");
var Example = /** @class */ (function () {
    function Example(elementRef, injector) {
        this.elementRef = elementRef;
        this.injector = injector;
    }
    Object.defineProperty(Example.prototype, "showLabel", {
        get: function () { return this._showLabel; },
        set: function (v) { this._showLabel = coercion_1.coerceBooleanProperty(v); },
        enumerable: true,
        configurable: true
    });
    Example.prototype.ngOnInit = function () {
        // Should be created with this component's injector to capture the whole injector which may
        // include provided things like Directionality.
        var exampleElementCtor = customElements.get(this.id);
        this.elementRef.nativeElement.appendChild(new exampleElementCtor(this.injector));
        this.title = material_examples_1.EXAMPLE_COMPONENTS[this.id] ? material_examples_1.EXAMPLE_COMPONENTS[this.id].title : '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Example.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Example.prototype, "showLabel", null);
    Example = __decorate([
        core_1.Component({
            selector: 'material-example',
            template: "\n    <div class=\"label\" *ngIf=\"showLabel\">\n      <span class=\"title\"> {{title}} </span>\n      <span class=\"id\"> <{{id}}> </span>\n    </div>\n\n    <div *ngIf=\"!id\">\n      Could not find example {{id}}\n    </div>\n  ",
            styles: ["\n    .label {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-end;\n      margin: 16px 0;\n    }\n\n    .title {\n      font-size: 20px;\n      font-weight: 500;\n    }\n\n    .id {\n      font-size: 13px;\n      font-family: monospace;\n      color: #666;\n      white-space: pre;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.Injector])
    ], Example);
    return Example;
}());
exports.Example = Example;
//# sourceMappingURL=example.js.map