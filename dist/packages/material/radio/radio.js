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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var animations_1 = require("@angular/platform-browser/animations");
// Increasing integer for generating unique ids for radio components.
var nextUniqueId = 0;
/**
 * Provider Expression that allows mat-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
exports.MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MatRadioGroup; }),
    multi: true
};
/** Change event object emitted by MatRadio and MatRadioGroup. */
var /** Change event object emitted by MatRadio and MatRadioGroup. */
MatRadioChange = /** @class */ (function () {
    function MatRadioChange(/** The MatRadioButton that emits the change event. */
    source, /** The value of the MatRadioButton. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatRadioChange;
}());
exports.MatRadioChange = MatRadioChange;
// Boilerplate for applying mixins to MatRadioGroup.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatRadioGroup.
/** @docs-private */
MatRadioGroupBase = /** @class */ (function () {
    function MatRadioGroupBase() {
    }
    return MatRadioGroupBase;
}());
exports.MatRadioGroupBase = MatRadioGroupBase;
exports._MatRadioGroupMixinBase = core_2.mixinDisabled(MatRadioGroupBase);
/**
 * A group of radio buttons. May contain one or more `<mat-radio-button>` elements.
 */
var MatRadioGroup = /** @class */ (function (_super) {
    __extends(MatRadioGroup, _super);
    function MatRadioGroup(_changeDetector) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        /** Selected value for the radio group. */
        _this._value = null;
        /** The HTML name attribute applied to radio buttons in this group. */
        _this._name = "mat-radio-group-" + nextUniqueId++;
        /** The currently selected radio button. Should match value. */
        _this._selected = null;
        /** Whether the `value` has been set to its initial value. */
        _this._isInitialized = false;
        /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        _this._labelPosition = 'after';
        /** Whether the radio group is disabled. */
        _this._disabled = false;
        /** Whether the radio group is required. */
        _this._required = false;
        /** The method to be called in order to update ngModel */
        _this._controlValueAccessorChangeFn = function () { };
        /**
           * onTouch function registered via registerOnTouch (ControlValueAccessor).
           * @docs-private
           */
        _this.onTouched = function () { };
        /**
           * Event emitted when the group value changes.
           * Change events are only emitted when the value changes due to user interaction with
           * a radio button (the same behavior as `<input type-"radio">`).
           */
        _this.change = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatRadioGroup.prototype, "name", {
        get: /** Name of the radio button group. All radio buttons inside this group will use this name. */
        function () { return this._name; },
        set: function (value) {
            this._name = value;
            this._updateRadioButtonNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "labelPosition", {
        get: /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
        function () {
            return this._labelPosition;
        },
        set: function (v) {
            this._labelPosition = v === 'before' ? 'before' : 'after';
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "value", {
        get: /**
           * Value for the radio-group. Should equal the value of the selected radio button if there is
           * a corresponding radio button with a matching value. If there is not such a corresponding
           * radio button, this value persists to be applied in case a new radio button is added with a
           * matching value.
           */
        function () { return this._value; },
        set: function (newValue) {
            if (this._value !== newValue) {
                // Set this before proceeding to ensure no circular loop occurs with selection.
                this._value = newValue;
                this._updateSelectedRadioFromValue();
                this._checkSelectedRadioButton();
            }
        },
        enumerable: true,
        configurable: true
    });
    MatRadioGroup.prototype._checkSelectedRadioButton = function () {
        if (this._selected && !this._selected.checked) {
            this._selected.checked = true;
        }
    };
    Object.defineProperty(MatRadioGroup.prototype, "selected", {
        get: /**
           * The currently selected radio button. If set to a new radio button, the radio group value
           * will be updated to match the new selected button.
           */
        function () { return this._selected; },
        set: function (selected) {
            this._selected = selected;
            this.value = selected ? selected.value : null;
            this._checkSelectedRadioButton();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "disabled", {
        get: /** Whether the radio group is disabled */
        function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioGroup.prototype, "required", {
        get: /** Whether the radio group is required */
        function () { return this._required; },
        set: function (value) {
            this._required = coercion_1.coerceBooleanProperty(value);
            this._markRadiosForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize properties once content children are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    /**
       * Initialize properties once content children are available.
       * This allows us to propagate relevant attributes to associated buttons.
       */
    MatRadioGroup.prototype.ngAfterContentInit = /**
       * Initialize properties once content children are available.
       * This allows us to propagate relevant attributes to associated buttons.
       */
    function () {
        // Mark this component as initialized in AfterContentInit because the initial value can
        // possibly be set by NgModel on MatRadioGroup, and it is possible that the OnInit of the
        // NgModel occurs *after* the OnInit of the MatRadioGroup.
        this._isInitialized = true;
    };
    /**
     * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
     * radio buttons upon their blur.
     */
    /**
       * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
       * radio buttons upon their blur.
       */
    MatRadioGroup.prototype._touch = /**
       * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
       * radio buttons upon their blur.
       */
    function () {
        if (this.onTouched) {
            this.onTouched();
        }
    };
    MatRadioGroup.prototype._updateRadioButtonNames = function () {
        var _this = this;
        if (this._radios) {
            this._radios.forEach(function (radio) {
                radio.name = _this.name;
            });
        }
    };
    /** Updates the `selected` radio button from the internal _value state. */
    /** Updates the `selected` radio button from the internal _value state. */
    MatRadioGroup.prototype._updateSelectedRadioFromValue = /** Updates the `selected` radio button from the internal _value state. */
    function () {
        var _this = this;
        // If the value already matches the selected radio, do nothing.
        var isAlreadySelected = this._selected !== null && this._selected.value === this._value;
        if (this._radios && !isAlreadySelected) {
            this._selected = null;
            this._radios.forEach(function (radio) {
                radio.checked = _this.value === radio.value;
                if (radio.checked) {
                    _this._selected = radio;
                }
            });
        }
    };
    /** Dispatch change event with current selection and group value. */
    /** Dispatch change event with current selection and group value. */
    MatRadioGroup.prototype._emitChangeEvent = /** Dispatch change event with current selection and group value. */
    function () {
        if (this._isInitialized) {
            this.change.emit(new MatRadioChange((this._selected), this._value));
        }
    };
    MatRadioGroup.prototype._markRadiosForCheck = function () {
        if (this._radios) {
            this._radios.forEach(function (radio) { return radio._markForCheck(); });
        }
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value
     */
    /**
       * Sets the model value. Implemented as part of ControlValueAccessor.
       * @param value
       */
    MatRadioGroup.prototype.writeValue = /**
       * Sets the model value. Implemented as part of ControlValueAccessor.
       * @param value
       */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    /**
     * Registers a callback to be triggered when the model value changes.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
       * Registers a callback to be triggered when the model value changes.
       * Implemented as part of ControlValueAccessor.
       * @param fn Callback to be registered.
       */
    MatRadioGroup.prototype.registerOnChange = /**
       * Registers a callback to be triggered when the model value changes.
       * Implemented as part of ControlValueAccessor.
       * @param fn Callback to be registered.
       */
    function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    /**
     * Registers a callback to be triggered when the control is touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn Callback to be registered.
     */
    /**
       * Registers a callback to be triggered when the control is touched.
       * Implemented as part of ControlValueAccessor.
       * @param fn Callback to be registered.
       */
    MatRadioGroup.prototype.registerOnTouched = /**
       * Registers a callback to be triggered when the control is touched.
       * Implemented as part of ControlValueAccessor.
       * @param fn Callback to be registered.
       */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
     * @param isDisabled Whether the control should be disabled.
     */
    /**
       * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
       * @param isDisabled Whether the control should be disabled.
       */
    MatRadioGroup.prototype.setDisabledState = /**
       * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
       * @param isDisabled Whether the control should be disabled.
       */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    };
    MatRadioGroup.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-radio-group',
                    exportAs: 'matRadioGroup',
                    providers: [exports.MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'radiogroup',
                        'class': 'mat-radio-group',
                    },
                    inputs: ['disabled'],
                },] },
    ];
    /** @nocollapse */
    MatRadioGroup.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatRadioGroup.propDecorators = {
        "change": [{ type: core_1.Output },],
        "_radios": [{ type: core_1.ContentChildren, args: [core_1.forwardRef(function () { return MatRadioButton; }), { descendants: true },] },],
        "name": [{ type: core_1.Input },],
        "labelPosition": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
    };
    return MatRadioGroup;
}(exports._MatRadioGroupMixinBase));
exports.MatRadioGroup = MatRadioGroup;
// Boilerplate for applying mixins to MatRadioButton.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatRadioButton.
/** @docs-private */
MatRadioButtonBase = /** @class */ (function () {
    function MatRadioButtonBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatRadioButtonBase;
}());
exports.MatRadioButtonBase = MatRadioButtonBase;
// As per Material design specifications the selection control radio should use the accent color
// palette by default. https://material.io/guidelines/components/selection-controls.html
exports._MatRadioButtonMixinBase = core_2.mixinColor(core_2.mixinDisableRipple(core_2.mixinTabIndex(MatRadioButtonBase)), 'accent');
/**
 * A Material design radio-button. Typically placed inside of `<mat-radio-group>` elements.
 */
var MatRadioButton = /** @class */ (function (_super) {
    __extends(MatRadioButton, _super);
    function MatRadioButton(radioGroup, elementRef, _changeDetector, _focusMonitor, _radioDispatcher, _animationMode) {
        var _this = _super.call(this, elementRef) || this;
        _this._changeDetector = _changeDetector;
        _this._focusMonitor = _focusMonitor;
        _this._radioDispatcher = _radioDispatcher;
        _this._animationMode = _animationMode;
        _this._uniqueId = "mat-radio-" + ++nextUniqueId;
        /** The unique ID for the radio button. */
        _this.id = _this._uniqueId;
        /**
           * Event emitted when the checked state of this radio button changes.
           * Change events are only emitted when the value changes due to user interaction with
           * the radio button (the same behavior as `<input type-"radio">`).
           */
        _this.change = new core_1.EventEmitter();
        /** Whether this radio is checked. */
        _this._checked = false;
        /** Value assigned to this radio. */
        _this._value = null;
        /** Unregister function for _radioDispatcher */
        _this._removeUniqueSelectionListener = function () { };
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        // Assertions. Ideally these should be stripped out by the compiler.
        // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
        _this.radioGroup = radioGroup;
        _this._removeUniqueSelectionListener =
            _radioDispatcher.listen(function (id, name) {
                if (id !== _this.id && name === _this.name) {
                    _this.checked = false;
                }
            });
        return _this;
    }
    Object.defineProperty(MatRadioButton.prototype, "checked", {
        get: /** Whether this radio button is checked. */
        function () { return this._checked; },
        set: function (value) {
            var newCheckedState = coercion_1.coerceBooleanProperty(value);
            if (this._checked !== newCheckedState) {
                this._checked = newCheckedState;
                if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
                    this.radioGroup.selected = this;
                }
                else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
                    // When unchecking the selected radio button, update the selected radio
                    // property on the group.
                    this.radioGroup.selected = null;
                }
                if (newCheckedState) {
                    // Notify all radio buttons with the same name to un-check.
                    this._radioDispatcher.notify(this.id, this.name);
                }
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "value", {
        get: /** The value of this radio button. */
        function () { return this._value; },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                if (this.radioGroup !== null) {
                    if (!this.checked) {
                        // Update checked when the value changed to match the radio group's value
                        this.checked = this.radioGroup.value === value;
                    }
                    if (this.checked) {
                        this.radioGroup.selected = this;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "labelPosition", {
        get: /** Whether the label should appear after or before the radio button. Defaults to 'after' */
        function () {
            return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
        },
        set: function (value) {
            this._labelPosition = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "disabled", {
        get: /** Whether the radio button is disabled. */
        function () {
            return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
        },
        set: function (value) {
            var newDisabledState = coercion_1.coerceBooleanProperty(value);
            if (this._disabled !== newDisabledState) {
                this._disabled = newDisabledState;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "required", {
        get: /** Whether the radio button is required. */
        function () {
            return this._required || (this.radioGroup && this.radioGroup.required);
        },
        set: function (value) {
            this._required = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatRadioButton.prototype, "inputId", {
        /** ID of the native input element inside `<mat-radio-button>` */
        get: /** ID of the native input element inside `<mat-radio-button>` */
        function () { return (this.id || this._uniqueId) + "-input"; },
        enumerable: true,
        configurable: true
    });
    /** Focuses the radio button. */
    /** Focuses the radio button. */
    MatRadioButton.prototype.focus = /** Focuses the radio button. */
    function () {
        this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
    };
    /**
     * Marks the radio button as needing checking for change detection.
     * This method is exposed because the parent radio group will directly
     * update bound properties of the radio button.
     */
    /**
       * Marks the radio button as needing checking for change detection.
       * This method is exposed because the parent radio group will directly
       * update bound properties of the radio button.
       */
    MatRadioButton.prototype._markForCheck = /**
       * Marks the radio button as needing checking for change detection.
       * This method is exposed because the parent radio group will directly
       * update bound properties of the radio button.
       */
    function () {
        // When group value changes, the button will not be notified. Use `markForCheck` to explicit
        // update radio button's status
        this._changeDetector.markForCheck();
    };
    MatRadioButton.prototype.ngOnInit = function () {
        if (this.radioGroup) {
            // If the radio is inside a radio group, determine if it should be checked
            this.checked = this.radioGroup.value === this._value;
            // Copy name from parent radio group
            this.name = this.radioGroup.name;
        }
    };
    MatRadioButton.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._focusMonitor
            .monitor(this._inputElement.nativeElement)
            .subscribe(function (focusOrigin) { return _this._onInputFocusChange(focusOrigin); });
    };
    MatRadioButton.prototype.ngOnDestroy = function () {
        this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
        this._removeUniqueSelectionListener();
    };
    /** Dispatch change event with current value. */
    /** Dispatch change event with current value. */
    MatRadioButton.prototype._emitChangeEvent = /** Dispatch change event with current value. */
    function () {
        this.change.emit(new MatRadioChange(this, this._value));
    };
    MatRadioButton.prototype._isRippleDisabled = function () {
        return this.disableRipple || this.disabled;
    };
    MatRadioButton.prototype._onInputClick = function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `radio-button` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /**
     * Triggered when the radio button received a click or the input recognized any change.
     * Clicking on a label element, will trigger a change event on the associated input.
     */
    /**
       * Triggered when the radio button received a click or the input recognized any change.
       * Clicking on a label element, will trigger a change event on the associated input.
       */
    MatRadioButton.prototype._onInputChange = /**
       * Triggered when the radio button received a click or the input recognized any change.
       * Clicking on a label element, will trigger a change event on the associated input.
       */
    function (event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
        var groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
        this.checked = true;
        this._emitChangeEvent();
        if (this.radioGroup) {
            this.radioGroup._controlValueAccessorChangeFn(this.value);
            this.radioGroup._touch();
            if (groupValueChanged) {
                this.radioGroup._emitChangeEvent();
            }
        }
    };
    /** Function is called whenever the focus changes for the input element. */
    /** Function is called whenever the focus changes for the input element. */
    MatRadioButton.prototype._onInputFocusChange = /** Function is called whenever the focus changes for the input element. */
    function (focusOrigin) {
        // TODO(paul): support `program`. See https://github.com/angular/material2/issues/9889
        if (!this._focusRipple && focusOrigin === 'keyboard') {
            this._focusRipple = this._ripple.launch(0, 0, { persistent: true });
        }
        else if (!focusOrigin) {
            if (this.radioGroup) {
                this.radioGroup._touch();
            }
            if (this._focusRipple) {
                this._focusRipple.fadeOut();
                this._focusRipple = null;
            }
        }
    };
    MatRadioButton.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-radio-button',
                    template: "<label [attr.for]=\"inputId\" class=\"mat-radio-label\" #label><div class=\"mat-radio-container\"><div class=\"mat-radio-outer-circle\"></div><div class=\"mat-radio-inner-circle\"></div><div mat-ripple class=\"mat-radio-ripple\" [matRippleTrigger]=\"label\" [matRippleDisabled]=\"_isRippleDisabled()\" [matRippleCentered]=\"true\" [matRippleRadius]=\"23\" [matRippleAnimation]=\"{enterDuration: 150}\"></div></div><input #input class=\"mat-radio-input cdk-visually-hidden\" type=\"radio\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [attr.name]=\"name\" [required]=\"required\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" [attr.aria-describedby]=\"ariaDescribedby\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"><div class=\"mat-radio-label-content\" [class.mat-radio-label-before]=\"labelPosition == 'before'\"><span style=\"display:none\">&nbsp;</span><ng-content></ng-content></div></label>",
                    styles: [".mat-radio-button{display:inline-block;-webkit-tap-highlight-color:transparent}.mat-radio-label{cursor:pointer;display:inline-flex;align-items:center;white-space:nowrap;vertical-align:middle}.mat-radio-container{box-sizing:border-box;display:inline-block;position:relative;width:20px;height:20px;flex-shrink:0}.mat-radio-outer-circle{box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:border-color ease 280ms;width:20px;border-width:2px;border-style:solid;border-radius:50%}._mat-animation-noopable .mat-radio-outer-circle{transition:none}.mat-radio-inner-circle{border-radius:50%;box-sizing:border-box;height:20px;left:0;position:absolute;top:0;transition:transform ease 280ms,background-color ease 280ms;width:20px;transform:scale(.001)}._mat-animation-noopable .mat-radio-inner-circle{transition:none}.mat-radio-checked .mat-radio-inner-circle{transform:scale(.5)}@media screen and (-ms-high-contrast:active){.mat-radio-checked .mat-radio-inner-circle{border:solid 10px}}.mat-radio-label-content{display:inline-block;order:0;line-height:inherit;padding-left:8px;padding-right:0}[dir=rtl] .mat-radio-label-content{padding-right:8px;padding-left:0}.mat-radio-label-content.mat-radio-label-before{order:-1;padding-left:0;padding-right:8px}[dir=rtl] .mat-radio-label-content.mat-radio-label-before{padding-right:0;padding-left:8px}.mat-radio-disabled,.mat-radio-disabled .mat-radio-label{cursor:default}.mat-radio-button .mat-radio-ripple{position:absolute;left:calc(50% - 25px);top:calc(50% - 25px);height:50px;width:50px;z-index:1;pointer-events:none}"],
                    inputs: ['color', 'disableRipple', 'tabIndex'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'matRadioButton',
                    host: {
                        'class': 'mat-radio-button',
                        '[class.mat-radio-checked]': 'checked',
                        '[class.mat-radio-disabled]': 'disabled',
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                        '[attr.id]': 'id',
                        // Note: under normal conditions focus shouldn't land on this element, however it may be
                        // programmatically set, for example inside of a focus trap, in this case we want to forward
                        // the focus to the native element.
                        '(focus)': '_inputElement.nativeElement.focus()',
                    },
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatRadioButton.ctorParameters = function () { return [
        { type: MatRadioGroup, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: a11y_1.FocusMonitor, },
        { type: collections_1.UniqueSelectionDispatcher, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [animations_1.ANIMATION_MODULE_TYPE,] },] },
    ]; };
    MatRadioButton.propDecorators = {
        "id": [{ type: core_1.Input },],
        "name": [{ type: core_1.Input },],
        "ariaLabel": [{ type: core_1.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core_1.Input, args: ['aria-labelledby',] },],
        "ariaDescribedby": [{ type: core_1.Input, args: ['aria-describedby',] },],
        "checked": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "labelPosition": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "change": [{ type: core_1.Output },],
        "_ripple": [{ type: core_1.ViewChild, args: [core_2.MatRipple,] },],
        "_inputElement": [{ type: core_1.ViewChild, args: ['input',] },],
    };
    return MatRadioButton;
}(exports._MatRadioButtonMixinBase));
exports.MatRadioButton = MatRadioButton;
//# sourceMappingURL=radio.js.map