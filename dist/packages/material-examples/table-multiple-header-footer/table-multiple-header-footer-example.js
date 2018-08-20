"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Table with multiple header and footer rows
 */
var TableMultipleHeaderFooterExample = /** @class */ (function () {
    function TableMultipleHeaderFooterExample() {
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
    TableMultipleHeaderFooterExample.prototype.getTotalCost = /** Gets the total cost of all transactions. */
    function () {
        return this.transactions.map(function (t) { return t.cost; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    TableMultipleHeaderFooterExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'table-multiple-header-footer-example',
                    styles: ["table { width: 100%; } .example-first-header-row th { border-bottom: none; } .example-second-header-row { font-style: italic; } .example-first-footer-row { font-weight: bold; } .example-second-footer-row td { color: #900000; } "],
                    template: "<table mat-table [dataSource]=\"transactions\" class=\"mat-elevation-z8\"><ng-container matColumnDef=\"item\"><th mat-header-cell *matHeaderCellDef>Item</th><td mat-cell *matCellDef=\"let transaction\">{{transaction.item}}</td><td mat-footer-cell *matFooterCellDef>Total</td></ng-container><ng-container matColumnDef=\"cost\"><th mat-header-cell *matHeaderCellDef>Cost</th><td mat-cell *matCellDef=\"let transaction\">{{transaction.cost | currency}}</td><td mat-footer-cell *matFooterCellDef>{{getTotalCost() | currency}}</td></ng-container><ng-container matColumnDef=\"item-description\"><th mat-header-cell *matHeaderCellDef>Name of the item purchased</th></ng-container><ng-container matColumnDef=\"cost-description\"><th mat-header-cell *matHeaderCellDef>Cost of the item in USD</th></ng-container><ng-container matColumnDef=\"disclaimer\"><td mat-footer-cell *matFooterCellDef colspan=\"2\">Please note that the cost of items displayed are completely and totally made up.</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\" class=\"example-first-header-row\"></tr><tr mat-header-row *matHeaderRowDef=\"['item-description', 'cost-description']\" class=\"example-second-header-row\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr><tr mat-footer-row *matFooterRowDef=\"displayedColumns\" class=\"example-first-footer-row\"></tr><tr mat-footer-row *matFooterRowDef=\"['disclaimer']\" class=\"example-second-footer-row\"></tr></table>",
                },] },
    ];
    return TableMultipleHeaderFooterExample;
}());
exports.TableMultipleHeaderFooterExample = TableMultipleHeaderFooterExample;
//# sourceMappingURL=table-multiple-header-footer-example.js.map