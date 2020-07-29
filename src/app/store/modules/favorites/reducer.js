export default function favorites(state = [], action) {
	switch (action.type) {
		case "ADD_TO_FAVORITES":
			return [...state, action.pokemon];
		case "REMOVE_OF_FAVORITES":
			const Newstate = state.filter(function (obj) {
				return obj.name !== action.pokemon.name;
			});
			return [...Newstate];
		default:
			return state;
	}
}
