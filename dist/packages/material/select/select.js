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
var a11y_1 = require("@angular/cdk/a11y");
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var collections_1 = require("@angular/cdk/collections");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var select_animations_1 = require("./select-animations");
var select_errors_1 = require("./select-errors");
var nextUniqueId = 0;
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The max height of the select's overlay panel */
exports.SELECT_PANEL_MAX_HEIGHT = 256;
/** The panel's padding on the x-axis */
exports.SELECT_PANEL_PADDING_X = 16;
/** The panel's x axis padding if it is indented (e.g. there is an option group). */
exports.SELECT_PANEL_INDENT_PADDING_X = exports.SELECT_PANEL_PADDING_X * 2;
/** The height of the select items in `em` units. */
exports.SELECT_ITEM_HEIGHT_EM = 3;
/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PANEL_PADDING_X * 1.5) + 20 = 44
 * The padding is multiplied by 1.5 because the checkbox's margin is half the padding.
 * The checkbox width is 20px.
 */
exports.SELECT_MULTIPLE_PANEL_PADDING_X = exports.SELECT_PANEL_PADDING_X * 1.5 + 20;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
exports.SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Injection token that determines the scroll handling while a select is open. */
exports.MAT_SELECT_SCROLL_STRATEGY = new core_1.InjectionToken('mat-select-scroll-strategy');
/** @docs-private */
function MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
exports.MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY = MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY;
/** @docs-private */
exports.MAT_SELECT_SCROLL_STRATEGY_PROVIDER = {
    provide: exports.MAT_SELECT_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/** Change event object that is emitted when the select value has changed. */
var /** Change event object that is emitted when the select value has changed. */
MatSelectChange = /** @class */ (function () {
    function MatSelectChange(/** Reference to the select that emitted the change event. */
    source, /** Current value of the select that emitted the event. */
    value) {
        this.source = source;
        this.value = value;
    }
    return MatSelectChange;
}());
exports.MatSelectChange = MatSelectChange;
// Boilerplate for applying mixins to MatSelect.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatSelect.
/** @docs-private */
MatSelectBase = /** @class */ (function () {
    function MatSelectBase(_elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._elementRef = _elementRef;
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return MatSelectBase;
}());
exports.MatSelectBase = MatSelectBase;
exports._MatSelectMixinBase = core_2.mixinDisableRipple(core_2.mixinTabIndex(core_2.mixinDisabled(core_2.mixinErrorState(MatSelectBase))));
/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 */
var MatSelectTrigger = /** @class */ (function () {
    function MatSelectTrigger() {
    }
    MatSelectTrigger.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-select-trigger'
                },] },
    ];
    return MatSelectTrigger;
}());
exports.MatSelectTrigger = MatSelectTrigger;
var MatSelect = /** @class */ (function (_super) {
    __extends(MatSelect, _super);
    function MatSelect(_viewportRuler, _changeDetectorRef, _ngZone, _defaultErrorStateMatcher, elementRef, _dir, _parentForm, _parentFormGroup, _parentFormField, ngControl, tabIndex, _scrollStrategyFactory) {
        var _this = _super.call(this, elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._viewportRuler = _viewportRuler;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._ngZone = _ngZone;
        _this._dir = _dir;
        _this._parentFormField = _parentFormField;
        _this.ngControl = ngControl;
        _this._scrollStrategyFactory = _scrollStrategyFactory;
        /** Whether or not the overlay panel is open. */
        _this._panelOpen = false;
        /** Whether filling out the select is required in the form. */
        _this._required = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        _this._scrollTop = 0;
        /** Whether the component is in multiple selection mode. */
        _this._multiple = false;
        /** Comparison function to specify which option is displayed. Defaults to object equality. */
        _this._compareWith = function (o1, o2) { return o1 === o2; };
        /** Unique id for this input. */
        _this._uid = "mat-select-" + nextUniqueId++;
        /** Emits whenever the component is destroyed. */
        _this._destroy = new rxjs_1.Subject();
        /** The cached font-size of the trigger element. */
        _this._triggerFontSize = 0;
        /** `View -> model callback called when value changes` */
        _this._onChange = function () { };
        /** `View -> model callback called when select has been touched` */
        _this._onTouched = function () { };
        /** The IDs of child options to be passed to the aria-owns attribute. */
        _this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        _this._transformOrigin = 'top';
        /** Whether the panel's animation is done. */
        _this._panelDoneAnimating = false;
        /** Emits when the panel element is finished transforming in. */
        _this._panelDoneAnimatingStream = new rxjs_1.Subject();
        /** Strategy that will be used to handle scrolling while the select panel is open. */
        _this._scrollStrategy = _this._scrollStrategyFactory();
        /**
           * The y-offset of the overlay panel in relation to the trigger's top start corner.
           * This must be adjusted to align the selected option text over the trigger text.
           * when the panel opens. Will change based on the y-position of the selected option.
           */
        _this._offsetY = 0;
        /**
           * This position config ensures that the top "start" corner of the overlay
           * is aligned with with the top "start" of the origin by default (overlapping
           * the trigger completely). If the panel cannot fit below the trigger, it
           * will fall back to a position above the trigger.
           */
        _this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        /** Whether the component is disabling centering of the active option over the trigger. */
        _this._disableOptionCentering = false;
        _this._focused = false;
        /** A name for this control that can be used by `mat-form-field`. */
        _this.controlType = 'mat-select';
        /** Aria label of the select. If not specified, the placeholder will be used as label. */
        _this.ariaLabel = '';
        /** Combined stream of all of the child options' change events. */
        _this.optionSelectionChanges = rxjs_1.defer(function () {
            if (_this.options) {
                return rxjs_1.merge.apply(void 0, _this.options.map(function (option) { return option.onSelectionChange; }));
            }
            return _this._ngZone.onStable
                .asObservable()
                .pipe(operators_1.take(1), operators_1.switchMap(function () { return _this.optionSelectionChanges; }));
        });
        /** Event emitted when the select panel has been toggled. */
        _this.openedChange = new core_1.EventEmitter();
        /** Event emitted when the select has been opened. */
        _this._openedStream = _this.openedChange.pipe(operators_1.filter(function (o) { return o; }), operators_1.map(function () { }));
        /** Event emitted when the select has been closed. */
        _this._closedStream = _this.openedChange.pipe(operators_1.filter(function (o) { return !o; }), operators_1.map(function () { }));
        /** Event emitted when the selected value has been changed by the user. */
        _this.selectionChange = new core_1.EventEmitter();
        /**
           * Event that emits whenever the raw value of the select changes. This is here primarily
           * to facilitate the two-way binding for the `value` input.
           * @docs-private
           */
        _this.valueChange = new core_1.EventEmitter();
        if (_this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            _this.ngControl.valueAccessor = _this;
        }
        _this.tabIndex = parseInt(tabIndex) || 0;
        // Force setter to be called in case id was not specified.
        // Force setter to be called in case id was not specified.
        _this.id = _this.id;
        return _this;
    }
    Object.defineProperty(MatSelect.prototype, "focused", {
        /** Whether the select is focused. */
        get: /** Whether the select is focused. */
        function () {
            return this._focused || this._panelOpen;
        },
        /**
         * @deprecated Setter to be removed as this property is intended to be readonly.
         * @breaking-change 8.0.0
         */
        set: /**
           * @deprecated Setter to be removed as this property is intended to be readonly.
           * @breaking-change 8.0.0
           */
        function (value) {
            this._focused = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "placeholder", {
        get: /** Placeholder to be shown if no value has been selected. */
        function () { return this._placeholder; },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "required", {
        get: /** Whether the component is required. */
        function () { return this._required; },
        set: function (value) {
            this._required = coercion_1.coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "multiple", {
        get: /** Whether the user should be allowed to select multiple options. */
        function () { return this._multiple; },
        set: function (value) {
            if (this._selectionModel) {
                throw select_errors_1.getMatSelectDynamicMultipleError();
            }
            this._multiple = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "disableOptionCentering", {
        get: /** Whether to center the active option over the trigger. */
        function () { return this._disableOptionCentering; },
        set: function (value) {
            this._disableOptionCentering = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "compareWith", {
        get: /**
           * Function to compare the option values with the selected values. The first argument
           * is a value from an option. The second is a value from the selection. A boolean
           * should be returned.
           */
        function () { return this._compareWith; },
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw select_errors_1.getMatSelectNonFunctionValueError();
            }
            this._compareWith = fn;
            if (this._selectionModel) {
                // A different comparator means the selection could change.
                this._initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "value", {
        get: /** Value of the select control. */
        function () { return this._value; },
        set: function (newValue) {
            if (newValue !== this._value) {
                this.writeValue(newValue);
                this._value = newValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "id", {
        get: /** Unique id of the element. */
        function () { return this._id; },
        set: function (value) {
            this._id = value || this._uid;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    MatSelect.prototype.ngOnInit = function () {
        var _this = this;
        this._selectionModel = new collections_1.SelectionModel(this.multiple);
        this.stateChanges.next();
        // We need `distinctUntilChanged` here, because some browsers will
        // fire the animation end event twice for the same animation. See:
        // https://github.com/angular/angular/issues/24084
        this._panelDoneAnimatingStream
            .pipe(operators_1.distinctUntilChanged(), operators_1.takeUntil(this._destroy))
            .subscribe(function () {
            if (_this.panelOpen) {
                _this._scrollTop = 0;
                _this.openedChange.emit(true);
            }
            else {
                _this.openedChange.emit(false);
                _this._panelDoneAnimating = false;
                _this.overlayDir.offsetX = 0;
                _this._changeDetectorRef.markForCheck();
            }
        });
    };
    MatSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._selectionModel.onChange.pipe(operators_1.takeUntil(this._destroy)).subscribe(function (event) {
            event.added.forEach(function (option) { return option.select(); });
            event.removed.forEach(function (option) { return option.deselect(); });
        });
        this.options.changes.pipe(operators_1.startWith(null), operators_1.takeUntil(this._destroy)).subscribe(function () {
            _this._resetOptions();
            _this._initializeSelection();
        });
    };
    MatSelect.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    MatSelect.prototype.ngOnChanges = function (changes) {
        // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
        // the parent form field know to run change detection when the disabled state changes.
        if (changes.disabled) {
            this.stateChanges.next();
        }
    };
    MatSelect.prototype.ngOnDestroy = function () {
        this._destroy.next();
        this._destroy.complete();
        this.stateChanges.complete();
    };
    /** Toggles the overlay panel open or closed. */
    /** Toggles the overlay panel open or closed. */
    MatSelect.prototype.toggle = /** Toggles the overlay panel open or closed. */
    function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    /** Opens the overlay panel. */
    MatSelect.prototype.open = /** Opens the overlay panel. */
    function () {
        var _this = this;
        if (this.disabled || !this.options || !this.options.length || this._panelOpen) {
            return;
        }
        this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
        // Note: The computed font-size will be a string pixel value (e.g. "16px").
        // `parseInt` ignores the trailing 'px' and converts this to a number.
        this._triggerFontSize = parseInt(getComputedStyle(this.trigger.nativeElement)['font-size']);
        this._panelOpen = true;
        this._keyManager.withHorizontalOrientation(null);
        this._calculateOverlayPosition();
        this._highlightCorrectOption();
        this._changeDetectorRef.markForCheck();
        // Set the font size on the panel element once it exists.
        this._ngZone.onStable.asObservable().pipe(operators_1.take(1)).subscribe(function () {
            if (_this._triggerFontSize && _this.overlayDir.overlayRef &&
                _this.overlayDir.overlayRef.overlayElement) {
                _this.overlayDir.overlayRef.overlayElement.style.fontSize = _this._triggerFontSize + "px";
            }
        });
    };
    /** Closes the overlay panel and focuses the host element. */
    /** Closes the overlay panel and focuses the host element. */
    MatSelect.prototype.close = /** Closes the overlay panel and focuses the host element. */
    function () {
        if (this._panelOpen) {
            this._panelOpen = false;
            this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
            this._changeDetectorRef.markForCheck();
            this._onTouched();
        }
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    /**
       * Sets the select's value. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param value New value to be written to the model.
       */
    MatSelect.prototype.writeValue = /**
       * Sets the select's value. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param value New value to be written to the model.
       */
    function (value) {
        if (this.options) {
            this._setSelectionByValue(value);
        }
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    /**
       * Saves a callback function to be invoked when the select's value
       * changes from user input. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param fn Callback to be triggered when the value changes.
       */
    MatSelect.prototype.registerOnChange = /**
       * Saves a callback function to be invoked when the select's value
       * changes from user input. Part of the ControlValueAccessor interface
       * required to integrate with Angular's core forms API.
       *
       * @param fn Callback to be triggered when the value changes.
       */
    function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    /**
       * Saves a callback function to be invoked when the select is blurred
       * by the user. Part of the ControlValueAccessor interface required
       * to integrate with Angular's core forms API.
       *
       * @param fn Callback to be triggered when the component has been touched.
       */
    MatSelect.prototype.registerOnTouched = /**
       * Saves a callback function to be invoked when the select is blurred
       * by the user. Part of the ControlValueAccessor interface required
       * to integrate with Angular's core forms API.
       *
       * @param fn Callback to be triggered when the component has been touched.
       */
    function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    /**
       * Disables the select. Part of the ControlValueAccessor interface required
       * to integrate with Angular's core forms API.
       *
       * @param isDisabled Sets whether the component is disabled.
       */
    MatSelect.prototype.setDisabledState = /**
       * Disables the select. Part of the ControlValueAccessor interface required
       * to integrate with Angular's core forms API.
       *
       * @param isDisabled Sets whether the component is disabled.
       */
    function (isDisabled) {
        this.disabled = isDisabled;
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    Object.defineProperty(MatSelect.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: /** Whether or not the overlay panel is open. */
        function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "selected", {
        /** The currently selected option. */
        get: /** The currently selected option. */
        function () {
            return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSelect.prototype, "triggerValue", {
        /** The value displayed in the trigger. */
        get: /** The value displayed in the trigger. */
        function () {
            if (this.empty) {
                return '';
            }
            if (this._multiple) {
                var selectedOptions = this._selectionModel.selected.map(function (option) { return option.viewValue; });
                if (this._isRtl()) {
                    selectedOptions.reverse();
                }
                // TODO(crisbeto): delimiter should be configurable for proper localization.
                return selectedOptions.join(', ');
            }
            return this._selectionModel.selected[0].viewValue;
        },
        enumerable: true,
        configurable: true
    });
    /** Whether the element is in RTL mode. */
    /** Whether the element is in RTL mode. */
    MatSelect.prototype._isRtl = /** Whether the element is in RTL mode. */
    function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /** Handles all keydown events on the select. */
    /** Handles all keydown events on the select. */
    MatSelect.prototype._handleKeydown = /** Handles all keydown events on the select. */
    function (event) {
        if (!this.disabled) {
            this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
        }
    };
    /** Handles keyboard events while the select is closed. */
    /** Handles keyboard events while the select is closed. */
    MatSelect.prototype._handleClosedKeydown = /** Handles keyboard events while the select is closed. */
    function (event) {
        var keyCode = event.keyCode;
        var isArrowKey = keyCode === keycodes_1.DOWN_ARROW || keyCode === keycodes_1.UP_ARROW ||
            keyCode === keycodes_1.LEFT_ARROW || keyCode === keycodes_1.RIGHT_ARROW;
        var isOpenKey = keyCode === keycodes_1.ENTER || keyCode === keycodes_1.SPACE;
        // Open the select on ALT + arrow key to match the native <select>
        if (isOpenKey || ((this.multiple || event.altKey) && isArrowKey)) {
            event.preventDefault(); // prevents the page from scrolling down when pressing space
            this.open();
        }
        else if (!this.multiple) {
            this._keyManager.onKeydown(event);
        }
    };
    /** Handles keyboard events when the selected is open. */
    /** Handles keyboard events when the selected is open. */
    MatSelect.prototype._handleOpenKeydown = /** Handles keyboard events when the selected is open. */
    function (event) {
        var keyCode = event.keyCode;
        var isArrowKey = keyCode === keycodes_1.DOWN_ARROW || keyCode === keycodes_1.UP_ARROW;
        var manager = this._keyManager;
        if (keyCode === keycodes_1.HOME || keyCode === keycodes_1.END) {
            event.preventDefault();
            keyCode === keycodes_1.HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
        }
        else if (isArrowKey && event.altKey) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this.close();
        }
        else if ((keyCode === keycodes_1.ENTER || keyCode === keycodes_1.SPACE) && manager.activeItem) {
            event.preventDefault();
            manager.activeItem._selectViaInteraction();
        }
        else if (this._multiple && keyCode === keycodes_1.A && event.ctrlKey) {
            event.preventDefault();
            var hasDeselectedOptions_1 = this.options.some(function (option) { return !option.selected; });
            this.options.forEach(function (option) { return hasDeselectedOptions_1 ? option.select() : option.deselect(); });
        }
        else {
            var previouslyFocusedIndex = manager.activeItemIndex;
            manager.onKeydown(event);
            if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
                manager.activeItemIndex !== previouslyFocusedIndex) {
                manager.activeItem._selectViaInteraction();
            }
        }
    };
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    /**
       * When the panel content is done fading in, the _panelDoneAnimating property is
       * set so the proper class can be added to the panel.
       */
    MatSelect.prototype._onFadeInDone = /**
       * When the panel content is done fading in, the _panelDoneAnimating property is
       * set so the proper class can be added to the panel.
       */
    function () {
        this._panelDoneAnimating = this.panelOpen;
        this._changeDetectorRef.markForCheck();
    };
    MatSelect.prototype._onFocus = function () {
        if (!this.disabled) {
            this._focused = true;
            this.stateChanges.next();
        }
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    /**
       * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
       * "blur" to the panel when it opens, causing a false positive.
       */
    MatSelect.prototype._onBlur = /**
       * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
       * "blur" to the panel when it opens, causing a false positive.
       */
    function () {
        this._focused = false;
        if (!this.disabled && !this.panelOpen) {
            this._onTouched();
            this._changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }
    };
    /**
     * Callback that is invoked when the overlay panel has been attached.
     */
    /**
       * Callback that is invoked when the overlay panel has been attached.
       */
    MatSelect.prototype._onAttached = /**
       * Callback that is invoked when the overlay panel has been attached.
       */
    function () {
        var _this = this;
        this.overlayDir.positionChange.pipe(operators_1.take(1)).subscribe(function () {
            _this._changeDetectorRef.detectChanges();
            _this._calculateOverlayOffsetX();
            _this.panel.nativeElement.scrollTop = _this._scrollTop;
        });
    };
    /** Returns the theme to be used on the panel. */
    /** Returns the theme to be used on the panel. */
    MatSelect.prototype._getPanelTheme = /** Returns the theme to be used on the panel. */
    function () {
        return this._parentFormField ? "mat-" + this._parentFormField.color : '';
    };
    Object.defineProperty(MatSelect.prototype, "empty", {
        /** Whether the select has a value. */
        get: /** Whether the select has a value. */
        function () {
            return !this._selectionModel || this._selectionModel.isEmpty();
        },
        enumerable: true,
        configurable: true
    });
    MatSelect.prototype._initializeSelection = function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value);
        });
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    /**
       * Sets the selected option based on a value. If no option can be
       * found with the designated value, the select trigger is cleared.
       */
    MatSelect.prototype._setSelectionByValue = /**
       * Sets the selected option based on a value. If no option can be
       * found with the designated value, the select trigger is cleared.
       */
    function (value) {
        var _this = this;
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw select_errors_1.getMatSelectNonArrayValueError();
            }
            this._selectionModel.clear();
            value.forEach(function (currentValue) { return _this._selectValue(currentValue); });
            this._sortValues();
        }
        else {
            this._selectionModel.clear();
            var correspondingOption = this._selectValue(value);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(correspondingOption);
            }
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    /**
       * Finds and selects and option based on its value.
       * @returns Option that has the corresponding value.
       */
    MatSelect.prototype._selectValue = /**
       * Finds and selects and option based on its value.
       * @returns Option that has the corresponding value.
       */
    function (value) {
        var _this = this;
        var correspondingOption = this.options.find(function (option) {
            try {
                // Treat null as a special reset value.
                return option.value != null && _this._compareWith(option.value, value);
            }
            catch (error) {
                if (core_1.isDevMode()) {
                    // Notify developers of errors in their comparator.
                    console.warn(error);
                }
                return false;
            }
        });
        if (correspondingOption) {
            this._selectionModel.select(correspondingOption);
        }
        return correspondingOption;
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    MatSelect.prototype._initKeyManager = /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    function () {
        var _this = this;
        this._keyManager = new a11y_1.ActiveDescendantKeyManager(this.options)
            .withTypeAhead()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
        this._keyManager.tabOut.pipe(operators_1.takeUntil(this._destroy)).subscribe(function () {
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            // Restore focus to the trigger before closing. Ensures that the focus
            // position won't be lost if the user got focus into the overlay.
            _this.focus();
            _this.close();
        });
        this._keyManager.change.pipe(operators_1.takeUntil(this._destroy)).subscribe(function () {
            if (_this._panelOpen && _this.panel) {
                _this._scrollActiveOptionIntoView();
            }
            else if (!_this._panelOpen && !_this.multiple && _this._keyManager.activeItem) {
                _this._keyManager.activeItem._selectViaInteraction();
            }
        });
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    /** Drops current option subscriptions and IDs and resets from scratch. */
    MatSelect.prototype._resetOptions = /** Drops current option subscriptions and IDs and resets from scratch. */
    function () {
        var _this = this;
        var changedOrDestroyed = rxjs_1.merge(this.options.changes, this._destroy);
        this.optionSelectionChanges.pipe(operators_1.takeUntil(changedOrDestroyed)).subscribe(function (event) {
            _this._onSelect(event.source, event.isUserInput);
            if (event.isUserInput && !_this.multiple && _this._panelOpen) {
                _this.close();
                _this.focus();
            }
        });
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        // Listen to changes in the internal state of the options and react accordingly.
        // Handles cases like the labels of the selected options changing.
        rxjs_1.merge.apply(void 0, this.options.map(function (option) { return option._stateChanges; })).pipe(operators_1.takeUntil(changedOrDestroyed))
            .subscribe(function () {
            _this._changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        });
        this._setOptionIds();
    };
    /** Invoked when an option is clicked. */
    /** Invoked when an option is clicked. */
    MatSelect.prototype._onSelect = /** Invoked when an option is clicked. */
    function (option, isUserInput) {
        var wasSelected = this._selectionModel.isSelected(option);
        if (option.value == null && !this._multiple) {
            option.deselect();
            this._selectionModel.clear();
            this._propagateChanges(option.value);
        }
        else {
            option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
            if (isUserInput) {
                this._keyManager.setActiveItem(option);
            }
            if (this.multiple) {
                this._sortValues();
                if (isUserInput) {
                    // In case the user selected the option with their mouse, we
                    // want to restore focus back to the trigger, in order to
                    // prevent the select keyboard controls from clashing with
                    // the ones from `mat-option`.
                    this.focus();
                }
            }
        }
        if (wasSelected !== this._selectionModel.isSelected(option)) {
            this._propagateChanges();
        }
        this.stateChanges.next();
    };
    /** Sorts the selected values in the selected based on their order in the panel. */
    /** Sorts the selected values in the selected based on their order in the panel. */
    MatSelect.prototype._sortValues = /** Sorts the selected values in the selected based on their order in the panel. */
    function () {
        var _this = this;
        if (this.multiple) {
            var options_1 = this.options.toArray();
            this._selectionModel.sort(function (a, b) {
                return _this.sortComparator ? _this.sortComparator(a, b, options_1) :
                    options_1.indexOf(a) - options_1.indexOf(b);
            });
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    /** Emits change event to set the model value. */
    MatSelect.prototype._propagateChanges = /** Emits change event to set the model value. */
    function (fallbackValue) {
        var valueToEmit = null;
        if (this.multiple) {
            valueToEmit = this.selected.map(function (option) { return option.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this.selectionChange.emit(new MatSelectChange(this, valueToEmit));
        this._changeDetectorRef.markForCheck();
    };
    /** Records option IDs to pass to the aria-owns property. */
    /** Records option IDs to pass to the aria-owns property. */
    MatSelect.prototype._setOptionIds = /** Records option IDs to pass to the aria-owns property. */
    function () {
        this._optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /**
     * Highlights the selected item. If no option is selected, it will highlight
     * the first item instead.
     */
    /**
       * Highlights the selected item. If no option is selected, it will highlight
       * the first item instead.
       */
    MatSelect.prototype._highlightCorrectOption = /**
       * Highlights the selected item. If no option is selected, it will highlight
       * the first item instead.
       */
    function () {
        if (this._keyManager) {
            if (this.empty) {
                this._keyManager.setFirstItemActive();
            }
            else {
                this._keyManager.setActiveItem(this._selectionModel.selected[0]);
            }
        }
    };
    /** Scrolls the active option into view. */
    /** Scrolls the active option into view. */
    MatSelect.prototype._scrollActiveOptionIntoView = /** Scrolls the active option into view. */
    function () {
        var activeOptionIndex = this._keyManager.activeItemIndex || 0;
        var labelCount = core_2._countGroupLabelsBeforeOption(activeOptionIndex, this.options, this.optionGroups);
        this.panel.nativeElement.scrollTop = core_2._getOptionScrollPosition(activeOptionIndex + labelCount, this._getItemHeight(), this.panel.nativeElement.scrollTop, exports.SELECT_PANEL_MAX_HEIGHT);
    };
    /** Focuses the select element. */
    /** Focuses the select element. */
    MatSelect.prototype.focus = /** Focuses the select element. */
    function () {
        this._elementRef.nativeElement.focus();
    };
    /** Gets the index of the provided option in the option list. */
    /** Gets the index of the provided option in the option list. */
    MatSelect.prototype._getOptionIndex = /** Gets the index of the provided option in the option list. */
    function (option) {
        return this.options.reduce(function (result, current, index) {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    MatSelect.prototype._calculateOverlayPosition = /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    function () {
        var itemHeight = this._getItemHeight();
        var items = this._getItemCount();
        var panelHeight = Math.min(items * itemHeight, exports.SELECT_PANEL_MAX_HEIGHT);
        var scrollContainerHeight = items * itemHeight;
        // The farthest the panel can be scrolled before it hits the bottom
        var maxScroll = scrollContainerHeight - panelHeight;
        // If no value is selected we open the popup to the first item.
        var selectedOptionOffset = this.empty ? 0 : this._getOptionIndex(this._selectionModel.selected[0]);
        selectedOptionOffset += core_2._countGroupLabelsBeforeOption(selectedOptionOffset, this.options, this.optionGroups);
        // We must maintain a scroll buffer so the selected option will be scrolled to the
        // center of the overlay panel rather than the top.
        var scrollBuffer = panelHeight / 2;
        this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
        this._offsetY = this._calculateOverlayOffsetY(selectedOptionOffset, scrollBuffer, maxScroll);
        this._checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    /**
       * Calculates the scroll position of the select's overlay panel.
       *
       * Attempts to center the selected option in the panel. If the option is
       * too high or too low in the panel to be scrolled to the center, it clamps the
       * scroll position to the min or max scroll positions respectively.
       */
    MatSelect.prototype._calculateOverlayScroll = /**
       * Calculates the scroll position of the select's overlay panel.
       *
       * Attempts to center the selected option in the panel. If the option is
       * too high or too low in the panel to be scrolled to the center, it clamps the
       * scroll position to the min or max scroll positions respectively.
       */
    function (selectedIndex, scrollBuffer, maxScroll) {
        var itemHeight = this._getItemHeight();
        var optionOffsetFromScrollTop = itemHeight * selectedIndex;
        var halfOptionHeight = itemHeight / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
    };
    /** Returns the aria-label of the select component. */
    /** Returns the aria-label of the select component. */
    MatSelect.prototype._getAriaLabel = /** Returns the aria-label of the select component. */
    function () {
        // If an ariaLabelledby value has been set by the consumer, the select should not overwrite the
        // `aria-labelledby` value by setting the ariaLabel to the placeholder.
        return this.ariaLabelledby ? null : this.ariaLabel || this.placeholder;
    };
    /** Returns the aria-labelledby of the select component. */
    /** Returns the aria-labelledby of the select component. */
    MatSelect.prototype._getAriaLabelledby = /** Returns the aria-labelledby of the select component. */
    function () {
        if (this.ariaLabelledby) {
            return this.ariaLabelledby;
        }
        // Note: we use `_getAriaLabel` here, because we want to check whether there's a
        // computed label. `this.ariaLabel` is only the user-specified label.
        if (!this._parentFormField || this._getAriaLabel()) {
            return null;
        }
        return this._parentFormField._labelId || null;
    };
    /** Determines the `aria-activedescendant` to be set on the host. */
    /** Determines the `aria-activedescendant` to be set on the host. */
    MatSelect.prototype._getAriaActiveDescendant = /** Determines the `aria-activedescendant` to be set on the host. */
    function () {
        if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
            return this._keyManager.activeItem.id;
        }
        return null;
    };
    /**
     * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
     * can't be calculated until the panel has been attached, because we need to know the
     * content width in order to constrain the panel within the viewport.
     */
    /**
       * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
       * This must be adjusted to align the selected option text over the trigger text when
       * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
       * can't be calculated until the panel has been attached, because we need to know the
       * content width in order to constrain the panel within the viewport.
       */
    MatSelect.prototype._calculateOverlayOffsetX = /**
       * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
       * This must be adjusted to align the selected option text over the trigger text when
       * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
       * can't be calculated until the panel has been attached, because we need to know the
       * content width in order to constrain the panel within the viewport.
       */
    function () {
        var overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
        var viewportSize = this._viewportRuler.getViewportSize();
        var isRtl = this._isRtl();
        var paddingWidth = this.multiple ? exports.SELECT_MULTIPLE_PANEL_PADDING_X + exports.SELECT_PANEL_PADDING_X :
            exports.SELECT_PANEL_PADDING_X * 2;
        var offsetX;
        // Adjust the offset, depending on the option padding.
        if (this.multiple) {
            offsetX = exports.SELECT_MULTIPLE_PANEL_PADDING_X;
        }
        else {
            var selected = this._selectionModel.selected[0] || this.options.first;
            offsetX = selected && selected.group ? exports.SELECT_PANEL_INDENT_PADDING_X : exports.SELECT_PANEL_PADDING_X;
        }
        // Invert the offset in LTR.
        if (!isRtl) {
            offsetX *= -1;
        }
        // Determine how much the select overflows on each side.
        var leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
        var rightOverflow = overlayRect.right + offsetX - viewportSize.width
            + (isRtl ? 0 : paddingWidth);
        // If the element overflows on either side, reduce the offset to allow it to fit.
        if (leftOverflow > 0) {
            offsetX += leftOverflow + exports.SELECT_PANEL_VIEWPORT_PADDING;
        }
        else if (rightOverflow > 0) {
            offsetX -= rightOverflow + exports.SELECT_PANEL_VIEWPORT_PADDING;
        }
        // Set the offset directly in order to avoid having to go through change detection and
        // potentially triggering "changed after it was checked" errors. Round the value to avoid
        // blurry content in some browsers.
        this.overlayDir.offsetX = Math.round(offsetX);
        this.overlayDir.overlayRef.updatePosition();
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    /**
       * Calculates the y-offset of the select's overlay panel in relation to the
       * top start corner of the trigger. It has to be adjusted in order for the
       * selected option to be aligned over the trigger when the panel opens.
       */
    MatSelect.prototype._calculateOverlayOffsetY = /**
       * Calculates the y-offset of the select's overlay panel in relation to the
       * top start corner of the trigger. It has to be adjusted in order for the
       * selected option to be aligned over the trigger when the panel opens.
       */
    function (selectedIndex, scrollBuffer, maxScroll) {
        var itemHeight = this._getItemHeight();
        var optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        var maxOptionsDisplayed = Math.floor(exports.SELECT_PANEL_MAX_HEIGHT / itemHeight);
        var optionOffsetFromPanelTop;
        // Disable offset if requested by user by returning 0 as value to offset
        if (this._disableOptionCentering) {
            return 0;
        }
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * itemHeight;
        }
        else if (this._scrollTop === maxScroll) {
            var firstDisplayedIndex = this._getItemCount() - maxOptionsDisplayed;
            var selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // The first item is partially out of the viewport. Therefore we need to calculate what
            // portion of it is shown in the viewport and account for it in our offset.
            var partialItemHeight = itemHeight - (this._getItemCount() * itemHeight - exports.SELECT_PANEL_MAX_HEIGHT) % itemHeight;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop = selectedDisplayIndex * itemHeight + partialItemHeight;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - itemHeight / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height difference,
        // multiplied by -1 to ensure that the overlay moves in the correct direction up the page.
        // The value is rounded to prevent some browsers from blurring the content.
        return Math.round(optionOffsetFromPanelTop * -1 - optionHeightAdjustment);
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    /**
       * Checks that the attempted overlay position will fit within the viewport.
       * If it will not fit, tries to adjust the scroll position and the associated
       * y-offset so the panel can open fully on-screen. If it still won't fit,
       * sets the offset back to 0 to allow the fallback position to take over.
       */
    MatSelect.prototype._checkOverlayWithinViewport = /**
       * Checks that the attempted overlay position will fit within the viewport.
       * If it will not fit, tries to adjust the scroll position and the associated
       * y-offset so the panel can open fully on-screen. If it still won't fit,
       * sets the offset back to 0 to allow the fallback position to take over.
       */
    function (maxScroll) {
        var itemHeight = this._getItemHeight();
        var viewportSize = this._viewportRuler.getViewportSize();
        var topSpaceAvailable = this._triggerRect.top - exports.SELECT_PANEL_VIEWPORT_PADDING;
        var bottomSpaceAvailable = viewportSize.height - this._triggerRect.bottom - exports.SELECT_PANEL_VIEWPORT_PADDING;
        var panelHeightTop = Math.abs(this._offsetY);
        var totalPanelHeight = Math.min(this._getItemCount() * itemHeight, exports.SELECT_PANEL_MAX_HEIGHT);
        var panelHeightBottom = totalPanelHeight - panelHeightTop - this._triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    };
    /** Adjusts the overlay panel up to fit in the viewport. */
    /** Adjusts the overlay panel up to fit in the viewport. */
    MatSelect.prototype._adjustPanelUp = /** Adjusts the overlay panel up to fit in the viewport. */
    function (panelHeightBottom, bottomSpaceAvailable) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        var distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = "50% bottom 0px";
        }
    };
    /** Adjusts the overlay panel down to fit in the viewport. */
    /** Adjusts the overlay panel down to fit in the viewport. */
    MatSelect.prototype._adjustPanelDown = /** Adjusts the overlay panel down to fit in the viewport. */
    function (panelHeightTop, topSpaceAvailable, maxScroll) {
        // Browsers ignore fractional scroll offsets, so we need to round.
        var distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = "50% top 0px";
            return;
        }
    };
    /** Sets the transform origin point based on the selected option. */
    /** Sets the transform origin point based on the selected option. */
    MatSelect.prototype._getOriginBasedOnOption = /** Sets the transform origin point based on the selected option. */
    function () {
        var itemHeight = this._getItemHeight();
        var optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
        var originY = Math.abs(this._offsetY) - optionHeightAdjustment + itemHeight / 2;
        return "50% " + originY + "px 0px";
    };
    /** Calculates the amount of items in the select. This includes options and group labels. */
    /** Calculates the amount of items in the select. This includes options and group labels. */
    MatSelect.prototype._getItemCount = /** Calculates the amount of items in the select. This includes options and group labels. */
    function () {
        return this.options.length + this.optionGroups.length;
    };
    /** Calculates the height of the select's options. */
    /** Calculates the height of the select's options. */
    MatSelect.prototype._getItemHeight = /** Calculates the height of the select's options. */
    function () {
        return this._triggerFontSize * exports.SELECT_ITEM_HEIGHT_EM;
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    MatSelect.prototype.setDescribedByIds = /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    function (ids) {
        this._ariaDescribedby = ids.join(' ');
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    MatSelect.prototype.onContainerClick = /**
       * Implemented as part of MatFormFieldControl.
       * @docs-private
       */
    function () {
        this.focus();
        this.open();
    };
    Object.defineProperty(MatSelect.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
           * Implemented as part of MatFormFieldControl.
           * @docs-private
           */
        function () {
            return this._panelOpen || !this.empty;
        },
        enumerable: true,
        configurable: true
    });
    MatSelect.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-select',
                    exportAs: 'matSelect',
                    template: "<div cdk-overlay-origin class=\"mat-select-trigger\" aria-hidden=\"true\" (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger><div class=\"mat-select-value\" [ngSwitch]=\"empty\"><span class=\"mat-select-placeholder\" *ngSwitchCase=\"true\">{{placeholder || '\u00A0'}}</span> <span class=\"mat-select-value-text\" *ngSwitchCase=\"false\" [ngSwitch]=\"!!customTrigger\"><span *ngSwitchDefault>{{triggerValue || '\u00A0'}}</span><ng-content select=\"mat-select-trigger\" *ngSwitchCase=\"true\"></ng-content></span></div><div class=\"mat-select-arrow-wrapper\"><div class=\"mat-select-arrow\"></div></div></div><ng-template cdk-connected-overlay cdkConnectedOverlayLockPosition cdkConnectedOverlayHasBackdrop cdkConnectedOverlayBackdropClass=\"cdk-overlay-transparent-backdrop\" [cdkConnectedOverlayScrollStrategy]=\"_scrollStrategy\" [cdkConnectedOverlayOrigin]=\"origin\" [cdkConnectedOverlayOpen]=\"panelOpen\" [cdkConnectedOverlayPositions]=\"_positions\" [cdkConnectedOverlayMinWidth]=\"_triggerRect?.width\" [cdkConnectedOverlayOffsetY]=\"_offsetY\" (backdropClick)=\"close()\" (attach)=\"_onAttached()\" (detach)=\"close()\"><div #panel class=\"mat-select-panel {{ _getPanelTheme() }}\" [ngClass]=\"panelClass\" [@transformPanel]=\"multiple ? 'showing-multiple' : 'showing'\" (@transformPanel.done)=\"_panelDoneAnimatingStream.next($event.toState)\" [style.transformOrigin]=\"_transformOrigin\" [class.mat-select-panel-done-animating]=\"_panelDoneAnimating\" [style.font-size.px]=\"_triggerFontSize\" (keydown)=\"_handleKeydown($event)\"><div class=\"mat-select-content\" [@fadeInContent]=\"'showing'\" (@fadeInContent.done)=\"_onFadeInDone()\"><ng-content></ng-content></div></div></ng-template>",
                    styles: [".mat-select{display:inline-block;width:100%;outline:0}.mat-select-trigger{display:inline-table;cursor:pointer;position:relative;box-sizing:border-box}.mat-select-disabled .mat-select-trigger{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.mat-select-value{display:table-cell;max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mat-select-value-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-select-arrow-wrapper{display:table-cell;vertical-align:middle}.mat-form-field-appearance-fill .mat-select-arrow-wrapper,.mat-form-field-appearance-standard .mat-select-arrow-wrapper{transform:translateY(-50%)}.mat-form-field-appearance-outline .mat-select-arrow-wrapper{transform:translateY(-25%)}.mat-select-arrow{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid;margin:0 4px}.mat-select-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-top:0;padding-bottom:0;max-height:256px;min-width:100%}.mat-select-panel:not([class*=mat-elevation-z]){box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}@media screen and (-ms-high-contrast:active){.mat-select-panel{outline:solid 1px}}.mat-select-panel .mat-optgroup-label,.mat-select-panel .mat-option{font-size:inherit;line-height:3em;height:3em}.mat-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-form-field-flex{cursor:pointer}.mat-form-field-type-mat-select .mat-form-field-label{width:calc(100% - 18px)}.mat-select-placeholder{transition:color .4s .133s cubic-bezier(.25,.8,.25,1)}._mat-animation-noopable .mat-select-placeholder{transition:none}.mat-form-field-hide-placeholder .mat-select-placeholder{color:transparent;-webkit-text-fill-color:transparent;transition:none;display:block}"],
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    host: {
                        'role': 'listbox',
                        '[attr.id]': 'id',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.aria-label]': '_getAriaLabel()',
                        '[attr.aria-labelledby]': '_getAriaLabelledby()',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-owns]': 'panelOpen ? _optionIds : null',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
                        '[class.mat-select-disabled]': 'disabled',
                        '[class.mat-select-invalid]': 'errorState',
                        '[class.mat-select-required]': 'required',
                        'class': 'mat-select',
                        '(keydown)': '_handleKeydown($event)',
                        '(focus)': '_onFocus()',
                        '(blur)': '_onBlur()',
                    },
                    animations: [
                        select_animations_1.matSelectAnimations.transformPanel,
                        select_animations_1.matSelectAnimations.fadeInContent
                    ],
                    providers: [
                        { provide: form_field_1.MatFormFieldControl, useExisting: MatSelect },
                        { provide: core_2.MAT_OPTION_PARENT_COMPONENT, useExisting: MatSelect }
                    ],
                },] },
    ];
    /** @nocollapse */
    MatSelect.ctorParameters = function () { return [
        { type: overlay_1.ViewportRuler, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
        { type: core_2.ErrorStateMatcher, },
        { type: core_1.ElementRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: forms_1.NgForm, decorators: [{ type: core_1.Optional },] },
        { type: forms_1.FormGroupDirective, decorators: [{ type: core_1.Optional },] },
        { type: form_field_1.MatFormField, decorators: [{ type: core_1.Optional },] },
        { type: forms_1.NgControl, decorators: [{ type: core_1.Self }, { type: core_1.Optional },] },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['tabindex',] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_SELECT_SCROLL_STRATEGY,] },] },
    ]; };
    MatSelect.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: ['trigger',] },],
        "panel": [{ type: core_1.ViewChild, args: ['panel',] },],
        "overlayDir": [{ type: core_1.ViewChild, args: [overlay_1.CdkConnectedOverlay,] },],
        "options": [{ type: core_1.ContentChildren, args: [core_2.MatOption, { descendants: true },] },],
        "optionGroups": [{ type: core_1.ContentChildren, args: [core_2.MatOptgroup,] },],
        "panelClass": [{ type: core_1.Input },],
        "customTrigger": [{ type: core_1.ContentChild, args: [MatSelectTrigger,] },],
        "placeholder": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "multiple": [{ type: core_1.Input },],
        "disableOptionCentering": [{ type: core_1.Input },],
        "compareWith": [{ type: core_1.Input },],
        "value": [{ type: core_1.Input },],
        "ariaLabel": [{ type: core_1.Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: core_1.Input, args: ['aria-labelledby',] },],
        "errorStateMatcher": [{ type: core_1.Input },],
        "sortComparator": [{ type: core_1.Input },],
        "id": [{ type: core_1.Input },],
        "openedChange": [{ type: core_1.Output },],
        "_openedStream": [{ type: core_1.Output, args: ['opened',] },],
        "_closedStream": [{ type: core_1.Output, args: ['closed',] },],
        "selectionChange": [{ type: core_1.Output },],
        "valueChange": [{ type: core_1.Output },],
    };
    return MatSelect;
}(exports._MatSelectMixinBase));
exports.MatSelect = MatSelect;
//# sourceMappingURL=select.js.map