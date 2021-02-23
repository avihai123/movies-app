import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/">
          <MoviesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
