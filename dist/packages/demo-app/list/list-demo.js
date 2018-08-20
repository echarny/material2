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
var ListDemo = /** @class */ (function () {
    function ListDemo() {
        this.items = [
            'Pepper',
            'Salt',
            'Paprika'
        ];
        this.contacts = [
            { name: 'Nancy', headline: 'Software engineer' },
            { name: 'Mary', headline: 'TPM' },
            { name: 'Bobby', headline: 'UX designer' }
        ];
        this.messages = [
            {
                from: 'Nancy',
                subject: 'Brunch?',
                message: 'Did you want to go on Sunday? I was thinking that might work.',
                image: 'https://angular.io/generated/images/bios/julie-ralph.jpg'
            },
            {
                from: 'Mary',
                subject: 'Summer BBQ',
                message: 'Wish I could come, but I have some prior obligations.',
                image: 'https://angular.io/generated/images/bios/juleskremer.jpg'
            },
            {
                from: 'Bobby',
                subject: 'Oui oui',
                message: 'Do you have Paris reservations for the 15th? I just booked!',
                image: 'https://angular.io/generated/images/bios/jelbourn.jpg'
            }
        ];
        this.links = [
            { name: 'Inbox' },
            { name: 'Outbox' },
            { name: 'Spam' },
            { name: 'Trash' }
        ];
        this.thirdLine = false;
        this.infoClicked = false;
        this.selectionListDisabled = false;
        this.selectedOptions = ['apples'];
        this.changeEventCount = 0;
        this.modelChangeEventCount = 0;
    }
    ListDemo.prototype.onSelectedOptionsChange = function (values) {
        this.selectedOptions = values;
        this.modelChangeEventCount++;
    };
    ListDemo = __decorate([
        core_1.Component({selector: 'list-demo',
            template: " <h1>mat-list demo</h1> <button mat-raised-button (click)=\"thirdLine=!thirdLine\">Show third line</button> <div class=\"demo-list\"> <div> <h2>Normal lists</h2> <mat-list> <h3 mat-subheader>Items</h3> <mat-list-item *ngFor=\"let item of items\"> {{item}} </mat-list-item> </mat-list> <mat-list> <mat-list-item *ngFor=\"let contact of contacts\"> <h3 mat-line>{{contact.name}}</h3> <p mat-line *ngIf=\"thirdLine\">extra line</p> <p mat-line class=\"demo-secondary-text\">{{contact.headline}}</p> </mat-list-item> </mat-list> <mat-list> <h3 mat-subheader>Today</h3> <mat-list-item *ngFor=\"let message of messages; last as last\"> <img mat-list-avatar [src]=\"message.image\" alt=\"Image of {{message.from}}\"> <h4 mat-line>{{message.from}}</h4> <p mat-line> <span>{{message.subject}} -- </span> <span class=\"demo-secondary-text\">{{message.message}}</span> </p> <mat-divider inset *ngIf=\"!last\"></mat-divider> </mat-list-item> <mat-divider></mat-divider> <mat-list-item *ngFor=\"let message of messages\"> <h4 mat-line>{{message.from}}</h4> <p mat-line> {{message.subject}} </p> <p mat-line class=\"demo-secondary-text\">{{message.message}} </p> </mat-list-item> </mat-list> </div> <div> <h2>Dense lists</h2> <mat-list dense> <h3 mat-subheader>Items</h3> <mat-list-item *ngFor=\"let item of items\"> {{item}} </mat-list-item> </mat-list> <mat-list dense> <mat-list-item *ngFor=\"let contact of contacts\"> <h3 mat-line>{{contact.name}}</h3> <p mat-line class=\"demo-secondary-text\">{{contact.headline}}</p> </mat-list-item> </mat-list> <mat-list dense> <h3 mat-subheader>Today</h3> <mat-list-item *ngFor=\"let message of messages\"> <img mat-list-avatar [src]=\"message.image\" alt=\"Image of {{message.from}}\"> <h4 mat-line>{{message.from}}</h4> <p mat-line> {{message.subject}} </p> <p mat-line class=\"demo-secondary-text\">{{message.message}} </p> </mat-list-item> </mat-list> </div> <div> <h2>Nav lists</h2> <mat-nav-list> <a mat-list-item *ngFor=\"let link of links\" href=\"http://www.google.com\"> {{ link.name }} </a> </mat-nav-list> <div *ngIf=\"infoClicked\"> More info! </div> <mat-nav-list> <mat-list-item *ngFor=\"let link of links\"> <a mat-line href=\"http://www.google.com\">{{ link.name }}</a> <button mat-icon-button (click)=\"infoClicked=!infoClicked\"> <mat-icon>info</mat-icon> </button> </mat-list-item> </mat-nav-list> <mat-nav-list> <a mat-list-item *ngFor=\"let link of links; last as last\" href=\"http://www.google.com\"> <mat-icon mat-list-icon>folder</mat-icon> <span mat-line>{{ link.name }}</span> <span mat-line class=\"demo-secondary-text\"> Description </span> <mat-divider inset *ngIf=\"!last\"></mat-divider> </a> </mat-nav-list> <mat-nav-list dense> <mat-list-item *ngFor=\"let link of links\"> <a mat-line href=\"http://www.google.com\">{{ link.name }}</a> <button mat-icon-button (click)=\"infoClicked=!infoClicked\"> <mat-icon class=\"material-icons\">info</mat-icon> </button> </mat-list-item> </mat-nav-list> </div> <div> <h2>Selection list</h2> <mat-selection-list #groceries [ngModel]=\"selectedOptions\" (ngModelChange)=\"onSelectedOptionsChange($event)\" (change)=\"changeEventCount = changeEventCount + 1\" [disabled]=\"selectionListDisabled\"> <h3 mat-subheader>Groceries</h3> <mat-list-option value=\"bananas\" checkboxPosition=\"before\">Bananas</mat-list-option> <mat-list-option selected value=\"oranges\">Oranges</mat-list-option> <mat-list-option value=\"apples\">Apples</mat-list-option> <mat-list-option value=\"strawberries\">Strawberries</mat-list-option> </mat-selection-list> <mat-selection-list> <h3 mat-subheader>Dogs</h3> <mat-list-option checkboxPosition=\"before\"> <img matListAvatar src=\"https://material.angular.io/assets/img/examples/shiba1.jpg\"> <span matLine>Shiba Inu</span> </mat-list-option> <mat-list-option checkboxPosition=\"after\"> <img matListAvatar src=\"https://material.angular.io/assets/img/examples/shiba2.jpg\"> <span matLine>Other Shiba Inu</span> </mat-list-option> </mat-selection-list> <p>Selected: {{selectedOptions | json}}</p> <p>Change Event Count {{changeEventCount}}</p> <p>Model Change Event Count {{modelChangeEventCount}}</p> <mat-checkbox [(ngModel)]=\"selectionListDisabled\">Disable Selection List</mat-checkbox> <p> <button mat-raised-button (click)=\"groceries.selectAll()\">Select all</button> <button mat-raised-button (click)=\"groceries.deselectAll()\">Deselect all</button> </p> </div> </div> ",
            styles: [".demo-list { display: flex; flex-flow: row wrap; } .demo-list .mat-list, .demo-list .mat-nav-list, .demo-list .mat-selection-list { border: 1px solid rgba(0, 0, 0, 0.12); width: 350px; margin: 20px 20px 0 0; } .demo-list h2 { margin-top: 20px; } .demo-list .mat-icon { color: rgba(0, 0, 0, 0.12); } .demo-list .mat-list-icon { color: white; background: rgba(0, 0, 0, 0.3); } .demo-secondary-text { color: rgba(0, 0, 0, 0.54); } "],
        })
    ], ListDemo);
    return ListDemo;
}());
exports.ListDemo = ListDemo;
//# sourceMappingURL=list-demo.js.map