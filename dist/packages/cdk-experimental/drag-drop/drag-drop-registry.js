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
var common_1 = require("@angular/common");
var platform_1 = require("@angular/cdk/platform");
var rxjs_1 = require("rxjs");
var i0 = require("@angular/core");
var i1 = require("@angular/common");
/** Event options that can be used to bind an active event. */
var activeEventOptions = platform_1.supportsPassiveEventListeners() ? { passive: false } : false;
/**
 * Service that keeps track of all the drag item and drop container
 * instances, and manages global event listeners on the `document`.
 * @docs-private
 */
// Note: this class is generic, rather than referencing CdkDrag and CdkDrop directly, in order to
// avoid circular imports. If we were to reference them here, importing the registry into the
// classes that are registering themselves will introduce a circular import.
var DragDropRegistry = /** @class */ (function () {
    function DragDropRegistry(_ngZone, _document) {
        var _this = this;
        this._ngZone = _ngZone;
        /** Registered drop container instances. */
        this._dropInstances = new Set();
        /** Registered drag item instances. */
        this._dragInstances = new Set();
        /** Drag item instances that are currently being dragged. */
        this._activeDragInstances = new Set();
        /** Keeps track of the event listeners that we've bound to the `document`. */
        this._globalListeners = new Map();
        /**
           * Emits the `touchmove` or `mousemove` events that are dispatched
           * while the user is dragging a drag item instance.
           */
        this.pointerMove = new rxjs_1.Subject();
        /**
           * Emits the `touchend` or `mouseup` events that are dispatched
           * while the user is dragging a drag item instance.
           */
        this.pointerUp = new rxjs_1.Subject();
        /**
           * Listener used to prevent `touchmove` events while the element is being dragged.
           * This gets bound once, ahead of time, because WebKit won't preventDefault on a
           * dynamically-added `touchmove` listener. See https://bugs.webkit.org/show_bug.cgi?id=184250.
           */
        this._preventScrollListener = function (event) {
            if (_this._activeDragInstances.size) {
                event.preventDefault();
            }
        };
        this._document = _document;
    }
    /** Adds a drop container to the registry. */
    /** Adds a drop container to the registry. */
    DragDropRegistry.prototype.registerDropContainer = /** Adds a drop container to the registry. */
    function (drop) {
        if (!this._dropInstances.has(drop)) {
            if (this.getDropContainer(drop.id)) {
                throw Error("Drop instance with id \"" + drop.id + "\" has already been registered.");
            }
            this._dropInstances.add(drop);
        }
    };
    /** Adds a drag item instance to the registry. */
    /** Adds a drag item instance to the registry. */
    DragDropRegistry.prototype.registerDragItem = /** Adds a drag item instance to the registry. */
    function (drag) {
        var _this = this;
        this._dragInstances.add(drag);
        if (this._dragInstances.size === 1) {
            this._ngZone.runOutsideAngular(function () {
                // The event handler has to be explicitly active, because
                // newer browsers make it passive by default.
                // The event handler has to be explicitly active, because
                // newer browsers make it passive by default.
                _this._document.addEventListener('touchmove', _this._preventScrollListener, activeEventOptions);
            });
        }
    };
    /** Removes a drop container from the registry. */
    /** Removes a drop container from the registry. */
    DragDropRegistry.prototype.removeDropContainer = /** Removes a drop container from the registry. */
    function (drop) {
        this._dropInstances.delete(drop);
    };
    /** Removes a drag item instance from the registry. */
    /** Removes a drag item instance from the registry. */
    DragDropRegistry.prototype.removeDragItem = /** Removes a drag item instance from the registry. */
    function (drag) {
        this._dragInstances.delete(drag);
        this.stopDragging(drag);
        if (this._dragInstances.size === 0) {
            this._document.removeEventListener('touchmove', this._preventScrollListener, activeEventOptions);
        }
    };
    /**
     * Starts the dragging sequence for a drag instance.
     * @param drag Drag instance which is being dragged.
     * @param event Event that initiated the dragging.
     */
    /**
       * Starts the dragging sequence for a drag instance.
       * @param drag Drag instance which is being dragged.
       * @param event Event that initiated the dragging.
       */
    DragDropRegistry.prototype.startDragging = /**
       * Starts the dragging sequence for a drag instance.
       * @param drag Drag instance which is being dragged.
       * @param event Event that initiated the dragging.
       */
    function (drag, event) {
        var _this = this;
        this._activeDragInstances.add(drag);
        if (this._activeDragInstances.size === 1) {
            var isTouchEvent = event.type.startsWith('touch');
            var moveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
            var upEvent = isTouchEvent ? 'touchend' : 'mouseup';
            // We explicitly bind __active__ listeners here, because newer browsers will default to
            // passive ones for `mousemove` and `touchmove`. The events need to be active, because we
            // use `preventDefault` to prevent the page from scrolling while the user is dragging.
            this._globalListeners
                .set(moveEvent, { handler: function (e) { return _this.pointerMove.next(e); }, options: activeEventOptions })
                .set(upEvent, { handler: function (e) { return _this.pointerUp.next(e); } })
                .forEach(function (config, name) {
                _this._ngZone.runOutsideAngular(function () {
                    _this._document.addEventListener(name, config.handler, config.options);
                });
            });
        }
    };
    /** Stops dragging a drag item instance. */
    /** Stops dragging a drag item instance. */
    DragDropRegistry.prototype.stopDragging = /** Stops dragging a drag item instance. */
    function (drag) {
        this._activeDragInstances.delete(drag);
        if (this._activeDragInstances.size === 0) {
            this._clearGlobalListeners();
        }
    };
    /** Gets whether a drag item instance is currently being dragged. */
    /** Gets whether a drag item instance is currently being dragged. */
    DragDropRegistry.prototype.isDragging = /** Gets whether a drag item instance is currently being dragged. */
    function (drag) {
        return this._activeDragInstances.has(drag);
    };
    /** Gets a drop container by its id. */
    /** Gets a drop container by its id. */
    DragDropRegistry.prototype.getDropContainer = /** Gets a drop container by its id. */
    function (id) {
        return Array.from(this._dropInstances).find(function (instance) { return instance.id === id; });
    };
    DragDropRegistry.prototype.ngOnDestroy = function () {
        var _this = this;
        this._dragInstances.forEach(function (instance) { return _this.removeDragItem(instance); });
        this._dropInstances.forEach(function (instance) { return _this.removeDropContainer(instance); });
        this._clearGlobalListeners();
        this.pointerMove.complete();
        this.pointerUp.complete();
    };
    /** Clears out the global event listeners from the `document`. */
    /** Clears out the global event listeners from the `document`. */
    DragDropRegistry.prototype._clearGlobalListeners = /** Clears out the global event listeners from the `document`. */
    function () {
        var _this = this;
        this._globalListeners.forEach(function (config, name) {
            _this._document.removeEventListener(name, config.handler, config.options);
        });
        this._globalListeners.clear();
    };
    DragDropRegistry.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    DragDropRegistry.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    DragDropRegistry.ngInjectableDef = i0.defineInjectable({ factory: function DragDropRegistry_Factory() { return new DragDropRegistry(i0.inject(i0.NgZone), i0.inject(i1.DOCUMENT)); }, token: DragDropRegistry, providedIn: "root" });
    return DragDropRegistry;
}());
exports.DragDropRegistry = DragDropRegistry;
//# sourceMappingURL=drag-drop-registry.js.map