"use strict";

/**
 * File preprocessing the data from the CSV file.
 */


/**
 * 
 * Specifies the color domain for each BIXI station.
 *
 * @param color   Color scale.
 * @param data    Data from JSON file.
 */
function domainColor(color, data) {
  // TODO: Specify the color scale for each BIXI station by assigning each station a distinct color.
  var i
  let stationsName = []

  for(i = 0; i < 10; ++i)
  {
    stationsName[i] = data[i].name
  }
  color.domain(stationsName)
}

/**
 * Specifies the scale for the X axis of the bar chart.
 *
 * @param x       X scale to use.
 * @param data    Data from JSON file.
 */
function domainX(x, data) {
  // TODO: Specify the domain for variable "x" by associating only the used BIXI stations.
  var i
  var stationsUsed = []

  for (i = 0; i < 10; ++i)
  {
    stationsUsed[i] = data[i].name
  }
  x.domain(stationsUsed)

}

/**
 * Specifies the Y axis for the bar chart.
 *
 * @param y             Y scale.
 * @param currentData   Data currently used by the bar chart.
 */
function domainY(y, currentData) {
  // TODO: Specifies the domain for the "y" axis by taking the minimum and maximum values as the number of trips to a BIXI station.
  var j
  var i
  var min = 10000
  var max = 0

  for(i = 0; i < 10; ++i)
  {
    for(j = 0; j < 10; ++j)
    {
      if(currentData.destinations[i].count[j] < min)
      {
        min = currentData.destinations[i].count[j]
      }
      if(currentData.destinations[i].count[j] > max)
      {
        max = currentData.destinations[i].count[j]
      }
    }
  }
  y.domain([min,max])
}

/**
 * Returns an adjacency matrix from the data in order to create the cord diagram.
 *
 * @param data        Data frlom JSON file.
 * @return {Array}    A 10x10 matrix indicating the number of trips from a station to another.
 */
function getMatrix(data) {
  // TODO: Calculate the adjacency matrix to create the chord diagram.
  var adjMatrix = []

  data.forEach(function(dataset1)
  {
    var line = []
    dataset1.destinations.forEach(function(dataset2)
    {
      line.push(dataset2.count)
    })
    adjMatrix.push(line)
  }
  )
  return adjMatrix;
}

/**
 * Get the total number of trips during August 2015.
 *
 * @param data    Data from JSON file.
 */
function getTotal(data) {
  // TODO: Calculate the total number of trips done on August 2015.
  var i
  var j
  var totalTrips = 0

  data.forEach(function(dataset1){
    dataset1.destinations.forEach(function(dataset2)
    {
      totalTrips = totalTrips + dataset2.count
    })
  }
  )
  return totalTrips;
}
