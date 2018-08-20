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
 * Injection token that can be used to access the data that was passed in to a snack bar.
 */
export var /** @type {?} */ MAT_SNACK_BAR_DATA = new InjectionToken('MatSnackBarData');
/**
 * Configuration used when opening a snack-bar.
 * @template D
 */
var /**
 * Configuration used when opening a snack-bar.
 * @template D
 */
MatSnackBarConfig = /** @class */ (function () {
    function MatSnackBarConfig() {
        /**
         * The politeness level for the MatAriaLiveAnnouncer announcement.
         */
        this.politeness = 'assertive';
        /**
         * Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom
         * component or template, the announcement message will default to the specified message.
         */
        this.announcementMessage = '';
        /**
         * The length of time in milliseconds to wait before automatically dismissing the snack bar.
         */
        this.duration = 0;
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * The horizontal position to place the snack bar.
         */
        this.horizontalPosition = 'center';
        /**
         * The vertical position to place the snack bar.
         */
        this.verticalPosition = 'bottom';
    }
    return MatSnackBarConfig;
}());
/**
 * Configuration used when opening a snack-bar.
 * @template D
 */
export { MatSnackBarConfig };
function MatSnackBarConfig_tsickle_Closure_declarations() {
    /**
     * The politeness level for the MatAriaLiveAnnouncer announcement.
     * @type {?}
     */
    MatSnackBarConfig.prototype.politeness;
    /**
     * Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom
     * component or template, the announcement message will default to the specified message.
     * @type {?}
     */
    MatSnackBarConfig.prototype.announcementMessage;
    /**
     * The view container to place the overlay for the snack bar into.
     * @type {?}
     */
    MatSnackBarConfig.prototype.viewContainerRef;
    /**
     * The length of time in milliseconds to wait before automatically dismissing the snack bar.
     * @type {?}
     */
    MatSnackBarConfig.prototype.duration;
    /**
     * Extra CSS classes to be added to the snack bar container.
     * @type {?}
     */
    MatSnackBarConfig.prototype.panelClass;
    /**
     * Text layout direction for the snack bar.
     * @type {?}
     */
    MatSnackBarConfig.prototype.direction;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    MatSnackBarConfig.prototype.data;
    /**
     * The horizontal position to place the snack bar.
     * @type {?}
     */
    MatSnackBarConfig.prototype.horizontalPosition;
    /**
     * The vertical position to place the snack bar.
     * @type {?}
     */
    MatSnackBarConfig.prototype.verticalPosition;
}
//# sourceMappingURL=snack-bar-config.js.map