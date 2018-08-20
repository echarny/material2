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
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { CdkPortal } from '@angular/cdk/portal';
/**
 * Used to flag tab labels for use with the portal directive
 */
var MatTabLabel = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabLabel, _super);
    function MatTabLabel(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    MatTabLabel.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-tab-label], [matTabLabel]',
                },] },
    ];
    /** @nocollapse */
    MatTabLabel.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    return MatTabLabel;
}(CdkPortal));
export { MatTabLabel };
function MatTabLabel_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTabLabel.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTabLabel.ctorParameters;
}
//# sourceMappingURL=tab-label.js.map