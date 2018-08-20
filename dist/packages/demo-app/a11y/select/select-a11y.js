"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectAccessibilityDemo = /** @class */ (function () {
    function SelectAccessibilityDemo() {
        this.colors = [
            { value: 'red', label: 'Red' },
            { value: 'green', label: 'Green' },
            { value: 'blue', label: 'Blue' },
            { value: 'cyan', label: 'Cyan' },
            { value: 'magenta', label: 'Magenta' },
            { value: 'yellow', label: 'Yellow' },
            { value: 'black', label: 'Black' },
        ];
        this.toppings = [
            { value: 'pepperoni', label: 'Pepperoni' },
            { value: 'mushrooms', label: 'Mushrooms' },
            { value: 'onions', label: 'Onions' },
            { value: 'sausage', label: 'Sausage' },
            { value: 'bacon', label: 'Bacon' },
            { value: 'cheese', label: 'Cheese' },
            { value: 'olives', label: 'Olives' },
            { value: 'peppers', label: 'Peppers' },
            { value: 'pineapple', label: 'Pineapple' },
            { value: 'spinach', label: 'Spinach' },
        ];
        this.pokemon = [
            {
                label: 'Grass',
                pokemon: [
                    { value: 'bulbasaur', label: 'Bulbasaur' },
                    { value: 'oddish', label: 'Oddish' },
                    { value: 'bellsprout', label: 'Bellsprout' }
                ]
            },
            {
                label: 'Water',
                pokemon: [
                    { value: 'squirtle', label: 'Squirtle' },
                    { value: 'psyduck', label: 'Psyduck' },
                    { value: 'horsea', label: 'Horsea' }
                ]
            },
            {
                label: 'Fire',
                disabled: true,
                pokemon: [
                    { value: 'charmander', label: 'Charmander' },
                    { value: 'vulpix', label: 'Vulpix' },
                    { value: 'flareon', label: 'Flareon' }
                ]
            },
            {
                label: 'Psychic',
                pokemon: [
                    { value: 'mew', label: 'Mew' },
                    { value: 'mewtwo', label: 'Mewtwo' }
                ]
            }
        ];
    }
    SelectAccessibilityDemo = __decorate([
        core_1.Component({selector: 'select-a11y',
            template: "<section> <h2>Single selection</h2> <p>Select your favorite color</p> <mat-form-field> <mat-label>Colors</mat-label> <mat-select [(ngModel)]=\"selectedColor\"> <mat-option *ngFor=\"let color of colors\" [value]=\"color.value\"> {{ color.label }} </mat-option> </mat-select> </mat-form-field> </section> <section> <h2>Multiple selection</h2> <p>Pick toppings for your pizza</p> <mat-form-field> <mat-label>Toppings</mat-label> <mat-select [(ngModel)]=\"selectedTopping\" multiple> <mat-option *ngFor=\"let topping of toppings\" [value]=\"topping.value\"> {{ topping.label }} </mat-option> </mat-select> </mat-form-field> </section> <section> <h2>Grouped options</h2> <p>Pick your Pokemon</p> <mat-form-field> <mat-label>Pokemon</mat-label> <mat-select [(ngModel)]=\"selectedPokemon\"> <mat-optgroup *ngFor=\"let group of pokemon\" [label]=\"group.label\"> <mat-option *ngFor=\"let creature of group.pokemon\" [value]=\"creature.value\"> {{ creature.label }} </mat-option> </mat-optgroup> </mat-select> </mat-form-field> </section> <section> <h2>Colors</h2> <div class=\"demo-select-a11y-spacer\"> <mat-form-field  color=\"primary\"> <mat-label>ZIP code</mat-label> <mat-select> <mat-option value=\"2000\">2000</mat-option> <mat-option value=\"2100\">2100</mat-option> </mat-select> </mat-form-field> <mat-form-field color=\"accent\"> <mat-label>State</mat-label> <mat-select> <mat-option value=\"alaska\">Alaska</mat-option> <mat-option value=\"alabama\">Alabama</mat-option> </mat-select> </mat-form-field> <mat-form-field color=\"warn\"> <mat-label>Language</mat-label> <mat-select> <mat-option value=\"english\">English</mat-option> <mat-option value=\"spanish\">Spanish</mat-option> </mat-select> </mat-form-field> </div> <div class=\"demo-select-a11y-spacer\"> <mat-form-field color=\"primary\"> <mat-label>Digimon</mat-label> <mat-select multiple> <mat-option value=\"mihiramon\">Mihiramon</mat-option> <mat-option value=\"sandiramon\">Sandiramon</mat-option> </mat-select> </mat-form-field> <mat-form-field color=\"accent\"> <mat-label>Drink</mat-label> <mat-select multiple> <mat-option value=\"water\">Water</mat-option> <mat-option value=\"coke\">Coke</mat-option> </mat-select> </mat-form-field> <mat-form-field color=\"warn\"> <mat-label>Theme</mat-label> <mat-select multiple> <mat-option value=\"light\">Light</mat-option> <mat-option value=\"dark\">Dark</mat-option> </mat-select> </mat-form-field> </div> </section> ",
            styles: [".demo-select-a11y-spacer { margin-bottom: 10px; } "],
        })
    ], SelectAccessibilityDemo);
    return SelectAccessibilityDemo;
}());
exports.SelectAccessibilityDemo = SelectAccessibilityDemo;
//# sourceMappingURL=select-a11y.js.map