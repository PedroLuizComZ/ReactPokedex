import React from "react";
import Routes from "./routes";
import "./app/assets/style.css";
import { Provider } from "react-redux";
import store from "./app/store/";

function App() {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	);
}

export default App;
