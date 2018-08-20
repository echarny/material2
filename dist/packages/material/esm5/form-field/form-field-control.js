/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * An interface which allows a control to work inside of a `MatFormField`.
 * @abstract
 * @template T
 */
var /**
 * An interface which allows a control to work inside of a `MatFormField`.
 * @abstract
 * @template T
 */
MatFormFieldControl = /** @class */ (function () {
    function MatFormFieldControl() {
    }
    return MatFormFieldControl;
}());
/**
 * An interface which allows a control to work inside of a `MatFormField`.
 * @abstract
 * @template T
 */
export { MatFormFieldControl };
function MatFormFieldControl_tsickle_Closure_declarations() {
    /**
     * The value of the control.
     * @type {?}
     */
    MatFormFieldControl.prototype.value;
    /**
     * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
     * needs to run change detection.
     * @type {?}
     */
    MatFormFieldControl.prototype.stateChanges;
    /**
     * The element ID for this control.
     * @type {?}
     */
    MatFormFieldControl.prototype.id;
    /**
     * The placeholder for this control.
     * @type {?}
     */
    MatFormFieldControl.prototype.placeholder;
    /**
     * Gets the NgControl for this control.
     * @type {?}
     */
    MatFormFieldControl.prototype.ngControl;
    /**
     * Whether the control is focused.
     * @type {?}
     */
    MatFormFieldControl.prototype.focused;
    /**
     * Whether the control is empty.
     * @type {?}
     */
    MatFormFieldControl.prototype.empty;
    /**
     * Whether the `MatFormField` label should try to float.
     * @type {?}
     */
    MatFormFieldControl.prototype.shouldLabelFloat;
    /**
     * Whether the control is required.
     * @type {?}
     */
    MatFormFieldControl.prototype.required;
    /**
     * Whether the control is disabled.
     * @type {?}
     */
    MatFormFieldControl.prototype.disabled;
    /**
     * Whether the control is in an error state.
     * @type {?}
     */
    MatFormFieldControl.prototype.errorState;
    /**
     * An optional name for the control type that can be used to distinguish `mat-form-field` elements
     * based on their control type. The form field will add a class,
     * `mat-form-field-type-{{controlType}}` to its root element.
     * @type {?}
     */
    MatFormFieldControl.prototype.controlType;
    /**
     * Whether the input is currently in an autofilled state. If property is not present on the
     * control it is assumed to be false.
     * @type {?}
     */
    MatFormFieldControl.prototype.autofilled;
    /**
     * Sets the list of element IDs that currently describe this control.
     * @abstract
     * @param {?} ids
     * @return {?}
     */
    MatFormFieldControl.prototype.setDescribedByIds = function (ids) { };
    /**
     * Handles a click on the control's container.
     * @abstract
     * @param {?} event
     * @return {?}
     */
    MatFormFieldControl.prototype.onContainerClick = function (event) { };
}
//# sourceMappingURL=form-field-control.js.map