import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
// import MemoryGame from './memory-game/Main';
import MemoryGame from './memory-game/MainUnsplash';
import './App.css';

// link is this video: https://www.youtube.com/watch?v=lhNdUVh3qCc

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
            <Link to="/memory-game">Memory Game</Link>
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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </>
  </Router>
);

export default App;
