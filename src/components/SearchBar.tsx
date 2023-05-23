type SearchBarProps = {
	searchTerm: string,
	onInput: (e: any) => void,
};

export function SearchBar({ searchTerm, onInput: onInput }: SearchBarProps) {
	return (
		<form className="rounded" onSubmit={(e) => e.preventDefault()} action="#">
			<input className="searchbox shadow text-xl font-medium text-gray-900 dark:text-white" onInput={onInput} value={searchTerm} type="text" placeholder="Search"></input>
		</form>
	);
}