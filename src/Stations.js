import React, { Component } from 'react';
import * as sampleData from './sampleData';
import Dropdowns from './Dropdowns';
import ArrivalsList from './ArrivalsList';

const defaults = {
    arrivals: sampleData.realtimeArrivalSample,
    stationNames: ["All", ...sampleData.stationNames],
    lineNames: ["All", "Blue", "Gold", "Green", "Red"],
    directions: ["All", "N", "S", "E", "W"],
    lineIsFiltered: false,
    directionIsFiltered: false,
    stationIsFiltered: false,
    lineVal: "All",
    directionVal: "All",
    stationVal: "All"
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
                    // handleChange={this._handleSelectLine}
                    handleChange={this._handleSelect}
                    />
                <Dropdowns
                    name="Direction"
                    selectedName={this.state.directionVal}
                    opts={this.state.directions}
                    // handleChange={this._handleSelectDirection}
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
      console.dir(sampleData.stations);
      console.table(this.state.stationNames);
    //   return arrs.map((arrival, index) => {
    //     return (
    //         <span key={index}>{arrival.LINE} | {arrival.DIRECTION} | {arrival.STATION} | {arrival.TRAIN_ID} | {arrival.NEXT_ARR}<br /></span>
    //     );
    //   });
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

    console.log("Current: ", currentLine, currentDir, currentStn);
    console.log("New vals: ", newLine, newDir, newStn);

    if (newLine === "All" && newDir === "All" && newStn === "All") {
        this._resetToDefaults();
    } else {
        console.log("new stuff")
        let newArrivals = sampleData.realtimeArrivalSample;
        if (newLine !== "All") {
            newArrivals = newArrivals.filter(arr => arr.LINE === newLine.toUpperCase())
        };
        if (newDir !== "All") {
            newArrivals = newArrivals.filter(arr => arr.DIRECTION === newDir)
        };
        if (newStn !== "All") {
            newArrivals = newArrivals.filter(arr => arr.STATION === newStn)
        };

        this.setState({
            arrivals: newArrivals,
            lineVal: newLine,
            directionVal: newDir,
            stationVal: newStn
        })
    }
  }

  _handleSelectLine = (event) => {
      console.log("Selected Value: ", event.target.name, " value: ", event.target.value);
    const val = event.target.value

    if (val === "All") {
        this._resetToDefaults();
    } else {
        let newArrivals = (this.state.directionIsFiltered || this.state.stationIsFiltered)
                            ? this.state.arrivals
                            : sampleData.realtimeArrivalSample;
        newArrivals = newArrivals.filter(arr => arr.LINE === val.toUpperCase());

        let newDirections = [];
        if (this.state.directionIsFiltered) {
            newDirections = this.state.directions;
        } else {
            if (val === "Blue" || val === "Green") {newDirections = ["Both", "E", "W"];}
            else if (val === "Gold" || val === "Red") {newDirections = ["Both", "N", "S"];}
            else {newDirections = ["All", "N", "S", "E", "W"];}
        }
        
        let newStationNames = [];
        if (this.state.stationIsFiltered) {
            newStationNames = this.state.stationNames;
        } else {
            newStationNames = sampleData.stationNames.filter(stn => stn.line === val.toUpperCase());
        }
    
        this.setState({
            arrivals: newArrivals,
            stationNames: newStationNames,
            directions: newDirections,
            lineIsFiltered: true
        })
    }
  }

  _handleSelectDirection = (event) => {
    const val = event.target.value
    console.log("Selected Value: ", val);

    if (val === "All") {
        this._resetToDefaults();
    } else {
        let newArrivals = (this.state.lineIsFiltered || this.state.stationIsFiltered)
                            ? this.state.arrivals
                            : sampleData.realtimeArrivalSample;
        newArrivals = newArrivals.filter(arr => arr.DIRECTION === val.toUpperCase());

        let newLineNames = [];
        if (this.state.lineIsFiltered) {
            newLineNames = this.state.lineNames;
        } else {
            if (val === "N" || val === "S") {newLineNames = ["Both", "Gold", "Red"];}
            else if (val === "E" || val === "W") {newLineNames = ["Both", "Blue", "Green"];}
            else {newLineNames = ["All", "Blue", "Gold", "Green", "Red"];}
        }
        
        let newStationNames = [];
        if (this.state.stationIsFiltered) {
            newStationNames = this.state.stationNames;
        } else {
            newStationNames = sampleData.stationNames.filter(stn => stn.dir === val.toUpperCase());
        }
    
        this.setState({
            arrivals: newArrivals,
            stationNames: newStationNames,
            lineNames: newLineNames,
            directionIsFiltered: true
        })
    }
  }

}

export default Stations;

        // "DESTINATION":"Hamilton E Holmes",
        // "DIRECTION":"E",
        // "EVENT_TIME":"12/8/2018 2:26:39 PM",
        // "LINE":"BLUE",
        // "NEXT_ARR":"02:26:48 PM",
        // "STATION":"ASHBY STATION",
        // "TRAIN_ID":"103206",
        // "WAITING_SECONDS":"-48",
        // "WAITING_TIME":"Boarding"