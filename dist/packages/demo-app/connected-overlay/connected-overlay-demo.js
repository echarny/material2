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
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var ConnectedOverlayDemo = /** @class */ (function () {
    function ConnectedOverlayDemo(overlay, viewContainerRef, dir) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dir = dir;
        this.originX = 'start';
        this.originY = 'bottom';
        this.overlayX = 'start';
        this.overlayY = 'top';
        this.isFlexible = true;
        this.canPush = true;
        this.showBoundingBox = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.itemCount = 25;
        this.itemArray = [];
        this.itemText = 'Item with a long name';
    }
    ConnectedOverlayDemo.prototype.openWithConfig = function () {
        var positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this._overlayOrigin.elementRef)
            .withFlexibleDimensions(this.isFlexible)
            .withPush(this.canPush)
            .withViewportMargin(10)
            .withGrowAfterOpen(true)
            .withPositions([{
                originX: this.originX,
                originY: this.originY,
                overlayX: this.overlayX,
                overlayY: this.overlayY,
                offsetX: this.offsetX,
                offsetY: this.offsetY
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            }
        ]);
        this.overlayRef = this.overlay.create({
            positionStrategy: positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            direction: this.dir.value,
            minWidth: 200,
            minHeight: 50
        });
        this.itemArray = Array(this.itemCount);
        this.overlayRef.attach(new portal_1.TemplatePortal(this.overlayTemplate, this.viewContainerRef));
    };
    ConnectedOverlayDemo.prototype.close = function () {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.showBoundingBox = false;
        }
    };
    ConnectedOverlayDemo.prototype.toggleShowBoundingBox = function () {
        var box = document.querySelector('.cdk-overlay-connected-position-bounding-box');
        if (box) {
            this.showBoundingBox = !this.showBoundingBox;
            box.style.background = this.showBoundingBox ? 'rgb(255, 69, 0, 0.2)' : '';
        }
    };
    __decorate([
        core_1.ViewChild(overlay_1.CdkOverlayOrigin),
        __metadata("design:type", overlay_1.CdkOverlayOrigin)
    ], ConnectedOverlayDemo.prototype, "_overlayOrigin", void 0);
    __decorate([
        core_1.ViewChild('overlay'),
        __metadata("design:type", core_1.TemplateRef)
    ], ConnectedOverlayDemo.prototype, "overlayTemplate", void 0);
    ConnectedOverlayDemo = __decorate([
        core_1.Component({selector: 'overlay-demo',
            template: "<div style=\"height: 500px\"></div> <div class=\"demo-options mat-typography\"> <div> <h2>Origin X</h2> <mat-radio-group [(ngModel)]=\"originX\"> <mat-radio-button value=\"start\">start</mat-radio-button> <mat-radio-button value=\"center\">center</mat-radio-button> <mat-radio-button value=\"end\">end</mat-radio-button> </mat-radio-group> </div> <div> <h2>Origin Y</h2> <mat-radio-group [(ngModel)]=\"originY\"> <mat-radio-button value=\"top\">top</mat-radio-button> <mat-radio-button value=\"center\">center</mat-radio-button> <mat-radio-button value=\"bottom\">bottom</mat-radio-button> </mat-radio-group> </div> <div> <h2>Overlay X</h2> <mat-radio-group [(ngModel)]=\"overlayX\"> <mat-radio-button value=\"start\">start</mat-radio-button> <mat-radio-button value=\"center\">center</mat-radio-button> <mat-radio-button value=\"end\">end</mat-radio-button> </mat-radio-group> </div> <div> <h2>Overlay Y</h2> <mat-radio-group [(ngModel)]=\"overlayY\"> <mat-radio-button value=\"top\">top</mat-radio-button> <mat-radio-button value=\"center\">center</mat-radio-button> <mat-radio-button value=\"bottom\">bottom</mat-radio-button> </mat-radio-group> </div> <div> <h2>Offsets</h2> <p> <label> offsetX <input type=\"number\" [(ngModel)]=\"offsetX\"> </label> </p> <p> <label> offsetY <input type=\"number\" [(ngModel)]=\"offsetY\"> </label> </p> </div> <div> <h2>Options</h2> <p> <label> Number of items in the overlay <input type=\"number\" [(ngModel)]=\"itemCount\"> </label> </p> <p> <label> Item text <input [(ngModel)]=\"itemText\"> </label> </p> <div> <mat-checkbox [(ngModel)]=\"isFlexible\">Allow flexible dimensions</mat-checkbox> </div> <div> <mat-checkbox [(ngModel)]=\"canPush\">Allow push</mat-checkbox> </div> <div> <mat-checkbox [checked]=\"showBoundingBox\" [disabled]=\"!overlayRef\" (click)=\"toggleShowBoundingBox()\"> Show bounding box </mat-checkbox> </div> </div> <div> <button mat-raised-button type=\"button\" (click)=\"close()\" [disabled]=\"!overlayRef\">Close</button> </div> </div> <div class=\"demo-trigger\"> <button mat-raised-button cdkOverlayOrigin type=\"button\" [disabled]=\"overlayRef\" (click)=\"openWithConfig()\">Open</button> </div> <div style=\"height: 500px\"></div> <ng-template #overlay> <div class=\"demo-overlay\"> <div style=\"overflow: auto;\"> <ul><li *ngFor=\"let item of itemArray; index as i\">{{itemText}} {{i}}</li></ul> </div> </div> </ng-template> ",
            styles: [".demo-options { display: flex; margin: 20px; } .demo-options > div { margin: 16px; } .demo-options .mat-radio-button { display: block; margin-bottom: 5px; } .demo-overlay { display: block; background: lightblue; min-width: 50px; min-height: 50px; max-height: 100%; overflow: auto; } .demo-trigger { display: flex; justify-content: center; align-items: center; padding: 10px; } "],
        }),
        __metadata("design:paramtypes", [overlay_1.Overlay,
            core_1.ViewContainerRef,
            bidi_1.Directionality])
    ], ConnectedOverlayDemo);
    return ConnectedOverlayDemo;
}());
exports.ConnectedOverlayDemo = ConnectedOverlayDemo;
//# sourceMappingURL=connected-overlay-demo.js.map