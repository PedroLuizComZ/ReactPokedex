import React, { useState, useEffect } from "react";
import PokedexLogo from "../../assets/images/Pokédex_logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Favorites() {
	const [pokemonList, setPokemonList] = useState([]);
	const favorites = useSelector((state) => state);

	useEffect(() => {
		setPokemonList([...favorites]);
	}, [favorites]);

	return (
		<div className={"container"}>
			<header className={"container detail-header"}>
				<NavLink to={"/"}>
					<img
						src={PokedexLogo}
						alt={"PokedexLogo"}
						className={"detail-header__image"}
					/>
				</NavLink>
			</header>
			<h1 className={"favorite__text"}>Meus Pokemons Favoritos</h1>
			{pokemonList.length !== 0 ? (
				<section className={"grid"}>
					{pokemonList.map((pokemon, count) => (
						<NavLink
							className={
								"grid-item " + pokemon.types[0].type.name
							}
							key={count}
							to={"detalhe/" + pokemon.id}
						>
							<h2 className={"grid-item__title"}>
								{pokemon.name}
							</h2>
							<div className={"item-separator"}>
								<div className={"grid-item__label-container"}>
									{pokemon.types.map((type) => (
										<label
											key={type.type.name}
											className={
												"grid-item__label " +
												type.type.name
											}
										>
											{type.type.name}
										</label>
									))}
								</div>
								<img
									alt={pokemon.name}
									className={"grid-item__image"}
									src={pokemon.sprites.front_default}
								/>
							</div>
						</NavLink>
					))}
				</section>
			) : (
				<h2 className={"favorite__text"}>
					Você não tem Pokemons adicionados como favoritos
				</h2>
			)}
		</div>
	);
}

export default Favorites;
