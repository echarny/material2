"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
var index_1 = require("./index");
describe('MatTree', function () {
    /** Represents an indent for expectNestedTreeToMatch */
    var _ = {};
    var treeElement;
    var underlyingDataSource;
    function configureMatTreeTestingModule(declarations) {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatTreeModule],
            declarations: declarations,
        }).compileComponents();
    }
    describe('flat tree', function () {
        describe('should initialize', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureMatTreeTestingModule([SimpleMatTreeApp]);
                fixture = testing_1.TestBed.createComponent(SimpleMatTreeApp);
                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                fixture.detectChanges();
            });
            it('with rendered dataNodes', function () {
                var nodes = getNodes(treeElement);
                expect(nodes).toBeDefined('Expect nodes to be defined');
                expect(nodes[0].classList).toContain('customNodeClass');
            });
            it('with the right accessibility roles', function () {
                expect(treeElement.getAttribute('role')).toBe('tree');
                getNodes(treeElement).forEach(function (node) {
                    expect(node.getAttribute('role')).toBe('treeitem');
                });
            });
            it('with the right data', function () {
                expect(underlyingDataSource.data.length).toBe(3);
                var data = underlyingDataSource.data;
                expectFlatTreeToMatch(treeElement, 28, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                underlyingDataSource.addChild(data[2]);
                fixture.detectChanges();
                expectFlatTreeToMatch(treeElement, 28, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"], ["_, topping_4 - cheese_4 + base_4"]);
            });
        });
        describe('with toggle', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureMatTreeTestingModule([MatTreeAppWithToggle]);
                fixture = testing_1.TestBed.createComponent(MatTreeAppWithToggle);
                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                fixture.detectChanges();
            });
            it('should expand/collapse the node', function () {
                expect(underlyingDataSource.data.length).toBe(3);
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect no expanded node");
                component.toggleRecursively = false;
                var data = underlyingDataSource.data;
                var child = underlyingDataSource.addChild(data[2]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(1, "Expect node expanded one level");
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"], [_, "topping_4 - cheese_4 + base_4"]);
                getNodes(treeElement)[3].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(2, "Expect node expanded");
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
            });
            it('should expand/collapse the node recursively', function () {
                expect(underlyingDataSource.data.length).toBe(3);
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect no expanded node");
                var data = underlyingDataSource.data;
                var child = underlyingDataSource.addChild(data[2]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(3, "Expect nodes expanded");
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect node collapsed");
                expectFlatTreeToMatch(treeElement, 40, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
            });
        });
        describe('with when node template', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureMatTreeTestingModule([WhenNodeMatTreeApp]);
                fixture = testing_1.TestBed.createComponent(WhenNodeMatTreeApp);
                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expectFlatTreeToMatch(treeElement, 28, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"], [">>> topping_4 - cheese_4 + base_4"]);
            });
        });
    });
    describe('nested tree', function () {
        describe('should initialize', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureMatTreeTestingModule([NestedMatTreeApp]);
                fixture = testing_1.TestBed.createComponent(NestedMatTreeApp);
                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                fixture.detectChanges();
            });
            it('with rendered dataNodes', function () {
                var nodes = getNodes(treeElement);
                expect(nodes).toBeDefined('Expect nodes to be defined');
                expect(nodes[0].classList).toContain('customNodeClass');
            });
            it('with the right accessibility roles', function () {
                expect(treeElement.getAttribute('role')).toBe('tree');
                getNodes(treeElement).forEach(function (node) {
                    expect(node.getAttribute('role')).toBe('treeitem');
                });
            });
            it('with the right data', function () {
                expect(underlyingDataSource.data.length).toBe(3);
                var data = underlyingDataSource.data;
                expectNestedTreeToMatch(treeElement, [data[0].pizzaTopping + " - " + data[0].pizzaCheese + " + " + data[0].pizzaBase], [data[1].pizzaTopping + " - " + data[1].pizzaCheese + " + " + data[1].pizzaBase], [data[2].pizzaTopping + " - " + data[2].pizzaCheese + " + " + data[2].pizzaBase]);
                underlyingDataSource.addChild(data[1]);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                data = underlyingDataSource.data;
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], ["topping_3 - cheese_3 + base_3"]);
            });
            it('with nested child data', function () {
                expect(underlyingDataSource.data.length).toBe(3);
                var data = underlyingDataSource.data;
                var child = underlyingDataSource.addChild(data[1]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"], ["topping_3 - cheese_3 + base_3"]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"], [_, _, "topping_6 - cheese_6 + base_6"], ["topping_3 - cheese_3 + base_3"]);
            });
        });
        describe('with when node', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureMatTreeTestingModule([WhenNodeNestedMatTreeApp]);
                fixture = testing_1.TestBed.createComponent(WhenNodeNestedMatTreeApp);
                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"], [">>> topping_4 - cheese_4 + base_4"]);
            });
        });
        describe('with toggle', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureMatTreeTestingModule([NestedMatTreeAppWithToggle]);
                fixture = testing_1.TestBed.createComponent(NestedMatTreeAppWithToggle);
                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('mat-tree');
                fixture.detectChanges();
            });
            it('should expand/collapse the node', function () {
                component.toggleRecursively = false;
                var data = underlyingDataSource.data;
                var child = underlyingDataSource.addChild(data[1]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                fixture.detectChanges();
                getNodes(treeElement)[1].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(1, "Expect node expanded");
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], ["topping_3 - cheese_3 + base_3"]);
                getNodes(treeElement)[1].click();
                fixture.detectChanges();
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect node collapsed");
            });
            it('should expand/collapse the node recursively', function () {
                var data = underlyingDataSource.data;
                var child = underlyingDataSource.addChild(data[1]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                getNodes(treeElement)[1].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(3, "Expect node expanded");
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"], ["topping_3 - cheese_3 + base_3"]);
                getNodes(treeElement)[1].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect node collapsed");
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
            });
        });
    });
});
var TestData = /** @class */ (function () {
    function TestData(pizzaTopping, pizzaCheese, pizzaBase, children, isSpecial) {
        if (children === void 0) { children = []; }
        if (isSpecial === void 0) { isSpecial = false; }
        this.pizzaTopping = pizzaTopping;
        this.pizzaCheese = pizzaCheese;
        this.pizzaBase = pizzaBase;
        this.isSpecial = isSpecial;
        this.children = children;
        this.observableChildren = new rxjs_1.BehaviorSubject(this.children);
    }
    return TestData;
}());
exports.TestData = TestData;
var FakeDataSource = /** @class */ (function () {
    function FakeDataSource() {
        this.dataIndex = 0;
        this._dataChange = new rxjs_1.BehaviorSubject([]);
        for (var i = 0; i < 3; i++) {
            this.addData();
        }
    }
    Object.defineProperty(FakeDataSource.prototype, "data", {
        get: function () { return this._dataChange.getValue(); },
        set: function (data) { this._dataChange.next(data); },
        enumerable: true,
        configurable: true
    });
    FakeDataSource.prototype.connect = function () {
        return this._dataChange;
    };
    FakeDataSource.prototype.disconnect = function () { };
    FakeDataSource.prototype.addChild = function (parent, isSpecial) {
        if (isSpecial === void 0) { isSpecial = false; }
        var nextIndex = ++this.dataIndex;
        var child = new TestData("topping_" + nextIndex, "cheese_" + nextIndex, "base_" + nextIndex);
        var index = this.data.indexOf(parent);
        if (index > -1) {
            parent = new TestData(parent.pizzaTopping, parent.pizzaCheese, parent.pizzaBase, parent.children, isSpecial);
        }
        parent.children.push(child);
        parent.observableChildren.next(parent.children);
        var copiedData = this.data.slice();
        if (index > -1) {
            copiedData.splice(index, 1, parent);
        }
        this.data = copiedData;
        return child;
    };
    FakeDataSource.prototype.addData = function (isSpecial) {
        if (isSpecial === void 0) { isSpecial = false; }
        var nextIndex = ++this.dataIndex;
        var copiedData = this.data.slice();
        copiedData.push(new TestData("topping_" + nextIndex, "cheese_" + nextIndex, "base_" + nextIndex, [], isSpecial));
        this.data = copiedData;
    };
    return FakeDataSource;
}());
function getNodes(treeElement) {
    return [].slice.call(treeElement.querySelectorAll('.mat-tree-node, .mat-nested-tree-node'));
}
function expectFlatTreeToMatch(treeElement, expectedPaddingIndent) {
    if (expectedPaddingIndent === void 0) { expectedPaddingIndent = 28; }
    var expectedTree = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        expectedTree[_i - 2] = arguments[_i];
    }
    var missedExpectations = [];
    function checkNode(node, expectedNode) {
        var actualTextContent = node.textContent.trim();
        var expectedTextContent = expectedNode[expectedNode.length - 1];
        if (actualTextContent !== expectedTextContent) {
            missedExpectations.push("Expected node contents to be " + expectedTextContent + " but was " + actualTextContent);
        }
    }
    function checkLevel(node, expectedNode) {
        var actualLevel = node.style.paddingLeft;
        if (expectedNode.length === 1) {
            if (actualLevel !== "") {
                missedExpectations.push("Expected node level to be 0 but was " + actualLevel);
            }
        }
        else {
            var expectedLevel = (expectedNode.length - 1) * expectedPaddingIndent + "px";
            if (actualLevel != expectedLevel) {
                missedExpectations.push("Expected node level to be " + expectedLevel + " but was " + actualLevel);
            }
        }
    }
    getNodes(treeElement).forEach(function (node, index) {
        var expected = expectedTree ?
            expectedTree[index] :
            null;
        checkLevel(node, expected);
        checkNode(node, expected);
    });
    if (missedExpectations.length) {
        fail(missedExpectations.join('\n'));
    }
}
function expectNestedTreeToMatch(treeElement) {
    var expectedTree = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        expectedTree[_i - 1] = arguments[_i];
    }
    var missedExpectations = [];
    function checkNodeContent(node, expectedNode) {
        var expectedTextContent = expectedNode[expectedNode.length - 1];
        var actualTextContent = node.childNodes.item(0).textContent.trim();
        if (actualTextContent !== expectedTextContent) {
            missedExpectations.push("Expected node contents to be " + expectedTextContent + " but was " + actualTextContent);
        }
    }
    function checkNodeDescendants(node, expectedNode, currentIndex) {
        var expectedDescendant = 0;
        for (var i = currentIndex + 1; i < expectedTree.length; ++i) {
            if (expectedTree[i].length > expectedNode.length) {
                ++expectedDescendant;
            }
            else if (expectedTree[i].length === expectedNode.length) {
                break;
            }
        }
        var actualDescendant = getNodes(node).length;
        if (actualDescendant !== expectedDescendant) {
            missedExpectations.push("Expected node descendant num to be " + expectedDescendant + " but was " + actualDescendant);
        }
    }
    getNodes(treeElement).forEach(function (node, index) {
        var expected = expectedTree ?
            expectedTree[index] :
            null;
        checkNodeDescendants(node, expected, index);
        checkNodeContent(node, expected);
    });
    if (missedExpectations.length) {
        fail(missedExpectations.join('\n'));
    }
}
var SimpleMatTreeApp = /** @class */ (function () {
    function SimpleMatTreeApp() {
        var _this = this;
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.getChildren = function (node) { return node.observableChildren; };
        this.transformer = function (node, level) {
            node.level = level;
            return node;
        };
        this.treeFlattener = new index_1.MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new index_1.MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.underlyingDataSource = new FakeDataSource();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    SimpleMatTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <mat-tree-node *matTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                     matTreeNodePadding [matTreeNodePaddingIndent]=\"28\"\n                     matTreeNodeToggle>\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </mat-tree-node>\n    </mat-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleMatTreeApp.ctorParameters = function () { return []; };
    SimpleMatTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [index_1.MatTree,] },],
    };
    return SimpleMatTreeApp;
}());
var NestedMatTreeApp = /** @class */ (function () {
    function NestedMatTreeApp() {
        var _this = this;
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new tree_1.NestedTreeControl(this.getChildren);
        this.dataSource = new index_1.MatTreeNestedDataSource();
        this.underlyingDataSource = new FakeDataSource();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    NestedMatTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <mat-nested-tree-node *matTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template matTreeNodeOutlet></ng-template>\n      </mat-nested-tree-node>\n    </mat-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedMatTreeApp.ctorParameters = function () { return []; };
    NestedMatTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [index_1.MatTree,] },],
    };
    return NestedMatTreeApp;
}());
var WhenNodeNestedMatTreeApp = /** @class */ (function () {
    function WhenNodeNestedMatTreeApp() {
        var _this = this;
        this.isSpecial = function (_, node) { return node.isSpecial; };
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new tree_1.NestedTreeControl(this.getChildren);
        this.dataSource = new index_1.MatTreeNestedDataSource();
        this.underlyingDataSource = new FakeDataSource();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    WhenNodeNestedMatTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <mat-nested-tree-node *matTreeNodeDef=\"let node\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template matTreeNodeOutlet></ng-template>\n      </mat-nested-tree-node>\n       <mat-nested-tree-node *matTreeNodeDef=\"let node; when: isSpecial\"\n                             matTreeNodeToggle>\n                     >>> {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <div *ngIf=\"treeControl.isExpanded(node)\">\n            <ng-template matTreeNodeOutlet></ng-template>\n         </div>\n      </mat-nested-tree-node>\n    </mat-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenNodeNestedMatTreeApp.ctorParameters = function () { return []; };
    WhenNodeNestedMatTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [index_1.MatTree,] },],
    };
    return WhenNodeNestedMatTreeApp;
}());
var MatTreeAppWithToggle = /** @class */ (function () {
    function MatTreeAppWithToggle() {
        var _this = this;
        this.toggleRecursively = true;
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.getChildren = function (node) { return node.observableChildren; };
        this.transformer = function (node, level) {
            node.level = level;
            return node;
        };
        this.treeFlattener = new index_1.MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new index_1.MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.underlyingDataSource = new FakeDataSource();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    MatTreeAppWithToggle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <mat-tree-node *matTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                     matTreeNodePadding\n                     matTreeNodeToggle [matTreeNodeToggleRecursive]=\"toggleRecursively\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </mat-tree-node>\n    </mat-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    MatTreeAppWithToggle.ctorParameters = function () { return []; };
    MatTreeAppWithToggle.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [index_1.MatTree,] },],
    };
    return MatTreeAppWithToggle;
}());
var NestedMatTreeAppWithToggle = /** @class */ (function () {
    function NestedMatTreeAppWithToggle() {
        var _this = this;
        this.toggleRecursively = true;
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new tree_1.NestedTreeControl(this.getChildren);
        this.dataSource = new index_1.MatTreeNestedDataSource();
        this.underlyingDataSource = new FakeDataSource();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    NestedMatTreeAppWithToggle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <mat-nested-tree-node *matTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                            matTreeNodeToggle [matTreeNodeToggleRecursive]=\"toggleRecursively\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n        <div *ngIf=\"treeControl.isExpanded(node)\">\n          <ng-template matTreeNodeOutlet></ng-template>\n        </div>\n      </mat-nested-tree-node>\n    </mat-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedMatTreeAppWithToggle.ctorParameters = function () { return []; };
    NestedMatTreeAppWithToggle.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [index_1.MatTree,] },],
    };
    return NestedMatTreeAppWithToggle;
}());
var WhenNodeMatTreeApp = /** @class */ (function () {
    function WhenNodeMatTreeApp() {
        var _this = this;
        this.isSpecial = function (_, node) { return node.isSpecial; };
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.getChildren = function (node) { return node.observableChildren; };
        this.transformer = function (node, level) {
            node.level = level;
            return node;
        };
        this.treeFlattener = new index_1.MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new tree_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new index_1.MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.underlyingDataSource = new FakeDataSource();
        this.underlyingDataSource.connect().subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    WhenNodeMatTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <mat-tree-node *matTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                     matTreeNodePadding [matTreeNodePaddingIndent]=\"28\"\n                     matTreeNodeToggle>\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </mat-tree-node>\n       <mat-tree-node *matTreeNodeDef=\"let node; when: isSpecial\" class=\"customNodeClass\"\n                     matTreeNodePadding [matTreeNodePaddingIndent]=\"28\"\n                     matTreeNodeToggle>\n                     >>> {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </mat-tree-node>\n    </mat-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenNodeMatTreeApp.ctorParameters = function () { return []; };
    WhenNodeMatTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [index_1.MatTree,] },],
    };
    return WhenNodeMatTreeApp;
}());
//# sourceMappingURL=tree.spec.js.map