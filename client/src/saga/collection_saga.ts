import {
    getCollectionAsync,
    updateCollectionAsync,
} from "../services/api_client";
import { takeEvery, put, call } from "redux-saga/effects";
import {
    getCollectionFailure,
    getCollectionSuccess,
    updateCollectionFailure,
    updateCollectionSuccess,
} from "../state/edit_collection_state";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import { CollectionResponseDto } from "../dtos/responses/collection_response_dto";
import { UpdateCollectionDto } from "../dtos/requests/update_collection_dto";

function* getCollection(action: {
    type: string;
    payload: any;
}): Generator<any, void, ApiResultWrapper<CollectionResponseDto>> {
    let response: ApiResultWrapper<CollectionResponseDto> = {
        data: undefined,
        error: undefined,
    };
    try {
        response = yield call(getCollectionAsync, action.payload);
        yield put(getCollectionSuccess(response.data));
    } catch {
        yield put(getCollectionFailure(response.error));
    }
}
export function* updateCollection(action: {
    type: string;
    payload: CollectionResponseDto;
}): Generator<any, void, ApiResultWrapper<UpdateCollectionDto>> {
    let response: ApiResultWrapper<UpdateCollectionDto> = {
        data: undefined,
        error: undefined,
    };
    try {
        response = yield call(
            updateCollectionAsync,
            action.payload._id,
            action.payload
        );
        yield put(updateCollectionSuccess(response.data));
    } catch {
        yield put(updateCollectionFailure(response.error));
    }
}

export function* collectionSaga() {
    yield takeEvery("editCollection/getCollectionRequest", getCollection);
    yield takeEvery("editCollection/updateCollectionRequest", updateCollection);
}
