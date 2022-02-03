import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = { isAuthenticated: false,token:'',userdata:{} };

const authSlice = createSlice({
	name: "authentication",
	initialState: initialAuthState,
	reducers: {
		login(state,action) {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.userdata = action.payload.result;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.token = '';
			state.userdata = {};
		},
	},
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
