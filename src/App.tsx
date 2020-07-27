import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import MemoryGame from './memory-game/Main';
import SnakeGame from './snake-game';

import './App.css';

const Home = () => <h1>Welcome Home</h1>;
const About = () => <h1>About this page</h1>;

const App = () => (
  <Router>
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/memory-game">Cat Memory Game</Link>
          </li>
          <li>
            <Link to="/snake-game">Snake Game</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/memory-game">
            <MemoryGame />
          </Route>
          <Route path="/snake-game">
            <SnakeGame />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </>
  </Router>
);

export default App;
