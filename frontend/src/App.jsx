import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from './store/session';
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import GroupsPage from "./components/GroupsPage";
import EventsPage from "./components/EventsPage";
import GroupDetailsPage from "./components/GroupDetailsPage";
import EventDetailsPage from "./components/EventDetailsPage";
import CreateGroup from "./components/CreateGroup";
import YourGroupsPage from "./components/GroupsPage/YourGroupsPage";
import CreateEvent from "./components/CreateEvent";
import UpdateGroup from "./components/UpdateGroup";
import Footer from "./components/Footer";

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: 'groups',
        children: [
          {
            path: '',
            element: <GroupsPage />
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                element: <GroupDetailsPage />
              },
              {
                path: 'update',
                element: <UpdateGroup />
              }
            ]
          },
          {
            path: 'create',
            element: <CreateGroup />
          },
          {
            path: 'current',
            element: <YourGroupsPage />
          }
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            element: <EventsPage />
          },
          {
            path: ':id',
            element: <EventDetailsPage />
          },
          {
            path: 'create',
            element: <CreateEvent />
          }
        ]
      },
      {
        path: '*',
        element: <h1>Page Not Found!</h1>
      }
    ]
  }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
