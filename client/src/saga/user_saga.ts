import { takeEvery, put, call, all } from "redux-saga/effects";
import { getUsersAsync, updateUser } from "../services/api_client";
import { UpdateUserDto } from "../dtos/requests/update_user_dto";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import { User } from "../dtos/user";
import { getUsersFailure, getUsersSuccess } from "../state/users_state";

function* blockUsers(action: {
    type: string;
    payload: string[];
}): Generator<any, void, ApiResultWrapper<any>> {
    try {
        const userIds = action.payload;

        // Create an array of promises for blocking users
        const payload = { status: "Blocked" } as UpdateUserDto;
        const blockPromises = userIds.map((userId) =>
            call(updateUser, userId, payload)
        );

        // Wait for all promises to resolve
        yield all(blockPromises);
    } catch (error) {
        // Dispatch a failure action
    }
}

// function* unblockUser(action: { type: string; payload: string[] }) {
//     try {
//         const userIds = action.payload;

//         const payload = { status: "Active" } as UpdateUserRequest;
//         const unblockPromises = userIds.map((userId) =>
//             call(updateUser, userId, payload)
//         );

//         yield all(unblockPromises);

//         yield put(unblockUsersSuccess(userIds));
//     } catch (error) {
//         yield put(unblockUsersFailure(error as string));
//     }
// }

function* getUsers(action: {
    type: string;
    payload: string[];
}): Generator<any, void, ApiResultWrapper<User[]>> {
    try {
        const response = yield call(getUsersAsync);
        yield put(getUsersSuccess(response.data));
    } catch (error) {
        yield put(getUsersFailure({}));
    }
}

export function* userSaga() {
    yield takeEvery("users/blockUsersRequest", blockUsers);
    //yield takeEvery("users/unblockUsersRequest", unblockUser);
    yield takeEvery("users/getUsersRequest", getUsers);
}
