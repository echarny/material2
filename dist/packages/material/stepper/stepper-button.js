"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var stepper_1 = require("@angular/cdk/stepper");
var stepper_2 = require("./stepper");
/** Button that moves to the next step in a stepper workflow. */
var MatStepperNext = /** @class */ (function (_super) {
    __extends(MatStepperNext, _super);
    function MatStepperNext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatStepperNext.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'button[matStepperNext]',
                    host: {
                        '(click)': '_stepper.next()',
                        '[type]': 'type',
                    },
                    inputs: ['type'],
                    providers: [{ provide: stepper_1.CdkStepper, useExisting: stepper_2.MatStepper }]
                },] },
    ];
    return MatStepperNext;
}(stepper_1.CdkStepperNext));
exports.MatStepperNext = MatStepperNext;
/** Button that moves to the previous step in a stepper workflow. */
var MatStepperPrevious = /** @class */ (function (_super) {
    __extends(MatStepperPrevious, _super);
    function MatStepperPrevious() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatStepperPrevious.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'button[matStepperPrevious]',
                    host: {
                        '(click)': '_stepper.previous()',
                        '[type]': 'type',
                    },
                    inputs: ['type'],
                    providers: [{ provide: stepper_1.CdkStepper, useExisting: stepper_2.MatStepper }]
                },] },
    ];
    return MatStepperPrevious;
}(stepper_1.CdkStepperPrevious));
exports.MatStepperPrevious = MatStepperPrevious;
//# sourceMappingURL=stepper-button.js.map