"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var autocomplete_a11y_1 = require("./autocomplete/autocomplete-a11y");
var button_a11y_1 = require("./button/button-a11y");
var button_toggle_a11y_1 = require("./button-toggle/button-toggle-a11y");
var card_a11y_1 = require("./card/card-a11y");
var checkbox_a11y_1 = require("./checkbox/checkbox-a11y");
var chips_a11y_1 = require("./chips/chips-a11y");
var dialog_a11y_1 = require("./dialog/dialog-a11y");
var expansion_a11y_1 = require("./expansion/expansion-a11y");
var grid_list_a11y_1 = require("./grid-list/grid-list-a11y");
var radio_a11y_1 = require("./radio/radio-a11y");
var a11y_1 = require("./a11y");
var toolbar_a11y_1 = require("./toolbar/toolbar-a11y");
var datepicker_a11y_1 = require("./datepicker/datepicker-a11y");
var icon_a11y_1 = require("./icon/icon-a11y");
var input_a11y_1 = require("./input/input-a11y");
var list_a11y_1 = require("./list/list-a11y");
var menu_a11y_1 = require("./menu/menu-a11y");
var progress_bar_a11y_1 = require("./progress-bar/progress-bar-a11y");
var progress_spinner_a11y_1 = require("./progress-spinner/progress-spinner-a11y");
var slider_a11y_1 = require("./slider/slider-a11y");
var slide_toggle_a11y_1 = require("./slide-toggle/slide-toggle-a11y");
var snack_bar_a11y_1 = require("./snack-bar/snack-bar-a11y");
var select_a11y_1 = require("./select/select-a11y");
var table_a11y_1 = require("./table/table-a11y");
var tabs_a11y_1 = require("./tabs/tabs-a11y");
var routes_1 = require("./tabs/routes");
var tooltip_a11y_1 = require("./tooltip/tooltip-a11y");
var sidenav_a11y_1 = require("./sidenav/sidenav-a11y");
var basic_sidenav_a11y_1 = require("./sidenav/basic-sidenav-a11y");
var dual_sidenav_a11y_1 = require("./sidenav/dual-sidenav-a11y");
var mobile_sidenav_a11y_1 = require("./sidenav/mobile-sidenav-a11y");
exports.ACCESSIBILITY_DEMO_ROUTES = [
    { path: '', component: a11y_1.AccessibilityHome },
    { path: 'autocomplete', component: autocomplete_a11y_1.AutocompleteAccessibilityDemo },
    { path: 'button', component: button_a11y_1.ButtonAccessibilityDemo },
    { path: 'button-toggle', component: button_toggle_a11y_1.ButtonToggleAccessibilityDemo },
    { path: 'card', component: card_a11y_1.CardAccessibilityDemo },
    { path: 'checkbox', component: checkbox_a11y_1.CheckboxAccessibilityDemo },
    { path: 'chips', component: chips_a11y_1.ChipsAccessibilityDemo },
    { path: 'datepicker', component: datepicker_a11y_1.DatepickerAccessibilityDemo },
    { path: 'dialog', component: dialog_a11y_1.DialogAccessibilityDemo },
    { path: 'expansion', component: expansion_a11y_1.ExpansionPanelAccessibilityDemo },
    { path: 'grid-list', component: grid_list_a11y_1.GridListAccessibilityDemo },
    { path: 'icon', component: icon_a11y_1.IconAccessibilityDemo },
    { path: 'input', component: input_a11y_1.InputAccessibilityDemo },
    { path: 'list', component: list_a11y_1.ListAccessibilityDemo },
    { path: 'menu', component: menu_a11y_1.MenuAccessibilityDemo },
    { path: 'progress-bar', component: progress_bar_a11y_1.ProgressBarAccessibilityDemo },
    { path: 'progress-spinner', component: progress_spinner_a11y_1.ProgressSpinnerAccessibilityDemo },
    { path: 'radio', component: radio_a11y_1.RadioAccessibilityDemo },
    { path: 'select', component: select_a11y_1.SelectAccessibilityDemo },
    { path: 'sidenav', component: sidenav_a11y_1.SidenavAccessibilityDemo },
    { path: 'sidenav/basic', component: basic_sidenav_a11y_1.SidenavBasicAccessibilityDemo, data: { fullscreen: true } },
    { path: 'sidenav/dual', component: dual_sidenav_a11y_1.SidenavDualAccessibilityDemo, data: { fullscreen: true } },
    { path: 'sidenav/mobile', component: mobile_sidenav_a11y_1.SidenavMobileAccessibilityDemo, data: { fullscreen: true } },
    { path: 'slide-toggle', component: slide_toggle_a11y_1.SlideToggleAccessibilityDemo },
    { path: 'slider', component: slider_a11y_1.SliderAccessibilityDemo },
    { path: 'snack-bar', component: snack_bar_a11y_1.SnackBarAccessibilityDemo },
    { path: 'tabs', component: tabs_a11y_1.TabsAccessibilityDemo, children: routes_1.TABS_DEMO_ROUTES },
    { path: 'toolbar', component: toolbar_a11y_1.ToolbarAccessibilityDemo },
    { path: 'table', component: table_a11y_1.TableAccessibilityDemo },
    { path: 'tooltip', component: tooltip_a11y_1.TooltipAccessibilityDemo },
];
//# sourceMappingURL=routes.js.map