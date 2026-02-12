import "./Login.css";
import  {useState,useEffect} from 'react'
import Card from "../UI/Card";
import Button from "../UI/Button";

const Login = (props) => {
    const [enteredEmail, setEnteredEmail]= useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [emailIsValid, setEmailIsValid] = useState()
    const [passwordIsValid, setPasswordIsValid]=useState()
    const [formIsValid, setFormIsValid]=useState(false)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            console.log('check form is valid')
            setFormIsValid(emailIsValid && passwordIsValid)
            console.log('checked')
        },500)
        return () => {
            clearTimeout(timeOut)
        }
    },[emailIsValid, passwordIsValid])

    const emailChangeHandler=(event)=>{
        setEnteredEmail(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    }



    const emailValidateHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'))
    }

    const passwordValideteHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length>6)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onLogin(enteredEmail,enteredPassword)
    }

  return (
    <Card className="Login">
      <form onSubmit={submitHandler}>
        <div className={`control ${emailIsValid === false ? 'invalid': ''}`}>
          <label htmlFor="email">Email</label>
          <input type="email" onBlur={emailValidateHandler}></input>
        </div>
        <div className={`control ${passwordIsValid === false ? 'invalid': ''}`}>
          <label htmlFor="password">Password</label>
          <input type="password" onBlur={passwordValideteHandler}></input>
        </div>
        <div className="actions">
          <button type="submit"
          disabled={!formIsValid}
          >Login</button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
