"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var text_field_1 = require("@angular/cdk/text-field");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
/** @title Auto-resizing textarea */
var TextFieldAutosizeTextareaExample = /** @class */ (function () {
    function TextFieldAutosizeTextareaExample(ngZone) {
        this.ngZone = ngZone;
    }
    TextFieldAutosizeTextareaExample.prototype.triggerResize = function () {
        var _this = this;
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(operators_1.take(1))
            .subscribe(function () { return _this.autosize.resizeToFitContent(true); });
    };
    TextFieldAutosizeTextareaExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'text-field-autosize-textarea-example',
                    template: "<mat-form-field><mat-label>Font size</mat-label><mat-select #fontSize value=\"16px\" (selectionChange)=\"triggerResize()\"><mat-option value=\"10px\">10px</mat-option><mat-option value=\"12px\">12px</mat-option><mat-option value=\"14px\">14px</mat-option><mat-option value=\"16px\">16px</mat-option><mat-option value=\"18px\">18px</mat-option><mat-option value=\"20px\">20px</mat-option></mat-select></mat-form-field><mat-form-field [style.fontSize]=\"fontSize.value\"><mat-label>Autosize textarea</mat-label><textarea matInput cdkTextareaAutosize #autosize=\"cdkTextareaAutosize\" cdkAutosizeMinRows=\"2\" cdkAutosizeMaxRows=\"5\"></textarea></mat-form-field>",
                    styles: ["/** No CSS for this example */ "],
                },] },
    ];
    /** @nocollapse */
    TextFieldAutosizeTextareaExample.ctorParameters = function () { return [
        { type: core_1.NgZone, },
    ]; };
    TextFieldAutosizeTextareaExample.propDecorators = {
        "autosize": [{ type: core_1.ViewChild, args: ['autosize',] },],
    };
    return TextFieldAutosizeTextareaExample;
}());
exports.TextFieldAutosizeTextareaExample = TextFieldAutosizeTextareaExample;
//# sourceMappingURL=text-field-autosize-textarea-example.js.map