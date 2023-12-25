import { useForm } from "react-hook-form";
import Container from "../../components/Shared/Container";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
  const { createUser, loading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [togglePass, setTogglePass] = useState(false);
  const onSubmit = (data) => {
    if (data) {
      createUser(data.email, data.password)
        .then((res) => {
          const loggedUser = res.user;
          console.log(loggedUser);
        })
        .catch((err) => {
          const errCode = err.code;
          const errMsg = err.message;
          console.log(errCode, errMsg);
        });
    }
  };

  return (
    <Container px="5%">
      <section className="pt-20 md:pt-32 pb-12">
        <div className="text-center mb-10">
          <p className="text-3xl font-medium mb-2">Sign Up</p>
          <p className="text-gray-400">Create your account now</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="w-full block mb-2">
                {errors.name?.type === "required" ? (
                  <span className="text-custom-orange">Name is required *</span>
                ) : (
                  "Name"
                )}
              </label>
              <input
                className="w-full h-14 text-black px-4 rounded-md outline-none"
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="my-6">
              <label htmlFor="photo" className="block mb-2">
                Profile Photo
              </label>
              <input
                className="w-full bg-white text-gray-400 rounded-md cursor-pointer file:h-14 file:px-6 file:bg-custom-orange file:border-none file:cursor-pointer"
                type="file"
                id="photo"
                {...register("photo")}
              />
            </div>
            <div>
              <label htmlFor="email" className="w-full block mb-2">
                {errors.email?.type === "required" ? (
                  <span className="text-custom-orange">
                    Email is required *
                  </span>
                ) : (
                  "Email"
                )}
              </label>
              <input
                className="w-full h-14 text-black px-4 rounded-md outline-none"
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="my-6">
              <div className="w-full flex justify-between mb-2">
                <label htmlFor="password">
                  {errors.password?.type === "pattern" ||
                  errors.password?.type === "required" ? (
                    <span className="text-sm text-custom-orange">
                      Password must be min 8 characters, at least one uppercase
                      one lowercase and one number *
                    </span>
                  ) : (
                    "Password"
                  )}
                </label>
                {togglePass ? (
                  <span
                    onClick={() => setTogglePass(!togglePass)}
                    className="text-lg text-gray-400 flex items-center gap-2 cursor-pointer"
                  >
                    <FaEyeSlash /> Hide
                  </span>
                ) : (
                  <span
                    onClick={() => setTogglePass(!togglePass)}
                    className="text-lg text-gray-400 flex items-center gap-2 cursor-pointer"
                  >
                    <FaEye /> Show
                  </span>
                )}
              </div>
              <input
                className="w-full h-14 text-black px-4 rounded-md outline-none"
                type={togglePass ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: true,
                  pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/,
                })}
              />
            </div>
            <button
              disabled={loading}
              className={`w-full h-14 block text-[22px] font-medium rounded-md cursor-pointer ${
                loading ? "bg-gray-500" : "bg-custom-orange"
              }`}
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <div className="text-sm md:text-base text-center mt-16">
            <Link to="/login" className="capitalize underline font-medium">
              <span className="cursor-pointer">Already have account?</span>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default SignUp;
