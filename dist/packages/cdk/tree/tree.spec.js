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
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var collections_1 = require("@angular/cdk/collections");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var base_tree_control_1 = require("./control/base-tree-control");
var flat_tree_control_1 = require("./control/flat-tree-control");
var nested_tree_control_1 = require("./control/nested-tree-control");
var index_1 = require("./index");
var tree_1 = require("./tree");
var tree_errors_1 = require("./tree-errors");
describe('CdkTree', function () {
    /** Represents an indent for expectNestedTreeToMatch */
    var _ = {};
    var dataSource;
    var treeElement;
    var tree;
    function configureCdkTreeTestingModule(declarations) {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.CdkTreeModule],
            declarations: declarations,
        }).compileComponents();
    }
    it('should clear out the `mostRecentTreeNode` on destroy', function () {
        configureCdkTreeTestingModule([SimpleCdkTreeApp]);
        var fixture = testing_1.TestBed.createComponent(SimpleCdkTreeApp);
        fixture.detectChanges();
        // Cast the assertions to a boolean to avoid Jasmine going into an
        // infinite loop when stringifying the object, if the test starts failing.
        expect(!!tree_1.CdkTreeNode.mostRecentTreeNode).toBe(true);
        fixture.destroy();
        expect(!!tree_1.CdkTreeNode.mostRecentTreeNode).toBe(false);
    });
    describe('flat tree', function () {
        describe('should initialize', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([SimpleCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(SimpleCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with a connected data source', function () {
                expect(tree.dataSource).toBe(dataSource);
                expect(dataSource.isConnected).toBe(true);
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
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectFlatTreeToMatch(treeElement, 28, [data[0].pizzaTopping + " - " + data[0].pizzaCheese + " + " + data[0].pizzaBase], [data[1].pizzaTopping + " - " + data[1].pizzaCheese + " + " + data[1].pizzaBase], [data[2].pizzaTopping + " - " + data[2].pizzaCheese + " + " + data[2].pizzaBase]);
                dataSource.addData(2);
                fixture.detectChanges();
                data = dataSource.data;
                expect(data.length).toBe(4);
                expectFlatTreeToMatch(treeElement, 28, [data[0].pizzaTopping + " - " + data[0].pizzaCheese + " + " + data[0].pizzaBase], [data[1].pizzaTopping + " - " + data[1].pizzaCheese + " + " + data[1].pizzaBase], [data[2].pizzaTopping + " - " + data[2].pizzaCheese + " + " + data[2].pizzaBase], [_, data[3].pizzaTopping + " - " + data[3].pizzaCheese + " + " + data[3].pizzaBase]);
            });
        });
        describe('with toggle', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([CdkTreeAppWithToggle]);
                fixture = testing_1.TestBed.createComponent(CdkTreeAppWithToggle);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('should expand/collapse the node', function () {
                expect(dataSource.data.length).toBe(3);
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect no expanded node");
                component.toggleRecursively = false;
                var data = dataSource.data;
                dataSource.addChild(data[2]);
                fixture.detectChanges();
                data = dataSource.data;
                expect(data.length).toBe(4);
                expectFlatTreeToMatch(treeElement, 40, [data[0].pizzaTopping + " - " + data[0].pizzaCheese + " + " + data[0].pizzaBase], [data[1].pizzaTopping + " - " + data[1].pizzaCheese + " + " + data[1].pizzaBase], [data[2].pizzaTopping + " - " + data[2].pizzaCheese + " + " + data[2].pizzaBase], [_, data[3].pizzaTopping + " - " + data[3].pizzaCheese + " + " + data[3].pizzaBase]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(1, "Expect node expanded");
                expect(component.treeControl.expansionModel.selected[0]).toBe(data[2]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect node collapsed");
            });
            it('should expand/collapse the node recursively', function () {
                expect(dataSource.data.length).toBe(3);
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect no expanded node");
                var data = dataSource.data;
                dataSource.addChild(data[2]);
                fixture.detectChanges();
                data = dataSource.data;
                expect(data.length).toBe(4);
                expectFlatTreeToMatch(treeElement, 40, [data[0].pizzaTopping + " - " + data[0].pizzaCheese + " + " + data[0].pizzaBase], [data[1].pizzaTopping + " - " + data[1].pizzaCheese + " + " + data[1].pizzaBase], [data[2].pizzaTopping + " - " + data[2].pizzaCheese + " + " + data[2].pizzaBase], [_, data[3].pizzaTopping + " - " + data[3].pizzaCheese + " + " + data[3].pizzaBase]);
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(2, "Expect nodes expanded");
                expect(component.treeControl.expansionModel.selected[0])
                    .toBe(data[2], "Expect parent node expanded");
                expect(component.treeControl.expansionModel.selected[1])
                    .toBe(data[3], "Expected child node expanded");
                getNodes(treeElement)[2].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(0, "Expect node collapsed");
            });
        });
        describe('with when node template', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([WhenNodeCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(WhenNodeCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectFlatTreeToMatch(treeElement, 28, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], ["[topping_3] - [cheese_3] + [base_3]"]);
                dataSource.addChild(data[1]);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                data = dataSource.data;
                expect(data.length).toBe(4);
                expectFlatTreeToMatch(treeElement, 28, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], [_, "topping_4 - cheese_4 + base_4"], ["[topping_3] - [cheese_3] + [base_3]"]);
            });
        });
        describe('with array data source', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([ArrayDataSourceCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(ArrayDataSourceCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectFlatTreeToMatch(treeElement, 28, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], ["[topping_3] - [cheese_3] + [base_3]"]);
                dataSource.addChild(data[1]);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                data = dataSource.data;
                expect(data.length).toBe(4);
                expectFlatTreeToMatch(treeElement, 28, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], [_, "[topping_4] - [cheese_4] + [base_4]"], ["[topping_3] - [cheese_3] + [base_3]"]);
            });
        });
        describe('with observable data source', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([ObservableDataSourceCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(ObservableDataSourceCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectFlatTreeToMatch(treeElement, 28, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], ["[topping_3] - [cheese_3] + [base_3]"]);
                dataSource.addChild(data[1]);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                data = dataSource.data;
                expect(data.length).toBe(4);
                expectFlatTreeToMatch(treeElement, 28, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], [_, "[topping_4] - [cheese_4] + [base_4]"], ["[topping_3] - [cheese_3] + [base_3]"]);
            });
        });
        describe('with trackBy', function () {
            var fixture;
            var component;
            function createTrackByTestComponent(trackByStrategy) {
                configureCdkTreeTestingModule([CdkTreeAppWithTrackBy]);
                fixture = testing_1.TestBed.createComponent(CdkTreeAppWithTrackBy);
                component = fixture.componentInstance;
                component.trackByStrategy = trackByStrategy;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
                // Each node receives an attribute 'initialIndex' the element's original place
                getNodes(treeElement).forEach(function (node, index) {
                    node.setAttribute('initialIndex', index.toString());
                });
                // Prove that the attributes match their indicies
                var initialNodes = getNodes(treeElement);
                expect(initialNodes[0].getAttribute('initialIndex')).toBe('0');
                expect(initialNodes[1].getAttribute('initialIndex')).toBe('1');
                expect(initialNodes[2].getAttribute('initialIndex')).toBe('2');
            }
            function mutateData() {
                // Swap first and second data in data array
                var copiedData = component.dataSource.data.slice();
                var temp = copiedData[0];
                copiedData[0] = copiedData[1];
                copiedData[1] = temp;
                // Remove the third element
                copiedData.splice(2, 1);
                // Add new data
                component.dataSource.data = copiedData;
                component.dataSource.addData();
            }
            it('should add/remove/move nodes with reference-based trackBy', function () {
                createTrackByTestComponent('reference');
                mutateData();
                // Expect that the first and second nodes were swapped and that the last node is new
                var changedNodes = getNodes(treeElement);
                expect(changedNodes.length).toBe(3);
                expect(changedNodes[0].getAttribute('initialIndex')).toBe('1');
                expect(changedNodes[1].getAttribute('initialIndex')).toBe('0');
                expect(changedNodes[2].getAttribute('initialIndex')).toBe(null);
            });
            it('should add/remove/move nodes with property-based trackBy', function () {
                createTrackByTestComponent('property');
                mutateData();
                // Change each item reference to show that the trackby is checking the item properties.
                // Otherwise this would cause them all to be removed/added.
                component.dataSource.data = component.dataSource.data
                    .map(function (item) { return new TestData(item.pizzaTopping, item.pizzaCheese, item.pizzaBase); });
                // Expect that the first and second nodes were swapped and that the last node is new
                var changedNodes = getNodes(treeElement);
                expect(changedNodes.length).toBe(3);
                expect(changedNodes[0].getAttribute('initialIndex')).toBe('1');
                expect(changedNodes[1].getAttribute('initialIndex')).toBe('0');
                expect(changedNodes[2].getAttribute('initialIndex')).toBe(null);
            });
            it('should add/remove/move nodes with index-based trackBy', function () {
                createTrackByTestComponent('index');
                mutateData();
                // Change each item reference to show that the trackby is checking the index.
                // Otherwise this would cause them all to be removed/added.
                component.dataSource.data = component.dataSource.data
                    .map(function (item) { return new TestData(item.pizzaTopping, item.pizzaCheese, item.pizzaBase); });
                // Expect first two to be the same since they were swapped but indicies are consistent.
                // The third element was removed and caught by the tree so it was removed before another
                // item was added, so it is without an initial index.
                var changedNodes = getNodes(treeElement);
                expect(changedNodes.length).toBe(3);
                expect(changedNodes[0].getAttribute('initialIndex')).toBe('0');
                expect(changedNodes[1].getAttribute('initialIndex')).toBe('1');
                expect(changedNodes[2].getAttribute('initialIndex')).toBe(null);
            });
        });
    });
    describe('nested tree', function () {
        describe('should initialize', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([NestedCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(NestedCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with a connected data source', function () {
                expect(tree.dataSource).toBe(dataSource);
                expect(dataSource.isConnected).toBe(true);
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
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectNestedTreeToMatch(treeElement, [data[0].pizzaTopping + " - " + data[0].pizzaCheese + " + " + data[0].pizzaBase], [data[1].pizzaTopping + " - " + data[1].pizzaCheese + " + " + data[1].pizzaBase], [data[2].pizzaTopping + " - " + data[2].pizzaCheese + " + " + data[2].pizzaBase]);
                dataSource.addChild(data[1], false);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                data = dataSource.data;
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], ["topping_3 - cheese_3 + base_3"]);
            });
            it('with nested child data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                var child = dataSource.addChild(data[1], false);
                dataSource.addChild(child, false);
                fixture.detectChanges();
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"], ["topping_3 - cheese_3 + base_3"]);
                dataSource.addChild(child, false);
                fixture.detectChanges();
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"], [_, _, "topping_6 - cheese_6 + base_6"], ["topping_3 - cheese_3 + base_3"]);
            });
        });
        describe('with static children', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([StaticNestedCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(StaticNestedCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], [_, _, "topping_5 - cheese_5 + base_5"], [_, _, "topping_6 - cheese_6 + base_6"], ["topping_3 - cheese_3 + base_3"]);
            });
        });
        describe('with when node', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([WhenNodeNestedCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(WhenNodeNestedCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], [">> topping_2 - cheese_2 + base_2"], ["topping_3 - cheese_3 + base_3"]);
                dataSource.addChild(data[1], false);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                data = dataSource.data;
                expect(data.length).toBe(3);
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], [">> topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], ["topping_3 - cheese_3 + base_3"]);
            });
        });
        describe('with toggle', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([NestedCdkTreeAppWithToggle]);
                fixture = testing_1.TestBed.createComponent(NestedCdkTreeAppWithToggle);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('should expand/collapse the node multiple times', function () {
                component.toggleRecursively = false;
                var data = dataSource.data;
                var child = dataSource.addChild(data[1], false);
                dataSource.addChild(child, false);
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
                getNodes(treeElement)[1].click();
                fixture.detectChanges();
                expect(component.treeControl.expansionModel.selected.length)
                    .toBe(1, "Expect node expanded");
                expectNestedTreeToMatch(treeElement, ["topping_1 - cheese_1 + base_1"], ["topping_2 - cheese_2 + base_2"], [_, "topping_4 - cheese_4 + base_4"], ["topping_3 - cheese_3 + base_3"]);
            });
            it('should expand/collapse the node recursively', function () {
                var data = dataSource.data;
                var child = dataSource.addChild(data[1], false);
                dataSource.addChild(child, false);
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
        describe('with array data source', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([ArrayDataSourceNestedCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(ArrayDataSourceNestedCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectNestedTreeToMatch(treeElement, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], ["[topping_3] - [cheese_3] + [base_3]"]);
                dataSource.addChild(data[1], false);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                expectNestedTreeToMatch(treeElement, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], [_, "[topping_4] - [cheese_4] + [base_4]"], ["[topping_3] - [cheese_3] + [base_3]"]);
            });
        });
        describe('with observable data source', function () {
            var fixture;
            var component;
            beforeEach(function () {
                configureCdkTreeTestingModule([ObservableDataSourceNestedCdkTreeApp]);
                fixture = testing_1.TestBed.createComponent(ObservableDataSourceNestedCdkTreeApp);
                component = fixture.componentInstance;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
            });
            it('with the right data', function () {
                expect(dataSource.data.length).toBe(3);
                var data = dataSource.data;
                expectNestedTreeToMatch(treeElement, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], ["[topping_3] - [cheese_3] + [base_3]"]);
                dataSource.addChild(data[1], false);
                fixture.detectChanges();
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                expectNestedTreeToMatch(treeElement, ["[topping_1] - [cheese_1] + [base_1]"], ["[topping_2] - [cheese_2] + [base_2]"], [_, "[topping_4] - [cheese_4] + [base_4]"], ["[topping_3] - [cheese_3] + [base_3]"]);
            });
        });
        describe('with trackBy', function () {
            var fixture;
            var component;
            function createTrackByTestComponent(trackByStrategy) {
                configureCdkTreeTestingModule([NestedCdkTreeAppWithTrackBy]);
                fixture = testing_1.TestBed.createComponent(NestedCdkTreeAppWithTrackBy);
                component = fixture.componentInstance;
                component.trackByStrategy = trackByStrategy;
                dataSource = component.dataSource;
                tree = component.tree;
                treeElement = fixture.nativeElement.querySelector('cdk-tree');
                fixture.detectChanges();
                // Each node receives an attribute 'initialIndex' the element's original place
                getNodes(treeElement).forEach(function (node, index) {
                    node.setAttribute('initialIndex', index.toString());
                });
                // Prove that the attributes match their indicies
                var initialNodes = getNodes(treeElement);
                expect(initialNodes.length).toBe(3);
                initialNodes.forEach(function (node, index) {
                    expect(node.getAttribute('initialIndex')).toBe("" + index);
                });
                var parent = dataSource.data[0];
                dataSource.addChild(parent, false);
                dataSource.addChild(parent, false);
                dataSource.addChild(parent, false);
                getNodes(initialNodes[0]).forEach(function (node, index) {
                    node.setAttribute('initialIndex', "c" + index);
                });
                getNodes(initialNodes[0]).forEach(function (node, index) {
                    expect(node.getAttribute('initialIndex')).toBe("c" + index);
                });
            }
            function mutateChildren(parent) {
                // Swap first and second data in data array
                var copiedData = parent.children.slice();
                var temp = copiedData[0];
                copiedData[0] = copiedData[1];
                copiedData[1] = temp;
                // Remove the third element
                copiedData.splice(2, 1);
                // Add new data
                parent.children = copiedData;
                parent.observableChildren.next(copiedData);
                component.dataSource.addChild(parent, false);
            }
            it('should add/remove/move children nodes with reference-based trackBy', function () {
                createTrackByTestComponent('reference');
                mutateChildren(dataSource.data[0]);
                var changedNodes = getNodes(treeElement);
                expect(changedNodes.length).toBe(6);
                expect(changedNodes[0].getAttribute('initialIndex')).toBe('0');
                // Expect that the first and second child nodes were swapped and that the last node is new
                expect(changedNodes[1].getAttribute('initialIndex')).toBe('c1');
                expect(changedNodes[2].getAttribute('initialIndex')).toBe('c0');
                expect(changedNodes[3].getAttribute('initialIndex')).toBe(null);
                expect(changedNodes[4].getAttribute('initialIndex')).toBe('1');
                expect(changedNodes[5].getAttribute('initialIndex')).toBe('2');
            });
            it('should add/remove/move children nodes with property-based trackBy', function () {
                createTrackByTestComponent('property');
                mutateChildren(dataSource.data[0]);
                // Change each item reference to show that the trackby is checking the item properties.
                // Otherwise this would cause them all to be removed/added.
                dataSource.data[0].observableChildren.next(dataSource.data[0].children
                    .map(function (item) { return new TestData(item.pizzaTopping, item.pizzaCheese, item.pizzaBase); }));
                // Expect that the first and second nodes were swapped and that the last node is new
                var changedNodes = getNodes(treeElement);
                expect(changedNodes.length).toBe(6);
                expect(changedNodes[0].getAttribute('initialIndex')).toBe('0');
                // Expect that the first and second child nodes were swapped and that the last node is new
                expect(changedNodes[1].getAttribute('initialIndex')).toBe('c1');
                expect(changedNodes[2].getAttribute('initialIndex')).toBe('c0');
                expect(changedNodes[3].getAttribute('initialIndex')).toBe(null);
                expect(changedNodes[4].getAttribute('initialIndex')).toBe('1');
                expect(changedNodes[5].getAttribute('initialIndex')).toBe('2');
            });
            it('should add/remove/move children nodes with index-based trackBy', function () {
                createTrackByTestComponent('index');
                mutateChildren(dataSource.data[0]);
                // Change each item reference to show that the trackby is checking the index.
                // Otherwise this would cause them all to be removed/added.
                dataSource.data[0].observableChildren.next(dataSource.data[0].children
                    .map(function (item) { return new TestData(item.pizzaTopping, item.pizzaCheese, item.pizzaBase); }));
                var changedNodes = getNodes(treeElement);
                expect(changedNodes.length).toBe(6);
                expect(changedNodes[0].getAttribute('initialIndex')).toBe('0');
                // Expect first two children to be the same since they were swapped
                // but indicies are consistent.
                // The third element was removed and caught by the tree so it was removed before another
                // item was added, so it is without an initial index.
                expect(changedNodes[1].getAttribute('initialIndex')).toBe('c0');
                expect(changedNodes[2].getAttribute('initialIndex')).toBe('c1');
                expect(changedNodes[3].getAttribute('initialIndex')).toBe(null);
                expect(changedNodes[4].getAttribute('initialIndex')).toBe('1');
                expect(changedNodes[5].getAttribute('initialIndex')).toBe('2');
            });
        });
        it('should throw an error when missing function in nested tree', testing_1.fakeAsync(function () {
            configureCdkTreeTestingModule([NestedCdkErrorTreeApp]);
            expect(function () {
                try {
                    testing_1.TestBed.createComponent(NestedCdkErrorTreeApp).detectChanges();
                    testing_1.flush();
                }
                catch (_a) {
                    testing_1.flush();
                }
                finally {
                    testing_1.flush();
                }
            }).toThrowError(tree_errors_1.getTreeControlFunctionsMissingError().message);
        }));
        it('should throw an error when missing function in flat tree', testing_1.fakeAsync(function () {
            configureCdkTreeTestingModule([FlatCdkErrorTreeApp]);
            expect(function () {
                try {
                    testing_1.TestBed.createComponent(FlatCdkErrorTreeApp).detectChanges();
                    testing_1.flush();
                }
                catch (_a) {
                    testing_1.flush();
                }
            }).toThrowError(tree_errors_1.getTreeControlFunctionsMissingError().message);
        }));
    });
    describe('with depth', function () {
        var fixture;
        var component;
        beforeEach(function () {
            configureCdkTreeTestingModule([DepthNestedCdkTreeApp]);
            fixture = testing_1.TestBed.createComponent(DepthNestedCdkTreeApp);
            component = fixture.componentInstance;
            dataSource = component.dataSource;
            tree = component.tree;
            treeElement = fixture.nativeElement.querySelector('cdk-tree');
            fixture.detectChanges();
        });
        it('should have correct depth for nested tree', function () {
            var data = dataSource.data;
            var child = dataSource.addChild(data[1], false);
            dataSource.addChild(child, false);
            fixture.detectChanges();
            var depthElements = Array.from((treeElement.querySelectorAll('.tree-test-level')));
            var expectedLevels = ['0', '0', '1', '2', '0'];
            depthElements.forEach(function (element, index) {
                var actualLevel = element.textContent.trim();
                expect(actualLevel).toBe(expectedLevels[index]);
            });
            expect(depthElements.length).toBe(5);
        });
    });
});
var TestData = /** @class */ (function () {
    function TestData(pizzaTopping, pizzaCheese, pizzaBase, level) {
        if (level === void 0) { level = 1; }
        this.pizzaTopping = pizzaTopping;
        this.pizzaCheese = pizzaCheese;
        this.pizzaBase = pizzaBase;
        this.level = level;
        this.children = [];
        this.observableChildren = new rxjs_1.BehaviorSubject(this.children);
    }
    return TestData;
}());
exports.TestData = TestData;
var FakeDataSource = /** @class */ (function (_super) {
    __extends(FakeDataSource, _super);
    function FakeDataSource(treeControl) {
        var _this = _super.call(this) || this;
        _this.treeControl = treeControl;
        _this.dataIndex = 0;
        _this.isConnected = false;
        _this._dataChange = new rxjs_1.BehaviorSubject([]);
        for (var i = 0; i < 3; i++) {
            _this.addData();
        }
        return _this;
    }
    Object.defineProperty(FakeDataSource.prototype, "data", {
        get: function () { return this._dataChange.getValue(); },
        set: function (data) { this._dataChange.next(data); },
        enumerable: true,
        configurable: true
    });
    FakeDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        this.isConnected = true;
        var streams = [this._dataChange, collectionViewer.viewChange];
        return rxjs_1.combineLatest(streams)
            .pipe(operators_1.map(function (_a) {
            var data = _a[0];
            _this.treeControl.dataNodes = data;
            return data;
        }));
    };
    FakeDataSource.prototype.disconnect = function () {
        this.isConnected = false;
    };
    FakeDataSource.prototype.addChild = function (parent, isFlat) {
        if (isFlat === void 0) { isFlat = true; }
        var nextIndex = ++this.dataIndex;
        var child = new TestData("topping_" + nextIndex, "cheese_" + nextIndex, "base_" + nextIndex, parent.level + 1);
        parent.children.push(child);
        if (isFlat) {
            var copiedData = this.data.slice();
            copiedData.splice(this.data.indexOf(parent) + 1, 0, child);
            this.data = copiedData;
        }
        else {
            parent.observableChildren.next(parent.children);
        }
        return child;
    };
    FakeDataSource.prototype.addData = function (level) {
        if (level === void 0) { level = 1; }
        var nextIndex = ++this.dataIndex;
        var copiedData = this.data.slice();
        copiedData.push(new TestData("topping_" + nextIndex, "cheese_" + nextIndex, "base_" + nextIndex, level));
        this.data = copiedData;
    };
    return FakeDataSource;
}(collections_1.DataSource));
function getNodes(treeElement) {
    return [].slice.call(treeElement.querySelectorAll('.cdk-tree-node'));
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
        var expectedLevel = (expectedNode.length) * expectedPaddingIndent + "px";
        if (actualLevel != expectedLevel) {
            missedExpectations.push("Expected node level to be " + expectedLevel + " but was " + actualLevel);
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
var SimpleCdkTreeApp = /** @class */ (function () {
    function SimpleCdkTreeApp() {
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    SimpleCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                     cdkTreeNodePadding [cdkTreeNodePaddingIndent]=\"28\"\n                     cdkTreeNodeToggle>\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return SimpleCdkTreeApp;
}());
var NestedCdkTreeApp = /** @class */ (function () {
    function NestedCdkTreeApp() {
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    NestedCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return NestedCdkTreeApp;
}());
var StaticNestedCdkTreeApp = /** @class */ (function () {
    function StaticNestedCdkTreeApp() {
        this.getChildren = function (node) { return node.children; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        var dataSource = new FakeDataSource(this.treeControl);
        var data = dataSource.data;
        var child = dataSource.addChild(data[1], false);
        dataSource.addChild(child, false);
        dataSource.addChild(child, false);
        this.dataSource = dataSource;
    }
    StaticNestedCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    StaticNestedCdkTreeApp.ctorParameters = function () { return []; };
    StaticNestedCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return StaticNestedCdkTreeApp;
}());
var WhenNodeNestedCdkTreeApp = /** @class */ (function () {
    function WhenNodeNestedCdkTreeApp() {
        this.isSecondNode = function (_, node) { return node.pizzaBase.indexOf('2') > 0; };
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    WhenNodeNestedCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n       <cdk-nested-tree-node *cdkTreeNodeDef=\"let node; when: isSecondNode\" class=\"customNodeClass\">\n                     >> {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenNodeNestedCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return WhenNodeNestedCdkTreeApp;
}());
var CdkTreeAppWithToggle = /** @class */ (function () {
    function CdkTreeAppWithToggle() {
        this.toggleRecursively = true;
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    CdkTreeAppWithToggle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                     cdkTreeNodePadding\n                     cdkTreeNodeToggle [cdkTreeNodeToggleRecursive]=\"toggleRecursively\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    CdkTreeAppWithToggle.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return CdkTreeAppWithToggle;
}());
var NestedCdkTreeAppWithToggle = /** @class */ (function () {
    function NestedCdkTreeAppWithToggle() {
        this.toggleRecursively = true;
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    NestedCdkTreeAppWithToggle.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                            cdkTreeNodeToggle [cdkTreeNodeToggleRecursive]=\"toggleRecursively\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n        <div *ngIf=\"treeControl.isExpanded(node)\">\n          <ng-template cdkTreeNodeOutlet></ng-template>\n        </div>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedCdkTreeAppWithToggle.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return NestedCdkTreeAppWithToggle;
}());
var WhenNodeCdkTreeApp = /** @class */ (function () {
    function WhenNodeCdkTreeApp() {
        this.isOddNode = function (_, node) { return node.level % 2 === 1; };
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    WhenNodeCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\"\n                     cdkTreeNodePadding [cdkTreeNodePaddingIndent]=\"28\"\n                     cdkTreeNodeToggle>\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </cdk-tree-node>\n       <cdk-tree-node *cdkTreeNodeDef=\"let node; when: isOddNode\" class=\"customNodeClass\"\n                     cdkTreeNodePadding [cdkTreeNodePaddingIndent]=\"28\"\n                     cdkTreeNodeToggle>\n                     [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    WhenNodeCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return WhenNodeCdkTreeApp;
}());
var ArrayDataSourceCdkTreeApp = /** @class */ (function () {
    function ArrayDataSourceCdkTreeApp() {
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    Object.defineProperty(ArrayDataSourceCdkTreeApp.prototype, "dataArray", {
        get: function () {
            return this.dataSource.data;
        },
        enumerable: true,
        configurable: true
    });
    ArrayDataSourceCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataArray\" [treeControl]=\"treeControl\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\"\n                     cdkTreeNodePadding [cdkTreeNodePaddingIndent]=\"28\"\n                     cdkTreeNodeToggle>\n                     [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    ArrayDataSourceCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return ArrayDataSourceCdkTreeApp;
}());
var ObservableDataSourceCdkTreeApp = /** @class */ (function () {
    function ObservableDataSourceCdkTreeApp() {
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    Object.defineProperty(ObservableDataSourceCdkTreeApp.prototype, "dataObservable", {
        get: function () {
            return this.dataSource._dataChange;
        },
        enumerable: true,
        configurable: true
    });
    ObservableDataSourceCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataObservable\" [treeControl]=\"treeControl\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\"\n                     cdkTreeNodePadding [cdkTreeNodePaddingIndent]=\"28\"\n                     cdkTreeNodeToggle>\n                     [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    ObservableDataSourceCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return ObservableDataSourceCdkTreeApp;
}());
var ArrayDataSourceNestedCdkTreeApp = /** @class */ (function () {
    function ArrayDataSourceNestedCdkTreeApp() {
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    Object.defineProperty(ArrayDataSourceNestedCdkTreeApp.prototype, "dataArray", {
        get: function () {
            return this.dataSource.data;
        },
        enumerable: true,
        configurable: true
    });
    ArrayDataSourceNestedCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataArray\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\">\n                     [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    ArrayDataSourceNestedCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return ArrayDataSourceNestedCdkTreeApp;
}());
var ObservableDataSourceNestedCdkTreeApp = /** @class */ (function () {
    function ObservableDataSourceNestedCdkTreeApp() {
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    Object.defineProperty(ObservableDataSourceNestedCdkTreeApp.prototype, "dataObservable", {
        get: function () {
            return this.dataSource._dataChange;
        },
        enumerable: true,
        configurable: true
    });
    ObservableDataSourceNestedCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataObservable\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\">\n                     [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    ObservableDataSourceNestedCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return ObservableDataSourceNestedCdkTreeApp;
}());
var NestedCdkErrorTreeApp = /** @class */ (function () {
    function NestedCdkErrorTreeApp() {
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    NestedCdkErrorTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedCdkErrorTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return NestedCdkErrorTreeApp;
}());
var FakeTreeControl = /** @class */ (function (_super) {
    __extends(FakeTreeControl, _super);
    function FakeTreeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeTreeControl.prototype.getDescendants = function (_) {
        return this.dataNodes;
    };
    FakeTreeControl.prototype.expandAll = function () {
        // No op
    };
    return FakeTreeControl;
}(base_tree_control_1.BaseTreeControl));
var FlatCdkErrorTreeApp = /** @class */ (function () {
    function FlatCdkErrorTreeApp() {
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new FakeTreeControl();
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    FlatCdkErrorTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    FlatCdkErrorTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return FlatCdkErrorTreeApp;
}());
var DepthNestedCdkTreeApp = /** @class */ (function () {
    function DepthNestedCdkTreeApp() {
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    Object.defineProperty(DepthNestedCdkTreeApp.prototype, "dataArray", {
        get: function () {
            return this.dataSource.data;
        },
        enumerable: true,
        configurable: true
    });
    DepthNestedCdkTreeApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataArray\" [treeControl]=\"treeControl\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node; let level = level\">\n          <span class=\"tree-test-level\">{{level}}</span>\n           [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    DepthNestedCdkTreeApp.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return DepthNestedCdkTreeApp;
}());
var CdkTreeAppWithTrackBy = /** @class */ (function () {
    function CdkTreeAppWithTrackBy() {
        var _this = this;
        this.trackByStrategy = 'reference';
        this.trackByFn = function (index, item) {
            switch (_this.trackByStrategy) {
                case 'reference': return item;
                case 'property': return item.pizzaBase;
                case 'index': return index;
            }
        };
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.children.length > 0; };
        this.treeControl = new flat_tree_control_1.FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    CdkTreeAppWithTrackBy.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\" [trackBy]=\"trackByFn\">\n      <cdk-tree-node *cdkTreeNodeDef=\"let node\" class=\"customNodeClass\">\n                     {{node.pizzaTopping}} - {{node.pizzaCheese}} + {{node.pizzaBase}}\n      </cdk-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    CdkTreeAppWithTrackBy.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return CdkTreeAppWithTrackBy;
}());
var NestedCdkTreeAppWithTrackBy = /** @class */ (function () {
    function NestedCdkTreeAppWithTrackBy() {
        var _this = this;
        this.trackByStrategy = 'reference';
        this.trackByFn = function (index, item) {
            switch (_this.trackByStrategy) {
                case 'reference': return item;
                case 'property': return item.pizzaBase;
                case 'index': return index;
            }
        };
        this.getChildren = function (node) { return node.observableChildren; };
        this.treeControl = new nested_tree_control_1.NestedTreeControl(this.getChildren);
        this.dataSource = new FakeDataSource(this.treeControl);
    }
    Object.defineProperty(NestedCdkTreeAppWithTrackBy.prototype, "dataArray", {
        get: function () {
            return this.dataSource.data;
        },
        enumerable: true,
        configurable: true
    });
    NestedCdkTreeAppWithTrackBy.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <cdk-tree [dataSource]=\"dataArray\" [treeControl]=\"treeControl\" [trackBy]=\"trackByFn\">\n      <cdk-nested-tree-node *cdkTreeNodeDef=\"let node\">\n           [{{node.pizzaTopping}}] - [{{node.pizzaCheese}}] + [{{node.pizzaBase}}]\n         <ng-template cdkTreeNodeOutlet></ng-template>\n      </cdk-nested-tree-node>\n    </cdk-tree>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedCdkTreeAppWithTrackBy.propDecorators = {
        "tree": [{ type: core_1.ViewChild, args: [tree_1.CdkTree,] },],
    };
    return NestedCdkTreeAppWithTrackBy;
}());
//# sourceMappingURL=tree.spec.js.map