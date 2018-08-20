"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selection_1 = require("./selection");
describe('SelectionModel', function () {
    describe('single selection', function () {
        var model;
        beforeEach(function () { return model = new selection_1.SelectionModel(); });
        it('should be able to select a single value', function () {
            model.select(1);
            expect(model.selected.length).toBe(1);
            expect(model.isSelected(1)).toBe(true);
        });
        it('should deselect the previously selected value', function () {
            model.select(1);
            model.select(2);
            expect(model.isSelected(1)).toBe(false);
            expect(model.isSelected(2)).toBe(true);
        });
        it('should throw an error if multiple values are passed to model', function () {
            expect(function () { return model.select(1, 2); }).toThrow(selection_1.getMultipleValuesInSingleSelectionError());
        });
        it('should only preselect one value', function () {
            model = new selection_1.SelectionModel(false, [1, 2]);
            expect(model.selected.length).toBe(1);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(false);
        });
    });
    describe('multiple selection', function () {
        var model;
        beforeEach(function () { return model = new selection_1.SelectionModel(true); });
        it('should be able to select multiple options', function () {
            var onChangeSpy = jasmine.createSpy('onChange spy');
            model.onChange.subscribe(onChangeSpy);
            model.select(1);
            model.select(2);
            expect(model.selected.length).toBe(2);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(true);
            expect(onChangeSpy).toHaveBeenCalledTimes(2);
        });
        it('should be able to select multiple options at the same time', function () {
            var onChangeSpy = jasmine.createSpy('onChange spy');
            model.onChange.subscribe(onChangeSpy);
            model.select(1, 2);
            expect(model.selected.length).toBe(2);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(true);
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
        });
        it('should be able to preselect multiple options', function () {
            model = new selection_1.SelectionModel(true, [1, 2]);
            expect(model.selected.length).toBe(2);
            expect(model.isSelected(1)).toBe(true);
            expect(model.isSelected(2)).toBe(true);
        });
        it('should be able to sort the selected values', function () {
            model = new selection_1.SelectionModel(true, [2, 3, 1]);
            expect(model.selected).toEqual([2, 3, 1]);
            model.sort();
            expect(model.selected).toEqual([1, 2, 3]);
        });
        it('should sort values if `selected` has not been accessed before', function () {
            model = new selection_1.SelectionModel(true, [2, 3, 1]);
            // Important: don't assert `selected` before sorting so the getter isn't invoked
            model.sort();
            expect(model.selected).toEqual([1, 2, 3]);
        });
    });
    describe('onChange event', function () {
        it('should return the model that dispatched the event', function () {
            var model = new selection_1.SelectionModel();
            var spy = jasmine.createSpy('SelectionModel change event');
            model.onChange.subscribe(spy);
            model.select(1);
            var event = spy.calls.mostRecent().args[0];
            expect(spy).toHaveBeenCalled();
            expect(event.source).toBe(model);
        });
        it('should return both the added and removed values', function () {
            var model = new selection_1.SelectionModel();
            var spy = jasmine.createSpy('SelectionModel change event');
            model.select(1);
            model.onChange.subscribe(spy);
            model.select(2);
            var event = spy.calls.mostRecent().args[0];
            expect(spy).toHaveBeenCalled();
            expect(event.removed).toEqual([1]);
            expect(event.added).toEqual([2]);
        });
        it('should have updated the selected value before emitting the change event', function () {
            var model = new selection_1.SelectionModel(true);
            var spy = jasmine.createSpy('SelectionModel change event');
            // Note: this assertion is only here to run the getter.
            expect(model.selected).toEqual([]);
            model.onChange.subscribe(function () { return spy(model.selected); });
            model.select(1);
            expect(spy).toHaveBeenCalledWith([1]);
        });
        describe('selection', function () {
            var model;
            var spy;
            beforeEach(function () {
                model = new selection_1.SelectionModel(true);
                spy = jasmine.createSpy('SelectionModel change event');
                model.onChange.subscribe(spy);
            });
            it('should emit an event when a value is selected', function () {
                model.select(1);
                var event = spy.calls.mostRecent().args[0];
                expect(spy).toHaveBeenCalled();
                expect(event.added).toEqual([1]);
                expect(event.removed).toEqual([]);
            });
            it('should not emit multiple events for the same value', function () {
                model.select(1);
                model.select(1);
                expect(spy).toHaveBeenCalledTimes(1);
            });
            it('should not emit an event when preselecting values', function () {
                model = new selection_1.SelectionModel(false, [1]);
                spy = jasmine.createSpy('SelectionModel initial change event');
                model.onChange.subscribe(spy);
                expect(spy).not.toHaveBeenCalled();
            });
        });
        describe('deselection', function () {
            var model;
            var spy;
            beforeEach(function () {
                model = new selection_1.SelectionModel(true, [1, 2, 3]);
                spy = jasmine.createSpy('SelectionModel change event');
                model.onChange.subscribe(spy);
            });
            it('should emit an event when a value is deselected', function () {
                model.deselect(1);
                var event = spy.calls.mostRecent().args[0];
                expect(spy).toHaveBeenCalled();
                expect(event.removed).toEqual([1]);
            });
            it('should not emit an event when a non-selected value is deselected', function () {
                model.deselect(4);
                expect(spy).not.toHaveBeenCalled();
            });
            it('should emit a single event when clearing all of the selected options', function () {
                model.clear();
                var event = spy.calls.mostRecent().args[0];
                expect(spy).toHaveBeenCalledTimes(1);
                expect(event.removed).toEqual([1, 2, 3]);
            });
        });
    });
    describe('disabling the change event', function () {
        var model;
        beforeEach(function () {
            model = new selection_1.SelectionModel(true, undefined, false);
        });
        it('should not have an onChange stream if change events are disabled', function () {
            expect(model.onChange).toBeFalsy();
        });
        it('should still update the select value', function () {
            model.select(1);
            expect(model.selected).toEqual([1]);
            model.select(2);
            expect(model.selected).toEqual([1, 2]);
        });
    });
    it('should be able to determine whether it is empty', function () {
        var model = new selection_1.SelectionModel();
        expect(model.isEmpty()).toBe(true);
        model.select(1);
        expect(model.isEmpty()).toBe(false);
    });
    it('should be able to determine whether it has a value', function () {
        var model = new selection_1.SelectionModel();
        expect(model.hasValue()).toBe(false);
        model.select(1);
        expect(model.hasValue()).toBe(true);
    });
    it('should be able to toggle an option', function () {
        var model = new selection_1.SelectionModel();
        model.toggle(1);
        expect(model.isSelected(1)).toBe(true);
        model.toggle(1);
        expect(model.isSelected(1)).toBe(false);
    });
    it('should be able to clear the selected options', function () {
        var model = new selection_1.SelectionModel(true);
        model.select(1);
        model.select(2);
        expect(model.selected.length).toBe(2);
        model.clear();
        expect(model.selected.length).toBe(0);
        expect(model.isEmpty()).toBe(true);
    });
    it('should be empty if an empty array is passed for the preselected values', function () {
        expect(new selection_1.SelectionModel(false, []).selected).toEqual([]);
    });
    it('should be able to determine whether multiple values can be selected', function () {
        var multipleSelectionModel = new selection_1.SelectionModel(true);
        expect(multipleSelectionModel.isMultipleSelection()).toBe(true);
        var singleSelectionModel = new selection_1.SelectionModel();
        expect(singleSelectionModel.isMultipleSelection()).toBe(false);
    });
});
//# sourceMappingURL=selection.spec.js.map