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
var platform_1 = require("@angular/cdk/platform");
var PlatformDemo = /** @class */ (function () {
    function PlatformDemo(platform) {
        this.platform = platform;
        this.supportedInputTypes = platform_1.getSupportedInputTypes();
    }
    PlatformDemo = __decorate([
        core_1.Component({selector: 'platform-demo',
            template: "<p>Is Android: {{ platform.ANDROID }}</p> <p>Is iOS: {{ platform.IOS }}</p> <p>Is Firefox: {{ platform.FIREFOX }}</p> <p>Is Blink: {{ platform.BLINK }}</p> <p>Is Webkit: {{ platform.WEBKIT }}</p> <p>Is Trident: {{ platform.TRIDENT }}</p> <p>Is Edge: {{ platform.EDGE }}</p> <p> Supported input types: <span *ngFor=\"let type of supportedInputTypes\">{{ type }}, </span> </p> ",
        }),
        __metadata("design:paramtypes", [platform_1.Platform])
    ], PlatformDemo);
    return PlatformDemo;
}());
exports.PlatformDemo = PlatformDemo;
//# sourceMappingURL=platform-demo.js.map