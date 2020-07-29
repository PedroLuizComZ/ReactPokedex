import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loader() {
	return (
		<div className={"loader-container"}>
			<CircularProgress />
		</div>
	);
}

export default Loader;
