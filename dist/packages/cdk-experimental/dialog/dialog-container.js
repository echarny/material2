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
var animations_1 = require("@angular/animations");
var a11y_1 = require("@angular/cdk/a11y");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dialog_config_1 = require("./dialog-config");
function throwDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
exports.throwDialogContentAlreadyAttachedError = throwDialogContentAlreadyAttachedError;
/**
 * Internal component that wraps user-provided dialog content.
 * @docs-private
 */
var CdkDialogContainer = /** @class */ (function (_super) {
    __extends(CdkDialogContainer, _super);
    function CdkDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, /** The dialog configuration. */
    _config) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        _this._config = _config;
        /** State of the dialog animation. */
        _this._state = 'enter';
        /** Element that was focused before the dialog was opened. Save this to restore upon close. */
        _this._elementFocusedBeforeDialogWasOpened = null;
        /** The class that traps and manages focus within the dialog. */
        _this._focusTrap = _this._focusTrapFactory.create(_this._elementRef.nativeElement, false);
        /** A subject emitting before the dialog enters the view. */
        _this._beforeEnter = new rxjs_1.Subject();
        /** A subject emitting after the dialog enters the view. */
        _this._afterEnter = new rxjs_1.Subject();
        /** A subject emitting before the dialog exits the view. */
        _this._beforeExit = new rxjs_1.Subject();
        /** A subject emitting after the dialog exits the view. */
        _this._afterExit = new rxjs_1.Subject();
        return _this;
    }
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaLabel", {
        get: 
        // @HostBinding is used in the class as it is expected to be extended.  Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        // tslint:disable:no-host-decorator-in-concrete
        function () { return this._config.ariaLabel || null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaDescribedBy", {
        get: function () { return this._config.ariaDescribedBy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_role", {
        get: function () { return this._config.role; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_tabindex", {
        get: function () { return -1; },
        enumerable: true,
        configurable: true
    });
    /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    CdkDialogContainer.prototype.ngOnDestroy = /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    function () {
        this._focusTrap.destroy();
    };
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    /**
       * Attach a ComponentPortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
       */
    CdkDialogContainer.prototype.attachComponentPortal = /**
       * Attach a ComponentPortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
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
       * @param portal Portal to be attached as the dialog content.
       */
    CdkDialogContainer.prototype.attachTemplatePortal = /**
       * Attach a TemplatePortal as content to this dialog container.
       * @param portal Portal to be attached as the dialog content.
       */
    function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal);
    };
    /** Emit lifecycle events based on animation `start` callback. */
    /** Emit lifecycle events based on animation `start` callback. */
    CdkDialogContainer.prototype._onAnimationStart = /** Emit lifecycle events based on animation `start` callback. */
    function (event) {
        if (event.toState === 'enter') {
            this._beforeEnter.next();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._beforeExit.next();
        }
    };
    /** Emit lifecycle events based on animation `done` callback. */
    /** Emit lifecycle events based on animation `done` callback. */
    CdkDialogContainer.prototype._onAnimationDone = /** Emit lifecycle events based on animation `done` callback. */
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
    /** Starts the dialog exit animation. */
    CdkDialogContainer.prototype._startExiting = /** Starts the dialog exit animation. */
    function () {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    };
    /** Saves a reference to the element that was focused before the dialog was opened. */
    /** Saves a reference to the element that was focused before the dialog was opened. */
    CdkDialogContainer.prototype._savePreviouslyFocusedElement = /** Saves a reference to the element that was focused before the dialog was opened. */
    function () {
        var _this = this;
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = this._document.activeElement;
            // Move focus onto the dialog immediately in order to prevent the user from accidentally
            // opening multiple dialogs at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     */
    /**
       * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
       * focus the dialog instead.
       */
    CdkDialogContainer.prototype._autoFocusFirstTabbableElement = /**
       * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
       * focus the dialog instead.
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
    /** Returns the focus to the element focused before the dialog was open. */
    /** Returns the focus to the element focused before the dialog was open. */
    CdkDialogContainer.prototype._returnFocusAfterDialog = /** Returns the focus to the element focused before the dialog was open. */
    function () {
        var toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
    };
    CdkDialogContainer.decorators = [
        { type: core_1.Component, args: [{selector: 'cdk-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: ["cdk-dialog-container{background:#fff;border-radius:5px;display:block;padding:10px}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
                    // tslint:disable-next-line:validate-decorators
                    changeDetection: core_1.ChangeDetectionStrategy.Default,
                    animations: [
                        animations_1.trigger('dialog', [
                            animations_1.state('enter', animations_1.style({ opacity: 1 })),
                            animations_1.state('exit, void', animations_1.style({ opacity: 0 })),
                            animations_1.transition('* => *', animations_1.animate(225)),
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
        { type: core_1.ElementRef, },
        { type: a11y_1.FocusTrapFactory, },
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: dialog_config_1.DialogConfig, },
    ]; };
    CdkDialogContainer.propDecorators = {
        "_ariaLabel": [{ type: core_1.HostBinding, args: ['attr.aria-label',] },],
        "_ariaDescribedBy": [{ type: core_1.HostBinding, args: ['attr.aria-describedby',] },],
        "_role": [{ type: core_1.HostBinding, args: ['attr.role',] },],
        "_tabindex": [{ type: core_1.HostBinding, args: ['attr.tabindex',] },],
        "_portalHost": [{ type: core_1.ViewChild, args: [portal_1.PortalHostDirective,] },],
    };
    return CdkDialogContainer;
}(portal_1.BasePortalOutlet));
exports.CdkDialogContainer = CdkDialogContainer;
//# sourceMappingURL=dialog-container.js.map