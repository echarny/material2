"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var index_1 = require("./index");
describe('MatTabGroup', function () {
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatTabsModule, common_1.CommonModule, animations_1.NoopAnimationsModule],
            declarations: [
                SimpleTabsTestApp,
                SimpleDynamicTabsTestApp,
                BindedTabsTestApp,
                AsyncTabsTestApp,
                DisabledTabsTestApp,
                TabGroupWithSimpleApi,
                TemplateTabs,
                TabGroupWithAriaInputs,
                TabGroupWithIsActiveBinding,
            ],
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('basic behavior', function () {
        var fixture;
        var element;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SimpleTabsTestApp);
            element = fixture.nativeElement;
        });
        it('should default to the first tab', function () {
            checkSelectedIndex(1, fixture);
        });
        it('will properly load content on first change detection pass', function () {
            fixture.detectChanges();
            expect(element.querySelectorAll('.mat-tab-body')[1].querySelectorAll('span').length).toBe(3);
        });
        it('should change selected index on click', function () {
            var component = fixture.debugElement.componentInstance;
            component.selectedIndex = 0;
            checkSelectedIndex(0, fixture);
            // select the second tab
            var tabLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[1];
            tabLabel.nativeElement.click();
            checkSelectedIndex(1, fixture);
            // select the third tab
            tabLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[2];
            tabLabel.nativeElement.click();
            checkSelectedIndex(2, fixture);
        });
        it('should support two-way binding for selectedIndex', testing_2.fakeAsync(function () {
            var component = fixture.componentInstance;
            component.selectedIndex = 0;
            fixture.detectChanges();
            var tabLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[1];
            tabLabel.nativeElement.click();
            fixture.detectChanges();
            testing_2.tick();
            expect(component.selectedIndex).toBe(1);
        }));
        // Note: needs to be `async` in order to fail when we expect it to.
        it('should set to correct tab on fast change', testing_2.async(function () {
            var component = fixture.componentInstance;
            component.selectedIndex = 0;
            fixture.detectChanges();
            setTimeout(function () {
                component.selectedIndex = 1;
                fixture.detectChanges();
                setTimeout(function () {
                    component.selectedIndex = 0;
                    fixture.detectChanges();
                    fixture.whenStable().then(function () {
                        expect(component.selectedIndex).toBe(0);
                    });
                }, 1);
            }, 1);
        }));
        it('should change tabs based on selectedIndex', testing_2.fakeAsync(function () {
            var component = fixture.componentInstance;
            var tabComponent = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            spyOn(component, 'handleSelection').and.callThrough();
            checkSelectedIndex(1, fixture);
            tabComponent.selectedIndex = 2;
            checkSelectedIndex(2, fixture);
            testing_2.tick();
            expect(component.handleSelection).toHaveBeenCalledTimes(1);
            expect(component.selectEvent.index).toBe(2);
        }));
        it('should update tab positions when selected index is changed', function () {
            fixture.detectChanges();
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            var tabs = component._tabs.toArray();
            expect(tabs[0].position).toBeLessThan(0);
            expect(tabs[1].position).toBe(0);
            expect(tabs[2].position).toBeGreaterThan(0);
            // Move to third tab
            component.selectedIndex = 2;
            fixture.detectChanges();
            expect(tabs[0].position).toBeLessThan(0);
            expect(tabs[1].position).toBeLessThan(0);
            expect(tabs[2].position).toBe(0);
            // Move to the first tab
            component.selectedIndex = 0;
            fixture.detectChanges();
            expect(tabs[0].position).toBe(0);
            expect(tabs[1].position).toBeGreaterThan(0);
            expect(tabs[2].position).toBeGreaterThan(0);
        });
        it('should clamp the selected index to the size of the number of tabs', function () {
            fixture.detectChanges();
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            // Set the index to be negative, expect first tab selected
            fixture.componentInstance.selectedIndex = -1;
            fixture.detectChanges();
            expect(component.selectedIndex).toBe(0);
            // Set the index beyond the size of the tabs, expect last tab selected
            fixture.componentInstance.selectedIndex = 3;
            fixture.detectChanges();
            expect(component.selectedIndex).toBe(2);
        });
        it('should not crash when setting the selected index to NaN', function () {
            var component = fixture.debugElement.componentInstance;
            expect(function () {
                component.selectedIndex = NaN;
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should show ripples for tab-group labels', function () {
            fixture.detectChanges();
            var testElement = fixture.nativeElement;
            var tabLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[1];
            expect(testElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up initially.');
            testing_1.dispatchFakeEvent(tabLabel.nativeElement, 'mousedown');
            testing_1.dispatchFakeEvent(tabLabel.nativeElement, 'mouseup');
            expect(testElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected one ripple to show up on label mousedown.');
        });
        it('should allow disabling ripples for tab-group labels', function () {
            fixture.componentInstance.disableRipple = true;
            fixture.detectChanges();
            var testElement = fixture.nativeElement;
            var tabLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[1];
            expect(testElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up initially.');
            testing_1.dispatchFakeEvent(tabLabel.nativeElement, 'mousedown');
            testing_1.dispatchFakeEvent(tabLabel.nativeElement, 'mouseup');
            expect(testElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripple to show up on label mousedown.');
        });
        it('should set the isActive flag on each of the tabs', testing_2.fakeAsync(function () {
            fixture.detectChanges();
            testing_2.tick();
            var tabs = fixture.componentInstance.tabs.toArray();
            expect(tabs[0].isActive).toBe(false);
            expect(tabs[1].isActive).toBe(true);
            expect(tabs[2].isActive).toBe(false);
            fixture.componentInstance.selectedIndex = 2;
            fixture.detectChanges();
            testing_2.tick();
            expect(tabs[0].isActive).toBe(false);
            expect(tabs[1].isActive).toBe(false);
            expect(tabs[2].isActive).toBe(true);
        }));
        it('should fire animation done event', testing_2.fakeAsync(function () {
            fixture.detectChanges();
            spyOn(fixture.componentInstance, 'animationDone');
            var tabLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[1];
            tabLabel.nativeElement.click();
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.componentInstance.animationDone).toHaveBeenCalled();
        }));
        it('should add the proper `aria-setsize` and `aria-posinset`', function () {
            fixture.detectChanges();
            var labels = Array.from(element.querySelectorAll('.mat-tab-label'));
            expect(labels.map(function (label) { return label.getAttribute('aria-posinset'); })).toEqual(['1', '2', '3']);
            expect(labels.every(function (label) { return label.getAttribute('aria-setsize') === '3'; })).toBe(true);
        });
        it('should emit focusChange event on click', function () {
            spyOn(fixture.componentInstance, 'handleFocus');
            fixture.detectChanges();
            var tabLabels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'));
            expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(0);
            tabLabels[1].nativeElement.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(1);
            expect(fixture.componentInstance.handleFocus)
                .toHaveBeenCalledWith(jasmine.objectContaining({ index: 1 }));
        });
        it('should emit focusChange on arrow key navigation', function () {
            spyOn(fixture.componentInstance, 'handleFocus');
            fixture.detectChanges();
            var tabLabels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'));
            var tabLabelContainer = fixture.debugElement
                .query(platform_browser_1.By.css('.mat-tab-label-container')).nativeElement;
            expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(0);
            // In order to verify that the `focusChange` event also fires with the correct
            // index, we focus the second tab before testing the keyboard navigation.
            tabLabels[1].nativeElement.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(1);
            testing_1.dispatchKeyboardEvent(tabLabelContainer, 'keydown', keycodes_1.LEFT_ARROW);
            expect(fixture.componentInstance.handleFocus).toHaveBeenCalledTimes(2);
            expect(fixture.componentInstance.handleFocus)
                .toHaveBeenCalledWith(jasmine.objectContaining({ index: 0 }));
        });
    });
    describe('aria labelling', function () {
        var fixture;
        var tab;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(TabGroupWithAriaInputs);
            fixture.detectChanges();
            testing_2.tick();
            tab = fixture.nativeElement.querySelector('.mat-tab-label');
        }));
        it('should not set aria-label or aria-labelledby attributes if they are not passed in', function () {
            expect(tab.hasAttribute('aria-label')).toBe(false);
            expect(tab.hasAttribute('aria-labelledby')).toBe(false);
        });
        it('should set the aria-label attribute', function () {
            fixture.componentInstance.ariaLabel = 'Fruit';
            fixture.detectChanges();
            expect(tab.getAttribute('aria-label')).toBe('Fruit');
        });
        it('should set the aria-labelledby attribute', function () {
            fixture.componentInstance.ariaLabelledby = 'fruit-label';
            fixture.detectChanges();
            expect(tab.getAttribute('aria-labelledby')).toBe('fruit-label');
        });
        it('should not be able to set both an aria-label and aria-labelledby', function () {
            fixture.componentInstance.ariaLabel = 'Fruit';
            fixture.componentInstance.ariaLabelledby = 'fruit-label';
            fixture.detectChanges();
            expect(tab.getAttribute('aria-label')).toBe('Fruit');
            expect(tab.hasAttribute('aria-labelledby')).toBe(false);
        });
    });
    describe('disable tabs', function () {
        var fixture;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(DisabledTabsTestApp);
        });
        it('should have one disabled tab', function () {
            fixture.detectChanges();
            var labels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-disabled'));
            expect(labels.length).toBe(1);
            expect(labels[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
        });
        it('should set the disabled flag on tab', function () {
            fixture.detectChanges();
            var tabs = fixture.componentInstance.tabs.toArray();
            var labels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-disabled'));
            expect(tabs[2].disabled).toBe(false);
            expect(labels.length).toBe(1);
            expect(labels[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            expect(tabs[2].disabled).toBe(true);
            labels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-disabled'));
            expect(labels.length).toBe(2);
            expect(labels.every(function (label) { return label.nativeElement.getAttribute('aria-disabled') === 'true'; }))
                .toBe(true);
        });
    });
    describe('dynamic binding tabs', function () {
        var fixture;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SimpleDynamicTabsTestApp);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
        }));
        it('should be able to add a new tab, select it, and have correct origin position', testing_2.fakeAsync(function () {
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            var tabs = component._tabs.toArray();
            expect(tabs[0].origin).toBe(null);
            expect(tabs[1].origin).toBe(0);
            expect(tabs[2].origin).toBe(null);
            // Add a new tab on the right and select it, expect an origin >= than 0 (animate right)
            fixture.componentInstance.tabs.push({ label: 'New tab', content: 'to right of index' });
            fixture.componentInstance.selectedIndex = 4;
            fixture.detectChanges();
            testing_2.tick();
            tabs = component._tabs.toArray();
            expect(tabs[3].origin).toBeGreaterThanOrEqual(0);
            // Add a new tab in the beginning and select it, expect an origin < than 0 (animate left)
            fixture.componentInstance.selectedIndex = 0;
            fixture.detectChanges();
            testing_2.tick();
            fixture.componentInstance.tabs.push({ label: 'New tab', content: 'to left of index' });
            fixture.detectChanges();
            testing_2.tick();
            tabs = component._tabs.toArray();
            expect(tabs[0].origin).toBeLessThan(0);
        }));
        it('should update selected index if the last tab removed while selected', testing_2.fakeAsync(function () {
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            var numberOfTabs = component._tabs.length;
            fixture.componentInstance.selectedIndex = numberOfTabs - 1;
            fixture.detectChanges();
            testing_2.tick();
            // Remove last tab while last tab is selected, expect next tab over to be selected
            fixture.componentInstance.tabs.pop();
            fixture.detectChanges();
            testing_2.tick();
            expect(component.selectedIndex).toBe(numberOfTabs - 2);
        }));
        it('should maintain the selected tab if a new tab is added', function () {
            fixture.detectChanges();
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            fixture.componentInstance.selectedIndex = 1;
            fixture.detectChanges();
            // Add a new tab at the beginning.
            fixture.componentInstance.tabs.unshift({ label: 'New tab', content: 'at the start' });
            fixture.detectChanges();
            expect(component.selectedIndex).toBe(2);
            expect(component._tabs.toArray()[2].isActive).toBe(true);
        });
        it('should maintain the selected tab if a tab is removed', function () {
            // Select the second tab.
            fixture.componentInstance.selectedIndex = 1;
            fixture.detectChanges();
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            // Remove the first tab that is right before the selected one.
            fixture.componentInstance.tabs.splice(0, 1);
            fixture.detectChanges();
            // Since the first tab has been removed and the second one was selected before, the selected
            // tab moved one position to the right. Meaning that the tab is now the first tab.
            expect(component.selectedIndex).toBe(0);
            expect(component._tabs.toArray()[0].isActive).toBe(true);
        });
        it('should be able to select a new tab after creation', testing_2.fakeAsync(function () {
            fixture.detectChanges();
            var component = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
            fixture.componentInstance.tabs.push({ label: 'Last tab', content: 'at the end' });
            fixture.componentInstance.selectedIndex = 3;
            fixture.detectChanges();
            testing_2.tick();
            expect(component.selectedIndex).toBe(3);
            expect(component._tabs.toArray()[3].isActive).toBe(true);
        }));
        it('should not fire `selectedTabChange` when the amount of tabs changes', testing_2.fakeAsync(function () {
            fixture.detectChanges();
            fixture.componentInstance.selectedIndex = 1;
            fixture.detectChanges();
            // Add a new tab at the beginning.
            spyOn(fixture.componentInstance, 'handleSelection');
            fixture.componentInstance.tabs.unshift({ label: 'New tab', content: 'at the start' });
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            expect(fixture.componentInstance.handleSelection).not.toHaveBeenCalled();
        }));
    });
    describe('async tabs', function () {
        var fixture;
        it('should show tabs when they are available', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(AsyncTabsTestApp);
            expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label')).length).toBe(0);
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label')).length).toBe(2);
        }));
    });
    describe('with simple api', function () {
        var fixture;
        var tabGroup;
        beforeEach(testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(TabGroupWithSimpleApi);
            fixture.detectChanges();
            testing_2.tick();
            tabGroup = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatTabGroup)).componentInstance;
        }));
        it('should support a tab-group with the simple api', testing_2.fakeAsync(function () {
            expect(getSelectedLabel(fixture).textContent).toMatch('Junk food');
            expect(getSelectedContent(fixture).textContent).toMatch('Pizza, fries');
            tabGroup.selectedIndex = 2;
            fixture.detectChanges();
            testing_2.tick();
            expect(getSelectedLabel(fixture).textContent).toMatch('Fruit');
            expect(getSelectedContent(fixture).textContent).toMatch('Apples, grapes');
            fixture.componentInstance.otherLabel = 'Chips';
            fixture.componentInstance.otherContent = 'Salt, vinegar';
            fixture.detectChanges();
            expect(getSelectedLabel(fixture).textContent).toMatch('Chips');
            expect(getSelectedContent(fixture).textContent).toMatch('Salt, vinegar');
        }));
        it('should support @ViewChild in the tab content', function () {
            expect(fixture.componentInstance.legumes).toBeTruthy();
        });
        it('should only have the active tab in the DOM', testing_2.fakeAsync(function () {
            expect(fixture.nativeElement.textContent).toContain('Pizza, fries');
            expect(fixture.nativeElement.textContent).not.toContain('Peanuts');
            tabGroup.selectedIndex = 3;
            fixture.detectChanges();
            testing_2.tick();
            expect(fixture.nativeElement.textContent).not.toContain('Pizza, fries');
            expect(fixture.nativeElement.textContent).toContain('Peanuts');
        }));
        it('should support setting the header position', function () {
            var tabGroupNode = fixture.debugElement.query(platform_browser_1.By.css('mat-tab-group')).nativeElement;
            expect(tabGroupNode.classList).not.toContain('mat-tab-group-inverted-header');
            tabGroup.headerPosition = 'below';
            fixture.detectChanges();
            expect(tabGroupNode.classList).toContain('mat-tab-group-inverted-header');
        });
    });
    describe('lazy loaded tabs', function () {
        it('should lazy load the second tab', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(TemplateTabs);
            fixture.detectChanges();
            testing_2.tick();
            var secondLabel = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-tab-label'))[1];
            secondLabel.nativeElement.click();
            fixture.detectChanges();
            testing_2.tick();
            fixture.detectChanges();
            var child = fixture.debugElement.query(platform_browser_1.By.css('.child'));
            expect(child.nativeElement).toBeDefined();
        }));
    });
    describe('special cases', function () {
        it('should not throw an error when binding isActive to the view', testing_2.fakeAsync(function () {
            var fixture = testing_2.TestBed.createComponent(TabGroupWithIsActiveBinding);
            expect(function () {
                fixture.detectChanges();
                testing_2.tick();
                fixture.detectChanges();
            }).not.toThrow();
            expect(fixture.nativeElement.textContent).toContain('pizza is active');
        }));
    });
    /**
       * Checks that the `selectedIndex` has been updated; checks that the label and body have their
       * respective `active` classes
       */
    function checkSelectedIndex(expectedIndex, fixture) {
        fixture.detectChanges();
        var tabComponent = fixture.debugElement
            .query(platform_browser_1.By.css('mat-tab-group')).componentInstance;
        expect(tabComponent.selectedIndex).toBe(expectedIndex);
        var tabLabelElement = fixture.debugElement
            .query(platform_browser_1.By.css(".mat-tab-label:nth-of-type(" + (expectedIndex + 1) + ")")).nativeElement;
        expect(tabLabelElement.classList.contains('mat-tab-label-active')).toBe(true);
        var tabContentElement = fixture.debugElement
            .query(platform_browser_1.By.css("mat-tab-body:nth-of-type(" + (expectedIndex + 1) + ")")).nativeElement;
        expect(tabContentElement.classList.contains('mat-tab-body-active')).toBe(true);
    }
    function getSelectedLabel(fixture) {
        return fixture.nativeElement.querySelector('.mat-tab-label-active');
    }
    function getSelectedContent(fixture) {
        return fixture.nativeElement.querySelector('.mat-tab-body-active');
    }
});
describe('nested MatTabGroup with enabled animations', function () {
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [index_1.MatTabsModule, animations_1.BrowserAnimationsModule],
            declarations: [NestedTabs]
        });
        testing_2.TestBed.compileComponents();
    }));
    it('should not throw when creating a component with nested tab groups', testing_2.fakeAsync(function () {
        expect(function () {
            var fixture = testing_2.TestBed.createComponent(NestedTabs);
            fixture.detectChanges();
            testing_2.tick();
        }).not.toThrow();
    }));
});
var SimpleTabsTestApp = /** @class */ (function () {
    function SimpleTabsTestApp() {
        this.selectedIndex = 1;
        this.disableRipple = false;
        this.headerPosition = 'above';
    }
    SimpleTabsTestApp.prototype.handleFocus = function (event) {
        this.focusEvent = event;
    };
    SimpleTabsTestApp.prototype.handleSelection = function (event) {
        this.selectEvent = event;
    };
    SimpleTabsTestApp.prototype.animationDone = function () { };
    SimpleTabsTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tab-group class=\"tab-group\"\n        [(selectedIndex)]=\"selectedIndex\"\n        [headerPosition]=\"headerPosition\"\n        [disableRipple]=\"disableRipple\"\n        (animationDone)=\"animationDone()\"\n        (focusChange)=\"handleFocus($event)\"\n        (selectedTabChange)=\"handleSelection($event)\">\n      <mat-tab>\n        <ng-template mat-tab-label>Tab One</ng-template>\n        Tab one content\n      </mat-tab>\n      <mat-tab>\n        <ng-template mat-tab-label>Tab Two</ng-template>\n        <span>Tab </span><span>two</span><span>content</span>\n      </mat-tab>\n      <mat-tab>\n        <ng-template mat-tab-label>Tab Three</ng-template>\n        Tab three content\n      </mat-tab>\n    </mat-tab-group>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleTabsTestApp.propDecorators = {
        "tabs": [{ type: core_1.ViewChildren, args: [index_1.MatTab,] },],
    };
    return SimpleTabsTestApp;
}());
var SimpleDynamicTabsTestApp = /** @class */ (function () {
    function SimpleDynamicTabsTestApp() {
        this.tabs = [
            { label: 'Label 1', content: 'Content 1' },
            { label: 'Label 2', content: 'Content 2' },
            { label: 'Label 3', content: 'Content 3' },
        ];
        this.selectedIndex = 1;
    }
    SimpleDynamicTabsTestApp.prototype.handleFocus = function (event) {
        this.focusEvent = event;
    };
    SimpleDynamicTabsTestApp.prototype.handleSelection = function (event) {
        this.selectEvent = event;
    };
    SimpleDynamicTabsTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tab-group class=\"tab-group\"\n        [(selectedIndex)]=\"selectedIndex\"\n        (focusChange)=\"handleFocus($event)\"\n        (selectedTabChange)=\"handleSelection($event)\">\n      <mat-tab *ngFor=\"let tab of tabs\">\n        <ng-template mat-tab-label>{{tab.label}}</ng-template>\n        {{tab.content}}\n      </mat-tab>\n    </mat-tab-group>\n  "
                },] },
    ];
    return SimpleDynamicTabsTestApp;
}());
var BindedTabsTestApp = /** @class */ (function () {
    function BindedTabsTestApp() {
        this.tabs = [
            { label: 'one', content: 'one' },
            { label: 'two', content: 'two' }
        ];
        this.selectedIndex = 0;
    }
    BindedTabsTestApp.prototype.addNewActiveTab = function () {
        this.tabs.push({
            label: 'new tab',
            content: 'new content'
        });
        this.selectedIndex = this.tabs.length - 1;
    };
    BindedTabsTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tab-group class=\"tab-group\" [(selectedIndex)]=\"selectedIndex\">\n      <mat-tab *ngFor=\"let tab of tabs\" label=\"{{tab.label}}\">\n        {{tab.content}}\n      </mat-tab>\n    </mat-tab-group>\n  "
                },] },
    ];
    return BindedTabsTestApp;
}());
var DisabledTabsTestApp = /** @class */ (function () {
    function DisabledTabsTestApp() {
        this.isDisabled = false;
    }
    DisabledTabsTestApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'test-app',
                    template: "\n    <mat-tab-group class=\"tab-group\">\n      <mat-tab>\n        <ng-template mat-tab-label>Tab One</ng-template>\n        Tab one content\n      </mat-tab>\n      <mat-tab disabled>\n        <ng-template mat-tab-label>Tab Two</ng-template>\n        Tab two content\n      </mat-tab>\n      <mat-tab [disabled]=\"isDisabled\">\n        <ng-template mat-tab-label>Tab Three</ng-template>\n        Tab three content\n      </mat-tab>\n    </mat-tab-group>\n  ",
                },] },
    ];
    /** @nocollapse */
    DisabledTabsTestApp.propDecorators = {
        "tabs": [{ type: core_1.ViewChildren, args: [index_1.MatTab,] },],
    };
    return DisabledTabsTestApp;
}());
var AsyncTabsTestApp = /** @class */ (function () {
    function AsyncTabsTestApp() {
        this._tabs = [
            { label: 'one', content: 'one' },
            { label: 'two', content: 'two' }
        ];
    }
    AsyncTabsTestApp.prototype.ngOnInit = function () {
        var _this = this;
        // Use ngOnInit because there is some issue with scheduling the async task in the constructor.
        this.tabs = rxjs_1.Observable.create(function (observer) {
            setTimeout(function () { return observer.next(_this._tabs); });
        });
    };
    AsyncTabsTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tab-group class=\"tab-group\">\n      <mat-tab *ngFor=\"let tab of tabs | async\">\n        <ng-template mat-tab-label>{{ tab.label }}</ng-template>\n        {{ tab.content }}\n      </mat-tab>\n   </mat-tab-group>\n  "
                },] },
    ];
    return AsyncTabsTestApp;
}());
var TabGroupWithSimpleApi = /** @class */ (function () {
    function TabGroupWithSimpleApi() {
        this.otherLabel = 'Fruit';
        this.otherContent = 'Apples, grapes';
    }
    TabGroupWithSimpleApi.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-tab-group>\n    <mat-tab label=\"Junk food\"> Pizza, fries </mat-tab>\n    <mat-tab label=\"Vegetables\"> Broccoli, spinach </mat-tab>\n    <mat-tab [label]=\"otherLabel\"> {{otherContent}} </mat-tab>\n    <mat-tab label=\"Legumes\"> <p #legumes>Peanuts</p> </mat-tab>\n  </mat-tab-group>\n  "
                },] },
    ];
    /** @nocollapse */
    TabGroupWithSimpleApi.propDecorators = {
        "legumes": [{ type: core_1.ViewChild, args: ['legumes',] },],
    };
    return TabGroupWithSimpleApi;
}());
var NestedTabs = /** @class */ (function () {
    function NestedTabs() {
    }
    NestedTabs.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'nested-tabs',
                    template: "\n    <mat-tab-group>\n      <mat-tab label=\"One\">Tab one content</mat-tab>\n      <mat-tab label=\"Two\">\n        Tab two content\n         <mat-tab-group [dynamicHeight]=\"true\">\n          <mat-tab label=\"Inner tab one\">Inner content one</mat-tab>\n          <mat-tab label=\"Inner tab two\">Inner content two</mat-tab>\n        </mat-tab-group>\n      </mat-tab>\n    </mat-tab-group>\n  ",
                },] },
    ];
    return NestedTabs;
}());
var TemplateTabs = /** @class */ (function () {
    function TemplateTabs() {
    }
    TemplateTabs.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'template-tabs',
                    template: "\n    <mat-tab-group>\n      <mat-tab label=\"One\">\n        Eager\n      </mat-tab>\n      <mat-tab label=\"Two\">\n        <ng-template matTabContent>\n          <div class=\"child\">Hi</div>\n        </ng-template>\n      </mat-tab>\n    </mat-tab-group>\n  ",
                },] },
    ];
    return TemplateTabs;
}());
var TabGroupWithAriaInputs = /** @class */ (function () {
    function TabGroupWithAriaInputs() {
    }
    TabGroupWithAriaInputs.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <mat-tab-group>\n    <mat-tab [aria-label]=\"ariaLabel\" [aria-labelledby]=\"ariaLabelledby\"></mat-tab>\n  </mat-tab-group>\n  "
                },] },
    ];
    return TabGroupWithAriaInputs;
}());
var TabGroupWithIsActiveBinding = /** @class */ (function () {
    function TabGroupWithIsActiveBinding() {
    }
    TabGroupWithIsActiveBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-tab-group>\n      <mat-tab label=\"Junk food\" #pizza> Pizza, fries </mat-tab>\n      <mat-tab label=\"Vegetables\"> Broccoli, spinach </mat-tab>\n    </mat-tab-group>\n\n    <div *ngIf=\"pizza.isActive\">pizza is active</div>\n  "
                },] },
    ];
    return TabGroupWithIsActiveBinding;
}());
//# sourceMappingURL=tab-group.spec.js.map