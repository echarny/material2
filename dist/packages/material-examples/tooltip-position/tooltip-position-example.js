"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tooltip with a custom position
 */
var TooltipPositionExample = /** @class */ (function () {
    function TooltipPositionExample() {
        this.positionOptions = ['after', 'before', 'above', 'below', 'left', 'right'];
        this.position = new forms_1.FormControl(this.positionOptions[0]);
    }
    TooltipPositionExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-position-example',
                    template: "<mat-form-field class=\"example-user-input\"><mat-select placeholder=\"Tooltip position\" [formControl]=\"position\"><mat-option *ngFor=\"let positionOption of positionOptions\" [value]=\"positionOption\">{{positionOption}}</mat-option></mat-select></mat-form-field><button mat-raised-button matTooltip=\"Info about the action\" [matTooltipPosition]=\"position.value\" aria-label=\"Button that displays a tooltip in various positions\">Action</button>",
                    styles: [".example-user-input { margin-right: 8px; } "],
                },] },
    ];
    return TooltipPositionExample;
}());
exports.TooltipPositionExample = TooltipPositionExample;
//# sourceMappingURL=tooltip-position-example.js.map