"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var collections_1 = require("@angular/cdk/collections");
var accordion_1 = require("./accordion");
var coercion_1 = require("@angular/cdk/coercion");
var rxjs_1 = require("rxjs");
/** Used to generate unique ID for each accordion item. */
var nextId = 0;
var ɵ0 = undefined;
exports.ɵ0 = ɵ0;
/**
 * An basic directive expected to be extended and decorated as a component.  Sets up all
 * events and attributes needed to be managed by a CdkAccordion parent.
 */
var CdkAccordionItem = /** @class */ (function () {
    function CdkAccordionItem(accordion, _changeDetectorRef, _expansionDispatcher) {
        var _this = this;
        this.accordion = accordion;
        this._changeDetectorRef = _changeDetectorRef;
        this._expansionDispatcher = _expansionDispatcher;
        /** Subscription to openAll/closeAll events. */
        this._openCloseAllSubscription = rxjs_1.Subscription.EMPTY;
        /** Event emitted every time the AccordionItem is closed. */
        this.closed = new core_1.EventEmitter();
        /** Event emitted every time the AccordionItem is opened. */
        this.opened = new core_1.EventEmitter();
        /** Event emitted when the AccordionItem is destroyed. */
        this.destroyed = new core_1.EventEmitter();
        /**
           * Emits whenever the expanded state of the accordion changes.
           * Primarily used to facilitate two-way binding.
           * @docs-private
           */
        this.expandedChange = new core_1.EventEmitter();
        /** The unique AccordionItem id. */
        this.id = "cdk-accordion-child-" + nextId++;
        this._expanded = false;
        this._disabled = false;
        /** Unregister function for _expansionDispatcher. */
        this._removeUniqueSelectionListener = function () { };
        this._removeUniqueSelectionListener =
            _expansionDispatcher.listen(function (id, accordionId) {
                if (_this.accordion && !_this.accordion.multi &&
                    _this.accordion.id === accordionId && _this.id !== id) {
                    _this.expanded = false;
                }
            });
        // When an accordion item is hosted in an accordion, subscribe to open/close events.
        if (this.accordion) {
            this._openCloseAllSubscription = this._subscribeToOpenCloseAllActions();
        }
    }
    Object.defineProperty(CdkAccordionItem.prototype, "expanded", {
        get: /** Whether the AccordionItem is expanded. */
        function () { return this._expanded; },
        set: function (expanded) {
            expanded = coercion_1.coerceBooleanProperty(expanded);
            // Only emit events and update the internal value if the value changes.
            if (this._expanded !== expanded) {
                this._expanded = expanded;
                this.expandedChange.emit(expanded);
                if (expanded) {
                    this.opened.emit();
                    /**
                             * In the unique selection dispatcher, the id parameter is the id of the CdkAccordionItem,
                             * the name value is the id of the accordion.
                             */
                    var accordionId = this.accordion ? this.accordion.id : this.id;
                    this._expansionDispatcher.notify(this.id, accordionId);
                }
                else {
                    this.closed.emit();
                }
                // Ensures that the animation will run when the value is set outside of an `@Input`.
                // This includes cases like the open, close and toggle methods.
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkAccordionItem.prototype, "disabled", {
        get: /** Whether the AccordionItem is disabled. */
        function () { return this._disabled; },
        set: function (disabled) { this._disabled = coercion_1.coerceBooleanProperty(disabled); },
        enumerable: true,
        configurable: true
    });
    /** Emits an event for the accordion item being destroyed. */
    /** Emits an event for the accordion item being destroyed. */
    CdkAccordionItem.prototype.ngOnDestroy = /** Emits an event for the accordion item being destroyed. */
    function () {
        this.opened.complete();
        this.closed.complete();
        this.destroyed.emit();
        this.destroyed.complete();
        this._removeUniqueSelectionListener();
        this._openCloseAllSubscription.unsubscribe();
    };
    /** Toggles the expanded state of the accordion item. */
    /** Toggles the expanded state of the accordion item. */
    CdkAccordionItem.prototype.toggle = /** Toggles the expanded state of the accordion item. */
    function () {
        if (!this.disabled) {
            this.expanded = !this.expanded;
        }
    };
    /** Sets the expanded state of the accordion item to false. */
    /** Sets the expanded state of the accordion item to false. */
    CdkAccordionItem.prototype.close = /** Sets the expanded state of the accordion item to false. */
    function () {
        if (!this.disabled) {
            this.expanded = false;
        }
    };
    /** Sets the expanded state of the accordion item to true. */
    /** Sets the expanded state of the accordion item to true. */
    CdkAccordionItem.prototype.open = /** Sets the expanded state of the accordion item to true. */
    function () {
        if (!this.disabled) {
            this.expanded = true;
        }
    };
    CdkAccordionItem.prototype._subscribeToOpenCloseAllActions = function () {
        var _this = this;
        return this.accordion._openCloseAllActions.subscribe(function (expanded) {
            // Only change expanded state if item is enabled
            if (!_this.disabled) {
                _this.expanded = expanded;
            }
        });
    };
    CdkAccordionItem.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'cdk-accordion-item, [cdkAccordionItem]',
                    exportAs: 'cdkAccordionItem',
                    providers: [
                        // Provide CdkAccordion as undefined to prevent nested accordion items from registering
                        // to the same accordion.
                        { provide: accordion_1.CdkAccordion, useValue: ɵ0 },
                    ],
                },] },
    ];
    /** @nocollapse */
    CdkAccordionItem.ctorParameters = function () { return [
        { type: accordion_1.CdkAccordion, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf },] },
        { type: core_1.ChangeDetectorRef, },
        { type: collections_1.UniqueSelectionDispatcher, },
    ]; };
    CdkAccordionItem.propDecorators = {
        "closed": [{ type: core_1.Output },],
        "opened": [{ type: core_1.Output },],
        "destroyed": [{ type: core_1.Output },],
        "expandedChange": [{ type: core_1.Output },],
        "expanded": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
    };
    return CdkAccordionItem;
}());
exports.CdkAccordionItem = CdkAccordionItem;
//# sourceMappingURL=accordion-item.js.map