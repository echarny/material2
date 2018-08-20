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
var GridListDemo = /** @class */ (function () {
    function GridListDemo() {
        this.tiles = [
            { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
            { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
            { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
            { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
        ];
        this.dogs = [
            { name: 'Porter', human: 'Kara' },
            { name: 'Mal', human: 'Jeremy' },
            { name: 'Koby', human: 'Igor' },
            { name: 'Razzle', human: 'Ward' },
            { name: 'Molly', human: 'Rob' },
            { name: 'Husi', human: 'Matias' },
        ];
        this.basicRowHeight = 80;
        this.fixedCols = 4;
        this.fixedRowHeight = 100;
        this.ratioGutter = 1;
        this.fitListHeight = '400px';
        this.ratio = '4:1';
    }
    GridListDemo.prototype.addTileCols = function () { this.tiles[2].cols++; };
    GridListDemo = __decorate([
        core_1.Component({selector: 'grid-list-demo',
            template: "<div class=\"demo-grid-list\"> <mat-card> <mat-card-title>Basic grid list</mat-card-title> <mat-card-content class=\"demo-basic-list\"> <mat-grid-list cols=\"4\" [rowHeight]=\"basicRowHeight\"> <mat-grid-tile> One </mat-grid-tile> <mat-grid-tile> Two </mat-grid-tile> <mat-grid-tile> Three </mat-grid-tile> <mat-grid-tile> Four </mat-grid-tile> </mat-grid-list> </mat-card-content> </mat-card> <mat-card> <mat-card-title>Fixed-height grid list</mat-card-title> <mat-card-content> <mat-grid-list [cols]=\"fixedCols\" [rowHeight]=\"fixedRowHeight\"> <mat-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\" [style.background]=\"tile.color\"> {{tile.text}} </mat-grid-tile> </mat-grid-list> </mat-card-content> <mat-card-actions> <p>Change list cols: <input type=\"number\" [(ngModel)]=\"fixedCols\"></p> <p>Change row height: <input type=\"number\" [(ngModel)]=\"fixedRowHeight\"></p> <button mat-button (click)=\"addTileCols()\" color=\"primary\">ADD COLSPAN (THREE)</button> </mat-card-actions> </mat-card> <mat-card> <mat-card-title>Ratio-height grid list</mat-card-title> <mat-card-content> <mat-grid-list cols=\"2\" [rowHeight]=\"ratio\" gutterSize=\"4px\"> <mat-grid-tile *ngFor=\"let tile of tiles\" [style.background]=\"'lightblue'\"> {{tile.text}} </mat-grid-tile> </mat-grid-list> </mat-card-content> <mat-card-actions> <p>Change ratio: <input [(ngModel)]=\"ratio\"></p> </mat-card-actions> </mat-card> <mat-card> <mat-card-title>Fit-height grid list</mat-card-title> <mat-card-content> <mat-grid-list cols=\"2\" rowHeight=\"fit\" [gutterSize]=\"ratioGutter\" [style.height]=\"fitListHeight\"> <mat-grid-tile *ngFor=\"let tile of tiles\" [style.background]=\"'#F1EBBA'\"> {{tile.text}} </mat-grid-tile> </mat-grid-list> </mat-card-content> <mat-card-actions> <p>Change list height: <input [(ngModel)]=\"fitListHeight\"></p> <p>Change gutter: <input type=\"number\" [(ngModel)]=\"ratioGutter\"></p> </mat-card-actions> </mat-card> <mat-card> <mat-card-title>Grid list with header</mat-card-title> <mat-card-content> <mat-grid-list cols=\"3\" rowHeight=\"200px\"> <mat-grid-tile *ngFor=\"let dog of dogs\" style=\"background:gray\"> <mat-grid-tile-header> <mat-icon mat-grid-avatar>info_outline</mat-icon> {{dog.name}} </mat-grid-tile-header> </mat-grid-tile> </mat-grid-list> </mat-card-content> </mat-card> <mat-card> <mat-card-title>Grid list with footer</mat-card-title> <mat-card-content> <mat-grid-list cols=\"3\" rowHeight=\"200px\"> <mat-grid-tile *ngFor=\"let dog of dogs\"> <img [alt]=\"dog.name\" src=\"https://material.angularjs.org/material2_assets/ngconf/{{dog.name}}.png\"> <mat-grid-tile-footer> <h3 mat-line>{{dog.name}}</h3> <span mat-line>Human: {{dog.human}}</span> <mat-icon>star_border</mat-icon> </mat-grid-tile-footer> </mat-grid-tile> </mat-grid-list> </mat-card-content> </mat-card> </div> ",
            styles: [".demo-grid-list { width: 1100px; } .demo-grid-list .mat-card { margin: 16px 0; } .demo-grid-list p { margin: 16px; } .demo-grid-list .demo-basic-list .mat-grid-tile { background: rgba(0, 0, 0, 0.32); } .demo-grid-list img { width: 350px; } "]
        })
    ], GridListDemo);
    return GridListDemo;
}());
exports.GridListDemo = GridListDemo;
//# sourceMappingURL=grid-list-demo.js.map