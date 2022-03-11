import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import throttle from 'lodash.throttle';
import { saveState, loadState } from './localstorage';
const authMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith("authentication/")) {
		const authState = store.getState().auth;
		localStorage.setItem("auth", JSON.stringify(authState));
	}
	return result;
};
const store = configureStore({
	reducer: {
		auth: authSlice
	},
	preloadedState: loadState(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authMiddleware),
});
store.subscribe(
	throttle( () => saveState(store.getState()), 1000)
);

export default store;
