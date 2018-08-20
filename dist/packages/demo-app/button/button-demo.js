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
var ButtonDemo = /** @class */ (function () {
    function ButtonDemo() {
        this.isDisabled = false;
        this.clickCounter = 0;
        this.toggleDisable = false;
    }
    ButtonDemo = __decorate([
        core_1.Component({selector: 'button-demo',
            template: "<div class=\"demo-button\"> <h4 class=\"demo-section-header\">Buttons</h4> <section> <button mat-button>normal</button> <button mat-raised-button>raised</button> <button mat-stroked-button>stroked</button> <button mat-flat-button>flat</button> <button mat-fab><mat-icon>check</mat-icon></button> <button mat-mini-fab><mat-icon>check</mat-icon></button> </section> <h4 class=\"demo-section-header\">Anchors</h4> <section> <a href=\"//www.google.com\" mat-button color=\"primary\">SEARCH</a> <a href=\"//www.google.com\" mat-raised-button>SEARCH</a> <a href=\"//www.google.com\" mat-stroked-button color=\"primary\">SEARCH</a> <a href=\"//www.google.com\" mat-flat-button>SEARCH</a> <a href=\"//www.google.com\" mat-fab><mat-icon>check</mat-icon></a> <a href=\"//www.google.com\" mat-mini-fab><mat-icon>check</mat-icon></a> </section> <h4 class=\"demo-section-header\">Text Buttons [mat-button]</h4> <section> <button mat-button color=\"primary\">primary</button> <button mat-button color=\"accent\">accent</button> <button mat-button color=\"warn\">warn</button> <button mat-button disabled>disabled</button> </section> <h4 class=\"demo-section-header\">Raised Buttons [mat-raised-button]</h4> <section> <button mat-raised-button color=\"primary\">primary</button> <button mat-raised-button color=\"accent\">accent</button> <button mat-raised-button color=\"warn\">warn</button> <button mat-raised-button disabled>disabled</button> </section> <h4 class=\"demo-section-header\">Stroked Buttons [mat-stroked-button]</h4> <section> <button mat-stroked-button color=\"primary\">primary</button> <button mat-stroked-button color=\"accent\">accent</button> <button mat-stroked-button color=\"warn\">warn</button> <button mat-stroked-button disabled>disabled</button> </section> <h4 class=\"demo-section-header\">Flat Buttons [mat-flat-button]</h4> <section> <button mat-flat-button color=\"primary\">primary</button> <button mat-flat-button color=\"accent\">accent</button> <button mat-flat-button color=\"warn\">warn</button> <button mat-flat-button disabled>disabled</button> </section> <h4 class=\"demo-section-header\"> Icon Buttons [mat-icon-button]</h4> <section> <button mat-icon-button color=\"primary\"><mat-icon>cached</mat-icon></button> <button mat-icon-button color=\"accent\"><mat-icon>backup</mat-icon></button> <button mat-icon-button color=\"warn\"><mat-icon>trending_up</mat-icon></button> <button mat-icon-button disabled><mat-icon>visibility</mat-icon></button> </section> <h4 class=\"demo-section-header\">Fab Buttons [mat-fab]</h4> <section> <button mat-fab color=\"primary\"><mat-icon>delete</mat-icon></button> <button mat-fab color=\"accent\"><mat-icon>bookmark</mat-icon></button> <button mat-fab color=\"warn\"><mat-icon>home</mat-icon></button> <button mat-fab disabled><mat-icon>favorite</mat-icon></button> </section> <h4 class=\"demo-section-header\"> Mini Fab Buttons [mat-mini-fab]</h4> <section> <button mat-mini-fab color=\"primary\"><mat-icon>menu</mat-icon></button> <button mat-mini-fab color=\"accent\"><mat-icon>plus_one</mat-icon></button> <button mat-mini-fab color=\"warn\"><mat-icon>filter_list</mat-icon></button> <button mat-mini-fab disabled><mat-icon>home</mat-icon></button> </section> <h4 class=\"demo-section-header\">Interaction/State</h4> <section class=\"demo-no-flex\"> <div> <p>isDisabled: {{isDisabled}}</p> <p>Button 1 as been clicked {{clickCounter}} times</p> <button mat-flat-button (click)=\"isDisabled=!isDisabled\"> {{isDisabled ? 'Enable All' : 'Disable All'}} </button> <button mat-flat-button (click)=\"button1.focus()\">Focus 1</button> <button mat-flat-button (click)=\"button2.focus()\">Focus 2</button> <button mat-flat-button (click)=\"button3.focus()\">Focus 3</button> <button mat-flat-button (click)=\"button4.focus()\">Focus 4</button> </div> <div> <button mat-button #button1 [disabled]=\"isDisabled\" (click)=\"clickCounter=clickCounter+1\"> Button 1 </button> <button mat-button #button2 color=\"primary\" [disabled]=\"isDisabled\"> Button 2 </button> <a href=\"//www.google.com\" #button3 mat-button color=\"accent\" [disabled]=\"isDisabled\"> Button 3 </a> <button mat-raised-button #button4 color=\"primary\" [disabled]=\"isDisabled\"> Button 4 </button> <button mat-mini-fab [disabled]=\"isDisabled\"> <mat-icon>check</mat-icon> </button> <button mat-icon-button color=\"accent\" [disabled]=\"isDisabled\"> <mat-icon>favorite</mat-icon> </button> </div> </section> </div> ",
            styles: [".demo-button button, .demo-button a { margin: 8px; text-transform: uppercase; } .demo-button section { display: flex; align-items: center; margin: 8px; } .demo-button p { padding: 5px 15px; } .demo-button .demo-section-header { font-weight: 500; margin: 0; } .demo-button .demo-no-flex { display: block; } "],
        })
    ], ButtonDemo);
    return ButtonDemo;
}());
exports.ButtonDemo = ButtonDemo;
//# sourceMappingURL=button-demo.js.map