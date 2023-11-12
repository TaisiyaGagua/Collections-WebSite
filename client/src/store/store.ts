import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "../state/users_state";
import { userSaga } from "../saga/user_saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        users: userReducer,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(userSaga);

export default store;
