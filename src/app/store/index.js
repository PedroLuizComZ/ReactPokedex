import { createStore } from "redux";

import reducer from "./modules/favorites/reducer";

const store = createStore(reducer);

export default store;
