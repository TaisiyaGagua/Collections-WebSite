import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCollectionRequest } from "../../state/edit_collection_state";
import { CollectionResponseDto } from "../../dtos/responses/collection_response_dto";

interface TableRow {
    [key: string]: string;
}

export const EditCollectionConfig: React.FC = () => {
    const { collection_id } = useParams<{ collection_id: string }>();
    const [editingHeader, setEditingHeader] = useState<string | null>(null);
    const [newConfig, setNewConfig] = useState<TableRow | null>({});

    const currentCollectionState = useSelector(
        (state: any) => state.editCollectionState
    );
    const unparsedConfig = currentCollectionState.config;

    const config = unparsedConfig ? JSON.parse(unparsedConfig) : {};

    const dispatch = useDispatch();

    const editConfigName = (value: string, header: string) => {
        setEditingHeader(header);
    };

    const handleConfigChange = (
        oldKey: keyof TableRow,
        newKey: string,
        value: string
    ) => {
        const objCopy = { ...config };
        delete objCopy[oldKey];
        objCopy[newKey as keyof TableRow] = value;

        setNewConfig(objCopy);
    };

    const saveConfigChange = async () => {
        if (collection_id) {
            const collectionInfoToUpdate: CollectionResponseDto = {
                _id: collection_id,
                name: currentCollectionState.name,
                description: currentCollectionState.description,
                config: JSON.stringify(newConfig),
            };

            dispatch(updateCollectionRequest(collectionInfoToUpdate));
            console.log("Collection updated successfully!");
        }
    };

    const cancelEditCellValue = () => {
        setEditingHeader(null);
    };

    const tableHeaders = Object.keys(config);

    const deleteColumn = (header: string, headerIndex: number) => {
        const updatedHeaders = [...tableHeaders];
        updatedHeaders.splice(headerIndex, 1);
        const updatedConfig: Record<string, string> = {};
        updatedHeaders.forEach((h) => {
            updatedConfig[h] = config[h];
        });
        if (collection_id) {
            const collectionInfoToUpdate: CollectionResponseDto = {
                _id: collection_id,
                name: currentCollectionState.name,
                description: currentCollectionState.description,
                config: JSON.stringify(updatedConfig),
            };
            dispatch(updateCollectionRequest(collectionInfoToUpdate));
            console.log("Collection updated successfully!");
        }
    };

    return (
        <div>
            {currentCollectionState.isLoaded ? (
                <table className="table table-bordered border-info table-striped">
                    <thead>
                        <tr>
                            {tableHeaders.map((header: any) => (
                                <th scope="col" key={header}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {tableHeaders.map((header: any) => (
                                <td key={header}>{config[header]}</td>
                            ))}
                        </tr>

                        <tr>
                            {tableHeaders.map(
                                (header: any, headerIndex: any) => (
                                    <td key={header}>
                                        {editingHeader === header ? (
                                            <div className="input-group">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    defaultValue={header}
                                                    onChange={(e) =>
                                                        handleConfigChange(
                                                            header,
                                                            e.target.value,
                                                            config[header]
                                                        )
                                                    }
                                                />
                                                <button
                                                    className="btn btn-outline-info"
                                                    onClick={saveConfigChange}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={
                                                        cancelEditCellValue
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        editConfigName(
                                                            config[header],
                                                            header
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        deleteColumn(
                                                            header,
                                                            headerIndex
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                )
                            )}
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};
