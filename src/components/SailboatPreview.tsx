import { SearchResult } from "../script/searchResults";

export function SailboatPreview({ result }: { result: SearchResult }) {
	const boat = result.item;
	return (
		<div className="result item block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
			<div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{boat.name}</div>
			<div className="font-normal text-gray-700 dark:text-gray-400">
				<div>Designer: <span className="font-bold">{boat.designer}</span></div>
				<div>Builder: <span className="font-bold ">{boat.builder}</span></div>
				<div>Years: <span className="font-bold ">{boat["first-built"]} - {boat["last-built"]}</span></div>
			</div>
		</div>
	);
}