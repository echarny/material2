"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Monitoring autofill state with cdkAutofill */
var TextFieldAutofillDirectiveExample = /** @class */ (function () {
    function TextFieldAutofillDirectiveExample() {
    }
    TextFieldAutofillDirectiveExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'text-field-autofill-directive-example',
                    template: "<form><mat-form-field><mat-label>First name</mat-label><input matInput (cdkAutofill)=\"firstNameAutofilled = $event.isAutofilled\"><mat-hint *ngIf=\"firstNameAutofilled\">Autofilled!</mat-hint></mat-form-field><mat-form-field><mat-label>Last name</mat-label><input matInput (cdkAutofill)=\"lastNameAutofilled = $event.isAutofilled\"><mat-hint *ngIf=\"lastNameAutofilled\">Autofilled!</mat-hint></mat-form-field><button mat-raised-button>Submit</button></form>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    return TextFieldAutofillDirectiveExample;
}());
exports.TextFieldAutofillDirectiveExample = TextFieldAutofillDirectiveExample;
//# sourceMappingURL=text-field-autofill-directive-example.js.map