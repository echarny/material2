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
var common_1 = require("@angular/common");
var step_label_1 = require("./step-label");
var stepper_button_1 = require("./stepper-button");
var bidi_1 = require("@angular/cdk/bidi");
var CdkStepperModule = /** @class */ (function () {
    function CdkStepperModule() {
    }
    CdkStepperModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [bidi_1.BidiModule, common_1.CommonModule],
                    exports: [stepper_1.CdkStep, stepper_1.CdkStepper, step_label_1.CdkStepLabel, stepper_button_1.CdkStepperNext, stepper_button_1.CdkStepperPrevious],
                    declarations: [stepper_1.CdkStep, stepper_1.CdkStepper, step_label_1.CdkStepLabel, stepper_button_1.CdkStepperNext, stepper_button_1.CdkStepperPrevious]
                },] },
    ];
    return CdkStepperModule;
}());
exports.CdkStepperModule = CdkStepperModule;
//# sourceMappingURL=stepper-module.js.map