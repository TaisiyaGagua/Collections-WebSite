import { createSlice } from "@reduxjs/toolkit";
import { User } from "../dtos/user";

const initialState: User[] = [];

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        getUsersRequest: () => {},
        getUsersSuccess: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        getUsersFailure: (state, action) => {},
     
    },
});

export const {

    getUsersRequest,
    getUsersSuccess,
    getUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
