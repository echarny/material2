"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("@angular/cdk/platform");
var interactivity_checker_1 = require("./interactivity-checker");
describe('InteractivityChecker', function () {
    var platform = new platform_1.Platform();
    var testContainerElement;
    var checker;
    beforeEach(function () {
        testContainerElement = document.createElement('div');
        document.body.appendChild(testContainerElement);
        checker = new interactivity_checker_1.InteractivityChecker(platform);
    });
    afterEach(function () {
        document.body.removeChild(testContainerElement);
        testContainerElement.innerHTML = '';
    });
    describe('isDisabled', function () {
        it('should return true for disabled elements', function () {
            var elements = createElements('input', 'textarea', 'select', 'button', 'mat-checkbox');
            elements.forEach(function (el) { return el.setAttribute('disabled', ''); });
            appendElements(elements);
            elements.forEach(function (el) {
                expect(checker.isDisabled(el))
                    .toBe(true, "Expected <" + el.nodeName + " disabled> to be disabled");
            });
        });
        it('should return false for elements without disabled', function () {
            var elements = createElements('input', 'textarea', 'select', 'button', 'mat-checkbox');
            appendElements(elements);
            elements.forEach(function (el) {
                expect(checker.isDisabled(el))
                    .toBe(false, "Expected <" + el.nodeName + "> not to be disabled");
            });
        });
    });
    describe('isVisible', function () {
        it('should return false for a `display: none` element', function () {
            testContainerElement.innerHTML =
                "<input style=\"display: none;\">";
            var input = testContainerElement.querySelector('input');
            expect(checker.isVisible(input))
                .toBe(false, 'Expected element with `display: none` to not be visible');
        });
        it('should return false for the child of a `display: none` element', function () {
            testContainerElement.innerHTML =
                "<div style=\"display: none;\">\n           <input>\n         </div>";
            var input = testContainerElement.querySelector('input');
            expect(checker.isVisible(input))
                .toBe(false, 'Expected element with `display: none` parent to not be visible');
        });
        it('should return false for a `visibility: hidden` element', function () {
            testContainerElement.innerHTML =
                "<input style=\"visibility: hidden;\">";
            var input = testContainerElement.querySelector('input');
            expect(checker.isVisible(input))
                .toBe(false, 'Expected element with `visibility: hidden` to not be visible');
        });
        it('should return false for the child of a `visibility: hidden` element', function () {
            testContainerElement.innerHTML =
                "<div style=\"visibility: hidden;\">\n           <input>\n         </div>";
            var input = testContainerElement.querySelector('input');
            expect(checker.isVisible(input))
                .toBe(false, 'Expected element with `visibility: hidden` parent to not be visible');
        });
        it('should return true for an element with `visibility: hidden` ancestor and *closer* ' +
            '`visibility: visible` ancestor', function () {
            testContainerElement.innerHTML =
                "<div style=\"visibility: hidden;\">\n           <div style=\"visibility: visible;\">\n             <input>\n           </div>\n         </div>";
            var input = testContainerElement.querySelector('input');
            expect(checker.isVisible(input))
                .toBe(true, 'Expected element with `visibility: hidden` ancestor and closer ' +
                '`visibility: visible` ancestor to be visible');
        });
        it('should return true for an element without visibility modifiers', function () {
            var input = document.createElement('input');
            testContainerElement.appendChild(input);
            expect(checker.isVisible(input))
                .toBe(true, 'Expected element without visibility modifiers to be visible');
        });
    });
    describe('isFocusable', function () {
        it('should return true for native form controls', function () {
            var elements = createElements('input', 'textarea', 'select', 'button');
            appendElements(elements);
            elements.forEach(function (el) {
                expect(checker.isFocusable(el)).toBe(true, "Expected <" + el.nodeName + "> to be focusable");
            });
        });
        it('should return true for an anchor with an href', function () {
            var anchor = document.createElement('a');
            anchor.href = 'google.com';
            testContainerElement.appendChild(anchor);
            expect(checker.isFocusable(anchor)).toBe(true, "Expected <a> with href to be focusable");
        });
        it('should return false for an anchor without an href', function () {
            var anchor = document.createElement('a');
            testContainerElement.appendChild(anchor);
            expect(checker.isFocusable(anchor))
                .toBe(false, "Expected <a> without href not to be focusable");
        });
        it('should return false for disabled form controls', function () {
            var elements = createElements('input', 'textarea', 'select', 'button');
            elements.forEach(function (el) { return el.setAttribute('disabled', ''); });
            appendElements(elements);
            elements.forEach(function (el) {
                expect(checker.isFocusable(el))
                    .toBe(false, "Expected <" + el.nodeName + " disabled> not to be focusable");
            });
        });
        it('should return false for a `display: none` element', function () {
            testContainerElement.innerHTML =
                "<input style=\"display: none;\">";
            var input = testContainerElement.querySelector('input');
            expect(checker.isFocusable(input))
                .toBe(false, 'Expected element with `display: none` to not be visible');
        });
        it('should return false for the child of a `display: none` element', function () {
            testContainerElement.innerHTML =
                "<div style=\"display: none;\">\n           <input>\n         </div>";
            var input = testContainerElement.querySelector('input');
            expect(checker.isFocusable(input))
                .toBe(false, 'Expected element with `display: none` parent to not be visible');
        });
        it('should return false for a `visibility: hidden` element', function () {
            testContainerElement.innerHTML =
                "<input style=\"visibility: hidden;\">";
            var input = testContainerElement.querySelector('input');
            expect(checker.isFocusable(input))
                .toBe(false, 'Expected element with `visibility: hidden` not to be focusable');
        });
        it('should return false for the child of a `visibility: hidden` element', function () {
            testContainerElement.innerHTML =
                "<div style=\"visibility: hidden;\">\n           <input>\n         </div>";
            var input = testContainerElement.querySelector('input');
            expect(checker.isFocusable(input))
                .toBe(false, 'Expected element with `visibility: hidden` parent not to be focusable');
        });
        it('should return true for an element with `visibility: hidden` ancestor and *closer* ' +
            '`visibility: visible` ancestor', function () {
            testContainerElement.innerHTML =
                "<div style=\"visibility: hidden;\">\n           <div style=\"visibility: visible;\">\n             <input>\n           </div>\n         </div>";
            var input = testContainerElement.querySelector('input');
            expect(checker.isFocusable(input))
                .toBe(true, 'Expected element with `visibility: hidden` ancestor and closer ' +
                '`visibility: visible` ancestor to be focusable');
        });
        it('should return false for an element with an empty tabindex', function () {
            var element = document.createElement('div');
            element.setAttribute('tabindex', '');
            testContainerElement.appendChild(element);
            expect(checker.isFocusable(element))
                .toBe(false, "Expected element with tabindex=\"\" not to be focusable");
        });
        it('should return false for an element with a non-numeric tabindex', function () {
            var element = document.createElement('div');
            element.setAttribute('tabindex', 'abba');
            testContainerElement.appendChild(element);
            expect(checker.isFocusable(element))
                .toBe(false, "Expected element with non-numeric tabindex not to be focusable");
        });
        it('should return true for an element with contenteditable', function () {
            var element = document.createElement('div');
            element.setAttribute('contenteditable', '');
            testContainerElement.appendChild(element);
            expect(checker.isFocusable(element))
                .toBe(true, "Expected element with contenteditable to be focusable");
        });
        it('should return false for inert div and span', function () {
            var elements = createElements('div', 'span');
            appendElements(elements);
            elements.forEach(function (el) {
                expect(checker.isFocusable(el))
                    .toBe(false, "Expected <" + el.nodeName + "> not to be focusable");
            });
        });
    });
    describe('isTabbable', function () {
        it('should respect the tabindex for video elements with controls', 
        // Do not run for Blink, Firefox and iOS because those treat video elements
        // with controls different and are covered in other tests.
        runIf(!platform.BLINK && !platform.FIREFOX && !platform.IOS, function () {
            var video = createFromTemplate('<video controls>', true);
            expect(checker.isTabbable(video)).toBe(true);
            video.tabIndex = -1;
            expect(checker.isTabbable(video)).toBe(false);
        }));
        it('should always mark video elements with controls as tabbable (BLINK & FIREFOX)', 
        // Only run this spec for Blink and Firefox, because those always treat video
        // elements with controls as tabbable.
        runIf(platform.BLINK || platform.FIREFOX, function () {
            var video = createFromTemplate('<video controls>', true);
            expect(checker.isTabbable(video)).toBe(true);
            video.tabIndex = -1;
            expect(checker.isTabbable(video)).toBe(true);
        }));
        // Some tests should not run inside of iOS browsers, because those only allow specific
        // elements to be tabbable and cause the tests to always fail.
        describe('for non-iOS browsers', runIf(!platform.IOS, function () {
            it('should mark form controls and anchors without tabindex attribute as tabbable', function () {
                var elements = createElements('input', 'textarea', 'select', 'button', 'a');
                appendElements(elements);
                elements.forEach(function (el) {
                    expect(checker.isTabbable(el)).toBe(true, "Expected <" + el.nodeName + "> to be tabbable");
                });
            });
            it('should return true for div and span with tabindex == 0', function () {
                var elements = createElements('div', 'span');
                elements.forEach(function (el) { return el.setAttribute('tabindex', '0'); });
                appendElements(elements);
                elements.forEach(function (el) {
                    expect(checker.isFocusable(el))
                        .toBe(true, "Expected <" + el.nodeName + " tabindex=\"0\"> to be focusable");
                });
            });
            it('should return false for native form controls and anchor with tabindex == -1', function () {
                var elements = createElements('input', 'textarea', 'select', 'button', 'a');
                elements.forEach(function (el) { return el.setAttribute('tabindex', '-1'); });
                appendElements(elements);
                elements.forEach(function (el) {
                    expect(checker.isTabbable(el))
                        .toBe(false, "Expected <" + el.nodeName + " tabindex=\"-1\"> not to be tabbable");
                });
            });
            it('should return true for div and span with tabindex == 0', function () {
                var elements = createElements('div', 'span');
                elements.forEach(function (el) { return el.setAttribute('tabindex', '0'); });
                appendElements(elements);
                elements.forEach(function (el) {
                    expect(checker.isTabbable(el))
                        .toBe(true, "Expected <" + el.nodeName + " tabindex=\"0\"> to be tabbable");
                });
            });
            it('should respect the inherited tabindex inside of frame elements', function () {
                var iframe = createFromTemplate('<iframe>', true);
                var button = createFromTemplate('<button tabindex="0">Not Tabbable</button>');
                appendElements([iframe]);
                iframe.setAttribute('tabindex', '-1');
                iframe.contentDocument.body.appendChild(button);
                expect(checker.isTabbable(iframe)).toBe(false);
                expect(checker.isTabbable(button)).toBe(false);
                iframe.removeAttribute('tabindex');
                expect(checker.isTabbable(iframe)).toBe(false);
                expect(checker.isTabbable(button)).toBe(true);
            });
            it('should carefully try to access the frame element of an elements window', function () {
                var iframe = createFromTemplate('<iframe>', true);
                var button = createFromTemplate('<button tabindex="1">Not Tabbable</button>');
                appendElements([iframe]);
                iframe.setAttribute('tabindex', '-1');
                iframe.contentDocument.body.appendChild(button);
                // Some browsers explicitly prevent overwriting of properties on a `Window` object.
                if (!platform.SAFARI) {
                    Object.defineProperty(iframe.contentWindow, 'frameElement', {
                        get: function () { throw 'Access Denied!'; }
                    });
                }
                expect(function () { return checker.isTabbable(button); }).not.toThrow();
            });
            it('should mark elements which are contentEditable as tabbable', function () {
                var editableEl = createFromTemplate('<div contenteditable="true">', true);
                expect(checker.isTabbable(editableEl)).toBe(true);
                editableEl.tabIndex = -1;
                expect(checker.isTabbable(editableEl)).toBe(false);
            });
            it('should never mark iframe elements as tabbable', function () {
                var iframe = createFromTemplate('<iframe>', true);
                // iFrame elements will be never marked as tabbable, because it depends on the content
                // which is mostly not detectable due to CORS and also the checks will be not reliable.
                expect(checker.isTabbable(iframe)).toBe(false);
            });
            it('should always mark audio elements without controls as not tabbable', function () {
                var audio = createFromTemplate('<audio>', true);
                expect(checker.isTabbable(audio)).toBe(false);
            });
        }));
        describe('for Blink and Webkit browsers', runIf(platform.BLINK || platform.WEBKIT, function () {
            it('should not mark elements inside of object frames as tabbable', function () {
                var objectEl = createFromTemplate('<object>', true);
                var button = createFromTemplate('<button tabindex="0">Not Tabbable</button>');
                appendElements([objectEl]);
                // This is a hack to create an empty contentDocument for the frame element.
                objectEl.type = 'text/html';
                objectEl.contentDocument.body.appendChild(button);
                expect(checker.isTabbable(objectEl)).toBe(false);
                expect(checker.isTabbable(button)).toBe(false);
            });
            it('should not mark elements inside of invisible frames as tabbable', function () {
                var iframe = createFromTemplate('<iframe>', true);
                var button = createFromTemplate('<button tabindex="0">Not Tabbable</button>');
                appendElements([iframe]);
                iframe.style.display = 'none';
                iframe.contentDocument.body.appendChild(button);
                expect(checker.isTabbable(iframe)).toBe(false);
                expect(checker.isTabbable(button)).toBe(false);
            });
            it('should never mark object frame elements as tabbable', function () {
                var objectEl = createFromTemplate('<object>', true);
                expect(checker.isTabbable(objectEl)).toBe(false);
            });
        }));
        describe('for Blink browsers', runIf(platform.BLINK, function () {
            it('should always mark audio elements with controls as tabbable', function () {
                var audio = createFromTemplate('<audio controls>', true);
                expect(checker.isTabbable(audio)).toBe(true);
                audio.tabIndex = -1;
                // The audio element will be still tabbable because Blink always
                // considers them as tabbable.
                expect(checker.isTabbable(audio)).toBe(true);
            });
        }));
        describe('for Internet Explorer', runIf(platform.TRIDENT, function () {
            it('should never mark video elements without controls as tabbable', function () {
                // In Internet Explorer video elements without controls are never tabbable.
                var video = createFromTemplate('<video>', true);
                expect(checker.isTabbable(video)).toBe(false);
                video.tabIndex = 0;
                expect(checker.isTabbable(video)).toBe(false);
            });
        }));
        describe('for iOS browsers', runIf(platform.IOS && platform.WEBKIT, function () {
            it('should never allow div elements to be tabbable', function () {
                var divEl = createFromTemplate('<div tabindex="0">', true);
                expect(checker.isTabbable(divEl)).toBe(false);
            });
            it('should never allow span elements to be tabbable', function () {
                var spanEl = createFromTemplate('<span tabindex="0">Text</span>', true);
                expect(checker.isTabbable(spanEl)).toBe(false);
            });
            it('should never allow button elements to be tabbable', function () {
                var buttonEl = createFromTemplate('<button tabindex="0">', true);
                expect(checker.isTabbable(buttonEl)).toBe(false);
            });
            it('should never allow anchor elements to be tabbable', function () {
                var anchorEl = createFromTemplate('<a tabindex="0">Link</a>', true);
                expect(checker.isTabbable(anchorEl)).toBe(false);
            });
        }));
    });
    /** Creates an array of elements with the given node names. */
    function createElements() {
        var nodeNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodeNames[_i] = arguments[_i];
        }
        return nodeNames.map(function (name) { return document.createElement(name); });
    }
    function createFromTemplate(template, append) {
        if (append === void 0) { append = false; }
        var tmpRoot = document.createElement('div');
        tmpRoot.innerHTML = template;
        var element = (tmpRoot.firstElementChild);
        tmpRoot.removeChild(element);
        if (append) {
            appendElements([element]);
        }
        return element;
    }
    /** Appends elements to the testContainerElement. */
    function appendElements(elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var e = elements_1[_i];
            testContainerElement.appendChild(e);
        }
    }
    function runIf(condition, runFn) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (condition) {
                runFn.apply(_this, args);
            }
        };
    }
});
//# sourceMappingURL=interactivity-checker.spec.js.map