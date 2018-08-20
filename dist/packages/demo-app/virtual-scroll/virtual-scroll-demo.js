"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var rxjs_1 = require("rxjs");
var VirtualScrollDemo = /** @class */ (function () {
    function VirtualScrollDemo() {
        this.scrollToOffset = 0;
        this.scrollToIndex = 0;
        this.scrollToBehavior = 'auto';
        this.scrolledIndex = 0;
        this.fixedSizeData = Array(10000).fill(50);
        this.increasingSizeData = Array(10000).fill(0).map(function (_, i) { return (1 + Math.floor(i / 1000)) * 20; });
        this.decreasingSizeData = Array(10000).fill(0)
            .map(function (_, i) { return (1 + Math.floor((10000 - i) / 1000)) * 20; });
        this.randomData = Array(10000).fill(0).map(function () { return Math.round(Math.random() * 100); });
        this.observableData = new rxjs_1.BehaviorSubject([]);
        this.states = [
            { name: 'Alabama', capital: 'Montgomery' },
            { name: 'Alaska', capital: 'Juneau' },
            { name: 'Arizona', capital: 'Phoenix' },
            { name: 'Arkansas', capital: 'Little Rock' },
            { name: 'California', capital: 'Sacramento' },
            { name: 'Colorado', capital: 'Denver' },
            { name: 'Connecticut', capital: 'Hartford' },
            { name: 'Delaware', capital: 'Dover' },
            { name: 'Florida', capital: 'Tallahassee' },
            { name: 'Georgia', capital: 'Atlanta' },
            { name: 'Hawaii', capital: 'Honolulu' },
            { name: 'Idaho', capital: 'Boise' },
            { name: 'Illinois', capital: 'Springfield' },
            { name: 'Indiana', capital: 'Indianapolis' },
            { name: 'Iowa', capital: 'Des Moines' },
            { name: 'Kansas', capital: 'Topeka' },
            { name: 'Kentucky', capital: 'Frankfort' },
            { name: 'Louisiana', capital: 'Baton Rouge' },
            { name: 'Maine', capital: 'Augusta' },
            { name: 'Maryland', capital: 'Annapolis' },
            { name: 'Massachusetts', capital: 'Boston' },
            { name: 'Michigan', capital: 'Lansing' },
            { name: 'Minnesota', capital: 'St. Paul' },
            { name: 'Mississippi', capital: 'Jackson' },
            { name: 'Missouri', capital: 'Jefferson City' },
            { name: 'Montana', capital: 'Helena' },
            { name: 'Nebraska', capital: 'Lincoln' },
            { name: 'Nevada', capital: 'Carson City' },
            { name: 'New Hampshire', capital: 'Concord' },
            { name: 'New Jersey', capital: 'Trenton' },
            { name: 'New Mexico', capital: 'Santa Fe' },
            { name: 'New York', capital: 'Albany' },
            { name: 'North Carolina', capital: 'Raleigh' },
            { name: 'North Dakota', capital: 'Bismarck' },
            { name: 'Ohio', capital: 'Columbus' },
            { name: 'Oklahoma', capital: 'Oklahoma City' },
            { name: 'Oregon', capital: 'Salem' },
            { name: 'Pennsylvania', capital: 'Harrisburg' },
            { name: 'Rhode Island', capital: 'Providence' },
            { name: 'South Carolina', capital: 'Columbia' },
            { name: 'South Dakota', capital: 'Pierre' },
            { name: 'Tennessee', capital: 'Nashville' },
            { name: 'Texas', capital: 'Austin' },
            { name: 'Utah', capital: 'Salt Lake City' },
            { name: 'Vermont', capital: 'Montpelier' },
            { name: 'Virginia', capital: 'Richmond' },
            { name: 'Washington', capital: 'Olympia' },
            { name: 'West Virginia', capital: 'Charleston' },
            { name: 'Wisconsin', capital: 'Madison' },
            { name: 'Wyoming', capital: 'Cheyenne' },
        ];
        this.statesObservable = new rxjs_1.BehaviorSubject(this.states);
        this.indexTrackFn = function (index) { return index; };
        this.nameTrackFn = function (_, item) { return item.name; };
        this.emitData();
    }
    VirtualScrollDemo.prototype.emitData = function () {
        var data = this.observableData.value.concat([50]);
        this.observableData.next(data);
    };
    VirtualScrollDemo.prototype.sortBy = function (prop) {
        this.statesObservable.next(this.states.map(function (s) { return (__assign({}, s)); }).sort(function (a, b) {
            var aProp = a[prop], bProp = b[prop];
            if (aProp < bProp) {
                return -1;
            }
            else if (aProp > bProp) {
                return 1;
            }
            return 0;
        }));
    };
    VirtualScrollDemo.prototype.scrolled = function (index) {
        this.scrolledIndex = index;
    };
    VirtualScrollDemo = __decorate([
        core_1.Component({selector: 'virtual-scroll-demo',
            template: "<h2>Autosize</h2> <h3>Uniform size</h3> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <div *cdkVirtualFor=\"let size of fixedSizeData; let i = index\" class=\"demo-item\" [style.height.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <h3>Increasing size</h3> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <div *cdkVirtualFor=\"let size of increasingSizeData; let i = index\" class=\"demo-item\" [style.height.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <h3>Decreasing size</h3> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <div *cdkVirtualFor=\"let size of decreasingSizeData; let i = index\" class=\"demo-item\" [style.height.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <h3>Random size</h3> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <div *cdkVirtualFor=\"let size of randomData; let i = index\" class=\"demo-item\" [style.height.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <h2>Fixed size</h2> <mat-form-field> <mat-label>Behavior</mat-label> <mat-select [(ngModel)]=\"scrollToBehavior\"> <mat-option value=\"auto\">Auto</mat-option> <mat-option value=\"instant\">Instant</mat-option> <mat-option value=\"smooth\">Smooth</mat-option> </mat-select> </mat-form-field> <mat-form-field> <mat-label>Offset</mat-label> <input matInput type=\"number\" [(ngModel)]=\"scrollToOffset\"> </mat-form-field> <button mat-button (click)=\"viewport1.scrollToOffset(scrollToOffset, scrollToBehavior)\"> Go to offset </button> <mat-form-field> <mat-label>Index</mat-label> <input matInput type=\"number\" [(ngModel)]=\"scrollToIndex\"> </mat-form-field> <button mat-button (click)=\"viewport1.scrollToIndex(scrollToIndex, scrollToBehavior)\"> Go to index </button> <p> Currently scrolled to item: {{scrolledIndex}} </p> <cdk-virtual-scroll-viewport class=\"demo-viewport\" [itemSize]=\"50\" #viewport1 (scrolledIndexChange)=\"scrolled($event)\"> <div *cdkVirtualFor=\"let size of fixedSizeData; let i = index\" class=\"demo-item\" [style.height.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <cdk-virtual-scroll-viewport class=\"demo-viewport demo-horizontal\" [itemSize]=\"50\" orientation=\"horizontal\"> <div *cdkVirtualFor=\"let size of fixedSizeData; let i = index\" class=\"demo-item\" [style.width.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <h2>Observable data</h2> <button (click)=\"emitData()\">Add item</button> <cdk-virtual-scroll-viewport class=\"demo-viewport\" [itemSize]=\"50\"> <div *cdkVirtualFor=\"let size of observableData | async; let i = index\" class=\"demo-item\" [style.height.px]=\"size\"> Item #{{i}} - ({{size}}px) </div> </cdk-virtual-scroll-viewport> <h2>No trackBy</h2> <button (click)=\"sortBy('name')\">Sort by state name</button> <button (click)=\"sortBy('capital')\">Sort by state capital</button> <cdk-virtual-scroll-viewport class=\"demo-viewport\" [itemSize]=\"60\"> <div *cdkVirtualFor=\"let state of statesObservable | async\" class=\"demo-state-item\"> <div class=\"demo-state\">{{state.name}}</div> <div class=\"demo-capital\">{{state.capital}}</div> </div> </cdk-virtual-scroll-viewport> <h2>trackBy index</h2> <button (click)=\"sortBy('name')\">Sort by state name</button> <button (click)=\"sortBy('capital')\">Sort by state capital</button> <cdk-virtual-scroll-viewport class=\"demo-viewport\" [itemSize]=\"60\"> <div *cdkVirtualFor=\"let state of statesObservable | async; trackBy: indexTrackFn\" class=\"demo-state-item\"> <div class=\"demo-state\">{{state.name}}</div> <div class=\"demo-capital\">{{state.capital}}</div> </div> </cdk-virtual-scroll-viewport> <h2>trackBy state name</h2> <button (click)=\"sortBy('name')\">Sort by state name</button> <button (click)=\"sortBy('capital')\">Sort by state capital</button> <cdk-virtual-scroll-viewport class=\"demo-viewport\" [itemSize]=\"60\"> <div *cdkVirtualFor=\"let state of statesObservable | async; trackBy: nameTrackFn\" class=\"demo-state-item\"> <div class=\"demo-state\">{{state.name}}</div> <div class=\"demo-capital\">{{state.capital}}</div> </div> </cdk-virtual-scroll-viewport> <h2>Use with <code>&lt;ol&gt;</code></h2> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize #viewport2> <ol class=\"demo-ol\" [start]=\"viewport2.getRenderedRange().start + 1\"> <li *cdkVirtualFor=\"let state of statesObservable | async\" class=\"demo-li\"> {{state.name}} - {{state.capital}} </li> </ol> </cdk-virtual-scroll-viewport> <h2>Use with <code>&lt;ul&gt;</code></h2> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <ul class=\"demo-ul\"> <li *cdkVirtualFor=\"let state of statesObservable | async\" class=\"demo-li\"> {{state.name}} - {{state.capital}} </li> </ul> </cdk-virtual-scroll-viewport> <h2>Use with <code>&lt;dl&gt;</code></h2> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <dl class=\"demo-dl\"> <ng-container *cdkVirtualFor=\"let state of statesObservable | async\"> <dt class=\"demo-dt\">{{state.name}}</dt> <dd class=\"demo-dd\">{{state.capital}}</dd> </ng-container> </dl> </cdk-virtual-scroll-viewport> <h2>Use with <code>&lt;table&gt;</code></h2> <cdk-virtual-scroll-viewport class=\"demo-viewport\" autosize> <table class=\"demo-ol\"> <tr *cdkVirtualFor=\"let state of statesObservable | async\" class=\"demo-tr\"> <td class=\"demo-td\">{{state.name}}</td> <td class=\"demo-td\">{{state.capital}}</td> </tr> </table> </cdk-virtual-scroll-viewport> ",
            styles: [".demo-viewport { height: 500px; width: 500px; border: 1px solid black; } .demo-viewport .cdk-virtual-scroll-content-wrapper { display: flex; flex-direction: column; } .demo-horizontal .cdk-virtual-scroll-content-wrapper { flex-direction: row; } .demo-horizontal .demo-item { -ms-writing-mode: tb-lr; -webkit-writing-mode: vertical-lr; /* stylelint-disable-next-line material/no-prefixes */ writing-mode: vertical-lr; } .demo-state-item { height: 60px; display: flex; flex-direction: column; justify-content: center; } .demo-state { font-size: 20px; font-weight: 500; } .demo-capital { font-size: 14px; } .demo-dt { height: 30px; font-weight: bold; } .demo-dd { height: 30px; } .demo-li, .demo-td { height: 50px; } .demo-td { border: 1px solid gray; } "],
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [])
    ], VirtualScrollDemo);
    return VirtualScrollDemo;
}());
exports.VirtualScrollDemo = VirtualScrollDemo;
//# sourceMappingURL=virtual-scroll-demo.js.map