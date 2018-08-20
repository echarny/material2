/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Possible overrides for a dialog's position.
 * @record
 */
export function DialogPosition() { }
function DialogPosition_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    DialogPosition.prototype.top;
    /** @type {?|undefined} */
    DialogPosition.prototype.bottom;
    /** @type {?|undefined} */
    DialogPosition.prototype.left;
    /** @type {?|undefined} */
    DialogPosition.prototype.right;
}
/**
 * @template D
 */
var /**
 * @template D
 */
DialogConfig = /** @class */ (function () {
    function DialogConfig() {
        /**
         * The ARIA role of the dialog.
         */
        this.role = 'dialog';
        /**
         * Custom class(es) for the overlay panel.
         */
        this.panelClass = '';
        /**
         * Whether the dialog has a background.
         */
        this.hasBackdrop = true;
        /**
         * Custom class(es) for the backdrop.
         */
        this.backdropClass = '';
        /**
         * Whether the dialog can be closed by user interaction.
         */
        this.disableClose = false;
        /**
         * The width of the dialog.
         */
        this.width = '';
        /**
         * The height of the dialog.
         */
        this.height = '';
        /**
         * The minimum width of the dialog.
         */
        this.minWidth = '';
        /**
         * The minimum height of the dialog.
         */
        this.minHeight = '';
        /**
         * The maximum width of the dialog.
         */
        this.maxWidth = '80vw';
        /**
         * The maximum height of the dialog.
         */
        this.maxHeight = '';
        /**
         * Data to be injected into the dialog content.
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
    }
    return DialogConfig;
}());
/**
 * @template D
 */
export { DialogConfig };
function DialogConfig_tsickle_Closure_declarations() {
    /**
     * Component to use as the container for the dialog.
     * @type {?}
     */
    DialogConfig.prototype.containerComponent;
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the dialog. This does not affect where the dialog
     * content will be rendered.
     * @type {?}
     */
    DialogConfig.prototype.viewContainerRef;
    /**
     * The id of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.id;
    /**
     * The ARIA role of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.role;
    /**
     * Custom class(es) for the overlay panel.
     * @type {?}
     */
    DialogConfig.prototype.panelClass;
    /**
     * Whether the dialog has a background.
     * @type {?}
     */
    DialogConfig.prototype.hasBackdrop;
    /**
     * Custom class(es) for the backdrop.
     * @type {?}
     */
    DialogConfig.prototype.backdropClass;
    /**
     * Whether the dialog can be closed by user interaction.
     * @type {?}
     */
    DialogConfig.prototype.disableClose;
    /**
     * The width of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.width;
    /**
     * The height of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.height;
    /**
     * The minimum width of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.minWidth;
    /**
     * The minimum height of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.minHeight;
    /**
     * The maximum width of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.maxWidth;
    /**
     * The maximum height of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.maxHeight;
    /**
     * The position of the dialog.
     * @type {?}
     */
    DialogConfig.prototype.position;
    /**
     * Data to be injected into the dialog content.
     * @type {?}
     */
    DialogConfig.prototype.data;
    /**
     * The layout direction for the dialog content.
     * @type {?}
     */
    DialogConfig.prototype.direction;
    /**
     * ID of the element that describes the dialog.
     * @type {?}
     */
    DialogConfig.prototype.ariaDescribedBy;
    /**
     * Aria label to assign to the dialog element
     * @type {?}
     */
    DialogConfig.prototype.ariaLabel;
    /**
     * Whether the dialog should focus the first focusable element on open.
     * @type {?}
     */
    DialogConfig.prototype.autoFocus;
}
//# sourceMappingURL=dialog-config.js.map