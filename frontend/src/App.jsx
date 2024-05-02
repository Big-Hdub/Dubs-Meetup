import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Welcome!</h1>
  },
  {
    path: 'login',
    element: <LoginFormPage />
  },
  {
    path: '*',
    element: <h1>Page Not Found!</h1>
  }])

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const restore = async () => {
      dispatch(restoreUser());
    }
    restore();
  }, [dispatch])

  return <RouterProvider router={router} />;
}

export default App;
