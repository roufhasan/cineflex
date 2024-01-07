import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";

const DeleteModal = ({
  isOpen,
  setIsOpen,
  refetch,
  handleAccountDelete,
  title,
}) => {
  const { user } = useContext(AuthContext);

  const deleteWatchlist = () => {
    fetch(`https://cineflex-server.vercel.app/watchlist/email/${user?.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsOpen(false);
        if (data.acknowledged && data.deletedCount > 0) {
          refetch();
          toast.success("Watchlist deleted");
        }
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  🚨Warning: Delete <span className="capitalize">{title}</span>
                </Dialog.Title>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    Deleting this {title} will permanently erase all saved
                    movies and shows. This action cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-[#c1c1c1] text-white px-4 py-2 rounded-md transition-all hover:bg-[#8d8c8c]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      handleAccountDelete
                        ? handleAccountDelete
                        : deleteWatchlist
                    }
                    className="bg-custom-orange text-white px-4 py-2 rounded-md transition-all hover:bg-orange-400"
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
