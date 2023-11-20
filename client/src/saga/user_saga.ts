import { getUserAsync, updateUserAsync } from "../services/api_client";
import { takeEvery, put, call } from "redux-saga/effects";
import {
    getUserFailure,
    getUserSuccess,
    createUserFailure,
    createUserRequest,
    createUserSuccess,
} from "../state/users_state";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import { UserResponseDto } from "../dtos/responses/user_response_dto";
import { User } from "../dtos/user";

function* getUser(action: {
    type: string;
    payload: any;
}): Generator<any, void, ApiResultWrapper<User[]>> {
    let response: ApiResultWrapper<User[]> = {
        data: undefined,
        error: undefined,
    };
    try {
        response = yield call(getUserAsync, action.payload);
        yield put(getUserSuccess(response.data));
    } catch {
        yield put(getUserFailure(response.error));
    }
}
// export function* updateCollection(action: {
//     type: string;
//     payload: CollectionResponseDto;
// }): Generator<any, void, ApiResultWrapper<UpdateCollectionDto>> {
//     let response: ApiResultWrapper<UpdateCollectionDto> = {
//         data: undefined,
//         error: undefined,
//     };
//     try {
//         response = yield call(
//             createUserRequest,
//             action.payload._id,
//             action.payload
//         );
//         yield put(updateCollectionSuccess(response.data));
//     } catch {
//         yield put(updateCollectionFailure(response.error));
//     }
// }

export function* collectionSaga() {
    yield takeEvery("user/getUserRequest", getUser);
    // yield takeEvery("editCollection/updateCollectionRequest", updateCollection);
}
