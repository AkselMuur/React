import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "../UI/Card.jsx";
import { useState } from "react";

const ExpenseItem = (props) => {
  const [title, setTitel] = useState(props.title);

  const clickHandler = () => {
    console.log("Clicked");
    setTitel(`Updated by click ${title}`);
    console.log(title);
  };
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">{props.price}</div>
      </div>
      <button onClick={clickHandler}>Click Me</button>
    </Card>
  );
};
export default ExpenseItem;
