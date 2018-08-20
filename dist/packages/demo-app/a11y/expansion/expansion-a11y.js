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
var ExpansionPanelAccessibilityDemo = /** @class */ (function () {
    function ExpansionPanelAccessibilityDemo() {
    }
    ExpansionPanelAccessibilityDemo = __decorate([
        core_1.Component({selector: 'expansion-a11y',
            template: "<section class=\"demo-expansion\"> <h2>Siberian Husky</h2> <p>Single expansion panel</p> <mat-expansion-panel #myPanel> <mat-expansion-panel-header> <mat-panel-description> Dog breed </mat-panel-description> <mat-panel-title>Siberian Husky</mat-panel-title> </mat-expansion-panel-header> The Siberian Husky is a medium size working dog breed that originated in north-eastern Siberia, Russia. The breed belongs to the Spitz genetic family. <mat-action-row> <button mat-button (click)=\"myPanel.expanded = false\">Cancel</button> <a mat-button href=\"https://en.wikipedia.org/wiki/Siberian_Husky\" target=\"_blank\">Wikipedia</a> </mat-action-row> </mat-expansion-panel> </section> <section class=\"demo-expansion\"> <h2>Dog breeds</h2> <p>Multiple expansion panel</p> <mat-accordion> <mat-expansion-panel #panel1 > <mat-expansion-panel-header>Golden Retriever</mat-expansion-panel-header> <p> The Golden Retriever is a large-sized breed of dog bred as gun dogs to retrieve shot waterfowl such as ducks and upland game birds during hunting and shooting parties, and were named 'retriever' because of their ability to retrieve shot game undamaged. Golden Retrievers have an instinctive love of water, and are easy to train to basic or advanced obedience standards. </p> </mat-expansion-panel> <mat-expansion-panel #panel2 [disabled]=\"true\"> <mat-expansion-panel-header>Beagle</mat-expansion-panel-header> <p> The Beagle is a breed of small hound, similar in appearance to the much larger foxhound. The beagle is a scent hound, developed primarily for hunting hare. </p> </mat-expansion-panel> <mat-expansion-panel #panel3 > <mat-expansion-panel-header>Dachshund</mat-expansion-panel-header> <p> The dachshund is a short-legged, long-bodied, hound-type dog breed. The standard size dachshund was developed to scent, chase, and flush out badgers and other burrow-dwelling animals, while the miniature ... </p> <mat-action-row> <button mat-button (click)=\"panel3.expanded = false\">Close</button> </mat-action-row> </mat-expansion-panel> </mat-accordion> </section> ",
            styles: [".demo-expansion button, .demo-expansion a { margin: 8px; text-transform: uppercase; } "]
        })
    ], ExpansionPanelAccessibilityDemo);
    return ExpansionPanelAccessibilityDemo;
}());
exports.ExpansionPanelAccessibilityDemo = ExpansionPanelAccessibilityDemo;
//# sourceMappingURL=expansion-a11y.js.map