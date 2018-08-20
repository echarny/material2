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
var portal_1 = require("@angular/cdk/portal");
var layout_1 = require("@angular/cdk/layout");
var bottom_sheet_config_1 = require("./bottom-sheet-config");
var bottom_sheet_animations_1 = require("./bottom-sheet-animations");
var common_1 = require("@angular/common");
var a11y_1 = require("@angular/cdk/a11y");
// TODO(crisbeto): consolidate some logic between this, MatDialog and MatSnackBar
/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
var MatBottomSheetContainer = /** @class */ (function (_super) {
    __extends(MatBottomSheetContainer, _super);
    function MatBottomSheetContainer(_elementRef, _changeDetectorRef, _focusTrapFactory, breakpointObserver, document, /** The bottom sheet configuration. */
    bottomSheetConfig) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this.bottomSheetConfig = bottomSheetConfig;
        /** The state of the bottom sheet animations. */
        _this._animationState = 'void';
        /** Emits whenever the state of the animation changes. */
        _this._animationStateChanged = new core_1.EventEmitter();
        /** Element that was focused before the bottom sheet was opened. */
        _this._elementFocusedBeforeOpened = null;
        _this._document = document;
        _this._breakpointSubscription = breakpointObserver
            .observe([layout_1.Breakpoints.Medium, layout_1.Breakpoints.Large, layout_1.Breakpoints.XLarge])
            .subscribe(function () {
            _this._toggleClass('mat-bottom-sheet-container-medium', breakpointObserver.isMatched(layout_1.Breakpoints.Medium));
            _this._toggleClass('mat-bottom-sheet-container-large', breakpointObserver.isMatched(layout_1.Breakpoints.Large));
            _this._toggleClass('mat-bottom-sheet-container-xlarge', breakpointObserver.isMatched(layout_1.Breakpoints.XLarge));
        });
        return _this;
    }
    /** Attach a component portal as content to this bottom sheet container. */
    /** Attach a component portal as content to this bottom sheet container. */
    MatBottomSheetContainer.prototype.attachComponentPortal = /** Attach a component portal as content to this bottom sheet container. */
    function (portal) {
        this._validatePortalAttached();
        this._setPanelClass();
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this bottom sheet container. */
    /** Attach a template portal as content to this bottom sheet container. */
    MatBottomSheetContainer.prototype.attachTemplatePortal = /** Attach a template portal as content to this bottom sheet container. */
    function (portal) {
        this._validatePortalAttached();
        this._setPanelClass();
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /** Begin animation of bottom sheet entrance into view. */
    /** Begin animation of bottom sheet entrance into view. */
    MatBottomSheetContainer.prototype.enter = /** Begin animation of bottom sheet entrance into view. */
    function () {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the bottom sheet exiting from view. */
    /** Begin animation of the bottom sheet exiting from view. */
    MatBottomSheetContainer.prototype.exit = /** Begin animation of the bottom sheet exiting from view. */
    function () {
        if (!this._destroyed) {
            this._animationState = 'hidden';
            this._changeDetectorRef.markForCheck();
        }
    };
    MatBottomSheetContainer.prototype.ngOnDestroy = function () {
        this._breakpointSubscription.unsubscribe();
        this._destroyed = true;
    };
    MatBottomSheetContainer.prototype._onAnimationDone = function (event) {
        if (event.toState === 'hidden') {
            this._restoreFocus();
        }
        else if (event.toState === 'visible' && this.bottomSheetConfig.autoFocus) {
            this._trapFocus();
        }
        this._animationStateChanged.emit(event);
    };
    MatBottomSheetContainer.prototype._onAnimationStart = function (event) {
        this._animationStateChanged.emit(event);
    };
    MatBottomSheetContainer.prototype._toggleClass = function (cssClass, add) {
        var classList = this._elementRef.nativeElement.classList;
        add ? classList.add(cssClass) : classList.remove(cssClass);
    };
    MatBottomSheetContainer.prototype._validatePortalAttached = function () {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach bottom sheet content after content is already attached');
        }
    };
    MatBottomSheetContainer.prototype._setPanelClass = function () {
        var element = this._elementRef.nativeElement;
        var panelClass = this.bottomSheetConfig.panelClass;
        if (Array.isArray(panelClass)) {
            // Note that we can't use a spread here, because IE doesn't support multiple arguments.
            panelClass.forEach(function (cssClass) { return element.classList.add(cssClass); });
        }
        else if (panelClass) {
            element.classList.add(panelClass);
        }
    };
    /** Moves the focus inside the focus trap. */
    /** Moves the focus inside the focus trap. */
    MatBottomSheetContainer.prototype._trapFocus = /** Moves the focus inside the focus trap. */
    function () {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        this._focusTrap.focusInitialElementWhenReady();
    };
    /** Restores focus to the element that was focused before the bottom sheet opened. */
    /** Restores focus to the element that was focused before the bottom sheet opened. */
    MatBottomSheetContainer.prototype._restoreFocus = /** Restores focus to the element that was focused before the bottom sheet opened. */
    function () {
        var toFocus = this._elementFocusedBeforeOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    /** Saves a reference to the element that was focused before the bottom sheet was opened. */
    /** Saves a reference to the element that was focused before the bottom sheet was opened. */
    MatBottomSheetContainer.prototype._savePreviouslyFocusedElement = /** Saves a reference to the element that was focused before the bottom sheet was opened. */
    function () {
        var _this = this;
        this._elementFocusedBeforeOpened = this._document.activeElement;
        // The `focus` method isn't available during server-side rendering.
        if (this._elementRef.nativeElement.focus) {
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    MatBottomSheetContainer.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-bottom-sheet-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-bottom-sheet-container{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}@media screen and (-ms-high-contrast:active){.mat-bottom-sheet-container{outline:1px solid}}.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium,.mat-bottom-sheet-container-xlarge{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    animations: [bottom_sheet_animations_1.matBottomSheetAnimations.bottomSheetState],
                    host: {
                        'class': 'mat-bottom-sheet-container',
                        'tabindex': '-1',
                        'role': 'dialog',
                        'aria-modal': 'true',
                        '[attr.aria-label]': 'bottomSheetConfig?.ariaLabel',
                        '[@state]': '_animationState',
                        '(@state.start)': '_onAnimationStart($event)',
                        '(@state.done)': '_onAnimationDone($event)'
                    },
                },] },
    ];
    /** @nocollapse */
    MatBottomSheetContainer.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: a11y_1.FocusTrapFactory, },
        { type: layout_1.BreakpointObserver, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: bottom_sheet_config_1.MatBottomSheetConfig, },
    ]; };
    MatBottomSheetContainer.propDecorators = {
        "_portalOutlet": [{ type: core_1.ViewChild, args: [portal_1.CdkPortalOutlet,] },],
    };
    return MatBottomSheetContainer;
}(portal_1.BasePortalOutlet));
exports.MatBottomSheetContainer = MatBottomSheetContainer;
//# sourceMappingURL=bottom-sheet-container.js.map