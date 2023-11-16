import Weather from "./Weather";
import Info from "./Info";

const Sidebar = ({ bgImg }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
        borderImage: "linear-gradient(to bottom, #0a58ff, rgb(222, 222, 222), #0a58ff) 1 100%"
      }}
      className="sticky border border-l-0 border-t-0 border-b-0 border-solid border-r-[4px] shadow-sm flex flex-col px-5 items-center top-[10px] bottom-0 left-0 h-screen w-[330px]"
    >
      <Weather />
      <Info />
    </div>
  );
};

export default Sidebar;
