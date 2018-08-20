"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var core_1 = require("@angular/core");
/** @title Monitoring focus with FocusMonitor */
var FocusMonitorOverviewExample = /** @class */ (function () {
    function FocusMonitorOverviewExample(focusMonitor, cdr, ngZone) {
        this.focusMonitor = focusMonitor;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.elementOrigin = this.formatOrigin(null);
        this.subtreeOrigin = this.formatOrigin(null);
    }
    FocusMonitorOverviewExample.prototype.ngOnInit = function () {
        var _this = this;
        this.focusMonitor.monitor(this.element.nativeElement)
            .subscribe(function (origin) {
            return _this.ngZone.run(function () {
                _this.elementOrigin = _this.formatOrigin(origin);
                _this.cdr.markForCheck();
            });
        });
        this.focusMonitor.monitor(this.subtree.nativeElement, true)
            .subscribe(function (origin) {
            return _this.ngZone.run(function () {
                _this.subtreeOrigin = _this.formatOrigin(origin);
                _this.cdr.markForCheck();
            });
        });
    };
    FocusMonitorOverviewExample.prototype.ngOnDestroy = function () {
        this.focusMonitor.stopMonitoring(this.element.nativeElement);
        this.focusMonitor.stopMonitoring(this.subtree.nativeElement);
    };
    FocusMonitorOverviewExample.prototype.formatOrigin = function (origin) {
        return origin ? origin + ' focused' : 'blurred';
    };
    FocusMonitorOverviewExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'focus-monitor-overview-example',
                    template: "<div class=\"example-focus-monitor\"><button #element>Focus Monitored Element ({{elementOrigin}})</button></div><div class=\"example-focus-monitor\"><div #subtree><p>Focus Monitored Subtree ({{subtreeOrigin}})</p><button>Child Button 1</button> <button>Child Button 2</button></div></div>",
                    styles: [".example-focus-monitor { padding: 20px; } .example-focus-monitor .cdk-mouse-focused { background: rgba(255, 0, 0, 0.5); } .example-focus-monitor .cdk-keyboard-focused { background: rgba(0, 255, 0, 0.5); } .example-focus-monitor .cdk-touch-focused { background: rgba(0, 0, 255, 0.5); } .example-focus-monitor .cdk-program-focused { background: rgba(255, 0, 255, 0.5); } "]
                },] },
    ];
    /** @nocollapse */
    FocusMonitorOverviewExample.ctorParameters = function () { return [
        { type: a11y_1.FocusMonitor, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ]; };
    FocusMonitorOverviewExample.propDecorators = {
        "element": [{ type: core_1.ViewChild, args: ['element',] },],
        "subtree": [{ type: core_1.ViewChild, args: ['subtree',] },],
    };
    return FocusMonitorOverviewExample;
}());
exports.FocusMonitorOverviewExample = FocusMonitorOverviewExample;
//# sourceMappingURL=focus-monitor-overview-example.js.map