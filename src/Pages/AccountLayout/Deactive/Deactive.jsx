import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import useWatchlist from "../../../hooks/useWatchlist";
import { useNavigate } from "react-router-dom";

const Deactive = () => {
  const { user, deleteAccount } = useContext(AuthContext);
  const [, refetch] = useWatchlist();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const deleteWatchlist = () => {
    fetch(`http://localhost:5000/watchlist/email/${user?.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsOpen(false);
        if (data.acknowledged && data.deletedCount > 0) {
          refetch();
        }
      });
  };

  const handleAccountDelete = () => {
    deleteAccount()
      .then(() => {
        deleteWatchlist();
        toast.success("Account Deleted");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("An Error Ocurred!");
      });
  };
  return (
    <div>
      <p>Permenetly Delete Your Account.</p>
      <button onClick={() => setIsOpen(true)} className="text-red-400">
        Deactivate
      </button>
      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refetch={refetch}
          handleAccountDelete={handleAccountDelete}
          title="account"
        />
      )}
    </div>
  );
};

export default Deactive;
