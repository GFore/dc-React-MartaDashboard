import React from 'react';

const Dropdowns = (props) => {
    let optionList = [];
    if (props.label === "Line") {
        let k = 0;
        optionList = props.opts.map(opt => {
            k++;
            return <option key={k} value={opt.toLowerCase()}>{opt}</option>
        });
    } else {
        let k = 0;
        props.opts.forEach(opt => {
            k++;
            optionList.push(
                <option key={k} value={opt.station.toLowerCase()}>{opt.station}</option>
            )
        })
    }

    return (  
        <div>
            {props.label}: <select name={props.name}>
                {optionList}
            </select>
        </div>
    );
  }

export default Dropdowns;