import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const seconds = secondsRemaining;

  useEffect(
    function () {
      const time = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(time);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
