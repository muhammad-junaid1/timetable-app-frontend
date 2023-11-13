import {MdAccountCircle} from "react-icons/md";

const Navbar = () => {
    return (
        <div className="border-b flex justify-end border-b-gray-200 p-4">
            <div className="flex items-center"><MdAccountCircle className="text-primary" size={22}/><strong className=" ml-1 text-primary">i222660@nu.edu.pk</strong></div>
        </div>
    );
};

export default Navbar;