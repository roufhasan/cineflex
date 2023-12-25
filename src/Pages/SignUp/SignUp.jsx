import { useForm } from "react-hook-form";
import Container from "../../components/Shared/Container";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [togglePass, setTogglePass] = useState(false);
  const onSubmit = (data) => console.log(data);

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
                Name
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
                Email address
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
                <label htmlFor="password">Password</label>
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
                {...register("password", { required: true, min: 8 })}
              />
            </div>
            <input
              className="w-full h-14 block text-[22px] font-medium bg-custom-orange rounded-md cursor-pointer"
              type="submit"
              value="Sign Up"
            />
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
