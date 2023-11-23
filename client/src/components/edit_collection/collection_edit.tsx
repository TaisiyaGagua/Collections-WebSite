import React, { useEffect } from "react";
import { EditCollectionMetadata } from "./edit_collection_metadata";
import { EditCollectionConfig } from "./edit_collection_config";
import AddExtraFields from "./add_extra_field";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCollectionRequest } from "../../state/edit_collection_state";
import BackButton from "../buttons/back_to_main";

const EditCollection: React.FC = () => {
    const { collection_id } = useParams<{ collection_id: string }>();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCollectionRequest(collection_id));
    }, [collection_id, dispatch]);

    return (
        <div>
            <h2>Edit Collection</h2>
            <EditCollectionMetadata />
            <EditCollectionConfig />
            <AddExtraFields showSaveButton={true} />
            <BackButton to="/authorised" />
        </div>
    );
};

export default EditCollection;
