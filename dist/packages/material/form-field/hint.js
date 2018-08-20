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
/** Hint text to be shown underneath the form field control. */
var MatHint = /** @class */ (function () {
    function MatHint() {
        /** Whether to align the hint label at the start or end of the line. */
        this.align = 'start';
        /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
        this.id = "mat-hint-" + nextUniqueId++;
    }
    MatHint.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-hint',
                    host: {
                        'class': 'mat-hint',
                        '[class.mat-right]': 'align == "end"',
                        '[attr.id]': 'id',
                        // Remove align attribute to prevent it from interfering with layout.
                        '[attr.align]': 'null',
                    }
                },] },
    ];
    /** @nocollapse */
    MatHint.propDecorators = {
        "align": [{ type: core_1.Input },],
        "id": [{ type: core_1.Input },],
    };
    return MatHint;
}());
exports.MatHint = MatHint;
//# sourceMappingURL=hint.js.map