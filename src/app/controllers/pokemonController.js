import {
	pokemonDetailResquest,
	pokemonEvolutionChainResquest,
	pokemonSpeciesResquest,
} from "../services/pokemonService";

export const pokemonDetailController = async (pokemon) => {
	const response = await pokemonDetailResquest(pokemon);
	switch (response) {
		case false:
			return false;
		default:
			return response.data;
	}
};

export const pokemonSpeciesController = async (url) => {
	const response = await pokemonSpeciesResquest(url);
	switch (response) {
		case false:
			return false;
		default:
			return await pokemonEvolutionChainController(
				response.data.evolution_chain.url
			);
	}
};

export const pokemonEvolutionChainController = async (url) => {
	const response = await pokemonEvolutionChainResquest(url);
	switch (response) {
		case false:
			return false;
		default:
			return response.data;
	}
};
