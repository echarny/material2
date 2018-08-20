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
/** Injection token that can be used to access the data that was passed in to a snack bar. */
exports.MAT_SNACK_BAR_DATA = new core_1.InjectionToken('MatSnackBarData');
/**
 * Configuration used when opening a snack-bar.
 */
var /**
 * Configuration used when opening a snack-bar.
 */
MatSnackBarConfig = /** @class */ (function () {
    function MatSnackBarConfig() {
        /** The politeness level for the MatAriaLiveAnnouncer announcement. */
        this.politeness = 'assertive';
        /**
           * Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom
           * component or template, the announcement message will default to the specified message.
           */
        this.announcementMessage = '';
        /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
        this.duration = 0;
        /** Data being injected into the child component. */
        this.data = null;
        /** The horizontal position to place the snack bar. */
        this.horizontalPosition = 'center';
        /** The vertical position to place the snack bar. */
        this.verticalPosition = 'bottom';
    }
    return MatSnackBarConfig;
}());
exports.MatSnackBarConfig = MatSnackBarConfig;
//# sourceMappingURL=snack-bar-config.js.map