import { Link, NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <section className="w-full max-w-[1920px] min-h-full h-screen max-h-[1080px] bg-blue-gray text-white px-[5%] pt-4 mx-auto">
      <div className="pb-2 border-b-2 border-custom-white flex items-end justify-between">
        <h3 className="text-3xl font-semibold">Acccount info.</h3>
        <Link to="/" className="text-orange-400">
          Back to Home
        </Link>
      </div>
      <div className="flex">
        <div className="w-52 min-h-[calc(100vh-58px)] h-full bg-white text-black flex flex-col gap-3 pl-2 pt-3">
          <NavLink
            to="/account/settings"
            className={({ isActive }) =>
              `text-lg font-medium pl-3 ${
                isActive && "bg-blue-gray rounded-l-xl text-white py-4"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/account/deactive"
            className={({ isActive }) =>
              `text-lg font-medium pl-3 ${
                isActive && "bg-blue-gray rounded-l-xl text-white py-4"
              }`
            }
          >
            Deactive Account
          </NavLink>
        </div>
        <div className="w-full text-center pt-3">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Account;
