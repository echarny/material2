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
var platform_browser_1 = require("@angular/platform-browser");
var IconDemo = /** @class */ (function () {
    function IconDemo(iconRegistry, sanitizer) {
        iconRegistry
            .addSvgIcon('thumb-up', sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/thumbup-icon.svg'))
            .addSvgIconLiteral('bike', sanitizer.bypassSecurityTrustHtml(BIKE_ICON))
            .addSvgIconSetInNamespace('core', sanitizer.bypassSecurityTrustResourceUrl('/icon/assets/core-icon-set.svg'))
            .addSvgIconSetLiteralInNamespace('core-inline', sanitizer.bypassSecurityTrustHtml(INLINE_ICON_SET))
            .registerFontClassAlias('fontawesome', 'fa');
    }
    IconDemo = __decorate([
        core_1.Component({selector: 'mat-icon-demo',
            template: "<div class=\"demo-icon\"> <p> These are some icons. </p> <p> By name registered with MatIconProvider: <mat-icon svgIcon=\"thumb-up\" class=\"demo-icon-green\"></mat-icon> <mat-icon svgIcon=\"thumb-up\"></mat-icon> </p> <p> From inline template with MatIconProvider: <mat-icon svgIcon=\"bike\" class=\"green\"></mat-icon> <mat-icon svgIcon=\"bike\"></mat-icon> </p> <p> Mirrored in RTL: <mat-icon class=\"mat-icon-rtl-mirror green\" svgIcon=\"thumb-up\"></mat-icon> <mat-icon class=\"mat-icon-rtl-mirror\" svgIcon=\"thumb-up\"></mat-icon> <mat-icon class=\"mat-icon-rtl-mirror green\" svgIcon=\"bike\"></mat-icon> <mat-icon class=\"mat-icon-rtl-mirror\" svgIcon=\"bike\"></mat-icon> </p> <p> From icon set: <mat-icon svgIcon=\"core:alarm\"></mat-icon> <mat-icon svgIcon=\"core:accessibility\"></mat-icon> <mat-icon svgIcon=\"core:alarm\"></mat-icon> </p> <p> From inline icon set: <mat-icon svgIcon=\"core-inline:account-balance\"></mat-icon> <mat-icon svgIcon=\"core-inline:account-balance-wallet\"></mat-icon> <mat-icon svgIcon=\"core-inline:account-box\"></mat-icon> </p> <p> Ligature from Material Icons font: <mat-icon>home</mat-icon> </p> <p> Using a theme: <mat-icon color=\"primary\">home</mat-icon> <mat-icon color=\"accent\">home</mat-icon> <mat-icon color=\"warn\">home</mat-icon> </p> <p> Custom icon font and CSS: <mat-icon fontSet=\"fontawesome\" fontIcon=\"fa-birthday-cake\"></mat-icon> </p> <span>Inline styling allows icons to appear as the same size as text around them.</span> <p> My <span class=\"cdk-visually-hidden\">dog</span><mat-icon inline=\"true\">pets</mat-icon> is my <span class=\"cdk-visually-hidden\">favorite</span><mat-icon inline=\"true\">favorite</mat-icon>, he loves to go on <span class=\"cdk-visually-hidden\">walks</span> <mat-icon inline=\"true\">directions_walk</mat-icon> </p> </div> ",
            styles: [".demo-icon .mat-icon.demo-icon-green { color: green; } "],
        }),
        __metadata("design:paramtypes", [material_1.MatIconRegistry, platform_browser_1.DomSanitizer])
    ], IconDemo);
    return IconDemo;
}());
exports.IconDemo = IconDemo;
var BIKE_ICON = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 " +
    "5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 " +
    "1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 " +
    "0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 " +
    "1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 " +
    "5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 " +
    "3.5-3.5 3.5z\"/>\n  </svg>\n";
var INLINE_ICON_SET = "\n  <svg>\n    <defs>\n    <svg id=\"account-balance\">\n      <path d=\"M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-" +
    "7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z\"/>\n    </svg>\n    <svg id=\"account-balance-wallet\">\n      <path d=\"M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-" +
    "2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9" +
    "-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"\n      />\n    </svg>\n    <svg id=\"account-box\">\n      <path d=\"M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H" +
    "5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-" +
    "3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z\"/>\n    </svg>\n    </defs>\n  </svg>\n";
//# sourceMappingURL=icon-demo.js.map