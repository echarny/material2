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
var common_1 = require("@angular/common");
var core_2 = require("@angular/material/core");
var progress_bar_1 = require("./progress-bar");
var MatProgressBarModule = /** @class */ (function () {
    function MatProgressBarModule() {
    }
    MatProgressBarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, core_2.MatCommonModule],
                    exports: [progress_bar_1.MatProgressBar, core_2.MatCommonModule],
                    declarations: [progress_bar_1.MatProgressBar],
                },] },
    ];
    return MatProgressBarModule;
}());
exports.MatProgressBarModule = MatProgressBarModule;
//# sourceMappingURL=progress-bar-module.js.map