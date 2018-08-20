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
var material_1 = require("@angular/material");
var RippleDemo = /** @class */ (function () {
    function RippleDemo() {
        this.centered = false;
        this.disabled = false;
        this.unbounded = false;
        this.rounded = false;
        this.rippleSpeed = 1;
        this.rippleColor = '';
        this.disableButtonRipples = false;
    }
    RippleDemo.prototype.launchRipple = function (persistent, disableAnimation) {
        if (persistent === void 0) { persistent = false; }
        if (disableAnimation === void 0) { disableAnimation = false; }
        if (!this.ripple) {
            return;
        }
        var rippleConfig = {
            centered: true,
            persistent: persistent,
            animation: disableAnimation ? { enterDuration: 0, exitDuration: 0 } : undefined
        };
        this.ripple.launch(0, 0, rippleConfig);
    };
    RippleDemo.prototype.fadeOutAll = function () {
        if (this.ripple) {
            this.ripple.fadeOutAll();
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatRipple),
        __metadata("design:type", material_1.MatRipple)
    ], RippleDemo.prototype, "ripple", void 0);
    RippleDemo = __decorate([
        core_1.Component({selector: 'ripple-demo',
            template: "<div class=\"demo-ripple\"> <section> <mat-checkbox [(ngModel)]=\"disableButtonRipples\">Disable button ripples</mat-checkbox> <button mat-button [disableRipple]=\"disableButtonRipples\">flat</button> <button mat-raised-button [disableRipple]=\"disableButtonRipples\">raised</button> <button mat-fab [disableRipple]=\"disableButtonRipples\"> <mat-icon>check</mat-icon> </button> <button mat-mini-fab [disableRipple]=\"disableButtonRipples\"> <mat-icon>check</mat-icon> </button> </section> <hr> <material-example id=\"ripple-overview\"></material-example> </div> ",
            styles: ["/* stylelint-disable material/no-prefixes */ /* stylelint-enable */ .demo-ripple button, .demo-ripple a { margin: 8px; text-transform: uppercase; } "],
        })
    ], RippleDemo);
    return RippleDemo;
}());
exports.RippleDemo = RippleDemo;
//# sourceMappingURL=ripple-demo.js.map