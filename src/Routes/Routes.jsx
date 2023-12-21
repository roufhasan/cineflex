import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";
import MovieLists from "../Pages/MovieLists/MovieLists";
import PersonDetails from "../Pages/PersonDetails/PersonDetails/PersonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      // ==> Movies & TV-Shows Lists <==
      {
        path: "/movies/popular",
        element: (
          <MovieLists
            apiPath={"popular"}
            mediaType={"movie"}
            title="Popular Movies"
          />
        ),
      },
      {
        path: "/movies/top_rated",
        element: (
          <MovieLists
            apiPath={"top_rated"}
            mediaType={"movie"}
            title="Top Rated Movies"
          />
        ),
      },
      {
        path: "/movies/now_playing",
        element: (
          <MovieLists
            apiPath={"now_playing"}
            mediaType={"movie"}
            title="Currently In Theaters"
          />
        ),
      },
      {
        path: "/movies/upcoming",
        element: (
          <MovieLists
            apiPath={"upcoming"}
            mediaType={"movie"}
            title="Upcoming Movies"
          />
        ),
      },
      {
        path: "/tv-shows/popular",
        element: (
          <MovieLists
            mediaType={"tv"}
            apiPath={"popular"}
            title="Popular Shows"
          />
        ),
      },
      {
        path: "/tv-shows/top_rated",
        element: (
          <MovieLists
            mediaType={"tv"}
            apiPath={"top_rated"}
            title="Top Rated Shows"
          />
        ),
      },
      {
        path: "/tv-shows/airing_today",
        element: (
          <MovieLists
            mediaType={"tv"}
            apiPath={"airing_today"}
            title="Airing Shows Today"
          />
        ),
      },
      {
        path: "/tv-shows/on_the_air",
        element: (
          <MovieLists
            mediaType={"tv"}
            apiPath={"on_the_air"}
            title="Upcoming Shows"
          />
        ),
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
      {
        path: "/person/:id",
        element: <PersonDetails />,
        loader: ({ params }) =>
          fetch(
            `https://api.themoviedb.org/3/person/${params.id}?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          ),
      },
    ],
  },
]);
