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
var CardAccessibilityDemo = /** @class */ (function () {
    function CardAccessibilityDemo(snackBar) {
        this.snackBar = snackBar;
        this.showProgress = false;
    }
    CardAccessibilityDemo.prototype.openSnackbar = function (message) {
        this.snackBar.open(message, '', { duration: 2000 });
    };
    CardAccessibilityDemo = __decorate([
        core_1.Component({selector: 'card-a11y',
            template: "<section> <h2>Dogs group</h2> <p>Showing a card with a group of content.</p> <mat-card class=\"demo-card\" role=\"group\"> <mat-card-content> <p>Herding Group</p> <p>Hound Group</p> <p>Non-Sporting Group</p> <p>Sporting Group</p> <p>Terrier Group</p> <p>Toy Group</p> <p>Working Group</p> <p>Foundation Stock Service</p> <p>Miscellaneous Class</p> </mat-card-content> </mat-card> </section> <section> <h2>Husky</h2> <p>Showing a card with title only.</p> <mat-card class=\"demo-card\"> Siberian Husky </mat-card> </section> <section> <h2>Malamute</h2> <p>Showing a Card with title and subtitle.</p> <mat-card class=\"demo-card\"> <mat-card-title>Alaskan Malamute</mat-card-title> <mat-card-subtitle>Dog breed</mat-card-subtitle> </mat-card> </section> <section> <h2>German Shepherd</h2> <p>Showing a card with title, subtitle, and a footer.</p> <mat-card class=\"demo-card\"> <mat-card-subtitle>Dog breed</mat-card-subtitle> <mat-card-title>German Shepherd</mat-card-title> <mat-card-content> The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. The breed's officially recognized name is German Shepherd Dog in the English language. The breed is also known as the Alsatian in Britain and Ireland. </mat-card-content> <mat-card-footer> People also search for Rottweiler, Siberian Husky, Labrador Retriever, Doberman Pinscher </mat-card-footer> </mat-card> </section> <section> <h2>Dachshund</h2> <p>Showing a card with title, subtitle, and avatar as header and a card image.</p> <mat-card class=\"demo-card\"> <mat-card-header> <img mat-card-avatar src=\"a11y/card/assets/dachshund-avatar.jpg\" aria-label=\"Dachshund avatar\"> <mat-card-title>Dachshund</mat-card-title> <mat-card-subtitle>Dog breed</mat-card-subtitle> </mat-card-header> <img mat-card-image src=\"a11y/card/assets/dachshund.jpg\" aria-label=\"Dachshund\"> <mat-card-content> The dachshund is a short-legged, long-bodied, hound-type dog breed. </mat-card-content> </mat-card> </section> <section> <h2>Shiba Inu</h2> <p>Showing a card with header, content, image, and two action buttons: \"share\" and \"like\".</p> <mat-card class=\"demo-card\"> <mat-card-header> <img mat-card-avatar src=\"a11y/card/assets/shiba-inu-avatar.jpg\" aria-label=\"Shiba Inu avatar\"> <mat-card-title>Shiba Inu</mat-card-title> <mat-card-subtitle>Dog Breed</mat-card-subtitle> </mat-card-header> <img mat-card-image  src=\"a11y/card/assets/shiba-inu.jpg\" aria-label=\"Shiba Inu\"> <mat-card-content> The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting. </mat-card-content> <mat-card-actions align=\"end\"> <button mat-button (click)=\"openSnackbar('Liked Shiba Inu')\">like</button> <button mat-button (click)=\"openSnackbar('Shared Shiba Inu')\">share</button> </mat-card-actions> </mat-card> </section> ",
            styles: [".demo-card button { text-transform: uppercase; } .demo-card { max-width: 450px; } "],
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], CardAccessibilityDemo);
    return CardAccessibilityDemo;
}());
exports.CardAccessibilityDemo = CardAccessibilityDemo;
//# sourceMappingURL=card-a11y.js.map