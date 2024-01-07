import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const useWatchlist = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: watchlist = [] } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://cineflex-server.vercel.app/watchlist?email=${user.email}`
      );
      return res.json();
    },
  });

  return [watchlist, refetch];
};

export default useWatchlist;
