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
var coercion_1 = require("@angular/cdk/coercion");
var rxjs_1 = require("rxjs");
/** Used to generate unique ID for each accordion. */
var nextId = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
var CdkAccordion = /** @class */ (function () {
    function CdkAccordion() {
        /** Stream that emits true/false when openAll/closeAll is triggered. */
        this._openCloseAllActions = new rxjs_1.Subject();
        /** A readonly id value to use for unique selection coordination. */
        this.id = "cdk-accordion-" + nextId++;
        this._multi = false;
    }
    Object.defineProperty(CdkAccordion.prototype, "multi", {
        get: /** Whether the accordion should allow multiple expanded accordion items simultaneously. */
        function () { return this._multi; },
        set: function (multi) { this._multi = coercion_1.coerceBooleanProperty(multi); },
        enumerable: true,
        configurable: true
    });
    /** Opens all enabled accordion items in an accordion where multi is enabled. */
    /** Opens all enabled accordion items in an accordion where multi is enabled. */
    CdkAccordion.prototype.openAll = /** Opens all enabled accordion items in an accordion where multi is enabled. */
    function () {
        this._openCloseAll(true);
    };
    /** Closes all enabled accordion items in an accordion where multi is enabled. */
    /** Closes all enabled accordion items in an accordion where multi is enabled. */
    CdkAccordion.prototype.closeAll = /** Closes all enabled accordion items in an accordion where multi is enabled. */
    function () {
        this._openCloseAll(false);
    };
    CdkAccordion.prototype._openCloseAll = function (expanded) {
        if (this.multi) {
            this._openCloseAllActions.next(expanded);
        }
    };
    CdkAccordion.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'cdk-accordion, [cdkAccordion]',
                    exportAs: 'cdkAccordion',
                },] },
    ];
    /** @nocollapse */
    CdkAccordion.propDecorators = {
        "multi": [{ type: core_1.Input },],
    };
    return CdkAccordion;
}());
exports.CdkAccordion = CdkAccordion;
//# sourceMappingURL=accordion.js.map