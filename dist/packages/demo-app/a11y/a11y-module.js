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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var demo_material_module_1 = require("../demo-material-module");
var a11y_1 = require("./a11y");
var autocomplete_a11y_1 = require("./autocomplete/autocomplete-a11y");
var button_toggle_a11y_1 = require("./button-toggle/button-toggle-a11y");
var button_a11y_1 = require("./button/button-a11y");
var card_a11y_1 = require("./card/card-a11y");
var checkbox_a11y_1 = require("./checkbox/checkbox-a11y");
var chips_a11y_1 = require("./chips/chips-a11y");
var datepicker_a11y_1 = require("./datepicker/datepicker-a11y");
var dialog_a11y_1 = require("./dialog/dialog-a11y");
var expansion_a11y_1 = require("./expansion/expansion-a11y");
var grid_list_a11y_1 = require("./grid-list/grid-list-a11y");
var icon_a11y_1 = require("./icon/icon-a11y");
var input_a11y_1 = require("./input/input-a11y");
var list_a11y_1 = require("./list/list-a11y");
var menu_a11y_1 = require("./menu/menu-a11y");
var progress_bar_a11y_1 = require("./progress-bar/progress-bar-a11y");
var progress_spinner_a11y_1 = require("./progress-spinner/progress-spinner-a11y");
var radio_a11y_1 = require("./radio/radio-a11y");
var routes_1 = require("./routes");
var select_a11y_1 = require("./select/select-a11y");
var basic_sidenav_a11y_1 = require("./sidenav/basic-sidenav-a11y");
var dual_sidenav_a11y_1 = require("./sidenav/dual-sidenav-a11y");
var mobile_sidenav_a11y_1 = require("./sidenav/mobile-sidenav-a11y");
var sidenav_a11y_1 = require("./sidenav/sidenav-a11y");
var slide_toggle_a11y_1 = require("./slide-toggle/slide-toggle-a11y");
var slider_a11y_1 = require("./slider/slider-a11y");
var snack_bar_a11y_1 = require("./snack-bar/snack-bar-a11y");
var table_a11y_1 = require("./table/table-a11y");
var tabs_a11y_1 = require("./tabs/tabs-a11y");
var toolbar_a11y_1 = require("./toolbar/toolbar-a11y");
var tooltip_a11y_1 = require("./tooltip/tooltip-a11y");
var AccessibilityRoutingModule = /** @class */ (function () {
    function AccessibilityRoutingModule() {
    }
    AccessibilityRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes_1.ACCESSIBILITY_DEMO_ROUTES)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AccessibilityRoutingModule);
    return AccessibilityRoutingModule;
}());
exports.AccessibilityRoutingModule = AccessibilityRoutingModule;
var AccessibilityDemoModule = /** @class */ (function () {
    function AccessibilityDemoModule() {
    }
    AccessibilityDemoModule = __decorate([
        core_1.NgModule({
            imports: [
                AccessibilityRoutingModule,
                common_1.CommonModule,
                demo_material_module_1.DemoMaterialModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                a11y_1.AccessibilityDemo,
                a11y_1.AccessibilityHome,
                autocomplete_a11y_1.AutocompleteAccessibilityDemo,
                button_a11y_1.ButtonAccessibilityDemo,
                button_toggle_a11y_1.ButtonToggleAccessibilityDemo,
                card_a11y_1.CardAccessibilityDemo,
                checkbox_a11y_1.CheckboxAccessibilityDemo,
                chips_a11y_1.ChipsAccessibilityDemo,
                datepicker_a11y_1.DatepickerAccessibilityDemo,
                dialog_a11y_1.DialogAccessibilityDemo,
                dialog_a11y_1.DialogAddressFormDialog,
                dialog_a11y_1.DialogFruitExampleDialog,
                dialog_a11y_1.DialogNeptuneExampleDialog,
                dialog_a11y_1.DialogNeptuneIFrameDialog,
                dialog_a11y_1.DialogWelcomeExampleDialog,
                expansion_a11y_1.ExpansionPanelAccessibilityDemo,
                tabs_a11y_1.FoggyTabContent,
                grid_list_a11y_1.GridListAccessibilityDemo,
                icon_a11y_1.IconAccessibilityDemo,
                input_a11y_1.InputAccessibilityDemo,
                list_a11y_1.ListAccessibilityDemo,
                menu_a11y_1.MenuAccessibilityDemo,
                progress_bar_a11y_1.ProgressBarAccessibilityDemo,
                progress_spinner_a11y_1.ProgressSpinnerAccessibilityDemo,
                radio_a11y_1.RadioAccessibilityDemo,
                tabs_a11y_1.RainyTabContent,
                select_a11y_1.SelectAccessibilityDemo,
                sidenav_a11y_1.SidenavAccessibilityDemo,
                basic_sidenav_a11y_1.SidenavBasicAccessibilityDemo,
                dual_sidenav_a11y_1.SidenavDualAccessibilityDemo,
                mobile_sidenav_a11y_1.SidenavMobileAccessibilityDemo,
                slide_toggle_a11y_1.SlideToggleAccessibilityDemo,
                slider_a11y_1.SliderAccessibilityDemo,
                snack_bar_a11y_1.SnackBarAccessibilityDemo,
                tabs_a11y_1.SunnyTabContent,
                table_a11y_1.TableAccessibilityDemo,
                tabs_a11y_1.TabsAccessibilityDemo,
                toolbar_a11y_1.ToolbarAccessibilityDemo,
                tooltip_a11y_1.TooltipAccessibilityDemo,
            ],
            entryComponents: [
                dialog_a11y_1.DialogAccessibilityDemo,
                dialog_a11y_1.DialogAddressFormDialog,
                dialog_a11y_1.DialogFruitExampleDialog,
                dialog_a11y_1.DialogNeptuneExampleDialog,
                dialog_a11y_1.DialogNeptuneIFrameDialog,
                dialog_a11y_1.DialogWelcomeExampleDialog,
                tabs_a11y_1.FoggyTabContent,
                tabs_a11y_1.RainyTabContent,
                tabs_a11y_1.SunnyTabContent,
            ]
        })
    ], AccessibilityDemoModule);
    return AccessibilityDemoModule;
}());
exports.AccessibilityDemoModule = AccessibilityDemoModule;
//# sourceMappingURL=a11y-module.js.map