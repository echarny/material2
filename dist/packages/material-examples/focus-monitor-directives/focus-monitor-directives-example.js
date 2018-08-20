"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Monitoring focus with FocusMonitor */
var FocusMonitorDirectivesExample = /** @class */ (function () {
    function FocusMonitorDirectivesExample(ngZone, cdr) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.elementOrigin = this.formatOrigin(null);
        this.subtreeOrigin = this.formatOrigin(null);
    }
    FocusMonitorDirectivesExample.prototype.formatOrigin = function (origin) {
        return origin ? origin + ' focused' : 'blurred';
    };
    // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
    // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
    FocusMonitorDirectivesExample.prototype.markForCheck = 
    // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
    function () {
        var _this = this;
        this.ngZone.run(function () { return _this.cdr.markForCheck(); });
    };
    FocusMonitorDirectivesExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'focus-monitor-directives-example',
                    template: "<div class=\"example-focus-monitor\"><button cdkMonitorSubtreeFocus (cdkFocusChange)=\"elementOrigin = formatOrigin($event); markForCheck()\">Focus Monitored Element ({{elementOrigin}})</button></div><div class=\"example-focus-monitor\"><div cdkMonitorSubtreeFocus (cdkFocusChange)=\"subtreeOrigin = formatOrigin($event); markForCheck()\"><p>Focus Monitored Subtree ({{subtreeOrigin}})</p><button>Child Button 1</button> <button>Child Button 2</button></div></div>",
                    styles: [".example-focus-monitor { padding: 20px; } .example-focus-monitor .cdk-mouse-focused { background: rgba(255, 0, 0, 0.5); } .example-focus-monitor .cdk-keyboard-focused { background: rgba(0, 255, 0, 0.5); } .example-focus-monitor .cdk-touch-focused { background: rgba(0, 0, 255, 0.5); } .example-focus-monitor .cdk-program-focused { background: rgba(255, 0, 255, 0.5); } "]
                },] },
    ];
    /** @nocollapse */
    FocusMonitorDirectivesExample.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return FocusMonitorDirectivesExample;
}());
exports.FocusMonitorDirectivesExample = FocusMonitorDirectivesExample;
//# sourceMappingURL=focus-monitor-directives-example.js.map