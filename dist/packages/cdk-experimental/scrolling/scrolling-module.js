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
var auto_size_virtual_scroll_1 = require("./auto-size-virtual-scroll");
var ScrollingModule = /** @class */ (function () {
    function ScrollingModule() {
    }
    ScrollingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [auto_size_virtual_scroll_1.CdkAutoSizeVirtualScroll],
                    declarations: [auto_size_virtual_scroll_1.CdkAutoSizeVirtualScroll],
                },] },
    ];
    return ScrollingModule;
}());
exports.ScrollingModule = ScrollingModule;
//# sourceMappingURL=scrolling-module.js.map