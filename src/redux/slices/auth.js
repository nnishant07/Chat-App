import { createSlice } from '@reduxjs/toolkit';
import axios from "../../utils/axios";
// import axios from "axios";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
        }
    }
});

// Reducer
export default slice.reducer;

// Login
export function LoginUser(formValues) {
    // formValues => {email, password}
    return async (dispatch, getState) => {
        await axios.post("/auth/login", {
            ...formValues,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            console.log(response);
            dispatch(slice.actions.logIn({
                isLoggedIn: true,
                token: response.data.token,
            }))
        }).catch(function (error) {
            console.log(error);
        });
    };
}

export function LogoutUser() {
    return async(dispatch, getState) => {
        dispatch(slice.actions.signOut());
    }
}