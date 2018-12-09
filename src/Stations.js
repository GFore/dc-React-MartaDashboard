import React, { Component } from 'react';
import * as sampleData from './sampleData';
// import CoffeeForm from './CoffeeForm';
// import CoffeeList from './CoffeeList';

class Stations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivals: sampleData.realtimeArrivalSample,
      stationNames: sampleData.stationNames
    }
  }

  render() {
    return (  
        <div>
            <h2>Station Arrivals</h2>
            <p>{this._display(this.state.arrivals)}</p>
            {/* <table><tbody>                
            {this.state.arrivals.map((item, index) => {
                        return (
                                <tr key={index}>
                                    <td>{item.STATION}</td>
                                    <td>{item.LINE}</td>
                                    <td>{item.DIRECTION}</td>
                                    <td>{item.TRAIN_ID}</td>
                                    <td>{item.NEXT_ARR}</td>
                                </tr>
                        );            
                    })}
            </tbody>
            </table>

            <div className="coffeeRunContainer">
                <CoffeeForm handleSubmit={this._submitOrder} />
                <CoffeeList orders={this.state.orders} />
            </div> */}
        </div>
    );
  }

  _display(arrs) {
      console.table(arrs);
      console.table(this.state.stationNames);
      return arrs.map((arrival, index) => {
        return (
            <span key={index}>{arrival.STATION} | {arrival.LINE} | {arrival.DIRECTION} | {arrival.TRAIN_ID} | {arrival.NEXT_ARR}<br /></span>
        );
      });
  }

  _submitOrder = (order) => {
      this.setState({
        orders: [...this.state.orders, order]
      });
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