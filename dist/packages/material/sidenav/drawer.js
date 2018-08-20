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
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var platform_1 = require("@angular/cdk/platform");
var scrolling_1 = require("@angular/cdk/scrolling");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var drawer_animations_1 = require("./drawer-animations");
var animations_1 = require("@angular/platform-browser/animations");
/** Throws an exception when two MatDrawer are matching the same position. */
function throwMatDuplicatedDrawerError(position) {
    throw Error("A drawer was already declared for 'position=\"" + position + "\"'");
}
exports.throwMatDuplicatedDrawerError = throwMatDuplicatedDrawerError;
/** Configures whether drawers should use auto sizing by default. */
exports.MAT_DRAWER_DEFAULT_AUTOSIZE = new core_1.InjectionToken('MAT_DRAWER_DEFAULT_AUTOSIZE', {
    providedIn: 'root',
    factory: MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY,
});
/** @docs-private */
function MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY() {
    return false;
}
exports.MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY = MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY;
var MatDrawerContent = /** @class */ (function (_super) {
    __extends(MatDrawerContent, _super);
    function MatDrawerContent(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
        var _this = _super.call(this, elementRef, scrollDispatcher, ngZone) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._container = _container;
        return _this;
    }
    MatDrawerContent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._container._contentMarginChanges.subscribe(function () {
            _this._changeDetectorRef.markForCheck();
        });
    };
    MatDrawerContent.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-drawer-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content',
                        '[style.margin-left.px]': '_container._contentMargins.left',
                        '[style.margin-right.px]': '_container._contentMargins.right',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDrawerContent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: MatDrawerContainer, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return MatDrawerContainer; }),] },] },
        { type: core_1.ElementRef, },
        { type: scrolling_1.ScrollDispatcher, },
        { type: core_1.NgZone, },
    ]; };
    return MatDrawerContent;
}(scrolling_1.CdkScrollable));
exports.MatDrawerContent = MatDrawerContent;
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
        /** Whether the drawer is initialized. Used for disabling the initial animation. */
        this._enableAnimations = false;
        this._position = 'start';
        this._mode = 'over';
        this._disableClose = false;
        this._autoFocus = true;
        /** Emits whenever the drawer has started animating. */
        this._animationStarted = new core_1.EventEmitter();
        /** Current state of the sidenav animation. */
        this._animationState = 'void';
        /** Event emitted when the drawer open state is changed. */
        this.openedChange = 
        // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
        new core_1.EventEmitter(/* isAsync */ /* isAsync */ true);
        /** Event emitted when the drawer's position changes. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onPositionChanged = new core_1.EventEmitter();
        /**
           * An observable that emits when the drawer mode changes. This is used by the drawer container to
           * to know when to when the mode changes so it can adapt the margins on the content.
           */
        this._modeChanged = new rxjs_1.Subject();
        this._opened = false;
        this.openedChange.subscribe(function (opened) {
            if (opened) {
                if (_this._doc) {
                    _this._elementFocusedBeforeDrawerWasOpened = _this._doc.activeElement;
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
            rxjs_1.fromEvent(_this._elementRef.nativeElement, 'keydown').pipe(operators_1.filter(function (event) { return event.keyCode === keycodes_1.ESCAPE && !_this.disableClose; })).subscribe(function (event) {
                return _this._ngZone.run(function () {
                    _this.close();
                    event.stopPropagation();
                });
            });
        });
    }
    Object.defineProperty(MatDrawer.prototype, "position", {
        get: /** The side that the drawer is attached to. */
        function () { return this._position; },
        set: function (value) {
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
        get: /** Mode of the drawer; one of 'over', 'push' or 'side'. */
        function () { return this._mode; },
        set: function (value) {
            this._mode = value;
            this._modeChanged.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "disableClose", {
        get: /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
        function () { return this._disableClose; },
        set: function (value) { this._disableClose = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "autoFocus", {
        get: /** Whether the drawer should focus the first focusable element automatically when opened. */
        function () { return this._autoFocus; },
        set: function (value) { this._autoFocus = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_openedStream", {
        get: /** Event emitted when the drawer has been opened. */
        function () {
            return this.openedChange.pipe(operators_1.filter(function (o) { return o; }), operators_1.map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "openedStart", {
        get: /** Event emitted when the drawer has started opening. */
        function () {
            return this._animationStarted.pipe(operators_1.filter(function (e) { return e.fromState !== e.toState && e.toState.indexOf('open') === 0; }), operators_1.map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_closedStream", {
        get: /** Event emitted when the drawer has been closed. */
        function () {
            return this.openedChange.pipe(operators_1.filter(function (o) { return !o; }), operators_1.map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "closedStart", {
        get: /** Event emitted when the drawer has started closing. */
        function () {
            return this._animationStarted.pipe(operators_1.filter(function (e) { return e.fromState !== e.toState && e.toState === 'void'; }), operators_1.map(function () { }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawer.prototype, "_isFocusTrapEnabled", {
        get: function () {
            // The focus trap is only enabled when the drawer is open in any mode other than side.
            return this.opened && this.mode !== 'side';
        },
        enumerable: true,
        configurable: true
    });
    /** Traps focus inside the drawer. */
    /** Traps focus inside the drawer. */
    MatDrawer.prototype._trapFocus = /** Traps focus inside the drawer. */
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
     */
    /**
       * If focus is currently inside the drawer, restores it to where it was before the drawer
       * opened.
       */
    MatDrawer.prototype._restoreFocus = /**
       * If focus is currently inside the drawer, restores it to where it was before the drawer
       * opened.
       */
    function () {
        if (!this.autoFocus) {
            return;
        }
        var activeEl = this._doc && this._doc.activeElement;
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
    MatDrawer.prototype.ngAfterContentInit = function () {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._focusTrap.enabled = this._isFocusTrapEnabled;
    };
    MatDrawer.prototype.ngAfterContentChecked = function () {
        // Enable the animations after the lifecycle hooks have run, in order to avoid animating
        // drawers that are open by default. When we're on the server, we shouldn't enable the
        // animations, because we don't want the drawer to animate the first time the user sees
        // the page.
        if (this._platform.isBrowser) {
            this._enableAnimations = true;
        }
    };
    MatDrawer.prototype.ngOnDestroy = function () {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    };
    Object.defineProperty(MatDrawer.prototype, "opened", {
        get: /**
           * Whether the drawer is opened. We overload this because we trigger an event when it
           * starts or end.
           */
        function () { return this._opened; },
        set: function (value) { this.toggle(coercion_1.coerceBooleanProperty(value)); },
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
       * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
       * Used for focus management after the sidenav is closed.
       */
    MatDrawer.prototype.open = /**
       * Open the drawer.
       * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
       * Used for focus management after the sidenav is closed.
       */
    function (openedVia) {
        return this.toggle(true, openedVia);
    };
    /** Close the drawer. */
    /** Close the drawer. */
    MatDrawer.prototype.close = /** Close the drawer. */
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
       * @param isOpen Whether the drawer should be open.
       * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
       * Used for focus management after the sidenav is closed.
       */
    MatDrawer.prototype.toggle = /**
       * Toggle this drawer.
       * @param isOpen Whether the drawer should be open.
       * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
       * Used for focus management after the sidenav is closed.
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
            _this.openedChange.pipe(operators_1.take(1)).subscribe(function (open) { return resolve(open ? 'open' : 'close'); });
        });
    };
    MatDrawer.prototype._onAnimationStart = function (event) {
        this._animationStarted.emit(event);
    };
    MatDrawer.prototype._onAnimationEnd = function (event) {
        var fromState = event.fromState, toState = event.toState;
        if ((toState.indexOf('open') === 0 && fromState === 'void') ||
            (toState === 'void' && fromState.indexOf('open') === 0)) {
            this.openedChange.emit(this._opened);
        }
    };
    Object.defineProperty(MatDrawer.prototype, "_width", {
        get: function () {
            return this._elementRef.nativeElement ? (this._elementRef.nativeElement.offsetWidth || 0) : 0;
        },
        enumerable: true,
        configurable: true
    });
    MatDrawer.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-drawer',
                    exportAs: 'matDrawer',
                    template: '<ng-content></ng-content>',
                    animations: [drawer_animations_1.matDrawerAnimations.transformDrawer],
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
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDrawer.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: a11y_1.FocusTrapFactory, },
        { type: a11y_1.FocusMonitor, },
        { type: platform_1.Platform, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    MatDrawer.propDecorators = {
        "position": [{ type: core_1.Input },],
        "mode": [{ type: core_1.Input },],
        "disableClose": [{ type: core_1.Input },],
        "autoFocus": [{ type: core_1.Input },],
        "openedChange": [{ type: core_1.Output },],
        "_openedStream": [{ type: core_1.Output, args: ['opened',] },],
        "openedStart": [{ type: core_1.Output },],
        "_closedStream": [{ type: core_1.Output, args: ['closed',] },],
        "closedStart": [{ type: core_1.Output },],
        "onPositionChanged": [{ type: core_1.Output, args: ['positionChanged',] },],
        "opened": [{ type: core_1.Input },],
    };
    return MatDrawer;
}());
exports.MatDrawer = MatDrawer;
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
        /** Event emitted when the drawer backdrop is clicked. */
        this.backdropClick = new core_1.EventEmitter();
        /** Emits when the component is destroyed. */
        this._destroyed = new rxjs_1.Subject();
        /** Emits on every ngDoCheck. Used for debouncing reflows. */
        this._doCheckSubject = new rxjs_1.Subject();
        /**
           * Margins to be applied to the content. These are used to push / shrink the drawer content when a
           * drawer is open. We use margin rather than transform even for push mode because transform breaks
           * fixed position elements inside of the transformed element.
           */
        this._contentMargins = { left: null, right: null };
        this._contentMarginChanges = new rxjs_1.Subject();
        // If a `Dir` directive exists up the tree, listen direction changes
        // and update the left/right properties to point to the proper start/end.
        if (_dir) {
            _dir.change.pipe(operators_1.takeUntil(this._destroyed)).subscribe(function () {
                _this._validateDrawers();
                _this._updateContentMargins();
            });
        }
        this._autosize = defaultAutosize;
    }
    Object.defineProperty(MatDrawerContainer.prototype, "start", {
        /** The drawer child with the `start` position. */
        get: /** The drawer child with the `start` position. */
        function () { return this._start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "end", {
        /** The drawer child with the `end` position. */
        get: /** The drawer child with the `end` position. */
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
           */
        function () { return this._autosize; },
        set: function (value) { this._autosize = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "hasBackdrop", {
        get: /**
           * Whether the drawer container should have a backdrop while one of the sidenavs is open.
           * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
           * mode as well.
           */
        function () {
            if (this._backdropOverride == null) {
                return !this._start || this._start.mode !== 'side' || !this._end || this._end.mode !== 'side';
            }
            return this._backdropOverride;
        },
        set: function (value) {
            this._backdropOverride = value == null ? null : coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDrawerContainer.prototype, "scrollable", {
        /** Reference to the CdkScrollable instance that wraps the scrollable content. */
        get: /** Reference to the CdkScrollable instance that wraps the scrollable content. */
        function () {
            return this._userContent || this._content;
        },
        enumerable: true,
        configurable: true
    });
    MatDrawerContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._drawers.changes.pipe(operators_1.startWith(null)).subscribe(function () {
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
        this._doCheckSubject.pipe(operators_1.debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
        // Arbitrary debounce time, less than a frame at 60fps
        operators_1.takeUntil(this._destroyed)).subscribe(function () { return _this._updateContentMargins(); });
    };
    MatDrawerContainer.prototype.ngOnDestroy = function () {
        this._doCheckSubject.complete();
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Calls `open` of both start and end drawers */
    /** Calls `open` of both start and end drawers */
    MatDrawerContainer.prototype.open = /** Calls `open` of both start and end drawers */
    function () {
        this._drawers.forEach(function (drawer) { return drawer.open(); });
    };
    /** Calls `close` of both start and end drawers */
    /** Calls `close` of both start and end drawers */
    MatDrawerContainer.prototype.close = /** Calls `close` of both start and end drawers */
    function () {
        this._drawers.forEach(function (drawer) { return drawer.close(); });
    };
    MatDrawerContainer.prototype.ngDoCheck = function () {
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
     */
    /**
       * Subscribes to drawer events in order to set a class on the main container element when the
       * drawer is open and the backdrop is visible. This ensures any overflow on the container element
       * is properly hidden.
       */
    MatDrawerContainer.prototype._watchDrawerToggle = /**
       * Subscribes to drawer events in order to set a class on the main container element when the
       * drawer is open and the backdrop is visible. This ensures any overflow on the container element
       * is properly hidden.
       */
    function (drawer) {
        var _this = this;
        drawer._animationStarted.pipe(operators_1.takeUntil(this._drawers.changes), operators_1.filter(function (event) { return event.fromState !== event.toState; }))
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
            drawer.openedChange.pipe(operators_1.takeUntil(this._drawers.changes)).subscribe(function () {
                return _this._setContainerClass(drawer.opened);
            });
        }
    };
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     */
    /**
       * Subscribes to drawer onPositionChanged event in order to
       * re-validate drawers when the position changes.
       */
    MatDrawerContainer.prototype._watchDrawerPosition = /**
       * Subscribes to drawer onPositionChanged event in order to
       * re-validate drawers when the position changes.
       */
    function (drawer) {
        var _this = this;
        if (!drawer) {
            return;
        }
        // NOTE: We need to wait for the microtask queue to be empty before validating,
        // since both drawers may be swapping positions at the same time.
        drawer.onPositionChanged.pipe(operators_1.takeUntil(this._drawers.changes)).subscribe(function () {
            _this._ngZone.onMicrotaskEmpty.asObservable().pipe(operators_1.take(1)).subscribe(function () {
                _this._validateDrawers();
            });
        });
    };
    /** Subscribes to changes in drawer mode so we can run change detection. */
    /** Subscribes to changes in drawer mode so we can run change detection. */
    MatDrawerContainer.prototype._watchDrawerMode = /** Subscribes to changes in drawer mode so we can run change detection. */
    function (drawer) {
        var _this = this;
        if (drawer) {
            drawer._modeChanged.pipe(operators_1.takeUntil(rxjs_1.merge(this._drawers.changes, this._destroyed)))
                .subscribe(function () {
                _this._updateContentMargins();
                _this._changeDetectorRef.markForCheck();
            });
        }
    };
    /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    MatDrawerContainer.prototype._setContainerClass = /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    function (isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add('mat-drawer-opened');
        }
        else {
            this._element.nativeElement.classList.remove('mat-drawer-opened');
        }
    };
    /** Validate the state of the drawer children components. */
    /** Validate the state of the drawer children components. */
    MatDrawerContainer.prototype._validateDrawers = /** Validate the state of the drawer children components. */
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
    /** Whether the container is being pushed to the side by one of the drawers. */
    /** Whether the container is being pushed to the side by one of the drawers. */
    MatDrawerContainer.prototype._isPushed = /** Whether the container is being pushed to the side by one of the drawers. */
    function () {
        return (this._isDrawerOpen(this._start) && this._start.mode != 'over') ||
            (this._isDrawerOpen(this._end) && this._end.mode != 'over');
    };
    MatDrawerContainer.prototype._onBackdropClicked = function () {
        this.backdropClick.emit();
        this._closeModalDrawer();
    };
    MatDrawerContainer.prototype._closeModalDrawer = function () {
        var _this = this;
        // Close all open drawers where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter(function (drawer) { return drawer && !drawer.disableClose && _this._canHaveBackdrop(drawer); })
            .forEach(function (drawer) { return drawer.close(); });
    };
    MatDrawerContainer.prototype._isShowingBackdrop = function () {
        return (this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start)) ||
            (this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end));
    };
    MatDrawerContainer.prototype._canHaveBackdrop = function (drawer) {
        return drawer.mode !== 'side' || !!this._backdropOverride;
    };
    MatDrawerContainer.prototype._isDrawerOpen = function (drawer) {
        return drawer != null && drawer.opened;
    };
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     */
    /**
       * Recalculates and updates the inline styles for the content. Note that this should be used
       * sparingly, because it causes a reflow.
       */
    MatDrawerContainer.prototype._updateContentMargins = /**
       * Recalculates and updates the inline styles for the content. Note that this should be used
       * sparingly, because it causes a reflow.
       */
    function () {
        var _this = this;
        // 1. For drawers in `over` mode, they don't affect the content.
        // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
        //    left margin (for left drawer) or right margin (for right the drawer).
        // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
        //    adding to the left or right margin and simultaneously subtracting the same amount of
        //    margin from the other side.
        var left = 0;
        var right = 0;
        if (this._left && this._left.opened) {
            if (this._left.mode == 'side') {
                left += this._left._width;
            }
            else if (this._left.mode == 'push') {
                var width = this._left._width;
                left += width;
                right -= width;
            }
        }
        if (this._right && this._right.opened) {
            if (this._right.mode == 'side') {
                right += this._right._width;
            }
            else if (this._right.mode == 'push') {
                var width = this._right._width;
                right += width;
                left -= width;
            }
        }
        // If either `right` or `left` is zero, don't set a style to the element. This
        // allows users to specify a custom size via CSS class in SSR scenarios where the
        // measured widths will always be zero. Note that we reset to `null` here, rather
        // than below, in order to ensure that the types in the `if` below are consistent.
        left = left || (null);
        right = right || (null);
        if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
            this._contentMargins = { left: left, right: right };
            // Pull back into the NgZone since in some cases we could be outside. We need to be careful
            // to do it only when something changed, otherwise we can end up hitting the zone too often.
            this._ngZone.run(function () { return _this._contentMarginChanges.next(_this._contentMargins); });
        }
    };
    MatDrawerContainer.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-drawer-container',
                    exportAs: 'matDrawerContainer',
                    template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\" [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div><ng-content select=\"mat-drawer\"></ng-content><ng-content select=\"mat-drawer-content\"></ng-content><mat-drawer-content *ngIf=\"!_content\"><ng-content></ng-content></mat-drawer-content>",
                    styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media screen and (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media screen and (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer:not(.mat-drawer-side){box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-sidenav-fixed{position:fixed}"],
                    host: {
                        'class': 'mat-drawer-container',
                        '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatDrawerContainer.ctorParameters = function () { return [
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_DRAWER_DEFAULT_AUTOSIZE,] },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [animations_1.ANIMATION_MODULE_TYPE,] },] },
    ]; };
    MatDrawerContainer.propDecorators = {
        "_drawers": [{ type: core_1.ContentChildren, args: [MatDrawer,] },],
        "_content": [{ type: core_1.ContentChild, args: [MatDrawerContent,] },],
        "_userContent": [{ type: core_1.ViewChild, args: [MatDrawerContent,] },],
        "autosize": [{ type: core_1.Input },],
        "hasBackdrop": [{ type: core_1.Input },],
        "backdropClick": [{ type: core_1.Output },],
    };
    return MatDrawerContainer;
}());
exports.MatDrawerContainer = MatDrawerContainer;
//# sourceMappingURL=drawer.js.map