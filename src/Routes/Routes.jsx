import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import MovieLists from "../Pages/MovieLists/MovieLists";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/now_playing",
        element: (
          <MovieLists apiPath={"now_playing"} title="Currently Playing" />
        ),
      },
      {
        path: "/movies/upcoming",
        element: <MovieLists apiPath={"upcoming"} title="Coming Soon" />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);
