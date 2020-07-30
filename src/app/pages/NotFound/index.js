import React from "react";
import PokedexLogo from "../../assets/images/Pokédex_logo.png";
import { NavLink } from "react-router-dom";

function NotFound() {
	return (
		<div className={"container"}>
			<NavLink to={"../"}>
				<img
					alt={"PokedexLogo"}
					src={PokedexLogo}
					className={"detail-header__image"}
				/>
			</NavLink>
			<h1 className={"favorite__text"}>PAginá não encontrada</h1>
		</div>
	);
}

export default NotFound;
