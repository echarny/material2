"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tooltip with a changing message
 */
var TooltipMessageExample = /** @class */ (function () {
    function TooltipMessageExample() {
        this.message = new forms_1.FormControl('Info about the action');
    }
    TooltipMessageExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tooltip-message-example',
                    template: "<mat-form-field class=\"example-user-input\"><input matInput placeholder=\"Tooltip message\" [formControl]=\"message\"></mat-form-field><button mat-raised-button [matTooltip]=\"message.value\" aria-label=\"Button that displays a tooltip with a custom message\">Action</button>",
                    styles: [".example-user-input { margin-right: 8px; } "],
                },] },
    ];
    return TooltipMessageExample;
}());
exports.TooltipMessageExample = TooltipMessageExample;
//# sourceMappingURL=tooltip-message-example.js.map