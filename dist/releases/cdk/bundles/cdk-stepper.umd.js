/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/a11y'), require('@angular/cdk/bidi'), require('@angular/cdk/coercion'), require('@angular/cdk/keycodes'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('@angular/cdk/stepper', ['exports', '@angular/core', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/keycodes', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.cdk = global.ng.cdk || {}, global.ng.cdk.stepper = {}),global.ng.core,global.ng.cdk.a11y,global.ng.cdk.bidi,global.ng.cdk.coercion,global.ng.cdk.keycodes,global.ng.forms,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,a11y,bidi,coercion,keycodes,forms,rxjs,operators,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CdkStepLabel = /** @class */ (function () {
    function CdkStepLabel(template) {
        this.template = template;
    }
    CdkStepLabel.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkStepLabel]',
                },] },
    ];
    /** @nocollapse */
    CdkStepLabel.ctorParameters = function () { return [
        { type: core.TemplateRef, },
    ]; };
    return CdkStepLabel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Used to generate unique ID for each stepper component.
 */
var /** @type {?} */ nextId = 0;
/**
 * Change event emitted on selection changes.
 */
var   /**
 * Change event emitted on selection changes.
 */
StepperSelectionEvent = /** @class */ (function () {
    function StepperSelectionEvent() {
    }
    return StepperSelectionEvent;
}());
var CdkStep = /** @class */ (function () {
    function CdkStep(_stepper) {
        this._stepper = _stepper;
        /**
         * Whether user has seen the expanded step content or not.
         */
        this.interacted = false;
        this._editable = true;
        this._optional = false;
        this._customCompleted = null;
    }
    Object.defineProperty(CdkStep.prototype, "editable", {
        get: /**
         * Whether the user can return to this step once it has been marked as complted.
         * @return {?}
         */
        function () { return this._editable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._editable = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "optional", {
        get: /**
         * Whether the completion of step is optional.
         * @return {?}
         */
        function () { return this._optional; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._optional = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "completed", {
        get: /**
         * Whether step is marked as completed.
         * @return {?}
         */
        function () {
            return this._customCompleted == null ? this._defaultCompleted : this._customCompleted;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._customCompleted = coercion.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "_defaultCompleted", {
        get: /**
         * @return {?}
         */
        function () {
            return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
        },
        enumerable: true,
        configurable: true
    });
    /** Selects this step component. */
    /**
     * Selects this step component.
     * @return {?}
     */
    CdkStep.prototype.select = /**
     * Selects this step component.
     * @return {?}
     */
    function () {
        this._stepper.selected = this;
    };
    /** Resets the step to its initial state. Note that this includes resetting form data. */
    /**
     * Resets the step to its initial state. Note that this includes resetting form data.
     * @return {?}
     */
    CdkStep.prototype.reset = /**
     * Resets the step to its initial state. Note that this includes resetting form data.
     * @return {?}
     */
    function () {
        this.interacted = false;
        if (this._customCompleted != null) {
            this._customCompleted = false;
        }
        if (this.stepControl) {
            this.stepControl.reset();
        }
    };
    /**
     * @return {?}
     */
    CdkStep.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        // Since basically all inputs of the MatStep get proxied through the view down to the
        // underlying MatStepHeader, we have to make sure that change detection runs correctly.
        this._stepper._stateChanged();
    };
    CdkStep.decorators = [
        { type: core.Component, args: [{selector: 'cdk-step',
                    exportAs: 'cdkStep',
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    CdkStep.ctorParameters = function () { return [
        { type: CdkStepper, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return CdkStepper; }),] },] },
    ]; };
    CdkStep.propDecorators = {
        "stepLabel": [{ type: core.ContentChild, args: [CdkStepLabel,] },],
        "content": [{ type: core.ViewChild, args: [core.TemplateRef,] },],
        "stepControl": [{ type: core.Input },],
        "label": [{ type: core.Input },],
        "ariaLabel": [{ type: core.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core.Input, args: ['aria-labelledby',] },],
        "editable": [{ type: core.Input },],
        "optional": [{ type: core.Input },],
        "completed": [{ type: core.Input },],
    };
    return CdkStep;
}());
var CdkStepper = /** @class */ (function () {
    function CdkStepper(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Emits when the component is destroyed.
         */
        this._destroyed = new rxjs.Subject();
        this._linear = false;
        this._selectedIndex = 0;
        /**
         * Event emitted when the selected step has changed.
         */
        this.selectionChange = new core.EventEmitter();
        this._orientation = 'horizontal';
        this._groupId = nextId++;
    }
    Object.defineProperty(CdkStepper.prototype, "linear", {
        get: /**
         * Whether the validity of previous steps should be checked or not.
         * @return {?}
         */
        function () { return this._linear; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._linear = coercion.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStepper.prototype, "selectedIndex", {
        get: /**
         * The index of the selected step.
         * @return {?}
         */
        function () { return this._selectedIndex; },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (this._steps) {
                // Ensure that the index can't be out of bounds.
                if (index < 0 || index > this._steps.length - 1) {
                    throw Error('cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.');
                }
                if (this._selectedIndex != index &&
                    !this._anyControlsInvalidOrPending(index) &&
                    (index >= this._selectedIndex || this._steps.toArray()[index].editable)) {
                    this._updateSelectedItemIndex(index);
                }
            }
            else {
                this._selectedIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStepper.prototype, "selected", {
        get: /**
         * The step that is selected.
         * @return {?}
         */
        function () {
            // @breaking-change 7.0.0 Change return type to `CdkStep | undefined`.
            return this._steps ? this._steps.toArray()[this.selectedIndex] : /** @type {?} */ ((undefined));
        },
        set: /**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this.selectedIndex = this._steps ? this._steps.toArray().indexOf(step) : -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkStepper.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._keyManager = new a11y.FocusKeyManager(this._stepHeader)
            .withWrap()
            .withVerticalOrientation(this._orientation === 'vertical');
        (this._dir ? /** @type {?} */ (this._dir.change) : rxjs.of())
            .pipe(operators.startWith(this._layoutDirection()), operators.takeUntil(this._destroyed))
            .subscribe(function (direction) { return _this._keyManager.withHorizontalOrientation(direction); });
        this._keyManager.updateActiveItemIndex(this._selectedIndex);
    };
    /**
     * @return {?}
     */
    CdkStepper.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Selects and focuses the next step in list. */
    /**
     * Selects and focuses the next step in list.
     * @return {?}
     */
    CdkStepper.prototype.next = /**
     * Selects and focuses the next step in list.
     * @return {?}
     */
    function () {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
    };
    /** Selects and focuses the previous step in list. */
    /**
     * Selects and focuses the previous step in list.
     * @return {?}
     */
    CdkStepper.prototype.previous = /**
     * Selects and focuses the previous step in list.
     * @return {?}
     */
    function () {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    };
    /** Resets the stepper to its initial state. Note that this includes clearing form data. */
    /**
     * Resets the stepper to its initial state. Note that this includes clearing form data.
     * @return {?}
     */
    CdkStepper.prototype.reset = /**
     * Resets the stepper to its initial state. Note that this includes clearing form data.
     * @return {?}
     */
    function () {
        this._updateSelectedItemIndex(0);
        this._steps.forEach(function (step) { return step.reset(); });
        this._stateChanged();
    };
    /** Returns a unique id for each step label element. */
    /**
     * Returns a unique id for each step label element.
     * @param {?} i
     * @return {?}
     */
    CdkStepper.prototype._getStepLabelId = /**
     * Returns a unique id for each step label element.
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "cdk-step-label-" + this._groupId + "-" + i;
    };
    /** Returns unique id for each step content element. */
    /**
     * Returns unique id for each step content element.
     * @param {?} i
     * @return {?}
     */
    CdkStepper.prototype._getStepContentId = /**
     * Returns unique id for each step content element.
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return "cdk-step-content-" + this._groupId + "-" + i;
    };
    /** Marks the component to be change detected. */
    /**
     * Marks the component to be change detected.
     * @return {?}
     */
    CdkStepper.prototype._stateChanged = /**
     * Marks the component to be change detected.
     * @return {?}
     */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    /** Returns position state of the step with the given index. */
    /**
     * Returns position state of the step with the given index.
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._getAnimationDirection = /**
     * Returns position state of the step with the given index.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ position = index - this._selectedIndex;
        if (position < 0) {
            return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
        }
        else if (position > 0) {
            return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
        }
        return 'current';
    };
    /** Returns the type of icon to be displayed. */
    /**
     * Returns the type of icon to be displayed.
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._getIndicatorType = /**
     * Returns the type of icon to be displayed.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ step = this._steps.toArray()[index];
        if (!step.completed || this._selectedIndex == index) {
            return 'number';
        }
        else {
            return step.editable ? 'edit' : 'done';
        }
    };
    /** Returns the index of the currently-focused step header. */
    /**
     * Returns the index of the currently-focused step header.
     * @return {?}
     */
    CdkStepper.prototype._getFocusIndex = /**
     * Returns the index of the currently-focused step header.
     * @return {?}
     */
    function () {
        return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
    };
    /**
     * @param {?} newIndex
     * @return {?}
     */
    CdkStepper.prototype._updateSelectedItemIndex = /**
     * @param {?} newIndex
     * @return {?}
     */
    function (newIndex) {
        var /** @type {?} */ stepsArray = this._steps.toArray();
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this._selectedIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: stepsArray[this._selectedIndex],
        });
        this._keyManager.updateActiveItemIndex(newIndex);
        this._selectedIndex = newIndex;
        this._stateChanged();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CdkStepper.prototype._onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode;
        if (this._keyManager.activeItemIndex != null && (keyCode === keycodes.SPACE || keyCode === keycodes.ENTER)) {
            this.selectedIndex = this._keyManager.activeItemIndex;
            event.preventDefault();
        }
        else if (keyCode === keycodes.HOME) {
            this._keyManager.setFirstItemActive();
            event.preventDefault();
        }
        else if (keyCode === keycodes.END) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else {
            this._keyManager.onKeydown(event);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CdkStepper.prototype._anyControlsInvalidOrPending = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ steps = this._steps.toArray();
        steps[this._selectedIndex].interacted = true;
        if (this._linear && index >= 0) {
            return steps.slice(0, index).some(function (step) {
                var /** @type {?} */ control = step.stepControl;
                var /** @type {?} */ isIncomplete = control ?
                    (control.invalid || control.pending || !step.interacted) :
                    !step.completed;
                return isIncomplete && !step.optional;
            });
        }
        return false;
    };
    /**
     * @return {?}
     */
    CdkStepper.prototype._layoutDirection = /**
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    CdkStepper.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cdkStepper]',
                    exportAs: 'cdkStepper',
                },] },
    ];
    /** @nocollapse */
    CdkStepper.ctorParameters = function () { return [
        { type: bidi.Directionality, decorators: [{ type: core.Optional },] },
        { type: core.ChangeDetectorRef, },
    ]; };
    CdkStepper.propDecorators = {
        "_steps": [{ type: core.ContentChildren, args: [CdkStep,] },],
        "linear": [{ type: core.Input },],
        "selectedIndex": [{ type: core.Input },],
        "selected": [{ type: core.Input },],
        "selectionChange": [{ type: core.Output },],
    };
    return CdkStepper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Button that moves to the next step in a stepper workflow.
 */
var CdkStepperNext = /** @class */ (function () {
    function CdkStepperNext(_stepper) {
        this._stepper = _stepper;
        /**
         * Type of the next button. Defaults to "submit" if not specified.
         */
        this.type = 'submit';
    }
    CdkStepperNext.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[cdkStepperNext]',
                    host: {
                        '(click)': '_stepper.next()',
                        '[type]': 'type',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkStepperNext.ctorParameters = function () { return [
        { type: CdkStepper, },
    ]; };
    CdkStepperNext.propDecorators = {
        "type": [{ type: core.Input },],
    };
    return CdkStepperNext;
}());
/**
 * Button that moves to the previous step in a stepper workflow.
 */
var CdkStepperPrevious = /** @class */ (function () {
    function CdkStepperPrevious(_stepper) {
        this._stepper = _stepper;
        /**
         * Type of the previous button. Defaults to "button" if not specified.
         */
        this.type = 'button';
    }
    CdkStepperPrevious.decorators = [
        { type: core.Directive, args: [{
                    selector: 'button[cdkStepperPrevious]',
                    host: {
                        '(click)': '_stepper.previous()',
                        '[type]': 'type',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkStepperPrevious.ctorParameters = function () { return [
        { type: CdkStepper, },
    ]; };
    CdkStepperPrevious.propDecorators = {
        "type": [{ type: core.Input },],
    };
    return CdkStepperPrevious;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CdkStepperModule = /** @class */ (function () {
    function CdkStepperModule() {
    }
    CdkStepperModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [bidi.BidiModule, common.CommonModule],
                    exports: [CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
                    declarations: [CdkStep, CdkStepper, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
                },] },
    ];
    return CdkStepperModule;
}());

exports.StepperSelectionEvent = StepperSelectionEvent;
exports.CdkStep = CdkStep;
exports.CdkStepper = CdkStepper;
exports.CdkStepLabel = CdkStepLabel;
exports.CdkStepperNext = CdkStepperNext;
exports.CdkStepperPrevious = CdkStepperPrevious;
exports.CdkStepperModule = CdkStepperModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-stepper.umd.js.map
