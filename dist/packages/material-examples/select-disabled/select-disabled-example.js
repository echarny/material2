"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/** @title Disabled select */
var SelectDisabledExample = /** @class */ (function () {
    function SelectDisabledExample() {
        this.disableSelect = new forms_1.FormControl(false);
    }
    SelectDisabledExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-disabled-example',
                    template: "<p><mat-checkbox [formControl]=\"disableSelect\">Disable select</mat-checkbox></p><p><mat-form-field><mat-select placeholder=\"Choose an option\" [disabled]=\"disableSelect.value\"><mat-option value=\"option1\">Option 1</mat-option><mat-option value=\"option2\" disabled=\"disabled\">Option 2 (disabled)</mat-option><mat-option value=\"option3\">Option 3</mat-option></mat-select></mat-form-field></p>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return SelectDisabledExample;
}());
exports.SelectDisabledExample = SelectDisabledExample;
//# sourceMappingURL=select-disabled-example.js.map