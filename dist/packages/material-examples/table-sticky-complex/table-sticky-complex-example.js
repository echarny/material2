"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Tables with toggle-able sticky headers, footers, and columns
 */
var TableStickyComplexExample = /** @class */ (function () {
    function TableStickyComplexExample() {
        this.displayedColumns = [];
        this.dataSource = ELEMENT_DATA;
        this.tables = [0];
        this.displayedColumns.length = 24;
        this.displayedColumns.fill('filler');
        // The first two columns should be position and name; the last two columns: weight, symbol
        this.displayedColumns[0] = 'position';
        this.displayedColumns[1] = 'name';
        this.displayedColumns[22] = 'weight';
        this.displayedColumns[23] = 'symbol';
    }
    /** Whether the button toggle group contains the id as an active value. */
    /** Whether the button toggle group contains the id as an active value. */
    TableStickyComplexExample.prototype.isSticky = /** Whether the button toggle group contains the id as an active value. */
    function (buttonToggleGroup, id) {
        return (buttonToggleGroup.value || []).indexOf(id) !== -1;
    };
    TableStickyComplexExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'table-sticky-complex-example',
                    styles: [".example-container { height: 400px; overflow: auto; } .mat-table-sticky { background: #59abfd; opacity: 1; } .example-sticky-toggle-group { margin: 8px; } .mat-column-filler { padding: 0 8px; font-size: 10px; text-align: center; } .mat-header-cell, .mat-footer-cell, .mat-cell { min-width: 80px; box-sizing: border-box; } "],
                    template: "<div><button mat-raised-button (click)=\"tables.push(tables.length)\">Add table</button> <button mat-raised-button (click)=\"tables.pop()\">Remove table</button></div><div>Sticky Headers:<mat-button-toggle-group multiple=\"multiple\" [value]=\"['header-1']\" #stickyHeaders=\"matButtonToggleGroup\" class=\"example-sticky-toggle-group\"><mat-button-toggle value=\"header-1\">Row 1</mat-button-toggle><mat-button-toggle value=\"header-2\">Row 2</mat-button-toggle></mat-button-toggle-group></div><div>Sticky Footers:<mat-button-toggle-group multiple=\"multiple\" [value]=\"['footer-1']\" #stickyFooters=\"matButtonToggleGroup\" class=\"example-sticky-toggle-group\"><mat-button-toggle value=\"footer-1\">Row 1</mat-button-toggle><mat-button-toggle value=\"footer-2\">Row 2</mat-button-toggle></mat-button-toggle-group></div><div>Sticky Columns:<mat-button-toggle-group multiple=\"multiple\" [value]=\"['position', 'symbol']\" #stickyColumns=\"matButtonToggleGroup\" class=\"example-sticky-toggle-group\"><mat-button-toggle value=\"position\">Position</mat-button-toggle><mat-button-toggle value=\"name\">Name</mat-button-toggle><mat-button-toggle value=\"weight\">Weight</mat-button-toggle><mat-button-toggle value=\"symbol\">Symbol</mat-button-toggle></mat-button-toggle-group></div><div class=\"example-container mat-elevation-z8\"><table mat-table [dataSource]=\"dataSource\" *ngFor=\"let table of tables\"><ng-container matColumnDef=\"position\" [sticky]=\"isSticky(stickyColumns, 'position')\"><th mat-header-cell *matHeaderCellDef>Position</th><td mat-cell *matCellDef=\"let element\">{{element.position}}</td><td mat-footer-cell *matFooterCellDef>Position Footer</td></ng-container><ng-container matColumnDef=\"name\" [sticky]=\"isSticky(stickyColumns, 'name')\"><th mat-header-cell *matHeaderCellDef>Name</th><td mat-cell *matCellDef=\"let element\">{{element.name}}</td><td mat-footer-cell *matFooterCellDef>Name Footer</td></ng-container><ng-container matColumnDef=\"weight\" [stickyEnd]=\"isSticky(stickyColumns, 'weight')\"><th mat-header-cell *matHeaderCellDef>Weight</th><td mat-cell *matCellDef=\"let element\">{{element.weight}}</td><td mat-footer-cell *matFooterCellDef>Weight Footer</td></ng-container><ng-container matColumnDef=\"symbol\" [stickyEnd]=\"isSticky(stickyColumns, 'symbol')\"><th mat-header-cell *matHeaderCellDef>Symbol</th><td mat-cell *matCellDef=\"let element\">{{element.symbol}}</td><td mat-footer-cell *matFooterCellDef>Symbol Footer</td></ng-container><ng-container matColumnDef=\"filler\"><th mat-header-cell *matHeaderCellDef>Filler header cell</th><td mat-cell *matCellDef=\"let element\">Filler data cell</td><td mat-footer-cell *matFooterCellDef>Filler footer cell</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: isSticky(stickyHeaders, 'header-1')\"></tr><tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: isSticky(stickyHeaders, 'header-2')\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr><tr mat-footer-row *matFooterRowDef=\"displayedColumns; sticky: isSticky(stickyFooters, 'footer-1')\"></tr><tr mat-footer-row *matFooterRowDef=\"displayedColumns; sticky: isSticky(stickyFooters, 'footer-2')\"></tr></table></div>",
                },] },
    ];
    /** @nocollapse */
    TableStickyComplexExample.ctorParameters = function () { return []; };
    return TableStickyComplexExample;
}());
exports.TableStickyComplexExample = TableStickyComplexExample;
var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
//# sourceMappingURL=table-sticky-complex-example.js.map