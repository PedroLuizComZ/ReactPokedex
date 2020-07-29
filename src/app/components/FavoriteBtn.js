import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Fab from "@material-ui/core/Fab";
import { NavLink } from "react-router-dom";

function FavoriteBtn() {
	return (
		<NavLink to={"../favoritos"}>
			<Fab aria-label="like">
				<FavoriteIcon />
			</Fab>
		</NavLink>
	);
}

export default FavoriteBtn;
