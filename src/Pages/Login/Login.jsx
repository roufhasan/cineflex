import { Link } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [togglePass, setTogglePass] = useState(false);
  const onSubmit = (data) => console.log(data);

  return (
    <Container px={"5%"}>
      <section className="pt-20 md:pt-32 pb-12 h-full md:h-screen min-h-[704px]">
        <p className="text-3xl font-medium text-center mb-10">Sign In</p>
        {/* ==> Login Container <== */}
        <div className="md:flex items-center gap-10">
          <div className="w-full">
            <p className="text-2xl font-medium text-center mb-6 hidden md:block">
              Sign In
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                value="Sign In"
              />
            </form>
          </div>
          <div className="w-full divider lg:divider-horizontal uppercase mt-16 mb-10 md:my-0 before:bg-gray-400 after:bg-gray-400">
            Or
          </div>
          <div className="w-full">
            <button className="w-full h-14 flex items-center justify-center gap-4 px-12 mt-2 border rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M22.5005 12.7331C22.5005 11.8698 22.4291 11.2398 22.2744 10.5864H12.2148V14.483H18.1196C18.0006 15.4514 17.3577 16.9097 15.9291 17.8897L15.9091 18.0202L19.0897 20.4349L19.3101 20.4564C21.3338 18.6247 22.5005 15.9297 22.5005 12.7331Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.214 23.0001C15.1068 23.0001 17.5353 22.0667 19.3092 20.4567L15.9282 17.89C15.0235 18.5083 13.8092 18.94 12.214 18.94C9.38069 18.94 6.97596 17.1083 6.11874 14.5767L5.99309 14.5871L2.68583 17.0955L2.64258 17.2133C4.40446 20.6433 8.0235 23.0001 12.214 23.0001Z"
                  fill="#34A853"
                />
                <path
                  d="M6.12095 14.5765C5.89476 13.9232 5.76386 13.2231 5.76386 12.4998C5.76386 11.7764 5.89476 11.0765 6.10905 10.4231L6.10306 10.284L2.75435 7.73535L2.64478 7.78642C1.91862 9.20977 1.50195 10.8081 1.50195 12.4998C1.50195 14.1915 1.91862 15.7897 2.64478 17.2131L6.12095 14.5765Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.2141 6.05997C14.2259 6.05997 15.583 6.91163 16.3569 7.62335L19.3807 4.73C17.5236 3.03834 15.1069 2 12.2141 2C8.02353 2 4.40447 4.35665 2.64258 7.78662L6.10686 10.4233C6.97598 7.89166 9.38073 6.05997 12.2141 6.05997Z"
                  fill="#EB4335"
                />
              </svg>
              <p className="md:text-xl">Continue with Google</p>
            </button>
            <button className="w-full h-14 flex items-center justify-center gap-4 px-12 my-6 border rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
              >
                <circle cx="16" cy="16.5" r="14" fill="#0C82EE" />
                <path
                  d="M21.2137 20.7816L21.8356 16.8301H17.9452V14.267C17.9452 13.1857 18.4877 12.1311 20.2302 12.1311H22V8.76699C22 8.76699 20.3945 8.5 18.8603 8.5C15.6548 8.5 13.5617 10.3929 13.5617 13.8184V16.8301H10V20.7816H13.5617V30.3345C14.2767 30.444 15.0082 30.5 15.7534 30.5C16.4986 30.5 17.2302 30.444 17.9452 30.3345V20.7816H21.2137Z"
                  fill="white"
                />
              </svg>
              <p className="md:text-xl">Continue with Facebook</p>
            </button>
            <Link
              to="/signup"
              className="w-full h-14 flex items-center justify-center gap-4 px-12 border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <g clipPath="url(#clip0_119_331)">
                  <path
                    d="M20 4.5H4C2.9 4.5 2.01 5.4 2.01 6.5L2 18.5C2 19.6 2.9 20.5 4 20.5H20C21.1 20.5 22 19.6 22 18.5V6.5C22 5.4 21.1 4.5 20 4.5ZM20 8.5L12 13.5L4 8.5V6.5L12 11.5L20 6.5V8.5Z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_119_331">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <p className="md:text-xl">Continue with Email</p>
            </Link>
          </div>
        </div>
        <div className="text-sm md:text-base text-center mt-16">
          <p className="capitalize underline font-medium">
            <span className="cursor-pointer">Forgot password?</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Secure sign in with Firebase Authenticaion
          </p>
        </div>
      </section>
    </Container>
  );
};

export default Login;
