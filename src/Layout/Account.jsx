import { Link, NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <section className="w-full max-w-[1920px] min-h-full h-full max-h-[1080px] bg-blue-gray text-white pt-4 px-[5%] mx-auto">
      <div className="flex items-center justify-between border-b pb-2 mb-4 md:items-end">
        <h3 className="text-2xl font-semibold md:text-3xl">Acccount info.</h3>
        <Link to="/" className="text-sm text-orange-400 md:text-base">
          Back to Home
        </Link>
      </div>
      <div className="md:flex">
        <div className="h-full flex justify-between gap-3 px-3 md:min-h-[calc(100vh-77px)] md:w-52 md:bg-white md:text-black md:flex-col md:justify-normal md:pt-3 md:pr-0 md:pl-2">
          <NavLink
            to="/account/settings"
            className={({ isActive }) =>
              `text-lg font-medium md:pl-3 ${
                isActive &&
                "text-custom-orange font-semibold rounded-l-xl md:text-white md:bg-blue-gray md:py-4"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/account/deactive"
            className={({ isActive }) =>
              `text-lg font-medium md:pl-3 ${
                isActive &&
                "text-custom-orange font-semibold rounded-l-xl md:text-white md:bg-blue-gray md:py-4"
              }`
            }
          >
            Deactive Account
          </NavLink>
        </div>
        <div className="w-full py-10 md:py-0 md:pt-10 md:pl-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Account;
