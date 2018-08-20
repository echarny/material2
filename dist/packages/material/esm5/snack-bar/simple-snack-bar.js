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
import { Component, ViewEncapsulation, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBarRef } from './snack-bar-ref';
import { MAT_SNACK_BAR_DATA } from './snack-bar-config';
import { matSnackBarAnimations } from './snack-bar-animations';
/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
var SimpleSnackBar = /** @class */ (function () {
    function SimpleSnackBar(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
    }
    /** Performs the action on the snack bar. */
    /**
     * Performs the action on the snack bar.
     * @return {?}
     */
    SimpleSnackBar.prototype.action = /**
     * Performs the action on the snack bar.
     * @return {?}
     */
    function () {
        this.snackBarRef.dismissWithAction();
    };
    Object.defineProperty(SimpleSnackBar.prototype, "hasAction", {
        /** If the action button should be shown. */
        get: /**
         * If the action button should be shown.
         * @return {?}
         */
        function () {
            return !!this.data.action;
        },
        enumerable: true,
        configurable: true
    });
    SimpleSnackBar.decorators = [
        { type: Component, args: [{selector: 'simple-snack-bar',
                    template: "<span>{{data.message}}</span><div class=\"mat-simple-snackbar-action\" *ngIf=\"hasAction\"><button mat-button (click)=\"action()\">{{data.action}}</button></div>",
                    styles: [".mat-simple-snackbar{display:flex;justify-content:space-between;line-height:20px;opacity:1}.mat-simple-snackbar-action{display:flex;flex-direction:column;flex-shrink:0;justify-content:space-around;margin:-8px 0 -8px 8px}.mat-simple-snackbar-action button{flex:1;max-height:36px}[dir=rtl] .mat-simple-snackbar-action{margin-left:0;margin-right:8px}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [matSnackBarAnimations.contentFade],
                    host: {
                        '[@contentFade]': '',
                        'class': 'mat-simple-snackbar',
                    }
                },] },
    ];
    /** @nocollapse */
    SimpleSnackBar.ctorParameters = function () { return [
        { type: MatSnackBarRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_SNACK_BAR_DATA,] },] },
    ]; };
    return SimpleSnackBar;
}());
export { SimpleSnackBar };
function SimpleSnackBar_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SimpleSnackBar.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SimpleSnackBar.ctorParameters;
    /**
     * Data that was injected into the snack bar.
     * @type {?}
     */
    SimpleSnackBar.prototype.data;
    /** @type {?} */
    SimpleSnackBar.prototype.snackBarRef;
}
//# sourceMappingURL=simple-snack-bar.js.map