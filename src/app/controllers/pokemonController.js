import { pokemonDetailResquest } from "../services/pokemonService";

export const pokemonDetailController = async (pokemon) => {
	const response = await pokemonDetailResquest(pokemon);
	switch (response) {
		case false:
			return false;
		default:
			return response.data;
	}
};
