import express from "express";
import fs from "node:fs/promises";

const app = express();

// CORS middleware (global)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Preflight handlers (Express 5 requires explicit paths)
app.options("/add-expense", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

app.options("/expenses", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET expenses
app.get("/expenses", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/expenses.json", "utf8");
    const expensesData = JSON.parse(fileContent);
    res.status(200).json({ expenses: expensesData });
  } catch (err) {
    res.status(500).json({ message: "Failed to read expenses file" });
  }
});

// POST add expense
app.post("/add-expense", async (req, res) => {
  try {
    const expenseData = req.body;

    const newExpense = {
      ...expenseData,
      id: (Math.random() * 1000).toString(),
    };

    const fileContent = await fs.readFile("./data/expenses.json", "utf8");
    const expensesData = JSON.parse(fileContent);

    expensesData.push(newExpense);

    await fs.writeFile("./data/expenses.json", JSON.stringify(expensesData));

    res.status(201).json({ message: "Expense added", expense: newExpense });
  } catch (err) {
    res.status(500).json({ message: "Failed to save expense" });
  }
});

// Start server
app.listen(8001, () => {
  console.log("Backend server connected, port 8001");
});
