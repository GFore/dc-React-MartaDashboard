import React from 'react';

const ArrivalsList = props => {
  const arrivals = props.arrivals.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.LINE}</td>
        <td>{item.DIRECTION}</td>
        <td>{item.STATION}</td>
        <td>{item.TRAIN_ID}</td>
        <td>{item.NEXT_ARR}</td>
      </tr>
    );            
  });
  
  return (  
    <table className="arrivalsTable">
      <thead><tr>
        <th>LINE</th>
        <th>DIRECTION</th>
        <th>STATION</th>
        <th>TRAIN ID</th>
        <th>NEXT ARRIVAL</th>
      </tr></thead>
      <tbody>                
        {arrivals}
      </tbody>
    </table>
  );
};

export default ArrivalsList;
       