"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layout_module_1 = require("./layout-module");
var breakpoints_observer_1 = require("./breakpoints-observer");
var media_matcher_1 = require("./media-matcher");
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
describe('BreakpointObserver', function () {
    var breakpointManager;
    var mediaMatcher;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [layout_module_1.LayoutModule],
            providers: [{ provide: media_matcher_1.MediaMatcher, useClass: FakeMediaMatcher }]
        });
    }));
    beforeEach(testing_1.inject([breakpoints_observer_1.BreakpointObserver, media_matcher_1.MediaMatcher], function (bm, mm) {
        breakpointManager = bm;
        mediaMatcher = mm;
    }));
    afterEach(function () {
        mediaMatcher.clear();
    });
    it('retrieves the whether a query is currently matched', function () {
        var query = 'everything starts as true in the FakeMediaMatcher';
        expect(breakpointManager.isMatched(query)).toBeTruthy();
    });
    it('reuses the same MediaQueryList for matching queries', function () {
        expect(mediaMatcher.queryCount).toBe(0);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(1);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(1);
        breakpointManager.observe('query2');
        expect(mediaMatcher.queryCount).toBe(2);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(2);
    });
    it('splits combined query strings into individual matchMedia listeners', function () {
        expect(mediaMatcher.queryCount).toBe(0);
        breakpointManager.observe('query1, query2');
        expect(mediaMatcher.queryCount).toBe(2);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(2);
        breakpointManager.observe('query2, query3');
        expect(mediaMatcher.queryCount).toBe(3);
    });
    it('accepts an array of queries', function () {
        var queries = ['1 query', '2 query', 'red query', 'blue query'];
        breakpointManager.observe(queries);
        expect(mediaMatcher.queryCount).toBe(queries.length);
    });
    it('completes all events when the breakpoint manager is destroyed', function () {
        var firstTest = jasmine.createSpy('test1');
        breakpointManager.observe('test1').subscribe(undefined, undefined, firstTest);
        var secondTest = jasmine.createSpy('test2');
        breakpointManager.observe('test2').subscribe(undefined, undefined, secondTest);
        expect(firstTest).not.toHaveBeenCalled();
        expect(secondTest).not.toHaveBeenCalled();
        breakpointManager.ngOnDestroy();
        expect(firstTest).toHaveBeenCalled();
        expect(secondTest).toHaveBeenCalled();
    });
    it('emits an event on the observable when values change', function () {
        var query = '(width: 999px)';
        var queryMatchState = false;
        breakpointManager.observe(query).subscribe(function (state) {
            queryMatchState = state.matches;
        });
        expect(queryMatchState).toBeTruthy();
        mediaMatcher.setMatchesQuery(query, false);
        expect(queryMatchState).toBeFalsy();
    });
    it('emits an event on the observable with the matching state of all queries provided', function () {
        var queryOne = '(width: 999px)';
        var queryTwo = '(width: 700px)';
        var state = { matches: false, breakpoints: {} };
        breakpointManager.observe([queryOne, queryTwo]).subscribe(function (breakpoint) {
            state = breakpoint;
        });
        mediaMatcher.setMatchesQuery(queryOne, false);
        mediaMatcher.setMatchesQuery(queryTwo, false);
        expect(state.breakpoints).toEqual((_a = {}, _a[queryOne] = false, _a[queryTwo] = false, _a));
        mediaMatcher.setMatchesQuery(queryOne, true);
        mediaMatcher.setMatchesQuery(queryTwo, false);
        expect(state.breakpoints).toEqual((_b = {}, _b[queryOne] = true, _b[queryTwo] = false, _b));
        var _a, _b;
    });
    it('emits a true matches state when the query is matched', function () {
        var query = '(width: 999px)';
        mediaMatcher.setMatchesQuery(query, true);
        expect(breakpointManager.isMatched(query)).toBeTruthy();
    });
    it('emits a false matches state when the query is not matched', function () {
        var query = '(width: 999px)';
        mediaMatcher.setMatchesQuery(query, false);
        expect(breakpointManager.isMatched(query)).toBeTruthy();
    });
});
var FakeMediaQueryList = /** @class */ (function () {
    function FakeMediaQueryList(matches, media) {
        this.matches = matches;
        this.media = media;
    }
    /** Toggles the matches state and "emits" a change event. */
    /** Toggles the matches state and "emits" a change event. */
    FakeMediaQueryList.prototype.setMatches = /** Toggles the matches state and "emits" a change event. */
    function (matches) {
        this.matches = matches;
        this.addListenerCallback(this);
    };
    /** Registers the callback method for change events. */
    /** Registers the callback method for change events. */
    FakeMediaQueryList.prototype.addListener = /** Registers the callback method for change events. */
    function (callback) {
        this.addListenerCallback = callback;
    };
    /** Noop, but required for implementing MediaQueryList. */
    /** Noop, but required for implementing MediaQueryList. */
    FakeMediaQueryList.prototype.removeListener = /** Noop, but required for implementing MediaQueryList. */
    function () { };
    return FakeMediaQueryList;
}());
exports.FakeMediaQueryList = FakeMediaQueryList;
var FakeMediaMatcher = /** @class */ (function () {
    function FakeMediaMatcher() {
        /** A map of match media queries. */
        this.queries = new Map();
    }
    Object.defineProperty(FakeMediaMatcher.prototype, "queryCount", {
        /** The number of distinct queries created in the media matcher during a test. */
        get: /** The number of distinct queries created in the media matcher during a test. */
        function () {
            return this.queries.size;
        },
        enumerable: true,
        configurable: true
    });
    /** Fakes the match media response to be controlled in tests. */
    /** Fakes the match media response to be controlled in tests. */
    FakeMediaMatcher.prototype.matchMedia = /** Fakes the match media response to be controlled in tests. */
    function (query) {
        var mql = new FakeMediaQueryList(true, query);
        this.queries.set(query, mql);
        return mql;
    };
    /** Clears all queries from the map of queries. */
    /** Clears all queries from the map of queries. */
    FakeMediaMatcher.prototype.clear = /** Clears all queries from the map of queries. */
    function () {
        this.queries.clear();
    };
    /** Toggles the matching state of the provided query. */
    /** Toggles the matching state of the provided query. */
    FakeMediaMatcher.prototype.setMatchesQuery = /** Toggles the matching state of the provided query. */
    function (query, matches) {
        if (this.queries.has(query)) {
            this.queries.get(query).setMatches(matches);
        }
    };
    FakeMediaMatcher.decorators = [
        { type: core_1.Injectable },
    ];
    return FakeMediaMatcher;
}());
exports.FakeMediaMatcher = FakeMediaMatcher;
//# sourceMappingURL=breakpoints-observer.spec.js.map