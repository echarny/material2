"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Datepicker palette colors */
var DatepickerColorExample = /** @class */ (function () {
    function DatepickerColorExample() {
    }
    DatepickerColorExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datepicker-color-example',
                    template: "<mat-form-field color=\"accent\"><mat-label>Inherited calendar color</mat-label><input matInput [matDatepicker]=\"picker1\"><mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle><mat-datepicker #picker1></mat-datepicker></mat-form-field><mat-form-field color=\"accent\"><mat-label>Custom calendar color</mat-label><input matInput [matDatepicker]=\"picker2\"><mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle><mat-datepicker #picker2 color=\"primary\"></mat-datepicker></mat-form-field>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return DatepickerColorExample;
}());
exports.DatepickerColorExample = DatepickerColorExample;
//# sourceMappingURL=datepicker-color-example.js.map