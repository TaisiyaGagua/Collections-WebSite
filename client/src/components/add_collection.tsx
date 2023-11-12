import React, { useState } from "react";
import { createCollection } from "../services/api_client";
import { CreateCollectionDto } from "../dtos/requests/create_collection_dto";
import { Link } from "react-router-dom";

interface TableRow {
    name: string;
    fieldType: string;
    fieldName: string;
}

interface TableMetadata {
    name: string;
    description: string;
}

const MAX_TOTAL_ROWS = 15;

const MAX_FIELDS_PER_TYPE = 3;

const CreateCollection: React.FC = () => {
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [tableMetadata, setTableMetadata] = useState<TableMetadata>({
        name: "",
        description: "",
    });
    const [isNameFilled, setIsNameFilled] = useState<boolean>(false);

    const countTotalRows = (): number => {
        return tableData.length;
    };
    const countFieldsOfType = (fieldType: string): number => {
        return tableData.filter((row) => row.fieldType === fieldType).length;
    };

    const canAddRow = (): boolean => {
        return countTotalRows() < MAX_TOTAL_ROWS;
    };

    const canAddFieldOfType = (fieldType: string): boolean => {
        return countFieldsOfType(fieldType) < MAX_FIELDS_PER_TYPE;
    };
    const isFieldEmpty = (value: string): boolean => {
        return value.trim() === "";
    };

    const addRow = () => {
        if (canAddRow()) {
            const newRow: TableRow = {
                name: "",
                fieldType: "integer",
                fieldName: "",
            };
            setTableData([...tableData, newRow]);
        }
    };

    const deleteRow = (index: number) => {
        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
    };

    const handleInputChange = (
        index: number,
        key: keyof TableRow,
        value: string
    ) => {
        const updatedData = [...tableData];
        updatedData[index][key] = value;
        setTableData(updatedData);
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
            const schema: { [key: string]: string } = {};
            schema["name"] = "string";

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

            const response = await createCollection(collectionInfotoCreate);
            console.log(
                "ID новой коллекции:" + response.data?.collectionIdObjectId
            );
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

            <table className="extra-field-table">
                <thead>
                    <tr>
                        <th>You can also add extra-field for your items</th>
                    </tr>
                </thead>
                <tbody className="input-group">
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <select
                                    id={index.toString()}
                                    className="form-control"
                                    value={row.fieldType}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "fieldType",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option
                                        value="number"
                                        disabled={!canAddFieldOfType("number")}
                                    >
                                        Number
                                    </option>
                                    <option
                                        value="string"
                                        disabled={!canAddFieldOfType("string")}
                                    >
                                        String
                                    </option>
                                    <option
                                        value="text"
                                        disabled={!canAddFieldOfType("text")}
                                    >
                                        Text
                                    </option>
                                    <option
                                        value="boolean"
                                        disabled={!canAddFieldOfType("boolean")}
                                    >
                                        Boolean
                                    </option>
                                    <option
                                        value="date"
                                        disabled={!canAddFieldOfType("date")}
                                    >
                                        Date
                                    </option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Text input with segmented dropdown button"
                                    name="fieldName"
                                    value={row.fieldName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "fieldName",
                                            e.target.value
                                        )
                                    }
                                    required={true}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteRow(index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="btn btn-outline-info"
                onClick={addRow}
                disabled={!canAddRow()}
            >
                add field
            </button>

            <div className="button-space">
                <button
                    className="btn btn-primary"
                    onClick={saveTable}
                    disabled={!isFormValid()}
                >
                    Save Table
                </button>
            </div>
            <div className="button-space">
                <Link to="/authorised" className="btn btn-outline-secondary">
                    Back
                </Link>
            </div>
        </div>
    );
};

export default CreateCollection;
