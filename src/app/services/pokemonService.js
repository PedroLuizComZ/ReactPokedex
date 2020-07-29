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
			.catch((error) => {
				resolve(false);
			});
	});
};
