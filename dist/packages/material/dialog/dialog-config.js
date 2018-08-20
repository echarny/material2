"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configuration for opening a modal dialog with the MatDialog service.
 */
var /**
 * Configuration for opening a modal dialog with the MatDialog service.
 */
MatDialogConfig = /** @class */ (function () {
    function MatDialogConfig() {
        /** The ARIA role of the dialog element. */
        this.role = 'dialog';
        /** Custom class for the overlay pane. */
        this.panelClass = '';
        /** Whether the dialog has a backdrop. */
        this.hasBackdrop = true;
        /** Custom class for the backdrop, */
        this.backdropClass = '';
        /** Whether the user can use escape or clicking on the backdrop to close the modal. */
        this.disableClose = false;
        /** Width of the dialog. */
        this.width = '';
        /** Height of the dialog. */
        this.height = '';
        /** Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw */
        this.maxWidth = '80vw';
        /** Data being injected into the child component. */
        this.data = null;
        /** ID of the element that describes the dialog. */
        this.ariaDescribedBy = null;
        /** Aria label to assign to the dialog element */
        this.ariaLabel = null;
        /** Whether the dialog should focus the first focusable element on open. */
        this.autoFocus = true;
        /**
           * Whether the dialog should restore focus to the
           * previously-focused element, after it's closed.
           */
        this.restoreFocus = true;
        /** Whether the dialog should close when the user goes backwards/forwards in history. */
        this.closeOnNavigation = true;
    }
    return MatDialogConfig;
}());
exports.MatDialogConfig = MatDialogConfig;
//# sourceMappingURL=dialog-config.js.map