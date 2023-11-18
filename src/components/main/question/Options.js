function Options({ question, dispatch, answer }) {
  const IsAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
        ${
          index === answer
            ? answer === 0
              ? "answer-left"
              : answer === 1
              ? "answer-right"
              : answer === 2
              ? "answer-left"
              : answer === 3
              ? "answer-right"
              : ""
            : ""
        } 
        ${
          IsAnswer
            ? index === question.correctOption
              ? "correct"
              : "wrong"
            : ""
        }
         `}
          key={option}
          disabled={IsAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
