"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Table with a sticky footer
 */
var TableStickyFooterExample = /** @class */ (function () {
    function TableStickyFooterExample() {
        this.displayedColumns = ['item', 'cost'];
        this.transactions = [
            { item: 'Beach ball', cost: 4 },
            { item: 'Towel', cost: 5 },
            { item: 'Frisbee', cost: 2 },
            { item: 'Sunscreen', cost: 4 },
            { item: 'Cooler', cost: 25 },
            { item: 'Swim suit', cost: 15 },
        ];
    }
    /** Gets the total cost of all transactions. */
    /** Gets the total cost of all transactions. */
    TableStickyFooterExample.prototype.getTotalCost = /** Gets the total cost of all transactions. */
    function () {
        return this.transactions.map(function (t) { return t.cost; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    TableStickyFooterExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'table-sticky-footer-example',
                    styles: [".example-container { height: 270px; overflow: auto; } table { width: 100%; } tr.mat-footer-row { font-weight: bold; } .mat-table-sticky { border-top: 1px solid #e0e0e0; } "],
                    template: "<div class=\"example-container mat-elevation-z8\"><table mat-table [dataSource]=\"transactions\"><ng-container matColumnDef=\"item\"><th mat-header-cell *matHeaderCellDef>Item</th><td mat-cell *matCellDef=\"let transaction\">{{transaction.item}}</td><td mat-footer-cell *matFooterCellDef>Total</td></ng-container><ng-container matColumnDef=\"cost\"><th mat-header-cell *matHeaderCellDef>Cost</th><td mat-cell *matCellDef=\"let transaction\">{{transaction.cost | currency}}</td><td mat-footer-cell *matFooterCellDef>{{getTotalCost() | currency}}</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr><tr mat-footer-row *matFooterRowDef=\"displayedColumns; sticky: true\"></tr></table></div>",
                },] },
    ];
    return TableStickyFooterExample;
}());
exports.TableStickyFooterExample = TableStickyFooterExample;
//# sourceMappingURL=table-sticky-footer-example.js.map