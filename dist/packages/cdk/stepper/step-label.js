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
var CdkStepLabel = /** @class */ (function () {
    function CdkStepLabel(/** @docs-private */ /** @docs-private */ template) {
        this.template = template;
    }
    CdkStepLabel.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkStepLabel]',
                },] },
    ];
    /** @nocollapse */
    CdkStepLabel.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return CdkStepLabel;
}());
exports.CdkStepLabel = CdkStepLabel;
//# sourceMappingURL=step-label.js.map