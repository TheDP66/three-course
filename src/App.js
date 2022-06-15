import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import ThreeWobbleBox from "./pages/ThreeWobbleBox";
import Earth3DBeginner from "./pages/Earth3DBeginner";
import NewChairShopping from "./pages/NewChairShopping";
import Portofolio3D from "./pages/Portofolio3D/Portofolio3D";

// import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/three-wobble-box" component={ThreeWobbleBox} />
          <Route exact path="/earth-3d-beginner" component={Earth3DBeginner} />
          <Route
            exact
            path="/new-chair-shopping"
            component={NewChairShopping}
          />
          {/* <Route exact path="/portofolio-3d" component={Portofolio3D} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
