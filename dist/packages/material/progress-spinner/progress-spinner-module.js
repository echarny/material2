"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var core_2 = require("@angular/material/core");
var progress_spinner_1 = require("./progress-spinner");
var MatProgressSpinnerModule = /** @class */ (function () {
    function MatProgressSpinnerModule() {
    }
    MatProgressSpinnerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatCommonModule, common_1.CommonModule],
                    exports: [
                        progress_spinner_1.MatProgressSpinner,
                        progress_spinner_1.MatSpinner,
                        core_2.MatCommonModule
                    ],
                    declarations: [
                        progress_spinner_1.MatProgressSpinner,
                        progress_spinner_1.MatSpinner
                    ],
                },] },
    ];
    return MatProgressSpinnerModule;
}());
exports.MatProgressSpinnerModule = MatProgressSpinnerModule;
//# sourceMappingURL=progress-spinner-module.js.map