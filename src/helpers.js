
// receive array of all arrivals for all stations and return a sorted array of
// station names, with "All" inserted as the first entry for use in drop-down
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



export {
    sortArrivals,
    getStationNames,
    filterArrivals,
    getNameLists
}
