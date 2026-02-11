import { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";
import Error from "./components/UI/Error.jsx";

const App = () => {
  const [filteredYear, setFilteredYear] = useState("2025");
  const [expenses, setExpenses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:8001/expenses");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("Failed fetching data");
        }

        setExpenses(responseData.expenses);
      } catch (error) {
        setError({
          title: "An error occurred!",
          message: "Failed fetching expenses data, please try again later.",
        });
        setShowError(true);
      }

      setIsFetching(false);
    };

    getExpenses();
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandler = (expense) => {
    const addExpense = async () => {
      try {
        const response = await fetch("http://localhost:8001/add-expense", {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error("Failed saving data");
        }

        setExpenses((prev) => [expense, ...prev]);
      } catch (error) {
        setError({
          title: "An error occurred!",
          message: "Failed saving expenses data, please try again.",
        });
        setShowError(true);
      }
    };

    addExpense();
  };

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div className="App">
      {showError && <Error title={error.title} message={error.message} />}
      <NewExpense onAddExpense={addExpenseHandler} />

      <Expenses
        expenses={expenses}
        isLoading={isFetching}
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
    </div>
  );
};

export default App;
