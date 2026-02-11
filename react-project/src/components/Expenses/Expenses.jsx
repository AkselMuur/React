import React from "react";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import ExpensesList from "./ExpensesList";

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

      <ExpensesList
        filteredExpenses={filteredExpenses}
        isLoading={props.isLoading}
      />
    </div>
  );
};

export default Expenses;
