"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var expansion_animations_1 = require("./expansion-animations");
var expansion_panel_1 = require("./expansion-panel");
/**
 * `<mat-expansion-panel-header>`
 *
 * This component corresponds to the header element of an `<mat-expansion-panel>`.
 */
var MatExpansionPanelHeader = /** @class */ (function () {
    function MatExpansionPanelHeader(panel, _element, _focusMonitor, _changeDetectorRef) {
        var _this = this;
        this.panel = panel;
        this._element = _element;
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this._parentChangeSubscription = rxjs_1.Subscription.EMPTY;
        // Since the toggle state depends on an @Input on the panel, we
        // need to  subscribe and trigger change detection manually.
        this._parentChangeSubscription = rxjs_1.merge(panel.opened, panel.closed, panel._inputChanges.pipe(operators_1.filter(function (changes) { return !!(changes.hideToggle || changes.disabled); })))
            .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
        _focusMonitor.monitor(_element.nativeElement);
    }
    /** Toggles the expanded state of the panel. */
    /** Toggles the expanded state of the panel. */
    MatExpansionPanelHeader.prototype._toggle = /** Toggles the expanded state of the panel. */
    function () {
        this.panel.toggle();
    };
    /** Gets whether the panel is expanded. */
    /** Gets whether the panel is expanded. */
    MatExpansionPanelHeader.prototype._isExpanded = /** Gets whether the panel is expanded. */
    function () {
        return this.panel.expanded;
    };
    /** Gets the expanded state string of the panel. */
    /** Gets the expanded state string of the panel. */
    MatExpansionPanelHeader.prototype._getExpandedState = /** Gets the expanded state string of the panel. */
    function () {
        return this.panel._getExpandedState();
    };
    /** Gets the panel id. */
    /** Gets the panel id. */
    MatExpansionPanelHeader.prototype._getPanelId = /** Gets the panel id. */
    function () {
        return this.panel.id;
    };
    /** Gets whether the expand indicator should be shown. */
    /** Gets whether the expand indicator should be shown. */
    MatExpansionPanelHeader.prototype._showToggle = /** Gets whether the expand indicator should be shown. */
    function () {
        return !this.panel.hideToggle && !this.panel.disabled;
    };
    /** Handle keydown event calling to toggle() if appropriate. */
    /** Handle keydown event calling to toggle() if appropriate. */
    MatExpansionPanelHeader.prototype._keydown = /** Handle keydown event calling to toggle() if appropriate. */
    function (event) {
        switch (event.keyCode) {
            // Toggle for space and enter keys.
            case keycodes_1.SPACE:
            case keycodes_1.ENTER:
                event.preventDefault();
                this._toggle();
                break;
            default:
                return;
        }
    };
    MatExpansionPanelHeader.prototype.ngOnDestroy = function () {
        this._parentChangeSubscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this._element.nativeElement);
    };
    MatExpansionPanelHeader.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-expansion-panel-header',
                    styles: [".mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:0}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-description,.mat-expansion-panel-header-title{display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .mat-expansion-panel-header-description,[dir=rtl] .mat-expansion-panel-header-title{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:'';display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}"],
                    template: "<span class=\"mat-content\"><ng-content select=\"mat-panel-title\"></ng-content><ng-content select=\"mat-panel-description\"></ng-content><ng-content></ng-content></span><span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\" class=\"mat-expansion-indicator\"></span>",
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [
                        expansion_animations_1.matExpansionAnimations.indicatorRotate,
                        expansion_animations_1.matExpansionAnimations.expansionHeaderHeight
                    ],
                    host: {
                        'class': 'mat-expansion-panel-header',
                        'role': 'button',
                        '[attr.id]': 'panel._headerId',
                        '[attr.tabindex]': 'panel.disabled ? -1 : 0',
                        '[attr.aria-controls]': '_getPanelId()',
                        '[attr.aria-expanded]': '_isExpanded()',
                        '[attr.aria-disabled]': 'panel.disabled',
                        '[class.mat-expanded]': '_isExpanded()',
                        '(click)': '_toggle()',
                        '(keydown)': '_keydown($event)',
                        '[@expansionHeight]': "{\n        value: _getExpandedState(),\n        params: {\n          collapsedHeight: collapsedHeight,\n          expandedHeight: expandedHeight\n        }\n    }",
                    },
                },] },
    ];
    /** @nocollapse */
    MatExpansionPanelHeader.ctorParameters = function () { return [
        { type: expansion_panel_1.MatExpansionPanel, decorators: [{ type: core_1.Host },] },
        { type: core_1.ElementRef, },
        { type: a11y_1.FocusMonitor, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatExpansionPanelHeader.propDecorators = {
        "expandedHeight": [{ type: core_1.Input },],
        "collapsedHeight": [{ type: core_1.Input },],
    };
    return MatExpansionPanelHeader;
}());
exports.MatExpansionPanelHeader = MatExpansionPanelHeader;
/**
 * `<mat-panel-description>`
 *
 * This directive is to be used inside of the MatExpansionPanelHeader component.
 */
var MatExpansionPanelDescription = /** @class */ (function () {
    function MatExpansionPanelDescription() {
    }
    MatExpansionPanelDescription.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-panel-description',
                    host: {
                        class: 'mat-expansion-panel-header-description'
                    }
                },] },
    ];
    return MatExpansionPanelDescription;
}());
exports.MatExpansionPanelDescription = MatExpansionPanelDescription;
/**
 * `<mat-panel-title>`
 *
 * This directive is to be used inside of the MatExpansionPanelHeader component.
 */
var MatExpansionPanelTitle = /** @class */ (function () {
    function MatExpansionPanelTitle() {
    }
    MatExpansionPanelTitle.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-panel-title',
                    host: {
                        class: 'mat-expansion-panel-header-title'
                    }
                },] },
    ];
    return MatExpansionPanelTitle;
}());
exports.MatExpansionPanelTitle = MatExpansionPanelTitle;
//# sourceMappingURL=expansion-panel-header.js.map