const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    if (description.length > 255) {
      return res
        .status(400)
        .send({ message: "Error, Description is too long." });
    }
    if (description.length === 0) {
      return res
        .status(400)
        .send({ message: "Error, Description needs to be set." });
    }
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY id DESC");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error, Error getting todos.");
  }
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  if (Number.isInteger(id)) {
    return res
      .status(400)
      .send({ message: "Error, Id is not in the right format." });
  }
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error, Error getting todo.");
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (Number.isInteger(id)) {
      return res
        .status(400)
        .send({ message: "Error, Id is not in the right format." });
    }
    if (description.length > 255) {
      return res
        .status(400)
        .send({ message: "Error, Description is too long." });
    }
    if (description.length === 0) {
      return res
        .status(400)
        .send({ message: "Error, Description needs to be set." });
    }

    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );

    res.json("Success! Update successful.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error, Error updating todo.");
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (Number.isInteger(id)) {
      return res
        .status(400)
        .send({ message: "Error, Id is not in the right format." });
    }
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("Success! Delete successful.");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
