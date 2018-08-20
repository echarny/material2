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
import { Directive, Input } from '@angular/core';
var /** @type {?} */ nextUniqueId = 0;
/**
 * Hint text to be shown underneath the form field control.
 */
var MatHint = /** @class */ (function () {
    function MatHint() {
        /**
         * Whether to align the hint label at the start or end of the line.
         */
        this.align = 'start';
        /**
         * Unique ID for the hint. Used for the aria-describedby on the form field control.
         */
        this.id = "mat-hint-" + nextUniqueId++;
    }
    MatHint.decorators = [
        { type: Directive, args: [{
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
        "align": [{ type: Input },],
        "id": [{ type: Input },],
    };
    return MatHint;
}());
export { MatHint };
function MatHint_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatHint.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatHint.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatHint.propDecorators;
    /**
     * Whether to align the hint label at the start or end of the line.
     * @type {?}
     */
    MatHint.prototype.align;
    /**
     * Unique ID for the hint. Used for the aria-describedby on the form field control.
     * @type {?}
     */
    MatHint.prototype.id;
}
//# sourceMappingURL=hint.js.map