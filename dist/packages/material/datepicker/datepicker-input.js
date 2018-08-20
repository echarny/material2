"use strict";
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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var rxjs_1 = require("rxjs");
var datepicker_1 = require("./datepicker");
var datepicker_errors_1 = require("./datepicker-errors");
exports.MAT_DATEPICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MatDatepickerInput; }),
    multi: true
};
exports.MAT_DATEPICKER_VALIDATORS = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MatDatepickerInput; }),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
var /**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
MatDatepickerInputEvent = /** @class */ (function () {
    function MatDatepickerInputEvent(/** Reference to the datepicker input component that emitted the event. */
    target, /** Reference to the native input element associated with the datepicker input. */
    targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return MatDatepickerInputEvent;
}());
exports.MatDatepickerInputEvent = MatDatepickerInputEvent;
/** Directive used to connect an input to a MatDatepicker. */
var MatDatepickerInput = /** @class */ (function () {
    function MatDatepickerInput(_elementRef, _dateAdapter, _dateFormats, _formField) {
        var _this = this;
        this._elementRef = _elementRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /** Emits when a `change` event is fired on this `<input>`. */
        this.dateChange = new core_1.EventEmitter();
        /** Emits when an `input` event is fired on this `<input>`. */
        this.dateInput = new core_1.EventEmitter();
        /** Emits when the value changes (either due to user input or programmatic change). */
        this._valueChange = new core_1.EventEmitter();
        /** Emits when the disabled state has changed */
        this._disabledChange = new core_1.EventEmitter();
        this._onTouched = function () { };
        this._cvaOnChange = function () { };
        this._validatorOnChange = function () { };
        this._datepickerSubscription = rxjs_1.Subscription.EMPTY;
        this._localeSubscription = rxjs_1.Subscription.EMPTY;
        /** The form control validator for whether the input parses. */
        this._parseValidator = function () {
            return _this._lastValueValid ?
                null : { 'matDatepickerParse': { 'text': _this._elementRef.nativeElement.value } };
        };
        /** The form control validator for the min date. */
        this._minValidator = function (control) {
            var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this._dateAdapter.compareDate(_this.min, controlValue) <= 0) ?
                null : { 'matDatepickerMin': { 'min': _this.min, 'actual': controlValue } };
        };
        /** The form control validator for the max date. */
        this._maxValidator = function (control) {
            var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this._dateAdapter.compareDate(_this.max, controlValue) >= 0) ?
                null : { 'matDatepickerMax': { 'max': _this.max, 'actual': controlValue } };
        };
        /** The form control validator for the date filter. */
        this._filterValidator = function (control) {
            var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this._dateFilter || !controlValue || _this._dateFilter(controlValue) ?
                null : { 'matDatepickerFilter': true };
        };
        /** The combined form control validator for this input. */
        this._validator = forms_1.Validators.compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
        /** Whether the last value set on the input was valid. */
        this._lastValueValid = false;
        if (!this._dateAdapter) {
            throw datepicker_errors_1.createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw datepicker_errors_1.createMissingDateImplError('MAT_DATE_FORMATS');
        }
        // Update the displayed date when the locale changes.
        this._localeSubscription = _dateAdapter.localeChanges.subscribe(function () {
            _this.value = _this.value;
        });
    }
    Object.defineProperty(MatDatepickerInput.prototype, "matDatepicker", {
        set: /** The datepicker that this input is associated with. */
        function (value) {
            var _this = this;
            if (!value) {
                return;
            }
            this._datepicker = value;
            this._datepicker._registerInput(this);
            this._datepickerSubscription.unsubscribe();
            this._datepickerSubscription = this._datepicker._selectedChanged.subscribe(function (selected) {
                _this.value = selected;
                _this._cvaOnChange(selected);
                _this._onTouched();
                _this.dateInput.emit(new MatDatepickerInputEvent(_this, _this._elementRef.nativeElement));
                _this.dateChange.emit(new MatDatepickerInputEvent(_this, _this._elementRef.nativeElement));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "matDatepickerFilter", {
        set: /** Function that can be used to filter out dates within the datepicker. */
        function (value) {
            this._dateFilter = value;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "value", {
        get: /** The value of the input. */
        function () { return this._value; },
        set: function (value) {
            value = this._dateAdapter.deserialize(value);
            this._lastValueValid = !value || this._dateAdapter.isValid(value);
            value = this._getValidDateOrNull(value);
            var oldDate = this.value;
            this._value = value;
            this._formatValue(value);
            if (!this._dateAdapter.sameDate(oldDate, value)) {
                this._valueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "min", {
        get: /** The minimum valid date. */
        function () { return this._min; },
        set: function (value) {
            this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "max", {
        get: /** The maximum valid date. */
        function () { return this._max; },
        set: function (value) {
            this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "disabled", {
        get: /** Whether the datepicker-input is disabled. */
        function () { return !!this._disabled; },
        set: function (value) {
            var newValue = coercion_1.coerceBooleanProperty(value);
            var element = this._elementRef.nativeElement;
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this._disabledChange.emit(newValue);
            }
            // We need to null check the `blur` method, because it's undefined during SSR.
            if (newValue && element.blur) {
                // Normally, native input elements automatically blur if they turn disabled. This behavior
                // is problematic, because it would mean that it triggers another change detection cycle,
                // which then causes a changed after checked error if the input element was focused before.
                element.blur();
            }
        },
        enumerable: true,
        configurable: true
    });
    MatDatepickerInput.prototype.ngOnDestroy = function () {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    };
    /** @docs-private */
    /** @docs-private */
    MatDatepickerInput.prototype.registerOnValidatorChange = /** @docs-private */
    function (fn) {
        this._validatorOnChange = fn;
    };
    /** @docs-private */
    /** @docs-private */
    MatDatepickerInput.prototype.validate = /** @docs-private */
    function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * @deprecated
     * @breaking-change 7.0.0 Use `getConnectedOverlayOrigin` instead
     */
    /**
       * @deprecated
       * @breaking-change 7.0.0 Use `getConnectedOverlayOrigin` instead
       */
    MatDatepickerInput.prototype.getPopupConnectionElementRef = /**
       * @deprecated
       * @breaking-change 7.0.0 Use `getConnectedOverlayOrigin` instead
       */
    function () {
        return this.getConnectedOverlayOrigin();
    };
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    /**
       * Gets the element that the datepicker popup should be connected to.
       * @return The element to connect the popup to.
       */
    MatDatepickerInput.prototype.getConnectedOverlayOrigin = /**
       * Gets the element that the datepicker popup should be connected to.
       * @return The element to connect the popup to.
       */
    function () {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatDatepickerInput.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatDatepickerInput.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatDatepickerInput.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatDatepickerInput.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    MatDatepickerInput.prototype._onKeydown = function (event) {
        if (this._datepicker && event.altKey && event.keyCode === keycodes_1.DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    };
    MatDatepickerInput.prototype._onInput = function (value) {
        var date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);
        this._lastValueValid = !date || this._dateAdapter.isValid(date);
        date = this._getValidDateOrNull(date);
        if (!this._dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this._cvaOnChange(date);
            this._valueChange.emit(date);
            this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
        }
    };
    MatDatepickerInput.prototype._onChange = function () {
        this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /** Returns the palette used by the input's form field, if any. */
    /** Returns the palette used by the input's form field, if any. */
    MatDatepickerInput.prototype._getThemePalette = /** Returns the palette used by the input's form field, if any. */
    function () {
        return this._formField ? this._formField.color : undefined;
    };
    /** Handles blur events on the input. */
    /** Handles blur events on the input. */
    MatDatepickerInput.prototype._onBlur = /** Handles blur events on the input. */
    function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    };
    /** Formats a value and sets it on the input element. */
    /** Formats a value and sets it on the input element. */
    MatDatepickerInput.prototype._formatValue = /** Formats a value and sets it on the input element. */
    function (value) {
        this._elementRef.nativeElement.value =
            value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    MatDatepickerInput.prototype._getValidDateOrNull = /**
       * @param obj The object to check.
       * @returns The given object if it is both a date instance and valid, otherwise null.
       */
    function (obj) {
        return (this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj)) ? obj : null;
    };
    MatDatepickerInput.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'input[matDatepicker]',
                    providers: [
                        exports.MAT_DATEPICKER_VALUE_ACCESSOR,
                        exports.MAT_DATEPICKER_VALIDATORS,
                        { provide: input_1.MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatepickerInput },
                    ],
                    host: {
                        '[attr.aria-haspopup]': 'true',
                        '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
                        '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
                        '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
                        '[disabled]': 'disabled',
                        '(input)': '_onInput($event.target.value)',
                        '(change)': '_onChange()',
                        '(blur)': '_onBlur()',
                        '(keydown)': '_onKeydown($event)',
                    },
                    exportAs: 'matDatepickerInput',
                },] },
    ];
    /** @nocollapse */
    MatDatepickerInput.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_2.DateAdapter, decorators: [{ type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [core_2.MAT_DATE_FORMATS,] },] },
        { type: form_field_1.MatFormField, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatDatepickerInput.propDecorators = {
        "matDatepicker": [{ type: core_1.Input },],
        "matDatepickerFilter": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "min": [{ type: core_1.Input },],
        "max": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "dateChange": [{ type: core_1.Output },],
        "dateInput": [{ type: core_1.Output },],
    };
    return MatDatepickerInput;
}());
exports.MatDatepickerInput = MatDatepickerInput;
//# sourceMappingURL=datepicker-input.js.map