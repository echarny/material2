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
var material_1 = require("@angular/material");
var DATA_LENGTH = 10;
var WhenRowsDemo = /** @class */ (function () {
    function WhenRowsDemo() {
        this.columnsToDisplay = ['data', 'index', 'dataIndex', 'renderIndex'];
        this.data = new Array(DATA_LENGTH).fill({ value: false }, 0, DATA_LENGTH);
        this.randomNumber = 0;
        this.multiTemplateDataRows = false;
        this.useTrackByValue = false;
        this.whenFn = function (_i, d) { return d.value; };
        this.trackByValue = function (_i, d) { return d.value; };
        this.changeRandomNumber();
    }
    WhenRowsDemo.prototype.changeRandomNumber = function () {
        var _this = this;
        this.randomNumber = Math.floor(Math.random() * DATA_LENGTH);
        this.data = this.data.map(function (_d, i) { return ({ value: i < _this.randomNumber }); });
        if (this.table) {
            this.table.renderRows();
        }
    };
    WhenRowsDemo.prototype.shuffleArray = function () {
        var dataToShuffle = this.data.slice();
        var currentIndex = dataToShuffle.length;
        while (0 !== currentIndex) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // Swap
            var temp = dataToShuffle[currentIndex];
            dataToShuffle[currentIndex] = dataToShuffle[randomIndex];
            dataToShuffle[randomIndex] = temp;
        }
        this.data = dataToShuffle;
    };
    __decorate([
        core_1.ViewChild(material_1.MatTable),
        __metadata("design:type", material_1.MatTable)
    ], WhenRowsDemo.prototype, "table", void 0);
    WhenRowsDemo = __decorate([
        core_1.Component({
            selector: 'when-rows-demo',template: "<div> <button mat-raised-button (click)=\"shuffleArray()\">Shuffle array</button> </div> <div> <button mat-raised-button (click)=\"changeRandomNumber()\">Randomize</button> Highlighted rows: {{randomNumber}} </div> <div> <mat-slide-toggle (change)=\"multiTemplateDataRows = $event.checked\"> Enable multiple data rows </mat-slide-toggle> </div> <div> <mat-slide-toggle (change)=\"useTrackByValue = $event.checked\"> Enable track by value </mat-slide-toggle> </div> <mat-card> <h3> MatTable </h3> <table mat-table style=\"width: 100%\" [trackBy]=\"useTrackByValue ? trackByValue : undefined\" [multiTemplateDataRows]=\"multiTemplateDataRows\" [dataSource]=\"data\"> <!-- Data column --> <ng-container matColumnDef=\"data\"> <th mat-header-cell *matHeaderCellDef> Data </th> <td mat-cell *matCellDef=\"let data\"> {{data.value}} </td> </ng-container> <!-- Index column --> <ng-container matColumnDef=\"index\"> <th mat-header-cell *matHeaderCellDef> Index </th> <td mat-cell *matCellDef=\"let data; let index = index\"> {{index}} </td> </ng-container> <!-- Data index column --> <ng-container matColumnDef=\"dataIndex\"> <th mat-header-cell *matHeaderCellDef> Data Index </th> <td mat-cell *matCellDef=\"let data; let dataIndex = dataIndex\"> {{dataIndex}} </td> </ng-container> <!-- Row Index column --> <ng-container matColumnDef=\"renderIndex\"> <th mat-header-cell *matHeaderCellDef> Render Index </th> <td mat-cell *matCellDef=\"let data; let renderIndex = renderIndex\"> {{renderIndex}} </td> </ng-container> <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr> <tr mat-row style=\"background: rgba(255, 0, 0, .2);\" *matRowDef=\"let data; columns: columnsToDisplay; when: whenFn\"></tr> <tr mat-row style=\"background: rgba(0, 255, 0, .2);\" *matRowDef=\"let data; columns: columnsToDisplay;\"></tr> </table> </mat-card> ",
        }),
        __metadata("design:paramtypes", [])
    ], WhenRowsDemo);
    return WhenRowsDemo;
}());
exports.WhenRowsDemo = WhenRowsDemo;
//# sourceMappingURL=when-rows.js.map