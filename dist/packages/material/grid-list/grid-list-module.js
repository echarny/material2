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
var core_2 = require("@angular/material/core");
var grid_tile_1 = require("./grid-tile");
var grid_list_1 = require("./grid-list");
var MatGridListModule = /** @class */ (function () {
    function MatGridListModule() {
    }
    MatGridListModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [core_2.MatLineModule, core_2.MatCommonModule],
                    exports: [
                        grid_list_1.MatGridList,
                        grid_tile_1.MatGridTile,
                        grid_tile_1.MatGridTileText,
                        core_2.MatLineModule,
                        core_2.MatCommonModule,
                        grid_tile_1.MatGridTileHeaderCssMatStyler,
                        grid_tile_1.MatGridTileFooterCssMatStyler,
                        grid_tile_1.MatGridAvatarCssMatStyler
                    ],
                    declarations: [
                        grid_list_1.MatGridList,
                        grid_tile_1.MatGridTile,
                        grid_tile_1.MatGridTileText,
                        grid_tile_1.MatGridTileHeaderCssMatStyler,
                        grid_tile_1.MatGridTileFooterCssMatStyler,
                        grid_tile_1.MatGridAvatarCssMatStyler
                    ],
                },] },
    ];
    return MatGridListModule;
}());
exports.MatGridListModule = MatGridListModule;
//# sourceMappingURL=grid-list-module.js.map