import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleWare = [thunk];

// const store = createStore(
// 	rootReducers,
// 	compose(applyMiddleware(...middleWare),
// 	),
// );

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const configureStore = () => {
	let store = createStore(persistedReducer,compose(applyMiddleware(...middleWare),));
	let persistor = persistStore(store);
	return { store, persistor };
};

export default configureStore