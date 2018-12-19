import React, { Component } from 'react';
import * as sampleData from './sampleData';
import * as config from './config';
import {sortArrivals, getStationNames} from './helpers';
import Dropdowns from './Dropdowns';
import ArrivalsList from './ArrivalsList';

const corsProxyURL = 'https://my-little-cors-proxy.herokuapp.com/';
const MARTA_API_URL = 'http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals';
const myApiKey = '?apikey=' + config.MARTA_APIKEY1;

class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = {
        resetArrivals: [],
        resetStationNames: [],
        arrivals: [],
        stationNames: [],
        lineNames: ["BLUE", "GOLD", "GREEN", "RED"],
        directions: ["N", "S", "E", "W"],
        lineVal: "ALL",
        directionVal: "ALL",
        stationVal: "ALL"
      }
  }


  componentDidMount() {
    fetch(corsProxyURL + MARTA_API_URL + myApiKey)
            .then(result => result.json())
            .then(arrivalsArray => {
                arrivalsArray = sortArrivals(arrivalsArray);
                let stationNames = getStationNames(arrivalsArray);

                this.setState({
                    resetArrivals: arrivalsArray,
                    resetStationNames: stationNames,
                    arrivals: arrivalsArray,
                    stationNames: stationNames
                }, () => {
                    setInterval(() => {
                        console.log("refreshing data");
                        fetch(corsProxyURL + MARTA_API_URL + myApiKey)
                        .then(result => result.json())
                        .then(arrivalsArray => {
                                arrivalsArray = sortArrivals(arrivalsArray);
                                let stationNames = getStationNames(arrivalsArray);
                                
                                this.setState({
                                    resetArrivals: arrivalsArray,
                                    resetStationNames: stationNames
                                });
                            })
                    }, 300000);
                });
            });
  }


  render() {
    return (  
        <div>
            <h2>Station Arrivals</h2>
            <div className="filters">
                <Dropdowns
                    name="Line"
                    selectedName={this.state.lineVal}
                    opts={this.state.lineNames}
                    handleChange={this._handleSelect}
                    />
                <Dropdowns
                    name="Direction"
                    selectedName={this.state.directionVal}
                    opts={this.state.directions}
                    handleChange={this._handleSelect}
                    />
                <Dropdowns
                    name="Station"
                    selectedName={this.state.stationVal}
                    opts={this.state.stationNames}
                    handleChange={this._handleSelect}
                />
            </div>
            <ArrivalsList arrivals={this.state.arrivals}/>
            
        </div>
    );
  }

  _resetToDefaults() {
    this.setState({
        arrivals: this.state.resetArrivals,
        stationNames: this.state.resetStationNames,
        lineNames: ["BLUE", "GOLD", "GREEN", "RED"],
        directions: ["N", "S", "E", "W"],
        lineVal: "ALL",
        directionVal: "ALL",
        stationVal: "ALL"
      });
  }

  _display(arrs) {
      console.log("Stations:");
      console.dir(sampleData.stations);
      console.log("Station Names:");
      console.dir(this.state.stationNames);
      console.log("Arrivals:");
      console.dir(arrs);
  }

  _handleSelect = (event) => {
    const selectedName = event.target.name;
    const selectedValue = event.target.value;
    const currentLine = this.state.lineVal;
    const currentDir =  this.state.directionVal;
    const currentStn =  this.state.stationVal;

    const newLine = (selectedName === "Line") ? selectedValue : currentLine;
    const newDir = (selectedName === "Direction") ? selectedValue : currentDir;
    const newStn = (selectedName === "Station") ? selectedValue : currentStn;

    if (newLine === "ALL" && newDir === "ALL" && newStn === "ALL") {
        this._resetToDefaults();
    } else {
        let newArrivals = this.state.resetArrivals;
        if (newLine !== "ALL") {newArrivals = newArrivals.filter(arr => arr.LINE === newLine)};
        if (newDir !== "ALL") {newArrivals = newArrivals.filter(arr => arr.DIRECTION === newDir)};
        if (newStn !== "ALL") {newArrivals = newArrivals.filter(arr => arr.STATION === newStn)};

       let newStationNames = [...new Set(newArrivals.map(arr => arr.STATION).sort())];
       let newLineNames = [...new Set(newArrivals.map(arr => arr.LINE).sort())];
       let newDirections = [...new Set(newArrivals.map(arr => arr.DIRECTION).sort())];

       // save the current drop-down list for the selected item
       if (selectedName === "Line") {newLineNames = this.state.lineNames};
       if (selectedName === "Direction") {newDirections = this.state.directions};
       if (selectedName === "Station") {newStationNames = this.state.stationNames};
       
       this.setState({
            arrivals: newArrivals,
            stationNames: newStationNames,
            lineNames: newLineNames,
            directions: newDirections,
            lineVal: newLine,
            directionVal: newDir,
            stationVal: newStn
        })
    }
  }



}

export default Stations;