"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title List with sections
 */
var ListSectionsExample = /** @class */ (function () {
    function ListSectionsExample() {
        this.folders = [
            {
                name: 'Photos',
                updated: new Date('1/1/16'),
            },
            {
                name: 'Recipes',
                updated: new Date('1/17/16'),
            },
            {
                name: 'Work',
                updated: new Date('1/28/16'),
            }
        ];
        this.notes = [
            {
                name: 'Vacation Itinerary',
                updated: new Date('2/20/16'),
            },
            {
                name: 'Kitchen Remodel',
                updated: new Date('1/18/16'),
            }
        ];
    }
    ListSectionsExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'list-sections-example',
                    styles: [".mat-list-icon { color: rgba(0, 0, 0, 0.54); } "],
                    template: "<mat-list><h3 mat-subheader>Folders</h3><mat-list-item *ngFor=\"let folder of folders\"><mat-icon mat-list-icon>folder</mat-icon><h4 mat-line>{{folder.name}}</h4><p mat-line>{{folder.updated | date}}</p></mat-list-item><mat-divider></mat-divider><h3 mat-subheader>Notes</h3><mat-list-item *ngFor=\"let note of notes\"><mat-icon mat-list-icon>note</mat-icon><h4 mat-line>{{note.name}}</h4><p mat-line>{{note.updated | date}}</p></mat-list-item></mat-list>",
                },] },
    ];
    return ListSectionsExample;
}());
exports.ListSectionsExample = ListSectionsExample;
//# sourceMappingURL=list-sections-example.js.map