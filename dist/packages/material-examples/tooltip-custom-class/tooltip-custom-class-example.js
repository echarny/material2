"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Tooltip that can have a custom class applied.
 */
var TooltipCustomClassExample = /** @class */ (function () {
    function TooltipCustomClassExample() {
    }
    TooltipCustomClassExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-custom-class-example',
                    template: "<button mat-raised-button matTooltip=\"Info about the action\" matTooltipClass=\"example-tooltip-red\" aria-label=\"Button that shows a red tooltip\" class=\"example-button\">Red-tooltip Action</button>",
                    styles: [".example-button { margin-top: 16px; } .example-tooltip-red { background: #b71c1c; } "],
                    // Need to remove view encapsulation so that the custom tooltip style defined in
                    // `tooltip-custom-class-example.css` will not be scoped to this component's view.
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    return TooltipCustomClassExample;
}());
exports.TooltipCustomClassExample = TooltipCustomClassExample;
//# sourceMappingURL=tooltip-custom-class-example.js.map