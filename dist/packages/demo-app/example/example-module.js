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
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var example_list_1 = require("./example-list");
var example_1 = require("./example");
var MaterialExampleModule = /** @class */ (function () {
    function MaterialExampleModule() {
    }
    MaterialExampleModule = __decorate([
        core_1.NgModule({
            imports: [material_1.MatExpansionModule, common_1.CommonModule],
            declarations: [example_1.Example, example_list_1.ExampleList],
            exports: [example_1.Example, example_list_1.ExampleList]
        })
    ], MaterialExampleModule);
    return MaterialExampleModule;
}());
exports.MaterialExampleModule = MaterialExampleModule;
//# sourceMappingURL=example-module.js.map