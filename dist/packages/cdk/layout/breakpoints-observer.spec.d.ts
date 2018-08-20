export declare class FakeMediaQueryList implements MediaQueryList {
    matches: any;
    media: any;
    /** The callback for change events. */
    addListenerCallback?: (mql: MediaQueryList) => void;
    constructor(matches: any, media: any);
    /** Toggles the matches state and "emits" a change event. */
    setMatches(matches: boolean): void;
    /** Registers the callback method for change events. */
    addListener(callback: (mql: MediaQueryList) => void): void;
    /** Noop, but required for implementing MediaQueryList. */
    removeListener(): void;
}
export declare class FakeMediaMatcher {
    /** A map of match media queries. */
    private queries;
    /** The number of distinct queries created in the media matcher during a test. */
    readonly queryCount: number;
    /** Fakes the match media response to be controlled in tests. */
    matchMedia(query: string): FakeMediaQueryList;
    /** Clears all queries from the map of queries. */
    clear(): void;
    /** Toggles the matching state of the provided query. */
    setMatchesQuery(query: string, matches: boolean): void;
}
