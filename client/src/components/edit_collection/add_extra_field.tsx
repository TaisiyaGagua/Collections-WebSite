import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CollectionResponseDto } from "../../dtos/responses/collection_response_dto";
import { updateCollectionRequest } from "../../state/edit_collection_state";

interface TableRow {
    name: string;
    fieldType: string;
    fieldName: string;
}

const MAX_TOTAL_ROWS = 15;
const MAX_FIELDS_PER_TYPE = 3;

const AddExtraFields: React.FC = () => {
    const dispatch = useDispatch();
    const { collection_id } = useParams<{ collection_id: string }>();
    const currentCollectionState = useSelector(
        (state: any) => state.editCollectionState
    );

    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [showInputGroup, setShowInputGroup] = useState(true);
    const [isNewFieldAdded, setNewFieldAdded] = useState(false);

    const countTotalRows = (): number => tableData.length;

    const countFieldsOfType = (fieldType: string): number =>
        tableData.filter((row) => row.fieldType === fieldType).length;

    const canAddRow = (): boolean => countTotalRows() < MAX_TOTAL_ROWS;

    const canAddFieldOfType = (fieldType: string): boolean =>
        countFieldsOfType(fieldType) < MAX_FIELDS_PER_TYPE;

    const addRow = () => {
        if (canAddRow()) {
            const newRow: TableRow = {
                name: "",
                fieldType: "string",
                fieldName: "",
            };
            setTableData([...tableData, newRow]);
            setNewFieldAdded(true);
            setShowInputGroup(true);
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

    const saveField = async () => {
        const config = JSON.parse(currentCollectionState.config);

        const schema: { [key: string]: string } = {};
        tableData.forEach((row) => {
            if (row.fieldName) {
                schema[row.fieldName] = row.fieldType;
            }
        });

        const updatedConfig = { ...config, ...schema };

        if (collection_id) {
            const collectionInfoToUpdate: CollectionResponseDto = {
                _id: collection_id,
                name: currentCollectionState.name,
                description: currentCollectionState.description,
                config: JSON.stringify(updatedConfig),
            };

            dispatch(updateCollectionRequest(collectionInfoToUpdate));
            console.log("Collection updated successfully!");
            setShowInputGroup(false);
            setNewFieldAdded(false);
            setTableData([]);
        }
    };

    return (
        <>
            <table className="extra-field-table">
                <thead>
                    <tr>
                        <th>
                            You can also add a new extra-field for your items
                        </th>
                    </tr>
                </thead>
                {showInputGroup && (
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
                                        {[
                                            "number",
                                            "string",
                                            "text",
                                            "boolean",
                                            "date",
                                        ].map((type) => (
                                            <option
                                                key={type}
                                                value={type}
                                                disabled={
                                                    !canAddFieldOfType(type)
                                                }
                                            >
                                                {type.charAt(0).toUpperCase() +
                                                    type.slice(1)}
                                            </option>
                                        ))}
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
                )}
            </table>
            <button
                className="btn btn-outline-info"
                onClick={addRow}
                disabled={!canAddRow()}
            >
                Add a new field
            </button>
            {isNewFieldAdded && (
                <button
                    className="btn btn-primary"
                    onClick={saveField}
                    disabled={!canAddRow()}
                >
                    Save extra-field
                </button>
            )}
        </>
    );
};

export default AddExtraFields;
