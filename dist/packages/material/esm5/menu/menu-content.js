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
import { Directive, TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, Inject, } from '@angular/core';
import { TemplatePortal, DomPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
/**
 * Menu content that will be rendered lazily once the menu is opened.
 */
var MatMenuContent = /** @class */ (function () {
    function MatMenuContent(_template, _componentFactoryResolver, _appRef, _injector, _viewContainerRef, _document) {
        this._template = _template;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._viewContainerRef = _viewContainerRef;
        this._document = _document;
        /**
         * Emits when the menu content has been attached.
         */
        this._attached = new Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    /**
     * Attaches the content with a particular context.
     * \@docs-private
     * @param {?=} context
     * @return {?}
     */
    MatMenuContent.prototype.attach = /**
     * Attaches the content with a particular context.
     * \@docs-private
     * @param {?=} context
     * @return {?}
     */
    function (context) {
        if (context === void 0) { context = {}; }
        if (!this._portal) {
            this._portal = new TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this._outlet) {
            this._outlet = new DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        var /** @type {?} */ element = this._template.elementRef.nativeElement; /** @type {?} */
        ((
        // Because we support opening the same menu from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        element.parentNode)).insertBefore(this._outlet.outletElement, element);
        this._portal.attach(this._outlet, context);
        this._attached.next();
    };
    /**
     * Detaches the content.
     * @docs-private
     */
    /**
     * Detaches the content.
     * \@docs-private
     * @return {?}
     */
    MatMenuContent.prototype.detach = /**
     * Detaches the content.
     * \@docs-private
     * @return {?}
     */
    function () {
        if (this._portal.isAttached) {
            this._portal.detach();
        }
    };
    /**
     * @return {?}
     */
    MatMenuContent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._outlet) {
            this._outlet.dispose();
        }
    };
    MatMenuContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ng-template[matMenuContent]'
                },] },
    ];
    /** @nocollapse */
    MatMenuContent.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ComponentFactoryResolver, },
        { type: ApplicationRef, },
        { type: Injector, },
        { type: ViewContainerRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return MatMenuContent;
}());
export { MatMenuContent };
function MatMenuContent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatMenuContent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatMenuContent.ctorParameters;
    /** @type {?} */
    MatMenuContent.prototype._portal;
    /** @type {?} */
    MatMenuContent.prototype._outlet;
    /**
     * Emits when the menu content has been attached.
     * @type {?}
     */
    MatMenuContent.prototype._attached;
    /** @type {?} */
    MatMenuContent.prototype._template;
    /** @type {?} */
    MatMenuContent.prototype._componentFactoryResolver;
    /** @type {?} */
    MatMenuContent.prototype._appRef;
    /** @type {?} */
    MatMenuContent.prototype._injector;
    /** @type {?} */
    MatMenuContent.prototype._viewContainerRef;
    /** @type {?} */
    MatMenuContent.prototype._document;
}
//# sourceMappingURL=menu-content.js.map