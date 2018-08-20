"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var accordion_1 = require("@angular/cdk/accordion");
var coercion_1 = require("@angular/cdk/coercion");
var collections_1 = require("@angular/cdk/collections");
var portal_1 = require("@angular/cdk/portal");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var accordion_2 = require("./accordion");
var expansion_animations_1 = require("./expansion-animations");
var expansion_panel_content_1 = require("./expansion-panel-content");
/** Counter for generating unique element ids. */
var uniqueId = 0;
var ɵ0 = undefined;
exports.ɵ0 = ɵ0;
/**
 * `<mat-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the MatAccordion directive attached.
 */
var MatExpansionPanel = /** @class */ (function (_super) {
    __extends(MatExpansionPanel, _super);
    function MatExpansionPanel(accordion, _changeDetectorRef, _uniqueSelectionDispatcher, _viewContainerRef) {
        var _this = _super.call(this, accordion, _changeDetectorRef, _uniqueSelectionDispatcher) || this;
        _this._viewContainerRef = _viewContainerRef;
        _this._hideToggle = false;
        /** An event emitted after the body's expansion animation happens. */
        _this.afterExpand = new core_1.EventEmitter();
        /** An event emitted after the body's collapse animation happens. */
        _this.afterCollapse = new core_1.EventEmitter();
        /** Stream that emits for changes in `@Input` properties. */
        _this._inputChanges = new rxjs_1.Subject();
        /** ID for the associated header element. Used for a11y labelling. */
        _this._headerId = "mat-expansion-panel-header-" + uniqueId++;
        _this.accordion = accordion;
        return _this;
    }
    Object.defineProperty(MatExpansionPanel.prototype, "hideToggle", {
        get: /** Whether the toggle indicator should be hidden. */
        function () { return this._hideToggle; },
        set: function (value) {
            this._hideToggle = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the expansion indicator should be hidden. */
    /** Whether the expansion indicator should be hidden. */
    MatExpansionPanel.prototype._getHideToggle = /** Whether the expansion indicator should be hidden. */
    function () {
        if (this.accordion) {
            return this.accordion.hideToggle;
        }
        return this.hideToggle;
    };
    /** Determines whether the expansion panel should have spacing between it and its siblings. */
    /** Determines whether the expansion panel should have spacing between it and its siblings. */
    MatExpansionPanel.prototype._hasSpacing = /** Determines whether the expansion panel should have spacing between it and its siblings. */
    function () {
        if (this.accordion) {
            return (this.expanded ? this.accordion.displayMode : this._getExpandedState()) === 'default';
        }
        return false;
    };
    /** Gets the expanded state string. */
    /** Gets the expanded state string. */
    MatExpansionPanel.prototype._getExpandedState = /** Gets the expanded state string. */
    function () {
        return this.expanded ? 'expanded' : 'collapsed';
    };
    MatExpansionPanel.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this._lazyContent) {
            // Render the content as soon as the panel becomes open.
            this.opened.pipe(operators_1.startWith((null)), operators_1.filter(function () { return _this.expanded && !_this._portal; }), operators_1.take(1)).subscribe(function () {
                _this._portal = new portal_1.TemplatePortal(_this._lazyContent._template, _this._viewContainerRef);
            });
        }
    };
    MatExpansionPanel.prototype.ngOnChanges = function (changes) {
        this._inputChanges.next(changes);
    };
    MatExpansionPanel.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this._inputChanges.complete();
    };
    MatExpansionPanel.prototype._bodyAnimation = function (event) {
        var classList = event.element.classList;
        var cssClass = 'mat-expanded';
        var phaseName = event.phaseName, toState = event.toState, fromState = event.fromState;
        // Toggle the body's `overflow: hidden` class when closing starts or when expansion ends in
        // order to prevent the cases where switching too early would cause the animation to jump.
        // Note that we do it directly on the DOM element to avoid the slight delay that comes
        // with doing it via change detection.
        if (phaseName === 'done' && toState === 'expanded') {
            classList.add(cssClass);
        }
        if (phaseName === 'start' && toState === 'collapsed') {
            classList.remove(cssClass);
        }
        if (phaseName === 'done' && toState === 'expanded' && fromState !== 'void') {
            this.afterExpand.emit();
        }
        if (phaseName === 'done' && toState === 'collapsed' && fromState !== 'void') {
            this.afterCollapse.emit();
        }
    };
    MatExpansionPanel.decorators = [
        { type: core_1.Component, args: [{styles: [".mat-expansion-panel{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);box-sizing:content-box;display:block;margin:0;transition:margin 225ms cubic-bezier(.4,0,.2,1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content{overflow:hidden}.mat-expansion-panel-content.mat-expanded{overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button{margin-left:0;margin-right:8px}"],
                    selector: 'mat-expansion-panel',
                    exportAs: 'matExpansionPanel',
                    template: "<ng-content select=\"mat-expansion-panel-header\"></ng-content><div class=\"mat-expansion-panel-content\" role=\"region\" [@bodyExpansion]=\"_getExpandedState()\" (@bodyExpansion.done)=\"_bodyAnimation($event)\" (@bodyExpansion.start)=\"_bodyAnimation($event)\" [attr.aria-labelledby]=\"_headerId\" [id]=\"id\" #body><div class=\"mat-expansion-panel-body\"><ng-content></ng-content><ng-template [cdkPortalOutlet]=\"_portal\"></ng-template></div><ng-content select=\"mat-action-row\"></ng-content></div>",
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled', 'expanded'],
                    outputs: ['opened', 'closed', 'expandedChange'],
                    animations: [expansion_animations_1.matExpansionAnimations.bodyExpansion],
                    providers: [
                        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
                        // to the same accordion.
                        { provide: accordion_2.MatAccordion, useValue: ɵ0 },
                    ],
                    host: {
                        'class': 'mat-expansion-panel',
                        '[class.mat-expanded]': 'expanded',
                        '[class.mat-expansion-panel-spacing]': '_hasSpacing()',
                    }
                },] },
    ];
    /** @nocollapse */
    MatExpansionPanel.ctorParameters = function () { return [
        { type: accordion_2.MatAccordion, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: core_1.ChangeDetectorRef, },
        { type: collections_1.UniqueSelectionDispatcher, },
        { type: core_1.ViewContainerRef, },
    ]; };
    MatExpansionPanel.propDecorators = {
        "hideToggle": [{ type: core_1.Input },],
        "afterExpand": [{ type: core_1.Output },],
        "afterCollapse": [{ type: core_1.Output },],
        "_lazyContent": [{ type: core_1.ContentChild, args: [expansion_panel_content_1.MatExpansionPanelContent,] },],
    };
    return MatExpansionPanel;
}(accordion_1.CdkAccordionItem));
exports.MatExpansionPanel = MatExpansionPanel;
var MatExpansionPanelActionRow = /** @class */ (function () {
    function MatExpansionPanelActionRow() {
    }
    MatExpansionPanelActionRow.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-action-row',
                    host: {
                        class: 'mat-action-row'
                    }
                },] },
    ];
    return MatExpansionPanelActionRow;
}());
exports.MatExpansionPanelActionRow = MatExpansionPanelActionRow;
//# sourceMappingURL=expansion-panel.js.map