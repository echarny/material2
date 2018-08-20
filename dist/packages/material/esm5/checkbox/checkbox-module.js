/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatCheckbox } from './checkbox';
import { MatCheckboxRequiredValidator } from './checkbox-required-validator';
var MatCheckboxModule = /** @class */ (function () {
    function MatCheckboxModule() {
    }
    MatCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatRippleModule, MatCommonModule, ObserversModule],
                    exports: [MatCheckbox, MatCheckboxRequiredValidator, MatCommonModule],
                    declarations: [MatCheckbox, MatCheckboxRequiredValidator],
                },] },
    ];
    return MatCheckboxModule;
}());
export { MatCheckboxModule };
function MatCheckboxModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatCheckboxModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatCheckboxModule.ctorParameters;
}
//# sourceMappingURL=checkbox-module.js.map