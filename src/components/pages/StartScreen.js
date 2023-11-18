function StartScreen({ dispatch }) {
  return (
    <div className="page-screen">
      <div className="start-logo-box">
        <img
          className="logo"
          src="logo/Quotehunt(512).png"
          alt="Quotehunt logo"
        />
      </div>
      <div className="start-typo">
        <h2>Find the owner of the quote</h2>
        <h3>
          Quotehunt invites you to recall the brightest moments from iconic
          movies and TV series
        </h3>
        <h3>
          Memorable quotes that have forever left their mark on the history of
          cinematography
        </h3>
        <h3>Embark on this journey with us</h3>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's hunt
      </button>
    </div>
  );
}

export default StartScreen;
