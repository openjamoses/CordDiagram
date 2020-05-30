"use strict";

/**
 * File allowing the create the bar chart.
 */


/**
 * Creates the axis for the bar chart.
 *
 * @param g       The SVG group in which the bar chart has to be drawn.
 * @param yAxis   Y axis.
 * @param height  Height of the graphic.
 */
function createAxes(g, xAxis, yAxis, height) {
  // TODO: Draw the X and Y axis of the graphic. Make sure you put a title for the Y axis.
  // X-AXIS

  g.append("g")
    .classed("x axis", true)
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "start")
      .attr("transform","translate(0,0)rotate(45)")

    g.append("text")
      .attr("x", 12)
      .attr("y", -10)
      .attr("text-anchor","middle")
      .text("Nombre de trajets")
      .style("font-size","10px");
  
  // Y-AXIS
  g.append("g")
    .classed("y axis", true)
    .call(yAxis)
}

/**
 * Bar chart.
 *
 * @param g             The SVG group in which the bar chart has to be drawn.
 * @param currentData   Data to use.
 * @param x             Scale to use for the X axis.
 * @param y             Scale to use for the Y axis.
 * @param color         Color scale associating a color to a BIXI station name.
 * @param tip           Tooltip to show when a bar has been hovered.
 * @param height        Height of the graphic.
 */
function createBarChart(g, currentData, x, y, color, tip, height) {
  // TODO: Draw the bars for the bar charts using the specified scales.
  //       Make sure you show a tooltip when a bar in the bar chart is hovered.
  g.selectAll("rect")
   .data(currentData.destinations)
   .enter()
   .append("rect")
   .classed("rect", true)
   .attr("x", d => x(d.name))
   .attr("y", d => y(d.count))
   .style("fill", d => color(d.name))
   .attr("height", d => height - y(d.count))
   .attr("width", x.bandwidth())
   .on("mouseover", tip.show)
   .on("mouseout", tip.hide)

}

/**
 * Completes a transition from the currently used data to the new data to be shown.
 *
 * @param g         The SVG group in which the bar chart has to be drawn.
 * @param newData   The new data to use.
 * @param y         Scale for the Y axis.
 * @param yAxis     Y axis.
 * @param height    Height of the graphic.
 */
function transition(g, newData, y, yAxis, height) {
  /* TODO:
   - Complete a transition to update the Y axis and the height of the bar chart, taking into account the new data.
   - The transition has to complete in 1 second.
   */
  var duration = 1000
  g.selectAll(".rect").data(newData.destinations)
   .transition()
   .duration(duration)
   .attr("height",d => height - y(d.count))
   .attr("y", d => y(d.count))

  g.select(".y.axis")
   .transition()
   .duration(duration)
   .call(yAxis);
}
// 
/**
 * Returns the appropriate text for the tooltip.
 *
 * @param d               Data associated to the currently hovered bar.
 * @param currentData     Data currently used.
 * @param formatPercent   Function allowing to correctly format a percentage.
 * @return {string}       Tooltip's text to be shown.
 */
function getToolTipText(d, currentData, formatPercent) {
  // TODO: Return the text in the tooltip, correctly formatted as specified.
  //       Make sure you use the function "formatPercent" to correctly format the percentage.
  var percent = d.count / d3.sum(currentData.destinations.map(d => d.count))
  return d.count + " (" + formatPercent(percent) + ")";
}
