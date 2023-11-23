import React, { useState } from "react";
import { createCollectionAsync } from "../services/api_client";
import { CreateCollectionDto } from "../dtos/requests/create_collection_dto";
import { useNavigate } from "react-router-dom";
import AddExtraFields from "./edit_collection/add_extra_field";
import BackButton from "./buttons/back_to_main";

interface TableRow {
    name: string;
    fieldType: string;
    fieldName: string;
}

interface TableMetadata {
    name: string;
    description: string;
}

const CreateCollection: React.FC = () => {
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const navigate = useNavigate();

    const [tableMetadata, setTableMetadata] = useState<TableMetadata>({
        name: "",
        description: "",
    });
    const [isNameFilled, setIsNameFilled] = useState<boolean>(false);

    const isFieldEmpty = (value: string): boolean => {
        return value.trim() === "";
    };

    const handleTableDataChange = (newTableData: TableRow[]) => {
        setTableData(newTableData);
    };
    const handleMetadataChange = (key: keyof TableMetadata, value: string) => {
        setTableMetadata({ ...tableMetadata, [key]: value });
        setIsNameFilled(!isFieldEmpty(value));
    };

    const isFormValid = (): boolean => {
        return isNameFilled && !isFieldEmpty(tableMetadata.description);
    };

    const saveTable = async () => {
        if (isNameFilled) {
            const schema: { name: string; [key: string]: string } = {
                name: "",
            };

            tableData.forEach((row) => {
                if (!isFieldEmpty(row.fieldName)) {
                    schema[row.fieldName] = row.fieldType;
                }
            });

            const collectionInfotoCreate: CreateCollectionDto = {
                user_id: localStorage.getItem("userId"),
                name: tableMetadata.name,
                description: tableMetadata.description,
                config: JSON.stringify(schema),
            };

            const response = await createCollectionAsync(
                collectionInfotoCreate
            );
            console.log(
                "ID new collection" + response.data?.collectionIdObjectId
            );
            navigate(`/collection/${response.data?.collectionIdObjectId}`);
        }
    };
    return (
        <div>
            <h2>New Collection</h2>
            <div className="form-floating">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea1"
                    value={tableMetadata.name}
                    onChange={(e) =>
                        handleMetadataChange("name", e.target.value)
                    }
                ></textarea>
                <label htmlFor="floatingTextarea1">Collection Name:</label>
            </div>
            <div className="form-floating">
                <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={tableMetadata.description}
                    onChange={(e) =>
                        handleMetadataChange("description", e.target.value)
                    }
                ></textarea>
                <label htmlFor="floatingTextarea2">
                    Collection Description:
                </label>
            </div>
            <AddExtraFields
                showSaveButton={false}
                onTableDataChange={handleTableDataChange}
            ></AddExtraFields>
            <div className="button-space">
                <button
                    className="btn btn-primary"
                    onClick={saveTable}
                    disabled={!isFormValid()}
                >
                    Save Table
                </button>
            </div>
            <BackButton to="/authorised" />
        </div>
    );
};

export default CreateCollection;
