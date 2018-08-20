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
/**
 * Possible overrides for a dialog's position.
 * @record
 */
export function DialogPosition() { }
function DialogPosition_tsickle_Closure_declarations() {
    /**
     * Override for the dialog's top position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.top;
    /**
     * Override for the dialog's bottom position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.bottom;
    /**
     * Override for the dialog's left position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.left;
    /**
     * Override for the dialog's right position.
     * @type {?|undefined}
     */
    DialogPosition.prototype.right;
}
/**
 * Configuration for opening a modal dialog with the MatDialog service.
 * @template D
 */
var /**
 * Configuration for opening a modal dialog with the MatDialog service.
 * @template D
 */
MatDialogConfig = /** @class */ (function () {
    function MatDialogConfig() {
        /**
         * The ARIA role of the dialog element.
         */
        this.role = 'dialog';
        /**
         * Custom class for the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the dialog has a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Custom class for the backdrop,
         */
        this.backdropClass = '';
        /**
         * Whether the user can use escape or clicking on the backdrop to close the modal.
         */
        this.disableClose = false;
        /**
         * Width of the dialog.
         */
        this.width = '';
        /**
         * Height of the dialog.
         */
        this.height = '';
        /**
         * Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw
         */
        this.maxWidth = '80vw';
        /**
         * Data being injected into the child component.
         */
        this.data = null;
        /**
         * ID of the element that describes the dialog.
         */
        this.ariaDescribedBy = null;
        /**
         * Aria label to assign to the dialog element
         */
        this.ariaLabel = null;
        /**
         * Whether the dialog should focus the first focusable element on open.
         */
        this.autoFocus = true;
        /**
         * Whether the dialog should restore focus to the
         * previously-focused element, after it's closed.
         */
        this.restoreFocus = true;
        /**
         * Whether the dialog should close when the user goes backwards/forwards in history.
         */
        this.closeOnNavigation = true;
    }
    return MatDialogConfig;
}());
/**
 * Configuration for opening a modal dialog with the MatDialog service.
 * @template D
 */
export { MatDialogConfig };
function MatDialogConfig_tsickle_Closure_declarations() {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     * @type {?}
     */
    MatDialogConfig.prototype.viewContainerRef;
    /**
     * ID for the dialog. If omitted, a unique one will be generated.
     * @type {?}
     */
    MatDialogConfig.prototype.id;
    /**
     * The ARIA role of the dialog element.
     * @type {?}
     */
    MatDialogConfig.prototype.role;
    /**
     * Custom class for the overlay pane.
     * @type {?}
     */
    MatDialogConfig.prototype.panelClass;
    /**
     * Whether the dialog has a backdrop.
     * @type {?}
     */
    MatDialogConfig.prototype.hasBackdrop;
    /**
     * Custom class for the backdrop,
     * @type {?}
     */
    MatDialogConfig.prototype.backdropClass;
    /**
     * Whether the user can use escape or clicking on the backdrop to close the modal.
     * @type {?}
     */
    MatDialogConfig.prototype.disableClose;
    /**
     * Width of the dialog.
     * @type {?}
     */
    MatDialogConfig.prototype.width;
    /**
     * Height of the dialog.
     * @type {?}
     */
    MatDialogConfig.prototype.height;
    /**
     * Min-width of the dialog. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    MatDialogConfig.prototype.minWidth;
    /**
     * Min-height of the dialog. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    MatDialogConfig.prototype.minHeight;
    /**
     * Max-width of the dialog. If a number is provided, pixel units are assumed. Defaults to 80vw
     * @type {?}
     */
    MatDialogConfig.prototype.maxWidth;
    /**
     * Max-height of the dialog. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    MatDialogConfig.prototype.maxHeight;
    /**
     * Position overrides.
     * @type {?}
     */
    MatDialogConfig.prototype.position;
    /**
     * Data being injected into the child component.
     * @type {?}
     */
    MatDialogConfig.prototype.data;
    /**
     * Layout direction for the dialog's content.
     * @type {?}
     */
    MatDialogConfig.prototype.direction;
    /**
     * ID of the element that describes the dialog.
     * @type {?}
     */
    MatDialogConfig.prototype.ariaDescribedBy;
    /**
     * Aria label to assign to the dialog element
     * @type {?}
     */
    MatDialogConfig.prototype.ariaLabel;
    /**
     * Whether the dialog should focus the first focusable element on open.
     * @type {?}
     */
    MatDialogConfig.prototype.autoFocus;
    /**
     * Whether the dialog should restore focus to the
     * previously-focused element, after it's closed.
     * @type {?}
     */
    MatDialogConfig.prototype.restoreFocus;
    /**
     * Scroll strategy to be used for the dialog.
     * @type {?}
     */
    MatDialogConfig.prototype.scrollStrategy;
    /**
     * Whether the dialog should close when the user goes backwards/forwards in history.
     * @type {?}
     */
    MatDialogConfig.prototype.closeOnNavigation;
}
//# sourceMappingURL=dialog-config.js.map