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
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SimpleSnackBar } from './simple-snack-bar';
import { MatSnackBarContainer } from './snack-bar-container';
var MatSnackBarModule = /** @class */ (function () {
    function MatSnackBarModule() {
    }
    MatSnackBarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        OverlayModule,
                        PortalModule,
                        CommonModule,
                        MatButtonModule,
                        MatCommonModule,
                    ],
                    exports: [MatSnackBarContainer, MatCommonModule],
                    declarations: [MatSnackBarContainer, SimpleSnackBar],
                    entryComponents: [MatSnackBarContainer, SimpleSnackBar],
                },] },
    ];
    return MatSnackBarModule;
}());
export { MatSnackBarModule };
function MatSnackBarModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatSnackBarModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatSnackBarModule.ctorParameters;
}
//# sourceMappingURL=snack-bar-module.js.map