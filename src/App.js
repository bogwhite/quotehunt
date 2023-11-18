import { useReducer, useEffect } from "react";
import Loader from "./components/states/Loader";
import Error from "./components/states/Error";
import StartScreen from "./components/pages/StartScreen";
import FinishScreen from "./components/pages/FinishScreen";
import Main from "./components/main/Main";
import Progress from "./components/main/progress/Progress";
import Question from "./components/main/question/Question";
import Button from "./components/main/button/Button";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const secondsPerQuestion = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataFetch":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: secondsPerQuestion,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondsRemaining: secondsPerQuestion,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining === 0
            ? secondsPerQuestion
            : state.secondsRemaining - 1,
        index: state.secondsRemaining === 0 ? state.index + 1 : state.index,
        status:
          state.index === 9 && state.secondsRemaining === 0
            ? (state.status = "finished")
            : state.status,
        answer:
          state.secondsRemaining === 0 ? (state.answer = null) : state.answer,
      };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberQuestions = questions.length;

  const maxNumberPoints = questions.reduce(
    (accumulated, current) => accumulated + current.points,
    0
  );

  useEffect(function () {
    fetch("https://quotehunt.glitch.me/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataFetch", payload: data }))
      .catch((error) => dispatch({ type: "dataError" }));
  }, []);

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen dispatch={dispatch} />}
      {status === "active" && (
        <Main>
          <Progress
            index={index}
            answer={answer}
            numberQuestions={numberQuestions}
            dispatch={dispatch}
            secondsRemaining={secondsRemaining}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Button
            dispatch={dispatch}
            answer={answer}
            index={index}
            numberQuestions={numberQuestions}
          />
        </Main>
      )}
      {status === "finished" && (
        <FinishScreen
          points={points}
          dispatch={dispatch}
          maxNumberPoints={maxNumberPoints}
          highscore={highscore}
        />
      )}
    </>
  );
}

export default App;
