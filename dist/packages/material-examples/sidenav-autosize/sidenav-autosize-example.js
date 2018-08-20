"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Autosize sidenav
 */
var SidenavAutosizeExample = /** @class */ (function () {
    function SidenavAutosizeExample() {
        this.showFiller = false;
    }
    SidenavAutosizeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sidenav-autosize-example',
                    template: "<mat-drawer-container class=\"example-container\" autosize><mat-drawer #drawer class=\"example-sidenav\" mode=\"side\"><p>Auto-resizing sidenav</p><p *ngIf=\"showFiller\">Lorem, ipsum dolor sit amet consectetur.</p><button (click)=\"showFiller = !showFiller\" mat-raised-button>Toggle extra text</button></mat-drawer><div class=\"example-sidenav-content\"><button type=\"button\" mat-button (click)=\"drawer.toggle()\">Toggle sidenav</button></div></mat-drawer-container>",
                    styles: [".example-container { width: 500px; height: 300px; border: 1px solid rgba(0, 0, 0, 0.5); } .example-sidenav-content { display: flex; height: 100%; align-items: center; justify-content: center; } .example-sidenav { padding: 20px; } "],
                },] },
    ];
    return SidenavAutosizeExample;
}());
exports.SidenavAutosizeExample = SidenavAutosizeExample;
//# sourceMappingURL=sidenav-autosize-example.js.map