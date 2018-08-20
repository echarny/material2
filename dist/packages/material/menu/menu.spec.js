"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var keycodes_1 = require("@angular/cdk/keycodes");
var index_1 = require("./index");
var menu_trigger_1 = require("./menu-trigger");
var core_2 = require("@angular/material/core");
var testing_2 = require("@angular/cdk/testing");
var rxjs_1 = require("rxjs");
var scrolling_1 = require("@angular/cdk/scrolling");
var a11y_1 = require("@angular/cdk/a11y");
describe('MatMenu', function () {
    var overlayContainer;
    var overlayContainerElement;
    var focusMonitor;
    function createComponent(component, providers, declarations) {
        if (providers === void 0) { providers = []; }
        if (declarations === void 0) { declarations = []; }
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatMenuModule, animations_1.NoopAnimationsModule],
            declarations: [component].concat(declarations),
            providers: providers
        }).compileComponents();
        testing_1.inject([overlay_1.OverlayContainer, a11y_1.FocusMonitor], function (oc, fm) {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            focusMonitor = fm;
        })();
        return testing_1.TestBed.createComponent(component);
    }
    afterEach(testing_1.inject([overlay_1.OverlayContainer], function (currentOverlayContainer) {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));
    it('should open the menu as an idempotent operation', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toBe('');
        expect(function () {
            fixture.componentInstance.trigger.openMenu();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('Item');
            expect(overlayContainerElement.textContent).toContain('Disabled');
        }).not.toThrowError();
    });
    it('should close the menu when a click occurs outside the menu', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        backdrop.click();
        fixture.detectChanges();
        testing_1.tick(500);
        expect(overlayContainerElement.textContent).toBe('');
    }));
    it('should be able to remove the backdrop', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.menu.hasBackdrop = false;
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        testing_1.tick(500);
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
    }));
    it('should restore focus to the trigger when the menu was opened by keyboard', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        // A click without a mousedown before it is considered a keyboard open.
        triggerEl.click();
        fixture.detectChanges();
        expect(overlayContainerElement.querySelector('.mat-menu-panel')).toBeTruthy();
        fixture.componentInstance.trigger.closeMenu();
        fixture.detectChanges();
        testing_1.tick(500);
        expect(document.activeElement).toBe(triggerEl);
    }));
    it('should be able to set a custom class on the backdrop', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.componentInstance.backdropClass = 'custom-backdrop';
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        testing_1.tick(500);
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        expect(backdrop.classList).toContain('custom-backdrop');
    }));
    it('should restore focus to the root trigger when the menu was opened by mouse', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        testing_2.dispatchFakeEvent(triggerEl, 'mousedown');
        triggerEl.click();
        fixture.detectChanges();
        expect(overlayContainerElement.querySelector('.mat-menu-panel')).toBeTruthy();
        fixture.componentInstance.trigger.closeMenu();
        fixture.detectChanges();
        testing_1.tick(500);
        expect(document.activeElement).toBe(triggerEl);
    }));
    it('should scroll the panel to the top on open, when it is scrollable', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        // Add 50 items to make the menu scrollable
        fixture.componentInstance.extraItems = new Array(50).fill('Hello there');
        fixture.detectChanges();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        testing_2.dispatchFakeEvent(triggerEl, 'mousedown');
        triggerEl.click();
        fixture.detectChanges();
        // Flush due to the additional tick that is necessary for the FocusMonitor.
        // Flush due to the additional tick that is necessary for the FocusMonitor.
        testing_1.flush();
        expect(overlayContainerElement.querySelector('.mat-menu-panel').scrollTop).toBe(0);
    }));
    it('should set the proper focus origin when restoring focus after opening by keyboard', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        testing_2.patchElementFocus(triggerEl);
        focusMonitor.monitor(triggerEl, false);
        triggerEl.click(); // A click without a mousedown before it is considered a keyboard open.
        fixture.detectChanges();
        fixture.componentInstance.trigger.closeMenu();
        fixture.detectChanges();
        testing_1.tick(500);
        fixture.detectChanges();
        expect(triggerEl.classList).toContain('cdk-program-focused');
        focusMonitor.stopMonitoring(triggerEl);
    }));
    it('should set the proper focus origin when restoring focus after opening by mouse', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        testing_2.dispatchFakeEvent(triggerEl, 'mousedown');
        triggerEl.click();
        fixture.detectChanges();
        testing_2.patchElementFocus(triggerEl);
        focusMonitor.monitor(triggerEl, false);
        fixture.componentInstance.trigger.closeMenu();
        fixture.detectChanges();
        testing_1.tick(500);
        fixture.detectChanges();
        expect(triggerEl.classList).toContain('cdk-mouse-focused');
        focusMonitor.stopMonitoring(triggerEl);
    }));
    it('should close the menu when pressing ESCAPE', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        var panel = (overlayContainerElement.querySelector('.mat-menu-panel'));
        var event = testing_2.createKeyboardEvent('keydown', keycodes_1.ESCAPE);
        var stopPropagationSpy = spyOn(event, 'stopPropagation').and.callThrough();
        testing_2.dispatchEvent(panel, event);
        fixture.detectChanges();
        testing_1.tick(500);
        expect(overlayContainerElement.textContent).toBe('');
        expect(stopPropagationSpy).toHaveBeenCalled();
    }));
    it('should open a custom menu', function () {
        var fixture = createComponent(CustomMenu, [], [CustomMenuPanel]);
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toBe('');
        expect(function () {
            fixture.componentInstance.trigger.openMenu();
            fixture.componentInstance.trigger.openMenu();
            expect(overlayContainerElement.textContent).toContain('Custom Menu header');
            expect(overlayContainerElement.textContent).toContain('Custom Content');
        }).not.toThrowError();
    });
    it('should set the panel direction based on the trigger direction', function () {
        var fixture = createComponent(SimpleMenu, [{
                provide: bidi_1.Directionality, useFactory: function () { return ({ value: 'rtl' }); }
            }
        ], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        var boundingBox = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toEqual('rtl');
    });
    it('should update the panel direction if the trigger direction changes', function () {
        var dirProvider = { value: 'rtl' };
        var fixture = createComponent(SimpleMenu, [{
                provide: bidi_1.Directionality, useFactory: function () { return dirProvider; }
            }
        ], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        var boundingBox = (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toEqual('rtl');
        fixture.componentInstance.trigger.closeMenu();
        fixture.detectChanges();
        dirProvider.value = 'ltr';
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        boundingBox =
            (overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box'));
        expect(boundingBox.getAttribute('dir')).toEqual('ltr');
    });
    it('should transfer any custom classes from the host to the overlay', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        var menuEl = fixture.debugElement.query(platform_browser_1.By.css('mat-menu')).nativeElement;
        var panel = (overlayContainerElement.querySelector('.mat-menu-panel'));
        expect(menuEl.classList).not.toContain('custom-one');
        expect(menuEl.classList).not.toContain('custom-two');
        expect(panel.classList).toContain('custom-one');
        expect(panel.classList).toContain('custom-two');
    });
    it('should set the "menu" role on the overlay panel', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        var menuPanel = overlayContainerElement.querySelector('.mat-menu-panel');
        expect(menuPanel).toBeTruthy('Expected to find a menu panel.');
        var role = menuPanel ? menuPanel.getAttribute('role') : '';
        expect(role).toBe('menu', 'Expected panel to have the "menu" role.');
    });
    it('should not throw an error on destroy', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        expect(fixture.destroy.bind(fixture)).not.toThrow();
    });
    it('should be able to extract the menu item text', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        expect(fixture.componentInstance.items.first.getLabel()).toBe('Item');
    });
    it('should filter out non-text nodes when figuring out the label', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        expect(fixture.componentInstance.items.last.getLabel()).toBe('Item with an icon');
    });
    it('should set the proper focus origin when opening by mouse', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        spyOn(fixture.componentInstance.items.first, 'focus').and.callThrough();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        testing_2.dispatchFakeEvent(triggerEl, 'mousedown');
        triggerEl.click();
        fixture.detectChanges();
        testing_1.tick(500);
        expect(fixture.componentInstance.items.first.focus).toHaveBeenCalledWith('mouse');
    }));
    it('should close the menu when using the CloseScrollStrategy', testing_1.fakeAsync(function () {
        var scrolledSubject = new rxjs_1.Subject();
        var fixture = createComponent(SimpleMenu, [
            { provide: scrolling_1.ScrollDispatcher, useFactory: function () { return ({ scrolled: function () { return scrolledSubject; } }); } },
            {
                provide: menu_trigger_1.MAT_MENU_SCROLL_STRATEGY,
                deps: [overlay_1.Overlay],
                useFactory: function (overlay) { return function () { return overlay.scrollStrategies.close(); }; }
            }
        ], [FakeIcon]);
        var trigger = fixture.componentInstance.trigger;
        fixture.detectChanges();
        trigger.openMenu();
        fixture.detectChanges();
        expect(trigger.menuOpen).toBe(true);
        scrolledSubject.next();
        testing_1.tick(500);
        expect(trigger.menuOpen).toBe(false);
    }));
    it('should switch to keyboard focus when using the keyboard after opening using the mouse', testing_1.fakeAsync(function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        fixture.componentInstance.triggerEl.nativeElement.click();
        fixture.detectChanges();
        var panel = document.querySelector('.mat-menu-panel');
        var items = Array.from(panel.querySelectorAll('.mat-menu-panel [mat-menu-item]'));
        items.forEach(function (item) { return testing_2.patchElementFocus(item); });
        testing_1.tick(500);
        testing_1.tick();
        fixture.detectChanges();
        expect(items.some(function (item) { return item.classList.contains('cdk-keyboard-focused'); })).toBe(false);
        testing_2.dispatchKeyboardEvent(panel, 'keydown', keycodes_1.DOWN_ARROW);
        fixture.detectChanges();
        // Flush due to the additional tick that is necessary for the FocusMonitor.
        // Flush due to the additional tick that is necessary for the FocusMonitor.
        testing_1.flush();
        // We skip to the third item, because the second one is disabled.
        expect(items[2].classList).toContain('cdk-focused');
        expect(items[2].classList).toContain('cdk-keyboard-focused');
    }));
    it('should toggle the aria-expanded attribute on the trigger', function () {
        var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
        fixture.detectChanges();
        var triggerEl = fixture.componentInstance.triggerEl.nativeElement;
        expect(triggerEl.hasAttribute('aria-expanded')).toBe(false);
        fixture.componentInstance.trigger.openMenu();
        fixture.detectChanges();
        expect(triggerEl.getAttribute('aria-expanded')).toBe('true');
        fixture.componentInstance.trigger.closeMenu();
        fixture.detectChanges();
        expect(triggerEl.hasAttribute('aria-expanded')).toBe(false);
    });
    describe('lazy rendering', function () {
        it('should be able to render the menu content lazily', testing_1.fakeAsync(function () {
            var fixture = createComponent(SimpleLazyMenu);
            fixture.detectChanges();
            fixture.componentInstance.triggerEl.nativeElement.click();
            fixture.detectChanges();
            testing_1.tick(500);
            var panel = (overlayContainerElement.querySelector('.mat-menu-panel'));
            expect(panel).toBeTruthy('Expected panel to be defined');
            expect(panel.textContent).toContain('Another item', 'Expected panel to have correct content');
            expect(fixture.componentInstance.trigger.menuOpen).toBe(true, 'Expected menu to be open');
        }));
        it('should detach the lazy content when the menu is closed', testing_1.fakeAsync(function () {
            var fixture = createComponent(SimpleLazyMenu);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(fixture.componentInstance.items.length).toBeGreaterThan(0);
            fixture.componentInstance.trigger.closeMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            fixture.detectChanges();
            expect(fixture.componentInstance.items.length).toBe(0);
        }));
        it('should wait for the close animation to finish before considering the panel as closed', testing_1.fakeAsync(function () {
            var fixture = createComponent(SimpleLazyMenu);
            fixture.detectChanges();
            var trigger = fixture.componentInstance.trigger;
            expect(trigger.menuOpen).toBe(false, 'Expected menu to start off closed');
            trigger.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(trigger.menuOpen).toBe(true, 'Expected menu to be open');
            trigger.closeMenu();
            fixture.detectChanges();
            expect(trigger.menuOpen)
                .toBe(true, 'Expected menu to be considered open while the close animation is running');
            testing_1.tick(500);
            fixture.detectChanges();
            expect(trigger.menuOpen).toBe(false, 'Expected menu to be closed');
        }));
        it('should focus the first menu item when opening a lazy menu via keyboard', testing_1.fakeAsync(function () {
            var zone;
            var fixture = createComponent(SimpleLazyMenu, [{
                    provide: core_1.NgZone, useFactory: function () { return zone = new testing_2.MockNgZone(); }
                }]);
            fixture.detectChanges();
            // A click without a mousedown before it is considered a keyboard open.
            fixture.componentInstance.triggerEl.nativeElement.click();
            fixture.detectChanges();
            testing_1.tick(500);
            zone.simulateZoneExit();
            // Flush due to the additional tick that is necessary for the FocusMonitor.
            // Flush due to the additional tick that is necessary for the FocusMonitor.
            testing_1.flush();
            var item = (document.querySelector('.mat-menu-panel [mat-menu-item]'));
            expect(document.activeElement).toBe(item, 'Expected first item to be focused');
        }));
        it('should be able to open the same menu with a different context', testing_1.fakeAsync(function () {
            var fixture = createComponent(LazyMenuWithContext);
            fixture.detectChanges();
            fixture.componentInstance.triggerOne.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            var item = (overlayContainerElement.querySelector('.mat-menu-panel [mat-menu-item]'));
            expect(item.textContent.trim()).toBe('one');
            fixture.componentInstance.triggerOne.closeMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            fixture.componentInstance.triggerTwo.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            item = (overlayContainerElement.querySelector('.mat-menu-panel [mat-menu-item]'));
            expect(item.textContent.trim()).toBe('two');
        }));
    });
    describe('positions', function () {
        var fixture;
        var trigger;
        beforeEach(function () {
            fixture = createComponent(PositionedMenu);
            fixture.detectChanges();
            trigger = fixture.componentInstance.triggerEl.nativeElement;
            // Push trigger to the bottom edge of viewport,so it has space to open "above"
            trigger.style.position = 'fixed';
            trigger.style.top = '600px';
            // Push trigger to the right, so it has space to open "before"
            trigger.style.left = '100px';
        });
        it('should append mat-menu-before if the x position is changed', function () {
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var panel = overlayContainerElement.querySelector('.mat-menu-panel');
            expect(panel.classList).toContain('mat-menu-before');
            expect(panel.classList).not.toContain('mat-menu-after');
            fixture.componentInstance.xPosition = 'after';
            fixture.detectChanges();
            expect(panel.classList).toContain('mat-menu-after');
            expect(panel.classList).not.toContain('mat-menu-before');
        });
        it('should append mat-menu-above if the y position is changed', function () {
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var panel = overlayContainerElement.querySelector('.mat-menu-panel');
            expect(panel.classList).toContain('mat-menu-above');
            expect(panel.classList).not.toContain('mat-menu-below');
            fixture.componentInstance.yPosition = 'below';
            fixture.detectChanges();
            expect(panel.classList).toContain('mat-menu-below');
            expect(panel.classList).not.toContain('mat-menu-above');
        });
        it('should default to the "below" and "after" positions', function () {
            overlayContainer.ngOnDestroy();
            fixture.destroy();
            testing_1.TestBed.resetTestingModule();
            var newFixture = createComponent(SimpleMenu, [], [FakeIcon]);
            newFixture.detectChanges();
            newFixture.componentInstance.trigger.openMenu();
            newFixture.detectChanges();
            var panel = overlayContainerElement.querySelector('.mat-menu-panel');
            expect(panel.classList).toContain('mat-menu-below');
            expect(panel.classList).toContain('mat-menu-after');
        });
        it('should be able to update the position after the first open', function () {
            trigger.style.position = 'fixed';
            trigger.style.top = '200px';
            fixture.componentInstance.yPosition = 'above';
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var panel = overlayContainerElement.querySelector('.mat-menu-panel');
            expect(Math.floor(panel.getBoundingClientRect().bottom))
                .toBe(Math.floor(trigger.getBoundingClientRect().bottom), 'Expected menu to open above');
            fixture.componentInstance.trigger.closeMenu();
            fixture.detectChanges();
            fixture.componentInstance.yPosition = 'below';
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            panel = overlayContainerElement.querySelector('.mat-menu-panel');
            expect(Math.floor(panel.getBoundingClientRect().top))
                .toBe(Math.floor(trigger.getBoundingClientRect().top), 'Expected menu to open below');
        });
    });
    describe('fallback positions', function () {
        it('should fall back to "before" mode if "after" mode would not fit on screen', function () {
            var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            var trigger = fixture.componentInstance.triggerEl.nativeElement;
            // Push trigger to the right side of viewport, so it doesn't have space to open
            // in its default "after" position on the right side.
            trigger.style.position = 'fixed';
            trigger.style.right = '0';
            trigger.style.top = '200px';
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var overlayPane = getOverlayPane();
            var triggerRect = trigger.getBoundingClientRect();
            var overlayRect = overlayPane.getBoundingClientRect();
            // In "before" position, the right sides of the overlay and the origin are aligned.
            // To find the overlay left, subtract the menu width from the origin's right side.
            var expectedLeft = triggerRect.right - overlayRect.width;
            expect(Math.floor(overlayRect.left))
                .toBe(Math.floor(expectedLeft), "Expected menu to open in \"before\" position if \"after\" position wouldn't fit.");
            // The y-position of the overlay should be unaffected, as it can already fit vertically
            expect(Math.floor(overlayRect.top))
                .toBe(Math.floor(triggerRect.top), "Expected menu top position to be unchanged if it can fit in the viewport.");
        });
        it('should fall back to "above" mode if "below" mode would not fit on screen', function () {
            var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            var trigger = fixture.componentInstance.triggerEl.nativeElement;
            // Push trigger to the bottom part of viewport, so it doesn't have space to open
            // in its default "below" position below the trigger.
            trigger.style.position = 'fixed';
            trigger.style.bottom = '65px';
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var overlayPane = getOverlayPane();
            var triggerRect = trigger.getBoundingClientRect();
            var overlayRect = overlayPane.getBoundingClientRect();
            // In "above" position, the bottom edges of the overlay and the origin are aligned.
            // To find the overlay top, subtract the menu height from the origin's bottom edge.
            var expectedTop = triggerRect.bottom - overlayRect.height;
            expect(Math.floor(overlayRect.top))
                .toBe(Math.floor(expectedTop), "Expected menu to open in \"above\" position if \"below\" position wouldn't fit.");
            // The x-position of the overlay should be unaffected, as it can already fit horizontally
            expect(Math.floor(overlayRect.left))
                .toBe(Math.floor(triggerRect.left), "Expected menu x position to be unchanged if it can fit in the viewport.");
        });
        it('should re-position menu on both axes if both defaults would not fit', function () {
            var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            var trigger = fixture.componentInstance.triggerEl.nativeElement;
            // push trigger to the bottom, right part of viewport, so it doesn't have space to open
            // in its default "after below" position.
            trigger.style.position = 'fixed';
            trigger.style.right = '0';
            trigger.style.bottom = '0';
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var overlayPane = getOverlayPane();
            var triggerRect = trigger.getBoundingClientRect();
            var overlayRect = overlayPane.getBoundingClientRect();
            var expectedLeft = triggerRect.right - overlayRect.width;
            var expectedTop = triggerRect.bottom - overlayRect.height;
            expect(Math.floor(overlayRect.left))
                .toBe(Math.floor(expectedLeft), "Expected menu to open in \"before\" position if \"after\" position wouldn't fit.");
            expect(Math.floor(overlayRect.top))
                .toBe(Math.floor(expectedTop), "Expected menu to open in \"above\" position if \"below\" position wouldn't fit.");
        });
        it('should re-position a menu with custom position set', function () {
            var fixture = createComponent(PositionedMenu);
            fixture.detectChanges();
            var trigger = fixture.componentInstance.triggerEl.nativeElement;
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var overlayPane = getOverlayPane();
            var triggerRect = trigger.getBoundingClientRect();
            var overlayRect = overlayPane.getBoundingClientRect();
            // As designated "before" position won't fit on screen, the menu should fall back
            // to "after" mode, where the left sides of the overlay and trigger are aligned.
            expect(Math.floor(overlayRect.left))
                .toBe(Math.floor(triggerRect.left), "Expected menu to open in \"after\" position if \"before\" position wouldn't fit.");
            // As designated "above" position won't fit on screen, the menu should fall back
            // to "below" mode, where the top edges of the overlay and trigger are aligned.
            expect(Math.floor(overlayRect.top))
                .toBe(Math.floor(triggerRect.top), "Expected menu to open in \"below\" position if \"above\" position wouldn't fit.");
        });
        function getOverlayPane() {
            return overlayContainerElement.querySelector('.cdk-overlay-pane');
        }
    });
    describe('overlapping trigger', function () {
        /**
             * This test class is used to create components containing a menu.
             * It provides helpers to reposition the trigger, open the menu,
             * and access the trigger and overlay positions.
             * Additionally it can take any inputs for the menu wrapper component.
             *
             * Basic usage:
             * const subject = new OverlapSubject(MyComponent);
             * subject.openMenu();
             */
        var /**
             * This test class is used to create components containing a menu.
             * It provides helpers to reposition the trigger, open the menu,
             * and access the trigger and overlay positions.
             * Additionally it can take any inputs for the menu wrapper component.
             *
             * Basic usage:
             * const subject = new OverlapSubject(MyComponent);
             * subject.openMenu();
             */
        OverlapSubject = /** @class */ (function () {
            function OverlapSubject(ctor, inputs) {
                if (inputs === void 0) { inputs = {}; }
                var _this = this;
                this.fixture = createComponent(ctor);
                Object.keys(inputs).forEach(function (key) { return _this.fixture.componentInstance[key] = inputs[key]; });
                this.fixture.detectChanges();
                this.trigger = this.fixture.componentInstance.triggerEl.nativeElement;
            }
            OverlapSubject.prototype.openMenu = function () {
                this.fixture.componentInstance.trigger.openMenu();
                this.fixture.detectChanges();
            };
            Object.defineProperty(OverlapSubject.prototype, "overlayRect", {
                get: function () {
                    return this.overlayPane.getBoundingClientRect();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OverlapSubject.prototype, "triggerRect", {
                get: function () {
                    return this.trigger.getBoundingClientRect();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OverlapSubject.prototype, "menuPanel", {
                get: function () {
                    return overlayContainerElement.querySelector('.mat-menu-panel');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OverlapSubject.prototype, "overlayPane", {
                get: function () {
                    return overlayContainerElement.querySelector('.cdk-overlay-pane');
                },
                enumerable: true,
                configurable: true
            });
            return OverlapSubject;
        }());
        var subject;
        describe('explicitly overlapping', function () {
            beforeEach(function () {
                subject = new OverlapSubject(OverlapMenu, { overlapTrigger: true });
            });
            it('positions the overlay below the trigger', function () {
                subject.openMenu();
                // Since the menu is overlaying the trigger, the overlay top should be the trigger top.
                expect(Math.floor(subject.overlayRect.top))
                    .toBe(Math.floor(subject.triggerRect.top), "Expected menu to open in default \"below\" position.");
            });
        });
        describe('not overlapping', function () {
            beforeEach(function () {
                subject = new OverlapSubject(OverlapMenu, { overlapTrigger: false });
            });
            it('positions the overlay below the trigger', function () {
                subject.openMenu();
                // Since the menu is below the trigger, the overlay top should be the trigger bottom.
                expect(Math.floor(subject.overlayRect.top))
                    .toBe(Math.floor(subject.triggerRect.bottom), "Expected menu to open directly below the trigger.");
            });
            it('supports above position fall back', function () {
                // Push trigger to the bottom part of viewport, so it doesn't have space to open
                // in its default "below" position below the trigger.
                subject.trigger.style.position = 'fixed';
                subject.trigger.style.bottom = '0';
                subject.openMenu();
                // Since the menu is above the trigger, the overlay bottom should be the trigger top.
                expect(Math.floor(subject.overlayRect.bottom))
                    .toBe(Math.floor(subject.triggerRect.top), "Expected menu to open in \"above\" position if \"below\" position wouldn't fit.");
            });
            it('repositions the origin to be below, so the menu opens from the trigger', function () {
                subject.openMenu();
                subject.fixture.detectChanges();
                expect(subject.menuPanel.classList).toContain('mat-menu-below');
                expect(subject.menuPanel.classList).not.toContain('mat-menu-above');
            });
        });
    });
    describe('animations', function () {
        it('should enable ripples on items by default', function () {
            var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var item = fixture.debugElement.query(platform_browser_1.By.css('.mat-menu-item'));
            var ripple = item.query(platform_browser_1.By.css('.mat-ripple')).injector.get(core_2.MatRipple);
            expect(ripple.disabled).toBe(false);
        });
        it('should disable ripples on disabled items', function () {
            var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            var items = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-menu-item'));
            var ripple = items[1].query(platform_browser_1.By.css('.mat-ripple')).injector.get(core_2.MatRipple);
            expect(ripple.disabled).toBe(true);
        });
        it('should disable ripples if disableRipple is set', function () {
            var fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
            // The third menu item in the `SimpleMenu` component has ripples disabled.
            var items = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-menu-item'));
            var ripple = items[2].query(platform_browser_1.By.css('.mat-ripple')).injector.get(core_2.MatRipple);
            expect(ripple.disabled).toBe(true);
        });
    });
    describe('close event', function () {
        var fixture;
        beforeEach(function () {
            fixture = createComponent(SimpleMenu, [], [FakeIcon]);
            fixture.detectChanges();
            fixture.componentInstance.trigger.openMenu();
            fixture.detectChanges();
        });
        it('should emit an event when a menu item is clicked', function () {
            var menuItem = overlayContainerElement.querySelector('[mat-menu-item]');
            menuItem.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledWith('click');
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledTimes(1);
        });
        it('should emit a close event when the backdrop is clicked', function () {
            var backdrop = overlayContainerElement
                .querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            fixture.detectChanges();
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledWith(undefined);
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledTimes(1);
        });
        it('should emit an event when pressing ESCAPE', function () {
            var menu = overlayContainerElement.querySelector('.mat-menu-panel');
            testing_2.dispatchKeyboardEvent(menu, 'keydown', keycodes_1.ESCAPE);
            fixture.detectChanges();
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledWith('keydown');
            expect(fixture.componentInstance.closeCallback).toHaveBeenCalledTimes(1);
        });
        it('should complete the callback when the menu is destroyed', function () {
            var emitCallback = jasmine.createSpy('emit callback');
            var completeCallback = jasmine.createSpy('complete callback');
            fixture.componentInstance.menu.closed.subscribe(emitCallback, null, completeCallback);
            fixture.destroy();
            expect(emitCallback).toHaveBeenCalledWith(undefined);
            expect(emitCallback).toHaveBeenCalledTimes(1);
            expect(completeCallback).toHaveBeenCalled();
        });
    });
    describe('nested menu', function () {
        var fixture;
        var instance;
        var overlay;
        var compileTestComponent = function (direction) {
            if (direction === void 0) { direction = 'ltr'; }
            fixture = createComponent(NestedMenu, [{
                    provide: bidi_1.Directionality, useFactory: function () { return ({ value: direction }); }
                }]);
            fixture.detectChanges();
            instance = fixture.componentInstance;
            overlay = overlayContainerElement;
        };
        it('should set the `triggersSubmenu` flags on the triggers', function () {
            compileTestComponent();
            expect(instance.rootTrigger.triggersSubmenu()).toBe(false);
            expect(instance.levelOneTrigger.triggersSubmenu()).toBe(true);
            expect(instance.levelTwoTrigger.triggersSubmenu()).toBe(true);
        });
        it('should set the `parentMenu` on the sub-menu instances', function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            expect(instance.rootMenu.parentMenu).toBeFalsy();
            expect(instance.levelOneMenu.parentMenu).toBe(instance.rootMenu);
            expect(instance.levelTwoMenu.parentMenu).toBe(instance.levelOneMenu);
        });
        it('should pass the layout direction the nested menus', function () {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            expect(instance.rootMenu.direction).toBe('rtl');
            expect(instance.levelOneMenu.direction).toBe('rtl');
            expect(instance.levelTwoMenu.direction).toBe('rtl');
        });
        it('should emit an event when the hover state of the menu items changes', function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            var spy = jasmine.createSpy('hover spy');
            var subscription = instance.rootMenu._hovered().subscribe(spy);
            var menuItems = overlay.querySelectorAll('[mat-menu-item]');
            testing_2.dispatchMouseEvent(menuItems[0], 'mouseenter');
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(1);
            testing_2.dispatchMouseEvent(menuItems[1], 'mouseenter');
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(2);
            subscription.unsubscribe();
        });
        it('should toggle a nested menu when its trigger is hovered', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            var items = Array.from(overlay.querySelectorAll('.mat-menu-panel [mat-menu-item]'));
            var levelOneTrigger = (overlay.querySelector('#level-one-trigger'));
            testing_2.dispatchMouseEvent(levelOneTrigger, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick();
            fixture.detectChanges();
            expect(levelOneTrigger.classList)
                .toContain('mat-menu-item-highlighted', 'Expected the trigger to be highlighted');
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
            testing_2.dispatchMouseEvent(items[items.indexOf(levelOneTrigger) + 1], 'mouseenter');
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            expect(levelOneTrigger.classList)
                .not.toContain('mat-menu-item-highlighted', 'Expected the trigger to not be highlighted');
        }));
        it('should close all the open sub-menus when the hover state is changed at the root', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            var items = Array.from(overlay.querySelectorAll('.mat-menu-panel [mat-menu-item]'));
            var levelOneTrigger = (overlay.querySelector('#level-one-trigger'));
            testing_2.dispatchMouseEvent(levelOneTrigger, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick();
            var levelTwoTrigger = overlay.querySelector('#level-two-trigger');
            testing_2.dispatchMouseEvent(levelTwoTrigger, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick();
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(3, 'Expected three open menus');
            testing_2.dispatchMouseEvent(items[items.indexOf(levelOneTrigger) + 1], 'mouseenter');
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one open menu');
        }));
        it('should close submenu when hovering over disabled sibling item', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            testing_1.tick(500);
            var items = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatMenuItem));
            testing_2.dispatchFakeEvent(items[0].nativeElement, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(2, 'Expected two open menus');
            items[1].componentInstance.disabled = true;
            fixture.detectChanges();
            // Invoke the handler directly since the fake events are flaky on disabled elements.
            items[1].componentInstance._handleMouseEnter();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one open menu');
        }));
        it('should not open submenu when hovering over disabled trigger', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one open menu');
            var item = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatMenuItem));
            item.componentInstance.disabled = true;
            fixture.detectChanges();
            // Invoke the handler directly since the fake events are flaky on disabled elements.
            item.componentInstance._handleMouseEnter();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected to remain at one open menu');
        }));
        it('should open a nested menu when its trigger is clicked', function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            var levelOneTrigger = overlay.querySelector('#level-one-trigger');
            levelOneTrigger.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
            levelOneTrigger.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(2, 'Expected repeat clicks not to close the menu.');
        });
        it('should open and close a nested menu with arrow keys in ltr', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            var levelOneTrigger = overlay.querySelector('#level-one-trigger');
            testing_2.dispatchKeyboardEvent(levelOneTrigger, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            var panels = overlay.querySelectorAll('.mat-menu-panel');
            expect(panels.length).toBe(2, 'Expected two open menus');
            testing_2.dispatchKeyboardEvent(panels[1], 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1);
        }));
        it('should open and close a nested menu with the arrow keys in rtl', testing_1.fakeAsync(function () {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            var levelOneTrigger = overlay.querySelector('#level-one-trigger');
            testing_2.dispatchKeyboardEvent(levelOneTrigger, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            var panels = overlay.querySelectorAll('.mat-menu-panel');
            expect(panels.length).toBe(2, 'Expected two open menus');
            testing_2.dispatchKeyboardEvent(panels[1], 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1);
        }));
        it('should not do anything with the arrow keys for a top-level menu', function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            var menu = (overlay.querySelector('.mat-menu-panel'));
            testing_2.dispatchKeyboardEvent(menu, 'keydown', keycodes_1.RIGHT_ARROW);
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one menu to remain open');
            testing_2.dispatchKeyboardEvent(menu, 'keydown', keycodes_1.LEFT_ARROW);
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one menu to remain open');
        });
        it('should close all of the menus when the backdrop is clicked', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(3, 'Expected three open menus');
            expect(overlay.querySelectorAll('.cdk-overlay-backdrop').length)
                .toBe(1, 'Expected one backdrop element');
            expect(overlay.querySelectorAll('.mat-menu-panel, .cdk-overlay-backdrop')[0].classList)
                .toContain('cdk-overlay-backdrop', 'Expected backdrop to be beneath all of the menus');
            overlay.querySelector('.cdk-overlay-backdrop').click();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(0, 'Expected no open menus');
        }));
        it('should shift focus between the sub-menus', function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            expect(overlay.querySelector('.mat-menu-panel').contains(document.activeElement))
                .toBe(true, 'Expected focus to be inside the root menu');
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel')[1].contains(document.activeElement))
                .toBe(true, 'Expected focus to be inside the first nested menu');
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel')[2].contains(document.activeElement))
                .toBe(true, 'Expected focus to be inside the second nested menu');
            instance.levelTwoTrigger.closeMenu();
            fixture.detectChanges();
            expect(overlay.querySelectorAll('.mat-menu-panel')[1].contains(document.activeElement))
                .toBe(true, 'Expected focus to be back inside the first nested menu');
            instance.levelOneTrigger.closeMenu();
            fixture.detectChanges();
            expect(overlay.querySelector('.mat-menu-panel').contains(document.activeElement))
                .toBe(true, 'Expected focus to be back inside the root menu');
        });
        it('should position the sub-menu to the right edge of the trigger in ltr', function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.left = '50px';
            instance.rootTriggerEl.nativeElement.style.top = '50px';
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            var triggerRect = overlay.querySelector('#level-one-trigger').getBoundingClientRect();
            var panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();
            expect(Math.round(triggerRect.right)).toBe(Math.round(panelRect.left));
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + menu_trigger_1.MENU_PANEL_TOP_PADDING);
        });
        it('should fall back to aligning to the left edge of the trigger in ltr', function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.right = '10px';
            instance.rootTriggerEl.nativeElement.style.top = '50%';
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            var triggerRect = overlay.querySelector('#level-one-trigger').getBoundingClientRect();
            var panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();
            expect(Math.round(triggerRect.left)).toBe(Math.round(panelRect.right));
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + menu_trigger_1.MENU_PANEL_TOP_PADDING);
        });
        it('should position the sub-menu to the left edge of the trigger in rtl', function () {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.left = '50%';
            instance.rootTriggerEl.nativeElement.style.top = '50%';
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            var triggerRect = overlay.querySelector('#level-one-trigger').getBoundingClientRect();
            var panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();
            expect(Math.round(triggerRect.left)).toBe(Math.round(panelRect.right));
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + menu_trigger_1.MENU_PANEL_TOP_PADDING);
        });
        it('should fall back to aligning to the right edge of the trigger in rtl', testing_1.fakeAsync(function () {
            compileTestComponent('rtl');
            instance.rootTriggerEl.nativeElement.style.position = 'fixed';
            instance.rootTriggerEl.nativeElement.style.left = '10px';
            instance.rootTriggerEl.nativeElement.style.top = '50%';
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            var triggerRect = overlay.querySelector('#level-one-trigger').getBoundingClientRect();
            var panelRect = overlay.querySelectorAll('.cdk-overlay-pane')[1].getBoundingClientRect();
            expect(Math.round(triggerRect.right)).toBe(Math.round(panelRect.left));
            expect(Math.round(triggerRect.top)).toBe(Math.round(panelRect.top) + menu_trigger_1.MENU_PANEL_TOP_PADDING);
        }));
        it('should close all of the menus when an item is clicked', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            var menus = overlay.querySelectorAll('.mat-menu-panel');
            expect(menus.length).toBe(3, 'Expected three open menus');
            menus[2].querySelector('.mat-menu-item').click();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(0, 'Expected no open menus');
        }));
        it('should close all of the menus when the user tabs away', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            var menus = overlay.querySelectorAll('.mat-menu-panel');
            expect(menus.length).toBe(3, 'Expected three open menus');
            testing_2.dispatchKeyboardEvent(menus[menus.length - 1], 'keydown', keycodes_1.TAB);
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(0, 'Expected no open menus');
        }));
        it('should set a class on the menu items that trigger a sub-menu', function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            var menuItems = overlay.querySelectorAll('[mat-menu-item]');
            expect(menuItems[0].classList).toContain('mat-menu-item-submenu-trigger');
            expect(menuItems[1].classList).not.toContain('mat-menu-item-submenu-trigger');
        });
        it('should increase the sub-menu elevation based on its depth', function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            var menus = overlay.querySelectorAll('.mat-menu-panel');
            expect(menus[0].classList)
                .toContain('mat-elevation-z2', 'Expected root menu to have base elevation.');
            expect(menus[1].classList)
                .toContain('mat-elevation-z3', 'Expected first sub-menu to have base elevation + 1.');
            expect(menus[2].classList)
                .toContain('mat-elevation-z4', 'Expected second sub-menu to have base elevation + 2.');
        });
        it('should update the elevation when the same menu is opened at a different depth', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            var lastMenu = overlay.querySelectorAll('.mat-menu-panel')[2];
            expect(lastMenu.classList)
                .toContain('mat-elevation-z4', 'Expected menu to have the base elevation plus two.');
            overlay.querySelector('.cdk-overlay-backdrop').click();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(0, 'Expected no open menus');
            instance.alternateTrigger.openMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            lastMenu = overlay.querySelector('.mat-menu-panel');
            expect(lastMenu.classList)
                .not.toContain('mat-elevation-z4', 'Expected menu not to maintain old elevation.');
            expect(lastMenu.classList)
                .toContain('mat-elevation-z2', 'Expected menu to have the proper updated elevation.');
        }));
        it('should not increase the elevation if the user specified a custom one', function () {
            var elevationFixture = createComponent(NestedMenuCustomElevation);
            elevationFixture.detectChanges();
            elevationFixture.componentInstance.rootTrigger.openMenu();
            elevationFixture.detectChanges();
            elevationFixture.componentInstance.levelOneTrigger.openMenu();
            elevationFixture.detectChanges();
            var menuClasses = overlayContainerElement.querySelectorAll('.mat-menu-panel')[1].classList;
            expect(menuClasses)
                .toContain('mat-elevation-z24', 'Expected user elevation to be maintained');
            expect(menuClasses)
                .not.toContain('mat-elevation-z3', 'Expected no stacked elevation.');
        });
        it('should close all of the menus when the root is closed programmatically', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            instance.levelOneTrigger.openMenu();
            fixture.detectChanges();
            instance.levelTwoTrigger.openMenu();
            fixture.detectChanges();
            var menus = overlay.querySelectorAll('.mat-menu-panel');
            expect(menus.length).toBe(3, 'Expected three open menus');
            instance.rootTrigger.closeMenu();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(0, 'Expected no open menus');
        }));
        it('should toggle a nested menu when its trigger is added after init', testing_1.fakeAsync(function () {
            compileTestComponent();
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            instance.showLazy = true;
            fixture.detectChanges();
            var lazyTrigger = (overlay.querySelector('#lazy-trigger'));
            testing_2.dispatchMouseEvent(lazyTrigger, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick(500);
            fixture.detectChanges();
            expect(lazyTrigger.classList)
                .toContain('mat-menu-item-highlighted', 'Expected the trigger to be highlighted');
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
        }));
        it('should prevent the default mousedown action if the menu item opens a sub-menu', function () {
            compileTestComponent();
            instance.rootTrigger.openMenu();
            fixture.detectChanges();
            var event = testing_2.createMouseEvent('mousedown');
            Object.defineProperty(event, 'buttons', { get: function () { return 1; } });
            event.preventDefault = jasmine.createSpy('preventDefault spy');
            testing_2.dispatchMouseEvent((overlay.querySelector('[mat-menu-item]')), 'mousedown', 0, 0, event);
            expect(event.preventDefault).toHaveBeenCalled();
        });
        it('should handle the items being rendered in a repeater', testing_1.fakeAsync(function () {
            var repeaterFixture = createComponent(NestedMenuRepeater);
            overlay = overlayContainerElement;
            expect(function () { return repeaterFixture.detectChanges(); }).not.toThrow();
            repeaterFixture.componentInstance.rootTriggerEl.nativeElement.click();
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            testing_2.dispatchMouseEvent((overlay.querySelector('.level-one-trigger')), 'mouseenter');
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
        }));
        it('should be able to trigger the same nested menu from different triggers', testing_1.fakeAsync(function () {
            var repeaterFixture = createComponent(NestedMenuRepeater);
            overlay = overlayContainerElement;
            repeaterFixture.detectChanges();
            repeaterFixture.componentInstance.rootTriggerEl.nativeElement.click();
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            var triggers = overlay.querySelectorAll('.level-one-trigger');
            testing_2.dispatchMouseEvent(triggers[0], 'mouseenter');
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
            testing_2.dispatchMouseEvent(triggers[1], 'mouseenter');
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
        }));
        it('should close the initial menu if the user moves away while animating', testing_1.fakeAsync(function () {
            var repeaterFixture = createComponent(NestedMenuRepeater);
            overlay = overlayContainerElement;
            repeaterFixture.detectChanges();
            repeaterFixture.componentInstance.rootTriggerEl.nativeElement.click();
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(1, 'Expected one open menu');
            var triggers = overlay.querySelectorAll('.level-one-trigger');
            testing_2.dispatchMouseEvent(triggers[0], 'mouseenter');
            repeaterFixture.detectChanges();
            testing_1.tick(100);
            testing_2.dispatchMouseEvent(triggers[1], 'mouseenter');
            repeaterFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
        }));
        it('should be able to open a submenu through an item that is not a direct descendant ' +
            'of the panel', testing_1.fakeAsync(function () {
            var nestedFixture = createComponent(SubmenuDeclaredInsideParentMenu);
            overlay = overlayContainerElement;
            nestedFixture.detectChanges();
            nestedFixture.componentInstance.rootTriggerEl.nativeElement.click();
            nestedFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one open menu');
            testing_2.dispatchMouseEvent((overlay.querySelector('.level-one-trigger')), 'mouseenter');
            nestedFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(2, 'Expected two open menus');
        }));
        it('should not close when hovering over a menu item inside a sub-menu panel that is declared' +
            'inside the root menu', testing_1.fakeAsync(function () {
            var nestedFixture = createComponent(SubmenuDeclaredInsideParentMenu);
            overlay = overlayContainerElement;
            nestedFixture.detectChanges();
            nestedFixture.componentInstance.rootTriggerEl.nativeElement.click();
            nestedFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(1, 'Expected one open menu');
            testing_2.dispatchMouseEvent((overlay.querySelector('.level-one-trigger')), 'mouseenter');
            nestedFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(2, 'Expected two open menus');
            testing_2.dispatchMouseEvent((overlay.querySelector('.level-two-item')), 'mouseenter');
            nestedFixture.detectChanges();
            testing_1.tick(500);
            expect(overlay.querySelectorAll('.mat-menu-panel').length)
                .toBe(2, 'Expected two open menus to remain');
        }));
        it('should not re-focus a child menu trigger when hovering another trigger', testing_1.fakeAsync(function () {
            compileTestComponent();
            testing_2.dispatchFakeEvent(instance.rootTriggerEl.nativeElement, 'mousedown');
            instance.rootTriggerEl.nativeElement.click();
            fixture.detectChanges();
            var items = Array.from(overlay.querySelectorAll('.mat-menu-panel [mat-menu-item]'));
            var levelOneTrigger = (overlay.querySelector('#level-one-trigger'));
            testing_2.dispatchMouseEvent(levelOneTrigger, 'mouseenter');
            fixture.detectChanges();
            testing_1.tick();
            expect(overlay.querySelectorAll('.mat-menu-panel').length).toBe(2, 'Expected two open menus');
            testing_2.dispatchMouseEvent(items[items.indexOf(levelOneTrigger) + 1], 'mouseenter');
            fixture.detectChanges();
            testing_1.tick(500);
            expect(document.activeElement)
                .not.toBe(levelOneTrigger, 'Expected focus not to be returned to the initial trigger.');
        }));
    });
});
describe('MatMenu default overrides', function () {
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatMenuModule, animations_1.NoopAnimationsModule],
            declarations: [SimpleMenu, FakeIcon],
            providers: [{
                    provide: index_1.MAT_MENU_DEFAULT_OPTIONS,
                    useValue: { overlapTrigger: false, xPosition: 'before', yPosition: 'above' },
                }],
        }).compileComponents();
    }));
    it('should allow for the default menu options to be overridden', function () {
        var fixture = testing_1.TestBed.createComponent(SimpleMenu);
        fixture.detectChanges();
        var menu = fixture.componentInstance.menu;
        expect(menu.overlapTrigger).toBe(false);
        expect(menu.xPosition).toBe('before');
        expect(menu.yPosition).toBe('above');
    });
});
var SimpleMenu = /** @class */ (function () {
    function SimpleMenu() {
        this.extraItems = [];
        this.closeCallback = jasmine.createSpy('menu closed callback');
    }
    SimpleMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"menu\" #triggerEl>Toggle menu</button>\n    <mat-menu\n      #menu=\"matMenu\"\n      class=\"custom-one custom-two\"\n      (closed)=\"closeCallback($event)\"\n      [backdropClass]=\"backdropClass\">\n\n      <button mat-menu-item> Item </button>\n      <button mat-menu-item disabled> Disabled </button>\n      <button mat-menu-item disableRipple>\n        <fake-icon>unicorn</fake-icon>\n        Item with an icon\n      </button>\n      <button *ngFor=\"let item of extraItems\" mat-menu-item> {{item}} </button>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleMenu.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_1.MatMenuTrigger,] },],
        "triggerEl": [{ type: core_1.ViewChild, args: ['triggerEl',] },],
        "menu": [{ type: core_1.ViewChild, args: [index_1.MatMenu,] },],
        "items": [{ type: core_1.ViewChildren, args: [index_1.MatMenuItem,] },],
    };
    return SimpleMenu;
}());
var PositionedMenu = /** @class */ (function () {
    function PositionedMenu() {
        this.xPosition = 'before';
        this.yPosition = 'above';
    }
    PositionedMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"menu\" #triggerEl>Toggle menu</button>\n    <mat-menu [xPosition]=\"xPosition\" [yPosition]=\"yPosition\" #menu=\"matMenu\">\n      <button mat-menu-item> Positioned Content </button>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    PositionedMenu.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_1.MatMenuTrigger,] },],
        "triggerEl": [{ type: core_1.ViewChild, args: ['triggerEl',] },],
    };
    return PositionedMenu;
}());
var OverlapMenu = /** @class */ (function () {
    function OverlapMenu() {
    }
    OverlapMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"menu\" #triggerEl>Toggle menu</button>\n    <mat-menu [overlapTrigger]=\"overlapTrigger\" #menu=\"matMenu\">\n      <button mat-menu-item> Not overlapped Content </button>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    OverlapMenu.propDecorators = {
        "overlapTrigger": [{ type: core_1.Input },],
        "trigger": [{ type: core_1.ViewChild, args: [index_1.MatMenuTrigger,] },],
        "triggerEl": [{ type: core_1.ViewChild, args: ['triggerEl',] },],
    };
    return OverlapMenu;
}());
var CustomMenuPanel = /** @class */ (function () {
    function CustomMenuPanel() {
        this.xPosition = 'after';
        this.yPosition = 'below';
        this.overlapTrigger = true;
        this.close = new core_1.EventEmitter();
        this.focusFirstItem = function () { };
        this.resetActiveItem = function () { };
        this.setPositionClasses = function () { };
    }
    CustomMenuPanel.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'custom-menu',
                    template: "\n    <ng-template>\n      Custom Menu header\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                    exportAs: 'matCustomMenu'
                },] },
    ];
    /** @nocollapse */
    CustomMenuPanel.propDecorators = {
        "templateRef": [{ type: core_1.ViewChild, args: [core_1.TemplateRef,] },],
        "close": [{ type: core_1.Output },],
    };
    return CustomMenuPanel;
}());
var CustomMenu = /** @class */ (function () {
    function CustomMenu() {
    }
    CustomMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"menu\">Toggle menu</button>\n    <custom-menu #menu=\"matCustomMenu\">\n      <button mat-menu-item> Custom Content </button>\n    </custom-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    CustomMenu.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_1.MatMenuTrigger,] },],
    };
    return CustomMenu;
}());
var NestedMenu = /** @class */ (function () {
    function NestedMenu() {
        this.rootCloseCallback = jasmine.createSpy('root menu closed callback');
        this.levelOneCloseCallback = jasmine.createSpy('level one menu closed callback');
        this.levelTwoCloseCallback = jasmine.createSpy('level one menu closed callback');
        this.showLazy = false;
    }
    NestedMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button\n      [matMenuTriggerFor]=\"root\"\n      #rootTrigger=\"matMenuTrigger\"\n      #rootTriggerEl>Toggle menu</button>\n\n    <button\n      [matMenuTriggerFor]=\"levelTwo\"\n      #alternateTrigger=\"matMenuTrigger\">Toggle alternate menu</button>\n\n    <mat-menu #root=\"matMenu\" (closed)=\"rootCloseCallback($event)\">\n      <button mat-menu-item\n        id=\"level-one-trigger\"\n        [matMenuTriggerFor]=\"levelOne\"\n        #levelOneTrigger=\"matMenuTrigger\">One</button>\n      <button mat-menu-item>Two</button>\n      <button mat-menu-item\n        *ngIf=\"showLazy\"\n        id=\"lazy-trigger\"\n        [matMenuTriggerFor]=\"lazy\"\n        #lazyTrigger=\"matMenuTrigger\">Three</button>\n    </mat-menu>\n\n    <mat-menu #levelOne=\"matMenu\" (closed)=\"levelOneCloseCallback($event)\">\n      <button mat-menu-item>Four</button>\n      <button mat-menu-item\n        id=\"level-two-trigger\"\n        [matMenuTriggerFor]=\"levelTwo\"\n        #levelTwoTrigger=\"matMenuTrigger\">Five</button>\n      <button mat-menu-item>Six</button>\n    </mat-menu>\n\n    <mat-menu #levelTwo=\"matMenu\" (closed)=\"levelTwoCloseCallback($event)\">\n      <button mat-menu-item>Seven</button>\n      <button mat-menu-item>Eight</button>\n      <button mat-menu-item>Nine</button>\n    </mat-menu>\n\n    <mat-menu #lazy=\"matMenu\">\n      <button mat-menu-item>Ten</button>\n      <button mat-menu-item>Eleven</button>\n      <button mat-menu-item>Twelve</button>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedMenu.propDecorators = {
        "rootMenu": [{ type: core_1.ViewChild, args: ['root',] },],
        "rootTrigger": [{ type: core_1.ViewChild, args: ['rootTrigger',] },],
        "rootTriggerEl": [{ type: core_1.ViewChild, args: ['rootTriggerEl',] },],
        "alternateTrigger": [{ type: core_1.ViewChild, args: ['alternateTrigger',] },],
        "levelOneMenu": [{ type: core_1.ViewChild, args: ['levelOne',] },],
        "levelOneTrigger": [{ type: core_1.ViewChild, args: ['levelOneTrigger',] },],
        "levelTwoMenu": [{ type: core_1.ViewChild, args: ['levelTwo',] },],
        "levelTwoTrigger": [{ type: core_1.ViewChild, args: ['levelTwoTrigger',] },],
        "lazyMenu": [{ type: core_1.ViewChild, args: ['lazy',] },],
        "lazyTrigger": [{ type: core_1.ViewChild, args: ['lazyTrigger',] },],
    };
    return NestedMenu;
}());
var NestedMenuCustomElevation = /** @class */ (function () {
    function NestedMenuCustomElevation() {
    }
    NestedMenuCustomElevation.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"root\" #rootTrigger=\"matMenuTrigger\">Toggle menu</button>\n\n    <mat-menu #root=\"matMenu\">\n      <button mat-menu-item\n        [matMenuTriggerFor]=\"levelOne\"\n        #levelOneTrigger=\"matMenuTrigger\">One</button>\n    </mat-menu>\n\n    <mat-menu #levelOne=\"matMenu\" class=\"mat-elevation-z24\">\n      <button mat-menu-item>Two</button>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedMenuCustomElevation.propDecorators = {
        "rootTrigger": [{ type: core_1.ViewChild, args: ['rootTrigger',] },],
        "levelOneTrigger": [{ type: core_1.ViewChild, args: ['levelOneTrigger',] },],
    };
    return NestedMenuCustomElevation;
}());
var NestedMenuRepeater = /** @class */ (function () {
    function NestedMenuRepeater() {
        this.items = ['one', 'two', 'three'];
    }
    NestedMenuRepeater.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"root\" #rootTriggerEl>Toggle menu</button>\n    <mat-menu #root=\"matMenu\">\n      <button\n        mat-menu-item\n        class=\"level-one-trigger\"\n        *ngFor=\"let item of items\"\n        [matMenuTriggerFor]=\"levelOne\">{{item}}</button>\n    </mat-menu>\n\n    <mat-menu #levelOne=\"matMenu\">\n      <button mat-menu-item>Four</button>\n      <button mat-menu-item>Five</button>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    NestedMenuRepeater.propDecorators = {
        "rootTriggerEl": [{ type: core_1.ViewChild, args: ['rootTriggerEl',] },],
    };
    return NestedMenuRepeater;
}());
var SubmenuDeclaredInsideParentMenu = /** @class */ (function () {
    function SubmenuDeclaredInsideParentMenu() {
    }
    SubmenuDeclaredInsideParentMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"root\" #rootTriggerEl>Toggle menu</button>\n\n    <mat-menu #root=\"matMenu\">\n      <button mat-menu-item class=\"level-one-trigger\" [matMenuTriggerFor]=\"levelOne\">One</button>\n\n      <mat-menu #levelOne=\"matMenu\">\n        <button mat-menu-item class=\"level-two-item\">Two</button>\n      </mat-menu>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    SubmenuDeclaredInsideParentMenu.propDecorators = {
        "rootTriggerEl": [{ type: core_1.ViewChild, args: ['rootTriggerEl',] },],
    };
    return SubmenuDeclaredInsideParentMenu;
}());
var FakeIcon = /** @class */ (function () {
    function FakeIcon() {
    }
    FakeIcon.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'fake-icon',
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return FakeIcon;
}());
var SimpleLazyMenu = /** @class */ (function () {
    function SimpleLazyMenu() {
    }
    SimpleLazyMenu.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button [matMenuTriggerFor]=\"menu\" #triggerEl>Toggle menu</button>\n\n    <mat-menu #menu=\"matMenu\">\n      <ng-template matMenuContent>\n        <button mat-menu-item>Item</button>\n        <button mat-menu-item>Another item</button>\n      </ng-template>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    SimpleLazyMenu.propDecorators = {
        "trigger": [{ type: core_1.ViewChild, args: [index_1.MatMenuTrigger,] },],
        "triggerEl": [{ type: core_1.ViewChild, args: ['triggerEl',] },],
        "items": [{ type: core_1.ViewChildren, args: [index_1.MatMenuItem,] },],
    };
    return SimpleLazyMenu;
}());
var LazyMenuWithContext = /** @class */ (function () {
    function LazyMenuWithContext() {
    }
    LazyMenuWithContext.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <button\n      [matMenuTriggerFor]=\"menu\"\n      [matMenuTriggerData]=\"{label: 'one'}\"\n      #triggerOne=\"matMenuTrigger\">One</button>\n\n    <button\n      [matMenuTriggerFor]=\"menu\"\n      [matMenuTriggerData]=\"{label: 'two'}\"\n      #triggerTwo=\"matMenuTrigger\">Two</button>\n\n    <mat-menu #menu=\"matMenu\">\n      <ng-template let-label=\"label\" matMenuContent>\n        <button mat-menu-item>{{label}}</button>\n      </ng-template>\n    </mat-menu>\n  "
                },] },
    ];
    /** @nocollapse */
    LazyMenuWithContext.propDecorators = {
        "triggerOne": [{ type: core_1.ViewChild, args: ['triggerOne',] },],
        "triggerTwo": [{ type: core_1.ViewChild, args: ['triggerTwo',] },],
    };
    return LazyMenuWithContext;
}());
//# sourceMappingURL=menu.spec.js.map