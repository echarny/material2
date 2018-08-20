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
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, PortalHostDirective } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Inject, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogConfig } from './dialog-config';
/**
 * @return {?}
 */
export function throwDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
/**
 * Internal component that wraps user-provided dialog content.
 * \@docs-private
 */
var CdkDialogContainer = /** @class */ (function (_super) {
    tslib_1.__extends(CdkDialogContainer, _super);
    function CdkDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, _config) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        _this._config = _config;
        /**
         * State of the dialog animation.
         */
        _this._state = 'enter';
        /**
         * Element that was focused before the dialog was opened. Save this to restore upon close.
         */
        _this._elementFocusedBeforeDialogWasOpened = null;
        /**
         * The class that traps and manages focus within the dialog.
         */
        _this._focusTrap = _this._focusTrapFactory.create(_this._elementRef.nativeElement, false);
        /**
         * A subject emitting before the dialog enters the view.
         */
        _this._beforeEnter = new Subject();
        /**
         * A subject emitting after the dialog enters the view.
         */
        _this._afterEnter = new Subject();
        /**
         * A subject emitting before the dialog exits the view.
         */
        _this._beforeExit = new Subject();
        /**
         * A subject emitting after the dialog exits the view.
         */
        _this._afterExit = new Subject();
        return _this;
    }
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaLabel", {
        get: /**
         * @return {?}
         */
        function () { return this._config.ariaLabel || null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaDescribedBy", {
        get: /**
         * @return {?}
         */
        function () { return this._config.ariaDescribedBy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_role", {
        get: /**
         * @return {?}
         */
        function () { return this._config.role; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_tabindex", {
        get: /**
         * @return {?}
         */
        function () { return -1; },
        enumerable: true,
        configurable: true
    });
    /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    /**
     * Destroy focus trap to place focus back to the element focused before the dialog opened.
     * @return {?}
     */
    CdkDialogContainer.prototype.ngOnDestroy = /**
     * Destroy focus trap to place focus back to the element focused before the dialog opened.
     * @return {?}
     */
    function () {
        this._focusTrap.destroy();
    };
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    CdkDialogContainer.prototype.attachComponentPortal = /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachComponentPortal(portal);
    };
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    CdkDialogContainer.prototype.attachTemplatePortal = /**
     * Attach a TemplatePortal as content to this dialog container.
     * @template C
     * @param {?} portal Portal to be attached as the dialog content.
     * @return {?}
     */
    function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal);
    };
    /** Emit lifecycle events based on animation `start` callback. */
    /**
     * Emit lifecycle events based on animation `start` callback.
     * @param {?} event
     * @return {?}
     */
    CdkDialogContainer.prototype._onAnimationStart = /**
     * Emit lifecycle events based on animation `start` callback.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'enter') {
            this._beforeEnter.next();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._beforeExit.next();
        }
    };
    /** Emit lifecycle events based on animation `done` callback. */
    /**
     * Emit lifecycle events based on animation `done` callback.
     * @param {?} event
     * @return {?}
     */
    CdkDialogContainer.prototype._onAnimationDone = /**
     * Emit lifecycle events based on animation `done` callback.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'enter') {
            this._autoFocusFirstTabbableElement();
            this._afterEnter.next();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._returnFocusAfterDialog();
            this._afterExit.next();
        }
    };
    /** Starts the dialog exit animation. */
    /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    CdkDialogContainer.prototype._startExiting = /**
     * Starts the dialog exit animation.
     * @return {?}
     */
    function () {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @return {?}
     */
    CdkDialogContainer.prototype._savePreviouslyFocusedElement = /**
     * Saves a reference to the element that was focused before the dialog was opened.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = /** @type {?} */ (this._document.activeElement);
            // Move focus onto the dialog immediately in order to prevent the user from accidentally
            // opening multiple dialogs at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     * @return {?}
     */
    CdkDialogContainer.prototype._autoFocusFirstTabbableElement = /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     * @return {?}
     */
    function () {
        var _this = this;
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady().then(function (hasMovedFocus) {
                // If we didn't find any focusable elements inside the dialog, focus the
                // container so the user can't tab into other elements behind it.
                if (!hasMovedFocus) {
                    _this._elementRef.nativeElement.focus();
                }
            });
        }
    };
    /**
     * Returns the focus to the element focused before the dialog was open.
     * @return {?}
     */
    CdkDialogContainer.prototype._returnFocusAfterDialog = /**
     * Returns the focus to the element focused before the dialog was open.
     * @return {?}
     */
    function () {
        var /** @type {?} */ toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
    };
    CdkDialogContainer.decorators = [
        { type: Component, args: [{selector: 'cdk-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: ["cdk-dialog-container{background:#fff;border-radius:5px;display:block;padding:10px}"],
                    encapsulation: ViewEncapsulation.None,
                    // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: ChangeDetectionStrategy.Default,
                    animations: [
                        trigger('dialog', [
                            state('enter', style({ opacity: 1 })),
                            state('exit, void', style({ opacity: 0 })),
                            transition('* => *', animate(225)),
                        ])
                    ],
                    host: {
                        '[@dialog]': '_state',
                        '(@dialog.start)': '_onAnimationStart($event)',
                        '(@dialog.done)': '_onAnimationDone($event)',
                    },
                },] },
    ];
    /** @nocollapse */
    CdkDialogContainer.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusTrapFactory, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
        { type: DialogConfig, },
    ]; };
    CdkDialogContainer.propDecorators = {
        "_ariaLabel": [{ type: HostBinding, args: ['attr.aria-label',] },],
        "_ariaDescribedBy": [{ type: HostBinding, args: ['attr.aria-describedby',] },],
        "_role": [{ type: HostBinding, args: ['attr.role',] },],
        "_tabindex": [{ type: HostBinding, args: ['attr.tabindex',] },],
        "_portalHost": [{ type: ViewChild, args: [PortalHostDirective,] },],
    };
    return CdkDialogContainer;
}(BasePortalOutlet));
export { CdkDialogContainer };
function CdkDialogContainer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkDialogContainer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkDialogContainer.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkDialogContainer.propDecorators;
    /**
     * State of the dialog animation.
     * @type {?}
     */
    CdkDialogContainer.prototype._state;
    /**
     * Element that was focused before the dialog was opened. Save this to restore upon close.
     * @type {?}
     */
    CdkDialogContainer.prototype._elementFocusedBeforeDialogWasOpened;
    /**
     * The class that traps and manages focus within the dialog.
     * @type {?}
     */
    CdkDialogContainer.prototype._focusTrap;
    /**
     * The portal host inside of this container into which the dialog content will be loaded.
     * @type {?}
     */
    CdkDialogContainer.prototype._portalHost;
    /**
     * A subject emitting before the dialog enters the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._beforeEnter;
    /**
     * A subject emitting after the dialog enters the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._afterEnter;
    /**
     * A subject emitting before the dialog exits the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._beforeExit;
    /**
     * A subject emitting after the dialog exits the view.
     * @type {?}
     */
    CdkDialogContainer.prototype._afterExit;
    /** @type {?} */
    CdkDialogContainer.prototype._elementRef;
    /** @type {?} */
    CdkDialogContainer.prototype._focusTrapFactory;
    /** @type {?} */
    CdkDialogContainer.prototype._changeDetectorRef;
    /** @type {?} */
    CdkDialogContainer.prototype._document;
    /**
     * The dialog configuration.
     * @type {?}
     */
    CdkDialogContainer.prototype._config;
}
//# sourceMappingURL=dialog-container.js.map