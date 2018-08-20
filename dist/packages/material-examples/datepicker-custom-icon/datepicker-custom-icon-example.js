"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Datepicker with custom icon */
var DatepickerCustomIconExample = /** @class */ (function () {
    function DatepickerCustomIconExample() {
    }
    DatepickerCustomIconExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datepicker-custom-icon-example',
                    template: "<mat-form-field class=\"example-full-width\"><input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\"><mat-datepicker-toggle matSuffix [for]=\"picker\"><mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon></mat-datepicker-toggle><mat-datepicker #picker></mat-datepicker></mat-form-field>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return DatepickerCustomIconExample;
}());
exports.DatepickerCustomIconExample = DatepickerCustomIconExample;
//# sourceMappingURL=datepicker-custom-icon-example.js.map