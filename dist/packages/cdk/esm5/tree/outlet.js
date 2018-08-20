/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ViewContainerRef, } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var CdkTreeNodeOutlet = /** @class */ (function () {
    function CdkTreeNodeOutlet(viewContainer) {
        this.viewContainer = viewContainer;
    }
    CdkTreeNodeOutlet.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodeOutlet]'
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeOutlet.ctorParameters = function () { return [
        { type: ViewContainerRef, },
    ]; };
    return CdkTreeNodeOutlet;
}());
export { CdkTreeNodeOutlet };
function CdkTreeNodeOutlet_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkTreeNodeOutlet.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkTreeNodeOutlet.ctorParameters;
    /** @type {?} */
    CdkTreeNodeOutlet.prototype.viewContainer;
}
//# sourceMappingURL=outlet.js.map