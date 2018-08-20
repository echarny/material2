"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** Injection token to be used to override the default options for `mat-slide-toggle`. */
exports.MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-slide-toggle-default-options', {
    providedIn: 'root',
    factory: function () { return ({ disableToggleValue: false, disableDragValue: false }); }
});
//# sourceMappingURL=slide-toggle-config.js.map