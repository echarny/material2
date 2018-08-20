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
var SliderAccessibilityDemo = /** @class */ (function () {
    function SliderAccessibilityDemo() {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
    }
    Object.defineProperty(SliderAccessibilityDemo.prototype, "swatchBackground", {
        get: function () {
            return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
        },
        enumerable: true,
        configurable: true
    });
    SliderAccessibilityDemo = __decorate([
        core_1.Component({selector: 'slider-a11y',
            template: "<section> <h2>Continuous slider (e.g. color component sliders)</h2> <p>Move the red, green, and blue sliders to choose a color.</p> <div class=\"demo-color-container\"> <div class=\"demo-color-sliders\"> <div> <label class=\"demo-color-label\" for=\"r-slider\">Red</label> <mat-slider aria-label=\"Red\" id=\"r-slider\" min=\"0\" max=\"255\" [(ngModel)]=\"red\"></mat-slider> </div> <div> <label class=\"demo-color-label\" for=\"g-slider\">Green</label> <mat-slider aria-label=\"Green\" id=\"g-slider\" min=\"0\" max=\"255\" [(ngModel)]=\"green\"></mat-slider> </div> <div> <label class=\"demo-color-label\" for=\"b-slider\">Blue</label> <mat-slider aria-label=\"Blue\" id=\"b-slider\" min=\"0\" max=\"255\" [(ngModel)]=\"blue\"></mat-slider> </div> </div> <div class=\"demo-color-swatch\" [style.background]=\"swatchBackground\"></div> </div> </section> <section> <h2>Discrete slider (e.g. rate a product)</h2> <p>Please rate our product on a scale of 1 (not satisfied) to 5 (extremely satisfied).</p> <mat-slider min=\"1\" max=\"5\" tickInterval=\"1\" thumbLabel aria-label=\"Rating\"></mat-slider> </section> <section> <h2>Vertical slider (e.g. volume control)</h2> <p>Use the slider to adjust the volume.</p> <div class=\"demo-volume-container\"> <label for=\"vol-slider\"> <mat-icon aria-hidden>volume_up</mat-icon> <span class=\"cdk-visually-hidden\">Volume</span> </label> <mat-slider aria-label=\"Volume\" id=\"vol-slider\" min=\"0\" max=\"100\" vertical inverted></mat-slider> </div> </section> ",
            styles: [".demo-color-container { display: flex; align-items: center; } .demo-color-label { display: inline-block; width: 50px; } .demo-color-swatch { width: 60px; height: 60px; margin-left: 60px; } .demo-volume-container { display: inline-flex; flex-direction: column; align-items: center; } "],
        })
    ], SliderAccessibilityDemo);
    return SliderAccessibilityDemo;
}());
exports.SliderAccessibilityDemo = SliderAccessibilityDemo;
//# sourceMappingURL=slider-a11y.js.map