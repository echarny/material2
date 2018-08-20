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
var rxjs_1 = require("rxjs");
var i0 = require("@angular/core");
/**
 * To modify the labels and text displayed, create a new instance of MatSortHeaderIntl and
 * include it in a custom provider.
 */
var MatSortHeaderIntl = /** @class */ (function () {
    function MatSortHeaderIntl() {
        /**
           * Stream that emits whenever the labels here are changed. Use this to notify
           * components if the labels have changed after initialization.
           */
        this.changes = new rxjs_1.Subject();
        /** ARIA label for the sorting button. */
        this.sortButtonLabel = function (id) {
            return "Change sorting for " + id;
        };
    }
    MatSortHeaderIntl.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    MatSortHeaderIntl.ngInjectableDef = i0.defineInjectable({ factory: function MatSortHeaderIntl_Factory() { return new MatSortHeaderIntl(); }, token: MatSortHeaderIntl, providedIn: "root" });
    return MatSortHeaderIntl;
}());
exports.MatSortHeaderIntl = MatSortHeaderIntl;
/** @docs-private */
function MAT_SORT_HEADER_INTL_PROVIDER_FACTORY(parentIntl) {
    return parentIntl || new MatSortHeaderIntl();
}
exports.MAT_SORT_HEADER_INTL_PROVIDER_FACTORY = MAT_SORT_HEADER_INTL_PROVIDER_FACTORY;
/** @docs-private */
exports.MAT_SORT_HEADER_INTL_PROVIDER = {
    // If there is already an MatSortHeaderIntl available, use that. Otherwise, provide a new one.
    provide: MatSortHeaderIntl,
    deps: [[new core_1.Optional(), new core_1.SkipSelf(), MatSortHeaderIntl]],
    useFactory: MAT_SORT_HEADER_INTL_PROVIDER_FACTORY
};
//# sourceMappingURL=sort-header-intl.js.map