import { useSelector } from "react-redux";

const Weather = () => {
  const weather = useSelector((store) => store.weather);
  if (weather?.weatherIcon || weather?.desc || weather?.temp) {
    return (
      <div className="flex items-center absolute m-2 top-0 left-0 text-white">
        <img
          alt=""
          className=""
          src={`https://openweathermap.org/img/wn/${weather?.weatherIcon}.png`}
        />
        <p className="m-0">{weather?.desc}</p>
        <span className="px-1.5">•</span>
        <p className="m-0">
          {weather?.temp}
          <sup>o</sup>C
        </p>
      </div>
    );
  } else return <></>;
};

export default Weather;
