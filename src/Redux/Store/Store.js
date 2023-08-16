import { applyMiddleware, createStore } from "redux";
import { cartReducer } from "../Reducer/Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
const store: Store = createStore(
  cartReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
