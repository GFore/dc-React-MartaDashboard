import React from 'react';

const Dropdowns = props => {
    const firstOption = (props.name === "Refresh Rate")
        ? <option value="STOPPED">STOPPED</option>
        : <option value="ALL">ALL</option>;
        
    const optionList = props.opts.map((opt, index) => {
        return <option key={index} value={opt} >{opt}</option>
    });

    return (  
        <div>
            {props.name}:  <select name={props.name} value={props.selectedName} onChange={(event) => props.handleChange(event)}>
                {firstOption}
                {optionList}
            </select>
        </div>
    );
  }

export default Dropdowns;