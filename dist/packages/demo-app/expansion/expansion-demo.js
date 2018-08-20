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
var ExpansionDemo = /** @class */ (function () {
    function ExpansionDemo() {
        this.displayMode = 'default';
        this.multi = false;
        this.hideToggle = false;
        this.disabled = false;
        this.showPanel3 = true;
        this.events = [];
    }
    ExpansionDemo.prototype.addEvent = function (eventName) {
        this.events.push(eventName + " - " + new Date().toISOString());
    };
    __decorate([
        core_1.ViewChild(material_1.MatAccordion),
        __metadata("design:type", material_1.MatAccordion)
    ], ExpansionDemo.prototype, "accordion", void 0);
    ExpansionDemo = __decorate([
        core_1.Component({selector: 'expansion-demo',
            styles: [".demo-expansion-width { width: 600px; display: block; } .demo-expansion-code { background: #d3d3d3; display: block; height: 10em; overflow: auto; padding: 0 5px; width: 400px; } .demo-expansion-code pre { margin: 0.25em 0; } "],
            template: "<h1>Single Expansion Panel</h1> <mat-expansion-panel class=\"demo-expansion-width\" #myPanel (afterExpand)=\"addEvent('afterExpand')\" (afterCollapse)=\"addEvent('afterCollapse')\"> <mat-expansion-panel-header [expandedHeight]=\"expandedHeight\" [collapsedHeight]=\"collapsedHeight\"> <mat-panel-description>This is a panel description.</mat-panel-description> <mat-panel-title>Panel Title</mat-panel-title> </mat-expansion-panel-header> <ng-template matExpansionPanelContent> This is the content text that makes sense here. <mat-checkbox>Trigger a ripple</mat-checkbox> </ng-template> <mat-action-row> <button mat-button (click)=\"myPanel.expanded = false\">CANCEL</button> <button mat-button>SAVE</button> </mat-action-row> </mat-expansion-panel> <br> <mat-form-field> <mat-label>Collapsed height</mat-label> <input matInput [(ngModel)]=\"collapsedHeight\"> </mat-form-field> <mat-form-field> <mat-label>Expanded height</mat-label> <input matInput [(ngModel)]=\"expandedHeight\"> </mat-form-field> <br> <p>Expansion Panel Animation Events</p> <code class=\"demo-expansion-code\"> <pre *ngFor=\"let event of events\">{{event}}</pre> </code> <h1>matAccordion</h1> <div> <p>Accordion Options</p> <div> <mat-slide-toggle [(ngModel)]=\"multi\">Allow Multi Expansion</mat-slide-toggle> <mat-slide-toggle [(ngModel)]=\"hideToggle\">Hide Indicators</mat-slide-toggle> <mat-slide-toggle [(ngModel)]=\"disabled\">Disable Panel 2</mat-slide-toggle> <mat-slide-toggle [(ngModel)]=\"showPanel3\">Show Panel 3</mat-slide-toggle> </div> <p>Accordion Style</p> <mat-radio-group [(ngModel)]=\"displayMode\"> <mat-radio-button value=\"default\">Default</mat-radio-button> <mat-radio-button value=\"flat\">Flat</mat-radio-button> </mat-radio-group> <p>Accordion Actions <sup>('Multi Expansion' mode only)</sup></p> <div> <button mat-button (click)=\"accordion.openAll()\" [disabled]=\"!multi\">Expand All</button> <button mat-button (click)=\"accordion.closeAll()\" [disabled]=\"!multi\">Collapse All</button> </div> <p>Accordion Panel(s)</p> <div> <mat-checkbox [(ngModel)]=\"panel1.expanded\">Panel 1</mat-checkbox> <mat-checkbox [(ngModel)]=\"panel2.expanded\">Panel 2</mat-checkbox> </div> </div> <br> <mat-accordion [displayMode]=\"displayMode\" [multi]=\"multi\" class=\"demo-expansion-width\"> <mat-expansion-panel #panel1  [hideToggle]=\"hideToggle\"> <mat-expansion-panel-header>Section 1</mat-expansion-panel-header> <p>This is the content text that makes sense here.</p> </mat-expansion-panel> <mat-expansion-panel #panel2 [hideToggle]=\"hideToggle\" [disabled]=\"disabled\"> <mat-expansion-panel-header>Section 2</mat-expansion-panel-header> <p>This is the content text that makes sense here.</p> </mat-expansion-panel> <mat-expansion-panel #panel3 *ngIf=\"showPanel3\" [hideToggle]=\"hideToggle\"> <mat-expansion-panel-header>Section 3</mat-expansion-panel-header> <mat-checkbox #showButtons>Reveal Buttons Below</mat-checkbox> <mat-action-row *ngIf=\"showButtons.checked\"> <button mat-button (click)=\"panel2.expanded = true\">OPEN SECTION 2</button> <button mat-button (click)=\"panel3.expanded = false\">CLOSE</button> </mat-action-row> </mat-expansion-panel> </mat-accordion> <h1>cdkAccordion</h1> <div> <p>Accordion Options</p> <div> <mat-slide-toggle [(ngModel)]=\"accordion1.multi\">Allow Multi Expansion</mat-slide-toggle> </div> </div> <cdk-accordion class=\"demo-expansion-width\" #accordion1=\"cdkAccordion\"> <cdk-accordion-item #item1=\"cdkAccordionItem\"> <p> Item 1: <button mat-button (click)=\"item1.expanded = true\">Expand</button> <button mat-button (click)=\"item1.expanded = false\">Collapse</button> </p> <p *ngIf=\"item1.expanded\">I only show if item 1 is expanded</p> </cdk-accordion-item> <cdk-accordion-item #item2=\"cdkAccordionItem\"> <p> Item 2: <button mat-button (click)=\"item2.expanded = true\">Expand</button> <button mat-button (click)=\"item2.expanded = false\">Collapse</button> </p> <p *ngIf=\"item2.expanded\">I only show if item 2 is expanded</p> </cdk-accordion-item> <cdk-accordion-item #item3=\"cdkAccordionItem\"> <p> Item 3: <button mat-button (click)=\"item3.expanded = true\">Expand</button> <button mat-button (click)=\"item3.expanded = false\">Collapse</button> </p> <p *ngIf=\"item3.expanded\">I only show if item 3 is expanded</p> </cdk-accordion-item> </cdk-accordion> ",
        })
    ], ExpansionDemo);
    return ExpansionDemo;
}());
exports.ExpansionDemo = ExpansionDemo;
//# sourceMappingURL=expansion-demo.js.map