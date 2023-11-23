import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllItemsAsync, getCollectionAsync } from "../services/api_client";
import BackToMainBtn from "./buttons/back_to_main";

const GuestCollectionTable: React.FC = () => {
    const { collection_id } = useParams<{ collection_id: string }>();
    const [config, setConfig] = useState<Record<string, any> | null>(null);
    const [items, setItems] = useState<any>([]);
    const [collection, setCollection] = useState<{
        name: string;
        description: string;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (collection_id) {
                let result = await getCollectionAsync(collection_id);

                if (result.data) {
                    if (result.data.config) {
                        let parsedConfig = JSON.parse(result.data.config);
                        setConfig(parsedConfig);
                    }
                    setCollection({
                        name: result.data.name,
                        description: result.data.description,
                    });
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
            <>
                {collection && (
                    <div>
                        <h2>{collection.name}</h2>
                        <p>{collection.description}</p>
                    </div>
                )}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            {tableHeaders.map((header) => (
                                <th
                                    className="bg-info"
                                    scope="col"
                                    key={header}
                                >
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
                <BackToMainBtn />
            </>
        );
    };

    return <div>{renderTable()}</div>;
};

export default GuestCollectionTable;
