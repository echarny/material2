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
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var rxjs_1 = require("rxjs");
/** Event object emitted by MatChip when selected or deselected. */
var /** Event object emitted by MatChip when selected or deselected. */
MatChipSelectionChange = /** @class */ (function () {
    function MatChipSelectionChange(/** Reference to the chip that emitted the event. */
    source, /** Whether the chip that emitted the event is selected. */
    selected, /** Whether the selection change was a result of a user interaction. */
    isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
    return MatChipSelectionChange;
}());
exports.MatChipSelectionChange = MatChipSelectionChange;
// Boilerplate for applying mixins to MatChip.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatChip.
/** @docs-private */
MatChipBase = /** @class */ (function () {
    function MatChipBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatChipBase;
}());
exports.MatChipBase = MatChipBase;
exports._MatChipMixinBase = core_2.mixinColor(core_2.mixinDisableRipple(core_2.mixinDisabled(MatChipBase)), 'primary');
var CHIP_ATTRIBUTE_NAMES = ['mat-basic-chip'];
/**
 * Dummy directive to add CSS class to chip avatar.
 * @docs-private
 */
var MatChipAvatar = /** @class */ (function () {
    function MatChipAvatar() {
    }
    MatChipAvatar.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-chip-avatar, [matChipAvatar]',
                    host: { 'class': 'mat-chip-avatar' }
                },] },
    ];
    return MatChipAvatar;
}());
exports.MatChipAvatar = MatChipAvatar;
/**
 * Dummy directive to add CSS class to chip trailing icon.
 * @docs-private
 */
var MatChipTrailingIcon = /** @class */ (function () {
    function MatChipTrailingIcon() {
    }
    MatChipTrailingIcon.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                    host: { 'class': 'mat-chip-trailing-icon' }
                },] },
    ];
    return MatChipTrailingIcon;
}());
exports.MatChipTrailingIcon = MatChipTrailingIcon;
/**
 * Material design styled Chip component. Used inside the MatChipList component.
 */
var MatChip = /** @class */ (function (_super) {
    __extends(MatChip, _super);
    function MatChip(_elementRef, ngZone, platform, globalOptions) {
        var _this = _super.call(this, _elementRef) || this;
        _this._elementRef = _elementRef;
        /** Whether the ripples are globally disabled through the RippleGlobalOptions */
        _this._ripplesGloballyDisabled = false;
        /**
           * Ripple configuration for ripples that are launched on pointer down.
           * @docs-private
           */
        _this.rippleConfig = {};
        /** Whether the chip has focus. */
        _this._hasFocus = false;
        /** Whether the chip list is selectable */
        _this.chipListSelectable = true;
        _this._selected = false;
        _this._selectable = true;
        _this._removable = true;
        /** Emits when the chip is focused. */
        _this._onFocus = new rxjs_1.Subject();
        /** Emits when the chip is blured. */
        _this._onBlur = new rxjs_1.Subject();
        /** Emitted when the chip is selected or deselected. */
        _this.selectionChange = new core_1.EventEmitter();
        /** Emitted when the chip is destroyed. */
        _this.destroyed = new core_1.EventEmitter();
        /** Emitted when a chip is to be removed. */
        _this.removed = new core_1.EventEmitter();
        _this._addHostClassName();
        _this._chipRipple = new core_2.RippleRenderer(_this, ngZone, _elementRef, platform);
        _this._chipRipple.setupTriggerEvents(_elementRef.nativeElement);
        if (globalOptions) {
            _this._ripplesGloballyDisabled = !!globalOptions.disabled;
            // TODO(paul): Once the speedFactor is removed, we no longer need to copy each single option.
            // TODO(paul): Once the speedFactor is removed, we no longer need to copy each single option.
            _this.rippleConfig = {
                speedFactor: globalOptions.baseSpeedFactor,
                animation: globalOptions.animation,
                terminateOnPointerUp: globalOptions.terminateOnPointerUp,
            };
        }
        return _this;
    }
    Object.defineProperty(MatChip.prototype, "rippleDisabled", {
        /**
         * Whether ripples are disabled on interaction
         * @docs-private
         */
        get: /**
           * Whether ripples are disabled on interaction
           * @docs-private
           */
        function () {
            return this.disabled || this.disableRipple || this._ripplesGloballyDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "selected", {
        get: /** Whether the chip is selected. */
        function () { return this._selected; },
        set: function (value) {
            this._selected = coercion_1.coerceBooleanProperty(value);
            this.selectionChange.emit({
                source: this,
                isUserInput: false,
                selected: value
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "value", {
        get: /** The value of the chip. Defaults to the content inside `<mat-chip>` tags. */
        function () {
            return this._value != undefined
                ? this._value
                : this._elementRef.nativeElement.textContent;
        },
        set: function (value) { this._value = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "selectable", {
        get: /**
           * Whether or not the chip is selectable. When a chip is not selectable,
           * changes to it's selected state are always ignored. By default a chip is
           * selectable, and it becomes non-selectable if it's parent chip list is
           * not selectable.
           */
        function () { return this._selectable && this.chipListSelectable; },
        set: function (value) {
            this._selectable = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "removable", {
        get: /**
           * Determines whether or not the chip displays the remove styling and emits (removed) events.
           */
        function () { return this._removable; },
        set: function (value) {
            this._removable = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChip.prototype, "ariaSelected", {
        /** The ARIA selected applied to the chip. */
        get: /** The ARIA selected applied to the chip. */
        function () {
            return this.selectable ? this.selected.toString() : null;
        },
        enumerable: true,
        configurable: true
    });
    MatChip.prototype._addHostClassName = function () {
        // Add class for the different chips
        for (var _i = 0, CHIP_ATTRIBUTE_NAMES_1 = CHIP_ATTRIBUTE_NAMES; _i < CHIP_ATTRIBUTE_NAMES_1.length; _i++) {
            var attr = CHIP_ATTRIBUTE_NAMES_1[_i];
            if (this._elementRef.nativeElement.hasAttribute(attr) ||
                this._elementRef.nativeElement.tagName.toLowerCase() === attr) {
                this._elementRef.nativeElement.classList.add(attr);
                return;
            }
        }
        this._elementRef.nativeElement.classList.add('mat-standard-chip');
    };
    MatChip.prototype.ngOnDestroy = function () {
        this.destroyed.emit({ chip: this });
        this._chipRipple._removeTriggerEvents();
    };
    /** Selects the chip. */
    /** Selects the chip. */
    MatChip.prototype.select = /** Selects the chip. */
    function () {
        this._selected = true;
        this.selectionChange.emit({
            source: this,
            isUserInput: false,
            selected: true
        });
    };
    /** Deselects the chip. */
    /** Deselects the chip. */
    MatChip.prototype.deselect = /** Deselects the chip. */
    function () {
        this._selected = false;
        this.selectionChange.emit({
            source: this,
            isUserInput: false,
            selected: false
        });
    };
    /** Select this chip and emit selected event */
    /** Select this chip and emit selected event */
    MatChip.prototype.selectViaInteraction = /** Select this chip and emit selected event */
    function () {
        this._selected = true;
        // Emit select event when selected changes.
        this.selectionChange.emit({
            source: this,
            isUserInput: true,
            selected: true
        });
    };
    /** Toggles the current selected state of this chip. */
    /** Toggles the current selected state of this chip. */
    MatChip.prototype.toggleSelected = /** Toggles the current selected state of this chip. */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this._selected = !this.selected;
        this.selectionChange.emit({
            source: this,
            isUserInput: isUserInput,
            selected: this._selected
        });
        return this.selected;
    };
    /** Allows for programmatic focusing of the chip. */
    /** Allows for programmatic focusing of the chip. */
    MatChip.prototype.focus = /** Allows for programmatic focusing of the chip. */
    function () {
        if (!this._hasFocus) {
            this._elementRef.nativeElement.focus();
            this._onFocus.next({ chip: this });
        }
        this._hasFocus = true;
    };
    /**
     * Allows for programmatic removal of the chip. Called by the MatChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     */
    /**
       * Allows for programmatic removal of the chip. Called by the MatChipList when the DELETE or
       * BACKSPACE keys are pressed.
       *
       * Informs any listeners of the removal request. Does not remove the chip from the DOM.
       */
    MatChip.prototype.remove = /**
       * Allows for programmatic removal of the chip. Called by the MatChipList when the DELETE or
       * BACKSPACE keys are pressed.
       *
       * Informs any listeners of the removal request. Does not remove the chip from the DOM.
       */
    function () {
        if (this.removable) {
            this.removed.emit({ chip: this });
        }
    };
    /** Ensures events fire properly upon click. */
    /** Ensures events fire properly upon click. */
    MatChip.prototype._handleClick = /** Ensures events fire properly upon click. */
    function (event) {
        // Check disabled
        if (this.disabled) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    };
    /** Handle custom key presses. */
    /** Handle custom key presses. */
    MatChip.prototype._handleKeydown = /** Handle custom key presses. */
    function (event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case keycodes_1.DELETE:
            case keycodes_1.BACKSPACE:
                // If we are removable, remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case keycodes_1.SPACE:
                // If we are selectable, toggle the focused chip
                if (this.selectable) {
                    this.toggleSelected(true);
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
        }
    };
    MatChip.prototype._blur = function () {
        this._hasFocus = false;
        this._onBlur.next({ chip: this });
    };
    MatChip.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]",
                    inputs: ['color', 'disabled', 'disableRipple'],
                    exportAs: 'matChip',
                    host: {
                        'class': 'mat-chip',
                        '[attr.tabindex]': 'disabled ? null : -1',
                        'role': 'option',
                        '[class.mat-chip-selected]': 'selected',
                        '[class.mat-chip-with-avatar]': 'avatar',
                        '[class.mat-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                        '[class.mat-chip-disabled]': 'disabled',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-selected]': 'ariaSelected',
                        '(click)': '_handleClick($event)',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                    },
                },] },
    ];
    /** @nocollapse */
    MatChip.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: platform_1.Platform, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_RIPPLE_GLOBAL_OPTIONS,] },] },
    ]; };
    MatChip.propDecorators = {
        "avatar": [{ type: core_1.ContentChild, args: [MatChipAvatar,] },],
        "trailingIcon": [{ type: core_1.ContentChild, args: [MatChipTrailingIcon,] },],
        "removeIcon": [{ type: core_1.ContentChild, args: [core_1.forwardRef(function () { return MatChipRemove; }),] },],
        "selected": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "selectable": [{ type: core_1.Input },],
        "removable": [{ type: core_1.Input },],
        "selectionChange": [{ type: core_1.Output },],
        "destroyed": [{ type: core_1.Output },],
        "removed": [{ type: core_1.Output },],
    };
    return MatChip;
}(exports._MatChipMixinBase));
exports.MatChip = MatChip;
/**
 * Applies proper (click) support and adds styling for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 *     `<mat-chip>
 *       <mat-icon matChipRemove>cancel</mat-icon>
 *     </mat-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `mat-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
var MatChipRemove = /** @class */ (function () {
    function MatChipRemove(_parentChip) {
        this._parentChip = _parentChip;
    }
    /** Calls the parent chip's public `remove()` method if applicable. */
    /** Calls the parent chip's public `remove()` method if applicable. */
    MatChipRemove.prototype._handleClick = /** Calls the parent chip's public `remove()` method if applicable. */
    function () {
        if (this._parentChip.removable) {
            this._parentChip.remove();
        }
    };
    MatChipRemove.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matChipRemove]',
                    host: {
                        'class': 'mat-chip-remove mat-chip-trailing-icon',
                        '(click)': '_handleClick()',
                    }
                },] },
    ];
    /** @nocollapse */
    MatChipRemove.ctorParameters = function () { return [
        { type: MatChip, },
    ]; };
    return MatChipRemove;
}());
exports.MatChipRemove = MatChipRemove;
//# sourceMappingURL=chip.js.map