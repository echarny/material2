"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Drawer with explicit backdrop setting */
var SidenavBackdropExample = /** @class */ (function () {
    function SidenavBackdropExample() {
    }
    SidenavBackdropExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sidenav-backdrop-example',
                    template: "<mat-drawer-container class=\"example-container\" [hasBackdrop]=\"hasBackdrop.value\"><mat-drawer #drawer [mode]=\"mode.value\">I'm a drawer</mat-drawer><mat-drawer-content><mat-form-field><mat-label>Sidenav mode</mat-label><mat-select #mode value=\"side\"><mat-option value=\"side\">Side</mat-option><mat-option value=\"over\">Over</mat-option><mat-option value=\"push\">Push</mat-option></mat-select></mat-form-field><mat-form-field><mat-label>Has backdrop</mat-label><mat-select #hasBackdrop><mat-option>Unset</mat-option><mat-option [value]=\"true\">True</mat-option><mat-option [value]=\"false\">False</mat-option></mat-select></mat-form-field><button mat-raised-button (click)=\"drawer.toggle()\">Toggle drawer</button></mat-drawer-content></mat-drawer-container>",
                    styles: [".example-container { width: 400px; height: 200px; margin: 10px; border: 1px solid #555; } "],
                },] },
    ];
    return SidenavBackdropExample;
}());
exports.SidenavBackdropExample = SidenavBackdropExample;
//# sourceMappingURL=sidenav-backdrop-example.js.map