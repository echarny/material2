"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flat_tree_control_1 = require("./flat-tree-control");
describe('CdkFlatTreeControl', function () {
    var treeControl;
    var getLevel = function (node) { return node.level; };
    var isExpandable = function (node) { return node.children && node.children.length > 0; };
    beforeEach(function () {
        treeControl = new flat_tree_control_1.FlatTreeControl(getLevel, isExpandable);
    });
    describe('base tree control actions', function () {
        it('should be able to expand and collapse dataNodes', function () {
            var nodes = generateData(10, 4);
            var secondNode = nodes[1];
            var sixthNode = nodes[5];
            treeControl.dataNodes = nodes;
            treeControl.expand(secondNode);
            expect(treeControl.isExpanded(secondNode))
                .toBeTruthy('Expect second node to be expanded');
            expect(treeControl.expansionModel.selected)
                .toContain(secondNode, 'Expect second node in expansionModel');
            expect(treeControl.expansionModel.selected.length)
                .toBe(1, 'Expect only second node in expansionModel');
            treeControl.toggle(sixthNode);
            expect(treeControl.isExpanded(secondNode))
                .toBeTruthy('Expect second node to stay expanded');
            expect(treeControl.isExpanded(sixthNode))
                .toBeTruthy('Expect sixth node to be expanded');
            expect(treeControl.expansionModel.selected)
                .toContain(sixthNode, 'Expect sixth node in expansionModel');
            expect(treeControl.expansionModel.selected)
                .toContain(secondNode, 'Expect second node in expansionModel');
            expect(treeControl.expansionModel.selected.length)
                .toBe(2, 'Expect two dataNodes in expansionModel');
            treeControl.collapse(secondNode);
            expect(treeControl.isExpanded(secondNode))
                .toBeFalsy('Expect second node to be collapsed');
            expect(treeControl.expansionModel.selected.length)
                .toBe(1, 'Expect one node in expansionModel');
            expect(treeControl.isExpanded(sixthNode)).toBeTruthy('Expect sixth node to stay expanded');
            expect(treeControl.expansionModel.selected)
                .toContain(sixthNode, 'Expect sixth node in expansionModel');
        });
        it('should return correct expandable values', function () {
            var nodes = generateData(10, 4);
            treeControl.dataNodes = nodes;
            for (var i = 0; i < 10; i++) {
                expect(treeControl.isExpandable(nodes[i]))
                    .toBeTruthy("Expect node[" + i + "] to be expandable");
                for (var j = 0; j < 4; j++) {
                    expect(treeControl.isExpandable(nodes[i].children[j]))
                        .toBeFalsy("Expect node[" + i + "]'s child[" + j + "] to be not expandable");
                }
            }
        });
        it('should return correct levels', function () {
            var numNodes = 10;
            var numChildren = 4;
            var numGrandChildren = 2;
            var nodes = generateData(numNodes, numChildren, numGrandChildren);
            treeControl.dataNodes = nodes;
            for (var i = 0; i < numNodes; i++) {
                expect(treeControl.getLevel(nodes[i]))
                    .toBe(1, "Expec node[" + i + "]'s level to be 1");
                for (var j = 0; j < numChildren; j++) {
                    expect(treeControl.getLevel(nodes[i].children[j]))
                        .toBe(2, "Expect node[" + i + "]'s child[" + j + "] to be not expandable");
                    for (var k = 0; k < numGrandChildren; k++) {
                        expect(treeControl.getLevel(nodes[i].children[j].children[k]))
                            .toBe(3, "Expect node[" + i + "]'s child[" + j + "] to be not expandable");
                    }
                }
            }
        });
        it('should toggle descendants correctly', function () {
            var numNodes = 10;
            var numChildren = 4;
            var numGrandChildren = 2;
            var nodes = generateData(numNodes, numChildren, numGrandChildren);
            var data = [];
            flatten(nodes, data);
            treeControl.dataNodes = data;
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
                        .toBeTruthy("Expect second node grand children to be not expanded");
                }
            }
        });
        it('should be able to expand/collapse all the dataNodes', function () {
            var numNodes = 10;
            var numChildren = 4;
            var numGrandChildren = 2;
            var nodes = generateData(numNodes, numChildren, numGrandChildren);
            var data = [];
            flatten(nodes, data);
            treeControl.dataNodes = data;
            treeControl.expandDescendants(nodes[1]);
            treeControl.collapseAll();
            expect(treeControl.expansionModel.selected.length).toBe(0, "Expect no expanded nodes");
            treeControl.expandAll();
            var totalNumber = numNodes + numNodes * numChildren
                + numNodes * numChildren * numGrandChildren;
            expect(treeControl.expansionModel.selected.length)
                .toBe(totalNumber, "Expect " + totalNumber + " expanded nodes");
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
function flatten(nodes, data) {
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        data.push(node);
        if (node.children && node.children.length > 0) {
            flatten(node.children, data);
        }
    }
}
//# sourceMappingURL=flat-tree-control.spec.js.map