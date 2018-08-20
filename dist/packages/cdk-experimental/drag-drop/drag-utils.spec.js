"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drag_utils_1 = require("./drag-utils");
describe('dragging utilities', function () {
    describe('moveItemInArray', function () {
        var array;
        beforeEach(function () { return array = [0, 1, 2, 3]; });
        it('should be able to move an item inside an array', function () {
            drag_utils_1.moveItemInArray(array, 1, 3);
            expect(array).toEqual([0, 2, 3, 1]);
        });
        it('should not do anything if the index is the same', function () {
            drag_utils_1.moveItemInArray(array, 2, 2);
            expect(array).toEqual([0, 1, 2, 3]);
        });
        it('should handle an index greater than the length', function () {
            drag_utils_1.moveItemInArray(array, 0, 7);
            expect(array).toEqual([1, 2, 3, 0]);
        });
        it('should handle an index less than zero', function () {
            drag_utils_1.moveItemInArray(array, 3, -1);
            expect(array).toEqual([3, 0, 1, 2]);
        });
    });
    describe('transferArrayItem', function () {
        it('should be able to move an item from one array to another', function () {
            var a = [0, 1, 2];
            var b = [3, 4, 5];
            drag_utils_1.transferArrayItem(a, b, 1, 2);
            expect(a).toEqual([0, 2]);
            expect(b).toEqual([3, 4, 1, 5]);
        });
        it('should handle an index greater than the target array length', function () {
            var a = [0, 1, 2];
            var b = [3, 4, 5];
            drag_utils_1.transferArrayItem(a, b, 0, 7);
            expect(a).toEqual([1, 2]);
            expect(b).toEqual([3, 4, 5, 0]);
        });
        it('should handle an index less than zero', function () {
            var a = [0, 1, 2];
            var b = [3, 4, 5];
            drag_utils_1.transferArrayItem(a, b, 2, -1);
            expect(a).toEqual([0, 1]);
            expect(b).toEqual([2, 3, 4, 5]);
        });
        it('should not do anything if the source array is empty', function () {
            var a = [];
            var b = [3, 4, 5];
            drag_utils_1.transferArrayItem(a, b, 0, 0);
            expect(a).toEqual([]);
            expect(b).toEqual([3, 4, 5]);
        });
    });
});
//# sourceMappingURL=drag-utils.spec.js.map