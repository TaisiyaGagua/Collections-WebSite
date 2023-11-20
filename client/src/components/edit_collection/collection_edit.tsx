import React from "react";

import { EditCollectionMetadata } from "./edit_collection_metadata";
import { EditCollectionConfig } from "./edit_collection_config";
import { AddExtraFields } from "./add_extra_field";
import BackToAuthorisedBtn from "../buttons/back_to_authorised_btn";

const EditCollection: React.FC = () => {
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
