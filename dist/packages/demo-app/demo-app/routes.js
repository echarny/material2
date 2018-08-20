"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("../a11y/a11y");
var routes_1 = require("../a11y/routes");
var autocomplete_demo_1 = require("../autocomplete/autocomplete-demo");
var bottom_sheet_demo_1 = require("../bottom-sheet/bottom-sheet-demo");
var baseline_demo_1 = require("../baseline/baseline-demo");
var button_toggle_demo_1 = require("../button-toggle/button-toggle-demo");
var button_demo_1 = require("../button/button-demo");
var card_demo_1 = require("../card/card-demo");
var checkbox_demo_1 = require("../checkbox/checkbox-demo");
var chips_demo_1 = require("../chips/chips-demo");
var datepicker_demo_1 = require("../datepicker/datepicker-demo");
var dialog_demo_1 = require("../dialog/dialog-demo");
var drawer_demo_1 = require("../drawer/drawer-demo");
var expansion_demo_1 = require("../expansion/expansion-demo");
var focus_origin_demo_1 = require("../focus-origin/focus-origin-demo");
var gestures_demo_1 = require("../gestures/gestures-demo");
var grid_list_demo_1 = require("../grid-list/grid-list-demo");
var icon_demo_1 = require("../icon/icon-demo");
var input_demo_1 = require("../input/input-demo");
var list_demo_1 = require("../list/list-demo");
var live_announcer_demo_1 = require("../live-announcer/live-announcer-demo");
var menu_demo_1 = require("../menu/menu-demo");
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
var tabs_demo_1 = require("../tabs/tabs-demo");
var toolbar_demo_1 = require("../toolbar/toolbar-demo");
var tooltip_demo_1 = require("../tooltip/tooltip-demo");
var tree_demo_1 = require("../tree/tree-demo");
var typography_demo_1 = require("../typography/typography-demo");
var virtual_scroll_demo_1 = require("../virtual-scroll/virtual-scroll-demo");
var demo_app_1 = require("./demo-app");
var badge_demo_1 = require("../badge/badge-demo");
var connected_overlay_demo_1 = require("../connected-overlay/connected-overlay-demo");
var paginator_demo_1 = require("../paginator/paginator-demo");
var examples_page_1 = require("../examples-page/examples-page");
var table_demo_1 = require("../table/table-demo");
var drag_drop_demo_1 = require("../drag-drop/drag-drop-demo");
exports.DEMO_APP_ROUTES = [
    { path: '', component: demo_app_1.DemoApp, children: [
            { path: '', component: demo_app_1.Home },
            { path: 'autocomplete', component: autocomplete_demo_1.AutocompleteDemo },
            { path: 'badge', component: badge_demo_1.BadgeDemo },
            { path: 'bottom-sheet', component: bottom_sheet_demo_1.BottomSheetDemo },
            { path: 'baseline', component: baseline_demo_1.BaselineDemo },
            { path: 'button', component: button_demo_1.ButtonDemo },
            { path: 'button-toggle', component: button_toggle_demo_1.ButtonToggleDemo },
            { path: 'card', component: card_demo_1.CardDemo },
            { path: 'checkbox', component: checkbox_demo_1.CheckboxDemo },
            { path: 'chips', component: chips_demo_1.ChipsDemo },
            { path: 'datepicker', component: datepicker_demo_1.DatepickerDemo },
            { path: 'dialog', component: dialog_demo_1.DialogDemo },
            { path: 'drawer', component: drawer_demo_1.DrawerDemo },
            { path: 'drag-drop', component: drag_drop_demo_1.DragAndDropDemo },
            { path: 'expansion', component: expansion_demo_1.ExpansionDemo },
            { path: 'focus-origin', component: focus_origin_demo_1.FocusOriginDemo },
            { path: 'gestures', component: gestures_demo_1.GesturesDemo },
            { path: 'grid-list', component: grid_list_demo_1.GridListDemo },
            { path: 'icon', component: icon_demo_1.IconDemo },
            { path: 'input', component: input_demo_1.InputDemo },
            { path: 'list', component: list_demo_1.ListDemo },
            { path: 'live-announcer', component: live_announcer_demo_1.LiveAnnouncerDemo },
            { path: 'menu', component: menu_demo_1.MenuDemo },
            { path: 'paginator', component: paginator_demo_1.PaginatorDemo },
            { path: 'platform', component: platform_demo_1.PlatformDemo },
            { path: 'portal', component: portal_demo_1.PortalDemo },
            { path: 'progress-bar', component: progress_bar_demo_1.ProgressBarDemo },
            { path: 'progress-spinner', component: progress_spinner_demo_1.ProgressSpinnerDemo },
            { path: 'radio', component: radio_demo_1.RadioDemo },
            { path: 'ripple', component: ripple_demo_1.RippleDemo },
            { path: 'select', component: select_demo_1.SelectDemo },
            { path: 'sidenav', component: sidenav_demo_1.SidenavDemo },
            { path: 'slide-toggle', component: slide_toggle_demo_1.SlideToggleDemo },
            { path: 'slider', component: slider_demo_1.SliderDemo },
            { path: 'snack-bar', component: snack_bar_demo_1.SnackBarDemo },
            { path: 'stepper', component: stepper_demo_1.StepperDemo },
            { path: 'table', component: table_demo_1.TableDemo },
            { path: 'tabs', component: tabs_demo_1.TabsDemo },
            { path: 'toolbar', component: toolbar_demo_1.ToolbarDemo },
            { path: 'tooltip', component: tooltip_demo_1.TooltipDemo },
            { path: 'tree', component: tree_demo_1.TreeDemo },
            { path: 'typography', component: typography_demo_1.TypographyDemo },
            { path: 'expansion', component: expansion_demo_1.ExpansionDemo },
            { path: 'stepper', component: stepper_demo_1.StepperDemo },
            { path: 'screen-type', component: screen_type_demo_1.ScreenTypeDemo },
            { path: 'connected-overlay', component: connected_overlay_demo_1.ConnectedOverlayDemo },
            { path: 'virtual-scroll', component: virtual_scroll_demo_1.VirtualScrollDemo },
            { path: 'examples', component: examples_page_1.ExamplesPage },
        ] }
];
exports.ALL_ROUTES = [
    { path: '', component: demo_app_1.DemoApp, children: exports.DEMO_APP_ROUTES },
    { path: 'accessibility', component: a11y_1.AccessibilityDemo, children: routes_1.ACCESSIBILITY_DEMO_ROUTES },
];
//# sourceMappingURL=routes.js.map