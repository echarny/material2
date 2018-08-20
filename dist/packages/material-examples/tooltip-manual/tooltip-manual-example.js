"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Tooltip that can be manually shown/hidden.
 */
var TooltipManualExample = /** @class */ (function () {
    function TooltipManualExample() {
    }
    TooltipManualExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-manual-example',
                    template: "<div><span>Mouse over to </span><button mat-button (mouseenter)=\"tooltip.show()\" aria-label=\"Button that progamatically shows a tooltip on another button\" class=\"example-action-button\">show</button> <button mat-button (mouseenter)=\"tooltip.hide()\" aria-label=\"Button that progamatically hides a tooltip on another button\" class=\"example-action-button\">hide</button> <button mat-button (mouseenter)=\"tooltip.toggle()\" aria-label=\"Button that progamatically toggles a tooltip on another button to show/hide\" class=\"example-action-button\">toggle show/hide</button></div><button mat-raised-button #tooltip=\"matTooltip\" matTooltip=\"Info about the action\" matTooltipPosition=\"right\" aria-tooltip=\"Button that displays and hides a tooltip triggered by other buttons\">Action</button>",
                    styles: [".example-action-button { margin-top: 16px; } "],
                },] },
    ];
    return TooltipManualExample;
}());
exports.TooltipManualExample = TooltipManualExample;
//# sourceMappingURL=tooltip-manual-example.js.map