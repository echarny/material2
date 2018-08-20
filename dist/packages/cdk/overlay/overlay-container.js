"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var i0 = require("@angular/core");
var i1 = require("@angular/common");
/** Container inside which all overlays will render. */
var OverlayContainer = /** @class */ (function () {
    function OverlayContainer(_document) {
        this._document = _document;
    }
    OverlayContainer.prototype.ngOnDestroy = function () {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    };
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @returns the container element
     */
    /**
       * This method returns the overlay container element. It will lazily
       * create the element the first time  it is called to facilitate using
       * the container in non-browser environments.
       * @returns the container element
       */
    OverlayContainer.prototype.getContainerElement = /**
       * This method returns the overlay container element. It will lazily
       * create the element the first time  it is called to facilitate using
       * the container in non-browser environments.
       * @returns the container element
       */
    function () {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    };
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     */
    /**
       * Create the overlay container element, which is simply a div
       * with the 'cdk-overlay-container' class on the document body.
       */
    OverlayContainer.prototype._createContainer = /**
       * Create the overlay container element, which is simply a div
       * with the 'cdk-overlay-container' class on the document body.
       */
    function () {
        var container = this._document.createElement('div');
        container.classList.add('cdk-overlay-container');
        this._document.body.appendChild(container);
        this._containerElement = container;
    };
    OverlayContainer.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    OverlayContainer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    OverlayContainer.ngInjectableDef = i0.defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(i0.inject(i1.DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
    return OverlayContainer;
}());
exports.OverlayContainer = OverlayContainer;
/** @docs-private @deprecated @breaking-change 7.0.0 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer, _document) {
    return parentContainer || new OverlayContainer(_document);
}
exports.OVERLAY_CONTAINER_PROVIDER_FACTORY = OVERLAY_CONTAINER_PROVIDER_FACTORY;
/** @docs-private @deprecated @breaking-change 7.0.0 */
exports.OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [
        [new core_1.Optional(), new core_1.SkipSelf(), OverlayContainer],
        common_1.DOCUMENT // We need to use the InjectionToken somewhere to keep TS happy
    ],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};
//# sourceMappingURL=overlay-container.js.map