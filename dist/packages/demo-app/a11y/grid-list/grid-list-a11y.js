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
var GridListAccessibilityDemo = /** @class */ (function () {
    function GridListAccessibilityDemo() {
        this.dogs = [
            { name: 'Porter', human: 'Kara' },
            { name: 'Mal', human: 'Jeremy' },
            { name: 'Koby', human: 'Igor' },
            { name: 'Razzle', human: 'Ward' },
            { name: 'Molly', human: 'Rob' },
            { name: 'Husi', human: 'Matias' },
        ];
        this.tiles = [
            { text: 'Cappuccino', cols: 3, rows: 1, color: 'lightblue' },
            { text: 'Mocha', cols: 1, rows: 2, color: 'lightgreen' },
            { text: 'Latte', cols: 1, rows: 1, color: 'lightpink' },
            { text: 'Iced coffee', cols: 2, rows: 1, color: '#DDBDF1' },
        ];
        this.fixedCols = 4;
        this.fixedRowHeight = 100;
        this.ratioGutter = 1;
        this.fitListHeight = '400px';
        this.ratio = '4:1';
    }
    GridListAccessibilityDemo = __decorate([
        core_1.Component({selector: 'grid-list-a11y',
            template: "<section> <h2>Types of coffee (fix-height grid-list)</h2> <mat-grid-list role=\"list\" [cols]=\"fixedCols\" [rowHeight]=\"fixedRowHeight\"> <mat-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\" [style.background]=\"tile.color\" role=\"listitem\"> {{tile.text}} </mat-grid-tile> </mat-grid-list> </section> <section> <h2>Types of coffee (ratio-height grid list)</h2> <mat-grid-list role=\"list\" cols=\"2\" [rowHeight]=\"ratio\" gutterSize=\"4px\"> <mat-grid-tile *ngFor=\"let tile of tiles\" [style.background]=\"'lightblue'\" role=\"listitem\"> {{tile.text}} </mat-grid-tile> </mat-grid-list> </section> <section> <h2>Types of coffee (fit-height grid list)</h2> <mat-grid-list role=\"list\" cols=\"2\" rowHeight=\"fit\" [gutterSize]=\"ratioGutter\" [style.height]=\"fitListHeight\"> <mat-grid-tile *ngFor=\"let tile of tiles\" role=\"listitem\" [style.background]=\"'#F1EBBA'\"> {{tile.text}} </mat-grid-tile> </mat-grid-list> </section> <section> <h2>Angular team dogs (Grid list with header and footer)</h2> <mat-grid-list role=\"list\" cols=\"3\" rowHeight=\"200px\"> <mat-grid-tile *ngFor=\"let dog of dogs\" role=\"listitem\"> <mat-grid-tile-header>{{dog.name}}</mat-grid-tile-header> <img alt=\"Photo of {{dog.name}}\" src=\"https://material.angularjs.org/material2_assets/ngconf/{{dog.name}}.png\"> <mat-grid-tile-footer> <span mat-line>Human: {{dog.human}}</span> </mat-grid-tile-footer> </mat-grid-tile> </mat-grid-list> </section> ",
            styles: [""],
        })
    ], GridListAccessibilityDemo);
    return GridListAccessibilityDemo;
}());
exports.GridListAccessibilityDemo = GridListAccessibilityDemo;
//# sourceMappingURL=grid-list-a11y.js.map