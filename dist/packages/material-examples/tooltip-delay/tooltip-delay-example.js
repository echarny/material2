"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tooltip with a show and hide delay
 */
var TooltipDelayExample = /** @class */ (function () {
    function TooltipDelayExample() {
        this.showDelay = new forms_1.FormControl(1000);
        this.hideDelay = new forms_1.FormControl(2000);
    }
    TooltipDelayExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-delay-example',
                    template: "<mat-form-field class=\"example-user-input\"><input matInput placeholder=\"Show delay (milliseconds)\" type=\"number\" aria-label=\"Adds a delay between hovering over the button and displaying the tooltip\" [formControl]=\"showDelay\"></mat-form-field><mat-form-field class=\"example-user-input\"><input matInput placeholder=\"Hide delay (milliseconds)\" type=\"number\" aria-label=\"Adds a delay between hovering away from the button and hiding the tooltip\" [formControl]=\"hideDelay\"></mat-form-field><button mat-raised-button matTooltip=\"Info about the action\" [matTooltipShowDelay]=\"showDelay.value\" [matTooltipHideDelay]=\"hideDelay.value\" aria-label=\"Button that displays a tooltip with a customized delay in showing and hiding\">Action</button>",
                    styles: [".example-user-input { display: block; width: 150px; } "],
                },] },
    ];
    return TooltipDelayExample;
}());
exports.TooltipDelayExample = TooltipDelayExample;
//# sourceMappingURL=tooltip-delay-example.js.map