import React, { Component } from 'react';
import * as sampleData from './sampleData';
import Dropdowns from './Dropdowns';
import ArrivalsList from './ArrivalsList';

const defaults = {
    arrivals: sampleData.realtimeArrivalSample,
    stationNames: ["ALL", ...sampleData.stationNames],
    lineNames: ["ALL", "BLUE", "GOLD", "GREEN", "RED"],
    directions: ["ALL", "N", "S", "E", "W"],
    lineVal: "ALL",
    directionVal: "ALL",
    stationVal: "ALL"
  };

class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = {...defaults}
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
            <p>{this._display(this.state.arrivals)}</p>
            
        </div>
    );
  }

  _resetToDefaults() {
    this.setState({...defaults});
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
      //I know, Uncle Bob, this function is way too long
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
        console.log("new stuff")
        let newArrivals = sampleData.realtimeArrivalSample;
        if (newLine !== "ALL") {newArrivals = newArrivals.filter(arr => arr.LINE === newLine)};
        if (newDir !== "ALL") {newArrivals = newArrivals.filter(arr => arr.DIRECTION === newDir)};
        if (newStn !== "ALL") {newArrivals = newArrivals.filter(arr => arr.STATION === newStn)};

       let newStationNames = [];
       let newLineNames = [];
       let newDirections = [];
       newArrivals.forEach(arr => {
           if (!newStationNames.includes(arr.STATION)) {newStationNames.push(arr.STATION)};
           if (!newLineNames.includes(arr.LINE)) {newLineNames.push(arr.LINE)};
           if (!newDirections.includes(arr.DIRECTION)) {newDirections.push(arr.DIRECTION)};
       });

       newLineNames.sort();
       newDirections.sort();
       newStationNames.unshift("ALL");
       newLineNames.unshift("ALL");
       newDirections.unshift("ALL");
       
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