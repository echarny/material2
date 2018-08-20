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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var a11y_1 = require("@angular/cdk/a11y");
var coercion_1 = require("@angular/cdk/coercion");
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
var _uniqueAutocompleteIdCounter = 0;
/** Event object that is emitted when an autocomplete option is selected. */
var /** Event object that is emitted when an autocomplete option is selected. */
MatAutocompleteSelectedEvent = /** @class */ (function () {
    function MatAutocompleteSelectedEvent(/** Reference to the autocomplete panel that emitted the event. */
    source, /** Option that was selected. */
    option) {
        this.source = source;
        this.option = option;
    }
    return MatAutocompleteSelectedEvent;
}());
exports.MatAutocompleteSelectedEvent = MatAutocompleteSelectedEvent;
// Boilerplate for applying mixins to MatAutocomplete.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatAutocomplete.
/** @docs-private */
MatAutocompleteBase = /** @class */ (function () {
    function MatAutocompleteBase() {
    }
    return MatAutocompleteBase;
}());
exports.MatAutocompleteBase = MatAutocompleteBase;
exports._MatAutocompleteMixinBase = core_2.mixinDisableRipple(MatAutocompleteBase);
/** Injection token to be used to override the default options for `mat-autocomplete`. */
exports.MAT_AUTOCOMPLETE_DEFAULT_OPTIONS = new core_1.InjectionToken('mat-autocomplete-default-options', {
    providedIn: 'root',
    factory: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY,
});
/** @docs-private */
function MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY() {
    return { autoActiveFirstOption: false };
}
exports.MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY = MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY;
var MatAutocomplete = /** @class */ (function (_super) {
    __extends(MatAutocomplete, _super);
    function MatAutocomplete(_changeDetectorRef, _elementRef, defaults) {
        var _this = _super.call(this) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._elementRef = _elementRef;
        /** Whether the autocomplete panel should be visible, depending on option length. */
        _this.showPanel = false;
        _this._isOpen = false;
        /** Function that maps an option's control value to its display value in the trigger. */
        _this.displayWith = null;
        /** Event that is emitted whenever an option from the list is selected. */
        _this.optionSelected = new core_1.EventEmitter();
        /** Event that is emitted when the autocomplete panel is opened. */
        _this.opened = new core_1.EventEmitter();
        /** Event that is emitted when the autocomplete panel is closed. */
        _this.closed = new core_1.EventEmitter();
        _this._classList = {};
        /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
        _this.id = "mat-autocomplete-" + _uniqueAutocompleteIdCounter++;
        _this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
        return _this;
    }
    Object.defineProperty(MatAutocomplete.prototype, "isOpen", {
        /** Whether the autocomplete panel is open. */
        get: /** Whether the autocomplete panel is open. */
        function () { return this._isOpen && this.showPanel; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocomplete.prototype, "autoActiveFirstOption", {
        get: /**
           * Whether the first option should be highlighted when the autocomplete panel is opened.
           * Can be configured globally through the `MAT_AUTOCOMPLETE_DEFAULT_OPTIONS` token.
           */
        function () { return this._autoActiveFirstOption; },
        set: function (value) {
            this._autoActiveFirstOption = coercion_1.coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatAutocomplete.prototype, "classList", {
        set: /**
           * Takes classes set on the host mat-autocomplete element and applies them to the panel
           * inside the overlay container to allow for easy styling.
           */
        function (value) {
            var _this = this;
            if (value && value.length) {
                value.split(' ').forEach(function (className) { return _this._classList[className.trim()] = true; });
                this._elementRef.nativeElement.className = '';
            }
        },
        enumerable: true,
        configurable: true
    });
    MatAutocomplete.prototype.ngAfterContentInit = function () {
        this._keyManager = new a11y_1.ActiveDescendantKeyManager(this.options).withWrap();
        // Set the initial visibility state.
        this._setVisibility();
    };
    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     */
    /**
       * Sets the panel scrollTop. This allows us to manually scroll to display options
       * above or below the fold, as they are not actually being focused when active.
       */
    MatAutocomplete.prototype._setScrollTop = /**
       * Sets the panel scrollTop. This allows us to manually scroll to display options
       * above or below the fold, as they are not actually being focused when active.
       */
    function (scrollTop) {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    };
    /** Returns the panel's scrollTop. */
    /** Returns the panel's scrollTop. */
    MatAutocomplete.prototype._getScrollTop = /** Returns the panel's scrollTop. */
    function () {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    };
    /** Panel should hide itself when the option list is empty. */
    /** Panel should hide itself when the option list is empty. */
    MatAutocomplete.prototype._setVisibility = /** Panel should hide itself when the option list is empty. */
    function () {
        this.showPanel = !!this.options.length;
        this._classList['mat-autocomplete-visible'] = this.showPanel;
        this._classList['mat-autocomplete-hidden'] = !this.showPanel;
        this._changeDetectorRef.markForCheck();
    };
    /** Emits the `select` event. */
    /** Emits the `select` event. */
    MatAutocomplete.prototype._emitSelectEvent = /** Emits the `select` event. */
    function (option) {
        var event = new MatAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    };
    MatAutocomplete.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-autocomplete',
                    template: "<ng-template><div class=\"mat-autocomplete-panel\" role=\"listbox\" [id]=\"id\" [ngClass]=\"_classList\" #panel><ng-content></ng-content></div></ng-template>",
                    styles: [".mat-autocomplete-panel{min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.mat-autocomplete-panel:not([class*=mat-elevation-z]){box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-autocomplete-panel.mat-autocomplete-visible{visibility:visible}.mat-autocomplete-panel.mat-autocomplete-hidden{visibility:hidden}@media screen and (-ms-high-contrast:active){.mat-autocomplete-panel{outline:solid 1px}}.mat-autocomplete-panel-above{border-radius:0;border-top-left-radius:4px;border-top-right-radius:4px}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'matAutocomplete',
                    inputs: ['disableRipple'],
                    host: {
                        'class': 'mat-autocomplete'
                    },
                    providers: [
                        { provide: core_2.MAT_OPTION_PARENT_COMPONENT, useExisting: MatAutocomplete }
                    ]
                },] },
    ];
    /** @nocollapse */
    MatAutocomplete.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,] },] },
    ]; };
    MatAutocomplete.propDecorators = {
        "template": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
        "panel": [{ type: core_1.ViewChild, args: ['panel',] },],
        "options": [{ type: core_1.ContentChildren, args: [core_2.MatOption, { descendants: true },] },],
        "optionGroups": [{ type: core_1.ContentChildren, args: [core_2.MatOptgroup,] },],
        "displayWith": [{ type: core_1.Input },],
        "autoActiveFirstOption": [{ type: core_1.Input },],
        "panelWidth": [{ type: core_1.Input },],
        "optionSelected": [{ type: core_1.Output },],
        "opened": [{ type: core_1.Output },],
        "closed": [{ type: core_1.Output },],
        "classList": [{ type: core_1.Input, args: ['class',] },],
    };
    return MatAutocomplete;
}(exports._MatAutocompleteMixinBase));
exports.MatAutocomplete = MatAutocomplete;
//# sourceMappingURL=autocomplete.js.map