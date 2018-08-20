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
var coercion_1 = require("@angular/cdk/coercion");
var collections_1 = require("@angular/cdk/collections");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var list_1 = require("./list");
/** @docs-private */
var /** @docs-private */
MatSelectionListBase = /** @class */ (function () {
    function MatSelectionListBase() {
    }
    return MatSelectionListBase;
}());
exports.MatSelectionListBase = MatSelectionListBase;
exports._MatSelectionListMixinBase = core_2.mixinDisableRipple(MatSelectionListBase);
/** @docs-private */
var /** @docs-private */
MatListOptionBase = /** @class */ (function () {
    function MatListOptionBase() {
    }
    return MatListOptionBase;
}());
exports.MatListOptionBase = MatListOptionBase;
exports._MatListOptionMixinBase = core_2.mixinDisableRipple(MatListOptionBase);
/** @docs-private */
exports.MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MatSelectionList; }),
    multi: true
};
/** Change event that is being fired whenever the selected state of an option changes. */
var /** Change event that is being fired whenever the selected state of an option changes. */
MatSelectionListChange = /** @class */ (function () {
    function MatSelectionListChange(/** Reference to the selection list that emitted the event. */
    source, /** Reference to the option that has been changed. */
    option) {
        this.source = source;
        this.option = option;
    }
    return MatSelectionListChange;
}());
exports.MatSelectionListChange = MatSelectionListChange;
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var MatListOption = /** @class */ (function (_super) {
    __extends(MatListOption, _super);
    function MatListOption(_element, _changeDetector, /** @docs-private */
    selectionList) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this._changeDetector = _changeDetector;
        _this.selectionList = selectionList;
        _this._selected = false;
        _this._disabled = false;
        /** Whether the option has focus. */
        _this._hasFocus = false;
        /** Whether the label should appear before or after the checkbox. Defaults to 'after' */
        _this.checkboxPosition = 'after';
        return _this;
    }
    Object.defineProperty(MatListOption.prototype, "disabled", {
        get: /** Whether the option is disabled. */
        function () { return this._disabled || (this.selectionList && this.selectionList.disabled); },
        set: function (value) {
            var newValue = coercion_1.coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatListOption.prototype, "selected", {
        get: /** Whether the option is selected. */
        function () { return this.selectionList.selectedOptions.isSelected(this); },
        set: function (value) {
            var isSelected = coercion_1.coerceBooleanProperty(value);
            if (isSelected !== this._selected) {
                this._setSelected(isSelected);
                this.selectionList._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    MatListOption.prototype.ngOnInit = function () {
        var _this = this;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        var wasSelected = this._selected;
        Promise.resolve().then(function () {
            if (_this._selected || wasSelected) {
                _this.selected = true;
                _this._changeDetector.markForCheck();
            }
        });
    };
    MatListOption.prototype.ngAfterContentInit = function () {
        // TODO: consider turning the setter into a function, it doesn't do anything as a class.
        // tslint:disable-next-line:no-unused-expression
        new core_2.MatLineSetter(this._lines, this._element);
    };
    MatListOption.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        this.selectionList._removeOptionFromList(this);
    };
    /** Toggles the selection state of the option. */
    /** Toggles the selection state of the option. */
    MatListOption.prototype.toggle = /** Toggles the selection state of the option. */
    function () {
        this.selected = !this.selected;
    };
    /** Allows for programmatic focusing of the option. */
    /** Allows for programmatic focusing of the option. */
    MatListOption.prototype.focus = /** Allows for programmatic focusing of the option. */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    /**
       * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
       * @docs-private
       */
    MatListOption.prototype.getLabel = /**
       * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
       * @docs-private
       */
    function () {
        return this._text ? this._text.nativeElement.textContent : '';
    };
    /** Whether this list item should show a ripple effect when clicked. */
    /** Whether this list item should show a ripple effect when clicked. */
    MatListOption.prototype._isRippleDisabled = /** Whether this list item should show a ripple effect when clicked. */
    function () {
        return this.disabled || this.disableRipple || this.selectionList.disableRipple;
    };
    MatListOption.prototype._handleClick = function () {
        if (!this.disabled) {
            this.toggle();
            // Emit a change event if the selected state of the option changed through user interaction.
            this.selectionList._emitChangeEvent(this);
        }
    };
    MatListOption.prototype._handleFocus = function () {
        this._hasFocus = true;
        this.selectionList._setFocusedOption(this);
    };
    MatListOption.prototype._handleBlur = function () {
        this._hasFocus = false;
        this.selectionList._onTouched();
    };
    /** Retrieves the DOM element of the component host. */
    /** Retrieves the DOM element of the component host. */
    MatListOption.prototype._getHostElement = /** Retrieves the DOM element of the component host. */
    function () {
        return this._element.nativeElement;
    };
    /** Sets the selected state of the option. Returns whether the value has changed. */
    /** Sets the selected state of the option. Returns whether the value has changed. */
    MatListOption.prototype._setSelected = /** Sets the selected state of the option. Returns whether the value has changed. */
    function (selected) {
        if (selected === this._selected) {
            return false;
        }
        this._selected = selected;
        if (selected) {
            this.selectionList.selectedOptions.select(this);
        }
        else {
            this.selectionList.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
        return true;
    };
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
     * used to trigger an update of the list option if the disabled state of the selection list
     * changed.
     */
    /**
       * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
       * used to trigger an update of the list option if the disabled state of the selection list
       * changed.
       */
    MatListOption.prototype._markForCheck = /**
       * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
       * used to trigger an update of the list option if the disabled state of the selection list
       * changed.
       */
    function () {
        this._changeDetector.markForCheck();
    };
    MatListOption.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-list-option',
                    exportAs: 'matListOption',
                    inputs: ['disableRipple'],
                    host: {
                        'role': 'option',
                        'class': 'mat-list-item mat-list-option',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()',
                        'tabindex': '-1',
                        '[class.mat-list-item-disabled]': 'disabled',
                        '[class.mat-list-item-focus]': '_hasFocus',
                        '[class.mat-list-item-with-avatar]': '_avatar',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    template: "<div class=\"mat-list-item-content\" [class.mat-list-item-content-reverse]=\"checkboxPosition == 'after'\"><div mat-ripple class=\"mat-list-item-ripple\" [matRippleTrigger]=\"_getHostElement()\" [matRippleDisabled]=\"_isRippleDisabled()\"></div><mat-pseudo-checkbox [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></mat-pseudo-checkbox><div class=\"mat-list-text\" #text><ng-content></ng-content></div><ng-content select=\"[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]\"></ng-content></div>",
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatListOption.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: MatSelectionList, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return MatSelectionList; }),] },] },
    ]; };
    MatListOption.propDecorators = {
        "_avatar": [{ type: core_1.ContentChild, args: [list_1.MatListAvatarCssMatStyler,] },],
        "_lines": [{ type: core_1.ContentChildren, args: [core_2.MatLine,] },],
        "_text": [{ type: core_1.ViewChild, args: ['text',] },],
        "checkboxPosition": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
    };
    return MatListOption;
}(exports._MatListOptionMixinBase));
exports.MatListOption = MatListOption;
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
var MatSelectionList = /** @class */ (function (_super) {
    __extends(MatSelectionList, _super);
    function MatSelectionList(_element, tabIndex) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        /** Emits a change event whenever the selected state of an option changes. */
        _this.selectionChange = new core_1.EventEmitter();
        /** Tabindex of the selection list. */
        _this.tabIndex = 0;
        _this._disabled = false;
        /** The currently selected options. */
        _this.selectedOptions = new collections_1.SelectionModel(true);
        /** View to model callback that should be called whenever the selected options change. */
        _this._onChange = function (_) { };
        /** Subscription to sync value changes in the SelectionModel back to the SelectionList. */
        _this._modelChanges = rxjs_1.Subscription.EMPTY;
        /** View to model callback that should be called if the list or its options lost focus. */
        _this._onTouched = function () { };
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(MatSelectionList.prototype, "disabled", {
        get: /** Whether the selection list is disabled. */
        function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
            // The `MatSelectionList` and `MatListOption` are using the `OnPush` change detection
            // strategy. Therefore the options will not check for any changes if the `MatSelectionList`
            // changed its state. Since we know that a change to `disabled` property of the list affects
            // the state of the options, we manually mark each option for check.
            if (this.options) {
                this.options.forEach(function (option) { return option._markForCheck(); });
            }
        },
        enumerable: true,
        configurable: true
    });
    MatSelectionList.prototype.ngAfterContentInit = function () {
        this._keyManager = new a11y_1.FocusKeyManager(this.options)
            .withWrap()
            .withTypeAhead()
            .skipPredicate(function () { return false; });
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
        // Sync external changes to the model back to the options.
        this._modelChanges = this.selectedOptions.onChange.subscribe(function (event) {
            if (event.added) {
                for (var _i = 0, _a = event.added; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.selected = true;
                }
            }
            if (event.removed) {
                for (var _b = 0, _c = event.removed; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.selected = false;
                }
            }
        });
    };
    MatSelectionList.prototype.ngOnDestroy = function () {
        this._modelChanges.unsubscribe();
    };
    /** Focuses the last active list option. */
    /** Focuses the last active list option. */
    MatSelectionList.prototype.focus = /** Focuses the last active list option. */
    function () {
        this._element.nativeElement.focus();
    };
    /** Selects all of the options. */
    /** Selects all of the options. */
    MatSelectionList.prototype.selectAll = /** Selects all of the options. */
    function () {
        this._setAllOptionsSelected(true);
    };
    /** Deselects all of the options. */
    /** Deselects all of the options. */
    MatSelectionList.prototype.deselectAll = /** Deselects all of the options. */
    function () {
        this._setAllOptionsSelected(false);
    };
    /** Sets the focused option of the selection-list. */
    /** Sets the focused option of the selection-list. */
    MatSelectionList.prototype._setFocusedOption = /** Sets the focused option of the selection-list. */
    function (option) {
        this._keyManager.updateActiveItemIndex(this._getOptionIndex(option));
    };
    /** Removes an option from the selection list and updates the active item. */
    /** Removes an option from the selection list and updates the active item. */
    MatSelectionList.prototype._removeOptionFromList = /** Removes an option from the selection list and updates the active item. */
    function (option) {
        if (option._hasFocus) {
            var optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    };
    /** Passes relevant key presses to our key manager. */
    /** Passes relevant key presses to our key manager. */
    MatSelectionList.prototype._keydown = /** Passes relevant key presses to our key manager. */
    function (event) {
        var keyCode = event.keyCode;
        var manager = this._keyManager;
        var previousFocusIndex = manager.activeItemIndex;
        switch (keyCode) {
            case keycodes_1.SPACE:
            case keycodes_1.ENTER:
                this._toggleFocusedOption();
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            case keycodes_1.HOME:
            case keycodes_1.END:
                keyCode === keycodes_1.HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
                event.preventDefault();
                break;
            case keycodes_1.A:
                if (event.ctrlKey) {
                    this.options.find(function (option) { return !option.selected; }) ? this.selectAll() : this.deselectAll();
                    event.preventDefault();
                }
                break;
            default:
                manager.onKeydown(event);
        }
        if ((keyCode === keycodes_1.UP_ARROW || keyCode === keycodes_1.DOWN_ARROW) && event.shiftKey &&
            manager.activeItemIndex !== previousFocusIndex) {
            this._toggleFocusedOption();
        }
    };
    /** Reports a value change to the ControlValueAccessor */
    /** Reports a value change to the ControlValueAccessor */
    MatSelectionList.prototype._reportValueChange = /** Reports a value change to the ControlValueAccessor */
    function () {
        if (this.options) {
            this._onChange(this._getSelectedOptionValues());
        }
    };
    /** Emits a change event if the selected state of an option changed. */
    /** Emits a change event if the selected state of an option changed. */
    MatSelectionList.prototype._emitChangeEvent = /** Emits a change event if the selected state of an option changed. */
    function (option) {
        this.selectionChange.emit(new MatSelectionListChange(this, option));
    };
    /** Implemented as part of ControlValueAccessor. */
    /** Implemented as part of ControlValueAccessor. */
    MatSelectionList.prototype.writeValue = /** Implemented as part of ControlValueAccessor. */
    function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    /** Implemented as a part of ControlValueAccessor. */
    /** Implemented as a part of ControlValueAccessor. */
    MatSelectionList.prototype.setDisabledState = /** Implemented as a part of ControlValueAccessor. */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** Implemented as part of ControlValueAccessor. */
    /** Implemented as part of ControlValueAccessor. */
    MatSelectionList.prototype.registerOnChange = /** Implemented as part of ControlValueAccessor. */
    function (fn) {
        this._onChange = fn;
    };
    /** Implemented as part of ControlValueAccessor. */
    /** Implemented as part of ControlValueAccessor. */
    MatSelectionList.prototype.registerOnTouched = /** Implemented as part of ControlValueAccessor. */
    function (fn) {
        this._onTouched = fn;
    };
    /** Sets the selected options based on the specified values. */
    /** Sets the selected options based on the specified values. */
    MatSelectionList.prototype._setOptionsFromValues = /** Sets the selected options based on the specified values. */
    function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option._setSelected(false); });
        values
            .map(function (value) {
            return _this.options.find(function (option) {
                return _this.compareWith ? _this.compareWith(option.value, value) : option.value === value;
            });
        })
            .filter(Boolean)
            .forEach(function (option) { return option._setSelected(true); });
    };
    /** Returns the values of the selected options. */
    /** Returns the values of the selected options. */
    MatSelectionList.prototype._getSelectedOptionValues = /** Returns the values of the selected options. */
    function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    /** Toggles the state of the currently focused option if enabled. */
    /** Toggles the state of the currently focused option if enabled. */
    MatSelectionList.prototype._toggleFocusedOption = /** Toggles the state of the currently focused option if enabled. */
    function () {
        var focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && !focusedOption.disabled) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user
                // interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     */
    /**
       * Sets the selected state on all of the options
       * and emits an event if anything changed.
       */
    MatSelectionList.prototype._setAllOptionsSelected = /**
       * Sets the selected state on all of the options
       * and emits an event if anything changed.
       */
    function (isSelected) {
        // Keep track of whether anything changed, because we only want to
        // emit the changed event when something actually changed.
        var hasChanged = false;
        this.options.forEach(function (option) {
            if (option._setSelected(isSelected)) {
                hasChanged = true;
            }
        });
        if (hasChanged) {
            this._reportValueChange();
        }
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    /**
       * Utility to ensure all indexes are valid.
       * @param index The index to be checked.
       * @returns True if the index is valid for our list of options.
       */
    MatSelectionList.prototype._isValidIndex = /**
       * Utility to ensure all indexes are valid.
       * @param index The index to be checked.
       * @returns True if the index is valid for our list of options.
       */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    /** Returns the index of the specified list option. */
    /** Returns the index of the specified list option. */
    MatSelectionList.prototype._getOptionIndex = /** Returns the index of the specified list option. */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    MatSelectionList.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-selection-list',
                    exportAs: 'matSelectionList',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'listbox',
                        '[tabIndex]': 'tabIndex',
                        'class': 'mat-selection-list',
                        '(focus)': 'focus()',
                        '(blur)': '_onTouched()',
                        '(keydown)': '_keydown($event)',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    template: '<ng-content></ng-content>',
                    styles: [".mat-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mat-divider.mat-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}.mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{margin:0}.mat-list,.mat-nav-list,.mat-selection-list{padding-top:8px;display:block;-webkit-tap-highlight-color:transparent}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{height:48px;line-height:16px}.mat-list .mat-subheader:first-child,.mat-nav-list .mat-subheader:first-child,.mat-selection-list .mat-subheader:first-child{margin-top:-8px}.mat-list .mat-list-item,.mat-list .mat-list-option,.mat-nav-list .mat-list-item,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-item,.mat-selection-list .mat-list-option{display:block;height:48px;-webkit-tap-highlight-color:transparent}.mat-list .mat-list-item .mat-list-item-content,.mat-list .mat-list-option .mat-list-item-content,.mat-nav-list .mat-list-item .mat-list-item-content,.mat-nav-list .mat-list-option .mat-list-item-content,.mat-selection-list .mat-list-item .mat-list-item-content,.mat-selection-list .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list .mat-list-item .mat-list-item-content-reverse,.mat-list .mat-list-option .mat-list-item-content-reverse,.mat-nav-list .mat-list-item .mat-list-item-content-reverse,.mat-nav-list .mat-list-option .mat-list-item-content-reverse,.mat-selection-list .mat-list-item .mat-list-item-content-reverse,.mat-selection-list .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list .mat-list-item .mat-list-item-ripple,.mat-list .mat-list-option .mat-list-item-ripple,.mat-nav-list .mat-list-item .mat-list-item-ripple,.mat-nav-list .mat-list-option .mat-list-item-ripple,.mat-selection-list .mat-list-item .mat-list-item-ripple,.mat-selection-list .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list .mat-list-item.mat-list-item-with-avatar,.mat-list .mat-list-option.mat-list-item-with-avatar,.mat-nav-list .mat-list-item.mat-list-item-with-avatar,.mat-nav-list .mat-list-option.mat-list-item-with-avatar,.mat-selection-list .mat-list-item.mat-list-item-with-avatar,.mat-selection-list .mat-list-option.mat-list-item-with-avatar{height:56px}.mat-list .mat-list-item.mat-2-line,.mat-list .mat-list-option.mat-2-line,.mat-nav-list .mat-list-item.mat-2-line,.mat-nav-list .mat-list-option.mat-2-line,.mat-selection-list .mat-list-item.mat-2-line,.mat-selection-list .mat-list-option.mat-2-line{height:72px}.mat-list .mat-list-item.mat-3-line,.mat-list .mat-list-option.mat-3-line,.mat-nav-list .mat-list-item.mat-3-line,.mat-nav-list .mat-list-option.mat-3-line,.mat-selection-list .mat-list-item.mat-3-line,.mat-selection-list .mat-list-option.mat-3-line{height:88px}.mat-list .mat-list-item.mat-multi-line,.mat-list .mat-list-option.mat-multi-line,.mat-nav-list .mat-list-item.mat-multi-line,.mat-nav-list .mat-list-option.mat-multi-line,.mat-selection-list .mat-list-item.mat-multi-line,.mat-selection-list .mat-list-option.mat-multi-line{height:auto}.mat-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list .mat-list-item .mat-list-text,.mat-list .mat-list-option .mat-list-text,.mat-nav-list .mat-list-item .mat-list-text,.mat-nav-list .mat-list-option .mat-list-text,.mat-selection-list .mat-list-item .mat-list-text,.mat-selection-list .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mat-list .mat-list-item .mat-list-text>*,.mat-list .mat-list-option .mat-list-text>*,.mat-nav-list .mat-list-item .mat-list-text>*,.mat-nav-list .mat-list-option .mat-list-text>*,.mat-selection-list .mat-list-item .mat-list-text>*,.mat-selection-list .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list .mat-list-item .mat-list-text:empty,.mat-list .mat-list-option .mat-list-text:empty,.mat-nav-list .mat-list-item .mat-list-text:empty,.mat-nav-list .mat-list-option .mat-list-text:empty,.mat-selection-list .mat-list-item .mat-list-text:empty,.mat-selection-list .mat-list-option .mat-list-text:empty{display:none}.mat-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-nav-list .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-nav-list .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-selection-list .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-selection-list .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-nav-list .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-nav-list .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-selection-list .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-selection-list .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:16px;padding-left:16px}.mat-list .mat-list-item .mat-list-avatar,.mat-list .mat-list-option .mat-list-avatar,.mat-nav-list .mat-list-item .mat-list-avatar,.mat-nav-list .mat-list-option .mat-list-avatar,.mat-selection-list .mat-list-item .mat-list-avatar,.mat-selection-list .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list .mat-list-option .mat-list-avatar~.mat-divider-inset,.mat-nav-list .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-nav-list .mat-list-option .mat-list-avatar~.mat-divider-inset,.mat-selection-list .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-selection-list .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .mat-list .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list .mat-list-option .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-nav-list .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-nav-list .mat-list-option .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-selection-list .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-selection-list .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:72px}.mat-list .mat-list-item .mat-list-icon,.mat-list .mat-list-option .mat-list-icon,.mat-nav-list .mat-list-item .mat-list-icon,.mat-nav-list .mat-list-option .mat-list-icon,.mat-selection-list .mat-list-item .mat-list-icon,.mat-selection-list .mat-list-option .mat-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list .mat-list-option .mat-list-icon~.mat-divider-inset,.mat-nav-list .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-nav-list .mat-list-option .mat-list-icon~.mat-divider-inset,.mat-selection-list .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-selection-list .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .mat-list .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list .mat-list-option .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-nav-list .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-nav-list .mat-list-option .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-selection-list .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-selection-list .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:64px}.mat-list .mat-list-item .mat-divider,.mat-list .mat-list-option .mat-divider,.mat-nav-list .mat-list-item .mat-divider,.mat-nav-list .mat-list-option .mat-divider,.mat-selection-list .mat-list-item .mat-divider,.mat-selection-list .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list .mat-list-item .mat-divider,[dir=rtl] .mat-list .mat-list-option .mat-divider,[dir=rtl] .mat-nav-list .mat-list-item .mat-divider,[dir=rtl] .mat-nav-list .mat-list-option .mat-divider,[dir=rtl] .mat-selection-list .mat-list-item .mat-divider,[dir=rtl] .mat-selection-list .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list .mat-list-item .mat-divider.mat-divider-inset,.mat-list .mat-list-option .mat-divider.mat-divider-inset,.mat-nav-list .mat-list-item .mat-divider.mat-divider-inset,.mat-nav-list .mat-list-option .mat-divider.mat-divider-inset,.mat-selection-list .mat-list-item .mat-divider.mat-divider-inset,.mat-selection-list .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-list[dense],.mat-nav-list[dense],.mat-selection-list[dense]{padding-top:4px;display:block}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{height:40px;line-height:8px}.mat-list[dense] .mat-subheader:first-child,.mat-nav-list[dense] .mat-subheader:first-child,.mat-selection-list[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list[dense] .mat-list-item,.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-option{display:block;height:40px;-webkit-tap-highlight-color:transparent}.mat-list[dense] .mat-list-item .mat-list-item-content,.mat-list[dense] .mat-list-option .mat-list-item-content,.mat-nav-list[dense] .mat-list-item .mat-list-item-content,.mat-nav-list[dense] .mat-list-option .mat-list-item-content,.mat-selection-list[dense] .mat-list-item .mat-list-item-content,.mat-selection-list[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list[dense] .mat-list-item .mat-list-item-ripple,.mat-list[dense] .mat-list-option .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-item .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-option .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-item .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list[dense] .mat-list-item.mat-list-item-with-avatar,.mat-list[dense] .mat-list-option.mat-list-item-with-avatar,.mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar,.mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar,.mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar,.mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar{height:48px}.mat-list[dense] .mat-list-item.mat-2-line,.mat-list[dense] .mat-list-option.mat-2-line,.mat-nav-list[dense] .mat-list-item.mat-2-line,.mat-nav-list[dense] .mat-list-option.mat-2-line,.mat-selection-list[dense] .mat-list-item.mat-2-line,.mat-selection-list[dense] .mat-list-option.mat-2-line{height:60px}.mat-list[dense] .mat-list-item.mat-3-line,.mat-list[dense] .mat-list-option.mat-3-line,.mat-nav-list[dense] .mat-list-item.mat-3-line,.mat-nav-list[dense] .mat-list-option.mat-3-line,.mat-selection-list[dense] .mat-list-item.mat-3-line,.mat-selection-list[dense] .mat-list-option.mat-3-line{height:76px}.mat-list[dense] .mat-list-item.mat-multi-line,.mat-list[dense] .mat-list-option.mat-multi-line,.mat-nav-list[dense] .mat-list-item.mat-multi-line,.mat-nav-list[dense] .mat-list-option.mat-multi-line,.mat-selection-list[dense] .mat-list-item.mat-multi-line,.mat-selection-list[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list[dense] .mat-list-item .mat-list-text,.mat-list[dense] .mat-list-option .mat-list-text,.mat-nav-list[dense] .mat-list-item .mat-list-text,.mat-nav-list[dense] .mat-list-option .mat-list-text,.mat-selection-list[dense] .mat-list-item .mat-list-text,.mat-selection-list[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mat-list[dense] .mat-list-item .mat-list-text>*,.mat-list[dense] .mat-list-option .mat-list-text>*,.mat-nav-list[dense] .mat-list-item .mat-list-text>*,.mat-nav-list[dense] .mat-list-option .mat-list-text>*,.mat-selection-list[dense] .mat-list-item .mat-list-text>*,.mat-selection-list[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list[dense] .mat-list-item .mat-list-text:empty,.mat-list[dense] .mat-list-option .mat-list-text:empty,.mat-nav-list[dense] .mat-list-item .mat-list-text:empty,.mat-nav-list[dense] .mat-list-option .mat-list-text:empty,.mat-selection-list[dense] .mat-list-item .mat-list-text:empty,.mat-selection-list[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-nav-list[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-nav-list[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-selection-list[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-selection-list[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-nav-list[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-nav-list[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-selection-list[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-selection-list[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-nav-list[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-selection-list[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-nav-list[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-selection-list[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:16px;padding-left:16px}.mat-list[dense] .mat-list-item .mat-list-avatar,.mat-list[dense] .mat-list-option .mat-list-avatar,.mat-nav-list[dense] .mat-list-item .mat-list-avatar,.mat-nav-list[dense] .mat-list-option .mat-list-avatar,.mat-selection-list[dense] .mat-list-item .mat-list-avatar,.mat-selection-list[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%}.mat-list[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset,.mat-nav-list[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-nav-list[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset,.mat-selection-list[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-selection-list[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .mat-list[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-nav-list[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-nav-list[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-selection-list[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-selection-list[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:68px}.mat-list[dense] .mat-list-item .mat-list-icon,.mat-list[dense] .mat-list-option .mat-list-icon,.mat-nav-list[dense] .mat-list-item .mat-list-icon,.mat-nav-list[dense] .mat-list-option .mat-list-icon,.mat-selection-list[dense] .mat-list-item .mat-list-icon,.mat-selection-list[dense] .mat-list-option .mat-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list[dense] .mat-list-option .mat-list-icon~.mat-divider-inset,.mat-nav-list[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-nav-list[dense] .mat-list-option .mat-list-icon~.mat-divider-inset,.mat-selection-list[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-selection-list[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .mat-list[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list[dense] .mat-list-option .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-nav-list[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-nav-list[dense] .mat-list-option .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-selection-list[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-selection-list[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:60px}.mat-list[dense] .mat-list-item .mat-divider,.mat-list[dense] .mat-list-option .mat-divider,.mat-nav-list[dense] .mat-list-item .mat-divider,.mat-nav-list[dense] .mat-list-option .mat-divider,.mat-selection-list[dense] .mat-list-item .mat-divider,.mat-selection-list[dense] .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-list[dense] .mat-list-option .mat-divider,[dir=rtl] .mat-nav-list[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-nav-list[dense] .mat-list-option .mat-divider,[dir=rtl] .mat-selection-list[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-selection-list[dense] .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-list[dense] .mat-list-option .mat-divider.mat-divider-inset,.mat-nav-list[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-nav-list[dense] .mat-list-option .mat-divider.mat-divider-inset,.mat-selection-list[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-selection-list[dense] .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item{cursor:pointer;outline:0}.mat-list-option:not(.mat-list-item-disabled){cursor:pointer;outline:0}@media (hover:none){.mat-list-option:hover,.mat-nav-list .mat-list-item:hover{background:0 0}}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    providers: [exports.MAT_SELECTION_LIST_VALUE_ACCESSOR],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatSelectionList.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['tabindex',] },] },
    ]; };
    MatSelectionList.propDecorators = {
        "options": [{ type: core_1.ContentChildren, args: [MatListOption,] },],
        "selectionChange": [{ type: core_1.Output },],
        "tabIndex": [{ type: core_1.Input },],
        "compareWith": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
    };
    return MatSelectionList;
}(exports._MatSelectionListMixinBase));
exports.MatSelectionList = MatSelectionList;
//# sourceMappingURL=selection-list.js.map