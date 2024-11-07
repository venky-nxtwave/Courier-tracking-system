const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Connect to MongoDB with error handling
mongoose
  .connect("mongodb+srv://admin:Annaiah123@cluster0.sbyadvi.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const ItemSchema = new mongoose.Schema({
  user_name: { type: String, requied: true },
  item_id: { type: String, required: true },
  order_status: { type: String, requied: true },
});

// Creating User Schema for Registration
const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
});

// Creating User Schema for Authentication
const AdminSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
});

// const AdminModel=mongoose.model('AdminDetails',AdminSchema);
const ItemModel = mongoose.model("items", ItemSchema);
const userModel = mongoose.model("users", userSchema);

//USERS LOGIN API
app.post("/api/user/login", async (req, res) => {
  try {
    const { body } = req;
    if (!body.password || !body.user_name) {
      return res.status(400).json("Missing required field");
    }
    console.log(body);
    let user = null;
    const response = await userModel.find();
    for (let i = 0; i < response.length; i++) {
      if (
        response[i].user_name === body.user_name &&
        response[i].password === body.password
      ) {
        user = response[i];
        break;
      }
    }
    if (user === null) {
      console.log("invalid username or password");
      res.status(404).json("invalid username or password");
      return;
    }
    console.log("Login Successful");
    res.status(200).json("successfylly logged in");
  } catch (err) {
    console.log("Error in login ", err);
    res.status(500).json(err);
  }
});

//Users Registeration API
app.post("/api/user/register", async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    if (!body.password || !body.user_name) {
      return res.status(400).json("Missing required field");
    }
    let getUser = null;
    getUser = await userModel.find({ user_name: body.user_name });
    console.log(getUser);
    if (getUser.length > 0) {
      return res.status(500).json("User already present Please Login");
    }
    const newItem = new userModel(body); // Assuming you have an ItemModel defined
    await newItem.save();
    console.log("Registration Completed");
    res.status(200).json("User Registered");
  } catch (err) {
    console.log("Error in", err);
    res.status(400).json("Error in Registration");
  }
});

// Add Item
app.post("/api/additem", async (req, res) => {
  try {
    const { body } = req; // Access data from req.body
    console.log(body);
    if (!body.item_id || !body.user_name) {
      console.log("dhfhdf");
      return res.status(400).json("Missing required field");
    }
    const item = { ...body, order_status: "ordered" };
    let checkItem = null;
    checkItem = await ItemModel.find({ item_id: item.item_id });
    console.log(checkItem);
    if (checkItem.length > 0) {
      return res.status(404).json("Item Already Present");
    }

    const newItem = new ItemModel(item); // Assuming you have an ItemModel defined
    await newItem.save();
    res.status(200).json("item inserted");
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json("Error processing request");
  }
});

//Get All Items API
app.get("/api/getitems", async (req, res) => {
  console.log("GET request received");
  try {
    const items = await ItemModel.find();
    console.log(items);
    res.status(200).json(items);
  } catch (err) {
    console.log("Error in Fetchinig the Data: ", err);
    res.status(500).send("Error retrieving data");
  }
});

//Search Specific User Item API with item_id
app.post("/api/getItem", async (req, res) => {
  const { body } = req;
  console.log(body.item_id);
  let searchItem = null;
  searchItem = await ItemModel.find({ item_id: body.item_id });
  console.log(searchItem);
  if (searchItem.length > 0) {
    return res.status(200).json(searchItem[0]);
  }
  console.log("your item not found");
  return res.status(500).json("item not found");
});

//Update Delivery Status API
app.put("/api/ubdatestatus", async (req, res) => {
  const { body } = req;
  const itemId = body._id;
  const newupdate = body.order_status;
  console.log(itemId);
  const updatedItem = await ItemModel.findByIdAndUpdate(
    itemId,
    { $set: { order_status: newupdate } },
    { new: true } // Return the updated document
  );
  if (!updatedItem) {
    return res.status(404).send("Item not found");
  }

  res.status(200).json(updatedItem);
});

app.listen(3001, () => {
  console.log("Server Is Runnig At:localhost:3001");
});
