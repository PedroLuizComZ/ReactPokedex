import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { NavLink } from "react-router-dom";

function BackBtn() {
	return (
		<NavLink className={"go-babk-btn"} to={"../"}>
			<ArrowBackIosIcon />
		</NavLink>
	);
}

export default BackBtn;
