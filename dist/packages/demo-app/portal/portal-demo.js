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
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var PortalDemo = /** @class */ (function () {
    function PortalDemo() {
    }
    Object.defineProperty(PortalDemo.prototype, "programmingJoke", {
        get: function () {
            return this.templatePortals.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalDemo.prototype, "mathJoke", {
        get: function () {
            return this.templatePortals.last;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PortalDemo.prototype, "scienceJoke", {
        get: function () {
            return new portal_1.ComponentPortal(ScienceJoke);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChildren(portal_1.CdkPortal),
        __metadata("design:type", core_1.QueryList)
    ], PortalDemo.prototype, "templatePortals", void 0);
    PortalDemo = __decorate([
        core_1.Component({selector: 'portal-demo',
            template: "<h2> The portal outlet is here: </h2> <div class=\"demo-portal-outlet\"> <ng-template [cdkPortalOutlet]=\"selectedPortal\"></ng-template> </div> <button type=\"button\" (click)=\"selectedPortal = programmingJoke\"> Programming joke </button> <button type=\"button\" (click)=\"selectedPortal = mathJoke\"> Math joke </button> <button type=\"button\" (click)=\"selectedPortal = scienceJoke\"> Science joke </button> <!-- Template vars on <ng-template> elements can't be accessed _in_ the template because Angular doesn't support grabbing the instance / TemplateRef this way because the variable may be referring to something *in* the template (such as #item in ngFor). As such, the component has to use @ViewChild / @ViewChildren to get these references. See https://github.com/angular/angular/issues/7158 --> <ng-template cdk-portal> <p> - Why don't jokes work in octal?</p> <p> - Because 7 10 11.</p> </ng-template> <div *cdk-portal> <p> - Did you hear about this year's Fibonacci Conference? </p> <p> - It's going to be as big as the last two put together. </p> </div> ",
            styles: [".demo-portal-outlet { margin-bottom: 10px; padding: 10px; border: 1px dashed black; width: 500px; height: 100px; } "],
        })
    ], PortalDemo);
    return PortalDemo;
}());
exports.PortalDemo = PortalDemo;
var ScienceJoke = /** @class */ (function () {
    function ScienceJoke() {
    }
    ScienceJoke = __decorate([
        core_1.Component({selector: 'science-joke',
            template: "<p> 100 kilopascals go into a bar. </p>"
        })
    ], ScienceJoke);
    return ScienceJoke;
}());
exports.ScienceJoke = ScienceJoke;
//# sourceMappingURL=portal-demo.js.map