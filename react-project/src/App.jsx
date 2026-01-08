import Expenses from "./components/Expenses/Expenses.jsx";

const App = () => {
  const expenses = [
    {
      date: new Date(2024, 10, 12),
      title: "New book1",
      price: 30.99,
    },
    {
      date: new Date(2025, 7, 12),
      title: "New book2",
      price: 99.3,
    },
  ];

  return (
    <div className="App">
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;
