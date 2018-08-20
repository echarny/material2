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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GestureConfig, MatCommonModule } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatSlider } from './slider';
var MatSliderModule = /** @class */ (function () {
    function MatSliderModule() {
    }
    MatSliderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatCommonModule],
                    exports: [MatSlider, MatCommonModule],
                    declarations: [MatSlider],
                    providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }]
                },] },
    ];
    return MatSliderModule;
}());
export { MatSliderModule };
function MatSliderModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatSliderModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatSliderModule.ctorParameters;
}
//# sourceMappingURL=slider-module.js.map