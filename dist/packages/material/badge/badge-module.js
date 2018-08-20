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
var core_2 = require("@angular/material/core");
var a11y_1 = require("@angular/cdk/a11y");
var badge_1 = require("./badge");
var MatBadgeModule = /** @class */ (function () {
    function MatBadgeModule() {
    }
    MatBadgeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        a11y_1.A11yModule,
                        core_2.MatCommonModule
                    ],
                    exports: [badge_1.MatBadge],
                    declarations: [badge_1.MatBadge],
                },] },
    ];
    return MatBadgeModule;
}());
exports.MatBadgeModule = MatBadgeModule;
//# sourceMappingURL=badge-module.js.map