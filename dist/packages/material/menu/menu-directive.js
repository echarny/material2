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
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var menu_animations_1 = require("./menu-animations");
var menu_content_1 = require("./menu-content");
var menu_errors_1 = require("./menu-errors");
var menu_item_1 = require("./menu-item");
var menu_panel_1 = require("./menu-panel");
/** Injection token to be used to override the default options for `mat-menu`. */
exports.MAT_MENU_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-menu-default-options', {
    providedIn: 'root',
    factory: MAT_MENU_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MAT_MENU_DEFAULT_OPTIONS_FACTORY() {
    return {
        overlapTrigger: true,
        xPosition: 'after',
        yPosition: 'below',
        backdropClass: 'cdk-overlay-transparent-backdrop',
    };
}
exports.MAT_MENU_DEFAULT_OPTIONS_FACTORY = MAT_MENU_DEFAULT_OPTIONS_FACTORY;
/**
 * Start elevation for the menu panel.
 * @docs-private
 */
var MAT_MENU_BASE_ELEVATION = 2;
var MatMenu = /** @class */ (function () {
    function MatMenu(_elementRef, _ngZone, _defaultOptions) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._defaultOptions = _defaultOptions;
        this._xPosition = this._defaultOptions.xPosition;
        this._yPosition = this._defaultOptions.yPosition;
        /** Menu items inside the current menu. */
        this._items = [];
        /** Emits whenever the amount of menu items changes. */
        this._itemChanges = new rxjs_1.Subject();
        /** Subscription to tab events on the menu panel */
        this._tabSubscription = rxjs_1.Subscription.EMPTY;
        /** Config object to be passed into the menu's ngClass */
        this._classList = {};
        /** Current state of the panel animation. */
        this._panelAnimationState = 'void';
        /** Emits whenever an animation on the menu completes. */
        this._animationDone = new rxjs_1.Subject();
        /** Class to be added to the backdrop element. */
        this.backdropClass = this._defaultOptions.backdropClass;
        this._overlapTrigger = this._defaultOptions.overlapTrigger;
        this._hasBackdrop = this._defaultOptions.hasBackdrop;
        /** Event emitted when the menu is closed. */
        this.closed = new core_1.EventEmitter();
        /**
           * Event emitted when the menu is closed.
           * @deprecated Switch to `closed` instead
           * @breaking-change 7.0.0
           */
        this.close = this.closed;
    }
    Object.defineProperty(MatMenu.prototype, "xPosition", {
        get: /** Position of the menu in the X axis. */
        function () { return this._xPosition; },
        set: function (value) {
            if (value !== 'before' && value !== 'after') {
                menu_errors_1.throwMatMenuInvalidPositionX();
            }
            this._xPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMenu.prototype, "yPosition", {
        get: /** Position of the menu in the Y axis. */
        function () { return this._yPosition; },
        set: function (value) {
            if (value !== 'above' && value !== 'below') {
                menu_errors_1.throwMatMenuInvalidPositionY();
            }
            this._yPosition = value;
            this.setPositionClasses();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMenu.prototype, "overlapTrigger", {
        get: /** Whether the menu should overlap its trigger. */
        function () { return this._overlapTrigger; },
        set: function (value) {
            this._overlapTrigger = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMenu.prototype, "hasBackdrop", {
        get: /** Whether the menu has a backdrop. */
        function () { return this._hasBackdrop; },
        set: function (value) {
            this._hasBackdrop = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMenu.prototype, "panelClass", {
        set: /**
           * This method takes classes set on the host mat-menu element and applies them on the
           * menu template that displays in the overlay container.  Otherwise, it's difficult
           * to style the containing menu from outside the component.
           * @param classes list of class names
           */
        function (classes) {
            if (classes && classes.length) {
                this._classList = classes.split(' ').reduce(function (obj, className) {
                    obj[className] = true;
                    return obj;
                }, {});
                this._elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatMenu.prototype, "classList", {
        get: /**
           * This method takes classes set on the host mat-menu element and applies them on the
           * menu template that displays in the overlay container.  Otherwise, it's difficult
           * to style the containing menu from outside the component.
           * @deprecated Use `panelClass` instead.
           * @breaking-change 7.0.0
           */
        function () { return this.panelClass; },
        set: function (classes) { this.panelClass = classes; },
        enumerable: true,
        configurable: true
    });
    MatMenu.prototype.ngOnInit = function () {
        this.setPositionClasses();
    };
    MatMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new a11y_1.FocusKeyManager(this._items).withWrap().withTypeAhead();
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () { return _this.closed.emit('tab'); });
    };
    MatMenu.prototype.ngOnDestroy = function () {
        this._tabSubscription.unsubscribe();
        this.closed.complete();
    };
    /** Stream that emits whenever the hovered menu item changes. */
    /** Stream that emits whenever the hovered menu item changes. */
    MatMenu.prototype._hovered = /** Stream that emits whenever the hovered menu item changes. */
    function () {
        return this._itemChanges.pipe(operators_1.startWith(this._items), operators_1.switchMap(function (items) { return rxjs_1.merge.apply(void 0, items.map(function (item) { return item._hovered; })); }));
    };
    /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    MatMenu.prototype._handleKeydown = /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    function (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case keycodes_1.ESCAPE:
                this.closed.emit('keydown');
                event.stopPropagation();
                break;
            case keycodes_1.LEFT_ARROW:
                if (this.parentMenu && this.direction === 'ltr') {
                    this.closed.emit('keydown');
                }
                break;
            case keycodes_1.RIGHT_ARROW:
                if (this.parentMenu && this.direction === 'rtl') {
                    this.closed.emit('keydown');
                }
                break;
            default:
                if (keyCode === keycodes_1.UP_ARROW || keyCode === keycodes_1.DOWN_ARROW) {
                    this._keyManager.setFocusOrigin('keyboard');
                }
                this._keyManager.onKeydown(event);
        }
    };
    /**
     * Focus the first item in the menu.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    /**
       * Focus the first item in the menu.
       * @param origin Action from which the focus originated. Used to set the correct styling.
       */
    MatMenu.prototype.focusFirstItem = /**
       * Focus the first item in the menu.
       * @param origin Action from which the focus originated. Used to set the correct styling.
       */
    function (origin) {
        var _this = this;
        if (origin === void 0) { origin = 'program'; }
        // When the content is rendered lazily, it takes a bit before the items are inside the DOM.
        if (this.lazyContent) {
            this._ngZone.onStable.asObservable()
                .pipe(operators_1.take(1))
                .subscribe(function () { return _this._keyManager.setFocusOrigin(origin).setFirstItemActive(); });
        }
        else {
            this._keyManager.setFocusOrigin(origin).setFirstItemActive();
        }
    };
    /**
     * Resets the active item in the menu. This is used when the menu is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    /**
       * Resets the active item in the menu. This is used when the menu is opened, allowing
       * the user to start from the first option when pressing the down arrow.
       */
    MatMenu.prototype.resetActiveItem = /**
       * Resets the active item in the menu. This is used when the menu is opened, allowing
       * the user to start from the first option when pressing the down arrow.
       */
    function () {
        this._keyManager.setActiveItem(-1);
    };
    /**
     * Sets the menu panel elevation.
     * @param depth Number of parent menus that come before the menu.
     */
    /**
       * Sets the menu panel elevation.
       * @param depth Number of parent menus that come before the menu.
       */
    MatMenu.prototype.setElevation = /**
       * Sets the menu panel elevation.
       * @param depth Number of parent menus that come before the menu.
       */
    function (depth) {
        // The elevation starts at the base and increases by one for each level.
        var newElevation = "mat-elevation-z" + (MAT_MENU_BASE_ELEVATION + depth);
        var customElevation = Object.keys(this._classList).find(function (c) { return c.startsWith('mat-elevation-z'); });
        if (!customElevation || customElevation === this._previousElevation) {
            if (this._previousElevation) {
                this._classList[this._previousElevation] = false;
            }
            this._classList[newElevation] = true;
            this._previousElevation = newElevation;
        }
    };
    /**
     * Registers a menu item with the menu.
     * @docs-private
     */
    /**
       * Registers a menu item with the menu.
       * @docs-private
       */
    MatMenu.prototype.addItem = /**
       * Registers a menu item with the menu.
       * @docs-private
       */
    function (item) {
        // We register the items through this method, rather than picking them up through
        // `ContentChildren`, because we need the items to be picked up by their closest
        // `mat-menu` ancestor. If we used `@ContentChildren(MatMenuItem, {descendants: true})`,
        // all descendant items will bleed into the top-level menu in the case where the consumer
        // has `mat-menu` instances nested inside each other.
        if (this._items.indexOf(item) === -1) {
            this._items.push(item);
            this._itemChanges.next(this._items);
        }
    };
    /**
     * Removes an item from the menu.
     * @docs-private
     */
    /**
       * Removes an item from the menu.
       * @docs-private
       */
    MatMenu.prototype.removeItem = /**
       * Removes an item from the menu.
       * @docs-private
       */
    function (item) {
        var index = this._items.indexOf(item);
        if (this._items.indexOf(item) > -1) {
            this._items.splice(index, 1);
            this._itemChanges.next(this._items);
        }
    };
    /**
     * Adds classes to the menu panel based on its position. Can be used by
     * consumers to add specific styling based on the position.
     * @param posX Position of the menu along the x axis.
     * @param posY Position of the menu along the y axis.
     * @docs-private
     */
    /**
       * Adds classes to the menu panel based on its position. Can be used by
       * consumers to add specific styling based on the position.
       * @param posX Position of the menu along the x axis.
       * @param posY Position of the menu along the y axis.
       * @docs-private
       */
    MatMenu.prototype.setPositionClasses = /**
       * Adds classes to the menu panel based on its position. Can be used by
       * consumers to add specific styling based on the position.
       * @param posX Position of the menu along the x axis.
       * @param posY Position of the menu along the y axis.
       * @docs-private
       */
    function (posX, posY) {
        if (posX === void 0) { posX = this.xPosition; }
        if (posY === void 0) { posY = this.yPosition; }
        var classes = this._classList;
        classes['mat-menu-before'] = posX === 'before';
        classes['mat-menu-after'] = posX === 'after';
        classes['mat-menu-above'] = posY === 'above';
        classes['mat-menu-below'] = posY === 'below';
    };
    /** Starts the enter animation. */
    /** Starts the enter animation. */
    MatMenu.prototype._startAnimation = /** Starts the enter animation. */
    function () {
        // @breaking-change 7.0.0 Combine with _resetAnimation.
        this._panelAnimationState = 'enter';
    };
    /** Resets the panel animation to its initial state. */
    /** Resets the panel animation to its initial state. */
    MatMenu.prototype._resetAnimation = /** Resets the panel animation to its initial state. */
    function () {
        // @breaking-change 7.0.0 Combine with _startAnimation.
        this._panelAnimationState = 'void';
    };
    /** Callback that is invoked when the panel animation completes. */
    /** Callback that is invoked when the panel animation completes. */
    MatMenu.prototype._onAnimationDone = /** Callback that is invoked when the panel animation completes. */
    function (event) {
        this._animationDone.next(event);
        this._isAnimating = false;
        // Scroll the content element to the top once the animation is done. This is necessary, because
        // we move focus to the first item while it's still being animated, which can throw the browser
        // off when it determines the scroll position. Alternatively we can move focus when the
        // animation is done, however moving focus asynchronously will interrupt screen readers
        // which are in the process of reading out the menu already. We take the `element` from
        // the `event` since we can't use a `ViewChild` to access the pane.
        if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
            event.element.scrollTop = 0;
        }
    };
    MatMenu.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-menu',
                    template: "<ng-template><div class=\"mat-menu-panel\" [ngClass]=\"_classList\" (keydown)=\"_handleKeydown($event)\" (click)=\"closed.emit('click')\" [@transformMenu]=\"_panelAnimationState\" (@transformMenu.start)=\"_isAnimating = true\" (@transformMenu.done)=\"_onAnimationDone($event)\" tabindex=\"-1\" role=\"menu\"><div class=\"mat-menu-content\"><ng-content></ng-content></div></div></ng-template>",
                    styles: [".mat-menu-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;max-height:calc(100vh - 48px);border-radius:2px;outline:0}.mat-menu-panel:not([class*=mat-elevation-z]){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-menu-panel{outline:solid 1px}}.mat-menu-content:not(:empty){padding-top:8px;padding-bottom:8px}.mat-menu-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative}.mat-menu-item::-moz-focus-inner{border:0}.mat-menu-item[disabled]{cursor:default}[dir=rtl] .mat-menu-item{text-align:right}.mat-menu-item .mat-icon{margin-right:16px;vertical-align:middle}.mat-menu-item .mat-icon svg{vertical-align:top}[dir=rtl] .mat-menu-item .mat-icon{margin-left:16px;margin-right:0}@media screen and (-ms-high-contrast:active){.mat-menu-item-highlighted,.mat-menu-item.cdk-keyboard-focused,.mat-menu-item.cdk-program-focused{outline:dotted 1px}}.mat-menu-item-submenu-trigger{padding-right:32px}.mat-menu-item-submenu-trigger::after{width:0;height:0;border-style:solid;border-width:5px 0 5px 5px;border-color:transparent transparent transparent currentColor;content:'';display:inline-block;position:absolute;top:50%;right:16px;transform:translateY(-50%)}[dir=rtl] .mat-menu-item-submenu-trigger{padding-right:16px;padding-left:32px}[dir=rtl] .mat-menu-item-submenu-trigger::after{right:auto;left:16px;transform:rotateY(180deg) translateY(-50%)}.mat-menu-panel.ng-animating .mat-menu-item-submenu-trigger{pointer-events:none}button.mat-menu-item{width:100%}.mat-menu-item .mat-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matMenu',
                    animations: [
                        menu_animations_1.matMenuAnimations.transformMenu,
                        menu_animations_1.matMenuAnimations.fadeInItems
                    ],
                    providers: [
                        { provide: menu_panel_1.MAT_MENU_PANEL, useExisting: MatMenu }
                    ]
                },] },
    ];
    /** @nocollapse */
    MatMenu.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_MENU_DEFAULT_OPTIONS,] },] },
    ]; };
    MatMenu.propDecorators = {
        "backdropClass": [{ type: core_1.Input },],
        "xPosition": [{ type: core_1.Input },],
        "yPosition": [{ type: core_1.Input },],
        "templateRef": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
        "items": [{ type: core_1.ContentChildren, args: [menu_item_1.MatMenuItem,] },],
        "lazyContent": [{ type: core_1.ContentChild, args: [menu_content_1.MatMenuContent,] },],
        "overlapTrigger": [{ type: core_1.Input },],
        "hasBackdrop": [{ type: core_1.Input },],
        "panelClass": [{ type: core_1.Input, args: ['class',] },],
        "classList": [{ type: core_1.Input },],
        "closed": [{ type: core_1.Output },],
        "close": [{ type: core_1.Output },],
    };
    return MatMenu;
}());
exports.MatMenu = MatMenu;
//# sourceMappingURL=menu-directive.js.map