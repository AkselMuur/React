import React from 'react';
import ExpensesFilter from './ExpensesFilter';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';

const Expenses = (props) => {
    console.log("Selected year:", props.selected);
    console.log("All expenses:", props.expenses);

    // Filtreerime andmed
    const filteredExpenses = props.expenses.filter((expense) => {
        return expense.date.getFullYear().toString() === props.selected;
    });

    console.log("Filtered expenses:", filteredExpenses);

    return (
        <div className="expenses">
            <ExpensesFilter 
                selected={props.selected} 
                onChangeFilter={props.onChangeFilter} 
            />

            {filteredExpenses.length === 0 && <p className="expenses-list__fallback">No expenses found.</p>}

            {filteredExpenses.length > 0 &&
                filteredExpenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        title={expense.title}
                        price={expense.price}
                        date={expense.date}
                    />
                ))
            }
        </div>
    );
};

export default Expenses;
