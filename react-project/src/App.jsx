import {
  useState,
  useEffect,
  createContext,
  useContext,
  Fragment,
} from "react";
import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";
import Error from "./components/UI/Error.jsx";
import MainHeader from "./components/MainHeader/MainHeader.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";

export const ThemeContext = createContext(null);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (JSON.parse(localStorage.getItem("isLoggedUser")) !== null) {
      return JSON.parse(localStorage.getItem("isLoggedUser")).isLogged;
    } else {
      return false;
    }
  });
  console.log(loggedIn);

  useEffect(() => {
    const storedLoggedUserData = JSON.parse(
      localStorage.getItem("isLoggedUser"),
    );
    if (storedLoggedUserData !== null) {
      if (storedLoggedUserData.isLogged === true) {
        setLoggedIn(true);
      }
    }
  }, []);

  const loginHandler = (user, password) => {
    const loggedUser = localStorage.setItem(
      "isLoggedUser",
      JSON.stringify({
        username: user,
        isLogged: true,
      }),
    );
    setLoggedIn(true);
  };

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

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedUser");
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <MainHeader isAuthenticated={loggedIn} onLogout={logoutHandler} />
      <main>
        {!loggedIn && <Login onLogin={loginHandler} />}
        {loggedIn && <Home />}
      </main>
      <div>
        {showError && <Error title={error.title} message={error.message} />}
        <NewExpense onAddExpense={addExpenseHandler} />

        <Expenses
          expenses={expenses}
          isLoading={isFetching}
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
      </div>
    </div>
  );
};

export default App;
