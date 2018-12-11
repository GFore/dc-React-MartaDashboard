import React from 'react';

const Dropdowns = props => {
    let optionList = props.opts.map((opt, index) => {
        let selectedAttr = "";
        if (opt === props.selectedName) {selectedAttr = "selected"};
        return <option key={index} value={opt} {...selectedAttr}>{opt}</option>
    });

    return (  
        <div>
            {props.name}:  <select name={props.name} onChange={(event) => props.handleChange(event)}>
                {optionList}
            </select>
        </div>
    );
  }

export default Dropdowns;