"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var scrolling_1 = require("@angular/cdk/scrolling");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var drawer_1 = require("./drawer");
var sidenav_1 = require("./sidenav");
var MatSidenavModule = /** @class */ (function () {
    function MatSidenavModule() {
    }
    MatSidenavModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        core_2.MatCommonModule,
                        scrolling_1.ScrollingModule,
                        platform_1.PlatformModule,
                    ],
                    exports: [
                        core_2.MatCommonModule,
                        drawer_1.MatDrawer,
                        drawer_1.MatDrawerContainer,
                        drawer_1.MatDrawerContent,
                        sidenav_1.MatSidenav,
                        sidenav_1.MatSidenavContainer,
                        sidenav_1.MatSidenavContent,
                    ],
                    declarations: [
                        drawer_1.MatDrawer,
                        drawer_1.MatDrawerContainer,
                        drawer_1.MatDrawerContent,
                        sidenav_1.MatSidenav,
                        sidenav_1.MatSidenavContainer,
                        sidenav_1.MatSidenavContent,
                    ],
                },] },
    ];
    return MatSidenavModule;
}());
exports.MatSidenavModule = MatSidenavModule;
//# sourceMappingURL=sidenav-module.js.map