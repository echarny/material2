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
import { InjectionToken } from '@angular/core';
/**
 * Injection token that can be used to access the data that was passed in to a bottom sheet.
 */
export var /** @type {?} */ MAT_BOTTOM_SHEET_DATA = new InjectionToken('MatBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 * @template D
 */
var /**
 * Configuration used when opening a bottom sheet.
 * @template D
 */
MatBottomSheetConfig = /** @class */ (function () {
    function MatBottomSheetConfig() {
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * Whether the bottom sheet has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Whether the user can use escape or clicking outside to close the bottom sheet.
         */
        this.disableClose = false;
        /**
         * Aria label to assign to the bottom sheet element.
         */
        this.ariaLabel = null;
        /**
         * Whether the bottom sheet should close when the user goes backwards/forwards in history.
         */
        this.closeOnNavigation = true;
        /**
         * Whether the bottom sheet should focus the first focusable element on open.
         */
        this.autoFocus = true;
    }
    return MatBottomSheetConfig;
}());
/**
 * Configuration used when opening a bottom sheet.
 * @template D
 */
export { MatBottomSheetConfig };
function MatBottomSheetConfig_tsickle_Closure_declarations() {
    /**
     * The view container to place the overlay for the bottom sheet into.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.viewContainerRef;
    /**
     * Extra CSS classes to be added to the bottom sheet container.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.panelClass;
    /**
     * Text layout direction for the bottom sheet.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.direction;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.data;
    /**
     * Whether the bottom sheet has a backdrop.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.hasBackdrop;
    /**
     * Custom class for the backdrop.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.backdropClass;
    /**
     * Whether the user can use escape or clicking outside to close the bottom sheet.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.disableClose;
    /**
     * Aria label to assign to the bottom sheet element.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.ariaLabel;
    /**
     * Whether the bottom sheet should close when the user goes backwards/forwards in history.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.closeOnNavigation;
    /**
     * Whether the bottom sheet should focus the first focusable element on open.
     * @type {?}
     */
    MatBottomSheetConfig.prototype.autoFocus;
}
//# sourceMappingURL=bottom-sheet-config.js.map