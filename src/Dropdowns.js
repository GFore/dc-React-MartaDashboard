import React from 'react';

const Dropdowns = props => {
    let optionList = [];
    if (props.label !== "Station") {
        let k = 0;
        optionList = props.opts.map(opt => {
            k++;
            return <option key={k} value={opt.toLowerCase()}>{opt}</option>
        });
    } else {
        let k = 0;
        optionList.push(<option key={k} value="all">All Stations</option>);
        props.opts.forEach(opt => {
            k++;
            optionList.push(
                <option key={k} value={opt.station.toLowerCase()}>{opt.station}</option>
            )
        })
    }

    return (  
        <div>
            {props.label}: 
            <select name={props.name} onChange={(event) => props.handleChange(event)}>
                {optionList}
            </select>
        </div>
    );
  }

export default Dropdowns;