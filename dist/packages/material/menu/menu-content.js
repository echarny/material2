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
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
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
        /** Emits when the menu content has been attached. */
        this._attached = new rxjs_1.Subject();
    }
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    /**
       * Attaches the content with a particular context.
       * @docs-private
       */
    MatMenuContent.prototype.attach = /**
       * Attaches the content with a particular context.
       * @docs-private
       */
    function (context) {
        if (context === void 0) { context = {}; }
        if (!this._portal) {
            this._portal = new portal_1.TemplatePortal(this._template, this._viewContainerRef);
        }
        this.detach();
        if (!this._outlet) {
            this._outlet = new portal_1.DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }
        var element = this._template.elementRef.nativeElement;
        // Because we support opening the same menu from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        // Because we support opening the same menu from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        element.parentNode.insertBefore(this._outlet.outletElement, element);
        this._portal.attach(this._outlet, context);
        this._attached.next();
    };
    /**
     * Detaches the content.
     * @docs-private
     */
    /**
       * Detaches the content.
       * @docs-private
       */
    MatMenuContent.prototype.detach = /**
       * Detaches the content.
       * @docs-private
       */
    function () {
        if (this._portal.isAttached) {
            this._portal.detach();
        }
    };
    MatMenuContent.prototype.ngOnDestroy = function () {
        if (this._outlet) {
            this._outlet.dispose();
        }
    };
    MatMenuContent.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'ng-template[matMenuContent]'
                },] },
    ];
    /** @nocollapse */
    MatMenuContent.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: core_1.Injector, },
        { type: core_1.ViewContainerRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
    ]; };
    return MatMenuContent;
}());
exports.MatMenuContent = MatMenuContent;
//# sourceMappingURL=menu-content.js.map