import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost:8080/api'

class App extends Component {
  state = {
    clicked: false,
    androidPercentage: 0,
    iOSPercentage: 0
  }

  sendVote = async (vote) => {

    await axios.post(URL + '/vote', {
      vote
    });
    const response = await axios.get(URL + '/getVote');
    this.setState({
      clicked: true,
      androidPercentage: response.data.android,
      iOSPercentage: response.data.ios
    })
  }

  render() {
    const { clicked, iOSPercentage, androidPercentage } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="box" onClick={() => {
              if (!clicked) {
                this.sendVote('iOS');
              }
            }
          }>
            {clicked ? 'iOS (%' + iOSPercentage + ')' : 'iOS'}
          </div>
          <div className="box" onClick={() => {
              if (!clicked) {
                this.sendVote('Android');
              }
            }
          }>
            {clicked ? 'Android (%' + androidPercentage + ')' : 'Android'}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
