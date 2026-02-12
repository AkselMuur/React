import "./Navigation.css";
import Button from "../UI/Button.jsx";
import AuthContext from "../store/auth-context.jsx";

const Navigation = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <nav className="nav">
            <ul>
              <li>
                <a href="/users">Users</a>
              </li>
              <li>
                <a href="/admin">Admin</a>
              </li>
              {context.loggedIn && (
                <li>
                  <Button onClick={context.onLogout}>Logout</Button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
