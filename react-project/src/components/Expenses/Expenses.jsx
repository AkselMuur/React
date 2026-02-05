import React from "react";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";

const Expenses = (props) => {
  const filteredExpenses = props.expenses.filter((expense) => {
    const date =
      expense.date instanceof Date ? expense.date : new Date(expense.date);

    return date.getFullYear().toString() === props.selected;
  });

  return (
    <div className="expenses">
      <ExpensesFilter
        selected={props.selected}
        onChangeFilter={props.onChangeFilter}
      />

      {filteredExpenses.length === 0 && (
        <p className="expenses-list__fallback">No expenses found.</p>
      )}

      {filteredExpenses.length > 0 &&
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            price={expense.price}
            date={
              expense.date instanceof Date
                ? expense.date
                : new Date(expense.date)
            }
          />
        ))}
    </div>
  );
};

export default Expenses;
