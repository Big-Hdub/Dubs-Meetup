import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";

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
  return <RouterProvider router={router} />;
}

export default App;
