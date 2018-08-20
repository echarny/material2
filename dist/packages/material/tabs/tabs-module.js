"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var observers_1 = require("@angular/cdk/observers");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var ink_bar_1 = require("./ink-bar");
var tab_1 = require("./tab");
var tab_body_1 = require("./tab-body");
var tab_content_1 = require("./tab-content");
var tab_group_1 = require("./tab-group");
var tab_header_1 = require("./tab-header");
var tab_label_1 = require("./tab-label");
var tab_label_wrapper_1 = require("./tab-label-wrapper");
var tab_nav_bar_1 = require("./tab-nav-bar/tab-nav-bar");
var a11y_1 = require("@angular/cdk/a11y");
var MatTabsModule = /** @class */ (function () {
    function MatTabsModule() {
    }
    MatTabsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        core_2.MatCommonModule,
                        portal_1.PortalModule,
                        core_2.MatRippleModule,
                        observers_1.ObserversModule,
                        a11y_1.A11yModule,
                    ],
                    // Don't export all components because some are only to be used internally.
                    exports: [
                        core_2.MatCommonModule,
                        tab_group_1.MatTabGroup,
                        tab_label_1.MatTabLabel,
                        tab_1.MatTab,
                        tab_nav_bar_1.MatTabNav,
                        tab_nav_bar_1.MatTabLink,
                        tab_content_1.MatTabContent,
                    ],
                    declarations: [
                        tab_group_1.MatTabGroup,
                        tab_label_1.MatTabLabel,
                        tab_1.MatTab,
                        ink_bar_1.MatInkBar,
                        tab_label_wrapper_1.MatTabLabelWrapper,
                        tab_nav_bar_1.MatTabNav,
                        tab_nav_bar_1.MatTabLink,
                        tab_body_1.MatTabBody,
                        tab_body_1.MatTabBodyPortal,
                        tab_header_1.MatTabHeader,
                        tab_content_1.MatTabContent,
                    ],
                },] },
    ];
    return MatTabsModule;
}());
exports.MatTabsModule = MatTabsModule;
//# sourceMappingURL=tabs-module.js.map