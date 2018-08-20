"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
/** Custom options the configure the tooltip's default show/hide delays. */
exports.myCustomTooltipDefaults = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
/**
 * @title Tooltip with a show and hide delay
 */
var TooltipModifiedDefaultsExample = /** @class */ (function () {
    function TooltipModifiedDefaultsExample() {
    }
    TooltipModifiedDefaultsExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-modified-defaults-example',
                    template: "<button mat-raised-button matTooltip=\"By default, I delay\" aria-label=\"Button that displays a tooltip that has custom delays through a default config\">Button with delay-default tooltip</button>",
                    styles: ["/** No CSS for this example */ "],
                    providers: [
                        { provide: material_1.MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: exports.myCustomTooltipDefaults }
                    ],
                },] },
    ];
    return TooltipModifiedDefaultsExample;
}());
exports.TooltipModifiedDefaultsExample = TooltipModifiedDefaultsExample;
//# sourceMappingURL=tooltip-modified-defaults-example.js.map