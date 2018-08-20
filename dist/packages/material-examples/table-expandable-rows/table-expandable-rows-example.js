"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
/**
 * @title Table with expandable rows
 */
var TableExpandableRowsExample = /** @class */ (function () {
    function TableExpandableRowsExample() {
        this.dataSource = ELEMENT_DATA;
        this.columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
    }
    TableExpandableRowsExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'table-expandable-rows-example',
                    styles: ["table { width: 100%; } tr.example-detail-row { height: 0; } tr.example-element-row:not(.example-expanded-row):hover { background: #f5f5f5; } tr.example-element-row:not(.example-expanded-row):active { background: #efefef; } .example-element-row td { border-bottom-width: 0; } .example-element-detail { overflow: hidden; display: flex; } .example-element-diagram { min-width: 80px; border: 2px solid black; padding: 8px; font-weight: lighter; margin: 8px 0; height: 104px; } .example-element-symbol { font-weight: bold; font-size: 40px; line-height: normal; } .example-element-description { padding: 16px; } .example-element-description-attribution { opacity: 0.5; } "],
                    template: "<table mat-table [dataSource]=\"dataSource\" multiTemplateDataRows class=\"mat-elevation-z8\"><ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of columnsToDisplay\"><th mat-header-cell *matHeaderCellDef>{{column}}</th><td mat-cell *matCellDef=\"let element\">{{element[column]}}</td></ng-container><ng-container matColumnDef=\"expandedDetail\"><td mat-cell *matCellDef=\"let element\" [attr.colspan]=\"columnsToDisplay.length\"><div class=\"example-element-detail\" [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\"><div class=\"example-element-diagram\"><div class=\"example-element-position\">{{element.position}}</div><div class=\"example-element-symbol\">{{element.symbol}}</div><div class=\"example-element-name\">{{element.name}}</div><div class=\"example-element-weight\">{{element.weight}}</div></div><div class=\"example-element-description\">{{element.description}} <span class=\"example-element-description-attribution\">-- Wikipedia</span></div></div></td></ng-container><tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr><tr mat-row *matRowDef=\"let element; columns: columnsToDisplay;\" class=\"example-element-row\" [class.example-expanded-row]=\"expandedElement === element\" (click)=\"expandedElement = element\"></tr><tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr></table>",
                    animations: [
                        animations_1.trigger('detailExpand', [
                            animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0', display: 'none' })),
                            animations_1.state('expanded', animations_1.style({ height: '*' })),
                            animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                        ]),
                    ],
                },] },
    ];
    return TableExpandableRowsExample;
}());
exports.TableExpandableRowsExample = TableExpandableRowsExample;
var ELEMENT_DATA = [
    {
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H',
        description: "Hydrogen is a chemical element with symbol H and atomic number 1. With a standard\n        atomic weight of 1.008, hydrogen is the lightest element on the periodic table."
    }, {
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He',
        description: "Helium is a chemical element with symbol He and atomic number 2. It is a\n        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas\n        group in the periodic table. Its boiling point is the lowest among all the elements."
    }, {
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li',
        description: "Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,\n        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the\n        lightest solid element."
    }, {
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be',
        description: "Beryllium is a chemical element with symbol Be and atomic number 4. It is a\n        relatively rare element in the universe, usually occurring as a product of the spallation of\n        larger atomic nuclei that have collided with cosmic rays."
    }, {
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B',
        description: "Boron is a chemical element with symbol B and atomic number 5. Produced entirely\n        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a\n        low-abundance element in the Solar system and in the Earth's crust."
    }, {
        position: 6,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
        description: "Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic\n        and tetravalent\u2014making four electrons available to form covalent chemical bonds. It belongs\n        to group 14 of the periodic table."
    }, {
        position: 7,
        name: 'Nitrogen',
        weight: 14.0067,
        symbol: 'N',
        description: "Nitrogen is a chemical element with symbol N and atomic number 7. It was first\n        discovered and isolated by Scottish physician Daniel Rutherford in 1772."
    }, {
        position: 8,
        name: 'Oxygen',
        weight: 15.9994,
        symbol: 'O',
        description: "Oxygen is a chemical element with symbol O and atomic number 8. It is a member of\n         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing\n         agent that readily forms oxides with most elements as well as with other compounds."
    }, {
        position: 9,
        name: 'Fluorine',
        weight: 18.9984,
        symbol: 'F',
        description: "Fluorine is a chemical element with symbol F and atomic number 9. It is the\n        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard\n        conditions."
    }, {
        position: 10,
        name: 'Neon',
        weight: 20.1797,
        symbol: 'Ne',
        description: "Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.\n        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about\n        two-thirds the density of air."
    },
];
//# sourceMappingURL=table-expandable-rows-example.js.map