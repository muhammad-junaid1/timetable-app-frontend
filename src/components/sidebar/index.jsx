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
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backgroundBlendMode: "overlay",
      }}
      className="sticky shadow-sm flex flex-col px-5 items-center top-[10px] bottom-0 left-0 h-screen w-[330px]"
    >
      <Weather />
      <Info />
    </div>
  );
};

export default Sidebar;
