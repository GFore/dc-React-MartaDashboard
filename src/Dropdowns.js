import React from 'react';

const Dropdowns = props => {
    let optionList = props.opts.map((opt, index) => {
        return <option key={index} value={opt} >{opt}</option>
    });

    return (  
        <div>
            {props.name}:  <select name={props.name} value={props.selectedName} onChange={(event) => props.handleChange(event)}>
                {optionList}
            </select>
        </div>
    );
  }

export default Dropdowns;