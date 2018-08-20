"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var a11y_1 = require("@angular/cdk/a11y");
var FocusOriginDemo = /** @class */ (function () {
    function FocusOriginDemo(fom) {
        this.fom = fom;
    }
    FocusOriginDemo = __decorate([
        core_1.Component({selector: 'focus-origin-demo',
            template: "<button #b class=\"demo-focusable\" cdkMonitorElementFocus>focus me!</button> <button (click)=\"b.focus()\">focus programmatically</button> <button (click)=\"fom.focusVia(b, 'mouse')\">focusVia: mouse</button> <button (click)=\"fom.focusVia(b, 'touch')\">focusVia: touch</button> <button (click)=\"fom.focusVia(b, 'keyboard')\">focusVia: keyboard</button> <button (click)=\"fom.focusVia(b, 'program')\">focusVia: program</button> <div>Active classes: {{b.classList}}</div> <br> <div class=\"demo-focusable\" tabindex=\"0\" cdkMonitorElementFocus> <p>div with element focus monitored</p> <button>1</button><button>2</button> </div> <div class=\"demo-focusable\" tabindex=\"0\" cdkMonitorSubtreeFocus> <p>div with subtree focus monitored</p> <button>1</button><button>2</button> </div> <div class=\"demo-focusable\" cdkMonitorSubtreeFocus> <p>Parent div should get same focus origin as button when button is focused:</p> <button class=\"demo-focusable\" cdkMonitorElementFocus>focus me</button> </div> ",
            styles: [".demo-focusable { border: 2px solid transparent; } .demo-focusable.cdk-focused { border: 2px solid red; } .demo-focusable.cdk-mouse-focused { background: green; } .demo-focusable.cdk-keyboard-focused { background: yellow; } .demo-focusable.cdk-program-focused { background: blue; } .demo-focusable.cdk-touch-focused { background: purple; } "],
        }),
        __metadata("design:paramtypes", [a11y_1.FocusMonitor])
    ], FocusOriginDemo);
    return FocusOriginDemo;
}());
exports.FocusOriginDemo = FocusOriginDemo;
//# sourceMappingURL=focus-origin-demo.js.map