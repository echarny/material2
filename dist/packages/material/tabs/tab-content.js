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
/** Decorates the `ng-template` tags and reads out the template from it. */
var MatTabContent = /** @class */ (function () {
    function MatTabContent(template) {
        this.template = template;
    }
    MatTabContent.decorators = [
        { type: core_1.Directive, args: [{ selector: '[matTabContent]' },] },
    ];
    /** @nocollapse */
    MatTabContent.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    return MatTabContent;
}());
exports.MatTabContent = MatTabContent;
//# sourceMappingURL=tab-content.js.map