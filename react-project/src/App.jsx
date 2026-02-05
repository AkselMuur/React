import { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";

const App = () => {
  const [filteredYear, setFilteredYear] = useState("2025");

  const [expenses, setExpenses] = useState(() => {
    const expensesFromLS = JSON.parse(localStorage.getItem("expenses"));
    return expensesFromLS || [];
  });
/*
  const [expenses, setExpenses] = useState([
    {
      id: 100,
      date: new Date(2027, 10, 12),
      title: "New book1",
      price: 30.99,
    },
    {
      id: 101,
      date: new Date(2026, 7, 12),
      title: "New book2",
      price: 99.3,
    },
    {
      id: 102,
      date: new Date(2026, 7, 12),
      title: "New bag",
      price: 9.3,
    },
  ]);
  */

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />

      <Expenses
        expenses={expenses}
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
    </div>
  );
};

export default App;
