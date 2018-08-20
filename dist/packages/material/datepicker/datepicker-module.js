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
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var calendar_1 = require("./calendar");
var calendar_body_1 = require("./calendar-body");
var datepicker_1 = require("./datepicker");
var datepicker_input_1 = require("./datepicker-input");
var datepicker_intl_1 = require("./datepicker-intl");
var datepicker_toggle_1 = require("./datepicker-toggle");
var month_view_1 = require("./month-view");
var multi_year_view_1 = require("./multi-year-view");
var year_view_1 = require("./year-view");
var MatDatepickerModule = /** @class */ (function () {
    function MatDatepickerModule() {
    }
    MatDatepickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        button_1.MatButtonModule,
                        dialog_1.MatDialogModule,
                        overlay_1.OverlayModule,
                        a11y_1.A11yModule,
                        portal_1.PortalModule,
                    ],
                    exports: [
                        calendar_1.MatCalendar,
                        calendar_body_1.MatCalendarBody,
                        datepicker_1.MatDatepicker,
                        datepicker_1.MatDatepickerContent,
                        datepicker_input_1.MatDatepickerInput,
                        datepicker_toggle_1.MatDatepickerToggle,
                        datepicker_toggle_1.MatDatepickerToggleIcon,
                        month_view_1.MatMonthView,
                        year_view_1.MatYearView,
                        multi_year_view_1.MatMultiYearView,
                        calendar_1.MatCalendarHeader,
                    ],
                    declarations: [
                        calendar_1.MatCalendar,
                        calendar_body_1.MatCalendarBody,
                        datepicker_1.MatDatepicker,
                        datepicker_1.MatDatepickerContent,
                        datepicker_input_1.MatDatepickerInput,
                        datepicker_toggle_1.MatDatepickerToggle,
                        datepicker_toggle_1.MatDatepickerToggleIcon,
                        month_view_1.MatMonthView,
                        year_view_1.MatYearView,
                        multi_year_view_1.MatMultiYearView,
                        calendar_1.MatCalendarHeader,
                    ],
                    providers: [
                        datepicker_intl_1.MatDatepickerIntl,
                        datepicker_1.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
                    ],
                    entryComponents: [
                        datepicker_1.MatDatepickerContent,
                        calendar_1.MatCalendarHeader,
                    ]
                },] },
    ];
    return MatDatepickerModule;
}());
exports.MatDatepickerModule = MatDatepickerModule;
//# sourceMappingURL=datepicker-module.js.map