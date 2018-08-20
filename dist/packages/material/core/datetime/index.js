"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
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
var date_adapter_1 = require("./date-adapter");
var date_formats_1 = require("./date-formats");
var native_date_adapter_1 = require("./native-date-adapter");
var native_date_formats_1 = require("./native-date-formats");
__export(require("./date-adapter"));
__export(require("./date-formats"));
__export(require("./native-date-adapter"));
__export(require("./native-date-formats"));
var NativeDateModule = /** @class */ (function () {
    function NativeDateModule() {
    }
    NativeDateModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [platform_1.PlatformModule],
                    providers: [
                        { provide: date_adapter_1.DateAdapter, useClass: native_date_adapter_1.NativeDateAdapter },
                    ],
                },] },
    ];
    return NativeDateModule;
}());
exports.NativeDateModule = NativeDateModule;
var ɵ0 = native_date_formats_1.MAT_NATIVE_DATE_FORMATS;
exports.ɵ0 = ɵ0;
var MatNativeDateModule = /** @class */ (function () {
    function MatNativeDateModule() {
    }
    MatNativeDateModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [NativeDateModule],
                    providers: [{ provide: date_formats_1.MAT_DATE_FORMATS, useValue: ɵ0 }],
                },] },
    ];
    return MatNativeDateModule;
}());
exports.MatNativeDateModule = MatNativeDateModule;
//# sourceMappingURL=index.js.map