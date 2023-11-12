import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import {
    deleteCollection,
    getCollection,
    getCollectionId,
} from "../services/api_client";
import { CollectionResponseDto } from "../dtos/responses/collection_response_dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserCollections: React.FC = () => {
    const [collections, setCollections] = useState<CollectionResponseDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCollections = async () => {
            let userId = localStorage.getItem("userId");
            if (userId) {
                const collectionIds = await getCollectionId(userId);
                if (collectionIds.data && Array.isArray(collectionIds.data)) {
                    const collectionIdArray = collectionIds.data.map(
                        (item) => item.collection_id
                    );
                    console.log(collectionIdArray);

                    const fetchCollectionPromises = collectionIdArray.map(
                        async (collectionId) => {
                            const collectionResponse = await getCollection(
                                collectionId
                            );
                            return collectionResponse.data;
                        }
                    );

                    const collectionData: any = await Promise.all(
                        fetchCollectionPromises
                    );

                    setCollections(collectionData);
                }
            }
        };
        fetchCollections();
    }, []);

    const handleEditClick = (collectionId: string) => {
        // Обработчик события для кнопки "Edit"
        // Здесь вы можете вызвать соответствующий метод для редактирования коллекции
        // collectionId - идентификатор коллекции
    };

    const handleDeleteClick = async (collectionId: string) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this collection?"
        );

        if (shouldDelete) {
            await deleteCollection(collectionId);
            console.log("Deleting collection with ID:", collectionId);

            setCollections((prevCollections) =>
                prevCollections.filter((c) => c._id !== collectionId)
            );
        }
    };
    const handleCreateNewCollection = () => {
        navigate("/create_collection");
    };

    return (
        <div>
            <h2 className="text-center">
                {collections.length === 0
                    ? "You don't have collections"
                    : "Your collections:"}
            </h2>
            <div className="row justify-content-center">
                {collections.length > 0 ? (
                    collections.map((collection) => (
                        <div key={collection._id}>
                            <Link
                                to={`/collection/${collection._id}`}
                                className="link-info"
                            >
                                {collection.name}
                            </Link>

                            <button
                                className="btn-collection btn btn-outline-success"
                                onClick={() => handleEditClick(collection._id)}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className="btn-collection btn btn-outline-danger"
                                onClick={() =>
                                    handleDeleteClick(collection._id)
                                }
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    ))
                ) : (
                    <span></span>
                )}
            </div>
            <button
                className="btn btn-primary"
                onClick={handleCreateNewCollection}
            >
                +Create New Collection
            </button>
            {/* <EditableTable></EditableTable> */}
        </div>
    );
};

export default UserCollections;
