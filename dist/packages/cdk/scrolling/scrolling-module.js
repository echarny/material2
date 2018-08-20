"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var fixed_size_virtual_scroll_1 = require("./fixed-size-virtual-scroll");
var scrollable_1 = require("./scrollable");
var virtual_for_of_1 = require("./virtual-for-of");
var virtual_scroll_viewport_1 = require("./virtual-scroll-viewport");
var ScrollingModule = /** @class */ (function () {
    function ScrollingModule() {
    }
    ScrollingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [platform_1.PlatformModule, bidi_1.BidiModule],
                    exports: [
                        bidi_1.BidiModule,
                        fixed_size_virtual_scroll_1.CdkFixedSizeVirtualScroll,
                        scrollable_1.CdkScrollable,
                        virtual_for_of_1.CdkVirtualForOf,
                        virtual_scroll_viewport_1.CdkVirtualScrollViewport,
                    ],
                    declarations: [
                        fixed_size_virtual_scroll_1.CdkFixedSizeVirtualScroll,
                        scrollable_1.CdkScrollable,
                        virtual_for_of_1.CdkVirtualForOf,
                        virtual_scroll_viewport_1.CdkVirtualScrollViewport,
                    ],
                },] },
    ];
    return ScrollingModule;
}());
exports.ScrollingModule = ScrollingModule;
/**
 * @deprecated ScrollDispatchModule has been renamed to ScrollingModule.
 * @breaking-change 8.0.0 delete this alias
 */
var ScrollDispatchModule = /** @class */ (function () {
    function ScrollDispatchModule() {
    }
    ScrollDispatchModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [ScrollingModule],
                    exports: [ScrollingModule],
                },] },
    ];
    return ScrollDispatchModule;
}());
exports.ScrollDispatchModule = ScrollDispatchModule;
//# sourceMappingURL=scrolling-module.js.map