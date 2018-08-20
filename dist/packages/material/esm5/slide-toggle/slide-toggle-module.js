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
import { NgModule } from '@angular/core';
import { GestureConfig, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatSlideToggle } from './slide-toggle';
var MatSlideToggleModule = /** @class */ (function () {
    function MatSlideToggleModule() {
    }
    MatSlideToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatRippleModule, MatCommonModule, ObserversModule],
                    exports: [MatSlideToggle, MatCommonModule],
                    declarations: [MatSlideToggle],
                    providers: [
                        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
                    ],
                },] },
    ];
    return MatSlideToggleModule;
}());
export { MatSlideToggleModule };
function MatSlideToggleModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatSlideToggleModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatSlideToggleModule.ctorParameters;
}
//# sourceMappingURL=slide-toggle-module.js.map