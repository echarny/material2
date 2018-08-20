"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Paginator
 */
var PaginatorOverviewExample = /** @class */ (function () {
    function PaginatorOverviewExample() {
    }
    PaginatorOverviewExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'paginator-overview-example',
                    template: "<mat-paginator [length]=\"100\" [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return PaginatorOverviewExample;
}());
exports.PaginatorOverviewExample = PaginatorOverviewExample;
//# sourceMappingURL=paginator-overview-example.js.map