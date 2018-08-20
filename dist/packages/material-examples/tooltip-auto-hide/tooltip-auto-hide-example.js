"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tooltip that demonstrates auto-hiding when it clips out of its scrolling container.
 */
var TooltipAutoHideExample = /** @class */ (function () {
    function TooltipAutoHideExample() {
        this.positionOptions = ['below', 'above', 'left', 'right'];
        this.position = new forms_1.FormControl(this.positionOptions[0]);
    }
    TooltipAutoHideExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-auto-hide-example',
                    template: "<mat-form-field><mat-select placeholder=\"Tooltip position\" [formControl]=\"position\"><mat-option *ngFor=\"let positionOption of positionOptions\" [value]=\"positionOption\">{{positionOption}}</mat-option></mat-select></mat-form-field><div class=\"example-container\" cdk-scrollable><button mat-raised-button #tooltip=\"matTooltip\" matTooltip=\"Info about the action\" [matTooltipPosition]=\"position.value\" matTooltipHideDelay=\"100000\" aria-label=\"Button that displays a tooltip that hides when scrolled out of the container\" class=\"example-button\">Action</button></div>",
                    styles: [".example-button { display: block; width: 48px; margin: 80px auto 400px; } .example-container { height: 200px; overflow: auto; border: 1px solid #ccc; } "],
                },] },
    ];
    return TooltipAutoHideExample;
}());
exports.TooltipAutoHideExample = TooltipAutoHideExample;
//# sourceMappingURL=tooltip-auto-hide-example.js.map