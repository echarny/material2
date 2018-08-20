"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var portal_1 = require("@angular/cdk/portal");
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/cdk/testing");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var ink_bar_1 = require("./ink-bar");
var tab_header_1 = require("./tab-header");
var tab_label_wrapper_1 = require("./tab-label-wrapper");
var rxjs_1 = require("rxjs");
describe('MatTabHeader', function () {
    var dir = 'ltr';
    var change = new rxjs_1.Subject();
    var fixture;
    var appComponent;
    beforeEach(testing_2.async(function () {
        dir = 'ltr';
        testing_2.TestBed.configureTestingModule({
            imports: [common_1.CommonModule, portal_1.PortalModule, core_2.MatRippleModule, scrolling_1.ScrollingModule],
            declarations: [
                tab_header_1.MatTabHeader,
                ink_bar_1.MatInkBar,
                tab_label_wrapper_1.MatTabLabelWrapper,
                SimpleTabHeaderApp,
            ],
            providers: [
                scrolling_1.ViewportRuler,
                { provide: bidi_1.Directionality, useFactory: function () { return ({ value: dir, change: change.asObservable() }); } },
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('focusing', function () {
        var tabListContainer;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(SimpleTabHeaderApp);
            fixture.detectChanges();
            appComponent = fixture.componentInstance;
            tabListContainer = appComponent.tabHeader._tabListContainer.nativeElement;
        });
        it('should initialize to the selected index', function () {
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(appComponent.selectedIndex);
        });
        it('should send focus change event', function () {
            appComponent.tabHeader.focusIndex = 2;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(2);
        });
        it('should not set focus a disabled tab', function () {
            appComponent.tabHeader.focusIndex = 0;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            // Set focus on the disabled tab, but focus should remain 0
            appComponent.tabHeader.focusIndex = appComponent.disabledTabIndex;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
        });
        it('should move focus right and skip disabled tabs', function () {
            appComponent.tabHeader.focusIndex = 0;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            // Move focus right, verify that the disabled tab is 1 and should be skipped
            expect(appComponent.disabledTabIndex).toBe(1);
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(2);
            // Move focus right to index 3
            // Move focus right to index 3
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(3);
        });
        it('should move focus left and skip disabled tabs', function () {
            appComponent.tabHeader.focusIndex = 3;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(3);
            // Move focus left to index 3
            // Move focus left to index 3
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(2);
            // Move focus left, verify that the disabled tab is 1 and should be skipped
            expect(appComponent.disabledTabIndex).toBe(1);
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
        });
        it('should support key down events to move and select focus', function () {
            appComponent.tabHeader.focusIndex = 0;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            // Move focus right to 2
            // Move focus right to 2
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(2);
            // Select the focused index 2
            expect(appComponent.selectedIndex).toBe(0);
            var enterEvent = testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.ENTER);
            fixture.detectChanges();
            expect(appComponent.selectedIndex).toBe(2);
            expect(enterEvent.defaultPrevented).toBe(true);
            // Move focus right to 0
            // Move focus right to 0
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            // Select the focused 0 using space.
            expect(appComponent.selectedIndex).toBe(2);
            var spaceEvent = testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(appComponent.selectedIndex).toBe(0);
            expect(spaceEvent.defaultPrevented).toBe(true);
        });
        it('should move focus to the first tab when pressing HOME', function () {
            appComponent.tabHeader.focusIndex = 3;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(3);
            var event = testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.HOME);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            expect(event.defaultPrevented).toBe(true);
        });
        it('should skip disabled items when moving focus using HOME', function () {
            appComponent.tabHeader.focusIndex = 3;
            appComponent.tabs[0].disabled = true;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(3);
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.HOME);
            fixture.detectChanges();
            // Note that the second tab is disabled by default already.
            expect(appComponent.tabHeader.focusIndex).toBe(2);
        });
        it('should move focus to the last tab when pressing END', function () {
            appComponent.tabHeader.focusIndex = 0;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            var event = testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.END);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(3);
            expect(event.defaultPrevented).toBe(true);
        });
        it('should skip disabled items when moving focus using END', function () {
            appComponent.tabHeader.focusIndex = 0;
            appComponent.tabs[3].disabled = true;
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(0);
            testing_1.dispatchKeyboardEvent(tabListContainer, 'keydown', keycodes_1.END);
            fixture.detectChanges();
            expect(appComponent.tabHeader.focusIndex).toBe(2);
        });
    });
    describe('pagination', function () {
        describe('ltr', function () {
            beforeEach(function () {
                dir = 'ltr';
                fixture = testing_2.TestBed.createComponent(SimpleTabHeaderApp);
                fixture.detectChanges();
                appComponent = fixture.componentInstance;
            });
            it('should show width when tab list width exceeds container', function () {
                fixture.detectChanges();
                expect(appComponent.tabHeader._showPaginationControls).toBe(false);
                // Add enough tabs that it will obviously exceed the width
                appComponent.addTabsForScrolling();
                fixture.detectChanges();
                expect(appComponent.tabHeader._showPaginationControls).toBe(true);
            });
            it('should scroll to show the focused tab label', function () {
                appComponent.addTabsForScrolling();
                fixture.detectChanges();
                expect(appComponent.tabHeader.scrollDistance).toBe(0);
                // Focus on the last tab, expect this to be the maximum scroll distance.
                appComponent.tabHeader.focusIndex = appComponent.tabs.length - 1;
                fixture.detectChanges();
                expect(appComponent.tabHeader.scrollDistance)
                    .toBe(appComponent.tabHeader._getMaxScrollDistance());
                // Focus on the first tab, expect this to be the maximum scroll distance.
                appComponent.tabHeader.focusIndex = 0;
                fixture.detectChanges();
                expect(appComponent.tabHeader.scrollDistance).toBe(0);
            });
            it('should show ripples for pagination buttons', function () {
                appComponent.addTabsForScrolling();
                fixture.detectChanges();
                expect(appComponent.tabHeader._showPaginationControls).toBe(true);
                var buttonAfter = fixture.debugElement.query(platform_browser_1.By.css('.mat-tab-header-pagination-after'));
                expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                    .toBe(0, 'Expected no ripple to show up initially.');
                testing_1.dispatchFakeEvent(buttonAfter.nativeElement, 'mousedown');
                testing_1.dispatchFakeEvent(buttonAfter.nativeElement, 'mouseup');
                expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                    .toBe(1, 'Expected one ripple to show up after mousedown');
            });
            it('should allow disabling ripples for pagination buttons', function () {
                appComponent.addTabsForScrolling();
                appComponent.disableRipple = true;
                fixture.detectChanges();
                expect(appComponent.tabHeader._showPaginationControls).toBe(true);
                var buttonAfter = fixture.debugElement.query(platform_browser_1.By.css('.mat-tab-header-pagination-after'));
                expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                    .toBe(0, 'Expected no ripple to show up initially.');
                testing_1.dispatchFakeEvent(buttonAfter.nativeElement, 'mousedown');
                testing_1.dispatchFakeEvent(buttonAfter.nativeElement, 'mouseup');
                expect(fixture.nativeElement.querySelectorAll('.mat-ripple-element').length)
                    .toBe(0, 'Expected no ripple to show up after mousedown');
            });
        });
        describe('rtl', function () {
            beforeEach(function () {
                dir = 'rtl';
                fixture = testing_2.TestBed.createComponent(SimpleTabHeaderApp);
                appComponent = fixture.componentInstance;
                appComponent.dir = 'rtl';
                fixture.detectChanges();
            });
            it('should scroll to show the focused tab label', function () {
                appComponent.addTabsForScrolling();
                fixture.detectChanges();
                expect(appComponent.tabHeader.scrollDistance).toBe(0);
                // Focus on the last tab, expect this to be the maximum scroll distance.
                appComponent.tabHeader.focusIndex = appComponent.tabs.length - 1;
                fixture.detectChanges();
                expect(appComponent.tabHeader.scrollDistance)
                    .toBe(appComponent.tabHeader._getMaxScrollDistance());
                // Focus on the first tab, expect this to be the maximum scroll distance.
                appComponent.tabHeader.focusIndex = 0;
                fixture.detectChanges();
                expect(appComponent.tabHeader.scrollDistance).toBe(0);
            });
        });
        it('should re-align the ink bar when the direction changes', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SimpleTabHeaderApp);
            var inkBar = fixture.componentInstance.tabHeader._inkBar;
            spyOn(inkBar, 'alignToElement');
            fixture.detectChanges();
            change.next();
            fixture.detectChanges();
            testing_2.tick(20); // Angular turns rAF calls into 16.6ms timeouts in tests.
            expect(inkBar.alignToElement).toHaveBeenCalled();
        }));
        it('should re-align the ink bar when the window is resized', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SimpleTabHeaderApp);
            fixture.detectChanges();
            var inkBar = fixture.componentInstance.tabHeader._inkBar;
            spyOn(inkBar, 'alignToElement');
            testing_1.dispatchFakeEvent(window, 'resize');
            testing_2.tick(150);
            fixture.detectChanges();
            expect(inkBar.alignToElement).toHaveBeenCalled();
            testing_2.discardPeriodicTasks();
        }));
        it('should update arrows when the window is resized', testing_2.fakeAsync(function () {
            fixture = testing_2.TestBed.createComponent(SimpleTabHeaderApp);
            var header = fixture.componentInstance.tabHeader;
            spyOn(header, '_checkPaginationEnabled');
            testing_1.dispatchFakeEvent(window, 'resize');
            testing_2.tick(10);
            fixture.detectChanges();
            expect(header._checkPaginationEnabled).toHaveBeenCalled();
            testing_2.discardPeriodicTasks();
        }));
    });
});
var SimpleTabHeaderApp = /** @class */ (function () {
    function SimpleTabHeaderApp() {
        this.disableRipple = false;
        this.selectedIndex = 0;
        this.disabledTabIndex = 1;
        this.tabs = [{ label: 'tab one' }, { label: 'tab one' }, { label: 'tab one' }, { label: 'tab one' }];
        this.dir = 'ltr';
        this.tabs[this.disabledTabIndex].disabled = true;
    }
    SimpleTabHeaderApp.prototype.addTabsForScrolling = function () {
        this.tabs.push({ label: 'new' }, { label: 'new' }, { label: 'new' }, { label: 'new' });
    };
    SimpleTabHeaderApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n  <div [dir]=\"dir\">\n    <mat-tab-header [selectedIndex]=\"selectedIndex\" [disableRipple]=\"disableRipple\"\n               (indexFocused)=\"focusedIndex = $event\"\n               (selectFocusedIndex)=\"selectedIndex = $event\">\n      <div matTabLabelWrapper style=\"min-width: 30px; width: 30px\"\n           *ngFor=\"let tab of tabs; let i = index\"\n           [disabled]=\"!!tab.disabled\"\n           (click)=\"selectedIndex = i\">\n         {{tab.label}}\n      </div>\n    </mat-tab-header>\n  </div>\n  ",
                    styles: ["\n    :host {\n      width: 130px;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    SimpleTabHeaderApp.ctorParameters = function () { return []; };
    SimpleTabHeaderApp.propDecorators = {
        "tabHeader": [{ type: core_1.ViewChild, args: [tab_header_1.MatTabHeader,] },],
    };
    return SimpleTabHeaderApp;
}());
//# sourceMappingURL=tab-header.spec.js.map