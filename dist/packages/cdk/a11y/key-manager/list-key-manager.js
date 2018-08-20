"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var keycodes_1 = require("@angular/cdk/keycodes");
var operators_1 = require("rxjs/operators");
/**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
var /**
 * This class manages keyboard events for selectable lists. If you pass it a query list
 * of items, it will set the active item correctly when arrow events occur.
 */
ListKeyManager = /** @class */ (function () {
    function ListKeyManager(_items) {
        var _this = this;
        this._items = _items;
        this._activeItemIndex = -1;
        this._wrap = false;
        this._letterKeyStream = new rxjs_1.Subject();
        this._typeaheadSubscription = rxjs_1.Subscription.EMPTY;
        this._vertical = true;
        /**
           * Predicate function that can be used to check whether an item should be skipped
           * by the key manager. By default, disabled items are skipped.
           */
        this._skipPredicateFn = function (item) { return item.disabled; };
        // Buffer for the letters that the user has pressed when the typeahead option is turned on.
        this._pressedLetters = [];
        /**
           * Stream that emits any time the TAB key is pressed, so components can react
           * when focus is shifted off of the list.
           */
        this.tabOut = new rxjs_1.Subject();
        /** Stream that emits whenever the active item of the list manager changes. */
        this.change = new rxjs_1.Subject();
        // We allow for the items to be an array because, in some cases, the consumer may
        // not have access to a QueryList of the items they want to manage (e.g. when the
        // items aren't being collected via `ViewChildren` or `ContentChildren`).
        if (_items instanceof core_1.QueryList) {
            _items.changes.subscribe(function (newItems) {
                if (_this._activeItem) {
                    var itemArray = newItems.toArray();
                    var newIndex = itemArray.indexOf(_this._activeItem);
                    if (newIndex > -1 && newIndex !== _this._activeItemIndex) {
                        _this._activeItemIndex = newIndex;
                    }
                }
            });
        }
    }
    /**
     * Sets the predicate function that determines which items should be skipped by the
     * list key manager.
     * @param predicate Function that determines whether the given item should be skipped.
     */
    /**
       * Sets the predicate function that determines which items should be skipped by the
       * list key manager.
       * @param predicate Function that determines whether the given item should be skipped.
       */
    ListKeyManager.prototype.skipPredicate = /**
       * Sets the predicate function that determines which items should be skipped by the
       * list key manager.
       * @param predicate Function that determines whether the given item should be skipped.
       */
    function (predicate) {
        this._skipPredicateFn = predicate;
        return this;
    };
    /**
     * Configures wrapping mode, which determines whether the active item will wrap to
     * the other end of list when there are no more items in the given direction.
     * @param shouldWrap Whether the list should wrap when reaching the end.
     */
    /**
       * Configures wrapping mode, which determines whether the active item will wrap to
       * the other end of list when there are no more items in the given direction.
       * @param shouldWrap Whether the list should wrap when reaching the end.
       */
    ListKeyManager.prototype.withWrap = /**
       * Configures wrapping mode, which determines whether the active item will wrap to
       * the other end of list when there are no more items in the given direction.
       * @param shouldWrap Whether the list should wrap when reaching the end.
       */
    function (shouldWrap) {
        if (shouldWrap === void 0) { shouldWrap = true; }
        this._wrap = shouldWrap;
        return this;
    };
    /**
     * Configures whether the key manager should be able to move the selection vertically.
     * @param enabled Whether vertical selection should be enabled.
     */
    /**
       * Configures whether the key manager should be able to move the selection vertically.
       * @param enabled Whether vertical selection should be enabled.
       */
    ListKeyManager.prototype.withVerticalOrientation = /**
       * Configures whether the key manager should be able to move the selection vertically.
       * @param enabled Whether vertical selection should be enabled.
       */
    function (enabled) {
        if (enabled === void 0) { enabled = true; }
        this._vertical = enabled;
        return this;
    };
    /**
     * Configures the key manager to move the selection horizontally.
     * Passing in `null` will disable horizontal movement.
     * @param direction Direction in which the selection can be moved.
     */
    /**
       * Configures the key manager to move the selection horizontally.
       * Passing in `null` will disable horizontal movement.
       * @param direction Direction in which the selection can be moved.
       */
    ListKeyManager.prototype.withHorizontalOrientation = /**
       * Configures the key manager to move the selection horizontally.
       * Passing in `null` will disable horizontal movement.
       * @param direction Direction in which the selection can be moved.
       */
    function (direction) {
        this._horizontal = direction;
        return this;
    };
    /**
     * Turns on typeahead mode which allows users to set the active item by typing.
     * @param debounceInterval Time to wait after the last keystroke before setting the active item.
     */
    /**
       * Turns on typeahead mode which allows users to set the active item by typing.
       * @param debounceInterval Time to wait after the last keystroke before setting the active item.
       */
    ListKeyManager.prototype.withTypeAhead = /**
       * Turns on typeahead mode which allows users to set the active item by typing.
       * @param debounceInterval Time to wait after the last keystroke before setting the active item.
       */
    function (debounceInterval) {
        var _this = this;
        if (debounceInterval === void 0) { debounceInterval = 200; }
        if (this._items.length && this._items.some(function (item) { return typeof item.getLabel !== 'function'; })) {
            throw Error('ListKeyManager items in typeahead mode must implement the `getLabel` method.');
        }
        this._typeaheadSubscription.unsubscribe();
        // Debounce the presses of non-navigational keys, collect the ones that correspond to letters
        // and convert those letters back into a string. Afterwards find the first item that starts
        // with that string and select it.
        this._typeaheadSubscription = this._letterKeyStream.pipe(operators_1.tap(function (keyCode) { return _this._pressedLetters.push(keyCode); }), operators_1.debounceTime(debounceInterval), operators_1.filter(function () { return _this._pressedLetters.length > 0; }), operators_1.map(function () { return _this._pressedLetters.join(''); })).subscribe(function (inputString) {
            var items = _this._getItemsArray();
            // Start at 1 because we want to start searching at the item immediately
            // following the current active item.
            for (var i = 1; i < items.length + 1; i++) {
                var index = (_this._activeItemIndex + i) % items.length;
                var item = items[index];
                if (!_this._skipPredicateFn(item) &&
                    item.getLabel().toUpperCase().trim().indexOf(inputString) === 0) {
                    _this.setActiveItem(index);
                    break;
                }
            }
            _this._pressedLetters = [];
        });
        return this;
    };
    ListKeyManager.prototype.setActiveItem = function (item) {
        var previousIndex = this._activeItemIndex;
        this.updateActiveItem(item);
        if (this._activeItemIndex !== previousIndex) {
            this.change.next(this._activeItemIndex);
        }
    };
    /**
     * Sets the active item depending on the key event passed in.
     * @param event Keyboard event to be used for determining which element should be active.
     */
    /**
       * Sets the active item depending on the key event passed in.
       * @param event Keyboard event to be used for determining which element should be active.
       */
    ListKeyManager.prototype.onKeydown = /**
       * Sets the active item depending on the key event passed in.
       * @param event Keyboard event to be used for determining which element should be active.
       */
    function (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case keycodes_1.TAB:
                this.tabOut.next();
                return;
            case keycodes_1.DOWN_ARROW:
                if (this._vertical) {
                    this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            case keycodes_1.UP_ARROW:
                if (this._vertical) {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case keycodes_1.RIGHT_ARROW:
                if (this._horizontal === 'ltr') {
                    this.setNextItemActive();
                    break;
                }
                else if (this._horizontal === 'rtl') {
                    this.setPreviousItemActive();
                    break;
                }
                else {
                    return;
                }
            case keycodes_1.LEFT_ARROW:
                if (this._horizontal === 'ltr') {
                    this.setPreviousItemActive();
                    break;
                }
                else if (this._horizontal === 'rtl') {
                    this.setNextItemActive();
                    break;
                }
                else {
                    return;
                }
            default:
                // Attempt to use the `event.key` which also maps it to the user's keyboard language,
                // otherwise fall back to resolving alphanumeric characters via the keyCode.
                if (event.key && event.key.length === 1) {
                    this._letterKeyStream.next(event.key.toLocaleUpperCase());
                }
                else if ((keyCode >= keycodes_1.A && keyCode <= keycodes_1.Z) || (keyCode >= keycodes_1.ZERO && keyCode <= keycodes_1.NINE)) {
                    this._letterKeyStream.next(String.fromCharCode(keyCode));
                }
                // Note that we return here, in order to avoid preventing
                // the default action of non-navigational keys.
                return;
        }
        this._pressedLetters = [];
        event.preventDefault();
    };
    Object.defineProperty(ListKeyManager.prototype, "activeItemIndex", {
        /** Index of the currently active item. */
        get: /** Index of the currently active item. */
        function () {
            return this._activeItemIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListKeyManager.prototype, "activeItem", {
        /** The active item. */
        get: /** The active item. */
        function () {
            return this._activeItem;
        },
        enumerable: true,
        configurable: true
    });
    /** Sets the active item to the first enabled item in the list. */
    /** Sets the active item to the first enabled item in the list. */
    ListKeyManager.prototype.setFirstItemActive = /** Sets the active item to the first enabled item in the list. */
    function () {
        this._setActiveItemByIndex(0, 1);
    };
    /** Sets the active item to the last enabled item in the list. */
    /** Sets the active item to the last enabled item in the list. */
    ListKeyManager.prototype.setLastItemActive = /** Sets the active item to the last enabled item in the list. */
    function () {
        this._setActiveItemByIndex(this._items.length - 1, -1);
    };
    /** Sets the active item to the next enabled item in the list. */
    /** Sets the active item to the next enabled item in the list. */
    ListKeyManager.prototype.setNextItemActive = /** Sets the active item to the next enabled item in the list. */
    function () {
        this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    };
    /** Sets the active item to a previous enabled item in the list. */
    /** Sets the active item to a previous enabled item in the list. */
    ListKeyManager.prototype.setPreviousItemActive = /** Sets the active item to a previous enabled item in the list. */
    function () {
        this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
    };
    ListKeyManager.prototype.updateActiveItem = function (item) {
        var itemArray = this._getItemsArray();
        var index = typeof item === 'number' ? item : itemArray.indexOf(item);
        this._activeItemIndex = index;
        this._activeItem = itemArray[index];
    };
    /**
     * Allows setting of the activeItemIndex without any other effects.
     * @param index The new activeItemIndex.
     * @deprecated Use `updateActiveItem` instead.
     * @breaking-change 7.0.0
     */
    /**
       * Allows setting of the activeItemIndex without any other effects.
       * @param index The new activeItemIndex.
       * @deprecated Use `updateActiveItem` instead.
       * @breaking-change 7.0.0
       */
    ListKeyManager.prototype.updateActiveItemIndex = /**
       * Allows setting of the activeItemIndex without any other effects.
       * @param index The new activeItemIndex.
       * @deprecated Use `updateActiveItem` instead.
       * @breaking-change 7.0.0
       */
    function (index) {
        this.updateActiveItem(index);
    };
    /**
     * This method sets the active item, given a list of items and the delta between the
     * currently active item and the new active item. It will calculate differently
     * depending on whether wrap mode is turned on.
     */
    /**
       * This method sets the active item, given a list of items and the delta between the
       * currently active item and the new active item. It will calculate differently
       * depending on whether wrap mode is turned on.
       */
    ListKeyManager.prototype._setActiveItemByDelta = /**
       * This method sets the active item, given a list of items and the delta between the
       * currently active item and the new active item. It will calculate differently
       * depending on whether wrap mode is turned on.
       */
    function (delta) {
        this._wrap ? this._setActiveInWrapMode(delta) : this._setActiveInDefaultMode(delta);
    };
    /**
     * Sets the active item properly given "wrap" mode. In other words, it will continue to move
     * down the list until it finds an item that is not disabled, and it will wrap if it
     * encounters either end of the list.
     */
    /**
       * Sets the active item properly given "wrap" mode. In other words, it will continue to move
       * down the list until it finds an item that is not disabled, and it will wrap if it
       * encounters either end of the list.
       */
    ListKeyManager.prototype._setActiveInWrapMode = /**
       * Sets the active item properly given "wrap" mode. In other words, it will continue to move
       * down the list until it finds an item that is not disabled, and it will wrap if it
       * encounters either end of the list.
       */
    function (delta) {
        var items = this._getItemsArray();
        for (var i = 1; i <= items.length; i++) {
            var index = (this._activeItemIndex + (delta * i) + items.length) % items.length;
            var item = items[index];
            if (!this._skipPredicateFn(item)) {
                this.setActiveItem(index);
                return;
            }
        }
    };
    /**
     * Sets the active item properly given the default mode. In other words, it will
     * continue to move down the list until it finds an item that is not disabled. If
     * it encounters either end of the list, it will stop and not wrap.
     */
    /**
       * Sets the active item properly given the default mode. In other words, it will
       * continue to move down the list until it finds an item that is not disabled. If
       * it encounters either end of the list, it will stop and not wrap.
       */
    ListKeyManager.prototype._setActiveInDefaultMode = /**
       * Sets the active item properly given the default mode. In other words, it will
       * continue to move down the list until it finds an item that is not disabled. If
       * it encounters either end of the list, it will stop and not wrap.
       */
    function (delta) {
        this._setActiveItemByIndex(this._activeItemIndex + delta, delta);
    };
    /**
     * Sets the active item to the first enabled item starting at the index specified. If the
     * item is disabled, it will move in the fallbackDelta direction until it either
     * finds an enabled item or encounters the end of the list.
     */
    /**
       * Sets the active item to the first enabled item starting at the index specified. If the
       * item is disabled, it will move in the fallbackDelta direction until it either
       * finds an enabled item or encounters the end of the list.
       */
    ListKeyManager.prototype._setActiveItemByIndex = /**
       * Sets the active item to the first enabled item starting at the index specified. If the
       * item is disabled, it will move in the fallbackDelta direction until it either
       * finds an enabled item or encounters the end of the list.
       */
    function (index, fallbackDelta) {
        var items = this._getItemsArray();
        if (!items[index]) {
            return;
        }
        while (this._skipPredicateFn(items[index])) {
            index += fallbackDelta;
            if (!items[index]) {
                return;
            }
        }
        this.setActiveItem(index);
    };
    /** Returns the items as an array. */
    /** Returns the items as an array. */
    ListKeyManager.prototype._getItemsArray = /** Returns the items as an array. */
    function () {
        return this._items instanceof core_1.QueryList ? this._items.toArray() : this._items;
    };
    return ListKeyManager;
}());
exports.ListKeyManager = ListKeyManager;
//# sourceMappingURL=list-key-manager.js.map