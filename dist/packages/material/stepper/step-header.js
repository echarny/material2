"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var core_1 = require("@angular/core");
var step_label_1 = require("./step-label");
var stepper_intl_1 = require("./stepper-intl");
var MatStepHeader = /** @class */ (function () {
    function MatStepHeader(_intl, _focusMonitor, _element, changeDetectorRef) {
        this._intl = _intl;
        this._focusMonitor = _focusMonitor;
        this._element = _element;
        _focusMonitor.monitor(_element.nativeElement, true);
        this._intlSubscription = _intl.changes.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    MatStepHeader.prototype.ngOnDestroy = function () {
        this._intlSubscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this._element.nativeElement);
    };
    /** Returns string label of given step if it is a text label. */
    /** Returns string label of given step if it is a text label. */
    MatStepHeader.prototype._stringLabel = /** Returns string label of given step if it is a text label. */
    function () {
        return this.label instanceof step_label_1.MatStepLabel ? null : this.label;
    };
    /** Returns MatStepLabel if the label of given step is a template label. */
    /** Returns MatStepLabel if the label of given step is a template label. */
    MatStepHeader.prototype._templateLabel = /** Returns MatStepLabel if the label of given step is a template label. */
    function () {
        return this.label instanceof step_label_1.MatStepLabel ? this.label : null;
    };
    /** Returns the host HTML element. */
    /** Returns the host HTML element. */
    MatStepHeader.prototype._getHostElement = /** Returns the host HTML element. */
    function () {
        return this._element.nativeElement;
    };
    /** Template context variables that are exposed to the `matStepperIcon` instances. */
    /** Template context variables that are exposed to the `matStepperIcon` instances. */
    MatStepHeader.prototype._getIconContext = /** Template context variables that are exposed to the `matStepperIcon` instances. */
    function () {
        return {
            index: this.index,
            active: this.active,
            optional: this.optional
        };
    };
    MatStepHeader.prototype.focus = function () {
        this._getHostElement().focus();
    };
    MatStepHeader.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-step-header',
                    template: "<div class=\"mat-step-header-ripple\" mat-ripple [matRippleTrigger]=\"_getHostElement()\"></div><div [class.mat-step-icon]=\"state !== 'number' || selected\" [class.mat-step-icon-not-touched]=\"state == 'number' && !selected\" [ngSwitch]=\"state\"><ng-container *ngSwitchCase=\"'number'\" [ngSwitch]=\"!!(iconOverrides && iconOverrides.number)\"><ng-container *ngSwitchCase=\"true\" [ngTemplateOutlet]=\"iconOverrides.number\" [ngTemplateOutletContext]=\"_getIconContext()\"></ng-container><span *ngSwitchDefault>{{index + 1}}</span></ng-container><ng-container *ngSwitchCase=\"'edit'\" [ngSwitch]=\"!!(iconOverrides && iconOverrides.edit)\"><ng-container *ngSwitchCase=\"true\" [ngTemplateOutlet]=\"iconOverrides.edit\" [ngTemplateOutletContext]=\"_getIconContext()\"></ng-container><mat-icon *ngSwitchDefault>create</mat-icon></ng-container><ng-container *ngSwitchCase=\"'done'\" [ngSwitch]=\"!!(iconOverrides && iconOverrides.done)\"><ng-container *ngSwitchCase=\"true\" [ngTemplateOutlet]=\"iconOverrides.done\" [ngTemplateOutletContext]=\"_getIconContext()\"></ng-container><mat-icon *ngSwitchDefault>done</mat-icon></ng-container></div><div class=\"mat-step-label\" [class.mat-step-label-active]=\"active\" [class.mat-step-label-selected]=\"selected\"><ng-container *ngIf=\"_templateLabel()\" [ngTemplateOutlet]=\"_templateLabel()!.template\"></ng-container><div class=\"mat-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div><div class=\"mat-step-optional\" *ngIf=\"optional\">{{_intl.optionalLabel}}</div></div>",
                    styles: [".mat-step-header{overflow:hidden;outline:0;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:transparent}.mat-step-optional{font-size:12px}.mat-step-icon,.mat-step-icon-not-touched{border-radius:50%;height:24px;width:24px;align-items:center;justify-content:center;display:flex;flex-shrink:0}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"],
                    host: {
                        'class': 'mat-step-header',
                        'role': 'tab',
                    },
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatStepHeader.ctorParameters = function () { return [
        { type: stepper_intl_1.MatStepperIntl, },
        { type: a11y_1.FocusMonitor, },
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatStepHeader.propDecorators = {
        "state": [{ type: core_1.Input },],
        "label": [{ type: core_1.Input },],
        "iconOverrides": [{ type: core_1.Input },],
        "index": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "active": [{ type: core_1.Input },],
        "optional": [{ type: core_1.Input },],
    };
    return MatStepHeader;
}());
exports.MatStepHeader = MatStepHeader;
//# sourceMappingURL=step-header.js.map