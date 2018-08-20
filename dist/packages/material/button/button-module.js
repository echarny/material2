"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var button_1 = require("./button");
var MatButtonModule = /** @class */ (function () {
    function MatButtonModule() {
    }
    MatButtonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        core_2.MatRippleModule,
                        core_2.MatCommonModule,
                    ],
                    exports: [
                        button_1.MatButton,
                        button_1.MatAnchor,
                        core_2.MatCommonModule,
                    ],
                    declarations: [
                        button_1.MatButton,
                        button_1.MatAnchor,
                    ],
                },] },
    ];
    return MatButtonModule;
}());
exports.MatButtonModule = MatButtonModule;
//# sourceMappingURL=button-module.js.map