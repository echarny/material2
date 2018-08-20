"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Using tabs with a custom label template
 */
var TabGroupCustomLabelExample = /** @class */ (function () {
    function TabGroupCustomLabelExample() {
    }
    TabGroupCustomLabelExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-group-custom-label-example',
                    template: "<mat-tab-group><mat-tab><ng-template mat-tab-label><mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>First</ng-template>Content 1</mat-tab><mat-tab><ng-template mat-tab-label><mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>Second</ng-template>Content 2</mat-tab><mat-tab><ng-template mat-tab-label><mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>Third</ng-template>Content 3</mat-tab></mat-tab-group>",
                    styles: [".example-tab-icon { margin-right: 8px; } "],
                },] },
    ];
    return TabGroupCustomLabelExample;
}());
exports.TabGroupCustomLabelExample = TabGroupCustomLabelExample;
//# sourceMappingURL=tab-group-custom-label-example.js.map