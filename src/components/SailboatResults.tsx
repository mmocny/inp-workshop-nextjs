import { SearchResult } from "../script/searchResults";

export function SailboatResults({ results }: { results: SearchResult[] }) {
	return (
		<div className="result summary">Results ({results.length}):</div>
	);
}
