"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var rxjs_1 = require("rxjs");
var autocomplete_1 = require("./autocomplete");
var coercion_1 = require("@angular/cdk/coercion");
var autocomplete_origin_1 = require("./autocomplete-origin");
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the scrollTop of the panel. Because we are not
 * actually focusing the active item, scroll must be handled manually.
 */
/** The height of each autocomplete option. */
exports.AUTOCOMPLETE_OPTION_HEIGHT = 48;
/** The total height of the autocomplete panel. */
exports.AUTOCOMPLETE_PANEL_HEIGHT = 256;
/** Injection token that determines the scroll handling while the autocomplete panel is open. */
exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY = new core_1.InjectionToken('mat-autocomplete-scroll-strategy');
/** @docs-private */
function MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY(overlay) {
    return function () { return overlay.scrollStrategies.reposition(); };
}
exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY = MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY;
/** @docs-private */
exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    deps: [overlay_1.Overlay],
    useFactory: MAT_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY,
};
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
exports.MAT_AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MatAutocompleteTrigger; }),
    multi: true
};
/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 */
function getMatAutocompleteMissingPanelError() {
    return Error('Attempting to open an undefined instance of `mat-autocomplete`. ' +
        'Make sure that the id passed to the `matAutocomplete` is correct and that ' +
        'you\'re attempting to open it after the ngAfterContentInit hook.');
}
exports.getMatAutocompleteMissingPanelError = getMatAutocompleteMissingPanelError;
var MatAutocompleteTrigger = /** @class */ (function () {
    function MatAutocompleteTrigger(_element, _overlay, _viewContainerRef, _zone, _changeDetectorRef, _scrollStrategy, _dir, _formField, _document, 
    // @breaking-change 7.0.0 Make `_viewportRuler` required.
    _viewportRuler) {
        var _this = this;
        this._element = _element;
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
        this._zone = _zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._formField = _formField;
        this._document = _document;
        this._viewportRuler = _viewportRuler;
        this._componentDestroyed = false;
        this._autocompleteDisabled = false;
        /** Whether or not the label state is being overridden. */
        this._manuallyFloatingLabel = false;
        /** Subscription to viewport size changes. */
        this._viewportSubscription = rxjs_1.Subscription.EMPTY;
        /** Stream of keyboard events that can close the panel. */
        this._closeKeyEventStream = new rxjs_1.Subject();
        /** `View -> model callback called when value changes` */
        this._onChange = function () { };
        /** `View -> model callback called when autocomplete has been touched` */
        this._onTouched = function () { };
        /**
           * `autocomplete` attribute to be set on the input element.
           * @docs-private
           */
        this.autocompleteAttribute = 'off';
        this._overlayAttached = false;
        /** Stream of autocomplete option selections. */
        this.optionSelections = rxjs_1.defer(function () {
            if (_this.autocomplete && _this.autocomplete.options) {
                return rxjs_1.merge.apply(void 0, _this.autocomplete.options.map(function (option) { return option.onSelectionChange; }));
            }
            // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
            // Return a stream that we'll replace with the real one once everything is in place.
            return _this._zone.onStable
                .asObservable()
                .pipe(operators_1.take(1), operators_1.switchMap(function () { return _this.optionSelections; }));
        });
    }
    Object.defineProperty(MatAutocompleteTrigger.prototype, "autocompleteDisabled", {
        get: /**
           * Whether the autocomplete is disabled. When disabled, the element will
           * act as a regular input and the user won't be able to open the panel.
           */
        function () { return this._autocompleteDisabled; },
        set: function (value) {
            this._autocompleteDisabled = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    MatAutocompleteTrigger.prototype.ngOnDestroy = function () {
        this._viewportSubscription.unsubscribe();
        this._componentDestroyed = true;
        this._destroyPanel();
        this._closeKeyEventStream.complete();
    };
    Object.defineProperty(MatAutocompleteTrigger.prototype, "panelOpen", {
        /** Whether or not the autocomplete panel is open. */
        get: /** Whether or not the autocomplete panel is open. */
        function () {
            return this._overlayAttached && this.autocomplete.showPanel;
        },
        enumerable: true,
        configurable: true
    });
    /** Opens the autocomplete suggestion panel. */
    /** Opens the autocomplete suggestion panel. */
    MatAutocompleteTrigger.prototype.openPanel = /** Opens the autocomplete suggestion panel. */
    function () {
        this._attachOverlay();
        this._floatLabel();
    };
    /** Closes the autocomplete suggestion panel. */
    /** Closes the autocomplete suggestion panel. */
    MatAutocompleteTrigger.prototype.closePanel = /** Closes the autocomplete suggestion panel. */
    function () {
        this._resetLabel();
        if (!this._overlayAttached) {
            return;
        }
        if (this.panelOpen) {
            // Only emit if the panel was visible.
            this.autocomplete.closed.emit();
        }
        this.autocomplete._isOpen = this._overlayAttached = false;
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
            this._closingActionsSubscription.unsubscribe();
        }
        // Note that in some cases this can end up being called after the component is destroyed.
        // Add a check to ensure that we don't try to run change detection on a destroyed view.
        if (!this._componentDestroyed) {
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            this._changeDetectorRef.detectChanges();
        }
    };
    /**
     * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
     * within the viewport.
     */
    /**
       * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
       * within the viewport.
       */
    MatAutocompleteTrigger.prototype.updatePosition = /**
       * Updates the position of the autocomplete suggestion panel to ensure that it fits all options
       * within the viewport.
       */
    function () {
        if (this._overlayAttached) {
            this._overlayRef.updatePosition();
        }
    };
    Object.defineProperty(MatAutocompleteTrigger.prototype, "panelClosingActions", {
        /**
         * A stream of actions that should close the autocomplete panel, including
         * when an option is selected, on blur, and when TAB is pressed.
         */
        get: /**
           * A stream of actions that should close the autocomplete panel, including
           * when an option is selected, on blur, and when TAB is pressed.
           */
        function () {
            var _this = this;
            return rxjs_1.merge(this.optionSelections, this.autocomplete._keyManager.tabOut.pipe(operators_1.filter(function () { return _this._overlayAttached; })), this._closeKeyEventStream, this._outsideClickStream, this._overlayRef ?
                this._overlayRef.detachments().pipe(operators_1.filter(function () { return _this._overlayAttached; })) :
                rxjs_1.of()).pipe(
            // Normalize the output so we return a consistent type.
            // Normalize the output so we return a consistent type.
            operators_1.map(function (event) { return event instanceof core_2.MatOptionSelectionChange ? event : null; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocompleteTrigger.prototype, "activeOption", {
        /** The currently active option, coerced to MatOption type. */
        get: /** The currently active option, coerced to MatOption type. */
        function () {
            if (this.autocomplete && this.autocomplete._keyManager) {
                return this.autocomplete._keyManager.activeItem;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocompleteTrigger.prototype, "_outsideClickStream", {
        /** Stream of clicks outside of the autocomplete panel. */
        get: /** Stream of clicks outside of the autocomplete panel. */
        function () {
            var _this = this;
            if (!this._document) {
                return rxjs_1.of(null);
            }
            return rxjs_1.merge(rxjs_1.fromEvent(this._document, 'click'), rxjs_1.fromEvent(this._document, 'touchend'))
                .pipe(operators_1.filter(function (event) {
                var clickTarget = event.target;
                var formField = _this._formField ?
                    _this._formField._elementRef.nativeElement : null;
                return _this._overlayAttached &&
                    clickTarget !== _this._element.nativeElement &&
                    (!formField || !formField.contains(clickTarget)) &&
                    (!!_this._overlayRef && !_this._overlayRef.overlayElement.contains(clickTarget));
            }));
        },
        enumerable: true,
        configurable: true
    });
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatAutocompleteTrigger.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    function (value) {
        var _this = this;
        Promise.resolve(null).then(function () { return _this._setTriggerValue(value); });
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatAutocompleteTrigger.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatAutocompleteTrigger.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    MatAutocompleteTrigger.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    function (isDisabled) {
        this._element.nativeElement.disabled = isDisabled;
    };
    MatAutocompleteTrigger.prototype._handleKeydown = function (event) {
        var keyCode = event.keyCode;
        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (keyCode === keycodes_1.ESCAPE) {
            event.preventDefault();
        }
        // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
        // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
        if (this.panelOpen && (keyCode === keycodes_1.ESCAPE || (keyCode === keycodes_1.UP_ARROW && event.altKey))) {
            this._resetActiveItem();
            this._closeKeyEventStream.next();
            event.stopPropagation();
        }
        else if (this.activeOption && keyCode === keycodes_1.ENTER && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            this._resetActiveItem();
            event.preventDefault();
        }
        else if (this.autocomplete) {
            var prevActiveItem = this.autocomplete._keyManager.activeItem;
            var isArrowKey = keyCode === keycodes_1.UP_ARROW || keyCode === keycodes_1.DOWN_ARROW;
            if (this.panelOpen || keyCode === keycodes_1.TAB) {
                this.autocomplete._keyManager.onKeydown(event);
            }
            else if (isArrowKey && this._canOpen()) {
                this.openPanel();
            }
            if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
                this._scrollToOption();
            }
        }
    };
    MatAutocompleteTrigger.prototype._handleInput = function (event) {
        var target = event.target;
        var value = target.value;
        // Based on `NumberValueAccessor` from forms.
        if (target.type === 'number') {
            value = value == '' ? null : parseFloat(value);
        }
        // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/
        if (this._previousValue !== value && document.activeElement === event.target) {
            this._previousValue = value;
            this._onChange(value);
            if (this._canOpen()) {
                this.openPanel();
            }
        }
    };
    MatAutocompleteTrigger.prototype._handleFocus = function () {
        if (this._canOpen()) {
            this._previousValue = this._element.nativeElement.value;
            this._attachOverlay();
            this._floatLabel(true);
        }
    };
    /**
     * In "auto" mode, the label will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the label until the panel can be closed.
     * @param shouldAnimate Whether the label should be animated when it is floated.
     */
    /**
       * In "auto" mode, the label will animate down as soon as focus is lost.
       * This causes the value to jump when selecting an option with the mouse.
       * This method manually floats the label until the panel can be closed.
       * @param shouldAnimate Whether the label should be animated when it is floated.
       */
    MatAutocompleteTrigger.prototype._floatLabel = /**
       * In "auto" mode, the label will animate down as soon as focus is lost.
       * This causes the value to jump when selecting an option with the mouse.
       * This method manually floats the label until the panel can be closed.
       * @param shouldAnimate Whether the label should be animated when it is floated.
       */
    function (shouldAnimate) {
        if (shouldAnimate === void 0) { shouldAnimate = false; }
        if (this._formField && this._formField.floatLabel === 'auto') {
            if (shouldAnimate) {
                this._formField._animateAndLockLabel();
            }
            else {
                this._formField.floatLabel = 'always';
            }
            this._manuallyFloatingLabel = true;
        }
    };
    /** If the label has been manually elevated, return it to its normal state. */
    /** If the label has been manually elevated, return it to its normal state. */
    MatAutocompleteTrigger.prototype._resetLabel = /** If the label has been manually elevated, return it to its normal state. */
    function () {
        if (this._manuallyFloatingLabel) {
            this._formField.floatLabel = 'auto';
            this._manuallyFloatingLabel = false;
        }
    };
    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    /**
       * Given that we are not actually focusing active options, we must manually adjust scroll
       * to reveal options below the fold. First, we find the offset of the option from the top
       * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
       * the panel height + the option height, so the active option will be just visible at the
       * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
       * will become the offset. If that offset is visible within the panel already, the scrollTop is
       * not adjusted.
       */
    MatAutocompleteTrigger.prototype._scrollToOption = /**
       * Given that we are not actually focusing active options, we must manually adjust scroll
       * to reveal options below the fold. First, we find the offset of the option from the top
       * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
       * the panel height + the option height, so the active option will be just visible at the
       * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
       * will become the offset. If that offset is visible within the panel already, the scrollTop is
       * not adjusted.
       */
    function () {
        var index = this.autocomplete._keyManager.activeItemIndex || 0;
        var labelCount = core_2._countGroupLabelsBeforeOption(index, this.autocomplete.options, this.autocomplete.optionGroups);
        var newScrollPosition = core_2._getOptionScrollPosition(index + labelCount, exports.AUTOCOMPLETE_OPTION_HEIGHT, this.autocomplete._getScrollTop(), exports.AUTOCOMPLETE_PANEL_HEIGHT);
        this.autocomplete._setScrollTop(newScrollPosition);
    };
    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    /**
       * This method listens to a stream of panel closing actions and resets the
       * stream every time the option list changes.
       */
    MatAutocompleteTrigger.prototype._subscribeToClosingActions = /**
       * This method listens to a stream of panel closing actions and resets the
       * stream every time the option list changes.
       */
    function () {
        var _this = this;
        var firstStable = this._zone.onStable.asObservable().pipe(operators_1.take(1));
        var optionChanges = this.autocomplete.options.changes.pipe(operators_1.tap(function () { return _this._positionStrategy.reapplyLastPosition(); }), 
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        // Defer emitting to the stream until the next tick, because changing
        // bindings in here will cause "changed after checked" errors.
        operators_1.delay(0));
        // When the zone is stable initially, and when the option list changes...
        return rxjs_1.merge(firstStable, optionChanges)
            .pipe(
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        // create a new stream of panelClosingActions, replacing any previous streams
        // that were created, and flatten it so our stream only emits closing events...
        operators_1.switchMap(function () {
            _this._resetActiveItem();
            _this.autocomplete._setVisibility();
            if (_this.panelOpen) {
                _this._overlayRef.updatePosition();
            }
            return _this.panelClosingActions;
        }), 
        // when the first closing event occurs...
        // when the first closing event occurs...
        operators_1.take(1))
            .subscribe(function (event) { return _this._setValueAndClose(event); });
    };
    /** Destroys the autocomplete suggestion panel. */
    /** Destroys the autocomplete suggestion panel. */
    MatAutocompleteTrigger.prototype._destroyPanel = /** Destroys the autocomplete suggestion panel. */
    function () {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    };
    MatAutocompleteTrigger.prototype._setTriggerValue = function (value) {
        var toDisplay = this.autocomplete && this.autocomplete.displayWith ?
            this.autocomplete.displayWith(value) :
            value;
        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        var inputValue = toDisplay != null ? toDisplay : '';
        // If it's used within a `MatFormField`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            this._formField._control.value = inputValue;
        }
        else {
            this._element.nativeElement.value = inputValue;
        }
    };
    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    /**
       * This method closes the panel, and if a value is specified, also sets the associated
       * control to that value. It will also mark the control as dirty if this interaction
       * stemmed from the user.
       */
    MatAutocompleteTrigger.prototype._setValueAndClose = /**
       * This method closes the panel, and if a value is specified, also sets the associated
       * control to that value. It will also mark the control as dirty if this interaction
       * stemmed from the user.
       */
    function (event) {
        if (event && event.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
            this._element.nativeElement.focus();
            this.autocomplete._emitSelectEvent(event.source);
        }
        this.closePanel();
    };
    /**
     * Clear any previous selected option and emit a selection change event for this option
     */
    /**
       * Clear any previous selected option and emit a selection change event for this option
       */
    MatAutocompleteTrigger.prototype._clearPreviousSelectedOption = /**
       * Clear any previous selected option and emit a selection change event for this option
       */
    function (skip) {
        this.autocomplete.options.forEach(function (option) {
            if (option != skip && option.selected) {
                option.deselect();
            }
        });
    };
    MatAutocompleteTrigger.prototype._attachOverlay = function () {
        var _this = this;
        if (!this.autocomplete) {
            throw getMatAutocompleteMissingPanelError();
        }
        if (!this._overlayRef) {
            this._portal = new portal_1.TemplatePortal(this.autocomplete.template, this._viewContainerRef);
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
            if (this._viewportRuler) {
                this._viewportSubscription = this._viewportRuler.change().subscribe(function () {
                    if (_this.panelOpen && _this._overlayRef) {
                        _this._overlayRef.updateSize({ width: _this._getPanelWidth() });
                    }
                });
            }
        }
        else {
            // Update the panel width and direction, in case anything has changed.
            this._overlayRef.updateSize({ width: this._getPanelWidth() });
        }
        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }
        var wasOpen = this.panelOpen;
        this.autocomplete._setVisibility();
        this.autocomplete._isOpen = this._overlayAttached = true;
        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    };
    MatAutocompleteTrigger.prototype._getOverlayConfig = function () {
        return new overlay_1.OverlayConfig({
            positionStrategy: this._getOverlayPosition(),
            scrollStrategy: this._scrollStrategy(),
            width: this._getPanelWidth(),
            direction: this._dir
        });
    };
    MatAutocompleteTrigger.prototype._getOverlayPosition = function () {
        var _this = this;
        this._positionStrategy = this._overlay.position()
            .flexibleConnectedTo(this._getConnectedElement())
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
            { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' }
        ]);
        // The overlay edge connected to the trigger should have squared corners, while
        // the opposite end has rounded corners. We apply a CSS class to swap the
        // border-radius based on the overlay position.
        this._positionStrategy.positionChanges.subscribe(function (_a) {
            var connectionPair = _a.connectionPair;
            if (_this.autocomplete) {
                _this.autocomplete._classList['mat-autocomplete-panel-above'] =
                    connectionPair.originY === 'top';
            }
        });
        return this._positionStrategy;
    };
    MatAutocompleteTrigger.prototype._getConnectedElement = function () {
        if (this.connectedTo) {
            return this.connectedTo.elementRef;
        }
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
    };
    MatAutocompleteTrigger.prototype._getPanelWidth = function () {
        return this.autocomplete.panelWidth || this._getHostWidth();
    };
    /** Returns the width of the input element, so the panel width can match it. */
    /** Returns the width of the input element, so the panel width can match it. */
    MatAutocompleteTrigger.prototype._getHostWidth = /** Returns the width of the input element, so the panel width can match it. */
    function () {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    };
    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    /**
       * Resets the active item to -1 so arrow events will activate the
       * correct options, or to 0 if the consumer opted into it.
       */
    MatAutocompleteTrigger.prototype._resetActiveItem = /**
       * Resets the active item to -1 so arrow events will activate the
       * correct options, or to 0 if the consumer opted into it.
       */
    function () {
        this.autocomplete._keyManager.setActiveItem(this.autocomplete.autoActiveFirstOption ? 0 : -1);
    };
    /** Determines whether the panel can be opened. */
    /** Determines whether the panel can be opened. */
    MatAutocompleteTrigger.prototype._canOpen = /** Determines whether the panel can be opened. */
    function () {
        var element = this._element.nativeElement;
        return !element.readOnly && !element.disabled && !this._autocompleteDisabled;
    };
    MatAutocompleteTrigger.decorators = [
        { type: core_1.Directive, args: [{
                    selector: "input[matAutocomplete], textarea[matAutocomplete]",
                    host: {
                        '[attr.autocomplete]': 'autocompleteAttribute',
                        '[attr.role]': 'autocompleteDisabled ? null : "combobox"',
                        '[attr.aria-autocomplete]': 'autocompleteDisabled ? null : "list"',
                        '[attr.aria-activedescendant]': 'activeOption?.id',
                        '[attr.aria-expanded]': 'autocompleteDisabled ? null : panelOpen.toString()',
                        '[attr.aria-owns]': '(autocompleteDisabled || !panelOpen) ? null : autocomplete?.id',
                        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
                        // a little earlier. This avoids issues where IE delays the focusing of the input.
                        '(focusin)': '_handleFocus()',
                        '(blur)': '_onTouched()',
                        '(input)': '_handleInput($event)',
                        '(keydown)': '_handleKeydown($event)',
                    },
                    exportAs: 'matAutocompleteTrigger',
                    providers: [exports.MAT_AUTOCOMPLETE_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MatAutocompleteTrigger.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: overlay_1.Overlay, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.NgZone, },
        { type: core_1.ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_AUTOCOMPLETE_SCROLL_STRATEGY,] },] },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
        { type: form_field_1.MatFormField, decorators: [{ type: core_1.Optional }, { type: core_1.Host },] },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [common_1.DOCUMENT,] },] },
        { type: overlay_1.ViewportRuler, },
    ]; };
    MatAutocompleteTrigger.propDecorators = {
        "autocomplete": [{ type: core_1.Input, args: ['matAutocomplete',] },],
        "connectedTo": [{ type: core_1.Input, args: ['matAutocompleteConnectedTo',] },],
        "autocompleteAttribute": [{ type: core_1.Input, args: ['autocomplete',] },],
        "autocompleteDisabled": [{ type: core_1.Input, args: ['matAutocompleteDisabled',] },],
    };
    return MatAutocompleteTrigger;
}());
exports.MatAutocompleteTrigger = MatAutocompleteTrigger;
//# sourceMappingURL=autocomplete-trigger.js.map