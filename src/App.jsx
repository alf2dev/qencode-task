import "./fonts/BasisGrotesquePro/stylesheet.css";
import styles from "./components/Auth/Auth.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Profile from "./components/Auth/Profile";
import CredentialDataProvider from "./services/providers/CredentialData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "set-password",
    element: <ResetPassword />,
  },

  {
    path: "profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <div className={styles.container}>
      <CredentialDataProvider>
        <RouterProvider router={router} />
      </CredentialDataProvider>
    </div>
  );
}
export default App;
