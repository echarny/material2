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
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var collections_1 = require("@angular/cdk/collections");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var chip_1 = require("./chip");
// Boilerplate for applying mixins to MatChipList.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatChipList.
/** @docs-private */
MatChipListBase = /** @class */ (function () {
    function MatChipListBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, /** @docs-private */
    ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return MatChipListBase;
}());
exports.MatChipListBase = MatChipListBase;
exports._MatChipListMixinBase = core_2.mixinErrorState(MatChipListBase);
// Increasing integer for generating unique ids for chip-list components.
var nextUniqueId = 0;
/** Change event object that is emitted when the chip list value has changed. */
var /** Change event object that is emitted when the chip list value has changed. */
MatChipListChange = /** @class */ (function () {
    function MatChipListChange(/** Chip list that emitted the event. */
    source, /** Value of the chip list when the event was emitted. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatChipListChange;
}());
exports.MatChipListChange = MatChipListChange;
/**
 * A material design chips component (named ChipList for it's similarity to the List component).
 */
var MatChipList = /** @class */ (function (_super) {
    __extends(MatChipList, _super);
    function MatChipList(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, /** @docs-private */
    ngControl) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._dir = _dir;
        _this.ngControl = ngControl;
        /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        _this.controlType = 'mat-chip-list';
        /** When a chip is destroyed, we track the index so we can focus the appropriate next chip. */
        _this._lastDestroyedIndex = null;
        /** Track which chips we're listening to for focus/destruction. */
        _this._chipSet = new WeakMap();
        /** Subscription to tabbing out from the chip list. */
        _this._tabOutSubscription = rxjs_1.Subscription.EMPTY;
        /** Uid of the chip list */
        _this._uid = "mat-chip-list-" + nextUniqueId++;
        /** Tab index for the chip list. */
        _this._tabIndex = 0;
        /**
           * User defined tab index.
           * When it is not null, use user defined tab index. Otherwise use _tabIndex
           */
        _this._userTabIndex = null;
        /** Function when touched */
        _this._onTouched = function () { };
        /** Function when changed */
        _this._onChange = function () { };
        _this._multiple = false;
        _this._compareWith = function (o1, o2) { return o1 === o2; };
        _this._required = false;
        _this._disabled = false;
        /** Orientation of the chip list. */
        _this.ariaOrientation = 'horizontal';
        _this._selectable = true;
        /** Event emitted when the selected chip list value has been changed by the user. */
        _this.change = new core_1.EventEmitter();
        /**
           * Event that emits whenever the raw value of the chip-list changes. This is here primarily
           * to facilitate the two-way binding for the `value` input.
           * @docs-private
           */
        _this.valueChange = new core_1.EventEmitter();
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(MatChipList.prototype, "selected", {
        /** The array of selected chips inside chip list. */
        get: /** The array of selected chips inside chip list. */
        function () {
            return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "role", {
        /** The ARIA role applied to the chip list. */
        get: /** The ARIA role applied to the chip list. */
        function () { return this.empty ? null : 'listbox'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "multiple", {
        get: /** Whether the user should be allowed to select multiple chips. */
        function () { return this._multiple; },
        set: function (value) {
            this._multiple = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "compareWith", {
        get: /**
           * A function to compare the option values with the selected values. The first argument
           * is a value from an option. The second is a value from the selection. A boolean
           * should be returned.
           */
        function () { return this._compareWith; },
        set: function (fn) {
            this._compareWith = fn;
            if (this._selectionModel) {
                // A different comparator means the selection could change.
                this._initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "value", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this._value; },
        set: function (value) {
            this.writeValue(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "id", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () {
            return this._chipInput ? this._chipInput.id : this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "required", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this._required; },
        set: function (value) {
            this._required = coercion_1.coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "placeholder", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () {
            return this._chipInput ? this._chipInput.placeholder : this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "focused", {
        /** Whether any chips or the matChipInput inside of this chip-list has focus. */
        get: /** Whether any chips or the matChipInput inside of this chip-list has focus. */
        function () {
            return (this._chipInput && this._chipInput.focused) || this.chips.some(function (chip) { return chip._hasFocus; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "empty", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () {
            return (!this._chipInput || this._chipInput.empty) && this.chips.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return !this.empty || this.focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "disabled", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this.ngControl ? !!this.ngControl.disabled : this._disabled; },
        set: function (value) { this._disabled = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "selectable", {
        get: /**
           * Whether or not this chip list is selectable. When a chip list is not selectable,
           * the selected states for all the chips inside the chip list are always ignored.
           */
        function () { return this._selectable; },
        set: function (value) {
            var _this = this;
            this._selectable = coercion_1.coerceBooleanProperty(value);
            if (this.chips) {
                this.chips.forEach(function (chip) { return chip.chipListSelectable = _this._selectable; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "tabIndex", {
        set: function (value) {
            this._userTabIndex = value;
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipSelectionChanges", {
        /** Combined stream of all of the child chips' selection change events. */
        get: /** Combined stream of all of the child chips' selection change events. */
        function () {
            return rxjs_1.merge.apply(void 0, this.chips.map(function (chip) { return chip.selectionChange; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipFocusChanges", {
        /** Combined stream of all of the child chips' focus change events. */
        get: /** Combined stream of all of the child chips' focus change events. */
        function () {
            return rxjs_1.merge.apply(void 0, this.chips.map(function (chip) { return chip._onFocus; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipBlurChanges", {
        /** Combined stream of all of the child chips' blur change events. */
        get: /** Combined stream of all of the child chips' blur change events. */
        function () {
            return rxjs_1.merge.apply(void 0, this.chips.map(function (chip) { return chip._onBlur; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipRemoveChanges", {
        /** Combined stream of all of the child chips' remove change events. */
        get: /** Combined stream of all of the child chips' remove change events. */
        function () {
            return rxjs_1.merge.apply(void 0, this.chips.map(function (chip) { return chip.destroyed; }));
        },
        enumerable: true,
        configurable: true
    });
    MatChipList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._keyManager = new a11y_1.FocusKeyManager(this.chips)
            .withWrap()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
        // Prevents the chip list from capturing focus and redirecting
        // it back to the first chip when the user tabs out.
        this._tabOutSubscription = this._keyManager.tabOut.subscribe(function () {
            _this._tabIndex = -1;
            setTimeout(function () { return _this._tabIndex = _this._userTabIndex || 0; });
        });
        // When the list changes, re-subscribe
        this._changeSubscription = this.chips.changes.pipe(operators_1.startWith(null)).subscribe(function () {
            _this._resetChips();
            // Reset chips selected/deselected status
            // Reset chips selected/deselected status
            _this._initializeSelection();
            // Check to see if we need to update our tab index
            // Check to see if we need to update our tab index
            _this._updateTabIndex();
            // Check to see if we have a destroyed chip and need to refocus
            // Check to see if we have a destroyed chip and need to refocus
            _this._updateFocusForDestroyedChips();
            _this.stateChanges.next();
        });
    };
    MatChipList.prototype.ngOnInit = function () {
        this._selectionModel = new collections_1.SelectionModel(this.multiple, undefined, false);
        this.stateChanges.next();
    };
    MatChipList.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    MatChipList.prototype.ngOnDestroy = function () {
        this._tabOutSubscription.unsubscribe();
        if (this._changeSubscription) {
            this._changeSubscription.unsubscribe();
        }
        if (this._chipRemoveSubscription) {
            this._chipRemoveSubscription.unsubscribe();
        }
        this._dropSubscriptions();
        this.stateChanges.complete();
    };
    /** Associates an HTML input element with this chip list. */
    /** Associates an HTML input element with this chip list. */
    MatChipList.prototype.registerInput = /** Associates an HTML input element with this chip list. */
    function (inputElement) {
        this._chipInput = inputElement;
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    MatChipList.prototype.setDescribedByIds = /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    function (ids) { this._ariaDescribedby = ids.join(' '); };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    function (value) {
        if (this.chips) {
            this._setSelectionByValue(value, false);
        }
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatChipList.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    function (isDisabled) {
        this.disabled = isDisabled;
        this._elementRef.nativeElement.disabled = isDisabled;
        this.stateChanges.next();
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    MatChipList.prototype.onContainerClick = /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    function () { this.focus(); };
    /**
     * Focuses the the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    /**
       * Focuses the the first non-disabled chip in this chip list, or the associated input when there
       * are no eligible chips.
       */
    MatChipList.prototype.focus = /**
       * Focuses the the first non-disabled chip in this chip list, or the associated input when there
       * are no eligible chips.
       */
    function () {
        // TODO: ARIA says this should focus the first `selected` chip if any are selected.
        // Focus on first element if there's no chipInput inside chip-list
        if (this._chipInput && this._chipInput.focused) {
            // do nothing
        }
        else if (this.chips.length > 0) {
            this._keyManager.setFirstItemActive();
            this.stateChanges.next();
        }
        else {
            this._focusInput();
            this.stateChanges.next();
        }
    };
    /** Attempt to focus an input if we have one. */
    /** Attempt to focus an input if we have one. */
    MatChipList.prototype._focusInput = /** Attempt to focus an input if we have one. */
    function () {
        if (this._chipInput) {
            this._chipInput.focus();
        }
    };
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    /**
       * Pass events to the keyboard manager. Available here for tests.
       */
    MatChipList.prototype._keydown = /**
       * Pass events to the keyboard manager. Available here for tests.
       */
    function (event) {
        var target = event.target;
        // If they are on an empty input and hit backspace, focus the last chip
        if (event.keyCode === keycodes_1.BACKSPACE && this._isInputEmpty(target)) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else if (target && target.classList.contains('mat-chip')) {
            this._keyManager.onKeydown(event);
            this.stateChanges.next();
        }
    };
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    /**
       * Check the tab index as you should not be allowed to focus an empty list.
       */
    MatChipList.prototype._updateTabIndex = /**
       * Check the tab index as you should not be allowed to focus an empty list.
       */
    function () {
        // If we have 0 chips, we should not allow keyboard focus
        this._tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
    };
    /**
     * Update key manager's active item when chip is deleted.
     * If the deleted chip is the last chip in chip list, focus the new last chip.
     * Otherwise focus the next chip in the list.
     * Save `_lastDestroyedIndex` so we can set the correct focus.
     */
    /**
       * Update key manager's active item when chip is deleted.
       * If the deleted chip is the last chip in chip list, focus the new last chip.
       * Otherwise focus the next chip in the list.
       * Save `_lastDestroyedIndex` so we can set the correct focus.
       */
    MatChipList.prototype._updateKeyManager = /**
       * Update key manager's active item when chip is deleted.
       * If the deleted chip is the last chip in chip list, focus the new last chip.
       * Otherwise focus the next chip in the list.
       * Save `_lastDestroyedIndex` so we can set the correct focus.
       */
    function (chip) {
        var chipIndex = this.chips.toArray().indexOf(chip);
        if (this._isValidIndex(chipIndex)) {
            if (chip._hasFocus) {
                // Check whether the chip is not the last item
                if (chipIndex < this.chips.length - 1) {
                    this._keyManager.setActiveItem(chipIndex);
                }
                else if (chipIndex - 1 >= 0) {
                    this._keyManager.setActiveItem(chipIndex - 1);
                }
            }
            if (this._keyManager.activeItemIndex === chipIndex) {
                this._lastDestroyedIndex = chipIndex;
            }
        }
    };
    /**
     * Checks to see if a focus chip was recently destroyed so that we can refocus the next closest
     * one.
     */
    /**
       * Checks to see if a focus chip was recently destroyed so that we can refocus the next closest
       * one.
       */
    MatChipList.prototype._updateFocusForDestroyedChips = /**
       * Checks to see if a focus chip was recently destroyed so that we can refocus the next closest
       * one.
       */
    function () {
        var chipsArray = this.chips.toArray();
        if (this._lastDestroyedIndex != null && chipsArray.length > 0 && (this.focused ||
            (this._keyManager.activeItem && chipsArray.indexOf(this._keyManager.activeItem) === -1))) {
            // Check whether the destroyed chip was the last item
            var newFocusIndex = Math.min(this._lastDestroyedIndex, chipsArray.length - 1);
            this._keyManager.setActiveItem(newFocusIndex);
            var focusChip = this._keyManager.activeItem;
            // Focus the chip
            if (focusChip) {
                focusChip.focus();
            }
        }
        // Reset our destroyed index
        this._lastDestroyedIndex = null;
    };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    /**
       * Utility to ensure all indexes are valid.
       *
       * @param index The index to be checked.
       * @returns True if the index is valid for our list of chips.
       */
    MatChipList.prototype._isValidIndex = /**
       * Utility to ensure all indexes are valid.
       *
       * @param index The index to be checked.
       * @returns True if the index is valid for our list of chips.
       */
    function (index) {
        return index >= 0 && index < this.chips.length;
    };
    MatChipList.prototype._isInputEmpty = function (element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            var input = element;
            return !input.value;
        }
        return false;
    };
    MatChipList.prototype._setSelectionByValue = function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        this._clearSelection();
        this.chips.forEach(function (chip) { return chip.deselect(); });
        if (Array.isArray(value)) {
            value.forEach(function (currentValue) { return _this._selectValue(currentValue, isUserInput); });
            this._sortValues();
        }
        else {
            var correspondingChip = this._selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what chip the user interacted with last.
            if (correspondingChip) {
                if (isUserInput) {
                    this._keyManager.setActiveItem(correspondingChip);
                }
            }
        }
    };
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    /**
       * Finds and selects the chip based on its value.
       * @returns Chip that has the corresponding value.
       */
    MatChipList.prototype._selectValue = /**
       * Finds and selects the chip based on its value.
       * @returns Chip that has the corresponding value.
       */
    function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        var correspondingChip = this.chips.find(function (chip) {
            return chip.value != null && _this._compareWith(chip.value, value);
        });
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
            this._selectionModel.select(correspondingChip);
        }
        return correspondingChip;
    };
    MatChipList.prototype._initializeSelection = function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            if (_this.ngControl || _this._value) {
                _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value, false);
                _this.stateChanges.next();
            }
        });
    };
    /**
     * Deselects every chip in the list.
     * @param skip Chip that should not be deselected.
     */
    /**
       * Deselects every chip in the list.
       * @param skip Chip that should not be deselected.
       */
    MatChipList.prototype._clearSelection = /**
       * Deselects every chip in the list.
       * @param skip Chip that should not be deselected.
       */
    function (skip) {
        this._selectionModel.clear();
        this.chips.forEach(function (chip) {
            if (chip !== skip) {
                chip.deselect();
            }
        });
        this.stateChanges.next();
    };
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    /**
       * Sorts the model values, ensuring that they keep the same
       * order that they have in the panel.
       */
    MatChipList.prototype._sortValues = /**
       * Sorts the model values, ensuring that they keep the same
       * order that they have in the panel.
       */
    function () {
        var _this = this;
        if (this._multiple) {
            this._selectionModel.clear();
            this.chips.forEach(function (chip) {
                if (chip.selected) {
                    _this._selectionModel.select(chip);
                }
            });
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    /** Emits change event to set the model value. */
    MatChipList.prototype._propagateChanges = /** Emits change event to set the model value. */
    function (fallbackValue) {
        var valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(function (chip) { return chip.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new MatChipListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    };
    /** When blurred, mark the field as touched when focus moved outside the chip list. */
    /** When blurred, mark the field as touched when focus moved outside the chip list. */
    MatChipList.prototype._blur = /** When blurred, mark the field as touched when focus moved outside the chip list. */
    function () {
        var _this = this;
        this._keyManager.setActiveItem(-1);
        if (!this.disabled) {
            if (this._chipInput) {
                // If there's a chip input, we should check whether the focus moved to chip input.
                // If the focus is not moved to chip input, mark the field as touched. If the focus moved
                // to chip input, do nothing.
                // Timeout is needed to wait for the focus() event trigger on chip input.
                setTimeout(function () {
                    if (!_this.focused) {
                        _this._markAsTouched();
                    }
                });
            }
            else {
                // If there's no chip input, then mark the field as touched.
                this._markAsTouched();
            }
        }
    };
    /** Mark the field as touched */
    /** Mark the field as touched */
    MatChipList.prototype._markAsTouched = /** Mark the field as touched */
    function () {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    MatChipList.prototype._resetChips = function () {
        this._dropSubscriptions();
        this._listenToChipsFocus();
        this._listenToChipsSelection();
        this._listenToChipsRemoved();
    };
    MatChipList.prototype._dropSubscriptions = function () {
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipSelectionSubscription) {
            this._chipSelectionSubscription.unsubscribe();
            this._chipSelectionSubscription = null;
        }
    };
    /** Listens to user-generated selection events on each chip. */
    /** Listens to user-generated selection events on each chip. */
    MatChipList.prototype._listenToChipsSelection = /** Listens to user-generated selection events on each chip. */
    function () {
        var _this = this;
        this._chipSelectionSubscription = this.chipSelectionChanges.subscribe(function (event) {
            event.source.selected
                ? _this._selectionModel.select(event.source)
                : _this._selectionModel.deselect(event.source);
            // For single selection chip list, make sure the deselected value is unselected.
            if (!_this.multiple) {
                _this.chips.forEach(function (chip) {
                    if (!_this._selectionModel.isSelected(chip) && chip.selected) {
                        chip.deselect();
                    }
                });
            }
            if (event.isUserInput) {
                _this._propagateChanges();
            }
        });
    };
    /** Listens to user-generated selection events on each chip. */
    /** Listens to user-generated selection events on each chip. */
    MatChipList.prototype._listenToChipsFocus = /** Listens to user-generated selection events on each chip. */
    function () {
        var _this = this;
        this._chipFocusSubscription = this.chipFocusChanges.subscribe(function (event) {
            var chipIndex = _this.chips.toArray().indexOf(event.chip);
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveItemIndex(chipIndex);
            }
            _this.stateChanges.next();
        });
        this._chipBlurSubscription = this.chipBlurChanges.subscribe(function () {
            _this._blur();
            _this.stateChanges.next();
        });
    };
    MatChipList.prototype._listenToChipsRemoved = function () {
        var _this = this;
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(function (event) {
            _this._updateKeyManager(event.chip);
        });
    };
    MatChipList.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-chip-list',
                    template: "<div class=\"mat-chip-list-wrapper\"><ng-content></ng-content></div>",
                    exportAs: 'matChipList',
                    host: {
                        '[attr.tabindex]': '_tabIndex',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.role]': 'role',
                        '[class.mat-chip-list-disabled]': 'disabled',
                        '[class.mat-chip-list-invalid]': 'errorState',
                        '[class.mat-chip-list-required]': 'required',
                        '[attr.aria-orientation]': 'ariaOrientation',
                        'class': 'mat-chip-list',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [{ provide: form_field_1.MatFormFieldControl, useExisting: MatChipList }],
                    styles: [".mat-chip{position:relative;overflow:hidden;box-sizing:border-box;-webkit-tap-highlight-color:transparent}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:inline-flex;padding:7px 12px;border-radius:24px;align-items:center;cursor:default}.mat-standard-chip .mat-chip-remove.mat-icon{width:18px;height:18px}.mat-standard-chip:focus{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12);outline:0}@media screen and (-ms-high-contrast:active){.mat-standard-chip{outline:solid 1px}.mat-standard-chip:focus{outline:dotted 2px}}.mat-standard-chip.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:7px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:7px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:7px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:7px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:32px;height:32px;margin-right:8px;margin-left:0}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:0}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:7px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:7px;margin-left:0}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper .mat-standard-chip,.mat-chip-list-wrapper input.mat-input-element{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden}input.mat-chip-input{width:150px;margin:3px;flex:1 0 150px}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatChipList.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: forms_1.NgForm, decorators: [{ type: core_1.Optional },] },
        { type: forms_1.FormGroupDirective, decorators: [{ type: core_1.Optional },] },
        { type: core_2.ErrorStateMatcher, },
        { type: forms_1.NgControl, decorators: [{ type: core_1.Optional }, { type: core_1.Self },] },
    ]; };
    MatChipList.propDecorators = {
        "errorStateMatcher": [{ type: core_1.Input },],
        "multiple": [{ type: core_1.Input },],
        "compareWith": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "placeholder": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "ariaOrientation": [{ type: core_1.Input, args: ['aria-orientation',] },],
        "selectable": [{ type: core_1.Input },],
        "tabIndex": [{ type: core_1.Input },],
        "change": [{ type: core_1.Output },],
        "valueChange": [{ type: core_1.Output },],
        "chips": [{ type: core_1.ContentChildren, args: [chip_1.MatChip,] },],
    };
    return MatChipList;
}(exports._MatChipListMixinBase));
exports.MatChipList = MatChipList;
//# sourceMappingURL=chip-list.js.map