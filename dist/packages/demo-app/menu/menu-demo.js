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
var MenuDemo = /** @class */ (function () {
    function MenuDemo() {
        this.selected = '';
        this.items = [
            { text: 'Refresh' },
            { text: 'Settings' },
            { text: 'Help', disabled: true },
            { text: 'Sign Out' }
        ];
        this.iconItems = [
            { text: 'Redial', icon: 'dialpad' },
            { text: 'Check voicemail', icon: 'voicemail', disabled: true },
            { text: 'Disable alerts', icon: 'notifications_off' }
        ];
    }
    MenuDemo.prototype.select = function (text) { this.selected = text; };
    MenuDemo = __decorate([
        core_1.Component({selector: 'menu-demo',
            template: "<div class=\"demo-menu\"> <div class=\"demo-menu-section\"> <p>You clicked on: {{ selected }}</p> <mat-toolbar> <button mat-icon-button [matMenuTriggerFor]=\"menu\" aria-label=\"Open basic menu\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu #menu=\"matMenu\"> <button mat-menu-item *ngFor=\"let item of items\" (click)=\"select(item.text)\" [disabled]=\"item.disabled\"> {{ item.text }} </button> </mat-menu> </div> <div class=\"demo-menu-section\"> <p>Menu with divider</p> <mat-toolbar> <button mat-icon-button [matMenuTriggerFor]=\"divider\" aria-label=\"Open basic menu\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu #divider=\"matMenu\"> <ng-container *ngFor=\"let item of items; last as last\"> <button mat-menu-item [disabled]=\"item.disabled\"> {{ item.text }} </button> <mat-divider *ngIf=\"!last\"></mat-divider> </ng-container> </mat-menu> </div> <div class=\"demo-menu-section\"> <p>Nested menu</p> <mat-toolbar> <button mat-icon-button [matMenuTriggerFor]=\"animals\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu #animals=\"matMenu\"> <button mat-menu-item [matMenuTriggerFor]=\"vertebrates\">Vertebrates</button> <button mat-menu-item [matMenuTriggerFor]=\"invertebrates\">Invertebrates</button> </mat-menu> <mat-menu #vertebrates=\"matMenu\"> <button mat-menu-item [matMenuTriggerFor]=\"fish\">Fishes</button> <button mat-menu-item [matMenuTriggerFor]=\"amphibians\">Amphibians</button> <button mat-menu-item [matMenuTriggerFor]=\"reptiles\">Reptiles</button> <button mat-menu-item>Birds</button> <button mat-menu-item>Mammals</button> </mat-menu> <mat-menu #invertebrates=\"matMenu\"> <button mat-menu-item>Insects</button> <button mat-menu-item>Molluscs</button> <button mat-menu-item>Crustaceans</button> <button mat-menu-item>Corals</button> <button mat-menu-item>Arachnids</button> <button mat-menu-item>Velvet worms</button> <button mat-menu-item>Horseshoe crabs</button> </mat-menu> <mat-menu #fish=\"matMenu\"> <button mat-menu-item>Baikal oilfish</button> <button mat-menu-item>Bala shark</button> <button mat-menu-item>Ballan wrasse</button> <button mat-menu-item>Bamboo shark</button> <button mat-menu-item>Banded killifish</button> </mat-menu> <mat-menu #amphibians=\"matMenu\"> <button mat-menu-item>Sonoran desert toad</button> <button mat-menu-item>Western toad</button> <button mat-menu-item>Arroyo toad</button> <button mat-menu-item>Yosemite toad</button> </mat-menu> <mat-menu #reptiles=\"matMenu\"> <button mat-menu-item>Banded Day Gecko</button> <button mat-menu-item>Banded Gila Monster</button> <button mat-menu-item>Black Tree Monitor</button> <button mat-menu-item>Blue Spiny Lizard</button> </mat-menu> </div> <div class=\"demo-menu-section\"> <p>Clicking these will navigate:</p> <mat-toolbar> <button mat-icon-button [matMenuTriggerFor]=\"anchorMenu\" aria-label=\"Open anchor menu\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu #anchorMenu=\"matMenu\"> <a mat-menu-item *ngFor=\"let item of items\" href=\"http://www.google.com\" [disabled]=\"item.disabled\"> {{ item.text }} </a> </mat-menu> </div> <div class=\"demo-menu-section\"> <p> Position x: before </p> <mat-toolbar class=\"demo-end-icon\"> <button mat-icon-button [matMenuTriggerFor]=\"posXMenu\" aria-label=\"Open x-positioned menu\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu xPosition=\"before\" #posXMenu=\"matMenu\"> <button mat-menu-item *ngFor=\"let item of iconItems\" [disabled]=\"item.disabled\"> <mat-icon>{{ item.icon }}</mat-icon> {{ item.text }} </button> </mat-menu> </div> <div class=\"demo-menu-section\"> <p> Position y: above </p> <mat-toolbar> <button mat-icon-button [matMenuTriggerFor]=\"posYMenu\" aria-label=\"Open y-positioned menu\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu yPosition=\"above\" #posYMenu=\"matMenu\"> <button mat-menu-item *ngFor=\"let item of items\" [disabled]=\"item.disabled\"> {{ item.text }} </button> </mat-menu> </div> </div> <div class=\"demo-menu\"> <div class=\"demo-menu-section\"> <p>overlapTrigger: false</p> <mat-toolbar> <button mat-icon-button [mat-menu-trigger-for]=\"menuOverlay\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu [overlapTrigger]=\"false\" #menuOverlay=\"matMenu\"> <button mat-menu-item *ngFor=\"let item of items\" [disabled]=\"item.disabled\"> {{ item.text }} </button> </mat-menu> </div> <div class=\"demo-menu-section\"> <p> Position x: before, overlapTrigger: false </p> <mat-toolbar class=\"demo-end-icon\"> <button mat-icon-button [mat-menu-trigger-for]=\"posXMenuOverlay\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu xPosition=\"before\" [overlapTrigger]=\"false\" #posXMenuOverlay=\"matMenu\"> <button mat-menu-item *ngFor=\"let item of iconItems\" [disabled]=\"item.disabled\"> <mat-icon>{{ item.icon }}</mat-icon> {{ item.text }} </button> </mat-menu> </div> <div class=\"demo-menu-section\"> <p> Position y: above, overlapTrigger: false </p> <mat-toolbar> <button mat-icon-button [mat-menu-trigger-for]=\"posYMenuOverlay\"> <mat-icon>more_vert</mat-icon> </button> </mat-toolbar> <mat-menu yPosition=\"above\" [overlapTrigger]=\"false\" #posYMenuOverlay=\"matMenu\"> <button mat-menu-item *ngFor=\"let item of items\" [disabled]=\"item.disabled\"> {{ item.text }} </button> </mat-menu> </div> </div> <div style=\"height: 500px\">This div is for testing scrolled menus.</div> ",
            styles: [".demo-menu { display: flex; flex-flow: row wrap; } .demo-menu .demo-menu-section { width: 300px; margin: 20px; } .demo-menu .demo-end-icon { justify-content: flex-end; } "],
        })
    ], MenuDemo);
    return MenuDemo;
}());
exports.MenuDemo = MenuDemo;
//# sourceMappingURL=menu-demo.js.map