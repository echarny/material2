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
/** Injection token that can be used to access the data that was passed in to a bottom sheet. */
exports.MAT_BOTTOM_SHEET_DATA = new core_1.InjectionToken('MatBottomSheetData');
/**
 * Configuration used when opening a bottom sheet.
 */
var /**
 * Configuration used when opening a bottom sheet.
 */
MatBottomSheetConfig = /** @class */ (function () {
    function MatBottomSheetConfig() {
        /** Data being injected into the child component. */
        this.data = null;
        /** Whether the bottom sheet has a backdrop. */
        this.hasBackdrop = true;
        /** Whether the user can use escape or clicking outside to close the bottom sheet. */
        this.disableClose = false;
        /** Aria label to assign to the bottom sheet element. */
        this.ariaLabel = null;
        /** Whether the bottom sheet should close when the user goes backwards/forwards in history. */
        this.closeOnNavigation = true;
        /** Whether the bottom sheet should focus the first focusable element on open. */
        this.autoFocus = true;
    }
    return MatBottomSheetConfig;
}());
exports.MatBottomSheetConfig = MatBottomSheetConfig;
//# sourceMappingURL=bottom-sheet-config.js.map