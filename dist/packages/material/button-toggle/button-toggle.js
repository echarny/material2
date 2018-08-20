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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var collections_1 = require("@angular/cdk/collections");
// Boilerplate for applying mixins to MatButtonToggleGroup and MatButtonToggleGroupMultiple
/** @docs-private */
var 
// Boilerplate for applying mixins to MatButtonToggleGroup and MatButtonToggleGroupMultiple
/** @docs-private */
MatButtonToggleGroupBase = /** @class */ (function () {
    function MatButtonToggleGroupBase() {
    }
    return MatButtonToggleGroupBase;
}());
exports.MatButtonToggleGroupBase = MatButtonToggleGroupBase;
exports._MatButtonToggleGroupMixinBase = core_2.mixinDisabled(MatButtonToggleGroupBase);
/**
 * Provider Expression that allows mat-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
exports.MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MatButtonToggleGroup; }),
    multi: true
};
/**
 * @deprecated Use `MatButtonToggleGroup` instead.
 * @breaking-change 7.0.0
 */
var /**
 * @deprecated Use `MatButtonToggleGroup` instead.
 * @breaking-change 7.0.0
 */
MatButtonToggleGroupMultiple = /** @class */ (function () {
    function MatButtonToggleGroupMultiple() {
    }
    return MatButtonToggleGroupMultiple;
}());
exports.MatButtonToggleGroupMultiple = MatButtonToggleGroupMultiple;
var _uniqueIdCounter = 0;
/** Change event object emitted by MatButtonToggle. */
var /** Change event object emitted by MatButtonToggle. */
MatButtonToggleChange = /** @class */ (function () {
    function MatButtonToggleChange(/** The MatButtonToggle that emits the event. */
    source, /** The value assigned to the MatButtonToggle. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatButtonToggleChange;
}());
exports.MatButtonToggleChange = MatButtonToggleChange;
/** Exclusive selection button toggle group that behaves like a radio-button group. */
var MatButtonToggleGroup = /** @class */ (function (_super) {
    __extends(MatButtonToggleGroup, _super);
    function MatButtonToggleGroup(_changeDetector) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        _this._vertical = false;
        _this._multiple = false;
        /**
           * The method to be called in order to update ngModel.
           * Now `ngModel` binding is not supported in multiple selection mode.
           */
        _this._controlValueAccessorChangeFn = function () { };
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        _this._onTouched = function () { };
        _this._name = "mat-button-toggle-group-" + _uniqueIdCounter++;
        /**
           * Event that emits whenever the value of the group changes.
           * Used to facilitate two-way data binding.
           * @docs-private
           */
        _this.valueChange = new core_1.EventEmitter();
        /** Event emitted when the group's value changes. */
        _this.change = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatButtonToggleGroup.prototype, "name", {
        get: /** `name` attribute for the underlying `input` element. */
        function () { return this._name; },
        set: function (value) {
            var _this = this;
            this._name = value;
            if (this._buttonToggles) {
                this._buttonToggles.forEach(function (toggle) { return toggle.name = _this._name; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "vertical", {
        get: /** Whether the toggle group is vertical. */
        function () { return this._vertical; },
        set: function (value) {
            this._vertical = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "value", {
        get: /** Value of the toggle group. */
        function () {
            var selected = this._selectionModel ? this._selectionModel.selected : [];
            if (this.multiple) {
                return selected.map(function (toggle) { return toggle.value; });
            }
            return selected[0] ? selected[0].value : undefined;
        },
        set: function (newValue) {
            this._setSelectionByValue(newValue);
            this.valueChange.emit(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "selected", {
        /** Selected button toggles in the group. */
        get: /** Selected button toggles in the group. */
        function () {
            var selected = this._selectionModel.selected;
            return this.multiple ? selected : (selected[0] || null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "multiple", {
        get: /** Whether multiple button toggles can be selected. */
        function () { return this._multiple; },
        set: function (value) {
            this._multiple = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatButtonToggleGroup.prototype.ngOnInit = function () {
        this._selectionModel = new collections_1.SelectionModel(this.multiple, undefined, false);
    };
    MatButtonToggleGroup.prototype.ngAfterContentInit = function () {
        (_a = this._selectionModel).select.apply(_a, this._buttonToggles.filter(function (toggle) { return toggle.checked; }));
        var _a;
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    /**
       * Sets the model value. Implemented as part of ControlValueAccessor.
       * @param value Value to be set to the model.
       */
    MatButtonToggleGroup.prototype.writeValue = /**
       * Sets the model value. Implemented as part of ControlValueAccessor.
       * @param value Value to be set to the model.
       */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatButtonToggleGroup.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatButtonToggleGroup.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatButtonToggleGroup.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    function (isDisabled) {
        this.disabled = isDisabled;
        if (this._buttonToggles) {
            this._buttonToggles.forEach(function (toggle) { return toggle._markForCheck(); });
        }
    };
    /** Dispatch change event with current selection and group value. */
    /** Dispatch change event with current selection and group value. */
    MatButtonToggleGroup.prototype._emitChangeEvent = /** Dispatch change event with current selection and group value. */
    function () {
        var selected = this.selected;
        var source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
        var event = new MatButtonToggleChange((source), this.value);
        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    };
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     */
    /**
       * Syncs a button toggle's selected state with the model value.
       * @param toggle Toggle to be synced.
       * @param select Whether the toggle should be selected.
       * @param isUserInput Whether the change was a result of a user interaction.
       */
    MatButtonToggleGroup.prototype._syncButtonToggle = /**
       * Syncs a button toggle's selected state with the model value.
       * @param toggle Toggle to be synced.
       * @param select Whether the toggle should be selected.
       * @param isUserInput Whether the change was a result of a user interaction.
       */
    function (toggle, select, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            this.selected.checked = false;
        }
        if (select) {
            this._selectionModel.select(toggle);
        }
        else {
            this._selectionModel.deselect(toggle);
        }
        // Only emit the change event for user input.
        if (isUserInput) {
            this._emitChangeEvent();
        }
        // Note: we emit this one no matter whether it was a user interaction, because
        // it is used by Angular to sync up the two-way data binding.
        this.valueChange.emit(this.value);
    };
    /** Checks whether a button toggle is selected. */
    /** Checks whether a button toggle is selected. */
    MatButtonToggleGroup.prototype._isSelected = /** Checks whether a button toggle is selected. */
    function (toggle) {
        return this._selectionModel.isSelected(toggle);
    };
    /** Determines whether a button toggle should be checked on init. */
    /** Determines whether a button toggle should be checked on init. */
    MatButtonToggleGroup.prototype._isPrechecked = /** Determines whether a button toggle should be checked on init. */
    function (toggle) {
        if (typeof this._rawValue === 'undefined') {
            return false;
        }
        if (this.multiple && Array.isArray(this._rawValue)) {
            return this._rawValue.some(function (value) { return toggle.value != null && value === toggle.value; });
        }
        return toggle.value === this._rawValue;
    };
    /** Updates the selection state of the toggles in the group based on a value. */
    /** Updates the selection state of the toggles in the group based on a value. */
    MatButtonToggleGroup.prototype._setSelectionByValue = /** Updates the selection state of the toggles in the group based on a value. */
    function (value) {
        var _this = this;
        this._rawValue = value;
        if (!this._buttonToggles) {
            return;
        }
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw Error('Value must be an array in multiple-selection mode.');
            }
            this._clearSelection();
            value.forEach(function (currentValue) { return _this._selectValue(currentValue); });
        }
        else {
            this._clearSelection();
            this._selectValue(value);
        }
    };
    /** Clears the selected toggles. */
    /** Clears the selected toggles. */
    MatButtonToggleGroup.prototype._clearSelection = /** Clears the selected toggles. */
    function () {
        this._selectionModel.clear();
        this._buttonToggles.forEach(function (toggle) { return toggle.checked = false; });
    };
    /** Selects a value if there's a toggle that corresponds to it. */
    /** Selects a value if there's a toggle that corresponds to it. */
    MatButtonToggleGroup.prototype._selectValue = /** Selects a value if there's a toggle that corresponds to it. */
    function (value) {
        var correspondingOption = this._buttonToggles.find(function (toggle) {
            return toggle.value != null && toggle.value === value;
        });
        if (correspondingOption) {
            correspondingOption.checked = true;
            this._selectionModel.select(correspondingOption);
        }
    };
    MatButtonToggleGroup.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-button-toggle-group',
                    providers: [
                        exports.MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
                        { provide: MatButtonToggleGroupMultiple, useExisting: MatButtonToggleGroup },
                    ],
                    inputs: ['disabled'],
                    host: {
                        'role': 'group',
                        'class': 'mat-button-toggle-group',
                        '[class.mat-button-toggle-vertical]': 'vertical'
                    },
                    exportAs: 'matButtonToggleGroup',
                },] },
    ];
    /** @nocollapse */
    MatButtonToggleGroup.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatButtonToggleGroup.propDecorators = {
        "_buttonToggles": [{ type: core_1.ContentChildren, args: [core_1.forwardRef(function () { return MatButtonToggle; }),] },],
        "name": [{ type: core_1.Input },],
        "vertical": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "valueChange": [{ type: core_1.Output },],
        "multiple": [{ type: core_1.Input },],
        "change": [{ type: core_1.Output },],
    };
    return MatButtonToggleGroup;
}(exports._MatButtonToggleGroupMixinBase));
exports.MatButtonToggleGroup = MatButtonToggleGroup;
// Boilerplate for applying mixins to the MatButtonToggle class.
/** @docs-private */
var 
// Boilerplate for applying mixins to the MatButtonToggle class.
/** @docs-private */
MatButtonToggleBase = /** @class */ (function () {
    function MatButtonToggleBase() {
    }
    return MatButtonToggleBase;
}());
exports.MatButtonToggleBase = MatButtonToggleBase;
exports._MatButtonToggleMixinBase = core_2.mixinDisableRipple(MatButtonToggleBase);
/** Single button inside of a toggle group. */
var MatButtonToggle = /** @class */ (function (_super) {
    __extends(MatButtonToggle, _super);
    function MatButtonToggle(toggleGroup, _changeDetectorRef, _elementRef, _focusMonitor, 
    // @breaking-change 8.0.0 `defaultTabIndex` to be made a required parameter.
    defaultTabIndex) {
        var _this = _super.call(this) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._isSingleSelector = false;
        _this._checked = false;
        /**
           * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
           */
        _this.ariaLabelledby = null;
        _this._disabled = false;
        /** Event emitted when the group value changes. */
        _this.change = new core_1.EventEmitter();
        var parsedTabIndex = Number(defaultTabIndex);
        _this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
        _this.buttonToggleGroup = toggleGroup;
        return _this;
    }
    Object.defineProperty(MatButtonToggle.prototype, "buttonId", {
        /** Unique ID for the underlying `button` element. */
        get: /** Unique ID for the underlying `button` element. */
        function () { return this.id + "-button"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "checked", {
        get: /** Whether the button is checked. */
        function () {
            return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
        },
        set: function (value) {
            var newValue = coercion_1.coerceBooleanProperty(value);
            if (newValue !== this._checked) {
                this._checked = newValue;
                if (this.buttonToggleGroup) {
                    this.buttonToggleGroup._syncButtonToggle(this, this._checked);
                }
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "disabled", {
        get: /** Whether the button is disabled. */
        function () {
            return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
        },
        set: function (value) { this._disabled = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    MatButtonToggle.prototype.ngOnInit = function () {
        this._isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this._type = this._isSingleSelector ? 'radio' : 'checkbox';
        this.id = this.id || "mat-button-toggle-" + _uniqueIdCounter++;
        if (this._isSingleSelector) {
            this.name = this.buttonToggleGroup.name;
        }
        if (this.buttonToggleGroup && this.buttonToggleGroup._isPrechecked(this)) {
            this.checked = true;
        }
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    };
    MatButtonToggle.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /** Focuses the button. */
    /** Focuses the button. */
    MatButtonToggle.prototype.focus = /** Focuses the button. */
    function () {
        this._buttonElement.nativeElement.focus();
    };
    /** Checks the button toggle due to an interaction with the underlying native button. */
    /** Checks the button toggle due to an interaction with the underlying native button. */
    MatButtonToggle.prototype._onButtonClick = /** Checks the button toggle due to an interaction with the underlying native button. */
    function () {
        var newChecked = this._isSingleSelector ? true : !this._checked;
        if (newChecked !== this._checked) {
            this._checked = newChecked;
            if (this.buttonToggleGroup) {
                this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
                this.buttonToggleGroup._onTouched();
            }
        }
        // Emit a change event when it's the single selector
        this.change.emit(new MatButtonToggleChange(this, this.value));
    };
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     */
    /**
       * Marks the button toggle as needing checking for change detection.
       * This method is exposed because the parent button toggle group will directly
       * update bound properties of the radio button.
       */
    MatButtonToggle.prototype._markForCheck = /**
       * Marks the button toggle as needing checking for change detection.
       * This method is exposed because the parent button toggle group will directly
       * update bound properties of the radio button.
       */
    function () {
        // When the group value changes, the button will not be notified.
        // Use `markForCheck` to explicit update button toggle's status.
        this._changeDetectorRef.markForCheck();
    };
    MatButtonToggle.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-button-toggle',
                    template: "<button #button class=\"mat-button-toggle-button\" type=\"button\" [id]=\"buttonId\" [attr.tabindex]=\"disabled ? -1 : tabIndex\" [attr.aria-pressed]=\"checked\" [disabled]=\"disabled || null\" [attr.name]=\"name || null\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (click)=\"_onButtonClick()\"><div class=\"mat-button-toggle-label-content\"><ng-content></ng-content></div></button><div class=\"mat-button-toggle-focus-overlay\"></div><div class=\"mat-button-toggle-ripple\" matRipple [matRippleTrigger]=\"button\" [matRippleDisabled]=\"this.disableRipple || this.disabled\"></div>",
                    styles: [".mat-button-toggle-group,.mat-button-toggle-standalone{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);position:relative;display:inline-flex;flex-direction:row;border-radius:2px;cursor:pointer;white-space:nowrap;overflow:hidden}@media screen and (-ms-high-contrast:active){.mat-button-toggle-group,.mat-button-toggle-standalone{outline:solid 1px}}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle-disabled .mat-button-toggle-label-content{cursor:default}.mat-button-toggle{white-space:nowrap;position:relative;-webkit-tap-highlight-color:transparent}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:1}@media screen and (-ms-high-contrast:active){.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:.5}}.mat-button-toggle-label-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;cursor:pointer}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{border-radius:inherit;pointer-events:none;opacity:0;top:0;left:0;right:0;bottom:0;position:absolute}@media screen and (-ms-high-contrast:active){.mat-button-toggle-checked .mat-button-toggle-focus-overlay{opacity:.5;height:0;border-bottom:solid 36px}}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:0 0;color:inherit;padding:0;margin:0;font:inherit;outline:0}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matButtonToggle',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    inputs: ['disableRipple'],
                    host: {
                        '[class.mat-button-toggle-standalone]': '!buttonToggleGroup',
                        '[class.mat-button-toggle-checked]': 'checked',
                        '[class.mat-button-toggle-disabled]': 'disabled',
                        'class': 'mat-button-toggle',
                        // Clear out the native tabindex here since we forward it to the underlying button
                        '[attr.tabindex]': 'null',
                        '[attr.id]': 'id',
                    }
                },] },
    ];
    /** @nocollapse */
    MatButtonToggle.ctorParameters = function () { return [
        { type: MatButtonToggleGroup, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.ElementRef, },
        { type: a11y_1.FocusMonitor, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['tabindex',] },] },
    ]; };
    MatButtonToggle.propDecorators = {
        "ariaLabel": [{ type: core_1.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core_1.Input, args: ['aria-labelledby',] },],
        "_buttonElement": [{ type: core_1.ViewChild, args: ['button',] },],
        "id": [{ type: core_1.Input },],
        "name": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "tabIndex": [{ type: core_1.Input },],
        "checked": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "change": [{ type: core_1.Output },],
    };
    return MatButtonToggle;
}(exports._MatButtonToggleMixinBase));
exports.MatButtonToggle = MatButtonToggle;
//# sourceMappingURL=button-toggle.js.map