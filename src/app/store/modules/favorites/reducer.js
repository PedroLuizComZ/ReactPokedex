export default function favorites(state = [], action) {
	console.log(state);
	switch (action.type) {
		case "ADD_TO_FAVORITES":
			return [...state, action.pokemon];
			break;
		default:
			return state;
			break;
	}
}
