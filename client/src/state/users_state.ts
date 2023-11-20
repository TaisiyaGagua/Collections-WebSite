import { createSlice } from "@reduxjs/toolkit";
import { User } from "../dtos/user";

const initialState: User = {
    id: "",
    username: "",
    email: "",
    password: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUserRequest: (_, action) => {},
        createUserSuccess: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        createUserFailure: (state, action) => {},

        getUserRequest: (_, action) => {},
        getUserSuccess: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        getUserFailure: (state, action) => {},
    },
});

export const {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    getUserRequest,
    getUserSuccess,
    getUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
