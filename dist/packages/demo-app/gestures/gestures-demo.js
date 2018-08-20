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
var GesturesDemo = /** @class */ (function () {
    function GesturesDemo() {
        this.panCount = 0;
        this.pressCount = 0;
        this.longpressCount = 0;
        this.swipeCount = 0;
        this.slideCount = 0;
    }
    GesturesDemo = __decorate([
        core_1.Component({selector: 'gestures-demo',
            template: "<div class=\"demo-gestures\"> <div (pan)=\"panCount = panCount + 1\" (longpress)=\"longpressCount = longpressCount + 1\" (press)=\"pressCount = pressCount + 1\" (swipe)=\"swipeCount = swipeCount + 1\" (slide)=\"slideCount = slideCount + 1\"> Drag, swipe, or press me. </div> <p>Pan: {{panCount}}</p> <p>Longpress: {{longpressCount}}</p> <p>Press: {{pressCount}}</p> <p>Swipe: {{swipeCount}}</p> <p>Slide: {{slideCount}}</p> </div> ",
            styles: [".demo-gestures div { height: 100px; width: 200px; background: gray; padding: 15px; color: white; } "],
        })
    ], GesturesDemo);
    return GesturesDemo;
}());
exports.GesturesDemo = GesturesDemo;
//# sourceMappingURL=gestures-demo.js.map