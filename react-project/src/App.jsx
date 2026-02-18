import { useState, useEffect, useContext } from "react";

import Expenses from "./components/Expenses/Expenses.jsx";
import NewExpense from "./components/NewExpense/NewExpense.jsx";
import Error from "./components/UI/Error.jsx";
import MainHeader from "./components/MainHeader/MainHeader.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import AuthContext from "./components/store/auth-context.jsx";
import Page from "./components/UI/Page.jsx";

import { ThemeProvider } from "./components/store/theme.jsx";
import ThemeContext from "./components/store/theme.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
};

const InnerApp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [loggedIn, setLoggedIn] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("isLoggedUser"));
    return stored?.isLogged || false;
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("isLoggedUser"));
    if (stored?.isLogged) setLoggedIn(true);
  }, []);

  const loginHandler = (user, password) => {
    localStorage.setItem(
      "isLoggedUser",
      JSON.stringify({ username: user, isLogged: true }),
    );
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedUser");
    setLoggedIn(false);
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
        const data = await response.json();

        if (!response.ok) throw new Error("Failed fetching data");

        setExpenses(data.expenses);
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
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed saving data");

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

  const filterChangeHandler = (year) => {
    setFilteredYear(year);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, onLogout: logoutHandler }}>
      <Page>
        <button onClick={toggleTheme} style={{ margin: "1rem" }}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        <MainHeader onLogout={logoutHandler} />

        <main>
          {!loggedIn && <Login onLogin={loginHandler} />}
          {loggedIn && <Home />}
        </main>

        {showError && <Error title={error.title} message={error.message} />}

        <NewExpense onAddExpense={addExpenseHandler} />

        <Expenses
          expenses={expenses}
          isLoading={isFetching}
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
      </Page>
    </AuthContext.Provider>
  );
};

export default App;
