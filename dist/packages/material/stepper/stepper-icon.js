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
/**
 * Template to be used to override the icons inside the step header.
 */
var MatStepperIcon = /** @class */ (function () {
    function MatStepperIcon(templateRef) {
        this.templateRef = templateRef;
    }
    MatStepperIcon.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ng-template[matStepperIcon]',
                },] },
    ];
    /** @nocollapse */
    MatStepperIcon.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    MatStepperIcon.propDecorators = {
        "name": [{ type: core_1.Input, args: ['matStepperIcon',] },],
    };
    return MatStepperIcon;
}());
exports.MatStepperIcon = MatStepperIcon;
//# sourceMappingURL=stepper-icon.js.map