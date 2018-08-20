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
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '../ripple/index';
import { MatPseudoCheckboxModule } from '../selection/index';
import { MatOption } from './option';
import { MatOptgroup } from './optgroup';
var MatOptionModule = /** @class */ (function () {
    function MatOptionModule() {
    }
    MatOptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatRippleModule, CommonModule, MatPseudoCheckboxModule],
                    exports: [MatOption, MatOptgroup],
                    declarations: [MatOption, MatOptgroup]
                },] },
    ];
    return MatOptionModule;
}());
export { MatOptionModule };
function MatOptionModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatOptionModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatOptionModule.ctorParameters;
}
export { MatOptionSelectionChange, MAT_OPTION_PARENT_COMPONENT, MatOption, _countGroupLabelsBeforeOption, _getOptionScrollPosition } from './option';
export { MatOptgroupBase, _MatOptgroupMixinBase, MatOptgroup } from './optgroup';
//# sourceMappingURL=index.js.map