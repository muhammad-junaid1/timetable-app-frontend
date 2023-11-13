import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import {IoIosSettings} from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <BiSolidDashboard size={18} />,
  },
  {
    title: "Settings", 
    link: "/settings", 
    icon: <IoIosSettings/>
  }
];

const Sidebar = () => {
    const location = useLocation();
  return (
    <div className="sticky shadow-sm top-[10px] bottom-0 left-0 h-screen w-[250px] border-r border-r-gray-200">
      <a href="/dashboard">
        <img className="m-4" src={Logo} alt="Logo" width={120} />
      </a>

      <div>
        {items?.map((item) => (
          <NavLink
            className={`flex items-center py-2 px-4 ${location.pathname === item?.link && 'sidebar-active'}`}
            key={item?.link}
            to={item?.link}
            
          >
            {item?.icon}
            <p className="ml-1">{item?.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
