"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/cdk/testing");
var activedescendant_key_manager_1 = require("./activedescendant-key-manager");
var focus_key_manager_1 = require("./focus-key-manager");
var list_key_manager_1 = require("./list-key-manager");
var rxjs_1 = require("rxjs");
var FakeFocusable = /** @class */ (function () {
    function FakeFocusable(_label) {
        if (_label === void 0) { _label = ''; }
        this._label = _label;
        /** Whether the item is disabled or not. */
        this.disabled = false;
        /** Test property that can be used to test the `skipPredicate` functionality. */
        this.skipItem = false;
    }
    FakeFocusable.prototype.focus = function (_focusOrigin) { };
    FakeFocusable.prototype.getLabel = function () { return this._label; };
    return FakeFocusable;
}());
var FakeHighlightable = /** @class */ (function () {
    function FakeHighlightable() {
        this.disabled = false;
    }
    FakeHighlightable.prototype.setActiveStyles = function () { };
    FakeHighlightable.prototype.setInactiveStyles = function () { };
    return FakeHighlightable;
}());
var FakeQueryList = /** @class */ (function (_super) {
    __extends(FakeQueryList, _super);
    function FakeQueryList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changes = new rxjs_1.Subject();
        return _this;
    }
    Object.defineProperty(FakeQueryList.prototype, "length", {
        get: function () { return this.items.length; },
        set: function (_) {
            /* Empty setter for base class constructor */ 
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FakeQueryList.prototype, "first", {
        get: function () { return this.items[0]; },
        enumerable: true,
        configurable: true
    });
    FakeQueryList.prototype.toArray = function () { return this.items; };
    FakeQueryList.prototype.some = function () { return this.items.some.apply(this.items, arguments); };
    FakeQueryList.prototype.notifyOnChanges = function () { this.changes.next(this); };
    return FakeQueryList;
}(core_1.QueryList));
describe('Key managers', function () {
    var itemList;
    var fakeKeyEvents;
    beforeEach(function () {
        itemList = new FakeQueryList();
        fakeKeyEvents = {
            downArrow: testing_2.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW),
            upArrow: testing_2.createKeyboardEvent('keydown', keycodes_1.UP_ARROW),
            leftArrow: testing_2.createKeyboardEvent('keydown', keycodes_1.LEFT_ARROW),
            rightArrow: testing_2.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW),
            tab: testing_2.createKeyboardEvent('keydown', keycodes_1.TAB),
            unsupported: testing_2.createKeyboardEvent('keydown', 192) // corresponds to the tilde character (~)
        };
    });
    describe('ListKeyManager', function () {
        var keyManager;
        beforeEach(function () {
            itemList.items = [
                new FakeFocusable('one'),
                new FakeFocusable('two'),
                new FakeFocusable('three')
            ];
            keyManager = new list_key_manager_1.ListKeyManager(itemList);
            // first item is already focused
            keyManager.setFirstItemActive();
            spyOn(keyManager, 'setActiveItem').and.callThrough();
        });
        it('should maintain the active item if the amount of items changes', function () {
            expect(keyManager.activeItemIndex).toBe(0);
            expect(keyManager.activeItem.getLabel()).toBe('one');
            itemList.items.unshift(new FakeFocusable('zero'));
            itemList.notifyOnChanges();
            expect(keyManager.activeItemIndex).toBe(1);
            expect(keyManager.activeItem.getLabel()).toBe('one');
        });
        describe('Key events', function () {
            it('should emit tabOut when the tab key is pressed', function () {
                var spy = jasmine.createSpy('tabOut spy');
                keyManager.tabOut.pipe(operators_1.take(1)).subscribe(spy);
                keyManager.onKeydown(fakeKeyEvents.tab);
                expect(spy).toHaveBeenCalled();
            });
            it('should emit an event whenever the active item changes', function () {
                var spy = jasmine.createSpy('change spy');
                var subscription = keyManager.change.subscribe(spy);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(spy).toHaveBeenCalledTimes(1);
                keyManager.onKeydown(fakeKeyEvents.upArrow);
                expect(spy).toHaveBeenCalledTimes(2);
                subscription.unsubscribe();
            });
            it('should activate the first item when pressing down on a clean key manager', function () {
                keyManager = new list_key_manager_1.ListKeyManager(itemList);
                expect(keyManager.activeItemIndex).toBe(-1, 'Expected active index to default to -1.');
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(0, 'Expected first item to become active.');
            });
            it('should not prevent the default keyboard action when pressing tab', function () {
                expect(fakeKeyEvents.tab.defaultPrevented).toBe(false);
                keyManager.onKeydown(fakeKeyEvents.tab);
                expect(fakeKeyEvents.tab.defaultPrevented).toBe(false);
            });
            it('should not do anything for unsupported key presses', function () {
                keyManager.setActiveItem(1);
                expect(keyManager.activeItemIndex).toBe(1);
                expect(fakeKeyEvents.unsupported.defaultPrevented).toBe(false);
                keyManager.onKeydown(fakeKeyEvents.unsupported);
                expect(keyManager.activeItemIndex).toBe(1);
                expect(fakeKeyEvents.unsupported.defaultPrevented).toBe(false);
            });
            it('should ignore the horizontal keys when only in vertical mode', function () {
                keyManager.withVerticalOrientation().withHorizontalOrientation(null);
                expect(keyManager.activeItemIndex).toBe(0);
                keyManager.onKeydown(fakeKeyEvents.rightArrow);
                expect(keyManager.activeItemIndex).toBe(0);
                expect(fakeKeyEvents.rightArrow.defaultPrevented).toBe(false);
            });
            it('should ignore the horizontal keys when only in horizontal mode', function () {
                keyManager.withVerticalOrientation(false).withHorizontalOrientation('ltr');
                expect(keyManager.activeItemIndex).toBe(0);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(0);
                expect(fakeKeyEvents.downArrow.defaultPrevented).toBe(false);
            });
            describe('with `vertical` direction', function () {
                beforeEach(function () {
                    keyManager.withVerticalOrientation();
                    _this.nextKeyEvent = testing_2.createKeyboardEvent('keydown', keycodes_1.DOWN_ARROW);
                    _this.prevKeyEvent = testing_2.createKeyboardEvent('keydown', keycodes_1.UP_ARROW);
                });
                runDirectionalKeyTests.call(_this);
            });
            describe('with `ltr` direction', function () {
                beforeEach(function () {
                    keyManager.withHorizontalOrientation('ltr');
                    _this.nextKeyEvent = testing_2.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW);
                    _this.prevKeyEvent = testing_2.createKeyboardEvent('keydown', keycodes_1.LEFT_ARROW);
                });
                runDirectionalKeyTests.call(_this);
            });
            describe('with `rtl` direction', function () {
                beforeEach(function () {
                    keyManager.withHorizontalOrientation('rtl');
                    _this.nextKeyEvent = testing_2.createKeyboardEvent('keydown', keycodes_1.LEFT_ARROW);
                    _this.prevKeyEvent = testing_2.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW);
                });
                runDirectionalKeyTests.call(_this);
            });
            /**
                   * Defines the directional key tests that should be run in a particular context. Note that
                   * parameters have to be passed in via Jasmine's context object (`this` inside a `beforeEach`)
                   * because this function has to run before any `beforeEach`, `beforeAll` etc. hooks.
                   */
            function runDirectionalKeyTests() {
                var _this = this;
                it('should set subsequent items as active when the next key is pressed', function () {
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(1, 'Expected active item to be 1 after one next key event.');
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(1);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(2);
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(2, 'Expected active item to be 2 after two next key events.');
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(2);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                });
                it('should set first item active when the next key is pressed if no active item', function () {
                    keyManager.setActiveItem(-1);
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(0, 'Expected active item to be 0 after next key if active item was null.');
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(1);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(2);
                });
                it('should set previous items as active when the previous key is pressed', function () {
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(1, 'Expected active item to be 1 after one next key event.');
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(1);
                    keyManager.onKeydown(_this.prevKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(0, 'Expected active item to be 0 after one next and one previous key event.');
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(0);
                });
                it('should do nothing when the prev key is pressed if no active item and not wrap', function () {
                    keyManager.setActiveItem(-1);
                    keyManager.onKeydown(_this.prevKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(-1, 'Expected nothing to happen if prev event occurs and no active item.');
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(1);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(2);
                });
                it('should skip disabled items', function () {
                    itemList.items[1].disabled = true;
                    // Next event should skip past disabled item from 0 to 2
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(2, 'Expected active item to skip past disabled item on next event.');
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(1);
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(2);
                    // Previous event should skip past disabled item from 2 to 0
                    keyManager.onKeydown(_this.prevKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(0, 'Expected active item to skip past disabled item on up arrow.');
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(1);
                });
                it('should work normally when disabled property does not exist', function () {
                    itemList.items[0].disabled = undefined;
                    itemList.items[1].disabled = undefined;
                    itemList.items[2].disabled = undefined;
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(1, 'Expected active item to be 1 after one next event when disabled not set.');
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(1);
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(2);
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(2, 'Expected active item to be 2 after two next events when disabled not set.');
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                    expect(keyManager.setActiveItem).toHaveBeenCalledWith(2);
                });
                it('should not move active item past either end of the list', function () {
                    keyManager.onKeydown(_this.nextKeyEvent);
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(2, "Expected last item of the list to be active.");
                    // This next event would move active item past the end of the list
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(2, "Expected active item to remain at the end of the list.");
                    keyManager.onKeydown(_this.prevKeyEvent);
                    keyManager.onKeydown(_this.prevKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(0, "Expected first item of the list to be active.");
                    // This prev event would move active item past the beginning of the list
                    keyManager.onKeydown(_this.prevKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(0, "Expected active item to remain at the beginning of the list.");
                });
                it('should not move active item to end when the last item is disabled', function () {
                    itemList.items[2].disabled = true;
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(1, "Expected second item of the list to be active.");
                    // This next key event would set active item to the last item, which is disabled
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(keyManager.activeItemIndex)
                        .toBe(1, "Expected the second item to remain active.");
                    expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(2);
                });
                it('should prevent the default keyboard action of handled events', function () {
                    expect(_this.nextKeyEvent.defaultPrevented).toBe(false);
                    keyManager.onKeydown(_this.nextKeyEvent);
                    expect(_this.nextKeyEvent.defaultPrevented).toBe(true);
                    expect(_this.prevKeyEvent.defaultPrevented).toBe(false);
                    keyManager.onKeydown(_this.prevKeyEvent);
                    expect(_this.prevKeyEvent.defaultPrevented).toBe(true);
                });
            }
        });
        describe('programmatic focus', function () {
            it('should setActiveItem()', function () {
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected first item of the list to be active.");
                keyManager.setActiveItem(1);
                expect(keyManager.activeItemIndex)
                    .toBe(1, "Expected activeItemIndex to be updated when setActiveItem() was called.");
            });
            it('should be able to set the active item by reference', function () {
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected first item of the list to be active.");
                keyManager.setActiveItem(itemList.items[2]);
                expect(keyManager.activeItemIndex)
                    .toBe(2, "Expected activeItemIndex to be updated.");
            });
            it('should be able to set the active item without emitting an event', function () {
                var spy = jasmine.createSpy('change spy');
                var subscription = keyManager.change.subscribe(spy);
                expect(keyManager.activeItemIndex).toBe(0);
                keyManager.updateActiveItem(2);
                expect(keyManager.activeItemIndex).toBe(2);
                expect(spy).not.toHaveBeenCalled();
                subscription.unsubscribe();
            });
            it('should expose the active item correctly', function () {
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(1, 'Expected active item to be the second option.');
                expect(keyManager.activeItem)
                    .toBe(itemList.items[1], 'Expected the active item to match the second option.');
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(2, 'Expected active item to be the third option.');
                expect(keyManager.activeItem)
                    .toBe(itemList.items[2], 'Expected the active item ID to match the third option.');
            });
            it('should setFirstItemActive()', function () {
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex)
                    .toBe(2, "Expected last item of the list to be active.");
                keyManager.setFirstItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected setFirstItemActive() to set the active item to the first item.");
            });
            it('should set the active item to the second item if the first one is disabled', function () {
                itemList.items[0].disabled = true;
                keyManager.setFirstItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(1, "Expected the second item to be active if the first was disabled.");
            });
            it('should setLastItemActive()', function () {
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected first item of the list to be active.");
                keyManager.setLastItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(2, "Expected setLastItemActive() to set the active item to the last item.");
            });
            it('should set the active item to the second to last item if the last is disabled', function () {
                itemList.items[2].disabled = true;
                keyManager.setLastItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(1, "Expected the second to last item to be active if the last was disabled.");
            });
            it('should setNextItemActive()', function () {
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected first item of the list to be active.");
                keyManager.setNextItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(1, "Expected setNextItemActive() to set the active item to the next item.");
            });
            it('should set the active item to the next enabled item if next is disabled', function () {
                itemList.items[1].disabled = true;
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected first item of the list to be active.");
                keyManager.setNextItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(2, "Expected setNextItemActive() to only set enabled items as active.");
            });
            it('should setPreviousItemActive()', function () {
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex)
                    .toBe(1, "Expected second item of the list to be active.");
                keyManager.setPreviousItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected setPreviousItemActive() to set the active item to the previous.");
            });
            it('should skip disabled items when setPreviousItemActive() is called', function () {
                itemList.items[1].disabled = true;
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex)
                    .toBe(2, "Expected third item of the list to be active.");
                keyManager.setPreviousItemActive();
                expect(keyManager.activeItemIndex)
                    .toBe(0, "Expected setPreviousItemActive() to skip the disabled item.");
            });
            it('should not emit an event if the item did not change', function () {
                var spy = jasmine.createSpy('change spy');
                var subscription = keyManager.change.subscribe(spy);
                keyManager.setActiveItem(2);
                keyManager.setActiveItem(2);
                expect(spy).toHaveBeenCalledTimes(1);
                subscription.unsubscribe();
            });
        });
        describe('wrap mode', function () {
            it('should return itself to allow chaining', function () {
                expect(keyManager.withWrap())
                    .toEqual(keyManager, "Expected withWrap() to return an instance of ListKeyManager.");
            });
            it('should wrap focus when arrow keying past items while in wrap mode', function () {
                keyManager.withWrap();
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(2, 'Expected last item to be active.');
                // this down arrow moves down past the end of the list
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(0, 'Expected active item to wrap to beginning.');
                // this up arrow moves up past the beginning of the list
                keyManager.onKeydown(fakeKeyEvents.upArrow);
                expect(keyManager.activeItemIndex).toBe(2, 'Expected active item to wrap to end.');
            });
            it('should set last item active when up arrow is pressed if no active item', function () {
                keyManager.withWrap();
                keyManager.setActiveItem(-1);
                keyManager.onKeydown(fakeKeyEvents.upArrow);
                expect(keyManager.activeItemIndex)
                    .toBe(2, 'Expected last item to be active on up arrow if no active item.');
                expect(keyManager.setActiveItem).not.toHaveBeenCalledWith(0);
                expect(keyManager.setActiveItem).toHaveBeenCalledWith(2);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex)
                    .toBe(0, 'Expected active item to be 0 after wrapping back to beginning.');
                expect(keyManager.setActiveItem).toHaveBeenCalledWith(0);
            });
            // This test should pass if all items are disabled and the down arrow key got pressed.
            // If the test setup crashes or this test times out, this test can be considered as failed.
            it('should not get into an infinite loop if all items are disabled', function () {
                keyManager.withWrap();
                keyManager.setActiveItem(0);
                itemList.items.forEach(function (item) { return item.disabled = true; });
                keyManager.onKeydown(fakeKeyEvents.downArrow);
            });
            it('should be able to disable wrapping', function () {
                keyManager.withWrap();
                keyManager.setFirstItemActive();
                keyManager.onKeydown(fakeKeyEvents.upArrow);
                expect(keyManager.activeItemIndex).toBe(itemList.items.length - 1);
                keyManager.withWrap(false);
                keyManager.setFirstItemActive();
                keyManager.onKeydown(fakeKeyEvents.upArrow);
                expect(keyManager.activeItemIndex).toBe(0);
            });
        });
        describe('skip predicate', function () {
            it('should skip disabled items by default', function () {
                itemList.items[1].disabled = true;
                expect(keyManager.activeItemIndex).toBe(0);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(2);
            });
            it('should be able to skip items with a custom predicate', function () {
                keyManager.skipPredicate(function (item) { return item.skipItem; });
                itemList.items[1].skipItem = true;
                expect(keyManager.activeItemIndex).toBe(0);
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                expect(keyManager.activeItemIndex).toBe(2);
            });
        });
        describe('typeahead mode', function () {
            var debounceInterval = 300;
            beforeEach(function () {
                keyManager.withTypeAhead(debounceInterval);
                keyManager.setActiveItem(-1);
            });
            it('should throw if the items do not implement the getLabel method', function () {
                var invalidQueryList = new FakeQueryList();
                invalidQueryList.items = [{ disabled: false }];
                var invalidManager = new list_key_manager_1.ListKeyManager(invalidQueryList);
                expect(function () { return invalidManager.withTypeAhead(); }).toThrowError(/must implement/);
            });
            it('should debounce the input key presses', testing_1.fakeAsync(function () {
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 79, undefined, 'o')); // types "o"
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 78, undefined, 'n')); // types "n"
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 69, undefined, 'e')); // types "e"
                expect(keyManager.activeItem).not.toBe(itemList.items[0]);
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[0]);
            }));
            it('should focus the first item that starts with a letter', testing_1.fakeAsync(function () {
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 84, undefined, 't')); // types "t"
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[1]);
            }));
            it('should focus the first item that starts with sequence of letters', testing_1.fakeAsync(function () {
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 84, undefined, 't')); // types "t"
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 72, undefined, 'h')); // types "h"
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[2]);
            }));
            it('should cancel any pending timers if a navigation key is pressed', testing_1.fakeAsync(function () {
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 84, undefined, 't')); // types "t"
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 72, undefined, 'h')); // types "h"
                keyManager.onKeydown(fakeKeyEvents.downArrow);
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[0]);
            }));
            it('should handle non-English input', testing_1.fakeAsync(function () {
                itemList.items = [
                    new FakeFocusable('едно'),
                    new FakeFocusable('две'),
                    new FakeFocusable('три')
                ];
                var keyboardEvent = testing_2.createKeyboardEvent('keydown', 68, undefined, 'д');
                keyManager.onKeydown(keyboardEvent); // types "д"
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[1]);
            }));
            it('should handle non-letter characters', testing_1.fakeAsync(function () {
                itemList.items = [
                    new FakeFocusable('[]'),
                    new FakeFocusable('321'),
                    new FakeFocusable('`!?')
                ];
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 192, undefined, '`')); // types "`"
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[2]);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 51, undefined, '3')); // types "3"
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[1]);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 219, undefined, '[')); // types "["
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[0]);
            }));
            it('should not focus disabled items', testing_1.fakeAsync(function () {
                expect(keyManager.activeItem).toBeFalsy();
                itemList.items[0].disabled = true;
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 79, undefined, 'o')); // types "o"
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBeFalsy();
            }));
            it('should start looking for matches after the active item', testing_1.fakeAsync(function () {
                itemList.items = [
                    new FakeFocusable('Bilbo'),
                    new FakeFocusable('Frodo'),
                    new FakeFocusable('Pippin'),
                    new FakeFocusable('Boromir'),
                    new FakeFocusable('Aragorn')
                ];
                keyManager.setActiveItem(1);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 66, undefined, 'b'));
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[3]);
            }));
            it('should wrap back around if there were no matches after the active item', testing_1.fakeAsync(function () {
                itemList.items = [
                    new FakeFocusable('Bilbo'),
                    new FakeFocusable('Frodo'),
                    new FakeFocusable('Pippin'),
                    new FakeFocusable('Boromir'),
                    new FakeFocusable('Aragorn')
                ];
                keyManager.setActiveItem(3);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 66, undefined, 'b'));
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[0]);
            }));
            it('should wrap back around if the last item is active', testing_1.fakeAsync(function () {
                keyManager.setActiveItem(2);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 79, undefined, 'o'));
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[0]);
            }));
            it('should be able to select the first item', testing_1.fakeAsync(function () {
                keyManager.setActiveItem(-1);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 79, undefined, 'o'));
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[0]);
            }));
            it('should not do anything if there is no match', testing_1.fakeAsync(function () {
                keyManager.setActiveItem(1);
                keyManager.onKeydown(testing_2.createKeyboardEvent('keydown', 87, undefined, 'w'));
                testing_1.tick(debounceInterval);
                expect(keyManager.activeItem).toBe(itemList.items[1]);
            }));
        });
    });
    describe('FocusKeyManager', function () {
        var keyManager;
        beforeEach(function () {
            itemList.items = [new FakeFocusable(), new FakeFocusable(), new FakeFocusable()];
            keyManager = new focus_key_manager_1.FocusKeyManager(itemList);
            // first item is already focused
            keyManager.setFirstItemActive();
            spyOn(itemList.items[0], 'focus');
            spyOn(itemList.items[1], 'focus');
            spyOn(itemList.items[2], 'focus');
        });
        it('should focus subsequent items when down arrow is pressed', function () {
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[0].focus).not.toHaveBeenCalled();
            expect(itemList.items[1].focus).toHaveBeenCalledTimes(1);
            expect(itemList.items[2].focus).not.toHaveBeenCalled();
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[0].focus).not.toHaveBeenCalled();
            expect(itemList.items[1].focus).toHaveBeenCalledTimes(1);
            expect(itemList.items[2].focus).toHaveBeenCalledTimes(1);
        });
        it('should focus previous items when up arrow is pressed', function () {
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[0].focus).not.toHaveBeenCalled();
            expect(itemList.items[1].focus).toHaveBeenCalledTimes(1);
            keyManager.onKeydown(fakeKeyEvents.upArrow);
            expect(itemList.items[0].focus).toHaveBeenCalledTimes(1);
            expect(itemList.items[1].focus).toHaveBeenCalledTimes(1);
        });
        it('should allow setting the focused item without calling focus', function () {
            expect(keyManager.activeItemIndex)
                .toBe(0, "Expected first item of the list to be active.");
            keyManager.updateActiveItem(1);
            expect(keyManager.activeItemIndex)
                .toBe(1, "Expected activeItemIndex to update after calling updateActiveItemIndex().");
            expect(itemList.items[1].focus).not.toHaveBeenCalledTimes(1);
        });
        it('should be able to set the focus origin', function () {
            keyManager.setFocusOrigin('mouse');
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[1].focus).toHaveBeenCalledWith('mouse');
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[2].focus).toHaveBeenCalledWith('mouse');
            keyManager.setFocusOrigin('keyboard');
            keyManager.onKeydown(fakeKeyEvents.upArrow);
            expect(itemList.items[1].focus).toHaveBeenCalledWith('keyboard');
        });
    });
    describe('ActiveDescendantKeyManager', function () {
        var keyManager;
        beforeEach(function () {
            itemList.items = [new FakeHighlightable(), new FakeHighlightable(), new FakeHighlightable()];
            keyManager = new activedescendant_key_manager_1.ActiveDescendantKeyManager(itemList);
            // first item is already focused
            keyManager.setFirstItemActive();
            spyOn(itemList.items[0], 'setActiveStyles');
            spyOn(itemList.items[1], 'setActiveStyles');
            spyOn(itemList.items[2], 'setActiveStyles');
            spyOn(itemList.items[0], 'setInactiveStyles');
            spyOn(itemList.items[1], 'setInactiveStyles');
            spyOn(itemList.items[2], 'setInactiveStyles');
        });
        it('should set subsequent items as active with the DOWN arrow', function () {
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[1].setActiveStyles).toHaveBeenCalled();
            expect(itemList.items[2].setActiveStyles).not.toHaveBeenCalled();
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[2].setActiveStyles).toHaveBeenCalled();
        });
        it('should set previous items as active with the UP arrow', function () {
            keyManager.setLastItemActive();
            keyManager.onKeydown(fakeKeyEvents.upArrow);
            expect(itemList.items[1].setActiveStyles).toHaveBeenCalled();
            expect(itemList.items[0].setActiveStyles).not.toHaveBeenCalled();
            keyManager.onKeydown(fakeKeyEvents.upArrow);
            expect(itemList.items[0].setActiveStyles).toHaveBeenCalled();
        });
        it('should set inactive styles on previously active items', function () {
            keyManager.onKeydown(fakeKeyEvents.downArrow);
            expect(itemList.items[0].setInactiveStyles).toHaveBeenCalled();
            keyManager.onKeydown(fakeKeyEvents.upArrow);
            expect(itemList.items[1].setInactiveStyles).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=list-key-manager.spec.js.map