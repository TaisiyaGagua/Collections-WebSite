import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import config from "../config.json";
import { CheckUserDto } from "../dtos/requests/check_user_dto";
import { CheckUserResponse } from "../dtos/responses/check_user_response";
import { UpdateUserDto } from "../dtos/requests/update_user_dto";
import { CreateUserDto } from "../dtos/requests/create_user_dto";
import { UserResponseDto } from "../dtos/responses/user_response_dto";
import { CollectionResponseDto } from "../dtos/responses/collection_response_dto";
import { CollectionIdResponseDto } from "../dtos/responses/collection_id_response";
import { CreateCollectionDto } from "../dtos/requests/create_collection_dto";
import { CreateCollectionResponse } from "../dtos/responses/create_collection_response";
import { ItemDto } from "../dtos/requests/create_item_dto";
import { CreateItemResponse } from "../dtos/responses/create_item_response";
import { UpdateCollectionDto } from "../dtos/requests/update_collection_dto";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const headers: RawAxiosRequestHeaders | AxiosHeaders = {
    Accept: "application/json",
};

export async function getUserAsync(
    userId: string
): Promise<ApiResultWrapper<UserResponseDto>> {
    let url = baseUrl + "/" + config.getUserEndpoint;
    url = url.replace("{userId}", userId);

    try {
        const response = await axios.get<UserResponseDto>(url, {
            headers,
        });

        const result: ApiResultWrapper<UserResponseDto> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<UserResponseDto> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function createUserAsync(
    userToCreate: CreateUserDto
): Promise<ApiResultWrapper<CheckUserResponse>> {
    const url = baseUrl + "/" + config.addUserEndpoint;

    try {
        const response = await axios.post(url, userToCreate, { headers });

        const result: ApiResultWrapper<CheckUserResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function checkUserAsync(
    payload: CheckUserDto
): Promise<ApiResultWrapper<CheckUserResponse>> {
    const url = baseUrl + "/" + config.checkEndpoint;

    try {
        const response = await axios.post(url, payload, { headers });

        const result: ApiResultWrapper<CheckUserResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CheckUserResponse> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function updateUserAsync(
    userId: string | null,
    payload: UpdateUserDto
): Promise<ApiResultWrapper<any>> {
    let url = baseUrl + "/" + config.updateUserEndpoint;
    if (userId) {
        url = url.replace("{userId}", userId);
    }
    try {
        const response = await axios.put(url, payload, { headers });

        const result: ApiResultWrapper<any> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function deleteUserAsync(userId: string | null) {
    let url = baseUrl + "/" + config.deleteUserEndpoint;
    if (userId) url = url.replace("{userId}", userId);

    try {
        const response = await axios.delete(url);

        const result: ApiResultWrapper<CheckUserResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CheckUserResponse> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function getCollectionByUserIdAsync(
    userId: string
): Promise<ApiResultWrapper<CollectionIdResponseDto>> {
    let url = baseUrl + "/" + config.getCollectionIdEndpoint;
    url = url.replace("{userId}", userId);

    try {
        const response = await axios.get(url);

        const result: ApiResultWrapper<CollectionIdResponseDto> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function getCollectionAsync(
    collection_id: string
): Promise<ApiResultWrapper<CollectionResponseDto>> {
    let url = baseUrl + "/" + config.getCollectionEndpoint;
    url = url.replace("{collectionId}", collection_id);

    try {
        const response = await axios.get(url);

        const result: ApiResultWrapper<CollectionResponseDto> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function createCollectionAsync(
    collectionToCreate: CreateCollectionDto
): Promise<ApiResultWrapper<CreateCollectionResponse>> {
    const url = baseUrl + "/" + config.addCollectionEndpoint;

    try {
        const response = await axios.post(url, collectionToCreate, { headers });

        const result: ApiResultWrapper<CreateCollectionResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CreateCollectionResponse> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function updateCollectionAsync(
    collectionId: string,
    payload: UpdateCollectionDto
): Promise<ApiResultWrapper<UpdateCollectionDto>> {
    let url = baseUrl + "/" + config.updateCollectionEndpoint;

    url = url.replace("{collectionId}", collectionId);

    try {
        const response = await axios.put(url, payload, { headers });

        const result: ApiResultWrapper<UpdateCollectionDto> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<UpdateCollectionDto> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}
export async function deleteCollectionAsync(collectionId: string) {
    let url = baseUrl + "/" + config.deleteCollectionEndpoint;
    url = url.replace("{collectionId}", collectionId);

    try {
        const response = await axios.delete(url);

        const result: ApiResultWrapper<CollectionIdResponseDto> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CollectionIdResponseDto> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function getAllItemsAsync(
    collection_id: string
): Promise<ApiResultWrapper<any>> {
    let url = baseUrl + "/" + config.getAllItemsEndpoint;
    url = url.replace("{collectionId}", collection_id);

    try {
        const response = await axios.get(url);

        const result: ApiResultWrapper<any> = {
            data: response.data,
            error: undefined,
        };
        let items = result.data?.items;

        return items;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}
export async function createItemAsync(
    ItemToCreate: ItemDto,
    collectionId: string
): Promise<ApiResultWrapper<CreateItemResponse>> {
    let url = baseUrl + "/" + config.addItemEndpoint;
    url = url.replace("{collectionId}", collectionId);
    try {
        const response = await axios.post(url, ItemToCreate, { headers });

        const result: ApiResultWrapper<CreateItemResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CreateItemResponse> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}
