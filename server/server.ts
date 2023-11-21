import express from "express";
import UserSchema, { User } from "./models/user";
import { collectionDTO } from "./dtos/collection/collection_dto";
import { ObjectId } from "mongodb";
import { UserDto } from "./dtos/user/user_dto";
import DataAccess from "./db/data_access";
import { UserCollectionDto } from "./dtos/user_collection/user_collection_dto";
import { CollectionItemDto } from "./dtos/collection_item/collection_item_dto";
import CollectionItemSchema, {
    ICollectionItem,
} from "./models/collection_item";
import CollectionSchema from "./models/collection";
import UserCollectionSchema from "./models/user_collection";
import RoleSchema from "./models/role";
import UserRoleSchema from "./models/user_role";

const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());

app.listen(port, async () => {
    await DataAccess.connect(process.env.ATLAS_URI!);
    console.log(`Server is running on port: ${port}`);
});
app.get("/collections/largest", async (req, res) => {
    try {
        const limit = 5;
        const collections: CollectionItemDto[] =
            await CollectionItemSchema.aggregate([
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
            const collectionInfo = await CollectionSchema.findById(
                collectionId
            );
            if (collectionInfo) {
                collectionDetails.push(collectionInfo);
            }
        }

        res.json(collectionDetails);
    } catch (error) {
        console.error("Ошибка при поиске коллекций:", error);
        res.status(500).json({
            error: "Произошла ошибка при поиске коллекций.",
        });
    }
});
app.get("/latestItems", async (req, res) => {
    try {
        const items = await CollectionItemSchema.aggregate([
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
    } catch (error) {
        console.error("Ошибка при поиске последних элементов:", error);
        res.status(500).json({
            error: "Произошла ошибка при поиске последних элементов.",
        });
    }
});
app.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = {} as UserDto;

        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        let result = await UserSchema.create(newUser);
        console.log("ID нового пользователя:", result);
        const userRole = await RoleSchema.findOne({ name: "user" });

        if (!userRole) {
            const newUserRole = new RoleSchema({ name: "user" });
            await newUserRole.save();
        } else {
            const userRoleId = userRole._id;
            const newUserRole = new UserRoleSchema({
                user_id: result._id,
                role_id: userRoleId,
            });
            await newUserRole.save();
            res.status(201).json({ _id: result });
        }
    } catch (error) {
        console.error("Ошибка при добавлении пользователя:", error);
        res.status(500).json({
            error: "Произошла ошибка при добавлении пользователя.",
        });
    }
});

app.post("/password", async (req, res) => {
    let { email, password } = req.body;

    let found = await UserSchema.findOne({ email });
    if (!found) {
        res.json({ success: false, message: "User not found" });
    } else {
        if (found.password === password) {
            res.json({
                success: true,
                message: "Login successful",
                username: found.username,
                email: found.email,
                userId: found.id,
            });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    }
});

app.post("/collections", async (req, res) => {
    try {
        const { user_id, name, config, description } = req.body;
        const newCollection = {} as collectionDTO;
        newCollection.name = name;
        newCollection.config = config;
        newCollection.description = description;
        let result = await CollectionSchema.create(newCollection);
        console.log("ID новой коллекции:", result.id);

        const collectionIdObjectId = result._id;
        const userCollectionPairs = {} as UserCollectionDto;
        userCollectionPairs.user_id = new ObjectId(user_id);
        userCollectionPairs.collection_id = collectionIdObjectId;
        await UserCollectionSchema.create(userCollectionPairs);

        const collectionItem = {} as CollectionItemDto;
        collectionItem.collection_id = collectionIdObjectId;
        await CollectionItemSchema.create(collectionItem);

        res.status(201).json({ collectionIdObjectId });
    } catch (error) {
        console.error("Ошибка при добавлении коллекции:", error);
        res.status(500).json({
            error: "Произошла ошибка при добавлении коллекции.",
        });
    }
});

app.post("/collections/:collection_id/item", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;
        const newItem = req.body;
        const newItemWithId = {
            ...newItem,
            item_id: new ObjectId(),
        };
        const updatedCollection = await CollectionItemSchema.findOneAndUpdate(
            { collection_id: collectionId },
            { $push: { items: newItemWithId } },
            { new: true }
        );

        if (!updatedCollection) {
            return res.status(404).json({ error: "Collection not found" });
        }

        return res.json(newItemWithId);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/:user_id/collection", async (req, res) => {
    try {
        const userId = req.params.user_id;
        const collection = await UserCollectionSchema.find({
            user_id: userId,
        });
        if (collection) {
            res.json(collection);
        } else {
            res.status(404).json({ error: "Config не найден" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});

app.get("/collections/:collection_id", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;
        const collection = await CollectionSchema.findById(collectionId);

        if (collection) {
            res.json(collection);
        } else {
            res.status(404).json({ error: "Config не найден" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});

app.get("/collections/:collection_id/:item_id", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;
        const itemId = req.params.item_id;

        const item = await CollectionItemSchema.findOne({
            collection_id: collectionId,
        });

        if (item) {
            const foundItem = item.items.find(
                (item: { item_id: any }) =>
                    String(item.item_id) === String(itemId)
            );

            if (foundItem) {
                res.json(foundItem);
            } else {
                res.status(404).json({ error: "Элемент не найден" });
            }
        } else {
            res.status(404).json({ error: "Коллекция не найдена" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});

app.get("/collection/:collection_id/items", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;

        const items = await CollectionItemSchema.findOne({
            collection_id: collectionId,
        });

        if (items) {
            res.json(items);
        } else {
            res.status(404).json({ error: "Config не найден" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});

app.get("/users/:user_id", async (req, res) => {
    try {
        const userID = req.params.user_id;
        const user = await UserSchema.findOne({
            _id: userID,
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "user не найден" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});

app.put("/users/:user_id", async (req, res) => {
    try {
        const updateFields: Record<string, string | undefined> = {};

        const userID = req.params.user_id;

        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                updateFields[key] = req.body[key];
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res
                .status(400)
                .json({ message: "Не переданы данные для обновления" });
        }

        const user = await UserSchema.updateOne(
            { _id: userID },
            { $set: updateFields }
        );

        if (user) {
            res.status(200).json({ message: "Пользователь успешно обновлен" });
        } else {
            res.status(404).json({ message: "Пользователь не найден" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Произошла ошибка при обновлении пользователя",
        });
    }
});

app.put("/collections/:collection_id", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;
        const { name, config, description } = req.body;

        const updateFields: any = {};
        if (name) {
            updateFields.name = name;
        }
        if (config) {
            updateFields.config = config;
        }
        if (description) {
            updateFields.description = description;
        }

        const updatedCollection = await CollectionSchema.findByIdAndUpdate(
            collectionId,
            updateFields,
            { new: true }
        );

        if (updatedCollection) {
            res.json(updatedCollection);
        } else {
            res.status(404).json({ error: "Коллекция не найдена" });
        }
    } catch (error) {
        console.error("Ошибка при обновлении коллекции:", error);
        res.status(500).json({
            error: "Произошла ошибка при обновлении коллекции.",
        });
    }
});

app.put("/collections/:collection_id/:item_id", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;
        const itemId = req.params.item_id;
        const updatedItem = req.body;

        const collection = await CollectionItemSchema.findOne({
            collection_id: collectionId,
        });

        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }

        const itemIndex = collection.items.findIndex(
            (item: { item_id: any }) => String(item.item_id) === String(itemId)
        );

        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found" });
        }

        collection.items[itemIndex] = {
            ...collection.items[itemIndex],
            ...updatedItem,
        };

        await collection.save();

        return res.json(collection.items[itemIndex]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/users/:user_id", async (req, res) => {
    try {
        const userID = req.params.user_id;

        const deletedUser = await UserSchema.deleteOne({
            _id: userID,
        });

        const deletedUserCollections = await UserCollectionSchema.deleteOne({
            user_id: userID,
        });

        const deletedUserRoles = await UserRoleSchema.deleteOne({
            user_id: userID,
        });

        res.json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при удалении данных" });
    }
});

app.delete("/collections/:collection_id", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;

        const deletedCollection = await CollectionSchema.deleteOne({
            _id: collectionId,
        });
        await UserCollectionSchema.deleteOne({
            collection_id: collectionId,
        });
        await CollectionItemSchema.deleteOne({
            collection_id: collectionId,
        });

        res.json(deletedCollection);
        console.log("Коллекция удалена");
    } catch (error) {
        console.error("Ошибка при обновлении коллекции:", error);
        res.status(500).json({
            error: "Произошла ошибка при обновлении коллекции.",
        });
    }
});

app.delete("/collections/:collection_id/:item_id", async (req, res) => {
    try {
        const collectionId = req.params.collection_id;
        const itemId = req.params.item_id;

        const collection = await CollectionItemSchema.findOne({
            collection_id: collectionId,
        });
        if (!collection) {
            return res.status(404).json({ error: "Collection not found" });
        }
        const itemIndex = collection.items.findIndex(
            (item: { item_id: any }) => String(item.item_id) === String(itemId)
        );
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Элемент не найден" });
        }

        collection.items.splice(itemIndex, 1);

        await collection.save();

        res.json({ message: "Элемент успешно удален" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при удалении данных" });
    }
});
