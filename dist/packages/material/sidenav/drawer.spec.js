"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var index_1 = require("./index");
var a11y_1 = require("@angular/cdk/a11y");
var platform_1 = require("@angular/cdk/platform");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_2 = require("@angular/cdk/testing");
var scrolling_1 = require("@angular/cdk/scrolling");
describe('MatDrawer', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatSidenavModule, a11y_1.A11yModule, platform_1.PlatformModule, animations_1.NoopAnimationsModule],
            declarations: [
                BasicTestApp,
                DrawerContainerNoDrawerTestApp,
                DrawerSetToOpenedFalse,
                DrawerSetToOpenedTrue,
                DrawerDynamicPosition,
                DrawerWithFocusableElements,
                DrawerOpenBinding,
                DrawerWithoutFocusableElements,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('methods', function () {
        it('should be able to open', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var testComponent = fixture.debugElement.componentInstance;
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            var drawerBackdropElement = fixture.debugElement.query(platform_browser_1.By.css('.mat-drawer-backdrop'));
            drawerBackdropElement.nativeElement.style.transition = 'none';
            fixture.debugElement.query(platform_browser_1.By.css('.open')).nativeElement.click();
            fixture.detectChanges();
            expect(testComponent.openCount).toBe(0);
            expect(testComponent.openStartCount).toBe(0);
            testing_1.tick();
            expect(testComponent.openStartCount).toBe(1);
            fixture.detectChanges();
            expect(testComponent.openCount).toBe(1);
            expect(testComponent.openStartCount).toBe(1);
            expect(getComputedStyle(drawer.nativeElement).visibility).toBe('visible');
            expect(getComputedStyle(drawerBackdropElement.nativeElement).visibility).toBe('visible');
        }));
        it('should be able to close', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var testComponent = fixture.debugElement.componentInstance;
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            var drawerBackdropElement = fixture.debugElement.query(platform_browser_1.By.css('.mat-drawer-backdrop'));
            drawerBackdropElement.nativeElement.style.transition = 'none';
            fixture.debugElement.query(platform_browser_1.By.css('.open')).nativeElement.click();
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            fixture.debugElement.query(platform_browser_1.By.css('.close')).nativeElement.click();
            fixture.detectChanges();
            expect(testComponent.closeCount).toBe(0);
            expect(testComponent.closeStartCount).toBe(0);
            testing_1.flush();
            expect(testComponent.closeStartCount).toBe(1);
            fixture.detectChanges();
            expect(testComponent.closeCount).toBe(1);
            expect(testComponent.closeStartCount).toBe(1);
            expect(getComputedStyle(drawer.nativeElement).visibility).toBe('hidden');
            expect(getComputedStyle(drawerBackdropElement.nativeElement).visibility).toBe('hidden');
        }));
        it('should resolve the open method promise with the new state of the drawer', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            drawer.componentInstance.open().then(function (result) { return expect(result).toBe('open'); });
            fixture.detectChanges();
            testing_1.tick();
            fixture.detectChanges();
        }));
        it('should resolve the close method promise with the new state of the drawer', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            drawer.componentInstance.open();
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            drawer.componentInstance.close().then(function (result) { return expect(result).toBe('close'); });
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
        }));
        it('should be able to close while the open animation is running', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var testComponent = fixture.debugElement.componentInstance;
            fixture.debugElement.query(platform_browser_1.By.css('.open')).nativeElement.click();
            fixture.detectChanges();
            expect(testComponent.openCount).toBe(0);
            expect(testComponent.closeCount).toBe(0);
            testing_1.tick();
            fixture.debugElement.query(platform_browser_1.By.css('.close')).nativeElement.click();
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(testComponent.openCount).toBe(1);
            expect(testComponent.closeCount).toBe(1);
        }));
        it('does not throw when created without a drawer', testing_1.fakeAsync(function () {
            expect(function () {
                var fixture = testing_1.TestBed.createComponent(BasicTestApp);
                fixture.detectChanges();
                testing_1.tick();
            }).not.toThrow();
        }));
        it('should emit the backdropClick event when the backdrop is clicked', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var testComponent = fixture.debugElement.componentInstance;
            var openButtonElement = fixture.debugElement.query(platform_browser_1.By.css('.open')).nativeElement;
            openButtonElement.click();
            fixture.detectChanges();
            testing_1.flush();
            expect(testComponent.backdropClickedCount).toBe(0);
            fixture.debugElement.query(platform_browser_1.By.css('.mat-drawer-backdrop')).nativeElement.click();
            fixture.detectChanges();
            testing_1.flush();
            expect(testComponent.backdropClickedCount).toBe(1);
            openButtonElement.click();
            fixture.detectChanges();
            testing_1.flush();
            fixture.debugElement.query(platform_browser_1.By.css('.close')).nativeElement.click();
            fixture.detectChanges();
            testing_1.flush();
            expect(testComponent.backdropClickedCount).toBe(1);
        }));
        it('should close when pressing escape', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var testComponent = fixture.debugElement.componentInstance;
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            drawer.componentInstance.open();
            fixture.detectChanges();
            testing_1.tick();
            expect(testComponent.openCount).toBe(1, 'Expected one open event.');
            expect(testComponent.openStartCount).toBe(1, 'Expected one open start event.');
            expect(testComponent.closeCount).toBe(0, 'Expected no close events.');
            expect(testComponent.closeStartCount).toBe(0, 'Expected no close start events.');
            testing_2.dispatchKeyboardEvent(drawer.nativeElement, 'keydown', keycodes_1.ESCAPE);
            fixture.detectChanges();
            testing_1.flush();
            expect(testComponent.closeCount).toBe(1, 'Expected one close event.');
            expect(testComponent.closeStartCount).toBe(1, 'Expected one close start event.');
        }));
        it('should fire the open event when open on init', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(DrawerSetToOpenedTrue);
            fixture.detectChanges();
            testing_1.tick();
            expect(fixture.componentInstance.openCallback).toHaveBeenCalledTimes(1);
        }));
        it('should not close by pressing escape when disableClose is set', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            drawer.componentInstance.disableClose = true;
            drawer.componentInstance.open();
            fixture.detectChanges();
            testing_1.tick();
            testing_2.dispatchKeyboardEvent(drawer.nativeElement, 'keydown', keycodes_1.ESCAPE);
            fixture.detectChanges();
            testing_1.tick();
            expect(testComponent.closeCount).toBe(0);
            expect(testComponent.closeStartCount).toBe(0);
        }));
        it('should not close by clicking on the backdrop when disableClose is set', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            var testComponent = fixture.debugElement.componentInstance;
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            drawer.disableClose = true;
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            fixture.debugElement.query(platform_browser_1.By.css('.mat-drawer-backdrop')).nativeElement.click();
            fixture.detectChanges();
            testing_1.tick();
            expect(testComponent.closeCount).toBe(0);
            expect(testComponent.closeStartCount).toBe(0);
        }));
        it('should restore focus on close if focus is inside drawer', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            var openButton = fixture.componentInstance.openButton.nativeElement;
            var drawerButton = fixture.componentInstance.drawerButton.nativeElement;
            openButton.focus();
            drawer.open();
            fixture.detectChanges();
            testing_1.flush();
            drawerButton.focus();
            drawer.close();
            fixture.detectChanges();
            testing_1.flush();
            expect(document.activeElement)
                .toBe(openButton, 'Expected focus to be restored to the open button on close.');
        }));
        it('should not restore focus on close if focus is outside drawer', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            var drawer = fixture.debugElement
                .query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            var openButton = fixture.componentInstance.openButton.nativeElement;
            var closeButton = fixture.componentInstance.closeButton.nativeElement;
            openButton.focus();
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            closeButton.focus();
            drawer.close();
            fixture.detectChanges();
            testing_1.tick();
            expect(document.activeElement)
                .toBe(closeButton, 'Expected focus not to be restored to the open button on close.');
        }));
    });
    describe('attributes', function () {
        it('should correctly parse opened="false"', function () {
            var fixture = testing_1.TestBed.createComponent(DrawerSetToOpenedFalse);
            fixture.detectChanges();
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            expect(drawer.opened).toBe(false);
        });
        it('should correctly parse opened="true"', function () {
            var fixture = testing_1.TestBed.createComponent(DrawerSetToOpenedTrue);
            fixture.detectChanges();
            var drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            expect(drawer.opened).toBe(true);
        });
        it('should remove align attr from DOM', function () {
            var fixture = testing_1.TestBed.createComponent(BasicTestApp);
            fixture.detectChanges();
            var drawerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-drawer')).nativeElement;
            expect(drawerEl.hasAttribute('align'))
                .toBe(false, 'Expected drawer not to have a native align attribute.');
        });
        it('should throw when multiple drawers have the same position', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(DrawerDynamicPosition);
            fixture.detectChanges();
            testing_1.tick();
            var testComponent = fixture.debugElement.componentInstance;
            testComponent.drawer1Position = 'end';
            expect(function () {
                try {
                    fixture.detectChanges();
                    testing_1.tick(0);
                }
                catch (_a) {
                    testing_1.tick(0);
                }
            }).toThrow();
        }));
        it('should not throw when drawers swap positions', function () {
            var fixture = testing_1.TestBed.createComponent(DrawerDynamicPosition);
            fixture.detectChanges();
            var testComponent = fixture.debugElement.componentInstance;
            testComponent.drawer1Position = 'end';
            testComponent.drawer2Position = 'start';
            expect(function () { return fixture.detectChanges(); }).not.toThrow();
        });
        it('should bind 2-way bind on opened property', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(DrawerOpenBinding);
            fixture.detectChanges();
            var drawer = fixture.debugElement
                .query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            expect(fixture.componentInstance.isOpen).toBe(true);
        }));
        it('should not throw when a two-way binding is toggled quickly while animating', testing_1.fakeAsync(function () {
            testing_1.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatSidenavModule, animations_1.BrowserAnimationsModule],
                declarations: [DrawerOpenBinding],
            })
                .compileComponents();
            var fixture = testing_1.TestBed.createComponent(DrawerOpenBinding);
            fixture.detectChanges();
            // Note that we need actual timeouts and the `BrowserAnimationsModule`
            // in order to test it correctly.
            setTimeout(function () {
                fixture.componentInstance.isOpen = !fixture.componentInstance.isOpen;
                expect(function () { return fixture.detectChanges(); }).not.toThrow();
                setTimeout(function () {
                    fixture.componentInstance.isOpen = !fixture.componentInstance.isOpen;
                    expect(function () { return fixture.detectChanges(); }).not.toThrow();
                }, 1);
                testing_1.tick(1);
            }, 1);
            testing_1.tick(1);
        }));
    });
    describe('focus trapping behavior', function () {
        var fixture;
        var testComponent;
        var drawer;
        var firstFocusableElement;
        var lastFocusableElement;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(DrawerWithFocusableElements);
            fixture.detectChanges();
            testComponent = fixture.debugElement.componentInstance;
            drawer = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer)).componentInstance;
            firstFocusableElement = fixture.debugElement.query(platform_browser_1.By.css('.input1')).nativeElement;
            lastFocusableElement = fixture.debugElement.query(platform_browser_1.By.css('.input2')).nativeElement;
            lastFocusableElement.focus();
        });
        it('should trap focus when opened in "over" mode', testing_1.fakeAsync(function () {
            testComponent.mode = 'over';
            fixture.detectChanges();
            lastFocusableElement.focus();
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            expect(document.activeElement).toBe(firstFocusableElement);
        }));
        it('should trap focus when opened in "push" mode', testing_1.fakeAsync(function () {
            testComponent.mode = 'push';
            fixture.detectChanges();
            lastFocusableElement.focus();
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            expect(document.activeElement).toBe(firstFocusableElement);
        }));
        it('should not trap focus when opened in "side" mode', testing_1.fakeAsync(function () {
            testComponent.mode = 'side';
            fixture.detectChanges();
            lastFocusableElement.focus();
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            expect(document.activeElement).toBe(lastFocusableElement);
        }));
        it('should focus the drawer if there are no focusable elements', testing_1.fakeAsync(function () {
            fixture.destroy();
            var nonFocusableFixture = testing_1.TestBed.createComponent(DrawerWithoutFocusableElements);
            var drawerEl = nonFocusableFixture.debugElement.query(platform_browser_1.By.directive(index_1.MatDrawer));
            nonFocusableFixture.detectChanges();
            drawerEl.componentInstance.open();
            nonFocusableFixture.detectChanges();
            testing_1.tick();
            expect(document.activeElement).toBe(drawerEl.nativeElement);
        }));
        it('should be able to disable auto focus', testing_1.fakeAsync(function () {
            testComponent.autoFocus = false;
            testComponent.mode = 'push';
            fixture.detectChanges();
            lastFocusableElement.focus();
            drawer.open();
            fixture.detectChanges();
            testing_1.tick();
            expect(document.activeElement).not.toBe(firstFocusableElement);
        }));
    });
});
describe('MatDrawerContainer', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatSidenavModule, a11y_1.A11yModule, platform_1.PlatformModule, animations_1.NoopAnimationsModule],
            declarations: [
                DrawerContainerTwoDrawerTestApp,
                DrawerDelayed,
                DrawerSetToOpenedTrue,
                DrawerContainerStateChangesTestApp,
                AutosizeDrawer,
                BasicTestApp,
                DrawerContainerWithContent,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should be able to open and close all drawers', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerContainerTwoDrawerTestApp);
        fixture.detectChanges();
        var testComponent = fixture.debugElement.componentInstance;
        var drawers = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatDrawer));
        expect(drawers.every(function (drawer) { return drawer.componentInstance.opened; })).toBe(false);
        testComponent.drawerContainer.open();
        fixture.detectChanges();
        testing_1.tick();
        expect(drawers.every(function (drawer) { return drawer.componentInstance.opened; })).toBe(true);
        testComponent.drawerContainer.close();
        fixture.detectChanges();
        testing_1.flush();
        expect(drawers.every(function (drawer) { return drawer.componentInstance.opened; })).toBe(false);
    }));
    it('should animate the content when a drawer is added at a later point', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerDelayed);
        fixture.detectChanges();
        var contentElement = fixture.debugElement.nativeElement.querySelector('.mat-drawer-content');
        expect(parseInt(contentElement.style.marginLeft)).toBeFalsy();
        fixture.componentInstance.showDrawer = true;
        fixture.detectChanges();
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        expect(parseInt(contentElement.style.marginLeft)).toBeGreaterThan(0);
    }));
    it('should recalculate the margin if a drawer is destroyed', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerContainerStateChangesTestApp);
        fixture.detectChanges();
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        var contentElement = fixture.debugElement.nativeElement.querySelector('.mat-drawer-content');
        var initialMargin = parseInt(contentElement.style.marginLeft);
        expect(initialMargin).toBeGreaterThan(0);
        fixture.componentInstance.renderDrawer = false;
        fixture.detectChanges();
        testing_1.tick();
        expect(contentElement.style.marginLeft).toBe('');
    }));
    it('should recalculate the margin if the drawer mode is changed', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerContainerStateChangesTestApp);
        fixture.detectChanges();
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        var contentElement = fixture.debugElement.nativeElement.querySelector('.mat-drawer-content');
        var initialMargin = parseInt(contentElement.style.marginLeft);
        expect(initialMargin).toBeGreaterThan(0);
        fixture.componentInstance.mode = 'over';
        fixture.detectChanges();
        expect(contentElement.style.marginLeft).toBe('');
    }));
    it('should recalculate the margin if the direction has changed', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerContainerStateChangesTestApp);
        fixture.detectChanges();
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        var contentElement = fixture.debugElement.nativeElement.querySelector('.mat-drawer-content');
        var margin = parseInt(contentElement.style.marginLeft);
        expect(margin).toBeGreaterThan(0);
        fixture.componentInstance.direction = 'rtl';
        fixture.detectChanges();
        expect(contentElement.style.marginLeft).toBe('');
        expect(parseInt(contentElement.style.marginRight)).toBe(margin);
    }));
    it('should not animate when the sidenav is open on load ', testing_1.fakeAsync(function () {
        testing_1.TestBed
            .resetTestingModule()
            .configureTestingModule({
            imports: [index_1.MatSidenavModule, animations_1.BrowserAnimationsModule],
            declarations: [DrawerSetToOpenedTrue],
        })
            .compileComponents();
        var fixture = testing_1.TestBed.createComponent(DrawerSetToOpenedTrue);
        fixture.detectChanges();
        testing_1.tick();
        var container = fixture.debugElement.nativeElement.querySelector('.mat-drawer-container');
        expect(container.classList).not.toContain('mat-drawer-transition');
    }));
    it('should recalculate the margin if a drawer changes size while open in autosize mode', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(AutosizeDrawer);
        fixture.detectChanges();
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        var contentEl = fixture.debugElement.nativeElement.querySelector('.mat-drawer-content');
        var initialMargin = parseInt(contentEl.style.marginLeft);
        expect(initialMargin).toBeGreaterThan(0);
        fixture.componentInstance.fillerWidth = 200;
        fixture.detectChanges();
        testing_1.tick(10);
        fixture.detectChanges();
        expect(parseInt(contentEl.style.marginLeft)).toBeGreaterThan(initialMargin);
        testing_1.discardPeriodicTasks();
    }));
    it('should not set a style property if it would be zero', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(AutosizeDrawer);
        fixture.detectChanges();
        var content = fixture.debugElement.nativeElement.querySelector('.mat-drawer-content');
        expect(content.style.marginLeft).toBe('', 'Margin should be omitted when drawer is closed');
        // Open the drawer and resolve the open animation.
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        expect(content.style.marginLeft).not.toBe('', 'Margin should be present when drawer is open');
        // Close the drawer and resolve the close animation.
        fixture.componentInstance.drawer.close();
        fixture.detectChanges();
        testing_1.flush();
        fixture.detectChanges();
        expect(content.style.marginLeft).toBe('', 'Margin should be removed after drawer close.');
        testing_1.discardPeriodicTasks();
    }));
    it('should be able to toggle whether the container has a backdrop', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(BasicTestApp);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.mat-drawer-backdrop')).toBeTruthy();
        fixture.componentInstance.hasBackdrop = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.mat-drawer-backdrop')).toBeFalsy();
    }));
    it('should be able to explicitly enable the backdrop in `side` mode', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(BasicTestApp);
        var root = fixture.nativeElement;
        fixture.componentInstance.drawer.mode = 'side';
        fixture.detectChanges();
        fixture.componentInstance.drawer.open();
        fixture.detectChanges();
        testing_1.tick();
        fixture.detectChanges();
        var backdrop = root.querySelector('.mat-drawer-backdrop.mat-drawer-shown');
        expect(backdrop).toBeFalsy();
        fixture.componentInstance.hasBackdrop = true;
        fixture.detectChanges();
        backdrop = root.querySelector('.mat-drawer-backdrop.mat-drawer-shown');
        expect(backdrop).toBeTruthy();
        expect(fixture.componentInstance.drawer.opened).toBe(true);
        backdrop.click();
        fixture.detectChanges();
        testing_1.tick();
        expect(fixture.componentInstance.drawer.opened).toBe(false);
    }));
    it('should expose a scrollable when the consumer has not specified drawer content', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerContainerTwoDrawerTestApp);
        fixture.detectChanges();
        expect(fixture.componentInstance.drawerContainer.scrollable instanceof scrolling_1.CdkScrollable)
            .toBe(true);
    }));
    it('should expose a scrollable when the consumer has specified drawer content', testing_1.fakeAsync(function () {
        var fixture = testing_1.TestBed.createComponent(DrawerContainerWithContent);
        fixture.detectChanges();
        expect(fixture.componentInstance.drawerContainer.scrollable instanceof scrolling_1.CdkScrollable)
            .toBe(true);
    }));
});
/** Test component that contains an MatDrawerContainer but no MatDrawer. */
var DrawerContainerNoDrawerTestApp = /** @class */ (function () {
    function DrawerContainerNoDrawerTestApp() {
    }
    DrawerContainerNoDrawerTestApp.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-drawer-container></mat-drawer-container>" },] },
    ];
    return DrawerContainerNoDrawerTestApp;
}());
/** Test component that contains an MatDrawerContainer and 2 MatDrawer in the same position. */
var DrawerContainerTwoDrawerTestApp = /** @class */ (function () {
    function DrawerContainerTwoDrawerTestApp() {
    }
    DrawerContainerTwoDrawerTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer position=\"start\"></mat-drawer>\n      <mat-drawer position=\"end\"></mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    /** @nocollapse */
    DrawerContainerTwoDrawerTestApp.propDecorators = {
        "drawerContainer": [{ type: core_1.ViewChild, args: [index_1.MatDrawerContainer,] },],
    };
    return DrawerContainerTwoDrawerTestApp;
}());
/** Test component that contains an MatDrawerContainer and one MatDrawer. */
var BasicTestApp = /** @class */ (function () {
    function BasicTestApp() {
        this.openCount = 0;
        this.openStartCount = 0;
        this.closeCount = 0;
        this.closeStartCount = 0;
        this.backdropClickedCount = 0;
        this.hasBackdrop = null;
    }
    BasicTestApp.prototype.open = function () {
        this.openCount++;
    };
    BasicTestApp.prototype.openStart = function () {
        this.openStartCount++;
    };
    BasicTestApp.prototype.close = function () {
        this.closeCount++;
    };
    BasicTestApp.prototype.closeStart = function () {
        this.closeStartCount++;
    };
    BasicTestApp.prototype.backdropClicked = function () {
        this.backdropClickedCount++;
    };
    BasicTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container (backdropClick)=\"backdropClicked()\" [hasBackdrop]=\"hasBackdrop\">\n      <mat-drawer #drawer=\"matDrawer\" position=\"start\"\n                 (opened)=\"open()\"\n                 (openedStart)=\"openStart()\"\n                 (closed)=\"close()\"\n                 (closedStart)=\"closeStart()\">\n        <button #drawerButton>Content</button>\n      </mat-drawer>\n      <button (click)=\"drawer.open()\" class=\"open\" #openButton></button>\n      <button (click)=\"drawer.close()\" class=\"close\" #closeButton></button>\n    </mat-drawer-container>",
                },] },
    ];
    /** @nocollapse */
    BasicTestApp.propDecorators = {
        "drawer": [{ type: core_1.ViewChild, args: ['drawer',] },],
        "drawerButton": [{ type: core_1.ViewChild, args: ['drawerButton',] },],
        "openButton": [{ type: core_1.ViewChild, args: ['openButton',] },],
        "closeButton": [{ type: core_1.ViewChild, args: ['closeButton',] },],
    };
    return BasicTestApp;
}());
var DrawerSetToOpenedFalse = /** @class */ (function () {
    function DrawerSetToOpenedFalse() {
    }
    DrawerSetToOpenedFalse.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer #drawer mode=\"side\" opened=\"false\">\n        Closed Drawer.\n      </mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    return DrawerSetToOpenedFalse;
}());
var DrawerSetToOpenedTrue = /** @class */ (function () {
    function DrawerSetToOpenedTrue() {
        this.openCallback = jasmine.createSpy('open callback');
    }
    DrawerSetToOpenedTrue.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer #drawer mode=\"side\" opened=\"true\" (opened)=\"openCallback()\">\n        Closed Drawer.\n      </mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    return DrawerSetToOpenedTrue;
}());
var DrawerOpenBinding = /** @class */ (function () {
    function DrawerOpenBinding() {
        this.isOpen = false;
    }
    DrawerOpenBinding.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer #drawer mode=\"side\" [(opened)]=\"isOpen\">\n        Closed Drawer.\n      </mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    return DrawerOpenBinding;
}());
var DrawerDynamicPosition = /** @class */ (function () {
    function DrawerDynamicPosition() {
        this.drawer1Position = 'start';
        this.drawer2Position = 'end';
    }
    DrawerDynamicPosition.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer #drawer1 [position]=\"drawer1Position\"></mat-drawer>\n      <mat-drawer #drawer2 [position]=\"drawer2Position\"></mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    return DrawerDynamicPosition;
}());
var DrawerWithFocusableElements = /** @class */ (function () {
    function DrawerWithFocusableElements() {
        this.mode = 'over';
        this.autoFocus = true;
    }
    DrawerWithFocusableElements.decorators = [
        { type: core_1.Component, args: [{
                    // Note: we use inputs here, because they're guaranteed
                    // to be focusable across all platforms.
                    template: "\n    <mat-drawer-container>\n      <mat-drawer position=\"start\" [mode]=\"mode\" [autoFocus]=\"autoFocus\">\n        <input type=\"text\" class=\"input1\"/>\n      </mat-drawer>\n      <input type=\"text\" class=\"input2\"/>\n    </mat-drawer-container>",
                },] },
    ];
    return DrawerWithFocusableElements;
}());
var DrawerWithoutFocusableElements = /** @class */ (function () {
    function DrawerWithoutFocusableElements() {
    }
    DrawerWithoutFocusableElements.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer position=\"start\" mode=\"over\">\n        <button disabled>Not focusable</button>\n      </mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    return DrawerWithoutFocusableElements;
}());
var DrawerDelayed = /** @class */ (function () {
    function DrawerDelayed() {
        this.showDrawer = false;
    }
    DrawerDelayed.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer *ngIf=\"showDrawer\" #drawer mode=\"side\">Drawer</mat-drawer>\n    </mat-drawer-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    DrawerDelayed.propDecorators = {
        "drawer": [{ type: core_1.ViewChild, args: [index_1.MatDrawer,] },],
    };
    return DrawerDelayed;
}());
var DrawerContainerStateChangesTestApp = /** @class */ (function () {
    function DrawerContainerStateChangesTestApp() {
        this.direction = 'ltr';
        this.mode = 'side';
        this.renderDrawer = true;
    }
    DrawerContainerStateChangesTestApp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container [dir]=\"direction\">\n      <mat-drawer *ngIf=\"renderDrawer\" [mode]=\"mode\" style=\"width:100px\"></mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    /** @nocollapse */
    DrawerContainerStateChangesTestApp.propDecorators = {
        "drawer": [{ type: core_1.ViewChild, args: [index_1.MatDrawer,] },],
        "drawerContainer": [{ type: core_1.ViewChild, args: [index_1.MatDrawerContainer,] },],
    };
    return DrawerContainerStateChangesTestApp;
}());
var AutosizeDrawer = /** @class */ (function () {
    function AutosizeDrawer() {
        this.fillerWidth = 0;
    }
    AutosizeDrawer.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container autosize>\n      <mat-drawer mode=\"push\" [position]=\"drawer1Position\">\n        Text\n        <div [style.width.px]=\"fillerWidth\"></div>\n      </mat-drawer>\n    </mat-drawer-container>",
                },] },
    ];
    /** @nocollapse */
    AutosizeDrawer.propDecorators = {
        "drawer": [{ type: core_1.ViewChild, args: [index_1.MatDrawer,] },],
    };
    return AutosizeDrawer;
}());
var DrawerContainerWithContent = /** @class */ (function () {
    function DrawerContainerWithContent() {
    }
    DrawerContainerWithContent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <mat-drawer-container>\n      <mat-drawer>Drawer</mat-drawer>\n      <mat-drawer-content>Content</mat-drawer-content>\n    </mat-drawer-container>\n  ",
                },] },
    ];
    /** @nocollapse */
    DrawerContainerWithContent.propDecorators = {
        "drawerContainer": [{ type: core_1.ViewChild, args: [index_1.MatDrawerContainer,] },],
    };
    return DrawerContainerWithContent;
}());
//# sourceMappingURL=drawer.spec.js.map