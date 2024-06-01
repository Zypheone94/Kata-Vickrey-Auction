import { useEffect, useState } from "react";
import moment from "moment";

const Countdown = ({ expiration }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment();
      const expirationTime = moment(expiration);
      const duration = moment.duration(expirationTime.diff(now));

      if (duration.asSeconds() <= 0) {
        setTimeLeft("L'enchère est terminée !");
      } else {
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    calculateTimeLeft();

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [expiration]);

  return (
    <div>
      <h2>Temps restant : {timeLeft}</h2>
    </div>
  );
};

export default Countdown;
