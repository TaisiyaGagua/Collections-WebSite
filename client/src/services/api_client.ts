import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import config from "../config.json";
import { User } from "../dtos/user";
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

const baseUrl = config.backendBaseUrl;
const headers: RawAxiosRequestHeaders | AxiosHeaders = {
    Accept: "application/json",
};

export async function getUsersAsync(): Promise<ApiResultWrapper<User[]>> {
    const url = baseUrl + "/" + config.getUserEndpoint;

    try {
        const response = await axios.get<UserResponseDto[]>(url, {
            headers,
        });

        const usersWithDateObjects = response.data.map((user) => ({
            ...user,
            id: user._id,
        }));

        const result: ApiResultWrapper<User[]> = {
            data: usersWithDateObjects,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<User[]> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function createUser(
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

export async function checkUser(
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

export async function updateUser(
    userId: string | null,
    payload: UpdateUserDto
): Promise<ApiResultWrapper<any>> {
    let url = baseUrl + "/" + config.updateUserEndpoint;
    if (userId) {
        url = url.replace("{userId}", userId);
    }
    try {
        const response = await axios.patch(url, payload, { headers });

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

export async function deleteUser(payload: CheckUserDto) {
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

export async function getCollectionId(
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
export async function getCollection(
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
export async function createCollection(
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

export async function deleteCollection(collectionId: string) {
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

export async function getAllItems(
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
export async function createItem(
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
