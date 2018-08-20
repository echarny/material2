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
var table_demo_1 = require("./table-demo");
var custom_table_1 = require("./custom-table/custom-table");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/cdk/table");
var common_1 = require("@angular/common");
var wrapper_table_1 = require("./custom-table/wrapper-table");
var simple_column_1 = require("./custom-table/simple-column");
var data_input_table_1 = require("./data-input-table/data-input-table");
var when_rows_1 = require("./when-rows/when-rows");
var example_module_1 = require("../example/example-module");
var TableDemoModule = /** @class */ (function () {
    function TableDemoModule() {
    }
    TableDemoModule = __decorate([
        core_1.NgModule({
            imports: [
                example_module_1.MaterialExampleModule,
                table_1.CdkTableModule,
                material_1.MatTableModule,
                material_1.MatCardModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatRadioModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatButtonModule,
                material_1.MatSlideToggleModule,
            ],
            declarations: [
                custom_table_1.CustomTableDemo,
                data_input_table_1.DataInputTableDemo,
                table_demo_1.TableDemo,
                wrapper_table_1.WrapperTable,
                simple_column_1.SimpleColumn,
                when_rows_1.WhenRowsDemo,
            ],
        })
    ], TableDemoModule);
    return TableDemoModule;
}());
exports.TableDemoModule = TableDemoModule;
//# sourceMappingURL=table-demo-module.js.map