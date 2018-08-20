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
var core_1 = require("@angular/core");
var chip_list_1 = require("./chip-list");
var chip_default_options_1 = require("./chip-default-options");
// Increasing integer for generating unique ids.
var nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of an `<mat-chip-list>`.
 */
var MatChipInput = /** @class */ (function () {
    function MatChipInput(_elementRef, _defaultOptions) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        /** Whether the control is focused. */
        this.focused = false;
        this._addOnBlur = false;
        /**
           * The list of key codes that will trigger a chipEnd event.
           *
           * Defaults to `[ENTER]`.
           */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /** Emitted when a chip is to be added. */
        this.chipEnd = new core_1.EventEmitter();
        /** The input's placeholder text. */
        this.placeholder = '';
        /** Unique id for the input. */
        this.id = "mat-chip-list-input-" + nextUniqueId++;
        this._inputElement = this._elementRef.nativeElement;
    }
    Object.defineProperty(MatChipInput.prototype, "chipList", {
        set: /** Register input for chip list */
        function (value) {
            if (value) {
                this._chipList = value;
                this._chipList.registerInput(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "addOnBlur", {
        get: /**
           * Whether or not the chipEnd event will be emitted when the input is blurred.
           */
        function () { return this._addOnBlur; },
        set: function (value) { this._addOnBlur = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "empty", {
        /** Whether the input is empty. */
        get: /** Whether the input is empty. */
        function () { return !this._inputElement.value; },
        enumerable: true,
        configurable: true
    });
    MatChipInput.prototype.ngOnChanges = function () {
        this._chipList.stateChanges.next();
    };
    /** Utility method to make host definition/tests more clear. */
    /** Utility method to make host definition/tests more clear. */
    MatChipInput.prototype._keydown = /** Utility method to make host definition/tests more clear. */
    function (event) {
        this._emitChipEnd(event);
    };
    /** Checks to see if the blur should emit the (chipEnd) event. */
    /** Checks to see if the blur should emit the (chipEnd) event. */
    MatChipInput.prototype._blur = /** Checks to see if the blur should emit the (chipEnd) event. */
    function () {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        this.focused = false;
        // Blur the chip list if it is not focused
        if (!this._chipList.focused) {
            this._chipList._blur();
        }
        this._chipList.stateChanges.next();
    };
    MatChipInput.prototype._focus = function () {
        this.focused = true;
        this._chipList.stateChanges.next();
    };
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    MatChipInput.prototype._emitChipEnd = /** Checks to see if the (chipEnd) event needs to be emitted. */
    function (event) {
        if (!this._inputElement.value && !!event) {
            this._chipList._keydown(event);
        }
        if (!event || this._isSeparatorKey(event.keyCode)) {
            this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });
            if (event) {
                event.preventDefault();
            }
        }
    };
    MatChipInput.prototype._onInput = function () {
        // Let chip list know whenever the value changes.
        this._chipList.stateChanges.next();
    };
    /** Focuses the input. */
    /** Focuses the input. */
    MatChipInput.prototype.focus = /** Focuses the input. */
    function () {
        this._inputElement.focus();
    };
    /** Checks whether a keycode is one of the configured separators. */
    /** Checks whether a keycode is one of the configured separators. */
    MatChipInput.prototype._isSeparatorKey = /** Checks whether a keycode is one of the configured separators. */
    function (keyCode) {
        var separators = this.separatorKeyCodes;
        return Array.isArray(separators) ? separators.indexOf(keyCode) > -1 : separators.has(keyCode);
    };
    MatChipInput.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        'class': 'mat-chip-input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.placeholder]': 'placeholder || null',
                    }
                },] },
    ];
    /** @nocollapse */
    MatChipInput.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [chip_default_options_1.MAT_CHIPS_DEFAULT_OPTIONS,] },] },
    ]; };
    MatChipInput.propDecorators = {
        "chipList": [{ type: core_1.Input, args: ['matChipInputFor',] },],
        "addOnBlur": [{ type: core_1.Input, args: ['matChipInputAddOnBlur',] },],
        "separatorKeyCodes": [{ type: core_1.Input, args: ['matChipInputSeparatorKeyCodes',] },],
        "chipEnd": [{ type: core_1.Output, args: ['matChipInputTokenEnd',] },],
        "placeholder": [{ type: core_1.Input },],
        "id": [{ type: core_1.Input },],
    };
    return MatChipInput;
}());
exports.MatChipInput = MatChipInput;
//# sourceMappingURL=chip-input.js.map