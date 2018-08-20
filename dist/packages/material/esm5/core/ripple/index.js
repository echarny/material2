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
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { MatCommonModule } from '../common-behaviors/common-module';
import { MatRipple } from './ripple';
export { MAT_RIPPLE_GLOBAL_OPTIONS, MatRipple } from './ripple';
export { RippleState, RippleRef } from './ripple-ref';
export { defaultRippleAnimationConfig, RippleRenderer } from './ripple-renderer';
var MatRippleModule = /** @class */ (function () {
    function MatRippleModule() {
    }
    MatRippleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, PlatformModule],
                    exports: [MatRipple, MatCommonModule],
                    declarations: [MatRipple],
                },] },
    ];
    return MatRippleModule;
}());
export { MatRippleModule };
function MatRippleModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatRippleModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatRippleModule.ctorParameters;
}
//# sourceMappingURL=index.js.map