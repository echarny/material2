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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = require("@angular/cdk/layout");
var overlay_1 = require("@angular/cdk/overlay");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var elements_1 = require("@angular/elements");
var forms_1 = require("@angular/forms");
var material_examples_1 = require("@angular/material-examples");
var router_1 = require("@angular/router");
var autocomplete_demo_1 = require("../autocomplete/autocomplete-demo");
var badge_demo_1 = require("../badge/badge-demo");
var baseline_demo_1 = require("../baseline/baseline-demo");
var bottom_sheet_demo_1 = require("../bottom-sheet/bottom-sheet-demo");
var button_toggle_demo_1 = require("../button-toggle/button-toggle-demo");
var button_demo_1 = require("../button/button-demo");
var card_demo_1 = require("../card/card-demo");
var checkbox_demo_1 = require("../checkbox/checkbox-demo");
var chips_demo_1 = require("../chips/chips-demo");
var connected_overlay_demo_1 = require("../connected-overlay/connected-overlay-demo");
var datepicker_demo_1 = require("../datepicker/datepicker-demo");
var demo_material_module_1 = require("../demo-material-module");
var dialog_demo_1 = require("../dialog/dialog-demo");
var drawer_demo_1 = require("../drawer/drawer-demo");
var example_module_1 = require("../example/example-module");
var examples_page_1 = require("../examples-page/examples-page");
var expansion_demo_1 = require("../expansion/expansion-demo");
var focus_origin_demo_1 = require("../focus-origin/focus-origin-demo");
var gestures_demo_1 = require("../gestures/gestures-demo");
var grid_list_demo_1 = require("../grid-list/grid-list-demo");
var icon_demo_1 = require("../icon/icon-demo");
var input_demo_1 = require("../input/input-demo");
var list_demo_1 = require("../list/list-demo");
var live_announcer_demo_1 = require("../live-announcer/live-announcer-demo");
var menu_demo_1 = require("../menu/menu-demo");
var paginator_demo_1 = require("../paginator/paginator-demo");
var platform_demo_1 = require("../platform/platform-demo");
var portal_demo_1 = require("../portal/portal-demo");
var progress_bar_demo_1 = require("../progress-bar/progress-bar-demo");
var progress_spinner_demo_1 = require("../progress-spinner/progress-spinner-demo");
var radio_demo_1 = require("../radio/radio-demo");
var ripple_demo_1 = require("../ripple/ripple-demo");
var screen_type_demo_1 = require("../screen-type/screen-type-demo");
var select_demo_1 = require("../select/select-demo");
var sidenav_demo_1 = require("../sidenav/sidenav-demo");
var slide_toggle_demo_1 = require("../slide-toggle/slide-toggle-demo");
var slider_demo_1 = require("../slider/slider-demo");
var snack_bar_demo_1 = require("../snack-bar/snack-bar-demo");
var stepper_demo_1 = require("../stepper/stepper-demo");
var table_demo_module_1 = require("../table/table-demo-module");
var tabs_demo_1 = require("../tabs/tabs-demo");
var toolbar_demo_1 = require("../toolbar/toolbar-demo");
var tooltip_demo_1 = require("../tooltip/tooltip-demo");
var tree_demo_module_1 = require("../tree/tree-demo-module");
var typography_demo_1 = require("../typography/typography-demo");
var virtual_scroll_demo_1 = require("../virtual-scroll/virtual-scroll-demo");
var demo_app_1 = require("./demo-app");
var routes_1 = require("./routes");
var drag_drop_demo_1 = require("../drag-drop/drag-drop-demo");
var DemoModule = /** @class */ (function () {
    function DemoModule(injector) {
        // Register examples as custom elements so that they can be inserted into the DOM dynamically
        Object.keys(material_examples_1.EXAMPLE_COMPONENTS).forEach(function (key) {
            var element = elements_1.createCustomElement(material_examples_1.EXAMPLE_COMPONENTS[key].component, { injector: injector });
            customElements.define(key, element);
        });
    }
    DemoModule = __decorate([
        core_1.NgModule({
            imports: [
                example_module_1.MaterialExampleModule,
                material_examples_1.ExampleModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forChild(routes_1.DEMO_APP_ROUTES),
                demo_material_module_1.DemoMaterialModule,
                layout_1.LayoutModule,
                table_demo_module_1.TableDemoModule,
                tree_demo_module_1.TreeDemoModule,
            ],
            declarations: [
                examples_page_1.ExamplesPage,
                autocomplete_demo_1.AutocompleteDemo,
                badge_demo_1.BadgeDemo,
                baseline_demo_1.BaselineDemo,
                bottom_sheet_demo_1.BottomSheetDemo,
                button_demo_1.ButtonDemo,
                button_toggle_demo_1.ButtonToggleDemo,
                card_demo_1.CardDemo,
                checkbox_demo_1.CheckboxDemo,
                chips_demo_1.ChipsDemo,
                connected_overlay_demo_1.ConnectedOverlayDemo,
                dialog_demo_1.ContentElementDialog,
                datepicker_demo_1.CustomHeader,
                datepicker_demo_1.DatepickerDemo,
                demo_app_1.DemoApp,
                dialog_demo_1.DialogDemo,
                drawer_demo_1.DrawerDemo,
                bottom_sheet_demo_1.ExampleBottomSheet,
                drag_drop_demo_1.DragAndDropDemo,
                expansion_demo_1.ExpansionDemo,
                focus_origin_demo_1.FocusOriginDemo,
                gestures_demo_1.GesturesDemo,
                grid_list_demo_1.GridListDemo,
                demo_app_1.Home,
                dialog_demo_1.IFrameDialog,
                icon_demo_1.IconDemo,
                input_demo_1.InputDemo,
                dialog_demo_1.JazzDialog,
                list_demo_1.ListDemo,
                live_announcer_demo_1.LiveAnnouncerDemo,
                checkbox_demo_1.MatCheckboxDemoNestedChecklist,
                menu_demo_1.MenuDemo,
                paginator_demo_1.PaginatorDemo,
                platform_demo_1.PlatformDemo,
                portal_demo_1.PortalDemo,
                progress_bar_demo_1.ProgressBarDemo,
                progress_spinner_demo_1.ProgressSpinnerDemo,
                radio_demo_1.RadioDemo,
                ripple_demo_1.RippleDemo,
                portal_demo_1.ScienceJoke,
                screen_type_demo_1.ScreenTypeDemo,
                select_demo_1.SelectDemo,
                sidenav_demo_1.SidenavDemo,
                slide_toggle_demo_1.SlideToggleDemo,
                slider_demo_1.SliderDemo,
                snack_bar_demo_1.SnackBarDemo,
                stepper_demo_1.StepperDemo,
                tabs_demo_1.TabsDemo,
                toolbar_demo_1.ToolbarDemo,
                tooltip_demo_1.TooltipDemo,
                typography_demo_1.TypographyDemo,
                virtual_scroll_demo_1.VirtualScrollDemo,
            ],
            providers: [
                { provide: overlay_1.OverlayContainer, useClass: overlay_1.FullscreenOverlayContainer },
            ],
            entryComponents: [
                dialog_demo_1.ContentElementDialog,
                datepicker_demo_1.CustomHeader,
                demo_app_1.DemoApp,
                bottom_sheet_demo_1.ExampleBottomSheet,
                dialog_demo_1.IFrameDialog,
                dialog_demo_1.JazzDialog,
                portal_demo_1.ScienceJoke,
            ],
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], DemoModule);
    return DemoModule;
}());
exports.DemoModule = DemoModule;
//# sourceMappingURL=demo-module.js.map