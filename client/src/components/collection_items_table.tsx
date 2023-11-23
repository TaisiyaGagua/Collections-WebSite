import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    createItemAsync,
    getAllItemsAsync,
    getCollectionAsync,
} from "../services/api_client";
import AddItemForm from "./add_item";
import BackButton from "./buttons/back_to_main";

interface CommonTableProps {
    isAuthorized: boolean;
}

const CollectionItems: React.FC<CommonTableProps> = ({ isAuthorized }) => {
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
                let result = await getCollectionAsync(collection_id);

                if (result.data) {
                    setCollectionName(result.data.name);
                    setCollectionDescription(result.data.description);
                    if (result.data.config) {
                        let parsedConfig = JSON.parse(result.data.config);
                        setConfig(parsedConfig);
                    }
                } else {
                    console.error(result.error);
                }
                let fetchedItems = await getAllItemsAsync(collection_id);
                setItems(fetchedItems);
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
                                <td key={header}>
                                    {header === "name" && isAuthorized ? (
                                        <Link
                                            to={`/collection/${collection_id}/item/${item.item_id}`}
                                        >
                                            {item[header]}
                                        </Link>
                                    ) : (
                                        item[header]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const handleAddItem = async (newItem: any) => {
        if (newItem && collection_id) {
            let result = await createItemAsync(newItem, collection_id);
            console.log(result);
            const fetchedItems = await getAllItemsAsync(collection_id);
            setItems(fetchedItems);
        }
    };
    return (
        <div className="common-table">
            {collectionName && (
                <div>
                    <h2>{collectionName}</h2>
                    <p>{collectionDescription}</p>
                </div>
            )}
            {renderTable()}
            {isAuthorized ? (
                <>
                    <AddItemForm config={config} onAddItem={handleAddItem} />
                    <BackButton to="/authorised" />
                </>
            ) : (
                <BackButton to="/" />
            )}
        </div>
    );
};

export default CollectionItems;
