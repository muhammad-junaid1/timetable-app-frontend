import Weather from "./Weather";
import Info from "./Info";
import { useSelector } from "react-redux";

const Sidebar = ({ bgImg }) => {
  const weather = useSelector((store) => store.weather);
  const {showContainer, showContent} = useSelector(store => store.sidebarVisibility);

  // useEffect(() => {
  //   if (weather?.weatherIcon || weather?.desc || weather?.temp) {
  //     setTimeout(() => {
  //       setShowSidebar(true);
  //       setTimeout(() => {
  //         setShowContent(true);
  //       }, 1000);
  //     }, 700);
  //   }
  // }, [weather]);

  if (showContainer)
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
        className="sticky slide-right border slide-right border-l-0 border-t-0 border-b-0 border-solid border-r-[4px] shadow-sm px-5 top-0 bottom-0 left-0 h-screen w-[340px]"
      >
        {showContent && (
          <div className="flex flex-col pt-[40%] items-center">
            <Weather weatherData={weather} />
            <Info />
            {/* <a
              className="absolute fade bottom-8 left-[50%]"
              style={{ transform: "translateX(-50%)" }}
              href="https://www.buymeacoffee.com/mjunaidswe"
              rel="noreferrer"
              target="_blank"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{ width: "100px" }}
              />
            </a> */}
          </div>
        )}
      </div>
    );
};

export default Sidebar;
