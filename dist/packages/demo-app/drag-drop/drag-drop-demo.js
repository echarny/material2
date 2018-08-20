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
var icon_1 = require("@angular/material/icon");
var platform_browser_1 = require("@angular/platform-browser");
var drag_drop_1 = require("@angular/cdk-experimental/drag-drop");
var DragAndDropDemo = /** @class */ (function () {
    function DragAndDropDemo(iconRegistry, sanitizer) {
        this.todo = [
            'Come up with catchy start-up name',
            'Add "blockchain" to name',
            'Sell out',
            'Profit',
            'Go to sleep'
        ];
        this.done = [
            'Get up',
            'Have breakfast',
            'Brush teeth',
            'Check reddit'
        ];
        this.horizontalData = [
            'Bronze age',
            'Iron age',
            'Middle ages',
            'Early modern period',
            'Long nineteenth century'
        ];
        iconRegistry.addSvgIconLiteral('dnd-move', sanitizer.bypassSecurityTrustHtml("\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n        <path d=\"M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5" +
            "-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z\"/>\n        <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n      </svg>\n    "));
    }
    DragAndDropDemo.prototype.drop = function (event) {
        if (event.previousContainer === event.container) {
            drag_drop_1.moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            drag_drop_1.transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    };
    DragAndDropDemo = __decorate([
        core_1.Component({selector: 'drag-drop-demo',
            template: "<div> <div class=\"list\"> <h2>To do</h2> <cdk-drop #one (dropped)=\"drop($event)\" [lockAxis]=\"axisLock\" [data]=\"todo\" [connectedTo]=\"[two]\"> <div *ngFor=\"let item of todo\" cdkDrag> {{item}} <mat-icon cdkDragHandle svgIcon=\"dnd-move\"></mat-icon> </div> </cdk-drop> </div> <div class=\"list\"> <h2>Done</h2> <cdk-drop #two (dropped)=\"drop($event)\" [lockAxis]=\"axisLock\" [data]=\"done\" [connectedTo]=\"[one]\"> <div *ngFor=\"let item of done\" cdkDrag> {{item}} <mat-icon cdkDragHandle svgIcon=\"dnd-move\"></mat-icon> </div> </cdk-drop> </div> </div> <div> <div class=\"list horizontal\"> <h2>Horizontal list</h2> <cdk-drop orientation=\"horizontal\" (dropped)=\"drop($event)\" [lockAxis]=\"axisLock\" [data]=\"horizontalData\"> <div *ngFor=\"let item of horizontalData\" cdkDrag> {{item}} <mat-icon cdkDragHandle svgIcon=\"dnd-move\"></mat-icon> </div> </cdk-drop> </div> </div> <div class=\"list\"> <h2>Free dragging</h2> <div cdkDrag class=\"free-draggable\" [cdkDragLockAxis]=\"axisLock\">Drag me around</div> </div> <div> <h2>Data</h2> <pre>{{todo.join(', ')}}</pre> <pre>{{done.join(', ')}}</pre> <pre>{{horizontalData.join(', ')}}</pre> </div> <div> <h2>Axis locking</h2> <mat-form-field> <mat-label>Lock position along axis</mat-label> <mat-select [(ngModel)]=\"axisLock\"> <mat-option>None</mat-option> <mat-option value=\"x\">X axis</mat-option> <mat-option value=\"y\">Y axis</mat-option> </mat-select> </mat-form-field> </div> ",
            styles: [".list { width: 500px; max-width: 100%; margin-bottom: 25px; display: inline-block; margin-right: 25px; vertical-align: top; } [dir='rtl'] .list { margin-right: 0; margin-left: 25px; } .list.horizontal { width: 1000px; margin-right: 0; margin-left: 0; } .cdk-drop { border: solid 1px #ccc; min-height: 60px; display: block; } .horizontal .cdk-drop { display: flex; flex-direction: row; } .cdk-drag { padding: 20px 10px; border-bottom: solid 1px #ccc; display: flex; flex-direction: row; align-items: center; justify-content: space-between; box-sizing: border-box; } .cdk-drop-dragging .cdk-drag:not(.cdk-drag-placeholder) { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); } .horizontal .cdk-drag { border: none; border-right: solid 1px #ccc; flex-grow: 1; flex-basis: 0; } [dir='rtl'] .horizontal .cdk-drag { border-right: none; border-left: solid 1px #ccc; } .cdk-drop .cdk-drag:last-child { border: none; } .cdk-drag-preview { box-sizing: border-box; opacity: 0.5; } .cdk-drag-animating { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); } .cdk-drag-placeholder { opacity: 0; } .wrapper { border: solid 1px red; } .cdk-drag-handle { cursor: move; } .cdk-drag-handle svg { fill: rgba(0, 0, 0, 0.5); } pre { white-space: normal; } .free-draggable { width: 200px; height: 200px; border: solid 1px #ccc; cursor: move; display: flex; justify-content: center; align-items: center; } "],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [icon_1.MatIconRegistry, platform_browser_1.DomSanitizer])
    ], DragAndDropDemo);
    return DragAndDropDemo;
}());
exports.DragAndDropDemo = DragAndDropDemo;
//# sourceMappingURL=drag-drop-demo.js.map