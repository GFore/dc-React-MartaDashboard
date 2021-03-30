import React from 'react';

const Dropdowns = ({ handleChange, name, opts, selectedName }) => {
  // first value for refresh rate is 'STOPPED'
  // for other dropdowns it is 'ALL'
  const firstOption = (name === "Refresh Rate")
    ? <option value="STOPPED">STOPPED</option>
    : <option value="ALL">ALL</option>;
    
  // map remaining options to option elements
  const optionList = opts.map((opt, index) => {
    return <option key={index} value={opt} >{opt}</option>
  });
  
  return (  
    <div>
      <label>{`${name}:`}  
        <select 
          name={name} 
          value={selectedName} 
          onChange={event => handleChange(event)}
        >
          {firstOption}
          {optionList}
        </select>
      </label>
    </div>
  );
};

export default Dropdowns;
