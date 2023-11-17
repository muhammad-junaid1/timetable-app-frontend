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
        borderImage:
          "linear-gradient(to bottom, #0a58ff, rgb(222, 222, 222), #0a58ff) 1 100%",
      }}
      className="sticky border border-l-0 border-t-0 border-b-0 border-solid border-r-[4px] shadow-sm flex flex-col px-5 items-center top-0 bottom-0 left-0 h-screen w-[360px]"
    >
      <Weather />
      <Info />
      <a
      className="absolute bottom-12 left-[50%]"
      style={{transform: "translateX(-50%)"}}
        href="https://www.buymeacoffee.com/mjunaidswe"
        rel="noreferrer"
        target="_blank"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{width: "120px"}}
        />
      </a>
    </div>
  );
};

export default Sidebar;
