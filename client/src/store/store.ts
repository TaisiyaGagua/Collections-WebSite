import { configureStore } from "@reduxjs/toolkit";
import editCollectionReducer from "../state/edit_collection_state";
import createSagaMiddleware from "redux-saga";
import { collectionSaga } from "../saga/collection_saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        editCollectionState: editCollectionReducer,

    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(collectionSaga);

export default store;
