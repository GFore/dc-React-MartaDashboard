import React, { Component } from 'react';
import * as sampleData from './sampleData';
import Dropdowns from './Dropdowns';
import ArrivalsList from './ArrivalsList';

const defaults = {
    arrivals: sampleData.realtimeArrivalSample,
    stationNames: sampleData.stationNames,
    lineNames: ["All", "Blue", "Gold", "Green", "Red"],
    directions: ["All", "N", "S", "E", "W"]
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
                    label="Line" name="LineName"
                    opts={this.state.lineNames}
                    handleChange={this._handleSelectLine}
                />
                <Dropdowns
                    label="Direction" name="Direction"
                    opts={this.state.directions}
                    handleChange={this._handleSelect}
                />
                <Dropdowns
                    label="Station" name="StationName"
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
      console.table(arrs);
      console.table(this.state.stationNames);
    //   return arrs.map((arrival, index) => {
    //     return (
    //         <span key={index}>{arrival.LINE} | {arrival.DIRECTION} | {arrival.STATION} | {arrival.TRAIN_ID} | {arrival.NEXT_ARR}<br /></span>
    //     );
    //   });
  }

  _handleSelectLine = (event) => {
    const val = event.target.value
    console.log("Selected Value: ", val);

    if (val === "All") {
        this._resetToDefaults();
    } else {
        let newArrivals = sampleData.realtimeArrivalSample.filter(arr => arr.LINE === val.toUpperCase())
        let newStationNames = sampleData.stationNames.filter(stn => stn.line === val.toUpperCase())
    
        let newDirections = [];
        if (val === "Blue" || val === "Green") {newDirections = ["Both", "E", "W"];}
        else if (val === "Gold" || val === "Red") {newDirections = ["Both", "N", "S"];}
        else {newDirections = ["All", "N", "S", "E", "W"];}
    
    
        this.setState({
            arrivals: newArrivals,
            stationNames: newStationNames,
            directions: newDirections
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