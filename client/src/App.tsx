import React, { useState } from "react";
import "./custom.css";
import CreateCollection from "./components/add_collection";

import Auth from "./components/authentication";
import { CreateUserComponent } from "./components/create_user";
import UserCollections from "./components/collections_cards";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import CollectionDetails from "./components/collection_items_table";
import AccountSettings from "./components/user_settings";
import EditCollection from "./components/edit_collection/collection_edit";

const App: React.FC = () => {
    localStorage.setItem("isAuthenticated", "false");

    const [isRegistrationPage, setIsRegistrationPage] = useState(true);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="col-md-6 offset-md-3">
                                {isRegistrationPage ? (
                                    <div className="registration_container">
                                        <h1>User registration</h1>
                                        <CreateUserComponent />
                                        <div className="checking_container">
                                            <h6>Already have an account?</h6>
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    setIsRegistrationPage(false)
                                                }
                                            >
                                                Log in
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="autentification_container">
                                        <Auth />
                                        <div className="checking_container">
                                            <h6>Don't have an account?</h6>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    setIsRegistrationPage(true)
                                                }
                                            >
                                                Sign up
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    />
                    <Route
                        path="/authorised"
                        element={
                            <div>
                                {" "}
                                <div className="header_custom">
                                    <Header></Header>
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
                                    <Header></Header>
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
                                    <Header></Header>
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
                                    <Header></Header>
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
                                    <Header></Header>
                                </div>
                                <EditCollection></EditCollection>
                            </div>
                        }
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
