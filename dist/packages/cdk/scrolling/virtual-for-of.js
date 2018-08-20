"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var virtual_scroll_viewport_1 = require("./virtual-scroll-viewport");
/** Helper to extract size from a DOM Node. */
function getSize(orientation, node) {
    var el = node;
    if (!el.getBoundingClientRect) {
        return 0;
    }
    var rect = el.getBoundingClientRect();
    return orientation == 'horizontal' ? rect.width : rect.height;
}
/**
 * A directive similar to `ngForOf` to be used for rendering data inside a virtual scrolling
 * container.
 */
var CdkVirtualForOf = /** @class */ (function () {
    function CdkVirtualForOf(/** The view container to add items to. */
    _viewContainerRef, /** The template to use when stamping out new items. */
    _template, /** The set of available differs. */
    _differs, /** The virtual scrolling viewport that these items are being rendered in. */
    _viewport) {
        var _this = this;
        this._viewContainerRef = _viewContainerRef;
        this._template = _template;
        this._differs = _differs;
        this._viewport = _viewport;
        /** Emits when the rendered view of the data changes. */
        this.viewChange = new rxjs_1.Subject();
        /** Subject that emits when a new DataSource instance is given. */
        this._dataSourceChanges = new rxjs_1.Subject();
        /**
           * The size of the cache used to store templates that are not being used for re-use later.
           * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
           */
        this.cdkVirtualForTemplateCacheSize = 20;
        /** Emits whenever the data in the current DataSource changes. */
        this.dataStream = this._dataSourceChanges
            .pipe(
        // Start off with null `DataSource`.
        // Start off with null `DataSource`.
        operators_1.startWith((null)), 
        // Bundle up the previous and current data sources so we can work with both.
        // Bundle up the previous and current data sources so we can work with both.
        operators_1.pairwise(), 
        // Use `_changeDataSource` to disconnect from the previous data source and connect to the
        // new one, passing back a stream of data changes which we run through `switchMap` to give
        // us a data stream that emits the latest data from whatever the current `DataSource` is.
        // Use `_changeDataSource` to disconnect from the previous data source and connect to the
        // new one, passing back a stream of data changes which we run through `switchMap` to give
        // us a data stream that emits the latest data from whatever the current `DataSource` is.
        operators_1.switchMap(function (_a) {
            var prev = _a[0], cur = _a[1];
            return _this._changeDataSource(prev, cur);
        }), 
        // Replay the last emitted data when someone subscribes.
        // Replay the last emitted data when someone subscribes.
        operators_1.shareReplay(1));
        /** The differ used to calculate changes to the data. */
        this._differ = null;
        /**
           * The template cache used to hold on ot template instancess that have been stamped out, but don't
           * currently need to be rendered. These instances will be reused in the future rather than
           * stamping out brand new ones.
           */
        this._templateCache = [];
        /** Whether the rendered data should be updated during the next ngDoCheck cycle. */
        this._needsUpdate = false;
        this._destroyed = new rxjs_1.Subject();
        this.dataStream.subscribe(function (data) {
            _this._data = data;
            _this._onRenderedDataChange();
        });
        this._viewport.renderedRangeStream.pipe(operators_1.takeUntil(this._destroyed)).subscribe(function (range) {
            _this._renderedRange = range;
            _this.viewChange.next(_this._renderedRange);
            _this._onRenderedDataChange();
        });
        this._viewport.attach(this);
    }
    Object.defineProperty(CdkVirtualForOf.prototype, "cdkVirtualForOf", {
        get: /** The DataSource to display. */
        function () {
            return this._cdkVirtualForOf;
        },
        set: function (value) {
            this._cdkVirtualForOf = value;
            var ds = value instanceof collections_1.DataSource ? value :
                // Slice the value if its an NgIterable to ensure we're working with an array.
                new collections_1.ArrayDataSource(value instanceof rxjs_1.Observable ? value : Array.prototype.slice.call(value || []));
            this._dataSourceChanges.next(ds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkVirtualForOf.prototype, "cdkVirtualForTrackBy", {
        get: /**
           * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
           * the item and produces a value to be used as the item's identity when tracking changes.
           */
        function () {
            return this._cdkVirtualForTrackBy;
        },
        set: function (fn) {
            var _this = this;
            this._needsUpdate = true;
            this._cdkVirtualForTrackBy = fn ?
                function (index, item) { return fn(index + (_this._renderedRange ? _this._renderedRange.start : 0), item); } :
                undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkVirtualForOf.prototype, "cdkVirtualForTemplate", {
        set: /** The template used to stamp out new elements. */
        function (value) {
            if (value) {
                this._needsUpdate = true;
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     */
    /**
       * Measures the combined size (width for horizontal orientation, height for vertical) of all items
       * in the specified range. Throws an error if the range includes items that are not currently
       * rendered.
       */
    CdkVirtualForOf.prototype.measureRangeSize = /**
       * Measures the combined size (width for horizontal orientation, height for vertical) of all items
       * in the specified range. Throws an error if the range includes items that are not currently
       * rendered.
       */
    function (range, orientation) {
        if (range.start >= range.end) {
            return 0;
        }
        if (range.start < this._renderedRange.start || range.end > this._renderedRange.end) {
            throw Error("Error: attempted to measure an item that isn't rendered.");
        }
        // The index into the list of rendered views for the first item in the range.
        var renderedStartIndex = range.start - this._renderedRange.start;
        // The length of the range we're measuring.
        var rangeLen = range.end - range.start;
        // Loop over all root nodes for all items in the range and sum up their size.
        var totalSize = 0;
        var i = rangeLen;
        while (i--) {
            var view = this._viewContainerRef.get(i + renderedStartIndex);
            var j = view ? view.rootNodes.length : 0;
            while (j--) {
                totalSize += getSize(orientation, view.rootNodes[j]);
            }
        }
        return totalSize;
    };
    CdkVirtualForOf.prototype.ngDoCheck = function () {
        if (this._differ && this._needsUpdate) {
            // TODO(mmalerba): We should differentiate needs update due to scrolling and a new portion of
            // this list being rendered (can use simpler algorithm) vs needs update due to data actually
            // changing (need to do this diff).
            var changes = this._differ.diff(this._renderedItems);
            if (!changes) {
                this._updateContext();
            }
            else {
                this._applyChanges(changes);
            }
            this._needsUpdate = false;
        }
    };
    CdkVirtualForOf.prototype.ngOnDestroy = function () {
        this._viewport.detach();
        this._dataSourceChanges.complete();
        this.viewChange.complete();
        this._destroyed.next();
        this._destroyed.complete();
        for (var _i = 0, _a = this._templateCache; _i < _a.length; _i++) {
            var view = _a[_i];
            view.destroy();
        }
    };
    /** React to scroll state changes in the viewport. */
    /** React to scroll state changes in the viewport. */
    CdkVirtualForOf.prototype._onRenderedDataChange = /** React to scroll state changes in the viewport. */
    function () {
        if (!this._renderedRange) {
            return;
        }
        this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
        if (!this._differ) {
            this._differ = this._differs.find(this._renderedItems).create(this.cdkVirtualForTrackBy);
        }
        this._needsUpdate = true;
    };
    /** Swap out one `DataSource` for another. */
    /** Swap out one `DataSource` for another. */
    CdkVirtualForOf.prototype._changeDataSource = /** Swap out one `DataSource` for another. */
    function (oldDs, newDs) {
        if (oldDs) {
            oldDs.disconnect(this);
        }
        this._needsUpdate = true;
        return newDs.connect(this);
    };
    /** Update the `CdkVirtualForOfContext` for all views. */
    /** Update the `CdkVirtualForOfContext` for all views. */
    CdkVirtualForOf.prototype._updateContext = /** Update the `CdkVirtualForOfContext` for all views. */
    function () {
        var count = this._data.length;
        var i = this._viewContainerRef.length;
        while (i--) {
            var view = this._viewContainerRef.get(i);
            view.context.index = this._renderedRange.start + i;
            view.context.count = count;
            this._updateComputedContextProperties(view.context);
            view.detectChanges();
        }
    };
    /** Apply changes to the DOM. */
    /** Apply changes to the DOM. */
    CdkVirtualForOf.prototype._applyChanges = /** Apply changes to the DOM. */
    function (changes) {
        var _this = this;
        // Rearrange the views to put them in the right location.
        changes.forEachOperation(function (record, adjustedPreviousIndex, currentIndex) {
            if (record.previousIndex == null) {
                // Item added.
                var view = _this._getViewForNewItem();
                _this._viewContainerRef.insert(view, currentIndex);
                view.context.$implicit = record.item;
            }
            else if (currentIndex == null) {
                // Item removed.
                _this._cacheView(_this._viewContainerRef.detach(adjustedPreviousIndex));
            }
            else {
                // Item moved.
                var view = _this._viewContainerRef.get(adjustedPreviousIndex);
                _this._viewContainerRef.move(view, currentIndex);
                view.context.$implicit = record.item;
            }
        });
        // Update $implicit for any items that had an identity change.
        changes.forEachIdentityChange(function (record) {
            var view = _this._viewContainerRef.get((record.currentIndex));
            view.context.$implicit = record.item;
        });
        // Update the context variables on all items.
        var count = this._data.length;
        var i = this._viewContainerRef.length;
        while (i--) {
            var view = this._viewContainerRef.get(i);
            view.context.index = this._renderedRange.start + i;
            view.context.count = count;
            this._updateComputedContextProperties(view.context);
        }
    };
    /** Cache the given detached view. */
    /** Cache the given detached view. */
    CdkVirtualForOf.prototype._cacheView = /** Cache the given detached view. */
    function (view) {
        if (this._templateCache.length < this.cdkVirtualForTemplateCacheSize) {
            this._templateCache.push(view);
        }
        else {
            view.destroy();
        }
    };
    /** Get a view for a new item, either from the cache or by creating a new one. */
    /** Get a view for a new item, either from the cache or by creating a new one. */
    CdkVirtualForOf.prototype._getViewForNewItem = /** Get a view for a new item, either from the cache or by creating a new one. */
    function () {
        return this._templateCache.pop() || this._viewContainerRef.createEmbeddedView(this._template, {
            $implicit: (null),
            cdkVirtualForOf: this._cdkVirtualForOf,
            index: -1,
            count: -1,
            first: false,
            last: false,
            odd: false,
            even: false
        });
    };
    /** Update the computed properties on the `CdkVirtualForOfContext`. */
    /** Update the computed properties on the `CdkVirtualForOfContext`. */
    CdkVirtualForOf.prototype._updateComputedContextProperties = /** Update the computed properties on the `CdkVirtualForOfContext`. */
    function (context) {
        context.first = context.index === 0;
        context.last = context.index === context.count - 1;
        context.even = context.index % 2 === 0;
        context.odd = !context.even;
    };
    CdkVirtualForOf.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkVirtualFor][cdkVirtualForOf]',
                },] },
    ];
    /** @nocollapse */
    CdkVirtualForOf.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.TemplateRef, },
        { type: core_1.IterableDiffers, },
        { type: virtual_scroll_viewport_1.CdkVirtualScrollViewport, decorators: [{ type: core_1.SkipSelf },] },
    ]; };
    CdkVirtualForOf.propDecorators = {
        "cdkVirtualForOf": [{ type: core_1.Input },],
        "cdkVirtualForTrackBy": [{ type: core_1.Input },],
        "cdkVirtualForTemplate": [{ type: core_1.Input },],
        "cdkVirtualForTemplateCacheSize": [{ type: core_1.Input },],
    };
    return CdkVirtualForOf;
}());
exports.CdkVirtualForOf = CdkVirtualForOf;
//# sourceMappingURL=virtual-for-of.js.map