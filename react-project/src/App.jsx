import ExpenseItem from "./components/ExpenseItem.jsx";
import "./components/ExpenseItem.css";

const App = () => {
  const expenses = [
    {
    date: new Date(2024, 10, 12),
    title: 'New book1',
    price: 30.99
  },
  {
    date: new Date(2025, 7, 12),
    title: 'New book2',
    price: 99.30
  }
]

  return (
    <div className="App">
      <ExpenseItem data={expenses[0]} />
            <ExpenseItem data={expenses[1]} />
    </div>
  );
};

export default App;
