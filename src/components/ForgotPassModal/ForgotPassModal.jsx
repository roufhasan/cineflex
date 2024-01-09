import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
const ForgotPassModal = ({ isOpen, setIsOpen }) => {
  const { passwordReset, setLoading } = useContext(AuthContext);

  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (email) {
      passwordReset(email)
        .then(() => {
          toast.success("Check your email!");
          setIsOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
        });
    } else {
      toast.error("Please provide an email");
      setLoading(false);
    }
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
          <div className="fixed inset-0 bg-blue-gray" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Reset your password.
                </Dialog.Title>
                <form onSubmit={handleResetPassword}>
                  <div className="mt-6">
                    <label
                      htmlFor="email"
                      className="text-lg font-medium inline-block mb-2"
                    >
                      Email <span className="text-custom-orange">*</span>
                    </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="xyz@gmail.com"
                      className="w-full h-10 border rounded-md outline-none px-4 focus:border-black"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.7 }}
                      type="submit"
                      className="bg-[#e2a541] text-white px-4 py-2 rounded-md transition-all hover:bg-custom-orange"
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ForgotPassModal;
