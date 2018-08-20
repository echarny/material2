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
var a11y_1 = require("@angular/cdk/a11y");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
var common_1 = require("@angular/common");
var menu_panel_1 = require("./menu-panel");
// Boilerplate for applying mixins to MatMenuItem.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatMenuItem.
/** @docs-private */
MatMenuItemBase = /** @class */ (function () {
    function MatMenuItemBase() {
    }
    return MatMenuItemBase;
}());
exports.MatMenuItemBase = MatMenuItemBase;
exports._MatMenuItemMixinBase = core_2.mixinDisableRipple(core_2.mixinDisabled(MatMenuItemBase));
/**
 * This directive is intended to be used inside an mat-menu tag.
 * It exists mostly to set the role attribute.
 */
var MatMenuItem = /** @class */ (function (_super) {
    __extends(MatMenuItem, _super);
    function MatMenuItem(_elementRef, document, _focusMonitor, _parentMenu) {
        var _this = 
        // @breaking-change 7.0.0 make `_focusMonitor` and `document` required params.
        _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._parentMenu = _parentMenu;
        /** Stream that emits when the menu item is hovered. */
        _this._hovered = new rxjs_1.Subject();
        /** Whether the menu item is highlighted. */
        _this._highlighted = false;
        /** Whether the menu item acts as a trigger for a sub-menu. */
        _this._triggersSubmenu = false;
        if (_focusMonitor) {
            // Start monitoring the element so it gets the appropriate focused classes. We want
            // to show the focus style for menu items only when the focus was not caused by a
            // mouse or touch interaction.
            _focusMonitor.monitor(_this._getHostElement(), false);
        }
        if (_parentMenu && _parentMenu.addItem) {
            _parentMenu.addItem(_this);
        }
        _this._document = document;
        return _this;
    }
    /** Focuses the menu item. */
    /** Focuses the menu item. */
    MatMenuItem.prototype.focus = /** Focuses the menu item. */
    function (origin) {
        if (origin === void 0) { origin = 'program'; }
        if (this._focusMonitor) {
            this._focusMonitor.focusVia(this._getHostElement(), origin);
        }
        else {
            this._getHostElement().focus();
        }
    };
    MatMenuItem.prototype.ngOnDestroy = function () {
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._getHostElement());
        }
        if (this._parentMenu && this._parentMenu.removeItem) {
            this._parentMenu.removeItem(this);
        }
        this._hovered.complete();
    };
    /** Used to set the `tabindex`. */
    /** Used to set the `tabindex`. */
    MatMenuItem.prototype._getTabIndex = /** Used to set the `tabindex`. */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /** Returns the host DOM element. */
    /** Returns the host DOM element. */
    MatMenuItem.prototype._getHostElement = /** Returns the host DOM element. */
    function () {
        return this._elementRef.nativeElement;
    };
    /** Prevents the default element actions if it is disabled. */
    /** Prevents the default element actions if it is disabled. */
    MatMenuItem.prototype._checkDisabled = /** Prevents the default element actions if it is disabled. */
    function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    /** Emits to the hover stream. */
    /** Emits to the hover stream. */
    MatMenuItem.prototype._handleMouseEnter = /** Emits to the hover stream. */
    function () {
        this._hovered.next(this);
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    /** Gets the label to be used when determining whether the option should be focused. */
    MatMenuItem.prototype.getLabel = /** Gets the label to be used when determining whether the option should be focused. */
    function () {
        var element = this._elementRef.nativeElement;
        var textNodeType = this._document ? this._document.TEXT_NODE : 3;
        var output = '';
        if (element.childNodes) {
            var length_1 = element.childNodes.length;
            // Go through all the top-level text nodes and extract their text.
            // We skip anything that's not a text node to prevent the text from
            // being thrown off by something like an icon.
            for (var i = 0; i < length_1; i++) {
                if (element.childNodes[i].nodeType === textNodeType) {
                    output += element.childNodes[i].textContent;
                }
            }
        }
        return output.trim();
    };
    MatMenuItem.decorators = [
        { type: core_1.Component, args: [{selector: '[mat-menu-item]',
                    exportAs: 'matMenuItem',
                    inputs: ['disabled', 'disableRipple'],
                    host: {
                        'role': 'menuitem',
                        'class': 'mat-menu-item',
                        '[class.mat-menu-item-highlighted]': '_highlighted',
                        '[class.mat-menu-item-submenu-trigger]': '_triggersSubmenu',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.disabled]': 'disabled || null',
                        '(click)': '_checkDisabled($event)',
                        '(mouseenter)': '_handleMouseEnter()',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "<ng-content></ng-content><div class=\"mat-menu-ripple\" matRipple [matRippleDisabled]=\"disableRipple || disabled\" [matRippleTrigger]=\"_getHostElement()\"></div>",
                },] },
    ];
    /** @nocollapse */
    MatMenuItem.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: a11y_1.FocusMonitor, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [menu_panel_1.MAT_MENU_PANEL,] }, { type: core_1.Optional },] },
    ]; };
    return MatMenuItem;
}(exports._MatMenuItemMixinBase));
exports.MatMenuItem = MatMenuItem;
//# sourceMappingURL=menu-item.js.map