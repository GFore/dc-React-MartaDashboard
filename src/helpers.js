
// receive array of all arrivals for all stations and return a sorted array of
// station names, with "All" inserted as the first entry for use in drop-down
function getStationNames(arvlArray) {
    let nameList = [];

    arvlArray.forEach(arrival => {
        if (!nameList.includes(arrival.STATION)) {
            nameList.push(arrival.STATION);
        }
    });
    nameList.sort().unshift("ALL");

    return nameList;
}

// sort the arrivals array by Line, then Direction, then station
function sortArrivals (arvlArray) {
    arvlArray = Object.values(arvlArray);
    
    arvlArray.sort((a,b) => ((a.LINE + a.DIRECTION + a.STATION) > (b.LINE + b.DIRECTION + b.STATION)) ? 1
    : (((b.LINE + b.DIRECTION + b.STATION) > (a.LINE + a.DIRECTION + a.STATION)) ? -1 : 0));

    return arvlArray;
}


export {
    sortArrivals,
    getStationNames
}
