import React, { Component } from 'react';
import * as sampleData from './sampleData';
import * as config from './config';
import {sortArrivals, getStationNames, filterArrivals, getNameLists, getTimerRateInMS} from './helpers';
import Dropdowns from './Dropdowns';
import ArrivalsList from './ArrivalsList';

const corsProxyURL = 'http://my-little-cors-proxy.herokuapp.com/';
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
        stationVal: "ALL",
        refreshRate: "10 sec"
      }
  }

  componentDidMount() {
    fetch(corsProxyURL + MARTA_API_URL + myApiKey)
        .then(result => result.json())
        .then(arrivalsArray => {
            arrivalsArray = sortArrivals(arrivalsArray);
            const nameLists = getNameLists(arrivalsArray);

            this.setState({
                resetArrivals: arrivalsArray,
                resetStationNames: nameLists.stations,
                arrivals: arrivalsArray,
                stationNames: nameLists.stations,
                lineNames: nameLists.lines,
                directions: nameLists.directions
            }, () => {
                let timerId = setInterval(() => {
                    console.log("refreshing data");
                    fetch(corsProxyURL + MARTA_API_URL + myApiKey)
                    .then(result => result.json())
                    .then(arrivalsArray => {
                            arrivalsArray = sortArrivals(arrivalsArray);
                            const stationNames = getStationNames(arrivalsArray);
                            const newArrivals = filterArrivals (arrivalsArray, this.state.lineVal, this.state.stationVal, this.state.directionVal);
                            const nameLists = getNameLists(newArrivals);

                            this.setState({
                                resetArrivals: arrivalsArray,
                                resetStationNames: stationNames,
                                arrivals: newArrivals,
                                stationNames: nameLists.stations,
                                lineNames: nameLists.lines,
                                directions: nameLists.directions,
                                timerId: timerId
                            });
                        })
                    .catch(err => {
                        console.log("API IS DOWN - DISPLAYING SAMPLE DATA!: ", err);
                        // if the API call fails, then load sample data into state
                        this.setState({
                            resetArrivals: sampleData.realtimeArrivalSample,
                            resetStationNames: sampleData.stationNames,
                            arrivals: sampleData.realtimeArrivalSample,
                            stationNames: sampleData.stationNames
                        })
                    })
                }, getTimerRateInMS(this.state.refreshRate));
            });
        })
        .catch(err => {
            console.log("API IS DOWN - DISPLAYING SAMPLE DATA!: ", err);
            // if the API call fails, then load sample data into state
            this.setState({
                resetArrivals: sampleData.realtimeArrivalSample,
                resetStationNames: sampleData.stationNames,
                arrivals: sampleData.realtimeArrivalSample,
                stationNames: sampleData.stationNames
            })        
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
                <Dropdowns
                    name="Refresh Rate"
                    selectedName={this.state.refreshRate}
                    opts={["5 sec", "10 sec", "20 sec", "30 sec", "1 min", "2 min", "5 min", "10 min"]}
                    handleChange={this._handleNewRefreshRate}
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
    const selection = {name: event.target.name, value: event.target.value};

    const newLine = (selection.name === "Line") ? selection.value : this.state.lineVal;
    const newDir = (selection.name === "Direction") ? selection.value : this.state.directionVal;
    const newStn = (selection.name === "Station") ? selection.value : this.state.stationVal;

    if (newLine === "ALL" && newDir === "ALL" && newStn === "ALL") {
        this._resetToDefaults();
    } else {
        const newArrivals = filterArrivals (this.state.resetArrivals, newLine, newStn, newDir);
        const nameLists = getNameLists(newArrivals);

       // save the current drop-down list for the selected item
       if (selection.name === "Line") {nameLists.lines = this.state.lineNames};
       if (selection.name === "Direction") {nameLists.directions = this.state.directions};
       if (selection.name === "Station") {nameLists.stations = this.state.stationNames};
       
       this.setState({
            arrivals: newArrivals,
            stationNames: nameLists.stations,
            lineNames: nameLists.lines,
            directions: nameLists.directions,
            lineVal: newLine,
            directionVal: newDir,
            stationVal: newStn
        })
    }
  }
  _handleNewRefreshRate = (event) => {
        window.clearInterval(this.state.timerId);       // clear the existing refresh setInterval
        console.log(`refresh timer #${this.state.timerId} stopped`);

        let refreshInterval = event.target.value;
        console.log(`new interval: ${refreshInterval}`)
        if (refreshInterval === "STOPPED") {
            this.setState({
                refreshRate: refreshInterval                    
            })
        } else {
            fetch(corsProxyURL + MARTA_API_URL + myApiKey)
                .then(result => result.json())
                .then(arrivalsArray => {
                    arrivalsArray = sortArrivals(arrivalsArray);
                    const stationNames = getStationNames(arrivalsArray);
    
                    this.setState({
                        resetArrivals: arrivalsArray,
                        resetStationNames: stationNames,
                        refreshRate: refreshInterval                    
                    }, () => {
                            let timerId = setInterval(() => {
                            console.log("refreshing data");
                            fetch(corsProxyURL + MARTA_API_URL + myApiKey)
                            .then(result => result.json())
                            .then(arrivalsArray => {
                                    arrivalsArray = sortArrivals(arrivalsArray);
                                    const stationNames = getStationNames(arrivalsArray);
                                    const newArrivals = filterArrivals (arrivalsArray, this.state.lineVal, this.state.stationVal, this.state.directionVal);
                                    const nameLists = getNameLists(newArrivals);
    
                                    this.setState({
                                        resetArrivals: arrivalsArray,
                                        resetStationNames: stationNames,
                                        arrivals: newArrivals,
                                        stationNames: nameLists.stations,
                                        lineNames: nameLists.lines,
                                        directions: nameLists.directions,
                                        timerId: timerId
                                    });
                                })
                            .catch(err => {
                                console.log("BAM3!: ", err);
                                // if the API call fails, then load sample data into state
                                this.setState({
                                    resetArrivals: sampleData.realtimeArrivalSample,
                                    resetStationNames: sampleData.stationNames,
                                    arrivals: sampleData.realtimeArrivalSample,
                                    stationNames: sampleData.stationNames
                                })        
                            })
                            }, getTimerRateInMS(refreshInterval));
                        });
                })
            .catch(err => {
                console.log("BAM4!: ", err);
                // if the API call fails, then load sample data into state
                this.setState({
                    resetArrivals: sampleData.realtimeArrivalSample,
                    resetStationNames: sampleData.stationNames,
                    arrivals: sampleData.realtimeArrivalSample,
                    stationNames: sampleData.stationNames
                })        
            });
        };
  }

}

export default Stations;