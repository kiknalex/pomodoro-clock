import React from 'react';
import ReactDOM from 'react-dom';

let interval;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    break: 5,
    session: 25,
    timer: "25:00",
    timerState: "stopped",
    minute: 25,
    seconds: 1,
    button: "Start",
    time: 0,
    breakOn: "no",
    string: "Session"
  }
 }

  breakMinus = () => {
    if(this.state.break > 1) {
    this.setState({break: this.state.break - 1});
    this.onChange();
    }
  }
  breakPlus = () => {
    if(this.state.break < 60) {
    this.setState({break: this.state.break + 1});
    this.onChange();
    }
  }
  setTimer = () => {
    this.setState({timer: this.state.session + ":00", minute: this.state.session});
  }
  sessionMinus = () => {
    if(this.state.session > 1){
    this.setState({session: this.state.session - 1}, () => {this.setTimer()});
    this.onChange();
    }
  }
  onChange = () => {
    if(this.state.timerState == "running") {
      this.setState({timerState: "stopped",button: "Start", seconds: 0, time: 0, minutes: this.state.session});
      clearInterval(interval);
    }
  }
  sessionPlus = () => {
    if(this.state.session >= 1 && this.state.session < 60) {
    this.setState({session: this.state.session + 1}, () => {this.setTimer()});
    }
    this.onChange();
  }
  calculateTime = () => {
    let time = this.state.minute * 60 + this.state.seconds;
    this.setState({time: time});
  }
  startStop = () => {
    if(this.state.timerState == "stopped") {
      interval = setInterval(this.timer, 1000);
      this.setState({button: "Stop",timerState: "running"});
    } else if(this.state.timerState == "running") {
      
      clearInterval(interval);
      this.setState({button: "Start", timerState: "stopped"});
    }
  }
  timer = () => {
    this.calculateTime();
    let time = this.state.time;
    this.msToTime(time * 1000);
    if(this.state.minute == 0 && this.state.seconds == 0 && this.state.breakOn == "no") {
      this.audioBeep.play();
        this.setState({minute: this.state.break, breakOn: "yes",string: "Break", seconds: 1});
    } else if(this.state.minute == 0 && this.state.seconds == 0 && this.state.breakOn == "yes") {
      this.audioBeep.play();
      this.setState({minute: this.state.session, seconds: 1, breakOn: "no", string: "Session"});
    }
  }
  reset = () => {
    this.setState({
    break: 5,
    session: 25,
    timer: "25:00",
    timerState: "stopped",
    minute: 25,
    seconds: 1,
    button: "Start",
    time: 0,
    breakOn: "no",
    string: "Session"
  });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    clearInterval(interval);
  }
  
  msToTime = (duration) => {
    duration--;
   let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);
    this.setState({minute: minutes, seconds: seconds});
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
   this.setState({timer: minutes + ":" + seconds});
}
  render() {
    return (
    <div className="background">
        <div className="wrapper">
          <div className="clock">
        <p className="name">25 + 5 Clock</p>
          </div>
          <div className="length-control">
        <p id="break-label">Break Length</p>
            <button id="break-decrement" onClick={this.breakMinus}><i className="fa fa-arrow-down fa-2x"></i></button>
            <div id="break-length">{this.state.break}</div>
            <button id="break-increment" onClick={this.breakPlus}><i className="fa fa-arrow-up fa-2x"></i></button>
          </div>
          <div className="length-control">
        <p id="session-label">Session Length</p>
            <button id="session-decrement" onClick={this.sessionMinus}><i className="fa fa-arrow-down fa-2x"></i></button>
              <div id="session-length">{this.state.session}</div>
            <button id="session-increment" onClick={this.sessionPlus}><i className="fa fa-arrow-up fa-2x"></i></button>
          </div>
        </div>
        <Timer timer={this.state.timer} minute={this.state.minute} seconds={this.state.seconds} string={this.state.string} />
        <Buttons onClick={this.startStop} start={this.state.button} reset={this.reset} />
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ref={(audio) => {
            this.audioBeep = audio;
          }} />
    </div>
    )
  }
}
const Timer = ({timer,minute,seconds,string}) => {
  return (
  <div className="timer">
      <div className="session" id="timer-label">{string}</div>
      <div className="time" id="time-left">{timer}</div>
  </div>
  );
}
const Buttons = (props) => {
  return (
    <div className="buttons">
      <button id="start_stop" onClick={props.onClick}>{props.start}</button>
      <button id="reset" onClick={props.reset}>Reset</button>
    </div>
  );
}


export default App;
