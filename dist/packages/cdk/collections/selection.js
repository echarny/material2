"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * Class to be used to power selecting one or more options from a list.
 */
var /**
 * Class to be used to power selecting one or more options from a list.
 */
SelectionModel = /** @class */ (function () {
    function SelectionModel(_multiple, initiallySelectedValues, _emitChanges) {
        if (_multiple === void 0) { _multiple = false; }
        if (_emitChanges === void 0) { _emitChanges = true; }
        var _this = this;
        this._multiple = _multiple;
        this._emitChanges = _emitChanges;
        /** Currently-selected values. */
        this._selection = new Set();
        /** Keeps track of the deselected options that haven't been emitted by the change event. */
        this._deselectedToEmit = [];
        /** Keeps track of the selected options that haven't been emitted by the change event. */
        this._selectedToEmit = [];
        /** Event emitted when the value has changed. */
        this.onChange = this._emitChanges ? new rxjs_1.Subject() : null;
        if (initiallySelectedValues && initiallySelectedValues.length) {
            if (_multiple) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /** Selected values. */
        get: /** Selected values. */
        function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    /**
       * Selects a value or an array of values.
       */
    SelectionModel.prototype.select = /**
       * Selects a value or an array of values.
       */
    function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._verifyValueAssignment(values);
        values.forEach(function (value) { return _this._markSelected(value); });
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    /**
       * Deselects a value or an array of values.
       */
    SelectionModel.prototype.deselect = /**
       * Deselects a value or an array of values.
       */
    function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._verifyValueAssignment(values);
        values.forEach(function (value) { return _this._unmarkSelected(value); });
        this._emitChangeEvent();
    };
    /**
     * Toggles a value between selected and deselected.
     */
    /**
       * Toggles a value between selected and deselected.
       */
    SelectionModel.prototype.toggle = /**
       * Toggles a value between selected and deselected.
       */
    function (value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    };
    /**
     * Clears all of the selected values.
     */
    /**
       * Clears all of the selected values.
       */
    SelectionModel.prototype.clear = /**
       * Clears all of the selected values.
       */
    function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    /**
       * Determines whether a value is selected.
       */
    SelectionModel.prototype.isSelected = /**
       * Determines whether a value is selected.
       */
    function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model does not have a value.
     */
    /**
       * Determines whether the model does not have a value.
       */
    SelectionModel.prototype.isEmpty = /**
       * Determines whether the model does not have a value.
       */
    function () {
        return this._selection.size === 0;
    };
    /**
     * Determines whether the model has a value.
     */
    /**
       * Determines whether the model has a value.
       */
    SelectionModel.prototype.hasValue = /**
       * Determines whether the model has a value.
       */
    function () {
        return !this.isEmpty();
    };
    /**
     * Sorts the selected values based on a predicate function.
     */
    /**
       * Sorts the selected values based on a predicate function.
       */
    SelectionModel.prototype.sort = /**
       * Sorts the selected values based on a predicate function.
       */
    function (predicate) {
        if (this._multiple && this.selected) {
            this._selected.sort(predicate);
        }
    };
    /**
     * Gets whether multiple values can be selected.
     */
    /**
       * Gets whether multiple values can be selected.
       */
    SelectionModel.prototype.isMultipleSelection = /**
       * Gets whether multiple values can be selected.
       */
    function () {
        return this._multiple;
    };
    /** Emits a change event and clears the records of selected and deselected values. */
    /** Emits a change event and clears the records of selected and deselected values. */
    SelectionModel.prototype._emitChangeEvent = /** Emits a change event and clears the records of selected and deselected values. */
    function () {
        // Clear the selected values so they can be re-cached.
        this._selected = null;
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            if (this.onChange) {
                this.onChange.next({
                    source: this,
                    added: this._selectedToEmit,
                    removed: this._deselectedToEmit
                });
            }
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
    };
    /** Selects a value. */
    /** Selects a value. */
    SelectionModel.prototype._markSelected = /** Selects a value. */
    function (value) {
        if (!this.isSelected(value)) {
            if (!this._multiple) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    };
    /** Deselects a value. */
    /** Deselects a value. */
    SelectionModel.prototype._unmarkSelected = /** Deselects a value. */
    function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    };
    /** Clears out the selected values. */
    /** Clears out the selected values. */
    SelectionModel.prototype._unmarkAll = /** Clears out the selected values. */
    function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     */
    /**
       * Verifies the value assignment and throws an error if the specified value array is
       * including multiple values while the selection model is not supporting multiple values.
       */
    SelectionModel.prototype._verifyValueAssignment = /**
       * Verifies the value assignment and throws an error if the specified value array is
       * including multiple values while the selection model is not supporting multiple values.
       */
    function (values) {
        if (values.length > 1 && !this._multiple) {
            throw getMultipleValuesInSingleSelectionError();
        }
    };
    return SelectionModel;
}());
exports.SelectionModel = SelectionModel;
/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 */
function getMultipleValuesInSingleSelectionError() {
    return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}
exports.getMultipleValuesInSingleSelectionError = getMultipleValuesInSingleSelectionError;
//# sourceMappingURL=selection.js.map