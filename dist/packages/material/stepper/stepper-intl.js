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
var rxjs_1 = require("rxjs");
var i0 = require("@angular/core");
/** Stepper data that is required for internationalization. */
var MatStepperIntl = /** @class */ (function () {
    function MatStepperIntl() {
        /**
           * Stream that emits whenever the labels here are changed. Use this to notify
           * components if the labels have changed after initialization.
           */
        this.changes = new rxjs_1.Subject();
        /** Label that is rendered below optional steps. */
        this.optionalLabel = 'Optional';
    }
    MatStepperIntl.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    MatStepperIntl.ngInjectableDef = i0.defineInjectable({ factory: function MatStepperIntl_Factory() { return new MatStepperIntl(); }, token: MatStepperIntl, providedIn: "root" });
    return MatStepperIntl;
}());
exports.MatStepperIntl = MatStepperIntl;
//# sourceMappingURL=stepper-intl.js.map