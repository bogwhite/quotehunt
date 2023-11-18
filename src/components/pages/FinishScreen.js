function FinishScreen({ points, dispatch, maxNumberPoints, highscore }) {
  const percentage = (points / maxNumberPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "⭐";
  if (percentage >= 80 && percentage < 100) emoji = "😎";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🗿";

  return (
    <div className="page-screen">
      <div className="start-logo-box">
        <img
          className="logo"
          src="logo/Quotehunt(512).png"
          alt="Quotehunt logo"
        />
      </div>
      <div className="result-box">
        <p className="result">
          <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
          {maxNumberPoints} ({Math.ceil(percentage)}%)
        </p>
        <p className="highscore">(Highscore: {highscore} points)</p>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
