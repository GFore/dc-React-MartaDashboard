
// from an array of arrivals, extract a sorted list of unique station names
function getStationNames(arvlArray) {
    let nameList = [];

    arvlArray.forEach(arrival => {
        if (!nameList.includes(arrival.STATION)) {
            nameList.push(arrival.STATION);
        }
    });
    nameList.sort();

    return nameList;
}

// from an array of arrivals, extract separate unique lists of lines, stations, and directions 
function getNameLists(arvlArray) {
    return {
            lines: [...new Set(arvlArray.map(arr => arr.LINE).sort())],
            stations: [...new Set(arvlArray.map(arr => arr.STATION).sort())],
            directions: [...new Set(arvlArray.map(arr => arr.DIRECTION).sort())]
        };
}

// sort the arrivals array by Line, then Direction, then station
function sortArrivals (arvlArray) {
    arvlArray = Object.values(arvlArray);
    
    arvlArray.sort((a,b) => ((a.LINE + a.DIRECTION + a.STATION) > (b.LINE + b.DIRECTION + b.STATION)) ? 1
    : (((b.LINE + b.DIRECTION + b.STATION) > (a.LINE + a.DIRECTION + a.STATION)) ? -1 : 0));

    return arvlArray;
}

// filter the arrivals array by the selected values for line, station, and direction
function filterArrivals (arvlArray, filterLine, filterStn, filterDir) {
    if (filterLine !== "ALL") {arvlArray = arvlArray.filter(arr => arr.LINE === filterLine)};
    if (filterStn !== "ALL") {arvlArray = arvlArray.filter(arr => arr.STATION === filterStn)};
    if (filterDir !== "ALL") {arvlArray = arvlArray.filter(arr => arr.DIRECTION === filterDir)};

    return arvlArray;
}

function getTimerRateInMS(timeName) {
    const timesInMS = [5000, 10000, 20000, 30000, 60000, 120000, 300000, 600000];
    const timeNameArray = ["5 sec", "10 sec", "20 sec", "30 sec", "1 min", "2min", "5 min", "10 min"];
    const pos = timeNameArray.indexOf(timeName);
    return (pos !== -1) ? timesInMS[pos] : "STOPPED";
}


export {
    sortArrivals,
    getStationNames,
    filterArrivals,
    getNameLists,
    getTimerRateInMS
}
