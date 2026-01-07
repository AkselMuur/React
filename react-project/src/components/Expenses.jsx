import ExpenseItem from "./ExpenseItem.jsx";
import "./Expenses.css";
import Card from "./Card.jsx"
import "./ExpenseDate.css";

const Expenses = (props) => {
  return (
    <Card className="expenses">
      {props.expenses.map((expense) => (
        <ExpenseItem
          title={expense.title}
          price={expense.price}
          date={expense.date}
        />
      ))}
    </Card>
  );
};

export default Expenses;
