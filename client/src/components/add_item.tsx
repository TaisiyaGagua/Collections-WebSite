import React, { useState } from "react";

interface AddItemFormProps {
    config: Record<string, string> | null;
    onAddItem: (item: Record<string, any>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ config, onAddItem }) => {
    const [newItem, setNewItem] = useState<Record<string, any>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleAddItem = () => {
        onAddItem(newItem);
        setNewItem({});
    };

    if (!config) {
        return <div>Loading config...</div>;
    }
    const isNameFilled =
        newItem.hasOwnProperty("name") && newItem.name.trim() !== "";

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
                                <input
                                    className="form-label"
                                    type="text"
                                    name={property}
                                    value={newItem[property] || ""}
                                    onChange={handleInputChange}
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button
                className="btn btn-outline-info"
                onClick={handleAddItem}
                disabled={!isNameFilled}
            >
                Добавить элемент
            </button>
        </div>
    );
};

export default AddItemForm;
