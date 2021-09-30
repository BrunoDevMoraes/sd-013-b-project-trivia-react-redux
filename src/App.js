import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import FeedBack from './pages/FeedBack';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/FeedBack" component={ FeedBack } />
        <Route exact path="/Ranking" component={ Ranking } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
