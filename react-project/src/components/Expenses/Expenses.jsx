import ExpenseItem from "./ExpenseItem.jsx";
import "./Expenses.css";
import Card from "../UI/Card.jsx";
import "./ExpenseDate.css";
import {useState} from "react"
import ExpensesFilter from './ExpensesFilter.jsx'


const Expenses = (props) => {
const [filteredYear, setFilteredYear] = useState('2026')

const filterChangeHandler = (selectedYear) => {
  //console.log(selectedYear)
  setFilteredYear(selectedYear)
}

  return (
    <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler}/>
      {props.expenses.map((expense) => (
        <ExpenseItem
        key={expense.id}
          title={expense.title}
          price={expense.price}
          date={expense.date}
        />
      ))}
    </Card>
  );
};

export default Expenses;
