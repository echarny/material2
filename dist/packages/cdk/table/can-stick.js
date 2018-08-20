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
/**
 * Mixin to provide a directive with a function that checks if the sticky input has been
 * changed since the last time the function was called. Essentially adds a dirty-check to the
 * sticky value.
 */
function mixinHasStickyInput(base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._sticky = false;
            /** Whether the sticky input has changed since it was last checked. */
            _this._hasStickyChanged = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "sticky", {
            /** Whether sticky positioning should be applied. */
            get: /** Whether sticky positioning should be applied. */
            function () { return this._sticky; },
            set: function (v) {
                var prevValue = this._sticky;
                this._sticky = coercion_1.coerceBooleanProperty(v);
                this._hasStickyChanged = prevValue !== this._sticky;
            },
            enumerable: true,
            configurable: true
        });
        /** Whether the sticky value has changed since this was last called. */
        /** Whether the sticky value has changed since this was last called. */
        class_1.prototype.hasStickyChanged = /** Whether the sticky value has changed since this was last called. */
        function () {
            var hasStickyChanged = this._hasStickyChanged;
            this._hasStickyChanged = false;
            return hasStickyChanged;
        };
        /** Resets the dirty check for cases where the sticky state has been used without checking. */
        /** Resets the dirty check for cases where the sticky state has been used without checking. */
        class_1.prototype.resetStickyChanged = /** Resets the dirty check for cases where the sticky state has been used without checking. */
        function () {
            this._hasStickyChanged = false;
        };
        return class_1;
    }(base));
}
exports.mixinHasStickyInput = mixinHasStickyInput;
//# sourceMappingURL=can-stick.js.map