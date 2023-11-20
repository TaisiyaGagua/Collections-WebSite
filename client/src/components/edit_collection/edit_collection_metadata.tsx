import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CollectionResponseDto } from "../../dtos/responses/collection_response_dto";
import { updateCollectionRequest } from "../../state/edit_collection_state";

interface TableMetadata {
    name: string;
    description: string;
}

export const EditCollectionMetadata = () => {
    const dispatch = useDispatch();
    const [hasInputChanged, setInputChanged] = useState<boolean>(false);
    const [newMetadata, setNewMetadata] = useState<TableMetadata>({
        name: "",
        description: "",
    });
    const { collection_id } = useParams<{ collection_id: string }>();
    const currentCollectionState = useSelector(
        (state: any) => state.editCollectionState
    );

    const handleMetadataChange = (key: keyof TableMetadata, value: string) => {
        setNewMetadata({ ...newMetadata, [key]: value });
        setInputChanged(true);
    };

    const saveTable = () => {
        if (collection_id) {
            const collectionInfoToUpdate: CollectionResponseDto = {
                _id: collection_id,
                name: newMetadata.name,
                description: newMetadata.description,
            };

            dispatch(updateCollectionRequest(collectionInfoToUpdate));

            console.log("Collection updated successfully!");
        }
    };

    return (
        <>
            <div>
                <div className="form-floating">
                    <textarea
                        className="form-control"
                        id="floatingTextarea1"
                        defaultValue={currentCollectionState.name}
                        onChange={(e) =>
                            handleMetadataChange("name", e.target.value)
                        }
                    ></textarea>
                    <label htmlFor="floatingTextarea1">Name:</label>
                </div>
            </div>

            <div className="form-floating">
                <textarea
                    className="form-control"
                    id="floatingTextarea2"
                    defaultValue={currentCollectionState.description}
                    onChange={(e) =>
                        handleMetadataChange("description", e.target.value)
                    }
                ></textarea>
                <label htmlFor="floatingTextarea2">Description:</label>
            </div>

            <div className="button-space">
                <button
                    className="btn btn-primary"
                    onClick={saveTable}
                    disabled={!hasInputChanged}
                >
                    Save
                </button>
            </div>
        </>
    );
};
