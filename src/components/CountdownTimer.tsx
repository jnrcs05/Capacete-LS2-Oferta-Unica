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
    <div className="bg-red-600 text-white py-6 px-12 rounded-lg shadow-lg animate-pulse w-full max-w-2xl mx-auto mb-8">
      <p className="text-2xl font-bold mb-2">Oferta por tempo limitado!</p>
      <div className="text-5xl font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </div>
  );
};

export default CountdownTimer;