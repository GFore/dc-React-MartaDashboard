import React, { Component } from 'react';
import './App.css';
import Stations from './Stations';
// import x from './x';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Marta Dashboard</h1>
        </header>
        <Stations />
      </div>
    );
  }
}

export default App;
