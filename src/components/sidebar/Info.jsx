import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGreeting } from "../../slices/greeting";

const format = (value) => {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
};

function getGreeting(hour) {
  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return greeting + ",";
}

const Info = () => {
  const dispatch = useDispatch();
  const [currDateTime, setCurrDateTime] = useState({
    time: "",
    date: "",
  });

  const updateCurrTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = now.toLocaleDateString("en-US", options);
    setCurrDateTime({
      time: `${format(now.getHours())}:${format(now.getMinutes())}`,
      date: formattedDate,
    });
    dispatch(setGreeting(getGreeting(now.getHours())));
  };

  useEffect(() => {
    updateCurrTime();
    const interval = setInterval(updateCurrTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="mt-[65%] slide-down">
      <div className="text-center text-white">
        <h1 className="font-light text-7xl mb-1.5">{currDateTime?.time}</h1>
        <p>{currDateTime?.date}</p>
      </div>
    </div>
  );
};

export default Info;
