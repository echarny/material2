"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Basic use of the tab nav bar
 */
var TabNavBarBasicExample = /** @class */ (function () {
    function TabNavBarBasicExample() {
        this.links = ['First', 'Second', 'Third'];
        this.activeLink = this.links[0];
        this.background = '';
    }
    TabNavBarBasicExample.prototype.toggleBackground = function () {
        this.background = this.background ? '' : 'primary';
    };
    TabNavBarBasicExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tab-nav-bar-basic-example',
                    template: "<button mat-raised-button class=\"example-action-button\" (click)=\"toggleBackground()\">Toggle background</button><nav mat-tab-nav-bar [backgroundColor]=\"background\"><a mat-tab-link *ngFor=\"let link of links\" (click)=\"activeLink = link\" [active]=\"activeLink == link\">{{link}} </a><a mat-tab-link disabled=\"disabled\">Disabled Link</a></nav>",
                    styles: [".example-action-button { margin-bottom: 8px; } "],
                },] },
    ];
    return TabNavBarBasicExample;
}());
exports.TabNavBarBasicExample = TabNavBarBasicExample;
//# sourceMappingURL=tab-nav-bar-basic-example.js.map