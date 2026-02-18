import { useContext, useEffect } from "react";
import ThemeContext from "../store/theme.jsx";

const Page = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div id="app" className={theme}>
      {children}
    </div>
  );
};

export default Page;
