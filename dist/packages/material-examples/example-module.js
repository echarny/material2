"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var material_module_1 = require("./material-module");
var autocomplete_auto_active_first_option_example_1 = require("./autocomplete-auto-active-first-option/autocomplete-auto-active-first-option-example");
var autocomplete_display_example_1 = require("./autocomplete-display/autocomplete-display-example");
var autocomplete_filter_example_1 = require("./autocomplete-filter/autocomplete-filter-example");
var autocomplete_optgroup_example_1 = require("./autocomplete-optgroup/autocomplete-optgroup-example");
var autocomplete_overview_example_1 = require("./autocomplete-overview/autocomplete-overview-example");
var autocomplete_simple_example_1 = require("./autocomplete-simple/autocomplete-simple-example");
var badge_overview_example_1 = require("./badge-overview/badge-overview-example");
var bottom_sheet_overview_example_1 = require("./bottom-sheet-overview/bottom-sheet-overview-example");
var button_overview_example_1 = require("./button-overview/button-overview-example");
var button_toggle_exclusive_example_1 = require("./button-toggle-exclusive/button-toggle-exclusive-example");
var button_toggle_overview_example_1 = require("./button-toggle-overview/button-toggle-overview-example");
var button_types_example_1 = require("./button-types/button-types-example");
var card_fancy_example_1 = require("./card-fancy/card-fancy-example");
var card_overview_example_1 = require("./card-overview/card-overview-example");
var cdk_table_basic_flex_example_1 = require("./cdk-table-basic-flex/cdk-table-basic-flex-example");
var cdk_table_basic_example_1 = require("./cdk-table-basic/cdk-table-basic-example");
var cdk_tree_flat_example_1 = require("./cdk-tree-flat/cdk-tree-flat-example");
var cdk_tree_nested_example_1 = require("./cdk-tree-nested/cdk-tree-nested-example");
var checkbox_configurable_example_1 = require("./checkbox-configurable/checkbox-configurable-example");
var checkbox_overview_example_1 = require("./checkbox-overview/checkbox-overview-example");
var chips_autocomplete_example_1 = require("./chips-autocomplete/chips-autocomplete-example");
var chips_input_example_1 = require("./chips-input/chips-input-example");
var chips_overview_example_1 = require("./chips-overview/chips-overview-example");
var chips_stacked_example_1 = require("./chips-stacked/chips-stacked-example");
var datepicker_api_example_1 = require("./datepicker-api/datepicker-api-example");
var datepicker_color_example_1 = require("./datepicker-color/datepicker-color-example");
var datepicker_custom_header_example_1 = require("./datepicker-custom-header/datepicker-custom-header-example");
var datepicker_custom_icon_example_1 = require("./datepicker-custom-icon/datepicker-custom-icon-example");
var datepicker_disabled_example_1 = require("./datepicker-disabled/datepicker-disabled-example");
var datepicker_events_example_1 = require("./datepicker-events/datepicker-events-example");
var datepicker_filter_example_1 = require("./datepicker-filter/datepicker-filter-example");
var datepicker_formats_example_1 = require("./datepicker-formats/datepicker-formats-example");
var datepicker_locale_example_1 = require("./datepicker-locale/datepicker-locale-example");
var datepicker_min_max_example_1 = require("./datepicker-min-max/datepicker-min-max-example");
var datepicker_moment_example_1 = require("./datepicker-moment/datepicker-moment-example");
var datepicker_overview_example_1 = require("./datepicker-overview/datepicker-overview-example");
var datepicker_start_view_example_1 = require("./datepicker-start-view/datepicker-start-view-example");
var datepicker_touch_example_1 = require("./datepicker-touch/datepicker-touch-example");
var datepicker_value_example_1 = require("./datepicker-value/datepicker-value-example");
var datepicker_views_selection_example_1 = require("./datepicker-views-selection/datepicker-views-selection-example");
var dialog_content_example_1 = require("./dialog-content/dialog-content-example");
var dialog_data_example_1 = require("./dialog-data/dialog-data-example");
var dialog_elements_example_1 = require("./dialog-elements/dialog-elements-example");
var dialog_overview_example_1 = require("./dialog-overview/dialog-overview-example");
var divider_overview_example_1 = require("./divider-overview/divider-overview-example");
var elevation_overview_example_1 = require("./elevation-overview/elevation-overview-example");
var expansion_expand_collapse_all_example_1 = require("./expansion-expand-collapse-all/expansion-expand-collapse-all-example");
var expansion_overview_example_1 = require("./expansion-overview/expansion-overview-example");
var expansion_steps_example_1 = require("./expansion-steps/expansion-steps-example");
var focus_monitor_directives_example_1 = require("./focus-monitor-directives/focus-monitor-directives-example");
var focus_monitor_focus_via_example_1 = require("./focus-monitor-focus-via/focus-monitor-focus-via-example");
var focus_monitor_overview_example_1 = require("./focus-monitor-overview/focus-monitor-overview-example");
var form_field_appearance_example_1 = require("./form-field-appearance/form-field-appearance-example");
var form_field_custom_control_example_1 = require("./form-field-custom-control/form-field-custom-control-example");
var form_field_error_example_1 = require("./form-field-error/form-field-error-example");
var form_field_hint_example_1 = require("./form-field-hint/form-field-hint-example");
var form_field_label_example_1 = require("./form-field-label/form-field-label-example");
var form_field_overview_example_1 = require("./form-field-overview/form-field-overview-example");
var form_field_prefix_suffix_example_1 = require("./form-field-prefix-suffix/form-field-prefix-suffix-example");
var form_field_theming_example_1 = require("./form-field-theming/form-field-theming-example");
var grid_list_dynamic_example_1 = require("./grid-list-dynamic/grid-list-dynamic-example");
var grid_list_overview_example_1 = require("./grid-list-overview/grid-list-overview-example");
var icon_overview_example_1 = require("./icon-overview/icon-overview-example");
var icon_svg_example_1 = require("./icon-svg/icon-svg-example");
var input_clearable_example_1 = require("./input-clearable/input-clearable-example");
var input_error_state_matcher_example_1 = require("./input-error-state-matcher/input-error-state-matcher-example");
var input_errors_example_1 = require("./input-errors/input-errors-example");
var input_form_example_1 = require("./input-form/input-form-example");
var input_hint_example_1 = require("./input-hint/input-hint-example");
var input_overview_example_1 = require("./input-overview/input-overview-example");
var input_prefix_suffix_example_1 = require("./input-prefix-suffix/input-prefix-suffix-example");
var list_overview_example_1 = require("./list-overview/list-overview-example");
var list_sections_example_1 = require("./list-sections/list-sections-example");
var list_selection_example_1 = require("./list-selection/list-selection-example");
var menu_icons_example_1 = require("./menu-icons/menu-icons-example");
var menu_overview_example_1 = require("./menu-overview/menu-overview-example");
var nested_menu_example_1 = require("./nested-menu/nested-menu-example");
var paginator_configurable_example_1 = require("./paginator-configurable/paginator-configurable-example");
var paginator_overview_example_1 = require("./paginator-overview/paginator-overview-example");
var progress_bar_buffer_example_1 = require("./progress-bar-buffer/progress-bar-buffer-example");
var progress_bar_configurable_example_1 = require("./progress-bar-configurable/progress-bar-configurable-example");
var progress_bar_determinate_example_1 = require("./progress-bar-determinate/progress-bar-determinate-example");
var progress_bar_indeterminate_example_1 = require("./progress-bar-indeterminate/progress-bar-indeterminate-example");
var progress_bar_query_example_1 = require("./progress-bar-query/progress-bar-query-example");
var progress_spinner_configurable_example_1 = require("./progress-spinner-configurable/progress-spinner-configurable-example");
var progress_spinner_overview_example_1 = require("./progress-spinner-overview/progress-spinner-overview-example");
var radio_ng_model_example_1 = require("./radio-ng-model/radio-ng-model-example");
var radio_overview_example_1 = require("./radio-overview/radio-overview-example");
var ripple_overview_example_1 = require("./ripple-overview/ripple-overview-example");
var select_custom_trigger_example_1 = require("./select-custom-trigger/select-custom-trigger-example");
var select_disabled_example_1 = require("./select-disabled/select-disabled-example");
var select_error_state_matcher_example_1 = require("./select-error-state-matcher/select-error-state-matcher-example");
var select_form_example_1 = require("./select-form/select-form-example");
var select_hint_error_example_1 = require("./select-hint-error/select-hint-error-example");
var select_multiple_example_1 = require("./select-multiple/select-multiple-example");
var select_no_ripple_example_1 = require("./select-no-ripple/select-no-ripple-example");
var select_optgroup_example_1 = require("./select-optgroup/select-optgroup-example");
var select_overview_example_1 = require("./select-overview/select-overview-example");
var select_panel_class_example_1 = require("./select-panel-class/select-panel-class-example");
var select_reset_example_1 = require("./select-reset/select-reset-example");
var select_value_binding_example_1 = require("./select-value-binding/select-value-binding-example");
var sidenav_autosize_example_1 = require("./sidenav-autosize/sidenav-autosize-example");
var sidenav_backdrop_example_1 = require("./sidenav-backdrop/sidenav-backdrop-example");
var sidenav_disable_close_example_1 = require("./sidenav-disable-close/sidenav-disable-close-example");
var sidenav_drawer_overview_example_1 = require("./sidenav-drawer-overview/sidenav-drawer-overview-example");
var sidenav_fixed_example_1 = require("./sidenav-fixed/sidenav-fixed-example");
var sidenav_mode_example_1 = require("./sidenav-mode/sidenav-mode-example");
var sidenav_open_close_example_1 = require("./sidenav-open-close/sidenav-open-close-example");
var sidenav_overview_example_1 = require("./sidenav-overview/sidenav-overview-example");
var sidenav_position_example_1 = require("./sidenav-position/sidenav-position-example");
var sidenav_responsive_example_1 = require("./sidenav-responsive/sidenav-responsive-example");
var slide_toggle_configurable_example_1 = require("./slide-toggle-configurable/slide-toggle-configurable-example");
var slide_toggle_forms_example_1 = require("./slide-toggle-forms/slide-toggle-forms-example");
var slide_toggle_overview_example_1 = require("./slide-toggle-overview/slide-toggle-overview-example");
var slider_configurable_example_1 = require("./slider-configurable/slider-configurable-example");
var slider_formatting_example_1 = require("./slider-formatting/slider-formatting-example");
var slider_overview_example_1 = require("./slider-overview/slider-overview-example");
var snack_bar_component_example_1 = require("./snack-bar-component/snack-bar-component-example");
var snack_bar_overview_example_1 = require("./snack-bar-overview/snack-bar-overview-example");
var snack_bar_position_example_1 = require("./snack-bar-position/snack-bar-position-example");
var sort_overview_example_1 = require("./sort-overview/sort-overview-example");
var stepper_editable_example_1 = require("./stepper-editable/stepper-editable-example");
var stepper_optional_example_1 = require("./stepper-optional/stepper-optional-example");
var stepper_overview_example_1 = require("./stepper-overview/stepper-overview-example");
var stepper_vertical_example_1 = require("./stepper-vertical/stepper-vertical-example");
var tab_group_async_example_1 = require("./tab-group-async/tab-group-async-example");
var tab_group_basic_example_1 = require("./tab-group-basic/tab-group-basic-example");
var tab_group_custom_label_example_1 = require("./tab-group-custom-label/tab-group-custom-label-example");
var tab_group_dynamic_height_example_1 = require("./tab-group-dynamic-height/tab-group-dynamic-height-example");
var tab_group_dynamic_example_1 = require("./tab-group-dynamic/tab-group-dynamic-example");
var tab_group_header_below_example_1 = require("./tab-group-header-below/tab-group-header-below-example");
var tab_group_lazy_loaded_example_1 = require("./tab-group-lazy-loaded/tab-group-lazy-loaded-example");
var tab_group_stretched_example_1 = require("./tab-group-stretched/tab-group-stretched-example");
var tab_group_theme_example_1 = require("./tab-group-theme/tab-group-theme-example");
var tab_nav_bar_basic_example_1 = require("./tab-nav-bar-basic/tab-nav-bar-basic-example");
var table_basic_flex_example_1 = require("./table-basic-flex/table-basic-flex-example");
var table_basic_example_1 = require("./table-basic/table-basic-example");
var table_dynamic_columns_example_1 = require("./table-dynamic-columns/table-dynamic-columns-example");
var table_expandable_rows_example_1 = require("./table-expandable-rows/table-expandable-rows-example");
var table_filtering_example_1 = require("./table-filtering/table-filtering-example");
var table_footer_row_example_1 = require("./table-footer-row/table-footer-row-example");
var table_http_example_1 = require("./table-http/table-http-example");
var table_multiple_header_footer_example_1 = require("./table-multiple-header-footer/table-multiple-header-footer-example");
var table_overview_example_1 = require("./table-overview/table-overview-example");
var table_pagination_example_1 = require("./table-pagination/table-pagination-example");
var table_row_context_example_1 = require("./table-row-context/table-row-context-example");
var table_selection_example_1 = require("./table-selection/table-selection-example");
var table_sorting_example_1 = require("./table-sorting/table-sorting-example");
var table_sticky_columns_example_1 = require("./table-sticky-columns/table-sticky-columns-example");
var table_sticky_complex_flex_example_1 = require("./table-sticky-complex-flex/table-sticky-complex-flex-example");
var table_sticky_complex_example_1 = require("./table-sticky-complex/table-sticky-complex-example");
var table_sticky_footer_example_1 = require("./table-sticky-footer/table-sticky-footer-example");
var table_sticky_header_example_1 = require("./table-sticky-header/table-sticky-header-example");
var text_field_autofill_directive_example_1 = require("./text-field-autofill-directive/text-field-autofill-directive-example");
var text_field_autofill_monitor_example_1 = require("./text-field-autofill-monitor/text-field-autofill-monitor-example");
var text_field_autosize_textarea_example_1 = require("./text-field-autosize-textarea/text-field-autosize-textarea-example");
var toolbar_multirow_example_1 = require("./toolbar-multirow/toolbar-multirow-example");
var toolbar_overview_example_1 = require("./toolbar-overview/toolbar-overview-example");
var tooltip_auto_hide_example_1 = require("./tooltip-auto-hide/tooltip-auto-hide-example");
var tooltip_custom_class_example_1 = require("./tooltip-custom-class/tooltip-custom-class-example");
var tooltip_delay_example_1 = require("./tooltip-delay/tooltip-delay-example");
var tooltip_disabled_example_1 = require("./tooltip-disabled/tooltip-disabled-example");
var tooltip_manual_example_1 = require("./tooltip-manual/tooltip-manual-example");
var tooltip_message_example_1 = require("./tooltip-message/tooltip-message-example");
var tooltip_modified_defaults_example_1 = require("./tooltip-modified-defaults/tooltip-modified-defaults-example");
var tooltip_overview_example_1 = require("./tooltip-overview/tooltip-overview-example");
var tooltip_position_example_1 = require("./tooltip-position/tooltip-position-example");
var tree_checklist_example_1 = require("./tree-checklist/tree-checklist-example");
var tree_dynamic_example_1 = require("./tree-dynamic/tree-dynamic-example");
var tree_flat_overview_example_1 = require("./tree-flat-overview/tree-flat-overview-example");
var tree_loadmore_example_1 = require("./tree-loadmore/tree-loadmore-example");
var tree_nested_overview_example_1 = require("./tree-nested-overview/tree-nested-overview-example");
exports.EXAMPLE_COMPONENTS = {
    'autocomplete-auto-active-first-option': {
        title: 'Highlight the first autocomplete option',
        component: autocomplete_auto_active_first_option_example_1.AutocompleteAutoActiveFirstOptionExample
    },
    'autocomplete-display': {
        title: 'Display value autocomplete',
        component: autocomplete_display_example_1.AutocompleteDisplayExample
    },
    'autocomplete-filter': {
        title: 'Filter autocomplete',
        component: autocomplete_filter_example_1.AutocompleteFilterExample
    },
    'autocomplete-optgroup': {
        title: 'Option groups autocomplete',
        component: autocomplete_optgroup_example_1.AutocompleteOptgroupExample
    },
    'autocomplete-overview': {
        title: 'Autocomplete overview',
        component: autocomplete_overview_example_1.AutocompleteOverviewExample
    },
    'autocomplete-simple': {
        title: 'Simple autocomplete',
        component: autocomplete_simple_example_1.AutocompleteSimpleExample
    },
    'badge-overview': {
        title: 'Badge overview',
        component: badge_overview_example_1.BadgeOverviewExample
    },
    'bottom-sheet-overview': {
        title: 'Bottom Sheet Overview',
        component: bottom_sheet_overview_example_1.BottomSheetOverviewExample,
        additionalFiles: ["bottom-sheet-overview-example-sheet.html"],
        selectorName: 'BottomSheetOverviewExample, BottomSheetOverviewExampleSheet'
    },
    'button-overview': {
        title: 'Basic buttons',
        component: button_overview_example_1.ButtonOverviewExample
    },
    'button-toggle-exclusive': {
        title: 'Exclusive selection',
        component: button_toggle_exclusive_example_1.ButtonToggleExclusiveExample
    },
    'button-toggle-overview': {
        title: 'Basic button-toggles',
        component: button_toggle_overview_example_1.ButtonToggleOverviewExample
    },
    'button-types': {
        title: 'Button varieties',
        component: button_types_example_1.ButtonTypesExample
    },
    'card-fancy': {
        title: 'Card with multiple sections',
        component: card_fancy_example_1.CardFancyExample
    },
    'card-overview': {
        title: 'Basic cards',
        component: card_overview_example_1.CardOverviewExample
    },
    'cdk-table-basic-flex': {
        title: 'Basic use of `<cdk-table>` (uses display flex)',
        component: cdk_table_basic_flex_example_1.CdkTableBasicFlexExample
    },
    'cdk-table-basic': {
        title: 'Basic CDK data-table',
        component: cdk_table_basic_example_1.CdkTableBasicExample
    },
    'cdk-tree-flat': {
        title: 'Tree with flat nodes',
        component: cdk_tree_flat_example_1.CdkTreeFlatExample
    },
    'cdk-tree-nested': {
        title: 'Tree with nested nodes',
        component: cdk_tree_nested_example_1.CdkTreeNestedExample
    },
    'checkbox-configurable': {
        title: 'Configurable checkbox',
        component: checkbox_configurable_example_1.CheckboxConfigurableExample
    },
    'checkbox-overview': {
        title: 'Basic checkboxes',
        component: checkbox_overview_example_1.CheckboxOverviewExample
    },
    'chips-autocomplete': {
        title: 'Chips Autocomplete',
        component: chips_autocomplete_example_1.ChipsAutocompleteExample
    },
    'chips-input': {
        title: 'Chips with input',
        component: chips_input_example_1.ChipsInputExample
    },
    'chips-overview': {
        title: 'Basic chips',
        component: chips_overview_example_1.ChipsOverviewExample
    },
    'chips-stacked': {
        title: 'Stacked chips',
        component: chips_stacked_example_1.ChipsStackedExample
    },
    'datepicker-api': {
        title: 'Datepicker open method',
        component: datepicker_api_example_1.DatepickerApiExample
    },
    'datepicker-color': {
        title: 'Datepicker palette colors',
        component: datepicker_color_example_1.DatepickerColorExample
    },
    'datepicker-custom-header': {
        title: 'Datepicker with custom calendar header',
        component: datepicker_custom_header_example_1.DatepickerCustomHeaderExample,
        selectorName: 'DatepickerCustomHeaderExample, ExampleHeader'
    },
    'datepicker-custom-icon': {
        title: 'Datepicker with custom icon',
        component: datepicker_custom_icon_example_1.DatepickerCustomIconExample
    },
    'datepicker-disabled': {
        title: 'Disabled datepicker',
        component: datepicker_disabled_example_1.DatepickerDisabledExample
    },
    'datepicker-events': {
        title: 'Datepicker input and change events',
        component: datepicker_events_example_1.DatepickerEventsExample
    },
    'datepicker-filter': {
        title: 'Datepicker with filter validation',
        component: datepicker_filter_example_1.DatepickerFilterExample
    },
    'datepicker-formats': {
        title: 'Datepicker with custom formats',
        component: datepicker_formats_example_1.DatepickerFormatsExample
    },
    'datepicker-locale': {
        title: 'Datepicker with different locale',
        component: datepicker_locale_example_1.DatepickerLocaleExample
    },
    'datepicker-min-max': {
        title: 'Datepicker with min & max validation',
        component: datepicker_min_max_example_1.DatepickerMinMaxExample
    },
    'datepicker-moment': {
        title: 'Datepicker that uses Moment.js dates',
        component: datepicker_moment_example_1.DatepickerMomentExample
    },
    'datepicker-overview': {
        title: 'Basic datepicker',
        component: datepicker_overview_example_1.DatepickerOverviewExample
    },
    'datepicker-start-view': {
        title: 'Datepicker start date',
        component: datepicker_start_view_example_1.DatepickerStartViewExample
    },
    'datepicker-touch': {
        title: 'Datepicker touch UI',
        component: datepicker_touch_example_1.DatepickerTouchExample
    },
    'datepicker-value': {
        title: 'Datepicker selected value',
        component: datepicker_value_example_1.DatepickerValueExample
    },
    'datepicker-views-selection': {
        title: 'Datepicker emulating a Year and month picker',
        component: datepicker_views_selection_example_1.DatepickerViewsSelectionExample
    },
    'dialog-content': {
        title: 'Dialog with header, scrollable content and actions',
        component: dialog_content_example_1.DialogContentExample,
        additionalFiles: ["dialog-content-example-dialog.html"],
        selectorName: 'DialogContentExample, DialogContentExampleDialog'
    },
    'dialog-data': {
        title: 'Injecting data when opening a dialog',
        component: dialog_data_example_1.DialogDataExample,
        additionalFiles: ["dialog-data-example-dialog.html"],
        selectorName: 'DialogDataExample, DialogDataExampleDialog'
    },
    'dialog-elements': {
        title: 'Dialog elements',
        component: dialog_elements_example_1.DialogElementsExample,
        additionalFiles: ["dialog-elements-example-dialog.html"],
        selectorName: 'DialogElementsExample, DialogElementsExampleDialog'
    },
    'dialog-overview': {
        title: 'Dialog Overview',
        component: dialog_overview_example_1.DialogOverviewExample,
        additionalFiles: ["dialog-overview-example-dialog.html"],
        selectorName: 'DialogOverviewExample, DialogOverviewExampleDialog'
    },
    'divider-overview': {
        title: 'Basic divider',
        component: divider_overview_example_1.DividerOverviewExample
    },
    'elevation-overview': {
        title: 'Elevation CSS classes',
        component: elevation_overview_example_1.ElevationOverviewExample
    },
    'expansion-expand-collapse-all': {
        title: 'Accordion with expand/collapse all toggles',
        component: expansion_expand_collapse_all_example_1.ExpansionExpandCollapseAllExample
    },
    'expansion-overview': {
        title: 'Basic expansion panel',
        component: expansion_overview_example_1.ExpansionOverviewExample
    },
    'expansion-steps': {
        title: 'Expansion panel as accordion',
        component: expansion_steps_example_1.ExpansionStepsExample
    },
    'focus-monitor-directives': {
        title: 'Monitoring focus with FocusMonitor',
        component: focus_monitor_directives_example_1.FocusMonitorDirectivesExample
    },
    'focus-monitor-focus-via': {
        title: 'Focusing with a specific FocusOrigin',
        component: focus_monitor_focus_via_example_1.FocusMonitorFocusViaExample
    },
    'focus-monitor-overview': {
        title: 'Monitoring focus with FocusMonitor',
        component: focus_monitor_overview_example_1.FocusMonitorOverviewExample
    },
    'form-field-appearance': {
        title: 'Form field appearance variants',
        component: form_field_appearance_example_1.FormFieldAppearanceExample
    },
    'form-field-custom-control': {
        title: 'Form field with custom telephone number input control.',
        component: form_field_custom_control_example_1.FormFieldCustomControlExample,
        additionalFiles: ["form-field-custom-control-example.html"],
        selectorName: 'FormFieldCustomControlExample, MyTelInput'
    },
    'form-field-error': {
        title: 'Form field with error messages',
        component: form_field_error_example_1.FormFieldErrorExample
    },
    'form-field-hint': {
        title: 'Form field with hints',
        component: form_field_hint_example_1.FormFieldHintExample
    },
    'form-field-label': {
        title: 'Form field with label',
        component: form_field_label_example_1.FormFieldLabelExample
    },
    'form-field-overview': {
        title: 'Simple form field',
        component: form_field_overview_example_1.FormFieldOverviewExample
    },
    'form-field-prefix-suffix': {
        title: 'Form field with prefix & suffix',
        component: form_field_prefix_suffix_example_1.FormFieldPrefixSuffixExample
    },
    'form-field-theming': {
        title: 'Form field theming',
        component: form_field_theming_example_1.FormFieldThemingExample
    },
    'grid-list-dynamic': {
        title: 'Dynamic grid-list',
        component: grid_list_dynamic_example_1.GridListDynamicExample
    },
    'grid-list-overview': {
        title: 'Basic grid-list',
        component: grid_list_overview_example_1.GridListOverviewExample
    },
    'icon-overview': {
        title: 'Basic icons',
        component: icon_overview_example_1.IconOverviewExample
    },
    'icon-svg': {
        title: 'SVG icons',
        component: icon_svg_example_1.IconSvgExample
    },
    'input-clearable': {
        title: 'Input with a clear button',
        component: input_clearable_example_1.InputClearableExample
    },
    'input-error-state-matcher': {
        title: 'Input with a custom ErrorStateMatcher',
        component: input_error_state_matcher_example_1.InputErrorStateMatcherExample
    },
    'input-errors': {
        title: 'Input with error messages',
        component: input_errors_example_1.InputErrorsExample
    },
    'input-form': {
        title: 'Inputs in a form',
        component: input_form_example_1.InputFormExample
    },
    'input-hint': {
        title: 'Input with hints',
        component: input_hint_example_1.InputHintExample
    },
    'input-overview': {
        title: 'Basic Inputs',
        component: input_overview_example_1.InputOverviewExample
    },
    'input-prefix-suffix': {
        title: 'Inputs with prefixes and suffixes',
        component: input_prefix_suffix_example_1.InputPrefixSuffixExample
    },
    'list-overview': {
        title: 'Basic list',
        component: list_overview_example_1.ListOverviewExample
    },
    'list-sections': {
        title: 'List with sections',
        component: list_sections_example_1.ListSectionsExample
    },
    'list-selection': {
        title: 'List with selection',
        component: list_selection_example_1.ListSelectionExample
    },
    'menu-icons': {
        title: 'Menu with icons',
        component: menu_icons_example_1.MenuIconsExample
    },
    'menu-overview': {
        title: 'Basic menu',
        component: menu_overview_example_1.MenuOverviewExample
    },
    'nested-menu': {
        title: 'Nested menu',
        component: nested_menu_example_1.NestedMenuExample
    },
    'paginator-configurable': {
        title: 'Configurable paginator',
        component: paginator_configurable_example_1.PaginatorConfigurableExample
    },
    'paginator-overview': {
        title: 'Paginator',
        component: paginator_overview_example_1.PaginatorOverviewExample
    },
    'progress-bar-buffer': {
        title: 'Buffer progress-bar',
        component: progress_bar_buffer_example_1.ProgressBarBufferExample
    },
    'progress-bar-configurable': {
        title: 'Configurable progress-bar',
        component: progress_bar_configurable_example_1.ProgressBarConfigurableExample
    },
    'progress-bar-determinate': {
        title: 'Determinate progress-bar',
        component: progress_bar_determinate_example_1.ProgressBarDeterminateExample
    },
    'progress-bar-indeterminate': {
        title: 'Indeterminate progress-bar',
        component: progress_bar_indeterminate_example_1.ProgressBarIndeterminateExample
    },
    'progress-bar-query': {
        title: 'Query progress-bar',
        component: progress_bar_query_example_1.ProgressBarQueryExample
    },
    'progress-spinner-configurable': {
        title: 'Configurable progress spinner',
        component: progress_spinner_configurable_example_1.ProgressSpinnerConfigurableExample
    },
    'progress-spinner-overview': {
        title: 'Basic progress-spinner',
        component: progress_spinner_overview_example_1.ProgressSpinnerOverviewExample
    },
    'radio-ng-model': {
        title: 'Radios with ngModel',
        component: radio_ng_model_example_1.RadioNgModelExample
    },
    'radio-overview': {
        title: 'Basic radios',
        component: radio_overview_example_1.RadioOverviewExample
    },
    'ripple-overview': {
        title: 'MatRipple basic usage',
        component: ripple_overview_example_1.RippleOverviewExample
    },
    'select-custom-trigger': {
        title: 'Select with custom trigger text',
        component: select_custom_trigger_example_1.SelectCustomTriggerExample
    },
    'select-disabled': {
        title: 'Disabled select',
        component: select_disabled_example_1.SelectDisabledExample
    },
    'select-error-state-matcher': {
        title: 'Select with a custom ErrorStateMatcher',
        component: select_error_state_matcher_example_1.SelectErrorStateMatcherExample
    },
    'select-form': {
        title: 'Select in a form',
        component: select_form_example_1.SelectFormExample
    },
    'select-hint-error': {
        title: 'Select with form field features',
        component: select_hint_error_example_1.SelectHintErrorExample
    },
    'select-multiple': {
        title: 'Select with multiple selection',
        component: select_multiple_example_1.SelectMultipleExample
    },
    'select-no-ripple': {
        title: 'Select with no option ripple',
        component: select_no_ripple_example_1.SelectNoRippleExample
    },
    'select-optgroup': {
        title: 'Select with option groups',
        component: select_optgroup_example_1.SelectOptgroupExample
    },
    'select-overview': {
        title: 'Basic select',
        component: select_overview_example_1.SelectOverviewExample
    },
    'select-panel-class': {
        title: 'Select with custom panel styling',
        component: select_panel_class_example_1.SelectPanelClassExample
    },
    'select-reset': {
        title: 'Select with reset option',
        component: select_reset_example_1.SelectResetExample
    },
    'select-value-binding': {
        title: 'Select with 2-way value binding',
        component: select_value_binding_example_1.SelectValueBindingExample
    },
    'sidenav-autosize': {
        title: 'Autosize sidenav',
        component: sidenav_autosize_example_1.SidenavAutosizeExample
    },
    'sidenav-backdrop': {
        title: 'Drawer with explicit backdrop setting',
        component: sidenav_backdrop_example_1.SidenavBackdropExample
    },
    'sidenav-disable-close': {
        title: 'Sidenav with custom escape and backdrop click behavior',
        component: sidenav_disable_close_example_1.SidenavDisableCloseExample
    },
    'sidenav-drawer-overview': {
        title: 'Basic drawer',
        component: sidenav_drawer_overview_example_1.SidenavDrawerOverviewExample
    },
    'sidenav-fixed': {
        title: 'Fixed sidenav',
        component: sidenav_fixed_example_1.SidenavFixedExample
    },
    'sidenav-mode': {
        title: 'Sidenav with configurable mode',
        component: sidenav_mode_example_1.SidenavModeExample
    },
    'sidenav-open-close': {
        title: 'Sidenav open & close behavior',
        component: sidenav_open_close_example_1.SidenavOpenCloseExample
    },
    'sidenav-overview': {
        title: 'Basic sidenav',
        component: sidenav_overview_example_1.SidenavOverviewExample
    },
    'sidenav-position': {
        title: 'Implicit main content with two sidenavs',
        component: sidenav_position_example_1.SidenavPositionExample
    },
    'sidenav-responsive': {
        title: 'Responsive sidenav',
        component: sidenav_responsive_example_1.SidenavResponsiveExample
    },
    'slide-toggle-configurable': {
        title: 'Configurable slide-toggle',
        component: slide_toggle_configurable_example_1.SlideToggleConfigurableExample
    },
    'slide-toggle-forms': {
        title: 'Slide-toggle with forms',
        component: slide_toggle_forms_example_1.SlideToggleFormsExample
    },
    'slide-toggle-overview': {
        title: 'Basic slide-toggles',
        component: slide_toggle_overview_example_1.SlideToggleOverviewExample
    },
    'slider-configurable': {
        title: 'Configurable slider',
        component: slider_configurable_example_1.SliderConfigurableExample
    },
    'slider-formatting': {
        title: 'Slider with custom thumb label formatting.',
        component: slider_formatting_example_1.SliderFormattingExample
    },
    'slider-overview': {
        title: 'Basic slider',
        component: slider_overview_example_1.SliderOverviewExample
    },
    'snack-bar-component': {
        title: 'Snack-bar with a custom component',
        component: snack_bar_component_example_1.SnackBarComponentExample,
        additionalFiles: ["snack-bar-component-example-snack.html"],
        selectorName: 'SnackBarComponentExample, PizzaPartyComponent'
    },
    'snack-bar-overview': {
        title: 'Basic snack-bar',
        component: snack_bar_overview_example_1.SnackBarOverviewExample
    },
    'snack-bar-position': {
        title: 'Snack-bar with configurable position',
        component: snack_bar_position_example_1.SnackBarPositionExample
    },
    'sort-overview': {
        title: 'Sorting overview',
        component: sort_overview_example_1.SortOverviewExample
    },
    'stepper-editable': {
        title: 'Stepper with editable steps',
        component: stepper_editable_example_1.StepperEditableExample
    },
    'stepper-optional': {
        title: 'Stepper with optional steps',
        component: stepper_optional_example_1.StepperOptionalExample
    },
    'stepper-overview': {
        title: 'Stepper overview',
        component: stepper_overview_example_1.StepperOverviewExample
    },
    'stepper-vertical': {
        title: 'Stepper vertical',
        component: stepper_vertical_example_1.StepperVerticalExample
    },
    'tab-group-async': {
        title: 'Tab group with asynchronously loading tab contents',
        component: tab_group_async_example_1.TabGroupAsyncExample
    },
    'tab-group-basic': {
        title: 'Basic use of the tab group',
        component: tab_group_basic_example_1.TabGroupBasicExample
    },
    'tab-group-custom-label': {
        title: 'Using tabs with a custom label template',
        component: tab_group_custom_label_example_1.TabGroupCustomLabelExample
    },
    'tab-group-dynamic-height': {
        title: 'Tag group with dynamic height based on tab contents',
        component: tab_group_dynamic_height_example_1.TabGroupDynamicHeightExample
    },
    'tab-group-dynamic': {
        title: 'Tab group with dynamically changing tabs',
        component: tab_group_dynamic_example_1.TabGroupDynamicExample
    },
    'tab-group-header-below': {
        title: 'Tab group with the headers on the bottom',
        component: tab_group_header_below_example_1.TabGroupHeaderBelowExample
    },
    'tab-group-lazy-loaded': {
        title: 'Tab group where the tab content is loaded lazily (when activated)',
        component: tab_group_lazy_loaded_example_1.TabGroupLazyLoadedExample
    },
    'tab-group-stretched': {
        title: 'Tab group with stretched labels',
        component: tab_group_stretched_example_1.TabGroupStretchedExample
    },
    'tab-group-theme': {
        title: 'Customizing the theme options on the tab group',
        component: tab_group_theme_example_1.TabGroupThemeExample
    },
    'tab-nav-bar-basic': {
        title: 'Basic use of the tab nav bar',
        component: tab_nav_bar_basic_example_1.TabNavBarBasicExample
    },
    'table-basic-flex': {
        title: 'Basic use of `<mat-table>` (uses display flex)',
        component: table_basic_flex_example_1.TableBasicFlexExample
    },
    'table-basic': {
        title: 'Basic use of `<table mat-table>`',
        component: table_basic_example_1.TableBasicExample
    },
    'table-dynamic-columns': {
        title: 'Table dynamically changing the columns displayed',
        component: table_dynamic_columns_example_1.TableDynamicColumnsExample
    },
    'table-expandable-rows': {
        title: 'Table with expandable rows',
        component: table_expandable_rows_example_1.TableExpandableRowsExample
    },
    'table-filtering': {
        title: 'Table with filtering',
        component: table_filtering_example_1.TableFilteringExample
    },
    'table-footer-row': {
        title: 'Footer row table',
        component: table_footer_row_example_1.TableFooterRowExample
    },
    'table-http': {
        title: 'Table retrieving data through HTTP',
        component: table_http_example_1.TableHttpExample
    },
    'table-multiple-header-footer': {
        title: 'Table with multiple header and footer rows',
        component: table_multiple_header_footer_example_1.TableMultipleHeaderFooterExample
    },
    'table-overview': {
        title: 'Data table with sorting, pagination, and filtering.',
        component: table_overview_example_1.TableOverviewExample
    },
    'table-pagination': {
        title: 'Table with pagination',
        component: table_pagination_example_1.TablePaginationExample
    },
    'table-row-context': {
        title: 'Table showing each row context properties.',
        component: table_row_context_example_1.TableRowContextExample
    },
    'table-selection': {
        title: 'Table with selection',
        component: table_selection_example_1.TableSelectionExample
    },
    'table-sorting': {
        title: 'Table with sorting',
        component: table_sorting_example_1.TableSortingExample
    },
    'table-sticky-columns': {
        title: 'Table with a sticky columns',
        component: table_sticky_columns_example_1.TableStickyColumnsExample
    },
    'table-sticky-complex-flex': {
        title: 'Flex-layout tables with toggle-able sticky headers, footers, and columns',
        component: table_sticky_complex_flex_example_1.TableStickyComplexFlexExample
    },
    'table-sticky-complex': {
        title: 'Tables with toggle-able sticky headers, footers, and columns',
        component: table_sticky_complex_example_1.TableStickyComplexExample
    },
    'table-sticky-footer': {
        title: 'Table with a sticky footer',
        component: table_sticky_footer_example_1.TableStickyFooterExample
    },
    'table-sticky-header': {
        title: 'Table with sticky header',
        component: table_sticky_header_example_1.TableStickyHeaderExample
    },
    'text-field-autofill-directive': {
        title: 'Monitoring autofill state with cdkAutofill',
        component: text_field_autofill_directive_example_1.TextFieldAutofillDirectiveExample
    },
    'text-field-autofill-monitor': {
        title: 'Monitoring autofill state with AutofillMonitor',
        component: text_field_autofill_monitor_example_1.TextFieldAutofillMonitorExample
    },
    'text-field-autosize-textarea': {
        title: 'Auto-resizing textarea',
        component: text_field_autosize_textarea_example_1.TextFieldAutosizeTextareaExample
    },
    'toolbar-multirow': {
        title: 'Multi-row toolbar',
        component: toolbar_multirow_example_1.ToolbarMultirowExample
    },
    'toolbar-overview': {
        title: 'Basic toolbar',
        component: toolbar_overview_example_1.ToolbarOverviewExample
    },
    'tooltip-auto-hide': {
        title: 'Tooltip that demonstrates auto-hiding when it clips out of its scrolling container.',
        component: tooltip_auto_hide_example_1.TooltipAutoHideExample
    },
    'tooltip-custom-class': {
        title: 'Tooltip that can have a custom class applied.',
        component: tooltip_custom_class_example_1.TooltipCustomClassExample
    },
    'tooltip-delay': {
        title: 'Tooltip with a show and hide delay',
        component: tooltip_delay_example_1.TooltipDelayExample
    },
    'tooltip-disabled': {
        title: 'Tooltip that can be disabled',
        component: tooltip_disabled_example_1.TooltipDisabledExample
    },
    'tooltip-manual': {
        title: 'Tooltip that can be manually shown/hidden.',
        component: tooltip_manual_example_1.TooltipManualExample
    },
    'tooltip-message': {
        title: 'Tooltip with a changing message',
        component: tooltip_message_example_1.TooltipMessageExample
    },
    'tooltip-modified-defaults': {
        title: 'Tooltip with a show and hide delay',
        component: tooltip_modified_defaults_example_1.TooltipModifiedDefaultsExample
    },
    'tooltip-overview': {
        title: 'Basic tooltip',
        component: tooltip_overview_example_1.TooltipOverviewExample
    },
    'tooltip-position': {
        title: 'Tooltip with a custom position',
        component: tooltip_position_example_1.TooltipPositionExample
    },
    'tree-checklist': {
        title: 'Tree with checkboxes',
        component: tree_checklist_example_1.TreeChecklistExample
    },
    'tree-dynamic': {
        title: 'Tree with dynamic data',
        component: tree_dynamic_example_1.TreeDynamicExample
    },
    'tree-flat-overview': {
        title: 'Tree with flat nodes',
        component: tree_flat_overview_example_1.TreeFlatOverviewExample
    },
    'tree-loadmore': {
        title: 'Tree with partially loaded data',
        component: tree_loadmore_example_1.TreeLoadmoreExample
    },
    'tree-nested-overview': {
        title: 'Tree with nested nodes',
        component: tree_nested_overview_example_1.TreeNestedOverviewExample
    },
};
exports.EXAMPLE_LIST = [
    autocomplete_auto_active_first_option_example_1.AutocompleteAutoActiveFirstOptionExample,
    autocomplete_display_example_1.AutocompleteDisplayExample,
    autocomplete_filter_example_1.AutocompleteFilterExample,
    autocomplete_optgroup_example_1.AutocompleteOptgroupExample,
    autocomplete_overview_example_1.AutocompleteOverviewExample,
    autocomplete_simple_example_1.AutocompleteSimpleExample,
    badge_overview_example_1.BadgeOverviewExample,
    bottom_sheet_overview_example_1.BottomSheetOverviewExampleSheet, bottom_sheet_overview_example_1.BottomSheetOverviewExample,
    button_overview_example_1.ButtonOverviewExample,
    button_toggle_exclusive_example_1.ButtonToggleExclusiveExample,
    button_toggle_overview_example_1.ButtonToggleOverviewExample,
    button_types_example_1.ButtonTypesExample,
    card_fancy_example_1.CardFancyExample,
    card_overview_example_1.CardOverviewExample,
    cdk_table_basic_flex_example_1.CdkTableBasicFlexExample,
    cdk_table_basic_example_1.CdkTableBasicExample,
    cdk_tree_flat_example_1.CdkTreeFlatExample,
    cdk_tree_nested_example_1.CdkTreeNestedExample,
    checkbox_configurable_example_1.CheckboxConfigurableExample,
    checkbox_overview_example_1.CheckboxOverviewExample,
    chips_autocomplete_example_1.ChipsAutocompleteExample,
    chips_input_example_1.ChipsInputExample,
    chips_overview_example_1.ChipsOverviewExample,
    chips_stacked_example_1.ChipsStackedExample,
    datepicker_api_example_1.DatepickerApiExample,
    datepicker_color_example_1.DatepickerColorExample,
    datepicker_custom_header_example_1.ExampleHeader, datepicker_custom_header_example_1.DatepickerCustomHeaderExample,
    datepicker_custom_icon_example_1.DatepickerCustomIconExample,
    datepicker_disabled_example_1.DatepickerDisabledExample,
    datepicker_events_example_1.DatepickerEventsExample,
    datepicker_filter_example_1.DatepickerFilterExample,
    datepicker_formats_example_1.DatepickerFormatsExample,
    datepicker_locale_example_1.DatepickerLocaleExample,
    datepicker_min_max_example_1.DatepickerMinMaxExample,
    datepicker_moment_example_1.DatepickerMomentExample,
    datepicker_overview_example_1.DatepickerOverviewExample,
    datepicker_start_view_example_1.DatepickerStartViewExample,
    datepicker_touch_example_1.DatepickerTouchExample,
    datepicker_value_example_1.DatepickerValueExample,
    datepicker_views_selection_example_1.DatepickerViewsSelectionExample,
    dialog_content_example_1.DialogContentExampleDialog, dialog_content_example_1.DialogContentExample,
    dialog_data_example_1.DialogDataExampleDialog, dialog_data_example_1.DialogDataExample,
    dialog_elements_example_1.DialogElementsExampleDialog, dialog_elements_example_1.DialogElementsExample,
    dialog_overview_example_1.DialogOverviewExampleDialog, dialog_overview_example_1.DialogOverviewExample,
    divider_overview_example_1.DividerOverviewExample,
    elevation_overview_example_1.ElevationOverviewExample,
    expansion_expand_collapse_all_example_1.ExpansionExpandCollapseAllExample,
    expansion_overview_example_1.ExpansionOverviewExample,
    expansion_steps_example_1.ExpansionStepsExample,
    focus_monitor_directives_example_1.FocusMonitorDirectivesExample,
    focus_monitor_focus_via_example_1.FocusMonitorFocusViaExample,
    focus_monitor_overview_example_1.FocusMonitorOverviewExample,
    form_field_appearance_example_1.FormFieldAppearanceExample,
    form_field_custom_control_example_1.MyTelInput, form_field_custom_control_example_1.FormFieldCustomControlExample,
    form_field_error_example_1.FormFieldErrorExample,
    form_field_hint_example_1.FormFieldHintExample,
    form_field_label_example_1.FormFieldLabelExample,
    form_field_overview_example_1.FormFieldOverviewExample,
    form_field_prefix_suffix_example_1.FormFieldPrefixSuffixExample,
    form_field_theming_example_1.FormFieldThemingExample,
    grid_list_dynamic_example_1.GridListDynamicExample,
    grid_list_overview_example_1.GridListOverviewExample,
    icon_overview_example_1.IconOverviewExample,
    icon_svg_example_1.IconSvgExample,
    input_clearable_example_1.InputClearableExample,
    input_error_state_matcher_example_1.InputErrorStateMatcherExample,
    input_errors_example_1.InputErrorsExample,
    input_form_example_1.InputFormExample,
    input_hint_example_1.InputHintExample,
    input_overview_example_1.InputOverviewExample,
    input_prefix_suffix_example_1.InputPrefixSuffixExample,
    list_overview_example_1.ListOverviewExample,
    list_sections_example_1.ListSectionsExample,
    list_selection_example_1.ListSelectionExample,
    menu_icons_example_1.MenuIconsExample,
    menu_overview_example_1.MenuOverviewExample,
    nested_menu_example_1.NestedMenuExample,
    paginator_configurable_example_1.PaginatorConfigurableExample,
    paginator_overview_example_1.PaginatorOverviewExample,
    progress_bar_buffer_example_1.ProgressBarBufferExample,
    progress_bar_configurable_example_1.ProgressBarConfigurableExample,
    progress_bar_determinate_example_1.ProgressBarDeterminateExample,
    progress_bar_indeterminate_example_1.ProgressBarIndeterminateExample,
    progress_bar_query_example_1.ProgressBarQueryExample,
    progress_spinner_configurable_example_1.ProgressSpinnerConfigurableExample,
    progress_spinner_overview_example_1.ProgressSpinnerOverviewExample,
    radio_ng_model_example_1.RadioNgModelExample,
    radio_overview_example_1.RadioOverviewExample,
    ripple_overview_example_1.RippleOverviewExample,
    select_custom_trigger_example_1.SelectCustomTriggerExample,
    select_disabled_example_1.SelectDisabledExample,
    select_error_state_matcher_example_1.SelectErrorStateMatcherExample,
    select_form_example_1.SelectFormExample,
    select_hint_error_example_1.SelectHintErrorExample,
    select_multiple_example_1.SelectMultipleExample,
    select_no_ripple_example_1.SelectNoRippleExample,
    select_optgroup_example_1.SelectOptgroupExample,
    select_overview_example_1.SelectOverviewExample,
    select_panel_class_example_1.SelectPanelClassExample,
    select_reset_example_1.SelectResetExample,
    select_value_binding_example_1.SelectValueBindingExample,
    sidenav_autosize_example_1.SidenavAutosizeExample,
    sidenav_backdrop_example_1.SidenavBackdropExample,
    sidenav_disable_close_example_1.SidenavDisableCloseExample,
    sidenav_drawer_overview_example_1.SidenavDrawerOverviewExample,
    sidenav_fixed_example_1.SidenavFixedExample,
    sidenav_mode_example_1.SidenavModeExample,
    sidenav_open_close_example_1.SidenavOpenCloseExample,
    sidenav_overview_example_1.SidenavOverviewExample,
    sidenav_position_example_1.SidenavPositionExample,
    sidenav_responsive_example_1.SidenavResponsiveExample,
    slide_toggle_configurable_example_1.SlideToggleConfigurableExample,
    slide_toggle_forms_example_1.SlideToggleFormsExample,
    slide_toggle_overview_example_1.SlideToggleOverviewExample,
    slider_configurable_example_1.SliderConfigurableExample,
    slider_formatting_example_1.SliderFormattingExample,
    slider_overview_example_1.SliderOverviewExample,
    snack_bar_component_example_1.PizzaPartyComponent, snack_bar_component_example_1.SnackBarComponentExample,
    snack_bar_overview_example_1.SnackBarOverviewExample,
    snack_bar_position_example_1.SnackBarPositionExample,
    sort_overview_example_1.SortOverviewExample,
    stepper_editable_example_1.StepperEditableExample,
    stepper_optional_example_1.StepperOptionalExample,
    stepper_overview_example_1.StepperOverviewExample,
    stepper_vertical_example_1.StepperVerticalExample,
    tab_group_async_example_1.TabGroupAsyncExample,
    tab_group_basic_example_1.TabGroupBasicExample,
    tab_group_custom_label_example_1.TabGroupCustomLabelExample,
    tab_group_dynamic_height_example_1.TabGroupDynamicHeightExample,
    tab_group_dynamic_example_1.TabGroupDynamicExample,
    tab_group_header_below_example_1.TabGroupHeaderBelowExample,
    tab_group_lazy_loaded_example_1.TabGroupLazyLoadedExample,
    tab_group_stretched_example_1.TabGroupStretchedExample,
    tab_group_theme_example_1.TabGroupThemeExample,
    tab_nav_bar_basic_example_1.TabNavBarBasicExample,
    table_basic_flex_example_1.TableBasicFlexExample,
    table_basic_example_1.TableBasicExample,
    table_dynamic_columns_example_1.TableDynamicColumnsExample,
    table_expandable_rows_example_1.TableExpandableRowsExample,
    table_filtering_example_1.TableFilteringExample,
    table_footer_row_example_1.TableFooterRowExample,
    table_http_example_1.TableHttpExample,
    table_multiple_header_footer_example_1.TableMultipleHeaderFooterExample,
    table_overview_example_1.TableOverviewExample,
    table_pagination_example_1.TablePaginationExample,
    table_row_context_example_1.TableRowContextExample,
    table_selection_example_1.TableSelectionExample,
    table_sorting_example_1.TableSortingExample,
    table_sticky_columns_example_1.TableStickyColumnsExample,
    table_sticky_complex_flex_example_1.TableStickyComplexFlexExample,
    table_sticky_complex_example_1.TableStickyComplexExample,
    table_sticky_footer_example_1.TableStickyFooterExample,
    table_sticky_header_example_1.TableStickyHeaderExample,
    text_field_autofill_directive_example_1.TextFieldAutofillDirectiveExample,
    text_field_autofill_monitor_example_1.TextFieldAutofillMonitorExample,
    text_field_autosize_textarea_example_1.TextFieldAutosizeTextareaExample,
    toolbar_multirow_example_1.ToolbarMultirowExample,
    toolbar_overview_example_1.ToolbarOverviewExample,
    tooltip_auto_hide_example_1.TooltipAutoHideExample,
    tooltip_custom_class_example_1.TooltipCustomClassExample,
    tooltip_delay_example_1.TooltipDelayExample,
    tooltip_disabled_example_1.TooltipDisabledExample,
    tooltip_manual_example_1.TooltipManualExample,
    tooltip_message_example_1.TooltipMessageExample,
    tooltip_modified_defaults_example_1.TooltipModifiedDefaultsExample,
    tooltip_overview_example_1.TooltipOverviewExample,
    tooltip_position_example_1.TooltipPositionExample,
    tree_checklist_example_1.TreeChecklistExample,
    tree_dynamic_example_1.TreeDynamicExample,
    tree_flat_overview_example_1.TreeFlatOverviewExample,
    tree_loadmore_example_1.TreeLoadmoreExample,
    tree_nested_overview_example_1.TreeNestedOverviewExample,
];
var ExampleModule = /** @class */ (function () {
    function ExampleModule() {
    }
    ExampleModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: exports.EXAMPLE_LIST,
                    entryComponents: exports.EXAMPLE_LIST,
                    imports: [
                        material_module_1.ExampleMaterialModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        common_1.CommonModule
                    ]
                },] },
    ];
    return ExampleModule;
}());
exports.ExampleModule = ExampleModule;
//# sourceMappingURL=example-module.js.map