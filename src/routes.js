import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./App";
import PlantPage from "./containers/PlantPage";

const routes = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/plants/:plantId" component={PlantPage} />
  </Router>
);

export default routes;
