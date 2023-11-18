import Timer from "./Timer";

function Progress({
  index,
  answer,
  numberQuestions,
  dispatch,
  secondsRemaining,
}) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numberQuestions} />
      <p>
        <strong>{index + 1}</strong> / {numberQuestions}
      </p>
      <Timer
        dispatch={dispatch}
        secondsRemaining={secondsRemaining}
        answer={answer}
      />
    </header>
  );
}

export default Progress;
