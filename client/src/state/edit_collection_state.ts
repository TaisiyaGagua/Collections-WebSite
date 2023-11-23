import { createSlice } from "@reduxjs/toolkit";
import { CollectionResponseDto } from "../dtos/responses/collection_response_dto";

type InitialCollectionState = CollectionResponseDto & {
    isLoaded: boolean;
};

const initialState: InitialCollectionState = {
    _id: "",
    name: "",
    description: "",
    config: "",
    isLoaded: false,
};

const editCollectionSlice = createSlice({
    name: "editCollection",
    initialState: initialState,
    reducers: {
        getCollectionRequest: (_, action) => {},
        getCollectionSuccess: (state, action) => {
            state.description = action.payload.description;
            state.name = action.payload.name;
            state.config = action.payload.config;
            state.isLoaded = true;
        },
        getCollectionFailure: (state, action) => {},
        updateCollectionRequest: (state, action) => {},
        updateCollectionSuccess: (state, action) => {
            state.description = action.payload.description;
            state.name = action.payload.name;
            state.config = action.payload.config;
            state.isLoaded = true;
        },
        updateCollectionFailure: (state, action) => {},
    },
});

export const {
    getCollectionRequest,
    getCollectionSuccess,
    getCollectionFailure,
    updateCollectionRequest,
    updateCollectionSuccess,
    updateCollectionFailure,
} = editCollectionSlice.actions;

export default editCollectionSlice.reducer;
