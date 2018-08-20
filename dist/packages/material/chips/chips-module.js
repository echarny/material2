"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var chip_1 = require("./chip");
var chip_default_options_1 = require("./chip-default-options");
var chip_input_1 = require("./chip-input");
var chip_list_1 = require("./chip-list");
var CHIP_DECLARATIONS = [
    chip_list_1.MatChipList,
    chip_1.MatChip,
    chip_input_1.MatChipInput,
    chip_1.MatChipRemove,
    chip_1.MatChipAvatar,
    chip_1.MatChipTrailingIcon,
];
var ɵ0 = {
    separatorKeyCodes: [keycodes_1.ENTER]
};
exports.ɵ0 = ɵ0;
var MatChipsModule = /** @class */ (function () {
    function MatChipsModule() {
    }
    MatChipsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: CHIP_DECLARATIONS,
                    declarations: CHIP_DECLARATIONS,
                    providers: [
                        core_2.ErrorStateMatcher,
                        {
                            provide: chip_default_options_1.MAT_CHIPS_DEFAULT_OPTIONS,
                            useValue: (ɵ0)
                        }
                    ]
                },] },
    ];
    return MatChipsModule;
}());
exports.MatChipsModule = MatChipsModule;
//# sourceMappingURL=chips-module.js.map