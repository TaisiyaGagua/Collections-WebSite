import React, { useState } from "react";

interface AddItemFormProps {
    config: Record<string, string> | null;
    onAddItem: (item: Record<string, any>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ config, onAddItem }) => {
    const initialNewItem: Record<string, any> = {};
    if (config) {
        Object.keys(config).forEach((property) => {
            initialNewItem[property] = "";
        });
    }
    const [newItem, setNewItem] = useState<Record<string, any>>(initialNewItem);
    const [isNameFieldEmpty, setIsNameFieldEmpty] = useState(true);

    const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
        {}
    );
    const checkNameFieldEmpty = () => {
        const nameFieldValue = newItem["name"] || ""; 
        setIsNameFieldEmpty(nameFieldValue.trim() === ""); 
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const propertyType = config?.[name];

        let validatedValue: any;
        let errorMessage: string | undefined;
        switch (propertyType) {
            case "string":
            case "text":
                validatedValue = value;
                break;
            case "number":
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue)) {
                    validatedValue = parsedValue;
                } else {
                    validatedValue = "";
                    errorMessage = "enter correct number";
                }
                break;
            case "boolean":
                validatedValue =
                    propertyType === "boolean" ? value === "true" : value;
                break;
            case "date":
                const dateValue = new Date(value);
                if (!isNaN(dateValue.getTime())) {
                    validatedValue = dateValue.toISOString();
                } else {
                    validatedValue = "";
                    errorMessage = "enter correct date";
                }
                break;
            default:
                validatedValue = value;
        }

        setNewItem((prevItem) => ({ ...prevItem, [name]: validatedValue }));
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage || "",
        }));
        if (name === "name") {
            checkNameFieldEmpty();
        }
    };

    const handleAddItem = () => {
        const hasValidationErrors = Object.values(errorMessages).some(
            (errorMessage) => errorMessage !== ""
        );

        if (hasValidationErrors) {
            alert("You need to add correct types of item");
        } else {
            const createdAt = new Date();
            const newItemAsString = Object.keys(newItem).reduce(
                (acc, key) => ({ ...acc, [key]: newItem[key].toString() }),
                {}
            );
            onAddItem({ ...newItemAsString, createdAt });
            setNewItem({});
            setErrorMessages({});
        }
    };

    if (!config) {
        return <div>Loading config...</div>;
    }

    return (
        <div>
            <h3>New item</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {Object.keys(config).map((property) => (
                            <th className="table-primary" key={property}>
                                {property}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(config).map((property) => (
                            <td className="table-info" key={property}>
                                {config[property] === "boolean" ? (
                                    <select
                                        name={property}
                                        value={(
                                            newItem[property] || false
                                        ).toString()}
                                        onChange={handleInputChange}
                                    >
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select>
                                ) : (
                                    <input
                                        className="form-label"
                                        type={propertyTypeToInputType(
                                            config[property]
                                        )}
                                        name={property}
                                        value={newItem[property] || ""}
                                        onChange={handleInputChange}
                                    />
                                )}
                                <div style={{ color: "red" }}>
                                    {errorMessages[property]}
                                </div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button
                className="btn btn-outline-info"
                onClick={handleAddItem}
                disabled={isNameFieldEmpty}
            >
                Add item
            </button>
        </div>
    );
};

const propertyTypeToInputType = (propertyType: string): string => {
    switch (propertyType) {
        case "string":
        case "text":
            return "text";
        case "number":
            return "number";
        case "boolean":
            return "checkbox";
        case "date":
            return "date";
        default:
            return "text";
    }
};

export default AddItemForm;
