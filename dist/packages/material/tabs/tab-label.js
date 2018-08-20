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
var portal_1 = require("@angular/cdk/portal");
/** Used to flag tab labels for use with the portal directive */
var MatTabLabel = /** @class */ (function (_super) {
    __extends(MatTabLabel, _super);
    function MatTabLabel(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    MatTabLabel.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[mat-tab-label], [matTabLabel]',
                },] },
    ];
    /** @nocollapse */
    MatTabLabel.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
    ]; };
    return MatTabLabel;
}(portal_1.CdkPortal));
exports.MatTabLabel = MatTabLabel;
//# sourceMappingURL=tab-label.js.map