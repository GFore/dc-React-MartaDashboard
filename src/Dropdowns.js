import React from 'react';

const Dropdowns = props => {
    // first value for refresh rate is 'STOPPED'
    // for other dropdowns it is 'ALL'
    const firstOption = (props.name === "Refresh Rate")
        ? <option value="STOPPED">STOPPED</option>
        : <option value="ALL">ALL</option>;
        
    // map remaining options to option elements
    const optionList = props.opts.map((opt, index) => {
        return <option key={index} value={opt} >{opt}</option>
    });

    
    return (  
        <div>
            <label>{props.name}:  
                <select 
                    name={props.name} 
                    value={props.selectedName} 
                    onChange={(event) => props.handleChange(event)}
                >
                    {firstOption}
                    {optionList}
                </select>
            </label>
        </div>
    );
  }

export default Dropdowns;