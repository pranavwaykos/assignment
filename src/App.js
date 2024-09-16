import React, { Component } from "react";
import Questionnaire from "./Questionnaire";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="main__wrap">
        <Questionnaire />
      </div>
    );
  }
}

export default App;
