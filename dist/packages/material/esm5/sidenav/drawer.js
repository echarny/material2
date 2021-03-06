/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FocusMonitor, FocusTrapFactory } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, InjectionToken, Input, NgZone, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, take, takeUntil } from 'rxjs/operators';
import { matDrawerAnimations } from './drawer-animations';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
/**
 * Throws an exception when two MatDrawer are matching the same position.
 * @param {?} position
 * @return {?}
 */
export function throwMatDuplicatedDrawerError(position) {
    throw Error("A drawer was already declared for 'position=\"" + position + "\"'");
}
/**
 * Configures whether drawers should use auto sizing by default.
 */
export var /** @type {?} */ MAT_DRAWER_DEFAULT_AUTOSIZE = new InjectionToken('MAT_DRAWER_DEFAULT_AUTOSIZE', {
    providedIn: 'root',
    factory: MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY,
});
/**
 * \@docs-private
 * @return {?}
 */
export function MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY() {
    return false;
}
var MatDrawerContent = /** @class */ (function (_super) {
    tslib_1.__extends(MatDrawerContent, _super);
    function MatDrawerContent(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
        var _this = _super.call(this, elementRef, scrollDispatcher, ngZone) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._container = _container;
        return _this;
    }
    /**
     * @return {?}
     */
    MatDrawerContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._container._contentMarginChanges.subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
    };
    MatDrawerContent.decorators = [
        { type: Component, args: [{selector: 'mat-drawer-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content',
                        '[style.margin-left.px]': '_container._contentMargins.left',
                        '[style.margin-right.px]': '_container._contentMargins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDrawerContent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: MatDrawerContainer, decorators: [{ type: Inject, args: [forwardRef(function () { return MatDrawerContainer; }),] },] },
        { type: ElementRef, },
        { type: ScrollDispatcher, },
        { type: NgZone, },
    ]; };
    return MatDrawerContent;
}(CdkScrollable));
export { MatDrawerContent };
function MatDrawerContent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatDrawerContent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatDrawerContent.ctorParameters;
    /** @type {?} */
    MatDrawerContent.prototype._changeDetectorRef;
    /** @type {?} */
    MatDrawerContent.prototype._container;
}
/**
 * This component corresponds to a drawer that can be opened on the drawer container.
 */
var MatDrawer = /** @class */ (function () {
    function MatDrawer(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _doc) {
        var _this = this;
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._focusMonitor = _focusMonitor;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._doc = _doc;
        this._elementFocusedBeforeDrawerWasOpened = null;
        /**
         * Whether the drawer is initialized. Used for disabling the initial animation.
         */
        this._enableAnimations = false;
        this._position = 'start';
        this._mode = 'over';
        this._disableClose = false;
        this._autoFocus = true;
        /**
         * Emits whenever the drawer has started animating.
         */
        this._animationStarted = new EventEmitter();
        /**
         * Current state of the sidenav animation.
         */
        this._animationState = 'void';
        /**
         * Event emitted when the drawer open state is changed.
         */
        this.openedChange = 
        // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
        new EventEmitter(/* isAsync */ /* isAsync */ true);
        /**
         * Event emitted when the drawer's position changes.
         */
        this.onPositionChanged = new EventEmitter();
        /**
         * An observable that emits when the drawer mode changes. This is used by the drawer container to
         * to know when to when the mode changes so it can adapt the margins on the content.
         */
        this._modeChanged = new Subject();
        this._opened = false;
        this.openedChange.subscribe(function (opened) {
            if (opened) {
                if (_this._doc) {
                    _this._elementFocusedBeforeDrawerWasOpened = /** @type {?} */ (_this._doc.activeElement);
                }
                if (_this._isFocusTrapEnabled && _this._focusTrap) {
                    _this._trapFocus();
                }
            }
            else {
                _this._restoreFocus();
            }
        });
        /**
             * Listen to `keydown` events outside the zone so that change detection is not run every
             * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
             * and we don't have close disabled.
             */
        this._ngZone.runOutsideAngular(function () {
            fromEvent(_this._elementRef.nativeElement, 'keydown').pipe(filter(function (event) { return event.keyCode === ESCAPE && !_this.disableClose; })).subscribe(function (event) {
                return _this._ngZone.run(function () {
                    _this.close();
                    event.stopPropagation();
                });
            });
        });
    }
    Object.defineProperty(MatDrawer.prototype, "position", {
        get: /**
         * The side that the drawer is attached to.
         * @return {?}
         */
        function () { return this._position; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // Make sure we have a valid value.
            value = value === 'end' ? 'end' : 'start';
            if (value != this._position) {
                this._position = value;
                this.onPositionChanged.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "mode", {
        get: /**
         * Mode of the drawer; one of 'over', 'push' or 'side'.
         * @return {?}
         */
        function () { return this._mode; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mode = value;
            this._modeChanged.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "disableClose", {
        get: /**
         * Whether the drawer can be closed with the escape key or by clicking on the backdrop.
         * @return {?}
         */
        function () { return this._disableClose; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disableClose = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "autoFocus", {
        get: /**
         * Whether the drawer should focus the first focusable element automatically when opened.
         * @return {?}
         */
        function () { return this._autoFocus; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._autoFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_openedStream", {
        get: /**
         * Event emitted when the drawer has been opened.
         * @return {?}
         */
        function () {
            return this.openedChange.pipe(filter(function (o) { return o; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "openedStart", {
        get: /**
         * Event emitted when the drawer has started opening.
         * @return {?}
         */
        function () {
            return this._animationStarted.pipe(filter(function (e) { return e.fromState !== e.toState && e.toState.indexOf('open') === 0; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_closedStream", {
        get: /**
         * Event emitted when the drawer has been closed.
         * @return {?}
         */
        function () {
            return this.openedChange.pipe(filter(function (o) { return !o; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "closedStart", {
        get: /**
         * Event emitted when the drawer has started closing.
         * @return {?}
         */
        function () {
            return this._animationStarted.pipe(filter(function (e) { return e.fromState !== e.toState && e.toState === 'void'; }), map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_isFocusTrapEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            // The focus trap is only enabled when the drawer is open in any mode other than side.
            return this.opened && this.mode !== 'side';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Traps focus inside the drawer.
     * @return {?}
     */
    MatDrawer.prototype._trapFocus = /**
     * Traps focus inside the drawer.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.autoFocus) {
            return;
        }
        this._focusTrap.focusInitialElementWhenReady().then(function (hasMovedFocus) {
            // If there were no focusable elements, focus the sidenav itself so the keyboard navigation
            // still works. We need to check that `focus` is a function due to Universal.
            if (!hasMovedFocus && typeof _this._elementRef.nativeElement.focus === 'function') {
                _this._elementRef.nativeElement.focus();
            }
        });
    };
    /**
     * If focus is currently inside the drawer, restores it to where it was before the drawer
     * opened.
     * @return {?}
     */
    MatDrawer.prototype._restoreFocus = /**
     * If focus is currently inside the drawer, restores it to where it was before the drawer
     * opened.
     * @return {?}
     */
    function () {
        if (!this.autoFocus) {
            return;
        }
        var /** @type {?} */ activeEl = this._doc && this._doc.activeElement;
        if (activeEl && this._elementRef.nativeElement.contains(activeEl)) {
            if (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement) {
                this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia);
            }
            else {
                this._elementRef.nativeElement.blur();
            }
        }
        this._elementFocusedBeforeDrawerWasOpened = null;
        this._openedVia = null;
    };
    /**
     * @return {?}
     */
    MatDrawer.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._focusTrap.enabled = this._isFocusTrapEnabled;
    };
    /**
     * @return {?}
     */
    MatDrawer.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        // Enable the animations after the lifecycle hooks have run, in order to avoid animating
        // drawers that are open by default. When we're on the server, we shouldn't enable the
        // animations, because we don't want the drawer to animate the first time the user sees
        // the page.
        if (this._platform.isBrowser) {
            this._enableAnimations = true;
        }
    };
    /**
     * @return {?}
     */
    MatDrawer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    Object.defineProperty(MatDrawer.prototype, "opened", {
        get: /**
         * Whether the drawer is opened. We overload this because we trigger an event when it
         * starts or end.
         * @return {?}
         */
        function () { return this._opened; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.toggle(coerceBooleanProperty(value)); },
        enumerable: true,
        configurable: true
    });
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    /**
     * Open the drawer.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    MatDrawer.prototype.open = /**
     * Open the drawer.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    function (openedVia) {
        return this.toggle(true, openedVia);
    };
    /** Close the drawer. */
    /**
     * Close the drawer.
     * @return {?}
     */
    MatDrawer.prototype.close = /**
     * Close the drawer.
     * @return {?}
     */
    function () {
        return this.toggle(false);
    };
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    /**
     * Toggle this drawer.
     * @param {?=} isOpen Whether the drawer should be open.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    MatDrawer.prototype.toggle = /**
     * Toggle this drawer.
     * @param {?=} isOpen Whether the drawer should be open.
     * @param {?=} openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     * @return {?}
     */
    function (isOpen, openedVia) {
        var _this = this;
        if (isOpen === void 0) { isOpen = !this.opened; }
        if (openedVia === void 0) { openedVia = 'program'; }
        this._opened = isOpen;
        if (isOpen) {
            this._animationState = this._enableAnimations ? 'open' : 'open-instant';
            this._openedVia = openedVia;
        }
        else {
            this._animationState = 'void';
            this._restoreFocus();
        }
        if (this._focusTrap) {
            this._focusTrap.enabled = this._isFocusTrapEnabled;
        }
        return new Promise(function (resolve) {
            _this.openedChange.pipe(take(1)).subscribe(function (open) { return resolve(open ? 'open' : 'close'); });
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDrawer.prototype._onAnimationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._animationStarted.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDrawer.prototype._onAnimationEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var fromState = event.fromState, toState = event.toState;
        if ((toState.indexOf('open') === 0 && fromState === 'void') ||
            (toState === 'void' && fromState.indexOf('open') === 0)) {
            this.openedChange.emit(this._opened);
        }
    };
    Object.defineProperty(MatDrawer.prototype, "_width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._elementRef.nativeElement ? (this._elementRef.nativeElement.offsetWidth || 0) : 0;
        },
        enumerable: true,
        configurable: true
    });
    MatDrawer.decorators = [
        { type: Component, args: [{selector: 'mat-drawer',
                    exportAs: 'matDrawer',
                    template: '<ng-content></ng-content>',
                    animations: [matDrawerAnimations.transformDrawer],
                    host: {
                        'class': 'mat-drawer',
                        '[@transform]': '_animationState',
                        '(@transform.start)': '_onAnimationStart($event)',
                        '(@transform.done)': '_onAnimationEnd($event)',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        'tabIndex': '-1',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDrawer.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusTrapFactory, },
        { type: FocusMonitor, },
        { type: Platform, },
        { type: NgZone, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    ]; };
    MatDrawer.propDecorators = {
        "position": [{ type: Input },],
        "mode": [{ type: Input },],
        "disableClose": [{ type: Input },],
        "autoFocus": [{ type: Input },],
        "openedChange": [{ type: Output },],
        "_openedStream": [{ type: Output, args: ['opened',] },],
        "openedStart": [{ type: Output },],
        "_closedStream": [{ type: Output, args: ['closed',] },],
        "closedStart": [{ type: Output },],
        "onPositionChanged": [{ type: Output, args: ['positionChanged',] },],
        "opened": [{ type: Input },],
    };
    return MatDrawer;
}());
export { MatDrawer };
function MatDrawer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatDrawer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatDrawer.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatDrawer.propDecorators;
    /** @type {?} */
    MatDrawer.prototype._focusTrap;
    /** @type {?} */
    MatDrawer.prototype._elementFocusedBeforeDrawerWasOpened;
    /**
     * Whether the drawer is initialized. Used for disabling the initial animation.
     * @type {?}
     */
    MatDrawer.prototype._enableAnimations;
    /** @type {?} */
    MatDrawer.prototype._position;
    /** @type {?} */
    MatDrawer.prototype._mode;
    /** @type {?} */
    MatDrawer.prototype._disableClose;
    /** @type {?} */
    MatDrawer.prototype._autoFocus;
    /**
     * How the sidenav was opened (keypress, mouse click etc.)
     * @type {?}
     */
    MatDrawer.prototype._openedVia;
    /**
     * Emits whenever the drawer has started animating.
     * @type {?}
     */
    MatDrawer.prototype._animationStarted;
    /**
     * Current state of the sidenav animation.
     * @type {?}
     */
    MatDrawer.prototype._animationState;
    /**
     * Event emitted when the drawer open state is changed.
     * @type {?}
     */
    MatDrawer.prototype.openedChange;
    /**
     * Event emitted when the drawer's position changes.
     * @type {?}
     */
    MatDrawer.prototype.onPositionChanged;
    /**
     * An observable that emits when the drawer mode changes. This is used by the drawer container to
     * to know when to when the mode changes so it can adapt the margins on the content.
     * @type {?}
     */
    MatDrawer.prototype._modeChanged;
    /** @type {?} */
    MatDrawer.prototype._opened;
    /** @type {?} */
    MatDrawer.prototype._elementRef;
    /** @type {?} */
    MatDrawer.prototype._focusTrapFactory;
    /** @type {?} */
    MatDrawer.prototype._focusMonitor;
    /** @type {?} */
    MatDrawer.prototype._platform;
    /** @type {?} */
    MatDrawer.prototype._ngZone;
    /** @type {?} */
    MatDrawer.prototype._doc;
}
/**
 * `<mat-drawer-container>` component.
 *
 * This is the parent component to one or two `<mat-drawer>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
var MatDrawerContainer = /** @class */ (function () {
    function MatDrawerContainer(_dir, _element, _ngZone, _changeDetectorRef, defaultAutosize, _animationMode) {
        if (defaultAutosize === void 0) { defaultAutosize = false; }
        var _this = this;
        this._dir = _dir;
        this._element = _element;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._animationMode = _animationMode;
        /**
         * Event emitted when the drawer backdrop is clicked.
         */
        this.backdropClick = new EventEmitter();
        /**
         * Emits when the component is destroyed.
         */
        this._destroyed = new Subject();
        /**
         * Emits on every ngDoCheck. Used for debouncing reflows.
         */
        this._doCheckSubject = new Subject();
        /**
         * Margins to be applied to the content. These are used to push / shrink the drawer content when a
         * drawer is open. We use margin rather than transform even for push mode because transform breaks
         * fixed position elements inside of the transformed element.
         */
        this._contentMargins = { left: null, right: null };
        this._contentMarginChanges = new Subject();
        // If a `Dir` directive exists up the tree, listen direction changes
        // and update the left/right properties to point to the proper start/end.
        if (_dir) {
            _dir.change.pipe(takeUntil(this._destroyed)).subscribe(function () {
                _this._validateDrawers();
                _this._updateContentMargins();
            });
        }
        this._autosize = defaultAutosize;
    }
    Object.defineProperty(MatDrawerContainer.prototype, "start", {
        /** The drawer child with the `start` position. */
        get: /**
         * The drawer child with the `start` position.
         * @return {?}
         */
        function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "end", {
        /** The drawer child with the `end` position. */
        get: /**
         * The drawer child with the `end` position.
         * @return {?}
         */
        function () { return this._end; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "autosize", {
        get: /**
         * Whether to automatically resize the container whenever
         * the size of any of its drawers changes.
         *
         * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
         * the drawers on every change detection cycle. Can be configured globally via the
         * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
         * @return {?}
         */
        function () { return this._autosize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._autosize = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "hasBackdrop", {
        get: /**
         * Whether the drawer container should have a backdrop while one of the sidenavs is open.
         * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
         * mode as well.
         * @return {?}
         */
        function () {
            if (this._backdropOverride == null) {
                return !this._start || this._start.mode !== 'side' || !this._end || this._end.mode !== 'side';
            }
            return this._backdropOverride;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._backdropOverride = value == null ? null : coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "scrollable", {
        /** Reference to the CdkScrollable instance that wraps the scrollable content. */
        get: /**
         * Reference to the CdkScrollable instance that wraps the scrollable content.
         * @return {?}
         */
        function () {
            return this._userContent || this._content;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._drawers.changes.pipe(startWith(null)).subscribe(function () {
            _this._validateDrawers();
            _this._drawers.forEach(function (drawer) {
                _this._watchDrawerToggle(drawer);
                _this._watchDrawerPosition(drawer);
                _this._watchDrawerMode(drawer);
            });
            if (!_this._drawers.length ||
                _this._isDrawerOpen(_this._start) ||
                _this._isDrawerOpen(_this._end)) {
                _this._updateContentMargins();
            }
            _this._changeDetectorRef.markForCheck();
        });
        this._doCheckSubject.pipe(debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
        // Arbitrary debounce time, less than a frame at 60fps
        takeUntil(this._destroyed)).subscribe(function () { return _this._updateContentMargins(); });
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._doCheckSubject.complete();
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Calls `open` of both start and end drawers */
    /**
     * Calls `open` of both start and end drawers
     * @return {?}
     */
    MatDrawerContainer.prototype.open = /**
     * Calls `open` of both start and end drawers
     * @return {?}
     */
    function () {
        this._drawers.forEach(function (drawer) { return drawer.open(); });
    };
    /** Calls `close` of both start and end drawers */
    /**
     * Calls `close` of both start and end drawers
     * @return {?}
     */
    MatDrawerContainer.prototype.close = /**
     * Calls `close` of both start and end drawers
     * @return {?}
     */
    function () {
        this._drawers.forEach(function (drawer) { return drawer.close(); });
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // If users opted into autosizing, do a check every change detection cycle.
        if (this._autosize && this._isPushed()) {
            // Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
            this._ngZone.runOutsideAngular(function () { return _this._doCheckSubject.next(); });
        }
    };
    /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._watchDrawerToggle = /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        var _this = this;
        drawer._animationStarted.pipe(takeUntil(this._drawers.changes), filter(function (event) { return event.fromState !== event.toState; }))
            .subscribe(function (event) {
            // Set the transition class on the container so that the animations occur. This should not
            // be set initially because animations should only be triggered via a change in state.
            if (event.toState !== 'open-instant' && _this._animationMode !== 'NoopAnimations') {
                _this._element.nativeElement.classList.add('mat-drawer-transition');
            }
            _this._updateContentMargins();
            _this._changeDetectorRef.markForCheck();
        });
        if (drawer.mode !== 'side') {
            drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(function () {
                return _this._setContainerClass(drawer.opened);
            });
        }
    };
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._watchDrawerPosition = /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        var _this = this;
        if (!drawer) {
            return;
        }
        // NOTE: We need to wait for the microtask queue to be empty before validating,
        // since both drawers may be swapping positions at the same time.
        drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(function () {
            _this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(function () {
                _this._validateDrawers();
            });
        });
    };
    /**
     * Subscribes to changes in drawer mode so we can run change detection.
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._watchDrawerMode = /**
     * Subscribes to changes in drawer mode so we can run change detection.
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        var _this = this;
        if (drawer) {
            drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed)))
                .subscribe(function () {
                _this._updateContentMargins();
                _this._changeDetectorRef.markForCheck();
            });
        }
    };
    /**
     * Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element.
     * @param {?} isAdd
     * @return {?}
     */
    MatDrawerContainer.prototype._setContainerClass = /**
     * Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element.
     * @param {?} isAdd
     * @return {?}
     */
    function (isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add('mat-drawer-opened');
        }
        else {
            this._element.nativeElement.classList.remove('mat-drawer-opened');
        }
    };
    /**
     * Validate the state of the drawer children components.
     * @return {?}
     */
    MatDrawerContainer.prototype._validateDrawers = /**
     * Validate the state of the drawer children components.
     * @return {?}
     */
    function () {
        var _this = this;
        this._start = this._end = null;
        // Ensure that we have at most one start and one end drawer.
        this._drawers.forEach(function (drawer) {
            if (drawer.position == 'end') {
                if (_this._end != null) {
                    throwMatDuplicatedDrawerError('end');
                }
                _this._end = drawer;
            }
            else {
                if (_this._start != null) {
                    throwMatDuplicatedDrawerError('start');
                }
                _this._start = drawer;
            }
        });
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (this._dir && this._dir.value === 'rtl') {
            this._left = this._end;
            this._right = this._start;
        }
        else {
            this._left = this._start;
            this._right = this._end;
        }
    };
    /**
     * Whether the container is being pushed to the side by one of the drawers.
     * @return {?}
     */
    MatDrawerContainer.prototype._isPushed = /**
     * Whether the container is being pushed to the side by one of the drawers.
     * @return {?}
     */
    function () {
        return (this._isDrawerOpen(this._start) && this._start.mode != 'over') ||
            (this._isDrawerOpen(this._end) && this._end.mode != 'over');
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype._onBackdropClicked = /**
     * @return {?}
     */
    function () {
        this.backdropClick.emit();
        this._closeModalDrawer();
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype._closeModalDrawer = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Close all open drawers where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter(function (drawer) { return drawer && !drawer.disableClose && _this._canHaveBackdrop(drawer); })
            .forEach(function (drawer) { return ((drawer)).close(); });
    };
    /**
     * @return {?}
     */
    MatDrawerContainer.prototype._isShowingBackdrop = /**
     * @return {?}
     */
    function () {
        return (this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
            (this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end));
    };
    /**
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._canHaveBackdrop = /**
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        return drawer.mode !== 'side' || !!this._backdropOverride;
    };
    /**
     * @param {?} drawer
     * @return {?}
     */
    MatDrawerContainer.prototype._isDrawerOpen = /**
     * @param {?} drawer
     * @return {?}
     */
    function (drawer) {
        return drawer != null && drawer.opened;
    };
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     * @return {?}
     */
    MatDrawerContainer.prototype._updateContentMargins = /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     * @return {?}
     */
    function () {
        var _this = this;
        // 1. For drawers in `over` mode, they don't affect the content.
        // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
        //    left margin (for left drawer) or right margin (for right the drawer).
        // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
        //    adding to the left or right margin and simultaneously subtracting the same amount of
        //    margin from the other side.
        var /** @type {?} */ left = 0;
        var /** @type {?} */ right = 0;
        if (this._left && this._left.opened) {
            if (this._left.mode == 'side') {
                left += this._left._width;
            }
            else if (this._left.mode == 'push') {
                var /** @type {?} */ width = this._left._width;
                left += width;
                right -= width;
            }
        }
        if (this._right && this._right.opened) {
            if (this._right.mode == 'side') {
                right += this._right._width;
            }
            else if (this._right.mode == 'push') {
                var /** @type {?} */ width = this._right._width;
                right += width;
                left -= width;
            }
        }
        // If either `right` or `left` is zero, don't set a style to the element. This
        // allows users to specify a custom size via CSS class in SSR scenarios where the
        // measured widths will always be zero. Note that we reset to `null` here, rather
        // than below, in order to ensure that the types in the `if` below are consistent.
        left = left || /** @type {?} */ ((null));
        right = right || /** @type {?} */ ((null));
        if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
            this._contentMargins = { left: left, right: right };
            // Pull back into the NgZone since in some cases we could be outside. We need to be careful
            // to do it only when something changed, otherwise we can end up hitting the zone too often.
            this._ngZone.run(function () { return _this._contentMarginChanges.next(_this._contentMargins); });
        }
    };
    MatDrawerContainer.decorators = [
        { type: Component, args: [{selector: 'mat-drawer-container',
                    exportAs: 'matDrawerContainer',
                    template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\" [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div><ng-content select=\"mat-drawer\"></ng-content><ng-content select=\"mat-drawer-content\"></ng-content><mat-drawer-content *ngIf=\"!_content\"><ng-content></ng-content></mat-drawer-content>",
                    styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media screen and (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media screen and (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer:not(.mat-drawer-side){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-sidenav-fixed{position:fixed}"],
                    host: {
                        'class': 'mat-drawer-container',
                        '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDrawerContainer.ctorParameters = function () { return [
        { type: Directionality, decorators: [{ type: Optional },] },
        { type: ElementRef, },
        { type: NgZone, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DRAWER_DEFAULT_AUTOSIZE,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] },] },
    ]; };
    MatDrawerContainer.propDecorators = {
        "_drawers": [{ type: ContentChildren, args: [MatDrawer,] },],
        "_content": [{ type: ContentChild, args: [MatDrawerContent,] },],
        "_userContent": [{ type: ViewChild, args: [MatDrawerContent,] },],
        "autosize": [{ type: Input },],
        "hasBackdrop": [{ type: Input },],
        "backdropClick": [{ type: Output },],
    };
    return MatDrawerContainer;
}());
export { MatDrawerContainer };
function MatDrawerContainer_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatDrawerContainer.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatDrawerContainer.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatDrawerContainer.propDecorators;
    /** @type {?} */
    MatDrawerContainer.prototype._drawers;
    /** @type {?} */
    MatDrawerContainer.prototype._content;
    /** @type {?} */
    MatDrawerContainer.prototype._userContent;
    /** @type {?} */
    MatDrawerContainer.prototype._autosize;
    /** @type {?} */
    MatDrawerContainer.prototype._backdropOverride;
    /**
     * Event emitted when the drawer backdrop is clicked.
     * @type {?}
     */
    MatDrawerContainer.prototype.backdropClick;
    /**
     * The drawer at the start/end position, independent of direction.
     * @type {?}
     */
    MatDrawerContainer.prototype._start;
    /** @type {?} */
    MatDrawerContainer.prototype._end;
    /**
     * The drawer at the left/right. When direction changes, these will change as well.
     * They're used as aliases for the above to set the left/right style properly.
     * In LTR, _left == _start and _right == _end.
     * In RTL, _left == _end and _right == _start.
     * @type {?}
     */
    MatDrawerContainer.prototype._left;
    /** @type {?} */
    MatDrawerContainer.prototype._right;
    /**
     * Emits when the component is destroyed.
     * @type {?}
     */
    MatDrawerContainer.prototype._destroyed;
    /**
     * Emits on every ngDoCheck. Used for debouncing reflows.
     * @type {?}
     */
    MatDrawerContainer.prototype._doCheckSubject;
    /**
     * Margins to be applied to the content. These are used to push / shrink the drawer content when a
     * drawer is open. We use margin rather than transform even for push mode because transform breaks
     * fixed position elements inside of the transformed element.
     * @type {?}
     */
    MatDrawerContainer.prototype._contentMargins;
    /** @type {?} */
    MatDrawerContainer.prototype._contentMarginChanges;
    /** @type {?} */
    MatDrawerContainer.prototype._dir;
    /** @type {?} */
    MatDrawerContainer.prototype._element;
    /** @type {?} */
    MatDrawerContainer.prototype._ngZone;
    /** @type {?} */
    MatDrawerContainer.prototype._changeDetectorRef;
    /** @type {?} */
    MatDrawerContainer.prototype._animationMode;
}
//# sourceMappingURL=drawer.js.map