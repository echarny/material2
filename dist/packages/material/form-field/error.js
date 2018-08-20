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
var nextUniqueId = 0;
/** Single error message to be shown underneath the form field. */
var MatError = /** @class */ (function () {
    function MatError() {
        this.id = "mat-error-" + nextUniqueId++;
    }
    MatError.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-error',
                    host: {
                        'class': 'mat-error',
                        'role': 'alert',
                        '[attr.id]': 'id',
                    }
                },] },
    ];
    /** @nocollapse */
    MatError.propDecorators = {
        "id": [{ type: core_1.Input },],
    };
    return MatError;
}());
exports.MatError = MatError;
//# sourceMappingURL=error.js.map