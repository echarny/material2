"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Tag group with dynamic height based on tab contents
 */
var TabGroupDynamicHeightExample = /** @class */ (function () {
    function TabGroupDynamicHeightExample() {
    }
    TabGroupDynamicHeightExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-group-dynamic-height-example',
                    template: "<mat-tab-group dynamicHeight><mat-tab label=\"Short tab\"><div class=\"example-small-box mat-elevation-z4\">Small content</div></mat-tab><mat-tab label=\"Long tab\"><div class=\"example-large-box mat-elevation-z4\">Large content</div></mat-tab></mat-tab-group>",
                    styles: [".example-small-box, .example-large-box { display: flex; align-items: center; justify-content: center; margin: 16px; padding: 16px; border-radius: 8px; } .example-small-box { height: 100px; width: 100px; } .example-large-box { height: 300px; width: 300px; } "],
                },] },
    ];
    return TabGroupDynamicHeightExample;
}());
exports.TabGroupDynamicHeightExample = TabGroupDynamicHeightExample;
//# sourceMappingURL=tab-group-dynamic-height-example.js.map