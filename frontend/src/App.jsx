import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { restoreUser } from "./store/session";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
      }
    ]
  }])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
