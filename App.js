import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Person: {
        fullName: "Lionel Messi",
        bio: "Argentine professional footballer who plays as a forward for Inter Miami CF and the Argentina national team. Widely regarded as one of the greatest players of all time.",
        imgSrc: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt12dbddde5342ce4c/60d866a69c6af30f4b050c8d/8005f7a2f385d4c9e4c2c15b9f2b3a8c9b4c0a2f.jpg",
        profession: "Professional Footballer"
      },
      shows: false,
      mountTime: new Date(),
      timeSinceMount: 0
    };
  }

  // Toggle show state
  toggleShow = () => {
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  };

  // Component lifecycle methods
  componentDidMount() {
    // Start interval when component mounts
    this.interval = setInterval(() => {
      const currentTime = new Date();
      const timeDiff = Math.floor((currentTime - this.state.mountTime) / 1000); // in seconds
      this.setState({ timeSinceMount: timeDiff });
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up interval when component unmounts
    clearInterval(this.interval);
  }

  render() {
    const { Person, shows, timeSinceMount } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Profile Toggle App</h1>
          
          <button onClick={this.toggleShow} className="toggle-btn">
            {shows ? 'Hide Profile' : 'Show Profile'}
          </button>

          <div className="time-display">
            ⏰ Time since component mounted: {timeSinceMount} seconds
          </div>

          {shows && (
            <div className="profile-card">
              <div className="profile-image">
                <img 
                  src={Person.imgSrc} 
                  alt={Person.fullName}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Profile+Image';
                  }}
                />
              </div>
              
              <div className="profile-info">
                <h2>{Person.fullName}</h2>
                <p className="profession">{Person.profession}</p>
                <p className="bio">{Person.bio}</p>
              </div>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
