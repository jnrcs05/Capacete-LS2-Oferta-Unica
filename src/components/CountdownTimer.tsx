import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg animate-pulse">
      <p className="text-lg font-bold mb-1">Oferta por tempo limitado!</p>
      <div className="text-3xl font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

export default CountdownTimer;