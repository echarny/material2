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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SliderDemo = /** @class */ (function () {
    function SliderDemo() {
        this.val = 50;
        this.min = 0;
        this.max = 100;
        this.disabledValue = 0;
    }
    SliderDemo = __decorate([
        core_1.Component({selector: 'slider-demo',
            template: "<h1>Default Slider</h1> Label <mat-slider #slidey aria-label=\"Basic slider\"></mat-slider> {{slidey.value}} <h1>Colors</h1> <mat-slider color=\"primary\" value=\"50\" thumbLabel aria-label=\"Primary color slider\"></mat-slider> <mat-slider color=\"accent\" value=\"50\" thumbLabel aria-label=\"Accent color slider\"></mat-slider> <mat-slider color=\"warn\" value=\"50\" thumbLabel aria-label=\"Warn color slider\"></mat-slider> <h1>Slider with Min and Max</h1> <input [(ngModel)]=\"min\" type=\"number\"> <mat-slider [min]=\"min\" [max]=\"max\" tickInterval=\"5\" #slider2 aria-label=\"Min & max slider\"> </mat-slider> {{slider2.value}} <input [(ngModel)]=\"max\" type=\"number\"> <h1>Disabled Slider</h1> <mat-slider disabled [(ngModel)]=\"disabledValue\" [tickInterval]=\"1\" aria-label=\"Disabled slider\"> </mat-slider> <input [(ngModel)]=\"disabledValue\" type=\"number\"> <h1>Slider with set value</h1> <mat-slider value=\"43\" aria-label=\"Initial value slider\"></mat-slider> <h1>Slider with step defined</h1> <mat-slider min=\"1\" max=\"100\" step=\"20\" #slider5 aria-label=\"Slider with step\"></mat-slider> {{slider5.value}} <h1>Slider with set tick interval</h1> <mat-slider tickInterval=\"auto\" aria-label=\"Slider with auto ticks\"></mat-slider> <mat-slider tickInterval=\"9\" aria-label=\"Slider with ticks\"></mat-slider> <h1>Slider with Thumb Label</h1> <mat-slider thumbLabel aria-label=\"Slider with thumb label\"></mat-slider> <h1>Slider with one-way binding</h1> <mat-slider [value]=\"val\" step=\"40\" aria-label=\"Slider with value binding\"></mat-slider> <input [(ngModel)]=\"val\" type=\"number\"> <h1>Slider with two-way binding</h1> <mat-slider [(ngModel)]=\"demo\" step=\"40\" aria-label=\"Slider with ngModel\"></mat-slider> <input [(ngModel)]=\"demo\" type=\"number\"> <h1>Inverted slider</h1> <mat-slider invert value=\"50\" tickInterval=\"5\" aria-label=\"Inverted slider\"></mat-slider> <h1>Vertical slider</h1> <mat-slider vertical thumbLabel tickInterval=\"auto\" value=\"50\" aria-label=\"Vertical slider\"> </mat-slider> <h1>Inverted vertical slider</h1> <mat-slider vertical invert thumbLabel tickInterval=\"auto\" value=\"50\" aria-label=\"Inverted vertical slider\"> </mat-slider> <h1>Set/lost focus to show thumblabel programmatically</h1> <mat-slider #demoSlider=\"matSlider\" thumbLabel aria-label=\"Slider with thumb label\"></mat-slider> <button (click)=\"demoSlider.focus()\">Focus Slider</button> <button (click)=\"demoSlider.blur()\">Blur Slider</button> <mat-tab-group> <mat-tab label=\"One\"> <mat-slider min=\"1\" max=\"5\" value=\"3\" aria-label=\"Slider in a tab\"></mat-slider> </mat-tab> </mat-tab-group> ",
        })
    ], SliderDemo);
    return SliderDemo;
}());
exports.SliderDemo = SliderDemo;
//# sourceMappingURL=slider-demo.js.map