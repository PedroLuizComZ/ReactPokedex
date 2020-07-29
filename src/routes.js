import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./app/pages/Home/index";
import Detail from "./app/pages/Detail/index";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/detalhe/:id" component={Detail} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
