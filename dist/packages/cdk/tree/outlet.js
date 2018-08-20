"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var CdkTreeNodeOutlet = /** @class */ (function () {
    function CdkTreeNodeOutlet(viewContainer) {
        this.viewContainer = viewContainer;
    }
    CdkTreeNodeOutlet.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkTreeNodeOutlet]'
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeOutlet.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    return CdkTreeNodeOutlet;
}());
exports.CdkTreeNodeOutlet = CdkTreeNodeOutlet;
//# sourceMappingURL=outlet.js.map