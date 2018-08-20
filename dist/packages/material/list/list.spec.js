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
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('MatList', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatListModule],
            declarations: [
                ListWithOneAnchorItem,
                ListWithOneItem,
                ListWithTwoLineItem,
                ListWithThreeLineItem,
                ListWithAvatar,
                ListWithItemWithCssClass,
                ListWithDynamicNumberOfLines,
                ListWithMultipleItems,
                ListWithManyLines,
                NavListWithOneAnchorItem,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should add and remove focus class on focus/blur', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithOneAnchorItem);
        fixture.detectChanges();
        var listItem = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatListItem));
        var listItemEl = fixture.debugElement.query(platform_browser_1.By.css('.mat-list-item'));
        expect(listItemEl.nativeElement.classList).not.toContain('mat-list-item-focus');
        listItem.componentInstance._handleFocus();
        fixture.detectChanges();
        expect(listItemEl.nativeElement.classList).toContain('mat-list-item-focus');
        listItem.componentInstance._handleBlur();
        fixture.detectChanges();
        expect(listItemEl.nativeElement.classList).not.toContain('mat-list-item-focus');
    });
    it('should not apply any additional class to a list without lines', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithOneItem);
        var listItem = fixture.debugElement.query(platform_browser_1.By.css('mat-list-item'));
        fixture.detectChanges();
        expect(listItem.nativeElement.className).toBe('mat-list-item');
    });
    it('should apply mat-2-line class to lists with two lines', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithTwoLineItem);
        fixture.detectChanges();
        var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('mat-list-item'));
        expect(listItems[0].nativeElement.className).toContain('mat-2-line');
        expect(listItems[1].nativeElement.className).toContain('mat-2-line');
    });
    it('should apply mat-3-line class to lists with three lines', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithThreeLineItem);
        fixture.detectChanges();
        var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('mat-list-item'));
        expect(listItems[0].nativeElement.className).toContain('mat-3-line');
        expect(listItems[1].nativeElement.className).toContain('mat-3-line');
    });
    it('should apply mat-multi-line class to lists with more than 3 lines', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithManyLines);
        fixture.detectChanges();
        var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('mat-list-item'));
        expect(listItems[0].nativeElement.className).toContain('mat-multi-line');
        expect(listItems[1].nativeElement.className).toContain('mat-multi-line');
    });
    it('should apply a class to list items with avatars', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithAvatar);
        fixture.detectChanges();
        var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('mat-list-item'));
        expect(listItems[0].nativeElement.className).toContain('mat-list-item-with-avatar');
        expect(listItems[1].nativeElement.className).not.toContain('mat-list-item-with-avatar');
    });
    it('should not clear custom classes provided by user', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithItemWithCssClass);
        fixture.detectChanges();
        var listItems = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('mat-list-item'));
        expect(listItems[0].nativeElement.classList.contains('test-class')).toBe(true);
    });
    it('should update classes if number of lines change', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithDynamicNumberOfLines);
        fixture.debugElement.componentInstance.showThirdLine = false;
        fixture.detectChanges();
        var listItem = fixture.debugElement.children[0].query(platform_browser_1.By.css('mat-list-item'));
        expect(listItem.nativeElement.classList.length).toBe(2);
        expect(listItem.nativeElement.classList).toContain('mat-2-line');
        expect(listItem.nativeElement.classList).toContain('mat-list-item');
        fixture.debugElement.componentInstance.showThirdLine = true;
        fixture.detectChanges();
        expect(listItem.nativeElement.className).toContain('mat-3-line');
    });
    it('should add aria roles properly', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithMultipleItems);
        fixture.detectChanges();
        var list = fixture.debugElement.children[0];
        var listItem = fixture.debugElement.children[0].query(platform_browser_1.By.css('mat-list-item'));
        expect(list.nativeElement.getAttribute('role')).toBeNull('Expect mat-list no role');
        expect(listItem.nativeElement.getAttribute('role')).toBeNull('Expect mat-list-item no role');
    });
    it('should not show ripples for non-nav lists', function () {
        var fixture = testing_1.TestBed.createComponent(ListWithOneAnchorItem);
        fixture.detectChanges();
        var items = fixture.debugElement.componentInstance.listItems;
        expect(items.length).toBeGreaterThan(0);
        items.forEach(function (item) { return expect(item._isRippleDisabled()).toBe(true); });
    });
    it('should allow disabling ripples for specific nav-list items', function () {
        var fixture = testing_1.TestBed.createComponent(NavListWithOneAnchorItem);
        fixture.detectChanges();
        var items = fixture.componentInstance.listItems;
        expect(items.length).toBeGreaterThan(0);
        // Ripples should be enabled by default, and can be disabled with a binding.
        items.forEach(function (item) { return expect(item._isRippleDisabled()).toBe(false); });
        fixture.componentInstance.disableItemRipple = true;
        fixture.detectChanges();
        items.forEach(function (item) { return expect(item._isRippleDisabled()).toBe(true); });
    });
    it('should allow disabling ripples for the whole nav-list', function () {
        var fixture = testing_1.TestBed.createComponent(NavListWithOneAnchorItem);
        fixture.detectChanges();
        var items = fixture.componentInstance.listItems;
        expect(items.length).toBeGreaterThan(0);
        // Ripples should be enabled by default, and can be disabled with a binding.
        items.forEach(function (item) { return expect(item._isRippleDisabled()).toBe(false); });
        fixture.componentInstance.disableListRipple = true;
        fixture.detectChanges();
        items.forEach(function (item) { return expect(item._isRippleDisabled()).toBe(true); });
    });
});
var BaseTestList = /** @class */ (function () {
    function BaseTestList() {
        this.items = [
            { 'name': 'Paprika', 'description': 'A seasoning' },
            { 'name': 'Pepper', 'description': 'Another seasoning' }
        ];
        this.showThirdLine = false;
    }
    return BaseTestList;
}());
var ListWithOneAnchorItem = /** @class */ (function (_super) {
    __extends(ListWithOneAnchorItem, _super);
    function ListWithOneAnchorItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithOneAnchorItem.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <a mat-list-item>\n      Paprika\n    </a>\n  </mat-list>" },] },
    ];
    /** @nocollapse */
    ListWithOneAnchorItem.propDecorators = {
        "listItems": [{ type: core_1.ViewChildren, args: [index_1.MatListItem,] },],
    };
    return ListWithOneAnchorItem;
}(BaseTestList));
var NavListWithOneAnchorItem = /** @class */ (function (_super) {
    __extends(NavListWithOneAnchorItem, _super);
    function NavListWithOneAnchorItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disableItemRipple = false;
        _this.disableListRipple = false;
        return _this;
    }
    NavListWithOneAnchorItem.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-nav-list [disableRipple]=\"disableListRipple\">\n    <a mat-list-item [disableRipple]=\"disableItemRipple\">\n      Paprika\n    </a>\n  </mat-nav-list>" },] },
    ];
    /** @nocollapse */
    NavListWithOneAnchorItem.propDecorators = {
        "listItems": [{ type: core_1.ViewChildren, args: [index_1.MatListItem,] },],
    };
    return NavListWithOneAnchorItem;
}(BaseTestList));
var ListWithOneItem = /** @class */ (function (_super) {
    __extends(ListWithOneItem, _super);
    function ListWithOneItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithOneItem.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item>\n      Paprika\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithOneItem;
}(BaseTestList));
var ListWithTwoLineItem = /** @class */ (function (_super) {
    __extends(ListWithTwoLineItem, _super);
    function ListWithTwoLineItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithTwoLineItem.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item *ngFor=\"let item of items\">\n      <img src=\"\">\n      <h3 mat-line>{{item.name}}</h3>\n      <p mat-line>{{item.description}}</p>\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithTwoLineItem;
}(BaseTestList));
var ListWithThreeLineItem = /** @class */ (function (_super) {
    __extends(ListWithThreeLineItem, _super);
    function ListWithThreeLineItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithThreeLineItem.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item *ngFor=\"let item of items\">\n      <h3 mat-line>{{item.name}}</h3>\n      <p mat-line>{{item.description}}</p>\n      <p mat-line>Some other text</p>\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithThreeLineItem;
}(BaseTestList));
var ListWithManyLines = /** @class */ (function (_super) {
    __extends(ListWithManyLines, _super);
    function ListWithManyLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithManyLines.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item *ngFor=\"let item of items\">\n      <h3 mat-line>Line 1</h3>\n      <p mat-line>Line 2</p>\n      <p mat-line>Line 3</p>\n      <p mat-line>Line 4</p>\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithManyLines;
}(BaseTestList));
var ListWithAvatar = /** @class */ (function (_super) {
    __extends(ListWithAvatar, _super);
    function ListWithAvatar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithAvatar.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item>\n      <img src=\"\" mat-list-avatar>\n      Paprika\n    </mat-list-item>\n    <mat-list-item>\n      Pepper\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithAvatar;
}(BaseTestList));
var ListWithItemWithCssClass = /** @class */ (function (_super) {
    __extends(ListWithItemWithCssClass, _super);
    function ListWithItemWithCssClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithItemWithCssClass.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item class=\"test-class\" *ngFor=\"let item of items\">\n      <h3 mat-line>{{item.name}}</h3>\n      <p mat-line>{{item.description}}</p>\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithItemWithCssClass;
}(BaseTestList));
var ListWithDynamicNumberOfLines = /** @class */ (function (_super) {
    __extends(ListWithDynamicNumberOfLines, _super);
    function ListWithDynamicNumberOfLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithDynamicNumberOfLines.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item *ngFor=\"let item of items\">\n      <h3 mat-line>{{item.name}}</h3>\n      <p mat-line>{{item.description}}</p>\n      <p mat-line *ngIf=\"showThirdLine\">Some other text</p>\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithDynamicNumberOfLines;
}(BaseTestList));
var ListWithMultipleItems = /** @class */ (function (_super) {
    __extends(ListWithMultipleItems, _super);
    function ListWithMultipleItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListWithMultipleItems.decorators = [
        { type: core_1.Component, args: [{ template: "\n  <mat-list>\n    <mat-list-item *ngFor=\"let item of items\">\n      {{item.name}}\n    </mat-list-item>\n  </mat-list>" },] },
    ];
    return ListWithMultipleItems;
}(BaseTestList));
//# sourceMappingURL=list.spec.js.map