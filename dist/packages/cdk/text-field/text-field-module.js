"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var core_1 = require("@angular/core");
var autofill_1 = require("./autofill");
var autosize_1 = require("./autosize");
var TextFieldModule = /** @class */ (function () {
    function TextFieldModule() {
    }
    TextFieldModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [autofill_1.CdkAutofill, autosize_1.CdkTextareaAutosize],
                    imports: [platform_1.PlatformModule],
                    exports: [autofill_1.CdkAutofill, autosize_1.CdkTextareaAutosize],
                },] },
    ];
    return TextFieldModule;
}());
exports.TextFieldModule = TextFieldModule;
//# sourceMappingURL=text-field-module.js.map