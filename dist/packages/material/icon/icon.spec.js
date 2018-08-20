"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/common/http/testing");
var core_1 = require("@angular/core");
var index_1 = require("./index");
var icon_registry_1 = require("./icon-registry");
var fake_svgs_1 = require("./fake-svgs");
var testing_3 = require("@angular/cdk/testing");
/** Returns the CSS classes assigned to an element as a sorted array. */
function sortedClassNames(element) {
    return element.className.split(' ').sort();
}
/**
 * Verifies that an element contains a single `<svg>` child element, and returns that child.
 */
function verifyAndGetSingleSvgChild(element) {
    expect(element.id).toBeFalsy();
    expect(element.childNodes.length).toBe(1);
    var svgChild = element.childNodes[0];
    expect(svgChild.tagName.toLowerCase()).toBe('svg');
    return svgChild;
}
/**
 * Verifies that an element contains a single `<path>` child element whose "id" attribute has
 * the specified value.
 */
function verifyPathChildElement(element, attributeValue) {
    expect(element.childNodes.length).toBe(1);
    var pathElement = element.childNodes[0];
    expect(pathElement.tagName.toLowerCase()).toBe('path');
    // The testing data SVGs have the name attribute set for verification.
    expect(pathElement.getAttribute('name')).toBe(attributeValue);
}
describe('MatIcon', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule, index_1.MatIconModule],
            declarations: [
                IconWithColor,
                IconWithLigature,
                IconWithCustomFontCss,
                IconFromSvgName,
                IconWithAriaHiddenFalse,
                IconWithBindingAndNgIf,
                InlineIcon,
                SvgIconWithUserContent,
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    var iconRegistry;
    var http;
    var sanitizer;
    beforeEach(testing_1.inject([icon_registry_1.MatIconRegistry, testing_2.HttpTestingController, platform_browser_1.DomSanitizer], function (mir, h, ds) {
        iconRegistry = mir;
        http = h;
        sanitizer = ds;
    }));
    it('should apply class based on color attribute', function () {
        var fixture = testing_1.TestBed.createComponent(IconWithColor);
        var testComponent = fixture.componentInstance;
        var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
        testComponent.iconName = 'home';
        testComponent.iconColor = 'primary';
        fixture.detectChanges();
        expect(sortedClassNames(matIconElement)).toEqual(['mat-icon', 'mat-primary', 'material-icons']);
    });
    it('should mark mat-icon as aria-hidden by default', function () {
        var fixture = testing_1.TestBed.createComponent(IconWithLigature);
        var iconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
        expect(iconElement.getAttribute('aria-hidden'))
            .toBe('true', 'Expected the mat-icon element has aria-hidden="true" by default');
    });
    it('should not override a user-provided aria-hidden attribute', function () {
        var fixture = testing_1.TestBed.createComponent(IconWithAriaHiddenFalse);
        var iconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
        expect(iconElement.getAttribute('aria-hidden'))
            .toBe('false', 'Expected the mat-icon element has the user-provided aria-hidden value');
    });
    it('should apply inline styling', function () {
        var fixture = testing_1.TestBed.createComponent(InlineIcon);
        var iconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
        expect(iconElement.classList.contains('mat-icon-inline'))
            .toBeFalsy('Expected the mat-icon element to not include the inline styling class');
        fixture.debugElement.componentInstance.inline = true;
        fixture.detectChanges();
        expect(iconElement.classList.contains('mat-icon-inline'))
            .toBeTruthy('Expected the mat-icon element to include the inline styling class');
    });
    describe('Ligature icons', function () {
        it('should add material-icons class by default', function () {
            var fixture = testing_1.TestBed.createComponent(IconWithLigature);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'home';
            fixture.detectChanges();
            expect(sortedClassNames(matIconElement)).toEqual(['mat-icon', 'material-icons']);
        });
        it('should use alternate icon font if set', function () {
            iconRegistry.setDefaultFontSetClass('myfont');
            var fixture = testing_1.TestBed.createComponent(IconWithLigature);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'home';
            fixture.detectChanges();
            expect(sortedClassNames(matIconElement)).toEqual(['mat-icon', 'myfont']);
        });
    });
    describe('Icons from URLs', function () {
        it('should register icon URLs by name', testing_1.fakeAsync(function () {
            iconRegistry.addSvgIcon('fluffy', trustUrl('cat.svg'));
            iconRegistry.addSvgIcon('fido', trustUrl('dog.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var svgElement;
            var testComponent = fixture.componentInstance;
            var iconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'fido';
            fixture.detectChanges();
            http.expectOne('dog.svg').flush(fake_svgs_1.FAKE_SVGS.dog);
            svgElement = verifyAndGetSingleSvgChild(iconElement);
            verifyPathChildElement(svgElement, 'woof');
            // Change the icon, and the SVG element should be replaced.
            testComponent.iconName = 'fluffy';
            fixture.detectChanges();
            http.expectOne('cat.svg').flush(fake_svgs_1.FAKE_SVGS.cat);
            svgElement = verifyAndGetSingleSvgChild(iconElement);
            verifyPathChildElement(svgElement, 'meow');
            // Using an icon from a previously loaded URL should not cause another HTTP request.
            testComponent.iconName = 'fido';
            fixture.detectChanges();
            http.expectNone('dog.svg');
            svgElement = verifyAndGetSingleSvgChild(iconElement);
            verifyPathChildElement(svgElement, 'woof');
            // Assert that a registered icon can be looked-up by url.
            iconRegistry.getSvgIconFromUrl(trustUrl('cat.svg')).subscribe(function (element) {
                verifyPathChildElement(element, 'meow');
            });
            testing_1.tick();
        }));
        it('should throw an error when using an untrusted icon url', function () {
            iconRegistry.addSvgIcon('fluffy', 'farm-set-1.svg');
            expect(function () {
                var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
                fixture.componentInstance.iconName = 'fluffy';
                fixture.detectChanges();
            }).toThrowError(/unsafe value used in a resource URL context/);
        });
        it('should throw an error when using an untrusted icon set url', function () {
            iconRegistry.addSvgIconSetInNamespace('farm', 'farm-set-1.svg');
            expect(function () {
                var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
                fixture.componentInstance.iconName = 'farm:pig';
                fixture.detectChanges();
            }).toThrowError(/unsafe value used in a resource URL context/);
        });
        it('should extract icon from SVG icon set', function () {
            iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            var svgChild;
            testComponent.iconName = 'farm:pig';
            fixture.detectChanges();
            http.expectOne('farm-set-1.svg').flush(fake_svgs_1.FAKE_SVGS.farmSet1);
            expect(matIconElement.childNodes.length).toBe(1);
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            expect(svgElement.childNodes.length).toBe(1);
            svgChild = svgElement.childNodes[0];
            // The first <svg> child should be the <g id="pig"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('pig');
            verifyPathChildElement(svgChild, 'oink');
            // Change the icon, and the SVG element should be replaced.
            testComponent.iconName = 'farm:cow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            svgChild = svgElement.childNodes[0];
            // The first <svg> child should be the <g id="cow"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('cow');
            verifyPathChildElement(svgChild, 'moo');
        });
        it('should never parse the same icon set multiple times', function () {
            // Normally we avoid spying on private methods like this, but the parsing is a private
            // implementation detail that should not be exposed to the public API. This test, though,
            // is important enough to warrant the brittle-ness that results.
            spyOn(iconRegistry, '_svgElementFromString').and.callThrough();
            iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));
            // Requests for icons must be subscribed to in order for requests to be made.
            iconRegistry.getNamedSvgIcon('pig', 'farm').subscribe(function () { });
            iconRegistry.getNamedSvgIcon('cow', 'farm').subscribe(function () { });
            http.expectOne('farm-set-1.svg').flush(fake_svgs_1.FAKE_SVGS.farmSet1);
            // _svgElementFromString is called once for each icon to create an empty SVG element
            // and once to parse the full icon set.
            expect(iconRegistry._svgElementFromString).toHaveBeenCalledTimes(3);
        });
        it('should allow multiple icon sets in a namespace', function () {
            iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));
            iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-2.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            var svgChild;
            testComponent.iconName = 'farm:pig';
            fixture.detectChanges();
            http.expectOne('farm-set-1.svg').flush(fake_svgs_1.FAKE_SVGS.farmSet1);
            http.expectOne('farm-set-2.svg').flush(fake_svgs_1.FAKE_SVGS.farmSet2);
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            expect(svgElement.childNodes.length).toBe(1);
            svgChild = svgElement.childNodes[0];
            // The <svg> child should be the <g id="pig"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('pig');
            expect(svgChild.getAttribute('id')).toBeFalsy();
            expect(svgChild.childNodes.length).toBe(1);
            verifyPathChildElement(svgChild, 'oink');
            // Change the icon name to one that appears in both icon sets. The icon from the set that
            // was registered last should be used (with id attribute of 'moo moo' instead of 'moo'),
            // and no additional HTTP request should be made.
            testComponent.iconName = 'farm:cow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            svgChild = svgElement.childNodes[0];
            // The first <svg> child should be the <g id="cow"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('cow');
            expect(svgChild.childNodes.length).toBe(1);
            verifyPathChildElement(svgChild, 'moo moo');
        });
        it('should clear the id attribute from the svg node', function () {
            iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-1.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            fixture.componentInstance.iconName = 'farm:pig';
            fixture.detectChanges();
            http.expectOne('farm-set-1.svg').flush(fake_svgs_1.FAKE_SVGS.farmSet1);
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement = verifyAndGetSingleSvgChild(matIconElement);
            expect(svgElement.hasAttribute('id')).toBe(false);
        });
        it('should unwrap <symbol> nodes', function () {
            iconRegistry.addSvgIconSetInNamespace('farm', trustUrl('farm-set-3.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'farm:duck';
            fixture.detectChanges();
            http.expectOne('farm-set-3.svg').flush(fake_svgs_1.FAKE_SVGS.farmSet3);
            var svgElement = verifyAndGetSingleSvgChild(matIconElement);
            var firstChild = svgElement.childNodes[0];
            expect(svgElement.querySelector('symbol')).toBeFalsy();
            expect(svgElement.childNodes.length).toBe(1);
            expect(firstChild.nodeName.toLowerCase()).toBe('path');
            expect(firstChild.getAttribute('name')).toBe('quack');
        });
        it('should not wrap <svg> elements in icon sets in another svg tag', function () {
            iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            testComponent.iconName = 'left-arrow';
            fixture.detectChanges();
            http.expectOne('arrow-set.svg').flush(fake_svgs_1.FAKE_SVGS.arrows);
            // arrow-set.svg stores its icons as nested <svg> elements, so they should be used
            // directly and not wrapped in an outer <svg> tag like the <g> elements in other sets.
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'left');
        });
        it('should return unmodified copies of icons from icon sets', function () {
            iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            testComponent.iconName = 'left-arrow';
            fixture.detectChanges();
            http.expectOne('arrow-set.svg').flush(fake_svgs_1.FAKE_SVGS.arrows);
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'left');
            // Modify the SVG element by setting a viewBox attribute.
            svgElement.setAttribute('viewBox', '0 0 100 100');
            // Switch to a different icon.
            testComponent.iconName = 'right-arrow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'right');
            // Switch back to the first icon. The viewBox attribute should not be present.
            testComponent.iconName = 'left-arrow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'left');
            expect(svgElement.getAttribute('viewBox')).toBeFalsy();
        });
        it('should not throw when toggling an icon that has a binding in IE11', function () {
            iconRegistry.addSvgIcon('fluffy', trustUrl('cat.svg'));
            var fixture = testing_1.TestBed.createComponent(IconWithBindingAndNgIf);
            fixture.detectChanges();
            http.expectOne('cat.svg').flush(fake_svgs_1.FAKE_SVGS.cat);
            expect(function () {
                fixture.componentInstance.showIcon = false;
                fixture.detectChanges();
                fixture.componentInstance.showIcon = true;
                fixture.detectChanges();
            }).not.toThrow();
        });
        it('should remove the SVG element from the DOM when the binding is cleared', function () {
            iconRegistry.addSvgIconSet(trustUrl('arrow-set.svg'));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var icon = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'left-arrow';
            fixture.detectChanges();
            http.expectOne('arrow-set.svg').flush(fake_svgs_1.FAKE_SVGS.arrows);
            expect(icon.querySelector('svg')).toBeTruthy();
            testComponent.iconName = undefined;
            fixture.detectChanges();
            expect(icon.querySelector('svg')).toBeFalsy();
        });
        it('should keep non-SVG user content inside the icon element', testing_1.fakeAsync(function () {
            iconRegistry.addSvgIcon('fido', trustUrl('dog.svg'));
            var fixture = testing_1.TestBed.createComponent(SvgIconWithUserContent);
            var testComponent = fixture.componentInstance;
            var iconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'fido';
            fixture.detectChanges();
            http.expectOne('dog.svg').flush(fake_svgs_1.FAKE_SVGS.dog);
            var userDiv = iconElement.querySelector('div');
            expect(userDiv).toBeTruthy();
            expect(iconElement.textContent.trim()).toContain('Hello');
            testing_1.tick();
        }));
    });
    describe('Icons from HTML string', function () {
        it('should register icon HTML strings by name', testing_1.fakeAsync(function () {
            iconRegistry.addSvgIconLiteral('fluffy', trustHtml(fake_svgs_1.FAKE_SVGS.cat));
            iconRegistry.addSvgIconLiteral('fido', trustHtml(fake_svgs_1.FAKE_SVGS.dog));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var svgElement;
            var testComponent = fixture.componentInstance;
            var iconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.iconName = 'fido';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(iconElement);
            verifyPathChildElement(svgElement, 'woof');
            testComponent.iconName = 'fluffy';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(iconElement);
            verifyPathChildElement(svgElement, 'meow');
            // Assert that a registered icon can be looked-up by name.
            iconRegistry.getNamedSvgIcon('fluffy').subscribe(function (element) {
                verifyPathChildElement(element, 'meow');
            });
            testing_1.tick();
        }));
        it('should throw an error when using untrusted HTML', function () {
            // Stub out console.warn so we don't pollute our logs with Angular's warnings.
            // Jasmine will tear the spy down at the end of the test.
            spyOn(console, 'warn');
            expect(function () {
                iconRegistry.addSvgIconLiteral('circle', '<svg><circle></svg>');
            }).toThrowError(/was not trusted as safe HTML/);
        });
        it('should extract an icon from SVG icon set', function () {
            iconRegistry.addSvgIconSetLiteralInNamespace('farm', trustHtml(fake_svgs_1.FAKE_SVGS.farmSet1));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            var svgChild;
            testComponent.iconName = 'farm:pig';
            fixture.detectChanges();
            expect(matIconElement.childNodes.length).toBe(1);
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            expect(svgElement.childNodes.length).toBe(1);
            svgChild = svgElement.childNodes[0];
            // The first <svg> child should be the <g id="pig"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('pig');
            verifyPathChildElement(svgChild, 'oink');
            // Change the icon, and the SVG element should be replaced.
            testComponent.iconName = 'farm:cow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            svgChild = svgElement.childNodes[0];
            // The first <svg> child should be the <g id="cow"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('cow');
            verifyPathChildElement(svgChild, 'moo');
        });
        it('should allow multiple icon sets in a namespace', function () {
            iconRegistry.addSvgIconSetLiteralInNamespace('farm', trustHtml(fake_svgs_1.FAKE_SVGS.farmSet1));
            iconRegistry.addSvgIconSetLiteralInNamespace('farm', trustHtml(fake_svgs_1.FAKE_SVGS.farmSet2));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            var svgChild;
            testComponent.iconName = 'farm:pig';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            expect(svgElement.childNodes.length).toBe(1);
            svgChild = svgElement.childNodes[0];
            // The <svg> child should be the <g id="pig"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('pig');
            expect(svgChild.getAttribute('id')).toBeFalsy();
            expect(svgChild.childNodes.length).toBe(1);
            verifyPathChildElement(svgChild, 'oink');
            // Change the icon name to one that appears in both icon sets. The icon from the set that
            // was registered last should be used (with id attribute of 'moo moo' instead of 'moo'),
            // and no additional HTTP request should be made.
            testComponent.iconName = 'farm:cow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            svgChild = svgElement.childNodes[0];
            // The first <svg> child should be the <g id="cow"> element.
            expect(svgChild.tagName.toLowerCase()).toBe('g');
            expect(svgChild.getAttribute('name')).toBe('cow');
            expect(svgChild.childNodes.length).toBe(1);
            verifyPathChildElement(svgChild, 'moo moo');
        });
        it('should return unmodified copies of icons from icon sets', function () {
            iconRegistry.addSvgIconSetLiteral(trustHtml(fake_svgs_1.FAKE_SVGS.arrows));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            var svgElement;
            testComponent.iconName = 'left-arrow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'left');
            // Modify the SVG element by setting a viewBox attribute.
            svgElement.setAttribute('viewBox', '0 0 100 100');
            // Switch to a different icon.
            testComponent.iconName = 'right-arrow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'right');
            // Switch back to the first icon. The viewBox attribute should not be present.
            testComponent.iconName = 'left-arrow';
            fixture.detectChanges();
            svgElement = verifyAndGetSingleSvgChild(matIconElement);
            verifyPathChildElement(svgElement, 'left');
            expect(svgElement.getAttribute('viewBox')).toBeFalsy();
        });
        it('should add an extra string to the end of `style` tags inside SVG', testing_1.fakeAsync(function () {
            iconRegistry.addSvgIconLiteral('fido', trustHtml("\n        <svg>\n          <style>#woof {color: blue;}</style>\n          <path id=\"woof\" name=\"woof\"></path>\n        </svg>\n      "));
            var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
            fixture.componentInstance.iconName = 'fido';
            fixture.detectChanges();
            var styleTag = fixture.nativeElement.querySelector('mat-icon svg style');
            // Note the extra whitespace at the end which is what we're testing for. This is a
            // workaround for IE and Edge ignoring `style` tags in dynamically-created SVGs.
            expect(styleTag.textContent).toBe('#woof {color: blue;} ');
            testing_1.tick();
        }));
    });
    describe('custom fonts', function () {
        it('should apply CSS classes for custom font and icon', function () {
            iconRegistry.registerFontClassAlias('f1', 'font1');
            iconRegistry.registerFontClassAlias('f2');
            var fixture = testing_1.TestBed.createComponent(IconWithCustomFontCss);
            var testComponent = fixture.componentInstance;
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            testComponent.fontSet = 'f1';
            testComponent.fontIcon = 'house';
            fixture.detectChanges();
            expect(sortedClassNames(matIconElement)).toEqual(['font1', 'house', 'mat-icon']);
            testComponent.fontSet = 'f2';
            testComponent.fontIcon = 'igloo';
            fixture.detectChanges();
            expect(sortedClassNames(matIconElement)).toEqual(['f2', 'igloo', 'mat-icon']);
            testComponent.fontSet = 'f3';
            testComponent.fontIcon = 'tent';
            fixture.detectChanges();
            expect(sortedClassNames(matIconElement)).toEqual(['f3', 'mat-icon', 'tent']);
        });
        it('should handle values with extraneous spaces being passed in to `fontSet`', function () {
            var fixture = testing_1.TestBed.createComponent(IconWithCustomFontCss);
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            expect(function () {
                fixture.componentInstance.fontSet = 'font set';
                fixture.detectChanges();
            }).not.toThrow();
            expect(sortedClassNames(matIconElement)).toEqual(['font', 'mat-icon']);
            expect(function () {
                fixture.componentInstance.fontSet = ' changed';
                fixture.detectChanges();
            }).not.toThrow();
            expect(sortedClassNames(matIconElement)).toEqual(['changed', 'mat-icon']);
        });
        it('should handle values with extraneous spaces being passed in to `fontIcon`', function () {
            var fixture = testing_1.TestBed.createComponent(IconWithCustomFontCss);
            var matIconElement = fixture.debugElement.nativeElement.querySelector('mat-icon');
            expect(function () {
                fixture.componentInstance.fontIcon = 'font icon';
                fixture.detectChanges();
            }).not.toThrow();
            expect(sortedClassNames(matIconElement)).toEqual(['font', 'mat-icon', 'material-icons']);
            expect(function () {
                fixture.componentInstance.fontIcon = ' changed';
                fixture.detectChanges();
            }).not.toThrow();
            expect(sortedClassNames(matIconElement)).toEqual(['changed', 'mat-icon', 'material-icons']);
        });
    });
    /** Marks an SVG icon url as explicitly trusted. */
    function trustUrl(iconUrl) {
        return sanitizer.bypassSecurityTrustResourceUrl(iconUrl);
    }
    /** Marks an SVG icon string as explicitly trusted. */
    function trustHtml(iconHtml) {
        return sanitizer.bypassSecurityTrustHtml(iconHtml);
    }
});
describe('MatIcon without HttpClientModule', function () {
    var iconRegistry;
    var sanitizer;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatIconModule],
            declarations: [IconFromSvgName],
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([icon_registry_1.MatIconRegistry, platform_browser_1.DomSanitizer], function (mir, ds) {
        iconRegistry = mir;
        sanitizer = ds;
    }));
    it('should throw an error when trying to load a remote icon', function () { return __awaiter(_this, void 0, void 0, function () {
        var expectedError;
        return __generator(this, function (_a) {
            expectedError = testing_3.wrappedErrorMessage(icon_registry_1.getMatIconNoHttpProviderError());
            expect(function () {
                iconRegistry.addSvgIcon('fido', sanitizer.bypassSecurityTrustResourceUrl('dog.svg'));
                var fixture = testing_1.TestBed.createComponent(IconFromSvgName);
                fixture.componentInstance.iconName = 'fido';
                fixture.detectChanges();
            }).toThrowError(expectedError);
            return [2 /*return*/];
        });
    }); });
});
var IconWithLigature = /** @class */ (function () {
    function IconWithLigature() {
        this.iconName = '';
    }
    IconWithLigature.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon>{{iconName}}</mat-icon>" },] },
    ];
    return IconWithLigature;
}());
var IconWithColor = /** @class */ (function () {
    function IconWithColor() {
        this.iconName = '';
        this.iconColor = 'primary';
    }
    IconWithColor.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon [color]=\"iconColor\">{{iconName}}</mat-icon>" },] },
    ];
    return IconWithColor;
}());
var IconWithCustomFontCss = /** @class */ (function () {
    function IconWithCustomFontCss() {
        this.fontSet = '';
        this.fontIcon = '';
    }
    IconWithCustomFontCss.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon [fontSet]=\"fontSet\" [fontIcon]=\"fontIcon\"></mat-icon>" },] },
    ];
    return IconWithCustomFontCss;
}());
var IconFromSvgName = /** @class */ (function () {
    function IconFromSvgName() {
        this.iconName = '';
    }
    IconFromSvgName.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon [svgIcon]=\"iconName\"></mat-icon>" },] },
    ];
    return IconFromSvgName;
}());
var IconWithAriaHiddenFalse = /** @class */ (function () {
    function IconWithAriaHiddenFalse() {
    }
    IconWithAriaHiddenFalse.decorators = [
        { type: core_1.Component, args: [{ template: '<mat-icon aria-hidden="false">face</mat-icon>' },] },
    ];
    return IconWithAriaHiddenFalse;
}());
var IconWithBindingAndNgIf = /** @class */ (function () {
    function IconWithBindingAndNgIf() {
        this.iconName = 'fluffy';
        this.showIcon = true;
    }
    IconWithBindingAndNgIf.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon [svgIcon]=\"iconName\" *ngIf=\"showIcon\">{{iconName}}</mat-icon>" },] },
    ];
    return IconWithBindingAndNgIf;
}());
var InlineIcon = /** @class */ (function () {
    function InlineIcon() {
        this.inline = false;
    }
    InlineIcon.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon [inline]=\"inline\">{{iconName}}</mat-icon>" },] },
    ];
    return InlineIcon;
}());
var SvgIconWithUserContent = /** @class */ (function () {
    function SvgIconWithUserContent() {
        this.iconName = '';
    }
    SvgIconWithUserContent.decorators = [
        { type: core_1.Component, args: [{ template: "<mat-icon [svgIcon]=\"iconName\"><div>Hello</div></mat-icon>" },] },
    ];
    return SvgIconWithUserContent;
}());
//# sourceMappingURL=icon.spec.js.map