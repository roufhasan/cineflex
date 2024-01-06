import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaUser } from "react-icons/fa6";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName);
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [selectedImg, setSelectedImg] = useState();
  const imgRef = useRef(null);

  const handleImageClick = () => {
    imgRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.name.value);
  };
  return (
    <form onSubmit={handleUpdateProfile}>
      <div className="flex gap-20 justify-center">
        <div className="text-center">
          {selectedImg ? (
            <img
              onClick={handleImageClick}
              src={URL.createObjectURL(selectedImg)}
              alt=""
              className="w-40 h-40 object-cover rounded-full mb-7"
            />
          ) : (
            <>
              {user.photoURL ? (
                <img
                  onClick={handleImageClick}
                  src={user?.photoURL}
                  alt=""
                  className="w-40 h-40 object-cover rounded-full mb-7"
                />
              ) : (
                <FaUser onClick={handleImageClick} className="w-40 h-40 mb-7" />
              )}
            </>
          )}

          <label
            onClick={handleImageClick}
            className="cursor-pointer bg-custom-orange font-medium px-3 py-1 rounded-md"
          >
            {user.photoURL ? "Change Photo" : "Upload Photo"}
          </label>
          <input
            ref={imgRef}
            onChange={handleImageChange}
            className="hidden"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <div className="w-1/2 flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="w-full mb-2 flex justify-between">
              Name
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
                name="defaultName"
                readOnly
                value={name}
              />
            ) : (
              <input
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setNameReadOnly(true)}
                className={`w-full h-10 text-black px-4 rounded-md outline-none border-2 focus:border-custom-orange`}
                type="text"
                id="name"
                value={name}
                name="name"
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
              name="email"
              readOnly
              value={user.email}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 mt-20">
        <button className="text font-medium border px-3 py-1 rounded-md">
          Cancel
        </button>
        {selectedImg || name !== user?.displayName ? (
          <button
            type="submit"
            className={`text font-medium bg-custom-orange px-3 py-1 rounded-md`}
          >
            Update
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className={`text font-medium bg-gray-400 px-3 py-1 rounded-md`}
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default Profile;
