"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
var forms_1 = require("@angular/forms");
describe('MatSelectionList without forms', function () {
    describe('with list option', function () {
        var fixture;
        var listOptions;
        var selectionList;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [
                    SelectionListWithListOptions,
                    SelectionListWithCheckboxPositionAfter,
                    SelectionListWithListDisabled,
                    SelectionListWithOnlyOneOption
                ],
            });
            testing_2.TestBed.compileComponents();
        }));
        beforeEach(testing_2.async(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithListOptions);
            fixture.detectChanges();
            listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption));
            selectionList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList));
        }));
        it('should add and remove focus class on focus/blur', function () {
            // Use the second list item, because the first one is always disabled.
            var listItem = listOptions[1].nativeElement;
            expect(listItem.classList).not.toContain('mat-list-item-focus');
            testing_1.dispatchFakeEvent(listItem, 'focus');
            fixture.detectChanges();
            expect(listItem.className).toContain('mat-list-item-focus');
            testing_1.dispatchFakeEvent(listItem, 'blur');
            fixture.detectChanges();
            expect(listItem.className).not.toContain('mat-list-item-focus');
        });
        it('should be able to set a value on a list option', function () {
            var optionValues = ['inbox', 'starred', 'sent-mail', 'drafts'];
            optionValues.forEach(function (optionValue, index) {
                expect(listOptions[index].componentInstance.value).toBe(optionValue);
            });
        });
        it('should not emit a selectionChange event if an option changed programmatically', function () {
            spyOn(fixture.componentInstance, 'onValueChange');
            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(0);
            listOptions[2].componentInstance.toggle();
            fixture.detectChanges();
            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(0);
        });
        it('should emit a selectionChange event if an option got clicked', function () {
            spyOn(fixture.componentInstance, 'onValueChange');
            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(0);
            testing_1.dispatchFakeEvent(listOptions[2].nativeElement, 'click');
            fixture.detectChanges();
            expect(fixture.componentInstance.onValueChange).toHaveBeenCalledTimes(1);
        });
        it('should be able to dispatch one selected item', function () {
            var testListItem = listOptions[2].injector.get(index_1.MatListOption);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            expect(listOptions[2].nativeElement.getAttribute('aria-selected')).toBe('false');
            testListItem.toggle();
            fixture.detectChanges();
            expect(listOptions[2].nativeElement.getAttribute('aria-selected')).toBe('true');
            expect(listOptions[2].nativeElement.getAttribute('aria-disabled')).toBe('false');
            expect(selectList.selected.length).toBe(1);
        });
        it('should be able to dispatch multiple selected items', function () {
            var testListItem = listOptions[2].injector.get(index_1.MatListOption);
            var testListItem2 = listOptions[1].injector.get(index_1.MatListOption);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            expect(listOptions[2].nativeElement.getAttribute('aria-selected')).toBe('false');
            expect(listOptions[1].nativeElement.getAttribute('aria-selected')).toBe('false');
            testListItem.toggle();
            fixture.detectChanges();
            testListItem2.toggle();
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(2);
            expect(listOptions[2].nativeElement.getAttribute('aria-selected')).toBe('true');
            expect(listOptions[1].nativeElement.getAttribute('aria-selected')).toBe('true');
            expect(listOptions[1].nativeElement.getAttribute('aria-disabled')).toBe('false');
            expect(listOptions[2].nativeElement.getAttribute('aria-disabled')).toBe('false');
        });
        it('should be able to deselect an option', function () {
            var testListItem = listOptions[2].injector.get(index_1.MatListOption);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            testListItem.toggle();
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(1);
            testListItem.toggle();
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(0);
        });
        it('should not allow selection of disabled items', function () {
            var testListItem = listOptions[0].injector.get(index_1.MatListOption);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            expect(listOptions[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
            testListItem._handleClick();
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(0);
        });
        it('should be able to un-disable disabled items', function () {
            var testListItem = listOptions[0].injector.get(index_1.MatListOption);
            expect(listOptions[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
            testListItem.disabled = false;
            fixture.detectChanges();
            expect(listOptions[0].nativeElement.getAttribute('aria-disabled')).toBe('false');
        });
        it('should be able to use keyboard select with SPACE', function () {
            var testListItem = listOptions[1].nativeElement;
            var SPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.SPACE, testListItem);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            testing_1.dispatchFakeEvent(testListItem, 'focus');
            selectionList.componentInstance._keydown(SPACE_EVENT);
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(1);
            expect(SPACE_EVENT.defaultPrevented).toBe(true);
        });
        it('should be able to select an item using ENTER', function () {
            var testListItem = listOptions[1].nativeElement;
            var ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER, testListItem);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            testing_1.dispatchFakeEvent(testListItem, 'focus');
            selectionList.componentInstance._keydown(ENTER_EVENT);
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(1);
            expect(ENTER_EVENT.defaultPrevented).toBe(true);
        });
        it('should not be able to toggle a disabled option using SPACE', function () {
            var testListItem = listOptions[1].nativeElement;
            var selectionModel = selectionList.componentInstance.selectedOptions;
            expect(selectionModel.selected.length).toBe(0);
            listOptions[1].componentInstance.disabled = true;
            testing_1.dispatchFakeEvent(testListItem, 'focus');
            selectionList.componentInstance._keydown(testing_1.createKeyboardEvent('keydown', keycodes_1.SPACE, testListItem));
            fixture.detectChanges();
            expect(selectionModel.selected.length).toBe(0);
        });
        it('should restore focus if active option is destroyed', function () {
            var manager = selectionList.componentInstance._keyManager;
            listOptions[3].componentInstance._handleFocus();
            expect(manager.activeItemIndex).toBe(3);
            fixture.componentInstance.showLastOption = false;
            fixture.detectChanges();
            expect(manager.activeItemIndex).toBe(2);
        });
        it('should focus previous item when press UP ARROW', function () {
            var testListItem = listOptions[2].nativeElement;
            var UP_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW, testListItem);
            var manager = selectionList.componentInstance._keyManager;
            testing_1.dispatchFakeEvent(listOptions[2].nativeElement, 'focus');
            expect(manager.activeItemIndex).toEqual(2);
            selectionList.componentInstance._keydown(UP_EVENT);
            fixture.detectChanges();
            expect(manager.activeItemIndex).toEqual(1);
        });
        it('should focus and toggle the next item when pressing SHIFT + UP_ARROW', function () {
            var manager = selectionList.componentInstance._keyManager;
            var upKeyEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
            Object.defineProperty(upKeyEvent, 'shiftKey', { get: function () { return true; } });
            testing_1.dispatchFakeEvent(listOptions[3].nativeElement, 'focus');
            expect(manager.activeItemIndex).toBe(3);
            expect(listOptions[1].componentInstance.selected).toBe(false);
            expect(listOptions[2].componentInstance.selected).toBe(false);
            selectionList.componentInstance._keydown(upKeyEvent);
            fixture.detectChanges();
            expect(listOptions[1].componentInstance.selected).toBe(false);
            expect(listOptions[2].componentInstance.selected).toBe(true);
            selectionList.componentInstance._keydown(upKeyEvent);
            fixture.detectChanges();
            expect(listOptions[1].componentInstance.selected).toBe(true);
            expect(listOptions[2].componentInstance.selected).toBe(true);
        });
        it('should focus next item when press DOWN ARROW', function () {
            var manager = selectionList.componentInstance._keyManager;
            testing_1.dispatchFakeEvent(listOptions[2].nativeElement, 'focus');
            expect(manager.activeItemIndex).toEqual(2);
            selectionList.componentInstance._keydown(testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW));
            fixture.detectChanges();
            expect(manager.activeItemIndex).toEqual(3);
        });
        it('should focus and toggle the next item when pressing SHIFT + DOWN_ARROW', function () {
            var manager = selectionList.componentInstance._keyManager;
            var downKeyEvent = testing_1.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
            Object.defineProperty(downKeyEvent, 'shiftKey', { get: function () { return true; } });
            testing_1.dispatchFakeEvent(listOptions[0].nativeElement, 'focus');
            expect(manager.activeItemIndex).toBe(0);
            expect(listOptions[1].componentInstance.selected).toBe(false);
            expect(listOptions[2].componentInstance.selected).toBe(false);
            selectionList.componentInstance._keydown(downKeyEvent);
            fixture.detectChanges();
            expect(listOptions[1].componentInstance.selected).toBe(true);
            expect(listOptions[2].componentInstance.selected).toBe(false);
            selectionList.componentInstance._keydown(downKeyEvent);
            fixture.detectChanges();
            expect(listOptions[1].componentInstance.selected).toBe(true);
            expect(listOptions[2].componentInstance.selected).toBe(true);
        });
        it('should be able to focus the first item when pressing HOME', function () {
            var manager = selectionList.componentInstance._keyManager;
            expect(manager.activeItemIndex).toBe(-1);
            var event = testing_1.dispatchKeyboardEvent(selectionList.nativeElement, 'keydown', keycodes_1.HOME);
            fixture.detectChanges();
            expect(manager.activeItemIndex).toBe(0);
            expect(event.defaultPrevented).toBe(true);
        });
        it('should focus the last item when pressing END', function () {
            var manager = selectionList.componentInstance._keyManager;
            expect(manager.activeItemIndex).toBe(-1);
            var event = testing_1.dispatchKeyboardEvent(selectionList.nativeElement, 'keydown', keycodes_1.END);
            fixture.detectChanges();
            expect(manager.activeItemIndex).toBe(3);
            expect(event.defaultPrevented).toBe(true);
        });
        it('should select all items using ctrl + a', function () {
            var event = testing_1.createKeyboardEvent('keydown', keycodes_1.A, selectionList.nativeElement);
            Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
            expect(listOptions.some(function (option) { return option.componentInstance.selected; })).toBe(false);
            testing_1.dispatchEvent(selectionList.nativeElement, event);
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return option.componentInstance.selected; })).toBe(true);
        });
        it('should select all items using ctrl + a if some items are selected', function () {
            var event = testing_1.createKeyboardEvent('keydown', keycodes_1.A, selectionList.nativeElement);
            Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
            listOptions.slice(0, 2).forEach(function (option) { return option.componentInstance.selected = true; });
            fixture.detectChanges();
            expect(listOptions.some(function (option) { return option.componentInstance.selected; })).toBe(true);
            testing_1.dispatchEvent(selectionList.nativeElement, event);
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return option.componentInstance.selected; })).toBe(true);
        });
        it('should deselect all with ctrl + a if all options are selected', function () {
            var event = testing_1.createKeyboardEvent('keydown', keycodes_1.A, selectionList.nativeElement);
            Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
            listOptions.forEach(function (option) { return option.componentInstance.selected = true; });
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return option.componentInstance.selected; })).toBe(true);
            testing_1.dispatchEvent(selectionList.nativeElement, event);
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return option.componentInstance.selected; })).toBe(false);
        });
        it('should be able to jump focus down to an item by typing', testing_2.fakeAsync(function () {
            var listEl = selectionList.nativeElement;
            var manager = selectionList.componentInstance._keyManager;
            expect(manager.activeItemIndex).toBe(-1);
            testing_1.dispatchEvent(listEl, testing_1.createKeyboardEvent('keydown', 83, undefined, 's'));
            fixture.detectChanges();
            testing_2.tick(200);
            expect(manager.activeItemIndex).toBe(1);
            testing_1.dispatchEvent(listEl, testing_1.createKeyboardEvent('keydown', 68, undefined, 'd'));
            fixture.detectChanges();
            testing_2.tick(200);
            expect(manager.activeItemIndex).toBe(3);
        }));
        it('should be able to select all options', function () {
            var list = selectionList.componentInstance;
            expect(list.options.toArray().every(function (option) { return option.selected; })).toBe(false);
            list.selectAll();
            fixture.detectChanges();
            expect(list.options.toArray().every(function (option) { return option.selected; })).toBe(true);
        });
        it('should be able to deselect all options', function () {
            var list = selectionList.componentInstance;
            list.options.forEach(function (option) { return option.toggle(); });
            expect(list.options.toArray().every(function (option) { return option.selected; })).toBe(true);
            list.deselectAll();
            fixture.detectChanges();
            expect(list.options.toArray().every(function (option) { return option.selected; })).toBe(false);
        });
        it('should update the list value when an item is selected programmatically', function () {
            var list = selectionList.componentInstance;
            expect(list.selectedOptions.isEmpty()).toBe(true);
            listOptions[0].componentInstance.selected = true;
            listOptions[2].componentInstance.selected = true;
            fixture.detectChanges();
            expect(list.selectedOptions.isEmpty()).toBe(false);
            expect(list.selectedOptions.isSelected(listOptions[0].componentInstance)).toBe(true);
            expect(list.selectedOptions.isSelected(listOptions[2].componentInstance)).toBe(true);
        });
        it('should update the item selected state when it is selected via the model', function () {
            var list = selectionList.componentInstance;
            var item = listOptions[0].componentInstance;
            expect(item.selected).toBe(false);
            list.selectedOptions.select(item);
            fixture.detectChanges();
            expect(item.selected).toBe(true);
        });
    });
    describe('with list option selected', function () {
        var fixture;
        var listItemEl;
        var selectionList;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [SelectionListWithSelectedOption],
            });
            testing_2.TestBed.compileComponents();
        }));
        beforeEach(testing_2.async(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithSelectedOption);
            listItemEl = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatListOption));
            selectionList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList));
            fixture.detectChanges();
        }));
        it('should set its initial selected state in the selectedOptions', function () {
            var optionEl = listItemEl.injector.get(index_1.MatListOption);
            var selectedOptions = selectionList.componentInstance.selectedOptions;
            expect(selectedOptions.isSelected(optionEl)).toBeTruthy();
        });
    });
    describe('with tabindex', function () {
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [
                    SelectionListWithTabindexAttr,
                    SelectionListWithTabindexBinding,
                ]
            });
            testing_2.TestBed.compileComponents();
        }));
        it('should properly handle native tabindex attribute', function () {
            var fixture = testing_2.TestBed.createComponent(SelectionListWithTabindexAttr);
            var selectionList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList));
            expect(selectionList.componentInstance.tabIndex)
                .toBe(5, 'Expected the selection-list tabindex to be set to the attribute value.');
        });
        it('should support changing the tabIndex through binding', function () {
            var fixture = testing_2.TestBed.createComponent(SelectionListWithTabindexBinding);
            var selectionList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList));
            expect(selectionList.componentInstance.tabIndex)
                .toBe(0, 'Expected the tabIndex to be set to "0" by default.');
            fixture.componentInstance.tabIndex = 3;
            fixture.detectChanges();
            expect(selectionList.componentInstance.tabIndex)
                .toBe(3, 'Expected the tabIndex to updated through binding.');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(selectionList.componentInstance.tabIndex)
                .toBe(3, 'Expected the tabIndex to be still set to "3".');
        });
    });
    describe('with single option', function () {
        var fixture;
        var listOption;
        var listItemEl;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [
                    SelectionListWithListOptions,
                    SelectionListWithCheckboxPositionAfter,
                    SelectionListWithListDisabled,
                    SelectionListWithOnlyOneOption
                ],
            });
            testing_2.TestBed.compileComponents();
        }));
        beforeEach(testing_2.async(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithOnlyOneOption);
            listOption = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatListOption));
            listItemEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-list-item'));
            fixture.detectChanges();
        }));
        it('should be focused when focus on nativeElements', function () {
            testing_1.dispatchFakeEvent(listOption.nativeElement, 'focus');
            fixture.detectChanges();
            expect(listItemEl.nativeElement.className).toContain('mat-list-item-focus');
            testing_1.dispatchFakeEvent(listOption.nativeElement, 'blur');
            fixture.detectChanges();
            expect(listItemEl.nativeElement.className).not.toContain('mat-list-item-focus');
        });
    });
    describe('with option disabled', function () {
        var fixture;
        var listOptionEl;
        var listOption;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [SelectionListWithDisabledOption]
            });
            testing_2.TestBed.compileComponents();
        }));
        beforeEach(testing_2.async(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithDisabledOption);
            var listOptionDebug = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatListOption));
            listOption = listOptionDebug.componentInstance;
            listOptionEl = listOptionDebug.nativeElement;
            fixture.detectChanges();
        }));
        it('should disable ripples for disabled option', function () {
            expect(listOption._isRippleDisabled())
                .toBe(false, 'Expected ripples to be enabled by default');
            fixture.componentInstance.disableItem = true;
            fixture.detectChanges();
            expect(listOption._isRippleDisabled())
                .toBe(true, 'Expected ripples to be disabled if option is disabled');
        });
        it('should apply the "mat-list-item-disabled" class properly', function () {
            expect(listOptionEl.classList).not.toContain('mat-list-item-disabled');
            fixture.componentInstance.disableItem = true;
            fixture.detectChanges();
            expect(listOptionEl.classList).toContain('mat-list-item-disabled');
        });
    });
    describe('with list disabled', function () {
        var fixture;
        var listOption;
        var selectionList;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [
                    SelectionListWithListOptions,
                    SelectionListWithCheckboxPositionAfter,
                    SelectionListWithListDisabled,
                    SelectionListWithOnlyOneOption
                ],
            });
            testing_2.TestBed.compileComponents();
        }));
        beforeEach(testing_2.async(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithListDisabled);
            listOption = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption));
            selectionList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList));
            fixture.detectChanges();
        }));
        it('should not allow selection on disabled selection-list', function () {
            var testListItem = listOption[2].injector.get(index_1.MatListOption);
            var selectList = selectionList.injector.get(index_1.MatSelectionList).selectedOptions;
            expect(selectList.selected.length).toBe(0);
            testListItem._handleClick();
            fixture.detectChanges();
            expect(selectList.selected.length).toBe(0);
        });
        it('should update state of options if list state has changed', function () {
            // To verify that the template of the list options has been re-rendered after the disabled
            // property of the selection list has been updated, the ripple directive can be used.
            // Inspecting the host classes of the options doesn't work because those update as part
            // of the parent template (of the selection-list).
            var listOptionRipple = listOption[2].query(platform_browser_1.By.directive(core_2.MatRipple))
                .injector.get(core_2.MatRipple);
            expect(listOptionRipple.disabled)
                .toBe(true, 'Expected ripples of list option to be disabled');
            fixture.componentInstance.disabled = false;
            fixture.detectChanges();
            expect(listOptionRipple.disabled)
                .toBe(false, 'Expected ripples of list option to be enabled');
        });
    });
    describe('with checkbox position after', function () {
        var fixture;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [index_1.MatListModule],
                declarations: [
                    SelectionListWithListOptions,
                    SelectionListWithCheckboxPositionAfter,
                    SelectionListWithListDisabled,
                    SelectionListWithOnlyOneOption
                ],
            });
            testing_2.TestBed.compileComponents();
        }));
        beforeEach(testing_2.async(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithCheckboxPositionAfter);
            fixture.detectChanges();
        }));
        it('should be able to customize checkbox position', function () {
            var listItemContent = fixture.debugElement.query(platform_browser_1.By.css('.mat-list-item-content'));
            expect(listItemContent.nativeElement.classList).toContain('mat-list-item-content-reverse');
        });
    });
});
describe('MatSelectionList with forms', function () {
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatListModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [
                SelectionListWithModel,
                SelectionListWithFormControl,
                SelectionListWithPreselectedOption,
                SelectionListWithPreselectedOptionAndModel,
                SelectionListWithPreselectedFormControlOnPush,
                SelectionListWithCustomComparator,
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('and ngModel', function () {
        var fixture;
        var selectionListDebug;
        var listOptions;
        var ngModel;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithModel);
            fixture.detectChanges();
            selectionListDebug = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList));
            ngModel = selectionListDebug.injector.get(forms_1.NgModel);
            listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))
                .map(function (optionDebugEl) { return optionDebugEl.componentInstance; });
        });
        it('should update the model if an option got selected programmatically', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.selectedOptions.length)
                .toBe(0, 'Expected no options to be selected by default');
            listOptions[0].toggle();
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.selectedOptions.length)
                .toBe(1, 'Expected first list option to be selected');
        }));
        it('should update the model if an option got clicked', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.selectedOptions.length)
                .toBe(0, 'Expected no options to be selected by default');
            testing_1.dispatchFakeEvent(listOptions[0]._getHostElement(), 'click');
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.selectedOptions.length)
                .toBe(1, 'Expected first list option to be selected');
        }));
        it('should update the options if a model value is set', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.selectedOptions.length)
                .toBe(0, 'Expected no options to be selected by default');
            fixture.componentInstance.selectedOptions = ['opt3'];
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.selectedOptions.length)
                .toBe(1, 'Expected first list option to be selected');
        }));
        it('should set the selection-list to touched on blur', testing_2.fakeAsync(function () {
            expect(ngModel.touched)
                .toBe(false, 'Expected the selection-list to be untouched by default.');
            testing_1.dispatchFakeEvent(selectionListDebug.nativeElement, 'blur');
            fixture.detectChanges();
            testing_2.tick();
            expect(ngModel.touched).toBe(true, 'Expected the selection-list to be touched after blur');
        }));
        it('should be pristine by default', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithModel);
            fixture.componentInstance.selectedOptions = ['opt2'];
            fixture.detectChanges();
            ngModel =
                fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList)).injector.get(forms_1.NgModel);
            listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))
                .map(function (optionDebugEl) { return optionDebugEl.componentInstance; });
            // Flush the initial tick to ensure that every action from the ControlValueAccessor
            // happened before the actual test starts.
            // Flush the initial tick to ensure that every action from the ControlValueAccessor
            // happened before the actual test starts.
            testing_2.tick();
            expect(ngModel.pristine)
                .toBe(true, 'Expected the selection-list to be pristine by default.');
            listOptions[1].toggle();
            fixture.detectChanges();
            testing_2.tick();
            expect(ngModel.pristine)
                .toBe(false, 'Expected the selection-list to be dirty after state change.');
        }));
        it('should remove a selected option from the value on destroy', testing_2.fakeAsync(function () {
            listOptions[1].selected = true;
            listOptions[2].selected = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedOptions).toEqual(['opt2', 'opt3']);
            fixture.componentInstance.renderLastOption = false;
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.selectedOptions).toEqual(['opt2']);
        }));
        it('should update the model if an option got selected via the model', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.selectedOptions).toEqual([]);
            selectionListDebug.componentInstance.selectedOptions.select(listOptions[0]);
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.selectedOptions).toEqual(['opt1']);
        }));
        it('should not dispatch the model change event if nothing changed using selectAll', function () {
            expect(fixture.componentInstance.modelChangeSpy).not.toHaveBeenCalled();
            selectionListDebug.componentInstance.selectAll();
            fixture.detectChanges();
            expect(fixture.componentInstance.modelChangeSpy).toHaveBeenCalledTimes(1);
            selectionListDebug.componentInstance.selectAll();
            fixture.detectChanges();
            expect(fixture.componentInstance.modelChangeSpy).toHaveBeenCalledTimes(1);
        });
        it('should not dispatch the model change event if nothing changed using selectAll', function () {
            expect(fixture.componentInstance.modelChangeSpy).not.toHaveBeenCalled();
            selectionListDebug.componentInstance.deselectAll();
            fixture.detectChanges();
            expect(fixture.componentInstance.modelChangeSpy).not.toHaveBeenCalled();
        });
    });
    describe('and formControl', function () {
        var fixture;
        var listOptions;
        var selectionList;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SelectionListWithFormControl);
            fixture.detectChanges();
            selectionList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatSelectionList)).componentInstance;
            listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))
                .map(function (optionDebugEl) { return optionDebugEl.componentInstance; });
        });
        it('should be able to disable options from the control', function () {
            expect(selectionList.disabled)
                .toBe(false, 'Expected the selection list to be enabled.');
            expect(listOptions.every(function (option) { return !option.disabled; }))
                .toBe(true, 'Expected every list option to be enabled.');
            fixture.componentInstance.formControl.disable();
            fixture.detectChanges();
            expect(selectionList.disabled)
                .toBe(true, 'Expected the selection list to be disabled.');
            expect(listOptions.every(function (option) { return option.disabled; }))
                .toBe(true, 'Expected every list option to be disabled.');
        });
        it('should be able to update the disabled property after form control disabling', function () {
            expect(listOptions.every(function (option) { return !option.disabled; }))
                .toBe(true, 'Expected every list option to be enabled.');
            fixture.componentInstance.formControl.disable();
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return option.disabled; }))
                .toBe(true, 'Expected every list option to be disabled.');
            // Previously the selection list has been disabled through FormControl#disable. Now we
            // want to verify that we can still change the disabled state through updating the disabled
            // property. Calling FormControl#disable should not lock the disabled property.
            // See: https://github.com/angular/material2/issues/12107
            selectionList.disabled = false;
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return !option.disabled; }))
                .toBe(true, 'Expected every list option to be enabled.');
        });
        it('should be able to set the value through the form control', function () {
            expect(listOptions.every(function (option) { return !option.selected; }))
                .toBe(true, 'Expected every list option to be unselected.');
            fixture.componentInstance.formControl.setValue(['opt2', 'opt3']);
            fixture.detectChanges();
            expect(listOptions[1].selected).toBe(true, 'Expected second option to be selected.');
            expect(listOptions[2].selected).toBe(true, 'Expected third option to be selected.');
            fixture.componentInstance.formControl.setValue(null);
            fixture.detectChanges();
            expect(listOptions.every(function (option) { return !option.selected; }))
                .toBe(true, 'Expected every list option to be unselected.');
        });
        it('should mark options as selected when the value is set before they are initialized', function () {
            fixture.destroy();
            fixture = testing_2.TestBed.createComponent(SelectionListWithFormControl);
            fixture.componentInstance.formControl.setValue(['opt2', 'opt3']);
            fixture.detectChanges();
            listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))
                .map(function (optionDebugEl) { return optionDebugEl.componentInstance; });
            expect(listOptions[1].selected).toBe(true, 'Expected second option to be selected.');
            expect(listOptions[2].selected).toBe(true, 'Expected third option to be selected.');
        });
    });
    describe('preselected values', function () {
        it('should add preselected options to the model value', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectionListWithPreselectedOption);
            var listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))
                .map(function (optionDebugEl) { return optionDebugEl.componentInstance; });
            fixture.detectChanges();
            testing_2.tick();
            expect(listOptions[1].selected).toBe(true);
            expect(fixture.componentInstance.selectedOptions).toEqual(['opt2']);
        }));
        it('should handle preselected option both through the model and the view', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectionListWithPreselectedOptionAndModel);
            var listOptions = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))
                .map(function (optionDebugEl) { return optionDebugEl.componentInstance; });
            fixture.detectChanges();
            testing_2.tick();
            expect(listOptions[0].selected).toBe(true);
            expect(listOptions[1].selected).toBe(true);
            expect(fixture.componentInstance.selectedOptions).toEqual(['opt1', 'opt2']);
        }));
        it('should show the item as selected when preselected inside OnPush parent', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectionListWithPreselectedFormControlOnPush);
            fixture.detectChanges();
            var option = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatListOption))[1];
            fixture.detectChanges();
            testing_2.flush();
            fixture.detectChanges();
            expect(option.componentInstance.selected).toBe(true);
            expect(option.nativeElement.querySelector('.mat-pseudo-checkbox-checked')).toBeTruthy();
        }));
    });
    describe('with custom compare function', function () {
        it('should use a custom comparator to determine which options are selected', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(SelectionListWithCustomComparator);
            var testComponent = fixture.componentInstance;
            testComponent.compareWith = jasmine.createSpy('comparator', function (o1, o2) {
                return o1 && o2 && o1.id === o2.id;
            }).and.callThrough();
            testComponent.selectedOptions = [{ id: 2, label: 'Two' }];
            fixture.detectChanges();
            testing_2.tick();
            expect(testComponent.compareWith).toHaveBeenCalled();
            expect(testComponent.optionInstances.toArray()[1].selected).toBe(true);
        }));
    });
});
var SelectionListWithListOptions = /** @class */ (function () {
    function SelectionListWithListOptions() {
        this.showLastOption = true;
    }
    SelectionListWithListOptions.prototype.onValueChange = function (_change) { };
    SelectionListWithListOptions.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-selection-list id=\"selection-list-1\" (selectionChange)=\"onValueChange($event)\">\n    <mat-list-option checkboxPosition=\"before\" disabled=\"true\" value=\"inbox\">\n      Inbox (disabled selection-option)\n    </mat-list-option>\n    <mat-list-option id=\"testSelect\" checkboxPosition=\"before\" class=\"test-native-focus\"\n                    value=\"starred\">\n      Starred\n    </mat-list-option>\n    <mat-list-option checkboxPosition=\"before\" value=\"sent-mail\">\n      Sent Mail\n    </mat-list-option>\n    <mat-list-option checkboxPosition=\"before\" value=\"drafts\" *ngIf=\"showLastOption\">\n      Drafts\n    </mat-list-option>\n  </mat-selection-list>" },] },
    ];
    return SelectionListWithListOptions;
}());
var SelectionListWithCheckboxPositionAfter = /** @class */ (function () {
    function SelectionListWithCheckboxPositionAfter() {
    }
    SelectionListWithCheckboxPositionAfter.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-selection-list id=\"selection-list-2\">\n    <mat-list-option checkboxPosition=\"after\">\n      Inbox (disabled selection-option)\n    </mat-list-option>\n    <mat-list-option id=\"testSelect\" checkboxPosition=\"after\">\n      Starred\n    </mat-list-option>\n    <mat-list-option checkboxPosition=\"after\">\n      Sent Mail\n    </mat-list-option>\n    <mat-list-option checkboxPosition=\"after\">\n      Drafts\n    </mat-list-option>\n  </mat-selection-list>" },] },
    ];
    return SelectionListWithCheckboxPositionAfter;
}());
var SelectionListWithListDisabled = /** @class */ (function () {
    function SelectionListWithListDisabled() {
        this.disabled = true;
    }
    SelectionListWithListDisabled.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-selection-list id=\"selection-list-3\" [disabled]=\"disabled\">\n    <mat-list-option checkboxPosition=\"after\">\n      Inbox (disabled selection-option)\n    </mat-list-option>\n    <mat-list-option id=\"testSelect\" checkboxPosition=\"after\">\n      Starred\n    </mat-list-option>\n    <mat-list-option checkboxPosition=\"after\">\n      Sent Mail\n    </mat-list-option>\n    <mat-list-option checkboxPosition=\"after\">\n      Drafts\n    </mat-list-option>\n  </mat-selection-list>" },] },
    ];
    return SelectionListWithListDisabled;
}());
var SelectionListWithDisabledOption = /** @class */ (function () {
    function SelectionListWithDisabledOption() {
        this.disableItem = false;
    }
    SelectionListWithDisabledOption.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-selection-list>\n    <mat-list-option [disabled]=\"disableItem\">Item</mat-list-option>\n  </mat-selection-list>\n  " },] },
    ];
    return SelectionListWithDisabledOption;
}());
var SelectionListWithSelectedOption = /** @class */ (function () {
    function SelectionListWithSelectedOption() {
    }
    SelectionListWithSelectedOption.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-selection-list>\n    <mat-list-option [selected]=\"true\">Item</mat-list-option>\n  </mat-selection-list>" },] },
    ];
    return SelectionListWithSelectedOption;
}());
var SelectionListWithOnlyOneOption = /** @class */ (function () {
    function SelectionListWithOnlyOneOption() {
    }
    SelectionListWithOnlyOneOption.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-selection-list id=\"selection-list-4\">\n    <mat-list-option checkboxPosition=\"after\" class=\"test-focus\" id=\"123\">\n      Inbox\n    </mat-list-option>\n  </mat-selection-list>" },] },
    ];
    return SelectionListWithOnlyOneOption;
}());
var SelectionListWithTabindexAttr = /** @class */ (function () {
    function SelectionListWithTabindexAttr() {
    }
    SelectionListWithTabindexAttr.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-selection-list tabindex=\"5\"></mat-selection-list>"
                },] },
    ];
    return SelectionListWithTabindexAttr;
}());
var SelectionListWithTabindexBinding = /** @class */ (function () {
    function SelectionListWithTabindexBinding() {
    }
    SelectionListWithTabindexBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "<mat-selection-list [tabIndex]=\"tabIndex\" [disabled]=\"disabled\"></mat-selection-list>"
                },] },
    ];
    return SelectionListWithTabindexBinding;
}());
var SelectionListWithModel = /** @class */ (function () {
    function SelectionListWithModel() {
        this.modelChangeSpy = jasmine.createSpy('model change spy');
        this.selectedOptions = [];
        this.renderLastOption = true;
    }
    SelectionListWithModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-selection-list [(ngModel)]=\"selectedOptions\" (ngModelChange)=\"modelChangeSpy()\">\n      <mat-list-option value=\"opt1\">Option 1</mat-list-option>\n      <mat-list-option value=\"opt2\">Option 2</mat-list-option>\n      <mat-list-option value=\"opt3\" *ngIf=\"renderLastOption\">Option 3</mat-list-option>\n    </mat-selection-list>"
                },] },
    ];
    return SelectionListWithModel;
}());
var SelectionListWithFormControl = /** @class */ (function () {
    function SelectionListWithFormControl() {
        this.formControl = new forms_1.FormControl();
    }
    SelectionListWithFormControl.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-selection-list [formControl]=\"formControl\">\n      <mat-list-option value=\"opt1\">Option 1</mat-list-option>\n      <mat-list-option value=\"opt2\">Option 2</mat-list-option>\n      <mat-list-option value=\"opt3\">Option 3</mat-list-option>\n    </mat-selection-list>\n  "
                },] },
    ];
    return SelectionListWithFormControl;
}());
var SelectionListWithPreselectedOption = /** @class */ (function () {
    function SelectionListWithPreselectedOption() {
    }
    SelectionListWithPreselectedOption.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-selection-list [(ngModel)]=\"selectedOptions\">\n      <mat-list-option value=\"opt1\">Option 1</mat-list-option>\n      <mat-list-option value=\"opt2\" selected>Option 2</mat-list-option>\n    </mat-selection-list>"
                },] },
    ];
    return SelectionListWithPreselectedOption;
}());
var SelectionListWithPreselectedOptionAndModel = /** @class */ (function () {
    function SelectionListWithPreselectedOptionAndModel() {
        this.selectedOptions = ['opt1'];
    }
    SelectionListWithPreselectedOptionAndModel.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-selection-list [(ngModel)]=\"selectedOptions\">\n      <mat-list-option value=\"opt1\">Option 1</mat-list-option>\n      <mat-list-option value=\"opt2\" selected>Option 2</mat-list-option>\n    </mat-selection-list>"
                },] },
    ];
    return SelectionListWithPreselectedOptionAndModel;
}());
var SelectionListWithPreselectedFormControlOnPush = /** @class */ (function () {
    function SelectionListWithPreselectedFormControlOnPush() {
        this.opts = ['opt1', 'opt2', 'opt3'];
        this.formControl = new forms_1.FormControl(['opt2']);
    }
    SelectionListWithPreselectedFormControlOnPush.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <mat-selection-list [formControl]=\"formControl\">\n      <mat-list-option *ngFor=\"let opt of opts\" [value]=\"opt\">{{opt}}</mat-list-option>\n    </mat-selection-list>\n  "
                },] },
    ];
    return SelectionListWithPreselectedFormControlOnPush;
}());
var SelectionListWithCustomComparator = /** @class */ (function () {
    function SelectionListWithCustomComparator() {
        this.selectedOptions = [];
        this.options = [
            { id: 1, label: 'One' },
            { id: 2, label: 'Two' },
            { id: 3, label: 'Three' }
        ];
    }
    SelectionListWithCustomComparator.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-selection-list [(ngModel)]=\"selectedOptions\" [compareWith]=\"compareWith\">\n      <mat-list-option *ngFor=\"let option of options\" [value]=\"option\">\n        {{option.label}}\n      </mat-list-option>\n    </mat-selection-list>"
                },] },
    ];
    /** @nocollapse */
    SelectionListWithCustomComparator.propDecorators = {
        "optionInstances": [{ type: core_1.ViewChildren, args: [index_1.MatListOption,] },],
    };
    return SelectionListWithCustomComparator;
}());
//# sourceMappingURL=selection-list.spec.js.map