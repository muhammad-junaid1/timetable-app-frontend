import Logo from "../../../assets/logo.png";

const Sidebar = () => {
    return (
        <div className="p-4 sticky top-[10px] left-0 h-screen w-[250px] border-r border-r-gray-200">
            <a href="/dashboard"><img src={Logo} alt="Logo" width={120}/></a>
        </div>
    );
};

export default Sidebar;