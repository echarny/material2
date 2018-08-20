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
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
/**
 * \@docs-private
 * @record
 */
export function CanUpdateErrorState() { }
function CanUpdateErrorState_tsickle_Closure_declarations() {
    /** @type {?} */
    CanUpdateErrorState.prototype.updateErrorState;
    /** @type {?} */
    CanUpdateErrorState.prototype.stateChanges;
    /** @type {?} */
    CanUpdateErrorState.prototype.errorState;
    /** @type {?} */
    CanUpdateErrorState.prototype.errorStateMatcher;
}
/**
 * \@docs-private
 * @record
 */
export function HasErrorState() { }
function HasErrorState_tsickle_Closure_declarations() {
    /** @type {?} */
    HasErrorState.prototype._parentFormGroup;
    /** @type {?} */
    HasErrorState.prototype._parentForm;
    /** @type {?} */
    HasErrorState.prototype._defaultErrorStateMatcher;
    /** @type {?} */
    HasErrorState.prototype.ngControl;
}
/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 * @template T
 * @param {?} base
 * @return {?}
 */
export function mixinErrorState(base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /**
             * Whether the component is in an error state.
             */
            _this.errorState = false;
            /**
             * Stream that emits whenever the state of the input changes such that the wrapping
             * `MatFormField` needs to run change detection.
             */
            _this.stateChanges = new Subject();
            return _this;
        }
        /**
         * @return {?}
         */
        class_1.prototype.updateErrorState = /**
         * @return {?}
         */
        function () {
            var /** @type {?} */ oldState = this.errorState;
            var /** @type {?} */ parent = this._parentFormGroup || this._parentForm;
            var /** @type {?} */ matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
            var /** @type {?} */ control = this.ngControl ? /** @type {?} */ (this.ngControl.control) : null;
            var /** @type {?} */ newState = matcher.isErrorState(control, parent);
            if (newState !== oldState) {
                this.errorState = newState;
                this.stateChanges.next();
            }
        };
        return class_1;
    }(base));
}
//# sourceMappingURL=error-state.js.map