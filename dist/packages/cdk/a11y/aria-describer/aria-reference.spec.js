"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aria_reference_1 = require("./aria-reference");
describe('AriaReference', function () {
    var testElement;
    beforeEach(function () {
        testElement = document.createElement('div');
        document.body.appendChild(testElement);
    });
    afterEach(function () {
        document.body.removeChild((testElement));
    });
    it('should be able to append/remove aria reference IDs', function () {
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', 'reference_1');
        expectIds('aria-describedby', ['reference_1']);
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', 'reference_2');
        expectIds('aria-describedby', ['reference_1', 'reference_2']);
        aria_reference_1.removeAriaReferencedId((testElement), 'aria-describedby', 'reference_1');
        expectIds('aria-describedby', ['reference_2']);
        aria_reference_1.removeAriaReferencedId((testElement), 'aria-describedby', 'reference_2');
        expectIds('aria-describedby', []);
    });
    it('should trim whitespace when adding/removing reference IDs', function () {
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', '    reference_1   ');
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', '    reference_2   ');
        expectIds('aria-describedby', ['reference_1', 'reference_2']);
        aria_reference_1.removeAriaReferencedId((testElement), 'aria-describedby', '   reference_1   ');
        expectIds('aria-describedby', ['reference_2']);
        aria_reference_1.removeAriaReferencedId((testElement), 'aria-describedby', '   reference_2   ');
        expectIds('aria-describedby', []);
    });
    it('should ignore empty string', function () {
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', '  ');
        expectIds('aria-describedby', []);
    });
    it('should not add the same reference id if it already exists', function () {
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', 'reference_1');
        aria_reference_1.addAriaReferencedId((testElement), 'aria-describedby', 'reference_1');
        expect(['reference_1']);
    });
    it('should retrieve ids that are deliminated by extra whitespace', function () {
        testElement.setAttribute('aria-describedby', 'reference_1      reference_2');
        expect(aria_reference_1.getAriaReferenceIds((testElement), 'aria-describedby'))
            .toEqual(['reference_1', 'reference_2']);
    });
    /**
       * Expects the equal array from getAriaReferenceIds and a space-deliminated list from
       * the actual element attribute. If ids is empty, assumes the element should not have any
       * value
       */
    function expectIds(attr, ids) {
        expect(aria_reference_1.getAriaReferenceIds((testElement), attr)).toEqual(ids);
        expect(testElement.getAttribute(attr)).toBe(ids.length ? ids.join(' ') : '');
    }
});
//# sourceMappingURL=aria-reference.spec.js.map