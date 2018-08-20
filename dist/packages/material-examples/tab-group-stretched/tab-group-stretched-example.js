"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Tab group with stretched labels
 */
var TabGroupStretchedExample = /** @class */ (function () {
    function TabGroupStretchedExample() {
    }
    TabGroupStretchedExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-group-stretched-example',
                    template: "<mat-tab-group mat-stretch-tabs class=\"example-stretched-tabs mat-elevation-z4\"><mat-tab label=\"First\">Content 1</mat-tab><mat-tab label=\"Second\">Content 2</mat-tab><mat-tab label=\"Third\">Content 3</mat-tab></mat-tab-group>",
                    styles: [".example-stretched-tabs { max-width: 800px; } "],
                },] },
    ];
    return TabGroupStretchedExample;
}());
exports.TabGroupStretchedExample = TabGroupStretchedExample;
//# sourceMappingURL=tab-group-stretched-example.js.map