import React, { useEffect } from "react";

import { EditCollectionMetadata } from "./edit_collection_metadata";
import { EditCollectionConfig } from "./edit_collection_config";
import BackToAuthorisedBtn from "../buttons/back_to_authorised_btn";
import AddExtraFields from "./add_extra_field";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCollectionRequest } from "../../state/edit_collection_state";

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
            <AddExtraFields />
            <BackToAuthorisedBtn />
        </div>
    );
};

export default EditCollection;
