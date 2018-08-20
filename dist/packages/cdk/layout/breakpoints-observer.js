"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var media_matcher_1 = require("./media-matcher");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var coercion_1 = require("@angular/cdk/coercion");
var i0 = require("@angular/core");
var i1 = require("./media-matcher");
/** Utility for checking the matching state of @media queries. */
var BreakpointObserver = /** @class */ (function () {
    function BreakpointObserver(mediaMatcher, zone) {
        this.mediaMatcher = mediaMatcher;
        this.zone = zone;
        /**  A map of all media queries currently being listened for. */
        this._queries = new Map();
        /** A subject for all other observables to takeUntil based on. */
        this._destroySubject = new rxjs_1.Subject();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    /** Completes the active subject, signalling to all other observables to complete. */
    BreakpointObserver.prototype.ngOnDestroy = /** Completes the active subject, signalling to all other observables to complete. */
    function () {
        this._destroySubject.next();
        this._destroySubject.complete();
    };
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    /**
       * Whether one or more media queries match the current viewport size.
       * @param value One or more media queries to check.
       * @returns Whether any of the media queries match.
       */
    BreakpointObserver.prototype.isMatched = /**
       * Whether one or more media queries match the current viewport size.
       * @param value One or more media queries to check.
       * @returns Whether any of the media queries match.
       */
    function (value) {
        var _this = this;
        var queries = splitQueries(coercion_1.coerceArray(value));
        return queries.some(function (mediaQuery) { return _this._registerQuery(mediaQuery).mql.matches; });
    };
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    /**
       * Gets an observable of results for the given queries that will emit new results for any changes
       * in matching of the given queries.
       * @param value One or more media queries to check.
       * @returns A stream of matches for the given queries.
       */
    BreakpointObserver.prototype.observe = /**
       * Gets an observable of results for the given queries that will emit new results for any changes
       * in matching of the given queries.
       * @param value One or more media queries to check.
       * @returns A stream of matches for the given queries.
       */
    function (value) {
        var _this = this;
        var queries = splitQueries(coercion_1.coerceArray(value));
        var observables = queries.map(function (query) { return _this._registerQuery(query).observable; });
        return rxjs_1.combineLatest(observables).pipe(operators_1.map(function (breakpointStates) {
            var response = {
                matches: false,
                breakpoints: {},
            };
            breakpointStates.forEach(function (state) {
                response.matches = response.matches || state.matches;
                response.breakpoints[state.query] = state.matches;
            });
            return response;
        }));
    };
    /** Registers a specific query to be listened for. */
    /** Registers a specific query to be listened for. */
    BreakpointObserver.prototype._registerQuery = /** Registers a specific query to be listened for. */
    function (query) {
        var _this = this;
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return this._queries.get(query);
        }
        var mql = this.mediaMatcher.matchMedia(query);
        // Create callback for match changes and add it is as a listener.
        var queryObservable = rxjs_1.fromEventPattern(
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        function (listener) {
            mql.addListener(function (e) { return _this.zone.run(function () { return listener(e); }); });
        }, function (listener) {
            mql.removeListener(function (e) { return _this.zone.run(function () { return listener(e); }); });
        })
            .pipe(operators_1.takeUntil(this._destroySubject), operators_1.startWith(mql), operators_1.map(function (nextMql) { return ({ query: query, matches: nextMql.matches }); }));
        // Add the MediaQueryList to the set of queries.
        var output = { observable: queryObservable, mql: mql };
        this._queries.set(query, output);
        return output;
    };
    BreakpointObserver.decorators = [
        { type: core_1.Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    BreakpointObserver.ctorParameters = function () { return [
        { type: media_matcher_1.MediaMatcher, },
        { type: core_1.NgZone, },
    ]; };
    BreakpointObserver.ngInjectableDef = i0.defineInjectable({ factory: function BreakpointObserver_Factory() { return new BreakpointObserver(i0.inject(i1.MediaMatcher), i0.inject(i0.NgZone)); }, token: BreakpointObserver, providedIn: "root" });
    return BreakpointObserver;
}());
exports.BreakpointObserver = BreakpointObserver;
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
    return queries.map(function (query) { return query.split(','); })
        .reduce(function (a1, a2) { return a1.concat(a2); })
        .map(function (query) { return query.trim(); });
}
//# sourceMappingURL=breakpoints-observer.js.map