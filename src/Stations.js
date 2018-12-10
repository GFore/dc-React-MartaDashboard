import React, { Component } from 'react';
import * as sampleData from './sampleData';
import Dropdowns from './Dropdowns';
// import CoffeeList from './CoffeeList';

class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivals: sampleData.realtimeArrivalSample,
      stationNames: sampleData.stationNames,
      lineNames: ["All", "Blue", "Green", "Orange", "Red"],
      directions: ["All", "N", "S", "E", "W"]
    }
  }

  render() {
    return (  
        <div>
            <h2>Station Arrivals</h2>
            <div className="filters">
                <Dropdowns
                    label="Line" name="LineName"
                    opts={this.state.lineNames}
                    handleChange={this._handleSelect}
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
            <p>{this._display(this.state.arrivals)}</p>
            
        </div>
    );
  }

  _display(arrs) {
    //   console.table(arrs);
    //   console.table(this.state.stationNames);
      return arrs.map((arrival, index) => {
        return (
            <span key={index}>{arrival.STATION} | {arrival.LINE} | {arrival.DIRECTION} | {arrival.TRAIN_ID} | {arrival.NEXT_ARR}<br /></span>
        );
      });
  }

  _handleSelect = (event) => {
      const val = event.target.value
      console.log("Selected Value: ", val);
    //   this.setState({
    //     orders: [...this.state.orders, order]
    //   });
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

        // {/* <table><tbody>                
        //     {this.state.arrivals.map((item, index) => {
        //                 return (
        //                         <tr key={index}>
        //                             <td>{item.STATION}</td>
        //                             <td>{item.LINE}</td>
        //                             <td>{item.DIRECTION}</td>
        //                             <td>{item.TRAIN_ID}</td>
        //                             <td>{item.NEXT_ARR}</td>
        //                         </tr>
        //                 );            
        //             })}
        //     </tbody>
        //     </table>

        //     <div className="coffeeRunContainer">
        //         <CoffeeForm handleSubmit={this._submitOrder} />
        //         <CoffeeList orders={this.state.orders} />
        //     </div> */}