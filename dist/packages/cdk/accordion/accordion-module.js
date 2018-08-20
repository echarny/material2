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
var accordion_1 = require("./accordion");
var accordion_item_1 = require("./accordion-item");
var CdkAccordionModule = /** @class */ (function () {
    function CdkAccordionModule() {
    }
    CdkAccordionModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [accordion_1.CdkAccordion, accordion_item_1.CdkAccordionItem],
                    declarations: [accordion_1.CdkAccordion, accordion_item_1.CdkAccordionItem],
                },] },
    ];
    return CdkAccordionModule;
}());
exports.CdkAccordionModule = CdkAccordionModule;
//# sourceMappingURL=accordion-module.js.map