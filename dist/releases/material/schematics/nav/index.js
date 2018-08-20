"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const build_component_1 = require("../utils/build-component");
const ast_1 = require("../utils/ast");
/**
 * Scaffolds a new navigation component.
 * Internally it bootstraps the base component schematic
 */
function default_1(options) {
    return schematics_1.chain([
        build_component_1.buildComponent(Object.assign({}, options), {
            template: options.inlineTemplate &&
                './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html',
            stylesheet: options.inlineStyle &&
                './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__styleext__',
        }),
        options.skipImport ? schematics_1.noop() : addNavModulesToModule(options)
    ]);
}
exports.default = default_1;
/**
 * Adds the required modules to the relative module.
 */
function addNavModulesToModule(options) {
    return (host) => {
        const modulePath = ast_1.findModuleFromOptions(host, options);
        ast_1.addModuleImportToModule(host, modulePath, 'LayoutModule', '@angular/cdk/layout');
        ast_1.addModuleImportToModule(host, modulePath, 'MatToolbarModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatButtonModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatSidenavModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatIconModule', '@angular/material');
        ast_1.addModuleImportToModule(host, modulePath, 'MatListModule', '@angular/material');
        return host;
    };
}
//# sourceMappingURL=index.js.map