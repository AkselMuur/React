import "./Login.css";
import { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "USER_BLUR") {
    return {
      value: state.value,
      isValid: state.value.includes("@"),
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "USER_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log("check form is valid");
      setFormIsValid(emailState.isValid && passwordState.isValid);
      console.log("checked");
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const emailValidateHandler = () => {
    dispatchEmail({
      type: "USER_BLUR",
    });
  };

  const passwordValideteHandler = () => {
    dispatchPassword({
      type: "USER_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className="Login">
      <form onSubmit={submitHandler}>
        <div
          className={`control ${emailState.isValid === false ? "invalid" : ""}`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={emailValidateHandler}
          ></input>
        </div>
        <div
          className={`control ${passwordState.isValid === false ? "invalid" : ""}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={passwordValideteHandler}
          ></input>
        </div>
        <div className="actions">
          <button type="submit" disabled={!formIsValid}>
            Login
          </button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
