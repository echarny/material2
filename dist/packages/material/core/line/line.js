"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_module_1 = require("../common-behaviors/common-module");
/**
 * Shared directive to count lines inside a text area, such as a list item.
 * Line elements can be extracted with a @ContentChildren(MatLine) query, then
 * counted by checking the query list's length.
 */
var MatLine = /** @class */ (function () {
    function MatLine() {
    }
    MatLine.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mat-line], [matLine]',
                    host: { 'class': 'mat-line' }
                },] },
    ];
    return MatLine;
}());
exports.MatLine = MatLine;
/**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
var /**
 * Helper that takes a query list of lines and sets the correct class on the host.
 * @docs-private
 */
MatLineSetter = /** @class */ (function () {
    function MatLineSetter(_lines, _element) {
        var _this = this;
        this._lines = _lines;
        this._element = _element;
        this._setLineClass(this._lines.length);
        this._lines.changes.subscribe(function () {
            _this._setLineClass(_this._lines.length);
        });
    }
    MatLineSetter.prototype._setLineClass = function (count) {
        this._resetClasses();
        if (count === 2 || count === 3) {
            this._setClass("mat-" + count + "-line", true);
        }
        else if (count > 3) {
            this._setClass("mat-multi-line", true);
        }
    };
    MatLineSetter.prototype._resetClasses = function () {
        this._setClass('mat-2-line', false);
        this._setClass('mat-3-line', false);
        this._setClass('mat-multi-line', false);
    };
    MatLineSetter.prototype._setClass = function (className, isAdd) {
        if (isAdd) {
            this._element.nativeElement.classList.add(className);
        }
        else {
            this._element.nativeElement.classList.remove(className);
        }
    };
    return MatLineSetter;
}());
exports.MatLineSetter = MatLineSetter;
var MatLineModule = /** @class */ (function () {
    function MatLineModule() {
    }
    MatLineModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.MatCommonModule],
                    exports: [MatLine, common_module_1.MatCommonModule],
                    declarations: [MatLine],
                },] },
    ];
    return MatLineModule;
}());
exports.MatLineModule = MatLineModule;
//# sourceMappingURL=line.js.map