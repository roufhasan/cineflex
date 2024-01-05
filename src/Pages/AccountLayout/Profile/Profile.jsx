import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName);
  const [nameReadOnly, setNameReadOnly] = useState(true);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-20 justify-center">
        <div className="text-center">
          <img
            src={user?.photoURL}
            alt=""
            className="w-40 h-40 object-cover rounded-full mb-7"
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-custom-orange font-medium px-3 py-1 rounded-md"
          >
            {user.photoURL ? "Change Photo" : "Upload Photo"}
          </label>
          <input
            className="hidden"
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
          />
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="w-full mb-2 flex justify-between">
              Name{" "}
              <span
                onClick={() => setNameReadOnly(false)}
                className="text-gray-400 cursor-pointer"
              >
                edit
              </span>
            </label>
            {nameReadOnly ? (
              <input
                className="w-full h-10 text-black px-4 rounded-md outline-none"
                type="text"
                id="name"
                readOnly
                value={name}
              />
            ) : (
              <input
                className={`w-full h-10 text-black px-4 rounded-md outline-none border-2 focus:border-custom-orange`}
                type="text"
                id="name"
                value={name}
                {...register("test", {
                  onChange: (e) => {
                    setName(e.target.value);
                  },
                  onBlur: () => setNameReadOnly(true),
                })}
              />
            )}
          </div>
          <div>
            <label htmlFor="email" className="w-full mb-2 inline-block">
              Email
            </label>
            <input
              className="w-full h-10 text-black px-4 rounded-md outline-none"
              type="email"
              id="email"
              readOnly
              value={user.email}
              {...register("email", { required: true })}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 mt-20">
        <button className="text font-medium border px-3 py-1 rounded-md">
          Cancel
        </button>
        <button
          type="submit"
          className="text font-medium bg-custom-orange px-3 py-1 rounded-md"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default Profile;
