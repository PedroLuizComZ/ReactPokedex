import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import BorderLinearProgress from "@material-ui/core/LinearProgress";
import {
	pokemonDetailController,
	pokemonSpeciesController,
} from "../../controllers/pokemonController";
import PokedexLogo from "../../assets/images/Pokédex_logo.png";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBtn from "../../components/FavoriteBtn";
import Loader from "../../components/Loader";

function Detail(props) {
	useEffect(() => {
		getPokemonDetail(props.match.params.id);
	}, []);

	const [pokemonData, setPokemonData] = useState([]);
	const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState([]);
	const favorites = useSelector((state) => state);
	const dispatch = useDispatch();

	async function getPokemonDetail(pokemonId) {
		const response = await pokemonDetailController(pokemonId);
		getPokemonEvolutionChain(response.species.url);
		setPokemonData(response);
	}

	async function getPokemonEvolutionChain(url) {
		const response = await pokemonSpeciesController(url);
		setPokemonEvolutionChain(response.chain);
	}

	function addToFavorites(pokemon) {
		dispatch({
			type: "ADD_TO_FAVORITES",
			pokemon: pokemon,
		});
	}

	function removeOfFavorites(pokemon) {
		dispatch({
			type: "REMOVE_OF_FAVORITES",
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
								alt={"PokedexLogo"}
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
						<div className={"favorite-container"}>
							{favorites.find(
								(element) => element.name === pokemonData.name
							) !== undefined ? (
								<FavoriteIcon
									onClick={() =>
										removeOfFavorites(pokemonData)
									}
								/>
							) : (
								<FavoriteBorderIcon
									onClick={() => addToFavorites(pokemonData)}
								/>
							)}
						</div>
						<div className={"detail__image "}>
							<img
								alt={pokemonData.name}
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
							<p className={"description-height"}>
								Height : {pokemonData.height}
							</p>
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
							{pokemonEvolutionChain.length !== 0 ? (
								<div className={"evolution-chain-container"}>
									<h2>Evolution Chain</h2>
									<h3
										className={
											"initial-evolution-name " +
											pokemonData.types[0].type.name
										}
									>
										{pokemonEvolutionChain.species.name}
									</h3>
									{pokemonEvolutionChain.evolves_to.length !==
									0 ? (
										<ArrowDownwardIcon />
									) : (
										<></>
									)}
									<div className={"evolution-chain-list"}>
										{pokemonEvolutionChain.evolves_to.map(
											(middleEvolution) => (
												<h3
													key={middleEvolution}
													className={
														"middle-evolution-name " +
														pokemonData.types[0]
															.type.name
													}
												>
													{
														middleEvolution.species
															.name
													}
												</h3>
											)
										)}
									</div>
									{pokemonEvolutionChain.evolves_to.map(
										(middleEvolution, count) =>
											middleEvolution.evolves_to
												.length !== 0 && count === 0 ? (
												<ArrowDownwardIcon
													key={count}
												/>
											) : (
												<></>
											)
									)}
									<div className={"evolution-chain-list"}>
										{pokemonEvolutionChain.evolves_to.map(
											(middleEvolution) =>
												middleEvolution.evolves_to.map(
													(finalEvolution) => (
														<h3
															key={finalEvolution}
															className={
																"final-evolution-name " +
																pokemonData
																	.types[0]
																	.type.name
															}
														>
															{
																finalEvolution
																	.species
																	.name
															}
														</h3>
													)
												)
										)}
									</div>
								</div>
							) : (
								<Loader />
							)}
						</div>
					</div>
				</>
			) : (
				<Loader />
			)}
			<FavoriteBtn />
		</>
	);
}

export default Detail;
