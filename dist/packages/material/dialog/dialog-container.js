"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dialog_animations_1 = require("./dialog-animations");
var portal_1 = require("@angular/cdk/portal");
var a11y_1 = require("@angular/cdk/a11y");
var dialog_config_1 = require("./dialog-config");
/**
 * Throws an exception for the case when a ComponentPortal is
 * attached to a DomPortalOutlet without an origin.
 * @docs-private
 */
function throwMatDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
exports.throwMatDialogContentAlreadyAttachedError = throwMatDialogContentAlreadyAttachedError;
/**
 * Internal component that wraps user-provided dialog content.
 * Animation is based on https://material.io/guidelines/motion/choreography.html.
 * @docs-private
 */
var MatDialogContainer = /** @class */ (function (_super) {
    __extends(MatDialogContainer, _super);
    function MatDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, /** The dialog configuration. */
    _config) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        _this._config = _config;
        /** Element that was focused before the dialog was opened. Save this to restore upon close. */
        _this._elementFocusedBeforeDialogWasOpened = null;
        /** State of the dialog animation. */
        _this._state = 'enter';
        /** Emits when an animation state changes. */
        _this._animationStateChanged = new core_1.EventEmitter();
        /** ID of the element that should be considered as the dialog's label. */
        _this._ariaLabelledBy = null;
        return _this;
    }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
       * Attach a ComponentPortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
       */
    MatDialogContainer.prototype.attachComponentPortal = /**
       * Attach a ComponentPortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
       */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throwMatDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
       * Attach a TemplatePortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
       */
    MatDialogContainer.prototype.attachTemplatePortal = /**
       * Attach a TemplatePortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
       */
    function (portal) {
        if (this._portalOutlet.hasAttached()) {
            throwMatDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /** Moves the focus inside the focus trap. */
    /** Moves the focus inside the focus trap. */
    MatDialogContainer.prototype._trapFocus = /** Moves the focus inside the focus trap. */
    function () {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady();
        }
    };
    /** Restores focus to the element that was focused before the dialog opened. */
    /** Restores focus to the element that was focused before the dialog opened. */
    MatDialogContainer.prototype._restoreFocus = /** Restores focus to the element that was focused before the dialog opened. */
    function () {
        var toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this._config.restoreFocus && toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    /** Saves a reference to the element that was focused before the dialog was opened. */
    /** Saves a reference to the element that was focused before the dialog was opened. */
    MatDialogContainer.prototype._savePreviouslyFocusedElement = /** Saves a reference to the element that was focused before the dialog was opened. */
    function () {
        var _this = this;
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = this._document.activeElement;
            // Note that there is no focus method when rendering on the server.
            if (this._elementRef.nativeElement.focus) {
                // Move focus onto the dialog immediately in order to prevent the user from accidentally
                // opening multiple dialogs at the same time. Needs to be async, because the element
                // may not be focusable immediately.
                Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
            }
        }
    };
    /** Callback, invoked whenever an animation on the host completes. */
    /** Callback, invoked whenever an animation on the host completes. */
    MatDialogContainer.prototype._onAnimationDone = /** Callback, invoked whenever an animation on the host completes. */
    function (event) {
        if (event.toState === 'enter') {
            this._trapFocus();
        }
        else if (event.toState === 'exit') {
            this._restoreFocus();
        }
        this._animationStateChanged.emit(event);
    };
    /** Callback, invoked when an animation on the host starts. */
    /** Callback, invoked when an animation on the host starts. */
    MatDialogContainer.prototype._onAnimationStart = /** Callback, invoked when an animation on the host starts. */
    function (event) {
        this._animationStateChanged.emit(event);
    };
    /** Starts the dialog exit animation. */
    /** Starts the dialog exit animation. */
    MatDialogContainer.prototype._startExitAnimation = /** Starts the dialog exit animation. */
    function () {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    };
    MatDialogContainer.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-dialog-container{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;padding:24px;border-radius:2px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}@media screen and (-ms-high-contrast:active){.mat-dialog-container{outline:solid 1px}}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:12px 0;display:flex;flex-wrap:wrap;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button+.mat-button,.mat-dialog-actions .mat-button+.mat-raised-button,.mat-dialog-actions .mat-raised-button+.mat-button,.mat-dialog-actions .mat-raised-button+.mat-raised-button{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button+.mat-button,[dir=rtl] .mat-dialog-actions .mat-button+.mat-raised-button,[dir=rtl] .mat-dialog-actions .mat-raised-button+.mat-button,[dir=rtl] .mat-dialog-actions .mat-raised-button+.mat-raised-button{margin-left:0;margin-right:8px}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core_1.ChangeDetectionStrategy.Default,
                    animations: [dialog_animations_1.matDialogAnimations.slideDialog],
                    host: {
                        'class': 'mat-dialog-container',
                        'tabindex': '-1',
                        'aria-modal': 'true',
                        '[attr.id]': '_id',
                        '[attr.role]': '_config.role',
                        '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledBy',
                        '[attr.aria-label]': '_config.ariaLabel',
                        '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
                        '[@slideDialog]': '_state',
                        '(@slideDialog.start)': '_onAnimationStart($event)',
                        '(@slideDialog.done)': '_onAnimationDone($event)',
                    },
                },] },
    ];
    /** @nocollapse */
    MatDialogContainer.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: a11y_1.FocusTrapFactory, },
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: dialog_config_1.MatDialogConfig, },
    ]; };
    MatDialogContainer.propDecorators = {
        "_portalOutlet": [{ type: core_1.ViewChild, args: [portal_1.CdkPortalOutlet,] },],
    };
    return MatDialogContainer;
}(portal_1.BasePortalOutlet));
exports.MatDialogContainer = MatDialogContainer;
//# sourceMappingURL=dialog-container.js.map