"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var stepper_1 = require("./stepper");
/** Button that moves to the next step in a stepper workflow. */
var CdkStepperNext = /** @class */ (function () {
    function CdkStepperNext(_stepper) {
        this._stepper = _stepper;
        /** Type of the next button. Defaults to "submit" if not specified. */
        this.type = 'submit';
    }
    CdkStepperNext.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'button[cdkStepperNext]',
                    host: {
                        '(click)': '_stepper.next()',
                        '[type]': 'type',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkStepperNext.ctorParameters = function () { return [
        { type: stepper_1.CdkStepper, },
    ]; };
    CdkStepperNext.propDecorators = {
        "type": [{ type: core_1.Input },],
    };
    return CdkStepperNext;
}());
exports.CdkStepperNext = CdkStepperNext;
/** Button that moves to the previous step in a stepper workflow. */
var CdkStepperPrevious = /** @class */ (function () {
    function CdkStepperPrevious(_stepper) {
        this._stepper = _stepper;
        /** Type of the previous button. Defaults to "button" if not specified. */
        this.type = 'button';
    }
    CdkStepperPrevious.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'button[cdkStepperPrevious]',
                    host: {
                        '(click)': '_stepper.previous()',
                        '[type]': 'type',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkStepperPrevious.ctorParameters = function () { return [
        { type: stepper_1.CdkStepper, },
    ]; };
    CdkStepperPrevious.propDecorators = {
        "type": [{ type: core_1.Input },],
    };
    return CdkStepperPrevious;
}());
exports.CdkStepperPrevious = CdkStepperPrevious;
//# sourceMappingURL=stepper-button.js.map