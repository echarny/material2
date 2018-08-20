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
var i0 = require("@angular/core");
/** Error state matcher that matches when a control is invalid and dirty. */
var ShowOnDirtyErrorStateMatcher = /** @class */ (function () {
    function ShowOnDirtyErrorStateMatcher() {
    }
    ShowOnDirtyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        return !!(control && control.invalid && (control.dirty || (form && form.submitted)));
    };
    ShowOnDirtyErrorStateMatcher.decorators = [
        { type: core_1.Injectable },
    ];
    return ShowOnDirtyErrorStateMatcher;
}());
exports.ShowOnDirtyErrorStateMatcher = ShowOnDirtyErrorStateMatcher;
/** Provider that defines how form controls behave with regards to displaying error messages. */
var ErrorStateMatcher = /** @class */ (function () {
    function ErrorStateMatcher() {
    }
    ErrorStateMatcher.prototype.isErrorState = function (control, form) {
        return !!(control && control.invalid && (control.touched || (form && form.submitted)));
    };
    ErrorStateMatcher.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    ErrorStateMatcher.ngInjectableDef = i0.defineInjectable({ factory: function ErrorStateMatcher_Factory() { return new ErrorStateMatcher(); }, token: ErrorStateMatcher, providedIn: "root" });
    return ErrorStateMatcher;
}());
exports.ErrorStateMatcher = ErrorStateMatcher;
//# sourceMappingURL=error-options.js.map