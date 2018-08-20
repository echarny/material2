"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Basic drawer */
var SidenavDrawerOverviewExample = /** @class */ (function () {
    function SidenavDrawerOverviewExample() {
    }
    SidenavDrawerOverviewExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sidenav-drawer-overview-example',
                    template: "<mat-drawer-container class=\"example-container\"><mat-drawer mode=\"side\" opened>Drawer content</mat-drawer><mat-drawer-content>Main content</mat-drawer-content></mat-drawer-container>",
                    styles: [".example-container { width: 400px; height: 200px; margin: 10px; border: 1px solid #555; } "],
                },] },
    ];
    return SidenavDrawerOverviewExample;
}());
exports.SidenavDrawerOverviewExample = SidenavDrawerOverviewExample;
//# sourceMappingURL=sidenav-drawer-overview-example.js.map