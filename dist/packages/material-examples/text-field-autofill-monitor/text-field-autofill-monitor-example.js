"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_field_1 = require("@angular/cdk/text-field");
var core_1 = require("@angular/core");
/** @title Monitoring autofill state with AutofillMonitor */
var TextFieldAutofillMonitorExample = /** @class */ (function () {
    function TextFieldAutofillMonitorExample(autofill) {
        this.autofill = autofill;
    }
    TextFieldAutofillMonitorExample.prototype.ngOnInit = function () {
        var _this = this;
        this.autofill.monitor(this.firstName.nativeElement)
            .subscribe(function (e) { return _this.firstNameAutofilled = e.isAutofilled; });
        this.autofill.monitor(this.lastName.nativeElement)
            .subscribe(function (e) { return _this.lastNameAutofilled = e.isAutofilled; });
    };
    TextFieldAutofillMonitorExample.prototype.ngOnDestroy = function () {
        this.autofill.stopMonitoring(this.firstName.nativeElement);
        this.autofill.stopMonitoring(this.lastName.nativeElement);
    };
    TextFieldAutofillMonitorExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'text-field-autofill-monitor-example',
                    template: "<form><mat-form-field><mat-label>First name</mat-label><input matInput #first><mat-hint *ngIf=\"firstNameAutofilled\">Autofilled!</mat-hint></mat-form-field><mat-form-field><mat-label>Last name</mat-label><input matInput #last><mat-hint *ngIf=\"lastNameAutofilled\">Autofilled!</mat-hint></mat-form-field><button mat-raised-button>Submit</button></form>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    /** @nocollapse */
    TextFieldAutofillMonitorExample.ctorParameters = function () { return [
        { type: text_field_1.AutofillMonitor, },
    ]; };
    TextFieldAutofillMonitorExample.propDecorators = {
        "firstName": [{ type: core_1.ViewChild, args: ['first', { read: core_1.ElementRef },] },],
        "lastName": [{ type: core_1.ViewChild, args: ['last', { read: core_1.ElementRef },] },],
    };
    return TextFieldAutofillMonitorExample;
}());
exports.TextFieldAutofillMonitorExample = TextFieldAutofillMonitorExample;
//# sourceMappingURL=text-field-autofill-monitor-example.js.map