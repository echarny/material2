"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tooltip that can be disabled
 */
var TooltipDisabledExample = /** @class */ (function () {
    function TooltipDisabledExample() {
        this.disabled = new forms_1.FormControl(false);
    }
    TooltipDisabledExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-disabled-example',
                    template: "<button mat-raised-button matTooltip=\"Info about the action\" [matTooltipDisabled]=\"disabled.value\" aria-label=\"Button that displays a tooltip that can be programatically disabled\">Action</button><mat-checkbox [formControl]=\"disabled\" class=\"example-disabled-checkbox\">Tooltip disabled</mat-checkbox>",
                    styles: [".example-disabled-checkbox { margin-left: 8px; } "],
                },] },
    ];
    return TooltipDisabledExample;
}());
exports.TooltipDisabledExample = TooltipDisabledExample;
//# sourceMappingURL=tooltip-disabled-example.js.map