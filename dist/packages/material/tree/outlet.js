"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Outlet for nested CdkNode. Put `[matTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var MatTreeNodeOutlet = /** @class */ (function () {
    function MatTreeNodeOutlet(viewContainer) {
        this.viewContainer = viewContainer;
    }
    MatTreeNodeOutlet.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matTreeNodeOutlet]'
                },] },
    ];
    /** @nocollapse */
    MatTreeNodeOutlet.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    return MatTreeNodeOutlet;
}());
exports.MatTreeNodeOutlet = MatTreeNodeOutlet;
//# sourceMappingURL=outlet.js.map