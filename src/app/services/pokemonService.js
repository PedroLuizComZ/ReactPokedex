import api from "./api";

export const pokemonDetailResquest = async (pokemon) => {
	return new Promise(async function (resolve, reject) {
		api.get("pokemon/" + pokemon, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				resolve(response);
			})
			.catch((_error) => {
				resolve(false);
			});
	});
};

export const pokemonSpeciesResquest = async (url) => {
	return new Promise(async function (resolve, reject) {
		api.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				resolve(response);
			})
			.catch((_error) => {
				resolve(false);
			});
	});
};

export const pokemonEvolutionChainResquest = async (url) => {
	return new Promise(async function (resolve, reject) {
		api.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				resolve(response);
			})
			.catch((_error) => {
				resolve(false);
			});
	});
};
