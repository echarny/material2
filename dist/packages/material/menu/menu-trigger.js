"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var menu_directive_1 = require("./menu-directive");
var menu_errors_1 = require("./menu-errors");
var menu_item_1 = require("./menu-item");
/** Injection token that determines the scroll handling while the menu is open. */
exports.MAT_MENU_SCROLL_STRATEGY = new core_1.InjectionToken('mat-menu-scroll-strategy');
/** @docs-private */
function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
exports.MAT_MENU_SCROLL_STRATEGY_FACTORY = MAT_MENU_SCROLL_STRATEGY_FACTORY;
/** @docs-private */
exports.MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: exports.MAT_MENU_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_MENU_SCROLL_STRATEGY_FACTORY,
};
/** Default top padding of the menu panel. */
exports.MENU_PANEL_TOP_PADDING = 8;
// TODO(andrewseguin): Remove the kebab versions in favor of camelCased attribute selectors
/**
 * This directive is intended to be used in conjunction with an mat-menu tag.  It is
 * responsible for toggling the display of the provided menu instance.
 */
var MatMenuTrigger = /** @class */ (function () {
    function MatMenuTrigger(_overlay, _element, _viewContainerRef, _scrollStrategy, _parentMenu, _menuItemInstance, _dir, 
    // TODO(crisbeto): make the _focusMonitor required when doing breaking changes.
    // @breaking-change 7.0.0
    _focusMonitor) {
        this._overlay = _overlay;
        this._element = _element;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._parentMenu = _parentMenu;
        this._menuItemInstance = _menuItemInstance;
        this._dir = _dir;
        this._focusMonitor = _focusMonitor;
        this._overlayRef = null;
        this._menuOpen = false;
        this._closeSubscription = rxjs_1.Subscription.EMPTY;
        this._hoverSubscription = rxjs_1.Subscription.EMPTY;
        // Tracking input type is necessary so it's possible to only auto-focus
        // the first item of the list when the menu is opened via the keyboard
        this._openedByMouse = false;
        /** Event emitted when the associated menu is opened. */
        this.menuOpened = new core_1.EventEmitter();
        /**
           * Event emitted when the associated menu is opened.
           * @deprecated Switch to `menuOpened` instead
           * @breaking-change 7.0.0
           */
        // tslint:disable-next-line:no-output-on-prefix
        this.onMenuOpen = this.menuOpened;
        /** Event emitted when the associated menu is closed. */
        this.menuClosed = new core_1.EventEmitter();
        /**
           * Event emitted when the associated menu is closed.
           * @deprecated Switch to `menuClosed` instead
           * @breaking-change 7.0.0
           */
        // tslint:disable-next-line:no-output-on-prefix
        this.onMenuClose = this.menuClosed;
        if (_menuItemInstance) {
            _menuItemInstance._triggersSubmenu = this.triggersSubmenu();
        }
    }
    Object.defineProperty(MatMenuTrigger.prototype, "_deprecatedMatMenuTriggerFor", {
        get: /**
           * @deprecated
           * @breaking-change 7.0.0
           */
        function () {
            return this.menu;
        },
        set: function (v) {
            this.menu = v;
        },
        enumerable: true,
        configurable: true
    });
    MatMenuTrigger.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._checkMenu();
        this.menu.close.subscribe(function (reason) {
            _this._destroyMenu();
            // If a click closed the menu, we should close the entire chain of nested menus.
            if ((reason === 'click' || reason === 'tab') && _this._parentMenu) {
                _this._parentMenu.closed.emit(reason);
            }
        });
        this._handleHover();
    };
    MatMenuTrigger.prototype.ngOnDestroy = function () {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this._cleanUpSubscriptions();
    };
    Object.defineProperty(MatMenuTrigger.prototype, "menuOpen", {
        /** Whether the menu is open. */
        get: /** Whether the menu is open. */
        function () {
            return this._menuOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMenuTrigger.prototype, "dir", {
        /** The text direction of the containing app. */
        get: /** The text direction of the containing app. */
        function () {
            return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the menu triggers a sub-menu or a top-level one. */
    /** Whether the menu triggers a sub-menu or a top-level one. */
    MatMenuTrigger.prototype.triggersSubmenu = /** Whether the menu triggers a sub-menu or a top-level one. */
    function () {
        return !!(this._menuItemInstance && this._parentMenu);
    };
    /** Toggles the menu between the open and closed states. */
    /** Toggles the menu between the open and closed states. */
    MatMenuTrigger.prototype.toggleMenu = /** Toggles the menu between the open and closed states. */
    function () {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    };
    /** Opens the menu. */
    /** Opens the menu. */
    MatMenuTrigger.prototype.openMenu = /** Opens the menu. */
    function () {
        var _this = this;
        if (this._menuOpen) {
            return;
        }
        var overlayRef = this._createOverlay();
        this._setPosition(overlayRef.getConfig().positionStrategy);
        overlayRef.attach(this._portal);
        if (this.menu.lazyContent) {
            this.menu.lazyContent.attach(this.menuData);
        }
        this._closeSubscription = this._menuClosingActions().subscribe(function () { return _this.closeMenu(); });
        this._initMenu();
        if (this.menu instanceof menu_directive_1.MatMenu) {
            this.menu._startAnimation();
        }
    };
    /** Closes the menu. */
    /** Closes the menu. */
    MatMenuTrigger.prototype.closeMenu = /** Closes the menu. */
    function () {
        this.menu.close.emit();
    };
    /**
     * Focuses the menu trigger.
     * @param origin Source of the menu trigger's focus.
     */
    /**
       * Focuses the menu trigger.
       * @param origin Source of the menu trigger's focus.
       */
    MatMenuTrigger.prototype.focus = /**
       * Focuses the menu trigger.
       * @param origin Source of the menu trigger's focus.
       */
    function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._element.nativeElement, origin);
        }
        else {
            this._element.nativeElement.focus();
        }
    };
    /** Closes the menu and does the necessary cleanup. */
    /** Closes the menu and does the necessary cleanup. */
    MatMenuTrigger.prototype._destroyMenu = /** Closes the menu and does the necessary cleanup. */
    function () {
        var _this = this;
        if (!this._overlayRef || !this.menuOpen) {
            return;
        }
        var menu = this.menu;
        this._closeSubscription.unsubscribe();
        this._overlayRef.detach();
        if (menu instanceof menu_directive_1.MatMenu) {
            menu._resetAnimation();
            if (menu.lazyContent) {
                // Wait for the exit animation to finish before detaching the content.
                menu._animationDone
                    .pipe(operators_1.filter(function (event) { return event.toState === 'void'; }), operators_1.take(1), 
                // Interrupt if the content got re-attached.
                // Interrupt if the content got re-attached.
                operators_1.takeUntil(menu.lazyContent._attached))
                    .subscribe(function () { return menu.lazyContent.detach(); }, undefined, function () {
                    // No matter whether the content got re-attached, reset the menu.
                    // No matter whether the content got re-attached, reset the menu.
                    _this._resetMenu();
                });
            }
            else {
                this._resetMenu();
            }
        }
        else {
            this._resetMenu();
            if (menu.lazyContent) {
                menu.lazyContent.detach();
            }
        }
    };
    /**
     * This method sets the menu state to open and focuses the first item if
     * the menu was opened via the keyboard.
     */
    /**
       * This method sets the menu state to open and focuses the first item if
       * the menu was opened via the keyboard.
       */
    MatMenuTrigger.prototype._initMenu = /**
       * This method sets the menu state to open and focuses the first item if
       * the menu was opened via the keyboard.
       */
    function () {
        this.menu.parentMenu = this.triggersSubmenu() ? this._parentMenu : undefined;
        this.menu.direction = this.dir;
        this._setMenuElevation();
        this._setIsMenuOpen(true);
        this.menu.focusFirstItem(this._openedByMouse ? 'mouse' : 'program');
    };
    /** Updates the menu elevation based on the amount of parent menus that it has. */
    /** Updates the menu elevation based on the amount of parent menus that it has. */
    MatMenuTrigger.prototype._setMenuElevation = /** Updates the menu elevation based on the amount of parent menus that it has. */
    function () {
        if (this.menu.setElevation) {
            var depth = 0;
            var parentMenu = this.menu.parentMenu;
            while (parentMenu) {
                depth++;
                parentMenu = parentMenu.parentMenu;
            }
            this.menu.setElevation(depth);
        }
    };
    /**
     * This method resets the menu when it's closed, most importantly restoring
     * focus to the menu trigger if the menu was opened via the keyboard.
     */
    /**
       * This method resets the menu when it's closed, most importantly restoring
       * focus to the menu trigger if the menu was opened via the keyboard.
       */
    MatMenuTrigger.prototype._resetMenu = /**
       * This method resets the menu when it's closed, most importantly restoring
       * focus to the menu trigger if the menu was opened via the keyboard.
       */
    function () {
        this._setIsMenuOpen(false);
        // We should reset focus if the user is navigating using a keyboard or
        // if we have a top-level trigger which might cause focus to be lost
        // when clicking on the backdrop.
        if (!this._openedByMouse) {
            // Note that the focus style will show up both for `program` and
            // `keyboard` so we don't have to specify which one it is.
            this.focus();
        }
        else if (!this.triggersSubmenu()) {
            this.focus('mouse');
        }
        this._openedByMouse = false;
    };
    // set state rather than toggle to support triggers sharing a menu
    // set state rather than toggle to support triggers sharing a menu
    MatMenuTrigger.prototype._setIsMenuOpen = 
    // set state rather than toggle to support triggers sharing a menu
    function (isOpen) {
        this._menuOpen = isOpen;
        this._menuOpen ? this.menuOpened.emit() : this.menuClosed.emit();
        if (this.triggersSubmenu()) {
            this._menuItemInstance._highlighted = isOpen;
        }
    };
    /**
     * This method checks that a valid instance of MatMenu has been passed into
     * matMenuTriggerFor. If not, an exception is thrown.
     */
    /**
       * This method checks that a valid instance of MatMenu has been passed into
       * matMenuTriggerFor. If not, an exception is thrown.
       */
    MatMenuTrigger.prototype._checkMenu = /**
       * This method checks that a valid instance of MatMenu has been passed into
       * matMenuTriggerFor. If not, an exception is thrown.
       */
    function () {
        if (!this.menu) {
            menu_errors_1.throwMatMenuMissingError();
        }
    };
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    /**
       * This method creates the overlay from the provided menu's template and saves its
       * OverlayRef so that it can be attached to the DOM when openMenu is called.
       */
    MatMenuTrigger.prototype._createOverlay = /**
       * This method creates the overlay from the provided menu's template and saves its
       * OverlayRef so that it can be attached to the DOM when openMenu is called.
       */
    function () {
        if (!this._overlayRef) {
            this._portal = new portal_1.TemplatePortal(this.menu.templateRef, this._viewContainerRef);
            var config = this._getOverlayConfig();
            this._subscribeToPositions(config.positionStrategy);
            this._overlayRef = this._overlay.create(config);
        }
        return this._overlayRef;
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    /**
       * This method builds the configuration object needed to create the overlay, the OverlayState.
       * @returns OverlayConfig
       */
    MatMenuTrigger.prototype._getOverlayConfig = /**
       * This method builds the configuration object needed to create the overlay, the OverlayState.
       * @returns OverlayConfig
       */
    function () {
        return new overlay_1.OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._element)
                .withTransformOriginOn('.mat-menu-panel'),
            hasBackdrop: this.menu.hasBackdrop == null ? !this.triggersSubmenu() : this.menu.hasBackdrop,
            backdropClass: this.menu.backdropClass || 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this._scrollStrategy(),
            direction: this._dir
        });
    };
    /**
     * Listens to changes in the position of the overlay and sets the correct classes
     * on the menu based on the new position. This ensures the animation origin is always
     * correct, even if a fallback position is used for the overlay.
     */
    /**
       * Listens to changes in the position of the overlay and sets the correct classes
       * on the menu based on the new position. This ensures the animation origin is always
       * correct, even if a fallback position is used for the overlay.
       */
    MatMenuTrigger.prototype._subscribeToPositions = /**
       * Listens to changes in the position of the overlay and sets the correct classes
       * on the menu based on the new position. This ensures the animation origin is always
       * correct, even if a fallback position is used for the overlay.
       */
    function (position) {
        var _this = this;
        if (this.menu.setPositionClasses) {
            position.positionChanges.subscribe(function (change) {
                var posX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
                var posY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
                _this.menu.setPositionClasses(posX, posY);
            });
        }
    };
    /**
     * Sets the appropriate positions on a position strategy
     * so the overlay connects with the trigger correctly.
     * @param positionStrategy Strategy whose position to update.
     */
    /**
       * Sets the appropriate positions on a position strategy
       * so the overlay connects with the trigger correctly.
       * @param positionStrategy Strategy whose position to update.
       */
    MatMenuTrigger.prototype._setPosition = /**
       * Sets the appropriate positions on a position strategy
       * so the overlay connects with the trigger correctly.
       * @param positionStrategy Strategy whose position to update.
       */
    function (positionStrategy) {
        var _a = this.menu.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'], originX = _a[0], originFallbackX = _a[1];
        var _b = this.menu.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], overlayY = _b[0], overlayFallbackY = _b[1];
        var _c = [overlayY, overlayFallbackY], originY = _c[0], originFallbackY = _c[1];
        var _d = [originX, originFallbackX], overlayX = _d[0], overlayFallbackX = _d[1];
        var offsetY = 0;
        if (this.triggersSubmenu()) {
            // When the menu is a sub-menu, it should always align itself
            // to the edges of the trigger, instead of overlapping it.
            overlayFallbackX = originX = this.menu.xPosition === 'before' ? 'start' : 'end';
            originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';
            offsetY = overlayY === 'bottom' ? exports.MENU_PANEL_TOP_PADDING : -exports.MENU_PANEL_TOP_PADDING;
        }
        else if (!this.menu.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
        }
        positionStrategy.withPositions([
            { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
            { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
            {
                originX: originX,
                originY: originFallbackY,
                overlayX: overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            }
        ]);
    };
    /** Cleans up the active subscriptions. */
    /** Cleans up the active subscriptions. */
    MatMenuTrigger.prototype._cleanUpSubscriptions = /** Cleans up the active subscriptions. */
    function () {
        this._closeSubscription.unsubscribe();
        this._hoverSubscription.unsubscribe();
    };
    /** Returns a stream that emits whenever an action that should close the menu occurs. */
    /** Returns a stream that emits whenever an action that should close the menu occurs. */
    MatMenuTrigger.prototype._menuClosingActions = /** Returns a stream that emits whenever an action that should close the menu occurs. */
    function () {
        var _this = this;
        var backdrop = this._overlayRef.backdropClick();
        var detachments = this._overlayRef.detachments();
        var parentClose = this._parentMenu ? this._parentMenu.closed : rxjs_1.of();
        var hover = this._parentMenu ? this._parentMenu._hovered().pipe(operators_1.filter(function (active) { return active !== _this._menuItemInstance; }), operators_1.filter(function () { return _this._menuOpen; })) : rxjs_1.of();
        return rxjs_1.merge(backdrop, parentClose, hover, detachments);
    };
    /** Handles mouse presses on the trigger. */
    /** Handles mouse presses on the trigger. */
    MatMenuTrigger.prototype._handleMousedown = /** Handles mouse presses on the trigger. */
    function (event) {
        if (!a11y_1.isFakeMousedownFromScreenReader(event)) {
            this._openedByMouse = true;
            // Since clicking on the trigger won't close the menu if it opens a sub-menu,
            // we should prevent focus from moving onto it via click to avoid the
            // highlight from lingering on the menu item.
            if (this.triggersSubmenu()) {
                event.preventDefault();
            }
        }
    };
    /** Handles key presses on the trigger. */
    /** Handles key presses on the trigger. */
    MatMenuTrigger.prototype._handleKeydown = /** Handles key presses on the trigger. */
    function (event) {
        var keyCode = event.keyCode;
        if (this.triggersSubmenu() && ((keyCode === keycodes_1.RIGHT_ARROW && this.dir === 'ltr') ||
            (keyCode === keycodes_1.LEFT_ARROW && this.dir === 'rtl'))) {
            this.openMenu();
        }
    };
    /** Handles click events on the trigger. */
    /** Handles click events on the trigger. */
    MatMenuTrigger.prototype._handleClick = /** Handles click events on the trigger. */
    function (event) {
        if (this.triggersSubmenu()) {
            // Stop event propagation to avoid closing the parent menu.
            event.stopPropagation();
            this.openMenu();
        }
        else {
            this.toggleMenu();
        }
    };
    /** Handles the cases where the user hovers over the trigger. */
    /** Handles the cases where the user hovers over the trigger. */
    MatMenuTrigger.prototype._handleHover = /** Handles the cases where the user hovers over the trigger. */
    function () {
        var _this = this;
        // Subscribe to changes in the hovered item in order to toggle the panel.
        if (!this.triggersSubmenu()) {
            return;
        }
        this._hoverSubscription = this._parentMenu._hovered()
            .pipe(operators_1.filter(function (active) { return active === _this._menuItemInstance && !active.disabled; }), operators_1.delay(0, rxjs_1.asapScheduler))
            .subscribe(function () {
            _this._openedByMouse = true;
            // If the same menu is used between multiple triggers, it might still be animating
            // while the new trigger tries to re-open it. Wait for the animation to finish
            // before doing so. Also interrupt if the user moves to another item.
            if (_this.menu instanceof menu_directive_1.MatMenu && _this.menu._isAnimating) {
                // We need the `delay(0)` here in order to avoid
                // 'changed after checked' errors in some cases. See #12194.
                // We need the `delay(0)` here in order to avoid
                // 'changed after checked' errors in some cases. See #12194.
                _this.menu._animationDone
                    .pipe(operators_1.take(1), operators_1.delay(0, rxjs_1.asapScheduler), operators_1.takeUntil(_this._parentMenu._hovered()))
                    .subscribe(function () { return _this.openMenu(); });
            }
            else {
                _this.openMenu();
            }
        });
    };
    MatMenuTrigger.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "[mat-menu-trigger-for], [matMenuTriggerFor]",
                    host: {
                        'aria-haspopup': 'true',
                        '[attr.aria-expanded]': 'menuOpen || null',
                        '(mousedown)': '_handleMousedown($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(click)': '_handleClick($event)',
                    },
                    exportAs: 'matMenuTrigger'
                },] },
    ];
    /** @nocollapse */
    MatMenuTrigger.ctorParameters = function () { return [
        { type: overlay_1.Overlay, },
        { type: core_1.ElementRef, },
        { type: core_1.ViewContainerRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_MENU_SCROLL_STRATEGY,] },] },
        { type: menu_directive_1.MatMenu, decorators: [{ type: core_1.Optional },] },
        { type: menu_item_1.MatMenuItem, decorators: [{ type: core_1.Optional }, { type: core_1.Self },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: a11y_1.FocusMonitor, },
    ]; };
    MatMenuTrigger.propDecorators = {
        "_deprecatedMatMenuTriggerFor": [{ type: core_1.Input, args: ['mat-menu-trigger-for',] },],
        "menu": [{ type: core_1.Input, args: ['matMenuTriggerFor',] },],
        "menuData": [{ type: core_1.Input, args: ['matMenuTriggerData',] },],
        "menuOpened": [{ type: core_1.Output },],
        "onMenuOpen": [{ type: core_1.Output },],
        "menuClosed": [{ type: core_1.Output },],
        "onMenuClose": [{ type: core_1.Output },],
    };
    return MatMenuTrigger;
}());
exports.MatMenuTrigger = MatMenuTrigger;
//# sourceMappingURL=menu-trigger.js.map