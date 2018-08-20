"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Slider with custom thumb label formatting.
 */
var SliderFormattingExample = /** @class */ (function () {
    function SliderFormattingExample() {
    }
    SliderFormattingExample.prototype.formatLabel = function (value) {
        if (!value) {
            return 0;
        }
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return value;
    };
    SliderFormattingExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'slider-formatting-example',
                    template: "<mat-slider thumbLabel [displayWith]=\"formatLabel\" tickInterval=\"1000\" min=\"1\" max=\"100000\"></mat-slider>",
                    styles: ["mat-slider { width: 300px; } "],
                },] },
    ];
    return SliderFormattingExample;
}());
exports.SliderFormattingExample = SliderFormattingExample;
//# sourceMappingURL=slider-formatting-example.js.map