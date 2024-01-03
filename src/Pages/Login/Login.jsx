import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Shared/Container";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import GitHubIcon from "../../assets/icons/github-icon.svg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PageTitle from "../../components/PageTitle/PageTitle";

const Login = () => {
  const { loading, setLoading, signIn, googleSignIn, gitHubSignIn } =
    useContext(AuthContext);
  const [togglePass, setTogglePass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Email Password Sign In
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        navigate(-1);
        toast.success("Login Successful!");
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(errMsg);
        setLoading(false);
        toast.error("Something went wrong!!");
      });
  };

  // Sign in with google
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        navigate(-1);
        toast.success("Login Successful!");
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(errMsg);
        toast.error("Something went wrong!!");
      });
  };

  // Sign in with GitHub
  const handlegitHubSignIn = () => {
    gitHubSignIn()
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        navigate(-1);
        toast.success("Login Successful!");
      })
      .catch((err) => {
        const errMsg = err.message;
        console.log(errMsg);
        toast.error("Something went wrong!!");
      });
  };

  return (
    <Container px={"5%"}>
      <PageTitle title={"Sign In | CineFlex"} />
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
                  {errors.email?.type === "required" ? (
                    <span className="text-custom-orange">
                      Email is required *
                    </span>
                  ) : (
                    "Email address"
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
                        Password must be min 8 characters, at least one
                        uppercase one lowercase and one number *
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
              <motion.button
                className={`w-full h-14 block text-[22px] font-medium rounded-md cursor-pointer ${
                  loading ? "bg-gray-500" : "bg-custom-orange"
                }`}
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.9 }}
              >
                Sign In
              </motion.button>
            </form>
          </div>
          <div className="w-full divider lg:divider-horizontal uppercase mt-16 mb-10 md:my-0 before:bg-gray-400 after:bg-gray-400">
            Or
          </div>
          <div className="w-full">
            <motion.button
              onClick={handleGoogleSignIn}
              className="w-full h-14 flex items-center justify-center gap-4 px-12 mt-2 border rounded-full"
              whileTap={{ scale: 0.9 }}
            >
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
            </motion.button>
            <motion.button
              onClick={handlegitHubSignIn}
              className="w-full h-14 flex items-center justify-center gap-4 px-12 my-6 border rounded-full"
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={GitHubIcon}
                alt="github icon"
                className="w-9 h-9 object-cover"
              />
              <p className="md:text-xl">Continue with GitHub</p>
            </motion.button>
            <motion.div whileTap={{ scale: 0.9 }}>
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
            </motion.div>
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
