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
var portal_errors_1 = require("./portal-errors");
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 */
var /**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 */
Portal = /** @class */ (function () {
    function Portal() {
    }
    /** Attach this portal to a host. */
    /** Attach this portal to a host. */
    Portal.prototype.attach = /** Attach this portal to a host. */
    function (host) {
        if (host == null) {
            portal_errors_1.throwNullPortalOutletError();
        }
        if (host.hasAttached()) {
            portal_errors_1.throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return host.attach(this);
    };
    /** Detach this portal from its host */
    /** Detach this portal from its host */
    Portal.prototype.detach = /** Detach this portal from its host */
    function () {
        var host = this._attachedHost;
        if (host == null) {
            portal_errors_1.throwNoPortalAttachedError();
        }
        else {
            this._attachedHost = null;
            host.detach();
        }
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: /** Whether this portal is attached to a host. */
        function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
     * the PortalOutlet when it is performing an `attach()` or `detach()`.
     */
    /**
       * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
       * the PortalOutlet when it is performing an `attach()` or `detach()`.
       */
    Portal.prototype.setAttachedHost = /**
       * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
       * the PortalOutlet when it is performing an `attach()` or `detach()`.
       */
    function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
exports.Portal = Portal;
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var /**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
ComponentPortal = /** @class */ (function (_super) {
    __extends(ComponentPortal, _super);
    function ComponentPortal(component, viewContainerRef, injector) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.viewContainerRef = viewContainerRef;
        _this.injector = injector;
        return _this;
    }
    return ComponentPortal;
}(Portal));
exports.ComponentPortal = ComponentPortal;
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var /**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
TemplatePortal = /** @class */ (function (_super) {
    __extends(TemplatePortal, _super);
    function TemplatePortal(template, viewContainerRef, context) {
        var _this = _super.call(this) || this;
        _this.templateRef = template;
        _this.viewContainerRef = viewContainerRef;
        _this.context = context;
        return _this;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attach the the portal to the provided `PortalOutlet`.
     * When a context is provided it will override the `context` property of the `TemplatePortal`
     * instance.
     */
    /**
       * Attach the the portal to the provided `PortalOutlet`.
       * When a context is provided it will override the `context` property of the `TemplatePortal`
       * instance.
       */
    TemplatePortal.prototype.attach = /**
       * Attach the the portal to the provided `PortalOutlet`.
       * When a context is provided it will override the `context` property of the `TemplatePortal`
       * instance.
       */
    function (host, context) {
        if (context === void 0) { context = this.context; }
        this.context = context;
        return _super.prototype.attach.call(this, host);
    };
    TemplatePortal.prototype.detach = function () {
        this.context = undefined;
        return _super.prototype.detach.call(this);
    };
    return TemplatePortal;
}(Portal));
exports.TemplatePortal = TemplatePortal;
/**
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 */
var /**
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 */
BasePortalOutlet = /** @class */ (function () {
    function BasePortalOutlet() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    /** Whether this host has an attached portal. */
    BasePortalOutlet.prototype.hasAttached = /** Whether this host has an attached portal. */
    function () {
        return !!this._attachedPortal;
    };
    /** Attaches a portal. */
    /** Attaches a portal. */
    BasePortalOutlet.prototype.attach = /** Attaches a portal. */
    function (portal) {
        if (!portal) {
            portal_errors_1.throwNullPortalError();
        }
        if (this.hasAttached()) {
            portal_errors_1.throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            portal_errors_1.throwPortalOutletAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        portal_errors_1.throwUnknownPortalTypeError();
    };
    /** Detaches a previously attached portal. */
    /** Detaches a previously attached portal. */
    BasePortalOutlet.prototype.detach = /** Detaches a previously attached portal. */
    function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    };
    /** Permanently dispose of this portal host. */
    /** Permanently dispose of this portal host. */
    BasePortalOutlet.prototype.dispose = /** Permanently dispose of this portal host. */
    function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    };
    /** @docs-private */
    /** @docs-private */
    BasePortalOutlet.prototype.setDisposeFn = /** @docs-private */
    function (fn) {
        this._disposeFn = fn;
    };
    BasePortalOutlet.prototype._invokeDisposeFn = function () {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    return BasePortalOutlet;
}());
exports.BasePortalOutlet = BasePortalOutlet;
//# sourceMappingURL=portal.js.map