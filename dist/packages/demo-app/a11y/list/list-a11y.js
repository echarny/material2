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
var ListAccessibilityDemo = /** @class */ (function () {
    function ListAccessibilityDemo() {
        this.items = [
            'Pepper',
            'Salt',
            'Paprika'
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
        this.folders = [
            { name: 'Imported', updated: 'Miles' },
            { name: 'Important', updated: 'Tina' },
            { name: 'Unread', updated: 'Jeremy' },
        ];
        this.notes = [
            { name: 'Update screenshots', updated: 'Kara' },
            { name: 'Install new application', updated: 'Andrew' },
        ];
    }
    ListAccessibilityDemo = __decorate([
        core_1.Component({selector: 'list-a11y',
            template: "<div class=\"demo-list\"> <section> <h2> Seasoning </h2> <p>Showing a non-interactive list of seasonings.</p> <mat-list role=\"list\"> <mat-list-item role=\"listitem\" *ngFor=\"let item of items\"> {{item}} </mat-list-item> </mat-list> </section> <section> <h2>Mailbox navigation</h2> <p>Showing a navigation list with links to google search</p> <mat-nav-list> <a mat-list-item *ngFor=\"let link of links\" href=\"https://www.google.com/search?q={{link.name}}\"> {{link.name}} </a> </mat-nav-list> </section> <section> <h2>Messages</h2> <p> Showing a list of messages, where each message item has sender's name, sender's avatar, message subject, and content of the message. </p> <mat-list role=\"list\"> <mat-list-item role=\"listitem\" *ngFor=\"let message of messages\"> <img mat-list-avatar [src]=\"message.image\" [alt]=\"message.from\"> <h3 mat-line> {{message.from}} </h3> <p mat-line> {{message.subject}} </p> <p mat-line class=\"demo-secondary-text\"> {{message.message}} </p> </mat-list-item> </mat-list> </section> <section> <h2>Seasoning</h2> <p>Showing a non-interactive list of seasonings with dense style.</p> <mat-list role=\"list\" dense> <mat-list-item role=\"listitem\" *ngFor=\"let item of items\"> {{item}} </mat-list-item> </mat-list> </section> <section> <h2>Folders and notes for mailbox </h2> <p>Showing a list with two sections, \"folders\" and \"notes\".</p> <mat-list role=\"list\"> <h3 mat-subheader>Folders</h3> <mat-list-item role=\"listitem\" *ngFor=\"let folder of folders\"> <mat-icon mat-list-icon>folder</mat-icon> <h4 mat-line>{{folder.name}}</h4> <p mat-line class=\"demo-secondary-text\"> {{folder.updated}} </p> </mat-list-item> <mat-divider></mat-divider> <h3 mat-subheader>Notes</h3> <mat-list-item role=\"listitem\" *ngFor=\"let note of notes\"> <mat-icon mat-list-icgon>note</mat-icon> <h4 mat-line>{{note.name}}</h4> <p mat-line class=\"demo-secondary-text\"> {{note.updated}} </p> </mat-list-item> </mat-list> </section> </div> ",
            styles: [".demo-list .mat-list, .demo-list .mat-nav-list { border: 1px solid rgba(0, 0, 0, 0.12); max-width: 350px; margin: 20px 20px 0 0; } .demo-list .demo-secondary-text { color: rgba(0, 0, 0, 0.54); } "]
        })
    ], ListAccessibilityDemo);
    return ListAccessibilityDemo;
}());
exports.ListAccessibilityDemo = ListAccessibilityDemo;
//# sourceMappingURL=list-a11y.js.map