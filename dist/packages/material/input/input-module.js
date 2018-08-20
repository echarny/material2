"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var text_field_1 = require("@angular/cdk/text-field");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var autosize_1 = require("./autosize");
var input_1 = require("./input");
var MatInputModule = /** @class */ (function () {
    function MatInputModule() {
    }
    MatInputModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [input_1.MatInput, autosize_1.MatTextareaAutosize],
                    imports: [
                        common_1.CommonModule,
                        text_field_1.TextFieldModule,
                        form_field_1.MatFormFieldModule,
                    ],
                    exports: [
                        text_field_1.TextFieldModule,
                        // We re-export the `MatFormFieldModule` since `MatInput` will almost always
                        // be used together with `MatFormField`.
                        form_field_1.MatFormFieldModule,
                        input_1.MatInput,
                        autosize_1.MatTextareaAutosize,
                    ],
                    providers: [core_2.ErrorStateMatcher],
                },] },
    ];
    return MatInputModule;
}());
exports.MatInputModule = MatInputModule;
//# sourceMappingURL=input-module.js.map