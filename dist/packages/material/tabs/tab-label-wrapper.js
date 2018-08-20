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
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
// Boilerplate for applying mixins to MatTabLabelWrapper.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatTabLabelWrapper.
/** @docs-private */
MatTabLabelWrapperBase = /** @class */ (function () {
    function MatTabLabelWrapperBase() {
    }
    return MatTabLabelWrapperBase;
}());
exports.MatTabLabelWrapperBase = MatTabLabelWrapperBase;
exports._MatTabLabelWrapperMixinBase = core_2.mixinDisabled(MatTabLabelWrapperBase);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * @docs-private
 */
var MatTabLabelWrapper = /** @class */ (function (_super) {
    __extends(MatTabLabelWrapper, _super);
    function MatTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    /** Sets focus on the wrapper element */
    MatTabLabelWrapper.prototype.focus = /** Sets focus on the wrapper element */
    function () {
        this.elementRef.nativeElement.focus();
    };
    MatTabLabelWrapper.prototype.getOffsetLeft = function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    MatTabLabelWrapper.prototype.getOffsetWidth = function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    MatTabLabelWrapper.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLabelWrapper.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return MatTabLabelWrapper;
}(exports._MatTabLabelWrapperMixinBase));
exports.MatTabLabelWrapper = MatTabLabelWrapper;
//# sourceMappingURL=tab-label-wrapper.js.map