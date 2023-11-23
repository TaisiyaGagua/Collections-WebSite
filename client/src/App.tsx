import React, { useEffect, useState } from "react";
import "./custom.css";
import CreateCollection from "./components/add_collection";
import UserCollections from "./components/collections_cards";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CollectionDetails from "./components/collection_items_table";
import AccountSettings from "./components/edit_user/user_settings";
import EditCollection from "./components/edit_collection/collection_edit";
import ItemDetails from "./components/edit_item/edit_item";
import {
    getLargestCollectionsAsync,
    getLatestItemsAsync,
} from "./services/api_client";
import { ItemDto } from "./dtos/requests/create_item_dto";
import { ApiResultWrapper } from "./common/api_result_wrapper";
import { CollectionResponseDto } from "./dtos/responses/collection_response_dto";
import AuthenticationContainer from "./components/enterance/enterance";
import Header from "./components/headers/header";
import GuestCollectionTable from "./components/collection_items";

const App: React.FC = () => {
    localStorage.setItem("isAuthenticated", "false");
    const [latestItems, setLatestItems] = useState<ApiResultWrapper<ItemDto[]>>(
        {
            data: undefined,
            error: undefined,
        }
    );
    const [largestCollections, setLargestCollections] = useState<
        ApiResultWrapper<CollectionResponseDto[]>
    >({ data: undefined, error: undefined });

    useEffect(() => {
        const fetchData = async () => {
            const latestItemsResult = await getLatestItemsAsync();
            const largestCollectionsResult = await getLargestCollectionsAsync();

            setLatestItems(latestItemsResult);
            setLargestCollections(largestCollectionsResult);
        };

        fetchData();
    }, []);

    if (!latestItems.data || !largestCollections.data) {
        return <div>Loading...</div>;
    }

    if (latestItems.error || largestCollections.error) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <div className="header_custom">
                                    <Header isAuthenticated={false} />
                                </div>

                                <div>
                                    <h2>Latest Items</h2>
                                    <ul>
                                        {latestItems.data.map(
                                            (itemData: any, i) => (
                                                <li key={i}>
                                                    {itemData.item.name}
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    <h2>Largest Collections</h2>
                                    <ul>
                                        {largestCollections.data.map(
                                            (collection: any, i) => (
                                                <li key={i}>
                                                    <Link
                                                        to={`/guest/collections/${collection._id}`}
                                                    >
                                                        {collection.name}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        }
                    ></Route>

                    <Route
                        path="/guest/collections/:collection_id"
                        element={
                            <>
                                <div className="header_custom">
                                    <Header isAuthenticated={false} />
                                </div>
                                <GuestCollectionTable />
                            </>
                        }
                    />
                    <Route
                        path="/registration"
                        element={
                            <AuthenticationContainer></AuthenticationContainer>
                        }
                    />
                    <Route
                        path="/authorised"
                        element={
                            <div>
                                {" "}
                                <div className="header_custom">
                                    <Header isAuthenticated={true} />
                                </div>
                                <UserCollections />
                            </div>
                        }
                    ></Route>
                    <Route
                        path="/create_collection"
                        element={
                            <div>
                                <div className="header_custom">
                                    <Header isAuthenticated={true} />
                                </div>
                                <CreateCollection />
                            </div>
                        }
                    />
                    <Route
                        path="/collection/:collection_id"
                        element={
                            <div>
                                <div className="header_custom">
                                    <Header isAuthenticated={true} />
                                </div>
                                <CollectionDetails />
                            </div>
                        }
                    />
                    <Route
                        path="/user/:user_id"
                        element={
                            <div>
                                <div className="header_custom">
                                    <Header isAuthenticated={true} />
                                </div>
                                <AccountSettings></AccountSettings>
                            </div>
                        }
                    ></Route>
                    <Route
                        path="/user/collection/:collection_id"
                        element={
                            <div>
                                <div className="header_custom">
                                    <Header isAuthenticated={true} />
                                </div>
                                <EditCollection></EditCollection>
                            </div>
                        }
                    ></Route>
                    <Route
                        path="/collection/:collection_id/item/:item_id"
                        element={
                            <div>
                                <div className="header_custom">
                                    <Header isAuthenticated={true} />
                                </div>
                                <ItemDetails></ItemDetails>
                            </div>
                        }
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
