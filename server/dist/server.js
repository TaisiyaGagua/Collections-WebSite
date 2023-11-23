"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./models/user"));
const mongodb_1 = require("mongodb");
const data_access_1 = __importDefault(require("./db/data_access"));
const collection_item_1 = __importDefault(require("./models/collection_item"));
const collection_1 = __importDefault(require("./models/collection"));
const user_collection_1 = __importDefault(require("./models/user_collection"));
const role_1 = __importDefault(require("./models/role"));
const user_role_1 = __importDefault(require("./models/user_role"));
const app = (0, express_1.default)();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5002;
app.use(cors());
app.use(express_1.default.json());
data_access_1.default.connect(process.env.ATLAS_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});
app.get("/collections/largest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = 5;
        const collections = yield collection_item_1.default.aggregate([
            {
                $project: {
                    length: {
                        $size: {
                            $ifNull: ["$items", []],
                        },
                    },
                    document: "$$ROOT",
                },
            },
            {
                $sort: { length: -1 },
            },
            {
                $limit: limit,
            },
            {
                $replaceRoot: { newRoot: "$document" },
            },
        ]);
        const collectionDetails = [];
        for (const collection of collections) {
            const collectionId = collection.collection_id;
            const collectionInfo = yield collection_1.default.findById(collectionId);
            if (collectionInfo) {
                collectionDetails.push(collectionInfo);
            }
        }
        res.json(collectionDetails);
    }
    catch (error) {
        console.error("Cannot find collection:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.get("/latestItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield collection_item_1.default.aggregate([
            {
                $unwind: "$items",
            },
            {
                $sort: { "items.createdAt": -1 },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 0,
                    item: "$items",
                },
            },
        ]);
        res.json(items);
    }
    catch (error) {
        console.error("Cannot find items:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const newUser = {};
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        let result = yield user_1.default.create(newUser);
        console.log("ID new user:", result);
        const userRole = yield role_1.default.findOne({ name: "user" });
        if (!userRole) {
            const newUserRole = new role_1.default({ name: "user" });
            yield newUserRole.save();
        }
        else {
            const userRoleId = userRole._id;
            const newUserRole = new user_role_1.default({
                user_id: result._id,
                role_id: userRoleId,
            });
            yield newUserRole.save();
            res.status(201).json({ _id: result });
        }
    }
    catch (error) {
        console.error("Cannot add new user", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.post("/password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    let found = yield user_1.default.findOne({ email });
    if (!found) {
        res.json({ success: false, message: "User not found" });
    }
    else {
        if (found.password === password) {
            res.json({
                success: true,
                message: "Login successful",
                username: found.username,
                email: found.email,
                userId: found.id,
            });
        }
        else {
            res.json({ success: false, message: "Incorrect password" });
        }
    }
}));
app.post("/collections", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, name, config, description } = req.body;
        const newCollection = {};
        newCollection.name = name;
        newCollection.config = config;
        newCollection.description = description;
        let result = yield collection_1.default.create(newCollection);
        console.log("ID new collection:", result.id);
        const collectionIdObjectId = result._id;
        const userCollectionPairs = {};
        userCollectionPairs.user_id = new mongodb_1.ObjectId(user_id);
        userCollectionPairs.collection_id = collectionIdObjectId;
        yield user_collection_1.default.create(userCollectionPairs);
        const collectionItem = {};
        collectionItem.collection_id = collectionIdObjectId;
        yield collection_item_1.default.create(collectionItem);
        res.status(201).json({ collectionIdObjectId });
    }
    catch (error) {
        console.error("Cannot add new collection:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.post("/collections/:collection_id/item", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const newItem = req.body;
        const newItemWithId = Object.assign(Object.assign({}, newItem), { item_id: new mongodb_1.ObjectId() });
        const updatedCollection = yield collection_item_1.default.findOneAndUpdate({ collection_id: collectionId }, { $push: { items: newItemWithId } }, { new: true });
        if (!updatedCollection) {
            return res.status(404).json({ error: "Collection not found" });
        }
        return res.json(newItemWithId);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/:user_id/collection", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.user_id;
        const collection = yield user_collection_1.default.find({
            user_id: userId,
        });
        if (collection) {
            res.json(collection);
        }
        else {
            res.status(404).json({ error: "Collection not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/collections/:collection_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const collection = yield collection_1.default.findById(collectionId);
        if (collection) {
            res.json(collection);
        }
        else {
            res.status(404).json({ error: "Config not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/collections/:collection_id/:item_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const itemId = req.params.item_id;
        const item = yield collection_item_1.default.findOne({
            collection_id: collectionId,
        });
        if (item) {
            const foundItem = item.items.find((item) => String(item.item_id) === String(itemId));
            if (foundItem) {
                res.json(foundItem);
            }
            else {
                res.status(404).json({ error: "Item not found" });
            }
        }
        else {
            res.status(404).json({ error: "Collection not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/collection/:collection_id/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const items = yield collection_item_1.default.findOne({
            collection_id: collectionId,
        });
        if (items) {
            res.json(items);
        }
        else {
            res.status(404).json({ error: "Items not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/users/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.user_id;
        const user = yield user_1.default.findOne({
            _id: userID,
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.put("/users/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateFields = {};
        const userID = req.params.user_id;
        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                updateFields[key] = req.body[key];
            }
        }
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No data to update" });
        }
        const user = yield user_1.default.updateOne({ _id: userID }, { $set: updateFields });
        if (user) {
            res.status(200).json({ message: "User successesfully updated" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
app.put("/collections/:collection_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const { name, config, description } = req.body;
        const updateFields = {};
        if (name) {
            updateFields.name = name;
        }
        if (config) {
            updateFields.config = config;
        }
        if (description) {
            updateFields.description = description;
        }
        const updatedCollection = yield collection_1.default.findByIdAndUpdate(collectionId, updateFields, { new: true });
        if (updatedCollection) {
            res.json(updatedCollection);
        }
        else {
            res.status(404).json({ error: "Collection not found" });
        }
    }
    catch (error) {
        console.error("Cannot update collection", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.put("/collections/:collection_id/:item_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const itemId = req.params.item_id;
        const updatedItem = req.body;
        const collection = yield collection_item_1.default.findOne({
            collection_id: collectionId,
        });
        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }
        const itemIndex = collection.items.findIndex((item) => String(item.item_id) === String(itemId));
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found" });
        }
        collection.items[itemIndex] = Object.assign(Object.assign({}, collection.items[itemIndex]), updatedItem);
        yield collection.save();
        return res.json(collection.items[itemIndex]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.put("/config/collections/:collection_id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const oldKey = req.body.oldKey;
        const newKey = req.body.newKey;
        const existingCollection = yield collection_item_1.default.findOne({
            collection_id: collectionId,
        });
        if (!existingCollection) {
            return res.status(404).json({ error: "Collection not found" });
        }
        const updatedItems = existingCollection.items.map((currentItem) => {
            if (oldKey in currentItem) {
                currentItem[newKey] = currentItem[oldKey];
                delete currentItem[oldKey];
            }
            return currentItem;
        });
        const updatedCollection = yield collection_item_1.default.findOneAndUpdate({
            collection_id: collectionId,
        }, {
            $set: {
                items: updatedItems,
            },
        }, { new: true });
        if (updatedCollection) {
            res.json(updatedCollection);
        }
        else {
            res.status(404).json({ error: "Collection not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.delete("/users/:user_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.user_id;
        const deletedUser = yield user_1.default.deleteOne({
            _id: userID,
        });
        const deletedUserCollections = yield user_collection_1.default.deleteOne({
            user_id: userID,
        });
        const deletedUserRoles = yield user_role_1.default.deleteOne({
            user_id: userID,
        });
        res.json(deletedUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.delete("/collections/:collection_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const deletedCollection = yield collection_1.default.deleteOne({
            _id: collectionId,
        });
        yield user_collection_1.default.deleteOne({
            collection_id: collectionId,
        });
        yield collection_item_1.default.deleteOne({
            collection_id: collectionId,
        });
        res.json(deletedCollection);
        console.log("Collection deleted");
    }
    catch (error) {
        console.error("Cannot delete collection", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
}));
app.delete("/collections/:collection_id/:item_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionId = req.params.collection_id;
        const itemId = req.params.item_id;
        const collection = yield collection_item_1.default.findOne({
            collection_id: collectionId,
        });
        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }
        const itemIndex = collection.items.findIndex((item) => String(item.item_id) === String(itemId));
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found" });
        }
        collection.items.splice(itemIndex, 1);
        yield collection.save();
        res.json({ message: "Item deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ status: "ok" });
}));
//# sourceMappingURL=server.js.map