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
var PaginatorDemo = /** @class */ (function () {
    function PaginatorDemo() {
        this.length = 50;
        this.pageSize = 10;
        this.pageIndex = 0;
        this.pageSizeOptions = [5, 10, 25];
        this.hidePageSize = false;
        this.showPageSizeOptions = true;
        this.showFirstLastButtons = true;
    }
    PaginatorDemo.prototype.handlePageEvent = function (e) {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
    };
    PaginatorDemo = __decorate([
        core_1.Component({selector: 'paginator-demo',
            template: "<mat-card class=\"demo-section\"> <h2>No inputs</h2> <mat-paginator></mat-paginator> </mat-card> <mat-card class=\"demo-section\"> <div class=\"demo-options\"> <mat-form-field> <input matInput placeholder=\"Length\" type=\"number\" [(ngModel)]=\"length\"> </mat-form-field> <mat-form-field> <input matInput placeholder=\"Page Size\" type=\"number\" [(ngModel)]=\"pageSize\"> </mat-form-field> <mat-form-field> <input matInput placeholder=\"Page Index\" type=\"number\" [(ngModel)]=\"pageIndex\"> </mat-form-field> <mat-slide-toggle [(ngModel)]=\"hidePageSize\">Hide page size</mat-slide-toggle> <mat-slide-toggle [(ngModel)]=\"showPageSizeOptions\">Show multiple page size options</mat-slide-toggle> <mat-slide-toggle [(ngModel)]=\"showFirstLastButtons\">Show first/last buttons</mat-slide-toggle> </div> <mat-paginator (page)=\"handlePageEvent($event)\" [length]=\"length\" [pageSize]=\"pageSize\" [showFirstLastButtons]=\"showFirstLastButtons\" [pageSizeOptions]=\"showPageSizeOptions ? pageSizeOptions : []\" [hidePageSize]=\"hidePageSize\" [pageIndex]=\"pageIndex\"> </mat-paginator> <div> Output event: {{pageEvent | json}} </div> </mat-card> ",
            styles: [".demo-section { max-width: 500px; margin-bottom: 24px; background: #efefef !important; } .demo-section > * { margin: 32px 0; } .demo-options { display: flex; flex-direction: column; max-width: 300px; } "],
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], PaginatorDemo);
    return PaginatorDemo;
}());
exports.PaginatorDemo = PaginatorDemo;
//# sourceMappingURL=paginator-demo.js.map