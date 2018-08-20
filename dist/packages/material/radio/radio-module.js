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
var radio_1 = require("./radio");
var MatRadioModule = /** @class */ (function () {
    function MatRadioModule() {
    }
    MatRadioModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, core_2.MatRippleModule, core_2.MatCommonModule],
                    exports: [radio_1.MatRadioGroup, radio_1.MatRadioButton, core_2.MatCommonModule],
                    declarations: [radio_1.MatRadioGroup, radio_1.MatRadioButton],
                },] },
    ];
    return MatRadioModule;
}());
exports.MatRadioModule = MatRadioModule;
//# sourceMappingURL=radio-module.js.map