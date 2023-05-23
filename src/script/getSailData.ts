// TODO: Can I avoid duplication?  Can I automate this from JSON data?
export type SailBoat = {
	'builder': string,
	'designer': string,
	'disp': string, 
	'disp-len': string, 
	'draft-max': string, 
	'first-built': string, 
	'last-built': string,
	'hull-type': string, 
	'id': string, 
	'loa': string, 
	'lwl': string, 
	'name': string,
}
export type SailData = {
	data: SailBoat[],
	keys: string[],
};

export function getSailDataKeys() {
	return [
		'builder',
		'designer',
		'disp', 
		'disp-len', 
		'draft-max', 
		'first-built', 
		'last-built',
		'hull-type', 
		'id', 
		'loa', 
		'lwl', 
		'name',
	];
}

export default async function getSailData() {
	const contents = await fetch('./all_sailboats.json');
	const data = await contents.json();
	return {
		data,
		keys: getSailDataKeys(),
	};
}
