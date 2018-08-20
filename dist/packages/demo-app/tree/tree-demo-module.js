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
var tree_1 = require("@angular/cdk/tree");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var tree_demo_1 = require("./tree-demo");
var checklist_tree_demo_1 = require("./checklist-tree-demo/checklist-tree-demo");
var checklist_nested_tree_demo_1 = require("./checklist-tree-demo/checklist-nested-tree-demo");
var dynamic_tree_demo_1 = require("./dynamic-tree-demo/dynamic-tree-demo");
var loadmore_tree_demo_1 = require("./loadmore-tree-demo/loadmore-tree-demo");
var TreeDemoModule = /** @class */ (function () {
    function TreeDemoModule() {
    }
    TreeDemoModule = __decorate([
        core_1.NgModule({
            imports: [
                tree_1.CdkTreeModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatButtonModule,
                material_1.MatExpansionModule,
                material_1.MatCheckboxModule,
                material_1.MatFormFieldModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatTreeModule,
                material_1.MatProgressBarModule,
            ],
            declarations: [
                checklist_nested_tree_demo_1.ChecklistNestedTreeDemo,
                checklist_tree_demo_1.ChecklistTreeDemo,
                tree_demo_1.TreeDemo,
                dynamic_tree_demo_1.DynamicTreeDemo,
                loadmore_tree_demo_1.LoadmoreTreeDemo
            ],
        })
    ], TreeDemoModule);
    return TreeDemoModule;
}());
exports.TreeDemoModule = TreeDemoModule;
//# sourceMappingURL=tree-demo-module.js.map