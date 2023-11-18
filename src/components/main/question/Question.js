import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <div className="question-img-box">
        <img
          className="question-img"
          src={question.picture}
          alt="Heroe of movie"
        />
      </div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
