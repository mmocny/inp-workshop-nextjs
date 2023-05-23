import Fuse from 'fuse.js';
import { SailBoat, getSailDataKeys } from './getSailData';

export type SearchResult = { score?: number | undefined, item: SailBoat };

const defaultOptions = {
	isCaseSensitive: false,
	includeScore: true,
	shouldSort: true,
	includeMatches: false,
	// findAllMatches: true,
	minMatchCharLength: 0,
	// location: 0,
	threshold: 0.3,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [],
};

export function scoreMatch(data: SailBoat, searchTerm: string) {
	const target = performance.now() + 0.1;
	const fuse = new Fuse([data], {
		...defaultOptions,
		keys: getSailDataKeys(),
	});

	// Add a little bit of latency to search.
	// This just helps demonstrate the issue on faster machines.
	while (performance.now() < target);

	return fuse.search(searchTerm)[0];
}