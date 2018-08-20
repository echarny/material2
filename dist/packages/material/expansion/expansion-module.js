"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var accordion_1 = require("@angular/cdk/accordion");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var accordion_2 = require("./accordion");
var expansion_panel_1 = require("./expansion-panel");
var expansion_panel_content_1 = require("./expansion-panel-content");
var expansion_panel_header_1 = require("./expansion-panel-header");
var MatExpansionModule = /** @class */ (function () {
    function MatExpansionModule() {
    }
    MatExpansionModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, accordion_1.CdkAccordionModule, portal_1.PortalModule],
                    exports: [
                        accordion_2.MatAccordion,
                        expansion_panel_1.MatExpansionPanel,
                        expansion_panel_1.MatExpansionPanelActionRow,
                        expansion_panel_header_1.MatExpansionPanelHeader,
                        expansion_panel_header_1.MatExpansionPanelTitle,
                        expansion_panel_header_1.MatExpansionPanelDescription,
                        expansion_panel_content_1.MatExpansionPanelContent,
                    ],
                    declarations: [
                        accordion_2.MatAccordion,
                        expansion_panel_1.MatExpansionPanel,
                        expansion_panel_1.MatExpansionPanelActionRow,
                        expansion_panel_header_1.MatExpansionPanelHeader,
                        expansion_panel_header_1.MatExpansionPanelTitle,
                        expansion_panel_header_1.MatExpansionPanelDescription,
                        expansion_panel_content_1.MatExpansionPanelContent,
                    ],
                },] },
    ];
    return MatExpansionModule;
}());
exports.MatExpansionModule = MatExpansionModule;
//# sourceMappingURL=expansion-module.js.map