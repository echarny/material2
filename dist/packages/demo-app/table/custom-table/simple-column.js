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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
/**
 * Column that shows simply shows text content for the header and row
 * cells. By default, the name of this column will be assumed to be both the header
 * text and data property used to access the data value to show in cells. To override
 * the header text, provide a label text. To override the data cell values,
 * provide a dataAccessor function that provides the string to display for each row's cell.
 *
 * Note that this component sets itself as visually hidden since it will show up in the `mat-table`
 * DOM because it is an empty element with an ng-container (nothing rendered). It should not
 * interfere with screen readers.
 */
var SimpleColumn = /** @class */ (function () {
    function SimpleColumn(table) {
        this.table = table;
        /** Alignment of the cell values. */
        this.align = 'before';
    }
    Object.defineProperty(SimpleColumn.prototype, "name", {
        /** Column name that should be used to reference this column. */
        get: function () { return this._name; },
        set: function (name) {
            this._name = name;
            this.columnDef.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleColumn.prototype, "sortable", {
        /** Whether the column is sortable */
        get: function () { return this._sortable; },
        set: function (sortable) {
            this._sortable = coercion_1.coerceBooleanProperty(sortable);
        },
        enumerable: true,
        configurable: true
    });
    SimpleColumn.prototype.ngOnInit = function () {
        if (this.table) {
            this.table.addColumnDef(this.columnDef);
        }
    };
    SimpleColumn.prototype.ngOnDestroy = function () {
        if (this.table) {
            this.table.removeColumnDef(this.columnDef);
        }
    };
    SimpleColumn.prototype.getData = function (data) {
        return this.dataAccessor ? this.dataAccessor(data, this.name) : data[this.name];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SimpleColumn.prototype, "name", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SimpleColumn.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], SimpleColumn.prototype, "dataAccessor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SimpleColumn.prototype, "align", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SimpleColumn.prototype, "sortable", null);
    __decorate([
        core_1.ViewChild(table_1.MatColumnDef),
        __metadata("design:type", table_1.MatColumnDef)
    ], SimpleColumn.prototype, "columnDef", void 0);
    __decorate([
        core_1.ViewChild(sort_1.MatSortHeader),
        __metadata("design:type", sort_1.MatSortHeader)
    ], SimpleColumn.prototype, "sortHeader", void 0);
    SimpleColumn = __decorate([
        core_1.Component({
            selector: 'simple-column',
            template: "\n    <ng-container matColumnDef>\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> {{label || name}} </th>\n      <td mat-cell *matCellDef=\"let data\"> {{getData(data)}}</td>\n    </ng-container>\n  ",
            host: {
                'class': 'simple-column cdk-visually-hidden',
                '[attr.ariaHidden]': 'true',
            }
        }),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [table_1.MatTable])
    ], SimpleColumn);
    return SimpleColumn;
}());
exports.SimpleColumn = SimpleColumn;
//# sourceMappingURL=simple-column.js.map