"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
/**
 * @title Highlight the first autocomplete option
 */
var AutocompleteAutoActiveFirstOptionExample = /** @class */ (function () {
    function AutocompleteAutoActiveFirstOptionExample() {
        this.myControl = new forms_1.FormControl();
        this.options = ['One', 'Two', 'Three'];
    }
    AutocompleteAutoActiveFirstOptionExample.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredOptions = this.myControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
    };
    AutocompleteAutoActiveFirstOptionExample.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.options.filter(function (option) { return option.toLowerCase().indexOf(filterValue) === 0; });
    };
    AutocompleteAutoActiveFirstOptionExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'autocomplete-auto-active-first-option-example',
                    template: "<form class=\"example-form\"><mat-form-field class=\"example-full-width\"><input type=\"text\" placeholder=\"Pick one\" aria-label=\"Number\" matInput [formControl]=\"myControl\" [matAutocomplete]=\"auto\"><mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\"><mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option\">{{option}}</mat-option></mat-autocomplete></mat-form-field></form>",
                    styles: [".example-form { min-width: 150px; max-width: 500px; width: 100%; } .example-full-width { width: 100%; } "],
                },] },
    ];
    return AutocompleteAutoActiveFirstOptionExample;
}());
exports.AutocompleteAutoActiveFirstOptionExample = AutocompleteAutoActiveFirstOptionExample;
//# sourceMappingURL=autocomplete-auto-active-first-option-example.js.map