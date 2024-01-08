import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName);
  const [nameReadOnly, setNameReadOnly] = useState(true);
  const [selectedImg, setSelectedImg] = useState();
  const navigate = useNavigate();
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
    const name = form.name.value;
    const image = selectedImg;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Image_Upload_API_Key
      }`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageData) => {
          const imageURL = imageData.data.display_url;
          updateUserProfile(name, imageURL)
            .then(() => {
              toast.success("Profile Updated");
              navigate("/");
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      return;
    }

    if (name !== user?.displayName) {
      updateUserProfile(name, user?.photoURL)
        .then(() => {
          toast.success("Profile Updated");
          navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    return;
  };
  return (
    <form onSubmit={handleUpdateProfile} className="min-h-[calc(100vh-181px)]">
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:items-start md:gap-20">
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
            className="bg-custom-orange font-medium rounded-md px-3 py-1 cursor-pointer"
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

        <div className="flex flex-col gap-6 md:w-1/2">
          <div>
            <label htmlFor="name" className="w-full flex justify-between mb-2">
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
                className="w-full h-10 text-black rounded-md outline-none px-4"
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
                className={`w-full h-10 text-black border-2 rounded-md outline-none px-4 focus:border-custom-orange`}
                type="text"
                id="name"
                value={name}
                name="name"
              />
            )}
          </div>
          <div>
            <label htmlFor="email" className="w-full inline-block mb-2">
              Email
            </label>
            <input
              className="w-full h-10 text-black rounded-md outline-none px-4"
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
        <button className="text font-medium border rounded-md px-3 py-1">
          Cancel
        </button>
        {selectedImg || name !== user?.displayName ? (
          <button
            type="submit"
            className={`bg-custom-orange font-medium rounded-md px-3 py-1`}
          >
            Update
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className={`bg-gray-400 font-medium rounded-md px-3 py-1`}
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default Profile;
