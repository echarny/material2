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
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var moment_date_adapter_1 = require("./moment-date-adapter");
var moment_date_formats_1 = require("./moment-date-formats");
__export(require("./moment-date-adapter"));
__export(require("./moment-date-formats"));
var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        {
                            provide: material_1.DateAdapter,
                            useClass: moment_date_adapter_1.MomentDateAdapter,
                            deps: [material_1.MAT_DATE_LOCALE, moment_date_adapter_1.MAT_MOMENT_DATE_ADAPTER_OPTIONS]
                        }
                    ],
                },] },
    ];
    return MomentDateModule;
}());
exports.MomentDateModule = MomentDateModule;
var ɵ0 = moment_date_formats_1.MAT_MOMENT_DATE_FORMATS;
exports.ɵ0 = ɵ0;
var MatMomentDateModule = /** @class */ (function () {
    function MatMomentDateModule() {
    }
    MatMomentDateModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [MomentDateModule],
                    providers: [{ provide: material_1.MAT_DATE_FORMATS, useValue: ɵ0 }],
                },] },
    ];
    return MatMomentDateModule;
}());
exports.MatMomentDateModule = MatMomentDateModule;
//# sourceMappingURL=index.js.map