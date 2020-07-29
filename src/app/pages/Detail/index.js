import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import BorderLinearProgress from "@material-ui/core/LinearProgress";
import { pokemonDetailController } from "../../controllers/pokemonController";
import PokedexLogo from "../../assets/images/Pokédex_logo.png";

function Detail(props) {
	useEffect(() => {
		getPokemonDetail(props.match.params.id);
	}, []);

	const [pokemonData, setPokemonData] = useState([]);
	const favorites = useSelector((state) => state);
	const dispatch = useDispatch();

	async function getPokemonDetail(pokemonId) {
		const response = await pokemonDetailController(pokemonId);
		setPokemonData(response);
	}

	function addToFavorites(pokemon) {
		dispatch({
			type: "ADD_TO_FAVORITES",
			pokemon: pokemon,
		});
	}

	return (
		<>
			{pokemonData.length !== 0 ? (
				<>
					<header className={"container detail-header"}>
						<NavLink to={"/"}>
							<img
								src={PokedexLogo}
								className={"detail-header__image"}
							/>
						</NavLink>
					</header>
					<div
						className={
							"detail container-detail " +
							pokemonData.types[0].type.name
						}
					>
						<div className={"detail__image "}>
							<img
								className={"detail__image--proportion"}
								src={pokemonData.sprites.front_default}
							/>
						</div>
						<div className={"description"}>
							<h2 className={"description__title"}>
								{pokemonData.name}{" "}
								<span className={"description__identifier"}>
									#{String(pokemonData.id).padStart(3, "0")}
								</span>
							</h2>
							<div className={"label-container"}>
								{pokemonData.types.map((type) => (
									<p
										key={type.type.name}
										className={
											"description__label-container"
										}
									>
										<label
											className={
												"description__label " +
												type.type.name
											}
										>
											{type.type.name}
										</label>
									</p>
								))}
							</div>
							<p>Height : {pokemonData.height}</p>
							<div className={"description__status-container"}>
								{pokemonData.stats.map((stat) => (
									<div
										key={stat.stat.name}
										className={"description__status-item"}
									>
										<span className={"status__name"}>
											{stat.stat.name}
										</span>
										<label className={"status__value"}>
											{stat.base_stat}
										</label>
										<div className={"status__slider"}>
											<BorderLinearProgress
												variant="determinate"
												value={
													(100 * stat.base_stat) / 260
												}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				"CArregando"
			)}
		</>
	);
}

export default Detail;
