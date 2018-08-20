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
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var step_label_1 = require("./step-label");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/** Used to generate unique ID for each stepper component. */
var nextId = 0;
/** Change event emitted on selection changes. */
var /** Change event emitted on selection changes. */
StepperSelectionEvent = /** @class */ (function () {
    function StepperSelectionEvent() {
    }
    return StepperSelectionEvent;
}());
exports.StepperSelectionEvent = StepperSelectionEvent;
var CdkStep = /** @class */ (function () {
    function CdkStep(_stepper) {
        this._stepper = _stepper;
        /** Whether user has seen the expanded step content or not. */
        this.interacted = false;
        this._editable = true;
        this._optional = false;
        this._customCompleted = null;
    }
    Object.defineProperty(CdkStep.prototype, "editable", {
        get: /** Whether the user can return to this step once it has been marked as complted. */
        function () { return this._editable; },
        set: function (value) {
            this._editable = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "optional", {
        get: /** Whether the completion of step is optional. */
        function () { return this._optional; },
        set: function (value) {
            this._optional = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "completed", {
        get: /** Whether step is marked as completed. */
        function () {
            return this._customCompleted == null ? this._defaultCompleted : this._customCompleted;
        },
        set: function (value) {
            this._customCompleted = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStep.prototype, "_defaultCompleted", {
        get: function () {
            return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
        },
        enumerable: true,
        configurable: true
    });
    /** Selects this step component. */
    /** Selects this step component. */
    CdkStep.prototype.select = /** Selects this step component. */
    function () {
        this._stepper.selected = this;
    };
    /** Resets the step to its initial state. Note that this includes resetting form data. */
    /** Resets the step to its initial state. Note that this includes resetting form data. */
    CdkStep.prototype.reset = /** Resets the step to its initial state. Note that this includes resetting form data. */
    function () {
        this.interacted = false;
        if (this._customCompleted != null) {
            this._customCompleted = false;
        }
        if (this.stepControl) {
            this.stepControl.reset();
        }
    };
    CdkStep.prototype.ngOnChanges = function () {
        // Since basically all inputs of the MatStep get proxied through the view down to the
        // underlying MatStepHeader, we have to make sure that change detection runs correctly.
        this._stepper._stateChanged();
    };
    CdkStep.decorators = [
        { type: core_1.Component, args: [{selector: 'cdk-step',
                    exportAs: 'cdkStep',
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    CdkStep.ctorParameters = function () { return [
        { type: CdkStepper, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return CdkStepper; }),] },] },
    ]; };
    CdkStep.propDecorators = {
        "stepLabel": [{ type: core_1.ContentChild, args: [step_label_1.CdkStepLabel,] },],
        "content": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
        "stepControl": [{ type: core_1.Input },],
        "label": [{ type: core_1.Input },],
        "ariaLabel": [{ type: core_1.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core_1.Input, args: ['aria-labelledby',] },],
        "editable": [{ type: core_1.Input },],
        "optional": [{ type: core_1.Input },],
        "completed": [{ type: core_1.Input },],
    };
    return CdkStep;
}());
exports.CdkStep = CdkStep;
var CdkStepper = /** @class */ (function () {
    function CdkStepper(_dir, _changeDetectorRef) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        /** Emits when the component is destroyed. */
        this._destroyed = new rxjs_1.Subject();
        this._linear = false;
        this._selectedIndex = 0;
        /** Event emitted when the selected step has changed. */
        this.selectionChange = new core_1.EventEmitter();
        this._orientation = 'horizontal';
        this._groupId = nextId++;
    }
    Object.defineProperty(CdkStepper.prototype, "linear", {
        get: /** Whether the validity of previous steps should be checked or not. */
        function () { return this._linear; },
        set: function (value) { this._linear = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkStepper.prototype, "selectedIndex", {
        get: /** The index of the selected step. */
        function () { return this._selectedIndex; },
        set: function (index) {
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
        get: /** The step that is selected. */
        function () {
            // @breaking-change 7.0.0 Change return type to `CdkStep | undefined`.
            return this._steps ? this._steps.toArray()[this.selectedIndex] : undefined;
        },
        set: function (step) {
            this.selectedIndex = this._steps ? this._steps.toArray().indexOf(step) : -1;
        },
        enumerable: true,
        configurable: true
    });
    CdkStepper.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._keyManager = new a11y_1.FocusKeyManager(this._stepHeader)
            .withWrap()
            .withVerticalOrientation(this._orientation === 'vertical');
        (this._dir ? this._dir.change : rxjs_1.of())
            .pipe(operators_1.startWith(this._layoutDirection()), operators_1.takeUntil(this._destroyed))
            .subscribe(function (direction) { return _this._keyManager.withHorizontalOrientation(direction); });
        this._keyManager.updateActiveItemIndex(this._selectedIndex);
    };
    CdkStepper.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Selects and focuses the next step in list. */
    /** Selects and focuses the next step in list. */
    CdkStepper.prototype.next = /** Selects and focuses the next step in list. */
    function () {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this._steps.length - 1);
    };
    /** Selects and focuses the previous step in list. */
    /** Selects and focuses the previous step in list. */
    CdkStepper.prototype.previous = /** Selects and focuses the previous step in list. */
    function () {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    };
    /** Resets the stepper to its initial state. Note that this includes clearing form data. */
    /** Resets the stepper to its initial state. Note that this includes clearing form data. */
    CdkStepper.prototype.reset = /** Resets the stepper to its initial state. Note that this includes clearing form data. */
    function () {
        this._updateSelectedItemIndex(0);
        this._steps.forEach(function (step) { return step.reset(); });
        this._stateChanged();
    };
    /** Returns a unique id for each step label element. */
    /** Returns a unique id for each step label element. */
    CdkStepper.prototype._getStepLabelId = /** Returns a unique id for each step label element. */
    function (i) {
        return "cdk-step-label-" + this._groupId + "-" + i;
    };
    /** Returns unique id for each step content element. */
    /** Returns unique id for each step content element. */
    CdkStepper.prototype._getStepContentId = /** Returns unique id for each step content element. */
    function (i) {
        return "cdk-step-content-" + this._groupId + "-" + i;
    };
    /** Marks the component to be change detected. */
    /** Marks the component to be change detected. */
    CdkStepper.prototype._stateChanged = /** Marks the component to be change detected. */
    function () {
        this._changeDetectorRef.markForCheck();
    };
    /** Returns position state of the step with the given index. */
    /** Returns position state of the step with the given index. */
    CdkStepper.prototype._getAnimationDirection = /** Returns position state of the step with the given index. */
    function (index) {
        var position = index - this._selectedIndex;
        if (position < 0) {
            return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
        }
        else if (position > 0) {
            return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
        }
        return 'current';
    };
    /** Returns the type of icon to be displayed. */
    /** Returns the type of icon to be displayed. */
    CdkStepper.prototype._getIndicatorType = /** Returns the type of icon to be displayed. */
    function (index) {
        var step = this._steps.toArray()[index];
        if (!step.completed || this._selectedIndex == index) {
            return 'number';
        }
        else {
            return step.editable ? 'edit' : 'done';
        }
    };
    /** Returns the index of the currently-focused step header. */
    /** Returns the index of the currently-focused step header. */
    CdkStepper.prototype._getFocusIndex = /** Returns the index of the currently-focused step header. */
    function () {
        return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
    };
    CdkStepper.prototype._updateSelectedItemIndex = function (newIndex) {
        var stepsArray = this._steps.toArray();
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
    CdkStepper.prototype._onKeydown = function (event) {
        var keyCode = event.keyCode;
        if (this._keyManager.activeItemIndex != null && (keyCode === keycodes_1.SPACE || keyCode === keycodes_1.ENTER)) {
            this.selectedIndex = this._keyManager.activeItemIndex;
            event.preventDefault();
        }
        else if (keyCode === keycodes_1.HOME) {
            this._keyManager.setFirstItemActive();
            event.preventDefault();
        }
        else if (keyCode === keycodes_1.END) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else {
            this._keyManager.onKeydown(event);
        }
    };
    CdkStepper.prototype._anyControlsInvalidOrPending = function (index) {
        var steps = this._steps.toArray();
        steps[this._selectedIndex].interacted = true;
        if (this._linear && index >= 0) {
            return steps.slice(0, index).some(function (step) {
                var control = step.stepControl;
                var isIncomplete = control ?
                    (control.invalid || control.pending || !step.interacted) :
                    !step.completed;
                return isIncomplete && !step.optional;
            });
        }
        return false;
    };
    CdkStepper.prototype._layoutDirection = function () {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    };
    CdkStepper.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkStepper]',
                    exportAs: 'cdkStepper',
                },] },
    ];
    /** @nocollapse */
    CdkStepper.ctorParameters = function () { return [
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    CdkStepper.propDecorators = {
        "_steps": [{ type: core_1.ContentChildren, args: [CdkStep,] },],
        "linear": [{ type: core_1.Input },],
        "selectedIndex": [{ type: core_1.Input },],
        "selected": [{ type: core_1.Input },],
        "selectionChange": [{ type: core_1.Output },],
    };
    return CdkStepper;
}());
exports.CdkStepper = CdkStepper;
//# sourceMappingURL=stepper.js.map