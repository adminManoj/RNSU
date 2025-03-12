const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// Dummy data (acting as a database)
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Add a new item
app.post("/api/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.json(newItem);
});

// Update an item
app.put("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let item = items.find((item) => item.id == id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.name = name;
  res.json(item);
});

// Delete an item
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter((item) => item.id != id);
  res.json({ message: "Item deleted successfully" });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
