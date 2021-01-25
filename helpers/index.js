export const getValueFromArray = (arr = [], key) => {
	console.log(
		'getValueFromArray',
		arr,
		arr.filter((arrvalue) => (arrvalue.label = 'Kiruba'))
	);
};

export const removeEmptySpace = (value = ' ') => (value && parseInt(value.replace(/\D/g, ''))) || 0;
