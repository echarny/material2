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
var CardDemo = /** @class */ (function () {
    function CardDemo() {
    }
    CardDemo = __decorate([
        core_1.Component({selector: 'card-demo',
            template: "<div class=\"demo-card-container\"> <mat-card> Hello </mat-card> <mat-card> <mat-card-title-group> <mat-card-title>Card with title</mat-card-title> <mat-card-subtitle>Subtitle</mat-card-subtitle> <img mat-card-md-image> </mat-card-title-group> </mat-card> <mat-card> <mat-card-subtitle>Subtitle</mat-card-subtitle> <mat-card-title>Card with title and footer</mat-card-title> <mat-card-content> <p>This is supporting text.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </mat-card-content> <mat-card-actions> <button mat-button>LIKE</button> <button mat-button>SHARE</button> </mat-card-actions> <mat-card-footer> <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar> </mat-card-footer> </mat-card> <mat-card> <mat-card-subtitle>Subtitle</mat-card-subtitle> <mat-card-title>Card with title, footer, and inset-divider</mat-card-title> <mat-card-content> <p>This is supporting text.</p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </mat-card-content> <mat-divider [inset]=\"true\"></mat-divider> <mat-card-actions> <button mat-button>LIKE</button> <button mat-button>SHARE</button> </mat-card-actions> <mat-card-footer> <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar> </mat-card-footer> </mat-card> <mat-card> <img mat-card-image src=\"https://material.angularjs.org/latest/img/washedout.png\"> <mat-card-title>Content Title</mat-card-title> <mat-card-content> <p>Here is some content</p> </mat-card-content> <mat-card-actions align=\"end\"> <button mat-button>LIKE</button> <button mat-button>SHARE</button> </mat-card-actions> </mat-card> <mat-card> <mat-card-header> <img mat-card-avatar> <mat-card-title>Header title</mat-card-title> <mat-card-subtitle>Header subtitle</mat-card-subtitle> </mat-card-header> <img mat-card-image src=\"https://material.angularjs.org/latest/img/washedout.png\"> <mat-card-content> <p>Here is some content</p> </mat-card-content> </mat-card> <mat-card class=\"demo-card-blue mat-card-flat\"> <mat-card-title>Easily customizable</mat-card-title> <mat-card-actions> <button mat-button>First</button> <button mat-button>Second</button> </mat-card-actions> </mat-card> </div> ",
            styles: [".demo-card-container { display: flex; flex-flow: column nowrap; } .demo-card-container .mat-card { margin: 0 16px 16px 0; width: 350px; } .demo-card-container img { background-color: gray; } .demo-card-blue { background-color: #b0becc; } .demo-card-blue .mat-card-actions { display: flex; flex-direction: column; } "],
        })
    ], CardDemo);
    return CardDemo;
}());
exports.CardDemo = CardDemo;
//# sourceMappingURL=card-demo.js.map