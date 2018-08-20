"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var core_2 = require("@angular/material/core");
var _moment = require("moment");
var moment_1 = require("moment");
var moment = moment_1.default || _moment;
var ɵ0 = material_moment_adapter_1.MAT_MOMENT_DATE_FORMATS;
exports.ɵ0 = ɵ0;
/** @title Datepicker that uses Moment.js dates */
var DatepickerMomentExample = /** @class */ (function () {
    function DatepickerMomentExample() {
        // Datepicker takes `Moment` objects instead of `Date` objects.
        this.date = new forms_1.FormControl(moment([2017, 0, 1]));
    }
    DatepickerMomentExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datepicker-moment-example',
                    template: "<mat-form-field><input matInput [matDatepicker]=\"dp\" placeholder=\"Moment.js datepicker\" [formControl]=\"date\"><mat-datepicker-toggle matSuffix [for]=\"dp\"></mat-datepicker-toggle><mat-datepicker #dp></mat-datepicker></mat-form-field>",
                    styles: ["/** No CSS for this example */ "],
                    providers: [
                        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
                        // `MatMomentDateModule` in your applications root module. We provide it at the component level
                        // here, due to limitations of our example generation script.
                        { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                        { provide: core_2.MAT_DATE_FORMATS, useValue: ɵ0 },
                    ],
                },] },
    ];
    return DatepickerMomentExample;
}());
exports.DatepickerMomentExample = DatepickerMomentExample;
//# sourceMappingURL=datepicker-moment-example.js.map