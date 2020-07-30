import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./app/pages/Home/index";
import Detail from "./app/pages/Detail/index";
import Favorites from "./app/pages/Favorites/index";
import NotFound from "./app/pages/NotFound/index";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/detalhe/:id" component={Detail} />
				<Route path="/favoritos" component={Favorites} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
