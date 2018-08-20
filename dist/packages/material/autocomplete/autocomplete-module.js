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
var overlay_1 = require("@angular/cdk/overlay");
var core_2 = require("@angular/material/core");
var autocomplete_1 = require("./autocomplete");
var autocomplete_trigger_1 = require("./autocomplete-trigger");
var autocomplete_origin_1 = require("./autocomplete-origin");
var MatAutocompleteModule = /** @class */ (function () {
    function MatAutocompleteModule() {
    }
    MatAutocompleteModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatOptionModule, overlay_1.OverlayModule, core_2.MatCommonModule, common_1.CommonModule],
                    exports: [
                        autocomplete_1.MatAutocomplete,
                        core_2.MatOptionModule,
                        autocomplete_trigger_1.MatAutocompleteTrigger,
                        autocomplete_origin_1.MatAutocompleteOrigin,
                        core_2.MatCommonModule
                    ],
                    declarations: [autocomplete_1.MatAutocomplete, autocomplete_trigger_1.MatAutocompleteTrigger, autocomplete_origin_1.MatAutocompleteOrigin],
                    providers: [autocomplete_trigger_1.MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER],
                },] },
    ];
    return MatAutocompleteModule;
}());
exports.MatAutocompleteModule = MatAutocompleteModule;
//# sourceMappingURL=autocomplete-module.js.map