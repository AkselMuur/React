import { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";

const App = () => {
  const [filteredYear, setFilteredYear] = useState("2025");

  const [expenses, setExpenses] = useState([]);
  fetch("http://localhost:8001/expenses")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      setExpenses(responseData.expenses);
    });
  console.log(expenses);

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
