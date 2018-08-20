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
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var rxjs_1 = require("rxjs");
var text_field_1 = require("@angular/cdk/text-field");
var input_errors_1 = require("./input-errors");
var input_value_accessor_1 = require("./input-value-accessor");
// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
var MAT_INPUT_INVALID_TYPES = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
];
var nextUniqueId = 0;
// Boilerplate for applying mixins to MatInput.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatInput.
/** @docs-private */
MatInputBase = /** @class */ (function () {
    function MatInputBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, /** @docs-private */
    ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return MatInputBase;
}());
exports.MatInputBase = MatInputBase;
exports._MatInputMixinBase = core_2.mixinErrorState(MatInputBase);
/** Directive that allows a native input to work inside a `MatFormField`. */
var MatInput = /** @class */ (function (_super) {
    __extends(MatInput, _super);
    function MatInput(_elementRef, _platform, /** @docs-private */
    ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, inputValueAccessor, _autofillMonitor, ngZone) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this._platform = _platform;
        _this.ngControl = ngControl;
        _this._autofillMonitor = _autofillMonitor;
        _this._uid = "mat-input-" + nextUniqueId++;
        /** Whether the component is being rendered on the server. */
        _this._isServer = false;
        /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        _this.focused = false;
        /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        _this.stateChanges = new rxjs_1.Subject();
        /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        _this.controlType = 'mat-input';
        /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        _this.autofilled = false;
        _this._disabled = false;
        _this._required = false;
        _this._type = 'text';
        _this._readonly = false;
        _this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week'
        ].filter(function (t) { return platform_1.getSupportedInputTypes().has(t); });
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        // If no input value accessor was explicitly specified, use the element as the input value
        // accessor.
        _this._inputValueAccessor = inputValueAccessor || _this._elementRef.nativeElement;
        _this._previousNativeValue = _this.value;
        // Force setter to be called in case id was not specified.
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        // On some versions of iOS the caret gets stuck in the wrong place when holding down the delete
        // key. In order to get around this we need to "jiggle" the caret loose. Since this bug only
        // exists on iOS, we only bother to install the listener on iOS.
        if (_platform.IOS) {
            ngZone.runOutsideAngular(function () {
                _elementRef.nativeElement.addEventListener('keyup', function (event) {
                    var el = event.target;
                    if (!el.value && !el.selectionStart && !el.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        el.setSelectionRange(1, 1);
                        el.setSelectionRange(0, 0);
                    }
                });
            });
        }
        _this._isServer = !_this._platform.isBrowser;
        return _this;
    }
    Object.defineProperty(MatInput.prototype, "disabled", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
            // Browsers may not fire the blur event if the input is disabled too quickly.
            // Reset from here to ensure that the element doesn't become stuck.
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatInput.prototype, "id", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this._id; },
        set: function (value) { this._id = value || this._uid; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatInput.prototype, "required", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this._required; },
        set: function (value) { this._required = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatInput.prototype, "type", {
        get: /** Input type of the element. */
        function () { return this._type; },
        set: function (value) {
            this._type = value || 'text';
            this._validateType();
            // When using Angular inputs, developers are no longer able to set the properties on the native
            // input element. To ensure that bindings for `type` work, we need to sync the setter
            // with the native property. Textarea elements don't support the type property or attribute.
            if (!this._isTextarea() && platform_1.getSupportedInputTypes().has(this._type)) {
                this._elementRef.nativeElement.type = this._type;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatInput.prototype, "value", {
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this._inputValueAccessor.value; },
        set: function (value) {
            if (value !== this.value) {
                this._inputValueAccessor.value = value;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatInput.prototype, "readonly", {
        get: /** Whether the element is readonly. */
        function () { return this._readonly; },
        set: function (value) { this._readonly = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    MatInput.prototype.ngOnInit = function () {
        var _this = this;
        this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(function (event) {
            _this.autofilled = event.isAutofilled;
            _this.stateChanges.next();
        });
    };
    MatInput.prototype.ngOnChanges = function () {
        this.stateChanges.next();
    };
    MatInput.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    MatInput.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
        // We need to dirty-check the native element's value, because there are some cases where
        // we won't be notified when it changes (e.g. the consumer isn't using forms or they're
        // updating the value using `emitEvent: false`).
        this._dirtyCheckNativeValue();
    };
    /** Focuses the input. */
    /** Focuses the input. */
    MatInput.prototype.focus = /** Focuses the input. */
    function () { this._elementRef.nativeElement.focus(); };
    /** Callback for the cases where the focused state of the input changes. */
    /** Callback for the cases where the focused state of the input changes. */
    MatInput.prototype._focusChanged = /** Callback for the cases where the focused state of the input changes. */
    function (isFocused) {
        if (isFocused !== this.focused && !this.readonly) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    };
    MatInput.prototype._onInput = function () {
        // This is a noop function and is used to let Angular know whenever the value changes.
        // Angular will run a new change detection each time the `input` event has been dispatched.
        // It's necessary that Angular recognizes the value change, because when floatingLabel
        // is set to false and Angular forms aren't used, the placeholder won't recognize the
        // value changes and will not disappear.
        // Listening to the input event wouldn't be necessary when the input is using the
        // FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
    };
    /** Does some manual dirty checking on the native input `value` property. */
    /** Does some manual dirty checking on the native input `value` property. */
    MatInput.prototype._dirtyCheckNativeValue = /** Does some manual dirty checking on the native input `value` property. */
    function () {
        var newValue = this.value;
        if (this._previousNativeValue !== newValue) {
            this._previousNativeValue = newValue;
            this.stateChanges.next();
        }
    };
    /** Make sure the input is a supported type. */
    /** Make sure the input is a supported type. */
    MatInput.prototype._validateType = /** Make sure the input is a supported type. */
    function () {
        if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
            throw input_errors_1.getMatInputUnsupportedTypeError(this._type);
        }
    };
    /** Checks whether the input type is one of the types that are never empty. */
    /** Checks whether the input type is one of the types that are never empty. */
    MatInput.prototype._isNeverEmpty = /** Checks whether the input type is one of the types that are never empty. */
    function () {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
    };
    /** Checks whether the input is invalid based on the native validation. */
    /** Checks whether the input is invalid based on the native validation. */
    MatInput.prototype._isBadInput = /** Checks whether the input is invalid based on the native validation. */
    function () {
        // The `validity` property won't be present on platform-server.
        var validity = this._elementRef.nativeElement.validity;
        return validity && validity.badInput;
    };
    /** Determines if the component host is a textarea. */
    /** Determines if the component host is a textarea. */
    MatInput.prototype._isTextarea = /** Determines if the component host is a textarea. */
    function () {
        return this._elementRef.nativeElement.nodeName.toLowerCase() === 'textarea';
    };
    Object.defineProperty(MatInput.prototype, "empty", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () {
            return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() &&
                !this.autofilled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatInput.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () { return this.focused || !this.empty; },
        enumerable: true,
        configurable: true
    });
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    MatInput.prototype.setDescribedByIds = /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    function (ids) { this._ariaDescribedby = ids.join(' '); };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    MatInput.prototype.onContainerClick = /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    function () { this.focus(); };
    MatInput.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "input[matInput], textarea[matInput]",
                    exportAs: 'matInput',
                    host: {
                        /**
                             * @breaking-change 7.0.0 remove .mat-form-field-autofill-control in favor of AutofillMonitor.
                             */
                        'class': 'mat-input-element mat-form-field-autofill-control',
                        '[class.mat-input-server]': '_isServer',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[readonly]': 'readonly',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-required]': 'required.toString()',
                        '(blur)': '_focusChanged(false)',
                        '(focus)': '_focusChanged(true)',
                        '(input)': '_onInput()',
                    },
                    providers: [{ provide: form_field_1.MatFormFieldControl, useExisting: MatInput }],
                },] },
    ];
    /** @nocollapse */
    MatInput.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: platform_1.Platform, },
        { type: forms_1.NgControl, decorators: [{ type: core_1.Optional }, { type: core_1.Self },] },
        { type: forms_1.NgForm, decorators: [{ type: core_1.Optional },] },
        { type: forms_1.FormGroupDirective, decorators: [{ type: core_1.Optional },] },
        { type: core_2.ErrorStateMatcher, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [input_value_accessor_1.MAT_INPUT_VALUE_ACCESSOR,] },] },
        { type: text_field_1.AutofillMonitor, },
        { type: core_1.NgZone, },
    ]; };
    MatInput.propDecorators = {
        "disabled": [{ type: core_1.Input },],
        "id": [{ type: core_1.Input },],
        "placeholder": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "type": [{ type: core_1.Input },],
        "errorStateMatcher": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "readonly": [{ type: core_1.Input },],
    };
    return MatInput;
}(exports._MatInputMixinBase));
exports.MatInput = MatInput;
//# sourceMappingURL=input.js.map