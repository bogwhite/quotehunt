function Button({ dispatch, answer, index, numberQuestions }) {
  if (answer === null) return;

  if (index < numberQuestions - 1)
    return (
      <button
        className="btn btn-switch"
        onClick={() => dispatch({ type: "newQuestion" })}
      >
        Next
      </button>
    );

  if (index === numberQuestions - 1)
    return (
      <footer>
        <button
          className="btn btn-switch"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </footer>
    );
}

export default Button;
