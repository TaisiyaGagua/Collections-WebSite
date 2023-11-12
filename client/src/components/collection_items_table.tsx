import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createItem, getAllItems, getCollection } from "../services/api_client";
import AddItemForm from "./add_item";

const CollectionDetails: React.FC = () => {
    const { collection_id } = useParams<{ collection_id: string }>();
    const [collectionName, setCollectionName] = useState<string | null>(null);
    const [collectionDescription, setCollectionDescription] = useState<
        string | null
    >(null);
    const [config, setConfig] = useState<Record<string, any> | null>(null);
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (collection_id) {
                let result = await getCollection(collection_id);

                if (result.data) {
                    setCollectionName(result.data.name);
                    setCollectionDescription(result.data.description);
                    if (result.data.config) {
                        let parsedConfig = JSON.parse(result.data.config);
                        setConfig(parsedConfig);
                        console.log(parsedConfig);
                    }

                    console.log(result);
                } else {
                    console.error(result.error);
                }

                let fetchedItems = await getAllItems(collection_id);
                setItems(fetchedItems);
                console.log(fetchedItems);
            }
        };

        fetchData();
    }, [collection_id]);

    const renderTable = () => {
        if (!config) return null;

        const tableHeaders = Object.keys(config);

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th className="bg-info" scope="col" key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-info">
                    {items.map((item: any, index: string) => (
                        <tr key={index}>
                            {tableHeaders.map((header) => (
                                <td key={header}>{item[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    const handleAddItem = (newItem: any) => {
        const fetchData = async () => {
            if (newItem && collection_id) {
                let result = await createItem(newItem, collection_id);
                console.log(result);
            }
        };

        fetchData();
        setItems((prevItems: any) => [...prevItems, newItem]);
    };

    return (
        <div className="collection-details">
            {collectionName ? (
                <div>
                    <h2 className="text-center">{collectionName}</h2>
                    <p>{collectionDescription}</p>
                    {renderTable()}
                    <AddItemForm config={config} onAddItem={handleAddItem} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="button-space">
                <Link to="/authorised" className="btn btn-outline-secondary">
                    Back
                </Link>
            </div>
        </div>
    );
};

export default CollectionDetails;
