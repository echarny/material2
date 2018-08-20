"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var keycodes_1 = require("@angular/cdk/keycodes");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var optgroup_1 = require("./optgroup");
/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueIdCounter = 0;
/** Event object emitted by MatOption when selected or deselected. */
var /** Event object emitted by MatOption when selected or deselected. */
MatOptionSelectionChange = /** @class */ (function () {
    function MatOptionSelectionChange(/** Reference to the option that emitted the event. */
    source, /** Whether the change in the option's value was a result of a user action. */
    isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.source = source;
        this.isUserInput = isUserInput;
    }
    return MatOptionSelectionChange;
}());
exports.MatOptionSelectionChange = MatOptionSelectionChange;
/**
 * Injection token used to provide the parent component to options.
 */
exports.MAT_OPTION_PARENT_COMPONENT = new core_1.InjectionToken('MAT_OPTION_PARENT_COMPONENT');
/**
 * Single option inside of a `<mat-select>` element.
 */
var MatOption = /** @class */ (function () {
    function MatOption(_element, _changeDetectorRef, _parent, group) {
        this._element = _element;
        this._changeDetectorRef = _changeDetectorRef;
        this._parent = _parent;
        this.group = group;
        this._selected = false;
        this._active = false;
        this._disabled = false;
        this._id = "mat-option-" + _uniqueIdCounter++;
        this._mostRecentViewValue = '';
        /** Event emitted when the option is selected or deselected. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onSelectionChange = new core_1.EventEmitter();
        /** Emits when the state of the option changes and any parents have to be notified. */
        this._stateChanges = new rxjs_1.Subject();
    }
    Object.defineProperty(MatOption.prototype, "multiple", {
        /** Whether the wrapping component is in multiple selection mode. */
        get: /** Whether the wrapping component is in multiple selection mode. */
        function () { return this._parent && this._parent.multiple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "id", {
        /** The unique ID of the option. */
        get: /** The unique ID of the option. */
        function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "selected", {
        /** Whether or not the option is currently selected. */
        get: /** Whether or not the option is currently selected. */
        function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "disabled", {
        get: /** Whether the option is disabled. */
        function () { return (this.group && this.group.disabled) || this._disabled; },
        set: function (value) { this._disabled = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "disableRipple", {
        /** Whether ripples for the option are disabled. */
        get: /** Whether ripples for the option are disabled. */
        function () { return this._parent && this._parent.disableRipple; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "active", {
        /**
         * Whether or not the option is currently active and ready to be selected.
         * An active option displays styles as if it is focused, but the
         * focus is actually retained somewhere else. This comes in handy
         * for components like autocomplete where focus must remain on the input.
         */
        get: /**
           * Whether or not the option is currently active and ready to be selected.
           * An active option displays styles as if it is focused, but the
           * focus is actually retained somewhere else. This comes in handy
           * for components like autocomplete where focus must remain on the input.
           */
        function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatOption.prototype, "viewValue", {
        /**
         * The displayed value of the option. It is necessary to show the selected option in the
         * select's trigger.
         */
        get: /**
           * The displayed value of the option. It is necessary to show the selected option in the
           * select's trigger.
           */
        function () {
            // TODO(kara): Add input property alternative for node envs.
            return (this._getHostElement().textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Selects the option. */
    /** Selects the option. */
    MatOption.prototype.select = /** Selects the option. */
    function () {
        if (!this._selected) {
            this._selected = true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent();
        }
    };
    /** Deselects the option. */
    /** Deselects the option. */
    MatOption.prototype.deselect = /** Deselects the option. */
    function () {
        if (this._selected) {
            this._selected = false;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent();
        }
    };
    /** Sets focus onto this option. */
    /** Sets focus onto this option. */
    MatOption.prototype.focus = /** Sets focus onto this option. */
    function () {
        var element = this._getHostElement();
        if (typeof element.focus === 'function') {
            element.focus();
        }
    };
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
       * This method sets display styles on the option to make it appear
       * active. This is used by the ActiveDescendantKeyManager so key
       * events will display the proper options as active on arrow key events.
       */
    MatOption.prototype.setActiveStyles = /**
       * This method sets display styles on the option to make it appear
       * active. This is used by the ActiveDescendantKeyManager so key
       * events will display the proper options as active on arrow key events.
       */
    function () {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    };
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    /**
       * This method removes display styles on the option that made it appear
       * active. This is used by the ActiveDescendantKeyManager so key
       * events will display the proper options as active on arrow key events.
       */
    MatOption.prototype.setInactiveStyles = /**
       * This method removes display styles on the option that made it appear
       * active. This is used by the ActiveDescendantKeyManager so key
       * events will display the proper options as active on arrow key events.
       */
    function () {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    };
    /** Gets the label to be used when determining whether the option should be focused. */
    /** Gets the label to be used when determining whether the option should be focused. */
    MatOption.prototype.getLabel = /** Gets the label to be used when determining whether the option should be focused. */
    function () {
        return this.viewValue;
    };
    /** Ensures the option is selected when activated from the keyboard. */
    /** Ensures the option is selected when activated from the keyboard. */
    MatOption.prototype._handleKeydown = /** Ensures the option is selected when activated from the keyboard. */
    function (event) {
        if (event.keyCode === keycodes_1.ENTER || event.keyCode === keycodes_1.SPACE) {
            this._selectViaInteraction();
            // Prevent the page from scrolling down and form submits.
            event.preventDefault();
        }
    };
    /**
     * `Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.`
     */
    /**
       * `Selects the option while indicating the selection came from the user. Used to
       * determine if the select's view -> model callback should be invoked.`
       */
    MatOption.prototype._selectViaInteraction = /**
       * `Selects the option while indicating the selection came from the user. Used to
       * determine if the select's view -> model callback should be invoked.`
       */
    function () {
        if (!this.disabled) {
            this._selected = this.multiple ? !this._selected : true;
            this._changeDetectorRef.markForCheck();
            this._emitSelectionChangeEvent(true);
        }
    };
    /** Returns the correct tabindex for the option depending on disabled state. */
    /** Returns the correct tabindex for the option depending on disabled state. */
    MatOption.prototype._getTabIndex = /** Returns the correct tabindex for the option depending on disabled state. */
    function () {
        return this.disabled ? '-1' : '0';
    };
    /** Gets the host DOM element. */
    /** Gets the host DOM element. */
    MatOption.prototype._getHostElement = /** Gets the host DOM element. */
    function () {
        return this._element.nativeElement;
    };
    MatOption.prototype.ngAfterViewChecked = function () {
        // Since parent components could be using the option's label to display the selected values
        // (e.g. `mat-select`) and they don't have a way of knowing if the option's label has changed
        // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
        // relatively cheap, however we still limit them only to selected options in order to avoid
        // hitting the DOM too often.
        if (this._selected) {
            var viewValue = this.viewValue;
            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    };
    MatOption.prototype.ngOnDestroy = function () {
        this._stateChanges.complete();
    };
    /** Emits the selection change event. */
    /** Emits the selection change event. */
    MatOption.prototype._emitSelectionChangeEvent = /** Emits the selection change event. */
    function (isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        this.onSelectionChange.emit(new MatOptionSelectionChange(this, isUserInput));
    };
    MatOption.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-option',
                    exportAs: 'matOption',
                    host: {
                        'role': 'option',
                        '[attr.tabindex]': '_getTabIndex()',
                        '[class.mat-selected]': 'selected',
                        '[class.mat-option-multiple]': 'multiple',
                        '[class.mat-active]': 'active',
                        '[id]': 'id',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.mat-option-disabled]': 'disabled',
                        '(click)': '_selectViaInteraction()',
                        '(keydown)': '_handleKeydown($event)',
                        'class': 'mat-option',
                    },
                    styles: [".mat-option{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;line-height:48px;height:48px;padding:0 16px;text-align:left;text-decoration:none;max-width:100%;position:relative;cursor:pointer;outline:0;display:flex;flex-direction:row;max-width:100%;box-sizing:border-box;align-items:center;-webkit-tap-highlight-color:transparent}.mat-option[disabled]{cursor:default}[dir=rtl] .mat-option{text-align:right}.mat-option .mat-icon{margin-right:16px;vertical-align:middle}.mat-option .mat-icon svg{vertical-align:top}[dir=rtl] .mat-option .mat-icon{margin-left:16px;margin-right:0}.mat-option[aria-disabled=true]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:32px}[dir=rtl] .mat-optgroup .mat-option:not(.mat-option-multiple){padding-left:16px;padding-right:32px}@media screen and (-ms-high-contrast:active){.mat-option{margin:0 1px}.mat-option.mat-active{border:solid 1px currentColor;margin:0}}.mat-option-text{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis}.mat-option .mat-option-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}@media screen and (-ms-high-contrast:active){.mat-option .mat-option-ripple{opacity:.5}}.mat-option-pseudo-checkbox{margin-right:8px}[dir=rtl] .mat-option-pseudo-checkbox{margin-left:8px;margin-right:0}"],
                    template: "<mat-pseudo-checkbox *ngIf=\"multiple\" class=\"mat-option-pseudo-checkbox\" [state]=\"selected ? 'checked' : ''\" [disabled]=\"disabled\"></mat-pseudo-checkbox><span class=\"mat-option-text\"><ng-content></ng-content></span><div class=\"mat-option-ripple\" mat-ripple [matRippleTrigger]=\"_getHostElement()\" [matRippleDisabled]=\"disabled || disableRipple\"></div>",
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatOption.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.MAT_OPTION_PARENT_COMPONENT,] },] },
        { type: optgroup_1.MatOptgroup, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatOption.propDecorators = {
        "value": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "onSelectionChange": [{ type: core_1.Output },],
    };
    return MatOption;
}());
exports.MatOption = MatOption;
/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
function _countGroupLabelsBeforeOption(optionIndex, options, optionGroups) {
    if (optionGroups.length) {
        var optionsArray = options.toArray();
        var groups = optionGroups.toArray();
        var groupCounter = 0;
        for (var i = 0; i < optionIndex + 1; i++) {
            if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
                groupCounter++;
            }
        }
        return groupCounter;
    }
    return 0;
}
exports._countGroupLabelsBeforeOption = _countGroupLabelsBeforeOption;
/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionIndex Index of the option to be scrolled into the view.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionIndex, optionHeight, currentScrollPosition, panelHeight) {
    var optionOffset = optionIndex * optionHeight;
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }
    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }
    return currentScrollPosition;
}
exports._getOptionScrollPosition = _getOptionScrollPosition;
//# sourceMappingURL=option.js.map