"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var portal_1 = require("@angular/cdk/portal");
var stepper_1 = require("@angular/cdk/stepper");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var core_2 = require("@angular/material/core");
var icon_1 = require("@angular/material/icon");
var step_header_1 = require("./step-header");
var step_label_1 = require("./step-label");
var stepper_2 = require("./stepper");
var stepper_button_1 = require("./stepper-button");
var stepper_icon_1 = require("./stepper-icon");
var stepper_intl_1 = require("./stepper-intl");
var MatStepperModule = /** @class */ (function () {
    function MatStepperModule() {
    }
    MatStepperModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        core_2.MatCommonModule,
                        common_1.CommonModule,
                        portal_1.PortalModule,
                        button_1.MatButtonModule,
                        stepper_1.CdkStepperModule,
                        icon_1.MatIconModule,
                        core_2.MatRippleModule,
                    ],
                    exports: [
                        core_2.MatCommonModule,
                        stepper_2.MatHorizontalStepper,
                        stepper_2.MatVerticalStepper,
                        stepper_2.MatStep,
                        step_label_1.MatStepLabel,
                        stepper_2.MatStepper,
                        stepper_button_1.MatStepperNext,
                        stepper_button_1.MatStepperPrevious,
                        step_header_1.MatStepHeader,
                        stepper_icon_1.MatStepperIcon,
                    ],
                    declarations: [
                        stepper_2.MatHorizontalStepper,
                        stepper_2.MatVerticalStepper,
                        stepper_2.MatStep,
                        step_label_1.MatStepLabel,
                        stepper_2.MatStepper,
                        stepper_button_1.MatStepperNext,
                        stepper_button_1.MatStepperPrevious,
                        step_header_1.MatStepHeader,
                        stepper_icon_1.MatStepperIcon,
                    ],
                    providers: [stepper_intl_1.MatStepperIntl, core_2.ErrorStateMatcher],
                },] },
    ];
    return MatStepperModule;
}());
exports.MatStepperModule = MatStepperModule;
//# sourceMappingURL=stepper-module.js.map