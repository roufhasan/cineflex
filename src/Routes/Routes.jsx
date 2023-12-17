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
        path: "/movies/popular",
        element: <MovieLists apiPath={"popular"} title="Popular Movies" />,
      },
      {
        path: "/movies/top_rated",
        element: <MovieLists apiPath={"top_rated"} title="Top Rated Movies" />,
      },
      {
        path: "/movies/now_playing",
        element: (
          <MovieLists apiPath={"now_playing"} title="Currently In Theaters" />
        ),
      },
      {
        path: "/movies/upcoming",
        element: <MovieLists apiPath={"upcoming"} title="Upcoming Movies" />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
        loader: ({ params }) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=${
              import.meta.env.VITE_API_KEY
            }&append_to_response=credits,videos`
          ),
      },
      {
        path: "/tv/:id",
        element: <MovieDetails />,
        loader: ({ params }) =>
          fetch(
            `https://api.themoviedb.org/3/tv/${params.id}?api_key=${
              import.meta.env.VITE_API_KEY
            }&append_to_response=credits,videos`
          ),
      },
    ],
  },
]);
