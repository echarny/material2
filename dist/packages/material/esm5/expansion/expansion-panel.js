/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, EventEmitter, Input, Optional, Output, SkipSelf, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';
import { MatAccordion } from './accordion';
import { matExpansionAnimations } from './expansion-animations';
import { MatExpansionPanelContent } from './expansion-panel-content';
/**
 * Counter for generating unique element ids.
 */
var /** @type {?} */ uniqueId = 0;
var ɵ0 = undefined;
/**
 * `<mat-expansion-panel>`
 *
 * This component can be used as a single element to show expandable content, or as one of
 * multiple children of an element with the MatAccordion directive attached.
 */
var MatExpansionPanel = /** @class */ (function (_super) {
    tslib_1.__extends(MatExpansionPanel, _super);
    function MatExpansionPanel(accordion, _changeDetectorRef, _uniqueSelectionDispatcher, _viewContainerRef) {
        var _this = _super.call(this, accordion, _changeDetectorRef, _uniqueSelectionDispatcher) || this;
        _this._viewContainerRef = _viewContainerRef;
        _this._hideToggle = false;
        /**
         * An event emitted after the body's expansion animation happens.
         */
        _this.afterExpand = new EventEmitter();
        /**
         * An event emitted after the body's collapse animation happens.
         */
        _this.afterCollapse = new EventEmitter();
        /**
         * Stream that emits for changes in `\@Input` properties.
         */
        _this._inputChanges = new Subject();
        /**
         * ID for the associated header element. Used for a11y labelling.
         */
        _this._headerId = "mat-expansion-panel-header-" + uniqueId++;
        _this.accordion = accordion;
        return _this;
    }
    Object.defineProperty(MatExpansionPanel.prototype, "hideToggle", {
        get: /**
         * Whether the toggle indicator should be hidden.
         * @return {?}
         */
        function () { return this._hideToggle; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hideToggle = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the expansion indicator should be hidden. */
    /**
     * Whether the expansion indicator should be hidden.
     * @return {?}
     */
    MatExpansionPanel.prototype._getHideToggle = /**
     * Whether the expansion indicator should be hidden.
     * @return {?}
     */
    function () {
        if (this.accordion) {
            return this.accordion.hideToggle;
        }
        return this.hideToggle;
    };
    /** Determines whether the expansion panel should have spacing between it and its siblings. */
    /**
     * Determines whether the expansion panel should have spacing between it and its siblings.
     * @return {?}
     */
    MatExpansionPanel.prototype._hasSpacing = /**
     * Determines whether the expansion panel should have spacing between it and its siblings.
     * @return {?}
     */
    function () {
        if (this.accordion) {
            return (this.expanded ? this.accordion.displayMode : this._getExpandedState()) === 'default';
        }
        return false;
    };
    /** Gets the expanded state string. */
    /**
     * Gets the expanded state string.
     * @return {?}
     */
    MatExpansionPanel.prototype._getExpandedState = /**
     * Gets the expanded state string.
     * @return {?}
     */
    function () {
        return this.expanded ? 'expanded' : 'collapsed';
    };
    /**
     * @return {?}
     */
    MatExpansionPanel.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._lazyContent) {
            // Render the content as soon as the panel becomes open.
            this.opened.pipe(startWith(/** @type {?} */ ((null))), filter(function () { return _this.expanded && !_this._portal; }), take(1)).subscribe(function () {
                _this._portal = new TemplatePortal(_this._lazyContent._template, _this._viewContainerRef);
            });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MatExpansionPanel.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._inputChanges.next(changes);
    };
    /**
     * @return {?}
     */
    MatExpansionPanel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this._inputChanges.complete();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatExpansionPanel.prototype._bodyAnimation = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ classList = event.element.classList;
        var /** @type {?} */ cssClass = 'mat-expanded';
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
        { type: Component, args: [{styles: [".mat-expansion-panel{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);box-sizing:content-box;display:block;margin:0;transition:margin 225ms cubic-bezier(.4,0,.2,1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content{overflow:hidden}.mat-expansion-panel-content.mat-expanded{overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button{margin-left:0;margin-right:8px}"],
                    selector: 'mat-expansion-panel',
                    exportAs: 'matExpansionPanel',
                    template: "<ng-content select=\"mat-expansion-panel-header\"></ng-content><div class=\"mat-expansion-panel-content\" role=\"region\" [@bodyExpansion]=\"_getExpandedState()\" (@bodyExpansion.done)=\"_bodyAnimation($event)\" (@bodyExpansion.start)=\"_bodyAnimation($event)\" [attr.aria-labelledby]=\"_headerId\" [id]=\"id\" #body><div class=\"mat-expansion-panel-body\"><ng-content></ng-content><ng-template [cdkPortalOutlet]=\"_portal\"></ng-template></div><ng-content select=\"mat-action-row\"></ng-content></div>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['disabled', 'expanded'],
                    outputs: ['opened', 'closed', 'expandedChange'],
                    animations: [matExpansionAnimations.bodyExpansion],
                    providers: [
                        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
                        // to the same accordion.
                        { provide: MatAccordion, useValue: ɵ0 },
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
        { type: MatAccordion, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: ChangeDetectorRef, },
        { type: UniqueSelectionDispatcher, },
        { type: ViewContainerRef, },
    ]; };
    MatExpansionPanel.propDecorators = {
        "hideToggle": [{ type: Input },],
        "afterExpand": [{ type: Output },],
        "afterCollapse": [{ type: Output },],
        "_lazyContent": [{ type: ContentChild, args: [MatExpansionPanelContent,] },],
    };
    return MatExpansionPanel;
}(CdkAccordionItem));
export { MatExpansionPanel };
function MatExpansionPanel_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatExpansionPanel.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatExpansionPanel.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatExpansionPanel.propDecorators;
    /** @type {?} */
    MatExpansionPanel.prototype._hideToggle;
    /**
     * An event emitted after the body's expansion animation happens.
     * @type {?}
     */
    MatExpansionPanel.prototype.afterExpand;
    /**
     * An event emitted after the body's collapse animation happens.
     * @type {?}
     */
    MatExpansionPanel.prototype.afterCollapse;
    /**
     * Stream that emits for changes in `\@Input` properties.
     * @type {?}
     */
    MatExpansionPanel.prototype._inputChanges;
    /**
     * Optionally defined accordion the expansion panel belongs to.
     * @type {?}
     */
    MatExpansionPanel.prototype.accordion;
    /**
     * Content that will be rendered lazily.
     * @type {?}
     */
    MatExpansionPanel.prototype._lazyContent;
    /**
     * Portal holding the user's content.
     * @type {?}
     */
    MatExpansionPanel.prototype._portal;
    /**
     * ID for the associated header element. Used for a11y labelling.
     * @type {?}
     */
    MatExpansionPanel.prototype._headerId;
    /** @type {?} */
    MatExpansionPanel.prototype._viewContainerRef;
}
var MatExpansionPanelActionRow = /** @class */ (function () {
    function MatExpansionPanelActionRow() {
    }
    MatExpansionPanelActionRow.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-action-row',
                    host: {
                        class: 'mat-action-row'
                    }
                },] },
    ];
    return MatExpansionPanelActionRow;
}());
export { MatExpansionPanelActionRow };
function MatExpansionPanelActionRow_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatExpansionPanelActionRow.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatExpansionPanelActionRow.ctorParameters;
}
export { ɵ0 };
//# sourceMappingURL=expansion-panel.js.map