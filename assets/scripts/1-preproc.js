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
  color.domain(data.map(d => d.name))
}

/**
 * Specifies the scale for the X axis of the bar chart.
 *
 * @param x       X scale to use.
 * @param data    Data from JSON file.
 */
function domainX(x, data) {
  // TODO: Specify the domain for variable "x" by associating only the used BIXI stations.
  x.domain(data.map(d => d.name))
}

/**
 * Specifies the Y axis for the bar chart.
 *
 * @param y             Y scale.
 * @param currentData   Data currently used by the bar chart.
 */
function domainY(y, currentData) {
  // TODO: Specifies the domain for the "y" axis by taking the minimum and maximum values as the number of trips to a BIXI station.
  var counts = currentData.destinations.map(d => d.count)
  y.domain([d3.min(counts) , d3.max(counts)])
}

/**
 * Returns an adjacency matrix from the data in order to create the cord diagram.
 *
 * @param data        Data frlom JSON file.
 * @return {Array}    A 10x10 matrix indicating the number of trips from a station to another.
 */
function getMatrix(data) {
  // TODO: Calculate the adjacency matrix to create the chord diagram.
  return data.map(dest => dest.destinations.map(d => d.count))
}

/**
 * Get the total number of trips during August 2015.
 *
 * @param data    Data from JSON file.
 */
function getTotal(data) {
  // TODO: Calculate the total number of trips done on August 2015.
  return d3.sum(data.map(d => d3.sum(d.destinations.map(dest => dest.count))))
}
