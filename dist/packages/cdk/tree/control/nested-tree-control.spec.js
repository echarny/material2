"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var nested_tree_control_1 = require("./nested-tree-control");
describe('CdkNestedTreeControl', function () {
    var treeControl;
    var getChildren = function (node) { return rxjs_1.of(node.children); };
    beforeEach(function () {
        treeControl = new nested_tree_control_1.NestedTreeControl(getChildren);
    });
    describe('base tree control actions', function () {
        it('should be able to expand and collapse dataNodes', function () {
            var nodes = generateData(10, 4);
            var node = nodes[1];
            var sixthNode = nodes[5];
            treeControl.dataNodes = nodes;
            treeControl.expand(node);
            expect(treeControl.isExpanded(node)).toBeTruthy('Expect second node to be expanded');
            expect(treeControl.expansionModel.selected)
                .toContain(node, 'Expect second node in expansionModel');
            expect(treeControl.expansionModel.selected.length)
                .toBe(1, 'Expect only second node in expansionModel');
            treeControl.toggle(sixthNode);
            expect(treeControl.isExpanded(node)).toBeTruthy('Expect second node to stay expanded');
            expect(treeControl.expansionModel.selected)
                .toContain(sixthNode, 'Expect sixth node in expansionModel');
            expect(treeControl.expansionModel.selected)
                .toContain(node, 'Expect second node in expansionModel');
            expect(treeControl.expansionModel.selected.length)
                .toBe(2, 'Expect two dataNodes in expansionModel');
            treeControl.collapse(node);
            expect(treeControl.isExpanded(node)).toBeFalsy('Expect second node to be collapsed');
            expect(treeControl.expansionModel.selected.length)
                .toBe(1, 'Expect one node in expansionModel');
            expect(treeControl.isExpanded(sixthNode)).toBeTruthy('Expect sixth node to stay expanded');
            expect(treeControl.expansionModel.selected)
                .toContain(sixthNode, 'Expect sixth node in expansionModel');
        });
        it('should toggle descendants correctly', function () {
            var numNodes = 10;
            var numChildren = 4;
            var numGrandChildren = 2;
            var nodes = generateData(numNodes, numChildren, numGrandChildren);
            treeControl.dataNodes = nodes;
            treeControl.expandDescendants(nodes[1]);
            var expandedNodesNum = 1 + numChildren + numChildren * numGrandChildren;
            expect(treeControl.expansionModel.selected.length)
                .toBe(expandedNodesNum, "Expect expanded " + expandedNodesNum + " nodes");
            expect(treeControl.isExpanded(nodes[1])).toBeTruthy('Expect second node to be expanded');
            for (var i = 0; i < numChildren; i++) {
                expect(treeControl.isExpanded(nodes[1].children[i]))
                    .toBeTruthy("Expect second node's children to be expanded");
                for (var j = 0; j < numGrandChildren; j++) {
                    expect(treeControl.isExpanded(nodes[1].children[i].children[j]))
                        .toBeTruthy("Expect second node grand children to be expanded");
                }
            }
        });
        it('should be able to expand/collapse all the dataNodes', function () {
            var numNodes = 10;
            var numChildren = 4;
            var numGrandChildren = 2;
            var nodes = generateData(numNodes, numChildren, numGrandChildren);
            treeControl.dataNodes = nodes;
            treeControl.expandDescendants(nodes[1]);
            treeControl.collapseAll();
            expect(treeControl.expansionModel.selected.length).toBe(0, "Expect no expanded nodes");
            treeControl.expandAll();
            var totalNumber = numNodes + numNodes * numChildren
                + numNodes * numChildren * numGrandChildren;
            expect(treeControl.expansionModel.selected.length)
                .toBe(totalNumber, "Expect " + totalNumber + " expanded nodes");
        });
        describe('with children array', function () {
            var getStaticChildren = function (node) { return node.children; };
            beforeEach(function () {
                treeControl = new nested_tree_control_1.NestedTreeControl(getStaticChildren);
            });
            it('should be able to expand and collapse dataNodes', function () {
                var nodes = generateData(10, 4);
                var node = nodes[1];
                var sixthNode = nodes[5];
                treeControl.dataNodes = nodes;
                treeControl.expand(node);
                expect(treeControl.isExpanded(node)).toBeTruthy('Expect second node to be expanded');
                expect(treeControl.expansionModel.selected)
                    .toContain(node, 'Expect second node in expansionModel');
                expect(treeControl.expansionModel.selected.length)
                    .toBe(1, 'Expect only second node in expansionModel');
                treeControl.toggle(sixthNode);
                expect(treeControl.isExpanded(node)).toBeTruthy('Expect second node to stay expanded');
                expect(treeControl.expansionModel.selected)
                    .toContain(sixthNode, 'Expect sixth node in expansionModel');
                expect(treeControl.expansionModel.selected)
                    .toContain(node, 'Expect second node in expansionModel');
                expect(treeControl.expansionModel.selected.length)
                    .toBe(2, 'Expect two dataNodes in expansionModel');
                treeControl.collapse(node);
                expect(treeControl.isExpanded(node)).toBeFalsy('Expect second node to be collapsed');
                expect(treeControl.expansionModel.selected.length)
                    .toBe(1, 'Expect one node in expansionModel');
                expect(treeControl.isExpanded(sixthNode)).toBeTruthy('Expect sixth node to stay expanded');
                expect(treeControl.expansionModel.selected)
                    .toContain(sixthNode, 'Expect sixth node in expansionModel');
            });
            it('should toggle descendants correctly', function () {
                var numNodes = 10;
                var numChildren = 4;
                var numGrandChildren = 2;
                var nodes = generateData(numNodes, numChildren, numGrandChildren);
                treeControl.dataNodes = nodes;
                treeControl.expandDescendants(nodes[1]);
                var expandedNodesNum = 1 + numChildren + numChildren * numGrandChildren;
                expect(treeControl.expansionModel.selected.length)
                    .toBe(expandedNodesNum, "Expect expanded " + expandedNodesNum + " nodes");
                expect(treeControl.isExpanded(nodes[1])).toBeTruthy('Expect second node to be expanded');
                for (var i = 0; i < numChildren; i++) {
                    expect(treeControl.isExpanded(nodes[1].children[i]))
                        .toBeTruthy("Expect second node's children to be expanded");
                    for (var j = 0; j < numGrandChildren; j++) {
                        expect(treeControl.isExpanded(nodes[1].children[i].children[j]))
                            .toBeTruthy("Expect second node grand children to be expanded");
                    }
                }
            });
            it('should be able to expand/collapse all the dataNodes', function () {
                var numNodes = 10;
                var numChildren = 4;
                var numGrandChildren = 2;
                var nodes = generateData(numNodes, numChildren, numGrandChildren);
                treeControl.dataNodes = nodes;
                treeControl.expandDescendants(nodes[1]);
                treeControl.collapseAll();
                expect(treeControl.expansionModel.selected.length).toBe(0, "Expect no expanded nodes");
                treeControl.expandAll();
                var totalNumber = numNodes + (numNodes * numChildren)
                    + (numNodes * numChildren * numGrandChildren);
                expect(treeControl.expansionModel.selected.length)
                    .toBe(totalNumber, "Expect " + totalNumber + " expanded nodes");
            });
        });
    });
});
var TestData = /** @class */ (function () {
    function TestData(a, b, c, level, children) {
        if (level === void 0) { level = 1; }
        if (children === void 0) { children = []; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.level = level;
        this.children = children;
    }
    return TestData;
}());
exports.TestData = TestData;
function generateData(dataLength, childLength, grandChildLength) {
    if (grandChildLength === void 0) { grandChildLength = 0; }
    var data = [];
    var nextIndex = 0;
    for (var i = 0; i < dataLength; i++) {
        var children = [];
        for (var j = 0; j < childLength; j++) {
            var grandChildren = [];
            for (var k = 0; k < grandChildLength; k++) {
                grandChildren.push(new TestData("a_" + nextIndex, "b_" + nextIndex, "c_" + nextIndex++, 3));
            }
            children.push(new TestData("a_" + nextIndex, "b_" + nextIndex, "c_" + nextIndex++, 2, grandChildren));
        }
        data.push(new TestData("a_" + nextIndex, "b_" + nextIndex, "c_" + nextIndex++, 1, children));
    }
    return data;
}
//# sourceMappingURL=nested-tree-control.spec.js.map