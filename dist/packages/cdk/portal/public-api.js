"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
__export(require("./portal"));
__export(require("./dom-portal-outlet"));
__export(require("./portal-directives"));
__export(require("./portal-injector"));
var dom_portal_outlet_1 = require("./dom-portal-outlet");
exports.DomPortalHost = dom_portal_outlet_1.DomPortalOutlet;
var portal_directives_1 = require("./portal-directives");
exports.PortalHostDirective = portal_directives_1.CdkPortalOutlet;
exports.TemplatePortalDirective = portal_directives_1.CdkPortal;
var portal_1 = require("./portal");
exports.BasePortalHost = portal_1.BasePortalOutlet;
//# sourceMappingURL=public-api.js.map