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
import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, EventEmitter, Inject, Optional, } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, } from '@angular/cdk/portal';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheetConfig } from './bottom-sheet-config';
import { matBottomSheetAnimations } from './bottom-sheet-animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrapFactory } from '@angular/cdk/a11y';
/**
 * Internal component that wraps user-provided bottom sheet content.
 * \@docs-private
 */
var MatBottomSheetContainer = /** @class */ (function (_super) {
    tslib_1.__extends(MatBottomSheetContainer, _super);
    function MatBottomSheetContainer(_elementRef, _changeDetectorRef, _focusTrapFactory, breakpointObserver, document, bottomSheetConfig) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this.bottomSheetConfig = bottomSheetConfig;
        /**
         * The state of the bottom sheet animations.
         */
        _this._animationState = 'void';
        /**
         * Emits whenever the state of the animation changes.
         */
        _this._animationStateChanged = new EventEmitter();
        /**
         * Element that was focused before the bottom sheet was opened.
         */
        _this._elementFocusedBeforeOpened = null;
        _this._document = document;
        _this._breakpointSubscription = breakpointObserver
            .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
            .subscribe(function () {
            _this._toggleClass('mat-bottom-sheet-container-medium', breakpointObserver.isMatched(Breakpoints.Medium));
            _this._toggleClass('mat-bottom-sheet-container-large', breakpointObserver.isMatched(Breakpoints.Large));
            _this._toggleClass('mat-bottom-sheet-container-xlarge', breakpointObserver.isMatched(Breakpoints.XLarge));
        });
        return _this;
    }
    /** Attach a component portal as content to this bottom sheet container. */
    /**
     * Attach a component portal as content to this bottom sheet container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    MatBottomSheetContainer.prototype.attachComponentPortal = /**
     * Attach a component portal as content to this bottom sheet container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this._validatePortalAttached();
        this._setPanelClass();
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachComponentPortal(portal);
    };
    /** Attach a template portal as content to this bottom sheet container. */
    /**
     * Attach a template portal as content to this bottom sheet container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    MatBottomSheetContainer.prototype.attachTemplatePortal = /**
     * Attach a template portal as content to this bottom sheet container.
     * @template C
     * @param {?} portal
     * @return {?}
     */
    function (portal) {
        this._validatePortalAttached();
        this._setPanelClass();
        this._savePreviouslyFocusedElement();
        return this._portalOutlet.attachTemplatePortal(portal);
    };
    /** Begin animation of bottom sheet entrance into view. */
    /**
     * Begin animation of bottom sheet entrance into view.
     * @return {?}
     */
    MatBottomSheetContainer.prototype.enter = /**
     * Begin animation of bottom sheet entrance into view.
     * @return {?}
     */
    function () {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._changeDetectorRef.detectChanges();
        }
    };
    /** Begin animation of the bottom sheet exiting from view. */
    /**
     * Begin animation of the bottom sheet exiting from view.
     * @return {?}
     */
    MatBottomSheetContainer.prototype.exit = /**
     * Begin animation of the bottom sheet exiting from view.
     * @return {?}
     */
    function () {
        if (!this._destroyed) {
            this._animationState = 'hidden';
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * @return {?}
     */
    MatBottomSheetContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._breakpointSubscription.unsubscribe();
        this._destroyed = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatBottomSheetContainer.prototype._onAnimationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'hidden') {
            this._restoreFocus();
        }
        else if (event.toState === 'visible' && this.bottomSheetConfig.autoFocus) {
            this._trapFocus();
        }
        this._animationStateChanged.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatBottomSheetContainer.prototype._onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._animationStateChanged.emit(event);
    };
    /**
     * @param {?} cssClass
     * @param {?} add
     * @return {?}
     */
    MatBottomSheetContainer.prototype._toggleClass = /**
     * @param {?} cssClass
     * @param {?} add
     * @return {?}
     */
    function (cssClass, add) {
        var /** @type {?} */ classList = this._elementRef.nativeElement.classList;
        add ? classList.add(cssClass) : classList.remove(cssClass);
    };
    /**
     * @return {?}
     */
    MatBottomSheetContainer.prototype._validatePortalAttached = /**
     * @return {?}
     */
    function () {
        if (this._portalOutlet.hasAttached()) {
            throw Error('Attempting to attach bottom sheet content after content is already attached');
        }
    };
    /**
     * @return {?}
     */
    MatBottomSheetContainer.prototype._setPanelClass = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ element = this._elementRef.nativeElement;
        var /** @type {?} */ panelClass = this.bottomSheetConfig.panelClass;
        if (Array.isArray(panelClass)) {
            // Note that we can't use a spread here, because IE doesn't support multiple arguments.
            panelClass.forEach(function (cssClass) { return element.classList.add(cssClass); });
        }
        else if (panelClass) {
            element.classList.add(panelClass);
        }
    };
    /**
     * Moves the focus inside the focus trap.
     * @return {?}
     */
    MatBottomSheetContainer.prototype._trapFocus = /**
     * Moves the focus inside the focus trap.
     * @return {?}
     */
    function () {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        this._focusTrap.focusInitialElementWhenReady();
    };
    /**
     * Restores focus to the element that was focused before the bottom sheet opened.
     * @return {?}
     */
    MatBottomSheetContainer.prototype._restoreFocus = /**
     * Restores focus to the element that was focused before the bottom sheet opened.
     * @return {?}
     */
    function () {
        var /** @type {?} */ toFocus = this._elementFocusedBeforeOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    /**
     * Saves a reference to the element that was focused before the bottom sheet was opened.
     * @return {?}
     */
    MatBottomSheetContainer.prototype._savePreviouslyFocusedElement = /**
     * Saves a reference to the element that was focused before the bottom sheet was opened.
     * @return {?}
     */
    function () {
        var _this = this;
        this._elementFocusedBeforeOpened = /** @type {?} */ (this._document.activeElement);
        // The `focus` method isn't available during server-side rendering.
        if (this._elementRef.nativeElement.focus) {
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    MatBottomSheetContainer.decorators = [
        { type: Component, args: [{selector: 'mat-bottom-sheet-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>",
                    styles: [".mat-bottom-sheet-container{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12);padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}@media screen and (-ms-high-contrast:active){.mat-bottom-sheet-container{outline:1px solid}}.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium,.mat-bottom-sheet-container-xlarge{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [matBottomSheetAnimations.bottomSheetState],
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
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: FocusTrapFactory, },
        { type: BreakpointObserver, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
        { type: MatBottomSheetConfig, },
    ]; };
    MatBottomSheetContainer.propDecorators = {
        "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
    };
    return MatBottomSheetContainer;
}(BasePortalOutlet));
export { MatBottomSheetContainer };
function MatBottomSheetContainer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatBottomSheetContainer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatBottomSheetContainer.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatBottomSheetContainer.propDecorators;
    /** @type {?} */
    MatBottomSheetContainer.prototype._breakpointSubscription;
    /**
     * The portal outlet inside of this container into which the content will be loaded.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._portalOutlet;
    /**
     * The state of the bottom sheet animations.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._animationState;
    /**
     * Emits whenever the state of the animation changes.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._animationStateChanged;
    /**
     * The class that traps and manages focus within the bottom sheet.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._focusTrap;
    /**
     * Element that was focused before the bottom sheet was opened.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._elementFocusedBeforeOpened;
    /**
     * Server-side rendering-compatible reference to the global document object.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._document;
    /**
     * Whether the component has been destroyed.
     * @type {?}
     */
    MatBottomSheetContainer.prototype._destroyed;
    /** @type {?} */
    MatBottomSheetContainer.prototype._elementRef;
    /** @type {?} */
    MatBottomSheetContainer.prototype._changeDetectorRef;
    /** @type {?} */
    MatBottomSheetContainer.prototype._focusTrapFactory;
    /**
     * The bottom sheet configuration.
     * @type {?}
     */
    MatBottomSheetContainer.prototype.bottomSheetConfig;
}
//# sourceMappingURL=bottom-sheet-container.js.map