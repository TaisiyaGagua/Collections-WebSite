import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    deleteItemAsync,
    getItemAsync,
    updateItemAsync,
} from "../../services/api_client";
import BackToAuthorisedBtn from "../buttons/back_to_authorised_btn";
import { ItemDto } from "../../dtos/requests/create_item_dto";

const ItemDetails: React.FC = () => {
    const { collection_id, item_id } = useParams<{
        collection_id: string;
        item_id: string;
    }>();
    const navigate = useNavigate();

    const [itemDetails, setItemDetails] = useState<ItemDto>({
        name: "",
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (collection_id && item_id) {
                try {
                    const result = await getItemAsync(collection_id, item_id);

                    if (result.data) {
                        setItemDetails(result.data);
                    } else {
                        console.error(result.error);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [collection_id, item_id]);

    const handleChange = (
        property: string,
        value: string | ChangeEvent<HTMLInputElement>
    ) => {
        setItemDetails((prevDetails) => ({
            ...prevDetails,
            [property]: typeof value === "string" ? value : value.target.value,
        }));
    };

    const handleSaveChanges = async () => {
        if (collection_id && item_id) {
            try {
                const result = await updateItemAsync(
                    collection_id,
                    item_id,
                    itemDetails
                );

                if (result.data) {
                    setIsEditing(false);
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteItem = async () => {
        if (collection_id && item_id) {
            try {
                await deleteItemAsync(collection_id, item_id);
                navigate(`/collection/${collection_id}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Item Details</h2>
            {isEditing ? (
                <div>
                    {Object.entries(itemDetails).map(
                        ([key, value]) =>
                            key !== "item_id" &&
                            key !== "CreatedAt" && (
                                <div key={key} className="input-group">
                                    <input
                                        type="text"
                                        placeholder={`New ${key}`}
                                        value={value}
                                        onChange={(e) => handleChange(key, e)}
                                    />
                                </div>
                            )
                    )}
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            ) : (
                <div>
                    {Object.entries(itemDetails).map(
                        ([key, value]) =>
                            key !== "item_id" && (
                                <p key={key}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    : {value}
                                </p>
                            )
                    )}
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                </div>
            )}
            <div>
                <button
                    className="btn btn-danger"
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    Delete Item
                </button>
                {showDeleteConfirmation && (
                    <div>
                        <p>Are you sure you want to delete this item?</p>
                        <button
                            className="btn btn-outline-danger"
                            onClick={handleDeleteItem}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-outline-info"
                            onClick={() => setShowDeleteConfirmation(false)}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
            <BackToAuthorisedBtn />
        </div>
    );
};

export default ItemDetails;
