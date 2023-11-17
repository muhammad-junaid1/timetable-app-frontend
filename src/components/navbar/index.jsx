// import { MdAccountCircle } from "react-icons/md";
import Logo from "../../assets/logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const greeting = useSelector(store => store.greeting);
  return (
    <div className="shadow-lg sticky top-0 z-[1000] bg-white flex justify-between border-b-gray-200 border-b-2 p-2.5">
      
        <a href="/">
          <img src={Logo} alt="Logo" width={110} />
        </a>
    <div className="flex items-center">
        {/* <MdAccountCircle className="text-primary" size={22} /> */}
        <strong className="mr-2 text-sm">{greeting} <span className="text-primary">Muhammad Junaid</span></strong>
      </div>
    </div>
  );
};

export default Navbar;
