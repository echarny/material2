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
var observers_1 = require("@angular/cdk/observers");
var error_1 = require("./error");
var form_field_1 = require("./form-field");
var hint_1 = require("./hint");
var label_1 = require("./label");
var placeholder_1 = require("./placeholder");
var prefix_1 = require("./prefix");
var suffix_1 = require("./suffix");
var MatFormFieldModule = /** @class */ (function () {
    function MatFormFieldModule() {
    }
    MatFormFieldModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        error_1.MatError,
                        form_field_1.MatFormField,
                        hint_1.MatHint,
                        label_1.MatLabel,
                        placeholder_1.MatPlaceholder,
                        prefix_1.MatPrefix,
                        suffix_1.MatSuffix,
                    ],
                    imports: [
                        common_1.CommonModule,
                        observers_1.ObserversModule,
                    ],
                    exports: [
                        error_1.MatError,
                        form_field_1.MatFormField,
                        hint_1.MatHint,
                        label_1.MatLabel,
                        placeholder_1.MatPlaceholder,
                        prefix_1.MatPrefix,
                        suffix_1.MatSuffix,
                    ],
                },] },
    ];
    return MatFormFieldModule;
}());
exports.MatFormFieldModule = MatFormFieldModule;
//# sourceMappingURL=form-field-module.js.map